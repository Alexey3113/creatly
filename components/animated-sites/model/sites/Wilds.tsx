"use client";
/* WILDS — «VELDLIGHT». Мир: золотая африканская саванна за один долгий день — акациевый рассвет
   (жираф) → водопой утром (зебры/слон) → миграция гну в зной → одинокий баобаб на закате. Собран
   на общем движке <Reel/> v2; шрифт-пейринг Big Shoulders Display × Epilogue, палитра
   savanna-gold/acacia-green/sunset-orange/earth + sun CTA.

   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): театр жизни под одним солнцем.
   • Солнце (DOM-актёр, color-dodge) идёт по небу через все сцены: низко на рассвете за акацией →
     высоко утром → в пыли миграции → садится за баобаб; тёмные силуэты остаются ПЕРЕД ним.
   • Стадо-силуэт (актёр) растёт по масштабу: тонкая строчка на горизонте → на дальнем берегу →
     проносится у самой камеры (окклюзия миграции) → идёт на фоне закатного неба.
   • Склейки: путь по равнине (pan) → стадо перекрывает кадр (occlude, пыль) → закатный свет (sweep).
   • Лендинг: «дуга солнца» закреплена — солнце идёт по дуге, стадо по горизонту, плита мира под блоком
     сменяется по часам дня; цифры живут на дуге, а не полосой. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, clamp01 } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./wilds.css";

const A = "/uploads/1/animated/wilds";
const scenes: ReelScene[] = [
  { id: "acacia", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="wl-eyebrow">Photographic Safaris · Great Rift Savanna</span>
      <h1>Chase the light,<br /><em>not the checklist.</em></h1>
      <p>One outfitter, one open vehicle, fourteen hours of the best light on the continent — from the acacia line at dawn to a lone baobab at dusk.</p>
      <div className="wl-cta"><a href="#camp" className="wl-btn">Reserve your day</a><a href="#day" className="wl-ghost">See the day →</a></div>
    </>
  ) },
  { id: "waterhole", into: "pan", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, copy: (
    <><span className="wl-idx">— 02 · the gathering</span><h2>The Waterhole</h2>
      <p>By mid-morning the plain empties into one flat mirror. Elephant, zebra, giraffe — nobody hurries here, and neither do you.</p></>
  ) },
  { id: "migration", into: "occlude", tint: "#8a6a3e", len: 1.25, hold: 0.56, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="wl-freeze"><b>250,000</b><span>hooves on the move · 13:00</span></div>), copy: (
    <><span className="wl-idx">— 03 · the crossing</span><h2>The Migration</h2>
      <p>Thunderheads build as the herd comes through — a quarter-million wildebeest, dust to the clouds, ground moving under the vehicle.</p></>
  ) },
  { id: "baobab", dark: true, into: "sweep", tint: "#ff9a4a", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 8, copy: (
    <><span className="wl-idx wl-light">— 04 · last light</span><h2 className="wl-hl">The Baobab</h2>
      <p className="wl-pl">One tree has stood here eight centuries. We park beneath it and let the sky finish the day for us — no schedule, no rush back.</p></>
  ) },
];

/* часы дня на дуге: точка дуги (x,y в vw/vh закреплённой сцены), цифра дня живёт здесь же */
const ARC = [
  { t: "05:40", n: "Acacia Dawn", s: "Mist burns off the grass while a giraffe browses alone against the light.", big: "14 hrs", bl: "of guided light, gate to gate" },
  { t: "09:30", n: "The Waterhole", s: "Zebra and elephant share one still mirror of water before the heat sets in.", big: "6", bl: "guests per vehicle — nobody shooting over your shoulder" },
  { t: "13:00", n: "The Migration", s: "The wildebeest line crosses the plain, dust rising to meet the storm light.", big: "250,000+", bl: "wildebeest crossing, every single year" },
  { t: "18:20", n: "The Baobab", s: "We park beneath eight centuries of shade and let the sky close the day.", big: "1,247 km²", bl: "private concession — no other operator, ever" },
];
/* дуга: квадратичная кривая в зоне 8..92vw × 30..64vh; 7 маркеров трека → поза солнца */
const ARC_PTS: [number, number][] = [[18.6, 53.2], [29.2, 44.6], [39.8, 39.5], [50, 37.9], [60.2, 39.5], [70.8, 44.6], [81.4, 53.2]];

const KIT = [
  ["Private Concession", "1,247 km² held under a single lease — no other operator's vehicles, ever, on our roads."],
  ["Naturalist–Tracker Pairs", "Every vehicle carries a guide and a Maa-speaking tracker, radioing the herd's position hour by hour."],
  ["Ground-Level Hides", "Floating hides at the waterline put the camera at eye height with the elephant, not above it."],
  ["Star-Bed Camps", "Canvas walls roll back completely. You sleep to the sound of the migration, not a fence."],
];

