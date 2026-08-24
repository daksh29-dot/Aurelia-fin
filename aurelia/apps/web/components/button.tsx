import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  className,
  variant = "secondary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" && "bg-[var(--ai-accent)] text-white hover:opacity-90",
        variant === "secondary" &&
          "border border-border bg-surface text-text-primary hover:bg-surface-hover",
        variant === "ghost" && "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
        className
      )}
      {...props}
    />
  );
}
