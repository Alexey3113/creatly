"use client";
/* Концепт 06 — ECOLOGY «VERDA». Held-world: стеклянная капсула с лесом внутри. Тёмный sage-green, чистый lowercase-sans, парящая капсула, листья-fg. Типо-персона: light humanist sans. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./ecology.css";

const A = "/uploads/1/hooks/sites/anim/ecology";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function EcologySite() {
  return (
    <div className="ec-site">
      <header className="ec-head">
        <Link href="/visual-hooks" className="ec-brand">VERDA</Link>
        <nav className="ec-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Forests</a>
          <a href="#" onClick={stop}>Impact</a><a href="#" onClick={stop} className="ec-plant">Plant a forest</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="ec-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#16211a" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="ec-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="ec-blobs" aria-hidden />

        <Layer z={5} depth={0.5} phase={[0.04, 0.95]} from={{ y: "8vh", scale: 0.94, rotate: "-2deg", opacity: 0 }} to={{ y: "-4vh", scale: 1.06, rotate: "2deg", opacity: 1 }} cursor={{ x: 18, y: 22 }} fit="contain" className="ec-capsule">
          <SceneMedia src={`${A}/capsule-cut.png`} alt="Glass capsule holding a miniature living forest" />
        </Layer>

        <Layer z={6} depth={0.55} phase={[0.16, 0.5]} from={{ y: "-3vh", opacity: 0 }} to={{ y: "-4vh", opacity: 1 }} cursor={{ x: 18, y: 22 }} className="ec-word">
          <div><b>forest.</b><span>grown in your name</span></div>
        </Layer>

        <Layer z={8} depth={1} phase={[0.06, 1]} from={{ y: "-10vh", x: "-4vw", rotate: "-8deg", opacity: 0 }} to={{ y: "6vh", x: "2vw", rotate: "5deg", opacity: 1 }} cursor={{ x: 46, y: 32 }} fit="contain" className="ec-leaves">
          <SceneMedia src={`${A}/leaves-cut.png`} />
        </Layer>
        <div className="ec-grain" aria-hidden />

        <Layer z={12} depth={0.18} phase={[0.08, 0.5]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ec-copy">
          <div>
            <span className="ec-eyebrow">01 — reforestation</span>
            <p>Fund a real, mapped forest — native species, planted and monitored for thirty years. You get the coordinates. The trees do the rest.</p>
          </div>
        </Layer>

        <div className="ec-label ec-tr">46°N · 8°E<br />ALPINE NATIVE</div>
        <div className="ec-label ec-bl"><b>38,000</b><span>trees in the ground</span></div>
        <div className="ec-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — HOW IT GROWS (capsule + leaves · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="ec-scene ec2-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#16211a" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -4, y: -3 }} className="ec2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="ec2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="ec2-capsule">
          <SceneMedia src={`${A}/capsule-cut.png`} alt="Glass capsule holding a miniature living forest" />
        </Layer>
        <Layer z={9} depth={0.82} from={{ y: "-2vh", x: "2vw", rotate: "3deg" }} to={{ y: "2vh", x: "-2vw", rotate: "-2deg" }} cursor={{ x: 28, y: 15 }} className="ec2-fg">
          <SceneMedia src={`${A}/leaves-cut.png`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ec2-copy">
          <span className="ec-eyebrow">01 — how it grows</span>
          <h2>a forest with<br /><em>a location.</em></h2>
          <p>We plant native species where they belong, geotag every stand, and send you the map. Thirty years of monitoring, one forest that outlives the gesture.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — WHAT WE PROTECT (forest · cards) */}
      <ParallaxScene heightVh={280} className="ec-scene ec3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#16211a" }}>
        <div className="ec3-bg" aria-hidden />
        <div className="ec3-ground" aria-hidden />
        {/* стадии роста участка вдоль базовой линии: Y1→Y30, растут из земли слева-направо */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.42]} from={{ x: "-33vw", y: "-11vh", scale: 0.55, opacity: 0 }} to={{ x: "-33vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="ec3-slot">
          <div className="ec3-stage ec3-g1"><SceneMedia src={`${A}/g2.jpg`} /><b>Y1</b><span>planted by hand</span></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.12, 0.5]} from={{ x: "-12vw", y: "-11vh", scale: 0.55, opacity: 0 }} to={{ x: "-12vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 12, y: 7 }} className="ec3-slot">
          <div className="ec3-stage ec3-g2"><SceneMedia src={`${A}/g5.jpg`} /><b>Y5</b><span>first canopy</span></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.19, 0.58]} from={{ x: "10vw", y: "-11vh", scale: 0.55, opacity: 0 }} to={{ x: "10vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 14, y: 8 }} className="ec3-slot">
          <div className="ec3-stage ec3-g3"><SceneMedia src={`${A}/g4.jpg`} /><b>Y15</b><span>the river returns</span></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.26, 0.66]} from={{ x: "32vw", y: "-11vh", scale: 0.55, opacity: 0 }} to={{ x: "32vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="ec3-slot">
          <div className="ec3-stage ec3-g4"><SceneMedia src={`${A}/g1.jpg`} /><b>Y30</b><span>old-growth canopy</span></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ec3-copy">
          <span className="ec-eyebrow">02 — thirty-year plot</span>
          <h2>Watch a plot <em>grow up.</em></h2>
          <p>Native species, planted and monitored — thirty years, one forest that outlives the gesture.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE IMPACT (numbers · data) */}
      <ParallaxScene heightVh={260} className="ec-scene ec4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#16211a" }}>
        <div className="ec4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ec4-head">
          <span className="ec-eyebrow">03 — the impact</span>
        </Layer>
        <Layer z={12} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="ec4-stats">
          <div className="ec4-stat" style={{ ["--thr" as string]: 0.06 }}><b>2.4m</b><h4>trees, geotagged</h4><s>every stand mapped — find the one that's yours</s></div>
          <div className="ec4-stat" style={{ ["--thr" as string]: 0.24 }}><b>30<i>yr</i></b><h4>of monitoring</h4><s>one payment, three decades of care</s></div>
          <div className="ec4-stat" style={{ ["--thr" as string]: 0.42 }}><b>94<i>%</i></b><h4>survival rate</h4><s>native species, planted to live, not to count</s></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE GROUND (geotag field-notes с координатами · pin-drop) */}
      <ParallaxScene heightVh={260} className="ec-scene ec5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: 8, color: "#16211a" }}>
        <div className="ec5-bg" aria-hidden />
        <div className="ec5-mapbg" aria-hidden />
        <div className="ec5-eyebrow">from the ground · monitored plots</div>
        <Layer z={6} depth={0.3} phase={[0.05, 0.4]} from={{ x: "-31vw", y: "-12vh", opacity: 0 }} to={{ x: "-31vw", y: "0vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>46.21°N · 8.14°E</i><p>We offset the company, then visited the stand. My kids named a tree.</p><b>Lena F. · founder</b></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.13, 0.48]} from={{ x: "0vw", y: "-12vh", opacity: 0 }} to={{ x: "0vw", y: "0vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>44.72°N · 7.36°E</i><p>The geotag and the yearly photos sold me. It's real, and I can prove it.</p><b>Omar S. · sustainability lead</b></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.21, 0.56]} from={{ x: "31vw", y: "-12vh", opacity: 0 }} to={{ x: "31vw", y: "0vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>45.08°N · 6.92°E</i><p>Gave a forest for a wedding gift. Best thing we've ever given.</p><b>Priya &amp; Jon · members</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — GROW A FOREST (capsule + CTA · object) */}
      <ParallaxScene heightVh={260} className="ec-scene ec6-scene">
        <div className="ec6-bg" aria-hidden />
        <Layer z={4} depth={0.5} phase={[0.05, 0.9]} from={{ y: "5vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 16, y: 10 }} className="ec6-capsule">
          <SceneMedia src={`${A}/capsule-cut.png`} alt="Glass capsule holding a miniature living forest" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="ec6-copy">
          <span className="ec-eyebrow">plant</span>
          <h2>grow a<br /><em>forest.</em></h2>
        </Layer>
        <div className="ec6-cta">
          <p>One forest, in your name or someone else's. Coordinates arrive by email.</p>
          <a href="#" onClick={stop} className="ec-btn">Plant a forest <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="ec-foot">
        <div className="ec-foot-top"><b>VERDA</b><p>Real forests, mapped and monitored. Grown in your name.</p></div>
        <div className="ec-foot-legal"><span>Verda Reforestation</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
