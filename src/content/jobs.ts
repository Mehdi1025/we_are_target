export type Job = {
  slug: string;
  title: string;
  contract: string;
  location: string;
  summary: string;
  missions: string[];
  profile: string[];
};

export const jobs: Job[] = [
  {
    slug: "commercial-prospection-telephonique",
    title: "Commercial(e) — Prospection téléphonique",
    contract: "Indépendant / commission",
    location: "100 % à distance",
    summary:
      "Vous ouvrez les portes : qualification des entreprises et prise de rendez-vous qualifiés pour l’équipe. Le closing reste chez nous.",
    missions: [
      "Prospection téléphonique de TPE/PME (Grand Est & Suisse)",
      "Qualification des besoins et prise de rendez-vous",
      "Suivi dans le CRM et reporting hebdomadaire",
    ],
    profile: [
      "À l’aise au téléphone, persévérant(e), organisé(e)",
      "Première expérience en prospection B2B appréciée",
      "Autonomie et rigueur dans le suivi",
    ],
  },
  {
    slug: "alternance-marketing-digital",
    title: "Alternance — Chargé(e) de marketing digital",
    contract: "Contrat d’apprentissage — Master (niveau 7)",
    location: "100 % à distance",
    summary:
      "Vous travaillez sur des projets clients réels : stratégie de contenus, réseaux sociaux, campagnes et outils.",
    missions: [
      "Participation aux stratégies social media des clients",
      "Suivi des performances et reporting",
      "Contribution aux projets branding et web",
    ],
    profile: [
      "Étudiant(e) en Master marketing / communication digitale",
      "Curiosité pour les outils, l’automatisation et l’IA",
      "Sens du détail et goût pour le design",
    ],
  },
];
