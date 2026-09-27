"use client";
/* Концепт 08 — NOTREDAME. Приглашение в Нотр-Дам (искусство/архитектура). Hero-приём: sliced-strips (фото собора нарезано вертикальными полосами) + knockout-титул + роза-витраж. Готическая indigo/золото/витраж палитра. Типо-персона: clean bold sans + serif. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./notredame.css";

const A = "/uploads/1/hooks/sites/anim/notredame";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function NotreDameSite() {
  return (
    <div className="nd-site">
      <header className="nd-head">
        <Link href="/visual-hooks" className="nd-brand">NOTRE‑DAME</Link>
        <nav className="nd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The visit</a><a href="#" onClick={stop}>The art</a>
          <a href="#" onClick={stop}>Hours</a><a href="#" onClick={stop} className="nd-book">Reserve a visit</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="nd-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#141a33" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.04 }} to={{ y: "2vh", scale: 1.08 }} cursor={{ x: -5, y: -4 }} className="nd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="nd-frame" aria-hidden />
        <div className="nd-blobs" aria-hidden />

        <Layer z={4} depth={0.4} phase={[0.02, 0.9]} from={{ y: "7vh", scale: 1.02, opacity: 0 }} to={{ y: "-2vh", scale: 1.06, opacity: 1 }} cursor={{ x: 14, y: 8 }} className="nd-strips">
          <SceneMedia src={`${A}/cathedral.jpg`} alt="Notre-Dame cathedral facade at dusk" />
        </Layer>

        <Layer z={3} depth={0.5} phase={[0.1, 0.6]} from={{ scale: 0.7, opacity: 0, rotate: "-30deg" }} to={{ scale: 1, opacity: 0.5, rotate: "0deg" }} cursor={{ x: -20, y: -14 }} fit="contain" className="nd-rose">
          <SceneMedia src={`${A}/rose-cut.png`} alt="Notre-Dame stained-glass rose window" />
        </Layer>

        <Layer z={8} depth={0.2} phase={[0.02, 0.4]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nd-title">
          <h1>NOTRE&nbsp;<span>DAME</span></h1>
        </Layer>
        <div className="nd-grain" aria-hidden />

        <div className="nd-sub">a candlelit visit · Île de la Cité · Paris IV</div>
        <div className="nd-label nd-tl">BUILT 1163 — 1345</div>
        <div className="nd-label nd-tr">GOTHIC<br />FRENCH</div>
        <div className="nd-label nd-bl"><b>01</b><span>the cathedral</span></div>
        <div className="nd-cue" aria-hidden>enter</div>
      </ParallaxScene>

      {/* S2 — THE VISIT (cathedral + rose window · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="nd-scene nd2-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#141a33" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -4, y: -3 }} className="nd2-bg">
          <SceneMedia src={`${A}/cathedral.jpg`} alt="Notre-Dame cathedral facade at dusk" />
        </Layer>
        <div className="nd2-veil" aria-hidden />
        <Layer z={9} depth={0.8} from={{ rotate: "0deg", scale: 1.02, opacity: 0.7 }} to={{ rotate: "24deg", scale: 1.08, opacity: 1 }} cursor={{ x: 24, y: 14 }} className="nd2-rose">
          <SceneMedia src={`${A}/rose-cut.png`} alt="Notre-Dame stained-glass rose window" />
        </Layer>
        <div className="nd2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="nd2-copy">
          <span className="nd-eyebrow">01 — the visit</span>
          <h2>Stone and light,<br /><em>by candle.</em></h2>
          <p>Small, guided evening visits: the rose windows lit from within, the nave without the crowd, a historian who tells you what the stone remembers. Groups of twelve.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE CATHEDRAL (details · cards) */}
      <ParallaxScene heightVh={280} className="nd-scene nd3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#141a33" }}>
        <div className="nd3-bg" aria-hidden />
        <div className="nd3-shaft" aria-hidden />
        {/* роза-окулус — источник света, медленно вращается сверху */}
        <Layer z={3} depth={0.34} phase={[0, 1]} from={{ rotate: "0deg", scale: 0.92, opacity: 0.24 }} to={{ rotate: "44deg", scale: 1.04, opacity: 0.5 }} cursor={{ x: 12, y: 8 }} fit="contain" className="nd3-rose">
          <SceneMedia src={`${A}/rose-cut.png`} alt="Notre-Dame stained-glass rose window" />
        </Layer>
        {/* вертикальная элевация: детали ВОСХОДЯТ снизу вверх вдоль оси, стаггер */}
        <Layer z={6} depth={0.4} phase={[0.05, 0.42]} from={{ x: "-28vw", y: "-18vh", opacity: 0 }} to={{ x: "-28vw", y: "-27vh", opacity: 1 }} cursor={{ x: 8, y: 5 }}>
          <div className="nd3-el nd3-e1"><SceneMedia src={`${A}/g1.jpg`} /><b>the rose window</b></div>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.12, 0.5]} from={{ x: "-24vw", y: "0vh", opacity: 0 }} to={{ x: "-24vw", y: "-9vh", opacity: 1 }} cursor={{ x: 10, y: 6 }}>
          <div className="nd3-el nd3-e2"><SceneMedia src={`${A}/g4.jpg`} /><b>the west front</b></div>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.19, 0.58]} from={{ x: "-31vw", y: "18vh", opacity: 0 }} to={{ x: "-31vw", y: "9vh", opacity: 1 }} cursor={{ x: 8, y: 5 }}>
          <div className="nd3-el nd3-e3"><SceneMedia src={`${A}/g2.jpg`} /><b>the nave</b></div>
        </Layer>
        <Layer z={9} depth={0.68} phase={[0.26, 0.66]} from={{ x: "-26vw", y: "36vh", opacity: 0 }} to={{ x: "-26vw", y: "27vh", opacity: 1 }} cursor={{ x: 10, y: 6 }}>
          <div className="nd3-el nd3-e4"><SceneMedia src={`${A}/g5.jpg`} /><b>the buttresses</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.08, 0.5]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="nd3-copy">
          <span className="nd-eyebrow">02 — the cathedral</span>
          <h2>Stone that <em>rises to light.</em></h2>
          <p>Eight centuries, read from the floor to the vault.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — PLAN YOUR VISIT (schedule · data) */}
      <ParallaxScene heightVh={260} className="nd-scene nd4-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -9, color: "#141a33" }}>
        <div className="nd4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="nd4-head">
          <span className="nd-eyebrow">03 — plan your visit</span><h2>Come <em>after dark.</em></h2>
        </Layer>
        {/* каждый визит «загорается» как витраж — из тьмы в золотой свет (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.68]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="nd4-visitsL">
          <div className="nd4-visits">
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.05 }}><time>Tue–Sun · 18:30</time><b>Evening candle visit</b><s>90 min · groups of twelve · guided</s><em className="on">reserve</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.22 }}><time>Sat · 10:00</time><b>The stone &amp; the glass</b><s>a slow morning of windows and carving</s><em className="on">reserve</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.39 }}><time>By arrangement</time><b>The towers &amp; roof</b><s>the climb, the gallery, the view</s><em className="on">enquire</em></div>
            <div className="nd4-visit" style={{ ["--thr" as string]: 0.56 }}><time>First Sunday</time><b>Vespers &amp; music</b><s>choral evening in the nave</s><em>free</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — VOICES / BY CANDLELIGHT (иллюминированные стихи с золотыми буквицами · candle-glow) */}
      <ParallaxScene heightVh={260} className="nd-scene nd5-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#141a33" }}>
        <div className="nd5-bg" aria-hidden />
        <div className="nd5-glow" aria-hidden />
        <div className="nd5-eyebrow">voices · by candlelight</div>
        <Layer z={5} depth={0.26} phase={[0.04, 0.42]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v1">
          <div><span className="nd5-cap">T</span><p>he nave with no crowd, lit only by candle. I've travelled a long way for less.</p><cite>Hélène M. · evening visit</cite></div>
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.16, 0.54]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v2">
          <div><span className="nd5-cap">O</span><p>ur guide made the stone talk — eight hundred years in ninety minutes.</p><cite>Andrew P. · visitor</cite></div>
        </Layer>
        <Layer z={5} depth={0.5} phase={[0.28, 0.66]} from={{ y: "2vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="nd5-verse nd5-v3">
          <div><span className="nd5-cap">H</span><p>eard vespers rise into that vault and forgot to breathe.</p><cite>Sofia R. · vespers</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — ENTER THE LIGHT (rose window + CTA · object) */}
      <ParallaxScene heightVh={260} className="nd-scene nd6-scene">
        <div className="nd6-bg" aria-hidden />
        <Layer z={3} depth={0.4} phase={[0, 1]} from={{ rotate: "0deg", scale: 0.94, opacity: 0.5 }} to={{ rotate: "60deg", scale: 1.02, opacity: 0.9 }} cursor={{ x: 10, y: 8 }} className="nd6-rose">
          <SceneMedia src={`${A}/rose-cut.png`} alt="Notre-Dame stained-glass rose window" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="nd6-copy">
          <span className="nd-eyebrow">reserve</span>
          <h2>Enter the<br /><em>light.</em></h2>
        </Layer>
        <div className="nd6-cta">
          <p>Evening visits, twelve at a time, by reservation only.</p>
          <a href="#" onClick={stop} className="nd-btn">Reserve a visit <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="nd-foot">
        <div className="nd-foot-top"><b>NOTRE‑DAME</b><p>Eight centuries of stone and light. A candlelit visit.</p></div>
        <div className="nd-foot-legal"><span>Notre‑Dame Visits</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
