"use client";

import { useRef, useState } from "react";
import { useProduct } from "@/components/ProductProvider";
import { CommentIcon, HeartIcon, PlayIcon, SaveIcon } from "@/components/icons";
import { OverlayPlaceholder } from "@/components/OverlayPlaceholder";

export function Hero() {
  const { tiktokVideos, product } = useProduct();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [overlay, setOverlay] = useState<string | null>(null);

  const clip = tiktokVideos[0];

  return (
    <>
      <section
        data-testid="hero"
        className="relative h-[calc(var(--hero-viewport-height)+var(--hero-pin-distance))] w-full bg-ink text-ink-invert"
        aria-label={`${product.title} ${product.subtitle}, video`}
      >
        <div
          data-hero-layer="sticky-media"
          className="sticky top-0 h-[var(--hero-viewport-height)] w-full overflow-hidden"
        >
          <video
            ref={videoRef}
            data-testid="hero-video"
            className="absolute inset-0 h-full w-full object-cover"
            poster={clip.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            {clip.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>

          <div className="pointer-events-none absolute inset-0 bg-[var(--scrim)]" />
        </div>

        <div className="absolute inset-x-0 top-0 h-[var(--hero-viewport-height)]">
          {/* Corner overlay copy, laid out like a magazine cover masthead. */}
          <div
            data-hero-overlay="copy"
            className="pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-between px-5 font-body text-[22px] font-medium leading-[1.12] tracking-tight"
          >
            <div>
              {product.hero.topLeft.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <div className="text-right">
              {product.hero.topRight.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          {/* Left scroll indicator. */}
          <div
            aria-hidden
            className="absolute left-5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-1.5"
          >
            <span className="h-1.5 w-[3px] bg-ink-invert/90" />
            <span className="h-7 w-[3px] bg-ink-invert/90" />
            <span className="h-1.5 w-[3px] bg-ink-invert/50" />
            <span className="h-1.5 w-[3px] bg-ink-invert/50" />
            <span className="h-1.5 w-[3px] bg-ink-invert/50" />
            <span className="h-1.5 w-[3px] bg-ink-invert/50" />
          </div>

          {/* Right social action rail. Each opens the (undesigned) overlay. */}
          <div
            data-hero-overlay="social"
            className="pointer-events-auto absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={() => setOverlay("Comments")}
              className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
              aria-label={`${clip.socials.comments} comments`}
            >
              <CommentIcon className="h-7 w-7" />
              <span className="font-label text-[11px]">{clip.socials.comments}</span>
            </button>
            <button
              type="button"
              onClick={() => setOverlay("Saved")}
              className="transition-opacity hover:opacity-70"
              aria-label="Save"
            >
              <SaveIcon className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={() => setOverlay("Liked")}
              className="transition-opacity hover:opacity-70"
              aria-label="Like"
            >
              <HeartIcon className="h-7 w-7" />
            </button>
          </div>

          {/* Play / pause control. */}
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              if (v.paused) void v.play();
              else v.pause();
            }}
            aria-label="Play or pause video"
            className="pointer-events-auto absolute bottom-6 right-5 z-10 flex h-9 w-12 items-center justify-center border border-ink-invert/70 text-ink-invert transition-colors hover:bg-ink-invert hover:text-ink"
          >
            <PlayIcon className="h-4 w-4" />
          </button>
        </div>
      </section>

      <OverlayPlaceholder
        open={overlay !== null}
        label={overlay}
        onClose={() => setOverlay(null)}
      />
    </>
  );
}
