"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/components/motion/useReveal";
import { ease } from "@/lib/motion";

/** Coulures déterministes (pas d'aléatoire → pas d'écart d'hydratation) */
const DRIPS = [
  { l: 4, w: 26, h: 90, drop: true },
  { l: 9, w: 12, h: 40 },
  { l: 22, w: 18, h: 64 },
  { l: 31, w: 30, h: 150, drop: true },
  { l: 38, w: 12, h: 44 },
  { l: 52, w: 22, h: 110 },
  { l: 58, w: 14, h: 36 },
  { l: 69, w: 34, h: 170, drop: true },
  { l: 76, w: 12, h: 52 },
  { l: 86, w: 24, h: 96 },
  { l: 93, w: 14, h: 58, drop: true },
];

/**
 * Bande de coulures de la marque : posée entre deux blocs de couleurs différentes.
 * Les coulures apparaissent à l'entrée dans l'écran puis s'étirent avec le défilement.
 * `color` = couleur du bloc du dessus (elle coule dans le bloc du dessous).
 */
export function DripBand({
  color,
  bar = 18,
  scale = 0.75,
  className,
  flip = false,
}: {
  color: string;
  bar?: number;
  scale?: number;
  className?: string;
  /** Inverse l'ordre des coulures pour varier les transitions */
  flip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const show = useReveal(ref, "0px 0px -5% 0px");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stretch = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.15]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none relative z-10 h-0 w-full [--drip-k:0.5] sm:[--drip-k:0.75] lg:[--drip-k:1]", className)}>
      <div className="absolute inset-x-0 top-0" style={{ height: `calc(${bar}px * var(--drip-k))`, background: color }} />
      {DRIPS.map((d, i) => (
        <motion.div
          key={i}
          className="absolute top-0 origin-top"
          style={{ left: `${flip ? 100 - d.l : d.l}%`, top: `calc(${bar}px * var(--drip-k) - 1px)` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: show ? 1 : 0 }}
          transition={{ duration: 1.4, ease: ease.expo, delay: 0.05 * (i % 5) }}
        >
          <motion.div
            className="origin-top rounded-b-full"
            style={{ width: `calc(${d.w * scale}px * var(--drip-k))`, height: `calc(${d.h * scale}px * var(--drip-k))`, background: color, scaleY: stretch }}
          />
          {d.drop && (
            <span
              className="absolute left-1/2 block -translate-x-1/2 animate-drop rounded-full"
              style={{
                width: `calc(${d.w * scale * 0.55}px * var(--drip-k))`,
                height: `calc(${d.w * scale * 0.55}px * var(--drip-k))`,
                top: `calc(${d.h * scale + 6}px * var(--drip-k))`,
                background: color,
                animationDelay: `${i * 0.37}s`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
