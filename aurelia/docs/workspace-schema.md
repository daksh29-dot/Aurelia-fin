# Workspace Schema

The workspace schema is the contract between the AI orchestrator and the
frontend. The LLM may only ever produce JSON that validates against this
schema (`packages/schemas/workspace.ts`, zod) — never arbitrary UI code.

## Shape (finalized in Phase 4, stubbed here)

```ts
type Workspace = {
  id: string;
  type: "single_company" | "comparison" | "macro" | "custom";
  title: string;
  sections: WorkspaceSection[];
};

type WorkspaceSection =
  | { kind: "metric_grid"; metrics: Metric[] }
  | { kind: "chart"; chartType: "line" | "candlestick" | "bar"; series: ChartSeries[] }
  | { kind: "factor_bars"; factors: Factor[] }
  | { kind: "evidence_list"; items: EvidenceRef[] }
  | { kind: "comparison_table"; rows: ComparisonRow[] }
  | { kind: "narrative"; text: string; claims: Claim[] };

type Claim = {
  text: string;
  category: "FACT" | "CALCULATION" | "AI_INTERPRETATION" | "HYPOTHESIS" | "USER_ASSUMPTION";
  evidenceRefs: string[];      // document_chunk ids or calculation ids
  confidence?: "low" | "medium" | "high";
};
```

## Validation pipeline

1. Orchestrator produces a candidate workspace JSON.
2. `packages/schemas` zod-validates structure, enum values, and reference
   integrity (every `evidenceRefs` id must exist).
3. Any claim without a category defaults to rejection — the pipeline never
   silently downgrades an untagged claim to FACT.
4. Only a validated workspace reaches `apps/web`; a failed validation
   triggers a retry with the error fed back to the LLM, not a raw render.

## Why this matters

This is the mechanism that keeps "AURELIA owns financial truth, the LLM
handles language" true in practice — the frontend is a renderer of trusted,
structurally-validated data, not an executor of LLM output.
