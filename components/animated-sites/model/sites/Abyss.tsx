"use client";
/* ABYSS — «Rubrica Deep-Temple Expeditions». Мир: боковой трек сквозь затопленный храм в чёрной воде,
   освещённый КРАСНОЙ биолюминесценцией сбоку (не сверху). Собран на общем движке <Reel/>; лендинг и
   типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков), шрифт-пейринг Playfair Display × Public Sans,
   палитра black-brine/red-biolum/jade/gold-ruin. Все 4 сцены тёмные — светлая типографика сквозная. */
import { Reel, type ReelScene } from "../reel";
import "./abyss.css";

const A = "/uploads/1/animated/abyss";

const scenes: ReelScene[] = [
  {
    id: "forecourt",
    dark: true,
    bg: `${A}/s1-bg.webp`,
    mid: `${A}/s1-mid.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="ab-eyebrow">Deep-temple expeditions · twelve berths a year</span>
        <h1>
          It glows because
          <br />
          <em>something remembers.</em>
        </h1>
        <p>
          Six hundred metres down, in water no sun has touched in ten thousand years, a temple no
          chart recorded pulses red from the inside. We take divers to stand in front of it.
        </p>
        <div className="ab-cta">
          <a href="#apply" className="ab-btn">
            Apply for a berth
          </a>
          <a href="#descent" className="ab-ghost">
            See the descent →
          </a>
        </div>
      </>
    ),
  },
  {
    id: "colonnade",
    dark: true,
    bg: `${A}/s2-bg.webp`,
    mid: `${A}/s2-mid.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="ab-idx">— 02 · the colonnade</span>
        <h2>Between the Pillars</h2>
        <p>
          The light is never above you here — it comes sideways, low, from things that grow on the
          stone. You learn fast which shapes are architecture and which are alive.
        </p>
      </>
    ),
  },
  {
    id: "idol",
    dark: true,
    spark: 5,
    bg: `${A}/s3-bg.webp`,
    mid: `${A}/s3-mid.webp`,
    fg: `${A}/s3-fg.webp`,
    copy: (
      <>
        <span className="ab-idx">— 03 · the idol</span>
        <h2>The Eye That Glows</h2>
        <p>
          Forty metres of carved face, gold veins still bright in the rock, a slow bloom of red
          jellyfish breathing in front of it like a held lung. Nobody has explained the gold.
        </p>
      </>
    ),
  },
  {
    id: "brinepool",
    dark: true,
    spark: 7,
    bg: `${A}/s4-bg.webp`,
    mid: `${A}/s4-mid.webp`,
    fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="ab-idx">— 04 · the brine</span>
        <h2>Where the Water Ends</h2>
        <p>
          A pool inside the pool — denser, warmer, its own small alien sea with a shoreline you can
          see and never should cross. This is as far as the guide takes you.
        </p>
      </>
    ),
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Surface Briefing", "Three days of pressure and current drills before anyone gets wet."],
  ["02", "The Drop", "A controlled free-fall through open black water, lit only by your own line."],
  ["03", "The Threshold", "First red glow at 580 metres. From here the guide leads, you follow exactly."],
  ["04", "The Return", "A staged ascent timed to the minute. The temple stays behind — the glow does not."],
];

const FEATURES: [string, string][] = [
  ["Red Bioluminescent Bloom", "Colonies that pulse in sequence along the colonnade, bright enough to read a gauge by."],
  ["Unrefined Gold Veins", "Threaded through carved stone that predates any alloy we can date it against."],
  ["The Brine Shoreline", "A visible edge underwater where one sea ends and a denser, stranger one begins."],
  ["Cold Current Silence", "Sound dies past the forecourt. Guides communicate by light alone."],
];

const CHAMBERS: [string, string, string][] = [
  ["01", "Forecourt", `${A}/s1-bg.webp`],
  ["02", "Colonnade", `${A}/s2-bg.webp`],
  ["03", "The Idol", `${A}/s3-bg.webp`],
  ["04", "The Brine", `${A}/s4-bg.webp`],
];

const STATS: [string, string][] = [
  ["612m", "average depth to the forecourt"],
  ["4°C", "brine layer, denser than the sea around it"],
  ["12", "divers guided per year"],
  ["37", "years the glow has been logged, undimmed"],
];

const MARQUEE_ITEMS = [
  "NO FISH PAST THE THRESHOLD",
  "THE GLOW HAS NOT DIMMED SINCE 1987",
  "THE BRINE HAS A VISIBLE SHORELINE",
  "TWELVE BERTHS A YEAR",
  "THE GOLD IS UNREFINED",
];

