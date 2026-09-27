"use client";
/* BAZAAR — «Lantern Road». Мир: Silk-Road ночной рынок чувственного изобилия — ворота на закате,
   крытая пряная аллея, фонарный майдан, край пустыни под звёздами. Шрифты Cinzel × Work Sans,
   палитра saffron / teal / plum / sand.
   ОДИН ВЕЧЕР: ворота → (зум сквозь арку) пряный ряд → (ткани пролетают мимо камеры) фонарный майдан →
   (камера идёт вбок за караваном) край пустыни. Актёры: торговец с верблюдом ведёт нас через все сцены
   и по маршруту лендинга; гирлянда фонарей висит по верху кадра, фонари зажигаются по одному,
   в лендинге остаётся кромкой и ложится на карточку цены. */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./bazaar.css";

const A = "/uploads/1/animated/bazaar";
const GATE = { x: 76, y: 64 }; // арка ворот (плита зеркалится в bazaar.css — ворота справа)

const scenes: ReelScene[] = [
  {
    id: "gate",
    len: 1.05,
    hold: 0.5,
    bg: `${A}/s1-bg.webp`,
    fg: `${A}/s1-fg.webp`,
    copy: (
      <>
        <span className="bz-eyebrow">Night walks through the old bazaar</span>
        <h1>
          Follow the <em>lanterns</em> in.
        </h1>
        <p>
          One evening route through the gate, the spice aisle and lantern square — tasting, bargaining
          and slow wandering, led by someone who knows every stall-keeper by name.
        </p>
        <div className="bz-cta">
          <a href="#book" className="bz-btn">
            Book a night walk
          </a>
          <a href="#route" className="bz-ghost">
            See the route →
          </a>
        </div>
      </>
    ),
  },
  {
    id: "spice",
    dark: true,
    into: "portal",
    portal: GATE,
    bg: `${A}/s2-bg.webp`,
    fg: `${A}/s2-fg.webp`,
    copy: (
      <>
        <span className="bz-idx">— 02 · the spice aisle</span>
        <h2>The Spice Aisle</h2>
        <p>
          Saffron by the fistful, paprika stacked in burning cones, cardamom cracked open just so you
          can smell it. We stop at every pyramid that matters and skip the ones that don&rsquo;t.
        </p>
      </>
    ),
  },
  {
    id: "square",
    dark: true,
    into: "flythrough",
    len: 1.25,
    hold: 0.55,
    spark: 6,
    bg: `${A}/s3-bg.webp`,
    mid: `${A}/s3-mid.webp`,
    fg: `${A}/s3-fg.webp`,
    freeze: (
      <div className="bz-freeze">
        <b>412</b>
        <span>lanterns, lit by hand at dusk</span>
      </div>
    ),
    copy: (
      <>
        <span className="bz-idx">— 03 · lantern square</span>
        <h2>Lantern Square</h2>
        <p>
          Hundreds of paper lanterns strung low over rugs and tea tables, braziers glowing at the
          edges. This is where the night slows down and the real bargaining begins.
        </p>
      </>
    ),
  },
  {
    id: "edge",
    dark: true,
    into: "pan",
    bg: `${A}/s4-bg.webp`,
    fg: `${A}/s4-fg.webp`,
    copy: (
      <>
        <span className="bz-idx">— 04 · the desert edge</span>
        <h2>The Desert Edge</h2>
        <p>
          The market glows small behind you now. Ahead, only dune-shadow, a tethered camel, and more
          stars than any city ever offered you at once.
        </p>
      </>
    ),
  },
];

/* маршрут вечера: четыре квартала = четыре остановки ковровой дорожки (кварталы + шаги в одном блоке) */
const STOPS: [string, string, string][] = [
  ["19:00", "The Gate", "Mint tea under the tiled arch while we set the pace and the appetite. The city noise stops here."],
  ["19:40", "The Spice Aisle", "Six stalls, six tastes — and how to tell real saffron from the cut stuff."],
  ["20:30", "Lantern Square", "Rugs, brass, silk. We teach you the opening number, then step back."],
  ["21:45", "The Desert Edge", "Tea under open sky while the market glows small behind you. Then the walk back in."],
];

