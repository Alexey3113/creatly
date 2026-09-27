"use client";
/* LANTERN — «Redthread» guided mountain ascents. Мир: рассветные рисовые террасы → вермильоновые
   ворота храма → ночной фестиваль фонарей → святилище на вершине над облаками.
   Тезис — ВОСХОЖДЕНИЕ к свету, поэтому камера идёт вверх: ascend → portal (сквозь тории) → ascend.
   Сквозной актёр — КРАСНАЯ НИТЬ: светящийся узелок ведёт нить вверх по миру (фонарь паломника →
   ворота → гирлянда фонарей → святилище), в лендинге нить становится высотной шкалой с закреплённым
   счётчиком высоты, привязывает табличку-отзыв и садится на карточку брони.
   Свой шрифт-пейринг Spectral × IBM Plex Sans, палитра jade/vermilion/gold/mist + red CTA. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth } from "@/components/scene-kit";
import "./lantern.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/lantern";

const scenes: ReelScene[] = [
  { id: "terraces", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="ln-eyebrow">Guided mountain ascents</span>
      <h1>A red thread<br /><em>through the mist.</em></h1>
      <p>Four painted days — terrace, gate, lantern water, and a shrine standing alone above the clouds. One thread of red light goes up with you the whole way.</p>
      <div className="ln-cta"><a href="#book" className="ln-btn">Reserve the climb</a><a href="#ascent" className="ln-ghost">See the ascent →</a></div>
    </>
  ) },
  { id: "gate", into: "ascend", tint: "#e6ece4", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ln-idx">— 02 · the threshold</span><h2>Vermilion Gate</h2>
      <p>Stone lions, cedar smoke, a monk sweeping the same step for forty years. The thread goes under the gate first — you follow it through.</p></>
  ) },
  { id: "festival", dark: true, into: "portal", portal: { x: 31, y: 62 }, len: 1.15, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`, spark: 7, copy: (
    <><span className="ln-idx ln-light">— 03 · the release</span><h2 className="ln-hl">Lantern Water</h2>
      <p className="ln-pl">Night, and a whole village hangs its light over a black pond. You write one word on yours and let the current take it.</p></>
  ) },
  { id: "shrine", into: "ascend", tint: "#f3dcae", len: 1.25, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`,
    freeze: (<div className="ln-freeze"><b>2,430 m</b><span>above the cloud line · breathe</span></div>), copy: (
    <><span className="ln-idx">— 04 · the summit</span><h2>Shrine Above Cloud</h2>
      <p>Bells, a bowed head, a red cord tied to the rail by every climber before you. Everything below is a white sea.</p></>
  ) },
];

const CHAPTERS = [
  ["620 m", "Rice Terraces", "Dawn breaks over stepped water and the fog hasn't decided to lift. First hour, first breath — the noise of the valley finally stops following you."],
  ["1,140 m", "Vermilion Gate", "The forest closes in, cedar and stone. We stop an hour at the gate — incense, the sweep, the bow — and the trail beyond it is narrower, quieter, watched."],
  ["1,860 m", "Lantern Water", "Night, and the village hangs its light out over the pond. You release a lantern with the others and sleep to the smell of paper and smoke."],
  ["2,430 m", "Summit Shrine", "Above the cloud line at first gold light. Bells, thin air, a red cord tied to the railing by climbers before you. You add your own."],
];
const ALT = [620, 1140, 1860, 2430];

/* слова, отпущенные на воду в прошлую субботу: позиция x/y (%), масштаб, задержка покачивания */
const LAMPS: Array<[string, number, number, number, number]> = [
  ["enough", 8, 58, 1, 0], ["Mira", 20, 30, 0.8, 1.2], ["home", 31, 62, 1.1, 2.1], ["again", 43, 22, 0.75, 0.6],
  ["slower", 52, 52, 0.95, 1.7], ["Theo", 63, 18, 0.7, 2.6], ["forgive", 70, 60, 1.05, 0.9], ["rain", 81, 34, 0.8, 1.4],
  ["yes", 90, 64, 0.9, 2.3], ["brave", 14, 12, 0.6, 3.1], ["thank you", 36, 40, 0.65, 3.6],
];

