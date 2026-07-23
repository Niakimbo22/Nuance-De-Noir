"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Enveloppe une portion de contenu et la révèle au scroll : léger fondu +
 * montée. Une seule fois par élément. Respecte `prefers-reduced-motion`.
 * Reprend l'easing signature de la marque, cohérent avec Manifesto / Collection.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Décalage (secondes) — utile pour orchestrer un léger stagger manuel. */
  delay?: number;
  /** Amplitude de la montée initiale (px). */
  y?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.9,
        ease: EASE,
        delay: prefersReduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
