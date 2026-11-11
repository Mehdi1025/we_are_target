"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { dmc } from "@/content/case-studies/dripmycard";
import { cn } from "@/lib/utils";
import { ease, fadeUp } from "@/lib/motion";
import { useReveal } from "@/components/motion/useReveal";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/* ── Palette : les couleurs s'élargissent au survol ─────────────────── */
export function Palette() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const show = useReveal(ref);
  return (
    <div ref={ref} className="flex h-[360px] flex-col gap-3 md:h-[380px] md:flex-row">
      {dmc.identity.palette.map((c, i) => (
        <motion.div
          key={c.hex}
          onPointerEnter={() => setActive(i)}
          onPointerLeave={() => setActive(null)}
          initial={{ opacity: 0, y: 60 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: ease.expo, delay: i * 0.08 }}
          style={{ background: c.hex, color: c.ink, flexGrow: active === i ? 2.2 : 1 }}
          className={cn(
            "flex min-h-0 basis-0 flex-col justify-between rounded-[28px] p-6 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-7",
            c.name === "papier" && "ring-1 ring-encre/10",
          )}
        >
          <span className="font-dmc text-4xl leading-none md:text-5xl">{c.name}</span>
          <span className="font-onest text-lg font-extrabold">{c.hex}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Spécimen typographique ──────────────────────────────────────────── */
const ROW1 = "abcdefghijklm".split("");
const ROW2 = "nopqrstuvwxyz".split("");

function Glyphs({ chars, className }: { chars: string[]; className?: string }) {
  return (
    <p className={cn("flex flex-wrap font-dmc leading-none", className)} aria-label={chars.join("")}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:-rotate-6 hover:scale-125"
        >
          {c}
        </span>
      ))}
    </p>
  );
}

export function TypeSpecimen() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="overflow-hidden rounded-[28px] bg-encre p-7 text-papier md:p-10 lg:col-span-8">
        <p className="font-onest text-xs font-bold uppercase tracking-[0.22em] text-papier/60">Police maison</p>
        <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6">
          <span aria-hidden className="font-dmc text-[clamp(7rem,16vw,13rem)] leading-[0.75]">
            a<span className="text-peche">a</span>
          </span>
          <div className="space-y-2">
            <Glyphs chars={ROW1} className="text-[clamp(1.6rem,3vw,2.6rem)]" />
            <Glyphs chars={ROW2} className="text-[clamp(1.6rem,3vw,2.6rem)] text-peche" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-[28px] bg-white p-7 md:p-10 lg:col-span-4">
        <p className="font-onest text-xs font-bold uppercase tracking-[0.22em] text-gris-dmc">Texte · Onest</p>
        <p className="mt-8 font-onest text-3xl font-extrabold leading-tight text-encre md:text-4xl">Ta carte mérite mieux.</p>
      </div>
    </div>
  );
}

/* ── Éléments graphiques ─────────────────────────────────────────────── */
export function ElementsGrid() {
  return (
    <Stagger as="ul" stagger={0.06} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {dmc.identity.elements.map((key, i) => (
        <StaggerItem as="li" key={key} variants={fadeUp} className="group">
          <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-[22px] bg-white p-6">
            <Image
              src={dmc.elementImage(key)}
              alt=""
              width={320}
              height={240}
              className={cn(
                "max-h-full w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                i % 2 ? "group-hover:-rotate-6 group-hover:scale-110" : "group-hover:rotate-6 group-hover:scale-110",
              )}
            />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
