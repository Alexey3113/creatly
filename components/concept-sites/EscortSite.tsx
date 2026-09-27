"use client";
/* Концепт 20 — ESCORT «ÉCLAT». Тактичный SFW premium companionship / plus-one concierge для вечерних событий, гала, ужинов. Достоинство, дискретность, этикет — НЕ сексуализация. Emerald+gold+noir, spotlight-cone на фигуре в вечернем платье, gold city-bokeh орбы, титул ÉCLAT за фигурой. Типо-персона: Marcellus + DM Mono. Hero-приём: spotlight-cone. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./escort.css";

const A = "/uploads/1/hooks/sites/anim/escort";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function EscortSite() {
  return (
    <div className="es-site es-poster">
      <header className="es-head">
        <Link href="/visual-hooks" className="es-brand">Éclat</Link>
        <nav className="es-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The service</a><a href="#" onClick={stop}>Etiquette</a>
          <a href="#" onClick={stop}>Discretion</a><a href="#" onClick={stop} className="es-enq">Enquire</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="es-hero ep-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#0a1310" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: -5, y: -4 }} className="ep-bg">
          <SceneMedia src={`${A}/mist.jpg`} />
        </Layer>
        <div className="ep-veil" aria-hidden />

        <Layer z={3} depth={0.24} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -10, y: -6 }} className="ep-title">
          <span>ÉCLAT</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.44]} from={{ y: "5vh", scale: 1.0, opacity: 0 }} to={{ y: "1vh", scale: 1.05, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="ep-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Woman in an evening gown" />
        </Layer>
        <div className="ep-mistfg" aria-hidden />
        <div className="ep-grain" aria-hidden />
        <div className="ep-mono">É</div>

        <div className="ep-top"><span>COMPANIONSHIP</span><s />&nbsp;THE EVENINGS THAT MATTER&nbsp;<s /><span>CONCIERGE</span></div>
        <div className="ep-d ep-dl"><i>By invitation</i>EST. 2012<br />application &amp; interview<br />discretion assured</div>
        <div className="ep-d ep-dr"><i>The occasions</i>GALAS · DINNERS<br />OPENINGS · WEDDINGS<br />the room you enter</div>
        <div className="ep-cred">GRACE · PRESENCE · DISCRETION</div>
        <div className="ep-loc">PARIS / LONDON<br />BY ARRANGEMENT</div>
        <div className="ep-cue">enquire quietly ↓</div>
      </ParallaxScene>

      {/* S2 — THE ROOM (foreground-parallax · couple into the hall) */}
      <ParallaxScene heightVh={280} className="es-scene e2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -13, color: "#0a1310" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="e2-bg">
          <SceneMedia src={`${A}/ballroombg.jpg`} />
        </Layer>
        <div className="e2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.55]} from={{ y: "5vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1.02, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="e2-couple">
          <SceneMedia src={`${A}/couple-cut.png`} alt="Couple at a formal event" />
        </Layer>
        <Layer z={9} depth={0.72} from={{ y: "-3vh", scale: 1.04 }} to={{ y: "1vh", scale: 1.1 }} cursor={{ x: 28, y: 15 }} className="e2-fg">
          <SceneMedia src={`${A}/chandelierfg.jpg`} />
        </Layer>
        <div className="e2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="e2-copy">
          <span className="es-eyebrow">01 — the room</span>
          <h2>The room <em>you enter.</em></h2>
          <p>Arrive with someone who belongs there — poised, well-read, at ease in any room. The evening simply runs itself.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE OCCASIONS (data · Everest-style register) */}
      <ParallaxScene heightVh={280} className="es-scene e3-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#0a1310" }}>
        <div className="e3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 0.9 }} className="e3-mono"><span>É</span></Layer>
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="e3-head">
          <span className="es-eyebrow">02 — the occasions</span><h2>For the evenings <em>that matter.</em></h2>
        </Layer>
        <div className="e3-spot" aria-hidden />
        {/* gilded occasion-frames: галерея вечеров под спот-светом · refined-lift */}
        <Layer z={5} depth={0.34} phase={[0.1, 0.46]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="e3-frame e3-f1"><SceneMedia src={`${A}/g1.jpg`} /><figcaption><b>The Gala</b><span>black tie · benefit</span></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.17, 0.53]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="e3-frame e3-f2"><SceneMedia src={`${A}/g2.jpg`} /><figcaption><b>The Dinner</b><span>business · private</span></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.5} phase={[0.24, 0.6]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="e3-frame e3-f3"><SceneMedia src={`${A}/g3.jpg`} /><figcaption><b>The Opera</b><span>premières · the interval</span></figcaption></figure>
        </Layer>
        <Layer z={8} depth={0.58} phase={[0.31, 0.67]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="e3-frame e3-f4"><SceneMedia src={`${A}/g4.jpg`} /><figcaption><b>The Wedding</b><span>a plus-one, with grace</span></figcaption></figure>
        </Layer>
      </ParallaxScene>

      {/* S4 — DISCRETION (bg+text · a single gold thread) */}
      <ParallaxScene heightVh={240} className="es-scene e4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#07100b" }}>
        <div className="e4-bg" aria-hidden />
        <div className="e4-rule" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.02, 0.42]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="e4-copy">
          <span className="es-eyebrow">03 — discretion</span>
          <h2>Held in <em>complete confidence.</em></h2>
        </Layer>
        {/* каждый шаг раскрывается спот-ирисом (по --lp, последовательно) */}
        <Layer z={12} depth={0.34} phase={[0.08, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="e4-points">
          <div className="e4-pt" style={{ ["--thr" as string]: 0.05 }}><i>i · apply</i>A quiet enquiry. Tell us the occasion, the room, the impression to make.</div>
          <div className="e4-pt" style={{ ["--thr" as string]: 0.26 }}><i>ii · meet</i>A thoughtful introduction and a brief call, so the evening feels easy.</div>
          <div className="e4-pt" style={{ ["--thr" as string]: 0.47 }}><i>iii · attend</i>Present, professional company — and what happens at the event stays there.</div>
        </Layer>
      </ParallaxScene>

      {/* S5 — IN CONFIDENCE (cards · engraved invitations on velvet) */}
      <ParallaxScene heightVh={280} className="es-scene e5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: 12, color: "#070f0b" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -4, y: -3 }} className="e5-bg">
          <SceneMedia src={`${A}/velvetbg.jpg`} />
        </Layer>
        <div className="e5-veil" aria-hidden />
        <div className="e5-eyebrow">in confidence</div>
        <Layer z={5} depth={0.42} phase={[0.05, 0.6]} from={{ x: "-22vw", y: "-3vh", rotate: "-4deg", opacity: 0 }} to={{ x: "-29vw", y: "-7vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: 20, y: 12 }}>
          <div className="e5-card"><p>Walked in with someone who could hold any conversation. The evening ran itself.</p><cite>— annual gala</cite></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.1, 0.65]} from={{ y: "9vh", scale: 0.98, opacity: 0 }} to={{ y: "6vh", scale: 1.02, opacity: 1 }} cursor={{ x: 14, y: 9 }}>
          <div className="e5-card e5-mid"><p>Discreet, punctual, genuinely charming. Exactly the plus-one the occasion needed.</p><cite>— awards dinner</cite></div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.15, 0.7]} from={{ x: "22vw", y: "-3vh", rotate: "4deg", opacity: 0 }} to={{ x: "29vw", y: "-7vh", rotate: "3deg", opacity: 1 }} cursor={{ x: -20, y: -12 }}>
          <div className="e5-card"><p>Handled with such tact from the first call. I never once had to explain myself.</p><cite>— private wedding</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — NEVER ARRIVE ALONE (object · seal + CTA) */}
      <ParallaxScene heightVh={260} className="es-scene e6-scene">
        <div className="e6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.05, 0.34]} from={{ scale: 1.4, rotate: "9deg", opacity: 0 }} to={{ scale: 1, rotate: "-4deg", opacity: 1 }} cursor={{ x: 16, y: 10 }} className="e6-seal">
          <SceneMedia src={`${A}/sealobj-cut.png`} alt="Wax seal" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.06, 0.52]} from={{ y: "7vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="e6-copy">
          <span className="es-eyebrow">enquiries</span>
          <h2>Never arrive<br /><em>alone.</em></h2>
        </Layer>
        <div className="e6-cta">
          <p>Introductions are by application and interview. Tell us the occasion — we'll take care of the rest, discreetly.</p>
          <a href="#" onClick={stop} className="es-btn">Make an enquiry <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="es-foot">
        <div className="es-foot-top"><b>Éclat</b><p>Discreet companionship for the evenings that matter.</p></div>
        <div className="es-foot-legal"><span>Éclat — social companionship</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
