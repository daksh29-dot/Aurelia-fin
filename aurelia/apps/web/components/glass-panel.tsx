import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border border-border bg-surface backdrop-blur-glass shadow-glass",
        className
      )}
      {...props}
    />
  );
}
