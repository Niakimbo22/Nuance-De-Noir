import type { ReactNode } from "react";
import { CartProvider } from "@/components/providers/CartProvider";
import { CartButton } from "@/components/CartButton";
import { CartDrawer } from "@/components/CartDrawer";

/**
 * Layout de la section /produits.
 * Fournit le panier (état UI) et monte son bouton + son tiroir, sans toucher
 * au layout global du site.
 */
export default function ProduitsLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <CartButton />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
