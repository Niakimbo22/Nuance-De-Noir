import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartForm } from "@/components/AddToCartForm";
import { WaitlistForm } from "@/components/WaitlistForm";

const EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-noir px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Colonne images — carrousel, sticky sur desktop. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Colonne infos. */}
        <div className="max-w-md">
          <h1 className="font-display text-3xl uppercase leading-none tracking-wide text-creme sm:text-4xl">
            {product.name}
          </h1>

          {product.drop && (
            <p className="mt-4 text-[0.7rem] uppercase tracking-xwide text-fumee">
              {product.drop}
            </p>
          )}

          {product.status === "available" && product.price != null && (
            <p className="mt-6 text-lg tracking-wide text-creme">
              {EURO.format(product.price)}
            </p>
          )}

          <p className="mt-8 text-sm leading-relaxed tracking-wide text-creme/80">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="mb-3 text-[0.7rem] uppercase tracking-xwide text-fumee">
              Matières
            </h2>
            <ul className="space-y-1.5">
              {product.materials.map((material) => (
                <li
                  key={material}
                  className="text-sm leading-relaxed tracking-wide text-creme/80"
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            {product.status === "available" ? (
              <AddToCartForm product={product} />
            ) : (
              <WaitlistForm product={product} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
