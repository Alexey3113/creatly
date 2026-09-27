"use client";
/* Концепт 22 — JPRESTAURANT «結 YUI». Рафинированный омакасе (правильное японское фото, не аниме). Sumi+washi+vermilion-hanko, negative-space минимализм, brush-enso мотив, вертикальный tategaki-титул 結, итамаэ за стойкой поверх титула, hero-dish flying card (нигири), красная ханко-печать. Типо-персона: Shippori Mincho + Noto Sans JP + DM Mono. Hero-приём: negative-space + enso + tategaki. Отличие от jpclub/jptattoo/anime.
   Сквозная архитектура (аудит 2026-09): сцены — станции одной стойки. Актёр 1 — печать 結 (ханко) от hero до большой печати
   финала; актёр 2 — стойка хиноки (fixed-полоса S3–S5): текстура едет вдоль стойки от скролла (Follow --run), курсы
   ставятся на неё тарелками по очереди (--p1..--p5). Стыки: S1→S2 и S5→S6 — норэн опускается и раздвигается;
   S2→S3 и S4→S5 — горизонтальная панорама (старая станция уезжает влево, новая въезжает справа); S3→S4 — перекрытие. */
const PLATES = [
  { v: "--p1", src: "g2.jpg", pos: "50% 60%", left: "12%" },
  { v: "--p2", src: "g1.jpg", pos: "72% 40%", left: "30%" },
  { v: "--p3", src: "dish.jpg", pos: "50% 50%", left: "48%" },
  { v: "--p4", src: "g1.jpg", pos: "28% 62%", left: "66%" },
  { v: "--p5", src: "g4.jpg", pos: "40% 70%", left: "84%" },
];

function Noren({ tone }: { tone: "indigo" | "washi" }) {
  return (
    <div className={`jr-noren jr-noren-${tone}`} aria-hidden>
      <i className="jr-nl"><b>結</b></i>
      <i className="jr-nr"><b>結</b></i>
    </div>
  );
}
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere, Follow } from "@/components/scene-kit";
import "./jprestaurant.css";

const A = "/uploads/1/hooks/sites/anim/jprestaurant";
const stop = (e: React.MouseEvent) => e.preventDefault();

function Enso() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden>
      <path d="M352 132 A168 168 0 1 0 366 250" />
    </svg>
  );
}

