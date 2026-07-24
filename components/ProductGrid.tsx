"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductStatus } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

type Filter = "all" | ProductStatus;

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "available", label: "Disponible" },
  { id: "coming-soon", label: "Bientôt" },
];

/**
 * Grille catalogue filtrable.
 * Les onglets partagent un soulignement doré animé (layoutId) et la grille
 * se recompose en douceur lors du changement de filtre (layout + popLayout).
 */
export function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? products : products.filter((p) => p.status === filter);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-7 md:mb-16">
        {TABS.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              aria-pressed={active}
              className={`relative pb-1.5 text-[0.64rem] uppercase tracking-xwide transition-colors ${
                active ? "text-creme" : "text-fumee hover:text-creme"
              }`}
            >
              {tab.label}
              {active && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-dore"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
