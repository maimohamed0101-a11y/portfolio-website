import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { cardTheme } from "./cardTheme";
import { Star } from "./Doodles";

type Props = { project: Project; index: number; prev?: Project; next?: Project };

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-current/40 pt-3">
      <dt className="font-mono text-xs uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold">{value}</dd>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[auto_1fr] gap-4 border-b border-ink/15 pb-4 text-lg leading-relaxed" data-reveal>
          <span className="pt-1 font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudy({ project, index, prev, next }: Props) {
  const t = cardTheme[project.color];
  return (
    <article aria-labelledby="case-title">
      <header className={`relative overflow-hidden border-b border-ink ${t.card} ${t.dark ? "on-dark" : ""}`}>
        {/* Outline-only shapes so text that overlaps them keeps its contrast */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border-2 border-current opacity-40" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-24 size-56 rounded-full border-2 border-current opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 lg:px-10 lg:pb-20">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="underline underline-offset-4">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#work" className="underline underline-offset-4">Selected work</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.client}</li>
            </ol>
          </nav>

          <p className="mt-12 font-mono text-xs uppercase tracking-[0.18em]">
            Case study {String(index + 1).padStart(2, "0")} · {project.client}
          </p>
          {project.status && (
            <p className="mt-3 w-fit rounded-sm bg-ivory px-2 py-1 font-mono text-xs uppercase text-ink">
              {project.status === "concept" ? "Conceptual project" : "Prototype"}
            </p>
          )}
          <h1
            id="case-title"
            className="mt-4 max-w-[18ch] font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.035em]"
          >
            {project.title}
          </h1>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Organisation" value={project.client} />
            <Meta label="Role" value={project.role} />
            <Meta label="Period" value={project.period} />
            {project.location && <Meta label="Location" value={project.location} />}
            {project.engagement && <Meta label="Engagement" value={project.engagement} />}
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-24">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Disciplines</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.disciplines.map((d) => (
                  <li key={d} className="rounded-full border border-ink px-3 py-1 font-mono text-xs">{d}</li>
                ))}
              </ul>
            </div>
            {project.tools.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Tools used</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li key={tool} className="rounded-sm border border-ink/30 bg-ivory-deep px-2 py-1 font-mono text-xs">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="font-display text-2xl font-semibold leading-snug">
              <span className="box-decoration-clone bg-mustard-tint px-1">{project.summary}</span>
            </p>
          </div>
        </aside>

        <div className="space-y-16 lg:col-span-8">
          {project.context && (
            <section aria-labelledby="context-title">
              <h2 id="context-title" className="font-display text-3xl font-bold sm:text-4xl">Context</h2>
              <p className="mt-6 text-lg leading-relaxed">{project.context}</p>
            </section>
          )}

          <section aria-labelledby="did-title">
            <h2 id="did-title" className="font-display text-3xl font-bold sm:text-4xl">What I did</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-soft">
              {project.role} · {project.period}
            </p>
            <div className="mt-8">
              <List items={project.responsibilities} />
            </div>
          </section>

          {project.additionalRoles.map((r, i) => (
            <section key={r.role} aria-labelledby={`role-${i}`} className="rounded-2xl border border-ink bg-pink-tint p-6 sm:p-10">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                <Star className="size-4 text-pink" /> Also at {project.client}
              </p>
              <h2 id={`role-${i}`} className="mt-3 font-display text-3xl font-bold sm:text-4xl">{r.role}</h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-soft">
                {r.period}
                {r.location && ` · ${r.location}`}
              </p>
              <div className="mt-8">
                <List items={r.responsibilities} />
              </div>
            </section>
          ))}

          {project.outcomes && project.outcomes.length > 0 && (
            <section aria-labelledby="outcomes-title">
              <h2 id="outcomes-title" className="font-display text-3xl font-bold sm:text-4xl">Outcomes</h2>
              <div className="mt-8">
                <List items={project.outcomes} />
              </div>
            </section>
          )}

          {project.images && project.images.length > 0 && (
            <section aria-labelledby="images-title">
              <h2 id="images-title" className="font-display text-3xl font-bold sm:text-4xl">Artefacts</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {project.images.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="h-auto w-full rounded-xl border border-ink"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <nav aria-label="More case studies" className="border-t border-ink">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
          {[prev, next].map((p, i) =>
            p ? (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`group block px-4 py-10 transition-colors hover:bg-ink hover:text-ivory sm:px-6 lg:px-10 ${
                  i === 1 ? "border-t border-ink sm:border-t-0 sm:border-l sm:text-right" : ""
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-wider">{i === 0 ? "← Previous" : "Next →"}</span>
                <span className="mt-2 block font-display text-3xl font-bold sm:text-4xl">{p.client}</span>
                <span className="mt-1 block text-base">{p.title}</span>
              </Link>
            ) : (
              <div key={i} />
            ),
          )}
        </div>
      </nav>
    </article>
  );
}
