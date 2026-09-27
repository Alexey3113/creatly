"use client";
/* ANIMATED · ФЛАГМАН 2 — «KINETIC» (класс kinetic-typography, приём velocity-skew marquee).
   Гигантские слова едут горизонтально по --scroll и наклоняются skewX по --vel (скорость скролла) —
   «живая масса текста». Плюс split-word портал: слово расщепляется, между половинами растёт овал по --t.
   Чистый DOM/CSS, ноль ассетов. Контраст органики нет — чистый гротеск как материал. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "./kinetic02.css";

const ROWS = ["MOTION", "IS THE", "MESSAGE", "SPEED", "AS FORM"];

export function Kinetic02() {
  return (
    <ScrollStage className="kn">
      {/* 0 · COVER — вордмарк наклоняется на скорости */}
      <Scene className="kn-cover">
        <div className="kn-kick"><span>CREATLY / ANIMATED</span><span>Nº02 · KINETIC</span></div>
        <div className="kn-hero" aria-label="Kinetic">
          <span className="kn-hero-l" data-t="TYPE">TYPE</span>
          <span className="kn-hero-l kn-accent" data-t="IN">IN</span>
          <span className="kn-hero-l" data-t="MOTION">MOTION</span>
        </div>
        <div className="kn-cue" aria-hidden>scroll — the faster you go, the more it leans ↓</div>
      </Scene>

      {/* 1 · MARQUEE BAND — ряды едут и наклоняются по velocity */}
      <Scene className="kn-band">
        {ROWS.map((w, i) => (
          <div key={i} className={`kn-row ${i % 2 ? "kn-row-rev" : ""}`} style={{ ["--i" as string]: i }} aria-hidden>
            <span>{`${w} — `.repeat(8)}</span>
          </div>
        ))}
      </Scene>

      {/* 2 · SPLIT PORTAL — слово расщепляется, между половинами растёт овал */}
      <Scene className="kn-split">
        <div className="kn-split-word" aria-hidden>
          <span className="kn-half kn-half-l">DES</span>
          <span className="kn-portal"><span className="kn-portal-fill" /></span>
          <span className="kn-half kn-half-r">IGN</span>
        </div>
        <div className="kn-split-cap"><span className="kn-line"><i>A gap opens between the letters — and something arrives.</i></span></div>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="kn-end">
        <h2 className="kn-end-h" aria-hidden>GO<br /><span className="kn-accent">FAST.</span></h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="kn-btn">See it move ↗</a>
      </Scene>
    </ScrollStage>
  );
}
