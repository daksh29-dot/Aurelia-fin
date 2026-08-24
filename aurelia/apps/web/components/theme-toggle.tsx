"use client";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

const options = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "system", label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-0.5 rounded-[var(--radius)] border border-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setTheme(opt.id)}
          aria-pressed={theme === opt.id}
          className={cn(
            "rounded-[4px] px-2 py-1 text-xs transition-colors",
            theme === opt.id
              ? "bg-surface-hover text-text-primary"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
