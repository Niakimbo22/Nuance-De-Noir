"use client";

import { useCallback, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PieceCard } from "@/components/PieceCard";
import { ProductOverlay } from "@/components/ProductOverlay";
import { pieces, ui } from "@/lib/content";
import type { Piece } from "@/lib/types";

// Rythme de la grille asymétrique (par pièce) : ratio + décalage vertical.
// L'ordre suit lib/content > pieces. Les colonnes CSS créent la mosaïque ;
// ces classes ajoutent hauteurs variables et offsets — « pas une grille régulière ».
const LAYOUT: readonly { aspect: string; offset: string }[] = [
  { aspect: "aspect-[3/4.5]", offset: "" }, // AVA.01 — grande
  { aspect: "aspect-[3/4]", offset: "xl:mt-24" }, // AVA.02 — décalée
  { aspect: "aspect-[3/4]", offset: "" }, // AVA.03
  { aspect: "aspect-[3/4.5]", offset: "md:mt-12 xl:mt-16" }, // AVA.04 — grande, décalée
  { aspect: "aspect-[3/3.7]", offset: "" }, // AVA.05 — plus courte
  { aspect: "aspect-[3/4]", offset: "xl:mt-20" }, // AVA.06 — décalée
];

const CARD_SIZES =
  "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw";

/** Section 2 — Collection. Grille asymétrique + overlay produit. */
export function Collection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openPiece = useCallback((piece: Piece) => {
    const idx = pieces.findIndex((p) => p.id === piece.id);
    if (idx >= 0) setActiveIndex(idx);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback((next: number) => {
    const total = pieces.length;
    setActiveIndex(((next % total) + total) % total);
  }, []);

  return (
    <section
      id="collection"
      aria-label={t(ui.collection)}
      className="relative mx-auto max-w-[1600px] px-6 py-28 sm:px-10 md:py-40 3xl:max-w-[1800px]"
    >
      <header className="mb-16 flex items-end justify-between md:mb-24">
        <h2 className="font-display text-[clamp(2rem,7vw,5.5rem)] uppercase leading-none tracking-[0.01em] text-creme">
          {t(ui.collection)}
        </h2>
        <span className="mb-2 text-[0.62rem] uppercase tracking-xwide text-fumee">
          2026 — 06
        </span>
      </header>

      {/* Colonnes CSS (mosaïque) : 1 → 2 → 3 selon le breakpoint. */}
      <div className="[column-gap:1.5rem] md:[column-gap:2rem] xl:[column-gap:2.5rem] columns-1 md:columns-2 xl:columns-3">
        {pieces.map((piece, i) => {
          const layout = LAYOUT[i] ?? { aspect: "aspect-[3/4]", offset: "" };
          return (
            <div
              key={piece.id}
              className={`mb-6 break-inside-avoid md:mb-10 xl:mb-14 ${layout.offset}`}
            >
              <PieceCard
                piece={piece}
                index={i}
                sizes={CARD_SIZES}
                aspectClass={layout.aspect}
                onOpen={openPiece}
              />
            </div>
          );
        })}
      </div>

      <ProductOverlay
        pieces={pieces}
        activeIndex={activeIndex}
        onClose={close}
        onNavigate={goTo}
      />
    </section>
  );
}
