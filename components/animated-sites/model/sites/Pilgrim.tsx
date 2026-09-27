"use client";
/* PILGRIM — «LUNGTA». Мир: гималайское восхождение как молитва — каменистая долина на рассвете,
   мост из флажков над ущельем, бело-бордовый монастырь на скале, снежная вершина над облаками.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   шрифт-пейринг Italiana × Public Sans, палитра stone/maroon-robe/gold/snow-blue + gold CTA).
   Lungta («конь ветра») — тибетское слово, напечатанное на молитвенных флажках: сквозной мотив —
   цепочка флажков, поднимающаяся всё выше, от долины до вершины. */
import { Reel, type ReelScene } from "../reel";
import "./pilgrim.css";

const A = "/uploads/1/animated/pilgrim";

const scenes: ReelScene[] = [
  { id: "valley", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <div className="pg-panel">
      <span className="pg-eyebrow">Guided Himalayan ascents · monastery-stay</span>
      <h1>Some prayers<br /><em>you have to climb.</em></h1>
      <p>Nine days on foot from a stone river valley to a summit shrine above the clouds — a flag-strung bridge, three nights inside a cliffside monastery, and thinner air with every hour.</p>
      <div className="pg-cta"><a href="#book" className="pg-btn">Join an ascent</a><a href="#climb" className="pg-ghost">See the climb ↑</a></div>
    </div>
  ) },
  { id: "bridge", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <div className="pg-panel"><span className="pg-idx">— 02 · the crossing</span><h2>The Flag Bridge</h2>
      <p>Planks and rope over a gorge the river carved in silence. Every flag tied to these lines was left by someone who crossed before you, still swinging a prayer into the wind.</p></div>
  ) },
  { id: "monastery", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <div className="pg-panel"><span className="pg-idx">— 03 · the monastery</span><h2>Sengye Gompa</h2>
      <p>Three nights behind whitewashed walls at 4,200 metres — butter lamps, low horns before dawn, and monks who have kept this exact watch on the pass for six hundred years.</p></div>
  ) },
  { id: "summit", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <div className="pg-panel"><span className="pg-idx">— 04 · the summit</span><h2>Above the Clouds</h2>
      <p>The last hour is the hardest and the shortest. Then the ridge opens, the flags snap taut in the wind, and the whole range goes gold at once.</p></div>
  ) },
];

const RHYTHM: [string, string, string][] = [
  ["05:30", "Dawn Bell", "Seated practice in the courtyard or the tent circle, before the cold has a chance to argue with you."],
  ["07:00", "The Trail", "Walking while the light is still low and gold — the coldest, clearest hours of the day, and the shortest miles feel longest."],
  ["13:00", "Tea House", "A long rest at altitude, a hot meal, and a guide's check on how your body is taking the climb."],
  ["18:30", "Evening Teaching", "A talk from the resident monk, or simply silence — candlelight, thin air, and nowhere else to be."],
];

const CLIMB: [string, string, string, string][] = [
  ["2,600 m", "Trailhead", "Stone river valley, terraced fields, first gold on the peaks. The noise of the road stops here.", "#8a8a7a"],
  ["3,450 m", "The Flag Bridge", "Rope and plank over the gorge — you cross with a thousand flags left by pilgrims before you.", "#8a2f2a"],
  ["4,200 m", "Sengye Gompa", "Three nights behind whitewashed walls. Butter lamps, low horns before dawn, air thin enough to taste.", "#d9b46a"],
  ["4,850 m", "The Last Spring", "The final water before the trail turns to scree and snow. Fill everything here — there is no more after this.", "#cfe0e6"],
  ["5,400 m", "The Summit Cairn", "Flags snap taut in the wind. The whole range goes gold at once, and you stop needing words for it.", "#ffb84a"],
];

const KIT: [string, string][] = [
  ["Permits & Logistics", "Every checkpoint, park fee and monastery permission arranged before you land — nothing to queue for on the trail."],
  ["Monastery Stay", "Three confirmed nights inside Sengye Gompa itself, not a guesthouse nearby — meals, cell and morning practice included."],
  ["Guide Lineage", "Local guides born within a day's walk of the pass, trained in altitude protocol and trusted by the monastery for two decades."],
  ["Altitude Support", "Daily oxygen-saturation checks, a built-in acclimatization day at 4,200 m, and a turn-back call that is never yours alone to make."],
];

const DAYS: [string, string, string][] = [
  ["s1-bg", "Valley", "Terraced fields and first light under immense stone peaks"],
  ["s2-bg", "Bridge", "A flag-strung crossing over the gorge, wind and rope"],
  ["s3-bg", "Monastery", "White-and-maroon walls at altitude, gold roofs, prayer wheels"],
  ["s4-bg", "Summit", "A sea of cloud below, blazing dawn gold on snow"],
];

const FAQ: [string, string][] = [
  ["Do I need mountaineering experience?", "No technical climbing — steady trail fitness and the willingness to walk slowly are enough. The bridge and summit ridge are exposed but unroped and guide-assisted the whole way."],
  ["How does the altitude work?", "We build one full acclimatization day into the monastery stay at 4,200 m before the final push. Every group carries oxygen and a guide trained to call the turn-back before it's an emergency."],
  ["Is the monastery stay religious or optional?", "Sengye Gompa welcomes travelers of any belief. Morning practice is offered, never required — plenty of guests simply sit in the courtyard with tea and watch the light change."],
  ["What's the group size?", "Eight pilgrims maximum per ascent, one guide for every three — small enough that the monastery still feels quiet when you arrive."],
];

