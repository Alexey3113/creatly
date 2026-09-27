"use client";
/* STORY v2 · САЙТ 6 — «CHROME» / VIOLETREVE (pin6: futuristic hi-fashion glam, silver/chrome + lime, sci-fi femme-warrior).
   Сквозная архитектура (аудит 2026-09): героиня не исчезает после обложки — из неё выходят предметы.
   S1→S2: хромовый корсет отделяется от фигуры и «жидким металлом» становится макро Crystal Mesh (data-share="corset").
   S3→S4: кадр режется по линии её клинка (кромка разреза параллельна лезвию и проходит через него) — кульминация.
   S5→S6: центральный кадр лукбука вырастает в финальный портрет — она возвращается (кольцовка, data-share="hero").
   Закон камеры — вперёд к материалу; свет: графит → светлее → финал с тёплым ключевым светом. */
import Link from "next/link";
import { Layer } from "@/components/parallax-scene";
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
        {/* 0 · ОБЛОЖКА — вордмарк за фигурой на уровне плеч; корсет готов отделиться */}
        <div transition="fade" className="scene-body cr-cover">
          <div className="cr-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.1, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cr-wordmark"><KineticText text="CHROME" mode="slam" /></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="cr-cover-fig">
            <div className="cr-cut">
              <img className="cr-cut-img" src={`${A}/chrome-hero-cut.png`} alt="CHROME — героиня в хромовом корсете" draggable={false} />
              <div className="cr-win cr-win-corset" data-share="corset" aria-hidden>
                <img className="cr-win-base" src={`${A}/chrome-hero-cut.png`} alt="" draggable={false} />
              </div>
            </div>
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

        {/* 1 · CRYSTAL MESH — корсет прилетает крупным планом и плавится в макро кристальной сетки */}
        <div transition="fade" className="scene-body cr-side">
          <div className="cr-side-bg" aria-hidden />
          <div className="cr-win cr-win-mesh" data-share="corset">
            <img className="cr-win-base" src={`${A}/chrome-hero-cut.png`} alt="" aria-hidden draggable={false} />
            <img className="cr-melt" src={`${A}/chrome-still-2.jpg`} alt="Кристалл-корсет — макро" loading="lazy" draggable={false} />
            <span className="cr-glint" aria-hidden />
          </div>
          <Layer z={6} depth={0.3} phase={[0.2, 0.8]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="cr-side-cap">
            <span className="cr-num">01</span>
            <h2>Crystal<br /><em>Mesh</em></h2>
            <span className="cr-folio">bodysuit · beadwork · light</span>
            <p>Тысячи граней ловят студийный блик. Прозрачная броня, что мерцает при каждом движении.</p>
          </Layer>
          <div className="cr-side-orn" aria-hidden>◇ &nbsp; crystal mesh &nbsp; ◇</div>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 2 · THE EDGE — она снова в кадре, клинок у лица; FUTURE читается */}
        <div transition="fade" className="scene-body cr-tunnel">
          <div className="cr-tunnel-bg" aria-hidden />
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="cr-cq">
            <div className="cr-plate cr-plate-pb cr-kb">
              <img className="cr-img" src={`${A}/chrome-portrait-b.jpg`} alt="Героиня с хромовым клинком у лица" draggable={false} />
            </div>
          </Layer>
          <div className="cr-tunnel-veil" aria-hidden />
          <div className="cr-tunnel-huge" aria-hidden>FUTURE</div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.65]} from={{ opacity: 0, x: "-24px" }} to={{ opacity: 1, x: "0px" }} className="cr-tunnel-cap">
            <span className="cr-folio">chapter 02 · the edge</span>
            <p>Холодное лезвие у плеча — не угроза, а обещание. Элегантность и опасность в одном силуэте.</p>
          </Layer>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 3 · ХРОМ КЛИНОК — кадр режется по линии лезвия из S3; за разрезом — макро клинка */}
        <div transition="slash" className="scene-body cr-orbit">
          <div className="cr-orbit-bg" aria-hidden />
          <div className="cr-orbit-ring" aria-hidden />
          <div className="cr-win cr-win-steel">
            <img className="cr-steel cr-kb" src={`${A}/chrome-still-1.jpg`} alt="Хром-клинок — деталь" loading="lazy" draggable={false} />
            <span className="cr-glint" aria-hidden />
          </div>
          <div className="cr-orbit-ticks" aria-hidden>
            <span className="cr-tick cr-tick-t">material · chrome</span>
            <span className="cr-tick cr-tick-r">finish · mirror</span>
            <span className="cr-tick cr-tick-b">50mm · f/1.2</span>
            <span className="cr-tick cr-tick-l">object 02</span>
          </div>
          <span className="cr-slash" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.3, 0.85]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cr-orbit-cap">
            <span className="cr-folio">object 02 · blade</span>
            <h3>Хром клинок</h3>
            <p>Скульптурная сталь, что ловит каждый луч. Аксессуар как оружие — точный, холодный, идеальный.</p>
          </Layer>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 4 · LOOKBOOK — карусель в перспективе; в центре — она, анфас */}
        <div transition="push" className="scene-body cr-carousel">
          <div className="cr-carousel-bg" aria-hidden />
          <div className="cr-carousel-head" aria-hidden><b>Lookbook</b><span>SS26 · CHROME · violetreve</span></div>
          <div className="cr-carousel-stage">
            <div className="cr-carousel-track">
              <figure className="cr-slide cr-slide-1"><img src={`${A}/chrome-extra-3.jpg`} alt="Образ 01 — клинок" loading="lazy" /><figcaption>01 · blade</figcaption></figure>
              <figure className="cr-slide cr-slide-2"><img src={`${A}/chrome-extra-2.jpg`} alt="Образ 02 — сетка" loading="lazy" /><figcaption>02 · mesh</figcaption></figure>
              <figure className="cr-slide cr-slide-3"><img className="cr-hero-img" src={`${A}/chrome-hero.jpg`} alt="Образ 03 — она" loading="lazy" data-share="hero" /><figcaption>03 · idol</figcaption></figure>
              <figure className="cr-slide cr-slide-4"><img src={`${A}/chrome-extra-4.jpg`} alt="Образ 04 — сталь" loading="lazy" /><figcaption>04 · steel</figcaption></figure>
              <figure className="cr-slide cr-slide-5"><img src={`${A}/chrome-extra-1.jpg`} alt="Образ 05 — отдых" loading="lazy" /><figcaption>05 · rest</figcaption></figure>
            </div>
          </div>
          <div className="cr-carousel-code" aria-hidden>▪▪▪ crystal · mesh · steel · chrome ▪▪▪</div>
          <div className="cr-grain" aria-hidden />
        </div>

        {/* 5 · LAUNCH — центральный кадр вырастает в финальный портрет: она вернулась, свет теплее */}
        <div transition="fade" className="scene-body cr-launch">
          <div className="cr-launch-bg" aria-hidden />
          <div className="cr-launch-hero"><img className="cr-hero-img" src={`${A}/chrome-hero.jpg`} alt="Героиня CHROME — финальный портрет" loading="lazy" data-share="hero" /></div>
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
