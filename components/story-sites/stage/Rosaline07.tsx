"use client";
/* STORY v2 · САЙТ 7 — «ROSALINE» (pin7: romantic sepia-rose scrapbook, розы/ленты/кружево, тёплый мелан).
   Движок StageDeck v2. Закон камеры — ПЕРЕЛИСТ (страницы дневника вбок, wipe-x) + растворения там, где
   непрерывность несёт сама героиня/снимок. Сюжет: она → та же девушка у окна (растворение) → розы и книги
   (перелист) → сувенир-полароид (перелист) → полароид улетает в разворот дневника (share="polaroid") →
   её портрет со страницы становится фото на открытке (share="her", кольцовка). Лепестки роз — сквозной
   слой. Световая дуга: сумерки → тёплая бумага дневника → рассветная открытка. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { Weather } from "@/components/scene-kit";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./rosaline07.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Rosaline07() {
  return (
    <div className="rs-site">
      <header className="rs-head">
        <Link href="/story2" className="rs-brand">Rosaline</Link>
        <nav className="rs-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Her story</a>
          <a href="#" onClick={stop}>Essence</a>
          <a href="#" onClick={stop} className="rs-cta">Write me</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — скрапбук */}
        <div transition="iris" className="scene-body rs-cover">
          <div className="rs-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="rs-wordmark"><span aria-hidden>ROSALINE</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="rs-cover-fig">
            <SceneMedia src={`${A}/rosaline-hero-cut.png`} alt="Rosaline — портрет с розами" />
          </Layer>
          <div className="rs-notes" aria-hidden>
            <span className="rs-note-l">«Я скорее буду его разбитым сердцем,<br />чем чьим-то счастьем.»</span>
            <span className="rs-note-r">a love so beautiful,<br />it was never<br />meant to be hers.</span>
            <span className="rs-note-tag">✿ she blooms in places<br />he left her behind</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rs-cover-hi">
            <span className="rs-eyebrow">about her · a story of her own</span>
            <h1>She is a <em>dreamer.</em></h1>
            <p>Она любит глубоко, помнит всё, прощает слишком легко — и тихо выживает. Сердце из звёздной пыли и шрамов.</p>
          </Layer>
          <div className="rs-grain" aria-hidden />
          <div className="rs-scrollcue" aria-hidden>turn the page ↓</div>
        </div>

        {/* 1 · TYPE GUILLOTINE — та же девушка у окна: мягкое растворение по героине */}
        <div transition="fade" className="scene-body rs-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="rs-guillo-fig kb-media">
            <SceneMedia src={`${A}/rosaline-portrait-b.jpg`} alt="Rosaline — у окна" />
          </Layer>
          <div className="rs-guillo-veil" aria-hidden />
          <div className="rs-guillo-type" aria-hidden><span>SHE</span><span className="rs-guillo-it">is</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ x: "-40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="rs-guillo-cap">
            <span className="rs-folio">about her</span>
            <ul className="rs-list"><li>a dreamer</li><li>a romantic</li><li>a survivor</li><li>a collector of little things</li></ul>
          </Layer>
          <div className="rs-grain" aria-hidden />
        </div>

        {/* 2 · SIDECAR — her essence: перелист страницы (а не товарная карточка — натюрморт в полкадра) */}
        <div transition="wipe-x" className="scene-body rs-side">
          <div className="rs-side-bg" aria-hidden />
          <Layer z={2} depth={0.2} phase={[0.02, 0.9]} from={{ x: "5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rs-side-fig">
            <SceneMedia src={`${A}/rosaline-still-1.jpg`} alt="Розы и старые книги" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="rs-side-cap">
            <span className="rs-script-s">her essence</span>
            <h2>Roses &amp;<br /><em>old books</em></h2>
            <p>Лунный свет, написанные слова, мягкий розовый, горько-сладкие воспоминания и тихая магия.</p>
          </Layer>
          <div className="rs-side-orn" aria-hidden>✿ &nbsp; roses &amp; memory &nbsp; ✿</div>
          <div className="rs-grain" aria-hidden />
        </div>

        {/* 3 · KEEPSAKE — приклеенное скотчем фото-воспоминание + подпись от руки (слом клон-макро) */}
        <div transition="wipe-x" className="scene-body rs-keep">
          <div className="rs-keep-bg" aria-hidden />
          <div className="rs-keep-tex" aria-hidden><img src={`${A}/rosaline-extra-4.jpg`} alt="" loading="lazy" /></div>
          <div className="rs-keep-huge" aria-hidden>bloom</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ opacity: 0, scale: 1.05 }} to={{ opacity: 1, scale: 1 }} className="rs-keep-photo">
            <SceneMedia src={`${A}/rosaline-still-2.jpg`} alt="Руки с цветами и кружевом" share="polaroid" />
          </Layer>
          <span className="rs-keep-label" aria-hidden>~ remember this, spring &rsquo;24 ~</span>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rs-keep-cap">
            <span className="rs-script-s">a keepsake</span>
            <p>Она не ищет спасителя. Она вспоминает, как спасать себя. Rosaline — не второй выбор, а история сама по себе.</p>
            <span className="rs-meta">quiet magic · soft pinks · written words</span>
          </Layer>
          <div className="rs-grain" aria-hidden />
        </div>

        {/* 4 · JOURNAL — страница дневника: фото на скотче + записи от руки + роза (не сетка) */}
        <div transition="fade" className="scene-body rs-journal">
          <div className="rs-journal-bg" aria-hidden />
          <div className="rs-journal-head" aria-hidden><b>Her diary</b><span>moments &amp; quiet magic</span></div>
          <div className="rs-journal-page">
            <figure className="rs-jp rs-jp-1"><img src={`${A}/rosaline-hero.jpg`} alt="Портрет" loading="lazy" data-share="her" /><figcaption>her</figcaption></figure>
            <figure className="rs-jp rs-jp-2"><img src={`${A}/rosaline-portrait-b.jpg`} alt="У окна" loading="lazy" /><figcaption>window</figcaption></figure>
            <figure className="rs-jp rs-jp-3"><img src={`${A}/rosaline-still-1.jpg`} alt="Розы и книги" loading="lazy" /><figcaption>roses</figcaption></figure>
            <figure className="rs-jp rs-jp-4"><img src={`${A}/rosaline-still-2.jpg`} alt="Руки" loading="lazy" data-share="polaroid" /><figcaption>spring &rsquo;24</figcaption></figure>
            <span className="rs-jnote rs-jnote-1" aria-hidden>she loves deeply</span>
            <span className="rs-jnote rs-jnote-2" aria-hidden>remembers everything &amp; survives quietly</span>
            <span className="rs-jrose" aria-hidden>✿</span>
          </div>
          <div className="rs-grain" aria-hidden />
        </div>

        {/* 5 · POSTCARD — её портрет со страницы дневника ложится на открытку (share="her", кольцовка с обложкой) */}
        <div transition="fade" className="scene-body rs-post">
          <div className="rs-post-bg" aria-hidden />
          <div className="rs-post-card">
            <figure className="rs-post-photo"><img src={`${A}/rosaline-hero.jpg`} alt="Rosaline — портрет на открытке" loading="lazy" data-share="her" /></figure>
            <div className="rs-post-left">
              <span className="rs-post-hand">She is a story of her own.</span>
              <span className="rs-post-note">A heart made of stardust and scars.</span>
              <span className="rs-post-sign">— with love, R.</span>
            </div>
            <div className="rs-post-divider" aria-hidden />
            <div className="rs-post-right">
              <div className="rs-post-stamp" aria-hidden>✿</div>
              <div className="rs-post-mark" aria-hidden>ROSALINE · 2026</div>
              <div className="rs-post-addr" aria-hidden><i /><i /><i /></div>
              <a href="#" onClick={stop} className="rs-btn">Напиши мне ✿</a>
            </div>
          </div>
          <div className="rs-links"><a href="#" onClick={stop}>Дневник</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>Письмо</a></div>
          <div className="rs-grain" aria-hidden />
        </div>
      </StageDeck>
      {/* лепестки роз — сквозной передний слой через все страницы */}
      <Weather kind="petals" count={13} color="#e6b5ba" color2="#c98a8a" zIndex={30} wind={0} world={0} seed={3} className="rs-petals" />
    </div>
  );
}
