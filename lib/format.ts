import type { Lang } from "@/lib/types";

/**
 * Affichage conditionnel du prix.
 * Le prix est `null` pour ce drop : la fonction est déjà prête
 * pour le jour où un montant sera renseigné.
 */
export function formatPrice(price: number | null, lang: Lang): string | null {
  if (price === null) return null;
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
