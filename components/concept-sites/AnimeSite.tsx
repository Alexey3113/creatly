"use client";
/* Концепт 07 — ANIME «BLOOM+». Collectible magazine cover: cream-pink, гигантский титул за персонажем (occlusion), фигура-вырезка, editorial-колонки, вертикальный JP-текст, штрихкод, сакура-fg. Типо-персона: heavy condensed + JP.
   v2 (аудит 2026-09): обложка собрана при загрузке и живёт (героиня «дышит», ветка качается, летят лепестки).
   Харука — сквозной актёр: обложка → стоит в облаках (S2) → прыгает по стикерам-кадрам (S3) → чиби-указатель в оглавлении (S4) →
   в центре взрыва speed-lines, реплики вокруг — её фанаты (S5) → тянется к кнопке play (S6). Лепестки — через весь сайт.
   Стыки: «CUT TO» — манга-гаттеры (S3 открывается панелями), «удар» (звезда speed-lines), «взрыв схлопывается в play», остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Actor, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./anime.css";

const A = "/uploads/1/hooks/sites/anim/anime";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля p пути закрепления сцены высотой h (vh) — 0: сцена только закрепилась, 1: отпускается
const at = (sel: string, h: number, p: number) => ({ at: sel, anchor: (50 + p * (h - 100)) / h });
const H = { hero: 300, s2: 280, s3: 300, s4: 270, s5: 280, s6: 260 };

export function AnimeSite() {
  return (
    <div className="am-site">
      <Weather kind="petals" count={18} color="#f6b8ce" color2="#ffd9e6" world={0.55} wind={0.9} zIndex={26} seed={9} />
      {/* АКТЁР — Харука */}
      <Actor src={`${A}/hero-cut.png`} width="42vw" zIndex={30} bob={4} tilt={0.05} className="am-actor" stops={[
        { ...at(".am-hero", H.hero, 0), pose: { x: 50, y: 54, s: 1, r: 0 } },
        { ...at(".am-hero", H.hero, 0.6), pose: { x: 50, y: 53, s: 1.04, r: 0 } },
        { ...at(".am2-scene", H.s2, 0.3), pose: { x: 62, y: 56, s: 0.64, r: 0 } },
        { ...at(".am2-scene", H.s2, 0.62), pose: { x: 61, y: 55, s: 0.66, r: 0 } },
        { ...at(".am3-scene", H.s3, 0.22), pose: { x: 19, y: 27, s: 0.26, r: -8 } },
        { ...at(".am3-scene", H.s3, 0.42), pose: { x: 50, y: 21, s: 0.26, r: 7 } },
        { ...at(".am3-scene", H.s3, 0.64), pose: { x: 69, y: 33, s: 0.28, r: -4 } },
        { ...at(".am4-scene", H.s4, 0.2), pose: { x: 17, y: 41, s: 0.2, r: 0 } },
        { ...at(".am4-scene", H.s4, 0.62), pose: { x: 17, y: 60, s: 0.2, r: 0 } },
        { ...at(".am5-scene", H.s5, 0.3), pose: { x: 50, y: 55, s: 0.72, r: 0 } },
        { ...at(".am5-scene", H.s5, 0.62), pose: { x: 50, y: 54, s: 0.75, r: 0 } },
        { ...at(".am6-scene", H.s6, 0.36), pose: { x: 68, y: 62, s: 0.6, r: 0 } },
        { ...at(".am6-scene", H.s6, 0.9), pose: { x: 68, y: 62, s: 0.6, r: 0 } },
        { at: ".am-foot", anchor: -1, pose: { x: 68, y: 50, s: 0.6, o: 0 } },
      ]} />

      <header className="am-head">
        <Link href="/visual-hooks" className="am-brand">BLOOM+</Link>
        <nav className="am-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Watch</a><a href="#" onClick={stop}>Series</a>
          <a href="#" onClick={stop}>Shop</a><a href="#" onClick={stop} className="am-join">Start watching</a>
        </nav>
      </header>

      {/* HERO — обложка собрана при загрузке (rest), скролл продолжает */}
      <ParallaxScene heightVh={H.hero} rest={0.35} intro={1200} className="am-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.04 }} to={{ y: "2vh", scale: 1.1 }} cursor={{ x: -5, y: -4 }} className="am-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="am-blobs" aria-hidden />

        <Layer z={3} phase={[0.76, 0.84]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="am-exit">
          <Layer depth={0.28} phase={[0, 0.22]} from={{ y: "3vh", scale: 0.96, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -8 }} className="am-title">
            <span>HARUKA</span>
          </Layer>
        </Layer>

        <Layer z={8} depth={1} phase={[0, 1]} from={{ y: "-6vh", x: "-3vw", rotate: "-5deg" }} to={{ y: "4vh", x: "2vw", rotate: "4deg" }} cursor={{ x: 44, y: 30 }} fit="contain" className="am-petals">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>

        <Layer z={12} phase={[0.74, 0.82]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="am-exit">
        <Layer depth={0.2} phase={[0.04, 0.26]} from={{ x: "-6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am-col am-col-l">
          <div className="am-colbox">
            <b>HARUKA · 春野</b>
            <p>The medic who refused to stay behind.</p>
            <blockquote>“I&apos;m not here to catch up. I&apos;m here to surpass.”</blockquote>
            <ul className="am-tags"><li>SHONEN</li><li>ACTION</li><li>24 EP</li></ul>
          </div>
        </Layer>

        <Layer depth={0.2} phase={[0.07, 0.29]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am-col am-col-r">
          <div className="am-colbox am-colbox-r">
            <span className="am-jp">桜の意志</span>
            <b>NEW EPISODE</b>
            <p>Episode 12 — «Strength in bloom» — streaming now.</p>
            <span className="am-mark">✿</span>
          </div>
        </Layer>
        </Layer>

        <div className="am-grain" aria-hidden />
        <div className="am-tl">MEDIC NINJA / KONOHA</div>
        <div className="am-tr">LIMITED SERIES / No.012</div>
        <div className="am-barcode" aria-hidden><i /><i /><i /><i /><i /><i /><i /><i /><span>012 · 0208 · 2024</span></div>
        <div className="am-cue" aria-hidden>stream · shop · collect</div>
      </ParallaxScene>

      {/* S2 — WATCH & COLLECT: Харука в облаках сакуры */}
      <ParallaxScene heightVh={H.s2} overlapVh={60} parallax={10} className="am-scene am2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="am2-bg">
          <SceneMedia src={`${A}/skybg.jpg`} />
        </Layer>
        <div className="am2-half" aria-hidden />
        <div className="am2-kanji" aria-hidden>咲</div>
        <Layer z={9} depth={0.8} from={{ y: "-2vh", x: "2vw" }} to={{ y: "2vh", x: "-2vw" }} cursor={{ x: 30, y: 16 }} className="am2-fg">
          <SceneMedia src={`${A}/petals-cut.png`} />
        </Layer>
        <div className="am2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.1, 0.3]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="am2-copy">
          <span className="am-eyebrow">01 — watch &amp; collect</span>
          <h2>Uncut — and the<br /><em>merch to prove it.</em></h2>
          <p>Stream the full catalogue in sub or dub, then collect the limited figures, prints and apparel that drop with each season finale. Members get first pick.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THIS SEASON: «CUT TO» — кадр режется на манга-панели, в них уже эта сцена */}
      <ParallaxScene heightVh={H.s3} overlapVh={60} parallax={8} className="am-scene am3-scene">
        <div className="am3-bg" aria-hidden />
        <div className="am3-half" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0, 0.2]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am3-word"><span>BLOOM</span></Layer>
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="am-exit">
          <Layer depth={0.26} phase={[0.08, 0.26]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="am3-copy">
            <span className="am-eyebrow">02 — this season</span>
            <h2>Cut to — <em>full bloom.</em></h2>
          </Layer>
        </Layer>
        {/* impact frames punch in, one after another */}
        <Layer z={5} depth={0.4} phase={[0, 0.16]} from={{ scale: 1.3, rotate: "-7deg", opacity: 0 }} to={{ scale: 1, rotate: "-3deg", opacity: 1 }} cursor={{ x: 16, y: 10 }} className="am3-cut am3-u1">
          <figure className="am3-cel"><SceneMedia src={`${A}/g1.jpg`} /><span className="am3-fx">ドン</span><b><span>桜</span>Petal Season</b></figure>
        </Layer>
        <Layer z={7} depth={0.56} phase={[0.08, 0.24]} from={{ scale: 1.3, rotate: "6deg", opacity: 0 }} to={{ scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -14, y: -9 }} className="am3-cut am3-u2">
          <figure className="am3-cel"><SceneMedia src={`${A}/g3.jpg`} /><span className="am3-fx">バン</span><b><span>翔</span>Ribbon Runner</b></figure>
        </Layer>
        <Layer z={6} depth={0.48} phase={[0.16, 0.32]} from={{ scale: 1.34, rotate: "-5deg", opacity: 0 }} to={{ scale: 1, rotate: "1deg", opacity: 1 }} cursor={{ x: 20, y: 12 }} className="am3-cut am3-u3">
          <figure className="am3-cel"><SceneMedia src={`${A}/g5.jpg`} /><span className="am3-fx">咲</span><b><span>祭</span>Festival Nights</b></figure>
        </Layer>
        <div className="am3-gutters" aria-hidden />
      </ParallaxScene>

      {/* S4 — IN THIS ISSUE: оглавление на весенней ветке; Харука-чиби — указатель */}
      <ParallaxScene heightVh={H.s4} overlapVh={60} parallax={8} className="am-scene am4-scene">
        <div className="am4-bg" aria-hidden />
        <Layer z={2} depth={0.2} from={{ x: "4vw", scale: 1.04 }} to={{ x: "0vw", y: "-2vh", scale: 1.1 }} className="am4-art">
          <SceneMedia src={`${A}/g4.jpg`} />
        </Layer>
        <div className="am4-half" aria-hidden />
        <Layer z={12} phase={[0.62, 0.7]} depth={0} from={{ opacity: 1 }} to={{ opacity: 0 }} className="am-exit">
          <Layer depth={0.22} phase={[0.02, 0.2]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="am4-head">
            <span className="am-eyebrow">03 — in this issue</span><h2>The spring <em>issue.</em></h2>
          </Layer>
          {/* пункты «влетают» манга-свушем с разных сторон + спид-стрик (по --lp) */}
          <Layer depth={0.3} phase={[0.04, 0.56]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="am4-tocL">
            <div className="am4-toc">
              <div className="am4-item" style={{ ["--thr" as string]: 0.02, ["--dir" as string]: -1 }}><span className="am4-streak" aria-hidden /><i>01</i><b>The Spring Line-up</b><s>twelve new series, ranked</s><em>p.04</em></div>
              <div className="am4-item" style={{ ["--thr" as string]: 0.16, ["--dir" as string]: 1 }}><span className="am4-streak" aria-hidden /><i>02</i><b>Studio Bloom, Uncut</b><s>an hour with the directors</s><em>p.22</em></div>
              <div className="am4-item" style={{ ["--thr" as string]: 0.3, ["--dir" as string]: -1 }}><span className="am4-streak" aria-hidden /><i>03</i><b>The Figure Drops</b><s>every release, dated · early access</s><em>p.38</em></div>
              <div className="am4-item" style={{ ["--thr" as string]: 0.44, ["--dir" as string]: 1 }}><span className="am4-streak" aria-hidden /><i>04</i><b>Poster Insert</b><s>double-sided key art, pull-out</s><em>p.51</em></div>
            </div>
          </Layer>
        </Layer>
      </ParallaxScene>

      {/* S5 — READER MAIL: «удар» — сцена врывается звездой speed-lines; Харука в центре взрыва */}
      <ParallaxScene heightVh={H.s5} overlapVh={60} className="am-scene am5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.16 }} to={{ x: "-2vw", y: "2vh", scale: 1.1 }} cursor={{ x: -7, y: -4 }} className="am5-bg">
          <SceneMedia src={`${A}/actionbg.jpg`} />
        </Layer>
        <div className="am5-half" aria-hidden />
        <div className="am5-eyebrow">reader mail · 読者の声</div>
        <Layer z={6} depth={0.3} phase={[0.04, 0.16]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b1">
          <div className="am5-bubble"><p>Uncut streams plus pull-out prints — I&apos;ve kept every issue since the first.</p><cite>Rina · member, yr 3</cite></div>
        </Layer>
        <Layer z={7} depth={0.46} phase={[0.12, 0.24]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b2">
          <div className="am5-bubble"><p>Got the finale figure before it sold out — membership pays for itself in one drop.</p><cite>Kaz · collector</cite></div>
        </Layer>
        <Layer z={6} depth={0.38} phase={[0.2, 0.32]} from={{ scale: 0.62, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am5-bub am5-b3">
          <div className="am5-bubble"><p>Sub and dub, no cuts, no filler behind paywalls.</p><cite>Devon · subscriber</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — START WATCHING: взрыв схлопывается в кнопку play, Харука тянется к ней */}
      <ParallaxScene heightVh={H.s6} overlapVh={60} className="am-scene am6-scene">
        <div className="am6-bg" aria-hidden />
        <div className="am6-half" aria-hidden />
        <Layer z={4} depth={0.4} phase={[0, 0.3]} from={{ scale: 0.9, opacity: 0.4 }} to={{ scale: 1, opacity: 1 }} className="am6-kanji"><span>咲</span></Layer>
        <div className="am6-play" aria-hidden><i /></div>
        <Layer z={12} depth={0.24} phase={[0.1, 0.34]} from={{ scale: 1.4, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="am6-copy">
          <span className="am-eyebrow">members</span>
          <h2>Start<br /><em>watching.</em></h2>
        </Layer>
        <div className="am6-cta">
          <p>Two weeks free. Cancel anytime. Keep the merch.</p>
          <a href="#" onClick={stop} className="am-btn">Start watching <i>↗</i></a>
        </div>
        <div className="am6-ring" aria-hidden />
      </ParallaxScene>

      <footer className="am-foot">
        <div className="am-foot-top"><b>BLOOM+</b><p>Watch every series. Collect every drop.</p></div>
        <div className="am-foot-legal"><span>Bloom+ Streaming</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
