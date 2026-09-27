"use client";
/* STORY 02 — SHADOWS «Мара Тень». Красный грандж-оккульт-зин. Русский. Движок StageDeck.
   ЗАКОН КАМЕРЫ — «спуск во тьму и ворон»: камера падает за Марой на дно (drop «Пелены»), линия терний
   прорезает кадр (свой переход thorns — маска-стебель с шипами), из терновой короны раскрывается свет
   (iris ровно из центра нимба → бело-алая вспышка кредо), жёсткий cut на кульминации — во тьме сидит ВОРОН.
   Дальше ворон — персонаж (data-share="raven"): срывается с плеча в коллаж-реликварий, оттуда на стену,
   со стены садится на последний лист зина рядом с Марой. Работы коллажа FLIP'ом уходят в стену,
   портрет Мары со стены — в финал. Световая дуга: красная тьма → вспышка кредо → рассвет костяной бумаги. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./stage/StageDeck";
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

      <StageDeck>
        {/* 0 · ОБЛОЖКА — вордмарк наверху листа (как на пине), голова Мары перекрывает одну букву, приветствие справа внизу */}
        <div transition="fade" className="scene-body sh-cover">
          <div className="sh-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ y: "-3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-wordmark"><span aria-hidden>SHADOWS</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.06 }} to={{ y: "0vh", scale: 1 }} className="sh-cover-fig">
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
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-cover-hi sh-out">
            <span className="sh-eyebrow">оккульт-флэш · со дна</span>
            <h1>Я — <em>Мара</em>.<br />Тень по коже.</h1>
            <p>Blackwork, реликвии, терновые нимбы. Это мой зин — листай, каждая страница заливается новой историей.</p>
          </Layer>
          <div className="sh-scrollcue sh-out" aria-hidden>вниз&nbsp;<i>▾</i></div>
        </div>

        {/* 1 · «ПЕЛЕНА» — drop: пелена падает сверху, камера спускается на дно, где лежит Мара */}
        <div transition="drop" className="scene-body sh-shroud">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.08, y: "-3vh" }} to={{ scale: 1, y: "0vh" }} className="sh-shroud-fig">
            <SceneMedia src={`${A}/shadows-work-wide.jpg`} alt="Работа «Пелена» — панорамный blackwork через спину и руку" />
          </Layer>
          <div className="sh-shroud-veil" aria-hidden />
          <div className="sh-shroud-word sh-out" aria-hidden>Пелена<em>shroud</em></div>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-shroud-cap sh-out">
            <span className="sh-folio">разворот · во всю тьму</span>
            <p>Плащаница чёрных линий стекает со спины на вытянутую руку — реликвия во весь разворот, без единого просвета.</p>
            <span className="sh-meta">спина + рука · 11 часов · blackwork</span>
          </Layer>
          <Bookmark kind="briefs" text="Написать мастеру" top="28vh" tone="paper" />
        </div>

        {/* 2 · «НИМБ» — thorns: кадр прорезает стебель с шипами; венец целиком в нише-реликварии */}
        <div transition="thorns" className="scene-body sh-niche">
          <div className="sh-niche-bg" aria-hidden />
          <Layer z={2} depth={0.14} phase={[0, 1]} from={{ scale: 1.05 }} to={{ scale: 1 }} className="sh-niche-fig">
            <div className="sh-niche-box"><SceneMedia src={`${A}/shadows-work-1.jpg`} alt="Работа «Нимб» — blackwork терновый венец на спине" /></div>
          </Layer>
          <div className="sh-niche-idx sh-out" aria-hidden>01</div>
          <div className="sh-niche-x sh-out" aria-hidden>✕ ✕ ✕</div>
          <Layer z={6} depth={0.24} phase={[0.42, 0.98]} from={{ x: "-30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="sh-niche-cap sh-out">
            <span className="sh-folio">реликвия 01 · монумент</span>
            <h3>Нимб<em>из терний</em></h3>
            <p>Разорванный венец над затылком — свет, который достался болью. Плотный blackwork, белые брызги.</p>
            <span className="sh-meta">затылок · 5 часов · blackwork</span>
          </Layer>
          <Bookmark kind="condom" text="Связаться" top="30vh" tone="ink" />
        </div>

        {/* 3 · КРЕДО — iris ровно из центра терновой короны: вспышка дуги (бело-алый ожог), манифест тушью */}
        <div transition="iris" className="scene-body sh-credo">
          <div className="sh-credo-bg" aria-hidden />
          <div className="sh-credo-rays" aria-hidden />
          <Layer z={4} depth={0.34} phase={[0.3, 0.98]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sh-flood-a sh-out">
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

        {/* 4 · «ВОРОН» — cut на кульминации: после вспышки — тьма и птица на плече; отсюда ворон становится персонажем */}
        <div transition="cut" className="scene-body sh-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="sh-macro-fig">
            <SceneMedia src={`${A}/shadows-work-2.jpg`} alt="Работа «Ворон» — макро blackwork-тату ворона на плече" share="raven" className="sh-raven" />
          </Layer>
          <div className="sh-macro-scan" aria-hidden />
          <div className="sh-macro-huge sh-out" aria-hidden>ВОРОН</div>
          <Layer z={6} depth={0.2} phase={[0.2, 0.9]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-macro-cap sh-out">
            <span className="sh-folio">реликвия 02 · макро</span>
            <p>Птица срывается с плеча — рваные перья, чернильный шлейф. Чёрное на чёрном, лишь клюв ловит свет.</p>
            <span className="sh-meta">плечо · 7 часов · dark-realism</span>
          </Layer>
          <Bookmark kind="gum" text="Запись" top="26vh" tone="paper" />
        </div>

        {/* 5 · «КРЕСТ» — коллаж-зин: ворон слетает с плеча в свою рамку (fade, непрерывность несёт птица) */}
        <div transition="fade" className="scene-body sh-collage">
          <div className="sh-paper" aria-hidden />
          <Layer z={3} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sh-col-grid">
            <figure className="sh-col sh-col-1" style={{ ["--thr" as string]: 0.06, ["--fly" as string]: "-46vw", ["--rot0" as string]: "-14deg" }}><SceneMedia src={`${A}/shadows-work-3.jpg`} alt="Работа «Крест» — реликварий blackwork на груди" share="w3" /><figcaption>03 · крест</figcaption></figure>
            <figure className="sh-col sh-col-2" style={{ ["--thr" as string]: 0.2, ["--fly" as string]: "0vw", ["--flyY" as string]: "60vh", ["--rot0" as string]: "10deg" }}><SceneMedia src={`${A}/shadows-work-1.jpg`} alt="Терновый нимб" share="w1" /><figcaption>01 · нимб</figcaption></figure>
            <figure className="sh-col sh-col-3" style={{ ["--thr" as string]: 0, ["--fly" as string]: "0vw", ["--flyY" as string]: "0px" }}><SceneMedia src={`${A}/shadows-work-2.jpg`} alt="Ворон" share="raven" className="sh-raven" /><figcaption>02 · ворон</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-col-copy sh-out">
            <span className="sh-folio">реликварий · архив</span>
            <h3>Крест<em>реликварий</em></h3>
            <span className="sh-meta">грудина · 8 часов · ornamental</span>
            <div className="sh-col-code" aria-hidden><span>|| ||| | |||| || |</span>4 890 597 187 84</div>
          </Layer>
          <Bookmark kind="bandage" text="Написать в Telegram" top="32vh" tone="ink" />
        </div>

        {/* 6 · «РЕЛИКВАРИЙ» — стена-шкаф: крест, нимб и ворон FLIP'ом занимают свои ячейки (wipe-y — лист зина переворачивается) */}
        <div transition="wipe-y" className="scene-body sh-wall">
          <div className="sh-wall-grid">
            <figure className="sh-tile sh-tile-a"><img src={`${A}/shadows-hero-b.jpg`} alt="Мастер Мара — портрет, blackwork" loading="lazy" data-share="mara" /><figcaption>Мара · портрет</figcaption></figure>
            <figure className="sh-tile sh-tile-b"><img src={`${A}/shadows-work-wide.jpg`} alt="Blackwork через спину и руку" loading="lazy" /><figcaption>пелена · спина</figcaption></figure>
            <figure className="sh-tile sh-tile-c"><img src={`${A}/shadows-tile-1.jpg`} alt="Оккульт-символы на костяшках" loading="lazy" /><figcaption>костяшки</figcaption></figure>
            <figure className="sh-tile sh-tile-d"><img src={`${A}/shadows-tile-2.jpg`} alt="Орнамент на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="sh-tile sh-tile-e"><img src={`${A}/shadows-work-3.jpg`} alt="Реликварий-крест на груди" loading="lazy" data-share="w3" /><figcaption>крест</figcaption></figure>
            <figure className="sh-tile sh-tile-f"><img src={`${A}/shadows-work-1.jpg`} alt="Терновый нимб на спине" loading="lazy" data-share="w1" /><figcaption>нимб · спина</figcaption></figure>
            <figure className="sh-tile sh-tile-g"><img src={`${A}/shadows-work-2.jpg`} alt="Ворон на плече" loading="lazy" data-share="raven" className="sh-raven" /><figcaption>ворон</figcaption></figure>
            <figure className="sh-tile sh-tile-h"><img src={`${A}/shadows-tile-3.jpg`} alt="Кинжал и терн на голени" loading="lazy" /><figcaption>кинжал</figcaption></figure>
          </div>
          <div className="sh-wall-cap sh-out"><b>реликварий</b> · выборка · 2019—2026</div>
          <Bookmark kind="sock" text="Смотреть все" top="40vh" tone="paper" />
        </div>

        {/* 7 · ФИНАЛ — рассвет: костяная бумага зина, портрет Мары со стены, ворон садится рядом (wipe-x — последний лист) */}
        <div transition="wipe-x" className="scene-body sh-final">
          <div className="sh-final-bg" aria-hidden />
          <div className="sh-xrow sh-xbig" aria-hidden>✕ ✕ ✕</div>
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ scale: 1.03 }} to={{ scale: 1 }} className="sh-final-hero">
            <figure className="sh-final-print"><img src={`${A}/shadows-hero-b.jpg`} alt="Мара Тень — мастер оккульт-флэша" loading="lazy" data-share="mara" /></figure>
            <figure className="sh-final-raven"><img src={`${A}/shadows-work-2.jpg`} alt="Ворон — талисман студии" loading="lazy" data-share="raven" className="sh-raven" /><figcaption>✕ ворон · 02</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.4, 0.98]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-final-copy">
            <span className="sh-eyebrow">последний лист</span>
            <h2>Готов носить<br /><em>тьму</em>?</h2>
            <p>Пишу мало, беру серьёзные вещи. Расскажи, что хочешь оставить навсегда.</p>
          </Layer>
          <Layer z={7} depth={0.2} phase={[0.55, 1]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sh-final-cta">
            <div className="sh-final-cta-in">
              <a href="#" onClick={stop} className="sh-btn">Записаться <i>✕</i></a>
              <div className="sh-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
              <div className="sh-sign">М.ТЕНЬ · Мара Тень · оккульт-флэш · Санкт-Петербург</div>
            </div>
          </Layer>
        </div>
      </StageDeck>
    </div>
  );
}
