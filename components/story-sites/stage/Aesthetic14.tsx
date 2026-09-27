"use client";
/* STORY v2 · САЙТ 13 — «AESTHETIC» (pin14: black/blood-red готик тату-монахиня, терн-корона, кровь).
   Сквозная архитектура (аудит 2026-09): актёр — татуированные руки; закон — кровь/тушь растекается.
   S1→S2 push + share «nun»: та же вырезка, наезд на лицо в рамке рук. S2→S3, S3→S4 ae-bleed: следующая сцена
   проступает кляксами с алой кромкой (вместо wipe-x/drop/smash). S4→S5 share «rosary»: руки с чётками ложатся
   в разворот книги. S5→S6 share «print»: кадр обложки из книги становится освящённым оттиском на костяной
   бумаге (кольцо). Световая дуга: каждая сцена светлее, финал — бумага. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./aesthetic14.css";

const A = "/uploads/1/story2";
const CUT = `${A}/aesthetic-hero-cut-soft.png`; // та же вырезка, края растворены в альфе (едет «призраком»)
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Aesthetic14() {
  return (
    <div className="ae-site">
      <header className="ae-head">
        <Link href="/story2" className="ae-brand">Aesthetic</Link>
        <nav className="ae-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Sin</a>
          <a href="#" onClick={stop}>Ink</a>
          <a href="#" onClick={stop} className="ae-cta">Confess</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — вордмарк строчными над головой (чёрный шрифт читается), вуаль лишь касается букв */}
        <div transition="push" className="scene-body ae-cover">
          <div className="ae-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ae-wordmark"><span aria-hidden>Aesthetic</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="ae-cover-fig">
            <SceneMedia src={CUT} alt="Aesthetic — тату-монахиня с терновой короной" share="nun" />
          </Layer>
          <div className="ae-orn" aria-hidden>
            <span className="ae-orn-l">we believe we can change<br />because otherwise —<br />no favourable outcome</span>
            <span className="ae-orn-r">some days<br />they would be<br />purple and pink</span>
            <span className="ae-orn-eye">◉</span>
            <span className="ae-orn-drip">✝ ✝ ✝</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-cover-hi ae-tx">
            <span className="ae-eyebrow">restricted · devotion in ink</span>
            <h1>Holy <em>ink.</em></h1>
            <p>Терновая корона, красный крест на лбу, чернила по коже как молитвы. Святость, залитая кровью и тушью.</p>
          </Layer>
          <div className="ae-grain" aria-hidden />
          <div className="ae-scrollcue" aria-hidden>confess ↓</div>
        </div>

        {/* 1 · DEVOTION — камера наехала: лицо в рамке татуированных рук; DEVO · TION по сторонам головы */}
        <div transition="push" className="scene-body ae-guillo">
          <div className="ae-guillo-bg" aria-hidden />
          <div className="ae-guillo-type ae-tx" aria-hidden><span className="ae-g-l">Devo</span><span className="ae-g-r">tion</span></div>
          <Layer z={3} depth={0} phase={[0, 1]} className="ae-close">
            <SceneMedia src={CUT} alt="Лицо в рамке татуированных рук" share="nun" />
          </Layer>
          <div className="ae-guillo-scrim" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-guillo-cap ae-tx">
            <span className="ae-folio">the vow</span>
            <p>Не украшаю тело — исповедуюсь им. Каждая линия туши — псалом, каждая капля алого — покаяние.</p>
          </Layer>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 2 · SPLIT PERSONA — кровь растекается и становится сценой */}
        <div transition="ae-bleed" className="scene-body ae-split">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ x: "-4vw" }} to={{ x: "0vw" }} className="ae-split-a">
            <SceneMedia src={`${A}/aesthetic-hero.jpg`} alt="Aesthetic — свет" />
          </Layer>
          <Layer z={2} depth={0.1} phase={[0.06, 1]} from={{ x: "4vw" }} to={{ x: "0vw" }} className="ae-split-b">
            <SceneMedia src={`${A}/aesthetic-portrait-b.jpg`} alt="Aesthetic — тень" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.45, 0.95]} from={{ opacity: 0, scale: 1.08 }} to={{ opacity: 1, scale: 1 }} className="ae-split-type ae-tx">
            <span>saint on the skin · sinner in the soul</span>
            <b>SACRED <em>&amp;</em> STAINED</b>
          </Layer>
          <div className="ae-bleed-rim" aria-hidden />
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 3 · FLASH — руки с чётками крупно в пунктирной флеш-рамке (не карточка в пустоте) */}
        <div transition="ae-bleed" className="scene-body ae-flash">
          <div className="ae-flash-bg" aria-hidden />
          <div className="ae-flash-huge" aria-hidden>✝</div>
          <div className="ae-flash-card">
            <img src={`${A}/aesthetic-still-1.jpg`} alt="Татуированные руки с крестом на чётках" loading="lazy" data-share="rosary" />
            <span className="ae-flash-tag" aria-hidden>no.01 · ink &amp; iron</span>
          </div>
          <Layer z={6} depth={0.2} phase={[0.45, 0.95]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-flash-cap ae-tx">
            <span className="ae-folio">flash sheet · relic</span>
            <h3>Ink &amp; iron</h3>
            <p>Серебряный крест на цепи, розы в чернилах, брызги алого. Реликвия веры, что носится на коже навсегда.</p>
          </Layer>
          <div className="ae-bleed-rim" aria-hidden />
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 4 · BOOK — разворот: чётки садятся на главную плату, обложечный кадр ждёт в стопке */}
        <div transition="fade" className="scene-body ae-book">
          <div className="ae-book-bg" aria-hidden />
          <div className="ae-book-head ae-tx" aria-hidden><b>Portfolio</b><span>devotion in ink · no.14</span></div>
          <div className="ae-book-spread">
            <figure className="ae-plate ae-plate-main"><img src={`${A}/aesthetic-still-1.jpg`} alt="Руки и чётки" loading="lazy" data-share="rosary" /><figcaption>plate i · vow</figcaption></figure>
            <div className="ae-book-spine" aria-hidden />
            <div className="ae-book-right">
              <figure className="ae-plate ae-plate-s1"><img src={`${A}/aesthetic-extra-1.jpg`} alt="Грех" loading="lazy" /><figcaption>ii · sin</figcaption></figure>
              <figure className="ae-plate ae-plate-s2"><img src={`${A}/aesthetic-extra-2.jpg`} alt="Тушь" loading="lazy" /><figcaption>iii · ink</figcaption></figure>
              <figure className="ae-plate ae-plate-s3"><img src={`${A}/aesthetic-hero.jpg`} alt="Святая" loading="lazy" data-share="print" /><figcaption>iv · saint</figcaption></figure>
            </div>
          </div>
          <div className="ae-book-code" aria-hidden>gradually the intolerable becomes unimportant · absolutely determined</div>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 5 · STAMP — кольцо: она же, оттиск на костяной бумаге, поверх — печать consecrated */}
        <div transition="fade" className="scene-body ae-stamp">
          <div className="ae-stamp-bg" aria-hidden />
          <figure className="ae-print"><img src={`${A}/aesthetic-hero.jpg`} alt="Holy ink — освящённый оттиск" loading="lazy" data-share="print" /></figure>
          <div className="ae-stamp-seal" aria-hidden><span>✝ consecrated ✝</span><b>HOLY INK</b><span>devotion · MMXXVI</span></div>
          <div className="ae-stamp-block">
            <span className="ae-stamp-small">wear your devotion</span>
            <h4>Sacred &amp; stained</h4>
            <a href="#" onClick={stop} className="ae-btn">Book a session ✝</a>
            <div className="ae-links"><a href="#" onClick={stop}>Portfolio</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Confess</a></div>
          </div>
          <div className="ae-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
