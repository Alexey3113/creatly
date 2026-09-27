"use client";
/* MERIDIAN — «guided night crossings». Мир: нуар-город от золотого часа на крышах до неонового ливня
   и чистого рассвета: крыши → (спуск по служебной лестнице) переулок → (неоновая вспышка) ливень →
   (полоса рассвета) пустой проспект.
   Сквозной актёр — ОДНА КРАСНАЯ НЕОНОВАЯ ВЫВЕСКА, закреплённая у края кадра: город меняется вокруг неё —
   выключена в золотой час → вспыхивает в переулке → двоится в луже под ливнем → гаснет на рассвете.
   Лендинг идёт по часам 6:40 PM → 5:15 AM (плита мира и свет меняются под секциями), вывеска мерцает
   на каждом часе и садится на чек-карточку брони.
   Свой шрифт-пейринг Bricolage Grotesque × Space Grotesk, палитра brick/night-blue/neon-rose/neon-cyan. */
import { useEffect, useRef } from "react";
import { Reel, reelMark, type ReelScene } from "../reel";
import { Actor, Weather, Atmosphere, Backdrop, subscribe, segment, selectorCache, smooth } from "@/components/scene-kit";
import "./meridian.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/meridian";
const scenes: ReelScene[] = [
  { id: "rooftops", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, len: 1.1, hold: 0.5, copy: (
    <>
      <span className="mr-eyebrow">Golden hour, rooftop side</span>
      <h1>Meet the city<br /><em>before neon wins.</em></h1>
      <p>One guided crossing from rooftop gold to 3 a.m. rain — four hours, four blocks, and the same red sign keeping watch the whole way.</p>
      <div className="mr-cta"><a href="#book" className="mr-btn">Book the crossing</a><a href="#hours" className="mr-ghost">See the night →</a></div>
    </>
  ) },
  { id: "alley", dark: true, into: "descend", tint: "#ff3d68", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, copy: (
    <><span className="mr-idx">— 02 · the alley</span><h2>The Sign Finds You</h2>
      <p>Wet brick, cyan steam, one red neon word bent low over the street. From here it&apos;s in every reflection — puddle, visor, window.</p></>
  ) },
  { id: "rain", dark: true, into: "lightshift", tint: "#ff3d68", len: 1.25, hold: 0.55, bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`,
    freeze: (<div className="mr-freeze"><b>11:52<small>PM</small></b><span>on fire and drowning at once</span></div>), copy: (
    <><span className="mr-idx mr-light">— 03 · the crossing</span><h2 className="mr-hl">Downpour</h2>
      <p className="mr-pl">The whole intersection turns to glass. Headlights smear, the sign doubles in the gutter, and for one block the city burns and drowns at once.</p></>
  ) },
  { id: "dawncity", into: "sweep", tint: "#ffc9a8", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="mr-idx mr-idx-dawn">— 04 · dawn</span><h2 className="mr-dawn-h">The Quiet Hour</h2>
      <p className="mr-dawn-p">Rain stops. Neon dims to pink ash. You&apos;re the only footsteps on an avenue built for a million people.</p></>
  ) },
];

/* лендинг по часам ночи: плита мира и свет меняются под секциями */
const HOURS = [
  { time: "6:40", ap: "PM", t: "The Roof", s: "We start above the noise, drinks in hand, watching the light go from gold to bruise. The sign across the street is still just glass and wire." },
  { time: "9:00", ap: "PM", t: "The Alley", s: "Down the service stairs into the part of the map with no street signs — only the red one. Every crossing is walked and timed in advance: we know which puddle holds it best." },
  { time: "11:30", ap: "PM", t: "The Storm", s: "If it's raining we don't wait it out. We walk straight into the best-looking ten minutes of the year, and the sign walks with us, doubled in the gutter." },
  { time: "5:15", ap: "AM", t: "The Line", s: "One diner, one window seat, the avenue turning from ink to peach outside the glass. “I've lived here nine years and saw my own street for the first time.” — D. Okafor, crossing #114" },
];

/* сквозное значение по якорям */
function follow(sel: string[], vals: number[], cb: (v: number) => void) {
  const els = selectorCache(sel);
  let last = Infinity;
  return subscribe(({ vh }) => {
    const s = segment(els(), vh);
    if (!s) return;
    const v = vals[s.a] + (vals[s.b] - vals[s.a]) * smooth(s.t);
    if (Math.abs(v - last) > 1e-4) { last = v; cb(v); }
  });
}

export function Meridian() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const set = (k: string) => (v: number) => el.style.setProperty(k, v.toFixed(3));
    // вывеска: горит / двоится в луже — по сценам рила и часам лендинга
    const anchors = [reelMark("s0"), reelMark("t0"), reelMark("s1"), reelMark("s2"), reelMark("t2"), reelMark("s3"),
      ".mr-big", ".mr-hour:nth-child(1)", ".mr-hour:nth-child(2)", ".mr-hour:nth-child(3)", ".mr-hour:nth-child(4)", ".mr-deal", ".mr-climax"];
    const offOn = follow(anchors, [0, 0.35, 1, 1, 0.55, 0.06, 0.05, 0.12, 1, 1, 0.1, 1, 1], set("--mr-on"));
    const offDbl = follow(anchors, [0, 0, 0.2, 1, 0.4, 0, 0, 0, 0.2, 1, 0, 0, 0], set("--mr-dbl"));
    // мерцание: вывеска «щёлкает» каждый раз, когда час/сцена проходит середину экрана
    const sign = el.querySelector<HTMLElement>(".mr-sign");
    const trig = selectorCache([reelMark("t0"), reelMark("t1"), ".mr-hour:nth-child(2) .mr-hour-time", ".mr-hour:nth-child(3) .mr-hour-time", ".mr-deal-card", ".mr-climax h2"]);
    const side: number[] = [];
    let k = 0;
    const offFlick = subscribe(({ vh }) => {
      trig().forEach((n, i) => {
        if (!n || !sign) return;
        const r = n.getBoundingClientRect();
        const s = r.top + r.height / 2 < vh * 0.5 ? -1 : 1;
        if (side[i] !== undefined && side[i] !== s) sign.dataset.flick = String(k++ % 2);
        side[i] = s;
      });
    });
    return () => { offOn(); offDbl(); offFlick(); };
  }, []);

  return (
    <div className="mr" ref={root}>
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Space+Grotesk:wght@400;500;600;700&display=swap"]} />
      <header className="mr-nav">
        <span className="mr-brand">MERIDIAN<span>.</span></span>
        <nav><a href="#hours">The night</a><a href="#book" className="mr-nav-cta">Book the crossing</a></nav>
      </header>

      <Reel scenes={scenes} cue="descend ↓" />

      {/* СКВОЗНОЙ СЛОЙ: свет ночи под лендингом, дождь переулка и ливня, вывеска */}
      <Atmosphere stops={[
        { at: ".mr-big", color: "#3a2626" }, { at: ".mr-hour:nth-child(1)", color: "#4a2a22" }, { at: ".mr-hour:nth-child(2)", color: "#141a30" },
        { at: ".mr-hour:nth-child(3)", color: "#0c1222" }, { at: ".mr-hour:nth-child(4)", color: "#5a4048" }, { at: ".mr-deal", color: "#1a1a2a" },
      ]} />
      <Backdrop className="mr-bd" from=".mr-big" dim={0.46} plates={[
        { at: ".mr-big", src: `${A}/s1-bg.webp` }, { at: ".mr-hour:nth-child(1)", src: `${A}/s1-bg.webp` },
        { at: ".mr-hour:nth-child(2)", src: `${A}/s2-bg.webp`, pos: "50% 80%" }, { at: ".mr-hour:nth-child(3)", src: `${A}/s3-bg.webp`, pos: "50% 80%" },
        { at: ".mr-hour:nth-child(4)", src: `${A}/s4-bg.webp` }, { at: ".mr-deal", src: `${A}/s2-bg.webp`, pos: "50% 80%" },
      ]} />
      <Weather kind="rain" count={56} color="#9fd8ec" color2="#ff9ab2" between={[reelMark("t0"), reelMark("t2")]} world={0.25} wind={1.2} zIndex={31} />
      <Weather kind="rain" count={44} color="#9fd8ec" color2="#ff9ab2" seed={5} between={[".mr-hour:nth-child(3)", ".mr-hour:nth-child(4)"]} world={0.25} zIndex={31} />
      <Actor className="mr-sign-actor" width="clamp(44px,6.2vh,66px)" zIndex={34} bob={0} tilt={0.05} stops={[
        { at: reelMark("s0"), pose: { x: 93, y: 40, s: 1, o: 1 } },
        { at: reelMark("end"), pose: { x: 93, y: 40, s: 1, o: 1 } },
        { at: ".mr-hour:nth-child(1)", pose: { x: 93, y: 42, s: 1, o: 1 } },
        { at: ".mr-hour:nth-child(4)", pose: { x: 93, y: 42, s: 1, o: 1 } },
        { at: ".mr-deal-card", pose: { x: 104, y: 46, s: 0.92, o: 1, dock: true } },
        { at: ".mr-climax", pose: { x: 90, y: 46, s: 1.05, r: 0, o: 1 } },
      ]}>
        <div className="mr-sign">
          <i className="mr-sign-arm" />
          <div className="mr-sign-blade">
            <span className="mr-sign-off">MERIDIAN</span>
            <span className="mr-sign-on">MERIDIAN</span>
          </div>
          <div className="mr-sign-refl" aria-hidden><span>MERIDIAN</span></div>
        </div>
      </Actor>

      {/* BIG-TYPE — поверх золотого часа */}
      <section className="mr-big">
        <p>Every guidebook shows you noon. <em>We only work the other twelve hours.</em></p>
      </section>

      {/* HOURS — секции по часам ночи (вместо галереи настроений×4, шагов, цифр и цитаты) */}
      <section className="mr-hours" id="hours" aria-label="How a crossing runs">
        {HOURS.map((h, i) => (
          <article className="mr-hour" key={h.time}>
            <div className="mr-hour-time"><b>{h.time}</b><span>{h.ap}</span></div>
            <div className="mr-hour-copy">
              <span className="mr-kick">0{i + 1} · {h.t}</span>
              <h2>{h.t}</h2>
              <p>{h.s}</p>
            </div>
          </article>
        ))}
      </section>

      {/* DEAL — чек ночного дайнера */}
      <section className="mr-deal" id="book">
        <div className="mr-deal-card">
          <span className="mr-kick">The guided crossing</span>
          <ul className="mr-receipt" aria-label="What's included">
            <li><span>Guide, rooftop to dawn</span><b>✓</b></li>
            <li><span>Transit between blocks</span><b>✓</b></li>
            <li><span>The 5 AM diner tab</span><b>✓</b></li>
            <li><span>Guests per crossing</span><b>12 max</b></li>
          </ul>
          <div className="mr-price"><b>$145</b><span>/ guest · rain or shine</span></div>
          <a href="#" className="mr-btn">Reserve a night</a>
          <span className="mr-note">Weather isn&apos;t a maybe here. It&apos;s the point.</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="mr-climax" style={{ backgroundImage: `url(${A}/s3-bg.webp)` }}>
        <div className="mr-climax-veil" aria-hidden />
        <div className="mr-climax-copy"><h2>One sign. <em>Every night, different light.</em></h2><a href="#book" className="mr-btn">Book the crossing</a></div>
      </section>

      <footer className="mr-foot"><span className="mr-brand">MERIDIAN</span><span>Guided night crossings · One sign, every reflection</span></footer>
    </div>
  );
}
