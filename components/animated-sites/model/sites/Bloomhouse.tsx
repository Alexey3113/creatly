"use client";
/* BLOOMHOUSE — a Victorian glasshouse in the heart of the city. Мир: рукотворная геометрия чугуна и стекла,
   несущая дикую органику растений всё выше к свету. Шрифты Newsreader × Karla, emerald / blush / glass / brass.
   ОДИН ПОДЪЁМ К СВЕТУ: вход → (камера наклоняется вверх) орхидная зала → (сквозь заросли орхидей)
   лилиевый пруд → (круглый просвет купола) купол. Актёр — кованая лоза: растёт по левому полю кадра через
   все залы и закручивается кольцом у купола; в лендинге остаётся на поле страницы и распускается к CTA.
   Акварель на белой бумаге: fg/mid смешиваются multiply — белые плашки вырезок исчезают. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./bloomhouse.css";

const A = "/uploads/1/animated/bloomhouse";
const scenes: ReelScene[] = [
  { id: "entry", len: 1.05, hold: 0.5, bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="bh-eyebrow">A Victorian glasshouse, grown for wonder</span>
      <h1>Step into<br /><em>the light.</em></h1>
      <p>Iron ribs and hand-glazed panes hold up a sky of their own — ferns, orchids and water lilies grow wild beneath. Open to members, wedding parties and Sunday wanderers alike.</p>
      <div className="bh-cta"><a href="#deal" className="bh-btn">Become a Member</a><a href="#halls" className="bh-ghost">Walk the Halls →</a></div>
    </>
  ) },
  { id: "orchids", into: "ascend", tint: "#f6dde4", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, spark: 6, copy: (
    <><span className="bh-idx">— 02 · the orchid hall</span><h2>Orchid Hall</h2>
      <p>Tiered blooms climb the brass trellises in blush and ivory, warmed by glass overhead. Even in January, it is midsummer in here.</p></>
  ) },
  { id: "lilypond", into: "flythrough", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="bh-idx">— 03 · the lily pond</span><h2>The Lily Pond</h2>
      <p>Giant pads rest on still green water beneath a stone footbridge, koi moving like shadows under the glass.</p></>
  ) },
  { id: "dome", into: "portal", portal: { x: 50, y: 6 }, len: 1.2, hold: 0.6, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`,
    freeze: (<div className="bh-freeze"><b>21 m</b><span>up, to the last iron ring</span></div>), copy: (
    <><span className="bh-idx">— 04 · the dome</span><h2>The Dome</h2>
      <p>Vines climb the last iron ring to an open crown of sky. Every arch in the house has been leading here.</p></>
  ) },
];

/* подъём по залам: высота над входом — четыре остановки одного визита (шаги + залы в одном блоке) */
const HALLS: [string, string, string, string][] = [
  ["0 m", "Entrance Hall", "Arrive", "Enter beneath the iron arches. Leave your coat at the brass rail and take a map of the four halls."],
  ["4 m", "Orchid Hall", "Wander", "The air turns warm and blush blooms crowd the trellises overhead, tier on tier."],
  ["9 m", "The Lily Pond", "Cross", "Step onto the stone bridge — giant pads, koi shadows, the glass close above you."],
  ["21 m", "The Dome", "Rise", "Climb to the last ring, where the vines frame an open sky and the whole house sits beneath you."],
];

const PANES: [string, string][] = [
  ["1861", "the year the ironwork went up"],
  ["4", "glass halls, one climb"],
  ["600+", "species living under glass"],
  ["07:30", "member hours, before the gates open"],
];

/* кованая лоза: стебель снизу вверх (pathLength=1 — рост через stroke-dashoffset), листья и цветы по высоте */
const LEAVES: [number, number, number, number][] = [
  // x, y, поворот, доля роста (0 — низ)
  [52, 880, -40, 0.1], [70, 760, 35, 0.24], [44, 640, -30, 0.36], [74, 520, 40, 0.48],
  [50, 400, -35, 0.6], [72, 290, 30, 0.71], [48, 200, -25, 0.8], [66, 120, 30, 0.88],
];
const FLOWERS: [number, number, number][] = [
  // x, y, порядковый номер цветения в лендинге
  [40, 690, 0], [80, 470, 1], [38, 330, 2], [78, 170, 3],
];

