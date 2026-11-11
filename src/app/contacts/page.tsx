import { site, socials } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Index } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { fadeUpBlur } from "@/lib/motion";
import { Social } from "@/components/ui/Icons";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Nous contacter",
  description:
    "Parlez-nous de votre projet : branding, site web, réseaux sociaux, publicité ou outils. Réponse sous 24 h.",
  path: "/contacts",
});

export default function ContactPage() {
  const rows = [
    { k: "Téléphone", v: site.contact.phone, href: site.contact.phoneHref },
    { k: "Email", v: site.contact.email, href: `mailto:${site.contact.email}` },
    { k: "Localisation", v: site.contact.location },
  ];
  return (
    <section className="shell pb-24 pt-36 md:pt-48">
      <Index n="14">Nous contacter</Index>
      <SplitReveal as="h1" by="char" className="display-xl mt-8" text={"Parlons de votre\nprojet"} accent />

      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <Reveal as="aside" variants={fadeUpBlur} delay={0.3} className="lg:col-span-4">
          <p className="text-lg leading-relaxed text-mute">
            Décrivez votre besoin — nous vous répondons sous 24 h avec une première orientation.
          </p>
          <dl className="mt-10 border-t hairline">
            {rows.map((r) => (
              <div key={r.k} className="border-b hairline py-5">
                <dt className="label">{r.k}</dt>
                <dd className="mt-2 text-xl">
                  {r.href ? (
                    <a href={r.href} className="hover:text-accent">
                      {r.v}
                    </a>
                  ) : (
                    r.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-8 flex gap-3">
            {socials.map((s) => (
              <li key={s.icon}>
                <Magnetic strength={0.5}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border hairline text-mute transition-colors hover:border-accent hover:text-accent"
                >
                  <Social icon={s.icon} />
                </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.45} className="lg:col-span-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
