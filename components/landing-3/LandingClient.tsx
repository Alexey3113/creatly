"use client";

/**
 * ГЛАВНАЯ Creatly — страница сама фильм и витрина (аудит 2026-09-28: была 1/5, «типовой тёмно-синий AI-SaaS»).
 *
 * Hero — рил из 4 сцен трёх миров на движке Reel v2 (тот же, что у /animated/w-*):
 *   Hollow · чаща ─(портал в свет фонаря странника)→ Lumen · бухта маяка, стоп-кадр
 *   ─(луч маяка уносит ночь)→ Ember Road · полдень в дюнах ─(смена света в той же точке)→ Ember Road · ночь.
 * Актёры: кленовый лист («листают») летит через все миры и весь лендинг — садится на бриф, в кадр «Актёр»,
 *   на обложки и в кнопку финала; свет фонаря перетекает в лампу маяка (match-cut); караван идёт из дня в ночь.
 * Дальше сюжет «бриф → режиссура → сайт» на плитах миров (Backdrop) и свете страницы (Atmosphere):
 *   ночь пустыни → рассвет у маяка → утренний лес (та же чаща, что в первом кадре). В конце — порталы в витрины.
 * Стили — ./landing3.css (префикс cl-). Движки (reel.*, scene-kit) не трогаем.
 */

import Image from "next/image";
import { SiteMenu } from "@/components/shared/SiteMenu";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reel, reelMark, type ReelScene } from "@/components/animated-sites/model/reel";
import { Actor, Atmosphere, Backdrop, Follow, Weather, usePredecode } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./landing3.css";

const H = "/uploads/1/animated/hollow";
const L = "/uploads/1/animated/lumen";
const E = "/uploads/1/animated/emberroad";
const T = "/uploads/1/animated/tidewell";
const V = "/uploads/1/animated/voyage";
const BIZ = "/uploads/1/hooks/sites";
const S2 = "/uploads/1/story2";
const LEAF = "/uploads/1/animated/emberfall/actor-leaf.webp";

/** фонарь странника в кадре hero (% экрана; вырезка уведена в правую треть CSS-ом, как у Hollow) */
const LAMP = { x: 66.6, y: 72.4 };
/** лампа маяка в кадре бухты — сюда перетекает свет фонаря */
const BEACON = { x: 58.4, y: 66.4 };

const v = (o: Record<string, string | number>) => o as CSSProperties;

const scenes: ReelScene[] = [
  {
    id: "thicket", dark: true, len: 1.05, hold: 0.5,
    bg: `${H}/s1-bg.webp`, mid: `${H}/s1-mid.webp`, fg: `${H}/s1-fg.webp`,
    copy: (
      <div className="cl-copy">
        <span className="cl-eyebrow">Creatly · AI-режиссёр сайтов</span>
        <h1 className="cl-h1">Сайты, которые <em>листают</em> как кино</h1>
        <p className="cl-lead">
          Опишите бизнес в паре фраз — AI поставит сайт как фильм: мир, свет, склейки и героя,
          который ведёт посетителя от первого кадра до заявки.
        </p>
        <div className="cl-actions">
          <a className="cl-btn" href="/dashboard">Собрать свой сайт</a>
          <a className="cl-ghost" href="#showcase">Смотреть витрины</a>
        </div>
      </div>
    ),
  },
  {
    id: "cove", dark: true, into: "portal", portal: { x: LAMP.x + 0.6, y: LAMP.y - 1.6 }, len: 1.2, hold: 0.56,
    bg: `${L}/s2-bg.webp`, mid: `${L}/s2-mid.webp`, fg: `${L}/s2-fg.webp`, fgMask: [68, 84], fgGrow: 0.4, fgLift: 4,
    freeze: (
      <div className="cl-slate">
        <span className="cl-slate-bar" aria-hidden />
        <b>Стоп-кадр</b>
        <span>сцена 02 · дубль 1</span>
        <em>камера встала — вы успели прочесть</em>
      </div>
    ),
    copy: (
      <div className="cl-copy">
        <span className="cl-idx">02 · склейка «портал»</span>
        <h2 className="cl-h2">Камера входит в свет</h2>
        <p className="cl-p">
          Фонарь, окно, арка — AI находит в кадре дверь и проводит зрителя сквозь неё.
          Сцена не сменяет сцену, она из неё вырастает.
        </p>
      </div>
    ),
  },
  {
    id: "noon", into: "sweep", tint: "#ffd36a", len: 1, hold: 0.46,
    bg: `${E}/s1-bg.webp`, fg: `${E}/s1-fg.webp`, fgMask: [72, 88], fgGrow: 0.3, fgLift: 6,
    copy: (
      <div className="cl-copy">
        <span className="cl-idx">03 · склейка «луч»</span>
        <h2 className="cl-h2">Свет ведёт сюжет</h2>
        <p className="cl-p">
          Луч маяка проходит по кадру и уносит ночь. Время суток, погода и цвет текут
          через весь сайт — и под блоками тоже.
        </p>
      </div>
    ),
  },
  {
    id: "night", dark: true, into: "lightshift", tint: "#ff9a4a", len: 1.05, hold: 0.5,
    bg: `${E}/s4-bg.webp`, fg: `${E}/s4-fg.webp`,
    copy: (
      <div className="cl-copy">
        <span className="cl-idx">04 · смена света</span>
        <h2 className="cl-h2">Та же точка — другое время</h2>
        <p className="cl-p">
          День гаснет, караван идёт дальше, лист летит рядом с вами. Четыре сцены,
          три склейки и ни одного слайда.
        </p>
      </div>
    ),
  },
];

