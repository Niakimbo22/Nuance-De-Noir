"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Visuel produit (ratio 3:4 côté conteneur).
 *
 * Les fichiers de /public/products/ n'existent pas encore. Tant qu'un
 * visuel est absent, on affiche un placeholder gris (#1A1A1A) portant le
 * nom du fichier attendu — pour voir d'un coup d'œil ce qu'il reste à fournir.
 * Pour brancher un vrai visuel : déposer le fichier au chemin indiqué.
 */
export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Nom de fichier attendu, relatif à /public/products.
  const expected = src.replace(/^\/products\//, "");

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]">
        <span className="px-6 text-center text-[0.62rem] uppercase tracking-xwide text-fumee">
          {expected}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
