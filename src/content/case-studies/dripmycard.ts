/**
 * Étude de cas DripMyCard — version vitrine : on montre le travail, pas la méthode.
 * Visuels : /public/cases/dripmycard (extraits du brand book v1, octobre 2026).
 */

const img = (name: string) => `/cases/dripmycard/${name}.webp`;

export const dmc = {
  slug: "dripmycard",
  url: "https://dripmycard.com",
  urlLabel: "dripmycard.com",
  date: "2026",
  title: "la carte bancaire qui a du style",
  summary:
    "Une marque e-commerce construite de A à Z : le nom, l’identité, la boutique, le packaging et la production.",

  meta: [
    { k: "Client", v: "DripMyCard" },
    { k: "Secteur", v: "E-commerce" },
    { k: "Année", v: "2026" },
    { k: "Marché", v: "Europe" },
  ],
  services: ["Naming", "Identité visuelle", "Boutique Shopify", "Packaging", "Production & outils"],

  pillars: [
    { t: "Nom & identité", d: "Un nom, un logo et un univers construits autour d’une carte qui fond." },
    { t: "Boutique e-commerce", d: "Un thème Shopify sur mesure, pensé pour donner envie et pour convertir." },
    { t: "Packaging", d: "Un kit d’envoi pensé pour l’unboxing et les réseaux." },
    { t: "Production & outils", d: "Une production internalisée, pilotée par un outil développé sur mesure." },
  ],

  identity: {
    line: "Tout part d’une image : une carte bancaire qui fond. Ce « drip » devient le fil rouge de la marque.",
    palette: [
      { name: "volt", hex: "#5B2EFF", ink: "#F7F5F2" },
      { name: "pêche", hex: "#FF7A45", ink: "#14121F" },
      { name: "encre", hex: "#14121F", ink: "#F7F5F2" },
      { name: "papier", hex: "#F7F5F2", ink: "#14121F" },
    ],
    elements: ["coulures", "goutte", "puce", "etincelles", "carte", "fleche", "souligne", "pastille", "numero", "qr"],
  },

  shop: {
    line: "Une boutique qui donne envie comme un compte Instagram et convertit comme un vrai e-shop.",
    highlights: ["Thème Shopify sur mesure", "Skin personnalisé à la commande", "Avis clients automatisés"],
    marquee: ["sans résidu", "puce dégagée", "pose en trente secondes", "sans contact ok"],
  },

  packaging: { line: "Un unboxing pensé pour être filmé et partagé." },

  production: {
    line: "Toute la production est faite en interne, pilotée par un outil développé sur mesure et connecté à la boutique.",
  },

  results: {
    lead: "Une marque complète et autonome, de l’idée au colis.",
    figures: [
      { value: 9, prefix: "", suffix: "", label: "skins au lancement" },
      { value: 10, prefix: "< ", suffix: " €", label: "livraison comprise" },
      { value: 100, prefix: "", suffix: " %", label: "produit en interne" },
      { value: 4, prefix: "", suffix: "", label: "marchés européens" },
    ],
  },

  images: {
    cover: { src: img("cover"), w: 2400, h: 1697, alt: "Logo DripMyCard et carte pêche qui coule sur fond encre" },
    logoLight: { src: img("logo-light"), w: 1400, h: 316, alt: "Logo DripMyCard horizontal" },
    declinaisons: { src: img("declinaisons"), w: 2000, h: 1036, alt: "Déclinaisons du logo et du symbole DripMyCard" },
    envelope: { src: img("envelope"), w: 2400, h: 1698, alt: "Enveloppe DripMyCard : « ta carte arrive. elle va briller. »" },
    flatlay: { src: img("flatlay"), w: 2400, h: 1600, alt: "Contenu d’une commande DripMyCard" },
    merci: { src: img("merci"), w: 1200, h: 1691, alt: "Carte de remerciement « merci. » sur fond volt" },
    poseRecto: { src: img("pose-recto"), w: 1000, h: 1419, alt: "Carte de pose DripMyCard" },
    poseVerso: { src: img("pose-verso"), w: 1000, h: 1419, alt: "Carte tuto vidéo DripMyCard avec QR code" },
    gabarit: { src: img("gabarit"), w: 1200, h: 1434, alt: "Support du skin « bullseye 01 », collab Target Agency" },
    sticker: { src: img("sticker"), w: 900, h: 900, alt: "Sticker rond DripMyCard" },
    shopDesktop: { src: img("shop-desktop"), w: 1440, h: 1080, alt: "Boutique DripMyCard : « ta carte mérite mieux. »" },
    shopMobile: { src: img("shop-mobile"), w: 390, h: 844, alt: "Boutique DripMyCard sur mobile" },
    avatar: { src: img("avatar"), w: 800, h: 800, alt: "Avatar réseaux sociaux DripMyCard" },
    appIcon: { src: img("app-icon"), w: 600, h: 600, alt: "Icône d’application DripMyCard" },
  },
  motifs: { volt: img("motif-volt") },
  elementImage: (key: string) => `/cases/dripmycard/elements/${key}.webp`,
} as const;
