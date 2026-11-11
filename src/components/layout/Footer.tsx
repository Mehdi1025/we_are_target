import Link from "next/link";
import { legalNav, mainNav, manifesto, site, socials } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Index } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 overflow-hidden border-t hairline">
      <Marquee
        items={manifesto}
        speed={1.4}
        className="border-b hairline py-5"
        itemClassName="font-display text-2xl font-semibold tracking-[-0.03em] text-mute md:text-3xl"
      />

      <div className="shell pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Index n="FINAL">Dernier mot</Index>
            <SplitReveal
              as="p"
              by="char"
              className="display-xl mt-6 font-display leading-[0.92] tracking-[-0.045em]"
              text={"Construit\npour durer"}
              accent
            />
            <p className="mt-6 max-w-md text-mute">
              Branding, sites, réseaux, publicité, outils — pensés pour durer, pas pour la démo.
            </p>
            <ButtonLink href="/contacts" className="mt-8">
              Démarrer un projet
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-5 md:grid-cols-3">
            <div>
              <p className="label mb-5">Plan du site</p>
              <ul className="space-y-2.5">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-block text-sm text-bone/80 transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-5">Réseaux</p>
              <ul className="space-y-2.5">
                {socials.map((s, i) => (
                  <li key={s.icon}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-bone/80 transition-colors hover:text-accent"
                    >
                      <span className="mr-2 font-mono text-[0.65rem] text-dim">00{i + 1}.</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="label mb-5">Contact</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={site.contact.phoneHref} className="text-bone/80 hover:text-accent">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="text-bone/80 hover:text-accent">
                    {site.contact.email}
                  </a>
                </li>
                <li className="text-mute">{site.contact.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <FooterWordmark />

        <div className="flex flex-col gap-4 border-t hairline py-6 text-xs text-dim md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <LogoMark className="h-4 w-4 text-dim" />© {year} {site.name} — {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
