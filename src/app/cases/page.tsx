import { featuredCase, otherCases } from "@/content/cases";
import { FeaturedCaseCard } from "@/components/cases/FeaturedCaseCard";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { CaseCard } from "@/components/cases/CaseCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ContactCta } from "@/components/home/Sections";

export const metadata = pageMetadata({
  title: "Réalisations",
  description: "Branding, sites web, réseaux sociaux : une sélection de projets menés par Target Agency.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero
        n="04"
        label="Réalisations"
        title="L’empreinte Target"
        intro="Une sélection de collaborations qui reflètent notre exigence, notre créativité et notre manière de concevoir des marques qui se démarquent."
      />
      {featuredCase && (
        <section className="shell pb-20">
          <FeaturedCaseCard item={featuredCase} />
        </section>
      )}
      <section className="shell pb-24">
        <Stagger stagger={0.15} className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {otherCases.map((c, i) => (
            <StaggerItem key={c.slug} className={i % 2 === 1 ? "md:mt-28" : ""}>
              <CaseCard item={c} index={i + 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <ContactCta />
    </>
  );
}
