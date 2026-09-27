"use client";
/* Концепт 03 — VINYL «AFTER HOURS». Клуб винила, after-hours: тёмный sepia-amber, глянцевый макро, блэклеттер-титул, зерно. Hero-приём: центральный винил, вращается по скроллу (disc/grooves). Типо-персона: blackletter.
   v2 (аудит 2026-09): пластинка — сквозной актёр и крутится ВСЕГДА (33⅓ об/мин, ускоряется от скорости скролла):
   у виска в hero → падает на проигрыватель в баре (S2) → выходит из конверта над веером крейта (S3) → циферблат Thu→Sun (S4) →
   её канавки ведут трек-лист отзывов (S5) → переворот на сторону B (S6).
   Стыки: «игла» (жёсткая склейка + импульс волны), «канавки» (ирис с бороздками из пластинки), «переворот A→B» (rotateY 180°), остальные — перекрытие. */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow, subscribe } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./vinyl.css";

const A = "/uploads/1/hooks/sites/anim/vinyl";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 270, s3: 300, s4: 270, s5: 260, s6: 260 };

// путь пластинки + «легла на проигрыватель» (--tilt) + тонарм (--arm: 0 поднят/скрыт → 1 игла на пластинке) на общих якорях
const PATH = [
  { a: at(".vp-hero", H.hero, 0), tilt: 0, arm: 0, pose: { x: 84, y: 46, s: 1, r: 0 } },
  { a: at(".vp-hero", H.hero, 0.5), tilt: 0, arm: 0, pose: { x: 76, y: 48, s: 1.1, r: 0 } },
  { a: at(".vp-hero", H.hero, 0.86), tilt: 0.35, arm: 1, pose: { x: 52, y: 54, s: 1.5, r: 0 } },
  { a: at(".v2-scene", H.s2, 0.36), tilt: 1, arm: 1, pose: { x: 76, y: 74, s: 2.2, r: 0 } },
  { a: at(".v2-scene", H.s2, 0.62), tilt: 1, arm: 1, pose: { x: 76, y: 74, s: 2.2, r: 0 } },
  { a: at(".v3-scene", H.s3, 0.3), tilt: 0, arm: 0, pose: { x: 50, y: 31, s: 1.5, r: 0 } },
  { a: at(".v3-scene", H.s3, 0.66), tilt: 0, arm: 0, pose: { x: 50, y: 29, s: 1.55, r: 0 } },
  { a: at(".v4-scene", H.s4, 0.06), tilt: 0, arm: 0, pose: { x: 21, y: 56, s: 2.1, r: 0 } },
  { a: at(".v4-scene", H.s4, 0.64), tilt: 0, arm: 0, pose: { x: 21, y: 56, s: 2.1, r: 0 } },
  { a: at(".v5-scene", H.s5, 0.3), tilt: 0, arm: 0, pose: { x: 4, y: 50, s: 3.8, r: 0 } },
  { a: at(".v5-scene", H.s5, 0.6), tilt: 0, arm: 0, pose: { x: 4, y: 50, s: 3.8, r: 0 } },
  { a: at(".v6-scene", H.s6, 0.1), tilt: 0, arm: 0, pose: { x: 50, y: 50, s: 2.3, r: 0 } },
  { a: at(".v6-scene", H.s6, 0.4), tilt: 0, arm: 0, pose: { x: 78, y: 50, s: 1.75, r: 0 } },
  { a: at(".v6-scene", H.s6, 0.9), tilt: 0, arm: 0, pose: { x: 77, y: 48, s: 1.8, r: 0 } },
];

