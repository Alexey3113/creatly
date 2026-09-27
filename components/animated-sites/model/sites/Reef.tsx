"use client";
/* REEF — CRATERLINE: guided volcanic-island crossings. Мир: тропический вулканический остров слоями —
   от бирюзового берега через зелень к магме. Шрифт-пейринг Syne × Work Sans, палитра turquoise/jungle/sand/magma.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): один подъём от воды к кратеру. Склейки из мира: листва проносится
   у объектива (flythrough) → водопад белым вертикальным занавесом (sweep) → подъём сквозь дым (ascend).
   Грейд сцен читает дугу «бирюза → зелень → магма». Актёр — ОДНА пунктирная тропа от кромки воды к кратеру
   (рисуется скроллом через все сцены) и точка-путник на её конце; в лендинге тот же пунктир ведёт по зонам,
   путник причаливает к станциям и к карточке брони. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./reef.css";

const A = "/uploads/1/animated/reef";
const scenes: ReelScene[] = [
  { id: "beach", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="rf-eyebrow">Guided volcanic-island crossings</span>
      <h1>Walk the whole<br /><em>island, once.</em></h1>
      <p>One vivid trail from turquoise shallows to a smoking crater rim — four skies in a single guided crossing, painted before you ever lace a boot.</p>
      <div className="rf-cta"><a href="#book" className="rf-btn">Book the crossing</a><a href="#route" className="rf-ghost">See the trail →</a></div>
    </>
  ) },
  { id: "jungle", dark: true, into: "flythrough", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="rf-idx rf-light">— 02 · 180 m · the green vein</span><h2>Into the Canopy</h2>
      <p className="rf-pl">The path narrows to a footwide seam of light. Vines, parrots, a stream that never stops arguing with the rocks — this is where the island stops being a postcard.</p></>
  ) },
  { id: "lagoon", into: "sweep", tint: "#f2fbff", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="rf-idx">— 03 · 340 m · the hidden basin</span><h2>Rainbow Falls</h2>
      <p>A curtain of white water drops into jade, and somehow there&rsquo;s always a rainbow standing in the mist. Most guests stop talking here.</p></>
  ) },
  { id: "ridge", dark: true, into: "ascend", tint: "#5a2c20", len: 1.3, hold: 0.58, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6,
    freeze: (<div className="rf-freeze"><b>612 m</b><span>the rim · the stone is still warm</span></div>), copy: (
    <><span className="rf-idx rf-light">— 04 · the crater rim</span><h2>Where the Island Breathes</h2>
      <p className="rf-pl">Black rock, a hot seam of light in the stone, the whole sea turned to copper below you. The trail ends at the one view that explains all three before it.</p></>
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

/* тропа-серпантин в % экрана: от кромки воды (низ) к кратеру (верх справа), мимо копи */
const TP: [number, number][] = [[49, 103], [57, 90], [70, 83], [78, 71], [70, 60], [72, 48], [83, 41], [89, 29], [83, 18]];
const trail = (t: number): [number, number] => {
  const n = TP.length - 1, f = Math.min(n - 1e-6, Math.max(0, t * n)), i = Math.floor(f), s = f - i;
  const p0 = TP[Math.max(0, i - 1)], p1 = TP[i], p2 = TP[i + 1], p3 = TP[Math.min(n, i + 2)];
  const q = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (c - a) * s + (2 * a - 5 * b + 4 * c - d) * s * s + (3 * b - a - 3 * c + d) * s * s * s);
  return [q(p0[0], p1[0], p2[0], p3[0]), q(p0[1], p1[1], p2[1], p3[1])];
};
const D = [0.16, 0.3, 0.42, 0.56, 0.68, 0.84, 1]; // s0 t0 s1 t1 s2 t2 s3
const MARKS = ["s0", "t0", "s1", "t1", "s2", "t2", "s3"];
const WAY = [0, 0.34, 0.66, 1];

