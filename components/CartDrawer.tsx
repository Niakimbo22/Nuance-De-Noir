"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Tiroir panier latéral (droite) + voile. Aucune logique de paiement réelle. */
export function CartDrawer() {
  const { open, setOpen, lines, remove, total } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-label="Panier"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(400px,88vw)] flex-col border-l border-white/10 bg-[#0C0C0C] p-6 sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <h2 className="font-display text-base uppercase tracking-[0.14em] text-creme">
                Panier
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[0.62rem] uppercase tracking-xwide text-fumee transition-colors hover:text-creme"
              >
                Fermer
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="text-sm tracking-wide text-fumee">
                Votre panier est vide.
              </p>
            ) : (
              <ul className="flex flex-1 flex-col gap-5 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {lines.map((line) => (
                    <motion.li
                      key={line.id}
                      layout
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-start gap-4"
                    >
                      <div className="h-[72px] w-[54px] flex-none rounded-[2px] bg-[#1A1A1A]" />
                      <div className="flex-1">
                        <p className="text-[0.78rem] uppercase tracking-wide text-creme">
                          {line.name}
                        </p>
                        <p className="mt-1.5 text-[0.68rem] text-fumee">
                          Taille {line.size} · {EURO.format(line.price)}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-fumee transition-colors hover:text-dore"
                        >
                          Retirer
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {lines.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex justify-between text-[0.72rem] uppercase tracking-xwide text-creme">
                  <span>Total</span>
                  <span className="tabular-nums">{EURO.format(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // TODO app réelle : brancher le tunnel de paiement.
                    console.log("[panier] passer commande", lines);
                  }}
                  className="mt-5 w-full rounded-[2px] bg-creme px-6 py-4 text-[0.62rem] uppercase tracking-xwide text-noir transition-opacity hover:opacity-90"
                >
                  Passer commande
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
