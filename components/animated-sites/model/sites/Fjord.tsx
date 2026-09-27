"use client";
/* FJORDRO — rowed fjord crossings, oar-only. Мир: вертикаль севера — отвесные стены, чёрная
   зеркальная вода, один маленький красный вёсельный бот как единственный тёплый акцент.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Big Shoulders Display × Inter Tight, палитра fjord-blue/granite/moss/red-boat
   + red CTA). Нет marquee — намеренно: «громкая бегущая строка» противоречит тезису тишины. */
import { Reel, type ReelScene } from "../reel";
import "./fjord.css";

const A = "/uploads/1/animated/fjord";

const scenes: ReelScene[] = [
  { id: "cliffs", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="fj-eyebrow">A rowed crossing, four stops north</span>
      <h1>Go quiet<br /><em>between the walls.</em></h1>
      <p>One small red boat threads a fjord of sheer granite — cliffs, mirror water, a waterfall loud enough to fill the silence, and a lantern-lit village on stilts at the end.</p>
      <div className="fj-cta"><a href="#book" className="fj-btn">Book a crossing</a><a href="#stops" className="fj-ghost">See the four stops →</a></div>
    </>
  ) },
  { id: "boat", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="fj-idx">— 02 · the mirror</span><h2>The Mirror Crossing</h2>
      <p>No engine, no wake — just oars and the tide. The water holds the cliffs so still you forget which way is up.</p></>
  ) },
  { id: "waterfall", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="fj-idx">— 03 · the fall</span><h2>Under Mosswater</h2>
      <p>A waterfall loud enough to drown the wind, close enough to feel on your face. We row in until the spray beads on the gunwale.</p></>
  ) },
  { id: "village", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <><span className="fj-idx">— 04 · the village</span><h2>Stiltwater at Dusk</h2>
      <p>Red and ochre houses lift out of the water on their old timber legs. A lantern goes up on the dock. This is where the oars finally rest.</p></>
  ) },
];

