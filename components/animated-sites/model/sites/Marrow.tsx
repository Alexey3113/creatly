"use client";
/* MARROW — «guided descents into living rock». Мир: спуск в кристальные пещеры —
   устье → аметистовый зал → светящаяся река → кафедральный свод. Все сцены тёмные:
   обсидиан/аметист/тил-вода/золотая жила, фиолетовый CTA. Сквозной мотив — тёплый
   фонарь исследователя, единственный тёплый свет среди холодного минерального сияния.
   Собран на общем движке <Reel/>; свой шрифт-пейринг Bodoni Moda × Hanken Grotesk. */
import { Reel, type ReelScene } from "../reel";
import "./marrow.css";

const A = "/uploads/1/animated/marrow";

const scenes: ReelScene[] = [
  { id: "mouth", dark: true, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="mw-eyebrow">Guided descents into living rock</span>
      <h1>Go down<br /><em>into the marrow.</em></h1>
      <p>Four painted chambers, one lantern-lit line — obsidian mouth to a gold-veined cathedral. Every metre is mapped before you take a single step down.</p>
      <div className="mw-cta"><a href="#book" className="mw-btn">Reserve a lantern</a><a href="#routes" className="mw-ghost">See the route ↓</a></div>
    </>
  ) },
  { id: "crystal", dark: true, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, spark: 6, copy: (
    <><span className="mw-idx">— 02 · the violet hall</span><h2>The Amethyst Hall</h2>
      <p>Three hundred and forty million years of pressure, standing as glass. Your lantern is the only warmth this crystal has ever known.</p></>
  ) },
  { id: "river", dark: true, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 5, copy: (
    <><span className="mw-idx">— 03 · the glow current</span><h2>The Glass River</h2>
      <p>A teal current older than the passage above it, moving without sound. You cross on a ledge worn smooth by every guide before you.</p></>
  ) },
  { id: "cathedral", dark: true, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 7, copy: (
    <><span className="mw-idx">— 04 · the deep nave</span><h2>The Cathedral Floor</h2>
      <p>Gold veins climb into a dark you cannot see the top of. Stand still. This is the point of the whole descent.</p></>
  ) },
];

const ROUTES = [
  { name: "The Threshold Line", meta: "40 m · 90 min · Easy", body: "A short, well-lit walk to the edge of the Amethyst Hall. Built for first-timers and families of six and up." },
  { name: "The Violet Line", meta: "110 m · 3 hrs · Moderate", body: "Through the crystal hall and along the glass river ledge. Our most-booked descent — the one people describe for years." },
  { name: "The Deep Line", meta: "212 m · 5 hrs · Advanced", body: "The full marrow, mouth to cathedral floor. Small groups only, led by our senior geologist-guides." },
];

const STEPS = [
  ["01", "Fit & Brief", "Helmets, harnesses and lanterns are lit and checked at the mouth. We walk the whole route on paper first."],
  ["02", "Enter the Mouth", "Daylight narrows to a single shaft, then disappears. Your eyes adjust; your voice drops on its own."],
  ["03", "Cross the Hall & River", "The amethyst catches your lantern first, then the glass river underneath it. We stop often — there is no rush down here."],
  ["04", "Reach the Nave", "The cathedral floor, gold veins overhead, silence you can hear. Then the long, easy climb back to daylight."],
];

const CHAMBERS = [
  { img: `${A}/s1-bg.webp`, name: "The Mouth", depth: "0 m" },
  { img: `${A}/s2-bg.webp`, name: "The Amethyst Hall", depth: "≈70 m" },
  { img: `${A}/s3-bg.webp`, name: "The Glass River", depth: "≈150 m" },
  { img: `${A}/s4-bg.webp`, name: "The Cathedral Floor", depth: "212 m" },
];

const FAQ = [
  ["Is it safe if I'm claustrophobic?", "The Threshold and Violet Lines stay in halls over 8 metres wide — no squeezes. The Deep Line has two narrow points, clearly marked ahead of time."],
  ["What fitness level do I need?", "If you can climb four flights of stairs without stopping, you can do the Violet Line. The Deep Line asks for a little more."],
  ["How cold is it down there?", "A steady 11°C year-round. We provide thermal layers — bring closed shoes."],
  ["What's the minimum age?", "Eight for the Threshold Line, twelve for the Violet Line, sixteen for the Deep Line."],
];

