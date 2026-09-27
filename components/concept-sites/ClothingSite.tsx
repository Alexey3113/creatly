"use client";
/* Концепт 01 — CLOTHING «your style». Editorial fashion, перивинкл-glass, вырезанная модель + стеклянная молния, зеркальная типографика. Все слои отдельные (parallax-scene движок). */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./clothing.css";

const A = "/uploads/1/hooks/sites/anim/clothing";
const stop = (e: React.MouseEvent) => e.preventDefault();

function Wordmark() {
  return (<span className="cl-word"><span className="cl-your">your</span><span className="cl-style">style</span></span>);
}

export function ClothingSite() {
  return (
    <div className="cl-site">
      <header className="cl-head">
        <Link href="/visual-hooks" className="cl-brand">ALEVTYNA</Link>
        <nav className="cl-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Lookbook</a>
          <a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop} className="cl-book">Book a fitting</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="cl-hero" transitionOut={{ type: "diagonal", start: 0.82, angle: -10, color: "#eceefb" }}>
        <Layer z={1} depth={0.15} from={{ scale: 1.06 }} to={{ y: "4vh", scale: 1.16 }} cursor={{ x: -8, y: -6 }}>
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="cl-blobs" aria-hidden />
        <div className="cl-grain" aria-hidden />

        <Layer z={3} depth={0.3} phase={[0.04, 0.4]} from={{ y: "7vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -12, y: -8 }} className="cl-word-tl">
          <Wordmark />
        </Layer>

        <Layer z={5} depth={0.7} phase={[0.05, 0.92]} from={{ x: "5vw", y: "12vh", scale: 0.93, opacity: 0 }} to={{ x: "0vw", y: "-3vh", scale: 1.08, opacity: 1 }} cursor={{ x: 26, y: 16 }} fit="contain" position="66% bottom" className="cl-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model in a tailored look" />
        </Layer>

        <Layer z={7} depth={1} phase={[0.08, 1]} from={{ x: "-3vw", y: "16vh", rotate: "8deg", opacity: 0.92 }} to={{ x: "3vw", y: "-12vh", rotate: "-5deg", opacity: 0.92 }} cursor={{ x: 46, y: 30 }} fit="contain" className="cl-shard" blend="screen">
          <SceneMedia src={`${A}/shard-cut.png`} />
        </Layer>

        <Layer z={8} depth={0.4} phase={[0.2, 0.56]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} cursor={{ x: 14 }} className="cl-word-br">
          <Wordmark />
        </Layer>

        <div className="cl-label cl-tl">SS · 2024</div>
        <div className="cl-label cl-tr">MADE BY<br />ALEVTYNA</div>
        <div className="cl-label cl-bl"><b>01</b><span>the collection</span></div>
        <div className="cl-cue" aria-hidden>scroll</div>
      </ParallaxScene>

      {/* S2 — A WARDROBE OF ONE (model + glass shard · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="cl-scene cl2-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#e9ebfa" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -4, y: -3 }} className="cl2-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="cl2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="cl2-model">
          <SceneMedia src={`${A}/model-cut.png`} alt="Model in a tailored look" />
        </Layer>
        <Layer z={9} depth={0.82} from={{ y: "-2vh", x: "2vw", rotate: "4deg" }} to={{ y: "2vh", x: "-2vw", rotate: "-2deg" }} cursor={{ x: 30, y: 16 }} className="cl2-shard">
          <SceneMedia src={`${A}/shard-cut.png`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="cl2-copy">
          <span className="cl-eyebrow">01 — a wardrobe of one</span>
          <h2>Clothing that<br /><em>moves like you do.</em></h2>
          <p>A small atelier. Each piece patterned to your body, made in a run of one, and kept in repair for as long as you wear it.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE COLLECTION (looks · cards) */}
      <ParallaxScene heightVh={280} className="cl-scene cl3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#e9ebfa" }}>
        <div className="cl3-bg" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.04, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cl3-word"><span>STYLE</span></Layer>
        {/* editorial lookbook-разворот: hero-лук + плиты в журнальной вёрстке · refined-rise */}
        <Layer z={5} depth={0.34} phase={[0.04, 0.4]} from={{ y: "3vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }}>
          <figure className="cl3-plate cl3-hero"><SceneMedia src={`${A}/look1.jpg`} /><figcaption><b>01 · Coat</b><span>tailored shell</span></figcaption></figure>
        </Layer>
        <Layer z={6} depth={0.44} phase={[0.11, 0.46]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pa"><SceneMedia src={`${A}/look3.jpg`} /><figcaption><b>02 · Knit</b><span>lavender co-ord</span></figcaption></figure>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.18, 0.53]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pb"><SceneMedia src={`${A}/look2.jpg`} /><figcaption><b>03 · Slip</b><span>liquid silver</span></figcaption></figure>
        </Layer>
        <Layer z={8} depth={0.6} phase={[0.25, 0.6]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }}>
          <figure className="cl3-plate cl3-pc"><SceneMedia src={`${A}/look4.jpg`} /><figcaption><b>04 · Suit</b><span>opera gloves</span></figcaption></figure>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.06, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cl3-copy">
          <span className="cl-eyebrow">02 — the collection</span>
          <h2>Twelve looks. <em>None repeated.</em></h2>
          <p>Cut, cloth and drape — a season of one-offs.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE ATELIER (process · fg-parallax) */}
      <ParallaxScene heightVh={260} className="cl-scene cl4-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -12, color: "#e9ebfa" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="cl4-bg">
          <SceneMedia src={`${A}/atelier.jpg`} />
        </Layer>
        <div className="cl4-veil" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cl4-head">
          <span className="cl-eyebrow">03 — the atelier</span><h2>One room, <em>one pair of hands.</em></h2>
        </Layer>
        {/* шов прострачивается сверху вниз, этапы проявляются на стежках (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.7]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="cl4-seamL">
          <div className="cl4-seam">
            <span className="cl4-thread" aria-hidden />
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.05 }}><span className="cl4-knot" aria-hidden /><i>i</i><b>Measure</b><s>your posture, thirty points — the pattern on file for a lifetime</s></div>
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.28 }}><span className="cl4-knot" aria-hidden /><i>ii</i><b>Cut</b><s>one cloth, one body, every seam finished by hand</s></div>
            <div className="cl4-stitch" style={{ ["--thr" as string]: 0.50 }}><span className="cl4-knot" aria-hidden /><i>iii</i><b>Keep</b><s>mended free for as long as it is yours — no seasons, no churn</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — CLIENTS (quiet quotes · bg+text) */}
      <ParallaxScene heightVh={260} className="cl-scene cl5-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#e9ebfa" }}>
        <div className="cl5-bg" aria-hidden />
        <div className="cl5-eyebrow">clients</div>
        {/* swing-tags: бирки на нитках роняются и качаются · tag-drop */}
        <Layer z={5} depth={0.28} phase={[0.05, 0.4]} from={{ y: "-4vh", rotate: "-5deg", opacity: 0 }} to={{ y: "0vh", rotate: "-2deg", opacity: 1 }} className="cl5-tag cl5-t1">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>It fits like nothing I own — and a year on, it still does.</p><cite>a client · her first piece</cite></div>
        </Layer>
        <Layer z={6} depth={0.4} phase={[0.16, 0.5]} from={{ y: "-4vh", rotate: "4deg", opacity: 0 }} to={{ y: "0vh", rotate: "1.5deg", opacity: 1 }} className="cl5-tag cl5-t2">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>Made to my exact body — I stopped shopping anywhere else.</p><cite>a client · two years in</cite></div>
        </Layer>
        <Layer z={7} depth={0.52} phase={[0.27, 0.62]} from={{ y: "-4vh", rotate: "-3deg", opacity: 0 }} to={{ y: "0vh", rotate: "-1deg", opacity: 1 }} className="cl5-tag cl5-t3">
          <div className="cl5-swing"><i className="cl5-hole" /><b>YOUR·STYLE</b><p>They kept it in repair. It only gets better.</p><cite>a client · the coat</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — YOUR STYLE (glass shard + CTA · object) */}
      <ParallaxScene heightVh={260} className="cl-scene cl6-scene">
        <div className="cl6-bg" aria-hidden />
        <Layer z={4} depth={0.6} from={{ y: "-2vh", x: "2vw", rotate: "6deg", scale: 1.02 }} to={{ y: "2vh", x: "-2vw", rotate: "-3deg", scale: 1.08 }} cursor={{ x: 26, y: 14 }} className="cl6-shard">
          <SceneMedia src={`${A}/shard-cut.png`} />
        </Layer>
        <div className="cl6-mirror" aria-hidden>your <em>style</em></div>
        <Layer z={12} depth={0.24} phase={[0.05, 0.52]} from={{ y: "7vh", scale: 0.96, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="cl6-copy">
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
