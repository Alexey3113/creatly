"use client";
/* ANIMATED · Nº11 — «COLUMN» (класс scroll-reveal, приём FULL-HEIGHT АККОРДЕОН-КОЛОННЫ).
   Полноэкранная сцена из трёх вертикальных колонок-кадров. По скроллу активная колонка
   РАСШИРЯЕТСЯ через flex-grow (НЕ width) и заполняется своим фото с лёгким ken-burns;
   соседние сжимаются в тонкие вертикальные лейблы-корешки. У активной — маркер-глиф.
   Активность колонки = близость --t пинованной сцены к её слоту. Палитра sage/bone ИЗ КАДРОВ
   (кресла в дневном свете). Бренд: SÄV — мебельное ателье, серия «дневной свет».
   Ноль внешних RAF: JS пишет только --t, вся раскладка/движение — в CSS. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./column11.css";

const COLS = [
  { img: "/uploads/1/animated/column-1-hero.jpg", n: "01", name: "Bouclé Lounge", note: "oak · natural bouclé", c: 0.16 },
  { img: "/uploads/1/animated/column-2-hero.jpg", n: "02", name: "Woven Dining", note: "white oak · paper cord", c: 0.5 },
  { img: "/uploads/1/animated/column-3-hero.jpg", n: "03", name: "Curl Armchair", note: "solid frame · wool throw", c: 0.84 },
] as const;

export function Column11() {
  return (
    <ScrollStage className="cl">
      {/* 0 · COVER — editorial line-reveal, тихий вход */}
      <Scene className="cl-cover">
        <div className="cl-kick"><span>SÄV / SEATING ATELIER</span><span>Nº11 · DAYLIGHT SERIES</span></div>
        <h1 className="cl-hero">
          <span className="cl-line" style={{ ["--d" as string]: 0 }}><i>Chairs that</i></span>
          <span className="cl-line" style={{ ["--d" as string]: 1 }}><i>keep the</i></span>
          <span className="cl-line cl-sage" style={{ ["--d" as string]: 2 }}><i>daylight.</i></span>
        </h1>
        <div className="cl-cue" aria-hidden>scroll — the room opens ↓</div>
      </Scene>

      {/* 1 · ACCORDION — три колонки, активная растёт flex-grow, соседи → корешки */}
      <Scene className="cl-rack" pinned vh={330}>
        <div className="cl-cols">
          {COLS.map((col, i) => (
            <div
              key={col.n}
              className="cl-col"
              style={{ ["--c" as string]: col.c, ["--i" as string]: i, ["--flip" as string]: i % 2 ? 1 : -1 }}
            >
              <div className="cl-frame" aria-hidden>
                <img className="cl-img" src={col.img} alt="" draggable={false} />
                <span className="cl-veil" />
              </div>
              <span className="cl-spine">{col.name}</span>
              <span className="cl-mark" aria-hidden>✦</span>
              <div className="cl-plate">
                <span className="cl-plate-n">{col.n}</span>
                <span className="cl-plate-name">{col.name}</span>
                <span className="cl-plate-note">{col.note}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cl-rack-head" aria-hidden><span>THE RACK</span><span>three seats · one light</span></div>
        <div className="cl-cue cl-cue-rack" aria-hidden>scroll to move along the rack →</div>
      </Scene>

      {/* 2 · INDEX — тихая опись серии */}
      <Scene className="cl-index">
        <div className="cl-index-head"><span>SERIES INDEX</span><span>Daylight · 2026</span></div>
        <ul className="cl-list">
          {[["01", "Bouclé Lounge", "oak", "€1,480"],
            ["02", "Woven Dining", "white oak", "€890"],
            ["03", "Curl Armchair", "solid ash", "€2,240"]].map(([n, name, mat, price], i) => (
            <li key={i} className="cl-item" style={{ ["--d" as string]: i }}>
              <span className="cl-item-n">{n}</span>
              <span className="cl-item-name">{name}</span>
              <span className="cl-item-mat">{mat}</span>
              <span className="cl-item-price">{price}</span>
            </li>
          ))}
        </ul>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="cl-end">
        <div className="cl-end-block">
          <h2>
            <span className="cl-line" style={{ ["--d" as string]: 0 }}><i>Built for the</i></span>
            <span className="cl-line cl-sage" style={{ ["--d" as string]: 1 }}><i>slow hours.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="cl-btn">Visit the atelier ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
