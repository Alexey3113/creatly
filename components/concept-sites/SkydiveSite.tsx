"use client";
/* Концепт 02 — SKYDIVE «SKYFALL». Сюрреал teal-grey: портал-круг с перевёрнутым горным миром, крошечная падающая фигура, пики-foreground, туман. Типо-персона: разрежённый light-grotesk. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./skydive.css";

const A = "/uploads/1/hooks/sites/anim/skydive";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function SkydiveSite() {
  return (
    <div className="sd-site">
      <header className="sd-head">
        <Link href="/visual-hooks" className="sd-brand">SKYFALL</Link>
        <nav className="sd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Jumps</a><a href="#" onClick={stop}>Locations</a>
          <a href="#" onClick={stop}>Training</a><a href="#" onClick={stop} className="sd-book">Book a jump</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="sd-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#0d1513" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "3vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }}>
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>

        <Layer z={3} depth={0.3} phase={[0, 1]} from={{ y: "-4vh", scale: 1 }} to={{ y: "-9vh", scale: 1.05 }} cursor={{ x: -14, y: -10 }} className="sd-portal">
          <div className="sd-disc"><img src={`${A}/mountains.jpg`} alt="" /></div>
        </Layer>

        <Layer z={5} depth={0.6} phase={[0.04, 0.96]} from={{ y: "-12vh", scale: 1.7, opacity: 0 }} to={{ y: "22vh", scale: 2.8, opacity: 1 }} cursor={{ x: 26, y: 20 }} fit="contain" className="sd-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Skydiver in freefall" />
        </Layer>

        <Layer z={7} depth={1} from={{ y: "10vh", scale: 1.1 }} to={{ y: "-5vh", scale: 1.18 }} cursor={{ x: 22, y: 12 }} position="center bottom" className="sd-peaks">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <div className="sd-fog" aria-hidden />

        <div className="sd-title">
          <h1>SKYFALL</h1>
          <span className="sd-sub">skydiving where the earth looks unreal</span>
        </div>
        <div className="sd-label sd-tl">ALT · 4000 M</div>
        <div className="sd-label sd-tr">N 46° · E 8°<br />THE ALPS</div>
        <div className="sd-label sd-bl"><b>01</b><span>the jump</span></div>
        <div className="sd-cue" aria-hidden>scroll to fall</div>
      </ParallaxScene>

      {/* S2 — SIXTY SECONDS (portal + falling figure · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="sd-scene sd2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#0d1513" }}>
        <Layer z={1} depth={0.14} from={{ scale: 1.08 }} to={{ y: "3vh", scale: 1.16 }} cursor={{ x: -6, y: -4 }} className="sd2-bg">
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>
        <div className="sd2-veil" aria-hidden />
        <Layer z={3} depth={0.4} phase={[0.02, 0.6]} from={{ y: "3vh", scale: 0.96, opacity: 0 }} to={{ y: "-2vh", scale: 1.02, opacity: 1 }} cursor={{ x: -12, y: -8 }} className="sd2-portal">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <Layer z={5} depth={0.7} phase={[0.05, 0.5]} from={{ y: "6vh", scale: 0.9, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} cursor={{ x: 20, y: 14 }} className="sd2-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Skydiver in freefall" />
        </Layer>
        <div className="sd2-fog" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd2-copy">
          <span className="sd-eyebrow">01 — sixty seconds</span>
          <h2>Sixty seconds<br /><em>of free fall.</em></h2>
          <p>Tandem and solo jumps over the places most people only see from a plane window — alps, coastlines, deserts. No experience needed for your first fall.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE FALL (altimeter · a marker falls the altitude tape by --lp, stages light up) */}
      <ParallaxScene heightVh={300} className="sd-scene sd3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#0d1513" }}>
        <div className="sd3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sd3-word"><span>FALL</span></Layer>
        <Layer z={12} depth={0.24} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd3-copy2">
          <span className="sd-eyebrow">02 — the fall</span>
          <h2>The way <em>down.</em></h2>
        </Layer>
        <Layer z={6} depth={0.36} phase={[0.05, 0.82]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd3-diveL">
          <div className="sd3-dive">
            <div className="sd3-tape">
              {[{ p: 0, a: "4,000" }, { p: 25, a: "3,000" }, { p: 50, a: "2,000" }, { p: 75, a: "1,000" }, { p: 100, a: "ground" }].map((t) => (
                <span className="sd3-tick" key={t.p} style={{ top: `${t.p}%` }}>{t.a}</span>
              ))}
              <span className="sd3-trail" aria-hidden />
              <span className="sd3-marker" aria-hidden><i /></span>
            </div>
            <div className="sd3-stages">
              <div className="sd3-stage" style={{ ["--thr" as string]: 0.02 }}><SceneMedia src={`${A}/g1.jpg`} /><div><b>Exit</b><s>4,000 m · the door swings open</s></div></div>
              <div className="sd3-stage" style={{ ["--thr" as string]: 0.28 }}><SceneMedia src={`${A}/g2.jpg`} /><div><b>Freefall</b><s>2,500 m · sixty seconds, 200 km/h</s></div></div>
              <div className="sd3-stage" style={{ ["--thr" as string]: 0.55 }}><SceneMedia src={`${A}/g5.jpg`} /><div><b>Canopy</b><s>1,400 m · silence over the range</s></div></div>
              <div className="sd3-stage" style={{ ["--thr" as string]: 0.78 }}><SceneMedia src={`${A}/g4.jpg`} /><div><b>Landing</b><s>0 m · feet on the dropzone</s></div></div>
            </div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S4 — HOW YOU JUMP (levels · data) */}
      <ParallaxScene heightVh={260} className="sd-scene sd4-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#0d1513" }}>
        <div className="sd4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd4-head">
          <span className="sd-eyebrow">03 — how you jump</span><h2>Three ways <em>down.</em></h2>
        </Layer>
        {/* уровни «падают» сверху и встают на место (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.66]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sd4-levelsL">
          <div className="sd4-levels">
            <div className="sd4-level" style={{ ["--thr" as string]: 0.05 }}><i>first fall</i><b>Tandem</b><s>strapped to an instructor — sixty seconds of freefall from 4,000 m</s></div>
            <div className="sd4-level" style={{ ["--thr" as string]: 0.26 }}><i>learn to solo</i><b>AFF course</b><s>accelerated freefall, seven levels to a licensed solo jump</s></div>
            <div className="sd4-level" style={{ ["--thr" as string]: 0.47 }}><i>licensed</i><b>Fun jumps</b><s>manifest for the next load — coastlines, alps and deserts</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE DOOR (jump logbook · each review a logged jump, rows fill in) */}
      <ParallaxScene heightVh={280} className="sd-scene sd5-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0d1513" }}>
        <div className="sd5-bg" aria-hidden />
        <div className="sd5-eyebrow">from the door · jump log</div>
        <div className="sd5-loghdr" aria-hidden><span>jump</span><span>date · dz</span><span>alt</span><span>freefall</span><span>remarks</span></div>
        <Layer z={5} depth={0.3} phase={[0.05, 0.36]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg1">
          <div className="sd5-row">
            <span className="sd5-no">#001</span><span className="sd5-dt">12 MAR · Alps</span><span className="sd5-alt">4,000 m</span><span className="sd5-ff">0:52</span>
            <p className="sd5-rem">"The plane door opened and my brain just stopped arguing. Best minute of my life." — Sofia L. · first tandem</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.2, 0.52]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg2">
          <div className="sd5-row">
            <span className="sd5-no">#047</span><span className="sd5-dt">04 JUL · Coast</span><span className="sd5-alt">4,200 m</span><span className="sd5-ff">0:58</span>
            <p className="sd5-rem">"Calm instructors, endless patience, unreal views every load." — Tom R. · AFF graduate</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.35, 0.66]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg3">
          <div className="sd5-row">
            <span className="sd5-no">#613</span><span className="sd5-dt">21 SEP · Desert</span><span className="sd5-alt">4,000 m</span><span className="sd5-ff">1:04</span>
            <p className="sd5-rem">"I've jumped on four continents. The coastline exit here is the one I describe." — Nina P. · 600 jumps</p>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S6 — THE FIRST FALL (portal + CTA · object) */}
      <ParallaxScene heightVh={260} className="sd-scene sd6-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: -5, y: -4 }} className="sd6-bg">
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>
        <div className="sd6-veil" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.02, 0.6]} from={{ scale: 0.94, opacity: 0 }} to={{ scale: 1.02, opacity: 1 }} cursor={{ x: 12, y: 9 }} className="sd6-portal">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ scale: 0.7, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sd6-copy">
          <span className="sd-eyebrow">book</span>
          <h2>Take the<br /><em>first fall.</em></h2>
        </Layer>
        <div className="sd6-cta">
          <p>Pick a place, pick a date. We handle the plane, the rig, and the landing.</p>
          <a href="#" onClick={stop} className="sd-btn">Book a jump <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="sd-foot">
        <div className="sd-foot-top"><b>SKYFALL</b><p>Free-fall over the world's most unreal places.</p></div>
        <div className="sd-foot-legal"><span>Skyfall Drop Zone</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
