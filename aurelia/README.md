# AURELIA

AI-native financial research terminal — professional research + explainable AI +
research agents + Figma-like research canvas, restrained glass UI.

**Status: Phase 0 complete (architecture + specification). No application code yet.**

## Phase-gated build

This repo is built in 10 controlled phases (see `docs/architecture.md` §Phases).
Each phase must be implemented, tested, reported, and approved before the next
begins. Do not skip ahead.

```
PHASE 0  Architecture + UX spec              ← you are here
PHASE 1  Glass design system + app shell
PHASE 2  Financial data foundation
PHASE 3  Core vertical slice (Why did X move?)
PHASE 4  Research agent + tool calling
PHASE 5  RAG / evidence layer
PHASE 6  Explainability + Challenge AI
PHASE 7  Research canvas + dynamic workspaces
PHASE 8  Markets / watchlists / screener / comparison
PHASE 9  Accessibility, evaluation, polish
PHASE 10 Production infrastructure + security hardening
```

## Docs

Start with `docs/architecture.md`, then the rest of `docs/` — all cross-referenced.

## Repo layout

See `docs/architecture.md` §Repository Structure for the full explanation of
every directory and what goes where in future phases.

## Running (from Phase 1 onward)

Nothing runs yet — Phase 0 is documentation and schema only, by design (per the
master spec: "do not build the whole application" before the architecture is
reviewed and approved). Once Phase 1 lands, this section will contain real
install/run instructions.
