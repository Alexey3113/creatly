"use client";
/* COCOA — «ARARA», Amazon canopy field-research expeditions. Мир: плотный зелёный собор джунглей, свет пробивается
   редкими копьями. ОДИН АЛЫЙ АРА — единственное красное — ведёт зрителя: далёкая точка над пологом → пролетает
   мимо объектива, камера ныряет сквозь рамку листвы (flythrough) → летит над нефритовой рекой, камера идёт
   вверх по течению (pan) → солонец, где небо краснеет от стаи → камера поднимается вместе с птицей над
   кроной (ascend), стоп-кадр «45 m». В лендинге ара карабкается по закреплённой лиане «4 ярусов» от тёмного пола
   к свету кроны и садится на кнопку брони. Шрифты Zilla Slab × Work Sans, палитра deep-green/macaw-red/gold/jade. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./cocoa.css";

const A = "/uploads/1/animated/cocoa";
/* актёр-ара: спрайт Higs (actor-macaw.webp) или DOM-фолбэк — SVG-силуэт в полёте вправо со взмахом крыла */
const MACAW_SPRITE: string | null = "/uploads/1/animated/cocoa/actor-macaw.webp";
function MacawDom() {
  return (
    <svg className="cc-macaw" viewBox="0 0 200 120" aria-hidden>
      <path className="cc-macaw-wing-b" d="M96 64 C88 84 76 100 62 112 C84 104 104 92 116 70 Z" />
      <path className="cc-macaw-tail" d="M72 62 C48 70 22 82 2 98 C26 92 52 84 78 72 Z" />
      <path className="cc-macaw-tail-tip" d="M2 98 C14 92 28 87 40 83 L36 88 C24 92 12 95 2 98 Z" />
      <ellipse className="cc-macaw-body" cx="104" cy="60" rx="40" ry="15" transform="rotate(-12 104 60)" />
      <g className="cc-macaw-wing">
        <path className="cc-macaw-w1" d="M98 54 C92 34 88 16 90 2 C106 12 122 30 128 50 Z" />
        <path className="cc-macaw-w2" d="M96 42 C92 28 90 16 90 2 C98 8 106 16 112 26 Z" />
        <path className="cc-macaw-w3" d="M92 22 C90 14 89 8 90 2 C94 5 98 9 101 13 Z" />
      </g>
      <circle className="cc-macaw-head" cx="142" cy="46" r="13" />
      <ellipse className="cc-macaw-face" cx="147" cy="47" rx="6.5" ry="5.5" />
      <circle cx="148" cy="46" r="1.7" fill="#1a1612" />
      <path className="cc-macaw-beak" d="M153 41 C162 41 167 47 164 55 C162 50 158 48 153 50 Z" />
      <path d="M153 50 C157 49 160 51 161 54 C158 56 155 55 153 53 Z" fill="#2a2420" />
    </svg>
  );
}

/* s1/s4-mid — прямоугольные плашки джунглей, s2-mid — клякса с гребцом в «нон», s2-fg — прямоугольная плита,
   s3-fg — полоса с жёстким нижним краем: не используем (аудит 2026-09). Красное несёт актёр-ара. */
const scenes: ReelScene[] = [
  { id: "canopy", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="cc-eyebrow">Amazon canopy field station</span>
      <h1>Climb into<br /><em>the green cathedral.</em></h1>
      <p>A five-day ascent through the rainforest's own storeys — forest floor to emergent crown — walking the rope bridges alongside the biologists who mapped them.</p>
      <div className="cc-cta"><a href="#book" className="cc-btn">Book the ascent</a><a href="#climb" className="cc-ghost">See the four layers →</a></div>
    </>
  ) },
  { id: "river", into: "flythrough", tint: "#d8ead0", bg: `${A}/s2-bg.webp`, copy: (
    <><span className="cc-idx">— 02 · the understory</span><h2>The Jade Vein</h2>
      <p>Dugout deep into water the colour of old bottle-glass, walls of green closing overhead. Follow the red — it knows the way upriver.</p></>
  ) },
  { id: "macaws", into: "pan", tint: "#1f6a5a", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, midPos: "80% 70%", copy: (
    <><span className="cc-idx">— 03 · the clay lick</span><h2>Where the Sky <em>Turns Red</em></h2>
      <p>At first light the macaws come down in hundreds to eat the mineral clay. You lie in the blind and let two hundred scarlet wings pass low over your head.</p></>
  ) },
  { id: "emergence", dark: true, into: "ascend", tint: "#d9b44a", len: 1.2, hold: 0.56, bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 6,
    freeze: (<div className="cc-freeze"><b>45 m</b><span>the crown · above the storm</span></div>), copy: (
    <><span className="cc-idx cc-light">— 04 · the crown</span><h2>Above the Storm</h2>
      <p className="cc-pl">Forty-five metres up, the canopy simply ends and the sky begins. A thunderhead rolls by underneath you like a second, darker forest.</p></>
  ) },
];

