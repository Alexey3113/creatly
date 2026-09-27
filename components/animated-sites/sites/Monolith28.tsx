"use client";
/* ANIMATED · Nº28 — «AETHER» (класс 3d-product-theatre → ОДИН ПУТЬ К ШПИЛЮ).
   Весь сайт — одна картина мира и одна камера. Painterly-кадр висит fixed-слоем (.mn-world) под всеми
   главами; камеру (наезд/сдвиг), туман, ночь и свечение шпиля ведёт scene-kit <Follow> по якорям глав —
   без второй копии кадра на стыках. Путник с утёса (вырезан из того же кадра) идёт сквозь туман к шпилю
   (<Actor>), небо по всему скроллу — от сумерек к ночи. Склейки: туман заливает кадр (утёс → перевал),
   наезд сквозь туман к воротам, свет шпиля раскрывается в финал (ворота → «Cross into the realm»).
   Палитра — из кадра: магента-индиго сумерки + cold mist + ember-glow. Шрифт: Syne + Archivo. */
import { Actor, Follow, Weather } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./monolith28.css";

const HERO = "/uploads/1/animated/monolith-hero.jpg";
const TRAVELER = "/uploads/1/animated/monolith-traveler.webp";

const SPECS: [string, string][] = [
  ["REALM", "Aether, the far vale"],
  ["POWER", "arcane, half-woken"],
  ["AGE", "before the first name"],
  ["GATE", "open to the called"],
];

/* якорь по доле высоты секции: cover 100vh · pass 220vh · gate 220vh · end 100vh */
const A = (at: string, anchor: number) => ({ at, anchor });

