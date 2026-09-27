"use client";
/* Концепт 23 — FREESTYLE «SESSION». Фристайл-скейт крю / сессии. Near-black + red/cyan, RGB-split приём: красная и циан копии скейтера со смещением + mix-blend screen (глитч-хроматика) за чётким скейтером, chromatic text-shadow на kinetic italic-титуле SESSION, скан-линии. Типо-персона: Bricolage 800 skew + DM Mono. Hero-приём: RGB-split / chromatic. Отличие от dance (монохром motion-trail).
   Сквозная архитектура (аудит 2026-09): актёр — скейтер с доской (skater-cut, ч/б) через ВСЕ сцены: прыжок в hero →
   катится под мостом → трюк раскладывается покадрово (стробо-копии, Follow --strobe) → грайнд по строкам расписания,
   как по перилам → вдоль стены → приземляется на «DROP IN.» (объект финала). S4 — постер на ночной стене (а не светлый экран).
   Стыки: S1→S2 и S4→S5 — рваный постер (кадр отрывается по кромке, белое волокно бумаги рисует уходящая сцена);
   S2→S3, S3→S4, S5→S6 — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere, Follow } from "@/components/scene-kit";
import "./freestyle.css";

const A = "/uploads/1/hooks/sites/anim/freestyle";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function FreestyleSite() {
  return (
    <div className="fs-site fs-poster">
      <Atmosphere stops={[
        { at: ".f3-scene", color: "#14161b", anchor: 0.5 },
        { at: ".f6-scene", color: "#141a22", anchor: 0.5 },
      ]} />
      {/* АКТЁР — скейтер через весь сайт */}
      <Actor className="fs-sk-actor" width="31vw" zIndex={23} bob={4} tilt={0.06} stops={[
        { at: ".sp-hero", anchor: 0.18, pose: { x: 50, y: 46, s: 1, r: 0 } },
        { at: ".sp-hero", anchor: 0.55, pose: { x: 53, y: 38, s: 1.06, r: 8 } },
        { at: ".f2-scene", anchor: 0.52, pose: { x: 66, y: 56, s: 0.5, r: -4 } },
        { at: ".f3-scene", anchor: 0.5, pose: { x: 84, y: 50, s: 0.5, r: 12 } },
        { at: ".f4-scene", anchor: 0.38, pose: { x: 25, y: 35, s: 0.36, r: -10 } },
        { at: ".f4-scene", anchor: 0.64, pose: { x: 75, y: 66, s: 0.36, r: -18 } },
        { at: ".f5-scene", anchor: 0.52, pose: { x: 80, y: 25, s: 0.42, r: 10 } },
        { at: ".f6-scene", anchor: 0.52, pose: { x: 72, y: 29, s: 0.6, r: -6 } },
        { at: ".fs-foot", anchor: 0.2, pose: { x: 72, y: 8, s: 0.6, r: -6, o: 0 } },
      ]}>
        <img className="fs-ghost fs-g2" src={`${A}/skater-cut.png`} alt="" draggable={false} />
        <img className="fs-ghost fs-g1" src={`${A}/skater-cut.png`} alt="" draggable={false} />
        <img className="fs-sk" src={`${A}/skater-cut.png`} alt="" draggable={false} />
      </Actor>
      <Follow target=".fs-sk-actor" stops={[
        { at: ".f2-scene", anchor: 0.7, vars: { "--strobe": 0 } },
        { at: ".f3-scene", anchor: 0.45, vars: { "--strobe": 1 } },
        { at: ".f3-scene", anchor: 0.62, vars: { "--strobe": 1 } },
        { at: ".f4-scene", anchor: 0.3, vars: { "--strobe": 0 } },
      ]} />
      <svg className="sp-defs" aria-hidden><filter id="sp-erode"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.055" numOctaves="2" seed="9" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
      <header className="fs-head">
        <Link href="/visual-hooks" className="fs-brand">SESSION</Link>
        <nav className="fs-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Spots</a><a href="#" onClick={stop}>Crew</a>
          <a href="#" onClick={stop}>Clips</a><a href="#" onClick={stop} className="fs-join">Join a session</a>
        </nav>
      </header>

      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={8} className="fs-hero sp-hero">
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="sp-bg">
          <SceneMedia src={`${A}/paperbg.jpg`} />
        </Layer>
        <div className="sp-wash" aria-hidden />

        {/* гигантский битый титул */}
        <Layer z={3} depth={0.3} phase={[0.02, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "-1vh", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="sp-title">
          <span>SESSION</span>
        </Layer>

        {/* скейтер — актёр (fixed), здесь его прыжок */}
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
        <div className="sp-fiber" aria-hidden />
        <div className="sp-strip" aria-hidden><span>SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · SESSION · </span></div>
      </ParallaxScene>

      {/* S2 — THE SPOTS (foreground-parallax · undercroft) */}
      <ParallaxScene heightVh={300} overlapVh={90} parallax={10} className="fs-scene f2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="f2-bg">
          <SceneMedia src={`${A}/undercroftbg.jpg`} />
        </Layer>
        <div className="f2-scan" aria-hidden />
        <div className="f2-veil" aria-hidden />
        <Layer z={9} depth={0.72} from={{ y: "-2vh", scale: 1.05 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="f2-fg">
          <SceneMedia src={`${A}/graffitifg.jpg`} />
        </Layer>
        <div className="f2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.36, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="f2-copy">
          <span className="fs-eyebrow">01 — the spots</span>
          <h2>Wherever the<br /><em>ground's smooth.</em></h2>
          <p>Flatground, ledges, whatever the city gives us. Bring a board, bring a phone for clips, or bring nothing and just watch.</p>
        </Layer>
        <Layer z={16} depth={0.3} phase={[0.4, 0.52]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }}>
          <div className="f2-spots">
            <div className="f2-spot"><b>South Bank</b><span>flatground</span></div>
            <div className="f2-spot"><b>The Undercroft</b><span>ledges &amp; rails</span></div>
            <div className="f2-spot"><b>The Plaza</b><span>stairs &amp; gaps</span></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE CLIPS (flying VHS stills · cards+motion) */}
      <ParallaxScene heightVh={290} overlapVh={60} parallax={10} className="fs-scene f3-scene">
        <div className="f3-bg" aria-hidden />
        <div className="f3-scanbg" aria-hidden />
        {/* видео-плеер: главный клип с RGB-split + скан-линии, миниатюры снизу · chromatic-glitch */}
        <Layer z={5} depth={0.3} phase={[0.04, 0.3]} from={{ scale: 0.94, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="f3-screen-l">
          <div className="f3-screen">
            <img className="f3-rgb f3-r" src={`${A}/g1.jpg`} alt="" />
            <img className="f3-rgb f3-c" src={`${A}/g1.jpg`} alt="" />
            <SceneMedia src={`${A}/g1.jpg`} />
            <div className="f3-scan" aria-hidden />
            <div className="f3-hud"><i />REC · 00:12 · KICKFLIP</div>
            <div className="f3-scrub" aria-hidden><b /></div>
          </div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.1, 0.34]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="f3-thumbs">
          <div className="f3-thumb"><SceneMedia src={`${A}/g4.jpg`} /><b>00:31 · grind</b></div>
          <div className="f3-thumb"><SceneMedia src={`${A}/g2.jpg`} /><b>00:48 · plaza</b></div>
          <div className="f3-thumb"><SceneMedia src={`${A}/g5.jpg`} /><b>01:03 · crew</b></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.26, 0.38]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="f3-copy">
          <span className="fs-eyebrow">02 — the clips</span>
          <h2>Landed, <em>not lucky.</em></h2>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE SESSIONS (schedule stamps · data) */}
      <ParallaxScene heightVh={300} overlapVh={60} parallax={8} className="fs-scene f4-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.12 }} to={{ y: "2vh", scale: 1.04 }} className="f4-night"><SceneMedia src={`${A}/bg.jpg`} /></Layer>
        <div className="f4-nveil" aria-hidden />
        <Layer z={2} depth={0.2} phase={[0.02, 0.26]} from={{ y: "5vh", rotate: "-4deg", scale: 0.96, opacity: 0 }} to={{ y: "0vh", rotate: "-1.2deg", scale: 1, opacity: 1 }} className="f4-posterL">
          <div className="f4-poster"><div className="f4-bg" /><div className="f4-grain" /><i className="f4-tape f4-ta" /><i className="f4-tape f4-tb" /></div>
        </Layer>
        <div className="f4-fiber" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.24, 0.36]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="f4-head">
          <span className="fs-eyebrow">03 — the sessions</span><h2>Every week, rain permitting.</h2>
        </Layer>
        {/* сессии «расфокус→в фокус»: RGB-split сходится по мере активации (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.26, 0.66]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="f4-boardL">
          <div className="f4-board">
            <div className="f4-sess" style={{ ["--thr" as string]: 0.04 }}><time>FRI · 19:00</time><b>South Bank</b><s>flatground · all levels</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.20 }}><time>SUN · 11:00</time><b>The Undercroft</b><s>ledges &amp; rails</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.36 }}><time>WED · 18:30</time><b>Beginners' Roll</b><s>first ollie welcome</s></div>
            <div className="f4-sess" style={{ ["--thr" as string]: 0.52 }}><time>LAST SAT</time><b>Game of S.K.A.T.E.</b><s>bring your best trick</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE WORD (reviews as marker on the wall · char) */}
      <ParallaxScene heightVh={310} overlapVh={90} parallax={10} className="fs-scene f5-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="f5-bg">
          <SceneMedia src={`${A}/wallbg.jpg`} />
        </Layer>
        <div className="f5-veil" aria-hidden />
        <Layer z={16} depth={0} phase={[0.36, 0.46]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="f5-eyebrow">the word</div></Layer>
        {/* граффити-теги крю на стене: наляпаны под углом · spray-slap */}
        <Layer z={6} depth={0.3} phase={[0.36, 0.48]} from={{ scale: 1.14, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "-3deg", opacity: 1 }} className="f5-tag f5-t1">
          <div><p>Turned up alone,<br />left with a crew.</p><cite>@nollie_nat · beginners' roll</cite></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.4, 0.52]} from={{ scale: 1.14, rotate: "7deg", opacity: 0 }} to={{ scale: 1, rotate: "2deg", opacity: 1 }} className="f5-tag f5-t2">
          <div><p>No refs,<br />no comps, no ego.</p><cite>Deshawn K. · regular</cite></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.44, 0.56]} from={{ scale: 1.14, rotate: "-6deg", opacity: 0 }} to={{ scale: 1, rotate: "-1.5deg", opacity: 1 }} className="f5-tag f5-t3">
          <div><p>Shot on a cracked phone.<br />That's the whole vibe.</p><cite>@sessionclips · filmer</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — DROP IN (giant type + CTA · bg+text) */}
      <ParallaxScene heightVh={260} overlapVh={60} parallax={8} className="fs-scene f6-scene">
        <div className="f6-bg" aria-hidden />
        <Layer z={1} depth={0.1} from={{ scale: 1.12 }} to={{ y: "2vh", scale: 1.03 }} className="f6-crew"><SceneMedia src={`${A}/g5.jpg`} alt="The crew sitting on a ledge at night" /></Layer>
        <div className="f6-veil" aria-hidden />
        <div className="f6-scan" aria-hidden />
        <Layer z={5} depth={0.32} phase={[0.26, 0.42]} from={{ x: "-8vw", rotate: "-3deg", scale: 1.08, opacity: 0 }} to={{ x: "0vw", rotate: "0deg", scale: 1, opacity: 1 }} className="f6-title"><span>DROP IN.</span></Layer>
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
