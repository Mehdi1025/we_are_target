import Link from "next/link";
import { cases, otherCases } from "@/content/cases";
import { faq } from "@/content/faq";
import { plans, pricingNotes } from "@/content/pricing";
import { processSteps, strengths } from "@/content/process";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeUp, fadeUpBlur, scaleIn } from "@/lib/motion";
import { CaseCard } from "@/components/cases/CaseCard";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Index, Rule, SectionHead } from "@/components/ui/Section";
import { Plus } from "@/components/ui/Icons";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Magnetic } from "@/components/motion/Magnetic";

/* ── 04 · Réalisations ─────────────────────────────────────────── */
export function CasesPreview() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead
        n="04.1"
        label="Autres réalisations"
        title="L’empreinte Target"
        intro="Une sélection de collaborations qui reflètent notre exigence et notre manière de concevoir des marques qui se démarquent."
        aside={<ButtonLink href="/cases" variant="ghost">Voir tous les cas</ButtonLink>}
      />
      <Stagger stagger={0.15} className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {otherCases.slice(0, 4).map((c, i) => (
          <StaggerItem key={c.slug} className={i % 2 === 1 ? "md:mt-28" : ""}>
            <CaseCard item={c} index={i + 1} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ── 05 · Bandeau clients ──────────────────────────────────────── */
export function ClientsBand() {
  return (
    <section aria-label="Ils nous font confiance" className="py-14">
      <Rule />
      <div className="shell my-8 flex items-end justify-between gap-6">
        <Index n="05">Ils nous font confiance</Index>
        <p className="text-right text-sm text-mute">
          <span className="font-display text-2xl font-bold text-bone">10+</span> clients — soyez le prochain.
        </p>
      </div>
      <Marquee
        items={cases.map((c) => c.client)}
        separator="✦"
        speed={1.6}
        itemClassName="font-display text-4xl font-semibold tracking-[-0.04em] text-bone/40 transition-colors hover:text-bone md:text-6xl"
      />
      <Marquee
        items={["Branding", "Sites web", "Réseaux sociaux", "Publicité", "Contenus", "CRM & automatisation"]}
        separator="/"
        speed={1.2}
        reverse
        className="mt-4"
        itemClassName="font-mono text-sm uppercase tracking-[0.1em] text-dim"
      />
      <Rule className="mt-14" />
    </section>
  );
}

/* ── 06 · Forces + process ─────────────────────────────────────── */
export function Approach() {
  return (
    <section className="shell py-24 md:py-32">
      <SectionHead
        n="06"
        label="Nos forces"
        title={"Pas de bla-bla.\nDes solutions, un résultat"}
        muted={[1]}
        intro="Nous concevons des stratégies sur mesure qui transforment votre visibilité en croissance mesurable — de la stratégie à la mise en œuvre."
      />

      <Stagger
        as="ul"
        stagger={0.08}
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border hairline bg-line sm:grid-cols-2 lg:grid-cols-5"
      >
        {strengths.map((s, i) => (
          <StaggerItem
            as="li"
            key={s.title}
            variants={fadeUp}
            className="group relative flex flex-col overflow-hidden bg-ink p-6 md:p-7"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
            />
            <span className="label relative transition-colors duration-500 group-hover:text-ink">© — 00{i + 1}.</span>
            <h3 className="relative mt-10 text-xl font-semibold leading-tight transition-colors duration-500 group-hover:text-ink">
              {s.title}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-mute transition-colors duration-500 group-hover:text-ink/80">
              {s.text}
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-28 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <Index n="07">Notre processus</Index>
          <SplitReveal as="h3" className="display-md mt-6" text={"Du concept\nau résultat"} accent />
          <Reveal variants={fadeUpBlur} delay={0.3}>
            <p className="mt-6 max-w-sm text-mute">
              De la stratégie de marque à la conversion, chaque étape est pensée pour faire grandir votre
              entreprise.
            </p>
          </Reveal>
        </div>
        <Stagger as="ol" stagger={0.12} className="md:col-span-8">
          {processSteps.map((s) => (
            <StaggerItem
              as="li"
              key={s.step}
              className="group grid grid-cols-[4.5rem_1fr] gap-6 border-t hairline py-8 md:grid-cols-[7rem_1fr_1fr]"
            >
              <span className="font-display text-4xl font-bold tracking-[-0.05em] text-dim transition-colors duration-500 group-hover:text-accent md:text-6xl">
                {s.step}
              </span>
              <h4 className="self-center text-2xl font-semibold transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:text-3xl">
                {s.title}
              </h4>
              <p className="col-start-2 text-mute md:col-start-3 md:self-center">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── 08 · Pricing ──────────────────────────────────────────────── */
export function Pricing() {
  return (
    <section id="offres" className="shell scroll-mt-24 py-24 md:py-32">
      <SectionHead
        n="08"
        label="Croissance réseaux sociaux"
        title={"Arrêtez de perdre des clients\nsur les réseaux"}
        intro="Publier ne suffit plus. Nos abonnements social media transforment vos réseaux en canal d’acquisition — sans engagement de votre temps."
      />

      <Stagger stagger={0.12} className="mt-16 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <StaggerItem key={p.id} variants={scaleIn}>
            <article
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7 transition-[transform,border-color] duration-700 ease-out-expo hover:-translate-y-2 md:p-8",
                p.featured ? "border-accent bg-accent/[0.06]" : "hairline bg-ink-2 hover:border-bone/30",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 right-7 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink">
                  Le plus choisi
                </span>
              )}
              <p className="label">© — {p.id}.</p>
              <h3 className="mt-6 text-3xl font-semibold">{p.name}</h3>
              <p className="mt-3 min-h-[3rem] text-sm text-mute">{p.pitch}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-6xl font-bold tracking-[-0.05em]">{p.priceHT} €</span>
                <span className="text-sm text-mute">HT / mois</span>
              </p>
              <p className="label mt-2">soit {p.priceTTC} € TTC — livré chaque mois</p>
              <ul className="mt-8 flex-1 space-y-3 border-t hairline pt-6">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex gap-3 text-sm text-bone/90">
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent" />
                    {inc}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contacts?offre=${p.name.toLowerCase()}`}
                variant={p.featured ? "primary" : "ghost"}
                className="mt-10 self-start"
              >
                Je veux cette offre
              </ButtonLink>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal variants={fadeUpBlur} delay={0.2}>
        <div className="mt-8 grid gap-4 rounded-2xl border hairline p-6 text-sm text-mute md:grid-cols-3 md:p-8">
          <p>
            <span className="text-bone">Kit d’identité offert</span> sur chaque abonnement (valeur{" "}
            {pricingNotes.identityKitValue}).
          </p>
          <p>{pricingNotes.shootingOption}</p>
          <p>
            {pricingNotes.outOfScope}{" "}
            <Link href="/contacts" className="text-bone underline decoration-accent underline-offset-4">
              Demander un devis
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ── 09 · FAQ ──────────────────────────────────────────────────── */
export function Faq() {
  return (
    <section className="shell py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Index n="09">Questions fréquentes</Index>
          <SplitReveal as="h2" className="display-lg mt-6" text={"Les questions\nqui comptent"} accent />
          <Reveal variants={fadeUpBlur} delay={0.3}>
            <p className="mt-6 max-w-sm text-mute">
              Des réponses claires sur la façon dont nous concevons, développons et déployons votre stratégie.
            </p>
          </Reveal>
          <ButtonLink href="/contacts" variant="ghost" className="mt-8">
            Nous contacter
          </ButtonLink>
        </div>
        <Stagger stagger={0.07} className="md:col-span-7">
          {faq.map((f, i) => (
            <StaggerItem key={f.q}>
              <details className="group border-t hairline" name="faq">
                <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="label w-10 shrink-0">00{i + 1}.</span>
                  <span className="flex-1 text-lg font-medium transition-colors group-hover:text-accent md:text-xl">
                    {f.q}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border hairline transition-transform duration-500 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-ink">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="faq-answer pb-7 pl-15 pr-12 leading-relaxed text-mute">{f.a}</p>
              </details>
            </StaggerItem>
          ))}
          <Rule />
        </Stagger>
      </div>
    </section>
  );
}

/* ── 10 · CTA contact ──────────────────────────────────────────── */
export function ContactCta() {
  return (
    <section className="shell py-12">
      <Reveal variants={scaleIn}>
        <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-16 text-ink md:px-14 md:py-24">
          <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 animate-[spin_40s_linear_infinite] rounded-full border-[40px] border-dashed border-ink/10" />
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em]">(qtf® — 10) Nous contacter</p>
          <SplitReveal
            as="h2"
            by="char"
            className="display-xl mt-6 max-w-[12ch]"
            text={"Parlons de\nvotre projet"}
            accent
            accentClassName="text-bone"
          />
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg">
              Branding, site web, réseaux sociaux, publicité ou outils : décrivez votre besoin, nous répondons
              sous 24 h avec une première orientation.
            </p>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <ButtonLink href="/contacts" variant="light">
                Démarrer un projet
              </ButtonLink>
              <p className="font-mono text-xs uppercase tracking-[0.08em]">
                <Magnetic strength={0.2}>
                  <a href={site.contact.phoneHref} className="hover:underline">
                    {site.contact.phone}
                  </a>
                </Magnetic>
                {"  ·  "}
                <a href={`mailto:${site.contact.email}`} className="hover:underline">
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
