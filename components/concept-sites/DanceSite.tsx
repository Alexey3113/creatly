"use client";
/* Концепт 17 — DANCE «KINET». Студия танцев/хореографии. Монохром charcoal + lime, танцор с motion-trail (эхо-силуэты движения), кинетик-типографика. Hero-приём: motion-trail echoes. Типо-персона: heavy kinetic grotesk + mono.
   Сквозная архитектура (аудит 2026-09): hero собран в покое, поза и ткань «дышат».
   Актёр — танцовщица, одна хореография на весь сайт: прыжок из букв MOVE NOW → приземление в зале (S2) → пируэт в луче (S3) →
   проход по строкам расписания (S4) → поклон (S5) → растворяется там, где остаются пуанты (S6).
   Стыки свет↔тьма — «рампа»: луч сжимается в точку на танцовщице (S2→S3, S4→S5) и раскрывается из неё (S3→S4, S5→S6);
   центр ириса = её позиция (Follow → --dx/--dy). S1→S2 — перекрытие, фигура пересекает стык в прыжке. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./dance.css";

const A = "/uploads/1/hooks/sites/anim/dance";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 280, H3 = 280, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a1 = mk(H1), a2 = mk(H2), a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);
type P = { x: number; y: number; s: number; r?: number; fx?: number; o?: number };
const PATH: [string, number, P][] = [
  [".dn-hero", a1(0.2), { x: 50, y: 50, s: 1.07 }],
  [".dn-hero", a1(0.6), { x: 51, y: 47, s: 1.1 }],
  [".dn-hero", a1(0.85), { x: 54, y: 36, s: 1.12, r: -4 }],
  [".d2-scene", a2(0.36), { x: 50, y: 62, s: 0.75 }],
  [".d2-scene", a2(0.62), { x: 50, y: 62, s: 0.75 }],
  [".d3-scene", a3(0.36), { x: 50, y: 52, s: 0.82 }],
  [".d3-scene", a3(0.46), { x: 50, y: 52, s: 0.82, fx: -1, r: 4 }],
  [".d3-scene", a3(0.56), { x: 50, y: 52, s: 0.82, fx: 1, r: -2 }],
  [".d3-scene", a3(0.64), { x: 50, y: 52, s: 0.82 }],
  [".d4-scene", a4(0.3), { x: 11, y: 38, s: 0.36 }],
  [".d4-scene", a4(0.48), { x: 11, y: 54, s: 0.36, r: 5 }],
  [".d4-scene", a4(0.66), { x: 11, y: 68, s: 0.36, r: -3 }],
  [".d5-scene", a5(0.36), { x: 78, y: 58, s: 0.62 }],
  [".d5-scene", a5(0.64), { x: 78, y: 62, s: 0.6, r: 10 }],
  [".d6-scene", a6(0.36), { x: 80, y: 55, s: 0.5, o: 0.85 }],
  [".d6-scene", a6(0.6), { x: 80, y: 52, s: 0.46, o: 0 }],
];

export function DanceSite() {
  return (
    <div className="dn-site dn-poster">
      <Actor src={`${A}/dfig-cut.png`} className="dn-dancerA" width="40vw" zIndex={30} bob={3} tilt={0.05} stops={PATH.map(([at, anchor, pose]) => ({ at, anchor, pose }))} />
      {/* центр «рампы» (ирис стыков) всегда на танцовщице */}
      <Follow unit="%" stops={PATH.map(([at, anchor, p]) => ({ at, anchor, vars: { "--dx": p.x, "--dy": p.y } }))} />
      <header className="dn-head">
        <Link href="/visual-hooks" className="dn-brand">KINET</Link>
        <nav className="dn-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Classes</a><a href="#" onClick={stop}>Company</a>
          <a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop} className="dn-trial">Book a trial</a>
        </nav>
      </header>

      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={10} className="dn-hero dp-hero">
        <div className="dp-paper" aria-hidden />

        <Layer z={2} depth={0.24} phase={[0, 0.28]} from={{ scale: 1.03, opacity: 0 }} to={{ scale: 1, opacity: 1 }} cursor={{ x: -9, y: -7 }} className="dp-title">
          <span>MOVE</span><span>NOW</span>
        </Layer>

        <div className="dp-grain" aria-hidden />

        <div className="dp-tag dp-tl">KINET</div>
        <div className="dp-tag dp-tr">a dance studio<br />for people who move</div>
        <div className="dp-cue">book a trial ↓</div>
      </ParallaxScene>

      {/* S2 — THE FLOOR (dancer + echo trail · char/motion) */}
      <ParallaxScene heightVh={H2} overlapVh={OV} className="dn-scene d2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="d2-bg">
          <SceneMedia src={`${A}/studiobg.jpg`} />
        </Layer>
        <div className="d2-veil" aria-hidden />
        <Layer z={4} depth={0.44} phase={[0.2, 0.4]} from={{ x: "-1vw", y: "1vh", opacity: 0 }} to={{ x: "-4vw", y: "1vh", opacity: 1 }} cursor={{ x: 16, y: 11 }} className="d2-echo d2-e1">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <Layer z={5} depth={0.5} phase={[0.2, 0.4]} from={{ x: "1vw", y: "1vh", opacity: 0 }} to={{ x: "4vw", y: "1vh", opacity: 1 }} cursor={{ x: 16, y: 11 }} className="d2-echo d2-e2">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <div className="d2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d2-copy">
          <span className="dn-eyebrow">01 — the floor</span>
          <h2>A body that<br /><em>listens.</em></h2>
          <p>Sprung floors, real mirrors, teachers who correct with a hand, not a shout — movement you can feel from the back row.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE WORK (flying motion frames · cards) */}
      <ParallaxScene heightVh={H3} overlapVh={OV} className="dn-scene d3-scene">
        <div className="d3-bg" aria-hidden />
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ scale: 1.02, y: "-2vh" }} className="d3-stage"><SceneMedia src={`${A}/bg.jpg`} alt="" /></Layer>
        <div className="d3-spot" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0, 0.3]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="d3-word"><span>WORK</span></Layer>
        {/* motion-trail: эхо-силуэты танцора расходятся влево · echo-trail */}
        <Layer z={4} depth={0.5} phase={[0.2, 0.62]} from={{ x: "0vw", opacity: 0 }} to={{ x: "-16vw", opacity: 0.2 }} fit="contain" className="d3-echo d3-e1"><SceneMedia src={`${A}/dfig-cut.png`} /></Layer>
        <Layer z={5} depth={0.56} phase={[0.2, 0.58]} from={{ x: "0vw", opacity: 0 }} to={{ x: "-8vw", opacity: 0.38 }} fit="contain" className="d3-echo d3-e2"><SceneMedia src={`${A}/dfig-cut.png`} /></Layer>
        <Layer z={9} depth={0.4} phase={[0.22, 0.4]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="d3-thumbs">
          <div className="d3-thumb"><SceneMedia src={`${A}/g1.jpg`} /><i>01 · the leap</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g4.jpg`} /><i>02 · the line</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g2.jpg`} /><i>03 · the room</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g3.jpg`} /><i>04 · en pointe</i></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.18, 0.36]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d3-copy">
          <span className="dn-eyebrow">02 — the work</span>
          <h2>Where the <em>work</em> happens.</h2>
        </Layer>
      </ParallaxScene>

      {/* S4 — TIMETABLE (this week · data) */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="dn-scene d4-scene">
        <div className="d4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="d4-head">
          <span className="dn-eyebrow">03 — the timetable</span><h2>This week on the floor.</h2>
        </Layer>
        {/* классы «считаются» на счёт: большая доля-цифра снапает, строка въезжает (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.12, 0.62]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="d4-schedL">
          <div className="d4-sched">
            <div className="d4-cls" style={{ ["--thr" as string]: 0.04 }}><span className="d4-count">1</span><time>MON · 19:00</time><b>Contemporary</b><s>all levels</s><em className="on">2 places</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.20 }}><span className="d4-count">2</span><time>TUE · 18:00</time><b>Ballet — Beginners</b><s>no experience</s><em className="on">open</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.36 }}><span className="d4-count">3</span><time>THU · 20:00</time><b>Choreography Lab</b><s>intermediate+</s><em>full</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.52 }}><span className="d4-count">4</span><time>SAT · 11:00</time><b>Open Floor</b><s>drop-in · any level</s><em className="on">open</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE BACK ROW (voices · bg+text) */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="dn-scene d5-scene">
        <div className="d5-bg" aria-hidden />
        <div className="d5-spot" aria-hidden />
        <div className="d5-eyebrow">from the back row</div>
        {/* кинетик-тайп с эхо-шлейфом (motion-trail на типографике) · type-echo */}
        <Layer z={5} depth={0.3} phase={[0.14, 0.32]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l1">
          <p>First class in twenty years — left lighter than I've felt in months.</p><cite>Elin R. · beginner ballet</cite>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.2, 0.38]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l2">
          <p>Small classes, real corrections. Fixed a habit I'd carried since I was ten.</p><cite>Marco T. · contemporary</cite>
        </Layer>
        <Layer z={7} depth={0.54} phase={[0.26, 0.44]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l3">
          <p>Where I finally started making, not just copying.</p><cite>Yasmin A. · choreo lab</cite>
        </Layer>
      </ParallaxScene>

      {/* S6 — FIND YOUR LINE (pointe shoes + CTA · object) */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="dn-scene d6-scene">
        <div className="d6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.2, 0.5]} from={{ y: "7vh", scale: 0.94, rotate: "-8deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "-4deg", opacity: 1 }} cursor={{ x: 18, y: 12 }} className="d6-obj">
          <SceneMedia src={`${A}/pointeobj-cut.png`} alt="Ballet pointe shoes" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.22, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="d6-copy">
          <span className="dn-eyebrow">trial</span>
          <h2>Find your<br /><em>line.</em></h2>
        </Layer>
        <div className="d6-cta">
          <p>First class on us — no experience, no leotard required. Just move.</p>
          <a href="#" onClick={stop} className="dn-btn">Book a trial <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="dn-foot">
        <div className="dn-foot-top"><b>KINET</b><p>A studio for people who move. Contemporary · ballet · choreography.</p></div>
        <div className="dn-foot-legal"><span>Kinet Dance Studio</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
