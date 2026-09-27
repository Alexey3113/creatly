"use client";
/* SOLSTICE — "GLØD", nordic cabin retreats. Мир: тепло против холода, путь домой сквозь синюю
   полярную сумерку к оранжевому очагу. Собран на общем движке <Reel/>; лендинг и типографика —
   свои (флэт cut-paper folk-art: слоистая бумага, рваные/зубчатые края, сложенные уголки-тикеты).
   Шрифт-пейринг Big Shoulders Display (высокие folk-poster капители) × DM Sans (тёплый sans). */
import { Reel, type ReelScene } from "../reel";
import "./solstice.css";

const A = "/uploads/1/animated/solstice";

const scenes: ReelScene[] = [
  {
    id: "snowforest",
    bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`,
    copy: (
      <div className="sl-panel">
        <span className="sl-eyebrow">Nordic cabin retreats</span>
        <h1>Come home<br /><em>to the fire.</em></h1>
        <p>Four days deep in spruce and frost, walking the long way back to warm. GLØD builds the whole descent from cold to hearth — you just follow the light in the window.</p>
        <div className="sl-cta"><a href="#book" className="sl-btn">Book a stay</a><a href="#journey" className="sl-ghost">See the journey →</a></div>
      </div>
    ),
  },
  {
    id: "lake",
    bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`,
    copy: (
      <div className="sl-panel">
        <span className="sl-idx">— 02 · the crossing</span>
        <h2>The Frozen Mile</h2>
        <p>Ice thick enough to trust, a straight line drawn across the dark, and a single window already lit gold on the far shore.</p>
      </div>
    ),
  },
  {
    id: "hearth", dark: true, spark: 5,
    bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    copy: (
      <>
        <span className="sl-idx sl-light">— 03 · the arrival</span>
        <h2 className="sl-hl">The Hearth</h2>
        <p className="sl-pl">Boots by the door, kettle already singing, the cold you carried in gone from your shoulders inside a minute.</p>
      </>
    ),
  },
  {
    id: "whiteout",
    bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`,
    copy: (
      <div className="sl-panel">
        <span className="sl-idx">— 04 · the clearing</span>
        <h2>After the White</h2>
        <p>The squall lifts, the pines step back into place, and there it is — small, orange-lit, exactly where you left it.</p>
      </div>
    ),
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Arrival", "Off the train at the valley halt, into a waiting sled. No road runs past this point."],
  ["02", "Into the Pines", "Forty unhurried minutes on snowshoes, a guide's lantern ahead, the last signal bar gone by minute five."],
  ["03", "The Frozen Mile", "The lake's marked crossing, ice-tested every morning. Your cabin's window is the only orange thing on the horizon."],
  ["04", "The Door", "Never locked. The stove was lit an hour before you arrived, and somebody already put the kettle on."],
];

const CARDS: [string, string][] = [
  ["Hearth Suites", "A private wood stove, split and stacked before check-in. Yours to feed all night."],
  ["The Long Table", "A fire-cooked supper at dusk, seats twelve — strangers become neighbours by the second course."],
  ["Lake-Ice Sauna", "Cedar heat to blood-warm, then the frozen mile for a plunge that resets everything."],
  ["Lantern Trails", "Marked spruce paths lit through the blue hour — safe, and beautiful, to walk alone."],
];

const GALLERY: [string, string, string][] = [
  [`${A}/s1-bg.webp`, "Chapter one", "The Pines"],
  [`${A}/s2-bg.webp`, "Chapter two", "The Mile"],
  [`${A}/s3-bg.webp`, "Chapter three", "The Hearth"],
  [`${A}/s4-bg.webp`, "Chapter four", "The Clearing"],
];

const STATS: [string, string][] = [
  ["9", "cabins, one valley"],
  ["96", "hours a fire stays lit"],
  ["40", "minutes, station to silence"],
  ["-14°", "average, never once mattered"],
];

export function Solstice() {
  return (
    <div className="sl">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" />

      <header className="sl-nav">
        <span className="sl-brand">GLØD</span>
        <nav>
          <a href="#journey">The journey</a>
          <a href="#cabins">The cabins</a>
          <a href="#book" className="sl-nav-cta">Book a stay</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="scroll home ↓" />

      {/* MANIFESTO — one big cut-paper thought */}
      <section className="sl-manifest">
        <p>Winter isn't something to survive. <em>It's something to walk into</em> — on purpose, toward a door that's already warm.</p>
      </section>

      {/* STEPS — the journey home, vertical numbered handoffs (unique block) */}
      <section className="sl-steps" id="journey">
        <div className="sl-steps-head">
          <span className="sl-kick">How a stay begins</span>
          <h2>Four handoffs, one straight line to the fire.</h2>
        </div>
        <ol className="sl-steps-list">
          {STEPS.map(([n, t, s]) => (
            <li className="sl-steps-row" key={n}>
              <span className="sl-steps-n">{n}</span>
              <div><h3>{t}</h3><p>{s}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* SIGNATURE SPLIT — media LEFT (the hearth), layered cut-paper showcase */}
      <section className="sl-split" id="cabins">
        <div className="sl-split-media">
          <span className="sl-split-layer sl-split-layer-a" aria-hidden />
          <span className="sl-split-layer sl-split-layer-b" aria-hidden />
          <div className="sl-split-img" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        </div>
        <div className="sl-split-copy">
          <span className="sl-kick">Inside every cabin</span>
          <h2>A fire that was lit before you knocked.</h2>
          <p>Each GLØD cabin is tended through the afternoon by a local keeper — wood split, stove primed, lamps turned low — so the first thing you feel at the door is warmth, not chores. Lake water for the kettle, spruce for the stove, wool folded at the foot of the bed.</p>
          <a href="#book" className="sl-link">Meet the keepers →</a>
        </div>
      </section>

      {/* FEATURE CARDS — what's waiting (block tidewell lacks) */}
      <section className="sl-cards" id="amenities">
        <div className="sl-cards-head">
          <span className="sl-kick">What's waiting</span>
          <h2>Built for the walk in, built for staying still.</h2>
        </div>
        <div className="sl-cards-grid">
          {CARDS.map(([t, s]) => (
            <div className="sl-card" key={t}><b>{t}</b><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* GALLERY — four rooms of winter, bg plates as tiles */}
      <section className="sl-gallery">
        <div className="sl-gallery-head">
          <span className="sl-kick">One journey, four chapters</span>
          <h2>Every stay walks the same four rooms.</h2>
        </div>
        <div className="sl-gallery-grid">
          {GALLERY.map(([img, kick, t]) => (
            <div className="sl-gallery-tile" style={{ backgroundImage: `url(${img})` }} key={t}>
              <div className="sl-gallery-veil" aria-hidden />
              <div className="sl-gallery-cap"><span>{kick}</span><b>{t}</b></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="sl-stats">
        {STATS.map(([n, l]) => (
          <div className="sl-stat" key={l}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="sl-quote">
        <blockquote>“We arrived half-frozen and turned back twice on the ice. The door was already warm before we knocked. <em>I have never been so glad</em> to take off boots.”</blockquote>
        <cite>— Ingrid H., third winter returning</cite>
      </section>

      {/* MARQUEE — decorative cut-paper band (block tidewell lacks) */}
      <div className="sl-marquee" aria-hidden>
        <div className="sl-marquee-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>SNOW · SMOKE · SPRUCE · EMBER · HOME · SNOW · SMOKE · SPRUCE · EMBER · HOME ·</span>
          ))}
        </div>
      </div>

      {/* DEAL */}
      <section className="sl-deal" id="book">
        <div className="sl-deal-card">
          <span className="sl-kick">The stay</span>
          <div className="sl-price"><b>€640</b><span>/ cabin · four nights, full board</span></div>
          <p>Two to four guests, one hearth suite, every meal at the long table, a guide for the frozen mile and the lantern trails. Arrive by sled, leave reluctant.</p>
          <a href="#" className="sl-btn">Reserve your dates</a>
          <span className="sl-note">Free to reschedule for weather · Guide included</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="sl-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="sl-climax-veil" aria-hidden />
        <div className="sl-climax-copy">
          <h2>Your window is<br />already <em>lit.</em></h2>
          <a href="#book" className="sl-btn">Book a stay</a>
        </div>
      </section>

      <footer className="sl-foot">
        <span className="sl-brand">GLØD</span>
        <span>Nordic cabin retreats · Warm before you knock</span>
      </footer>
    </div>
  );
}
