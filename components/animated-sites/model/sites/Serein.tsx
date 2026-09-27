"use client";
/* SEREIN — «SENTIER, a walked retreat through Provence». Мир: пыльный тёплый свет — лаванда → камень →
   погреб → терраса. Шрифт-пейринг Marcellus × Figtree, палитра olive/lavender/terracotta/limestone.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): одна тропа вдоль каменной стены от поля к столу. Склейки из мира:
   камера идёт вдоль стены (pan) → портал-зум сквозь арку в тёмный погреб (portal, стоп-кадр «12°») →
   золотой свет заката уносит погреб (sweep). Актёр — тёплая точка (свет корзины) с пунктиром тропы за ней:
   поле → порог арки → фонарь винодела → свеча на столе; в лендинге та же тропа идёт вдоль стены по часам
   дня, а точка садится свечой на «сервированный» стол-тарифы. Фон лендинга теплеет к закату. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./serein.css";

const A = "/uploads/1/animated/serein";

const scenes: ReelScene[] = [
  { id: "fields", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="sr-eyebrow">A walked retreat in the Luberon</span>
      <h1>Follow the wall<br /><em>to the table.</em></h1>
      <p>Four days between lavender and limestone — one path along one old wall, from the rows to the cellar to a candlelit table under the fig tree. Slow, sun-warmed, entirely provided for.</p>
      <div className="sr-cta"><a href="#stay" className="sr-btn">Reserve your dates</a><a href="#walk" className="sr-ghost">Walk the route →</a></div>
    </>
  ) },
  { id: "village", into: "pan", tint: "#f0dcb4", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="sr-idx">— 02 · the lane</span><h2>Ochre &amp; Shade</h2>
      <p>Blue shutters, warm stone, a cat asleep on the step. The village wakes slowly, and so, here, do you.</p></>
  ) },
  { id: "cellar", dark: true, into: "portal", portal: { x: 71, y: 47 }, len: 1.2, hold: 0.55, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="sr-freeze"><b>12°</b><span>oak · dust · one lamp</span></div>), copy: (
    <><span className="sr-idx sr-light">— 03 · the cellar</span><h2 className="sr-hl">Where It Waits</h2>
      <p className="sr-pl">Twelve degrees, oak and dust — the vintner draws last year&rsquo;s rosé straight from the barrel, by lamplight, for you alone.</p></>
  ) },
  { id: "terrace", into: "sweep", tint: "#ffb35a", len: 1.1, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="sr-idx">— 04 · the terrace</span><h2>Supper, Golden</h2>
      <p>A long table, a fig tree, the valley going copper below. This is the hour the whole walk was for.</p></>
  ) },
];

/* ── сквозной слой: значение по якорям ───────────────────────────────────────────────────── */
type Key = [sel: string, v: number, anchor?: number];
function track(keys: Key[]) {
  const els = selectorCache(keys.map((k) => k[0]));
  const anchors = keys.map((k) => k[2] ?? 0.5);
  return (vh: number) => {
    const s = segment(els(), vh, anchors);
    if (!s) return keys[0][1];
    return keys[s.a][1] + (keys[s.b][1] - keys[s.a][1]) * smooth(s.t);
  };
}

/* путь тёплой точки в % экрана: вдоль стены → порог арки → в арку → фонарь → свеча на столе */
const TP: [number, number][] = [[26, 91], [60, 85], [86, 80], [69, 75], [71, 48], [60, 80], [62, 58], [56, 62]];
const route = (t: number): [number, number] => {
  const n = TP.length - 1, f = Math.min(n - 1e-6, Math.max(0, t * n)), i = Math.floor(f), s = f - i;
  const p0 = TP[Math.max(0, i - 1)], p1 = TP[i], p2 = TP[i + 1], p3 = TP[Math.min(n, i + 2)];
  const q = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (c - a) * s + (2 * a - 5 * b + 4 * c - d) * s * s + (3 * b - a - 3 * c + d) * s * s * s);
  return [q(p0[0], p1[0], p2[0], p3[0]), q(p0[1], p1[1], p2[1], p3[1])];
};
const MARKS = ["s0", "t0", "s1", "t1", "s2", "t2", "s3"];
const D = MARKS.map((_, i) => (i + 1) / 7);
const TAIL = 0.16;

/* пунктир тропы за точкой — «хвост» пройденного, гаснет позади */
function WallPath() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>("path")!;
    const draw = track(MARKS.map((m, i) => [reelMark(m), D[i]] as Key));
    const vis = track([[reelMark("end"), 1], [".sr-manifest", 0, 0.3]]);
    return subscribe(({ vw, vh, reduced }) => {
      const o = vis(vh);
      root.style.opacity = o.toFixed(3);
      root.style.visibility = o < 0.01 ? "hidden" : "";
      if (o < 0.01 || reduced) return;
      const d = draw(vh), a = Math.max(0, d - TAIL);
      let s = "";
      for (let k = 0; k <= 40; k++) {
        const [x, y] = route(a + ((d - a) * k) / 40);
        s += `${k ? "L" : "M"}${((x * vw) / 100).toFixed(1)} ${((y * vh) / 100).toFixed(1)}`;
      }
      path.setAttribute("d", s);
    });
  }, []);
  return (
    <div ref={ref} className="sr-path" aria-hidden>
      <svg><path /></svg>
    </div>
  );
}

