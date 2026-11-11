"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { dmc } from "@/content/case-studies/dripmycard";
import { ease, fadeUp } from "@/lib/motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { RollText, ArrowBadge } from "@/components/ui/Button";
import { CardSymbol, TiltStage } from "./CardSymbol";
import { DmcTitle } from "./Bits";
import { DripBand } from "./DripBand";

export function DmcHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCard = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const rCard = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-encre pb-24 pt-0 text-papier md:pb-32">
      <DripBand color="#5B2EFF" bar={64} scale={1.25} />

      <div className="shell relative pt-44 md:pt-60">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 font-onest">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]">
            <span className="text-peche">(qtf® — 04/01)</span>
            <span className="text-papier/60">Étude de cas · à la une</span>
          </p>
          <p className="text-xs text-papier/50">{dmc.date}</p>
        </Reveal>

        <div className="relative mt-10 grid items-center gap-10 lg:grid-cols-12">
          <motion.div style={{ y: yTitle }} className="relative z-10 lg:col-span-8">
            <DmcTitle
              as="h1"
              segments={[{ text: "drip" }, { text: "my", className: "text-peche" }, { text: "card" }]}
              className="whitespace-nowrap text-[clamp(2.8rem,12.5vw,12rem)] leading-[0.9]"
            />
            <DmcTitle
              as="p"
              delay={0.5}
              segments={[{ text: dmc.title + "." }]}
              className="mt-6 max-w-[16ch] text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.05] text-peche"
            />
            <Reveal variants={fadeUp} delay={0.9}>
              <p className="mt-8 max-w-xl font-onest text-lg leading-relaxed text-papier/75">{dmc.summary}</p>
            </Reveal>
            <Reveal variants={fadeUp} delay={1.05} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={dmc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-volt py-2 pl-6 pr-2 font-onest text-sm font-bold text-papier transition-colors duration-500 hover:bg-peche hover:text-encre"
                >
                  <RollText>Voir {dmc.urlLabel}</RollText>
                  <ArrowBadge />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#az"
                  className="group inline-flex items-center gap-2 rounded-full border border-papier/20 px-6 py-3.5 font-onest text-sm font-bold transition-colors hover:border-papier"
                >
                  <RollText>Découvrir ↓</RollText>
                </a>
              </Magnetic>
            </Reveal>
          </motion.div>

          <motion.div
            style={{ y: yCard, rotate: rCard }}
            className="pointer-events-auto relative mx-auto w-[min(70vw,420px)] lg:col-span-4 lg:w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.6, ease: ease.expo, delay: 0.3 }}
            >
              <TiltStage max={16}>
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <CardSymbol className="w-full drop-shadow-[0_40px_60px_rgba(255,122,69,0.25)]" />
                </motion.div>
              </TiltStage>
            </motion.div>
            {/* étincelles */}
            {[
              { c: "left-[2%] top-[4%] h-10 w-10", d: 0 },
              { c: "right-[6%] top-[58%] h-6 w-6", d: 0.8 },
              { c: "left-[18%] bottom-[2%] h-5 w-5", d: 1.6 },
            ].map((s, i) => (
              <motion.svg
                key={i}
                viewBox="0 0 24 24"
                aria-hidden
                className={`absolute ${s.c} fill-peche`}
                animate={{ scale: [0.6, 1.1, 0.6], rotate: [0, 45, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
              >
                <path d="M12 0c1 6 4 10 12 12-8 2-11 6-12 12-1-6-4-10-12-12 8-2 11-6 12-12z" />
              </motion.svg>
            ))}
          </motion.div>
        </div>

        <Stagger as="dl" stagger={0.07} delay={0.3} className="mt-20 grid gap-px overflow-hidden rounded-[24px] bg-papier/10 font-onest sm:grid-cols-2 lg:grid-cols-4">
          {dmc.meta.map((m) => (
            <StaggerItem key={m.k} className="bg-encre p-5 md:p-6">
              <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-papier/50">{m.k}</dt>
              <dd className="mt-2 text-base text-papier">{m.v}</dd>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger as="ul" stagger={0.04} delay={0.5} className="mt-6 flex flex-wrap gap-2 font-onest">
          {dmc.services.map((s, i) => (
            <StaggerItem
              as="li"
              key={s}
              className={
                i % 3 === 0
                  ? "rounded-full bg-volt px-4 py-2 text-xs font-bold text-papier"
                  : i % 3 === 1
                    ? "rounded-full bg-peche px-4 py-2 text-xs font-bold text-encre"
                    : "rounded-full border border-papier/20 px-4 py-2 text-xs font-bold text-papier"
              }
            >
              {s}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
