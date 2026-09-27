"use client";
/* KOI — "Koian" garden & tea-house retreat. Мир: сад как замедленное время — мшистая тропа тории →
   тихий пруд с карпами → клёновый мост → чайный дом ночью. Woodblock-flat gouache, НЕ туманный
   ink-wash (это Lantern) — плоские слои цвета, графичный «печатный» силуэт, тишина сада, не горный
   переход. Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок
   блоков, свой шрифт-пейринг Italiana × Sora, палитра moss/vermilion/gold/slate-night + red CTA).
   Мотив: красная нить (карп → клён → фонарь) сквозь зелень — без курсива (плоская печать, не рукопись). */
import { Reel, type ReelScene } from "../reel";
import "./koi.css";

const A = "/uploads/1/animated/koi";

const scenes: ReelScene[] = [
  { id: "torii", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ko-eyebrow">A garden walked slowly</span>
      <h1>Four gates,<br /><em>one long exhale.</em></h1>
      <p>A walked garden in four unhurried scenes — moss path, koi water, the maple bridge, a lit tea house at the hour the garden empties. Nothing here is rushed, including you.</p>
      <div className="ko-cta"><a href="#book" className="ko-btn">Reserve a walk</a><a href="#offerings" className="ko-ghost">See the gates →</a></div>
    </>
  ) },
  { id: "pond", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ko-idx">— 02 · the still water</span><h2>Koi Water</h2>
      <p>Forty fish older than the bridge above them, turning slow circles under the lily pads. Stand at the rail long enough and your own reflection stops fidgeting.</p></>
  ) },
  { id: "bridge", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="ko-idx">— 03 · the red crossing</span><h2>Maple Bridge</h2>
      <p>One arched crossing under a maple that drops its leaves like a held breath finally let go. Vermilion paint, vermilion leaf — the whole garden agrees on this one color.</p></>
  ) },
  { id: "teahouse", dark: true, bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 6, copy: (
    <><span className="ko-idx ko-light">— 04 · the last light</span><h2 className="ko-hl">Teahouse at Night</h2>
      <p className="ko-pl">Paper screens glow gold over the stepping stones. Whoever is inside has already stopped counting the hour. So will you.</p></>
  ) },
];

const SEASONS: [string, string, string, string][] = [
  ["Spring", "First Bow", "The moss greens overnight and the koi remember how to feed at the surface. We open every season by teaching guests to bow at the garden gate — the first rule of pace.", "ko-dot-spring"],
  ["Summer", "Deep Shade", "Full canopy, thick moss, cicadas timing themselves against the fountain's draw and release. The tea master serves cold, whisked matcha under the willow.", "ko-dot-summer"],
  ["Autumn", "Red Hour", "The maple ignites for one week only. Guests are seated at the bridge at exactly four o'clock, when the low sun sets the whole crossing on fire.", "ko-dot-autumn"],
  ["Winter", "Held Water", "Snow on the stone lanterns, the pond half-glassed with ice, koi moving slow beneath it. The garden's quietest season is, guests say, its most honest.", "ko-dot-winter"],
];

const GALLERY: [string, string, string][] = [
  [`${A}/s1-bg.webp`, "Torii Path", "Morning"],
  [`${A}/s2-bg.webp`, "Koi Water", "Midday"],
  [`${A}/s3-bg.webp`, "Maple Bridge", "Afternoon"],
  [`${A}/s4-bg.webp`, "Teahouse", "Night"],
];

const FAQS: [string, string][] = [
  ["Is the garden open in every season?", "Yes — the moss path, pond and bridge are walked year-round; only the teahouse ceremony pauses during the coldest fortnight of winter."],
  ["Can I photograph the koi and the maple bridge?", "Yes, quietly. We only ask you to lower the phone for the ten minutes of the tea ceremony itself — the one rule that matters."],
  ["How many people join a walk?", "Twelve at most, usually fewer. The garden was built for a handful of people at a time, not a crowd."],
  ["What should I wear?", "Flat, quiet shoes. The stepping stones are old and uneven, and the teahouse asks you to remove them at the door."],
];

