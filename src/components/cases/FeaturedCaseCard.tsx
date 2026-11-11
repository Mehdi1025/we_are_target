import Link from "next/link";
import type { CaseStudy } from "@/content/cases";
import { dmc } from "@/content/case-studies/dripmycard";
import { clipUp } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ArrowUpRight } from "@/components/ui/Icons";
import { CaseCover } from "./CaseCover";

/** Grande carte « à la une » en tête des réalisations */
export function FeaturedCaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link href={`/cases/${item.slug}`} className="group block" data-cursor="view" data-cursor-label="Voir">
      <Reveal variants={clipUp} className="overflow-hidden rounded-3xl">
        <Parallax amount={8} className="aspect-[4/3] md:aspect-[21/10]">
          <div className="h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
            <CaseCover item={item} large className="h-full rounded-none" />
          </div>
        </Parallax>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label">
            <span className="text-accent">01 — À la une</span> · {item.year} · {item.sector}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-none md:text-6xl">
            {item.client}
            <span className="text-mute"> — {dmc.title}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-mute">{item.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:col-span-4 md:justify-end">
          {item.tags?.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full border hairline px-3 py-1.5 text-xs text-bone/80">
              {t}
            </span>
          ))}
          <span className="ml-2 grid h-12 w-12 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
