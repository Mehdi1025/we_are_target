import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: "Conditions d’utilisation", path: "/terms" });

export default function Terms() {
  return (
    <LegalPage
      n="L3"
      title="Conditions d’utilisation"
      updated="23 octobre 2026"
      path="/terms"
      sections={[
        {
          h: "Objet",
          p: [
            `Les présentes conditions régissent l’accès et l’utilisation du site de ${site.name}. En naviguant sur le site, vous les acceptez sans réserve.`,
          ],
        },
        {
          h: "Accès au site",
          p: [
            "Le site est accessible gratuitement, 24 h/24, sous réserve d’opérations de maintenance ou de cas de force majeure. L’éditeur peut en modifier le contenu à tout moment.",
          ],
        },
        {
          h: "Informations et tarifs",
          p: [
            "Les informations publiées sont indicatives. Les tarifs affichés sont exprimés hors taxes, sauf mention contraire, et peuvent évoluer. Seul le devis ou le contrat signé engage les parties.",
          ],
        },
        {
          h: "Utilisation du formulaire",
          p: [
            "Vous vous engagez à fournir des informations exactes et à ne pas utiliser le formulaire à des fins illicites, abusives ou de sollicitation non désirée.",
          ],
        },
        {
          h: "Propriété intellectuelle",
          p: [
            "Les contenus du site sont protégés. Toute réutilisation sans autorisation écrite préalable est interdite (voir les mentions légales).",
          ],
        },
        {
          h: "Droit applicable",
          p: [
            "Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, tout litige relève des tribunaux compétents du ressort du siège de l’éditeur.",
          ],
        },
      ]}
    />
  );
}
