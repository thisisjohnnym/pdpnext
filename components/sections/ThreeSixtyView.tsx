"use client";

import Image from "next/image";
import { useProduct } from "@/components/ProductProvider";
import { Reveal } from "@/components/Reveal";

export function ThreeSixtyView() {
  const { threeSixty } = useProduct();
  return (
    <section
      data-testid="three-sixty"
      className="relative z-10 bg-surface-gray px-2.5 pb-2 pt-[60px]"
    >
      <Reveal className="relative mx-auto aspect-[410/608] w-full overflow-hidden border border-surface">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="360 degree spin of the Tabby bag"
          poster={threeSixty.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={threeSixty.src} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[var(--scrim)]" />

        {/* Visual-only CTA. */}
        <div className="absolute bottom-[9px] left-[9px] flex items-center gap-2.5 text-ink">
          <div className="flex h-10 items-center justify-center bg-surface px-[14px]">
            <Image src="/360-view-paper.svg" alt="" aria-hidden width={24} height={24} />
          </div>
          <span className="pt-[5px] font-label text-[14px] leading-[1.25] tracking-[0.2px]">
            {threeSixty.ctaLabel}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
