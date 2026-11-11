"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Parallax d'image : le contenu (agrandi) défile plus lentement que son cadre.
 * `amount` = amplitude en % de la hauteur du cadre.
 */
export function Parallax({
  children,
  amount = 12,
  className,
  innerClassName,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Le calque intérieur déborde en haut et en bas de `amount` % : aucun rognage latéral.
  const travel = amount / (1 + (2 * amount) / 100);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, top: `-${amount}%`, bottom: `-${amount}%` }}
        className={cn("absolute inset-x-0 will-change-transform", innerClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}
