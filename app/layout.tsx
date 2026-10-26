import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/Reveal";
import { site } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s — ${site.name}` },
  description: site.seo.description,
  openGraph: { title: site.seo.title, description: site.seo.description, type: "website", url: "/" },
  twitter: { card: "summary", title: site.seo.title, description: site.seo.description },
};

export const viewport: Viewport = { themeColor: "#FDF7ED" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <Header name={site.name} nav={site.nav} cv={site.cv} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
