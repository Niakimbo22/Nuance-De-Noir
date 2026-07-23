"use client";

import { useState, type FormEvent } from "react";
import type { Product } from "@/lib/products";

// Validation email côté client — volontairement permissive.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Bloc d'action des pièces `coming-soon` : inscription à la liste d'attente.
 * Pas de backend ici — validation locale puis état de confirmation local.
 */
export function WaitlistForm({ product }: { product: Product }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setError("Adresse email invalide.");
      return;
    }

    setError(null);

    // TODO: brancher l'API — POST /api/waitlist { email, slug: product.slug }
    // (cf. app/api/subscribe/route.ts pour le style d'endpoint existant).
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <p className="text-sm leading-relaxed tracking-wide text-creme">
        Merci. Vous serez prévenu·e dès que{" "}
        <span className="text-dore">{product.name}</span> sera disponible.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="waitlist-email"
          className="mb-3 block text-[0.7rem] uppercase tracking-xwide text-fumee"
        >
          Liste d&apos;attente
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          placeholder="votre@email.com"
          className="w-full rounded-[2px] border-b border-fumee/40 bg-transparent pb-3 text-sm tracking-wide text-creme placeholder:text-fumee/60 focus:border-creme focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-xs tracking-wide text-dore">{error}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-[2px] bg-creme px-6 py-4 text-[0.7rem] uppercase tracking-xwide text-noir transition-opacity hover:opacity-90"
      >
        Rejoindre la liste d&apos;attente
      </button>
    </form>
  );
}
