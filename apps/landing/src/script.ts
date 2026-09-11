/* ============================================================
   DEMON TIME EXOTICS — THE MESSY SHOW 💪🏾😈🔥
   Landing site interactions: ember particles, reveal-on-scroll,
   stat counters, mobile nav
   ============================================================ */

/* ---------- Ember particle system (canvas) ---------- */
interface Ember {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  hue: number;
  alpha: number;
}

function initEmbers(): void {
  const canvas = document.getElementById("embers") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  let embers: Ember[] = [];
  let w = 0;
  let h = 0;
  let raf = 0;

  const MAX_EMBERS = 70;

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(): Ember {
    return {
      x: Math.random() * w,
      y: h + 12,
      size: 1 + Math.random() * 3,
      speed: 0.35 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 0.6,
      hue: 18 + Math.random() * 26, // fire orange → gold range
      alpha: 0.25 + Math.random() * 0.55,
    };
  }

  function tick(): void {
    ctx!.clearRect(0, 0, w, h);

    // top up
    while (embers.length < MAX_EMBERS) embers.push(spawn());

    for (const e of embers) {
      e.y -= e.speed;
      e.x += e.drift + Math.sin(e.y * 0.012) * 0.28;

      // fade near top
      const lifeAlpha = Math.max(0, Math.min(1, (e.y / h) * 1.6));
      const a = e.alpha * lifeAlpha;

      ctx!.beginPath();
      ctx!.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx!.fillStyle = `hsla(${e.hue}, 100%, 58%, ${a})`;
      ctx!.shadowColor = `hsla(${e.hue}, 100%, 50%, ${a})`;
      ctx!.shadowBlur = e.size * 5;
      ctx!.fill();
    }

    // recycle
    embers = embers.filter((e) => e.y > -20);
    raf = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  raf = requestAnimationFrame(tick);

  // pause when tab hidden (saves battery — the show is raw, not wasteful)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }
  });
}

/* ---------- Reveal-on-scroll ---------- */
function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!els.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

/* ---------- Stat counters ---------- */
function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function initCounters(): void {
  const stats = document.querySelectorAll<HTMLElement>(".stat-value[data-count]");
  if (!stats.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const render = (el: HTMLElement, value: number) => {
    el.textContent = formatCompact(value);
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    stats.forEach((el) => render(el, Number(el.dataset.count)));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        const duration = 1400;
        const start = performance.now();

        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          render(el, Math.round(target * eased));
          if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    },
    { threshold: 0.4 }
  );

  stats.forEach((el) => observer.observe(el));
}

/* ---------- Mobile nav ---------- */
function initNav(): void {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const setOpen = (open: boolean) => {
    links!.classList.toggle("open", open);
    toggle!.classList.toggle("open", open);
    toggle!.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setOpen(!links.classList.contains("open"));
  });

  // close after tapping a link (mobile UX)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // close on outside tap
  document.addEventListener("click", (e) => {
    if (links.classList.contains("open") && !links.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
      setOpen(false);
    }
  });

  // close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Smooth-scroll offset safety ---------- */
function initScrollGuard(): void {
  // pick up any anchor clicks that browsers mishandle with fixed navs
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = 68;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    });
  });
}

/* ---------- Boot ---------- */
function boot(): void {
  initEmbers();
  initReveal();
  initCounters();
  initNav();
  initScrollGuard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

export {};
