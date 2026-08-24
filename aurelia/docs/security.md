# Security Model

## Supply-chain checks (every phase, no exceptions)

Before any new dependency is added to `apps/web/package.json` or
`apps/api/pyproject.toml`, and before any phase is reported as complete:

1. **Known-vulnerability scan** — `npm audit` (web) and `pip-audit` (api)
   run against the actual lockfile, not just skimmed by eye. Any high/critical
   finding blocks the phase until fixed or explicitly accepted with a reason.
2. **Package legitimacy check** — for any new (not already-vetted) package:
   confirm it's the real, official package (not a typosquat — e.g. `reqeusts`
   vs `requests`), check download counts/maintainer activity are consistent
   with a real, maintained project, and prefer packages already widely used
   in production rather than obscure alternatives.
3. **Script/behavior review** — flag and manually inspect any package with a
   postinstall/preinstall script, `eval`/dynamic `exec` of remote content, or
   network calls unrelated to its stated purpose. This applies to both
   npm packages (postinstall hooks) and Python packages (`setup.py` with
   arbitrary code, not just declarative `pyproject.toml`).
4. **Generated code review** — before code is delivered in any phase, scan it
   for: hardcoded credentials/keys, network calls to undeclared/unexpected
   hosts, obfuscated or minified inline code that isn't from a legitimate
   build tool, `eval`/`exec` of dynamic strings, disabled TLS verification,
   and anything that reads/exfiltrates data outside the stated feature scope.
5. **Report it** — the phase report (`testing.md` format) includes a
   "Dependencies added" line and a one-line statement that this check was run,
   not just that tests passed.

This is a hard gate, same weight as a failing test — a phase is not complete
if this hasn't been done, even if the code otherwise builds and works.

## Principles

- Provider API keys live server-side only (`apps/api/core/config`), never
  shipped to the client.
- All input validated at the route boundary (`packages/schemas`); all output
  validated before render (workspace schema).
- No arbitrary code execution from LLM output — ever. The LLM produces JSON,
  not HTML/JS.
- Retrieved content (news, filings, web) is sanitized before it enters the
  LLM context — treated as untrusted, not as instructions.

## Prompt-injection defenses

- Tool outputs and retrieved documents are wrapped in clearly-delimited,
  non-instructable data blocks in the prompt; the system prompt explicitly
  tells the model retrieved content is data, not commands.
- The agent's tool registry is a fixed allowlist — the model cannot invoke
  anything not explicitly registered, regardless of what retrieved text says.
- Claims extracted from retrieved content are still subject to the workspace
  schema's evidence-linking requirement — an injected instruction can't
  produce an unlinked, uncategorized claim that reaches the UI.

## SSRF protection

- Any provider/tool that fetches a URL (filings, news links) uses an
  allowlisted domain set and blocks internal/private IP ranges at the
  fetch layer in `apps/api/tools`.

## Financial safety — claim categories

Every claim shown to the user is tagged as exactly one of:

```
FACT               Directly sourced, unmodified data point
CALCULATION        Deterministic output of apps/api/services math
AI INTERPRETATION  LLM synthesis/explanation of the above
HYPOTHESIS         Explicitly speculative, flagged as such
USER ASSUMPTION    Something the user asserted, not verified by AURELIA
```

An AI interpretation is never presented with the same visual weight as a
verified fact — the UI (Phase 6) must visually distinguish these categories.

## AuthN/AuthZ (hardened in Phase 10)

- Session-based auth on `apps/api`.
- Row-level ownership checks on workspaces/research_sessions/watchlists —
  a user can never read another user's research state.
- Rate limiting via Redis on `/api/research` and `/api/agent/*`.

## Out of scope for Phase 0

Actual implementation of auth, rate limiting, and SSRF filtering happens in
later phases (2, 4, 10). This document defines the requirements those phases
must satisfy.
