"use client";
import { Modal } from "./modal";
import { Input } from "./input";
import { tickers } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CommandBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const matches = query
    ? tickers.filter(
        (t) =>
          t.symbol.toLowerCase().includes(query.toLowerCase()) ||
          t.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function goToResearch() {
    router.push(`/research${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    onClose();
    setQuery("");
  }

  return (
    <Modal open={open} onClose={onClose} title="Search or ask AURELIA">
      <Input
        autoFocus
        placeholder="Ask a question, or search a ticker / company…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && goToResearch()}
      />
      <div className="mt-3 flex flex-col gap-1">
        {matches.map((t) => (
          <button
            key={t.symbol}
            onClick={() => {
              router.push(`/research?ticker=${t.symbol}`);
              onClose();
            }}
            className="flex items-center justify-between rounded-[var(--radius)] px-2.5 py-2 text-left text-sm hover:bg-surface-hover"
          >
            <span className="text-text-primary">{t.name}</span>
            <span className="font-mono figure text-text-muted">{t.symbol}</span>
          </button>
        ))}
        {query && (
          <button
            onClick={goToResearch}
            className="mt-1 rounded-[var(--radius)] border border-[var(--ai-accent)] px-2.5 py-2 text-left text-sm text-[var(--ai-accent)] hover:bg-surface-hover"
          >
            Ask AURELIA: “{query}”
          </button>
        )}
        {!query && (
          <p className="px-2.5 py-2 text-xs text-text-muted">
            Try “Why did NVDA move today?” or type a ticker.
          </p>
        )}
      </div>
    </Modal>
  );
}
