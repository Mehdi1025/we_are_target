import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "./Reveal";
import { fadeUpBlur, lineGrow } from "@/lib/motion";

export function Index({ n, children }: { n: string; children?: ReactNode }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 leading-snug">
      <span className="whitespace-nowrap text-accent">(qtf® — {n})</span>
      {children && <span>{children}</span>}
    </p>
  );
}

/** Filet horizontal qui se trace à l'entrée dans le viewport */
export function Rule({ className }: { className?: string }) {
  return <Reveal variants={lineGrow} className={cn("h-px origin-left bg-line", className)}>{null}</Reveal>;
}

export function SectionHead({
  n,
  label,
  title,
  muted,
  accent = true,
  intro,
  aside,
  className,
}: {
  n: string;
  label: string;
  /** « \n » = retour à la ligne */
  title: string;
  muted?: number[];
  accent?: boolean;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Rule />
      <div className="grid gap-8 pt-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <Index n={n}>{label}</Index>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <SplitReveal as="h2" className="display-lg" text={title} accent={accent} muted={muted} />
          {(intro || aside) && (
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {intro && (
                <Reveal variants={fadeUpBlur} delay={0.25}>
                  <p className="max-w-xl text-lg leading-relaxed text-mute">{intro}</p>
                </Reveal>
              )}
              {aside && <Reveal delay={0.35}>{aside}</Reveal>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
