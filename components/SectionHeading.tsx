type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({ id, eyebrow, title, intro, as: Tag = "h2", className = "" }: Props) {
  return (
    <div className={`grid gap-6 border-t border-ink pt-6 md:grid-cols-12 ${className}`} data-reveal>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft md:col-span-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <Tag id={id} className="font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
          {title}
        </Tag>
        {intro && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{intro}</p>}
      </div>
    </div>
  );
}
