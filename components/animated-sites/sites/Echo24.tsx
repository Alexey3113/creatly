"use client";
/* ANIMATED · Nº24 — «ECHO» (класс kinetic-typography → ЗАГОЛОВОК-ЗАНАВЕС И ПАНОРАМА ЗА НИМ).
   Одна пин-сцена: STILL / LIFE расходятся как занавес, в разрыве начинается панорама трёх объектов
   (полноразмерные кадры, а не мелкие карточки), разрыв растёт до полного экрана — последний кадр становится
   миром, и тот же кадр остаётся только внутри слова ECHO (остальное гаснет). Сквозная деталь — окно-кадр
   (scene-kit <Actor>): маленькое окно на обложке падает в разрыв заголовка; в финале полный кадр сжимается
   обратно в окно между SEE и IN PERSON. Палитра bone/timber ИЗ КАДРОВ. Archivo + Fraunces. */
import { Actor } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./echo24.css";

const PLATES = [
  { img: "/uploads/1/animated/echo-1-hero.jpg", n: "01", name: "Torso Vessel", note: "stoneware · 2026" },
  { img: "/uploads/1/animated/echo-2-hero.jpg", n: "02", name: "Fold Study", note: "cast paper · edition of 8" },
  { img: "/uploads/1/animated/echo-3-hero.jpg", n: "03", name: "The Long Room", note: "bronze & marble · sited" },
] as const;

/* якорь пин-сцены 460vh по её прогрессу t */
const pin = (t: number, V = 4.6) => (t * (V - 1) + 0.5) / V;

export function Echo24() {
  return (
    <ScrollStage className="ec">
      {/* ОКНО-КАДР: с обложки падает в разрыв заголовка */}
      <Actor zIndex={4} width="15vw" bob={4} tilt={0.06} className="ec-win-actor" stops={[
        { at: ".ec-cover", pose: { x: 76, y: 34, s: 1, r: -4 } },
        { at: ".ec-split", anchor: pin(0.02), pose: { x: 52, y: 50, s: 1.25, r: 0, o: 1 } },
        { at: ".ec-split", anchor: pin(0.1), pose: { x: 50, y: 50, s: 2.2, r: 0, o: 0 } },
      ]}>
        <span className="ec-win" style={{ backgroundImage: `url(${PLATES[0].img})` }} />
      </Actor>
      {/* …и в финале полный кадр сжимается обратно в окно между строками */}
      <Actor zIndex={4} width="15vw" bob={3} tilt={0.04} className="ec-win-actor" stops={[
        { at: ".ec-split", anchor: pin(0.97), pose: { x: 50, y: 50, s: 6.8, r: 0, o: 0 } },
        // проявляется, когда уже почти окно: крупный полупрозрачный «призрак» на стыке не нужен
        { at: ".ec-end", anchor: 0.2, pose: { x: 50, y: 49, s: 2.4, r: 0, o: 0.12 } },
        { at: ".ec-end", anchor: 0.3, pose: { x: 50, y: 48, s: 1.6, r: 0, o: 1 } },
        { at: ".ec-end", anchor: 0.5, pose: { x: 50, y: 47, s: 1.2, r: -3, o: 1 } },
      ]}>
        <span className="ec-win" style={{ backgroundImage: `url(${PLATES[2].img})` }} />
      </Actor>

      {/* 0 · COVER — кинетический вордмарк, окно в негативном пространстве */}
      <Scene className="ec-cover">
        <div className="ec-kick"><span>ECHO / OBJECTS &amp; EDITIONS</span><span>Nº24 · KINETIC</span></div>
        <div className="ec-hero" aria-label="Echo">
          <span className="ec-hero-l">SLOW</span>
          <span className="ec-hero-l ec-out">FORM,</span>
          <span className="ec-hero-l">LONG</span>
          <span className="ec-hero-l ec-accent">ECHO.</span>
        </div>
        <div className="ec-cue" aria-hidden>scroll — the title opens like a curtain ↓</div>
      </Scene>

      {/* 1 · CURTAIN → PANORAMA → ECHO — одна пин-сцена */}
      <Scene className="ec-split" pinned vh={460}>
        <div className="ec-stage">
          <div className="ec-word ec-word-top" aria-hidden>STILL</div>
          <div className="ec-gap">
            <div className="ec-rail">
              {PLATES.map((p) => (
                <figure key={p.n} className="ec-plate">
                  <img className="ec-plate-img" src={p.img} alt="" draggable={false} />
                  <figcaption className="ec-plate-cap">
                    <span className="ec-plate-n">{p.n}</span>
                    <span className="ec-plate-name">{p.name}</span>
                    <span className="ec-plate-note">{p.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="ec-word ec-word-bot" aria-hidden>LIFE</div>
        </div>
        {/* финал пина: кадр гаснет, остаётся только внутри слова */}
        <div className="ec-dark" aria-hidden />
        <h2 className="ec-mask" aria-label="Echo">ECHO</h2>
        <p className="ec-frame-cap">Objects that answer the room back.</p>
        <div className="ec-split-head" aria-hidden><span>CURRENT SHOW</span><span>three objects · one room</span></div>
      </Scene>

      {/* 2 · CLOSER — окно между строк */}
      <Scene className="ec-end">
        <div className="ec-end-block">
          <div className="ec-end-h" aria-hidden><span>SEE</span><span className="ec-end-gap" /><span className="ec-accent">IN PERSON.</span></div>
          <a href="#" onClick={(e) => e.preventDefault()} className="ec-btn">Book a viewing ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
