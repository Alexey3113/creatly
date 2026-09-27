"use client";
/* ANIMATED · Nº15 — «ATLAS» (класс scroll-reveal, приём КАРТА-ХАБ).
   Чистый DOM/SVG/CSS на движке ScrollStage — ноль внешних ассетов. Одна pinned-сцена держит
   абстрактную карту-сеть регионов (inline-SVG, НЕ реальная страна) с пульсирующими DOM-пинами.
   По прогрессу --t активный пин РАСКРЫВАЕТСЯ круговым клипом в полноэкранную сюжетную главу
   (цветной блок + заголовок-маска + метрика count-up на чистом CSS @property), затем сворачивается
   обратно к пину — карта проступает — и раскрывается следующий. Реальная польза: карта-навигация
   по историям энергосети. Палитра: документальный deep-green + смелые blue / red / green / amber.
   Бренд ATLAS GRID — распределённая энергосеть и сенсорный мониторинг. Фолбэк: reduced-motion → главы
   разворачиваются в статичный читаемый стек (см. @media reduce в atlas15.css). */
import { Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./atlas15.css";

type Chapter = {
  i: number; cx: number; cy: number;
  target: number; unit: string; tag: string;
  title: [string, string]; body: string;
  acc: string; acc2: string; ink: string;
};

const CH: Chapter[] = [
  { i: 0, cx: 25, cy: 61, target: 12400, unit: " nodes", tag: "01 — SENSE",
    title: ["Twelve thousand", "eyes on the grid."],
    body: "Every substation, span and valve reports its own pulse — a living census of the network, refreshed four times a second.",
    acc: "#1f6feb", acc2: "#071d45", ink: "#eaf1ff" },
  { i: 1, cx: 71, cy: 34, target: 40, unit: " ms", tag: "02 — REROUTE",
    title: ["Power finds", "a new road."],
    body: "When a line drops, load is redistributed before the lights can flicker. The mesh negotiates its own detour — no dispatcher required.",
    acc: "#e0362f", acc2: "#3d0806", ink: "#ffece9" },
  { i: 2, cx: 45, cy: 27, target: 9, unit: " regions", tag: "03 — MESH",
    title: ["Nine regions,", "one nervous system."],
    body: "Independent grids stop behaving like islands. Pressure in the north is answered in the south — one fabric, continentally aware.",
    acc: "#2fb57a", acc2: "#063a24", ink: "#f0fff6" },
  { i: 3, cx: 80, cy: 67, target: 99, unit: " %", tag: "04 — HEAL",
    title: ["It heals", "before you notice."],
    body: "Ninety-nine percent of faults are isolated and routed around autonomously. The operators read the story afterward, not during.",
    acc: "#d9a227", acc2: "#3d2c05", ink: "#fff6e0" },
];

const N = CH.length;
/* якорь пин-сцены 540vh по её прогрессу t */
const pin = (t: number, V = 5.4) => (t * (V - 1) + 0.5) / V;

export function Atlas15() {
  return (
    <ScrollStage className="at scroll-reveal">
      {/* ПРОГРЕСС КАРТЫ НА ВСЮ СТРАНИЦУ: маршрут дорисовывается через все главы, --tt — время карты */}
      <Follow curve="linear" stops={[
        { at: ".at-cover", vars: { "--tt": 0, "--mapdim": 0.55, "--route": 0 } },
        ...Array.from({ length: 9 }, (_, k) => ({ at: ".at-atlas", anchor: pin(k / 8), vars: { "--tt": k / 8, "--mapdim": 0, "--route": 0.1 + (k / 8) * 0.8 } })),
        { at: ".at-end", vars: { "--tt": 1, "--mapdim": 0.42, "--route": 1 } },
      ]} />
      <div className="at-world" aria-hidden>
        {/* карта-сеть (декор, inline-SVG, абстрактная) */}
        <svg className="at-map" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <radialGradient id="at-glow" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#123f2c" />
              <stop offset="60%" stopColor="#0c2b1e" />
              <stop offset="100%" stopColor="#071811" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="800" fill="url(#at-glow)" />
          {/* абстрактные регионы-блобы */}
          <g className="at-regions" fill="none" stroke="#1c4d38" strokeWidth="1.4">
            <path d="M120 480 C90 380 200 300 320 320 C430 338 470 430 430 520 C395 600 240 620 170 560 C138 532 132 512 120 480 Z" />
            <path d="M150 460 C140 400 220 350 310 366 C388 380 418 440 392 508 C368 566 250 582 200 540 Z" opacity="0.5" />
            <path d="M540 210 C520 130 640 90 760 120 C880 150 900 250 850 330 C800 404 640 410 580 350 C548 318 552 268 540 210 Z" />
            <path d="M900 520 C880 440 980 400 1080 430 C1170 458 1180 560 1120 620 C1058 682 940 664 908 596 Z" />
            <path d="M470 560 C470 500 560 470 640 496 C716 520 726 596 668 640 C606 686 486 660 470 560 Z" opacity="0.7" />
          </g>
          {/* сеть связей */}
          <g className="at-links" stroke="#2f7a58" strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M300 488 L852 272 L540 216 L300 488 L560 640 L960 536 L852 272" />
            <path d="M560 640 L960 536" />
            <path d="M300 488 L960 536" opacity="0.4" />
          </g>
          {/* прогрессивно рисуемый маршрут по --t */}
          <path className="at-route" d="M300 488 L540 216 L852 272 L960 536" stroke="#f0c14d" strokeWidth="2.4" fill="none" />
          {/* мелкие узлы */}
          <g className="at-dots" fill="#3f9a71">
            {[[210, 540], [400, 360], [700, 180], [1040, 470], [640, 600], [860, 420], [500, 300], [340, 440]].map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r="3.4" />
            ))}
          </g>
          <g className="at-grid" stroke="#0f3423" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, k) => <line key={"h" + k} x1="0" y1={k * 100} x2="1200" y2={k * 100} />)}
            {Array.from({ length: 13 }).map((_, k) => <line key={"v" + k} x1={k * 100} y1="0" x2={k * 100} y2="800" />)}
          </g>
        </svg>

        {/* активные пины (DOM, выровнены с клип-центрами глав) */}
        {CH.map((c) => (
          <div key={"pin" + c.i} className="at-pin" style={{ left: `${c.cx}%`, top: `${c.cy}%`, ["--i" as string]: c.i, ["--acc" as string]: c.acc }}>
            <span className="at-pin-ring" />
            <span className="at-pin-core" />
            <span className="at-pin-label">{c.tag.split(" — ")[1]}</span>
          </div>
        ))}

        {/* HUD: индекс главы + подпись */}
        <div className="at-hud">
          <span className="at-hud-idx">NODE {`{`}<i className="at-hud-live" />{`}`} / {String(N).padStart(2, "0")}</span>
          <span className="at-hud-cap">ATLAS · live network dossier</span>
        </div>
      </div>

      {/* 0 · COVER */}
      <Scene className="at-cover">
        <div className="at-kick"><span>ATLAS GRID / DISTRIBUTED ENERGY</span><span>Nº15 · MAP-HUB</span></div>
        <div className="at-cover-in">
          <p className="at-eyebrow">a map that tells its own story</p>
          <h1 className="at-hero">
            <span className="at-mask" style={{ ["--d" as string]: 0 }}><i>The grid,</i></span>
            <span className="at-mask at-hero-em" style={{ ["--d" as string]: 1 }}><i>read like a chart.</i></span>
          </h1>
          <p className="at-sub">Four regions. Four chapters. Scroll and each node on the network opens into the moment it mattered.</p>
        </div>
        <div className="at-cue" aria-hidden>scroll — open a node ↓</div>
      </Scene>

      {/* 1 · ATLAS — главы раскрываются из точек карты (карта — в fixed-мире под всей страницей) */}
      <Scene className="at-atlas" pinned vh={540} style={{ ["--n" as string]: N, ["--lead" as string]: 0.13 }}>
        {/* главы: раскрываются круговым клипом от своего пина */}
        {CH.map((c) => (
          <article
            key={"ch" + c.i}
            className="at-chapter"
            style={{
              ["--i" as string]: c.i, ["--cx" as string]: c.cx, ["--cy" as string]: c.cy,
              ["--target" as string]: c.target, ["--acc" as string]: c.acc,
              ["--acc2" as string]: c.acc2, ["--ink" as string]: c.ink,
            }}
          >
            <div className="at-ch-veil" aria-hidden />
            <div className="at-ch-in">
              <span className="at-ch-tag">{c.tag}</span>
              <h2 className="at-ch-title">
                <span className="at-mask" style={{ ["--d" as string]: 0 }}><i>{c.title[0]}</i></span>
                <span className="at-mask" style={{ ["--d" as string]: 1 }}><i>{c.title[1]}</i></span>
              </h2>
              <div className="at-metric">
                <span className="at-num" aria-hidden />
                <span className="at-unit">{c.unit}</span>
              </div>
              <p className="at-ch-body">{c.body}</p>
            </div>
          </article>
        ))}
      </Scene>

      {/* 2 · OUTRO */}
      <Scene className="at-end">
        <div className="at-end-block">
          <h2>
            <span className="at-mask" style={{ ["--d" as string]: 0 }}><i>Put your network</i></span>
            <span className="at-mask at-hero-em" style={{ ["--d" as string]: 1 }}><i>on the map.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="at-btn">Request a survey ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
