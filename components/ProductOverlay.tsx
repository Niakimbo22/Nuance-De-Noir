"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PieceImage } from "@/components/PieceImage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { formatPrice } from "@/lib/format";
import { ui } from "@/lib/content";
import type { Piece } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Section 3 — Overlay produit plein écran. */
export function ProductOverlay({
  pieces,
  activeIndex,
  onClose,
  onNavigate,
}: {
  pieces: readonly Piece[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = activeIndex !== null;
  const piece = open ? pieces[activeIndex] : undefined;

  // Clavier : Échap ferme, flèches naviguent. Verrouille le scroll du body.
  useEffect(() => {
    if (!open || activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate(activeIndex + 1);
      else if (e.key === "ArrowLeft") onNavigate(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus sur la croix pour piéger l'attention au clavier.
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, activeIndex, onClose, onNavigate]);

  const price = piece ? formatPrice(piece.price, lang) : null;

  return (
    <AnimatePresence>
      {open && piece && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${piece.name[lang]} — ${piece.ref}`}
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          // Clic hors zone (sur le fond) = fermeture.
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative mx-auto flex h-full w-full max-w-[1600px] flex-col overflow-y-auto md:flex-row md:overflow-hidden"
            initial={
              prefersReduced
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.98 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Barre haute : langue + fermeture. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:p-6 md:p-8">
              <div className="pointer-events-auto">
                <LanguageSwitcher tone="muted" />
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t(ui.close)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center text-creme transition-colors duration-500 ease-signature hover:text-dore"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
            </div>

            {/* Visuel — grand, à gauche (empilé au-dessus sur mobile). */}
            <div className="relative aspect-[3/4] w-full shrink-0 bg-noir md:aspect-auto md:h-full md:w-1/2 lg:w-[55%]">
              <PieceImage
                key={piece.id}
                piece={piece}
                lang={lang}
                sizes="(min-width: 768px) 55vw, 100vw"
                priority
              />
            </div>

            {/* Détails — à droite. */}
            <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 md:w-1/2 md:overflow-y-auto md:py-20 lg:w-[45%] lg:px-16">
              <span className="text-[0.62rem] uppercase tracking-xwide text-fumee">
                {t(ui.reference)} — {piece.ref}
              </span>
              <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-creme">
                {piece.name[lang]}
              </h2>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-creme/80 md:text-base">
                {piece.description[lang]}
              </p>

              <dl className="mt-10 space-y-6 border-t border-white/10 pt-8 text-sm">
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-xwide text-fumee">
                    {t(ui.materials)}
                  </dt>
                  <dd className="mt-2 text-creme/80">{piece.materials[lang]}</dd>
                </div>

                <div>
                  <dt className="text-[0.62rem] uppercase tracking-xwide text-fumee">
                    {t(ui.sizes)}
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {piece.sizes.map((size) => (
                      <span
                        key={size}
                        className="flex h-10 min-w-10 items-center justify-center border border-white/15 px-3 text-xs tracking-wide text-creme/90"
                      >
                        {size}
                      </span>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className="sr-only">{t(ui.close)}</dt>
                  <dd className="text-[0.7rem] uppercase tracking-xwide text-dore">
                    {/* Affichage conditionnel : prix renseigné, sinon « à venir ». */}
                    {price ?? t(ui.priceSoon)}
                  </dd>
                </div>
              </dl>

              {/* Navigation entre pièces. */}
              <div className="mt-12 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => onNavigate(activeIndex - 1)}
                  aria-label={t(ui.prev)}
                  className="group flex items-center gap-3 text-[0.62rem] uppercase tracking-xwide text-fumee transition-colors duration-500 ease-signature hover:text-creme"
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    ←
                  </span>
                  {t(ui.prev)}
                </button>
                <span aria-hidden="true" className="h-4 w-px bg-white/15" />
                <button
                  type="button"
                  onClick={() => onNavigate(activeIndex + 1)}
                  aria-label={t(ui.next)}
                  className="group flex items-center gap-3 text-[0.62rem] uppercase tracking-xwide text-fumee transition-colors duration-500 ease-signature hover:text-creme"
                >
                  {t(ui.next)}
                  <span aria-hidden="true" className="text-lg leading-none">
                    →
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
