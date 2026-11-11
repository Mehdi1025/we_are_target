import type { ReactNode } from "react";
import { Index } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { fadeUpBlur } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PageHero({
  n,
  label,
  title,
  accent = true,
  intro,
  className,
  children,
}: {
  n: string;
  label: string;
  /** « \n » = retour à la ligne */
  title: string;
  accent?: boolean;
  intro?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("shell pb-16 pt-36 md:pb-24 md:pt-48", className)}>
      <Reveal>
        <Index n={n}>{label}</Index>
      </Reveal>
      <SplitReveal as="h1" by="char" className="display-xl mt-8 max-w-[16ch]" text={title} accent={accent} />
      {intro && (
        <Reveal variants={fadeUpBlur} delay={0.45}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">{intro}</p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
