/**
 * Réalisations — clients repris du site actuel.
 * Les textes ci-dessous sont une STRUCTURE à valider : remplacer chaque
 * [À COMPLÉTER] par les éléments réels (contexte, chiffres, visuels).
 */
export type CaseStudy = {
  slug: string;
  client: string;
  year: string;
  sector: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string[];
  deliverables: string[];
  results: { value: string; label: string }[];
  cover: "accent" | "outline" | "grid";
  /** Visuel réel (remplace la couverture typographique) */
  image?: { src: string; w: number; h: number; alt: string };
  /** Mis en avant sur l'accueil et en tête des réalisations */
  featured?: boolean;
  /** Page sur mesure au lieu du gabarit générique */
  layout?: "dripmycard";
  tags?: string[];
};

const TBD = "[À COMPLÉTER]";

export const cases: CaseStudy[] = [
  {
    slug: "dripmycard",
    client: "DripMyCard",
    year: "2026",
    sector: "E-commerce, accessoires personnalisés",
    services: ["Naming", "Branding", "Shopify", "Outil métier"],
    summary: "Une marque e-commerce construite de A à Z : nom, identité, boutique, packaging et production.",
    challenge:
      "Transformer la carte bancaire en accessoire de style, avec des skins vendus moins de 10 € livraison comprise.",
    approach: [],
    deliverables: [],
    results: [],
    cover: "accent",
    image: {
      src: "/cases/dripmycard/cover.webp",
      w: 2400,
      h: 1697,
      alt: "Logo DripMyCard et carte pêche qui coule sur fond encre",
    },
    featured: true,
    layout: "dripmycard",
    tags: ["Naming", "Identité", "E-commerce", "Packaging"],
  },
  {
    slug: "media-brokerage-by-reign",
    client: "Media & Brokerage By Reign",
    year: "2026",
    sector: "Immobilier — Dubaï",
    services: ["Création de site web", "Branding"],
    summary: "Création d’une plateforme pour une agence immobilière à Dubaï.",
    challenge:
      "Présenter une offre immobilière internationale avec le niveau d’exigence attendu par une clientèle premium, tout en facilitant la prise de contact.",
    approach: [
      "Architecture de la plateforme autour des parcours acheteurs et investisseurs",
      "Direction artistique sobre et haut de gamme",
      "Développement responsive et optimisation des temps de chargement",
    ],
    deliverables: ["Plateforme web", "Design system", "Mise en ligne & suivi"],
    results: [
      { value: TBD, label: "Demandes de contact / mois" },
      { value: TBD, label: "Délai de livraison" },
    ],
    cover: "accent",
  },
  {
    slug: "luxkey",
    client: "Luxkey",
    year: "2026",
    sector: TBD,
    services: ["Branding", "Création de site web"],
    summary: "Identité et présence digitale d’une marque en lancement.",
    challenge: `Construire une marque crédible dès le lancement. ${TBD}`,
    approach: [
      "Atelier de positionnement et de plateforme de marque",
      "Création du logo et de l’univers graphique",
      "Déclinaison sur le site et les supports clés",
    ],
    deliverables: ["Logo", "Charte graphique", "Site vitrine"],
    results: [
      { value: TBD, label: "Résultat clé" },
      { value: TBD, label: "Résultat secondaire" },
    ],
    cover: "grid",
  },
  {
    slug: "latifa-b",
    client: "Latifa B.",
    year: "2026",
    sector: TBD,
    services: ["Identité visuelle", "Social media"],
    summary: "Une image personnelle cohérente, du logo aux réseaux sociaux.",
    challenge: `Donner une signature visuelle reconnaissable à une marque personnelle. ${TBD}`,
    approach: [
      "Définition de l’univers et du ton",
      "Création des gabarits de publication",
      "Calendrier éditorial et accompagnement",
    ],
    deliverables: ["Identité visuelle", "Templates réseaux sociaux", "Calendrier éditorial"],
    results: [
      { value: TBD, label: "Évolution de l’audience" },
      { value: TBD, label: "Engagement moyen" },
    ],
    cover: "outline",
  },
  {
    slug: "les-gourmandises-de-nadj",
    client: "Les Gourmandises de Nadj",
    year: "2026",
    sector: "Food & gourmandises",
    services: ["Branding", "Social media & contenus"],
    summary: "Une marque gourmande qui donne envie, en boutique comme en ligne.",
    challenge: `Rendre la marque aussi désirable sur les réseaux que ses produits. ${TBD}`,
    approach: [
      "Refonte de l’identité et du packaging",
      "Production de contenus photo et vidéo",
      "Animation des réseaux sociaux",
    ],
    deliverables: ["Identité visuelle", "Contenus photo/vidéo", "Gestion des réseaux"],
    results: [
      { value: TBD, label: "Abonnés gagnés" },
      { value: TBD, label: "Commandes générées" },
    ],
    cover: "accent",
  },
  {
    slug: "l-heritage-francais",
    client: "L’Héritage Français",
    year: "2026",
    sector: TBD,
    services: ["Branding", "Création de site web"],
    summary: "Une marque qui assume son héritage, avec une exécution contemporaine.",
    challenge: `Allier tradition et modernité sans tomber dans le cliché. ${TBD}`,
    approach: [
      "Positionnement et récit de marque",
      "Direction artistique et typographie",
      "Site vitrine orienté conversion",
    ],
    deliverables: ["Plateforme de marque", "Identité visuelle", "Site web"],
    results: [
      { value: TBD, label: "Résultat clé" },
      { value: TBD, label: "Résultat secondaire" },
    ],
    cover: "grid",
  },
  {
    slug: "liga-del-pueblo",
    client: "Liga Del Pueblo",
    year: "2026",
    sector: "Sport & événementiel",
    services: ["Branding", "Site web", "Social media"],
    summary: "L’identité et la communication d’un tournoi de street football.",
    challenge:
      "Fédérer joueurs, équipes et public autour d’un tournoi de quartier, avec une image à la hauteur de l’énergie du terrain.",
    approach: [
      "Identité visuelle forte, pensée pour le textile et l’affichage",
      "Site d’information et d’inscription",
      "Couverture réseaux sociaux avant, pendant et après l’événement",
    ],
    deliverables: ["Identité visuelle", "Site web", "Contenus événementiels"],
    results: [
      { value: TBD, label: "Équipes inscrites" },
      { value: TBD, label: "Portée des contenus" },
    ],
    cover: "outline",
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export const featuredCase = cases.find((c) => c.featured);
export const otherCases = cases.filter((c) => !c.featured);
