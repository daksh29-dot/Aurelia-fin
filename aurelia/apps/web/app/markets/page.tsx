"use client";
import { GlassPanel } from "@/components/glass-panel";
import { DataTable } from "@/components/data-table";
import { Metric } from "@/components/metric";
import { tickers, indices } from "@/lib/mock-data";
import { formatPercent, formatCompact } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MarketsPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">Markets</h1>
        <p className="text-sm text-text-muted">Index snapshot and top movers.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {indices.map((idx) => (
          <GlassPanel key={idx.name} className="p-4">
            <Metric label={idx.name} value={idx.value.toLocaleString()} changePct={idx.changePct} />
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="p-4">
        <h2 className="mb-3 text-sm font-semibold text-text-primary">All securities</h2>
        <DataTable
          onRowClick={(r) => router.push(`/research?ticker=${r.symbol}`)}
          columns={[
            { key: "symbol", header: "Ticker", render: (r) => <span className="font-mono figure">{r.symbol}</span> },
            { key: "name", header: "Company", render: (r) => r.name },
            { key: "sector", header: "Sector", render: (r) => <span className="text-text-secondary">{r.sector}</span> },
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
            {
              key: "volume",
              header: "Volume",
              align: "right",
              render: (r) => <span className="font-mono figure text-text-secondary">{formatCompact(r.volume)}</span>,
            },
          ]}
          rows={tickers}
        />
      </GlassPanel>
    </div>
  );
}
