"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { newsletter } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "done" | "error";

/** Section 4 — Capture email. Un seul champ, validation à Entrée. */
export function EmailCapture() {
  const { lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;

    if (!EMAIL_RE.test(email)) {
      setError(newsletter.errorFormat[lang]);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setError(newsletter.errorGeneric[lang]);
      setStatus("error");
    }
  }

  return (
    <section
      id="drop"
      aria-label={newsletter.title[lang]}
      className="relative flex min-h-screen-d flex-col items-center justify-center px-6 py-32 text-center sm:px-10"
    >
      <Reveal>
        <h2 className="font-display text-[clamp(2.2rem,8vw,6.5rem)] uppercase leading-[0.95] tracking-[0.01em] text-creme">
          {newsletter.title[lang]}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-fumee">
          {newsletter.subtitle[lang]}
        </p>
      </Reveal>

      <div className="mt-14 h-24 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.p
              key="success"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="pt-4 text-base tracking-wide text-dore"
              role="status"
            >
              {newsletter.success[lang]}
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={false}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative w-full"
              noValidate
            >
              <label htmlFor="ndn-email" className="sr-only">
                {newsletter.placeholder[lang]}
              </label>
              <input
                id="ndn-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setError(null);
                  }
                }}
                placeholder={newsletter.placeholder[lang]}
                aria-invalid={status === "error"}
                aria-describedby={error ? "ndn-email-error" : undefined}
                disabled={status === "loading"}
                className="w-full border-0 border-b border-white/25 bg-transparent pb-3 pr-10 text-center text-lg tracking-wide text-creme placeholder:text-fumee/60 focus:border-dore focus:outline-none focus:ring-0 md:text-xl"
              />
              {/* Flèche discrète — validation à Entrée ou au clic. */}
              <button
                type="submit"
                aria-label={newsletter.submit[lang]}
                disabled={status === "loading"}
                className="absolute bottom-3 right-0 text-fumee transition-colors duration-500 ease-signature hover:text-creme disabled:opacity-40"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  →
                </span>
              </button>

              <AnimatePresence>
                {error && (
                  <motion.span
                    id="ndn-email-error"
                    role="alert"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 right-0 text-xs tracking-wide text-fumee"
                  >
                    {error}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
