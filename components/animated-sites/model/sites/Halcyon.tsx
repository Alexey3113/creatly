"use client";
/* HALCYON — «PETALFARE», a contemporary spring river-festival. Not Japan/cherry-shrine: a modern city
   blossom-park avenue with food carts → a city river of petal boats and streamers → a sunny festival lawn
   with picnic blankets and market stalls → a sunset promenade strung with lights. Собран на общем движке
   <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг Anton × Schibsted
   Grotesk, палитра blush/chartreuse/cyan/rose + pink CTA). Все 4 сцены светлые → копи на frosted-панелях. */
import { Reel, type ReelScene } from "../reel";
import "./halcyon.css";

const A = "/uploads/1/animated/halcyon";

const scenes: ReelScene[] = [
  { id: "avenue", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, spark: 5, copy: (
    <div className="hc-panel hc-panel-hero">
      <span className="hc-eyebrow">Petalfare · May 15–17, downtown</span>
      <h1>Follow the<br /><em>petals down.</em></h1>
      <p>Three blossom-lined days on the river — food carts, paper streamers and the whole city out on a blanket.</p>
      <div className="hc-cta"><a href="#tickets" className="hc-btn">Get tickets</a><a href="#program" className="hc-ghost">See the program →</a></div>
    </div>
  ) },
  { id: "river", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, spark: 8, copy: (
    <div className="hc-panel hc-panel-chapter">
      <span className="hc-idx">— 02 · the float</span><h2>Petal Boats</h2>
      <p>Fold a streamer, set it loose under the footbridge, and race a hundred paper boats down to the lawn.</p>
    </div>
  ) },
  { id: "lawn", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 4, copy: (
    <div className="hc-panel hc-panel-chapter">
      <span className="hc-idx">— 03 · the lawn</span><h2>Blanket &amp; Bites</h2>
      <p>Picnic blankets, lantern strings, a dozen stalls slinging skewers and shaved ice — claim your patch before noon.</p>
    </div>
  ) },
  { id: "riverside", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <div className="hc-panel hc-panel-chapter">
      <span className="hc-idx">— 04 · the strand</span><h2>Golden Hour Strand</h2>
      <p>String lights click on, the crowd spills onto the promenade, and the whole river turns pink for the closing set.</p>
    </div>
  ) },
];

const MARQUEE_ITEMS = ["Petals down", "Paper boat race", "Free lawn entry", "40+ makers market", "Lantern walk", "May 15–17"];

const ZONES: [string, string, string][] = [
  ["01", "The Avenue", "Blossom trees, bunting and a dozen food carts strung end to end."],
  ["02", "The Float", "Paper boats and streamers drift the river under the footbridge."],
  ["03", "The Lawn", "Picnic blankets, market stalls and a stage under strung lanterns."],
  ["04", "The Strand", "Golden-hour promenade, string lights, and the closing set at dusk."],
];

const PROGRAM: [string, string, [string, string, string][]][] = [
  ["Day One", "Fri, May 15", [
    ["10:00", "Avenue opens", "Food carts and bunting go up along the blossom walk"],
    ["15:00", "Petal Boat Race — heat one", "First streamers hit the water at the footbridge"],
    ["19:30", "Sunset DJ set", "The Strand"],
  ]],
  ["Day Two", "Sat, May 16", [
    ["09:00", "Market opens", "40 makers set up across the Lawn"],
    ["13:00", "Lantern-folding workshop", "Kids' tent, all ages welcome"],
    ["20:00", "Headline set — Rosa Vane", "The Strand"],
  ]],
  ["Day Three", "Sun, May 17", [
    ["11:00", "Community picnic", "Bring a blanket, claim your patch of grass"],
    ["16:00", "Petal Boat Race — final", "Winner takes the petal crown"],
    ["21:00", "Lantern release finale", "The Strand, closing the weekend"],
  ]],
];

const GALLERY: [string, string, string, string][] = [
  [`${A}/s1-bg.webp`, "01", "Avenue", "Blossom & carts"],
  [`${A}/s2-bg.webp`, "02", "River", "Boats & streamers"],
  [`${A}/s3-bg.webp`, "03", "Lawn", "Blankets & market"],
  [`${A}/s4-bg.webp`, "04", "Strand", "Lights at dusk"],
];

const STATS: [string, string][] = [
  ["3", "days on the river"],
  ["40+", "market makers"],
  ["12", "food carts & stalls"],
  ["6pm", "the river turns pink"],
];

const PLANS: [string, string, string, string, string[], boolean][] = [
  ["Day Pass", "One day, every zone", "$28", "/ single day", ["Avenue, River &amp; Lawn access", "Petal Boat Race entry", "Market discount card"], false],
  ["Weekend Pass", "All three days, no lines", "$58", "/ full weekend", ["Full 3-day zone access", "Reserved lawn blanket spot", "Lantern-folding workshop seat", "Priority boat race entry"], true],
  ["Lawn &amp; Market VIP", "The lawn, sorted for you", "$95", "/ full weekend", ["Everything in Weekend Pass", "Shaded front-lawn blanket zone", "Market welcome bag, 12 vendors", "Closing-set VIP viewing rail"], false],
];

