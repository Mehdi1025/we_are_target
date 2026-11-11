import "@fontsource-variable/onest";
import Image from "next/image";
import Link from "next/link";
import { dmc } from "@/content/case-studies/dripmycard";
import type { CaseStudy } from "@/content/cases";
import { clipUp, fadeUpBlur, scaleIn } from "@/lib/motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowRight } from "@/components/ui/Icons";
import { CaseCover } from "@/components/cases/CaseCover";
import { DmcHero } from "./DmcHero";
import { DripBand } from "./DripBand";
import { CardSymbol } from "./CardSymbol";
import { Chapter, CountUp, DmcTitle } from "./Bits";
import { ElementsGrid, Palette, TypeSpecimen } from "./Identity";
import { Gallery } from "./Gallery";
import { ShopShowcase, Unboxing } from "./Showcase";

const C = { volt: "#5B2EFF", peche: "#FF7A45", encre: "#14121F", papier: "#F7F5F2", lilas: "#E4DEFF" };

/** Une phrase, pas plus : le visuel parle */
function Line({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <Reveal variants={fadeUpBlur} className="mt-10 md:ml-[25%]">
      <p className={`max-w-2xl text-xl leading-relaxed md:text-2xl ${tone === "dark" ? "text-papier" : "text-encre"}`}>
        {children}
      </p>
    </Reveal>
  );
}

/**
 * Étude de cas DripMyCard — version vitrine : la page adopte l'identité du client
 * et montre le travail livré, de A à Z, sans détailler la méthode.
 */
