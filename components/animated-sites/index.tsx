"use client";
/* ANIMATED — реестр модуля кино-анимированных сайтов (движок ScrollStage). Растёт по мере сборки 30.
   Каждый сайт = композиция рецептов L3 + свой арт. Пока — лендинг-витрина + первые флагманы. */
import Link from "next/link";
import { Manifesto01 } from "./sites/Manifesto01";
import { Kinetic02 } from "./sites/Kinetic02";
import { Ledger10 } from "./sites/Ledger10";
import { Cipher29 } from "./sites/Cipher29";
import { Forge17 } from "./sites/Forge17";
import { Signal20 } from "./sites/Signal20";
import { Flux06 } from "./sites/Flux06";
import { Aurora27 } from "./sites/Aurora27";
import { Genesis09 } from "./sites/Genesis09";
import { Ovation30 } from "./sites/Ovation30";
import { Archive19 } from "./sites/Archive19";
import { Current23 } from "./sites/Current23";
import { Vigil25 } from "./sites/Vigil25";
import { Strata26 } from "./sites/Strata26";
import { Ascend04 } from "./sites/Ascend04";
import { Relic05 } from "./sites/Relic05";
import { Column11 } from "./sites/Column11";
import { Echo24 } from "./sites/Echo24";
import { Pulse12 } from "./sites/Pulse12";
import { Drift14 } from "./sites/Drift14";
import { Bloom18 } from "./sites/Bloom18";
import { Member03 } from "./sites/Member03";
import { Prism21 } from "./sites/Prism21";
import { Splash13 } from "./sites/Splash13";
import { Terra08 } from "./sites/Terra08";
import { Orbit07 } from "./sites/Orbit07";
import { Atlas15 } from "./sites/Atlas15";
import { Helix16 } from "./sites/Helix16";
import { Vertex22 } from "./sites/Vertex22";
import { Monolith28 } from "./sites/Monolith28";
import "./engine/scrollstage.css";
import "./animated-lab.css";

type Entry = { slug: string; title: string; kicker: string; technique: string; Comp?: () => React.JSX.Element };

