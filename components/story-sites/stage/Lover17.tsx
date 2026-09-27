"use client";
/* STORY v2 · САЙТ 14 — «LOVER» (pin17: black/red red-monochrome classical статуя-любовники, «Art is Lover»).
   Сквозная архитектура (аудит 2026-09): непрерывный наезд к поцелую и остановка на нём.
   S1→S2 push + share «pair»: та же вырезка пары, камера наезжает на головы (точка поцелуя держится в центре).
   S2→S3 push: поцелуй — главный кадр сайта (кульминация). Дальше закон — красный свет переезжает по мрамору
   (lv-sweep: световая полоса проявляет следующую сцену вместо iris-штампа). «Live.» — пара крошечная в пустоте
   под лучом; S5→S6 share «pair»: она же возвращается к табличке финала (кольцо). Дуга: каждая сцена светлее. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./lover17.css";

const A = "/uploads/1/story2";
const CUT = `${A}/lover-hero-cut-soft.png`; // та же вырезка, края растворены в альфе (едет «призраком»)
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
        {/* 0 · OCCLUDED IDOL — ОДИН заголовок «Art IS Lover» слева, пара справа (слово не съедено) */}
        <div transition="push" className="scene-body lv-cover">
          <div className="lv-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="lv-wordmark lv-tx">
            <h1 aria-label="Art is Lover"><span className="lv-w1" aria-hidden>Art</span><span className="lv-w2" aria-hidden>IS</span><span className="lv-w3" aria-hidden>Lover<i>.</i></span></h1>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="lv-cover-fig">
            <SceneMedia src={CUT} alt="Красная статуя влюблённых" share="pair" />
          </Layer>
          <div className="lv-orn" aria-hidden>
            <span className="lv-orn-live">live.</span>
            <span className="lv-orn-us">ART IS US</span>
            <span className="lv-orn-star">✦</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-cover-hi lv-tx">
            <span className="lv-eyebrow">we are our own creation</span>
            <p>Мрамор, залитый красным. Двое, обнявшиеся в вечности — искусство, что дышит, любит и остаётся нами.</p>
          </Layer>
          <div className="lv-grain" aria-hidden />
          <div className="lv-scrollcue" aria-hidden>feel ↓</div>
        </div>

        {/* 1 · LOver — камера наехала на головы; LO · ver по сторонам, за статуей */}
        <div transition="push" className="scene-body lv-guillo">
          <div className="lv-guillo-bg" aria-hidden />
          <div className="lv-guillo-type lv-tx" aria-hidden><span className="lv-g-l">LO</span><span className="lv-g-r">ver</span></div>
          <Layer z={3} depth={0} phase={[0, 1]} className="lv-close">
            <SceneMedia src={CUT} alt="Влюблённые — головы крупно" share="pair" />
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-guillo-cap lv-tx">
            <span className="lv-folio">canto I</span>
            <p>Камень, что помнит прикосновение. Любовь — единственное, что переживает и мрамор, и время, и нас самих.</p>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 2 · THE KISS — кульминация: поцелуй в центре кадра, единственный алый свет — на губах */}
        <div transition="push" className="scene-body lv-kiss">
          <Layer z={1} depth={0} phase={[0, 1]} className="lv-kiss-fig">
            <SceneMedia src={`${A}/lover-portrait-b.jpg`} alt="Поцелуй — алый свет на мраморе" />
          </Layer>
          <div className="lv-kiss-veil" aria-hidden />
          <div className="lv-tunnel-huge lv-tx" aria-hidden>US</div>
          <Layer z={6} depth={0.24} phase={[0.45, 0.95]} from={{ opacity: 0, y: "2vh" }} to={{ opacity: 1, y: "0vh" }} className="lv-tunnel-cap lv-tx">
            <span className="lv-folio">art is us</span>
            <p>Мы — собственное творение. Каждое объятие высекает нас заново. Красное — цвет того, что живо под камнем.</p>
            <span className="lv-meta">brave · we live</span>
          </Layer>
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 3 · PLINTH — красный луч переехал на постамент: касание рук */}
        <div transition="lv-sweep" className="scene-body lv-plinth">
          <div className="lv-plinth-bg" aria-hidden />
          <div className="lv-plinth-spot" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0.1, 0.9]} from={{ scale: 1.06, y: "2vh" }} to={{ scale: 1, y: "0vh" }} className="lv-plinth-fig">
            <SceneMedia src={`${A}/lover-still-1.jpg`} alt="Рука статуи на драпировке — деталь" />
          </Layer>
          <div className="lv-plinth-base" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.45, 0.95]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-plinth-label lv-tx">
            <span className="lv-folio">detail · touch</span>
            <h3>The embrace</h3>
            <p>Пальцы, застывшие в нежности. Драпировка, что льётся как кровь. Момент близости, высеченный навсегда.</p>
            <span className="lv-plinth-spec" aria-hidden>marble · red monochrome · MMXXVI</span>
          </Layer>
          <div className="lv-sweep-glow" aria-hidden />
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 4 · LIVE. — пустота-монумент: пара крошечная под растущим лучом */}
        <div transition="lv-sweep" className="scene-body lv-mono">
          <div className="lv-mono-bg" aria-hidden />
          <div className="lv-mono-beam" aria-hidden />
          <Layer z={2} depth={0.4} phase={[0.2, 1]} from={{ scale: 0.94, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="lv-mono-word lv-tx">
            <span>Live<em>.</em></span>
          </Layer>
          <Layer z={3} depth={0} phase={[0, 1]} className="lv-mono-fig">
            <SceneMedia src={CUT} alt="Влюблённые — крошечные в пустоте под лучом" share="pair" />
          </Layer>
          <Layer z={4} depth={0.18} phase={[0.45, 0.95]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="lv-mono-cap lv-tx">
            <span className="lv-eyebrow">we are our own creation</span>
            <p>Не бойся быть высеченным любовью. Красное — не рана, а доказательство, что ты живёшь.</p>
          </Layer>
          <div className="lv-sweep-glow" aria-hidden />
          <div className="lv-grain" aria-hidden />
        </div>

        {/* 5 · PLAQUE — кольцо: пара возвращается в полный свет, рядом светлая мраморная табличка (самая светлая сцена) */}
        <div transition="fade" className="scene-body lv-plaque">
          <div className="lv-plaque-bg" aria-hidden />
          <Layer z={2} depth={0} phase={[0, 1]} className="lv-plaque-fig">
            <SceneMedia src={CUT} alt="Влюблённые в полном свете" share="pair" />
          </Layer>
          <div className="lv-plaque-plate">
            <span className="lv-plaque-mark" aria-hidden>✦</span>
            <span className="lv-plaque-small">art is lover · art is us</span>
            <h2>We are our own creation</h2>
            <p>Мы — не второй выбор, а искусство само по себе.</p>
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
