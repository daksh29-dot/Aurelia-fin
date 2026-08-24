import { cn } from "@/lib/utils";

const levels = { low: 1, medium: 2, high: 3 } as const;

export function ConfidenceIndicator({ level }: { level: keyof typeof levels }) {
  return (
    <div className="flex items-center gap-1.5" title={`Confidence: ${level}`}>
      <span className="text-xs text-text-muted">Confidence</span>
      <div className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 w-1.5 rounded-sm",
              i <= levels[level] ? "bg-[var(--ai-accent)]" : "bg-surface"
            )}
          />
        ))}
      </div>
      <span className="text-xs capitalize text-text-secondary">{level}</span>
    </div>
  );
}
