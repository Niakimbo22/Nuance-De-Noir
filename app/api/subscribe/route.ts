import { NextResponse } from "next/server";

/**
 * Route /api/subscribe — STUB.
 *
 * Valide le format de l'email, log en console, renvoie un succès.
 *
 * ────────────────────────────────────────────────────────────────
 * POUR BRANCHER UN VRAI SERVICE (Mailchimp, Resend, Klaviyo, Brevo…) :
 * remplacer le bloc « console.log » ci-dessous par l'appel API du service,
 * par exemple :
 *
 *   await fetch("https://api.provider.com/v1/subscribers", {
 *     method: "POST",
 *     headers: {
 *       Authorization: `Bearer ${process.env.NEWSLETTER_API_KEY}`,
 *       "Content-Type": "application/json",
 *     },
 *     body: JSON.stringify({ email }),
 *   });
 *
 * Penser à ajouter la clé dans les variables d'environnement Vercel.
 * ────────────────────────────────────────────────────────────────
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 422 },
    );
  }

  // TODO: brancher ici le service d'emailing (voir l'en-tête de ce fichier).
  console.log("[subscribe] nouvel email :", email);

  return NextResponse.json({ ok: true });
}
