"use client";

import { useMemo, useState } from "react";
import { DISCIPLINES, type Discipline, type Project } from "@/lib/content";
import ProjectCard from "./ProjectCard";

type Filter = "All" | Discipline;

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.disciplines.includes(filter))),
    [filter, projects],
  );
  const options: Filter[] = ["All", ...DISCIPLINES];

  return (
    <div>
      <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = filter === opt;
          const count = opt === "All" ? projects.length : projects.filter((p) => p.disciplines.includes(opt)).length;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(opt)}
              className={`inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                active ? "bg-ink text-ivory" : "bg-ivory text-ink hover:bg-ivory-deep"
              }`}
            >
              {opt}
              <span className={`rounded-full px-1.5 ${active ? "bg-mustard text-ink" : "bg-ink/10"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filter === "All"
          ? `Showing all ${visible.length} projects.`
          : `Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"} in ${filter}.`}
      </p>

      <ul className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
        {visible.map((p) => {
          const index = projects.indexOf(p);
          return (
            <li key={p.slug} className={index % 2 === 1 ? "md:translate-y-16" : ""}>
              <ProjectCard project={p} index={index} />
            </li>
          );
        })}
      </ul>
      {visible.some((p) => projects.indexOf(p) % 2 === 1) && <div className="hidden h-16 md:block" />}
    </div>
  );
}
