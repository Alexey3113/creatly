"use client";
/* LANTERN — «Redthread» guided mountain ascents. Мир: рассветные рисовые террасы → вермильоновые
   ворота храма → ночной фестиваль плавучих фонарей → святилище на вершине над облаками.
   Собран на общем движке <Reel/>; лендинг и типографика — БЕСХОЗНЫЕ (свой набор/порядок блоков,
   свой шрифт-пейринг Spectral × IBM Plex Sans, палитра jade/vermilion/gold/mist + red CTA). */
import { Reel, type ReelScene } from "../reel";
import "./lantern.css";

const A = "/uploads/1/animated/lantern";

const scenes: ReelScene[] = [
  { id: "terraces", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="ln-eyebrow">Guided mountain ascents</span>
      <h1>Climb until<br /><em>the mist starts glowing.</em></h1>
      <p>A four-day painted ascent through terrace, gate and lantern water to a shrine standing alone above the clouds. You carry one thread of red light the whole way up.</p>
      <div className="ln-cta"><a href="#book" className="ln-btn">Reserve the climb</a><a href="#ascent" className="ln-ghost">See the ascent →</a></div>
    </>
  ) },
  { id: "gate", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="ln-idx">— 02 · the threshold</span><h2>Vermilion Gate</h2>
      <p>Stone lions, cedar smoke, a monk sweeping the same step he has swept for forty years. This is where the mountain starts asking things of you.</p></>
  ) },
  { id: "festival", dark: true, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, spark: 7, copy: (
    <><span className="ln-idx ln-light">— 03 · the release</span><h2 className="ln-hl">Lantern Water</h2>
      <p className="ln-pl">A village lit by hundreds of paper lanterns doubled in a black pond. You write one word on yours, and let the current take it.</p></>
  ) },
  { id: "shrine", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="ln-idx">— 04 · the summit</span><h2>Shrine Above Cloud</h2>
      <p>Bells, a bowed head, a red banner cracking in the wind. Everything below you is a white sea. This is the part no photograph gets right.</p></>
  ) },
];

const CHAPTERS = [
  ["620 m", "Rice Terraces", "Dawn breaks over stepped water and the fog hasn't decided to lift. First hour, first breath — this is where the noise of the valley finally stops following you."],
  ["1,140 m", "Vermilion Gate", "The forest closes in, cedar and stone. You pass under a gate older than any map of this range and the trail changes — narrower, quieter, watched."],
  ["1,860 m", "Lantern Water", "Night, and the whole village hangs its light out over a pond. You release a lantern with the others and sleep to the smell of paper and smoke."],
  ["2,430 m", "Summit Shrine", "Above the cloud line at first gold light. Bells, thin air, a red cord tied to the railing by climbers before you. You add your own."],
];