export function Monolith28() {
  return (
    <ScrollStage className="mn">
      {/* КАМЕРА И СВЕТ — одна ось на всю страницу: наезд к шпилю, туман, ночь, свечение */}
      <Follow stops={[
        { ...A(".mn-cover", 0.5), vars: { "--cs": 1, "--cx": 0, "--cy": 0, "--mist": 0, "--night": 0, "--glow": 0.3 } },
        { ...A(".mn-cover", 0.96), vars: { "--cs": 1.3, "--cx": -2, "--cy": 2, "--mist": 0.55, "--night": 0.08, "--glow": 0.34 } },
        { ...A(".mn-pass", 0.18), vars: { "--cs": 1.62, "--cx": -9, "--cy": 3, "--mist": 0.9, "--night": 0.16, "--glow": 0.38 } },
        { ...A(".mn-pass", 0.42), vars: { "--cs": 1.8, "--cx": -10, "--cy": 4, "--mist": 0, "--night": 0.26, "--glow": 0.5 } },
        { ...A(".mn-pass", 0.72), vars: { "--cs": 1.98, "--cx": -11, "--cy": 5, "--mist": 0.06, "--night": 0.38, "--glow": 0.58 } },
        { ...A(".mn-gate", 0.09), vars: { "--cs": 2.3, "--cx": -12, "--cy": 5, "--mist": 0.78, "--night": 0.5, "--glow": 0.72 } },
        { ...A(".mn-gate", 0.4), vars: { "--cs": 2.5, "--cx": -14, "--cy": 6, "--mist": 0, "--night": 0.66, "--glow": 0.95 } },
        { ...A(".mn-gate", 0.8), vars: { "--cs": 2.65, "--cx": -15, "--cy": 6, "--mist": 0.08, "--night": 0.82, "--glow": 1.6 } },
        { ...A(".mn-end", 0.5), vars: { "--cs": 2.75, "--cx": -15, "--cy": 7, "--mist": 0.05, "--night": 1, "--glow": 1.15 } },
      ]} />

      {/* МИР — одна картина под всеми главами; камера = transform одного слоя */}
      <div className="mn-world" aria-hidden>
        <div className="mn-cam">
          <div className="mn-plate" style={{ backgroundImage: `url(${HERO})` }} />
        </div>
        <div className="mn-night" />
        <div className="mn-stars" />
        {/* свет шпиля — отдельной «камерой» поверх ночи (ночь не гасит свечение ворот) */}
        <div className="mn-cam"><div className="mn-glow" /></div>
        <div className="mn-fog mn-fog-back" />
        <div className="mn-fog mn-fog-front" />
        <div className="mn-vignette" />
      </div>

      {/* ПУТНИК — тот же, что стоит на утёсе: после тумана он уже в пути, у ворот — входит в свет */}
      <Actor src={TRAVELER} width="12vw" zIndex={2} bob={0} tilt={0.04} className="mn-traveler" stops={[
        { ...A(".mn-pass", 0.17), pose: { x: 26, y: 86, s: 1.1, o: 0, blur: 3 } },
        { ...A(".mn-pass", 0.36), pose: { x: 30, y: 80, s: 1, o: 1 } },
        { ...A(".mn-pass", 0.72), pose: { x: 40, y: 74, s: 0.78, o: 1 } },
        { ...A(".mn-gate", 0.1), pose: { x: 46, y: 70, s: 0.6, o: 0.55, blur: 1.5 } },
        { ...A(".mn-gate", 0.4), pose: { x: 49, y: 64, s: 0.5, o: 1 } },
        { ...A(".mn-gate", 0.8), pose: { x: 52, y: 57, s: 0.4, o: 1 } },
        { ...A(".mn-end", 0.5), pose: { x: 54, y: 50, s: 0.32, o: 1 } },
      ]} />
      <Weather kind="embers" count={20} color="#ffb98a" color2="#ff8a5c" between={[".mn-cover", ".mn-end"]} world={0.5} zIndex={2} />

      {/* 0 · УТЁС — картина в покое, заголовок собран, путник на скале виден */}
      <Scene className="mn-cover">
        <div className="mn-kick"><span>AETHER — THE LAST SPIRE</span><span>Nº28 · THE REALM</span></div>
        <div className="mn-cover-copy">
          <p className="mn-eyebrow">a power the world half-forgot</p>
          <h1 className="mn-hero">
            <span className="mn-line" style={{ ["--d" as string]: 0 }}><i>It has burned</i></span>
            <span className="mn-line" style={{ ["--d" as string]: 1 }}><i>since before</i></span>
            <span className="mn-line mn-accent" style={{ ["--d" as string]: 2 }}><i>the first age.</i></span>
          </h1>
        </div>
        <div className="mn-cue" aria-hidden>scroll — follow him to the spire ↓</div>
      </Scene>

      {/* 1 · ПЕРЕВАЛ — из тумана: путник уже в пути, строки по одной */}
      <Scene className="mn-pass" pinned vh={220}>
        <div className="mn-chapter">
          <span className="mn-ch-idx">I · THE PASS</span>
          <p className="mn-say" style={{ ["--i" as string]: 0 }}>The spire still answers.</p>
          <p className="mn-say" style={{ ["--i" as string]: 1 }}>Old light, not yet spent.</p>
        </div>
      </Scene>

      {/* 2 · ВОРОТА — у основания шпиля, свет разгорается */}
      <Scene className="mn-gate" pinned vh={220}>
        <div className="mn-surface">
          <span className="mn-surface-idx">II · THE GATE</span>
          <h2>The spire<br />stands.</h2>
          <p className="mn-surface-sub">The realm remembers you.</p>
        </div>
      </Scene>

      {/* 3 · ФИНАЛ — ночь, свет ворот, путник на пороге */}
      <Scene className="mn-end">
        <div className="mn-end-block">
          <ul className="mn-specs">
            {SPECS.map(([k, v], i) => (
              <li key={i} className="mn-spec" style={{ ["--i" as string]: i }}>
                <span className="mn-spec-k">{k}</span><span className="mn-spec-v">{v}</span>
              </li>
            ))}
          </ul>
          <h2>
            <span className="mn-line" style={{ ["--d" as string]: 0 }}><i>Cross into</i></span>
            <span className="mn-line mn-accent" style={{ ["--d" as string]: 1 }}><i>the realm.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="mn-btn">Enter the realm ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
