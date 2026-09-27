"use client";
/* ANIMATED · ФЛАГМАН 2 — «KINETIC» (класс kinetic-typography → ОДИН СИНИЙ ШАР ЧЕРЕЗ ВСЕ СЛОВА).
   Сквозной объект — синий шар (scene-kit <Actor>): точка после «IN» на обложке → катится сквозь бегущие
   строки (между рядами, за буквами) → встаёт в разрыв DES●IGN и растёт в нём → раскрывается на весь экран
   и становится синим полем финала «GO FAST.». Наклон от скорости — на словах и на шаре. Ноль ассетов.
   Палитра: бумага + чёрный гротеск + электрический синий. */
import { Actor } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "./kinetic02.css";

const ROWS = ["MOTION", "IS THE", "MESSAGE", "SPEED", "AS FORM"];

export function Kinetic02() {
  return (
    <ScrollStage className="kn">
      {/* ШАР — сквозь все сцены; в финале раскрывается в синее поле */}
      <Actor zIndex={2} width="8vw" bob={4} tilt={0.18} className="kn-ball-actor" stops={[
        { at: ".kn-cover", pose: { x: 58, y: 46, s: 0.62, r: 0 } },
        { at: ".kn-band", anchor: 0.18, pose: { x: 90, y: 28, s: 1.05, r: -120 } },
        { at: ".kn-band", anchor: 0.82, pose: { x: 10, y: 72, s: 1.05, r: -900 } },
        { at: ".kn-split", anchor: 0.5, pose: { x: 50, y: 50, s: 3.9, r: -1080 } },
        { at: ".kn-end", anchor: 0.12, pose: { x: 50, y: 50, s: 30, r: -1080 } },
        { at: ".kn-end", anchor: 0.3, pose: { x: 50, y: 50, s: 30, r: -1080, o: 0 } },
      ]}>
        <span className="kn-ball" />
      </Actor>

      {/* 0 · COVER — вордмарк наклоняется на скорости; шар — точка после IN */}
      <Scene className="kn-cover">
        <div className="kn-kick"><span>CREATLY / ANIMATED</span><span>Nº02 · KINETIC</span></div>
        <div className="kn-hero" aria-label="Kinetic">
          <span className="kn-hero-l" data-t="TYPE">TYPE</span>
          <span className="kn-hero-l kn-accent" data-t="IN">IN</span>
          <span className="kn-hero-l" data-t="MOTION">MOTION</span>
        </div>
        <div className="kn-cue" aria-hidden>scroll — follow the dot ↓</div>
      </Scene>

      {/* 1 · MARQUEE BAND — шар катится между рядами */}
      <Scene className="kn-band">
        {ROWS.map((w, i) => (
          <div key={i} className={`kn-row ${i % 2 ? "kn-row-rev" : ""}`} style={{ ["--i" as string]: i }} aria-hidden>
            <span>{`${w} — `.repeat(8)}</span>
          </div>
        ))}
      </Scene>

      {/* 2 · SPLIT PORTAL — слово расходится, шар встаёт в разрыв и растёт */}
      <Scene className="kn-split">
        <div className="kn-split-word" aria-hidden>
          <span className="kn-half kn-half-l">DES</span>
          <span className="kn-portal" />
          <span className="kn-half kn-half-r">IGN</span>
        </div>
        <div className="kn-split-cap"><span className="kn-line"><i>A gap opens between the letters — and something arrives.</i></span></div>
      </Scene>

      {/* 3 · CLOSER — внутри шара */}
      <Scene className="kn-end">
        <h2 className="kn-end-h" aria-hidden>GO<br /><span className="kn-ink">FAST.</span></h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="kn-btn">See it move ↗</a>
      </Scene>
    </ScrollStage>
  );
}
