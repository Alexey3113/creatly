"use client";
/* MARROW — «guided descents into living rock». Мир: спуск в кристальные пещеры —
   устье → (спуск по шахте) аметистовый зал → (ирис сквозь свет фонаря) светящаяся река →
   (окклюзия тёмным уступом) кафедральный свод. Все сцены тёмные.
   Сквозной актёр — ТВОЙ ФОНАРЬ: единственный тёплый свет, в нижней трети кадра через весь рил;
   второй синхронный слой (color-dodge) заставляет кристаллы вспыхивать, когда фонарь проходит мимо.
   Датчик глубины на краю кадра 0 → 212 m. В лендинге фонарь спускается по шахте маршрутов,
   раскрывает картину сплита световым пятном и садится на карточку брони.
   Свой шрифт-пейринг Bodoni Moda × Hanken Grotesk. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth, type ActorStop } from "@/components/scene-kit";
import "./marrow.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/marrow";

const scenes: ReelScene[] = [
  { id: "mouth", dark: true, bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="mw-eyebrow">Guided descents into living rock</span>
      <h1>Bring the only<br /><em>warm light.</em></h1>
      <p>Four painted chambers and one lantern — yours. Obsidian mouth to a gold-veined cathedral, 212 metres down, every metre mapped before you take a step.</p>
      <div className="mw-cta"><a href="#book" className="mw-btn">Reserve a lantern</a><a href="#routes" className="mw-ghost">See the lines ↓</a></div>
    </>
  ) },
  { id: "crystal", dark: true, into: "descend", tint: "#7a4ad0", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="mw-idx">— 02 · the violet hall · −70 m</span><h2>The Amethyst Hall</h2>
      <p>Three hundred and forty million years of pressure, standing as glass. Your lantern is the only warmth this crystal has ever known.</p></>
  ) },
  { id: "river", dark: true, into: "portal", portal: { x: 46, y: 64 }, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 5, copy: (
    <><span className="mw-idx">— 03 · the glow current · −150 m</span><h2>The Glass River</h2>
      <p>A teal current older than the passage above it, moving without sound. Your guide crosses the ledge first; you follow the light.</p></>
  ) },
  { id: "cathedral", dark: true, into: "occlude", tint: "#0b0810", len: 1.3, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 7,
    freeze: (<div className="mw-freeze"><b>212 m</b><span>the floor · stand still</span></div>), copy: (
    <><span className="mw-idx">— 04 · the deep nave · −212 m</span><h2>The Cathedral Floor</h2>
      <p>Gold veins climb into a dark you cannot see the top of. Stand still. This is the point of the whole descent.</p></>
  ) },
];

const LINES = [
  { depth: "40 m", name: "The Threshold Line", meta: "90 min · Easy", body: "A short, well-lit walk to the edge of the Amethyst Hall. Built for first-timers and families of eight and up." },
  { depth: "110 m", name: "The Violet Line", meta: "3 hrs · Moderate", body: "Through the crystal hall and along the glass river ledge. Our most-booked descent — the one people describe for years." },
  { depth: "212 m", name: "The Deep Line", meta: "5 hrs · Advanced", body: "The full marrow, mouth to cathedral floor. Small groups only, led by our senior geologist-guides." },
];

const FAQ = [
  ["Is it safe if I'm claustrophobic?", "The Threshold and Violet Lines stay in halls over 8 metres wide — no squeezes. The Deep Line has two narrow points, clearly marked ahead of time."],
  ["What fitness level do I need?", "If you can climb four flights of stairs without stopping, you can do the Violet Line. The Deep Line asks for a little more."],
  ["How cold is it down there?", "A steady 11°C year-round. We provide thermal layers — bring closed shoes."],
  ["What's the minimum age?", "Eight for the Threshold Line, twelve for the Violet Line, sixteen for the Deep Line."],
];

/* путь фонаря: нижняя треть кадра через рил → шахта маршрутов → сплит → карточка брони */
const LAMP: ActorStop[] = [
  { at: reelMark("s0"), pose: { x: 71, y: 73, s: 1, r: -4, o: 1 } },
  { at: reelMark("t0"), pose: { x: 60, y: 79, s: 1, r: 6, o: 1 } },
  { at: reelMark("s1"), pose: { x: 27, y: 76, s: 1, r: -3, o: 1 } },
  { at: reelMark("t1"), pose: { x: 46, y: 64, s: 1.9, o: 1 } },
  { at: reelMark("s2"), pose: { x: 31, y: 73, s: 1, r: 3, o: 1 } },
  { at: reelMark("t2"), pose: { x: 52, y: 82, s: 1.1, o: 0.35, blur: 2 } },
  { at: reelMark("s3"), pose: { x: 50, y: 74, s: 0.62, o: 1 } },
  { at: reelMark("end"), pose: { x: 50, y: 72, s: 0.58, o: 1 } },
  { at: ".mw-manifest", pose: { x: 50, y: 78, s: 0.8, o: 1 } },
  { at: ".mw-shaft-stop:nth-child(1) .mw-shaft-mark", pose: { x: 50, y: 50, s: 0.7, o: 1, dock: true } },
  { at: ".mw-shaft-stop:nth-child(2) .mw-shaft-mark", pose: { x: 50, y: 50, s: 0.7, o: 1, dock: true } },
  { at: ".mw-shaft-stop:nth-child(3) .mw-shaft-mark", pose: { x: 50, y: 50, s: 0.7, o: 1, dock: true } },
  { at: ".mw-split-media", pose: { x: 58, y: 62, s: 1, o: 1, dock: true } },
  { at: ".mw-faq", pose: { x: 90, y: 78, s: 0.6, o: 0.85 } },
  { at: ".mw-deal-card", pose: { x: 50, y: 0, s: 0.8, o: 1, dock: true } },
  { at: ".mw-climax", pose: { x: 50, y: 60, s: 0.9, o: 0 } },
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

export function Marrow() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const gauge = el.querySelector<HTMLElement>(".mw-gauge");
    const num = el.querySelector<HTMLElement>(".mw-gauge-num");
    // датчик глубины: 0 → 212 m по рилу, держится на дне, в шахте маршрутов показывает глубину линии
    const offDepth = follow(
      [reelMark("s0"), reelMark("s1"), reelMark("s2"), reelMark("s3"), ".mw-manifest",
        ".mw-shaft-stop:nth-child(1) .mw-shaft-mark", ".mw-shaft-stop:nth-child(2) .mw-shaft-mark", ".mw-shaft-stop:nth-child(3) .mw-shaft-mark", ".mw-split"],
      [0, 70, 150, 212, 212, 40, 110, 212, 212],
      (v) => {
        if (num) num.textContent = String(Math.round(v));
        el.style.setProperty("--mw-depth", (v / 212).toFixed(4));
      });
    const offVis = follow([".mw-split", ".mw-deal"], [1, 0], (v) => { if (gauge) gauge.style.opacity = v.toFixed(3); });
    // световое пятно фонаря раскрывает картину сплита: координаты фонаря → CSS-переменные картинки
    const lamp = el.querySelector<HTMLElement>(".mw-lamp-actor");
    const media = el.querySelector<HTMLElement>(".mw-split-media");
    const offReveal = subscribe(({ vh }) => {
      if (!lamp || !media) return;
      const m = media.getBoundingClientRect();
      if (m.bottom < -vh * 0.2 || m.top > vh * 1.2) return;
      const l = lamp.getBoundingClientRect();
      media.style.setProperty("--lx", `${(((l.left + l.width / 2) - m.left) / m.width * 100).toFixed(2)}%`);
      media.style.setProperty("--ly", `${(((l.top + l.height / 2) - m.top) / m.height * 100).toFixed(2)}%`);
    });
    return () => { offDepth(); offVis(); offReveal(); };
  }, []);

  return (
    <div className="mw" ref={root}>
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"]} />
      <header className="mw-nav">
        <span className="mw-brand">MARROW</span>
        <nav><a href="#routes">The lines</a><a href="#faq">Before you go</a><a href="#book" className="mw-nav-cta">Reserve a lantern</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* СКВОЗНОЙ СЛОЙ: минеральный свет под лендингом, споры в темноте, фонарь, датчик глубины */}
      <Atmosphere stops={[
        { at: ".mw-manifest", color: "#120e18" }, { at: ".mw-shaft-stop:nth-child(1)", color: "#1a1030" },
        { at: ".mw-shaft-stop:nth-child(2)", color: "#0c1a1e" }, { at: ".mw-shaft-stop:nth-child(3)", color: "#171208" },
        { at: ".mw-split", color: "#0f0b14" }, { at: ".mw-faq", color: "#0d0a12" }, { at: ".mw-deal", color: "#120d18" },
      ]} />
      <Backdrop className="mw-bd" from=".mw-manifest" dim={0.46} plates={[
        { at: ".mw-manifest", src: `${A}/s4-bg.webp` },
        { at: ".mw-shaft-stop:nth-child(1)", src: `${A}/s2-bg.webp` },
        { at: ".mw-shaft-stop:nth-child(2)", src: `${A}/s3-bg.webp` },
        { at: ".mw-shaft-stop:nth-child(3)", src: `${A}/s4-bg.webp` },
        { at: ".mw-faq", src: `${A}/s1-bg.webp`, pos: "50% 30%" },
        { at: ".mw-deal", src: `${A}/s4-bg.webp` },
      ]} />
      <Weather kind="spores" count={20} color="#8fe3d8" color2="#b58cf0" between={[reelMark("s0"), ".mw-deal"]} world={0.5} zIndex={31} />
      {/* вспышка кристаллов: большой тёплый color-dodge идёт ровно за фонарём */}
      <Actor className="mw-flare-actor" width="10vw" zIndex={31} bob={5} tilt={0.22} stops={LAMP}><i className="mw-flare" /></Actor>
      <Actor className="mw-lamp-actor" width="10vw" zIndex={33} bob={5} tilt={0.22} stops={LAMP}>
        <div className="mw-lamp">
          <i className="mw-lamp-glow" />
          <svg className="mw-lamp-body" viewBox="0 0 60 100" aria-hidden>
            <path className="mw-lamp-ring" d="M22 14 C22 2, 38 2, 38 14" />
            <path className="mw-lamp-metal" d="M17 20 L43 20 L39 28 L21 28 Z M19 80 L41 80 L44 88 L16 88 Z" />
            <path className="mw-lamp-glass" d="M21 28 L39 28 C44 44, 44 64, 41 80 L19 80 C16 64, 16 44, 21 28 Z" />
            <path className="mw-lamp-bars" d="M30 28 L30 80 M21 28 C17 46, 17 64, 19 80 M39 28 C43 46, 43 64, 41 80" />
            <ellipse className="mw-lamp-flame" cx="30" cy="58" rx="5" ry="10" />
          </svg>
        </div>
      </Actor>
      <div className="mw-gauge" aria-hidden>
        <span className="mw-gauge-cap">depth</span>
        <div className="mw-gauge-rail"><i className="mw-gauge-tick" /></div>
        <b>−<span className="mw-gauge-num">0</span> m</b>
      </div>

      {/* MANIFESTO — поверх собора */}
      <section className="mw-manifest">
        <p>Down here, dark is not empty — it is <em>volume</em>. And every metre of it holds a colour the sun has never seen.</p>
      </section>

      {/* SHAFT — маршруты как шахта глубин (вместо цифр×4, карточек и шагов): фонарь спускается по ней */}
      <section className="mw-shaft" id="routes">
        <div className="mw-shaft-head"><span className="mw-kick">Three lines into the rock</span><h2>Choose how deep<br />your light goes.</h2></div>
        <ol className="mw-shaft-list">
          {LINES.map((l, i) => (
            <li className="mw-shaft-stop" key={i}>
              <span className="mw-shaft-mark" aria-hidden />
              <span className="mw-shaft-depth">−{l.depth}</span>
              <div className="mw-shaft-copy">
                <h3>{l.name}</h3>
                <span className="mw-shaft-meta">{l.meta}</span>
                <p>{l.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SPLIT — картину раскрывает свет фонаря */}
      <section className="mw-split">
        <div className="mw-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="mw-split-copy">
          <span className="mw-kick">Why we map before we walk</span>
          <h2>Every line is painted before it&apos;s guided.</h2>
          <p>Our geologists chart each chamber, current and drop before a single guest goes down. You are never the first to find out where the path turns — we already know, and we already painted it.</p>
          <a href="#faq" className="mw-link">Read what to expect →</a>
        </div>
      </section>

      {/* FAQ / ACCORDION */}
      <section className="mw-faq" id="faq">
        <div className="mw-faq-head"><span className="mw-kick">Before you go down</span><h2>What people ask us at the mouth.</h2></div>
        <div className="mw-faq-list">
          {FAQ.map(([q, a], i) => (
            <details className="mw-faq-item" key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — фонарь садится на карточку */}
      <section className="mw-deal" id="book">
        <div className="mw-deal-card">
          <span className="mw-kick">The guided descent</span>
          <div className="mw-price"><b>€180</b><span>/ guest · lantern, guide &amp; the mapped line</span></div>
          <p>Half a day underground, one full descent, every stage briefed and equipped. Reserve your line and we send the painted route in advance.</p>
          <a href="#" className="mw-btn">Reserve a lantern</a>
          <span className="mw-note">“It wasn&apos;t a tour. It was being shown the inside of a mountain.” — Rhea N., speleologist</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="mw-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="mw-climax-veil" aria-hidden />
        <div className="mw-climax-copy"><h2>Two hundred metres of dark,<br /><em>waiting for one light.</em></h2><a href="#book" className="mw-btn">Book a descent</a></div>
      </section>

      <footer className="mw-foot"><span className="mw-brand">MARROW</span><span>Guided descents into living rock · Mapped before it&apos;s walked</span></footer>
    </div>
  );
}
