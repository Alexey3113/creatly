"use client";
/* NOMAD — «WINDMANE». Мир: пленэр степи, огромное небо и малый человек — золотая трава → табун →
   войлочный лагерь → перевал в сумерках. Путь ГОРИЗОНТАЛЬНЫЙ: камера едет вбок (pan), пыль табуна
   закрывает кадр (occlude) и под ней уже лагерь, снова pan — к перевалу, где реально темнеет.
   Сквозной актёр — ТАБУН: бежит вправо вместе с камерой на линии горизонта, проносится мимо камеры
   (окклюзия), мелькает на хребте у перевала; в лендинге бежит по закреплённой горизонтальной панораме
   маршрута и по кромке карточки брони.
   Шрифт-пейринг Unbounded × Schibsted Grotesk, палитра gold-grass/steppe-sky/felt/saddle + sun CTA. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth, clamp01 } from "@/components/scene-kit";
import "./nomad.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/nomad";
const scenes: ReelScene[] = [
  { id: "grassland", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="nm-eyebrow">Windmane Expeditions · open tal</span>
      <h1>Forty horses.<br /><em>One horizon.</em></h1>
      <p>Six days on horseback across open steppe — golden grass, a running herd, a felt camp and a pass that ends in sky. No fences. No itinerary past sundown.</p>
      <div className="nm-cta"><a href="#ride" className="nm-btn">Join a ride</a><a href="#route" className="nm-ghost">See the line →</a></div>
    </>
  ) },
  { id: "herd", into: "pan", tint: "#e9dcb4", len: 1.1, bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="nm-idx">— 02 · the running herd</span><h2>Ride With the Herd</h2>
      <p>Forty horses break into a run and your mount goes with them — no lead rope, no line, just dust and hooves and the old instinct to run when the herd runs.</p></>
  ) },
  { id: "camp", into: "occlude", tint: "#d9c08a", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, copy: (
    <><span className="nm-idx">— 03 · the felt camp</span><h2>Camp at the Edge of the Grass</h2>
      <p>A white ger, an open door, a fire lit the same way for a thousand years. You arrive saddle-sore and leave slower than you came.</p></>
  ) },
  { id: "pass", dark: true, into: "pan", tint: "#e0894a", len: 1.3, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5,
    freeze: (<div className="nm-freeze"><b>180 km</b><span>day six · not one fence</span></div>), copy: (
    <><span className="nm-idx nm-light">— 04 · the last light</span><h2 className="nm-hl">The Pass at Dusk</h2>
      <p className="nm-pl">The trail climbs into shadow while the peaks keep the last of the gold. This is where riders stop talking — the sky has said it already.</p></>
  ) },
];

/* маршрут на закреплённой панораме: позиция (vw по дорожке), день, км, название, строка */
const STOPS: Array<[number, string, string, string, string]> = [
  [22, "Day 1", "km 0", "Saddle Up", "Meet your horse at first camp — hand-fitted tack, a riding briefing, a spare mount held for the whole line."],
  [88, "Day 2", "km 40", "The Open Tal", "Long flat days with the wind at your back. Forty kilometres of gold grass before anyone thinks about lunch."],
  [158, "Day 3", "40+ horses", "Run With the Herd", "The free horses fall in beside the line. Your horse remembers how to run before you decide to let it."],
  [228, "Day 4", "4 nights under felt", "Camp Under Felt", "Ger, fire, airag, and a sky with no city left in it anywhere. One guide for every four riders."],
  [300, "Day 6", "km 180", "Climb the Pass", "The final ascent at dusk — prayer flags, thin air, and the ridge that ends the ride."],
];

/* сквозное значение по якорям */
function follow(sel: string[], vals: number[], cb: (v: number) => void) {
  const els = selectorCache(sel);
  let last = Infinity;
  return subscribe(({ vh }) => {
    const s = segment(els(), vh);
    if (!s) return;
    const v = vals[s.a] + (vals[s.b] - vals[s.a]) * smooth(s.t);
    if (Math.abs(v - last) > 1e-4) { last = v; cb(v); }
  });
}

