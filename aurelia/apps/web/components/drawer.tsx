"use client";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside
        role="dialog"
        aria-label={title}
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md border-l border-border bg-[var(--background)] p-5 shadow-glass transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-text-muted hover:text-text-primary">
            ✕
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
