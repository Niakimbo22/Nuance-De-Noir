"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Bouton panier fixe (haut droite) avec badge compteur animé. */
export function CartButton() {
  const { count, setOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Ouvrir le panier (${count})`}
      className="fixed right-5 top-5 z-30 inline-flex items-center gap-2.5 rounded-[2px] bg-noir/60 px-3.5 py-2.5 text-[0.62rem] uppercase tracking-xwide text-creme backdrop-blur-md transition-colors hover:text-dore sm:right-8 sm:top-8"
    >
      Panier
      <span className="relative inline-grid h-[18px] min-w-[18px] place-items-center px-1">
        <AnimatePresence mode="popLayout">
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 grid place-items-center rounded-[2px] bg-dore text-[0.6rem] tracking-normal text-noir"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
