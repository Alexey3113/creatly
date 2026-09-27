"use client";
/* TERRAZZO — «MELTEMI», private island villas in the Cyclades. Мир: слепящий средиземноморский свет —
   деревня на обрыве над синим морем → синие купола часовен → длинная белая лестница к бирюзовой бухте →
   закатная гавань с рыбацкими лодками. Собран на общем движке <Reel/> v2; свой шрифт-пейринг
   Lora × Instrument Sans, палитра whitewash/aegean/bougainvillea/sun-stone + pink CTA.

   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): тезис — «здесь ты только спускаешься». Актёр — белая лестница
   (DOM/SVG, профиль беленых ступеней с синей кромкой): стоит у кромки кадра в деревне, на спуске
   ступени проходят перед объективом горизонтальными шторками, в сцене лестницы сливается с настоящей,
   у гавани — ступени причала; в лендинге ведёт ряды «How the day descends» и садится у брони.
   Склейки: синяя дверь — портал (portal) → спуск (descend, шов — беленая кромка) → закатный свет (sweep).
   Лендинг: секции смещаются лесенкой, вода темнеет к низу, открытки — закреплённая стопка, отзыв — на обороте. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./terrazzo.css";

const A = "/uploads/1/animated/terrazzo";

const scenes: ReelScene[] = [
  { id: "village", bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="tz-eyebrow">Meltemi — private island weeks</span>
      <h1>Whitewash above.<br /><em>Turquoise below.</em></h1>
      <p>Four days on one island: a cliffside village, a hundred blue domes, a long white stair to the cove, and a harbor that turns gold at dusk.</p>
      <div className="tz-cta"><a href="#book" className="tz-btn">Plan your island week</a><a href="#villas" className="tz-ghost">See the villas →</a></div>
    </>
  ) },
  { id: "domes", into: "portal", portal: { x: 84, y: 62 }, bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="tz-idx">— 02 · through the blue door</span><h2>A Hundred Blue Domes</h2>
      <p>Bells at seven, a cat asleep on warm stone, geraniums in tin cans on every ledge. The whole village smells of salt and bougainvillea.</p></>
  ) },
  { id: "steps", into: "descend", tint: "#f7f3ea", len: 1.25, hold: 0.56, bg: `${A}/s3-bg.webp`, bgPos: "24% 58%",
    freeze: (<div className="tz-freeze"><b>117</b><span>of 200 steps · the cove below</span></div>), copy: (
    <><span className="tz-idx">— 03 · the descent</span><h2>The Long White Stair</h2>
      <p>Two hundred steps cut into the cliff, whitewashed twice a year, worn soft in the middle. At the bottom, water so clear the boats look like they float on glass.</p></>
  ) },
  { id: "harbor", into: "sweep", tint: "#ffb58c", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, spark: 5, copy: (
    <><span className="tz-idx">— 04 · the harbor</span><h2>Where the Day Ends</h2>
      <p>Painted caïques rock at their moorings, tavernas light their lamps, and the whole cove turns the colour of a ripe apricot.</p></>
  ) },
];

/* профиль беленой лестницы: ступени вниз слева направо, синяя кромка, бугенвиллея наверху */
function StairArt() {
  const n = 9;
  const sw = 40, sh = 30;
  let d = "M0 0";
  for (let i = 0; i < n; i++) d += ` H${(i + 1) * sw} V${(i + 1) * sh}`;
  d += ` H${n * sw} V${n * sh + 120} H0 Z`;
  return (
    <svg className="tz-stair-art" viewBox={`0 -24 ${n * sw} ${n * sh + 144}`} aria-hidden focusable="false">
      <defs>
        <linearGradient id="tzWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf8f1" />
          <stop offset="1" stopColor="#e6e4dc" />
        </linearGradient>
        <linearGradient id="tzShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fbad3" stopOpacity=".55" />
          <stop offset="1" stopColor="#9fbad3" stopOpacity="0" />
        </linearGradient>
        <filter id="tzRough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
      </defs>
      <g filter="url(#tzRough)">
        <path d={d} fill="url(#tzWall)" />
        {/* тень стены на ступенях */}
        <path d={`M0 ${sh * 0.6} L${n * sw} ${n * sh + sh * 0.6} V${n * sh + 120} H0 Z`} fill="url(#tzShade)" />
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            {/* подступенок в холодной тени + синяя кромка проступи */}
            <rect x={(i + 1) * sw - 3} y={i * sh + 2} width="3" height={sh - 2} fill="#c6d6e4" />
            <rect x={i * sw} y={i * sh} width={sw + 1} height="3.2" fill="#2f7ac0" opacity=".85" />
          </g>
        ))}
      </g>
      {/* бугенвиллея у верхней ступени */}
      <g opacity=".95">
        {[[12, -6, 12], [30, -14, 10], [22, 4, 9], [46, -4, 8], [4, 8, 8], [38, 8, 7]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "#e06a8a" : "#f08aa6"} />
        ))}
      </g>
    </svg>
  );
}

