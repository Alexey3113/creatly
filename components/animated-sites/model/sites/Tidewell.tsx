"use client";
/* TIDEWELL — «guided coastal descents». Мир: вертикальный нырок из воздуха в воду сквозь свет.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОСПНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Cormorant Garamond × Manrope, палитра teal/coral/pearl). */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import "./tidewell.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/tidewell";
/* ОДИН НЫРОК: обрыв → (спуск) отмель → (спуск сквозь поверхность) толща → (разворот вверх) потолок.
   Актёры: ныряльщик уходит в толщу и спускается по шкале глубин лендинга; световой столб — мотив мира. */
const scenes: ReelScene[] = [
  { id: "cliff", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, midPos: "74% 86%", copy: (
    <>
      <span className="tw-eyebrow">Guided coastal descents</span>
      <h1>Go down<br /><em>to the quiet.</em></h1>
      <p>One continuous painted dive — cliff, tide-pool, blue water and back into the light. No noise below ten metres.</p>
      <div className="tw-cta"><a href="#book" className="tw-btn">Book a descent</a><a href="#route" className="tw-ghost">See the line →</a></div>
    </>
  ) },
  { id: "pools", into: "descend", tint: "#f2ede0", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, midPos: "70% 86%", copy: (
    <><span className="tw-idx">— 02 · the shallows</span><h2>Tide Pools</h2>
      <p>Warm glass over pale sand. This is where you learn to breathe slow before the floor drops away.</p></>
  ) },
  { id: "dive", dark: true, into: "descend", tint: "#1f7d86", len: 1.25, hold: 0.55, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="tw-freeze"><b>−18 m</b><span>one breath · hold it here</span></div>), copy: (
    <><span className="tw-idx tw-light">— 03 · the column</span><h2 className="tw-hl">The Descent</h2>
      <p className="tw-pl">A single shaft of dawn follows you down. Kelp, then blue, then the slow dark — and it is calm the whole way.</p></>
  ) },
  { id: "surface", dark: true, into: "ascend", tint: "#e8b7a0", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="tw-idx tw-light">— 04 · the ceiling</span><h2 className="tw-hl">Surfacing</h2>
      <p className="tw-pl">You turn, and the whole sea is lit silver above you. Rise into it slowly. That last breath is the point.</p></>
  ) },
];

