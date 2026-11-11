# Target Agency — site vitrine v2

Codebase greenfield : **Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lenis**.
100 % statique (SSG), aucune base de données, aucune auth.

## Démarrer

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Déploiement : Vercel (import du repo, aucun réglage requis) ou tout hébergeur Node.

## Structure

```
src/
  app/                 routes (/, /cases, /cases/[slug], /blog, /blog/[slug],
                       /about-us, /career, /contacts, /legal, /policy, /terms)
                       + sitemap.ts, robots.ts, not-found.tsx
  content/             TOUT le contenu éditable (TS typé)
    site.ts            nom, contact, vidéo, navigation, réseaux, manifeste
    services.ts        6 expertises (001 → 006)
    pricing.ts         abonnements social media (HT / TTC)
    cases.ts           réalisations
    posts.ts           articles de blog (blocs h2 / p / ul / quote)
    faq.ts, process.ts, jobs.ts
  components/
    layout/            Header (menu mobile), Footer, PageHero
    home/              Vision, Services, FeaturedCase, Sections, VideoModal
    ui/agency-hero.tsx Hero de l'accueil (+ hero-shader.tsx)
    cases/ legal/ contact/ ui/
public/brand/          logo.svg, logo-mark.svg (favicon), og.jpg (1200×630)
```

## Hero de l'accueil

`src/components/ui/agency-hero.tsx` (+ `hero-shader.tsx`) — carte plein écran aux coins arrondis, menu en encoche (dans `Header`), mot géant « Target® » qui monte lettre par lettre, ticker des expertises, horloge de Paris en direct, CTA magnétiques et bouton showreel.

- Fond : shader WebGL maison (fumée rouge + ondes de cible qui suivent la souris), sans dépendance, en pause hors écran ; repli CSS si WebGL indisponible ou animations réduites.
- Pour mettre une vidéo à la place : `<AgencyHero videoSrc="/media/hero.mp4" posterSrc="/media/hero.jpg" />` dans `src/app/page.tsx` (fichier à déposer dans `public/media/`).
- `WordsPullUp` et `WordsPullUpMultiStyle` sont exportés pour être réutilisés.

## Couche motion

Tout est dans `src/components/motion/` et `src/lib/motion.ts` (variants réutilisables : `fadeUp`, `fadeUpBlur`, `maskUp`, `clipUp`, `scaleIn`, `lineGrow`, `staggerContainer`, `curtainLayer`, `pageEnter`).

| Effet | Composant | Où |
|---|---|---|
| Smooth scroll inertiel | `Providers` → `ReactLenis root` | global |
| Préloader (compteur 000→100, 1×/session) | `Preloader` | 1re visite |
| Transitions de page (rideau double + nom de la page) | `TransitionProvider` (AnimatePresence) + `app/template.tsx` | tous les liens internes, automatiquement |
| Titres masqués mot à mot / lettre à lettre | `SplitReveal` | tous les H1/H2 |
| Grilles en cascade | `Stagger` + `StaggerItem` | réalisations, forces, process, pricing, FAQ, blog, à propos, carrière |
| Parallax d'image | `Parallax` | showreel hero, cartes et fiches réalisations, à propos |
| Sticky horizontal scroll | `home/Services.tsx` | section Services |
| Marquee infini réactif au scroll (vitesse, sens, skew) | `ui/Marquee.tsx` | accueil, clients, footer |
| Curseur custom (`mix-blend-difference`, magnétique, « Voir »/« Lire ») | `Cursor` | global, pointeurs fins |
| Boutons magnétiques | `Magnetic` (intégré à `ButtonLink`) | tous les CTA, header, réseaux |
| Zoom lent au survol des réalisations | `CaseCard` (1,6 s, cubic-bezier(.16,1,.3,1)) | réalisations |
| Header masqué au scroll descendant, barre de progression | `Header`, `Providers` | global |

**Attributs utiles**
- `data-cursor="view" data-cursor-label="Voir"` sur un élément → pastille du curseur avec libellé
- `data-magnetic` (posé par `<Magnetic>`) → le curseur englobe l'élément
- `data-no-transition` sur un lien → pas de rideau
- `data-lenis-prevent` → zone qui scrolle nativement (modales)

**Accessibilité** : `prefers-reduced-motion` coupe le smooth scroll, le préloader, le curseur, les transitions de page et repasse les Services en liste verticale (`MotionConfig reducedMotion="user"`). Le curseur custom n'est actif que sur souris/trackpad.

## Étude de cas DripMyCard (`/cases/dripmycard`)

Page vitrine aux couleurs du client : elle montre le travail livré de A à Z (nom, identité, boutique, packaging, production) sans détailler la méthode.

- Contenu : `src/content/case-studies/dripmycard.ts` (une phrase par section)
- Composants : `src/components/dmc/` — `DmcCaseStudy` (page), `DmcHero`, `DripBand` (coulures entre sections), `CardSymbol` (symbole SVG animé), `Identity` (palette, spécimen, éléments), `Gallery` (scroll horizontal), `Showcase` (boutique en parallax, galerie packaging)
- Mise en avant : `components/home/FeaturedCase.tsx` et `components/cases/FeaturedCaseCard.tsx`, pilotées par `featured: true` dans `content/cases.ts`
- Visuels : `public/cases/dripmycard/` (extraits du brand book v1)
- Polices : **DripMyCard Display** (`src/fonts/dmc-display.woff2`, reconstruite depuis le PDF : minuscules, accents, ponctuation) + **Onest**. À remplacer par le fichier maître quand il sera disponible (vérifier la licence de Billo, police de départ).

## Design system

Tokens dans `src/app/globals.css` (`@theme`) :
`ink #171717` (fond) · `accent #ff3a24` · `bone #f4f3ef` (texte) · `mute` / `dim` (texte secondaire).
Typos self-hostées via Fontsource (aucun appel Google au build) :
Plus Jakarta Sans (titres) · Inter (texte) · JetBrains Mono (labels).
Classes utiles : `.shell`, `.label`, `.display-xxl/xl/lg/md`, `.field`, `.prose-target`.

## À compléter

Rechercher `[À COMPLÉTER]` dans le code :

- `content/site.ts` — URLs exactes des réseaux sociaux
- `content/cases.ts` — secteurs, contextes et chiffres réels ; visuels dans `public/cases/` (remplacer `CaseCover`)
- `app/legal/page.tsx` — RCS, capital social, hébergeur
- `app/about-us/page.tsx` — photo fondateur
- `components/contact/ContactForm.tsx` — brancher l’envoi dans `submit()` (Route Handler + Resend, Formspree, webhook n8n…)

## Notes

- Formulaire : préremplissage via `?offre=socle|rythme|traction` et `?sujet=candidature&poste=…`.
- Vidéo hero : YouTube en mode `youtube-nocookie`, chargée uniquement à l’ouverture de la modale.
- SEO : métadonnées par page, OG/Twitter, JSON-LD (ProfessionalService, FAQPage, BlogPosting), sitemap, robots.
- Accessibilité : skip-link, focus visibles, `prefers-reduced-motion` respecté, accordéons ARIA.
