import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import capabilitiesJson from "@/content/capabilities.json";
import experienceJson from "@/content/experience.json";

/* Types describe the shape of the files in /content. Edit the JSON, not this file. */

export type Discipline = "Product Analytics" | "Market Research" | "Product Management";
export const DISCIPLINES: Discipline[] = ["Product Analytics", "Market Research", "Product Management"];

export type CardColor = "cobalt" | "pink" | "mustard" | "ink";

export type ProjectRole = {
  role: string;
  period: string;
  location?: string;
  responsibilities: string[];
};

export type Project = {
  slug: string;
  client: string;
  role: string;
  period: string;
  location?: string;
  engagement?: string;
  title: string;
  summary: string;
  disciplines: Discipline[];
  color: CardColor;
  responsibilities: string[];
  tools: string[];
  additionalRoles: ProjectRole[];
  /** Optional, rendered only when supplied by the owner. */
  context?: string;
  outcomes?: string[];
  images?: { src: string; alt: string; width: number; height: number }[];
  /** Set to "concept" or "prototype" to label non-client work. */
  status?: "concept" | "prototype";
};

export type Link = { label: string; href: string };

export type Site = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: { display: string; href: string };
  linkedin: string;
  cv: string;
  seo: { title: string; description: string };
  nav: Link[];
  hero: {
    statement: string;
    highlight: string;
    supporting: string;
    primaryCta: Link;
    secondaryCta: Link;
    ticker: string[];
  };
  sections: Record<
    "work" | "about" | "capabilities" | "approach" | "experience" | "contact",
    { eyebrow: string; title: string; intro?: string }
  >;
  about: { paragraphs: string[] };
  approach: { title: string; body: string }[];
};

export type Capability = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  shape: "circle" | "square" | "triangle";
};

export type TimelineItem = {
  period: string;
  role: string;
  organisation: string;
  location?: string;
  current?: boolean;
};

export type Experience = {
  timeline: TimelineItem[];
  tools: string[];
  training: { name: string; provider?: string }[];
  education: { degree: string; institution: string; detail: string; grade: string };
};

export const site = siteJson as Site;
export const projects = projectsJson as Project[];
export const capabilities = capabilitiesJson as Capability[];
export const experience = experienceJson as Experience;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
