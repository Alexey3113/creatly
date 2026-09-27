"use client";
/* Концепт 20 — ESCORT «ÉCLAT». Тактичный SFW premium companionship / plus-one concierge для вечерних событий, гала, ужинов. Достоинство, дискретность, этикет — НЕ сексуализация. Emerald+gold+noir, spotlight-cone на фигуре в вечернем платье, gold city-bokeh орбы, титул ÉCLAT за фигурой. Типо-персона: Marcellus + DM Mono. Hero-приём: spotlight-cone.
   Сквозная архитектура (аудит 2026-09): весь сайт — путь приглашения. Актёр — конверт с печатью É (sealobj-cut):
   горит в просвете облаков → лежит на паркете зала → из него поднимаются карточки поводов → с него свисает нить
   конфиденциальности → в него вкладывают записки → в финале он запечатан и становится CTA-объектом.
   Стыки: S1→S2 и S5→S6 — капля сургуча растекается до кадра, в ней следующая сцена; S4→S5 — нить раскрывается
   дверью (вертикальная щель); S2→S3, S3→S4 — перекрытие. S4 — пара в дверях (а не пустая тьма), S5 — лаунж вместо леса. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere, Weather } from "@/components/scene-kit";
import "./escort.css";

const A = "/uploads/1/hooks/sites/anim/escort";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function EscortSite() {
  return (
    <div className="es-site es-poster">
      <Atmosphere stops={[
        { at: ".e3-scene", color: "#0f2419", anchor: 0.5 },
        { at: ".e4-scene", color: "#0b1a12", anchor: 0.5 },
        { at: ".e6-scene", color: "#123b2e", anchor: 0.45 },
      ]} />
      {/* золотая пыль бального зала — от зала до поводов */}
      <Weather kind="dust" count={26} color="#e6cf98" color2="#cba75a" between={[".e2-scene", ".e4-scene"]} world={0.4} zIndex={21} />
      {/* АКТЁР — приглашение с печатью */}
      <Actor className="es-invite" src={`${A}/sealobj-cut.png`} width="30vw" zIndex={23} bob={5} tilt={0.05} stops={[
        { at: ".ep-hero", anchor: 0.18, pose: { x: 35, y: 47, s: 0.42, r: -12, o: 1 } },
        { at: ".ep-hero", anchor: 0.52, pose: { x: 37, y: 50, s: 0.5, r: -6, o: 1 } },
        { at: ".e2-scene", anchor: 0.5, pose: { x: 69, y: 83, s: 0.46, r: 16 } },
        { at: ".e3-scene", anchor: 0.5, pose: { x: 50, y: 90, s: 0.4, r: 0 } },
        { at: ".e4-scene", anchor: 0.5, pose: { x: 50, y: 13, s: 0.32, r: 0 } },
        { at: ".e5-scene", anchor: 0.52, pose: { x: 50, y: 86, s: 0.44, r: -3 } },
        { at: ".e6-scene", anchor: 0.52, pose: { x: 78, y: 50, s: 1, r: -4 } },
        { at: ".es-foot", anchor: 0.25, pose: { x: 78, y: 14, s: 0.9, r: -4, o: 0 } },
      ]} />
      <header className="es-head">
        <Link href="/visual-hooks" className="es-brand">Éclat</Link>
        <nav className="es-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The service</a><a href="#" onClick={stop}>Etiquette</a>
          <a href="#" onClick={stop}>Discretion</a><a href="#" onClick={stop} className="es-enq">Enquire</a>
        </nav>
      </header>

      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={8} className="es-hero ep-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: -5, y: -4 }} className="ep-bg">
          <SceneMedia src={`${A}/mist.jpg`} />
        </Layer>
        <div className="ep-breath" aria-hidden />
        <div className="ep-veil" aria-hidden />

        <Layer z={3} depth={0.24} phase={[0.02, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -10, y: -6 }} className="ep-title">
          <span>ÉCLAT</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.05, 0.3]} from={{ y: "6vh", scale: 1.0, opacity: 0 }} to={{ y: "1vh", scale: 1.05, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="ep-figure">
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
      <ParallaxScene heightVh={300} overlapVh={80} parallax={8} className="es-scene e2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="e2-bg">
          <SceneMedia src={`${A}/ballroombg.jpg`} />
        </Layer>
        <div className="e2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.1, 0.4]} from={{ y: "5vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1.02, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="e2-couple">
          <SceneMedia src={`${A}/couple-cut.png`} alt="Couple at a formal event" />
        </Layer>
        <Layer z={9} depth={0.72} from={{ y: "-3vh", scale: 1.04 }} to={{ y: "1vh", scale: 1.1 }} cursor={{ x: 28, y: 15 }} className="e2-fg">
          <SceneMedia src={`${A}/chandelierfg.jpg`} />
        </Layer>
        <div className="e2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.32, 0.46]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="e2-copy">
          <span className="es-eyebrow">01 — the room</span>
          <h2>The room <em>you enter.</em></h2>
          <p>Arrive with someone who belongs there — poised, well-read, at ease in any room. The evening simply runs itself.</p>
        </Layer>
        <div className="es-wax" aria-hidden />
      </ParallaxScene>

      {/* S3 — THE OCCASIONS (data · Everest-style register) */}
      <ParallaxScene heightVh={290} overlapVh={60} parallax={10} className="es-scene e3-scene">
        <div className="e3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.3]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 0.9 }} className="e3-mono"><span>É</span></Layer>
        <Layer z={12} depth={0.22} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="e3-head">
          <span className="es-eyebrow">02 — the occasions</span><h2>For the evenings <em>that matter.</em></h2>
        </Layer>
        <div className="e3-spot" aria-hidden />
        {/* gilded occasion-frames: галерея вечеров под спот-светом · refined-lift */}
        <Layer z={5} depth={0.34} phase={[0.04, 0.3]} from={{ x: "12vw", y: "34vh", scale: 0.5, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="e3-frame e3-f1"><SceneMedia src={`${A}/g1.jpg`} /><figcaption><b>The Gala</b><span>black tie · benefit</span></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.08, 0.34]} from={{ x: "4vw", y: "34vh", scale: 0.5, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="e3-frame e3-f2"><SceneMedia src={`${A}/g2.jpg`} /><figcaption><b>The Dinner</b><span>business · private</span></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.5} phase={[0.12, 0.38]} from={{ x: "-4vw", y: "34vh", scale: 0.5, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="e3-frame e3-f3"><SceneMedia src={`${A}/g3.jpg`} /><figcaption><b>The Opera</b><span>premières · the interval</span></figcaption></figure>
        </Layer>
        <Layer z={8} depth={0.58} phase={[0.16, 0.42]} from={{ x: "-12vw", y: "34vh", scale: 0.5, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="e3-frame e3-f4"><SceneMedia src={`${A}/g4.jpg`} /><figcaption><b>The Wedding</b><span>a plus-one, with grace</span></figcaption></figure>
        </Layer>
      </ParallaxScene>

      {/* S4 — DISCRETION (bg+text · a single gold thread) */}
      <ParallaxScene heightVh={280} overlapVh={60} parallax={8} className="es-scene e4-scene">
        <div className="e4-bg" aria-hidden />
        <Layer z={1} depth={0.12} from={{ scale: 1.14 }} to={{ y: "2vh", scale: 1.04 }} cursor={{ x: -4, y: -3 }} className="e4-door">
          <SceneMedia src={`${A}/couple.jpg`} alt="A couple stepping through a lit doorway" />
        </Layer>
        <div className="e4-dveil" aria-hidden />
        <div className="e4-rule" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="e4-copy">
          <span className="es-eyebrow">03 — discretion</span>
          <h2>Held in <em>complete confidence.</em></h2>
        </Layer>
        {/* каждый шаг раскрывается спот-ирисом (по --lp, последовательно) */}
        <Layer z={12} depth={0.34} phase={[0.3, 0.8]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="e4-points">
          <div className="e4-pt" style={{ ["--thr" as string]: 0.05 }}><i>i · apply</i>A quiet enquiry. Tell us the occasion, the room, the impression to make.</div>
          <div className="e4-pt" style={{ ["--thr" as string]: 0.26 }}><i>ii · meet</i>A thoughtful introduction and a brief call, so the evening feels easy.</div>
          <div className="e4-pt" style={{ ["--thr" as string]: 0.47 }}><i>iii · attend</i>Present, professional company — and what happens at the event stays there.</div>
        </Layer>
      </ParallaxScene>

      {/* S5 — IN CONFIDENCE (cards · engraved invitations on velvet) */}
      <ParallaxScene heightVh={290} overlapVh={70} parallax={10} className="es-scene e5-scene">
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -4, y: -3 }} className="e5-bg">
          <SceneMedia src={`${A}/bg.jpg`} alt="A private lounge above the city at night" />
        </Layer>
        <div className="e5-veil" aria-hidden />
        <Layer z={16} depth={0} phase={[0.3, 0.4]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="e5-eyebrow">in confidence</div></Layer>
        <Layer z={5} depth={0.42} phase={[0.3, 0.44]} from={{ x: "-6vw", y: "30vh", rotate: "-9deg", scale: 0.6, opacity: 0 }} to={{ x: "-29vw", y: "-7vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: 20, y: 12 }}>
          <div className="e5-card"><p>Walked in with someone who could hold any conversation. The evening ran itself.</p><cite>— annual gala</cite></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.34, 0.48]} from={{ y: "30vh", scale: 0.6, opacity: 0 }} to={{ y: "6vh", scale: 1.02, opacity: 1 }} cursor={{ x: 14, y: 9 }}>
          <div className="e5-card e5-mid"><p>Discreet, punctual, genuinely charming. Exactly the plus-one the occasion needed.</p><cite>— awards dinner</cite></div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.38, 0.52]} from={{ x: "6vw", y: "30vh", rotate: "9deg", scale: 0.6, opacity: 0 }} to={{ x: "29vw", y: "-7vh", rotate: "3deg", opacity: 1 }} cursor={{ x: -20, y: -12 }}>
          <div className="e5-card"><p>Handled with such tact from the first call. I never once had to explain myself.</p><cite>— private wedding</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — NEVER ARRIVE ALONE (object · seal + CTA) */}
      <ParallaxScene heightVh={250} overlapVh={80} parallax={8} className="es-scene e6-scene">
        <div className="e6-bg" aria-hidden />
        <div className="e6-glow" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.4, 0.56]} from={{ y: "7vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="e6-copy">
          <span className="es-eyebrow">enquiries</span>
          <h2>Never arrive<br /><em>alone.</em></h2>
        </Layer>
        <div className="es-wax es-wax-seal" aria-hidden />
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
