"use client";
/* Концепт 19 — HOODIE «BLOKK». Стритвир-дроп тяжёлых худи. Concrete-grey + safety-yellow + black, кинетик-тикер полосы (CSS marquee, встречные направления) за моделью, oversized модель-вырезка hood-up поверх тикера, летящий гармент, hangtag drop-tag. Типо-персона: Bricolage Grotesque 800 + DM Mono. Hero-приём: kinetic ticker marquee. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./hoodie.css";

const A = "/uploads/1/hooks/sites/anim/hoodie";
const stop = (e: React.MouseEvent) => e.preventDefault();

const T1 = "BLOKK · DROP 04 · HEAVYWEIGHT 500 GSM · ";
const T2 = "SHIP WORLDWIDE · LIMITED RUN · SELLS OUT · ";

export function HoodieSite() {
  return (
    <div className="hd-site">
      <header className="hd-head">
        <Link href="/visual-hooks" className="hd-brand">BLOKK</Link>
        <nav className="hd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Shop</a><a href="#" onClick={stop}>Drop 04</a>
          <a href="#" onClick={stop}>Lookbook</a><a href="#" onClick={stop} className="hd-shop">Cop now</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="hd-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#141413" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="hd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="hd-scrim" aria-hidden />

        {/* кинетик-тикер полосы */}
        <div className="hd-ticker hd-t1" aria-hidden>
          <div className="hd-row"><span>{T1}{T1}{T1}{T1}</span></div>
        </div>
        <div className="hd-ticker hd-t2" aria-hidden>
          <div className="hd-row"><span>{T2}{T2}{T2}{T2}</span></div>
        </div>

        {/* летящий гармент */}
        <Layer z={4} depth={0.5} phase={[0.06, 0.95]} from={{ x: "-4vw", y: "-3vh", rotate: "-14deg", opacity: 0 }} to={{ x: "-1vw", y: "0vh", rotate: "-8deg", opacity: 1 }} cursor={{ x: 30, y: 18 }} className="hd-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="Heavyweight streetwear hoodie" />
        </Layer>

        {/* модель */}
        <Layer z={6} depth={0.55} phase={[0.05, 0.95]} from={{ y: "6vh", scale: 0.98, opacity: 0 }} to={{ y: "1vh", scale: 1.04, opacity: 1 }} cursor={{ x: 18, y: 11 }} className="hd-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model wearing the hoodie, hood up" />
        </Layer>
        <div className="hd-grain" aria-hidden />

        <div className="hd-tag"><b>DROP 04</b><span>heavyweight hoodie<br />limited — 300 made</span></div>
        <div className="hd-label hd-tl">BLOKK · EST. 2019</div>
        <div className="hd-label hd-tr">500 GSM<br />BOXY FIT</div>
        <div className="hd-label hd-bl"><b>04</b><span>the drop</span></div>
        <div className="hd-cue" aria-hidden>cop the drop</div>
      </ParallaxScene>

      {/* S2 — THE DROP (model + kinetic ticker + garment · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="hd-scene hd2-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#141413" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="hd2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="hd2-veil" aria-hidden />
        <div className="hd2-ticker hd2-t1" aria-hidden><span>500 GSM · BLOKK · DROP 04 · LIMITED · SELLS OUT · 500 GSM · BLOKK · DROP 04 · LIMITED · SELLS OUT · </span></div>
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="hd2-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model wearing the hoodie, hood up" />
        </Layer>
        <div className="hd2-ticker hd2-t2" aria-hidden><span>NUMBERED RUN · SHIP WORLDWIDE · NO RESTOCK · NUMBERED RUN · SHIP WORLDWIDE · NO RESTOCK · </span></div>
        <Layer z={9} depth={0.8} from={{ y: "-3vh", x: "-2vw", rotate: "-8deg", opacity: 0 }} to={{ y: "1vh", x: "-4vw", rotate: "-4deg", opacity: 1 }} phase={[0.05, 0.9]} cursor={{ x: 30, y: 16 }} className="hd2-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="Heavyweight streetwear hoodie" />
        </Layer>
        <div className="hd2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="hd2-copy">
          <span className="hd-eyebrow">01 — the drop</span>
          <h2>Built like <em>armour,</em><br />worn like nothing.</h2>
          <p>500gsm loopback cotton, boxed shoulders, a hood that stands up. Three hundred pieces, numbered, then gone. No restocks. Cop it or miss it.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE LOOKBOOK (worn on the block · cards) */}
      <ParallaxScene heightVh={280} className="hd-scene hd3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#141413" }}>
        <div className="hd3-bg" aria-hidden />
        <div className="hd3-tape" aria-hidden />
        {/* лукбук как hazard-лента: кадры въезжают справа, конвейером · ticker-signature */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.42]} from={{ x: "-21vw", opacity: 0 }} to={{ x: "-33vw", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="hd3-slot">
          <div className="hd3-shot hd3-k1"><SceneMedia src={`${A}/g1.jpg`} /><i>01</i><b>hood up</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.11, 0.5]} from={{ x: "0vw", opacity: 0 }} to={{ x: "-11vw", opacity: 1 }} cursor={{ x: 16, y: 9 }} className="hd3-slot">
          <div className="hd3-shot hd3-k2"><SceneMedia src={`${A}/g4.jpg`} /><i>02</i><b>boxy, from behind</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.17, 0.58]} from={{ x: "22vw", opacity: 0 }} to={{ x: "11vw", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="hd3-slot">
          <div className="hd3-shot hd3-k3"><SceneMedia src={`${A}/g3.jpg`} /><i>03</i><b>the block</b></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.23, 0.64]} from={{ x: "44vw", opacity: 0 }} to={{ x: "33vw", opacity: 1 }} cursor={{ x: 16, y: 9 }} className="hd3-slot">
          <div className="hd3-shot hd3-k4"><SceneMedia src={`${A}/g2.jpg`} /><i>04</i><b>500gsm loopback</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hd3-copy">
          <span className="hd-eyebrow">02 — the lookbook</span>
          <h2>Worn <em>on the block.</em></h2>
          <p>Shot on concrete, hard flash, no retouch.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE SPEC (numbers · data) */}
      <ParallaxScene heightVh={260} className="hd-scene hd4-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 11, color: "#141413" }}>
        <div className="hd4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hd4-head">
          <span className="hd-eyebrow">03 — the spec</span><h2>Read the <em>tag.</em></h2>
        </Layer>
        <Layer z={12} depth={0.3} phase={[0.02, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="hd4-list">
          <div className="hd4-row" style={{ ["--thr" as string]: 0.04, ["--dir" as string]: "-44px" }}><h4>Weight</h4><b>500<em>gsm</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.14, ["--dir" as string]: "44px" }}><h4>Cotton</h4><b>100%<em>loopback</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.24, ["--dir" as string]: "-44px" }}><h4>Fit</h4><b>boxy<em>dropped shoulder</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.34, ["--dir" as string]: "44px" }}><h4>Run</h4><b>300<em>numbered</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.44, ["--dir" as string]: "-44px" }}><h4>Restock</h4><b>never</b></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — COP CONFIRMED (verified-cop drop-квитанции, вклеиваются штампом · stamp-snap) */}
      <ParallaxScene heightVh={260} className="hd-scene hd5-scene" transitionOut={{ type: "diagonal", start: 0.85, angle: -9, color: "#141413" }}>
        <div className="hd5-bg" aria-hidden />
        <div className="hd5-eyebrow">cop confirmed · the feed</div>
        <Layer z={6} depth={0.3} phase={[0.05, 0.3]} from={{ x: "-32vw", scale: 1.2, rotate: "-7deg", opacity: 0 }} to={{ x: "-32vw", scale: 1, rotate: "-2deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>Heaviest hoodie I own. Stands up on its own. Not missing this one.</p><b>@marcusfits · drop 04</b></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.14, 0.4]} from={{ x: "0vw", scale: 1.2, rotate: "6deg", opacity: 0 }} to={{ x: "0vw", scale: 1, rotate: "1.5deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>Numbered, boxed, no restock. Feels like owning something.</p><b>Dani O. · member</b></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.23, 0.5]} from={{ x: "32vw", scale: 1.2, rotate: "-5deg", opacity: 0 }} to={{ x: "32vw", scale: 1, rotate: "-1deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>The hood actually stays up. Worth every penny.</p><b>@blokkhead · repeat</b></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — COP IT OR MISS IT (garment + CTA · object) */}
      <ParallaxScene heightVh={260} className="hd-scene hd6-scene">
        <div className="hd6-bg" aria-hidden />
        <div className="hd6-ticker" aria-hidden><span>COP THE DROP · SELLS OUT · NO RESTOCK · COP THE DROP · SELLS OUT · NO RESTOCK · </span></div>
        <Layer z={4} depth={0.55} from={{ y: "4vh", x: "2vw", rotate: "8deg", scale: 1.02 }} to={{ y: "-2vh", x: "-2vw", rotate: "4deg", scale: 1.08 }} cursor={{ x: 26, y: 14 }} className="hd6-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="Heavyweight streetwear hoodie" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="hd6-copy">
          <span className="hd-eyebrow">drop 04</span>
          <h2>Cop it or<br /><em>miss it.</em></h2>
        </Layer>
        <div className="hd6-cta">
          <p>300 numbered pieces. When it's gone, it's gone — no restock.</p>
          <a href="#" onClick={stop} className="hd-btn">Cop now <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="hd-foot">
        <div className="hd-foot-top"><b>BLOKK</b><p>Heavyweight streetwear, dropped in small numbered runs.</p></div>
        <div className="hd-foot-legal"><span>BLOKK Supply Co.</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
