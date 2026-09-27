"use client";
/* WILLOW — «a slow Louisiana bayou in warm haze». Мир: кипарисовое болото на рассвете →
   туманный канал → ночь светлячков → рассветная дельта. Палитра moss/gold-fog/teal-water/
   dusk-violet + firefly-gold CTA. Собран на общем движке <Reel/> v2; свой шрифт-пейринг
   Playfair Display × Epilogue — южная, тёплая, душевная героика.

   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): одна плоскодонка с фонарём на носу (актёр-спрайт) скользит
   вперёд через все сцены и дальше по протоке лендинга — причаливает к четырём стоянкам маршрута и к
   тарифу «Firefly Float». Ночью у фонаря собираются светлячки (погода в окне ночи и у «хора» голосов).
   Склейки из мира: занавес мха пролетает перед объективом (flythrough) → туман — белая окклюзия
   (occlude) → первый розовый свет проходит по кадру (sweep). Плашки-вырезки (прямоугольник, клякса,
   «висящая» лодка) убраны: лодка одна — актёр. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./willow.css";

const A = "/uploads/1/animated/willow";

const scenes: ReelScene[] = [
  { id: "cypress", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="ww-eyebrow">Bayou floats &amp; backwater stays</span>
      <h1>Slow down<br /><em>to bayou time.</em></h1>
      <p>A poled flat-boat through cypress and hanging moss, one hour at a time — from cold gold dawn to the hour the fireflies come up.</p>
      <div className="ww-cta"><a href="#book" className="ww-btn">Book a float</a><a href="#floats" className="ww-ghost">See the route →</a></div>
    </>
  ) },
  { id: "channel", into: "flythrough", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ww-idx">— 02 · the long hush</span><h2>Into the Hush</h2>
      <p>The channel narrows, the moss closes overhead, and the whole bayou goes quiet enough to hear your own pole in the water.</p></>
  ) },
  { id: "fireflies", dark: true, into: "occlude", tint: "#d9d6c4", len: 1.25, hold: 0.56, spark: 7, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="ww-freeze"><b>9:40 pm</b><span>lantern low · no motor to cut</span></div>), copy: (
    <><span className="ww-idx ww-light">— 03 · firefly hour</span><h2 className="ww-hl">Ten Thousand Small Lights</h2>
      <p className="ww-pl">Every June the channel fills with fireflies, doubled in the black water. There&apos;s no motor to cut — we just drift through it, lantern low.</p></>
  ) },
  { id: "delta", into: "sweep", tint: "#f6c3b8", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="ww-idx">— 04 · the open water</span><h2>Where the Bayou Opens</h2>
      <p>Moss gives way to sky. The cabin lights come up pink on the delta, and somebody on the porch is already tuning a fiddle.</p></>
  ) },
];

/* протока лендинга: четыре стоянки (вместо «шаги×4» + «галерея×4») */
const STOPS: [string, string, string, string, string][] = [
  ["5:50 am", `${A}/s1-bg.webp`, "Meet at the Landing", "Coffee, a life vest, and five minutes on how a pole beats a paddle. We leave while the mist is still sitting on the water.", "Dawn · cypress, gold mist"],
  ["7:30 am", `${A}/s2-bg.webp`, "Pole into the Hush", "Your guide poles standing, bayou-style — no motor, no wake, close enough to touch the moss as it passes.", "The hush · closed canopy"],
  ["9:40 pm", `${A}/s3-bg.webp`, "Drift the Firefly Hour", "On evening floats we glide through the cypress right as the fireflies come up. Nobody talks much through this part.", "Night · ten thousand sparks"],
  ["6:10 am", `${A}/s4-bg.webp`, "Come In on the Porch", "Every float ends at the lodge dock at first light. There's usually a fiddle going, and always a second cup of coffee.", "First light · open delta"],
];

const WAYS = [
  { name: "The Float", meta: "2 hrs · 4 guests · guided", body: "A guided pole through cypress, hush channel and open delta. Binoculars and a thermos of chicory coffee, both included." },
  { name: "The Cabin", meta: "1–3 nights · stilt-built", body: "A screened porch over the water, propane lamp only, no road noise for six miles. Wake to herons instead of an alarm." },
  { name: "The Session", meta: "Fridays · porch, live", body: "Local fiddlers, a washboard, whoever brought a harmonica that week. Tonight's set: Cypress Waltz, Firefly Reel, Low Water Rag." },
];

