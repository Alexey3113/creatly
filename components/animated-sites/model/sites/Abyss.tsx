"use client";
/* ABYSS — «Rubrica Deep-Temple Expeditions». Мир: боковой трек сквозь затопленный храм в чёрной воде,
   освещённый КРАСНОЙ биолюминесценцией сбоку (не сверху). Шрифты Anton × Outfit,
   палитра black-brine / red-biolum / jade / gold-ruin.
   ОДИН ТРЕК: двор → (пан вдоль колоннады) колоннада → (колонна перекрывает камеру) идол →
   (наезд в зрачок идола) рассольное озеро. Актёр — холодный фонарь ныряльщика: единственная циановая
   точка ведёт слева направо, у идола висит перед глазом, уходит в зрачок, а в лендинге становится
   прожектором-курсором (профиль погружения → «глаз» с цифрами → заявка). */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./abyss.css";

const A = "/uploads/1/animated/abyss";
/* зрачок идола на экране (s3-bg, background-size/position из abyss.css) — точка портала и позы фонаря */
const EYE = { x: 28.8, y: 52.5 };

const scenes: ReelScene[] = [
  {
    id: "forecourt",
    dark: true,
    len: 1.05,
    hold: 0.5,
    bg: `${A}/s1-bg.webp`,
    mid: `${A}/s1-mid.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="ab-eyebrow">Deep-temple expeditions · twelve berths a year</span>
        <h1>
          It glows because
          <br />
          <em>something remembers.</em>
        </h1>
        <p>
          Six hundred metres down, in water no sun has touched in ten thousand years, a temple no
          chart recorded pulses red from the inside. We take divers to stand in front of it.
        </p>
        <div className="ab-cta">
          <a href="#apply" className="ab-btn">
            Apply for a berth
          </a>
          <a href="#descent" className="ab-ghost">
            See the descent →
          </a>
        </div>
      </>
    ),
  },
  {
    id: "colonnade",
    dark: true,
    into: "pan",
    bg: `${A}/s2-bg.webp`,
    mid: `${A}/s2-mid.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="ab-idx">— 02 · the colonnade</span>
        <h2>Between the Pillars</h2>
        <p>
          The light is never above you here — it comes sideways, low, from things that grow on the
          stone. You learn fast which shapes are architecture and which are alive.
        </p>
      </>
    ),
  },
  {
    id: "idol",
    dark: true,
    into: "occlude",
    tint: "#05090d",
    len: 1.3,
    hold: 0.56,
    spark: 5,
    bg: `${A}/s3-bg.webp`,
    fg: `${A}/s3-fg.webp`,
    freeze: (
      <div className="ab-freeze">
        <b>612 m</b>
        <span>the eye · no sun for ten thousand years</span>
      </div>
    ),
    copy: (
      <>
        <span className="ab-idx">— 03 · the idol</span>
        <h2>The Eye That Glows</h2>
        <p>
          Forty metres of carved face, gold veins still bright in the rock, a slow bloom of red
          jellyfish breathing in front of it like a held lung. Nobody has explained the gold.
        </p>
      </>
    ),
  },
  {
    id: "brinepool",
    dark: true,
    into: "portal",
    portal: EYE,
    spark: 7,
    bg: `${A}/s4-bg.webp`,
    mid: `${A}/s4-mid.webp`,
    fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="ab-idx">— 04 · the brine</span>
        <h2>Where the Water Ends</h2>
        <p>
          A pool inside the pool — denser, warmer, its own small alien sea with a shoreline you can
          see and never should cross. This is as far as the guide takes you.
        </p>
      </>
    ),
  },
];

/* профиль погружения: узлы в % поля профиля (x, y) */
const STATIONS: [string, string, string, number, number][] = [
  ["0 m", "Surface Briefing", "Three days of pressure and current drills before anyone gets wet.", 5, 10],
  ["300 m", "The Drop", "A controlled free-fall through open black water, lit only by your own line.", 30, 44],
  ["580 m", "The Threshold", "First red glow. From here the guide leads by light, you follow exactly.", 58, 78],
  ["↑ 0 m", "The Return", "A staged ascent timed to the minute. The temple stays behind — the glow does not.", 86, 22],
];

const FACTS: [string, string][] = [
  ["612 m", "Average depth to the forecourt. No fish past the threshold."],
  ["4 °C", "The brine layer — denser than the sea around it, with a shoreline you can see."],
  ["37 yrs", "Logged since 1987. The glow has not dimmed once."],
  ["12", "Divers a year. The gold stays unrefined, and where it is."],
];

