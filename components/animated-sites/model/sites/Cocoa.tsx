"use client";
/* COCOA — «ARARA», Amazon canopy field-research expeditions. Мир: восхождение сквозь ярусы леса —
   полог на рассвете → нефритовая река → глиняный солонец с ара → прорыв сквозь крону над штормом
   в сумерках. Сквозной мотив: спираль лианы/реки, ведущая вверх от пола джунглей к кроне — прошита
   через сигнатурный горизонтальный степ-блок (ярусы леса). Собран на общем движке <Reel/>; лендинг
   и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков, шрифт-пейринг Zilla Slab × Work Sans,
   палитра deep-green/macaw-red/gold/jade + macaw-red CTA). */
import { Reel, type ReelScene } from "../reel";
import "./cocoa.css";

const A = "/uploads/1/animated/cocoa";
const scenes: ReelScene[] = [
  { id: "canopy", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="cc-eyebrow">Amazon canopy field station</span>
      <h1>Climb into<br /><em>the green cathedral.</em></h1>
      <p>A five-day ascent through the rainforest's own storeys — forest floor to emergent crown — walking the rope bridges alongside the biologists who mapped them.</p>
      <div className="cc-cta"><a href="#book" className="cc-btn">Book the ascent</a><a href="#climb" className="cc-ghost">See the four layers →</a></div>
    </>
  ) },
  { id: "river", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="cc-idx">— 02 · the understory</span><h2>The Jade Vein</h2>
      <p>Dugout deep into water the colour of old bottle-glass, walls of green closing overhead. This is where the forest starts to breathe on you.</p></>
  ) },
  { id: "macaws", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="cc-idx">— 03 · the clay lick</span><h2 className="cc-hl">Where the Sky Turns Red</h2>
      <p>At first light the macaws come down in hundreds to eat the mineral clay. You lie in the blind and let two hundred scarlet wings pass low over your head.</p></>
  ) },
  { id: "emergence", dark: true, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="cc-idx cc-light">— 04 · the crown</span><h2 className="cc-hl-light">Above the Storm</h2>
      <p className="cc-pl">Forty-five metres up, the canopy simply ends and the sky begins. A thunderhead rolls by underneath you like a second, darker forest.</p></>
  ) },
];

