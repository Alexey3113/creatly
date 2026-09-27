"use client";
/* Концепт 23 — FREESTYLE «SESSION». Фристайл-скейт крю / сессии. Near-black + red/cyan, RGB-split приём: красная и циан копии скейтера со смещением + mix-blend screen (глитч-хроматика) за чётким скейтером, chromatic text-shadow на kinetic italic-титуле SESSION, скан-линии. Типо-персона: Bricolage 800 skew + DM Mono. Hero-приём: RGB-split / chromatic. Отличие от dance (монохром motion-trail). */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./freestyle.css";

const A = "/uploads/1/hooks/sites/anim/freestyle";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function FreestyleSite() {
  return (
    <div className="fs-site fs-poster">
      <svg className="sp-defs" aria-hidden><filter id="sp-erode"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.055" numOctaves="2" seed="9" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
      <header className="fs-head">
        <Link href="/visual-hooks" className="fs-brand">SESSION</Link>
        <nav className="fs-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Spots</a><a href="#" onClick={stop}>Crew</a>
          <a href="#" onClick={stop}>Clips</a><a href="#" onClick={stop} className="fs-join">Join a session</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="fs-hero sp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#100f0d" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="sp-bg">
          <SceneMedia src={`${A}/paperbg.jpg`} />
        </Layer>
        <div className="sp-wash" aria-hidden />

        {/* гигантский битый титул */}
        <Layer z={3} depth={0.3} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "-1vh", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="sp-title">
          <span>SESSION</span>
        </Layer>

        {/* капюшонная фигура (герой) */}
        <Layer z={6} depth={0.5} phase={[0.04, 0.44]} from={{ y: "6vh", scale: 0.98, opacity: 0 }} to={{ y: "1vh", scale: 1.04, opacity: 1 }} cursor={{ x: 20, y: 12 }} className="sp-figure">
          <SceneMedia src={`${A}/skater-cut.png`} alt="Skateboarder mid-trick" />
        </Layer>
        <div className="sp-grain" aria-hidden />

        {/* красная восковая печать */}
        <div className="sp-seal"><b>S</b><span>session · crew</span><i>№ 018</i></div>

        {/* плотная маргинальная вёрстка */}
        <div className="sp-frame" aria-hidden />
        <div className="sp-top"><span>SHADOWS HOLD POWER</span><s />&nbsp;COMMIT OR SLAM&nbsp;<s /><span>GROUND IS LAW</span></div>
        <div className="sp-col sp-l"><i>The crew</i>NO COMPS<br />NO REFEREES<br />NO EGO</div>
        <div className="sp-col sp-r"><i>The law</i>ROLL · FALL<br />ROLL AGAIN<br />UNTIL IT'S DARK</div>
        <div className="sp-side">Turn up alone — <em>leave with a crew.</em> Fridays, wherever the ground is smooth.</div>
        <div className="sp-glyph sp-g1">✶</div><div className="sp-glyph sp-g2">✶</div>
        <div className="sp-cue">drop in ↓</div>
        <div className="sp-strip" aria-hidden><span>SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · </span></div>
      </ParallaxScene>

      {/* S2 — THE SPOTS (foreground-parallax · undercroft) */}
      <ParallaxScene heightVh={270} className="fs-scene f2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -16, color: "#0e1014" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="f2-bg">
          <SceneMedia src={`${A}/undercroftbg.jpg`} />
        </Layer>
        <div className="f2-scan" aria-hidden />
        <div className="f2-veil" aria-hidden />
        <Layer z={9} depth={0.72} from={{ y: "-2vh", scale: 1.05 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="f2-fg">
          <SceneMedia src={`${A}/graffitifg.jpg`} />
        </Layer>
        <div className="f2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="f2-copy">
          <span className="fs-eyebrow">01 — the spots</span>
          <h2>Wherever the<br /><em>ground's smooth.</em></h2>
          <p>Flatground, ledges, whatever the city gives us. Bring a board, bring a phone for clips, or bring nothing and just watch.</p>
        </Layer>
        <div className="f2-spots">
          <div className="f2-spot"><b>South Bank</b><span>flatground</span></div>
          <div className="f2-spot"><b>The Undercroft</b><span>ledges &amp; rails</span></div>
          <div className="f2-spot"><b>The Plaza</b><span>stairs &amp; gaps</span></div>
        </div>
      </ParallaxScene>

      {/* S3 — THE CLIPS (flying VHS stills · cards+motion) */}
      <ParallaxScene heightVh={280} className="fs-scene f3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0e1014" }}>
        <div className="f3-bg" aria-hidden />
        <div className="f3-scanbg" aria-hidden />
        {/* видео-плеер: главный клип с RGB-split + скан-линии, миниатюры снизу · chromatic-glitch */}
        <Layer z={5} depth={0.3} phase={[0.04, 0.4]} from={{ scale: 0.94, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="f3-screen-l">
          <div className="f3-screen">
            <img className="f3-rgb f3-r" src={`${A}/g1.jpg`} alt="" />
            <img className="f3-rgb f3-c" src={`${A}/g1.jpg`} alt="" />
            <SceneMedia src={`${A}/g1.jpg`} />
            <div className="f3-scan" aria-hidden />
            <div className="f3-hud"><i />REC · 00:12 · KICKFLIP</div>
            <div className="f3-scrub" aria-hidden><b /></div>
          </div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.16, 0.52]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="f3-thumbs">
          <div className="f3-thumb"><SceneMedia src={`${A}/g4.jpg`} /><b>00:31 · grind</b></div>
          <div className="f3-thumb"><SceneMedia src={`${A}/g2.jpg`} /><b>00:48 · plaza</b></div>
          <div className="f3-thumb"><SceneMedia src={`${A}/g5.jpg`} /><b>01:03 · crew</b></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="f3-copy">
          <span className="fs-eyebrow">02 — the clips</span>
          <h2>Landed, <em>not lucky.</em></h2>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE SESSIONS (schedule stamps · data) */}
      <ParallaxScene heightVh={250} className="fs-scene f4-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#0e1014" }}>
        <div className="f4-bg" aria-hidden />
        <div className="f4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="f4-head">
          <span className="fs-eyebrow">03 — the sessions</span><h2>Every week, rain permitting.</h2>
        </Layer>
        {/* сессии «расфокус→в фокус»: RGB-split сходится по мере активации (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="f4-boardL">
          <div className="f4-board">
            <div className="f4-sess" style={{ ["--thr" as string]: 0.04 }}><time>FRI · 19:00</time><b>South Bank</b><s>flatground · all levels</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.20 }}><time>SUN · 11:00</time><b>The Undercroft</b><s>ledges &amp; rails</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.36 }}><time>WED · 18:30</time><b>Beginners' Roll</b><s>first ollie welcome</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.52 }}><time>LAST SAT</time><b>Game of S.K.A.T.E.</b><s>bring your best trick</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE WORD (reviews as marker on the wall · char) */}
      <ParallaxScene heightVh={270} className="fs-scene f5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: 13, color: "#08090c" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="f5-bg">
          <SceneMedia src={`${A}/wallbg.jpg`} />
        </Layer>
        <div className="f5-veil" aria-hidden />
        <div className="f5-eyebrow">the word</div>
        {/* граффити-теги крю на стене: наляпаны под углом · spray-slap */}
        <Layer z={6} depth={0.3} phase={[0.05, 0.4]} from={{ scale: 1.08, rotate: "-6deg", opacity: 0 }} to={{ scale: 1, rotate: "-3deg", opacity: 1 }} className="f5-tag f5-t1">
          <div><p>Turned up alone,<br />left with a crew.</p><cite>@nollie_nat · beginners' roll</cite></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.17, 0.52]} from={{ scale: 1.08, rotate: "5deg", opacity: 0 }} to={{ scale: 1, rotate: "2deg", opacity: 1 }} className="f5-tag f5-t2">
          <div><p>No refs,<br />no comps, no ego.</p><cite>Deshawn K. · regular</cite></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.29, 0.64]} from={{ scale: 1.08, rotate: "-4deg", opacity: 0 }} to={{ scale: 1, rotate: "-1.5deg", opacity: 1 }} className="f5-tag f5-t3">
          <div><p>Shot on a cracked phone.<br />That's the whole vibe.</p><cite>@sessionclips · filmer</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — DROP IN (giant type + CTA · bg+text) */}
      <ParallaxScene heightVh={240} className="fs-scene f6-scene">
        <div className="f6-bg" aria-hidden />
        <div className="f6-scan" aria-hidden />
        <Layer z={5} depth={0.32} phase={[0.02, 0.5]} from={{ x: "-8vw", rotate: "-3deg", scale: 1.08, opacity: 0 }} to={{ x: "0vw", rotate: "0deg", scale: 1, opacity: 1 }} className="f6-title"><span>DROP IN.</span></Layer>
        <div className="f6-cta">
          <p>Fridays, 7pm, wherever the ground's smooth. Follow for the spot drop.</p>
          <a href="#" onClick={stop} className="fs-btn">Join a session <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="fs-foot">
        <div className="fs-foot-top"><b>SESSION</b><p>An open skate crew. No comps, no refs, just the session.</p></div>
        <div className="fs-foot-legal"><span>SESSION skate crew</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
