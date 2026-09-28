"use client";
/* LUMEN — «Farlight», lighthouse-keeper stays through the storm season. Мир: тёплый вращающийся
   луч маяка режет холодную тьму шторма — бурный мыс → (спуск) укрытая бухта → (луч-шторка) ночь
   луча → (смена света) тихий розовый рассвет.
   Сквозной актёр — ЛУЧ: conic-gradient от лампы маяка в каждой сцене, оборот от скролла + ритм
   «раз в 11 секунд». В лендинге тот же луч ходит ПОД секциями по плите мира (Backdrop) от того же
   маяка и садится на карточку брони («ламповая»). Пейринг Big Shoulders Display × Public Sans. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe } from "@/components/scene-kit";
import "./lumen.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/lumen";

const scenes: ReelScene[] = [
  { id: "cape", dark: true, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="lm-eyebrow">Keeper stays · storm season</span>
      <h1>Hold the<br /><em>last light.</em></h1>
      <p>Three nights keeping a working lighthouse through a North Atlantic gale — the cape, the cove, the beam, the calm after. One light, one keeper, one watch rota.</p>
      <div className="lm-cta"><a href="#book" className="lm-btn">Book the watch</a><a href="#keeper" className="lm-ghost">Meet the keeper →</a></div>
    </>
  ) },
  { id: "cove", dark: true, into: "descend", tint: "#dfe8ea", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <>
      <span className="lm-idx">— 02 · the cove</span>
      <h2>Shelter Below</h2>
      <p>The storm doesn&apos;t reach the cove — only its wreckage does. An old hull on the shingle, one lit window, and the gale dropping away behind the cliff.</p>
    </>
  ) },
  { id: "beam", dark: true, into: "sweep", tint: "#ffd36a", len: 1.3, hold: 0.55, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="lm-freeze"><b>11 s</b><span>one turn of the light · count it</span></div>), copy: (
    <>
      <span className="lm-idx">— 03 · the beam</span>
      <h2>The Turn of the Light</h2>
      <p>Every eleven seconds it swings past — gold through black rain, gone, gold again. From the lamp room you watch a hundred years of engineering hold back an ocean.</p>
    </>
  ) },
  { id: "dawn", into: "lightshift", tint: "#f6c9c2", len: 1.1, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <>
      <span className="lm-idx lm-idx-dark">— 04 · the calm</span>
      <h2 className="lm-hl">After</h2>
      <p className="lm-pl">Pink light, glass water, the beam gone pale in a daylight that no longer needs it. You slept through a gale and woke to this.</p>
    </>
  ) },
];

/* вахтенный журнал одной штормовой ночи — вместо шагов, галереи и цитаты */
const LOG: Array<[string, string, string, string, string]> = [
  ["18:40", "SW 6", "1004", "lit", "Guests up the gallery stair. Glass dropping. Briefing on the rail while the first squall comes in."],
  ["20:10", "SW 8", "996", "turning", "Barometer read, log marked. The mechanism shown turning — four seconds of gold, eleven of dark."],
  ["23:30", "W 9", "989", "turning", "Worst of it. Two hours in the lamp room, beam sweeping the rain. A trawler rounds the point on our light."],
  ["02:15", "W 7", "993", "turning", "Stand-down. Cocoa in the storm suite; everyone asleep inside ten minutes. Keeper holds the watch."],
  ["06:05", "NW 3", "1009", "off", "Calm. Pink water. Light extinguished at sunrise, as it has been every morning since 1902."],
];

