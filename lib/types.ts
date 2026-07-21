/**
 * Types stricts partagés dans toute l'application.
 */

export type Lang = "fr" | "en";

/** Chaîne localisée : une valeur par langue. */
export type Localized = Record<Lang, string>;

/** Chaîne localisée multi-lignes (ex. manifeste, descriptions). */
export type LocalizedLines = Record<Lang, readonly string[]>;

export const SIZES = ["S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export interface Piece {
  /** Identifiant technique stable (slug). */
  readonly id: string;
  /** Référence produit affichée, ex. "AVA.01". */
  readonly ref: string;
  /** Nom de la pièce, localisé. */
  readonly name: Localized;
  /** Description courte, localisée. */
  readonly description: Localized;
  /** Composition / matières, localisé. */
  readonly materials: Localized;
  /**
   * Chemin de l'image dans /public/pieces.
   * Un placeholder SVG est fourni ; pour brancher un vrai visuel,
   * remplacer le fichier au même chemin (ou mettre à jour ce champ).
   */
  readonly image: string;
  /** Tailles disponibles. */
  readonly sizes: readonly Size[];
  /**
   * Prix. Volontairement `null` pour ce drop : l'affichage
   * conditionnel est déjà écrit (voir ProductOverlay / PieceCard).
   */
  readonly price: number | null;
  /**
   * Poids visuel dans la grille asymétrique (desktop).
   * Utilisé pour moduler taille de colonne et décalage vertical.
   */
  readonly layout: {
    readonly span: 1 | 2;
    readonly offset: boolean;
    readonly tall: boolean;
  };
}
