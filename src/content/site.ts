export const site = {
  name: "Target Agency",
  legalName: "We are Target SAS",
  tagline: "Agence de Marketing digital & de communication",
  description:
    "Target Agency transforme les ambitions des entreprises en marques fortes : branding, sites web, réseaux sociaux, publicité et automatisation. 100 % à distance, partout en France.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearetarget.fr",
  locale: "fr_FR",
  contact: {
    phone: "+33 6 09 88 46 60",
    phoneHref: "tel:+33609884660",
    email: "target@contact.fr",
    location: "France — 100 % à distance",
  },
  video: {
    youtubeId: "QH5hihlXjmw",
    url: "https://www.youtube.com/watch?v=QH5hihlXjmw",
    duration: "1:42",
  },
  founder: { name: "Adam Fisli", role: "Fondateur" },
} as const;

export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/cases" },
  { label: "Articles", href: "/blog" },
  { label: "À propos", href: "/about-us" },
  { label: "Carrière", href: "/career" },
  { label: "Nous contacter", href: "/contacts" },
] as const;

export const legalNav = [
  { label: "Politique de confidentialité", href: "/policy" },
  { label: "Mentions légales", href: "/legal" },
  { label: "Conditions d’utilisation", href: "/terms" },
] as const;

// [À COMPLÉTER] — remplacer par les URLs exactes des comptes Target Agency
export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
] as const;

export type SocialIcon = (typeof socials)[number]["icon"];

export const manifesto = [
  "Pas de jargon. Juste des résultats.",
  "La clarté prime sur la complexité",
  "Les résultats avant les promesses",
  "Conçu pour la réalité du terrain",
  "Des stratégies qui tiennent dans la durée",
] as const;
