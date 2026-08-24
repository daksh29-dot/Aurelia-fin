"use client";
import { useEffect } from "react";

export function useKeyboardShortcuts(handlers: {
  onCommandBar?: () => void;
  onToggleSidebar?: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handlers.onCommandBar?.();
      }
      if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handlers.onToggleSidebar?.();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handlers]);
}
