"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { brand, footer } from "@/lib/content";

/** Section 5 — Footer minimal. */
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/10 px-6 py-14 sm:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="font-display text-2xl uppercase leading-none tracking-wide text-creme md:text-3xl">
          {brand.name}
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-col gap-4 text-[0.7rem] uppercase tracking-xwide text-fumee sm:flex-row sm:items-center sm:gap-8"
        >
          <a
            href={brand.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-500 ease-signature hover:text-creme"
          >
            {brand.instagram.handle}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="transition-colors duration-500 ease-signature hover:text-creme"
          >
            {brand.email}
          </a>
          <LanguageSwitcher />
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-[1600px] text-[0.62rem] uppercase tracking-xwide text-fumee/60">
        {t(footer.rights)}
      </div>
    </footer>
  );
}
