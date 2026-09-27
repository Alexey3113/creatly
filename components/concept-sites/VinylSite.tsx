"use client";
/* Концепт 03 — VINYL «AFTER HOURS». Клуб винила, after-hours: тёмный sepia-amber, глянцевый макро, блэклеттер-титул, зерно. Hero-приём: центральный винил, вращается по скроллу (disc/grooves). Типо-персона: blackletter. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./vinyl.css";

const A = "/uploads/1/hooks/sites/anim/vinyl";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function VinylSite() {
  return (
    <div className="vn-site vn-poster">
      <header className="vn-head">
        <Link href="/visual-hooks" className="vn-brand">SIDE·B</Link>
        <nav className="vn-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Nights</a><a href="#" onClick={stop}>The room</a>
          <a href="#" onClick={stop}>Records</a><a href="#" onClick={stop} className="vn-join">Become a member</a>
        </nav>
      </header>

      {/* HERO — sepia-amber album-cover уровень пина «Vampire» */}
      <ParallaxScene heightVh={300} className="vn-hero vp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#140d09" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.15 }} cursor={{ x: -6, y: -5 }} className="vp-bg">
          <SceneMedia src={`${A}/coverface.jpg`} alt="Album cover portrait" />
        </Layer>
        <div className="vp-veil" aria-hidden />
        <Layer z={4} depth={0.28} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "-1vh", opacity: 1 }} cursor={{ x: -12, y: -8 }} className="vp-title">
          <span>Side B</span>
        </Layer>
        <Layer z={3} depth={0.5} phase={[0, 1]} from={{ rotate: "0deg", scale: 0.9, opacity: 0.7 }} to={{ rotate: "200deg", scale: 1, opacity: 1 }} cursor={{ x: 14, y: 10 }} fit="contain" className="vp-record">
          <SceneMedia src={`${A}/record-cut.png`} alt="Vinyl record" />
        </Layer>
        <div className="vp-grain" aria-hidden />
        <div className="vp-frame" aria-hidden />
        <div className="vp-top">EXPLICIT · ANALOG ONLY · AFTER HOURS</div>
        <div className="vp-kata">コリララ</div>
        <div className="vp-globe" aria-hidden />
        <div className="vp-badge"><b>PARENTAL</b><span>ADVISORY</span><i>ANALOG ONLY</i></div>
        <div className="vp-credit">SIDE·B — A LISTENING SOCIETY</div>
        <div className="vp-rpm">33⅓ RPM</div>
        <div className="vp-cue">drop the needle ↓</div>
      </ParallaxScene>

      {/* S2 — THE ROOM (after-hours bar · foreground-parallax) */}
      <ParallaxScene heightVh={270} className="vn-scene v2-scene" transitionOut={{ type: "curtain", start: 0.84, color: "#140d09" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="v2-bg">
          <SceneMedia src={`${A}/clubbg.jpg`} />
        </Layer>
        <div className="v2-veil" aria-hidden />
        <Layer z={9} depth={0.74} from={{ y: "-2vh", scale: 1.05 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: 28, y: 15 }} className="v2-fg">
          <SceneMedia src={`${A}/smokefg.jpg`} />
        </Layer>
        <div className="v2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v2-copy">
          <span className="vn-eyebrow">01 — the ritual</span>
          <h2>One record,<br /><em>played whole.</em></h2>
          <p>No screens, no shuffle — a small room, a good system, and people who came to listen. The needle drops at eleven.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — DIGGING THE CRATE (веер пластинок из центра + сквозной спиннинг-диск · rotation-signature) */}
      <ParallaxScene heightVh={300} className="vn-scene v3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 10, color: "#140d09" }}>
        <div className="v3-bg" aria-hidden />
        {/* спиннинг-диск — сквозной мотив винила, крутится по скроллу */}
        <Layer z={2} depth={0.3} phase={[0, 1]} from={{ rotate: "0deg", scale: 1.0, opacity: 0.42 }} to={{ rotate: "168deg", scale: 1.12, opacity: 0.72 }} cursor={{ x: 10, y: 7 }} fit="contain" className="v3-disc">
          <SceneMedia src={`${A}/record-cut.png`} alt="Vinyl record" />
        </Layer>
        {/* веер конвертов — «перебираем крейт», каждый на своём повороте от общей нижней оси */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.9]} from={{ x: "-2vw", y: "8vh", rotate: "-22deg", opacity: 0 }} to={{ x: "-15vw", y: "2vh", rotate: "-14deg", opacity: 1 }} cursor={{ x: 16, y: 9 }}>
          <div className="v3-sleeve v3-s1"><SceneMedia src={`${A}/g1.jpg`} /><b>the needle drops</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.08, 0.9]} from={{ x: "-1vw", y: "6vh", rotate: "-9deg", opacity: 0 }} to={{ x: "-6vw", y: "0vh", rotate: "-6deg", opacity: 1 }} cursor={{ x: 12, y: 7 }}>
          <div className="v3-sleeve v3-s2"><SceneMedia src={`${A}/g3.jpg`} /><b>the listening room</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.11, 0.9]} from={{ x: "1vw", y: "6vh", rotate: "6deg", opacity: 0 }} to={{ x: "6vw", y: "0vh", rotate: "5deg", opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="v3-sleeve v3-s3"><SceneMedia src={`${A}/g2.jpg`} /><b>digging the crates</b></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.14, 0.9]} from={{ x: "2vw", y: "8vh", rotate: "18deg", opacity: 0 }} to={{ x: "15vw", y: "2vh", rotate: "13deg", opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="v3-sleeve v3-s4"><SceneMedia src={`${A}/g5.jpg`} /><b>out of the sleeve</b></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="v3-copy">
          <span className="vn-eyebrow">02 — the crate</span>
          <h2>Flip through <em>the crate.</em></h2>
          <p>You bring the records, or trust the ones we pull. Nobody's in a hurry.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NIGHTS (sessions · data) */}
      <ParallaxScene heightVh={260} className="vn-scene v4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#140d09" }}>
        <div className="v4-bg" aria-hidden />
        <div className="v4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="v4-head">
          <span className="vn-eyebrow">03 — the nights</span><h2>Thursday to <em>Sunday, after ten.</em></h2>
        </Layer>
        {/* сессии-«дорожки»: ряд въезжает + амбер-грув прочерчивается под ним (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="v4-nightsL">
          <div className="v4-nights">
            <div className="v4-night" style={{ ["--thr" as string]: 0.05 }}><time>THU</time><b>Listening Session</b><s>one album, played whole</s><em className="on">open</em></div>
            <div className="v4-night" style={{ ["--thr" as string]: 0.22 }}><time>FRI</time><b>Guest Selectors</b><s>bring a side you love</s><em className="on">sign up</em></div>
            <div className="v4-night" style={{ ["--thr" as string]: 0.39 }}><time>SAT</time><b>Deep Cuts</b><s>rare pressings only</s><em>members</em></div>
            <div className="v4-night" style={{ ["--thr" as string]: 0.56 }}><time>SUN</time><b>The Back Room</b><s>after-after-hours</s><em>waitlist</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — SIDE B / THE REGULARS (трек-лист + игла-развёртка сверху вниз · needle-down) */}
      <ParallaxScene heightVh={260} className="vn-scene v5-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -8, color: "#140d09" }}>
        <div className="v5-bg" aria-hidden />
        <div className="v5-disc" aria-hidden />
        <div className="v5-eyebrow">side B · the regulars</div>
        <Layer z={4} depth={0.5} phase={[0.03, 0.9]} from={{ y: "-26vh" }} to={{ y: "26vh" }} className="v5-needle"><span /></Layer>
        <Layer z={5} depth={0.28} phase={[0.05, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t1">
          <i>B1</i><p>Forgotten what an album sounds like when you sit and let it finish.</p><cite>Owen D. · regular</cite>
        </Layer>
        <Layer z={5} depth={0.4} phase={[0.17, 0.54]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t2">
          <i>B2</i><p>Played my dad's old jazz record to a silent room. Nearly cried.</p><cite>Priya M. · guest selector</cite>
        </Layer>
        <Layer z={5} depth={0.52} phase={[0.29, 0.66]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t3">
          <i>B3</i><p>The only bar where people shush you for talking. Exactly what I wanted.</p><cite>Léo T. · member</cite>
        </Layer>
      </ParallaxScene>

      {/* S6 — SIDE B (record object + CTA) */}
      <ParallaxScene heightVh={260} className="vn-scene v6-scene">
        <div className="v6-bg" aria-hidden />
        <Layer z={4} depth={0.5} phase={[0, 1]} from={{ rotate: "0deg", scale: 0.92, opacity: 0.7 }} to={{ rotate: "180deg", scale: 1.04, opacity: 1 }} cursor={{ x: 16, y: 11 }} fit="contain" className="v6-obj">
          <SceneMedia src={`${A}/record-cut.png`} alt="Vinyl record" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ rotate: "-10deg", scale: 0.88, opacity: 0 }} to={{ rotate: "0deg", scale: 1, opacity: 1 }} className="v6-copy">
          <span className="vn-eyebrow">members</span>
          <h2>Come for<br /><em>side B.</em></h2>
        </Layer>
        <div className="v6-cta">
          <p>Thursday to Sunday, after ten. Membership is small on purpose.</p>
          <a href="#" onClick={stop} className="vn-btn">Become a member <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="vn-foot">
        <div className="vn-foot-top"><b>SIDE·B</b><p>A members-only after-hours listening room. Analog only.</p></div>
        <div className="vn-foot-legal"><span>Side B Society</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
