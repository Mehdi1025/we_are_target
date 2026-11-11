"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { ReactLenis } from "lenis/react";
import { TransitionProvider } from "./TransitionProvider";
import { Preloader } from "./Preloader";
import { Cursor } from "./Cursor";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.085,
          wheelMultiplier: 0.95,
          anchors: { offset: -96 },
          stopInertiaOnNavigate: true,
          prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
        }}
      >
        <TransitionProvider>
          <ScrollProgress />
          {children}
          <Preloader />
          <Cursor />
        </TransitionProvider>
      </ReactLenis>
    </MotionConfig>
  );
}
