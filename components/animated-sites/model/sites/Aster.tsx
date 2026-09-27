"use client";
/* ASTER — «Apogee: dark-sky observatory & stargazing retreat». Мир: малый наблюдатель под
   великим небом — ночь как глубина, не тьма. Собран на общем движке <Reel/>; лендинг и
   типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, свой шрифт-пейринг Instrument Sans ×
   Outfit, палитра indigo/starlight-silver/nebula-violet/warm-dome-gold + aurora-mint CTA).
   Сигнатурный блок — STATS-FIRST: гигантские астрономические числа. */
import { Reel, type ReelScene } from "../reel";
import "./aster.css";

const A = "/uploads/1/animated/aster";
const scenes: ReelScene[] = [
  { id: "hilltop", dark: true, spark: 6, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="as-eyebrow">Dark-sky observatory &amp; stargazing retreat</span>
      <h1>Come this<br />close to <em>the stars.</em></h1>
      <p>One lightless ridge, a century-old brass telescope, and more stars than a city sky has ever offered you at once.</p>
      <div className="as-cta"><a href="#book" className="as-btn">Reserve a night</a><a href="#sky" className="as-ghost">See tonight&rsquo;s sky →</a></div>
    </>
  ) },
  { id: "telescope", dark: true, spark: 3, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="as-idx">— 02 · the eyepiece</span><h2>The Brass Eye</h2>
      <p>Nineteen-oh-six optics, hand-figured and still true. One turn of the focus wheel and Saturn stops being a rumor.</p></>
  ) },
  { id: "milkyway", dark: true, spark: 10, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="as-idx">— 03 · the arch</span><h2>The Whole Galaxy, Overhead</h2>
      <p>On a clear new-moon night the core clears the ridge and the sky stops behaving like a ceiling.</p></>
  ) },
  { id: "meteor", dark: true, spark: 12, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="as-idx">— 04 · before dawn</span><h2>The Meteor Hour</h2>
      <p>Between four and five the sky lets go of its held breath. Lie back on the grass. Let it fall on you.</p></>
  ) },
];

