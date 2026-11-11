"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { curtainLayer } from "@/lib/motion";
import { legalNav, mainNav } from "@/content/site";

type Phase = "intro" | "idle" | "covering" | "revealing";

type Ctx = {
  phase: Phase;
  /** true quand le contenu est visible (ni préloader, ni rideau) → les reveals peuvent jouer */
  ready: boolean;
  endIntro: () => void;
};

const TransitionContext = createContext<Ctx>({ phase: "intro", ready: false, endIntro: () => {} });
export const useTransitionState = () => useContext(TransitionContext);

const INTRO_KEY = "ta-intro-seen";

function labelFor(path: string) {
  const all = [...mainNav, ...legalNav];
  const exact = all.find((l) => l.href === path);
  if (exact) return exact.label;
  const parent = all.filter((l) => l.href !== "/").find((l) => path.startsWith(l.href));
  return parent?.label ?? "Target";
}

function isInternalNav(a: HTMLAnchorElement, e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  if (a.target && a.target !== "_self") return null;
  if (a.hasAttribute("download") || a.dataset.noTransition !== undefined) return null;
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null; // même page : on laisse Next gérer (query, hash)
  return url;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("intro");
  const [target, setTarget] = useState<{ path: string; href: string } | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Visite déjà faite dans la session → pas de préloader (aligné sur le script bloquant du layout)
  useEffect(() => {
    let seen = false;
    try {
      seen =
        document.documentElement.dataset.intro === "seen" ||
        sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPhase("idle");
  }, []);

  const endIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setPhase("idle");
  }, []);

  // Interception globale des liens internes (Link de Next inclus : il respecte defaultPrevented)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || phase === "covering") return;
      const url = isInternalNav(a, e);
      if (!url) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      setTarget({ path: url.pathname, href: url.pathname + url.search + url.hash });
      setPhase("covering");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [phase]);

  // Le rideau couvre → on navigue
  const onCovered = useCallback(() => {
    if (!target) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    router.push(target.href);
    fallback.current = setTimeout(() => setPhase("revealing"), 4000);
  }, [lenis, router, target]);

  // La nouvelle route est montée → on lève le rideau
  useEffect(() => {
    if (phase === "covering" && target && pathname === target.path) {
      clearTimeout(fallback.current);
      lenis?.resize();
      setPhase("revealing");
    }
  }, [pathname, phase, target, lenis]);

  useEffect(() => {
    if (phase === "covering") lenis?.stop();
    else lenis?.start();
  }, [phase, lenis]);

  const ready = phase === "idle" || phase === "revealing";

  return (
    <TransitionContext.Provider value={{ phase, ready, endIntro }}>
      {children}
      <AnimatePresence
        onExitComplete={() => {
          setTarget(null);
          setPhase((p) => (p === "revealing" ? "idle" : p));
        }}
      >
        {phase === "covering" && target && (
          <div key="curtain" className="pointer-events-auto fixed inset-0 z-[90]" aria-hidden>
            <motion.div
              variants={curtainLayer(0)}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute inset-0 bg-accent"
            />
            <motion.div
              variants={curtainLayer(1)}
              initial="initial"
              animate="enter"
              exit="exit"
              onAnimationComplete={(def) => def === "enter" && onCovered()}
              className="absolute inset-0 flex items-end justify-between bg-ink p-5 md:p-10"
            >
              <span className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0, transition: { delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ y: "-110%", transition: { duration: 0.4 } }}
                  className="block font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em] text-bone"
                >
                  {labelFor(target.path)}
                  <span className="text-accent">.</span>
                </motion.span>
              </span>
              <span className="label hidden md:block">(qtf® — transition)</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
