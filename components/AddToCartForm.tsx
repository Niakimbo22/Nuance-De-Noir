"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import type { Product } from "@/lib/products";

/**
 * Bloc d'action des pièces `available` : sélecteur de taille + ajout au panier.
 * Le bouton reste désactivé tant qu'aucune taille n'est choisie. L'ajout
 * alimente le panier UI (aucune logique de commande réelle).
 */
export function AddToCartForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const { add } = useCart();
  const sizes = product.sizes ?? [];

  function handleAdd() {
    if (!size || product.price == null) return;
    console.log("[panier] ajout", { slug: product.slug, size });
    add({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      image: product.images[0] ?? "",
    });
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
                className={`h-12 w-12 rounded-[2px] text-sm uppercase tracking-wide transition-[color,background,transform] duration-200 ease-signature ${
                  selected
                    ? "bg-dore text-noir"
                    : "bg-[#1A1A1A] text-creme hover:-translate-y-0.5 hover:text-dore"
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
