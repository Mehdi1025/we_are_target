"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { cn } from "@/lib/utils";

const COPIES = 4;

/**
 * Bandeau typographique infini, réactif au scroll :
 * accélère avec la vitesse de défilement, change de sens avec lui et se penche (skew).
 */
export function Marquee({
  items,
  className,
  itemClassName,
  speed = 2.4,
  reverse = false,
  separator = "•",
  skew = true,
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  /** % de la piste par seconde */
  speed?: number;
  reverse?: boolean;
  separator?: string;
  skew?: boolean;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1200], [0, 5], { clamp: false });
  const skewX = useTransform(smooth, [-2500, 0, 2500], skew ? [8, 0, -8] : [0, 0, 0]);
  const x = useTransform(base, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const dir = useRef(reverse ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = reverse ? 1 : -1;
    else if (f > 0) dir.current = reverse ? -1 : 1;
    let move = dir.current * speed * (delta / 1000);
    move += move * Math.abs(f);
    base.set(base.get() + move);
  });

  const row = (k: number) => (
    <ul key={k} aria-hidden={k > 0} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span className="mx-[0.5em] text-accent">{separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <motion.div style={{ x, skewX }} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, k) => row(k))}
      </motion.div>
    </div>
  );
}
