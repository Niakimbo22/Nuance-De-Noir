"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Fil de progression fixé en haut de page, dans le doré de la marque.
 * Invisible sur le hero (pour préserver la pureté de l'intro), il apparaît
 * dès les premiers défilements. `scaleX` suit l'avancée dans la page.
 */
export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Lissage par ressort — désactivé en mouvement réduit.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = prefersReduced ? scrollYProgress : smooth;

  // Fondu d'apparition juste après le hero.
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.06], [0, 0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, opacity }}
      className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-dore"
    />
  );
}
