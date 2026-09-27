"use client";
/* STORY v2 · САЙТ 12 — «HANDOVER» (pin15: gold-amber библейский эпик, пророк+огненная колесница).
   Сквозная архитектура (аудит 2026-09): закон камеры — СПУСК вслед за мантией.
   S1→S2 push в небо. S2→S3→S4 — ОДИН высокий холст (extra-3: колесница → падающая мантия → пророк): камера
   едет по нему вниз, холсты уходящей/входящей сцены совпадают (fade + синхронный сдвиг по --ep/--sp).
   S4→S5 hv-descend: камера опускается на песок, где лежит мантия. S5→S6 share «mantle»: реликвия ложится в
   плёнку галереи. S6→S7 share «canvas»: кадр обложки разворачивается в светлый финал — кольцо, огонь вернулся. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./handover15.css";

const A = "/uploads/1/story2";
const CANVAS = `${A}/handover-extra-3.jpg`;
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
        {/* 0 · COVER — один вордмарк (кремовый с тенью, не золото по золоту) */}
        <div transition="push" className="scene-body hv-cover">
          <div className="hv-cover-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.14 }} to={{ scale: 1.02 }} className="hv-cover-fig kb-media">
            <SceneMedia src={`${A}/handover-hero.jpg`} alt="Пророк тянется к огненной колеснице" />
          </Layer>
          <div className="hv-cover-veil" aria-hidden />
          <Layer z={4} depth={0.3} phase={[0, 0.9]} from={{ y: "6vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-wordmark"><h1>HANDOVER</h1></Layer>
          <div className="hv-orn" aria-hidden>
            <span className="hv-orn-l">// a transition</span>
            <span className="hv-orn-r">// a new move</span>
            <span className="hv-orn-time">09:00 AM<br />service</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-cover-hi hv-tx">
            <span className="hv-eyebrow">charismatic students fellowship · this sunday</span>
            <span className="hv-cover-sub">Service</span>
            <p>Мантия переходит из рук в руки. Колесница огня в золотых облаках — момент, когда старое уступает новому.</p>
          </Layer>
          <div className="hv-grain" aria-hidden />
          <div className="hv-scrollcue" aria-hidden>rise ↓</div>
        </div>

        {/* 1 · SKY — верх холста: колесница уносит Илию */}
        <div transition="push" className="scene-body hv-sky">
          <div className="hv-canvas hv-v-a" aria-hidden><img src={CANVAS} alt="" /></div>
          <div className="hv-scrim hv-scrim-bl" aria-hidden />
          <div className="hv-tunnel-huge hv-tx" aria-hidden>FIRE</div>
          <Layer z={6} depth={0.24} phase={[0.35, 0.9]} from={{ opacity: 0, y: "2vh" }} to={{ opacity: 1, y: "0vh" }} className="hv-cap hv-cap-bl hv-tx">
            <span className="hv-folio">chariot of fire</span>
            <p>Кони из пламени, колесница из света. Переход — это не конец, а передача огня из поколения в поколение.</p>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 2 · FALL — середина того же холста: мантия срывается и падает */}
        <div transition="fade" className="scene-body hv-fall">
          <div className="hv-canvas hv-v-b" aria-hidden><img src={CANVAS} alt="" /></div>
          <div className="hv-scrim hv-scrim-l" aria-hidden />
          <div className="hv-guillo-type hv-tx" aria-hidden><span>A NEW</span><span className="hv-guillo-out">MOVE</span></div>
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-cap hv-cap-bl hv-tx">
            <span className="hv-folio">the transition</span>
            <p>«И вознёсся Илия в вихре на небо». Мантия упала —</p>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 3 · SUCCESSOR — низ холста: тот, кто остался, тянется к огню */}
        <div transition="fade" className="scene-body hv-heir">
          <div className="hv-canvas hv-v-c" aria-hidden><img src={CANVAS} alt="Илия в огненной колеснице, падающая мантия и Елисей с поднятыми руками — одно полотно" /></div>
          <div className="hv-scrim hv-scrim-r" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hv-cap hv-cap-r hv-tx">
            <span className="hv-folio">the successor</span>
            <p>— и двойная сила легла на плечи того, кто остался.</p>
            <span className="hv-meta">members are brethren · brethren are family</span>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 4 · RELIC — камера опустилась на песок: мантия лежит у ног */}
        <div transition="hv-descend" className="scene-body hv-relic">
          <div className="hv-relic-bg" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0, 1]} from={{ scale: 1.1, y: "-3vh" }} to={{ scale: 1, y: "0vh" }} className="hv-relic-strip">
            <SceneMedia src={`${A}/handover-still-2.jpg`} alt="Мантия пророка на песке" share="mantle" />
          </Layer>
          <div className="hv-relic-huge" aria-hidden>✝</div>
          <Layer z={6} depth={0.2} phase={[0.35, 0.9]} from={{ x: "40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="hv-relic-cap hv-tx">
            <span className="hv-folio">relic · the mantle</span>
            <h3>The mantle</h3>
            <p>Плащ, что упал с небес. Кто поднимет — примет и бремя, и благодать. Символ передан из руки в руку.</p>
            <div className="hv-relic-marks"><span>gold thread</span><span>·</span><span>double portion</span><span>·</span><span>2026</span></div>
          </Layer>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 5 · FEATURE + FILM-STRIP — мантия ложится в свой кадр ленты (share «mantle») */}
        <div transition="fade" className="scene-body hv-feature">
          <div className="hv-feature-bg" aria-hidden />
          <div className="hv-feature-head hv-tx" aria-hidden><b>The Move</b><span>a transition · a new move</span></div>
          <figure className="hv-feature-main"><img src={`${A}/handover-hero.jpg`} alt="Передача мантии — всё полотно" loading="lazy" data-share="canvas" /><figcaption><b>The Handover</b><span>ii · ascension</span></figcaption></figure>
          <div className="hv-feature-strip">
            <figure className="hv-strip-1"><img src={`${A}/handover-still-1.jpg`} alt="Колесница в облаках" loading="lazy" /><figcaption>i · chariot</figcaption></figure>
            <figure className="hv-strip-2"><img src={`${A}/handover-extra-2.jpg`} alt="Пламя" loading="lazy" /><figcaption>iii · fire</figcaption></figure>
            <figure className="hv-strip-3"><img src={`${A}/handover-still-2.jpg`} alt="Мантия" loading="lazy" data-share="mantle" /><figcaption>iv · mantle</figcaption></figure>
          </div>
          <div className="hv-feature-code" aria-hidden>Elijah shall be clothed with the Spirit · a new move</div>
          <div className="hv-grain" aria-hidden />
        </div>

        {/* 6 · RECEIVE — кольцо: полотно обложки разворачивается во весь экран, огонь вернулся (самая светлая сцена) */}
        <div transition="fade" className="scene-body hv-quiet">
          <div className="hv-quiet-bg" aria-hidden />
          <div className="hv-quiet-fig"><img src={`${A}/handover-hero.jpg`} alt="Пророк принимает мантию под огненной колесницей" loading="lazy" data-share="canvas" /></div>
          <div className="hv-quiet-scrim" aria-hidden />
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
