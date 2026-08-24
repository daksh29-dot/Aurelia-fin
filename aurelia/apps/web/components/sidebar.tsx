"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/markets", label: "Markets" },
  { href: "/watchlists", label: "Watchlists" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex h-full flex-col gap-1 border-r border-border bg-[var(--background)] p-2 transition-[width]",
        collapsed ? "w-[64px]" : "w-[220px]"
      )}
      aria-label="Primary"
    >
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm transition-colors",
              active
                ? "bg-surface text-text-primary"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full",
                active ? "bg-[var(--ai-accent)]" : "bg-transparent"
              )}
              aria-hidden
            />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
