"use client";
/* ANIMATED · Nº04 — «ASCEND» (класс scroll-reveal, приём DEPTH-SLICE).
   ОДИН кинокадр (альпийские пики на рассвете) разрезан на 4 глубинных слоя — небо / дальние пики /
   туманные гребни / ближний хребет — каждый это тот же кадр в своём clip-path-кропе. По прогрессу
   pin-сцены слои дают разный translateY+scale (ближние сильнее) → «нырок камеры в долину» 2.5D без WebGL.
   Плюс лёгкий pointer-parallax по --px/--py. Заголовок-манифест проявляется масками.
   Палитра — из кадра: peach dawn + cool alpine blue. Бренд MERIDIAN — high-altitude expeditions. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./ascend04.css";

const HERO = "/uploads/1/animated/ascend-hero.jpg";

export function Ascend04() {
  return (
    <ScrollStage className="as">
      {/* 0 · COVER — собранный кадр, медленный ken-burns, заголовок проявляется маской */}
      <Scene className="as-cover">
        <div className="as-cover-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="as-cover-grade" aria-hidden />
        <div className="as-kick"><span>MERIDIAN</span><span>Nº04 · HIGH ROUTES</span></div>
        <div className="as-cover-copy">
          <p className="as-eyebrow">alpine expeditions, above the weather</p>
          <h1 className="as-hero">
            <span className="as-line" style={{ ["--d" as string]: 0 }}><i>Where the</i></span>
            <span className="as-line" style={{ ["--d" as string]: 1 }}><i>map runs</i></span>
            <span className="as-line as-warm" style={{ ["--d" as string]: 2 }}><i>out of air.</i></span>
          </h1>
        </div>
        <div className="as-cue" aria-hidden>scroll — fall into the range ↓</div>
      </Scene>

      {/* 1 · DIVE — depth-slice: 4 плоскости из одного кадра ныряют с разной глубиной (pin-scrub) */}
      <Scene className="as-dive" pinned vh={280}>
        <div className="as-stage" aria-hidden>
          <div className="as-slice as-sky"  style={{ backgroundImage: `url(${HERO})`, ["--dz" as string]: 0.06 }} />
          <div className="as-slice as-far"  style={{ backgroundImage: `url(${HERO})`, ["--dz" as string]: 0.18 }} />
          <div className="as-slice as-mid"  style={{ backgroundImage: `url(${HERO})`, ["--dz" as string]: 0.36 }} />
          <div className="as-slice as-near" style={{ backgroundImage: `url(${HERO})`, ["--dz" as string]: 0.64 }} />
          <div className="as-dive-vignette" />
        </div>
        <div className="as-dive-copy">
          <span className="as-tag">02 — the descent line</span>
          <h2>
            <span className="as-line" style={{ ["--d" as string]: 0 }}><i>Six ranges.</i></span>
            <span className="as-line" style={{ ["--d" as string]: 1 }}><i>Forty summits.</i></span>
            <span className="as-line as-warm" style={{ ["--d" as string]: 2 }}><i>One horizon.</i></span>
          </h2>
        </div>
      </Scene>

      {/* 2 · OUTRO — кадр садится в предгорья, CTA */}
      <Scene className="as-end">
        <div className="as-end-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="as-end-veil" aria-hidden />
        <div className="as-end-block">
          <h2>
            <span className="as-line" style={{ ["--d" as string]: 0 }}><i>Book the line</i></span>
            <span className="as-line as-warm" style={{ ["--d" as string]: 1 }}><i>above the clouds.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="as-btn">Plan an ascent ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