export function Koi() {
  return (
    <div className="ko">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Italiana&family=Sora:wght@400;500;600;700&display=swap" />

      <header className="ko-nav">
        <span className="ko-brand">KOIAN</span>
        <nav>
          <a href="#offerings">The offerings</a>
          <a href="#seasons">Seasons</a>
          <a href="#book" className="ko-nav-cta">Reserve a walk</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="walk ↓" />

      {/* MANIFESTO — одна крупная мысль */}
      <section className="ko-manifest">
        <p>The garden keeps one color that never apologizes for itself. <em>Follow the red</em> — koi, maple, lantern — and it walks you the whole way through.</p>
      </section>

      {/* SPLIT — showcase кадр (пруд) + текст */}
      <section className="ko-split">
        <div className="ko-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ko-split-copy">
          <span className="ko-kick">Why the water matters</span>
          <h2>We built the whole garden around one still pond.</h2>
          <p>Every path bends toward the koi water eventually — the torii gate, the tea house, even the maple bridge is angled so its reflection lands there. Stillness isn't decoration here; it's the plan.</p>
          <a href="#offerings" className="ko-link">See the offerings →</a>
        </div>
      </section>

      {/* FEATURE-CARDS — три предложения сада */}
      <section className="ko-cards" id="offerings">
        <div className="ko-cards-head"><span className="ko-kick">What a walk includes</span><h2>Three ways to slow down here.</h2></div>
        <div className="ko-card-grid">
          <article className="ko-card">
            <span className="ko-card-n">01</span>
            <h3>The Moss-Path Walk</h3>
            <p>Ninety unhurried minutes through torii, pond and bridge with a guide who has walked the same stones for eleven years and still slows down at the koi.</p>
          </article>
          <article className="ko-card">
            <span className="ko-card-n">02</span>
            <h3>Tea Ceremony, Properly</h3>
            <p>A bowl of matcha whisked in front of you in the lit tea house, taught the old way — kneel, receive, turn the bowl, drink, admire.</p>
          </article>
          <article className="ko-card">
            <span className="ko-card-n">03</span>
            <h3>Koi Feeding at Dusk</h3>
            <p>Forty fish rise to the surface the moment the light goes gold. You feed them by hand while the rest of the garden empties out around you.</p>
          </article>
        </div>
      </section>

      {/* SIGNATURE — вертикальная шкала сада по ЧЕТЫРЁМ СЕЗОНАМ, зигзаг-спайн */}
      <section className="ko-seasons" id="seasons">
        <div className="ko-seasons-head"><span className="ko-kick">The garden, season by season</span><h2>Four seasons, one path.</h2></div>
        <ol className="ko-spine">
          {SEASONS.map(([season, t, s, dot], i) => (
            <li className={`ko-spine-row ${i % 2 ? "ko-spine-r" : "ko-spine-l"}`} key={season}>
              <div className="ko-spine-body">
                <span className="ko-season">{season}</span>
                <h3>{t}</h3>
                <p>{s}</p>
              </div>
              <span className={`ko-spine-dot ${dot}`} aria-hidden />
            </li>
          ))}
        </ol>
      </section>

      {/* GALLERY — 4 сцены как плиты */}
      <section className="ko-gallery">
        <div className="ko-gallery-head"><span className="ko-kick">Four scenes, one walk</span><h2>The garden, gate by gate.</h2></div>
        <div className="ko-gallery-grid">
          {GALLERY.map(([img, t, s]) => (
            <figure className="ko-plate" key={t} style={{ backgroundImage: `url(${img})` }}>
              <figcaption><b>{t}</b><span>{s}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* MARQUEE — бегущая строка мотива */}
      <div className="ko-marquee" aria-hidden>
        <div className="ko-marquee-track">
          <span>THE RED THREAD NEVER LEAVES THE GREEN&nbsp;&nbsp;·&nbsp;&nbsp;KOI&nbsp;&nbsp;·&nbsp;&nbsp;MAPLE&nbsp;&nbsp;·&nbsp;&nbsp;LANTERN&nbsp;&nbsp;·&nbsp;&nbsp;FOUR GATES, ONE GARDEN&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span>THE RED THREAD NEVER LEAVES THE GREEN&nbsp;&nbsp;·&nbsp;&nbsp;KOI&nbsp;&nbsp;·&nbsp;&nbsp;MAPLE&nbsp;&nbsp;·&nbsp;&nbsp;LANTERN&nbsp;&nbsp;·&nbsp;&nbsp;FOUR GATES, ONE GARDEN&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* STATS */}
      <section className="ko-stats">
        {[["300+", "years the garden has stood"], ["40", "koi living in the pond"], ["4", "seasons, one path"], ["12", "guests per walk, max"]].map(([n, l]) => (
          <div className="ko-stat" key={n}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="ko-quote">
        <blockquote>"I have visited gardens on three continents and none of them made me put my phone away without asking. This one just <em>did.</em>"</blockquote>
        <cite>— Renata H., tea instructor · Lisbon</cite>
      </section>

      {/* FAQ / ACCORDION — блок, которого нет у эталона Tidewell */}
      <section className="ko-faq" id="faq">
        <div className="ko-faq-head"><span className="ko-kick">Before you come</span><h2>A few things guests ask.</h2></div>
        <div className="ko-faq-list">
          {FAQS.map(([q, a]) => (
            <details className="ko-faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL */}
      <section className="ko-deal" id="book">
        <div className="ko-deal-card">
          <span className="ko-kick">The four-gate walk</span>
          <div className="ko-price"><b>$145</b><span>/ guest · walk, tea ceremony &amp; a folded paper koi to take home</span></div>
          <p>Ninety minutes on the moss path, a seated ceremony in the lit tea house, and the whole garden mostly to yourselves. Small groups, every season.</p>
          <a href="#" className="ko-btn">Reserve a walk</a>
          <span className="ko-note">Free to reschedule · Rain or shine, the garden holds</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ko-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ko-climax-veil" aria-hidden />
        <div className="ko-climax-copy"><h2>The quiet is <em>one gate</em> away.</h2><a href="#book" className="ko-btn">Reserve a walk</a></div>
      </section>

      <footer className="ko-foot"><span className="ko-brand">KOIAN</span><span>Garden walks &amp; tea, kept slow.</span></footer>
    </div>
  );
}
