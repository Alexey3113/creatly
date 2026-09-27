"use client";
/* PILGRIM — «LUNGTA». Мир: гималайское восхождение как молитва — каменистая долина на рассвете,
   мост из флажков над ущельем, бело-бордовый монастырь на скале, снежная вершина над облаками.
   Собран на общем движке <Reel/>; шрифт-пейринг Italiana × Public Sans, палитра stone/maroon/gold/snow.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): ОДНО восхождение — камера поднимается (ascend → пролёт сквозь
   флажки моста → ascend над облаками), стоп-кадр «5,400 m» на вершине. Актёр — ОДНА верёвка молитвенных
   флажков по диагонали вверх: рисуется скроллом через все сцены и трепещет от скорости; в лендинге она же
   становится вертикальной осью «пяти высот», а ведущий флажок причаливает к карточке брони. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./pilgrim.css";

const A = "/uploads/1/animated/pilgrim";

const scenes: ReelScene[] = [
  { id: "valley", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="pg-eyebrow">Guided Himalayan ascents · monastery-stay</span>
      <h1>The climb<br /><em>is the prayer.</em></h1>
      <p>Nine days on foot from a stone river valley to a summit shrine above the clouds — a flag-strung bridge, three nights inside a cliffside monastery, and thinner air with every hour.</p>
      <div className="pg-cta"><a href="#book" className="pg-btn">Join an ascent</a><a href="#climb" className="pg-ghost">See the climb ↑</a></div>
    </>
  ) },
  { id: "bridge", into: "ascend", tint: "#e4ebf0", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="pg-idx">— 02 · 3,450 m · the crossing</span><h2>The Flag Bridge</h2>
      <p>Planks and rope over a gorge the river carved in silence. Every flag tied here was left by someone who crossed before you, still swinging a prayer into the wind.</p></>
  ) },
  { id: "monastery", into: "flythrough", bg: `${A}/s3-bg.webp`, copy: (
    <><span className="pg-idx">— 03 · 4,200 m · the gompa</span><h2>Sengye Gompa</h2>
      <p>Three nights behind whitewashed walls — butter lamps, low horns before dawn, and monks who have kept this exact watch on the pass for six hundred years.</p></>
  ) },
  { id: "summit", dark: true, into: "ascend", tint: "#f2dfb6", len: 1.3, hold: 0.58, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5,
    freeze: (<div className="pg-freeze"><b>5,400 m</b><span>the last flag · first light</span></div>), copy: (
    <><span className="pg-idx pg-light">— 04 · 5,400 m · the summit</span><h2 className="pg-hl">Above the Clouds</h2>
      <p className="pg-pl">The last hour is the hardest and the shortest. Then the ridge opens, the flags snap taut, and the whole range goes gold at once.</p></>
  ) },
];

/* ── сквозной слой: значение по якорям (как путь актёра) ───────────────────────────────── */
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

/* верёвка: кубическая кривая в % экрана — провисает и уходит по диагонали вверх-вправо, мимо копи */
const RP = [[34, 104], [60, 92], [80, 52], [95, 15]];
const rp = (t: number): [number, number] => {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * RP[0][0] + b * RP[1][0] + c * RP[2][0] + d * RP[3][0], a * RP[0][1] + b * RP[1][1] + c * RP[2][1] + d * RP[3][1]];
};
const LUNGTA = ["#2f63b0", "#f3efe6", "#b3302a", "#2e7d4b", "#e2b53c"]; // синий · белый · красный · зелёный · жёлтый
const NF = 28;
/* сколько верёвки «натянуто» к середине каждой главы/склейки */
const DRAW: Key[] = [[reelMark("s0"), 0.62], [reelMark("t0"), 0.7], [reelMark("s1"), 0.78], [reelMark("t1"), 0.84], [reelMark("s2"), 0.9], [reelMark("t2"), 0.95], [reelMark("s3"), 1]];

