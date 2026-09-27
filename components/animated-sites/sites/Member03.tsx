"use client";
/* ANIMATED · Nº03 — «EMBER» (класс editorial-motion, приём inline-фото ВЫРАСТАЕТ из строки).
   Чистый DOM/CSS на ScrollStage. Флагман-сцена: посреди строки манифеста слово раскрывается —
   inline-контейнер растит width 0→Nvw и height по --t (pin-сцена), внутри полноразмерный портрет;
   текст обтекает и опускается — кадр «вырастает» из предложения. Плюс line-mask reveal (cover/final).
   Бренд EMBER — приватная студия-сообщество. Палитра из кадра: warm-grey + ember-rim. Ноль стока. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./member03.css";

const HERO = "/uploads/1/animated/member-hero.jpg";

export function Member03() {
  return (
    <ScrollStage className="mb">
      {/* 0 · COVER — строки проявляются масками снизу */}
      <Scene className="mb-cover">
        <div className="mb-kick"><span>EMBER · MEMBERS&rsquo; STUDIO</span><span>Nº03 · EDITORIAL</span></div>
        <h1 className="mb-hero">
          <span className="mb-line" style={{ ["--d" as string]: 0 }}><i>A quiet room</i></span>
          <span className="mb-line" style={{ ["--d" as string]: 1 }}><i>for people who</i></span>
          <span className="mb-line mb-ember" style={{ ["--d" as string]: 2 }}><i>make things slowly.</i></span>
        </h1>
        <div className="mb-cue" aria-hidden>keep scrolling — a face grows from the line ↓</div>
      </Scene>

      {/* 1 · INLINE REVEAL (флагман) — портрет вырастает из середины строки */}
      <Scene className="mb-reveal" pinned vh={260}>
        <div className="mb-reveal-in">
          <p className="mb-manifest">
            <span className="mb-word" style={{ ["--d" as string]: 0 }}>We&nbsp;keep&nbsp;a&nbsp;seat&nbsp;for&nbsp;every</span>{" "}
            <span className="mb-inline" aria-hidden>
              <img src={HERO} alt="" className="mb-inline-img" />
              <span className="mb-inline-glow" />
            </span>{" "}
            <span className="mb-word" style={{ ["--d" as string]: 1 }}>maker&nbsp;who&nbsp;chooses</span>{" "}
            <span className="mb-word mb-ember" style={{ ["--d" as string]: 2 }}>depth&nbsp;over&nbsp;volume.</span>
          </p>
          <span className="mb-reveal-tag" aria-hidden>Zoe Lin · member since &rsquo;19 · ceramics &amp; type</span>
        </div>
      </Scene>

      {/* 2 · SCALE — тихая пауза: гигантское слово растёт по --t */}
      <Scene className="mb-scale">
        <div className="mb-scale-word" aria-hidden>KINDRED</div>
        <div className="mb-scale-cap">
          <span className="mb-line" style={{ ["--d" as string]: 0 }}><i>Not a network. A hearth —</i></span>
          <span className="mb-line" style={{ ["--d" as string]: 1 }}><i>forty rooms, one long table.</i></span>
        </div>
      </Scene>

      {/* 3 · FINAL — тёплая вуаль сходится, финальные строки + приглашение */}
      <Scene className="mb-final">
        <div className="mb-final-veil" aria-hidden />
        <div className="mb-final-block">
          <h2>
            <span className="mb-line" style={{ ["--d" as string]: 0 }}><i>The door is small.</i></span>
            <span className="mb-line mb-ember" style={{ ["--d" as string]: 1 }}><i>The room is warm.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="mb-btn">Request an invitation ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
