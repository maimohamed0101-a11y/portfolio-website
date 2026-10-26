import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudy from "@/components/CaseStudy";
import { getProject, projects, site } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.client}: ${project.title.replace(/\.$/, "")}`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  return (
    <>
      <CaseStudy project={project} index={i} prev={projects[i - 1]} next={projects[i + 1]} />
      <section aria-labelledby="cta-title" className="border-t border-ink bg-mustard">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <h2 id="cta-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Want to talk about this work?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink bg-cobalt px-6 py-3.5 font-display font-semibold text-white shadow-hard hover:bg-cobalt-deep"
            >
              Get in touch <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-full border border-ink bg-ivory px-6 py-3.5 font-display font-semibold hover:bg-ink hover:text-ivory"
            >
              Email Mai
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
