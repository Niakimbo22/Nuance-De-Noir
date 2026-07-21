/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Les placeholders sont des SVG (dégradés). Autoriser leur optimisation.
    // Sûr ici : tous les SVG sont locaux et créés par nous (voir /public/pieces).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
