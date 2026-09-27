"use client";
/* STORY v2 — кино-истории на движке StageDeck. Каждый сайт 1:1 переносит арт-дирекшн своего пина
   (analitic/pins/tatoo/story/N.jpg), затем оживает: zoom/wipe/smash-переходы, foreground/маски, 3D,
   гипер-типографика. Реестр растёт по мере сборки 21 сайта. */
import Link from "next/link";
import { Portfolio01 } from "./Portfolio01";
import { Punk02 } from "./Punk02";
import { Scarlet03 } from "./Scarlet03";
import { Forlorn04 } from "./Forlorn04";
import { Lilith05 } from "./Lilith05";
import { Chrome06 } from "./Chrome06";
import { Rosaline07 } from "./Rosaline07";
import { Seraph08 } from "./Seraph08";
import { Salt09 } from "./Salt09";
import { Deity10 } from "./Deity10";
import { Corrosive12 } from "./Corrosive12";
import { Handover15 } from "./Handover15";
import { Aesthetic14 } from "./Aesthetic14";
import { Lover17 } from "./Lover17";
import { Alexander16 } from "./Alexander16";
import { Nocturne19 } from "./Nocturne19";
import { Ostpuck21 } from "./Ostpuck21";
import { Chivalry20 } from "./Chivalry20";
import { Justice18 } from "./Justice18";
import { Ardour13 } from "./Ardour13";
import "./stagelab.css";

/* Веб-шрифты грузим через runtime <link>, а не CSS @import: Turbopack при конкатенации stage-*.css
   срезает часть @import (правило невалидно по позиции после первых обычных правил), и последние сайты
   теряли шрифты. React 19 / Next 16 поднимает <link rel="stylesheet"> в <head> и дедуплит по href —
   браузер грузит шрифты в рантайме, минуя бандлер. (Metal Mania у ardour самохостится через @font-face.) */
const FONT_HREFS = [
  "https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@0,600;0,800;0,900;1,600&family=Spline+Sans+Mono:wght@400;600&display=swap",
  "https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Manrope:wght@400;600;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Permanent+Marker&family=Manrope:wght@400;600;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cardo:ital,wght@0,400;0,700;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,400;0,700;0,900;1,400&family=Chivo+Mono:wght@400;600&display=swap",
  "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Spectral:ital,wght@0,400;0,600;1,400&family=Share+Tech+Mono&display=swap",
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Jost:wght@400;500;600&family=Noto+Serif+SC:wght@700;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Fjalla+One&family=Archivo:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap",
  "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Chivo:ital,wght@0,400;0,600;0,700;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=Italiana&family=Josefin+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=Michroma&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Share+Tech+Mono&family=Shippori+Mincho:wght@600;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Pirata+One&family=Manrope:wght@400;600;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Pinyon+Script&family=Mulish:wght@400;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Prata&family=Work+Sans:ital,wght@0,400;0,600;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=Rozha+One&family=Outfit:wght@300;400;500;600&display=swap",
  "https://fonts.googleapis.com/css2?family=Sail&family=Petrona:ital,wght@0,400;0,600;1,400&family=Overpass+Mono:wght@400;600&display=swap",
  "https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Yeseva+One&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap",
];
function StageFonts() {
  return <>{FONT_HREFS.map((h) => <link key={h} rel="stylesheet" href={h} />)}</>;
}

type Entry = { slug: string; title: string; who: string; note: string; accent: string; bg: string; hero: string };

