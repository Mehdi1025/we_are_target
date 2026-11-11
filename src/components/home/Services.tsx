"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { services, type Service } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { Index } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

/**
 * Services — « Sticky Horizontal Scroll » :
 * la section est épinglée, le scroll vertical fait défiler les cartes horizontalement.
 * Repli vertical si l'utilisateur préfère réduire les animations.
 */
export function Services() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);
  const [horizontal, setHorizontal] = useState(true);
  const [active, setActive] = useState(0);

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
    reduce.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      reduce.removeEventListener("change", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(() => -scrollYProgress.get() * distance.get());
  const x = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(services.length - 1, Math.max(0, Math.round(v * (services.length + 0.4) - 0.6))));
  });

  return (
    <section
      ref={section}
      id="services"
      aria-label="Nos services"
      className="relative"
      style={horizontal && height ? { height } : undefined}
    >
      <div className={cn(horizontal ? "sticky top-0 flex h-svh flex-col overflow-hidden" : "py-24")}>
        {/* En-tête fixe de la section */}
        <div className="shell flex items-end justify-between gap-6 pt-20 md:pt-28">
          <Index n="03">Nos services</Index>
          {horizontal && (
            <p className="label tabular-nums" aria-hidden>
              <span className="text-bone">{String(active + 1).padStart(2, "0")}</span> / {String(services.length).padStart(2, "0")}
            </p>
          )}
        </div>

        <motion.div
          ref={track}
          style={horizontal ? { x } : undefined}
          className={cn(
            "flex gap-5 will-change-transform md:gap-6",
            horizontal ? "mt-6 min-h-0 w-max flex-1 items-stretch px-5 pb-6 md:mt-8 md:px-10 md:pb-14" : "shell mt-10 flex-col",
          )}
        >
          {/* Panneau d'intro */}
          <div className={cn("flex shrink-0 flex-col justify-between", horizontal && "w-[85vw] md:w-[42vw]")}>
            <div>
              <motion.div style={horizontal ? { x: titleX } : undefined}>
                <SplitReveal as="h2" className="display-xl" text={"Nos domaines\nd’expertise"} accent />
              </motion.div>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-mute">
                Des expertises complémentaires pour créer des marques fortes, cohérentes et prêtes à évoluer.
                Un seul partenaire, de l’identité aux outils.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <ButtonLink href="/contacts" variant="ghost">
                Démarrer mon projet
              </ButtonLink>
              {horizontal && <span className="label hidden md:inline">Scrollez →</span>}
            </div>
          </div>

          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} horizontal={horizontal} active={active === i} />
          ))}

          {/* Panneau de fin */}
          <div
            className={cn(
              "flex shrink-0 flex-col justify-between rounded-3xl bg-accent p-7 text-ink md:p-10",
              horizontal && "w-[85vw] md:w-[34vw]",
            )}
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em]">(qtf® — 03.∞) Sur mesure</p>
            <div>
              <p className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-6xl">
                Un besoin qui ne rentre dans aucune case ?
              </p>
              <ButtonLink href="/contacts" variant="light" wrapperClassName="mt-8">
                Parlons-en
              </ButtonLink>
            </div>
          </div>
        </motion.div>

        {horizontal && (
          <div className="shell pb-6">
            <div className="h-px w-full bg-line">
              <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-accent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ s, index, horizontal, active }: { s: Service; index: number; horizontal: boolean; active: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex shrink-0 flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-700 md:p-10",
        horizontal && "w-[85vw] md:w-[46vw] lg:w-[38vw]",
        active ? "border-accent/60 bg-ink-2" : "hairline bg-ink",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="label">© — {s.id}.</span>
        <span
          aria-hidden
          className={cn(
            "font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.8] tracking-[-0.07em] transition-colors duration-700",
            active ? "text-accent" : "text-ink-3",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-4 text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.035em] md:mt-6 md:text-[2.6rem]">{s.title}</h3>
      <p className="mt-3 line-clamp-4 max-w-md text-sm leading-relaxed text-mute md:mt-4 md:line-clamp-none md:text-base">{s.text}</p>

      <ol className="mt-auto pt-6 md:pt-8">
        {s.program.map((p, i) => (
          <li key={p} className="flex gap-4 border-t hairline py-2.5 text-sm text-bone/90 md:py-3 md:text-base">
            <span className="font-mono text-xs text-dim">00{i + 1}.</span>
            {p}
          </li>
        ))}
      </ol>
      <p className="mt-4 inline-flex items-center gap-3 self-start rounded-full border hairline px-4 py-2 text-xs md:mt-6 md:text-sm">
        <span className="label text-accent">Livrable</span>
        {s.deliverable}
      </p>
    </article>
  );
}
