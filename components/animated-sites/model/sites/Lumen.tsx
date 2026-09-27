"use client";
/* LUMEN — «Farlight», lighthouse-keeper stays through the storm season. Мир: тёплый вращающийся
   луч маяка режет холодную тьму шторма — от бурного мыса, через укрытую бухту, к самому лучу
   в ночи, и наконец к тихому розовому рассвету. Собран на общем движке <Reel/>; лендинг и
   типографика — свои: пейринг Big Shoulders Display × Public Sans, палитра storm-slate/beam-gold. */
import { Reel, type ReelScene } from "../reel";
import "./lumen.css";

const A = "/uploads/1/animated/lumen";

const scenes: ReelScene[] = [
  {
    id: "cape",
    dark: true,
    bg: `${A}/s1-bg.webp`,
    mid: `${A}/s1-mid.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="lm-eyebrow">Keeper stays · storm season</span>
        <h1>
          Hold the
          <br />
          <em>last light.</em>
        </h1>
        <p>
          Three nights keeping a working lighthouse through a North Atlantic gale — the cape, the cove, the
          beam, the calm after. One working light, one keeper, one watch rota. Yours for a season.
        </p>
        <div className="lm-cta">
          <a href="#book" className="lm-btn">Book the watch</a>
          <a href="#keeper" className="lm-ghost">Meet the keeper →</a>
        </div>
      </>
    ),
  },
  {
    id: "cove",
    dark: true,
    bg: `${A}/s2-bg.webp`,
    mid: `${A}/s2-mid.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="lm-idx">— 02 · the cove</span>
        <h2>Shelter Below</h2>
        <p>
          The storm doesn't reach the cove — only its wreckage does. An old hull on the shingle, a stone
          boathouse with one lit window, and the sound of the gale dropping away behind the cliff.
        </p>
      </>
    ),
  },
  {
    id: "beam",
    dark: true,
    bg: `${A}/s3-bg.webp`,
    mid: `${A}/s3-mid.webp`,
    fg: `${A}/s3-fg.webp`,
    spark: 7,
    copy: (
      <>
        <span className="lm-idx">— 03 · the beam</span>
        <h2>The Turn of the Light</h2>
        <p>
          Every eleven seconds it swings past — gold through black rain, gone, gold again. Stand in the lamp
          room and watch a hundred years of engineering hold back an ocean.
        </p>
      </>
    ),
  },
  {
    id: "dawn",
    bg: `${A}/s4-bg.webp`,
    fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="lm-idx lm-idx-dark">— 04 · the calm</span>
        <h2 className="lm-hl">After</h2>
        <p className="lm-pl">
          Pink light, glass water, the beam gone pale in daylight it no longer needs. You slept through a
          gale and woke to this.
        </p>
      </>
    ),
  },
];

