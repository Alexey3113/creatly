"use client";
/* ANIMATED · Nº13 — «PULP» (класс kinetic-typography, приём продукт ВПЛЕТЁН в z-сэндвич вордмарка).
   Гигантский вордмарк едет/масштабируется по --scroll/--t; продукт-кадр (split-hero.jpg) зажат по
   z-index между ДВУМЯ слоями текста — bg-слово позади банки, fg-слово перед ней → «текст обнимает
   продукт». Полноэкранная смена цвет-блока по секции (candy-блоки из кадра: pink → orange → yellow).
   Плюс velocity-skew marquee. Палитра candy-block из split-hero. Бренд PULP — газированный цитрус. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./splash13.css";

const HERO = "/uploads/1/animated/split-hero.jpg";
const MARQUEE = "SPARKLING CITRUS — NO PULP LEFT BEHIND — ";

export function Splash13() {
  return (
    <ScrollStage className="sp">
      {/* 0 · COVER — z-сэндвич: bg-слово / банка / fg-слово, розовый блок */}
      <Scene className="sp-cover">
        <div className="sp-kick"><span>PULP · SPARKLING CITRUS</span><span>Nº13 · KINETIC</span></div>
        <div className="sp-stack" aria-hidden>
          <span className="sp-word sp-word-bg" data-t="PULP">PULP</span>
          <div className="sp-product">
            <img src={HERO} alt="" className="sp-product-img" />
          </div>
          <span className="sp-word sp-word-fg" data-t="PULP">PULP</span>
        </div>
        <div className="sp-cue" aria-hidden>scroll — the word wraps around the can ↓</div>
      </Scene>

      {/* 1 · MARQUEE — ряды слов едут и наклоняются по velocity, оранжевый блок */}
      <Scene className="sp-band">
        <div className="sp-band-row" style={{ ["--i" as string]: 0 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-row sp-band-rev" style={{ ["--i" as string]: 1 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-row" style={{ ["--i" as string]: 2 }} aria-hidden><span>{MARQUEE.repeat(6)}</span></div>
        <div className="sp-band-note">
          <span className="sp-line" style={{ ["--d" as string]: 0 }}><i>Real blood-orange. Real lime.</i></span>
          <span className="sp-line" style={{ ["--d" as string]: 1 }}><i>Zero syrup. All snap.</i></span>
        </div>
      </Scene>

      {/* 2 · SANDWICH (флагман) — банка вплывает между слоями «TASTE», жёлтый блок */}
      <Scene className="sp-sandwich" pinned vh={240}>
        <div className="sp-sandwich-in" aria-hidden>
          <span className="sp-big sp-big-bg">TASTE</span>
          <div className="sp-product sp-product-lg">
            <img src={HERO} alt="" className="sp-product-img" />
          </div>
          <span className="sp-big sp-big-fg">TASTE</span>
        </div>
        <div className="sp-sandwich-cap"><span className="sp-line" style={{ ["--d" as string]: 0 }}><i>Wrapped in flavour, front to back.</i></span></div>
      </Scene>

      {/* 3 · CTA — розовый блок */}
      <Scene className="sp-end">
        <h2 className="sp-end-h" aria-hidden>CRACK<br /><span className="sp-accent">ONE OPEN.</span></h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="sp-btn">Find a fridge near you ↗</a>
      </Scene>
    </ScrollStage>
  );
}