/** брифы в одну фразу → первые экраны реальных сайтов витрины /visual-hooks */
const BRIEFS = [
  { slug: "forge", brand: "FORGE", img: "forge-hero.jpg", brief: "Кую ножи вручную — каждый под руку владельца" },
  { slug: "comb", brand: "COMB", img: "comb.jpg", brief: "Сырой мёд с нашей пасеки, без нагрева и фильтра" },
  { slug: "hide", brand: "HIDE", img: "hide.jpg", brief: "Кожаные сумки, которые переживут хозяина" },
  { slug: "roast", brand: "ROAST", img: "roast.jpg", brief: "Обжариваем кофе малыми партиями каждое утро" },
  { slug: "pour", brand: "POUR", img: "pour.jpg", brief: "Коктейльный бар на двенадцать мест" },
  { slug: "velo", brand: "VÉLO", img: "velo.jpg", brief: "Собираем велосипеды из титана на заказ" },
];

/** обложки кино-историй /story2 — «листаются» веером в главе III */
const COVERS = [
  { slug: "forlorn", name: "Forlorn", img: "forlorn-hero.jpg", r0: -7, ay: 14 },
  { slug: "portfolio", name: "Portfolio", img: "p01-hero.jpg", r0: 5, ay: 4 },
  { slug: "salt", name: "Salt", img: "salt-hero.jpg", r0: -3, ay: 0 },
  { slug: "alexander", name: "Alexander", img: "alexander-hero.jpg", r0: 8, ay: 4 },
  { slug: "justice", name: "Justice", img: "justice-hero.jpg", r0: -2, ay: 14 },
];

const SHOT_IDS = ["portal", "actor", "freeze", "light"] as const;

