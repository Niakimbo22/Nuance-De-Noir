import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Collection } from "@/components/Collection";
import { EmailCapture } from "@/components/EmailCapture";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <Collection />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
