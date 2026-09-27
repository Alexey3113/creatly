"use client";
/* SOLSTICE — "GLØD", nordic cabin retreats. Мир: тепло против холода — путь домой сквозь синюю полярную
   сумерку к оранжевому очагу. Флэт cut-paper folk-art; шрифт-пейринг Big Shoulders Display × DM Sans.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): актёр — ОДНО тёплое окно в постоянной точке экрана, которое растёт по
   мере приближения: далеко в соснах → через озеро (стоп-кадр «−14°») → зум СКВОЗЬ окно в очаг (portal) →
   шквал уносит тепло (sweep) → окна хижины в белой мгле → в лендинге окно стоит на «тёплой» стороне и
   становится свечением CTA. Снег гаснет на тёплых секциях; рваные бумажные слои-разделители с параллаксом. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./solstice.css";

const A = "/uploads/1/animated/solstice";
const W = { x: 80, y: 37 }; // постоянная точка окна

const scenes: ReelScene[] = [
  { id: "snowforest", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="sl-eyebrow">Nordic cabin retreats</span>
      <h1>Come home<br /><em>to the fire.</em></h1>
      <p>Four days deep in spruce and frost, walking the long way back to warm. GLØD builds the whole route from cold to hearth — you just follow the light in the window.</p>
      <div className="sl-cta"><a href="#book" className="sl-btn">Book a stay</a><a href="#journey" className="sl-ghost">See the journey →</a></div>
    </>
  ) },
  { id: "lake", into: "pan", tint: "#dfe6f0", len: 1.2, hold: 0.55, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`,
    freeze: (<div className="sl-freeze"><b>−14°</b><span>the frozen mile · one lit window</span></div>), copy: (
    <><span className="sl-idx">— 02 · the crossing</span><h2>The Frozen Mile</h2>
      <p>Ice thick enough to trust, a straight line drawn across the dark, and a single window already lit gold on the far shore.</p></>
  ) },
  { id: "hearth", dark: true, into: "portal", portal: W, spark: 5, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="sl-idx sl-light">— 03 · the arrival</span><h2 className="sl-hl">The Hearth</h2>
      <p className="sl-pl">Boots by the door, kettle already singing, the cold you carried in gone from your shoulders inside a minute.</p></>
  ) },
  { id: "whiteout", into: "sweep", tint: "#f1f4fa", len: 1.1, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="sl-idx">— 04 · the clearing</span><h2>After the White</h2>
      <p>The squall lifts, the pines step back into place, and there it is — small, orange-lit, exactly where you left it.</p></>
  ) },
];

/* рваные бумажные слои с параллаксом: --p (−1…1) по мере прохода разделителя через экран */
function PaperTear({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribe(({ vh, reduced }) => {
      if (reduced) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) return;
      el.style.setProperty("--p", ((r.top + r.height / 2 - vh / 2) / vh).toFixed(4));
    });
  }, []);
  return (
    <div ref={ref} className={`sl-tear ${className}`} aria-hidden>
      <i className="sl-tear-a" /><i className="sl-tear-b" /><i className="sl-tear-c" />
    </div>
  );
}

const STEPS: [string, string, string][] = [
  ["01", "Arrival", "Off the train at the valley halt, into a waiting sled. No road runs past this point."],
  ["02", "Into the Pines", "Forty unhurried minutes on snowshoes, a guide's lantern ahead, the last signal bar gone by minute five."],
  ["03", "The Frozen Mile", "The lake's marked crossing, ice-tested every morning. Your cabin's window is the only orange thing on the horizon."],
  ["04", "The Door", "Never locked. The stove was lit an hour before you arrived, and somebody already put the kettle on."],
];

const CARDS: [string, string][] = [
  ["Hearth Suites", "A private wood stove, split and stacked before check-in. Yours to feed all night."],
  ["The Long Table", "A fire-cooked supper at dusk, seats twelve — strangers become neighbours by the second course."],
  ["Lake-Ice Sauna", "Cedar heat to blood-warm, then the frozen mile for a plunge that resets everything."],
  ["Lantern Trails", "Marked spruce paths lit through the blue hour — safe, and beautiful, to walk alone."],
];

