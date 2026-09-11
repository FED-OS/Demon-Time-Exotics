/**
 * @dte/electron — renderer entry.
 *
 * Talks to the main process exclusively through `window.dte` (the
 * preload bridge). Counts stats, renders the platform hub, and pings
 * the main process for the status bar.
 */
import "./styles.css";
import { PLATFORMS } from "@dte/shared";

declare global {
  interface Window {
    dte: {
      appInfo(): Promise<{ version: string; platform: string; electron: string }>;
      openExternal(url: string): Promise<{ ok: boolean; error?: string }>;
      channelStats(): Promise<{ subscribers: number; videos: number; totalViews: number }>;
    };
  }
}

const formatCompact = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${Math.round(n / 100) / 10}K` : `${n}`;

/** Animate hero stat counters (respects prefers-reduced-motion). */
function initCounters(): void {
  const nodes = document.querySelectorAll<HTMLElement>("[data-count]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  nodes.forEach((node) => {
    const target = Number(node.dataset.count ?? "0");
    if (reduced) {
      node.textContent = formatCompact(target);
      return;
    }
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = formatCompact(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/** Render the platform hub grid from shared constants. */
function initHub(): void {
  const hub = document.getElementById("hub");
  if (!hub) return;

  for (const p of PLATFORMS) {
    const card = document.createElement("button");
    card.className = "hub-card";
    card.type = "button";
    card.innerHTML = `
      <span class="arrow">↗</span>
      <span class="icon">${p.icon}</span>
      <span class="name">${p.name}</span>
      <span class="handle">${p.handle}</span>
    `;
    card.addEventListener("click", () => void window.dte.openExternal(p.url));
    hub.appendChild(card);
  }
}

/** Ping the main process for the status strip. */
async function initMainStatus(): Promise<void> {
  const status = document.getElementById("main-status");
  if (!status) return;
  try {
    const info = await window.dte.appInfo();
    status.textContent = `Main process online — ${info.platform} · Electron ${info.electron} · v${info.version}`;
  } catch {
    status.textContent = "Main process offline (browser dev mode)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initHub();
  void initMainStatus();
});
