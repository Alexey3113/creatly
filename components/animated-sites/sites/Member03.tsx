"use client";
/* ANIMATED · Nº03 — «EMBER» (класс editorial-motion → СЛОВО ОТКРЫВАЕТ КОМНАТУ).
   Уголёк (scene-kit <Actor>, тёплая искра) живёт в комнате обложки, подлетает к строке манифеста и
   зажигает в ней окно: портрет вырастает из середины фразы, затем комната раскрывается на весь экран
   (fixed-мир под главами, --open от <Follow>) и остаётся под KINDRED и финалом, медленно темнея (--dim).
   В финале уголёк садится у приглашения. Палитра из кадра: warm-grey + ember-rim. Newsreader + Archivo. */
import { Actor, Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./member03.css";

const HERO = "/uploads/1/animated/member-hero.jpg";

/* якорь пин-сцены 300vh по её прогрессу t */
const pin = (t: number, V = 3) => (t * (V - 1) + 0.5) / V;

export function Member03() {
  return (
    <ScrollStage className="mb">
      <Follow stops={[
        { at: ".mb-cover", vars: { "--open": 0, "--dim": 0.2 } },
        { at: ".mb-reveal", anchor: pin(0.58), vars: { "--open": 0, "--dim": 0.2 } },
        { at: ".mb-reveal", anchor: pin(0.92), vars: { "--open": 1, "--dim": 0.25 } },
        { at: ".mb-scale", vars: { "--open": 1, "--dim": 0.45 } },
        { at: ".mb-final", vars: { "--open": 1, "--dim": 0.8 } },
      ]} />

      {/* КОМНАТА — раскрывается из окна в строке на весь экран и остаётся под главами */}
      <div className="mb-world" aria-hidden>
        <img src={HERO} alt="" className="mb-room" />
        <div className="mb-room-veil" />
      </div>

      {/* УГОЛЁК — сквозная искра: комната обложки → окно в строке → приглашение */}
      <Actor zIndex={3} width="1.6vw" bob={5} tilt={0.05} className="mb-ember-actor" stops={[
        { at: ".mb-cover", pose: { x: 80, y: 60, s: 1.4, o: 1 } },
        { at: ".mb-reveal", anchor: pin(0.02), pose: { x: 56, y: 50, s: 1.8, o: 1 } },
        { at: ".mb-reveal", anchor: pin(0.14), pose: { x: 50, y: 50, s: 5, o: 0 } },
        { at: ".mb-final", anchor: 0.25, pose: { x: 50, y: 40, s: 0.6, o: 0 } },
        { at: ".mb-final", anchor: 0.5, pose: { x: 50, y: 42, s: 1.5, o: 1 } },
      ]}>
        <span className="mb-spark" />
      </Actor>

      {/* 0 · COVER — тёплая комната, строки проявляются */}
      <Scene className="mb-cover">
        <div className="mb-kick"><span>EMBER · MEMBERS&rsquo; STUDIO</span><span>Nº03 · EDITORIAL</span></div>
        <h1 className="mb-hero">
          <span className="mb-line" style={{ ["--d" as string]: 0 }}><i>A quiet room</i></span>
          <span className="mb-line" style={{ ["--d" as string]: 1 }}><i>for people who</i></span>
          <span className="mb-line mb-ember" style={{ ["--d" as string]: 2 }}><i>make things slowly.</i></span>
        </h1>
        <div className="mb-cue" aria-hidden>keep scrolling — the ember opens a door ↓</div>
      </Scene>

      {/* 1 · INLINE REVEAL — окно в строке → комната на весь экран */}
      <Scene className="mb-reveal" pinned vh={300}>
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

      {/* 2 · KINDRED — внутри комнаты */}
      <Scene className="mb-scale">
        <div className="mb-scale-word" aria-hidden>Kindred</div>
        <div className="mb-scale-cap">
          <span className="mb-line" style={{ ["--d" as string]: 0 }}><i>Not a network. A hearth —</i></span>
          <span className="mb-line" style={{ ["--d" as string]: 1 }}><i>forty rooms, one long table.</i></span>
        </div>
      </Scene>

      {/* 3 · FINAL — комната темнеет, уголёк у приглашения */}
      <Scene className="mb-final">
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
