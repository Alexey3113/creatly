"use client";
/* ANIMATED · ФЛАГМАН 1 — «MANIFESTO» (класс editorial-motion, приём line-mask reveal).
   Чистый DOM/CSS на движке ScrollStage: каждая сцена пишет себе --t, строки проявляются масками
   (translateY 110→0 в overflow:hidden) по окну своего --t; финальная сцена — day→night по прогрессу.
   Ноль внешних ассетов — типографика как главный герой (Fraunces). Проверка движка end-to-end. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "./manifesto01.css";

export function Manifesto01() {
  return (
    <ScrollStage className="mf">
      {/* 0 · COVER — слово проявляется маской снизу */}
      <Scene className="mf-cover">
        <div className="mf-kick"><span>CREATLY / ANIMATED</span><span>Nº01 · EDITORIAL</span></div>
        <h1 className="mf-hero">
          <span className="mf-line" style={{ ["--d" as string]: 0 }}><i>We don't</i></span>
          <span className="mf-line" style={{ ["--d" as string]: 1 }}><i>decorate.</i></span>
          <span className="mf-line mf-gold" style={{ ["--d" as string]: 2 }}><i>We direct.</i></span>
        </h1>
        <div className="mf-cue" aria-hidden>scroll ↓</div>
      </Scene>

      {/* 1 · MANIFESTO LINES — построчный reveal по прогрессу */}
      <Scene className="mf-lines">
        <p className="mf-body">
          {["Motion is not ornament.", "It is the sentence's breath —", "the pause before a word,", "the weight of a cut,", "the moment a viewer leans in."].map((t, i) => (
            <span key={i} className="mf-line" style={{ ["--d" as string]: i }}><i>{t}</i></span>
          ))}
        </p>
      </Scene>

      {/* 2 · SCALE — гигантское слово растёт по --t */}
      <Scene className="mf-scale">
        <div className="mf-scale-word" aria-hidden>DIRECT</div>
        <div className="mf-scale-cap"><span className="mf-line" style={{ ["--d" as string]: 0 }}><i>Every frame earns attention.</i></span></div>
      </Scene>

      {/* 3 · DAY→NIGHT — палитра сцены сдвигается по прогрессу + финальные строки */}
      <Scene className="mf-final">
        <div className="mf-final-veil" aria-hidden />
        <div className="mf-final-block">
          <h2>
            <span className="mf-line" style={{ ["--d" as string]: 0 }}><i>Direction is</i></span>
            <span className="mf-line mf-gold" style={{ ["--d" as string]: 1 }}><i>the difference.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="mf-btn">Begin a project ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
