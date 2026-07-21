"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Sélecteur de langue fixe, en haut à droite.
 * Masqué sur le hero (pour préserver la pureté de l'intro), révélé au scroll.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 top-6 z-40 sm:right-10 sm:top-8"
        >
          <LanguageSwitcher />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
