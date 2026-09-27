"use client";
/* EMBERFALL — «autumn valley farm-stay». Мир: осень как медленный пожар — кленовый гребень, янтарный брод,
   сад на склоне, закатный двор. ОДИН ЛИСТ ведёт зрителя: срывается с гребня → порывом проносится мимо
   объектива (flythrough) → плывёт по реке, течение несёт его вбок (pan) → цепляется в саду → низкий луч
   заката (sweep) → ложится на стол урожая → и дальше падает по лендингу, пока не садится на CTA.
   Листопад густеет с прогрессом, фон лендинга остывает к вечеру (Atmosphere), под блоками живёт мир (Backdrop).
   Шрифты Zilla Slab × Figtree, палитра amber/rust/gold/pine + amber CTA. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./emberfall.css";

const A = "/uploads/1/animated/emberfall";

/* s1-fg (белая рамка-обрез) и s2-mid (клякса воды) не используем — аудит 2026-09 */
const scenes: ReelScene[] = [
  { id: "ridge", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, len: 1.1, hold: 0.5, midPos: "84% 88%", copy: (
    <>
      <span className="ef-eyebrow">An autumn valley, four days long</span>
      <h1>Where the valley<br /><em>learns to burn.</em></h1>
      <p>Four days deep in a working orchard valley — a blazing ridge, an amber river, a hillside heavy with fruit, and a farmhouse table lit by the last low sun.</p>
      <div className="ef-cta"><a href="#stay" className="ef-btn">Reserve Harvest Week</a><a href="#stages" className="ef-ghost">See the four days →</a></div>
    </>
  ) },
  { id: "river", into: "flythrough", tint: "#f0c98a", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ef-idx">— 02 · the crossing</span><h2>The Amber Crossing</h2>
      <p>Stepping stones and cold morning mist rising gold off the water. Drop a leaf here and the current carries it all the way to the orchard.</p></>
  ) },
  { id: "orchard", into: "pan", tint: "#e0a94a", len: 1.2, hold: 0.56, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, midPos: "80% 86%",
    freeze: (<div className="ef-freeze"><b>4:52 pm</b><span>the whole slope catches at once</span></div>), copy: (
    <><span className="ef-idx">— 03 · the orchard</span><h2>Heavy With Fruit</h2>
      <p>Ladders lean into red-gold trees on the slope. You pick what you'll eat tonight, and carry the rest home in a woven basket.</p></>
  ) },
  { id: "harvest", into: "sweep", tint: "#ff9a4a", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, midPos: "82% 86%", copy: (
    <><span className="ef-idx">— 04 · the farmstead</span><h2>Supper By Firelight</h2>
      <p>Long tables, low light, cider passed hand to hand until the sky over the barn matches the coals.</p></>
  ) },
];

const turns = [
  ["01", "The Ridge", "Day one · morning", "Where the maples go first, and go hardest. Stand under a canopy that looks lit from the inside out — this is where your leaf lets go."],
  ["02", "The Crossing", "Day two · mist", "An amber river you cross stone by stone, mist rising off water still warm from summer. Everything that falls up here ends up floating past you."],
  ["03", "The Orchard", "Day three · 4:52 pm", "Forty rows of apples heavy enough to bend the branch. At ten to five the low sun reaches the slope and the whole hillside catches at once."],
  ["04", "The Farmstead", "Day four · dusk", "Long tables, low light, cider passed hand to hand until the sky matches the coals — and the leaves you carried in are on the table."],
];

const calMarks = [
  ["12%", "Sep 22", "the maples on the ridge turn first", "up"],
  ["46%", "Oct 3", "the orchard slope peaks", "down"],
  ["66%", "Oct 14", "last supper at the long table", "up"],
];

