"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { mainNav, site, socials } from "@/content/site";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Social } from "@/components/ui/Icons";
import { RollText } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { useTransitionState } from "@/components/motion/TransitionProvider";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { ready } = useTransitionState();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Masqué en descendant, réapparaît en remontant
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: ready && (!hidden || open) ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: ease.expo }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open ? "border-b hairline bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Magnetic strength={0.2} className="relative z-10">
            <Link href="/" aria-label={`${site.name} — accueil`}>
              <Logo />
            </Link>
          </Magnetic>

          {/* Menu en encoche : un onglet de la couleur du fond, découpé dans la carte du hero */}
          <nav aria-label="Navigation principale" className="absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block">
            {pathname === "/" && (
              <>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-5 top-3 h-5 w-5 bg-[radial-gradient(circle_at_0_100%,transparent_19.5px,#171717_20px)] transition-opacity duration-500",
                    scrolled ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute -right-5 top-3 h-5 w-5 bg-[radial-gradient(circle_at_100%_100%,transparent_19.5px,#171717_20px)] transition-opacity duration-500",
                    scrolled ? "opacity-0" : "opacity-100",
                  )}
                />
              </>
            )}
            <ul className="flex items-center gap-1 rounded-b-[1.6rem] bg-ink px-4 pb-2.5 pt-3 md:gap-3 md:px-6 md:pb-3 md:pt-4">
              {mainNav.slice(1, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-colors",
                      isActive(item.href) ? "text-bone" : "text-mute hover:text-bone",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500",
                        isActive(item.href) ? "scale-100" : "scale-0 group-hover:scale-100",
                      )}
                    />
                    <RollText>{item.label}</RollText>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden sm:block">
            <Magnetic>
              <Link
                href="/contacts"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-500 hover:bg-bone"
              >
                <RollText>Nous contacter</RollText>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            </div>
            <div className="lg:hidden">
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                className="grid h-11 w-11 place-items-center rounded-full border hairline bg-ink/40"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 h-px w-4 bg-bone transition-all duration-500 ease-out-expo",
                      open ? "top-1.5 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-px w-4 bg-bone transition-all duration-500 ease-out-expo",
                      open ? "top-1.5 -rotate-45" : "top-3",
                    )}
                  />
                </span>
              </button>
            </Magnetic>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 42px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 42px) 40px)" }}
            transition={{ duration: 0.9, ease: ease.quart }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-24 lg:hidden"
          >
            <nav aria-label="Menu mobile" className="shell flex-1">
              <ul>
                {mainNav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b hairline">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: ease.expo }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4 font-display text-4xl font-semibold tracking-[-0.04em]"
                      >
                        <span className={isActive(item.href) ? "text-accent" : ""}>{item.label}</span>
                        <span className="label">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6 } }}
              exit={{ opacity: 0 }}
              className="shell flex flex-col gap-4 pb-10 pt-6"
            >
              <a href={site.contact.phoneHref} className="text-lg">
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="text-lg text-mute">
                {site.contact.email}
              </a>
              <ul className="flex gap-3 pt-2">
                {socials.map((s) => (
                  <li key={s.icon}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full border hairline text-mute hover:text-bone"
                    >
                      <Social icon={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