const LEDGER: [string, string][] = [
  ["40 yrs", "cypress lease held motor-free"],
  ["4", "guests to a boat, guide included"],
  ["112", "bird species logged this year"],
  ["1", "pole — no engine, ever"],
];

const CHORUS = [
  ["Idella M.", "porch fiddler, 30 years", "I've played these tunes since I was nine. Out here the moss still keeps the same time I do."],
  ["Boone R.", "guide, eleven seasons", "Folks book for the boat ride. They leave asking me about the herons instead."],
  ["Corinne D.", "first-time guest", "I didn't know quiet could be this loud. I mean that as the nicest thing I can say."],
  ["Pop Aldous", "cabin no. 3, every June since '04", "Come back every June like clockwork. Swear the fireflies remember me by now."],
  ["Wyn T.", "river biologist", "Cleanest cypress stand left on this stretch of water. We've measured it every year — it's holding."],
  ["Ruthann K.", "Friday regular", "Bring a harmonica if you've got one. Somebody always does, and it always turns into a night."],
];

export function Willow() {
  return (
    <div className="ww">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Epilogue:wght@400;500;600;700;800&display=swap"]} />

      <header className="ww-nav">
        <span className="ww-brand">MOSS &amp; LANTERN</span>
        <nav><a href="#floats">The float</a><a href="#stays">Stays</a><a href="#voices">Voices</a><a href="#book" className="ww-nav-cta">Book a float</a></nav>
      </header>

      <Reel scenes={scenes} cue="drift ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет дельты → мох → ночь светлячков под лендингом */}
      <Atmosphere stops={[
        { at: ".ww-route", color: "#3a3345" }, { at: ".ww-ways", color: "#23342a" }, { at: ".ww-manifest", color: "#1a2f28" },
        { at: ".ww-split", color: "#15271f" }, { at: ".ww-chorus", color: "#0c1a16" }, { at: ".ww-deal", color: "#10201a" },
        { at: ".ww-climax", color: "#0a1411" },
      ]} />
      <Backdrop from=".ww-route" dim={0.6} plates={[
        { at: ".ww-route", src: `${A}/s4-bg.webp` }, { at: ".ww-manifest", src: `${A}/s2-bg.webp` },
        { at: ".ww-chorus", src: `${A}/s3-bg.webp` }, { at: ".ww-deal", src: `${A}/s3-bg.webp`, pos: "50% 70%" },
      ]} />

      {/* фонарь на носу ночью — к нему стягиваются светлячки */}
      <Actor className="ww-halo-actor" width="22vw" zIndex={31} bob={4} tilt={0} stops={[
        { at: reelMark("t1"), pose: { x: 70, y: 66, s: 0.6, o: 0 } },
        { at: reelMark("s2"), pose: { x: 75, y: 66, s: 1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 64, y: 70, s: 0.8, o: 0.35 } },
        { at: reelMark("s3"), pose: { x: 46, y: 74, s: 0.6, o: 0 } },
      ]}><div className="ww-halo" /></Actor>

      {/* ПЛОСКОДОНКА — одна лодка через весь сайт (спрайт смотрит влево → fx:-1, идём вперёд вправо) */}
      <Actor src={`${A}/actor-boat.webp`} className="ww-boat" width="30vw" zIndex={32} bob={3} tilt={0.03} stops={[
        { at: reelMark("s0"), pose: { x: 66, y: 71, s: 1, fx: -1 } },
        { at: reelMark("t0"), pose: { x: 67, y: 66, s: 0.82, fx: -1, blur: 1.5 } },
        { at: reelMark("s1"), pose: { x: 63, y: 68, s: 0.72, fx: -1 } },
        { at: reelMark("t1"), pose: { x: 58, y: 70, s: 0.66, o: 0.3, blur: 3, fx: -1 } },
        { at: reelMark("s2"), pose: { x: 62, y: 70, s: 0.84, o: 1, fx: -1 } },
        { at: reelMark("t2"), pose: { x: 52, y: 73, s: 0.72, fx: -1 } },
        { at: reelMark("s3"), pose: { x: 33, y: 77, s: 0.56, fx: -1 } },
        { at: reelMark("end"), pose: { x: 38, y: 77, s: 0.5, fx: -1 } },
        { at: ".ww-route-head", pose: { x: 30, y: 84, s: 0.46, fx: -1, o: 0.95 } },
        { at: ".ww-stop:nth-child(1)", anchor: 0.5, pose: { x: 72, y: 62, s: 0.48, fx: -1, dock: true } },
        { at: ".ww-stop:nth-child(2)", anchor: 0.5, pose: { x: 28, y: 62, s: 0.48, fx: 1, dock: true } },
        { at: ".ww-stop:nth-child(3)", anchor: 0.5, pose: { x: 72, y: 62, s: 0.5, fx: -1, dock: true } },
        { at: ".ww-stop:nth-child(4)", anchor: 0.5, pose: { x: 28, y: 62, s: 0.48, fx: 1, dock: true } },
        { at: ".ww-ways", pose: { x: 86, y: 90, s: 0.36, fx: -1, o: 0.7 } },
        { at: ".ww-deal-hi", pose: { x: 50, y: -16, s: 0.46, fx: -1, dock: true } },
        { at: ".ww-climax", anchor: 0, pose: { x: 58, y: 6, s: 0.34, fx: -1, o: 0 } },
      ]} />

      <Weather kind="fireflies" count={28} color="#ffd86a" color2="#fff0a8" between={[reelMark("t1"), reelMark("t2")]} world={0.35} zIndex={31} />
      <Weather kind="fireflies" count={18} color="#ffd86a" seed={11} between={[".ww-chorus", ".ww-deal"]} world={0.4} zIndex={2} />

      {/* ПРОТОКА — маршрут дня: лодка причаливает к каждой стоянке (вместо шагов и галереи-плиток) */}
      <section className="ww-route ww-moss" id="floats">
        <div className="ww-route-head"><span className="ww-kick">One boat, one pole, no motor</span><h2>How a float runs, landing to porch.</h2></div>
        <svg className="ww-river" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden focusable="false">
          <path d="M50,0 C50,30 70,40 72,62 S30,120 28,162 S72,220 72,262 S28,320 28,362 S40,392 50,400" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="ww-stops">
          {STOPS.map(([t, img, h, s, cap], i) => (
            <li className="ww-stop" key={i}>
              <div className="ww-stop-img" style={{ backgroundImage: `url(${img})` }} aria-hidden />
              <div className="ww-stop-copy"><span className="ww-stop-t">{t}</span><h3>{h}</h3><p>{s}</p><span className="ww-stop-cap">{cap}</span></div>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — three offerings */}
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

      {/* MANIFESTO — на плите туманного канала, мох свисает с кромки */}
      <section className="ww-manifest ww-moss">
        <p>Nobody out here is in a hurry. <em>The moss has been growing since before your grandmother was born</em> — it isn&apos;t starting now.</p>
      </section>

      {/* SPLIT — история + вахтенный журнал (цифры внутри истории, не полосой) */}
      <section className="ww-split">
        <div className="ww-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ww-split-copy">
          <span className="ww-kick">Why we still pole instead of motor</span>
          <h2>No engine has touched this channel in forty years.</h2>
          <p>Moss &amp; Lantern started as one family&apos;s cypress lease and a hand-built flat-boat. We still run it that way — no engines, no wake, no PA system on the water. What&apos;s left is one of the last untouched cypress stands on this stretch of river.</p>
          <ul className="ww-ledger">
            {LEDGER.map(([n, l], i) => (<li key={i}><b>{n}</b><span>{l}</span></li>))}
          </ul>
          <a href="#voices" className="ww-link">Read what people find here →</a>
        </div>
      </section>

      {/* SIGNATURE — хор голосов: загораются по одному, как светлячки */}
      <section className="ww-chorus ww-moss" id="voices">
        <div className="ww-chorus-head">
          <span className="ww-kick">Not just us saying it</span>
          <h2>Voices from the water.</h2>
        </div>
        <div className="ww-chorus-grid">
          {CHORUS.map(([name, role, line], i) => (
            <figure className="ww-voice" key={i} data-n={i + 1}>
              <i className="ww-spark" aria-hidden />
              <blockquote>“{line}”</blockquote>
              <figcaption><b>{name}</b><span>{role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING/DEAL — three tiers */}
      <section className="ww-deal" id="book">
        <div className="ww-deal-head"><span className="ww-kick">Come sit a while</span><h2>Pick your hour on the water.</h2></div>
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
        <div className="ww-climax-copy"><h2>Pole out at dusk. <em>Drift home by firefly.</em></h2><a href="#book" className="ww-btn">Book a float</a></div>
      </section>

      <footer className="ww-foot"><span className="ww-brand">MOSS &amp; LANTERN</span><span>Bayou floats, cypress cabins &amp; porch sessions · Poled, not motored</span></footer>
    </div>
  );
}
