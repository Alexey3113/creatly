"use client";
/* Концепт 16 — JPTATTOO «彫 HORI». Ирэдзуми-студия. Ukiyo-панк: mustard-yellow + vermillion + sumi-black, тату-фигура, красное солнце, гигантский кандзи 彫, hanko-печати, sumi-мазок. Hero-приём: graphic sun+figure+brush. Типо-персона: Noto JP brush + heavy grotesk.
   Сквозная архитектура (аудит 2026-09): hero собран в покое — печати пропечатываются, 彫 проступает тушью.
   Актёр — красное солнце: ОДИН объект с траекторией по глобальному скроллу (Follow → --sx/--sy/--ss), в каждой сцене
   рисуется на своём месте в z-порядке (за фигурой): hero → садится в волну (S2) → красный фонарь за свитками (S3) →
   маркер шагов (S4) → под горизонтом ночью, печати (S5) → снова восходит (S6). Стыки: мазок тушью (S1→S2, S3→S4, S5→S6),
   тушь растекается от солнца (S2→S3, S4→S5). */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Follow } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./jptattoo.css";

const A = "/uploads/1/hooks/sites/anim/jptattoo";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 280, H3 = 300, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a1 = mk(H1), a2 = mk(H2), a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);
// траектория солнца: x (%), y и диаметр (vh); одни якоря для обеих Follow
const SUN: [string, number, number, number, number][] = [
  [".jt-hero", a1(0.2), 56, 39, 54],
  [".jt-hero", a1(0.62), 56, 41, 52],
  [".jt2-scene", a2(0.34), 50, 40, 42],
  [".jt2-scene", a2(0.64), 50, 58, 40],
  [".jt3-scene", a3(0.36), 50, 50, 36],
  [".jt3-scene", a3(0.66), 50, 50, 36],
  [".jt4-scene", a4(0.3), 20, 37, 6],
  [".jt4-scene", a4(0.48), 20, 50, 6],
  [".jt4-scene", a4(0.66), 20, 63, 6],
  [".jt5-scene", a5(0.36), 50, 104, 44],
  [".jt5-scene", a5(0.66), 50, 100, 46],
  [".jt6-scene", a6(0.4), 62, 50, 46],
  [".jt6-scene", a6(0.8), 62, 44, 50],
];

