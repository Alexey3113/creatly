"use client";
/* Концепт 17 — PHOTOGRAPHER «NORTHLIGHT». Выездной фотограф на локациях. Bone+graphite+burnt-orange, film contact-sheet: летящие кадры-полароиды (flying cards) + viewfinder focus-скобки + EXIF/REC-детали, фотограф-вырезка справа поверх кадра, заголовок слева. Типо-персона: Space Grotesk + DM Mono. Hero-приём: viewfinder / contact-sheet. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./photographer.css";

const A = "/uploads/1/hooks/sites/anim/photographer";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function PhotographerSite() {
  return (
    <div className="pg-site pg-poster">
      <header className="pg-head">
        <Link href="/visual-hooks" className="pg-brand">Northlight</Link>
        <nav className="pg-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Work</a><a href="#" onClick={stop}>Sessions</a>
          <a href="#" onClick={stop}>About</a><a href="#" onClick={stop} className="pg-book">Book a session</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="pg-hero pv-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#ece6da" }}>
        <div className="pv-paper" aria-hidden />

        {/* портрет-обложка справа */}
        <Layer z={2} depth={0.12} from={{ scale: 1.04 }} to={{ y: "1.5vh", scale: 1.08 }} cursor={{ x: -5, y: -4 }} className="pv-portrait">
          <SceneMedia src={`${A}/coverportrait.jpg`} alt="Portrait photograph" />
        </Layer>
        <div className="pv-fade" aria-hidden />

        {/* гигантский аутлайн-титул поверх лица */}
        <Layer z={4} depth={0.34} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -11, y: -6 }} className="pv-name">
          <span>L</span><span>I</span><span>G</span><span>H</span><span>T</span>
        </Layer>

        {/* полароиды-кадры слева снизу */}
        <Layer z={7} depth={0.5} phase={[0.05, 0.9]} from={{ x: "-2vw", y: "4vh", rotate: "-7deg", opacity: 0 }} to={{ x: "0vw", y: "0vh", rotate: "-6deg", opacity: 1 }} cursor={{ x: 22, y: 13 }} className="pv-pola pv-p1">
          <div className="pv-shot"><SceneMedia src={`${A}/shot2.jpg`} alt="Golden-hour couple photograph" /></div>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.05, 0.9]} from={{ x: "1vw", y: "6vh", rotate: "5deg", opacity: 0 }} to={{ x: "3vw", y: "2vh", rotate: "4deg", opacity: 1 }} cursor={{ x: -18, y: -11 }} className="pv-pola pv-p2">
          <div className="pv-shot"><SceneMedia src={`${A}/shot1.jpg`} alt="Backlit portrait photograph" /></div>
        </Layer>

        <div className="pv-grain" aria-hidden />

        {/* каллиграфическая надпись */}
        <div className="pv-script">Golden<br /><em>Hour</em></div>
        {/* редакционная колонка */}
        <div className="pv-col">
          <p>On your street, your coast, your kitchen at dawn — I don't stage the moment, <b>I wait for it.</b></p>
          <p>Portraits, couples, weddings and quiet documentary, caught in the last hour of light on 35mm film.</p>
        </div>
        {/* вертикальный бренд + иссью */}
        <div className="pv-vert">NORTHLIGHT<i>on location · est. ’16</i></div>
        <div className="pv-no">N<em>o</em>24</div>
        <div className="pv-exif">ƒ/1.8 · 1/250 · ISO 200 — 35mm · natural light</div>
        <div className="pv-cue">see the work ↓</div>
      </ParallaxScene>

      {/* S2 — SELECTED WORK (scattered polaroids · cards) */}
      <ParallaxScene heightVh={290} className="pg-scene p2-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -12, color: "#2a1d0c" }}>
        <div className="p2-bg" aria-hidden />
        <div className="p2-head"><span className="pg-eyebrow">01 — selected work</span><h2>A year in <em>golden light.</em></h2></div>
        <Layer z={4} depth={0.4} phase={[0.05, 0.92]} from={{ x: "-20vw", y: "-6vh", rotate: "-6deg", opacity: 0 }} to={{ x: "-26vw", y: "-3vh", rotate: "-5deg", opacity: 1 }} cursor={{ x: 24, y: 14 }}>
          <div className="p2-card p2-a"><SceneMedia src={`${A}/g1.jpg`} /><b>001 · backlit</b></div>
        </Layer>
        <Layer z={6} depth={0.55} phase={[0.05, 0.92]} from={{ x: "18vw", y: "8vh", rotate: "5deg", opacity: 0 }} to={{ x: "24vw", y: "4vh", rotate: "4deg", opacity: 1 }} cursor={{ x: -26, y: -15 }}>
          <div className="p2-card p2-b"><SceneMedia src={`${A}/g3.jpg`} /><b>014 · the coast path</b></div>
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.05, 0.92]} from={{ x: "-6vw", y: "12vh", rotate: "-3deg", opacity: 0 }} to={{ x: "-11vw", y: "9vh", rotate: "-2deg", opacity: 1 }} cursor={{ x: 20, y: 12 }}>
          <div className="p2-card p2-c"><SceneMedia src={`${A}/g2.jpg`} /><b>022 · the cliff</b></div>
        </Layer>
        <Layer z={5} depth={0.45} phase={[0.05, 0.92]} from={{ x: "9vw", y: "-8vh", rotate: "4deg", opacity: 0 }} to={{ x: "13vw", y: "-11vh", rotate: "3deg", opacity: 1 }} cursor={{ x: -22, y: -13 }}>
          <div className="p2-card p2-d"><SceneMedia src={`${A}/g6.jpg`} /><b>031 · the band</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.05, 0.92]} from={{ x: "30vw", y: "-4vh", rotate: "-4deg", opacity: 0 }} to={{ x: "34vw", y: "-7vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: -18, y: -10 }}>
          <div className="p2-card p2-e"><SceneMedia src={`${A}/g5.jpg`} /><b>040 · first dance</b></div>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE APPROACH (golden-hour bg+text) */}
      <ParallaxScene heightVh={280} className="pg-scene p3-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#22190f" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="p3-bg">
          <SceneMedia src={`${A}/goldenbg.jpg`} />
        </Layer>
        <div className="p3-veil" aria-hidden />
        <div className="p3-grain" aria-hidden />
        <div className="p3-vf" aria-hidden />
        <div className="p3-exif">NORTHLIGHT · f/1.8 · 1/400 · ISO 200 · 35mm · GOLDEN HOUR</div>
        <Layer z={11} depth={0.2} phase={[0.05, 0.4]} from={{ scale: 1.4, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="p3-focus"><span /></Layer>
        <Layer z={12} depth={0.24} phase={[0.02, 0.5]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p3-copy">
          <span className="pg-eyebrow">02 — the approach</span>
          <h2>I don't stage the moment —<br /><em>I wait for it.</em></h2>
          <p>On your street, your coast, your kitchen at dawn. No studio, no stiff poses — just the hour when everything goes gold, a fast lens, and a few frames that feel like you.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — WHAT I SHOOT (editorial index · data) */}
      <ParallaxScene heightVh={260} className="pg-scene p4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#22190f" }}>
        <div className="p4-bg" aria-hidden />
        <div className="p4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p4-head">
          <span className="pg-eyebrow">03 — what I shoot</span><h2>An index of <em>light.</em></h2>
        </Layer>
        {/* каждый тип съёмки «наводится на резкость» (blur→sharp по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.74]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="p4-indexL">
          <div className="p4-index">
            <div className="p4-line" style={{ ["--thr" as string]: 0.02 }}><i>a</i><b>Portraits</b><s>on your street, or somewhere that means something</s></div>
            <div className="p4-line" style={{ ["--thr" as string]: 0.12 }}><i>b</i><b>Couples &amp; engagements</b><s>golden hour, no stiff poses</s></div>
            <div className="p4-line" style={{ ["--thr" as string]: 0.22 }}><i>c</i><b>Weddings</b><s>documentary, first light to last dance</s></div>
            <div className="p4-line" style={{ ["--thr" as string]: 0.32 }}><i>d</i><b>Families</b><s>real moments, not matching outfits</s></div>
            <div className="p4-line" style={{ ["--thr" as string]: 0.42 }}><i>e</i><b>Editorial &amp; brand</b><s>people and products, told like a story</s></div>
            <div className="p4-line" style={{ ["--thr" as string]: 0.52 }}><i>f</i><b>Prints &amp; albums</b><s>hand-finished, made to outlive the hard drive</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — WORDS (client voices · char) */}
      <ParallaxScene heightVh={270} className="pg-scene p5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: 13, color: "#1a1308" }}>
        <Layer z={1} depth={0.14} from={{ scale: 1.08 }} to={{ x: "-3vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="p5-bg">
          <SceneMedia src={`${A}/goldenbg.jpg`} />
        </Layer>
        <div className="p5-veil" aria-hidden />
        <div className="p5-eyebrow">words from clients</div>
        {/* кадры с EXIF-подписью + отзыв, проявляются как печать · develop-in */}
        <Layer z={5} depth={0.32} phase={[0.05, 0.42]} from={{ y: "2vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s1">
          <figure><SceneMedia src={`${A}/shot1.jpg`} alt="Backlit portrait photograph" /><figcaption><i>f/1.8 · 1/400 · ISO 200</i><p>We forgot the camera was there — then the photos undid us.</p><cite>Mara &amp; Tom · wedding</cite></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.16, 0.53]} from={{ y: "2vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s2">
          <figure><SceneMedia src={`${A}/shot2.jpg`} alt="Golden-hour couple photograph" /><figcaption><i>f/2.8 · 1/250 · ISO 400</i><p>Every frame looks like the light we actually remember.</p><cite>Priya K. · portrait session</cite></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.27, 0.64]} from={{ y: "2vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s3">
          <figure><SceneMedia src={`${A}/shot3.jpg`} alt="Cliffside engagement photograph at dawn" /><figcaption><i>f/2.0 · 1/1000 · ISO 100</i><p>One hour on a cliff at dawn. Pictures we'll hang for life.</p><cite>Jonas &amp; Lea · engagement</cite></figcaption></figure>
        </Layer>
      </ParallaxScene>

      {/* S6 — CHASE THE LIGHT (camera object + CTA) */}
      <ParallaxScene heightVh={260} className="pg-scene p6-scene">
        <div className="p6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.04, 0.5]} from={{ y: "6vh", scale: 0.96, rotate: "6deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "3deg", opacity: 1 }} cursor={{ x: 18, y: 11 }} className="p6-cam">
          <SceneMedia src={`${A}/cameraobj-cut.png`} alt="Camera" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="p6-copy">
          <span className="pg-eyebrow">sessions</span>
          <h2>Let's chase<br /><em>the light.</em></h2>
        </Layer>
        <div className="p6-cta">
          <p>Golden-hour slots book out first. Tell me the place — I'll bring the frames.</p>
          <a href="#" onClick={stop} className="pg-btn">Book a session <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="pg-foot">
        <div className="pg-foot-top"><b>Northlight</b><p>On-location photography, chasing the last hour of light.</p></div>
        <div className="pg-foot-legal"><span>Northlight Photography</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
