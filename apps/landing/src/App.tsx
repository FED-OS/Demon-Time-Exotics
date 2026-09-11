/**
 * @dte/landing — App entry (TypeScript scaffold)
 *
 * The production landing page is framework-free: index.html is the real
 * entry point, with styles from `src/styles/styles.css` and behavior from
 * `src/script.ts` (embers, reveal-on-scroll, stat counters, nav).
 *
 * This App.tsx exists as the optional React/TSX upgrade path (ADR-0007)
 * for teams that later want componentized sections. To activate:
 *   1. `pnpm --filter @dte/landing add react react-dom`
 *   2. Point index.html's script tag at a compiled main.tsx bundle.
 */
export const appName = "DEMON TIME EXOTICS";
export const appTagline = "THE MESSY SHOW";

export interface Section {
  id: string;
  label: string;
}

export const sections: Section[] = [
  { id: "top", label: "Home" },
  { id: "content", label: "Top Content" },
  { id: "pillars", label: "Coverage" },
  { id: "roster", label: "Roster" },
  { id: "hub", label: "Platforms" },
  { id: "support", label: "Support" }
];

export default function App(): string[] {
  return sections.map((s) => s.label);
}
