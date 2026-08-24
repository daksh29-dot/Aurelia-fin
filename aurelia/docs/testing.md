# Testing Strategy

## Phase-gate workflow (mandatory, every phase)

```
IMPLEMENT -> RUN -> TEST -> REVIEW -> FIX -> USER FEEDBACK -> TWEAK -> APPROVE -> NEXT PHASE
```

No phase begins until the previous phase's report is explicitly approved.

## Categories

**Automated** — unit (`tests/unit`), integration (`tests/integration`),
API/schema validation, component tests, e2e (`tests/e2e`).

**Visual** — theme testing (dark/light/system), responsive testing, glass UI
consistency (spacing/blur/border tokens applied, not hard-coded).

**Functional** — the real user workflow end to end (e.g. the full "Why did
NVDA move?" journey), not just isolated units.

**Performance** — API latency, render performance, memory, canvas
performance at scale, agent latency (time to first token / time to plan).

**AI evaluation** — a fixed dataset of research questions with known-good
expected evidence/claims lives in `tests/ai/fixtures`; the harness in
`tests/ai` scores the agent's plan quality, evidence grounding, and claim
categorization against it after every change to `apps/api/agents`.

**Manual UX** — a human visually inspects the interface after every phase
with UI changes; this is not optional and is not replaced by automated tests.

## Phase report format (produced at the end of every phase)

```
PHASE X REPORT

Implemented:
- ...

Files changed:
- ...

Dependencies added:
- ... (or "none")

Supply-chain check:
- Ran npm audit / pip-audit: <clean | N findings, resolved as: ...>
- New packages verified legitimate (no typosquats, active maintainers): yes/no
- Generated code scanned for secrets/exfiltration/obfuscation: yes/no

Tests:
- ...

Passed:
- ...

Failed:
- ...

Known issues:
- ...

Recommended tweaks:
- ...

Next phase:
- ...
```

Then stop and wait for explicit approval before starting the next phase.
