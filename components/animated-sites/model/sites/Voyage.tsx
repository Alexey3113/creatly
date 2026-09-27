"use client";
/* VOYAGE — steampunk airship odyssey across a sky-ocean. Мир: латунный дирижабль «Aurelia»
   пересекает облачный океан, плавучие острова, грозовой фронт и заходит в фонарную гавань
   Amberholt на закате. Собран на общем движке <Reel/> v2; лендинг и типографика — свои
   (шрифт-пейринг Zilla Slab × Figtree, палитра cloud-cream/sky-cerulean/brass/storm-slate).

   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): ОДИН «Aurelia» (актёр-спрайт) пересекает все сцены и летит
   дальше по пунктиру маршрута через лендинг — причаливает к иллюминаторам этапов, встаёт в «ангар»
   блока «Meet the Aurelia» и швартуется к карточке цены. Склейки из мира: путь по горизонтали (pan) →
   влёт в облачную стену фронта (flythrough + whiteout) → молния (lightshift, flash-cut) в гавань.
   Чужие дирижабли из mid-вырезок убраны: в кадре только один корабль. */
import { useState } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, type ActorPose, type ActorStop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./voyage.css";

const A = "/uploads/1/animated/voyage";

const scenes: ReelScene[] = [
  { id: "cloudsea", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="vy-eyebrow">Skyfaring above the weather · since 1889</span>
      <h1>Cross an ocean<br /><em>with no shore.</em></h1>
      <p>CLOUDWRIGHT flies one brass-hulled airship over a sea of cloud, past floating isles and through one honest storm front, into a lantern-lit harbor at dusk. Bring a coat.</p>
      <div className="vy-cta"><a href="#book" className="vy-btn">Book passage</a><a href="#route" className="vy-ghost">See the route →</a></div>
    </>
  ) },
  { id: "isles", into: "pan", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <>
      <span className="vy-idx">— 02 · the isles</span>
      <h2>Floating Gardens</h2>
      <p>Waterfalls spill off drifting rock into the cloud below. We moor an hour at the nearest isle — cottage smoke, a slow windmill, ground that was never meant to hold still.</p>
    </>
  ) },
  { id: "storm", dark: true, into: "flythrough", tint: "#aab3c2", len: 1.25, hold: 0.56, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="vy-freeze"><b>3,200 ft</b><span>ship&apos;s log · 14:10 · holding her line</span></div>), copy: (
    <>
      <span className="vy-idx vy-light">— 03 · the front</span>
      <h2 className="vy-hl">Into the Grey</h2>
      <p className="vy-pl">Every honest crossing meets weather. The <em>Aurelia</em> leans into it — sail strained, lanterns lit, holding her line through the worst of the sky.</p>
    </>
  ) },
  { id: "harbor", dark: true, into: "lightshift", tint: "#fff1d6", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 8, copy: (
    <>
      <span className="vy-idx vy-light">— 04 · the harbor</span>
      <h2 className="vy-hl">Amberholt, at Dusk</h2>
      <p className="vy-pl">Brass spires catch the last gold light over the sky-dock. A thousand warm windows and a hand on the rail to steady you — this is where the crossing ends, until the next one.</p>
    </>
  ) },
];

/* маршрут: этапы дня = главы рила (вместо «шаги×4» + «галерея×4») */
const LEGS: [string, string, string, string, string][] = [
  ["01", `${A}/s1-bg.webp`, "05:50 · cast off", "The Cloud-Sea", "Board at the lower dock while the envelope fills. Eleven minutes after the lines drop you are above the ceiling, and the world goes quiet, then pink."],
  ["02", `${A}/s2-bg.webp`, "10:30 · moor", "The Floating Isles", "Two drifting isles, one long lunch on a cottage terrace, and every waterfall you can stand to watch fall into nothing."],
  ["03", `${A}/s3-bg.webp`, "14:10 · hold the line", "The Storm Front", "The only rough hour of the day. Lanterns lit, blankets out, the Aurelia leans into a wall of grey and comes out the other side."],
  ["04", `${A}/s4-bg.webp`, "18:40 · make fast", "Amberholt Harbor", "The harbor lanterns come up to meet you. You step off the gangway into brass light, a little changed."],
];

