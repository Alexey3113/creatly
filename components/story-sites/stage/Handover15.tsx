"use client";
/* STORY v2 · САЙТ 12 — «HANDOVER» (pin15: gold-amber библейский эпик, пророк+огненная колесница).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine → Tunnel Zoom → Relic(верт-полоса,cut) → Feature+Film-strip → Quiet(минимал). ЗОЛОТОЙ. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./handover15.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Handover15() {
  return (
    <div className="hv-site">
      <header className="hv-head">
        <Link href="/story2" className="hv-brand">HANDOVER</Link>
        <nav className="hv-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Transition</a>
          <a href="#" onClick={stop}>Service</a>
          <a href="#" onClick={stop} className="hv-cta">Join us</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="drop" className="scene-body hv-cover">
          <div className="hv-cover-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.14 }} to={{ scale: 1.02 }} className="hv-cover-fig kb-media">
            <SceneMedia src={`${A}/handover-hero.jpg`} alt="Пророк тянется к огненной колеснице" />
          </Layer>
          <div className="hv-cover-veil" aria-hidden />
          <Layer z={4} depth={0.3} phase={[0, 0.9]} from={{ y: "6vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-wordmark"><span aria-hidden>HANDOVER</span></Layer>
          <div className="hv-orn" aria-hidden>
            <span className="hv-orn-l">// a transition</span>
            <span className="hv-orn-r">// a new move</span>
            <span className="hv-orn-time">09:00 AM<br />service</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-cover-hi">
            <span className="hv-eyebrow">charismatic students fellowship · this sunday</span>
            <h1>Handover<em>Service</em></h1>
            <p>Мантия переходит из рук в руки. Колесница огня в золотых облаках — момент, когда старое уступает новому.</p>
          </Layer>
          <div className="hv-grain" aria-hidden />
          <div className="hv-scrollcue" aria-hidden>rise ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body hv-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="hv-guillo-fig kb-media">
            <SceneMedia src={`${A}/handover-portrait-b.jpg`} alt="Пророк на коленях в золотом свете" />
          </Layer>
          <div className="hv-guillo-veil" aria-hidden />
          <div className="hv-guillo-type" aria-hidden><span>A NEW</span><span className="hv-guillo-out">MOVE</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-guillo-cap">
            <span className="hv-folio">the transition</span>
            <p>«И вознёсся Илия в вихре на небо». Мантия упала — и двойная сила легла на плечи того, кто остался.</p>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 2 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body hv-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.22 }} to={{ scale: 1.03 }} className="hv-tunnel-fig kb-media">
            <SceneMedia src={`${A}/handover-still-1.jpg`} alt="Огненная колесница в золотых облаках" />
          </Layer>
          <div className="hv-tunnel-veil" aria-hidden />
          <div className="hv-tunnel-huge" aria-hidden>FIRE</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="hv-tunnel-cap">
            <span className="hv-folio">chariot of fire</span>
            <p>Кони из пламени, колесница из света. Переход — это не конец, а передача огня из поколения в поколение.</p>
            <span className="hv-meta">members are brethren · brethren are family</span>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 3 · RELIC — вертикальный кроп-полоса у ЛЕВОГО края, подпись справа (слом клон-макро) */}
        <div transition="cut" className="scene-body hv-relic">
          <div className="hv-relic-bg" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0, 1]} from={{ scale: 1.14, x: "-3vw" }} to={{ scale: 1.03, x: "0vw" }} className="hv-relic-strip kb-media">
            <SceneMedia src={`${A}/handover-still-2.jpg`} alt="Мантия пророка — деталь" />
          </Layer>
          <div className="hv-relic-huge" aria-hidden>✝</div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.7]} from={{ x: "40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="hv-relic-cap">
            <span className="hv-folio">relic · the mantle</span>
            <h3>The mantle</h3>
            <p>Плащ, что упал с небес. Кто поднимет — примет и бремя, и благодать. Символ передан из руки в руку.</p>
            <div className="hv-relic-marks"><span>gold thread</span><span>·</span><span>double portion</span><span>·</span><span>2026</span></div>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 4 · FEATURE + FILM-STRIP — доминанта слева + вертикальная лента справа (не сетка) */}
        <div transition="drop" className="scene-body hv-feature">
          <div className="hv-feature-bg" aria-hidden />
          <div className="hv-feature-head" aria-hidden><b>The Move</b><span>a transition · a new move</span></div>
          <figure className="hv-feature-main"><img src={`${A}/handover-extra-1.jpg`} alt="Огненная колесница" loading="lazy" /><figcaption><b>The Chariot</b><span>ii · ascension</span></figcaption></figure>
          <div className="hv-feature-strip">
            <figure className="hv-strip-1"><img src={`${A}/handover-extra-3.jpg`} alt="Восхождение" loading="lazy" /><figcaption>i · rise</figcaption></figure>
            <figure className="hv-strip-2"><img src={`${A}/handover-extra-2.jpg`} alt="Пламя" loading="lazy" /><figcaption>iii · fire</figcaption></figure>
            <figure className="hv-strip-3"><img src={`${A}/handover-extra-4.jpg`} alt="Мантия" loading="lazy" /><figcaption>iv · mantle</figcaption></figure>
          </div>
          <div className="hv-feature-code" aria-hidden>Elijah shall be clothed with the Spirit · a new move</div>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 5 · QUIET — почти пустое золотое поле, тихая строка + ссылка (не центр-слоган+кнопка) */}
        <div transition="drop" className="scene-body hv-quiet">
          <div className="hv-quiet-bg" aria-hidden />
          <div className="hv-quiet-mark" aria-hidden>✝</div>
          <div className="hv-quiet-block">
            <span className="hv-quiet-verse">«и был двойной дух его на нём»</span>
            <span className="hv-quiet-small">receive the mantle</span>
            <a href="#" onClick={stop} className="hv-quiet-link">Join this Sunday →</a>
          </div>
          <div className="hv-quiet-meta" aria-hidden>Handover Service · 09:00 AM · charismatic students fellowship · 2026</div>
          <div className="hv-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
