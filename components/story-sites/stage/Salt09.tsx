"use client";
/* STORY v2 · САЙТ 9 — «SALT» (pin9: burnt-orange/grey occult art-poster, блайндфолд+терн-нимб, «I turned»).
   Архетипы (де-шаблонизировано): Occluded Idol → Type Guillotine → Tunnel Zoom → Relic(низ-band,wipe-y) → Cascade(веер) → Letter(исповедь). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./salt09.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Salt09() {
  return (
    <div className="sl-site">
      <header className="sl-head">
        <Link href="/story2" className="sl-brand">SALT</Link>
        <nav className="sl-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Genesis</a>
          <a href="#" onClick={stop}>Pillar</a>
          <a href="#" onClick={stop} className="sl-cta">Look back</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="wipe-y" className="scene-body sl-cover">
          <div className="sl-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-wordmark"><span aria-hidden>SALT</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="sl-cover-fig">
            <SceneMedia src={`${A}/salt-hero-cut.png`} alt="SALT — фигура с повязкой и терновым нимбом" />
          </Layer>
          <div className="sl-orn" aria-hidden>
            <span className="sl-orn-ref">GENESIS 19:26</span>
            <span className="sl-orn-tr">I TURNED —<br />but wouldn't you?</span>
            <span className="sl-orn-lm">my feet obeyed.<br />my soul did not.</span>
            <span className="sl-orn-sym">✝ ✦ ◈ ⚕</span>
            <span className="sl-orn-bar">OSY XI · pillar of salt · 00.19.26</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-cover-hi">
            <span className="sl-eyebrow">discover · a woman between mercy and memory</span>
            <h1>I turned.</h1>
            <p>Мои ноги подчинились. Душа — нет. Один взгляд назад — не грех, а скорбь по тому, что было домом.</p>
          </Layer>
          <div className="sl-grain" aria-hidden />
          <div className="sl-scrollcue" aria-hidden>look back ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE */}
        <div transition="drop" className="scene-body sl-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="sl-guillo-fig kb-media">
            <SceneMedia src={`${A}/salt-portrait-b.jpg`} alt="SALT — взгляд вверх" />
          </Layer>
          <div className="sl-guillo-veil" aria-hidden />
          <div className="sl-guillo-type" aria-hidden><span>PILLAR</span><span className="sl-guillo-out">OF SALT</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-guillo-cap">
            <span className="sl-folio">verse 01 · the glance</span>
            <p>«Жена Лотова оглянулась позади его — и стала соляным столпом». В миг между милостью и памятью время застыло.</p>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 2 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body sl-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.2 }} to={{ scale: 1.02 }} className="sl-tunnel-fig kb-media">
            <SceneMedia src={`${A}/salt-hero.jpg`} alt="SALT — крупно" />
          </Layer>
          <div className="sl-tunnel-veil" aria-hidden />
          <div className="sl-tunnel-huge" aria-hidden>SALT</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="sl-tunnel-cap">
            <span className="sl-folio">not for sin · but for sorrow</span>
            <p>Соль — не наказание, а слёзы, застывшие навсегда. Женщина, что вечно смотрит назад на мир, что когда-то держал её.</p>
            <span className="sl-meta">forever looking back</span>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 3 · RELIC — кадр прижат к НИЗУ во всю ширину, подпись сверху (слом клон-макро) */}
        <div transition="wipe-y" className="scene-body sl-relic">
          <div className="sl-relic-bg" aria-hidden />
          <div className="sl-relic-huge" aria-hidden>✝</div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.7]} from={{ y: "-3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-relic-cap">
            <span className="sl-folio">relic · thorn halo</span>
            <h3>Thorn halo</h3>
            <p>Терновый ореол над повязкой — святость, что достаётся болью. Ослеплённая, но видящая больше, чем зрячие.</p>
          </Layer>
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ y: "6vh", scale: 1.08 }} to={{ y: "0vh", scale: 1.02 }} className="sl-relic-band kb-media">
            <SceneMedia src={`${A}/salt-still-1.jpg`} alt="Терновый нимб и повязка — деталь" />
            <span className="sl-relic-marks" aria-hidden>thorn · bandage · exhibit 01</span>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 4 · CASCADE — диагональный веер снимков (не сетка) */}
        <div transition="drop" className="scene-body sl-cascade">
          <div className="sl-cascade-bg" aria-hidden />
          <div className="sl-cascade-head" aria-hidden><b>Reliquary</b><span>osy xi · pillar of salt</span></div>
          <div className="sl-cascade-stack">
            <figure className="sl-plate sl-plate-1"><img src={`${A}/salt-extra-3.jpg`} alt="Образ" loading="lazy" /><figcaption>i · glance</figcaption></figure>
            <figure className="sl-plate sl-plate-2"><img src={`${A}/salt-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · turned</figcaption></figure>
            <figure className="sl-plate sl-plate-3"><img src={`${A}/salt-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>iii · thorn</figcaption></figure>
            <figure className="sl-plate sl-plate-4"><img src={`${A}/salt-still-2.jpg`} alt="Ткань" loading="lazy" /><figcaption>iv · shroud</figcaption></figure>
          </div>
          <div className="sl-cascade-code" aria-hidden>a woman caught between mercy and memory</div>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 5 · LETTER — исповедь от первого лица с подписью (не центр-слоган+кнопка) */}
        <div transition="wipe-y" className="scene-body sl-letter">
          <div className="sl-letter-bg" aria-hidden />
          <div className="sl-letter-block">
            <span className="sl-letter-verse" aria-hidden>Genesis 19:26</span>
            <p className="sl-letter-body">Они говорят, я обернулась. Да, я посмотрела назад. Мой дом горел — но горело и сердце. И я не жалею: там осталось всё, чем я была.</p>
            <span className="sl-letter-sign">— I turned.</span>
            <a href="#" onClick={stop} className="sl-letter-link">Look back with me →</a>
          </div>
          <div className="sl-letter-meta" aria-hidden>SALT · they say I turned · a woman between mercy and memory</div>
          <div className="sl-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
