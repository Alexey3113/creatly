"use client";
/* TERRAZZO — «MELTEMI», private island villas in the Cyclades. Мир: слепящий средиземноморский свет —
   деревня на обрыве над синим морем → синие купола часовен → длинная белая лестница к бирюзовой бухте →
   закатная гавань с рыбацкими лодками. Собран на общем движке <Reel/>; свой шрифт-пейринг
   Instrument Serif × Instrument Sans, палитра whitewash/aegean/bougainvillea/sun-stone + pink CTA.
   Сигнатурный блок — галерея-«открытки» из 4 сцен мира. */
import { Reel, type ReelScene } from "../reel";
import "./terrazzo.css";

const A = "/uploads/1/animated/terrazzo";

const scenes: ReelScene[] = [
  { id: "village", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="tz-eyebrow">Meltemi — private island weeks</span>
      <h1>Whitewash above.<br /><em>Turquoise below.</em></h1>
      <p>Four days on one island: a cliffside village, a hundred blue domes, a long white stair to the cove, and a harbor that turns gold at dusk.</p>
      <div className="tz-cta"><a href="#book" className="tz-btn">Plan your island week</a><a href="#villas" className="tz-ghost">See the villas →</a></div>
    </>
  ) },
  { id: "domes", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="tz-idx">— 02 · the chapels</span><h2>A Hundred Blue Domes</h2>
      <p>Bells at seven, a cat asleep on warm stone, geraniums in tin cans on every ledge. The whole village smells of salt and bougainvillea.</p></>
  ) },
  { id: "steps", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="tz-idx">— 03 · the descent</span><h2>The Long White Stair</h2>
      <p>Two hundred steps cut into the cliff, whitewashed twice a year, worn soft in the middle. At the bottom, water so clear the boats look like they float on glass.</p></>
  ) },
  { id: "harbor", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <><span className="tz-idx">— 04 · the harbor</span><h2>Where the Day Ends</h2>
      <p>Painted caïques rock at their moorings, tavernas light their lamps, and the whole cove turns the colour of a ripe apricot. This is the hour every villa week is built around.</p></>
  ) },
];

export function Terrazzo() {
  return (
    <div className="tz">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap" />

      <header className="tz-nav">
        <span className="tz-brand">MELTEMI</span>
        <nav>
          <a href="#islands">The Islands</a>
          <a href="#descent">The Descent</a>
          <a href="#villas">Villas</a>
          <a href="#book" className="tz-nav-cta">Plan your week</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* MARQUEE — running band of island names (immersion, sets the scale of the world) */}
      <section className="tz-marquee" id="islands" aria-hidden>
        <div className="tz-marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              <span>SANTORINI</span><span>MILOS</span><span>NAXOS</span><span>SIFNOS</span>
              <span>FOLEGANDROS</span><span>AMORGOS</span><span>ANAFI</span>
            </span>
          ))}
        </div>
      </section>

      {/* MANIFESTO — one thought (problem/context) */}
      <section className="tz-manifest">
        <p>The rest of the year is uphill. <em>Here, for one week, you only go down</em> — to the cove, to the table, to still.</p>
      </section>

      {/* STEPS — descending staircase process, tied to the motif (unique block, absent in Tidewell) */}
      <section className="tz-steps" id="descent">
        <div className="tz-steps-head"><span className="tz-kick">How the day descends</span><h2>Four steps, one stair.</h2></div>
        <ol className="tz-stair">
          {[
            ["01", "Village mornings", "Wake above the sea, coffee on a warm terrace, market bread still hot from the oven below."],
            ["02", "Chapel wandering", "No schedule before noon — just blue domes, whitewashed backstreets and a bell somewhere off to the left."],
            ["03", "The white stair", "Two hundred steps down to the cove. Togs, a boat, an afternoon that asks nothing of you."],
            ["04", "Harbor by dusk", "Climb back for dinner as the tavernas light their lamps and the whole sky turns apricot."],
          ].map(([n, t, s], i) => (
            <li className="tz-stair-row" key={i}><span className="tz-stair-n">{n}</span><div><h3>{t}</h3><p>{s}</p></div></li>
          ))}
        </ol>
      </section>

      {/* CARDS — the possibilities */}
      <section className="tz-cards" id="villas">
        <div className="tz-cards-head"><span className="tz-kick">What comes with the week</span><h2>Four ways to slow down.</h2></div>
        <div className="tz-card-grid">
          {[
            ["Cliff Villas", "Whitewashed houses cut into the rock, an infinity edge over the Aegean and shutters that keep the noon sun out."],
            ["Private Caïque", "A painted wooden boat and a skipper, yours for the week. No itinerary — you point, we go."],
            ["Chapel Terrace", "Our courtyard chapel hosts nothing louder than a sunset toast. Bells on request, silence otherwise."],
            ["The Harbor Table", "A standing table at the quay each night, set with whatever the boats brought in that morning."],
          ].map(([t, s], i) => (
            <div className="tz-card" key={i}><b>{t}</b><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* GALLERY — SIGNATURE: island views as postcards */}
      <section className="tz-gallery">
        <div className="tz-gallery-head">
          <span className="tz-kick">Four views, one week</span>
          <h2>Postcards from the island</h2>
          <span className="tz-script">Wish you were here.</span>
        </div>
        <div className="tz-post-grid">
          {[
            [`${A}/s1-bg.webp`, "The Village", "01"],
            [`${A}/s2-bg.webp`, "The Domes", "02"],
            [`${A}/s3-bg.webp`, "The Stair", "03"],
            [`${A}/s4-bg.webp`, "The Harbor", "04"],
          ].map(([img, cap, n], i) => (
            <figure className="tz-post" key={i}>
              <div className="tz-post-img" style={{ backgroundImage: `url(${img})` }}>
                <span className="tz-post-stamp">M</span>
              </div>
              <figcaption className="tz-post-cap"><b>{cap}</b><span>{n}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* BIG-TYPE — giant statement */}
      <section className="tz-big">
        <p>The sea does not rush. <em>Neither do we.</em></p>
      </section>

      {/* STATS */}
      <section className="tz-stats">
        {[["6", "islands curated"], ["38", "cliffside villas"], ["1", "caïque, yours alone"], ["11", "years sailing this coast"]].map(([n, l], i) => (
          <div className="tz-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="tz-quote">
        <blockquote>“We came for a week and did nothing but walk down to the water and back up for dinner. I have never been so unbothered in my life.”</blockquote>
        <cite>— Elena K., Villa Aphrodite · Folegandros</cite>
      </section>

      {/* DEAL */}
      <section className="tz-deal" id="book">
        <div className="tz-deal-card">
          <span className="tz-kick">The island week</span>
          <div className="tz-price"><b>€1,480</b><span>/ villa · week, up to 4 guests</span></div>
          <p>Seven nights in a cliffside villa, one private caïque day and a standing table at the harbor. Flights and ferry not included — everything else is.</p>
          <a href="#" className="tz-btn">Reserve your week</a>
          <span className="tz-note">Deposit fully refundable · Villas released each spring</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="tz-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="tz-climax-veil" aria-hidden />
        <div className="tz-climax-copy"><h2>Your stair to the sea is <em>waiting.</em></h2><a href="#book" className="tz-btn">Plan your island week</a></div>
      </section>

      <footer className="tz-foot"><span className="tz-brand">MELTEMI</span><span>Private island weeks, Cyclades · Whitewash above, turquoise below.</span></footer>
    </div>
  );
}
