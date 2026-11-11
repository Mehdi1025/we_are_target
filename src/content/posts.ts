export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "construire-une-identite-de-marque-forte",
    title: "Comment construire une identité de marque forte et cohérente",
    excerpt:
      "Un logo ne fait pas une marque. Voici les cinq briques qui transforment une entreprise en marque reconnaissable — et durable.",
    category: "Branding",
    date: "2026-10-14",
    readingTime: "6 min",
    body: [
      {
        type: "p",
        text: "Beaucoup d’entreprises pensent « marque » quand elles pensent « logo ». C’est compréhensible : c’est la partie visible. Mais une identité de marque forte repose d’abord sur des décisions invisibles — à qui vous parlez, ce que vous promettez, et ce que vous refusez de devenir.",
      },
      { type: "h2", text: "1. Partir du positionnement, pas du graphisme" },
      {
        type: "p",
        text: "Avant de choisir une couleur, il faut pouvoir répondre en une phrase à trois questions : pour qui existez-vous, quel problème résolvez-vous, et pourquoi vous plutôt qu’un autre ? Sans ces réponses, le design devient décoratif.",
      },
      { type: "h2", text: "2. Définir une voix, pas seulement un style" },
      {
        type: "p",
        text: "Votre marque parle tous les jours : sur votre site, dans vos devis, sur vos réseaux, au téléphone. Fixer un ton — direct, chaleureux, expert — évite qu’elle change de personnalité selon la personne qui écrit.",
      },
      { type: "h2", text: "3. Construire un système visuel" },
      {
        type: "p",
        text: "Un logo seul ne suffit pas. Une identité solide comprend une palette, une typographie, des règles de mise en page et des gabarits réutilisables. C’est ce système qui crée la reconnaissance, bien plus qu’un symbole.",
      },
      {
        type: "ul",
        items: [
          "Une palette courte : une couleur dominante, une couleur d’accent, des neutres",
          "Deux familles typographiques maximum",
          "Des gabarits prêts à l’emploi pour les supports récurrents",
        ],
      },
      { type: "h2", text: "4. Documenter dans une charte vivante" },
      {
        type: "p",
        text: "La charte graphique n’est pas un PDF qu’on archive. C’est l’outil qui permet à un prestataire, un salarié ou un partenaire de produire un support cohérent sans vous demander validation à chaque fois.",
      },
      { type: "h2", text: "5. Appliquer partout, tout le temps" },
      {
        type: "quote",
        text: "La cohérence bat la créativité ponctuelle. Une marque se construit par répétition.",
      },
      {
        type: "p",
        text: "C’est la constance qui installe la confiance. Chaque point de contact — une signature mail, une story, une facture — doit raconter la même histoire. C’est exactement ce que nous livrons : une identité complète, prête à l’emploi.",
      },
    ],
  },
  {
    slug: "strategie-social-media-structuree",
    title: "Passer du posting aléatoire à une stratégie social media structurée",
    excerpt:
      "Publier « quand on a le temps » ne mène nulle part. Une méthode simple pour transformer vos réseaux en canal d’acquisition.",
    category: "Social Media",
    date: "2026-09-30",
    readingTime: "5 min",
    body: [
      {
        type: "p",
        text: "La plupart des TPE et PME publient sur les réseaux sociaux par à-coups : trois posts une semaine, rien pendant un mois, puis une promotion en urgence. Le résultat est prévisible — peu de portée, peu d’engagement, et la conclusion que « les réseaux, ça ne marche pas pour nous ».",
      },
      { type: "h2", text: "Fixer un objectif mesurable" },
      {
        type: "p",
        text: "Notoriété, prise de rendez-vous, trafic en boutique, recrutement : chaque objectif appelle des formats et des indicateurs différents. Choisissez-en un principal par trimestre.",
      },
      { type: "h2", text: "Définir des piliers éditoriaux" },
      {
        type: "p",
        text: "Trois à quatre thèmes récurrents suffisent : votre expertise, vos coulisses, vos clients, vos offres. Ils évitent la page blanche et rendent votre ligne lisible.",
      },
      { type: "h2", text: "Planifier un mois à l’avance" },
      {
        type: "ul",
        items: [
          "Un calendrier éditorial mensuel validé en amont",
          "Un mix de formats : reels, carrousels, visuels",
          "Une programmation automatique pour garantir la régularité",
        ],
      },
      { type: "h2", text: "Mesurer, ajuster, recommencer" },
      {
        type: "p",
        text: "Chaque fin de mois, regardez ce qui a fonctionné — et pourquoi. Les formats qui performent sont renforcés, les autres remplacés. C’est cette boucle qui fait progresser un compte, bien plus que la quantité de publications.",
      },
      {
        type: "quote",
        text: "La régularité est la première stratégie. Sans elle, aucune autre ne peut fonctionner.",
      },
    ],
  },
  {
    slug: "de-la-visibilite-a-la-conversion",
    title: "De la visibilité à la conversion : transformer votre présence en résultats",
    excerpt:
      "Des vues et des likes, c’est bien. Des clients, c’est mieux. Les trois chaînons qui relient votre visibilité à votre chiffre d’affaires.",
    category: "Acquisition",
    date: "2026-09-16",
    readingTime: "6 min",
    body: [
      {
        type: "p",
        text: "Être visible n’a jamais suffi. Entre le moment où un prospect découvre votre marque et celui où il signe, il y a un parcours. Si un seul maillon est faible, toute la visibilité accumulée se perd.",
      },
      { type: "h2", text: "Chaînon 1 — Attirer les bonnes personnes" },
      {
        type: "p",
        text: "Une audience large mais hors cible coûte cher et convertit peu. Le ciblage publicitaire et la ligne éditoriale doivent viser vos clients idéaux, pas le plus grand nombre.",
      },
      { type: "h2", text: "Chaînon 2 — Convaincre sur votre site" },
      {
        type: "p",
        text: "Votre site est l’endroit où se joue la décision. Il doit charger vite, être lisible sur mobile, répondre aux objections et proposer une action claire à chaque étape.",
      },
      {
        type: "ul",
        items: [
          "Une promesse explicite dès la première ligne",
          "Des preuves : réalisations, chiffres, avis",
          "Un appel à l’action visible et unique par page",
        ],
      },
      { type: "h2", text: "Chaînon 3 — Ne laisser filer aucun contact" },
      {
        type: "p",
        text: "Un formulaire qui arrive dans une boîte mail non suivie, c’est un client perdu. Un CRM simple et quelques automatisations (accusé de réception, relance, rappel) suffisent souvent à doubler le taux de transformation.",
      },
      {
        type: "quote",
        text: "La croissance vient rarement d’un nouveau canal. Elle vient d’un parcours sans fuite.",
      },
      {
        type: "p",
        text: "C’est pour cela que nous travaillons l’image, le site et les outils ensemble : la conversion se joue à chaque étape, pas seulement dans la publicité.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
