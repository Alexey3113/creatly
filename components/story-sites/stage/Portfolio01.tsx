"use client";
/* STORY v2 · ПИЛОТ 1 — «PORTFOLIO» / Marina Voss (art-director, pin 1: plum + dusty-pink glossy editorial).
   Движок StageDeck v2. Сквозная архитектура: закон камеры — ГЛУБИНА (наезд/отъезд), один сюжет «плёнка»:
   Марина (вырезка) → наезд на неё (share="marina") → её работы (наезд в проект, в деталь) → разворот
   ложится в кадр 02 контакт-листа (share="spread", отъезд) → карандашный круг вокруг кадра 02 становится
   диафрагмой iris и обводит «Craft.» (share="loupe") → финал: Марина возвращается (кольцовка).
   Световая дуга: слива → лайтбокс (единственная вспышка) → светлый «отпечаток» финала.
   Фото public/uploads/1/story2/p01-*. Текст/вордмарк = HTML (KineticText), не в фото. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./portfolio01.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Portfolio01() {
  return (
    <div className="pf-site">
      <header className="pf-head">
        <Link href="/story2" className="pf-brand">MARINA<i>VOSS</i></Link>
        <nav className="pf-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Work</a>
          <a href="#" onClick={stop}>About</a>
          <a href="#" onClick={stop} className="pf-cta">Contact</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — обложка */}
        <div transition="push" className="scene-body pf-cover">
          <div className="pf-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="pf-wordmark">
            <KineticText text="PORTFOLIO" mode="slam" />
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "7vh", scale: 1.06 }} to={{ y: "0vh", scale: 1 }} className="pf-cover-fig">
            <SceneMedia src={`${A}/p01-hero-cut.png`} alt="Арт-директор Marina Voss — портрет" share="marina" />
          </Layer>
          <Layer z={5} depth={0.6} phase={[0, 1]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 0.9 }} className="pf-fore" aria-hidden>
            <span className="pf-fore-orb" />
          </Layer>
          <div className="pf-orn" aria-hidden>
            <span className="pf-orn-role">Art Director<br />& Brand Designer</span>
            <span className="pf-orn-badge">✦ Strategic · Purposeful ✦</span>
            <span className="pf-orn-star">✦</span>
            <span className="pf-orn-no">/ 01</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pf-cover-hi">
            <span className="pf-script pf-cover-script">Ideas that leave a mark.</span>
            <h1>Marina <em>Voss</em></h1>
            <p>Строю смелые визуальные идентичности и арт-дирекшн, что связывают бренды с культурой и людьми.</p>
          </Layer>
          <div className="pf-grain" aria-hidden />
          <div className="pf-scrollcue" aria-hidden>scroll&nbsp;<i>↓</i></div>
        </div>

        {/* 1 · TYPE GUILLOTINE — наезд на Марину: та же вырезка крупнее, камера идёт к лицу (share="marina") */}
        <div transition="push" className="scene-body pf-guillo">
          <div className="pf-guillo-bg" aria-hidden />
          <Layer z={2} depth={0.1} phase={[0, 1]} from={{ y: "2vh" }} to={{ y: "0vh" }} className="pf-guillo-fig">
            <SceneMedia src={`${A}/p01-hero-cut.png`} alt="Marina Voss — крупный план" share="marina" />
          </Layer>
          <div className="pf-guillo-veil" aria-hidden />
          <Layer z={4} depth={0.36} phase={[0, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pf-guillo-type">
            <KineticText text="SELECTED" mode="slam" />
            <KineticText text="WORK" mode="slam" start={0.12} />
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ x: "-40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="pf-guillo-cap">
            <span className="pf-folio">05 проектов · 2020—2026</span>
            <p>Каждый бренд — своя вселенная. Ниже — пять, которые я построила от стратегии до последнего пикселя.</p>
          </Layer>
          <div className="pf-grain" aria-hidden />
        </div>

        {/* 2 · SIDECAR SPREAD — VELVET HOUR (наезд: камера входит в первый проект) */}
        <div transition="push" className="scene-body pf-side">
          <div className="pf-side-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0.02, 0.9]} from={{ x: "6vw", rotate: "1deg", opacity: 0 }} to={{ x: "0vw", rotate: "-3deg", opacity: 1 }} className="pf-side-fig">
            <SceneMedia src={`${A}/p01-still-1.jpg`} alt="VELVET HOUR — фирменный стиль, продуктовый кадр" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="pf-side-cap">
            <span className="pf-num">01</span>
            <h2>Velvet<br /><em>Hour</em></h2>
            <span className="pf-folio">cocktail lounge · brand identity</span>
            <p>Идентичность вечернего бара: бархат, латунь и приглушённый свет, собранные в один тон голоса.</p>
          </Layer>
          <div className="pf-side-orn" aria-hidden>✦ &nbsp; brand identity &nbsp; ✦</div>
          <div className="pf-grain" aria-hidden />
        </div>

        {/* 3 · MACRO EVIDENCE — AURELIA (наезд в деталь: бархат → разворот) */}
        <div transition="push" className="scene-body pf-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.14, x: "2vw" }} to={{ scale: 1.02, x: "0vw" }} className="pf-macro-fig kb-media">
            <SceneMedia src={`${A}/p01-still-2.jpg`} alt="AURELIA — упаковка и арт-дирекшн, макро" share="spread" />
          </Layer>
          <div className="pf-macro-scan" aria-hidden />
          <div className="pf-macro-huge" aria-hidden>AURELIA</div>
          <div className="pf-macro-marks" aria-hidden><span>+ 34.05</span><span>ISO 100</span><span>◎</span><span>[ ret. ]</span></div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="pf-macro-cap">
            <span className="pf-num">02</span>
            <span className="pf-folio">skincare · packaging + art direction</span>
            <p>Тихая роскошь: тёплая бумага, тиснение и один жест кисти — система, которую видно с полки.</p>
          </Layer>
          <div className="pf-grain" aria-hidden />
        </div>

        {/* 4 · CONTACT SHEET на лайтбоксе — отъезд: разворот ложится в кадр 02 (share="spread"); единственная вспышка света */}
        <div transition="fade" className="scene-body pf-contact">
          <div className="pf-contact-bg" aria-hidden />
          <div className="pf-contact-head" aria-hidden><b>The Archive</b><span>selected work · 2020—2026 · lightbox</span></div>
          <div className="pf-contact-strip">
            <figure className="pf-neg pf-neg-1"><img src={`${A}/p01-hero.jpg`} alt="Портрет — обложка кампании" loading="lazy" /><figcaption>01 · face</figcaption></figure>
            <figure className="pf-neg pf-neg-2 pf-neg-sel"><img src={`${A}/p01-still-2.jpg`} alt="Разворот журнала" loading="lazy" data-share="spread" /><figcaption>02 · spread</figcaption><span className="pf-select" data-share="loupe" aria-hidden /></figure>
            <figure className="pf-neg pf-neg-3"><img src={`${A}/p01-still-1.jpg`} alt="Продуктовый кадр" loading="lazy" /><figcaption>03 · still</figcaption></figure>
            <figure className="pf-neg pf-neg-4"><img src={`${A}/p01-portrait-b.jpg`} alt="Портрет в очках" loading="lazy" /><figcaption>04 · look</figcaption></figure>
          </div>
          <div className="pf-contact-note" aria-hidden>✓ frame 02 — editorial spread</div>
          <div className="pf-grain" aria-hidden />
        </div>

        {/* 5 · NEGATIVE-SPACE MONUMENT — карандашный круг с кадра 02 раскрывается диафрагмой и обводит «Craft.» (share="loupe") */}
        <div transition="iris" className="scene-body pf-mono">
          <div className="pf-mono-bg" aria-hidden />
          <Layer z={2} depth={0.5} phase={[0, 1]} from={{ scale: 0.9, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="pf-mono-word">
            <span>Craft<em>.</em></span>
          </Layer>
          <span className="pf-loupe" data-share="loupe" aria-hidden />
          <figure className="pf-mono-print" aria-hidden><img src={`${A}/p01-still-2.jpg`} alt="" loading="lazy" /><figcaption>frame 02 · print</figcaption></figure>
          <Layer z={4} depth={0.18} phase={[0.2, 0.8]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pf-mono-cap">
            <span className="pf-script">Strategy is the soul.</span>
            <p>Дизайн — это голос. Я слежу, чтобы он звучал в каждой детали.</p>
          </Layer>
          <div className="pf-grain" aria-hidden />
        </div>

        {/* 6 · FINAL — отпечаток: Марина возвращается (кольцовка с обложкой), светлый позитив после негативов */}
        <div transition="push" className="scene-body pf-final">
          <div className="pf-final-bg" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0, 0.9]} from={{ y: "5vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pf-final-fig">
            <SceneMedia src={`${A}/p01-hero-cut.png`} alt="Marina Voss" />
          </Layer>
          <Layer z={4} depth={0.34} phase={[0, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pf-final-type">
            <KineticText text="LET'S CREATE" mode="slam" />
            <KineticText text="SOMETHING" mode="slam" start={0.1} />
            <KineticText text="UNFORGETTABLE" mode="slam" start={0.2} />
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.15, 0.75]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pf-final-cta">
            <a href="#" onClick={stop} className="pf-btn">Начать проект <i>↗</i></a>
            <div className="pf-links"><a href="#" onClick={stop}>hello@marinavoss.studio</a><a href="#" onClick={stop}>@marinavoss</a><a href="#" onClick={stop}>Los Angeles, CA</a></div>
            <div className="pf-sign">Marina Voss · Art Director & Brand Designer</div>
          </Layer>
          <div className="pf-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
