"use client";
/* DUNES — «SOSSUS», a minimalist Namib design-lodge. Мир: графичный минимализм пустыни — гребень дюны как жёсткая
   линия света/тени. ОДИН ПУТНИК (DOM-актёр: крошечная фигура и её тень) идёт по гребню через все сцены:
   гребень → (тень кобальтом заливает кадр: occlude) пан с мёртвым деревом → (жёсткая полоса света проходит
   по кадру: sweep) гребень с вуалью песка → (тот же мир, свет уходит в закат: lightshift) закат, стоп-кадр 18:45.
   Тень путника удлиняется от полудня к закату (fx растягивает её вдоль земли). Лендинг рассечён той же
   диагональю гребня: свет/тень чередуются, клин тени растёт к финалу, путник спускается по швам.
   Шрифт-пейринг Anton × Work Sans, палитра apricot/rust-dune/cobalt-shadow/pale-pan + sun CTA. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, type ActorStop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./dunes.css";

const A = "/uploads/1/animated/dunes";

/* все mid — плашки (прямоугольник с фигурой, треугольник+синий прямоугольник, клякса вуали, полудиск),
   s4-fg — синяя полоса «как футер»: не используем (аудит 2026-09). Фигура — DOM-актёр. */
const scenes: ReelScene[] = [
  { id: "ridgeline", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="dn-eyebrow">A retreat in the Namib</span>
      <h1>Stand where<br /><em>the light</em> splits in two.</h1>
      <p>Six rammed-earth rooms set against the tallest dunes on Earth. One ridge of shadow, one field of sun — and nothing else on the schedule.</p>
      <div className="dn-cta"><a href="#book" className="dn-btn">Reserve a stay</a><a href="#line" className="dn-ghost">See the ridge →</a></div>
    </>
  ) },
  { id: "tree", into: "occlude", tint: "#2f3a6a", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="dn-idx">— 02 · the pan</span><h2>The Dead Tree</h2>
      <p>Six hundred years standing, roots sealed under white clay. We set our furthest room a hundred metres from it and changed nothing else.</p></>
  ) },
  { id: "crest", into: "sweep", tint: "#ffd9a0", bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="dn-idx">— 03 · the crest</span><h2>The Wind Line</h2>
      <p>Every afternoon the crest exhales a veil of gold sand into the sky. Guides call the hour by it. We just call it the best seat in the desert.</p></>
  ) },
  { id: "sunset", dark: true, into: "lightshift", tint: "#ffb04a", len: 1.2, hold: 0.56, bg: `${A}/s4-bg.webp`,
    freeze: (<div className="dn-freeze"><b>18:45</b><span>every shadow doubles</span></div>), copy: (
    <><span className="dn-idx dn-light">— 04 · the fall of light</span><h2>Long Shadow</h2>
      <p>The dunes turn the colour of coals and every shadow doubles in length. Dinner is set on the ridge, in the last ten minutes of warmth.</p></>
  ) },
];

/* путь путника: общие якоря для фигуры и тени; len — длина тени через fx (полдень коротко, закат длинно).
   В лендинге фигура живёт на швах-гребнях: невидимый «высокий» пин (50vh вниз от точки шва) даёт три такта —
   проявиться, когда шов ещё ниже середины (anchor −.4), стоять на середине, погаснуть, уехав вверх (anchor .5).
   Так путник не проплывает через контент между швами. */
type P = { at: string; x: number; y: number; s: number; o: number; len: number; dock?: boolean; anchor?: number };
const reelPath: P[] = [
  { at: reelMark("s0"), x: 63, y: 52.5, s: 1, o: 1, len: 0.8 },
  { at: reelMark("t0"), x: 60, y: 66, s: 1.05, o: 0.55, len: 0.9 },
  { at: reelMark("s1"), x: 66, y: 78, s: 0.85, o: 1, len: 0.45 },
  { at: reelMark("t1"), x: 58, y: 72, s: 0.85, o: 1, len: 0.7 },
  { at: reelMark("s2"), x: 50, y: 52, s: 0.9, o: 1, len: 1.2 },
  { at: reelMark("t2"), x: 54, y: 60, s: 0.95, o: 1, len: 1.8 },
  { at: reelMark("s3"), x: 60, y: 68, s: 1, o: 1, len: 2.6 },
  { at: ".dn-big-foot", x: 50, y: -40, s: 0.9, o: 1, len: 1.3, dock: true },
];
const seams: Array<[string, number]> = [
  [".dn-steps .dn-pin", 1.5], [".dn-clock .dn-pin", 1.7], [".dn-split .dn-pin", 1.9], [".dn-ledger .dn-pin", 2.2],
  [".dn-quote .dn-pin", 2.5], [".dn-deal .dn-pin", 2.9],
];
const path: P[] = [
  ...reelPath,
  ...seams.flatMap(([at, len]): P[] => [
    { at, anchor: -0.4, x: 50, y: 0, s: 0.85, o: 0, len, dock: true },
    { at, anchor: 0, x: 50, y: 0, s: 0.85, o: 1, len, dock: true },
    { at, anchor: 0.5, x: 50, y: 0, s: 0.85, o: 0, len, dock: true },
  ]),
  { at: ".dn-climax .dn-pin", anchor: -0.4, x: 50, y: 0, s: 1, o: 0, len: 3.4, dock: true },
  { at: ".dn-climax .dn-pin", anchor: 0, x: 50, y: 0, s: 1, o: 1, len: 3.4, dock: true },
];
const walker: ActorStop[] = path.map(({ at, anchor, x, y, s, o, dock }) => ({ at, anchor, pose: { x, y, s, o, dock } }));
const shadow: ActorStop[] = path.map(({ at, anchor, x, y, s, o, len, dock }) => ({ at, anchor, pose: { x, y, s, o: o * 0.9, fx: len, r: 9, dock } }));