function PrayerRope() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const line = root.querySelector<SVGPathElement>(".pg-rope-line")!;
    const glow = root.querySelector<SVGPathElement>(".pg-rope-glow")!;
    const flags = Array.from(root.querySelectorAll<HTMLElement>(".pg-rf"));
    const cloth = flags.map((f) => f.firstElementChild as HTMLElement);
    const draw = track(DRAW);
    // подъём камеры (ascend): верёвка уезжает вниз вместе с миром; пролёт (flythrough): проносится у объектива
    const climb = track([[reelMark("s0"), 0], [reelMark("t0"), 1], [reelMark("s1"), 0], [reelMark("s2"), 0], [reelMark("t2"), 1], [reelMark("s3"), 0]]);
    const pass = track([[reelMark("s1"), 0], [reelMark("t1"), 1], [reelMark("s2"), 0]]);
    const vis = track([[reelMark("end"), 1], [".pg-alt", 0, 0.08]]);
    return subscribe(({ vw, vh, vy, t, reduced }) => {
      const o = vis(vh);
      root.style.opacity = o.toFixed(3);
      root.style.visibility = o < 0.01 ? "hidden" : "";
      if (o < 0.01) return;
      const d = reduced ? 1 : draw(vh);
      const c = climb(vh), p = pass(vh);
      root.style.transform = `translate3d(0, ${(c * 14).toFixed(2)}vh, 0) scale(${(1 + c * 0.05 + p * 0.55).toFixed(4)})`;
      root.style.filter = p > 0.04 ? `blur(${(p * 5).toFixed(1)}px)` : "";
      let s = "";
      for (let k = 0; k <= 44; k++) {
        const [x, y] = rp((d * k) / 44);
        s += `${k ? "L" : "M"}${((x * vw) / 100).toFixed(1)} ${((y * vh) / 100).toFixed(1)}`;
      }
      line.setAttribute("d", s);
      glow.setAttribute("d", s);
      const wind = reduced ? 0 : 4 + Math.min(24, Math.abs(vy) * 0.9);
      for (let k = 0; k < NF; k++) {
        const tk = (k + 0.5) / NF;
        const on = Math.max(0, Math.min(1, (d - tk) * NF * 1.1));
        const f = flags[k];
        if (on <= 0) { if (f.style.opacity !== "0") f.style.opacity = "0"; continue; }
        const [x, y] = rp(tk), [x2, y2] = rp(Math.min(1, tk + 0.01));
        const ang = (Math.atan2(((y2 - y) * vh) / 100, ((x2 - x) * vw) / 100) * 180) / Math.PI;
        const fl = Math.sin(t / 230 + k * 1.37) * wind;
        f.style.opacity = on.toFixed(2);
        f.style.transform = `translate3d(${((x * vw) / 100).toFixed(1)}px, ${((y * vh) / 100).toFixed(1)}px, 0) skewY(${ang.toFixed(1)}deg)`;
        cloth[k].style.transform = `skewX(${fl.toFixed(1)}deg) scaleY(${(1 - Math.abs(fl) / 80).toFixed(3)})`;
      }
    });
  }, []);
  return (
    <div ref={ref} className="pg-rope" aria-hidden>
      <svg className="pg-rope-svg"><path className="pg-rope-glow" /><path className="pg-rope-line" /></svg>
      {Array.from({ length: NF }, (_, k) => (
        <span className="pg-rf" key={k}><i style={{ background: LUNGTA[k % 5] }} /></span>
      ))}
    </div>
  );
}

/* та же верёвка в лендинге — вертикальная ось «пяти высот», натягивается скроллом */
function AltitudeSpine() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const path = ref.current?.querySelector<SVGPathElement>(".pg-spine-line");
    if (!path) return;
    const p = track([[".pg-alt-row:nth-child(1)", 0.04, 0.2], [".pg-alt-row:nth-child(5)", 1, 0.6]]);
    return subscribe(({ vh, reduced }) => { path.style.strokeDashoffset = (reduced ? 0 : 1 - p(vh)).toFixed(4); });
  }, []);
  return (
    <svg ref={ref} className="pg-spine" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden>
      <path className="pg-spine-line" d="M5 0 C 7 25, 3 50, 5 75 S 5 100, 5 100" pathLength={1} />
    </svg>
  );
}

const CLIMB: [string, string, string][] = [
  ["2,600 m", "Trailhead", "Stone river valley, terraced fields, first gold on the peaks. The noise of the road stops here."],
  ["3,450 m", "The Flag Bridge", "Rope and plank over the gorge — you cross with a thousand flags left by pilgrims before you."],
  ["4,200 m", "Sengye Gompa", "Three nights behind whitewashed walls. Butter lamps, low horns before dawn, one full day to let your blood catch up."],
  ["4,850 m", "The Last Spring", "The final water before the trail turns to scree and snow. Fill everything here — there is no more after this."],
  ["5,400 m", "The Summit Cairn", "Flags snap taut in the wind. The whole range goes gold at once, and you tie yours to the highest line."],
];

