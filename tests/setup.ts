import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

afterEach(() => cleanup());

// jsdom has no matchMedia; GSAP's matchMedia relies on it.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom does not implement media playback.
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();

// next/image needs the Next build pipeline; swap it for a plain img in unit tests.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const rest = { ...props };
    delete rest.fill;
    delete rest.sizes;
    delete rest.priority;
    const rawSrc = rest.src as string | { src: string } | undefined;
    delete rest.src;
    const src = typeof rawSrc === "string" ? rawSrc : rawSrc?.src;
    return React.createElement("img", { ...rest, src });
  },
}));
