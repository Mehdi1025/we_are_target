import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: "Politique de confidentialité", path: "/policy" });

export default function Policy() {
  return (
    <LegalPage
      n="L2"
      title="Politique de confidentialité"
      updated="23 octobre 2026"
      path="/policy"
      sections={[
        {
          h: "Responsable du traitement",
          p: [
            `${site.legalName} (marque ${site.name}), 50 avenue des Champs-Élysées, 75008 Paris. Contact : ${site.contact.email}.`,
          ],
        },
        {
          h: "Données collectées",
          p: [
            "Via le formulaire de contact : nom, entreprise, adresse e-mail, téléphone, service recherché, budget indicatif et contenu de votre message.",
            "Pour les candidatures : les informations et liens que vous choisissez de nous transmettre.",
            "Données techniques de navigation strictement nécessaires au fonctionnement du site. [À COMPLÉTER si un outil de mesure d’audience est ajouté.]",
          ],
        },
        {
          h: "Finalités et bases légales",
          p: [
            "Répondre à vos demandes et établir un devis : mesures précontractuelles prises à votre demande.",
            "Suivi de la relation commerciale et prospection B2B : intérêt légitime de l’agence.",
            "Gestion des candidatures : mesures précontractuelles.",
          ],
        },
        {
          h: "Durée de conservation",
          p: [
            "Prospects : 3 ans à compter du dernier contact. Clients : durée de la relation contractuelle, puis durées légales d’archivage. Candidats non retenus : 2 ans, sauf opposition.",
          ],
        },
        {
          h: "Destinataires",
          p: [
            "Vos données sont destinées à l’équipe de Target Agency et à ses sous-traitants techniques (hébergement, messagerie, CRM), tenus à la confidentialité. Elles ne sont jamais vendues.",
            "Lorsque des sous-traitants sont situés hors de l’Union européenne, les transferts sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission européenne).",
          ],
        },
        {
          h: "Vos droits",
          p: [
            `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour les exercer : ${site.contact.email}.`,
            "Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).",
          ],
        },
        {
          h: "Cookies",
          p: [
            "Le site n’utilise par défaut que des cookies strictement nécessaires. La vidéo de présentation est intégrée via le mode de confidentialité renforcée de YouTube et ne se charge qu’à votre demande.",
          ],
        },
      ]}
    />
  );
}
