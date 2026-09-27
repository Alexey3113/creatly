"use client";
/* WILLOW — «a slow Louisiana bayou in warm haze». Мир: кипарисовое болото на рассвете →
   туманный канал → ночь светлячков → рассветная дельта. Сквозной мотив — свисающий испанский
   мох, обрамляющий каждую сцену, и шест лодки, уходящей глубже в туман. Палитра moss/gold-fog/
   teal-water/dusk-violet + firefly-gold CTA. Собран на общем движке <Reel/>; свой шрифт-пейринг
   Playfair Display × Epilogue — южная, теплая, душевная героика вместо холодной элегантности. */
import { Reel, type ReelScene } from "../reel";
import "./willow.css";

const A = "/uploads/1/animated/willow";

const scenes: ReelScene[] = [
  { id: "cypress", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ww-eyebrow">Bayou floats &amp; backwater stays</span>
      <h1>Slow down<br /><em>to bayou time.</em></h1>
      <p>A poled flat-boat through cypress and hanging moss, one hour at a time — from cold gold dawn to the hour the fireflies come up.</p>
      <div className="ww-cta"><a href="#book" className="ww-btn">Book a float</a><a href="#floats" className="ww-ghost">See the route →</a></div>
    </>
  ) },
  { id: "channel", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ww-idx">— 02 · the long hush</span><h2>Into the Hush</h2>
      <p>The channel narrows, the moss closes overhead, and the whole bayou goes quiet enough to hear your own pole in the water.</p></>
  ) },
  { id: "fireflies", dark: true, spark: 9, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="ww-idx ww-light">— 03 · firefly hour</span><h2 className="ww-hl">Ten Thousand Small Lights</h2>
      <p className="ww-pl">Every June the channel fills with fireflies, doubled in the black water. There's no motor to cut — we just drift through it, lantern low.</p></>
  ) },
  { id: "delta", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="ww-idx">— 04 · the open water</span><h2>Where the Bayou Opens</h2>
      <p>Moss gives way to sky. The cabin lights come up pink on the delta, and somebody on the porch is already tuning a fiddle.</p></>
  ) },
];

const STEPS = [
  ["01", "Meet at the Landing", "Coffee, a life vest, and five minutes on how a pole beats a paddle. We leave when the mist is still sitting on the water."],
  ["02", "Pole into the Hush", "Your guide poles standing, bayou-style — no motor, no wake, close enough to touch the moss as it passes."],
  ["03", "Drift the Firefly Hour", "On evening floats we glide through the cypress right as the fireflies come up. Nobody talks much through this part."],
  ["04", "Come In on the Porch", "Every float ends at the lodge dock. There's usually a fiddle going, and always a second cup of coffee."],
];

const WAYS = [
  { name: "The Float", meta: "2 hrs · 4 guests · guided", body: "A guided pole through cypress, hush channel and open delta. Binoculars and a thermos of chicory coffee, both included." },
  { name: "The Cabin", meta: "1–3 nights · stilt-built", body: "A screened porch over the water, propane lamp only, no road noise for six miles. Wake to herons instead of an alarm." },
  { name: "The Session", meta: "Fridays · porch, live", body: "Local fiddlers, a washboard, whoever brought a harmonica that week. Guests welcome at the rail, gumbo included." },
];

const HOURS = [
  { img: `${A}/s1-bg.webp`, name: "Dawn", note: "Cypress, gold mist" },
  { img: `${A}/s2-bg.webp`, name: "The Hush", note: "Channel, closed canopy" },
  { img: `${A}/s3-bg.webp`, name: "Firefly Hour", note: "Night, ten thousand sparks" },
  { img: `${A}/s4-bg.webp`, name: "First Light", note: "Delta, open sky" },
];

const STATS: [string, string][] = [
  ["40 yrs", "cypress lease held, motor-free the whole time"],
  ["4", "guests to a boat, guide always included"],
  ["112", "bird species logged on this stretch this year"],
  ["1", "pole, no engine, ever"],
];

const CHORUS = [
  ["Idella M.", "porch fiddler, 30 years", "I've played these tunes since I was nine. Out here the moss still keeps the same time I do."],
  ["Boone R.", "guide, eleven seasons", "Folks book for the boat ride. They leave asking me about the herons instead."],
  ["Corinne D.", "first-time guest", "I didn't know quiet could be this loud. I mean that as the nicest thing I can say."],
  ["Pop Aldous", "cabin no. 3, every June since '04", "Come back every June like clockwork. Swear the fireflies remember me by now."],
  ["Wyn T.", "river biologist", "Cleanest cypress stand left on this stretch of water. We've measured it every year — it's holding."],
  ["Ruthann K.", "Friday regular", "Bring a harmonica if you've got one. Somebody always does, and it always turns into a night."],
];

