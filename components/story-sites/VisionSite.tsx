"use client";
/* STORY 01 — VISION «Ева Зорина». Глянцевый editorial: розовое стекло на чёрном. Русский.
   Движок StageDeck (переход ведёт зритель скраб+доводка, обложка собирается при загрузке).
   ЗАКОН КАМЕРЫ — «розовое стекло»: линза с цветка на лице Евы (data-share="lens") — глаз камеры,
   она перетекает на каждую работу:
     обложка → iris из линзы: камера входит ВНУТРЬ стекла (розовая вспышка, манифест)
     → стекло стягивается в лупу на цветке «Стекла» (fade) → по линии ветки на розу «Шипов» (wipe-x)
     → по линии позвоночника на «Хребет» (wipe-y) → панорама и лупа уходят в коллаж «Крыла» (fade)
     → четыре работы FLIP'ом собираются в стену архива (push) → портрет Евы из стены в финал (push),
     линза возвращается к её лицу.
   Световая дуга: тьма обложки → розовая вспышка «внутри стекла» → работы → рассвет финала. */
import Link from "next/link";
import type { CSSProperties } from "react";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./stage/StageDeck";
import { Bookmark } from "./bookmarks";
import "@/components/parallax-scene/parallax-scene.css";
import "./story.css";
import "./vision.css";

