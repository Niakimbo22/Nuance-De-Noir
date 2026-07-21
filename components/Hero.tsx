"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { brand, ui } from "@/lib/content";

const SESSION_KEY = "ndn.intro.played";
const EASE = [0.16, 1, 0.3, 1] as const;

// Rythme de la séquence (secondes).
const LINE_DURATION = 1.2;
const LETTER_STAGGER = 0.04; // 40 ms de décalage par lettre
const LETTER_DURATION = 0.7;
const NAME_START = LINE_DURATION;
const TAGLINE_DELAY = 2.4;
const SCROLL_DELAY = 3.0;

const NAME = brand.name; // "NUANCES DE NOIR"

/** Séquence d'entrée + hero au repos. */
export function Hero() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  // `playing` : la séquence animée est en cours.
  // `finished` : hero au repos (intro terminée ou passée).
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(true);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Décide, au montage, si l'on joue l'intro (une fois par session).
  useEffect(() => {
    if (prefersReduced) {
      setPlaying(false);
      setFinished(true);
      return;
    }
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY);
    if (alreadyPlayed) {
      setPlaying(false);
      setFinished(true);
    } else {
      setPlaying(true);
      setFinished(false);
    }
  }, [prefersReduced]);

  const endIntro = useCallback(() => {
    setPlaying(false);
    setFinished(true);
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  // Fin naturelle de la séquence.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(endIntro, (SCROLL_DELAY + 0.4) * 1000);
    return () => window.clearTimeout(id);
  }, [playing, endIntro]);

  // Skip : au scroll ou au clic — l'utilisateur n'est jamais bloqué.
  useEffect(() => {
    if (!playing) return;
    const skip = () => endIntro();
    window.addEventListener("wheel", skip, { passive: true, once: true });
    window.addEventListener("touchmove", skip, { passive: true, once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [playing, endIntro]);

  // Gradient radial qui suit la souris (desktop, throttlé rAF).
  useEffect(() => {
    if (prefersReduced) return;
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        el.style.setProperty("--pointer-x", `${x}%`);
        el.style.setProperty("--pointer-y", `${y}%`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced]);

  const showLine = playing; // la ligne n'existe que pendant l'intro
  const letters = NAME.split("");

  return (
    <section
      aria-label={brand.name}
      className="relative flex h-screen-d w-full items-center justify-center overflow-hidden bg-noir"
    >
      {/* Fond : gradient radial imperceptible suivant la souris. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-glow absolute inset-0 transition-opacity duration-1000 ease-signature"
      />

      {/* Ligne fine horizontale : apparaît, s'étend, puis s'estompe. */}
      <AnimatePresence>
        {showLine && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-creme/70"
            initial={{ width: 0, opacity: 0.9 }}
            animate={{
              width: ["0%", "100%", "100%"],
              opacity: [0.9, 0.9, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              width: { duration: LINE_DURATION, ease: EASE },
              opacity: {
                duration: 0.8,
                ease: EASE,
                times: [0, 0.55, 1],
                delay: LINE_DURATION * 0.6,
              },
            }}
          />
        )}
      </AnimatePresence>

      {/* Bloc central : nom + tagline. */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          className="font-display uppercase leading-[0.95] text-creme"
          aria-label={brand.name}
        >
          <span
            aria-hidden={playing ? "true" : undefined}
            className="flex flex-wrap items-center justify-center gap-x-[0.18em] text-[clamp(2.6rem,11vw,11rem)] tracking-[0.02em] 3xl:text-[13rem]"
          >
            {playing
              ? letters.map((char, i) =>
                  char === " " ? (
                    <span key={i} className="inline-block w-[0.28em]" />
                  ) : (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ clipPath: "inset(50% 0 50% 0)", y: 8 }}
                      animate={{ clipPath: "inset(0% 0 0% 0)", y: 0 }}
                      transition={{
                        duration: LETTER_DURATION,
                        ease: EASE,
                        delay: NAME_START + i * LETTER_STAGGER,
                      }}
                    >
                      {char}
                    </motion.span>
                  ),
                )
              : NAME}
          </span>
        </h1>

        {/* Tagline — fade-in retardé. */}
        <motion.p
          className="mt-6 text-[0.62rem] uppercase tracking-xwide text-fumee sm:mt-8 sm:text-[0.7rem] md:text-xs"
          initial={
            prefersReduced || finished
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 6 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: EASE,
            delay: playing ? TAGLINE_DELAY : 0,
          }}
        >
          {brand.drop}
        </motion.p>
      </div>

      {/* Indicateur de scroll minimal — apparaît une fois l'intro finie. */}
      <ScrollIndicator
        label={t(ui.scroll)}
        delay={playing ? SCROLL_DELAY : 0.2}
        visible={finished || !playing}
      />

      {/* Bouton skip discret, uniquement pendant l'intro. */}
      <AnimatePresence>
        {playing && (
          <motion.button
            type="button"
            onClick={endIntro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 right-6 z-20 text-[0.62rem] uppercase tracking-xwide text-fumee/70 transition-colors duration-700 ease-signature hover:text-creme sm:right-10"
          >
            {t(ui.skip)}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

const indicatorVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

function ScrollIndicator({
  label,
  delay,
  visible,
}: {
  label: string;
  delay: number;
  visible: boolean;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      variants={indicatorVariants}
      initial="hidden"
      animate={visible ? "shown" : "hidden"}
      transition={{ delay, duration: 1, ease: EASE }}
    >
      <span className="text-[0.6rem] uppercase tracking-xwide text-fumee">
        {label}
      </span>
      <motion.span
        className="block h-10 w-px bg-gradient-to-b from-fumee/70 to-transparent"
        animate={
          prefersReduced
            ? undefined
            : { scaleY: [0.3, 1, 0.3], transformOrigin: "top" }
        }
        transition={{
          duration: 2.4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