/* сквозное значение по якорям (как Atmosphere, но число) */
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

export function Lantern() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const num = el.querySelector<HTMLElement>(".ln-alt-num");
    // закреплённый счётчик высоты едет по той же нити
    const offAlt = follow([1, 2, 3, 4].map((n) => `.ln-spine-row:nth-child(${n}) .ln-spine-dot`), ALT, (v) => {
      if (num) num.textContent = (Math.round(v / 10) * 10).toLocaleString("en-US");
    });
    // в риле нить свисает вниз (путь, по которому поднялись), в лендинге тянется вверх по шкале
    const offUp = follow([reelMark("end"), ".ln-manifest"], [0, 1], (v) => el.style.setProperty("--ln-up", v.toFixed(3)));
    return () => { offAlt(); offUp(); };
  }, []);

  return (
    <div className="ln" ref={root}>
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"]} />
      {/* фильтры мира: ночь фестиваля (тёплые фонари остаются светом, туман уходит в синюю ночь) и снятие магенты с кромок fg */}
      <svg className="ln-defs" width="0" height="0" aria-hidden focusable="false">
        <filter id="ln-night" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" result="dark" values=".2 .04 .02 0 0  .02 .22 .06 0 .005  .05 .08 .36 0 .03  0 0 0 1 0" />
          <feColorMatrix in="SourceGraphic" type="matrix" result="k0" values="1.18 0 0 0 0  0 1.04 0 0 0  0 0 .86 0 0  3.4 0 -3.4 0 -.4" />
          <feComposite in="k0" in2="SourceAlpha" operator="in" result="key" />
          <feGaussianBlur in="key" stdDeviation="6" result="glow" />
          <feMerge><feMergeNode in="dark" /><feMergeNode in="glow" /><feMergeNode in="key" /></feMerge>
        </filter>
        <filter id="ln-demag" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 2.6 -2.6 1 .12" />
        </filter>
      </svg>

      <header className="ln-nav">
        <span className="ln-brand">REDTHREAD</span>
        <nav><a href="#ascent">The ascent</a><a href="#included">Included</a><a href="#book" className="ln-nav-cta">Reserve the climb</a></nav>
      </header>

      <Reel scenes={scenes} cue="ascend ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет мира под лендингом, огоньки фестиваля, красная нить */}
      <Atmosphere stops={[
        { at: ".ln-manifest", color: "#1f2b26" },
        { at: ".ln-spine-row:nth-child(1)", color: "#22342c" }, { at: ".ln-spine-row:nth-child(2)", color: "#1c2e27" },
        { at: ".ln-spine-row:nth-child(3)", color: "#0c1424" }, { at: ".ln-spine-row:nth-child(4)", color: "#2b2b22" },
        { at: ".ln-cards", color: "#15241e" }, { at: ".ln-release", color: "#0a1020" }, { at: ".ln-deal", color: "#0d1814" },
      ]} />
      <Backdrop className="ln-bd" from=".ln-manifest" dim={0.5} plates={[
        { at: ".ln-manifest", src: `${A}/s4-bg.webp`, pos: "50% 40%" },
        { at: ".ln-spine-row:nth-child(1)", src: `${A}/s1-bg.webp` },
        { at: ".ln-spine-row:nth-child(2)", src: `${A}/s2-bg.webp` },
        { at: ".ln-spine-row:nth-child(3)", src: `${A}/s3-bg.webp` },
        { at: ".ln-spine-row:nth-child(4)", src: `${A}/s4-bg.webp`, pos: "50% 40%" },
        { at: ".ln-release", src: `${A}/s3-bg.webp` },
        { at: ".ln-deal", src: `${A}/s3-bg.webp`, pos: "50% 70%" },
      ]} />
      <Weather kind="embers" count={22} color="#ffb86b" color2="#ff5a4a" between={[reelMark("t1"), ".ln-manifest"]} world={0.5} zIndex={31} />
      <Weather kind="embers" count={16} color="#ffc27a" color2="#ff6a4a" seed={11} between={[".ln-release", ".ln-tag"]} world={0.4} zIndex={31} />
      {/* ПОДЪЁМ СКВОЗЬ ТУМАН: облачный слой уходит вниз ровно на стыках ascend (террасы→ворота, фестиваль→вершина) */}
      <Actor className="ln-cloud-actor" width="150vw" zIndex={31} bob={0} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 50, y: -34, s: 1, o: 0 } },
        { at: reelMark("t0"), pose: { x: 50, y: 44, s: 1, o: 1 } },
        { at: reelMark("s1"), pose: { x: 50, y: 136, s: 1, o: 0 } },
      ]}><i className="ln-cloud" /></Actor>
      <Actor className="ln-cloud-actor" width="150vw" zIndex={31} bob={0} tilt={0} stops={[
        { at: reelMark("s2"), pose: { x: 50, y: -34, s: 1, o: 0 } },
        { at: reelMark("t2"), pose: { x: 50, y: 44, s: 1, o: 1 } },
        { at: reelMark("s3"), pose: { x: 50, y: 136, s: 1, o: 0 } },
      ]}><i className="ln-cloud ln-cloud-gold" /></Actor>
      <Actor className="ln-thread-actor" width="3vw" zIndex={33} bob={4} tilt={0.14} stops={[
        { at: reelMark("s0"), pose: { x: 76, y: 67, s: 1, o: 1 } },
        { at: reelMark("t0"), pose: { x: 52, y: 32, s: 1, r: -5, o: 1 } },
        { at: reelMark("s1"), pose: { x: 31, y: 57, s: 1, o: 1 } },
        { at: reelMark("t1"), pose: { x: 31, y: 61, s: 1.6, o: 1, blur: 1 } },
        { at: reelMark("s2"), pose: { x: 66, y: 63, s: 1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 74, y: 28, s: 1, r: 5, o: 1 } },
        { at: reelMark("s3"), pose: { x: 85, y: 47, s: 1, o: 1 } },
        { at: reelMark("end"), pose: { x: 85, y: 44, s: 1, o: 1 } },
        { at: ".ln-manifest", pose: { x: 80, y: 6, s: 0.8, o: 0 } },
        { at: ".ln-spine-row:nth-child(1) .ln-spine-dot", pose: { x: 50, y: 50, s: 0.9, o: 1, dock: true } },
        { at: ".ln-spine-row:nth-child(2) .ln-spine-dot", pose: { x: 50, y: 50, s: 0.9, o: 1, dock: true } },
        { at: ".ln-spine-row:nth-child(3) .ln-spine-dot", pose: { x: 50, y: 50, s: 0.9, o: 1, dock: true } },
        { at: ".ln-spine-row:nth-child(4) .ln-spine-dot", pose: { x: 50, y: 50, s: 0.9, o: 1, dock: true } },
        { at: ".ln-cards", pose: { x: 16, y: 30, s: 0.8, o: 0 } },
        { at: ".ln-release", pose: { x: 20, y: 40, s: 0.8, o: 0 } },
        { at: ".ln-tag-hole", pose: { x: 50, y: 50, s: 0.85, o: 1, dock: true } },
        { at: ".ln-deal-card", pose: { x: 0, y: 16, s: 0.9, o: 1, dock: true } },
        { at: ".ln-climax", pose: { x: 50, y: -24, s: 0.8, o: 0 } },
      ]}>
        <div className="ln-thread">
          <svg className="ln-thread-up" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
            <path d="M20 1000 C 6 880, 34 760, 20 640 S 6 400, 20 280 S 32 90, 20 0" pathLength={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="ln-thread-down" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
            <path d="M20 1000 C 34 880, 6 760, 20 640 S 34 400, 20 280 S 8 90, 20 0" pathLength={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <i className="ln-ember" />
        </div>
      </Actor>

      {/* MANIFESTO — поверх рассветной вершины */}
      <section className="ln-manifest">
        <p>The valley has a thousand lights and none of them <em>mean anything.</em> Up here, one does.</p>
      </section>

      {/* SIGNATURE — высотная шкала: та же нить, закреплённый счётчик высоты; мир под ней проходит все 4 главы */}
      <section className="ln-ascent" id="ascent">
        <div className="ln-ascent-pin" aria-hidden>
          <div className="ln-alt-live"><b className="ln-alt-num">620</b><span>m</span></div>
          <span className="ln-alt-cap">on the thread, right now</span>
        </div>
        <div className="ln-ascent-body">
          <div className="ln-ascent-head"><span className="ln-kick">The route, metre by metre</span><h2>Four chapters, one thread of light.</h2></div>
          <ol className="ln-spine">
            {CHAPTERS.map(([alt, t, s], i) => (
              <li className="ln-spine-row" key={i}>
                <span className="ln-spine-dot" aria-hidden />
                <span className="ln-alt">{alt}</span>
                <h3>{t}</h3>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURE-CARDS — что несёшь наверх */}
      <section className="ln-cards" id="included">
        <div className="ln-cards-head"><span className="ln-kick">What the climb includes</span><h2>Three things you carry up.</h2></div>
        <div className="ln-card-grid">
          <article className="ln-card">
            <span className="ln-card-n">01</span>
            <h3>An ink-wash trail map</h3>
            <p>Every ridge and switchback painted before you walk it, so you&apos;re never guessing at the next gate in the fog.</p>
          </article>
          <article className="ln-card">
            <span className="ln-card-n">02</span>
            <h3>Threshold rites</h3>
            <p>A guide fluent in the temple&apos;s own customs walks you through the gate properly — the sweep, the bow, the incense.</p>
          </article>
          <article className="ln-card">
            <span className="ln-card-n">03</span>
            <h3>A hand-folded lantern</h3>
            <p>Made by village hands from mulberry paper and a length of red thread, and yours alone to release at the water.</p>
          </article>
        </div>
      </section>

      {/* RELEASE — блок мира вместо галереи плит: слова, отпущенные на воду */}
      <section className="ln-release" aria-label="Lanterns released last Saturday">
        <div className="ln-release-head">
          <span className="ln-kick">Lantern Water · last Saturday</span>
          <h2>One word each. <em>Then the water takes it.</em></h2>
          <p>Mulberry paper, a length of red thread and a word you never have to explain. This is what the last group let go.</p>
        </div>
        <ul className="ln-sky">
          {LAMPS.map(([w, x, y, s, d]) => (
            <li key={w} className="ln-lamp" style={{ left: `${x}%`, top: `${y}%`, ["--s" as string]: s, animationDelay: `-${d}s` }}>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* TAG — отзыв на бумажной табличке, привязанной той же нитью (вместо цитаты по центру) */}
      <section className="ln-tag">
        <figure className="ln-tag-card">
          <span className="ln-tag-hole" aria-hidden />
          <blockquote>“I wrote one word on my lantern and let the pond take it. I won&apos;t tell you the word. I&apos;ll tell you I slept the whole night, <em>first time in a year.</em>”</blockquote>
          <figcaption>— Priya N., third ascent · tag tied at the summit rail</figcaption>
        </figure>
      </section>

      {/* DEAL — нить садится на карточку */}
      <section className="ln-deal" id="book">
        <div className="ln-deal-card">
          <span className="ln-kick">The four-day ascent</span>
          <div className="ln-price"><b>$640</b><span>/ climber · guide, temple stays &amp; your lantern</span></div>
          <p>Four days, three nights — terrace trailhead to summit shrine, with a night at the lantern village between. Ten climbers at most, painted route notes sent ahead.</p>
          <a href="#" className="ln-btn">Reserve a departure</a>
          <span className="ln-note">Free to reschedule · Guide-led, every step</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ln-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ln-climax-veil" aria-hidden />
        <div className="ln-climax-copy"><h2>Tie your thread <em>above the cloud.</em></h2><a href="#book" className="ln-btn">Reserve the climb</a></div>
      </section>

      <footer className="ln-foot"><span className="ln-brand">REDTHREAD</span><span>Guided mountain ascents · Painted before climbed</span></footer>
    </div>
  );
}
