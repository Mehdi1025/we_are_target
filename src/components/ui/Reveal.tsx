"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { motion, type TargetAndTransition, type Variants } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReveal } from "@/components/motion/useReveal";

type Tag = "div" | "ul" | "ol" | "li" | "section" | "article" | "aside" | "p" | "dl" | "span";

/** Élément unique révélé à l'entrée dans le viewport */
export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  variants?: Variants;
  as?: Tag;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const show = useReveal(ref);
  const Comp = motion[as] as typeof motion.div;
  const v = useMemo<Variants>(() => {
    if (!delay) return variants;
    const s = variants.show as TargetAndTransition;
    return { ...variants, show: { ...s, transition: { ...s.transition, delay } } };
  }, [variants, delay]);
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      variants={v}
      initial="hidden"
      animate={show ? "show" : "hidden"}
    >
      {children}
    </Comp>
  );
}

/** Conteneur de grille : ses <StaggerItem> apparaissent en cascade */
export function Stagger({
  children,
  stagger = 0.09,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const show = useReveal(ref);
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={show ? "show" : "hidden"}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  variants = fadeUp,
  as = "div",
  className,
}: {
  children: ReactNode;
  variants?: Variants;
  as?: Tag;
  className?: string;
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={variants} className={className}>
      {children}
    </Comp>
  );
}
