"use client";
/* Концепт 16 — ROCKBAND «FERAL». Панк/рок-группа, живые концерты. Чёрное + кость + электрик-ред, ультра-конденс Anton-титул за фронтменом, летящая гитара (flying card), рваный стаб-билет, halftone. Типо-персона: Anton + DM Mono. Hero-приём: brutalist gig-poster / torn-stub. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./rockband.css";

const A = "/uploads/1/hooks/sites/anim/rockband";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function RockBandSite() {
  return (
    <div className="rb-site rb-poster">
      <header className="rb-head">
        <Link href="/visual-hooks" className="rb-brand">FERAL</Link>
        <nav className="rb-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Tour</a><a href="#" onClick={stop}>Music</a>
          <a href="#" onClick={stop}>Band</a><a href="#" onClick={stop} className="rb-tix">Tickets</a>
        </nav>
      </header>

      {/* HERO — industrial-HUD «DEMON/SYSTEM» уровень */}
      <ParallaxScene heightVh={300} className="rb-hero rp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#0c0a0a" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="rp-bg">
          <SceneMedia src={`${A}/redgrid.jpg`} />
        </Layer>
        <div className="rp-veil" aria-hidden />
        <Layer z={3} depth={0.26} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "-2vh", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="rp-title">
          <span>FERAL</span>
        </Layer>
        <Layer z={6} depth={0.55} phase={[0.05, 0.5]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "1vh", scale: 1.04, opacity: 1 }} cursor={{ x: 16, y: 10 }} className="rp-figure">
          <SceneMedia src={`${A}/wrapfig-cut.png`} alt="Performer wrapped in stage light" />
        </Layer>
        <div className="rp-half" aria-hidden />
        <div className="rp-grain" aria-hidden />
        <div className="rp-frame" aria-hidden />
        <div className="rp-top"><s />&nbsp;FERAL LIVES WHERE THERE IS NO SILENCE&nbsp;<s /></div>
        <div className="rp-hud rp-l"><i>STR</i><span className="rp-bar"><b /></span><i>WEP : STRAT</i><i>STATUS : LIVE</i></div>
        <div className="rp-hud rp-r"><i>OFFLINE : NEVER</i><i>ROUNDS : 32 CITIES</i><i>TIME AT 100%</i></div>
        <div className="rp-table">
          <div className="rp-trow rp-th"><i>EDITION</i><i>DATE</i><i>VENUE</i></div>
          <div className="rp-trow"><b>FINAL</b><b>OCT 09</b><b>MANCHESTER</b></div>
          <div className="rp-trow"><b>FINAL</b><b>OCT 15</b><b>LONDON</b></div>
        </div>
        <div className="rp-adsr"><em /><em /><em /><em /><i>ADSR</i></div>
        <div className="rp-sys">SYSTEM</div>
        <div className="rp-barcode" aria-hidden />
        <div className="rp-glyph rp-g1">✕</div><div className="rp-glyph rp-g2">◇</div>
        <div className="rp-cue">turn it up ↓</div>
        <div className="rp-strip" aria-hidden><span>NOT JUST NOISE — THE ROOM SCREAMING BACK · NOT JUST NOISE — THE ROOM SCREAMING BACK · NOT JUST NOISE — THE ROOM SCREAMING BACK · </span></div>
      </ParallaxScene>

      {/* S2 — THE PIT (crowd · foreground-parallax) */}
      <ParallaxScene heightVh={270} className="rb-scene b2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 16, color: "#0c0a0a" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="b2-bg">
          <SceneMedia src={`${A}/pitbg.jpg`} />
        </Layer>
        <div className="b2-veil" aria-hidden />
        <Layer z={9} depth={0.74} from={{ y: "2vh", scale: 1.05 }} to={{ y: "-1vh", scale: 1.12 }} cursor={{ x: 30, y: 16 }} className="b2-fg">
          <SceneMedia src={`${A}/handsfg.jpg`} />
        </Layer>
        <div className="b2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="b2-copy">
          <span className="rb-eyebrow">01 — the pit</span>
          <h2>Live or<br /><em>not at all.</em></h2>
          <p>No click, no laptop, no safety net. A crowd close enough to grab the mic and a room small enough to feel it.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE RECORD (gig frames · cards) */}
      <ParallaxScene heightVh={280} className="rb-scene b3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0c0a0a" }}>
        <div className="b3-bg" aria-hidden />
        <div className="b3-strip" aria-hidden />
        {/* контакт-плёнка live-сета: кадры «жёстко склеиваются» на месте · hard-cut */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.24]} from={{ x: "-30vw", scale: 1.08, opacity: 0 }} to={{ x: "-30vw", scale: 1, opacity: 1 }} cursor={{ x: 12, y: 7 }}>
          <div className="b3-frame b3-f1"><SceneMedia src={`${A}/g1.jpg`} /><b>the room · sold out</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.12, 0.3]} from={{ x: "-10vw", scale: 1.08, opacity: 0 }} to={{ x: "-10vw", scale: 1, opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="b3-frame b3-f2"><SceneMedia src={`${A}/g2.jpg`} /><b>the solo</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.19, 0.37]} from={{ x: "10vw", scale: 1.08, opacity: 0 }} to={{ x: "10vw", scale: 1, opacity: 1 }} cursor={{ x: 12, y: 7 }}>
          <div className="b3-frame b3-f3"><SceneMedia src={`${A}/g5.jpg`} /><b>crowd surf</b></div>
        </Layer>
        <Layer z={8} depth={0.68} phase={[0.26, 0.44]} from={{ x: "30vw", scale: 1.08, opacity: 0 }} to={{ x: "30vw", scale: 1, opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="b3-frame b3-f4"><SceneMedia src={`${A}/g4.jpg`} /><b>encore</b></div>
        </Layer>
        <Layer z={12} depth={0.26} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="b3-copy">
          <span className="rb-eyebrow">02 — the live</span>
          <h2>What it <em>looks like</em> loud.</h2>
          <p>Shot on the floor, no filters, no reshoots.</p>
        </Layer>
        <div className="b3-rec"><i />REC · 00:47:12</div>
      </ParallaxScene>

      {/* S4 — THE TOUR (dates · HUD data) */}
      <ParallaxScene heightVh={260} className="rb-scene b4-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#0c0a0a" }}>
        <div className="b4-bg" aria-hidden />
        <div className="b4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="b4-head">
          <span className="rb-eyebrow">03 — aftermath tour ’25</span><h2>32 cities. <em>Small rooms.</em></h2>
        </Layer>
        {/* стена флаеров: каждый город — рваный флаер, «прихлопывается» на стену по очереди */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="b4-wallL">
          <div className="b4-wall">
            <div className="b4-flyer b4-f1" style={{ ["--thr" as string]: 0.02, ["--rot" as string]: "-4deg" }}><span className="b4-staple" aria-hidden /><time>OCT 09</time><b>Manchester</b><s>Deaf Institute</s><em className="on">tickets</em></div>
            <div className="b4-flyer b4-f2" style={{ ["--thr" as string]: 0.14, ["--rot" as string]: "3deg" }}><span className="b4-staple" aria-hidden /><time>OCT 12</time><b>Glasgow</b><s>King Tut's</s><em className="on">tickets</em></div>
            <div className="b4-flyer b4-f3" style={{ ["--thr" as string]: 0.26, ["--rot" as string]: "-2deg" }}><span className="b4-staple" aria-hidden /><time>OCT 15</time><b>London</b><s>The Lexington</s><em>sold out</em></div>
            <div className="b4-flyer b4-f4" style={{ ["--thr" as string]: 0.38, ["--rot" as string]: "4deg" }}><span className="b4-staple" aria-hidden /><time>OCT 19</time><b>Bristol</b><s>Exchange</s><em className="on">tickets</em></div>
            <div className="b4-flyer b4-f5" style={{ ["--thr" as string]: 0.50, ["--rot" as string]: "-3deg" }}><span className="b4-staple" aria-hidden /><time>OCT 23</time><b>Leeds</b><s>Brudenell</s><em className="on">tickets</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE NOISE BACK (reviews · bg+text) */}
      <ParallaxScene heightVh={260} className="rb-scene b5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: -13, color: "#0c0a0a" }}>
        <div className="b5-bg" aria-hidden />
        <div className="b5-eyebrow">the noise back · press</div>
        {/* пресс-вырезки: рваный newsprint с мастхедами, приклеены под углом · pin-snap */}
        <Layer z={5} depth={0.28} phase={[0.05, 0.36]} from={{ x: "-26vw", y: "-4vh", rotate: "-6deg", scale: 1.04, opacity: 0 }} to={{ x: "-26vw", y: "0vh", rotate: "-3deg", scale: 1, opacity: 1 }} className="b5-clip b5-c1">
          <div><i>KERRANG!</i><p>Loudest 200-cap room I've ever stood in. Worth every ringing hour.</p><b>live review</b></div>
        </Layer>
        <Layer z={7} depth={0.4} phase={[0.16, 0.48]} from={{ x: "24vw", y: "-4vh", rotate: "5deg", scale: 1.04, opacity: 0 }} to={{ x: "24vw", y: "0vh", rotate: "2deg", scale: 1, opacity: 1 }} className="b5-clip b5-c2">
          <div><i>THE FAN PIT</i><p>No laptop, no tricks — four people and a wall of sound.</p><b>Dan H.</b></div>
        </Layer>
        <Layer z={6} depth={0.52} phase={[0.27, 0.6]} from={{ x: "-4vw", y: "-4vh", rotate: "-4deg", scale: 1.04, opacity: 0 }} to={{ x: "-4vw", y: "0vh", rotate: "-1.5deg", scale: 1, opacity: 1 }} className="b5-clip b5-c3">
          <div><i>LINE OF BEST FIT</i><p>Held the last note until the room screamed. Then held it longer.</p><b>live</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — GET TICKETS (torn stub + CTA · object) */}
      <ParallaxScene heightVh={260} className="rb-scene b6-scene">
        <div className="b6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.04, 0.5]} from={{ y: "7vh", scale: 0.94, rotate: "10deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "5deg", opacity: 1 }} cursor={{ x: 20, y: 12 }} className="b6-obj">
          <SceneMedia src={`${A}/stubobj-cut.png`} alt="Torn concert ticket stub" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.44]} from={{ scale: 1.4, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="b6-copy">
          <span className="rb-eyebrow">on tour</span>
          <h2>Get in<br /><em>the pit.</em></h2>
        </Layer>
        <div className="b6-cta">
          <p>Aftermath Tour — small rooms, loud nights. Tickets move fast.</p>
          <a href="#" onClick={stop} className="rb-btn">Grab tickets <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="rb-foot">
        <div className="rb-foot-top"><b>FERAL</b><p>Live or not at all. No click track, no laptop, no safety net.</p></div>
        <div className="rb-foot-legal"><span>FERAL — a live band</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
