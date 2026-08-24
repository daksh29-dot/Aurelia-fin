import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  FACT: "border-text-secondary text-text-secondary",
  CALCULATION: "border-positive text-positive",
  AI_INTERPRETATION: "border-[var(--ai-accent)] text-[var(--ai-accent)]",
  HYPOTHESIS: "border-warning text-warning",
  USER_ASSUMPTION: "border-text-muted text-text-muted",
};

const labels: Record<string, string> = {
  FACT: "Fact",
  CALCULATION: "Calculation",
  AI_INTERPRETATION: "AI interpretation",
  HYPOTHESIS: "Hypothesis",
  USER_ASSUMPTION: "Your assumption",
};

export function ClaimTag({ category }: { category: keyof typeof styles }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[11px] font-medium",
        styles[category]
      )}
    >
      {labels[category]}
    </span>
  );
}
