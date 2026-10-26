"use client";

import { useRef, useState } from "react";
import { LIMITS, normalise, validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const empty: ContactInput = { name: "", email: "", message: "" };

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof ContactInput, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(normalise(next)));
  };

  const blur = (field: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContact(normalise(values)));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = normalise(values);
    const found = validateContact(data);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as (keyof ContactInput)[])[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error || "Something went wrong.");
      }
      setValues(empty);
      setTouched({});
      setErrors({});
      setStatus({ kind: "success" });
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-ink bg-mustard p-8 shadow-hard"
      >
        <p className="font-display text-3xl font-bold">Message sent. Thank you!</p>
        <p className="mt-3 text-base">I’ll reply to the email address you gave as soon as I can.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 rounded-full border border-ink bg-ivory px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-ink hover:text-ivory"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof ContactInput) => {
    const err = touched[name] ? errors[name] : undefined;
    return {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(name, e.target.value),
      onBlur: () => blur(name),
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `contact-${name}-error` : undefined,
      className: `mt-2 block w-full rounded-lg border bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink-soft/80 transition-shadow focus-visible:shadow-hard focus-visible:outline-offset-0 ${
        err ? "border-2 border-[#b3124f]" : "border-ink"
      }`,
    };
  };

  const errorText = (name: keyof ContactInput) =>
    touched[name] && errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#b3124f]">
        <span aria-hidden="true">✕</span> {errors[name]}
      </p>
    ) : null;

  const sending = status.kind === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="rounded-2xl border border-ink bg-ivory p-6 shadow-hard sm:p-8"
    >
      <h3 id="contact-form-title" className="font-display text-2xl font-bold">
        Send a message
      </h3>
      <p className="mt-1 font-mono text-xs text-ink-soft">All fields are required.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-mono text-xs font-semibold uppercase tracking-wider">
            Name
          </label>
          <input type="text" autoComplete="name" required maxLength={LIMITS.name.max} {...field("name")} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="font-mono text-xs font-semibold uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email.max}
            {...field("email")}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="font-mono text-xs font-semibold uppercase tracking-wider">
          Message
        </label>
        <textarea rows={6} required maxLength={LIMITS.message.max} {...field("message")} />
        <div className="flex items-start justify-between gap-4">
          {errorText("message")}
          <p className="mt-2 ml-auto font-mono text-xs text-ink-soft" aria-hidden="true">
            {values.message.length}/{LIMITS.message.max}
          </p>
        </div>
      </div>

      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="assertive">
        {status.kind === "error" && (
          <div role="alert" className="mt-6 rounded-lg border-2 border-[#b3124f] bg-pink-tint p-4 text-sm">
            <p className="font-semibold">Sorry, your message wasn’t sent.</p>
            <p className="mt-1">
              {status.message} You can also email{" "}
              <a className="font-medium text-cobalt-deep underline underline-offset-2" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex items-center gap-3 rounded-full border border-ink bg-cobalt px-6 py-3.5 font-display text-base font-semibold text-white shadow-hard transition-all hover:bg-cobalt-deep disabled:cursor-wait disabled:opacity-70 motion-safe:hover:-translate-y-0.5"
      >
        {sending ? "Sending…" : "Send message"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
