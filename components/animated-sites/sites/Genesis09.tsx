"use client";
/* ANIMATED · Nº09 — «GENESIS» (класс particle/fluid, приём морф объект→объект→CTA-текст).
   Сквозной объект — одно облако частиц на всю страницу. Формы уведены из-под копи (ядро справа, орбита слева),
   «небо» — наклонный млечный путь с мягкими краями вместо прямоугольника шума; финал — слово BEGIN. и CTA.
   Один WebGL2-контекст/страница (useParticleHero). Единый GPU point-cloud (~52k) проходит по 4 экранам:
   СФЕРА (ядро) → ТОР (орбита) → ЗВЁЗДНОЕ ПОЛЕ (рассеяние) → сгущение в CTA-текст «BEGIN.».
   Морф — mix между 4 позициями-таргетами по page-scroll (u_progress). Аддитивный blend, мягкие точки,
   twinkle/дыхание. Палитра: чёрный космос + электрик-синяя и золотая пыль. Тонкая серифная типографика
   поверх. Бренд GENESIS — оригинальная генеративная лаборатория. Фолбэк: reduced/no-webgl → CSS-космос. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import {
  useParticleHero,
  sphereTarget,
  torusTarget,
  textTarget,
} from "../engine/useParticleHero";
import "./genesis09.css";

/* детерминированный PRNG (mulberry32) — таргеты стабильны от запуска к запуску */
function prng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* сдвиг формы в сторону от копи (design-space: x до ±aspect, y ∈ [-1,1]) */
const shift = (a: Float32Array, dx: number, dy = 0) => { for (let i = 0; i < a.length; i += 3) { a[i] += dx; a[i + 1] += dy; } return a; };
/* «небо»: не прямоугольник шума, а наклонный млечный путь с мягким краем + редкое гало (края уходят за кадр) */
function skyTarget(N: number): Float32Array {
  const out = new Float32Array(N * 3);
  const r = prng(9);
  const g = () => { const u = Math.max(1e-6, r()); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
  for (let i = 0; i < N; i++) {
    if (i % 5 === 0) {
      out[i * 3] = g() * 1.1; out[i * 3 + 1] = g() * 0.62 + 0.1; out[i * 3 + 2] = (r() - 0.5) * 1.2;
    } else {
      const u = r() * 2 - 1;
      const w = 0.2 * (1 - 0.45 * Math.abs(u)) * (0.7 + 0.3 * Math.sin(u * 7.0));
      out[i * 3] = u * 2.0 + g() * 0.05;
      out[i * 3 + 1] = 0.16 + u * 0.36 + g() * w;
      out[i * 3 + 2] = (r() - 0.5) * 0.9;
    }
  }
  return out;
}

export function Genesis09() {
  const canvas = useParticleHero({
    count: 52000,
    mobileCount: 11000,
    targets: [
      (n) => shift(sphereTarget(n, 0.6), 0.62, 0.02),
      (n) => shift(torusTarget(n, 0.5, 0.18), -0.62, 0.04),
      (n) => skyTarget(n),
      (n) => shift(textTarget(n, "BEGIN.", { designH: 0.4, aspect: 4.2 }), 0, 0.16),
    ],
    colorA: [0.16, 0.42, 1.0],   // электрик-синяя пыль
    colorB: [1.0, 0.82, 0.42],   // золото
    colorC: [0.98, 0.55, 0.22],  // тёплое золото-янтарь
    clear: [0.008, 0.01, 0.028, 1],
    blend: "add",
    alpha: 0.85,
    pointSize: 2.7,
  });

  return (
    <ScrollStage className="gn particle-hero">
      {/* фуллскрин point-cloud (fixed) + CSS-космос-фолбэк под ним */}
      <div className="gn-bg" aria-hidden>
        <canvas ref={canvas} className="gn-canvas" />
      </div>

      {/* 0 · CORE — сфера-ядро */}
      <Scene className="gn-cover">
        <div className="gn-kick"><span>GENESIS / GENERATIVE LAB</span><span>Nº09 · PARTICLE</span></div>
        <div className="gn-cover-in">
          <p className="gn-eyebrow">fifty-two thousand points of light</p>
          <h1 className="gn-hero">
            <span className="gn-line" style={{ ["--d" as string]: 0 }}><i>From a single</i></span>
            <span className="gn-line gn-gold" style={{ ["--d" as string]: 1 }}><i>seed of matter.</i></span>
          </h1>
          <p className="gn-sub">A studio that grows form from formlessness. One cloud of particles — coaxed into a core, an orbit, a sky, and finally a word.</p>
        </div>
        <div className="gn-cue" aria-hidden>scroll — set the matter in motion ↓</div>
      </Scene>

      {/* 1 · ORBIT — тор */}
      <Scene className="gn-orbit">
        <div className="gn-side">
          <span className="gn-tag">01 — condense</span>
          <h2>The core opens<br /><em>into orbit.</em></h2>
          <p>Every point keeps its identity through the change — the same matter, redrawn. Nothing is spawned, nothing destroyed; only rearranged.</p>
        </div>
      </Scene>

      {/* 2 · SCATTER — звёздное поле */}
      <Scene className="gn-scatter">
        <div className="gn-mid">
          <span className="gn-line gn-gold" style={{ ["--d" as string]: 0 }}><i>Then it lets go —</i></span>
          <span className="gn-line" style={{ ["--d" as string]: 1 }}><i>and becomes a sky.</i></span>
        </div>
      </Scene>

      {/* 3 · BEGIN — сгущение в CTA-текст */}
      <Scene className="gn-end">
        <div className="gn-end-block">
          <p className="gn-end-eyebrow">the same points, now a word</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="gn-btn">Enter the lab ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