export function Halcyon() {
  return (
    <div className="hc">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap" />

      <header className="hc-nav">
        <span className="hc-brand">PETALFARE</span>
        <nav>
          <a href="#program">Program</a>
          <a href="#zones">Zones</a>
          <a href="#market">Market</a>
          <a href="#tickets" className="hc-nav-cta">Get tickets</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="drift ↓" />

      {/* MARQUEE — SIGNATURE (часть A): бегущий тикер */}
      <section className="hc-marquee" aria-label="Festival highlights">
        <div className="hc-marquee-track">
          <div className="hc-marquee-row">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="hc-marquee-item" key={i}>{item}<span className="hc-marquee-dot" aria-hidden>✦</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO — одна большая мысль */}
      <section className="hc-manifest">
        <p>Spring doesn&rsquo;t wait for anyone. <em>Come get lost in the bloom.</em></p>
      </section>

      {/* FEATURE-CARDS — Four Zones (тип, которого нет у эталона) */}
      <section className="hc-zones" id="zones">
        <div className="hc-zones-head"><span className="hc-kick">Four zones, one afternoon</span><h2>Where the festival happens</h2></div>
        <div className="hc-zones-grid">
          {ZONES.map(([n, t, s]) => (
            <div className="hc-zone" key={n}><span className="hc-zone-n">{n}</span><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* PROGRAM — SIGNATURE (часть B): расписание по дням, 3 колонки */}
      <section className="hc-program" id="program">
        <div className="hc-program-head">
          <div><span className="hc-kick">The program</span><h2>Three days, timed to the minute.</h2></div>
          <p className="hc-program-note">Every set, workshop and boat-race heat, zone by zone. Free entry to the Avenue, River and Lawn all weekend.</p>
        </div>
        <div className="hc-program-grid">
          {PROGRAM.map(([day, date, rows]) => (
            <div className="hc-program-day" key={day}>
              <span className="hc-program-day-n">{date}</span>
              <h3>{day}</h3>
              {rows.map(([time, title, note]) => (
                <div className="hc-program-row" key={time}>
                  <span className="hc-program-time">{time}</span>
                  <div><h4>{title}</h4><span>{note}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY — четыре главы мира */}
      <section className="hc-gallery">
        <div className="hc-gallery-head"><span className="hc-kick">The whole route</span><h2>Every corner of Petalfare</h2></div>
        <div className="hc-gallery-row">
          {GALLERY.map(([bg, n, t, s]) => (
            <a className="hc-tile" href="#program" style={{ backgroundImage: `url(${bg})` }} key={n}>
              <div className="hc-tile-veil" aria-hidden />
              <span className="hc-tile-n">{n}</span><h3>{t}</h3><p>{s}</p>
            </a>
          ))}
        </div>
      </section>

      {/* SPLIT — рынок/вендоры */}
      <section className="hc-split" id="market">
        <div className="hc-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="hc-split-copy">
          <span className="hc-kick">We hand-pick the market</span>
          <h2>Forty makers, one long lawn.</h2>
          <p>Ceramics, hot sauce, pressed-flower prints and the loudest shaved-ice stand downtown. Every stall is juried, every single year — no resellers, no filler.</p>
          <a href="#tickets" className="hc-link">See this year&rsquo;s makers →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="hc-stats">
        {STATS.map(([n, l]) => (
          <div className="hc-stat" key={l}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="hc-quote">
        <blockquote>&ldquo;We came for the food carts and stayed for the boat race — genuinely <em>the best Saturday</em> the city has all year.&rdquo;</blockquote>
        <cite>— Priya N., third year at Petalfare</cite>
      </section>

      {/* PRICING — сделка: ticket tiers */}
      <section className="hc-pricing" id="tickets">
        <div className="hc-pricing-head"><span className="hc-kick">Tickets</span><h2>Pick your Petalfare.</h2><p>Every pass covers Avenue, River and Lawn entry — upgrade for reserved space and the closing-set rail.</p></div>
        <div className="hc-pricing-grid">
          {PLANS.map(([name, tag, price, unit, features, featured]) => (
            <div className={`hc-plan${featured ? " hc-plan-featured" : ""}`} key={name}>
              {featured && <span className="hc-plan-badge">Most popular</span>}
              <span className="hc-plan-tag">{tag}</span>
              <h3 dangerouslySetInnerHTML={{ __html: name }} />
              <div className="hc-plan-price"><b>{price}</b><span>{unit}</span></div>
              <p className="hc-plan-blurb">Weekend entry, zone access and everything below, ready the moment you arrive.</p>
              <ul className="hc-plan-list">
                {features.map((f) => <li key={f} dangerouslySetInnerHTML={{ __html: f }} />)}
              </ul>
              <a href="#" className="hc-ghost-btn">Reserve this pass</a>
            </div>
          ))}
        </div>
      </section>

      {/* CLIMAX */}
      <section className="hc-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hc-climax-veil" aria-hidden />
        <div className="hc-climax-copy"><h2>The river turns pink at six. <em>Be on it.</em></h2><a href="#tickets" className="hc-btn">Get tickets</a></div>
      </section>

      <footer className="hc-foot"><span className="hc-brand">PETALFARE</span><span>Spring river festival · Downtown, May 15–17</span></footer>
    </div>
  );
}
