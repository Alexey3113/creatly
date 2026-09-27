"use client";
/* ANIMATED · Nº25 — «VIGIL» (класс scroll-reveal, приём ФОНАРИК/spotlight).
   Поданное блюдо стоит в темноте при свече; поверх кадра — near-black веуль-
   маска с дырой-радиалом, центр которой едет за курсором (--px/--py с корня):
   гость «ищет» блюдо в темноте свечой. Тёплое янтарное свечение вокруг пятна
   повторяет пламя свечи из кадра. На coarse-pointer свеча статична и блюдо
   просто читается. Подпись VIGIL проявляется масками по --t пин-сцены.
   Бренд: ужин при свече — блюда, что подают только в темноте. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./vigil25.css";

const HERO = "/uploads/1/animated/vigil-hero.jpg";

export function Vigil25() {
  return (
    <ScrollStage className="vg">
      {/* 0 · ФОНАРИК — блюдо в темноте, свет за курсором, подпись проявляется */}
      <Scene className="vg-hero" pinned vh={190}>
        <div className="vg-stage">
          <img className="cine-media vg-img" src={HERO} alt="" draggable={false} />
          <div className="vg-torch" aria-hidden />
          <div className="vg-veil" aria-hidden />
          <div className="vg-noise" aria-hidden />
        </div>
        <div className="vg-kick"><span>VIGIL</span><span>A TASTING IN THE DARK · Nº25</span></div>
        <div className="vg-sign">
          <h1 className="vg-word"><span className="vg-line" style={{ ["--d" as string]: 0 }}><i>VIGIL</i></span></h1>
          <p className="vg-tag"><span className="vg-line" style={{ ["--d" as string]: 1 }}><i>Some dishes are only served in the dark.</i></span></p>
        </div>
        <div className="vg-cue" aria-hidden>move to search · scroll to descend ↓</div>
      </Scene>

      {/* 1 · STATEMENT — построчный reveal во мраке, янтарный акцент */}
      <Scene className="vg-say">
        <p className="vg-body">
          {[["We plate them", 0, false], ["by candle", 1, false], ["and low light —", 2, false], ["not to hide them,", 3, false], ["but to make you", 4, false], ["taste in the dark.", 5, true]].map(([t, d, red], i) => (
            <span key={i} className={`vg-line ${red ? "vg-red" : ""}`} style={{ ["--d" as string]: d as number }}><i>{t as string}</i></span>
          ))}
        </p>
      </Scene>

      {/* 2 · MENU — тихая карта дегустации в темноте */}
      <Scene className="vg-ledger">
        <div className="vg-ledger-head"><span>THE TASTING</span><span>Served · By candle · One seating</span></div>
        <ul className="vg-lots">
          {[["I", "Smoked marrow, black garlic", "the first light", "served"],
            ["II", "Duck, aged in amber glaze", "the long course", "by candle"],
            ["III", "Root cellar, ember & ash", "the dark plate", "served"],
            ["IV", "Burnt honey, salt, smoke", "the last taste", "by candle"]].map(([n, name, prov, st], i) => (
            <li key={i} className="vg-lot" style={{ ["--d" as string]: i }}>
              <span className="vg-lot-n">{n}</span>
              <span className="vg-lot-name">{name}</span>
              <span className="vg-lot-prov">{prov}</span>
              <span className={`vg-lot-st ${st === "served" ? "vg-red" : ""}`}>{st}</span>
            </li>
          ))}
        </ul>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="vg-end">
        <div className="vg-end-glow" aria-hidden />
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
