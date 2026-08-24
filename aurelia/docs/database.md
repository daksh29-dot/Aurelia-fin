# Database

PostgreSQL is primary storage. pgvector extension handles embeddings (Phase 5).
Redis handles caching, rate limiting, background jobs, and streaming state.

## Entities (Phase 2+ introduces these incrementally — full map below)

```
users                 id, email, name, created_at
user_preferences      user_id, theme, keyboard_prefs, default_view

workspaces            id, user_id, type, title, layout_json, created_at, updated_at
research_sessions     id, workspace_id, user_id, query, status, created_at
research_messages     id, session_id, role(user/agent), content, created_at
agent_runs            id, session_id, plan_json, status, started_at, finished_at
agent_actions         id, agent_run_id, tool_name, input_json, output_json, latency_ms

companies             id, ticker, name, sector, industry
securities             id, company_id, exchange, currency
market_snapshots      id, security_id, price, change_pct, volume, as_of

documents             id, source, title, publisher, publication_date, company_id,
                       ticker, document_type, url, retrieval_timestamp
document_chunks       id, document_id, chunk_index, text, token_count
evidence              id, document_chunk_id, research_session_id, relevance_score

research_nodes        id, workspace_id, type, content_json, position_x, position_y
research_edges        id, workspace_id, from_node_id, to_node_id, relation

watchlists            id, user_id, name
watchlist_items       id, watchlist_id, security_id

saved_queries         id, user_id, query_text, created_at
```

## Notes

- `documents` / `document_chunks` / `evidence` back the RAG layer (Phase 5) —
  every `evidence` row must point to a real `document_chunk`, never a
  synthesized citation.
- `research_nodes` / `research_edges` back the research canvas (Phase 7).
- `agent_runs` / `agent_actions` give full auditability of what the agent did,
  without exposing hidden reasoning to the end user — the UI surfaces
  `tool_name` + a human-readable summary, not raw chain-of-thought.
- Vector embeddings live either as a `vector` column on `document_chunks`
  (pgvector) or in a dedicated vector store, decided in Phase 5 based on scale.
- Migrations live in `infra/migrations/`, one file per change, applied in order.