export function Marrow() {
  return (
    <div className="mw">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" />
      <header className="mw-nav">
        <span className="mw-brand">MARROW</span>
        <nav><a href="#routes">The lines</a><a href="#chambers">Chambers</a><a href="#faq">Before you go</a><a href="#book" className="mw-nav-cta">Reserve a lantern</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* STATS-FIRST — SIGNATURE: oversized numbers as the dominant landing feature */}
      <section className="mw-figures" id="figures">
        <div className="mw-figures-head">
          <span className="mw-kick">Marrow, measured</span>
          <h2>Numbers you can feel<br />in your chest.</h2>
        </div>
        <div className="mw-figures-grid">
          {[["212m", "the deepest point of the guided line — the Cathedral Floor"],
            ["340M", "years the Amethyst Hall took to grow, crystal by crystal"],
            ["6", "mapped chambers, each painted and rehearsed before you enter"],
            ["1:2", "lantern for every two guests — the only warm light below the mouth"]].map(([n, l], i) => (
            <div className="mw-figure" key={i}><b>{n}</b><span>{l}</span></div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mw-manifest">
        <p>Down here, dark is not empty — it is <em>volume</em>. And every metre of it holds a colour the sun has never seen.</p>
      </section>

      {/* FEATURE-CARDS — the three routes */}
      <section className="mw-routes" id="routes">
        <div className="mw-routes-head"><span className="mw-kick">Three lines into the rock</span><h2>Choose your depth.</h2></div>
        <div className="mw-routes-grid">
          {ROUTES.map((r, i) => (
            <article className="mw-route" key={i}>
              <span className="mw-route-n">0{i + 1}</span>
              <h3>{r.name}</h3>
              <span className="mw-route-meta">{r.meta}</span>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STEPS/PROCESS — horizontal */}
      <section className="mw-method" id="method">
        <div className="mw-method-head"><span className="mw-kick">How a descent runs</span><h2>Four stages, one guide, no surprises.</h2></div>
        <ol className="mw-steps">
          {STEPS.map(([n, t, s], i) => (
            <li className="mw-step" key={i}><span className="mw-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* GALLERY — chamber tiles from the four scene plates */}
      <section className="mw-chambers" id="chambers">
        <div className="mw-chambers-head"><span className="mw-kick">The four chambers</span><h2>Every stop, painted before you walk it.</h2></div>
        <div className="mw-chambers-grid">
          {CHAMBERS.map((c, i) => (
            <div className="mw-chamber" key={i} style={{ backgroundImage: `url(${c.img})` }}>
              <div className="mw-chamber-veil" aria-hidden />
              <span className="mw-chamber-depth">{c.depth}</span>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — the guiding method */}
      <section className="mw-split">
        <div className="mw-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="mw-split-copy">
          <span className="mw-kick">Why we map before we walk</span>
          <h2>Every line is painted before it's guided.</h2>
          <p>Our geologists chart each chamber, current and drop before a single guest goes down. You are never the first to find out where the path turns — we already know, and we already painted it.</p>
          <a href="#faq" className="mw-link">Read what to expect →</a>
        </div>
      </section>

      {/* MARQUEE — mineral names, unique block */}
      <div className="mw-marquee" aria-hidden>
        <div className="mw-marquee-track">
          <span>AMETHYST&nbsp;&nbsp;·&nbsp;&nbsp;CALCITE&nbsp;&nbsp;·&nbsp;&nbsp;GOLD VEIN&nbsp;&nbsp;·&nbsp;&nbsp;GYPSUM NEEDLE&nbsp;&nbsp;·&nbsp;&nbsp;OBSIDIAN&nbsp;&nbsp;·&nbsp;&nbsp;TEAL SPAR&nbsp;&nbsp;·&nbsp;&nbsp;QUARTZ&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span>AMETHYST&nbsp;&nbsp;·&nbsp;&nbsp;CALCITE&nbsp;&nbsp;·&nbsp;&nbsp;GOLD VEIN&nbsp;&nbsp;·&nbsp;&nbsp;GYPSUM NEEDLE&nbsp;&nbsp;·&nbsp;&nbsp;OBSIDIAN&nbsp;&nbsp;·&nbsp;&nbsp;TEAL SPAR&nbsp;&nbsp;·&nbsp;&nbsp;QUARTZ&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* QUOTE */}
      <section className="mw-quote">
        <blockquote>“I've caved for twenty years and never been led like this. It wasn't a tour. It was being <em>shown</em> the inside of a mountain.”</blockquote>
        <cite>— Rhea N., speleologist · Marrow Deep Line</cite>
      </section>

      {/* FAQ / ACCORDION — unique block */}
      <section className="mw-faq" id="faq">
        <div className="mw-faq-head"><span className="mw-kick">Before you go down</span><h2>What people ask us at the mouth.</h2></div>
        <div className="mw-faq-list">
          {FAQ.map(([q, a], i) => (
            <details className="mw-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="mw-deal" id="book">
        <div className="mw-deal-card">
          <span className="mw-kick">The guided descent</span>
          <div className="mw-price"><b>€180</b><span>/ guest · lantern, guide &amp; the mapped line</span></div>
          <p>Half a day underground, one full descent, every stage briefed and equipped. Reserve your line and we send the painted route in advance.</p>
          <a href="#" className="mw-btn">Reserve a lantern</a>
          <span className="mw-note">Free to reschedule · Fitness-checked, not gatekept</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="mw-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="mw-climax-veil" aria-hidden />
        <div className="mw-climax-copy"><h2>Your lantern is <em>already lit</em>.</h2><a href="#book" className="mw-btn">Book a descent</a></div>
      </section>

      <footer className="mw-foot"><span className="mw-brand">MARROW</span><span>Guided descents into living rock · Mapped before it's walked</span></footer>
    </div>
  );
}