/* та же тропа в лендинге — вдоль стены, по часам дня */
function DayPath() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const path = ref.current?.querySelector<SVGPathElement>(".sr-day-draw");
    if (!path) return;
    const p = track([[".sr-wall", 0, 0.25], [".sr-wall", 1, 0.75]]);
    return subscribe(({ vh, reduced }) => { path.style.strokeDashoffset = (reduced ? 0 : 1 - p(vh)).toFixed(4); });
  }, []);
  return (
    <svg ref={ref} className="sr-day-svg" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden>
      <mask id="sr-day-mask"><path className="sr-day-draw" d="M0 40 C 120 20, 220 52, 360 34 S 620 18, 760 38 S 920 44, 1000 26" pathLength={1} /></mask>
      <path className="sr-day-line" d="M0 40 C 120 20, 220 52, 360 34 S 620 18, 760 38 S 920 44, 1000 26" mask="url(#sr-day-mask)" />
    </svg>
  );
}

const STEPS = [
  { n: "01", k: "Morning", t: "Walk the rows", s: "Out before the heat, baskets over shoulders, into lavender still silver with dew." },
  { n: "02", k: "Midday", t: "Market & shade", s: "Bread, olives, a nap under plane trees while the village keeps its own slow hours." },
  { n: "03", k: "Late afternoon", t: "The cellar hour", s: "Down stone steps into cool dark, where the vintner pours what isn't sold anywhere yet." },
  { n: "04", k: "Dusk", t: "Supper on the wall", s: "Table laid along the last stretch of path, fig tree overhead, the valley catching fire." },
];

const FEATURES = [
  { t: "Guided lavender walks", s: "Daily, at dawn, with the farmer whose family has cut these rows for four generations." },
  { t: "Private cellar hours", s: "Small-group barrel tastings with the vintner — pours that never leave the estate." },
  { t: "A farmhouse table", s: "Family-style dinners inside a restored eighteenth-century mas, windows open to the valley." },
  { t: "Market mornings", s: "A guided walk through the village market, then cook what you find alongside a local chef." },
];

const PLANS = [
  { name: "Le Jour", tag: "Day", price: "€145", blurb: "One morning on the wall — the walk, the cellar, lunch at the long table.",
    bullets: ["Guided lavender walk, 2 hrs", "Cellar tasting, 4 pours", "Farmhouse lunch"], cta: "Book the day", featured: false },
  { name: "Le Weekend", tag: "Weekend", price: "€890", blurb: "Two nights, the full path — fields to cellar to terrace, twice over.",
    bullets: ["2 nights, room in the mas", "Full day itinerary, both days", "Market morning & cooking hour", "Dinner under the fig tree"], cta: "Reserve the weekend", featured: true },
  { name: "La Semaine", tag: "Week", price: "€2,450", blurb: "Six nights of full immersion — the whole valley, at walking pace.",
    bullets: ["6 nights, room in the mas", "Every chapter of the path, twice", "Private chef dinner", "Take-home case, estate rosé"], cta: "Reserve the week", featured: false },
];

