/**
 * @dte/landing — optional React mount point (scaffold).
 *
 * The live site boots from index.html + src/script.ts (vanilla TS).
 * This file is intentionally inert until React is installed
 * (see App.tsx header comment). Keeping it as .tsx preserves the
 * upgrade path and keeps editors/tsc happy in strict mode.
 */
import { appName, appTagline } from "./App";

const bootMessage = (): string =>
  `${appName} — ${appTagline} | landing runtime: vanilla TS (no framework needed)`;

if (typeof document !== "undefined") {
  document.documentElement.dataset.dteRuntime = "vanilla-ts";
}

export const boot = bootMessage;
export default boot;
