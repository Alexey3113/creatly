"use client";
/* SCENE-KIT · ПОГОДА — постоянный слой частиц на ВЕСЬ сайт (над рилом и лендингом).
   Частицы пересекают швы сцен (шов прячется за движением) и живут «в мире»: при скролле вниз мир
   уезжает вверх — частицы тоже, ближние быстрее дальних (параллакс по глубине d). Ветер = скорость.
   Детерминированные «случайности» от индекса — без Math.random в рендере (иначе hydration-mismatch). */
import { useEffect, useRef } from "react";
import { subscribe, smooth } from "./clock";
import { selectorCache } from "./anchors";
import "./scene-kit.css";

export type WeatherKind =
  | "leaves" | "petals" | "snow" | "embers" | "fireflies" | "bubbles" | "dust" | "rain" | "ash" | "stars" | "sparks" | "spores";

type Cfg = { fall: number; sway: number; spin: number; size: [number, number]; up?: boolean; twinkle?: boolean };
const K: Record<WeatherKind, Cfg> = {
  leaves: { fall: 0.9, sway: 38, spin: 1.2, size: [12, 22] },
  petals: { fall: 0.7, sway: 44, spin: 1.6, size: [8, 14] },
  snow: { fall: 0.8, sway: 18, spin: 0, size: [3, 7] },
  ash: { fall: 0.5, sway: 22, spin: 0.6, size: [2, 5] },
  rain: { fall: 9, sway: 0, spin: 0, size: [1, 2] },
  embers: { fall: 1.1, sway: 20, spin: 0, size: [2, 5], up: true, twinkle: true },
  sparks: { fall: 2.2, sway: 10, spin: 0, size: [2, 3], up: true, twinkle: true },
  fireflies: { fall: 0.25, sway: 30, spin: 0, size: [3, 6], up: true, twinkle: true },
  bubbles: { fall: 1.3, sway: 14, spin: 0, size: [4, 12], up: true },
  spores: { fall: 0.35, sway: 26, spin: 0, size: [2, 4], up: true, twinkle: true },
  dust: { fall: 0.15, sway: 16, spin: 0, size: [1, 3], twinkle: true },
  stars: { fall: 0, sway: 0, spin: 0, size: [1, 3], twinkle: true },
};

// детерминированный PRNG (mulberry32)
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Weather({
  kind,
  count = 18,
  color = "#ffffff",
  color2,
  zIndex = 25,
  wind = 1,
  world = 0.6,
  seed = 7,
  between,
  className = "",
  style,
}: {
  kind: WeatherKind;
  count?: number;
  color?: string;
  color2?: string;
  zIndex?: number;
  /** сила реакции на скорость скролла */
  wind?: number;
  /** насколько частицы «приклеены к миру» при скролле (0 — к экрану, 1 — к странице) */
  world?: number;
  seed?: number;
  /** окно жизни погоды по якорям: [с какого, до какого] (пузыри — только под водой и т.п.) */
  between?: [string, string];
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cfg = K[kind];
  const r = rng(seed * 1013 + count);
  const parts = Array.from({ length: count }, (_, i) => ({
    i,
    x: r(),
    y: r(),
    d: 0.35 + r() * 1.1, // глубина: <1 дальше, >1 ближе к камере
    size: cfg.size[0] + r() * (cfg.size[1] - cfg.size[0]),
    ph: r() * Math.PI * 2,
    sp: 0.6 + r() * 0.8,
    alt: r() < 0.4,
  }));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.children) as HTMLElement[];
    const st = parts.map((p) => ({ ...p }));
    const win2 = between ? selectorCache(between) : null;
    return subscribe(({ vh, vw, vy, t, dt, reduced }) => {
      if (reduced) return;
      if (win2) {
        const [a, b] = win2();
        const ta = a ? a.getBoundingClientRect().top : -1e9;
        const tb = b ? b.getBoundingClientRect().top : 1e9;
        // проявление, пока якорь «с» поднимается от низа экрана; угасание, пока якорь «до» уходит за верх
        const vis = smooth((vh - ta) / (vh * 0.6)) * smooth((tb + vh * 0.2) / (vh * 0.6));
        root.style.opacity = vis.toFixed(3);
        root.style.visibility = vis < 0.01 ? "hidden" : "";
        if (vis < 0.01) return;
      }
      const k = dt / 16.7;
      for (let j = 0; j < st.length; j++) {
        const p = st[j];
        const fall = (cfg.up ? -1 : 1) * cfg.fall * p.sp * p.d * k;
        // мир уезжает вверх при скролле вниз → частица вместе с ним (ближние сильнее)
        const drift = -(vy * world * p.d) / vh;
        p.y += fall / vh + drift;
        p.x += ((Math.sin(t / 1400 + p.ph) * cfg.sway * 0.02 + vy * 0.02 * wind * p.d) * k) / vw;
        if (p.y > 1.08) p.y -= 1.16;
        if (p.y < -0.08) p.y += 1.16;
        if (p.x > 1.05) p.x -= 1.1;
        if (p.x < -0.05) p.x += 1.1;
        const rot = cfg.spin ? (t / 1000) * 60 * cfg.spin * p.sp + p.ph * 57 : 0;
        const tw = cfg.twinkle ? 0.45 + 0.55 * Math.abs(Math.sin(t / 700 + p.ph * 3)) : 1;
        const n = nodes[j];
        n.style.transform = `translate3d(${(p.x * vw).toFixed(1)}px, ${(p.y * vh).toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg) scale(${p.d.toFixed(3)})`;
        n.style.opacity = (Math.min(1, 0.35 + p.d * 0.55) * tw).toFixed(3);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, count, seed, wind, world, between?.[0], between?.[1]]);

  return (
    <div ref={ref} className={`sk-weather sk-w-${kind} ${className}`} style={{ zIndex, ["--sk-c" as string]: color, ["--sk-c2" as string]: color2 ?? color, ...style }} aria-hidden>
      {parts.map((p) => (
        <i
          key={p.i}
          className={p.alt ? "alt" : undefined}
          style={{ width: `${p.size.toFixed(1)}px`, height: `${(kind === "rain" ? p.size * 14 : kind === "leaves" || kind === "petals" ? p.size * 0.72 : p.size).toFixed(1)}px`, transform: `translate3d(${(p.x * 100).toFixed(2)}vw, ${(p.y * 100).toFixed(2)}vh, 0)` }}
        />
      ))}
    </div>
  );
}
