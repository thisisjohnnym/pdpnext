"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const REVEAL_EASE = "power3.out";
export const REVEAL_DURATION = 0.8;

export { gsap, ScrollTrigger, useGSAP };
