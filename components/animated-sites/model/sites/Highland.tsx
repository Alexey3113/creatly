"use client";
/* HIGHLAND — «Drystane», Highland walking tours & whisky-ruins heritage travel. Мир: переменчивая
   погода как драма над вереском и камнем — вереск-морда → тёмный лох → руина в тумане → шторм,
   расходящийся в радугу. Сквозной мотив: старая каменная стена (drystane dyke), идущая через холмы
   к руине — прошита через степ-блок (waymarker-мили) и сигнатурный сплит. Собран на общем движке
   <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг Playfair
   Display × Public Sans, палитра heather/slate/moss/gorse-gold + gold CTA). */
import { Reel, type ReelScene } from "../reel";
import "./highland.css";

const A = "/uploads/1/animated/highland";
const scenes: ReelScene[] = [
  { id: "moor", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="hg-eyebrow">Highland walking &amp; whisky trails</span>
      <h1>Walk until<br /><em>the sky changes its mind.</em></h1>
      <p>Four days across heather, loch and ruin — one drystane wall the whole way, and weather that argues with itself every hour.</p>
      <div className="hg-cta"><a href="#book" className="hg-btn">Book the walk</a><a href="#route" className="hg-ghost">See the route →</a></div>
    </>
  ) },
  { id: "loch", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="hg-idx">— 02 · the loch</span><h2>Loch Ault</h2>
      <p>The water goes still and dark enough to double the hills standing round it. We stop here, flask out, and say nothing for a while.</p></>
  ) },
  { id: "ruin", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="hg-idx">— 03 · the ruin</span><h2>Ardnoch Keep</h2>
      <p>Roofless four hundred years, and still the best shelter on the hill when the rain decides to turn sideways.</p></>
  ) },
  { id: "storm", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <><span className="hg-idx">— 04 · the clearing</span><h2>After the Squall</h2>
      <p>The rain quits mid-stride and the whole glen goes gold, then silver, then — more often than not — a full arch of rainbow.</p></>
  ) },
];

