"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";

const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

type OverlayPlaceholderProps = {
  open: boolean;
  label: string | null;
  onClose: () => void;
};

/**
 * Placeholder sheet opened by the hero social actions. The real content is not
 * designed yet, so this is an intentionally minimal, on-brand stand-in.
 *
 * Rendered through a portal to document.body so it sits above the pinned hero
 * (ScrollTrigger pins the hero with position:fixed, which would otherwise win
 * the stacking contest).
 */
export function OverlayPlaceholder({ open, label, onClose }: OverlayPlaceholderProps) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      data-testid="overlay"
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
      className={`fixed inset-0 z-[1000] mx-auto flex max-w-[var(--page-max)] items-end justify-center transition-opacity duration-500 ease-out ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Dismiss"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label ?? "Details"}
        className={`relative z-10 w-full rounded-t-2xl bg-surface px-6 pb-10 pt-5 transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-ink/15" />
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {label ?? "Details"}
            </p>
            <h2 className="mt-2 font-display text-[34px] leading-none text-ink">
              Coming soon
            </h2>
            <p className="mt-3 max-w-[36ch] font-body text-[13px] leading-relaxed text-ink-soft">
              This panel is reserved for comments, saves, and shared looks. The
              experience is still being designed.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-m-2 shrink-0 p-2 text-ink transition-opacity hover:opacity-60"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
