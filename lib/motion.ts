import type { Variants } from "framer-motion";

export const EASE = "easeOut" as const;

export function fadeUpVariants(stagger = 0.1): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeLeftItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};