const SITES: Entry[] = [
  { slug: "portfolio", title: "PORTFOLIO", who: "Marina Voss", note: "Глянцевый art-director editorial — plum + dusty-pink.", accent: "#e08aa0", bg: "#1c0f16", hero: "/uploads/1/story2/p01-hero.jpg" },
  { slug: "punk", title: "BIG FN LIFE", who: "Madeline", note: "Панк personal-brand — white/black + hot-pink, дерзость.", accent: "#ff2d78", bg: "#0d0d0d", hero: "/uploads/1/story2/p02-hero.jpg" },
  { slug: "scarlet", title: "緋 SCARLET", who: "Tokyo Underground", note: "Кибер-зин нуар — oxblood-red, кандзи, гранж.", accent: "#d8323f", bg: "#0b0808", hero: "/uploads/1/story2/p03-hero.jpg" },
  { slug: "forlorn", title: "FORLORN", who: "Roderika", note: "Тёмное фэнтези + game-HUD — charcoal, bone, blood, сталь.", accent: "#b23a41", bg: "#13100e", hero: "/uploads/1/story2/forlorn-hero.jpg" },
  { slug: "lilith", title: "LILITH", who: "Between light & shadow", note: "Оккульт-романтика — forest-green-black, рога, крылья.", accent: "#a52b30", bg: "#0f1512", hero: "/uploads/1/story2/lilith-hero.jpg" },
  { slug: "rosaline", title: "ROSALINE", who: "A story of her own", note: "Романтик-скрапбук — sepia-rose, розы, кружево.", accent: "#e6b5ba", bg: "#231818", hero: "/uploads/1/story2/rosaline-hero.jpg" },
  { slug: "seraph", title: "SERAPH", who: "Angel warrior", note: "Ангел-воин — rose-pink, нимб, крылья.", accent: "#dd7f95", bg: "#f2e0e4", hero: "/uploads/1/story2/seraph-hero.jpg" },
  { slug: "salt", title: "SALT", who: "I turned", note: "Оккульт-постер — burnt-orange/grey, блайндфолд, терн-нимб.", accent: "#d47a1e", bg: "#1a1410", hero: "/uploads/1/story2/salt-hero.jpg" },
  { slug: "deity", title: "DEITY 神", who: "Self-appointed", note: "Мрамор+золото — статуя-божество, baroque-вейпорвейв.", accent: "#c9a227", bg: "#0e0d0b", hero: "/uploads/1/story2/deity-hero.jpg" },
  { slug: "corrosive", title: "CORROSIVE", who: "New order", note: "Красный поп-арт скринпринт — рогатая монахиня, пропаганда.", accent: "#c0231d", bg: "#a51913", hero: "/uploads/1/story2/corrosive-hero.jpg" },
  { slug: "handover", title: "HANDOVER", who: "A new move", note: "Золотой библейский эпик — пророк, огненная колесница.", accent: "#e0a83a", bg: "#150e05", hero: "/uploads/1/story2/handover-hero.jpg" },
  { slug: "aesthetic", title: "AESTHETIC", who: "Devotion in ink", note: "Готик тату-монахиня — black/blood-red, терн-корона.", accent: "#cc2f3a", bg: "#0c0a0a", hero: "/uploads/1/story2/aesthetic-hero.jpg" },
  { slug: "lover", title: "ART IS LOVER", who: "We are our own creation", note: "Красная статуя-любовники — black/red monochrome.", accent: "#c0202a", bg: "#0a0708", hero: "/uploads/1/story2/lover-hero.jpg" },
  { slug: "alexander", title: "ALEXANDER", who: "The Great", note: "Историч-эпик — teal/cream/red, воин на коне.", accent: "#b83228", bg: "#111c1b", hero: "/uploads/1/story2/alexander-hero.jpg" },
  { slug: "nocturne", title: "ТЬМА", who: "Nocturne", note: "Хоррор-журнал — near-black/blood-red, красные глаза.", accent: "#c01e26", bg: "#080506", hero: "/uploads/1/story2/nocturne-hero.jpg" },
  { slug: "ostpuck", title: "OSTPUCK", who: "The heart is a string", note: "Барокко — warm brown/amber, виолончель, масло.", accent: "#c88a38", bg: "#181009", hero: "/uploads/1/story2/ostpuck-hero.jpg" },
  { slug: "chivalry", title: "CHIVALRY", who: "Honor & valor", note: "Готик — crimson/black, шипастая корона, красный лес.", accent: "#c62430", bg: "#0c0607", hero: "/uploads/1/story2/chivalry-hero.jpg" },
  { slug: "chrome", title: "CHROME", who: "Violetreve", note: "Футуристик-кутюр — silver/chrome + lime, sci-fi.", accent: "#c6ff2e", bg: "#08090b", hero: "/uploads/1/story2/chrome-hero.jpg" },
  { slug: "justice", title: "JUSTICE", who: "Illuminate by design", note: "Вуаль+корона+факел — black/red+bone, script-вордмарк + HUD.", accent: "#d0202c", bg: "#0a0708", hero: "/uploads/1/story2/justice-hero.jpg" },
  { slug: "ardour", title: "執意 ARDOUR", who: "The sacred hunger", note: "Halftone-зин — bone/grey + красный blackletter, монахиня+терн-нимб.", accent: "#c81e1e", bg: "#d9d3c7", hero: "/uploads/1/story2/ardour-hero.jpg" },
];

const RENDER: Record<string, React.ComponentType> = {
  portfolio: Portfolio01,
  punk: Punk02,
  scarlet: Scarlet03,
  forlorn: Forlorn04,
  lilith: Lilith05,
  chrome: Chrome06,
  seraph: Seraph08,
  salt: Salt09,
  deity: Deity10,
  corrosive: Corrosive12,
  handover: Handover15,
  aesthetic: Aesthetic14,
  lover: Lover17,
  alexander: Alexander16,
  nocturne: Nocturne19,
  ostpuck: Ostpuck21,
  chivalry: Chivalry20,
  rosaline: Rosaline07,
  justice: Justice18,
  ardour: Ardour13,
};

export function StageLab({ initialSlug }: { initialSlug?: string }) {
  if (initialSlug && RENDER[initialSlug]) {
    const Site = RENDER[initialSlug];
    return (<><StageFonts />
      <Site /></>);
  }
  return (
    <main className="sl-index">
      <StageFonts />
      <header className="sl-head">
        <span className="sl-kicker">Creatly · story v2</span>
        <h1>Кино-истории</h1>
        <p>Один жест перелистывает сцену. Каждый сайт — арт-дирекшн своего пина, оживший в движении: zoom, wipe, smash, foreground.</p>
      </header>
      <div className="sl-grid">
        {SITES.map((s) => (
          <Link key={s.slug} href={`/story2/${s.slug}`} className="sl-card" style={{ ["--c" as string]: s.accent, ["--b" as string]: s.bg }}>
            <img src={s.hero} alt={s.who} loading="lazy" />
            <div className="sl-card-body">
              <b>{s.title}</b>
              <span>{s.who}</span>
              <em>{s.note}</em>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
