"use client";
/* NOMAD — «WINDMANE». Мир: пленэр Монгольской степи, огромное небо и малый человек на нём —
   от золотой травы через табун и войлочный лагерь к перевалу на закате. Собран на общем движке
   <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг
   Unbounded × Schibsted Grotesk, палитра gold-grass/steppe-sky/felt/saddle + sun CTA). */
import { Reel, type ReelScene } from "../reel";
import "./nomad.css";

const A = "/uploads/1/animated/nomad";
const scenes: ReelScene[] = [
  { id: "grassland", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="nm-eyebrow">Windmane Expeditions · open tal</span>
      <h1>Some horizons<br /><em>you have to earn.</em></h1>
      <p>Six days on horseback across open steppe — golden grass, a running herd, a felt camp under stars, and a pass that ends in sky. No fences. No itinerary past sundown.</p>
      <div className="nm-cta"><a href="#ride" className="nm-btn">Join a ride</a><a href="#route" className="nm-ghost">See the route →</a></div>
    </>
  ) },
  { id: "herd", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, spark: 5, copy: (
    <><span className="nm-idx">— 02 · the running herd</span><h2>Ride With the Herd</h2>
      <p>Forty horses break into a run across the plain and your mount goes with them — no lead rope, no line, just dust and hooves and the old instinct to run when the herd runs.</p></>
  ) },
  { id: "camp", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="nm-idx">— 03 · the felt camp</span><h2>Camp at the Edge of the Grass</h2>
      <p>A white ger, an open door, a fire lit the same way it has been for a thousand years. You arrive saddle-sore and leave fed, warm, and slower than you came.</p></>
  ) },
  { id: "pass", dark: true, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 7, copy: (
    <><span className="nm-idx nm-light">— 04 · the last light</span><h2 className="nm-hl">The Pass at Dusk</h2>
      <p className="nm-pl">The trail climbs into shadow while the peaks keep the last of the gold. This is where riders stop talking — there is nothing left to say the sky hasn&apos;t already.</p></>
  ) },
];

