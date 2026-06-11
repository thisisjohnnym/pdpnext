"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { shopTheLook } from "@/data/product";
import { ChevronUpIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

/**
 * Depth tuning for the locked stage. The media leads the scroll while the
 * headline drifts up slowly, so the headline appears to recede and tuck behind
 * the media. Same scroll-speed language as the product-intro-peek parallax.
 */
const HEADLINE_TUCK_PERCENT = -40;

/** Idle inset (px) of the media card from the page edges, before full-bleed. */
const STL_INSET = 10;

/** Media top offset (%) at rest, leaving the headline visible above the card. */
const MEDIA_IDLE_TOP = "30%";

export function ShopTheLook() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const headline = headlineRef.current;
      const media = mediaRef.current;
      if (!stage || !headline || !media) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 — rise: the media climbs into a clean 10px-framed card while
        // the headline drifts up slower and tucks behind it (depth).
        tl.to(
          media,
          { top: STL_INSET, ease: "none", duration: 0.6 },
          0,
        );
        tl.to(
          headline,
          { yPercent: HEADLINE_TUCK_PERCENT, ease: "none", duration: 0.6 },
          0,
        );
        // Phase 2 — morph: the 10px frame closes on every side so the card
        // expands edge-to-edge into the full-bleed (100vw/100vh) view.
        tl.to(
          media,
          { top: 0, left: 0, right: 0, bottom: 0, ease: "power2.inOut", duration: 0.4 },
          0.6,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headline, media], { clearProps: "transform" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section data-testid="shop-the-look" className="relative bg-surface">
      {/* Fullscreen lock stage: idle the media sits 10px inside the page,
          then pins and goes full-bleed while the headline tucks behind it. */}
      <div
        ref={stageRef}
        data-testid="stl-stage"
        className="relative h-[100svh] w-full overflow-hidden"
      >
        <h2
          ref={headlineRef}
          className="absolute inset-x-0 top-[7%] z-0 px-3 font-display text-[clamp(48px,15vw,60px)] text-ink will-change-transform"
        >
          <span className="block">Shop the</span>
          <span className="block text-right">look —</span>
        </h2>

        <div
          ref={mediaRef}
          data-testid="stl-media"
          style={{ top: MEDIA_IDLE_TOP }}
          className="absolute bottom-[var(--stl-inset)] left-[var(--stl-inset)] right-[var(--stl-inset)] z-10 overflow-hidden bg-surface-gray will-change-[top,bottom,left,right]"
        >
          <Image
            src={shopTheLook.model.src}
            alt={shopTheLook.model.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Below the lock: normal scroll resumes for the product list. */}
      <div className="px-2 pb-6 pt-8">
        <Reveal as="ul" className="px-3" y={16}>
          {shopTheLook.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 border-t border-ink/15 py-4 first:border-t-0"
            >
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-surface-gray">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="flex-1 font-body text-[12px] font-light tracking-wide text-ink-soft">
                {item.name}
              </span>
              <span className="font-body text-[12px] font-light tracking-wide text-ink-soft">
                {item.price}
              </span>
            </li>
          ))}
        </Reveal>

        <button
          type="button"
          className="mx-auto mt-2 flex w-fit items-center gap-2 py-3 text-ink transition-opacity hover:opacity-60"
        >
          <ChevronUpIcon className="h-4 w-4" />
          <span className="font-label text-[10px] uppercase tracking-[0.14em]">Close</span>
        </button>
      </div>
    </section>
  );
}
