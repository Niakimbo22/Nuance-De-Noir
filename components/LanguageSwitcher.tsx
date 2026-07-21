"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Lang } from "@/lib/types";

const OPTIONS: readonly Lang[] = ["fr", "en"];

/**
 * Sélecteur de langue discret (FR / EN).
 * `tone` adapte la couleur au fond (sombre par défaut, clair sur overlay).
 */
export function LanguageSwitcher({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "muted";
}) {
  const { lang, setLang } = useLanguage();

  const base =
    tone === "muted" ? "text-fumee/70" : "text-fumee";

  return (
    <div
      className={`flex items-center gap-2 text-[0.7rem] tracking-xwide ${className}`}
      role="group"
      aria-label="Language / Langue"
    >
      {OPTIONS.map((option, index) => {
        const active = option === lang;
        return (
          <span key={option} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-fumee/30">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setLang(option)}
              aria-pressed={active}
              className={`uppercase transition-colors duration-700 ease-signature hover:text-creme ${
                active ? "text-creme" : base
              }`}
            >
              {option}
            </button>
          </span>
        );
      })}
    </div>
  );
}
