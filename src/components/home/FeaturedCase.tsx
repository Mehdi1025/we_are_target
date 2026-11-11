"use client";

import "@fontsource-variable/onest";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { dmc } from "@/content/case-studies/dripmycard";
import { fadeUp, fadeUpBlur } from "@/lib/motion";
import { Index } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DripBand } from "@/components/dmc/DripBand";
import { CardSymbol, TiltStage } from "@/components/dmc/CardSymbol";
import { DmcTitle } from "@/components/dmc/Bits";

/**
 * Projet à la une : le site Target « coule » dans l'univers DripMyCard.
 * Composition en couches (boutique desktop, mobile, sticker, symbole) en parallax + tilt souris.
 */
export function FeaturedCase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yDesk = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yMob = useTransform(scrollYProgress, [0, 1], [220, -180]);
  const ySticker = useTransform(scrollYProgress, [0, 1], [160, -260]);
  const rSticker = useTransform(scrollYProgress, [0, 1], [-60, 200]);
  const yCard = useTransform(scrollYProgress, [0, 1], [260, -120]);
  const I = dmc.images;
  const href = `/cases/${dmc.slug}`;

  return (
    <>
      <section ref={ref} aria-labelledby="featured-title" className="relative bg-volt pb-28 text-papier md:pb-36">
        <DripBand color="#171717" bar={0} scale={1} />
        <div className="shell relative pt-44 md:pt-56">
          <Reveal className="flex flex-wrap items-center justify-between gap-4">
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 leading-snug text-papier/70">
              <span className="whitespace-nowrap text-peche">(qtf® — 04)</span>
              <span>Projet à la une</span>
            </p>
            <p className="label text-papier/70">E-commerce · Europe · 2026</p>
          </Reveal>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-5">
              <h2 id="featured-title" className="sr-only">
                DripMyCard — {dmc.title}
              </h2>
              <DmcTitle
                as="p"
                segments={[{ text: "drip" }, { text: "my", className: "text-peche" }, { text: "card" }]}
                className="whitespace-nowrap text-[clamp(3rem,13vw,6.2rem)] leading-[0.9] lg:text-[clamp(3rem,6.2vw,7rem)]"
              />
              <DmcTitle
                as="p"
                delay={0.4}
                segments={[{ text: dmc.title + "." }]}
                className="mt-5 max-w-[14ch] text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] text-papier/90"
              />
              <Reveal variants={fadeUpBlur} delay={0.5}>
                <p className="mt-8 max-w-md font-onest text-base leading-relaxed text-papier/80">{dmc.summary}</p>
              </Reveal>
              <Stagger as="ul" stagger={0.05} delay={0.6} className="mt-8 flex flex-wrap gap-2 font-onest">
                {["Naming", "Identité", "E-commerce", "Packaging", "Production"].map((t, i) => (
                  <StaggerItem
                    as="li"
                    key={t}
                    variants={fadeUp}
                    className={
                      i === 0
                        ? "rounded-full bg-peche px-3.5 py-1.5 text-xs font-bold text-encre"
                        : "rounded-full border border-papier/30 px-3.5 py-1.5 text-xs font-bold"
                    }
                  >
                    {t}
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.8} className="mt-10">
                <ButtonLink href={href} variant="light">
                  Voir l’étude de cas
                </ButtonLink>
              </Reveal>
            </div>

            {/* Composition */}
            <Link
              href={href}
              data-cursor="view"
              data-cursor-label="Voir"
              aria-label="Voir l’étude de cas DripMyCard"
              className="relative block lg:col-span-7"
            >
              <TiltStage max={7} className="relative">
                <div className="relative pb-[12%] pr-[14%]">
                  <motion.div
                    style={{ y: yDesk }}
                    className="-rotate-2 overflow-hidden rounded-[20px] bg-papier shadow-[0_60px_120px_-30px_rgba(20,18,31,0.65)]"
                  >
                    <div className="flex items-center gap-1.5 bg-white px-3 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-peche" />
                      <span className="h-2 w-2 rounded-full bg-[#D8C27A]" />
                      <span className="h-2 w-2 rounded-full bg-volt" />
                    </div>
                    <Image
                      src={I.shopDesktop.src}
                      alt={I.shopDesktop.alt}
                      width={I.shopDesktop.w}
                      height={I.shopDesktop.h}
                      sizes="(max-width:1024px) 85vw, 50vw"
                      className="h-auto w-full"
                    />
                  </motion.div>
                  <motion.div
                    style={{ y: yMob }}
                    className="absolute bottom-0 right-0 w-[28%] rotate-3 overflow-hidden rounded-[22px] border-[5px] border-encre bg-encre shadow-[0_40px_80px_-20px_rgba(20,18,31,0.75)]"
                  >
                    <Image src={I.shopMobile.src} alt="" width={I.shopMobile.w} height={I.shopMobile.h} sizes="25vw" className="h-auto w-full rounded-[17px]" />
                  </motion.div>
                  <motion.div style={{ y: ySticker, rotate: rSticker }} className="absolute -left-[6%] -top-[8%] w-[20%]">
                    <Image src={I.sticker.src} alt="" width={I.sticker.w} height={I.sticker.h} sizes="20vw" className="h-auto w-full drop-shadow-2xl" />
                  </motion.div>
                  <motion.div style={{ y: yCard }} className="absolute -bottom-[6%] left-[4%] w-[26%]">
                    <CardSymbol className="w-full drop-shadow-[0_30px_40px_rgba(20,18,31,0.45)]" />
                  </motion.div>
                </div>
              </TiltStage>
            </Link>
          </div>

          <Stagger as="dl" stagger={0.08} className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-papier/15 font-onest md:grid-cols-4">
            {[
              ["A → Z", "de l’idée au colis"],
              ["9", "skins au lancement"],
              ["100 %", "produit en interne"],
              ["4", "marchés européens"],
            ].map(([v, l]) => (
              <StaggerItem key={l} className="flex flex-col-reverse bg-volt p-5 md:p-7">
                <dt className="mt-1 text-sm text-papier/75">{l}</dt>
                <dd className="text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">{v}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      {/* le volt coule dans la suite du site */}
      <div className="relative h-28 bg-ink">
        <DripBand color="#5B2EFF" bar={0} scale={0.9} flip />
      </div>
    </>
  );
}
