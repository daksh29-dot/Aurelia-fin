# Architecture

## 1. System overview

**Backend language decision (locked before Phase 2): Python (FastAPI) for `apps/api`.**
The frontend remains TypeScript/Next.js — browsers only execute JS, so that
boundary is fixed regardless of backend language. Python was chosen over
Node/TS, Go, and Rust for `apps/api` specifically because of its mature
LLM-orchestration, RAG, and embeddings ecosystem (see the rationale thread —
summarized: Go/Rust have far weaker agent/RAG tooling and would mean
hand-building what Python gets from mature libraries; TS keeps one language
but loses that ecosystem advantage). This is a two-language repo by design.

AURELIA is split into three deployable units plus shared packages:

```
apps/web    Next.js + TypeScript frontend (App Router) — runs in the browser
apps/api    Python (FastAPI) backend: routes, services, agents, tools, data models
packages/*  Shared contracts: JSON Schema (source of truth), generated TS types, generated Pydantic models, config
infra/*     Docker, DB migrations
docs/*      This specification
tests/*     Unit, integration, e2e, AI-eval, fixtures
```

The frontend never talks to financial data providers or LLM providers directly.
Everything goes through `apps/api`, which is the single source of truth for
data normalization, calculations, evidence, and orchestration.

## 2. Repository structure (full)

```
aurelia/
├── apps/
│   ├── web/
│   │   ├── app/            Next.js routes (Home, Research, Markets, Watchlists, Settings...)
│   │   ├── components/     Generic, theme-aware UI primitives (GlassPanel, DataTable, etc.)
│   │   ├── features/       Feature-scoped UI + local state, one folder per domain area
│   │   │   ├── home/
│   │   │   ├── research/
│   │   │   ├── markets/
│   │   │   ├── watchlists/
│   │   │   ├── canvas/
│   │   │   ├── evidence/
│   │   │   └── settings/
│   │   ├── hooks/          Shared React hooks (useTheme, useCommandBar, useAgentStream...)
│   │   ├── lib/            API client, formatting helpers, non-visual utilities
│   │   └── styles/         Design tokens (CSS vars), global stylesheet
│   └── api/                    Python — FastAPI
│       ├── routes/         HTTP/SSE endpoints (thin — validate + delegate to services)
│       ├── services/       Business logic (MarketDataService, ResearchService, ...)
│       ├── agents/         AI orchestration: ModelRouter, AIOrchestrator, ResearchPlanner
│       ├── tools/          Tool-calling implementations the agent can invoke
│       ├── models/         SQLAlchemy models (DB rows / entities)
│       ├── repositories/   DB access layer (one per entity group)
│       ├── core/           Cross-cutting: auth, config, logging, error types
│       ├── pyproject.toml  Dependency manifest (pinned, audited every phase)
│       └── requirements.lock  Fully pinned, hash-locked dependency set
├── packages/
│   ├── ui/                 Design-system components shared between web and (future) other clients
│   ├── schemas/            JSON Schema definitions — workspace, evidence, tool I/O (source of truth)
│   ├── types/              TypeScript types generated from packages/schemas (for apps/web)
│   └── config/             Shared lint/tsconfig/tailwind config
├── infra/
│   ├── docker/             Dockerfiles, docker-compose for local Postgres/Redis/pgvector
│   └── migrations/         SQL migrations (chronological)
├── docs/                   This folder
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── ai/                 Fixed evaluation dataset + eval harness for agent quality
│   └── fixtures/           Mock market data, mock news, mock filings
└── README.md
```

### Where future work lands (by phase)

| Phase | Primary directories touched |
|---|---|
| 1 — Design system + shell | `apps/web/{app,components,styles}`, `packages/ui`, `packages/config` |
| 2 — Data foundation | `apps/api/{services,repositories,models,core}`, `infra/{docker,migrations}`, `tests/fixtures` |
| 3 — Vertical slice | `apps/api/{agents,tools}`, `apps/web/features/research` |
| 4 — Agent + tool calling | `apps/api/{agents,tools,routes}` |
| 5 — RAG / evidence | `apps/api/{services,repositories}` (documents, chunks, embeddings), `infra/migrations` |
| 6 — Explainability / Challenge AI | `apps/web/features/{research,evidence}`, `apps/api/agents` |
| 7 — Canvas / dynamic workspaces | `apps/web/features/canvas`, `packages/schemas` (workspace schema) |
| 8 — Markets/watchlists/screener | `apps/web/features/{markets,watchlists}`, `apps/api/services` |
| 9 — Accessibility/eval | `apps/web` (a11y pass), `tests/ai`, `tests/e2e` |
| 10 — Production infra | `infra/`, `apps/api/core`, CI/CD config at repo root |

## 3. AI architecture

```
User Question
   -> Intent Detection
   -> Research Planner
   -> Tool Selection --------------------+
        |                                |
   Financial Tools                      RAG
   (market/news/earnings)          (documents/filings)
        |                                |
        +----------------+---------------+
                          v
                 Deterministic Analysis   (apps/api/services — pure calculations)
                          v
                     LLM Synthesis        (apps/api/agents — interpretation only)
                          v
                 Evidence Association
                          v
                Confidence / Uncertainty
                          v
              Validated Workspace JSON    (packages/schemas — zod-validated)
                          v
                Trusted UI Components     (apps/web — renders only validated schema)
```

Key components, all provider-agnostic:

- `LLMProvider` — interface implemented per vendor (OpenAI, Anthropic, Google, local).
- `ModelRouter` — picks Strong/Fast/Local model per task.
- `AIOrchestrator` — runs the plan -> tools -> synthesis -> evidence pipeline.

The LLM never outputs financial facts directly to the user — it outputs a
structured plan or a synthesis that references calculations and evidence
already produced deterministically by `apps/api/services`. See `ai-agent.md`.

## 4. Non-negotiable boundaries

- Frontend never calls financial/LLM providers directly.
- LLM output that becomes UI must validate against `packages/schemas` (Pydantic on the backend, generated TS types on the frontend) before rendering — no arbitrary LLM-generated executable code.
- No hidden chain-of-thought is exposed to the user — only actions, evidence, sources, assumptions, calculations, and confidence.
- Every conclusion must be traceable to FACT, CALCULATION, AI INTERPRETATION, HYPOTHESIS, or USER ASSUMPTION (see `security.md`).
- **Every dependency added to `apps/api` or `apps/web`, in any phase, is checked before it's used** — package existence/maintainer reputation, known CVEs, and a manual read of anything unusual (postinstall scripts, obfuscated code, unexpectedly broad permissions). See `security.md` §Supply-chain checks. This gate blocks the phase, same as a failing test.

## 5. Phase 0 deliverable status

This document, together with `database.md`, `api.md`, `ai-agent.md`, `ux.md`,
`design-system.md`, `workspace-schema.md`, `security.md`, and `testing.md`,
constitutes the full Phase 0 deliverable. No application code is included in
this phase, per the master spec.