function TrailLayer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>("path"));
    const rings = Array.from(root.querySelectorAll<HTMLElement>(".rf-way"));
    const draw = track(MARKS.map((m, i) => [reelMark(m), D[i]] as Key));
    const vis = track([[reelMark("end"), 1], [".rf-manifest", 0, 0.3]]);
    return subscribe(({ vw, vh, reduced }) => {
      const o = vis(vh);
      root.style.opacity = o.toFixed(3);
      root.style.visibility = o < 0.01 ? "hidden" : "";
      if (o < 0.01) return;
      const d = reduced ? 1 : draw(vh);
      let s = "";
      for (let k = 0; k <= 90; k++) {
        const [x, y] = trail((d * k) / 90);
        s += `${k ? "L" : "M"}${((x * vw) / 100).toFixed(1)} ${((y * vh) / 100).toFixed(1)}`;
      }
      paths.forEach((p) => p.setAttribute("d", s));
      rings.forEach((r, i) => {
        const [x, y] = trail(WAY[i]);
        r.style.transform = `translate3d(${((x * vw) / 100).toFixed(1)}px, ${((y * vh) / 100).toFixed(1)}px, 0)`;
        const on = d >= WAY[i] - 0.005;
        if (r.dataset.on !== (on ? "1" : "")) { if (on) r.dataset.on = "1"; else delete r.dataset.on; }
      });
    });
  }, []);
  return (
    <div ref={ref} className="rf-trail" aria-hidden>
      <svg><path className="rf-trail-shade" /><path className="rf-trail-line" /></svg>
      {["shore", "canopy", "basin", "rim"].map((w) => <span className="rf-way" key={w}><i /><b>{w}</b></span>)}
    </div>
  );
}

/* тот же пунктир в лендинге — идёт по зонам, натягивается скроллом */
function RouteLine() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const path = ref.current?.querySelector<SVGPathElement>(".rf-route-draw");
    if (!path) return;
    const p = track([[".rf-stop:nth-child(1)", 0.02, 0.3], [".rf-stop:nth-child(4)", 1, 0.5]]);
    return subscribe(({ vh, reduced }) => { path.style.strokeDashoffset = (reduced ? 0 : 1 - p(vh)).toFixed(4); });
  }, []);
  return (
    <svg ref={ref} className="rf-route-svg" viewBox="0 0 40 400" preserveAspectRatio="none" aria-hidden>
      <mask id="rf-route-mask"><path className="rf-route-draw" d="M20 0 C 28 60, 12 120, 20 200 S 28 330, 20 400" pathLength={1} /></mask>
      <path className="rf-route-line" d="M20 0 C 28 60, 12 120, 20 200 S 28 330, 20 400" mask="url(#rf-route-mask)" />
    </svg>
  );
}

const zones = [
  { n: "01", key: "shore", label: "The Shore", alt: "0 m", note: "Turquoise shallows and a reef line you can wade to. Boots stay dry — for about an hour.", img: `${A}/s1-bg.webp` },
  { n: "02", key: "jungle", label: "The Canopy", alt: "180 m", note: "Green shade, a stream for a guide, parrots keeping score overhead.", img: `${A}/s2-bg.webp` },
  { n: "03", key: "lagoon", label: "The Basin", alt: "340 m", note: "A waterfall most maps don't bother drawing. Swim, refill, dry off on warm rock.", img: `${A}/s3-bg.webp` },
  { n: "04", key: "ridge", label: "The Rim", alt: "612 m", note: "Black rock, thin air, a crater still warm enough to argue with.", img: `${A}/s4-bg.webp` },
];

