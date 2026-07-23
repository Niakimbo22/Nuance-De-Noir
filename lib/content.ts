import type {
  Lang,
  Localized,
  LocalizedLines,
  Piece,
} from "@/lib/types";

/**
 * Contenu éditorial du site — bilingue FR / EN.
 * Point d'entrée unique pour modifier les textes.
 */

export const DEFAULT_LANG: Lang = "fr";

export const brand = {
  name: "NUANCES DE NOIR",
  drop: "FIRST DROP — VANTABLACK / SMOKEY — 2026",
  instagram: {
    handle: "@nuancesdenoir.clo",
    url: "https://instagram.com/nuancesdenoir.clo",
  },
  email: "quantinnils@gmail.com",
  year: 2026,
} as const;

/** Intitulés d'interface. */
export const ui = {
  skip: { fr: "Passer l'intro", en: "Skip intro" } satisfies Localized,
  scroll: { fr: "Défiler", en: "Scroll" } satisfies Localized,
  manifesto: { fr: "Manifeste", en: "Manifesto" } satisfies Localized,
  collection: { fr: "Collection", en: "Collection" } satisfies Localized,
  reference: { fr: "Référence", en: "Reference" } satisfies Localized,
  materials: { fr: "Matières", en: "Materials" } satisfies Localized,
  sizes: { fr: "Tailles", en: "Sizes" } satisfies Localized,
  priceSoon: { fr: "PRIX — À VENIR", en: "PRICE — COMING SOON" } satisfies Localized,
  close: { fr: "Fermer", en: "Close" } satisfies Localized,
  prev: { fr: "Pièce précédente", en: "Previous piece" } satisfies Localized,
  next: { fr: "Pièce suivante", en: "Next piece" } satisfies Localized,
  openPiece: { fr: "Ouvrir la pièce", en: "Open piece" } satisfies Localized,
} as const;

/** Section — Manifeste (révélé ligne par ligne). */
export const manifesto: LocalizedLines = {
  fr: [
    "Le noir n'est pas une absence.",
    "C'est une profondeur.",
    "Chaque pièce naît d'une nuance —",
    "du plus dense au plus fumé.",
    "Ad vitam aeternam.",
  ],
  en: [
    "Black is not an absence.",
    "It is a depth.",
    "Each piece is born of a shade —",
    "from the deepest to the smokiest.",
    "Ad vitam aeternam.",
  ],
} as const;

/** Section — Nuancier interactif. Les teintes vont du plus dense au plus fumé. */
export const nuancier = {
  eyebrow: { fr: "Nuancier", en: "Shades" } satisfies Localized,
  title: { fr: "Explorez la nuance", en: "Explore the shade" } satisfies Localized,
  hint: { fr: "Glissez pour parcourir", en: "Drag to explore" } satisfies Localized,
} as const;

/**
 * Les huit nuances de noir de la marque. Les noms sont un vocabulaire de
 * marque (conservés à l'identique) ; seule la note est localisée.
 */
export const nuances = [
  { name: "Vantablack", hex: "#050506", note: { fr: "L'absolu. Un noir qui n'en renvoie rien.", en: "The absolute. A black that gives nothing back." } },
  { name: "Encre", hex: "#0E0E12", note: { fr: "La plus dense après le vide. Elle absorbe la lumière.", en: "The densest after the void. It drinks the light." } },
  { name: "Obsidienne", hex: "#15151C", note: { fr: "Un noir minéral, tranchant, presque bleu.", en: "A mineral black, sharp, almost blue." } },
  { name: "Charbon", hex: "#1F1F22", note: { fr: "La braise éteinte. Chaud sous la surface.", en: "Spent embers. Warm beneath the surface." } },
  { name: "Fumée", hex: "#2B2B2E", note: { fr: "Le noir qui commence à respirer.", en: "The black that starts to breathe." } },
  { name: "Ardoise", hex: "#3A3A40", note: { fr: "Un gris de toit sous la pluie.", en: "A rooftop grey under the rain." } },
  { name: "Smokey", hex: "#4A4A50", note: { fr: "La fumée qui se dissipe, à mi-chemin.", en: "Smoke thinning out, halfway gone." } },
  { name: "Cendre", hex: "#5B5B61", note: { fr: "Ce qui reste quand le noir s'efface.", en: "What remains when black fades away." } },
] as const;

