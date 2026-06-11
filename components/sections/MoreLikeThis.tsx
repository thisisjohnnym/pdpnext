"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { relatedProducts } from "@/data/product";

export function MoreLikeThis() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        setReduced(false);
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + getDistance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        // Recompute once media has settled.
        ScrollTrigger.refresh();

        return () => tween.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setReduced(true);
        gsap.set(track, { x: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-testid="more-like-this"
      className="relative flex h-[100svh] flex-col overflow-hidden bg-surface-gray pb-10 pt-[110px]"
    >
      <h2 className="px-3 font-display text-[clamp(48px,15vw,60px)] text-ink">
        <span className="block">More like</span>
        <span className="block text-right">—this</span>
      </h2>

      <div
        ref={viewportRef}
        className={`relative mt-8 flex-1 ${reduced ? "overflow-x-auto" : "overflow-hidden"}`}
      >
        <div
          ref={trackRef}
          className="flex h-full items-center gap-4 px-3 will-change-transform"
        >
          {relatedProducts.map((item) => (
            <article key={item.id} className="flex h-full max-h-[70vh] w-[68%] shrink-0 flex-col">
              <div className="relative w-full flex-1 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="68vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <span className="font-body text-[12px] font-light leading-tight tracking-wide text-ink-soft">
                  {item.name}
                </span>
                <span className="font-body text-[12px] font-light tracking-wide text-ink-soft">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 px-3">
        <div className="h-[3px] w-full bg-ink/15">
          <div
            data-testid="mlt-progress"
            className="h-full bg-ink transition-[width] duration-150 ease-out"
            style={{ width: `${reduced ? 100 : Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
