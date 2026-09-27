"use client";
/* FROST — «guided arctic crossings». Мир: горизонтальный минимализм холода — снежная пустошь,
   ледяной грот, полярная ночь под сиянием, замёрзшее море льдин. Собран на общем движке <Reel/>;
   лендинг и типографика — свои, шрифт-пейринг Familjen Grotesk × Onest, палитра snow/glacial/deep-ice
   + аврора-зелёный ТОЛЬКО на сцене сияния и CTA.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): один крошечный путник (3–5% кадра) и ОДНА цепочка следов.
   Следы — актёр: рисуются от скролла в каждой сцене и переживают склейки (метель-окклюзия уносит их,
   занавес сияния режет их своей кромкой, панорама везёт их вместе с камерой), затем в лендинге
   становятся той же пунктирной линией, которая доводит до кнопки брони. */
import { useEffect, useRef, useState } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Weather, Atmosphere, Backdrop, subscribe, clamp01, smooth, win, lerp } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./frost.css";

const A = "/uploads/1/animated/frost";

/* ОДИН ПЕРЕХОД НА СЕВЕР: равнина →(метель-whiteout) ледяной свод →(занавес сияния) полярная ночь →(панорама) морской лёд.
   Путник везде один и крошечный: s1-mid (сани) на равнине и на льду, s3-mid (силуэт) в гроте и под сиянием. */
