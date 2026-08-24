"use client";
import { useState } from "react";
import { GlassPanel } from "@/components/glass-panel";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { FactorBars } from "@/components/factor-bars";
import { EvidenceList } from "@/components/evidence-list";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { ClaimTag } from "@/components/claim-tag";
import { Tabs } from "@/components/tabs";
import { EmptyState } from "@/components/empty-state";
import { factorBreakdown, evidenceItems } from "@/lib/mock-data";

const planSteps = [
  "Detecting intent",
  "Fetching price & volume",
  "Fetching recent news",
  "Fetching earnings data",
  "Analyzing factors",
  "Synthesizing explanation",
];

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [challenge, setChallenge] = useState("");
  const [challenged, setChallenged] = useState(false);

  function runResearch() {
    if (!query.trim()) return;
    setSubmitted(true);
    setStepIndex(0);
    setChallenged(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStepIndex(i);
      if (i >= planSteps.length) clearInterval(interval);
    }, 450);
  }

  const done = stepIndex >= planSteps.length;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">Research</h1>
        <p className="text-sm text-text-muted">Ask a question about any company or market event.</p>
      </div>

      <GlassPanel className="flex gap-2 p-3">
        <Input
          placeholder="Why did NVDA move today?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runResearch()}
        />
        <Button variant="primary" onClick={runResearch}>
          Ask
        </Button>
      </GlassPanel>

      {!submitted && (
        <EmptyState
          title="No research session yet"
          description="Ask a question above — AURELIA plans a research approach, pulls data and evidence, and explains its reasoning with sources."
        />
      )}

      {submitted && (
        <GlassPanel className="p-4">
          <div className="mb-4 flex flex-col gap-1.5" aria-label="Agent activity">
            {planSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i < stepIndex ? "bg-positive" : i === stepIndex ? "bg-[var(--ai-accent)] animate-pulse" : "bg-surface"
                  }`}
                  aria-hidden
                />
                <span className={i <= stepIndex ? "text-text-primary" : "text-text-muted"}>{step}</span>
              </div>
            ))}
          </div>

          {done && (
            <div className="flex flex-col gap-6 border-t border-border pt-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <ClaimTag category="AI_INTERPRETATION" />
                  <ConfidenceIndicator level="high" />
                </div>
                <p className="text-sm leading-relaxed text-text-primary">
                  NVDA rose 4.31% today, primarily driven by a data center revenue beat and raised
                  forward guidance disclosed in this morning&apos;s earnings release. Sector-wide AI
                  capital expenditure momentum likely contributed as a secondary tailwind, and some
                  of the move may reflect short covering into the print.
                </p>
              </div>

              <Tabs
                tabs={[
                  {
                    id: "factors",
                    label: "Factor breakdown",
                    content: <FactorBars factors={factorBreakdown} />,
                  },
                  {
                    id: "evidence",
                    label: "Evidence",
                    content: <EvidenceList items={evidenceItems} />,
                  },
                ]}
              />

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium text-text-secondary">Challenge this conclusion</p>
                {!challenged ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. Wasn&apos;t this mostly short covering?"
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                    />
                    <Button onClick={() => challenge.trim() && setChallenged(true)}>Challenge</Button>
                  </div>
                ) : (
                  <GlassPanel className="p-3">
                    <div className="mb-1.5 flex items-center gap-2">
                      <ClaimTag category="AI_INTERPRETATION" />
                      <ConfidenceIndicator level="medium" />
                    </div>
                    <p className="text-sm text-text-primary">
                      Short covering likely explains part of the intraday volatility, but volume
                      and options flow suggest it was a minor factor compared to the earnings beat
                      — confidence on the primary driver stays high; confidence on the short-covering
                      weighting is downgraded to medium pending further data.
                    </p>
                  </GlassPanel>
                )}
              </div>
            </div>
          )}
        </GlassPanel>
      )}
    </div>
  );
}