export function VinylSite() {
  const root = useRef<HTMLDivElement>(null);
  // пластинка крутится всегда: 33⅓ об/мин = 0.2°/мс, скорость скролла её разгоняет (один общий clock scene-kit)
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let a = 0;
    return subscribe(({ vy, dt, reduced }) => {
      if (reduced) return;
      a = (a + (0.2 + Math.min(2.4, Math.abs(vy) * 0.04)) * dt) % 360;
      el.style.setProperty("--spin", `${a.toFixed(1)}deg`);
    });
  }, []);

  return (
    <div ref={root} className="vn-site vn-poster">
      <Follow stops={PATH.map((p) => ({ ...p.a, vars: { "--tilt": p.tilt, "--arm": p.arm } }))} />
      {/* АКТЁР — пластинка */}
      <Actor width="15vw" zIndex={30} bob={3} tilt={0.03} className="vn-actor" stops={PATH.map((p) => ({ ...p.a, pose: p.pose }))}>
        <div className="vn-deck">
          <div className="vn-disc"><img src={`${A}/record-cut.png`} alt="" draggable={false} /></div>
          <svg className="vn-arm" viewBox="0 0 100 100" aria-hidden>
            <circle cx="104" cy="6" r="6" fill="#2a1d14" stroke="#d99a4a" strokeWidth="1.2" />
            <path d="M104 6 L96 30 L74 52" stroke="#e3c79c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <rect x="68" y="49" width="10" height="6" rx="1" transform="rotate(-38 73 52)" fill="#d99a4a" />
          </svg>
        </div>
      </Actor>

      <header className="vn-head">
        <Link href="/visual-hooks" className="vn-brand">SIDE·B</Link>
        <nav className="vn-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Nights</a><a href="#" onClick={stop}>The room</a>
          <a href="#" onClick={stop}>Records</a><a href="#" onClick={stop} className="vn-join">Become a member</a>
        </nav>
      </header>

      {/* HERO — sepia-amber album-cover уровень пина «Vampire»: собран при загрузке, дым плывёт, диск крутится */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="vn-hero vp-hero">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "2vh", scale: 1.15 }} cursor={{ x: -6, y: -5 }} className="vp-bg">
          <SceneMedia src={`${A}/coverface.jpg`} alt="Album cover portrait" />
        </Layer>
        <div className="vp-veil" aria-hidden />
        <Layer z={3} depth={0.6} from={{ y: "4vh" }} to={{ y: "-10vh" }} className="vp-smoke">
          <SceneMedia src={`${A}/smokefg.jpg`} />
        </Layer>
        <Layer z={4} depth={0.28} phase={[0, 0.24]} from={{ y: "3vh", scale: 1.04, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -12, y: -8 }} className="vp-title">
          <span>Side B</span>
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

      {/* S2 — THE ROOM: игла опускается — жёсткая склейка + импульс; пластинка ложится на проигрыватель */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="vn-scene v2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="v2-bg">
          <SceneMedia src={`${A}/clubbg.jpg`} />
        </Layer>
        <div className="v2-veil" aria-hidden />
        <Layer z={9} depth={0.74} from={{ y: "-2vh", scale: 1.05 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: 28, y: 15 }} className="v2-fg">
          <SceneMedia src={`${A}/smokefg.jpg`} />
        </Layer>
        <div className="v2-grain" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="vn-exit">
          <Layer depth={0.24} phase={[0.14, 0.34]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v2-copy">
            <span className="vn-eyebrow">01 — the ritual</span>
            <h2>One record,<br /><em>played whole.</em></h2>
            <p>No screens, no shuffle — a small room, a good system, and people who came to listen. The needle drops at eleven.</p>
          </Layer>
        </Layer>
        <div className="v2-pulse" aria-hidden />
      </ParallaxScene>

      {/* S3 — DIGGING THE CRATE (веер конвертов; пластинка выходит из конверта над веером) */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="vn-scene v3-scene">
        <div className="v3-bg" aria-hidden />
        <Layer z={2} depth={0.2} from={{ scale: 1.1 }} to={{ scale: 1.2, y: "-2vh" }} className="v3-photo">
          <SceneMedia src={`${A}/g4.jpg`} />
        </Layer>
        {/* веер конвертов — «перебираем крейт», каждый на своём повороте от общей нижней оси */}
        <Layer z={5} phase={[0, 0.14]} depth={0} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          <Layer depth={0.4} phase={[0, 0.7]} from={{ x: "-5vw", y: "6vh", rotate: "-19deg" }} to={{ x: "-15vw", y: "2vh", rotate: "-14deg" }} cursor={{ x: 16, y: 9 }}>
            <div className="v3-sleeve v3-s1"><SceneMedia src={`${A}/g1.jpg`} /><b>the needle drops</b></div>
          </Layer>
        </Layer>
        <Layer z={6} phase={[0.02, 0.16]} depth={0} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          <Layer depth={0.5} phase={[0, 0.7]} from={{ x: "-3vw", y: "5vh", rotate: "-8deg" }} to={{ x: "-6vw", y: "0vh", rotate: "-6deg" }} cursor={{ x: 12, y: 7 }}>
            <div className="v3-sleeve v3-s2"><SceneMedia src={`${A}/g3.jpg`} /><b>the listening room</b></div>
          </Layer>
        </Layer>
        <Layer z={7} phase={[0.04, 0.18]} depth={0} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          <Layer depth={0.6} phase={[0, 0.7]} from={{ x: "3vw", y: "5vh", rotate: "6deg" }} to={{ x: "6vw", y: "0vh", rotate: "5deg" }} cursor={{ x: -12, y: -7 }}>
            <div className="v3-sleeve v3-s3"><SceneMedia src={`${A}/g2.jpg`} /><b>digging the crates</b></div>
          </Layer>
        </Layer>
        <Layer z={8} phase={[0.06, 0.2]} depth={0} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          <Layer depth={0.7} phase={[0, 0.7]} from={{ x: "6vw", y: "6vh", rotate: "16deg" }} to={{ x: "15vw", y: "2vh", rotate: "13deg" }} cursor={{ x: -16, y: -9 }}>
            <div className="v3-sleeve v3-s4"><SceneMedia src={`${A}/g5.jpg`} /><b>out of the sleeve</b></div>
          </Layer>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.08, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="v3-copy">
          <span className="vn-eyebrow">02 — the crate</span>
          <h2>Flip through <em>the crate.</em></h2>
          <p>You bring the records, or trust the ones we pull. Nobody&apos;s in a hurry.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NIGHTS: открывается кругом-канавками из пластинки; пластинка — циферблат недели */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="vn-scene v4-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "-2vh", scale: 1.12 }} className="v4-photo">
          <SceneMedia src={`${A}/g3.jpg`} />
        </Layer>
        <div className="v4-bg" aria-hidden />
        <div className="v4-grain" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="vn-exit">
          <Layer depth={0.22} phase={[0.02, 0.22]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="v4-head">
            <span className="vn-eyebrow">03 — the nights</span><h2>Thursday to <em>Sunday, after ten.</em></h2>
          </Layer>
          {/* сессии-«дорожки»: ряд въезжает + амбер-грув прочерчивается под ним (по --lp, последовательно) */}
          <Layer depth={0.3} phase={[0.04, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="v4-nightsL">
            <div className="v4-nights">
              <div className="v4-night" style={{ ["--thr" as string]: 0.02 }}><time>THU</time><b>Listening Session</b><s>one album, played whole</s><em className="on">open</em></div>
              <div className="v4-night" style={{ ["--thr" as string]: 0.18 }}><time>FRI</time><b>Guest Selectors</b><s>bring a side you love</s><em className="on">sign up</em></div>
              <div className="v4-night" style={{ ["--thr" as string]: 0.34 }}><time>SAT</time><b>Deep Cuts</b><s>rare pressings only</s><em>members</em></div>
              <div className="v4-night" style={{ ["--thr" as string]: 0.5 }}><time>SUN</time><b>The Back Room</b><s>after-after-hours</s><em>waitlist</em></div>
            </div>
          </Layer>
        </Layer>
        <div className="v4-grooves" aria-hidden />
      </ParallaxScene>

      {/* S5 — SIDE B / THE REGULARS (трек-лист + игла-развёртка от края пластинки · needle-down) */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="vn-scene v5-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ y: "-2vh", scale: 1.14 }} className="v5-photo">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="v5-bg" aria-hidden />
        <div className="v5-eyebrow">side B · the regulars</div>
        <Layer z={4} depth={0.5} phase={[0.02, 0.62]} from={{ y: "-26vh" }} to={{ y: "26vh" }} className="v5-needle"><span /></Layer>
        <Layer z={5} depth={0.28} phase={[0.02, 0.2]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t1">
          <i>B1</i><p>Forgotten what an album sounds like when you sit and let it finish.</p><cite>Owen D. · regular</cite>
        </Layer>
        <Layer z={5} depth={0.4} phase={[0.1, 0.3]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t2">
          <i>B2</i><p>Played my dad&apos;s old jazz record to a silent room. Nearly cried.</p><cite>Priya M. · guest selector</cite>
        </Layer>
        <Layer z={5} depth={0.52} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="v5-trk v5-t3">
          <i>B3</i><p>The only bar where people shush you for talking. Exactly what I wanted.</p><cite>Léo T. · member</cite>
        </Layer>
      </ParallaxScene>

      {/* S6 — SIDE B: сцена переворачивается как пластинка (A→B), на обороте — финал */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} className="vn-scene v6-scene">
        <div className="v6-bg" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.1, 0.34]} from={{ rotate: "-10deg", scale: 0.88, opacity: 0 }} to={{ rotate: "0deg", scale: 1, opacity: 1 }} className="v6-copy">
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
