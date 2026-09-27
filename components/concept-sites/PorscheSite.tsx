"use client";
/* Концепт 04 — PORSCHE 911. Тёмный кино-магента, серебристый 911 в лавандовом поле, гигантское «911» ЗА машиной (type-occlusion), сакура-foreground. Типо-персона: heavy Bricolage Grotesque. Концепт-демо (A Visual Hooks concept). */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./porsche.css";

const A = "/uploads/1/hooks/sites/anim/porsche";
const stop = (e: React.MouseEvent) => e.preventDefault();

/* аналоговый прибор: тики SVG + дуга рисуется по --lp + стрелка разворачивается по --lp */
function Gauge({ label, value, unit, ticks, redFrom, sweep, big }: {
  label: string; value: string; unit: string; ticks: number; redFrom: number; sweep: number; big?: boolean;
}) {
  const A0 = -120, SPAN = 240, R = 84, R2 = 71;
  const marks = Array.from({ length: ticks + 1 }).map((_, i) => {
    const th = ((A0 + (SPAN / ticks) * i) * Math.PI) / 180;
    const s = Math.sin(th), c = Math.cos(th);
    return <line key={i} x1={100 + R * s} y1={100 - R * c} x2={100 + R2 * s} y2={100 - R2 * c}
      className={i >= redFrom ? "prg-tick prg-red" : "prg-tick"} />;
  });
  const af = ((sweep / SPAN) * 100).toFixed(1);
  return (
    <div className={big ? "prg prg-big" : "prg"}>
      <svg viewBox="0 0 200 200" className="prg-svg" aria-hidden>
        <path className="prg-track" d="M32.5 139 A78 78 0 1 1 167.5 139" pathLength={100} />
        <path className="prg-fill" d="M32.5 139 A78 78 0 1 1 167.5 139" pathLength={100} style={{ ["--af" as string]: af }} />
        {marks}
      </svg>
      <span className="prg-needle" style={{ ["--sw" as string]: sweep }} />
      <span className="prg-hub" />
      <div className="prg-read"><b>{value}</b><i>{unit}</i></div>
      <div className="prg-label">{label}</div>
    </div>
  );
}

