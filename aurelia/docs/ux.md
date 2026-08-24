# UX Flows

## App shell

```
┌──────────────────────────────────────────────────────────────┐
│ AURELIA      Search / Ask AI                    Theme  User  │
├──────────────┬───────────────────────────────────────────────┤
│ Home         │                                               │
│ Research     │                 MAIN WORKSPACE                │
│ Markets      │                                               │
│ Watchlists   │                                               │
│ Screener     │                                               │
│ Portfolio    │                                               │
│ News         │                                               │
│ Macro        │                                               │
│ Calendar     │                                               │
│ Settings     │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

Sidebar collapsible (`Cmd/Ctrl+B`). Top bar hosts global command bar
(`Cmd/Ctrl+K`), theme toggle, user menu.

## Journey 1 — "Why did NVDA move today?" (core vertical slice, Phase 3)

1. User types the question in the command bar or Research view.
2. Agent activity panel appears: shows plan steps live (Detecting intent →
   Fetching price/news/earnings → Analyzing → Synthesizing) via SSE.
3. Result renders as: headline explanation, `FactorBars` breaking down
   contributing factors, `EvidenceList` (news/filings that back the claim),
   `ConfidenceIndicator`.
4. User can click any evidence item to open `SourceViewer`.
5. User can click "Challenge" to push back on a specific claim; agent
   responds in-thread, either revising or defending with more evidence.
6. Session auto-saves as a `research_session` inside a `workspace`, visible
   later from Home / Research history.

## Journey 2 — Compare NVDA vs AMD (Phase 8 builds on Phase 3's pipeline)

1. User asks the comparison question.
2. Agent plans a multi-entity version of Journey 1, runs tools per ticker.
3. Result renders as a `ComparisonTable` + narrative synthesis + confidence
   per claim, with a valuation verdict clearly labeled AI INTERPRETATION.

## Journey 3 — Research canvas (Phase 7)

1. From any research session, user can "Add to Canvas."
2. Canvas is a Figma-like infinite surface (`ResearchCanvas`) of
   `ResearchNode`s (claims, evidence, charts, notes) connected by edges
   representing relationships (supports / contradicts / relates-to).
3. Canvas state persists per workspace; multiple sessions can feed one canvas.

## Journey 4 — Theme switching (Phase 1)

Settings → Appearance → Dark / Light / System. Persisted per user
(`user_preferences.theme`), applied instantly, no flash-of-wrong-theme on load.

## Keyboard shortcuts (Phase 9 finalizes; wired incrementally from Phase 1)

```
Ctrl/Cmd + K        Global command bar
Ctrl/Cmd + Shift+F  Search
Ctrl/Cmd + B        Toggle sidebar
Ctrl/Cmd + Enter    Submit AI request
Esc                 Close modal/drawer
?                   Keyboard shortcuts help
```

## Empty / loading / error states

Every feature area (`apps/web/features/*`) ships its own empty, loading, and
error state components from Phase 1 onward — never a blank screen.
