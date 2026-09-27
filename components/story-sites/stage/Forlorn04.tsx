"use client";
/* STORY v2 · ПИЛОТ 4 — «FORLORN» / RODERIKA (pin 3: dark-fantasy gothic + game-HUD, charcoal/bone/blood/сталь).
   Движок StageDeck. Архетипы (своя последовательность): Occluded Idol → Ritual Halo(iris) → Item Inspector(тултип,cut) → Type Guillotine → Constellation(лор-карта) → Sigil(эмблема). Фото forlorn-*. Blackletter/HUD/барокоды = HTML/SVG. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./forlorn04.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Forlorn04() {
  return (
    <div className="fl-site">
      <header className="fl-head">
        <Link href="/story2" className="fl-brand">✠ RODERIKA</Link>
        <nav className="fl-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Sanctuary</a>
          <a href="#" onClick={stop}>Codex</a>
          <a href="#" onClick={stop} className="fl-cta">Enter</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — обложка (Cinzel-вордмарк + HUD) */}
        <div transition="iris" className="scene-body fl-cover">
          <div className="fl-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="fl-wordmark">
            <span aria-hidden>FORLORN</span>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="fl-cover-fig">
            <SceneMedia src={`${A}/forlorn-hero-cut.png`} alt="RODERIKA — тёмная жрица в терновой короне" />
          </Layer>
          <div className="fl-hud" aria-hidden>
            <span className="fl-hud-tl">LBL ▪ FFX 2025 <b>|| ||| | |||| ||</b></span>
            <span className="fl-hud-tr">JUNE 25<br />⚔ ⛨ ⚑</span>
            <span className="fl-hud-lm">RODERIKA<br /><i>she was not born</i><br /><i>knowing her spell</i></span>
            <span className="fl-hud-rm">SPIRIT TUNER<br /><i>she heard the</i><br /><i>whispers of spirits</i></span>
            <span className="fl-hud-bar">SANCTUARY · VISUAL SETTINGS · CHROMA ▪ T07 24 05 17</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="fl-cover-hi">
            <span className="fl-eyebrow">✠ SANCTUARY · dark-fantasy chapter</span>
            <h1>Roderika</h1>
            <p>Она не родилась со своим заклинанием. Она вырвала его из сердца самой бури.</p>
          </Layer>
          <div className="fl-grain" aria-hidden />
          <div className="fl-scrollcue" aria-hidden>descend ▾</div>
        </div>

        {/* 1 · RITUAL HALO — терн-кольцо вращается (iris) */}
        <div transition="iris" className="scene-body fl-halo">
          <div className="fl-halo-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12 }} to={{ scale: 1.02 }} className="fl-halo-fig kb-media">
            <SceneMedia src={`${A}/forlorn-portrait-b.jpg`} alt="RODERIKA — склонённая голова" />
          </Layer>
          <div className="fl-halo-ring" aria-hidden />
          <div className="fl-halo-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.08, 0.7]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="fl-halo-cap">
            <span className="fl-folio">chapter I — the whisper</span>
            <h2>Sanctuary</h2>
            <p>Когда она вошла в святилище духов, воздух стал тяжёлым. Тьма слушала — и впервые ответила.</p>
          </Layer>
          <div className="fl-grain" aria-hidden />
        </div>

        {/* 2 · ITEM INSPECTOR — RPG-тултип поверх полноэкранного кадра (слом клон-макро) */}
        <div transition="cut" className="scene-body fl-item">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12 }} to={{ scale: 1.02 }} className="fl-item-fig kb-media">
            <SceneMedia src={`${A}/forlorn-still-1.jpg`} alt="Латная перчатка и цепи — деталь" />
          </Layer>
          <div className="fl-item-veil" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.04, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="fl-item-panel">
            <span className="fl-item-rarity" aria-hidden>◈ relic · steel · FFX 2025</span>
            <h3>Латная длань</h3>
            <ul className="fl-item-stats" aria-hidden>
              <li><span>WILL</span><b>+12</b></li>
              <li><span>RESOLVE</span><b>+8</b></li>
              <li><span>SPIRIT</span><b>∞</b></li>
            </ul>
            <p>Сталь, что помнит каждую битву. Цепи, что держат клятву. Ничего лишнего — только воля.</p>
          </Layer>
          <div className="fl-grain" aria-hidden />
        </div>

        {/* 3 · TYPE GUILLOTINE — RODERIKA (wipe-y) */}
        <div transition="wipe-y" className="scene-body fl-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="fl-guillo-fig kb-media">
            <SceneMedia src={`${A}/forlorn-hero.jpg`} alt="RODERIKA — портрет" />
          </Layer>
          <div className="fl-guillo-veil" aria-hidden />
          <div className="fl-guillo-type" aria-hidden>
            <span>RODE</span><span className="fl-guillo-stroke">RIKA</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ x: "-40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="fl-guillo-cap">
            <span className="fl-folio">chapter II — the vow</span>
            <p>Имя, что шепчут духи. Корона из терния — не украшение, а бремя, которое она несёт до конца.</p>
          </Layer>
          <div className="fl-grain" aria-hidden />
        </div>

        {/* 4 · CONSTELLATION — узлы-кадры на линиях лор-карты (не сетка) */}
        <div transition="drop" className="scene-body fl-const">
          <div className="fl-const-bg" aria-hidden />
          <div className="fl-const-head" aria-hidden><b>Codex ✠ Forlorn</b><span>lore map · FFX 2025</span></div>
          <div className="fl-const-web" aria-hidden><i className="fl-line fl-line-1" /><i className="fl-line fl-line-2" /><i className="fl-line fl-line-3" /></div>
          <figure className="fl-node fl-node-1"><img src={`${A}/forlorn-hero.jpg`} alt="Roderika" loading="lazy" /><figcaption>I · idol</figcaption></figure>
          <figure className="fl-node fl-node-2"><img src={`${A}/forlorn-still-2.jpg`} alt="Терновая корона" loading="lazy" /><figcaption>II · crown</figcaption></figure>
          <figure className="fl-node fl-node-3"><img src={`${A}/forlorn-still-1.jpg`} alt="Латная перчатка" loading="lazy" /><figcaption>III · gauntlet</figcaption></figure>
          <figure className="fl-node fl-node-4"><img src={`${A}/forlorn-portrait-b.jpg`} alt="Склонённая RODERIKA" loading="lazy" /><figcaption>IV · vow</figcaption></figure>
          <div className="fl-const-code" aria-hidden>SPIRIT TUNER · she survived · echoing the spirit anew</div>
          <div className="fl-grain" aria-hidden />
        </div>

        {/* 5 · SIGIL — геральдическая эмблема + девиз (не центр-слоган+кнопка) */}
        <div transition="smash" className="scene-body fl-sigil">
          <div className="fl-sigil-bg" aria-hidden />
          <div className="fl-sigil-emblem" aria-hidden><span className="fl-sigil-ring" /><span className="fl-sigil-mark">✠</span></div>
          <div className="fl-sigil-block">
            <span className="fl-sigil-label">— chapter complete —</span>
            <h4>She heard the whispers of spirits</h4>
            <a href="#" onClick={stop} className="fl-btn">Begin the vow ✠</a>
            <div className="fl-links"><a href="#" onClick={stop}>Lore</a><a href="#" onClick={stop}>Codex</a><a href="#" onClick={stop}>Design by Farfalla</a></div>
          </div>
          <div className="fl-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
