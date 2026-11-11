"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { useTransitionState } from "./TransitionProvider";

const word = "Target".split("");

function Counter({ onDone }: { onDone: () => void }) {
  const v = useMotionValue(0);
  const rounded = useTransform(v, (n) => String(Math.round(n)).padStart(3, "0"));
  const width = useTransform(v, (n) => `${n}%`);
  const [text, setText] = useState("000");

  useEffect(() => {
    const unsub = rounded.on("change", setText);
    const controls = animate(v, 100, { duration: 1.6, ease: [0.65, 0, 0.35, 1], onComplete: onDone });
    return () => {
      unsub();
      controls.stop();
    };
  }, [v, rounded, onDone]);

  return (
    <>
      <motion.div style={{ width }} className="absolute bottom-0 left-0 h-[3px] bg-accent" />
      <span className="font-mono text-sm tabular-nums text-mute">{text}</span>
    </>
  );
}

export function Preloader() {
  const { phase, endIntro } = useTransitionState();

  return (
    <AnimatePresence>
      {phase === "intro" && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 md:p-10"
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 1, ease: ease.quart } }}
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <div className="flex items-start justify-between">
            <span className="label text-accent">(qtf® — 00)</span>
            <span className="label">Agence de marketing digital & de communication</span>
          </div>
          <motion.p
            aria-label="Target"
            className="flex overflow-hidden font-display text-[clamp(5rem,22vw,22rem)] font-bold leading-[0.82] tracking-[-0.07em]"
            exit={{ y: "-30%", opacity: 0, transition: { duration: 0.6, ease: ease.quart } }}
          >
            {word.map((c, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: ease.expo, delay: 0.1 + i * 0.06 }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: ease.expo, delay: 0.6 }}
              className="ml-[0.04em] inline-block text-accent"
            >
              ®
            </motion.span>
          </motion.p>
          <div className="relative flex items-end justify-between pb-4">
            <span className="label">Votre image. Notre cible.</span>
            <Counter onDone={endIntro} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
