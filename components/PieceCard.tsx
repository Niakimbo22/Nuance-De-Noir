"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PieceImage } from "@/components/PieceImage";
import { formatPrice } from "@/lib/format";
import { ui } from "@/lib/content";
import type { Piece } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Carte d'une pièce dans la grille.
 * Au survol : l'image passe de désaturée à couleur, le nom monte depuis le bas.
 * Au clic : ouvre l'overlay produit.
 */
export function PieceCard({
  piece,
  index,
  sizes,
  onOpen,
  aspectClass = "aspect-[3/4]",
  className = "",
}: {
  piece: Piece;
  index: number;
  sizes: string;
  onOpen: (piece: Piece) => void;
  /** Ratio de la cellule — permet des hauteurs variables dans la grille. */
  aspectClass?: string;
  /** Classes de décalage vertical (offset) propres à la grille asymétrique. */
  className?: string;
}) {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const price = formatPrice(piece.price, lang);

  return (
    <motion.article
      initial={
        prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.08 }}
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
      className={`group relative ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen(piece)}
        aria-label={`${t(ui.openPiece)} — ${piece.name[lang]} (${piece.ref})`}
        className="block w-full text-left"
      >
        <div className={`relative ${aspectClass} w-full overflow-hidden bg-noir`}>
          <div className="desat group-hover:desat-none group-focus-visible:desat-none absolute inset-0 transition-[filter] duration-1000 ease-signature">
            <PieceImage
              piece={piece}
              lang={lang}
              sizes={sizes}
              className="scale-[1.02] transition-transform duration-1000 ease-signature group-hover:scale-[1.06]"
            />
          </div>

          {/* Voile sombre qui s'allège au survol. */}
          <div className="pointer-events-none absolute inset-0 bg-noir/40 transition-opacity duration-1000 ease-signature group-hover:opacity-0" />

          {/* Référence, coin haut. */}
          <span className="absolute left-4 top-4 z-10 text-[0.62rem] uppercase tracking-xwide text-creme/60">
            {piece.ref}
          </span>

          {/* Nom qui monte depuis le bas au survol. */}
          <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden p-4 sm:p-5">
            <div
              className={
                prefersReduced
                  ? ""
                  : "translate-y-[130%] transition-transform duration-700 ease-signature group-hover:translate-y-0 group-focus-visible:translate-y-0"
              }
            >
              <h3 className="font-display text-xl uppercase leading-none tracking-wide text-creme sm:text-2xl md:text-3xl">
                {piece.name[lang]}
              </h3>
              {/* Affichage conditionnel du prix (null pour ce drop). */}
              {price && (
                <span className="mt-1 block text-xs tracking-wide text-fumee">
                  {price}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