/* ярусы: y — высота отметки на закреплённой лиане (% экрана), ара карабкается по ним вверх */
const tiers = [
  ["0 m", "Forest Floor", "Buttress roots and leaf-litter dark. Here you get your legs under you and learn to read a machete-cut trail.", "field log · three poison-dart frogs before breakfast", 80],
  ["12 m", "Understory", "Broad leaves catch the filtered light, howlers call overhead — more insect species in this one storey than mammals in the whole reserve.", "field log · a howler troop of fourteen, eye level", 62],
  ["30 m", "Canopy", "You climb into a second world of orchids and ant-gardens on rope bridges. Eighty percent of what lives in the Amazon lives here.", "field log · 700+ bird species from these platforms", 42],
  ["45 m", "Emergent Crown", "Alone above the leaf-sea, macaws wheeling past at eye level, storms rolling by underneath your boots.", "field log · eighteen seasons · six guests per ascent", 22],
] as const;

export function Cocoa() {
  return (
    <div className="cc">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Work+Sans:wght@400;500;600;700&display=swap"]} />

      <header className="cc-nav">
        <span className="cc-brand">ARARA</span>
        <nav><a href="#climb">The Climb</a><a href="#programs">Expeditions</a><a href="#station">Station</a><a href="#book" className="cc-nav-cta">Book the Ascent</a></nav>
      </header>

      <Reel scenes={scenes} cue="into the green ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет от тёмного пола леса к кроне, плиты ярусов под лендингом, споры в копьях света */}
      <Atmosphere stops={[
        { at: ".cc-big", color: "#0c2414" },
        { at: ".cc-tier:nth-child(1)", color: "#040d06" }, { at: ".cc-tier:nth-child(2)", color: "#0a2112" },
        { at: ".cc-tier:nth-child(3)", color: "#143824" }, { at: ".cc-tier:nth-child(4)", color: "#2e4726" },
        { at: ".cc-split", color: "#12301c" }, { at: ".cc-programs", color: "#0e2918" },
        { at: ".cc-quote", color: "#0c2414" }, { at: ".cc-deal", color: "#15361f" },
      ]} />
      <Backdrop from=".cc-big" dim={0.56} plates={[
        { at: ".cc-big", src: `${A}/s4-bg.webp`, pos: "50% 40%" },
        { at: ".cc-tier:nth-child(1)", src: `${A}/s2-bg.webp`, pos: "50% 90%" },
        { at: ".cc-tier:nth-child(2)", src: `${A}/s3-bg.webp`, pos: "50% 70%" },
        { at: ".cc-tier:nth-child(3)", src: `${A}/s1-bg.webp`, pos: "50% 80%" },
        { at: ".cc-tier:nth-child(4)", src: `${A}/s4-bg.webp`, pos: "50% 30%" },
        { at: ".cc-quote", src: `${A}/s3-bg.webp` },
        { at: ".cc-deal", src: `${A}/s1-bg.webp`, pos: "50% 60%" },
      ]} />
      <Weather kind="spores" count={24} color="#f0c257" color2="#cfe3c2" between={[".cc-nav", ".cc-foot"]} world={0.5} zIndex={31} />

      {/* АЛЫЙ АРА — через все ярусы рила и лендинга, садится на CTA */}
      <Actor src={MACAW_SPRITE ?? undefined} width="11vw" zIndex={33} bob={9} tilt={0.14} stops={[
        { at: reelMark("s0"), pose: { x: 73, y: 29, s: 0.32, o: 1, blur: 0.6 } },
        { at: reelMark("t0"), pose: { x: 56, y: 46, s: 1.5, r: -8, o: 1, blur: 3 } },
        { at: reelMark("s1"), pose: { x: 63, y: 36, s: 0.55, r: -4, o: 1, blur: 0 } },
        { at: reelMark("t1"), pose: { x: 76, y: 32, s: 0.6, r: -6, o: 1 } },
        { at: reelMark("s2"), pose: { x: 62, y: 28, s: 0.72, r: -10, o: 1 } },
        { at: reelMark("t2"), pose: { x: 56, y: 48, s: 0.86, r: -18, o: 1 } },
        { at: reelMark("s3"), pose: { x: 58, y: 40, s: 0.62, r: 4, fx: -1, o: 1 } },
        { at: ".cc-big", pose: { x: 82, y: 30, s: 0.5, r: 2, fx: -1, o: 1 } },
        { at: ".cc-tier:nth-child(1)", pose: { x: 21, y: 76, s: 0.58, r: -24, fx: 1, o: 1 } },
        { at: ".cc-tier:nth-child(2)", pose: { x: 23, y: 58, s: 0.58, r: -20, fx: 1, o: 1 } },
        { at: ".cc-tier:nth-child(3)", pose: { x: 21, y: 38, s: 0.58, r: -22, fx: 1, o: 1 } },
        { at: ".cc-tier:nth-child(4)", pose: { x: 24, y: 18, s: 0.62, r: -12, fx: 1, o: 1 } },
        { at: ".cc-split", pose: { x: 88, y: 24, s: 0.5, r: 0, fx: -1, o: 1 } },
        { at: ".cc-quote blockquote", pose: { x: -6, y: 10, s: 0.42, r: 6, fx: 1, o: 1, dock: true } },
        { at: ".cc-deal .cc-btn", pose: { x: 88, y: -52, s: 0.4, r: 0, fx: -1, o: 1, dock: true } },
      ]}>{MACAW_SPRITE ? null : <MacawDom />}</Actor>

      <main className="cc-land">
        {/* BIG-TYPE — поверх кроны в сумерках */}
        <section className="cc-big">
          <p>The canopy is not the top of the forest. <em>It is the floor of the sky.</em></p>
        </section>

        {/* 4 ЯРУСА — закреплённая глава: лиана-ось слева, фон от тёмного пола к свету кроны (вместо шагов, галереи и цифр) */}
        <section className="cc-tiers" id="climb">
          <div className="cc-tiers-pin" aria-hidden>
            <div className="cc-tiers-sticky">
              <svg className="cc-liana" viewBox="0 0 60 1000" preserveAspectRatio="none">
                <path d="M30 1000 C4 920 58 850 30 760 S2 590 30 500 S58 330 30 240 S8 80 30 0" />
                <path className="cc-liana-2" d="M36 1000 C60 900 8 820 34 730 S58 560 30 470 S4 300 34 210 S54 60 32 0" />
              </svg>
              <ol className="cc-alt">
                {tiers.map(([m, , , , y]) => <li key={m} style={{ top: `${y}vh` }}><b>{m}</b></li>)}
              </ol>
            </div>
          </div>
          <div className="cc-tiers-body">
            <header className="cc-tiers-head"><span className="cc-kick">The route, storey by storey</span><h2>Four layers, one climb.</h2></header>
            <ol className="cc-tier-list">
              {tiers.map(([m, t, s, log]) => (
                <li className="cc-tier" key={m}>
                  <span className="cc-tier-m">{m}</span><h3>{t}</h3><p>{s}</p><small>{log}</small>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SPLIT — зачем подниматься */}
        <section className="cc-split" id="station">
          <div className="cc-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
          <div className="cc-split-copy">
            <span className="cc-kick">Why we climb</span>
            <h2>Ninety percent of the forest happens over your head.</h2>
            <p>Ground-level tourism sees fern, shadow and mud. The real Amazon — the fruiting trees, the orchids, the four hundred resident bird species — lives twenty to fifty metres up, in a canopy almost no visitor ever reaches. ARARA runs a working rope-and-platform system alongside resident biologists, and takes a small number of guests up with them each dry season.</p>
            <a href="#climb" className="cc-link">Read the field method →</a>
          </div>
        </section>

        {/* PROGRAMS — форматы экспедиции */}
        <section className="cc-programs" id="programs">
          <div className="cc-programs-head"><span className="cc-kick">Three ways up</span><h2>The Canopy Programs.</h2></div>
          <div className="cc-programs-grid">
            {[["3 days", "Walkway Ascent", "Your first climb: the rope-bridge system through the mid-canopy, taught by the crew who rig it every season."],
              ["5 days", "River-to-Crown Traverse", "The full line — dugout up the jade river, the clay-lick dawn, then the long climb to the emergent platforms."],
              ["2 nights", "Macaw Blind Residency", "A dedicated stay in the dawn hide at the clay lick, for the photographers who want nothing but the red hour."]].map(([meta, t, s], i) => (
              <div className="cc-program" key={i}>
                <span className="cc-program-meta">{meta}</span>
                <h3>{t}</h3>
                <p>{s}</p>
                <a href="#book" className="cc-program-link">Check dates →</a>
              </div>
            ))}
          </div>
        </section>

        {/* QUOTE — полевая заметка у лианы (не по центру) */}
        <section className="cc-quote">
          <span className="cc-kick">From the field notebook</span>
          <blockquote>"I have birded for twenty years and never had a wild macaw pass close enough to feel the wingbeat. Up there you stop being a visitor and start being <em>weather</em>."</blockquote>
          <cite>— Renata Q., ornithologist · Manaus</cite>
        </section>

        {/* DEAL — ара садится на кнопку */}
        <section className="cc-deal" id="book">
          <div className="cc-deal-card">
            <span className="cc-kick">The River-to-Crown Traverse</span>
            <div className="cc-price"><b>$2,150</b><span>/ person · 5 days, guide, permits &amp; rigging</span></div>
            <p>River transfer, canopy-crew training, all platform time and the clay-lick dawn included. Six guests to a season line — we send the field itinerary once your dates are held.</p>
            <a href="#" className="cc-btn">Hold my dates</a>
            <span className="cc-note">Dry-season departures only · Full kit provided</span>
          </div>
        </section>

        {/* CLIMAX */}
        <section className="cc-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
          <div className="cc-climax-veil" aria-hidden />
          <div className="cc-climax-copy"><h2>The forest doesn't end at the treetops. <em>It begins there.</em></h2><a href="#book" className="cc-btn">Book the ascent</a></div>
        </section>
      </main>

      <footer className="cc-foot"><span className="cc-brand">ARARA</span><span>Amazon canopy field station · Four layers, one climb</span></footer>
    </div>
  );
}
