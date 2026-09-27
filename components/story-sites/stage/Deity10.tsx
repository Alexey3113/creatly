"use client";
/* STORY v2 · САЙТ 10 — «DEITY» (pin10: мрамор+золото статуя self-appointed deity, 自由/神, baroque-вейпорвейв).
   Сквозная архитектура (аудит 2026-09): один идол, камера ходит ВОКРУГ него.
   S1→S2 «облёт» (dt-orbit, CSS сайта): фас растворяется в профиль, дальний план едет по дуге, ближний — навстречу.
   S2→S3 кадр профиля смыкается в медальон вокруг золотой трещины (fade + отверстие в фоне, ручная синхронизация).
   S3→S4 iris ИЗ медальона (круглая форма в кадре). S4→S5 share «idol»: лик улетает в строку реестра.
   S5→S6 share «idol»: он же возвращается в витрину финала — кольцо. Свет растёт от сцены к сцене (прожектор). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./deity10.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Deity10() {
  return (
    <div className="dt-site">
      <header className="dt-head">
        <Link href="/story2" className="dt-brand">DEITY<i>神</i></Link>
        <nav className="dt-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Marble</a>
          <a href="#" onClick={stop}>Gold</a>
          <a href="#" onClick={stop} className="dt-cta">Worship</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — голова идола стоит в пробеле SELF · APPOINTED: слово читается целиком */}
        <div transition="dt-orbit" className="scene-body dt-cover">
          <div className="dt-cover-bg" aria-hidden />
          <div className="dt-cover-light" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="dt-wordmark dt-far dt-tx">
            <span className="dt-wm-self" aria-hidden>SELF</span><span className="dt-wm-app" aria-hidden>APPOINTED</span>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="dt-cover-fig dt-subject">
            <SceneMedia src={`${A}/deity-hero-cut-soft.png`} alt="Мраморная статуя-божество в золотых трещинах, парча и цепь" />
          </Layer>
          <div className="dt-orn dt-near" aria-hidden>
            <span className="dt-orn-jp">自由</span>
            <span className="dt-orn-tag">the comment-immune entity<br />免疫体</span>
            <span className="dt-orn-lm">I cast<br />myself<br />in plaster</span>
            <span className="dt-orn-script">deity</span>
            <span className="dt-orn-bar">POSTER DESIGN · hype unbothered · 神 · MMXXVI</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="dt-cover-hi dt-tx dt-near">
            <div className="dt-cover-hi-in">
              <span className="dt-eyebrow">hype, unbothered · a self-appointed deity</span>
              <h1>Deity</h1>
              <p>Мрамор, треснувший золотом. Я вылепил себя из гипса — неуязвимый к вашим словам, вечный в собственном культе.</p>
            </div>
          </Layer>
          <div className="dt-grain" aria-hidden />
          <div className="dt-scrollcue" aria-hidden>worship ↓</div>
        </div>

        {/* 1 · PROFILE — камера облетела идола: профиль той же статуи, 免疫 стоит за ним */}
        <div transition="dt-orbit" className="scene-body dt-guillo">
          <div className="dt-guillo-bg" aria-hidden />
          <div className="dt-guillo-type dt-far" aria-hidden><span>免</span><span className="dt-guillo-gold">疫</span></div>
          <Layer z={3} depth={0} phase={[0, 1]} className="dt-bust dt-bust-a dt-subject">
            <SceneMedia src={`${A}/deity-still-1.jpg`} alt="Та же статуя в профиль — золото в трещинах щеки" />
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ x: "30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="dt-guillo-cap dt-tx dt-near">
            <div className="dt-guillo-cap-in">
              <span className="dt-folio">免疫体 · the comment-immune</span>
              <p>Никакая хвала не возвышает, никакая брань не ранит. Я — фон, на котором рушатся мнения. Гипс не слышит.</p>
            </div>
          </Layer>
          <div className="dt-grain" aria-hidden />
        </div>

        {/* 2 · RELIC MEDALLION — тот же кадр профиля смыкается в медальон вокруг трещины (фон с отверстием по --sp) */}
        <div transition="fade" className="scene-body dt-relic">
          <Layer z={1} depth={0} phase={[0, 1]} className="dt-bust dt-bust-b">
            <SceneMedia src={`${A}/deity-still-1.jpg`} alt="Золотая трещина на щеке — медальон" />
          </Layer>
          <div className="dt-relic-bg" aria-hidden />
          <div className="dt-relic-huge" aria-hidden>神</div>
          <span className="dt-relic-ring" aria-hidden />
          <Layer z={6} depth={0.22} phase={[0.45, 0.95]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="dt-relic-cap dt-tx">
            <span className="dt-folio">relic i · fracture · 金継ぎ</span>
            <h3>Gold in the cracks</h3>
            <p>Кинцуги для бога: трещины залиты золотом. Разбитое стало драгоценнее целого — рана как корона.</p>
          </Layer>
          <div className="dt-relic-marks dt-tx" aria-hidden><span>marble</span><span>·</span><span>gold vein</span><span>·</span><span>1 of 1</span></div>
          <div className="dt-grain" aria-hidden />
        </div>

        {/* 3 · FACE — медальон раскрывается диафрагмой в лик под прожектором */}
        <div transition="iris" className="scene-body dt-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.16 }} to={{ scale: 1.02 }} className="dt-tunnel-fig">
            <SceneMedia src={`${A}/deity-hero.jpg`} alt="Статуя-божество под прожектором" share="idol" />
          </Layer>
          <div className="dt-tunnel-veil" aria-hidden />
          <div className="dt-tunnel-huge dt-tx" aria-hidden>自由</div>
          <Layer z={6} depth={0.24} phase={[0.35, 0.9]} from={{ opacity: 0, scale: 1.06 }} to={{ opacity: 1, scale: 1 }} className="dt-tunnel-cap dt-tx">
            <span className="dt-folio">自由 · freedom by design</span>
            <p>Свобода — быть собственным алтарём. Я не прошу поклонения. Я просто существую громче ваших сомнений.</p>
            <span className="dt-meta">impervious · timeless · cold</span>
          </Layer>
          <div className="dt-grain" aria-hidden />
        </div>

        {/* 4 · PANTHEON LEDGER — лик улетает в свою строку реестра (share «idol») */}
        <div transition="fade" className="scene-body dt-ledger">
          <div className="dt-ledger-bg" aria-hidden />
          <div className="dt-ledger-head dt-tx" aria-hidden><span className="dt-folio">神 · acquisition ledger</span><b>Pantheon</b></div>
          <ol className="dt-ledger-list">
            <li className="dt-row dt-row-1"><span className="dt-row-idx">01</span><span className="dt-row-thumb"><img src={`${A}/deity-hero.jpg`} alt="Идол" loading="lazy" data-share="idol" /></span><span className="dt-row-name">The Idol</span><span className="dt-row-spec">plaster · self-cast</span><span className="dt-row-jp">神</span></li>
            <li className="dt-row dt-row-2"><span className="dt-row-idx">02</span><span className="dt-row-thumb"><img src={`${A}/deity-extra-1.jpg`} alt="Мрамор" loading="lazy" /></span><span className="dt-row-name">Cold Marble</span><span className="dt-row-spec">quarried · eternal</span><span className="dt-row-jp">免</span></li>
            <li className="dt-row dt-row-3"><span className="dt-row-idx">03</span><span className="dt-row-thumb"><img src={`${A}/deity-extra-2.jpg`} alt="Золото" loading="lazy" /></span><span className="dt-row-name">Gold Leaf</span><span className="dt-row-spec">24k · in the cracks</span><span className="dt-row-jp">疫</span></li>
            <li className="dt-row dt-row-4"><span className="dt-row-idx">04</span><span className="dt-row-thumb"><img src={`${A}/deity-extra-4.jpg`} alt="Фрагмент" loading="lazy" /></span><span className="dt-row-name">The Fracture</span><span className="dt-row-spec">kintsugi · 1 of 1</span><span className="dt-row-jp">体</span></li>
          </ol>
          <div className="dt-ledger-code" aria-hidden>impervious to your etching words · 免疫体</div>
          <div className="dt-grain" aria-hidden />
        </div>

        {/* 5 · COLOPHON — кольцо: идол возвращается из реестра в витрину под прожектором, рядом этикетка */}
        <div transition="fade" className="scene-body dt-colophon">
          <div className="dt-colophon-bg" aria-hidden />
          <div className="dt-colophon-light" aria-hidden />
          <div className="dt-colophon-jp" aria-hidden>神</div>
          <figure className="dt-vitrine">
            <img src={`${A}/deity-hero.jpg`} alt="Self-Appointed Deity — объект в витрине" loading="lazy" data-share="idol" />
            <figcaption>神 · hall i · MMXXVI</figcaption>
          </figure>
          <div className="dt-colophon-card dt-tx">
            <span className="dt-obj-label">Object · acc. MMXXVI.01</span>
            <h4>Self-Appointed Deity</h4>
            <dl className="dt-obj-spec">
              <div><dt>Material</dt><dd>plaster, marble, 24k gold leaf</dd></div>
              <div><dt>Edition</dt><dd>1 of 1 · self-cast</dd></div>
              <div><dt>Provenance</dt><dd>hype, unbothered</dd></div>
              <div><dt>Status</dt><dd>comment-immune · 免疫体</dd></div>
            </dl>
            <a href="#" onClick={stop} className="dt-btn">Cast yourself in gold ◆</a>
            <div className="dt-links"><a href="#" onClick={stop}>Pantheon</a><a href="#" onClick={stop}>神</a><a href="#" onClick={stop}>Colophon</a></div>
          </div>
          <div className="dt-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
