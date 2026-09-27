"use client";
/* Концепт 06 — ECOLOGY «VERDA». Held-world: стеклянная капсула с лесом внутри. Тёмный sage-green, чистый lowercase-sans, парящая капсула, листья-fg. Типо-персона: light humanist sans.
   v2 (аудит 2026-09): hero собран и живёт (туман плывёт, папоротник качается, в куполе дышит луч).
   Капсула — сквозной актёр: в тумане → парит над «локацией»-долиной (S2) → фонарь над растущим участком (S3) →
   на стекле растёт уровень 94% (S4) → отзывы-этикетки вокруг неё (S5) → стекло лопается, и лес заливает кадр (S6).
   Фон как сюжет роста: каждая сцена светлее и зеленее (Atmosphere), тёмные вуали убраны.
   Стыки: «листва» ×2 (папоротник переднего плана проходит через шов синхронно с маской), «капсула лопается» (эллипс-колба), остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Atmosphere, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./ecology.css";

const A = "/uploads/1/hooks/sites/anim/ecology";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 280, s4: 270, s5: 270, s6: 260 };
const OV = 60;
// начало и конец перекрытия сцены (для синхронного прохода листвы через шов)
const ovIn = (sel: string, h: number) => at(sel, h, 0);
const ovOut = (sel: string, h: number) => at(sel, h, OV / (h - 100));

export function EcologySite() {
  return (
    <div className="ec-site">
      <Atmosphere stops={[
        { at: ".ec-hero", color: "#16211a", color2: "#101812" },
        { at: ".ec3-scene", color: "#1f3226", color2: "#15231a" },
        { at: ".ec4-scene", color: "#2a4632", color2: "#1c3022" },
        { at: ".ec5-scene", color: "#365a3e", color2: "#24402b" },
        { at: ".ec6-scene", color: "#44704c", color2: "#2e5236" },
      ]} />
      {/* уровень на стекле (S4): --level 0→0.94 и целое --lvl для подписи */}
      <Follow stops={[{ ...at(".ec4-scene", H.s4, 0.08), vars: { "--level": 0 } }, { ...at(".ec4-scene", H.s4, 0.56), vars: { "--level": 0.94 } }]} />
      <Follow round stops={[{ ...at(".ec4-scene", H.s4, 0.08), vars: { "--lvl": 0 } }, { ...at(".ec4-scene", H.s4, 0.56), vars: { "--lvl": 94 } }]} />
      <Weather kind="leaves" count={12} color="#6f9a58" color2="#a6d585" world={0.5} wind={0.7} zIndex={26} seed={5} />

      {/* АКТЁР — стеклянная капсула с лесом */}
      <Actor width="42vw" zIndex={30} bob={7} tilt={0.04} className="ec-actor" stops={[
        { ...at(".ec-hero", H.hero, 0), pose: { x: 50, y: 64, s: 1, r: -2 } },
        { ...at(".ec-hero", H.hero, 0.6), pose: { x: 50, y: 60, s: 1.04, r: 2 } },
        { ...at(".ec2-scene", H.s2, 0.34), pose: { x: 71, y: 46, s: 0.6, r: 4 } },
        { ...at(".ec2-scene", H.s2, 0.64), pose: { x: 71, y: 43, s: 0.62, r: -3 } },
        { ...at(".ec3-scene", H.s3, 0.3), pose: { x: 85, y: 33, s: 0.42, r: 6 } },
        { ...at(".ec3-scene", H.s3, 0.64), pose: { x: 85, y: 31, s: 0.42, r: -4 } },
        { ...at(".ec4-scene", H.s4, 0.08), pose: { x: 50, y: 42, s: 0.78, r: 0 } },
        { ...at(".ec4-scene", H.s4, 0.62), pose: { x: 50, y: 42, s: 0.78, r: 0 } },
        { ...at(".ec5-scene", H.s5, 0.3), pose: { x: 50, y: 40, s: 0.52, r: 0 } },
        { ...at(".ec5-scene", H.s5, 0.62), pose: { x: 50, y: 40, s: 0.52, r: 0 } },
        { ...at(".ec6-scene", H.s6, 0.04), pose: { x: 50, y: 41, s: 0.62, r: 0, o: 1 } },
        { ...at(".ec6-scene", H.s6, 0.3), pose: { x: 50, y: 41, s: 2.4, r: 0, o: 0, blur: 8 } },
      ]}>
        <div className="ec-cap">
          <img src={`${A}/capsule-cut.png`} alt="" draggable={false} />
          <i className="ec-cap-beam" />
          <i className="ec-cap-level"><b /></i>
          <span className="ec-cap-pct" />
        </div>
      </Actor>
      {/* ЛИСТВА НА ШВАХ — папоротник переднего плана проходит через стык ровно за время перекрытия (синхронно с маской сцены) */}
      <Actor src={`${A}/leaves-cut.png`} width="118vw" zIndex={31} bob={0} tilt={0} className="ec-fern-wipe" stops={[
        { ...at(".ec-hero", H.hero, 0), pose: { x: 50, y: 150, s: 1, r: 0, o: 0 } },
        { ...ovIn(".ec2-scene", H.s2), pose: { x: 46, y: 117.5, s: 1, r: -6, o: 1, blur: 3 } },
        { ...ovOut(".ec2-scene", H.s2), pose: { x: 54, y: -12.5, s: 1.1, r: 4, o: 1, blur: 3 } },
        { ...at(".ec2-scene", H.s2, 0.4), pose: { x: 54, y: -40, s: 1.1, r: 4, o: 0 } },
        { ...at(".ec3-scene", H.s3, 0.9), pose: { x: 54, y: 150, s: 1, r: 8, o: 0 } },
        { ...ovIn(".ec4-scene", H.s4), pose: { x: 56, y: 117.5, s: 1, r: 8, o: 1, blur: 3 } },
        { ...ovOut(".ec4-scene", H.s4), pose: { x: 46, y: -12.5, s: 1.1, r: -4, o: 1, blur: 3 } },
        { ...at(".ec4-scene", H.s4, 0.42), pose: { x: 46, y: -40, s: 1.1, r: -4, o: 0 } },
      ]} />

      <header className="ec-head">
        <Link href="/visual-hooks" className="ec-brand">VERDA</Link>
        <nav className="ec-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Forests</a>
          <a href="#" onClick={stop}>Impact</a><a href="#" onClick={stop} className="ec-plant">Plant a forest</a>
        </nav>
      </header>

      {/* HERO — собран при загрузке: туман, капсула с лучом, «forest.», папоротник */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="ec-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="ec-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="ec-blobs" aria-hidden />
        <div className="ec-mist" aria-hidden />

        <Layer z={12} phase={[0.76, 0.84]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="ec-exit">
          <Layer depth={0.55} phase={[0, 0.22]} from={{ y: "1vh", opacity: 0 }} to={{ y: "-4vh", opacity: 1 }} cursor={{ x: 18, y: 22 }} className="ec-word">
            <div><b>forest.</b><span>grown in your name</span></div>
          </Layer>
          <Layer depth={0.18} phase={[0.04, 0.26]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ec-copy">
            <div>
              <span className="ec-eyebrow">01 — reforestation</span>
              <p>Fund a real, mapped forest — native species, planted and monitored for thirty years. You get the coordinates. The trees do the rest.</p>
            </div>
          </Layer>
        </Layer>

        <Layer z={8} depth={1} phase={[0, 1]} from={{ y: "-6vh", x: "-3vw", rotate: "-6deg" }} to={{ y: "6vh", x: "2vw", rotate: "5deg" }} cursor={{ x: 46, y: 32 }} fit="contain" className="ec-leaves">
          <SceneMedia src={`${A}/leaves-cut.png`} />
        </Layer>
        <div className="ec-grain" aria-hidden />

        <div className="ec-label ec-tr">46°N · 8°E<br />ALPINE NATIVE</div>
        <div className="ec-label ec-bl"><b>38,000</b><span>trees in the ground</span></div>
        <div className="ec-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — HOW IT GROWS: папоротник проходит — за ним уже «локация» (долина), капсула парит над ней */}
      <ParallaxScene heightVh={H.s2} overlapVh={OV} parallax={10} className="ec-scene ec2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.12 }} to={{ y: "-2vh", scale: 1.04 }} cursor={{ x: -4, y: -3 }} className="ec2-bg">
          <SceneMedia src={`${A}/g4.jpg`} alt="A river valley where the forest is planted" />
        </Layer>
        <div className="ec2-veil" aria-hidden />
        <Layer z={9} depth={0.82} from={{ y: "-2vh", x: "2vw", rotate: "3deg" }} to={{ y: "2vh", x: "-2vw", rotate: "-2deg" }} cursor={{ x: 28, y: 15 }} className="ec2-fg">
          <SceneMedia src={`${A}/leaves-cut.png`} />
        </Layer>
        <Layer z={12} phase={[0.6, 0.68]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="ec-exit">
          <Layer depth={0.24} phase={[0.1, 0.32]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ec2-copy">
            <span className="ec-eyebrow">01 — how it grows</span>
            <h2>a forest with<br /><em>a location.</em></h2>
            <p>We plant native species where they belong, geotag every stand, and send you the map. Thirty years of monitoring, one forest that outlives the gesture.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S3 — THIRTY-YEAR PLOT: стадии растут вдоль базовой линии, капсула — фонарь над участком */}
      <ParallaxScene heightVh={H.s3} overlapVh={OV} parallax={8} className="ec-scene ec3-scene">
        <div className="ec3-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.05 }} to={{ y: "-2vh", scale: 1.1 }} className="ec3-fog">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="ec3-ground" aria-hidden />
        {/* стадии роста участка вдоль базовой линии: Y1→Y30, растут из земли слева-направо */}
        <Layer z={5} depth={0.4} phase={[0, 0.16]} from={{ x: "-33vw", y: "-14vh", scale: 0.7, opacity: 0 }} to={{ x: "-33vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="ec3-slot">
          <div className="ec3-stage ec3-g1"><SceneMedia src={`${A}/g2.jpg`} /><b>Y1</b><span>planted by hand</span></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.04, 0.2]} from={{ x: "-12vw", y: "-14vh", scale: 0.7, opacity: 0 }} to={{ x: "-12vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 12, y: 7 }} className="ec3-slot">
          <div className="ec3-stage ec3-g2"><SceneMedia src={`${A}/g5.jpg`} /><b>Y5</b><span>first canopy</span></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.08, 0.24]} from={{ x: "10vw", y: "-14vh", scale: 0.7, opacity: 0 }} to={{ x: "10vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 14, y: 8 }} className="ec3-slot">
          <div className="ec3-stage ec3-g3"><SceneMedia src={`${A}/g4.jpg`} /><b>Y15</b><span>the river returns</span></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.12, 0.28]} from={{ x: "32vw", y: "-14vh", scale: 0.7, opacity: 0 }} to={{ x: "32vw", y: "-20vh", scale: 1, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="ec3-slot">
          <div className="ec3-stage ec3-g4"><SceneMedia src={`${A}/g1.jpg`} /><b>Y30</b><span>old-growth canopy</span></div>
        </Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="ec-exit">
          <Layer depth={0.22} phase={[0.08, 0.28]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ec3-copy">
            <span className="ec-eyebrow">02 — thirty-year plot</span>
            <h2>Watch a plot <em>grow up.</em></h2>
            <p>Native species, planted and monitored — thirty years, one forest that outlives the gesture.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE IMPACT: листва снова проходит через шов; на стекле капсулы растёт уровень 94% */}
      <ParallaxScene heightVh={H.s4} overlapVh={OV} parallax={8} className="ec-scene ec4-scene">
        <div className="ec4-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.1 }} to={{ y: "-2vh", scale: 1.16 }} className="ec4-fog">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="ec-exit">
          <Layer depth={0.22} phase={[0.02, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ec4-head">
            <span className="ec-eyebrow">03 — the impact</span>
          </Layer>
          <Layer depth={0.3} phase={[0.02, 0.56]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="ec4-stats">
            <div className="ec4-stat" style={{ ["--thr" as string]: 0.04 }}><b>2.4m</b><h4>trees, geotagged</h4><s>every stand mapped — find the one that&apos;s yours</s></div>
            <div className="ec4-stat" style={{ ["--thr" as string]: 0.2 }}><b>30<i>yr</i></b><h4>of monitoring</h4><s>one payment, three decades of care</s></div>
            <div className="ec4-stat" style={{ ["--thr" as string]: 0.36 }}><b>94<i>%</i></b><h4>survival rate</h4><s>native species, planted to live, not to count</s></div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S5 — FROM THE GROUND: отзывы-этикетки вокруг капсулы (geotag · pin-drop) */}
      <ParallaxScene heightVh={H.s5} overlapVh={OV} className="ec-scene ec5-scene">
        <div className="ec5-bg" aria-hidden />
        <div className="ec5-mapbg" aria-hidden />
        <div className="ec5-eyebrow">from the ground · monitored plots</div>
        <Layer z={6} depth={0.3} phase={[0.02, 0.2]} from={{ x: "-31vw", y: "-12vh", opacity: 0 }} to={{ x: "-31vw", y: "-4vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>46.21°N · 8.14°E</i><p>We offset the company, then visited the stand. My kids named a tree.</p><b>Lena F. · founder</b></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.08, 0.26]} from={{ x: "0vw", y: "14vh", opacity: 0 }} to={{ x: "0vw", y: "26vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>44.72°N · 7.36°E</i><p>The geotag and the yearly photos sold me. It&apos;s real, and I can prove it.</p><b>Omar S. · sustainability lead</b></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.14, 0.32]} from={{ x: "31vw", y: "-12vh", opacity: 0 }} to={{ x: "31vw", y: "-4vh", opacity: 1 }} className="ec5-note">
          <div className="ec5-card"><i>45.08°N · 6.92°E</i><p>Gave a forest for a wedding gift. Best thing we&apos;ve ever given.</p><b>Priya &amp; Jon · members</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — GROW A FOREST: стекло лопается — лес заливает кадр из колбы */}
      <ParallaxScene heightVh={H.s6} overlapVh={OV} parallax={8} className="ec-scene ec6-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.16 }} to={{ y: "2vh", scale: 1.06 }} className="ec6-forest">
          <SceneMedia src={`${A}/g1.jpg`} alt="A misty old-growth forest canopy" />
        </Layer>
        <div className="ec6-bg" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.1, 0.42]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="ec6-copy">
          <span className="ec-eyebrow">plant</span>
          <h2>grow a<br /><em>forest.</em></h2>
        </Layer>
        <div className="ec6-cta">
          <p>One forest, in your name or someone else&apos;s. Coordinates arrive by email.</p>
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