export function Abyss() {
  return (
    <div className="ab">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@400;500;600;700;800&display=swap"
      />

      <header className="ab-nav">
        <span className="ab-brand">RUBRICA</span>
        <nav>
          <a href="#descent">Descent</a>
          <a href="#chambers">Chambers</a>
          <a href="#dispatch">Dispatches</a>
          <a href="#apply" className="ab-nav-cta">
            Apply for a berth
          </a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="into the dark ↓" />

      {/* BIG-TYPE — SIGNATURE: one enormous ominous statement on near-black */}
      <section className="ab-big" id="statement">
        <p>
          IT WAS GLOWING
          <br />
          <em>BEFORE WE ARRIVED.</em>
        </p>
        <span className="ab-big-note">
          Sonar first flagged the anomaly in 1987. No expedition has explained the light. Twelve
          divers a year go to see it anyway.
        </span>
      </section>

      {/* CONTEXT / SPLIT — the discovery */}
      <section className="ab-context" id="context">
        <div className="ab-context-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ab-context-copy">
          <span className="ab-kick">The find</span>
          <h2>Charts end. The temple doesn&rsquo;t.</h2>
          <p>
            No civilization on record built in black brine at this depth. The stonework matches
            nothing catalogued, the gold is unrefined yet perfectly veined, and the red
            bioluminescence has not dimmed in thirty-seven years of observation. We stopped trying
            to explain it and started guiding people to see it.
          </p>
          <a href="#descent" className="ab-link">
            How we dive it →
          </a>
        </div>
      </section>

      {/* STEPS / PROCESS — the descent protocol (unique block, ≠ tidewell's vertical gauge) */}
      <section className="ab-steps" id="descent">
        <div className="ab-steps-head">
          <span className="ab-kick">The descent protocol</span>
          <h2>Four stages, one guide, no shortcuts.</h2>
        </div>
        <ol className="ab-steps-row">
          {STEPS.map(([n, t, s]) => (
            <li key={n}>
              <span className="ab-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS — what you'll see */}
      <section className="ab-features" id="features">
        <div className="ab-features-head">
          <span className="ab-kick">What you&rsquo;ll see</span>
          <h2>Nothing about it is explained. Everything about it is real.</h2>
        </div>
        <div className="ab-features-grid">
          {FEATURES.map(([t, s]) => (
            <div className="ab-feature" key={t}>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY — four chambers, own plates as covers (block tidewell lacks) */}
      <section className="ab-chambers" id="chambers">
        <div className="ab-chambers-head">
          <span className="ab-kick">Four chambers, one descent</span>
          <h2>The Route Down</h2>
        </div>
        <div className="ab-chambers-grid">
          {CHAMBERS.map(([n, t, img]) => (
            <div className="ab-chamber" key={n} style={{ backgroundImage: `url(${img})` }}>
              <span className="ab-chamber-n">{n}</span>
              <span className="ab-chamber-t">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE — ominous ticker (block tidewell lacks) */}
      <div className="ab-marquee" aria-hidden>
        <div className="ab-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="ab-stats">
        {STATS.map(([n, l]) => (
          <div className="ab-stat" key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="ab-quote" id="dispatch">
        <blockquote>
          &ldquo;I have surveyed collapsed rigs and war wrecks. Nothing prepared me for stone that{" "}
          <em>looks back</em>.&rdquo;
        </blockquote>
        <cite>— Dr. A. Solheim, marine archaeologist · Expedition 14</cite>
      </section>

      {/* DEAL */}
      <section className="ab-deal" id="apply">
        <div className="ab-deal-card">
          <span className="ab-kick">The guided descent</span>
          <div className="ab-price">
            <b>€4,200</b>
            <span>/ diver · full expedition, gear &amp; decompression support</span>
          </div>
          <p>
            Eight days at the surface station, one guided descent to the idol, staged return.
            Medical clearance required. We confirm twelve berths a year — apply early.
          </p>
          <a href="#" className="ab-btn">
            Apply for a berth
          </a>
          <span className="ab-note">Technical certification required · Waitlist opens each January</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ab-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="ab-climax-veil" aria-hidden />
        <div className="ab-climax-copy">
          <h2>
            The glow is real.
            <br />
            <em>Come see what&rsquo;s under it.</em>
          </h2>
          <a href="#apply" className="ab-btn">
            Apply for a berth
          </a>
        </div>
      </section>

      <footer className="ab-foot">
        <span className="ab-brand">RUBRICA</span>
        <span>Deep-Temple Expeditions · Twelve berths, one glow</span>
      </footer>
    </div>
  );
}
