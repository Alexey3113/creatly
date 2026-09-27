"use client";
/* STORY v2 · САЙТ 9 — «SALT» (pin9: burnt-orange/grey occult art-poster, блайндфолд+терн-нимб, «I turned»).
   Сквозная архитектура (аудит 2026-09): ОДИН закон камеры — наезд на ту же статую.
   S1→S2 push + share «statue»: та же вырезка в боксах натуральной пропорции → чистый наезд фигура→лик.
   S2→S3 fade-УДЕРЖАНИЕ: камера почти стоит, статуя кристаллизуется в соль (ручная синхронизация --ep/--sp).
   S3→S4 push в шипы. S4→S5 fade + share «thorn»: реликвия ложится в реликварий.
   S5→S6 кольцо: камера впервые отъезжает назад («I turned») — соляная статуя в полный рост, как на обложке. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./salt09.css";

const A = "/uploads/1/story2";
const CUT = `${A}/salt-hero-cut-soft.png`; // та же вырезка, нижние углы растворены в альфе (маска не едет с «призраком»)
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
        <div transition="push" className="scene-body sl-cover">
          <div className="sl-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-wordmark"><span aria-hidden>SALT</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="sl-cover-fig">
            <SceneMedia src={CUT} alt="SALT — фигура с повязкой и терновым нимбом" share="statue" />
          </Layer>
          <div className="sl-orn" aria-hidden>
            <span className="sl-orn-ref">GENESIS 19:26</span>
            <span className="sl-orn-tr">I TURNED —<br />but wouldn't you?</span>
            <span className="sl-orn-lm">my feet obeyed.<br />my soul did not.</span>
            <span className="sl-orn-sym">✝ ✦ ◈ ⚕</span>
            <span className="sl-orn-bar">OSY XI · pillar of salt · 00.19.26</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-cover-hi sl-tx">
            <span className="sl-eyebrow">discover · a woman between mercy and memory</span>
            <h1>I turned.</h1>
            <p>Мои ноги подчинились. Душа — нет. Один взгляд назад — не грех, а скорбь по тому, что было домом.</p>
          </Layer>
          <div className="sl-grain" aria-hidden />
          <div className="sl-scrollcue" aria-hidden>look back ↓</div>
        </div>

        {/* 1 · THE GLANCE — камера наехала на лик; слово стоит ЗА статуей (как призрак — всегда поверх) */}
        <div transition="push" className="scene-body sl-glance">
          <div className="sl-glance-bg" aria-hidden />
          <div className="sl-glance-type sl-tx" aria-hidden><span>PILLAR</span><span className="sl-glance-out">OF SALT</span></div>
          <Layer z={3} depth={0} phase={[0, 1]} className="sl-statue sl-statue-warm">
            <SceneMedia src={CUT} alt="SALT — лик под терновым нимбом" share="statue" />
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.35, 0.9]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-glance-cap sl-tx">
            <div className="sl-glance-txt">
              <span className="sl-folio">verse 01 · the glance</span>
              <p>«Жена Лотова оглянулась позади его — и стала соляным столпом». В миг между милостью и памятью время застыло.</p>
            </div>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 2 · SALT — удержание: та же рамка, материя меняется (тёплый мрамор → белая соль), камера ползёт к лику */}
        <div transition="fade" className="scene-body sl-salt">
          <div className="sl-salt-bg" aria-hidden />
          <div className="sl-salt-huge" aria-hidden>SALT</div>
          <Layer z={3} depth={0} phase={[0, 1]} className="sl-statue sl-statue-salt">
            <SceneMedia src={CUT} alt="SALT — статуя, застывшая солью" />
            <span className="sl-crust" aria-hidden />
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.4, 0.95]} from={{ opacity: 0, y: "2vh" }} to={{ opacity: 1, y: "0vh" }} className="sl-salt-cap sl-tx">
            <span className="sl-folio">not for sin · but for sorrow</span>
            <p>Соль — не наказание, а слёзы, застывшие навсегда. Женщина, что вечно смотрит назад на мир, что когда-то держал её.</p>
            <span className="sl-meta">forever looking back</span>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 3 · RELIC — push в шипы: кадр прижат к низу во всю ширину, подпись сверху */}
        <div transition="push" className="scene-body sl-relic">
          <div className="sl-relic-bg" aria-hidden />
          <div className="sl-relic-huge" aria-hidden>✝</div>
          <Layer z={6} depth={0.2} phase={[0.3, 0.9]} from={{ y: "-3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sl-relic-cap sl-tx">
            <span className="sl-folio">relic · thorn halo</span>
            <h3>Thorn halo</h3>
            <p>Терновый ореол над повязкой — святость, что достаётся болью. Ослеплённая, но видящая больше, чем зрячие.</p>
          </Layer>
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ y: "6vh", scale: 1.08 }} to={{ y: "0vh", scale: 1 }} className="sl-relic-band">
            <SceneMedia src={`${A}/salt-still-1.jpg`} alt="Терновый нимб и повязка — деталь" share="thorn" />
            <span className="sl-relic-marks" aria-hidden>thorn · bandage · exhibit 01</span>
          </Layer>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 4 · RELIQUARY — веер; кадр реликвии перелетает в свою пластину iii (fade + share) */}
        <div transition="fade" className="scene-body sl-cascade">
          <div className="sl-cascade-bg" aria-hidden />
          <div className="sl-cascade-head sl-tx" aria-hidden><b>Reliquary</b><span>osy xi · pillar of salt</span></div>
          <div className="sl-cascade-stack">
            <figure className="sl-plate sl-plate-1"><img src={`${A}/salt-extra-3.jpg`} alt="Образ" loading="lazy" /><figcaption>i · glance</figcaption></figure>
            <figure className="sl-plate sl-plate-2"><img src={`${A}/salt-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · turned</figcaption></figure>
            <figure className="sl-plate sl-plate-3"><img src={`${A}/salt-still-1.jpg`} alt="Терновый нимб — реликвия" loading="lazy" data-share="thorn" /><figcaption>iii · thorn</figcaption></figure>
            <figure className="sl-plate sl-plate-4"><img src={`${A}/salt-still-2.jpg`} alt="Ткань" loading="lazy" /><figcaption>iv · shroud</figcaption></figure>
          </div>
          <div className="sl-cascade-code" aria-hidden>a woman caught between mercy and memory</div>
          <div className="sl-grain" aria-hidden />
        </div>

        {/* 5 · LETTER — кольцо: камера отъезжает от нимба к соляной статуе в полный рост, за ней горит дом */}
        <div transition="fade" className="scene-body sl-letter">
          <div className="sl-letter-bg" aria-hidden />
          <div className="sl-letter-word" aria-hidden>SALT</div>
          <Layer z={3} depth={0.06} phase={[0, 1]} from={{ scale: 2.7, y: "12vh" }} to={{ scale: 1, y: "0vh" }} className="sl-letter-fig">
            <SceneMedia src={CUT} alt="Соляной столп — она обернулась" />
          </Layer>
          <Layer z={6} depth={0.16} phase={[0.45, 1]} from={{ x: "-2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sl-letter-layer sl-tx">
            <div className="sl-letter-block">
              <span className="sl-letter-verse">Genesis 19:26</span>
              <p className="sl-letter-body">Они говорят, я обернулась. Да, я посмотрела назад. Мой дом горел — но горело и сердце. И я не жалею: там осталось всё, чем я была.</p>
              <span className="sl-letter-sign">— I turned.</span>
              <a href="#" onClick={stop} className="sl-letter-link">Look back with me →</a>
            </div>
          </Layer>
          <div className="sl-letter-meta" aria-hidden>SALT · they say I turned · a woman between mercy and memory</div>
          <div className="sl-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
