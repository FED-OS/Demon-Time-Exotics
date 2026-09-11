/**
 * @dte/tauri — frontend entry.
 *
 * Boots the desktop UI: stat counters, reveal-on-scroll and the
 * platform hub rendered from @dte/shared constants. Native OS
 * interactions (open external URLs, app metadata) are delegated to
 * the Rust core via @tauri-apps/api `invoke`.
 */
import "./styles/styles.css";
import { invoke, openUrl } from "./lib/tauri";
import { PLATFORMS } from "@dte/shared";

const formatCompact = (n: number): string =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
      ? `${Math.round(n / 100) / 10}K`
      : `${n}`;

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

/** Reveal sections as they scroll into view. */
function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

/** Render the platform hub grid from shared constants. */
function initHub(): void {
  const hub = document.getElementById("hub");
  if (!hub) return;

  PLATFORMS.forEach((p) => {
    const card = document.createElement("button");
    card.className = "hub-card reveal";
    card.type = "button";
    card.innerHTML = `
      <span class="arrow">↗</span>
      <span class="icon">${p.icon}</span>
      <span class="name">${p.name}</span>
      <span class="handle">${p.handle}</span>
    `;
    card.addEventListener("click", () => void openUrl(p.url));
    hub.appendChild(card);
  });
}

/** Ask the Rust core for a health ping, display result in status bar. */
async function initRustStatus(): Promise<void> {
  const status = document.getElementById("rust-status");
  if (!status) return;
  try {
    const info = await window.__TAURI_INTERNALS__.invoke<{ version: string; platform: string }>(
      "get_app_info"
    );
    status.textContent = `Rust core online — ${info.platform} · v${info.version}`;
  } catch {
    status.textContent = "Rust core offline (running in browser dev mode)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initHub();
  initReveal();
  void initRustStatus();
});