export function Solstice() {
  return (
    <div className="sl">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"]} />

      <header className="sl-nav">
        <span className="sl-brand">GLØD</span>
        <nav>
          <a href="#journey">The journey</a>
          <a href="#cabins">The cabins</a>
          <a href="#book" className="sl-nav-cta">Book a stay</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="scroll home ↓" />

      {/* СКВОЗНОЙ СЛОЙ: сумерки ↔ очаг под лендингом, снег (гаснет в тепле), окно */}
      <Atmosphere stops={[
        { at: ".sl-manifest", color: "#1c2a3a" }, { at: ".sl-steps", color: "#1a2536" }, { at: ".sl-split", color: "#3b2416" },
        { at: ".sl-thermo", color: "#262233" }, { at: ".sl-cards", color: "#1b2a22" }, { at: ".sl-quote", color: "#2a2238" },
        { at: ".sl-deal", color: "#3a2314" }, { at: ".sl-climax", color: "#0c160f" },
      ]} />
      <Backdrop from=".sl-manifest" dim={0.5} plates={[
        { at: ".sl-manifest", src: `${A}/s2-bg.webp` }, { at: ".sl-steps", src: `${A}/s1-bg.webp` }, { at: ".sl-split", src: `${A}/s3-bg.webp`, pos: "70% 50%" },
        { at: ".sl-cards", src: `${A}/s4-bg.webp` }, { at: ".sl-deal", src: `${A}/s3-bg.webp`, pos: "75% 60%" },
      ]} />
      <Weather kind="snow" count={34} color="#f4f6fb" between={[reelMark("s0"), reelMark("s1")]} world={0.6} zIndex={31} />
      <Weather kind="snow" count={30} color="#f4f6fb" between={[reelMark("t2"), ".sl-split"]} world={0.6} zIndex={31} seed={13} />
      <Actor className="sl-window-actor" width="5vw" zIndex={32} bob={0} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 61.3, y: 83.5, s: 0.3, o: 1 } },
        { at: reelMark("t0"), pose: { x: 72, y: 58, s: 0.42, o: 1 } },
        { at: reelMark("s1"), pose: { x: W.x, y: W.y, s: 0.55, o: 1 } },
        { at: reelMark("t1"), pose: { x: W.x, y: W.y, s: 7, o: 0, blur: 8 } },
        { at: reelMark("s2"), pose: { x: 71, y: 76, s: 0.2, o: 0 } },
        { at: reelMark("t2"), pose: { x: 71, y: 76, s: 0.32, o: 0.7 } },
        { at: reelMark("s3"), pose: { x: 71, y: 75, s: 0.6, o: 1 } },
        { at: ".sl-manifest", pose: { x: 80, y: 30, s: 0.5, o: 0 } },
        { at: ".sl-thermo-warm", anchor: 0.5, pose: { x: 50, y: 42, s: 2.2, o: 1, dock: true } },
        { at: ".sl-cards", pose: { x: 80, y: 40, s: 1, o: 0 } },
        { at: ".sl-quote", pose: { x: 50, y: 60, s: 1, o: 0 } },
        { at: ".sl-deal-card", anchor: 0.5, pose: { x: 50, y: 0, s: 1.3, o: 1, dock: true } },
        { at: ".sl-climax", pose: { x: 50, y: 30, s: 2, o: 0 } },
      ]}><div className="sl-window"><i /><i /><i /><i /></div></Actor>

      {/* MANIFESTO — одна большая cut-paper мысль */}
      <section className="sl-manifest">
        <p>Winter isn&rsquo;t something to survive. <em>It&rsquo;s something to walk into</em> — on purpose, toward a door that&rsquo;s already warm.</p>
      </section>

      <PaperTear className="sl-tear-cold" />

      {/* STEPS — путь домой, билеты-передачи */}
      <section className="sl-steps" id="journey">
        <div className="sl-steps-head">
          <span className="sl-kick">How a stay begins</span>
          <h2>Four handoffs, one straight line to the fire.</h2>
        </div>
        <ol className="sl-steps-list">
          {STEPS.map(([n, t, s]) => (
            <li className="sl-steps-row" key={n}><span className="sl-steps-n">{n}</span><div><h3>{t}</h3><p>{s}</p></div></li>
          ))}
        </ol>
      </section>

      {/* SPLIT — очаг (тёплая секция: снег гаснет) */}
      <section className="sl-split" id="cabins">
        <div className="sl-split-media">
          <span className="sl-split-layer sl-split-layer-a" aria-hidden />
          <span className="sl-split-layer sl-split-layer-b" aria-hidden />
          <div className="sl-split-img" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        </div>
        <div className="sl-split-copy">
          <span className="sl-kick">Inside every cabin</span>
          <h2>A fire that was lit before you knocked.</h2>
          <p>Each GLØD cabin is tended through the afternoon by a local keeper — wood split, stove primed, lamps turned low — so the first thing you feel at the door is warmth, not chores. Lake water for the kettle, spruce for the stove, wool folded at the foot of the bed.</p>
          <a href="#book" className="sl-link">Meet the keepers →</a>
        </div>
      </section>

      {/* ХОЛОД ПРОТИВ ТЕПЛА — вместо полосы из четырёх цифр; окно встаёт на тёплую сторону */}
      <section className="sl-thermo">
        <div className="sl-thermo-cold">
          <span className="sl-kick sl-kick-cold">Outside</span>
          <b>−14°</b>
          <p>Blue hour from three in the afternoon. Forty minutes from the station to the last signal bar.</p>
        </div>
        <div className="sl-thermo-warm">
          <span className="sl-kick">Inside</span>
          <b>+21°</b>
          <p>Nine cabins, one valley. A fire that stays lit for ninety-six hours — it never once mattered how cold it got.</p>
        </div>
      </section>

      <PaperTear className="sl-tear-warm" />

      {/* FEATURE CARDS */}
      <section className="sl-cards" id="amenities">
        <div className="sl-cards-head">
          <span className="sl-kick">What&rsquo;s waiting</span>
          <h2>Built for the walk in, built for staying still.</h2>
        </div>
        <div className="sl-cards-grid">
          {CARDS.map(([t, s]) => (<div className="sl-card" key={t}><b>{t}</b><p>{s}</p></div>))}
        </div>
      </section>

      {/* QUOTE — приколотая бумажная записка */}
      <section className="sl-quote">
        <figure className="sl-note">
          <blockquote>&ldquo;We arrived half-frozen and turned back twice on the ice. The door was already warm before we knocked. <em>I have never been so glad</em> to take off boots.&rdquo;</blockquote>
          <figcaption>— Ingrid H., third winter returning</figcaption>
        </figure>
      </section>

      {/* DEAL — окно становится свечением CTA */}
      <section className="sl-deal" id="book">
        <div className="sl-deal-card">
          <span className="sl-kick">The stay</span>
          <div className="sl-price"><b>€640</b><span>/ cabin · four nights, full board</span></div>
          <p>Two to four guests, one hearth suite, every meal at the long table, a guide for the frozen mile and the lantern trails. Arrive by sled, leave reluctant.</p>
          <a href="#" className="sl-btn">Reserve your dates</a>
          <span className="sl-note-s">Free to reschedule for weather · Guide included</span>
        </div>
      </section>

      <section className="sl-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="sl-climax-veil" aria-hidden />
        <div className="sl-climax-copy">
          <h2>Cold outside.<br /><em>Ember inside.</em></h2>
          <a href="#book" className="sl-btn">Book a stay</a>
        </div>
      </section>

      <footer className="sl-foot">
        <span className="sl-brand">GLØD</span>
        <span>Nordic cabin retreats · Warm before you knock</span>
      </footer>
    </div>
  );
}
