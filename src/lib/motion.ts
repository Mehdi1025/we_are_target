import type { Transition, Variants } from "motion/react";

/** Courbes signature du site */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

export const dur = { fast: 0.45, base: 0.9, slow: 1.3, curtain: 0.85 };

export const spring = {
  magnetic: { stiffness: 180, damping: 16, mass: 0.6 } satisfies Transition,
  cursor: { stiffness: 520, damping: 42, mass: 0.5 } satisfies Transition,
};

/* ── Conteneurs ─────────────────────────────────────────────────── */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ── Éléments ───────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.expo } },
};

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: dur.base, ease: ease.expo } },
};

/** Masking : le mot / la lettre monte depuis sous sa ligne de base */
export const maskUp: Variants = {
  hidden: { y: "112%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: dur.slow, ease: ease.expo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: dur.base, ease: ease.expo } },
};

/** Révélation d'image par clip-path (du bas vers le haut) */
export const clipUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur.slow, ease: ease.quart } },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: dur.slow, ease: ease.expo } },
};

/* ── Transitions de page (rideau) ───────────────────────────────── */
export const curtainLayer = (i: number): Variants => ({
  initial: { y: "100%" },
  enter: { y: "0%", transition: { duration: dur.curtain, ease: ease.quart, delay: i * 0.08 } },
  exit: { y: "-100%", transition: { duration: dur.curtain, ease: ease.quart, delay: (1 - i) * 0.08 } },
});

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 60 },
  enter: { opacity: 1, y: 0, transition: { duration: 1.1, ease: ease.expo, delay: 0.15 } },
};
