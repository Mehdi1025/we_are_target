import { jobs } from "@/content/jobs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Index } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Carrière",
  description: "Rejoindre Target Agency : postes ouverts, alternance et candidatures spontanées. 100 % à distance.",
  path: "/career",
});

const perks = [
  { t: "100 % à distance", d: "Travaillez d’où vous voulez en France, avec des rituels clairs." },
  { t: "Projets réels", d: "Des clients concrets dès la première semaine, pas des tâches de remplissage." },
  { t: "Outils modernes", d: "CRM maison, automatisations, IA : vous apprenez les méthodes de demain." },
  { t: "Exigence & bienveillance", d: "Des retours directs, une progression rapide." },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        n="12"
        label="Carrière"
        title="Rejoindre la cible"
        intro="Nous cherchons des profils exigeants, curieux et autonomes, qui préfèrent les résultats aux réunions."
      />

      <section className="shell">
        <Stagger as="ul" className="grid gap-px overflow-hidden rounded-2xl border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <StaggerItem as="li" key={p.t} className="bg-ink p-6 md:p-7">
              <p className="label">00{i + 1}.</p>
              <p className="mt-8 text-xl font-semibold">{p.t}</p>
              <p className="mt-2 text-sm text-mute">{p.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell py-28">
        <Index n="A">Postes ouverts — {jobs.length}</Index>
        <Stagger className="mt-10 border-b hairline">
          {jobs.map((j) => (
            <StaggerItem key={j.slug}><details className="group border-t hairline">
              <summary className="flex cursor-pointer list-none flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between [&::-webkit-details-marker]:hidden">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-4xl">{j.title}</h2>
                  <p className="label mt-3 flex flex-wrap gap-4">
                    <span className="text-accent">{j.contract}</span>
                    <span>{j.location}</span>
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border hairline transition-transform duration-500 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-ink">
                  <Plus />
                </span>
              </summary>
              <div className="grid gap-10 pb-10 md:grid-cols-3">
                <p className="text-lg text-mute">{j.summary}</p>
                <div>
                  <p className="label mb-4">Missions</p>
                  <ul className="space-y-3">
                    {j.missions.map((m) => (
                      <li key={m} className="flex gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-4">Profil</p>
                  <ul className="space-y-3">
                    {j.profile.map((m) => (
                      <li key={m} className="flex gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={`/contacts?sujet=candidature&poste=${j.slug}`} className="mt-8">
                    Postuler
                  </ButtonLink>
                </div>
              </div>
            </details></StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 flex flex-col gap-6 rounded-2xl border hairline p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold">Candidature spontanée</p>
            <p className="mt-2 text-mute">
              Designer, vidéaste, développeur ? Envoyez votre portfolio à{" "}
              <a href={`mailto:${site.contact.email}`} className="text-bone underline decoration-accent underline-offset-4">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
          <ButtonLink href="/contacts?sujet=candidature" variant="ghost">
            Nous écrire
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
