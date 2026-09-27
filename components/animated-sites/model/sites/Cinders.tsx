"use client";
/* CINDERS — «HRAUN», fire-and-ice expeditions across Iceland's elemental spine. Мир: чёрный пляж
   с базальтовыми стеками → гейзерное поле → ночное лавовое поле с трещинами → синий язык ледника на рассвете.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Big Shoulders Display × Public Sans, палитра basalt/steam/ember/glacier). */
import { Reel, type ReelScene } from "../reel";
import "./cinders.css";

const A = "/uploads/1/animated/cinders";
const scenes: ReelScene[] = [
  { id: "blacksand", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="cn-eyebrow">Elemental expeditions · Iceland</span>
      <h1>Walk the line between<br /><em>fire and ice.</em></h1>
      <p>Four days on foot — black-sand shoreline, a steaming geyser field, a glowing night lava flow, and a blue glacier tongue at dawn.</p>
      <div className="cn-cta"><a href="#book" className="cn-btn">Book the crossing</a><a href="#route" className="cn-ghost">See the route →</a></div>
    </>
  ) },
  { id: "geyser", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="cn-idx">— 02 · the breath of the earth</span><h2>Geyser Field</h2>
      <p>Ground that exhales. We route you between the vents at the one hour the light turns the steam to gold.</p></>
  ) },
  { id: "lava", dark: true, spark: 9, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="cn-idx cn-light">— 03 · the forge</span><h2 className="cn-hl">Night Lava</h2>
      <p className="cn-pl">Black rock splits and glows beneath your boots. No moon required — the cracks light the trail themselves.</p></>
  ) },
  { id: "glacier", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="cn-idx">— 04 · the mouth of ice</span><h2>Blue Glacier</h2>
      <p>Dawn finds the tongue of an ice cap grinding down to meet black gravel. Every crossing ends here, inside the blue.</p></>
  ) },
];

export function Cinders() {
  return (
    <div className="cn">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Public+Sans:wght@400;500;600;700&display=swap" />

      <header className="cn-nav">
        <span className="cn-brand">HRAUN</span>
        <nav><a href="#route">The line</a><a href="#steps">How it works</a><a href="#book" className="cn-nav-cta">Book a crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend into the rock ↓" />

      {/* MARQUEE — running elemental ticker (блок, которого нет у эталона) */}
      <div className="cn-marquee" aria-hidden>
        <div className="cn-marquee-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>BASALT — STEAM — EMBER — GLACIER — BASALT — STEAM — EMBER — GLACIER — BASALT — STEAM — EMBER — GLACIER —&nbsp;</span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="cn-manifest">
        <p>Iceland does not choose between fire and ice. <em>Neither do we.</em></p>
      </section>

      {/* STEPS / PROCESS — как проходит переход (блок, которого нет у эталона) */}
      <section className="cn-steps" id="steps">
        <div className="cn-steps-head"><span className="cn-kick">Four days, one seam of the earth</span><h2>How the crossing works.</h2></div>
        <ol className="cn-steps-list">
          {[["01", "Arrival & briefing", "Reykjavík staging, gear fit, and the weather window locked before we leave the paved road."],
            ["02", "The black shore", "Basalt sea-stacks at first light — you learn the pace of volcanic sand before anything gets steeper."],
            ["03", "Vent to vent", "We cross the geyser field roped, stepping only where the ground has been proven solid that morning."],
            ["04", "Fire to ice", "Down into the glowing night lava field, camp on its cooling edge, wake on the glacier tongue above it."]].map(([n, t, s], i) => (
            <li className="cn-step" key={i}><span className="cn-step-n">{n}</span><div><h3>{t}</h3><p>{s}</p></div></li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS — что включено (блок, которого нет у эталона) */}
      <section className="cn-features">
        <div className="cn-features-head"><span className="cn-kick">What's included</span><h2>Built for two extremes at once.</h2></div>
        <div className="cn-features-grid">
          {[["Certified volcanologist guide", "Reads the rock in real time — where it's cooling, where it isn't."],
            ["Crampons, ropes & thermal shell", "Kitted for both a 900°C flow and a blue-ice crevasse field, same duffel."],
            ["Three fire-warmed nights", "Turf huts heated by the same ground you crossed that day."],
            ["Six walkers, maximum", "Small enough to move fast when the vent field says move fast."]].map(([t, s], i) => (
            <div className="cn-feature" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — SPLIT showcase, медиа СПРАВА (ночная лава), fire/ice контраст в стилистике блока */}
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

      {/* GALLERY — 4 главы мира как обложки (блок, которого нет у эталона) */}
      <section className="cn-gallery">
        <div className="cn-gallery-head"><span className="cn-kick">Four ground states</span><h2>The chapters underfoot.</h2></div>
        <div className="cn-gallery-grid">
          {[["Black Shore", `${A}/s1-bg.webp`], ["Geyser Field", `${A}/s2-bg.webp`], ["Night Lava", `${A}/s3-bg.webp`], ["Blue Glacier", `${A}/s4-bg.webp`]].map(([t, img], i) => (
            <div className="cn-tile" key={i} style={{ backgroundImage: `url(${img})` }}>
              <span className="cn-tile-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cn-tile-t">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="cn-stats">
        {[["4", "days on foot"], ["3", "fire-warmed nights"], ["1,117°C", "hottest rock you'll stand near"], ["6", "walkers per crossing, max"]].map(([n, l], i) => (
          <div className="cn-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="cn-quote">
        <blockquote>"I have stood on glaciers before. I had never watched one glow orange from the inside, then walked onto blue ice an hour later. It rearranges something."</blockquote>
        <cite>— Rikke S., guest walker · six crossings, all seasons</cite>
      </section>

      {/* DEAL */}
      <section className="cn-deal" id="book">
        <div className="cn-deal-card">
          <span className="cn-kick">The four-day crossing</span>
          <div className="cn-price"><b>€890</b><span>/ walker · guide, gear &amp; three fire-warmed nights</span></div>
          <p>Departs from Reykjavík at dawn. Weather window is locked before you land — if the seam won't hold, we reschedule, not refund.</p>
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
