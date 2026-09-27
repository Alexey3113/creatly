"use client";
/* ANIMATED · Nº22 — «VERTEX» (класс 3d-product-theatre, приём ПОЛКА ОБЪЕКТОВ → экспонат в фокус).
   Один кинокадр (коллекционные объекты на ореховом столе в тёплом свете лампы) работает как
   театральная сцена: pin-сцена делает горизонтальный ПАН вдоль полки по --t (translateX кроп-слоя),
   центральный rack-focus (резкая копия под радиальной маской + мягкая размытая подложка) держит в
   фокусе только объект, проезжающий центр; музейные лот-подписи сменяются wipe'ом clip-path по --t;
   лёгкий pointer-parallax по --px/--py. Палитра — из кадра: amber lamp + burgundy + walnut.
   Бренд VERTEX — the design archive / зимний аукцион. Шрифт: Fraunces (аукционный серив) + Archivo. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./vertex22.css";

const HERO = "/uploads/1/animated/vertex-hero.jpg";

/* 4 экспоната по ходу пана слева→направо; c — центр окна фокуса на шкале --t (совпадает с паном). */
const LOTS: [string, string, string, string][] = [
  ["011", "SONGBIRD", "turned teak, 1959", "Kay Bojesen atelier"],
  ["024", "CRIMSON CARAFE", "faceted stoneware", "glazed by hand, Faenza"],
  ["037", "HOUR VESSEL", "brushed brass desk clock", "eight-day movement"],
  ["052", "GLASS TIDE", "hand-blown crystal", "single gather, unsigned"],
];

export function Vertex22() {
  return (
    <ScrollStage className="vx">
      {/* 0 · COVER — весь стол в тёплом свете, заголовок проявляется маской */}
      <Scene className="vx-cover">
        <div className="vx-cover-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="vx-cover-grade" aria-hidden />
        <div className="vx-kick"><span>VERTEX — THE DESIGN ARCHIVE</span><span>Nº22 · WINTER SALE</span></div>
        <div className="vx-cover-copy">
          <p className="vx-eyebrow">a private table of consequential objects</p>
          <h1 className="vx-hero">
            <span className="vx-line" style={{ ["--d" as string]: 0 }}><i>Objects that</i></span>
            <span className="vx-line" style={{ ["--d" as string]: 1 }}><i>outlived</i></span>
            <span className="vx-line vx-amber" style={{ ["--d" as string]: 2 }}><i>their century.</i></span>
          </h1>
        </div>
        <div className="vx-cue" aria-hidden>scroll — walk the shelf ↓</div>
      </Scene>

      {/* 1 · SHELF — горизонтальный пан + rack-focus + смена лот-подписей (pin-scrub) */}
      <Scene className="vx-shelf" pinned vh={340}>
        <div className="vx-stage" aria-hidden>
          <div className="vx-plane vx-plane-soft" style={{ backgroundImage: `url(${HERO})` }} />
          <div className="vx-plane vx-plane-sharp" style={{ backgroundImage: `url(${HERO})` }} />
          <div className="vx-lamp" />
          <div className="vx-spot" />
          <div className="vx-vignette" />
        </div>

        {/* центральная фокус-рамка + бегущий лот-счётчик */}
        <div className="vx-frame" aria-hidden>
          <span className="vx-frame-cnr vx-tl" /><span className="vx-frame-cnr vx-tr" />
          <span className="vx-frame-cnr vx-bl" /><span className="vx-frame-cnr vx-br" />
        </div>
        <div className="vx-progress" aria-hidden><span className="vx-progress-fill" /></div>

        {/* нижние лот-таблички — сменяются wipe'ом clip-path по --t (активна только одна) */}
        <div className="vx-plaques">
          {LOTS.map(([lot, name, mat, prov], i) => (
            <div key={i} className="vx-plaque" style={{ ["--i" as string]: i }}>
              <span className="vx-plaque-lot">LOT Nº {lot}</span>
              <h2>{name}</h2>
              <span className="vx-plaque-mat">{mat}</span>
              <span className="vx-plaque-prov">{prov}</span>
            </div>
          ))}
        </div>
        <span className="vx-shelf-tag" aria-hidden>the shelf · in focus</span>
      </Scene>

      {/* 2 · OUTRO — свет садится, CTA аукциона */}
      <Scene className="vx-end">
        <div className="vx-end-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="vx-end-veil" aria-hidden />
        <div className="vx-end-block">
          <p className="vx-end-eyebrow">52 lots · viewing by appointment</p>
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
