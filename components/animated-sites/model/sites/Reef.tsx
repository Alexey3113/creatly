"use client";
/* REEF — CRATERLINE: guided volcanic-island crossings. Мир: тропический вулканический остров,
   слоями от бирюзового берега к магматическому гребню. Собран на общем движке <Reel/>; лендинг и
   типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, свой шрифт-пейринг Syne × Work Sans,
   палитра turquoise/jungle/sand-gold/magma). Сигнатурный блок: офсетная masonry-галерея четырёх зон. */
import { Reel, type ReelScene } from "../reel";
import "./reef.css";

const A = "/uploads/1/animated/reef";
const scenes: ReelScene[] = [
  { id: "beach", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="rf-eyebrow">Guided volcanic-island crossings</span>
      <h1>Walk the whole<br /><em>island, once.</em></h1>
      <p>One vivid trail from turquoise shallows to a smoking crater rim — four skies in a single guided crossing, painted before you ever lace a boot.</p>
      <div className="rf-cta"><a href="#book" className="rf-btn">Book the crossing</a><a href="#route" className="rf-ghost">See the trail →</a></div>
    </>
  ) },
  { id: "jungle", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="rf-idx">— 02 · the green vein</span><h2>Into the Canopy</h2>
      <p>The path narrows to a footwide seam of light. Vines, parrots, a stream that never stops arguing with the rocks — this is where the island stops being a postcard.</p></>
  ) },
  { id: "lagoon", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="rf-idx">— 03 · the hidden basin</span><h2>Rainbow Falls</h2>
      <p>A curtain of white water drops into jade, and somehow there's always a rainbow standing in the mist. Most guests stop talking here. Some stop walking.</p></>
  ) },
  { id: "ridge", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="rf-idx">— 04 · the crater rim</span><h2>Where the Island Breathes</h2>
      <p>Black rock, a hot seam of light in the stone, the whole sea turned to copper below you. The trail ends at the one view that explains all three before it.</p></>
  ) },
];

const zones = [
  { n: "01", key: "shore", label: "The Shore", note: "Turquoise shallows, a reef line you can wade to.", img: `${A}/s1-bg.webp` },
  { n: "02", key: "jungle", label: "The Canopy", note: "Green shade, a stream for a guide.", img: `${A}/s2-bg.webp` },
  { n: "03", key: "lagoon", label: "The Basin", note: "A waterfall most maps don't bother drawing.", img: `${A}/s3-bg.webp` },
  { n: "04", key: "ridge", label: "The Rim", note: "Black rock, thin air, a crater still warm.", img: `${A}/s4-bg.webp` },
];

const steps = [
  ["01", "Shore", "Turquoise shallows and a reef line you can wade to. Boots stay dry — for about an hour."],
  ["02", "Jungle", "Canopy shade, a stream for a guide, parrots keeping score overhead."],
  ["03", "Lagoon", "A hidden waterfall basin most maps don't bother drawing."],
  ["04", "Ridge", "Black rock, thin air, a crater still warm enough to argue with."],
];

