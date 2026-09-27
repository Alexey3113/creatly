"use client";
/* WILDS — «VELDLIGHT». Мир: золотая африканская саванна за один долгий день — акациевый рассвет
   (жираф) → водопой утром (зебры/слон) → миграция гну в зной → одинокий баобаб на закате. Собран
   на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг
   Big Shoulders Display × Epilogue, палитра savanna-gold/acacia-green/sunset-orange/earth + sun CTA). */
import { Reel, type ReelScene } from "../reel";
import "./wilds.css";

const A = "/uploads/1/animated/wilds";
const scenes: ReelScene[] = [
  { id: "acacia", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="wl-eyebrow">Photographic Safaris · Great Rift Savanna</span>
      <h1>Chase the light,<br /><em>not the checklist.</em></h1>
      <p>One outfitter, one open vehicle, fourteen hours of the best light on the continent — from the acacia line at dawn to a lone baobab at dusk.</p>
      <div className="wl-cta"><a href="#camp" className="wl-btn">Reserve your day</a><a href="#day" className="wl-ghost">See the day →</a></div>
    </>
  ) },
  { id: "waterhole", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="wl-idx">— 02 · the gathering</span><h2>The Waterhole</h2>
      <p>By mid-morning the plain empties into one flat mirror. Elephant, zebra, giraffe — nobody hurries here, and neither do you.</p></>
  ) },
  { id: "migration", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="wl-idx">— 03 · the crossing</span><h2>The Migration</h2>
      <p>Thunderheads build as the herd comes through — a quarter-million wildebeest, dust to the clouds, ground moving under the vehicle.</p></>
  ) },
  { id: "baobab", dark: true, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 8, copy: (
    <><span className="wl-idx wl-light">— 04 · last light</span><h2 className="wl-hl">The Baobab</h2>
      <p className="wl-pl">One tree has stood here eight centuries. We park beneath it and let the sky finish the day for us — no schedule, no rush back.</p></>
  ) },
];

const ARC = [
  { t: "05:40", n: "Acacia Dawn", s: "Mist burns off the grass while a giraffe browses alone against the light." },
  { t: "09:30", n: "The Waterhole", s: "Zebra and elephant share one still mirror of water before the heat sets in." },
  { t: "13:00", n: "The Migration", s: "The wildebeest line crosses the plain, dust rising to meet the storm light." },
  { t: "18:20", n: "The Baobab", s: "We park beneath eight centuries of shade and let the sky close the day." },
];

const KIT = [
  ["Private Concession", "1,247 km² held under a single lease — no other operator's vehicles, ever, on our roads."],
  ["Naturalist–Tracker Pairs", "Every vehicle carries a guide and a Maa-speaking tracker, radioing the herd's position hour by hour."],
  ["Ground-Level Hides", "Floating hides at the waterline put the camera at eye height with the elephant, not above it."],
  ["Star-Bed Camps", "Canvas walls roll back completely. You sleep to the sound of the migration, not a fence."],
];

const CHAPTERS: [string, string, string][] = [
  ["s1-bg", "01 · Acacia Dawn", "Giraffe browsing the mist line as the sun clears the escarpment."],
  ["s2-bg", "02 · The Waterhole", "Elephant, zebra and giraffe share one still mirror of water."],
  ["s3-bg", "03 · The Migration", "A quarter-million wildebeest cross under a building storm."],
  ["s4-bg", "04 · The Baobab", "Eight centuries of shade, and the last colour of the day."],
];

