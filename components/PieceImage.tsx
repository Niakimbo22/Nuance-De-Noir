import Image from "next/image";
import type { Piece } from "@/lib/types";
import type { Lang } from "@/lib/types";

/**
 * Visuel d'une pièce (ratio 3:4).
 * Aujourd'hui : placeholder SVG dans /public/pieces.
 * Pour brancher un vrai visuel : remplacer le fichier au même chemin
 * (ex. /public/pieces/ava-01.svg), ou mettre à jour `piece.image`.
 */
export function PieceImage({
  piece,
  lang,
  sizes,
  priority = false,
  className = "",
}: {
  piece: Piece;
  lang: Lang;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={piece.image}
      alt={piece.name[lang]}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
