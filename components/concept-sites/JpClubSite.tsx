"use client";
/* Концепт 19 — JPCLUB «YORU 夜». Японский ночной клуб, жёсткий движ. Розово-чёрный duotone-манга, тату-фигура, гигантский кандзи 夜, плотная japanese editorial-рамка (боксы/штрихкод), halftone. Hero-приём: dense manga-zine frame. Типо-персона: bold + Noto Sans JP.
   Сквозная архитектура (аудит 2026-09): hero собран в покое, мигает неон 夜, рябит вода, падают лепестки.
   Актёр — тории: нарисованные врата hero → ближе в S2 → камера проходит СКВОЗЬ проём (стык: зум в проём + маска проёма,
   S1→S2 и S2→S3) → неоновые врата: столбы-рельсы расписания (S4) → врата в конце переулка (S5) → сквозь них (S5→S6) → дверь клуба (S6).
   Луна (Follow) катится по небу S3→S6. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./jpclub.css";

const A = "/uploads/1/hooks/sites/anim/jpclub";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 280, H3 = 280, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);
const OVR = OV / (H5 - 100); // доля прогресса сцены, занятая перекрытием (0.333)

// неоновые тории (viewBox 200×170; проём x 58..142, y 48..170)
function Torii() {
  const d = "M2 8 Q100 22 198 8 L194 21 Q100 33 6 21 Z M16 25 H184 V31 H16 Z M95 31 H105 V40 H95 Z M20 40 H180 V48 H20 Z M46 31 H58 V170 H46 Z M142 31 H154 V170 H142 Z";
  return (
    <svg className="jc-torii" viewBox="0 0 200 170" preserveAspectRatio="none" aria-hidden>
      <path d={d} className="g" vectorEffect="non-scaling-stroke" />
      <path d={d} className="l" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function JpClubSite() {
  return (
    <div className="jc-site">
      <Actor className="jc-gate" width="30vw" zIndex={30} bob={0} tilt={0} stops={[
        { at: ".j3-scene", anchor: a3(0.74), pose: { x: 50, y: 80, s: 5.4, o: 0 } },
        { at: ".j4-scene", anchor: a4(0.34), pose: { x: 50, y: 80, s: 4.67, o: 1 } },
        { at: ".j4-scene", anchor: a4(0.667), pose: { x: 50, y: 80, s: 4.67, o: 1 } },
        { at: ".j5-scene", anchor: a5(0.34), pose: { x: 50, y: 41, s: 0.42, o: 1 } },
        { at: ".j5-scene", anchor: a5(1 - OVR), pose: { x: 50, y: 41, s: 0.42, o: 1 } },
        { at: ".j6-scene", anchor: a6(OVR), pose: { x: 50, y: 41, s: 12, o: 1 } },
        { at: ".j6-scene", anchor: a6(0.38), pose: { x: 50, y: 41, s: 12, o: 0 } },
        { at: ".j6-scene", anchor: a6(0.46), pose: { x: 50, y: 60, s: 3.33, o: 0 } },
        { at: ".j6-scene", anchor: a6(0.58), pose: { x: 50, y: 60, s: 3.33, o: 1 } },
        { at: ".jc-foot", anchor: 0, pose: { x: 50, y: 60, s: 3.33, o: 0 } },
      ]}><Torii /></Actor>
      {/* S5→S6: маска проёма растёт синхронно с актёром (те же якоря) */}
      <Follow stops={[{ at: ".j5-scene", anchor: a5(1 - OVR), vars: { "--g6": 0 } }, { at: ".j6-scene", anchor: a6(OVR), vars: { "--g6": 1 } }]} />
      {/* луна катится по небу через клубные сцены */}
      <Follow unit="%" stops={[
        { at: ".j3-scene", vars: { "--mx": 82, "--my": 20 } },
        { at: ".j4-scene", vars: { "--mx": 70, "--my": 24 } },
        { at: ".j6-scene", vars: { "--mx": 13, "--my": 15 } },
      ]} />
      <Weather kind="petals" count={16} color="#ff77aa" color2="#ffd6e6" zIndex={29} world={0.5} seed={19} between={[".jc-hero", ".j3-scene"]} />
      <header className="jc-head">
        <Link href="/visual-hooks" className="jc-brand">YORU · 夜</Link>
        <nav className="jc-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Nights</a><a href="#" onClick={stop}>Floor</a>
          <a href="#" onClick={stop}>Rules</a><a href="#" onClick={stop} className="jc-list">Guest list</a>
        </nav>
      </header>

      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={10} className="jc-hero">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ y: "3vh", scale: 1.16 }} cursor={{ x: -7, y: -5 }} className="jc-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="jc-ripple" aria-hidden />
        <div className="jc-half" aria-hidden />

        <Layer z={3} depth={0.3} phase={[0, 0.3]} from={{ x: "6vw", scale: 0.9, opacity: 0 }} to={{ x: "0vw", scale: 1, opacity: 1 }} cursor={{ x: -16, y: -10 }} className="jc-kanji">
          <span>夜</span>
        </Layer>

        <Layer z={5} depth={0.55} phase={[0, 0.34]} from={{ y: "10vh", scale: 0.92, opacity: 0 }} to={{ y: "0vh", scale: 1.02, opacity: 1 }} cursor={{ x: 18, y: 12 }} fit="contain" position="center bottom" className="jc-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Figure in neon club light" />
        </Layer>

        <Layer z={8} depth={1} phase={[0, 1]} from={{ y: "-8vh", x: "4vw", rotate: "6deg", opacity: 0.5 }} to={{ y: "6vh", x: "-2vw", rotate: "-4deg", opacity: 1 }} cursor={{ x: 44, y: 30 }} fit="contain" className="jc-petals">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>
        <div className="jc-grain" aria-hidden />

        {/* плотная japanese editorial-рамка */}
        <Layer z={12} depth={0.16} phase={[0, 0.3]} from={{ x: "-5vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jc-boxwrap jc-left">
          <div className="jc-box jc-vbox"><span className="jc-jp">東京・夜</span></div>
          <div className="jc-box"><b>東京・夜</b><span>TOKYO · NIGHT</span><i className="jc-hz" /></div>
          <div className="jc-box"><b>日本製</b><span>MADE IN JAPAN ⊕</span></div>
          <p className="jc-motto"><span className="jc-jp">美しさは儚く、<br />意志は永遠。</span>BEAUTY IS FLEETING,<br />WILL IS ETERNAL.</p>
        </Layer>

        <div className="jc-tr-block">
          <span className="jc-jp jc-big2">夜</span>
          <b>TOKYO AFTER DARK</b>
          <span className="jc-small">散っても、美しい。</span>
        </div>
        <div className="jc-br-block">
          <b>EST. 2024</b><span className="jc-yujin">YORU</span><span className="jc-jp">東京クルー</span>
          <div className="jc-barcode" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <span className="jc-small">TOKYO NIGHT RUNNERS</span>
        </div>
        <div className="jc-bl-block"><b>入場 · ENTRY</b><span className="jc-jp">走りは芸術だ</span><span className="jc-small">THE FLOOR IS AN ART</span></div>
        <div className="jc-cue" aria-hidden>enter the night</div>
      </ParallaxScene>

      {/* S2 — THE NIGHT (torii + figure + petals · foreground-parallax) */}
      <ParallaxScene heightVh={H2} overlapVh={OV} className="jc-scene j2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="j2-bg">
          <SceneMedia src={`${A}/toriibg.jpg`} />
        </Layer>
        <div className="j2-half" aria-hidden />
        <div className="j2-veil" aria-hidden />
        <div className="j2-kanji" aria-hidden>夜</div>
        <Layer z={5} depth={0.5} phase={[0.04, 0.3]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="j2-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Figure in neon club light" />
        </Layer>
        <Layer z={9} depth={0.78} from={{ y: "-3vh", x: "2vw" }} to={{ y: "2vh", x: "-2vw" }} cursor={{ x: 30, y: 16 }} className="j2-fg">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>
        <div className="j2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="j2-copy">
          <span className="jc-eyebrow">01 — 夜 · the night</span>
          <h2>Loud, low,<br /><em>lit in pink.</em></h2>
          <p>Underground Tokyo-style nights: hard low-end, no phones on the floor, and a door that turns away anyone who came to watch instead of move.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE FLOOR (manga panels · cards) */}
      <ParallaxScene heightVh={H3} overlapVh={OV} className="jc-scene j3-scene">
        <div className="j3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0, 0.3]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="j3-word"><span>踊</span></Layer>
        {/* манга-страница: панели проявляются в порядке чтения · panel-pop */}
        <Layer z={5} depth={0.3} phase={[0.04, 0.2]} from={{ scale: 0.95, opacity: 0 }} to={{ scale: 1, opacity: 1 }}>
          <div className="j3-panel j3-p1"><SceneMedia src={`${A}/g1.jpg`} /><b><span>床</span>the floor</b></div>
        </Layer>
        <Layer z={6} depth={0.36} phase={[0.1, 0.26]} from={{ scale: 0.95, opacity: 0 }} to={{ scale: 1, opacity: 1 }}>
          <div className="j3-panel j3-p2"><SceneMedia src={`${A}/g2.jpg`} /><b><span>音</span>the booth</b></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.16, 0.32]} from={{ scale: 0.95, opacity: 0 }} to={{ scale: 1, opacity: 1 }}>
          <div className="j3-panel j3-p3"><SceneMedia src={`${A}/g5.jpg`} /><b><span>踊</span>till light</b></div>
        </Layer>
        <Layer z={8} depth={0.48} phase={[0.22, 0.38]} from={{ scale: 0.95, opacity: 0 }} to={{ scale: 1, opacity: 1 }}>
          <div className="j3-panel j3-p4"><SceneMedia src={`${A}/g4.jpg`} /><b><span>酒</span>the bar</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.2, 0.4]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="j3-copy">
          <span className="jc-eyebrow">02 — the floor</span>
          <h2>Lit in <em>pink</em> till light.</h2>
          <p>No phones on the floor — so these are the only photos there are.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE NIGHTS (line-up · data) */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="jc-scene j4-scene">
        <div className="j4-bg" aria-hidden />
        <div className="j4-half" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.12, 0.32]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="j4-head">
          <span className="jc-eyebrow">03 — 夜 · the nights</span><h2>Fridays &amp; <em>Saturdays.</em></h2>
        </Layer>
        {/* каждый вечер — трек в деке: неоновый уровень-бар заполняется по --lp */}
        <Layer z={12} depth={0.3} phase={[0.14, 0.5]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="j4-deckL">
          <div className="j4-deck">
            <div className="j4-night" style={{ ["--thr" as string]: 0.03 }}><time>FRI 03</time><b><span>低</span>Low End</b><div className="j4-meter"><span className="j4-fill" /></div><em className="j4-bpm">128 BPM</em><em className="on">list</em></div>
            <div className="j4-night" style={{ ["--thr" as string]: 0.18 }}><time>SAT 04</time><b><span>客</span>Guest — TBA</b><div className="j4-meter"><span className="j4-fill" /></div><em className="j4-bpm">130 BPM</em><em className="on">list</em></div>
            <div className="j4-night" style={{ ["--thr" as string]: 0.33 }}><time>FRI 10</time><b><span>皿</span>Vinyl Only</b><div className="j4-meter"><span className="j4-fill" /></div><em className="j4-bpm">124 BPM</em><em className="on">list</em></div>
            <div className="j4-night" style={{ ["--thr" as string]: 0.48 }}><time>SAT 11</time><b><span>朝</span>Till Morning</b><div className="j4-meter"><span className="j4-fill" /></div><em className="j4-bpm">132 BPM</em><em>full</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — ON THE FLOOR (reviews · bg+text) */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="jc-scene j5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="j5-bg">
          <SceneMedia src={`${A}/citybg.jpg`} />
        </Layer>
        <div className="j5-half" aria-hidden />
        <div className="j5-veil" aria-hidden />
        <div className="j5-eyebrow">on the floor</div>
        {/* неоновые вывески: проявляются + неоновый фликер · neon-buzz */}
        <Layer z={6} depth={0.28} phase={[0.14, 0.3]} from={{ y: "2vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="j5-neon j5-n1">
          <div><span className="j5-jp">音</span><p>No phones, no posers, just the low end. Danced till the shutters went up.</p><cite>Yuki · regular</cite></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.2, 0.36]} from={{ y: "2vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="j5-neon j5-n2">
          <div><span className="j5-jp">扉</span><p>The door turns away anyone who came to watch. The floor is better for it.</p><cite>Marco · first night</cite></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.26, 0.42]} from={{ y: "2vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="j5-neon j5-n3">
          <div><span className="j5-jp">重</span><p>You feel it before you hear it.</p><cite>Aya · resident's guest</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — THE LIST (giant kanji + CTA · object) */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="jc-scene j6-scene">
        <div className="j6-bg" aria-hidden />
        <div className="j6-half" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.02, 0.55]} from={{ scale: 0.82, rotate: "-9deg", opacity: 0 }} to={{ scale: 1, rotate: "0deg", opacity: 1 }} cursor={{ x: 12, y: 9 }} className="j6-kanji"><span>入</span></Layer>
        <Layer z={12} depth={0.24} phase={[0.3, 0.48]} from={{ scale: 0.9, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="j6-copy">
          <span className="jc-eyebrow">入場 · guest list</span>
          <h2>Get on<br /><em>the list.</em></h2>
        </Layer>
        <div className="j6-cta">
          <p>Fridays &amp; Saturdays, doors at eleven. Small room, real crowd.</p>
          <a href="#" onClick={stop} className="jc-btn">Request guest list <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="jc-foot">
        <div className="jc-foot-top"><b>YORU · 夜</b><p>Tokyo-style nights. Loud, low, lit in pink.</p></div>
        <div className="jc-foot-legal"><span>Yoru Nightclub</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
