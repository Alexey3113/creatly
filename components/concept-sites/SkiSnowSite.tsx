"use client";
/* Концепт 04b — SKISNOW «TŌJI». Прокат лыж/сноуборда + альпы. Swiss-модернист: cobalt+cream duotone, фигура+пики, гигантский «WINTER» за фигурой, плотная сетка UI-блоков (координаты/25/冬季/штрихкод/ELEV). Hero-приём: swiss-modernist grid. Типо-персона: heavy grotesk + mono. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./skisnow.css";

const A = "/uploads/1/hooks/sites/anim/skisnow";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function SkiSnowSite() {
  return (
    <div className="sk-site">
      <header className="sk-head">
        <Link href="/visual-hooks" className="sk-brand">TŌJI · 冬季</Link>
        <nav className="sk-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Rent gear</a><a href="#" onClick={stop}>Slopes</a>
          <a href="#" onClick={stop}>Passes</a><a href="#" onClick={stop} className="sk-book">Book a board</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="sk-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#e7e0d0" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.03 }} to={{ y: "1vh", scale: 1.06 }} cursor={{ x: -4, y: -3 }} className="sk-bg">
          <SceneMedia src={`${A}/bg.jpg`} />
        </Layer>

        <Layer z={4} depth={0.35} phase={[0.06, 0.7]} from={{ x: "6vw", scale: 1.04, opacity: 0 }} to={{ x: "0vw", scale: 1.1, opacity: 1 }} cursor={{ x: 16, y: 10 }} className="sk-peaks">
          <SceneMedia src={`${A}/peaks.jpg`} />
        </Layer>

        <Layer z={3} depth={0.28} phase={[0.02, 0.5]} from={{ y: "3vh", scale: 0.97, opacity: 0 }} to={{ y: "-1vh", scale: 1, opacity: 1 }} cursor={{ x: -14, y: -8 }} className="sk-title">
          <span>WIN<br />TER</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.95]} from={{ y: "8vh", scale: 0.94, opacity: 0 }} to={{ y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 18, y: 12 }} fit="contain" position="center bottom" className="sk-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Skier in winter gear" />
        </Layer>
        <div className="sk-grain" aria-hidden />

        {/* swiss-modernist grid */}
        <Layer z={12} depth={0.14} phase={[0.06, 0.5]} from={{ x: "-4vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sk-grid-l">
          <div className="sk-eyebrow2">SEASON<br />OF STILLNESS.</div>
          <div className="sk-box">EMBRACE<br />THE SILENCE</div>
          <div className="sk-thin">FROZEN AIR<br />WHITE LIGHT<br />QUIET LANDSCAPES</div>
          <div className="sk-vblock"><span className="sk-jp">冬季</span><span className="sk-vlat">TŌJI · WINTER</span></div>
        </Layer>

        <div className="sk-darkbox">COLD DAYS.<br />CLEAR MIND.<br />WARM SOUL.</div>
        <div className="sk-coord">45.5152° N<br />122.6784° W</div>
        <div className="sk-25">25</div>
        <div className="sk-nature">NATURE<br />SLEEPS.<br />BEAUTY<br />AWAITS.</div>
        <div className="sk-bl">WINTER IS<br />NOT A SEASON,<br />IT'S A <span>FEELING.</span></div>
        <div className="sk-elev"><b>ELEV.</b><span>2,384 M</span></div>
        <div className="sk-flake" aria-hidden>❄</div>
        <div className="sk-cue" aria-hidden>stay wild · stay warm</div>
      </ParallaxScene>

      {/* S2 — THE MOUNTAIN (figure + peaks + grid · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="sk-scene sk2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#e7e0d0" }}>
        <div className="sk2-bg" aria-hidden />
        <div className="sk2-grid" aria-hidden />
        <div className="sk2-word" aria-hidden>SNOW</div>
        <Layer z={5} depth={0.5} phase={[0.05, 0.5]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 12, y: 8 }} className="sk2-figure">
          <SceneMedia src={`${A}/figure-cut.png`} alt="Skier in winter gear" />
        </Layer>
        <Layer z={7} depth={0.62} phase={[0.06, 0.9]} from={{ x: "8vw", y: "-6vh", scale: 0.96, opacity: 0 }} to={{ x: "12vw", y: "-9vh", scale: 1.02, opacity: 1 }} cursor={{ x: -22, y: -13 }}>
          <div className="sk2-peaks"><SceneMedia src={`${A}/peaks-cut.png`} alt="Snow-capped mountain peaks" /><span>45.5152° N / 122.6784° W</span></div>
        </Layer>
        <div className="sk2-kanji" aria-hidden>冬</div>
        <div className="sk2-elev" aria-hidden>ELEV. 2,384 M</div>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="sk2-copy">
          <span className="sk-eyebrow">01 — the mountain</span>
          <h2>Rent a board,<br /><em>keep the season.</em></h2>
          <p>Same-day rental of boards, skis and everything that keeps you warm — fitted in ten minutes at the base. Season passes, lessons for first-timers.</p>
        </Layer>
      </ParallaxScene>

      {/* S3 — THE SLOPES (altitude profile · ridge + runs draw on by --lp) */}
      <ParallaxScene heightVh={300} className="sk-scene sk3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#e7e0d0" }}>
        <div className="sk3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="sk3-word"><span>RIDE</span></Layer>
        <Layer z={12} depth={0.24} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk3-copy">
          <span className="sk-eyebrow">02 — the slopes</span>
          <h2>The whole <em>mountain.</em></h2>
        </Layer>
        <Layer z={6} depth={0.34} phase={[0.05, 0.68]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk3-profileL">
          <div className="sk3-profile">
            <svg viewBox="0 0 1000 440" className="sk3-svg" preserveAspectRatio="none" aria-hidden>
              {[{ y: 90, l: "2400" }, { y: 180, l: "1900" }, { y: 270, l: "1400" }, { y: 360, l: "900" }].map((g) => (
                <g key={g.y}><line className="sk3-gl" x1={0} y1={g.y} x2={1000} y2={g.y} /><text className="sk3-gt" x={8} y={g.y - 6}>{g.l} m</text></g>
              ))}
              <path className="sk3-fill" d="M20 410 L170 320 L320 232 L470 120 L560 70 L660 150 L810 252 L980 330 L980 430 L20 430 Z" />
              <path className="sk3-ridge" d="M20 410 L170 320 L320 232 L470 120 L560 70 L660 150 L810 252 L980 330" pathLength={100} />
              <path className="sk3-run sk3-easy" d="M560 78 Q640 200 800 392" pathLength={100} />
              <path className="sk3-run sk3-int" d="M560 78 Q470 240 360 400" pathLength={100} />
              <path className="sk3-run sk3-exp" d="M560 78 Q600 250 640 410" pathLength={100} />
              <circle className="sk3-summit" cx={560} cy={70} r={7} />
            </svg>
            <div className="sk3-summitlbl">▲ 2,384 M · summit</div>
            <div className="sk3-stats">
              <div><b>1,234 m</b><span>vertical drop</span></div>
              <div><b>42 km</b><span>of marked runs</span></div>
              <div><b>18</b><span>lifts</span></div>
              <div className="sk3-legend"><i className="sk3-le" />easy<i className="sk3-li" />inter<i className="sk3-lx" />expert</div>
            </div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S4 — RENTALS (price list · data) */}
      <ParallaxScene heightVh={260} className="sk-scene sk4-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#1f3fd6" }}>
        <div className="sk4-bg" aria-hidden />
        <div className="sk4-grid" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk4-head">
          <span className="sk-eyebrow">03 — rentals</span><h2>Fitted in <em>ten minutes.</em></h2>
        </Layer>
        {/* каждый прайс-ряд открывается кобальт-блоком слева-направо (по --lp, последовательно) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.7]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sk4-priceL">
          <div className="sk4-prices">
            <div className="sk4-price" style={{ ["--thr" as string]: 0.05 }}><b>Board / Ski</b><s>fitted in ten minutes at the base</s><em>€39<i>/day</i></em></div>
            <div className="sk4-price" style={{ ["--thr" as string]: 0.22 }}><b>Full Kit</b><s>board, boots, helmet and layers</s><em>€59<i>/day</i></em></div>
            <div className="sk4-price" style={{ ["--thr" as string]: 0.39 }}><b>First-timer</b><s>gear, lift pass and a two-hour lesson</s><em>€89<i>/day</i></em></div>
            <div className="sk4-price" style={{ ["--thr" as string]: 0.56 }}><b>Season Pass</b><s>unlimited lifts, priority fittings</s><em>€690</em></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — ON THE MOUNTAIN (piste marker signs · reviews mounted on trail signs, planted in) */}
      <ParallaxScene heightVh={280} className="sk-scene sk5-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#e7e0d0" }}>
        <div className="sk5-bg" aria-hidden />
        <div className="sk5-eyebrow">on the mountain · trail signs</div>
        <Layer z={5} depth={0.3} phase={[0.05, 0.4]} from={{ y: "8vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk5-sign sk5-s1">
          <div className="sk5-board">
            <div className="sk5-badge sk5-easy" aria-hidden />
            <div className="sk5-run"><b>Almwiese</b><s>run 01 · easy</s></div>
            <p className="sk5-note">First time on a board and I was linking turns by lunch.</p><cite>Chloé R. · first-timer</cite>
          </div>
          <span className="sk5-post" aria-hidden />
        </Layer>
        <Layer z={6} depth={0.44} phase={[0.18, 0.52]} from={{ y: "8vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk5-sign sk5-s2">
          <div className="sk5-board">
            <div className="sk5-badge sk5-int" aria-hidden />
            <div className="sk5-run"><b>Nordkette</b><s>run 04 · intermediate</s></div>
            <p className="sk5-note">Fitted in ten minutes, on the first lift by nine. No queue, just snow.</p><cite>Markus B. · season pass</cite>
          </div>
          <span className="sk5-post" aria-hidden />
        </Layer>
        <Layer z={5} depth={0.38} phase={[0.31, 0.64]} from={{ y: "8vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="sk5-sign sk5-s3">
          <div className="sk5-board">
            <div className="sk5-badge sk5-exp" aria-hidden />
            <div className="sk5-run"><b>Nordwand</b><s>off-piste · expert</s></div>
            <p className="sk5-note">They pointed me to a run that wasn't on the map. Best powder in years.</p><cite>Yuto K. · regular</cite>
          </div>
          <span className="sk5-post" aria-hidden />
        </Layer>
      </ParallaxScene>

      {/* S6 — CHASE THE WHITE LIGHT (peaks + CTA · object) */}
      <ParallaxScene heightVh={260} className="sk-scene sk6-scene">
        <div className="sk6-bg" aria-hidden />
        <div className="sk6-grid" aria-hidden />
        <Layer z={4} depth={0.5} phase={[0.05, 0.9]} from={{ y: "4vh", scale: 0.98, opacity: 0 }} to={{ y: "0vh", scale: 1.03, opacity: 1 }} cursor={{ x: 16, y: 10 }} className="sk6-peaks">
          <SceneMedia src={`${A}/peaks-cut.png`} alt="Snow-capped mountain peaks" />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ opacity: 1 }} to={{ opacity: 1 }} className="sk6-copy">
          <span className="sk-eyebrow">book</span>
          <h2>Chase the<br /><em>white light.</em></h2>
        </Layer>
        <div className="sk6-cta">
          <p>Reserve gear and a pass in one go. We fit it; you ride it.</p>
          <a href="#" onClick={stop} className="sk-btn">Book a board <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="sk-foot">
        <div className="sk-foot-top"><b>TŌJI · 冬季</b><p>Rent the gear, keep the season. Stay wild, stay warm.</p></div>
        <div className="sk-foot-legal"><span>Tōji Alpine Rental</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
