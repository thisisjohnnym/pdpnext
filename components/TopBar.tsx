import { CoachWordmark, MenuIcon } from "@/components/icons";

export function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)] text-ink-invert">
      <CoachWordmark className="h-[11px] w-auto" />
      <button
        type="button"
        aria-label="Open menu"
        className="-m-2 p-2 transition-opacity hover:opacity-70"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
    </header>
  );
}
