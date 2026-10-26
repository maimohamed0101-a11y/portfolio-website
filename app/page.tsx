import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import WorkGrid from "@/components/WorkGrid";
import CapabilityCard from "@/components/CapabilityCard";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import { Arrow, Star } from "@/components/Doodles";
import { capabilities, experience, projects, site } from "@/lib/content";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

export default function Home() {
  const s = site.sections;
  const current = projects.find((p) => p.period.toLowerCase().includes("present"));

  return (
    <>
      <Hero site={site} current={current} />

      {/* Selected work */}
      <section id="work" aria-labelledby="work-title" className={`${wrap} py-20 lg:py-28`}>
        <SectionHeading id="work-title" {...s.work} />
        <div className="mt-12" data-reveal>
          <WorkGrid projects={projects} />
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="cv-auto border-y border-ink bg-ivory-deep">
        <div className={`${wrap} py-20 lg:py-28`}>
          <SectionHeading id="about-title" {...s.about} />
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="relative md:col-span-3" aria-hidden="true">
              <div className="relative mx-auto size-40 md:mx-0">
                <div className="absolute inset-0 rounded-full border border-ink bg-pink" />
                <div className="absolute -right-4 -bottom-4 size-20 border border-ink bg-mustard" />
                <Star className="absolute -left-2 -top-2 size-10 text-cobalt" />
              </div>
            </div>
            <div className="space-y-6 md:col-span-9" data-reveal>
              <p className="font-display text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
                {site.about.paragraphs[0]}
              </p>
              {site.about.paragraphs.slice(1).map((para) => (
                <p key={para} className="max-w-3xl text-lg leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" aria-labelledby="capabilities-title" className={`${wrap} py-20 lg:py-28`}>
        <SectionHeading id="capabilities-title" {...s.capabilities} />
        <div className="cv-auto mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.id} capability={c} index={i} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" aria-labelledby="approach-title" className="cv-auto on-dark border-y border-ink bg-ink text-ivory">
        <div className={`${wrap} py-20 lg:py-28`}>
          <div className="grid gap-6 border-t border-ivory/40 pt-6 md:grid-cols-12" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ivory/80 md:col-span-3">
              {s.approach.eyebrow}
            </p>
            <div className="md:col-span-9">
              <h2 id="approach-title" className="font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
                {s.approach.title}
              </h2>
              {s.approach.intro && <p className="mt-5 max-w-2xl text-lg text-ivory/85">{s.approach.intro}</p>}
            </div>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ivory/40 bg-ivory/40 sm:grid-cols-2 lg:grid-cols-4">
            {site.approach.map((step, i) => (
              <li
                key={step.title}
                className="group flex flex-col bg-ink p-6 sm:p-8"
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span
                  className={`font-display text-7xl font-bold leading-none ${
                    ["text-pink", "text-mustard", "text-ivory", "text-mustard"][i % 4]
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-8 font-display text-2xl font-semibold leading-tight">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ivory/85">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience & tools */}
      <section id="experience" aria-labelledby="experience-title" className={`${wrap} py-20 lg:py-28`}>
        <SectionHeading id="experience-title" {...s.experience} />
        <div className="cv-auto mt-14 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Experience</h3>
            <div className="mt-6">
              <Timeline items={experience.timeline} />
            </div>
          </div>

          <div className="space-y-14 lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Tools</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {experience.tools.map((tool, i) => (
                  <li
                    key={tool}
                    className={`rounded-full border border-ink px-4 py-2 font-mono text-sm ${
                      i % 4 === 0 ? "bg-mustard" : i % 4 === 2 ? "bg-pink-tint" : "bg-ivory"
                    }`}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Training</h3>
              <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
                {experience.training.map((t) => (
                  <li key={t.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-medium">{t.name}</span>
                    {t.provider && (
                      <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-ink-soft">
                        {t.provider}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">Education</h3>
              <div className="relative mt-6 rounded-2xl border border-ink bg-cobalt p-6 text-white shadow-hard on-dark">
                <p className="font-display text-2xl font-bold">{experience.education.degree}</p>
                <p className="mt-1">
                  {experience.education.institution} · {experience.education.detail}
                </p>
                <p className="mt-4 w-fit rounded-sm bg-mustard px-2 py-1 font-mono text-xs uppercase text-ink">
                  {experience.education.grade}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="cv-auto border-t border-ink">
        <div className={`${wrap} py-20 lg:py-28`}>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">{s.contact.eyebrow}</p>
              <h2
                id="contact-title"
                className="mt-6 font-display text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em]"
              >
                {s.contact.title}
              </h2>
              {s.contact.intro && <p className="mt-6 max-w-md text-lg text-ink-soft">{s.contact.intro}</p>}
              <Arrow className="mt-6 hidden w-28 rotate-[-20deg] text-pink lg:block" />

              <ul className="mt-10 divide-y divide-ink border-y border-ink">
                {[
                  { label: "Email", value: site.email, href: `mailto:${site.email}` },
                  { label: "Phone", value: site.phone.display, href: site.phone.href },
                  { label: "LinkedIn", value: "mai-mohamed-elhatty", href: site.linkedin, external: true },
                  { label: "CV", value: "View CV (Google Drive)", href: site.cv, external: true },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-cobalt-deep"
                    >
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">{item.label}</span>
                      <span className="break-all text-right font-display text-lg font-semibold underline-offset-4 group-hover:underline sm:text-xl">
                        {item.value}
                        {item.external && (
                          <>
                            <span aria-hidden="true"> ↗</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              <ContactForm fallbackEmail={site.email} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