export function Lumen() {
  return (
    <div className="lm">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=Public+Sans:wght@400;500;600;700;800&display=swap" />

      <header className="lm-nav">
        <span className="lm-brand">FARLIGHT</span>
        <nav>
          <a href="#watch">The watch</a>
          <a href="#keeper">The keeper</a>
          <a href="#log">Logbook</a>
          <a href="#book" className="lm-nav-cta">Book the watch</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="descend into the storm ↓" />

      {/* BIG-TYPE — gut-punch statement (не у эталона) */}
      <section className="lm-big">
        <p>
          The sea does not warn twice.
          <br />
          The light does — <em>every eleven seconds.</em>
        </p>
      </section>

      {/* FEATURE-CARDS — что даёт Farlight (не у эталона) */}
      <section className="lm-features" id="watch">
        <div className="lm-features-head">
          <span className="lm-kick">What Farlight keeps for you</span>
          <h2>A working light. A stone house. One party at a time.</h2>
        </div>
        <div className="lm-feature-grid">
          {[
            ["The Lamp Room", "Private access to the working lamp room at dusk and through the first watch — the mechanism, the glass, the log."],
            ["Storm Suite", "Stone-walled quarters, a wood stove already lit, a window facing the full run of the gale."],
            ["Keeper's Table", "Meals timed to the tide, cooked between watches, eaten by lamp-light with whoever else is holding the point."],
            ["Cove Skiff", "Calm-water mornings after, a skiff and a keeper who knows every rock in the cove by name."],
          ].map(([t, s], i) => (
            <div className="lm-feature" key={i}>
              <span className="lm-feature-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS/PROCESS — как проходит вахта (не у эталона) */}
      <section className="lm-steps">
        <div className="lm-steps-head">
          <span className="lm-kick">How the watch runs</span>
          <h2>A night on the point.</h2>
        </div>
        <ol className="lm-step-row">
          {[
            ["01", "Arrival", "Dusk, wind rising, first briefing on the gallery as the glass starts to drop."],
            ["02", "Storm Brief", "The keeper reads the barometer, marks the log, shows you the beam mechanism turning."],
            ["03", "The Watch", "Two hours in the lamp room as the beam sweeps through the worst of the gale."],
            ["04", "Stand-Down", "Cocoa in the storm suite, the gale still outside, you asleep inside ten minutes."],
          ].map(([n, t, s], i) => (
            <li className="lm-step" key={i}>
              <span className="lm-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SIGNATURE — SPLIT, медиа СПРАВА (луч), тепло-vs-холод контраст */}
      <section className="lm-split" id="keeper">
        <div className="lm-split-copy">
          <span className="lm-kick">The keeper's trade</span>
          <h2>One beam, aimed by hand for sixty years.</h2>
          <p>
            Behind the glass is a Fresnel lens older than the road to the point, and a keeper who inherited
            it from her father. The mechanism has never failed a night. Everything cold outside the tower —
            the rock, the rain, the black water — is answered by four seconds of gold every eleven, on the
            hour, on the worst hour, without asking.
          </p>
          <p className="lm-split-sub">
            You don't watch the storm from the house. You watch it from inside the one thing the storm can't
            put out.
          </p>
          <a href="#book" className="lm-link">Read the keeper's log →</a>
        </div>
        <div className="lm-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden>
          <span className="lm-split-sweep" aria-hidden />
        </div>
      </section>

      {/* GALLERY — the logbook, 4 обложки-плиты */}
      <section className="lm-gallery" id="log">
        <div className="lm-gallery-head">
          <span className="lm-kick">The logbook</span>
          <h2>Four chapters, one storm.</h2>
        </div>
        <div className="lm-gallery-grid">
          {[
            [`${A}/s1-bg.webp`, "I · The Cape", "Bruised sky, black rock, the tower still standing where it's stood since 1902."],
            [`${A}/s2-bg.webp`, "II · The Cove", "A wrecked hull as a reminder of what the light is actually for."],
            [`${A}/s3-bg.webp`, "III · The Beam", "Eleven seconds of dark, four seconds of gold, all night, every night."],
            [`${A}/s4-bg.webp`, "IV · The Calm", "Pink water, gulls, a light burning pale in a sky that no longer needs it."],
          ].map(([img, t, s], i) => (
            <a className="lm-gallery-card" key={i} href="#book" style={{ backgroundImage: `url(${img})` }}>
              <span className="lm-gallery-veil" aria-hidden />
              <span className="lm-gallery-t">{t}</span>
              <span className="lm-gallery-s">{s}</span>
            </a>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="lm-stats">
        {[["11s", "beam rotation, unbroken since 1902"], ["27", "storm nights hosted last winter"], ["1902", "the year Farlight was first lit"], ["3", "guests on the point at once, max"]].map(([n, l], i) => (
          <div className="lm-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* MARQUEE — storm-warning ticker (не у эталона) */}
      <div className="lm-marquee" aria-hidden>
        <div className="lm-marquee-track">
          {Array.from({ length: 2 }, (_, k) => (
            <span key={k}>
              GALE WARNING — SMALL CRAFT ADVISORY — LAMP LIT — BEAM OPERATING — KEEPER ON WATCH — ALL CLEAR BY DAWN — GALE WARNING — SMALL CRAFT ADVISORY — LAMP LIT — BEAM OPERATING — KEEPER ON WATCH — ALL CLEAR BY DAWN —
            </span>
          ))}
        </div>
      </div>

      {/* QUOTE */}
      <section className="lm-quote">
        <blockquote>
          “I have slept through storms before. I have never slept through one <em>eleven feet</em> from the
          light that was keeping the boats off the rocks.”
        </blockquote>
        <cite>— Callum R., three nights on the point · February</cite>
      </section>

      {/* FAQ / ACCORDION — не у эталона */}
      <section className="lm-faq">
        <div className="lm-faq-head">
          <span className="lm-kick">Before you book</span>
          <h2>What to actually expect.</h2>
        </div>
        <div className="lm-faq-list">
          {[
            ["What if the storm doesn't come?", "Most weeks something rolls in off the Atlantic — but on the rare calm night, you still get the lamp room, the mechanism, and a beam turning over flat black water. Different, not lesser."],
            ["Is it actually safe?", "The tower has stood since 1902 and the keeper has run it for eleven years. The gallery rail is Coast Guard rated; you're never on the rocks after dark."],
            ["What should I bring?", "Oilskins if you have them (we keep spares), warm layers for the lamp room, and nothing you mind salt-spraying."],
            ["Can I bring family or a group?", "The point sleeps three. Book the whole watch and it's yours — no other guests, no other keeper's log that week."],
          ].map(([q, a], i) => (
            <details className="lm-faq-item" key={i}>
              <summary>{q}<span className="lm-faq-icon" aria-hidden>+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="lm-deal" id="book">
        <div className="lm-deal-card">
          <span className="lm-kick">The keeper's watch</span>
          <div className="lm-price"><b>£340</b><span>/ night · full point, keeper's table &amp; lamp room access</span></div>
          <p>One party on the point at a time, three nights minimum in storm season. Book a window and we send the tide chart and the watch rota.</p>
          <a href="#" className="lm-btn">Reserve the point</a>
          <span className="lm-note">Free to reschedule for weather · Storm nights are not refunded — that's the point</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="lm-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="lm-climax-veil" aria-hidden />
        <div className="lm-climax-sweep" aria-hidden />
        <div className="lm-climax-copy">
          <h2>The light turns.<br /><em>Come stand in it.</em></h2>
          <a href="#book" className="lm-btn">Book the watch</a>
        </div>
      </section>

      <footer className="lm-foot">
        <span className="lm-brand">FARLIGHT</span>
        <span>Lighthouse-keeper stays · Storm season, by the watch</span>
      </footer>
    </div>
  );
}
