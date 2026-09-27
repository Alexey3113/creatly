"use client";
/* Концепт 01 — CLOTHING «your style». Editorial fashion, перивинкл-glass, вырезанная модель + стеклянная молния, зеркальная типографика. Все слои отдельные (parallax-scene движок).
   v2 (аудит 2026-09): hero собран при загрузке и живёт в покое (штора колышется, молния переливается);
   стеклянная молния — сквозной актёр через все сцены (гигант → в руке → режет лукбук → игла шва → рейка бирок → гигант);
   стыки: «разрез молнией» (S2 открывается в силуэте молнии), «шторы раздвигаются» (ателье за ними уже живёт),
   «молния-застёжка» (финал расстёгивается V-образом), остальные — перекрытием сцен. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Atmosphere } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./clothing.css";

const A = "/uploads/1/hooks/sites/anim/clothing";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь актёра: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 300, s4: 280, s5: 280, s6: 260 };

function Wordmark() {
  return (<span className="cl-word"><span className="cl-your">your</span><span className="cl-style">style</span></span>);
}

export function ClothingSite() {
  return (
    <div className="cl-site">
      <Atmosphere stops={[
        { at: ".cl-hero", color: "#e3e6f8", color2: "#dde0f5" },
        { at: ".cl3-scene", color: "#eceefb", color2: "#e2e5f6" },
        { at: ".cl5-scene", color: "#e6e8f9", color2: "#dcdff4" },
        { at: ".cl6-scene", color: "#dcdff4", color2: "#cfd3ef" },
      ]} />
      {/* АКТЁР — стеклянная молния: одна и та же вещь проходит весь сайт */}
      <Actor src={`${A}/shard-cut.png`} width="62vw" zIndex={30} bob={7} className="cl-actor" stops={[
        { ...at(".cl-hero", H.hero, 0), pose: { x: 42, y: 60, s: 1, r: 7 } },
        { ...at(".cl-hero", H.hero, 0.55), pose: { x: 46, y: 48, s: 1, r: -3 } },
        { ...at(".cl2-scene", H.s2, 0.07), pose: { x: 50, y: 50, s: 0.78, r: 0 } },
        { ...at(".cl2-scene", H.s2, 0.36), pose: { x: 61, y: 37, s: 0.24, r: 16 } },
        { ...at(".cl2-scene", H.s2, 0.64), pose: { x: 60, y: 39, s: 0.24, r: 10 } },
        { ...at(".cl3-scene", H.s3, 0.3), pose: { x: 51, y: 50, s: 0.78, r: -36, o: 0.9 } },
        { ...at(".cl3-scene", H.s3, 0.66), pose: { x: 49, y: 52, s: 0.8, r: -40, o: 0.9 } },
        { ...at(".cl4-scene", H.s4, 0.3), pose: { x: 28.4, y: 42, s: 0.2, r: 18 } },
        { ...at(".cl4-scene", H.s4, 0.56), pose: { x: 28.4, y: 57, s: 0.2, r: 18 } },
        { ...at(".cl5-scene", H.s5, 0.3), pose: { x: 50, y: 9, s: 0.46, r: 90 } },
        { ...at(".cl5-scene", H.s5, 0.62), pose: { x: 50, y: 9, s: 0.46, r: 90 } },
        { ...at(".cl6-scene", H.s6, 0.09), pose: { x: 50, y: 52, s: 0.3, r: 0 } },
        { ...at(".cl6-scene", H.s6, 0.36), pose: { x: 75, y: 50, s: 0.95, r: 6 } },
        { ...at(".cl6-scene", H.s6, 0.9), pose: { x: 73, y: 46, s: 1, r: -2 } },
      ]} />

      <header className="cl-head">
        <Link href="/visual-hooks" className="cl-brand">ALEVTYNA</Link>
        <nav className="cl-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Lookbook</a>
          <a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop} className="cl-book">Book a fitting</a>
        </nav>
      </header>

      {/* S1 — HERO: собран при загрузке (rest), скролл продолжает хореографию */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="cl-hero">
        <Layer z={1} depth={0.15} from={{ scale: 1.06 }} to={{ y: "4vh", scale: 1.16 }} cursor={{ x: -8, y: -6 }} className="cl-curtain">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="cl-blobs" aria-hidden />
        <div className="cl-grain" aria-hidden />

        <Layer z={3} depth={0.3} phase={[0, 0.24]} from={{ y: "7vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -12, y: -8 }} className="cl-word-tl">
          <Wordmark />
        </Layer>

        {/* модель: проявление за интро + долгий дрейф на весь проход */}
        <Layer z={5} depth={0.7} phase={[0.02, 0.3]} from={{ opacity: 0, scale: 0.97 }} to={{ opacity: 1, scale: 1 }} cursor={{ x: 26, y: 16 }}>
          <Layer phase={[0, 1]} from={{ x: "5vw", y: "10vh", scale: 0.95 }} to={{ x: "0vw", y: "-4vh", scale: 1.08 }} fit="contain" position="66% bottom" className="cl-model">
            <SceneMedia src={`${A}/model-cut.png`} alt="Model in a tailored look" />
          </Layer>
        </Layer>

        <Layer z={8} depth={0.4} phase={[0.1, 0.34]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} cursor={{ x: 14 }} className="cl-word-br">
          <Wordmark />
        </Layer>

        <div className="cl-label cl-tl">SS · 2024</div>
        <div className="cl-label cl-tr">MADE BY<br />ALEVTYNA</div>
        <div className="cl-label cl-bl"><b>01</b><span>the collection</span></div>
        <div className="cl-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — A WARDROBE OF ONE: крупный план (шов шёлка + модель по пояс), молния — у неё в руке. Открывается в силуэте молнии */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="cl-scene cl2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.14, rotate: "-2deg" }} to={{ y: "-3vh", scale: 1.04, rotate: "1deg" }} cursor={{ x: -4, y: -3 }} className="cl2-bg">
          <SceneMedia src={`${A}/detail.jpg`} />
        </Layer>
        <div className="cl2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0, 1]} from={{ x: "3vw", y: "3vh", scale: 1.06 }} to={{ x: "-1vw", y: "-2vh", scale: 1 }} cursor={{ x: 12, y: 8 }} className="cl2-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model in a tailored look, close up" />
        </Layer>
        <Layer z={12} phase={[0.6, 0.68]} from={{ opacity: 1 }} to={{ opacity: 0 }} className="cl-exit">
          <Layer depth={0.24} phase={[0.08, 0.3]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="cl2-copy">
            <span className="cl-eyebrow">01 — a wardrobe of one</span>
            <h2>Clothing that<br /><em>moves like you do.</em></h2>
            <p>A small atelier. Each piece patterned to your body, made in a run of one, and kept in repair for as long as you wear it.</p>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE COLLECTION (лукбук; молния режет разворот диагональю) */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={10} className="cl-scene cl3-scene">
        <div className="cl3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0, 0.2]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cl3-word"><span>STYLE</span></Layer>
        {/* editorial lookbook-разворот: hero-лук + плиты в журнальной вёрстке · refined-rise */}
        <Layer z={5} depth={0.34} phase={[0, 0.16]} from={{ y: "3vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="cl3-plate cl3-hero"><SceneMedia src={`${A}/look1.jpg`} /><figcaption><b>01 · Coat</b><span>tailored shell</span></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.44} phase={[0.03, 0.2]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pa"><SceneMedia src={`${A}/look3.jpg`} /><figcaption><b>02 · Knit</b><span>lavender co-ord</span></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.06, 0.24]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pb"><SceneMedia src={`${A}/look2.jpg`} /><figcaption><b>03 · Slip</b><span>liquid silver</span></figcaption></figure>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.09, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pc"><SceneMedia src={`${A}/look4.jpg`} /><figcaption><b>04 · Suit</b><span>opera gloves</span></figcaption></figure>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.26]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cl3-copy">
          <span className="cl-eyebrow">02 — the collection</span>
          <h2>Twelve looks. <em>None repeated.</em></h2>
          <p>Cut, cloth and drape — a season of one-offs.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE ATELIER: шторы из hero раздвигаются, ателье за ними уже живёт; молния — игла шва */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="cl-scene cl4-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.12 }} to={{ x: "-2vw", y: "2vh", scale: 1.16 }} cursor={{ x: -7, y: -4 }} className="cl4-bg">
          <SceneMedia src={`${A}/atelier.jpg`} />
        </Layer>
        <div className="cl4-veil" aria-hidden />
        <Layer z={12} phase={[0.6, 0.68]} from={{ opacity: 1 }} to={{ opacity: 0 }} className="cl-exit">
        <Layer depth={0.22} phase={[0, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cl4-head">
          <span className="cl-eyebrow">03 — the atelier</span><h2>One room, <em>one pair of hands.</em></h2>
        </Layer>
        {/* шов прострачивается сверху вниз, этапы проявляются на стежках (по --lp) */}
        <Layer depth={0.3} phase={[0.02, 0.56]} from={{ opacity: 0.35 }} to={{ opacity: 1 }} className="cl4-seamL">
          <div className="cl4-seam">
            <span className="cl4-thread" aria-hidden />
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.05 }}><span className="cl4-knot" aria-hidden /><i>i</i><b>Measure</b><s>your posture, thirty points — the pattern on file for a lifetime</s></div>
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.28 }}><span className="cl4-knot" aria-hidden /><i>ii</i><b>Cut</b><s>one cloth, one body, every seam finished by hand</s></div>
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.50 }}><span className="cl4-knot" aria-hidden /><i>iii</i><b>Keep</b><s>mended free for as long as it is yours — no seasons, no churn</s></div>
          </div>
        </Layer>
        </Layer>
        <div className="cl4-drape cl4-drape-l" aria-hidden />
        <div className="cl4-drape cl4-drape-r" aria-hidden />
      </ParallaxScene>

      {/* S5 — CLIENTS: бирки висят на молнии-рейке */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="cl-scene cl5-scene">
        <div className="cl5-bg" aria-hidden />
        <Layer z={2} depth={0.1} from={{ scale: 1.08 }} to={{ y: "-3vh", scale: 1.12 }} className="cl5-curtain">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="cl5-eyebrow">clients</div>
        {/* swing-tags: бирки на нитках роняются и качаются · tag-drop */}
        <Layer z={5} depth={0.28} phase={[0, 0.2]} from={{ y: "-4vh", rotate: "-5deg", opacity: 0 }} to={{ y: "0vh", rotate: "-2deg", opacity: 1 }} className="cl5-tag cl5-t1">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>It fits like nothing I own — and a year on, it still does.</p><cite>a client · her first piece</cite></div>
        </Layer>
        <Layer z={6} depth={0.4} phase={[0.05, 0.25]} from={{ y: "-4vh", rotate: "4deg", opacity: 0 }} to={{ y: "0vh", rotate: "1.5deg", opacity: 1 }} className="cl5-tag cl5-t2">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>Made to my exact body — I stopped shopping anywhere else.</p><cite>a client · two years in</cite></div>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.1, 0.3]} from={{ y: "-4vh", rotate: "-3deg", opacity: 0 }} to={{ y: "0vh", rotate: "-1deg", opacity: 1 }} className="cl5-tag cl5-t3">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>They kept it in repair. It only gets better.</p><cite>a client · the coat</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — YOUR STYLE: финал расстёгивается молнией-застёжкой, молния снова гигант */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} parallax={8} className="cl-scene cl6-scene">
        <div className="cl6-bg" aria-hidden />
        <div className="cl6-mirror" aria-hidden>your <em>style</em></div>
        <Layer z={12} depth={0.24} phase={[0.02, 0.3]} from={{ y: "7vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="cl6-copy">
          <span className="cl-eyebrow">book</span>
          <h2>Make it<br /><em>your style.</em></h2>
        </Layer>
        <div className="cl6-cta">
          <p>A first fitting, on us. Tell us how you live, and we cut the rest.</p>
          <a href="#" onClick={stop} className="cl-btn">Book a fitting <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="cl-foot">
        <div className="cl-foot-top"><b>ALEVTYNA</b><p>A wardrobe of one. Made to measure, kept in repair.</p></div>
        <div className="cl-foot-legal"><span>Alevtyna Atelier</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
