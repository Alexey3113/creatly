"use client";
/* ANIMATED · Nº30 — «OVATION» (класс particle/fluid, приём: хаотичный поток самособирается в знак).
   Один WebGL2-контекст/страница (useParticleHero). GPU point-cloud (~48k) влетает направленным потоком
   слева и САМОСОБИРАЕТСЯ в фирменную монограмму (кольцо + восходящий шеврон «O·V», нарисован путями в
   offscreen-canvas и растеризован в частицы), затем лёгкое дыхание (time-drift шейдера). Палитра: ivory-фон
   + тёплое золото/бронза (emissive-marks, alpha-blend поверх ivory). СВЕТЛЫЙ контраст к тёмному Genesis.
   Бренд OVATION — оригинальная студия событий/аудио. Фолбэк: reduced/no-webgl → CSS-ivory + DOM-типографика. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import {
  useParticleHero,
  streamTarget,
  rasterizeTarget,
} from "../engine/useParticleHero";
import "./ovation30.css";

/* Фирменный знак: толстое кольцо + восходящий шеврон (монограмма O·V «ovation/applause»). Пути → гарантия рендера. */
function paintEmblem(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2, cy = h / 2, R = h * 0.4;
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // тонкое кольцо — читается как «O»
  ctx.lineWidth = h * 0.05;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  // восходящий шеврон «V» с воздухом вокруг
  ctx.lineWidth = h * 0.062;
  const vw = R * 0.52, vy0 = cy - R * 0.34, vy1 = cy + R * 0.42;
  ctx.beginPath();
  ctx.moveTo(cx - vw, vy0);
  ctx.lineTo(cx, vy1);
  ctx.lineTo(cx + vw, vy0);
  ctx.stroke();
}

export function Ovation30() {
  // ВАЖНО: знак строится ОДИН раз и переиспользуется для таргетов 1–3 (index-консистентно).
  // Иначе морф между двумя независимыми сэмплами кольца рисует хорды через центр → «диск» вместо кольца.
  // Так поток (0) СОБИРАЕТСЯ в знак к прогрессу ~0.33, затем ДЕРЖИТСЯ чётко (дыхание — из шейдера).
  let emb: Float32Array | null = null;
  const emblem = (n: number) => (emb ??= rasterizeTarget(n, paintEmblem, { aspect: 1, designH: 1.28 }));
  const canvas = useParticleHero({
    count: 48000,
    mobileCount: 11000,
    targets: [
      (n) => streamTarget(n, [-2.4, 0.3, 0], 0.55),
      emblem,
      emblem,
      emblem,
    ],
    colorA: [0.42, 0.26, 0.06],  // тёмная бронза (контраст на ivory)
    colorB: [0.66, 0.45, 0.1],   // золото
    colorC: [0.52, 0.32, 0.07],  // тёплый янтарь
    clear: [0, 0, 0, 0],          // прозрачно → ivory CSS-фон просвечивает
    blend: "alpha",
    alpha: 0.92,
    pointSize: 2.3,
    softness: 3.2,                // чёткая точка — знак читается на светлом
    drift: 0.006,                 // знак держится плотно, лёгкое дыхание
  });

  return (
    <ScrollStage className="ov particle-hero">
      {/* фуллскрин point-cloud (fixed) поверх ivory CSS-фолбэка */}
      <div className="ov-bg" aria-hidden>
        <canvas ref={canvas} className="ov-canvas" />
      </div>

      {/* 0 · INFLOW — поток влетает */}
      <Scene className="ov-cover">
        <div className="ov-kick"><span>OVATION / EVENT STUDIO</span><span>Nº30 · PARTICLE</span></div>
        <div className="ov-cover-in">
          <p className="ov-eyebrow">forty-eight thousand pieces of applause</p>
          <h1 className="ov-hero">
            <span className="ov-line" style={{ ["--d" as string]: 0 }}><i>The room</i></span>
            <span className="ov-line ov-gold" style={{ ["--d" as string]: 1 }}><i>finds its shape.</i></span>
          </h1>
          <p className="ov-sub">A studio for moments worth standing for. Scattered light streams in from the wings and gathers, on its own, into one mark.</p>
        </div>
        <div className="ov-cue" aria-hidden>scroll — let it assemble ↓</div>
      </Scene>

      {/* 1 · ASSEMBLE — знак собирается */}
      <Scene className="ov-form">
        <div className="ov-side">
          <span className="ov-tag">the mark</span>
          <h2>No two crowds<br /><em>arrive the same.</em></h2>
          <p>Yet every one settles into the same silhouette — a ring of voices rising to a single point. Chaos, choosing order.</p>
        </div>
      </Scene>

      {/* 2 · BREATHE — знак держится и дышит */}
      <Scene className="ov-hold">
        <div className="ov-mid">
          <span className="ov-line ov-gold" style={{ ["--d" as string]: 0 }}><i>And then it breathes —</i></span>
          <span className="ov-line" style={{ ["--d" as string]: 1 }}><i>held, warm, alive.</i></span>
        </div>
      </Scene>

      {/* 3 · CTA */}
      <Scene className="ov-end">
        <div className="ov-end-block">
          <h2>
            <span className="ov-line" style={{ ["--d" as string]: 0 }}><i>Give them</i></span>
            <span className="ov-line ov-gold" style={{ ["--d" as string]: 1 }}><i>something to rise for.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="ov-btn">Stage your night ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
