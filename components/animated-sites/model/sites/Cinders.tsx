"use client";
/* CINDERS — «HRAUN», fire-and-ice expeditions across Iceland's elemental spine. Мир: чёрный пляж
   с базальтовыми стеками → гейзерное поле → ночное лавовое поле → синий язык ледника на рассвете.
   Шрифты Big Shoulders Display × Public Sans, палитра basalt / steam / ember / glacier.
   ОДИН ШОВ ЗЕМЛИ: берег → (гейзер заливает кадр белым) пар → (спуск в камень сквозь огненный шов)
   лава → (кадр раскалывается светящейся трещиной) ледник. Актёр — нить пара рядом с путником: растёт
   в колонну гейзера, в дым лавы и туман ледника, меняя цвет белый → огненный → голубой (свой
   Atmosphere внутри актёра); в лендинге идёт по шкале температур и поднимается над заявкой. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./cinders.css";

const A = "/uploads/1/animated/cinders";
const scenes: ReelScene[] = [
  { id: "blacksand", dark: true, len: 1.05, hold: 0.5, midShift: 27, fgLift: 35, fgMask: [33, 44], bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="cn-eyebrow">Elemental expeditions · Iceland</span>
      <h1>Walk the line between<br /><em>fire and ice.</em></h1>
      <p>Four days on foot — black-sand shoreline, a steaming geyser field, a glowing night lava flow, and a blue glacier tongue at dawn.</p>
      <div className="cn-cta"><a href="#book" className="cn-btn">Book the crossing</a><a href="#route" className="cn-ghost">See the route →</a></div>
    </>
  ) },
  { id: "geyser", into: "lightshift", tint: "#f4f7f8", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="cn-idx">— 02 · the breath of the earth</span><h2>Geyser Field</h2>
      <p>Ground that exhales. We route you between the vents at the one hour the light turns the steam to gold.</p></>
  ) },
  { id: "lava", dark: true, into: "descend", tint: "#ff6a2a", len: 1.3, hold: 0.56, spark: 9, midShift: 16, fgMask: [66, 80], bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="cn-freeze"><b>1,117°C</b><span>the rock under tonight&rsquo;s trail</span></div>), copy: (
    <><span className="cn-idx cn-light">— 03 · the forge</span><h2>Night Lava</h2>
      <p>Black rock splits and glows beneath your boots. No moon required — the cracks light the trail themselves.</p></>
  ) },
  { id: "glacier", into: "sweep", tint: "#ff8a4a", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="cn-idx">— 04 · the mouth of ice</span><h2>Blue Glacier</h2>
      <p>Dawn finds the tongue of an ice cap grinding down to meet black gravel. Every crossing ends here, inside the blue.</p></>
  ) },
];

const STEPS: [string, string, string][] = [
  ["01", "Arrival & briefing", "Reykjavík staging, gear fit, and the weather window locked before we leave the paved road."],
  ["02", "The black shore", "Basalt sea-stacks at first light — you learn the pace of volcanic sand before anything gets steeper."],
  ["03", "Vent to vent", "We cross the geyser field roped, stepping only where the ground has been proven solid that morning."],
  ["04", "Fire to ice", "Down into the glowing night lava field, camp on its cooling edge, wake on the glacier tongue above it."],
];

/* шкала температур: четыре состояния земли под ногами (вместо галереи 4 плит и полосы 4 цифр) */
const TEMPS: [string, string, string, string][] = [
  ["1,117°C", "Night lava", "The hottest rock you will stand near — close enough to feel it on your face.", "#ff5a2a"],
  ["100°C", "Geyser field", "Ground that exhales every eight minutes. We cross it roped, on proven rock.", "#f2c9a8"],
  ["4°C", "Black shore", "Surf on volcanic sand, basalt stacks, the first cold breath of the crossing.", "#dfe4e6"],
  ["−8°C", "Blue glacier", "Dawn inside the ice cave — the last step of the line, and the quietest.", "#8fd0ea"],
];

const FEATURES: [string, string][] = [
  ["Certified volcanologist guide", "Reads the rock in real time — where it's cooling, where it isn't."],
  ["Crampons, ropes & thermal shell", "Kitted for both a 900°C flow and a blue-ice crevasse field, same duffel."],
  ["Three fire-warmed nights", "Turf huts heated by the same ground you crossed that day."],
  ["Six walkers, maximum", "Small enough to move fast when the vent field says move fast."],
];

