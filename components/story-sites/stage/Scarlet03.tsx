"use client";
/* STORY v2 · ПИЛОТ 3 — «SCARLET» / Tokyo Underground (pin 5: oxblood-red нуар-зин, кандзи, гранж).
   Движок StageDeck v2. Сквозная рамка: ЗРИТЕЛЬ = КАМЕРА НАБЛЮДЕНИЯ. Закон камеры — цифровой зум (push):
   обложка (объект взят в рамку) → падает плита-манифест (drop — единственный «физический» стык), на мониторе
   CAM 02 — переулок → цифровой зум: монитор становится кадром (share="alley") → зум в перчатки →
   улика ложится в зин (share="gloves"; зин — бумага, первый светлый кадр) → переключение канала на терминал
   (единственный cut-глитч, кульминация): CAM 01 с её лицом выводится на монитор SHINRA (share="cam01", кольцовка).
   Световая дуга: ночь → неон → бумага зина → красная тревога финала. Фото p03-*. Кандзи/HUD = HTML. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./scarlet03.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Scarlet03() {
  return (
    <div className="sc-site">
      <header className="sc-head">
        <Link href="/story2" className="sc-brand">緋 SCARLET</Link>
        <nav className="sc-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Zone 17</a>
          <a href="#" onClick={stop}>Archive</a>
          <a href="#" onClick={stop} className="sc-cta">求人</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — обложка (кандзи-вордмарк) */}
        <div transition="zoom" className="scene-body sc-cover">
          <div className="sc-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sc-wordmark">
            <span aria-hidden>緋<br />色</span>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.06 }} to={{ y: "0vh", scale: 1 }} className="sc-cover-fig">
            <SceneMedia src={`${A}/p03-hero-cut.png`} alt="SCARLET — портрет, Tokyo underground" />
          </Layer>
          <div className="sc-ret sc-ret-cover" aria-hidden><span>SUBJ 01 · 緋色 · 98%</span></div>
          <div className="sc-orn" aria-hidden>
            <span className="sc-orn-issue">TOKYO UNDERGROUND<br />ISSUE 24 — SPRING 2026</span>
            <span className="sc-orn-jp">未来はここにある。<br />混沌と創造のあいだで。</span>
            <span className="sc-orn-zone">ZONE 17<br />SHIBUYA ▾</span>
            <span className="sc-orn-bar"><b>|| ||| | |||| || | |||</b> T07UG 24 05 17 88</span>
            <span className="sc-orn-seal">神羅</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sc-cover-hi">
            <span className="sc-eyebrow">SHINRA EXECUTIVE · 神羅カンパニー</span>
            <h1><KineticText text="SCARLET" mode="slam" /></h1>
            <p>Красота — оружие. Владычество — искусство. Всё для нового порядка.</p>
          </Layer>
          <div className="sc-grain" aria-hidden />
          <div className="sc-scrollcue" aria-hidden>下へ ▾</div>
        </div>

        {/* 1 · VERTICAL TABLET — кандзи-скрижали падают (drop) */}
        <div transition="drop" className="scene-body sc-tablet">
          <div className="sc-tablet-bg" aria-hidden />
          <Layer z={1} depth={0.08} phase={[0, 1]} from={{ y: "-8vh", opacity: 0.4 }} to={{ y: "0vh", opacity: 1 }} className="sc-tablet-kanji sc-tk-1"><span aria-hidden>神</span></Layer>
          <Layer z={2} depth={0.18} phase={[0.08, 1]} from={{ y: "-12vh", opacity: 0.4 }} to={{ y: "0vh", opacity: 1 }} className="sc-tablet-kanji sc-tk-2"><span aria-hidden>羅</span></Layer>
          <Layer z={3} depth={0.3} phase={[0.16, 1]} from={{ y: "-16vh", opacity: 0.4 }} to={{ y: "0vh", opacity: 1 }} className="sc-tablet-kanji sc-tk-3"><span aria-hidden>力</span></Layer>
          <Layer z={4} depth={0.16} phase={[0.2, 0.9]} from={{ y: "-4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sc-mon">
            <div className="sc-mon-frame">
              <SceneMedia src={`${A}/p03-portrait-b.jpg`} alt="CAM 02 — переулок Shibuya, она на скамье" share="alley" />
              <span className="sc-mon-scan" aria-hidden />
              <span className="sc-mon-tag" aria-hidden>● CAM 02 · ZONE 17 · 渋谷</span>
              <span className="sc-mon-time" aria-hidden>00:17:22</span>
            </div>
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="sc-tablet-cap">
            <span className="sc-folio">ファイル 01 — 綱領 / манифест</span>
            <h2>Порядок<br /><em>из хаоса.</em></h2>
            <p>Мы не украшаем мир — мы переписываем его. Каждая линия — приказ. Каждый кадр — доказательство власти.</p>
            <ul className="sc-facts"><li><b>17</b><span>зон под контролем</span></li><li><b>神羅</b><span>корпорация</span></li><li><b>A</b><span>класс допуска</span></li></ul>
          </Layer>
          <div className="sc-grain" aria-hidden />
        </div>

        {/* 2 · TUNNEL — цифровой зум: кадр CAM 02 с монитора раскрывается на весь экран (share="alley") */}
        <div transition="push" className="scene-body sc-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1.02 }} className="sc-tunnel-fig kb-media">
            <SceneMedia src={`${A}/p03-portrait-b.jpg`} alt="SCARLET — ночной портрет на улице" share="alley" />
          </Layer>
          <div className="sc-tunnel-veil" aria-hidden />
          <div className="sc-ret sc-ret-alley" aria-hidden><span>SUBJ 01 · TRACK · 12 m</span></div>
          <div className="sc-cam" aria-hidden><span>◤ CAM 02 · DIGITAL ×4</span><span>● REC 00:17:23</span></div>
          <div className="sc-tunnel-huge" aria-hidden>未来</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="sc-tunnel-cap">
            <span className="sc-folio">ZONE 17 · 渋谷</span>
            <p>Будущее уже здесь — между неоном и бетоном. В новом порядке красота спрашивает: куда ты идёшь?</p>
            <span className="sc-meta">未来はここにある · IN THE NEW ORDER</span>
          </Layer>
          <div className="sc-grain" aria-hidden />
        </div>

        {/* 3 · SURVEILLANCE — кадр во весь экран + HUD-скобки/сканлайны (слом клон-макро) */}
        <div transition="push" className="scene-body sc-surv">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12 }} to={{ scale: 1.02 }} className="sc-surv-fig kb-media">
            <SceneMedia src={`${A}/p03-still-1.jpg`} alt="Кадр — руки в перчатках, деталь" share="gloves" />
          </Layer>
          <div className="sc-surv-veil" aria-hidden />
          <div className="sc-surv-hud" aria-hidden>
            <span className="sc-hud-c sc-hud-tl">◤ CAM 01</span>
            <span className="sc-hud-c sc-hud-tr">ISO 800 · 35mm ◥</span>
            <span className="sc-hud-c sc-hud-bl">◣ ● REC 00:17:24</span>
            <span className="sc-hud-c sc-hud-br">f/1.4 ◢</span>
            <span className="sc-hud-cross">+</span>
          </div>
          <div className="sc-ret sc-ret-gloves" aria-hidden><span>EVIDENCE 01 · LEATHER · NO PRINTS</span></div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sc-surv-cap">
            <span className="sc-folio">証拠 01 — evidence</span>
            <h3>Перчатки без следов</h3>
            <p>Ничего лишнего. Каждая деталь под контролем — как и весь Shibuya после полуночи.</p>
          </Layer>
          <div className="sc-scan" aria-hidden />
          <div className="sc-grain" aria-hidden />
        </div>

        {/* 4 · ZINE — рваная masonry-сетка разнокалиберных кадров + кандзи (не равная сетка) */}
        <div transition="fade" className="scene-body sc-zine">
          <div className="sc-zine-bg" aria-hidden />
          <div className="sc-zine-head" aria-hidden><b>TOKYO UNDERGROUND</b><span>綴 · archive no.24</span></div>
          <div className="sc-zine-grid">
            <figure className="sc-z sc-z-a"><img src={`${A}/p03-hero.jpg`} alt="SCARLET — обложка" loading="lazy" data-share="cam01" /><figcaption>CAM 01 · 35mm</figcaption></figure>
            <figure className="sc-z sc-z-b"><img src={`${A}/p03-portrait-b.jpg`} alt="Ночной кадр" loading="lazy" /><figcaption>CAM 02 · street</figcaption></figure>
            <div className="sc-z-kanji" aria-hidden><span>緋</span><span>色</span></div>
            <figure className="sc-z sc-z-c"><img src={`${A}/p03-still-2.jpg`} alt="Полароид у стены" loading="lazy" /><figcaption>CAM 03 · wall</figcaption></figure>
            <figure className="sc-z sc-z-d"><img src={`${A}/p03-still-1.jpg`} alt="Деталь" loading="lazy" data-share="gloves" /><figcaption>CAM 04 · evidence 01</figcaption></figure>
          </div>
          <div className="sc-zine-code" aria-hidden>広告募集 · 03-5412-XXXX · www.tokyounderground.jp</div>
          <div className="sc-grain" aria-hidden />
        </div>

        {/* 5 · TERMINAL — системный boot-лог, левая ось (не центр-слоган+кнопка) */}
        <div transition="cut" className="scene-body sc-term">
          <div className="sc-term-bg" aria-hidden />
          <div className="sc-term-jp" aria-hidden>神羅</div>
          <figure className="sc-term-mon">
            <img src={`${A}/p03-hero.jpg`} alt="CAM 01 — SCARLET на мониторе терминала" loading="lazy" data-share="cam01" />
            <span className="sc-mon-scan" aria-hidden />
            <figcaption aria-hidden><span>● LIVE · CAM 01</span><span>SUBJ 01 · 緋色 · MATCH 98%</span></figcaption>
          </figure>
          <div className="sc-term-panel">
            <div className="sc-term-log" aria-hidden>
              <span>&gt; SHINRA_OS · 神羅カンパニー</span>
              <span>&gt; loading new order ............ [OK]</span>
              <span>&gt; beauty.exe ................... armed</span>
            </div>
            <h4>Beauty is <span className="sc-term-red">a weapon.</span></h4>
            <p className="sc-term-sub">Красота — оружие. Владычество — искусство. Всё для нового порядка.</p>
            <div className="sc-term-cta">
              <a href="#" onClick={stop} className="sc-btn">&gt; 神羅に入る ↗</a>
              <div className="sc-links"><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>X / 東京</a><a href="#" onClick={stop}>03-5412-XXXX</a></div>
            </div>
          </div>
          <div className="sc-scan" aria-hidden />
          <div className="sc-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
