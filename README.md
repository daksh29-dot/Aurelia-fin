# AURELIA — Master Build Specification v2

## Purpose

AURELIA is an AI-native financial research terminal combining:

- Professional financial research
- Explainable AI
- AI research agents
- Human + AI collaboration
- A Figma-like research canvas
- Adaptive/dynamic research workspaces
- Restrained glass UI with Dark/Light/System themes

**Core rule:** Build incrementally. Every phase must be independently runnable, tested, reviewed, and adjustable before moving to the next phase.

---

# 1. Product Vision

A user should be able to ask:

> Why did NVIDIA move today?

or:

> Compare NVIDIA and AMD and determine whether NVIDIA's valuation is justified.

AURELIA should:

1. Understand intent.
2. Create a research plan.
3. Retrieve required data.
4. Run deterministic financial calculations.
5. Use an LLM for interpretation and synthesis.
6. Link conclusions to evidence.
7. Show uncertainty and assumptions.
8. Allow the user to challenge conclusions.
9. Persist findings in a research canvas.
10. Adapt the workspace to the task.

The final product should feel like:

**Professional financial terminal + AI research agent + explainable AI + Figma-like research canvas**

It must not look like a generic colorful AI SaaS dashboard.

---

# 2. AI Strategy

## Do not train a foundation model initially

Use an LLM through a provider abstraction.

Possible providers:

- OpenAI
- Anthropic
- Google
- Local/open-weight models

Architecture:

```text
                         AURELIA
                            |
                     MODEL ROUTER
                            |
          +-----------------+----------------+
          |                 |                |
       Strong LLM        Fast LLM       Local Model
          |                 |                |
          +-----------------+----------------+
                            |
                    AI ORCHESTRATOR
                            |
       +--------------------+--------------------+
       |                    |                    |
     Tools                  RAG             Finance Engine
       |                    |                    |
 Market/News/Filings   Evidence DB       Calculations
```

Create:

```text
LLMProvider
ModelRouter
AIOrchestrator
```

The LLM is not the source of financial truth.

AURELIA owns:

- Financial calculations
- Data normalization
- Evidence retrieval
- Source tracking
- Research state
- Confidence representation
- Hypothesis comparison
- Workspace schemas
- Dynamic UI component selection
- Research canvas
- Evaluation framework

The LLM handles:

- Language understanding
- Research planning
- Tool selection
- Synthesis
- Natural-language explanations
- Hypothesis generation
- Workspace specification suggestions

---

# 3. Core AI Architecture

```text
User Question
      |
      v
Intent Detection
      |
      v
Research Planner
      |
      v
Tool Selection
      |
      +-----------------------+
      |                       |
      v                       v
Financial Tools              RAG
      |                       |
      v                       v
Market Data               Documents
News                      Filings
Earnings                  Research
      |                       |
      +-----------+-----------+
                  |
                  v
          Deterministic Analysis
                  |
                  v
             LLM Synthesis
                  |
                  v
          Evidence Association
                  |
                  v
        Confidence / Uncertainty
                  |
                  v
        Validated Workspace JSON
                  |
                  v
        Trusted UI Components
```

Do not expose hidden chain-of-thought. Show high-level actions, evidence, sources, assumptions, calculations and uncertainty.

---

# 4. Core Vertical Slice

This is the most important workflow:

```text
"Why did NVDA move?"
        ↓
Research Agent
        ↓
Price + News + Earnings
        ↓
Analysis
        ↓
Explanation
        ↓
Evidence + Sources
        ↓
Confidence
        ↓
Challenge AI
        ↓
Research Canvas
```

This should be fully functional before attempting every advanced feature.

---

# 5. Visual Design

## Design philosophy

**Minimal. Glass. Professional. Dense. Calm. Financial. Monochrome.**

Use glass UI, but keep it restrained.

Avoid:

- Bright gradients
- Rainbow charts
- Neon borders
- Excessive glow
- Huge cards
- Cartoon illustrations
- Marketing-style layouts
- Excessive animation

Prefer:

- Near-black / graphite
- Translucent glass
- Backdrop blur
- Subtle borders
- Off-white typography
- Gray secondary text
- Fine separators
- Dense information
- Small semantic accents

The UI should remain professional if accent colors are removed.

---

# 6. Theme System

Required:

