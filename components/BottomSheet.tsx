"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
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

type BottomSheetProps = {
  open: boolean;
  /** Micro label shown above the title (uppercase tracked kicker). */
  label: string;
  /** Display heading for the sheet. */
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Reusable slide-up sheet. Mirrors the OverlayPlaceholder pattern (portal to
 * body so it clears the pinned hero and pinned carousel, dim scrim, escape to
 * close, grabber handle, CSS-only slide + fade). Motion is opacity/transform
 * only and eased out; reduced-motion users still get a functional sheet.
 */
export function BottomSheet({ open, label, title, onClose, children }: BottomSheetProps) {
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
      data-testid="bottom-sheet"
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
        aria-label={title}
        className={`relative z-10 max-h-[85svh] w-full overflow-y-auto rounded-t-2xl bg-surface px-6 pb-[calc(env(safe-area-inset-bottom)+1.75rem)] pt-5 transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-ink/15" />
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {label}
            </p>
            <h2 className="mt-2 font-display text-[34px] leading-none text-ink">{title}</h2>
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
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
