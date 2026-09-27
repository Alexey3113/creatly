"use client";
/* ANIMATED · Nº24 — «ECHO» (класс kinetic-typography, приём SPLIT-TITLE → ГАЛЕРЕЯ В РАЗРЫВЕ).
   Двусловный заголовок STILL / LIFE расщепляется по --t пинованной сцены: верхнее слово уходит
   вверх, нижнее вниз, между ними раскрывается горизонтальный разрыв — и туда ВЪЕЗЖАЕТ
   горизонтальная галерея трёх объектов (translateX по --t) с номерами. Финал — кадр крупно
   с гигантским словом-маской (background-clip:text). Палитра bone/timber ИЗ КАДРОВ echo-*-hero
   (галерейные объекты в тёплом свете). Бренд: ECHO — objects & editions.
   Кинетика: вордмарк наклоняется skewX по --vel; JS пишет только числа. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./echo24.css";

const PLATES = [
  { img: "/uploads/1/animated/echo-1-hero.jpg", n: "01", name: "Torso Vessel", note: "stoneware · 2026" },
  { img: "/uploads/1/animated/echo-2-hero.jpg", n: "02", name: "Fold Study", note: "cast paper · edition of 8" },
  { img: "/uploads/1/animated/echo-3-hero.jpg", n: "03", name: "The Long Room", note: "bronze & marble · sited" },
] as const;

export function Echo24() {
  return (
    <ScrollStage className="ec">
      {/* 0 · COVER — кинетический вордмарк, наклон по скорости */}
      <Scene className="ec-cover">
        <div className="ec-kick"><span>ECHO / OBJECTS &amp; EDITIONS</span><span>Nº24 · KINETIC</span></div>
        <div className="ec-hero" aria-label="Echo">
          <span className="ec-hero-l">SLOW</span>
          <span className="ec-hero-l ec-out">FORM,</span>
          <span className="ec-hero-l">LONG</span>
          <span className="ec-hero-l ec-accent">ECHO.</span>
        </div>
        <div className="ec-cue" aria-hidden>scroll — the title splits open ↓</div>
      </Scene>

      {/* 1 · SPLIT-TITLE PORTAL — слово расщепляется, в разрыв въезжает галерея */}
      <Scene className="ec-split" pinned vh={360}>
        <div className="ec-stage">
          <div className="ec-word ec-word-top" aria-hidden>STILL</div>
          <div className="ec-gap">
            <div className="ec-rail">
              {PLATES.map((p) => (
                <figure key={p.n} className="ec-plate">
                  <img className="ec-plate-img" src={p.img} alt="" draggable={false} />
                  <span className="ec-plate-n" aria-hidden>{p.n}</span>
                  <figcaption className="ec-plate-cap">
                    <span className="ec-plate-name">{p.name}</span>
                    <span className="ec-plate-note">{p.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="ec-word ec-word-bot" aria-hidden>LIFE</div>
        </div>
        <div className="ec-split-head" aria-hidden><span>CURRENT SHOW</span><span>three objects · one room</span></div>
      </Scene>

      {/* 2 · FRAME MASK — кадр крупно, слово-маска сквозь него */}
      <Scene className="ec-frame">
        <div className="ec-frame-bg" aria-hidden />
        <h2 className="ec-mask" aria-label="Echo">ECHO</h2>
        <p className="ec-frame-cap"><span className="ec-line"><i>Objects that answer the room back.</i></span></p>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="ec-end">
        <div className="ec-end-block">
          <div className="ec-end-h" aria-hidden>SEE<br /><span className="ec-accent">IN PERSON.</span></div>
          <a href="#" onClick={(e) => e.preventDefault()} className="ec-btn">Book a viewing ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
