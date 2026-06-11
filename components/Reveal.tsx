"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, REVEAL_EASE, REVEAL_DURATION } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical travel of the entrance, in px. */
  y?: number;
  /** Stagger delay, in seconds. */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

/**
 * Wraps content in an in-view entrance: opacity 0 to 1 plus a small upward
 * translate, eased out. Honors prefers-reduced-motion by showing content as-is.
 * Never an instant pop.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 24,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: REVEAL_DURATION,
            ease: REVEAL_EASE,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`reveal-init${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