export function Tidewell() {
  return (
    <div className="tw">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600;700&display=swap"]} />
      <header className="tw-nav">
        <span className="tw-brand">TIDEWELL</span>
        <nav><a href="#route">The line</a><a href="#depths">Depths</a><a href="#log">Log</a><a href="#book" className="tw-nav-cta">Book a descent</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* СКВОЗНОЙ СЛОЙ: мотив мира (световой столб) и ныряльщик идут через рил и лендинг */}
      <Atmosphere stops={[
        { at: ".tw-manifest", color: "#0b3a44" }, { at: ".tw-depths", color: "#052831" }, { at: ".tw-stats", color: "#0a3640" },
        { at: ".tw-quote", color: "#15434b" }, { at: ".tw-deal", color: "#1f5058" }, { at: ".tw-climax", color: "#2d6068" },
      ]} />
      <Backdrop from=".tw-manifest" dim={0.58} plates={[
        { at: ".tw-manifest", src: `${A}/s3-bg.webp` }, { at: ".tw-depths", src: `${A}/s3-bg.webp` },
        { at: ".tw-quote", src: `${A}/s4-bg.webp`, pos: "50% 30%" }, { at: ".tw-deal", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
      ]} />
      <Actor className="tw-shaft-actor" width="24vw" zIndex={4} bob={0} tilt={0} stops={[
        { at: reelMark("s1"), pose: { x: 64, y: 30, s: 1, o: 0 } },
        { at: reelMark("t1"), pose: { x: 62, y: 40, s: 1, o: 0.9 } },
        { at: reelMark("s2"), pose: { x: 60, y: 45, s: 1.1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 56, y: 40, s: 1.2, o: 0.5 } },
        { at: reelMark("s3"), pose: { x: 50, y: 35, s: 1.3, o: 0 } },
        { at: ".tw-depths", pose: { x: 16, y: 50, s: 0.9, o: 0 } },
        { at: ".tw-gauge-row:nth-child(1)", pose: { x: 16, y: 55, s: 0.9, o: 0.8 } },
        { at: ".tw-gauge-row:nth-child(4)", pose: { x: 16, y: 55, s: 0.9, o: 0.8 } },
        { at: ".tw-split", pose: { x: 16, y: 40, s: 0.9, o: 0 } },
      ]}><div className="tw-shaft" /></Actor>
      <Actor src={`${A}/actor-diver-down.webp`} width="11vw" zIndex={32} stops={[
        { at: reelMark("s1"), pose: { x: 64, y: -18, s: 0.7, r: 8, o: 0 } },
        { at: reelMark("t1"), pose: { x: 62, y: 26, s: 0.7, r: 6, o: 1 } },
        { at: reelMark("s2"), pose: { x: 63, y: 52, s: 0.95, r: 2, o: 1, blur: 0 } },
        { at: reelMark("t2"), pose: { x: 60, y: 92, s: 1.1, r: 0, o: 0, blur: 3 } },
        { at: ".tw-manifest", pose: { x: 12, y: -20, s: 0.5, o: 0 } },
        { at: ".tw-gauge-row:nth-child(1)", anchor: 0.5, pose: { x: -2, y: 40, s: 0.42, r: 4, o: 1, dock: true } },
        { at: ".tw-gauge-row:nth-child(2)", anchor: 0.5, pose: { x: -2, y: 40, s: 0.42, r: 2, o: 1, dock: true } },
        { at: ".tw-gauge-row:nth-child(3)", anchor: 0.5, pose: { x: -2, y: 40, s: 0.42, r: 0, o: 1, dock: true } },
        { at: ".tw-gauge-row:nth-child(4)", anchor: 0.5, pose: { x: -2, y: 40, s: 0.42, r: -2, o: 1, dock: true } },
        { at: ".tw-split", pose: { x: 14, y: 120, s: 0.42, o: 0 } },
      ]} />
      <Actor src={`${A}/actor-diver-up.webp`} width="10vw" zIndex={32} stops={[
        { at: reelMark("t2"), pose: { x: 44, y: 110, s: 0.8, o: 0 } },
        { at: reelMark("s3"), pose: { x: 46, y: 64, s: 0.9, r: -4, o: 1 } },
        { at: reelMark("end"), pose: { x: 48, y: 26, s: 0.7, r: -2, o: 1 } },
        { at: ".tw-manifest", pose: { x: 50, y: -24, s: 0.6, o: 0 } },
      ]} />
      <Weather kind="bubbles" count={22} color="#f2ede0" between={[reelMark("t1"), ".tw-split"]} world={0.8} zIndex={31} />

      {/* MANIFESTO — одна большая мысль (не карточки) */}
      <section className="tw-manifest">
        <p>The surface is loud. <em>Everything worth hearing</em> is a breath-hold beneath it.</p>
      </section>

      {/* DEPTH GAUGE — вертикальная шкала глубин (уникальный блок) */}
      <section className="tw-depths" id="depths">
        <div className="tw-depths-head"><span className="tw-kick">The line, metre by metre</span><h2>Four depths, one breath.</h2></div>
        <ol className="tw-gauge">
          {[["0 m", "The cliff", "You step off warm rock into cold air, then colder water. The town noise stops at the waterline."],
            ["-4 m", "The pools", "Sunlit shallows over sand. We slow your breathing here until the descent feels like falling asleep."],
            ["-18 m", "The column", "Kelp gives way to open blue. One shaft of light comes with you. This is the part people come back for."],
            ["-30 m", "The floor", "The reef edge, the drop-off, the silence. You hang here a while, then let the light pull you home."]].map(([d, t, s], i) => (
            <li className="tw-gauge-row" key={i}><span className="tw-depth">{d}</span><div><h3>{t}</h3><p>{s}</p></div></li>
          ))}
        </ol>
      </section>

      {/* SPLIT — showcase кадр + текст */}
      <section className="tw-split" id="route">
        <div className="tw-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="tw-split-copy">
          <span className="tw-kick">Why it stays with you</span>
          <h2>We paint the line before you swim it.</h2>
          <p>Every descent is scouted, illustrated and rehearsed on paper first — the light, the current, the exact metre the floor drops. You are never guessing in the dark.</p>
          <a href="#book" className="tw-link">Read the method →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="tw-stats">
        {[["30", "metres, guided"], ["1", "breath at a time"], ["4", "painted depths"], ["6", "divers per line, max"]].map(([n, l], i) => (
          <div className="tw-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE — отзыв в стиле мира (уникальный блок) */}
      <section className="tw-quote">
        <blockquote>“I have dived for fifteen years and never been walked down like this. It felt less like sport and more like <em>being shown something</em>.”</blockquote>
        <cite>— Mara V., freediver · Ponta do Sol</cite>
      </section>

      {/* DEAL */}
      <section className="tw-deal" id="book">
        <div className="tw-deal-card">
          <span className="tw-kick">The guided descent</span>
          <div className="tw-price"><b>€260</b><span>/ diver · guide, gear &amp; the painted line</span></div>
          <p>Half a day on the water, one long descent, all safety and equipment handled. Reserve a tide and we send the illustrated dive plan.</p>
          <a href="#" className="tw-btn">Reserve a tide</a>
          <span className="tw-note">Free to reschedule · Weather-guaranteed</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="tw-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="tw-climax-veil" aria-hidden />
        <div className="tw-climax-copy"><h2>The quiet is <em>one breath</em> down.</h2><a href="#book" className="tw-btn">Book a descent</a></div>
      </section>

      <footer className="tw-foot"><span className="tw-brand">TIDEWELL</span><span>Guided coastal descents · Painted before dived</span></footer>
    </div>
  );
}
