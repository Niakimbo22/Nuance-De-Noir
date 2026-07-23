import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { FilmGrain } from "@/components/FilmGrain";
import { ScrollProgress } from "@/components/ScrollProgress";

// Display — sans-serif condensée, réservée aux titres uppercase.
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Corps de texte.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://nuances-de-noir.vercel.app";
const DESCRIPTION =
  "Nuances de Noir — First Drop : Vantablack / Smokey, 2026. Minimalisme sombre, pièces nées d'une nuance, du plus dense au plus fumé.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nuances de Noir — First Drop 2026",
    template: "%s — Nuances de Noir",
  },
  description: DESCRIPTION,
  keywords: [
    "Nuances de Noir",
    "streetwear",
    "drop 2026",
    "Vantablack",
    "Smokey",
    "mode",
    "minimalisme sombre",
  ],
  authors: [{ name: "Nuances de Noir" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_GB",
    url: SITE_URL,
    siteName: "Nuances de Noir",
    title: "Nuances de Noir — First Drop 2026",
    description: DESCRIPTION,
    images: [
      {
        url: "/brand/og.svg",
        width: 1200,
        height: 630,
        alt: "Nuances de Noir — First Drop 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuances de Noir — First Drop 2026",
    description: DESCRIPTION,
    images: ["/brand/og.svg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="bg-noir font-body text-creme antialiased">
        <LanguageProvider>
          <ScrollProgress />
          {children}
          <FilmGrain />
        </LanguageProvider>
      </body>
    </html>
  );
}
