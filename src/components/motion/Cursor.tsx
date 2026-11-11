"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { spring } from "@/lib/motion";

type Mode = "default" | "hover" | "magnetic" | "label" | "text" | "hidden";

/**
 * Curseur custom :
 * - point en mix-blend-difference par défaut
 * - [data-magnetic] → le curseur englobe l'élément (forme et rayon calqués dessus)
 * - [data-cursor="view"] (+ data-cursor-label) → pastille accent avec libellé (« Voir », « Lire »…)
 * - liens / boutons → cercle agrandi
 * - champs de saisie → curseur natif
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("Voir");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const w = useMotionValue(12);
  const h = useMotionValue(12);
  const r = useMotionValue(999);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);
  const sw = useSpring(w, spring.cursor);
  const sh = useSpring(h, spring.cursor);
  const sr = useSpring(r, spring.cursor);

  const magnetEl = useRef<HTMLElement | null>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const raf = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const size = (m: Mode) => {
      const s = m === "hover" ? 56 : m === "label" ? 104 : m === "text" ? 4 : 12;
      w.set(s);
      h.set(s);
      r.set(999);
    };

    const tick = () => {
      const el = magnetEl.current;
      if (el && el.isConnected) {
        // Le curseur épouse l'élément magnétique (qui lui-même suit la souris)
        const b = el.getBoundingClientRect();
        const pad = 10;
        x.set(b.left + b.width / 2);
        y.set(b.top + b.height / 2);
        w.set(b.width + pad);
        h.set(b.height + pad);
        r.set(Math.min(b.height + pad, b.width + pad) / 2);
      } else {
        x.set(pointer.current.x);
        y.set(pointer.current.y);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      setMode((m) => (m === "hidden" ? "default" : m));
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelEl = t.closest<HTMLElement>("[data-cursor]");
      const magnetic = t.closest<HTMLElement>("[data-magnetic]");
      const field = t.closest("input, textarea, select, [contenteditable]");
      const interactive = t.closest("a, button, summary, label, [role='button'], [role='tab']");

      magnetEl.current = null;
      if (field) {
        setMode("text");
        size("text");
      } else if (labelEl) {
        setLabel(labelEl.dataset.cursorLabel ?? "Voir");
        setMode("label");
        size("label");
      } else if (magnetic) {
        magnetEl.current = magnetic;
        setMode("magnetic");
      } else if (interactive) {
        setMode("hover");
        size("hover");
      } else {
        setMode("default");
        size("default");
      }
    };

    const onLeaveWindow = () => setMode("hidden");
    const onDown = () => w.set(w.get() * 0.85);
    const onUp = () => w.set(w.get() / 0.85);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y, w, h, r]);

  if (!enabled) return null;

  const isLabel = mode === "label";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120]"
      style={{ x: sx, y: sy, mixBlendMode: isLabel ? "normal" : "difference" }}
      animate={{ opacity: mode === "hidden" ? 0 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center"
        style={{ width: sw, height: sh, borderRadius: sr }}
        animate={{ backgroundColor: isLabel ? "#ff3a24" : "#f4f3ef" }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {isLabel && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="absolute font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