export function Highland() {
  return (
    <div className="hg">
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- дублируем @import линком (Turbopack иногда роняет неглавный @import) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Public+Sans:wght@400;500;600;700;800&display=swap" />

      <header className="hg-nav">
        <span className="hg-brand">DRYSTANE</span>
        <nav><a href="#route">The Route</a><a href="#chapters">Chapters</a><a href="#book" className="hg-nav-cta">Book the Walk</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* MANIFESTO — big-type, одна крупная мысль */}
      <section className="hg-manifest">
        <p>Scotland does not perform for you. <em>It changes its mind mid-sentence</em> — sun, then squall, then sun again — and the only sensible answer is to keep walking.</p>
      </section>

      {/* STEPS/PROCESS — waymarker-мили вдоль стены (уникальный блок, каких у эталона нет) */}
      <section className="hg-steps" id="route">
        <div className="hg-steps-head"><span className="hg-kick">The route, waymarker to waymarker</span><h2>Eleven miles, one wall the whole way.</h2></div>
        <ol className="hg-marks">
          {[["Mile 2", "Heather Line", "The drystane wall picks up at the car park and doesn't let go. Heather to both horizons, larks going up ahead of you."],
            ["Mile 5", "Loch Ault", "Flask tea at the old boathouse. The loch is dark enough to double every hill standing round it."],
            ["Mile 8", "Ardnoch Rise", "The wall climbs to meet the ruin. Rooks first, then the roofless keep, then the whole strath falls open below."],
            ["Mile 11", "The Clearing", "Last pull with the storm at your back — the glen finds a rainbow for the finish more often than it doesn't."]].map(([m, t, s], i) => (
            <li className="hg-mark" key={i}>
              <span className="hg-mark-post" aria-hidden />
              <span className="hg-mark-mile">{m}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — три способа пройти маршрут (уникальный блок) */}
      <section className="hg-features">
        <span className="hg-kick hg-kick-c">Pick your pace</span>
        <h2 className="hg-features-h">Three ways to walk it.</h2>
        <div className="hg-feature-grid">
          {[["The Day Walk", "Eleven miles, one guide, a packed lunch and a dram poured cold at the ruin. Home by dusk.", "from £85"],
            ["Whisky & Ruins", "Two days, one night in a shepherd's bothy, two distillery calls either end of the walk.", "from £340"],
            ["The Bespoke Line", "Private guide, your pace, any weather — we've walked this wall in all of it and we're not precious about rain.", "on request"]].map(([t, d, p], i) => (
            <div className="hg-feature-card" key={i}>
              <span className="hg-feature-n">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="hg-feature-p">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — SPLIT, медиа СПРАВА (руина) + литературная копия */}
      <section className="hg-split">
        <div className="hg-split-copy">
          <span className="hg-kick">Why the ruin holds the whole trip together</span>
          <h2>We do not walk around Ardnoch. <em>We walk into it.</em></h2>
          <p>Four hundred years without a roof, and the keep still cuts the wind better than half the bothies in the glen. We stop inside the walls, pour the first dram of the day, and let people read the old stone before we say a word about its history. It has always done the talking better than we can.</p>
          <a href="#chapters" className="hg-link">Read the route notes →</a>
        </div>
        <div className="hg-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
      </section>

      {/* GALLERY — четыре главы как обложки */}
      <section className="hg-gallery" id="chapters">
        <span className="hg-kick hg-kick-c">Four chapters, one path</span>
        <div className="hg-gallery-grid">
          {[["Heather Moor", `${A}/s1-bg.webp`], ["Loch Ault", `${A}/s2-bg.webp`], ["Ardnoch Keep", `${A}/s3-bg.webp`], ["The Clearing", `${A}/s4-bg.webp`]].map(([t, img], i) => (
            <div className="hg-gallery-tile" key={i} style={{ backgroundImage: `url(${img})` }}>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE — бегущая строка */}
      <div className="hg-marquee" aria-hidden>
        <div className="hg-marquee-track">
          <span>DRYSTANE DYKE · HEATHER MOOR · LOCH AULT · ARDNOCH KEEP · SINGLE MALT · ROWAN &amp; MIST · STORM LIGHT · DRYSTANE DYKE · HEATHER MOOR · LOCH AULT · ARDNOCH KEEP · SINGLE MALT · ROWAN &amp; MIST · STORM LIGHT · </span>
          <span>DRYSTANE DYKE · HEATHER MOOR · LOCH AULT · ARDNOCH KEEP · SINGLE MALT · ROWAN &amp; MIST · STORM LIGHT · DRYSTANE DYKE · HEATHER MOOR · LOCH AULT · ARDNOCH KEEP · SINGLE MALT · ROWAN &amp; MIST · STORM LIGHT · </span>
        </div>
      </div>

      {/* STATS */}
      <section className="hg-stats">
        {[["11", "miles of continuous drystane wall"], ["3", "centuries the keep has stood roofless"], ["2", "drams poured at the ruin, rain or shine"], ["68", "walkers taken each season, no more"]].map(([n, l], i) => (
          <div className="hg-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="hg-quote">
        <blockquote>“I've walked the West Highland Way twice and never once stood still as long as I did at that ruin. Our guide just <em>let the silence happen.</em>”</blockquote>
        <cite>— Fiona McArdle, Glasgow</cite>
      </section>

      {/* FAQ/ACCORDION — уникальный блок */}
      <section className="hg-faq">
        <span className="hg-kick hg-kick-c">Before you lace up</span>
        <div className="hg-faq-list">
          {[["What if it rains?", "It will, at least once — that's the point, not the problem. Waterproofs are non-negotiable and we carry a spare set."],
            ["How fit do I need to be?", "Eleven miles over open hill, one long climb to the ruin. If you can walk a Sunday coastal path at pace, you can walk this."],
            ["Is the whisky included?", "Two drams on the two-day route, poured at Ardnoch itself. The day walk gets one, at the finish."],
            ["What do we carry?", "Your own boots and layers. We carry the flask, the first-aid kit and the map — you carry the curiosity."]].map(([q, a], i) => (
            <details className="hg-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="hg-deal" id="book">
        <div className="hg-deal-card">
          <span className="hg-kick">The Whisky &amp; Ruins Walk</span>
          <div className="hg-price"><b>£340</b><span>/ walker · two guided days, one bothy night, two drams</span></div>
          <p>Small groups only — six walkers to a guide, one departure a week through the season. Reserve a date and we send the route notes and kit list by return.</p>
          <a href="#" className="hg-btn">Reserve a date</a>
          <span className="hg-note">Free to reschedule for weather · Boots and waterproofs not supplied</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="hg-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hg-climax-veil" aria-hidden />
        <div className="hg-climax-copy"><h2>The rainbow is <em>always waiting</em> on the far side of the squall.</h2><a href="#book" className="hg-btn">Book the walk</a></div>
      </section>

      <footer className="hg-foot"><span className="hg-brand">DRYSTANE</span><span>Highland walking tours · Whisky &amp; ruins, one wall at a time.</span></footer>
    </div>
  );
}