export function Lantern() {
  return (
    <div className="ln">
      <header className="ln-nav">
        <span className="ln-brand">REDTHREAD</span>
        <nav><a href="#ascent">The ascent</a><a href="#included">Included</a><a href="#book" className="ln-nav-cta">Reserve the climb</a></nav>
      </header>

      <Reel scenes={scenes} cue="ascend ↓" />

      {/* MANIFESTO — одна крупная мысль */}
      <section className="ln-manifest">
        <p>The valley has a thousand lights and none of them <em>mean anything.</em> Up here, one does.</p>
      </section>

      {/* BIG-TYPE — проблема/контекст (новый тип блока, не в эталоне) */}
      <section className="ln-claim">
        <span className="ln-kick">Before the climb</span>
        <h2 className="ln-claim-h">Most treks end at a viewpoint.<br />This one ends at a <em>ceremony.</em></h2>
      </section>

      {/* FEATURE-CARDS — что входит (новый тип блока) */}
      <section className="ln-cards" id="included">
        <div className="ln-cards-head"><span className="ln-kick">What the climb includes</span><h2>Three things you carry up.</h2></div>
        <div className="ln-card-grid">
          <article className="ln-card">
            <span className="ln-card-n">01</span>
            <h3>An ink-wash trail map</h3>
            <p>Every ridge and switchback painted before you walk it, so you're never guessing at the next gate in the fog.</p>
          </article>
          <article className="ln-card">
            <span className="ln-card-n">02</span>
            <h3>Threshold rites</h3>
            <p>A guide fluent in the temple's own customs walks you through the gate properly — the sweep, the bow, the incense.</p>
          </article>
          <article className="ln-card">
            <span className="ln-card-n">03</span>
            <h3>A hand-folded lantern</h3>
            <p>Made by village hands from mulberry paper and a length of red thread, and yours alone to release at the water.</p>
          </article>
        </div>
      </section>

      {/* SIGNATURE — вертикальная шкала восхождения по высоте */}
      <section className="ln-ascent" id="ascent">
        <div className="ln-ascent-head"><span className="ln-kick">The route, metre by metre</span><h2>Four chapters, one thread of light.</h2></div>
        <ol className="ln-spine">
          {CHAPTERS.map(([alt, t, s], i) => (
            <li className="ln-spine-row" key={i}>
              <span className="ln-alt">{alt}</span>
              <span className="ln-spine-dot" aria-hidden />
              <div><h3>{t}</h3><p>{s}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* SPLIT — showcase кадр + текст (ворота) */}
      <section className="ln-split">
        <div className="ln-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="ln-split-copy">
          <span className="ln-kick">Why the gate matters</span>
          <h2>We don't rush you past the threshold.</h2>
          <p>Most tours treat the vermilion gate as a photo stop. We stop there for an hour — incense, a short rite, a story about the lions carved either side. You climb the rest of the mountain differently for it.</p>
          <a href="#book" className="ln-link">Read the full route →</a>
        </div>
      </section>

      {/* GALLERY — 4 главы как плиты */}
      <section className="ln-gallery">
        <div className="ln-gallery-head"><span className="ln-kick">Four seasons of the same climb</span><h2>The mountain, chapter by chapter.</h2></div>
        <div className="ln-gallery-grid">
          {[[`${A}/s1-bg.webp`, "Terraces", "Dawn"], [`${A}/s2-bg.webp`, "Gate", "Threshold"], [`${A}/s3-bg.webp`, "Lantern Water", "Night"], [`${A}/s4-bg.webp`, "Shrine", "Summit"]].map(([img, t, s], i) => (
            <figure className="ln-plate" key={i} style={{ backgroundImage: `url(${img})` }}>
              <figcaption><b>{t}</b><span>{s}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* MARQUEE — бегущая строка мотива */}
      <div className="ln-marquee" aria-hidden>
        <div className="ln-marquee-track">
          <span>THE RED THREAD BURNS THROUGH THE MIST&nbsp;&nbsp;·&nbsp;&nbsp;ONE LANTERN, ONE CLIMBER&nbsp;&nbsp;·&nbsp;&nbsp;2,430 METRES OF QUIET&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <span>THE RED THREAD BURNS THROUGH THE MIST&nbsp;&nbsp;·&nbsp;&nbsp;ONE LANTERN, ONE CLIMBER&nbsp;&nbsp;·&nbsp;&nbsp;2,430 METRES OF QUIET&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* STATS */}
      <section className="ln-stats">
        {[["2,430", "metres to the shrine"], ["4", "painted chapters"], ["1", "lantern, hand-folded for you"], ["10", "climbers per group, max"]].map(([n, l], i) => (
          <div className="ln-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="ln-quote">
        <blockquote>“I've hiked in a dozen ranges and never once been handed a <em>ceremony</em> at the end of it. Letting that lantern go was worth more than the summit.”</blockquote>
        <cite>— Priya N., trail guide · third ascent</cite>
      </section>

      {/* DEAL */}
      <section className="ln-deal" id="book">
        <div className="ln-deal-card">
          <span className="ln-kick">The four-day ascent</span>
          <div className="ln-price"><b>$640</b><span>/ climber · guide, temple stays &amp; your lantern</span></div>
          <p>Four days, three nights — terrace trailhead to summit shrine, with a night at the lantern village between. Small groups, painted route notes sent ahead.</p>
          <a href="#" className="ln-btn">Reserve a departure</a>
          <span className="ln-note">Free to reschedule · Guide-led, every step</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="ln-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="ln-climax-veil" aria-hidden />
        <div className="ln-climax-copy"><h2>Your light is <em>one climb</em> from the cloud line.</h2><a href="#book" className="ln-btn">Reserve the climb</a></div>
      </section>

      <footer className="ln-foot"><span className="ln-brand">REDTHREAD</span><span>Guided mountain ascents · Painted before climbed</span></footer>
    </div>
  );
}
