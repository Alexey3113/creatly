"use client";
/* KOI — "Koian" garden & tea-house retreat. Мир: сад как замедленное время — мшистая тропа тории →
   тихий пруд с карпами → клёновый мост → чайный дом ночью. Woodblock-flat gouache (не ink-wash — это Lantern).
   Собран на общем движке <Reel/>; лендинг и типографика — свои (Italiana × Sora, палитра moss/vermilion/gold/
   slate-night + red CTA). СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): красный карп — одна красная нить на весь сайт.
   Он плывёт над садом, ныряет в ворота тории (портал-зум), кружит в пруду, ведёт панораму к мосту и
   растворяется в огне чайного дома; в лендинге он плывёт по красной линии сезонов (рисуется от скролла)
   и садится на карточку брони. Фон лендинга — день → ночь. */
import { useEffect, useRef, useState } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, clamp01 } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./koi.css";

const A = "/uploads/1/animated/koi";
const CARP = `${A}/actor-carp.webp`;
/* центр проёма ворот тории в hero (% экрана, вырезка ворот уведена в правую треть CSS-ом) */
const GATE = { x: 73, y: 64 };

const scenes: ReelScene[] = [
  { id: "torii", len: 1.1, hold: 0.5, bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ko-eyebrow">A garden walked slowly</span>
      <h1>Four gates,<br /><em>one long exhale.</em></h1>
      <p>A walked garden in four unhurried scenes — moss path, koi water, the maple bridge, a lit tea house at the hour the garden empties. Nothing here is rushed, including you.</p>
      <div className="ko-cta"><a href="#book" className="ko-btn">Reserve a walk</a><a href="#offerings" className="ko-ghost">See the gates →</a></div>
    </>
  ) },
  { id: "pond", into: "portal", portal: GATE, bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ko-idx">— 02 · the still water</span><h2>Koi Water</h2>
      <p>Forty fish older than the bridge above them, turning slow circles under the lily pads. Stand at the rail long enough and your own reflection stops fidgeting.</p></>
  ) },
  { id: "bridge", into: "pan", len: 1.2, hold: 0.55, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="ko-freeze"><b>4:00</b><span>pm · the red hour on the bridge</span></div>), copy: (
    <><span className="ko-idx">— 03 · the red crossing</span><h2>Maple Bridge</h2>
      <p>One arched crossing under a maple that drops its leaves like a held breath finally let go. Vermilion paint, vermilion leaf — the whole garden agrees on this one color.</p></>
  ) },
  { id: "teahouse", dark: true, into: "occlude", tint: "#121a24", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="ko-idx ko-light">— 04 · the last light</span><h2 className="ko-hl">Teahouse at Night</h2>
      <p className="ko-pl">Paper screens glow gold over the stepping stones. Whoever is inside has already stopped counting the hour. So will you.</p></>
  ) },
];

const SEASONS: [string, string, string, string][] = [
  ["Spring", "First Bow", "The moss greens overnight and the koi remember how to feed at the surface. We open every season by teaching guests to bow at the garden gate — the first rule of pace.", "ko-dot-spring"],
  ["Summer", "Deep Shade", "Full canopy, thick moss, cicadas timing themselves against the fountain's draw and release. The tea master serves cold, whisked matcha under the willow.", "ko-dot-summer"],
  ["Autumn", "Red Hour", "The maple ignites for one week only. Guests are seated at the bridge at exactly four o'clock, when the low sun sets the whole crossing on fire.", "ko-dot-autumn"],
  ["Winter", "Held Water", "Snow on the stone lanterns, the pond half-glassed with ice, koi moving slow beneath it. The garden's quietest season is, guests say, its most honest.", "ko-dot-winter"],
];

const FAQS: [string, string][] = [
  ["Is the garden open in every season?", "Yes — the moss path, pond and bridge are walked year-round; only the teahouse ceremony pauses during the coldest fortnight of winter."],
  ["Can I photograph the koi and the maple bridge?", "Yes, quietly. We only ask you to lower the phone for the ten minutes of the tea ceremony itself — the one rule that matters."],
  ["How many people join a walk?", "Twelve at most, usually fewer. The garden was built for a handful of people at a time, not a crowd."],
  ["What should I wear?", "Flat, quiet shoes. The stepping stones are old and uneven, and the teahouse asks you to remove them at the door."],
];

