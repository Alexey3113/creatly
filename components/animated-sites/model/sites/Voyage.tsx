"use client";
/* VOYAGE — steampunk airship odyssey across a sky-ocean. Мир: латунный дирижабль «Aurelia»
   пересекает облачный океан, плавучие острова, грозовой фронт и заходит в фонарную гавань
   Amberholt на закате. Собран на общем движке <Reel/>; лендинг и типографика — свои
   (шрифт-пейринг Zilla Slab × Figtree, палитра cloud-cream/sky-cerulean/brass/storm-slate). */
import { useState } from "react";
import { Reel, type ReelScene } from "../reel";
import "./voyage.css";

const A = "/uploads/1/animated/voyage";

const scenes: ReelScene[] = [
  { id: "cloudsea", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <div className="vy-parchment">
      <span className="vy-eyebrow">Skyfaring above the weather · since 1889</span>
      <h1>Cross an ocean<br /><em>with no shore.</em></h1>
      <p>CLOUDWRIGHT flies brass-hulled airships over a sea of cloud, through floating isles and one honest storm front, into a lantern-lit harbor at dusk. Bring a coat.</p>
      <div className="vy-cta"><a href="#book" className="vy-btn">Book passage</a><a href="#route" className="vy-ghost">See the route →</a></div>
    </div>
  ) },
  { id: "isles", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <div className="vy-parchment vy-parchment-sm">
      <span className="vy-idx">— 02 · the isles</span>
      <h2>Floating Gardens</h2>
      <p>Waterfalls spill off drifting rock into the cloud below. We moor an hour at the nearest isle — cottage smoke, a slow windmill, ground that was never meant to hold still.</p>
    </div>
  ) },
  { id: "storm", dark: true, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <>
      <span className="vy-idx vy-light">— 03 · the front</span>
      <h2 className="vy-hl">Into the Grey</h2>
      <p className="vy-pl">Every honest crossing meets weather. The <em>Aurelia</em> leans into it — sail strained, lanterns lit, holding her line through the worst of the sky.</p>
    </>
  ) },
  { id: "harbor", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 8, copy: (
    <div className="vy-parchment vy-parchment-sm">
      <span className="vy-idx">— 04 · the harbor</span>
      <h2>Amberholt, at Dusk</h2>
      <p>Brass spires catch the last gold light over the sky-dock. A thousand warm windows and a hand on the rail to steady you — this is where the crossing ends, until the next one.</p>
    </div>
  ) },
];

const FARES: [string, string, string][] = [
  ["The Gondola Berth", "A porthole seat, a wool blanket, the whole cloud-sea for company. Shared cabin, private view.", "from 40 sovereigns"],
  ["The Brass Suite", "A private cabin with fold-down desk and brass portholes — room to log the isles as they pass.", "from 95 sovereigns"],
  ["The Captain's Eyrie", "Top-deck cabin beside the wheel. The one seat on board that isn't afraid of the storm front.", "from 210 sovereigns"],
];

const STEPS: [string, string, string][] = [
  ["01", "Dawn muster", "Board at the lower dock while the envelope fills; brass lines cast off at first light."],
  ["02", "Cloud-break", "We climb through the ceiling in eleven minutes flat. The world goes quiet, then pink."],
  ["03", "Isle-hopping", "Two floating isles, one long lunch, all the waterfalls you can stand to watch."],
  ["04", "Harbor mooring", "Amberholt's lanterns come up to meet you. You step off the gangway changed."],
];

const CHAPTERS: [string, string, string, string][] = [
  ["01", `${A}/s1-bg.webp`, "Cloud-Sea", "Dawn, and nothing below you but soft pink billow to the horizon."],
  ["02", `${A}/s2-bg.webp`, "The Isles", "Floating gardens, waterfalls off the underside, cottages that never touch ground."],
  ["03", `${A}/s3-bg.webp`, "The Front", "A wall of grey weather — the only rough hour of the whole crossing."],
  ["04", `${A}/s4-bg.webp`, "Amberholt", "Brass spires and lantern light, the harbor that makes the storm worth it."],
];