export function Aster() {
  return (
    <div className="as">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" />
      <header className="as-nav">
        <span className="as-brand">APOGEE</span>
        <nav>
          <a href="#sky">The sky</a>
          <a href="#instruments">Instruments</a>
          <a href="#book">Stay</a>
          <a href="#book" className="as-nav-cta">Reserve a night</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="descend into dark ↓" />

      {/* SIGNATURE — STATS-FIRST: gigantic astronomical numbers, the dominant landing feature */}
      <section className="as-stats as-sky">
        <div className="as-stats-head">
          <span className="as-kick">What the ridge gives you</span>
          <h2>Numbers a city sky can&rsquo;t.</h2>
        </div>
        <div className="as-stat-grid">
          <div className="as-stat">
            <b>2,340<sup>m</sup></b>
            <p>Elevation above sea level — above the cloud line, above most of the atmosphere&rsquo;s glow.</p>
          </div>
          <div className="as-stat">
            <b>21.9<sup>mag/arcsec²</sup></b>
            <p>Measured sky brightness — the darkest class an instrument on this ridge has recorded.</p>
          </div>
          <div className="as-stat">
            <b>4,000<sup>+</sup></b>
            <p>Stars visible to the naked eye on a clear, new-moon night. A city offers you perhaps two hundred.</p>
          </div>
          <div className="as-stat">
            <b>2.5M<sup>ly</sup></b>
            <p>Distance to Andromeda — the farthest thing you will ever see without the telescope&rsquo;s help.</p>
          </div>
        </div>
      </section>

      {/* MANIFESTO — одна крупная мысль */}
      <section className="as-manifest">
        <p>Down there, the sky is <em>a rumor.</em> Up here, it&rsquo;s the whole conversation.</p>
      </section>

      {/* STEPS / PROCESS — «How a Night Unfolds» (тип, отсутствующий у эталона) */}
      <section className="as-steps" id="sky">
        <div className="as-steps-head">
          <span className="as-kick">One booking, one ridge, one night</span>
          <h2>How a night unfolds.</h2>
        </div>
        <ol className="as-timeline">
          {[["6:00 PM", "Arrival", "Altitude tea at the lodge. Your eyes adjust to the elevation before they adjust to the dark."],
            ["7:30 PM", "Naked-Eye Hour", "Orientation on the open hilltop as the first stars clear the ridge line."],
            ["9:00 PM", "The Brass Eye", "Guided time at the 1906 telescope — one object, one turn of the wheel, at a time."],
            ["11:30 PM", "Galactic Core", "The Milky Way clears the ridge. Wide-field cameras and tripods come out."],
            ["4:00 AM", "Meteor Hour", "Blankets, cocoa, and a sky that finally lets go before dawn."]].map(([t, h, s], i) => (
            <li key={i}><span className="as-time">{t}</span><h3>{h}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* FEATURE CARDS — «Instruments & Programs» (тип, отсутствующий у эталона) */}
      <section className="as-cards" id="instruments">
        <div className="as-cards-head">
          <div><span className="as-kick">On the ridge</span><h2>Instruments &amp; programs.</h2></div>
          <p>Four ways to spend a night — from the naked eye to a tracked long exposure.</p>
        </div>
        <div className="as-card-grid">
          {[["01", "The Brass Refractor", "14-inch, hand-figured in 1906, still true to a hundredth of a wave."],
            ["02", "Wide-Field Deck", "Six mounted binocular stations — no waiting in line for the dome."],
            ["03", "Astrophotography Bay", "Tracked mounts and cold-weather power for exposures past midnight."],
            ["04", "Dome Talks", "A resident astronomer walks the night sky, three evenings a week."]].map(([n, t, s], i) => (
            <div className="as-card" key={i}><span className="as-card-n">{n}</span><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* GALLERY — «Four Skies», обложки из s{1..4}-bg */}
      <section className="as-gallery">
        <div className="as-gallery-head">
          <span className="as-kick">One climb, four skies</span>
          <h2>Four Skies.</h2>
        </div>
        <div className="as-plates">
          {[["Chapter 01", "Hilltop", `${A}/s1-bg.webp`],
            ["Chapter 02", "The Brass Eye", `${A}/s2-bg.webp`],
            ["Chapter 03", "The Arch", `${A}/s3-bg.webp`],
            ["Chapter 04", "Meteor Hour", `${A}/s4-bg.webp`]].map(([k, t, img], i) => (
            <div className="as-plate" key={i} style={{ backgroundImage: `url(${img})` }}>
              <span><em>{k}</em>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT — showcase кадр + текст */}
      <section className="as-split">
        <div className="as-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="as-split-copy">
          <span className="as-kick">Why the sky holds still for you</span>
          <h2>We log the sky before you look up.</h2>
          <p>Moon phase, seeing, transparency — every clear night on the ridge is measured before we open the dome, so the hour we hand you is the best one available, not just the next one.</p>
          <a href="#book" className="as-link">Read the sky log →</a>
        </div>
      </section>

      {/* QUOTE */}
      <section className="as-quote">
        <blockquote>&ldquo;I have stood under a lot of night skies. I have never had one <em>narrated</em> to me like this — like someone had already found everything worth finding.&rdquo;</blockquote>
        <cite>— Renata K., amateur astronomer · visited in October</cite>
      </section>

      {/* DEAL */}
      <section className="as-deal" id="book">
        <div className="as-deal-card">
          <span className="as-kick">The overnight watch</span>
          <div className="as-price"><b>$185</b><span>/ guest · dome access, guide &amp; the brass eye</span></div>
          <p>One full night on the ridge: transport from the valley, all instruments, blankets and cocoa, and a seat at the eyepiece for as long as the sky holds.</p>
          <a href="#" className="as-btn">Reserve a night</a>
          <span className="as-note">Clear-sky guarantee · Free to reschedule</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="as-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="as-climax-veil" aria-hidden />
        <div className="as-climax-copy"><h2>The sky is already <em>falling.</em></h2><a href="#book" className="as-btn">Reserve a night</a></div>
      </section>

      <footer className="as-foot"><span className="as-brand">APOGEE</span><span>Dark-sky observatory · Elevation 2,340 m</span></footer>
    </div>
  );
}
