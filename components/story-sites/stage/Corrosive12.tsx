"use client";
/* STORY v2 · САЙТ 11 — «CORROSIVE» (pin12: red screenprint pop-art рогатая монахиня, ретро-пропаганда).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine(cut) → Broadsheet(агитпроп-газета) → Screenprint(смещённая шелкография,cut) → Split Persona → Ballot(бланк+штамп). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./corrosive12.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Corrosive12() {
  return (
    <div className="cs-site">
      <header className="cs-head">
        <Link href="/story2" className="cs-brand">CORROSIVE</Link>
        <nav className="cs-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Systems</a>
          <a href="#" onClick={stop}>Label</a>
          <a href="#" onClick={stop} className="cs-cta">TS26</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="smash" className="scene-body cs-cover">
          <div className="cs-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cs-wordmark"><KineticText text="CORROSIVE" mode="slam" /></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="cs-cover-fig">
            <SceneMedia src={`${A}/corrosive-hero-cut.png`} alt="CORROSIVE — рогатая монахиня, поп-арт" />
          </Layer>
          <div className="cs-hud" aria-hidden>
            <div className="cs-hud-panel">
              <b>TRANSFORM ▪ TS26</b><span>—23 CORROSIVE</span>
              <em>◉ Nise MO·ORS · MF0402-0330(f)</em>
            </div>
            <span className="cs-hud-r"><b>R</b> RESTRICTED<br />under 17 requires<br />parent or adult guard.</span>
            <span className="cs-hud-arr">▷▷</span>
            <span className="cs-hud-bio">☣ BLACK · LABEL SYSTEM</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cs-cover-hi">
            <span className="cs-eyebrow">systems group (b) · label system</span>
            <h1>Corrosive</h1>
            <p>Ретро-пропаганда нового ордена. Рога под покрывалом, красный код на белом — то, что разъедает старые правила.</p>
          </Layer>
          <div className="cs-grain" aria-hidden />
          <div className="cs-scrollcue" aria-hidden>transform ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE (cut) */}
        <div transition="cut" className="scene-body cs-guillo">
          <div className="cs-guillo-type">
            <KineticText text="TS26" mode="slam" />
            <span className="cs-guillo-out"><KineticText text="CORROSIVE" mode="slam" start={0.1} /></span>
          </div>
          <div className="cs-guillo-row" aria-hidden><span>▪ transform</span><span>▪ restricted</span><span>▪ black label</span></div>
        </div>

        {/* 2 · BROADSHEET — агитпроп-газета: масthead + лид + колонки (не сетка) */}
        <div transition="drop" className="scene-body cs-broad">
          <div className="cs-broad-bg" aria-hidden />
          <div className="cs-broad-masthead" aria-hidden><b>THE LABEL</b><span>systems group (b) · no.33 · restricted</span></div>
          <figure className="cs-lead"><img src={`${A}/corrosive-extra-3.jpg`} alt="Постер" loading="lazy" /><figcaption><b>The new order rises</b><span>01 · idol</span></figcaption></figure>
          <div className="cs-broad-cols">
            <figure className="cs-col cs-col-1"><img src={`${A}/corrosive-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>02 · order</figcaption></figure>
            <figure className="cs-col cs-col-2"><img src={`${A}/corrosive-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>03 · horns</figcaption></figure>
            <figure className="cs-col cs-col-3"><img src={`${A}/corrosive-still-2.jpg`} alt="Ткань" loading="lazy" /><figcaption>04 · veil</figcaption></figure>
          </div>
          <div className="cs-broad-code" aria-hidden>compliance (non) prices-33 · customs (x) KTLSU04492.049</div>
          <div className="cs-grain" aria-hidden />
        </div>

        {/* 3 · SCREENPRINT — смещённая шелкография: красный оффсет-слой + слоган (слом клон-макро) */}
        <div transition="cut" className="scene-body cs-print">
          <div className="cs-print-bg" aria-hidden />
          <div className="cs-print-huge" aria-hidden>☣</div>
          <Layer z={1} depth={0.16} phase={[0, 1]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cs-print-red">
            <SceneMedia src={`${A}/corrosive-still-1.jpg`} alt="" />
          </Layer>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cs-print-ink">
            <SceneMedia src={`${A}/corrosive-still-1.jpg`} alt="Рога и покрывало — деталь" />
          </Layer>
          <div className="cs-print-slogan" aria-hidden>UNDER<br />THE VEIL</div>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cs-print-cap">
            <span className="cs-folio">label · horns · edition 33</span>
            <p>Чёрные рога под белым покрывалом — святость, что кусается. Пропаганда красоты, которая не просит разрешения.</p>
          </Layer>
          <div className="cs-grain" aria-hidden />
        </div>

        {/* 4 · SPLIT PERSONA */}
        <div transition="wipe-x" className="scene-body cs-split">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ x: "-6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="cs-split-a">
            <SceneMedia src={`${A}/corrosive-hero.jpg`} alt="CORROSIVE — образ" />
          </Layer>
          <Layer z={2} depth={0.1} phase={[0.06, 1]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="cs-split-b">
            <SceneMedia src={`${A}/corrosive-portrait-b.jpg`} alt="CORROSIVE — профиль" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ opacity: 0, scale: 1.08 }} to={{ opacity: 1, scale: 1 }} className="cs-split-type">
            <span>saint &amp; sinner · one label</span>
            <b>HOLY <em>ROT</em></b>
          </Layer>
          <div className="cs-grain" aria-hidden />
        </div>

        {/* 5 · BALLOT — официальный бланк трансформации: чекбоксы + штамп APPROVED (не центр-слоган) */}
        <div transition="smash" className="scene-body cs-ballot">
          <div className="cs-ballot-bg" aria-hidden />
          <div className="cs-ballot-card">
            <div className="cs-ballot-head" aria-hidden><b>New Order</b><span>official transformation ballot · TS26</span></div>
            <ul className="cs-ballot-list">
              <li><span className="cs-check" aria-hidden>✕</span> I reject the old rules</li>
              <li><span className="cs-check" aria-hidden>✕</span> I join the label system</li>
              <li><span className="cs-check cs-check-e" aria-hidden>▢</span> I remain unbothered</li>
            </ul>
            <span className="cs-ballot-stamp" aria-hidden>APPROVED</span>
            <div className="cs-ballot-cta">
              <a href="#" onClick={stop} className="cs-btn">Transform ▷</a>
              <div className="cs-links"><a href="#" onClick={stop}>Systems</a><a href="#" onClick={stop}>Label</a><a href="#" onClick={stop}>TS26</a></div>
            </div>
          </div>
          <div className="cs-ballot-meta" aria-hidden>CORROSIVE · systems group (b) · restricted · black label system ☣</div>
          <div className="cs-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