export function DmcCaseStudy({ next }: { next: CaseStudy }) {
  const I = dmc.images;
  return (
    <div className="font-onest">
      <DmcHero />

      {/* ── Photo de la commande ───────────────────────────────── */}
      <section className="relative bg-papier pb-8 text-encre">
        <DripBand color={C.encre} bar={0} />
        <div className="shell pt-24 md:pt-32">
          <Reveal variants={clipUp} className="overflow-hidden rounded-[28px]">
            <Parallax amount={10} className="aspect-[3/2]">
              <Image src={I.flatlay.src} alt={I.flatlay.alt} fill sizes="(max-width:1440px) 95vw, 1360px" className="object-cover" priority />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ── De A à Z ───────────────────────────────────────────── */}
      <section id="az" className="scroll-mt-24 bg-papier pb-32 pt-24 text-encre">
        <div className="shell">
          <Chapter n="00" kicker="Ce que nous avons construit" title="de a à z" />
          <Stagger as="ol" stagger={0.1} className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dmc.pillars.map((p, i) => (
              <StaggerItem
                as="li"
                key={p.t}
                variants={scaleIn}
                className={`flex min-h-[280px] flex-col justify-between rounded-[28px] p-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:-rotate-1 ${
                  ["bg-volt text-papier", "bg-white", "bg-peche text-encre", "bg-encre text-papier"][i]
                }`}
              >
                <span className="text-6xl font-extrabold tracking-[-0.05em] opacity-90">0{i + 1}</span>
                <div>
                  <p className="text-2xl font-extrabold leading-tight">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed opacity-80">{p.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 01 · Identité ──────────────────────────────────────── */}
      <section className="relative bg-white pb-32 text-encre">
        <DripBand color={C.papier} bar={0} flip />
        <div className="shell pt-32">
          <Chapter n="01" kicker="Nom et identité visuelle" title="l'identité" />
          <Line>{dmc.identity.line}</Line>

          <div className="mt-20 grid gap-6 lg:grid-cols-12">
            <Reveal variants={clipUp} className="overflow-hidden rounded-[28px] bg-papier lg:col-span-8">
              <div className="grid aspect-[16/9] place-items-center p-8 md:p-16">
                <Image src={I.logoLight.src} alt={I.logoLight.alt} width={1400} height={316} sizes="(max-width:1024px) 85vw, 60vw" className="h-auto w-full mix-blend-multiply" />
              </div>
            </Reveal>
            <Reveal variants={scaleIn} delay={0.1} className="grid place-items-center rounded-[28px] bg-volt p-10 lg:col-span-4">
              <CardSymbol card={C.peche} chip={C.volt} className="w-[80%]" />
            </Reveal>
          </div>

          <Reveal variants={clipUp} className="mt-6 overflow-hidden rounded-[28px] bg-papier">
            <Image src={I.declinaisons.src} alt={I.declinaisons.alt} width={2000} height={1036} sizes="(max-width:1440px) 95vw, 1360px" className="h-auto w-full" />
          </Reveal>

          <div className="mt-6">
            <Palette />
          </div>
          <div className="mt-6">
            <TypeSpecimen />
          </div>
          <div className="mt-6 rounded-[36px] bg-papier p-5 md:p-10">
            <ElementsGrid />
          </div>
        </div>
      </section>

      {/* ── Respiration : motif de marque ──────────────────────── */}
      <section
        aria-hidden
        className="relative grid min-h-[70vh] animate-motif place-items-center overflow-hidden bg-volt"
        style={{ backgroundImage: `url(${dmc.motifs.volt})`, backgroundSize: "240px 240px" }}
      >
        <DripBand color="#FFFFFF" bar={0} />
        <DmcTitle as="p" segments={[{ text: "ta carte,\nton style." }]} className="px-5 text-center text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-papier drop-shadow-[0_10px_30px_rgba(20,18,31,0.35)]" />
      </section>

      {/* ── 02 · Boutique ──────────────────────────────────────── */}
      <section className="relative bg-volt pb-32 text-papier">
        <div className="shell pt-32">
          <Chapter n="02" kicker="Boutique e-commerce" title="la boutique" tone="dark" />
          <Line tone="dark">{dmc.shop.line}</Line>
          <div className="mt-20">
            <ShopShowcase />
          </div>
          <Stagger as="ul" stagger={0.08} className="mt-4 flex flex-wrap gap-3">
            {dmc.shop.highlights.map((h, i) => (
              <StaggerItem
                as="li"
                key={h}
                className={i === 0 ? "rounded-full bg-peche px-5 py-2.5 text-sm font-bold text-encre" : "rounded-full border border-papier/30 px-5 py-2.5 text-sm font-bold"}
              >
                {h}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <div className="bg-encre py-5">
        <Marquee items={dmc.shop.marquee} separator="✦" speed={2.2} itemClassName="font-dmc text-3xl text-papier md:text-5xl [&>span]:text-peche" />
      </div>

      {/* ── 03 · Packaging ─────────────────────────────────────── */}
      <section className="relative bg-encre pb-32 text-papier">
        <div className="shell pt-28">
          <Chapter n="03" kicker="Packaging" title="le packaging" tone="dark" />
          <Line tone="dark">{dmc.packaging.line}</Line>
          <div className="mt-20">
            <Unboxing />
          </div>
        </div>
      </section>

      {/* ── Le travail en images (défilement horizontal) ───────── */}
      <div className="relative bg-lilas">
        <DripBand color={C.encre} bar={0} flip />
      </div>
      <Gallery />

      {/* ── 04 · Production & résultat ─────────────────────────── */}
      <section className="relative bg-volt pb-32 text-papier">
        <DripBand color={C.lilas} bar={0} />
        <div className="shell pt-32">
          <Chapter n="04" kicker="Production et outils" title="de l'idée au colis" tone="dark" />
          <Line tone="dark">{dmc.production.line}</Line>

          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-papier/15 lg:grid-cols-4">
            {dmc.results.figures.map((f) => (
              <div key={f.label} className="flex flex-col-reverse bg-volt p-6 md:p-8">
                <dt className="mt-2 text-sm text-papier/75">{f.label}</dt>
                <dd>
                  <CountUp
                    value={f.value}
                    prefix={f.prefix}
                    suffix={f.suffix}
                    className="whitespace-nowrap text-[clamp(2.6rem,5.4vw,5rem)] font-extrabold leading-none tracking-[-0.04em]"
                  />
                </dd>
              </div>
            ))}
          </dl>
          <Reveal variants={fadeUpBlur} className="mt-10">
            <p className="text-2xl font-bold md:text-3xl">{dmc.results.lead}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Clôture ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-encre pb-24 text-papier">
        <DripBand color={C.peche} bar={40} scale={1.2} />
        <div className="shell flex flex-col items-center pt-48 text-center">
          <CardSymbol className="w-[min(60vw,260px)]" />
          <a
            href={dmc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 text-sm font-bold text-papier/70 underline decoration-peche decoration-2 underline-offset-8 transition-colors hover:text-papier"
          >
            {dmc.urlLabel} ↗
          </a>
          <p className="mt-6 text-xs text-papier/40">Une réalisation Target Agency</p>
        </div>

        <div className="shell mt-24">
          <Link
            href={`/cases/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Suivant"
            className="group grid items-center gap-6 border-t border-papier/15 pt-10 md:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-papier/50">Projet suivant</p>
              <p className="mt-4 flex items-center gap-6 font-display text-[clamp(2.2rem,5.5vw,5rem)] font-semibold leading-none tracking-[-0.04em] transition-colors group-hover:text-peche">
                {next.client}
                <ArrowRight className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:h-14 md:w-14" />
              </p>
            </div>
            <div className="hidden w-64 overflow-hidden rounded-2xl md:block">
              <CaseCover item={next} className="aspect-[4/3] transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
