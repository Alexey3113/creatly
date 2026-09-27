"use client";
/* HIGHLAND — «Drystane», Highland walking tours & whisky-ruins heritage travel. Мир: переменчивая
   погода как драма над вереском и камнем — вереск-морда → тёмный лох → руина в тумане → шторм,
   расходящийся в радугу. Собран на общем движке <Reel/>; шрифт-пейринг Playfair Display × Public Sans,
   палитра heather/slate/moss/gorse-gold + gold CTA.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): один путник в капюшоне идёт через все холмы к руине и дальше —
   по той же сухой каменной стене, которая в лендинге кладётся от скролла миля за милей. Над ним бежит
   ТЕНЬ ОБЛАКА: она открывает следующую сцену (луч-sweep), тянет туман на подъёме к руине, сгущается в
   дождевой занавес (окклюзия) и уходит, оставляя радугу. В лендинге секции чередуют свет и тень облака. */
import { useEffect, useRef, useState } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, clamp01 } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./highland.css";

const A = "/uploads/1/animated/highland";
/* mid-плашки 1–3 (прямоугольники неба) сняты; путник — чистая вырезка s4-mid, кадрированная CSS-ом */
const scenes: ReelScene[] = [
  { id: "moor", fgMask: [46, 53], len: 1.1, hold: 0.5, bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="hg-eyebrow">Highland walking &amp; whisky trails</span>
      <h1>Walk until<br /><em>the sky changes its mind.</em></h1>
      <p>Four days across heather, loch and ruin — one drystane wall the whole way, and weather that argues with itself every hour.</p>
      <div className="hg-cta"><a href="#book" className="hg-btn">Book the walk</a><a href="#route" className="hg-ghost">See the route →</a></div>
    </>
  ) },
  { id: "loch", fgMask: [50, 58], into: "sweep", tint: "#f2d488", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="hg-idx">— 02 · the loch</span><h2>Loch Ault</h2>
      <p>The water goes still and dark enough to double the hills standing round it. We stop here, flask out, and say nothing for a while.</p></>
  ) },
  { id: "ruin", fgMask: [62, 70], into: "ascend", tint: "#d8d2c4", len: 1.25, hold: 0.55, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="hg-freeze"><b>Mile 8</b><span>roofless since 1624 · first dram poured</span></div>), copy: (
    <><span className="hg-idx">— 03 · the ruin</span><h2>Ardnoch Keep</h2>
      <p>Roofless four hundred years, and still the best shelter on the hill when the rain decides to turn sideways.</p></>
  ) },
  { id: "storm", fgMask: [44, 53], into: "occlude", tint: "#2c3434", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <><span className="hg-idx">— 04 · the clearing</span><h2>After the Squall</h2>
      <p>The rain quits mid-stride and the whole glen goes gold, then silver, then — more often than not — a full arch of rainbow.</p></>
  ) },
];

const MARKS: [string, string, string][] = [
  ["Mile 2", "Heather Line", "The drystane wall picks up at the car park and doesn't let go. Heather to both horizons, larks going up ahead of you."],
  ["Mile 5", "Loch Ault", "Flask tea at the old boathouse. The loch is dark enough to double every hill standing round it."],
  ["Mile 8", "Ardnoch Rise", "The wall climbs to meet the ruin. Rooks first, then the roofless keep, then the whole strath falls open below."],
  ["Mile 11", "The Clearing", "Last pull with the storm at your back — the glen finds a rainbow for the finish more often than it doesn't."],
];

const FORECAST: [string, string, string, string][] = [
  ["09:40", "sun", "Sun on the heather", "Shadows of cloud race you up the first rise."],
  ["11:15", "rain", "Squall off the loch", "Ten minutes, sideways. Hoods up, keep walking."],
  ["13:30", "mist", "Mist at the keep", "The ruin disappears and comes back twice."],
  ["15:05", "bow", "Rainbow over the glen", "Most afternoons. We don't promise it. We rarely need to."],
];

