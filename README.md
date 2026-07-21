# Nuances de Noir — Site vitrine

Site vitrine minimaliste sombre pour la marque de vêtements **Nuances de Noir**.
_First Drop — Vantablack / Smokey — 2026._

Références esthétiques : Rick Owens, Balenciaga, davrilsupply.com.

## Stack

- **Next.js 14** (App Router) · **TypeScript** (strict)
- **Tailwind CSS**
- **Framer Motion**
- Polices via `next/font` : **Anton** (display condensé) + **Inter** (corps)
- Prêt pour un déploiement **Vercel**

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
```

Autres scripts :

```bash
npm run build    # build de production
npm run start    # sert le build
npm run lint     # ESLint
```

## Déploiement Vercel

Le dépôt est prêt à l'emploi : importer le repo dans Vercel, aucune configuration
particulière n'est requise (framework détecté automatiquement).

## Structure

```
app/
  layout.tsx            # polices, métadonnées SEO / Open Graph, providers
  page.tsx              # assemblage des sections
  globals.css           # thème, grain de film, gradient souris, reduced-motion
  api/subscribe/route.ts# stub de capture email (voir plus bas)
components/
  Hero.tsx              # séquence d'entrée + hero au repos
  Manifesto.tsx         # section manifeste (révélé au scroll)
  Collection.tsx        # grille asymétrique + état de l'overlay
  PieceCard.tsx         # carte pièce (désaturé → couleur, nom au survol)
  ProductOverlay.tsx    # overlay produit plein écran
  EmailCapture.tsx      # section capture email
  Footer.tsx            # footer minimal
  SiteHeader.tsx        # sélecteur de langue fixe (révélé au scroll)
  LanguageSwitcher.tsx  # sélecteur FR / EN
  PieceImage.tsx        # visuel d'une pièce (ratio 3:4)
  FilmGrain.tsx         # overlay grain de film
  providers/
    LanguageProvider.tsx# contexte i18n (FR / EN, localStorage)
lib/
  content.ts            # TOUS les textes (bilingue) + données des pièces
  types.ts              # types TypeScript stricts
  format.ts             # affichage conditionnel du prix
public/
  brand/                # logo + image Open Graph
  pieces/               # visuels des pièces (placeholders)
scripts/
  gen-placeholders.mjs  # (re)génère les placeholders SVG
```

## Assets — emplacement et remplacement

Les visuels sont des **placeholders SVG** (dégradés noir/anthracite, ratio 3:4),
générés par `scripts/gen-placeholders.mjs`.

- **Pièces** : `public/pieces/ava-01.svg` … `ava-06.svg`
- **Logo** : `public/brand/logo.svg`
- **Open Graph** : `public/brand/og.svg`

**Pour brancher de vrais visuels**, deux options :

1. Remplacer le fichier au même chemin (ex. déposer `public/pieces/ava-01.svg`),
   rien d'autre à changer.
2. Ou mettre à jour le champ `image` de la pièce dans `lib/content.ts`
   (ex. `image: "/pieces/veste.jpg"`) et déposer le fichier correspondant.

Les images sont affichées en `object-cover` : n'importe quel format (jpg, webp,
png, svg) fonctionne, un cadrage 3:4 est recommandé.

## Modifier les textes

Tout le contenu éditorial (FR + EN) est centralisé dans **`lib/content.ts`** :
manifeste, descriptions des pièces, libellés d'interface, footer.

Le manifeste est en tête de fichier (`manifesto`), facile à éditer.

## Bilingue FR / EN

- Français par défaut, préférence mémorisée en `localStorage`.
- Sélecteur discret (FR / EN) en haut à droite (au scroll) et dans le footer.
- Aucune librairie i18n : un simple contexte React (`LanguageProvider`).

## Capture email

Le formulaire poste vers **`app/api/subscribe/route.ts`**, un _stub_ qui :

1. valide le format de l'email,
2. `console.log` l'adresse,
3. renvoie une réponse de succès.

Pour brancher un vrai service d'emailing (Mailchimp, Resend, Brevo, Klaviyo…),
suivre les instructions commentées en tête de ce fichier (l'endroit exact où
insérer l'appel API est indiqué).

## Détails d'accessibilité & performance

- `prefers-reduced-motion` respecté : animations coupées, contenu immédiatement
  visible, grain de film masqué.
- Navigation clavier complète (overlay : Échap ferme, ← / → naviguent), focus
  visibles et sobres.
- Attributs `alt` sur toutes les images.
- Hauteurs mobiles fiables via `dvh` (barres Safari iOS).
- Métadonnées SEO + Open Graph dans `app/layout.tsx`.
- L'intro ne se joue **qu'une fois par session** (`sessionStorage`) et peut être
  passée au scroll, au clic ou au clavier.
