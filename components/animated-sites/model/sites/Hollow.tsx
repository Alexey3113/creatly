"use client";
/* HOLLOW — «lantern-led night walks into a forest that lights itself». Мир: сумеречная чаща →
   светящаяся грибная роща → рогатый лесной дух → рассветная поляна. Собран на общем движке <Reel/>;
   лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, свой шрифт-пейринг
   DM Serif Display × Space Grotesk, палитра deep-moss/bio-teal/glow/violet + mint CTA).
   Сигнатурный блок: аккордеон «The Rules of the Wood» — лор+правила похода в одном. */
import { useState } from "react";
import { Reel, type ReelScene } from "../reel";
import "./hollow.css";

const A = "/uploads/1/animated/hollow";

const scenes: ReelScene[] = [
  {
    id: "thicket", dark: true, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
      <>
        <span className="hl-eyebrow">Guided night walks, after dark</span>
        <h1>Walk into<br /><em>the glow.</em></h1>
        <p>A lantern-lit path through a forest that lights itself — moss, spore, and a spirit older than the trees. Nothing down there is waiting to hurt you.</p>
        <div className="hl-cta"><a href="#book" className="hl-btn">Book a lantern walk</a><a href="#rules" className="hl-ghost">Read the rules of the wood →</a></div>
      </>
    ),
  },
  {
    id: "grove", dark: true, spark: 9, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
      <>
        <span className="hl-idx">— 02 · the grove</span>
        <h2>Spore Grove</h2>
        <p>Where the mushrooms breathe cold teal light and the pool holds it still enough to touch. You'll be told, gently, not to.</p>
      </>
    ),
  },
  {
    id: "spirit", dark: true, spark: 10, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
      <>
        <span className="hl-idx hl-light">— 03 · the clearing</span>
        <h2 className="hl-hl">The Warden</h2>
        <p className="hl-pl">Something tall and gentle waits where the trees lean in. It has never once frightened a soul who came with a lantern lit and a quiet mouth.</p>
      </>
    ),
  },
  {
    id: "dawnwood", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
      <>
        <span className="hl-idx">— 04 · dawnwood</span>
        <h2>The Way Out</h2>
        <p>The glow thins into dew and birdsong. You leave the way you came, and somehow lighter than you walked in.</p>
      </>
    ),
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Threshold", "Meet your guide at the treeline as the light goes. A lantern is issued, the rules are said aloud once, and your eyes are given ten minutes to forget the sun."],
  ["02", "Descent", "The thicket path in true dark — roots, ferns, the first cold-blue flicker off a trunk. Eyes adjust. The moss, somehow, starts to answer."],
  ["03", "The Grove", "You kneel at the ring of glowing fungi. Spores lift off the pool like slow embers. Nobody talks much here. Nobody wants to."],
  ["04", "The Clearing", "If the wood is quiet enough that night, it comes. Guides won't promise it. Guides have also never had a group leave disappointed."],
];

const FEATURES: [string, string, string][] = [
  ["The Lantern Walk", "2 hrs · groups of 8", "The full four-chapter route — thicket to dawnwood — with a guide who's walked it several hundred times and still lowers her voice at the grove."],
  ["Spore Grove Ritual", "90 min · private, up to 2", "A grove-only evening. Wood-herb tea brewed streamside, one held silence, no lantern swung above the waist. Built for the ones chasing a feeling, not a checklist."],
  ["The Spirit Watch", "Overnight · serious folklorists", "A small vigil at the clearing's edge until first violet light. Not guaranteed. Not for the faint of patience. Extremely for everyone who's ever wanted this to be real."],
];

const GALLERY: [string, string, string][] = [
  ["thicket", "Chapter I", "Twilight Thicket"],
  ["grove", "Chapter II", "Spore Grove"],
  ["spirit", "Chapter III", "The Clearing"],
  ["dawnwood", "Chapter IV", "Dawnwood"],
];

const RULES: [string, string][] = [
  ["Keep the lantern low and steady.", "Sudden light spooks the glow-moss into hiding for the rest of the night. Carry it at your hip, not your eyes."],
  ["Never eat what glows.", "The spore grove is for looking, not tasting — however good the tea smells. Guides carry the real, brewed kind."],
  ["Speak softly, or not at all.", "The Warden answers quiet. In twelve years it has not once answered a raised voice, and nobody's keen to test that."],
  ["Leave before the moss turns violet.", "That's the wood's way of saying goodnight. Every walk turns back at the first violet bloom, no exceptions, no lingering."],
  ["What should I bring?", "Sturdy boots and a coat past 8pm, even in July. We supply the lantern, the map, and the nerve."],
  ["Is it safe for children?", "The Lantern Walk welcomes ages 10 and up. The Spirit Watch is adults-only — it asks for a kind of patience kids haven't earned yet."],
];

