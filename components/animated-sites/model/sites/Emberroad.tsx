"use client";
/* EMBERROAD — «Amberline» guided desert caravan crossings. Мир: жар полуденных дюн остывает в
   звёздную ночь — путь как смена температуры. Собран на общем движке <Reel/>; лендинг и типографика —
   БЕСХОЗНЫЕ (свой набор/порядок блоков, свой шрифт-пейринг Libre Caslon Display × IBM Plex Sans,
   палитра ochre/rust/sand/indigo-night + amber CTA). Сигнатурный блок — marquee (лента путевых точек). */
import { Reel, type ReelScene } from "../reel";
import "./emberroad.css";

const A = "/uploads/1/animated/emberroad";

const scenes: ReelScene[] = [
  {
    id: "dunes",
    bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="er-eyebrow">Guided desert crossings · five nights, one road</span>
        <h1>Walk until<br /><em>the heat breaks.</em></h1>
        <p>A painted caravan line from the sunlit dune wall to a cold camp under the Milky Way — on foot and by camel, with a guide who has walked this stretch eleven dry seasons running.</p>
        <div className="er-cta"><a href="#crossing" className="er-btn">Book a crossing</a><a href="#route" className="er-ghost">See the route →</a></div>
      </>
    ),
  },
  {
    id: "oasis",
    bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="er-idx">— 02 · nine palms oasis</span>
        <h2>The Green Hour</h2>
        <p>Palm shade and a mirror of still water. We stop here two full days — you drink, you rest, the camels drink twice their weight before the storm-season stretch.</p>
      </>
    ),
  },
  {
    id: "storm",
    dark: true,
    bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    copy: (
      <>
        <span className="er-idx er-light">— 03 · the ochre wall</span>
        <h2 className="er-hl">Into the Sandstorm</h2>
        <p className="er-pl">The wind turns the sky the colour of a struck match. Ropes go on, faces wrap, and six travelers become one line instead — this is the stretch you'll tell people about.</p>
      </>
    ),
  },
  {
    id: "camp",
    dark: true,
    spark: 8,
    bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="er-idx er-light">— 04 · starfall camp</span>
        <h2 className="er-hl">Camp Under the Milky Way</h2>
        <p className="er-pl">The fire goes up before the cold does. Forty-one degrees at noon, four by midnight — you'll fall asleep under more stars than you knew existed.</p>
      </>
    ),
  },
];

const waypoints = ["Sungate Well · 0 km", "The Salt Flats · 38 km", "Nine Palms Oasis · 91 km", "The Ochre Throat · 154 km", "Starfall Camp · 208 km"];

const steps = [
  ["01", "Dawn Briefing", "Camels loaded before the sun clears the dunes. Route, water rationing and the day's heat window, laid out at the fire."],
  ["02", "The Long Light", "Six to eight hours walking the dune spine, ochre light, one long shadow ahead of you the whole way."],
  ["03", "The Ochre Wall", "We read the storm before it reads us. When the sky changes colour, we rope in and turn side-on to the wind."],
  ["04", "Embers & Stars", "Camp goes up in forty minutes flat. Then the sky opens, and someone always asks which one is Polaris."],
];

const chapters = [
  ["01", "Dunes", `${A}/s1-bg.webp`],
  ["02", "Oasis", `${A}/s2-bg.webp`],
  ["03", "Storm", `${A}/s3-bg.webp`],
  ["04", "Camp", `${A}/s4-bg.webp`],
];

export function Emberroad() {
  return (
    <div className="er">
      <header className="er-nav">
        <span className="er-brand">AMBERLINE</span>
        <nav>
          <a href="#route">The Route</a>
          <a href="#chapters">Chapters</a>
          <a href="#crossing" className="er-nav-cta">Book a crossing</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="onward →" />

      {/* MARQUEE — SIGNATURE BLOCK: путевые точки маршрута, бегущая лента */}
      <section className="er-marquee-wrap" aria-label="The route, well by well">
        <span className="er-marquee-kick">The route, well by well</span>
        <div className="er-marquee">
          <div className="er-marquee-track">
            {[...waypoints, ...waypoints].map((w, i) => (
              <span key={i}>{w}<i aria-hidden>✦</i></span>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO — одна большая мысль */}
      <section className="er-manifest">
        <p>Comfort is a room with the door shut. <em>We are asking you to leave it open</em> — dune, wind, cold — and walk until the temperature itself becomes the story.</p>
      </section>

      {/* STEPS / PROCESS — новый тип блока (нет у эталона), горизонтальные шаги */}
      <section className="er-steps" id="route">
        <div className="er-steps-head"><span className="er-kick">Five nights, four chapters</span><h2>How a crossing runs.</h2></div>
        <ol className="er-steps-row">
          {steps.map(([n, t, s]) => (
            <li key={n}><span className="er-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* GALLERY — плиты-обложки глав, ещё один блок, которого нет у эталона */}
      <section className="er-gallery" id="chapters">
        <div className="er-gallery-head"><span className="er-kick">One road, four paintings</span><h2>The chapters.</h2></div>
        <div className="er-gallery-grid">
          {chapters.map(([n, name, img]) => (
            <div className="er-tile" key={n} style={{ backgroundImage: `url(${img})` }}>
              <span className="er-tile-n">{n}</span>
              <span className="er-tile-name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase кадр + текст */}
      <section className="er-split">
        <div className="er-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="er-split-copy">
          <span className="er-kick">Why walk it with us</span>
          <h2>We scouted every dune before we asked you to climb one.</h2>
          <p>Eleven dry seasons on this stretch of road — where the wells still hold water, which ridge the storm season favours, and the exact hour the temperature turns. You are never the first ones finding it out.</p>
          <a href="#crossing" className="er-link">Meet the guides →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="er-stats">
        {[["11", "years guiding this stretch"], ["38°→4°", "the day's swing, dune to camp"], ["5", "nights, four painted chapters"], ["8", "travelers per caravan, max"]].map(([n, l]) => (
          <div className="er-stat" key={l}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="er-quote">
        <blockquote>"I've backpacked on four continents and never felt looked after like this. By the third night the desert stopped being frightening and started being — <em>enormous, in a way that felt like a gift</em>."</blockquote>
        <cite>— Priya N., trail guide · Manali</cite>
      </section>

      {/* DEAL */}
      <section className="er-deal" id="crossing">
        <div className="er-deal-card">
          <span className="er-kick">The Ember Road crossing</span>
          <div className="er-price"><b>$1,480</b><span>/ traveler · camel support, guide, tents &amp; the painted route notes</span></div>
          <p>Five nights, four chapters, eight travelers to a caravan. Departures follow the cool season — book a window and we send the illustrated route plan two weeks out.</p>
          <a href="#" className="er-btn">Reserve a departure</a>
          <span className="er-note">Free date change · Storm-season guaranteed</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="er-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="er-climax-veil" aria-hidden />
        <div className="er-climax-copy"><h2>The cold, clear night is <em>five days</em> down the road.</h2><a href="#crossing" className="er-btn">Book a crossing</a></div>
      </section>

      <footer className="er-foot">
        <span className="er-brand">AMBERLINE</span>
        <span>Guided desert crossings · Walked eleven years before we ever sold it</span>
      </footer>
    </div>
  );
}