export function PorscheSite() {
  return (
    <div className="pr-site">
      <header className="pr-head">
        <Link href="/visual-hooks" className="pr-brand">PORSCHE</Link>
        <nav className="pr-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The 911</a><a href="#" onClick={stop}>Test drive</a>
          <a href="#" onClick={stop}>Configure</a><a href="#" onClick={stop} className="pr-cta-nav">Book a drive</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="pr-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#120611" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "4vh", scale: 1.16 }} cursor={{ x: -7, y: -5 }} className="pr-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr-blobs" aria-hidden />
        <div className="pr-carshadow" aria-hidden />

        <Layer z={3} depth={0.3} phase={[0.02, 0.5]} from={{ y: "4vh", scale: 0.94, opacity: 0 }} to={{ y: "-2vh", scale: 1, opacity: 1 }} cursor={{ x: -16, y: -10 }} className="pr-numeral">
          <span>911</span>
        </Layer>

        <Layer z={5} depth={0.55} phase={[0.05, 0.95]} from={{ y: "12vh", scale: 0.9, opacity: 0 }} to={{ y: "0vh", scale: 1.08, opacity: 1 }} cursor={{ x: 22, y: 12 }} fit="contain" className="pr-car">
          <SceneMedia src={`${A}/car-cut.png`} alt="Porsche 911 sports car in profile" />
        </Layer>

        <Layer z={7} depth={1} phase={[0, 1]} from={{ x: "-6vw", y: "-4vh", rotate: "-4deg" }} to={{ x: "2vw", y: "2vh", rotate: "3deg" }} cursor={{ x: 40, y: 26 }} fit="contain" className="pr-blossom pr-blossom-l">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <Layer z={7} depth={0.9} phase={[0, 1]} from={{ x: "6vw", y: "-2vh", rotate: "6deg" }} to={{ x: "-2vw", y: "3vh", rotate: "-3deg" }} cursor={{ x: 34, y: 22 }} fit="contain" className="pr-blossom pr-blossom-r">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <div className="pr-grain" aria-hidden />

        <div className="pr-tagline">There is no <em>substitute.</em></div>
        <div className="pr-label pr-tl">992 · GT3</div>
        <div className="pr-label pr-tr">510 PS<br />9000 RPM</div>
        <div className="pr-label pr-bl"><b>01</b><span>the icon</span></div>
        <div className="pr-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — THE DRIVE (car in field + blossoms · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="pr-scene pr2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#120611" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="pr2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr2-veil" aria-hidden />
        <div className="pr2-num" aria-hidden>911</div>
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "5vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.04, opacity: 1 }} cursor={{ x: 16, y: 10 }} className="pr2-car">
          <SceneMedia src={`${A}/car-cut.png`} alt="Porsche 911 sports car in profile" />
        </Layer>
        <Layer z={9} depth={0.82} from={{ y: "-3vh", x: "2vw", scale: 1.05 }} to={{ y: "2vh", x: "-2vw", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="pr2-fg">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <div className="pr2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr2-copy">
          <span className="pr-eyebrow">01 — the drive</span>
          <h2>On your roads,<br /><em>not a showroom loop.</em></h2>
          <p>Book a test drive and find out on your roads. We bring the car to you, keys in hand, no salesman in the passenger seat.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE MACHINE (instrument cluster · needles sweep on --lp) */}
      <ParallaxScene heightVh={300} className="pr-scene pr3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#120611" }}>
        <div className="pr3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="pr3-word"><span>911</span></Layer>
        <Layer z={12} depth={0.26} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pr3-copy">
          <span className="pr-eyebrow">02 — the machine</span>
          <h2>Read it off the <em>dials.</em></h2>
        </Layer>
        <Layer z={6} depth={0.4} phase={[0.06, 0.62]} from={{ y: "5vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pr3-clusterL">
          <div className="pr3-cluster">
            <Gauge label="km/h" value="290" unit="road" ticks={8} redFrom={7} sweep={217} />
            <Gauge label="rpm ×1000" value="7.5" unit="flat-six" ticks={9} redFrom={7} sweep={200} big />
            <Gauge label="°C · oil" value="98" unit="warm" ticks={6} redFrom={5} sweep={139} />
          </div>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NUMBERS (specs · data) */}
      <ParallaxScene heightVh={260} className="pr-scene pr4-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#120611" }}>
        <div className="pr4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pr4-head">
          <span className="pr-eyebrow">03 — the numbers</span>
        </Layer>
        {/* магента-развёртка (rev-sweep) проходит по спекам, они загораются слева-направо (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pr4-statsL">
          <div className="pr4-specs">
            <span className="pr4-sweep" aria-hidden />
            <div className="pr4-spec" style={{ ["--thr" as string]: 0.10 }}><b>3.4<i>s</i></b><span>0–100 km/h</span></div>
            <div className="pr4-spec" style={{ ["--thr" as string]: 0.28 }}><b>9000</b><span>rpm redline</span></div>
            <div className="pr4-spec" style={{ ["--thr" as string]: 0.46 }}><b>510<i>ps</i></b><span>naturally aspirated</span></div>
            <div className="pr4-spec" style={{ ["--thr" as string]: 0.64 }}><b>1</b><span>purpose — the drive</span></div>
          </div>
        </Layer>
        <div className="pr4-sub">Six decades, one silhouette — refinement, not reinvention. Air first, then water, always six cylinders behind the axle.</div>
      </ParallaxScene>

      {/* S5 — FROM THE ROAD (timing board · owner sessions logged like laps, P1 = purple) */}
      <ParallaxScene heightVh={280} className="pr-scene pr5-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#120611" }}>
        <div className="pr5-bg" aria-hidden />
        <div className="pr5-eyebrow">from the road · session log</div>
        <Layer z={5} depth={0.3} phase={[0.04, 0.32]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l1">
          <div className="pr5-row pr5-p1">
            <span className="pr5-pos">P1</span><span className="pr5-drv">Stefan H. · owner</span><span className="pr5-time">7:42.1</span><span className="pr5-tag">purple</span>
            <p className="pr5-note">Drove it on my own roads before I signed — by the third corner there was nothing to decide.</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.18, 0.48]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l2">
          <div className="pr5-row">
            <span className="pr5-pos">P2</span><span className="pr5-drv">Camille D. · first 911</span><span className="pr5-time">7:48.6</span><span className="pr5-tag pr5-gap">+6.5</span>
            <p className="pr5-note">Everyone warned me it would feel old. It feels honest.</p>
          </div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.32, 0.62]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l3">
          <div className="pr5-row">
            <span className="pr5-pos">P3</span><span className="pr5-drv">Wei L. · collector</span><span className="pr5-time">7:55.3</span><span className="pr5-tag pr5-gap">+13.2</span>
            <p className="pr5-note">They brought the car to my door on a Sunday.</p>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S6 — TAKE THE 911 (car + CTA · object) */}
      <ParallaxScene heightVh={260} className="pr-scene pr6-scene">
        <div className="pr6-bg" aria-hidden />
        <div className="pr6-num" aria-hidden>911</div>
        <Layer z={4} depth={0.5} phase={[0.05, 0.9]} from={{ x: "6vw", y: "3vh", scale: 1.0, opacity: 0 }} to={{ x: "2vw", y: "0vh", scale: 1.06, opacity: 1 }} cursor={{ x: 20, y: 11 }} className="pr6-car">
          <SceneMedia src={`${A}/car-cut.png`} alt="Porsche 911 sports car in profile" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ scale: 1.28, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="pr6-copy">
          <span className="pr-eyebrow">test drive</span>
          <h2>Take the<br /><em>911.</em></h2>
        </Layer>
        <div className="pr6-cta">
          <p>Pick a road, pick a morning. The rest is just you and the flat-six.</p>
          <a href="#" onClick={stop} className="pr-btn">Book a drive <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="pr-foot">
        <div className="pr-foot-top"><b>PORSCHE 911</b><p>There is no substitute. Book the drive.</p></div>
        <div className="pr-foot-legal"><span>A concept, not affiliated with Porsche AG</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