/* детерминированный PRNG — камни стены одинаковы на сервере и клиенте */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Stone = { x: number; y: number; w: number; h: number; r: number; c: string };
const TONES = ["#5d645c", "#6d7369", "#4f5650", "#777c70", "#565d57", "#646a5f", "#5f6a4f", "#6f7560", "#4a4f47"];
function buildWall(width: number): Stone[] {
  const r = rng(17);
  const out: Stone[] = [];
  const tone = () => TONES[Math.floor(r() * TONES.length)];
  // две рядовые кладки неровного бута + коньковый ряд стоячих камней (drystane dyke)
  for (const [y0, hMin, hMax, wMin, wMax] of [[37, 14, 20, 20, 50], [22, 11, 17, 16, 40]] as const) {
    let x = -r() * 20;
    while (x < width) {
      const w = wMin + r() * (wMax - wMin), h = hMin + r() * (hMax - hMin);
      out.push({ x, y: y0 + (r() - 0.5) * 5, w, h, r: (r() - 0.5) * 12, c: tone() });
      x += w + 0.5 + r() * 3;
    }
  }
  let x = -r() * 8;
  while (x < width) {
    const w = 8 + r() * 8, h = 15 + r() * 8;
    out.push({ x, y: 5 + (r() - 0.5) * 4, w, h, r: (r() - 0.5) * 26, c: tone() });
    x += w + r() * 2.5;
  }
  return out;
}

/* ВЕХИ = ТА ЖЕ СТЕНА: кладётся от скролла слева направо, путник идёт на её конце */
function WallMarks() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const sec = el?.closest<HTMLElement>(".hg-steps");
    if (!el || !sec) return;
    const ro = new ResizeObserver(() => setW(Math.round(el.clientWidth)));
    ro.observe(el);
    const unsub = subscribe(({ vh, reduced }) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      const p = reduced ? 1 : clamp01((vh * 0.78 - r.top) / (r.height * 0.8));
      sec.style.setProperty("--wp", p.toFixed(4));
    });
    return () => { ro.disconnect(); unsub(); };
  }, []);
  const stones = w ? buildWall(w) : [];
  return (
    <div ref={ref} className="hg-wall" aria-hidden>
      <svg width="100%" height="58" viewBox={`0 0 ${w || 1} 58`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="hg-stone-lit" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".28" />
          </linearGradient>
        </defs>
        {stones.map((s, i) => (
          <g key={i} transform={`rotate(${s.r.toFixed(1)} ${(s.x + s.w / 2).toFixed(1)} ${(s.y + s.h / 2).toFixed(1)})`}>
            <rect x={s.x.toFixed(1)} y={s.y.toFixed(1)} width={s.w.toFixed(1)} height={s.h.toFixed(1)} rx={(3 + (i % 4)).toString()} fill={s.c} stroke="#2a2f2a" strokeWidth="1" />
            <rect x={s.x.toFixed(1)} y={s.y.toFixed(1)} width={s.w.toFixed(1)} height={s.h.toFixed(1)} rx={(3 + (i % 4)).toString()} fill="url(#hg-stone-lit)" />
          </g>
        ))}
      </svg>
      <span className="hg-wall-walker" />
    </div>
  );
}