function MossFringe() {
  return (
    <svg className="ww-fringe" viewBox="0 0 120 18" aria-hidden focusable="false">
      <path d="M0 0 Q6 14 12 3 Q18 15 24 2 Q30 14 36 3 Q42 15 48 2 Q54 14 60 3 Q66 15 72 2 Q78 14 84 3 Q90 15 96 2 Q102 14 108 3 Q114 15 120 2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Willow() {
  return (
    <div className="ww">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Epilogue:wght@400;500;600;700;800&display=swap" />

      <header className="ww-nav">
        <span className="ww-brand">MOSS &amp; LANTERN</span>
        <nav><a href="#floats">Floats</a><a href="#stays">Stays</a><a href="#voices">Voices</a><a href="#book" className="ww-nav-cta">Book a float</a></nav>
      </header>

      <Reel scenes={scenes} cue="drift ↓" />

      {/* STEPS/PROCESS — horizontal, opens the landing arc */}
      <section className="ww-method">
        <div className="ww-method-head"><span className="ww-kick">One boat, one pole, no motor</span><h2>How a float runs, start to porch.</h2></div>
        <ol className="ww-steps">
          {STEPS.map(([n, t, s], i) => (
            <li className="ww-step" key={i}><span className="ww-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — three offerings (block tidewell lacks) */}
      <section className="ww-ways" id="stays">
        <div className="ww-ways-head"><span className="ww-kick">Pick your bayou</span><h2>Three ways to slow down.</h2></div>
        <div className="ww-ways-grid">
          {WAYS.map((w, i) => (
            <article className="ww-way" key={i}>
              <span className="ww-way-n">0{i + 1}</span>
              <h3>{w.name}</h3>
              <span className="ww-way-meta">{w.meta}</span>
              <p>{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="ww-manifest">
        <p>Nobody out here is in a hurry. <em>The moss has been growing since before your grandmother was born</em> — it isn't starting now.</p>
      </section>

      {/* GALLERY — four hours from the scene plates (block tidewell lacks) */}
      <section className="ww-hours" id="floats">
        <div className="ww-hours-head"><MossFringe /><span className="ww-kick">The same water, four hours</span><h2>Four hours on the water.</h2></div>
        <div className="ww-hours-grid">
          {HOURS.map((h, i) => (
            <div className="ww-hour" key={i} style={{ backgroundImage: `url(${h.img})` }}>
              <div className="ww-hour-veil" aria-hidden />
              <h3>{h.name}</h3>
              <span>{h.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — the conservation / origin story */}
      <section className="ww-split">
        <div className="ww-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ww-split-copy">
          <span className="ww-kick">Why we still pole instead of motor</span>
          <h2>No engine has touched this channel in forty years.</h2>
          <p>Moss &amp; Lantern started as one family's cypress lease and a hand-built flat-boat. We still run it that way — no engines, no wake, no PA system on the water. What's left is one of the last untouched cypress stands on this stretch of river, and we mean to keep it that way for the next forty.</p>
          <a href="#voices" className="ww-link">Read what people find here →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="ww-stats">
        {STATS.map(([n, l], i) => (
          <div className="ww-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* SIGNATURE — QUOTE-CHORUS: dominant multi-voice testimonial block */}
      <section className="ww-chorus" id="voices">
        <div className="ww-chorus-head">
          <MossFringe />
          <span className="ww-kick">Not just us saying it</span>
          <h2>Voices from the water.</h2>
        </div>
        <div className="ww-chorus-grid">
          {CHORUS.map(([name, role, line], i) => (
            <figure className="ww-voice" key={i} data-n={i + 1}>
              <blockquote>“{line}”</blockquote>
              <figcaption><b>{name}</b><span>{role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* MARQUEE — folk-song titles, unique texture block */}
      <div className="ww-marquee" aria-hidden>
        <div className="ww-marquee-track">
          <span>CYPRESS WALTZ&nbsp;&nbsp;·&nbsp;&nbsp;FIREFLY REEL&nbsp;&nbsp;·&nbsp;&nbsp;MOSSBACK BLUES&nbsp;&nbsp;·&nbsp;&nbsp;DELTA HYMN&nbsp;&nbsp;·&nbsp;&nbsp;POLE &amp; DRIFT&nbsp;&nbsp;·&nbsp;&nbsp;LOW WATER RAG&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span>CYPRESS WALTZ&nbsp;&nbsp;·&nbsp;&nbsp;FIREFLY REEL&nbsp;&nbsp;·&nbsp;&nbsp;MOSSBACK BLUES&nbsp;&nbsp;·&nbsp;&nbsp;DELTA HYMN&nbsp;&nbsp;·&nbsp;&nbsp;POLE &amp; DRIFT&nbsp;&nbsp;·&nbsp;&nbsp;LOW WATER RAG&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* PRICING/DEAL — three tiers */}
      <section className="ww-deal" id="book">
        <div className="ww-deal-head"><span className="ww-kick">Come sit a while</span><h2>Come sit a while.</h2></div>
        <div className="ww-deal-grid">
          <div className="ww-deal-card">
            <h3>The Float</h3>
            <div className="ww-price"><b>$85</b><span>/ guest</span></div>
            <p>Two hours, cypress to delta, coffee included.</p>
            <a href="#" className="ww-ghost">Reserve →</a>
          </div>
          <div className="ww-deal-card ww-deal-hi">
            <span className="ww-deal-tag">Most booked</span>
            <h3>The Firefly Float</h3>
            <div className="ww-price"><b>$110</b><span>/ guest</span></div>
            <p>The evening run, lantern-lit, ten thousand small lights.</p>
            <a href="#" className="ww-btn">Reserve →</a>
          </div>
          <div className="ww-deal-card">
            <h3>Cabin &amp; Session Weekend</h3>
            <div className="ww-price"><b>$420</b><span>/ two guests</span></div>
            <p>Two nights on the water, Friday porch session included.</p>
            <a href="#" className="ww-ghost">Reserve →</a>
          </div>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ww-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="ww-climax-veil" aria-hidden />
        <div className="ww-climax-copy"><h2>The fireflies are <em>already out.</em></h2><a href="#book" className="ww-btn">Book a float</a></div>
      </section>

      <footer className="ww-foot"><span className="ww-brand">MOSS &amp; LANTERN</span><span>Bayou floats, cypress cabins &amp; porch sessions · Poled, not motored</span></footer>
    </div>
  );
}
