"use client";
/* ANIMATED · Nº22 — «VERTEX» (класс 3d-product-theatre → ОДНА ПРОВОДКА ВДОЛЬ СТОЛА ДО УДАРА МОЛОТКА).
   Стол коллекционера — fixed-мир под всей страницей (без второй копии на стыке). scene-kit <Follow> ведёт
   камеру вдоль стола (--s/--tx/--ty): каждый лот — своя глава, камера останавливается на своём предмете,
   фокус (резкая копия под маской) держит только его; свет садится к финалу (--dusk). Сквозной объект —
   латунные аукционные часы (<Actor>): стрелки идут вместе с камерой, 18:00 → 18:55 «до удара молотка».
   Подписи лотов — по одной, без наложений. Палитра — из кадра: amber lamp + burgundy + walnut. Fraunces + Archivo. */
import { Actor, Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./vertex22.css";

const HERO = "/uploads/1/animated/vertex-hero.jpg";

/* лоты — реальные предметы кадра; tx/ty — сдвиг камеры (% коробки кадра), чтобы предмет встал в центр */
const LOTS = [
  { cls: "vx-l1", lot: "011", name: "Reading Lantern", mat: "spun brass & linen, 1938", prov: "Maison Lunel, Paris" },
  { cls: "vx-l2", lot: "024", name: "Bronze Carafe", mat: "hand-raised bronze", prov: "Isfahan bazaar, c. 1900" },
  { cls: "vx-l3", lot: "037", name: "Hour Vessel", mat: "brushed brass desk clock", prov: "eight-day movement" },
  { cls: "vx-l4", lot: "052", name: "Glass Tide", mat: "hand-blown crystal", prov: "single gather, unsigned" },
];

export function Vertex22() {
  return (
    <ScrollStage className="vx">
      <Follow stops={[
        { at: ".vx-cover", vars: { "--s": 1.02, "--tx": 0, "--ty": 0, "--dusk": 0, "--mm": 0, "--focus": 0 } },
        { at: ".vx-l1", vars: { "--s": 1.55, "--tx": 35.6, "--ty": -6, "--dusk": 0.05, "--mm": 12, "--focus": 1 } },
        { at: ".vx-l2", vars: { "--s": 1.8, "--tx": 23.4, "--ty": -12.6, "--dusk": 0.18, "--mm": 24, "--focus": 1 } },
        { at: ".vx-l3", vars: { "--s": 2, "--tx": -27, "--ty": -19, "--dusk": 0.32, "--mm": 37, "--focus": 1 } },
        { at: ".vx-l4", vars: { "--s": 2, "--tx": -57, "--ty": -15, "--dusk": 0.46, "--mm": 48, "--focus": 1 } },
        { at: ".vx-end", vars: { "--s": 1.12, "--tx": 0, "--ty": -3, "--dusk": 0.72, "--mm": 55, "--focus": 0 } },
      ]} />

      <div className="vx-world" aria-hidden>
        <div className="vx-cam"><div className="vx-plate vx-plate-soft" style={{ backgroundImage: `url(${HERO})` }} /></div>
        <div className="vx-sharpwin"><div className="vx-cam"><div className="vx-plate vx-plate-sharp" style={{ backgroundImage: `url(${HERO})` }} /></div></div>
        <div className="vx-dusk" />
        <div className="vx-frame">
          <span className="vx-frame-cnr vx-tl" /><span className="vx-frame-cnr vx-tr" />
          <span className="vx-frame-cnr vx-bl" /><span className="vx-frame-cnr vx-br" />
        </div>
      </div>

      {/* ЧАСЫ АУКЦИОНА — сквозной объект: время идёт вместе с проводкой */}
      <Actor width="6.4vw" zIndex={3} bob={3} tilt={0.02} className="vx-clock-actor" stops={[
        { at: ".vx-cover", pose: { x: 88, y: 20, s: 1.1 } },
        { at: ".vx-l1", pose: { x: 91, y: 16, s: 0.8 } },
        { at: ".vx-l4", pose: { x: 91, y: 16, s: 0.8 } },
        { at: ".vx-end", pose: { x: 50, y: 22, s: 1.5 } },
      ]}>
        <svg className="vx-clock" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" className="vx-clock-rim" />
          <circle cx="50" cy="50" r="39" className="vx-clock-face" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="50" y1="15" x2="50" y2={i % 3 === 0 ? 22 : 19} transform={`rotate(${i * 30} 50 50)`} className="vx-clock-tick" />
          ))}
          <line x1="50" y1="50" x2="50" y2="30" className="vx-hand vx-hand-h" />
          <line x1="50" y1="50" x2="50" y2="19" className="vx-hand vx-hand-m" />
          <circle cx="50" cy="50" r="3" className="vx-clock-pin" />
        </svg>
      </Actor>

      {/* 0 · COVER — весь стол в свете лампы */}
      <Scene className="vx-cover">
        <div className="vx-kick"><span>VERTEX — THE DESIGN ARCHIVE</span><span>Nº22 · WINTER SALE</span></div>
        <div className="vx-cover-copy">
          <p className="vx-eyebrow">a private table of consequential objects</p>
          <h1 className="vx-hero">
            <span className="vx-line" style={{ ["--d" as string]: 0 }}><i>Objects that</i></span>
            <span className="vx-line" style={{ ["--d" as string]: 1 }}><i>outlived</i></span>
            <span className="vx-line vx-amber" style={{ ["--d" as string]: 2 }}><i>their century.</i></span>
          </h1>
        </div>
        <div className="vx-cue" aria-hidden>scroll — walk the table, lot by lot ↓</div>
      </Scene>

      {/* 1–4 · ЛОТЫ — камера на предмете, подпись одна */}
      {LOTS.map((l, i) => (
        <Scene key={l.cls} className={`vx-lot ${l.cls}`}>
          <div className="vx-plaque">
            <span className="vx-plaque-lot">LOT Nº {l.lot} · {i + 1} / 4</span>
            <h2>{l.name}</h2>
            <span className="vx-plaque-mat">{l.mat}</span>
            <span className="vx-plaque-prov">{l.prov}</span>
          </div>
        </Scene>
      ))}

      {/* 5 · OUTRO — свет сел, часы у самого удара */}
      <Scene className="vx-end">
        <div className="vx-end-block">
          <p className="vx-end-eyebrow">52 lots · the gavel falls at seven</p>
          <h2>
            <span className="vx-line" style={{ ["--d" as string]: 0 }}><i>Take one home</i></span>
            <span className="vx-line vx-amber" style={{ ["--d" as string]: 1 }}><i>before the gavel.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="vx-btn">Register to bid ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
