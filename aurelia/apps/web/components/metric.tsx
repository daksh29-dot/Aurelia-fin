import { cn, formatPercent } from "@/lib/utils";

export function Metric({
  label,
  value,
  changePct,
  size = "md",
}: {
  label: string;
  value: string;
  changePct?: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-text-muted">{label}</span>
      <span
        className={cn(
          "font-mono figure text-text-primary",
          size === "lg" && "text-2xl",
          size === "md" && "text-lg",
          size === "sm" && "text-sm"
        )}
      >
        {value}
      </span>
      {changePct !== undefined && (
        <span
          className={cn(
            "font-mono figure text-xs",
            changePct >= 0 ? "text-positive" : "text-negative"
          )}
        >
          {formatPercent(changePct)}
        </span>
      )}
    </div>
  );
}
