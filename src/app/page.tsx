import { AgencyHero } from "@/components/ui/agency-hero";
import { FeaturedCase } from "@/components/home/FeaturedCase";
import { Vision } from "@/components/home/Vision";
import { Services } from "@/components/home/Services";
import { Approach, CasesPreview, ClientsBand, ContactCta, Faq, Pricing } from "@/components/home/Sections";
import { Marquee } from "@/components/ui/Marquee";
import { faq } from "@/content/faq";
import { site, socials } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#agency`,
      name: site.name,
      description: site.description,
      url: site.url,
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: { "@type": "Country", name: "France" },
      founder: { "@type": "Person", name: site.founder.name },
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AgencyHero />
      <Vision />
      <Services />
      <div className="overflow-hidden py-16" aria-hidden>
        <div className="-mx-[6%] -rotate-2">
        <Marquee
          items={["Nous sommes Target", "Votre image", "Notre cible"]}
          speed={3}
          className="bg-accent py-4 text-ink"
          separator="●"
          itemClassName="font-display text-5xl font-bold uppercase tracking-[-0.04em] md:text-7xl [&>span]:text-ink"
        />
        <Marquee
          items={["Branding", "Web", "Social", "Ads", "CRM", "IA"]}
          speed={2.2}
          reverse
          className="-mt-2 rotate-3 border-y border-ink bg-bone py-3 text-ink"
          separator="✦"
          itemClassName="font-display text-3xl font-semibold uppercase tracking-[-0.03em] md:text-5xl"
        />
        </div>
      </div>
      <FeaturedCase />
      <CasesPreview />
      <ClientsBand />
      <Approach />
      <Pricing />
      <Faq />
      <ContactCta />
    </>
  );
}
