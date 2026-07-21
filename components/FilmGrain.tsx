"use client";

/**
 * Grain de film léger, overlay global.
 * Rendu via CSS (`.film-grain`), masqué si prefers-reduced-motion.
 */
export function FilmGrain() {
  return <div className="film-grain" aria-hidden="true" />;
}
