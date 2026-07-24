"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ndn.cart";

export interface CartLine {
  id: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: Omit<CartLine, "id">) => void;
  remove: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Panier — état UI local uniquement (aucun backend).
 * Persisté en localStorage pour survivre à une navigation entre fiches.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setLines(JSON.parse(stored) as CartLine[]);
    } catch {
      // stockage indisponible ou données corrompues : on repart d'un panier vide.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, "id">) => {
    setLines((prev) => [
      ...prev,
      { ...line, id: `${line.slug}-${line.size}-${Date.now()}` },
    ]);
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.length,
      total: lines.reduce((sum, line) => sum + line.price, 0),
      open,
      setOpen,
      add,
      remove,
    }),
    [lines, open, add, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart doit être utilisé dans <CartProvider>");
  }
  return ctx;
}
