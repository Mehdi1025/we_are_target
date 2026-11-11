import { manifesto, site } from "@/content/site";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Index } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Parallax } from "@/components/motion/Parallax";
import { fadeUpBlur, scaleIn } from "@/lib/motion";
import { ContactCta } from "@/components/home/Sections";

export const metadata = pageMetadata({
  title: "À propos",
  description:
    "Target Agency, agence de marketing digital et de communication 100 % à distance : notre vision, notre méthode, notre équipe.",
  path: "/about-us",
});

const figures = [
  { v: "10+", l: "Clients accompagnés" },
  { v: "6", l: "Expertises intégrées" },
  { v: "24 h", l: "Délai de première réponse" },
  { v: "100 %", l: "À distance, partout en France" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        n="02"
        label="À propos"
        title="Nous sommes Target"
        intro="Une agence de communication et de marketing à service complet. Nous imaginons des marques et des expériences digitales pour les entreprises qui veulent se démarquer — et nous structurons les outils qui les font tourner."
      />

      <section className="shell">
        <Stagger as="dl" className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-line md:grid-cols-4">
          {figures.map((f) => (
            <StaggerItem key={f.l} className="flex flex-col-reverse bg-ink p-6 md:p-8">
              <dt className="label mt-3">{f.l}</dt>
              <dd className="font-display text-5xl font-bold tracking-[-0.05em] md:text-6xl">{f.v}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell grid gap-12 py-28 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="A">Notre vision</Index>
        </div>
        <div className="space-y-8 md:col-span-8">
          <SplitReveal
            as="p"
            className="display-md leading-[1.15]!"
            stagger={0.03}
            text="Chaque entreprise a une histoire, une ambition, une vision. Notre rôle est d’en faire une marque qui inspire confiance et impose sa présence."
          />
          <Reveal variants={fadeUpBlur}><p className="max-w-2xl text-lg leading-relaxed text-mute">
            Nous ne créons rien au hasard. Avant le premier visuel, nous analysons votre marché, votre
            audience et vos objectifs. Ensuite seulement, nous construisons — identité, site, contenus,
            campagnes, outils — avec un seul fil conducteur : des résultats concrets, pas des promesses.
          </p></Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-mute">
            Target Agency est un pôle de {site.legalName}. Nous travaillons 100 % à distance, avec des
            clients partout en France : moins de déplacements, plus de temps consacré à vos projets.
          </p>
        </div>
      </section>

      <section className="shell grid gap-12 border-t hairline py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="B">Ce qui nous guide</Index>
        </div>
        <Stagger as="ul" className="md:col-span-8">
          {manifesto.map((m, i) => (
            <StaggerItem as="li" key={m} className="group flex items-baseline gap-6 border-b hairline py-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <span className="text-2xl font-semibold tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:text-4xl">{m}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="C">Un seul partenaire</Index>
          <p className="mt-6 max-w-sm text-mute">
            Pas de solution imposée : nous choisissons la bonne technologie pour chaque projet, parmi les
            meilleurs outils du marché.
          </p>
        </div>
        <Stagger stagger={0.07} className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {services.map((s) => (
            <StaggerItem key={s.id} variants={scaleIn} className="rounded-2xl border hairline p-6 transition-colors duration-500 hover:border-accent">
              <p className="label">{s.id}.</p>
              <p className="mt-6 text-xl font-semibold">{s.title}</p>
              <p className="mt-2 text-sm text-mute">{s.deliverable}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell grid gap-12 border-t hairline py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="D">Méthode</Index>
        </div>
        <Stagger as="ol" className="grid gap-6 sm:grid-cols-2 md:col-span-8">
          {processSteps.map((s) => (
            <StaggerItem as="li" key={s.step} className="rounded-2xl bg-ink-2 p-6">
              <p className="font-display text-5xl font-bold tracking-[-0.05em] text-accent">{s.step}</p>
              <p className="mt-6 text-xl font-semibold">{s.title}</p>
              <p className="mt-2 text-sm text-mute">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-4">
          <Index n="E">L’équipe</Index>
        </div>
        <div className="flex flex-col gap-8 md:col-span-8 md:flex-row md:items-center">
          {/* [À COMPLÉTER] — remplacer par une photo : /public/team/adam.jpg */}
          <Parallax amount={10} className="aspect-square w-40 shrink-0 rounded-2xl bg-accent">
            <div className="grid h-full w-full place-items-center font-display text-5xl font-bold text-ink">AF</div>
          </Parallax>
          <div>
            <p className="text-3xl font-semibold">{site.founder.name}</p>
            <p className="label mt-2">{site.founder.role}</p>
            <p className="mt-6 max-w-xl text-mute">
              Entrepreneur et formateur, Adam pilote la stratégie et la direction créative de chaque projet.
              Il s’entoure d’un réseau de designers, vidéastes et développeurs sélectionnés pour leur exigence.
            </p>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
