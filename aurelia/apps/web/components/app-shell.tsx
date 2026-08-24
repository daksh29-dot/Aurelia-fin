"use client";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandBar } from "./command-bar";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useKeyboardShortcuts({
    onCommandBar: () => setCommandOpen(true),
    onToggleSidebar: () => setCollapsed((c) => !c),
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onOpenCommandBar={() => setCommandOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <CommandBar open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