const scenes: ReelScene[] = [
  { id: "plain", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s4-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="fr-eyebrow">Guided arctic crossings</span>
      <h1>Empty is <em>the whole point.</em></h1>
      <p>A four-day crossing on foot — snow plain, glacier ice, polar night and frozen sea — following one line of footprints the whole way north.</p>
      <div className="fr-cta"><a href="#book" className="fr-btn">Book a crossing</a><a href="#route" className="fr-ghost">See the route →</a></div>
    </>
  ) },
  { id: "cave", dark: true, into: "occlude", tint: "#eef4f7", bg: `${A}/s2-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="fr-idx fr-light">— 02 · the vault</span><h2>The Ice Vault</h2>
      <p className="fr-pl">A thousand years of pressure, bent into blue light. Inside, no one talks above a whisper.</p></>
  ) },
  { id: "aurora", dark: true, into: "sweep", tint: "#5be0a0", len: 1.25, hold: 0.55, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`,
    freeze: (<div className="fr-freeze"><b>−34°C</b><span>02:14 · no wind · look up</span></div>), copy: (
    <><span className="fr-idx fr-light">— 03 · polar night</span><h2>Aurora</h2>
      <p className="fr-pl">No wind, no moon — just green light folding over the dark, and the sound of your own breath.</p></>
  ) },
  { id: "seaice", into: "pan", bg: `${A}/s4-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="fr-idx">— 04 · the last ice</span><h2>Sea Ice</h2>
      <p>Pale floes at dawn, a crack of gold between them. One careful step, then the next, until there&rsquo;s shore.</p></>
  ) },
];

/* таймлайн рила (та же партитура, что считает движок) — следы синхронны склейкам */
const N_SC = scenes.length;
const LENS = scenes.map((s) => s.len ?? 1);
const HOLDS = scenes.map((s) => Math.min(0.9, Math.max(0.1, s.hold ?? 0.42)));
const STARTS = LENS.map((_, i) => LENS.slice(0, i).reduce((a, b) => a + b, 0));
const TOTAL = LENS.reduce((a, b) => a + b, 0);
const holdEnd = (i: number) => STARTS[i] + (i === N_SC - 1 ? LENS[i] : HOLDS[i] * LENS[i]);

/* путь следов в каждой сцене (% экрана): от камеры к путнику; near/far — перспектива; c — цвет отпечатка */
type Path = { p0: [number, number]; p1: [number, number]; p2: [number, number]; near: number; far: number; c: string; o: number };
const PATHS: Path[] = [
  { p0: [9, 106], p1: [38, 74], p2: [66.5, 62.4], near: 1.15, far: 0.2, c: "#3a6a86", o: 0.55 },
  { p0: [40, 106], p1: [50, 83], p2: [55.2, 70.2], near: 1.05, far: 0.22, c: "#123a4c", o: 0.5 },
  { p0: [16, 106], p1: [33, 86], p2: [57, 78.4], near: 1.1, far: 0.24, c: "#d6e8ee", o: 0.42 },
  { p0: [3, 104], p1: [22, 76], p2: [52.6, 65.4], near: 1.15, far: 0.2, c: "#3a6a86", o: 0.55 },
];
const PRINTS = 24;

/* ФИКСИРОВАННЫЙ СЛОЙ СЛЕДОВ поверх рила: слой A — текущая сцена, слой B — входящая */
function FrostTrail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reel = root.parentElement?.querySelector<HTMLElement>(".rl-reel");
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".fr-tr-layer"));
    const prints = layers.map((l) => Array.from(l.children) as HTMLElement[]);
    const into = scenes.map((s) => s.into ?? "rise");
    const E = smooth;
    const draw = (li: number, si: number, reveal: number, vw: number, vh: number) => {
      const P = PATHS[si];
      const L = layers[li];
      L.style.setProperty("--pc", P.c);
      // тот же дрейф, что у mid-плана сцены (путник и его следы едут вместе)
      const ps = prints[li];
      for (let k = 0; k < ps.length; k++) {
        const t = k / (ps.length - 1);
        const a = 1 - t;
        const x = a * a * P.p0[0] + 2 * a * t * P.p1[0] + t * t * P.p2[0];
        const y = a * a * P.p0[1] + 2 * a * t * P.p1[1] + t * t * P.p2[1];
        const dx = 2 * a * (P.p1[0] - P.p0[0]) + 2 * t * (P.p2[0] - P.p1[0]);
        const dy = 2 * a * (P.p1[1] - P.p0[1]) + 2 * t * (P.p2[1] - P.p1[1]);
        const ang = Math.atan2(dy * vh, dx * vw);
        const sc = lerp(P.near, P.far, Math.pow(t, 0.75));
        const side = k % 2 ? 1 : -1;
        const off = 9 * sc * side;
        const px = (x / 100) * vw - Math.sin(ang) * off;
        const py = (y / 100) * vh + Math.cos(ang) * off;
        const op = clamp01((reveal - t) * ps.length + 0.5) * P.o * (0.55 + 0.45 * (1 - t));
        const n = ps[k];
        n.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${((ang * 180) / Math.PI + 90).toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        n.style.opacity = op.toFixed(3);
      }
    };
    const holdReveal = (k: number, u: number) => {
      const r0 = k === 0 ? 0.32 : into[k] === "occlude" ? 0.42 : 1;
      return lerp(r0, 1, smooth(win(u, STARTS[k], STARTS[k] + (holdEnd(k) - STARTS[k]) * 0.7)));
    };
    const sp = (i: number, u: number) => {
      const U = STARTS[i], hE = holdEnd(i);
      if (i > 0 && u < U) return 0.3 * win(u, holdEnd(i - 1), U);
      if (u <= hE) {
        const frz = !!scenes[i].freeze && u >= U + (hE - U) * 0.22 && u <= U + (hE - U) * 0.88;
        return frz ? 0.3 + 0.4 * 0.22 : 0.3 + 0.4 * win(u, U, hE);
      }
      return 0.7 + 0.3 * win(u, hE, U + LENS[i]);
    };
    const drift = (L: HTMLElement, i: number, u: number, extra = "") => {
      const s = sp(i, u);
      L.style.transform = `${extra} translate3d(0, ${((0.5 - s) * 5).toFixed(2)}vh, 0) scale(${(1 + s * 0.14).toFixed(4)})`;
    };
    return subscribe(({ vw, vh, reduced }) => {
      if (!reel || reduced) { root.style.display = "none"; return; }
      const r = reel.getBoundingClientRect();
      const travel = Math.max(1, reel.offsetHeight - vh);
      const u = clamp01(-r.top / travel) * TOTAL;
      // выход рила: стадия уезжает вверх — следы уезжают вместе с ней и гаснут
      const lift = Math.min(0, r.bottom - vh);
      root.style.opacity = clamp01((r.bottom - vh * 0.35) / (vh * 0.5)).toFixed(3);
      root.style.visibility = r.bottom < vh * 0.35 ? "hidden" : "";
      root.style.translate = `0 ${lift.toFixed(1)}px`;
      let j = -1, tj = 0;
      for (let i = 1; i < N_SC; i++) { const t = win(u, holdEnd(i - 1), STARTS[i]); if (t > 0 && t < 1) { j = i; tj = t; break; } }
      const [LA, LB] = layers;
      LA.style.maskImage = LB.style.maskImage = "";
      LA.style.opacity = "1";
      if (j < 0) {
        let k = 0;
        for (let i = 0; i < N_SC; i++) if (u >= STARTS[i] - 1e-6) k = i;
        draw(0, k, holdReveal(k, u), vw, vh);
        drift(LA, k, u);
        LB.style.opacity = "0";
        return;
      }
      const e = E(tj);
      draw(0, j - 1, 1, vw, vh);
      LB.style.opacity = "1";
      switch (into[j]) {
        case "occlude": // метель: старые следы заметает, новые проступают после белой вспышки
          LA.style.opacity = (1 - E(win(tj, 0.05, 0.4))).toFixed(3);
          draw(1, j, 0.42 * E(win(tj, 0.55, 1)), vw, vh);
          drift(LA, j - 1, u); drift(LB, j, u);
          break;
        case "sweep": { // занавес сияния: кромка режет старую цепочку и открывает новую
          const P0 = e * 140 - 20;
          LB.style.maskImage = `linear-gradient(100deg, #000 ${(P0 - 16).toFixed(2)}%, transparent ${(P0 + 4).toFixed(2)}%)`;
          LA.style.maskImage = `linear-gradient(100deg, transparent ${(P0 - 16).toFixed(2)}%, #000 ${(P0 + 4).toFixed(2)}%)`;
          draw(1, j, 1, vw, vh);
          drift(LA, j - 1, u); drift(LB, j, u);
          break;
        }
        case "pan": // панорама: цепочка едет вместе с камерой и продолжается на новом льду
          draw(1, j, 1, vw, vh);
          drift(LA, j - 1, u, `translate3d(${(-e * 100).toFixed(3)}vw, 0, 0)`);
          drift(LB, j, u, `translate3d(${((1 - e) * 88).toFixed(3)}vw, 0, 0)`);
          break;
        default:
          LA.style.opacity = (1 - e).toFixed(3);
          draw(1, j, e, vw, vh);
      }
    });
  }, []);
  return (
    <div ref={ref} className="fr-trail-fixed" aria-hidden>
      {[0, 1].map((l) => (
        <div className="fr-tr-layer" key={l}>{Array.from({ length: PRINTS }, (_, k) => <i key={k} />)}</div>
      ))}
    </div>
  );
}