export function Nomad() {
  return (
    <div className="nm">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" />
      <header className="nm-nav">
        <span className="nm-brand">WINDMANE</span>
        <nav>
          <a href="#route">The route</a>
          <a href="#kit">What&apos;s carried</a>
          <a href="#days">Four days</a>
          <a href="#ride" className="nm-nav-cta">Join a ride</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="ride ↓" />

      {/* BIG-TYPE PANORAMA — SIGNATURE: one horizon-spanning statement, wide open space either side */}
      <section className="nm-panorama">
        <span className="nm-horizon-line" aria-hidden />
        <p>The steppe doesn&apos;t end — it just gets farther away.</p>
        <span className="nm-horizon-line" aria-hidden />
      </section>

      {/* STEPS/PROCESS — horizontal numbered path (block tidewell lacks) */}
      <section className="nm-route" id="route">
        <div className="nm-route-head"><span className="nm-kick">Five days, one line</span><h2>How the Ride Runs</h2></div>
        <ol className="nm-steps">
          {[["01", "Saddle Up", "Meet your horse at first camp — hand-fitted tack, a riding briefing, and a spare mount held in reserve for the whole line."],
            ["02", "Cross the Open Tal", "Long flat days with the wind at your back. Forty kilometres of gold grass before anyone thinks about lunch."],
            ["03", "Run With the Herd", "The free horses fall in beside the line. Your horse remembers how to run before you decide to let it."],
            ["04", "Camp Under Felt", "Ger, fire, airag, and a sky with no city left in it anywhere."],
            ["05", "Climb the Pass", "The final ascent at dusk — prayer flags, thin air, and the ridge that ends the ride."]].map(([n, t, s], i) => (
            <li className="nm-step" key={i}><span className="nm-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — solution: what's handled for the rider */}
      <section className="nm-kit" id="kit">
        <div className="nm-kit-head"><span className="nm-kick">Nothing to arrange yourself</span><h2>What&apos;s Carried For You</h2></div>
        <div className="nm-kit-grid">
          {[["Horses & Tack", "Mongol-bred horses built for distance, hand-fitted saddles, and a rested spare mount on every leg of the ride."],
            ["Guide Lineage", "Herder-guides whose families have ridden this exact line for four generations — they read the weather before it arrives."],
            ["Ger Camps", "A warm felt tent, a hot meal, and dry boots waiting at the end of every riding day."],
            ["Weather Cover", "Wind shells, felt layers and a route that bends around real steppe weather instead of pretending it won't happen."]].map(([t, s], i) => (
            <div className="nm-kit-card" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase kadr + method copy */}
      <section className="nm-split">
        <div className="nm-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="nm-split-copy">
          <span className="nm-kick">Why Windmane</span>
          <h2>We Don&apos;t Follow a Trail. We Follow a Herd.</h2>
          <p>Most rides loop a fixed track. Ours follows the herd&apos;s own migration line — the same route Mongolian herders have ridden for centuries, shifting slightly each season with the grass and the water table.</p>
          <a href="#route" className="nm-link">Read the route →</a>
        </div>
      </section>

      {/* GALLERY — four bg-plates as chapters */}
      <section className="nm-gallery" id="days">
        <div className="nm-gallery-head"><span className="nm-kick">One line, four skies</span><h2>Four Days, Four Skies</h2></div>
        <div className="nm-gallery-grid">
          {[["s1-bg", "Grassland", "Golden tal under a huge cloud-streaked sky"], ["s2-bg", "Herd", "Forty horses at a run, dust turned to gold"], ["s3-bg", "Camp", "White ger and cookfire in a green valley"], ["s4-bg", "Pass", "The final ridge, held in the last warm light"]].map(([img, t, s], i) => (
            <div className="nm-gallery-tile" key={i} style={{ backgroundImage: `url(${A}/${img}.webp)` }}>
              <div className="nm-gallery-veil" aria-hidden />
              <span className="nm-gallery-t">{t}</span><span className="nm-gallery-s">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="nm-stats">
        {[["180", "kilometres ridden"], ["4", "nights under felt"], ["40+", "horses in the running herd"], ["1:4", "guide-to-rider ratio"]].map(([n, l], i) => (
          <div className="nm-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="nm-quote">
        <blockquote>&ldquo;I have ridden in a dozen countries. Nothing prepared me for forty horses deciding, all at once, to run — and my own horse going with them <em>before I&apos;d made the choice myself</em>.&rdquo;</blockquote>
        <cite>— Dana R., rider · third crossing</cite>
      </section>

      {/* FAQ/ACCORDION — block tidewell lacks */}
      <section className="nm-faq">
        <div className="nm-faq-head"><span className="nm-kick">Before you book</span><h2>Riders Ask</h2></div>
        <div className="nm-faq-list">
          {[["Do I need riding experience?", "Comfortable at a walk and trot is enough. The herd sets the pace beyond that, and guides match every horse to the rider's skill before day one."],
            ["What's the fitness level?", "Up to six hours in the saddle on the longest days. Moderate fitness recommended — the horses do the distance, your legs do the rest."],
            ["Where do we actually sleep?", "Felt ger camps run by the same herder families each season, plus one open night under the stars near the pass."],
            ["How large is the group?", "Eight riders maximum per line, one guide for every four — small enough that the herd still feels wild."]].map(([q, a], i) => (
            <details className="nm-faq-item" key={i}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="nm-deal" id="ride">
        <div className="nm-deal-card">
          <span className="nm-kick">The six-day line</span>
          <div className="nm-price"><b>$2,450</b><span>/ rider · horse, guide, camp &amp; the whole open line</span></div>
          <p>One long crossing, start to pass, everything carried so you only have to sit the horse and watch the grass go by.</p>
          <a href="#" className="nm-btn">Reserve your dates</a>
          <span className="nm-note">Season: May–September · 8 riders per line, max</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="nm-climax" style={{ backgroundImage: `url(${A}/s1-bg.webp)` }}>
        <div className="nm-climax-veil" aria-hidden />
        <div className="nm-climax-copy"><h2>Your horse is already <em>waiting</em>.</h2><a href="#ride" className="nm-btn">Join a ride</a></div>
      </section>

      <footer className="nm-foot"><span className="nm-brand">WINDMANE</span><span>Horseback expeditions across the open tal · Ridden, not toured</span></footer>
    </div>
  );
}
