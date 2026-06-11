"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, REVEAL_EASE } from "@/lib/gsap";
import { product, galleryThumb } from "@/data/product";
import { TikTokGlyph } from "@/components/icons";

/**
 * Scroll-speed multipliers. All layers lead (> 1) so they drift the same
 * direction and never collide; the spread orders depth: meta is the slow
 * background layer, the image the fastest foreground. A literal 0.9 meta lags
 * downward into the interleaved headlines and reads as static, so it leads
 * least instead.
 */
const PARALLAX_SPEED = {
  meta: 1.05,
  headline: 1.1,
  image: 1.2,
} as const;

/**
 * How strongly the speed delta is expressed (1 = literal 100% scroll-speed,
 * i.e. a 1.2 layer leads the scroll by a full 20% of the scroll distance).
 */
const PARALLAX_INTENSITY = 0.6;

const scrollRange = {
  start: "top bottom",
  end: "bottom top",
} as const;

/**
 * Scroll-speed parallax: an element at `speed` deviates from normal scroll by
 * `(speed - 1)` of the distance it travels through the trigger range. Speed > 1
 * leads (moves up faster), speed < 1 lags. Proportional to scroll distance so
 * the layer-to-layer differential is actually perceptible.
 */
function parallaxY(section: HTMLElement, speed: number) {
  const range = section.offsetHeight + window.innerHeight;
  return -(speed - 1) * range * PARALLAX_INTENSITY;
}

function parallaxScrollTrigger(section: HTMLElement) {
  return {
    trigger: section,
    start: scrollRange.start,
    end: scrollRange.end,
    scrub: true,
    invalidateOnRefresh: true,
  };
}

export function ProductIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiktokRef = useRef<HTMLDivElement>(null);
  const captionRowRef = useRef<HTMLDivElement>(null);
  const tabbyRef = useRef<HTMLHeadingElement>(null);
  const subtitleRowRef = useRef<HTMLDivElement>(null);
  const editionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const tiktok = tiktokRef.current;
      const captionRow = captionRowRef.current;
      const tabby = tabbyRef.current;
      const subtitleRow = subtitleRowRef.current;
      const edition = editionRef.current;
      const image = imageRef.current;
      if (!section || !tiktok || !captionRow || !tabby || !subtitleRow || !edition || !image) return;

      // Keep the top callout anchored so the 5px intro seam stays stable.
      const metaParallaxEls = [captionRow, subtitleRow];
      const headlineEls = [tabby, edition];
      const entranceEls = [tiktok, ...metaParallaxEls, ...headlineEls, image];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = parallaxScrollTrigger(section);

        gsap.to(metaParallaxEls, {
          y: () => parallaxY(section, PARALLAX_SPEED.meta),
          ease: "none",
          scrollTrigger: { ...st },
        });
        gsap.to(headlineEls, {
          y: () => parallaxY(section, PARALLAX_SPEED.headline),
          ease: "none",
          scrollTrigger: { ...st },
        });
        gsap.to(image, {
          y: () => parallaxY(section, PARALLAX_SPEED.image),
          ease: "none",
          scrollTrigger: { ...st },
        });

        gsap.from(entranceEls, {
          opacity: 0,
          duration: 0.9,
          ease: REVEAL_EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: scrollRange.start, once: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(entranceEls, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-testid="product-intro"
      className="product-intro-peek relative z-10 overflow-clip bg-surface-gray pb-3"
    >
      {/* Title block + image — matches Paper artboard 3G0-0 */}
      <div className="flex flex-col items-start px-[5px] pb-[5px] pt-[5px]">
        {/* Product Title Block */}
        <div className="flex w-full flex-col self-stretch">
          {/* TikTok Callout */}
          <div ref={tiktokRef} className="flex w-fit items-center gap-[7px]">
            <div className="flex h-[33px] w-[33px] shrink-0 items-center justify-center overflow-clip bg-surface">
              <TikTokGlyph className="h-6 w-6 text-ink" />
            </div>
            <div className="font-label text-[10px] leading-[1.25] tracking-[0.2px] text-ink">
              <div>See it at</div>
              <div>{product.handle}</div>
            </div>
          </div>

          {/* Caption row */}
          <div ref={captionRowRef} className="flex pb-[21px]">
            <div className="w-[40%] shrink-0" aria-hidden />
            <p className="flex-1 text-right font-label text-[10px] leading-[1.25] tracking-[0.2px] text-ink">
              {product.caption}
            </p>
          </div>

          <h1
            ref={tabbyRef}
            className="font-display text-[60px] font-semibold leading-none tracking-[-2.2px] text-ink"
          >
            {product.title}
          </h1>

          {/* Subtitle row */}
          <div ref={subtitleRowRef} className="flex h-[13px] shrink-0">
            <div className="w-[40%] shrink-0" aria-hidden />
            <span className="flex-1 font-label text-[10px] leading-[1.25] tracking-[0.2px] text-ink">
              {product.subtitle}
            </span>
          </div>

          <div
            ref={editionRef}
            className="w-full text-right font-display text-[60px] font-bold leading-none tracking-[-6.3px] text-ink"
          >
            {product.edition}
          </div>
        </div>

        {/* Product Gallery Thumb */}
        <div
          ref={imageRef}
          className="relative aspect-[249/363] w-[59.29%] overflow-hidden"
        >
          <Image
            src={galleryThumb.src}
            alt={galleryThumb.alt}
            fill
            sizes="60vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