export function LandingClient() {
  const root = useRef<HTMLDivElement>(null);

  // плиты лендинга и спрайт каравана нужны только ниже первого экрана — монтируем после load, в простое
  const [late, setLate] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setLate(true);
    let t = 0;
    const kick = () => { t = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 1500 }) : go()), 250); };
    if (document.readyState === "complete") kick(); else window.addEventListener("load", kick, { once: true });
    return () => { window.removeEventListener("load", kick); window.clearTimeout(t); };
  }, []);

  useEffect(() => {
    // до гидрации видна только первая сцена рила (иначе сверху лежит последняя); снимаем после первого кадра движка
    const id = requestAnimationFrame(() => root.current?.classList.add("is-booted"));
    return () => cancelAnimationFrame(id);
  }, []);
  // картинки секций (витрины, карточки) декодируются за полтора экрана до появления — без рывка в Safari;
  // сцены рила декодирует сам рил
  usePredecode(root, "img:not(.rl img)");

  return (
    <div className="cl" id="top" ref={root}>
      {/* LCP — плита первого кадра (CSS-фон рила не виден сканеру предзагрузки): React 19 поднимает link в <head> */}
      <link rel="preload" as="image" href={`${H}/s1-bg.webp`} fetchPriority="high" />
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"]} />

      <header className="cl-head">
        <a className="cl-logo" href="#top">Creatly</a>
        {/* главное меню: вкладки семейств сайтов с панелями-списками (телефон — бургер) */}
        <SiteMenu variant="inline" tail={<a href="/auth">Войти</a>} />
        <a className="cl-btn cl-btn--sm" href="/dashboard">Собрать сайт</a>
      </header>

      {/* ── ФИЛЬМ: живое демо того, что делает продукт ── */}
      <Reel scenes={scenes} unit={125} cue="листайте — это живое демо ↓" />

      {/* ── СКВОЗНОЙ СЛОЙ ── */}
      <Atmosphere stops={[
        { at: reelMark("end"), color: "#0c1326" },
        { at: ".cl-manifest", color: "#0c1326" },
        { at: ".cl-ch1", color: "#0f1830" },
        { at: ".cl-ch2", color: "#1d2533" },
        { at: ".cl-ch3", color: "#1b2528" },
        { at: ".cl-portals", color: "#10221d" },
        { at: ".cl-final", color: "#15291f" },
      ]} />
      {late && <Backdrop from=".cl-manifest" dim={0.52} plates={[
        { at: ".cl-manifest", src: `${E}/s4-bg.webp`, pos: "50% 38%" },
        { at: ".cl-ch1", src: `${E}/s4-bg.webp`, pos: "50% 38%" },
        { at: ".cl-ch2", src: `${L}/s4-bg.webp` },
        { at: ".cl-ch3", src: `${L}/s4-bg.webp`, pos: "50% 60%" },
        { at: ".cl-portals", src: `${H}/s4-bg.webp` },
        { at: ".cl-final", src: `${H}/s4-bg.webp`, pos: "50% 30%" },
      ]} />}
      <Weather kind="spores" count={20} color="#8affd8" color2="#ffd98a" between={[".cl .rl-reel", reelMark("h0")]} world={0.5} zIndex={31} />
      <Weather kind="stars" count={38} color="#fff4d6" between={[reelMark("t2"), ".cl-ch2"]} world={0.08} zIndex={30} />
      <Weather kind="dust" count={24} seed={11} color="#ffe6b0" color2="#fff6dd" between={[reelMark("t1"), ".cl-foot"]} world={0.35} wind={1.2} zIndex={31} />

      {/* свет фонаря странника → портал → лампа маяка (match-cut) */}
      <Actor className="cl-glow-actor" width="13vw" zIndex={33} bob={3} tilt={0} stops={[
        { at: reelMark("a0"), pose: { x: LAMP.x, y: LAMP.y, s: 1, o: 1 } },
        { at: reelMark("h0"), pose: { x: LAMP.x, y: LAMP.y, s: 1.1, o: 1 } },
        { at: reelMark("t0"), pose: { x: LAMP.x + 0.6, y: LAMP.y - 1.6, s: 3.4, o: 1 } },
        { at: reelMark("a1"), pose: { x: BEACON.x, y: BEACON.y, s: 0.5, o: 0.95 } },
        { at: reelMark("h1"), pose: { x: BEACON.x, y: BEACON.y, s: 0.5, o: 0.95 } },
        { at: reelMark("t1"), pose: { x: BEACON.x + 12, y: BEACON.y - 10, s: 1.8, o: 0 } },
      ]}><div className="cl-glow" /></Actor>

      {/* караван: полдень → ночь, уходит к горизонту */}
      {late && <Actor src={`${E}/actor-caravan.webp`} className="cl-caravan" width="24vw" zIndex={32} bob={1.2} tilt={0.03} stops={[
        { at: reelMark("h1"), pose: { x: -18, y: 72, s: 1, o: 0 } },
        { at: reelMark("t1"), pose: { x: 2, y: 72, s: 1, o: 1 } },
        { at: reelMark("a2"), pose: { x: 22, y: 72, s: 1, o: 1 } },
        { at: reelMark("h2"), pose: { x: 44, y: 71, s: 0.94, o: 1 } },
        { at: reelMark("t2"), pose: { x: 54, y: 70, s: 0.84, o: 1 } },
        { at: reelMark("s3"), pose: { x: 64, y: 69, s: 0.7, o: 0.85 } },
        { at: reelMark("end"), pose: { x: 72, y: 68, s: 0.58, o: 0 } },
      ]} />}

      <Follow target=".cl-caravan" stops={[{ at: reelMark("h2"), vars: { "--night": 0 } }, { at: reelMark("a3"), vars: { "--night": 1 } }]} />

      {/* ЛИСТ — сквозной актёр всей страницы */}
      <Actor src={LEAF} className="cl-leaf" width="clamp(34px, 4.6vw, 80px)" zIndex={34} bob={4} tilt={0.22} stops={[
        { at: reelMark("a0"), pose: { x: 80, y: 20, s: 0.9, r: -24 } },
        { at: reelMark("h0"), pose: { x: 72, y: 50, s: 1, r: 36 } },
        { at: reelMark("t0"), pose: { x: 67, y: 69, s: 0.3, r: 130, blur: 2 } },
        { at: reelMark("a1"), pose: { x: 28, y: 56, s: 1.25, r: 212 } },
        { at: reelMark("h1"), pose: { x: 28, y: 56, s: 1.25, r: 212 } },
        { at: reelMark("t1"), pose: { x: 64, y: 26, s: 0.9, r: 300, blur: 1 } },
        { at: reelMark("s2"), pose: { x: 58, y: 42, s: 0.85, r: 372 } },
        { at: reelMark("t2"), pose: { x: 62, y: 36, s: 0.75, r: 420 } },
        { at: reelMark("s3"), pose: { x: 74, y: 28, s: 0.65, r: 468 } },
        { at: ".cl-manifest", pose: { x: 86, y: 34, s: 0.9, r: 520 } },
        { at: ".cl-ch1-m0", pose: { dockTo: ".cl-brief", x: 99, y: -2, s: 0.8, r: 560 } },
        { at: ".cl-ch1-m1", pose: { dockTo: ".cl-brief", x: 99, y: -2, s: 0.8, r: 568 } },
        { at: ".cl-shot--actor .cl-shot-frame", pose: { dock: true, x: 88, y: 16, s: 0.9, r: 610 } },
        { at: ".cl-ch3-m0", pose: { dockTo: ".cl-deck", x: 50, y: 2, s: 0.9, r: 660 } },
        { at: ".cl-ch3-m1", pose: { dockTo: ".cl-deck", x: 50, y: 2, s: 0.9, r: 676 } },
        { at: ".cl-portals", pose: { x: 90, y: 22, s: 0.8, r: 720 } },
        { at: ".cl-final-cta", pose: { dock: true, x: 98, y: -18, s: 0.85, r: 760 } },
      ]} />

      {/* переменные глав: линза брифа, плёнка, кадры режиссуры, веер обложек, параллакс порталов */}
      <Follow target=".cl-ch1" stops={[{ at: ".cl-ch1-m0", vars: { "--lens": 0 } }, { at: ".cl-ch1-m1", vars: { "--lens": 1 } }]} />
      <Follow target=".cl-strip" stops={[{ at: ".cl-strip", anchor: -1, vars: { "--strip": 0 } }, { at: ".cl-strip", anchor: 2, vars: { "--strip": 1 } }]} />
      {SHOT_IDS.map((id) => (
        <Follow key={id} target={`.cl-shot--${id}`} stops={[
          { at: `.cl-shot--${id} .cl-shot-frame`, anchor: -0.5, vars: { "--p": 0 } },
          { at: `.cl-shot--${id} .cl-shot-frame`, anchor: 0.95, vars: { "--p": 1 } },
        ]} />
      ))}
      <Follow target=".cl-ch3" stops={[{ at: ".cl-ch3-m0", vars: { "--deal": 0 } }, { at: ".cl-ch3-m1", vars: { "--deal": 1 } }]} />
      <Follow target=".cl-portals" stops={[{ at: ".cl-portals", anchor: -0.2, vars: { "--sp": 0 } }, { at: ".cl-portals", anchor: 1.2, vars: { "--sp": 1 } }]} />

      {/* ── РАЗВЯЗКА ФИЛЬМА ── */}
      <section className="cl-manifest">
        <p>
          Вы только что пролистали фильм: <em>четыре сцены, три склейки, один стоп-кадр</em> и лист,
          который летел рядом. Это не видео. Это сайт.
        </p>
        <span className="cl-manifest-sub">Так Creatly ставит сайты — по вашему брифу.</span>
      </section>

      {/* ── ГЛАВА I · БРИФ — линза: текст брифа → первый экран готового сайта ── */}
      <section className="cl-ch1" id="how" aria-labelledby="cl-ch1-t">
        <i className="cl-mk cl-ch1-m0" aria-hidden />
        <i className="cl-mk cl-ch1-m1" aria-hidden />
        <div className="cl-pin cl-ch1-pin">
          <div className="cl-ch-copy">
            <span className="cl-kick">Глава I · Бриф</span>
            <h2 id="cl-ch1-t" className="cl-h2">Вы рассказываете — <em>как другу</em></h2>
            <p className="cl-p">
              Пара фраз голосом или текстом. Можно приложить старый сайт — AI заберёт из него
              факты, цены и контакты. Дальше работает режиссёр.
            </p>
          </div>
          <figure className="cl-brief-fig">
            <div className="cl-brief">
              <div className="cl-brief-page">
                <span className="cl-brief-slug">Инт. Пекарня на углу — рассвет</span>
                <p className="cl-brief-text">
                  «Печём на закваске в дровяной печи с шести утра — запах слышно с улицы.
                  Хочу, чтобы хлеб заказывали к завтраку».
                </p>
                <span className="cl-brief-sign">бриф · две фразы</span>
              </div>
              <div className="cl-lens">
                <Image src={`${BIZ}/loaf.jpg`} alt="Первый экран сайта пекарни LOAF" fill sizes="(max-width: 820px) 92vw, 46vw" />
                <div className="cl-lens-ui" aria-hidden>
                  <span className="cl-lens-nav"><b>LOAF</b><i>The bake</i><i>The crumb</i><i>Reserve</i></span>
                  <strong>SOURDOUGH</strong>
                  <span>Wild yeast, a long slow proof, and a wood fire at dawn.</span>
                </div>
              </div>
              <span className="cl-lens-ring" aria-hidden />
            </div>
            <figcaption className="cl-brief-cap">
              <Link href="/visual-hooks/loaf" prefetch={false}>Открыть сайт пекарни LOAF →</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="cl-reelstrip" aria-labelledby="cl-strip-t">
        <div className="cl-strip-head">
          <span className="cl-kick" id="cl-strip-t">Одна фраза о деле → первый экран</span>
          <Link className="cl-link" href="/visual-hooks/sites" prefetch={false}>Все 50 бизнес-сайтов →</Link>
        </div>
        <div className="cl-strip">
          <ul className="cl-strip-track">
            {BRIEFS.map((b) => (
              <li key={b.slug} className="cl-frame">
                <Link href={`/visual-hooks/${b.slug}`} prefetch={false}>
                  <span className="cl-frame-img">
                    <Image src={`${BIZ}/${b.img}`} alt={`Первый экран сайта ${b.brand}`} fill sizes="(max-width: 820px) 45vw, 380px" />
                  </span>
                  <q>{b.brief}</q>
                  <b>{b.brand}</b>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ГЛАВА II · РЕЖИССУРА — вместо карточек фич: живые кадры приёмов из настоящих миров ── */}
      <section className="cl-ch2" aria-labelledby="cl-ch2-t">
        <div className="cl-ch-copy cl-ch-copy--wide">
          <span className="cl-kick">Глава II · Режиссура</span>
          <h2 id="cl-ch2-t" className="cl-h2">AI ставит сайт <em>как фильм</em></h2>
          <p className="cl-p">
            Выбирает мир и свет, режет историю на сцены, ставит склейки и находит героя,
            который проведёт зрителя до заявки. Каждый приём работает на сюжет — не ради эффекта.
          </p>
        </div>
        <div className="cl-shots">
          <Link className="cl-shot cl-shot--portal" href="/animated/w-hollow" prefetch={false}>
            <span className="cl-shot-frame">
              <span className="cl-lay"><Image src={`${H}/s1-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-lay cl-lay-mid"><Image src={`${H}/s1-mid.webp`} alt="" fill sizes="(max-width: 820px) 70vw, 34vw" /></span>
              <span className="cl-lay cl-lay-b"><Image src={`${H}/s2-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-shot-lamp" aria-hidden />
              <span className="cl-shot-ring" aria-hidden />
              <span className="cl-shot-slate">кадр 01 · склейка</span>
            </span>
            <b>Портал</b>
            <span className="cl-shot-txt">Камера входит в свет фонаря и выходит уже в новой сцене. <span className="cl-world">Мир Hollow →</span></span>
          </Link>
          <Link className="cl-shot cl-shot--actor" href="/animated/w-emberroad" prefetch={false}>
            <span className="cl-shot-frame">
              <span className="cl-lay"><Image src={`${E}/s2-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-shot-caravan"><Image src={`${E}/actor-caravan.webp`} alt="" fill sizes="(max-width: 820px) 44vw, 22vw" /></span>
              <span className="cl-shot-slate">кадр 02 · актёр</span>
            </span>
            <b>Актёр</b>
            <span className="cl-shot-txt">Караван проходит все сцены сайта — до кнопки заявки. Лист, что сел на этот кадр, летит с вами с первого экрана. <span className="cl-world">Мир Ember Road →</span></span>
          </Link>
          <Link className="cl-shot cl-shot--freeze" href="/animated/w-tidewell" prefetch={false}>
            <span className="cl-shot-frame">
              <span className="cl-lay cl-lay-grade"><Image src={`${T}/s3-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-shot-diver"><Image src={`${T}/actor-diver-down.webp`} alt="" fill sizes="80px" /></span>
              <span className="cl-shot-depth" aria-hidden><b>−18 m</b><i>one breath · hold it here</i></span>
              <span className="cl-shot-slate">кадр 03 · стоп-кадр</span>
            </span>
            <b>Стоп-кадр</b>
            <span className="cl-shot-txt">Камера встаёт, кадр выцветает, выходит цифра — зритель успевает её прочесть. <span className="cl-world">Мир Tidewell →</span></span>
          </Link>
          <Link className="cl-shot cl-shot--light" href="/animated/w-lumen" prefetch={false}>
            <span className="cl-shot-frame">
              <span className="cl-lay"><Image src={`${L}/s1-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-lay cl-lay-dawn"><Image src={`${L}/s4-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-shot-beam" aria-hidden />
              <span className="cl-shot-slate">кадр 04 · свет</span>
            </span>
            <b>Свет и погода</b>
            <span className="cl-shot-txt">Шторм сменяется рассветом прямо под текстом: фон — участник сюжета, а не заливка. <span className="cl-world">Мир Lumen →</span></span>
          </Link>
        </div>
      </section>

      {/* ── ГЛАВА III · САЙТ — обложки кино-историй листаются веером ── */}
      <section className="cl-ch3" aria-labelledby="cl-ch3-t">
        <i className="cl-mk cl-ch3-m0" aria-hidden />
        <i className="cl-mk cl-ch3-m1" aria-hidden />
        <div className="cl-pin cl-ch3-pin">
          <div className="cl-ch-copy">
            <span className="cl-kick">Глава III · Сайт</span>
            <h2 id="cl-ch3-t" className="cl-h2">Готовый сайт — <em>ваш</em></h2>
            <p className="cl-p">
              Публикация в один клик, заявки приходят в Telegram, любой текст правится прямо
              на странице. Первый сайт-фильм — меньше чем за час.
            </p>
            <Link className="cl-link" href="/story2" prefetch={false}>Все 20 кино-историй →</Link>
          </div>
          <div className="cl-deck">
            {COVERS.map((c, i) => (
              <Link key={c.slug} className="cl-cover" href={`/story2/${c.slug}`} prefetch={false} style={v({ "--i": i, "--r0": c.r0, "--ay": c.ay })}>
                <Image src={`${S2}/${c.img}`} alt={`Обложка кино-истории ${c.name}`} fill sizes="(max-width: 820px) 34vw, 240px" />
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВИТРИНЫ — карточки-порталы ── */}
      <section className="cl-portals" id="showcase" aria-labelledby="cl-pt-t">
        <div className="cl-ch-copy cl-ch-copy--wide">
          <span className="cl-kick">Витрины</span>
          <h2 id="cl-pt-t" className="cl-h2">Войдите в <em>любой мир</em></h2>
          <p className="cl-p">Всё, что вы видели выше, живёт в наших витринах. Откройте любую — и листайте.</p>
        </div>
        <div className="cl-portal-grid">
          <Link className="cl-portal cl-portal--worlds" href="/animated/worlds" prefetch={false}>
            <span className="cl-portal-win">
              <span className="cl-lay"><Image src={`${V}/s2-bg.webp`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
              <span className="cl-portal-ship"><Image src={`${V}/actor-aurelia.webp`} alt="" fill sizes="(max-width: 820px) 30vw, 14vw" /></span>
            </span>
            <span className="cl-portal-meta"><b>Миры</b><em>30 иллюстрированных сайтов-фильмов</em></span>
            <span className="cl-portal-txt">Камера идёт сквозь сцены, актёр — вместе со зрителем. Там родился рил с первого экрана.</span>
            <span className="cl-portal-go">Войти →</span>
          </Link>
          <Link className="cl-portal cl-portal--story" href="/story2" prefetch={false}>
            <span className="cl-portal-win">
              <span className="cl-lay"><Image src={`${S2}/forlorn-hero.jpg`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
            </span>
            <span className="cl-portal-pop" aria-hidden><Image src={`${S2}/forlorn-hero-cut.png`} alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
            <span className="cl-portal-meta"><b>Кино-истории</b><em>20 сайтов-историй</em></span>
            <span className="cl-portal-txt">Личный бренд, портфолио, артист: кадр перелетает из сцены в сцену, историю ведёт жест.</span>
            <span className="cl-portal-go">Войти →</span>
          </Link>
          <Link className="cl-portal cl-portal--biz" href="/visual-hooks/sites" prefetch={false}>
            <span className="cl-portal-win">
              <span className="cl-lay cl-fan cl-fan-1"><Image src={`${BIZ}/curd.jpg`} alt="" fill sizes="(max-width: 820px) 60vw, 26vw" /></span>
              <span className="cl-lay cl-fan cl-fan-2"><Image src={`${BIZ}/spice.jpg`} alt="" fill sizes="(max-width: 820px) 60vw, 26vw" /></span>
              <span className="cl-lay cl-fan cl-fan-3"><Image src={`${BIZ}/lume.jpg`} alt="" fill sizes="(max-width: 820px) 60vw, 26vw" /></span>
            </span>
            <span className="cl-portal-meta"><b>Сайты для бизнеса</b><em>50 готовых сайтов</em></span>
            <span className="cl-portal-txt">Сыроварня, специи, ювелир, кузница, бар: продукт — главный герой первого экрана.</span>
            <span className="cl-portal-go">Войти →</span>
          </Link>
          <Link className="cl-portal cl-portal--hooks" href="/visual-hooks" prefetch={false}>
            <span className="cl-portal-win">
              <span className="cl-lay"><Image src="/uploads/1/hooks/scenes/held-world-poster.jpg" alt="" fill sizes="(max-width: 820px) 92vw, 44vw" /></span>
            </span>
            <span className="cl-portal-meta"><b>Первые экраны</b><em>24 хук-сцены</em></span>
            <span className="cl-portal-txt">Мир на ладони, монолит, планета на горизонте — первый экран, с которого не уходят.</span>
            <span className="cl-portal-go">Войти →</span>
          </Link>
        </div>
      </section>

      {/* ── ФИНАЛ: та же чаща, что в первом кадре, — уже при свете ── */}
      <section className="cl-final" aria-labelledby="cl-final-t">
        <span className="cl-kick">Ваша очередь</span>
        <h2 id="cl-final-t" className="cl-final-t">Соберите свой <em>сайт-фильм</em></h2>
        <p className="cl-p">Бесплатный старт, без карточки. Первый сайт — меньше чем за час.</p>
        <div className="cl-actions cl-actions--center">
          <a className="cl-btn cl-btn--xl cl-final-cta" href="/dashboard">Начать бесплатно</a>
          <a className="cl-ghost" href="/auth">У меня есть аккаунт</a>
        </div>
      </section>

      <footer className="cl-foot">
        <span className="cl-logo">Creatly</span>
        <nav aria-label="Контакты">
          <a href="/auth">Вход</a>
          <a href="mailto:hello@creatly.ru">hello@creatly.ru</a>
        </nav>
      </footer>
    </div>
  );
}