const FEATURES: [string, string][] = [
  ["Red Bioluminescent Bloom", "Colonies that pulse in sequence along the colonnade, bright enough to read a gauge by."],
  ["Unrefined Gold Veins", "Threaded through carved stone that predates any alloy we can date it against."],
  ["The Brine Shoreline", "A visible edge underwater where one sea ends and a denser, stranger one begins."],
  ["Cold Current Silence", "Sound dies past the forecourt. Guides communicate by light alone."],
];

export function Abyss() {
  return (
    <div className="ab">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@400;500;600;700;800&display=swap"]} />

      <header className="ab-nav">
        <span className="ab-brand">RUBRICA</span>
        <nav>
          <a href="#descent">Descent</a>
          <a href="#eye">The eye</a>
          <a href="#dispatch">Dispatches</a>
          <a href="#apply" className="ab-nav-cta">
            Apply for a berth
          </a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="scroll · along the colonnade →" />

      {/* СКВОЗНОЙ СЛОЙ: вода темнеет и краснеет к идолу, под лендингом — плиты храма */}
      <Atmosphere
        stops={[
          { at: ".ab-big", color: "#070d12" },
          { at: ".ab-context", color: "#0a1822" },
          { at: ".ab-route", color: "#0b1c24" },
          { at: ".ab-eyes", color: "#1c090c" },
          { at: ".ab-features", color: "#0d151b" },
          { at: ".ab-dispatch", color: "#130a0e" },
          { at: ".ab-deal", color: "#1d0a0c" },
        ]}
      />
      <Backdrop
        from=".ab-big"
        dim={0.46}
        plates={[
          { at: ".ab-big", src: `${A}/s1-bg.webp` },
          { at: ".ab-route", src: `${A}/s2-bg.webp`, pos: "50% 70%" },
          { at: ".ab-eyes", src: `${A}/s3-bg.webp`, pos: "52% 60%" },
          { at: ".ab-features", src: `${A}/s2-bg.webp`, pos: "50% 70%" },
          { at: ".ab-deal", src: `${A}/s4-bg.webp` },
        ]}
      />
      {/* холодный фонарь — единственная циановая точка мира */}
      <Actor
        className="ab-lamp-actor"
        width="7vw"
        zIndex={33}
        bob={5}
        tilt={0.04}
        stops={[
          { at: reelMark("s0"), pose: { x: 65.5, y: 38, s: 0.7, o: 1 } },
          { at: reelMark("t0"), pose: { x: 63, y: 46, s: 0.8, o: 1 } },
          { at: reelMark("s1"), pose: { x: 51, y: 55, s: 0.75, o: 1 } },
          { at: reelMark("t1"), pose: { x: 44, y: 52, s: 0.9, o: 0.35, blur: 4 } },
          { at: reelMark("s2"), pose: { x: EYE.x + 3, y: EYE.y - 3, s: 0.5, o: 1 } },
          { at: reelMark("t2"), pose: { x: EYE.x, y: EYE.y, s: 0.15, o: 0 } },
          { at: reelMark("s3"), pose: { x: 66.5, y: 31, s: 0.7, o: 1 } },
          { at: reelMark("end"), pose: { x: 72, y: 30, s: 1.2, o: 0.8 } },
          { at: ".ab-big", pose: { x: 50, y: 50, s: 4.5, o: 0.22, blur: 6 } },
          { at: ".ab-station:nth-child(2)", anchor: 0.2, pose: { x: 0, y: 0, s: 0.8, o: 1, dock: true } },
          { at: ".ab-station:nth-child(3)", anchor: 0.2, pose: { x: 0, y: 0, s: 0.8, o: 1, dock: true } },
          { at: ".ab-station:nth-child(4)", anchor: 0.2, pose: { x: 0, y: 0, s: 0.8, o: 1, dock: true } },
          { at: ".ab-station:nth-child(5)", anchor: 0.2, pose: { x: 100, y: 0, s: 0.8, o: 1, dock: true } },
          { at: ".ab-fact:nth-child(1)", pose: { x: 27, y: 50, s: 0.55, o: 1 } },
          { at: ".ab-fact:nth-child(2)", pose: { x: 26, y: 48, s: 0.55, o: 1 } },
          { at: ".ab-fact:nth-child(3)", pose: { x: 27.5, y: 49, s: 0.55, o: 1 } },
          { at: ".ab-fact:nth-child(4)", pose: { x: 26.5, y: 51, s: 0.55, o: 1 } },
          { at: ".ab-features", pose: { x: 80, y: 30, s: 3.5, o: 0.18, blur: 6 } },
          { at: ".ab-deal-card", anchor: 0.6, pose: { x: 50, y: 78, s: 3, o: 0.4, dock: true } },
          { at: ".ab-climax", pose: { x: 50, y: 20, s: 1, o: 0 } },
        ]}
      >
        <div className="ab-lamp">
          <i />
        </div>
      </Actor>
      <Weather kind="spores" count={22} color="#ff5a45" color2="#5fd6c8" between={[reelMark("t0"), ".ab-climax"]} world={0.5} zIndex={31} />

      {/* BIG-TYPE — одна зловещая фраза прямо на воде */}
      <section className="ab-big" id="statement">
        <p>
          IT WAS GLOWING
          <br />
          <em>BEFORE WE ARRIVED.</em>
        </p>
        <span className="ab-big-note">
          Sonar first flagged the anomaly in 1987. No expedition has explained the light. Twelve
          divers a year go to see it anyway.
        </span>
      </section>

      {/* CONTEXT / SPLIT — находка */}
      <section className="ab-context" id="context">
        <div className="ab-context-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ab-context-copy">
          <span className="ab-kick">The find</span>
          <h2>Charts end. The temple doesn&rsquo;t.</h2>
          <p>
            No civilization on record built in black brine at this depth. The stonework matches
            nothing catalogued, the gold is unrefined yet perfectly veined, and the red
            bioluminescence has not dimmed in thirty-seven years of observation. We stopped trying
            to explain it and started guiding people to see it.
          </p>
          <a href="#descent" className="ab-link">
            How we dive it →
          </a>
        </div>
      </section>

      <div className="ab-cols" aria-hidden />

      {/* DIVE PROFILE — путь фонаря: спуск, дно, подъём (вместо ряда шагов и галереи залов) */}
      <section className="ab-route" id="descent">
        <div className="ab-route-head">
          <span className="ab-kick">The descent protocol</span>
          <h2>One line down, one line back.</h2>
        </div>
        <div className="ab-profile">
          <svg className="ab-profile-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <polyline points="0,10 5,10 30,44 58,78 70,78 86,22 100,14" />
          </svg>
          {STATIONS.map(([d, t, s, x, y]) => (
            <div className="ab-station" key={t} style={{ left: `${x}%`, top: `${y}%` }}>
              <b>{d}</b>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE EYE — закреплённая глава: глаз идола стоит, цифры проплывают мимо, фонарь смотрит в зрачок */}
      <section className="ab-eyes" id="eye">
        <div className="ab-eye-pin">
          <div className="ab-eye" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
          <span className="ab-eye-cap">The idol · forecourt level</span>
        </div>
        <div className="ab-facts">
          {FACTS.map(([n, l]) => (
            <div className="ab-fact" key={n}>
              <b>{n}</b>
              <p>{l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ab-cols" aria-hidden />

      {/* FEATURES — что вы увидите */}
      <section className="ab-features" id="features">
        <div className="ab-features-head">
          <span className="ab-kick">What you&rsquo;ll see</span>
          <h2>Nothing about it is explained. Everything about it is real.</h2>
        </div>
        <div className="ab-features-grid">
          {FEATURES.map(([t, s]) => (
            <div className="ab-feature" key={t}>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISPATCH — отзыв как запись из журнала экспедиции (не цитата по центру) */}
      <section className="ab-dispatch" id="dispatch">
        <div className="ab-log">
          <span className="ab-log-meta">Dispatch · Expedition 14 · 611 m · 03:12</span>
          <blockquote>
            &ldquo;I have surveyed collapsed rigs and war wrecks. Nothing prepared me for stone that{" "}
            <em>looks back</em>.&rdquo;
          </blockquote>
          <cite>— Dr. A. Solheim, marine archaeologist</cite>
        </div>
      </section>

      {/* DEAL */}
      <section className="ab-deal" id="apply">
        <div className="ab-deal-card">
          <span className="ab-kick">The guided descent</span>
          <div className="ab-price">
            <b>€4,200</b>
            <span>/ diver · full expedition, gear &amp; decompression support</span>
          </div>
          <p>
            Eight days at the surface station, one guided descent to the idol, staged return.
            Medical clearance required. We confirm twelve berths a year — apply early.
          </p>
          <a href="#" className="ab-btn">
            Apply for a berth
          </a>
          <span className="ab-note">Technical certification required · Waitlist opens each January</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ab-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="ab-climax-veil" aria-hidden />
        <div className="ab-climax-copy">
          <h2>
            The glow is real.
            <br />
            <em>Come see what&rsquo;s under it.</em>
          </h2>
          <a href="#apply" className="ab-btn">
            Apply for a berth
          </a>
        </div>
      </section>

      <footer className="ab-foot">
        <span className="ab-brand">RUBRICA</span>
        <span>Deep-Temple Expeditions · Twelve berths, one glow</span>
      </footer>
    </div>
  );
}