```text
Dark
Light
System
```

Dark is the default.

Persist the selection.

Use CSS/design tokens:

```css
--background
--surface-glass
--surface-glass-hover
--border-subtle
--text-primary
--text-secondary
--text-muted
--positive
--negative
--warning
--ai-accent
--shadow
--blur
--radius
```

Never scatter hard-coded colors across components.

---

# 7. Main Application Shell

```text
┌──────────────────────────────────────────────────────────────┐
│ AURELIA      Search / Ask AI                    Theme User  │
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

Sidebar must be collapsible.

---

# 8. Final Feature Set

Build toward:

1. Home / command center
2. Global command bar
3. Market overview
4. Company research
5. Financial charts
6. Watchlists
7. Screener
8. Company comparison
9. News
10. Earnings
11. Research sessions
12. AI research agent
13. Tool calling
14. RAG
15. Evidence system
16. Explainability
17. Challenge AI
18. Research canvas
19. Human-AI collaboration
20. Dynamic workspaces
21. Theme system
22. Keyboard shortcuts
23. Accessibility
24. Testing/evaluation
25. Production infrastructure

---

# 9. TEN-PHASE DEVELOPMENT PLAN

## PHASE 0 — Architecture + UX Specification

### Goal

Define the system before significant implementation.

### Build/document

- Repository structure
- Architecture
- Database schema
- API contracts
- AI tool interfaces
- Workspace schema
- Design tokens
- UX flows
- Provider interfaces
- Security model
- Testing strategy

Suggested docs:

```text
docs/
├── architecture.md
├── database.md
├── api.md
├── ai-agent.md
├── ux.md
├── design-system.md
├── workspace-schema.md
├── security.md
└── testing.md
```

### Test gate

Verify:

- Architecture is internally consistent.
- API contracts are defined.
- Database entities are mapped.
- Workspace JSON schema exists.
- AI provider abstraction exists.
- Main user journeys are documented.

Do not build the whole application.

---

## PHASE 1 — Glass Design System + Application Shell

### Goal

Create the visual foundation.

Build:

- React/Next.js + TypeScript app
- Design tokens
- Dark/Light/System themes
- Theme persistence
- Sidebar
- Top bar
- Command bar
- Buttons
- Inputs
- Tabs
- Modals
- Drawers
- Tables
- Glass panels
- Loading/empty/error states

Screens:

```text
Home
Research
Markets
Watchlists
Settings
```

Use mock data.

### Test gate

Test:

- Theme switching/persistence
- Responsive behavior
- Keyboard navigation
- Focus states
- Sidebar collapse
- Command bar
- Type checking
- Linting
- Console errors

Perform a manual visual review and fix spacing, typography, blur, borders and information density before proceeding.

---

## PHASE 2 — Financial Data Foundation

### Goal

Create a reliable data layer independent of the frontend.

Provider interfaces:

```text
MarketDataProvider
NewsProvider
FinancialDataProvider
FilingProvider
MacroDataProvider
```

Services:

```text
MarketDataService
NewsService
FinancialDataService
FilingService
```

Support:

- Current price
- Historical price
- OHLCV
- Company profile
- Market cap
- Financial statements
- Earnings
- News
- Market indices
- Basic macro data

Use mock providers if necessary.

Use Redis/equivalent for caching.

### Test gate

Test:

- Provider interfaces
- Mock provider
- API responses
- Schema validation
- Error handling
- Missing data
- Rate limits
- Cache behavior

The frontend should be able to request company/market/news data without knowing which provider supplies it.

---

## PHASE 3 — Core Financial Terminal

### Goal

Make AURELIA useful without AI.

Build:

### Company page

```text
Company
Price
Chart
Volume
Market Cap
Valuation
Financials
Earnings
News
```

### Watchlist

```text
NVIDIA
AMD
TSMC
Microsoft
Apple
```

### Comparison

```text
NVIDIA vs AMD
```

### Charts

- Line
- Area
- Candlestick
- Volume
- Comparison
- Performance

### Screener

Basic filters:

```text
Market cap
Revenue growth
P/E
Margins
Sector
```

### Test gate

A user must be able to:

1. Search a company.
2. Open it.
3. View current data.
4. View historical charts.
5. Add it to a watchlist.
6. Compare two companies.
7. Filter companies.

---

## PHASE 4 — Research Workspace

### Goal

Build the research UX before complex AI.

Example:

> Why did NVIDIA increase today?

Create:

```text
Research Session
 |
 +-- Question
 +-- Company
 +-- Price
 +-- News
 +-- Earnings
 +-- Factors
 +-- Sources
