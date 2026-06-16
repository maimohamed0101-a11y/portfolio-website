"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { personal } from "@/lib/data";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      console.log("Form data:", data);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="section px-4">
      <div
        className="max-w-5xl mx-auto"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "80px",
        }}
      >
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s work together
          </motion.h2>
          <motion.p
            variants={item}
            className="text-base mb-12 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a project in mind, a research challenge, or just want to connect? I&apos;d love to hear from you.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div variants={item}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(0,113,227,0.5)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                    }
                  />
                  {errors.name && (
                    <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="your@email.com"
                    type="email"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(0,113,227,0.5)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                    }
                  />
                  {errors.email && (
                    <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(0,113,227,0.5)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                    }
                  />
                  {errors.message && (
                    <p className="text-xs mt-1.5" style={{ color: "#ff6b6b" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                  style={{ background: "var(--accent)", color: "#fff" }}
                  onMouseEnter={(e) => {
                    if (status !== "sending")
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--accent-hover)";
                  }}
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "var(--accent)")
                  }
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#4ade80" }}
                  >
                    <CheckCircle size={15} />
                    Message sent! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#ff6b6b" }}
                  >
                    <AlertCircle size={15} />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div variants={item} className="flex flex-col gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,113,227,0.12)" }}
                >
                  <Mail size={20} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Email
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {personal.email}
                  </div>
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,113,227,0.12)" }}
                >
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    LinkedIn
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Connect with me
                  </div>
                </div>
              </a>

              <div
                className="glass rounded-2xl p-5 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,113,227,0.08) 0%, rgba(66,165,245,0.04) 100%)",
                  borderColor: "rgba(0,113,227,0.2)",
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  I typically respond within <strong style={{ color: "var(--text-primary)" }}>24 hours</strong>. Looking forward to learning about your project.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
