"use client";
/* STORY v2 · САЙТ 8 — «SERAPH» (pin8: rose-pink ангел-воин, серебр.корона-нимб+бело-красн.крылья).
   СВЕТЛО-РОЗОВЫЙ (контраст тёмным). Движок StageDeck v2. Закон камеры — ВОЗНЕСЕНИЕ (drop: мир уходит
   вниз, камера поднимается). Сюжет: нимб за её плечами становится диафрагмой iris и раскрывается в
   «Crown of light» — вспышку, контрапункт пастели (share="halo") → подъём к рассвету «Wings of dawn» →
   рассвет сжимается в спутник-кадр рядом с серебряным нимбом (share="dawn") → подъём в лукбук → её арка
   из лукбука встаёт в финал под нимбом (share="rise", кольцовка). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./seraph08.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Seraph08() {
  return (
    <div className="sf-site">
      <header className="sf-head">
        <Link href="/story2" className="sf-brand">SERAPH</Link>
        <nav className="sf-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Wings</a>
          <a href="#" onClick={stop}>Halo</a>
          <a href="#" onClick={stop} className="sf-cta">Ascend</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="iris" className="scene-body sf-cover">
          <div className="sf-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sf-wordmark"><span aria-hidden>SERAPH</span></Layer>
          <div className="sf-cover-halo" aria-hidden />
          <div className="sf-ring sf-ring-a" data-share="halo" aria-hidden />
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="sf-cover-fig">
            <SceneMedia src={`${A}/seraph-hero-cut.png`} alt="Seraph — ангел-воин" />
          </Layer>
          <div className="sf-orn" aria-hidden>
            <span className="sf-orn-tl">confident<br />unapologetic<br />divine</span>
            <span className="sf-orn-tr">✦ halo · vii<br />wings · red</span>
            <span className="sf-orn-star">✦</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sf-cover-hi">
            <span className="sf-eyebrow">angel warrior · picturesque</span>
            <h1>Seraph</h1>
            <p>Платиновый свет, терновый нимб и крылья цвета зари. Красота как сила — уверенная и непреклонная.</p>
          </Layer>
          <div className="sf-grain" aria-hidden />
          <div className="sf-scrollcue" aria-hidden>ascend ↓</div>
        </div>

        {/* 1 · RITUAL HALO — iris из нимба; «Crown of light» — вспышка белого света (share="halo") */}
        <div transition="iris" className="scene-body sf-halo">
          <div className="sf-halo-bg" aria-hidden />
          <div className="sf-halo-ring" aria-hidden />
          <div className="sf-ring sf-ring-b" data-share="halo" aria-hidden />
          <Layer z={2} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1.02 }} className="sf-halo-fig kb-media">
            <SceneMedia src={`${A}/seraph-portrait-b.jpg`} alt="Seraph — с мечом" />
          </Layer>
          <div className="sf-halo-flash" aria-hidden />
          <div className="sf-halo-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.08, 0.7]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="sf-halo-cap">
            <span className="sf-folio">verse I · the halo</span>
            <h2>Crown of <em>light</em></h2>
            <p>Нимб — не украшение, а корона воли. Меч в руке — обещание, что нежность умеет защищаться.</p>
          </Layer>
          <div className="sf-grain" aria-hidden />
        </div>

        {/* 2 · SIDECAR — wings of dawn: камера поднимается к рассвету (drop = вознесение) */}
        <div transition="drop" className="scene-body sf-side">
          <div className="sf-side-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0.02, 0.9]} from={{ y: "-5vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sf-side-fig">
            <SceneMedia src={`${A}/seraph-still-2.jpg`} alt="Ангел с раскрытыми крыльями на рассвете" share="dawn" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="sf-side-cap">
            <span className="sf-num">02</span>
            <h2>Wings of<br /><em>dawn</em></h2>
            <span className="sf-folio">white · red · feather</span>
            <p>Перья ловят розовый свет зари. Белое переходит в алое — как рассвет, что помнит закат.</p>
          </Layer>
          <div className="sf-side-orn" aria-hidden>✦ &nbsp; white to red &nbsp; ✦</div>
          <div className="sf-grain" aria-hidden />
        </div>

        {/* 3 · STUDY — центральная деталь + спутники-микрокадры по периметру (слом клон-макро) */}
        <div transition="fade" className="scene-body sf-study">
          <div className="sf-study-bg" aria-hidden />
          <div className="sf-study-huge" aria-hidden>✦</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.08, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sf-study-main">
            <SceneMedia src={`${A}/seraph-still-1.jpg`} alt="Серебряная корона-нимб — деталь" />
          </Layer>
          <div className="sf-study-sats" aria-hidden>
            <figure className="sf-sat sf-sat-1"><img src={`${A}/seraph-still-2.jpg`} alt="" loading="lazy" data-share="dawn" /><figcaption>dawn</figcaption></figure>
            <figure className="sf-sat sf-sat-2"><img src={`${A}/seraph-extra-2.jpg`} alt="" loading="lazy" /><figcaption>light</figcaption></figure>
          </div>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sf-study-cap">
            <span className="sf-folio">object · halo · specimen 01</span>
            <h3>Silver halo</h3>
            <p>Шипы из серебра и жемчуга — ореол, что коронует, а не смиряет. Каждая грань ловит свет.</p>
          </Layer>
          <div className="sf-grain" aria-hidden />
        </div>

        {/* 4 · EDITORIAL — воздушный журнальный разворот на светлом (не сетка) */}
        <div transition="drop" className="scene-body sf-edit">
          <div className="sf-edit-bg" aria-hidden />
          <div className="sf-edit-head" aria-hidden><b>Lookbook</b><span>seraph · the ascension</span></div>
          <figure className="sf-e sf-e-hero"><img src={`${A}/seraph-extra-3.jpg`} alt="Образ" loading="lazy" data-share="rise" /><figcaption>i · rise</figcaption></figure>
          <div className="sf-edit-quote"><b>Confident. Unapologetic. Divine.</b><span>— the ascension</span></div>
          <figure className="sf-e sf-e-2"><img src={`${A}/seraph-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · dawn</figcaption></figure>
          <figure className="sf-e sf-e-3"><img src={`${A}/seraph-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>iii · light</figcaption></figure>
          <figure className="sf-e sf-e-4"><img src={`${A}/seraph-extra-4.jpg`} alt="Крыло" loading="lazy" /><figcaption>iv · feather</figcaption></figure>
          <div className="sf-grain" aria-hidden />
        </div>

        {/* 5 · INDEX — её арка из лукбука встаёт под нимб (share="rise", кольцовка с обложкой) */}
        <div transition="fade" className="scene-body sf-index">
          <div className="sf-index-bg" aria-hidden />
          <div className="sf-index-halo" aria-hidden />
          <div className="sf-ring sf-ring-c" aria-hidden />
          <figure className="sf-index-arch"><img src={`${A}/seraph-extra-3.jpg`} alt="Seraph — вознесение" loading="lazy" data-share="rise" /></figure>
          <div className="sf-index-block">
            <span className="sf-index-label">the ascension · contents</span>
            <ol className="sf-index-list">
              <li><span className="sf-idx-n">I</span><span className="sf-idx-t">Wings of dawn</span></li>
              <li><span className="sf-idx-n">II</span><span className="sf-idx-t">Silver halo</span></li>
              <li><span className="sf-idx-n">III</span><span className="sf-idx-t">Spread your wings</span></li>
            </ol>
            <div className="sf-index-cta">
              <a href="#" onClick={stop} className="sf-btn">Ascend ✦</a>
              <div className="sf-links"><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>@seraph</a><a href="#" onClick={stop}>Halo</a></div>
            </div>
          </div>
          <div className="sf-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
