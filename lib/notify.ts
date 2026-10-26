import "server-only";
import type { Submission } from "./submissions";
import { site } from "./content";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

/** Sends a notification through Resend's HTTP API. Returns false if not configured. */
export async function sendNotification(s: Pick<Submission, "name" | "email" | "message" | "createdAt">) {
  if (!emailConfigured()) return false;

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [to],
      reply_to: s.email,
      subject: `Portfolio message from ${s.name}`,
      text: `From: ${s.name} <${s.email}>\nSent: ${s.createdAt}\n\n${s.message}`,
      html: `<p><strong>From:</strong> ${escape(s.name)} &lt;${escape(s.email)}&gt;<br/><strong>Sent:</strong> ${escape(
        s.createdAt,
      )}</p><p style="white-space:pre-wrap">${escape(s.message)}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  return true;
}