export function Wilds() {
  return (
    <div className="wl">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" />
      <header className="wl-nav">
        <span className="wl-brand">VELDLIGHT</span>
        <nav>
          <a href="#day">The day</a>
          <a href="#chapters">Chapters</a>
          <a href="#camp">Camp</a>
          <a href="#camp" className="wl-nav-cta">Reserve your day</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="the day unfolds ↓" />

      {/* STATS — SIGNATURE: oversized safari numbers, dominant, right after the reel */}
      <section className="wl-stats" id="numbers">
        <span className="wl-kick">The day, by the numbers</span>
        <div className="wl-stats-grid">
          {[["1,247 km²", "private concession — no other operator's vehicles, ever"],
            ["250,000+", "wildebeest crossing the plain, every single year"],
            ["6", "guests per vehicle, max — nobody shooting over your shoulder"],
            ["14 hrs", "of guided golden light, gate to gate, one long day"]].map(([n, l], i) => (
            <div className="wl-stat" key={i}><b>{n}</b><span>{l}</span></div>
          ))}
        </div>
      </section>

      {/* MARQUEE — running strip of the world's cast (block tidewell + neighbours lack) */}
      <section className="wl-marquee" aria-hidden>
        <div className="wl-marquee-track">
          <span>GIRAFFE&nbsp; · &nbsp;ZEBRA&nbsp; · &nbsp;ELEPHANT&nbsp; · &nbsp;WILDEBEEST&nbsp; · &nbsp;SECRETARY BIRD&nbsp; · &nbsp;BAOBAB&nbsp; · &nbsp;ACACIA&nbsp; · &nbsp;DUST&nbsp; · &nbsp;GOLD&nbsp; · &nbsp;</span>
          <span>GIRAFFE&nbsp; · &nbsp;ZEBRA&nbsp; · &nbsp;ELEPHANT&nbsp; · &nbsp;WILDEBEEST&nbsp; · &nbsp;SECRETARY BIRD&nbsp; · &nbsp;BAOBAB&nbsp; · &nbsp;ACACIA&nbsp; · &nbsp;DUST&nbsp; · &nbsp;GOLD&nbsp; · &nbsp;</span>
        </div>
      </section>

      {/* BIG-TYPE — one theatre-of-life thesis line */}
      <section className="wl-big">
        <p>Nothing here hides from the light. <em>Every hour puts something new on stage</em> under one enormous sky.</p>
      </section>

      {/* DAY ARC — signature-adjacent horizontal sun-path timeline (unique gauge, not a step-list) */}
      <section className="wl-arc" id="day">
        <div className="wl-arc-head"><span className="wl-kick">Dawn to dusk, on the ground</span><h2>One Day, Four Skies</h2></div>
        <svg className="wl-arc-path" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden focusable="false">
          <defs>
            <linearGradient id="wlArcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d9a94a" />
              <stop offset="38%" stopColor="#3a5a3a" />
              <stop offset="62%" stopColor="#c85a2a" />
              <stop offset="100%" stopColor="#7a5a3a" />
            </linearGradient>
          </defs>
          <path d="M60,190 Q600,-40 1140,190" fill="none" stroke="url(#wlArcGrad)" strokeWidth="2" strokeDasharray="1 11" strokeLinecap="round" />
          {[[168, 149], [492, 80], [708, 80], [1032, 149]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" className="wl-arc-sun" />
          ))}
        </svg>
        <div className="wl-arc-grid">
          {ARC.map((w, i) => (
            <div className="wl-arc-way" key={i}><span className="wl-arc-t">{w.t}</span><h3>{w.n}</h3><p>{w.s}</p></div>
          ))}
        </div>
      </section>

      {/* FEATURE-CARDS — capabilities handled for the guest */}
      <section className="wl-kit" id="kit">
        <div className="wl-kit-head"><span className="wl-kick">What the concession gives you</span><h2>Built For the Long Light</h2></div>
        <div className="wl-kit-grid">
          {KIT.map(([t, s], i) => (
            <div className="wl-kit-card" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* GALLERY — four bg-plates as chapters (block tidewell lacks) */}
      <section className="wl-gallery" id="chapters">
        <div className="wl-gallery-head"><span className="wl-kick">One day, four chapters</span><h2>Four Chapters of Light</h2></div>
        <div className="wl-gallery-grid">
          {CHAPTERS.map(([img, t, s], i) => (
            <div className="wl-gallery-tile" key={i} style={{ backgroundImage: `url(${A}/${img}.webp)` }}>
              <div className="wl-gallery-veil" aria-hidden />
              <span className="wl-gallery-t">{t}</span><span className="wl-gallery-s">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — method credibility */}
      <section className="wl-split">
        <div className="wl-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="wl-split-copy">
          <span className="wl-kick">Scouted before you arrive</span>
          <h2>We track the herd before we find you a seat.</h2>
          <p>Every vehicle radios into a live network of six trackers moving the concession all day. You are never driving in blind — the seat you get was chosen an hour before you climbed in.</p>
          <a href="#chapters" className="wl-link">See the chapters →</a>
        </div>
      </section>

      {/* QUOTE */}
      <section className="wl-quote">
        <blockquote>&ldquo;We watched the crossing from ground height, dust in our teeth, and I have never felt smaller or more awake in my life.&rdquo;</blockquote>
        <cite>— Priya N., photographer · third safari</cite>
      </section>

      {/* DEAL — three-tier pricing (block tidewell + neighbours lack as a single card) */}
      <section className="wl-deal" id="camp">
        <div className="wl-deal-head"><span className="wl-kick">Choose your day</span><h2>The Concession, Your Way</h2></div>
        <div className="wl-deal-grid">
          <div className="wl-deal-card">
            <h3>Dawn &amp; Dusk</h3>
            <div className="wl-price"><b>$420</b><span>/ guest</span></div>
            <p>Two gate-to-gate drives, golden hours only. Built for a short stopover between camps.</p>
            <a href="#" className="wl-ghost-btn">Reserve dawn &amp; dusk</a>
          </div>
          <div className="wl-deal-card wl-deal-featured">
            <span className="wl-deal-tag">Most booked</span>
            <h3>The Full Day</h3>
            <div className="wl-price"><b>$980</b><span>/ guest</span></div>
            <p>Fourteen hours, one vehicle, six guests max — the acacia line at dawn to the last light on the baobab.</p>
            <a href="#" className="wl-btn">Reserve your day</a>
          </div>
          <div className="wl-deal-card">
            <h3>Private Concession</h3>
            <div className="wl-price"><b>$2,400</b><span>/ vehicle</span></div>
            <p>Your own vehicle and guide for the full day, your own party only — no strangers aboard.</p>
            <a href="#" className="wl-ghost-btn">Reserve the vehicle</a>
          </div>
        </div>
        <span className="wl-note">Confirmed within 24 hours · Free to reschedule for weather</span>
      </section>

      {/* CLIMAX */}
      <section className="wl-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="wl-climax-veil" aria-hidden />
        <div className="wl-climax-copy"><h2>The light won&apos;t wait. <em>Neither should you.</em></h2><a href="#camp" className="wl-btn">Reserve your day</a></div>
      </section>

      <footer className="wl-foot"><span className="wl-brand">VELDLIGHT</span><span>Photographic safaris across the Great Rift · One long day, start to end.</span></footer>
    </div>
  );
}
