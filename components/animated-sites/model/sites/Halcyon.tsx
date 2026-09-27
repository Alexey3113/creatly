"use client";
/* HALCYON — «PETALFARE», a contemporary spring river-festival. Not Japan/cherry-shrine: a modern city
   blossom-park avenue with food carts → a city river of petal boats and streamers → a sunny festival lawn
   → a sunset promenade strung with lights. Собран на общем движке <Reel/>; шрифт-пейринг Anton × Schibsted
   Grotesk, палитра blush/chartreuse/cyan/rose + pink CTA.
   СКВОЗНАЯ АРХИТЕКТУРА (аудит 2026-09): ОДНА бумажная лента-стример летит через весь фестиваль —
   над аллеей, по реке, над лужайкой, над набережной — и в лендинге ложится таймлайном программы и
   бантом на билет. Склейки из мира: порыв сквозь цветущие ветки, лента-шторка, смена света на золотой час.
   День реально идёт: утро → полдень → после обеда → закат; фон лендинга cyan → розово-золотой → закат. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, clamp01 } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./halcyon.css";

const A = "/uploads/1/animated/halcyon";

/* mid-вырезки мира (плашки-прямоугольники и «острова») сняты — жизнь среднего плана несут лента и лепестки */
const scenes: ReelScene[] = [
  { id: "avenue", len: 1.1, hold: 0.5, bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, spark: 5, copy: (
    <>
      <span className="hc-eyebrow">Petalfare · May 15–17, downtown</span>
      <h1>Follow the<br /><em>petals down.</em></h1>
      <p>Three blossom-lined days on the river — food carts, paper streamers and the whole city out on a blanket.</p>
      <div className="hc-cta"><a href="#tickets" className="hc-btn">Get tickets</a><a href="#program" className="hc-ghost">See the program →</a></div>
    </>
  ) },
  { id: "river", into: "flythrough", bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, spark: 6, len: 1.2, hold: 0.55,
    freeze: (<div className="hc-freeze"><b>15:02</b><span>photo finish · heat one</span></div>), copy: (
    <><span className="hc-idx">— 02 · the float</span><h2>Petal Boats</h2>
      <p>Fold a streamer, set it loose under the footbridge, and race a hundred paper boats down to the lawn.</p></>
  ) },
  { id: "lawn", into: "sweep", tint: "#ff9ac0", bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`, spark: 4, copy: (
    <><span className="hc-idx">— 03 · the lawn</span><h2>Blanket &amp; Bites</h2>
      <p>Picnic blankets, lantern strings, a dozen stalls slinging skewers and shaved ice — claim your patch before noon.</p></>
  ) },
  { id: "riverside", into: "lightshift", tint: "#ffc27a", bg: `${A}/s4-bg.webp`, fg: `${A}/s4-fg.webp`, spark: 7, copy: (
    <><span className="hc-idx">— 04 · the strand</span><h2>Golden Hour Strand</h2>
      <p>String lights click on, the crowd spills onto the promenade, and the whole river turns pink for the closing set.</p></>
  ) },
];

const ZONES: [string, string, string][] = [
  ["01", "The Avenue", "Blossom trees, bunting and a dozen food carts strung end to end."],
  ["02", "The Float", "Paper boats and streamers drift the river under the footbridge."],
  ["03", "The Lawn", "Picnic blankets, market stalls and a stage under strung lanterns."],
  ["04", "The Strand", "Golden-hour promenade, string lights, and the closing set at dusk."],
];

const PROGRAM: [string, string, [string, string, string][]][] = [
  ["Day One", "Fri, May 15", [
    ["10:00", "Avenue opens", "Food carts and bunting go up along the blossom walk"],
    ["15:00", "Petal Boat Race — heat one", "First streamers hit the water at the footbridge"],
    ["19:30", "Sunset DJ set", "The Strand"],
  ]],
  ["Day Two", "Sat, May 16", [
    ["09:00", "Market opens", "40 makers set up across the Lawn"],
    ["13:00", "Lantern-folding workshop", "Kids' tent, all ages welcome"],
    ["20:00", "Headline set — Rosa Vane", "The Strand"],
  ]],
  ["Day Three", "Sun, May 17", [
    ["11:00", "Community picnic", "Bring a blanket, claim your patch of grass"],
    ["16:00", "Petal Boat Race — final", "Winner takes the petal crown"],
    ["21:00", "Lantern release finale", "The Strand, closing the weekend"],
  ]],
];

const PLANS: [string, string, string, string, string[], boolean][] = [
  ["Day Pass", "One day, every zone", "$28", "/ single day", ["Avenue, River &amp; Lawn access", "Petal Boat Race entry", "Market discount card"], false],
  ["Weekend Pass", "All three days, no lines", "$58", "/ full weekend", ["Full 3-day zone access", "Reserved lawn blanket spot", "Lantern-folding workshop seat", "Priority boat race entry"], true],
  ["Lawn &amp; Market VIP", "The lawn, sorted for you", "$95", "/ full weekend", ["Everything in Weekend Pass", "Shaded front-lawn blanket zone", "Market welcome bag, 12 vendors", "Closing-set VIP viewing rail"], false],
];

const BANNER = ["Petals down", "Paper boat race", "Free lawn entry", "40+ makers market", "Lantern walk", "May 15–17"];

/* ЛЕНТА-СТРИМЕР — бумажная лента с бегущей волной (волна едет по ленте, скролл несёт саму ленту) */
function Streamer() {
  const wave = "M-240,60 C-180,8 -120,112 -60,60 S60,8 120,60 S240,112 300,60 S420,8 480,60 S600,112 660,60 S780,8 840,60";
  return (
    <svg className="hc-streamer" viewBox="0 0 600 120" aria-hidden>
      <defs>
        <linearGradient id="hc-rib" x1="0" x2="1" y1="0" y2="0">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((o, i) => (
            <stop key={o} offset={o} stopColor={i % 2 ? "#ffc2d8" : "#ff5a9a"} />
          ))}
        </linearGradient>
        <linearGradient id="hc-rib-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".16" stopColor="#fff" stopOpacity="1" />
          <stop offset=".84" stopColor="#fff" stopOpacity="1" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="hc-rib-mask"><rect x="0" y="0" width="600" height="120" fill="url(#hc-rib-fade)" /></mask>
      </defs>
      <g mask="url(#hc-rib-mask)">
        <g className="hc-rib-wave">
          <path d={wave} fill="none" stroke="url(#hc-rib)" strokeWidth="15" strokeLinecap="round" />
          <path d={wave} fill="none" stroke="#a8d84a" strokeWidth="2.5" transform="translate(0 9)" opacity=".9" />
        </g>
      </g>
    </svg>
  );
}

/* тон навигации: чернила на светлом фестивале, светлый текст на тёмной программе и финале */
function NavTone() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".hc");
    const reel = root?.querySelector<HTMLElement>(".rl-reel");
    if (!root || !reel) return;
    let last = "";
    return subscribe(() => {
      let tone = "light";
      const r = reel.getBoundingClientRect();
      if (!(r.top <= 40 && r.bottom > 40)) {
        root.querySelectorAll<HTMLElement>("[data-tone]").forEach((s) => {
          const b = s.getBoundingClientRect();
          if (b.top <= 40 && b.bottom > 40) tone = s.dataset.tone || "light";
        });
      }
      if (tone !== last) { root.dataset.nav = tone; last = tone; }
    });
  }, []);
  return <span ref={ref} hidden />;
}

/* ПРОГРАММА ЗАКРЕПЛЕНА: лента-таймлайн заполняется скроллом, день за днём */
function Program() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const days = Array.from(el.querySelectorAll<HTMLElement>(".hc-program-day"));
    return subscribe(({ vh, reduced }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = reduced ? 1 : clamp01(-r.top / Math.max(1, r.height - vh));
      el.style.setProperty("--pp", p.toFixed(4));
      const k = Math.min(2, Math.floor(p * 3 + 0.08));
      days.forEach((d, i) => { const on = reduced || i <= k; if ((d.dataset.on === "1") !== on) d.dataset.on = on ? "1" : ""; });
    });
  }, []);
  return (
    <section ref={ref} className="hc-program" id="program" data-tone="dark">
      <div className="hc-program-pin">
        <div className="hc-program-head">
          <div><span className="hc-kick hc-kick-light">The program</span><h2>Three days, timed to the minute.</h2></div>
          <p className="hc-program-note">Every set, workshop and boat-race heat, zone by zone. Free entry to the Avenue, River and Lawn all weekend.</p>
        </div>
        <div className="hc-program-rail" aria-hidden><i className="hc-program-fill" /></div>
        <div className="hc-program-grid">
          {PROGRAM.map(([day, date, rows]) => (
            <div className="hc-program-day" key={day}>
              <span className="hc-program-day-n">{date}</span>
              <h3>{day}</h3>
              {rows.map(([time, title, note]) => (
                <div className="hc-program-row" key={time}>
                  <span className="hc-program-time">{time}</span>
                  <div><h4>{title}</h4><span>{note}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* МАРШРУТ — четыре зоны как бирки на одной ленте (вместо ряда карточек и галереи из 4 плит) */
function Route() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribe(({ vh, reduced }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = reduced ? 1 : clamp01((vh * 0.85 - r.top) / (r.height * 0.75));
      el.style.setProperty("--rp", p.toFixed(4));
    });
  }, []);
  return (
    <section ref={ref} className="hc-route" id="zones" data-tone="light">
      <div className="hc-route-head"><span className="hc-kick">Four zones, one streamer</span><h2>Where the festival happens</h2></div>
      <div className="hc-route-map">
        <svg className="hc-route-line" viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden>
          <path d="M0,120 C120,30 200,210 330,130 S560,20 660,120 S860,230 1000,110" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="hc-tags">
          {ZONES.map(([n, t, s], i) => (
            <li className="hc-tag" key={n} style={{ ["--i" as string]: i }}>
              <span className="hc-tag-n">{n}</span><h3>{t}</h3><p>{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Halcyon() {
  return (
    <div className="hc" data-nav="light">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Anton&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"]} />
      <NavTone />
      <header className="hc-nav">
        <span className="hc-brand">PETALFARE</span>
        <nav>
          <a href="#program">Program</a>
          <a href="#zones">Zones</a>
          <a href="#market">Market</a>
          <a href="#tickets" className="hc-nav-cta">Get tickets</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="drift ↓" />

      {/* СКВОЗНОЙ СЛОЙ: лента-стример, лепестки, свет дня под лендингом */}
      <Atmosphere stops={[
        { at: ".hc-manifest", color: "#e3f5fa" }, { at: ".hc-route", color: "#eef7ea" }, { at: ".hc-route", color: "#f3e9ee", anchor: 0.92 },
        { at: ".hc-program", color: "#3a1530", anchor: 0.2 }, { at: ".hc-program", color: "#3a1530", anchor: 0.9 },
        { at: ".hc-split", color: "#ffe6ec" }, { at: ".hc-note", color: "#ffd9c4" }, { at: ".hc-pricing", color: "#f8bea4" }, { at: ".hc-climax", color: "#5a2a4a" },
      ]} />
      <Backdrop from=".hc-manifest" dim={0.8} plates={[
        { at: ".hc-manifest", src: `${A}/s1-bg.webp` }, { at: ".hc-route", src: `${A}/s2-bg.webp` }, { at: ".hc-split", src: `${A}/s3-bg.webp` },
        { at: ".hc-note", src: `${A}/s3-bg.webp` }, { at: ".hc-pricing", src: `${A}/s4-bg.webp` },
      ]} />
      <Weather kind="petals" count={24} color="#f0b8c8" color2="#ffe3ec" between={[".hc .rl-reel", ".hc-pricing"]} world={0.55} zIndex={31} />
      <Actor className="hc-streamer-actor" width="44vw" zIndex={32} bob={9} tilt={0.12} stops={[
        { at: reelMark("s0"), pose: { x: 72, y: 20, s: 0.95, r: -9, o: 1 } },
        { at: reelMark("t0"), pose: { x: 58, y: 44, s: 1.9, r: -3, o: 1, blur: 3 } },
        { at: reelMark("s1"), pose: { x: 64, y: 57, s: 1, r: 5, o: 1 } },
        { at: reelMark("t1"), pose: { x: 50, y: 48, s: 2.4, r: 84, o: 1 } },
        { at: reelMark("s2"), pose: { x: 75, y: 17, s: 0.95, r: -6, o: 1 } },
        { at: reelMark("t2"), pose: { x: 74, y: 19, s: 1.05, r: -2, o: 1 } },
        { at: reelMark("s3"), pose: { x: 76, y: 18, s: 0.9, r: 4, o: 1 } },
        { at: ".hc-manifest", pose: { x: 50, y: 26, s: 1.25, r: -3, o: 1 } },
        { at: ".hc-route", anchor: 0.35, pose: { x: 50, y: 30, s: 1.6, r: 0, o: 0 } },
        { at: ".hc-program", anchor: 0.12, pose: { x: 22, y: 37, s: 0.9, r: 0, o: 0 } },
        { at: ".hc-program", anchor: 0.22, pose: { x: 22, y: 37, s: 0.9, r: 0, o: 1 } },
        { at: ".hc-program", anchor: 0.84, pose: { x: 80, y: 37, s: 0.9, r: 0, o: 1 } },
        { at: ".hc-program", anchor: 0.97, pose: { x: 86, y: 37, s: 0.9, r: 0, o: 0 } },
        { at: ".hc-plan-featured", anchor: 0.1, pose: { x: 50, y: -2, s: 0.5, r: -6, o: 0, dock: true } },
        { at: ".hc-plan-featured", pose: { x: 50, y: -1, s: 0.52, r: -6, o: 1, dock: true } },
        { at: ".hc-climax", pose: { x: 50, y: 22, s: 1.2, r: -4, o: 0 } },
      ]}><Streamer /></Actor>

      {/* MANIFESTO — одна большая мысль (лента проплывает над ней) */}
      <section className="hc-manifest" data-tone="light">
        <p>Spring doesn&rsquo;t wait for anyone. <em>Come get lost in the bloom.</em></p>
      </section>

      <Route />

      {/* PROGRAM — закреплена, лента-таймлайн */}
      <Program />

      {/* STREAMER BANNER — бегущая строка на бумажной ленте поперёк кадра */}
      <div className="hc-banner" aria-hidden>
        <div className="hc-banner-track">
          {[...BANNER, ...BANNER, ...BANNER, ...BANNER].map((item, i) => (
            <span className="hc-banner-item" key={i}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      {/* SPLIT — рынок/вендоры (цифры фестиваля живут здесь, а не отдельной полосой) */}
      <section className="hc-split" id="market" data-tone="light">
        <div className="hc-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="hc-split-copy">
          <span className="hc-kick">We hand-pick the market</span>
          <h2>Forty makers, one long lawn.</h2>
          <p>Ceramics, hot sauce, pressed-flower prints and the loudest shaved-ice stand downtown. Every stall is juried, every single year — no resellers, no filler.</p>
          <ul className="hc-facts"><li><b>3</b> days on the river</li><li><b>40+</b> makers</li><li><b>12</b> food carts</li><li><b>6pm</b> the river turns pink</li></ul>
          <a href="#tickets" className="hc-link">See this year&rsquo;s makers →</a>
        </div>
      </section>

      {/* NOTE — отзыв приколот к доске фестиваля (вместо цитаты по центру) */}
      <section className="hc-note" data-tone="light">
        <figure className="hc-note-card">
          <span className="hc-note-tape" aria-hidden />
          <blockquote>&ldquo;We came for the food carts and stayed for the boat race — genuinely <em>the best Saturday</em> the city has all year.&rdquo;</blockquote>
          <figcaption>— Priya N., third year at Petalfare</figcaption>
        </figure>
      </section>

      {/* PRICING — лента садится бантом на главный билет */}
      <section className="hc-pricing" id="tickets" data-tone="light">
        <div className="hc-pricing-head"><span className="hc-kick">Tickets</span><h2>Pick your Petalfare.</h2><p>Every pass covers Avenue, River and Lawn entry — upgrade for reserved space and the closing-set rail.</p></div>
        <div className="hc-pricing-grid">
          {PLANS.map(([name, tag, price, unit, features, featured]) => (
            <div className={`hc-plan${featured ? " hc-plan-featured" : ""}`} key={name}>
              {featured && <span className="hc-plan-badge">Most popular</span>}
              <span className="hc-plan-tag">{tag}</span>
              <h3 dangerouslySetInnerHTML={{ __html: name }} />
              <div className="hc-plan-price"><b>{price}</b><span>{unit}</span></div>
              <p className="hc-plan-blurb">Weekend entry, zone access and everything below, ready the moment you arrive.</p>
              <ul className="hc-plan-list">
                {features.map((f) => <li key={f} dangerouslySetInnerHTML={{ __html: f }} />)}
              </ul>
              <a href="#" className="hc-ghost-btn">Reserve this pass</a>
            </div>
          ))}
        </div>
      </section>

      {/* CLIMAX — закат */}
      <section className="hc-climax" data-tone="dark" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="hc-climax-veil" aria-hidden />
        <div className="hc-climax-copy"><h2>The river turns pink at six. <em>Be on it.</em></h2><a href="#tickets" className="hc-btn">Get tickets</a></div>
      </section>

      <footer className="hc-foot" data-tone="dark"><span className="hc-brand">PETALFARE</span><span>Spring river festival · Downtown, May 15–17</span></footer>
    </div>
  );
}
