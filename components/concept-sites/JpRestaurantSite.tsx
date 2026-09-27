"use client";
/* Концепт 22 — JPRESTAURANT «結 YUI». Рафинированный омакасе (правильное японское фото, не аниме). Sumi+washi+vermilion-hanko, negative-space минимализм, brush-enso мотив, вертикальный tategaki-титул 結, итамаэ за стойкой поверх титула, hero-dish flying card (нигири), красная ханко-печать. Типо-персона: Shippori Mincho + Noto Sans JP + DM Mono. Hero-приём: negative-space + enso + tategaki. Отличие от jpclub/jptattoo/anime. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
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
      <header className="jr-head">
        <Link href="/visual-hooks" className="jr-brand"><i>結</i> YUI</Link>
        <nav className="jr-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Omakase</a><a href="#" onClick={stop}>The counter</a>
          <a href="#" onClick={stop}>Sake</a><a href="#" onClick={stop} className="jr-book">Reserve</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="jr-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#14120e" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="jr-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="jr-scrim" aria-hidden />

        <Layer z={2} depth={0.2} phase={[0.02, 0.6]} from={{ scale: 0.92, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "0deg", opacity: 1 }} cursor={{ x: 12, y: 8 }} className="jr-enso">
          <Enso />
        </Layer>

        <Layer z={3} depth={0.28} phase={[0.02, 0.55]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -10, y: -6 }} className="jr-title">
          <span className="jr-kanji">結</span>
        </Layer>

        <Layer z={4} depth={0.55} phase={[0.05, 0.5]} from={{ x: "-18vw", y: "8vh", rotate: "-5deg", opacity: 0 }} to={{ x: "-15vw", y: "4vh", rotate: "-3deg", opacity: 1 }} cursor={{ x: 26, y: 16 }}>
          <div className="jr-dish jr-d1"><SceneMedia src={`${A}/dish.jpg`} alt="Plate of fresh sushi" /><b>本日の握り · today</b></div>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.44]} from={{ y: "14vh", scale: 0.98, opacity: 0 }} to={{ y: "10vh", scale: 1.03, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="jr-chef">
          <SceneMedia src={`${A}/chef-cut.png`} alt="Sushi chef at the counter" />
        </Layer>
        <div className="jr-grain" aria-hidden />

        <div className="jr-romaji">YUI · OMAKASE</div>
        <div className="jr-hanko"><span className="jr-jp">結</span></div>
        <div className="jr-sub">十二席の握り、その日の海のままに — <em>一期一会</em></div>
        <div className="jr-tag jr-tl">OMAKASE · 12 SEATS</div>
        <div className="jr-tag jr-bl"><b>一</b><span>the counter</span></div>
        <div className="jr-cue" aria-hidden>reserve a seat</div>
      </ParallaxScene>

      {/* S2 — THE COUNTER (chef + dish + enso · foreground-parallax, negative space) */}
      <ParallaxScene heightVh={280} className="jr-scene jr2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#14120e" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.05 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -4, y: -3 }} className="jr2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="jr2-veil" aria-hidden />
        <div className="jr2-enso" aria-hidden />
        <div className="jr2-kanji" aria-hidden>結</div>
        <Layer z={5} depth={0.4} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.02, opacity: 1 }} cursor={{ x: 10, y: 7 }} className="jr2-chef">
          <SceneMedia src={`${A}/chef-cut.png`} alt="Sushi chef at the counter" />
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.06, 0.9]} from={{ x: "-8vw", y: "-6vh", rotate: "-3deg", opacity: 0 }} to={{ x: "-14vw", y: "-9vh", rotate: "-2deg", opacity: 1 }} cursor={{ x: 22, y: 13 }}>
          <div className="jr2-card"><SceneMedia src={`${A}/dish.jpg`} alt="Plate of fresh sushi" /><b><span className="jr-jp">本日の握り</span>· today</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr2-copy">
          <span className="jr-eyebrow">01 — omakase</span>
          <h2>Whatever the sea<br /><em>gave us that morning.</em></h2>
          <p>A single hinoki counter and a set omakase — no menu, no choices, just the day's catch shaped one piece at a time and passed straight to your hand. Ichigo ichie.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE COURSES (omakase served in order · rows placed from the chef's side, rules drawn by --lp) */}
      <ParallaxScene heightVh={300} className="jr-scene jr3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#14120e" }}>
        <div className="jr3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 0.9 }} className="jr3-kanji"><span>膳</span></Layer>
        <Layer z={12} depth={0.24} phase={[0.02, 0.28]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jr3-copy">
          <span className="jr-eyebrow">02 — お品書き</span>
          <h2>Served in order, <em>one at a time.</em></h2>
        </Layer>
        {/* five courses, placed from the counter one after another */}
        <Layer z={6} depth={0.3} phase={[0.03, 0.24]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr1">
          <div className="jr3-row"><span className="jr3-no">一</span><div className="jr3-thumb"><SceneMedia src={`${A}/g1.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">先付</span>Sakizuke</b><s>the morning's local catch, lightly dressed</s></div></div>
        </Layer>
        <Layer z={6} depth={0.34} phase={[0.12, 0.34]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr2">
          <div className="jr3-row"><span className="jr3-no">二</span><div className="jr3-thumb"><SceneMedia src={`${A}/g2.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">刺身</span>Sashimi</b><s>three cuts, aged to their own day</s></div></div>
        </Layer>
        <Layer z={6} depth={0.38} phase={[0.21, 0.44]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr3">
          <div className="jr3-row"><span className="jr3-no">三</span><div className="jr3-thumb"><SceneMedia src={`${A}/g3.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">炙り</span>Aburi</b><s>seared over binchōtan, a breath of smoke</s></div></div>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.30, 0.54]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr4">
          <div className="jr3-row"><span className="jr3-no">四</span><div className="jr3-thumb"><SceneMedia src={`${A}/g4.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">握り</span>Nigiri</b><s>the chef's run, piece by piece to your hand</s></div></div>
        </Layer>
        <Layer z={6} depth={0.46} phase={[0.39, 0.64]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jr3-course jr3-cr5">
          <div className="jr3-row"><span className="jr3-no">五</span><div className="jr3-thumb"><SceneMedia src={`${A}/g5.jpg`} /></div><div className="jr3-name"><b><span className="jr-jp">椀物</span>Wanmono</b><s>a clear dashi to close, warm sake beside</s></div></div>
        </Layer>
      </ParallaxScene>

      {/* S4 — 一期一会 (the way · data, washi) */}
      <ParallaxScene heightVh={250} className="jr-scene jr4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#14120e" }}>
        <div className="jr4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jr4-head">
          <span className="jr-eyebrow">03 — 一期一会</span><h2>This meal, <em>this once.</em></h2>
        </Layer>
        {/* энсо (円相) прорисовывается кистью по --lp, три «пути» проявляются внутри */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.82]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="jr4-wayL">
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
      <ParallaxScene heightVh={280} className="jr-scene jr5-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#14120e" }}>
        <div className="jr5-bg" aria-hidden />
        <div className="jr5-enso" aria-hidden />
        <div className="jr5-rail" aria-hidden />
        <div className="jr5-eyebrow">guests · 御客様</div>
        <Layer z={5} depth={0.3} phase={[0.04, 0.32]} from={{ y: "-7vh", rotate: "-8deg", opacity: 0 }} to={{ y: "0vh", rotate: "-2deg", opacity: 1 }} className="jr5-fuda jr5-f1">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>The warm rice against cold fish — I finally understood what everyone means.</p><cite>Kenji T. · Tokyo</cite></div></figure>
        </Layer>
        <Layer z={6} depth={0.46} phase={[0.18, 0.5]} from={{ y: "-8vh", rotate: "7deg", opacity: 0 }} to={{ y: "0vh", rotate: "1.5deg", opacity: 1 }} className="jr5-fuda jr5-f2">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>No menu, no choices, and the best meal of the year.</p><cite>Elena &amp; Marc · Paris</cite></div></figure>
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.32, 0.64]} from={{ y: "-7vh", rotate: "-6deg", opacity: 0 }} to={{ y: "0vh", rotate: "-1.5deg", opacity: 1 }} className="jr5-fuda jr5-f3">
          <figure className="jr5-tag"><span className="jr5-cord" /><div className="jr5-wood"><i className="jr-jp">客</i><p>We didn't speak for an hour.</p><cite>Aiko N. · Osaka</cite></div></figure>
        </Layer>
      </ParallaxScene>

      {/* S6 — RESERVE (hanko + dish + CTA · object) */}
      <ParallaxScene heightVh={260} className="jr-scene jr6-scene">
        <div className="jr6-bg" aria-hidden />
        <div className="jr6-enso" aria-hidden />
        <div className="jr6-hanko" aria-hidden><span>結</span></div>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ scale: 0.94, rotate: "-3deg", opacity: 0 }} to={{ scale: 1, rotate: "0deg", opacity: 1 }} className="jr6-copy">
          <span className="jr-eyebrow">reservations</span>
          <h2>Sit at the<br /><em>counter.</em></h2>
        </Layer>
        <div className="jr6-cta">
          <p>Two seatings a night, booked a month ahead. Leave the evening to the chef.</p>
          <a href="#" onClick={stop} className="jr-btn">Reserve a seat <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="jr-foot">
        <div className="jr-foot-top"><b>結 YUI</b><p>Omakase at a single hinoki counter. Ichigo ichie.</p></div>
        <div className="jr-foot-legal"><span>Sushi Yui</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