```

Build:

- Research session creation
- Session history
- Workspace tabs
- Company header
- AI summary placeholder
- Factor contribution UI
- Evidence panel
- Source panel
- Research timeline
- Follow-up input

Initially use deterministic/mock analysis.

### Test gate

Create 10–20 predefined research questions.

Check:

- Layout
- Information hierarchy
- Task completion time
- Whether factors are understandable
- Whether sources are discoverable
- Whether follow-up interaction is clear

Fix UX issues before adding the real agent.

---

## PHASE 5 — AI Research Agent

### Goal

Replace mock intelligence with a real orchestrated agent.

Architecture:

```text
User
 ↓
Intent Detector
 ↓
Research Planner
 ↓
Tool Selection
 ↓
Tool Execution
 ↓
Data Collection
 ↓
Analysis
 ↓
LLM Synthesis
```

Tools:

```text
get_stock_price()
get_historical_prices()
get_company_profile()
get_financial_statements()
get_earnings()
get_news()
search_filings()
get_sector_data()
get_macro_data()
calculate_valuation()
compare_companies()
```

Agent activity:

```text
RESEARCH AGENT

✓ Retrieved market data
✓ Retrieved relevant news
✓ Retrieved earnings data
→ Comparing factors
○ Generating explanation
```

Model router:

```text
Simple task → fast model
Complex research → strong model
Classification → small/local model
Private/offline → local model
```

### Test gate

Create an evaluation set of at least 20–50 questions.

Measure:

- Correct tool selection
- Tool failure recovery
- Response latency
- Factual correctness
- Missing evidence
- Hallucinations
- Structured-output validity

Do not proceed until the vertical slice works reliably.

---

## PHASE 6 — Evidence + Explainability

### Goal

Make important AI conclusions inspectable.

Structure:

```text
Conclusion
 ↓
Factors
 ↓
Evidence
 ↓
Sources
```

Show:

- Conclusion
- Factor contribution
- Confidence
- Supporting evidence
- Contradicting evidence
- Assumptions
- Limitations
- Calculations
- Sources

### Challenge AI

User:

> I think sector momentum was more important.

System compares:

```text
Original hypothesis
82%

Alternative hypothesis
71%

Supporting evidence
...

Contradicting evidence
...
```

### Test gate

Evaluate:

- Citation correctness
- Evidence coverage
- Contradiction handling
- Confidence calibration
- User ability to verify conclusions

---

## PHASE 7 — Human-AI Research Canvas

### Goal

Turn research into an interactive knowledge workspace.

Use a graph/canvas library such as React Flow.

Node types:

```text
Company
Metric
Event
News
Hypothesis
Evidence
Risk
Conclusion
Source
Organization
Market
Sector
```

Actions:

- Create/delete/move nodes
- Connect nodes
- Group nodes
- Add notes
- Attach evidence
- Attach sources
- Ask AI about a node
- Expand a node
- Find supporting evidence
- Find contradicting evidence

### Test gate

Test:

- 50+ nodes
- 100+ edges
- Pan/zoom
- Search
- Selection
- Save/load
- Undo/redo where appropriate
- AI-generated nodes
- Evidence attachment

---

## PHASE 8 — Dynamic UI Generation

### Goal

Allow the interface to adapt to the research question.

Examples:

```text
Why did NVDA move?
→ Price + News + Factors + Evidence

Compare NVIDIA and AMD
→ Comparison + Valuation + Growth + Margins + Risks

What are NVIDIA's biggest risks?
→ Risk matrix + Risk tree + Evidence + Scenarios
```

Architecture:

```text
Question
 ↓
LLM
 ↓
Workspace JSON
 ↓
JSON Schema validation
 ↓
Trusted component renderer
 ↓
