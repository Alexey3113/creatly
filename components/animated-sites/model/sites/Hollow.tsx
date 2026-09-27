"use client";
/* HOLLOW — «lantern-led night walks into a forest that lights itself». Мир: сумеречная чаща →
   светящаяся грибная роща → рогатый лесной дух → рассветная поляна. Собран на общем движке <Reel/>;
   лендинг и типографика — свои (DM Serif Display × Space Grotesk, палитра deep-moss/bio-teal/glow/violet + mint CTA).
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): фонарь странника — тёплая точка почти в постоянной позиции экрана,
   лес меняется вокруг неё. Свет фонаря сжимается в точку и раскрывает следующую поляну (iris-портал),
   роща пролетает мимо камеры, рассвет проходит лучом. В лендинге фонарь становится прожектором:
   проявляет блоки, а поляна духа видна только там, куда падает его свет. Рассвет в конце — по-настоящему светлый. */
import { useEffect, useRef, useState } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, clamp01 } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./hollow.css";

const A = "/uploads/1/animated/hollow";
/* точка фонаря в кадре hero (% экрана; вырезка странника уведена в правую треть CSS-ом) */
const LAMP = { x: 66.6, y: 72.4 };

const scenes: ReelScene[] = [
  {
    id: "thicket", dark: true, len: 1.1, hold: 0.5, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
      <>
        <span className="hl-eyebrow">Guided night walks, after dark</span>
        <h1>Walk into<br /><em>the glow.</em></h1>
        <p>A lantern-lit path through a forest that lights itself — moss, spore, and a spirit older than the trees. Nothing down there is waiting to hurt you.</p>
        <div className="hl-cta"><a href="#book" className="hl-btn">Book a lantern walk</a><a href="#rules" className="hl-ghost">Read the rules of the wood →</a></div>
      </>
    ),
  },
  {
    id: "grove", dark: true, into: "portal", portal: { x: LAMP.x + 0.6, y: LAMP.y - 1.6 }, spark: 9, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
      <>
        <span className="hl-idx">— 02 · the grove</span>
        <h2>Spore Grove</h2>
        <p>Where the mushrooms breathe cold teal light and the pool holds it still enough to touch. You&rsquo;ll be told, gently, not to.</p>
      </>
    ),
  },
  {
    id: "spirit", dark: true, into: "flythrough", len: 1.25, hold: 0.55, spark: 8, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="hl-freeze"><b>Hold still.</b><span>it has already seen your light</span></div>), copy: (
      <>
        <span className="hl-idx hl-light">— 03 · the clearing</span>
        <h2 className="hl-hl">The Warden</h2>
        <p className="hl-pl">Something tall and gentle waits where the trees lean in. It has never once frightened a soul who came with a lantern lit and a quiet mouth.</p>
      </>
    ),
  },
  {
    id: "dawnwood", into: "sweep", tint: "#ffe3a6", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
      <>
        <span className="hl-idx">— 04 · dawnwood</span>
        <h2>The Way Out</h2>
        <p>The glow thins into dew and birdsong. You leave the way you came, and somehow lighter than you walked in.</p>
      </>
    ),
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Threshold", "Meet your guide at the treeline as the light goes. A lantern is issued, the rules are said aloud once, and your eyes are given ten minutes to forget the sun."],
  ["02", "Descent", "The thicket path in true dark — roots, ferns, the first cold-blue flicker off a trunk. Eyes adjust. The moss, somehow, starts to answer."],
  ["03", "The Grove", "You kneel at the ring of glowing fungi. Spores lift off the pool like slow embers. Nobody talks much here. Nobody wants to."],
  ["04", "The Clearing", "If the wood is quiet enough that night, it comes. Guides won't promise it. Guides have also never had a group leave disappointed."],
];

