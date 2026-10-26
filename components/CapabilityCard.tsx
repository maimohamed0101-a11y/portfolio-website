import type { Capability } from "@/lib/content";
import { Shape } from "./Doodles";

const accents = ["text-cobalt", "text-pink", "text-mustard"];

export default function CapabilityCard({ capability, index }: { capability: Capability; index: number }) {
  return (
    <article
      className="group flex h-full flex-col rounded-2xl border border-ink bg-ivory p-6 transition-[transform,box-shadow] duration-300 hover:shadow-hard motion-safe:hover:-translate-y-1 sm:p-8"
      data-reveal
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <Shape
          shape={capability.shape}
          className={`size-12 transition-transform duration-500 motion-safe:group-hover:rotate-[20deg] ${accents[index % accents.length]}`}
        />
        <span className="font-mono text-xs text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-8 font-display text-3xl font-bold">{capability.title}</h3>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">{capability.body}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${capability.title} tags`}>
        {capability.tags.map((tag) => (
          <li key={tag} className="rounded-sm border border-ink/30 bg-ivory-deep px-2 py-1 font-mono text-xs">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
