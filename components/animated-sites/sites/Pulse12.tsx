"use client";
/* ANIMATED · Nº12 — «PULSE» (класс particle/fluid, приём particle-глобус с fresnel-bloom).
   Один WebGL2-контекст/страница (useParticleHero). Единый GPU point-cloud (~60k) держит форму
   ТОЧЕЧНОЙ СФЕРЫ-ГЛОБУСА весь скролл: 4 таргета — та же фибоначчи-сфера, повёрнутая вокруг оси
   на нарастающий угол → globe медленно ВРАЩАЕТСЯ по мере скролла (index-консистентный морф =
   чистое вращение), финал — лёгкий «пульс»-выброс на орбиту. Аддитивный blend: ортографическая
   плотность точек естественно СГУЩАЕТСЯ к лимбу → оранжевый атмосферный fresnel-ободок сам собой.
   Палитра: near-black + molten-orange (ember→расплав→бело-горячее). Бренд PULSE — оригинальная
   edge-сеть/инфраструктура. Фолбэк: reduced/no-webgl → CSS near-black + оранжевое ядро. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useParticleHero } from "../engine/useParticleHero";
import "./pulse12.css";

/* Фибоначчи-сфера радиуса r (детерминирована от N → индексы стабильны между таргетами). */
function fibSphere(N: number, r: number): Float32Array {
  const out = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    out[i * 3] = Math.cos(th) * rad * r;
    out[i * 3 + 1] = y * r;
    out[i * 3 + 2] = Math.sin(th) * rad * r;
  }
  return out;
}

/* Тот же глобус, повёрнутый вокруг оси Y на ang (+лёгкий наклон по X для объёма). Индексы держатся. */
function globe(N: number, r: number, ang: number, expand = 1): Float32Array {
  const s = fibSphere(N, r);
  const out = new Float32Array(N * 3);
  const ca = Math.cos(ang), sa = Math.sin(ang);
  const tilt = 0.32, ct = Math.cos(tilt), st = Math.sin(tilt);
  for (let i = 0; i < N; i++) {
    let x = s[i * 3], y = s[i * 3 + 1], z = s[i * 3 + 2];
    // вращение вокруг Y
    const x1 = x * ca + z * sa;
    const z1 = -x * sa + z * ca;
    // наклон вокруг X
    const y1 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    out[i * 3] = x1 * expand;
    out[i * 3 + 1] = y1 * expand;
    out[i * 3 + 2] = z2 * expand * 0.9;
  }
  return out;
}

export function Pulse12() {
  const canvas = useParticleHero({
    count: 60000,
    mobileCount: 13000,
    targets: [
      // малые шаги вращения (~0.55 рад) держат сферу круглой в морфе (большие шаги «сдувают» облако),
      // globe медленно поворачивается по скроллу; финал — лёгкий пульс-выброс на орбиту
      (n) => globe(n, 0.66, 0.0),
      (n) => globe(n, 0.66, 0.55),
      (n) => globe(n, 0.665, 1.1),
      (n) => globe(n, 0.7, 1.65, 1.14),
    ],
    colorA: [0.95, 0.26, 0.03], // ember — глубокий оранж (тело глобуса)
    colorB: [1.0, 0.52, 0.12],  // molten — расплав
    colorC: [1.0, 0.86, 0.6],   // бело-горячие искры к лимбу
    clear: [0.016, 0.014, 0.02, 1],
    blend: "add",
    alpha: 0.82,
    pointSize: 2.5,
    softness: 1.55,
    drift: 0.008,
  });

  return (
    <ScrollStage className="pl particle-hero">
      {/* фуллскрин point-cloud (fixed) + near-black + оранжевое ядро фолбэк под ним */}
      <div className="pl-bg" aria-hidden>
        <canvas ref={canvas} className="pl-canvas" />
      </div>

      {/* 0 · CORE — глобус-ядро, оранжевый лимб */}
      <Scene className="pl-cover">
        <div className="pl-kick"><span>PULSE / EDGE FABRIC</span><span>Nº12 · PARTICLE</span></div>
        <div className="pl-cover-in">
          <p className="pl-eyebrow">sixty thousand nodes, one heartbeat</p>
          <h1 className="pl-hero">
            <span className="pl-line" style={{ ["--d" as string]: 0 }}><i>Compute that</i></span>
            <span className="pl-line pl-warm" style={{ ["--d" as string]: 1 }}><i>glows at the edge.</i></span>
          </h1>
          <p className="pl-sub">A living globe of presence points — every region lit, every request answered by the node closest to the light. Scroll, and the sphere turns.</p>
        </div>
        <div className="pl-cue" aria-hidden>scroll — turn the globe ↓</div>
      </Scene>

      {/* 1 · ROTATE — copy сбоку, глобус повёрнут */}
      <Scene className="pl-orbit">
        <div className="pl-side">
          <span className="pl-tag">01 — presence</span>
          <h2>Every point<br /><em>is a place.</em></h2>
          <p>Two hundred edges rendered as one atmosphere. As you move through the planet, the limb burns brightest — that is where the network meets the world.</p>
        </div>
      </Scene>

      {/* 2 · LIMB — подпись про fresnel-ободок */}
      <Scene className="pl-mid">
        <div className="pl-mid-cap">
          <span className="pl-line pl-warm" style={{ ["--d" as string]: 0 }}><i>The rim is molten —</i></span>
          <span className="pl-line" style={{ ["--d" as string]: 1 }}><i>that is latency, burning off.</i></span>
        </div>
      </Scene>

      {/* 3 · PULSE — финал, выброс на орбиту + CTA */}
      <Scene className="pl-end">
        <div className="pl-end-block">
          <p className="pl-end-eyebrow">the globe exhales — a pulse to every edge</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="pl-btn">Deploy to the edge ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