export function Bloomhouse() {
  return (
    <div className="bh">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Karla:wght@400;500;600;700&display=swap"]} />
      <header className="bh-nav">
        <span className="bh-brand">BLOOMHOUSE</span>
        <nav><a href="#halls">The Halls</a><a href="#membership">Membership</a><a href="#visitors">Visitors</a><a href="#deal" className="bh-nav-cta">Reserve a Visit</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет стекла светлеет к «небу» у CTA, залы просвечивают под лендингом */}
      <Atmosphere stops={[
        { at: ".bh-manifest", color: "#e9efe6" }, { at: ".bh-hall:nth-child(1)", color: "#e3ebdf" },
        { at: ".bh-hall:nth-child(2)", color: "#f1e4e4" }, { at: ".bh-hall:nth-child(3)", color: "#dfe9e1" },
        { at: ".bh-hall:nth-child(4)", color: "#eef3ee" }, { at: ".bh-split", color: "#e8eee5" },
        { at: ".bh-panes", color: "#eef3f1" }, { at: ".bh-book", color: "#f3f4ec" }, { at: ".bh-deal", color: "#f3f7f8" },
      ]} />
      <Backdrop from=".bh-manifest" dim={0.6} plates={[
        { at: ".bh-manifest", src: `${A}/s1-bg.webp` },
        { at: ".bh-hall:nth-child(1)", src: `${A}/s1-bg.webp` }, { at: ".bh-hall:nth-child(2)", src: `${A}/s2-bg.webp` },
        { at: ".bh-hall:nth-child(3)", src: `${A}/s3-bg.webp` }, { at: ".bh-hall:nth-child(4)", src: `${A}/s4-bg.webp` },
        { at: ".bh-panes", src: `${A}/s4-bg.webp` }, { at: ".bh-deal", src: `${A}/s4-bg.webp` },
      ]} />
      <Weather kind="petals" count={14} color="#f0b8c6" color2="#fbeef0" between={[reelMark("t0"), ".bh-deal"]} world={0.55} zIndex={31} />

      {/* КОВАНАЯ ЛОЗА — растёт вверх по полю кадра (scroll-timeline в css; без поддержки — уже выросла) */}
      <Actor className="bh-vine-actor" width="8.5vw" zIndex={33} bob={0} tilt={0.03} stops={[
        { at: reelMark("s0"), pose: { x: 3.4, y: 52, s: 1, o: 1 } },
        { at: reelMark("t0"), pose: { x: 3.4, y: 56, s: 1, o: 1 } },
        { at: reelMark("s1"), pose: { x: 3.4, y: 52, s: 1, o: 1 } },
        { at: reelMark("t2"), pose: { x: 3.4, y: 54, s: 1, o: 1 } },
        { at: reelMark("s3"), pose: { x: 3.4, y: 50, s: 1, o: 1 } },
        { at: ".bh-manifest", pose: { x: 3.2, y: 50, s: 1, o: 0.9 } },
        { at: ".bh-deal-card", anchor: 0.5, pose: { x: -7, y: 50, s: 0.66, o: 1, dock: true } },
        { at: ".bh-climax", pose: { x: 3.2, y: 40, s: 0.9, o: 0 } },
      ]}>
        <svg className="bh-vine" viewBox="0 0 120 1000" aria-hidden>
          <path className="bh-vine-stem" pathLength={1} d="M60,1010 C22,930 96,850 58,760 S20,580 60,470 S104,300 62,200 C34,140 38,70 70,52 C96,40 104,76 86,86 C72,94 62,78 72,70" />
          <path className="bh-vine-curl" pathLength={1} d="M58,760 c-26,-8 -40,-34 -22,-48 c12,-9 24,2 15,12" />
          <path className="bh-vine-curl bh-vine-curl-2" pathLength={1} d="M62,420 c26,-10 40,-36 22,-50 c-12,-9 -24,2 -15,12" />
          {LEAVES.map(([x, y, r, g], i) => {
            /* стебель уже пророс на 14% и дорастает к 36% скролла — лист раскрывается, когда стебель до него дошёл */
            const at = (36 * (g - 0.14)) / 0.86;
            return (
              <path key={i} className={at <= 0 ? "bh-leaf bh-leaf-on" : "bh-leaf"} style={{ ["--g" as string]: `${at.toFixed(1)}%` }}
                transform={`translate(${x} ${y}) rotate(${r})`} d="M0,0 C8,-12 26,-12 34,0 C26,12 8,12 0,0 Z" />
            );
          })}
          {FLOWERS.map(([x, y, k]) => (
            <g key={k} className={`bh-flower bh-flower-${k + 1}`} transform={`translate(${x} ${y})`}>
              <circle r="9" /><circle className="bh-flower-c" r="3.5" />
            </g>
          ))}
        </svg>
      </Actor>

      {/* MANIFESTO */}
      <section className="bh-manifest">
        <p>Iron holds the glass up. <em>Everything else is left to grow wild.</em></p>
      </section>

      {/* CLIMB — одна шкала высоты через четыре зала (вместо ряда шагов и галереи из 4 плит) */}
      <section className="bh-climb" id="halls">
        <div className="bh-climb-head"><span className="bh-kick">How a visit unfolds</span><h2>Four halls, one climb toward the light.</h2></div>
        <ol className="bh-halls">
          {HALLS.map(([h, t, v, s]) => (
            <li className="bh-hall" key={t}>
              <span className="bh-height">{h}</span>
              <div className="bh-hall-copy">
                <span className="bh-hall-verb">{v}</span>
                <h3>{t}</h3>
                <p>{s}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SPLIT — членство */}
      <section className="bh-split" id="membership">
        <div className="bh-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="bh-split-copy">
          <span className="bh-kick">Membership, for those who want the key</span>
          <h2>Come before the gates open to everyone else.</h2>
          <p>Members let themselves in at half past seven, while the glass is still fogged with dawn. A private hour under the dome, a standing discount at the botanical shop, and two guest passes a year for whoever you want to show the orchids.</p>
          <a href="#deal" className="bh-link">See membership →</a>
        </div>
      </section>

      {/* PANES — цифры в переплёте стекла (вместо полосы из 4 цифр) */}
      <section className="bh-panes" aria-label="Bloomhouse in numbers">
        <div className="bh-window">
          {PANES.map(([n, l]) => (
            <div className="bh-pane" key={l}><b>{n}</b><span>{l}</span></div>
          ))}
        </div>
      </section>

      {/* VISITORS' BOOK — отзыв как запись в книге гостей */}
      <section className="bh-book" id="visitors">
        <figure className="bh-page">
          <span className="bh-page-date">Visitors&rsquo; book · the Dome · 12 March</span>
          <blockquote>“I have been a member for six years and I still stop under the dome every time. It doesn&rsquo;t feel like a garden. It feels like <em>weather that decided to stay</em>.”</blockquote>
          <figcaption>— Priya N., member since 2019 · married in the Orchid Hall</figcaption>
        </figure>
      </section>

      {/* DEAL */}
      <section className="bh-deal" id="deal">
        <div className="bh-deal-card">
          <span className="bh-kick">The glasshouse membership</span>
          <div className="bh-price"><b>£18</b><span>/ month · unlimited entry, all four halls</span></div>
          <p>Early hours before opening, a discount at the botanical shop, and two guest passes a year. Cancel any month — the glasshouse holds no grudges.</p>
          <a href="#" className="bh-btn">Join Bloomhouse</a>
          <span className="bh-note">Founding-member rate for the first 200 · Private hire enquiries welcome</span>
        </div>
      </section>

      {/* CLIMAX — взгляд в купол: круглый просвет в небо */}
      <section className="bh-climax">
        <div className="bh-oculus" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }} aria-hidden />
        <div className="bh-climax-copy"><h2>Your glass sky is <em>one door</em> away.</h2><a href="#deal" className="bh-btn">Reserve a Visit</a></div>
      </section>

      <footer className="bh-foot"><span className="bh-brand">BLOOMHOUSE</span><span>A Victorian glasshouse in the heart of the city · Est. 1861</span></footer>
    </div>
  );
}