export function JpRestaurantSite() {
  return (
    <div className="jr-site">
      <Atmosphere stops={[
        { at: ".jr3-scene", color: "#1c1913", anchor: 0.5 },
        { at: ".jr4-scene", color: "#22150f", anchor: 0.5 },
        { at: ".jr5-scene", color: "#1a1712", anchor: 0.5 },
      ]} />
      {/* АКТЁР 2 — стойка хиноки: станции S3–S5 стоят на ней; курсы ставятся по очереди */}
      <Actor className="jr-counter" width="100vw" zIndex={19} bob={0} tilt={0} stops={[
        { at: ".jr2-scene", anchor: 0.55, pose: { x: 50, y: 106, o: 0 } },
        { at: ".jr3-scene", anchor: 0.3, pose: { x: 50, y: 91, o: 1 } },
        { at: ".jr5-scene", anchor: 0.62, pose: { x: 50, y: 91, o: 1 } },
        { at: ".jr6-scene", anchor: 0.36, pose: { x: 50, y: 108, o: 0 } },
      ]}>
        <div className="jr-cnt">
          {PLATES.map((pl) => (
            <i key={pl.v} className="jr-plate" style={{ left: pl.left, ["--pv" as string]: `var(${pl.v},0)` }}>
              <img src={`${A}/${pl.src}`} alt="" loading="lazy" style={{ objectPosition: pl.pos }} />
            </i>
          ))}
        </div>
      </Actor>
      <Follow target=".jr-counter" stops={[
        { at: ".jr-hero", anchor: 0.2, vars: { "--run": 0, "--p1": 0, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.26, vars: { "--run": 40, "--p1": 0, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.4, vars: { "--run": 52, "--p1": 1, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.45, vars: { "--run": 56, "--p1": 1, "--p2": 1, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.5, vars: { "--run": 60, "--p1": 1, "--p2": 1, "--p3": 1, "--p4": 0, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.55, vars: { "--run": 64, "--p1": 1, "--p2": 1, "--p3": 1, "--p4": 1, "--p5": 0 } },
        { at: ".jr3-scene", anchor: 0.6, vars: { "--run": 68, "--p1": 1, "--p2": 1, "--p3": 1, "--p4": 1, "--p5": 1 } },
        { at: ".jr4-scene", anchor: 0.34, vars: { "--run": 88, "--p1": 0, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr5-scene", anchor: 0.3, vars: { "--run": 150, "--p1": 0, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
        { at: ".jr6-scene", anchor: 0.5, vars: { "--run": 190, "--p1": 0, "--p2": 0, "--p3": 0, "--p4": 0, "--p5": 0 } },
      ]} />
      {/* АКТЁР 1 — печать 結 */}
      <Actor className="jr-sealA" width="4.5vw" zIndex={26} bob={3} tilt={0.04} stops={[
        { at: ".jr-hero", anchor: 0.18, pose: { x: 6, y: 66.4, s: 1, r: -4 } },
        { at: ".jr-hero", anchor: 0.55, pose: { x: 6.5, y: 63, s: 1.12, r: -8 } },
        { at: ".jr2-scene", anchor: 0.5, pose: { x: 77.5, y: 45, s: 0.85, r: -10 } },
        { at: ".jr3-scene", anchor: 0.52, pose: { x: 81, y: 21, s: 0.95, r: 6 } },
        { at: ".jr4-scene", anchor: 0.5, pose: { x: 69, y: 29, s: 1.05, r: -6 } },
        { at: ".jr5-scene", anchor: 0.52, pose: { x: 91, y: 27, s: 0.95, r: 4 } },
        { at: ".jr6-scene", anchor: 0.52, pose: { x: 62, y: 50, s: 2.78, r: -4 } },
        { at: ".jr-foot", anchor: 0.25, pose: { x: 62, y: 16, s: 2.6, r: -4, o: 0 } },
      ]}>
        <div className="jr-seal"><span>結</span></div>
      </Actor>
      <header className="jr-head">
        <Link href="/visual-hooks" className="jr-brand"><i>結</i> YUI</Link>
        <nav className="jr-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Omakase</a><a href="#" onClick={stop}>The counter</a>
          <a href="#" onClick={stop}>Sake</a><a href="#" onClick={stop} className="jr-book">Reserve</a>
        </nav>
      </header>

      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={8} className="jr-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="jr-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="jr-scrim" aria-hidden />
        <div className="jr-lantern" aria-hidden />

        <Layer z={2} depth={0.2} phase={[0.02, 0.3]} from={{ scale: 0.92, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "0deg", opacity: 1 }} cursor={{ x: 12, y: 8 }} className="jr-enso">
          <Enso />
        </Layer>

        <Layer z={3} depth={0.28} phase={[0.02, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -10, y: -6 }} className="jr-title">
          <span className="jr-kanji">結</span>
        </Layer>

        <Layer z={4} depth={0.55} phase={[0.05, 0.3]} from={{ x: "-19vw", y: "10vh", rotate: "-7deg", opacity: 0 }} to={{ x: "-15vw", y: "4vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: 26, y: 16 }}>
          <div className="jr-dish jr-d1"><span className="jr-steam" aria-hidden><i /><i /><i /></span><SceneMedia src={`${A}/dish.jpg`} alt="Plate of fresh sushi" /><b>本日の握り · today</b></div>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.3]} from={{ y: "16vh", scale: 0.98, opacity: 0 }} to={{ y: "10vh", scale: 1.03, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="jr-chef">
          <SceneMedia src={`${A}/chef-cut.png`} alt="Sushi chef at the counter" />
        </Layer>
        <div className="jr-grain" aria-hidden />

        <div className="jr-romaji">YUI · OMAKASE</div>
        <div className="jr-sub">十二席の握り、その日の海のままに — <em>一期一会</em></div>
        <div className="jr-tag jr-tl">OMAKASE · 12 SEATS</div>
        <div className="jr-tag jr-bl"><b>一</b><span>the counter</span></div>
        <div className="jr-cue" aria-hidden>reserve a seat</div>
      </ParallaxScene>

      {/* S2 — THE COUNTER (chef + dish + enso · foreground-parallax, negative space) */}
      <ParallaxScene heightVh={300} overlapVh={90} parallax={8} className="jr-scene jr2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.16 }} to={{ y: "2vh", scale: 1.04 }} cursor={{ x: -4, y: -3 }} className="jr2-bg">
          <SceneMedia src={`${A}/g3.jpg`} alt="The itamae placing a piece of nigiri" />
        </Layer>
        <div className="jr2-veil" aria-hidden />
        <div className="jr2-enso" aria-hidden />
        <div className="jr2-kanji" aria-hidden>結</div>
        <Layer z={7} depth={0.5} phase={[0.26, 0.42]} from={{ y: "6vh", rotate: "5deg", opacity: 0 }} to={{ y: "0vh", rotate: "2deg", opacity: 1 }} cursor={{ x: -18, y: -11 }} className="jr2-cardL">
          <div className="jr2-card"><span className="jr-steam" aria-hidden><i /><i /><i /></span><SceneMedia src={`${A}/dish.jpg`} alt="Plate of fresh sushi" /><b><span className="jr-jp">本日の握り</span>· today</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.3, 0.44]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr2-copy">
          <span className="jr-eyebrow">01 — omakase</span>
          <h2>Whatever the sea<br /><em>gave us that morning.</em></h2>
          <p>A single hinoki counter and a set omakase — no menu, no choices, just the day's catch shaped one piece at a time and passed straight to your hand. Ichigo ichie.</p>
        </Layer>
        <Noren tone="indigo" />
      </ParallaxScene>

      {/* S3 — THE COURSES (omakase served in order · rows placed from the chef's side, rules drawn by --lp) */}
      <ParallaxScene heightVh={300} overlapVh={70} parallax={8} className="jr-scene jr3-scene">
        <div className="jr3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.3]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 0.9 }} className="jr3-kanji"><span>膳</span></Layer>
        <Layer z={12} depth={0.24} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jr3-copy">
          <span className="jr-eyebrow">02 — お品書き</span>
          <h2>Served in order, <em>one at a time.</em></h2>
        </Layer>
        {/* five courses, placed from the counter one after another */}
        <Layer z={6} depth={0.3} phase={[0.3, 0.4]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr1">
          <div className="jr3-row"><span className="jr3-no">一</span><div className="jr3-thumb"><SceneMedia src={`${A}/g1.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">先付</span>Sakizuke</b><s>the morning's local catch, lightly dressed</s></div></div>
        </Layer>
        <Layer z={6} depth={0.34} phase={[0.35, 0.45]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr2">
          <div className="jr3-row"><span className="jr3-no">二</span><div className="jr3-thumb"><SceneMedia src={`${A}/g2.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">刺身</span>Sashimi</b><s>three cuts, aged to their own day</s></div></div>
        </Layer>
        <Layer z={6} depth={0.38} phase={[0.4, 0.5]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr3">
          <div className="jr3-row"><span className="jr3-no">三</span><div className="jr3-thumb"><SceneMedia src={`${A}/g3.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">炙り</span>Aburi</b><s>seared over binchōtan, a breath of smoke</s></div></div>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.45, 0.55]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr4">
          <div className="jr3-row"><span className="jr3-no">四</span><div className="jr3-thumb"><SceneMedia src={`${A}/g4.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">握り</span>Nigiri</b><s>the chef's run, piece by piece to your hand</s></div></div>
        </Layer>
        <Layer z={6} depth={0.46} phase={[0.5, 0.6]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr5">
          <div className="jr3-row"><span className="jr3-no">五</span><div className="jr3-thumb"><SceneMedia src={`${A}/g5.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">椀物</span>Wanmono</b><s>a clear dashi to close, warm sake beside</s></div></div>
        </Layer>
      </ParallaxScene>

      {/* S4 — 一期一会 (the way · data, washi) */}
      <ParallaxScene heightVh={280} overlapVh={60} parallax={8} className="jr-scene jr4-scene">
        <div className="jr4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jr4-head">
          <span className="jr-eyebrow">03 — 一期一会</span><h2>This meal, <em>this once.</em></h2>
        </Layer>
        {/* энсо (円相) прорисовывается кистью по --lp, три «пути» проявляются внутри */}
        <Layer z={12} depth={0.3} phase={[0.2, 0.8]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="jr4-wayL">
          <div className="jr4-way">
            <svg className="jr4-enso2" viewBox="0 0 400 400" aria-hidden><circle cx="200" cy="200" r="150" pathLength={100} /></svg>
            <div className="jr4-steps2">
              <div className="jr4-step2" style={{ ["--thr" as string]: 0.30 }}><i>一</i><b>One counter</b><s>twelve seats of hinoki, close enough to watch every cut</s></div>
              <div className="jr4-step2" style={{ ["--thr" as string]: 0.48 }}><i>二</i><b>No menu</b><s>you eat what the market gave us — tell us only what you cannot</s></div>
              <div className="jr4-step2" style={{ ["--thr" as string]: 0.66 }}><i>三</i><b>One evening</b><s>two seatings a night, a month's wait for a seat</s></div>
            </div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — GUESTS (kifuda · guest words on wooden 木札 hung from a rail, drop + sway to rest) */}
      <ParallaxScene heightVh={350} overlapVh={70} parallax={10} className="jr-scene jr5-scene">
        <div className="jr5-bg" aria-hidden />
        <div className="jr5-enso" aria-hidden />
        <div className="jr5-rail" aria-hidden />
        <Layer z={16} depth={0} phase={[0.24, 0.32]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="jr5-eyebrow">guests · 御客様</div></Layer>
        <Layer z={5} depth={0.3} phase={[0.24, 0.36]} from={{ y: "-7vh", rotate: "-8deg", opacity: 0 }} to={{ y: "0vh", rotate: "-2deg", opacity: 1 }} className="jr5-fuda jr5-f1">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>The warm rice against cold fish — I finally understood what everyone means.</p><cite>Kenji T. · Tokyo</cite></div></figure>
        </Layer>
        <Layer z={6} depth={0.46} phase={[0.28, 0.4]} from={{ y: "-8vh", rotate: "7deg", opacity: 0 }} to={{ y: "0vh", rotate: "1.5deg", opacity: 1 }} className="jr5-fuda jr5-f2">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>No menu, no choices, and the best meal of the year.</p><cite>Elena &amp; Marc · Paris</cite></div></figure>
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.32, 0.44]} from={{ y: "-7vh", rotate: "-6deg", opacity: 0 }} to={{ y: "0vh", rotate: "-1.5deg", opacity: 1 }} className="jr5-fuda jr5-f3">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>We didn't speak for an hour.</p><cite>Aiko N. · Osaka</cite></div></figure>
        </Layer>
      </ParallaxScene>

      {/* S6 — RESERVE (hanko + dish + CTA · object) */}
      <ParallaxScene heightVh={260} overlapVh={90} parallax={8} className="jr-scene jr6-scene">
        <div className="jr6-bg" aria-hidden />
        <Layer z={1} depth={0.1} from={{ scale: 1.12 }} to={{ y: "2vh", scale: 1.03 }} className="jr6-seat">
          <SceneMedia src={`${A}/g5.jpg`} alt="An empty place set at the hinoki counter" />
        </Layer>
        <div className="jr6-veil" aria-hidden />
        <div className="jr6-enso" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.5, 0.62]} from={{ scale: 0.94, rotate: "-3deg", opacity: 0 }} to={{ scale: 1, rotate: "0deg", opacity: 1 }} className="jr6-copy">
          <span className="jr-eyebrow">reservations</span>
          <h2>Sit at the<br /><em>counter.</em></h2>
        </Layer>
        <div className="jr6-cta">
          <p>Two seatings a night, booked a month ahead. Leave the evening to the chef.</p>
          <a href="#" onClick={stop} className="jr-btn">Reserve a seat <i>↗</i></a>
        </div>
        <Noren tone="washi" />
      </ParallaxScene>

      <footer className="jr-foot">
        <div className="jr-foot-top"><b>結 YUI</b><p>Omakase at a single hinoki counter. Ichigo ichie.</p></div>
        <div className="jr-foot-legal"><span>Sushi Yui</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
