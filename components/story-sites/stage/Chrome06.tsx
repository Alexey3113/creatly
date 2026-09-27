"use client";
/* STORY v2 · САЙТ 6 — «CHROME» / VIOLETREVE (pin6: futuristic hi-fashion glam, silver/chrome + lime, sci-fi femme-warrior).
   Архетипы (де-шаблонизировано): Occluded Idol → Tunnel Zoom → Orbit(поворотный стол,zoom) → Sidecar Spread → Carousel(3D-перспектива) → Launch(спек-чипы). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./chrome06.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Chrome06() {
  return (
    <div className="cr-site">
      <header className="cr-head">
        <Link href="/story2" className="cr-brand">VIOLET<i>REVE</i></Link>
        <nav className="cr-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Atelier</a>
          <a href="#" onClick={stop}>Archive</a>
          <a href="#" onClick={stop} className="cr-cta">Enter</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="zoom" className="scene-body cr-cover">
          <div className="cr-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.12, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cr-wordmark"><KineticText text="CHROME" mode="slam" /></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="cr-cover-fig">
            <SceneMedia src={`${A}/chrome-hero-cut.png`} alt="CHROME — футуристичный образ" />
          </Layer>
          <div className="cr-orn" aria-hidden>
            <span className="cr-orn-tl">// couture systems<br />SS26 · CHROME</span>
            <span className="cr-orn-tr">◇ 34.05<br />ISO 100</span>
            <span className="cr-orn-lm">@png<br />//violetreve</span>
            <span className="cr-orn-bar">▪▪▪ CRYSTAL · MESH · STEEL ▪▪▪ 00.24.55</span>
            <span className="cr-orn-plus">+</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cr-cover-hi">
            <span className="cr-eyebrow">futuristic couture · femme-warrior</span>
            <h1>Chrome</h1>
            <p>Кристалл, сталь и холодный свет. Кутюр как броня для тех, кто пишет будущее.</p>
          </Layer>
          <div className="cr-grain" aria-hidden />
          <div className="cr-scrollcue" aria-hidden>enter ↓</div>
        </div>

        {/* 1 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body cr-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.2 }} to={{ scale: 1.02 }} className="cr-tunnel-fig kb-media">
            <SceneMedia src={`${A}/chrome-portrait-b.jpg`} alt="CHROME — хром-лезвие" />
          </Layer>
          <div className="cr-tunnel-veil" aria-hidden />
          <div className="cr-tunnel-huge" aria-hidden>FUTURE</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="cr-tunnel-cap">
            <span className="cr-folio">chapter 01 · the edge</span>
            <p>Холодное лезвие у плеча — не угроза, а обещание. Элегантность и опасность в одном силуэте.</p>
          </Layer>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 2 · ORBIT — продукт на «поворотном столе»: орбита + HUD-тики по сторонам (слом клон-макро) */}
        <div transition="zoom" className="scene-body cr-orbit">
          <div className="cr-orbit-bg" aria-hidden />
          <div className="cr-orbit-ring" aria-hidden />
          <Layer z={3} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.12, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cr-orbit-fig">
            <SceneMedia src={`${A}/chrome-still-1.jpg`} alt="Хром-клинок — деталь" />
          </Layer>
          <div className="cr-orbit-ticks" aria-hidden>
            <span className="cr-tick cr-tick-t">material · chrome</span>
            <span className="cr-tick cr-tick-r">finish · mirror</span>
            <span className="cr-tick cr-tick-b">50mm · f/1.2</span>
            <span className="cr-tick cr-tick-l">object 01</span>
          </div>
          <Layer z={6} depth={0.2} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cr-orbit-cap">
            <span className="cr-folio">object 01 · blade</span>
            <h3>Хром клинок</h3>
            <p>Скульптурная сталь, что ловит каждый луч. Аксессуар как оружие — точный, холодный, идеальный.</p>
          </Layer>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 3 · SIDECAR SPREAD */}
        <div transition="smash" className="scene-body cr-side">
          <div className="cr-side-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0.02, 0.9]} from={{ x: "40vw", rotate: "5deg", opacity: 0 }} to={{ x: "0vw", rotate: "-2deg", opacity: 1 }} className="cr-side-fig">
            <SceneMedia src={`${A}/chrome-still-2.jpg`} alt="Кристалл-корсет — макро" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="cr-side-cap">
            <span className="cr-num">02</span>
            <h2>Crystal<br /><em>Mesh</em></h2>
            <span className="cr-folio">bodysuit · beadwork · light</span>
            <p>Тысячи граней ловят студийный блик. Прозрачная броня, что мерцает при каждом движении.</p>
          </Layer>
          <div className="cr-side-orn" aria-hidden>◇ &nbsp; crystal mesh &nbsp; ◇</div>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 4 · CAROUSEL — голографическая карусель в перспективе (не сетка) */}
        <div transition="drop" className="scene-body cr-carousel">
          <div className="cr-carousel-bg" aria-hidden />
          <div className="cr-carousel-head" aria-hidden><b>Lookbook</b><span>SS26 · CHROME · violetreve</span></div>
          <div className="cr-carousel-stage">
            <div className="cr-carousel-track">
              <figure className="cr-slide cr-slide-1"><img src={`${A}/chrome-extra-3.jpg`} alt="Образ 01" loading="lazy" /><figcaption>01 · idol</figcaption></figure>
              <figure className="cr-slide cr-slide-2"><img src={`${A}/chrome-extra-1.jpg`} alt="Образ 02" loading="lazy" /><figcaption>02 · blade</figcaption></figure>
              <figure className="cr-slide cr-slide-3"><img src={`${A}/chrome-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>03 · mesh</figcaption></figure>
              <figure className="cr-slide cr-slide-4"><img src={`${A}/chrome-extra-4.jpg`} alt="Клинок" loading="lazy" /><figcaption>04 · steel</figcaption></figure>
            </div>
          </div>
          <div className="cr-carousel-code" aria-hidden>▪▪▪ crystal · mesh · steel · chrome ▪▪▪</div>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 5 · LAUNCH — продуктовый спек-блок со спек-чипами (не центр-слоган+кнопка) */}
        <div transition="smash" className="scene-body cr-launch">
          <div className="cr-launch-bg" aria-hidden />
          <span className="cr-launch-plus" aria-hidden>+</span>
          <div className="cr-launch-block">
            <span className="cr-launch-label">// couture systems · SS26</span>
            <h4>Chrome</h4>
            <div className="cr-launch-chips" aria-hidden><span>material · chrome</span><span>finish · mirror</span><span>ed · 2026</span></div>
            <a href="#" onClick={stop} className="cr-btn">Book a fitting ↗</a>
            <div className="cr-links"><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>@violetreve</a><a href="#" onClick={stop}>Paris · Tokyo</a></div>
          </div>
          <div className="cr-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
