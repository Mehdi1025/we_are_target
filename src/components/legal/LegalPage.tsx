import Link from "next/link";
import { legalNav } from "@/content/site";
import { Index } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUpBlur } from "@/lib/motion";

export type LegalSection = { h: string; p: string[] };

export function LegalPage({
  n,
  title,
  updated,
  path,
  sections,
}: {
  n: string;
  title: string;
  updated: string;
  path: string;
  sections: LegalSection[];
}) {
  return (
    <section className="shell pb-24 pt-36 md:pt-48">
      <Index n={n}>Légal</Index>
      <SplitReveal as="h1" className="display-lg mt-8 max-w-[18ch]" text={title} />
      <p className="label mt-6">Dernière mise à jour : {updated}</p>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <nav aria-label="Pages légales" className="lg:col-span-3">
          <ul className="space-y-2 lg:sticky lg:top-28">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn("text-sm transition-colors", l.href === path ? "text-accent" : "text-mute hover:text-bone")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Reveal variants={fadeUpBlur} delay={0.3} className="prose-target max-w-[70ch] lg:col-span-9">
          {sections.map((s, i) => (
            <div key={s.h}>
              <h2 className={i === 0 ? "mt-0!" : ""}>
                <span className="mr-3 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              {s.p.map((t, j) => (
                <p key={j}>{t}</p>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
