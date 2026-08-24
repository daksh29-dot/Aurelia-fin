import { GlassPanel } from "./glass-panel";

type Evidence = { id: string; title: string; source: string; date: string; type: string };

export function EvidenceList({ items }: { items: Evidence[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.id}>
          <GlassPanel className="flex items-center justify-between gap-4 px-3.5 py-3 hover:bg-surface-hover cursor-pointer">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-text-primary">{item.title}</span>
              <span className="text-xs text-text-muted">
                {item.source} · {item.date}
              </span>
            </div>
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-text-secondary">
              {item.type}
            </span>
          </GlassPanel>
        </li>
      ))}
    </ul>
  );
}
