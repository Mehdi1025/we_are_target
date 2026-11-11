"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { ease, maskUp, staggerContainer } from "@/lib/motion";
import { useReveal } from "@/components/motion/useReveal";

/** Titre dans la police maison (minuscules), révélé lettre par lettre ; `color` par segment */
export function DmcTitle({
  segments,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  segments: { text: string; className?: string }[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const show = useReveal(ref);
  const label = segments.map((s) => s.text).join("");
  return (
    <Tag ref={ref} aria-label={label} className={cn("font-dmc font-normal lowercase tracking-normal", className)}>
      <motion.span
        aria-hidden
        className="block"
        variants={staggerContainer(0.035, delay)}
        initial="hidden"
        animate={show ? "show" : "hidden"}
      >
        {segments.map((s, si) =>
          s.text.split(/(\n)/).map((chunk, ci) =>
            chunk === "\n" ? (
              <br key={`${si}-${ci}`} />
            ) : (
              chunk.split(" ").map((word, wi, arr) => (
                <span key={`${si}-${ci}-${wi}`} className={cn("inline-block whitespace-nowrap", s.className)}>
                  {word.split("").map((c, k) => (
                    <span key={k} className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                      <motion.span variants={maskUp} className="inline-block">
                        {c}
                      </motion.span>
                    </span>
                  ))}
                  {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))
            ),
          )
        )}
      </motion.span>
    </Tag>
  );
}

/** En-tête de chapitre : numéro, rubrique, titre maison et souligné dessiné à la main */
export function Chapter({
  n,
  kicker,
  title,
  tone = "light",
  className,
}: {
  n: string;
  kicker: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const show = useReveal(ref);
  return (
    <div ref={ref} className={cn("grid gap-6 md:grid-cols-12", className)}>
      <div className="flex items-baseline gap-4 md:col-span-3">
        <span className={cn("font-onest text-sm font-extrabold", tone === "dark" ? "text-peche" : "text-volt")}>{n}</span>
        <span
          className={cn(
            "font-onest text-xs font-bold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-papier/60" : "text-gris-dmc",
          )}
        >
          {kicker}
        </span>
      </div>
      <div className="relative md:col-span-9">
        <DmcTitle
          segments={[{ text: title }]}
          className={cn("text-[clamp(3rem,9vw,8.5rem)] leading-[0.95]", tone === "dark" ? "text-papier" : "text-encre")}
        />
        <svg viewBox="0 0 400 24" className="mt-2 h-4 w-[min(60%,420px)] md:h-5" aria-hidden fill="none">
          <motion.path
            d="M4 16 C 70 8, 140 6, 210 10 S 340 18, 396 8"
            stroke="#FF7A45"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={{ duration: 1.2, ease: ease.expo, delay: 0.5 }}
          />
        </svg>
      </div>
    </div>
  );
}

/** Texte dont les mots s'allument au fil du scroll */
function ScrubWord({ w, i, total, p }: { w: string; i: number; total: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / total, (i + 1) / total], [0.16, 1]);
  return (
    <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">
      {w}
    </motion.span>
  );
}
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <ScrubWord key={i} w={w} i={i} total={words.length} p={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}

/** Chiffre qui défile jusqu'à sa valeur à l'entrée dans l'écran */
export function CountUp({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const show = useReveal(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!show) return;
    const c = animate(0, value, { duration: 1.6, ease: ease.expo, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [show, value]);
  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {n}
        {suffix}
      </span>
    </span>
  );
}

/** Pastille de la marque (« éd. limitée ») */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-peche px-4 py-1.5 font-onest text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-encre",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Rond numéroté (étapes 1-2-3) */
export function Num({ n, tone = "volt", className }: { n: number | string; tone?: "volt" | "peche"; className?: string }) {
  return (
    <span
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full font-onest text-lg font-extrabold",
        tone === "volt" ? "bg-volt text-papier" : "bg-peche text-encre",
        className,
      )}
    >
      {n}
    </span>
  );
}
