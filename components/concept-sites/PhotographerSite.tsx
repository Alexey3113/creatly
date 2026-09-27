"use client";
/* Концепт 17 — PHOTOGRAPHER «NORTHLIGHT». Выездной фотограф на локациях. Bone+graphite+burnt-orange, film contact-sheet: летящие кадры-полароиды (flying cards) + viewfinder focus-скобки + EXIF/REC-детали, заголовок слева. Типо-персона: Space Grotesk + DM Mono. Hero-приём: viewfinder / contact-sheet.
   Сквозная архитектура (аудит 2026-09): одна дуга золотого часа — полдень на бумаге → золотое поле → янтарь индекса → сумерки → ночь.
   Актёр — блик золотого часа (DOM-актёр): лицо → полароиды → садится солнцем в поле → подсвечивает индекс → контровой свет отзывов → бликует в объективе.
   Стыки: S1→S2 перекрытие (та же бумага); S2→S3 «снимок растёт в кадр» (полароид поля становится фоном S3);
   S3→S4 затвор-диафрагма (6 лепестков закрывают поле и открывают индекс); S4→S5 и S5→S6 — перекрытие с грейдом. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere } from "@/components/scene-kit";
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

      {/* фон как сюжет: тон сцен без собственных плит едет по дуге золотого часа */}
      <Atmosphere stops={[
        { at: ".p2-scene", color: "#e9dfce", anchor: 0.5 },
        { at: ".p3-scene", color: "#8a5a2b", anchor: 0.5 },
        { at: ".p4-scene", color: "#5a3818", anchor: 0.55 },
        { at: ".p5-scene", color: "#2a1b0c", anchor: 0.5 },
        { at: ".p6-scene", color: "#150e06", anchor: 0.5 },
      ]} />

      {/* АКТЁР — блик золотого часа */}
      <Actor className="pg-flare-actor" width="26vw" zIndex={20} bob={5} tilt={0.04} stops={[
        { at: ".pv-hero", anchor: 0.2, pose: { x: 63, y: 24, s: 1, o: 0.95 } },
        { at: ".pv-hero", anchor: 0.52, pose: { x: 80, y: 47, s: 1.1, o: 1 } },
        { at: ".p2-scene", anchor: 0.42, pose: { x: 56, y: 36, s: 0.85, o: 0.9 } },
        { at: ".p2-scene", anchor: 0.68, pose: { x: 69, y: 58, s: 0.6, o: 0.9 } },
        { at: ".p3-scene", anchor: 0.5, pose: { x: 73, y: 15, s: 1.25, o: 1 } },
        { at: ".p4-scene", anchor: 0.46, pose: { x: 30, y: 46, s: 0.8, o: 0.9 } },
        { at: ".p4-scene", anchor: 0.7, pose: { x: 70, y: 64, s: 0.8, o: 0.9 } },
        { at: ".p5-scene", anchor: 0.5, pose: { x: 71, y: 12, s: 1.5, o: 1 } },
        { at: ".p6-scene", anchor: 0.55, pose: { x: 82, y: 53, s: 0.42, o: 1 } },
        { at: ".pg-foot", anchor: 0.3, pose: { x: 82, y: 53, s: 0.2, o: 0 } },
      ]}>
        <div className="pg-flare"><i /><i /><i /></div>
      </Actor>

      {/* S1 — HERO: собран при загрузке (rest), сборка-интро 1.2 с */}
      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={10} className="pg-hero pv-hero">
        <div className="pv-paper" aria-hidden />

        {/* портрет-обложка справа */}
        <Layer z={2} depth={0.12} from={{ scale: 1.04 }} to={{ y: "1.5vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="pv-portrait">
          <SceneMedia src={`${A}/coverportrait.jpg`} alt="Portrait photograph" />
        </Layer>
        <div className="pv-fade" aria-hidden />
        <div className="pv-glow" aria-hidden />

        {/* гигантский аутлайн-титул поверх лица */}
        <Layer z={4} depth={0.34} phase={[0.02, 0.3]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -11, y: -6 }} className="pv-name">
          <span>L</span><span>I</span><span>G</span><span>H</span><span>T</span>
        </Layer>

        {/* полароиды-кадры слева снизу: влетают при загрузке, при скролле — поднимаются к следующей сцене */}
        <Layer z={7} depth={0.5} phase={[0.04, 0.3]} from={{ x: "-4vw", y: "10vh", rotate: "-12deg", opacity: 0 }} to={{ x: "0vw", y: "0vh", rotate: "-6deg", opacity: 1 }} cursor={{ x: 22, y: 13 }} className="pv-polaL">
          <Layer depth={0} phase={[0.55, 1]} from={{}} to={{ x: "4vw", y: "-14vh", rotate: "4deg" }} className="pv-pola pv-p1">
            <div className="pv-shot"><SceneMedia src={`${A}/shot2.jpg`} alt="Golden-hour couple photograph" /></div>
          </Layer>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.08, 0.34]} from={{ x: "4vw", y: "14vh", rotate: "12deg", opacity: 0 }} to={{ x: "3vw", y: "2vh", rotate: "4deg", opacity: 1 }} cursor={{ x: -18, y: -11 }} className="pv-polaL">
          <Layer depth={0} phase={[0.5, 1]} from={{}} to={{ x: "9vw", y: "-22vh", rotate: "-5deg" }} className="pv-pola pv-p2">
            <div className="pv-shot pv-shot-b"><SceneMedia src={`${A}/shot1.jpg`} alt="Backlit portrait photograph" /></div>
          </Layer>
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
        <div className="pv-exif"><i className="pv-rec" />ƒ/1.8 · 1/250 · ISO 200 — 35mm · natural light</div>
        <div className="pv-cue">see the work ↓</div>
      </ParallaxScene>

      {/* S2 — SELECTED WORK: полароиды раздаются, пока сцена проявляется поверх hero (та же бумага) */}
      <ParallaxScene heightVh={320} overlapVh={60} parallax={12} className="pg-scene p2-scene">
        <div className="p2-bg" aria-hidden />
        <Layer z={16} depth={0.16} phase={[0.2, 0.32]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p2-headL">
          <div className="p2-head"><span className="pg-eyebrow">01 — selected work</span><h2>A year in <em>golden light.</em></h2></div>
        </Layer>
        <Layer z={4} depth={0.4} phase={[0, 0.22]} from={{ x: "-30vw", y: "8vh", rotate: "-14deg", opacity: 0 }} to={{ x: "-26vw", y: "-3vh", rotate: "-5deg", opacity: 1 }} cursor={{ x: 24, y: 14 }}>
          <div className="p2-card p2-a"><SceneMedia src={`${A}/g1.jpg`} /><b>001 · backlit</b></div>
        </Layer>
        <Layer z={6} depth={0.55} phase={[0.04, 0.26]} from={{ x: "30vw", y: "-2vh", rotate: "12deg", opacity: 0 }} to={{ x: "30vw", y: "-22vh", rotate: "4deg", opacity: 1 }} cursor={{ x: -26, y: -15 }}>
          <div className="p2-card p2-b"><SceneMedia src={`${A}/g3.jpg`} /><b>014 · the coast path</b></div>
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.02, 0.24]} from={{ x: "-12vw", y: "22vh", rotate: "-9deg", opacity: 0 }} to={{ x: "-11vw", y: "11vh", rotate: "-2deg", opacity: 1 }} cursor={{ x: 20, y: 12 }}>
          <div className="p2-card p2-c"><SceneMedia src={`${A}/g2.jpg`} /><b>022 · the cliff</b></div>
        </Layer>
        <Layer z={5} depth={0.45} phase={[0.06, 0.28]} from={{ x: "4vw", y: "-20vh", rotate: "9deg", opacity: 0 }} to={{ x: "6vw", y: "-15vh", rotate: "3deg", opacity: 1 }} cursor={{ x: -22, y: -13 }}>
          <div className="p2-card p2-d"><SceneMedia src={`${A}/g6.jpg`} /><b>031 · the band</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.08, 0.3]} from={{ x: "44vw", y: "20vh", rotate: "-10deg", opacity: 0 }} to={{ x: "38vw", y: "22vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: -18, y: -10 }}>
          <div className="p2-card p2-e"><SceneMedia src={`${A}/g5.jpg`} /><b>040 · first dance</b></div>
        </Layer>
        {/* кадр поля: выпрямляется к концу сцены и в стыке растёт в фон S3 (без курсора/параллакса — точка стыка стабильна) */}
        <Layer z={9} depth={0} phase={[0.1, 0.62]} from={{ x: "24vw", y: "26vh", rotate: "8deg", opacity: 0 }} to={{ x: "19vw", y: "10vh", rotate: "0deg", opacity: 1 }} className="p2-fieldL">
          <div className="p2-field"><SceneMedia src={`${A}/goldenbg.jpg`} alt="Golden-hour field photograph" /><b>052 · the field, 7:48 pm</b></div>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE APPROACH: вырастает из полароида поля (clip+scale от --ovp в css) */}
      <ParallaxScene heightVh={330} overlapVh={70} parallax={8} className="pg-scene p3-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: -5, y: -4 }} className="p3-bg">
          <SceneMedia src={`${A}/goldenbg.jpg`} />
        </Layer>
        <div className="p3-veil" aria-hidden />
        <div className="p3-grain" aria-hidden />
        <div className="p3-vf" aria-hidden />
        <div className="p3-exif">NORTHLIGHT · f/1.8 · 1/400 · ISO 200 · 35mm · GOLDEN HOUR</div>
        <Layer z={11} depth={0.2} phase={[0.3, 0.46]} from={{ scale: 1.4, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="p3-focus"><span /></Layer>
        <Layer z={12} depth={0.24} phase={[0.12, 0.36]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p3-copy">
          <span className="pg-eyebrow">02 — the approach</span>
          <h2>I don't stage the moment —<br /><em>I wait for it.</em></h2>
          <p>On your street, your coast, your kitchen at dawn. No studio, no stiff poses — just the hour when everything goes gold, a fast lens, and a few frames that feel like you.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — WHAT I SHOOT: открывается затвором-диафрагмой; индекс на янтарных сумерках */}
      <ParallaxScene heightVh={300} overlapVh={80} parallax={6} className="pg-scene p4-scene">
        <div className="p4-bg" aria-hidden />
        <div className="p4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.2, 0.4]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p4-head">
          <span className="pg-eyebrow">03 — what I shoot</span><h2>An index of <em>light.</em></h2>
        </Layer>
        {/* плёнка-контактка: кадр к каждой строке индекса проявляется вместе с ней */}
        <Layer z={10} depth={0.45} phase={[0.22, 0.62]} from={{ y: "8vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="p4-stripL">
          <div className="p4-strip" aria-hidden>
            {["g1", "g2", "g5", "g4", "g6", "g3"].map((g, i) => (
              <i key={g} style={{ ["--thr" as string]: 0.02 + i * 0.1 }}><img src={`${A}/${g}.jpg`} alt="" loading="lazy" /></i>
            ))}
          </div>
        </Layer>
        {/* каждый тип съёмки «наводится на резкость» (blur→sharp по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.22, 0.62]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="p4-indexL">
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

      {/* S5 — WORDS: сумерки в том же поле, отзывы проявляются как отпечатки */}
      <ParallaxScene heightVh={300} overlapVh={60} parallax={10} className="pg-scene p5-scene">
        <Layer z={1} depth={0.14} from={{ scale: 1.08 }} to={{ x: "-3vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="p5-bg">
          <SceneMedia src={`${A}/goldenbg.jpg`} />
        </Layer>
        <div className="p5-veil" aria-hidden />
        <Layer z={16} depth={0} phase={[0.14, 0.26]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="p5-eyebrow">words from clients</div></Layer>
        {/* кадры с EXIF-подписью + отзыв, проявляются как печать · develop-in */}
        <Layer z={5} depth={0.32} phase={[0.13, 0.29]} from={{ y: "4vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s1">
          <figure><SceneMedia src={`${A}/shot1.jpg`} alt="Backlit portrait photograph" /><figcaption><i>f/1.8 · 1/400 · ISO 200</i><p>We forgot the camera was there — then the photos undid us.</p><cite>Mara &amp; Tom · wedding</cite></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.19, 0.35]} from={{ y: "4vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s2">
          <figure><SceneMedia src={`${A}/shot2.jpg`} alt="Golden-hour couple photograph" /><figcaption><i>f/2.8 · 1/250 · ISO 400</i><p>Every frame looks like the light we actually remember.</p><cite>Priya K. · portrait session</cite></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.25, 0.41]} from={{ y: "4vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="p5-shot p5-s3">
          <figure><SceneMedia src={`${A}/shot3.jpg`} alt="Cliffside engagement photograph at dawn" /><figcaption><i>f/2.0 · 1/1000 · ISO 100</i><p>One hour on a cliff at dawn. Pictures we'll hang for life.</p><cite>Jonas &amp; Lea · engagement</cite></figcaption></figure>
        </Layer>
      </ParallaxScene>

      {/* S6 — CHASE THE LIGHT: ночь, блик садится в объектив */}
      <ParallaxScene heightVh={240} overlapVh={60} parallax={8} className="pg-scene p6-scene">
        <div className="p6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.08, 0.4]} from={{ y: "8vh", scale: 0.94, rotate: "8deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "3deg", opacity: 1 }} cursor={{ x: 18, y: 11 }} className="p6-cam">
          <SceneMedia src={`${A}/cameraobj-cut.png`} alt="Camera" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.14, 0.46]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="p6-copy">
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
