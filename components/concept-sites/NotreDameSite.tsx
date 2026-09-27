"use client";
/* Концепт 08 — NOTREDAME. Приглашение в Нотр-Дам (искусство/архитектура). Hero-приём: sliced-strips (фото собора нарезано вертикальными полосами) + knockout-титул + роза-витраж. Готическая indigo/золото/витраж палитра. Типо-персона: clean bold sans + serif.
   Сквозная архитектура (аудит 2026-09): hero собран в покое (rest/intro), в покое дышит свет розы и мерцают свечи;
   актёр — роза-витраж: светится в фасаде → камера влетает в неё (стык-круг) → отделяется и вращается (S2) →
   окулус над колонной фото (S3) → циферблат часов визита (S4) → свет для буквиц (S5) → сквозь неё в свет (S6).
   Стыки: круг розы (S1→S2, S5→S6), стрельчатое окно (S2→S3), остальные — перекрытие с грейдом. Фон — Atmosphere: сумерки → ночь → свечи → свет. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Atmosphere, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./notredame.css";

const A = "/uploads/1/hooks/sites/anim/notredame";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 300, H3 = 300, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a1 = mk(H1), a2 = mk(H2), a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);

export function NotreDameSite() {
  return (
    <div className="nd-site">
      <Atmosphere stops={[
        { at: ".nd-hero", color: "#141a33", color2: "#6c86d8" },
        { at: ".nd3-scene", color: "#141d40", color2: "#cba24a" },
        { at: ".nd4-scene", color: "#0d1330", color2: "#4a5fb0" },
        { at: ".nd5-scene", color: "#1c1631", color2: "#e0a050" },
        { at: ".nd6-scene", color: "#2a2140", color2: "#f0c070" },
      ]} />
      {/* роза-витраж — один объект на весь сайт */}
      <Actor className="nd-actor" width="18vw" zIndex={30} bob={5} tilt={0.05} stops={[
        { at: ".nd-hero", anchor: a1(0.62), pose: { x: 49.7, y: 66, s: 0.5, r: 0, o: 0 } },
        { at: ".nd2-scene", anchor: a2(0.3), pose: { x: 49.7, y: 66.5, s: 0.64, r: 30, o: 1 } },
        { at: ".nd2-scene", anchor: a2(0.62), pose: { x: 80, y: 27, s: 1, r: 110, o: 1 } },
        { at: ".nd2-scene", anchor: a2(0.74), pose: { x: 80, y: 27, s: 1, r: 124, o: 1 } },
        { at: ".nd3-scene", anchor: a3(0.36), pose: { x: 21, y: 19, s: 0.92, r: 190, o: 1 } },
        { at: ".nd3-scene", anchor: a3(0.66), pose: { x: 21, y: 19, s: 0.92, r: 214, o: 1 } },
        { at: ".nd4-scene", anchor: a4(0.34), pose: { x: 19, y: 56, s: 1.5, r: 300, o: 1 } },
        { at: ".nd4-scene", anchor: a4(0.64), pose: { x: 19, y: 56, s: 1.5, r: 300, o: 1 } },
        { at: ".nd5-scene", anchor: a5(0.34), pose: { x: 80, y: 50, s: 1.15, r: 400, o: 1 } },
        { at: ".nd5-scene", anchor: a5(0.92), pose: { x: 80, y: 50, s: 1.2, r: 430, o: 1 } },
        { at: ".nd6-scene", anchor: a6(0.36), pose: { x: 73, y: 50, s: 2.1, r: 480, o: 1 } },
        { at: ".nd6-scene", anchor: a6(0.66), pose: { x: 70, y: 50, s: 2.3, r: 505, o: 1 } },
        { at: ".nd-foot", anchor: 0, pose: { x: 58, y: 48, s: 7, r: 560, o: 0 } },
      ]}>
        <div className="nd-rosea"><img src={`${A}/rose.jpg`} alt="" draggable={false} /><i className="nd-hh" /><i className="nd-mh" /></div>
      </Actor>
      {/* стрелки циферблата в розе — только в S4 */}
      <Follow stops={[
        { at: ".nd3-scene", anchor: a3(0.7), vars: { "--nd-clock": 0 } },
        { at: ".nd4-scene", anchor: a4(0.3), vars: { "--nd-clock": 1 } },
        { at: ".nd4-scene", anchor: a4(0.66), vars: { "--nd-clock": 1 } },
        { at: ".nd5-scene", anchor: a5(0.2), vars: { "--nd-clock": 0 } },
      ]} />
      <Weather kind="dust" count={18} color="#e6c98a" color2="#8fa6ff" zIndex={29} world={0.35} seed={11} />

      <header className="nd-head">
        <Link href="/visual-hooks" className="nd-brand">NOTRE‑DAME</Link>
        <nav className="nd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The visit</a><a href="#" onClick={stop}>The art</a>
          <a href="#" onClick={stop}>Hours</a><a href="#" onClick={stop} className="nd-book">Reserve a visit</a>
        </nav>
      </header>

      {/* S1 — hero: собран при загрузке; в конце камера влетает в розу фасада */}
      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={12} className="nd-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.04 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="nd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="nd-frame" aria-hidden />
        <div className="nd-blobs" aria-hidden />

        <Layer z={4} depth={0.4} phase={[0, 0.3]} from={{ y: "6vh", scale: 1.02, opacity: 0 }} to={{ y: "0vh", scale: 1.04, opacity: 1 }} cursor={{ x: 14, y: 8 }} className="nd-strips">
          <SceneMedia src={`${A}/cathedral.jpg`} alt="Notre-Dame cathedral facade at dusk" />
          <i className="nd-halo" aria-hidden />
        </Layer>

        <Layer z={3} depth={0.5} phase={[0, 0.3]} from={{ scale: 0.7, opacity: 0, rotate: "-30deg" }} to={{ scale: 1, opacity: 0.45, rotate: "0deg" }} cursor={{ x: -20, y: -14 }} fit="contain" className="nd-rose">
          <SceneMedia src={`${A}/rose-cut.png`} alt="" />
        </Layer>

        <Layer z={8} depth={0.2} phase={[0, 0.26]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nd-title">
          <h1>NOTRE&nbsp;<span>DAME</span></h1>
        </Layer>
        <div className="nd-candles" aria-hidden><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="nd-grain" aria-hidden />

        <div className="nd-sub">a candlelit visit · Île de la Cité · Paris IV</div>
        <div className="nd-label nd-tl">BUILT 1163 — 1345</div>
        <div className="nd-label nd-tr">GOTHIC<br />FRENCH</div>
        <div className="nd-label nd-bl"><b>01</b><span>the cathedral</span></div>
        <div className="nd-cue" aria-hidden>enter</div>
      </ParallaxScene>

      {/* S2 — THE VISIT: открывается в круге розы фасада */}
      <ParallaxScene heightVh={H2} overlapVh={OV} className="nd-scene nd2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -4, y: -3 }} className="nd2-bg">
          <SceneMedia src={`${A}/cathedral.jpg`} alt="Notre-Dame cathedral facade at dusk" />
        </Layer>
        <div className="nd2-veil" aria-hidden />
        <div className="nd2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.16, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="nd2-copy">
          <span className="nd-eyebrow">01 — the visit</span>
          <h2>Stone and light,<br /><em>by candle.</em></h2>
          <p>Small, guided evening visits: the rose windows lit from within, the nave without the crowd, a historian who tells you what the stone remembers. Groups of twelve.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE CATHEDRAL: камера проходит в стрельчатое окно; роза — окулус над колонной */}
      <ParallaxScene heightVh={H3} overlapVh={OV} parallax={16} className="nd-scene nd3-scene">
        <div className="nd3-bg" aria-hidden />
        <div className="nd3-shaft" aria-hidden />
        <Layer z={6} depth={0.4} phase={[0.04, 0.3]} from={{ x: "-28vw", y: "-18vh", opacity: 0 }} to={{ x: "-28vw", y: "-27vh", opacity: 1 }} cursor={{ x: 8, y: 5 }}>
          <div className="nd3-el nd3-e1"><SceneMedia src={`${A}/g1.jpg`} /><b>the rose window</b></div>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.08, 0.34]} from={{ x: "-24vw", y: "0vh", opacity: 0 }} to={{ x: "-24vw", y: "-9vh", opacity: 1 }} cursor={{ x: 10, y: 6 }}>
          <div className="nd3-el nd3-e2"><SceneMedia src={`${A}/g4.jpg`} /><b>the west front</b></div>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.12, 0.38]} from={{ x: "-31vw", y: "18vh", opacity: 0 }} to={{ x: "-31vw", y: "9vh", opacity: 1 }} cursor={{ x: 8, y: 5 }}>
          <div className="nd3-el nd3-e3"><SceneMedia src={`${A}/g2.jpg`} /><b>the nave</b></div>
        </Layer>
        <Layer z={9} depth={0.68} phase={[0.16, 0.42]} from={{ x: "-26vw", y: "36vh", opacity: 0 }} to={{ x: "-26vw", y: "27vh", opacity: 1 }} cursor={{ x: 10, y: 6 }}>
          <div className="nd3-el nd3-e4"><SceneMedia src={`${A}/g5.jpg`} /><b>the buttresses</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.1, 0.36]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="nd3-copy">
          <span className="nd-eyebrow">02 — the cathedral</span>
          <h2>Stone that <em>rises to light.</em></h2>
          <p>Eight centuries, read from the floor to the vault.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — PLAN YOUR VISIT: неф после заката, роза становится циферблатом */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="nd-scene nd4-scene">
        <div className="nd4-bg" aria-hidden />
        <Layer z={2} depth={0.12} from={{ scale: 1.08, x: "2vw" }} to={{ scale: 1.02, x: "0vw" }} className="nd4-nave">
          <SceneMedia src={`${A}/g2.jpg`} alt="" />
        </Layer>
        <div className="nd4-dial" aria-hidden>
          <span className="n12">XII</span><span className="n3">III</span><span className="n6">VI</span><span className="n9">IX</span>
        </div>
        <Layer z={12} depth={0.22} phase={[0.02, 0.24]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nd4-head">
          <span className="nd-eyebrow">03 — plan your visit</span><h2>Come <em>after dark.</em></h2>
        </Layer>
        {/* каждый визит «загорается» как витраж — из тьмы в золотой свет (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.04, 0.46]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="nd4-visitsL">
          <div className="nd4-visits">
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.05 }}><time>Tue–Sun · 18:30</time><b>Evening candle visit</b><s>90 min · groups of twelve · guided</s><em className="on">reserve</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.22 }}><time>Sat · 10:00</time><b>The stone &amp; the glass</b><s>a slow morning of windows and carving</s><em className="on">reserve</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.39 }}><time>By arrangement</time><b>The towers &amp; roof</b><s>the climb, the gallery, the view</s><em className="on">enquire</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.56 }}><time>First Sunday</time><b>Vespers &amp; music</b><s>choral evening in the nave</s><em>free</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — VOICES / BY CANDLELIGHT: роза справа светит на буквицы */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="nd-scene nd5-scene">
        <div className="nd5-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.1 }} to={{ scale: 1.03 }} className="nd5-rays">
          <SceneMedia src={`${A}/g1.jpg`} alt="" />
        </Layer>
        <div className="nd5-glow" aria-hidden />
        <div className="nd5-eyebrow">voices · by candlelight</div>
        <Layer z={5} depth={0.26} phase={[0.1, 0.3]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v1">
          <div><span className="nd5-cap">T</span><p>he nave with no crowd, lit only by candle. I&apos;ve travelled a long way for less.</p><cite>Hélène M. · evening visit</cite></div>
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.16, 0.36]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v2">
          <div><span className="nd5-cap">O</span><p>ur guide made the stone talk — eight hundred years in ninety minutes.</p><cite>Andrew P. · visitor</cite></div>
        </Layer>
        <Layer z={5} depth={0.5} phase={[0.22, 0.42]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v3">
          <div><span className="nd5-cap">H</span><p>eard vespers rise into that vault and forgot to breathe.</p><cite>Sofia R. · vespers</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — ENTER THE LIGHT: открывается в круге розы, в финале камера пролетает сквозь неё */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="nd-scene nd6-scene">
        <div className="nd6-bg" aria-hidden />
        <Layer z={2} phase={[0.62, 1]} from={{ opacity: 0, scale: 0.8 }} to={{ opacity: 1, scale: 1.25 }} className="nd6-flood"><i /></Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.4]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="nd6-copy">
          <span className="nd-eyebrow">reserve</span>
          <h2>Enter the<br /><em>light.</em></h2>
        </Layer>
        <div className="nd6-cta">
          <p>Evening visits, twelve at a time, by reservation only.</p>
          <a href="#" onClick={stop} className="nd-btn">Reserve a visit <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="nd-foot">
        <div className="nd-foot-top"><b>NOTRE‑DAME</b><p>Eight centuries of stone and light. A candlelit visit.</p></div>
        <div className="nd-foot-legal"><span>Notre‑Dame Visits</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