export function Lumen() {
  const root = useRef<HTMLDivElement>(null);
  // вращение луча: оборот от скролла + собственный ритм маяка (оборот за 11 с); reduced-motion — только скролл
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return subscribe(({ y, t, reduced }) => {
      const rot = y * 0.2 + (reduced ? 0 : (t / 11000) * 360);
      el.style.setProperty("--lm-rot", `${(rot % 360).toFixed(2)}deg`);
    });
  }, []);

  return (
    <div className="lm" ref={root}>
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=Public+Sans:wght@400;500;600;700;800&display=swap"]} />
      <header className="lm-nav">
        <span className="lm-brand">FARLIGHT</span>
        <nav>
          <a href="#watch">The watch</a>
          <a href="#keeper">The keeper</a>
          <a href="#log">Logbook</a>
          <a href="#book" className="lm-nav-cta">Book the watch</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="into the storm ↓" />

      {/* СКВОЗНОЙ СЛОЙ: ночь возвращается под лендингом, дождь шторма, луч маяка */}
      <Atmosphere stops={[
        { at: ".lm-big", color: "#2c2b36" }, { at: ".lm-features", color: "#1a222c" }, { at: ".lm-split", color: "#141b24" },
        { at: ".lm-char", color: "#0c1119" }, { at: ".lm-log", color: "#0b1016" }, { at: ".lm-faq", color: "#0e141b" },
        { at: ".lm-deal", color: "#0a0e14" }, { at: ".lm-climax", color: "#0b1118" },
      ]} />
      <Backdrop className="lm-bd" from=".lm-big" dim={0.5} plates={[
        { at: ".lm-big", src: `${A}/s4-bg.webp` }, { at: ".lm-features", src: `${A}/s1-bg.webp` },
        { at: ".lm-split", src: `${A}/s2-bg.webp` }, { at: ".lm-char", src: `${A}/s3-bg.webp` },
        { at: ".lm-log", src: `${A}/s3-bg.webp` }, { at: ".lm-deal", src: `${A}/s3-bg.webp` }, { at: ".lm-climax", src: `${A}/s3-bg.webp` },
      ]} />
      <Weather kind="rain" count={64} color="#d6e4ec" between={[".lm-nav", reelMark("t2")]} world={0.25} wind={1.4} zIndex={31} />
      <Weather kind="rain" count={40} color="#c9d8e2" seed={3} between={[".lm-char", ".lm-faq"]} world={0.25} wind={1.2} zIndex={31} />
      {/* луч над сценами рила */}
      <Actor className="lm-beam-actor" width="2px" zIndex={32} bob={0} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 73, y: 41, s: 1, o: 0.9 } },
        { at: reelMark("t0"), pose: { x: 66, y: 50, s: 0.8, o: 0.35 } },
        { at: reelMark("s1"), pose: { x: 59, y: 66, s: 0.62, o: 0.8 } },
        { at: reelMark("t1"), pose: { x: 65, y: 58, s: 1.1, o: 1 } },
        { at: reelMark("s2"), pose: { x: 69, y: 53, s: 1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 46, y: 47, s: 0.85, o: 0.45 } },
        { at: reelMark("s3"), pose: { x: 27, y: 41, s: 0.7, o: 0.16 } },
        { at: reelMark("end"), pose: { x: 27, y: 41, s: 0.7, o: 0.12 } },
        { at: ".lm-big", pose: { x: 27, y: 40, s: 0.7, o: 0 } },
      ]}><div className="lm-beam"><i className="lm-cone" /><i className="lm-lamp" /></div></Actor>
      {/* тот же луч в лендинге — ПОД секциями, от маяка на плите мира; садится на карточку брони */}
      <Actor className="lm-beam-actor lm-beam-land" width="2px" zIndex={-1} bob={0} tilt={0} stops={[
        { at: reelMark("end"), pose: { x: 27, y: 40, s: 0.8, o: 0 } },
        { at: ".lm-big", pose: { x: 27, y: 40, s: 0.8, o: 0.4 } },
        { at: ".lm-features", pose: { x: 73, y: 41, s: 1, o: 0.75 } },
        { at: ".lm-split", pose: { x: 59, y: 66, s: 0.8, o: 0.7 } },
        { at: ".lm-char", pose: { x: 69, y: 52, s: 1, o: 1 } },
        { at: ".lm-log", pose: { x: 69, y: 52, s: 1, o: 0.9 } },
        { at: ".lm-faq", pose: { x: 69, y: 52, s: 1, o: 0.8 } },
        { at: ".lm-deal-card", pose: { x: 50, y: 0, s: 1, o: 1, dock: true } },
        { at: ".lm-climax", pose: { x: 69, y: 52, s: 1.1, o: 1 } },
      ]}><div className="lm-beam"><i className="lm-cone" /><i className="lm-lamp" /></div></Actor>

      {/* BIG-TYPE — по рассветной плите */}
      <section className="lm-big">
        <p>The sea does not warn twice.<br />The light does — <em>every eleven seconds.</em></p>
      </section>

      {/* FEATURE-CARDS — что даёт Farlight (полупрозрачные: шторм мыса просвечивает) */}
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

      {/* SPLIT — окно штормового номера (иллюминатор) */}
      <section className="lm-split" id="keeper">
        <div className="lm-split-copy">
          <span className="lm-kick">The keeper&apos;s trade</span>
          <h2>One beam, aimed by hand for sixty years.</h2>
          <p>Behind the glass is a Fresnel lens older than the road to the point, and a keeper who inherited it from her father. The mechanism has never failed a night. Everything cold outside the tower is answered by four seconds of gold every eleven.</p>
          <p className="lm-split-sub">You don&apos;t watch the storm from the house. You watch it from inside the one thing the storm can&apos;t put out.</p>
          <a href="#log" className="lm-link">Read the keeper&apos;s log →</a>
        </div>
        <div className="lm-porthole" aria-hidden><div className="lm-porthole-glass" style={{ backgroundImage: `url(${A}/s1-bg.webp)` }} /></div>
      </section>

      {/* LIGHT CHARACTERISTIC — блок мира вместо полосы цифр: подпись огня на морской карте */}
      <section className="lm-char" aria-label="Light characteristic">
        <span className="lm-kick">On every chart since 1902</span>
        <div className="lm-char-code" aria-hidden>
          <span>Fl<i className="lm-flash" /></span><span>W</span><span>11s</span><span>42m</span><span>18M</span>
        </div>
        <dl className="lm-char-key">
          <div><dt>Fl</dt><dd>flashing — one flash per turn</dd></div>
          <div><dt>W</dt><dd>white light, gold in rain</dd></div>
          <div><dt>11s</dt><dd>period — unbroken for 120 years</dd></div>
          <div><dt>42m</dt><dd>lamp height above the tide</dd></div>
          <div><dt>18M</dt><dd>nautical miles of reach</dd></div>
        </dl>
        <p className="lm-char-note">27 storm nights hosted last winter · three guests on the point at once, never more.</p>
      </section>

      {/* KEEPER'S LOG — вахтенный журнал одной ночи (вместо шагов, галереи и цитаты) */}
      <section className="lm-log" id="log">
        <div className="lm-log-head">
          <span className="lm-kick">The logbook · 14 February</span>
          <h2>A night on the point, as the keeper wrote it.</h2>
        </div>
        <div className="lm-ledger" role="table" aria-label="Keeper's log">
          <div className="lm-ledger-row lm-ledger-th" role="row">
            <span role="columnheader">Time</span><span role="columnheader">Wind</span><span role="columnheader">Bar.</span><span role="columnheader">Light</span><span role="columnheader">Remarks</span>
          </div>
          {LOG.map(([t, w, b, l, r]) => (
            <div className="lm-ledger-row" role="row" key={t}>
              <span role="cell">{t}</span><span role="cell">{w}</span><span role="cell">{b}</span><span role="cell" data-l={l}>{l}</span><span role="cell">{r}</span>
            </div>
          ))}
          <div className="lm-ledger-guest" role="row">
            <span role="cell">Guest&apos;s remark —</span>
            <span role="cell">“I have slept through storms before. Never <em>eleven feet</em> from the light that was keeping the boats off the rocks.” — Callum R.</span>
          </div>
        </div>
      </section>

      {/* FAQ / ACCORDION */}
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

      {/* DEAL — карточка как ламповая: луч выходит из неё */}
      <section className="lm-deal" id="book">
        <div className="lm-deal-card">
          <span className="lm-kick">The keeper&apos;s watch</span>
          <div className="lm-price"><b>£340</b><span>/ night · full point, keeper&apos;s table &amp; lamp room access</span></div>
          <p>One party on the point at a time, three nights minimum in storm season. Book a window and we send the tide chart and the watch rota.</p>
          <a href="#" className="lm-btn">Reserve the point</a>
          <span className="lm-note">Free to reschedule for weather · Storm nights are not refunded — that&apos;s the point</span>
        </div>
      </section>

      {/* CLIMAX — прозрачный: под ним маяк плиты мира и тот же луч */}
      <section className="lm-climax">
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
