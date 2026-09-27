"use client";
/* EMBERFALL — «autumn valley farm-stay». Мир: осень как медленный пожар — блистающий кленовый хребет,
   янтарный брод, яблочный сад на склоне, закатный фермерский двор. Собран на общем движке <Reel/>;
   лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, свой шрифт-пейринг
   Zilla Slab × Figtree, палитра amber/rust/gold/pine + amber CTA). */
import { Reel, type ReelScene } from "../reel";
import "./emberfall.css";

const A = "/uploads/1/animated/emberfall";

const scenes: ReelScene[] = [
  { id: "ridge", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ef-eyebrow">An autumn valley, four days long</span>
      <h1>Where the valley<br /><em>learns to burn.</em></h1>
      <p>Four days deep in a working orchard valley — a blazing ridge, an amber river, a hillside heavy with fruit, and a farmhouse table lit by the last low sun.</p>
      <div className="ef-cta"><a href="#stay" className="ef-btn">Reserve Harvest Week</a><a href="#stages" className="ef-ghost">See the four days →</a></div>
    </>
  ) },
  { id: "river", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ef-idx">— 02 · the crossing</span><h2>The Amber Crossing</h2>
      <p>Stepping stones and cold morning mist rising gold off the water. This is the walk that slows your pulse down to valley time.</p></>
  ) },
  { id: "orchard", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="ef-idx">— 03 · the orchard</span><h2>Heavy With Fruit</h2>
      <p>Ladders lean into red-gold trees on the slope. You pick what you'll eat tonight, and carry the rest home in a woven basket.</p></>
  ) },
  { id: "harvest", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 7, copy: (
    <><span className="ef-idx">— 04 · the farmstead</span><h2>Supper By Firelight</h2>
      <p>Long tables, low light, cider passed hand to hand until the sky over the barn matches the coals.</p></>
  ) },
];