UI
```

Never allow arbitrary executable React/HTML from the LLM.

Example:

```json
{
  "workspace": {
    "title": "NVIDIA Risk Analysis",
    "layout": "research",
    "components": [
      {
        "type": "risk_matrix",
        "data": "nvidia_risks"
      },
      {
        "type": "evidence_panel",
        "data": "risk_sources"
      }
    ]
  }
}
```

### Test gate

Use at least 30 research prompts.

Verify:

- Correct workspace type
- Valid JSON
- No unsupported components
- Graceful fallback
- No arbitrary code
- Reasonable layouts
- Theme compatibility
- Accessibility

---

## PHASE 9 — Evaluation + Optimization

### AI metrics

- Factual accuracy
- Citation accuracy
- Evidence coverage
- Hallucination rate
- Confidence calibration
- Tool selection accuracy
- Tool failure recovery
- Latency
- Cost per task

### UX metrics

Compare:

```text
Traditional financial interface
              VS
AURELIA
```

Example task:

> Determine why NVIDIA moved today and identify the three strongest supporting factors.

Measure:

- Task completion time
- Number of interactions
- Information retrieval accuracy
- User confidence
- Cognitive load
- Usability
- Error rate

### Performance

Measure:

- First response latency
- Agent completion time
- API latency
- Database latency
- Canvas responsiveness
- Cache hit rate

### Test gate

Create repeatable evaluation scripts and store results.

---

## PHASE 10 — Production + Research Paper

### Production

Implement:

- Authentication
- Authorization
- API-key protection
- Rate limiting
- Logging
- Monitoring
- Error tracking
- Caching
- Background jobs
- Security controls
- CI/CD
- Deployment
- Automated tests
- Backups

### Security

Include:

- Input validation
- Output validation
- Prompt-injection defenses
- SSRF protection
- Source sanitization
- No arbitrary code execution
- LLM UI schema validation

### Financial safety

Clearly distinguish:

```text
FACT
CALCULATION
AI INTERPRETATION
HYPOTHESIS
USER ASSUMPTION
```

Never present an AI interpretation as verified fact.

### Research paper direction

Potential title:

> Adaptive AI-Generated Interfaces for Evidence-Grounded Financial Research

Possible sections:

```text
Abstract
Introduction
Related Work
System Architecture
AI Architecture
UX Design
Research Methodology
Experimental Setup
Results
Discussion
Limitations
Future Work
Conclusion
```

---

# 10. Testing After EVERY Phase

AURELIA must use a phase-gated workflow:

```text
IMPLEMENT
   ↓
RUN
   ↓
TEST
   ↓
REVIEW
   ↓
FIX
   ↓
USER FEEDBACK
   ↓
TWEAK
   ↓
APPROVE
   ↓
NEXT PHASE
```

Testing categories:

### Automated

- Unit
- Integration
- API
- Schema
- Component
- E2E

### Visual

- Screenshot comparison where useful
- Theme testing
- Responsive testing
- Glass UI consistency

### Functional

Test the real user workflow.

### Performance

Track:

- API latency
- Rendering
- Memory
- Canvas performance
- Agent latency

### AI

Maintain a fixed evaluation dataset.

### Manual UX

Manually inspect the interface after each phase.

---

# 11. Phase Approval Protocol

Claude/Codex must NOT automatically move to the next phase.

At the end of each phase, output:

```text
PHASE X REPORT

Implemented:
- ...

Files changed:
- ...

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

Then stop and wait for approval.

If changes are requested, modify the current phase and rerun its tests.

---

# 12. Repository Structure

```text
aurelia/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── home/
│   │   │   ├── research/
│   │   │   ├── markets/
│   │   │   ├── watchlists/
│   │   │   ├── canvas/
│   │   │   ├── evidence/
│   │   │   └── settings/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── styles/
│   └── api/
│       ├── routes/
│       ├── services/
│       ├── agents/
│       ├── tools/
│       ├── models/
│       ├── repositories/
│       └── core/
├── packages/
│   ├── ui/
│   ├── schemas/
│   ├── types/
│   └── config/
├── infra/
│   ├── docker/
│   └── migrations/
├── docs/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── ai/
│   └── fixtures/
└── README.md
```

---

# 13. Component Library

Create reusable:

```text
GlassPanel
GlassModal
GlassDrawer
CommandBar
Metric
MetricGrid
FinancialChart
DataTable
ComparisonTable
EvidenceCard
EvidenceList
ConfidenceIndicator
FactorBars
RiskMatrix
ResearchNode
ResearchCanvas
AgentActivity
SourceViewer
Timeline
NewsList
CompanyHeader
Watchlist
SearchResults
AIMessage
UserMessage
WorkspaceTabs
ThemeToggle
```

