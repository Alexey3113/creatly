"use client";
/* STORY 02 — SHADOWS «Мара Тень». Красный грандж-оккульт-зин. Снап-дек: один жест = следующий лист,
   скролл заблокирован на время анимации. Свои кадры (shadows-hero-a). Русский. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StoryDeck } from "./StoryDeck";
import { Bookmark } from "./bookmarks";
import "@/components/parallax-scene/parallax-scene.css";
import "./story.css";
import "./shadows.css";

const A = "/uploads/1/story/tatoo";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function ShadowsSite() {
  return (
    <div className="sh-site">
      <div className="sh-grain" aria-hidden />
      <header className="sh-head">
        <Link href="/story" className="sh-brand">М.ТЕНЬ</Link>
        <nav className="sh-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Мастер</a>
          <a href="#" onClick={stop}>Работы</a>
          <a href="#" onClick={stop} className="sh-cta">Запись</a>
        </nav>
      </header>

      <StoryDeck>
        {/* ОБЛОЖКА — постер-коллаж: вордмарк-окклюзия + cutout + орнамент-зин */}
        <div className="deck-slide sh-scene sh-cover">
          <div className="sh-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ scale: 1.14, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sh-wordmark"><span aria-hidden>SHADOWS</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.08 }} to={{ y: "0vh", scale: 1 }} className="sh-cover-fig">
            <SceneMedia src={`${A}/shadows-hero-a-cut.png`} alt="Мастер Мара Тень — портрет в красном свете, blackwork-тату" />
          </Layer>
          <div className="sh-orn" aria-hidden>
            <span className="sh-orn-tl">✕ ✕ ✕<br />оккульт-флэш</span>
            <span className="sh-orn-tr">reliquary<br />no. 666</span>
            <span className="sh-orn-lm">не украшаю —<br />вскрываю</span>
            <span className="sh-orn-rm">свет,<br />достался<br />болью</span>
            <span className="sh-orn-bar"><b>|| ||| | |||| || | |||</b>4 890 597 187 84</span>
            <span className="sh-orn-no">01</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.06, 0.6]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-cover-hi">
            <span className="sh-eyebrow">оккульт-флэш · со дна</span>
            <h1>Я — <em>Мара</em>.<br />Тень по коже.</h1>
            <p>Blackwork, реликвии, терновые нимбы. Это мой зин — листай, каждая страница заливается новой историей.</p>
          </Layer>
          <div className="sh-scrollcue" aria-hidden>вниз&nbsp;<i>▾</i></div>
        </div>

        {/* РАЗВОРОТ 01 — манифест */}
        <div className="deck-slide sh-scene sh-spread sh-s1">
          <div className="sh-paper" aria-hidden />
          <Layer z={4} depth={0.34} phase={[0.03, 0.95]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-flood sh-flood-a">
            <div className="sh-xrow" aria-hidden>✕ ✕ ✕ ✕ ✕</div>
            <span className="sh-folio">лист 01 — кредо</span>
            <h2>Свет режу<br /><em>тенью</em>.</h2>
            <p>Не украшаю — вскрываю. Каждая линия держит свою тьму: реликварий, ворон, терн. Игла работает медленно, зато навсегда.</p>
            <ul className="sh-facts">
              <li><b>IX</b><span>лет во тьме</span></li>
              <li><b>240</b><span>реликвий</span></li>
              <li><b>0</b><span>повторов</span></li>
            </ul>
          </Layer>
          <Bookmark kind="tape" text="Написать мастеру" top="24vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 02 — «Нимб» · архетип МОНУМЕНТ */}
        <div className="deck-slide sh-scene sh-mono">
          <Layer z={1} depth={0.14} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1 }} className="sh-mono-fig">
            <SceneMedia src={`${A}/shadows-work-1.jpg`} alt="Работа «Нимб» — blackwork терновый венец на спине" />
          </Layer>
          <div className="sh-mono-veil" aria-hidden />
          <div className="sh-mono-x" aria-hidden>✕ ✕ ✕</div>
          <div className="sh-mono-idx" aria-hidden>01</div>
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-mono-cap">
            <span className="sh-folio">реликвия 01 · монумент</span>
            <h3>Нимб<em>из терний</em></h3>
            <p>Разорванный венец над затылком — свет, который достался болью. Плотный blackwork, белые брызги.</p>
            <span className="sh-meta">затылок · 5 часов · blackwork</span>
          </Layer>
          <Bookmark kind="condom" text="Связаться" top="30vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 03 — «Ворон» · архетип МАКРО */}
        <div className="deck-slide sh-scene sh-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.14, x: "-3vw" }} to={{ scale: 1.02, x: "0vw" }} className="sh-macro-fig">
            <SceneMedia src={`${A}/shadows-work-2.jpg`} alt="Работа «Ворон» — макро blackwork-тату ворона на плече" />
          </Layer>
          <div className="sh-macro-scan" aria-hidden />
          <div className="sh-macro-huge" aria-hidden>ВОРОН</div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-macro-cap">
            <span className="sh-folio">реликвия 02 · макро</span>
            <p>Птица срывается с плеча — рваные перья, чернильный шлейф. Чёрное на чёрном, лишь клюв ловит свет.</p>
            <span className="sh-meta">плечо · 7 часов · dark-realism</span>
          </Layer>
          <Bookmark kind="gum" text="Запись" top="26vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 04 — «Пелена» · архетип ПАНОРАМА (landscape во всю ширину) */}
        <div className="deck-slide sh-scene sh-pano">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.12, x: "2vw" }} to={{ scale: 1, x: "0vw" }} className="sh-pano-fig">
            <SceneMedia src={`${A}/shadows-work-wide.jpg`} alt="Работа «Пелена» — панорамный blackwork через спину и руку" />
          </Layer>
          <div className="sh-pano-bars" aria-hidden />
          <div className="sh-pano-word" aria-hidden>Пелена<em>shroud</em></div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-pano-cap">
            <span className="sh-folio">разворот · во всю тьму</span>
            <p>Плащаница чёрных линий стекает со спины на вытянутую руку — реликвия во весь разворот, без единого просвета.</p>
            <span className="sh-meta">спина + рука · 11 часов · blackwork</span>
          </Layer>
          <Bookmark kind="briefs" text="Написать мастеру" top="28vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 05 — «Крест» · архетип КОЛЛАЖ-ЗИН */}
        <div className="deck-slide sh-scene sh-collage">
          <div className="sh-paper" aria-hidden />
          <Layer z={3} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-col-grid">
            <figure className="sh-col sh-col-1" style={{ ["--thr" as string]: 0.04, ["--fly" as string]: "-62vw", ["--rot0" as string]: "-20deg" }}><SceneMedia src={`${A}/shadows-work-3.jpg`} alt="Работа «Крест» — реликварий blackwork на груди" /><figcaption>03 · крест</figcaption></figure>
            <figure className="sh-col sh-col-2" style={{ ["--thr" as string]: 0.18, ["--fly" as string]: "58vw", ["--rot0" as string]: "16deg" }}><SceneMedia src={`${A}/shadows-work-1.jpg`} alt="Терновый нимб" /><figcaption>01 · нимб</figcaption></figure>
            <figure className="sh-col sh-col-3" style={{ ["--thr" as string]: 0.32, ["--fly" as string]: "48vw", ["--rot0" as string]: "-14deg" }}><SceneMedia src={`${A}/shadows-work-2.jpg`} alt="Ворон" /><figcaption>02 · ворон</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.05, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-col-copy">
            <span className="sh-folio">реликварий · архив</span>
            <h3>Крест<em>реликварий</em></h3>
            <span className="sh-meta">грудина · 8 часов · ornamental</span>
            <div className="sh-col-code" aria-hidden><span>|| ||| | |||| || |</span>4 890 597 187 84</div>
          </Layer>
          <Bookmark kind="bandage" text="Написать в Telegram" top="32vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 06 — «Архив» · архетип БЕНТО-СТЕНА (мозаика работ) */}
        <div className="deck-slide sh-scene sh-wall">
          <div className="sh-wall-grid">
            <figure className="sh-tile sh-tile-a"><img src={`${A}/shadows-hero-b.jpg`} alt="Мастер Мара — портрет, blackwork" loading="lazy" /><figcaption>Мара · портрет</figcaption></figure>
            <figure className="sh-tile sh-tile-b"><img src={`${A}/shadows-work-wide.jpg`} alt="Blackwork через спину и руку" loading="lazy" /><figcaption>пелена · спина</figcaption></figure>
            <figure className="sh-tile sh-tile-c"><img src={`${A}/shadows-tile-1.jpg`} alt="Оккульт-символы на костяшках" loading="lazy" /><figcaption>костяшки</figcaption></figure>
            <figure className="sh-tile sh-tile-d"><img src={`${A}/shadows-tile-2.jpg`} alt="Орнамент на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="sh-tile sh-tile-e"><img src={`${A}/shadows-work-3.jpg`} alt="Реликварий-крест на груди" loading="lazy" /><figcaption>крест</figcaption></figure>
            <figure className="sh-tile sh-tile-f"><img src={`${A}/shadows-work-1.jpg`} alt="Терновый нимб на спине" loading="lazy" /><figcaption>нимб · спина</figcaption></figure>
            <figure className="sh-tile sh-tile-g"><img src={`${A}/shadows-work-2.jpg`} alt="Ворон на плече" loading="lazy" /><figcaption>ворон</figcaption></figure>
            <figure className="sh-tile sh-tile-h"><img src={`${A}/shadows-tile-3.jpg`} alt="Кинжал и терн на голени" loading="lazy" /><figcaption>кинжал</figcaption></figure>
          </div>
          <div className="sh-wall-cap"><b>реликварий</b> · выборка · 2019—2026</div>
          <Bookmark kind="sock" text="Смотреть все" top="40vh" tone="paper" />
        </div>

        {/* ФИНАЛ */}
        <div className="deck-slide sh-scene sh-final">
          <div className="sh-final-bg" aria-hidden />
          <div className="sh-xrow sh-xbig" aria-hidden>✕ ✕ ✕</div>
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-final-copy">
            <span className="sh-eyebrow">последний лист</span>
            <h2>Готов носить<br /><em>тьму</em>?</h2>
            <p>Пишу мало, беру серьёзные вещи. Расскажи, что хочешь оставить навсегда.</p>
          </Layer>
          <div className="sh-final-cta">
            <a href="#" onClick={stop} className="sh-btn">Записаться <i>✕</i></a>
            <div className="sh-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
            <div className="sh-sign">М.ТЕНЬ · Мара Тень · оккульт-флэш · Санкт-Петербург</div>
          </div>
        </div>
      </StoryDeck>
    </div>
  );
}
