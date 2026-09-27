"use client";
/* ANIMATED · Nº13 — «PULP» (класс kinetic-typography → ОДНА БАНКА ЧЕРЕЗ ВСЕ ЦВЕТА).
   Банка — вырезанный объект (из того же кадра split-hero), scene-kit <Actor> ведёт её через все цветовые
   сцены: между слоями PULP → над бегущей строкой → между слоями TASTE → в финале она вскрывается (шипение).
   Цвет мира — <Atmosphere> на корне (pink → orange → yellow → pink), смена цвета — всплеск сока вокруг банки
   в цвете следующей сцены (--splash по <Follow>), а не жёсткий стык секций. Z-сэндвич честный: банка — fixed
   слой между задним (z1) и передним (z3) словом. Палитра candy-block из кадра. Anton + Space Grotesk. */
import { Actor, Atmosphere, Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./splash13.css";

const CAN = "/uploads/1/animated/splash-can.webp";
const MARQUEE = "SPARKLING CITRUS — NO PULP LEFT BEHIND — ";

/* капли всплеска: угол, дальность, размер (детерминированно — без Math.random) */
const DROPS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + (i % 3) * 0.21;
  return { x: Math.cos(a) * (58 + (i % 4) * 9), y: Math.sin(a) * (36 + (i % 5) * 6), s: 0.6 + ((i * 7) % 5) * 0.18, r: (a * 180) / Math.PI };
});

export function Splash13() {
  return (
    <ScrollStage className="sp">
      {/* ЦВЕТ МИРА — одна ось: розовый → оранжевый → жёлтый → розовый; --atm2 = цвет следующей сцены */}
      <Atmosphere stops={[
        { at: ".sp-cover", color: "#ff2d7e", color2: "#ff7a2f" },
        { at: ".sp-band", color: "#ff7a2f", color2: "#ffc61a" },
        { at: ".sp-sandwich", color: "#ffc61a", color2: "#ff2d7e" },
        { at: ".sp-end", color: "#ff2d7e", color2: "#fff3e2" },
      ]} />
      <Follow stops={[
        { at: ".sp-cover", vars: { "--splash": 0, "--open": 0 } },
        { at: ".sp-cover", anchor: 1, vars: { "--splash": 1, "--open": 0 } },
        { at: ".sp-band", vars: { "--splash": 0, "--open": 0 } },
        { at: ".sp-band", anchor: 1, vars: { "--splash": 1, "--open": 0 } },
        { at: ".sp-sandwich", vars: { "--splash": 0, "--open": 0 } },
        { at: ".sp-sandwich", anchor: 0.92, vars: { "--splash": 0.9, "--open": 0 } },
        { at: ".sp-end", anchor: 0.2, vars: { "--splash": 0, "--open": 0 } },
        { at: ".sp-end", anchor: 0.5, vars: { "--splash": 0, "--open": 1 } },
      ]} />

      {/* БАНКА — сквозной объект всех цветовых сцен */}
      <Actor width="17vw" zIndex={2} bob={5} tilt={0.12} className="sp-actor" stops={[
        { at: ".sp-cover", pose: { x: 50, y: 53, s: 1, r: -4 } },
        { at: ".sp-band", pose: { x: 66, y: 50, s: 0.82, r: 14 } },
        { at: ".sp-sandwich", pose: { x: 50, y: 52, s: 1.12, r: 0 } },
        { at: ".sp-end", anchor: 0.5, pose: { x: 50, y: 34, s: 0.62, r: -7 } },
      ]}>
        <div className="sp-can">
          <svg className="sp-splash" viewBox="-100 -60 200 120" aria-hidden>
            {DROPS.map((d, i) => (
              <ellipse key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} rx={(4.2 * d.s).toFixed(2)} ry={(2.6 * d.s).toFixed(2)}
                transform={`rotate(${d.r.toFixed(1)} ${d.x.toFixed(2)} ${d.y.toFixed(2)})`} />
            ))}
            <path d="M-46 8 C-40 -18 -22 -30 0 -30 C22 -30 40 -18 46 8 C34 -6 18 -14 0 -14 C-18 -14 -34 -6 -46 8 Z" />
          </svg>
          <img src={CAN} alt="" className="sp-can-img" draggable={false} />
          <span className="sp-can-label" aria-hidden><b>PULP</b><i>blood-orange · lime</i></span>
          <span className="sp-fizz" aria-hidden>{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ ["--k" as string]: i }} />)}</span>
        </div>
      </Actor>

      {/* 0 · COVER — z-сэндвич: заднее PULP / банка / переднее PULP */}
      <Scene className="sp-cover">
        <div className="sp-kick"><span>PULP · SPARKLING CITRUS</span><span>Nº13 · KINETIC</span></div>
        <span className="sp-word sp-word-bg" aria-hidden>PULP</span>
        <span className="sp-word sp-word-fg" aria-hidden>PULP</span>
        <div className="sp-cue" aria-hidden>scroll — follow the can ↓</div>
      </Scene>

      {/* 1 · MARQUEE — банка летит над бегущей строкой */}
      <Scene className="sp-band">
        <div className="sp-band-row" style={{ ["--i" as string]: 0 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-row sp-band-rev" style={{ ["--i" as string]: 1 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-row" style={{ ["--i" as string]: 2 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-note">
          <span className="sp-line" style={{ ["--d" as string]: 0 }}><i>Real blood-orange. Real lime.</i></span>
          <span className="sp-line" style={{ ["--d" as string]: 1 }}><i>Zero syrup. All snap.</i></span>
        </div>
      </Scene>

      {/* 2 · SANDWICH — та же банка между слоями TASTE */}
      <Scene className="sp-sandwich">
        <span className="sp-big sp-big-bg" aria-hidden>TASTE</span>
        <span className="sp-big sp-big-fg" aria-hidden>TASTE</span>
        <div className="sp-sandwich-cap"><span className="sp-line" style={{ ["--d" as string]: 0 }}><i>Wrapped in flavour, front to back.</i></span></div>
      </Scene>

      {/* 3 · CTA — банка вскрывается */}
      <Scene className="sp-end">
        <h2 className="sp-end-h">CRACK <span className="sp-accent">ONE OPEN.</span></h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="sp-btn">Find a fridge near you ↗</a>
      </Scene>
    </ScrollStage>
  );
}
