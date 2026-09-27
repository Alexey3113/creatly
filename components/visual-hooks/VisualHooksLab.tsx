"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderReveal } from "./ShaderReveal";
import { ShaderImage } from "./ShaderImage";
import { DepthParallax } from "./DepthParallax";
import { BackgroundsShowcase } from "./BackgroundsShowcase";
import { SitesIndex } from "./SitesIndex";
import { AnimatedIndex } from "./AnimatedIndex";
import { ShaderBg } from "./ShaderBg";
import { ClothingSite } from "@/components/concept-sites/ClothingSite";
import { SkydiveSite } from "@/components/concept-sites/SkydiveSite";
import { VinylSite } from "@/components/concept-sites/VinylSite";
import { PorscheSite } from "@/components/concept-sites/PorscheSite";
import { AnimeSite } from "@/components/concept-sites/AnimeSite";
import { EcologySite } from "@/components/concept-sites/EcologySite";
import { DjSite } from "@/components/concept-sites/DjSite";
import { RedsuitSite } from "@/components/concept-sites/RedsuitSite";
import { NotreDameSite } from "@/components/concept-sites/NotreDameSite";
import { JpClubSite } from "@/components/concept-sites/JpClubSite";
import { SkiSnowSite } from "@/components/concept-sites/SkiSnowSite";
import { JpTattooSite } from "@/components/concept-sites/JpTattooSite";
import { BmwSite } from "@/components/concept-sites/BmwSite";
import { DanceSite } from "@/components/concept-sites/DanceSite";
import { FolkMusicSite } from "@/components/concept-sites/FolkMusicSite";
import { RockBandSite } from "@/components/concept-sites/RockBandSite";
import { PhotographerSite } from "@/components/concept-sites/PhotographerSite";
import { WomenSuitSite } from "@/components/concept-sites/WomenSuitSite";
import { HoodieSite } from "@/components/concept-sites/HoodieSite";
import { EscortSite } from "@/components/concept-sites/EscortSite";
import { CarDealerSite } from "@/components/concept-sites/CarDealerSite";
import { JpRestaurantSite } from "@/components/concept-sites/JpRestaurantSite";
import { FreestyleSite } from "@/components/concept-sites/FreestyleSite";
import { Backdrop } from "@/components/scene-kit";

type Scene = {
  slug: string;
  number: string;
  title: string;
  family: string;
  note: string;
  preview: string; // постер-картинка карточки (fallback, пока нет скринкаста)
  cast?: string; // скринкаст-видео карточки: /uploads/1/hooks/casts/<name>.mp4
  accent: string;
};

const scenes: Scene[] = [
  { slug: "bloom", number: "★", title: "Bloom", family: "Interactive story", note: "Silicon veins and blossoms wake as you scroll.", preview: "/uploads/1/hooks/scenes/bloom-hero.png", cast: "/uploads/1/hooks/casts/bloom.mp4", accent: "#c9a2ff" },
  { slug: "held-world", number: "★", title: "Held World", family: "Interactive story", note: "A tiny world wakes in an open hand as you scroll.", preview: "/uploads/1/hooks/scenes/held-world-poster.jpg", accent: "#6fd3ff" },
  { slug: "monolith", number: "★", title: "Monolith", family: "Interactive story", note: "Mist parts and the dusk ignites behind the stone.", preview: "/uploads/1/hooks/scenes/monolith-poster.jpg", accent: "#ff9d5c" },
  { slug: "planet-vigil", number: "★", title: "Planet Vigil", family: "Interactive story", note: "A world turns while she keeps her quiet watch.", preview: "/uploads/1/hooks/scenes/planet-vig-poster.jpg", accent: "#f0a6c8" },
  { slug: "ascension", number: "★", title: "Ascension", family: "Interactive story", note: "A figure surfaces from the light and returns.", preview: "/uploads/1/hooks/scenes/ascension-poster.jpg", accent: "#e6dcff" },
  { slug: "rev-neura", number: "R1", title: "Neura", family: "Cursor reveal", note: "Move across the face to reveal the machine beneath.", preview: "/uploads/1/hooks/casts/rev-neura.mp4", accent: "#4defff" },
  { slug: "rev-mythic", number: "R2", title: "Mythic", family: "Cursor reveal", note: "A daylit valley that glows alive under your cursor.", preview: "/uploads/1/hooks/casts/rev-mythic.mp4", accent: "#43e0c0" },
  { slug: "rev-imperial", number: "R3", title: "Imperial", family: "Cursor reveal", note: "Trace the globe to light its hidden network.", preview: "/uploads/1/hooks/casts/rev-imperial.mp4", accent: "#3df0ff" },
  { slug: "track-portfolio", number: "S1", title: "Studio X", family: "Scroll gaze", note: "A face that turns to follow you as you scroll.", preview: "/uploads/1/hooks/scenes/gaze-face-poster.jpg", accent: "#38bdf8" },
  { slug: "track-sentry", number: "S2", title: "Sentry", family: "Scroll gaze", note: "A watcher that tracks your descent down the page.", preview: "/uploads/1/hooks/scenes/gaze-char-poster.jpg", accent: "#39d0ff" },
  { slug: "track-neon", number: "S3", title: "Neon Logic", family: "Scroll gaze", note: "A neon emblem that turns as the page moves.", preview: "/uploads/1/hooks/scenes/neon-obj-poster.jpg", accent: "#41e6ff" },
  { slug: "living-object", number: "00", title: "Living Object", family: "Cinematic scrub", note: "Scroll wakes a sealed object until light breaks through the seam.", preview: "/uploads/1/hooks/ovoid-hero-poster.jpg", accent: "#f4b968" },
  { slug: "cloud-step", number: "02", title: "Cloud Step", family: "Cutout parallax", note: "A sculpted sneaker floats on a sky that isn't its own.", preview: "/uploads/1/hooks/casts/cloud-step.mp4", accent: "#ff9ec4" },
  { slug: "strata", number: "03", title: "Strata", family: "Layered editorial", note: "A living ridge of stone drifts across a clean sky.", preview: "/uploads/1/hooks/scenes/s2-strata.png", accent: "#c8ff5a" },
  { slug: "reverie", number: "04", title: "Reverie", family: "Portal object", note: "A ring of light opens into another climate.", preview: "/uploads/1/hooks/scenes/s3-forest.png", accent: "#f6b23a" },
  { slug: "vanguard", number: "05", title: "Vanguard", family: "Kinetic typography", note: "Three commands and a crew that stands behind them.", preview: "/uploads/1/hooks/scenes/s4-figures-cut.png", accent: "#ff3b2f" },
  { slug: "aether", number: "06", title: "Aether", family: "Atmospheric", note: "A monolith breathes through lavender fog.", preview: "/uploads/1/hooks/casts/aether.mp4", accent: "#b9a6e6" },
  { slug: "botanica", number: "07", title: "Botanica", family: "Material shadow", note: "An object and its shadow follow your hand.", preview: "/uploads/1/hooks/scenes/s6-object-cut.png", accent: "#9ec48a" },
  { slug: "neon-forge", number: "08", title: "Neon Forge", family: "Techno grid", note: "A chrome shard hovers over a charged grid.", preview: "/uploads/1/hooks/scenes/s7-chrome-cut.png", accent: "#3df0ff" },
  { slug: "macro-optics", number: "09", title: "Macro Optics", family: "Product macro", note: "A lens crops the frame and light sweeps across it.", preview: "/uploads/1/hooks/casts/macro-optics.mp4", accent: "#e8a24a" },
  { slug: "liquid-word", number: "10", title: "Liquid Word", family: "3D typography", note: "The brand is the object, poured in chrome.", preview: "/uploads/1/hooks/casts/liquid-word.mp4", accent: "#c7d0ff" },
  { slug: "orbit-data", number: "11", title: "Orbit Data", family: "Data theatre", note: "A quiet planet anchors a wall of numbers.", preview: "/uploads/1/hooks/scenes/s10-globe-cut.png", accent: "#4a90ff" },
  { slug: "atelier-hand", number: "12", title: "Atelier", family: "Editorial fashion", note: "A hand offers the object before the model.", preview: "/uploads/1/hooks/casts/atelier-hand.mp4", accent: "#d8b48a" },
  { slug: "fold-horizon", number: "13", title: "Fold Horizon", family: "Parallax narrative", note: "The landscape folds around a human scale.", preview: "/uploads/1/hooks/casts/fold-horizon.mp4", accent: "#9cc3e0" },
];

function Media({ src, className = "", scrubRef, poster }: { src: string; className?: string; scrubRef?: React.RefObject<HTMLVideoElement | null>; poster?: string }) {
  if (src.endsWith(".mp4")) {
    return <video ref={scrubRef} className={className} src={src} poster={poster} autoPlay={!scrubRef} muted loop={!scrubRef} playsInline preload={scrubRef ? "auto" : "metadata"} />;
  }
  return <img className={className} src={src} alt="" />;
}

function LabMark({ light = true }: { light?: boolean }) {
  return (
    <Link href="/visual-hooks" className={`vh-mark ${light ? "is-light" : ""}`}>
      <span>CR</span><b>Visual Hooks Lab</b>
    </Link>
  );
}

function SceneHeader({ brand, links, cta }: { brand: string; links: string[]; cta: string }) {
  return (
    <header className="vh-site-head">
      <Link href="/visual-hooks" className="vh-brand">{brand}</Link>
      <nav className="vh-site-nav">{links.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l}</a>)}</nav>
      <a href="#" onClick={(e) => e.preventDefault()} className="vh-site-cta">{cta}</a>
    </header>
  );
}

function Prototype({ scene }: { scene: Scene }) {
  const root = useRef<HTMLDivElement>(null);
  const scrub = useRef<HTMLVideoElement>(null);
  const scrub2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let raf = 0;
    // локальный 0→1 прогресс акта внутри окна [a,b] глобального скролла
    const seg = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, node.offsetHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, -rect.top / travel));
      node.style.setProperty("--p", value.toFixed(4));
      // три акта: каждый со своим локальным прогрессом для choreography
      const a1 = seg(value, 0, 0.36), a2 = seg(value, 0.34, 0.68), a3 = seg(value, 0.66, 1);
      node.style.setProperty("--a1", a1.toFixed(4));
      node.style.setProperty("--a2", a2.toFixed(4));
      node.style.setProperty("--a3", a3.toFixed(4));
      // gaze-сцены рулятся курсором (см. pointer), а не скроллом
      if (scrub.current?.duration && !scene.slug.startsWith("track-")) scrub.current.currentTime = value * scrub.current.duration;
      // второй клип (сплайс) скраббится по третьему акту — финальный reveal
      if (scrub2.current?.duration) scrub2.current.currentTime = a3 * scrub2.current.duration;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scene.slug]);

  const pointer = (event: React.PointerEvent<HTMLDivElement>) => {
    // проценты считаем относительно ВЬЮПОРТА (сцена sticky на весь экран),
    // а не всей высоты .vh-prototype (240vh) — иначе --my сжат и reveal/маска уезжают.
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
    event.currentTarget.style.setProperty("--rx", `${((y - 50) / 50) * -5}deg`);
    event.currentTarget.style.setProperty("--ry", `${((x - 50) / 50) * 7}deg`);
    // gaze-сцены: курсор X → currentTime (голова «следит» за мышью)
    if (scrub.current?.duration && scene.slug.startsWith("track-")) {
      scrub.current.currentTime = Math.min(1, Math.max(0, x / 100)) * scrub.current.duration;
    }
  };

  return (
    <main ref={root} className={`vh-prototype vh-${scene.slug}${/^(track|rev)-/.test(scene.slug) ? " vh-static" : ""}`} onPointerMove={pointer}>
      <section className="vh-stage">
        {scene.slug === "bloom" && <Bloom scrub={scrub} scrub2={scrub2} />}
        {scene.slug === "held-world" && <HeldWorld scrub={scrub} scrub2={scrub2} />}
        {scene.slug === "monolith" && <Monolith scrub={scrub} scrub2={scrub2} />}
        {scene.slug === "planet-vigil" && <PlanetVigil scrub={scrub} scrub2={scrub2} />}
        {scene.slug === "ascension" && <Ascension scrub={scrub} scrub2={scrub2} />}
        {scene.slug === "rev-neura" && <RevNeura />}
        {scene.slug === "rev-mythic" && <RevMythic />}
        {scene.slug === "rev-imperial" && <RevImperial />}
        {scene.slug === "track-portfolio" && <TrackPortfolio scrub={scrub} />}
        {scene.slug === "track-sentry" && <TrackSentry scrub={scrub} />}
        {scene.slug === "track-neon" && <TrackNeon scrub={scrub} />}
        {scene.slug === "living-object" && <LivingObject scrub={scrub} />}
        {scene.slug === "cloud-step" && <CloudStep />}
        {scene.slug === "strata" && <Strata />}
        {scene.slug === "reverie" && <Reverie />}
        {scene.slug === "vanguard" && <Vanguard />}
        {scene.slug === "aether" && <Aether />}
        {scene.slug === "botanica" && <Botanica />}
        {scene.slug === "neon-forge" && <NeonForge />}
        {scene.slug === "macro-optics" && <MacroOptics />}
        {scene.slug === "liquid-word" && <LiquidWord />}
        {scene.slug === "orbit-data" && <OrbitData />}
        {scene.slug === "atelier-hand" && <AtelierHand />}
        {scene.slug === "fold-horizon" && <FoldHorizon />}
      </section>
    </main>
  );
}

function TrackPortfolio({ scrub }: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas tp-canvas">
      <span className="tp-ghost">VISUALS</span>
      <Media src="/uploads/1/hooks/scenes/gaze-face-vid.mp4" poster="/uploads/1/hooks/scenes/gaze-face-poster.jpg" className="tp-film" scrubRef={scrub} />
      <div className="tp-wash" />
      <header className="tp-head">
        <Link href="/visual-hooks" className="tp-brand">✳ STUDIO X</Link>
        <nav className="tp-nav"><a href="#" onClick={stop}>Work</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <div className="tp-copy">
        <h1>I build compelling<br />visual stories & motion<br />that make ideas <em>shine.</em></h1>
        <a href="#" onClick={stop} className="tp-cta">Start a project <span>↗</span></a>
      </div>
      <div className="tp-scroll"><span>Move your cursor — it follows</span> ↔</div>
    </div>
  );
}

function TrackSentry({ scrub }: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas ts-canvas">
      <Media src="/uploads/1/hooks/scenes/gaze-char-vid.mp4" poster="/uploads/1/hooks/scenes/gaze-char-poster.jpg" className="ts-film" scrubRef={scrub} />
      <div className="ts-scan" />
      <header className="ts-head">
        <Link href="/visual-hooks" className="ts-brand">◎ SENTRY</Link>
        <nav className="ts-nav"><a href="#" onClick={stop}>System</a><a href="#" onClick={stop}>Watch</a><a href="#" onClick={stop}>Access</a></nav>
      </header>
      <h1 className="ts-h1">IT SEES<br /><em>everything.</em></h1>
      <div className="ts-data"><span>TRACKING</span><b>ACTIVE</b><span>SUBJECT</span><b>YOU</b></div>
    </div>
  );
}

function TrackNeon({ scrub }: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas tn-canvas">
      <div className="tn-grid" />
      <Media src="/uploads/1/hooks/scenes/neon-obj-vid.mp4" poster="/uploads/1/hooks/scenes/neon-obj-poster.jpg" className="tn-film" scrubRef={scrub} />
      <header className="tn-head">
        <Link href="/visual-hooks" className="tn-brand">◇ NEON·LOGIC</Link>
        <nav className="tn-nav"><a href="#" onClick={stop}>Product</a><a href="#" onClick={stop}>Docs</a><a href="#" onClick={stop}>Login</a></nav>
      </header>
      <h1 className="tn-h1">LOGIC<br /><em>in motion.</em></h1>
      <div className="tn-data"><span>ROTATION</span><b>SCROLL-LINKED</b></div>
    </div>
  );
}

function RevNeura() {
  return (
    <div className="vh-canvas rv-canvas vh-rev-neura">
      <img className="rv-base" src="/uploads/1/hooks/scenes/rev-face-a.png" alt="" />
      <img className="rv-reveal" src="/uploads/1/hooks/scenes/rev-face-b.png" alt="" />
      <div className="rv-lens" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">◈ NEURA</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Scan</a><a href="#" onClick={stop}>Research</a><a href="#" onClick={stop}>Access</a></nav>
      </header>
      <h1 className="rv-h1">SEE<br /><em>BENEATH.</em></h1>
      <div className="rv-hint"><span>Move across the face — reveal the machine within.</span></div>
    </div>
  );
}

function RevMythic() {
  return (
    <div className="vh-canvas rv-canvas vh-rev-mythic">
      <img className="rv-base" src="/uploads/1/hooks/scenes/rev-land-a.png" alt="" />
      <img className="rv-reveal" src="/uploads/1/hooks/scenes/rev-land-b.png" alt="" />
      <div className="rv-lens" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">❋ MYTHIC</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Worlds</a><a href="#" onClick={stop}>Field</a><a href="#" onClick={stop}>Enter</a></nav>
      </header>
      <h1 className="rv-h1">IT COMES<br /><em>alive at night.</em></h1>
      <div className="rv-hint"><span>Wander the cursor — wake the bioluminescent world.</span></div>
    </div>
  );
}

function RevImperial() {
  return (
    <div className="vh-canvas rv-canvas vh-rev-imperial">
      <img className="rv-base" src="/uploads/1/hooks/scenes/rev-map-a.png" alt="" />
      <img className="rv-reveal" src="/uploads/1/hooks/scenes/rev-map-b.png" alt="" />
      <div className="rv-lens" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">▦ IMPERIAL</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Network</a><a href="#" onClick={stop}>Servers</a><a href="#" onClick={stop}>Pricing</a></nav>
      </header>
      <h1 className="rv-h1">MAP THE<br /><em>INVISIBLE.</em></h1>
      <div className="rv-hint"><span>Trace the globe — light up the private network.</span></div>
    </div>
  );
}

function HeldWorld({ scrub, scrub2 }: { scrub: React.RefObject<HTMLVideoElement | null>; scrub2: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas hw-canvas">
      <Media src="/uploads/1/hooks/scenes/held-world-vid.mp4" poster="/uploads/1/hooks/scenes/held-world-poster.jpg" className="hw-film" scrubRef={scrub} />
      <Media src="/uploads/1/hooks/scenes/held-reveal-vid.mp4" poster="/uploads/1/hooks/scenes/held-reveal.png" className="hw-splice" scrubRef={scrub2} />
      <div className="hw-wash" />
      <div className="hw-motes" aria-hidden>{Array.from({ length: 8 }).map((_, i) => <span key={i} className={`hw-mote m${i + 1}`} />)}</div>
      <header className="hw-head">
        <Link href="/visual-hooks" className="hw-brand">ORBE°</Link>
        <nav className="hw-nav"><a href="#" onClick={stop}>World</a><a href="#" onClick={stop}>Vision</a><a href="#" onClick={stop}>Journal</a></nav>
      </header>
      <div className="hw-copy hw-act">
        <span className="hw-eyebrow">Terraforming futures</span>
        <h1>The world,<br /><em>in your hands.</em></h1>
        <p>Living miniature ecosystems. Proof a planet can begin inside a single palm.</p>
      </div>
      <div className="hw-manifesto hw-act"><h2><span>IT BEGINS</span> <em>small.</em></h2></div>
      <div className="hw-finale hw-act">
        <span className="hw-fin-line">Hold the future steady.</span>
        <a href="#" onClick={stop} className="hw-cta">Begin terraforming <i>↗</i></a>
      </div>
      <div className="hw-rail" aria-hidden><i /></div>
    </div>
  );
}

function Monolith({ scrub, scrub2 }: { scrub: React.RefObject<HTMLVideoElement | null>; scrub2: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas mn-canvas">
      <Media src="/uploads/1/hooks/scenes/monolith-vid.mp4" poster="/uploads/1/hooks/scenes/monolith-poster.jpg" className="mn-film" scrubRef={scrub} />
      <Media src="/uploads/1/hooks/scenes/monolith-reveal-vid.mp4" poster="/uploads/1/hooks/scenes/monolith-reveal.png" className="mn-splice" scrubRef={scrub2} />
      <div className="mn-wash" />
      <div className="mn-embers" aria-hidden>{Array.from({ length: 10 }).map((_, i) => <span key={i} className={`mn-ember e${i + 1}`} />)}</div>
      <header className="mn-head">
        <span className="mn-side">Est. MMXXVI</span>
        <Link href="/visual-hooks" className="mn-brand">OBELISK</Link>
        <span className="mn-side mn-r">Nevada, USA</span>
      </header>
      <h1 className="mn-h1 mn-act">IN SILENCE<br /><em>IT REMEMBERS</em></h1>
      <div className="mn-foot mn-act">A monument to everything that refuses to be explained.</div>
      <div className="mn-manifesto mn-act"><h2>IT PREDATES <em>us.</em></h2></div>
      <div className="mn-finale mn-act">
        <span className="mn-fin-line">Come stand before it.</span>
        <a href="#" onClick={stop} className="mn-cta">Visit the site <i>↗</i></a>
      </div>
      <div className="mn-rail" aria-hidden><i /></div>
    </div>
  );
}

function PlanetVigil({ scrub, scrub2 }: { scrub: React.RefObject<HTMLVideoElement | null>; scrub2: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas pv-canvas">
      <Media src="/uploads/1/hooks/scenes/planet-vig-vid.mp4" poster="/uploads/1/hooks/scenes/planet-vig-poster.jpg" className="pv-film" scrubRef={scrub} />
      <Media src="/uploads/1/hooks/scenes/planet-reveal-vid.mp4" poster="/uploads/1/hooks/scenes/planet-reveal.png" className="pv-splice" scrubRef={scrub2} />
      <div className="pv-wash" />
      <div className="pv-dust" aria-hidden>{Array.from({ length: 9 }).map((_, i) => <span key={i} className={`pv-speck s${i + 1}`} />)}</div>
      <header className="pv-head">
        <Link href="/visual-hooks" className="pv-brand">◐ VIGIL</Link>
        <nav className="pv-nav"><a href="#" onClick={stop}>Observe</a><a href="#" onClick={stop}>Missions</a><a href="#" onClick={stop}>Log</a></nav>
      </header>
      <h1 className="pv-h1 pv-act">WE ARE<br />SMALL.<br /><em>KEEP WATCHING.</em></h1>
      <div className="pv-coord pv-act">Vigil 001. 04:12 to planetrise.</div>
      <div className="pv-manifesto pv-act"><h2>IT <em>rises.</em></h2></div>
      <div className="pv-finale pv-act">
        <span className="pv-fin-line">Keep the vigil.</span>
        <a href="#" onClick={stop} className="pv-cta">Join the watch <i>↗</i></a>
      </div>
      <div className="pv-rail" aria-hidden><i /></div>
    </div>
  );
}

function Ascension({ scrub, scrub2 }: { scrub: React.RefObject<HTMLVideoElement | null>; scrub2: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas as-canvas">
      <Media src="/uploads/1/hooks/scenes/ascension-vid.mp4" poster="/uploads/1/hooks/scenes/ascension-poster.jpg" className="as-film" scrubRef={scrub} />
      <Media src="/uploads/1/hooks/scenes/ascension-reveal-vid.mp4" poster="/uploads/1/hooks/scenes/ascension-reveal.png" className="as-splice" scrubRef={scrub2} />
      <div className="as-wash" />
      <div className="as-rays" aria-hidden />
      <div className="as-motes" aria-hidden>{Array.from({ length: 9 }).map((_, i) => <span key={i} className={`as-mote am${i + 1}`} />)}</div>
      <header className="as-head">
        <span className="as-side">Since 2019</span>
        <Link href="/visual-hooks" className="as-brand">ASCENSION</Link>
        <nav className="as-nav"><a href="#" onClick={stop}>Practice</a><a href="#" onClick={stop}>Retreats</a></nav>
      </header>
      <div className="as-copy as-act">
        <h1>Become<br /><em>weightless.</em></h1>
        <p>Guided rituals to dissolve the noise and rise into stillness.</p>
      </div>
      <div className="as-manifesto as-act"><h2>LET <em>go.</em></h2></div>
      <div className="as-finale as-act">
        <span className="as-fin-line">Rise into stillness.</span>
        <a href="#" onClick={stop} className="as-cta">Begin the ascent <i>↗</i></a>
      </div>
      <div className="as-rail" aria-hidden><i /></div>
    </div>
  );
}

function Bloom({ scrub, scrub2 }: { scrub: React.RefObject<HTMLVideoElement | null>; scrub2: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas bl-canvas">
      {/* фон: основной живой кадр (скрабится весь скролл) */}
      <Media src="/uploads/1/hooks/scenes/bloom-vid.mp4" poster="/uploads/1/hooks/scenes/bloom-poster.jpg" className="bl-film" scrubRef={scrub} />
      {/* сплайс: макро-глаз распускается в финальном акте (скрабится по --a3) */}
      <Media src="/uploads/1/hooks/scenes/bloom-eye-vid.mp4" poster="/uploads/1/hooks/scenes/bloom-eye.png" className="bl-eye" scrubRef={scrub2} />
      <div className="bl-vignette" />
      {/* дрейфующие лепестки — «цветение» */}
      <div className="bl-petals" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className={`bl-petal p${i + 1}`} />)}
      </div>
      {/* передний слой — ветка сакуры, паралакс по курсору */}
      <img className="bl-fg" src="/uploads/1/hooks/scenes/bloom-fg.png" alt="" aria-hidden />

      <header className="bl-head">
        <Link href="/visual-hooks" className="bl-brand">❀ Bloom</Link>
        <nav className="bl-nav"><a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop}>Collections</a><a href="#" onClick={stop}>Rituals</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>

      {/* АКТ 1 — интро */}
      <div className="bl-card bl-act">
        <span className="bl-eyebrow">Cyber-botanical systems</span>
        <h1>Silicon, grown<br />like a <em>garden.</em></h1>
        <p>We engineer living circuitry that heals an ecosystem while it grows inside it.</p>
      </div>

      {/* АКТ 2 — манифест + характеристики */}
      <div className="bl-manifesto bl-act">
        <h2><span>IT IS</span> <em>alive.</em></h2>
        <div className="bl-chips"><b>Self-healing</b><b>Bio-luminescent</b><b>Carbon-negative</b></div>
      </div>

      {/* АКТ 3 — reveal + CTA */}
      <div className="bl-finale bl-act">
        <span className="bl-fin-line">Watch it open.</span>
        <a href="#" onClick={stop} className="bl-cta">Enter the atelier <i>↗</i></a>
      </div>

      <div className="bl-rail" aria-hidden><i /></div>
    </div>
  );
}

