import Link from "next/link";
import type { Project } from "@/lib/content";
import { cardTheme } from "./cardTheme";
import { Shape } from "./Doodles";

const shapes = ["circle", "square", "triangle", "circle"] as const;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = cardTheme[project.color];
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink p-6 shadow-hard transition-[transform,box-shadow] duration-300 sm:p-8 motion-safe:hover:-translate-y-1 motion-safe:hover:-rotate-[0.6deg] hover:shadow-hard-lg has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-cobalt ${t.card} ${t.dark ? "on-dark" : ""}`}
    >
      <Shape
        shape={shapes[index % shapes.length]}
        className={`pointer-events-none absolute -right-6 -top-6 size-24 sm:size-32 opacity-90 transition-transform duration-500 motion-safe:group-hover:rotate-45 ${t.shape}`}
      />

      <div className="relative flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="pr-14 sm:pr-20">{project.period}</span>
      </div>

      <p className="relative mt-10 font-display text-4xl font-bold tracking-tight sm:text-5xl">{project.client}</p>

      <h3 className="relative mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">
        <Link
          href={`/work/${project.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.title}
        </Link>
      </h3>

      <p className="relative mt-3 max-w-md text-base leading-relaxed">{project.summary}</p>

      {project.status && (
        <p className="relative mt-3 w-fit rounded-sm bg-ivory px-2 py-1 font-mono text-xs uppercase text-ink">
          {project.status === "concept" ? "Conceptual project" : "Prototype"}
        </p>
      )}

      <div className="relative mt-auto pt-8">
        <ul className="flex flex-wrap gap-2" aria-label="Disciplines">
          {project.disciplines.map((d) => (
            <li key={d} className={`rounded-full border px-3 py-1 font-mono text-xs ${t.tag}`}>
              {d}
            </li>
          ))}
        </ul>
        <div className={`mt-6 flex items-center justify-between border-t pt-4 font-mono text-xs uppercase tracking-wider ${t.tag}`}>
          <span>{project.role}</span>
          <span aria-hidden="true" className="flex items-center gap-2 whitespace-nowrap">
            Case study
            <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
