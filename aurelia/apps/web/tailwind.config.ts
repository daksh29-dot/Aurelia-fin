import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface-glass)",
        "surface-hover": "var(--surface-glass-hover)",
        border: "var(--border-subtle)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        positive: "var(--positive)",
        negative: "var(--negative)",
        warning: "var(--warning)",
        "ai-accent": "var(--ai-accent)",
      },
      fontFamily: {
        sans: ["var(--font-ui)", "sans-serif"],
        mono: ["var(--font-data)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      backdropBlur: {
        glass: "var(--blur)",
      },
      boxShadow: {
        glass: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
