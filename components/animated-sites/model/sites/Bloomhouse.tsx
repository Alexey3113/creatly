"use client";
/* BLOOMHOUSE — a Victorian glasshouse in the heart of the city. Мир: рукотворная геометрия чугуна и стекла,
   несущая дикую органику растений всё выше к свету — вход → орхидная зала → лилиевый пруд → купол.
   Собран на общем движке <Reel/>; лендинг и типографика — свои (Newsreader × Karla, emerald/blush/brass). */
import { Reel, type ReelScene } from "../reel";
import "./bloomhouse.css";
import { FontLinks } from "@/components/shared/FontLinks";

const A = "/uploads/1/animated/bloomhouse";
const scenes: ReelScene[] = [
  { id: "entry", bg: `${A}/s1-bg.webp`, mid: `${A}/s1-mid.webp`, fg: `${A}/s1-fg.webp`, copy: (
    <div className="bh-hero">
      <span className="bh-eyebrow">A Victorian glasshouse, grown for wonder</span>
      <h1>Step into<br /><em>the light.</em></h1>
      <p>Iron ribs and hand-glazed panes hold up a sky of their own — ferns, orchids and water lilies grow wild beneath. Open to members, wedding parties and Sunday wanderers alike.</p>
      <div className="bh-cta"><a href="#deal" className="bh-btn">Become a Member</a><a href="#halls" className="bh-ghost">Walk the Halls →</a></div>
    </div>
  ) },
  { id: "orchids", bg: `${A}/s2-bg.webp`, mid: `${A}/s2-mid.webp`, fg: `${A}/s2-fg.webp`, spark: 6, copy: (
    <><span className="bh-idx">— 02 · the orchid hall</span><h2>Orchid Hall</h2>
      <p>Tiered blooms climb the brass trellises in blush and ivory, warmed by glass overhead. Even in January, it is midsummer in here.</p></>
  ) },
  { id: "lilypond", bg: `${A}/s3-bg.webp`, mid: `${A}/s3-mid.webp`, fg: `${A}/s3-fg.webp`, copy: (
    <><span className="bh-idx">— 03 · the lily pond</span><h2>The Lily Pond</h2>
      <p>Giant pads rest on still green water beneath a stone footbridge, koi moving like shadows under the glass.</p></>
  ) },
  { id: "dome", bg: `${A}/s4-bg.webp`, mid: `${A}/s4-mid.webp`, fg: `${A}/s4-fg.webp`, copy: (
    <><span className="bh-idx">— 04 · the dome</span><h2>The Dome</h2>
      <p>Vines climb the last iron ring to an open crown of sky. Every arch in the house has been leading here.</p></>
  ) },
];

const STEPS = [
  ["01", "Arrive", "Enter beneath the iron arches of the Entrance Hall. Leave your coat at the brass rail and take a map of the four halls."],
  ["02", "Wander", "Cross into the Orchid Hall, where the air turns warm and blush blooms crowd the trellises overhead."],
  ["03", "Cross", "Step onto the stone bridge over the Lily Pond — giant pads, koi shadows, the glass close above you."],
  ["04", "Rise", "Climb into the Dome, where the vines frame an open sky and the whole glasshouse sits beneath you."],
] as const;

const HALLS = [
  ["Entrance Hall", "Iron arches and misted glass, ferns crowding the stone path.", `${A}/s1-bg.webp`],
  ["Orchid Hall", "Blush and ivory blooms tiered on brass, humid and sunlit.", `${A}/s2-bg.webp`],
  ["The Lily Pond", "Giant pads on still water, reflected arches overhead.", `${A}/s3-bg.webp`],
  ["The Dome", "Climbing vines framing a bright, open crown of sky.", `${A}/s4-bg.webp`],
] as const;

