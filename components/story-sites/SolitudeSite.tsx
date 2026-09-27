"use client";
/* STORY 03 — SOLITUDE «Лия Морн». Ренессанс-портрет в техно-оправе. Русский. Движок StageDeck.
   ЗАКОН КАМЕРЫ — «свет свечи и жемчуг»:
     обложка: портрет рядом с названием, в золотой техно-раме; прицел сканера на чёрной жемчужине кулона
     → iris ровно из жемчужины: она вырастает в макро «Жемчуг collier» (data-share="pearl")
     → сканер (wipe-y с золотой линией) проявляет метод → zoom в музейную раму «Портрета»
     → wipe-x на «Розу»: у свечи загорается пламя (data-share="flame")
     → push: пламя переезжает в канделябр «Фрески» — вспышка дуги, зал заливает тёплым светом
     → fade: фреска садится в свою ячейку каталога, пламя — на свечу у руки
     → push: портрет Лии со стены в финал, пламя свечи поднимается и становится рассветом.
   Световая дуга: тёмное золото → вспышка канделябра → рассвет. */
import Link from "next/link";
import type { CSSProperties } from "react";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./stage/StageDeck";
import { Bookmark } from "./bookmarks";
import "@/components/parallax-scene/parallax-scene.css";
import "./story.css";
import "./solitude.css";

const A = "/uploads/1/story/tatoo";
const stop = (e: React.MouseEvent) => e.preventDefault();
const at = (x: number, y: number, w: number) => ({ left: `${x}%`, top: `${y}%`, width: `${w}%` }) as CSSProperties;

/* жемчужина: круглое окно в solitude-hero-a.jpg; кроп задан в долях окна → одинаков на любом размере (для FLIP) */
function Pearl({ className }: { className: string }) {
  return (
    <span className={`so-pearl ${className}`} data-share="pearl" aria-hidden>
      <img src={`${A}/solitude-hero-a.jpg`} alt="" loading="lazy" draggable={false} />
    </span>
  );
}

