"use client";
import { GlassPanel } from "@/components/glass-panel";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs } from "@/components/tabs";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted">Manage appearance and preferences.</p>
      </div>

      <GlassPanel className="p-4">
        <Tabs
          tabs={[
            {
              id: "appearance",
              label: "Appearance",
              content: (
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-text-primary">Theme</p>
                    <p className="text-xs text-text-muted">Dark, light, or match system.</p>
                  </div>
                  <ThemeToggle />
                </div>
              ),
            },
            {
              id: "shortcuts",
              label: "Keyboard shortcuts",
              content: (
                <ul className="flex flex-col gap-2 text-sm">
                  {[
                    ["⌘/Ctrl + K", "Open command bar"],
                    ["⌘/Ctrl + B", "Toggle sidebar"],
                    ["Esc", "Close modal or drawer"],
                  ].map(([key, desc]) => (
                    <li key={key} className="flex items-center justify-between py-1">
                      <span className="text-text-secondary">{desc}</span>
                      <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-text-muted">
                        {key}
                      </span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "account",
              label: "Account",
              content: <p className="py-2 text-sm text-text-muted">Account management arrives in Phase 10.</p>,
            },
          ]}
        />
      </GlassPanel>
    </div>
  );
}