const MARQUEE_ITEMS = [
  "SAFFRON THREADS",
  "ROSE WATER",
  "SOUR-CHERRY LEATHER",
  "HAND-LOOMED RUGS",
  "CARDAMOM PODS",
  "BRASS LANTERNS",
  "POMEGRANATE MOLASSES",
  "SILK SCARVES",
  "SMOKED PAPRIKA",
  "MINT TEA",
];

/* цифры — ценники на шнуре гирлянды (вместо полосы из 4 цифр) */
const TAGS: [string, string][] = [
  ["11", "years walking this market"],
  ["38", "stall-keepers we call by name"],
  ["6", "guests per lantern, max"],
  ["1", "price you actually pay"],
];

const FAQS: [string, string][] = [
  ["What's included?", "A guide for the full route, six tastings through the spice aisle, mint tea at the gate and at the edge, and a printed lantern-lit map of the night."],
  ["Is it good for kids?", "Yes — the pace is slow and the route is flat. We keep tastings mild unless you ask otherwise."],
  ["What should I wear?", "Closed shoes for uneven stone, and a layer for the cool air past the square. The desert edge runs colder than the market."],
  ["Can I book a private caravan?", "Yes, any night of the week. Groups of up to twelve, your own guide, your own pace through the aisle."],
];

/* гирлянда: фонари по кривой провиса (квадратичная Безье, viewBox 1000×120) */
const LANTERNS = Array.from({ length: 9 }, (_, i) => {
  const t = 0.1 + i * 0.1;
  const x = -10 * (1 - t) ** 2 + 1000 * (1 - t) * t + 1010 * t * t;
  const y = 4 * (1 - t) ** 2 + 120 * (1 - t) * t + 4 * t * t;
  return { x: +x.toFixed(1), y: +y.toFixed(1), i };
});

