"use client";
/* STORY v2 · САЙТ 13 — «AESTHETIC» (pin14: black/blood-red готик тату-монахиня, терн-корона, кровь).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine → Split Persona → Flash(центр-карта) → Book(разворот) → Stamp(печать). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./aesthetic14.css";

const A = "/uploads/1/story2";
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
        {/* 0 · OCCLUDED IDOL */}
        <div transition="smash" className="scene-body ae-cover">
          <div className="ae-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ae-wordmark"><span aria-hidden>Aesthetic</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="ae-cover-fig">
            <SceneMedia src={`${A}/aesthetic-hero-cut.png`} alt="Aesthetic — тату-монахиня с терновой короной" />
          </Layer>
          <div className="ae-orn" aria-hidden>
            <span className="ae-orn-l">we believe we can change<br />because otherwise —<br />no favourable outcome</span>
            <span className="ae-orn-r">some days<br />they would be<br />purple and pink</span>
            <span className="ae-orn-eye">◉</span>
            <span className="ae-orn-drip">✝ ✝ ✝</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-cover-hi">
            <span className="ae-eyebrow">restricted · devotion in ink</span>
            <h1>Holy <em>ink.</em></h1>
            <p>Терновая корона, красный крест на лбу, чернила по коже как молитвы. Святость, залитая кровью и тушью.</p>
          </Layer>
          <div className="ae-grain" aria-hidden />
          <div className="ae-scrollcue" aria-hidden>confess ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body ae-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="ae-guillo-fig kb-media">
            <SceneMedia src={`${A}/aesthetic-portrait-b.jpg`} alt="Aesthetic — портрет" />
          </Layer>
          <div className="ae-guillo-veil" aria-hidden />
          <div className="ae-guillo-type" aria-hidden><span>DEVO</span><span className="ae-guillo-out">TION</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-guillo-cap">
            <span className="ae-folio">the vow</span>
            <p>Не украшаю тело — исповедуюсь им. Каждая линия туши — псалом, каждая капля алого — покаяние.</p>
          </Layer>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 2 · SPLIT PERSONA */}
        <div transition="wipe-x" className="scene-body ae-split">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ x: "-6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ae-split-a">
            <SceneMedia src={`${A}/aesthetic-hero.jpg`} alt="Aesthetic — свет" />
          </Layer>
          <Layer z={2} depth={0.1} phase={[0.06, 1]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ae-split-b">
            <SceneMedia src={`${A}/aesthetic-portrait-b.jpg`} alt="Aesthetic — тень" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ opacity: 0, scale: 1.08 }} to={{ opacity: 1, scale: 1 }} className="ae-split-type">
            <span>saint on the skin · sinner in the soul</span>
            <b>SACRED <em>&amp;</em> STAINED</b>
          </Layer>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 3 · FLASH — тату-флеш-карта по центру, пунктир-рамка + бирка (слом клон-макро) */}
        <div transition="wipe-x" className="scene-body ae-flash">
          <div className="ae-flash-bg" aria-hidden />
          <div className="ae-flash-huge" aria-hidden>✝</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ rotate: "4deg", opacity: 0, scale: 1.06 }} to={{ rotate: "-3deg", opacity: 1, scale: 1 }} className="ae-flash-card">
            <SceneMedia src={`${A}/aesthetic-still-1.jpg`} alt="Тату и крест — деталь" />
            <span className="ae-flash-tag" aria-hidden>no.01 · ink &amp; iron</span>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ae-flash-cap">
            <span className="ae-folio">flash sheet · relic</span>
            <h3>Ink &amp; iron</h3>
            <p>Серебряный крест на цепи, розы в чернилах, брызги алого. Реликвия веры, что носится на коже навсегда.</p>
          </Layer>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 4 · BOOK — портфолио-разворот: большая плата слева + стопка справа, корешок (не сетка) */}
        <div transition="drop" className="scene-body ae-book">
          <div className="ae-book-bg" aria-hidden />
          <div className="ae-book-head" aria-hidden><b>Portfolio</b><span>devotion in ink · no.14</span></div>
          <div className="ae-book-spread">
            <figure className="ae-plate ae-plate-main"><img src={`${A}/aesthetic-extra-3.jpg`} alt="Образ" loading="lazy" /><figcaption>plate i · vow</figcaption></figure>
            <div className="ae-book-spine" aria-hidden />
            <div className="ae-book-right">
              <figure className="ae-plate ae-plate-s1"><img src={`${A}/aesthetic-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · sin</figcaption></figure>
              <figure className="ae-plate ae-plate-s2"><img src={`${A}/aesthetic-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>iii · ink</figcaption></figure>
              <figure className="ae-plate ae-plate-s3"><img src={`${A}/aesthetic-still-2.jpg`} alt="Кровь" loading="lazy" /><figcaption>iv · blood</figcaption></figure>
            </div>
          </div>
          <div className="ae-book-code" aria-hidden>gradually the intolerable becomes unimportant · absolutely determined</div>
          <div className="ae-grain" aria-hidden />
        </div>

        {/* 5 · STAMP — красный оттиск-печать «consecrated» (не центр-слоган+кнопка) */}
        <div transition="smash" className="scene-body ae-stamp">
          <div className="ae-stamp-bg" aria-hidden />
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
