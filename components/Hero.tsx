import type { Project, Site } from "@/lib/content";
import { Arrow, Squiggle, Star } from "./Doodles";

type Props = { site: Site; current?: Project };

export default function Hero({ site, current }: Props) {
  const { statement, highlight, supporting, primaryCta, secondaryCta, ticker } = site.hero;
  const idx = statement.lastIndexOf(highlight);
  const before = idx >= 0 ? statement.slice(0, idx) : statement;
  const marked = idx >= 0 ? highlight : "";
  const loop = [...ticker, ...ticker, ...ticker, ...ticker];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-10 lg:pb-24">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
          <span>{site.name}</span>
          <span aria-hidden="true">/</span>
          <span>{site.title}</span>
          <span aria-hidden="true">/</span>
          <span>{site.location}</span>
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-[14ch] font-display text-[clamp(3.25rem,10vw,9rem)] font-bold leading-[0.88] tracking-[-0.04em]"
        >
          {before}
          {marked &&
            marked.split(" ").map((word, i, arr) => (
              <span key={i}>
                <span className="relative inline-block">
                  <span className="relative z-10">{word}</span>
                  <Squiggle className="absolute -bottom-[0.08em] left-0 z-0 h-[0.22em] w-full text-pink" />
                </span>
                {i < arr.length - 1 && " "}
              </span>
            ))}
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-ink sm:text-xl">{supporting}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={primaryCta.href}
                className="group inline-flex items-center gap-3 rounded-full border border-ink bg-cobalt px-6 py-3.5 font-display text-base font-semibold text-white shadow-hard transition-all hover:bg-cobalt-deep motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-hard-lg"
              >
                {primaryCta.label}
                <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink bg-ivory px-6 py-3.5 font-display text-base font-semibold transition-colors hover:bg-ink hover:text-ivory"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            {/* Decorative composition */}
            <div className="relative hidden h-72 lg:block" aria-hidden="true">
              <div className="absolute right-6 top-0 size-44 rounded-full border border-ink bg-cobalt" />
              <div className="absolute bottom-4 left-10 size-32 rotate-12 border border-ink bg-mustard shadow-hard" />
              <div className="absolute right-40 bottom-0 h-24 w-48 rounded-t-full border border-ink bg-pink" />
              <Star className="absolute right-2 bottom-16 size-10 text-ink" />
              <Arrow className="absolute left-0 top-0 w-24 -scale-x-100 text-pink" />
            </div>
            {current && (
              <p className="w-fit -rotate-2 rounded-md border border-ink bg-ivory px-4 py-3 font-mono text-xs shadow-hard lg:absolute lg:-bottom-6 lg:right-0">
                <span className="mr-2 inline-block size-2 rounded-full bg-pink align-middle" aria-hidden="true" />
                Currently: {current.role} at {current.client}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="on-dark overflow-hidden border-y border-ink bg-ink py-4 text-ivory" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          {loop.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <Star className={`size-6 ${["text-pink", "text-mustard", "text-cobalt"][i % 3]}`} />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Disciplines: {ticker.join(", ")}.</p>
    </section>
  );
}
