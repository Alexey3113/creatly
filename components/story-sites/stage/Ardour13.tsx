"use client";
/* STORY v2 · САЙТ 20 — «ARDOUR» (pin13: bone/grey halftone-зин + красный blackletter-вордмарк,
   монахиня + терн-нимб + красный крест, 執意). ЕДИНСТВЕННЫЙ светлый сайт из 20.
   Архетипы: Poster Idol → Tunnel Zoom → Macro Cross → Type Guillotine → Contact Wall → Final(drop). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./ardour13.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Ardour13() {
  return (
    <div className="ar-site">
      <header className="ar-head">
        <Link href="/story2" className="ar-brand">執意 · ARDOUR</Link>
        <nav className="ar-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Passion</a>
          <a href="#" onClick={stop}>Devotion</a>
          <a href="#" onClick={stop} className="ar-cta">Poster 33</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · POSTER IDOL */}
        <div transition="cut" className="scene-body ar-cover">
          <div className="ar-cover-bg" aria-hidden />
          <div className="ar-frame" aria-hidden />
          <div className="ar-corner ar-corner-tl" aria-hidden><b>執意</b><span>▟▟▟▟</span></div>
          <div className="ar-corner ar-corner-tr" aria-hidden>POSTER<br />33<br />EI.STDIO</div>
          <Layer z={2} depth={0.06} phase={[0, 0.9]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ar-wordmark"><span aria-hidden>Ardour</span></Layer>
          <Layer z={3} depth={0.14} phase={[0, 0.9]} from={{ y: "3vh", scale: 1.03 }} to={{ y: "0vh", scale: 1 }} className="ar-cover-fig">
            <SceneMedia src={`${A}/ardour-hero-cut.png`} alt="Монахиня — терн-нимб, красный крест" />
          </Layer>
          <div className="ar-beams" aria-hidden><i /><i /><i /></div>
          <Layer z={6} depth={0.28} phase={[0.08, 0.7]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ar-cover-hi">
            <p className="ar-blurb">It is the unrelenting passion that consumes and refines — ardour is not just enthusiasm, it is the existential hunger that burns the sacred lover to the surrender of purpose.</p>
          </Layer>
          <div className="ar-rating" aria-hidden><b>R</b><span>RESTRICTED · violence, sacred imagery, brief bone</span></div>
          <div className="ar-globe" aria-hidden>◍</div>
          <div className="ar-halftone" aria-hidden />
          <div className="ar-scrollcue" aria-hidden>burn ↓</div>
        </div>

        {/* 1 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body ar-tunnel">
          <div className="ar-tunnel-bg" aria-hidden />
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.18 }} to={{ scale: 1.02 }} className="ar-tunnel-fig kb-media">
            <SceneMedia src={`${A}/ardour-portrait-b.jpg`} alt="Монахиня — крупно, терн-нимб" />
          </Layer>
          <div className="ar-tunnel-huge" aria-hidden>†</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.08 }} to={{ opacity: 1, scale: 1 }} className="ar-tunnel-cap">
            <span className="ar-folio">canto i · the hunger</span>
            <p>Терновый нимб — не мука, а венец страсти. Тот, кто горит по-настоящему, носит корону из шипов как знак преданности.</p>
            <span className="ar-meta">執意 · sacred hunger</span>
          </Layer>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 2 · PROOF — печатный пруф: кроп-марки + CMYK-полоса + штамп (слом клон-макро) */}
        <div transition="cut" className="scene-body ar-proof">
          <div className="ar-proof-bg" aria-hidden />
          <div className="ar-proof-huge" aria-hidden>†</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ar-proof-plate">
            <SceneMedia src={`${A}/ardour-still-1.jpg`} alt="Красный крест — деталь" />
            <span className="ar-crop ar-crop-tl" aria-hidden /><span className="ar-crop ar-crop-tr" aria-hidden /><span className="ar-crop ar-crop-bl" aria-hidden /><span className="ar-crop ar-crop-br" aria-hidden />
          </Layer>
          <div className="ar-proof-bar" aria-hidden><i /><i /><i /><i /><i /><span>CMYK · vermilion</span></div>
          <span className="ar-proof-stamp" aria-hidden>PROOF · 執意 · do not distribute</span>
          <Layer z={6} depth={0.2} phase={[0.06, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ar-proof-cap">
            <span className="ar-folio">the mark · vermilion</span>
            <h3>Red cross</h3>
            <p>Красный крест на лице — не рана, а обет. Мазок киновари, что отделяет истовое от тёплого, страсть от привычки.</p>
          </Layer>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 3 · TYPE GUILLOTINE — blackletter slam */}
        <div transition="wipe-y" className="scene-body ar-guillo">
          <div className="ar-guillo-bg" aria-hidden />
          <div className="ar-guillo-type">
            <KineticText text="AR" mode="slam" />
            <span className="ar-guillo-red"><KineticText text="DOUR" mode="slam" start={0.08} /></span>
          </div>
          <div className="ar-guillo-row" aria-hidden><span>the sacred hunger</span><span>·</span><span>執意</span></div>
        </div>

        {/* 4 · PASTE-UP — расклеенные рваные флаеры на стене (не сетка) */}
        <div transition="drop" className="scene-body ar-paste">
          <div className="ar-paste-bg" aria-hidden />
          <div className="ar-paste-head" aria-hidden><b>Contact 33</b><span>EI.STDIO · 執意 · restricted</span></div>
          <figure className="ar-flyer ar-flyer-1"><img src={`${A}/ardour-extra-3.jpg`} alt="Кадр" loading="lazy" /><figcaption>i · devotion</figcaption></figure>
          <figure className="ar-flyer ar-flyer-2"><img src={`${A}/ardour-extra-1.jpg`} alt="Кадр" loading="lazy" /><figcaption>ii · flame</figcaption></figure>
          <figure className="ar-flyer ar-flyer-3"><img src={`${A}/ardour-extra-2.jpg`} alt="Кадр" loading="lazy" /><figcaption>iii · halo</figcaption></figure>
          <figure className="ar-flyer ar-flyer-4"><img src={`${A}/ardour-still-2.jpg`} alt="Кадр" loading="lazy" /><figcaption>iv · cross</figcaption></figure>
          <div className="ar-paste-code" aria-hidden>the moment burns with significance — ardour is not enthusiasm, it is hunger</div>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 5 · COLOPHON — задняя обложка зина: масthead + выходные данные + баркод (не центр-слоган) */}
        <div transition="drop" className="scene-body ar-colophon">
          <div className="ar-colophon-bg" aria-hidden />
          <div className="ar-colophon-jp" aria-hidden>執意</div>
          <div className="ar-colophon-block">
            <span className="ar-col-label">back cover · issue no.33</span>
            <h4>Ardour</h4>
            <dl className="ar-col-credits">
              <div><dt>Direction</dt><dd>EI.STDIO</dd></div>
              <div><dt>Process</dt><dd>riso · halftone · vermilion</dd></div>
              <div><dt>Edition</dt><dd>poster 33 · MMXXVI</dd></div>
              <div><dt>Rating</dt><dd>R · restricted</dd></div>
            </dl>
            <div className="ar-col-bar" aria-hidden><span className="ar-bars" />the sacred hunger · 執意 · 33</div>
            <div className="ar-col-cta">
              <a href="#" onClick={stop} className="ar-btn">Poster 33 †</a>
              <div className="ar-links"><a href="#" onClick={stop}>EI.STDIO</a><a href="#" onClick={stop}>Devotion</a><a href="#" onClick={stop}>執意</a></div>
            </div>
          </div>
          <div className="ar-halftone" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
