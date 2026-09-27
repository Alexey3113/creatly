"use client";
/* MERIDIAN — «guided night crossings». Мир: нуар-город от золотого часа на крышах до неонового ливня
   и чистого рассвета — сквозной мотив: одна красная неоновая вывеска, отражённая в каждой сцене.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Bricolage Grotesque × Space Grotesk, палитра brick/night-blue/neon-rose/neon-cyan). */
import "./meridian.css";
import { Reel, type ReelScene } from "../reel";

const A = "/uploads/1/animated/meridian";
const scenes: ReelScene[] = [
  { id: "rooftops", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="mr-eyebrow">Golden hour, rooftop side</span>
      <h1>Meet the city<br /><em>before neon wins.</em></h1>
      <p>One guided crossing from rooftop gold to 3 a.m. rain — four hours, four blocks, and the same red sign following you down the whole way.</p>
      <div className="mr-cta"><a href="#book" className="mr-btn">Book the crossing</a><a href="#route" className="mr-ghost">See the route →</a></div>
    </>
  ) },
  { id: "alley", dark: true, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="mr-idx">— 02 · the alley</span><h2>The Sign Finds You</h2>
      <p>Wet brick, cyan steam, one red neon word bent low over the street. From here it's in every reflection — puddle, visor, window — before we ever have to point it out.</p></>
  ) },
  { id: "rain", dark: true, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="mr-idx mr-light">— 03 · the crossing</span><h2 className="mr-hl">Downpour</h2>
      <p className="mr-pl">The whole intersection turns to glass. Headlights smear, the sign doubles in the gutter, and for one block the city looks like it's on fire and drowning at once.</p></>
  ) },
  { id: "dawncity", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="mr-idx">— 04 · dawn</span><h2>The Quiet Hour</h2>
      <p>Rain stops. Neon dims to pink ash. You're the only footsteps on an avenue built for a million people. Nobody photographs this part. Everybody remembers it.</p></>
  ) },
];

const MOODS = [
  { n: "01 · dusk", t: "Rooftop Gold", d: "Water towers and antennae catching fire before the skyline switches to neon.", bg: `${A}/s1-bg.webp` },
  { n: "02 · night", t: "Alley Neon", d: "Cyan steam and wet brick — the sign that never lets you forget where you are.", bg: `${A}/s2-bg.webp` },
  { n: "03 · storm", t: "Neon Downpour", d: "The crossing where the whole street turns to glass and doubled headlights.", bg: `${A}/s3-bg.webp` },
  { n: "04 · dawn", t: "Cool Dawn", d: "Empty avenues, pink light, a city rinsed clean for four hours only.", bg: `${A}/s4-bg.webp` },
];

const STEPS = [
  ["6:40 PM", "The Roof", "We start above the noise, drinks in hand, watching the light go from gold to bruise."],
  ["9:00 PM", "The Alley", "Down through the service stairs into the part of the map with no street signs — only the red one."],
  ["11:30 PM", "The Storm", "If it's raining we don't wait it out. We walk straight into the best-looking ten minutes of the year."],
  ["5:15 AM", "The Line", "One diner, one window seat, the whole avenue turning from ink to peach outside the glass."],
];

export function Meridian() {
  return (
    <div className="mr">
      <header className="mr-nav">
        <span className="mr-brand">MERIDIAN<span>.</span></span>
        <nav><a href="#route">The route</a><a href="#moods">The sign</a><a href="#nights">Nights</a><a href="#book" className="mr-nav-cta">Book the crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* MARQUEE — running strip, straight off the hero */}
      <div className="mr-marquee" aria-hidden>
        <div className="mr-marquee-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>GOLDEN HOUR<em>·</em>NEON RAIN<em>·</em>THE SIGN<em>·</em>LAST CALL<em>·</em>FIRST LIGHT<em>·</em>GOLDEN HOUR<em>·</em>NEON RAIN<em>·</em>THE SIGN<em>·</em>LAST CALL<em>·</em>FIRST LIGHT<em>·</em></span>
          ))}
        </div>
      </div>

      {/* BIG-TYPE — the problem: everyone plans for noon */}
      <section className="mr-big">
        <p>Every guidebook shows you noon. <em>We only work the other twelve hours.</em></p>
      </section>

      {/* GALLERY GRID — SIGNATURE: four city moods, s1..s4 as mood tiles */}
      <section className="mr-gallery" id="moods">
        <div className="mr-gallery-head">
          <span className="mr-kick">One city, four faces</span>
          <h2>The sign looks different in every light — the street doesn't.</h2>
        </div>
        <div className="mr-grid">
          {MOODS.map((m) => (
            <div className="mr-tile" key={m.t} style={{ backgroundImage: `url(${m.bg})` }}>
              <div className="mr-tile-copy">
                <span className="mr-tile-num">{m.n}</span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS — how a crossing runs, four timed steps */}
      <section className="mr-process" id="nights">
        <div className="mr-process-head">
          <span className="mr-kick">Not a walking tour</span>
          <h2>How a crossing runs.</h2>
        </div>
        <div className="mr-steps">
          {STEPS.map(([time, t, s], i) => (
            <div className="mr-step" key={i}><b>{time}</b><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase frame + method */}
      <section className="mr-split" id="route">
        <div className="mr-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="mr-split-copy">
          <span className="mr-kick">Why it never feels like a tour</span>
          <h2>We scout every reflection before we bring a guest.</h2>
          <p>Every crossing is walked, timed and mapped in advance — the exact minute the light turns, the exact puddle that holds the sign best. You're never standing around waiting for the city to perform.</p>
          <a href="#book" className="mr-link">Read how we build a route →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="mr-stats">
        {[["4", "chapters, one night"], ["1", "sign, every reflection"], ["12", "guests per crossing, max"], ["3AM", "the hour most tours quit — we don't"]].map(([n, l], i) => (
          <div className="mr-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="mr-quote">
        <blockquote>“I've lived here nine years and saw my own street for the first time. <em>That red sign is going to follow me home.</em>”</blockquote>
        <cite>— D. Okafor, guest · Crossing #114</cite>
      </section>

      {/* DEAL */}
      <section className="mr-deal" id="book">
        <div className="mr-deal-card">
          <span className="mr-kick">The guided crossing</span>
          <div className="mr-price"><b>$145</b><span>/ guest · guide, transit &amp; the diner tab</span></div>
          <p>Four hours, four blocks of the city most people never plan for — rooftop, alley, storm, dawn. Weather isn't a maybe here. It's the point.</p>
          <a href="#" className="mr-btn">Reserve a night</a>
          <span className="mr-note">Runs rain or shine · Small groups only</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="mr-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="mr-climax-veil" aria-hidden />
        <div className="mr-climax-copy"><h2>One sign. <em>Every night, different light.</em></h2><a href="#book" className="mr-btn">Book the crossing</a></div>
      </section>

      <footer className="mr-foot"><span className="mr-brand">MERIDIAN</span><span>Guided night crossings · One sign, every reflection</span></footer>
    </div>
  );
}
