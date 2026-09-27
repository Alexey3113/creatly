"use client";
/* ASTER — «Apogee: dark-sky observatory & stargazing retreat». Мир: малый наблюдатель под великим
   небом — ночь как глубина, не тьма. Шрифты Instrument Sans × Outfit, палитра indigo / starlight-silver /
   nebula-violet / warm-dome-gold + aurora-mint CTA.
   ОДИН ВЗГЛЯД ВВЕРХ: холм → (зум сквозь купол) телескоп → (зум сквозь окуляр) Млечный Путь →
   (смена света) метеорный рассвет. Актёр — кольцо окуляра: ловит купол, садится на окуляр, раскрывается
   в галактику и в небо; в лендинге прыгает по звёздам-цифрам и идёт дугой ночи. Второй актёр —
   тёплый фонарь наблюдателя (поднимается к куполу, в конце лежит на траве под метеорами). */
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
import { FontLinks } from "@/components/shared/FontLinks";
import "./aster.css";

const A = "/uploads/1/animated/aster";
const DOME = { x: 71, y: 66.5 }; // купол на холме (s1-bg)
const EYEPIECE = { x: 84, y: 75.5 }; // окуляр латунного телескопа (s2-bg)

const scenes: ReelScene[] = [
  { id: "hilltop", dark: true, len: 1.05, hold: 0.5, bg: `${A}/s1-bg.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <>
      <span className="as-eyebrow">Dark-sky observatory &amp; stargazing retreat</span>
      <h1>Come this<br />close to <em>the stars.</em></h1>
      <p>One lightless ridge, a century-old brass telescope, and more stars than a city sky has ever offered you at once.</p>
      <div className="as-cta"><a href="#book" className="as-btn">Reserve a night</a><a href="#sky" className="as-ghost">See tonight&rsquo;s sky →</a></div>
    </>
  ) },
  { id: "telescope", dark: true, into: "portal", portal: DOME, bg: `${A}/s2-bg.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="as-idx">— 02 · the eyepiece</span><h2>The Brass Eye</h2>
      <p>Nineteen-oh-six optics, hand-figured and still true. One turn of the focus wheel and Saturn stops being a rumor.</p></>
  ) },
  { id: "milkyway", dark: true, into: "portal", portal: EYEPIECE, len: 1.3, hold: 0.56, bg: `${A}/s3-bg.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="as-freeze"><b>23:30</b><span>the core clears the ridge</span></div>), copy: (
    <><span className="as-idx">— 03 · the arch</span><h2>The Whole Galaxy, Overhead</h2>
      <p>On a clear new-moon night the core clears the ridge and the sky stops behaving like a ceiling.</p></>
  ) },
  { id: "meteor", dark: true, into: "lightshift", tint: "#d6b8f0", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="as-idx">— 04 · before dawn</span><h2>The Meteor Hour</h2>
      <p>Between four and five the sky lets go of its held breath. Lie back on the grass. Let it fall on you.</p></>
  ) },
];

/* звёзды-цифры созвездия: [значение, ед., подпись, x%, y%] — y монотонно растёт (якоря идут по документу) */
const STARS: [string, string, string, number, number][] = [
  ["2,340", "m", "Elevation — above the cloud line and most of the atmosphere’s glow.", 8, 4],
  ["21.9", "mag/arcsec²", "Measured sky brightness — the darkest class recorded on this ridge.", 38, 30],
  ["4,000", "+", "Stars to the naked eye on a new-moon night. A city offers perhaps two hundred.", 62, 54],
  ["2.5M", "ly", "Andromeda — the farthest thing you will ever see without help.", 84, 76],
];
/* дуга ночи: часы по небосводу (позиции тиков в % экрана, пока дуга закреплена) */
const HOURS: [string, string, string, number, number][] = [
  ["6:00 PM", "Arrival", "Altitude tea at the lodge. Your eyes adjust to the elevation before they adjust to the dark.", 4.8, 70],
  ["7:30 PM", "Naked-Eye Hour", "Orientation on the open hilltop as the first stars clear the ridge line.", 12.6, 35.5],
  ["9:00 PM", "The Brass Eye", "Guided time at the 1906 telescope — one object, one turn of the wheel, at a time.", 27.5, 22],
  ["11:30 PM", "Galactic Core", "The Milky Way clears the ridge. Wide-field cameras and tripods come out.", 42.4, 35.5],
  ["4:00 AM", "Meteor Hour", "Blankets, cocoa, and a sky that finally lets go before dawn.", 50.2, 70],
];

export function Aster() {
  return (
    <div className="as">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"]} />
      <header className="as-nav">
        <span className="as-brand">APOGEE</span>
        <nav>
          <a href="#sky">The night</a>
          <a href="#instruments">Instruments</a>
          <a href="#book">Stay</a>
          <a href="#book" className="as-nav-cta">Reserve a night</a>
        </nav>
      </header>

      <Reel scenes={scenes} cue="look up ↓" />

      {/* СКВОЗНОЙ СЛОЙ: одно звёздное поле на весь сайт, ночь светлеет к рассвету у CTA */}
      <Atmosphere stops={[
        { at: ".as-manifest", color: "#0d1029" }, { at: ".as-const", color: "#0f1233" }, { at: ".as-night", color: "#120f36" },
        { at: ".as-cards", color: "#0e1130" }, { at: ".as-split", color: "#16143a" }, { at: ".as-log", color: "#211a44" },
        { at: ".as-deal", color: "#2d2149" }, { at: ".as-climax", color: "#3d2d50" },
      ]} />
      <Backdrop from=".as-manifest" dim={0.46} plates={[
        { at: ".as-manifest", src: `${A}/s3-bg.webp`, pos: "50% 62%" }, { at: ".as-const", src: `${A}/s1-bg.webp`, pos: "50% 30%" },
        { at: ".as-night", src: `${A}/s3-bg.webp`, pos: "50% 62%" }, { at: ".as-split", src: `${A}/s1-bg.webp`, pos: "50% 30%" },
        { at: ".as-deal", src: `${A}/s4-bg.webp`, pos: "50% 60%" },
      ]} />
      <Weather kind="stars" count={70} color="#c8d0e6" color2="#8affd8" between={[reelMark("s0"), ".as-foot"]} world={0.12} zIndex={6} />
      {/* тёплый фонарь наблюдателя: поднимается к куполу; под метеорами лежит на траве рядом с ним */}
      <Actor className="as-lamp-actor" width="3.2vw" zIndex={30} bob={2} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: 57, y: 74.5, s: 0.9, o: 1 } },
        { at: reelMark("t0"), pose: { x: 69.5, y: 68, s: 0.6, o: 0 } },
        { at: reelMark("t2"), pose: { x: 58.5, y: 74, s: 0.8, o: 0 } },
        { at: reelMark("s3"), pose: { x: 58.5, y: 74, s: 0.9, o: 1 } },
        { at: reelMark("end"), pose: { x: 58.5, y: 74, s: 0.9, o: 1 } },
        { at: ".as-manifest", pose: { x: 58.5, y: 40, s: 0.6, o: 0 } },
      ]}><div className="as-lamp" /></Actor>
      {/* кольцо окуляра — мотив взгляда вверх */}
      <Actor className="as-ring-actor" width="9vw" zIndex={33} bob={3} tilt={0} stops={[
        { at: reelMark("s0"), pose: { x: DOME.x, y: DOME.y - 1, s: 0.62, o: 1 } },
        { at: reelMark("t0"), pose: { x: DOME.x, y: DOME.y, s: 7, o: 0 } },
        { at: reelMark("s1"), pose: { x: EYEPIECE.x, y: EYEPIECE.y, s: 0.5, o: 1 } },
        { at: reelMark("t1"), pose: { x: EYEPIECE.x, y: EYEPIECE.y, s: 7, o: 0 } },
        { at: reelMark("s2"), pose: { x: 64, y: 50, s: 4.6, o: 0.5 } },
        { at: reelMark("t2"), pose: { x: 60, y: 44, s: 9, o: 0 } },
        { at: ".as-manifest", pose: { x: 50, y: 50, s: 1, o: 0 } },
        { at: ".as-star:nth-of-type(1)", pose: { x: 0, y: 0, s: 1.1, o: 1, dock: true } },
        { at: ".as-star:nth-of-type(2)", pose: { x: 0, y: 0, s: 0.9, o: 1, dock: true } },
        { at: ".as-star:nth-of-type(3)", pose: { x: 0, y: 0, s: 0.9, o: 1, dock: true } },
        { at: ".as-star:nth-of-type(4)", pose: { x: 100, y: 0, s: 0.9, o: 1, dock: true } },
        ...HOURS.map(([, , , x, y], i) => ({ at: `.as-hour:nth-child(${i + 1})`, pose: { x, y, s: 0.55, o: 1 } })),
        { at: ".as-cards", pose: { x: 90, y: 20, s: 0.4, o: 0 } },
        { at: ".as-deal-card", anchor: 0.4, pose: { x: 50, y: 32, s: 2.1, o: 0.9, dock: true } },
        { at: ".as-climax", pose: { x: 50, y: 45, s: 9, o: 0 } },
      ]}><div className="as-ring"><i /></div></Actor>

      {/* MANIFESTO — одна крупная мысль прямо на небе */}
      <section className="as-manifest">
        <p>Down there, the sky is <em>a rumor.</em> Up here, it&rsquo;s the whole conversation.</p>
      </section>

      {/* CONSTELLATION — цифры хребта как звёзды, связанные линиями (вместо полосы из 4 цифр) */}
      <section className="as-const">
        <div className="as-const-head">
          <span className="as-kick">What the ridge gives you</span>
          <h2>Numbers a city sky can&rsquo;t.</h2>
        </div>
        <div className="as-chart">
          <svg className="as-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <polyline points="8,4 38,30 62,54 84,76" />
            <polyline points="38,30 58,14 74,22" />
            <polyline points="62,54 90,44" />
          </svg>
          <i className="as-dust" style={{ left: "58%", top: "14%" }} aria-hidden />
          <i className="as-dust" style={{ left: "74%", top: "22%" }} aria-hidden />
          <i className="as-dust" style={{ left: "90%", top: "44%" }} aria-hidden />
          {STARS.map(([v, u, s, x, y]) => (
            <div className="as-star" key={v} style={{ left: `${x}%`, top: `${y}%` }}>
              <b>{v}<sup>{u}</sup></b>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE NIGHT — закреплённая дуга небосвода; кольцо идёт по часам ночи (вместо ряда шагов) */}
      <section className="as-night" id="sky">
        <div className="as-night-pin" aria-hidden>
          <svg className="as-arc" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M8,80 A42,58 0 0 1 92,80" />
          </svg>
          <span className="as-horizon" />
          {HOURS.map(([t, , , x, y]) => (
            <span className="as-tick" key={t} style={{ left: `${(x / 55) * 100}%`, top: `${y}%` }}><em>{t}</em></span>
          ))}
        </div>
        <div className="as-night-list">
          <div className="as-night-head">
            <span className="as-kick">One booking, one ridge, one night</span>
            <h2>How a night unfolds.</h2>
          </div>
          <ol className="as-hours">
            {HOURS.map(([t, h, s]) => (
              <li className="as-hour" key={t}><span className="as-time">{t}</span><h3>{h}</h3><p>{s}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section className="as-cards" id="instruments">
        <div className="as-cards-head">
          <div><span className="as-kick">On the ridge</span><h2>Instruments &amp; programs.</h2></div>
          <p>Four ways to spend a night — from the naked eye to a tracked long exposure.</p>
        </div>
        <div className="as-card-grid">
          {[["01", "The Brass Refractor", "14-inch, hand-figured in 1906, still true to a hundredth of a wave."],
            ["02", "Wide-Field Deck", "Six mounted binocular stations — no waiting in line for the dome."],
            ["03", "Astrophotography Bay", "Tracked mounts and cold-weather power for exposures past midnight."],
            ["04", "Dome Talks", "A resident astronomer walks the night sky, three evenings a week."]].map(([n, t, s], i) => (
            <div className="as-card" key={i}><span className="as-card-n">{n}</span><h3>{t}</h3><p>{s}</p></div>
          ))}
        </div>
      </section>

      {/* SPLIT — журнал неба */}
      <section className="as-split">
        <div className="as-split-media" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }} aria-hidden />
        <div className="as-split-copy">
          <span className="as-kick">Why the sky holds still for you</span>
          <h2>We log the sky before you look up.</h2>
          <p>Moon phase, seeing, transparency — every clear night on the ridge is measured before we open the dome, so the hour we hand you is the best one available, not just the next one.</p>
          <a href="#book" className="as-link">Read the sky log →</a>
        </div>
      </section>

      {/* LOG — отзыв как запись в журнале наблюдений (не цитата по центру) */}
      <section className="as-log">
        <div className="as-log-entry">
          <span className="as-log-meta">Observing log · Oct 14 · 04:12 · seeing 4/5</span>
          <blockquote>&ldquo;I have stood under a lot of night skies. I have never had one <em>narrated</em> to me like this — like someone had already found everything worth finding.&rdquo;</blockquote>
          <cite>— Renata K., amateur astronomer</cite>
        </div>
      </section>

      {/* DEAL */}
      <section className="as-deal" id="book">
        <div className="as-deal-card">
          <span className="as-kick">The overnight watch</span>
          <div className="as-price"><b>$185</b><span>/ guest · dome access, guide &amp; the brass eye</span></div>
          <p>One full night on the ridge: transport from the valley, all instruments, blankets and cocoa, and a seat at the eyepiece for as long as the sky holds.</p>
          <a href="#" className="as-btn">Reserve a night</a>
          <span className="as-note">Clear-sky guarantee · Free to reschedule</span>
        </div>
      </section>

      {/* CLIMAX — рассвет */}
      <section className="as-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="as-climax-veil" aria-hidden />
        <div className="as-climax-copy"><h2>The sky is already <em>falling.</em></h2><a href="#book" className="as-btn">Reserve a night</a></div>
      </section>

      <footer className="as-foot"><span className="as-brand">APOGEE</span><span>Dark-sky observatory · Elevation 2,340 m</span></footer>
    </div>
  );
}