export function Bloomhouse() {
  return (
    <div className="bh">
      <FontLinks hrefs={["https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Karla:wght@400;500;600;700&display=swap"]} />
      <header className="bh-nav">
        <span className="bh-brand">BLOOMHOUSE</span>
        <nav><a href="#halls">The Halls</a><a href="#visit">Visit</a><a href="#membership">Membership</a><a href="#deal" className="bh-nav-cta">Reserve a Visit</a></nav>
      </header>

      <Reel scenes={scenes} cue="climb ↓" />

      {/* MANIFESTO — одна большая мысль */}
      <section className="bh-manifest">
        <p>Iron holds the glass up. <em>Everything else is left to grow wild.</em></p>
      </section>

      {/* STEPS — SIGNATURE: горизонтальный ряд шагов "как проходит визит" */}
      <section className="bh-steps" id="visit">
        <div className="bh-steps-head"><span className="bh-kick">How a visit unfolds</span><h2>Four halls, one climb toward the light.</h2></div>
        <ol className="bh-steps-row">
          {STEPS.map(([n, t, s], i) => (
            <li className="bh-step" key={i}>
              <span className="bh-step-arch" aria-hidden />
              <span className="bh-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* GALLERY — четыре залы как обложки (уникальный блок, которого нет у эталона) */}
      <section className="bh-gallery" id="halls">
        <div className="bh-gallery-head"><span className="bh-kick">The four halls</span><h2>One glasshouse, four climates.</h2></div>
        <div className="bh-gallery-row">
          {HALLS.map(([t, s, img], i) => (
            <a className="bh-tile" key={i} href="#deal" style={{ backgroundImage: `url(${img})` }}>
              <span className="bh-tile-veil" aria-hidden />
              <span className="bh-tile-n">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{s}</p>
            </a>
          ))}
        </div>
      </section>

      {/* SPLIT — членство */}
      <section className="bh-split" id="membership">
        <div className="bh-split-media" style={{ backgroundImage: `url(${A}/s2-bg.webp)` }} aria-hidden />
        <div className="bh-split-copy">
          <span className="bh-kick">Membership, for those who want the key</span>
          <h2>Come before the gates open to everyone else.</h2>
          <p>Members let themselves in at half past seven, while the glass is still fogged with dawn. A private hour under the dome, a standing discount at the botanical shop, and two guest passes a year for whoever you want to show the orchids.</p>
          <a href="#deal" className="bh-link">See membership →</a>
        </div>
      </section>

      {/* STATS */}
      <section className="bh-stats">
        {[["1861", "the year the ironwork went up"], ["4", "glass halls, one climb"], ["600+", "species living under glass"], ["07:30", "member hours, before the gates open"]].map(([n, l], i) => (
          <div className="bh-stat" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="bh-quote">
        <blockquote>“I have been a member for six years and I still stop under the dome every time. It doesn't feel like a garden. It feels like <em>weather that decided to stay</em>.”</blockquote>
        <cite>— Priya N., member since 2019 · married in the Orchid Hall</cite>
      </section>

      {/* DEAL */}
      <section className="bh-deal" id="deal">
        <div className="bh-deal-card">
          <span className="bh-kick">The glasshouse membership</span>
          <div className="bh-price"><b>£18</b><span>/ month · unlimited entry, all four halls</span></div>
          <p>Early hours before opening, a discount at the botanical shop, and two guest passes a year. Cancel any month — the glasshouse holds no grudges.</p>
          <a href="#" className="bh-btn">Join Bloomhouse</a>
          <span className="bh-note">Founding-member rate for the first 200 · Private hire enquiries welcome</span>
        </div>
      </section>

      {/* CLIMAX */}
      <section className="bh-climax" style={{ backgroundImage: `url(${A}/s4-bg.webp)` }}>
        <div className="bh-climax-veil" aria-hidden />
        <div className="bh-climax-copy"><h2>Your glass sky is <em>one door</em> away.</h2><a href="#deal" className="bh-btn">Reserve a Visit</a></div>
      </section>

      <footer className="bh-foot"><span className="bh-brand">BLOOMHOUSE</span><span>A Victorian glasshouse in the heart of the city · Est. 1861</span></footer>
    </div>
  );
}
