"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { Plus } from "@/components/ui/Icons";

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Vidéo de présentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la vidéo"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border hairline text-bone hover:bg-bone hover:text-ink"
          >
            <Plus className="h-5 w-5 rotate-45" />
          </button>
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border hairline bg-ink-2"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${site.video.youtubeId}?autoplay=1&rel=0`}
              title="Target Agency — présentation"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
