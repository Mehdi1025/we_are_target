"use client";

import { useRef, type ElementType } from "react";
import { motion } from "motion/react";
import { maskUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReveal } from "./useReveal";

type Props = {
  /** Texte ; « \n » = retour à la ligne */
  text: string;
  as?: ElementType;
  className?: string;
  /** Découpage : mot (défaut) ou lettre */
  by?: "word" | "char";
  /** Ajoute un point final en couleur d'accent */
  accent?: boolean;
  accentClassName?: string;
  /** Index des lignes à afficher en gris */
  muted?: number[];
  /** Classes par ligne (ex. indentation) */
  lineClassName?: (i: number) => string | undefined;
  stagger?: number;
  delay?: number;
};

/**
 * Titre révélé par masque : chaque mot (ou lettre) remonte depuis sous sa ligne,
 * en cascade, quand le titre entre dans le viewport.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  by = "word",
  accent = false,
  accentClassName = "text-accent",
  muted = [],
  lineClassName,
  stagger,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const show = useReveal(ref);
  const lines = text.split("\n");
  const step = stagger ?? (by === "char" ? 0.028 : 0.07);
  const plain = text.replace(/\n/g, " ") + (accent ? "." : "");

  return (
    <Tag ref={ref} className={className} aria-label={plain}>
      <motion.span
        aria-hidden
        className="block"
        variants={staggerContainer(step, delay)}
        initial="hidden"
        animate={show ? "show" : "hidden"}
      >
        {lines.map((line, li) => {
          const words = line.split(" ");
          const isLast = li === lines.length - 1;
          return (
            <span key={li} className={cn("block", muted.includes(li) && "text-mute", lineClassName?.(li))}>
              {words.map((word, wi) => {
                const tail = isLast && wi === words.length - 1 && accent;
                return (
                  <span key={wi} className="inline-block whitespace-nowrap">
                    {by === "char" ? (
                      word.split("").map((c, ci) => (
                        <span key={ci} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                          <motion.span variants={maskUp} className="inline-block origin-bottom-left will-change-transform">
                            {c}
                          </motion.span>
                        </span>
                      ))
                    ) : (
                      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                        <motion.span variants={maskUp} className="inline-block origin-bottom-left will-change-transform">
                          {word}
                        </motion.span>
                      </span>
                    )}
                    {tail && (
                      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                        <motion.span variants={maskUp} className={cn("inline-block", accentClassName)}>
                          .
                        </motion.span>
                      </span>
                    )}
                    {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                  </span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
