"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Bouton magnétique : l'élément suit la souris (strength) et son contenu
 * glisse légèrement plus (effet de profondeur). Le curseur custom l'englobe via [data-magnetic].
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);
  const ix = useTransform(sx, (v) => v * 0.35);
  const iy = useTransform(sy, (v) => v * 0.35);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    x.set((e.clientX - (b.left + b.width / 2)) * strength);
    y.set((e.clientY - (b.top + b.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      data-magnetic=""
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("relative inline-flex", className)}
    >
      <motion.span style={{ x: ix, y: iy }} className="inline-flex">
        {children}
      </motion.span>
    </motion.span>
  );
}
