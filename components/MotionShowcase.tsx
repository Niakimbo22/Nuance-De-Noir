"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

// Easing signature de la marque (cf. tailwind.config.ts).
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Démonstration des capacités de Framer Motion, déclinée dans la
 * direction artistique de Nuances de Noir. Chaque bloc isole une
 * fonctionnalité clé de la librairie.
 */
export function MotionShowcase() {
  // Barre de progression liée au scroll de la page entière.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative">
      {/* 1. Scroll-linked : barre de progression fixée en haut. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-dore"
      />

      <Intro />

      <Section
        index="01"
        title="Entrée & stagger"
        caption="initial / animate / staggerChildren"
      >
        <StaggerDemo />
      </Section>

      <Section
        index="02"
        title="Gestes"
        caption="whileHover / whileTap · ressort"
      >
        <GestureDemo />
      </Section>

      <Section
        index="03"
        title="Révélation au scroll"
        caption="whileInView · viewport once"
      >
        <ScrollRevealDemo />
      </Section>

      <Section
        index="04"
        title="Présence"
        caption="AnimatePresence · mount / unmount"
      >
        <PresenceDemo />
      </Section>

      <Section
        index="05"
        title="Layout"
        caption="layout · réagencement fluide"
      >
        <LayoutDemo />
      </Section>

      <Section
        index="06"
        title="Manipulation directe"
        caption="drag · contraintes élastiques"
      >
        <DragDemo />
      </Section>

      <Section
        index="07"
        title="Valeurs & transformation"
        caption="useMotionValue / useTransform"
      >
        <TrackDemo />
      </Section>

      <footer className="border-t border-white/5 px-6 py-16 text-center">
        <p className="text-[0.6rem] uppercase tracking-xwide text-fumee">
          Framer Motion · 11.x
        </p>
      </footer>
    </main>
  );
}

/* --------------------------------------------------------------------- */
/* Intro                                                                  */
/* --------------------------------------------------------------------- */

function Intro() {
  const prefersReduced = useReducedMotion();
  const words = "Le mouvement, décliné".split(" ");

  return (
    <section className="flex min-h-screen-d flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="mb-8 text-[0.62rem] uppercase tracking-xwide text-dore"
      >
        Framer Motion
      </motion.p>

      <h1 className="flex flex-wrap justify-center gap-x-[0.25em] font-display text-[clamp(2.4rem,9vw,7rem)] uppercase leading-[0.95] text-creme">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={
              prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.3 + i * 0.12,
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="mt-8 max-w-md text-sm leading-relaxed text-fumee"
      >
        Sept démonstrations des capacités d&apos;animation de la librairie,
        déclinées dans la nuance.
      </motion.p>

      <motion.span
        aria-hidden="true"
        className="mt-16 block h-10 w-px bg-gradient-to-b from-fumee/70 to-transparent"
        animate={
          prefersReduced
            ? undefined
            : { scaleY: [0.3, 1, 0.3], transformOrigin: "top" }
        }
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
      />
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Cadre de section réutilisable                                         */
/* --------------------------------------------------------------------- */

function Section({
  index,
  title,
  caption,
  children,
}: {
  index: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="border-t border-white/5 px-6 py-24 sm:py-32">
      <motion.header
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto mb-12 max-w-5xl"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-sm text-dore">{index}</span>
          <h2 className="font-display text-2xl uppercase tracking-wide text-creme sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="mt-2 pl-10 text-[0.62rem] uppercase tracking-xwide text-fumee">
          {caption}
        </p>
      </motion.header>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* 01 · Stagger                                                          */
/* --------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function StaggerDemo() {
  const nuances = [
    "Vantablack",
    "Encre",
    "Obsidienne",
    "Charbon",
    "Fumée",
    "Ardoise",
    "Smokey",
    "Cendre",
  ];

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10%" }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {nuances.map((nuance) => (
        <motion.li
          key={nuance}
          variants={itemVariants}
          className="flex aspect-square flex-col justify-end border border-white/5 bg-white/[0.02] p-4"
        >
          <span className="text-xs uppercase tracking-wide text-creme">
            {nuance}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* --------------------------------------------------------------------- */
/* 02 · Gestes                                                           */
/* --------------------------------------------------------------------- */

function GestureDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.04, borderColor: "rgba(201,169,97,0.6)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="border border-white/10 bg-white/[0.02] px-6 py-10 text-xs uppercase tracking-xwide text-creme"
      >
        Survoler · cliquer
      </motion.button>

      <motion.div
        whileHover={{ rotate: 3, y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="flex items-center justify-center border border-white/10 bg-white/[0.02] px-6 py-10 text-xs uppercase tracking-xwide text-fumee"
      >
        Inclinaison
      </motion.div>

      <motion.div
        whileHover="on"
        initial="off"
        className="group relative flex items-center justify-center overflow-hidden border border-white/10 bg-white/[0.02] px-6 py-10 text-xs uppercase tracking-xwide text-creme"
      >
        <motion.span
          aria-hidden="true"
          variants={{ off: { x: "-100%" }, on: { x: "0%" } }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0 bg-dore/10"
        />
        <span className="relative">Balayage</span>
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* 03 · Révélation au scroll                                             */
/* --------------------------------------------------------------------- */

function ScrollRevealDemo() {
  const prefersReduced = useReducedMotion();
  const lines = [
    "Chaque pièce naît d'une nuance.",
    "Du plus dense au plus fumé.",
    "Le noir n'est jamais uniforme.",
  ];

  return (
    <div className="space-y-6">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={
            prefersReduced
              ? { opacity: 1 }
              : { opacity: 0, x: -30, filter: "blur(6px)" }
          }
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-2xl uppercase tracking-wide text-creme sm:text-4xl"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* 04 · Présence (AnimatePresence)                                       */
/* --------------------------------------------------------------------- */

function PresenceDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border border-dore/40 px-6 py-3 text-[0.62rem] uppercase tracking-xwide text-dore transition-colors duration-700 ease-signature hover:bg-dore hover:text-noir"
      >
        {open ? "Masquer" : "Révéler la pièce"}
      </button>

      <AnimatePresence mode="wait">
        {open && (
          <motion.article
            key="piece"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border border-white/10 bg-white/[0.02] p-8">
              <p className="font-display text-xl uppercase tracking-wide text-creme">
                Vantablack — 001
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fumee">
                Le montage et le démontage sont animés : l&apos;élément
                n&apos;apparaît pas, il entre — et il ne disparaît pas, il
                sort.
              </p>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* 05 · Layout                                                           */
/* --------------------------------------------------------------------- */

function LayoutDemo() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const cards = ["Encre", "Fumée", "Cendre"];

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {cards.map((card, i) => {
        const isOpen = expanded === i;
        return (
          <motion.button
            key={card}
            type="button"
            layout
            onClick={() => setExpanded(isOpen ? null : i)}
            transition={{ layout: { duration: 0.5, ease: EASE } }}
            className={`flex min-h-[8rem] items-end border border-white/10 bg-white/[0.02] p-5 text-left ${
              isOpen ? "sm:flex-[3]" : "sm:flex-[1]"
            }`}
          >
            <motion.span
              layout="position"
              className="font-display text-lg uppercase tracking-wide text-creme"
            >
              {card}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* 06 · Drag                                                             */
/* --------------------------------------------------------------------- */

function DragDemo() {
  const constraints = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraints}
      className="relative flex h-56 items-center justify-center overflow-hidden border border-white/5 bg-white/[0.02]"
    >
      <span className="pointer-events-none absolute text-[0.6rem] uppercase tracking-xwide text-fumee/50">
        Déplacez la pièce
      </span>
      <motion.div
        drag
        dragConstraints={constraints}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="z-10 flex h-20 w-20 cursor-grab items-center justify-center rounded-full border border-dore/40 bg-dore/10 text-[0.55rem] uppercase tracking-wide text-dore"
      >
        001
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* 07 · MotionValue + Transform                                          */
/* --------------------------------------------------------------------- */

function TrackDemo() {
  // La position horizontale du curseur pilote plusieurs sorties dérivées.
  const x = useMotionValue(0);
  const bg = useTransform(
    x,
    [0, 100],
    ["rgba(122,122,122,0.15)", "rgba(201,169,97,0.5)"],
  );
  const rotate = useTransform(x, [0, 100], [0, 180]);
  const label = useTransform(x, (v) => `${Math.round(v)}%`);

  return (
    <div className="space-y-6">
      <input
        aria-label="Piloter la valeur"
        type="range"
        min={0}
        max={100}
        defaultValue={0}
        onChange={(e) => x.set(Number(e.target.value))}
        className="w-full accent-dore"
      />
      <div className="flex items-center gap-6">
        <motion.div
          style={{ backgroundColor: bg, rotate }}
          className="flex h-24 w-24 items-center justify-center border border-white/10"
        >
          <motion.span className="font-display text-sm text-creme">
            {label}
          </motion.span>
        </motion.div>
        <p className="max-w-sm text-sm leading-relaxed text-fumee">
          Une seule valeur source alimente la couleur, la rotation et le
          texte — sans re-render React, directement dans le compositeur.
        </p>
      </div>
    </div>
  );
}
