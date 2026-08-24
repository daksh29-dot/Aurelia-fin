"use client";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ onOpenCommandBar }: { onOpenCommandBar: () => void }) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-border px-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-semibold tracking-wide text-text-primary">
          AURELIA
        </span>
      </div>
      <button
        onClick={onOpenCommandBar}
        className="flex flex-1 max-w-md items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-3 py-1.5 text-sm text-text-muted hover:bg-surface-hover"
      >
        <span>Search or ask AI…</span>
        <span className="rounded border border-border px-1.5 py-0.5 text-[11px]">⌘K</span>
      </button>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div
          className="h-7 w-7 rounded-full border border-border bg-surface"
          aria-label="User menu"
          role="button"
        />
      </div>
    </header>
  );
}