function LivingObject({ scrub }: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="vh-canvas">
      <Media src="/uploads/1/hooks/ovoid-hero.mp4" poster="/uploads/1/hooks/ovoid-hero-poster.jpg" className="lo-film" scrubRef={scrub} />
      <div className="lo-glow" />
      <div className="lo-wash" />
      <header className="lo-head">
        <Link href="/visual-hooks" className="lo-brand">AURA</Link>
        <div className="lo-meta"><span>Objects</span><i /><span>New York — 20:41</span></div>
        <a href="#" onClick={stop} className="lo-reserve">Reserve ↗</a>
      </header>
      <div className="lo-copy">
        <span className="lo-eyebrow">N°01 — Sealed object</span>
        <h1>It wakes<br /><em>when you do.</em></h1>
      </div>
    </div>
  );
}

const stop = (e: React.MouseEvent) => e.preventDefault();

function CloudStep() {
  return (
    <div className="vh-canvas cs-canvas">
      <Media src="/uploads/1/hooks/scenes/cloud-sky-vid.mp4" poster="/uploads/1/hooks/scenes/s1-sky.png" className="cs-sky" />
      <header className="cs-head">
        <Link href="/visual-hooks" className="cs-brand">AFTERSHOCK</Link>
        <nav><a href="#" onClick={stop}>New</a><a href="#" onClick={stop}>Men</a><a href="#" onClick={stop}>Women</a><a href="#" onClick={stop}>Lab</a></nav>
        <div className="cs-actions"><a href="#" onClick={stop}>Search</a><a href="#" onClick={stop} className="cs-bag">Bag · 2</a></div>
      </header>
      <h1 className="cs-h1">IN THE<br />CLOUDS</h1>
      <img className="cs-shoe" src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" />
      <div className="cs-card"><img src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" /><div className="cs-card-info"><b>Nimbus Hi</b><span>$240</span></div><a href="#" onClick={stop} className="cs-add">Add to bag</a></div>
      <div className="cs-tag">Statement men’s kick — cushioned for altitude.</div>
    </div>
  );
}

function Strata() {
  return (
    <div className="vh-canvas str-canvas">
      <Media src="/uploads/1/hooks/scenes/strata-vid.mp4" poster="/uploads/1/hooks/scenes/s2-strata.png" className="str-bg" />
      <header className="str-head">
        <Link href="/visual-hooks" className="str-brand">easylog</Link>
        <nav className="str-nav"><a href="#" onClick={stop}>Platform</a><a href="#" onClick={stop}>Method</a><a href="#" onClick={stop}>Cases</a><a href="#" onClick={stop}>Journal</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <h1 className="str-h1"><em>Every layer</em><br />tells a story.</h1>
      <div className="str-foot">
        <p>Turn forgotten records, scattered logs and silent activity into something readable.</p>
        <div className="str-index"><span>01</span><i>/</i><span>04</span></div>
      </div>
      <div className="str-lens"><span>SCAN</span></div>
    </div>
  );
}

function Reverie() {
  return (
    <div className="vh-canvas rev-canvas">
      <img className="rev-forest" src="/uploads/1/hooks/scenes/s3-forest.png" alt="" />
      <Media src="/uploads/1/hooks/scenes/reverie-world-vid.mp4" className="rev-world" />
      <div className="rev-vignette" />
      <header className="rev-head">
        <span className="rev-side">Worlds</span>
        <Link href="/visual-hooks" className="rev-brand">REVERIE</Link>
        <a href="#" onClick={stop} className="rev-side rev-enter">Enter ↵</a>
      </header>
      <h1 className="rev-h1">FALL <em>INTO</em><br />REVERIE</h1>
      <div className="rev-hint"><span>Scroll to cross over ↓</span></div>
    </div>
  );
}

function Vanguard() {
  return (
    <div className="vh-canvas van-canvas">
      <Media src="/uploads/1/hooks/scenes/vanguard-vid.mp4" className="van-bg" />
      <header className="van-head">
        <Link href="/visual-hooks" className="van-brand">VANGUARD</Link>
        <nav><a href="#" onClick={stop}>Work</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Culture</a><a href="#" onClick={stop}>Careers</a></nav>
        <a href="#" onClick={stop} className="van-cta">Get in touch</a>
      </header>
      <div className="van-ticker"><span>WORLD-CLASS DIGITAL COLLECTIVE — BRANDING · MOTION · PRODUCT — WORLD-CLASS DIGITAL COLLECTIVE — BRANDING · MOTION · PRODUCT — </span></div>
      <h1 className="van-h1">DESIGN.<br />DISRUPT.<br />CONQUER.</h1>
      <p className="van-sub">World-class digital collective. We build fierce brand identities that lead.</p>
      <div className="van-stats"><div><b>250+</b><span>Brands transformed</span></div><div><b>95%</b><span>Client retention</span></div><div><b>10+</b><span>Years in the arena</span></div></div>
    </div>
  );
}

function Aether() {
  return (
    <div className="vh-canvas aet-canvas">
      <Media src="/uploads/1/hooks/scenes/aether-world-vid.mp4" poster="/uploads/1/hooks/scenes/s5b-world.png" className="aet-bg" />
      <header className="aet-head">
        <Link href="/visual-hooks" className="aet-brand">Aether Lane</Link>
        <nav><a href="#" onClick={stop}>Estates</a><a href="#" onClick={stop}>Journal</a><a href="#" onClick={stop}>Enquire</a></nav>
      </header>
      <div className="aet-copy">
        <h1>Space, refined<br />beyond the footprint.</h1>
        <a href="#" onClick={stop} className="aet-glass">Explore estates ↗</a>
      </div>
      <span className="aet-corner aet-bl">Est. 2019</span>
      <span className="aet-corner aet-br">Selected residences — worldwide</span>
    </div>
  );
}

function Botanica() {
  return (
    <div className="vh-canvas bot-canvas">
      <header className="bot-head">
        <Link href="/visual-hooks" className="bot-brand">botanica</Link>
        <nav><a href="#" onClick={stop}>Systems</a><a href="#" onClick={stop}>Science</a><a href="#" onClick={stop}>Journal</a></nav>
        <a href="#" onClick={stop} className="bot-cta">Field kit</a>
      </header>
      <h1 className="bot-h1">GROW<br />WHAT <em>LISTENS</em></h1>
      <Media src="/uploads/1/hooks/scenes/bot-vid.mp4" poster="/uploads/1/hooks/scenes/bot-paper.png" className="bot-bg" />
      <ol className="bot-list"><li><b>01</b><span>Quiet systems that read the room</span></li><li><b>02</b><span>Light that follows your attention</span></li></ol>
      <span className="bot-vlabel">Living technology — N°06</span>
    </div>
  );
}

function NeonForge() {
  return (
    <div className="vh-canvas nf-canvas">
      <Media src="/uploads/1/hooks/scenes/neon-vid.mp4" poster="/uploads/1/hooks/scenes/s7-chrome.png" className="nf-bg" />
      <div className="nf-scan" />
      <div className="nf-bracket nf-tl" /><div className="nf-bracket nf-tr" /><div className="nf-bracket nf-bl" /><div className="nf-bracket nf-br" />
      <header className="nf-head">
        <Link href="/visual-hooks" className="nf-brand">NEON·FORGE</Link>
        <div className="nf-status"><i />System online — node 0x7F</div>
        <a href="#" onClick={stop} className="nf-cta">Initialize</a>
      </header>
      <div className="nf-metrics"><div><span>TEMP</span><b>1480°</b></div><div><span>FLOW</span><b>0.94</b></div><div><span>SEED</span><b>07</b></div></div>
      <h1 className="nf-h1">FORGE<br />THE UNREAL</h1>
      <div className="nf-data"><span>ALLOY</span><b>CR-07</b><span>STATE</span><b>FLUX</b></div>
    </div>
  );
}

function MacroOptics() {
  return (
    <div className="vh-canvas mo-canvas">
      <div className="mo-sweep" />
      <header className="mo-head">
        <Link href="/visual-hooks" className="mo-brand">OPTIK°</Link>
        <div className="mo-actions"><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Stores</a><a href="#" onClick={stop} className="mo-bag">Bag · 1</a></div>
      </header>
      <Media src="/uploads/1/hooks/scenes/macro-face-vid.mp4" poster="/uploads/1/hooks/scenes/s8b-face.png" className="mo-face" />
      <h1 className="mo-h1">SEE<br /><em>SHARPER</em></h1>
      <div className="mo-card"><div className="mo-card-info"><b>Aura Wrap</b><span>UV400 · Titanium · Ed. 07</span></div><div className="mo-price">$320</div><a href="#" onClick={stop} className="mo-add">Add to bag</a></div>
    </div>
  );
}

function LiquidWord() {
  return (
    <div className="vh-canvas lw-canvas">
      <Media src="/uploads/1/hooks/scenes/liquid-vid.mp4" className="lw-bg" />
      <header className="lw-head">
        <Link href="/visual-hooks" className="lw-brand">Flux®</Link>
        <nav><a href="#" onClick={stop}>Index</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <p className="lw-tag">A design practice for brands that refuse to stay still.</p>
      <span className="lw-corner lw-cl">©2026 — Design studio</span>
      <span className="lw-corner lw-cr">Selected work ↓</span>
    </div>
  );
}

function OrbitData() {
  return (
    <div className="vh-canvas od-canvas">
      <header className="od-head">
        <Link href="/visual-hooks" className="od-brand">◐ Steadyflow</Link>
        <nav><a href="#" onClick={stop}>Product</a><a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Pricing</a><a href="#" onClick={stop}>Results</a></nav>
        <div className="od-actions"><a href="#" onClick={stop} className="od-login">Log in</a><a href="#" onClick={stop} className="od-cta">Get started</a></div>
      </header>
      <Media src="/uploads/1/hooks/scenes/orbit-vid.mp4" poster="/uploads/1/hooks/scenes/orbit-globe.png" className="od-bg" />
      <div className="od-hero"><b>84,000+</b><span>Habits completed this quarter</span><div className="od-badges"><a href="#" onClick={stop}>▲ App Store</a><a href="#" onClick={stop}>▶ Google Play</a></div></div>
      <div className="od-stats"><div><b>93%</b><span>Feel more consistent</span></div><div><b>38</b><span>Habits built / user</span></div><div><b>41+</b><span>Growing communities</span></div></div>
    </div>
  );
}

function AtelierHand() {
  return (
    <div className="vh-canvas ah-canvas">
      <Media src="/uploads/1/hooks/scenes/atelier-face-vid.mp4" poster="/uploads/1/hooks/scenes/s11b-face.png" className="ah-bg" />
      <header className="ah-head">
        <nav className="ah-navl"><a href="#" onClick={stop}>Maison</a><a href="#" onClick={stop}>Objects</a></nav>
        <Link href="/visual-hooks" className="ah-brand">OYLA</Link>
        <nav className="ah-navr"><a href="#" onClick={stop}>Journal</a><a href="#" onClick={stop}>Enquire</a></nav>
      </header>
      <h1 className="ah-h1"><em>Made</em><br />by hand.</h1>
      <div className="ah-tag"><b>100% handmade</b><span>Each object carries the mark of the hand that shaped it.</span></div>
      <span className="ah-num">N°01</span>
      <span className="ah-date">Spring — MMXXVI</span>
    </div>
  );
}

function FoldHorizon() {
  return (
    <div className="vh-canvas fh-canvas">
      <Media src="/uploads/1/hooks/scenes/fold-vid2.mp4" poster="/uploads/1/hooks/scenes/s12b-fold.png" className="fh-bg" />
      <div className="fh-wash" />
      <header className="fh-head">
        <div className="fh-ctx"><b>Expedition °10</b><span>68° 21′ N — Field log, day 14</span></div>
        <nav><a href="#" onClick={stop}>Index</a><a href="#" onClick={stop}>Menu</a></nav>
      </header>
      <span className="fh-chapter">Chapter III — The Fold</span>
      <h1 className="fh-h1">THE HORIZON<br />DOESN’T END.<br /><em>IT FOLDS.</em></h1>
      <div className="fh-coord">67° 21′ 04″ N<br />18° 37′ 12″ W</div>
    </div>
  );
}

function Gallery() {
  const [filter, setFilter] = useState("All");
  const families = useMemo(() => ["All", ...new Set(scenes.map((scene) => scene.family))], []);
  const visible = filter === "All" ? scenes : scenes.filter((scene) => scene.family === filter);
  const cover = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const v = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)));
      cover.current?.style.setProperty("--eye", v.toFixed(3));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <main className="vh-gallery">
      <section ref={cover} className="vh-cover">
        <div className="cv-grain" />
        <header className="cv-head">
          <Link href="/visual-hooks" className="cv-mark"><span>CR</span>Visual Hooks Lab</Link>
          <nav><a href="#experiments">Experiments</a><Link href="/visual-hooks/animated">Animated sites</Link><Link href="/visual-hooks/sites">Business sites</Link><a href="#manifesto">Manifesto</a><span>{scenes.length} first screens</span></nav>
        </header>
        <p className="cv-tag">SOME FIRST SCREENS FORGET TO BLINK<br />ONLY MOTION REMEMBERS WHAT THEY PROMISED</p>
        <span className="cv-star a">✦</span><span className="cv-star b">✦</span><span className="cv-star c">✦</span>
        <h1 className="cv-title">VIS<em>UAL</em></h1>
        <div className="cv-redpanel"><div className="cv-grain" /></div>
        <div className="cv-statue">
          <img className="cv-red cv-rl" src="/uploads/1/hooks/scenes/stat-closed-cut.png" alt="" />
          <img className="cv-red cv-rr" src="/uploads/1/hooks/scenes/stat-open-cut.png" alt="" />
          <img className="cv-closed" src="/uploads/1/hooks/scenes/stat-closed-cut.png" alt="" />
          <img className="cv-open" src="/uploads/1/hooks/scenes/stat-open-cut.png" alt="" />
        </div>
        <div className="cv-side cv-sl"><b>A MOTION<br />STUDY</b><span>Thirteen first screens<br />built to make you look.</span></div>
        <div className="cv-side cv-sr"><span>CURATED BY</span><b>CREATLY<br />STUDIO</b><i>@creatly</i></div>
        <h2 className="cv-sub">HOOKS</h2>
        <a className="cv-save" href="#experiments"><em>✦</em> SCROLL TO SEE</a>
      </section>
      <section className="vh-experiments" id="experiments">
        <div className="vh-filter">{families.map((family) => <button key={family} onClick={() => setFilter(family)} className={filter === family ? "is-active" : ""}>{family}</button>)}</div>
        <div className="vh-grid">
          {visible.map((scene) => (
            <Link href={`/visual-hooks/${scene.slug}`} className="vh-card" key={scene.slug} style={{ "--accent": scene.accent } as React.CSSProperties}>
              <div className="vh-card-media"><Media src={scene.cast ?? scene.preview} poster={scene.cast ? scene.preview : undefined} /><span className="vh-card-play">OPEN ↗</span><i /></div>
              <div className="vh-card-meta"><span>{scene.number}</span><div><h2>{scene.title}</h2><p>{scene.note}</p></div><b>{scene.family}</b></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="vh-sites-band">
        <div className="vh-sites-band-head">
          <div><h2>Animated <em>3D-parallax</em> sites.</h2><p>Twenty-three full sites, each from one art-directed idea — every element on its own layer, moving with scroll and cursor.</p></div>
          <Link href="/visual-hooks/animated" className="vh-sites-band-cta">See all 23 animated sites ↗</Link>
        </div>
        <div className="vh-sites-band-grid">
          {[["freestyle", "SESSION", "freestyle/g1.jpg"], ["folkmusic", "ЗОРЯ", "folkmusic/g1.jpg"], ["jpclub", "YORU 夜", "jpclub/g1.jpg"], ["rockband", "FERAL", "rockband/g1.jpg"], ["photographer", "NORTHLIGHT", "photographer/g1.jpg"], ["porsche", "PORSCHE", "porsche/g1.jpg"]].map(([slug, brand, img]) => (
            <Link key={slug} href={`/visual-hooks/${slug}`}><img loading="lazy" src={`/uploads/1/hooks/sites/anim/${img}`} alt="" /><b>{brand}</b></Link>
          ))}
        </div>
      </section>
      <section className="vh-sites-band">
        <div className="vh-sites-band-head">
          <div><h2>A site for <em>every business.</em></h2><p>Fifty full concept sites, one per niche — each built from a single art-directed idea, every one a live page.</p></div>
          <Link href="/visual-hooks/sites" className="vh-sites-band-cta">See all 50 sites ↗</Link>
        </div>
        <div className="vh-sites-band-grid">
          {[["phantom", "PHANTOM", "phantom.jpg"], ["horologe", "HOROLOGE", "horologe.jpg"], ["vessel", "VESSEL", "vessel.jpg"], ["forge", "FORGE", "forge-hero.jpg"], ["botanic", "BOTANIC", "botanic.jpg"], ["ink", "INK", "ink.jpg"]].map(([slug, brand, img]) => (
            <Link key={slug} href={`/visual-hooks/${slug}`}><img loading="lazy" src={`/uploads/1/hooks/sites/${img}`} alt="" /><b>{brand}</b></Link>
          ))}
        </div>
      </section>
      <footer id="manifesto"><b>CREATLY / VISUAL HOOKS LAB</b><span>Temporary media will be replaced through the Higgsfield pipeline.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

/* ================= Индивидуальные лендинги (каждый от ДНК своего hero) ================= */
type FootCol = { h: string; links: string[] };

function Reveal({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    // элемент в зоне показа? (getBoundingClientRect надёжнее IO для absolute/clip-path медиа)
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.94 && r.right > 0 && r.left < window.innerWidth;
    };
    const reveal = () => { if (done) return; done = true; setSeen(true); cleanup(); };
    const onScroll = () => { if (inView()) reveal(); };
    let io: IntersectionObserver | null = null;
    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) reveal(); }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
      io.observe(el);
    }
    // страховка: scroll/resize + первичная проверка (IO иногда не стреляет по absolute/clip-элементам)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (inView()) reveal();
    return cleanup;
  }, []);
  return <div ref={ref} className={`vh-rv ${className} ${seen ? "is-in" : ""}`}>{children}</div>;
}

function LandFoot({ brand, tagline, cols, legal }: { brand: string; tagline: string; cols: FootCol[]; legal: string }) {
  return (
    <footer className="l2-foot">
      <div className="l2-foot-top">
        <div className="l2-foot-brand"><b>{brand}</b><p>{tagline}</p></div>
        <div className="l2-foot-cols">{cols.map((c) => (<div key={c.h} className="l2-foot-col"><h4>{c.h}</h4>{c.links.map((l) => <a key={l} href="#" onClick={stop}>{l}</a>)}</div>))}</div>
      </div>
      <div className="l2-foot-legal"><span>{legal}</span><span>A Visual Hooks concept site</span></div>
    </footer>
  );
}

/* ---- Bloom: макро + cursor-reveal мёртвая/живая земля ---- */
function BloomLand() {
  return (
    <div className="vh-l2 l2-bloom">
      <section className="bl2-intro">
        <Reveal className="bl2-intro-in vh-rv--up">
          <span className="bl2-kick">Living material</span>
          <h2>We do not build the repair.<br /><em>We grow it.</em></h2>
          <p>Bloom is a colony, not a coating. Introduced as a thin living film, it takes root in dead ground and spends the next year bringing it back.</p>
        </Reveal>
      </section>

      <section className="bl2-reveal-sec">
        <ShaderReveal base="/uploads/1/hooks/land/bloom-dead.jpg" top="/uploads/1/hooks/land/bloom-alive.jpg" mode="mix" radius={0.24} className="bl2-cr">
          <div className="bl2-cr-labels"><b>Dead ground.</b><b className="alt">Living ground.</b></div>
          <span className="bl2-cr-hint">Move across the soil</span>
        </ShaderReveal>
      </section>

      <section className="bl2-macro">
        <Reveal className="bl2-macro-head vh-rv--up"><h3>Look closer. It is <em>working.</em></h3></Reveal>
        <div className="bl2-macro-grid">
          <Reveal className="bl2-mtile a vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro1.jpg" /><span>Bioluminescent veins carry signal and nutrient.</span></Reveal>
          <Reveal className="bl2-mtile b vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro2.jpg" /><span>Spores seed the next spread.</span></Reveal>
          <Reveal className="bl2-mtile c vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro3.jpg" /><span>Roots trace and break down what poisoned the soil.</span></Reveal>
        </div>
      </section>

      <section className="bl2-app">
        <Reveal className="bl2-app-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/land/bloom-app.jpg" alt="" /></Reveal>
        <Reveal className="bl2-app-copy vh-rv--up"><h3>It does not hide<br />the architecture.<br /><em>It becomes it.</em></h3><p>Grown across a facade or an interior, Bloom filters the air and gives the light back at night.</p></Reveal>
      </section>

      <section className="bl2-proof">
        <Reveal className="vh-rv--up"><blockquote>We seeded Bloom into a dead riverbank. Ten months later, the frogs came back.</blockquote><cite><b>Dr. Ines Caetano</b><span>Restoration lead, Tejo Delta Project</span></cite></Reveal>
      </section>

      <section className="bl2-cta">
        <Reveal className="vh-rv--up"><h2>Tell us about the ground<br />you want <em>back.</em></h2><a href="#" onClick={stop} className="bl2-btn">Start a project <i>↗</i></a></Reveal>
      </section>

      <LandFoot brand="Bloom" tagline="Living materials for a repairable planet." cols={[{ h: "Material", links: ["Science", "Strains", "Safety"] }, { h: "Work", links: ["Restoration", "Architecture", "Water"] }, { h: "Studio", links: ["About", "Journal", "Contact"] }]} legal="Bloom Biosystems, Lisbon." />
    </div>
  );
}

/* ---- ORBE: объект + zoom-in + круговой цикл + галерея эдишенов ---- */
function OrbeLand() {
  const eds = [
    { img: "/uploads/1/hooks/land/orbe-object.jpg", n: "The Origin", d: "Moss, fern, still water", p: "480 EUR" },
    { img: "/uploads/1/hooks/land/orbe-ed-dune.jpg", n: "The Dune", d: "Red desert, one succulent", p: "520 EUR" },
    { img: "/uploads/1/hooks/land/orbe-ed-coral.jpg", n: "The Reef", d: "Coral, shrimp, blue water", p: "560 EUR" },
    { img: "/uploads/1/hooks/land/orbe-ed-forest.jpg", n: "The Canopy", d: "Ferns, mist, a small fall", p: "590 EUR" },
  ];
  const loop = [{ h: "Light", p: "feeds the algae" }, { h: "Algae", p: "feeds the shrimp" }, { h: "Shrimp", p: "feed the microbes" }, { h: "Microbes", p: "clear the water" }];
  return (
    <div className="vh-l2 l2-orbe">
      <section className="or2-object">
        <Reveal className="or2-object-media vh-rv--zoom">
          <img loading="lazy" src="/uploads/1/hooks/land/orbe-object.jpg" alt="" />
          <span className="or2-tag t1">Hand-blown glass</span>
          <span className="or2-tag t2">Sealed once</span>
          <span className="or2-tag t3">Alive for years</span>
        </Reveal>
        <Reveal className="or2-object-copy vh-rv--up"><span className="or2-kick">The object</span><h2>A planet you can<br />hold in one <em>hand.</em></h2><p>Sealed, self-sustaining, and quietly getting on with being a world.</p></Reveal>
      </section>

      <section className="or2-zoom">
        <Reveal className="or2-zoom-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/land/orbe-interior.jpg" alt="" /></Reveal>
        <Reveal className="or2-zoom-copy vh-rv--up"><h3>Small enough to hold.<br /><em>Vast enough to fall into.</em></h3></Reveal>
      </section>

      <section className="or2-loop">
        <Reveal className="or2-loop-head vh-rv--up"><h3>Nothing in. Nothing out.<br /><em>A loop that holds itself.</em></h3></Reveal>
        <Reveal className="or2-loop-ring vh-rv--up">
          <div className="or2-ring">
            {loop.map((n, i) => (<div key={i} className={`or2-node n${i + 1}`}><b>{n.h}</b><span>{n.p}</span></div>))}
            <div className="or2-ring-core">Closed<br />loop</div>
          </div>
        </Reveal>
      </section>

      <section className="or2-eds">
        <Reveal className="or2-eds-head vh-rv--up"><h3>Four worlds, grown each season.</h3><p>Each ORBE is assembled and matured by hand. No two ever settle the same way.</p></Reveal>
        <div className="or2-eds-row">
          {eds.map((e) => (<Reveal key={e.n} className="or2-ed vh-rv--up"><div className="or2-ed-media"><ShaderImage src={e.img} /></div><div className="or2-ed-info"><b>{e.n}</b><span>{e.d}</span><i>{e.p}</i></div></Reveal>))}
        </div>
      </section>

      <section className="or2-cta">
        <Reveal className="vh-rv--up"><h2>Keep a world of <em>your own.</em></h2><p>A small run opens each season. Reserve before it closes.</p><a href="#" onClick={stop} className="or2-btn">Reserve your world <i>↗</i></a></Reveal>
      </section>

      <LandFoot brand="ORBE°" tagline="Sealed living worlds, grown by hand." cols={[{ h: "The object", links: ["Editions", "The science", "Care"] }, { h: "Buy", links: ["Reserve", "Gifting", "Shipping"] }, { h: "Studio", links: ["About", "Journal", "Contact"] }]} legal="ORBE Terraria, Reykjavik." />
    </div>
  );
}

/* ---- OBELISK: вертикальное кино-приближение, full-bleed, паломничество ---- */
function ObeliskLand() {
  const pilgrim = [
    { img: "/uploads/1/hooks/land/obelisk-wide.jpg", h: "Reserve", p: "Book a dusk window and receive the coordinates. Visits are free and timed." },
    { img: "/uploads/1/hooks/land/obe-aerial.jpg", h: "Drive", p: "Three hours from the nearest town. The road runs out before the stone does." },
    { img: "/uploads/1/hooks/scenes/monolith-poster.jpg", h: "Walk", p: "The last mile is on foot. Phones lose signal well before you arrive." },
    { img: "/uploads/1/hooks/land/obe-night.jpg", h: "Stay", p: "No tour, no gift shop. You are welcome until the stars come out." },
  ];
  return (
    <div className="vh-l2 l2-obelisk">
      <section className="ob2-approach">
        <Reveal className="ob2-approach-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/land/obelisk-wide.jpg" alt="" /></Reveal>
        <Reveal className="ob2-approach-copy vh-rv--up"><span>92 acres of protected Nevada desert</span><h2>You will drive a long way<br />for something with <em>no plaque.</em></h2></Reveal>
      </section>

      <section className="ob2-manifesto">
        <Reveal className="vh-rv--up"><h2>It was raised in silence<br />and left <em>uncredited</em> on purpose.</h2></Reveal>
      </section>

      <section className="ob2-night">
        <Reveal className="ob2-night-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/land/obe-night.jpg" alt="" /></Reveal>
        <div className="ob2-night-coord"><span>38.7621 N</span><span>116.9330 W</span><span>Elev. 1,684 m</span></div>
      </section>

      <section className="ob2-pilgrim">
        <Reveal className="ob2-pilgrim-head vh-rv--up"><h3>How a visit unfolds</h3></Reveal>
        <div className="ob2-pilgrim-list">
          {pilgrim.map((s, i) => (<Reveal key={s.h} className="ob2-step vh-rv--up"><div className="ob2-step-media"><img loading="lazy" src={s.img} alt="" /></div><div className="ob2-step-copy"><span>{String(i + 1).padStart(2, "0")}</span><b>{s.h}</b><p>{s.p}</p></div></Reveal>))}
        </div>
      </section>

      <section className="ob2-cta">
        <img className="ob2-cta-bg" src="/uploads/1/hooks/scenes/monolith-reveal.png" alt="" />
        <Reveal className="ob2-cta-in vh-rv--up"><h2>Come stand <em>before it.</em></h2><p>Reserve a dusk window for the coming season.</p><a href="#" onClick={stop} className="ob2-btn">Reserve a visit <i>↗</i></a></Reveal>
      </section>

      <LandFoot brand="OBELISK" tagline="A monument, a desert, and a long quiet walk." cols={[{ h: "Visit", links: ["Reserve", "Getting there", "Seasons"] }, { h: "Foundation", links: ["The land", "Patrons", "Stewardship"] }, { h: "More", links: ["Story", "Press", "Contact"] }]} legal="The Obelisk Foundation, Nevada." />
    </div>
  );
}

