"use client";
/* EMBERROAD — «Amberline» guided desert caravan crossings. Мир: жар полуденных дюн остывает в звёздную ночь —
   путь как смена температуры. ОДНА НИТЬ КАРАВАНА идёт вправо по линии горизонта: дюны → (камера едет вбок, pan)
   оазис → (свет становится цвета «чиркнувшей спички», lightshift) буря → (стена песка накрывает кадр, occlude)
   ночь у костра → и дальше по закреплённой полосе маршрута в лендинге. Лендинг держит дугу жар → ночь
   (Atmosphere + плиты мира), температуру ведёт закреплённый термометр 38° → 4°.
   Шрифты Libre Caslon Display × IBM Plex Sans, палитра ochre/rust/sand/indigo-night + amber CTA. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./emberroad.css";

const A = "/uploads/1/animated/emberroad";

/* s2/s4-mid — прямоугольные «холсты в небе», s3-mid — клякса бури: не используем (аудит 2026-09) */
const scenes: ReelScene[] = [
  { id: "dunes", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, midPos: "75% 86%", copy: (
    <>
      <span className="er-eyebrow">Guided desert crossings · five nights, one road</span>
      <h1>Walk until<br /><em>the heat breaks.</em></h1>
      <p>A painted caravan line from the sunlit dune wall to a cold camp under the Milky Way — on foot and by camel, with a guide who has walked this stretch eleven dry seasons running.</p>
      <div className="er-cta"><a href="#crossing" className="er-btn">Book a crossing</a><a href="#route" className="er-ghost">See the route →</a></div>
    </>
  ) },
  { id: "oasis", into: "pan", tint: "#e9c88a", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="er-idx">— 02 · nine palms oasis</span><h2>The Green Hour</h2>
      <p>Palm shade and a mirror of still water. We stop here two full days — you drink, you rest, the camels drink twice their weight before the storm-season stretch.</p></>
  ) },
  { id: "storm", dark: true, into: "lightshift", tint: "#c9762f", bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="er-idx er-light">— 03 · the ochre wall</span><h2 className="er-hl">Into the Sandstorm</h2>
      <p className="er-pl">The wind turns the sky the colour of a struck match. Ropes go on, faces wrap, and six travelers become one line instead — this is the stretch you'll tell people about.</p></>
  ) },
  { id: "camp", dark: true, into: "occlude", tint: "#2a1c14", len: 1.2, hold: 0.56, spark: 8, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`,
    freeze: (<div className="er-freeze"><b>4°</b><span>Starfall Camp · midnight</span><span>thirty-eight at noon</span></div>), copy: (
    <><span className="er-idx er-light">— 04 · starfall camp</span><h2 className="er-hl">Camp Under the Milky Way</h2>
      <p className="er-pl">The fire goes up before the cold does. The storm is behind you, the camels are down, and you'll fall asleep under more stars than you knew existed.</p></>
  ) },
];

const waypoints = [["Sungate Well", "0 km"], ["The Salt Flats", "38 km"], ["Nine Palms Oasis", "91 km"], ["The Ochre Throat", "154 km"], ["Starfall Camp", "208 km"]];

const steps = [
  ["01", "Dawn Briefing", "Camels loaded before the sun clears the dunes. Route, water rationing and the day's heat window, laid out at the fire."],
  ["02", "The Long Light", "Six to eight hours walking the dune spine, ochre light, one long shadow ahead of you the whole way."],
  ["03", "The Ochre Wall", "We read the storm before it reads us. When the sky changes colour, we rope in and turn side-on to the wind."],
  ["04", "Embers & Stars", "Camp goes up in forty minutes flat. Then the sky opens, and someone always asks which one is Polaris."],
];

/* термометр: y шкалы (% экрана) для температуры: 38° → 27vh … 4° → 77vh */
const tY = (t: number) => +(27 + ((38 - t) / 34) * 50).toFixed(2);
const thermoTicks = [38, 30, 20, 10, 4];

export function Emberroad() {
  return (
    <div className="er">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"]} />
      <header className="er-nav">
        <span className="er-brand">AMBERLINE</span>
        <nav>
          <a href="#route">The Route</a>
          <a href="#crossing" className="er-nav-cta">Book a crossing</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="onward →" />

      {/* СКВОЗНОЙ СЛОЙ: дуга жар → ночь, плиты мира под блоками, песок днём, звёзды ночью */}
      <Atmosphere stops={[
        { at: ".er-route", anchor: 0.7, color: "#231f36" },
        { at: ".er-manifest", color: "#f2dcaa" }, { at: ".er-steps", color: "#e8c68c" },
        { at: ".er-quote", color: "#c9762f" }, { at: ".er-split", color: "#6e2c16" },
        { at: ".er-deal", color: "#282440" }, { at: ".er-climax", color: "#101729" },
      ]} />
      <Backdrop from=".er-route" dim={0.58} plates={[
        { at: ".er-route", src: `${A}/s1-bg.webp`, pos: "50% 60%" },
        { at: ".er-manifest", src: `${A}/s1-bg.webp` },
        { at: ".er-steps", src: `${A}/s2-bg.webp` },
        { at: ".er-quote", src: `${A}/s3-bg.webp` },
        { at: ".er-split", src: `${A}/s3-bg.webp` },
        { at: ".er-deal", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
      ]} />
      <Weather kind="dust" count={34} color="#e9c88a" color2="#c9762f" between={[".er-nav", reelMark("t2")]} world={0.4} wind={1.6} zIndex={31} />
      <Weather kind="stars" count={40} color="#fff4d6" between={[reelMark("t2"), ".er-manifest"]} world={0.08} zIndex={30} />
      <Weather kind="dust" count={18} seed={5} color="#8a3a1f" color2="#e9c88a" between={[".er-manifest", ".er-deal"]} world={0.5} zIndex={31} />
      <Weather kind="stars" count={34} seed={9} color="#fff4d6" between={[".er-deal", ".er-foot"]} world={0.08} zIndex={30} />

      {/* костёр ночного лагеря — DOM-свечение на земле (mid лагеря был «картиной на мольберте») */}
      <Actor className="er-fire-actor" width="18vw" zIndex={29} bob={0} tilt={0} stops={[
        { at: reelMark("t2"), pose: { x: 70, y: 79, s: 0.5, o: 0 } },
        { at: reelMark("s3"), pose: { x: 70, y: 79, s: 1, o: 1 } },
        { at: reelMark("end"), pose: { x: 70, y: 79, s: 1, o: 1 } },
        { at: ".er-route", anchor: 0.2, pose: { x: 70, y: 70, s: 0.6, o: 0 } },
      ]}><div className="er-fire"><i /><i /></div></Actor>

      {/* КАРАВАН — одна нить на линии горизонта через день, бурю и ночь, затем по полосе маршрута */}
      <Actor src={`${A}/actor-caravan.webp`} width="14vw" zIndex={32} bob={1.5} tilt={0.04} stops={[
        { at: reelMark("s0"), pose: { x: 60, y: 54, s: 0.5, o: 0 } },
        { at: reelMark("t0"), pose: { x: 56, y: 58, s: 0.6, o: 1 } },
        { at: reelMark("s1"), pose: { x: 72, y: 61, s: 0.64, o: 1 } },
        { at: reelMark("t1"), pose: { x: 74, y: 62, s: 0.66, o: 1 } },
        { at: reelMark("s2"), pose: { x: 64, y: 66, s: 0.7, o: 0.85, blur: 1.2 } },
        { at: reelMark("t2"), pose: { x: 70, y: 67, s: 0.7, o: 0.1, blur: 3 } },
        { at: reelMark("s3"), pose: { x: 83, y: 74, s: 0.66, o: 1, blur: 0 } },
        { at: reelMark("end"), pose: { x: 84, y: 74, s: 0.66, o: 1 } },
        { at: ".er-route", anchor: 0.27, pose: { x: 10, y: 57.6, s: 0.62, o: 1 } },
        { at: ".er-route", anchor: 0.385, pose: { x: 30, y: 57.6, s: 0.62, o: 1 } },
        { at: ".er-route", anchor: 0.5, pose: { x: 50, y: 57.6, s: 0.62, o: 1 } },
        { at: ".er-route", anchor: 0.615, pose: { x: 70, y: 57.6, s: 0.62, o: 1 } },
        { at: ".er-route", anchor: 0.73, pose: { x: 90, y: 57.6, s: 0.62, o: 1 } },
        { at: ".er-manifest", pose: { x: 104, y: 40, s: 0.62, o: 0 } },
      ]} />

      {/* ТЕРМОМЕТР 38° → 4° — закреплён у правого края лендинга, бусина опускается с каждой главой */}
      <Actor className="er-thermo-actor" width="8vw" zIndex={34} bob={0} tilt={0} stops={[
        { at: ".er-route", pose: { x: 93, y: 52, o: 0 } },
        { at: ".er-manifest", anchor: 0.2, pose: { x: 93, y: 52, o: 1 } },
        { at: ".er-climax", pose: { x: 93, y: 52, o: 1 } },
        { at: ".er-foot", pose: { x: 93, y: 52, o: 0 } },
      ]}>
        <div className="er-thermo">
          {thermoTicks.map((t) => <span key={t} style={{ top: `${(((tY(t) - 26) / 52) * 100).toFixed(2)}%` }}>{t}°</span>)}
        </div>
      </Actor>
      <Actor width="14px" zIndex={35} bob={0} tilt={0} stops={[
        { at: ".er-route", pose: { x: 95, y: tY(38), o: 0 } },
        { at: ".er-manifest", anchor: 0.2, pose: { x: 95, y: tY(38), o: 1 } },
        { at: ".er-steps", pose: { x: 95, y: tY(32), o: 1 } },
        { at: ".er-quote", pose: { x: 95, y: tY(26), o: 1 } },
        { at: ".er-split", pose: { x: 95, y: tY(19), o: 1 } },
        { at: ".er-deal", pose: { x: 95, y: tY(10), o: 1 } },
        { at: ".er-climax", pose: { x: 95, y: tY(4), o: 1 } },
        { at: ".er-foot", pose: { x: 95, y: tY(4), o: 0 } },
      ]}><i className="er-bead" /></Actor>

      {/* ROUTE — закреплённая линия горизонта с колодцами: караван идёт по ней (вместо marquee) */}
      <section className="er-route" id="route" aria-label="The route, well by well">
        <div className="er-route-pin">
          <div className="er-route-head"><span className="er-kick er-kick-light">Five nights · 208 km</span><h2>The route, well by well.</h2></div>
          <div className="er-route-line" aria-hidden />
          <ol className="er-route-wps">
            {waypoints.map(([name, km], i) => (
              <li className="er-wp" key={name} style={{ left: `${10 + i * 20}%` }}><i aria-hidden /><b>{name}</b><span>{km}</span></li>
            ))}
          </ol>
        </div>
      </section>

      {/* MANIFESTO — полдень */}
      <section className="er-manifest">
        <p>Comfort is a room with the door shut. <em>We are asking you to leave it open</em> — dune, wind, cold — and walk until the temperature itself becomes the story.</p>
      </section>

      {/* STEPS — горизонтальный процесс (после полудня) */}
      <section className="er-steps">
        <div className="er-steps-head"><span className="er-kick">Five nights, four chapters</span><h2>How a crossing runs.</h2></div>
        <ol className="er-steps-row">
          {steps.map(([n, t, s]) => (
            <li key={n}><span className="er-step-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* QUOTE — охра, перед бурей */}
      <section className="er-quote">
        <blockquote>"I've backpacked on four continents and never felt looked after like this. By the third night the desert stopped being frightening and started being — <em>enormous, in a way that felt like a gift</em>."</blockquote>
        <cite>— Priya N., trail guide · Manali</cite>
      </section>

      {/* SPLIT — буря */}
      <section className="er-split">
        <div className="er-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="er-split-copy">
          <span className="er-kick er-kick-light">Why walk it with us</span>
          <h2>We scouted every dune before we asked you to climb one.</h2>
          <p>Eleven dry seasons on this stretch of road — where the wells still hold water, which ridge the storm season favours, and the exact hour the temperature turns. Eight travelers to a caravan, never more. You are never the first ones finding it out.</p>
          <a href="#crossing" className="er-link">Meet the guides →</a>
        </div>
      </section>

      {/* DEAL — сумерки */}
      <section className="er-deal" id="crossing">
        <div className="er-deal-card">
          <span className="er-kick er-kick-light">The Ember Road crossing</span>
          <div className="er-price"><b>$1,480</b><span>/ traveler · camel support, guide, tents &amp; the painted route notes</span></div>
          <p>Five nights, four chapters, eight travelers to a caravan. Departures follow the cool season — book a window and we send the illustrated route plan two weeks out.</p>
          <a href="#" className="er-btn">Reserve a departure</a>
          <span className="er-note">Free date change · Storm-season guaranteed</span>
        </div>
      </section>

      {/* CLIMAX — ночь */}
      <section className="er-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="er-climax-veil" aria-hidden />
        <div className="er-climax-copy"><h2>Somewhere past the storm, <em>the fire is already lit.</em></h2><a href="#crossing" className="er-btn">Book a crossing</a></div>
      </section>

      <footer className="er-foot">
        <span className="er-brand">AMBERLINE</span>
        <span>Guided desert crossings · Walked eleven years before we ever sold it</span>
      </footer>
    </div>
  );
}
