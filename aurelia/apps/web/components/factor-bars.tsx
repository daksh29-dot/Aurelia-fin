import { cn } from "@/lib/utils";

type Factor = { label: string; weight: number; category: "FACT" | "AI_INTERPRETATION" | "HYPOTHESIS" | "CALCULATION" | "USER_ASSUMPTION" };

const categoryColor: Record<Factor["category"], string> = {
  FACT: "bg-text-secondary",
  CALCULATION: "bg-positive",
  AI_INTERPRETATION: "bg-[var(--ai-accent)]",
  HYPOTHESIS: "bg-warning",
  USER_ASSUMPTION: "bg-text-muted",
};

export function FactorBars({ factors }: { factors: Factor[] }) {
  return (
    <div className="flex flex-col gap-3">
      {factors.map((f) => (
        <div key={f.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-primary">{f.label}</span>
            <span className="font-mono figure text-text-muted">{f.weight}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div
              className={cn("h-full rounded-full", categoryColor[f.category])}
              style={{ width: `${f.weight}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
