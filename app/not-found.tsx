import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Error 404</p>
      <h1 className="mt-6 font-display text-6xl font-bold tracking-tight sm:text-8xl">Page not found.</h1>
      <p className="mt-6 max-w-lg text-lg text-ink-soft">This page doesn’t exist or has moved.</p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full border border-ink bg-cobalt px-6 py-3.5 font-display font-semibold text-white shadow-hard hover:bg-cobalt-deep"
      >
        Back to the homepage
      </Link>
    </section>
  );
}
