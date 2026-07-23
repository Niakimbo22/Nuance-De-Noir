export type ProductStatus = 'available' | 'coming-soon';

export interface Product {
  slug: string;
  name: string;
  status: ProductStatus;
  price?: number;           // en euros, uniquement si available
  sizes?: string[];         // uniquement si available
  materials: string[];
  description: string;
  images: string[];         // chemins /public/products/...
  drop?: string;
}

export const products: Product[] = [
  {
    slug: 'vantablack-leather-jacket',
    name: 'Vantablack Leather Jacket',
    status: 'available',
    price: 210,
    sizes: ['S', 'M', 'L'],
    materials: [
      'Genuine Leather',
      'Broderie filée',
      'Plaque arrière acier inoxydable gravé',
    ],
    description:
      "Zip pleine longueur, col chemise. Deux poches passepoilées. Monogramme AVA brodé poitrine. Plaque acier gravée au dos.",
    images: [
      '/products/vantablack-leather-jacket/01.jpg',
      '/products/vantablack-leather-jacket/02.jpg',
    ],
    drop: 'Ad Vitam Aeternam 2026 — First Drop',
  },
  {
    slug: 'the-smokey-one',
    name: 'The Smokey One',
    status: 'available',
    price: 150,
    sizes: ['S', 'M', 'L'],
    materials: [
      'Wool RWS',
      'Plissé',
      'Ceinture Croco Leather',
      'Bas évasé Croco Leather',
    ],
    description:
      "Pantalon large plissé en laine RWS. Ceinture croco leather signée AVÆ. Empiècements croco leather sur les bas évasés.",
    images: [
      '/products/the-smokey-one/01.jpg',
      '/products/the-smokey-one/02.jpg',
      '/products/the-smokey-one/03.jpg',
    ],
    drop: 'Ad Vitam Aeternam 2026 — First Drop',
  },
  {
    slug: 'fur-puffer',
    name: 'Fur Puffer',
    status: 'coming-soon',
    materials: [
      'Duvet plume',
      'Fourrure synthétique',
      'Doublure soie',
    ],
    description:
      "Doudoune bleu marine, col fourrure synthétique. Monogramme AE poitrine. Poignets et bas côtelés.",
    images: [
      '/products/fur-puffer/01.jpg',
      '/products/fur-puffer/02.jpg',
    ],
  },
  {
    slug: 'longsleeve-honey',
    name: 'Longsleeve Honey',
    status: 'coming-soon',
    materials: ['Coton épais 230 GSM'],
    description:
      "Manches longues noir, surpiqûres or. Calligraphie dorée sur les épaules et les manches. Col montant.",
    images: [
      '/products/longsleeve-honey/01.jpg',
      '/products/longsleeve-honey/02.jpg',
    ],
  },
  {
    slug: 'longsleeve-who-you-are',
    name: "They Don't Want You To Be Who You Are",
    status: 'coming-soon',
    materials: ['Coton épais 230 GSM'],
    description:
      "Manches noires, corps gris. Lettrage calligraphié blanc sur toute la longueur des manches.",
    images: [
      '/products/longsleeve-who-you-are/01.jpg',
      '/products/longsleeve-who-you-are/02.jpg',
    ],
  },
  {
    slug: 'bomber-avae',
    name: 'Bomber AVÆ',
    status: 'coming-soon',
    materials: ['Matière M4A1', 'Dos cuir blanc'],
    description:
      "Coupe cropped volumineuse. Zip contrasté or. Col pointe, poches poitrine. Dos cuir blanc, lettrage Ad Vitam Æternam.",
    images: [
      '/products/bomber-avae/01.jpg',
      '/products/bomber-avae/02.jpg',
    ],
  },
  {
    slug: 'racing-leather-jacket',
    name: 'Racing Leather Jacket',
    status: 'coming-soon',
    materials: ['Genuine Leather', 'Broderie filée'],
    description:
      "Bicolore noir et blanc. Ad Vitam Æternam brodé sur les épaules, Till The End en poitrine. Monogramme AE au dos.",
    images: [
      '/products/racing-leather-jacket/01.jpg',
      '/products/racing-leather-jacket/02.jpg',
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
