"use client";
/* STORY v2 · САЙТ 17 — «OSTPUCK» (pin21: warm brown/amber baroque oil, женщина с виолончелью).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine → Sidecar → Score(нотный стан,wipe-y) → Salon(золочёная развеска) → Player(медиа-бар). ТЁПЛЫЙ. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./ostpuck21.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Ostpuck21() {
  return (
    <div className="op-site">
      <header className="op-head">
        <Link href="/story2" className="op-brand">OSTPUCK</Link>
        <nav className="op-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>String</a>
          <a href="#" onClick={stop}>Chord</a>
          <a href="#" onClick={stop} className="op-cta">Listen</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="wipe-x" className="scene-body op-cover">
          <div className="op-cover-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12 }} to={{ scale: 1.02 }} className="op-cover-fig kb-media">
            <SceneMedia src={`${A}/ostpuck-hero.jpg`} alt="Женщина с виолончелью — барокко" />
          </Layer>
          <div className="op-cover-veil" aria-hidden />
          <Layer z={4} depth={0.3} phase={[0, 0.9]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="op-wordmark"><span aria-hidden>OSTPUCK</span></Layer>
          <div className="op-orn" aria-hidden>
            <span className="op-orn-sup">the heart is like a string</span>
            <span className="op-orn-l">◐ ◑ ◒<br />⌇ ⌇ ⌇</span>
            <span className="op-orn-r">✦ + ⌇<br />→ ⇄ ↗</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-cover-hi">
            <span className="op-eyebrow">a simple gesture · a chord so profound</span>
            <p>Иногда простой жест или несколько слов задевают струну так глубоко, что она отзывается в душе, пробуждая давно забытые чувства.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
          <div className="op-scrollcue" aria-hidden>play ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body op-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="op-guillo-fig kb-media">
            <SceneMedia src={`${A}/ostpuck-portrait-b.jpg`} alt="Портрет — барокко" />
          </Layer>
          <div className="op-guillo-veil" aria-hidden />
          <div className="op-guillo-type" aria-hidden><span>THE</span><span className="op-guillo-it">chord</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-guillo-cap">
            <span className="op-folio">canto I · the string</span>
            <p>Сердце — как струна. Достаточно одного касания, и оно звучит, отзываясь на то, что казалось давно умолкшим.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 2 · SIDECAR */}
        <div transition="smash" className="scene-body op-side">
          <div className="op-side-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0.02, 0.9]} from={{ x: "40vw", rotate: "5deg", opacity: 0 }} to={{ x: "0vw", rotate: "-2deg", opacity: 1 }} className="op-side-fig">
            <SceneMedia src={`${A}/ostpuck-still-1.jpg`} alt="Гриф виолончели — деталь" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="op-side-cap">
            <span className="op-num">01</span>
            <h2>The<br /><em>strings</em></h2>
            <span className="op-folio">wood · gut · resonance</span>
            <p>Дерево, что дышит теплом свечи. Струны, натянутые как нервы. Инструмент, который помнит каждое прикосновение.</p>
          </Layer>
          <div className="op-side-orn" aria-hidden>⌇ &nbsp; resonance &nbsp; ⌇</div>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 3 · SCORE — нотный стан поверх кадра-полосы (слом клон-макро) */}
        <div transition="wipe-y" className="scene-body op-score">
          <div className="op-score-bg" aria-hidden />
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1.02, opacity: 1 }} className="op-score-band kb-media">
            <SceneMedia src={`${A}/ostpuck-still-2.jpg`} alt="Руки на струнах со смычком" />
          </Layer>
          <div className="op-staff" aria-hidden><i /><i /><i /><i /><i /><span className="op-note op-note-1">♪</span><span className="op-note op-note-2">♩</span><span className="op-note op-note-3">♪</span><span className="op-clef">𝄞</span></div>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-score-cap">
            <span className="op-folio">detail · the bow · note 01</span>
            <h3>A single chord</h3>
            <p>Смычок касается струны — и рождается звук, что реверберирует сквозь душу, пробуждая эмоции, давно забытые.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 4 · SALON — барочная развеска в золочёных рамах разного размера (не сетка) */}
        <div transition="drop" className="scene-body op-salon">
          <div className="op-salon-bg" aria-hidden />
          <div className="op-salon-head" aria-hidden><b>Sonata</b><span>the heart is like a string</span></div>
          <div className="op-salon-wall">
            <figure className="op-art op-art-1"><img src={`${A}/ostpuck-extra-3.jpg`} alt="Кадр" loading="lazy" /><figcaption>i · adagio</figcaption></figure>
            <figure className="op-art op-art-2"><img src={`${A}/ostpuck-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · largo</figcaption></figure>
            <figure className="op-art op-art-3"><img src={`${A}/ostpuck-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>iii · chord</figcaption></figure>
            <figure className="op-art op-art-4"><img src={`${A}/ostpuck-extra-4.jpg`} alt="Смычок" loading="lazy" /><figcaption>iv · echo</figcaption></figure>
          </div>
          <div className="op-salon-code" aria-hidden>reverberates through the soul · awakening emotions long forgotten</div>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 5 · PLAYER — «сейчас играет»: медиа-бар с play/прогрессом (не центр-слоган+кнопка) */}
        <div transition="wipe-x" className="scene-body op-player">
          <div className="op-player-bg" aria-hidden />
          <div className="op-player-word" aria-hidden>Heartstring</div>
          <div className="op-player-bar">
            <a href="#" onClick={stop} className="op-play" aria-label="Play">▸</a>
            <div className="op-player-meta"><b>Ostpuck — The Heart Is a String</b><span>a chord so profound</span></div>
            <div className="op-player-progress" aria-hidden><i /></div>
            <span className="op-player-time" aria-hidden>03:12</span>
          </div>
          <div className="op-player-cta">
            <a href="#" onClick={stop} className="op-btn">Listen now ♪</a>
            <div className="op-links"><a href="#" onClick={stop}>Sonata</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Recital</a></div>
          </div>
          <div className="op-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