export function SolitudeSite() {
  return (
    <div className="so-site">
      <header className="so-head">
        <Link href="/story" className="so-brand">L·MORN<i>404</i></Link>
        <nav className="so-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Мастер</a>
          <a href="#" onClick={stop}>Работы</a>
          <a href="#" onClick={stop} className="so-cta">Запись</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · ОБЛОЖКА — название столбцом слева, портрет справа в золотой техно-раме (голова выходит за раму) */}
        <div transition="fade" className="scene-body so-cover">
          <div className="so-cover-bg" aria-hidden />
          <div className="so-cover-frame" aria-hidden><i /><i /><i /><i /></div>
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="so-wordmark"><span aria-hidden>SOLI<br />TUDE</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="so-cover-fig">
            <div className="so-fig-box">
              <SceneMedia src={`${A}/solitude-hero-a-cut.png`} alt="Мастер Лия Морн — ренессанс-портрет с орнамент-тату" />
              <span className="so-reticle" aria-hidden />
              <Pearl className="so-pearl-cover" />
            </div>
          </Layer>
          <div className="so-orn" aria-hidden>
            <span className="so-orn-tl"><b>◈ DOLBY</b> · WAV · MP3</span>
            <span className="so-orn-tr">experiment<br />404</span>
            <span className="so-orn-lm">[ + ]&nbsp;&nbsp;[ + ]<br />solitude</span>
            <span className="so-orn-rm">старое<br />в новой<br />оправе</span>
            <span className="so-orn-bar">P4a* (0.5%) 00.504.55</span>
            <span className="so-orn-star">✦ ✦ ✦</span>
            <span className="so-orn-no">01</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-cover-hi so-out">
            <span className="so-eyebrow">experiment 404 · fine-line</span>
            <h1>Здравствуй.<br />Я <em>Лия</em>.</h1>
            <p>Классическая линия в цифровой оправе. Это мой каталог — листай, страницы проявляются под сканером.</p>
          </Layer>
          <div className="so-grain" aria-hidden />
          <div className="so-scrollcue so-out" aria-hidden>scan&nbsp;<i>↓</i></div>
        </div>

        {/* 1 · «ЖЕМЧУГ» — iris ровно из жемчужины кулона: она вырастает в макро на бархате */}
        <div transition="iris" className="scene-body so-pearlscene">
          <div className="so-velvet" aria-hidden />
          <div className="so-macro-ring" aria-hidden><span>[ + ]</span><span>×3.0</span><span>00.504.55</span></div>
          <Pearl className="so-pearl-macro" />
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ x: "-24px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="so-pearl-copy so-out">
            <div className="so-col-badges" aria-hidden><span>[ + ]</span><span>WAV</span><span>✦</span></div>
            <span className="so-folio">каталог · exp.404</span>
            <h3>Жемчуг<em>collier</em></h3>
            <span className="so-meta">ключица · 5 часов · micro-realism</span>
            <div className="so-col-code" aria-hidden>P4a* (0.5%) 00.504.55</div>
          </Layer>
          <Bookmark kind="gum" text="Написать в Telegram" top="32vh" tone="ink" />
        </div>

        {/* 2 · МЕТОД — wipe-y: золотая линия сканера проявляет файл снизу вверх */}
        <div transition="wipe-y" className="scene-body so-method">
          <div className="so-paper" aria-hidden />
          <div className="so-method-404 so-out" aria-hidden>404</div>
          <Layer z={4} depth={0.34} phase={[0.3, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-scan-a so-out">
            <div className="so-techrow" aria-hidden><span>[ + ]</span><span>[ + ]</span><span>SOLITUDE</span><span>00.504.55</span></div>
            <span className="so-folio">файл 01 — метод</span>
            <h2>Старое<br /><em>в новой</em> оправе.</h2>
            <p>Беру язык старых мастеров — свет, драпировку, покой — и печатаю его тонкой иглой. Между линиями оставляю воздух, как на портрете.</p>
            <ul className="so-facts">
              <li><b>404</b><span>эскизов в архиве</span></li>
              <li><b>12</b><span>лет у иглы</span></li>
              <li><b>fine</b><span>только тонкая линия</span></li>
            </ul>
          </Layer>
          <Bookmark kind="sock" text="Написать мастеру" top="24vh" tone="paper" />
        </div>

        {/* 3 · «ПОРТРЕТ» — zoom в музейную раму: профиль музы одной линией */}
        <div transition="zoom" className="scene-body so-mono">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="so-mono-fig">
            <SceneMedia src={`${A}/solitude-work-2.jpg`} alt="Работа «Портрет» — профиль музы одной линией на предплечье" />
          </Layer>
          <div className="so-mono-frame" aria-hidden />
          <div className="so-mono-veil" aria-hidden />
          <div className="so-mono-badge" aria-hidden>[ + ]</div>
          <div className="so-mono-idx so-out" aria-hidden>01</div>
          <Layer z={6} depth={0.24} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-mono-cap so-out">
            <span className="so-folio">каталог · 01 · музей</span>
            <h3>Портрет<em>profil</em></h3>
            <p>Профиль музы одной линией — ни одного отрыва иглы. Барочный локон, опущенный взгляд.</p>
            <span className="so-meta">предплечье · 3 часа · single-line</span>
          </Layer>
          <Bookmark kind="briefs" text="Связаться" top="30vh" tone="ink" />
        </div>

        {/* 4 · «РОЗА» — wipe-x (лист каталога): кадр целиком в высокой панели, у свечи загорается пламя */}
        <div transition="wipe-x" className="scene-body so-rose">
          <div className="so-rose-bg" aria-hidden />
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ y: "4vh" }} to={{ y: "0vh" }} className="so-rose-fig">
            <div className="so-rose-box">
              <SceneMedia src={`${A}/solitude-work-3.jpg`} alt="Работа «Роза» — макро fine-line dotwork-розы на сгибе локтя" />
              <span className="so-flame" data-share="flame" style={at(3.4, 12.6, 30)} aria-hidden />
            </div>
          </Layer>
          <div className="so-rose-huge so-out" aria-hidden>РОЗА</div>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-rose-cap so-out">
            <span className="so-folio">каталог · 02 · макро</span>
            <p>Тайная роза на сгибе — символ молчания. Тонкий контур, точечная тень, ни капли заливки.</p>
            <span className="so-meta">локоть · 4 часа · dotwork</span>
          </Layer>
          <Bookmark kind="tape" text="Запись" top="26vh" tone="paper" />
        </div>

        {/* 5 · «ФРЕСКА» — push по тому же мотиву (свеча → канделябр): пламя садится в канделябр, вспышка дуги */}
        <div transition="push" className="scene-body so-fresco">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.04 }} to={{ scale: 1 }} className="so-fresco-fig">
            <div className="so-cbox">
              <SceneMedia src={`${A}/solitude-work-wide.jpg`} alt="Работа «Фреска» — панорамное fine-line тату через плечи в ренессанс-свете" share="fresco" />
              <span className="so-flame" data-share="flame" style={at(44.6, 13.4, 13)} aria-hidden />
            </div>
          </Layer>
          <div className="so-bloom" aria-hidden />
          <div className="so-fresco-veil" aria-hidden />
          <div className="so-fresco-word so-out" aria-hidden>Фреска<em>al fresco</em></div>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-fresco-cap so-out">
            <span className="so-folio">разворот · музейный</span>
            <p>Орнамент течёт через плечи и ключицы, как роспись по своду — самый крупный лист каталога, во всю ширину.</p>
            <span className="so-meta">плечи · 10 часов · fine-line</span>
          </Layer>
          <Bookmark kind="condom" text="Написать мастеру" top="28vh" tone="ink" />
        </div>

        {/* 6 · «КАТАЛОГ» — развеска салона: фреска FLIP'ом в свою ячейку, пламя — на свечу у руки */}
        <div transition="fade" className="scene-body so-wall">
          <div className="so-wall-grid">
            <figure className="so-tile so-tile-a"><img src={`${A}/solitude-hero-b.jpg`} alt="Мастер Лия Морн — ренессанс-портрет" loading="lazy" data-share="liya" /><figcaption>Лия · портрет</figcaption></figure>
            <figure className="so-tile so-tile-b"><img src={`${A}/solitude-work-wide.jpg`} alt="Fine-line орнамент через плечи" loading="lazy" data-share="fresco" /><figcaption>фреска · плечи</figcaption></figure>
            <figure className="so-tile so-tile-c"><img src={`${A}/solitude-tile-1.jpg`} alt="Кольца fine-line на пальцах" loading="lazy" /><span className="so-flame so-flame-tile" data-share="flame" aria-hidden /><figcaption>пальцы</figcaption></figure>
            <figure className="so-tile so-tile-d"><img src={`${A}/solitude-tile-2.jpg`} alt="Орнамент на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="so-tile so-tile-e"><img src={`${A}/solitude-work-3.jpg`} alt="Dotwork-роза на локте" loading="lazy" /><figcaption>роза</figcaption></figure>
            <figure className="so-tile so-tile-f"><img src={`${A}/solitude-work-1.jpg`} alt="Орнаментальное тату на плече" loading="lazy" /><figcaption>портрет · плечо</figcaption></figure>
            <figure className="so-tile so-tile-g"><img src={`${A}/solitude-work-2.jpg`} alt="Профиль музы одной линией" loading="lazy" /><figcaption>профиль</figcaption></figure>
            <figure className="so-tile so-tile-h"><img src={`${A}/solitude-tile-3.jpg`} alt="Ботаника fine-line на щиколотке" loading="lazy" /><figcaption>щиколотка</figcaption></figure>
          </div>
          <div className="so-wall-cap so-out"><b>каталог</b> · выборка · exp.404</div>
          <Bookmark kind="bandage" text="Смотреть все" top="40vh" tone="ink" />
        </div>

        {/* 7 · ФИНАЛ — рассвет: портрет Лии из стены в раму, пламя свечи поднимается и становится солнцем рассвета */}
        <div transition="push" className="scene-body so-final">
          <div className="so-final-bg" aria-hidden />
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ scale: 1.03 }} to={{ scale: 1 }} className="so-final-hero">
            <figure className="so-final-frame"><img src={`${A}/solitude-hero-b.jpg`} alt="Лия Морн — мастер fine-line" loading="lazy" data-share="liya" /></figure>
            <span className="so-flame so-flame-dawn" data-share="flame" aria-hidden />
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.4, 0.98]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-final-copy">
            <span className="so-eyebrow">последний файл · 404</span>
            <h2>Соберём <em>твой</em><br />портрет?</h2>
            <p>Работаю вдумчиво, по записи. Пришли референс — отвечу с эскизом.</p>
            <div className="so-final-cta-in">
              <a href="#" onClick={stop} className="so-btn">Записаться <i>↗</i></a>
              <div className="so-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
              <div className="so-sign">L · MORN · Лия Морн · fine-line · Москва · exp.404</div>
            </div>
          </Layer>
        </div>
      </StageDeck>
    </div>
  );
}