/* ---- VIGIL: сетка миров + телеметрия-marquee + reveal сырой/чёткий + реле ---- */
function VigilLand() {
  const worlds = [
    { img: "/uploads/1/hooks/scenes/planet-reveal.png", n: "Meridian", t: "dust storm rising" },
    { img: "/uploads/1/hooks/land/vig-w1.jpg", n: "Halo", t: "ring shear stable" },
    { img: "/uploads/1/hooks/land/vig-w2.jpg", n: "Brack", t: "ice fracture 04" },
    { img: "/uploads/1/hooks/land/vig-w3.jpg", n: "Ferro", t: "storm band widening" },
    { img: "/uploads/1/hooks/land/vig-w4.jpg", n: "Tethys", t: "cloud system drifting" },
    { img: "/uploads/1/hooks/land/vig-w5.jpg", n: "Ember", t: "vent glow rising" },
    { img: "/uploads/1/hooks/land/vig-w6.jpg", n: "Vane", t: "haze thickening" },
  ];
  const ticker = "MERIDIAN dust storm rising // HALO ring shear stable // BRACK ice fracture 04 // FERRO storm band widening // TETHYS cloud drift // EMBER vent glow rising // VANE haze thickening // ";
  return (
    <div className="vh-l2 l2-vigil">
      <section className="vg2-grid-sec">
        <Reveal className="vg2-grid-head vh-rv--up"><span className="vg2-kick">Under watch, right now</span><h2>Seven worlds. <em>Someone on each.</em></h2></Reveal>
        <div className="vg2-grid">
          {worlds.map((w) => (<Reveal key={w.n} className="vg2-world vh-rv--zoom"><div className="vg2-world-media"><ShaderImage src={w.img} /></div><div className="vg2-world-meta"><b>{w.n}</b><span>{w.t}</span></div></Reveal>))}
        </div>
      </section>

      <section className="vg2-feed"><div className="vg2-marquee"><span>{ticker.repeat(3)}</span></div></section>

      <section className="vg2-reveal-sec">
        <Reveal className="vg2-reveal-head vh-rv--up"><h3>One eye guesses.<br /><em>Seven eyes are sure.</em></h3><p>Pooled, a backyard telescope becomes a planet under constant watch. Move across the feed to sharpen it.</p></Reveal>
        <ShaderReveal base="/uploads/1/hooks/scenes/planet-reveal.png" top="/uploads/1/hooks/scenes/planet-reveal.png" mode="raw-sharp" radius={0.26} className="vg2-cr">
          <span className="vg2-cr-tag raw">single relay</span>
          <span className="vg2-cr-tag sharp">seven relays</span>
        </ShaderReveal>
      </section>

      <section className="vg2-relay">
        <Reveal className="vg2-relay-in vh-rv--up"><div className="vg2-clock" aria-hidden><i /></div><div className="vg2-relay-copy"><h3>The watch never breaks.</h3><p>Members hand the feed around the clock, across every timezone. There is always someone awake and looking.</p></div></Reveal>
      </section>

      <section className="vg2-cta">
        <Reveal className="vh-rv--up"><h2>Take a <em>shift.</em></h2><p>Membership opens in small waves. Join the next one.</p><a href="#" onClick={stop} className="vg2-btn">Join the watch <i>↗</i></a></Reveal>
      </section>

      <LandFoot brand="VIGIL" tagline="A shared, unbroken watch on distant worlds." cols={[{ h: "Watch", links: ["Live feed", "Worlds", "Shifts"] }, { h: "Join", links: ["Membership", "Instruments", "Guide"] }, { h: "Coop", links: ["About", "Research", "Contact"] }]} legal="The Vigil Cooperative." />
    </div>
  );
}

/* ---- ASCENSION: дышащий круг, воздух, мягкая галерея ---- */
function AscensionLand() {
  const gal = [
    { img: "/uploads/1/hooks/land/ascension-retreat.jpg", c: "The pavilion at dawn" },
    { img: "/uploads/1/hooks/land/asc-g2.jpg", c: "The walk before breakfast" },
    { img: "/uploads/1/hooks/land/asc-g3.jpg", c: "Hands, unclenched" },
  ];
  return (
    <div className="vh-l2 l2-ascension">
      <section className="as2-breathe">
        <div className="as2-circle" aria-hidden><span>in</span></div>
        <Reveal className="as2-breathe-copy vh-rv--up"><span className="as2-kick">A breathing practice</span><h2>The noise was never<br /><em>yours to carry.</em></h2><p>Four rituals to begin. A weekly session to hold. A retreat when you are ready to put it all down.</p></Reveal>
      </section>

      <section className="as2-practice">
        <Reveal className="as2-practice-media vh-rv--mask"><DepthParallax src="/uploads/1/hooks/land/asc-g1.jpg" depth="/uploads/1/hooks/land/asc-g1-depth.jpg" amp={0.035} /></Reveal>
        <Reveal className="as2-practice-copy vh-rv--up"><h3>It does not ask you<br />to leave your life.<br /><em>It hands it back, quieter.</em></h3></Reveal>
      </section>

      <section className="as2-gallery">
        <Reveal className="as2-gallery-head vh-rv--up"><h3>Three days on a still mountainside.</h3></Reveal>
        {gal.map((g, i) => (<Reveal key={i} className={`as2-gtile ${i % 2 ? "r" : "l"} vh-rv--up`}><img loading="lazy" src={g.img} alt="" /><span>{g.c}</span></Reveal>))}
      </section>

      <section className="as2-quotes">
        <Reveal className="as2-q vh-rv--up"><blockquote>I came for the sleep and stayed for the silence.</blockquote><cite>Noor Haddad, one year in</cite></Reveal>
        <Reveal className="as2-q vh-rv--up"><blockquote>I breathe differently now, off the mat too.</blockquote><cite>Elias Fort, six months in</cite></Reveal>
      </section>

      <section className="as2-cta">
        <Reveal className="vh-rv--up"><h2>Rise into <em>stillness.</em></h2><p>Begin with the free rituals, or hold a place at the next retreat.</p><a href="#" onClick={stop} className="as2-btn">Begin the ascent <i>↗</i></a></Reveal>
      </section>

      <LandFoot brand="ASCENSION" tagline="Breathing rituals for a quieter life." cols={[{ h: "Practice", links: ["Rituals", "Live sessions", "Retreats"] }, { h: "Learn", links: ["The method", "Teachers", "Journal"] }, { h: "More", links: ["About", "Membership", "Contact"] }]} legal="Ascension Practice." />
    </div>
  );
}

function SceneLanding({ slug }: { slug: string }) {
  switch (slug) {
    case "bloom": return <BloomLand />;
    case "held-world": return <OrbeLand />;
    case "monolith": return <ObeliskLand />;
    case "planet-vigil": return <VigilLand />;
    case "ascension": return <AscensionLand />;
    default: return null;
  }
}

// Постер-сцена (editorial): субъект по центру, гигантский serif-титул с type-occlusion (слово за субъектом + слово перед),
// угловые микро-аннотации + ✦, тонкая рамка со скобами, editorial-подпись. Собирается по скроллу (--sp → --as).
type PAnno = { at: "tl" | "tr" | "ml" | "mr" | "bl" | "br"; k?: string; v?: React.ReactNode };
function PosterScene({ cls, img, ar = "1", tall = 178, back, front, annos = [], cap, body, meta }: {
  cls?: string; img: string; ar?: string; tall?: number; back?: React.ReactNode; front?: React.ReactNode;
  annos?: PAnno[]; cap?: React.ReactNode; body?: React.ReactNode; meta?: string;
}) {
  const ref = useSectionProgress<HTMLDivElement>();
  return (
    <section ref={ref} className={`pos ${cls || ""}`} style={{ height: `${tall}vh` }} {...heroPtr}>
      <div className="pos-sticky">
        <div className="pos-grain" aria-hidden />
        {back && <div className="pos-title pos-back" aria-hidden>{back}</div>}
        <div className="pos-subj" style={{ ["--ar"]: ar } as React.CSSProperties}><img src={img} alt="" /></div>
        {front && <div className="pos-title pos-front">{front}</div>}
        <div className="pos-frame" aria-hidden><i className="c-tl" /><i className="c-tr" /><i className="c-bl" /><i className="c-br" /></div>
        {annos.map((a, i) => <div key={i} className={`pos-an an-${a.at}`}>{a.k && <b>{a.k}</b>}{a.v && <span>{a.v}</span>}</div>)}
        {meta && <div className="pos-meta">{meta}</div>}
        {(cap || body) && <div className="pos-cap">{cap && <b>{cap}</b>}{body && <p>{body}</p>}</div>}
      </div>
    </section>
  );
}

/* FORGE process — pinned-сцена Heat→Hammer→Quench→Hone по scroll-progress (--sp). Огонь→холодная сталь→одна кромка. */
function ForgeProcess() {
  const ref = useSectionProgress<HTMLDivElement>();
  const win = (a: number, b: number) => ({ ["--a"]: a, ["--b"]: b } as React.CSSProperties);
  return (
    <section ref={ref} className="frg-proc">
      <div className="frg-proc-sticky">
        <div className="fp-media fp-fire" style={win(-0.1, 0.55)}>
          <img src="/uploads/1/hooks/sites/forge-p/hands.jpg" alt="" />
        </div>
        <div className="fp-media fp-quench" style={win(0.47, 0.8)}>
          <img src="/uploads/1/hooks/sites/forge-p/quench.jpg" alt="" />
        </div>
        <div className="fp-media fp-hone" style={win(0.72, 1.15)}>
          <img src="/uploads/1/hooks/sites/forge-p/blade.jpg" alt="" />
        </div>
        <div className="fp-fold" style={win(0.24, 0.5)} aria-hidden />
        <div className="fp-wash" />
        <div className="fp-cold" aria-hidden />
        <div className="fp-line" aria-hidden />
        <div className="fp-rail" aria-hidden><span>THE FORGE</span><span>№ 01–04</span></div>
        <div className="fp-chap c-heat" style={win(-0.06, 0.26)}>
          <span className="fp-stage">01 — HEAT</span>
          <b className="fp-big">1500°</b>
          <p>The billet glows to fifteen hundred degrees, then folds — again and again.</p>
        </div>
        <div className="fp-chap c-hammer" style={win(0.27, 0.5)}>
          <span className="fp-stage">02 — HAMMER</span>
          <b className="fp-big">FOLD<br />&amp; DRAW</b>
          <p>Every layer drawn out by hand until the pattern runs like water.</p>
        </div>
        <div className="fp-chap c-quench" style={win(0.52, 0.72)}>
          <span className="fp-stage">03 — QUENCH</span>
          <b className="fp-big">SET</b>
          <p>Locked hard in an instant — orange to cold graphite.</p>
        </div>
        <div className="fp-chap c-hone" style={win(0.75, 1.1)}>
          <span className="fp-stage">04 — HONE</span>
          <b className="fp-big fp-serif">one quiet<br /><em>line.</em></b>
          <p>Weeks of grinding and stoning bring the edge down to a single line.</p>
        </div>
      </div>
    </section>
  );
}

