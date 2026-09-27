"use client";
/* ANIMATED · Nº25 — «VIGIL» (класс scroll-reveal → ОДНА СВЕЧА ВЕДЁТ ПО УЖИНУ).
   Блюдо в темноте — fixed-мир под всей страницей. Пятно света больше не ищет курсор: его ведёт scroll —
   scene-kit <Follow> двигает центр и радиус (--lx/--ly/--lr) через все главы. Свеча — сквозной объект
   (<Actor>, живое пламя): отрывается от свечи в кадре, идёт к строкам манифеста, по одному выхватывает
   блюда меню (--lit) и возвращается к столу в финале. Первый кадр собран в покое (без маски пополам).
   Палитра ИЗ КАДРА: тёплый near-black + candle-amber. Fraunces + Archivo. */
import { Actor, Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./vigil25.css";

const HERO = "/uploads/1/animated/vigil-hero.jpg";

const COURSES = [
  ["I", "Smoked marrow, black garlic", "the first light", "served"],
  ["II", "Duck, aged in amber glaze", "the long course", "by candle"],
  ["III", "Root cellar, ember & ash", "the dark plate", "served"],
  ["IV", "Burnt honey, salt, smoke", "the last taste", "by candle"],
];

export function Vigil25() {
  return (
    <ScrollStage className="vg">
      {/* СВЕТ НА ВСЮ СТРАНИЦУ: где пятно, насколько широко, какое блюдо выхвачено */}
      <Follow stops={[
        { at: ".vg-hero", vars: { "--lx": 53, "--ly": 54, "--lr": 30, "--dim": 0 } },
        { at: ".vg-say", vars: { "--lx": 60, "--ly": 55, "--lr": 22, "--dim": 0.3 } },
        { at: ".vg-lot:nth-child(1)", vars: { "--lx": 8, "--ly": 50, "--lr": 15, "--dim": 0.8, "--lit": 0 } },
        { at: ".vg-lot:nth-child(2)", vars: { "--lx": 8, "--ly": 50, "--lr": 15, "--dim": 0.8, "--lit": 1 } },
        { at: ".vg-lot:nth-child(3)", vars: { "--lx": 8, "--ly": 50, "--lr": 15, "--dim": 0.8, "--lit": 2 } },
        { at: ".vg-lot:nth-child(4)", vars: { "--lx": 8, "--ly": 50, "--lr": 15, "--dim": 0.8, "--lit": 3 } },
        { at: ".vg-end", vars: { "--lx": 50, "--ly": 44, "--lr": 24, "--dim": 0.2, "--lit": 4 } },
      ]} />

      <div className="vg-world" aria-hidden>
        <img className="vg-img" src={HERO} alt="" draggable={false} />
        <div className="vg-torch" />
        <div className="vg-veil" />
        <div className="vg-noise" />
      </div>

      {/* СВЕЧА — сквозное пламя: от свечи в кадре к строкам, по меню, к столу */}
      <Actor zIndex={3} width="2.6vw" bob={2} tilt={0.05} className="vg-flame-actor" stops={[
        { at: ".vg-hero", pose: { x: 24.5, y: 6, s: 0.8, o: 0 } },
        { at: ".vg-say", anchor: 0.3, pose: { x: 24.5, y: 22, s: 1, o: 1 } },
        { at: ".vg-say", anchor: 0.7, pose: { x: 6, y: 52, s: 1, o: 1 } },
        { at: ".vg-lot:nth-child(1)", pose: { x: -1.8, y: 50, s: 0.8, o: 1, dock: true } },
        { at: ".vg-lot:nth-child(2)", pose: { x: -1.8, y: 50, s: 0.8, o: 1, dock: true } },
        { at: ".vg-lot:nth-child(3)", pose: { x: -1.8, y: 50, s: 0.8, o: 1, dock: true } },
        { at: ".vg-lot:nth-child(4)", pose: { x: -1.8, y: 50, s: 0.8, o: 1, dock: true } },
        { at: ".vg-end", pose: { x: 50, y: 30, s: 1.5, o: 1 } },
      ]}>
        <span className="vg-flame"><i /></span>
      </Actor>

      {/* 0 · ОБЛОЖКА — собрана в покое */}
      <Scene className="vg-hero">
        <div className="vg-kick"><span>VIGIL</span><span>A TASTING IN THE DARK · Nº25</span></div>
        <div className="vg-sign">
          <h1 className="vg-word">VIGIL</h1>
          <p className="vg-tag">Some dishes are only served in the dark.</p>
        </div>
        <div className="vg-cue" aria-hidden>scroll — follow the candle ↓</div>
      </Scene>

      {/* 1 · STATEMENT — свеча подходит к строкам */}
      <Scene className="vg-say">
        <p className="vg-body">
          {[["We plate them", 0, false], ["by candle", 1, false], ["and low light —", 2, false], ["not to hide them,", 3, false], ["but to make you", 4, false], ["taste in the dark.", 5, true]].map(([t, d, red], i) => (
            <span key={i} className={`vg-line ${red ? "vg-red" : ""}`} style={{ ["--d" as string]: d as number }}><i>{t as string}</i></span>
          ))}
        </p>
      </Scene>

      {/* 2 · MENU — свеча выхватывает блюда по одному */}
      <Scene className="vg-ledger">
        <div className="vg-ledger-head"><span>THE TASTING</span><span>Served · By candle · One seating</span></div>
        <ul className="vg-lots">
          {COURSES.map(([n, name, prov, st], i) => (
            <li key={i} className="vg-lot" style={{ ["--d" as string]: i }}>
              <span className="vg-lot-n">{n}</span>
              <span className="vg-lot-name">{name}</span>
              <span className="vg-lot-prov">{prov}</span>
              <span className={`vg-lot-st ${st === "served" ? "vg-red" : ""}`}>{st}</span>
            </li>
          ))}
        </ul>
      </Scene>

      {/* 3 · CLOSER — свеча на столе */}
      <Scene className="vg-end">
        <div className="vg-end-block">
          <h2>
            <span className="vg-line" style={{ ["--d" as string]: 0 }}><i>The room is dark.</i></span>
            <span className="vg-line vg-red" style={{ ["--d" as string]: 1 }}><i>The table is set.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="vg-btn">Reserve the table ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