const FEATURES: [string, string, string][] = [
  ["The Lantern Walk", "2 hrs · groups of 8", "The full four-chapter route — thicket to dawnwood — with a guide who's walked it several hundred times and still lowers her voice at the grove."],
  ["Spore Grove Ritual", "90 min · private, up to 2", "A grove-only evening. Wood-herb tea brewed streamside, one held silence, no lantern swung above the waist. Built for the ones chasing a feeling, not a checklist."],
  ["The Spirit Watch", "Overnight · serious folklorists", "A small vigil at the clearing's edge until first violet light. Not guaranteed. Not for the faint of patience. Extremely for everyone who's ever wanted this to be real."],
];

const RULES: [string, string][] = [
  ["Keep the lantern low and steady.", "Sudden light spooks the glow-moss into hiding for the rest of the night. Carry it at your hip, not your eyes."],
  ["Never eat what glows.", "The spore grove is for looking, not tasting — however good the tea smells. Guides carry the real, brewed kind."],
  ["Speak softly, or not at all.", "The Warden answers quiet. In twelve years it has not once answered a raised voice, and nobody's keen to test that."],
  ["Leave before the moss turns violet.", "That's the wood's way of saying goodnight. Every walk turns back at the first violet bloom, no exceptions, no lingering."],
  ["What should I bring?", "Sturdy boots and a coat past 8pm, even in July. We supply the lantern, the map, and the nerve."],
  ["Is it safe for children?", "The Lantern Walk welcomes ages 10 and up. The Spirit Watch is adults-only — it asks for a kind of patience kids haven't earned yet."],
];

/* тон навигации: на рассвете и светлом финале — чернила вместо мяты (маркеры t{i} рила считают сцену) */
function NavTone() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".hl");
    const reel = root?.querySelector<HTMLElement>(".rl-reel");
    if (!root || !reel) return;
    const marks = Array.from(reel.querySelectorAll<HTMLElement>('[data-reel-mark^="t"]'));
    let last = "";
    return subscribe(({ vh }) => {
      let tone = "dark";
      const r = reel.getBoundingClientRect();
      if (r.top <= 40 && r.bottom > 40) {
        let k = 0;
        for (const m of marks) if (m.getBoundingClientRect().top < vh / 2) k++;
        tone = scenes[Math.min(k, scenes.length - 1)].dark ? "dark" : "light";
      } else {
        root.querySelectorAll<HTMLElement>("[data-tone]").forEach((s) => {
          const b = s.getBoundingClientRect();
          if (b.top <= 40 && b.bottom > 40) tone = s.dataset.tone || "dark";
        });
      }
      if (tone !== last) { root.dataset.nav = tone; last = tone; }
    });
  }, []);
  return <span ref={ref} hidden />;
}