export function Reef() {
  return (
    <div className="rf">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap" />
      <header className="rf-nav">
        <span className="rf-brand">CRATERLINE</span>
        <nav><a href="#route">The trail</a><a href="#zones">Zones</a><a href="#notes">Field notes</a><a href="#book" className="rf-nav-cta">Book the crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* MANIFESTO */}
      <section className="rf-manifest">
        <p>Most islands hand you a lounge chair. <em>This one hands you a trailhead.</em></p>
      </section>

      {/* STEPS / PROCESS — горизонтальный маршрут с соединяющей тропой (уникальный блок) */}
      <section className="rf-steps" id="route">
        <div className="rf-steps-head"><span className="rf-kick">The route, top to bottom</span><h2>One island, four completely different countries.</h2></div>
        <ol className="rf-steps-row">
          {steps.map(([n, t, s], i) => (
            <li className="rf-step" key={i}>
              <span className="rf-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* GALLERY — SIGNATURE: офсетная masonry-сетка четырёх зон */}
      <section className="rf-gallery" id="zones">
        <div className="rf-gallery-head"><span className="rf-kick">The four zones</span><h2>The island, laid out at once.</h2></div>
        <div className="rf-gallery-grid">
          {zones.map((z, i) => (
            <a href="#route" className={`rf-tile rf-tile-${z.key}`} key={z.key} style={{ backgroundImage: `url(${z.img})` }}>
              <span className="rf-tile-veil" aria-hidden />
              <span className="rf-tile-n">{z.n}</span>
              <h3>{z.label}</h3>
              <p>{z.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* SPLIT */}
      <section className="rf-split">
        <div className="rf-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="rf-split-copy">
          <span className="rf-kick">Why the trail holds up</span>
          <h2>We walk it before you do — every root, every rock.</h2>
          <p>Every crossing is scouted at dawn, mapped from tideline to crater, and led by islanders who've walked the ridge since before the trail had a name. You're never guessing which vine is a snake.</p>
          <a href="#notes" className="rf-link">Meet your guides →</a>
        </div>
      </section>

      {/* MARQUEE — бегущая строка (уникальный блок) */}
      <div className="rf-marquee" aria-hidden>
        <div className="rf-marquee-track">
          <span>TURQUOISE SHALLOWS</span><span>·</span><span>GREEN VEIN</span><span>·</span><span>RAINBOW BASIN</span><span>·</span><span>CRATER RIM</span><span>·</span><span>MAGMA LIGHT</span><span>·</span>
          <span>TURQUOISE SHALLOWS</span><span>·</span><span>GREEN VEIN</span><span>·</span><span>RAINBOW BASIN</span><span>·</span><span>CRATER RIM</span><span>·</span><span>MAGMA LIGHT</span><span>·</span>
        </div>
      </div>

      {/* STATS */}
      <section className="rf-stats">
        {[["9km", "shore to crater rim"], ["612m", "total climb"], ["4", "skies in one crossing"], ["8", "hikers per crossing, max"]].map(([n, l], i) => (
          <div className="rf-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="rf-quote">
        <blockquote>"I've hiked volcanoes on three continents. I have never seen the water go that turquoise, or the ridge glow that orange. It felt like walking through <em>four different paintings</em>."</blockquote>
        <cite>— Renata Costa, trail contributor · Faro Verde Journal</cite>
      </section>

      {/* FEATURE CARDS — что несёт маршрут (уникальный блок) */}
      <section className="rf-features" id="notes">
        <div className="rf-features-head"><span className="rf-kick">What's included</span><h2>Everything the crossing carries.</h2></div>
        <div className="rf-features-row">
          {[["Local guide & radio net", "An islander who has walked the ridge for years, radio-linked to base the whole crossing."],
            ["Reef-safe gear & refills", "Reef-safe sun cream, dry bags and water refills at the lagoon — nothing plastic left behind."],
            ["Permits & ranger check-ins", "Every crossing is cleared with the ridge rangers before your boots touch sand."],
            ["A rain plan, built in", "The jungle floods fast. Every date carries a fallback window, no extra charge."]].map(([t, s], i) => (
            <div className="rf-feature" key={i}><span className="rf-feature-n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="rf-deal" id="book">
        <div className="rf-deal-card">
          <span className="rf-kick">The full crossing</span>
          <div className="rf-price"><b>$185</b><span>/ hiker · guide, permits &amp; reef-safe gear</span></div>
          <p>A full day on the trail — shore at sunrise, ridge by sunset, everything handled in between. Reserve a date and we send the illustrated route map.</p>
          <a href="#" className="rf-btn">Reserve a trail date</a>
          <span className="rf-note">Rain-check guaranteed · Max 8 per crossing</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="rf-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="rf-climax-veil" aria-hidden />
        <div className="rf-climax-copy"><h2>The ridge is <em>one trail</em> away.</h2><a href="#book" className="rf-btn">Book the crossing</a></div>
      </section>

      <footer className="rf-foot"><span className="rf-brand">CRATERLINE</span><span>Guided volcanic-island crossings · Shore to summit, painted first</span></footer>
    </div>
  );
}
