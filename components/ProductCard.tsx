import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/products";

const EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const GRID_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Carte d'une pièce dans la grille catalogue.
 * Au survol : l'image monte légèrement (-4px), le second visuel se fond
 * par-dessus le premier et un voile « Voir la pièce » se dévoile.
 * Pas de bordure ni d'ombre.
 */
export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];
  const hover = product.images[1] ?? cover;

  return (
    <Link href={`/produits/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A] transition-transform duration-500 ease-signature group-hover:-translate-y-1">
        {cover && <ProductImage src={cover} alt={product.name} sizes={GRID_SIZES} />}

        {/* Second visuel — révélé au survol. */}
        {hover && hover !== cover && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-signature group-hover:opacity-100">
            <ProductImage src={hover} alt="" sizes={GRID_SIZES} />
          </div>
        )}

        {/* Voile + invitation. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-noir/30 pb-6 opacity-0 transition-opacity duration-500 ease-signature group-hover:opacity-100">
          <span className="translate-y-2 text-[0.58rem] uppercase tracking-xwide text-creme transition-transform duration-500 ease-signature group-hover:translate-y-0">
            Voir la pièce
          </span>
        </div>
      </div>

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