const A = "/uploads/1/story/tatoo";
const stop = (e: React.MouseEvent) => e.preventDefault();
/* кадр с object-fit:cover, но в явной коробке — линза стоит в долях КАДРА (ar = ширина/высота файла) */
const box = (ar: number, ox: number, oy: number) => ({ ["--ar"]: ar, ["--ox"]: ox, ["--oy"]: oy }) as CSSProperties;
/* линза: центр и диаметр в долях коробки кадра */
const at = (x: number, y: number, w: number) => ({ left: `${x}%`, top: `${y}%`, width: `${w}%` }) as CSSProperties;
const PORTRAIT = 1536 / 2752;
const WIDE = 2752 / 1536;

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

      <StageDeck>
        {/* 0 · ОБЛОЖКА — вордмарк в верхней трети (фигура закрывает ≤1 буквы), линза на стеклянном цветке у глаза */}
        <div transition="fade" className="scene-body vs-cover">
          <div className="vs-cover-bg" aria-hidden />
          <Layer z={1} depth={0.06} phase={[0, 0.9]} from={{ scale: 1.1, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="vs-wordmark"><span aria-hidden>VISION</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "6vh", scale: 1.06 }} to={{ y: "0vh", scale: 1 }} className="vs-cover-fig">
            <div className="vs-fig-box">
              <SceneMedia src={`${A}/vision-hero-a-cut.png`} alt="Мастер Ева Зорина — портрет с розовым стеклом и тату" />
              <span className="vs-lens vs-lens-cover" data-share="lens" aria-hidden />
            </div>
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
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-cover-hi vs-out">
            <span className="vs-eyebrow">тату-студия · 2026</span>
            <h1>Привет.<br />Я <em>Ева</em>.</h1>
            <p>Делаю тату как розовое стекло по коже. Это мой журнал — листай, и каждая страница откроет новую работу.</p>
          </Layer>
          <div className="vs-grain" aria-hidden />
          <div className="vs-scrollcue vs-out" aria-hidden>листай&nbsp;<i>↓</i></div>
        </div>

        {/* 1 · ВНУТРИ СТЕКЛА — iris из круглой линзы: вспышка дуги, манифест на розовом стекле */}
        <div transition="iris" className="scene-body vs-flash">
          <div className="vs-flash-bg" aria-hidden />
          <span className="vs-lens vs-lens-world" data-share="lens" aria-hidden />
          <div className="vs-flash-streaks" aria-hidden />
          <div className="vs-flash-word vs-out" aria-hidden>витраж</div>
          <Layer z={4} depth={0.34} phase={[0.3, 0.98]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-turn vs-turn-a vs-out">
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

        {/* 2 · «СТЕКЛО» — монумент: стекло стягивается в лупу на цветке, подпись с правого края */}
        <div transition="fade" className="scene-body vs-mono">
          <Layer z={1} depth={0.14} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="vs-mono-fig">
            <div className="vs-cbox" style={box(PORTRAIT, 0.5, 0.55)}>
              <SceneMedia src={`${A}/vision-work-1.jpg`} alt="Работа «Стекло» — ботаническое стеклянное тату на предплечье" />
              <span className="vs-lens" data-share="lens" style={at(42, 52.5, 25)} aria-hidden />
            </div>
          </Layer>
          <div className="vs-mono-veil" aria-hidden />
          <div className="vs-mono-idx" aria-hidden>01</div>
          <Layer z={6} depth={0.24} phase={[0.42, 0.98]} from={{ x: "30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="vs-mono-cap vs-out">
            <span className="vs-folio">работа 01 · монумент</span>
            <h3>Стекло<em>flora</em></h3>
            <p>Прозрачный цветок, будто выплавленный из кожи. Ботаническая линия + розовые блики.</p>
            <span className="vs-meta">предплечье · 4 часа · fine-line</span>
          </Layer>
          <Bookmark kind="briefs" text="Связаться" top="30vh" tone="paper" />
        </div>

        {/* 3 · «ШИПЫ» — макро; склейка wipe-x по вертикальной линии ветки, лупа переезжает на розу */}
        <div transition="wipe-x" className="scene-body vs-macro">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.08, x: "2vw" }} to={{ scale: 1, x: "0vw" }} className="vs-macro-fig">
            <div className="vs-cbox" style={box(PORTRAIT, 0.5, 0.36)}>
              <SceneMedia src={`${A}/vision-work-2.jpg`} alt="Работа «Шипы» — макро чёрной тонкой ветки-тату на плече" />
              <span className="vs-lens" data-share="lens" style={at(72.5, 36.5, 27)} aria-hidden />
            </div>
          </Layer>
          <div className="vs-macro-scan" aria-hidden />
          <div className="vs-macro-huge" aria-hidden>ШИПЫ</div>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-macro-cap vs-out">
            <span className="vs-folio">работа 02 · макро</span>
            <p>Одна ветка через всё предплечье — жёсткая ось и мягкие иглы. Чёрный контур, розовый по кромке.</p>
            <span className="vs-meta">плечо → кисть · 6 часов · blackline</span>
          </Layer>
          <Bookmark kind="condom" text="Записаться" top="24vh" tone="ink" />
        </div>

        {/* 4 · «ХРЕБЕТ» — панорама; склейка wipe-y по горизонтальной линии позвоночника */}
        <div transition="wipe-y" className="scene-body vs-pano">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06, x: "-2vw" }} to={{ scale: 1, x: "0vw" }} className="vs-pano-fig">
            <div className="vs-pano-band">
              {/* shared-кадр = ровно видимая полоса (призрак стартует с неё), линза — в геометрической коробке того же кадра */}
              <SceneMedia src={`${A}/vision-work-wide.jpg`} alt="Работа «Хребет» — панорамное стеклянно-крылатое тату вдоль спины" share="wide" className="vs-pano-img" />
              <div className="vs-cbox vs-pano-geo" style={box(WIDE, 0.5, 0.4)}>
                <span className="vs-lens" data-share="lens" style={at(66, 49, 11)} aria-hidden />
              </div>
            </div>
          </Layer>
          <div className="vs-pano-bars" aria-hidden />
          <div className="vs-pano-word vs-out" aria-hidden>Хребет<em>panorama</em></div>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-pano-cap vs-out">
            <span className="vs-folio">разворот · во всю ширину</span>
            <p>Разворот на всю спину: крылья из стекла раскрываются от лопатки к лопатке — самая крупная работа в архиве.</p>
            <span className="vs-meta">спина · 9 часов · fine-line glass</span>
          </Layer>
          <Bookmark kind="gum" text="Написать мастеру" top="28vh" tone="ink" />
        </div>

        {/* 5 · «КРЫЛО» — коллаж-архив: панорама садится в свою рамку, лупа — на крыло */}
        <div transition="fade" className="scene-body vs-collage">
          <div className="vs-paper" aria-hidden />
          <Layer z={3} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="vs-col-grid">
            <figure className="vs-col vs-col-1" style={{ ["--thr" as string]: 0.04, ["--fly" as string]: "-44vw", ["--rot0" as string]: "-12deg" }}>
              <SceneMedia src={`${A}/vision-work-3.jpg`} alt="Работа «Крыло» — стеклянное тату на лопатке" share="w3" />
              <span className="vs-lens" data-share="lens" style={at(42, 49, 44)} aria-hidden />
              <figcaption>03 · крыло</figcaption>
            </figure>
            <figure className="vs-col vs-col-2" style={{ ["--thr" as string]: 0.16, ["--fly" as string]: "-40vw", ["--rot0" as string]: "10deg" }}><SceneMedia src={`${A}/vision-work-1.jpg`} alt="Ботаническое стеклянное тату" share="w1" /><figcaption>01 · стекло</figcaption></figure>
            <figure className="vs-col vs-col-3" style={{ ["--thr" as string]: 0.28, ["--fly" as string]: "40vw", ["--rot0" as string]: "-10deg" }}><SceneMedia src={`${A}/vision-work-2.jpg`} alt="Макро ветки-тату" share="w2" /><figcaption>02 · шипы</figcaption></figure>
            <figure className="vs-col vs-col-4" style={{ ["--thr" as string]: 0, ["--fly" as string]: "0vw", ["--flyY" as string]: "0px" }}><SceneMedia src={`${A}/vision-work-wide.jpg`} alt="Стеклянные крылья во всю спину" share="wide" /><figcaption>04 · хребет</figcaption></figure>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.42, 0.98]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-col-copy vs-out">
            <span className="vs-folio">архив · 2023—2026</span>
            <h3>Крыло<em>осколки</em></h3>
            <span className="vs-meta">лопатка · 5 часов · glass-work</span>
          </Layer>
          <Bookmark kind="bandage" text="Написать в Telegram" top="32vh" tone="paper" />
        </div>

        {/* 6 · «АРХИВ» — бенто-стена: четыре работы из коллажа FLIP'ом в свои плитки, лупа — на портрет Евы */}
        <div transition="push" className="scene-body vs-wall">
          <div className="vs-wall-grid">
            <figure className="vs-tile vs-tile-a"><img src={`${A}/vision-hero-b.jpg`} alt="Мастер Ева — портрет со стеклянными тату" loading="lazy" data-share="eva" /><span className="vs-lens" data-share="lens" style={at(73, 34, 15)} aria-hidden /><figcaption>Ева · портрет</figcaption></figure>
            <figure className="vs-tile vs-tile-b"><img src={`${A}/vision-work-wide.jpg`} alt="Стеклянные крылья во всю спину" loading="lazy" data-share="wide" /><figcaption>хребет · спина</figcaption></figure>
            <figure className="vs-tile vs-tile-c"><img src={`${A}/vision-tile-1.jpg`} alt="Стеклянный браслет на запястьях" loading="lazy" /><figcaption>кисти</figcaption></figure>
            <figure className="vs-tile vs-tile-d"><img src={`${A}/vision-tile-2.jpg`} alt="Стеклянная бабочка на шее" loading="lazy" /><figcaption>шея</figcaption></figure>
            <figure className="vs-tile vs-tile-e"><img src={`${A}/vision-work-3.jpg`} alt="Стеклянное крыло на лопатке" loading="lazy" data-share="w3" /><figcaption>крыло</figcaption></figure>
            <figure className="vs-tile vs-tile-f"><img src={`${A}/vision-work-1.jpg`} alt="Ботаническое стекло на предплечье" loading="lazy" data-share="w1" /><figcaption>стекло · рука</figcaption></figure>
            <figure className="vs-tile vs-tile-g"><img src={`${A}/vision-work-2.jpg`} alt="Терновая ветвь на плече" loading="lazy" data-share="w2" /><figcaption>шипы</figcaption></figure>
            <figure className="vs-tile vs-tile-h"><img src={`${A}/vision-hero-a.jpg`} alt="Мастер Ева — деталь портрета" loading="lazy" /><figcaption>студия</figcaption></figure>
          </div>
          <div className="vs-wall-cap vs-out"><b>архив</b> · выборка работ · 2023—2026</div>
          <Bookmark kind="tape" text="Смотреть все" top="40vh" tone="ink" />
        </div>

        {/* 7 · ФИНАЛ — рассвет: портрет Евы из стены вырастает в раму, линза снова у её лица */}
        <div transition="push" className="scene-body vs-final">
          <div className="vs-final-bg" aria-hidden />
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ scale: 1.03 }} to={{ scale: 1 }} className="vs-final-hero">
            <figure className="vs-final-frame">
              <img src={`${A}/vision-hero-b.jpg`} alt="Ева Зорина — мастер студии E.Z" loading="lazy" data-share="eva" />
              <span className="vs-lens" data-share="lens" style={at(73, 21, 17)} aria-hidden />
            </figure>
          </Layer>
          <Layer z={6} depth={0.24} phase={[0.4, 0.98]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-final-copy">
            <span className="vs-eyebrow">последняя страница</span>
            <h2>Хочешь <em>свет</em><br />на коже?</h2>
            <p>Пишу редко, беру по одному в день. Расскажи идею — соберём эскиз.</p>
          </Layer>
          <Layer z={7} depth={0.2} phase={[0.55, 1]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="vs-final-cta">
            <div className="vs-final-cta-in">
              <a href="#" onClick={stop} className="vs-btn">Записаться <i>↗</i></a>
              <div className="vs-links"><a href="#" onClick={stop}>Telegram</a><a href="#" onClick={stop}>Instagram</a><a href="#" onClick={stop}>+7 900 000‑00‑00</a></div>
              <div className="vs-sign">E.Z STUDIO · Ева Зорина · Москва</div>
            </div>
          </Layer>
        </div>
      </StageDeck>
    </div>
  );
}
