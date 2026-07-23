"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/products";

const EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const GRID_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Carte d'une pièce dans la grille catalogue.
 * Au survol : l'image monte légèrement (translateY -4px, 300ms ease-out).
 * Pas de bordure ni d'ombre.
 */
export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link href={`/produits/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A]"
      >
        {cover && (
          <ProductImage src={cover} alt={product.name} sizes={GRID_SIZES} />
        )}
      </motion.div>

      <div className="mt-5 space-y-1.5">
        <h2 className="font-display text-lg uppercase leading-none tracking-wide text-creme sm:text-xl">
          {product.name}
        </h2>

        {product.status === "available" && product.price != null ? (
          <span className="block text-sm tracking-wide text-creme">
            {EURO.format(product.price)}
          </span>
        ) : (
          <span className="block text-[0.7rem] uppercase tracking-xwide text-fumee">
            Coming Soon
          </span>
        )}
      </div>
    </Link>
  );
}
