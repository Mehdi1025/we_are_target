"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { Play } from "@/components/ui/Icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { useTransitionState } from "@/components/motion/TransitionProvider";
import { VideoModal } from "@/components/home/VideoModal";
import { HeroShader } from "./hero-shader";

/* ---------------- WordsPullUp : lettres qui montent depuis un masque ---------------- */
export function WordsPullUp({
  text,
  show,
  className,
  delay = 0,
  stagger = 0.055,
  mark,
}: {
  text: string;
  show: boolean;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Petit signe en exposant après le dernier caractère (« ® ») */
  mark?: string;
}) {
  const chars = text.split("");
  return (
    <span aria-hidden className={cn("inline-flex", className)}>
      {chars.map((c, i) => (
        <span key={i} className="group/char -mb-[0.1em] inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            className="inline-block origin-bottom-left transition-colors duration-300 group-hover/char:text-accent"
            initial={{ y: "105%", rotate: 8 }}
            animate={show ? { y: "0%", rotate: 0 } : { y: "105%", rotate: 8 }}
            transition={{ duration: 1.25, ease: ease.expo, delay: delay + i * stagger }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
      {mark && (
        <motion.span
          className="relative top-[0.12em] ml-[0.04em] self-start text-[0.22em] leading-none text-accent"
          initial={{ scale: 0, rotate: -180 }}
          animate={show ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 1.1, ease: ease.expo, delay: delay + chars.length * stagger + 0.1 }}
        >
          {mark}
        </motion.span>
      )}
    </span>
  );
}

/* ---------------- WordsPullUpMultiStyle : mots qui montent, styles par segment ---------------- */
export function WordsPullUpMultiStyle({
  segments,
  show,
  className,
  delay = 0,
}: {
  segments: { text: string; className?: string }[];
  show: boolean;
  className?: string;
  delay?: number;
}) {
  const words: { w: string; c?: string }[] = [];
  segments.forEach((s) => s.text.split(" ").forEach((w) => w && words.push({ w, c: s.className })));
  return (
    <span aria-hidden className={cn("inline-flex flex-wrap", className)}>
      {words.map(({ w, c }, i) => (
        <span key={i} className="-mb-[0.1em] mr-[0.25em] inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            className={cn("inline-block", c)}
            initial={{ y: "105%" }}
            animate={show ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 1, ease: ease.expo, delay: delay + i * 0.07 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Ticker des expertises ---------------- */
const EXPERTISES = ["Branding", "Sites web", "Réseaux sociaux", "Publicité", "E-commerce", "CRM & IA"];

function Ticker({ show }: { show: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setI((v) => (v + 1) % EXPERTISES.length), 2200);
    return () => clearInterval(id);
  }, [show]);
  return (
    <span className="relative inline-flex h-[1.2em] min-w-[16ch] overflow-hidden align-bottom text-bone">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={EXPERTISES[i]}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.7, ease: ease.expo }}
          className="absolute left-0 whitespace-nowrap"
        >
          {EXPERTISES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------------- Horloge locale ---------------- */
function Clock() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const f = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Paris" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t ?? "--:--:--"}</span>;
}

/* ---------------- Hero ---------------- */
export function AgencyHero({
  videoSrc,
  posterSrc,
}: {
  /** Optionnel : une vidéo en fond remplace le shader (ex. /media/hero.mp4) */
  videoSrc?: string;
  posterSrc?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { ready } = useTransitionState();
  const hydrated = useHydrated();
  const [video, setVideo] = useState(false);

  // Uniforms du shader
  const introRef = useRef(0);
  const scrollRef = useRef(0);
  useEffect(() => {
    if (!ready) return;
    const c = animate(0, 1, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (introRef.current = v) });
    return () => c.stop();
  }, [ready]);

  // Scroll : la carte se rétracte, le mot remonte
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (scrollRef.current = v));
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 64]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Parallaxe souris sur le mot géant
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], ["1.2%", "-1.2%"]), { stiffness: 80, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], ["2%", "-2%"]), { stiffness: 80, damping: 20 });

  return (
    <section
      ref={ref}
      aria-label="Target Agency"
      className="relative h-svh min-h-[640px] w-full p-2 md:p-3"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 1.4, ease: ease.expo }}
        className="h-full w-full"
      >
        <motion.div
          style={
            hydrated
              ? { scale, borderRadius: radius }
              : { scale: 1, borderRadius: 32 }
          }
          className="relative h-full w-full origin-top overflow-hidden bg-ink-2 will-change-transform"
        >
          {/* Fond animé */}
          {videoSrc ? (
            <video autoPlay loop muted playsInline poster={posterSrc} className="absolute inset-0 h-full w-full object-cover" src={videoSrc} />
          ) : (
            <HeroShader intro={introRef} scroll={scrollRef} />
          )}

          {/* Dégradés de lisibilité */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Ligne d'infos sous l'encoche */}
          <motion.div
            style={hydrated ? { opacity: fade } : undefined}
            className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-24 sm:px-6 md:px-10 md:pt-28"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, ease: ease.expo, delay: 0.6 }}
              className="label flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              <span className="text-accent">(qtf® — 01)</span>
              <span>{site.tagline}</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, ease: ease.expo, delay: 0.7 }}
              className="label hidden text-right md:block"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />
              France — <Clock />
              <br />
              <span className="mt-1.5 inline-block">100 % à distance</span>
            </motion.p>
          </motion.div>

          {/* Contenu bas */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-3 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 items-end gap-4">
              <motion.div
                style={hydrated ? { y: wordY } : undefined}
                className="col-span-12 lg:col-span-8"
              >
                <motion.p
                  style={hydrated ? { opacity: fade } : undefined}
                  initial={{ opacity: 0 }}
                  animate={ready ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="label mb-3 flex items-center gap-2 md:mb-0 md:ml-[0.6vw]"
                >
                  <span className="text-accent">●</span> On construit — <Ticker show={ready} />
                </motion.p>
                <h1 className="font-display font-semibold leading-[0.82] tracking-[-0.075em] text-bone">
                  <span className="sr-only">Target Agency — agence de marketing digital et de communication. Votre image, notre cible.</span>
                  <motion.span style={{ x: px, y: py }} className="block text-[25vw] sm:text-[23vw] lg:text-[17vw]">
                    <WordsPullUp text="Target" show={ready} delay={0.35} mark="®" />
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div
                style={hydrated ? { opacity: fade } : undefined}
                className="col-span-12 flex flex-col gap-5 pb-5 lg:col-span-4 lg:pb-12"
              >
                <p className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-3xl">
                  <span className="sr-only">Votre image. Notre cible.</span>
                  <WordsPullUpMultiStyle
                    show={ready}
                    delay={0.9}
                    segments={[{ text: "Votre image." }, { text: "Notre cible.", className: "text-accent" }]}
                  />
                </p>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={ready ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.9, ease: ease.expo, delay: 1.15 }}
                  className="max-w-md text-sm leading-[1.35] text-bone/75 sm:text-base"
                >
                  Branding, sites web, réseaux sociaux, publicité et outils : nous transformons les ambitions des
                  entreprises en marques fortes, qui créent la confiance et laissent une empreinte durable.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={ready ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.9, ease: ease.expo, delay: 1.3 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <ButtonLink href="/contacts">Démarrer un projet</ButtonLink>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => setVideo(true)}
                      className="group inline-flex items-center gap-3 rounded-full border border-bone/20 bg-black/20 py-2 pl-2 pr-5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-bone backdrop-blur-md transition-colors hover:border-bone"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-bone text-ink transition-colors group-hover:bg-accent">
                        <Play className="h-3 w-3" />
                      </span>
                      Showreel <span className="text-bone/50">{site.video.duration}</span>
                    </button>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <VideoModal open={video} onClose={() => setVideo(false)} />
    </section>
  );
}
