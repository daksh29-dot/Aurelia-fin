# Design System

## Philosophy

Minimal. Glass. Professional. Dense. Calm. Financial. Monochrome. The UI must
stay professional even with all accent colors stripped out. No bright
gradients, neon borders, excessive glow/animation, cartoon illustrations, or
marketing-style layouts.

## Tokens (`apps/web/styles/tokens.css`, built in Phase 1)

```css
:root {
  --background: ...;
  --surface-glass: ...;
  --surface-glass-hover: ...;
  --border-subtle: ...;
  --text-primary: ...;
  --text-secondary: ...;
  --text-muted: ...;
  --positive: ...;
  --negative: ...;
  --warning: ...;
  --ai-accent: ...;
  --shadow: ...;
  --blur: ...;
  --radius: ...;
}
```

Each theme (`[data-theme="dark"]`, `[data-theme="light"]`) overrides these
variables; `system` resolves to dark/light via `prefers-color-scheme` at
runtime and is re-evaluated on OS change. No component ever hard-codes a
color — everything reads a token.

## Component library (`packages/ui`, built incrementally from Phase 1)

```
GlassPanel        GlassModal        GlassDrawer
CommandBar        Metric            MetricGrid
FinancialChart    DataTable         ComparisonTable
EvidenceCard      EvidenceList      ConfidenceIndicator
FactorBars        RiskMatrix        ResearchNode
ResearchCanvas    AgentActivity     SourceViewer
Timeline          NewsList          CompanyHeader
Watchlist         SearchResults     AIMessage
UserMessage       WorkspaceTabs     ThemeToggle
```

Every component must render correctly in all three themes and pass a
reduced-motion check.

## Density & typography

Dense information layout (financial-terminal grade, not consumer-app
spacious). Off-white primary text, gray secondary/muted text, fine 1px
separators instead of heavy card shadows. Small semantic color accents only
for positive/negative/warning/ai — never decorative color.
