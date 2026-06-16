"use client";

import { personal } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="px-4 py-10 text-center"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        &copy; {new Date().getFullYear()} {personal.name}. Crafted with care.
      </p>
    </footer>
  );
}
