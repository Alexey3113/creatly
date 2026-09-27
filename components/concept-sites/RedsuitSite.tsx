"use client";
/* Концепт 21 — REDSUIT «SANGUINE». Красные премиум-костюмы. Глубокий crimson-luxury, фигура в костюме, гигантский ornate-serif титул за ней (occlusion), топографика/✦/×××-декор, блэклеттер-цитата. Типо-персона: ornate serif + blackletter.
   v2 (аудит 2026-09): hero — непрерывный отъезд из макро ткани к фигуре (×6 → 1 за интро), PRIDE на месте сразу.
   ОДНА красная нить — закреплённый SVG, дорисовывается от общего скролла (Follow --draw) через все стыки; её тянет игла-актёр:
   выходит из ткани hero → шов по лацкану (S2) → вдоль рейки с образами (S3) → шкала шести недель (S4) → поля книги клиентов (S5) → шов лацкана в финале.
   Стыки: «ножницы» (кадр разрезается по диагонали, в разрезе — следующая сцена), «распоротый шов» (сцена открывается по линии нити), остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./redsuit.css";

const A = "/uploads/1/hooks/sites/anim/redsuit";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 280, s4: 270, s5: 270, s6: 260 };

// маршрут нити: вершины в % экрана на общих якорях; прорисовка --draw = доля длины до вершины (как у иглы — одна кривая smooth)
const ROUTE: { a: { at: string; anchor: number }; x: number; y: number }[] = [
  { a: at(".rd-hero", H.hero, 0), x: 7, y: 94 },
  { a: at(".rd-hero", H.hero, 0.45), x: 22, y: 76 },
  { a: at(".rd2-scene", H.s2, 0.08), x: 40, y: 97 },
  { a: at(".rd2-scene", H.s2, 0.34), x: 63, y: 86 },
  { a: at(".rd2-scene", H.s2, 0.66), x: 80, y: 24 },
  { a: at(".rd3-scene", H.s3, 0.2), x: 94, y: 13 },
  { a: at(".rd3-scene", H.s3, 0.62), x: 6, y: 13 },
  { a: at(".rd4-scene", H.s4, 0.16), x: 24.3, y: 31 },
  { a: at(".rd4-scene", H.s4, 0.6), x: 24.3, y: 72 },
  { a: at(".rd5-scene", H.s5, 0.16), x: 22, y: 14 },
  { a: at(".rd5-scene", H.s5, 0.6), x: 22, y: 88 },
  { a: at(".rd6-scene", H.s6, 0.28), x: 83, y: 34 },
  { a: at(".rd6-scene", H.s6, 0.72), x: 81.5, y: 48 },
];
// SVG в единицах 160×100 (16:10 — равномерный масштаб), длины — в тех же единицах, что и dash
const PTS = ROUTE.map((p) => [p.x * 1.6, p.y] as const);
const CUM = PTS.reduce<number[]>((acc, p, i) => {
  acc.push(i ? acc[i - 1] + Math.hypot(p[0] - PTS[i - 1][0], p[1] - PTS[i - 1][1]) : 0);
  return acc;
}, []);
const TOTAL = CUM[CUM.length - 1];
const DRAW = CUM.map((c) => +(c / TOTAL).toFixed(4));
const D = PTS.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
// игла смотрит по ходу нити: угол сегмента, пришедшего в вершину (для первой — первого сегмента)
const ANG = PTS.map((p, i) => {
  const [a, b] = i ? [PTS[i - 1], p] : [p, PTS[1]];
  return +((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI).toFixed(1);
});

export function RedsuitSite() {
  return (
    <div className="rd-site">
      <Follow stops={ROUTE.map((p, i) => ({ ...p.a, vars: { "--draw": DRAW[i] } }))} />
      {/* НИТЬ — закреплённый SVG: видимое «окно» нити тянется за иглой */}
      <svg className="rd-thread" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
        <path d={D} pathLength={1} className="rd-thread-shadow" />
        <path d={D} pathLength={1} className="rd-thread-line" />
        <path d={D} pathLength={1} className="rd-thread-sheen" />
      </svg>
      {/* АКТЁР — игла на голове нити */}
      <Actor width="64px" zIndex={30} bob={2} tilt={0} className="rd-needle" stops={ROUTE.map((p, i) => ({ ...p.a, pose: { x: p.x, y: p.y, r: ANG[i] } }))}>
        <svg viewBox="0 0 64 12" aria-hidden><defs><linearGradient id="rdn" x1="0" x2="1"><stop offset="0" stopColor="#8e8a88" /><stop offset=".5" stopColor="#f4f0ee" /><stop offset="1" stopColor="#b7b2b0" /></linearGradient></defs>
          <path d="M2 6 L52 4.2 Q62 6 52 7.8 Z" fill="url(#rdn)" /><ellipse cx="9" cy="6" rx="3.2" ry="1" fill="#2a0810" /></svg>
      </Actor>

      <header className="rd-head">
        <Link href="/visual-hooks" className="rd-brand">SANGUINE</Link>
        <nav className="rd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The cut</a><a href="#" onClick={stop}>Cloth</a>
          <a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop} className="rd-book">Book a fitting</a>
        </nav>
      </header>

      {/* HERO — отъезд из макро ткани к фигуре (×6 → 1) за интро, PRIDE на месте */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1400} className="rd-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.5 }} to={{ y: "2vh", scale: 1.06 }} cursor={{ x: -5, y: -4 }} className="rd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="rd-topo" aria-hidden />
        <div className="rd-blobs" aria-hidden />

        <Layer z={3} phase={[0.76, 0.84]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <Layer depth={0.26} phase={[0.06, 0.28]} from={{ y: "4vh", scale: 0.97, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -12, y: -8 }} className="rd-title">
            <span>PRIDE</span>
          </Layer>
        </Layer>

        <Layer z={5} depth={0.55} cursor={{ x: 20, y: 12 }}>
          <Layer phase={[0, 0.3]} from={{ y: "-18vh", scale: 6 }} to={{ y: "2vh", scale: 1 }}>
            <Layer phase={[0.3, 1]} from={{ y: "0vh", scale: 1 }} to={{ y: "-2vh", scale: 1.06 }} fit="contain" position="center bottom" className="rd-man">
              <SceneMedia src={`${A}/man-cut.png`} alt="Man wearing a crimson tailored suit" />
            </Layer>
          </Layer>
        </Layer>
        <div className="rd-grain" aria-hidden />

        <Layer z={12} phase={[0.74, 0.82]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <Layer depth={0.18} phase={[0.12, 0.3]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd-quote">
            <p>Pride is not thinking you&apos;re better than others — it&apos;s knowing your worth without needing approval.</p>
          </Layer>
        </Layer>

        <div className="rd-mark rd-x">✕✕✕</div>
        <div className="rd-star rd-s1">✦</div><div className="rd-star rd-s2">✦</div>
        <div className="rd-label rd-tl">SANGUINE · SS&apos;24</div>
        <div className="rd-label rd-tr">MADE TO<br />MEASURE</div>
        <div className="rd-label rd-bl"><b>01</b><span>the crimson cut</span></div>
        <div className="rd-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — THE CLOTH: не повтор hero — макро лацкана, нить идёт швом по его кромке */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="rd-scene rd2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.18, x: "2vw" }} to={{ y: "-2vh", x: "-1vw", scale: 1.06 }} cursor={{ x: -4, y: -3 }} className="rd2-bg">
          <SceneMedia src={`${A}/g2.jpg`} alt="Crimson lapel with a rose pin, close up" />
        </Layer>
        <div className="rd2-veil" aria-hidden />
        <div className="rd2-topo" aria-hidden />
        <div className="rd2-grain" aria-hidden />
        <Layer z={12} phase={[0.58, 0.66]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <div className="rd2-quote">the room hears it before you speak.</div>
          <Layer depth={0.24} phase={[0.1, 0.3]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd2-copy">
            <span className="rd-eyebrow">01 — the cloth</span>
            <h2>A red suit is<br /><em>a decision.</em></h2>
            <p>Deep crimson cloth milled to our specification, cut to your exact body over three fittings, finished entirely by hand — the loudest quiet thing you own.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE LOOKS: ножницы — кадр разрезается по диагонали, в разрезе уже рейка; нить идёт вдоль рейки */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="rd-scene rd3-scene">
        <div className="rd3-bg" aria-hidden />
        <div className="rd3-rail" aria-hidden />
        {/* образы висят на рейке, въезжают сбоку и качаются на крючках · lateral-sway */}
        <Layer z={5} depth={0.42} phase={[0, 0.18]} from={{ x: "-27vw", rotate: "-6deg", opacity: 0 }} to={{ x: "-30vw", rotate: "-1.5deg", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p1"><SceneMedia src={`${A}/g1.jpg`} /><b>the scarlet double-breasted</b></div>
        </Layer>
        <Layer z={6} depth={0.52} phase={[0.04, 0.22]} from={{ x: "-13vw", rotate: "5deg", opacity: 0 }} to={{ x: "-10vw", rotate: "1deg", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="rd3-slot">
          <div className="rd3-plate rd3-p2"><SceneMedia src={`${A}/g4.jpg`} /><b>the oxblood, from behind</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.08, 0.26]} from={{ x: "13vw", rotate: "-5deg", opacity: 0 }} to={{ x: "10vw", rotate: "-1deg", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p3"><SceneMedia src={`${A}/g2.jpg`} /><b>the lapel</b></div>
        </Layer>
        <Layer z={8} depth={0.68} phase={[0.12, 0.3]} from={{ x: "27vw", rotate: "6deg", opacity: 0 }} to={{ x: "30vw", rotate: "1.5deg", opacity: 1 }} cursor={{ x: -14, y: -8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p4"><SceneMedia src={`${A}/g5.jpg`} /><b>cloth, tie &amp; shoe</b></div>
        </Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <Layer depth={0.22} phase={[0.08, 0.28]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rd3-copy">
            <span className="rd-eyebrow">02 — the looks</span>
            <h2>Every shade of <em>red you dare.</em></h2>
            <p>Scarlet to oxblood, single to double-breasted — on the rail, then on you.</p>
          </Layer>
        </Layer>
        <div className="rd3-cut" aria-hidden />
      </ParallaxScene>

      {/* S4 — THE CUT: в ателье; нить — шкала шести недель вдоль шагов */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="rd-scene rd4-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ y: "-2vh", scale: 1.14 }} className="rd4-photo">
          <SceneMedia src={`${A}/g3.jpg`} />
        </Layer>
        <div className="rd4-bg" aria-hidden />
        <div className="rd4-topo" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <Layer depth={0.22} phase={[0.02, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rd4-head">
            <span className="rd-eyebrow">03 — the cut</span><h2>Six weeks, <em>one suit.</em></h2>
          </Layer>
          <Layer depth={0.3} phase={[0.12, 0.6]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="rd4-steps">
            <div className="rd4-step" style={{ ["--thr" as string]: 0.02 }}><i>i</i><b>The red</b><s>our own milled crimson — rich, never garish, under daylight or chandelier</s></div>
            <div className="rd4-step" style={{ ["--thr" as string]: 0.3 }}><i>ii</i><b>The cut</b><s>cut to your body over three fittings, a canvassed chest, a line that holds</s></div>
            <div className="rd4-step" style={{ ["--thr" as string]: 0.58 }}><i>iii</i><b>The finish</b><s>hand-stitched edges, horn buttons, a lining you choose</s></div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE CLIENT BOOK: шов распарывается по линии нити — за ним книга клиентов на ткани */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="rd-scene rd5-scene">
        <div className="rd5-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.2 }} to={{ y: "-2vh", scale: 1.26 }} className="rd5-cloth">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="rd5-margin" aria-hidden />
        <div className="rd5-eyebrow">the client book · worn in the room</div>
        <Layer z={5} phase={[0.6, 0.68]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="rd-exit">
          <Layer depth={0.26} phase={[0.04, 0.22]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e1">
            <div><i>No.014 · first commission</i><p>Wore it to a black-tie where everyone blurred together. I did not.</p><b>— Julian F.</b></div>
          </Layer>
          <Layer depth={0.38} phase={[0.14, 0.32]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e2">
            <div><i>No.021 · groom</i><p>I was terrified of the colour. Two fittings in, I understood — it&apos;s not loud, it&apos;s certain.</p><b>— Marcus O.</b></div>
          </Layer>
          <Layer depth={0.5} phase={[0.24, 0.42]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e3">
            <div><i>No.006 · repeat client</i><p>People remember the man, then the suit. In that order.</p><b>— Idris K.</b></div>
          </Layer>
        </Layer>
        <i className="rd5-seam rd5-seam-l" aria-hidden /><i className="rd5-seam rd5-seam-r" aria-hidden />
      </ParallaxScene>

      {/* S6 — WEAR THE ROOM: нить уходит в шов лацкана */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} parallax={8} className="rd-scene rd6-scene">
        <div className="rd6-bg" aria-hidden />
        <div className="rd6-topo" aria-hidden />
        <Layer z={4} depth={0.5} phase={[0, 0.3]} from={{ x: "6vw", y: "3vh", scale: 1.0, opacity: 0 }} to={{ x: "2vw", y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 18, y: 11 }} className="rd6-man">
          <SceneMedia src={`${A}/man-cut.png`} alt="Man wearing a crimson tailored suit" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.08, 0.4]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="rd6-copy">
          <span className="rd-eyebrow">atelier</span>
          <h2>Wear the<br /><em>room.</em></h2>
        </Layer>
        <div className="rd6-cta">
          <p>A first fitting, by appointment. Bring your posture; we bring the cloth.</p>
          <a href="#" onClick={stop} className="rd-btn">Book a fitting <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="rd-foot">
        <div className="rd-foot-top"><b>SANGUINE</b><p>Bespoke crimson tailoring. Wear the room.</p></div>
        <div className="rd-foot-legal"><span>Sanguine Atelier</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
