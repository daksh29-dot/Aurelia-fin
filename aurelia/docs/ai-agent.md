# AI Agent Architecture

## Provider abstraction

```python
# apps/api/agents/llm_provider.py (Phase 4)
class LLMProvider(Protocol):
    async def complete(self, input: CompletionInput) -> CompletionOutput: ...
    async def stream(self, input: CompletionInput) -> AsyncIterator[CompletionChunk]: ...
```

Implementations: `OpenAIProvider`, `AnthropicProvider`, `GoogleProvider`,
`LocalModelProvider` — all behind the same interface. No other module ever
imports a vendor SDK directly.

## ModelRouter

Picks a provider/model per task class:

- **Strong** — planning, synthesis, hypothesis generation, challenge responses.
- **Fast** — intent classification, simple extraction, retries.
- **Local** — optional, for offline/cost-sensitive dev and testing.

## AIOrchestrator pipeline

```
1. Intent Detection      classify the question (single-company, comparison, macro, etc.)
2. Research Planner      LLM proposes a plan: which tools, in what order
3. Tool Selection        validated against the registered tool schema (packages/schemas)
4. Tool Execution        apps/api/tools/* — market data, news, filings, RAG retrieval
5. Deterministic Analysis  apps/api/services/* — all math happens here, not in the LLM
6. LLM Synthesis          LLM explains the deterministic results, cites evidence
7. Evidence Association   every claim in the synthesis is linked to a document_chunk or calculation id
8. Confidence Assignment  explicit FACT / CALCULATION / AI INTERPRETATION / HYPOTHESIS / USER ASSUMPTION tagging
9. Workspace JSON         validated against packages/schemas workspace schema
10. Render                apps/web renders only the validated schema — never raw LLM markup
```

## Tools (registered, versioned, schema-validated in/out)

```
get_price(ticker, range)
get_company_profile(ticker)
get_financials(ticker, statement, period)
get_news(ticker | topic, range)
get_filings(ticker, type)
search_evidence(query, filters)     // RAG retrieval
compare_companies(tickers[])
```

Each tool has a Pydantic input schema and output schema in `packages/schemas`
(generated to/from JSON Schema so `apps/web` gets matching TS types).
The agent cannot call an unregistered tool, and tool output is validated
before it re-enters the LLM context (defense against malformed/malicious
retrieved content — see `security.md`).

## Challenge AI

A user can challenge any conclusion (`POST /api/research/:id/challenge`).
The orchestrator re-runs synthesis with the challenge as additional context,
re-checks the evidence, and either revises the conclusion, defends it with
more evidence, or downgrades its confidence — recorded as a new
`research_message`, never silently overwriting history.

## What the LLM is never allowed to do

- Invent a citation or numeric fact not backed by a tool result.
- Emit directly-renderable UI code (HTML/JS) — only schema-validated JSON.
- See or influence other users' data.
- Have its raw reasoning shown to the user.
