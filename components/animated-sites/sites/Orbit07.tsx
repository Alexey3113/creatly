"use client";
/* ANIMATED · Nº07 — «ORBIT» (класс 3d-product-theatre, приём ЧЕСТНАЯ IMAGE-SCRUB подача облёта).
   Настоящий turntable-облёт нужен видео — здесь ОДИН кинокадр (матовый глиняный артефакт на HIGH-KEY
   белом студийном фоне) без realtime-3D: в pin-сцене объект изолирован радиальной маской из кадра и
   плавно МАСШТАБИРУЕТСЯ / паном входит по --t; под ним поворачивается мягкая студийная ТЕНЬ по --t;
   лёгкий градиент-подсвет (soft light) следует за --px; музейные спец-подписи (материал/форма/размер)
   сменяются clip-path wipe'ом по --t. Плюс тёплый песочный градиент из кадра.
   Палитра ИЗ КАДРА: high-key bone/off-white + ink + один тёплый серо-песочный акцент.
   Бренд ORBIT — OBJECT STUDY (галерея форм, изучение одного объекта). */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./orbit07.css";

const HERO = "/uploads/1/animated/orbit-hero.jpg";

const SPECS: [string, string][] = [
  ["STUDY", "Orbit, Nº VII"],
  ["FORM", "hand-shaped, matte clay"],
  ["SCALE", "38 × 22 cm · unique"],
  ["EDITION", "single specimen"],
  ["FINISH", "raw bisque, unglazed"],
];

/* музейные плашки — сменяются clip-path wipe'ом по --t */
const CARDS: [string, string, string][] = [
  ["MASS", "weight, held loosely", "the first turn"],
  ["CURVE", "the line, doubled back", "the still point"],
  ["VOID", "the space it keeps", "the long look"],
];

export function Orbit07() {
  return (
    <ScrollStage className="or">
      {/* 0 · COVER — кадр в свету, high-key грейд, тёплый градиент, заголовок маской */}
      <Scene className="or-cover">
        <div className="or-cover-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="or-cover-grade" aria-hidden />
        <div className="or-kick"><span>ORBIT — OBJECT STUDY</span><span>Nº07 · FORM GALLERY</span></div>
        <div className="or-cover-copy">
          <p className="or-eyebrow">a single form, studied in the light</p>
          <h1 className="or-hero">
            <span className="or-line" style={{ ["--d" as string]: 0 }}><i>A shape</i></span>
            <span className="or-line or-gold" style={{ ["--d" as string]: 1 }}><i>turned</i></span>
            <span className="or-line" style={{ ["--d" as string]: 2 }}><i>in the light.</i></span>
          </h1>
        </div>
        <div className="or-cue" aria-hidden>scroll — take the stage ↓</div>
      </Scene>

      {/* 1 · THEATRE — объект масштабируется/пан, студийная тень, soft light по --px, карты clip-path (pin-scrub) */}
      <Scene className="or-theatre" pinned vh={320}>
        <div className="or-room" aria-hidden />
        <div className="or-beam" aria-hidden />
        <div className="or-turntable" aria-hidden />
        <div className="or-object" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="or-spot" aria-hidden />

        {/* левая колонка — стаггер музейного спец-листа */}
        <ul className="or-specs">
          {SPECS.map(([k, v], i) => (
            <li key={i} className="or-spec" style={{ ["--i" as string]: i }}>
              <span className="or-spec-k">{k}</span>
              <span className="or-spec-v">{v}</span>
            </li>
          ))}
        </ul>

        {/* правые музейные плашки — сменяются clip-path wipe'ом по --t */}
        <div className="or-cards">
          {CARDS.map(([t, s, note], i) => (
            <div key={i} className="or-card" style={{ ["--i" as string]: i }}>
              <span className="or-card-idx">0{i + 1} · {note}</span>
              <h2>{t}</h2>
              <span className="or-card-sub">{s}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 · OUTRO — свет ложится, CTA */}
      <Scene className="or-end">
        <div className="or-end-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="or-end-veil" aria-hidden />
        <div className="or-end-block">
          <h2>
            <span className="or-line" style={{ ["--d" as string]: 0 }}><i>Take home</i></span>
            <span className="or-line or-gold" style={{ ["--d" as string]: 1 }}><i>the piece.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="or-btn">Acquire the piece ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
