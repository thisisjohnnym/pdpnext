"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useProduct } from "@/components/ProductProvider";
import type { Photo } from "@/data/types";
import { Reveal } from "@/components/Reveal";

function PhotoCell({ photo, delay = 0 }: { photo: Photo; delay?: number }) {
  return (
    <Reveal className="relative aspect-[210/300] w-full overflow-hidden" y={28} delay={delay}>
      <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
    </Reveal>
  );
}

export function MorePhotos() {
  const { morePhotos } = useProduct();
  const sectionRef = useRef<HTMLElement>(null);
  const colTwoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const colTwo = colTwoRef.current;
      if (!section || !colTwo) return;

      const mm = gsap.matchMedia();

      // Column two lags ~10% behind the scroll for a layered, offset feel.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(colTwo, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(colTwo, { yPercent: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} data-testid="more-photos" className="overflow-clip bg-surface-gray px-2 pb-3 pt-[110px]">
      <Reveal as="h2" className="px-3 font-display text-[clamp(48px,15vw,60px)] text-ink">
        <span className="block">More</span>
        <span className="block text-right">— photos</span>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          {morePhotos.columnOne.map((p, i) => (
            <PhotoCell key={p.src} photo={p} delay={i * 0.05} />
          ))}
        </div>
        <div ref={colTwoRef} className="mt-12 flex flex-col gap-2">
          {morePhotos.columnTwo.map((p, i) => (
            <PhotoCell key={p.src} photo={p} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