export function Cinders() {
  return (
    <div className="cn">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Public+Sans:wght@400;500;600;700&display=swap"]} />

      <header className="cn-nav">
        <span className="cn-brand">HRAUN</span>
        <nav><a href="#route">The line</a><a href="#temps">Ground states</a><a href="#book" className="cn-nav-cta">Book a crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="walk the line ↓" />

      {/* СКВОЗНОЙ СЛОЙ: базальт ↔ лёд под лендингом, пепел в холодном воздухе, угли над лавой */}
      <Atmosphere stops={[
        { at: ".cn-manifest", color: "#131216" }, { at: ".cn-steps", color: "#15141a" }, { at: ".cn-temp-row:nth-child(1)", color: "#2a120c" },
        { at: ".cn-temp-row:nth-child(4)", color: "#10202a" }, { at: ".cn-features", color: "#1a2830" }, { at: ".cn-split", color: "#141318" },
        { at: ".cn-quote", color: "#1c2a31" }, { at: ".cn-deal", color: "#1e1512" },
      ]} />
      <Backdrop from=".cn-manifest" dim={0.48} plates={[
        { at: ".cn-manifest", src: `${A}/s1-bg.webp` }, { at: ".cn-steps", src: `${A}/s2-bg.webp` },
        { at: ".cn-temp", src: `${A}/s2-bg.webp` }, { at: ".cn-features", src: `${A}/s4-bg.webp` },
        { at: ".cn-quote", src: `${A}/s4-bg.webp` }, { at: ".cn-deal", src: `${A}/s1-bg.webp` },
      ]} />
      <Weather kind="ash" count={20} color="#cfd4d6" color2="#8a8f95" between={[reelMark("s0"), ".cn-climax"]} world={0.5} zIndex={31} />
      <Weather kind="embers" count={14} color="#ff6a2a" color2="#ffb04a" between={[reelMark("t1"), reelMark("t2")]} world={0.7} zIndex={31} seed={5} />

      {/* НИТЬ ПАРА — цвет пишет собственный Atmosphere на сам актёр (--atm): белый → огненный → голубой */}
      <Actor className="cn-wisp-actor" width="6vw" zIndex={33} bob={4} tilt={0.06} stops={[
        { at: reelMark("s0"), pose: { x: 73.5, y: 34, s: 0.62, o: 0.85 } },
        { at: reelMark("t0"), pose: { x: 64, y: 34, s: 2.3, o: 0.95 } },
        { at: reelMark("s1"), pose: { x: 69, y: 36, s: 1.7, o: 0.72 } },
        { at: reelMark("t1"), pose: { x: 62, y: 18, s: 1.2, o: 0.6 } },
        { at: reelMark("s2"), pose: { x: 55, y: 36, s: 1.15, o: 0.9 } },
        { at: reelMark("h2"), pose: { x: 54, y: 35, s: 1.2, o: 0.9 } },
        { at: reelMark("t2"), pose: { x: 58, y: 34, s: 1.5, o: 0.8, blur: 2 } },
        { at: reelMark("s3"), pose: { x: 74, y: 44, s: 1.25, o: 0.62 } },
        { at: ".cn-manifest", pose: { x: 80, y: 40, s: 1, o: 0 } },
        ...TEMPS.map((_, i) => ({ at: `.cn-temp-row:nth-child(${i + 1})`, pose: { x: 3.1, y: 14, s: 0.72, o: 0.95, dock: true } })),
        { at: ".cn-features", pose: { x: 6, y: 40, s: 0.6, o: 0 } },
        { at: ".cn-deal-card", anchor: 0.5, pose: { x: 50, y: -30, s: 1.05, o: 0.9, dock: true } },
        { at: ".cn-climax", pose: { x: 50, y: 20, s: 1.4, o: 0 } },
      ]}>
        <Atmosphere stops={[
          { at: reelMark("s0"), color: "#eef1f0" }, { at: reelMark("s1"), color: "#ffffff" }, { at: reelMark("t1"), color: "#ffc39a" },
          { at: reelMark("s2"), color: "#ff6a2a" }, { at: reelMark("t2"), color: "#ffb08a" }, { at: reelMark("s3"), color: "#8fd0ea" },
          ...TEMPS.map(([, , , c], i) => ({ at: `.cn-temp-row:nth-child(${i + 1})`, color: c })),
          { at: ".cn-deal-card", color: "#ffb08a" },
        ]} />
        <svg className="cn-wisp" viewBox="0 0 60 300" aria-hidden>
          <path className="cn-w1" d="M30,300 C18,250 42,210 28,160 S16,90 34,40 S30,0 30,-20" />
          <path className="cn-w2" d="M34,300 C46,240 22,200 36,150 S48,80 26,30" />
          <path className="cn-w3" d="M26,300 C14,260 30,220 20,180 S10,120 22,70" />
        </svg>
      </Actor>

      {/* MANIFESTO */}
      <section className="cn-manifest">
        <p>Iceland does not choose between fire and ice. <em>Neither do we.</em></p>
      </section>

      {/* STEPS — четыре дня вдоль светящейся трещины (вместо бегущей строки) */}
      <section className="cn-steps" id="steps">
        <div className="cn-steps-head"><span className="cn-kick">Four days, one seam of the earth</span><h2>How the crossing works.</h2></div>
        <div className="cn-steps-body">
          <svg className="cn-crack" viewBox="0 0 40 400" preserveAspectRatio="none" aria-hidden>
            <path d="M20,0 L12,40 L26,78 L16,120 L28,166 L14,212 L24,250 L10,300 L22,346 L18,400" />
          </svg>
          <ol className="cn-steps-list">
            {STEPS.map(([n, t, s]) => (
              <li className="cn-step" key={n}><span className="cn-step-n">{n}</span><div><h3>{t}</h3><p>{s}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {/* TEMPERATURES — шкала земли: от лавы до льда, нить пара меняет цвет на каждой отметке */}
      <section className="cn-temp" id="temps">
        <div className="cn-temp-head"><span className="cn-kick">Four ground states</span><h2>The chapters underfoot.</h2></div>
        <ol className="cn-temp-list">
          {TEMPS.map(([v, t, s, c]) => (
            <li className="cn-temp-row" key={t} style={{ ["--c" as string]: c }}>
              <b>{v}</b>
              <div><h3>{t}</h3><p>{s}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURES — лёд: что включено */}
      <section className="cn-features">
        <div className="cn-features-head"><span className="cn-kick">What&rsquo;s included</span><h2>Built for two extremes at once.</h2></div>
        <div className="cn-features-grid">
          {FEATURES.map(([t, s], i) => (
            <div className="cn-feature" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — SPLIT, медиа справа (ночная лава) */}
      <section className="cn-split" id="route">
        <div className="cn-split-copy">
          <span className="cn-kick cn-kick-ember">The elemental line</span>
          <h2>Where the glacier is losing, the mountain is winning.</h2>
          <p>Iceland sits on the seam between two tectonic plates — the same rift that lifts the lava also carves the ice above it. We built the crossing to put you exactly on that line: one night on glowing rock, one dawn on blue ice, nothing in between but black gravel.</p>
          <a href="#book" className="cn-link">Read the geology →</a>
        </div>
        <div className="cn-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden>
          <span className="cn-split-glow" aria-hidden />
        </div>
      </section>

      {/* QUOTE — лёд, слева */}
      <section className="cn-quote">
        <figure>
          <blockquote>&ldquo;I have stood on glaciers before. I had never watched one glow orange from the inside, then walked onto blue ice an hour later. It rearranges something.&rdquo;</blockquote>
          <figcaption>— Rikke S., guest walker · six crossings, all seasons</figcaption>
        </figure>
      </section>

      {/* DEAL — над заявкой поднимается нить пара */}
      <section className="cn-deal" id="book">
        <div className="cn-deal-card">
          <span className="cn-kick">The four-day crossing</span>
          <div className="cn-price"><b>€890</b><span>/ walker · guide, gear &amp; three fire-warmed nights</span></div>
          <p>Departs from Reykjavík at dawn. Weather window is locked before you land — if the seam won&rsquo;t hold, we reschedule, not refund.</p>
          <a href="#" className="cn-btn">Reserve a window</a>
          <span className="cn-note">Groups of six · Full kit provided</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="cn-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="cn-climax-veil" aria-hidden />
        <div className="cn-climax-copy"><h2>The seam is <em>one flight</em> away.</h2><a href="#book" className="cn-btn">Book the crossing</a></div>
      </section>

      <footer className="cn-foot"><span className="cn-brand">HRAUN</span><span>Fire-and-ice expeditions · Reykjavík, Iceland</span></footer>
    </div>
  );
}