export function Emberfall() {
  return (
    <div className="ef">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Figtree:wght@400;500;600;700&display=swap" />
      <header className="ef-nav">
        <span className="ef-brand">EMBERFALL</span>
        <nav><a href="#stages">The four days</a><a href="#faq">Know before you go</a><a href="#stay" className="ef-nav-cta">Reserve Harvest Week</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend into color ↓" />

      {/* BIG-TYPE — a single giant statement */}
      <section className="ef-statement">
        <p>Some valleys turn brown in October.<br />This one <em>catches fire</em> instead.</p>
      </section>

      {/* FEATURE-CARDS — SIGNATURE — the four autumn stages, rich cards 2x2 */}
      <section className="ef-stages" id="stages">
        <div className="ef-stages-head"><span className="ef-kick">One trail, four fires</span><h2>Four Turns of the Valley</h2></div>
        <div className="ef-stages-grid">
          {[
            ["01", "The Ridge", "Where the maples go first, and go hardest. Stand under a canopy that looks lit from the inside out.", `${A}/s1-bg.webp`],
            ["02", "The Crossing", "An amber river you cross stone by stone, mist rising off water still warm from summer.", `${A}/s2-bg.webp`],
            ["03", "The Orchard", "Forty rows of apples heavy enough to bend the branch. Ladders included, patience required.", `${A}/s3-bg.webp`],
            ["04", "The Farmstead", "Long tables, low light, cider passed hand to hand until the sky matches the coals.", `${A}/s4-bg.webp`],
          ].map(([n, t, d, img], i) => (
            <article className="ef-stage-card" key={i} style={{ backgroundImage: `linear-gradient(180deg, rgba(36,20,12,.08), rgba(24,13,8,.82)), url(${img})` }}>
              <span className="ef-stage-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STEPS / PROCESS — itinerary, block type tidewell lacks */}
      <section className="ef-days">
        <div className="ef-days-head"><span className="ef-kick">The itinerary</span><h2>How a Stay Unfolds</h2></div>
        <ol className="ef-days-row">
          {[
            ["Day 01", "Arrive & Settle", "Cabin key, a map of the ridge trail, and a jar of last year's preserve waiting on the table."],
            ["Day 02", "Ridge & River", "Morning climb to the maple ridge, afternoon crossing at the shallows. Boots provided."],
            ["Day 03", "The Orchard Shift", "Pick what you want, press what you pick. Cider by four o'clock."],
            ["Day 04", "The Long Supper", "Everyone at one table. The valley goes copper, then ember, then quiet."],
          ].map(([d, t, s], i) => (
            <li className="ef-day" key={i}><span className="ef-day-n">{d}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* SPLIT — showcase frame + heritage story */}
      <section className="ef-method">
        <div className="ef-method-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="ef-method-copy">
          <span className="ef-kick">Why the light does this</span>
          <h2>We Farm the Slope, Not Just the Season.</h2>
          <p>Emberfall has been one family's orchard and hillside for three generations. We angle the rows to catch the low autumn sun, and leave the maples above untouched — which is the only reason the whole valley turns like this at once.</p>
          <a href="#stages" className="ef-link">Meet the orchard →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="ef-numbers">
        {[["64", "acres of ridge, river and orchard"], ["1961", "the year the first row was planted"], ["4", "days in a Harvest Week"], ["12", "seats at the supper table, max"]].map(([n, l], i) => (
          <div className="ef-number" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* MARQUEE — motif banner, block type tidewell lacks */}
      <div className="ef-marquee" aria-hidden>
        <div className="ef-marquee-track">
          <span>MAPLE&nbsp;&nbsp;·&nbsp;&nbsp;RUST&nbsp;&nbsp;·&nbsp;&nbsp;AMBER&nbsp;&nbsp;·&nbsp;&nbsp;CIDER&nbsp;&nbsp;·&nbsp;&nbsp;PINE&nbsp;&nbsp;·&nbsp;&nbsp;HARVEST&nbsp;&nbsp;·&nbsp;&nbsp;EMBER&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span aria-hidden>MAPLE&nbsp;&nbsp;·&nbsp;&nbsp;RUST&nbsp;&nbsp;·&nbsp;&nbsp;AMBER&nbsp;&nbsp;·&nbsp;&nbsp;CIDER&nbsp;&nbsp;·&nbsp;&nbsp;PINE&nbsp;&nbsp;·&nbsp;&nbsp;HARVEST&nbsp;&nbsp;·&nbsp;&nbsp;EMBER&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* QUOTE */}
      <section className="ef-quote">
        <blockquote>"We came for a weekend and left talking about it for a year. I had never seen a hillside <em>actually glow</em> before."</blockquote>
        <cite>— Dana R., Harvest Week guest · October</cite>
      </section>

      {/* FAQ / ACCORDION — block type tidewell lacks */}
      <section className="ef-faq" id="faq">
        <div className="ef-faq-head"><span className="ef-kick">Know before you go</span><h2>A Few Practical Things</h2></div>
        <div className="ef-faq-list">
          {[
            ["What's included in Harvest Week?", "Four nights in a cabin, all meals, the ridge walk, orchard picking, and the closing supper."],
            ["Do we need hiking experience?", "No — the ridge trail is a gentle two hours. Boots and walking sticks are provided."],
            ["Can we bring apples home?", "As many as you can carry, plus a jar of cider you press yourself."],
            ["When does the color actually peak?", "Late September through mid-October, which is the only window we run."],
          ].map(([q, a], i) => (
            <details className="ef-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="ef-stay" id="stay">
        <div className="ef-stay-card">
          <span className="ef-kick">The Harvest Week</span>
          <div className="ef-price"><b>$890</b><span>/ guest · cabin, meals &amp; the four days</span></div>
          <p>Four nights in the valley, every meal at the long table, guided ridge and river, and as much orchard as you can carry home.</p>
          <a href="#" className="ef-btn">Reserve a week</a>
          <span className="ef-note">Six cabins only · Late Sept – mid Oct</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ef-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ef-climax-veil" aria-hidden />
        <div className="ef-climax-copy"><h2>The fire is <em>four days</em> away.</h2><a href="#stay" className="ef-btn">Reserve Harvest Week</a></div>
      </section>

      <footer className="ef-foot"><span className="ef-brand">EMBERFALL</span><span>Autumn valley farm-stay · Grown slow, gathered warm</span></footer>
    </div>
  );
}
