"use client";
import { GlassPanel } from "@/components/glass-panel";
import { Metric } from "@/components/metric";
import { DataTable } from "@/components/data-table";
import { indices, tickers, newsItems } from "@/lib/mock-data";
import { formatPercent } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">Good afternoon</h1>
        <p className="text-sm text-text-muted">Here&apos;s what&apos;s moving markets today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {indices.map((idx) => (
          <GlassPanel key={idx.name} className="p-4">
            <Metric label={idx.name} value={idx.value.toLocaleString()} changePct={idx.changePct} />
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassPanel className="p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">Movers</h2>
            <Link href="/markets" className="text-xs text-[var(--ai-accent)] hover:underline">
              View markets →
            </Link>
          </div>
          <DataTable
            columns={[
              { key: "symbol", header: "Ticker", render: (r) => <span className="font-mono figure">{r.symbol}</span> },
              { key: "name", header: "Company", render: (r) => r.name },
              {
                key: "price",
                header: "Price",
                align: "right",
                render: (r) => <span className="font-mono figure">${r.price.toFixed(2)}</span>,
              },
              {
                key: "change",
                header: "Change",
                align: "right",
                render: (r) => (
                  <span className={`font-mono figure ${r.changePct >= 0 ? "text-positive" : "text-negative"}`}>
                    {formatPercent(r.changePct)}
                  </span>
                ),
              },
            ]}
            rows={tickers}
          />
        </GlassPanel>

        <GlassPanel className="p-4">
          <h2 className="mb-3 text-sm font-semibold text-text-primary">Latest news</h2>
          <ul className="flex flex-col gap-3">
            {newsItems.map((n) => (
              <li key={n.id} className="text-sm">
                <p className="text-text-primary">{n.headline}</p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {n.ticker} · {n.source} · {n.time}
                </p>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>

      <GlassPanel className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Ask AURELIA</h2>
          <p className="text-xs text-text-muted">“Why did NVDA move today?” — try the research assistant.</p>
        </div>
        <Link
          href="/research"
          className="rounded-[var(--radius)] bg-[var(--ai-accent)] px-3.5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Start research
        </Link>
      </GlassPanel>
    </div>
  );
}