export function Reef() {
  return (
    <div className="rf">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap"]} />
      <header className="rf-nav">
        <span className="rf-brand">CRATERLINE</span>
        <nav><a href="#route">The trail</a><a href="#profile">The climb</a><a href="#notes">Included</a><a href="#book" className="rf-nav-cta">Book the crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* СКВОЗНОЙ СЛОЙ: фон лендинга бирюза → джунгли → магма, листва → угли, тропа и путник */}
      <Atmosphere stops={[
        { at: ".rf-manifest", color: "#0d4448" }, { at: ".rf-stop:nth-child(1)", color: "#0f4a4c" }, { at: ".rf-stop:nth-child(2)", color: "#123f2a" },
        { at: ".rf-stop:nth-child(3)", color: "#10433a" }, { at: ".rf-stop:nth-child(4)", color: "#4a2016" }, { at: ".rf-profile", color: "#3a1c14" },
        { at: ".rf-split", color: "#2c1812" }, { at: ".rf-quote", color: "#461d12" }, { at: ".rf-deal", color: "#3a160e" }, { at: ".rf-climax", color: "#1c0c08" },
      ]} />
      <Backdrop from=".rf-manifest" dim={0.46} plates={[
        { at: ".rf-manifest", src: `${A}/s1-bg.webp` }, { at: ".rf-stop:nth-child(2)", src: `${A}/s2-bg.webp` },
        { at: ".rf-stop:nth-child(3)", src: `${A}/s3-bg.webp` }, { at: ".rf-stop:nth-child(4)", src: `${A}/s4-bg.webp` },
        { at: ".rf-quote", src: `${A}/s4-bg.webp`, pos: "60% 40%" },
      ]} />
      <TrailLayer />
      <Weather kind="leaves" count={16} color="#2f8a4a" color2="#8cc46a" between={[reelMark("t0"), reelMark("t2")]} world={0.7} zIndex={31} />
      <Weather kind="embers" count={22} color="#ff8a3a" color2="#ffc36a" between={[reelMark("t2"), ".rf-profile"]} world={0.6} zIndex={31} seed={5} />
      <Actor className="rf-walker" width="26px" zIndex={33} bob={2} tilt={0} stops={[
        ...MARKS.map((m, i) => { const [x, y] = trail(D[i]); return { at: reelMark(m), pose: { x, y, s: 1, o: 1 } }; }),
        { at: ".rf-manifest", pose: { x: 83, y: 18, s: 0.8, o: 0 } },
        ...[1, 2, 3, 4].map((k) => ({ at: `.rf-stop:nth-child(${k}) .rf-stop-pin`, anchor: 0.5, pose: { x: 50, y: 50, s: 1.25, o: 1, dock: true } })),
        { at: ".rf-profile", pose: { x: 50, y: 30, s: 0.8, o: 0 } },
        { at: ".rf-features", pose: { x: 50, y: 70, s: 0.8, o: 0 } },
        { at: ".rf-deal-card", anchor: 0.5, pose: { x: 50, y: 0, s: 1.4, o: 1, dock: true } },
        { at: ".rf-climax", pose: { x: 50, y: 40, s: 1, o: 0 } },
      ]}><span className="rf-walker-dot" /></Actor>

      {/* MANIFESTO — бирюза */}
      <section className="rf-manifest">
        <p>Most islands hand you a lounge chair. <em>This one hands you a trailhead.</em></p>
      </section>

      {/* ТРОПА ПО ЗОНАМ — тот же пунктир, вертикально; фон секции темнеет от бирюзы к магме */}
      <section className="rf-route" id="route">
        <div className="rf-route-head"><span className="rf-kick">The route, water to fire</span><h2>One island, four completely different countries.</h2></div>
        <div className="rf-route-body">
          <RouteLine />
          <ol className="rf-stops">
            {zones.map((z) => (
              <li className={`rf-stop rf-stop-${z.key}`} key={z.key}>
                <span className="rf-stop-pin" aria-hidden />
                <div className="rf-stop-lens" style={{ backgroundImage: `url(${z.img})` }} aria-hidden />
                <div className="rf-stop-copy"><span className="rf-stop-n">{z.n} · {z.alt}</span><h3>{z.label}</h3><p>{z.note}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ПРОФИЛЬ ВЫСОТ — вместо полосы из четырёх цифр */}
      <section className="rf-profile" id="profile">
        <div className="rf-profile-head"><span className="rf-kick">The climb, drawn to scale</span><h2>9 km. 612 m up. One day.</h2></div>
        <figure className="rf-chart">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="rf-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#1fb0b0" /><stop offset=".4" stopColor="#1f6a3a" /><stop offset=".68" stopColor="#1f8a6a" /><stop offset="1" stopColor="#c8402a" /></linearGradient></defs>
            <path className="rf-chart-area" d="M0 300 L0 292 C 90 290, 160 280, 250 238 S 400 200, 470 186 S 600 176, 680 150 S 820 90, 900 44 L 960 22 L 1000 30 L 1000 300 Z" fill="url(#rf-grad)" />
            <path className="rf-chart-line" d="M0 292 C 90 290, 160 280, 250 238 S 400 200, 470 186 S 600 176, 680 150 S 820 90, 900 44 L 960 22 L 1000 30" />
          </svg>
          <ul className="rf-chart-marks">
            <li style={{ left: "2%" }}><b>0 m</b>shore · 06:00</li>
            <li style={{ left: "27%" }}><b>180 m</b>canopy · 08:30</li>
            <li style={{ left: "52%" }}><b>340 m</b>basin · 11:00</li>
            <li style={{ left: "90%" }}><b>612 m</b>rim · 17:40</li>
          </ul>
          <figcaption>8 hikers per crossing, never more · one guide for every four</figcaption>
        </figure>
      </section>

      {/* SPLIT */}
      <section className="rf-split">
        <div className="rf-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="rf-split-copy">
          <span className="rf-kick">Why the trail holds up</span>
          <h2>We walk it before you do — every root, every rock.</h2>
          <p>Every crossing is scouted at dawn, mapped from tideline to crater, and led by islanders who&rsquo;ve walked the ridge since before the trail had a name. You&rsquo;re never guessing which vine is a snake.</p>
          <a href="#notes" className="rf-link">Meet your guides →</a>
        </div>
      </section>

      {/* ПОЛЕВАЯ ЗАМЕТКА — отзыв слева, на магме */}
      <section className="rf-quote">
        <blockquote>&ldquo;I&rsquo;ve hiked volcanoes on three continents. I have never watched the water go that turquoise in the morning and the ridge go that orange by night — <em>on the same walk.</em>&rdquo;</blockquote>
        <cite>— Renata Costa, trail contributor · Faro Verde Journal</cite>
      </section>

      {/* ЧТО НЕСЁТ МАРШРУТ */}
      <section className="rf-features" id="notes">
        <div className="rf-features-head"><span className="rf-kick">What&rsquo;s included</span><h2>Everything the crossing carries.</h2></div>
        <div className="rf-features-row">
          {[["Local guide & radio net", "An islander who has walked the ridge for years, radio-linked to base the whole crossing."],
            ["Reef-safe gear & refills", "Reef-safe sun cream, dry bags and water refills at the lagoon — nothing plastic left behind."],
            ["Permits & ranger check-ins", "Every crossing is cleared with the ridge rangers before your boots touch sand."],
            ["A rain plan, built in", "The jungle floods fast. Every date carries a fallback window, no extra charge."]].map(([t, s], i) => (
            <div className="rf-feature" key={i}><span className="rf-feature-n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* DEAL — путник причаливает к карточке */}
      <section className="rf-deal" id="book">
        <div className="rf-deal-card">
          <span className="rf-kick">The full crossing</span>
          <div className="rf-price"><b>$185</b><span>/ hiker · guide, permits &amp; reef-safe gear</span></div>
          <p>A full day on the trail — shore at sunrise, ridge by sunset, everything handled in between. Reserve a date and we send the illustrated route map.</p>
          <a href="#" className="rf-btn">Reserve a trail date</a>
          <span className="rf-note">Rain-check guaranteed · Max 8 per crossing</span>
        </div>
      </section>

      <section className="rf-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="rf-climax-veil" aria-hidden />
        <div className="rf-climax-copy"><h2>Start at the water.<br /><em>End at the fire.</em></h2><a href="#book" className="rf-btn">Book the crossing</a></div>
      </section>

      <footer className="rf-foot"><span className="rf-brand">CRATERLINE</span><span>Guided volcanic-island crossings · Shore to summit, painted first</span></footer>
    </div>
  );
}