function Rules() {
  const [open, setOpen] = useState(0);
  return (
    <section className="hl-rules" id="rules">
      <div className="hl-rules-head">
        <span className="hl-kick">Before you walk</span>
        <h2>The Rules of the Wood</h2>
        <p>Six things the wood asks of you. Half are lore, half are logistics — the wood has never much cared for the difference.</p>
      </div>
      <ol className="hl-rules-list">
        {RULES.map(([q, a], i) => (
          <li className={`hl-rule ${open === i ? "hl-rule-open" : ""}`} key={i}>
            <button className="hl-rule-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="hl-rule-n">{String(i + 1).padStart(2, "0")}</span>
              <span>{q}</span>
              <span className="hl-rule-mark" aria-hidden>{open === i ? "–" : "+"}</span>
            </button>
            <div className="hl-rule-a"><p>{a}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Hollow() {
  return (
    <div className="hl">
      <header className="hl-nav">
        <span className="hl-brand">HOLLOW</span>
        <nav>
          <a href="#walks">Walks</a>
          <a href="#rules">Rules of the wood</a>
          <a href="#book" className="hl-nav-cta">Book a lantern walk</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="go deeper ↓" />

      {/* BIG-TYPE — oversized single statement (не тождественно tidewell-манифесто) */}
      <section className="hl-big">
        <p>The wood was never dark.<br /><em>You</em> just hadn't lit your lantern yet.</p>
      </section>

      {/* STEPS / PROCESS — как проходит поход, горизонтальная нумерация */}
      <section className="hl-steps" id="walks">
        <div className="hl-steps-head"><span className="hl-kick">How a walk unfolds</span><h2>Four chapters, one lantern.</h2></div>
        <ol className="hl-steps-row">
          {STEPS.map(([n, t, s]) => (
            <li key={n}><span className="hl-steps-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS — три формата похода */}
      <section className="hl-features">
        <div className="hl-features-head"><span className="hl-kick">Three ways into the wood</span><h2>Pick your depth.</h2></div>
        <div className="hl-features-grid">
          {FEATURES.map(([t, meta, s]) => (
            <div className="hl-feature" key={t}>
              <span className="hl-feature-meta">{meta}</span>
              <h3>{t}</h3>
              <p>{s}</p>
              <a href="#book" className="hl-feature-link">Reserve →</a>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY — 4 обложки-плиты из своих bg */}
      <section className="hl-gallery">
        <div className="hl-gallery-head"><span className="hl-kick">The route, in four plates</span><h2>Every chapter of the wood.</h2></div>
        <div className="hl-gallery-grid">
          {GALLERY.map(([id, kick, t], i) => (
            <div className="hl-gallery-tile" key={id} style={{ backgroundImage: `url(${A}/s${i + 1}-bg.webp)` }}>
              <div className="hl-gallery-veil" aria-hidden />
              <span className="hl-gallery-kick">{kick}</span>
              <h3>{t}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — ACCORDION «The Rules of the Wood» */}
      <Rules />

      {/* STATS */}
      <section className="hl-stats">
        {[["12", "years guiding the thicket"], ["41", "glow-fungus species mapped"], ["8", "walkers per lantern, max"], ["1", "spirit, seen by everyone who stays quiet"]].map(([n, l]) => (
          <div className="hl-stat" key={n}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="hl-quote">
        <blockquote>"We were told a forest spirit doesn't sound real until you're standing in front of one, holding a lantern, absolutely certain <em>it's looking back</em>."</blockquote>
        <cite>— Priya N., first-time walker · the November grove</cite>
      </section>

      {/* MARQUEE — бегущая строка мотива */}
      <div className="hl-marquee" aria-hidden>
        <div className="hl-marquee-track">
          <span>MOSS · SPORE · LANTERN · GLOW · WARDEN · DAWNWOOD · </span>
          <span>MOSS · SPORE · LANTERN · GLOW · WARDEN · DAWNWOOD · </span>
        </div>
      </div>

      {/* DEAL */}
      <section className="hl-deal" id="book">
        <div className="hl-deal-card">
          <span className="hl-kick">The Lantern Walk</span>
          <div className="hl-price"><b>$68</b><span>/ walker · lantern, guide &amp; the whole route</span></div>
          <p>Two hours, four chapters, one small group. We hand you a lit lantern at the treeline and walk you home again after the grove, the clearing, and whatever else is out that night.</p>
          <a href="#" className="hl-btn">Reserve a night</a>
          <span className="hl-note">Free to reschedule · Cancelled on bright moons, refunded in full</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="hl-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hl-climax-veil" aria-hidden />
        <div className="hl-climax-copy">
          <h2>Your lantern is waiting <em>at the treeline.</em></h2>
          <a href="#book" className="hl-btn">Book a lantern walk</a>
        </div>
      </section>

      <footer className="hl-foot">
        <span className="hl-brand">HOLLOW</span>
        <span>Guided night walks · The dark glows back</span>
      </footer>
    </div>
  );
}
