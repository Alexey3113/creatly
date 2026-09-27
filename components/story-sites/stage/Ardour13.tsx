"use client";
/* STORY v2 · САЙТ 20 — «ARDOUR» (pin13: bone/grey halftone-зин + красный blackletter-вордмарк,
   монахиня + терн-нимб + красный крест, 執意). ЕДИНСТВЕННЫЙ светлый графичный сайт — так и остаётся.
   Сквозная архитектура (аудит 2026-09): КРАСНЫЙ МАЗОК КРЕСТА — кисть, которая прорисовывает переходы
   (data-share="cross"): крест на лице → правка на пруфе → знак на лбу под терновым нимбом → «AR ✝ DOUR» →
   снова на её лице во флаере CONTACT 33 → финал: она на задней обложке (кольцовка, data-share="hero").
   Обложка: слово разрезано вокруг лица «Ar ✝ dour» — фигура не съедает ни одной буквы. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./ardour13.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

/** Мазок креста: два неровных бруска киновари во вьюбоксе коробки (растягиваются с ней при перелёте). */
function Cross({ c }: { c: string }) {
  return (
    <span className={`ar-cross ${c}`} data-share="cross" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <polygon points="47,0 58.5,1 59.5,20 58.8,45 59.8,70 58.6,100 47.5,99 46.4,75 47.2,50 46.2,25" />
        <polygon points="0,49.5 25,48.6 50,49.2 75,48.4 100,49.8 99,62 75,62.8 50,61.8 25,62.6 1,61.4" />
      </svg>
    </span>
  );
}

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
        {/* 0 · ПОСТЕР — слово разрезано вокруг лица: «Ar ✝ dour», крест на лице — ось слова */}
        <div transition="fade" className="scene-body ar-cover">
          <div className="ar-cover-bg" aria-hidden />
          <div className="ar-frame" aria-hidden />
          <div className="ar-corner ar-corner-tl" aria-hidden><b>執意</b><span>▟▟▟▟</span></div>
          <div className="ar-corner ar-corner-tr" aria-hidden>POSTER<br />33<br />EI.STDIO</div>
          <div className="ar-beams" aria-hidden><i /><i /><i /></div>
          <Layer z={3} depth={0.14} phase={[0, 0.9]} from={{ y: "3vh", scale: 1.03 }} to={{ y: "0vh", scale: 1 }} className="ar-cover-fig">
            <div className="ar-cut">
              <img className="ar-cut-img" src={`${A}/ardour-hero-cut.png`} alt="Монахиня — терн-нимб, красный крест на лице" draggable={false} />
              <Cross c="ar-cross-face" />
            </div>
          </Layer>
          <Layer z={4} depth={0.06} phase={[0, 0.9]} from={{ opacity: 0, scale: 1.04 }} to={{ opacity: 1, scale: 1 }} className="ar-wordmark">
            <h1 className="ar-wm"><span className="ar-wm-l">Ar</span><span className="ar-wm-r">dour</span></h1>
          </Layer>
          <Layer z={6} depth={0.28} phase={[0.08, 0.7]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ar-cover-hi">
            <p className="ar-blurb">It is the unrelenting passion that consumes and refines — ardour is not just enthusiasm, it is the existential hunger that burns the sacred lover to the surrender of purpose.</p>
          </Layer>
          <div className="ar-rating" aria-hidden><b>R</b><span>RESTRICTED · violence, sacred imagery, brief bone</span></div>
          <div className="ar-globe" aria-hidden>◍</div>
          <div className="ar-halftone" aria-hidden />
          <div className="ar-scrollcue" aria-hidden>burn ↓</div>
        </div>

        {/* 1 · ПРУФ — мазок слетает с лица и ложится правкой на печатный пруф тернового венца */}
        <div transition="fade" className="scene-body ar-proof">
          <div className="ar-proof-bg" aria-hidden />
          <div className="ar-proof-huge" aria-hidden>†</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ar-proof-plate">
            <SceneMedia src={`${A}/ardour-still-1.jpg`} alt="Терновый венец — печатный пруф" />
            <span className="ar-crop ar-crop-tl" aria-hidden /><span className="ar-crop ar-crop-tr" aria-hidden /><span className="ar-crop ar-crop-bl" aria-hidden /><span className="ar-crop ar-crop-br" aria-hidden />
          </Layer>
          <Cross c="ar-cross-proof" />
          <div className="ar-proof-bar" aria-hidden><i /><i /><i /><i /><i /><span>CMYK · vermilion</span></div>
          <span className="ar-proof-stamp" aria-hidden>PROOF · 執意 · do not distribute</span>
          <Layer z={6} depth={0.2} phase={[0.2, 0.8]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ar-proof-cap">
            <span className="ar-folio">the mark · vermilion</span>
            <h3>Red cross</h3>
            <p>Красный крест на лице — не рана, а обет. Мазок киновари, что отделяет истовое от тёплого, страсть от привычки.</p>
          </Layer>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 2 · ТЕРНОВЫЙ НИМБ — наезд: венец с пруфа становится её нимбом, мазок — знаком на лбу */}
        <div transition="push" className="scene-body ar-tunnel">
          <div className="ar-tunnel-bg" aria-hidden />
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="ar-cq">
            <div className="ar-plate ar-plate-pb ar-kb">
              <img className="ar-img" src={`${A}/ardour-portrait-b.jpg`} alt="Монахиня под терновым нимбом" draggable={false} />
              <Cross c="ar-cross-brow" />
            </div>
          </Layer>
          <div className="ar-tunnel-huge" aria-hidden>†</div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.65]} from={{ opacity: 0, y: "2vh" }} to={{ opacity: 1, y: "0vh" }} className="ar-tunnel-cap">
            <span className="ar-folio">canto i · the hunger</span>
            <p>Терновый нимб — не мука, а венец страсти. Тот, кто горит по-настоящему, носит корону из шипов как знак преданности.</p>
            <span className="ar-meta">執意 · sacred hunger</span>
          </Layer>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 3 · ИМЯ — мазок встаёт рядом со словом: AR ✝ / DOUR */}
        <div transition="fade" className="scene-body ar-guillo">
          <div className="ar-guillo-bg" aria-hidden />
          <div className="ar-guillo-type">
            <span className="ar-guillo-line"><KineticText text="AR" mode="slam" start={0.3} /><Cross c="ar-cross-name" /></span>
            <span className="ar-guillo-red"><KineticText text="DOUR" mode="slam" start={0.4} /></span>
          </div>
          <div className="ar-guillo-row" aria-hidden><span>the sacred hunger</span><span>·</span><span>執意</span></div>
        </div>

        {/* 4 · CONTACT 33 — расклейка; мазок возвращается ей на лицо во флаере iv */}
        <div transition="push" className="scene-body ar-paste">
          <div className="ar-paste-bg" aria-hidden />
          <div className="ar-paste-head" aria-hidden><b>Contact 33</b><span>EI.STDIO · 執意 · restricted</span></div>
          <figure className="ar-flyer ar-flyer-1"><img src={`${A}/ardour-extra-3.jpg`} alt="Кадр — в полный рост" loading="lazy" /><figcaption>i · devotion</figcaption></figure>
          <figure className="ar-flyer ar-flyer-2"><img src={`${A}/ardour-extra-1.jpg`} alt="Кадр — на камне" loading="lazy" /><figcaption>ii · flame</figcaption></figure>
          <figure className="ar-flyer ar-flyer-3"><img src={`${A}/ardour-still-2.jpg`} alt="Кадр — руки с чётками" loading="lazy" /><figcaption>iii · hands</figcaption></figure>
          <figure className="ar-flyer ar-flyer-4">
            <div className="ar-hero-box" data-share="hero"><img src={`${A}/ardour-hero.jpg`} alt="Кадр — она, крест на лице" loading="lazy" /></div>
            <Cross c="ar-cross-face" />
            <figcaption>iv · cross</figcaption>
          </figure>
          <div className="ar-paste-code" aria-hidden>the moment burns with significance — ardour is not enthusiasm, it is hunger</div>
          <div className="ar-halftone" aria-hidden />
        </div>

        {/* 5 · COLOPHON — задняя обложка: она снова здесь, выходные данные рядом; бумага теплее */}
        <div transition="fade" className="scene-body ar-colophon">
          <div className="ar-colophon-bg" aria-hidden />
          <div className="ar-colophon-jp" aria-hidden>執意</div>
          <div className="ar-colophon-hero">
            <div className="ar-hero-box" data-share="hero"><img src={`${A}/ardour-hero.jpg`} alt="Она — задняя обложка выпуска" loading="lazy" /></div>
            <Cross c="ar-cross-face" />
          </div>
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
