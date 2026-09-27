"use client";
/* ANIMATED · Nº26 — «STRATA» (класс scroll-reveal, приём 2.5D DEPTH-SLICE).
   Плоская вектор-иллюстрация каньона в сумерках разрезана на 4 глубинных слоя
   (небо · дальние гряды · средние · ближняя кромка) — каждый слой это ТОТ ЖЕ <img>
   в кроп-контейнере с alpha-маской своей полосы и своим translateY/scale по --t →
   камера ныряет вглубь каньона, ближняя кромка уезжает мимо зрителя. Заголовки-главы
   сменяются масками (clip-path) по окнам --t. Палитра indigo/amber dusk ИЗ КАДРА.
   Бренд: полевой журнал глубоких мест. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./strata26.css";

const HERO = "/uploads/1/animated/strata-hero.jpg";
const LAYERS = ["sky", "far", "mid", "near"];
const CHAPTERS = [
  ["01", "The Rim", "where the light still reaches", 0.14],
  ["02", "The Descent", "cool air, folding shadow", 0.5],
  ["03", "The River", "the floor the sun forgot", 0.86],
] as const;

export function Strata26() {
  return (
    <ScrollStage className="st">
      {/* 0 · DEPTH-DIVE — камера ныряет сквозь слои, главы сменяются масками */}
      <Scene className="st-dive" pinned vh={320}>
        <div className="st-stage">
          {LAYERS.map((l, i) => (
            <div key={l} className={`st-layer st-l-${l}`} style={{ ["--i" as string]: i }} aria-hidden>
              <img className="st-plate" src={HERO} alt="" draggable={false} />
            </div>
          ))}
          <div className="st-dusk" aria-hidden />
        </div>
        <div className="st-kick"><span>STRATA</span><span>FIELD JOURNAL · Nº26</span></div>
        <div className="st-chapters" aria-hidden>
          {CHAPTERS.map(([n, title, sub, c], i) => (
            <div key={i} className="st-ch" style={{ ["--c" as string]: c }}>
              <span className="st-ch-n">{n}</span>
              <h2 className="st-ch-t">{title}</h2>
              <p className="st-ch-s">{sub}</p>
            </div>
          ))}
        </div>
        <div className="st-cue" aria-hidden>scroll to descend ↓</div>
      </Scene>

      {/* 1 · INTRO — editorial line-reveal, тёплый amber акцент */}
      <Scene className="st-intro">
        <p className="st-body">
          {[["A canyon is not a view.", 0, false], ["It is a stack of hours —", 1, false], ["each ledge a colder", 2, false], ["shade of the same", 3, false], ["evening.", 4, true]].map(([t, d, amber], i) => (
            <span key={i} className={`st-line ${amber ? "st-amber" : ""}`} style={{ ["--d" as string]: d as number }}><i>{t as string}</i></span>
          ))}
        </p>
      </Scene>

      {/* 2 · NOTES — тихая опись глав журнала */}
      <Scene className="st-notes">
        <div className="st-notes-head"><span>FIELD NOTES</span><span>Vol. VI · Dusk Descents</span></div>
        <ul className="st-list">
          {[["01", "The Rim", "1,470 m", "18:04"],
            ["02", "The Descent", "820 m", "18:41"],
            ["03", "The River", "0 m", "19:22"]].map(([n, name, elev, time], i) => (
            <li key={i} className="st-item" style={{ ["--d" as string]: i }}>
              <span className="st-item-n">{n}</span>
              <span className="st-item-name">{name}</span>
              <span className="st-item-elev">{elev}</span>
              <span className="st-item-time">{time}</span>
            </li>
          ))}
        </ul>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="st-end">
        <div className="st-end-block">
          <h2>
            <span className="st-line" style={{ ["--d" as string]: 0 }}><i>Come down</i></span>
            <span className="st-line st-amber" style={{ ["--d" as string]: 1 }}><i>before the light does.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="st-btn">Read the field notes ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
