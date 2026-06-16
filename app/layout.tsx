import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mai Mohamed — Product Analyst & Market Researcher",
  description:
    "Portfolio of Mai Mohamed, a Product Analyst and Market Researcher passionate about product management and data-driven insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
