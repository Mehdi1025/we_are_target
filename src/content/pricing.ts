export type Plan = {
  id: string;
  name: string;
  pitch: string;
  priceHT: number;
  priceTTC: string;
  featured?: boolean;
  includes: string[];
};

/**
 * Abonnement mensuel = gestion de l’image sur les réseaux sociaux UNIQUEMENT.
 * Tout le reste (site, identité, pub, print, CRM, logiciels…) est chiffré au projet.
 */
export const plans: Plan[] = [
  {
    id: "001",
    name: "Socle",
    pitch: "Zéro visibilité = zéro client. On pose une présence régulière dès le premier mois.",
    priceHT: 299,
    priceTTC: "358,80",
    includes: [
      "Instagram + Facebook",
      "13 publications / mois (4 reels, 2 carrousels, 7 visuels)",
      "Calendrier éditorial mensuel",
      "Programmation & reporting automatisés",
      "Kit d’identité offert",
    ],
  },
  {
    id: "002",
    name: "Rythme",
    pitch: "On transforme vos abonnés en clients. Plus de vidéo, plus de régularité.",
    priceHT: 449,
    priceTTC: "538,80",
    featured: true,
    includes: [
      "Instagram + Facebook",
      "18 publications / mois (9 reels, 2 carrousels, 7 visuels)",
      "Calendrier éditorial mensuel",
      "Modération des commentaires & messages",
      "Kit d’identité offert",
    ],
  },
  {
    id: "003",
    name: "Traction",
    pitch: "Vous ne gérez plus rien. On pilote, vous comptez les résultats.",
    priceHT: 699,
    priceTTC: "838,80",
    includes: [
      "Instagram + Facebook + TikTok",
      "22 publications / mois (13 reels, 3 carrousels, 6 visuels)",
      "Reels déclinés au format TikTok",
      "Modération & rapport de performance mensuel",
      "Kit d’identité offert",
    ],
  },
];

export const pricingNotes = {
  identityKitValue: "490 €",
  shootingOption: "Tournage en option : 350 € HT la demi-journée.",
  outOfScope:
    "Site web, identité visuelle, publicité, print, CRM & outils : chiffrés sur devis, selon votre projet.",
};
