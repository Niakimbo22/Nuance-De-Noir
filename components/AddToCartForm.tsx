"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

/**
 * Bloc d'action des pièces `available` : sélecteur de taille + ajout au panier.
 * Aucune logique panier pour l'instant — le bouton est désactivé tant qu'aucune
 * taille n'est choisie, et l'ajout se contente d'un console.log.
 */
export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const sizes = product.sizes ?? [];

  function handleAdd() {
    if (!size) return;
    // TODO: brancher la logique panier réelle.
    console.log("[panier] ajout", { slug: product.slug, size });
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="mb-3 block text-[0.7rem] uppercase tracking-xwide text-fumee">
          Taille
        </span>
        <div className="flex gap-3">
          {sizes.map((option) => {
            const selected = option === size;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setSize(option)}
                className={`h-12 w-12 rounded-[2px] text-sm uppercase tracking-wide transition-colors ${
                  selected
                    ? "bg-dore text-noir"
                    : "bg-[#1A1A1A] text-creme hover:text-dore"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!size}
        onClick={handleAdd}
        className="w-full rounded-[2px] bg-creme px-6 py-4 text-[0.7rem] uppercase tracking-xwide text-noir transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