export function Pilgrim() {
  return (
    <div className="pg">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Italiana&family=Public+Sans:wght@400;500;600;700;800&display=swap" />

      <header className="pg-nav">
        <span className="pg-brand">LUNGTA</span>
        <nav>
          <a href="#rhythm">The Rhythm</a>
          <a href="#climb">The Climb</a>
          <a href="#stay">The Stay</a>
          <a href="#book" className="pg-nav-cta">Join an ascent</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="ascend ↓" />

      {/* STEPS/PROCESS — daily rhythm of the trek (immersion; block tidewell lacks) */}
      <section className="pg-rhythm" id="rhythm">
        <div className="pg-head"><span className="pg-kick">Nine days, one rhythm</span><h2>How a Day on Lungta Runs</h2></div>
        <ol className="pg-steps">
          {RHYTHM.map(([t, title, s], i) => (
            <li className="pg-step" key={i}><span className="pg-step-t">{t}</span><h3>{title}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* BIG-TYPE MANIFESTO — one crushing line, flag-rope decoration (motif, distinct from tidewell's plain manifesto) */}
      <section className="pg-manifest">
        <span className="pg-flagline" aria-hidden />
        <p>The mountain does not care if you believe.<br /><em>It only cares if you keep climbing.</em></p>
        <span className="pg-flagline" aria-hidden />
      </section>

      {/* SIGNATURE — VERTICAL ALTITUDE TIMELINE climbing a prayer-flag spine */}
      <section className="pg-climb-wrap" id="climb">
        <div className="pg-head"><span className="pg-kick">The line, metre by metre</span><h2>Five Altitudes, One Ascent.</h2></div>
        <ol className="pg-climb">
          {CLIMB.map(([alt, title, s, color], i) => (
            <li className="pg-climb-row" key={i}>
              <span className="pg-flag" style={{ color }} aria-hidden />
              <span className="pg-alt">{alt}</span>
              <div><h3>{title}</h3><p>{s}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — what's handled (block tidewell lacks) */}
      <section className="pg-kit">
        <div className="pg-head"><span className="pg-kick">Nothing to arrange yourself</span><h2>What&rsquo;s Carried For You</h2></div>
        <div className="pg-kit-grid">
          {KIT.map(([t, s], i) => (
            <div className="pg-kit-card" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase frame + method */}
      <section className="pg-split">
        <div className="pg-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="pg-split-copy">
          <span className="pg-kick">Why Lungta</span>
          <h2>We Don&rsquo;t Rent a Room Near the Monastery. We Stay Inside It.</h2>
          <p>Most treks pass Sengye Gompa on the way to somewhere else. Ours stops there for three nights, on terms the monastery itself set — a relationship built over eleven seasons, not a booking made last week.</p>
          <a href="#stay" className="pg-link">Read the arrangement →</a>
        </div>
      </section>

      {/* GALLERY — four bg-plates as chapters (new type vs tidewell) */}
      <section className="pg-gallery" id="stay">
        <div className="pg-head"><span className="pg-kick">One trail, four altitudes</span><h2>Four Days, Four Skies</h2></div>
        <div className="pg-gallery-grid">
          {DAYS.map(([img, t, s], i) => (
            <div className="pg-gallery-tile" key={i} style={{ backgroundImage: `url(${A}/${img}.webp)` }}>
              <div className="pg-gallery-veil" aria-hidden />
              <span className="pg-gallery-t">{t}</span><span className="pg-gallery-s">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE — running motif line */}
      <section className="pg-marquee" aria-hidden="true">
        <div className="pg-marquee-track">
          <span>LUNGTA — WIND HORSE — NINE DAYS — EIGHT PILGRIMS, MAX — SENGYE GOMPA — </span>
          <span>LUNGTA — WIND HORSE — NINE DAYS — EIGHT PILGRIMS, MAX — SENGYE GOMPA — </span>
        </div>
      </section>

      {/* STATS */}
      <section className="pg-stats">
        {[["2,800 m", "gained, valley to summit"], ["3", "nights inside the monastery"], ["8", "pilgrims per ascent, max"], ["20", "years the guide lineage has walked it"]].map(([n, l], i) => (
          <div className="pg-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="pg-quote">
        <blockquote>&ldquo;I have trekked for a decade and never stayed anywhere like Sengye Gompa. It stopped feeling like an itinerary and started feeling like <em>being let in on something.</em>&rdquo;</blockquote>
        <cite>— Naomi K., pilgrim · third ascent</cite>
      </section>

      {/* FAQ / ACCORDION */}
      <section className="pg-faq">
        <div className="pg-head"><span className="pg-kick">Before you book</span><h2>Pilgrims Ask</h2></div>
        <div className="pg-faq-list">
          {FAQ.map(([q, a], i) => (
            <details className="pg-faq-item" key={i}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="pg-deal" id="book">
        <div className="pg-deal-card">
          <span className="pg-kick">The nine-day ascent</span>
          <div className="pg-price"><b>$3,180</b><span>/ pilgrim · guide, permits, gompa stay &amp; the whole line up</span></div>
          <p>Trailhead to summit and back, three nights inside the monastery, all permits and altitude support handled. Reserve a window and we send the illustrated route plan.</p>
          <a href="#" className="pg-btn">Reserve your ascent</a>
          <span className="pg-note">Season: April–June &amp; September–November · Full kit list provided</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="pg-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="pg-climax-veil" aria-hidden />
        <div className="pg-climax-copy"><h2>The summit is <em>nine days</em> away.</h2><a href="#book" className="pg-btn">Join an ascent</a></div>
      </section>

      <footer className="pg-foot"><span className="pg-brand">LUNGTA</span><span>Guided Himalayan ascents &amp; monastery stays · The mountain, one flag higher</span></footer>
    </div>
  );
}
