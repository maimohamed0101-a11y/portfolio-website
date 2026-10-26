# Mai Mohamed — Portfolio

Personal portfolio site for Mai Mohamed, Product Analyst / Owner.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · self-hosted fonts via Fontsource
(Space Grotesk, Inter, JetBrains Mono). The homepage and case studies are pre-rendered as static pages.
A small Node API route (`/api/contact`) handles the contact form.

---

## Edit the content

All of the text on the site lives in `content/`. You only need to edit these files, never the components.

| File | What it holds |
| --- | --- |
| `content/site.json` | Name, title, location, email, phone, LinkedIn, CV link, hero text, About paragraphs, section headings, My Approach steps |
| `content/projects.json` | The four Selected Work projects. Each one also generates its case study at `/work/<slug>` |
| `content/capabilities.json` | The three capability cards |
| `content/experience.json` | Experience timeline, tools, training, education |

Some project fields are optional and only show up once you fill them in:

- `context`: a paragraph of background shown at the top of the case study
- `outcomes`: a list of results. Only add results you can stand behind.
- `images`: `[{ "src": "/work/waffarha-1.png", "alt": "…", "width": 1600, "height": 1000 }]` (put the files in `public/`). They lazy-load and need alt text.
- `status`: `"concept"` or `"prototype"`. This puts a visible label on the card and the case study.
- `color`: `cobalt`, `pink`, `mustard` or `ink`. All four meet WCAG AA contrast.
- `disciplines`: any of `Product Analytics`, `Market Research`, `Product Management`. These drive the filter on the homepage.

To add a project, add an object to `projects.json` with a new `slug`. Its route is created at build time.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start                    # http://localhost:3000
npm run typecheck            # TypeScript only
```

## Environment variables

Everything is optional. Without any variables the site works and form submissions are saved to `data/submissions.json`.

| Variable | Purpose |
| --- | --- |
| `SUBMISSIONS_DIR` | Folder for `submissions.json`. Defaults to `./data`. |
| `RESEND_API_KEY` | API key from [Resend](https://resend.com). Turns on email notifications. |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend, e.g. `Portfolio <hello@yourdomain.com>`. Required with the key. |
| `CONTACT_TO_EMAIL` | Who receives notifications. Defaults to the email in `content/site.json` (mai.mohamed0101@gmail.com). |
| `NEXT_PUBLIC_SITE_URL` | The public URL, used for metadata, the sitemap and robots.txt. |

Secrets only go in `.env.local` or your host's environment settings. Both `.env*` and `data/submissions.json` are git-ignored.

### How the contact form works

1. The browser checks the fields as you go and again on submit, using `lib/validation.ts`.
2. `POST /api/contact` runs the same validation on the server. It also has a hidden honeypot field to catch bots, and allows 5 submissions per IP every 10 minutes.
3. The submission is appended to `submissions.json`, and an email is sent through Resend if the key is set (reply-to is the visitor's address).
4. The request succeeds if either storage or email worked. If both fail, the visitor sees an error with a direct email link.

## Deploy

### Option A: a Node host (Render, Railway, Fly.io, a VPS). Recommended if you want the JSON file.

- Build command: `npm install && npm run build`
- Start command: `npm start` (respects `PORT`)
- Set the environment variables above.
- To keep `submissions.json` across deploys, attach a persistent disk and point `SUBMISSIONS_DIR` at it (for example `/var/data`).

### Option B: Vercel

1. Push the repo to GitHub and import it in Vercel. It detects Next.js on its own.
2. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` in Project → Settings → Environment Variables.
3. Set `SUBMISSIONS_DIR=/tmp`. Serverless file storage is temporary, so on Vercel the **email notification is the reliable record**. If you need permanent storage there, swap `lib/submissions.ts` for a database such as Vercel Postgres, Supabase or Upstash.

## Project structure

```
app/
  layout.tsx            Header, footer, fonts, metadata
  page.tsx              Homepage sections, in order
  work/[slug]/page.tsx  Case study route, generated from content/projects.json
  api/contact/route.ts  Contact form endpoint
components/             Header, Hero, ProjectCard, WorkGrid (filter), CaseStudy, SectionHeading,
                        Timeline, CapabilityCard, ContactForm, Footer, Doodles, Reveal
content/                All editable text
lib/                    Content types, shared validation, storage, email
```

## Accessibility and performance

- One `h1` per page with a logical heading order, landmarks, and a skip link.
- Visible focus rings everywhere. The mobile menu traps focus, closes on Escape and returns focus to the Menu button.
- Text on every card colour meets WCAG AA.
- `prefers-reduced-motion` turns off scroll reveals, hover lifts and the ticker.
- Off-screen sections use `content-visibility: auto`. Fonts are self-hosted. There are no third-party scripts.
- Local Lighthouse runs (throttled mobile and desktop): Accessibility, Best Practices and SEO all 100. Performance was 100 on desktop and about 93–97 on mobile.
