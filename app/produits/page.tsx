import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Produits",
  description:
    "Le catalogue Nuances de Noir — Ad Vitam Æternam 2026, First Drop. Du plus dense au plus fumé.",
};

export default function ProduitsPage() {
  return (
    <main className="min-h-screen bg-noir px-6 py-24 sm:px-10 lg:px-16">
      <header className="mb-16 md:mb-24">
        <h1 className="font-display text-4xl uppercase tracking-wide text-creme sm:text-5xl">
          Produits
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed tracking-wide text-fumee">
          Ad Vitam Æternam 2026 — First Drop.
        </p>
      </header>

      {/* Grille : 1 col mobile, 2 tablette, 3 desktop. Sans bordure ni ombre. */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
