"use client";
/* ПИЛОТ модели — «CANOPY»: иллюстрированный кино-скроллителлинг-лендинг. Корень шаблона 30 миров.
   Переведён со своего встроенного рила на общий движок <Reel/> v2 (партитура hold/travel, копи эстафетой,
   склейки из мира, маркеры для сквозных слоёв). Ассеты: /uploads/1/animated/model/canopy/*.

   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): ОДИН странник в плаще (актёр-спрайт) идёт через все четыре
   главы — олень и лань теперь ВСТРЕЧИ, а не замены героя — и продолжает путь по тропе лендинга
   (путевые точки, полевой блокнот, карточка маршрута). Склейки из мира: спуск с хребта в ущелье,
   шов — белая полоса брызг (descend) → путь вбок по тропе (pan) → стволы пролетают перед объективом (flythrough).
   Стоп-кадр — встреча с оленем. Светлячки ночного луга живут в окне ночи и первом экране лендинга. */
import { Reel, reelMark, type ReelScene } from "./reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./canopy.css";

const A = "/uploads/1/animated/model/canopy";
const WANDERER = "/uploads/1/animated/canopy/actor-wanderer.webp";

const scenes: ReelScene[] = [
  { id: "ridge", bg: `${A}/bg.webp`, fg: `${A}/fern.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="cp-eyebrow">Guided illustrated expeditions</span>
      <h1>Walk into<br /><em>the quiet.</em></h1>
      <p>A slow route through fog-lit forests, waterfalls and moonlit meadows — one continuous painted world, and you walk all of it.</p>
      <div className="cp-cta"><a href="#deal" className="cp-btn">Start the journey</a><a href="#trail" className="cp-btn-ghost">See the route →</a></div>
    </>
  ) },
  { id: "falls", into: "descend", tint: "#eef4f1", bg: `${A}/falls-bg.webp`, mid: `${A}/falls-mist.webp`, fg: `${A}/falls-rocks.webp`, copy: (
    <><span className="cp-ch-idx">Chapter 02</span><h2>The Falls</h2>
      <p>A gorge of moving water and wet stone — cool, loud, alive. Stand at the edge until the spray reaches you.</p></>
  ) },
  { id: "pass", into: "pan", dark: true, len: 1.25, hold: 0.56, bg: `${A}/dusk-forest.webp`, mid: `${A}/stag.webp`, fg: `${A}/trees.webp`,
    freeze: (<div className="cp-freeze"><b>19:52</b><span>the stag lets you pass</span></div>), copy: (
    <><span className="cp-ch-idx">Chapter 03</span><h2 className="cp-h-light">The Pass</h2>
      <p className="cp-p-light">Between water and meadow the trees close in — dusk, resin, and a stag that stands its ground, then lets you through.</p></>
  ) },
  { id: "meadow", into: "flythrough", dark: true, spark: 6, bg: `${A}/meadow-bg.webp`, mid: `${A}/deer.webp`, fg: `${A}/meadow-grass.webp`, copy: (
    <><span className="cp-ch-idx">Chapter 04</span><h2 className="cp-h-light">The Meadow</h2>
      <p className="cp-p-light">Moonlight, fireflies, and a deer that watches you pass. The route ends where the noise does.</p></>
  ) },
];

/* тропа лендинга: четыре путевые точки (вместо «карточки×4» + «галерея×4 настроения») */
const WAYS: [string, string, string, string, string][] = [
  ["01", "km 0", "The Ridge", "Dawn over the treeline — mist, god-rays, the first light you walk into.", "Come back in first snow and it's a different painting."],
  ["02", "km 38", "The Falls", "A gorge of moving water and wet stone. The spray reaches the path before you reach the edge.", "High water in spring — louder, whiter, closer."],
  ["03", "km 71", "The Pass", "Dusk in the pines — resin, shadow, and a stag that decides when you may go on.", "In autumn the pass turns copper by five."],
  ["04", "km 120", "The Meadow", "Moonlight, fireflies, a deer at the treeline. The hut is lit when you arrive.", "Midsummer nights never quite get dark here."],
];

export function Canopy() {
  return (
    <div className="cp">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=Archivo:wght@400;500;600;700&display=swap"]} />
      <header className="cp-nav">
        <span className="cp-brand">CANOPY<i>°</i></span>
        <nav><a href="#trail">Routes</a><a href="#notes">Field notes</a><a href="#deal">Journal</a><a href="#deal" className="cp-nav-cta">Start the journey</a></nav>
      </header>

      <Reel scenes={scenes} cue="walk on ↓" />

      {/* СКВОЗНОЙ СЛОЙ: ночь луга → рассвет → брызги → сумерки → ночь по тропе лендинга */}
      <Atmosphere stops={[
        { at: ".cp-intro", color: "#10201b" }, { at: ".cp-steps", color: "#13271f" },
        { at: ".cp-way:nth-child(1)", color: "#2a3b33" }, { at: ".cp-way:nth-child(2)", color: "#1d3531" },
        { at: ".cp-way:nth-child(3)", color: "#2b2434" }, { at: ".cp-way:nth-child(4)", color: "#0f1c22" },
        { at: ".cp-notes", color: "#132420" }, { at: ".cp-deal", color: "#10201a" }, { at: ".cp-climax", color: "#0b1612" },
      ]} />
      <Backdrop from=".cp-intro" dim={0.58} plates={[
        { at: ".cp-intro", src: `${A}/meadow-bg.webp` }, { at: ".cp-way:nth-child(1)", src: `${A}/bg.webp` },
        { at: ".cp-way:nth-child(2)", src: `${A}/falls-bg.webp` }, { at: ".cp-way:nth-child(3)", src: `${A}/dusk-forest.webp` },
        { at: ".cp-way:nth-child(4)", src: `${A}/meadow-bg.webp` }, { at: ".cp-deal", src: `${A}/meadow-bg.webp`, pos: "50% 70%" },
      ]} />

      {/* СТРАННИК — один герой через все главы и тропу лендинга (спрайт идёт вправо) */}
      <Actor src={WANDERER} className="cp-wanderer" width="7.4vw" zIndex={32} bob={2} tilt={0.03} stops={[
        { at: reelMark("s0"), pose: { x: 72, y: 73, s: 1.15 } },
        { at: reelMark("t0"), pose: { x: 76, y: 76, s: 1.3, o: 0.15, blur: 3 } },
        { at: reelMark("s1"), pose: { x: 77, y: 74, s: 0.86, o: 1, fx: -1 } },
        { at: reelMark("t1"), pose: { x: 58, y: 76, s: 0.92, fx: 1 } },
        { at: reelMark("s2"), pose: { x: 43, y: 76, s: 0.98 } },
        { at: reelMark("t2"), pose: { x: 50, y: 80, s: 1.2, o: 0.6, blur: 3 } },
        { at: reelMark("s3"), pose: { x: 44, y: 75, s: 0.62, o: 1 } },
        { at: reelMark("end"), pose: { x: 48, y: 74, s: 0.56 } },
        { at: ".cp-intro", pose: { x: 50, y: 118, s: 0.5, o: 0 } },
        { at: ".cp-trail-head", pose: { x: 22, y: 100, s: 0.6, o: 0 } },
        { at: ".cp-way:nth-child(1)", pose: { x: 21, y: 56, s: 0.62, dock: true } },
        { at: ".cp-way:nth-child(2)", pose: { x: 21, y: 56, s: 0.62, dock: true } },
        { at: ".cp-way:nth-child(3)", pose: { x: 21, y: 56, s: 0.62, dock: true } },
        { at: ".cp-way:nth-child(4)", pose: { x: 21, y: 56, s: 0.62, dock: true } },
        { at: ".cp-notes", pose: { x: 84, y: 64, s: 0.6 } },
        { at: ".cp-deal-card", pose: { x: 104, y: 72, s: 0.66, fx: -1, dock: true } },
        { at: ".cp-climax", pose: { x: 62, y: 74, s: 0.4, o: 0 } },
      ]} />

      <Weather kind="fireflies" count={24} color="#ffd98a" color2="#fff3c4" between={[reelMark("t2"), ".cp-steps"]} world={0.4} zIndex={31} />

      {/* 04 · STORY — тихая зона чтения на плите ночного луга */}
      <section className="cp-intro"><p><em>Four chapters, one walk.</em> Dawn ridge, the falls, the pass, the night meadow — hand-painted scenes you move through, not past.</p></section>

      {/* 05 · КАК ЭТО РАБОТАЕТ — 3 шага */}
      <section className="cp-steps">
        <span className="cp-kicker">How a route works</span>
        <div className="cp-steps-row">
          {[["Choose a season", "Spring thaw, high summer, first snow — the world repaints itself four times a year."],
            ["We draw the route", "A cartographer and an illustrator plot two quiet days, hut to hut, and paint the map by hand."],
            ["You walk into it", "Small groups, no signal, a guide who knows where the deer cross. You just follow the light."]].map(([t, s], i) => (
            <article className="cp-step" key={i}><span className="cp-step-n">0{i + 1}</span><h3>{t}</h3><p>{s}</p></article>
          ))}
        </div>
      </section>

      {/* 06 · ТРОПА — путевые точки; странник идёт по ним, мир под блоком меняется по главам */}
      <section className="cp-trail" id="trail">
        <div className="cp-trail-head"><span className="cp-kicker">The route, on foot</span><h2>One path, four paintings.</h2></div>
        <ol className="cp-ways">
          {WAYS.map(([n, km, t, s, mood]) => (
            <li className="cp-way" key={n}>
              <span className="cp-way-km">{km}</span>
              <div className="cp-way-copy"><span className="cp-way-n">Chapter {n}</span><h3>{t}</h3><p>{s}</p><span className="cp-way-mood">{mood}</span></div>
            </li>
          ))}
        </ol>
      </section>

      {/* 07 · ПОЛЕВОЙ БЛОКНОТ — цифры записью в блокноте, не полосой */}
      <section className="cp-notes" id="notes">
        <div className="cp-notebook">
          <span className="cp-kicker">Field notes · route no. 4</span>
          <ul>
            <li><b>120</b><span>hand-painted kilometres, hut to hut</span></li>
            <li><b>4</b><span>seasons — the same route, four worlds</span></li>
            <li><b>6</b><span>walkers per route, never more</span></li>
            <li><b>0</b><span>bars of signal after the ridge</span></li>
          </ul>
          <span className="cp-notebook-sign">— sketched at the meadow hut, 21:40</span>
        </div>
      </section>

      {/* 09 · СДЕЛКА — оффер + CTA */}
      <section className="cp-deal" id="deal">
        <div className="cp-deal-card">
          <span className="cp-kicker">The two-day route</span>
          <div className="cp-price"><b>€480</b><span>/ person · guide, huts &amp; meals</span></div>
          <p>Everything but the walking is arranged. Reserve a date and we’ll send the painted map.</p>
          <a href="#" className="cp-btn">Reserve a route</a>
          <span className="cp-deal-note">Free to reschedule · Small groups only</span>
        </div>
      </section>

      {/* 10 · КУЛЬМИНАЦИЯ + CTA */}
      <section className="cp-climax" style={{ backgroundImage: `url(${A}/meadow-bg.webp)` }}>
        <div className="cp-climax-veil" aria-hidden />
        <div className="cp-climax-copy"><h2>Start walking. <em>The painting fills in around you.</em></h2><a href="#deal" className="cp-btn">Start the journey</a></div>
      </section>

      {/* 11 · FOOTER */}
      <footer className="cp-foot"><span className="cp-brand">CANOPY<i>°</i></span><span>Guided illustrated expeditions · Est. nowhere in particular</span></footer>
    </div>
  );
}
