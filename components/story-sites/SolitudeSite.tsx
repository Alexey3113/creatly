"use client";
/* STORY 03 — SOLITUDE «Лия Морн». Ренессанс-портрет в техно-оправе. Снап-дек: один жест = следующий
   файл, скролл заблокирован на время анимации. Свои кадры (solitude-hero-a). Русский. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StoryDeck } from "./StoryDeck";
import { Bookmark } from "./bookmarks";
import "@/components/parallax-scene/parallax-scene.css";
import "./story.css";
import "./solitude.css";

const A = "/uploads/1/story/tatoo";
const stop = (e: React.MouseEvent) => e.preventDefault();

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

      <StoryDeck>
        {/* ОБЛОЖКА — постер-коллаж: вордмарк-окклюзия + cutout + техно-орнамент */}
        <div className="deck-slide so-scene so-cover">
          <div className="so-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ scale: 1.12, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="so-wordmark"><span aria-hidden>SOLITUDE</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.08 }} to={{ y: "0vh", scale: 1 }} className="so-cover-fig">
            <SceneMedia src={`${A}/solitude-hero-a-cut.png`} alt="Мастер Лия Морн — ренессанс-портрет с орнамент-тату" />
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
          <Layer z={6} depth={0.3} phase={[0.06, 0.6]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-cover-hi">
            <span className="so-eyebrow">experiment 404 · fine-line</span>
            <h1>Здравствуй.<br />Я <em>Лия</em>.</h1>
            <p>Классическая линия в цифровой оправе. Это мой каталог — листай, страницы проявляются под сканером.</p>
          </Layer>
          <div className="so-grain" aria-hidden />
          <div className="so-scrollcue" aria-hidden>scan&nbsp;<i>↓</i></div>
        </div>

        {/* РАЗВОРОТ 01 — манифест */}
        <div className="deck-slide so-scene so-spread so-s1">
          <div className="so-paper" aria-hidden />
          <Layer z={4} depth={0.34} phase={[0.02, 0.95]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-scan so-scan-a">
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

        {/* РАЗВОРОТ 02 — «Портрет» · архетип МУЗЕЙНАЯ РАМКА-МОНУМЕНТ */}
        <div className="deck-slide so-scene so-mono">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="so-mono-fig">
            <SceneMedia src={`${A}/solitude-work-1.jpg`} alt="Работа «Портрет» — тонкое орнаментальное тату на плече" />
          </Layer>
          <div className="so-mono-frame" aria-hidden />
          <div className="so-mono-veil" aria-hidden />
          <div className="so-mono-badge" aria-hidden>[ + ]</div>
          <div className="so-mono-idx" aria-hidden>01</div>
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-mono-cap">
            <span className="so-folio">каталог · 01 · музей</span>
            <h3>Портрет<em>profil</em></h3>
            <p>Профиль музы одной линией — ни одного отрыва иглы. Барочный локон, опущенный взгляд.</p>
            <span className="so-meta">предплечье · 3 часа · single-line</span>
          </Layer>
          <Bookmark kind="briefs" text="Связаться" top="30vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 03 — «Роза» · архетип МАКРО */}
        <div className="deck-slide so-scene so-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12, x: "2vw" }} to={{ scale: 1.02, x: "0vw" }} className="so-macro-fig">
            <SceneMedia src={`${A}/solitude-work-3.jpg`} alt="Работа «Роза» — макро fine-line dotwork-розы на сгибе локтя" />
          </Layer>
          <div className="so-macro-scan" aria-hidden />
          <div className="so-macro-huge" aria-hidden>РОЗА</div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-macro-cap">
            <span className="so-folio">каталог · 02 · макро</span>
            <p>Тайная роза на сгибе — символ молчания. Тонкий контур, точечная тень, ни капли заливки.</p>
            <span className="so-meta">локоть · 4 часа · dotwork</span>
          </Layer>
          <Bookmark kind="tape" text="Запись" top="26vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 04 — «Фреска» · архетип ПАНОРАМА (landscape во всю ширину) */}
        <div className="deck-slide so-scene so-pano">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.12, x: "-2vw" }} to={{ scale: 1, x: "0vw" }} className="so-pano-fig">
            <SceneMedia src={`${A}/solitude-work-wide.jpg`} alt="Работа «Фреска» — панорамное fine-line тату через плечи в ренессанс-свете" />
          </Layer>
          <div className="so-pano-bars" aria-hidden />
          <div className="so-pano-word" aria-hidden>Фреска<em>al fresco</em></div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-pano-cap">
            <span className="so-folio">разворот · музейный</span>
            <p>Орнамент течёт через плечи и ключицы, как роспись по своду — самый крупный лист каталога, во всю ширину.</p>
            <span className="so-meta">плечи · 10 часов · fine-line</span>
          </Layer>
          <Bookmark kind="condom" text="Написать мастеру" top="28vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 05 — «Жемчуг» · архетип КАТАЛОЖНЫЙ-ЛИСТ */}
        <div className="deck-slide so-scene so-collage">
          <div className="so-paper" aria-hidden />
          <Layer z={3} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-col-grid">
            <figure className="so-col so-col-1" style={{ ["--thr" as string]: 0.04, ["--fly" as string]: "-60vw", ["--rot0" as string]: "-18deg" }}><SceneMedia src={`${A}/solitude-work-1.jpg`} alt="Орнаментальное тату на плече" /><figcaption>01 · портрет</figcaption></figure>
            <figure className="so-col so-col-2" style={{ ["--thr" as string]: 0.18, ["--fly" as string]: "56vw", ["--rot0" as string]: "15deg" }}><SceneMedia src={`${A}/solitude-work-2.jpg`} alt="Профиль музы одной линией" /><figcaption>03 · профиль</figcaption></figure>
            <figure className="so-col so-col-3" style={{ ["--thr" as string]: 0.32, ["--fly" as string]: "46vw", ["--rot0" as string]: "-12deg" }}><SceneMedia src={`${A}/solitude-work-3.jpg`} alt="Dotwork-роза" /><figcaption>02 · роза</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.05, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="so-col-copy">
            <div className="so-col-badges" aria-hidden><span>[ + ]</span><span>WAV</span><span>✦</span></div>
            <span className="so-folio">каталог · exp.404</span>
            <h3>Жемчуг<em>collier</em></h3>
            <span className="so-meta">ключица · 5 часов · micro-realism</span>
            <div className="so-col-code" aria-hidden>P4a* (0.5%) 00.504.55</div>
          </Layer>
          <Bookmark kind="gum" text="Написать в Telegram" top="32vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 06 — «Архив» · архетип БЕНТО-СТЕНА (мозаика работ) */}
        <div className="deck-slide so-scene so-wall">
          <div className="so-wall-grid">
            <figure className="so-tile so-tile-a"><img src={`${A}/solitude-hero-b.jpg`} alt="Мастер Лия Морн — ренессанс-портрет" loading="lazy" /><figcaption>Лия · портрет</figcaption></figure>
            <figure className="so-tile so-tile-b"><img src={`${A}/solitude-work-wide.jpg`} alt="Fine-line орнамент через плечи" loading="lazy" /><figcaption>фреска · плечи</figcaption></figure>
            <figure className="so-tile so-tile-c"><img src={`${A}/solitude-tile-1.jpg`} alt="Кольца fine-line на пальцах" loading="lazy" /><figcaption>пальцы</figcaption></figure>
            <figure className="so-tile so-tile-d"><img src={`${A}/solitude-tile-2.jpg`} alt="Орнамент на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="so-tile so-tile-e"><img src={`${A}/solitude-work-3.jpg`} alt="Dotwork-роза на локте" loading="lazy" /><figcaption>роза</figcaption></figure>
            <figure className="so-tile so-tile-f"><img src={`${A}/solitude-work-1.jpg`} alt="Орнаментальное тату на плече" loading="lazy" /><figcaption>портрет · плечо</figcaption></figure>
            <figure className="so-tile so-tile-g"><img src={`${A}/solitude-work-2.jpg`} alt="Профиль музы одной линией" loading="lazy" /><figcaption>профиль</figcaption></figure>
            <figure className="so-tile so-tile-h"><img src={`${A}/solitude-tile-3.jpg`} alt="Ботаника fine-line на щиколотке" loading="lazy" /><figcaption>щиколотка</figcaption></figure>
          </div>
          <div className="so-wall-cap"><b>каталог</b> · выборка · exp.404</div>
          <Bookmark kind="bandage" text="Смотреть все" top="40vh" tone="ink" />
        </div>

        {/* ФИНАЛ */}
        <div className="deck-slide so-scene so-final">
          <div className="so-final-bg" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="so-final-copy">
            <span className="so-eyebrow">последний файл · 404</span>
            <h2>Соберём <em>твой</em><br />портрет?</h2>
            <p>Работаю вдумчиво, по записи. Пришли референс — отвечу с эскизом.</p>
          </Layer>
          <div className="so-final-cta">
            <a href="#" onClick={stop} className="so-btn">Записаться <i>↗</i></a>
            <div className="so-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
            <div className="so-sign">L · MORN · Лия Морн · fine-line · Москва · exp.404</div>
          </div>
        </div>
      </StoryDeck>
    </div>
  );
}
