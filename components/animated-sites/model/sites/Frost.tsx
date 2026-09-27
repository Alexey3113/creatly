"use client";
/* FROST — «guided arctic crossings». Мир: горизонтальный минимализм холода — снежная пустошь,
   ледяной грот, полярная ночь под сиянием, замёрзшее море льдин. Собран на общем движке <Reel/>;
   лендинг и типографика — свои (порядок блоков ≠ tidewell), шрифт-пейринг Unbounded × Onest,
   палитра snow/glacial-blue/deep-ice + аврора-зелёный CTA. Сквозной мотив: одна линия следов. */
import { Reel, type ReelScene } from "../reel";
import "./frost.css";

const A = "/uploads/1/animated/frost";

const scenes: ReelScene[] = [
  { id: "plain", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <div className="fr-panel">
      <span className="fr-eyebrow">Guided arctic crossings</span>
      <h1>Empty is <em>the whole point.</em></h1>
      <p>A four-day crossing on foot — snow plain, glacier ice, polar night and frozen sea — following one line of footprints the whole way north.</p>
      <div className="fr-cta"><a href="#book" className="fr-btn">Book a crossing</a><a href="#route" className="fr-ghost">See the route →</a></div>
    </div>
  ) },
  { id: "cave", dark: true, bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <div className="fr-panel"><span className="fr-idx fr-light">— 02 · the vault</span><h2>The Ice Vault</h2>
      <p className="fr-pl">A thousand years of pressure, bent into blue light. Inside, no one talks above a whisper.</p></div>
  ) },
  { id: "aurora", dark: true, spark: 6, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <div className="fr-panel"><span className="fr-idx fr-light">— 03 · polar night</span><h2>Aurora</h2>
      <p className="fr-pl">No wind, no moon — just green light folding over the dark, and the sound of your own breath.</p></div>
  ) },
  { id: "seaice", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <div className="fr-panel"><span className="fr-idx">— 04 · the last ice</span><h2>Sea Ice</h2>
      <p>Pale floes at dawn, a crack of gold between them. One careful step, then the next, until there&rsquo;s shore.</p></div>
  ) },
];

const LEGS: [string, string, string, string][] = [
  ["01", "The Plain", "Nine hours of white, and the mountains never get closer.", `${A}/s1-bg.webp`],
  ["02", "The Vault", "You climb inside the glacier before you climb over it.", `${A}/s2-bg.webp`],
  ["03", "The Night", "Camp is struck before dusk. The sky does the rest.", `${A}/s3-bg.webp`],
  ["04", "The Ice", "The sea remembers it was water. You cross it anyway.", `${A}/s4-bg.webp`],
];

export function Frost() {
  return (
    <div className="fr">
      <header className="fr-nav">
        <span className="fr-brand">FARLINE</span>
        <nav>
          <a href="#route">The line</a>
          <a href="#stats">Numbers</a>
          <a href="#quote">Journal</a>
          <a href="#book" className="fr-nav-cta">Book a crossing</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="walk on ↓" />

      {/* BIG-TYPE — сигнатурный блок: одна гигантская мысль, много воздуха */}
      <section className="fr-statement">
        <span className="fr-kick">The whole approach</span>
        <h2>Nothing but <em>the line.</em></h2>
        <p>No convoy. No route markers. No noise. One guide ahead of you, one file of footprints behind — and four days of the emptiest, clearest country left on the map.</p>
      </section>

      {/* TRAIL — декоративная строка следов, сквозной мотив в лендинге */}
      <div className="fr-trail" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => <span key={i} />)}
      </div>

      {/* GALLERY — четыре отрезка перехода, обложки из своих же bg-плит (новый тип блока) */}
      <section className="fr-gallery" id="route">
        <div className="fr-gallery-head">
          <span className="fr-kick">Four legs, one line</span>
          <h2>The Crossing, in Four Parts</h2>
        </div>
        <div className="fr-gallery-grid">
          {LEGS.map(([n, t, s, img]) => (
            <div className="fr-card" key={n} style={{ backgroundImage: `url(${img})` }}>
              <div className="fr-card-veil" aria-hidden />
              <span className="fr-card-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE — бегущая строка мотива (новый тип блока) */}
      <section className="fr-marquee" aria-hidden="true">
        <div className="fr-marquee-track">
          <span>ONE LINE NORTH — NO NOISE — FOUR DAYS — SIX TRAVELERS, MAX — </span>
          <span>ONE LINE NORTH — NO NOISE — FOUR DAYS — SIX TRAVELERS, MAX — </span>
        </div>
      </section>

      {/* STATS */}
      <section className="fr-stats" id="stats">
        {[["4", "days, start to finish"], ["61 km", "one continuous line north"], ["6", "travelers, maximum"], ["–34°C", "coldest recorded night"]].map(([n, l], i) => (
          <div className="fr-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="fr-quote" id="quote">
        <blockquote>&ldquo;I have stood under the aurora before. I had never stood under it in <em>silence.</em>&rdquo;</blockquote>
        <cite>&mdash; Ines Kallio, crossed in March</cite>
      </section>

      {/* DEAL */}
      <section className="fr-deal" id="book">
        <div className="fr-deal-card">
          <span className="fr-kick">The guided crossing</span>
          <div className="fr-price"><b>&euro;1,850</b><span>/ traveler &middot; guide, shelter &amp; the line north</span></div>
          <p>Four days, three nights, six travelers at most. Tents, stove, satellite link and a guide who has walked this line eleven times. You carry only what you need &mdash; we handle the rest before you arrive.</p>
          <a href="#" className="fr-btn">Reserve a window</a>
          <span className="fr-note">Departures held to clear weather &middot; Full kit provided</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="fr-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="fr-climax-veil" aria-hidden />
        <div className="fr-climax-copy"><h2>The white is <em>four days</em> away.</h2><a href="#book" className="fr-btn">Book a crossing</a></div>
      </section>

      <footer className="fr-foot"><span className="fr-brand">FARLINE</span><span>Guided arctic crossings &middot; One line, four days, no noise.</span></footer>
    </div>
  );
}
