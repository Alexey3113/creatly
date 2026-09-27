"use client";
/* Концепт 21 — REDSUIT «SANGUINE». Красные премиум-костюмы. Глубокий crimson-luxury, фигура в костюме, гигантский ornate-serif титул за ней (occlusion), топографика/✦/×××-декор, блэклеттер-цитата. Типо-персона: ornate serif + blackletter. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./redsuit.css";

const A = "/uploads/1/hooks/sites/anim/redsuit";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function RedsuitSite() {
  return (
    <div className="rd-site">
      <header className="rd-head">
        <Link href="/visual-hooks" className="rd-brand">SANGUINE</Link>
        <nav className="rd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The cut</a><a href="#" onClick={stop}>Cloth</a>
          <a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop} className="rd-book">Book a fitting</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="rd-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#4c0d16" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="rd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="rd-topo" aria-hidden />
        <div className="rd-blobs" aria-hidden />

        <Layer z={3} depth={0.26} phase={[0.02, 0.48]} from={{ y: "4vh", scale: 0.97, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -12, y: -8 }} className="rd-title">
          <span>PRIDE</span>
        </Layer>

        <Layer z={5} depth={0.55} phase={[0.04, 0.95]} from={{ y: "10vh", scale: 0.92, opacity: 0 }} to={{ y: "0vh", scale: 1.07, opacity: 1 }} cursor={{ x: 20, y: 12 }} fit="contain" position="center bottom" className="rd-man">
          <SceneMedia src={`${A}/man-cut.png`} alt="Man wearing a crimson tailored suit" />
        </Layer>
        <div className="rd-grain" aria-hidden />

        <Layer z={12} depth={0.18} phase={[0.1, 0.5]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd-quote">
          <p>Pride is not thinking you're better than others — it's knowing your worth without needing approval.</p>
        </Layer>

        <div className="rd-mark rd-x">✕✕✕</div>
        <div className="rd-star rd-s1">✦</div><div className="rd-star rd-s2">✦</div>
        <div className="rd-label rd-tl">SANGUINE · SS'24</div>
        <div className="rd-label rd-tr">MADE TO<br />MEASURE</div>
        <div className="rd-label rd-bl"><b>01</b><span>the crimson cut</span></div>
        <div className="rd-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — THE CLOTH (man + crimson + topo · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="rd-scene rd2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 10, color: "#5e0f1a" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -4, y: -3 }} className="rd2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="rd2-veil" aria-hidden />
        <div className="rd2-topo" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="rd2-man">
          <SceneMedia src={`${A}/man-cut.png`} alt="Man wearing a crimson tailored suit" />
        </Layer>
        <div className="rd2-grain" aria-hidden />
        <div className="rd2-quote" aria-hidden>the room hears it before you speak.</div>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd2-copy">
          <span className="rd-eyebrow">01 — the cloth</span>
          <h2>A red suit is<br /><em>a decision.</em></h2>
          <p>Deep crimson cloth milled to our specification, cut to your exact body over three fittings, finished entirely by hand — the loudest quiet thing you own.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE LOOKS (suits · cards) */}
      <ParallaxScene heightVh={280} className="rd-scene rd3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#5e0f1a" }}>
        <div className="rd3-bg" aria-hidden />
        <div className="rd3-rail" aria-hidden />
        {/* образы висят на рейке, въезжают сбоку и качаются на крючках · lateral-sway */}
        <Layer z={5} depth={0.42} phase={[0.05, 0.44]} from={{ x: "-27vw", rotate: "-6deg", opacity: 0 }} to={{ x: "-30vw", rotate: "-1.5deg", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p1"><SceneMedia src={`${A}/g1.jpg`} /><b>the scarlet double-breasted</b></div>
        </Layer>
        <Layer z={6} depth={0.52} phase={[0.11, 0.52]} from={{ x: "-13vw", rotate: "5deg", opacity: 0 }} to={{ x: "-10vw", rotate: "1deg", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="rd3-slot">
          <div className="rd3-plate rd3-p2"><SceneMedia src={`${A}/g4.jpg`} /><b>the oxblood, from behind</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.17, 0.6]} from={{ x: "13vw", rotate: "-5deg", opacity: 0 }} to={{ x: "10vw", rotate: "-1deg", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p3"><SceneMedia src={`${A}/g2.jpg`} /><b>the lapel</b></div>
        </Layer>
        <Layer z={8} depth={0.68} phase={[0.23, 0.66]} from={{ x: "27vw", rotate: "6deg", opacity: 0 }} to={{ x: "30vw", rotate: "1.5deg", opacity: 1 }} cursor={{ x: -14, y: -8 }} className="rd3-slot">
          <div className="rd3-plate rd3-p4"><SceneMedia src={`${A}/g5.jpg`} /><b>cloth, tie &amp; shoe</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rd3-copy">
          <span className="rd-eyebrow">02 — the looks</span>
          <h2>Every shade of <em>red you dare.</em></h2>
          <p>Scarlet to oxblood, single to double-breasted — on the rail, then on you.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE CUT (three steps · data) */}
      <ParallaxScene heightVh={260} className="rd-scene rd4-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#5e0f1a" }}>
        <div className="rd4-bg" aria-hidden />
        <div className="rd4-topo" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="rd4-head">
          <span className="rd-eyebrow">03 — the cut</span><h2>Six weeks, <em>one suit.</em></h2>
        </Layer>
        <Layer z={12} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="rd4-steps">
          <div className="rd4-step" style={{ ["--thr" as string]: 0.06 }}><i>i</i><b>The red</b><s>our own milled crimson — rich, never garish, under daylight or chandelier</s></div>
          <div className="rd4-step" style={{ ["--thr" as string]: 0.22 }}><i>ii</i><b>The cut</b><s>cut to your body over three fittings, a canvassed chest, a line that holds</s></div>
          <div className="rd4-step" style={{ ["--thr" as string]: 0.38 }}><i>iii</i><b>The finish</b><s>hand-stitched edges, horn buttons, a lining you choose</s></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE CLIENT BOOK / WORN IN THE ROOM (леджер-записи, вписываются слева · ledger-in) */}
      <ParallaxScene heightVh={260} className="rd-scene rd5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: -8, color: "#5e0f1a" }}>
        <div className="rd5-bg" aria-hidden />
        <div className="rd5-margin" aria-hidden />
        <div className="rd5-eyebrow">the client book · worn in the room</div>
        <Layer z={5} depth={0.26} phase={[0.05, 0.42]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e1">
          <div><i>No.014 · first commission</i><p>Wore it to a black-tie where everyone blurred together. I did not.</p><b>— Julian F.</b></div>
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.17, 0.54]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e2">
          <div><i>No.021 · groom</i><p>I was terrified of the colour. Two fittings in, I understood — it's not loud, it's certain.</p><b>— Marcus O.</b></div>
        </Layer>
        <Layer z={5} depth={0.5} phase={[0.29, 0.66]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="rd5-entry rd5-e3">
          <div><i>No.006 · repeat client</i><p>People remember the man, then the suit. In that order.</p><b>— Idris K.</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — WEAR THE ROOM (man + CTA · object) */}
      <ParallaxScene heightVh={260} className="rd-scene rd6-scene">
        <div className="rd6-bg" aria-hidden />
        <div className="rd6-topo" aria-hidden />
        <Layer z={4} depth={0.5} phase={[0.05, 0.9]} from={{ x: "6vw", y: "3vh", scale: 1.0, opacity: 0 }} to={{ x: "2vw", y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 18, y: 11 }} className="rd6-man">
          <SceneMedia src={`${A}/man-cut.png`} alt="Man wearing a crimson tailored suit" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="rd6-copy">
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
