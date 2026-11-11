import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: "Mentions légales", path: "/legal" });

export default function LegalNotice() {
  return (
    <LegalPage
      n="L1"
      title="Mentions légales"
      updated="23 octobre 2026"
      path="/legal"
      sections={[
        {
          h: "Éditeur du site",
          p: [
            `Le site ${site.url.replace(/^https?:\/\//, "")} est édité par ${site.legalName}, société par actions simplifiée, exploitant la marque ${site.name}.`,
            "Siège social : 50 avenue des Champs-Élysées, 75008 Paris.",
            "SIREN : 130 384 969 — RCS Paris [À COMPLÉTER] — TVA intracommunautaire : FR91130384969.",
            "Capital social : [À COMPLÉTER] €.",
            `Contact : ${site.contact.email} — ${site.contact.phone}.`,
          ],
        },
        {
          h: "Directeur de la publication",
          p: [`${site.founder.name}, en qualité de Président de ${site.legalName}.`],
        },
        {
          h: "Hébergement",
          p: [
            "[À COMPLÉTER] — ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.",
          ],
        },
        {
          h: "Propriété intellectuelle",
          p: [
            `L’ensemble des éléments du site (textes, visuels, logos, marques, mises en page, code) est la propriété exclusive de ${site.legalName} ou de ses partenaires et est protégé par le Code de la propriété intellectuelle.`,
            "Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.",
            "Les réalisations présentées le sont avec l’accord des clients concernés ; les marques citées appartiennent à leurs titulaires respectifs.",
          ],
        },
        {
          h: "Responsabilité",
          p: [
            "L’éditeur s’efforce de fournir des informations exactes et à jour, sans pouvoir en garantir l’exhaustivité. Il ne saurait être tenu responsable d’une erreur, d’une omission ou d’une indisponibilité du site.",
            "Les liens vers des sites tiers n’engagent pas la responsabilité de l’éditeur quant à leur contenu.",
          ],
        },
        {
          h: "Données personnelles",
          p: [
            "Le traitement des données collectées sur ce site est décrit dans notre politique de confidentialité, accessible depuis le pied de page.",
          ],
        },
      ]}
    />
  );
}
