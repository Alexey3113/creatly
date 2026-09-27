"use client";
/* Концепт 19 — HOODIE «BLOKK». Стритвир-дроп тяжёлых худи. Concrete-grey + safety-yellow + black, кинетик-тикер полосы (CSS marquee, встречные направления) за моделью, oversized модель-вырезка hood-up поверх тикера, летящий гармент, hangtag drop-tag. Типо-персона: Bricolage Grotesque 800 + DM Mono. Hero-приём: kinetic ticker marquee.
   Сквозная архитектура (аудит 2026-09): сигнальная лента — ОДНА физически (актёр): в hero это жёлтый тикер,
   дальше она едет вдоль своей длины от скролла (Follow --run), пересекает макро, конвейер лукбука, обматывает худи
   на спеках, подчёркивает отзывы и в финале рвётся (--tear) = SOLD OUT.
   Стыки: S1→S2 и S4→S5 — пучок лент пересекает кадр, за ним сразу следующая сцена; остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere, Follow } from "@/components/scene-kit";
import "./hoodie.css";

const A = "/uploads/1/hooks/sites/anim/hoodie";
const stop = (e: React.MouseEvent) => e.preventDefault();

const T2 = "SHIP WORLDWIDE · LIMITED RUN · SELLS OUT · ";
const TT = "BLOKK · DROP 04 · HEAVYWEIGHT 500 GSM · SELLS OUT · NO RESTOCK · ";
const TAPE = TT.repeat(8);
const B1 = "CAUTION · DROP 04 · CAUTION · DROP 04 · CAUTION · DROP 04 · CAUTION · DROP 04 · ";
const B2 = "NUMBERED RUN · NO RESTOCK · NUMBERED RUN · NO RESTOCK · NUMBERED RUN · NO RESTOCK · ";

// пучок сигнальных лент на кромке стыка (живёт в НОВОЙ сцене, едет вместе с кромкой клипа)
function Bundle({ dir }: { dir: "up" | "down" }) {
  return (
    <div className={`hd-bundle hd-bundle-${dir}`} aria-hidden>
      <i className="hd-bt hd-bt1"><span>{B1}{B1}</span></i>
      <i className="hd-bt hd-bt2" />
      <i className="hd-bt hd-bt3"><span>{B2}{B2}</span></i>
    </div>
  );
}

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

      {/* фон как сюжет: натриевый свет подвала → холодный пол зала отзывов → жёлтое зарево финала */}
      <Atmosphere stops={[
        { at: ".hd3-scene", color: "#1c1b16", anchor: 0.5 },
        { at: ".hd4-scene", color: "#24200e", anchor: 0.5 },
        { at: ".hd5-scene", color: "#151514", anchor: 0.5 },
        { at: ".hd6-scene", color: "#29240a", anchor: 0.5 },
      ]} />

      {/* АКТЁР — одна сигнальная лента на весь сайт */}
      <Actor className="hd-tape-actor" width="320vw" zIndex={22} bob={2} tilt={0.05} stops={[
        { at: ".hd-hero", anchor: 0.18, pose: { x: 50, y: 26, r: -3, s: 1 } },
        { at: ".hd-hero", anchor: 0.55, pose: { x: 50, y: 30, r: -6, s: 1 } },
        { at: ".hd2-scene", anchor: 0.5, pose: { x: 60, y: 21, r: 9, s: 0.72 } },
        { at: ".hd3-scene", anchor: 0.5, pose: { x: 50, y: 19, r: -2, s: 0.6 } },
        { at: ".hd4-scene", anchor: 0.5, pose: { x: 23, y: 52, r: -58, s: 0.5 } },
        { at: ".hd5-scene", anchor: 0.5, pose: { x: 50, y: 85, r: 2, s: 0.6 } },
        { at: ".hd6-scene", anchor: 0.42, pose: { x: 50, y: 13, r: -3, s: 0.85 } },
        { at: ".hd-foot", anchor: 0.2, pose: { x: 50, y: 8, r: -3, s: 0.85, o: 0 } },
      ]}>
        <div className="hd-tape">
          <div className="hd-tape-half hd-tape-l"><span className="hd-tape-run"><span className="hd-tape-txt">{TAPE}</span></span></div>
          <div className="hd-tape-half hd-tape-r"><span className="hd-tape-run"><span className="hd-tape-txt">{TAPE}</span></span></div>
          <b className="hd-soldout">SOLD OUT</b>
        </div>
      </Actor>
      <Follow target=".hd-tape" stops={[
        { at: ".hd-hero", anchor: 0.18, vars: { "--run": 0, "--tear": 0 } },
        { at: ".hd6-scene", anchor: 0.5, vars: { "--run": 240, "--tear": 0 } },
        { at: ".hd6-scene", anchor: 0.72, vars: { "--run": 262, "--tear": 1 } },
      ]} />

      {/* S1 — HERO: собран при загрузке, лента-актёр вместо верхнего тикера */}
      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={10} className="hd-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -6, y: -4 }} className="hd-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="hd-scrim" aria-hidden />
        <div className="hd-flicker" aria-hidden />

        <div className="hd-ticker hd-t2" aria-hidden>
          <div className="hd-row"><span>{T2}{T2}{T2}{T2}</span></div>
        </div>

        {/* летящий гармент */}
        <Layer z={4} depth={0.5} phase={[0.04, 0.3]} from={{ x: "-6vw", y: "-5vh", rotate: "-18deg", opacity: 0 }} to={{ x: "-1vw", y: "0vh", rotate: "-8deg", opacity: 1 }} cursor={{ x: 30, y: 18 }} className="hd-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="Heavyweight streetwear hoodie" />
        </Layer>

        {/* модель */}
        <Layer z={6} depth={0.55} phase={[0.06, 0.32]} from={{ y: "7vh", scale: 0.98, opacity: 0 }} to={{ y: "1vh", scale: 1.04, opacity: 1 }} cursor={{ x: 18, y: 11 }} className="hd-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model wearing the hoodie, hood up" />
        </Layer>
        <div className="hd-grain" aria-hidden />

        <div className="hd-tag"><b>DROP 04</b><span>heavyweight hoodie<br />limited — 300 made</span></div>
        <div className="hd-label hd-tl">BLOKK · EST. 2019</div>
        <div className="hd-label hd-tr">500 GSM<br />BOXY FIT</div>
        <div className="hd-label hd-bl"><b>04</b><span>the drop</span></div>
        <div className="hd-cue" aria-hidden>cop the drop</div>
      </ParallaxScene>

      {/* S2 — THE DROP: макро шнурка и фурнитуры (не повтор hero); въезжает за пучком лент */}
      <ParallaxScene heightVh={300} overlapVh={80} parallax={10} className="hd-scene hd2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.22 }} to={{ y: "2vh", scale: 1.04 }} cursor={{ x: -5, y: -4 }} className="hd2-bg">
          <SceneMedia src={`${A}/g2.jpg`} alt="Macro of the yellow drawstring and loopback cotton" />
        </Layer>
        <div className="hd2-veil" aria-hidden />
        <Layer z={7} depth={0.6} phase={[0.3, 0.46]} from={{ y: "8vh", rotate: "12deg", opacity: 0 }} to={{ y: "0vh", rotate: "4deg", opacity: 1 }} cursor={{ x: -20, y: -12 }} className="hd2-tagL">
          <div className="hd2-tagshot"><SceneMedia src={`${A}/g5.jpg`} alt="Numbered hangtag 042" /><b>042 / 300 — numbered</b></div>
        </Layer>
        <div className="hd2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.32, 0.46]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="hd2-copy">
          <span className="hd-eyebrow">01 — the drop</span>
          <h2>Built like <em>armour,</em><br />worn like nothing.</h2>
          <p>500gsm loopback cotton, boxed shoulders, a hood that stands up. Three hundred pieces, numbered, then gone. No restocks. Cop it or miss it.</p>
        </Layer>
        <Bundle dir="up" />
      </ParallaxScene>

      {/* S3 — THE LOOKBOOK (worn on the block · cards) */}
      <ParallaxScene heightVh={290} overlapVh={60} parallax={10} className="hd-scene hd3-scene">
        <div className="hd3-bg" aria-hidden />
        <div className="hd3-tape" aria-hidden />
        {/* лукбук как hazard-лента: кадры въезжают справа, конвейером · ticker-signature */}
        <Layer z={5} depth={0.4} phase={[0.02, 0.3]} from={{ x: "-12vw", opacity: 0 }} to={{ x: "-33vw", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="hd3-slot">
          <div className="hd3-shot hd3-k1"><SceneMedia src={`${A}/g1.jpg`} /><i>01</i><b>hood up</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.06, 0.34]} from={{ x: "10vw", opacity: 0 }} to={{ x: "-11vw", opacity: 1 }} cursor={{ x: 16, y: 9 }} className="hd3-slot">
          <div className="hd3-shot hd3-k2"><SceneMedia src={`${A}/g4.jpg`} /><i>02</i><b>boxy, from behind</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.1, 0.38]} from={{ x: "32vw", opacity: 0 }} to={{ x: "11vw", opacity: 1 }} cursor={{ x: 14, y: 8 }} className="hd3-slot">
          <div className="hd3-shot hd3-k3"><SceneMedia src={`${A}/g3.jpg`} /><i>03</i><b>the block</b></div>
        </Layer>
        <Layer z={8} depth={0.7} phase={[0.14, 0.42]} from={{ x: "54vw", opacity: 0 }} to={{ x: "33vw", opacity: 1 }} cursor={{ x: 16, y: 9 }} className="hd3-slot">
          <div className="hd3-shot hd3-k4 hd3-white"><SceneMedia src={`${A}/garment.jpg`} /><i>04</i><b>the piece · 500gsm</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hd3-copy">
          <span className="hd-eyebrow">02 — the lookbook</span>
          <h2>Worn <em>on the block.</em></h2>
          <p>Shot on concrete, hard flash, no retouch.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE SPEC: лента обматывает худи и «печатает» спеки */}
      <ParallaxScene heightVh={290} overlapVh={60} parallax={8} className="hd-scene hd4-scene">
        <div className="hd4-bg" aria-hidden />
        <Layer z={6} depth={0.5} phase={[0.04, 0.3]} from={{ x: "-8vw", rotate: "-14deg", opacity: 0 }} to={{ x: "0vw", rotate: "-5deg", opacity: 1 }} cursor={{ x: 20, y: 12 }} className="hd4-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="The hoodie, taped up" />
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.26, 0.38]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="hd4-head">
          <span className="hd-eyebrow">03 — the spec</span><h2>Read the <em>tag.</em></h2>
        </Layer>
        <Layer z={12} depth={0.3} phase={[0.26, 0.8]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="hd4-list">
          <div className="hd4-row" style={{ ["--thr" as string]: 0.04, ["--dir" as string]: "-44px" }}><h4>Weight</h4><b>500<em>gsm</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.14, ["--dir" as string]: "44px" }}><h4>Cotton</h4><b>100%<em>loopback</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.24, ["--dir" as string]: "-44px" }}><h4>Fit</h4><b>boxy<em>dropped shoulder</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.34, ["--dir" as string]: "44px" }}><h4>Run</h4><b>300<em>numbered</em></b></div>
          <div className="hd4-row" style={{ ["--thr" as string]: 0.44, ["--dir" as string]: "-44px" }}><h4>Restock</h4><b>never</b></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — COP CONFIRMED: съезжает сверху за вторым пучком лент */}
      <ParallaxScene heightVh={280} overlapVh={80} parallax={10} className="hd-scene hd5-scene">
        <div className="hd5-bg" aria-hidden />
        <Layer z={16} depth={0} phase={[0.36, 0.46]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="hd5-eyebrow">cop confirmed · the feed</div></Layer>
        <Layer z={6} depth={0.3} phase={[0.34, 0.48]} from={{ x: "-32vw", scale: 1.2, rotate: "-7deg", opacity: 0 }} to={{ x: "-32vw", scale: 1, rotate: "-2deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>Heaviest hoodie I own. Stands up on its own. Not missing this one.</p><b>@marcusfits · drop 04</b></div>
        </Layer>
        <Layer z={7} depth={0.42} phase={[0.4, 0.54]} from={{ x: "0vw", scale: 1.2, rotate: "6deg", opacity: 0 }} to={{ x: "0vw", scale: 1, rotate: "1.5deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>Numbered, boxed, no restock. Feels like owning something.</p><b>Dani O. · member</b></div>
        </Layer>
        <Layer z={8} depth={0.54} phase={[0.46, 0.6]} from={{ x: "32vw", scale: 1.2, rotate: "-5deg", opacity: 0 }} to={{ x: "32vw", scale: 1, rotate: "-1deg", opacity: 1 }} className="hd5-row">
          <div className="hd5-cop"><div className="hd5-top">✓ verified cop</div><em className="hd5-stars">★★★★★</em><p>The hood actually stays up. Worth every penny.</p><b>@blokkhead · repeat</b></div>
        </Layer>
        <Bundle dir="down" />
      </ParallaxScene>

      {/* S6 — COP IT OR MISS IT: лента натянута над гарментом и рвётся = SOLD OUT */}
      <ParallaxScene heightVh={250} overlapVh={60} parallax={8} className="hd-scene hd6-scene">
        <div className="hd6-bg" aria-hidden />
        <Layer z={4} depth={0.55} from={{ y: "4vh", x: "2vw", rotate: "8deg", scale: 1.02 }} to={{ y: "-2vh", x: "-2vw", rotate: "4deg", scale: 1.08 }} cursor={{ x: 26, y: 14 }} className="hd6-garment">
          <SceneMedia src={`${A}/garment-cut.png`} alt="Heavyweight streetwear hoodie" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.3, 0.9]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="hd6-copy">
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
