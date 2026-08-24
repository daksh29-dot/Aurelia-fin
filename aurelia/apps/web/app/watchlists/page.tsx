"use client";
import { GlassPanel } from "@/components/glass-panel";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/button";
import { watchlist } from "@/lib/mock-data";
import { formatPercent } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WatchlistsPage() {
  const router = useRouter();
  const [items] = useState(watchlist);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Watchlists</h1>
          <p className="text-sm text-text-muted">Tickers you&apos;re tracking.</p>
        </div>
        <Button variant="primary">New watchlist</Button>
      </div>

      <GlassPanel className="p-4">
        <h2 className="mb-3 text-sm font-semibold text-text-primary">My Watchlist</h2>
        {items.length === 0 ? (
          <EmptyState
            title="No tickers yet"
            description="Add a company from Markets or Research to start tracking it here."
          />
        ) : (
          <DataTable
            onRowClick={(r) => router.push(`/research?ticker=${r.symbol}`)}
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
            rows={items}
          />
        )}
      </GlassPanel>
    </div>
  );
}