All components must support all three themes.

---

# 14. API Structure

Suggested:

```text
/api/auth
/api/search
/api/markets
/api/companies
/api/news
/api/filings
/api/research
/api/research/{id}
/api/research/{id}/challenge
/api/research/{id}/evidence
/api/workspaces
/api/workspaces/{id}
/api/canvas
/api/agent
/api/watchlists
/api/preferences
```

Use SSE/WebSockets for agent progress.

---

# 15. RAG / Evidence Layer

```text
Source
 ↓
Document
 ↓
Chunk
 ↓
Embedding
 ↓
Vector DB / pgvector
 ↓
Retriever
 ↓
Evidence
 ↓
AI Analysis
```

Store:

```text
source
title
publisher
publication_date
company
ticker
document_type
url
retrieval_timestamp
```

Never invent citations.

---

# 16. Database

Recommended PostgreSQL entities:

```text
users
workspaces
research_sessions
research_messages
companies
securities
market_snapshots
documents
document_chunks
evidence
research_nodes
research_edges
agent_runs
agent_actions
watchlists
watchlist_items
saved_queries
user_preferences
```

Use pgvector or a dedicated vector DB.

Redis can handle:

- Caching
- Rate limiting
- Background jobs
- Streaming state

---

# 17. Security

Required:

- Authentication
- Authorization
- Server-side provider keys
- Input validation
- Output validation
- Rate limiting
- Prompt-injection defenses
- SSRF protection
- Retrieved-content sanitization
- No arbitrary code execution
- Validated LLM-generated UI schemas

---

# 18. Accessibility + Interaction

Keyboard shortcuts:

```text
Ctrl/Cmd + K       Global command bar
Ctrl/Cmd + Shift+F Search
Ctrl/Cmd + B       Toggle sidebar
Ctrl/Cmd + Enter   Submit AI request
Esc                Close modal/drawer
?                  Keyboard shortcuts
```

Accessibility:

- Keyboard navigation
- Semantic HTML
- ARIA labels
- Visible focus
- Adequate contrast
- Reduced-motion support
- Screen-reader-friendly controls
- Never rely only on color

---

# 19. Implementation Rules for Claude/Codex

## Before coding

1. Inspect the repository.
2. Determine the current stack.
3. Identify the current phase.
4. Read the relevant specification.
5. Make a short plan.
6. Implement only the current phase.

## After coding

1. Run tests.
2. Run lint.
3. Run type checks.
4. Run/build the application.
5. Check console errors.
6. Perform visual review when UI changes.
7. Fix failures.
8. Produce the phase report.
9. Stop and wait for approval.

## Do not

- Build all phases at once.
- Rewrite working code unnecessarily.
- Hard-code financial data in presentation components.
- Couple frontend directly to financial providers.
- Couple AI to one LLM provider.
- Allow arbitrary LLM-generated executable UI code.
- Expose hidden chain-of-thought.
- Invent financial sources.
- Add excessive colors, gradients or glow.
- Move to the next phase without testing.

---

# 20. First Coding-Agent Instruction

When this specification is first given to Claude/Codex:

**Do not build the entire application.**

First:

1. Inspect the repository.
2. Determine whether it is empty or already contains an application.
3. Identify the current technology stack.
4. Compare it against Phase 0.
5. Create a Phase 0 implementation plan.
6. Implement Phase 0 only.
7. Run the Phase 0 checks.
8. Produce the Phase 0 report.
9. Stop and wait for approval.

The project must evolve through controlled iterations.

---

# 21. Definition of Done

The final application should:

- Look professional and restrained.
- Use glass UI without being flashy.
- Support Dark, Light and System themes.
- Provide financial research tools.
- Support AI research.
- Use tools/data rather than hallucinating financial facts.
- Link conclusions to evidence.
- Explain uncertainty.
- Allow users to challenge AI conclusions.
- Provide a research canvas.
- Generate task-specific workspaces safely.
- Be accessible and responsive.
- Be tested and measurable.
- Have modular architecture.
- Have provider abstraction.
- Have an evaluation framework.
- Be suitable for a substantial portfolio project and potential HCI/AI research paper.
