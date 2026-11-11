"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const letters = "Target".split("");

function Letter({ c, i, progress }: { c: string; i: number; progress: MotionValue<number> }) {
  const start = i * 0.06;
  const y = useTransform(progress, [start, start + 0.55], ["90%", "0%"]);
  const rotate = useTransform(progress, [start, start + 0.55], [8, 0]);
  return (
    <motion.span style={{ y, rotate }} className="inline-block origin-bottom-left will-change-transform">
      {c}
    </motion.span>
  );
}

/** Wordmark géant du footer : les lettres montent une à une, scrubées sur le scroll */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const regScale = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const regRotate = useTransform(scrollYProgress, [0.5, 1], [-180, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none mt-24 flex select-none overflow-hidden font-display text-[22vw] font-bold leading-[0.8] tracking-[-0.07em] text-ink-3"
    >
      {letters.map((c, i) => (
        <Letter key={i} c={c} i={i} progress={scrollYProgress} />
      ))}
      <motion.sup
        style={{ scale: regScale, rotate: regRotate }}
        className="ml-[0.08em] mt-[0.12em] inline-block self-start text-[0.3em] text-accent/80"
      >
        ®
      </motion.sup>
    </div>
  );
}
