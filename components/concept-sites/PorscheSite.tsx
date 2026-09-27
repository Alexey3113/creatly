"use client";
/* Концепт 04 — PORSCHE 911. Тёмный кино-магента, серебристый 911 в лавандовом поле, гигантское «911» ЗА машиной (type-occlusion), сакура-foreground. Типо-персона: heavy Bricolage Grotesque. Концепт-демо (A Visual Hooks concept).
   v2 (аудит 2026-09): 911 — сквозной актёр: стоит в поле уже при загрузке → уезжает (S2) → камера влетает в боковое окно (zoom-through ×7)
   и оказывается в салоне с приборами (S3) → фары режут ночь, машина уходит в темноту, цифры — как разметка (S4) → точка рисует круг (S5) →
   паркуется в финале. Фон — сюжет: то же поле темнеет по общему прогрессу (--night: сумерки → ночь), лепестки магнолии — второй актёр. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./porsche.css";

const A = "/uploads/1/hooks/sites/anim/porsche";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 300, s4: 280, s5: 280, s6: 260 };
// боковое окно на вырезке: (+7% ширины, −9% высоты) от центра; кадр 100vw × 0.558 → 89.3vh при 16:10
const win = (x: number, y: number, s: number) => ({ x: x - 7 * s, y: y + 8.04 * s });
const Z0 = { x: 64, y: 60, s: 1.15 };
const P = { x: Z0.x + 7 * Z0.s, y: Z0.y - 8.04 * Z0.s }; // точка окна на экране — центр zoom-through
const PATH = [
  { a: at(".pr-hero", H.hero, 0), night: 0, lights: 0, lap: 0, pose: { x: 50, y: 57, s: 0.86 } },
  { a: at(".pr-hero", H.hero, 0.6), night: 0.1, lights: 0, lap: 0, pose: { x: 51, y: 58, s: 0.92 } },
  { a: at(".pr2-scene", H.s2, 0.3), night: 0.26, lights: 0.3, lap: 0, pose: { x: 61, y: 60, s: 1.06 } },
  { a: at(".pr2-scene", H.s2, 0.64), night: 0.34, lights: 0.4, lap: 0, pose: Z0 },
  { a: at(".pr3-scene", H.s3, 0.25), night: 0.46, lights: 0.4, lap: 0, pose: { ...win(P.x, P.y, 7), s: 7, o: 0 } },
  { a: at(".pr3-scene", H.s3, 0.7), night: 0.56, lights: 1, lap: 0, pose: { x: 50, y: 77, s: 0.3, o: 0 } },
  { a: at(".pr4-scene", H.s4, 0.24), night: 0.7, lights: 1, lap: 0, pose: { x: 50, y: 77, s: 0.3, o: 1 } },
  { a: at(".pr4-scene", H.s4, 0.66), night: 0.78, lights: 1, lap: 0, pose: { x: 51, y: 73, s: 0.22, o: 1 } },
  { a: at(".pr5-scene", H.s5, 0.22), night: 0.88, lights: 1, lap: 0.1, pose: { x: 51, y: 70, s: 0.08, o: 0 } },
  { a: at(".pr5-scene", H.s5, 0.66), night: 0.94, lights: 1, lap: 1, pose: { x: 72, y: 62, s: 0.5, o: 0 } },
  { a: at(".pr6-scene", H.s6, 0.3), night: 1, lights: 1, lap: 1, pose: { x: 71, y: 60, s: 0.72, o: 1 } },
  { a: at(".pr6-scene", H.s6, 0.9), night: 1, lights: 1, lap: 1, pose: { x: 70, y: 60, s: 0.75, o: 1 } },
  { a: { at: ".pr-foot", anchor: -1 }, night: 1, lights: 1, lap: 1, pose: { x: 70, y: 40, s: 0.75, o: 0 } },
];
const CIRCUIT = "M70 250 C60 130 150 58 262 70 L424 82 C506 90 524 156 468 196 L384 252 C342 282 362 318 424 318 L482 318 C524 318 524 352 482 352 L144 352 C94 352 72 312 70 250 Z";

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
      <Follow stops={PATH.map((p) => ({ ...p.a, vars: { "--night": p.night, "--lights": p.lights, "--lap": p.lap } }))} />
      <Weather kind="petals" count={16} color="#e7a3c8" color2="#f6d3e6" world={0.5} wind={0.8} zIndex={26} seed={4} />
      {/* АКТЁР — 911 (вырезка) + свечение задних фонарей по --lights */}
      <Actor width="100vw" zIndex={30} bob={2} tilt={0.02} className="pr-actor" stops={PATH.map((p) => ({ ...p.a, pose: p.pose }))}>
        <div className="pr-car-a">
          <img src={`${A}/car-cut.png`} alt="" draggable={false} />
          <i className="pr-tail pr-tail-l" /><i className="pr-tail pr-tail-r" />
        </div>
      </Actor>

      <header className="pr-head">
        <Link href="/visual-hooks" className="pr-brand">PORSCHE</Link>
        <nav className="pr-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The 911</a><a href="#" onClick={stop}>Test drive</a>
          <a href="#" onClick={stop}>Configure</a><a href="#" onClick={stop} className="pr-cta-nav">Book a drive</a>
        </nav>
      </header>

      {/* HERO — как в пине: 911 и машина на месте при загрузке, ветви магнолии качаются, падают лепестки */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="pr-hero">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "4vh", scale: 1.16 }} cursor={{ x: -7, y: -5 }} className="pr-bg pr-field">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr-blobs" aria-hidden />
        <div className="pr-carshadow" aria-hidden />

        <Layer z={3} phase={[0.76, 0.84]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0.25 }} className="pr-exit">
          <Layer depth={0.3} phase={[0, 0.22]} from={{ y: "4vh", scale: 0.94, opacity: 0 }} to={{ y: "-2vh", scale: 1, opacity: 1 }} cursor={{ x: -16, y: -10 }} className="pr-numeral">
            <span>911</span>
          </Layer>
        </Layer>

        <Layer z={7} depth={1} phase={[0, 1]} from={{ x: "-6vw", y: "-4vh", rotate: "-4deg" }} to={{ x: "2vw", y: "2vh", rotate: "3deg" }} cursor={{ x: 40, y: 26 }} fit="contain" className="pr-blossom pr-blossom-l">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <Layer z={7} depth={0.9} phase={[0, 1]} from={{ x: "6vw", y: "-2vh", rotate: "6deg" }} to={{ x: "-2vw", y: "3vh", rotate: "-3deg" }} cursor={{ x: 34, y: 22 }} fit="contain" className="pr-blossom pr-blossom-r">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <div className="pr-grain" aria-hidden />

        <Layer z={12} phase={[0.74, 0.82]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="pr-exit">
          <div className="pr-tagline">There is no <em>substitute.</em></div>
        </Layer>
        <div className="pr-label pr-tl">992 · GT3</div>
        <div className="pr-label pr-tr">510 PS<br />9000 RPM</div>
        <div className="pr-label pr-bl"><b>01</b><span>the icon</span></div>
        <div className="pr-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — THE DRIVE: то же поле позже (камера повернула к горам), машина уезжает */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="pr-scene pr2-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.34, x: "3vw" }} to={{ x: "-3vw", y: "2vh", scale: 1.42 }} cursor={{ x: -7, y: -4 }} position="30% 70%" className="pr2-bg pr-field">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr2-veil" aria-hidden />
        <div className="pr2-num" aria-hidden>911</div>
        <Layer z={9} depth={0.82} from={{ y: "-3vh", x: "2vw", scale: 1.05 }} to={{ y: "2vh", x: "-2vw", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="pr2-fg">
          <SceneMedia src={`${A}/blossom-cut.png`} />
        </Layer>
        <div className="pr2-grain" aria-hidden />
        <Layer z={12} phase={[0.58, 0.66]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="pr-exit">
          <Layer depth={0.24} phase={[0.1, 0.32]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr2-copy">
            <span className="pr-eyebrow">01 — the drive</span>
            <h2>On your roads,<br /><em>not a showroom loop.</em></h2>
            <p>Book a test drive and find out on your roads. We bring the car to you, keys in hand, no salesman in the passenger seat.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE MACHINE: влёт в боковое окно — салон, приборы (стрелки по --lp) */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="pr-scene pr3-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.3 }} to={{ y: "-2vh", scale: 1.12 }} position="50% 40%" className="pr3-photo">
          <SceneMedia src={`${A}/g3.jpg`} />
        </Layer>
        <div className="pr3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0, 0.2]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="pr3-word"><span>911</span></Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="pr-exit">
          <Layer depth={0.26} phase={[0.14, 0.34]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pr3-copy">
            <span className="pr-eyebrow">02 — the machine</span>
            <h2>Read it off the <em>dials.</em></h2>
          </Layer>
          <Layer depth={0.4} phase={[0.1, 0.6]} from={{ y: "3vh", opacity: 0.2 }} to={{ y: "0vh", opacity: 1 }} className="pr3-clusterL">
            <div className="pr3-cluster">
              <Gauge label="km/h" value="290" unit="road" ticks={8} redFrom={7} sweep={217} />
              <Gauge label="rpm ×1000" value="7.5" unit="flat-six" ticks={9} redFrom={7} sweep={200} big />
              <Gauge label="°C · oil" value="98" unit="warm" ticks={6} redFrom={5} sweep={139} />
            </div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NUMBERS: фары режут ночь (конус света), машина уходит в темноту, цифры — как разметка */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="pr-scene pr4-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.2 }} to={{ y: "-2vh", scale: 1.3 }} position="50% 80%" className="pr4-photo pr-field">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr4-bg" aria-hidden />
        <div className="pr4-road" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="pr-exit">
          <Layer depth={0.22} phase={[0.02, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="pr4-head">
            <span className="pr-eyebrow">03 — the numbers</span>
          </Layer>
          {/* магента-развёртка (rev-sweep) проходит по спекам, они загораются слева-направо (по --lp) */}
          <Layer depth={0.3} phase={[0.04, 0.56]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="pr4-statsL">
            <div className="pr4-specs">
              <span className="pr4-sweep" aria-hidden />
              <div className="pr4-spec" style={{ ["--thr" as string]: 0.06 }}><b>3.4<i>s</i></b><span>0–100 km/h</span></div>
              <div className="pr4-spec" style={{ ["--thr" as string]: 0.24 }}><b>9000</b><span>rpm redline</span></div>
              <div className="pr4-spec" style={{ ["--thr" as string]: 0.42 }}><b>510<i>ps</i></b><span>naturally aspirated</span></div>
              <div className="pr4-spec" style={{ ["--thr" as string]: 0.6 }}><b>1</b><span>purpose — the drive</span></div>
            </div>
          </Layer>
          <div className="pr4-sub">Six decades, one silhouette — refinement, not reinvention. Air first, then water, always six cylinders behind the axle.</div>
        </Layer>
        <div className="pr4-beam" aria-hidden />
      </ParallaxScene>

      {/* S5 — FROM THE ROAD (timing board · сессии как круги, P1 = фиолетовый) · точка машины рисует круг трассы */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="pr-scene pr5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.3 }} to={{ y: "-2vh", scale: 1.36 }} position="50% 80%" className="pr5-photo pr-field">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr5-bg" aria-hidden />
        <div className="pr5-track" aria-hidden>
          <svg viewBox="0 0 560 400" className="pr5-svg">
            <path d={CIRCUIT} className="pr5-line-bg" pathLength={100} />
            <path d={CIRCUIT} className="pr5-line" pathLength={100} />
          </svg>
          <i className="pr5-dot" style={{ offsetPath: `path("${CIRCUIT}")` }} />
        </div>
        <div className="pr5-eyebrow">from the road · session log</div>
        <Layer z={5} phase={[0.6, 0.68]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="pr-exit">
        <Layer depth={0.3} phase={[0.02, 0.2]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l1">
          <div className="pr5-row pr5-p1">
            <span className="pr5-pos">P1</span><span className="pr5-drv">Stefan H. · owner</span><span className="pr5-time">7:42.1</span><span className="pr5-tag">purple</span>
            <p className="pr5-note">Drove it on my own roads before I signed — by the third corner there was nothing to decide.</p>
          </div>
        </Layer>
        <Layer depth={0.42} phase={[0.1, 0.3]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l2">
          <div className="pr5-row">
            <span className="pr5-pos">P2</span><span className="pr5-drv">Camille D. · first 911</span><span className="pr5-time">7:48.6</span><span className="pr5-tag pr5-gap">+6.5</span>
            <p className="pr5-note">Everyone warned me it would feel old. It feels honest.</p>
          </div>
        </Layer>
        <Layer depth={0.54} phase={[0.2, 0.4]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="pr5-lap pr5-l3">
          <div className="pr5-row">
            <span className="pr5-pos">P3</span><span className="pr5-drv">Wei L. · collector</span><span className="pr5-time">7:55.3</span><span className="pr5-tag pr5-gap">+13.2</span>
            <p className="pr5-note">They brought the car to my door on a Sunday.</p>
          </div>
        </Layer>
        </Layer>
      </ParallaxScene>

      {/* S6 — TAKE THE 911: ночь в том же поле, машина паркуется с горящими фонарями */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} parallax={8} className="pr-scene pr6-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.14 }} className="pr6-photo pr-field">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="pr6-bg" aria-hidden />
        <div className="pr6-num" aria-hidden>911</div>
        <Layer z={12} depth={0.24} phase={[0.1, 0.34]} from={{ scale: 1.28, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="pr6-copy">
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