const FAQS: [string, string][] = [
  ["Is the storm front actually safe?", "Yes. The Aurelia is rated for weather twice as rough as the front we fly, and every crossing is scouted by wire the morning of departure."],
  ["What if I'm afraid of heights?", "Most of our passengers are, at first. The cloud-sea has a way of curing that by the second isle."],
  ["Can I bring luggage?", "One trunk, checked, plus a satchel you keep with you. We'll find room for a birdcage if you ask nicely."],
  ["Do you fly at night?", "Only the last leg, into Amberholt. The harbor is built to be seen lit."],
  ["What happens if the weather turns worse than expected?", "We hold at the nearest isle, serve dinner, and finish the crossing at first light. It has happened four times in eleven years."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="vy-faq" id="faq">
      <div className="vy-faq-head">
        <span className="vy-kick">Before you book</span>
        <h2>Questions we get at the dock</h2>
      </div>
      <ol className="vy-faq-list">
        {FAQS.map(([q, a], i) => (
          <li className={`vy-faq-row ${open === i ? "vy-faq-open" : ""}`} key={i}>
            <button className="vy-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span>
              <span className="vy-faq-mark" aria-hidden>{open === i ? "–" : "+"}</span>
            </button>
            <div className="vy-faq-a"><p>{a}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Voyage() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Figtree:wght@400;500;600;700&display=swap" />
      <div className="vy">
      <header className="vy-nav">
        <span className="vy-brand">CLOUDWRIGHT</span>
        <nav>
          <a href="#route">Route</a>
          <a href="#fares">Fares</a>
          <a href="#fleet">Fleet</a>
          <a href="#book" className="vy-nav-cta">Book passage</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="cast off ↓" />

      {/* MARQUEE — the route line, straight off the hero */}
      <div className="vy-marquee" aria-hidden>
        <div className="vy-marquee-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>DAWN CLOUD-SEA<em>✦</em>THE FLOATING ISLES<em>✦</em>THE STORM FRONT<em>✦</em>AMBERHOLT HARBOR<em>✦</em>DAWN CLOUD-SEA<em>✦</em>THE FLOATING ISLES<em>✦</em>THE STORM FRONT<em>✦</em>AMBERHOLT HARBOR<em>✦</em></span>
          ))}
        </div>
      </div>

      {/* BIG-TYPE — the problem, in one line (new block type, not in tidewell) */}
      <section className="vy-big">
        <p>Every map you own stops at the ground. <em>Ours was never drawn there.</em></p>
      </section>

      {/* FEATURE-CARDS — the fares (new block type, not in tidewell) */}
      <section className="vy-fares" id="fares">
        <div className="vy-fares-head">
          <span className="vy-kick">Three ways to cross</span>
          <h2>Choose your berth.</h2>
        </div>
        <div className="vy-fares-grid">
          {FARES.map(([t, d, p]) => (
            <div className="vy-fare" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="vy-fare-price">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS / PROCESS — how a crossing runs (new block type, not in tidewell) */}
      <section className="vy-steps" id="route">
        <div className="vy-steps-head">
          <span className="vy-kick">How a crossing runs</span>
          <h2>Four legs, one long day.</h2>
        </div>
        <ol className="vy-steps-row">
          {STEPS.map(([n, t, d]) => (
            <li key={n}><span className="vy-step-n">{n}</span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      {/* SIGNATURE — SPLIT, media on the RIGHT, featuring the Aurelia */}
      <section className="vy-split" id="fleet">
        <div className="vy-split-copy">
          <span className="vy-kick">The flagship</span>
          <h2>Meet the <em>Aurelia</em>.</h2>
          <p>Riveted brass over waxed canvas, four propellers, a keel that has crossed the storm front eleven hundred times without losing a passenger. She carries thirty-six souls, a cook, and more lantern oil than she should ever need.</p>
          <a href="#book" className="vy-link">Read her logbook →</a>
        </div>
        <div className="vy-split-media">
          <img src={`${A}/s1-mid.webp`} alt="The brass airship Aurelia" loading="lazy" />
        </div>
      </section>

      {/* GALLERY — four chapters as bg tiles (new block type, not in tidewell) */}
      <section className="vy-chapters" id="chapters">
        <div className="vy-chapters-head">
          <span className="vy-kick">The whole crossing, four chapters</span>
          <h2>One route, four skies.</h2>
        </div>
        <div className="vy-chapters-grid">
          {CHAPTERS.map(([n, img, t, d]) => (
            <div className="vy-chapter" key={n} style={{ backgroundImage: `url(${img})` }}>
              <div className="vy-chapter-copy"><span className="vy-chapter-n">{n}</span><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="vy-stats">
        {[["4", "skies in one crossing"], ["36", "souls aboard, max"], ["11", "minutes to clear the ceiling"], ["1889", "since"]].map(([n, l]) => (
          <div className="vy-stat" key={n}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="vy-quote">
        <blockquote>"I have flown a great many airlines and never once been handed a blanket, a window seat, and a storm front worth watching — all in the same afternoon."</blockquote>
        <cite>— Osric Bell, correspondent · The Aldermoor Gazette</cite>
      </section>

      {/* FAQ / ACCORDION — new block type, not in tidewell */}
      <Faq />

      {/* DEAL */}
      <section className="vy-deal" id="book">
        <div className="vy-deal-card">
          <span className="vy-kick">The full crossing</span>
          <div className="vy-price"><b>185</b><span>sovereigns / passenger · dawn to dusk</span></div>
          <p>One long day aboard the Aurelia — cloud-sea, isles, the storm front, and a lantern-lit arrival in Amberholt. Meals, blanket and the view included.</p>
          <a href="#" className="vy-btn">Reserve your berth</a>
          <span className="vy-note">Free to reschedule · Weather-guaranteed passage</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="vy-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="vy-climax-veil" aria-hidden />
        <div className="vy-climax-copy"><h2>The sky is waiting. <em>So is Amberholt.</em></h2><a href="#book" className="vy-btn">Book passage</a></div>
      </section>

      <footer className="vy-foot">
        <span className="vy-brand">CLOUDWRIGHT</span>
        <span>Skyfaring above the weather · Since 1889</span>
      </footer>
      </div>
    </>
  );
}