export function Bazaar() {
  return (
    <div className="bz">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap"]} />

      <header className="bz-nav">
        <span className="bz-brand">LANTERN ROAD</span>
        <nav>
          <a href="#route">The Route</a>
          <a href="#guides">Guides</a>
          <a href="#faq">FAQ</a>
          <a href="#book" className="bz-nav-cta">
            Book a night walk
          </a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="wander in ↓" />

      {/* СКВОЗНОЙ СЛОЙ: сумерки → ночь под лендингом, плиты рынка по остановкам маршрута */}
      <Atmosphere
        stops={[
          { at: ".bz-stop:nth-child(1)", color: "#3a2140" },
          { at: ".bz-stop:nth-child(2)", color: "#2c1226" },
          { at: ".bz-stop:nth-child(3)", color: "#23101f" },
          { at: ".bz-stop:nth-child(4)", color: "#101634" },
          { at: ".bz-split", color: "#1c0a17" },
          { at: ".bz-tags", color: "#171026" },
          { at: ".bz-quote", color: "#131430" },
          { at: ".bz-deal", color: "#0e1330" },
        ]}
      />
      <Backdrop
        from=".bz-route"
        dim={0.5}
        plates={[
          { at: ".bz-stop:nth-child(1)", src: `${A}/s1-bg.webp` },
          { at: ".bz-stop:nth-child(2)", src: `${A}/s2-bg.webp` },
          { at: ".bz-stop:nth-child(3)", src: `${A}/s3-bg.webp` },
          { at: ".bz-stop:nth-child(4)", src: `${A}/s4-bg.webp` },
          { at: ".bz-quote", src: `${A}/s3-bg.webp` },
          { at: ".bz-deal", src: `${A}/s4-bg.webp` },
        ]}
      />
      <Weather kind="embers" count={16} color="#ffb02a" color2="#ff7a3a" between={[reelMark("t0"), reelMark("t2")]} world={0.6} zIndex={31} />
      <Weather kind="stars" count={46} color="#f2e6c8" between={[reelMark("t2"), ".bz-foot"]} world={0.15} zIndex={6} seed={11} />

      {/* ГИРЛЯНДА — кромка кадра через весь сайт; фонари зажигаются по одному (scroll-timeline в css) */}
      <Actor
        className="bz-garland-actor"
        width="100vw"
        zIndex={34}
        bob={3}
        tilt={0.02}
        stops={[
          { at: reelMark("s0"), pose: { x: 50, y: 11, s: 1, o: 1 } },
          { at: reelMark("t2"), pose: { x: 50, y: 11, s: 1, o: 1 } },
          { at: reelMark("s3"), pose: { x: 50, y: 10.5, s: 1, o: 0.92 } },
          { at: ".bz-route", pose: { x: 50, y: 9.5, s: 1.02, o: 0.85 } },
          { at: ".bz-faq", pose: { x: 50, y: 9.5, s: 1.02, o: 0.75 } },
          { at: ".bz-deal-card", anchor: 0.3, pose: { x: 50, y: 4, s: 0.64, o: 1, dock: true } },
          { at: ".bz-climax", pose: { x: 50, y: 6, s: 0.9, o: 0 } },
        ]}
      >
        <svg className="bz-garland" viewBox="0 0 1000 80" aria-hidden>
          <path d="M-10,4 Q500,60 1010,4" />
          {LANTERNS.map(({ x, y, i }) => (
            <g key={i} className={`bz-lan bz-lan-${i + 1}`} transform={`translate(${x} ${y})`}>
              <line x1="0" y1="0" x2="0" y2="8" />
              <circle className="bz-lan-glow" cx="0" cy="22" r="17" />
              <path className="bz-lan-body" d="M-6,8 h12 l3,6 v14 l-3,6 h-12 l-3,-6 v-14 z" />
              <rect className="bz-lan-cap" x="-4" y="34" width="8" height="3" rx="1" />
            </g>
          ))}
        </svg>
      </Actor>

      {/* ТОРГОВЕЦ С ВЕРБЛЮДОМ — входит в ворота, идёт пряным рядом, через майдан, в пустыню и по маршруту */}
      <Actor
        src={`${A}/actor-merchant.webp`}
        width="24vw"
        zIndex={32}
        bob={2}
        tilt={0.04}
        stops={[
          { at: reelMark("s0"), pose: { x: 50, y: 80, s: 1, o: 1 } },
          { at: reelMark("t0"), pose: { x: GATE.x - 4, y: GATE.y + 3, s: 0.32, o: 0 } },
          { at: reelMark("s1"), pose: { x: 64, y: 84, s: 0.8, o: 1 } },
          { at: reelMark("t1"), pose: { x: 82, y: 104, s: 1.7, o: 0, blur: 6 } },
          { at: reelMark("s2"), pose: { x: 28, y: 82, s: 0.78, o: 1 } },
          { at: reelMark("t2"), pose: { x: 50, y: 81, s: 0.72, o: 1 } },
          { at: reelMark("s3"), pose: { x: 66, y: 79, s: 0.6, o: 1 } },
          { at: reelMark("end"), pose: { x: 76, y: 74, s: 0.42, o: 1 } },
          { at: ".bz-route", pose: { x: 86, y: 60, s: 0.3, o: 0 } },
          { at: ".bz-stop:nth-child(1)", anchor: 0.35, pose: { x: 114, y: 22, s: 0.42, o: 1, fx: -1, dock: true } },
          { at: ".bz-stop:nth-child(2)", anchor: 0.35, pose: { x: -14, y: 22, s: 0.42, o: 1, dock: true } },
          { at: ".bz-stop:nth-child(3)", anchor: 0.35, pose: { x: 114, y: 22, s: 0.42, o: 1, fx: -1, dock: true } },
          { at: ".bz-stop:nth-child(4)", anchor: 0.35, pose: { x: -14, y: 22, s: 0.42, o: 1, dock: true } },
          { at: ".bz-split", pose: { x: 30, y: 110, s: 0.4, o: 0 } },
          { at: ".bz-climax", anchor: 0.4, pose: { x: 58, y: 64, s: 0.24, o: 0.95, dock: true } },
          { at: ".bz-foot", pose: { x: 70, y: 40, s: 0.18, o: 0 } },
        ]}
      />

      {/* ROUTE — ковровая дорожка через четыре квартала (вместо карточек, шагов и галереи) */}
      <section className="bz-route" id="route">
        <div className="bz-route-head">
          <span className="bz-kick">One evening, four quarters</span>
          <h2>The whole market, in order.</h2>
        </div>
        <ol className="bz-runner">
          {STOPS.map(([time, t, s]) => (
            <li className="bz-stop" key={t}>
              <span className="bz-stop-time">{time}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SPLIT — гиды */}
      <section className="bz-split" id="guides">
        <div className="bz-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="bz-split-copy">
          <span className="bz-kick">Why it stays with you</span>
          <h2>We&rsquo;ve walked this market for eleven years.</h2>
          <p>
            Every route is built on a relationship, not a map — the saffron vendor who saves us the
            first harvest, the rug-seller who remembers your name by the second visit. You are never
            walking a tourist loop; you are walking with people who live here.
          </p>
          <a href="#book" className="bz-link">
            Meet the guides →
          </a>
        </div>
      </section>

      {/* KILIM — бегущая лента товаров, вытканная в орнамент-разделитель */}
      <section className="bz-kilim" aria-label="What you'll find in the aisle">
        <div className="bz-kilim-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span className="bz-kilim-item" key={i}>
              {item}
              <span className="bz-kilim-dot" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* TAGS — цифры как ценники на шнуре */}
      <section className="bz-tags" aria-label="Lantern Road in numbers">
        <svg className="bz-tags-cord" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden>
          <path d="M0,10 Q500,110 1000,10" />
        </svg>
        <div className="bz-tags-row">
          {TAGS.map(([n, l]) => (
            <div className="bz-tag" key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="bz-quote">
        <blockquote>
          “I&rsquo;ve bargained in a dozen markets and always lost. Here I walked out with a rug I love and
          a price I understood — <em>because someone finally explained the game</em>.”
        </blockquote>
        <cite>— Renata K., guest · Lantern Square walk</cite>
      </section>

      {/* FAQ */}
      <section className="bz-faq" id="faq">
        <div className="bz-faq-head">
          <span className="bz-kick">Before you book</span>
          <h2>What people ask us.</h2>
        </div>
        <div className="bz-faq-list">
          {FAQS.map(([q, a], i) => (
            <details className="bz-faq-item" key={i} {...(i === 0 ? { open: true } : {})}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DEAL — гирлянда ложится на карточку */}
      <section className="bz-deal" id="book">
        <div className="bz-deal-card">
          <span className="bz-kick">The night walk</span>
          <div className="bz-price">
            <b>$95</b>
            <span>/ guest · guide, tea &amp; six tastings</span>
          </div>
          <p>
            One evening, four quarters of the market, a route we&rsquo;ve been refining for eleven years.
            Reserve a lantern and we&rsquo;ll send the printed map by morning.
          </p>
          <a href="#" className="bz-btn">
            Reserve a lantern
          </a>
          <span className="bz-note">Runs six nights a week · Private caravans on request</span>
        </div>
      </section>

      {/* CLIMAX — караван уходит в звёзды */}
      <section className="bz-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="bz-climax-veil" aria-hidden />
        <div className="bz-climax-copy">
          <h2>
            The market is <em>lit</em> and waiting.
          </h2>
          <a href="#book" className="bz-btn">
            Book a night walk
          </a>
        </div>
      </section>

      <footer className="bz-foot">
        <span className="bz-brand">LANTERN ROAD</span>
        <span>Night walks through the old bazaar · Six evenings a week</span>
      </footer>
    </div>
  );
}
