import type { CardColor } from "@/lib/content";

/* All combinations meet WCAG AA for normal text:
   white on cobalt 5.5:1 · ink on pink tint 13:1 · ink on mustard 9.6:1 · ivory on ink 16:1 */
export const cardTheme: Record<CardColor, { card: string; tag: string; shape: string; dark: boolean }> = {
  cobalt: { card: "bg-cobalt text-white", tag: "border-white", shape: "text-mustard", dark: true },
  pink: { card: "bg-pink-tint text-ink", tag: "border-ink", shape: "text-pink", dark: false },
  mustard: { card: "bg-mustard text-ink", tag: "border-ink", shape: "text-ivory", dark: false },
  ink: { card: "bg-ink text-ivory", tag: "border-ivory", shape: "text-pink", dark: true },
};