// Реестр (пополняется). Comp подключается по мере готовности сайта.
export const SITES: Entry[] = [
  { slug: "manifesto", title: "Manifesto", kicker: "editorial · line-reveal", technique: "line-mask reveal + day→night", Comp: Manifesto01 },
  { slug: "kinetic", title: "Kinetic", kicker: "kinetic-type · velocity-skew", technique: "marquee skew + split-word portal", Comp: Kinetic02 },
  { slug: "ledger", title: "Grove Ledger", kicker: "ui-micro · live calculator", technique: "rAF count-up + working calc", Comp: Ledger10 },
  { slug: "cipher", title: "Cipher//Sec", kicker: "kinetic-type · typewriter", technique: "typewriter + single glitch", Comp: Cipher29 },
  { slug: "forge", title: "Anvil", kicker: "kinetic-type · cards-through-type", technique: "z-sandwich fixed type + ghost-blur", Comp: Forge17 },
  { slug: "signal", title: "Helios", kicker: "editorial · day→night", technique: "rising sun + live count-up", Comp: Signal20 },
  { slug: "flux", title: "Flux", kicker: "webgl · domain-warp", technique: "living gradient flows into device", Comp: Flux06 },
  { slug: "aurora", title: "Aurora", kicker: "webgl · fluid flowmap", technique: "scroll-reactive current", Comp: Aurora27 },
  { slug: "genesis", title: "Genesis", kicker: "particle · morph-to-CTA", technique: "point-cloud sphere→torus→field→text", Comp: Genesis09 },
  { slug: "ovation", title: "Ovation", kicker: "particle · self-assemble", technique: "stream coalesces into mark", Comp: Ovation30 },
  { slug: "archive", title: "Meridian Archive", kicker: "editorial · pinned + cross-fade", technique: "ken-burns + chaptered panels + count-up", Comp: Archive19 },
  { slug: "current", title: "Canopy", kicker: "scroll-reveal · data over photo", technique: "parallax glass cards + live telemetry", Comp: Current23 },
  { slug: "vigil", title: "Vigil", kicker: "scroll-reveal · flashlight", technique: "cursor spotlight reveals relic in dark", Comp: Vigil25 },
  { slug: "strata", title: "Strata", kicker: "scroll-reveal · 2.5D depth-slice", technique: "camera dive into sliced illustration", Comp: Strata26 },
  { slug: "ascend", title: "Ascend", kicker: "scroll-reveal · depth-slice", technique: "4-plane alpine dolly dive-in", Comp: Ascend04 },
  { slug: "relic", title: "Relic", kicker: "scroll-reveal · museum ring", technique: "backlit-ring + turntable + plaque swap", Comp: Relic05 },
  { slug: "column", title: "Column", kicker: "scroll-reveal · accordion", technique: "flex-grow accordion columns", Comp: Column11 },
  { slug: "echo", title: "Echo", kicker: "kinetic-type · gallery-in-gap", technique: "split-title reveals gallery rail", Comp: Echo24 },
  { slug: "pulse", title: "Pulse", kicker: "webgl · particle globe", technique: "fibonacci sphere + fresnel bloom", Comp: Pulse12 },
  { slug: "drift", title: "Drift", kicker: "webgl · silk ribbons", technique: "iridescent flow bends to cursor", Comp: Drift14 },
  { slug: "bloom", title: "Bloom", kicker: "webgl · tendrils", technique: "vines frame viewport, grow on scroll", Comp: Bloom18 },
  { slug: "member", title: "Ember", kicker: "editorial · inline-photo grow", technique: "portrait grows out of a text line", Comp: Member03 },
  { slug: "prism", title: "Prism", kicker: "webgl · shader-into-screen", technique: "living gradient flows into device glass", Comp: Prism21 },
  { slug: "splash", title: "Pulp", kicker: "kinetic-type · product z-sandwich", technique: "can woven between wordmark layers", Comp: Splash13 },
  { slug: "terra", title: "Terra", kicker: "3d-theatre · planet dolly", technique: "dolly-in + day→night + earth-data", Comp: Terra08 },
  { slug: "orbit", title: "Orbit", kicker: "3d-theatre · product", technique: "scale-in + turntable sheen + plaques", Comp: Orbit07 },
  { slug: "atlas", title: "Atlas Grid", kicker: "scroll-reveal · map-hub", technique: "SVG map pins unfold into chapters", Comp: Atlas15 },
  { slug: "helix", title: "Helix", kicker: "3d-theatre · DNA scrub", technique: "realtime WebGL helix + node flares", Comp: Helix16 },
  { slug: "vertex", title: "Vertex", kicker: "3d-theatre · shelf pan", technique: "rack-focus pan across archive shelf", Comp: Vertex22 },
  { slug: "monolith", title: "Stele", kicker: "3d-theatre · dolly-in", technique: "dolly-in + fog parallax + ember", Comp: Monolith28 },
];

export function AnimatedLab({ initialSlug }: { initialSlug?: string }) {
  const site = initialSlug ? SITES.find((s) => s.slug === initialSlug) : undefined;
  if (site?.Comp) return <site.Comp />;

  return (
    <main className="al-home">
      <header className="al-head">
        <span className="al-tag">CREATLY / ANIMATED</span>
        <h1>How did they<br /><em>do this?</em></h1>
        <p>30 кино-анимированных сайтов. Один доминирующий приём на экран. Движок ScrollStage — Lenis + единый RAF + треки прогресса.</p>
      </header>
      <ul className="al-grid">
        {SITES.length === 0 && <li className="al-empty">Флагманы собираются… (Phase 5)</li>}
        {SITES.map((s) => (
          <li key={s.slug} className="al-card">
            <Link href={`/animated/${s.slug}`}>
              <span className="al-kicker">{s.kicker}</span>
              <b>{s.title}</b>
              <span className="al-tech">{s.technique}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
