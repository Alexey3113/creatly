"use client";
/* BAZAAR — «Lantern Road». Мир: Silk-Road ночной рынок чувственного изобилия — ворота на закате,
   крытая пряная аллея, фонарный майдан, край пустыни под звёздами. Собран на общем движке <Reel/>;
   лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг Cinzel × Work Sans,
   палитра saffron/teal/plum/sand). Сигнатурный блок — MARQUEE, бегущая лента товаров рынка. */
import { Reel, type ReelScene } from "../reel";
import "./bazaar.css";

const A = "/uploads/1/animated/bazaar";

const scenes: ReelScene[] = [
  {
    id: "gate",
    bg: `${A}/s1-bg.webp`,
    mid: `${A}/s1-mid.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="bz-eyebrow">Night walks through the old bazaar</span>
        <h1>
          Follow the <em>lanterns</em> in.
        </h1>
        <p>
          One evening route through the gate, the spice aisle and lantern square — tasting, bargaining
          and slow wandering, led by someone who knows every stall-keeper by name.
        </p>
        <div className="bz-cta">
          <a href="#book" className="bz-btn">
            Book a night walk
          </a>
          <a href="#route" className="bz-ghost">
            See the route →
          </a>
        </div>
      </>
    ),
  },
  {
    id: "spice",
    dark: true,
    bg: `${A}/s2-bg.webp`,
    mid: `${A}/s2-mid.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="bz-idx">— 02 · the spice aisle</span>
        <h2>The Spice Aisle</h2>
        <p>
          Saffron by the fistful, paprika stacked in burning cones, cardamom cracked open just so you
          can smell it. We stop at every pyramid that matters and skip the ones that don't.
        </p>
      </>
    ),
  },
  {
    id: "square",
    dark: true,
    spark: 6,
    bg: `${A}/s3-bg.webp`,
    mid: `${A}/s3-mid.webp`,
    fg: `${A}/s3-fg.webp`,
    copy: (
      <>
        <span className="bz-idx">— 03 · lantern square</span>
        <h2>Lantern Square</h2>
        <p>
          Hundreds of paper lanterns strung low over rugs and tea tables, braziers glowing at the
          edges. This is where the night slows down and the real bargaining begins.
        </p>
      </>
    ),
  },
  {
    id: "edge",
    dark: true,
    bg: `${A}/s4-bg.webp`,
    mid: `${A}/s4-mid.webp`,
    fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="bz-idx">— 04 · the desert edge</span>
        <h2>The Desert Edge</h2>
        <p>
          The market glows small behind you now. Ahead, only dune-shadow, a tethered camel, and more
          stars than any city ever offered you at once.
        </p>
      </>
    ),
  },
];

const MARQUEE_ITEMS = [
  "SAFFRON THREADS",
  "ROSE WATER",
  "SOUR-CHERRY LEATHER",
  "HAND-LOOMED RUGS",
  "CARDAMOM PODS",
  "BRASS LANTERNS",
  "POMEGRANATE MOLASSES",
  "SILK SCARVES",
  "SMOKED PAPRIKA",
  "MINT TEA",
  "ROASTED PISTACHIO",
  "EMBROIDERED SLIPPERS",
];

const QUARTERS: [string, string, string][] = [
  ["01", "The Gate", "Tiled arches, camel bells and the smell of warm bread. Where the night begins and the city noise stops."],
  ["02", "Spice Aisle", "A covered lane of colour and scent — six stalls, six tastes, one story each about where the harvest came from."],
  ["03", "Lantern Square", "The market's heart: rugs, brass, tea and the honest art of the opening price."],
  ["04", "Desert Edge", "Where the lanterns thin out and the sky takes over. Tea under stars, then the walk back in."],
];

const STEPS: [string, string, string][] = [
  ["01", "Gather at the Gate", "7pm sharp. Mint tea while we set the pace and the appetite."],
  ["02", "Taste the Spice Aisle", "Six stalls, six spices — and how to tell real saffron from the cut stuff."],
  ["03", "Bargain in Lantern Square", "Rugs, brass, silk. We teach you the opening number, then step back."],
  ["04", "Walk to the Desert Edge", "Tea under open sky while the market glows small behind you."],
];

const FAQS: [string, string][] = [
  ["What's included?", "A guide for the full route, six tastings through the spice aisle, mint tea at the gate and at the edge, and a printed lantern-lit map of the night."],
  ["Is it good for kids?", "Yes — the pace is slow and the route is flat. We keep tastings mild unless you ask otherwise."],
  ["What should I wear?", "Closed shoes for uneven stone, and a layer for the cool air past the square. The desert edge runs colder than the market."],
  ["Can I book a private caravan?", "Yes, any night of the week. Groups of up to twelve, your own guide, your own pace through the aisle."],
];

