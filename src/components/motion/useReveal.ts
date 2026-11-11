"use client";

import { useEffect, useState, type RefObject } from "react";
import { useInView, type UseInViewOptions } from "motion/react";
import { useTransitionState } from "./TransitionProvider";

/**
 * Déclencheur commun à tous les reveals : élément dans le viewport ET contenu visible
 * (préloader terminé, rideau levé). Verrouillé à true une fois joué.
 */
export function useReveal(ref: RefObject<Element | null>, margin = "0px 0px -12% 0px") {
  const { ready } = useTransitionState();
  const inView = useInView(ref, { once: true, margin: margin as UseInViewOptions["margin"] });
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (inView && ready) setPlayed(true);
  }, [inView, ready]);
  return played;
}