/* тон навигации: чернила на дневном саду, бумага ночью (маркеры t{i} рила считают сцену) */
function NavTone() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".ko");
    const reel = root?.querySelector<HTMLElement>(".rl-reel");
    if (!root || !reel) return;
    const marks = Array.from(reel.querySelectorAll<HTMLElement>('[data-reel-mark^="t"]'));
    let last = "";
    return subscribe(({ vh }) => {
      let tone = "light";
      const r = reel.getBoundingClientRect();
      if (r.top <= 40 && r.bottom > 40) {
        let k = 0;
        for (const m of marks) if (m.getBoundingClientRect().top < vh / 2) k++;
        tone = scenes[Math.min(k, scenes.length - 1)].dark ? "dark" : "light";
      } else {
        root.querySelectorAll<HTMLElement>("[data-tone]").forEach((s) => {
          const b = s.getBoundingClientRect();
          if (b.top <= 40 && b.bottom > 40) tone = s.dataset.tone || "light";
        });
      }
      if (tone !== last) { root.dataset.nav = tone; last = tone; }
    });
  }, []);
  return <span ref={ref} hidden />;
}

/* СЕЗОНЫ = ПУТЬ КАРПА: красная линия петляет между сезонами и рисуется от скролла, карп плывёт на её острие */
function CarpPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [d, setD] = useState("");
  useEffect(() => {
    const box = ref.current;
    const spine = box?.parentElement;
    if (!box || !spine) return;
    const path = box.querySelector<SVGPathElement>("path.ko-carp-line");
    const carp = box.querySelector<HTMLElement>(".ko-carp-swim");
    const build = () => {
      const w = spine.clientWidth, h = spine.clientHeight;
      const rows = Array.from(spine.querySelectorAll<HTMLElement>(".ko-spine-row"));
      const pts = rows.map((r, i) => ({ x: i % 2 ? w * 0.62 : w * 0.38, y: r.offsetTop + r.offsetHeight / 2 }));
      let s = `M ${w / 2} 0`;
      let prev = { x: w / 2, y: 0 };
      for (const p of [...pts, { x: w / 2, y: h }]) {
        const my = (prev.y + p.y) / 2;
        s += ` C ${prev.x} ${my}, ${p.x} ${my}, ${p.x} ${p.y}`;
        prev = p;
      }
      setD(s);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(spine);
    const unsub = subscribe(({ vh, reduced }) => {
      if (!path || !carp) return;
      const L = path.getTotalLength();
      if (!L) return;
      const r = spine.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = reduced ? 1 : clamp01((vh * 0.6 - r.top) / r.height);
      path.style.strokeDasharray = `${L}`;
      path.style.strokeDashoffset = `${(L * (1 - p)).toFixed(1)}`;
      const at = Math.max(1, L * p);
      const a = path.getPointAtLength(at), b = path.getPointAtLength(Math.max(0, at - 6));
      const ang = (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;
      const flip = Math.abs(ang) > 90;
      carp.style.transform = `translate(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px) translate(-78%, -50%) rotate(${(flip ? ang - 180 : ang).toFixed(1)}deg) scaleX(${flip ? -1 : 1})`;
      carp.style.transformOrigin = "78% 50%";
      carp.style.opacity = p > 0.01 && p < 0.995 ? "1" : "0";
    });
    return () => { ro.disconnect(); unsub(); };
  }, []);
  return (
    <div ref={ref} className="ko-carp-path" aria-hidden>
      <svg width="100%" height="100%"><path className="ko-carp-line" d={d} /></svg>
      <img className="ko-carp-swim" src={CARP} alt="" draggable={false} />
    </div>
  );
}

export function Koi() {
  return (
    <div className="ko" data-nav="light">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Italiana&family=Sora:wght@400;500;600;700&display=swap"]} />
      <NavTone />
      <header className="ko-nav">
        <span className="ko-brand"><i aria-hidden />KOIAN</span>
        <nav>
          <a href="#offerings">The offerings</a>
          <a href="#seasons">Seasons</a>
          <a href="#book" className="ko-nav-cta">Reserve a walk</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="walk ↓" />

      {/* СКВОЗНОЙ СЛОЙ: красный карп, клёновые листья у моста, свет дня → ночи под лендингом */}
      <Atmosphere stops={[
        { at: ".ko-manifest", color: "#f4ede0" }, { at: ".ko-split", color: "#f1e8d6" }, { at: ".ko-cards", color: "#e9dfca" },
        { at: ".ko-seasons", color: "#3b4a45", anchor: 0.15 }, { at: ".ko-seasons", color: "#2c3a44", anchor: 0.85 },
        { at: ".ko-quote", color: "#1f2a37" }, { at: ".ko-faq", color: "#19222d" }, { at: ".ko-deal", color: "#151d27" }, { at: ".ko-climax", color: "#101820" },
      ]} />
      <Backdrop from=".ko-seasons" dim={0.72} plates={[
        { at: ".ko-seasons", src: `${A}/s3-bg.webp` }, { at: ".ko-quote", src: `${A}/s4-bg.webp` }, { at: ".ko-deal", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
      ]} />
      <Weather kind="leaves" count={16} color="#b02a24" color2="#d9542c" between={[reelMark("t1"), reelMark("t2")]} world={0.6} zIndex={31} />
      <Actor src={CARP} width="15vw" zIndex={32} bob={7} tilt={0.06} stops={[
        { at: reelMark("s0"), pose: { x: 60, y: 22, s: 0.62, r: -7, o: 1 } },
        { at: reelMark("t0"), pose: { x: GATE.x, y: GATE.y - 4, s: 0.26, r: 14, o: 0.9 } },
        { at: reelMark("s1"), pose: { x: 46, y: 76, s: 1.15, r: 3, o: 1 } },
        { at: reelMark("t1"), pose: { x: 58, y: 73, s: 1.05, r: 0, o: 1 } },
        { at: reelMark("a2"), pose: { x: 50, y: 85, s: 0.7, r: -3, o: 1 } },
        { at: reelMark("s2"), pose: { x: 50, y: 85, s: 0.7, r: -3, o: 1 } },
        { at: reelMark("h2"), pose: { x: 50, y: 85, s: 0.7, r: -3, o: 1 } },
        { at: reelMark("t2"), pose: { x: 60, y: 71, s: 0.3, r: -12, o: 0 } },
        { at: ".ko-manifest", pose: { x: 82, y: 58, s: 0.62, r: -5, o: 0 } },
        { at: ".ko-manifest", anchor: 0.7, pose: { x: 80, y: 52, s: 0.62, r: -5, o: 1 } },
        { at: ".ko-split-media", pose: { x: 46, y: 62, s: 0.95, r: 4, o: 1, dock: true } },
        { at: ".ko-cards", anchor: 0.3, pose: { x: 92, y: 18, s: 0.5, r: -10, o: 0 } },
        { at: ".ko-deal-card", anchor: 0.2, pose: { x: 90, y: 0, s: 0.5, r: -14, o: 0, dock: true } },
        { at: ".ko-deal-card", pose: { x: 88, y: 8, s: 0.52, r: -14, o: 1, dock: true } },
        { at: ".ko-climax", pose: { x: 78, y: 30, s: 0.6, r: -8, o: 0 } },
      ]} />
      {/* огонь чайного дома — куда растворяется карп */}
      <Actor className="ko-flame-actor" width="18vw" zIndex={31} bob={0} tilt={0} stops={[
        { at: reelMark("s2"), pose: { x: 60, y: 71, s: 0.3, o: 0 } },
        { at: reelMark("t2"), pose: { x: 61, y: 72, s: 0.8, o: 0.9 } },
        { at: reelMark("s3"), pose: { x: 63, y: 72, s: 1.2, o: 0.85 } },
        { at: ".ko-manifest", pose: { x: 63, y: 60, s: 1.4, o: 0 } },
      ]}><div className="ko-flame" /></Actor>

      {/* MANIFESTO — одна крупная мысль */}
      <section className="ko-manifest" data-tone="light">
        <p>The garden keeps one color that never apologizes for itself. <em>Follow the red</em> — koi, maple, lantern — and it walks you the whole way through.</p>
      </section>

      {/* SPLIT — пруд; карп заплывает в кадр */}
      <section className="ko-split" data-tone="light">
        <div className="ko-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ko-split-copy">
          <span className="ko-kick">Why the water matters</span>
          <h2>We built the whole garden around one still pond.</h2>
          <p>Every path bends toward the koi water eventually — the torii gate, the tea house, even the maple bridge is angled so its reflection lands there. Stillness isn&rsquo;t decoration here; it&rsquo;s the plan.</p>
          <span className="ko-facts">300 years · 40 koi · 12 guests a walk, never more</span>
        </div>
      </section>

      {/* FEATURE-CARDS — три предложения сада */}
      <section className="ko-cards" id="offerings" data-tone="light">
        <div className="ko-cards-head"><span className="ko-kick">What a walk includes</span><h2>Three ways to slow down here.</h2></div>
        <div className="ko-card-grid">
          <article className="ko-card">
            <span className="ko-card-n">01</span>
            <h3>The Moss-Path Walk</h3>
            <p>Ninety unhurried minutes through torii, pond and bridge with a guide who has walked the same stones for eleven years and still slows down at the koi.</p>
          </article>
          <article className="ko-card">
            <span className="ko-card-n">02</span>
            <h3>Tea Ceremony, Properly</h3>
            <p>A bowl of matcha whisked in front of you in the lit tea house, taught the old way — kneel, receive, turn the bowl, drink, admire.</p>
          </article>
          <article className="ko-card">
            <span className="ko-card-n">03</span>
            <h3>Koi Feeding at Dusk</h3>
            <p>Forty fish rise to the surface the moment the light goes gold. You feed them by hand while the rest of the garden empties out around you.</p>
          </article>
        </div>
      </section>

      {/* SIGNATURE — четыре сезона на ПУТИ КАРПА (вместо ряда плит, цифр и бегущей строки) */}
      <section className="ko-seasons" id="seasons" data-tone="dark">
        <div className="ko-seasons-head"><span className="ko-kick ko-kick-gold">The garden, season by season</span><h2>Four seasons, one red line.</h2></div>
        <div className="ko-spine">
          <CarpPath />
          <ol className="ko-spine-list">
            {SEASONS.map(([season, t, s, dot], i) => (
              <li className={`ko-spine-row ${i % 2 ? "ko-spine-r" : "ko-spine-l"}`} key={season}>
                <div className="ko-spine-body">
                  <span className="ko-season">{season}</span>
                  <h3>{t}</h3>
                  <p>{s}</p>
                </div>
                <span className={`ko-spine-dot ${dot}`} aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUOTE — висящий свиток, а не цитата по центру */}
      <section className="ko-quote" data-tone="dark">
        <figure className="ko-scroll">
          <blockquote>&ldquo;I have visited gardens on three continents and none of them made me put my phone away without asking. This one just <em>did.</em>&rdquo;</blockquote>
          <figcaption>— Renata H., tea instructor · Lisbon</figcaption>
          <span className="ko-seal" aria-hidden>鯉</span>
        </figure>
      </section>

      {/* FAQ */}
      <section className="ko-faq" id="faq" data-tone="dark">
        <div className="ko-faq-head"><span className="ko-kick ko-kick-gold">Before you come</span><h2>A few things guests ask.</h2></div>
        <div className="ko-faq-list">
          {FAQS.map(([q, a]) => (
            <details className="ko-faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — карп садится на карточку («бумажный карп с собой») */}
      <section className="ko-deal" id="book" data-tone="dark">
        <div className="ko-deal-card">
          <span className="ko-kick ko-kick-gold">The four-gate walk</span>
          <div className="ko-price"><b>$145</b><span>/ guest · walk, tea ceremony &amp; a folded paper koi to take home</span></div>
          <p>Ninety minutes on the moss path, a seated ceremony in the lit tea house, and the whole garden mostly to yourselves. Small groups, every season.</p>
          <a href="#" className="ko-btn">Reserve a walk</a>
          <span className="ko-note">Free to reschedule · Rain or shine, the garden holds</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ko-climax" data-tone="dark" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ko-climax-veil" aria-hidden />
        <div className="ko-climax-copy"><h2>Leave your hour <em>at the gate.</em></h2><a href="#book" className="ko-btn">Reserve a walk</a></div>
      </section>

      <footer className="ko-foot" data-tone="dark"><span className="ko-brand"><i aria-hidden />KOIAN</span><span>Garden walks &amp; tea, kept slow.</span></footer>
    </div>
  );
}
