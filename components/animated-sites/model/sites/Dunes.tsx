"use client";
/* DUNES — «SOSSUS», a minimalist Namib design-lodge. Мир: графичный минимализм пустыни — гребень дюны
   как жёсткая линия света/тени. Собран на общем движке <Reel/>; лендинг — свой (big-type сигнатура +
   steps + gallery), шрифт-пейринг Anton × Work Sans, палитра apricot/rust-dune/cobalt-shadow/pale-pan. */
import { Reel, type ReelScene } from "../reel";
import "./dunes.css";

const A = "/uploads/1/animated/dunes";
const scenes: ReelScene[] = [
  { id: "ridgeline", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="dn-eyebrow">A retreat in the Namib</span>
      <h1>Stand where<br /><em>the light</em> splits in two.</h1>
      <p>Six rammed-earth rooms set against the tallest dunes on Earth. One ridge of shadow, one field of sun — and nothing else on the schedule.</p>
      <div className="dn-cta"><a href="#book" className="dn-btn">Reserve a stay</a><a href="#line" className="dn-ghost">See the ridge →</a></div>
    </>
  ) },
  { id: "tree", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="dn-idx">— 02 · the pan</span><h2>The Dead Tree</h2>
      <p>Six hundred years standing, roots sealed under white clay. We set our furthest room a hundred metres from it and changed nothing else.</p></>
  ) },
  { id: "crest", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 7, copy: (
    <><span className="dn-idx">— 03 · the crest</span><h2>The Wind Line</h2>
      <p>Every afternoon the crest exhales a veil of gold sand into the sky. Guides call the hour by it. We just call it the best seat in the desert.</p></>
  ) },
  { id: "sunset", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="dn-idx">— 04 · the fall of light</span><h2>Long Shadow</h2>
      <p>The dunes turn the colour of coals and every shadow doubles in length. Dinner is set on the ridge, in the last ten minutes of warmth.</p></>
  ) },
];

export function Dunes() {
  return (
    <div className="dn">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700;800&display=swap" />

      <header className="dn-nav">
        <span className="dn-brand">SOSSUS</span>
        <nav><a href="#line">The Line</a><a href="#stays">Stays</a><a href="#journal">Journal</a><a href="#book" className="dn-nav-cta">Reserve a stay</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* BIG-TYPE — signature: one enormous statement in vast whitespace */}
      <section className="dn-big">
        <span className="dn-big-kick">The philosophy</span>
        <p className="dn-big-line">Half the dune is <em>lit.</em><br />Half is not.</p>
        <span className="dn-big-foot">That is the whole design.</span>
      </section>

      {/* STEPS — how a stay unfolds (block type absent from Tidewell) */}
      <section className="dn-steps" id="stays">
        <div className="dn-steps-head"><span className="dn-kick">One day, in order</span><h2>How a stay unfolds.</h2></div>
        <ol className="dn-steps-row">
          {[["01", "Arrival", "Dusk. No wifi password, just tea on the step and the first dune going dark."],
            ["02", "Dawn Walk", "Out before the sun, to the ridge, to watch the shadow retreat off the sand."],
            ["03", "The Long Shade", "Midday inside thick rammed-earth walls — cool, dim, nothing scheduled."],
            ["04", "Ridge Dinner", "One table, set on the dune, in the last ten minutes of the light."]].map(([n, t, s], i) => (
            <li className="dn-step" key={i}><span className="dn-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* SPLIT — the architecture */}
      <section className="dn-split" id="line">
        <div className="dn-split-media" style={{ backgroundImage: `url(${A}/s1-bg.webp)` }} aria-hidden />
        <div className="dn-split-copy">
          <span className="dn-kick">The architecture</span>
          <h2>We drew one hard line and stopped.</h2>
          <p>Each room follows the dune's own geometry — a solid wall for shadow, a long pane of glass for the sun. Nothing is decorated. The desert already did that.</p>
          <a href="#book" className="dn-link">Read the plans →</a>
        </div>
      </section>

      {/* GALLERY — four plates (extra block type absent from Tidewell) */}
      <section className="dn-gallery">
        <div className="dn-gallery-head"><span className="dn-kick">Four hours, four moods</span><h2>The same ridge, all day.</h2></div>
        <div className="dn-gallery-grid">
          {[["Ridgeline", "06:40", `${A}/s1-bg.webp`], ["The Pan", "11:00", `${A}/s2-bg.webp`], ["The Crest", "16:20", `${A}/s3-bg.webp`], ["Sunset Fall", "18:45", `${A}/s4-bg.webp`]].map(([t, time, img], i) => (
            <figure className="dn-plate" key={i} style={{ backgroundImage: `url(${img})` }}>
              <figcaption><b>{t}</b><span>{time}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="dn-stats">
        {[["6", "rooms, no more"], ["1", "private concession"], ["40", "km to the nearest neighbour"], ["0", "scheduled activities"]].map(([n, l], i) => (
          <div className="dn-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="dn-quote">
        <blockquote>“I didn't call anyone the entire stay. I didn't want to — <em>the light was doing enough</em>.”</blockquote>
        <cite>— A. Reyes, architect · Cape Town</cite>
      </section>

      {/* DEAL */}
      <section className="dn-deal" id="book">
        <div className="dn-deal-card">
          <span className="dn-kick">The Ridge Room</span>
          <div className="dn-price"><b>$780</b><span>/ night · glass wall, private plunge pool, silence</span></div>
          <p>One room, one dune, no view repeated at any hour. Concession access and all meals on the ridge are included.</p>
          <a href="#" className="dn-btn">Reserve a stay</a>
          <span className="dn-note">Two-night minimum · Six rooms only</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="dn-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="dn-climax-veil" aria-hidden />
        <div className="dn-climax-copy"><h2>The light <em>won't wait.</em></h2><a href="#book" className="dn-btn">Reserve a stay</a></div>
      </section>

      <footer className="dn-foot" id="journal"><span className="dn-brand">SOSSUS</span><span>A retreat in the Namib · Six rooms, one horizon.</span></footer>
    </div>
  );
}
