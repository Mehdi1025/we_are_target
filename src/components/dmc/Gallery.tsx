"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { dmc } from "@/content/case-studies/dripmycard";
import { cn } from "@/lib/utils";
import { DmcTitle } from "./Bits";

const I = dmc.images;
const ITEMS = [
  { im: I.shopDesktop, bg: "bg-white", fit: "cover" },
  { im: I.cover, bg: "bg-encre", fit: "cover" },
  { im: I.shopMobile, bg: "bg-volt", fit: "contain" },
  { im: I.appIcon, bg: "bg-peche", fit: "contain" },
  { im: I.avatar, bg: "bg-papier", fit: "contain" },
] as const;

/**
 * Le travail en images : défilement horizontal piloté par le scroll vertical.
 * Chaque visuel est posé sur un aplat de la palette et légèrement incliné.
 */
export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);
  const [horizontal, setHorizontal] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      if (reduce.matches) {
        setHorizontal(false);
        setHeight(null);
        return;
      }
      setHorizontal(true);
      const el = track.current;
      if (!el) return;
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useSpring(
    useTransform(() => -scrollYProgress.get() * distance.get()),
    { stiffness: 200, damping: 38, mass: 0.4 },
  );
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <section
      ref={section}
      aria-label="DripMyCard en images"
      className="relative bg-lilas text-encre"
      style={horizontal && height ? { height } : undefined}
    >
      <div className={cn(horizontal ? "sticky top-0 flex h-svh flex-col overflow-hidden" : "py-24")}>
        <div className="shell pt-24 md:pt-28">
          <DmcTitle segments={[{ text: "en images" }]} className="text-[clamp(2.4rem,6vw,5.5rem)] leading-none" />
        </div>

        <motion.div
          ref={track}
          style={horizontal ? { x } : undefined}
          className={cn(
            "flex gap-5 will-change-transform md:gap-8",
            horizontal ? "mt-8 w-max min-h-0 flex-1 items-center px-5 pb-8 md:px-10" : "shell mt-10 flex-col",
          )}
        >
          {ITEMS.map(({ im, bg, fit }, i) => (
            <figure
              key={im.src}
              data-cursor="view"
              data-cursor-label="Voir"
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-[28px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0",
                bg,
                horizontal ? "h-[min(56vh,64vw)] aspect-[4/3]" : "aspect-[4/3] w-full",
                i % 2 ? "rotate-1" : "-rotate-1",
              )}
            >
              <Image
                src={im.src}
                alt={im.alt}
                fill
                sizes="(max-width: 768px) 85vw, 60vw"
                className={cn(
                  "transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                  fit === "cover" ? "object-cover object-top" : "object-contain p-[8%]",
                )}
              />
            </figure>
          ))}
        </motion.div>

        {horizontal && (
          <div className="shell pb-6">
            <div className="h-1 w-full overflow-hidden rounded-full bg-encre/10">
              <motion.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-volt" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
