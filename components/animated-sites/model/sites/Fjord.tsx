"use client";
/* FJORDRO — rowed fjord crossings, oar-only. Мир: вертикаль севера — отвесные стены, чёрная зеркальная вода,
   ОДНА МАЛЕНЬКАЯ КРАСНАЯ ЛОДКА — единственное тёплое пятно — уходит от камеры через все сцены:
   обрывы → (камера плывёт вперёд, стены смыкаются по бокам: flythrough) зеркало → (белая стена брызг: occlude)
   водопад → (гребём дальше вдоль фьорда: pan) деревня на сваях → и дальше по лендингу как единственный
   красный маркер прогресса: причаливает к «линиям воды» с отражением и к карточке брони.
   Шрифты Big Shoulders Display × Inter Tight, палитра fjord-blue/granite/moss/red-boat + red CTA.
   Нет marquee — «громкая бегущая строка» противоречит тезису тишины. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./fjord.css";

const A = "/uploads/1/animated/fjord";

/* все mid — плашки (панель в белой рамке, рваное пятно, серая виньетка), s1-fg — шов и сети поверх воды,
   s4-fg — магента по причалу:
   не используем (аудит 2026-09). Лодку несёт актёр. */
const scenes: ReelScene[] = [
  { id: "cliffs", bg: `${A}/s1-bg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="fj-eyebrow">A rowed crossing, four stops north</span>
      <h1>Go quiet<br /><em>between the walls.</em></h1>
      <p>One small red boat threads a fjord of sheer granite — cliffs, mirror water, a waterfall loud enough to fill the silence, and a lantern-lit village on stilts at the end.</p>
      <div className="fj-cta"><a href="#book" className="fj-btn">Book a crossing</a><a href="#stops" className="fj-ghost">See the four stops →</a></div>
    </>
  ) },
  { id: "boat", into: "flythrough", tint: "#cfe0e6", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="fj-idx">— 02 · the mirror</span><h2>The Mirror Crossing</h2>
      <p>No engine, no wake — just oars and the tide. The water holds the cliffs so still you forget which way is up.</p></>
  ) },
  { id: "waterfall", into: "occlude", tint: "#eef4f3", len: 1.2, hold: 0.56, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="fj-freeze"><b>212 m</b><span>of falling water · ten metres off the bow</span></div>), copy: (
    <><span className="fj-idx">— 03 · the fall</span><h2>Under Mosswater</h2>
      <p>A waterfall loud enough to drown the wind, close enough to feel on your face. We row in until the spray beads on the gunwale.</p></>
  ) },
  { id: "village", into: "pan", tint: "#3a6a86", bg: `${A}/s4-bg.webp`, spark: 5, copy: (
    <><span className="fj-idx">— 04 · the village</span><h2>Stiltwater at Dusk</h2>
      <p>Red and ochre houses lift out of the water on their old timber legs. A lantern goes up on the dock. This is where the oars finally rest.</p></>
  ) },
];

const stops = [
  ["Quay · 7 am", "Granite Gate", "Wool blankets, a thermos of coffee, and the oars go in before you do. Forty minutes later the fjord narrows to a hundred metres and the water goes black."],
  ["Slack tide · 8 am", "The Mirror", "A stretch so still the gulls fly twice — once real, once reflected. Take a turn at the oars if the water holds."],
  ["Mid-morning", "Mosswater Falls", "Six centuries of ice-cap melt roaring straight into the fjord. We row in close enough for the spray, then let the current carry us back out."],
  ["Dusk", "Stiltwater Village", "Eleven red houses on timber legs, and the only lantern for a mile. We moor as the windows light up one by one."],
];

export function Fjord() {
  return (
    <div className="fj">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700&display=swap"]} />
      <header className="fj-nav">
        <span className="fj-brand">FJORDRO</span>
        <nav><a href="#crossing">The crossing</a><a href="#stops">Stops</a><a href="#book" className="fj-nav-cta">Book a crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="row on ↓" />

      {/* СКВОЗНОЙ СЛОЙ: северный свет остывает к сумеркам, под блоками — стены фьорда, морось, лодка */}
      <Atmosphere stops={[
        { at: ".fj-statement", color: "#0c2732" }, { at: ".fj-craft", color: "#0b2530" }, { at: ".fj-wl-1", color: "#0a212b" },
        { at: ".fj-stop:nth-child(1)", color: "#0c2733" }, { at: ".fj-stop:nth-child(3)", color: "#112e3b" },
        { at: ".fj-stop:nth-child(4)", color: "#18263a" }, { at: ".fj-wl-2", color: "#16202f" },
        { at: ".fj-quote", color: "#141c2c" }, { at: ".fj-faq", color: "#131a28" }, { at: ".fj-deal", color: "#1a1a2b" },
      ]} />
      <Backdrop from=".fj-statement" dim={0.54} plates={[
        { at: ".fj-statement", src: `${A}/s1-bg.webp` },
        { at: ".fj-stop:nth-child(1)", src: `${A}/s1-bg.webp` },
        { at: ".fj-stop:nth-child(2)", src: `${A}/s2-bg.webp` },
        { at: ".fj-stop:nth-child(3)", src: `${A}/s3-bg.webp` },
        { at: ".fj-stop:nth-child(4)", src: `${A}/s4-bg.webp` },
        { at: ".fj-deal", src: `${A}/s4-bg.webp`, pos: "50% 60%" },
      ]} />
      <Weather kind="rain" count={24} color="#dfe9ec" between={[reelMark("t0"), ".fj-wl-2"]} world={0.3} zIndex={31} />
      <Weather kind="dust" count={36} seed={3} color="#f4f8f8" color2="#cfe0e6" between={[reelMark("t1"), reelMark("t2")]} world={0.5} wind={2} zIndex={31} />

      {/* КРАСНАЯ ЛОДКА — уходит от камеры через все сцены, в лендинге причаливает к линиям воды и к брони */}
      <Actor src={`${A}/actor-boat.webp`} width="10vw" zIndex={32} bob={2.5} tilt={0.03} stops={[
        { at: reelMark("s0"), pose: { x: 60, y: 77, s: 1, o: 1 } },
        { at: reelMark("t0"), pose: { x: 57, y: 68, s: 0.62, o: 1 } },
        { at: reelMark("s1"), pose: { x: 58, y: 61, s: 0.44, o: 1 } },
        { at: reelMark("t1"), pose: { x: 50, y: 64, s: 0.4, o: 0.4, blur: 2 } },
        { at: reelMark("s2"), pose: { x: 31, y: 74, s: 0.38, o: 1, blur: 0 } },
        { at: reelMark("t2"), pose: { x: 48, y: 70, s: 0.44, o: 1 } },
        { at: reelMark("s3"), pose: { x: 58, y: 82, s: 0.52, o: 1 } },
        { at: ".fj-statement", pose: { x: 30, y: 84, s: 0.5, o: 0 } },
        { at: ".fj-wl-1 .fj-wl-line", pose: { x: 24, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-stop:nth-child(1) .fj-stop-water", pose: { x: 18, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-stop:nth-child(2) .fj-stop-water", pose: { x: 40, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-stop:nth-child(3) .fj-stop-water", pose: { x: 62, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-stop:nth-child(4) .fj-stop-water", pose: { x: 84, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-wl-2 .fj-wl-line", pose: { x: 76, y: 50, s: 0.62, o: 1, dock: true } },
        { at: ".fj-deal-card", pose: { x: 50, y: -3, s: 0.66, o: 1, dock: true } },
      ]} />

      {/* BIG-TYPE — тезис */}
      <section className="fj-statement">
        <p>Everything loud <em>stays on the coast.</em></p>
        <span className="fj-statement-sub">Fjordro runs one boat, one small crew, and nothing louder than a gull.</span>
      </section>

      {/* SPLIT — ремесло лодки, медиа справа */}
      <section className="fj-craft" id="crossing">
        <div className="fj-craft-copy">
          <span className="fj-kick">Why we still row</span>
          <h2>One Boat, Built by Hand, Fifty Years Ago.</h2>
          <p>Our boat is a fifty-year-old spissbåt, clinker-built on this same shore, re-caulked every spring and rowed, never motored. An engine would flatten the water before you reached the first wall — so we leave it ashore.</p>
          <a href="#stops" className="fj-link">Meet the four stops →</a>
        </div>
        <div className="fj-craft-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
      </section>

      {/* WATER LINE — цифра над водой и её отражение (разделитель вместо полосы цифр) */}
      <div className="fj-wl fj-wl-1" aria-label="Fifty years rowed">
        <div className="fj-wl-num"><b>50</b><span>years this boat<br />has been rowed</span></div>
        <div className="fj-wl-line" aria-hidden />
        <div className="fj-wl-num fj-wl-ref" aria-hidden><b>50</b><span>years this boat<br />has been rowed</span></div>
      </div>

      {/* THE CROSSING — четыре остановки рядами поверх живой плиты мира (вместо шагов + карточек с фото + галереи) */}
      <section className="fj-crossing" id="stops">
        <header className="fj-crossing-head"><span className="fj-kick">Quay to lantern, one row</span><h2>Four Stops on the Water.</h2></header>
        <ol className="fj-stops">
          {stops.map(([t, h, p], i) => (
            <li className="fj-stop" key={h}>
              <div className="fj-stop-copy"><span className="fj-stop-n">{String(i + 1).padStart(2, "0")}</span><span className="fj-stop-t">{t}</span><h3>{h}</h3><p>{p}</p></div>
              <i className="fj-stop-water" aria-hidden />
            </li>
          ))}
        </ol>
      </section>

      <div className="fj-wl fj-wl-2" aria-label="No motors, ever">
        <div className="fj-wl-num"><b>0</b><span>motors,<br />ever</span></div>
        <div className="fj-wl-line" aria-hidden />
        <div className="fj-wl-num fj-wl-ref" aria-hidden><b>0</b><span>motors,<br />ever</span></div>
      </div>

      {/* QUOTE */}
      <section className="fj-quote">
        <blockquote>"I have taken loud fjord cruises before — diesel and a loudspeaker. This was the first time I actually <em>heard the waterfall</em>."</blockquote>
        <cite>— Ingrid H., guest · Bergen</cite>
      </section>

      {/* FAQ */}
      <section className="fj-faq">
        <div className="fj-faq-head"><span className="fj-kick">Before you book</span><h2>A Few Practical Things.</h2></div>
        <div className="fj-faq-list">
          {[
            ["Do I need to row?", "No — our guide handles the oars the whole way. You're welcome to take a turn on the mirror stretch if the water's calm."],
            ["What if it rains?", "It usually does. Wool blankets and oilskins are aboard; we only cancel for real wind."],
            ["How fit do I need to be?", "Not very. You sit, you look up, you occasionally lean out of the way of spray."],
            ["Can we stay the night in Stiltwater?", "Yes — the village has three guest rooms above the boathouse, booked separately."],
          ].map(([q, a], i) => (
            <details className="fj-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — лодка причаливает к верхней кромке карточки */}
      <section className="fj-deal" id="book">
        <div className="fj-deal-card">
          <span className="fj-kick">The full crossing</span>
          <div className="fj-price"><b>kr 890</b><span>/ guest · boat, guide &amp; the four stops</span></div>
          <p>One boat, six guests at most, a full crossing from quay to Stiltwater and back — oars the whole way, no engine to break the quiet.</p>
          <a href="#" className="fj-btn">Reserve a seat</a>
          <span className="fj-note">Runs May – September · Weather-called at dawn</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="fj-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="fj-climax-veil" aria-hidden />
        <div className="fj-climax-copy"><h2>The fjord is only this still <em>before seven.</em></h2><a href="#book" className="fj-btn">Book a crossing</a></div>
      </section>

      <footer className="fj-foot"><span className="fj-brand">FJORDRO</span><span>Rowed fjord crossings · Granite to lantern-light</span></footer>
    </div>
  );
}
