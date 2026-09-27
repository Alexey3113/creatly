"use client";
/* Концепт 02 — SKYDIVE «SKYFALL». Сюрреал teal-grey: портал-круг с перевёрнутым горным миром, крошечная падающая фигура, пики-foreground, туман. Типо-персона: разрежённый light-grotesk.
   v2 (аудит 2026-09): вся страница — ОДНО падение. Альтиметр 4000→0 закреплён (Follow), парашютист — сквозной актёр:
   выпадает из портала → летит сквозь облака рядом с формацией (S2) → сам работает маркером на ленте высот (S3) →
   раскрывает купол (S4) → приземляется к журналу прыжков (S5) → портал над ним в финале.
   Фон — сюжет спуска: небо → облака → пики → побережье → дропзона. Стыки: «сквозь облако» ×2, «портал» (ирис), остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./skydive.css";

const A = "/uploads/1/hooks/sites/anim/skydive";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 300, s4: 280, s5: 280, s6: 260 };
// лента высот S3: верх 27vh, длина 58vh (4000 м → земля)
const tapeY = (alt: number) => 27 + 58 * (1 - alt / 4000);

// одна траектория на всё падение: высота, купол и поза парашютиста на общих якорях
const PATH = [
  { a: at(".sd-hero", H.hero, 0), alt: 4000, canopy: 0, pose: { x: 50, y: 40, s: 0.62, r: 0 } },
  { a: at(".sd-hero", H.hero, 0.6), alt: 3900, canopy: 0, pose: { x: 50, y: 60, s: 1, r: 8 } },
  { a: at(".sd2-scene", H.s2, 0.12), alt: 3500, canopy: 0, pose: { x: 56, y: 50, s: 1.6, r: -6 } },
  { a: at(".sd2-scene", H.s2, 0.42), alt: 3100, canopy: 0, pose: { x: 68, y: 40, s: 2.1, r: 10 } },
  { a: at(".sd2-scene", H.s2, 0.7), alt: 2700, canopy: 0, pose: { x: 66, y: 46, s: 2.1, r: -4 } },
  { a: at(".sd3-scene", H.s3, 0.12), alt: 2500, canopy: 0, pose: { x: 26.9, y: tapeY(2500), s: 0.42, r: 0 } },
  { a: at(".sd3-scene", H.s3, 0.62), alt: 1400, canopy: 0, pose: { x: 26.9, y: tapeY(1400), s: 0.42, r: 0 } },
  { a: at(".sd4-scene", H.s4, 0.14), alt: 1300, canopy: 1, pose: { x: 78, y: 44, s: 1.25, r: 0 } },
  { a: at(".sd4-scene", H.s4, 0.66), alt: 900, canopy: 1, pose: { x: 76, y: 50, s: 1.25, r: 0 } },
  { a: at(".sd5-scene", H.s5, 0.2), alt: 400, canopy: 1, pose: { x: 86, y: 62, s: 1.05, r: 0 } },
  { a: at(".sd5-scene", H.s5, 0.62), alt: 0, canopy: 1, pose: { x: 88, y: 76, s: 1, r: 0 } },
  { a: at(".sd6-scene", H.s6, 0.2), alt: 0, canopy: 0, pose: { x: 50, y: 83, s: 0.72, r: 0 } },
  { a: at(".sd6-scene", H.s6, 0.9), alt: 0, canopy: 0, pose: { x: 50, y: 83, s: 0.72, r: 0 } },
];

export function SkydiveSite() {
  return (
    <div className="sd-site">
      <Follow round stops={PATH.map((p) => ({ ...p.a, vars: { "--alt": p.alt } }))} />
      <Follow stops={PATH.map((p) => ({ ...p.a, vars: { "--canopy": p.canopy } }))} />
      {/* ЗАКРЕПЛЁННЫЙ АЛЬТИМЕТР — высота всего сайта */}
      <div className="sd-alt" aria-hidden><span>ALT</span><b className="sd-alt-num" /><span>M</span></div>
      <Weather kind="spores" count={22} color="#dfeee8" color2="#a9c9bd" world={1.3} wind={0.6} zIndex={26} seed={11} />
      {/* АКТЁР — парашютист (кроп центра вырезки: фигура занимает ≈4% канвы) + купол, раскрывается по --canopy */}
      <Actor width="7.5vw" zIndex={30} bob={5} tilt={0.05} className="sd-actor" stops={PATH.map((p) => ({ ...p.a, pose: p.pose }))}>
        <div className="sd-diver">
          <svg className="sd-canopy" viewBox="0 0 100 80" aria-hidden>
            <path d="M6 30 Q50 -6 94 30 L90 37 Q50 6 10 37 Z" fill="url(#sdc)" />
            <path d="M10 37 L50 78 M26 25 L50 78 M42 20 L50 78 M58 20 L50 78 M74 25 L50 78 M90 37 L50 78" stroke="rgba(226,236,232,.55)" strokeWidth=".5" fill="none" />
            <defs><linearGradient id="sdc" x1="0" x2="1"><stop offset="0" stopColor="#e7f1ec" /><stop offset=".5" stopColor="#bcd8cd" /><stop offset="1" stopColor="#e7f1ec" /></linearGradient></defs>
          </svg>
          <div className="sd-diver-img"><img src={`${A}/figure-cut.png`} alt="" draggable={false} /></div>
        </div>
      </Actor>

      <header className="sd-head">
        <Link href="/visual-hooks" className="sd-brand">SKYFALL</Link>
        <nav className="sd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Jumps</a><a href="#" onClick={stop}>Locations</a>
          <a href="#" onClick={stop}>Training</a><a href="#" onClick={stop} className="sd-book">Book a jump</a>
        </nav>
      </header>

      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="sd-hero">
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "3vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="sd-sky">
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>

        <Layer z={3} depth={0.3} phase={[0, 1]} from={{ y: "-4vh", scale: 1 }} to={{ y: "-9vh", scale: 1.05 }} cursor={{ x: -14, y: -10 }} className="sd-portal">
          <div className="sd-disc"><img src={`${A}/mountains.jpg`} alt="" /></div>
        </Layer>

        <Layer z={7} depth={1} from={{ y: "10vh", scale: 1.1 }} to={{ y: "-5vh", scale: 1.18 }} cursor={{ x: 22, y: 12 }} position="center bottom" className="sd-peaks">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <div className="sd-fog" aria-hidden />

        <div className="sd-title">
          <h1>SKYFALL</h1>
          <span className="sd-sub">skydiving where the earth looks unreal</span>
        </div>
        <div className="sd-label sd-tr">N 46° · E 8°<br />THE ALPS</div>
        <div className="sd-label sd-bl"><b>01</b><span>the jump</span></div>
        <div className="sd-cue" aria-hidden>scroll to fall</div>
      </ParallaxScene>

      {/* S2 — SIXTY SECONDS: сквозь облако — к формации в облаках; парашютист крупно */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="sd-scene sd2-scene">
        <Layer z={1} depth={0.14} from={{ scale: 1.2, y: "4vh" }} to={{ y: "-4vh", scale: 1.1 }} cursor={{ x: -6, y: -4 }} className="sd2-bg">
          <SceneMedia src={`${A}/g5.jpg`} alt="A skydiving formation above the clouds" />
        </Layer>
        <div className="sd2-veil" aria-hidden />
        <Layer z={4} depth={0.9} from={{ y: "30vh", scale: 1.5 }} to={{ y: "-60vh", scale: 1.7 }} className="sd2-rush">
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>
        <Layer z={12} phase={[0.62, 0.7]} from={{ opacity: 1 }} to={{ opacity: 0 }} depth={0} className="sd-exit">
          <Layer depth={0.22} phase={[0.1, 0.32]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd2-copy">
            <span className="sd-eyebrow">01 — sixty seconds</span>
            <h2>Sixty seconds<br /><em>of free fall.</em></h2>
            <p>Tandem and solo jumps over the places most people only see from a plane window — alps, coastlines, deserts. No experience needed for your first fall.</p>
          </Layer>
        </Layer>
        <div className="sd-cloud" aria-hidden />
      </ParallaxScene>

      {/* S3 — THE FALL: под облаками — пики; маркер ленты высот = сам парашютист, ведёт общий --alt */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="sd-scene sd3-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "-2vh", scale: 1.22 }} className="sd3-photo">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <div className="sd3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0, 0.2]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sd3-word"><span>FALL</span></Layer>
        <Layer z={12} phase={[0.64, 0.72]} from={{ opacity: 1 }} to={{ opacity: 0 }} depth={0} className="sd-exit">
          <Layer depth={0.24} phase={[0.1, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd3-copy2">
            <span className="sd-eyebrow">02 — the fall</span>
            <h2>The way <em>down.</em></h2>
          </Layer>
          <Layer depth={0.36} phase={[0.04, 0.22]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd3-diveL">
            <div className="sd3-dive">
              <div className="sd3-tape">
                {[{ p: 0, a: "4,000" }, { p: 25, a: "3,000" }, { p: 50, a: "2,000" }, { p: 75, a: "1,000" }, { p: 100, a: "ground" }].map((t) => (
                  <span className="sd3-tick" key={t.p} style={{ top: `${t.p}%` }}>{t.a}</span>
                ))}
                <span className="sd3-trail" aria-hidden />
              </div>
              <div className="sd3-stages">
                <div className="sd3-stage" style={{ ["--thr" as string]: 4000 }}><SceneMedia src={`${A}/g1.jpg`} /><div><b>Exit</b><s>4,000 m · the door swings open</s></div></div>
                <div className="sd3-stage" style={{ ["--thr" as string]: 2600 }}><SceneMedia src={`${A}/g2.jpg`} /><div><b>Freefall</b><s>2,500 m · sixty seconds, 200 km/h</s></div></div>
                <div className="sd3-stage" style={{ ["--thr" as string]: 1500 }}><SceneMedia src={`${A}/g5.jpg`} /><div><b>Canopy</b><s>1,400 m · silence over the range</s></div></div>
                <div className="sd3-stage" style={{ ["--thr" as string]: 100 }}><SceneMedia src={`${A}/g4.jpg`} /><div><b>Landing</b><s>0 m · feet on the dropzone</s></div></div>
              </div>
            </div>
          </Layer>
        </Layer>
        <div className="sd-cloud sd-cloud-2" aria-hidden />
      </ParallaxScene>

      {/* S4 — HOW YOU JUMP: купол раскрыт, под ним — побережье */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="sd-scene sd4-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.04 }} to={{ y: "-2vh", scale: 1.16 }} className="sd4-photo">
          <SceneMedia src={`${A}/g4.jpg`} />
        </Layer>
        <div className="sd4-bg" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} from={{ opacity: 1 }} to={{ opacity: 0 }} depth={0} className="sd-exit">
          <Layer depth={0.22} phase={[0.02, 0.22]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sd4-head">
            <span className="sd-eyebrow">03 — how you jump</span><h2>Three ways <em>down.</em></h2>
          </Layer>
          {/* уровни «падают» сверху и встают на место (по --lp, последовательно) */}
          <Layer depth={0.3} phase={[0.04, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sd4-levelsL">
            <div className="sd4-levels">
              <div className="sd4-level" style={{ ["--thr" as string]: 0.02 }}><i>first fall</i><b>Tandem</b><s>strapped to an instructor — sixty seconds of freefall from 4,000 m</s></div>
              <div className="sd4-level" style={{ ["--thr" as string]: 0.2 }}><i>learn to solo</i><b>AFF course</b><s>accelerated freefall, seven levels to a licensed solo jump</s></div>
              <div className="sd4-level" style={{ ["--thr" as string]: 0.38 }}><i>licensed</i><b>Fun jumps</b><s>manifest for the next load — coastlines, alps and deserts</s></div>
            </div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE DOOR: дропзона ближе (то же побережье ×1.8), журнал прыжков */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="sd-scene sd5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.7 }} to={{ y: "-3vh", scale: 2.1 }} position="46% 72%" className="sd5-photo">
          <SceneMedia src={`${A}/g4.jpg`} />
        </Layer>
        <div className="sd5-bg" aria-hidden />
        <div className="sd5-eyebrow">from the door · jump log</div>
        <div className="sd5-loghdr" aria-hidden><span>jump</span><span>date · dz</span><span>alt</span><span>freefall</span><span>remarks</span></div>
        <Layer z={5} depth={0.3} phase={[0.02, 0.2]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg1">
          <div className="sd5-row">
            <span className="sd5-no">#001</span><span className="sd5-dt">12 MAR · Alps</span><span className="sd5-alt">4,000 m</span><span className="sd5-ff">0:52</span>
            <p className="sd5-rem">&ldquo;The plane door opened and my brain just stopped arguing. Best minute of my life.&rdquo; — Sofia L. · first tandem</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.1, 0.3]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg2">
          <div className="sd5-row">
            <span className="sd5-no">#047</span><span className="sd5-dt">04 JUL · Coast</span><span className="sd5-alt">4,200 m</span><span className="sd5-ff">0:58</span>
            <p className="sd5-rem">&ldquo;Calm instructors, endless patience, unreal views every load.&rdquo; — Tom R. · AFF graduate</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.2, 0.4]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sd5-log sd5-lg3">
          <div className="sd5-row">
            <span className="sd5-no">#613</span><span className="sd5-dt">21 SEP · Desert</span><span className="sd5-alt">4,000 m</span><span className="sd5-ff">1:04</span>
            <p className="sd5-rem">&ldquo;I&apos;ve jumped on four continents. The coastline exit here is the one I describe.&rdquo; — Nina P. · 600 jumps</p>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S6 — THE FIRST FALL: портал раскрывается ирисом над приземлившимся */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} className="sd-scene sd6-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: -5, y: -4 }} className="sd6-bg">
          <SceneMedia src={`${A}/sky.jpg`} />
        </Layer>
        <div className="sd6-veil" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0, 0.3]} from={{ scale: 0.94, opacity: 0.4 }} to={{ scale: 1.02, opacity: 1 }} cursor={{ x: 12, y: 9 }} className="sd6-portal">
          <SceneMedia src={`${A}/mountains.jpg`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.08, 0.34]} from={{ scale: 0.7, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sd6-copy">
          <span className="sd-eyebrow">book</span>
          <h2>Take the<br /><em>first fall.</em></h2>
        </Layer>
        <div className="sd6-cta">
          <p>Pick a place, pick a date. We handle the plane, the rig, and the landing.</p>
          <a href="#" onClick={stop} className="sd-btn">Book a jump <i>↗</i></a>
        </div>
        <div className="sd6-rim" aria-hidden />
      </ParallaxScene>

      <footer className="sd-foot">
        <div className="sd-foot-top"><b>SKYFALL</b><p>Free-fall over the world&apos;s most unreal places.</p></div>
        <div className="sd-foot-legal"><span>Skyfall Drop Zone</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
