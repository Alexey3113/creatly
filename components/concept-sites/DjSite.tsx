"use client";
/* Концепт 11 — DJ CONCERT «FALLEN». Приглашение на диджей-шоу с 3д-божеством (огонь/тьма). Гранж fire-orange + oil-slick, крылатое божество, гигантский титул за ним (occlusion), угли, аудио-волна. Типо-персона: heavy grunge display.
   v2 (аудит 2026-09): FALLEN и божество горят сразу, искры поднимаются сами (Weather), без скролла.
   Аудио-волна — закреплённый HUD через весь сайт (актёр), реагирует на скорость скролла и в S5 поднимается в центр — волной в масле.
   Искровое тело — сквозной актёр: встаёт за божеством (S2) → голова над кадрами (S3) → сжимается в искру, она летит маршрутом тура (S4) →
   падает в масло (S5) → собирается обратно в тело в финале.
   Стыки: «прожиг» ×2 (сцена прогорает дырами с огненной кромкой), «сбор искр» (финал собирается из центра), остальные — перекрытие.
   Hydration: высоты баров — целые числа (Math.sin в Node и Chrome расходился на 1 ULP → mismatch атрибутов). */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow, Weather, subscribe } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./dj.css";

const A = "/uploads/1/hooks/sites/anim/dj";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 280, s4: 270, s5: 270, s6: 260 };
// детерминированные целые высоты баров (огибающая × «шум» по индексу) — одинаково на сервере и клиенте
const BARS = Array.from({ length: 56 }, (_, i) => {
  const env = 24 - Math.abs(2 * i - 55) / 2.4; // 0..~24, пик в центре
  return { h: 16 + Math.round(env * 2.2) + ((i * 37 + 11) % 19), d: (i % 7) * 11 };
});

// путь искрового тела + ядро-искра (--core) на общих якорях
const EMBER = [
  { a: at(".dj-hero", H.hero, 0), core: 0, pose: { x: 50, y: 118, s: 0.9, o: 0 } },
  { a: at(".dj-hero", H.hero, 0.62), core: 0, pose: { x: 50, y: 96, s: 0.9, o: 0.55 } },
  { a: at(".df2-scene", H.s2, 0.3), core: 0, pose: { x: 50, y: 30, s: 1, o: 0.9 } },
  { a: at(".df2-scene", H.s2, 0.64), core: 0, pose: { x: 50, y: 27, s: 1.02, o: 0.9 } },
  { a: at(".df3-scene", H.s3, 0.3), core: 0, pose: { x: 50, y: 46, s: 0.86, o: 0.85 } },
  { a: at(".df3-scene", H.s3, 0.6), core: 0.4, pose: { x: 50, y: 46, s: 0.8, o: 0.85 } },
  { a: at(".df4-scene", H.s4, 0.14), core: 1, pose: { x: 24.2, y: 38, s: 0.05, o: 1 } },
  { a: at(".df4-scene", H.s4, 0.6), core: 1, pose: { x: 24.2, y: 66, s: 0.05, o: 1 } },
  { a: at(".df5-scene", H.s5, 0.22), core: 1, pose: { x: 50, y: 50, s: 0.05, o: 0 } },
  { a: at(".df6-scene", H.s6, 0.06), core: 0.6, pose: { x: 50, y: 48, s: 0.12, o: 1 } },
  { a: at(".df6-scene", H.s6, 0.36), core: 0, pose: { x: 60, y: 44, s: 0.92, o: 0.8 } },
  { a: at(".df6-scene", H.s6, 0.9), core: 0, pose: { x: 60, y: 42, s: 0.95, o: 0.8 } },
  { a: { at: ".dj-foot", anchor: -1 }, core: 0, pose: { x: 60, y: 36, s: 0.95, o: 0 } },
];

