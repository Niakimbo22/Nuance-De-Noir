import type { Metadata } from "next";
import { MotionShowcase } from "@/components/MotionShowcase";

export const metadata: Metadata = {
  title: "Motion",
  description:
    "Démonstration des capacités d'animation de Framer Motion, déclinée dans la direction artistique de Nuances de Noir.",
  robots: { index: false, follow: false },
};

export default function MotionPage() {
  return <MotionShowcase />;
}
