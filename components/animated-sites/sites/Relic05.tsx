"use client";
/* ANIMATED · Nº05 — «RELIC» (класс scroll-reveal, приём МУЗЕЙНАЯ backlit-ring + turntable + clip-path).
   Pinned-сцена: мраморный бюст изолирован радиальной маской из кинокадра; за ним backlit-кольцо
   (radial-gradient+blur) в electric-blue раздувается по --t; под плинтом медленно вращается turntable-блик;
   заголовки-«таблички» сменяются wipe'ом clip-path:inset() по прогрессу; слева стаггер спец-списка.
   Палитра — из кадра: near-black + electric-blue ambient + ivory marble. Бренд SERAPHIN — private archive. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./relic05.css";

const HERO = "/uploads/1/animated/relic-hero.jpg";

const SPECS = [
  ["MEDIUM", "Parian marble"],
  ["HEIGHT", "74 cm"],
  ["ORIGIN", "Attic workshop"],
  ["LOT", "Nº 004 / XII"],
  ["STATE", "museum-grade"],
];

const PLAQUES = [
  ["CARVED", "circa 40 BC"],
  ["PROVENANCE", "unbroken line"],
  ["ARCHIVED", "in permanent light"],
];

export function Relic05() {
  return (
    <ScrollStage className="rl">
      {/* 0 · COVER — объект во тьме, электрик-блю амбиент, заголовок маской */}
      <Scene className="rl-cover">
        <div className="rl-cover-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="rl-cover-grade" aria-hidden />
        <div className="rl-kick"><span>SERAPHIN</span><span>Nº05 · PRIVATE ARCHIVE</span></div>
        <div className="rl-cover-copy">
          <p className="rl-eyebrow">antiquities, held in light</p>
          <h1 className="rl-hero">
            <span className="rl-line" style={{ ["--d" as string]: 0 }}><i>One object.</i></span>
            <span className="rl-line rl-blue" style={{ ["--d" as string]: 1 }}><i>Two thousand</i></span>
            <span className="rl-line" style={{ ["--d" as string]: 2 }}><i>years of gaze.</i></span>
          </h1>
        </div>
        <div className="rl-cue" aria-hidden>scroll — enter the vault ↓</div>
      </Scene>

      {/* 1 · VAULT — backlit-ring + turntable + смена табличек (pin-scrub) */}
      <Scene className="rl-vault" pinned vh={320}>
        <div className="rl-room" aria-hidden />
        <div className="rl-ring" aria-hidden />
        <div className="rl-turntable" aria-hidden />
        <div className="rl-object" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />

        {/* левая колонка — стаггер спец-списка */}
        <ul className="rl-specs">
          {SPECS.map(([k, v], i) => (
            <li key={i} className="rl-spec" style={{ ["--i" as string]: i }}>
              <span className="rl-spec-k">{k}</span>
              <span className="rl-spec-v">{v}</span>
            </li>
          ))}
        </ul>

        {/* правые «таблички» — сменяются clip-path:inset() wipe'ом по --t */}
        <div className="rl-plaques">
          {PLAQUES.map(([t, s], i) => (
            <div key={i} className="rl-plaque" style={{ ["--i" as string]: i }}>
              <span className="rl-plaque-idx">0{i + 1}</span>
              <h2>{t}</h2>
              <span className="rl-plaque-sub">{s}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 · OUTRO — свет гаснет, CTA */}
      <Scene className="rl-end">
        <div className="rl-end-glow" aria-hidden />
        <div className="rl-end-block">
          <h2>
            <span className="rl-line" style={{ ["--d" as string]: 0 }}><i>Request a</i></span>
            <span className="rl-line rl-blue" style={{ ["--d" as string]: 1 }}><i>private viewing.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="rl-btn">Enter the archive ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
