# API Contracts

`apps/api` is a Python (FastAPI) service. All endpoints live under
`apps/api/routes`, are thin, validate input with a Pydantic model generated
from `packages/schemas`, and delegate to `apps/api/services`.

```
POST   /api/auth/*                      Auth (Phase 10 hardens this)
GET    /api/search?q=                   Global command-bar search (tickers, companies, docs)
GET    /api/markets/overview            Index snapshot, movers
GET    /api/companies/:ticker           Company profile
GET    /api/companies/:ticker/financials
GET    /api/news?ticker=                News feed
GET    /api/filings?ticker=             Filing list
POST   /api/research                    Start a research session (body: { query })
GET    /api/research/:id                Get session state
POST   /api/research/:id/challenge      Submit a challenge to a conclusion
GET    /api/research/:id/evidence       List evidence backing the session
GET    /api/workspaces                  List user workspaces
GET    /api/workspaces/:id
PUT    /api/workspaces/:id              Save layout/state
POST   /api/canvas/:workspaceId/node    Add/update a canvas node
GET    /api/agent/stream/:runId         SSE stream of agent progress (see below)
GET    /api/watchlists
POST   /api/watchlists
GET    /api/preferences
PUT    /api/preferences
```

## Agent streaming

`POST /api/research` kicks off an `agent_run` and returns `{ runId }`
immediately. The client subscribes to `GET /api/agent/stream/:runId`
(FastAPI `StreamingResponse`, `text/event-stream`) for incremental events:

```
event: plan          { steps: [...] }
event: tool_call      { tool, input }
event: tool_result    { tool, summary }        // summary only, not raw dump
event: analysis       { calculation, result }
event: synthesis      { text, evidenceRefs[] }
event: confidence     { level, rationale }
event: done           { workspaceId }
event: error          { message }
```

No event ever contains hidden chain-of-thought — only the action taken and
its result, matching the "no hidden reasoning" rule in `security.md`.

## Response conventions

- All list endpoints paginate (`?cursor=&limit=`).
- All monetary/percentage values are returned as typed numbers with an
  explicit `unit` field, never pre-formatted strings, so the frontend can
  render consistently across locales.
- Errors follow `{ error: { code, message, details? } }`.
