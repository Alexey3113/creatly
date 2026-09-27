"use client";
/* Концепт 07 — ANIME «BLOOM+». Collectible magazine cover: cream-pink, гигантский титул за персонажем (occlusion), фигура-вырезка, editorial-колонки, вертикальный JP-текст, штрихкод, сакура-fg. Типо-персона: heavy condensed + JP. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./anime.css";

const A = "/uploads/1/hooks/sites/anim/anime";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function AnimeSite() {
  return (
    <div className="am-site">
      <header className="am-head">
        <Link href="/visual-hooks" className="am-brand">BLOOM+</Link>
        <nav className="am-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Watch</a><a href="#" onClick={stop}>Series</a>
          <a href="#" onClick={stop}>Shop</a><a href="#" onClick={stop} className="am-join">Start watching</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="am-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#f4e9ec" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.04 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="am-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="am-blobs" aria-hidden />

        <Layer z={3} depth={0.28} phase={[0.02, 0.44]} from={{ y: "3vh", scale: 0.96, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -8 }} className="am-title">
          <span>HARUKA</span>
        </Layer>

        <Layer z={5} depth={0.55} phase={[0.04, 0.95]} from={{ y: "10vh", scale: 0.92, opacity: 0 }} to={{ y: "0vh", scale: 1.06, opacity: 1 }} cursor={{ x: 20, y: 12 }} fit="contain" position="center bottom" className="am-hero-char">
          <SceneMedia src={`${A}/hero-cut.png`} alt="Anime heroine character" />
        </Layer>

        <Layer z={8} depth={1} phase={[0.06, 1]} from={{ y: "-8vh", x: "-4vw", rotate: "-6deg", opacity: 0 }} to={{ y: "4vh", x: "2vw", rotate: "4deg", opacity: 1 }} cursor={{ x: 44, y: 30 }} fit="contain" className="am-petals">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>

        <Layer z={12} depth={0.2} phase={[0.08, 0.5]} from={{ x: "-6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am-col am-col-l">
          <div className="am-colbox">
            <b>HARUKA · 春野</b>
            <p>The medic who refused to stay behind.</p>
            <blockquote>“I'm not here to catch up. I'm here to surpass.”</blockquote>
            <ul className="am-tags"><li>SHONEN</li><li>ACTION</li><li>24 EP</li></ul>
          </div>
        </Layer>

        <Layer z={12} depth={0.2} phase={[0.12, 0.54]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am-col am-col-r">
          <div className="am-colbox am-colbox-r">
            <span className="am-jp">桜の意志</span>
            <b>NEW EPISODE</b>
            <p>Episode 12 — «Strength in bloom» — streaming now.</p>
            <span className="am-mark">✿</span>
          </div>
        </Layer>

        <div className="am-grain" aria-hidden />
        <div className="am-tl">MEDIC NINJA / KONOHA</div>
        <div className="am-tr">LIMITED SERIES / No.012</div>
        <div className="am-barcode" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i /><span>012 · 0208 · 2024</span></div>
        <div className="am-cue" aria-hidden>stream · shop · collect</div>
      </ParallaxScene>

      {/* S2 — WATCH & COLLECT (character on sakura sky · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="am-scene am2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#efe0e6" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="am2-bg">
          <SceneMedia src={`${A}/skybg.jpg`} />
        </Layer>
        <div className="am2-half" aria-hidden />
        <div className="am2-kanji" aria-hidden>咲</div>
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="am2-figure">
          <SceneMedia src={`${A}/hero-cut.png`} alt="Anime heroine character" />
        </Layer>
        <Layer z={9} depth={0.8} from={{ y: "-2vh", x: "2vw" }} to={{ y: "2vh", x: "-2vw" }} cursor={{ x: 30, y: 16 }} className="am2-fg">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>
        <div className="am2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am2-copy">
          <span className="am-eyebrow">01 — watch &amp; collect</span>
          <h2>Uncut — and the<br /><em>merch to prove it.</em></h2>
          <p>Stream the full catalogue in sub or dub, then collect the limited figures, prints and apparel that drop with each season finale. Members get first pick.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THIS SEASON (impact-cut montage · key frames punch in with 集中線 speed-lines) */}
      <ParallaxScene heightVh={300} className="am-scene am3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#efe0e6" }}>
        <div className="am3-bg" aria-hidden />
        <div className="am3-half" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am3-word"><span>BLOOM</span></Layer>
        <Layer z={12} depth={0.26} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="am3-copy">
          <span className="am-eyebrow">02 — this season</span>
          <h2>Cut to — <em>full bloom.</em></h2>
        </Layer>
        {/* impact frames punch in, one after another */}
        <Layer z={5} depth={0.4} phase={[0.04, 0.30]} from={{ scale: 1.34, rotate: "-7deg", opacity: 0 }} to={{ scale: 1, rotate: "-3deg", opacity: 1 }} cursor={{ x: 16, y: 10 }} className="am3-cut am3-u1">
          <figure className="am3-cel"><SceneMedia src={`${A}/g1.jpg`} /><span className="am3-fx">ドン</span><b><span>桜</span>Petal Season</b></figure>
        </Layer>
        <Layer z={7} depth={0.56} phase={[0.16, 0.44]} from={{ scale: 1.3, rotate: "6deg", opacity: 0 }} to={{ scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -14, y: -9 }} className="am3-cut am3-u2">
          <figure className="am3-cel"><SceneMedia src={`${A}/g3.jpg`} /><span className="am3-fx">バン</span><b><span>翔</span>Ribbon Runner</b></figure>
        </Layer>
        <Layer z={6} depth={0.48} phase={[0.28, 0.56]} from={{ scale: 1.36, rotate: "-5deg", opacity: 0 }} to={{ scale: 1, rotate: "1deg", opacity: 1 }} cursor={{ x: 20, y: 12 }} className="am3-cut am3-u3">
          <figure className="am3-cel"><SceneMedia src={`${A}/g5.jpg`} /><span className="am3-fx">咲</span><b><span>祭</span>Festival Nights</b></figure>
        </Layer>
      </ParallaxScene>

      {/* S4 — IN THIS ISSUE (contents · data) */}
      <ParallaxScene heightVh={260} className="am-scene am4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#e7e0d3" }}>
        <div className="am4-bg" aria-hidden />
        <div className="am4-half" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="am4-head">
          <span className="am-eyebrow">03 — in this issue</span><h2>The spring <em>issue.</em></h2>
        </Layer>
        {/* пункты «влетают» манга-свушем с разных сторон + спид-стрик (по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="am4-tocL">
          <div className="am4-toc">
            <div className="am4-item" style={{ ["--thr" as string]: 0.04, ["--dir" as string]: -1 }}><span className="am4-streak" aria-hidden /><i>01</i><b>The Spring Line-up</b><s>twelve new series, ranked</s><em>p.04</em></div>
            <div className="am4-item" style={{ ["--thr" as string]: 0.20, ["--dir" as string]: 1 }}><span className="am4-streak" aria-hidden /><i>02</i><b>Studio Bloom, Uncut</b><s>an hour with the directors</s><em>p.22</em></div>
            <div className="am4-item" style={{ ["--thr" as string]: 0.36, ["--dir" as string]: -1 }}><span className="am4-streak" aria-hidden /><i>03</i><b>The Figure Drops</b><s>every release, dated · early access</s><em>p.38</em></div>
            <div className="am4-item" style={{ ["--thr" as string]: 0.52, ["--dir" as string]: 1 }}><span className="am4-streak" aria-hidden /><i>04</i><b>Poster Insert</b><s>double-sided key art, pull-out</s><em>p.51</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — READER MAIL (manga speech bubbles pop in over the action cut) */}
      <ParallaxScene heightVh={280} className="am-scene am5-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#e0326e" }}>
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="am5-bg">
          <SceneMedia src={`${A}/actionbg.jpg`} />
        </Layer>
        <div className="am5-half" aria-hidden />
        <div className="am5-eyebrow">reader mail · 読者の声</div>
        <Layer z={6} depth={0.3} phase={[0.04, 0.2]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b1">
          <div className="am5-bubble"><p>Uncut streams plus pull-out prints — I've kept every issue since the first.</p><cite>Rina · member, yr 3</cite></div>
        </Layer>
        <Layer z={7} depth={0.46} phase={[0.18, 0.34]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b2">
          <div className="am5-bubble"><p>Got the finale figure before it sold out — membership pays for itself in one drop.</p><cite>Kaz · collector</cite></div>
        </Layer>
        <Layer z={6} depth={0.38} phase={[0.32, 0.48]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b3">
          <div className="am5-bubble"><p>Sub and dub, no cuts, no filler behind paywalls.</p><cite>Devon · subscriber</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — START WATCHING (play + CTA · object) */}
      <ParallaxScene heightVh={260} className="am-scene am6-scene">
        <div className="am6-bg" aria-hidden />
        <div className="am6-half" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0.02, 0.55]} from={{ scale: 0.9, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am6-kanji"><span>咲</span></Layer>
        <div className="am6-play" aria-hidden><i /></div>
        <Layer z={12} depth={0.24} phase={[0.05, 0.46]} from={{ scale: 1.4, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am6-copy">
          <span className="am-eyebrow">members</span>
          <h2>Start<br /><em>watching.</em></h2>
        </Layer>
        <div className="am6-cta">
          <p>Two weeks free. Cancel anytime. Keep the merch.</p>
          <a href="#" onClick={stop} className="am-btn">Start watching <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="am-foot">
        <div className="am-foot-top"><b>BLOOM+</b><p>Watch every series. Collect every drop.</p></div>
        <div className="am-foot-legal"><span>Bloom+ Streaming</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