const FARES: [string, string, string, string][] = [
  ["G-12", "The Gondola Berth", "A porthole seat, a wool blanket, the whole cloud-sea for company. Shared cabin, private view.", "from 40 sovereigns"],
  ["B-04", "The Brass Suite", "A private cabin with fold-down desk and brass portholes — room to log the isles as they pass.", "from 95 sovereigns"],
  ["E-01", "The Captain's Eyrie", "Top-deck cabin beside the wheel. The one seat on board that isn't afraid of the storm front.", "from 210 sovereigns"],
];

const FAQS: [string, string][] = [
  ["Is the storm front actually safe?", "Yes. The Aurelia is rated for weather twice as rough as the front we fly, and every crossing is scouted by wire the morning of departure."],
  ["What if I'm afraid of heights?", "Most of our passengers are, at first. The cloud-sea has a way of curing that by the second isle."],
  ["Can I bring luggage?", "One trunk, checked, plus a satchel you keep with you. We'll find room for a birdcage if you ask nicely."],
  ["Do you fly at night?", "Only the last leg, into Amberholt. The harbor is built to be seen lit."],
  ["What happens if the weather turns worse than expected?", "We hold at the nearest isle, serve dinner, and finish the crossing at first light. It has happened four times in eleven years."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="vy-faq" id="faq">
      <div className="vy-faq-head">
        <span className="vy-kick">Before you book</span>
        <h2>Questions we get at the dock</h2>
      </div>
      <ol className="vy-faq-list">
        {FAQS.map(([q, a], i) => (
          <li className={`vy-faq-row ${open === i ? "vy-faq-open" : ""}`} key={i}>
            <button className="vy-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span>
              <span className="vy-faq-mark" aria-hidden>{open === i ? "–" : "+"}</span>
            </button>
            <div className="vy-faq-a"><p>{a}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* путь Aurelia: рил (по маркерам) → лендинг (по блокам). o — дневной/приглушённый экземпляр */
const SHIP: [string, ActorPose, number][] = [
  [reelMark("s0"), { x: 72, y: 44, s: 1, r: -2 }, 1],
  [reelMark("t0"), { x: 75, y: 36, s: 0.9, r: -4 }, 1],
  [reelMark("s1"), { x: 70, y: 32, s: 0.78, r: -1 }, 1],
  [reelMark("t1"), { x: 58, y: 40, s: 1.2, r: 4, blur: 3 }, 0.5],
  [reelMark("s2"), { x: 69, y: 42, s: 0.95, r: -10 }, 0],
  [reelMark("t2"), { x: 66, y: 46, s: 0.8, r: -3 }, 0],
  [reelMark("s3"), { x: 66, y: 50, s: 0.6, r: 0 }, 0],
  [reelMark("end"), { x: 70, y: 44, s: 0.55 }, 0],
  [".vy-big", { x: 80, y: 30, s: 0.5, r: -2 }, 1],
  [".vy-leg:nth-child(1)", { x: 76, y: 46, s: 0.55, dock: true }, 1],
  [".vy-leg:nth-child(2)", { x: 25, y: 46, s: 0.55, fx: -1, dock: true }, 1],
  [".vy-leg:nth-child(3)", { x: 76, y: 46, s: 0.55, r: -7, dock: true }, 1],
  [".vy-leg:nth-child(4)", { x: 25, y: 46, s: 0.55, fx: -1, dock: true }, 1],
  [".vy-hangar", { x: 50, y: 50, s: 1.28, dock: true }, 1],
  [".vy-fares", { x: 86, y: 14, s: 0.36 }, 1],
  [".vy-deal-card", { x: 90, y: 1, s: 0.46, r: -3, dock: true }, 1],
  [".vy-climax", { x: 62, y: 34, s: 0.28 }, 0],
];
const shipStops = (kind: "day" | "dim"): ActorStop[] =>
  SHIP.map(([at, pose, day], i) => ({ at, pose: { ...pose, o: kind === "day" ? day : i >= 3 && i <= 7 ? (i === 3 ? 0.5 : 1) : 0 } }));

export function Voyage() {
  return (
    <div className="vy">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Figtree:wght@400;500;600;700&display=swap"]} />
      <header className="vy-nav">
        <span className="vy-brand">CLOUDWRIGHT</span>
        <nav>
          <a href="#route">Route</a>
          <a href="#fleet">The Aurelia</a>
          <a href="#fares">Fares</a>
          <a href="#book" className="vy-nav-cta">Book passage</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="cast off ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет мира от рассвета к сумеркам гавани + плита мира под лендингом */}
      <Atmosphere stops={[
        { at: ".vy-big", color: "#2b4868" }, { at: ".vy-route", color: "#2f5378" }, { at: ".vy-split", color: "#262f4a" },
        { at: ".vy-fares", color: "#2d2f4c" }, { at: ".vy-wire", color: "#45304a" }, { at: ".vy-deal", color: "#34222f" },
        { at: ".vy-climax", color: "#1f1720" },
      ]} />
      <Backdrop from=".vy-big" dim={0.6} plates={[
        { at: ".vy-big", src: `${A}/s1-bg.webp` }, { at: ".vy-route", src: `${A}/s2-bg.webp` },
        { at: ".vy-wire", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
        { at: ".vy-deal", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
      ]} />

      {/* ВЛЁТ В ОБЛАЧНУЮ СТЕНУ: whiteout на пике пролёта в грозовой фронт */}
      <Actor className="vy-whiteout" width="150vw" zIndex={30} bob={0} tilt={0} stops={[
        { at: reelMark("s1"), pose: { x: 50, y: 50, s: 0.7, o: 0 } },
        { at: reelMark("t1"), pose: { x: 50, y: 50, s: 1.25, o: 0.82 } },
        { at: reelMark("s2"), pose: { x: 50, y: 50, s: 1.8, o: 0 } },
      ]}><div className="vy-cloudwall" /></Actor>

      {/* AURELIA — один корабль через весь сайт. Два экземпляра одного пути: дневной и «штормовой/сумеречный»
          (тот же спрайт, приглушённый под свет сцены) — перекрёстно гаснут на влёте во фронт и на выходе в лендинг */}
      <Actor src={`${A}/actor-aurelia.webp`} className="vy-ship" width="24vw" zIndex={32} bob={7} tilt={0.06} stops={shipStops("day")} />
      <Actor src={`${A}/actor-aurelia.webp`} className="vy-ship vy-ship-dim" width="24vw" zIndex={32} bob={7} tilt={0.06} stops={shipStops("dim")} />

      <Weather kind="rain" count={70} color="#d3dbe8" between={[reelMark("t1"), reelMark("t2")]} world={0.25} wind={1.4} zIndex={31} />

      <div className="vy-land">
        {/* пунктир маршрута через весь лендинг — по нему летит Aurelia */}
        <svg className="vy-route-line" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden focusable="false">
          <path d="M80,0 C82,40 80,70 76,95 S24,150 25,190 S76,250 76,300 S25,360 25,400 S50,470 50,520 S84,600 82,680 S40,760 44,840 S88,930 90,1000" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* BIG-TYPE — одна мысль, на плите рассветного облачного моря */}
        <section className="vy-big">
          <p>Every map you own stops at the ground. <em>Ours was never drawn there.</em></p>
        </section>

        {/* ROUTE — этапы дня как иллюминаторы вдоль пунктира (вместо шагов и галереи-плиток) */}
        <section className="vy-route" id="route">
          <div className="vy-route-head">
            <span className="vy-kick">The route, leg by leg</span>
            <h2>Four legs, one long day.</h2>
          </div>
          <ol className="vy-legs">
            {LEGS.map(([n, img, time, t, d]) => (
              <li className="vy-leg" key={n}>
                <div className="vy-port" style={{ backgroundImage: `url(${img})` }} aria-hidden><span>{n}</span></div>
                <div className="vy-leg-copy"><span className="vy-leg-t">{time}</span><h3>{t}</h3><p>{d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {/* SIGNATURE — «Meet the Aurelia»: ангар-чертёж, в который причаливает сам корабль + паспортная табличка */}
        <section className="vy-split" id="fleet">
          <div className="vy-split-copy">
            <span className="vy-kick">The flagship</span>
            <h2>Meet the <em>Aurelia</em>.</h2>
            <p>Riveted brass over waxed canvas, four propellers, a keel that has crossed the storm front eleven hundred times without losing a passenger. She carries thirty-six souls, a cook, and more lantern oil than she should ever need.</p>
            <dl className="vy-spec">
              <div><dt>Souls aboard</dt><dd>36</dd></div>
              <div><dt>To the ceiling</dt><dd>11 min</dd></div>
              <div><dt>Front crossings</dt><dd>1,100+</dd></div>
              <div><dt>In service since</dt><dd>1889</dd></div>
            </dl>
            <a href="#book" className="vy-link">Read her logbook →</a>
          </div>
          <div className="vy-hangar" aria-hidden>
            <span className="vy-hangar-tag">Plate VII · AURELIA · brass-hull skyship, class II</span>
            <span className="vy-hangar-scale">0 — 10 — 20 — 30 m</span>
          </div>
        </section>

        {/* FARES — три посадочных талона */}
        <section className="vy-fares" id="fares">
          <div className="vy-fares-head">
            <span className="vy-kick">Three ways to cross</span>
            <h2>Choose your berth.</h2>
          </div>
          <div className="vy-fares-grid">
            {FARES.map(([code, t, d, p]) => (
              <div className="vy-fare" key={t}>
                <span className="vy-fare-code">{code}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="vy-fare-price">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WIRE — отзыв телеграммой из гавани (вместо цитаты по центру) */}
        <section className="vy-wire">
          <div className="vy-wire-slip">
            <span className="vy-wire-head">Cloudwright wire · received Amberholt 18:52</span>
            <p>Have flown a great many airlines stop never once been handed a blanket a window seat and a storm front worth watching stop all in the same afternoon stop</p>
            <span className="vy-wire-sig">— Osric Bell, correspondent · The Aldermoor Gazette</span>
          </div>
        </section>

        <Faq />

        {/* DEAL */}
        <section className="vy-deal" id="book">
          <div className="vy-deal-card">
            <span className="vy-kick">The full crossing</span>
            <div className="vy-price"><b>185</b><span>sovereigns / passenger · dawn to dusk</span></div>
            <p>One long day aboard the Aurelia — cloud-sea, isles, the storm front, and a lantern-lit arrival in Amberholt. Meals, blanket and the view included.</p>
            <a href="#" className="vy-btn">Reserve your berth</a>
            <span className="vy-note">Free to reschedule · Weather-guaranteed passage</span>
          </div>
        </section>
      </div>

      {/* CLIMAX */}
      <section className="vy-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="vy-climax-veil" aria-hidden />
        <div className="vy-climax-copy"><h2>The sky is waiting. <em>So is Amberholt.</em></h2><a href="#book" className="vy-btn">Book passage</a></div>
      </section>

      <footer className="vy-foot">
        <span className="vy-brand">CLOUDWRIGHT</span>
        <span>Skyfaring above the weather · Since 1889</span>
      </footer>
    </div>
  );
}
