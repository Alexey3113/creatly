"use client";
/* STORY 01 — VISION «Ева Зорина». Глянцевый editorial: розовое стекло на чёрном.
   Снап-дек: один скролл = следующий разворот, скролл заблокирован на время анимации входа.
   Русский. Изображения — свои (см. /uploads/1/story/tatoo/vision-*). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StoryDeck } from "./StoryDeck";
import { Bookmark } from "./bookmarks";
import "@/components/parallax-scene/parallax-scene.css";
import "./story.css";
import "./vision.css";

const A = "/uploads/1/story/tatoo";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function VisionSite() {
  return (
    <div className="vs-site">
      <header className="vs-head">
        <Link href="/story" className="vs-brand">E.Z<i>studio</i></Link>
        <nav className="vs-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Мастер</a>
          <a href="#" onClick={stop}>Работы</a>
          <a href="#" onClick={stop} className="vs-cta">Запись</a>
        </nav>
      </header>

      <StoryDeck>
        {/* ОБЛОЖКА — постер-коллаж: вордмарк-окклюзия + cutout-фигура + орнаменты + зерно */}
        <div className="deck-slide vs-scene vs-cover">
          <div className="vs-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ scale: 1.12, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="vs-wordmark"><span aria-hidden>VISION</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.08 }} to={{ y: "0vh", scale: 1 }} className="vs-cover-fig">
            <SceneMedia src={`${A}/vision-hero-a-cut.png`} alt="Мастер Ева Зорина — портрет с розовым стеклом и тату" />
          </Layer>
          <div className="vs-orn" aria-hidden>
            <span className="vs-orn-tl">AESTHETIC<br />STUDIO</span>
            <span className="vs-orn-tr">коллекция<br />2026</span>
            <span className="vs-orn-lm">design<br />is not<br />what it<br />looks like</span>
            <span className="vs-orn-rm">it is<br />how it<br />makes<br />you feel</span>
            <span className="vs-orn-star vs-orn-s1">✦</span><span className="vs-orn-star vs-orn-s2">✦</span>
            <span className="vs-orn-no">04</span>
            <span className="vs-orn-cap">— imagination shapes skin —</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.06, 0.6]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-cover-hi">
            <span className="vs-eyebrow">тату-студия · 2026</span>
            <h1>Привет.<br />Я <em>Ева</em>.</h1>
            <p>Делаю тату как розовое стекло по коже. Это мой журнал — листай, и каждая страница откроет новую работу.</p>
          </Layer>
          <div className="vs-grain" aria-hidden />
          <div className="vs-scrollcue" aria-hidden>листай&nbsp;<i>↓</i></div>
        </div>

        {/* РАЗВОРОТ 01 — манифест */}
        <div className="deck-slide vs-scene vs-spread vs-s1">
          <div className="vs-paper" aria-hidden />
          <Layer z={4} depth={0.34} phase={[0.05, 0.95]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-turn vs-turn-a">
            <span className="vs-folio">— 01 —</span>
            <h2>Кожа —<br />это <em>витраж</em>.</h2>
            <p>Семь лет собираю свет в линии. Тонкая графика, розовый пигмент, стеклянные блики — тату, которое хочется рассматривать на просвет.</p>
            <ul className="vs-facts">
              <li><b>7</b><span>лет практики</span></li>
              <li><b>300+</b><span>работ</span></li>
              <li><b>1</b><span>клиент в день</span></li>
            </ul>
          </Layer>
          <Bookmark kind="sock" text="Написать мастеру" top="26vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 02 — «Стекло» · архетип МОНУМЕНТ-ПОРТРЕТ (кадр во весь экран + подпись с края) */}
        <div className="deck-slide vs-scene vs-mono">
          <Layer z={1} depth={0.14} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1 }} className="vs-mono-fig">
            <SceneMedia src={`${A}/vision-work-1.jpg`} alt="Работа «Стекло» — ботаническое стеклянное тату на предплечье" />
          </Layer>
          <div className="vs-mono-veil" aria-hidden />
          <div className="vs-mono-idx" aria-hidden>01</div>
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-mono-cap">
            <span className="vs-folio">работа 01 · монумент</span>
            <h3>Стекло<em>flora</em></h3>
            <p>Прозрачный цветок, будто выплавленный из кожи. Ботаническая линия + розовые блики.</p>
            <span className="vs-meta">предплечье · 4 часа · fine-line</span>
          </Layer>
          <Bookmark kind="briefs" text="Связаться" top="30vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 03 — «Шипы» · архетип МАКРО-ТАТУ (огромный фрагмент, тонкая подпись) */}
        <div className="deck-slide vs-scene vs-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.14, x: "3vw" }} to={{ scale: 1.02, x: "0vw" }} className="vs-macro-fig">
            <SceneMedia src={`${A}/vision-work-2.jpg`} alt="Работа «Шипы» — макро чёрной тонкой ветки-тату на плече" />
          </Layer>
          <div className="vs-macro-scan" aria-hidden />
          <div className="vs-macro-huge" aria-hidden>ШИПЫ</div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-macro-cap">
            <span className="vs-folio">работа 02 · макро</span>
            <p>Одна ветка через всё предплечье — жёсткая ось и мягкие иглы. Чёрный контур, розовый по кромке.</p>
            <span className="vs-meta">плечо → кисть · 6 часов · blackline</span>
          </Layer>
          <Bookmark kind="condom" text="Записаться" top="24vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 04 — «Хребет» · архетип ПАНОРАМА (landscape во всю ширину) */}
        <div className="deck-slide vs-scene vs-pano">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.12, x: "-2vw" }} to={{ scale: 1, x: "0vw" }} className="vs-pano-fig">
            <SceneMedia src={`${A}/vision-work-wide.jpg`} alt="Работа «Хребет» — панорамное стеклянно-крылатое тату вдоль спины" />
          </Layer>
          <div className="vs-pano-bars" aria-hidden />
          <div className="vs-pano-word" aria-hidden>Хребет<em>panorama</em></div>
          <Layer z={6} depth={0.2} phase={[0.06, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-pano-cap">
            <span className="vs-folio">разворот · во всю ширину</span>
            <p>Разворот на всю спину: крылья из стекла раскрываются от лопатки к лопатке — самая крупная работа в архиве.</p>
            <span className="vs-meta">спина · 9 часов · fine-line glass</span>
          </Layer>
          <Bookmark kind="gum" text="Написать мастеру" top="28vh" tone="ink" />
        </div>

        {/* РАЗВОРОТ 05 — «Крыло» · архетип КОЛЛАЖ-АРХИВ (разнокалиберные кадры внахлёст + номера) */}
        <div className="deck-slide vs-scene vs-collage">
          <div className="vs-paper" aria-hidden />
          <Layer z={3} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-col-grid">
            <figure className="vs-col vs-col-1" style={{ ["--thr" as string]: 0.04, ["--fly" as string]: "-62vw", ["--rot0" as string]: "-20deg" }}><SceneMedia src={`${A}/vision-work-3.jpg`} alt="Работа «Крыло» — стеклянное тату на лопатке" /><figcaption>03 · крыло</figcaption></figure>
            <figure className="vs-col vs-col-2" style={{ ["--thr" as string]: 0.18, ["--fly" as string]: "58vw", ["--rot0" as string]: "16deg" }}><SceneMedia src={`${A}/vision-work-1.jpg`} alt="Ботаническое стеклянное тату" /><figcaption>01 · стекло</figcaption></figure>
            <figure className="vs-col vs-col-3" style={{ ["--thr" as string]: 0.32, ["--fly" as string]: "48vw", ["--rot0" as string]: "-14deg" }}><SceneMedia src={`${A}/vision-work-2.jpg`} alt="Макро ветки-тату" /><figcaption>02 · шипы</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.05, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-col-copy">
            <span className="vs-folio">архив · 2023—2026</span>
            <h3>Крыло<em>осколки</em></h3>
            <span className="vs-meta">лопатка · 5 часов · glass-work</span>
          </Layer>
          <Bookmark kind="bandage" text="Написать в Telegram" top="32vh" tone="paper" />
        </div>

        {/* РАЗВОРОТ 06 — «Архив» · архетип БЕНТО-СТЕНА (мозаика работ) */}
        <div className="deck-slide vs-scene vs-wall">
          <div className="vs-wall-grid">
            <figure className="vs-tile vs-tile-a"><img src={`${A}/vision-hero-b.jpg`} alt="Мастер Ева — портрет со стеклянными тату" loading="lazy" /><figcaption>Ева · портрет</figcaption></figure>
            <figure className="vs-tile vs-tile-b"><img src={`${A}/vision-work-wide.jpg`} alt="Стеклянные крылья во всю спину" loading="lazy" /><figcaption>хребет · спина</figcaption></figure>
            <figure className="vs-tile vs-tile-c"><img src={`${A}/vision-tile-1.jpg`} alt="Стеклянный браслет на запястьях" loading="lazy" /><figcaption>кисти</figcaption></figure>
            <figure className="vs-tile vs-tile-d"><img src={`${A}/vision-tile-2.jpg`} alt="Стеклянная бабочка на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="vs-tile vs-tile-e"><img src={`${A}/vision-work-3.jpg`} alt="Стеклянное крыло на лопатке" loading="lazy" /><figcaption>крыло</figcaption></figure>
            <figure className="vs-tile vs-tile-f"><img src={`${A}/vision-work-1.jpg`} alt="Ботаническое стекло на предплечье" loading="lazy" /><figcaption>стекло · рука</figcaption></figure>
            <figure className="vs-tile vs-tile-g"><img src={`${A}/vision-work-2.jpg`} alt="Терновая ветвь на плече" loading="lazy" /><figcaption>шипы</figcaption></figure>
            <figure className="vs-tile vs-tile-h"><img src={`${A}/vision-hero-a.jpg`} alt="Мастер Ева — деталь портрета" loading="lazy" /><figcaption>студия</figcaption></figure>
          </div>
          <div className="vs-wall-cap"><b>архив</b> · выборка работ · 2023—2026</div>
          <Bookmark kind="tape" text="Смотреть все" top="40vh" tone="ink" />
        </div>

        {/* ФИНАЛ — запись */}
        <div className="deck-slide vs-scene vs-final">
          <div className="vs-final-bg" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.05, 0.7]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-final-copy">
            <span className="vs-eyebrow">последняя страница</span>
            <h2>Хочешь <em>свет</em><br />на коже?</h2>
            <p>Пишу редко, беру по одному в день. Расскажи идею — соберём эскиз.</p>
          </Layer>
          <div className="vs-final-cta">
            <a href="#" onClick={stop} className="vs-btn">Записаться <i>↗</i></a>
            <div className="vs-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
            <div className="vs-sign">E.Z STUDIO · Ева Зорина · Москва</div>
          </div>
        </div>
      </StoryDeck>
    </div>
  );
}
