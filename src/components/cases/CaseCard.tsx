import Link from "next/link";
import type { CaseStudy } from "@/content/cases";
import { CaseCover } from "./CaseCover";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { clipUp } from "@/lib/motion";

export function CaseCard({ item, index }: { item: CaseStudy; index: number }) {
  return (
    <Link href={`/cases/${item.slug}`} className="group block" data-cursor="view" data-cursor-label="Voir">
      <Reveal variants={clipUp} className="overflow-hidden rounded-2xl">
        {/* Parallax (cadre) > zoom au survol (contenu) : deux couches pour ne pas mélanger les transforms */}
        <Parallax amount={8} className="aspect-[4/3]">
          <div className="h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]">
            <CaseCover item={item} inset className="h-full rounded-none" />
          </div>
        </Parallax>
      </Reveal>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="label">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> — {item.services.join(" · ")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold md:text-3xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
              {item.client}
            </span>
          </h3>
          <p className="mt-2 max-w-md text-sm text-mute">{item.summary}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border hairline transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
