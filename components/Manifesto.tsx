"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { manifesto, ui } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Section 1 — Manifeste. Chaque ligne se révèle au scroll. */
export function Manifesto() {
  const { lang, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const lines = manifesto[lang];

  return (
    <section
      aria-label={t(ui.manifesto)}
      className="relative mx-auto flex min-h-screen-d max-w-6xl flex-col justify-center px-6 py-32 sm:px-10 md:py-40 3xl:max-w-7xl"
    >
      <span className="mb-12 block text-[0.62rem] uppercase tracking-xwide text-fumee md:mb-20">
        {t(ui.manifesto)}
      </span>

      <div className="space-y-3 md:space-y-5">
        {lines.map((line, i) => (
          <div key={`${lang}-${i}`} className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(1.8rem,6.5vw,5rem)] uppercase leading-[1.02] tracking-[0.01em] text-creme 3xl:text-[6rem]"
              initial={
                prefersReduced
                  ? { y: 0, opacity: 1 }
                  : { y: "110%", opacity: 0 }
              }
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: prefersReduced ? 0 : i * 0.08,
              }}
            >
              {/* Dernière ligne discrètement dorée : "Ad vitam aeternam." */}
              <span className={i === lines.length - 1 ? "text-dore" : undefined}>
                {line}
              </span>
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}