/* ===== Бизнес-сайт: FORGE — bespoke ножи (editorial-постер, без видео) ===== */
const FP = "/uploads/1/hooks/sites/forge-p";
function ForgeSite() {
  return (
    <div className="vh-site frg">
      <header className="frg-head">
        <Link href="/visual-hooks" className="frg-brand">FORGE</Link>
        <nav className="frg-nav"><a href="#" onClick={stop}>Blades</a><a href="#" onClick={stop}>The forge</a><a href="#" onClick={stop}>Commission</a></nav>
      </header>

      <section className="frg-bleed" {...heroPtr}>
        <div className="frg-bleed-img"><img src={`${FP}/smith.jpg`} alt="" /></div>
        <div className="frg-bleed-wash" aria-hidden />
        <div className="pos-frame frg-bleed-frame" aria-hidden><i className="c-tl" /><i className="c-tr" /><i className="c-bl" /><i className="c-br" /></div>
        <div className="pos-an an-br"><b>№ 01 — THE SMITH</b><span>ONE BILLET · MADE TO ORDER</span></div>
        <div className="frg-bleed-copy">
          <span className="frg-eyebrow">Bespoke blades · one smith</span>
          <h1>Forged<br /><em>not made.</em></h1>
          <p>Hand-hammered from a single billet of steel. No two alike, none in a hurry.</p>
        </div>
        <div className="frg-bleed-cue" aria-hidden>scroll</div>
      </section>

      <PosterScene cls="pos-hands" img={`${FP}/hands.jpg`} ar="1"
        back={<>ONE OF</>} front={<em>one.</em>}
        annos={[{ at: "tl", k: "THE MAKING", v: "BY HAND" }, { at: "br", k: "№", v: "FOLD / DRAW / FOLD" }]}
        meta="No 02 — MADE BY HAND"
        cap="EVERY BLADE IS ONE OF ONE"
        body="We forge to commission, in small numbers. Each knife carries the marks of the hand that made it and the fire that shaped it." />

      <ForgeProcess />

      <PosterScene cls="pos-relic" img={`${FP}/blade.jpg`} ar="9 / 16" tall={192}
        back={<>DAMASCUS</>} front={<em>steel.</em>}
        annos={[{ at: "tl", k: "STEEL", v: "FOLDED CARBON" }, { at: "tr", k: "HANDLE", v: "STABILISED WALNUT" }, { at: "bl", k: "LENGTH", v: "210 MM" }, { at: "br", k: "COMMISSION", v: "№ 047" }]}
        meta="No 04 — THE BLADE"
        cap="THE PATTERN RUNS LIKE WATER"
        body="Folded until the layers run like water — a single one-of-one blade, numbered and signed by the hand that made it." />

      <PosterScene cls="pos-quote" img={`${FP}/quench.jpg`} ar="16 / 9" tall={168}
        back={<>OUTLIVE</>} front={<em>you.</em>}
        annos={[{ at: "tl", v: "THE SMITH" }, { at: "br", v: "ON THE WHOLE JOB" }]}
        meta="No 05 — THE VOICE"
        cap="THE SMITH"
        body="“A knife should outlive the person who buys it. That is the whole job.”" />

      <section className="frg-cta-pos">
        <div className="frg-grain" aria-hidden />
        <div className="frg-cta-in">
          <span className="frg-eyebrow">Commission</span>
          <h2>Commission<br /><em>a blade.</em></h2>
          <p>Tell us what you cook, and how you hold a knife. We forge the rest.</p>
          <a href="#" onClick={stop} className="frg-btn">Start a commission <i>↗</i></a>
        </div>
      </section>

      <footer className="frg-foot">
        <div className="frg-foot-top"><b>FORGE</b><p>Hand-forged blades, made to commission.</p></div>
        <div className="frg-foot-legal"><span>Forge Atelier</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}

/* ===== MONO — архитектура/недвижка (light, airy, minimalist) ===== */
function MonoSite() {
  const specs: [string, string][] = [["210 m²", "under one continuous roof"], ["3", "rooms, no corridors"], ["1", "lake, held perfectly still"], ["0", "walls you cannot see through"]];
  return (
    <div className="vh-site mono">
      <section className="mono-hero">
        <video className="mono-hero-vid" src="/uploads/1/hooks/sites/mono-hero.mp4" poster="/uploads/1/hooks/sites/mono.jpg" autoPlay muted loop playsInline />
        <header className="mono-head">
          <Link href="/visual-hooks" className="mono-brand">MONO</Link>
          <nav className="mono-nav"><a href="#" onClick={stop}>The house</a><a href="#" onClick={stop}>Setting</a><a href="#" onClick={stop}>Enquire</a></nav>
        </header>
        <div className="mono-hero-copy"><span className="mono-eyebrow">Architecture, distilled</span><h1>A house that disappears<br /><em>into its lake.</em></h1></div>
      </section>
      <section className="mono-statement"><Reveal className="vh-rv--up"><h2>We built very little,<br /><em>very well.</em></h2><p>One structure, three rooms, and a lake that doubles the sky. Nothing here asks for your attention. That is the point.</p></Reveal></section>
      <section className="mono-specs"><div className="mono-specs-row">{specs.map(([v, l]) => (<Reveal key={l} className="mono-spec vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="mono-setting"><Reveal className="mono-setting-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/mono.jpg" alt="" /></Reveal><Reveal className="mono-setting-copy vh-rv--up"><h3>Sited on still water, <em>fifty minutes from the city.</em></h3><p>Cast concrete, floor-to-ceiling glass, and a roof that reads as a single line against the fog.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Held quietly, <em>on the water.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/mono-interior.jpg" alt="" /><figcaption>Glass to the lake.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/mono-dusk.jpg" alt="" /><figcaption>One line, at dusk.</figcaption></figure></Reveal></div></section>
      <section className="mono-cta"><Reveal className="vh-rv--up"><h2>Come see it <em>at dawn.</em></h2><p>Private viewings, by appointment, when the water is at its stillest.</p><a href="#" onClick={stop} className="mono-btn">Request a viewing <i>↗</i></a></Reveal></section>
      <footer className="mono-foot"><div className="mono-foot-top"><b>MONO</b><p>One house, held quietly on the water.</p></div><div className="mono-foot-legal"><span>Mono Residences</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== PHANTOM — авто (dark, kinetic, dramatic) ===== */
function PhantomSite() {
  const stats: [string, string][] = [["0-100", "in 2.6 seconds"], ["680", "km of silence"], ["1", "gear, no shifts"], ["∞", "flat, wide open"]];
  return (
    <div className="vh-site phan">
      <section className="phan-hero">
        <video className="phan-hero-vid" src="/uploads/1/hooks/sites/phantom-hero.mp4" poster="/uploads/1/hooks/sites/phantom.jpg" autoPlay muted loop playsInline />
        <div className="phan-hero-wash" />
        <header className="phan-head"><Link href="/visual-hooks" className="phan-brand">PHANTOM</Link><nav className="phan-nav"><a href="#" onClick={stop}>The car</a><a href="#" onClick={stop}>Range</a><a href="#" onClick={stop}>Reserve</a></nav></header>
        <h1 className="phan-h1">NOTHING<br /><em>for miles.</em></h1>
        <div className="phan-sub">An electric grand tourer built for the empty places.</div>
      </section>
      <section className="phan-statement"><Reveal className="vh-rv--up"><h2>Silence is the <em>new speed.</em></h2></Reveal></section>
      <section className="phan-stats"><div className="phan-stats-row">{stats.map(([v, l]) => (<Reveal key={l} className="phan-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="phan-show"><Reveal className="phan-show-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/sites/phantom.jpg" alt="" /></Reveal><Reveal className="phan-show-copy vh-rv--up"><h3>Drawn as <em>one line.</em></h3><p>No grille, no seams, no noise. Just a shape that moves air and nothing else.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Drawn to <em>move air, nothing else.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/phantom-rear.jpg" alt="" /><figcaption>No seams, no noise.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/phantom-cabin.jpg" alt="" /><figcaption>One screen, one line.</figcaption></figure></Reveal></div></section>
      <section className="phan-cta"><Reveal className="vh-rv--up"><h2>Reserve the <em>first run.</em></h2><p>Two hundred cars. A refundable hold secures your place in line.</p><a href="#" onClick={stop} className="phan-btn">Reserve yours <i>↗</i></a></Reveal></section>
      <footer className="phan-foot"><div className="phan-foot-top"><b>PHANTOM</b><p>Electric grand touring for the empty places.</p></div><div className="phan-foot-legal"><span>Phantom Motors</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HOROLOGE — часы (dark, premium, cosmic, gold) ===== */
function HorologeSite() {
  return (
    <div className="vh-site horo">
      <section className="horo-hero">
        <video className="horo-hero-vid" src="/uploads/1/hooks/sites/horologe-hero.mp4" poster="/uploads/1/hooks/sites/horologe.jpg" autoPlay muted loop playsInline />
        <div className="horo-hero-wash" />
        <header className="horo-head"><Link href="/visual-hooks" className="horo-brand">HOROLOGE</Link><nav className="horo-nav"><a href="#" onClick={stop}>Movement</a><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Acquire</a></nav></header>
        <div className="horo-hero-copy"><span className="horo-eyebrow">Complication N°VII</span><h1>A little <em>galaxy</em><br />on your wrist.</h1></div>
      </section>
      <section className="horo-statement"><Reveal className="vh-rv--up"><h2>Four hundred parts,<br /><em>one quiet universe.</em></h2><p>The dial is an aventurine sky. Beneath it, a movement wound by hand and finished under a loupe over three months.</p></Reveal></section>
      <section className="horo-move"><Reveal className="horo-move-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/sites/horologe.jpg" alt="" /></Reveal><Reveal className="horo-move-copy vh-rv--up"><h3>Wound by hand,<br /><em>read at a glance.</em></h3><p>A seventy-two hour reserve, a moonphase accurate for a century, and a rotor you will never hear.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>A quiet universe, <em>up close.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/horo-dial.jpg" alt="" /><figcaption>An aventurine sky.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/horo-caseback.jpg" alt="" /><figcaption>Four hundred parts.</figcaption></figure></Reveal></div></section>
      <section className="horo-cta"><Reveal className="vh-rv--up"><h2>Twenty-eight will <em>ever exist.</em></h2><p>Each numbered, each spoken for by application only.</p><a href="#" onClick={stop} className="horo-btn">Request an audience <i>↗</i></a></Reveal></section>
      <footer className="horo-foot"><div className="horo-foot-top"><b>HOROLOGE</b><p>Hand-finished complications, in tiny numbers.</p></div><div className="horo-foot-legal"><span>Maison Horologe</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== TIDE — cold-water swim club (teal, cinematic) ===== */
function TideSite() {
  const ritual: [string, string][] = [["Arrive", "Six a.m., the water is four degrees and nobody is talking."], ["Plunge", "Ninety seconds. The gasp, then the strange, total quiet."], ["Warm", "Wool, a fire, and coffee too hot to hold. This is the part nobody tells you about."]];
  return (
    <div className="vh-site tide">
      <section className="tide-hero">
        <video className="tide-hero-vid" src="/uploads/1/hooks/sites/tide-hero.mp4" poster="/uploads/1/hooks/sites/tide-hero.jpg" autoPlay muted loop playsInline />
        <div className="tide-hero-wash" />
        <header className="tide-head"><Link href="/visual-hooks" className="tide-brand">TIDE</Link><nav className="tide-nav"><a href="#" onClick={stop}>The swim</a><a href="#" onClick={stop}>Membership</a><a href="#" onClick={stop}>Join</a></nav></header>
        <div className="tide-hero-copy"><span className="tide-eyebrow">A cold-water club</span><h1>The cold does<br /><em>the work.</em></h1><p>We meet at dawn, all year, and get in. That is the whole idea.</p></div>
      </section>
      <section className="tide-statement"><Reveal className="vh-rv--up"><h2>Get in. Everything else<br /><em>gets quieter.</em></h2></Reveal></section>
      <section className="tide-ritual"><Reveal className="tide-ritual-head vh-rv--up"><h3>The ritual</h3></Reveal><div className="tide-steps">{ritual.map(([h, p], i) => (<Reveal key={h} className="tide-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Dawn, <em>all year.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/tide-swim.jpg" alt="" /><figcaption>Four degrees, and in.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/tide-shore.jpg" alt="" /><figcaption>The shore at six.</figcaption></figure></Reveal></div></section>
      <section className="tide-cta"><Reveal className="vh-rv--up"><h2>Your first swim is <em>on us.</em></h2><p>Come once. Most people are back on Thursday.</p><a href="#" onClick={stop} className="tide-btn">Book a dawn swim <i>↗</i></a></Reveal></section>
      <footer className="tide-foot"><div className="tide-foot-top"><b>TIDE</b><p>A cold-water swim club. All year, at dawn.</p></div><div className="tide-foot-legal"><span>Tide Club</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== CANTO — hi-fi / винил (warm analog, brass) ===== */
function CantoSite() {
  return (
    <div className="vh-site canto">
      <section className="canto-hero">
        <video className="canto-hero-vid" src="/uploads/1/hooks/sites/canto-hero.mp4" poster="/uploads/1/hooks/sites/canto-hero.jpg" autoPlay muted loop playsInline />
        <div className="canto-hero-wash" />
        <header className="canto-head"><Link href="/visual-hooks" className="canto-brand">CANTO</Link><nav className="canto-nav"><a href="#" onClick={stop}>The system</a><a href="#" onClick={stop}>Rooms</a><a href="#" onClick={stop}>Listen</a></nav></header>
        <div className="canto-hero-copy"><span className="canto-eyebrow">Analog hi-fi, by hand</span><h1>Music, with the<br /><em>weight put back in.</em></h1></div>
      </section>
      <section className="canto-statement"><Reveal className="vh-rv--up"><h2>We do not stream.<br /><em>We sit down.</em></h2><p>A turntable, a valve amp, and two speakers voiced over a year. Then one record, start to finish, with the lights low.</p></Reveal></section>
      <section className="canto-split"><Reveal className="canto-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/canto-hero.jpg" alt="" /></Reveal><Reveal className="canto-split-copy vh-rv--up"><h3>Brass, walnut,<br /><em>and forty years of tubes.</em></h3><p>Every system is built to the room it will live in. We come, we measure, we tune it by ear.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Weight, <em>put back in.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/canto-deck.jpg" alt="" /><figcaption>Brass and walnut.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/canto-room.jpg" alt="" /><figcaption>One record, lights low.</figcaption></figure></Reveal></div></section>
      <section className="canto-cta"><Reveal className="vh-rv--up"><h2>Hear it <em>in the room.</em></h2><p>Book an hour in the listening lounge. Bring the record that matters most.</p><a href="#" onClick={stop} className="canto-btn">Book a session <i>↗</i></a></Reveal></section>
      <footer className="canto-foot"><div className="canto-foot-top"><b>CANTO</b><p>Analog hi-fi systems, built by ear.</p></div><div className="canto-foot-legal"><span>Canto Audio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ATLAS — экспедиционное снаряжение (cold, epic) ===== */
function AtlasSite() {
  const kit: [string, string][] = [["-40°", "tested, not rated"], ["7", "expeditions before it ships"], ["1", "repair, free, forever"]];
  return (
    <div className="vh-site atlas">
      <section className="atlas-hero">
        <video className="atlas-hero-vid" src="/uploads/1/hooks/sites/atlas-hero.mp4" poster="/uploads/1/hooks/sites/atlas-hero.jpg" autoPlay muted loop playsInline />
        <div className="atlas-hero-wash" />
        <header className="atlas-head"><Link href="/visual-hooks" className="atlas-brand">ATLAS</Link><nav className="atlas-nav"><a href="#" onClick={stop}>The kit</a><a href="#" onClick={stop}>Field notes</a><a href="#" onClick={stop}>Shop</a></nav></header>
        <div className="atlas-hero-copy"><span className="atlas-eyebrow">Expedition gear</span><h1>Made for where<br /><em>the map ends.</em></h1></div>
      </section>
      <section className="atlas-statement"><Reveal className="vh-rv--up"><h2>Gear that earns the<br /><em>weight it costs you.</em></h2><p>We make very few things. Each one goes to the ice on a real expedition before it is allowed anywhere near a shop.</p></Reveal></section>
      <section className="atlas-stats"><div className="atlas-stats-row">{kit.map(([v, l]) => (<Reveal key={l} className="atlas-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Where <em>the map ends.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/atlas-pack.jpg" alt="" /><figcaption>A short list, tested.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/atlas-field.jpg" alt="" /><figcaption>Taken to the ice.</figcaption></figure></Reveal></div></section>
      <section className="atlas-cta"><Reveal className="vh-rv--up"><h2>Pack for <em>the ends of it.</em></h2><p>A short list of things that will not let you down. Built to be repaired, not replaced.</p><a href="#" onClick={stop} className="atlas-btn">See the kit <i>↗</i></a></Reveal></section>
      <footer className="atlas-foot"><div className="atlas-foot-top"><b>ATLAS</b><p>A short list of expedition-grade gear.</p></div><div className="atlas-foot-legal"><span>Atlas Supply</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== NOCT — natural wine (dark, candlelit, intimate) ===== */
function NoctSite() {
  return (
    <div className="vh-site noct">
      <section className="noct-hero">
        <video className="noct-hero-vid" src="/uploads/1/hooks/sites/noct-hero.mp4" poster="/uploads/1/hooks/sites/noct-hero.jpg" autoPlay muted loop playsInline />
        <div className="noct-hero-wash" />
        <header className="noct-head"><Link href="/visual-hooks" className="noct-brand">NOCT</Link><nav className="noct-nav"><a href="#" onClick={stop}>The list</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Visit</a></nav></header>
        <div className="noct-hero-copy"><span className="noct-eyebrow">A natural wine room</span><h1>Wine that tastes<br /><em>of somewhere.</em></h1></div>
      </section>
      <section className="noct-statement"><Reveal className="vh-rv--up"><h2>Nothing added,<br /><em>nothing taken away.</em></h2><p>Low light, forty bottles, and no list you have heard of. We pour by the glass and tell you the story if you want it.</p></Reveal></section>
      <section className="noct-split"><Reveal className="noct-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/noct-hero.jpg" alt="" /></Reveal><Reveal className="noct-split-copy vh-rv--up"><h3>Small growers,<br /><em>honest hands.</em></h3><p>Everything on the wall is farmed without chemicals and made without shortcuts. Some of it is a little wild. That is the good part.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Poured <em>after dark.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/noct-pour.jpg" alt="" /><figcaption>By the glass, by candle.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/noct-cellar.jpg" alt="" /><figcaption>Forty bottles, all strange.</figcaption></figure></Reveal></div></section>
      <section className="noct-cta"><Reveal className="vh-rv--up"><h2>Come in <em>after dark.</em></h2><p>No bookings before eight. Sit at the bar and let us pour you something strange.</p><a href="#" onClick={stop} className="noct-btn">Find us <i>↗</i></a></Reveal></section>
      <footer className="noct-foot"><div className="noct-foot-top"><b>NOCT</b><p>A natural wine room. Open after dark.</p></div><div className="noct-foot-legal"><span>Noct Wine</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== SOL — солнечная энергия (light, optimistic) ===== */
function SolSite() {
  const how: [string, string][] = [["Survey", "We read your roof, your bills and your sky in a single visit."], ["Install", "One clean day. Panels, battery, and an app that shows the sun at work."], ["Own it", "You make your own power by year one, and sell the rest back after."]];
  return (
    <div className="vh-site sol">
      <section className="sol-hero">
        <video className="sol-hero-vid" src="/uploads/1/hooks/sites/sol-hero.mp4" poster="/uploads/1/hooks/sites/sol-hero.jpg" autoPlay muted loop playsInline />
        <div className="sol-hero-wash" />
        <header className="sol-head"><Link href="/visual-hooks" className="sol-brand">SOL</Link><nav className="sol-nav"><a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Impact</a><a href="#" onClick={stop}>Quote</a></nav></header>
        <div className="sol-hero-copy"><span className="sol-eyebrow">Home solar, done right</span><h1>Your roof already<br /><em>catches the sun.</em></h1></div>
      </section>
      <section className="sol-statement"><Reveal className="vh-rv--up"><h2>Stop renting your power.<br /><em>Start owning it.</em></h2><p>Sunlight is free and your roof is already in it. We turn that into your own quiet little power station.</p></Reveal></section>
      <section className="sol-how"><Reveal className="sol-how-head vh-rv--up"><h3>Three steps to your own sun.</h3></Reveal><div className="sol-steps">{how.map(([h, p], i) => (<Reveal key={h} className="sol-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Your own <em>power station.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/sol-panel.jpg" alt="" /><figcaption>Sunlight, at work.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/sol-roof.jpg" alt="" /><figcaption>Owned, not rented.</figcaption></figure></Reveal></div></section>
      <section className="sol-cta"><Reveal className="vh-rv--up"><h2>See your roof <em>in sunlight.</em></h2><p>A free survey and an honest number, with no one calling you twice.</p><a href="#" onClick={stop} className="sol-btn">Get a quote <i>↗</i></a></Reveal></section>
      <footer className="sol-foot"><div className="sol-foot-top"><b>SOL</b><p>Home solar and storage, done right.</p></div><div className="sol-foot-legal"><span>Sol Energy</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== VESSEL — мода (deep-red void, cream, editorial) ===== */
function VesselSite() {
  return (
    <div className="vh-site vess">
      <section className="vess-hero">
        <video className="vess-hero-vid" src="/uploads/1/hooks/sites/vessel-hero.mp4" poster="/uploads/1/hooks/sites/vessel.jpg" autoPlay muted loop playsInline />
        <div className="vess-hero-wash" />
        <header className="vess-head"><Link href="/visual-hooks" className="vess-brand">VESSEL</Link><nav className="vess-nav"><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop}>Book</a></nav></header>
        <div className="vess-hero-copy"><span className="vess-eyebrow">Autumn / Winter</span><h1>Cloth that <em>moves</em><br />like it means it.</h1></div>
      </section>
      <section className="vess-statement"><Reveal className="vh-rv--up"><h2>We cut for the body<br /><em>in motion.</em></h2><p>Draped, not fitted. Every piece is made to fall, fold and follow, drawn on a living body rather than a mannequin.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Cut for the body <em>in motion.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/vessel-look.jpg" alt="" /><figcaption>Drawn on a living body.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/vessel-fabric.jpg" alt="" /><figcaption>Made to fall and fold.</figcaption></figure></Reveal></div></section>
      <section className="vess-cta"><Reveal className="vh-rv--up"><h2>Seen only <em>by appointment.</em></h2><p>The collection shows in the atelier, on a body, in daylight. Book a fitting.</p><a href="#" onClick={stop} className="vess-btn">Request an appointment <i>↗</i></a></Reveal></section>
      <footer className="vess-foot"><div className="vess-foot-top"><b>VESSEL</b><p>Draped ready-to-wear, shown by appointment.</p></div><div className="vess-foot-legal"><span>Vessel Atelier</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HAVEN — курорт/отель (warm golden, serene) ===== */
function HavenSite() {
  return (
    <div className="vh-site hav">
      <section className="hav-hero">
        <video className="hav-hero-vid" src="/uploads/1/hooks/sites/haven-hero.mp4" poster="/uploads/1/hooks/sites/haven.jpg" autoPlay muted loop playsInline />
        <div className="hav-hero-wash" />
        <header className="hav-head"><Link href="/visual-hooks" className="hav-brand">HAVEN</Link><nav className="hav-nav"><a href="#" onClick={stop}>The place</a><a href="#" onClick={stop}>Suites</a><a href="#" onClick={stop}>Reserve</a></nav></header>
        <div className="hav-hero-copy"><span className="hav-eyebrow">A shoreline retreat</span><h1>Where the pool<br /><em>forgets the sea.</em></h1></div>
      </section>
      <section className="hav-statement"><Reveal className="vh-rv--up"><h2>Nine rooms, one horizon,<br /><em>and nowhere to be.</em></h2><p>No lobby, no schedule, no screens by the water. Just a long edge where the pool and the ocean agree to be the same thing.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>One horizon, <em>nowhere to be.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/haven-room.jpg" alt="" /><figcaption>Nine rooms, one edge.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/haven-view.jpg" alt="" /><figcaption>Where pool forgets sea.</figcaption></figure></Reveal></div></section>
      <section className="hav-cta"><Reveal className="vh-rv--up"><h2>Stay until you <em>lose the day.</em></h2><p>Two-night minimum. Breakfast when you wake, dinner when the light goes.</p><a href="#" onClick={stop} className="hav-btn">Check dates <i>↗</i></a></Reveal></section>
      <footer className="hav-foot"><div className="hav-foot-top"><b>HAVEN</b><p>A nine-room shoreline retreat.</p></div><div className="hav-foot-legal"><span>Haven Retreat</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== FORM — мебель (concrete minimal, one light) ===== */
function FormSite() {
  return (
    <div className="vh-site form">
      <section className="form-hero">
        <video className="form-hero-vid" src="/uploads/1/hooks/sites/form-hero.mp4" poster="/uploads/1/hooks/sites/form.jpg" autoPlay muted loop playsInline />
        <div className="form-hero-wash" />
        <header className="form-head"><Link href="/visual-hooks" className="form-brand">FORM</Link><nav className="form-nav"><a href="#" onClick={stop}>Pieces</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Enquire</a></nav></header>
        <div className="form-hero-copy"><span className="form-eyebrow">Furniture, essential</span><h1>One chair.<br /><em>Nothing spare.</em></h1></div>
      </section>
      <section className="form-statement"><Reveal className="vh-rv--up"><h2>We remove until<br /><em>only the use is left.</em></h2><p>Each piece is worked down to the fewest parts that still hold a person. What remains is quiet, heavy, and made to be kept.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Made slowly, <em>to last.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/form-chair.jpg" alt="" /><figcaption>One piece, one maker.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/form-detail.jpg" alt="" /><figcaption>In the joinery.</figcaption></figure></Reveal></div></section>
      <section className="form-cta"><Reveal className="vh-rv--up"><h2>Made slowly, <em>to order.</em></h2><p>A small workshop, a short catalogue, and a wait worth the object at the end of it.</p><a href="#" onClick={stop} className="form-btn">See the pieces <i>↗</i></a></Reveal></section>
      <footer className="form-foot"><div className="form-foot-top"><b>FORM</b><p>Essential furniture, made to order.</p></div><div className="form-foot-legal"><span>Form Studio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== DEW — скинкер (soft, clean, iridescent) ===== */
function DewSite() {
  return (
    <div className="vh-site dew">
      <section className="dew-hero">
        <video className="dew-hero-vid" src="/uploads/1/hooks/sites/dew-hero.mp4" poster="/uploads/1/hooks/sites/dew.jpg" autoPlay muted loop playsInline />
        <div className="dew-hero-wash" />
        <header className="dew-head"><Link href="/visual-hooks" className="dew-brand">DEW</Link><nav className="dew-nav"><a href="#" onClick={stop}>The drop</a><a href="#" onClick={stop}>Ritual</a><a href="#" onClick={stop}>Shop</a></nav></header>
        <div className="dew-hero-copy"><span className="dew-eyebrow">One serum, nothing else</span><h1>Everything your skin<br /><em>actually needs.</em></h1></div>
      </section>
      <section className="dew-statement"><Reveal className="vh-rv--up"><h2>We took it all out<br /><em>until only this was left.</em></h2><p>Nine ingredients, no water bulking it out, no story on the box. One drop, morning and night, and time to let it work.</p></Reveal></section>
      <section className="dew-split"><Reveal className="dew-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/dew.jpg" alt="" /></Reveal><Reveal className="dew-split-copy vh-rv--up"><h3>Feels like <em>almost nothing.</em></h3><p>It sinks in before you finish rubbing it in. No film, no shine, no scent. Just skin that behaves a little better every week.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>One drop, <em>every morning.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/dew-bottle.jpg" alt="" /><figcaption>Eight weeks a bottle.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/dew-skin.jpg" alt="" /><figcaption>Skin, left to itself.</figcaption></figure></Reveal></div></section>
      <section className="dew-cta"><Reveal className="vh-rv--up"><h2>Start the <em>one-drop ritual.</em></h2><p>One bottle lasts eight weeks. If your skin disagrees, we refund it.</p><a href="#" onClick={stop} className="dew-btn">Try one bottle <i>↗</i></a></Reveal></section>
      <footer className="dew-foot"><div className="dew-foot-top"><b>DEW</b><p>One serum, honestly made.</p></div><div className="dew-foot-legal"><span>Dew Skin</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ROAST — кофе-ростер (warm dark, burnt orange) ===== */
function RoastSite() {
  const flow: [string, string][] = [["Source", "One farm at a time, bought at a price the grower actually names."], ["Roast", "In small drums, the morning of the day it ships to you."], ["Ship", "Sealed within the hour, at you in two days, at its peak for ten."]];
  return (
    <div className="vh-site roast">
      <section className="roast-hero">
        <video className="roast-hero-vid" src="/uploads/1/hooks/sites/roast-hero.mp4" poster="/uploads/1/hooks/sites/roast.jpg" autoPlay muted loop playsInline />
        <div className="roast-hero-wash" />
        <header className="roast-head"><Link href="/visual-hooks" className="roast-brand">ROAST</Link><nav className="roast-nav"><a href="#" onClick={stop}>Coffees</a><a href="#" onClick={stop}>Subscribe</a><a href="#" onClick={stop}>Brew</a></nav></header>
        <div className="roast-hero-copy"><span className="roast-eyebrow">Roasted to order</span><h1>Coffee has a peak.<br /><em>We ship you the peak.</em></h1></div>
      </section>
      <section className="roast-statement"><Reveal className="vh-rv--up"><h2>Fresh is not a word<br /><em>on the bag.</em></h2><p>Most coffee is weeks old before you open it. Ours is roasted the day it leaves us, so the best ten days are yours, not the warehouse's.</p></Reveal></section>
      <section className="roast-flow"><Reveal className="roast-flow-head vh-rv--up"><h3>Farm to your kitchen, in days.</h3></Reveal><div className="roast-steps">{flow.map(([h, p], i) => (<Reveal key={h} className="roast-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Roasted <em>this week.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/roast-beans.jpg" alt="" /><figcaption>Off the cooling tray.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/roast-pour.jpg" alt="" /><figcaption>Brewed the way you do.</figcaption></figure></Reveal></div></section>
      <section className="roast-cta"><Reveal className="vh-rv--up"><h2>Wake up to the <em>right bag.</em></h2><p>Tell us how you brew. We match the coffee and time the delivery to your Sunday.</p><a href="#" onClick={stop} className="roast-btn">Build a subscription <i>↗</i></a></Reveal></section>
      <footer className="roast-foot"><div className="roast-foot-top"><b>ROAST</b><p>Single-origin coffee, roasted to order.</p></div><div className="roast-foot-legal"><span>Roast Co.</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== LUME — ювелирка (dark, platinum, refraction) ===== */
function LumeSite() {
  return (
    <div className="vh-site lume">
      <section className="lume-hero">
        <video className="lume-hero-vid" src="/uploads/1/hooks/sites/lume-hero.mp4" poster="/uploads/1/hooks/sites/lume.jpg" autoPlay muted loop playsInline />
        <div className="lume-hero-wash" />
        <header className="lume-head"><Link href="/visual-hooks" className="lume-brand">LUME</Link><nav className="lume-nav"><a href="#" onClick={stop}>Stones</a><a href="#" onClick={stop}>Bespoke</a><a href="#" onClick={stop}>Enquire</a></nav></header>
        <div className="lume-hero-copy"><span className="lume-eyebrow">Fine jewellery, made to order</span><h1>Light, <em>set</em><br />to be kept.</h1></div>
      </section>
      <section className="lume-statement"><Reveal className="vh-rv--up"><h2>One stone, chosen<br /><em>to move with the light.</em></h2><p>We start with the gem, not the setting. Only when a stone earns it do we build the ring around the way it throws colour.</p></Reveal></section>
      <section className="lume-split"><Reveal className="lume-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/lume.jpg" alt="" /></Reveal><Reveal className="lume-split-copy vh-rv--up"><h3>Traced, cut,<br /><em>and set by one pair of hands.</em></h3><p>Every commission is drawn with you, then made by a single bench jeweller from stone to polish. It takes months. It should.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Begin with <em>the stone.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/lume-ring.jpg" alt="" /><figcaption>One stone, set for you.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/lume-bench.jpg" alt="" /><figcaption>Made at the bench.</figcaption></figure></Reveal></div></section>
      <section className="lume-cta"><Reveal className="vh-rv--up"><h2>Begin with <em>the stone.</em></h2><p>A private appointment, a tray of gems, and no pressure to leave with anything but an idea.</p><a href="#" onClick={stop} className="lume-btn">Request an appointment <i>↗</i></a></Reveal></section>
      <footer className="lume-foot"><div className="lume-foot-top"><b>LUME</b><p>Bespoke fine jewellery, stone first.</p></div><div className="lume-foot-legal"><span>Lume Jewellery</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

function BizSite({ slug, brand, eyebrow, title, statement, statementBody, cta, ctaBody, ctaLabel, tagline, legal }: { slug: string; brand: string; eyebrow: string; title: React.ReactNode; statement: React.ReactNode; statementBody: string; cta: React.ReactNode; ctaBody: string; ctaLabel: string; tagline: string; legal: string }) {
  return (
    <div className={`vh-site bz bz-${slug}`}>
      <section className="bz-hero">
        <video className="bz-hero-vid" src={`/uploads/1/hooks/sites/${slug}-hero.mp4`} poster={`/uploads/1/hooks/sites/${slug}.jpg`} autoPlay muted loop playsInline />
        <div className="bz-hero-wash" />
        <header className="bz-head"><Link href="/visual-hooks" className="bz-brand">{brand}</Link><nav className="bz-nav"><a href="#" onClick={stop}>Explore</a><a href="#" onClick={stop}>About</a><a href="#" onClick={stop}>Contact</a></nav></header>
        <div className="bz-hero-copy"><span className="bz-eyebrow">{eyebrow}</span><h1>{title}</h1></div>
      </section>
      <section className="bz-statement"><Reveal className="vh-rv--up"><h2>{statement}</h2><p>{statementBody}</p></Reveal></section>
      <section className="bz-cta"><Reveal className="vh-rv--up"><h2>{cta}</h2><p>{ctaBody}</p><a href="#" onClick={stop} className="bz-btn">{ctaLabel} <i>↗</i></a></Reveal></section>
      <footer className="bz-foot"><div className="bz-foot-top"><b>{brand}</b><p>{tagline}</p></div><div className="bz-foot-legal"><span>{legal}</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}
const BIZ: Record<string, React.ComponentProps<typeof BizSite>> = {
};

/* ===== LEDGER — fintech (production: idea · cinematic · features · gallery · stats) ===== */
function LedgerSite() {
  const g = "/uploads/1/hooks/sites/g/";
  return (
    <div className="vh-site l-ledger">
      <section className="lg-hero">
        <video className="lg-hero-vid" src="/uploads/1/hooks/sites/ledger-hero.mp4" poster="/uploads/1/hooks/sites/ledger.jpg" autoPlay muted loop playsInline />
        <div className="lg-hero-wash" />
        <header className="lg-head"><Link href="/visual-hooks/sites" className="lg-brand">LEDGER</Link><nav className="lg-nav"><a href="#" onClick={stop}>Account</a><a href="#" onClick={stop}>Card</a><a href="#" onClick={stop}>Invite</a></nav></header>
        <div className="lg-hero-copy"><span className="lg-eyebrow">Banking, quietly</span><h1>Money, made<br /><em>quiet.</em></h1><p>An account that tells you the truth and gets out of your way.</p></div>
      </section>

      <section className="lg-idea">
        <Reveal className="vh-rv--up"><span className="lg-kick">The idea</span><h2>A bank that does<br /><em>less, on purpose.</em></h2><p>No points, no confetti, no notifications begging for your thumb. One clean account, one honest card, and a balance you can actually trust at a glance.</p></Reveal>
      </section>

      <section className="lg-cine">
        <ShaderBg mode="nebula" palette={["#05060a", "#1a2f5e", "#86dcb8"]} speed={0.6} className="lg-cine-bg" />
        <Reveal className="lg-cine-copy vh-rv--up"><h2>No points.<br />No noise.<br /><em>No fees you did not agree to.</em></h2></Reveal>
      </section>

      <section className="lg-feat">
        <Reveal className="lg-feat-media vh-rv--mask"><img loading="lazy" src={`${g}ledger-app.jpg`} alt="" /></Reveal>
        <Reveal className="lg-feat-copy vh-rv--up">
          <h3>See everything.<br /><em>Owe nothing.</em></h3>
          <ul className="lg-list">
            <li><b>One balance you trust</b><span>Pending, cleared and upcoming, in one honest number.</span></li>
            <li><b>Fees, shown before they happen</b><span>If a transfer costs anything, you see it before you tap.</span></li>
            <li><b>A saver that just works</b><span>Round-ups and a plain rate, no tiers to decode.</span></li>
          </ul>
        </Reveal>
      </section>

      <section className="lg-gal">
        <Reveal className="lg-gal-head vh-rv--up"><h3>Built to be <em>looked at less.</em></h3></Reveal>
        <div className="lg-gal-grid">
          <Reveal className="lg-tile a vh-rv--zoom"><ShaderImage src={`${g}ledger-edge.jpg`} /><span>The card, in the metal.</span></Reveal>
          <Reveal className="lg-tile b vh-rv--zoom"><ShaderImage src={`${g}ledger-calm.jpg`} /><span>Check it, then put it away.</span></Reveal>
        </div>
      </section>

      <section className="lg-stats">
        <div className="lg-stats-row">
          {[["£0", "in monthly fees"], ["60 sec", "to open, from your phone"], ["24/7", "human support, no bots"]].map(([v, l]) => (<Reveal key={l} className="lg-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}
        </div>
        <Reveal className="lg-stats-note vh-rv--up"><span>Illustrative figures from the current beta.</span></Reveal>
      </section>

      <section className="lg-quote"><Reveal className="vh-rv--up"><blockquote>I opened it, moved my salary over, and then just forgot about it. That is the whole compliment.</blockquote><cite>Elin R., beta member</cite></Reveal></section>

      <section className="lg-cta"><Reveal className="vh-rv--up"><h2>Ask for <em>an invite.</em></h2><p>We onboard in small waves, so support stays human.</p><a href="#" onClick={stop} className="lg-btn">Request an invite <i>↗</i></a></Reveal></section>

      <footer className="lg-foot"><div className="lg-foot-top"><b>LEDGER</b><p>A quiet account for grown-ups.</p></div><div className="lg-foot-legal"><span>Ledger</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ProSite — композиционная продакшн-система (уникальная последовательность блоков на сайт) ===== */
type BgMode = "aurora" | "silk" | "nebula" | "caustics" | "ember" | "grid";
type ProBlock =
  | { t: "idea"; kick?: string; title: React.ReactNode; body: string }
  | { t: "cine"; mode: BgMode; palette: [string, string, string]; title: React.ReactNode }
  | { t: "split"; img: string; title: React.ReactNode; body?: string; list?: { b: string; s: string }[]; rev?: boolean }
  | { t: "gallery"; head: React.ReactNode; items: { img: string; cap: string }[] }
  | { t: "stats"; items: [string, string][]; note?: string }
  | { t: "quote"; text: string; cite: string }
  | { t: "steps"; head: React.ReactNode; items: { h: string; p: string }[] }
  | { t: "editorial"; img: string; title: React.ReactNode; body?: string }
  | { t: "cinematicBand"; media: string; motif?: "none" | "halftone" | "grain"; chapters: { index?: string; title: React.ReactNode; body?: string; align?: "left" | "right" | "center" }[] }
  | { t: "bigNumber"; value: string; label: React.ReactNode; media?: string; note?: string }
  | { t: "diptych"; primary: string; secondary: string; index?: string; title: React.ReactNode; body?: string; overlap?: "object" | "type" | "panel" }
  | { t: "cta"; title: React.ReactNode; body: string; label: string };
type TypePersona = "editorial" | "grotesk" | "fashion" | "signal";
type HeroBase = { eyebrow?: string; title: React.ReactNode; sub?: string };
type ProHero =
  | (HeroBase & { archetype: "legacy" })
  | (HeroBase & { archetype: "hard-split"; mediaSide?: "left" | "right"; index?: string })
  | (HeroBase & { archetype: "product-theatre"; object: string; depth?: string; proof?: [string, string][] })
  | (HeroBase & { archetype: "gallery-horizon"; strip: string[] })
  | (HeroBase & { archetype: "type-collision"; object: string })
  | (HeroBase & { archetype: "edge-arrival"; edge?: "left" | "right"; proof?: [string, string] })
  | (HeroBase & { archetype: "regime-shift"; object: string; index?: string; labels?: string[] })
  | (HeroBase & { archetype: "portal-frame"; frame?: "portrait" | "square"; portal?: string })
  | (HeroBase & { archetype: "index-stage"; items: { label: string; meta?: string; img: string }[] });
type Pro = { slug: string; theme: string; brand: string; eyebrow?: string; title?: React.ReactNode; sub?: string; nav: string[]; blocks: ProBlock[]; tagline: string; legal: string; hero?: ProHero; typography?: TypePersona };

// Бесшовный шов между блоками: блок «проявляется из тени» на входе. Пишем --ev (0 внизу → 1 в кадре).
// Дефолт --ev:1 (шва нет) — безопасно при сбое JS/reduced-motion. Тип шва циклится по индексу.
function BlockSeam({ i, seam, children }: { i: number; seam?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty("--ev", "1"); return; }
    let raf = 0, active = false;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      // 0 когда верх блока на нижней кромке окна → 1 когда верх поднялся на 45% высоты окна
      el.style.setProperty("--ev", Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.55))).toFixed(3));
    };
    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(compute); };
    const io = new IntersectionObserver((es) => { active = es[0].isIntersecting; if (active) onScroll(); }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    io.observe(el); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); compute();
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);
  return <div ref={ref} className="pb-seam" data-seam={seam ?? ["shadow", "wipe", "shadow"][i % 3]}>{children}</div>;
}
function ProBlockView({ b }: { b: ProBlock }) {
  switch (b.t) {
    case "idea": return <section className="pb-idea"><Reveal className="vh-rv--up">{b.kick && <span className="pb-kick">{b.kick}</span>}<h2>{b.title}</h2><p>{b.body}</p></Reveal></section>;
    case "cine": return <section className="pb-cine"><ShaderBg mode={b.mode} palette={b.palette} speed={0.6} className="pb-cine-bg" /><Reveal className="pb-cine-copy vh-rv--up"><h2>{b.title}</h2></Reveal></section>;
    case "split": return <section className={`pb-split${b.rev ? " rev" : ""}`}><Reveal className="pb-split-media vh-rv--mask"><img loading="lazy" src={b.img} alt="" /></Reveal><Reveal className="pb-split-copy vh-rv--up"><h3>{b.title}</h3>{b.body && <p>{b.body}</p>}{b.list && <ul className="pb-list">{b.list.map((x) => <li key={x.b}><b>{x.b}</b><span>{x.s}</span></li>)}</ul>}</Reveal></section>;
    case "gallery": return <section className="pb-gal"><Reveal className="pb-gal-head vh-rv--up"><h3>{b.head}</h3></Reveal><div className={`pb-gal-grid n${b.items.length}`}>{b.items.map((x, i) => <Reveal key={i} className={`pb-tile t${i} vh-rv--zoom`}><ShaderImage src={x.img} /><span>{x.cap}</span></Reveal>)}</div></section>;
    case "stats": return <section className="pb-stats"><div className={`pb-stats-row n${b.items.length}`}>{b.items.map(([v, l]) => <Reveal key={l} className="pb-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>)}</div>{b.note && <Reveal className="pb-stats-note vh-rv--up"><span>{b.note}</span></Reveal>}</section>;
    case "quote": return <section className="pb-quote"><Reveal className="vh-rv--up"><blockquote>{b.text}</blockquote><cite>{b.cite}</cite></Reveal></section>;
    case "steps": return <section className="pb-steps"><Reveal className="pb-steps-head vh-rv--up"><h3>{b.head}</h3></Reveal><div className={`pb-steps-row n${b.items.length}`}>{b.items.map((x, i) => <Reveal key={x.h} className="pb-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{x.h}</b><p>{x.p}</p></Reveal>)}</div></section>;
    case "editorial": return <section className="pb-edit"><Reveal className="pb-edit-media vh-rv--mask"><img loading="lazy" src={b.img} alt="" /></Reveal><Reveal className="pb-edit-copy vh-rv--up"><h3>{b.title}</h3>{b.body && <p>{b.body}</p>}</Reveal></section>;
    case "cinematicBand": return <CinematicBand b={b} />;
    case "bigNumber": return <section className="pb-bignum">{b.media && <div className="pb-bignum-media"><Reveal className="vh-rv--mask"><img loading="lazy" src={b.media} alt="" /></Reveal></div>}<Reveal className="pb-bignum-copy vh-rv--up"><b className="pb-bignum-v">{b.value}</b><span className="pb-bignum-l">{b.label}</span>{b.note && <em>{b.note}</em>}</Reveal></section>;
    case "diptych": return <section className={`pb-dip ov-${b.overlap ?? "object"}`}><Reveal className="pb-dip-primary vh-rv--mask"><img loading="lazy" src={b.primary} alt="" /></Reveal>{b.index && <span className="pb-dip-ix">{b.index}</span>}<Reveal className="pb-dip-copy vh-rv--up"><h3>{b.title}</h3>{b.body && <p>{b.body}</p>}</Reveal><Reveal className="pb-dip-secondary vh-rv--zoom"><img loading="lazy" src={b.secondary} alt="" /></Reveal></section>;
    case "cta": return <section className="pb-cta"><Reveal className="vh-rv--up"><h2>{b.title}</h2><p>{b.body}</p><a href="#" onClick={stop} className="pb-btn">{b.label} <i>↗</i></a></Reveal></section>;
  }
}

function resolveHero(data: Pro): ProHero {
  if (data.hero) return data.hero;
  return { archetype: "legacy", eyebrow: data.eyebrow, title: data.title ?? "", sub: data.sub };
}
const poster = (slug: string) => `/uploads/1/hooks/sites/${slug}.jpg`;
const heroVid = (slug: string) => `/uploads/1/hooks/sites/${slug}-hero.mp4`;
function ProNav({ data }: { data: Pro }) {
  return <nav className="pb-nav">{data.nav.map((n) => <a key={n} href="#" onClick={stop}>{n}</a>)}</nav>;
}
// Курсор-причинность: пишем --px/--py (-1..1) прямо в CSS-переменные секции (без ре-рендера).
function heroMove(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget, r = el.getBoundingClientRect();
  el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
  el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
}
function heroLeave(e: React.PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--px", "0");
  e.currentTarget.style.setProperty("--py", "0");
}
const heroPtr = { onPointerMove: heroMove, onPointerLeave: heroLeave };
// Общий scroll-controller: пишет --sp (0..1 прогресс секции) в CSS-переменную элемента. Один RAF, IntersectionObserver-гейт, reduced-motion.
function useSectionProgress<T extends HTMLElement>(variable = "--sp") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.style.setProperty(variable, "1"); return; }
    let raf = 0, active = false;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      el.style.setProperty(variable, Math.max(0, Math.min(1, -r.top / travel)).toFixed(4));
    };
    const onScroll = () => { if (!raf && active) raf = requestAnimationFrame(compute); };
    const io = new IntersectionObserver((es) => { active = es[0].isIntersecting; if (active) onScroll(); }, { threshold: 0 });
    io.observe(el);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    compute();
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [variable]);
  return ref;
}
// cinematicBand: full-bleed sticky-сцена, медиа медленно зумит, главы-тезисы сменяются по scroll progress.
function CinematicBand({ b }: { b: Extract<ProBlock, { t: "cinematicBand" }> }) {
  const ref = useSectionProgress<HTMLDivElement>();
  const n = b.chapters.length;
  return (
    <div ref={ref} className="pb-cband" style={{ height: `${130 + n * 45}vh` } as React.CSSProperties}>
      <div className="pb-cband-sticky">
        <div className={`pb-cband-media${b.motif && b.motif !== "none" ? ` m-${b.motif}` : ""}`}><img src={b.media} alt="" /></div>
        <div className="pb-cband-wash" />
        {b.chapters.map((c, i) => (
          <div key={i} className={`pb-cband-chap ${c.align ?? "left"}`} style={{ ["--c" as string]: (i === 0 ? 0.25 / n : i === n - 1 ? 1 - 0.25 / n : (i + 0.5) / n).toFixed(3), ["--n" as string]: n } as React.CSSProperties}>
            {c.index && <span className="pb-cband-ix">{c.index}</span>}
            <h3>{c.title}</h3>{c.body && <p>{c.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
function ProHeroView({ hero, data }: { hero: ProHero; data: Pro }) {
  const brand = <Link href="/visual-hooks/sites" className="pb-brand">{data.brand}</Link>;
  switch (hero.archetype) {
    case "legacy":
      return (
        <section className="pb-hero">
          <video className="pb-hero-vid" src={heroVid(data.slug)} poster={poster(data.slug)} autoPlay muted loop playsInline />
          <div className="pb-hero-wash" />
          <header className="pb-head">{brand}<ProNav data={data} /></header>
          <div className="pb-hero-copy">{hero.eyebrow && <span className="pb-eyebrow">{hero.eyebrow}</span>}<h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}</div>
        </section>
      );
    case "hard-split":
      return (
        <section className={`ph ph--split${hero.mediaSide === "left" ? " media-left" : ""}`}>
          <div className="ph-split-type">
            <header className="ph-split-head">{brand}<span className="ph-split-ix">{hero.index ?? "01"}</span></header>
            <div className="ph-split-copy">
              {hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}
              <h1>{hero.title}</h1>
              {hero.sub && <p>{hero.sub}</p>}
              <ProNav data={data} />
            </div>
          </div>
          <div className="ph-split-media"><video src={heroVid(data.slug)} poster={poster(data.slug)} autoPlay muted loop playsInline /><span className="ph-split-cap">{data.tagline}</span></div>
        </section>
      );
    case "product-theatre":
      return (
        <section className="ph ph--theatre" {...heroPtr}>
          <header className="pb-head ph-th-head">{brand}<ProNav data={data} /></header>
          <div className="ph-th-copy">{hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}<h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}</div>
          <div className={`ph-th-object${hero.depth ? " has-depth" : ""}`}>{hero.depth ? <DepthParallax src={hero.object} depth={hero.depth} amp={0.038} /> : <img src={hero.object} alt="" />}</div>
          {hero.proof && <div className="ph-th-proof">{hero.proof.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>}
        </section>
      );
    case "gallery-horizon":
      return (
        <section className="ph ph--gallery">
          <header className="ph-gh-head">{brand}<ProNav data={data} /></header>
          <div className="ph-gh-copy">{hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}<h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}</div>
          <div className="ph-gh-strip">{hero.strip.map((src, i) => <figure key={i}><img loading="lazy" src={src} alt="" /></figure>)}</div>
        </section>
      );
    case "type-collision":
      return (
        <section className="ph ph--collision" {...heroPtr}>
          <header className="ph-tc-head">{brand}<ProNav data={data} /></header>
          <div className="ph-tc-type"><h1>{hero.title}</h1></div>
          <div className="ph-tc-object"><img src={hero.object} alt="" /></div>
          <div className="ph-tc-front" aria-hidden><h1>{hero.title}</h1></div>
          {hero.eyebrow && <span className="ph-tc-eyebrow">{hero.eyebrow}</span>}
          {hero.sub && <span className="ph-tc-sub">{hero.sub}</span>}
        </section>
      );
    case "edge-arrival":
      return (
        <section className={`ph ph--edge${hero.edge === "right" ? " edge-right" : ""}`} {...heroPtr}>
          <header className="ph-edge-head">{brand}<ProNav data={data} /></header>
          <div className="ph-edge-copy">{hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}<h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}</div>
          <div className="ph-edge-media"><video src={heroVid(data.slug)} poster={poster(data.slug)} autoPlay muted loop playsInline /></div>
          {hero.proof && <div className="ph-edge-proof"><b>{hero.proof[0]}</b><span>{hero.proof[1]}</span></div>}
        </section>
      );
    case "regime-shift":
      return (
        <section className="ph ph--regime">
          <header className="ph-rg-head">{brand}<ProNav data={data} /></header>
          <div className="ph-rg-grid">
            <div className="ph-rg-left"><span className="ph-rg-ix">{hero.index ?? "01 / 04"}</span>{hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}</div>
            <div className="ph-rg-object"><img src={hero.object} alt="" /></div>
            <div className="ph-rg-right"><h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}{hero.labels && <ul className="ph-rg-labels">{hero.labels.map((l) => <li key={l}>{l}</li>)}</ul>}</div>
          </div>
          <div className="ph-rg-dark" />
        </section>
      );
    case "portal-frame":
      return <PortalHero data={data} hero={hero} />;
    case "index-stage":
      return (
        <section className="ph ph--index">
          <header className="ph-ix-head">{brand}<ProNav data={data} /></header>
          <div className="ph-ix-body">
            <div className="ph-ix-list">
              {hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}
              <h1>{hero.title}</h1>
              <ul>{hero.items.map((it, i) => <li key={it.label}><span className="ph-ix-n">{String(i + 1).padStart(2, "0")}</span><b>{it.label}</b>{it.meta && <em>{it.meta}</em>}</li>)}</ul>
            </div>
            <div className="ph-ix-preview">{hero.items.map((it, i) => <img key={i} loading="lazy" src={it.img} alt="" />)}</div>
          </div>
        </section>
      );
  }
}
// portal-frame со scroll-payoff: рамка-окно раскрывается в full-bleed по скроллу (sticky, progress 0..1).
function PortalHero({ data, hero }: { data: Pro; hero: Extract<ProHero, { archetype: "portal-frame" }> }) {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const sticky = el.querySelector<HTMLElement>(".ph-pt-sticky"); if (!sticky) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / Math.max(1, el.offsetHeight - window.innerHeight)));
        sticky.style.setProperty("--sp", p.toFixed(3));
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);
  const brand = <Link href="/visual-hooks/sites" className="pb-brand">{data.brand}</Link>;
  return (
    <div ref={wrap} className="ph-pt-wrap">
      <div className={`ph ph--portal ph-pt-sticky frame-${hero.frame ?? "portrait"}`} {...heroPtr}>
        <div className="ph-pt-bg"><img src={poster(data.slug)} alt="" /></div>
        <header className="ph-pt-head">{brand}<ProNav data={data} /></header>
        <div className="ph-pt-frame-wrap"><div className="ph-pt-frame"><video src={heroVid(data.slug)} poster={hero.portal ?? poster(data.slug)} autoPlay muted loop playsInline /></div></div>
        <div className="ph-pt-copy">{hero.eyebrow && <span className="ph-eyebrow">{hero.eyebrow}</span>}<h1>{hero.title}</h1>{hero.sub && <p>{hero.sub}</p>}</div>
        <div className="ph-pt-cue" aria-hidden>scroll</div>
      </div>
    </div>
  );
}
// кадр блока для плиты мира под лендингом (Backdrop): мир сайта перетекает под текстовыми блоками
function blockImage(b: ProBlock): string | undefined {
  switch (b.t) {
    case "cinematicBand": case "bigNumber": return b.media;
    case "split": case "editorial": return b.img;
    case "diptych": return b.primary;
    case "gallery": return b.items[0]?.img;
    default: return undefined;
  }
}
function ProSite({ data }: { data: Pro }) {
  const hero = resolveHero(data);
  const plates = data.blocks.map((b, i) => ({ at: `[data-pb="${i}"]`, src: blockImage(b) })).filter((p): p is { at: string; src: string } => !!p.src);
  return (
    <div className={`vh-site pro pro-${data.theme}`} data-hero={hero.archetype} data-type={data.typography ?? "editorial"} style={{ isolation: "isolate" }}>
      <ProHeroView hero={hero} data={data} />
      {plates.length > 1 && <Backdrop from={'[data-pb="0"]'} dim={0.86} blur={2} tint="var(--bg)" plates={plates} />}
      {data.blocks.map((b, i) => {
        if (b.t === "cinematicBand" || b.t === "cine") return <div key={i} data-pb={i}><ProBlockView b={b} /></div>;
        // граница акта: вход в доказательство (bigNumber после кино-сцены) и финал (cta) — полоса света
        const prev = data.blocks[i - 1]?.t;
        const seam = (b.t === "bigNumber" && prev === "cinematicBand") || b.t === "cta" ? "color" : "shadow";
        return <div key={i} data-pb={i}><BlockSeam i={i} seam={seam}><ProBlockView b={b} /></BlockSeam></div>;
      })}
      <footer className="pb-foot"><div className="pb-foot-top"><b>{data.brand}</b><p>{data.tagline}</p></div><div className="pb-foot-legal"><span>{data.legal}</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

const g = "/uploads/1/hooks/sites/g/";
const PRO: Record<string, Pro> = {
  iron: { slug: "iron", theme: "iron", brand: "IRON", nav: ["The room", "Coaching", "Join"], tagline: "A small, serious strength gym.", legal: "Iron Room", typography: "grotesk", hero: { archetype: "edge-arrival", edge: "left", eyebrow: "A serious room", title: <>Strong is a<br /><em>quiet room.</em></>, sub: "One rack, no mirrors, no music over your own breathing.", proof: ["1", "rack · no mirrors"] }, blocks: [
    { t: "cinematicBand", media: `${g}iron-lift.jpg`, motif: "halftone", chapters: [{ index: "I", title: <>One rack.<br />No mirrors.</>, body: "Nothing to watch but the bar and your own form.", align: "left" }, { index: "II", title: <>No music over<br />your own breathing.</>, body: "The room stays quiet on purpose.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>Rack — membership capped, never a queue</>, media: `${g}iron-rack.jpg`, note: "Real weight, honest coaching, and a room we keep small so it stays serious." },
    { t: "diptych", primary: `${g}iron-lift.jpg`, secondary: `${g}iron-chalk.jpg`, index: "01", title: <>Strong is a<br /><em>quiet room.</em></>, body: "A gym for the training, not the photo. Come to work, not to be seen.", overlap: "object" },
    { t: "idea", kick: "What Iron is", title: <>A gym for the training,<br /><em>not the photo.</em></>, body: "Real weight, honest coaching, and a room we cap on purpose so the bar is always free and nobody is performing for a phone." },
    { t: "cine", mode: "ember", palette: ["#0d0705", "#5a1e0a", "#e0622e"], title: <>Show up.<br />Lift.<br /><em>Leave.</em></> },
    { t: "stats", items: [["40", "members, capped"], ["2", "coaches, always in"], ["5am–10pm", "open, every day"]], note: "Membership is capped so the room stays yours." },
    { t: "gallery", head: <>The work is <em>the point.</em></>, items: [{ img: `${g}iron-lift.jpg`, cap: "Every session, coached." }, { img: `${g}iron-chalk.jpg`, cap: "Chalk, not filters." }, { img: `${g}iron-rack.jpg`, cap: "The room at dawn." }] },
    { t: "quote", text: "I came to get strong, not to be seen. First gym that let me.", cite: "Marcus D., two years in" },
    { t: "cta", title: <>Come <em>lift.</em></>, body: "A trial week, then a place we hold as long as you use it.", label: "Start a trial" },
  ] },
  botanic: { slug: "botanic", theme: "botanic", brand: "BOTANIC", nav: ["The gin", "Distillery", "Buy"], tagline: "Small-batch botanical gin.", legal: "Botanic Distillery", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "Small-batch gin", title: <>Gin with<br /><em>a garden in it.</em></>, sub: "Distilled in small copper runs, from botanicals we can name.", strip: ["/uploads/1/hooks/sites/botanic.jpg", "/uploads/1/hooks/sites/g/botanic-bots.jpg", "/uploads/1/hooks/sites/g/botanic-serve.jpg", "/uploads/1/hooks/sites/g/botanic-still.jpg", "/uploads/1/hooks/sites/botanic.jpg"] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/botanic-still.jpg", motif: "none", chapters: [{ index: "I", title: <>Distilled in<br />small copper runs.</>, body: "A slow, small run — not an industrial column still.", align: "left" }, { index: "II", title: <>From botanicals<br />we can name.</>, body: "Each one on the label, each one for a reason.", align: "right" }] },
    { t: "bigNumber", value: "12", label: <>botanicals, each named on the label</>, media: "/uploads/1/hooks/sites/g/botanic-bots.jpg", note: "No mystery “natural flavourings” — a real garden, distilled." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/botanic-serve.jpg", secondary: "/uploads/1/hooks/sites/g/botanic-bots.jpg", index: "N°01", title: <>Gin with<br /><em>a garden in it.</em></>, body: "Small-batch, foraged where we can, bottled while it is bright.", overlap: "object" },
    { t: "idea", kick: "What Botanic is", title: <>Gin that tastes<br /><em>of somewhere.</em></>, body: "Twelve botanicals, foraged and grown near the still, redistilled in batches small enough to taste every one. Bright, green, and unmistakably from one place." },
    { t: "split", img: `${g}botanic-bots.jpg`, title: <>Twelve botanicals,<br /><em>each earning its place.</em></>, list: [{ b: "Juniper, grown close", s: "Two valleys over, not shipped in from a sack." }, { b: "Citrus, peeled that morning", s: "Bright and oily, never dried to dust." }, { b: "A little something wild", s: "Foraged, seasonal, and never quite the same twice." }] },
    { t: "editorial", img: `${g}botanic-still.jpg`, title: <>One small still,<br /><em>run slow.</em></>, body: "Batches of a few hundred bottles, cut by taste rather than a spreadsheet." },
    { t: "stats", items: [["12", "botanicals, named"], ["300", "bottles a batch"], ["43%", "the way it should be"]], note: "Figures from the current release." },
    { t: "cta", title: <>Pour <em>a measure.</em></>, body: "A tasting set of three expressions, with the botanicals to nose alongside.", label: "Order a tasting" },
  ] },
  nib: { slug: "nib", theme: "nib", brand: "NIB", nav: ["Pens", "Ink", "Visit"], tagline: "Fountain pens, ink and paper.", legal: "Nib & Co.", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", eyebrow: "Analogue writing", title: <>Words deserve<br />a good tool.</>, sub: "Fountain pens, real ink, and paper worth the fuss — the slow instruments a screen can't replace.", object: "/uploads/1/hooks/sites/nib.jpg", labels: ["Nib", "Ink", "Paper", "Hand"] }, blocks: [
    { t: "cinematicBand", media: `${g}nib-write.jpg`, motif: "halftone", chapters: [{ index: "I", title: <>Ink that<br />dries and stays.</>, body: "A line with weight, laid down slowly on paper worth the fuss.", align: "left" }, { index: "II", title: <>A tool that<br />outlives you.</>, body: "Serviced, refilled, handed on — never thrown away.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>Nib, tuned to your hand and the way you write</>, media: `${g}nib-inks.jpg`, note: "The slow instruments a screen can't replace: pen, ink, paper, hand." },
    { t: "diptych", primary: `${g}nib-paper.jpg`, secondary: `${g}nib-inks.jpg`, index: "N° 01", title: <>Words deserve<br /><em>a good tool.</em></>, body: "A short shelf of things that last: pens that outlive you, inks in colours worth naming.", overlap: "object" },
    { t: "idea", kick: "What Nib is", title: <>A short shelf<br /><em>of things that last.</em></>, body: "Pens that will outlive you, inks in colours worth naming, and the notebooks to spend them on. Nothing here is disposable." },
    { t: "cine", mode: "silk", palette: ["#0a0c12", "#22345e", "#6f9fd8"], title: <>Slow down.<br /><em>Write it by hand.</em></> },
    { t: "split", img: `${g}nib-write.jpg`, title: <>Chosen for<br /><em>your hand.</em></>, list: [{ b: "A nib to match your grip", s: "Fine or broad, wet or dry, matched to how you actually write." }, { b: "Ink worth naming", s: "Colours with depth, shading and a little sheen." }, { b: "Paper that behaves", s: "No feathering, no bleed, a pleasure to drag a nib across." }] },
    { t: "gallery", head: <>The good stuff, <em>up close.</em></>, items: [{ img: `${g}nib-inks.jpg`, cap: "Ink, in colours worth naming." }, { img: `${g}nib-paper.jpg`, cap: "Paper that behaves." }] },
    { t: "quote", text: "I came in for a birthday gift and left writing letters again. That is on them.", cite: "Priya S., regular" },
    { t: "cta", title: <>Find <em>your pen.</em></>, body: "Tell us your hand and your budget. We narrow a wall of pens to three.", label: "Find a pen" },
  ] },
  swell: { slug: "swell", theme: "swell", brand: "SWELL", nav: ["Boards", "The bay", "Order"], tagline: "Hand-shaped surfboards.", legal: "Swell Surf", typography: "fashion", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "Hand-shaped boards", title: <>The ocean keeps<br /><em>no schedule.</em></>, sub: "Boards shaped by hand for the waves you actually ride." }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/swell-wave.jpg", motif: "none", chapters: [{ index: "I", title: <>Shaped by hand<br />for real waves.</>, body: "Blanks read and cut for the water you actually surf.", align: "left" }, { index: "II", title: <>The board<br />you actually ride.</>, body: "Not a rack model — one shaped to you and your bay.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>Board, shaped by hand to your surf and your bay</>, media: "/uploads/1/hooks/sites/g/swell-shape.jpg", note: "The ocean keeps no schedule; the board is made to meet it when it comes." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/swell-shape.jpg", secondary: "/uploads/1/hooks/sites/g/swell-rack.jpg", index: "01", title: <>The ocean keeps<br /><em>no schedule.</em></>, body: "Hand-shaped boards for the waves you actually ride, glassed to last.", overlap: "object" },
    { t: "idea", kick: "What Swell is", title: <>A board shaped<br /><em>to how you surf.</em></>, body: "No pop-outs, no hype models. We watch how you ride, then shape a board to your break, your weight and your bad habits." },
    { t: "cine", mode: "caustics", palette: ["#03141a", "#0a5c6e", "#7fe0e0"], title: <>Made for<br /><em>the wave you get.</em></> },
    { t: "split", img: `${g}swell-shape.jpg`, title: <>Planed by hand,<br /><em>a curl at a time.</em></>, list: [{ b: "Shaped to your break", s: "Beach, point or reef, the outline follows the wave." }, { b: "Foiled to your weight", s: "Foam where you need float, thin where you need bite." }, { b: "Your name in the stringer", s: "One board, signed, built to be surfed for years." }] },
    { t: "gallery", head: <>From blank <em>to break.</em></>, items: [{ img: `${g}swell-rack.jpg`, cap: "The rack, drying." }, { img: `${g}swell-wave.jpg`, cap: "Where it ends up." }] },
    { t: "quote", text: "First board that felt like it read the wave for me. I stopped fighting it by week two.", cite: "Kai M., ordered twice" },
    { t: "cta", title: <>Get <em>shaped.</em></>, body: "A conversation, a few weeks in the bay, and a board with your name in the stringer.", label: "Order a board" },
  ] },
  wick: { slug: "wick", theme: "wick", brand: "WICK", typography: "grotesk", hero: { archetype: "type-collision", object: "/uploads/1/hooks/sites/wick.jpg", eyebrow: "Poured by hand", title: <>SLOWBURN</>, sub: "Poured by hand, scented lightly, made to burn slow." }, nav: ["The range", "Refills", "Shop"], tagline: "Hand-poured candles.", legal: "Wick Studio", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/wick-lit.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Poured<br />by hand.</>, body: "Small pours, scented lightly, cured before they ship.", align: "left" }, { index: "II", title: <>Made to<br />burn slow.</>, body: "A clean, even burn to the last of the wax.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>Wick, one clean pour — scented lightly, burned slow</>, media: "/uploads/1/hooks/sites/g/wick-pour.jpg", note: "Light that smells like a memory, not a fragrance wall — a little scent, or none." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/wick-shelf.jpg", secondary: "/uploads/1/hooks/sites/g/wick-lit.jpg", index: "01", title: <>Light that smells<br /><em>like a memory.</em></>, body: "Hand-poured candles, plainly kept, made to burn slow and clean.", overlap: "object" },
    { t: "idea", kick: "What Wick is", title: <>No headache<br /><em>in a jar.</em></>, body: "Clean wax, restrained scent, and a wick that burns to the bottom without tunnelling. A candle you notice, not one that takes over the room." },
    { t: "steps", head: <>Made slowly, <em>on purpose.</em></>, items: [{ h: "Pour", p: "Small pours of clean wax, scented with a light hand." }, { h: "Cure", p: "Two weeks resting, so the scent settles and the burn stays even." }, { h: "Trim", p: "Cut, wicked and checked by hand before it ships." }] },
    { t: "split", img: `${g}wick-pour.jpg`, title: <>Poured in small<br /><em>batches, by hand.</em></>, list: [{ b: "Clean wax, no soot", s: "Burns clean to the base without a black halo." }, { b: "Scent you can live with", s: "Present in the room, gone from your headache." }, { b: "Refill, keep the vessel", s: "Send the jar back, we pour it again." }] },
    { t: "gallery", head: <>Warm, <em>up close.</em></>, items: [{ img: `${g}wick-lit.jpg`, cap: "Lit, at dusk." }, { img: `${g}wick-shelf.jpg`, cap: "The current range." }] },
    { t: "cta", title: <>Light <em>one.</em></>, body: "A trio to find your scent, then a refill service so the vessel stays.", label: "Shop the range" },
  ] },
  cask: { slug: "cask", theme: "cask", brand: "CASK", nav: ["Releases", "The warehouse", "List"], tagline: "Single-cask, cask-strength whisky.", legal: "Cask & Co.", typography: "fashion", hero: { archetype: "product-theatre", eyebrow: "Single-cask whisky", title: <>Whisky with<br /><em>a birthday.</em></>, sub: "One cask, bottled as it is, at the strength it earned.", object: "/uploads/1/hooks/sites/cask.jpg", depth: "/uploads/1/hooks/sites/g/cask-depth.jpg", proof: [["1", "cask, never blended"], ["cask", "strength, undiluted"], ["1 / 250", "bottles, numbered"]] }, blocks: [
    { t: "idea", kick: "What Cask is", title: <>One barrel,<br /><em>bottled honestly.</em></>, body: "No blending to a house style, no colour added, no water unless you add it. Each release is one cask, and when it is gone it is gone." },
    { t: "cinematicBand", media: `${g}cask-barrels.jpg`, motif: "halftone", chapters: [{ index: "I", title: <>Laid down<br />in the dark.</>, body: "Rolled into the warehouse and forgotten on purpose.", align: "left" }, { index: "II", title: <>Left to the wood<br />and the years.</>, body: "Colour, weight and character, drawn slowly from the oak.", align: "right" }, { index: "III", title: <>One cask.<br />Never again.</>, align: "center" }] },
    { t: "editorial", img: `${g}cask-barrels.jpg`, title: <>It sleeps<br /><em>in the dark for years.</em></>, body: "Laid down in oak and left alone, gaining colour and character from the wood and the years, not from a lab." },
    { t: "bigNumber", value: "58.2%", label: <>ABV as it left the wood — cask strength, undiluted</>, media: `${g}cask-glass.jpg`, note: "Every release carries its own figure on the label. This one asked for no water at all." },
    { t: "diptych", primary: `${g}cask-pour.jpg`, secondary: `${g}cask-glass.jpg`, index: "N°47", title: <>Bottled as it is,<br /><em>numbered by hand.</em></>, body: "Two hundred and fifty bottles from a single cask, each one signed and counted. What you pour is exactly what slept in the wood.", overlap: "object" },
    { t: "gallery", head: <>Poured <em>as it is.</em></>, items: [{ img: `${g}cask-pour.jpg`, cap: "No water added." }, { img: `${g}cask-glass.jpg`, cap: "The colour of the wood." }] },
    { t: "quote", text: "Bought a bottle from cask 47 on a whim. There will never be another exactly like it, and that is the point.", cite: "Hamish G., on the list" },
    { t: "cta", title: <>Claim <em>a bottle.</em></>, body: "New single-cask releases a few times a year, to a short list first.", label: "Join the list" },
  ] },
  clay: { slug: "clay", theme: "clay", brand: "CLAY", nav: ["The batch", "Studio", "Shop"], tagline: "Wheel-thrown tableware.", legal: "Clay Studio", typography: "editorial", hero: { archetype: "hard-split", index: "STUDIO", mediaSide: "left", eyebrow: "Wheel-thrown, one at a time", title: <>Made to be<br /><em>used up.</em></>, sub: "Thrown by hand, fired once, and sold exactly as it came out." }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/clay-wheel.jpg", motif: "none", chapters: [{ index: "I", title: <>Thrown by hand,<br />one at a time.</>, body: "No two are identical, and that is the whole point.", align: "left" }, { index: "II", title: <>Fired once,<br />sold as it came out.</>, body: "No correction, no gloss to hide the maker.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>of one — wheel-thrown, never moulded</>, media: "/uploads/1/hooks/sites/g/clay-hands.jpg", note: "Made to be used up, chipped, and lived with, not displayed." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/clay-wheel.jpg", secondary: "/uploads/1/hooks/sites/g/clay-hands.jpg", index: "01", title: <>Made to be<br /><em>used up.</em></>, body: "Tableware for daily use, thrown and fired in one small studio.", overlap: "object" },
    { t: "idea", kick: "What Clay is", title: <>Pots for<br /><em>every day.</em></>, body: "Small batches, honest glazes, and the odd thumbprint left in on purpose. Made to eat off, every single day, until they break." },
    { t: "split", img: `${g}clay-wheel.jpg`, title: <>Thrown by hand,<br /><em>never quite twice.</em></>, list: [{ b: "One pair of hands", s: "Every piece thrown, trimmed and glazed by the same potter." }, { b: "Honest, food-safe glazes", s: "Earthy, matte, and made to live in a dishwasher." }, { b: "Sold as it came out", s: "Small marks left in, because a hand made it." }] },
    { t: "gallery", head: <>The current <em>batch.</em></>, items: [{ img: `${g}clay-shelf.jpg`, cap: "Fresh from the kiln." }, { img: `${g}clay-wheel.jpg`, cap: "On the wheel." }, { img: `${g}clay-hands.jpg`, cap: "Every piece, by hand." }] },
    { t: "cta", title: <>The next batch is <em>out of the kiln.</em></>, body: "A few dozen pieces, photographed as they are, first come first served.", label: "See the batch" },
  ] },
  stride: { slug: "stride", theme: "stride", brand: "STRIDE", nav: ["The shoe", "Fitting", "Buy"], tagline: "One carefully tuned running shoe.", legal: "Stride Running", typography: "signal", hero: { archetype: "index-stage", eyebrow: "One shoe, done well", title: <>Built for<br />the long run.</>, items: [{ label: "The shoe", meta: "one, refined", img: "/uploads/1/hooks/sites/g/stride-detail.jpg" }, { label: "The road", meta: "1,000 km", img: "/uploads/1/hooks/sites/g/stride-road.jpg" }, { label: "The run", meta: "tuned at dawn", img: "/uploads/1/hooks/sites/g/stride-run.jpg" }, { label: "The fit", meta: "one free resole", img: "/uploads/1/hooks/sites/stride.jpg" }] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/stride-road.jpg", motif: "halftone", chapters: [{ index: "I", title: <>One shoe,<br />tuned for years.</>, body: "We refine a single model instead of launching a new one each season.", align: "left" }, { index: "II", title: <>Not a new model<br />every season.</>, body: "No colourway churn, no gimmick foam.", align: "right" }] },
    { t: "bigNumber", value: "1,000km", label: <>before you feel it go</>, media: "/uploads/1/hooks/sites/g/stride-detail.jpg", note: "Foam that stays steady for a year, not soft for a week." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/stride-run.jpg", secondary: "/uploads/1/hooks/sites/g/stride-detail.jpg", index: "01", title: <>Built for<br /><em>the long run.</em></>, body: "A single road shoe, tuned on real roads, resoled when it wears.", overlap: "object" },
    { t: "idea", kick: "What Stride is", title: <>One shoe,<br /><em>refined for years.</em></>, body: "No colourway churn, no gimmick foam. A single road shoe we tune slowly, resole when it wears, and stand behind past the hype." },
    { t: "split", img: `${g}stride-detail.jpg`, title: <>Every part<br /><em>earns its place.</em></>, list: [{ b: "Foam that lasts a thousand miles", s: "Not the softest for a week, the steadiest for a year." }, { b: "A knit that dries and holds", s: "Locks the foot without cooking it." }, { b: "Resoleable, on purpose", s: "Send them back, we give them a second life." }] },
    { t: "editorial", img: `${g}stride-run.jpg`, title: <>Made for the<br /><em>mile after mile.</em></>, body: "Tuned on real roads at dawn, by people who run further than they market." },
    { t: "stats", items: [["1", "shoe, refined"], ["1,000km", "before you feel it"], ["1", "free resole"]], note: "Illustrative, from long-term wear testing." },
    { t: "cta", title: <>Find <em>your fit.</em></>, body: "A gait check, a size, and a shoe that will still be here next year.", label: "Get fitted" },
  ] },
  plat: { slug: "plat", theme: "plat", brand: "PLAT", nav: ["The room", "An evening", "Book"], tagline: "A twelve-seat tasting kitchen.", legal: "Plat Kitchen", typography: "fashion", hero: { archetype: "edge-arrival", edge: "right", eyebrow: "A twelve-seat kitchen", title: <>A dinner worth<br /><em>the drive.</em></>, sub: "Twelve seats, one sitting, and no menu to choose from.", proof: ["12", "seats · one sitting"] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/plat-room.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Twelve seats,<br />one sitting.</>, body: "One service a night, cooked for the room.", align: "left" }, { index: "II", title: <>No menu<br />to choose from.</>, body: "We cook what the morning market gave us.", align: "right" }] },
    { t: "bigNumber", value: "12", label: <>seats — one long table, one service</>, media: "/uploads/1/hooks/sites/g/plat-dish.jpg", note: "Nothing to choose and nothing to miss; the kitchen paces the night." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/plat-room.jpg", secondary: "/uploads/1/hooks/sites/g/plat-dish.jpg", index: "XII", title: <>A dinner worth<br /><em>the drive.</em></>, body: "A dozen small courses, explained as they land, in a room of twelve.", overlap: "object" },
    { t: "idea", kick: "What Plat is", title: <>One long meal,<br /><em>cooked for the room.</em></>, body: "We cook what the morning market gave us, one sitting at a time, and tell you what each plate is as it lands. There is nothing to choose and nothing to miss." },
    { t: "editorial", img: `${g}plat-room.jpg`, title: <>Twelve seats,<br /><em>one long table.</em></>, body: "Low light, one service a night, and a room small enough that the kitchen cooks for you, not for a hundred." },
    { t: "steps", head: <>How an evening <em>runs.</em></>, items: [{ h: "Arrive", p: "Seven o'clock, all twelve of you, a glass already poured." }, { h: "Eat", p: "A dozen small courses, paced by the kitchen, explained as they land." }, { h: "Stay", p: "No turning the table. The night is yours until it ends." }] },
    { t: "gallery", head: <>Plated <em>to the second.</em></>, items: [{ img: `${g}plat-dish.jpg`, cap: "One of the dozen." }, { img: `${g}plat-chef.jpg`, cap: "Finished at the pass." }] },
    { t: "quote", text: "No menu, no choices, no idea what was coming. Best meal of the year by a mile.", cite: "Sofia L., booked again" },
    { t: "cta", title: <>Take one of the <em>twelve seats.</em></>, body: "Bookings open on the first of the month and go within the hour.", label: "Join the list" },
  ] },
  fetch: { slug: "fetch", theme: "fetch", brand: "FETCH", nav: ["The box", "What's inside", "Start"], tagline: "A considered box for one specific dog.", legal: "Fetch Pet", typography: "grotesk", hero: { archetype: "product-theatre", eyebrow: "For one specific dog", title: <>Everything your dog<br /><em>would order.</em></>, sub: "A monthly box packed to your dog, not the average of all dogs.", object: "/uploads/1/hooks/sites/fetch.jpg", depth: "/uploads/1/hooks/sites/g/fetch-depth.jpg", proof: [["4", "questions, one box"], ["monthly", "before the bag runs out"], ["1 dog", "not the average"]] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/fetch-portrait.jpg", motif: "none", chapters: [{ index: "I", title: <>Packed to your dog,<br />not the average.</>, body: "Breed, age, belly and habits — the box is built to that answer.", align: "left" }, { index: "II", title: <>Vet-checked,<br />honestly sourced.</>, body: "Real food and gear, posted before the bag runs out.", align: "right" }] },
    { t: "bigNumber", value: "4", label: <>questions, then a box built for one dog</>, media: "/uploads/1/hooks/sites/g/fetch-bowl.jpg", note: "No plastic filler, no average-of-all-dogs guesswork." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/fetch-portrait.jpg", secondary: "/uploads/1/hooks/sites/g/fetch-play.jpg", index: "01", title: <>Everything your dog<br /><em>would order.</em></>, body: "A monthly box for one specific dog, matched and delivered.", overlap: "object" },
    { t: "idea", kick: "What Fetch is", title: <>A box packed<br /><em>to one dog.</em></>, body: "Tell us the breed, the age, the belly and the habits. We pack food, chews and gear for that dog and post it before the bag runs out. No plastic filler, no average-of-all-dogs guesswork." },
    { t: "cine", mode: "ember", palette: ["#0d0603", "#5a2a12", "#ffb060"], title: <>Made for the<br /><em>good ones.</em></> },
    { t: "gallery", head: <>What lands on <em>the mat.</em></>, items: [{ img: `${g}fetch-portrait.jpg`, cap: "One dog, one box." }, { img: `${g}fetch-bowl.jpg`, cap: "Food, honestly sourced." }, { img: `${g}fetch-play.jpg`, cap: "Gear that survives them." }] },
    { t: "steps", head: <>How the box <em>gets built.</em></>, items: [{ h: "Tell us", p: "Four questions about your dog, ninety seconds." }, { h: "We pack", p: "Vet-checked food and gear matched to that answer." }, { h: "It arrives", p: "Monthly, timed before the last bag runs out." }] },
    { t: "cta", title: <>Build <em>their box.</em></>, body: "Answer four questions. We do the rest, every month.", label: "Build a box" },
  ] },
  stem: { slug: "stem", theme: "stem", brand: "STEM", nav: ["The idea", "Our work", "Send"], tagline: "Considered floristry, made to say something.", legal: "Stem Floral", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "Flowers, with intent", title: <>Flowers that say<br /><em>the hard things.</em></>, sub: "Considered arrangements for the moments words keep falling short of.", strip: ["/uploads/1/hooks/sites/stem.jpg", "/uploads/1/hooks/sites/g/stem-bouquet.jpg", "/uploads/1/hooks/sites/g/stem-arrange.jpg", "/uploads/1/hooks/sites/g/stem-shop.jpg", "/uploads/1/hooks/sites/g/stem-bouquet.jpg"] }, blocks: [
    { t: "cinematicBand", media: `${g}stem-arrange.jpg`, chapters: [{ index: "I", title: <>Arranged by hand,<br />stem by stem.</>, body: "One florist, one table, one arrangement at a time.", align: "left" }, { index: "II", title: <>Made to a feeling,<br />not a catalogue.</>, body: "You describe the person; we translate it to stems.", align: "right" }] },
    { t: "bigNumber", value: "0", label: <>Bouquets by the dozen — every arrangement is one of one</>, media: `${g}stem-bouquet.jpg`, note: "For the moments words keep falling short of. Same-day in the city, never from a shelf." },
    { t: "diptych", primary: `${g}stem-bouquet.jpg`, secondary: `${g}stem-shop.jpg`, index: "N°1", title: <>Flowers that say<br /><em>the hard things.</em></>, body: "Seasonal, always, and never forced — we work with what is genuinely good this week.", overlap: "object" },
    { t: "idea", kick: "What Stem is", title: <>Not bouquets<br /><em>by the dozen.</em></>, body: "Tell us the person and the occasion, and we arrange something that means exactly that — never pulled from a catalogue, never the same twice. Flowers for the moments that are hard to put into words." },
    { t: "editorial", img: `${g}stem-arrange.jpg`, title: <>Arranged by hand,<br /><em>stem by stem.</em></>, body: "One florist, one table, one arrangement at a time — the way it holds together is the whole point." },
    { t: "split", img: `${g}stem-bouquet.jpg`, title: <>Seasonal, always,<br /><em>and never forced.</em></>, list: [{ b: "What the season gives", s: "We work with what is genuinely good this week." }, { b: "Made to a feeling", s: "You describe the person; we translate it to stems." }, { b: "Same-day in the city", s: "Ordered by noon, on the table by evening." }] },
    { t: "quote", text: "I said 'she's leaving a job she loved and is terrified.' What arrived said exactly that. I don't know how.", cite: "Marcus T., sent again" },
    { t: "cta", title: <>Say it with <em>stems.</em></>, body: "Same-day in the city, considered and never from a catalogue.", label: "Send flowers" },
  ] },
  thread: { slug: "thread", theme: "thread", brand: "THREAD", nav: ["The cloth", "The fitting", "Book"], tagline: "Made-to-measure tailoring.", legal: "Thread Tailors", typography: "grotesk", hero: { archetype: "hard-split", index: "01 / MTM", eyebrow: "Made to measure", title: <>A SUIT<br />THAT<br /><em>remembers<br />you.</em></>, sub: "One cloth, one fitting, and a pattern we keep on file for life.", mediaSide: "right" }, blocks: [
    { t: "cinematicBand", media: `${g}thread-fitting.jpg`, motif: "halftone", chapters: [{ index: "I", title: <>Measured,<br />not guessed.</>, body: "Chalk, pins and a tape read your posture, not just your chest.", align: "left" }, { index: "II", title: <>One cloth,<br />one pattern on file.</>, body: "A second suit needs only a phone call.", align: "right" }] },
    { t: "bigNumber", value: "∞", label: <>Repairs, for as long as you own the suit</>, media: `${g}thread-detail.jpg`, note: "Wear it hard, bring it back. A made-to-measure suit is a relationship, not a purchase." },
    { t: "diptych", primary: `${g}thread-cloth.jpg`, secondary: `${g}thread-detail.jpg`, index: "MTM", title: <>Cut to your measure,<br /><em>kept in repair.</em></>, body: "You choose one cloth; we cut it to your exact body and keep the pattern for life.", overlap: "object" },
    { t: "idea", kick: "What Thread is", title: <>Cut once,<br /><em>kept in repair for life.</em></>, body: "You choose one cloth. We cut it to your exact measure and keep the pattern on file. Wear it hard, bring it back, and we make it right for as long as you own it — a suit is a relationship, not a purchase." },
    { t: "split", img: `${g}thread-cloth.jpg`, title: <>It starts with<br /><em>the cloth.</em></>, list: [{ b: "Mills we can name", s: "English and Italian wools, chosen by weight and season." }, { b: "One length, one suit", s: "Cut for your body, never graded off a size chart." }, { b: "A pattern on file", s: "A second suit needs only a phone call." }] },
    { t: "editorial", img: `${g}thread-fitting.jpg`, title: <>An hour with<br /><em>a tape measure.</em></>, body: "Chalk, pins and a mirror. We read your posture, not just your chest, and adjust until it hangs like it was grown on you." },
    { t: "gallery", head: <>In the <em>details.</em></>, items: [{ img: `${g}thread-detail.jpg`, cap: "Hand-stitched, where it counts." }, { img: `${g}thread-cloth.jpg`, cap: "The cloth you chose." }] },
    { t: "stats", items: [["1", "cloth, your choice"], ["4wk", "to first fitting"], ["∞", "repairs, on us"]], note: "Illustrative of the made-to-measure service." },
    { t: "cta", title: <>Start with <em>a fitting.</em></>, body: "An hour, a tape measure, and a cloth you will still love in ten years.", label: "Book a fitting" },
  ] },
  barb: { slug: "barb", theme: "barb", brand: "BARB", nav: ["The chair", "An hour", "Book"], tagline: "A one-chair barbershop.", legal: "Barb & Co.", typography: "signal", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "One chair, no rush", title: <>A proper cut<br /><em>takes its time.</em></>, sub: "One chair, one barber, and a hot towel at the end." }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/barb-chair.jpg", motif: "halftone", chapters: [{ index: "I", title: <>One chair,<br />all of the hour.</>, body: "No queue, no clippers on a conveyor belt.", align: "left" }, { index: "II", title: <>A hot towel<br />to finish.</>, body: "Because the end of it should feel like something.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>chair — one head at a time, never two</>, media: "/uploads/1/hooks/sites/g/barb-cut.jpg", note: "You get the chair, the hour, and a cut that grows out well." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/barb-chair.jpg", secondary: "/uploads/1/hooks/sites/g/barb-cut.jpg", index: "01", title: <>A proper cut<br /><em>takes its time.</em></>, body: "One seat by the window and a barber who has time to get it right.", overlap: "object" },
    { t: "idea", kick: "What Barb is", title: <>One chair,<br /><em>and all of the hour.</em></>, body: "No queue, no clippers on a conveyor belt, no next-please. You get the chair, the hour, the conversation optional, and a cut that grows out as well as it goes on." },
    { t: "editorial", img: `${g}barb-chair.jpg`, title: <>The chair<br /><em>is the whole shop.</em></>, body: "One seat by the window, morning light, and a barber who has time to get it exactly right." },
    { t: "split", img: `${g}barb-cut.jpg`, rev: true, title: <>Cut to grow<br /><em>out well.</em></>, list: [{ b: "Scissor over comb", s: "Slower, sharper, and kinder to how it grows." }, { b: "The hour is yours", s: "We book one head at a time, never two." }, { b: "A hot towel to finish", s: "Because the end of it should feel like something." }] },
    { t: "cine", mode: "ember", palette: ["#0c0704", "#5a3010", "#e6a24a"], title: <>Sit down.<br /><em>Take the hour.</em></> },
    { t: "cta", title: <>Sit in <em>the chair.</em></>, body: "Standing appointments for regulars, a short waitlist for everyone else.", label: "Book the chair" },
  ] },
  steep: { slug: "steep", theme: "steep", brand: "STEEP", nav: ["The leaf", "The garden", "Taste"], tagline: "Whole-leaf tea from named gardens.", legal: "Steep Tea", typography: "fashion", hero: { archetype: "regime-shift", index: "N° 01 / 04", eyebrow: "Whole-leaf tea", title: <>Tea, given<br /><em>its time.</em></>, sub: "Whole leaf from named gardens, timed to the second and poured slowly.", object: "/uploads/1/hooks/sites/steep.jpg", labels: ["Leaf", "Water", "Minutes", "Garden"] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/steep-garden.jpg", motif: "none", chapters: [{ index: "I", title: <>It begins on<br />a hillside.</>, body: "Terraced gardens, picked by hand at altitude.", align: "left" }, { index: "II", title: <>Whole leaf,<br />nothing broken.</>, body: "Single-origin, with the harvest on the tin.", align: "right" }] },
    { t: "bigNumber", value: "4", label: <>named gardens — single-origin, dated by harvest</>, media: "/uploads/1/hooks/sites/g/steep-leaf.jpg", note: "Bagged tea is broken leaf brewed in ninety seconds of impatience." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/steep-garden.jpg", secondary: "/uploads/1/hooks/sites/g/steep-leaf.jpg", index: "N°01", title: <>Tea, given<br /><em>its time.</em></>, body: "Whole leaf, the right heat and minutes, printed, not guessed.", overlap: "object" },
    { t: "idea", kick: "What Steep is", title: <>Not dust<br /><em>in a hurry.</em></>, body: "Bagged tea is broken leaf brewed in ninety seconds of impatience. Ours is whole leaf from gardens we can name, with the water temperature and the minutes it actually asks for printed on every tin." },
    { t: "editorial", img: `${g}steep-garden.jpg`, title: <>It begins on<br /><em>a hillside.</em></>, body: "Terraced gardens picked by hand at altitude, where the mist and the slow growth do most of the work before we ever touch it." },
    { t: "split", img: `${g}steep-leaf.jpg`, title: <>Whole leaf,<br /><em>nothing broken.</em></>, list: [{ b: "Named gardens, named years", s: "Single-origin, with the harvest on the tin." }, { b: "Brewed the way it asks", s: "The right heat and minutes, printed, not guessed." }, { b: "It unfurls in the pot", s: "Watch it open — that is what whole leaf means." }] },
    { t: "gallery", head: <>Poured <em>slowly.</em></>, items: [{ img: `${g}steep-pour.jpg`, cap: "Given its minutes." }, { img: `${g}steep-leaf.jpg`, cap: "Whole, always." }] },
    { t: "cta", title: <>Find <em>your leaf.</em></>, body: "A short flight of samples, chosen to how you take your morning.", label: "Start tasting" },
  ] },
  loaf: { slug: "loaf", theme: "loaf", brand: "LOAF", nav: ["The bake", "The crumb", "Reserve"], tagline: "Wood-fired sourdough, baked daily.", legal: "Loaf Bakery", typography: "grotesk", hero: { archetype: "type-collision", eyebrow: "Wild yeast, wood fire", title: <>SOURDOUGH</>, sub: "Wild yeast, a long slow proof, and a wood fire at dawn.", object: "/uploads/1/hooks/sites/loaf.jpg" }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/loaf-oven.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Wild yeast,<br />wood fire.</>, body: "A long overnight proof and a wood fire at dawn.", align: "left" }, { index: "II", title: <>Sour, dark,<br />and alive.</>, body: "The way bread was before it came wrapped in plastic.", align: "right" }] },
    { t: "bigNumber", value: "0", label: <>added — flour, water, salt, and time, that is the list</>, media: "/uploads/1/hooks/sites/g/loaf-crumb.jpg", note: "We bake a few hundred a day and stop when they are gone." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/loaf-oven.jpg", secondary: "/uploads/1/hooks/sites/g/loaf-crumb.jpg", index: "01", title: <>Bread worth<br /><em>getting up for.</em></>, body: "Wood-fired sourdough, an open crumb and a dark blistered crust.", overlap: "object" },
    { t: "idea", kick: "What Loaf is", title: <>The way bread was<br /><em>before the plastic.</em></>, body: "We bake a few hundred loaves a day and stop when they are gone. Wild yeast, a proof that takes its time overnight, and a wood fire at dawn. Sour, dark and alive — nothing you can buy wrapped." },
    { t: "cine", mode: "ember", palette: ["#0d0703", "#5e2c0e", "#f0a23a"], title: <>Fired<br /><em>at dawn.</em></> },
    { t: "split", img: `${g}loaf-crumb.jpg`, rev: true, title: <>Read it<br /><em>by the crumb.</em></>, list: [{ b: "An open, airy crumb", s: "The mark of a long, patient proof." }, { b: "A dark blistered crust", s: "The wood fire does what a home oven can't." }, { b: "Three ingredients", s: "Flour, water, salt, and time. That's the whole list." }] },
    { t: "gallery", head: <>From <em>the fire.</em></>, items: [{ img: `${g}loaf-oven.jpg`, cap: "Into the wood fire." }, { img: `${g}loaf-shelf.jpg`, cap: "Cooling, briefly." }] },
    { t: "quote", text: "I set an alarm for a loaf of bread now. Worth every minute of lost sleep.", cite: "Elena K., every Saturday" },
    { t: "cta", title: <>Reserve <em>tomorrow's loaf.</em></>, body: "Order the night before, collect it while it is still warm.", label: "Reserve a loaf" },
  ] },
  velo: { slug: "velo", theme: "velo", brand: "VÉLO", nav: ["The frame", "The build", "Start"], tagline: "Made-to-measure steel bicycles.", legal: "Vélo Cycles", typography: "signal", hero: { archetype: "index-stage", eyebrow: "Made-to-measure steel", title: <>One bike,<br />built around you.</>, items: [{ label: "The frame", meta: "steel, brazed", img: "/uploads/1/hooks/sites/g/velo-frame.jpg" }, { label: "The build", meta: "≈ 4 months", img: "/uploads/1/hooks/sites/g/velo-braze.jpg" }, { label: "The ride", meta: "30 years", img: "/uploads/1/hooks/sites/g/velo-ride.jpg" }, { label: "The fit", meta: "your geometry", img: "/uploads/1/hooks/sites/velo.jpg" }] }, blocks: [
    { t: "cinematicBand", media: `${g}velo-braze.jpg`, motif: "halftone", chapters: [{ index: "I", title: <>Brazed by<br />one pair of hands.</>, body: "Lug by lug, brass drawn into the joint by heat and patience.", align: "left" }, { index: "II", title: <>Steel, because<br />it lasts.</>, body: "It bends before it breaks, and can always be brought back.", align: "right" }] },
    { t: "bigNumber", value: "30yr", label: <>And still yours — steel outlives the trend</>, media: `${g}velo-ride.jpg`, note: "The person who measures you is the person who builds it. A bike for a lifetime, not a season." },
    { t: "diptych", primary: `${g}velo-frame.jpg`, secondary: `${g}velo-braze.jpg`, index: "01", title: <>Measured to your body,<br /><em>not a size chart.</em></>, body: "Every tube length is yours, cut and brazed around your fit, your roads and your ambitions.", overlap: "object" },
    { t: "idea", kick: "What Vélo is", title: <>Measured to your body,<br /><em>not a size chart.</em></>, body: "We take your fit, your roads and your ambitions, then cut and braze a steel frame around them. No stock sizes, no carbon that cracks in five years — a bike that will still be yours in thirty." },
    { t: "editorial", img: `${g}velo-braze.jpg`, title: <>Brazed by<br /><em>one pair of hands.</em></>, body: "Lug by lug, brass drawn into the joint by heat and patience. The person who measures you is the person who builds it." },
    { t: "split", img: `${g}velo-frame.jpg`, title: <>Steel, because<br /><em>it lasts.</em></>, list: [{ b: "Cut to your fit", s: "Every tube length is yours, not graded from a range." }, { b: "Repairable forever", s: "Steel bends before it breaks, and can be brought back." }, { b: "A ride that softens the road", s: "The reason people never sell them." }] },
    { t: "gallery", head: <>Made to <em>be ridden.</em></>, items: [{ img: `${g}velo-ride.jpg`, cap: "Where it belongs." }, { img: `${g}velo-frame.jpg`, cap: "Raw, before paint." }] },
    { t: "stats", items: [["1", "frame, your geometry"], ["~4mo", "from fit to first ride"], ["30yr", "and still yours"]], note: "Illustrative of the made-to-measure build." },
    { t: "cta", title: <>Start a <em>build.</em></>, body: "A fitting, a conversation, and a wait of about four months for a bike that lasts a lifetime.", label: "Book a fitting" },
  ] },
  balm: { slug: "balm", theme: "balm", brand: "BALM", nav: ["The room", "The hour", "Book"], tagline: "A single-room day spa.", legal: "Balm Spa", typography: "fashion", hero: { archetype: "edge-arrival", edge: "left", eyebrow: "An hour, for you", title: <>An hour that<br /><em>undoes the week.</em></>, sub: "Steam, stone and silence, in hands that know the way.", proof: ["1", "room · one guest"] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/balm-room.jpg", motif: "halftone", chapters: [{ index: "I", title: <>One room,<br />one guest.</>, body: "Warm low light, a single table, a door that stays closed.", align: "left" }, { index: "II", title: <>Silence,<br />if you want it.</>, body: "No small talk unless you start it, no clock you can feel.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>room, one guest — the hour is only yours</>, media: "/uploads/1/hooks/sites/g/balm-stones.jpg", note: "No upsells, no playlist you did not choose, no package to buy up into." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/balm-room.jpg", secondary: "/uploads/1/hooks/sites/g/balm-stones.jpg", index: "01", title: <>An hour that<br /><em>undoes the week.</em></>, body: "Steam, stone and silence, in hands that know the way.", overlap: "object" },
    { t: "idea", kick: "What Balm is", title: <>No upsells,<br /><em>no playlist you didn't choose.</em></>, body: "One room, one guest at a time, and no talking unless you want it. No package to buy up into, no clock you can feel ticking. Just an hour built, quietly, to put you back together." },
    { t: "cine", mode: "silk", palette: ["#0a0810", "#3a2a4a", "#d0a8c0"], title: <>Steam, stone,<br /><em>and silence.</em></> },
    { t: "editorial", img: `${g}balm-room.jpg`, title: <>One room,<br /><em>one guest.</em></>, body: "Warm low light, a single table, and a door that stays closed. The whole space is yours for the hour." },
    { t: "split", img: `${g}balm-stones.jpg`, rev: true, title: <>Warmth that<br /><em>reaches deep.</em></>, list: [{ b: "Hot stone and steam", s: "Heat that loosens what the week tightened." }, { b: "Hands that know the way", s: "One therapist, trained, unhurried." }, { b: "Silence, if you want it", s: "No small talk unless you start it." }] },
    { t: "cta", title: <>Book <em>the hour.</em></>, body: "Mornings are quietest. We keep a few late slots for the truly wrung out.", label: "Book an hour" },
  ] },
  fern: { slug: "fern", theme: "fern", brand: "FERN", nav: ["The idea", "The plants", "Match"], tagline: "The right plant for your light.", legal: "Fern & Light", typography: "editorial", hero: { archetype: "product-theatre", eyebrow: "Plants, placed well", title: <>Plants that make<br /><em>a room breathe.</em></>, sub: "Chosen for your actual light, delivered already thriving.", object: "/uploads/1/hooks/sites/fern.jpg", depth: "/uploads/1/hooks/sites/g/fern-depth.jpg", proof: [["1", "photo of your room"], ["3", "plants that will live"], ["optional", "we keep them alive"]] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/fern-room.jpg", motif: "none", chapters: [{ index: "I", title: <>Matched to<br />your actual light.</>, body: "Send us your room; we match a plant to the light it really gets.", align: "left" }, { index: "II", title: <>Delivered<br />already thriving.</>, body: "Settled, healthy, and kept alive with a visit if you like.", align: "right" }] },
    { t: "bigNumber", value: "3", label: <>plants that will genuinely live where you put them</>, media: "/uploads/1/hooks/sites/g/fern-leaf.jpg", note: "Most plants die because they were bought for a photo, not a window." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/fern-room.jpg", secondary: "/uploads/1/hooks/sites/g/fern-shelf.jpg", index: "01", title: <>Plants that make<br /><em>a room breathe.</em></>, body: "The right green in the right corner, chosen for your light.", overlap: "object" },
    { t: "idea", kick: "What Fern is", title: <>Matched to your light,<br /><em>not your Pinterest.</em></>, body: "Most plants die because they were bought for a photo, not a window. Send us your room and we match a plant to the light it actually gets, deliver it settled, and keep it alive with a visit if you would rather not." },
    { t: "editorial", img: `${g}fern-room.jpg`, title: <>A room that<br /><em>breathes.</em></>, body: "The right green in the right corner changes a whole space — quieter, softer, alive in a way furniture never is." },
    { t: "gallery", head: <>Chosen, <em>placed, kept.</em></>, items: [{ img: `${g}fern-leaf.jpg`, cap: "Delivered thriving." }, { img: `${g}fern-shelf.jpg`, cap: "Placed for the light." }, { img: `${g}fern-room.jpg`, cap: "The room, after." }] },
    { t: "steps", head: <>How the match <em>works.</em></>, items: [{ h: "Send a photo", p: "Your room, your window, the light as it really is." }, { h: "We match three", p: "Plants that will genuinely live where you'll put them." }, { h: "We keep them", p: "An optional visit, so you never have to guess." }] },
    { t: "cta", title: <>Green <em>the room.</em></>, body: "Send us a photo of your space. We reply with three plants that will live.", label: "Get matched" },
  ] },
  cacao: { slug: "cacao", theme: "cacao", brand: "CACAO", nav: ["The bean", "The bar", "Taste"], tagline: "Single-origin bean-to-bar chocolate.", legal: "Cacao Bar", typography: "grotesk", hero: { archetype: "gallery-horizon", eyebrow: "Single-origin chocolate", title: <>Chocolate, read<br /><em>like wine.</em></>, sub: "One origin, one roast, and nothing hidden in the bar.", strip: ["/uploads/1/hooks/sites/cacao.jpg", "/uploads/1/hooks/sites/g/cacao-bar.jpg", "/uploads/1/hooks/sites/g/cacao-bean.jpg", "/uploads/1/hooks/sites/g/cacao-pour.jpg", "/uploads/1/hooks/sites/cacao.jpg"] }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/cacao-bean.jpg", motif: "halftone", chapters: [{ index: "I", title: <>One origin,<br />one roast.</>, body: "A single farm, a single roast, tuned to this harvest.", align: "left" }, { index: "II", title: <>Nothing hidden<br />in the bar.</>, body: "Two ingredients, no emulsifiers, no vanilla to paper over it.", align: "right" }] },
    { t: "bigNumber", value: "2", label: <>ingredients, one named farm, one year</>, media: "/uploads/1/hooks/sites/g/cacao-bar.jpg", note: "A flavour that changes with the harvest — so we print the year." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/cacao-bar.jpg", secondary: "/uploads/1/hooks/sites/g/cacao-pour.jpg", index: "N°01", title: <>Chocolate, read<br /><em>like wine.</em></>, body: "Single-origin bean-to-bar, tempered by hand and poured thin.", overlap: "object" },
    { t: "idea", kick: "What Cacao is", title: <>Two ingredients,<br /><em>one named farm.</em></>, body: "Not a blend engineered to taste the same forever. A single origin, a single roast, and a flavour that shifts with the harvest — so we print the farm, the batch and the year, because they are the whole point." },
    { t: "cine", mode: "ember", palette: ["#0c0603", "#4a2410", "#c98a4a"], title: <>Read it<br /><em>like wine.</em></> },
    { t: "split", img: `${g}cacao-bean.jpg`, title: <>It starts<br /><em>at the farm.</em></>, list: [{ b: "A farm we can name", s: "Single-origin, traceable to the grower." }, { b: "Roasted for the bean", s: "One roast profile, tuned to this harvest." }, { b: "The year on the wrapper", s: "Because a 2024 does not taste like a 2023." }] },
    { t: "editorial", img: `${g}cacao-pour.jpg`, title: <>Nothing hidden<br /><em>in the bar.</em></>, body: "Two ingredients, tempered by hand, poured thin. No emulsifiers, no vanilla to paper over the origin." },
    { t: "cta", title: <>Taste <em>the origin.</em></>, body: "A flight of four bars from four farms, with the notes to read them by.", label: "Order a flight" },
  ] },
  hide: { slug: "hide", theme: "hide", brand: "HIDE", nav: ["The idea", "The line", "Carry"], tagline: "Vegetable-tanned leather goods.", legal: "Hide & Grain", typography: "fashion", hero: { archetype: "hard-split", index: "01 / VG-TAN", mediaSide: "right", eyebrow: "Full-grain leather", title: <>Leather that<br /><em>earns its scars.</em></>, sub: "Cut from one hide, stitched to outlast the trend." }, blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/hide-bench.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Cut from<br />one hide.</>, body: "Vegetable-tanned, edged and burnished by hand at one bench.", align: "left" }, { index: "II", title: <>Saddle-stitched<br />to last.</>, body: "Two needles, one seam, a stitch that holds even cut.", align: "right" }] },
    { t: "bigNumber", value: "20yr", label: <>and better for the years — a repair promise for life</>, media: "/uploads/1/hooks/sites/g/hide-stitch.jpg", note: "Buy one bag and carry it for decades; send it back for repair." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/hide-bag.jpg", secondary: "/uploads/1/hooks/sites/g/hide-stitch.jpg", index: "01", title: <>Leather that<br /><em>earns its scars.</em></>, body: "Full-grain leather that ages into a patina instead of cracking.", overlap: "object" },
    { t: "idea", kick: "What Hide is", title: <>Buy one bag,<br /><em>carry it twenty years.</em></>, body: "Vegetable-tanned, saddle-stitched, and built to look better the harder you use it. Not a season's accessory — a single object that scuffs into a patina and comes back to us for repair instead of the bin." },
    { t: "editorial", img: `${g}hide-bench.jpg`, title: <>Made at<br /><em>one bench.</em></>, body: "Cut, edged, stitched and burnished by hand, by someone whose name is on the repair ticket twenty years from now." },
    { t: "split", img: `${g}hide-stitch.jpg`, title: <>Saddle-stitched,<br /><em>so it can't unravel.</em></>, list: [{ b: "Two needles, one seam", s: "A stitch that holds even if the thread is cut." }, { b: "Vegetable-tanned hide", s: "Ages into a patina instead of cracking." }, { b: "A repair promise", s: "Send it back; we make it right, for life." }] },
    { t: "gallery", head: <>Made to <em>be used.</em></>, items: [{ img: `${g}hide-bag.jpg`, cap: "One bag, made to order." }, { img: `${g}hide-stitch.jpg`, cap: "The seam that lasts." }] },
    { t: "cta", title: <>Carry <em>one thing.</em></>, body: "A short line of bags, made to order, each with a repair promise.", label: "See the line" },
  ] },
  spice: { slug: "spice", theme: "spice", brand: "SPICE", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", object: "/uploads/1/hooks/sites/spice.jpg", labels: ["Whole", "Dated", "Ground fresh", "In season"], eyebrow: "Whole spice, dated", title: <>Spice bought<br /><em>like it matters.</em></>, sub: "Whole, recent, and ground the day you cook." }, nav: ["The idea", "The shelf", "Stock"], tagline: "Whole spices, freshly harvested.", legal: "Spice Merchant", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/spice-jars.jpg", motif: "none", chapters: [{ index: "I", title: <>Whole,<br />never pre-ground.</>, body: "The oils that make a spice a spice go within weeks of grinding.", align: "left" }, { index: "II", title: <>Dated,<br />bought in season.</>, body: "A harvest date on every tin, so you know how fresh it is.", align: "right" }] },
    { t: "bigNumber", value: "0", label: <>pre-ground jars — whole spice only, dated</>, media: "/uploads/1/hooks/sites/g/spice-scoop.jpg", note: "Grind the day you cook and your kitchen smells of the thing itself." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/spice-jars.jpg", secondary: "/uploads/1/hooks/sites/g/spice-scoop.jpg", index: "N°01", title: <>Spice bought<br /><em>like it matters.</em></>, body: "Whole spice from named sources, with the harvest date on the tin.", overlap: "object" },
    { t: "idea", kick: "What Spice is", title: <>Pre-ground is<br /><em>a ghost of itself.</em></>, body: "The oils that make a spice a spice are gone within weeks of grinding. Ours arrives whole, with a harvest date printed on the tin, so your kitchen smells of the thing itself and not of dust from a jar of unknown age." },
    { t: "cine", mode: "ember", palette: ["#0e0703", "#5e2810", "#e08a3a"], title: <>The smell of<br /><em>the real thing.</em></> },
    { t: "split", img: `${g}spice-jars.jpg`, rev: true, title: <>Whole,<br /><em>and dated.</em></>, list: [{ b: "A harvest date on every tin", s: "You know exactly how fresh it is." }, { b: "Whole, never pre-ground", s: "Grind the day you cook, keep the oils." }, { b: "Sourced by the season", s: "Bought when and where it is actually best." }] },
    { t: "gallery", head: <>From jar <em>to mortar.</em></>, items: [{ img: `${g}spice-scoop.jpg`, cap: "Scooped, not sachet." }, { img: `${g}spice-grind.jpg`, cap: "Ground when you cook." }] },
    { t: "cta", title: <>Stock <em>the shelf.</em></>, body: "A starter set of the ten you actually reach for, whole and dated.", label: "Build a shelf" },
  ] },
  comb: { slug: "comb", theme: "comb", brand: "COMB", typography: "editorial", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "Raw single-hive honey", title: <>Honey with<br /><em>a postcode.</em></>, sub: "Raw, unblended, and different from every hive." }, nav: ["The idea", "The hive", "Taste"], tagline: "Raw honey, one hive at a time.", legal: "Comb Apiary", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/comb-frame.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Raw,<br />from one hive.</>, body: "Unheated, unfiltered, unblended — the character left in.", align: "left" }, { index: "II", title: <>Different<br />every jar.</>, body: "Each tastes of the fields one colony actually flew.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>Hive per jar — single-origin, never blended</>, media: "/uploads/1/hooks/sites/g/comb-drip.jpg", note: "Supermarket honey is warmed, filtered flat and blended to taste the same all year." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/comb-jar.jpg", secondary: "/uploads/1/hooks/sites/g/comb-drip.jpg", index: "N°01", title: <>Honey with<br /><em>a postcode.</em></>, body: "Raw single-hive honey you can taste the fields in — a trio from three sites.", overlap: "object" },
    { t: "idea", kick: "What Comb is", title: <>We don't blend<br /><em>the character out.</em></>, body: "Supermarket honey is warmed, filtered flat and blended to taste the same all year. We do none of that. Each jar is raw, from one colony, and tastes of the exact fields those bees actually flew — a postcode you can taste." },
    { t: "cine", mode: "ember", palette: ["#0e0803", "#5e3a08", "#f0b030"], title: <>The fields<br /><em>one hive flew.</em></> },
    { t: "split", img: `${g}comb-frame.jpg`, title: <>One colony,<br /><em>one jar.</em></>, list: [{ b: "Raw and unheated", s: "The enzymes and aroma survive the jar." }, { b: "Single-hive, never blended", s: "Character intact, not averaged away." }, { b: "A taste that moves", s: "Spring and late summer are different honeys." }] },
    { t: "gallery", head: <>Straight from <em>the comb.</em></>, items: [{ img: `${g}comb-jar.jpg`, cap: "Raw, with the comb." }, { img: `${g}comb-drip.jpg`, cap: "Slow and golden." }] },
    { t: "cta", title: <>Find <em>your hive.</em></>, body: "A trio from three sites, so you can taste what a mile does.", label: "Taste the trio" },
  ] },
  grove: { slug: "grove", theme: "grove", brand: "GROVE", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "New-harvest olive oil", title: <>Oil pressed<br /><em>the week it's picked.</em></>, sub: "One grove, one pressing, dated like it should be.", strip: ["/uploads/1/hooks/sites/grove.jpg", "/uploads/1/hooks/sites/g/grove-tree.jpg", "/uploads/1/hooks/sites/g/grove-bottle.jpg", "/uploads/1/hooks/sites/g/grove-pour.jpg", "/uploads/1/hooks/sites/grove.jpg"] }, nav: ["The idea", "The grove", "Order"], tagline: "Single-grove, new-harvest olive oil.", legal: "Grove Oil", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/grove-tree.jpg", motif: "none", chapters: [{ index: "I", title: <>One grove,<br />one pressing.</>, body: "Old trees on a single hillside, picked and milled together.", align: "left" }, { index: "II", title: <>Green, sharp,<br />and dated.</>, body: "Milled within hours, sent while it is still peppery.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>hillside, one pressing — a harvest date, not a best-before</>, media: "/uploads/1/hooks/sites/g/grove-bottle.jpg", note: "Olive oil is a fresh juice, not a pantry fixture that sits a year." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/grove-tree.jpg", secondary: "/uploads/1/hooks/sites/g/grove-pour.jpg", index: "01", title: <>Oil pressed<br /><em>the week it’s picked.</em></>, body: "Single-grove oil, milled the day it is harvested and shipped young.", overlap: "object" },
    { t: "idea", kick: "What Grove is", title: <>A fresh juice,<br /><em>not a pantry fixture.</em></>, body: "Olive oil is at its best the week it is milled, then it fades quietly for a year on a shelf. Ours is pressed within hours of the harvest and sent while it is still green, peppery and sharp — with the date to prove it." },
    { t: "editorial", img: `${g}grove-tree.jpg`, title: <>One grove,<br /><em>one pressing.</em></>, body: "Old trees on a single hillside, picked and milled together, so every tin is one place and one moment — not a tanker of anonymous oil." },
    { t: "split", img: `${g}grove-bottle.jpg`, rev: true, title: <>Green, sharp,<br /><em>and dated.</em></>, list: [{ b: "Milled within hours", s: "Picked and pressed the same day." }, { b: "A harvest date, not a best-before", s: "You drink it young, the way it's meant." }, { b: "Single-grove, unblended", s: "One hillside's flavour, start to finish." }] },
    { t: "gallery", head: <>Still <em>green.</em></>, items: [{ img: `${g}grove-pour.jpg`, cap: "Poured while it's sharp." }, { img: `${g}grove-bottle.jpg`, cap: "This year's tin." }] },
    { t: "cta", title: <>Taste <em>this year's.</em></>, body: "The new-harvest tin, shipped the week the mill runs.", label: "Order the harvest" },
  ] },
  pour: { slug: "pour", theme: "pour", brand: "POUR", typography: "signal", hero: { archetype: "product-theatre", object: "/uploads/1/hooks/sites/pour.jpg", depth: "/uploads/1/hooks/sites/g/pour-depth.jpg", proof: [["12", "drinks, not forty"], ["stirred", "not rushed"], ["off-menu", "if you trust the bar"]], eyebrow: "A drinks list", title: <>A short list,<br /><em>poured properly.</em></>, sub: "Twelve drinks, no menu of forty, and every one made right." }, nav: ["The idea", "The bar", "Visit"], tagline: "A short-list cocktail bar.", legal: "Pour Bar", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/pour-bar.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Twelve drinks,<br />done right.</>, body: "A menu of forty is forty compromises; we pour twelve.", align: "left" }, { index: "II", title: <>Stirred,<br />not rushed.</>, body: "The right dilution, the right glass, every time.", align: "right" }] },
    { t: "bigNumber", value: "12", label: <>drinks — every one someone’s favourite</>, media: "/uploads/1/hooks/sites/g/pour-glass.jpg", note: "Tell the bartender a spirit and a mood, and trust the list." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/pour-bar.jpg", secondary: "/uploads/1/hooks/sites/g/pour-make.jpg", index: "12", title: <>A short list,<br /><em>poured properly.</em></>, body: "Twelve cocktails, made by the person who wrote the list.", overlap: "object" },
    { t: "idea", kick: "What Pour is", title: <>A dozen things<br /><em>done perfectly.</em></>, body: "A menu of forty cocktails is a menu of forty compromises. We pour twelve, we pour them right, and we change them when the season turns. Tell the bartender a spirit and a mood, and trust the rest to the person who built the list." },
    { t: "cine", mode: "ember", palette: ["#0a0608", "#3a1418", "#d08a4a"], title: <>Poured<br /><em>properly.</em></> },
    { t: "split", img: `${g}pour-make.jpg`, title: <>Made by<br /><em>the person who wrote it.</em></>, list: [{ b: "Twelve drinks, not forty", s: "Every one is somebody's favourite." }, { b: "Stirred, not rushed", s: "The right dilution, the right glass, every time." }, { b: "Tell us a mood", s: "Off-menu, if you trust the bar." }] },
    { t: "gallery", head: <>At <em>the bar.</em></>, items: [{ img: `${g}pour-glass.jpg`, cap: "One, made right." }, { img: `${g}pour-bar.jpg`, cap: "Pull up a stool." }] },
    { t: "cta", title: <>Pull up <em>a stool.</em></>, body: "Walk-ins at the bar, a small book for the back room.", label: "Find the bar" },
  ] },
  curd: { slug: "curd", theme: "curd", brand: "CURD", typography: "grotesk", hero: { archetype: "hard-split", index: "01 / RAW-MILK", mediaSide: "right", eyebrow: "A cheesemonger", title: <>CHEESE<br />WITH<br /><em>a season.</em></>, sub: "Cut to order, ripe today, and never from a factory." }, nav: ["The idea", "The cave", "Order"], tagline: "A small-maker cheesemonger.", legal: "Curd & Cave", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/curd-cave.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Aged in<br />our own cave.</>, body: "Cool, damp and patient; we turn the wheels by hand.", align: "left" }, { index: "II", title: <>Cut to order,<br />ripe on the day.</>, body: "Not the day it was packed — the day you need it.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>cave — finished by us, cut to your table</>, media: "/uploads/1/hooks/sites/g/curd-wheel.jpg", note: "Wrapped supermarket cheese is picked to survive a lorry, not to taste." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/curd-cave.jpg", secondary: "/uploads/1/hooks/sites/g/curd-wheel.jpg", index: "01", title: <>Cheese with<br /><em>a season.</em></>, body: "Small-maker cheese, aged in our cave and cut the day you want it.", overlap: "object" },
    { t: "idea", kick: "What Curd is", title: <>Ripe today,<br /><em>not shelf-stable forever.</em></>, body: "Wrapped supermarket cheese is picked to survive a lorry, not to taste of anything. We buy from small makers, age it in our own cave, and cut it the day you want it — so it is perfectly ripe on the day, not the day it was packed." },
    { t: "editorial", img: `${g}curd-cave.jpg`, title: <>Aged in<br /><em>our own cave.</em></>, body: "Cool, damp, and patient. We turn the wheels by hand and cut them only when they are ready, not when a date on a label says so." },
    { t: "split", img: `${g}curd-wheel.jpg`, rev: true, title: <>Cut to order,<br /><em>ripe on the day.</em></>, list: [{ b: "Small makers, named", s: "Farmhouse and artisan, never factory." }, { b: "Aged by us", s: "Finished in our cave to the day you need." }, { b: "Built to your table", s: "Tell us the crowd; we build the board." }] },
    { t: "gallery", head: <>Onto <em>the board.</em></>, items: [{ img: `${g}curd-board.jpg`, cap: "Built for your table." }, { img: `${g}curd-wheel.jpg`, cap: "Cut the day you want it." }] },
    { t: "cta", title: <>Build <em>a board.</em></>, body: "A conversation about who is eating, then a box that is perfectly ripe on the day.", label: "Order a board" },
  ] },
  lens: { slug: "lens", theme: "lens", brand: "LENS", typography: "editorial", hero: { archetype: "index-stage", eyebrow: "Portraits, on film", title: <>Portraits that<br />hold still.</>, items: [{ label: "The sitting", meta: "one hour, one roll", img: "/uploads/1/hooks/sites/g/lens-portrait.jpg" }, { label: "The film", meta: "a few frames", img: "/uploads/1/hooks/sites/g/lens-camera.jpg" }, { label: "The darkroom", meta: "developed by hand", img: "/uploads/1/hooks/sites/g/lens-contact.jpg" }, { label: "The print", meta: "not a download", img: "/uploads/1/hooks/sites/lens.jpg" }] }, nav: ["The idea", "The work", "Sit"], tagline: "Film portraiture, printed by hand.", legal: "Lens Studio", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/lens-portrait.jpg", motif: "halftone", chapters: [{ index: "I", title: <>A few frames,<br />not a thousand.</>, body: "No burst to pick from — a handful of careful exposures.", align: "left" }, { index: "II", title: <>Developed<br />by hand.</>, body: "In the darkroom, not a lab machine.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>roll, one hour — three hand prints, not a folder</>, media: "/uploads/1/hooks/sites/g/lens-camera.jpg", note: "A photograph you will still have when the hard drive dies." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/lens-portrait.jpg", secondary: "/uploads/1/hooks/sites/g/lens-contact.jpg", index: "N°01", title: <>Portraits that<br /><em>hold still.</em></>, body: "Shot on film, slowly, and printed by hand a fortnight later.", overlap: "object" },
    { t: "idea", kick: "What Lens is", title: <>A few frames,<br /><em>not a thousand.</em></>, body: "Digital gives you a thousand near-identical frames and the anxiety of choosing. We shoot a few careful exposures on film, develop them by hand, and give you a print you will still have long after the hard drive has died." },
    { t: "editorial", img: `${g}lens-portrait.jpg`, title: <>Made to<br /><em>hold still.</em></>, body: "One roll, one hour, a real conversation across the lens. What comes back is a photograph, not a file." },
    { t: "split", img: `${g}lens-camera.jpg`, title: <>Slow,<br /><em>on purpose.</em></>, list: [{ b: "Shot on film", s: "A handful of exposures, each one considered." }, { b: "Developed by hand", s: "In the darkroom, not a lab machine." }, { b: "A print, not a download", s: "Something to frame, not to forget in a folder." }] },
    { t: "gallery", head: <>From negative <em>to print.</em></>, items: [{ img: `${g}lens-contact.jpg`, cap: "The contact sheet." }, { img: `${g}lens-portrait.jpg`, cap: "The one you keep." }] },
    { t: "cta", title: <>Sit for <em>a portrait.</em></>, body: "An hour in the studio, a roll of film, and three hand prints a fortnight later.", label: "Book a sitting" },
  ] },
  wax: { slug: "wax", theme: "wax", brand: "WAX", nav: ["The idea", "The shop", "Visit"], tagline: "An independent record shop.", legal: "Wax Records", typography: "grotesk", hero: { archetype: "type-collision", eyebrow: "A record shop", title: <>ANALOG</>, sub: "We sell the sitting down, not just the record.", object: "/uploads/1/hooks/sites/wax.jpg" }, blocks: [
    { t: "cinematicBand", media: `${g}wax-spin.jpg`, motif: "grain", chapters: [{ index: "I", title: <>Side one<br />to side two.</>, body: "The whole record, in the order it was meant to be heard.", align: "left" }, { index: "II", title: <>Try it<br />before you buy.</>, body: "A turntable on the counter, and staff who've heard it.", align: "right" }] },
    { t: "bigNumber", value: "12″", label: <>The format we still sell — vinyl, whole albums</>, media: `${g}wax-crate.jpg`, note: "A stream gives you everything and the patience for none of it. We sell the sitting down." },
    { t: "diptych", primary: `${g}wax-crate.jpg`, secondary: `${g}wax-spin.jpg`, index: "33⅓", title: <>Flick through,<br /><em>stay a while.</em></>, body: "Racks worth the browse, a crate kept aside for regulars, new arrivals every Friday.", overlap: "object" },
    { t: "idea", kick: "What Wax is", title: <>The sitting down,<br /><em>not just the record.</em></>, body: "A stream gives you everything and the patience for none of it. We sell the ritual back: racks worth flicking through, a turntable to try before you buy, and someone behind the counter who has actually heard the thing you're holding." },
    { t: "cine", mode: "grid", palette: ["#0a0510", "#2a1050", "#ff5ea0"], title: <>Side one<br /><em>to side two.</em></> },
    { t: "split", img: `${g}wax-spin.jpg`, rev: true, title: <>Try it<br /><em>before you buy.</em></>, list: [{ b: "A turntable on the counter", s: "Hear it, then decide." }, { b: "Racks worth the flick", s: "Curated, not an algorithm's dump." }, { b: "Staff who've heard it", s: "Ask; you'll get a real answer." }] },
    { t: "gallery", head: <>In the <em>crates.</em></>, items: [{ img: `${g}wax-crate.jpg`, cap: "Flick through." }, { img: `${g}wax-shop.jpg`, cap: "Stay a while." }] },
    { t: "cta", title: <>Come <em>flick through.</em></>, body: "New arrivals every Friday, and a crate we keep aside for regulars.", label: "See what's in" },
  ] },
  spine: { slug: "spine", theme: "spine", brand: "SPINE", typography: "fashion", hero: { archetype: "edge-arrival", edge: "left", proof: ["0", "algorithms on the shelves"], eyebrow: "A bookshop", title: <>Books chosen by<br /><em>someone who read them.</em></>, sub: "A small shop, no algorithm on the shelves." }, nav: ["The idea", "The shop", "Ask"], tagline: "An independent bookshop.", legal: "Spine Books", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/spine-shelf.jpg", motif: "halftone", chapters: [{ index: "I", title: <>No spreadsheet<br />on the shelves.</>, body: "Every book is here because a person read it and loved it.", align: "left" }, { index: "II", title: <>Read<br />before it’s shelved.</>, body: "Staff picks, with a card that says why.", align: "right" }] },
    { t: "bigNumber", value: "0", label: <>algorithms — curation is a person’s taste, not a trend</>, media: "/uploads/1/hooks/sites/g/spine-stack.jpg", note: "Describe a book you couldn’t put down; we hand you the next." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/spine-shelf.jpg", secondary: "/uploads/1/hooks/sites/g/spine-read.jpg", index: "01", title: <>Books chosen by<br /><em>someone who read them.</em></>, body: "A small shop, a slow browse, and an answer when you ask.", overlap: "object" },
    { t: "idea", kick: "What Spine is", title: <>No spreadsheet<br /><em>on the shelves.</em></>, body: "Every book on our table is there because a person read it and loved it — not because a chart said it would sell. Tell us the last book you couldn't put down, and someone who has actually read the next one will hand it to you." },
    { t: "editorial", img: `${g}spine-shelf.jpg`, title: <>A room that<br /><em>rewards the browse.</em></>, body: "Floor to ceiling, arranged by a human logic, made for the slow flick along a shelf that a search bar can never replace." },
    { t: "split", img: `${g}spine-stack.jpg`, title: <>Picked <em>by hand.</em></>, list: [{ b: "Read before it's shelved", s: "Staff picks, with a card that says why." }, { b: "No algorithm", s: "Curation is a person's taste, not a trend." }, { b: "Ask, and leave with the one", s: "Describe a book you loved; get the next." }] },
    { t: "gallery", head: <>Stay <em>and read.</em></>, items: [{ img: `${g}spine-read.jpg`, cap: "A corner to sit in." }, { img: `${g}spine-shelf.jpg`, cap: "Worth the browse." }] },
    { t: "cta", title: <>Ask for <em>a recommendation.</em></>, body: "Tell us the last book you could not put down. We will hand you the next.", label: "Get a pick" },
  ] },
  ink: { slug: "ink", theme: "ink", brand: "INK", typography: "fashion", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "A private studio", title: <>Ink you will<br /><em>wear for good.</em></>, sub: "One artist, one client, and a design drawn only for you." }, nav: ["The idea", "The work", "Book"], tagline: "A private, custom tattoo studio.", legal: "Ink Studio", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/ink-studio.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Drawn for you,<br />not off the wall.</>, body: "No flash to point at, drawn with you over weeks.", align: "left" }, { index: "II", title: <>One chair,<br />one day, yours.</>, body: "The room and the artist are yours for the whole day.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>client a day — the room and artist are yours</>, media: "/uploads/1/hooks/sites/g/ink-flash.jpg", note: "A piece you will still love in thirty years, tattooed slowly." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/ink-work.jpg", secondary: "/uploads/1/hooks/sites/g/ink-flash.jpg", index: "N°01", title: <>Ink you will<br /><em>wear for good.</em></>, body: "A private studio, custom work only, a few pieces taken each month.", overlap: "object" },
    { t: "idea", kick: "What Ink is", title: <>Drawn for you,<br /><em>not off the wall.</em></>, body: "No flash to point at, no walk-in rush, no needle sharing your artist with three other chairs. We draw with you over weeks until the design is right, then tattoo it slowly in a room that is yours for the whole day." },
    { t: "cine", mode: "nebula", palette: ["#050308", "#2a1040", "#8f6fd8"], title: <>Worn<br /><em>for good.</em></> },
    { t: "split", img: `${g}ink-work.jpg`, rev: true, title: <>One chair,<br /><em>one day, yours.</em></>, list: [{ b: "Custom, always", s: "Drawn with you over weeks, never off a sheet." }, { b: "One client a day", s: "The room and the artist are yours." }, { b: "Slow, so it lasts", s: "A piece you'll still love in thirty years." }] },
    { t: "gallery", head: <>From flash <em>to skin.</em></>, items: [{ img: `${g}ink-flash.jpg`, cap: "Drawn for you." }, { img: `${g}ink-studio.jpg`, cap: "A room for the day." }] },
    { t: "cta", title: <>Start <em>a piece.</em></>, body: "Send us the idea and where it lives on you. We take on a few each month.", label: "Request a booking" },
  ] },
  mane: { slug: "mane", theme: "mane", brand: "MANE", typography: "editorial", hero: { archetype: "index-stage", eyebrow: "A hair studio", title: <>Hair, cut like<br />it will be seen.</>, items: [{ label: "The consult", meta: "on us, first", img: "/uploads/1/hooks/sites/g/mane-chair.jpg" }, { label: "The cut", meta: "one at a time", img: "/uploads/1/hooks/sites/g/mane-cut.jpg" }, { label: "The finish", meta: "as it'll be seen", img: "/uploads/1/hooks/sites/g/mane-style.jpg" }, { label: "The chair", meta: "an hour, yours", img: "/uploads/1/hooks/sites/mane.jpg" }] }, nav: ["The idea", "The studio", "Book"], tagline: "A one-chair hair studio.", legal: "Mane Studio", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/mane-chair.jpg", motif: "none", chapters: [{ index: "I", title: <>No double-booking,<br />no rush.</>, body: "One chair, a long consultation, an hour only yours.", align: "left" }, { index: "II", title: <>Cut to grow<br />out well.</>, body: "Still looks right six weeks later, not just today.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>chair, one client — no juggling, no waiting under foil</>, media: "/uploads/1/hooks/sites/g/mane-style.jpg", note: "A salon that runs three chairs runs on your patience; we run one." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/mane-chair.jpg", secondary: "/uploads/1/hooks/sites/g/mane-style.jpg", index: "01", title: <>Hair, cut like<br /><em>it will be seen.</em></>, body: "A real consultation first, on us, before a single snip.", overlap: "object" },
    { t: "idea", kick: "What Mane is", title: <>No double-booking,<br /><em>no rush under the dryer.</em></>, body: "A salon that runs three chairs runs on your patience. We run one. That means a long consultation before anything is cut, an hour that is only yours, and a shape built to grow out as well as it goes in." },
    { t: "editorial", img: `${g}mane-chair.jpg`, title: <>One chair,<br /><em>one hour, yours.</em></>, body: "A calm room, a big mirror, and a stylist who is thinking about your hair and no one else's for the whole appointment." },
    { t: "split", img: `${g}mane-style.jpg`, title: <>Cut to<br /><em>grow out well.</em></>, list: [{ b: "A real consultation first", s: "On us, before a single snip." }, { b: "One client at a time", s: "No juggling, no waiting under foil." }, { b: "A shape that lasts", s: "Still looks right six weeks later." }] },
    { t: "gallery", head: <>In the <em>chair.</em></>, items: [{ img: `${g}mane-cut.jpg`, cap: "Considered, unhurried." }, { img: `${g}mane-style.jpg`, cap: "Finished, as it'll be seen." }] },
    { t: "cta", title: <>Book <em>the chair.</em></>, body: "New clients start with a consultation, on us, before anything is cut.", label: "Book a consultation" },
  ] },
  selvedge: { slug: "selvedge", theme: "selvedge", brand: "SELVEDGE", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", object: "/uploads/1/hooks/sites/selvedge.jpg", labels: ["Raw", "Shuttle loom", "Your fade", "Repaired"], eyebrow: "Raw denim", title: <>Denim that<br /><em>fades to you.</em></>, sub: "Woven on old looms, sold raw, broken in by your life." }, nav: ["The idea", "The loom", "Find"], tagline: "Raw selvedge denim, built to age.", legal: "Selvedge Co.", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/selvedge-loom.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Woven on<br />old looms.</>, body: "Narrow shuttle looms that finish a self-edge no wide loom can.", align: "left" }, { index: "II", title: <>Sold raw,<br />faded by you.</>, body: "A year of your life makes a pair that is only yours.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>fade — earned, not printed on at the factory</>, media: "/uploads/1/hooks/sites/g/selvedge-fade.jpg", note: "Pre-distressed jeans wear someone else’s life; ours wear yours." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/selvedge-jean.jpg", secondary: "/uploads/1/hooks/sites/g/selvedge-fade.jpg", index: "01", title: <>Denim that<br /><em>fades to you.</em></>, body: "Heavy shuttle-loom denim, sold raw, repaired free for life.", overlap: "object" },
    { t: "idea", kick: "What Selvedge is", title: <>Sold stiff,<br /><em>broken in by you.</em></>, body: "Pre-distressed jeans wear someone else's life. Ours arrive raw, heavy and dark off a shuttle loom, and a year of your walking, sitting and folding fades them into a pair that could belong to no one else on earth." },
    { t: "editorial", img: `${g}selvedge-loom.jpg`, title: <>Woven on<br /><em>old looms.</em></>, body: "Narrow shuttle looms, slow and clattering, that finish a self-edge no wide modern loom can — the mark you can see in the cuff." },
    { t: "split", img: `${g}selvedge-fade.jpg`, rev: true, title: <>A fade<br /><em>that is only yours.</em></>, list: [{ b: "Sold raw and dark", s: "The fades are yours to earn, not printed on." }, { b: "Heavy shuttle-loom denim", s: "Woven to age for a decade, not a season." }, { b: "Free repairs, for life", s: "We patch the knees; you keep wearing them." }] },
    { t: "gallery", head: <>Earned, <em>not printed.</em></>, items: [{ img: `${g}selvedge-jean.jpg`, cap: "Raw, to begin." }, { img: `${g}selvedge-fade.jpg`, cap: "A year of you." }] },
    { t: "cta", title: <>Find <em>your pair.</em></>, body: "A handful of cuts, a proper fitting, and a lifetime of free repairs.", label: "See the cuts" },
  ] },
  deck: { slug: "deck", theme: "deck", brand: "DECK", typography: "grotesk", hero: { archetype: "type-collision", object: "/uploads/1/hooks/sites/g/deck-skate.jpg", eyebrow: "A skate shop", title: <>KICKFLIP</>, sub: "Pressed by skaters, for the way you actually ride." }, nav: ["The idea", "The shop", "Build"], tagline: "A skater-run board shop.", legal: "Deck Shop", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/deck-skate.jpg", motif: "grain", chapters: [{ index: "I", title: <>Pressed by<br />skaters.</>, body: "Our own wood, set up on the counter while you wait.", align: "left" }, { index: "II", title: <>Built to<br />be broken in.</>, body: "Trucks and grip to your stance, by people who ride your spots.", align: "right" }] },
    { t: "bigNumber", value: "1", label: <>board, built to your stance while you wait</>, media: "/uploads/1/hooks/sites/g/deck-board.jpg", note: "A skate shop run by people who don’t skate is a rack with grip tape." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/deck-skate.jpg", secondary: "/uploads/1/hooks/sites/g/deck-board.jpg", index: "01", title: <>Boards built<br /><em>to be broken in.</em></>, body: "Skater-pressed decks, set up ready to push, not sold off a wall.", overlap: "object" },
    { t: "idea", kick: "What Deck is", title: <>No mall brands,<br /><em>no dead stock.</em></>, body: "A skate shop run by people who don't skate is a clothing rack with grip tape. We press our own boards, set them up on the counter while you wait, and skate the same spots you do — so the advice is real, not a sticker price." },
    { t: "cine", mode: "grid", palette: ["#08060e", "#241048", "#ff7a3a"], title: <>Broken in<br /><em>by you.</em></> },
    { t: "split", img: `${g}deck-shop.jpg`, rev: true, title: <>Set up<br /><em>on the counter.</em></>, list: [{ b: "Boards we press", s: "Our own wood, not a warehouse brand." }, { b: "Built to your stance", s: "Trucks and grip set up while you wait." }, { b: "Skated, not sold", s: "The staff ride the spots you ride." }] },
    { t: "gallery", head: <>From rack <em>to road.</em></>, items: [{ img: `${g}deck-board.jpg`, cap: "Pick a deck." }, { img: `${g}deck-skate.jpg`, cap: "Push off." }] },
    { t: "cta", title: <>Set up <em>a board.</em></>, body: "Pick a deck, we build it to your stance and hand it over ready to push.", label: "Build a setup" },
  ] },
  lather: { slug: "lather", theme: "lather", brand: "LATHER", typography: "fashion", hero: { archetype: "edge-arrival", edge: "right", proof: ["4", "things + six weeks"], eyebrow: "An apothecary", title: <>Soap that<br /><em>is just soap.</em></>, sub: "Cold-pressed, plainly scented, nothing you can't pronounce." }, nav: ["The idea", "The bench", "Shop"], tagline: "Cold-pressed soap and simple skincare.", legal: "Lather Apothecary", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/lather-shelf.jpg", motif: "none", chapters: [{ index: "I", title: <>Four things,<br />and six weeks.</>, body: "Oils, lye, water and a little scent, cured slowly.", align: "left" }, { index: "II", title: <>Cut by hand,<br />plainly kept.</>, body: "Amber glass, paper labels, nothing pretending.", align: "right" }] },
    { t: "bigNumber", value: "6wk", label: <>cure — the slow way, because it makes a better bar</>, media: "/uploads/1/hooks/sites/g/lather-soap.jpg", note: "Kind to skin that has had enough of the fragrance aisle." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/lather-shelf.jpg", secondary: "/uploads/1/hooks/sites/g/lather-soap.jpg", index: "01", title: <>Soap that<br /><em>is just soap.</em></>, body: "Cold-pressed soap, botanical scent only, a refill habit that wastes nothing.", overlap: "object" },
    { t: "idea", kick: "What Lather is", title: <>Four things,<br /><em>and six weeks.</em></>, body: "Oils, lye, water, and a little botanical scent. That's the whole recipe. Cured for six weeks, cut by hand, and kind to skin that has had quite enough of the fragrance aisle and its unpronounceable list." },
    { t: "editorial", img: `${g}lather-shelf.jpg`, title: <>Plainly<br /><em>made, plainly kept.</em></>, body: "Amber glass, paper labels, and a shelf you're not embarrassed to leave out. Nothing here is trying to be anything but honest." },
    { t: "split", img: `${g}lather-make.jpg`, title: <>Cured slow,<br /><em>cut by hand.</em></>, list: [{ b: "Cold-pressed, six-week cure", s: "The slow way, because it makes a better bar." }, { b: "Botanical scent only", s: "A little, or none — never a fragrance wall." }, { b: "Refill, don't rebuy", s: "A habit built so nothing is wasted." }] },
    { t: "gallery", head: <>On the <em>shelf.</em></>, items: [{ img: `${g}lather-soap.jpg`, cap: "Cut by hand." }, { img: `${g}lather-shelf.jpg`, cap: "Honestly kept." }] },
    { t: "cta", title: <>Wash <em>simply.</em></>, body: "A trio to find your scent, then a refill habit so nothing is wasted.", label: "Shop the bars" },
  ] },
  malt: { slug: "malt", theme: "malt", brand: "MALT", typography: "signal", hero: { archetype: "product-theatre", object: "/uploads/1/hooks/sites/malt.jpg", depth: "/uploads/1/hooks/sites/g/malt-depth.jpg", proof: [["4", "beers, rotating"], ["taproom", "poured fresh"], ["Thu-Sun", "whatever tanked"]], eyebrow: "A small brewery", title: <>Beer worth<br /><em>slowing down for.</em></>, sub: "Brewed in small batches, and best where it's made." }, nav: ["The idea", "The tanks", "Visit"], tagline: "A small-batch taproom brewery.", legal: "Malt Brewing", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/g/malt-tank.jpg", motif: "halftone", chapters: [{ index: "I", title: <>Brewed<br />out the back.</>, body: "A few tanks and whatever the brewer felt like this month.", align: "left" }, { index: "II", title: <>Poured fresh,<br />where it’s made.</>, body: "We don’t ship far; it is best exactly here.", align: "right" }] },
    { t: "bigNumber", value: "4", label: <>beers on, rotating — never the same all year</>, media: "/uploads/1/hooks/sites/g/malt-glass.jpg", note: "Beer shipped nationwide is built to survive the lorry, not to taste." },
    { t: "diptych", primary: "/uploads/1/hooks/sites/g/malt-tank.jpg", secondary: "/uploads/1/hooks/sites/g/malt-grain.jpg", index: "01", title: <>Beer worth<br /><em>slowing down for.</em></>, body: "Small-batch beer, poured fresh in the taproom the week it is ready.", overlap: "object" },
    { t: "idea", kick: "What Malt is", title: <>No core range<br /><em>stretched across a country.</em></>, body: "Beer shipped nationwide is beer built to survive the journey. We don't ship far. A rotating handful of batches, brewed out the back, poured fresh in the taproom the week they're ready — best exactly where it's made." },
    { t: "editorial", img: `${g}malt-tank.jpg`, title: <>Brewed<br /><em>out the back.</em></>, body: "Copper and steel, a few tanks, and whatever the brewer felt like making this month. Small enough that every batch is somebody's decision, not a spreadsheet's." },
    { t: "split", img: `${g}malt-grain.jpg`, rev: true, title: <>Small batch,<br /><em>poured fresh.</em></>, list: [{ b: "A rotating handful", s: "Never the same four beers all year." }, { b: "Poured where it's made", s: "Freshest the week it leaves the tank." }, { b: "Brewed by a person", s: "Every batch is a choice, not a formula." }] },
    { t: "gallery", head: <>On <em>this week.</em></>, items: [{ img: `${g}malt-glass.jpg`, cap: "Whatever tanked this week." }, { img: `${g}malt-tank.jpg`, cap: "Where it's made." }] },
    { t: "cta", title: <>Pull <em>a pint.</em></>, body: "The taproom is open Thursday to Sunday, with whatever tanked this week.", label: "See what's on" },
  ] },
};

export default function VisualHooksLab({ initialSlug }: { initialSlug?: string }) {
  if (initialSlug === "backgrounds") return <BackgroundsShowcase />;
  if (initialSlug === "sites") return <SitesIndex />;
  if (initialSlug === "animated") return <AnimatedIndex />;
  if (initialSlug === "ledger") return <LedgerSite />;
  if (initialSlug && PRO[initialSlug]) return <ProSite data={PRO[initialSlug]} />;
  if (initialSlug && BIZ[initialSlug]) return <BizSite {...BIZ[initialSlug]} />;
  if (initialSlug === "dew") return <DewSite />;
  if (initialSlug === "roast") return <RoastSite />;
  if (initialSlug === "lume") return <LumeSite />;
  if (initialSlug === "forge") return <ForgeSite />;
  if (initialSlug === "clothing") return <ClothingSite />;
  if (initialSlug === "skydive") return <SkydiveSite />;
  if (initialSlug === "vinyl") return <VinylSite />;
  if (initialSlug === "porsche") return <PorscheSite />;
  if (initialSlug === "anime") return <AnimeSite />;
  if (initialSlug === "ecology") return <EcologySite />;
  if (initialSlug === "dj") return <DjSite />;
  if (initialSlug === "redsuit") return <RedsuitSite />;
  if (initialSlug === "notredame") return <NotreDameSite />;
  if (initialSlug === "jpclub") return <JpClubSite />;
  if (initialSlug === "skisnow") return <SkiSnowSite />;
  if (initialSlug === "jptattoo") return <JpTattooSite />;
  if (initialSlug === "bmw") return <BmwSite />;
  if (initialSlug === "dance") return <DanceSite />;
  if (initialSlug === "folkmusic") return <FolkMusicSite />;
  if (initialSlug === "rockband") return <RockBandSite />;
  if (initialSlug === "photographer") return <PhotographerSite />;
  if (initialSlug === "womensuit") return <WomenSuitSite />;
  if (initialSlug === "hoodie") return <HoodieSite />;
  if (initialSlug === "escort") return <EscortSite />;
  if (initialSlug === "cardealer") return <CarDealerSite />;
  if (initialSlug === "jprestaurant") return <JpRestaurantSite />;
  if (initialSlug === "freestyle") return <FreestyleSite />;
  if (initialSlug === "mono") return <MonoSite />;
  if (initialSlug === "phantom") return <PhantomSite />;
  if (initialSlug === "horologe") return <HorologeSite />;
  if (initialSlug === "tide") return <TideSite />;
  if (initialSlug === "canto") return <CantoSite />;
  if (initialSlug === "atlas") return <AtlasSite />;
  if (initialSlug === "noct") return <NoctSite />;
  if (initialSlug === "sol") return <SolSite />;
  if (initialSlug === "vessel") return <VesselSite />;
  if (initialSlug === "haven") return <HavenSite />;
  if (initialSlug === "form") return <FormSite />;
  const scene = scenes.find((item) => item.slug === initialSlug);
  if (!scene) return <Gallery />;
  return (
    <>
      <Prototype scene={scene} />
      <SceneLanding slug={scene.slug} />
    </>
  );
}
