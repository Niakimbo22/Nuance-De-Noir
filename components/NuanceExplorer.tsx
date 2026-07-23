"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { nuancier, nuances } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section 2 bis — Nuancier interactif.
 * L'utilisateur glisse le doigt (ou la souris) sur la bande des huit teintes :
 * la scène se teinte en direct, le nom / le code / la note se mettent à jour.
 * Tactile, clavier (flèches) et clic pris en charge.
 */
export function NuanceExplorer() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [index, setIndex] = useState(0);
  // Repli sur la première nuance : index toujours borné, rassure aussi TS.
  const active = nuances[index] ?? nuances[0];

  // Sélectionne la nuance sous le pointeur (scrub tactile / souris).
  const pickAt = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const frac = (clientX - r.left) / r.width;
    const i = Math.max(0, Math.min(nuances.length - 1, Math.floor(frac * nuances.length)));
    setIndex((prev) => (prev === i ? prev : i));
  };

  return (
    <section
      aria-label={t(nuancier.title)}
      className="relative mx-auto max-w-5xl px-6 py-28 sm:px-10 md:py-40"
    >
      <Reveal>
        <span className="block text-[0.62rem] uppercase tracking-xwide text-fumee">
          {t(nuancier.eyebrow)}
        </span>
        <h2 className="mt-4 font-display text-[clamp(1.8rem,6vw,4rem)] uppercase leading-[1.02] tracking-[0.01em] text-creme">
          {t(nuancier.title)}
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        {/* Scène : se teinte de la nuance active. */}
        <motion.div
          className="relative mt-12 flex h-64 flex-col justify-between overflow-hidden border border-white/10 p-6 sm:h-80 sm:p-8"
          animate={{ backgroundColor: active.hex }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Reflet discret pour matérialiser la teinte. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 25% 0%, rgba(255,255,255,0.05), transparent 55%)",
            }}
          />
          <span className="relative font-display text-sm text-dore">
            {String(index + 1).padStart(2, "0")} / {String(nuances.length).padStart(2, "0")}
          </span>

          <div className="relative min-h-[6.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="font-display text-[clamp(1.8rem,7vw,3.5rem)] uppercase leading-none tracking-wide text-creme">
                  {active.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-4">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-creme/70">
                    {active.hex}
                  </span>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-creme/70">
                  {t(active.note)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Reveal>

      <Reveal delay={0.2}>
        {/* Bande interactive : scrub tactile + clic + clavier. */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label={t(nuancier.title)}
          aria-valuemin={1}
          aria-valuemax={nuances.length}
          aria-valuenow={index + 1}
          aria-valuetext={active.name}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            pickAt(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) pickAt(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((i) => Math.min(nuances.length - 1, i + 1));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((i) => Math.max(0, i - 1));
            }
          }}
          className="mt-6 flex h-16 cursor-ew-resize touch-none select-none overflow-hidden border border-white/10"
        >
          {nuances.map((n, i) => (
            <button
              key={n.name}
              type="button"
              tabIndex={-1}
              aria-label={n.name}
              onClick={() => setIndex(i)}
              style={{ backgroundColor: n.hex }}
              className="relative flex-1"
            >
              {i === index && (
                <motion.span
                  layoutId={prefersReduced ? undefined : "nuance-active"}
                  className="absolute inset-0 border-2 border-dore"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
        <span className="mt-4 block text-[0.6rem] uppercase tracking-xwide text-fumee">
          ↔ {t(nuancier.hint)}
        </span>
      </Reveal>
    </section>
  );
}