export function Fjord() {
  return (
    <div className="fj">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700&display=swap" />
      <header className="fj-nav">
        <span className="fj-brand">FJORDRO</span>
        <nav><a href="#crossing">The crossing</a><a href="#stops">Stops</a><a href="#book" className="fj-nav-cta">Book a crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="row down ↓" />

      {/* BIG-TYPE — the thesis, one quiet giant statement (block tidewell lacks) */}
      <section className="fj-statement">
        <p>Everything loud <em>stays on the coast.</em></p>
        <span className="fj-statement-sub">Fjordro runs one boat, one small crew, and nothing louder than a gull.</span>
      </section>

      {/* SPLIT — the boat's craft/heritage, media on the RIGHT */}
      <section className="fj-craft" id="crossing">
        <div className="fj-craft-copy">
          <span className="fj-kick">Why we still row</span>
          <h2>One Boat, Built by Hand, Fifty Years Ago.</h2>
          <p>Our boat is a fifty-year-old spissbåt, clinker-built on this same shore, re-caulked every spring and rowed, never motored. An engine would flatten the water before you reached the first wall — so we leave it ashore.</p>
          <a href="#stops" className="fj-link">Meet the four stops →</a>
        </div>
        <div className="fj-craft-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
      </section>

      {/* STEPS / PROCESS — vertical, mirroring the fjord's own drop (block tidewell lacks) */}
      <section className="fj-steps">
        <div className="fj-steps-head"><span className="fj-kick">How a crossing runs</span><h2>Quay to Lantern, One Row.</h2></div>
        <ol className="fj-steps-list">
          {[
            ["Quay · 7 AM", "Wool blankets, a thermos of coffee, and the oars go in before you do."],
            ["The cliffs", "Forty minutes under granite walls, waterfalls threading down on either side."],
            ["Mosswater Falls", "We row in close enough for the spray, then let the current carry us back out."],
            ["Stiltwater · dusk", "Mooring at the red village as the windows light up one by one."],
          ].map(([t, s], i) => (
            <li className="fj-step" key={i}><span className="fj-step-n">{String(i + 1).padStart(2, "0")}</span><div><h3>{t}</h3><p>{s}</p></div></li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — SIGNATURE: the fjord's stops as cards */}
      <section className="fj-stops" id="stops">
        <div className="fj-stops-head"><span className="fj-kick">The full line, north to lantern</span><h2>Four Stops on the Water.</h2></div>
        <div className="fj-stops-grid">
          {[
            ["01", "Granite Gate", "Where the fjord narrows to a hundred metres and the water goes black.", `${A}/s1-bg.webp`],
            ["02", "The Mirror", "A stretch so still the gulls fly twice — once real, once reflected.", `${A}/s2-bg.webp`],
            ["03", "Mosswater Falls", "Six centuries of ice-cap melt, roaring straight into the fjord.", `${A}/s3-bg.webp`],
            ["04", "Stiltwater Village", "Eleven red houses on timber legs, and the only lantern for a mile.", `${A}/s4-bg.webp`],
          ].map(([n, t, d, img], i) => (
            <article className="fj-stop-card" key={i} style={{ backgroundImage: `linear-gradient(180deg, rgba(10,26,34,.05), rgba(8,20,26,.86)), url(${img})` }}>
              <span className="fj-stop-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="fj-numbers">
        {[["4", "stops on the water"], ["50", "years the boat has been rowed"], ["6", "guests aboard, max"], ["0", "motors, ever"]].map(([n, l], i) => (
          <div className="fj-number" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* GALLERY — four chapters of light, own bg-plates as covers (block tidewell lacks) */}
      <section className="fj-gallery">
        <div className="fj-gallery-head"><span className="fj-kick">One crossing, four kinds of light</span><h2>The Fjord by the Hour.</h2></div>
        <div className="fj-gallery-grid">
          {[
            [`${A}/s1-bg.webp`, "Overcast morning"],
            [`${A}/s2-bg.webp`, "Slack-tide mirror"],
            [`${A}/s3-bg.webp`, "Waterfall spray"],
            [`${A}/s4-bg.webp`, "Lantern dusk"],
          ].map(([img, label], i) => (
            <figure className="fj-gallery-tile" key={i} style={{ backgroundImage: `url(${img})` }}>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="fj-quote">
        <blockquote>"I have taken loud fjord cruises before — diesel and a loudspeaker. This was the first time I actually <em>heard the waterfall</em>."</blockquote>
        <cite>— Ingrid H., guest · Bergen</cite>
      </section>

      {/* FAQ / ACCORDION (block tidewell lacks) */}
      <section className="fj-faq">
        <div className="fj-faq-head"><span className="fj-kick">Before you book</span><h2>A Few Practical Things.</h2></div>
        <div className="fj-faq-list">
          {[
            ["Do I need to row?", "No — our guide handles the oars the whole way. You're welcome to take a turn on the mirror stretch if the water's calm."],
            ["What if it rains?", "It usually does. Wool blankets and oilskins are aboard; we only cancel for real wind."],
            ["How fit do I need to be?", "Not very. You sit, you look up, you occasionally lean out of the way of spray."],
            ["Can we stay the night in Stiltwater?", "Yes — the village has three guest rooms above the boathouse, booked separately."],
          ].map(([q, a], i) => (
            <details className="fj-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="fj-deal" id="book">
        <div className="fj-deal-card">
          <span className="fj-kick">The full crossing</span>
          <div className="fj-price"><b>kr 890</b><span>/ guest · boat, guide &amp; the four stops</span></div>
          <p>One boat, six guests at most, a full crossing from quay to Stiltwater and back — oars the whole way, no engine to break the quiet.</p>
          <a href="#" className="fj-btn">Reserve a seat</a>
          <span className="fj-note">Runs May – September · Weather-called at dawn</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="fj-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="fj-climax-veil" aria-hidden />
        <div className="fj-climax-copy"><h2>The quiet is <em>one crossing</em> away.</h2><a href="#book" className="fj-btn">Book a crossing</a></div>
      </section>

      <footer className="fj-foot"><span className="fj-brand">FJORDRO</span><span>Rowed fjord crossings · Granite to lantern-light</span></footer>
    </div>
  );
}
