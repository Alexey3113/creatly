"use client";
/* Концепт 18 — WOMENSUIT «SÉVERINE». Премиум женский тейлоринг / ателье. Plum/aubergine + blush + ivory, вертикальный Cormorant-wordmark вдоль левого края, модель в костюме на световом шафте, fabric-swatch летящие карточки, editorial rule + issue-№. Типо-персона: Cormorant Garamond + DM Mono. Hero-приём: vertical maison-wordmark. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./womensuit.css";

const A = "/uploads/1/hooks/sites/anim/womensuit";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function WomenSuitSite() {
  return (
    <div className="ws-site ws-poster">
      <svg className="wv-defs" aria-hidden><filter id="wv-tear"><feTurbulence type="fractalNoise" baseFrequency="0.015 0.07" numOctaves="3" seed="5" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="20" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
      <header className="ws-head">
        <Link href="/visual-hooks" className="ws-brand">Séverine</Link>
        <nav className="ws-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Tailoring</a><a href="#" onClick={stop}>Atelier</a>
          <a href="#" onClick={stop}>Bespoke</a><a href="#" onClick={stop} className="ws-book">Book a fitting</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="ws-hero wv-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#a3111e" }}>
        <Layer z={1} depth={0.06} from={{ scale: 1.05 }} to={{ y: "1.5vh", scale: 1.09 }} cursor={{ x: -4, y: -3 }} className="wv-bg">
          <SceneMedia src={`${A}/redwall.jpg`} />
        </Layer>
        <div className="wv-red" aria-hidden />

        <Layer z={3} depth={0.22} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -10, y: -5 }} className="wv-mast">
          <span>SÉVERINE</span><em>by séverine</em>
        </Layer>

        <Layer z={6} depth={0.5} phase={[0.04, 0.44]} from={{ y: "3vh", scale: 1.02, opacity: 0 }} to={{ y: "0vh", scale: 1.06, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="wv-figure">
          <SceneMedia src={`${A}/figv-cut.png`} alt="Woman in a tailored suit" />
        </Layer>

        <div className="wv-band" aria-hidden><span>SÉVERINE</span></div>

        <div className="wv-grain" aria-hidden />
        <div className="wv-frame" aria-hidden />
        <div className="wv-tl">AUTUMN / TAILORING ’25</div>
        <div className="wv-no">N<em>o</em>25</div>
        <div className="wv-cover">
          <p><b>THE SUIT ISSUE</b>power, cut to a single measure</p>
          <p><b>+ BESPOKE</b>two fittings, no compromise</p>
          <p className="d"><b>“she runs the room”</b>the séverine woman, p.24</p>
        </div>
        <div className="wv-barcode" aria-hidden />
        <div className="wv-lyric">Cut sharp,<br />lit sharper —<br />she runs the room.</div>
        <div className="wv-cue">enter the atelier ↓</div>
        <div className="wv-bar"><span>MAISON · PARIS</span><b>SÉVERINE</b><span>BESPOKE TAILORING</span></div>
      </ParallaxScene>

      {/* S2 — THE CUT (atelier · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="ws-scene w2-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#e7e3da" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="w2-bg">
          <SceneMedia src={`${A}/atelierbg.jpg`} />
        </Layer>
        <div className="w2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.52]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="w2-figure">
          <SceneMedia src={`${A}/figv-cut.png`} alt="Woman in a tailored suit" />
        </Layer>
        <Layer z={9} depth={0.74} from={{ y: "3vh", scale: 1.05 }} to={{ y: "-1vh", scale: 1.1 }} cursor={{ x: 26, y: 15 }} className="w2-fg">
          <SceneMedia src={`${A}/pinsfg.jpg`} />
        </Layer>
        <div className="w2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w2-copy">
          <span className="ws-eyebrow">01 — the cut</span>
          <h2>Cut one measure<br /><em>at a time.</em></h2>
          <p>Fine wools, a canvassed chest, a shoulder set by hand — the kind of construction you feel more than see.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE LOOKBOOK (flying swatch cards) */}
      <ParallaxScene heightVh={280} className="ws-scene w3-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#17110f" }}>
        <div className="w3-bg" aria-hidden />
        <div className="w3-grain" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="w3-word"><span>ATELIER</span></Layer>
        {/* couture-обмер: фигура + мерки-callout проявляются последовательно · measure-in */}
        <Layer z={5} depth={0.4} phase={[0.03, 0.44]} from={{ y: "4vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} fit="contain" className="w3-fig"><SceneMedia src={`${A}/figv-cut.png`} alt="Woman in a tailored suit" /></Layer>
        <Layer z={8} depth={0.28} phase={[0.14, 0.4]} from={{ x: "-2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w3-cal w3-m1"><span className="w3-dash" /><i>shoulder</i><b>39 cm</b></Layer>
        <Layer z={8} depth={0.32} phase={[0.2, 0.46]} from={{ x: "-2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w3-cal w3-m2"><span className="w3-dash" /><i>bust</i><b>86 cm</b></Layer>
        <Layer z={8} depth={0.36} phase={[0.26, 0.52]} from={{ x: "2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w3-cal w3-m3"><i>waist</i><b>68 cm</b><span className="w3-dash" /></Layer>
        <Layer z={8} depth={0.4} phase={[0.32, 0.58]} from={{ x: "2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w3-cal w3-m4"><i>sleeve</i><b>61 cm</b><span className="w3-dash" /></Layer>
        <Layer z={7} depth={0.34} phase={[0.4, 0.66]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="w3-swatches">
          <div className="w3-swatch"><SceneMedia src={`${A}/swatch1.jpg`} /><b>wool · ivory</b></div>
          <div className="w3-swatch"><SceneMedia src={`${A}/swatch2.jpg`} /><b>crepe · plum</b></div>
        </Layer>
        <Layer z={12} depth={0.22} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="w3-copy">
          <span className="ws-eyebrow">02 — the measure</span>
          <h2>Cut to <em>one body.</em></h2>
        </Layer>
      </ParallaxScene>

      {/* S4 — BESPOKE (three fittings · data + tape-measure) */}
      <ParallaxScene heightVh={260} className="ws-scene w4-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 13, color: "#17110f" }}>
        <div className="w4-bg" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="w4-head">
          <span className="ws-eyebrow">03 — bespoke</span><h2>Two fittings, <em>no compromise.</em></h2>
        </Layer>
        {/* веер образцов ткани раскрывается вокруг нижней оси (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.62]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="w4-fanL">
          <div className="w4-fan">
            <div className="w4-swatch w4-sw1" style={{ ["--rot" as string]: "-9deg", ["--tx" as string]: "-15vw", ["--thr" as string]: 0.20, ["--fab" as string]: "#c98a92" }}><span className="w4-cloth" /><i>i</i><b>The measure</b><s>an hour of talk and thirty measurements — the rooms the suit must walk into</s></div>
            <div className="w4-swatch w4-sw2" style={{ ["--rot" as string]: "0deg", ["--tx" as string]: "0vw", ["--thr" as string]: 0.05, ["--fab" as string]: "#3a1f33" }}><span className="w4-cloth" /><i>ii</i><b>The cloth</b><s>English and Italian wools by hand, a canvassed chest basted to your shape alone</s></div>
            <div className="w4-swatch w4-sw3" style={{ ["--rot" as string]: "9deg", ["--tx" as string]: "15vw", ["--thr" as string]: 0.34, ["--fab" as string]: "#e7ddcf" }}><span className="w4-cloth" /><i>iii</i><b>The fittings</b><s>two, sometimes three — nothing leaves until the shoulder sits and the line falls clean</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — IN THEIR WORDS (red spread · bg+text) */}
      <ParallaxScene heightVh={260} className="ws-scene w5-scene" transitionOut={{ type: "curtain", start: 0.85, color: "#17110f" }}>
        <div className="w5-bg" aria-hidden />
        <div className="w5-eyebrow">in their words</div>
        {/* maison care-labels: тканые ярлыки со стежкой · label-settle */}
        <Layer z={5} depth={0.3} phase={[0.05, 0.4]} from={{ y: "-3vh", rotate: "-4deg", opacity: 0 }} to={{ y: "0vh", rotate: "-2deg", opacity: 1 }} className="w5-label w5-la1">
          <div><b>SÉVERINE</b><s>made to measure · 100% wool</s><p>It fits like it was grown on me. I've stopped wearing anything else to anything that matters.</p><cite>Dr. Amélie R. · surgeon</cite></div>
        </Layer>
        <Layer z={6} depth={0.42} phase={[0.16, 0.5]} from={{ y: "-3vh", rotate: "4deg", opacity: 0 }} to={{ y: "0vh", rotate: "1.5deg", opacity: 1 }} className="w5-label w5-la2">
          <div><b>SÉVERINE</b><s>bespoke · canvassed chest</s><p>I wanted armour that didn't look like armour. That's exactly what walked out of the fitting.</p><cite>Nadia S. · founder</cite></div>
        </Layer>
        <Layer z={7} depth={0.54} phase={[0.27, 0.62]} from={{ y: "-3vh", rotate: "-3deg", opacity: 0 }} to={{ y: "0vh", rotate: "-1deg", opacity: 1 }} className="w5-label w5-la3">
          <div><b>SÉVERINE</b><s>kept in repair · no.014</s><p>Five years on, still the best-made thing I own.</p><cite>Bea &amp; Ines · barristers</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — TO YOUR MEASURE (shears object + CTA) */}
      <ParallaxScene heightVh={260} className="ws-scene w6-scene">
        <div className="w6-bg" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.04, 0.5]} from={{ y: "6vh", scale: 0.96, rotate: "-6deg", opacity: 0 }} to={{ y: "0vh", scale: 1.02, rotate: "-3deg", opacity: 1 }} cursor={{ x: 18, y: 11 }} className="w6-obj">
          <SceneMedia src={`${A}/shearsobj-cut.png`} alt="Tailor's shears" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.48]} from={{ y: "-8vh", scale: 1.04, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="w6-copy">
          <span className="ws-eyebrow">the atelier</span>
          <h2>Made to<br /><em>your measure.</em></h2>
        </Layer>
        <div className="w6-cta">
          <p>Book a first fitting. We'll talk cloth, line, and the life the suit has to keep up with.</p>
          <a href="#" onClick={stop} className="ws-btn">Book a fitting <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="ws-foot">
        <div className="ws-foot-top"><b>Séverine</b><p>Bespoke women's tailoring. Cut one measure at a time.</p></div>
        <div className="ws-foot-legal"><span>Maison Séverine</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