/* ЛИНИЯ СЛЕДОВ В ЛЕНДИНГЕ: та же цепочка, рисуется от скролла вниз по полю и приводит к кнопке брони */
type Print = { x: number; y: number; r: number };
function FrostLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [prints, setPrints] = useState<Print[]>([]);
  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const build = () => {
      const hr = host.getBoundingClientRect();
      const cta = host.querySelector<HTMLElement>(".fr-deal .fr-btn");
      const W = hr.width;
      const x0 = Math.max(26, W * 0.085);
      const cr = cta?.getBoundingClientRect();
      const end = cr ? { x: cr.left - hr.left - 26, y: cr.top - hr.top + cr.height / 2 } : { x: x0, y: hr.height - 80 };
      const out: Print[] = [];
      const step = 44;
      const bendAt = Math.max(0, end.y - 520);
      let prev = { x: x0, y: 40 };
      for (let y = 40, k = 0; y <= end.y; y += step, k++) {
        let x = x0 + Math.sin(y / 340) * W * 0.018;
        if (y > bendAt) { const t = smooth((y - bendAt) / Math.max(1, end.y - bendAt)); x = lerp(x, end.x, t); }
        const ang = Math.atan2(y - prev.y, x - prev.x);
        const side = k % 2 ? 1 : -1;
        out.push({ x: x - Math.sin(ang) * 7 * side, y: y + Math.cos(ang) * 7 * side, r: (ang * 180) / Math.PI + 90 });
        prev = { x, y };
      }
      setPrints(out);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);
    const cta = host.querySelector<HTMLElement>(".fr-deal .fr-btn");
    const unsub = subscribe(({ vh, reduced }) => {
      const hr = host.getBoundingClientRect();
      if (hr.bottom < -100 || hr.top > vh + 100) return;
      const rv = reduced ? 1e6 : vh * 0.74 - hr.top;
      el.style.setProperty("--rv", rv.toFixed(0));
      if (cta) {
        const reached = rv > cta.getBoundingClientRect().top - hr.top;
        if ((cta.dataset.reached === "1") !== reached) cta.dataset.reached = reached ? "1" : "";
      }
    });
    return () => { ro.disconnect(); unsub(); };
  }, []);
  return (
    <div ref={ref} className="fr-line" aria-hidden>
      {prints.map((p, i) => (
        <i key={i} style={{ left: p.x, top: p.y, transform: `translate(-50%, -50%) rotate(${p.r.toFixed(1)}deg)`, ["--y" as string]: p.y.toFixed(0) }} />
      ))}
    </div>
  );
}