export function Serein() {
  return (
    <div className="sr">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Marcellus&family=Figtree:wght@400;500;600;700;800&display=swap"]} />
      <header className="sr-nav">
        <span className="sr-brand">SENTIER</span>
        <nav>
          <a href="#walk">The Walk</a>
          <a href="#table">The Table</a>
          <a href="#stay" className="sr-nav-cta">Reserve dates</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="wander ↓" />

      {/* СКВОЗНОЙ СЛОЙ: фон теплеет к закату, лепестки → светлячки, тропа и тёплая точка */}
      <Atmosphere stops={[
        { at: ".sr-manifest", color: "#e8dcc0" }, { at: ".sr-wall", color: "#ecd3ad" }, { at: ".sr-features", color: "#e9c49a" },
        { at: ".sr-split", color: "#d99c72" }, { at: ".sr-quote", color: "#8a4a3a" }, { at: ".sr-table", color: "#3e2630" }, { at: ".sr-climax", color: "#24161c" },
      ]} />
      <Backdrop from=".sr-manifest" dim={0.56} plates={[
        { at: ".sr-manifest", src: `${A}/s1-bg.webp` }, { at: ".sr-features", src: `${A}/s2-bg.webp` },
        { at: ".sr-quote", src: `${A}/s3-bg.webp` }, { at: ".sr-table", src: `${A}/s4-bg.webp`, pos: "50% 60%" },
      ]} />
      <WallPath />
      <Weather kind="petals" count={16} color="#b89ad0" color2="#f2d7a8" between={[reelMark("s0"), reelMark("t1")]} world={0.7} zIndex={31} />
      <Weather kind="fireflies" count={18} color="#ffd27a" between={[reelMark("t2"), ".sr-table"]} world={0.5} zIndex={31} seed={9} />
      <Actor className="sr-dot-actor" width="22px" zIndex={33} bob={2} tilt={0} stops={[
        ...MARKS.map((m, i) => { const [x, y] = route(D[i]); return { at: reelMark(m), pose: { x, y, s: m === "t1" ? 0.6 : 1, o: 1 } }; }),
        { at: ".sr-manifest", pose: { x: 50, y: 40, s: 0.8, o: 0 } },
        ...[1, 2, 3, 4].map((k) => ({ at: `.sr-stop:nth-child(${k}) .sr-stop-pin`, anchor: 0.5, pose: { x: 50, y: 50, s: 1.2, o: 1, dock: true } })),
        { at: ".sr-features", pose: { x: 50, y: 30, s: 0.8, o: 0 } },
        { at: ".sr-quote", pose: { x: 50, y: 60, s: 0.8, o: 0 } },
        { at: ".sr-place-featured .sr-candle", anchor: 0.5, pose: { x: 50, y: 20, s: 1.5, o: 1, dock: true } },
        { at: ".sr-climax", pose: { x: 50, y: 40, s: 1, o: 0 } },
      ]}><span className="sr-dot" /></Actor>

      {/* MANIFESTO */}
      <section className="sr-manifest">
        <p>We didn&rsquo;t design a tour. <em>We laid a single path</em> along one old wall and asked you to walk it slowly.</p>
      </section>

      {/* ДЕНЬ ВДОЛЬ СТЕНЫ — тропа рисуется скроллом, точка идёт по часам (вместо ряда шагов) */}
      <section className="sr-wall" id="walk">
        <div className="sr-wall-head"><span className="sr-kick">How it unfolds</span><h2>A day on the Sentier.</h2></div>
        <ol className="sr-stops">
          {STEPS.map((s) => (
            <li className="sr-stop" key={s.n}>
              <span className="sr-stop-k">{s.k}</span>
              <h3>{s.t}</h3>
              <p>{s.s}</p>
              <span className="sr-stop-pin" aria-hidden />
            </li>
          ))}
        </ol>
        <div className="sr-wall-band" aria-hidden><DayPath /></div>
      </section>

      {/* ЧТО ВСЕГДА ВКЛЮЧЕНО — список, не карточки */}
      <section className="sr-features">
        <div className="sr-features-head"><span className="sr-kick">Woven into every stay</span><h2>What&rsquo;s always included.</h2></div>
        <dl className="sr-features-list">
          {FEATURES.map((f) => (<div className="sr-feature" key={f.t}><dt>{f.t}</dt><dd>{f.s}</dd></div>))}
        </dl>
      </section>

      {/* SPLIT — семья за стеной (цифры — внутри текста, без полосы статистики) */}
      <section className="sr-split">
        <div className="sr-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="sr-split-copy">
          <span className="sr-kick">Why the wall matters</span>
          <h2>It is a real path, not a metaphor.</h2>
          <p>The wall you walk beside marks the edge of one family&rsquo;s land — the mas was built in <b>1748</b>, and <b>four generations</b> have worked the same rows and the same cellar steps since. Never more than <b>twelve guests</b>. You are not touring an idea of Provence; you are walking someone&rsquo;s actual Tuesday.</p>
          <a href="#stay" className="sr-link">Meet the family →</a>
        </div>
      </section>

      {/* QUOTE — на тёплой сумерке */}
      <section className="sr-quote">
        <blockquote>&ldquo;We came for the wine and left able to name every wildflower in the lavender rows. <em>Nobody wanted to leave the table.</em>&rdquo;</blockquote>
        <cite>— Hélène R., weekend guest · Lyon</cite>
      </section>

      {/* ДЛИННЫЙ СТОЛ — тарифы как сервировка */}
      <section className="sr-table" id="stay">
        <div className="sr-table-head" id="table">
          <span className="sr-kick">Choose your length of path</span>
          <h2>Pull up a chair.</h2>
          <p>Every plan walks the same route. Longer stays simply walk it slower — and stay longer at the table.</p>
        </div>
        <div className="sr-board">
          {PLANS.map((p) => (
            <div className={`sr-place${p.featured ? " sr-place-featured" : ""}`} key={p.name}>
              <div className="sr-plate" aria-hidden>{p.featured && <span className="sr-candle" />}</div>
              <span className="sr-plan-tag">{p.featured ? "Most walked · " : ""}{p.tag}</span>
              <h3>{p.name}</h3>
              <div className="sr-plan-price"><b>{p.price}</b><span>/ person</span></div>
              <p className="sr-plan-blurb">{p.blurb}</p>
              <ul className="sr-plan-list">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <a href="#" className={p.featured ? "sr-btn" : "sr-ghost-btn"}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="sr-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="sr-climax-veil" aria-hidden />
        <div className="sr-climax-copy"><h2>The table is set. <em>Come walk to it.</em></h2><a href="#stay" className="sr-btn">Reserve your dates</a></div>
      </section>

      <footer className="sr-foot">
        <span className="sr-brand">SENTIER</span>
        <span>A walked retreat through Provence · One wall, one path, one table</span>
      </footer>
    </div>
  );
}
