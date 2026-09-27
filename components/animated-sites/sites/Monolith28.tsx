"use client";
/* ANIMATED · Nº28 — «AETHER» (класс 3d-product-theatre, приём DOLLY-IN к структуре).
   Один painterly кинокадр (герой перед свечащейся арканной структурой-шпилем в магента-индиго тумане)
   как театр мира: pin-сцена делает медленный dolly-in (scale кадра по --t) к шпилю; слои тумана-параллакс
   по --px и --t (передний туман уезжает вниз и растворяется); arcane-glow у основания шпиля разгорается;
   манифест-строки проявляются масками по ходу наезда; финал — крупный кадр мира.
   Палитра — из кадра: магента-индиго сумерки + cold mist + ember-glow. Бренд AETHER — the last spire.
   Шрифт: Syne (архитектурный дисплей) + Archivo (лейблы). --t со сцены, --px/--py с корня. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./monolith28.css";

const HERO = "/uploads/1/animated/monolith-hero.jpg";

const SPECS: [string, string][] = [
  ["REALM", "Aether, the far vale"],
  ["POWER", "arcane, half-woken"],
  ["AGE", "before the first name"],
  ["GATE", "open to the called"],
];

export function Monolith28() {
  return (
    <ScrollStage className="mn">
      {/* 0 · COVER — шпиль в тумане, arcane-glow тлеет у основания, заголовок маской */}
      <Scene className="mn-cover">
        <div className="mn-cover-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="mn-cover-grade" aria-hidden />
        <div className="mn-kick"><span>AETHER — THE LAST SPIRE</span><span>Nº28 · THE REALM</span></div>
        <div className="mn-cover-copy">
          <p className="mn-eyebrow">a power the world half-forgot</p>
          <h1 className="mn-hero">
            <span className="mn-line" style={{ ["--d" as string]: 0 }}><i>It has burned</i></span>
            <span className="mn-line" style={{ ["--d" as string]: 1 }}><i>since before</i></span>
            <span className="mn-line mn-ember" style={{ ["--d" as string]: 2 }}><i>the first age.</i></span>
          </h1>
        </div>
        <div className="mn-cue" aria-hidden>scroll — approach the spire ↓</div>
      </Scene>

      {/* 1 · DOLLY — наезд к шпилю: dolly-in кадра + туман-параллакс + разгорание arcane-glow (pin-scrub) */}
      <Scene className="mn-dolly" pinned vh={360}>
        <div className="mn-stage" aria-hidden>
          <div className="mn-far" style={{ backgroundImage: `url(${HERO})` }} />
          <div className="mn-fog mn-fog-mid" />
          <div className="mn-ember" />
          <div className="mn-fog mn-fog-front" />
          <div className="mn-vignette" />
        </div>

        {/* манифест-строки — проявляются по ходу наезда (окна разнесены по --t) */}
        <div className="mn-manifest">
          <span className="mn-manifest-line" style={{ ["--i" as string]: 0 }}>The spire still answers.</span>
          <span className="mn-manifest-line" style={{ ["--i" as string]: 1 }}>Old light, not yet spent.</span>
          <span className="mn-manifest-line" style={{ ["--i" as string]: 2 }}>The realm remembers you.</span>
        </div>

        {/* финальная плашка — всплывает на глубоком dolly */}
        <div className="mn-surface">
          <span className="mn-surface-idx">BEYOND · THE GATE</span>
          <h2>The spire stands.</h2>
        </div>
        <span className="mn-dolly-tag" aria-hidden>approach · to the spire</span>
      </Scene>

      {/* 2 · OUTRO — мир тонет в туман, спец-лист + CTA */}
      <Scene className="mn-end">
        <div className="mn-end-img" style={{ backgroundImage: `url(${HERO})` }} aria-hidden />
        <div className="mn-end-veil" aria-hidden />
        <div className="mn-end-block">
          <ul className="mn-specs">
            {SPECS.map(([k, v], i) => (
              <li key={i} className="mn-spec" style={{ ["--i" as string]: i }}>
                <span className="mn-spec-k">{k}</span><span className="mn-spec-v">{v}</span>
              </li>
            ))}
          </ul>
          <h2>
            <span className="mn-line" style={{ ["--d" as string]: 0 }}><i>Cross into</i></span>
            <span className="mn-line mn-ember" style={{ ["--d" as string]: 1 }}><i>the realm.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="mn-btn">Enter the realm ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
