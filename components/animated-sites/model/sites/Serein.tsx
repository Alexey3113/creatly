"use client";
/* SEREIN — «walked retreat through Provence». Мир: пыльный тёплый свет, лаванда → камень → погреб → терраса.
   Собран на общем движке <Reel/>; лендинг и типографика — свой набор/порядок блоков (marquee, process,
   feature-cards, gallery как «главы», pricing-tiers сигнатурой), шрифт-пейринг Marcellus × Figtree,
   палитра olive/lavender/terracotta/limestone + terracotta CTA. */
import { Reel, type ReelScene } from "../reel";
import "./serein.css";

const A = "/uploads/1/animated/serein";

const scenes: ReelScene[] = [
  {
    id: "fields",
    bg: `${A}/s1-bg.webp`,
    mid: `${A}/s1-mid.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <div className="sr-frost">
        <span className="sr-eyebrow">A walked retreat in the Luberon</span>
        <h1>
          Follow the wall
          <br />
          <em>to the table.</em>
        </h1>
        <p>
          Four days between lavender and limestone — one path takes you from
          the rows to the cellar to a candlelit table under the fig tree.
          Slow, sun-warmed, entirely provided for.
        </p>
        <div className="sr-cta">
          <a href="#stay" className="sr-btn">
            Reserve your dates
          </a>
          <a href="#walk" className="sr-ghost">
            Walk the route →
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "village",
    bg: `${A}/s2-bg.webp`,
    mid: `${A}/s2-mid.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <div className="sr-frost">
        <span className="sr-idx">— 02 · the lane</span>
        <h2>Ochre &amp; Shade</h2>
        <p>
          Blue shutters, warm stone, a cat asleep on the step. The village
          wakes slowly, and so, here, do you.
        </p>
      </div>
    ),
  },
  {
    id: "cellar",
    dark: true,
    bg: `${A}/s3-bg.webp`,
    mid: `${A}/s3-mid.webp`,
    fg: `${A}/s3-fg.webp`,
    copy: (
      <>
        <span className="sr-idx sr-light">— 03 · the cellar</span>
        <h2 className="sr-hl">Where It Waits</h2>
        <p className="sr-pl">
          Twelve degrees, oak and dust — the vintner draws last year&rsquo;s
          rosé straight from the barrel, by lamplight, for you alone.
        </p>
      </>
    ),
  },
  {
    id: "terrace",
    bg: `${A}/s4-bg.webp`,
    mid: `${A}/s4-mid.webp`,
    fg: `${A}/s4-fg.webp`,
    spark: 6,
    copy: (
      <div className="sr-frost">
        <span className="sr-idx">— 04 · the terrace</span>
        <h2>Supper, Golden</h2>
        <p>
          A long table, a fig tree, the valley going copper below. This is
          the hour the whole walk was for.
        </p>
      </div>
    ),
  },
];

const CHAPTERS = [
  { n: "01", img: `${A}/s1-bg.webp`, t: "Fields", s: "Lavender rows at first light, basket over the shoulder." },
  { n: "02", img: `${A}/s2-bg.webp`, t: "Village", s: "Ochre walls, blue shutters, the lane before it warms." },
  { n: "03", img: `${A}/s3-bg.webp`, t: "Cellar", s: "Cool stone, oak barrels, one lamp and a pour of rosé." },
  { n: "04", img: `${A}/s4-bg.webp`, t: "Terrace", s: "The long table, the fig tree, the valley turning gold." },
];

const STEPS = [
  { n: "01", k: "Morning", t: "Walk the rows", s: "Out before the heat, baskets over shoulders, into lavender still silver with dew." },
  { n: "02", k: "Midday", t: "Market &amp; shade", s: "Bread, olives, a nap under plane trees while the village keeps its own slow hours." },
  { n: "03", k: "Late afternoon", t: "The cellar hour", s: "Down stone steps into cool dark, where the vintner pours what isn't sold anywhere yet." },
  { n: "04", k: "Dusk", t: "Supper on the wall", s: "Table laid along the last stretch of path, fig tree overhead, the valley catching fire." },
];

const FEATURES = [
  { t: "Guided lavender walks", s: "Daily, at dawn, with the farmer whose family has cut these rows for four generations." },
  { t: "Private cellar hours", s: "Small-group barrel tastings with the vintner — pours that never leave the estate." },
  { t: "A farmhouse table", s: "Family-style dinners inside a restored eighteenth-century mas, windows open to the valley." },
  { t: "Market mornings", s: "A guided walk through the village market, then cook what you find alongside a local chef." },
];

const PLANS = [
  {
    name: "Le Jour",
    tag: "Day",
    price: "€145",
    per: "/ person",
    blurb: "One morning on the wall — the walk, the cellar, lunch at the long table.",
    bullets: ["Guided lavender walk, 2 hrs", "Cellar tasting, 4 pours", "Farmhouse lunch"],
    cta: "Book the day",
    featured: false,
  },
  {
    name: "Le Weekend",
    tag: "Weekend",
    price: "€890",
    per: "/ person",
    blurb: "Two nights, the full path — fields to cellar to terrace, twice over.",
    bullets: ["2 nights, room in the mas", "Full day itinerary, both days", "Market morning &amp; cooking hour", "Dinner under the fig tree"],
    cta: "Reserve the weekend",
    featured: true,
  },
  {
    name: "La Semaine",
    tag: "Week",
    price: "€2,450",
    per: "/ person",
    blurb: "Six nights of full immersion — the whole valley, at walking pace.",
    bullets: ["6 nights, room in the mas", "Every chapter of the path, twice", "Private chef dinner", "Take-home case, estate rosé"],
    cta: "Reserve the week",
    featured: false,
  },
];

