"use client";
/* STORY v2 · САЙТ 15 — «ALEXANDER» (pin16: teal/cream/red историч-эпик, воин на коне+красный плащ).
   Сквозная архитектура (аудит 2026-09): закон камеры — МАРШ (ax-march: боковая проводка, слои с горизонтальным
   параллаксом по глубине). Шлем — реликвия через весь сайт: вставка в S2 → push во весь кадр S3 (share «helmet»)
   → последний кадр фриза «Babylon» → пустой шлем на эпитафии рядом с бледным всадником (share «helmet», кольцо).
   Походы S5 — одна горизонтальная проводка: фриз въезжает по --sp и дотягивается по --ep. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./alexander16.css";

const A = "/uploads/1/story2";
const HELM = `${A}/alexander-still-1.jpg`;
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Alexander16() {
  return (
    <div className="ax-site">
      <header className="ax-head">
        <Link href="/story2" className="ax-brand">A · THE GREAT</Link>
        <nav className="ax-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Legend</a>
          <a href="#" onClick={stop}>Empire</a>
          <a href="#" onClick={stop} className="ax-cta">Conquer</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · COVER — вордмарк над всадником (кончик меча лишь касается букв), всадник открыт */}
        <div transition="ax-march" className="scene-body ax-cover">
          <div className="ax-cover-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="ax-cover-fig kb-media">
            <SceneMedia src={`${A}/alexander-hero.jpg`} alt="Александр на коне с мечом" />
          </Layer>
          <div className="ax-cover-veil" aria-hidden />
          <Layer z={4} depth={0.3} phase={[0, 0.9]} from={{ opacity: 0, y: "-2vh" }} to={{ opacity: 1, y: "0vh" }} className="ax-wordmark ax-tx"><h1>ALEXANDER</h1></Layer>
          <div className="ax-orn" aria-hidden>
            <span className="ax-orn-sup">the great</span>
            <span className="ax-orn-l">356 BC</span>
            <span className="ax-orn-r">323 BC</span>
            <span className="ax-orn-cross">✦</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ax-cover-hi ax-tx">
            <span className="ax-eyebrow">a visionary conqueror · legacy beyond empires</span>
            <p>Он объединил народы стратегией, отвагой и жаждой величия. Больше, чем воин — символ лидерства, что переживает века.</p>
          </Layer>
          <div className="ax-grain" aria-hidden />
          <div className="ax-scrollcue" aria-hidden>march ↓</div>
        </div>

        {/* 1 · THE GREAT — марш вбок; в углу реликвия-шлем (с него начнётся наезд) */}
        <div transition="ax-march" className="scene-body ax-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1.02 }} className="ax-guillo-fig">
            <SceneMedia src={`${A}/alexander-portrait-b.jpg`} alt="Александр — восхождение" />
          </Layer>
          <div className="ax-guillo-veil" aria-hidden />
          <div className="ax-guillo-type ax-tx" aria-hidden><span>THE</span><span className="ax-guillo-out">GREAT</span></div>
          <figure className="ax-helm-inset">
            <img src={HELM} alt="Шлем Александра — реликвия" loading="lazy" data-share="helmet" />
            <figcaption>relic · the helmet</figcaption>
          </figure>
          <Layer z={6} depth={0.24} phase={[0.4, 0.95]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ax-guillo-cap ax-tx">
            <span className="ax-folio">rising to power</span>
            <p>В юном возрасте он поднялся к власти. Ни одна карта не вмещала его амбиций — он чертил новую, пока мир не стал его.</p>
          </Layer>
          <div className="ax-grain" aria-hidden />
        </div>

        {/* 2 · THE HELMET — камера входит в реликвию: шлем во весь кадр (push + share) */}
        <div transition="push" className="scene-body ax-tunnel">
          <Layer z={1} depth={0} phase={[0, 1]} className="ax-tunnel-fig">
            <SceneMedia src={HELM} alt="Шлем и меч — деталь" share="helmet" />
          </Layer>
          <div className="ax-tunnel-veil" aria-hidden />
          <div className="ax-tunnel-huge ax-tx" aria-hidden>ΝΙΚΗ</div>
          <Layer z={6} depth={0.24} phase={[0.45, 0.95]} from={{ opacity: 0, y: "2vh" }} to={{ opacity: 1, y: "0vh" }} className="ax-tunnel-cap ax-tx">
            <span className="ax-folio">the relentless drive</span>
            <p>Бронза, что помнит битвы. Меч, что чертил границы. Победа — не удача, а неумолимая воля к величию.</p>
            <span className="ax-meta">a symbol of leadership</span>
          </Layer>
          <div className="ax-grain" aria-hidden />
        </div>

        {/* 3 · THE PURPLE — багряный плащ во весь кадр (не дым), хедер на скриме */}
        <div transition="ax-march" className="scene-body ax-relic">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="ax-relic-fig">
            <SceneMedia src={`${A}/alexander-extra-2.jpg`} alt="Багряный плащ и золотая броня" />
          </Layer>
          <div className="ax-relic-veil" aria-hidden />
          <div className="ax-relic-huge" aria-hidden>✦</div>
          <Layer z={6} depth={0.22} phase={[0.45, 0.95]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ax-relic-cap ax-tx">
            <span className="ax-folio">relic · the purple cape</span>
            <h3>The purple</h3>
            <p>Багряный плащ — цвет царей и крови, пролитой за империю. Бронза и пурпур: доспех того, кто не знал границ.</p>
            <div className="ax-relic-marks"><span>bronze</span><span>·</span><span>royal blood</span><span>·</span><span>✦ empire</span></div>
          </Layer>
          <div className="ax-grain" aria-hidden />
        </div>

        {/* 4 · CAMPAIGN FRIEZE — одна горизонтальная проводка камеры по фризу (въезд по --sp, дотяжка по --ep) */}
        <div transition="ax-march" className="scene-body ax-frieze">
          <div className="ax-frieze-bg" aria-hidden />
          <div className="ax-frieze-head ax-tx" aria-hidden><b>The Campaigns</b><span>a march that redrew the world</span></div>
          <div className="ax-frieze-band">
            <figure className="ax-frame ax-frame-1"><img src={`${A}/alexander-extra-3.jpg`} alt="Восхождение" loading="lazy" /><figcaption><b>Rise</b><span>356 BC · Pella</span></figcaption></figure>
            <figure className="ax-frame ax-frame-2"><img src={`${A}/alexander-extra-1.jpg`} alt="Марш" loading="lazy" /><figcaption><b>March</b><span>334 BC · Granicus</span></figcaption></figure>
            <figure className="ax-frame ax-frame-3"><img src={`${A}/alexander-still-2.jpg`} alt="Битва в дыму" loading="lazy" /><figcaption><b>Clash</b><span>331 BC · Gaugamela</span></figcaption></figure>
            <figure className="ax-frame ax-frame-4"><img src={`${A}/alexander-extra-4.jpg`} alt="Империя" loading="lazy" /><figcaption><b>Empire</b><span>326 BC · Hydaspes</span></figcaption></figure>
            <figure className="ax-frame ax-frame-5"><img src={HELM} alt="Шлем, оставленный в Вавилоне" loading="lazy" data-share="helmet" /><figcaption><b>Babylon</b><span>323 BC · the end</span></figcaption></figure>
          </div>
          <div className="ax-frieze-axis" aria-hidden><i /><i /><i /><i /><i /><span className="ax-frieze-code">356 → 323 BC · a legacy beyond empires</span></div>
          <div className="ax-grain" aria-hidden />
        </div>

        {/* 5 · EPITAPH — кольцо: всадник обложки проступает фоном, перед ним пустой шлем */}
        <div transition="fade" className="scene-body ax-epitaph">
          <Layer z={0} depth={0.3} phase={[0, 1]} from={{ scale: 1.08, opacity: 0.5 }} to={{ scale: 1.02, opacity: 0.85 }} className="ax-epitaph-fig">
            <SceneMedia src={`${A}/alexander-hero.jpg`} alt="" />
          </Layer>
          <div className="ax-epitaph-veil" aria-hidden />
          <figure className="ax-epitaph-helm"><img src={HELM} alt="Пустой шлем — эпитафия" loading="lazy" data-share="helmet" /></figure>
          <div className="ax-epitaph-block">
            <span className="ax-epitaph-gr" aria-hidden>ΝΙΚΗ</span>
            <h4>The empire outlived its king</h4>
            <p>323 BC — он умер в тридцать два, оставив мир, что не удержал никто. Легенда не в границах империи, а в том, что однажды их не было.</p>
            <a href="#" onClick={stop} className="ax-epitaph-link">Begin your conquest →</a>
          </div>
          <div className="ax-epitaph-meta" aria-hidden>ALEXANDER III OF MACEDON · 356—323 BC · a legacy beyond empires</div>
          <div className="ax-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