/* ПРАВИЛА ЛЕСА — заголовок закреплён, правила проходят мимо него */
function Rules() {
  const [open, setOpen] = useState(0);
  return (
    <section className="hl-rules" id="rules">
      <div className="hl-rules-head">
        <span className="hl-kick">Before you walk</span>
        <h2>The Rules of the Wood</h2>
        <p>Six things the wood asks of you. Half are lore, half are logistics — the wood has never much cared for the difference.</p>
      </div>
      <ol className="hl-rules-list">
        {RULES.map(([q, a], i) => (
          <li className={`hl-rule ${open === i ? "hl-rule-open" : ""}`} key={i}>
            <button className="hl-rule-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="hl-rule-n">{String(i + 1).padStart(2, "0")}</span>
              <span>{q}</span>
              <span className="hl-rule-mark" aria-hidden>{open === i ? "–" : "+"}</span>
            </button>
            <div className="hl-rule-a"><p>{a}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ПРОЖЕКТОР — поляна духа видна только там, куда падает свет фонаря (фонарь идёт по поляне от скролла) */
function Lamplit() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribe(({ vh, reduced }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = reduced ? 0.55 : clamp01((vh - r.top) / (vh + r.height));
      const x = 16 + p * 64;
      const y = 74 - Math.sin(p * Math.PI) * 30;
      el.style.setProperty("--lx", `${x.toFixed(2)}%`);
      el.style.setProperty("--ly", `${y.toFixed(2)}%`);
    });
  }, []);
  return (
    <section ref={ref} className="hl-lamplit" aria-label="By lantern only">
      <div className="hl-lamplit-plate" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
      <div className="hl-lamplit-dark" aria-hidden />
      <span className="hl-lamplit-glow" aria-hidden />
      <div className="hl-lamplit-copy">
        <span className="hl-kick">Chapter III, by lantern only</span>
        <h2>The wood only shows you <em>what your lantern touches.</em></h2>
        <p>Twelve years of walks and forty-one glowing species mapped — and not one of them lit for a torch. Carry the light low, and the clearing does the rest.</p>
      </div>
    </section>
  );
}

export function Hollow() {
  return (
    <div className="hl" data-nav="dark">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap"]} />
      <NavTone />
      <header className="hl-nav">
        <span className="hl-brand">HOLLOW</span>
        <nav>
          <a href="#walks">Walks</a>
          <a href="#rules">Rules of the wood</a>
          <a href="#book" className="hl-nav-cta">Book a lantern walk</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="go deeper ↓" />

      {/* СКВОЗНОЙ СЛОЙ: фонарь странника, споры, свет мира под лендингом */}
      <Atmosphere stops={[
        { at: ".hl-big", color: "#0a1712" }, { at: ".hl-steps", color: "#0c1d16" }, { at: ".hl-features", color: "#0e2019" },
        { at: ".hl-lamplit", color: "#050d0a" }, { at: ".hl-rules", color: "#11281f" }, { at: ".hl-quote", color: "#173029" },
        { at: ".hl-deal", color: "#22403a" }, { at: ".hl-climax", color: "#5d7a72" },
      ]} />
      <Backdrop from=".hl-big" dim={0.6} plates={[
        { at: ".hl-big", src: `${A}/s2-bg.webp` }, { at: ".hl-steps", src: `${A}/s1-bg.webp` }, { at: ".hl-features", src: `${A}/s1-bg.webp` },
        { at: ".hl-rules", src: `${A}/s2-bg.webp` }, { at: ".hl-quote", src: `${A}/s3-bg.webp` }, { at: ".hl-deal", src: `${A}/s4-bg.webp` },
      ]} />
      <Weather kind="spores" count={26} color="#8affd8" color2="#ffd98a" between={[".hl .rl-reel", ".hl-rules"]} world={0.6} zIndex={31} />
      <Actor className="hl-lamp-actor" width="15vw" zIndex={33} bob={5} tilt={0.04} stops={[
        { at: reelMark("s0"), pose: { x: LAMP.x, y: LAMP.y, s: 1, o: 1 } },
        { at: reelMark("t0"), pose: { x: LAMP.x + 0.6, y: LAMP.y - 1.6, s: 2.8, o: 1 } },
        { at: reelMark("s1"), pose: { x: 64, y: 71, s: 1.05, o: 1 } },
        { at: reelMark("t1"), pose: { x: 63, y: 70, s: 1.25, o: 1, blur: 1 } },
        { at: reelMark("a2"), pose: { x: 61, y: 66, s: 1.15, o: 1 } },
        { at: reelMark("s2"), pose: { x: 61, y: 66, s: 1.15, o: 1 } },
        { at: reelMark("h2"), pose: { x: 61, y: 66, s: 1.15, o: 1 } },
        { at: reelMark("t2"), pose: { x: 60, y: 62, s: 1.9, o: 0.55 } },
        { at: reelMark("s3"), pose: { x: 60, y: 56, s: 0.4, o: 0 } },
        { at: ".hl-big", pose: { x: 50, y: 52, s: 3.2, o: 0.5 } },
        { at: ".hl-steps-row li:nth-child(1)", anchor: 0.3, pose: { x: 12, y: 0, s: 0.9, o: 0.95, dock: true } },
        { at: ".hl-steps-row li:nth-child(4)", anchor: 0.3, pose: { x: 12, y: 0, s: 0.9, o: 0.95, dock: true } },
        { at: ".hl-features", pose: { x: 50, y: 18, s: 1.6, o: 0.6, dock: true } },
        { at: ".hl-lamplit", pose: { x: 30, y: 60, s: 0.8, o: 0 } },
        { at: ".hl-rules-head", anchor: 0.2, pose: { x: -2, y: 22, s: 0.8, o: 0.95, dock: true } },
        { at: ".hl-rules-list", anchor: 0.9, pose: { x: -6, y: 30, s: 0.8, o: 0.95 } },
        { at: ".hl-deal-card", pose: { x: 50, y: 22, s: 1.3, o: 0.8, dock: true } },
        { at: ".hl-climax", pose: { x: 50, y: 30, s: 3, o: 0 } },
      ]}><div className="hl-lamp" /></Actor>

      {/* BIG-TYPE — одна крупная мысль; фонарь стоит за словом */}
      <section className="hl-big">
        <p>The wood was never dark.<br /><em>You</em> just hadn&rsquo;t lit your lantern yet.</p>
      </section>

      {/* STEPS — как проходит поход; фонарь проходит по главам */}
      <section className="hl-steps" id="walks">
        <div className="hl-steps-head"><span className="hl-kick">How a walk unfolds</span><h2>Four chapters, one lantern.</h2></div>
        <ol className="hl-steps-row">
          {STEPS.map(([n, t, s]) => (
            <li key={n}><span className="hl-steps-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS — три формата похода */}
      <section className="hl-features">
        <div className="hl-features-head"><span className="hl-kick">Three ways into the wood</span><h2>Pick your depth.</h2></div>
        <div className="hl-features-grid">
          {FEATURES.map(([t, meta, s]) => (
            <div className="hl-feature" key={t}>
              <span className="hl-feature-meta">{meta}</span>
              <h3>{t}</h3>
              <p>{s}</p>
              <a href="#book" className="hl-feature-link">Reserve →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ПРОЖЕКТОР — вместо ряда из 4 плит и полосы цифр */}
      <Lamplit />

      {/* SIGNATURE — «The Rules of the Wood», закреплённый заголовок */}
      <Rules />

      {/* QUOTE */}
      <section className="hl-quote">
        <blockquote>&ldquo;We were told a forest spirit doesn&rsquo;t sound real until you&rsquo;re standing in front of one, holding a lantern, absolutely certain <em>it&rsquo;s looking back</em>.&rdquo;</blockquote>
        <cite>— Priya N., first-time walker · the November grove</cite>
      </section>

      {/* DEAL */}
      <section className="hl-deal" id="book">
        <div className="hl-deal-card">
          <span className="hl-kick">The Lantern Walk</span>
          <div className="hl-price"><b>$68</b><span>/ walker · lantern, guide &amp; the whole route</span></div>
          <p>Two hours, four chapters, eight walkers to a lantern at most. We hand you a lit lantern at the treeline and walk you home again after the grove, the clearing, and whatever else is out that night.</p>
          <a href="#" className="hl-btn">Reserve a night</a>
          <span className="hl-note">Free to reschedule · Cancelled on bright moons, refunded in full</span>
        </div>
      </section>

      {/* CLIMAX — настоящий рассвет: конец дуги ночь → свет */}
      <section className="hl-climax" data-tone="light" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hl-climax-veil" aria-hidden />
        <div className="hl-climax-copy">
          <h2>The dark has kept <em>a light on for you.</em></h2>
          <a href="#book" className="hl-btn">Book a lantern walk</a>
        </div>
      </section>

      <footer className="hl-foot">
        <span className="hl-brand">HOLLOW</span>
        <span>Guided night walks · The dark glows back</span>
      </footer>
    </div>
  );
}
