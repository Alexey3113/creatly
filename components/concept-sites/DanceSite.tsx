"use client";
/* Концепт 17 — DANCE «KINET». Студия танцев/хореографии. Монохром charcoal + lime, танцор с motion-trail (эхо-силуэты движения), кинетик-типографика. Hero-приём: motion-trail echoes. Типо-персона: heavy kinetic grotesk + mono. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./dance.css";

const A = "/uploads/1/hooks/sites/anim/dance";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function DanceSite() {
  return (
    <div className="dn-site dn-poster">
      <header className="dn-head">
        <Link href="/visual-hooks" className="dn-brand">KINET</Link>
        <nav className="dn-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Classes</a><a href="#" onClick={stop}>Company</a>
          <a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop} className="dn-trial">Book a trial</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="dn-hero dp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#f2f1ee" }}>
        <div className="dp-paper" aria-hidden />

        <Layer z={2} depth={0.24} phase={[0.02, 0.5]} from={{ scale: 1.03, opacity: 0 }} to={{ scale: 1, opacity: 1 }} cursor={{ x: -9, y: -7 }} className="dp-title">
          <span>MOVE</span><span>NOW</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.44]} from={{ y: "4vh", scale: 1.03, opacity: 0 }} to={{ y: "0vh", scale: 1.07, opacity: 1 }} cursor={{ x: 16, y: 11 }} className="dp-dancer">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <div className="dp-grain" aria-hidden />

        <div className="dp-tag dp-tl">KINET</div>
        <div className="dp-tag dp-tr">a dance studio<br />for people who move</div>
        <div className="dp-cue">book a trial ↓</div>
      </ParallaxScene>

      {/* S2 — THE FLOOR (dancer + echo trail · char/motion) */}
      <ParallaxScene heightVh={280} className="dn-scene d2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 14, color: "#141416" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="d2-bg">
          <SceneMedia src={`${A}/studiobg.jpg`} />
        </Layer>
        <div className="d2-veil" aria-hidden />
        <Layer z={4} depth={0.44} phase={[0.04, 0.44]} from={{ x: "-4vw", y: "6vh", opacity: 0 }} to={{ x: "-3vw", y: "1vh", opacity: 1 }} cursor={{ x: 16, y: 11 }} className="d2-echo d2-e1">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <Layer z={5} depth={0.5} phase={[0.04, 0.44]} from={{ x: "4vw", y: "6vh", opacity: 0 }} to={{ x: "3vw", y: "1vh", opacity: 1 }} cursor={{ x: 16, y: 11 }} className="d2-echo d2-e2">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.04, 0.44]} from={{ y: "6vh", scale: 0.98, opacity: 0 }} to={{ y: "1vh", scale: 1.03, opacity: 1 }} cursor={{ x: 16, y: 11 }} className="d2-dancer">
          <SceneMedia src={`${A}/dfig-cut.png`} alt="Dancer mid-movement" />
        </Layer>
        <div className="d2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d2-copy">
          <span className="dn-eyebrow">01 — the floor</span>
          <h2>A body that<br /><em>listens.</em></h2>
          <p>Sprung floors, real mirrors, teachers who correct with a hand, not a shout — movement you can feel from the back row.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE WORK (flying motion frames · cards) */}
      <ParallaxScene heightVh={280} className="dn-scene d3-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#141416" }}>
        <div className="d3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="d3-word"><span>WORK</span></Layer>
        {/* motion-trail: эхо-силуэты танцора расходятся влево · echo-trail */}
        <Layer z={4} depth={0.5} phase={[0.03, 0.62]} from={{ x: "0vw", opacity: 0 }} to={{ x: "-16vw", opacity: 0.18 }} fit="contain" className="d3-echo d3-e1"><SceneMedia src={`${A}/dancer-cut.png`} /></Layer>
        <Layer z={5} depth={0.56} phase={[0.03, 0.58]} from={{ x: "0vw", opacity: 0 }} to={{ x: "-8vw", opacity: 0.36 }} fit="contain" className="d3-echo d3-e2"><SceneMedia src={`${A}/dancer-cut.png`} /></Layer>
        <Layer z={7} depth={0.62} phase={[0.04, 0.5]} from={{ x: "2vw", scale: 0.98, opacity: 0 }} to={{ x: "0vw", scale: 1, opacity: 1 }} fit="contain" className="d3-dancer"><SceneMedia src={`${A}/dancer-cut.png`} /></Layer>
        <Layer z={9} depth={0.4} phase={[0.16, 0.52]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="d3-thumbs">
          <div className="d3-thumb"><SceneMedia src={`${A}/g1.jpg`} /><i>01 · the leap</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g4.jpg`} /><i>02 · the line</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g2.jpg`} /><i>03 · the room</i></div>
          <div className="d3-thumb"><SceneMedia src={`${A}/g3.jpg`} /><i>04 · en pointe</i></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d3-copy">
          <span className="dn-eyebrow">02 — the work</span>
          <h2>Where the <em>work</em> happens.</h2>
        </Layer>
      </ParallaxScene>

      {/* S4 — TIMETABLE (this week · data) */}
      <ParallaxScene heightVh={250} className="dn-scene d4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#141416" }}>
        <div className="d4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="d4-head">
          <span className="dn-eyebrow">03 — the timetable</span><h2>This week on the floor.</h2>
        </Layer>
        {/* классы «считаются» на счёт: большая доля-цифра снапает, строка въезжает (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="d4-schedL">
          <div className="d4-sched">
            <div className="d4-cls" style={{ ["--thr" as string]: 0.04 }}><span className="d4-count">1</span><time>MON · 19:00</time><b>Contemporary</b><s>all levels</s><em className="on">2 places</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.20 }}><span className="d4-count">2</span><time>TUE · 18:00</time><b>Ballet — Beginners</b><s>no experience</s><em className="on">open</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.36 }}><span className="d4-count">3</span><time>THU · 20:00</time><b>Choreography Lab</b><s>intermediate+</s><em>full</em></div>
            <div className="d4-cls" style={{ ["--thr" as string]: 0.52 }}><span className="d4-count">4</span><time>SAT · 11:00</time><b>Open Floor</b><s>drop-in · any level</s><em className="on">open</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE BACK ROW (voices · bg+text) */}
      <ParallaxScene heightVh={260} className="dn-scene d5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: -14, color: "#0e0f11" }}>
        <div className="d5-bg" aria-hidden />
        <div className="d5-eyebrow">from the back row</div>
        {/* кинетик-тайп с эхо-шлейфом (motion-trail на типографике) · type-echo */}
        <Layer z={5} depth={0.3} phase={[0.03, 0.4]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l1">
          <p>First class in twenty years — left lighter than I've felt in months.</p><cite>Elin R. · beginner ballet</cite>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.16, 0.52]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l2">
          <p>Small classes, real corrections. Fixed a habit I'd carried since I was ten.</p><cite>Marco T. · contemporary</cite>
        </Layer>
        <Layer z={7} depth={0.54} phase={[0.29, 0.64]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="d5-line d5-l3">
          <p>Where I finally started making, not just copying.</p><cite>Yasmin A. · choreo lab</cite>
        </Layer>
      </ParallaxScene>

      {/* S6 — FIND YOUR LINE (pointe shoes + CTA · object) */}
      <ParallaxScene heightVh={260} className="dn-scene d6-scene">
        <div className="d6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.04, 0.5]} from={{ y: "7vh", scale: 0.94, rotate: "-8deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "-4deg", opacity: 1 }} cursor={{ x: 18, y: 12 }} className="d6-obj">
          <SceneMedia src={`${A}/pointeobj-cut.png`} alt="Ballet pointe shoes" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="d6-copy">
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