export function JpTattooSite() {
  return (
    <div className="jt-site">
      <Follow unit="%" stops={SUN.map(([at, anchor, x]) => ({ at, anchor, vars: { "--sx": x } }))} />
      <Follow unit="vh" stops={SUN.map(([at, anchor, , y, d]) => ({ at, anchor, vars: { "--sy": y, "--ss": d } }))} />
      <header className="jt-head">
        <Link href="/visual-hooks" className="jt-brand">彫 · HORI</Link>
        <nav className="jt-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>The work</a><a href="#" onClick={stop}>The craft</a>
          <a href="#" onClick={stop}>Artist</a><a href="#" onClick={stop} className="jt-book">Request a piece</a>
        </nav>
      </header>

      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={10} className="jt-hero">
        <Layer z={1} depth={0.08} from={{ scale: 1.04 }} to={{ y: "2vh", scale: 1.08 }} cursor={{ x: -4, y: -3 }} className="jt-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>
        <div className="jt-sun" aria-hidden />

        <Layer z={3} depth={0.3} phase={[0, 0.3]} from={{ x: "5vw", scale: 0.94, opacity: 0 }} to={{ x: "0vw", scale: 1, opacity: 1 }} cursor={{ x: -16, y: -10 }} className="jt-kanji">
          <span>彫</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0, 0.34]} from={{ y: "8vh", scale: 0.94, opacity: 0 }} to={{ y: "0vh", scale: 1.02, opacity: 1 }} cursor={{ x: 18, y: 12 }} fit="contain" position="center bottom" className="jt-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Figure with traditional Japanese tattoos" />
        </Layer>

        <Layer z={8} depth={0.9} phase={[0, 1]} from={{ x: "-6vw", y: "-4vh", rotate: "-14deg", opacity: 0.4 }} to={{ x: "2vw", y: "2vh", rotate: "6deg", opacity: 0.85 }} cursor={{ x: 40, y: 26 }} fit="contain" className="jt-brush" blend="multiply">
          <SceneMedia src={`${A}/brush-cut.png`} alt="Calligraphy brush" />
        </Layer>
        <div className="jt-grain" aria-hidden />

        <div className="jt-hanko jt-h1"><span className="jt-jp">彫師</span></div>
        <div className="jt-hanko jt-h2"><span className="jt-jp">一期<br />一会</span></div>
        <Layer z={12} depth={0.16} phase={[0, 0.3]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jt-side">
          <div className="jt-box"><b>刺青 · IREZUMI</b><span>hand-poked, by appointment</span></div>
          <p className="jt-motto"><span className="jt-jp">肌に残る物語。</span>A STORY THE SKIN KEEPS.</p>
        </Layer>

        <div className="jt-tl">彫 · HORIMONO</div>
        <div className="jt-tr">EST. MMXXV<br />ONE ARTIST</div>
        <div className="jt-bl">Ink that <span>outlives</span><br />the trend.</div>
        <div className="jt-cue" aria-hidden>request a piece</div>
      </ParallaxScene>

      {/* S2 — THE CRAFT (wave + figure + brush · foreground-parallax) */}
      <ParallaxScene heightVh={H2} overlapVh={OV} className="jt-scene jt2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="jt2-bg">
          <SceneMedia src={`${A}/wavebg.jpg`} />
        </Layer>
        <div className="jt2-sun" aria-hidden />
        <div className="jt2-veil" aria-hidden />
        <div className="jt2-kanji" aria-hidden>彫</div>
        <Layer z={5} depth={0.5} phase={[0.04, 0.3]} from={{ y: "5vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="jt2-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Figure with traditional Japanese tattoos" />
        </Layer>
        <Layer z={9} depth={0.8} from={{ x: "3vw", rotate: "-4deg" }} to={{ x: "-2vw", rotate: "2deg" }} cursor={{ x: 28, y: 15 }} className="jt2-brush">
          <SceneMedia src={`${A}/brush-cut.png`} alt="Calligraphy brush" />
        </Layer>
        <div className="jt2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jt2-copy">
          <span className="jt-eyebrow">01 — the craft</span>
          <h2>Drawn for one body,<br /><em>carved by one hand.</em></h2>
          <p>Traditional Japanese irezumi, designed with you over weeks and worked in long sessions — one client a day, so the room and the artist are yours.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE WORK (kakemono scrolls unrolling · mask-reveal law + descending weight-rod) */}
      <ParallaxScene heightVh={H3} overlapVh={OV} className="jt-scene jt3-scene">
        <div className="jt3-bg" aria-hidden />
        <div className="jt3-sun" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="jt3-word"><span>彫</span></Layer>
        <Layer z={12} depth={0.26} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jt3-copy">
          <span className="jt-eyebrow">02 — the work</span>
          <h2>Hung like <em>scrolls.</em></h2>
          <p>Koi, dragons, waves — each unrolled once, drawn for one body, never repeated.</p>
        </Layer>
        {/* three kakejiku that unroll top→bottom, staggered */}
        <Layer z={5} depth={0.36} phase={[0.08, 0.4]} cursor={{ x: 8, y: 5 }} className="jt3-scroll jt3-s1">
          <figure className="jt3-kake">
            <span className="jt3-rod jt3-top" aria-hidden />
            <div className="jt3-paper"><SceneMedia src={`${A}/g1.jpg`} /><figcaption><span className="jt-jp">背</span>the back-piece</figcaption></div>
            <span className="jt3-rod jt3-btm" aria-hidden />
          </figure>
        </Layer>
        <Layer z={6} depth={0.46} phase={[0.14, 0.46]} cursor={{ x: 10, y: 6 }} className="jt3-scroll jt3-s2">
          <figure className="jt3-kake">
            <span className="jt3-rod jt3-top" aria-hidden />
            <div className="jt3-paper"><SceneMedia src={`${A}/g4.jpg`} /><figcaption><span className="jt-jp">龍</span>the dragon sleeve</figcaption></div>
            <span className="jt3-rod jt3-btm" aria-hidden />
          </figure>
        </Layer>
        <Layer z={7} depth={0.56} phase={[0.2, 0.52]} cursor={{ x: 12, y: 7 }} className="jt3-scroll jt3-s3">
          <figure className="jt3-kake">
            <span className="jt3-rod jt3-top" aria-hidden />
            <div className="jt3-paper"><SceneMedia src={`${A}/g2.jpg`} /><figcaption><span className="jt-jp">鯉</span>the koi, tebori</figcaption></div>
            <span className="jt3-rod jt3-btm" aria-hidden />
          </figure>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE WAY (three steps · data) */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="jt-scene jt4-scene">
        <div className="jt4-bg" aria-hidden />
        <div className="jt4-grain" aria-hidden />
        <Layer z={3} depth={0.5} from={{ x: "4vw", rotate: "8deg", opacity: 0.5 }} to={{ x: "-2vw", rotate: "-4deg", opacity: 0.8 }} cursor={{ x: 22, y: 12 }} className="jt4-brush" blend="multiply">
          <SceneMedia src={`${A}/brush-cut.png`} alt="" />
        </Layer>
        <div className="jt4-sun" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="jt4-head">
          <span className="jt-eyebrow">03 — the way</span><h2>Three steps, <em>one hand.</em></h2>
        </Layer>
        {/* каждый этап «прописывается» мазком сумиэ (мягкая маска слева-направо по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.1, 0.55]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="jt4-waysL">
          <div className="jt4-ways">
            <div className="jt4-way" style={{ ["--thr" as string]: 0.05 }}><i>一</i><b>The drawing</b><s>weeks of design before a needle touches skin — drawn to your body and story alone</s></div>
            <div className="jt4-way" style={{ ["--thr" as string]: 0.25 }}><i>二</i><b>The sessions</b><s>long unhurried sittings, one client a day — machine for line, tebori by hand for shading</s></div>
            <div className="jt4-way" style={{ ["--thr" as string]: 0.45 }}><i>三</i><b>The healing</b><s>aftercare, touch-ups, and the years a big piece takes to settle into skin</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — ON SKIN (sealed testimonials · red hanko stamps press in, one per client's piece) */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="jt-scene jt5-scene">
        <Layer z={1} depth={0.12} from={{ scale: 1.08 }} to={{ x: "-2vw", y: "2vh", scale: 1.14 }} cursor={{ x: -7, y: -4 }} className="jt5-bg">
          <SceneMedia src={`${A}/irezumibg.jpg`} />
        </Layer>
        <div className="jt5-veil" aria-hidden />
        <div className="jt5-sun" aria-hidden />
        <div className="jt5-eyebrow">on skin — sealed by hand</div>
        {/* record + its own seal that stamps down independently */}
        <Layer z={5} depth={0.3} phase={[0.1, 0.28]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jt5-rec jt5-r1">
          <p>Two years, one back-piece — I'd do it all again. It moves like it grew there.</p><cite>Ren T. · full back</cite>
        </Layer>
        <Layer z={9} depth={0.5} phase={[0.2, 0.26]} from={{ scale: 1.55, rotate: "7deg", opacity: 0 }} to={{ scale: 1, rotate: "-5deg", opacity: 1 }} className="jt5-stamp jt5-k1">
          <div className="jt5-hanko"><span className="jt-jp">背</span></div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.2, 0.38]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jt5-rec jt5-r2">
          <p>He turned my half-idea into a dragon that means something.</p><cite>Kaito M. · sleeve</cite>
        </Layer>
        <Layer z={9} depth={0.6} phase={[0.3, 0.36]} from={{ scale: 1.55, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "4deg", opacity: 1 }} className="jt5-stamp jt5-k2">
          <div className="jt5-hanko"><span className="jt-jp">龍</span></div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.3, 0.48]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="jt5-rec jt5-r3">
          <p>One client a day means it's calm, not a factory.</p><cite>Sara V. · koi</cite>
        </Layer>
        <Layer z={9} depth={0.7} phase={[0.4, 0.46]} from={{ scale: 1.55, rotate: "6deg", opacity: 0 }} to={{ scale: 1, rotate: "-4deg", opacity: 1 }} className="jt5-stamp jt5-k3">
          <div className="jt5-hanko"><span className="jt-jp">鯉</span></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — WEAR THE STORY (brush + kanji + CTA · object) */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="jt-scene jt6-scene">
        <div className="jt6-bg" aria-hidden />
        <div className="jt6-sun" aria-hidden />
        <Layer z={3} depth={0.4} phase={[0.02, 0.4]} from={{ scale: 0.92, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="jt6-kanji"><span>彫</span></Layer>
        <Layer z={5} depth={0.7} from={{ x: "4vw", rotate: "3deg" }} to={{ x: "-3vw", rotate: "-3deg" }} cursor={{ x: 26, y: 14 }} className="jt6-brush">
          <SceneMedia src={`${A}/brush-cut.png`} alt="Calligraphy brush" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.24, 0.44]} from={{ x: "-7vw", rotate: "-2deg", opacity: 0 }} to={{ x: "0vw", rotate: "0deg", opacity: 1 }} className="jt6-copy">
          <span className="jt-eyebrow">commission</span>
          <h2>Wear the<br /><em>story.</em></h2>
        </Layer>
        <div className="jt6-cta">
          <p>Custom work only, a few pieces taken each month. Consultation first, always.</p>
          <a href="#" onClick={stop} className="jt-btn">Request a piece <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="jt-foot">
        <div className="jt-foot-top"><b>彫 · HORI</b><p>Traditional Japanese irezumi. A story the skin keeps.</p></div>
        <div className="jt-foot-legal"><span>Hori Irezumi Studio</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