export function Serein() {
  return (
    <div className="sr">
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- дублируем @import линком (Turbopack иногда роняет неглавный @import) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Figtree:wght@400;500;600;700;800&display=swap" />
      <header className="sr-nav">
        <span className="sr-brand">SENTIER</span>
        <nav>
          <a href="#walk">The Walk</a>
          <a href="#table">The Table</a>
          <a href="#stay">Stay</a>
          <a href="#stay" className="sr-nav-cta">
            Reserve dates
          </a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="wander ↓" />

      {/* MARQUEE — sensory ribbon (unique block, tidewell lacks) */}
      <div className="sr-marquee" aria-hidden="true">
        <div className="sr-marquee-track">
          <span>Lavender · Warm Stone · Rosé From The Barrel · Fig &amp; Honey · Market Mornings · Candlelit Supper · Slow Walking · </span>
          <span>Lavender · Warm Stone · Rosé From The Barrel · Fig &amp; Honey · Market Mornings · Candlelit Supper · Slow Walking · </span>
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="sr-manifest">
        <p>
          We didn&rsquo;t design a tour. <em>We laid a single path</em> and
          asked you to walk it slowly.
        </p>
      </section>

      {/* STEPS / PROCESS — how a day unfolds (unique block, tidewell lacks) */}
      <section className="sr-steps" id="walk">
        <div className="sr-steps-head">
          <span className="sr-kick">How it unfolds</span>
          <h2>A day on the Sentier.</h2>
        </div>
        <ol className="sr-steps-row">
          {STEPS.map((s) => (
            <li className="sr-step" key={s.n}>
              <span className="sr-step-n">{s.n}</span>
              <span className="sr-step-k">{s.k}</span>
              <h3 dangerouslySetInnerHTML={{ __html: s.t }} />
              <p>{s.s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS */}
      <section className="sr-features">
        <div className="sr-features-head">
          <span className="sr-kick">Woven into every stay</span>
          <h2>What&rsquo;s always included.</h2>
        </div>
        <div className="sr-features-grid">
          {FEATURES.map((f) => (
            <div className="sr-feature" key={f.t}>
              <h3>{f.t}</h3>
              <p>{f.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY — four chapters as cover plates */}
      <section className="sr-gallery" id="table">
        <div className="sr-gallery-head">
          <span className="sr-kick">One path, four chapters</span>
          <h2>Fields to the table.</h2>
        </div>
        <div className="sr-gallery-grid">
          {CHAPTERS.map((c) => (
            <div className="sr-chapter" key={c.n} style={{ backgroundImage: `url(${c.img})` }}>
              <div className="sr-chapter-veil" aria-hidden />
              <span className="sr-chapter-n">{c.n}</span>
              <div className="sr-chapter-text">
                <h3>{c.t}</h3>
                <p>{c.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — the family behind the wall */}
      <section className="sr-split">
        <div className="sr-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="sr-split-copy">
          <span className="sr-kick">Why the wall matters</span>
          <h2>It is a real path, not a metaphor.</h2>
          <p>
            The wall you walk beside marks the edge of one family&rsquo;s
            land — four generations, the same rows, the same cellar steps.
            You are not touring an idea of Provence. You are walking someone&rsquo;s
            actual Tuesday.
          </p>
          <a href="#stay" className="sr-link">
            Meet the family →
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="sr-stats">
        {[
          ["1748", "the mas was built"],
          ["4", "generations still on this land"],
          ["12", "guests per stay, never more"],
          ["3", "meals a day, family-style"],
        ].map(([n, l]) => (
          <div className="sr-stat" key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="sr-quote">
        <blockquote>
          &ldquo;We came for the wine and left able to name every wildflower
          in the lavender rows. <em>Nobody wanted to leave.</em>&rdquo;
        </blockquote>
        <cite>— Hélène R., weekend guest · Lyon</cite>
      </section>

      {/* PRICING TIERS — signature block */}
      <section className="sr-pricing" id="stay">
        <div className="sr-pricing-head">
          <span className="sr-kick">Choose your length of path</span>
          <h2>Stay a day, a weekend, or the whole week.</h2>
          <p>Every plan walks the same route. Longer stays simply walk it slower.</p>
        </div>
        <div className="sr-pricing-grid">
          {PLANS.map((p) => (
            <div className={`sr-plan${p.featured ? " sr-plan-featured" : ""}`} key={p.name}>
              {p.featured && <span className="sr-plan-badge">Most walked</span>}
              <span className="sr-plan-tag">{p.tag}</span>
              <h3>{p.name}</h3>
              <div className="sr-plan-price">
                <b>{p.price}</b>
                <span>{p.per}</span>
              </div>
              <p className="sr-plan-blurb">{p.blurb}</p>
              <ul className="sr-plan-list">
                {p.bullets.map((b) => (
                  <li key={b} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>
              <a href="#" className={p.featured ? "sr-btn" : "sr-ghost-btn"}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CLIMAX */}
      <section className="sr-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="sr-climax-veil" aria-hidden />
        <div className="sr-climax-copy">
          <h2>
            The table is set. <em>Come walk to it.</em>
          </h2>
          <a href="#stay" className="sr-btn">
            Reserve your dates
          </a>
        </div>
      </section>

      <footer className="sr-foot">
        <span className="sr-brand">SENTIER</span>
        <span>A walked retreat through Provence · One wall, one path, one table</span>
      </footer>
    </div>
  );
}
