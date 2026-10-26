"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Link as NavLink } from "@/lib/content";

type Props = { name: string; nav: NavLink[]; cv: string };

export default function Header({ name, nav, cv }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside the menu (toggle button + panel links).
      const items = [buttonRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.matchMedia("(min-width: 64rem)").matches && close(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block size-3 rounded-full bg-pink transition-transform motion-safe:group-hover:scale-150"
          />
          {name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-ink bg-mustard px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider shadow-hard transition-transform motion-safe:hover:-translate-y-0.5"
              >
                CV <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="relative z-50 inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 font-mono text-xs uppercase tracking-wider lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 h-0.5 w-4 bg-ink transition-transform ${open ? "top-1 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-4 bg-ink transition-transform ${open ? "top-1 -rotate-45" : "top-2"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-ink bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 py-8 sm:px-6">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  className="flex items-baseline gap-4 border-b border-ink/15 py-3 font-display text-4xl font-bold tracking-tight hover:text-cobalt"
                >
                  <span className="font-mono text-xs font-normal text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink bg-mustard px-5 py-3 font-mono text-sm font-semibold uppercase tracking-wider shadow-hard"
          >
            Download CV <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