/* тон навигации: тёмный текст на снегу, светлый — в гроте, ночью и на тёмных секциях */
function NavTone() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".fr");
    const reel = root?.querySelector<HTMLElement>(".rl-reel");
    if (!root || !reel) return;
    let last = "";
    return subscribe(({ vh }) => {
      let tone = "light";
      const r = reel.getBoundingClientRect();
      if (r.top <= 40 && r.bottom > 40) {
        const u = clamp01(-r.top / Math.max(1, reel.offsetHeight - vh)) * TOTAL;
        let k = 0;
        for (let i = 1; i < N_SC; i++) if (u >= (holdEnd(i - 1) + STARTS[i]) / 2) k = i;
        tone = scenes[k].dark ? "dark" : "light";
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

const LEGS: [string, string, string, string, string][] = [
  ["Day 1", "km 0 – 18", "−12°C", "The Plain", "Nine hours of white, and the mountains never get closer. The sled is the only sound."],
  ["Day 2", "km 18 – 31", "−9°C", "The Vault", "You climb inside the glacier before you climb over it. Blue light, no echo."],
  ["Day 3", "km 31 – 47", "−34°C", "The Night", "Camp is struck before dusk. The sky does the rest, for about four hours."],
  ["Day 4", "km 47 – 61", "−15°C", "The Ice", "The sea remembers it was water. You cross it anyway, one floe at a time."],
];

export function Frost() {
  return (
    <div className="fr" data-nav="light">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Onest:wght@400;500;600;700&display=swap"]} />
      <NavTone />
      <header className="fr-nav">
        <span className="fr-brand">FARLINE</span>
        <nav>
          <a href="#route">The line</a>
          <a href="#note">Journal</a>
          <a href="#book" className="fr-nav-cta">Book a crossing</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="walk on ↓" />

      {/* СКВОЗНОЙ СЛОЙ: цепочка следов, снег, свет мира под лендингом */}
      <FrostTrail />
      <Weather kind="snow" count={34} color="#ffffff" between={[".fr .rl-reel", reelMark("t1")]} world={0.5} zIndex={31} />
      <Weather kind="snow" count={22} color="#ffffff" seed={11} between={[reelMark("t2"), ".fr-note"]} world={0.7} zIndex={31} />
      <Atmosphere stops={[
        { at: ".fr-statement", color: "#e7eef2" }, { at: ".fr-legs", color: "#dfe9ee" }, { at: ".fr-legs", color: "#c3d5df", anchor: 0.95 },
        { at: ".fr-note", color: "#0c2531", anchor: 0.3 }, { at: ".fr-note", color: "#0c2531", anchor: 0.75 },
        { at: ".fr-deal", color: "#e3edf2" }, { at: ".fr-climax", color: "#0a232d" },
      ]} />
      <Backdrop from=".fr-statement" dim={0.62} plates={[
        { at: ".fr-statement", src: `${A}/s1-bg.webp`, pos: "50% 60%" }, { at: ".fr-legs", src: `${A}/s1-bg.webp`, pos: "50% 60%" },
        { at: ".fr-note", src: `${A}/s3-bg.webp` }, { at: ".fr-deal", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
      ]} />

      <div className="fr-land">
        <FrostLine />

        {/* BIG-TYPE — одна гигантская мысль, много воздуха */}
        <section className="fr-statement" data-tone="light">
          <span className="fr-kick">The whole approach</span>
          <h2>Nothing but <em>the line.</em></h2>
          <p>No convoy. No route markers. No noise. One guide ahead of you, one file of footprints behind — and four days of the emptiest, clearest country left on the map.</p>
        </section>

        {/* LEGS — четыре отрезка как вехи НА линии следов (вместо ряда плит и полосы цифр) */}
        <section className="fr-legs" id="route" data-tone="light">
          <div className="fr-legs-head">
            <span className="fr-kick">61 km, one line north</span>
            <h2>The crossing, leg by leg.</h2>
          </div>
          <ol className="fr-leg-list">
            {LEGS.map(([d, km, t, name, s]) => (
              <li className="fr-leg" key={d}>
                <div className="fr-leg-meta"><b>{d}</b><span>{km}</span><span>{t}</span></div>
                <h3>{name}</h3>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </section>


        {/* FIELD NOTE — отзыв как запись в полевом журнале (вместо цитаты по центру) */}
        <section className="fr-note" id="note" data-tone="dark">
          <div className="fr-note-card">
            <span className="fr-note-stamp">Day 3 · 02:14 · −34°C · 69°N</span>
            <blockquote>I have stood under the aurora before. I had never stood under it in <em>silence.</em></blockquote>
            <cite>— Ines Kallio, crossed in March</cite>
          </div>
        </section>

        {/* DEAL — линия следов заканчивается у кнопки */}
        <section className="fr-deal" id="book" data-tone="light">
          <div className="fr-deal-card">
            <span className="fr-kick">The guided crossing</span>
            <div className="fr-price"><b>&euro;1,850</b><span>/ traveler &middot; guide, shelter &amp; the line north</span></div>
            <p>Four days, three nights, six travelers at most. Tents, stove, satellite link and a guide who has walked this line eleven times. You carry only what you need &mdash; we handle the rest before you arrive.</p>
            <a href="#" className="fr-btn">Reserve a window</a>
            <span className="fr-note-s">Departures held to clear weather &middot; Full kit provided</span>
          </div>
        </section>
      </div>

      {/* CLIMAX — зелень сияния только здесь и на CTA */}
      <section className="fr-climax" data-tone="dark" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="fr-climax-veil" aria-hidden />
        <div className="fr-climax-copy"><h2>The line starts <em>where the noise stops.</em></h2><a href="#book" className="fr-btn">Book a crossing</a></div>
      </section>

      <footer className="fr-foot" data-tone="dark"><span className="fr-brand">FARLINE</span><span>Guided arctic crossings &middot; One line, four days, no noise.</span></footer>
    </div>
  );
}
