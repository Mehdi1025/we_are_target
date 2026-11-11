"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { dmc } from "@/content/case-studies/dripmycard";
import { cn } from "@/lib/utils";

/* ── Boutique : desktop + mobile en parallax différentielle ──────────── */
export function ShopShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yDesk = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yMob = useTransform(scrollYProgress, [0, 1], [200, -160]);
  const rSticker = useTransform(scrollYProgress, [0, 1], [-40, 220]);
  const ySticker = useTransform(scrollYProgress, [0, 1], [120, -220]);
  const { desktop, mobile, sticker } = {
    desktop: dmc.images.shopDesktop,
    mobile: dmc.images.shopMobile,
    sticker: dmc.images.sticker,
  };
  return (
    <div ref={ref} className="relative pb-24 pr-[8%] md:pb-32">
      <motion.div style={{ y: yDesk }} className="overflow-hidden rounded-[22px] bg-papier shadow-[0_50px_100px_-30px_rgba(20,18,31,0.6)]">
        <div className="flex items-center gap-1.5 border-b border-encre/10 bg-white px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-peche" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D8C27A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-volt" />
          <span className="ml-4 rounded-full bg-papier px-4 py-1 font-onest text-[0.7rem] text-gris-dmc">dripmycard.com</span>
        </div>
        <Image src={desktop.src} alt={desktop.alt} width={desktop.w} height={desktop.h} sizes="(max-width:768px) 92vw, 70vw" className="h-auto w-full" />
      </motion.div>
      <motion.div
        style={{ y: yMob }}
        className="absolute bottom-0 right-0 w-[30%] min-w-[120px] overflow-hidden rounded-[26px] border-[6px] border-encre bg-encre shadow-[0_40px_80px_-20px_rgba(20,18,31,0.7)]"
      >
        <Image src={mobile.src} alt={mobile.alt} width={mobile.w} height={mobile.h} sizes="30vw" className="h-auto w-full rounded-[20px]" />
      </motion.div>
      <motion.div style={{ rotate: rSticker, y: ySticker }} className="absolute -left-6 top-[38%] hidden w-[17%] md:block">
        <Image src={sticker.src} alt="" width={sticker.w} height={sticker.h} sizes="17vw" className="h-auto w-full drop-shadow-2xl" />
      </motion.div>
    </div>
  );
}

/* ── Galerie unboxing : colonnes en parallax inverse ────────────────── */
export function Unboxing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -40]);
  const I = dmc.images;
  const cols = [
    { y: y1, items: [I.merci, I.sticker] },
    { y: y2, items: [I.envelope, I.poseVerso] },
    { y: y3, items: [I.gabarit, I.poseRecto] },
  ];
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {cols.map((c, ci) => (
        <motion.div key={ci} style={{ y: c.y }} className={cn("space-y-4 md:space-y-6", ci === 2 && "hidden md:block")}>
          {c.items.map((im) => (
            <div key={im.src} className="group overflow-hidden rounded-2xl" data-cursor="view" data-cursor-label="Zoom">
              <Image
                src={im.src}
                alt={im.alt}
                width={im.w}
                height={im.h}
                sizes="(max-width:768px) 48vw, 32vw"
                className="h-auto w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