export function DjSite() {
  const root = useRef<HTMLDivElement>(null);
  // волна-HUD реагирует на скорость скролла: сглаженная --vel 0..1 (один общий clock scene-kit)
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let v = 0;
    return subscribe(({ vy, reduced }) => {
      if (reduced) return;
      v += (Math.min(1, Math.abs(vy) / 36) - v) * 0.12;
      el.style.setProperty("--vel", v.toFixed(3));
    });
  }, []);

  return (
    <div ref={root} className="dj-site">
      <Follow stops={EMBER.map((p) => ({ ...p.a, vars: { "--core": p.core } }))} />
      <Weather kind="embers" count={26} color="#ff8a3d" color2="#ffb060" world={0.7} wind={0.6} zIndex={26} seed={13} />
      {/* АКТЁР 1 — искровое тело (вырезка из углей) + ядро-искра */}
      <Actor width="100vw" zIndex={28} bob={6} tilt={0.03} className="dj-ember" stops={EMBER.map((p) => ({ ...p.a, pose: p.pose }))}>
        <div className="dj-body"><img src={`${A}/embers-cut.png`} alt="" draggable={false} /><i className="dj-core" /></div>
      </Actor>
      {/* АКТЁР 2 — аудио-волна: закреплённый HUD, в S5 поднимается в центр */}
      <Actor width="92vw" zIndex={29} bob={0} tilt={0} className="dj-hud" stops={[
        { ...at(".dj-hero", H.hero, 0), pose: { x: 50, y: 92, s: 1 } },
        { ...at(".df4-scene", H.s4, 0.6), pose: { x: 50, y: 92, s: 1 } },
        { ...at(".df5-scene", H.s5, 0.24), pose: { x: 50, y: 52, s: 1.7 } },
        { ...at(".df5-scene", H.s5, 0.62), pose: { x: 50, y: 52, s: 1.7 } },
        { ...at(".df6-scene", H.s6, 0.3), pose: { x: 50, y: 92, s: 1 } },
        { ...at(".df6-scene", H.s6, 0.9), pose: { x: 50, y: 92, s: 1 } },
        { at: ".dj-foot", anchor: -1, pose: { x: 50, y: 112, s: 1, o: 0 } },
      ]}>
        <div className="dj-wave">{BARS.map((b, i) => <i key={i} style={{ ["--h" as string]: `${b.h}%`, ["--d" as string]: `${b.d / 100}s` }} />)}</div>
      </Actor>

      <header className="dj-head">
        <Link href="/visual-hooks" className="dj-brand">SERAPH</Link>
        <nav className="dj-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The show</a><a href="#" onClick={stop}>Lineup</a>
          <a href="#" onClick={stop}>Venue</a><a href="#" onClick={stop} className="dj-tix">Get tickets</a>
        </nav>
      </header>

      {/* HERO — FALLEN горит сразу, божество на месте, угли поднимаются */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="dj-hero">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "3vh", scale: 1.16 }} cursor={{ x: -7, y: -5 }} className="dj-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="dj-blobs" aria-hidden />

        <Layer z={3} depth={0.28} phase={[0, 0.2]} from={{ y: "4vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -10 }} className="dj-title">
          <span>FALLEN</span>
        </Layer>

        <Layer z={6} depth={0.55} phase={[0.02, 0.28]} from={{ opacity: 0 }} to={{ opacity: 1 }} cursor={{ x: 20, y: 12 }}>
          <Layer phase={[0, 1]} from={{ y: "5vh", scale: 0.94 }} to={{ y: "-4vh", scale: 1.05 }} fit="contain" position="center 38%" className="dj-angel">
            <SceneMedia src={`${A}/angel-cut.png`} alt="Winged figure lit on the stage" />
          </Layer>
        </Layer>

        <Layer z={4} depth={1} phase={[0, 1]} from={{ y: "18vh", scale: 1.1, opacity: 0.3 }} to={{ y: "-14vh", scale: 1.3, opacity: 0.5 }} cursor={{ x: 40, y: -30 }} fit="cover" className="dj-embers" blend="screen">
          <SceneMedia src={`${A}/embers-cut.png`} />
        </Layer>
        <div className="dj-grain" aria-hidden />

        <div className="dj-sub">one night · fire, light &amp; dark · a live audiovisual descent</div>
        <div className="dj-label dj-tl">SAT · 12 OCT</div>
        <div className="dj-label dj-tr">DOORS 22:00<br />18+</div>
        <div className="dj-label dj-bl"><b>01</b><span>the descent</span></div>
        <div className="dj-cue" aria-hidden>get tickets ↓</div>
      </ParallaxScene>

      {/* S2 — THE DESCENT: занавес прогорает, за ним сцена-огонь; искровое тело встаёт за божеством */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="dj-scene df2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="df2-bg">
          <SceneMedia src={`${A}/stagebg.jpg`} />
        </Layer>
        <div className="df2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0, 0.2]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.04, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="df2-deity">
          <SceneMedia src={`${A}/angel-cut.png`} alt="Winged figure lit on the stage" />
        </Layer>
        <div className="df2-grain" aria-hidden />
        <Layer z={12} phase={[0.6, 0.68]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="dj-exit">
          <Layer depth={0.24} phase={[0.1, 0.32]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="df2-copy">
            <span className="dj-eyebrow">01 — the show</span>
            <h2>Not a set —<br /><em>a descent.</em></h2>
            <p>A single continuous audiovisual performance — a 3D deity rendered live to the music, reacting to every drop. You arrive, it falls, you leave changed.</p>
          </Layer>
        </Layer>
        <div className="dj-burn dj-burn-2" aria-hidden />
      </ParallaxScene>

      {/* S3 — THE NIGHTS: кадры «бьют» на fire-линию, над ними — искровая голова */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="dj-scene df3-scene">
        <div className="df3-bg" aria-hidden />
        <div className="df3-line" aria-hidden />
        {/* кадры падают сверху и «бьют» на fire-линию, короткие фазы по биту · beat-drop */}
        <Layer z={5} depth={0.4} phase={[0, 0.14]} from={{ x: "-30vw", y: "-30vh", scale: 1.1, rotate: "-3deg", opacity: 0 }} to={{ x: "-30vw", y: "-6vh", scale: 1, rotate: "-2deg", opacity: 1 }} cursor={{ x: 18, y: 10 }}>
          <div className="df3-frame df3-f1"><SceneMedia src={`${A}/g1.jpg`} /><b>the wall of hands</b></div>
        </Layer>
        <Layer z={6} depth={0.52} phase={[0.04, 0.18]} from={{ x: "-10vw", y: "-30vh", scale: 1.1, rotate: "2deg", opacity: 0 }} to={{ x: "-10vw", y: "-6vh", scale: 1, rotate: "1deg", opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="df3-frame df3-f2"><SceneMedia src={`${A}/g2.jpg`} /><b>the deity</b></div>
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.08, 0.22]} from={{ x: "10vw", y: "-30vh", scale: 1.1, rotate: "-2deg", opacity: 0 }} to={{ x: "10vw", y: "-6vh", scale: 1, rotate: "-1deg", opacity: 1 }} cursor={{ x: 18, y: 10 }}>
          <div className="df3-frame df3-f3"><SceneMedia src={`${A}/g5.jpg`} /><b>lasers</b></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.12, 0.26]} from={{ x: "30vw", y: "-30vh", scale: 1.1, rotate: "3deg", opacity: 0 }} to={{ x: "30vw", y: "-6vh", scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="df3-frame df3-f4"><SceneMedia src={`${A}/g4.jpg`} /><b>the drop · pyro</b></div>
        </Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="dj-exit">
          <Layer depth={0.24} phase={[0.08, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="df3-copy">
            <span className="dj-eyebrow">02 — the nights</span>
            <h2>What the <em>descent</em> looks like.</h2>
            <p>Fire, haze and ten thousand hands — shot from the pit.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE TOUR: тело рассыпается — прогорает в тур; искра летит маршрутом и поджигает города */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="dj-scene df4-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.08 }} to={{ y: "-2vh", scale: 1.14 }} className="df4-photo">
          <SceneMedia src={`${A}/g1.jpg`} />
        </Layer>
        <div className="df4-bg" aria-hidden />
        <div className="df4-grain" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="dj-exit">
          <Layer depth={0.22} phase={[0, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="df4-head">
            <span className="dj-eyebrow">03 — the descent tour</span><h2>One night, <em>five cities.</em></h2>
          </Layer>
          {/* маршрут поджигается город за городом по --lp — его ведёт искра-актёр */}
          <Layer depth={0.3} phase={[0.12, 0.62]} from={{ y: "2vh", opacity: 0.9 }} to={{ y: "0vh", opacity: 1 }} className="df4-routeL">
            <div className="df4-route">
              <span className="df4-line" aria-hidden />
              <div className="df4-stop" style={{ ["--thr" as string]: 0 }}><span className="df4-node" aria-hidden /><time>18 OCT</time><b>Berlin</b><s>Kraftwerk</s><em className="on">tickets</em></div>
              <div className="df4-stop" style={{ ["--thr" as string]: 0.2 }}><span className="df4-node" aria-hidden /><time>25 OCT</time><b>Amsterdam</b><s>Warehouse — ADE</s><em>sold out</em></div>
              <div className="df4-stop" style={{ ["--thr" as string]: 0.4 }}><span className="df4-node" aria-hidden /><time>01 NOV</time><b>London</b><s>Printworks</s><em className="on">tickets</em></div>
              <div className="df4-stop" style={{ ["--thr" as string]: 0.6 }}><span className="df4-node" aria-hidden /><time>08 NOV</time><b>Paris</b><s>La Machine</s><em className="on">tickets</em></div>
              <div className="df4-stop" style={{ ["--thr" as string]: 0.8 }}><span className="df4-node" aria-hidden /><time>15 NOV</time><b>Tbilisi</b><s>Bassiani</s><em className="on">tickets</em></div>
            </div>
          </Layer>
        </Layer>
        <div className="dj-burn dj-burn-4" aria-hidden />
      </ParallaxScene>

      {/* S5 — WITNESSES: искра падает в масло и становится волной (HUD-волна поднимается в центр) */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="dj-scene df5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="df5-bg">
          <SceneMedia src={`${A}/oilbg.jpg`} />
        </Layer>
        <div className="df5-veil" aria-hidden />
        <div className="df5-eyebrow">witnesses · the waveform</div>
        <Layer z={7} depth={0.5} phase={[0.1, 0.66]} from={{ x: "-46vw" }} to={{ x: "46vw" }} className="df5-head"><span /></Layer>
        <Layer z={9} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="dj-exit">
          <Layer depth={0.3} phase={[0.04, 0.2]} from={{ x: "-30vw", y: "2vh", scale: 0.9, opacity: 0 }} to={{ x: "-30vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p1">
            <div className="df5-cmt"><i>0:42</i><p>Never seen a room go that silent before a drop.</p><b>Resident Advisor</b></div>
          </Layer>
          <Layer depth={0.42} phase={[0.14, 0.3]} from={{ x: "0vw", y: "-2vh", scale: 0.9, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p2">
            <div className="df5-cmt"><i>1:58</i><p>The deity moved with the bass like it was alive.</p><b>Mira K. · Berlin</b></div>
          </Layer>
          <Layer depth={0.54} phase={[0.24, 0.4]} from={{ x: "30vw", y: "2vh", scale: 0.9, opacity: 0 }} to={{ x: "30vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p3">
            <div className="df5-cmt"><i>3:24</i><p>No opener, no encore, no phones up. Just the descent.</p><b>DJ Mag</b></div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S6 — WITNESS THE FALL: финал собирается из искры в центре, тело встаёт обратно */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} className="dj-scene df6-scene">
        <div className="df6-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.1 }} to={{ y: "-2vh", scale: 1.16 }} className="df6-photo">
          <SceneMedia src={`${A}/stagebg.jpg`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.1, 0.34]} from={{ y: "-8vh", scale: 1.06, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="df6-copy">
          <span className="dj-eyebrow">tickets</span>
          <h2>Witness<br /><em>the fall.</em></h2>
        </Layer>
        <div className="df6-cta">
          <p>One night only. Capacity is small — the room is part of the show.</p>
          <a href="#" onClick={stop} className="dj-btn">Get tickets <i>↗</i></a>
        </div>
        <div className="df6-rim" aria-hidden />
      </ParallaxScene>

      <footer className="dj-foot">
        <div className="dj-foot-top"><b>SERAPH</b><p>A live audiovisual descent. Fire, light &amp; dark.</p></div>
        <div className="dj-foot-legal"><span>Seraph Live</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
