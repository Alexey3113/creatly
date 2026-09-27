"use client";
/* STORY v2 · САЙТ 14 — «LOVER» (pin17: black/red red-monochrome classical статуя-любовники, «Art is Lover»).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine → Tunnel Zoom → Plinth(постамент+этикетка,iris) → Negative-Space Monument → Plaque(гравир.табличка). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./lover17.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Lover17() {
  return (
    <div className="lv-site">
      <header className="lv-head">
        <Link href="/story2" className="lv-brand">BRAVE</Link>
        <nav className="lv-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Art</a>
          <a href="#" onClick={stop}>Us</a>
          <a href="#" onClick={stop} className="lv-cta">Create</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="iris" className="scene-body lv-cover">
          <div className="lv-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="lv-wordmark">
            <span className="lv-w1" aria-hidden>Art</span><span className="lv-w2" aria-hidden>IS</span><span className="lv-w3" aria-hidden>Lover</span>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="lv-cover-fig">
            <SceneMedia src={`${A}/lover-hero-cut.png`} alt="Красная статуя влюблённых" />
          </Layer>
          <div className="lv-orn" aria-hidden>
            <span className="lv-orn-live">live.</span>
            <span className="lv-orn-us">ART IS US</span>
            <span className="lv-orn-star">✦</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-cover-hi">
            <span className="lv-eyebrow">we are our own creation</span>
            <h1>Art is <em>Lover.</em></h1>
            <p>Мрамор, залитый красным. Двое, обнявшиеся в вечности — искусство, что дышит, любит и остаётся нами.</p>
          </Layer>
          <div className="lv-grain" aria-hidden />
          <div className="lv-scrollcue" aria-hidden>feel ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body lv-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="lv-guillo-fig kb-media">
            <SceneMedia src={`${A}/lover-portrait-b.jpg`} alt="Красная статуя — крупно" />
          </Layer>
          <div className="lv-guillo-veil" aria-hidden />
          <div className="lv-guillo-type" aria-hidden><span>LO</span><span className="lv-guillo-it">ver</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-guillo-cap">
            <span className="lv-folio">canto I</span>
            <p>Камень, что помнит прикосновение. Любовь — единственное, что переживает и мрамор, и время, и нас самих.</p>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 2 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body lv-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.2 }} to={{ scale: 1.03 }} className="lv-tunnel-fig kb-media">
            <SceneMedia src={`${A}/lover-hero.jpg`} alt="Влюблённые — статуя" />
          </Layer>
          <div className="lv-tunnel-veil" aria-hidden />
          <div className="lv-tunnel-huge" aria-hidden>US</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="lv-tunnel-cap">
            <span className="lv-folio">art is us</span>
            <p>Мы — собственное творение. Каждое объятие высекает нас заново. Красное — цвет того, что живо под камнем.</p>
            <span className="lv-meta">brave · we live</span>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 3 · PLINTH — скульптура на постаменте под лучом + музейная этикетка (слом клон-макро) */}
        <div transition="iris" className="scene-body lv-plinth">
          <div className="lv-plinth-bg" aria-hidden />
          <div className="lv-plinth-spot" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="lv-plinth-fig">
            <SceneMedia src={`${A}/lover-still-1.jpg`} alt="Рука статуи — деталь" />
          </Layer>
          <div className="lv-plinth-base" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-plinth-label">
            <span className="lv-folio">detail · touch</span>
            <h3>The embrace</h3>
            <p>Пальцы, застывшие в нежности. Драпировка, что льётся как кровь. Момент близости, высеченный навсегда.</p>
            <span className="lv-plinth-spec" aria-hidden>marble · red monochrome · MMXXVI</span>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 4 · NEGATIVE-SPACE MONUMENT */}
        <div transition="drop" className="scene-body lv-mono">
          <div className="lv-mono-bg" aria-hidden />
          <Layer z={2} depth={0.5} phase={[0, 1]} from={{ scale: 0.92, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="lv-mono-word">
            <span>Live<em>.</em></span>
          </Layer>
          <Layer z={4} depth={0.18} phase={[0.2, 0.8]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-mono-cap">
            <span className="lv-eyebrow">we are our own creation</span>
            <p>Не бойся быть высеченным любовью. Красное — не рана, а доказательство, что ты живёшь.</p>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 5 · PLAQUE — гравированная посвятительная табличка (не центр-слоган+кнопка) */}
        <div transition="iris" className="scene-body lv-plaque">
          <div className="lv-plaque-bg" aria-hidden />
          <div className="lv-plaque-plate">
            <span className="lv-plaque-mark" aria-hidden>✦</span>
            <span className="lv-plaque-small">art is lover · art is us</span>
            <h4>We are our own creation</h4>
            <p>Не бойся быть высеченным любовью. Красное — не рана, а доказательство, что ты живёшь. Мы — не второй выбор, а искусство само по себе.</p>
            <div className="lv-plaque-cta">
              <a href="#" onClick={stop} className="lv-btn">Create with us ✦</a>
              <div className="lv-links"><a href="#" onClick={stop}>Gallery</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Brave</a></div>
            </div>
          </div>
          <div className="lv-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
