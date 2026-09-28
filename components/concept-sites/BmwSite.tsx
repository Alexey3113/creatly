"use client";
/* Концепт 12 — BMW «M·WERK». Продажа/тест-драйв BMW M. Техно-точность: carbon-graphite + электрик-синий, blueprint-сетка, машина + spec-callouts (линии к деталям), aperture-скобы. Hero-приём: technical spec-dashboard. Типо-персона: heavy grotesk + mono.
   Сквозная архитектура (аудит 2026-09): hero собран в покое, по карбону бежит блик, световое пятно дышит.
   Актёр — M4 (одна вырезка, но разные роли/масштаб/кадр — путь, а не слайды): постер hero → разгон влево со смазом
   на вспышке фар → разворот, въезжает слева крупнее (S2) → снова разворот, основа взрыв-схемы (S3) → маленький
   blueprint-силуэт у спеков (S4) → низко слева, фара режет темноту к отзывам (S5) → уходит вправо с красным шлейфом (S6).
   Стыки: луч фары (S1→S2), скан-линия (S2→S3), красная вспышка redline (S5→S6); S3→S4, S4→S5 — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./bmw.css";

const A = "/uploads/1/hooks/sites/anim/bmw";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 280, H3 = 280, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a1 = mk(H1), a2 = mk(H2), a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);

export function BmwSite() {
  return (
    <div className="bm-site">
      <Actor src={`${A}/car-cut.png`} className="bm-carA" width="100vw" zIndex={30} bob={2} tilt={0.03} stops={[
        { at: ".bm-hero", anchor: a1(0.2), pose: { x: 50, y: 50, s: 0.98 } },
        { at: ".bm-hero", anchor: a1(0.62), pose: { x: 48, y: 51, s: 1 } },
        { at: ".bm-hero", anchor: a1(0.86), pose: { x: -34, y: 53, s: 1.04, blur: 10 } },
        { at: ".bm2-scene", anchor: a2(0.2), pose: { x: -40, y: 50, s: 0.82, o: 0, blur: 10 } },
        { at: ".bm2-scene", anchor: a2(0.22), pose: { x: -40, y: 36, s: 0.82, o: 0, fx: -1, blur: 8 } },
        { at: ".bm2-scene", anchor: a2(0.4), pose: { x: 60, y: 35, s: 0.82, fx: -1 } },
        { at: ".bm2-scene", anchor: a2(0.64), pose: { x: 62, y: 35, s: 0.84, fx: -1 } },
        { at: ".bm3-scene", anchor: a3(0.36), pose: { x: 50, y: 44, s: 0.46, fx: -1 }, m: { y: 56, s: 0.3 } },
        { at: ".bm3-scene", anchor: a3(0.66), pose: { x: 50, y: 44, s: 0.47, fx: -1 }, m: { y: 56, s: 0.3 } },
        { at: ".bm4-scene", anchor: a4(0.34), pose: { x: 17, y: 52, s: 0.3, fx: -1 }, m: { x: 50, y: 84, s: 0.4 } },
        { at: ".bm4-scene", anchor: a4(0.64), pose: { x: 17, y: 52, s: 0.3, fx: -1 }, m: { x: 50, y: 84, s: 0.4 } },
        { at: ".bm5-scene", anchor: a5(0.34), pose: { x: 16, y: 80, s: 0.5, fx: -1 }, m: { x: -40, y: 88, o: 0 } },
        { at: ".bm5-scene", anchor: a5(0.64), pose: { x: 16, y: 80, s: 0.5, fx: -1 }, m: { x: -40, y: 88, o: 0 } },
        { at: ".bm6-scene", anchor: a6(0.36), pose: { x: 64, y: 60, s: 0.52, fx: -1 } },
        { at: ".bm6-scene", anchor: a6(0.72), pose: { x: 72, y: 59, s: 0.54, fx: -1 } },
        { at: ".bm-foot", anchor: 0.2, pose: { x: 130, y: 58, s: 0.56, fx: -1, blur: 8 } },
      ]} />
      {/* в S4 машина становится blueprint-силуэтом */}
      <Follow stops={[
        { at: ".bm3-scene", anchor: a3(0.7), vars: { "--bp": 0 } },
        { at: ".bm4-scene", anchor: a4(0.34), vars: { "--bp": 1 } },
        { at: ".bm4-scene", anchor: a4(0.64), vars: { "--bp": 1 } },
        { at: ".bm5-scene", anchor: a5(0.3), vars: { "--bp": 0 } },
      ]} />
      <header className="bm-head">
        <Link href="/visual-hooks" className="bm-brand">M·WERK</Link>
        <nav className="bm-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The M4</a><a href="#" onClick={stop}>Configure</a>
          <a href="#" onClick={stop}>Finance</a><a href="#" onClick={stop} className="bm-drive">Book a test drive</a>
        </nav>
      </header>

      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={10} className="bm-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="bm-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="bm-grid" aria-hidden />
        <div className="bm-glow" aria-hidden />
        <div className="bm-glint" aria-hidden />

        <Layer z={3} depth={0.24} phase={[0, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "-1vh", opacity: 1 }} cursor={{ x: -10, y: -6 }} className="bm-title">
          <span className="bm-model">M4</span><span className="bm-comp">COMPETITION</span>
        </Layer>

        <div className="bm-grain" aria-hidden />

        {/* spec-callouts */}
        <Layer z={12} depth={0.14} phase={[0.04, 0.32]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="bm-specs">
          <div className="bm-spec bm-s1"><i /><b>510 PS</b><span>3.0L twin-turbo I6</span></div>
          <div className="bm-spec bm-s2"><i /><b>3.5 s</b><span>0–100 km/h · M xDrive</span></div>
          <div className="bm-spec bm-s3"><i /><b>CFRP</b><span>carbon roof &amp; seats</span></div>
          <div className="bm-spec bm-s4"><i /><b>290 km/h</b><span>M Driver's Package</span></div>
        </Layer>

        <div className="bm-ap bm-tl" /><div className="bm-ap bm-tr" /><div className="bm-ap bm-bl" /><div className="bm-ap bm-br" />
        <div className="bm-label bm-lt">TEST DRIVE · 2025</div>
        <div className="bm-label bm-lb"><b>01</b><span>the machine</span></div>
        <div className="bm-hud">SYSTEM · READY ● TRACK MODE</div>
        <div className="bm-cue" aria-hidden>book a drive</div>
      </ParallaxScene>

      {/* S2 — THE MACHINE (car + blueprint + spec-callouts · data/foreground) */}
      <ParallaxScene heightVh={H2} overlapVh={OV} className="bm-scene bm2-scene">
        <div className="bm2-bg" aria-hidden />
        <div className="bm2-lines" aria-hidden />
        <div className="bm2-num" aria-hidden>M</div>
        <div className="bm2-grain" aria-hidden />
        <Layer z={12} depth={0.16} phase={[0.26, 0.44]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="bm2-specs">
          <div className="bm2-spec bm2-s1"><i />510 PS<span>3.0L twin-turbo</span></div>
          <div className="bm2-spec bm2-s2"><i />3.5 s<span>0–100 km/h</span></div>
          <div className="bm2-spec bm2-s3"><i />290<span>km/h · M Driver's</span></div>
        </Layer>
        <Layer z={13} depth={0.24} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="bm2-copy">
          <span className="bm-eyebrow">01 — the machine</span>
          <h2>The drive,<br /><em>not the badge.</em></h2>
          <p>Every gram placed on purpose. Book a real test drive on roads that matter — we bring the car, the keys and a route worth the redline.</p>
        </Layer>
        <div className="bm-flash" aria-hidden />
      </ParallaxScene>

      {/* S3 — EXPLODED (детали разлетаются ОТ машины в углы, резкие фазы · acceleration-signature) */}
      <ParallaxScene heightVh={H3} overlapVh={OV} className="bm-scene bm3-scene">
        <div className="bm3-bg" aria-hidden />
        <div className="bm3-lines" aria-hidden />
        {/* базовая машина — актёр (сквозная M4), детали «взрываются» из неё */}
        <div className="bm3-halo" aria-hidden />
        {/* callout-детали: стартуют у центра, резко разлетаются наружу (короткие фазы = снап) */}
        <Layer z={7} depth={0.5} phase={[0.08, 0.3]} from={{ x: "-3vw", y: "0vh", scale: 0.55, opacity: 0 }} to={{ x: "-26vw", y: "-9vh", scale: 1, opacity: 1 }} cursor={{ x: 16, y: 9 }}>
          <div className="bm3-call bm3-c1"><SceneMedia src={`${A}/g1.jpg`} /><i>01</i><b>forged wheel</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.12, 0.34]} from={{ x: "3vw", y: "0vh", scale: 0.55, opacity: 0 }} to={{ x: "26vw", y: "-9vh", scale: 1, opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="bm3-call bm3-c2"><SceneMedia src={`${A}/g4.jpg`} /><i>02</i><b>on the limit</b></div>
        </Layer>
        <Layer z={7} depth={0.55} phase={[0.16, 0.38]} from={{ x: "-2vw", y: "1vh", scale: 0.55, opacity: 0 }} to={{ x: "-24vw", y: "12vh", scale: 1, opacity: 1 }} cursor={{ x: 14, y: 8 }}>
          <div className="bm3-call bm3-c3"><SceneMedia src={`${A}/g2.jpg`} /><i>03</i><b>the cockpit</b></div>
        </Layer>
        <Layer z={7} depth={0.66} phase={[0.2, 0.42]} from={{ x: "2vw", y: "1vh", scale: 0.55, opacity: 0 }} to={{ x: "24vw", y: "12vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -8 }}>
          <div className="bm3-call bm3-c4"><SceneMedia src={`${A}/g3.jpg`} /><i>04</i><b>rear diffuser</b></div>
        </Layer>
        <Layer z={12} depth={0.26} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="bm3-copy">
          <span className="bm-eyebrow">02 — engineering</span>
          <h2>Down to the <em>last gram.</em></h2>
          <p>Every surface does a job — cooling, downforce, or grip.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NUMBERS (spec sheet · data) */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="bm-scene bm4-scene">
        <div className="bm4-bg" aria-hidden />
        <div className="bm4-lines" aria-hidden />
        <div className="bm4-leader" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="bm4-head">
          <span className="bm-eyebrow">03 — the numbers</span><h2>Read the <em>spec.</em></h2>
        </Layer>
        {/* каждый спек «фиксируется» синей апертур-рамкой + ряд проявляется (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.1, 0.52]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="bm4-specsL">
          <div className="bm4-specs">
            <div className="bm4-spec" style={{ ["--thr" as string]: 0.04 }}><h4>Power</h4><b>510<em>PS</em></b></div>
            <div className="bm4-spec" style={{ ["--thr" as string]: 0.18 }}><h4>0–100 km/h</h4><b>3.5<em>s</em></b></div>
            <div className="bm4-spec" style={{ ["--thr" as string]: 0.32 }}><h4>Top speed · M Driver's</h4><b>290<em>km/h</em></b></div>
            <div className="bm4-spec" style={{ ["--thr" as string]: 0.46 }}><h4>Engine</h4><b>3.0<em>L twin-turbo I6</em></b></div>
            <div className="bm4-spec" style={{ ["--thr" as string]: 0.60 }}><h4>Kerb weight</h4><b>1725<em>kg</em></b></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — TELEMETRY / FROM THE DRIVER'S SEAT (HUD data-log + scan-line · snap-readout) */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="bm-scene bm5-scene">
        <div className="bm5-bg" aria-hidden />
        <div className="bm5-scanbg" aria-hidden />
        <div className="bm5-beam" aria-hidden />
        <div className="bm5-eyebrow">03 · telemetry — from the driver's seat</div>
        <Layer z={4} depth={0.5} phase={[0.03, 0.92]} from={{ y: "-30vh" }} to={{ y: "30vh" }} className="bm5-scan"><span /></Layer>
        <Layer z={6} depth={0.3} phase={[0.12, 0.3]} from={{ y: "3vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="bm5-row bm5-r1">
          <div className="bm5-card"><i>CH.01 · owner</i><p>Handed me the keys and a mountain road, not a pitch. Sold before the second corner.</p><b>Marco R.</b></div>
        </Layer>
        <Layer z={6} depth={0.4} phase={[0.18, 0.36]} from={{ y: "3vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="bm5-row bm5-r2">
          <div className="bm5-card"><i>CH.02 · press</i><p>Front end bites, rear rotates on throttle — it talks to you the whole way.</p><b>evo magazine</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.24, 0.42]} from={{ y: "3vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="bm5-row bm5-r3">
          <div className="bm5-card"><i>CH.03 · owner</i><p>No dealership loop, no pressure. Just a proper drive.</p><b>Aisha B.</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — FEEL THE REDLINE (car + CTA · object) */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="bm-scene bm6-scene">
        <div className="bm6-bg" aria-hidden />
        <div className="bm6-lines" aria-hidden />
        <div className="bm6-trail" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.26, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="bm6-copy">
          <span className="bm-eyebrow">test drive</span>
          <h2>Feel the<br /><em>redline.</em></h2>
        </Layer>
        <div className="bm6-cta">
          <p>Pick a road, pick a morning. We handle the rest — you just drive it.</p>
          <a href="#" onClick={stop} className="bm-btn">Book a test drive <i>↗</i></a>
        </div>
        <div className="bm-flash bm-flash-red" aria-hidden />
      </ParallaxScene>

      <footer className="bm-foot">
        <div className="bm-foot-top"><b>M·WERK</b><p>BMW M — the drive, engineered. Book a test drive.</p></div>
        <div className="bm-foot-legal"><span>A concept, not affiliated with BMW AG</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