export function Emberfall() {
  return (
    <div className="ef">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Figtree:wght@400;500;600;700&display=swap"]} />
      <header className="ef-nav">
        <span className="ef-brand">EMBERFALL</span>
        <nav><a href="#stages">The four days</a><a href="#faq">Know before you go</a><a href="#stay" className="ef-nav-cta">Reserve Harvest Week</a></nav>
      </header>

      <Reel scenes={scenes} cue="follow the leaf ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет долины остывает к вечеру, под блоками живут плиты мира, лист ведёт до CTA */}
      <Atmosphere stops={[
        { at: ".ef-statement", color: "#2a170d" }, { at: ".ef-turn:nth-child(1)", color: "#2c180c" },
        { at: ".ef-turn:nth-child(4)", color: "#2a1611" }, { at: ".ef-days", color: "#271614" },
        { at: ".ef-method", color: "#231519" }, { at: ".ef-cal", color: "#1f1520" },
        { at: ".ef-quote", color: "#1b1422" }, { at: ".ef-faq", color: "#181321" }, { at: ".ef-stay", color: "#15121f" },
      ]} />
      <Backdrop from=".ef-statement" dim={0.56} plates={[
        { at: ".ef-statement", src: `${A}/s1-bg.webp` },
        { at: ".ef-turn:nth-child(1)", src: `${A}/s1-bg.webp` },
        { at: ".ef-turn:nth-child(2)", src: `${A}/s2-bg.webp` },
        { at: ".ef-turn:nth-child(3)", src: `${A}/s3-bg.webp` },
        { at: ".ef-turn:nth-child(4)", src: `${A}/s4-bg.webp` },
        { at: ".ef-cal", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
        { at: ".ef-stay", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
      ]} />
      <Weather kind="leaves" count={12} color="#c25a2a" color2="#e0a94a" between={[".ef-nav", ".ef-foot"]} world={0.55} zIndex={31} />
      <Weather kind="leaves" count={14} seed={23} color="#8a2f22" color2="#ff8a3a" between={[reelMark("t1"), ".ef-foot"]} world={0.75} zIndex={31} />
      <Actor src={`${A}/actor-leaf.webp`} width="4.4vw" zIndex={33} bob={7} tilt={0.25} stops={[
        { at: reelMark("s0"), pose: { x: 72, y: 22, s: 0.8, r: -24, o: 1 } },
        { at: reelMark("t0"), pose: { x: 50, y: 54, s: 2.8, r: 110, o: 1, blur: 4 } },
        { at: reelMark("s1"), pose: { x: 38, y: 80, s: 0.52, r: 196, o: 1 } },
        { at: reelMark("t1"), pose: { x: 66, y: 78, s: 0.52, r: 252, o: 1 } },
        { at: reelMark("s2"), pose: { x: 72, y: 36, s: 0.6, r: 318, o: 1 } },
        { at: reelMark("t2"), pose: { x: 60, y: 56, s: 0.8, r: 362, o: 1, blur: 1 } },
        { at: reelMark("s3"), pose: { x: 74, y: 70, s: 0.5, r: 404, o: 1 } },
        { at: ".ef-statement", pose: { x: 86, y: 28, s: 1, r: 450, o: 1 } },
        { at: ".ef-turn:nth-child(1)", pose: { x: -12, y: 14, s: 0.95, r: 470, o: 1, dock: true } },
        { at: ".ef-turn:nth-child(2)", pose: { x: -12, y: 14, s: 0.95, r: 500, o: 1, dock: true } },
        { at: ".ef-turn:nth-child(3)", pose: { x: -12, y: 14, s: 0.95, r: 530, o: 1, dock: true } },
        { at: ".ef-turn:nth-child(4)", pose: { x: -12, y: 14, s: 0.95, r: 560, o: 1, dock: true } },
        { at: ".ef-cal-window", pose: { x: 50, y: -240, s: 0.85, r: 600, o: 1, dock: true } },
        { at: ".ef-stay .ef-btn", pose: { x: 100, y: -40, s: 0.8, r: 632, o: 1, dock: true } },
      ]} />

      {/* BIG-TYPE — одна мысль поверх гребня */}
      <section className="ef-statement">
        <p>Some valleys turn brown in October.<br />This one <em>catches fire</em> instead.</p>
      </section>

      {/* FOUR TURNS — главы долины рядами поверх живой плиты мира (вместо плит-карточек 2×2) */}
      <section className="ef-turns" id="stages">
        <header className="ef-turns-head"><span className="ef-kick">One trail, four fires</span><h2>Four Turns of the Valley</h2></header>
        <ol className="ef-turns-list">
          {turns.map(([n, t, when, d]) => (
            <li className="ef-turn" key={n}>
              <span className="ef-turn-n">{n}</span>
              <div className="ef-turn-copy"><span className="ef-turn-when">{when}</span><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* ITINERARY — горизонтальные шаги */}
      <section className="ef-days">
        <div className="ef-days-head"><span className="ef-kick">The itinerary</span><h2>How a Stay Unfolds</h2></div>
        <ol className="ef-days-row">
          {[
            ["Day 01", "Arrive & Settle", "Cabin key, a map of the ridge trail, and a jar of last year's preserve waiting on the table."],
            ["Day 02", "Ridge & River", "Morning climb to the maple ridge, afternoon crossing at the shallows. Boots provided."],
            ["Day 03", "The Orchard Shift", "Pick what you want, press what you pick. Cider by four o'clock."],
            ["Day 04", "The Long Supper", "Everyone at one table. The valley goes copper, then ember, then quiet."],
          ].map(([d, t, s], i) => (
            <li className="ef-day" key={i}><span className="ef-day-n">{d}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* SPLIT — метод/наследие (цифры хозяйства — в тексте, без полосы из 4 цифр) */}
      <section className="ef-method">
        <div className="ef-method-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="ef-method-copy">
          <span className="ef-kick">Why the light does this</span>
          <h2>We Farm the Slope, Not Just the Season.</h2>
          <p>Sixty-four acres of ridge, river and orchard, one family's since the first row went in in 1961. We angle the rows to catch the low autumn sun and leave the maples above untouched — which is the only reason the whole valley turns like this at once.</p>
          <a href="#stages" className="ef-link">Meet the orchard →</a>
        </div>
      </section>

      {/* COLOUR CALENDAR — сигнатурный блок мира вместо полосы цифр и marquee */}
      <section className="ef-cal" aria-label="The colour calendar">
        <div className="ef-cal-head"><span className="ef-kick">The colour calendar</span><h2>We only open for the weeks the ridge burns.</h2></div>
        <div className="ef-cal-bar">
          <div className="ef-cal-grad" aria-hidden />
          <div className="ef-cal-window" style={{ left: "26%", width: "44%" }}><span>Harvest Weeks · Sep 28 – Oct 14</span></div>
          {calMarks.map(([x, d, t, side]) => (
            <div className={`ef-cal-mark ef-cal-${side}`} key={d} style={{ left: x }}><b>{d}</b><span>{t}</span></div>
          ))}
          <ol className="ef-cal-ticks" aria-hidden>
            {["Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13", "Oct 20", "Oct 27"].map((d) => <li key={d}>{d}</li>)}
          </ol>
        </div>
        <p className="ef-cal-note">Six cabins, twelve seats at the supper table — and when the last maple lets go, we close the gate until next year.</p>
      </section>

      {/* QUOTE — записка, прижатая к краю (не по центру) */}
      <section className="ef-quote">
        <blockquote>"We came for a weekend and left talking about it for a year. I had never seen a hillside <em>actually glow</em> before."</blockquote>
        <cite>— Dana R., Harvest Week guest · October</cite>
      </section>

      {/* FAQ */}
      <section className="ef-faq" id="faq">
        <div className="ef-faq-head"><span className="ef-kick">Know before you go</span><h2>A Few Practical Things</h2></div>
        <div className="ef-faq-list">
          {[
            ["What's included in Harvest Week?", "Four nights in a cabin, all meals, the ridge walk, orchard picking, and the closing supper."],
            ["Do we need hiking experience?", "No — the ridge trail is a gentle two hours. Boots and walking sticks are provided."],
            ["Can we bring apples home?", "As many as you can carry, plus a jar of cider you press yourself."],
            ["When does the color actually peak?", "Late September through mid-October, which is the only window we run."],
          ].map(([q, a], i) => (
            <details className="ef-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — лист садится на кнопку */}
      <section className="ef-stay" id="stay">
        <div className="ef-stay-card">
          <span className="ef-kick">The Harvest Week</span>
          <div className="ef-price"><b>$890</b><span>/ guest · cabin, meals &amp; the four days</span></div>
          <p>Four nights in the valley, every meal at the long table, guided ridge and river, and as much orchard as you can carry home.</p>
          <a href="#" className="ef-btn">Reserve a week</a>
          <span className="ef-note">Six cabins only · Late Sept – mid Oct</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ef-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ef-climax-veil" aria-hidden />
        <div className="ef-climax-copy"><h2>Come before <em>the last leaf</em> lets go.</h2><a href="#stay" className="ef-btn">Reserve Harvest Week</a></div>
      </section>

      <footer className="ef-foot"><span className="ef-brand">EMBERFALL</span><span>Autumn valley farm-stay · Grown slow, gathered warm</span></footer>
    </div>
  );
}