const BELLS: [string, string, string][] = [
  ["05:30", "Dawn bell", "Seated practice in the courtyard, before the cold has a chance to argue."],
  ["07:00", "The trail", "Walking while the light is low and gold — the shortest miles feel longest."],
  ["13:00", "Tea house", "A long rest, a hot meal and a guide's check on how the altitude is sitting."],
  ["18:30", "Evening teaching", "A talk from the resident monk, or simply silence and butter-lamp light."],
];

const CARRIED: [string, string][] = [
  ["Permits & logistics", "Every checkpoint, park fee and monastery permission arranged before you land."],
  ["The monastery itself", "Three confirmed nights inside Sengye Gompa — meals, a cell and morning practice."],
  ["A guide lineage", "Guides born within a day's walk of the pass, trusted by the monastery for two decades."],
  ["Altitude support", "Daily oxygen checks, a built-in rest day at 4,200 m, and a turn-back call that is never yours alone."],
];

export function Pilgrim() {
  return (
    <div className="pg">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Italiana&family=Public+Sans:wght@400;500;600;700;800&display=swap"]} />

      <header className="pg-nav">
        <span className="pg-brand">LUNGTA</span>
        <nav>
          <a href="#climb">The Climb</a>
          <a href="#stay">The Gompa</a>
          <a href="#book" className="pg-nav-cta">Join an ascent</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет высоты под лендингом, снег у вершины, верёвка флажков, ведущий флажок */}
      <Atmosphere stops={[
        { at: ".pg-alt", color: "#1a1c24" }, { at: ".pg-stay", color: "#2a1c18" }, { at: ".pg-carry", color: "#241a14" },
        { at: ".pg-wind", color: "#2c2216" }, { at: ".pg-deal", color: "#3a2b16" }, { at: ".pg-climax", color: "#20180f" },
      ]} />
      <Backdrop from=".pg-alt" dim={0.4} plates={[
        { at: ".pg-alt", src: `${A}/s4-bg.webp`, pos: "50% 70%" }, { at: ".pg-stay", src: `${A}/s3-bg.webp`, pos: "30% 50%" },
        { at: ".pg-wind", src: `${A}/s2-bg.webp`, pos: "50% 40%" }, { at: ".pg-deal", src: `${A}/s4-bg.webp`, pos: "50% 60%" },
      ]} />
      <PrayerRope />
      <Weather kind="snow" count={20} color="#f6f3ec" between={[reelMark("t2"), ".pg-stay"]} world={0.7} zIndex={31} />
      <Actor className="pg-lead" width="34px" zIndex={33} bob={3} tilt={0.12} stops={[
        { at: reelMark("s0"), pose: { x: 84.4, y: 38.5, s: 0.9, r: -8, o: 0 } },
        { at: reelMark("s1"), pose: { x: 84.4, y: 38.5, s: 1, r: -8, o: 1 } },
        { at: reelMark("t1"), pose: { x: 87.4, y: 32, s: 1, r: -8, o: 1 } },
        { at: reelMark("s2"), pose: { x: 90.4, y: 25.2, s: 1.05, r: -10, o: 1 } },
        { at: reelMark("t2"), pose: { x: 92.7, y: 19.6, s: 1.1, r: -10, o: 1 } },
        { at: reelMark("s3"), pose: { x: 95, y: 14, s: 1.15, r: -12, o: 1 } },
        { at: ".pg-alt-row:nth-child(1)", anchor: 0.5, pose: { x: 0, y: 30, s: 1.2, r: 0, o: 1, dock: true } },
        { at: ".pg-alt-row:nth-child(3)", anchor: 0.5, pose: { x: 0, y: 30, s: 1.2, r: -4, o: 1, dock: true } },
        { at: ".pg-alt-row:nth-child(5)", anchor: 0.5, pose: { x: 0, y: 30, s: 1.3, r: 0, o: 1, dock: true } },
        { at: ".pg-stay", pose: { x: 8, y: 40, s: 0.8, o: 0 } },
        { at: ".pg-wind", pose: { x: 50, y: 30, s: 0.8, o: 0 } },
        { at: ".pg-deal-card", anchor: 0.5, pose: { x: 7, y: 0, s: 1.6, r: -6, o: 1, dock: true } },
        { at: ".pg-climax", pose: { x: 50, y: 30, s: 1, o: 0 } },
      ]}>
        <svg viewBox="0 0 34 44" className="pg-lead-flag"><path d="M2 0v44" /><path d="M3 2h29l-5 10 5 10H3z" /><path d="M9 8h14M9 12h11M9 16h13" /></svg>
      </Actor>

      {/* ПЯТЬ ВЫСОТ — та же верёвка как вертикальная ось, сразу после рила */}
      <section className="pg-alt" id="climb">
        <div className="pg-head"><span className="pg-kick">The line, metre by metre</span><h2>Five altitudes,<br />one rope.</h2></div>
        <div className="pg-alt-body">
          <AltitudeSpine />
          <ol className="pg-alt-list">
            {CLIMB.map(([alt, title, s], i) => (
              <li className="pg-alt-row" key={i}>
                <span className="pg-alt-flag" style={{ background: LUNGTA[i] }} aria-hidden />
                <span className="pg-alt-m">{alt}</span>
                <div><h3>{title}</h3><p>{s}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ГОМПА — сплит: мы живём внутри монастыря; день по колоколу (вместо отдельных «шагов») */}
      <section className="pg-stay" id="stay">
        <div className="pg-stay-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="pg-stay-copy">
          <span className="pg-kick">Why Lungta</span>
          <h2>We don&rsquo;t rent a room near the monastery. We stay inside it.</h2>
          <p>Most treks pass Sengye Gompa on the way to somewhere else. Ours stops there for three nights, on terms the monastery itself set — eleven seasons of trust, not a booking made last week.</p>
          <ol className="pg-bells">
            {BELLS.map(([t, h, s]) => (
              <li key={t}><b>{t}</b><div><h3>{h}</h3><p>{s}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ЧТО НЕСЁМ ЗА ВАС — список-ведомость, не ряд карточек */}
      <section className="pg-carry">
        <div className="pg-head"><span className="pg-kick">Nothing to arrange yourself</span><h2>What&rsquo;s carried for you.</h2></div>
        <dl className="pg-carry-list">
          {CARRIED.map(([t, s]) => (<div key={t}><dt>{t}</dt><dd>{s}</dd></div>))}
        </dl>
      </section>

      {/* ВЕТЕР — отзыв под нитью флажков (вместо цитаты по центру) */}
      <section className="pg-wind">
        <div className="pg-wind-string" aria-hidden>
          {Array.from({ length: 22 }, (_, k) => <i key={k} style={{ background: LUNGTA[k % 5], animationDelay: `${(k % 7) * -0.37}s` }} />)}
        </div>
        <blockquote>&ldquo;Somewhere past the bridge I stopped counting days. The monks count in bells, the guides count in breaths — and the flags just keep <em>going up ahead of you.</em>&rdquo;</blockquote>
        <cite>— Naomi K., third ascent · autumn window</cite>
      </section>

      {/* БРОНЬ — ведущий флажок причаливает к карточке */}
      <section className="pg-deal" id="book">
        <div className="pg-deal-card">
          <span className="pg-kick">The nine-day ascent</span>
          <div className="pg-price"><b>$3,180</b><span>/ pilgrim · guide, permits, gompa stay &amp; the whole line up</span></div>
          <p>Trailhead to summit and back, three nights inside the monastery, all permits and altitude support handled. Reserve a window and we send the illustrated route plan.</p>
          <ul className="pg-deal-facts"><li><b>2,800 m</b> gained</li><li><b>8</b> pilgrims max</li><li><b>3</b> nights in the gompa</li></ul>
          <a href="#" className="pg-btn">Reserve your ascent</a>
          <span className="pg-note">Seasons: April–June &amp; September–November · Full kit list provided</span>
        </div>
      </section>

      <section className="pg-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="pg-climax-veil" aria-hidden />
        <div className="pg-climax-copy"><h2>Leave a flag<br /><em>at the top.</em></h2><a href="#book" className="pg-btn">Join an ascent</a></div>
      </section>

      <footer className="pg-foot"><span className="pg-brand">LUNGTA</span><span>Guided Himalayan ascents &amp; monastery stays · The mountain, one flag higher</span></footer>
    </div>
  );
}
