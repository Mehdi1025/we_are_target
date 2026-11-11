"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/content/site";
import { Index } from "@/components/ui/Section";

const text =
  "Chaque entreprise a une histoire, une ambition, une vision. Notre rôle : en faire une marque qui inspire confiance et impose sa présence. Nous ne créons rien au hasard.";

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function Vision() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <section className="shell py-28 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Index n="02">Notre vision de la marque</Index>
        </div>
        <div className="md:col-span-9">
          <p ref={ref} className="display-md leading-[1.12]! tracking-[-0.03em]">
            {words.map((w, i) => (
              <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />
            ))}
          </p>
          <div className="mt-12 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent font-display font-bold text-ink">
              AF
            </span>
            <div>
              <p className="font-medium">{site.founder.name}</p>
              <p className="label mt-1">{site.founder.role}</p>
            </div>
            <p className="ml-auto hidden max-w-sm text-sm text-mute md:block">
              Nous analysons votre vision, votre audience et vos objectifs pour construire une marque
              avec un véritable impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