/* активная точка дуги: data-hour на секции по прогрессу закреплённого трека */
function useArcHour(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = "";
    return subscribe(({ vh }) => {
      const r = el.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, el.offsetHeight - vh));
      const h = String(Math.min(3, Math.floor(p * 4)));
      if (h !== last) { last = h; el.dataset.hour = h; }
      el.style.setProperty("--arc", p.toFixed(3));
    });
  }, [ref]);
}

export function Wilds() {
  const arcRef = useRef<HTMLElement>(null);
  useArcHour(arcRef);
  const mk = (i: number) => `.wl-arc-m:nth-of-type(${i + 1})`;
  return (
    <div className="wl">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"]} />
      <header className="wl-nav">
        <span className="wl-brand">VELDLIGHT</span>
        <nav>
          <a href="#day">The day</a>
          <a href="#kit">Concession</a>
          <a href="#camp">Camp</a>
          <a href="#camp" className="wl-nav-cta">Reserve your day</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="the day unfolds ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет дня под лендингом привязан к дуге солнца */}
      <Atmosphere stops={[
        { at: ".wl-big", color: "#3a2a14" }, { at: mk(0), color: "#4a3418" }, { at: mk(2), color: "#4d3a1e" },
        { at: mk(4), color: "#4a3620" }, { at: mk(6), color: "#4a200e" }, { at: ".wl-kit", color: "#2a1a0a" },
        { at: ".wl-split", color: "#241608" }, { at: ".wl-deal", color: "#1b1006" }, { at: ".wl-climax", color: "#130b04" },
      ]} />
      <Backdrop from=".wl-big" dim={0.56} plates={[
        { at: ".wl-big", src: `${A}/s1-bg.webp` }, { at: mk(0), src: `${A}/s1-bg.webp` }, { at: mk(2), src: `${A}/s2-bg.webp` },
        { at: mk(4), src: `${A}/s3-bg.webp` }, { at: mk(6), src: `${A}/s4-bg.webp` }, { at: ".wl-kit", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
      ]} />

      {/* СОЛНЦЕ — через все сцены и по дуге дня; color-dodge оставляет тёмные силуэты перед диском */}
      <Actor className="wl-sun-actor" width="16vw" zIndex={29} bob={0} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 87, y: 47, s: 0.95 } },
        { at: reelMark("t0"), pose: { x: 76, y: 34, s: 0.9 } },
        { at: reelMark("s1"), pose: { x: 66, y: 20, s: 0.78 } },
        { at: reelMark("t1"), pose: { x: 56, y: 14, s: 0.8, o: 0.6 } },
        { at: reelMark("s2"), pose: { x: 46, y: 16, s: 1.15, o: 0.55, blur: 8 } },
        { at: reelMark("t2"), pose: { x: 58, y: 36, s: 1.25, o: 0.9, blur: 2 } },
        { at: reelMark("s3"), pose: { x: 64, y: 60, s: 1.6, o: 1 } },
        { at: reelMark("end"), pose: { x: 64, y: 66, s: 1.5, o: 0.7 } },
        { at: ".wl-big", pose: { x: 22, y: 70, s: 0.8, o: 0 } },
        ...ARC_PTS.map(([x, y], i) => ({ at: mk(i), pose: { x, y, s: i === 0 || i === 6 ? 0.9 : 0.7, o: 1 } })),
        { at: ".wl-kit", pose: { x: 88, y: 70, s: 0.8, o: 0 } },
      ]}><div className="wl-sun" /></Actor>

      {/* СТАДО — силуэт растёт по масштабу: горизонт → дальний берег → у камеры → на фоне заката → по дуге */}
      <Actor src={`${A}/s3-mid.webp`} className="wl-herd" width="60vw" zIndex={30} bob={1} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 91, y: 51.5, s: 0.17, o: 0.85 } },
        { at: reelMark("t0"), pose: { x: 70, y: 55, s: 0.24, o: 0.6 } },
        { at: reelMark("s1"), pose: { x: 80, y: 51, s: 0.3, o: 0.85 } },
        { at: reelMark("t1"), pose: { x: 46, y: 58, s: 3.8, o: 1, blur: 2.5 } },
        { at: reelMark("s2"), pose: { x: 30, y: 64, s: 2.2, o: 0, blur: 3 } },
        { at: reelMark("t2"), pose: { x: 30, y: 66, s: 0.7, o: 0 } },
        { at: reelMark("s3"), pose: { x: 34, y: 63, s: 0.72, o: 0.95 } },
        { at: reelMark("end"), pose: { x: 30, y: 64, s: 0.7, o: 0.9 } },
        { at: ".wl-big", pose: { x: 20, y: 96, s: 0.4, o: 0 } },
        { at: mk(0), pose: { x: 22, y: 88, s: 0.32, o: 0.9 } },
        { at: mk(6), pose: { x: 76, y: 88, s: 0.6, o: 0.9 } },
        { at: ".wl-kit", pose: { x: 90, y: 96, s: 0.6, o: 0 } },
      ]} />

      <Weather kind="dust" count={46} color="#f0cf96" color2="#d9a94a" between={[reelMark("t1"), reelMark("t2")]} world={0.3} wind={1.6} zIndex={31} />

      {/* BIG-TYPE — тезис театра жизни, на рассветной плите */}
      <section className="wl-big">
        <p>Nothing here hides from the light. <em>Every hour puts something new on stage</em> under one enormous sky.</p>
      </section>

      {/* DAY ARC — закреплённая дуга солнца: солнце идёт по ней, стадо по горизонту, плита мира меняется по часам */}
      <section className="wl-arc" id="day" ref={arcRef} data-hour="0">
        {ARC_PTS.map((_, i) => <i key={i} className="wl-arc-m" aria-hidden style={{ top: `calc(${50 + i * 40}vh)` }} />)}
        <div className="wl-arc-stage">
          <div className="wl-arc-head"><span className="wl-kick">Dawn to dusk, on the ground</span><h2>One day under one sun</h2></div>
          <svg className="wl-arc-path" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden focusable="false">
            <path d="M40,280 Q600,-140 1160,280" fill="none" vectorEffect="non-scaling-stroke" />
            {[[152, 204], [454, 84], [746, 84], [1048, 204]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="6" className="wl-arc-dot" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="wl-arc-grid">
            {ARC.map((w, i) => (
              <div className="wl-arc-way" key={i} data-i={i}>
                <span className="wl-arc-t">{w.t}</span><h3>{w.n}</h3><p>{w.s}</p>
                <b className="wl-arc-big">{w.big}</b><span className="wl-arc-bl">{w.bl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE-CARDS — capabilities handled for the guest */}
      <section className="wl-kit" id="kit">
        <div className="wl-kit-head"><span className="wl-kick">What the concession gives you</span><h2>Built For the Long Light</h2></div>
        <div className="wl-kit-grid">
          {KIT.map(([t, s], i) => (
            <div className="wl-kit-card" key={i}><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SPLIT — method credibility */}
      <section className="wl-split">
        <div className="wl-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="wl-split-copy">
          <span className="wl-kick">Scouted before you arrive</span>
          <h2>We track the herd before we find you a seat.</h2>
          <p>Every vehicle radios into a live network of six trackers moving the concession all day. You are never driving in blind — the seat you get was chosen an hour before you climbed in.</p>
          <a href="#day" className="wl-link">See the day →</a>
        </div>
      </section>

      {/* FIELD CAPTION — отзыв подписью к кадру (вместо цитаты по центру) */}
      <section className="wl-quote">
        <figure>
          <blockquote>&ldquo;We watched the crossing from ground height, dust in our teeth, and I have never felt smaller or more awake in my life.&rdquo;</blockquote>
          <figcaption><span>600 mm · f/5.6 · 1/2000 s · 13:04</span>Priya N., photographer — third safari</figcaption>
        </figure>
      </section>

      {/* DEAL — three-tier pricing */}
      <section className="wl-deal" id="camp">
        <div className="wl-deal-head"><span className="wl-kick">Choose your day</span><h2>The Concession, Your Way</h2></div>
        <div className="wl-deal-grid">
          <div className="wl-deal-card">
            <h3>Dawn &amp; Dusk</h3>
            <div className="wl-price"><b>$420</b><span>/ guest</span></div>
            <p>Two gate-to-gate drives, golden hours only. Built for a short stopover between camps.</p>
            <a href="#" className="wl-ghost-btn">Reserve dawn &amp; dusk</a>
          </div>
          <div className="wl-deal-card wl-deal-featured">
            <span className="wl-deal-tag">Most booked</span>
            <h3>The Full Day</h3>
            <div className="wl-price"><b>$980</b><span>/ guest</span></div>
            <p>Fourteen hours, one vehicle, six guests max — the acacia line at dawn to the last light on the baobab.</p>
            <a href="#" className="wl-btn">Reserve your day</a>
          </div>
          <div className="wl-deal-card">
            <h3>Private Concession</h3>
            <div className="wl-price"><b>$2,400</b><span>/ vehicle</span></div>
            <p>Your own vehicle and guide for the full day, your own party only — no strangers aboard.</p>
            <a href="#" className="wl-ghost-btn">Reserve the vehicle</a>
          </div>
        </div>
        <span className="wl-note">Confirmed within 24 hours · Free to reschedule for weather</span>
      </section>

      {/* CLIMAX — свой финал (не клон dunes) */}
      <section className="wl-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="wl-climax-veil" aria-hidden />
        <div className="wl-climax-copy"><h2>Be under the baobab <em>when the sky closes.</em></h2><a href="#camp" className="wl-btn">Reserve your day</a></div>
      </section>

      <footer className="wl-foot"><span className="wl-brand">VELDLIGHT</span><span>Photographic safaris across the Great Rift · One long day, start to end.</span></footer>
    </div>
  );
}
