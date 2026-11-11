"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Symbole DripMyCard redessiné en SVG : la carte qui coule.
 * Coulures animées (ooze) + goutte qui tombe en boucle.
 */
export function CardSymbol({
  card = "#FF7A45",
  chip = "#5B2EFF",
  stripe = "#FFD3BF",
  className,
}: {
  card?: string;
  chip?: string;
  stripe?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 220 210" className={cn("overflow-visible", className)} role="img" aria-label="Symbole DripMyCard">
      <g transform="rotate(-7 110 80)">
        {/* coulures (derrière la carte) */}
        <rect
          x="104"
          y="118"
          width="22"
          height="34"
          rx="11"
          fill={card}
          className="animate-ooze"
          style={{ transformBox: "fill-box", transformOrigin: "top" }}
        />
        <rect
          x="140"
          y="118"
          width="26"
          height="58"
          rx="13"
          fill={card}
          className="animate-ooze"
          style={{ transformBox: "fill-box", transformOrigin: "top", animationDelay: "-1.4s" }}
        />
        <circle
          cx="153"
          cy="190"
          r="7"
          fill={card}
          className="animate-drop"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {/* carte */}
        <rect x="20" y="22" width="180" height="112" rx="18" fill={card} />
        {/* puce */}
        <rect x="44" y="50" width="36" height="28" rx="7" fill={chip} />
        <path d="M56 50v28M68 50v28M44 64h36" stroke={card} strokeWidth="3.4" />
        {/* reflets */}
        <circle cx="176" cy="42" r="7" fill="#fff" />
        <circle cx="186" cy="56" r="3.5" fill="#fff" />
        {/* numéros */}
        <path d="M46 108h22M80 108h22M114 108h22" stroke={stripe} strokeOpacity=".75" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Scène qui s'incline en 3D en suivant la souris */
export function TiltStage({
  children,
  className,
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 120, damping: 14 });

  return (
    <div
      ref={ref}
      className={cn("[perspective:1100px]", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const b = ref.current.getBoundingClientRect();
        px.set((e.clientX - b.left) / b.width - 0.5);
        py.set((e.clientY - b.top) / b.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