export function Cocoa() {
  return (
    <div className="cc">
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- дублируем @import линком (Turbopack иногда роняет неглавный @import) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Work+Sans:wght@400;500;600;700&display=swap" />

      <header className="cc-nav">
        <span className="cc-brand">ARARA</span>
        <nav><a href="#climb">The Climb</a><a href="#programs">Expeditions</a><a href="#station">Station</a><a href="#book" className="cc-nav-cta">Book the Ascent</a></nav>
      </header>

      <Reel scenes={scenes} cue="ascend ↓" />

      {/* BIG-TYPE — одна гигантская мысль-заявление (блок, каких у эталона нет) */}
      <section className="cc-big">
        <p>The canopy is not the top of the forest. <em>It is the floor of the sky.</em></p>
      </section>

      {/* SPLIT — контекст/проблема */}
      <section className="cc-split" id="station">
        <div className="cc-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="cc-split-copy">
          <span className="cc-kick">Why we climb</span>
          <h2>Ninety percent of the forest happens over your head.</h2>
          <p>Ground-level tourism sees fern, shadow and mud. The real Amazon — the fruiting trees, the orchids, the four hundred resident bird species — lives twenty to fifty metres up, in a canopy almost no visitor ever reaches. ARARA runs a working rope-and-platform system alongside resident biologists, and takes a small number of guests up with them each dry season.</p>
          <a href="#climb" className="cc-link">Read the field method →</a>
        </div>
      </section>

      {/* FEATURE CARDS — форматы экспедиции */}
      <section className="cc-features" id="programs">
        <div className="cc-features-head"><span className="cc-kick">Three ways up</span><h2>The Canopy Programs.</h2></div>
        <div className="cc-features-grid">
          {[["3 days", "Walkway Ascent", "Your first climb: the rope-bridge system through the mid-canopy, taught by the crew who rig it every season."],
            ["5 days", "River-to-Crown Traverse", "The full line — dugout up the jade river, the clay-lick dawn, then the long climb to the emergent platforms."],
            ["2 nights", "Macaw Blind Residency", "A dedicated stay in the dawn hide at the clay lick, for the photographers who want nothing but the red hour."]].map(([meta, t, s], i) => (
            <div className="cc-feature" key={i}>
              <span className="cc-feature-meta">{meta}</span>
              <h3>{t}</h3>
              <p>{s}</p>
              <a href="#book" className="cc-feature-link">Check dates →</a>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE — HORIZONTAL STEPS: ярусы леса, восхождение пола к кроне */}
      <section className="cc-steps" id="climb">
        <div className="cc-steps-head"><span className="cc-kick">The route, storey by storey</span><h2>Four layers, one climb.</h2></div>
        <div className="cc-steps-line" aria-hidden>
          <svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0,32 C60,4 100,4 140,20 S220,36 260,18 S340,2 400,14" /></svg>
        </div>
        <ol className="cc-steps-row">
          {[["0 m", "Forest Floor", "Buttress roots and leaf-litter dark. Here you get your legs under you and learn to read a machete-cut trail."],
            ["12 m", "Understory", "Broad leaves catch the filtered light, howlers call overhead — more insect species in this one storey than mammals in the whole reserve."],
            ["30 m", "Canopy", "You climb into a second world of orchids and ant-gardens on rope bridges. Eighty percent of what lives in the Amazon lives here."],
            ["45 m", "Emergent Crown", "Alone above the leaf-sea, macaws wheeling past at eye level, storms rolling by underneath your boots."]].map(([n, t, s], i) => (
            <li key={i}><span className="cc-steps-n">{n}</span><h3>{t}</h3><p>{s}</p></li>
          ))}
        </ol>
      </section>

      {/* GALLERY — 4 плиты-обложки = четыре главы восхождения */}
      <section className="cc-gallery">
        <div className="cc-gallery-head"><span className="cc-kick">The four rooms</span><h2>One forest, four faces.</h2></div>
        <div className="cc-gallery-grid">
          {[["s1-bg.webp", "Dawn Canopy", "Mist over the treetops"], ["s2-bg.webp", "The Jade River", "Dugout through green water"],
            ["s3-bg.webp", "The Clay Lick", "Scarlet macaws at first light"], ["s4-bg.webp", "The Emergent Crown", "Above the evening storm"]].map(([img, t, s], i) => (
            <div className="cc-gallery-item" key={i} style={{ backgroundImage: `url(${A}/${img})` }}>
              <div className="cc-gallery-cap"><h3>{t}</h3><span>{s}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="cc-stats">
        {[["700+", "bird species logged"], ["45 m", "highest platform"], ["18", "seasons in the canopy"], ["6", "guests per ascent, max"]].map(([n, l], i) => (
          <div className="cc-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="cc-quote">
        <blockquote>"I have birded for twenty years and never had a wild macaw pass close enough to feel the wingbeat. Up there you stop being a visitor and start being <em>weather</em>."</blockquote>
        <cite>— Renata Q., ornithologist · Manaus</cite>
      </section>

      {/* MARQUEE — бегущая строка видов (блок, каких у эталона нет) */}
      <section className="cc-marquee" aria-hidden>
        <div className="cc-marquee-track">
          <span>SCARLET MACAW · HARPY EAGLE · GIANT OTTER · KAPOK · STRANGLER FIG · POISON DART FROG · JAGUAR · BRAZIL NUT ·&nbsp;</span>
          <span>SCARLET MACAW · HARPY EAGLE · GIANT OTTER · KAPOK · STRANGLER FIG · POISON DART FROG · JAGUAR · BRAZIL NUT ·&nbsp;</span>
        </div>
      </section>

      {/* DEAL */}
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

      <footer className="cc-foot"><span className="cc-brand">ARARA</span><span>Amazon canopy field station · Four layers, one climb</span></footer>
    </div>
  );
}
