"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ProductImage } from "@/components/ProductImage";

const SIZES = "(max-width: 1024px) 100vw, 50vw";

/**
 * Galerie produit — carrousel horizontal.
 * Swipe / drag, points de navigation, compteur, flèches (desktop) et
 * navigation clavier ←/→. Un seul visuel : affichage simple sans contrôles.
 */
export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const multi = images.length > 1;

  const go = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(images.length - 1, i));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    },
    [images.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () =>
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Drag à la souris (desktop) — le tactile utilise le scroll natif.
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div
      className="group relative"
      tabIndex={multi ? 0 : -1}
      onKeyDown={onKeyDown}
      aria-roledescription={multi ? "carrousel" : undefined}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-y", cursor: multi ? "grab" : "default" }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[3/4] w-full flex-[0_0_100%] snap-center overflow-hidden bg-[#1A1A1A]"
          >
            <ProductImage
              src={src}
              alt={`${name} — vue ${i + 1}`}
              sizes={SIZES}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {multi && (
        <>
          <button
            type="button"
            aria-label="Visuel précédent"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-[2px] bg-noir/50 text-creme opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-signature hover:bg-noir/80 group-hover:opacity-100 sm:grid"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Visuel suivant"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-[2px] bg-noir/50 text-creme opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-signature hover:bg-noir/80 group-hover:opacity-100 sm:grid"
          >
            &rarr;
          </button>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[0.64rem] tracking-[0.2em] tabular-nums text-fumee">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Aller au visuel ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-0.5 w-5 transition-colors duration-300 ease-signature ${
                    i === index ? "bg-dore" : "bg-white/12"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
