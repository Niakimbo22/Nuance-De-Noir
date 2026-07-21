// Génère les placeholders SVG élégants (dégradés noir/anthracite, ratio 3:4).
// Lancé une fois pour peupler /public. Remplacer les fichiers par de vrais
// visuels suffit — mêmes chemins, voir lib/content.ts.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const pieces = [
  { file: "ava-01.svg", ref: "AVA.01", a: "#141414", b: "#080808", tilt: 115 },
  { file: "ava-02.svg", ref: "AVA.02", a: "#101010", b: "#060606", tilt: 160 },
  { file: "ava-03.svg", ref: "AVA.03", a: "#181818", b: "#0a0a0a", tilt: 135 },
  { file: "ava-04.svg", ref: "AVA.04", a: "#1c1c1c", b: "#0b0b0b", tilt: 100 },
  { file: "ava-05.svg", ref: "AVA.05", a: "#121212", b: "#070707", tilt: 145 },
  { file: "ava-06.svg", ref: "AVA.06", a: "#161616", b: "#090909", tilt: 120 },
];

const W = 900;
const H = 1200;

function pieceSvg({ ref, a, b, tilt }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Nuances de Noir — ${ref}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${tilt} 0.5 0.5)">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="55%" stop-color="${b}"/>
      <stop offset="100%" stop-color="#040404"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#2a2a2a" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="#0a0a0a" stop-opacity="0"/>
    </radialGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect width="${W}" height="${H}" filter="url(#n)" opacity="0.05"/>
  <text x="50%" y="50%" fill="#F0EDE8" fill-opacity="0.16" font-family="Arial, sans-serif" font-size="34" letter-spacing="14" text-anchor="middle" dominant-baseline="middle" font-weight="700">NUANCES DE NOIR</text>
  <text x="50%" y="${H - 56}" fill="#7A7A7A" fill-opacity="0.6" font-family="Arial, sans-serif" font-size="20" letter-spacing="10" text-anchor="middle">${ref}</text>
</svg>
`;
}

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200" role="img" aria-label="Nuances de Noir">
  <rect width="600" height="200" fill="#0A0A0A"/>
  <text x="50%" y="52%" fill="#F0EDE8" font-family="Arial, sans-serif" font-size="46" letter-spacing="8" text-anchor="middle" dominant-baseline="middle" font-weight="800">NUANCES DE NOIR</text>
</svg>
`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Nuances de Noir — First Drop 2026">
  <defs>
    <radialGradient id="og" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#1c1c1c"/>
      <stop offset="70%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#040404"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <line x1="360" y1="300" x2="840" y2="300" stroke="#F0EDE8" stroke-opacity="0.4" stroke-width="1"/>
  <text x="50%" y="47%" fill="#F0EDE8" font-family="Arial, sans-serif" font-size="72" letter-spacing="10" text-anchor="middle" dominant-baseline="middle" font-weight="800">NUANCES DE NOIR</text>
  <text x="50%" y="60%" fill="#7A7A7A" font-family="Arial, sans-serif" font-size="20" letter-spacing="12" text-anchor="middle">FIRST DROP — VANTABLACK / SMOKEY — 2026</text>
</svg>
`;

mkdirSync(resolve(root, "public/pieces"), { recursive: true });
mkdirSync(resolve(root, "public/brand"), { recursive: true });

for (const p of pieces) {
  writeFileSync(resolve(root, "public/pieces", p.file), pieceSvg(p));
}
writeFileSync(resolve(root, "public/brand/logo.svg"), logoSvg);
writeFileSync(resolve(root, "public/brand/og.svg"), ogSvg);

console.log("Placeholders générés dans /public/pieces et /public/brand.");
