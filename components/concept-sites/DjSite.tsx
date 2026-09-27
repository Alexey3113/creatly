"use client";
/* Концепт 11 — DJ CONCERT «FALLEN». Приглашение на диджей-шоу с 3д-божеством (огонь/тьма). Гранж fire-orange + oil-slick, крылатое божество, гигантский титул за ним (occlusion), угли, аудио-волна. Типо-персона: heavy grunge display. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./dj.css";

const A = "/uploads/1/hooks/sites/anim/dj";
const stop = (e: React.MouseEvent) => e.preventDefault();
const BARS = Array.from({ length: 48 });

export function DjSite() {
  return (
    <div className="dj-site">
      <header className="dj-head">
        <Link href="/visual-hooks" className="dj-brand">SERAPH</Link>
        <nav className="dj-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The show</a><a href="#" onClick={stop}>Lineup</a>
          <a href="#" onClick={stop}>Venue</a><a href="#" onClick={stop} className="dj-tix">Get tickets</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="dj-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#0a0d0e" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "3vh", scale: 1.16 }} cursor={{ x: -7, y: -5 }} className="dj-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="dj-blobs" aria-hidden />

        <Layer z={3} depth={0.28} phase={[0.02, 0.5]} from={{ y: "5vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -10 }} className="dj-title">
          <span>FALLEN</span>
        </Layer>

        <Layer z={6} depth={0.55} phase={[0.04, 0.95]} from={{ y: "8vh", scale: 0.9, opacity: 0 }} to={{ y: "-3vh", scale: 1.04, opacity: 1 }} cursor={{ x: 20, y: 12 }} fit="contain" position="center 38%" className="dj-angel">
          <SceneMedia src={`${A}/angel-cut.png`} alt="Winged figure lit on the stage" />
        </Layer>

        <Layer z={4} depth={1} phase={[0, 1]} from={{ y: "18vh", scale: 1.1, opacity: 0.3 }} to={{ y: "-14vh", scale: 1.3, opacity: 0.5 }} cursor={{ x: 40, y: -30 }} fit="cover" className="dj-embers" blend="screen">
          <SceneMedia src={`${A}/embers-cut.png`} />
        </Layer>
        <div className="dj-grain" aria-hidden />

        <div className="dj-wave" aria-hidden>{BARS.map((_, i) => <i key={i} style={{ ["--h" as string]: `${18 + Math.abs(Math.sin(i * 1.7)) * 62}%`, ["--d" as string]: `${(i % 7) * 0.11}s` }} />)}</div>
        <div className="dj-sub">one night · fire, light &amp; dark · a live audiovisual descent</div>
        <div className="dj-label dj-tl">SAT · 12 OCT</div>
        <div className="dj-label dj-tr">DOORS 22:00<br />18+</div>
        <div className="dj-label dj-bl"><b>01</b><span>the descent</span></div>
        <div className="dj-cue" aria-hidden>get tickets ↓</div>
      </ParallaxScene>

      {/* S2 — THE DESCENT (deity + stage fire + embers · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="dj-scene df2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -14, color: "#0a0d0e" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="df2-bg">
          <SceneMedia src={`${A}/stagebg.jpg`} />
        </Layer>
        <div className="df2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.04, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="df2-deity">
          <SceneMedia src={`${A}/angel-cut.png`} alt="Winged figure lit on the stage" />
        </Layer>
        <Layer z={9} depth={0.82} from={{ y: "3vh", scale: 1.06 }} to={{ y: "-2vh", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="df2-embers">
          <SceneMedia src={`${A}/embers-cut.png`} />
        </Layer>
        <div className="df2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="df2-copy">
          <span className="dj-eyebrow">01 — the show</span>
          <h2>Not a set —<br /><em>a descent.</em></h2>
          <p>A single continuous audiovisual performance — a 3D deity rendered live to the music, reacting to every drop. You arrive, it falls, you leave changed.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE NIGHTS (show frames · cards) */}
      <ParallaxScene heightVh={280} className="dj-scene df3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0a0d0e" }}>
        <div className="df3-bg" aria-hidden />
        <div className="df3-line" aria-hidden />
        {/* кадры падают сверху и «бьют» на fire-линию, короткие фазы по биту · beat-drop */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.3]} from={{ x: "-30vw", y: "-46vh", scale: 1.1, rotate: "-3deg", opacity: 0 }} to={{ x: "-30vw", y: "-6vh", scale: 1, rotate: "-2deg", opacity: 1 }} cursor={{ x: 18, y: 10 }}>
          <div className="df3-frame df3-f1"><SceneMedia src={`${A}/g1.jpg`} /><b>the wall of hands</b></div>
        </Layer>
        <Layer z={6} depth={0.52} phase={[0.13, 0.38]} from={{ x: "-10vw", y: "-46vh", scale: 1.1, rotate: "2deg", opacity: 0 }} to={{ x: "-10vw", y: "-6vh", scale: 1, rotate: "1deg", opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="df3-frame df3-f2"><SceneMedia src={`${A}/g2.jpg`} /><b>the deity</b></div>
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.21, 0.46]} from={{ x: "10vw", y: "-46vh", scale: 1.1, rotate: "-2deg", opacity: 0 }} to={{ x: "10vw", y: "-6vh", scale: 1, rotate: "-1deg", opacity: 1 }} cursor={{ x: 18, y: 10 }}>
          <div className="df3-frame df3-f3"><SceneMedia src={`${A}/g5.jpg`} /><b>lasers</b></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.29, 0.54]} from={{ x: "30vw", y: "-46vh", scale: 1.1, rotate: "3deg", opacity: 0 }} to={{ x: "30vw", y: "-6vh", scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -16, y: -9 }}>
          <div className="df3-frame df3-f4"><SceneMedia src={`${A}/g4.jpg`} /><b>the drop · pyro</b></div>
        </Layer>
        <Layer z={11} depth={0.9} from={{ y: "5vh" }} to={{ y: "-6vh" }} cursor={{ x: 30, y: 20 }} fit="contain" className="df3-embers"><SceneMedia src={`${A}/embers-cut.png`} /></Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="df3-copy">
          <span className="dj-eyebrow">02 — the nights</span>
          <h2>What the <em>descent</em> looks like.</h2>
          <p>Fire, haze and ten thousand hands — shot from the pit.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE TOUR (dates · data) */}
      <ParallaxScene heightVh={260} className="dj-scene df4-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#0a0d0e" }}>
        <div className="df4-bg" aria-hidden />
        <div className="df4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="df4-head">
          <span className="dj-eyebrow">03 — the descent tour</span><h2>One night, <em>five cities.</em></h2>
        </Layer>
        {/* маршрут поджигается город за городом по --lp */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.78]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="df4-routeL">
          <div className="df4-route">
            <span className="df4-line" aria-hidden />
            <div className="df4-stop" style={{ ["--thr" as string]: 0.02 }}><span className="df4-node" aria-hidden /><time>18 OCT</time><b>Berlin</b><s>Kraftwerk</s><em className="on">tickets</em></div>
            <div className="df4-stop" style={{ ["--thr" as string]: 0.16 }}><span className="df4-node" aria-hidden /><time>25 OCT</time><b>Amsterdam</b><s>Warehouse — ADE</s><em>sold out</em></div>
            <div className="df4-stop" style={{ ["--thr" as string]: 0.30 }}><span className="df4-node" aria-hidden /><time>01 NOV</time><b>London</b><s>Printworks</s><em className="on">tickets</em></div>
            <div className="df4-stop" style={{ ["--thr" as string]: 0.44 }}><span className="df4-node" aria-hidden /><time>08 NOV</time><b>Paris</b><s>La Machine</s><em className="on">tickets</em></div>
            <div className="df4-stop" style={{ ["--thr" as string]: 0.58 }}><span className="df4-node" aria-hidden /><time>15 NOV</time><b>Tbilisi</b><s>Bassiani</s><em className="on">tickets</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — WITNESSES (reviews on oil-slick · bg+text) */}
      <ParallaxScene heightVh={260} className="dj-scene df5-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0a0d0e" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="df5-bg">
          <SceneMedia src={`${A}/oilbg.jpg`} />
        </Layer>
        <div className="df5-veil" aria-hidden />
        <div className="df5-eyebrow">witnesses · the waveform</div>
        <div className="df5-wave" aria-hidden>{Array.from({ length: 72 }).map((_, i) => (<i key={i} style={{ height: `${14 + Math.abs(Math.sin(i * 0.55) + Math.sin(i * 0.19) * 0.7) * 48}%` }} />))}</div>
        <Layer z={7} depth={0.5} phase={[0.03, 0.9]} from={{ x: "-46vw" }} to={{ x: "46vw" }} className="df5-head"><span /></Layer>
        <Layer z={9} depth={0.3} phase={[0.08, 0.32]} from={{ x: "-30vw", y: "2vh", scale: 0.9, opacity: 0 }} to={{ x: "-30vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p1">
          <div className="df5-cmt"><i>0:42</i><p>Never seen a room go that silent before a drop.</p><b>Resident Advisor</b></div>
        </Layer>
        <Layer z={9} depth={0.42} phase={[0.32, 0.56]} from={{ x: "0vw", y: "-2vh", scale: 0.9, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p2">
          <div className="df5-cmt"><i>1:58</i><p>The deity moved with the bass like it was alive.</p><b>Mira K. · Berlin</b></div>
        </Layer>
        <Layer z={9} depth={0.54} phase={[0.56, 0.8]} from={{ x: "30vw", y: "2vh", scale: 0.9, opacity: 0 }} to={{ x: "30vw", y: "0vh", scale: 1, opacity: 1 }} className="df5-pin df5-p3">
          <div className="df5-cmt"><i>3:24</i><p>No opener, no encore, no phones up. Just the descent.</p><b>DJ Mag</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — WITNESS THE FALL (embers + CTA · object) */}
      <ParallaxScene heightVh={260} className="dj-scene df6-scene">
        <div className="df6-bg" aria-hidden />
        <Layer z={4} depth={0.6} from={{ y: "4vh", scale: 1.06 }} to={{ y: "-3vh", scale: 1.14 }} cursor={{ x: 24, y: 14 }} className="df6-embers">
          <SceneMedia src={`${A}/embers-cut.png`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.46]} from={{ y: "-11vh", scale: 1.06, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="df6-copy">
          <span className="dj-eyebrow">tickets</span>
          <h2>Witness<br /><em>the fall.</em></h2>
        </Layer>
        <div className="df6-wave" aria-hidden />
        <div className="df6-cta">
          <p>One night only. Capacity is small — the room is part of the show.</p>
          <a href="#" onClick={stop} className="dj-btn">Get tickets <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="dj-foot">
        <div className="dj-foot-top"><b>SERAPH</b><p>A live audiovisual descent. Fire, light &amp; dark.</p></div>
        <div className="dj-foot-legal"><span>Seraph Live</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