export function Terrazzo() {
  return (
    <div className="tz">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap"]} />

      <header className="tz-nav">
        <span className="tz-brand">MELTEMI</span>
        <nav>
          <a href="#descent">The Descent</a>
          <a href="#villas">Villas</a>
          <a href="#postcards">Postcards</a>
          <a href="#book" className="tz-nav-cta">Plan your week</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* СКВОЗНОЙ СЛОЙ: вода темнеет к низу страницы — от беленой деревни к ночной гавани */}
      <Atmosphere stops={[
        { at: ".tz-manifest", color: "#eef0ec" }, { at: ".tz-steps", color: "#e3ecef" }, { at: ".tz-cards", color: "#c9dce8" },
        { at: ".tz-stack", color: "#2f6f9c" }, { at: ".tz-big", color: "#1c4d71" }, { at: ".tz-deal", color: "#123a57" },
        { at: ".tz-climax", color: "#0b2238" },
      ]} />
      <Backdrop from=".tz-manifest" dim={0.58} plates={[
        { at: ".tz-manifest", src: `${A}/s1-bg.webp` }, { at: ".tz-steps", src: `${A}/s3-bg.webp`, pos: "30% 50%" },
        { at: ".tz-cards", src: `${A}/s2-bg.webp` }, { at: ".tz-stack", src: `${A}/s3-bg.webp` },
        { at: ".tz-big", src: `${A}/s4-bg.webp` }, { at: ".tz-deal", src: `${A}/s4-bg.webp`, pos: "50% 70%" },
      ]} />

      {/* БЕЛАЯ ЛЕСТНИЦА — актёр спуска через все сцены и лендинг */}
      <Actor className="tz-stair-actor" width="30vw" zIndex={30} bob={0} tilt={0.02} stops={[
        { at: reelMark("s0"), pose: { x: 49, y: 96, s: 1 } },
        { at: reelMark("t0"), pose: { x: 40, y: 118, s: 1.1, o: 0 } },
        { at: reelMark("s1"), pose: { x: 36, y: 97, s: 0.95, o: 1 } },
        { at: reelMark("t1"), pose: { x: 60, y: 26, s: 2.5, o: 0.95, blur: 1.5 } },
        { at: reelMark("s2"), pose: { x: 14, y: 104, s: 1.25, o: 0.9 } },
        { at: reelMark("t2"), pose: { x: 10, y: 118, s: 1.1, o: 0.3 } },
        { at: reelMark("s3"), pose: { x: 12, y: 103, s: 0.9, o: 1 } },
        { at: reelMark("end"), pose: { x: 14, y: 100, s: 0.85 } },
        { at: ".tz-manifest", pose: { x: 10, y: 118, s: 0.7, o: 0 } },
        { at: ".tz-steps-head", pose: { x: 6, y: 100, s: 0.66, o: 0.6 } },
        { at: ".tz-stair-row:nth-child(1)", pose: { x: -12, y: 70, s: 0.62, o: 1, dock: true } },
        { at: ".tz-stair-row:nth-child(4)", pose: { x: -12, y: 70, s: 0.62, o: 1, dock: true } },
        { at: ".tz-cards", pose: { x: 6, y: 60, s: 0.5, o: 0 } },
        { at: ".tz-deal-card", pose: { x: 104, y: 80, s: 0.5, o: 1, dock: true } },
        { at: ".tz-climax", pose: { x: 90, y: 112, s: 0.5, o: 0 } },
      ]}><StairArt /></Actor>

      <Weather kind="petals" count={16} color="#e06a8a" color2="#ffa3bd" between={[".tz-nav", ".tz-big"]} world={0.5} zIndex={31} />

      {/* MANIFESTO — одна мысль на плите деревни + острова вместо бегущей строки */}
      <section className="tz-manifest">
        <p>The rest of the year is uphill. <em>Here, for one week, you only go down</em> — to the cove, to the table, to still.</p>
        <span className="tz-isles">Santorini · Milos · Naxos · Sifnos · Folegandros · Amorgos · Anafi</span>
      </section>

      {/* STEPS — ряды ведёт белая лестница (актёр) */}
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

      {/* CARDS — лесенкой */}
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

      {/* POSTCARDS — закреплённая стопка: открытки ложатся одна на другую; последняя — оборотом с отзывом */}
      <section className="tz-stack" id="postcards">
        <div className="tz-stack-head">
          <span className="tz-kick">Four views, one week</span>
          <h2>Postcards from the island</h2>
        </div>
        <div className="tz-stack-pile">
          {[
            [`${A}/s1-bg.webp`, "The Village", "01"],
            [`${A}/s2-bg.webp`, "The Domes", "02"],
            [`${A}/s3-bg.webp`, "The Stair", "03"],
            [`${A}/s4-bg.webp`, "The Harbor", "04"],
          ].map(([img, cap, n]) => (
            <figure className="tz-post" key={n}>
              <div className="tz-post-img" style={{ backgroundImage: `url(${img})` }}><span className="tz-post-stamp">M</span></div>
              <figcaption className="tz-post-cap"><b>{cap}</b><span>{n}</span></figcaption>
            </figure>
          ))}
          <figure className="tz-post tz-post-back">
            <div className="tz-back">
              <blockquote>We came for a week and did nothing but walk down to the water and back up for dinner. I have never been so unbothered in my life.</blockquote>
              <div className="tz-back-side">
                <span className="tz-back-stamp">Ελλάς<br />12</span>
                <span className="tz-back-line">Elena K.</span>
                <span className="tz-back-line">Villa Aphrodite</span>
                <span className="tz-back-line">Folegandros</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* BIG-TYPE — на закатной плите, вода уже темнеет */}
      <section className="tz-big">
        <p>The sea does not rush. <em>Neither do we.</em></p>
      </section>

      {/* DEAL */}
      <section className="tz-deal" id="book">
        <div className="tz-deal-card">
          <span className="tz-kick">The island week</span>
          <div className="tz-price"><b>€1,480</b><span>/ villa · week, up to 4 guests</span></div>
          <p>Seven nights in a cliffside villa, one private caïque day and a standing table at the harbor. Flights and ferry not included — everything else is.</p>
          <a href="#" className="tz-btn">Reserve your week</a>
          <span className="tz-note">38 cliff villas on 6 islands · 11 years on this coast · Deposit fully refundable</span>
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