const dials = [
  ["06:40", "The ridge wakes", 0.62, "18%", true],
  ["11:00", "No shade anywhere", 0.12, "2%", false],
  ["16:20", "The wind line", 0.5, "16%", false],
  ["18:45", "The long fall", 1, "58%", false],
] as const;

export function Dunes() {
  return (
    <div className="dn">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700;800&display=swap"]} />

      <header className="dn-nav">
        <span className="dn-brand">SOSSUS</span>
        <nav><a href="#line">The Line</a><a href="#stays">Stays</a><a href="#journal">Journal</a><a href="#book" className="dn-nav-cta">Reserve a stay</a></nav>
      </header>

      <Reel scenes={scenes} cue="walk the ridge ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет (--atm) и тень (--atm2) идут от полудня к закату; под первым блоком — гребень */}
      <Atmosphere stops={[
        { at: ".dn-big", color: "#f6ecd9", color2: "#2f3a6a" },
        { at: ".dn-steps", color: "#f3e3c6", color2: "#2c3664" },
        { at: ".dn-clock", color: "#efd6ae", color2: "#29325e" },
        { at: ".dn-split", color: "#ecc592", color2: "#252d56" },
        { at: ".dn-ledger", color: "#e9ab6c", color2: "#222a50" },
        { at: ".dn-quote", color: "#dc8d55", color2: "#1e2548" },
        { at: ".dn-deal", color: "#c96d3f", color2: "#1a2040" },
        { at: ".dn-climax", color: "#a8482a", color2: "#161b36" },
      ]} />
      <Backdrop from=".dn-big" dim={0.5} plates={[
        { at: ".dn-big", src: `${A}/s1-bg.webp` },
        { at: ".dn-clock", src: `${A}/s3-bg.webp` },
        { at: ".dn-quote", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
        { at: ".dn-deal", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
      ]} />
      <Weather kind="dust" count={30} color="#e8a15a" color2="#fff1d6" between={[".dn-nav", ".dn-foot"]} world={0.5} zIndex={31} />
      <Weather kind="dust" count={40} seed={17} color="#f6d9a8" color2="#e8a15a" between={[reelMark("t1"), reelMark("t2")]} world={0.3} wind={2.4} zIndex={31} />

      {/* ПУТНИК — тень (растягивается к закату) и фигура; центр актёра = ступни */}
      <Actor className="dn-shadow-actor" width="16vw" zIndex={31} bob={0} tilt={0} stops={shadow}>
        <svg className="dn-shadow" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden><polygon points="100,3.2 200,5.3 200,6.7 100,8.8" /></svg>
      </Actor>
      <Actor className="dn-walker-actor" width="1.3vw" zIndex={32} bob={1.2} tilt={0.02} stops={walker}>
        <svg className="dn-walker" viewBox="0 0 20 80" aria-hidden>
          <circle cx="10.5" cy="6" r="3.1" />
          <path d="M9.2 9.6 C6.8 12 6 20 5.2 30 L4.4 39.6 L8.6 39.6 L10.2 30.5 L11.6 39.6 L15.4 39.6 C14.8 30 14.6 18 12.6 10.8 Z" />
          <path d="M15.6 11 L18.2 39.8" strokeWidth="1.1" stroke="currentColor" fill="none" />
        </svg>
      </Actor>

      {/* BIG-TYPE — сигнатура: одна фраза поверх бледного гребня (мир просвечивает) */}
      <section className="dn-big">
        <span className="dn-big-kick">The philosophy</span>
        <p className="dn-big-line">Half the dune is <em>lit.</em><br />Half is not.</p>
        <span className="dn-big-foot">That is the whole design.</span>
      </section>

      {/* STEPS — тень */}
      <section className="dn-steps dn-shade" id="stays" style={{ ["--cut" as string]: "10vh" }}>
        <i className="dn-pin" style={{ left: "70%", top: "calc(10vh * .70)" }} aria-hidden />
        <div className="dn-steps-head"><span className="dn-kick">One day, in order</span><h2>How a stay unfolds.</h2></div>
        <ol className="dn-steps-row">
          {[["01", "Arrival", "Dusk. No wifi password, just tea on the step and the first dune going dark."],
            ["02", "Dawn Walk", "Out before the sun, to the ridge, to watch the shadow retreat off the sand."],
            ["03", "The Long Shade", "Midday inside thick rammed-earth walls — cool, dim, nothing scheduled."],
            ["04", "Ridge Dinner", "One table, set on the dune, in the last ten minutes of the light."]].map(([n, t, s], i) => (
            <li className="dn-step" key={i}><span className="dn-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* SHADOW CLOCK — тот же гребень весь день: тень растёт (вместо галереи из 4 плит) */}
      <section className="dn-clock dn-lit" style={{ ["--cut" as string]: "13vh" }}>
        <i className="dn-pin" style={{ left: "28%", top: "calc(13vh * .28)" }} aria-hidden />
        <div className="dn-clock-head"><span className="dn-kick">Four hours, one ridge</span><h2>Watch the shadow take the dune.</h2></div>
        <ol className="dn-clock-row">
          {dials.map(([time, cap, k, g, morning]) => (
            <li className="dn-dial" key={time}>
              <div className={`dn-dial-art${morning ? " dn-dial-am" : ""}`} style={{ ["--k" as string]: k, ["--g" as string]: g }} aria-hidden>
                <i className="dn-dune" /><i className="dn-dune-sh" /><i className="dn-dune-gs" />
              </div>
              <b>{time}</b><span>{cap}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* SPLIT — архитектура, на теневой плоскости */}
      <section className="dn-split dn-shade" id="line" style={{ ["--cut" as string]: "16vh" }}>
        <i className="dn-pin" style={{ left: "72%", top: "calc(16vh * .72)" }} aria-hidden />
        <div className="dn-split-copy">
          <span className="dn-kick">The architecture</span>
          <h2>We drew one hard line and stopped.</h2>
          <p>Each room follows the dune's own geometry — a solid wall for shadow, a long pane of glass for the sun. Nothing is decorated. The desert already did that.</p>
          <a href="#book" className="dn-link">Read the plans →</a>
        </div>
        <div className="dn-split-media" style={{ backgroundImage: `url(${A}/s1-bg.webp)` }} aria-hidden />
      </section>

      {/* LEDGER — цифры спускаются по диагонали гребня (вместо полосы из 4 цифр) */}
      <section className="dn-ledger dn-lit" style={{ ["--cut" as string]: "19vh" }}>
        <i className="dn-pin" style={{ left: "26%", top: "calc(19vh * .26)" }} aria-hidden />
        <span className="dn-kick dn-ledger-kick">The whole inventory</span>
        <ol className="dn-ledger-steps">
          {[["6", "rooms, no more"], ["1", "private concession"], ["40", "km to the nearest neighbour"], ["0", "scheduled activities"]].map(([n, l], i) => (
            <li key={i} style={{ ["--i" as string]: i }}><b>{n}</b><span>{l}</span></li>
          ))}
        </ol>
      </section>

      {/* QUOTE — на теневой стороне, у правого края */}
      <section className="dn-quote dn-shade" style={{ ["--cut" as string]: "24vh" }}>
        <i className="dn-pin" style={{ left: "74%", top: "calc(24vh * .74)" }} aria-hidden />
        <blockquote>“I didn't call anyone the entire stay. I didn't want to — <em>the light was doing enough</em>.”</blockquote>
        <cite>— A. Reyes, architect · Cape Town</cite>
      </section>

      {/* DEAL */}
      <section className="dn-deal dn-lit" id="book" style={{ ["--cut" as string]: "28vh" }}>
        <i className="dn-pin" style={{ left: "34%", top: "calc(28vh * .34)" }} aria-hidden />
        <div className="dn-deal-card">
          <span className="dn-kick">The Ridge Room</span>
          <div className="dn-price"><b>$780</b><span>/ night · glass wall, private plunge pool, silence</span></div>
          <p>One room, one dune, no view repeated at any hour. Concession access and all meals on the ridge are included.</p>
          <a href="#" className="dn-btn">Reserve a stay</a>
          <span className="dn-note">Two-night minimum · Six rooms only</span>
        </div>
      </section>

      {/* CLIMAX — свой финал (не «The light won't wait» как у wilds): возврат к тезису «половина в тени» */}
      <section className="dn-climax" style={{ ["--cut" as string]: "32vh", backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <i className="dn-pin" style={{ left: "64%", top: "calc(32vh * .64)" }} aria-hidden />
        <div className="dn-climax-veil" aria-hidden />
        <div className="dn-climax-copy"><h2>Half the dune is already dark. <em>Take the other half.</em></h2><a href="#book" className="dn-btn">Reserve a stay</a></div>
      </section>

      <footer className="dn-foot" id="journal"><span className="dn-brand">SOSSUS</span><span>A retreat in the Namib · Six rooms, one horizon.</span></footer>
    </div>
  );
}
