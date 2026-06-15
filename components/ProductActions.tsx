"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { BottomSheet } from "@/components/BottomSheet";
import { BagIcon, CheckIcon, PlusIcon } from "@/components/icons";
import { useProduct } from "@/components/ProductProvider";

const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

type SheetId = "bag" | "colors" | null;

/**
 * Floating product CTA group. Always pinned to the bottom of the page column,
 * including over the hero. The container is transparent (no plate behind the
 * group); only the buttons carry surface. Self-portals to document.body so it
 * floats above the pinned hero and the pinned carousel. Drawers are placeholder
 * experiences: colorways are stand-in swatches, "Add to bag" opens an upsell.
 */
export function ProductActions() {
  const { bagUpsell, colorways, product } = useProduct();
  const isClient = useIsClient();
  const [mounted, setMounted] = useState(false);
  // Read once on the client; the bar never renders during SSR (see isClient).
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [openSheet, setOpenSheet] = useState<SheetId>(null);
  const [selectedColorway, setSelectedColorway] = useState(colorways[0]);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [bagConfirmed, setBagConfirmed] = useState(false);

  // Gentle entrance on mount (fade + rise), eased out. Reduced-motion users skip
  // the transform/opacity travel entirely and get the bar at its final state.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const shown = mounted || reduceMotion;

  const close = () => setOpenSheet(null);

  if (!isClient) return null;

  const bar = (
    <div
      data-testid="product-actions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] mx-auto flex max-w-[var(--page-max)] items-stretch gap-2 px-3 pb-[calc(env(safe-area-inset-bottom)+14px)]"
      style={{
        transform: shown ? "translateY(0)" : "translateY(16px)",
        opacity: shown ? 1 : 0,
        transition: reduceMotion
          ? "none"
          : "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease-out",
      }}
    >
      {/* Soft progressive blur + tint fade behind the group, masked to fade
          out upward so it separates the CTAs from busy page content without a
          hard plate edge. Purely decorative; never intercepts pointer events. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[150px] bg-gradient-to-t from-surface/55 via-surface/15 to-transparent"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 40%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
      <button
        type="button"
        onClick={() => setOpenSheet("bag")}
        className="pointer-events-auto flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-ink-invert transition-opacity hover:opacity-90"
      >
        <BagIcon className="h-[18px] w-[18px] shrink-0" />
        <span className="whitespace-nowrap font-label text-[11px] uppercase tracking-[0.16em]">
          Add to bag
        </span>
        <span
          aria-hidden
          className="whitespace-nowrap font-label text-[11px] tracking-[0.04em] opacity-70"
        >
          {product.price}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setOpenSheet("colors")}
        aria-label={`Colorway: ${selectedColorway.name}. Change colorway`}
        className="pointer-events-auto flex h-[52px] min-w-0 max-w-[45%] items-center gap-2.5 rounded-full bg-surface px-4 text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-ink/15 transition-opacity hover:opacity-80"
      >
        <span
          aria-hidden
          className="h-5 w-5 shrink-0 rounded-full ring-1 ring-ink/15"
          style={{ backgroundColor: selectedColorway.swatch }}
        />
        <span className="truncate font-label text-[11px] uppercase tracking-[0.16em]">
          {selectedColorway.name}
        </span>
      </button>
    </div>
  );

  return (
    <>
      {createPortal(bar, document.body)}

      <BottomSheet
        open={openSheet === "colors"}
        label="Colorway"
        title="Choose a color"
        onClose={close}
      >
        <ul className="flex flex-col">
          {colorways.map((c) => {
            const isSelected = c.id === selectedColorway.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColorway(c);
                    close();
                  }}
                  aria-pressed={isSelected}
                  className="flex w-full items-center gap-4 border-t border-ink/10 py-4 text-left transition-opacity first:border-t-0 hover:opacity-70"
                >
                  <span
                    aria-hidden
                    className="h-9 w-9 shrink-0 rounded-full ring-1 ring-ink/15"
                    style={{ backgroundColor: c.swatch }}
                  />
                  <span className="flex-1 font-body text-[13px] font-light tracking-wide text-ink-soft">
                    {c.name}
                  </span>
                  {isSelected ? (
                    <CheckIcon className="h-5 w-5 text-ink" />
                  ) : (
                    <span className="font-label text-[10px] uppercase tracking-[0.14em] text-ink-soft/60">
                      Select
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheet>

      <BottomSheet
        open={openSheet === "bag"}
        label="Complete your bag"
        title="Add to your bag"
        onClose={close}
      >
        <ul className="flex flex-col">
          {bagUpsell.map((item) => {
            const isAdded = !!added[item.id];
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 border-t border-ink/10 py-4 first:border-t-0"
              >
                <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-surface-gray">
                  <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-[12px] font-light tracking-wide text-ink-soft">
                    {item.name}
                  </p>
                  <p className="mt-1 font-body text-[12px] font-light tracking-wide text-ink-soft">
                    {item.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setAdded((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  aria-pressed={isAdded}
                  aria-label={isAdded ? `Remove ${item.name}` : `Add ${item.name}`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
                    isAdded
                      ? "bg-ink text-ink-invert ring-ink"
                      : "bg-surface text-ink ring-ink/20 hover:ring-ink/40"
                  }`}
                >
                  {isAdded ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            setBagConfirmed(true);
            window.setTimeout(() => setBagConfirmed(false), 2200);
          }}
          className="mt-6 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-ink text-ink-invert transition-opacity hover:opacity-90"
        >
          {bagConfirmed ? (
            <>
              <CheckIcon className="h-[18px] w-[18px]" />
              <span className="font-label text-[11px] uppercase tracking-[0.16em]">Added</span>
            </>
          ) : (
            <>
              <BagIcon className="h-[18px] w-[18px]" />
              <span className="font-label text-[11px] uppercase tracking-[0.16em]">
                Add to bag
              </span>
              <span aria-hidden className="font-label text-[11px] tracking-[0.04em] opacity-70">
                {product.price}
              </span>
            </>
          )}
        </button>
      </BottomSheet>
    </>
  );
}
