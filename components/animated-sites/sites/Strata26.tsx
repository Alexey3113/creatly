"use client";
/* ANIMATED · Nº26 — «STRATA» (класс scroll-reveal → ОДИН СПУСК В КАНЬОН).
   Каньон — fixed-мир под всей страницей: небо+дальние гряды (плита), средние гряды (полоса) и ближние
   стены — отдельный слой, вырезанный из того же кадра по силуэту (стены поднимаются мимо камеры, а не
   режутся полосами). Спуск и сумерки ведёт scene-kit <Follow> по якорям глав на ВЕСЬ скролл: --dive
   (камера опускается между стен), --dusk (небо темнеет до ночи, проступают звёзды), на дне — река.
   Высотомер 1470 m → 0 m идёт через все главы и полевые заметки. Первый кадр собран в покое. */
import { Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./strata26.css";

const HERO = "/uploads/1/animated/strata-hero.jpg";
const NEAR = "/uploads/1/animated/strata-near.webp";

const CHAPTERS = [
  ["st-rim", "01", "The Rim", "where the light still reaches"],
  ["st-descent", "02", "The Descent", "cool air, folding shadow"],
  ["st-river", "03", "The River", "the floor the sun forgot"],
] as const;

export function Strata26() {
  return (
    <ScrollStage className="st">
      {/* СПУСК И СВЕТ — одна ось на всю страницу */}
      <Follow stops={[
        { at: ".st-rim", vars: { "--dive": 0, "--dusk": 0 } },
        { at: ".st-descent", vars: { "--dive": 0.48, "--dusk": 0.34 } },
        { at: ".st-river", vars: { "--dive": 0.88, "--dusk": 0.66 } },
        { at: ".st-intro", vars: { "--dive": 1, "--dusk": 0.8 } },
        { at: ".st-end", vars: { "--dive": 1, "--dusk": 1 } },
      ]} />
      <Follow round stops={[
        { at: ".st-rim", vars: { "--elev": 1470 } },
        { at: ".st-descent", vars: { "--elev": 820 } },
        { at: ".st-river", vars: { "--elev": 0 } },
      ]} />

      {/* МИР — каньон под всеми главами */}
      <div className="st-world" aria-hidden>
        <img className="st-plate st-base" src={HERO} alt="" draggable={false} />
        <img className="st-plate st-mid" src={HERO} alt="" draggable={false} />
        <div className="st-night" />
        <div className="st-stars" />
        <svg className="st-rivr" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="st-rv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd9a8" stopOpacity=".2" />
              <stop offset=".5" stopColor="#f0a24e" stopOpacity=".85" />
              <stop offset="1" stopColor="#8f6bd0" stopOpacity=".9" />
            </linearGradient>
          </defs>
          <path d="M49 70 C 52 74, 46 78, 50 82 C 55 87, 44 92, 47 100 L 61 100 C 58 93, 66 88, 58 83 C 54 79, 57 75, 51 70 Z" fill="url(#st-rv)" />
        </svg>
        <img className="st-plate st-near" src={NEAR} alt="" draggable={false} />
        <div className="st-shade" />
      </div>

      {/* высотомер — сквозная деталь спуска */}
      <div className="st-alt" aria-hidden>
        <span className="st-alt-k">ELEV</span>
        <span className="st-alt-v" />
        <span className="st-alt-rule"><i /></span>
      </div>

      {CHAPTERS.map(([cls, n, title, sub], i) => (
        <Scene key={cls} className={`st-ch ${cls}`}>
          {i === 0 && <div className="st-kick"><span>STRATA</span><span>FIELD JOURNAL · Nº26</span></div>}
          <div className="st-ch-in">
            <span className="st-ch-n">{n}</span>
            <h2 className="st-ch-t">{title}</h2>
            <p className="st-ch-s">{sub}</p>
          </div>
          {i === 0 && <div className="st-cue" aria-hidden>scroll to descend ↓</div>}
        </Scene>
      ))}

      {/* 1 · INTRO — на дне, у реки */}
      <Scene className="st-intro">
        <p className="st-body">
          {[["A canyon is not a view.", 0, false], ["It is a stack of hours —", 1, false], ["each ledge a colder", 2, false], ["shade of the same", 3, false], ["evening.", 4, true]].map(([t, d, amber], i) => (
            <span key={i} className={`st-line ${amber ? "st-amber" : ""}`} style={{ ["--d" as string]: d as number }}><i>{t as string}</i></span>
          ))}
        </p>
      </Scene>

      {/* 2 · NOTES — опись спуска */}
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

      {/* 3 · CLOSER — ночь на дне, река держит последний свет */}
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