export function Nomad() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // сумерки гасят табун в силуэт (перевал) и снова светлеют к рассвету в финале лендинга
    const offDusk = follow([reelMark("s2"), reelMark("s3"), ".nm-pano", ".nm-deal"], [0.1, 0.85, 0.35, 0.1], (v) => el.style.setProperty("--nm-dusk", v.toFixed(3)));
    // закреплённая панорама маршрута: прогресс секции → сдвиг дорожки
    const pano = el.querySelector<HTMLElement>(".nm-pano");
    const offPan = subscribe(({ vh }) => {
      if (!pano) return;
      const r = pano.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height - vh));
      pano.style.setProperty("--nm-pan", p.toFixed(4));
    });
    return () => { offDusk(); offPan(); };
  }, []);

  return (
    <div className="nm" ref={root}>
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap"]} />
      <header className="nm-nav">
        <span className="nm-brand">WINDMANE</span>
        <nav>
          <a href="#route">The line</a>
          <a href="#kit">What&apos;s carried</a>
          <a href="#ride" className="nm-nav-cta">Join a ride</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="ride →" />

      {/* СКВОЗНОЙ СЛОЙ: пыль табуна, звёзды над перевалом, небо под лендингом, табун */}
      <Atmosphere stops={[
        { at: ".nm-panorama", color: "#1e2740" }, { at: ".nm-pano", color: "#141d31" }, { at: ".nm-kit", color: "#18253c" },
        { at: ".nm-quote", color: "#2a2c3c" }, { at: ".nm-faq", color: "#3a3a3e" }, { at: ".nm-deal", color: "#4a3f2c" },
      ]} />
      <Backdrop className="nm-bd" from=".nm-panorama" dim={0.5} plates={[
        { at: ".nm-panorama", src: `${A}/s4-bg.webp` }, { at: ".nm-kit", src: `${A}/s3-bg.webp` },
        { at: ".nm-quote", src: `${A}/s3-bg.webp` }, { at: ".nm-faq", src: `${A}/s1-bg.webp` }, { at: ".nm-deal", src: `${A}/s1-bg.webp` },
      ]} />
      <Weather kind="dust" count={26} color="#f0dca6" color2="#fff3cf" between={[reelMark("s0"), reelMark("t2")]} world={0.6} wind={1.6} zIndex={31} />
      <Weather kind="stars" count={34} color="#fff6dc" between={[reelMark("t2"), ".nm-kit"]} world={0.2} zIndex={30} />
      <Actor className="nm-herd" src={`${A}/actor-herd.webp`} width="20vw" zIndex={32} bob={2} tilt={0.05} stops={[
        { at: reelMark("s0"), pose: { x: 33, y: 62, s: 0.6, o: 1 } },
        { at: reelMark("t0"), pose: { x: 50, y: 66, s: 0.9, o: 1 } },
        { at: reelMark("s1"), pose: { x: 58, y: 73, s: 1.35, o: 1 } },
        { at: reelMark("t1"), pose: { x: 64, y: 76, s: 4.4, o: 1, blur: 7 } },
        { at: reelMark("s2"), pose: { x: 112, y: 60, s: 0.5, o: 0 } },
        { at: reelMark("t2"), pose: { x: 18, y: 58, s: 0.3, o: 0 } },
        { at: reelMark("s3"), pose: { x: 40, y: 66, s: 0.3, o: 1 } },
        { at: reelMark("end"), pose: { x: 40, y: 66, s: 0.3, o: 1 } },
        { at: ".nm-rail", anchor: 0.5, pose: { x: 26, y: 80, s: 0.42, o: 1, dock: true } },
        { at: ".nm-pano", anchor: 0.1, pose: { x: 50, y: 66, s: 0.62, o: 1 } },
        { at: ".nm-pano", anchor: 0.9, pose: { x: 50, y: 66, s: 0.62, o: 1 } },
        { at: ".nm-kit", pose: { x: 115, y: 50, s: 0.5, o: 0 } },
        { at: ".nm-deal-card", pose: { x: 26, y: -5, s: 0.4, o: 1, dock: true } },
        { at: ".nm-climax", pose: { x: 110, y: 40, s: 0.4, o: 0 } },
      ]} />

      {/* BIG-TYPE PANORAMA — одна фраза на горизонте; табун бежит по линии */}
      <section className="nm-panorama">
        <span className="nm-horizon-line" aria-hidden />
        <p>The steppe doesn&apos;t end — it just gets farther away.</p>
        <div className="nm-rail" aria-hidden><span className="nm-horizon-line" /></div>
      </section>

      {/* PANO — закреплённый горизонтальный скролл маршрута (вместо шагов, галереи×4 и цифр×4) */}
      <section className="nm-pano" id="route" aria-label="The route, west to east">
        <div className="nm-pano-pin">
          <div className="nm-pano-head"><span className="nm-kick">Six days, one line · west to east</span><h2>The route rides past you.</h2></div>
          <div className="nm-pano-track">
            {[1, 2, 3, 4].map((n) => (
              <div className={`nm-pano-plate nm-pano-p${n}`} key={n} style={{ backgroundImage: `url(${A}/s${n}-bg.webp)` }} aria-hidden />
            ))}
            <span className="nm-pano-horizon" aria-hidden />
            {STOPS.map(([x, d, k, t, s]) => (
              <article className="nm-stop" key={t} style={{ left: `${x}vw` }}>
                <span className="nm-stop-pin" aria-hidden />
                <span className="nm-stop-day">{d} · <b>{k}</b></span>
                <h3>{t}</h3>
                <p>{s}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE-CARDS — что везут за тебя */}
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

      {/* QUOTE — у горизонта, не по центру */}
      <section className="nm-quote">
        <blockquote>&ldquo;Forty horses decided, all at once, to run — and mine went with them <em>before I&apos;d made the choice myself</em>.&rdquo;</blockquote>
        <cite>— Dana R., rider · third crossing</cite>
      </section>

      {/* FAQ/ACCORDION */}
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

      {/* DEAL — табун бежит по кромке карточки */}
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
        <div className="nm-climax-copy"><h2>The herd leaves at first light. <em>Ride with it.</em></h2><a href="#ride" className="nm-btn">Join a ride</a></div>
      </section>

      <footer className="nm-foot"><span className="nm-brand">WINDMANE</span><span>Horseback expeditions across the open tal · Ridden, not toured</span></footer>
    </div>
  );
}
