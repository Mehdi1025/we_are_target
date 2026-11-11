export type Service = {
  id: string;
  slug: string;
  title: string;
  text: string;
  program: string[];
  deliverable: string;
};

export const services: Service[] = [
  {
    id: "001",
    slug: "branding",
    title: "Branding & Identité visuelle",
    text: "Construisez une image forte que vos clients reconnaissent et retiennent. Nous créons une identité cohérente qui traduit votre vision, renforce votre crédibilité et vous différencie de vos concurrents.",
    program: [
      "Logo & univers graphique",
      "Charte graphique complète",
      "Définition de votre identité de marque",
      "Supports de communication cohérents",
    ],
    deliverable: "Une identité complète, prête à l’emploi.",
  },
  {
    id: "002",
    slug: "sites-web",
    title: "Création de sites web",
    text: "Des expériences digitales modernes, rapides et intuitives, pensées pour convaincre dès le premier regard et transformer vos visiteurs en opportunités.",
    program: [
      "Conception UX/UI personnalisée",
      "Design moderne et responsive",
      "Optimisation de l’expérience utilisateur",
      "Mise en ligne & suivi du site",
    ],
    deliverable: "Un site moderne, rapide, orienté conversion.",
  },
  {
    id: "003",
    slug: "strategie-digitale",
    title: "Stratégie digitale & Réseaux sociaux",
    text: "Développez une présence qui attire les bonnes personnes. Nous construisons une stratégie claire pour faire grandir votre communauté et créer une relation durable avec votre audience.",
    program: [
      "Stratégie de communication",
      "Gestion des réseaux sociaux",
      "Planification des publications",
      "Analyse des performances",
    ],
    deliverable: "Une feuille de route claire, pilotée chaque mois.",
  },
  {
    id: "004",
    slug: "acquisition-publicite",
    title: "Acquisition & Publicité",
    text: "Transformez votre visibilité en croissance mesurable. Nous créons des campagnes pensées pour atteindre vos objectifs et attirer des prospects qualifiés.",
    program: [
      "Création de campagnes publicitaires",
      "Ciblage des audiences",
      "Optimisation des performances",
      "Suivi des résultats",
    ],
    deliverable: "Des campagnes rentables, suivies et optimisées.",
  },
  {
    id: "005",
    slug: "contenus",
    title: "Social Media & Contenus",
    text: "Créez une communauté engagée autour de votre marque. Photo, vidéo, motion : nous produisons des contenus qui racontent votre histoire et fidélisent votre audience.",
    program: [
      "Stratégie éditoriale",
      "Production photo, vidéo & motion",
      "Calendrier éditorial & community management",
      "Reporting mensuel",
    ],
    deliverable: "Un flux de contenus réguliers, à votre image.",
  },
  {
    id: "006",
    slug: "outils-automatisation",
    title: "Outils, CRM & Automatisation",
    text: "Votre croissance ne tient pas qu’à votre image. Nous structurons vos outils — CRM, logiciels métier, automatisations, IA — pour que vos équipes gagnent du temps et que rien ne se perde.",
    program: [
      "Audit de vos outils et process",
      "Mise en place ou migration CRM",
      "Automatisation des tâches répétitives",
      "Intégration d’assistants IA",
    ],
    deliverable: "Des outils connectés, adoptés par vos équipes.",
  },
];

export const serviceTags = [
  "Stratégie de marque",
  "Direction créative",
  "Identité de marque",
  "Expérience digitale",
  "Création de contenu",
  "Stratégie de croissance",
] as const;
