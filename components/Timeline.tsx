import type { TimelineItem } from "@/lib/content";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-ink">
      {items.map((item, i) => (
        <li
          key={`${item.period}-${item.role}`}
          className="relative pb-8 pl-8 last:pb-0"
          data-reveal
          style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border border-ink ${
              item.current ? "bg-pink" : "bg-ivory"
            }`}
          />
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
            {item.period}
            {item.current && (
              <span className="ml-2 rounded-sm bg-mustard px-1.5 py-0.5 text-ink">Current</span>
            )}
          </p>
          <h4 className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">{item.role}</h4>
          <p className="text-base text-ink-soft">
            {item.organisation}
            {item.location && <span> · {item.location}</span>}
          </p>
        </li>
      ))}
    </ol>
  );
}
