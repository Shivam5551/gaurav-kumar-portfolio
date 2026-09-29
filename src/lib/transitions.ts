export const ease = {
    quint: [0.16, 1, 0.3, 1] as const,
    quart: [0.22, 1, 0.36, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
} as const;


export const spring = {
    panel: { type: "spring", stiffness: 320, damping: 34, mass: 0.9 } as const,
};


import { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};