export function Bazaar() {
  return (
    <div className="bz">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap" />

      <header className="bz-nav">
        <span className="bz-brand">LANTERN ROAD</span>
        <nav>
          <a href="#quarters">Four Quarters</a>
          <a href="#route">The Route</a>
          <a href="#faq">FAQ</a>
          <a href="#book" className="bz-nav-cta">
            Book a night walk
          </a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="wander ↓" />

      {/* MARQUEE — SIGNATURE: running ticker of market goods/spices/wares */}
      <section className="bz-marquee" aria-label="What you'll find in the aisle">
        <div className="bz-marquee-track">
          <div className="bz-marquee-row">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="bz-marquee-item" key={i}>
                {item}
                <span className="bz-marquee-dot" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE-CARDS — Four Quarters overview (block type tidewell lacks) */}
      <section className="bz-quarters" id="quarters">
        <div className="bz-quarters-head">
          <span className="bz-kick">One evening, four quarters</span>
          <h2>The whole market, in order.</h2>
        </div>
        <div className="bz-quarters-grid">
          {QUARTERS.map(([n, t, s]) => (
            <div className="bz-quarter-card" key={n}>
              <span className="bz-quarter-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase media + text */}
      <section className="bz-split" id="route">
        <div className="bz-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="bz-split-copy">
          <span className="bz-kick">Why it stays with you</span>
          <h2>We've walked this market for eleven years.</h2>
          <p>
            Every route is built on a relationship, not a map — the saffron vendor who saves us the
            first harvest, the rug-seller who remembers your name by the second visit. You are never
            walking a tourist loop; you are walking with people who live here.
          </p>
          <a href="#book" className="bz-link">
            Meet the guides →
          </a>
        </div>
      </section>

      {/* STEPS/PROCESS — how a night walk works (block type tidewell lacks) */}
      <section className="bz-steps" id="walks">
        <div className="bz-steps-head">
          <span className="bz-kick">How a night walk works</span>
          <h2>Four stops, one long evening.</h2>
        </div>
        <ol className="bz-steps-row">
          {STEPS.map(([n, t, s]) => (
            <li className="bz-step" key={n}>
              <span className="bz-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* GALLERY — four scene plates as route covers (block type tidewell lacks) */}
      <section className="bz-gallery">
        <div className="bz-gallery-head">
          <span className="bz-kick">Four nights, four routes</span>
          <h2>Pick the version of the market you want.</h2>
        </div>
        <div className="bz-gallery-grid">
          {[
            [`${A}/s1-bg.webp`, "The Gate", "Arrival, dusk light"],
            [`${A}/s2-bg.webp`, "Spice Aisle", "Tastings, lamp-lit haze"],
            [`${A}/s3-bg.webp`, "Lantern Square", "Rugs, tea, bargaining"],
            [`${A}/s4-bg.webp`, "Desert Edge", "Stars, the walk back"],
          ].map(([img, t, s]) => (
            <figure className="bz-gallery-tile" key={t as string}>
              <div className="bz-gallery-img" style={{ backgroundImage: `url(${img})` }} />
              <figcaption>
                <b>{t}</b>
                <span>{s}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bz-stats">
        {[
          ["11", "years walking this market"],
          ["38", "stall-keepers we call by name"],
          ["6", "guests per lantern, max"],
          ["1", "price you actually pay"],
        ].map(([n, l], i) => (
          <div className="bz-stat" key={i}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="bz-quote">
        <blockquote>
          “I've bargained in a dozen markets and always lost. Here I walked out with a rug I love and
          a price I understood — <em>because someone finally explained the game</em>.”
        </blockquote>
        <cite>— Renata K., guest · Lantern Square walk</cite>
      </section>

      {/* FAQ / ACCORDION — block type tidewell lacks */}
      <section className="bz-faq" id="faq">
        <div className="bz-faq-head">
          <span className="bz-kick">Before you book</span>
          <h2>What people ask us.</h2>
        </div>
        <div className="bz-faq-list">
          {FAQS.map(([q, a], i) => (
            <details className="bz-faq-item" key={i} {...(i === 0 ? { open: true } : {})}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="bz-deal" id="book">
        <div className="bz-deal-card">
          <span className="bz-kick">The night walk</span>
          <div className="bz-price">
            <b>$95</b>
            <span>/ guest · guide, tea &amp; six tastings</span>
          </div>
          <p>
            One evening, four quarters of the market, a route we've been refining for eleven years.
            Reserve a lantern and we'll send the printed map by morning.
          </p>
          <a href="#" className="bz-btn">
            Reserve a lantern
          </a>
          <span className="bz-note">Runs six nights a week · Private caravans on request</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="bz-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="bz-climax-veil" aria-hidden />
        <div className="bz-climax-copy">
          <h2>
            The market is <em>lit</em> and waiting.
          </h2>
          <a href="#book" className="bz-btn">
            Book a night walk
          </a>
        </div>
      </section>

      <footer className="bz-foot">
        <span className="bz-brand">LANTERN ROAD</span>
        <span>Night walks through the old bazaar · Six evenings a week</span>
      </footer>
    </div>
  );
}