export function Highland() {
  return (
    <div className="hg">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Public+Sans:wght@400;500;600;700;800&display=swap"]} />
      <svg className="hg-defs" aria-hidden focusable="false"><filter id="hg-trim"><feMorphology in="SourceAlpha" operator="erode" radius="2.2" result="a" /><feComposite in="SourceGraphic" in2="a" operator="in" /></filter></svg>
      <header className="hg-nav">
        <span className="hg-brand">DRYSTANE</span>
        <nav><a href="#route">The Route</a><a href="#forecast">The Sky</a><a href="#book" className="hg-nav-cta">Book the Walk</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* СКВОЗНОЙ СЛОЙ: тень облака, путник, дождь у грозы, свет/тень под лендингом */}
      <Atmosphere stops={[
        { at: ".hg-manifest", color: "#2b322c" }, { at: ".hg-steps", color: "#3b3a2c" }, { at: ".hg-features", color: "#222925" },
        { at: ".hg-split", color: "#3a3526" }, { at: ".hg-forecast", color: "#1e2528" }, { at: ".hg-cairn", color: "#35311f" },
        { at: ".hg-faq", color: "#1f2622" }, { at: ".hg-deal", color: "#2e2c21" }, { at: ".hg-climax", color: "#1b211d" },
      ]} />
      <Backdrop from=".hg-manifest" dim={0.62} plates={[
        { at: ".hg-manifest", src: `${A}/s1-bg.webp` }, { at: ".hg-steps", src: `${A}/s1-bg.webp`, pos: "50% 70%" }, { at: ".hg-features", src: `${A}/s2-bg.webp` },
        { at: ".hg-forecast", src: `${A}/s4-bg.webp` }, { at: ".hg-cairn", src: `${A}/s4-bg.webp`, pos: "50% 80%" }, { at: ".hg-deal", src: `${A}/s3-bg.webp` },
      ]} />
      <Weather kind="rain" count={60} color="#d8dde0" between={[reelMark("s2"), reelMark("s3")]} world={0.3} wind={2.2} zIndex={31} />
      {/* тень облака — бежит по холмам и по лендингу */}
      <Actor className="hg-cloud-actor" width="78vw" zIndex={29} bob={0} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 24, y: 72, s: 1, o: 0.5 } },
        { at: reelMark("t0"), pose: { x: 62, y: 66, s: 1.3, o: 0.62 } },
        { at: reelMark("s1"), pose: { x: 96, y: 70, s: 1, o: 0.4 } },
        { at: reelMark("t1"), pose: { x: 64, y: 30, s: 1.2, o: 0.35 } },
        { at: reelMark("a2"), pose: { x: 14, y: 78, s: 1.1, o: 0.4 } },
        { at: reelMark("s2"), pose: { x: 14, y: 78, s: 1.1, o: 0.4 } },
        { at: reelMark("h2"), pose: { x: 14, y: 78, s: 1.1, o: 0.4 } },
        { at: reelMark("t2"), pose: { x: 48, y: 52, s: 2.4, o: 0.75 } },
        { at: reelMark("s3"), pose: { x: 120, y: 60, s: 1.4, o: 0 } },
        { at: ".hg-manifest", pose: { x: -10, y: 50, s: 1.2, o: 0 } },
        { at: ".hg-steps", pose: { x: 20, y: 50, s: 1.2, o: 0.45 } },
        { at: ".hg-features", pose: { x: 76, y: 50, s: 1.3, o: 0.5 } },
        { at: ".hg-split", pose: { x: 110, y: 50, s: 1.2, o: 0.2 } },
        { at: ".hg-forecast", pose: { x: 30, y: 50, s: 1.3, o: 0.5 } },
        { at: ".hg-faq", pose: { x: 80, y: 50, s: 1.2, o: 0.45 } },
        { at: ".hg-deal", pose: { x: 120, y: 50, s: 1.2, o: 0 } },
      ]}><div className="hg-cloud" /></Actor>
      {/* путник в капюшоне — один через все холмы, потом по стене вех и к брони */}
      <Actor className="hg-walker-actor" width="3.1vw" zIndex={30} bob={3} tilt={0.03} stops={[
        { at: reelMark("s0"), pose: { x: 69, y: 55.5, s: 0.72, o: 1 } },
        { at: reelMark("t0"), pose: { x: 76, y: 57, s: 0.7, o: 1 } },
        { at: reelMark("s1"), pose: { x: 64, y: 61, s: 0.72, o: 1 } },
        { at: reelMark("t1"), pose: { x: 56, y: 96, s: 1.2, o: 0.6 } },
        { at: reelMark("a2"), pose: { x: 56.5, y: 68, s: 0.72, o: 1 } },
        { at: reelMark("s2"), pose: { x: 56.5, y: 68, s: 0.72, o: 1 } },
        { at: reelMark("h2"), pose: { x: 56.5, y: 68, s: 0.72, o: 1 } },
        { at: reelMark("t2"), pose: { x: 60, y: 72, s: 0.9, o: 0.5, blur: 1 } },
        { at: reelMark("s3"), pose: { x: 70, y: 67, s: 0.85, o: 1 } },
        { at: ".hg-manifest", pose: { x: 70, y: 40, s: 0.9, o: 0 } },
        { at: ".hg-deal-card", anchor: 0.2, pose: { x: 104, y: 70, s: 1.3, o: 0, dock: true } },
        { at: ".hg-deal-card", pose: { x: 103, y: 76, s: 1.4, o: 1, dock: true } },
        { at: ".hg-climax", pose: { x: 80, y: 70, s: 1.2, o: 0 } },
      ]}><div className="hg-walker" /></Actor>

      {/* MANIFESTO — одна крупная мысль */}
      <section className="hg-manifest">
        <p>Scotland does not perform for you. <em>It changes its mind mid-sentence</em> — sun, then squall, then sun again — and the only sensible answer is to keep walking.</p>
      </section>

      {/* WAYMARKS — стена кладётся от скролла, путник идёт по ней */}
      <section className="hg-steps" id="route">
        <div className="hg-steps-head"><span className="hg-kick">The route, waymarker to waymarker</span><h2>Eleven miles, one wall the whole way.</h2></div>
        <WallMarks />
        <ol className="hg-marks">
          {MARKS.map(([m, t, s], i) => (
            <li className="hg-mark" key={i} style={{ ["--i" as string]: i }}>
              <span className="hg-mark-mile">{m}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURE-CARDS — три способа пройти маршрут */}
      <section className="hg-features">
        <span className="hg-kick hg-kick-c">Pick your pace</span>
        <h2 className="hg-features-h">Three ways to walk it.</h2>
        <div className="hg-feature-grid">
          {[["The Day Walk", "Eleven miles, one guide, a packed lunch and a dram poured cold at the ruin. Home by dusk.", "from £85"],
            ["Whisky & Ruins", "Two days, one night in a shepherd's bothy, two distillery calls either end of the walk.", "from £340"],
            ["The Bespoke Line", "Private guide, your pace, any weather — we've walked this wall in all of it and we're not precious about rain.", "on request"]].map(([t, d, p], i) => (
            <div className="hg-feature-card" key={i}>
              <span className="hg-feature-n">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="hg-feature-p">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — SPLIT (руина) + строка из книги гостей bothy вместо отдельной цитаты */}
      <section className="hg-split">
        <div className="hg-split-copy">
          <span className="hg-kick">Why the ruin holds the whole trip together</span>
          <h2>We do not walk around Ardnoch. <em>We walk into it.</em></h2>
          <p>Four hundred years without a roof, and the keep still cuts the wind better than half the bothies in the glen. We stop inside the walls, pour the first dram of the day, and let people read the old stone before we say a word about its history.</p>
          <blockquote className="hg-guestbook">&ldquo;Never once stood still as long as I did at that ruin. Our guide just <em>let the silence happen.</em>&rdquo;<cite>— Fiona McArdle, Glasgow · bothy book, p. 41</cite></blockquote>
        </div>
        <div className="hg-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
      </section>

      {/* FORECAST — «небо передумывает»: один день маршрута по часам (вместо галереи из 4 плит и бегущей строки) */}
      <section className="hg-forecast" id="forecast">
        <div className="hg-forecast-head"><span className="hg-kick">A typical day on the wall</span><h2>The sky changes its mind four times before tea.</h2></div>
        <ol className="hg-sky">
          {FORECAST.map(([t, k, h, s]) => (
            <li className={`hg-sky-cell hg-sky-${k}`} key={t}>
              <span className="hg-sky-t">{t}</span>
              <i className="hg-sky-glyph" aria-hidden />
              <h3>{h}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CAIRN — цифры сложены пирамидой камней (вместо полосы из 4 цифр) */}
      <section className="hg-cairn" aria-label="The walk in numbers">
        <div className="hg-cairn-copy"><span className="hg-kick">Add a stone at the top</span><h2>Every walker leaves one. The cairn at Mile 11 is taller than our guides.</h2></div>
        <ol className="hg-cairn-stack">
          <li><b>2</b><span>drams poured at the ruin, rain or shine</span></li>
          <li><b>68</b><span>walkers a season, no more</span></li>
          <li><b>3</b><span>centuries the keep has stood roofless</span></li>
          <li><b>11</b><span>miles of continuous drystane wall</span></li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="hg-faq">
        <span className="hg-kick hg-kick-c">Before you lace up</span>
        <div className="hg-faq-list">
          {[["What if it rains?", "It will, at least once — that's the point, not the problem. Waterproofs are non-negotiable and we carry a spare set."],
            ["How fit do I need to be?", "Eleven miles over open hill, one long climb to the ruin. If you can walk a Sunday coastal path at pace, you can walk this."],
            ["Is the whisky included?", "Two drams on the two-day route, poured at Ardnoch itself. The day walk gets one, at the finish."],
            ["What do we carry?", "Your own boots and layers. We carry the flask, the first-aid kit and the map — you carry the curiosity."]].map(([q, a], i) => (
            <details className="hg-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — путник дошёл до брони */}
      <section className="hg-deal" id="book">
        <div className="hg-deal-card">
          <span className="hg-kick">The Whisky &amp; Ruins Walk</span>
          <div className="hg-price"><b>£340</b><span>/ walker · two guided days, one bothy night, two drams</span></div>
          <p>Small groups only — six walkers to a guide, one departure a week through the season. Reserve a date and we send the route notes and kit list by return.</p>
          <a href="#" className="hg-btn">Reserve a date</a>
          <span className="hg-note">Free to reschedule for weather · Boots and waterproofs not supplied</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="hg-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hg-climax-veil" aria-hidden />
        <div className="hg-climax-copy"><h2>The rainbow is <em>always waiting</em> on the far side of the squall.</h2><a href="#book" className="hg-btn">Book the walk</a></div>
      </section>

      <footer className="hg-foot"><span className="hg-brand">DRYSTANE</span><span>Highland walking tours · Whisky &amp; ruins, one wall at a time.</span></footer>
    </div>
  );
}
