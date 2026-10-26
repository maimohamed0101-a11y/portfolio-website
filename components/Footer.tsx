import { site } from "@/lib/content";
import { Star } from "./Doodles";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t border-ink bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
              {site.name}
              <Star className="ml-2 inline-block size-8 align-top text-pink sm:size-10" />
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ivory/80">
              {site.title} · {site.location}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            <li>
              <a className="underline-offset-4 hover:text-mustard hover:underline" href={`mailto:${site.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:text-mustard hover:underline" href={site.phone.href}>
                Phone
              </a>
            </li>
            <li>
              <a
                className="underline-offset-4 hover:text-mustard hover:underline"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="underline-offset-4 hover:text-mustard hover:underline"
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
              >
                CV<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:text-mustard hover:underline" href="#main">
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-12 border-t border-ivory/20 pt-6 font-mono text-xs text-ivory/70">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