/** Section — Capture email. */
export const newsletter = {
  title: { fr: "Rejoindre le drop", en: "Join the drop" } satisfies Localized,
  subtitle: {
    fr: "Soyez averti·e de l'ouverture. Rien d'autre.",
    en: "Be notified when it opens. Nothing else.",
  } satisfies Localized,
  placeholder: { fr: "Votre email", en: "Your email" } satisfies Localized,
  submit: { fr: "Valider", en: "Submit" } satisfies Localized,
  success: {
    fr: "C'est noté. À très bientôt.",
    en: "You're on the list. See you soon.",
  } satisfies Localized,
  errorFormat: {
    fr: "Email invalide.",
    en: "Invalid email.",
  } satisfies Localized,
  errorGeneric: {
    fr: "Une erreur est survenue. Réessayez.",
    en: "Something went wrong. Try again.",
  } satisfies Localized,
} as const;

/** Section — Footer. */
export const footer = {
  rights: {
    fr: "© 2026 Nuances de Noir",
    en: "© 2026 Nuances de Noir",
  } satisfies Localized,
} as const;

/** Les 6 pièces du drop. */
export const pieces: readonly Piece[] = [
  {
    id: "veste-zippee",
    ref: "AVA.01",
    name: {
      fr: "Veste Zippée",
      en: "Zip Jacket",
    },
    description: {
      fr: "Pièce d'entrée du drop, coupe boxy, épaules structurées.",
      en: "Opening piece of the drop, boxy cut, structured shoulders.",
    },
    materials: {
      fr: "Sergé de coton lourd. Doublure viscose. Zip métal mat.",
      en: "Heavy cotton twill. Viscose lining. Matte metal zip.",
    },
    image: "/pieces/ava-01.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: false, tall: true },
  },
  {
    id: "pantalon-cargo-large",
    ref: "AVA.02",
    name: {
      fr: "Pantalon Cargo Large",
      en: "Wide Cargo Pant",
    },
    description: {
      fr: "Jambe très ample, poches latérales dissimulées.",
      en: "Very wide leg, concealed side pockets.",
    },
    materials: {
      fr: "Toile de coton délavée. Renforts aux genoux.",
      en: "Washed cotton canvas. Reinforced knees.",
    },
    image: "/pieces/ava-02.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: true, tall: false },
  },
  {
    id: "longsleeve-ad-vitam",
    ref: "AVA.03",
    name: {
      fr: "Longsleeve Ad Vitam",
      en: "Ad Vitam Longsleeve",
    },
    description: {
      fr: "Lettrage script sur manches, coupe droite.",
      en: "Script lettering on sleeves, straight cut.",
    },
    materials: {
      fr: "Jersey de coton peigné. Impression sérigraphie.",
      en: "Combed cotton jersey. Screen-printed lettering.",
    },
    image: "/pieces/ava-03.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: false, tall: false },
  },
  {
    id: "bomber-aeternam",
    ref: "AVA.04",
    name: {
      fr: "Bomber Aeternam",
      en: "Aeternam Bomber",
    },
    description: {
      fr: "Broderie dorée dos et manches.",
      en: "Gold embroidery on back and sleeves.",
    },
    materials: {
      fr: "Nylon technique. Broderie fil doré. Bords côtelés.",
      en: "Technical nylon. Gold-thread embroidery. Ribbed trims.",
    },
    image: "/pieces/ava-04.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: true, tall: true },
  },
  {
    id: "doudoune-fur-hood",
    ref: "AVA.05",
    name: {
      fr: "Doudoune Fur Hood",
      en: "Fur Hood Puffer",
    },
    description: {
      fr: "Capuche fourrure amovible, matelassage vertical.",
      en: "Detachable fur hood, vertical quilting.",
    },
    materials: {
      fr: "Nylon rip-stop. Garnissage duvet. Fausse fourrure amovible.",
      en: "Rip-stop nylon. Down fill. Detachable faux fur.",
    },
    image: "/pieces/ava-05.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: false, tall: false },
  },
  {
    id: "tee-spikes",
    ref: "AVA.06",
    name: {
      fr: "Tee Spikes",
      en: "Spikes Tee",
    },
    description: {
      fr: "Détails métalliques épaules, jersey lourd.",
      en: "Metal detailing on shoulders, heavy jersey.",
    },
    materials: {
      fr: "Jersey lourd 240g. Pièces métalliques nickelées.",
      en: "Heavy 240g jersey. Nickel-plated metal hardware.",
    },
    image: "/pieces/ava-06.svg",
    sizes: ["S", "M", "L", "XL"],
    price: null,
    layout: { span: 1, offset: true, tall: false },
  },
] as const;
