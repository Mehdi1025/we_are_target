import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase } from "@/content/cases";
import { pageMetadata } from "@/lib/seo";
import { CaseCover } from "@/components/cases/CaseCover";
import { Index } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Parallax } from "@/components/motion/Parallax";
import { clipUp, fadeUpBlur } from "@/lib/motion";
import { ArrowRight } from "@/components/ui/Icons";
import { ContactCta } from "@/components/home/Sections";
import { DmcCaseStudy } from "@/components/dmc/DmcCaseStudy";
import { dmc } from "@/content/case-studies/dripmycard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  const meta = pageMetadata({ title: item.client, description: item.summary, path: `/cases/${item.slug}` });
  if (item.image && meta.openGraph) {
    const og = { url: item.image.src, width: item.image.w, height: item.image.h, alt: item.image.alt };
    meta.openGraph.images = [og];
    if (meta.twitter) meta.twitter.images = [item.image.src];
  }
  if (item.layout === "dripmycard") meta.description = dmc.summary;
  return meta;
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const idx = cases.findIndex((c) => c.slug === item.slug);
  const next = cases[(idx + 1) % cases.length];

  if (item.layout === "dripmycard") return <DmcCaseStudy next={next} />;

  const facts = [
    { k: "Client", v: item.client },
    { k: "Secteur", v: item.sector },
    { k: "Année", v: item.year },
    { k: "Services", v: item.services.join(", ") },
  ];

  return (
    <>
      <section className="shell pb-12 pt-36 md:pt-48">
        <Link href="/cases" className="label inline-flex items-center gap-2 hover:text-bone">
          <ArrowRight className="h-3 w-3 rotate-180" /> Toutes les réalisations
        </Link>
        <SplitReveal as="h1" by="char" className="display-xl mt-10 max-w-[16ch]" text={item.client} />
        <Reveal variants={fadeUpBlur} delay={0.4}>
          <p className="mt-8 max-w-2xl text-xl text-mute">{item.summary}</p>
        </Reveal>
      </section>

      <section className="shell">
        <Reveal variants={clipUp} className="overflow-hidden rounded-2xl">
          <Parallax amount={10} className="aspect-[16/9] md:aspect-[21/9]">
            <CaseCover item={item} large inset className="h-full rounded-none" />
          </Parallax>
        </Reveal>
        <dl className="mt-6 grid grid-cols-2 gap-6 border-b hairline pb-8 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="label">{f.k}</dt>
              <dd className="mt-2 text-bone">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell grid gap-16 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="A">Le défi</Index>
        </div>
        <Reveal variants={fadeUpBlur} className="md:col-span-8">
          <p className="display-md leading-[1.15]!">{item.challenge}</p>
        </Reveal>

        <div className="md:col-span-4">
          <Index n="B">Notre approche</Index>
        </div>
        <Stagger as="ol" className="md:col-span-8">
          {item.approach.map((a, i) => (
            <StaggerItem as="li" key={a} className="flex gap-6 border-t hairline py-5 text-lg">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              {a}
            </StaggerItem>
          ))}
        </Stagger>

        <div className="md:col-span-4">
          <Index n="C">Livrables & résultats</Index>
        </div>
        <Stagger className="grid gap-6 md:col-span-8 md:grid-cols-2">
          <StaggerItem as="ul" className="space-y-3 rounded-2xl border hairline p-6">
            {item.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {d}
              </li>
            ))}
          </StaggerItem>
          <StaggerItem className="grid gap-6">
            {item.results.map((r) => (
              <div key={r.label} className="rounded-2xl bg-ink-2 p-6">
                <p className="font-display text-4xl font-bold tracking-[-0.04em]">{r.value}</p>
                <p className="label mt-2">{r.label}</p>
              </div>
            ))}
          </StaggerItem>
        </Stagger>
      </section>

      <section className="shell">
        <Link href={`/cases/${next.slug}`} data-cursor="view" data-cursor-label="Suivant" className="group block border-y hairline py-12">
          <p className="label">Projet suivant</p>
          <p className="display-lg mt-4 flex items-center justify-between gap-6 transition-colors group-hover:text-accent">
            {next.client}
            <ArrowRight className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:h-16 md:w-16" />
          </p>
        </Link>
      </section>

      <ContactCta />
    </>
  );
}
