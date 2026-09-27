"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
// bespoke-сайты: второй акт (актёр/погода/атмосфера + часы страницы для счётчиков акта)
import { Actor, Atmosphere, Weather, subscribe, clamp01, smooth } from "@/components/scene-kit";
// хук-сцены (rev/track/living-object … fold-horizon): второй акт по скроллу — часы сцены, скраб, WebGL-линза
import { useHookClock, LensReveal, lensDrive, ScrubVideo, seek, coverPt, path, drawCover, type Beat } from "./hook-kit";
import { win } from "@/components/scene-kit";

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
  { slug: "rev-neura", number: "R1", title: "Neura", family: "Cursor reveal", note: "A soft lens finds the machine under the skin; scroll opens it fully.", preview: "/uploads/1/hooks/casts/rev-neura.mp4", accent: "#4defff" },
  { slug: "rev-mythic", number: "R2", title: "Mythic", family: "Cursor reveal", note: "Scroll sets the sun; at nightfall the valley glows alive.", preview: "/uploads/1/hooks/casts/rev-mythic.mp4", accent: "#43e0c0" },
  { slug: "rev-imperial", number: "R3", title: "Imperial", family: "Cursor reveal", note: "Trace the globe, then scroll along its routes into the brightest node.", preview: "/uploads/1/hooks/casts/rev-imperial.mp4", accent: "#3df0ff" },
  { slug: "track-portfolio", number: "S1", title: "Studio X", family: "Scroll gaze", note: "A face follows your cursor, then your scroll — and hands you the work.", preview: "/uploads/1/hooks/scenes/gaze-face-poster.jpg", accent: "#38bdf8" },
  { slug: "track-sentry", number: "S2", title: "Sentry", family: "Scroll gaze", note: "A watcher turns to you, locks on, and shows what it sees.", preview: "/uploads/1/hooks/scenes/gaze-char-poster.jpg", accent: "#39d0ff" },
  { slug: "track-neon", number: "S3", title: "Neon Logic", family: "Scroll gaze", note: "A neon emblem turns with your scroll; one face opens into the product.", preview: "/uploads/1/hooks/scenes/neon-obj-poster.jpg", accent: "#41e6ff" },
  { slug: "living-object", number: "00", title: "Living Object", family: "Cinematic scrub", note: "Scroll wakes a sealed object; the camera passes through its seam of light.", preview: "/uploads/1/hooks/ovoid-hero-poster.jpg", accent: "#f4b968" },
  { slug: "cloud-step", number: "02", title: "Cloud Step", family: "Cutout parallax", note: "A sneaker falls through the clouds with you and lands in the drop.", preview: "/uploads/1/hooks/casts/cloud-step.mp4", accent: "#ff9ec4" },
  { slug: "strata", number: "03", title: "Strata", family: "Layered editorial", note: "A scan cuts a ridge of stone into strata, one layer per feature.", preview: "/uploads/1/hooks/scenes/s2-strata.png", accent: "#c8ff5a" },
  { slug: "reverie", number: "04", title: "Reverie", family: "Portal object", note: "A ring of light opens; the camera flies on to the next portal.", preview: "/uploads/1/hooks/scenes/s3-forest.png", accent: "#f6b23a" },
  { slug: "vanguard", number: "05", title: "Vanguard", family: "Kinetic typography", note: "Three commands, one per scroll beat, with the crew standing behind them.", preview: "/uploads/1/hooks/scenes/s4-figures-cut.png", accent: "#ff3b2f" },
  { slug: "aether", number: "06", title: "Aether", family: "Atmospheric", note: "Rise through lavender fog to a monolith house that breathes light.", preview: "/uploads/1/hooks/casts/aether.mp4", accent: "#b9a6e6" },
  { slug: "botanica", number: "07", title: "Botanica", family: "Material shadow", note: "Scroll moves the sun: the shadow turns with it — and with your hand.", preview: "/uploads/1/hooks/scenes/s6-object-cut.png", accent: "#9ec48a" },
  { slug: "neon-forge", number: "08", title: "Neon Forge", family: "Techno grid", note: "Scroll forges a chrome shard: molten, quenched, finished.", preview: "/uploads/1/hooks/scenes/s7-chrome-cut.png", accent: "#3df0ff" },
  { slug: "macro-optics", number: "09", title: "Macro Optics", family: "Product macro", note: "Light sweeps the frame, then scroll steps into her amber lens.", preview: "/uploads/1/hooks/casts/macro-optics.mp4", accent: "#e8a24a" },
  { slug: "liquid-word", number: "10", title: "Liquid Word", family: "3D typography", note: "Chrome FLUX turns with your scroll, then melts into the work.", preview: "/uploads/1/hooks/casts/liquid-word.mp4", accent: "#c7d0ff" },
  { slug: "orbit-data", number: "11", title: "Orbit Data", family: "Data theatre", note: "Zoom from the planet to your street, one number per stop.", preview: "/uploads/1/hooks/scenes/s10-globe-cut.png", accent: "#4a90ff" },
  { slug: "atelier-hand", number: "12", title: "Atelier", family: "Editorial fashion", note: "From the model’s hand into the glass, then on to the atelier.", preview: "/uploads/1/hooks/casts/atelier-hand.mp4", accent: "#d8b48a" },
  { slug: "fold-horizon", number: "13", title: "Fold Horizon", family: "Parallax narrative", note: "The frame freezes and the horizon folds into the next chapter.", preview: "/uploads/1/hooks/casts/fold-horizon.mp4", accent: "#9cc3e0" },
];

function Media({ src, className = "", scrubRef, poster, preload }: { src: string; className?: string; scrubRef?: React.RefObject<HTMLVideoElement | null>; poster?: string; preload?: "auto" | "metadata" | "none" }) {
  if (src.endsWith(".mp4")) {
    return <video ref={scrubRef} className={className} src={src} poster={poster} autoPlay={!scrubRef} muted loop={!scrubRef} playsInline preload={preload ?? (scrubRef ? "auto" : "metadata")} />;
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
  // interactive-story: свой таймлайн, сглаженный скраб, склейка (useStoryClock); остальные сцены — прежний цикл ниже
  useStoryClock(root, scene.slug, scrub, scrub2);

  useEffect(() => {
    const node = root.current;
    if (!node || STORY_TL[scene.slug]) return;
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

/* ==== ХУК-СЦЕНЫ · track-* · rev-* · living-object … fold-horizon ====================================================
   Второй акт по скроллу на hook-kit: сглаженные часы сцены (--q + окна-биты), свой скраб видео (Prototype-скраб не
   используется), touch-фолбэк (курсорные механики ведёт скролл), финал — переход-обещание, а не обрыв. */
const pct = (v: number) => `${(v * 100).toFixed(2)}%`;
const mix3 = (a: readonly number[], b: readonly number[], t: number) => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as [number, number, number];

/* track-portfolio: взгляд — курсор, затем скролл: в камеру → вправо, на шоурил, который забирает кадр. */
const TP_BEATS: readonly Beat[] = [["--copy", 0.46, 0.6], ["--pan", 0.5, 0.72], ["--reel", 0.52, 0.72], ["--full", 0.78, 0.92], ["--end", 0.86, 0.97]];
function TrackPortfolio(_: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  useHookClock(ref, TP_BEATS, ({ q, touch, ptr }) => {
    // курсор X → поворот головы (десктоп); скролл: взгляд в камеру (4.5 с) → вправо, на шоурил (9.8 с)
    const tp = touch || !ptr.on ? 0 : ptr.x * 9.8;
    const u1 = smooth(win(q, 0.04, 0.4)), u2 = smooth(win(q, 0.5, 0.74));
    seek(vid.current, u2 > 0 ? 4.5 + 5.3 * u2 : tp + (4.5 - tp) * u1);
  });
  return (
    <div ref={ref} className="vh-canvas tp-canvas">
      <span className="tp-ghost">VISUALS</span>
      <ScrubVideo vref={vid} src="/uploads/1/hooks/scenes/gaze-face-vid.mp4" poster="/uploads/1/hooks/scenes/gaze-face-poster.jpg" className="tp-film" />
      <div className="tp-wash" />
      <div className="tp-reel">
        {["held-world", "monolith", "planet-vig", "bloom"].map((k) => <img key={k} src={`/uploads/1/hooks/scenes/${k}-poster.jpg`} alt="" />)}
      </div>
      <div className="tp-reel-cap"><span>Selected work</span><b>Four worlds, 2026</b></div>
      <header className="tp-head">
        <Link href="/visual-hooks" className="tp-brand">✳ STUDIO X</Link>
        <nav className="tp-nav"><a href="#" onClick={stop}>Work</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <div className="tp-copy">
        <h1>I build compelling<br />visual stories & motion<br />that make ideas <em>shine.</em></h1>
        <a href="#" onClick={stop} className="tp-cta">Start a project <span>↗</span></a>
      </div>
      <div className="tp-scroll"><span className="hk-desk">Move your cursor, then scroll — it follows</span><span className="hk-touch">Scroll — it turns to follow</span></div>
      <div className="tp-end">
        <span>Selected work · Held World, Monolith, Planet Vigil, Bloom</span>
        <a href="#" onClick={stop} className="tp-cta">Start a project <span>↗</span></a>
      </div>
    </div>
  );
}

/* track-sentry: голова за курсором; скролл поворачивает её к зрителю, HUD берёт цель → нырок в глаз → его взгляд. */
const TS_BEATS: readonly Beat[] = [["--lock", 0.2, 0.4], ["--dive", 0.44, 0.7], ["--flash", 0.58, 0.72], ["--pov", 0.64, 0.78], ["--end", 0.8, 0.95]];
function TrackSentry(_: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  useHookClock(ref, TS_BEATS, ({ q, f, touch, ptr, set, text }) => {
    const idle = 1.2 + 0.7 * Math.sin(f.t / 2300);
    const tp = touch || !ptr.on ? idle : ptr.x * 9.8;
    seek(vid.current, tp + (3.8 - tp) * smooth(win(q, 0.04, 0.34)));
    const eye = coverPt(0.45, 0.39, f.vw, f.vh, 16 / 9, 0.66);
    set("--ex", pct(eye.x));
    set("--ey", pct(eye.y));
    text(".ts-state", q < 0.4 ? "ACTIVE" : q < 0.66 ? "LOCKED" : "LINKED");
    text(".ts-range", `${(3.2 - 2.8 * smooth(win(q, 0.2, 0.66))).toFixed(1)} m`);
  });
  return (
    <div ref={ref} className="vh-canvas ts-canvas">
      <ScrubVideo vref={vid} src="/uploads/1/hooks/scenes/gaze-char-vid.mp4" poster="/uploads/1/hooks/scenes/gaze-char-poster.jpg" className="ts-film" />
      <div className="ts-scan" />
      <div className="ts-flash" />
      <div className="ts-lock"><i /><i /><i /><i /><span>TARGET · <b className="ts-range">3.2 m</b></span></div>
      <div className="ts-pov">
        <img src="/uploads/1/hooks/scenes/gaze-face-poster.jpg" alt="" />
        <div className="ts-pov-box"><span>SUBJECT 002 · IDENTIFIED</span></div>
      </div>
      <header className="ts-head">
        <Link href="/visual-hooks" className="ts-brand">◎ SENTRY</Link>
        <nav className="ts-nav"><a href="#" onClick={stop}>System</a><a href="#" onClick={stop}>Watch</a><a href="#" onClick={stop}>Access</a></nav>
      </header>
      <h1 className="ts-h1">IT SEES<br /><em>everything.</em></h1>
      <div className="ts-data"><span>TRACKING</span><b className="ts-state">ACTIVE</b><span>SUBJECT</span><b>YOU</b></div>
      <div className="ts-end">
        <p>Now you see<br /><em>what it sees.</em></p>
        <a href="#" onClick={stop} className="ts-cta">Request access →</a>
      </div>
    </div>
  );
}

/* track-neon: вращение — правда от скролла; одна грань икосаэдра открывается порталом в продукт. */
const TN_BEATS: readonly Beat[] = [["--glow", 0.3, 0.46], ["--tri", 0.44, 0.76], ["--end", 0.62, 0.8]];
function TrackNeon(_: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  useHookClock(ref, TN_BEATS, ({ q, f }) => {
    const rest = 1 - smooth(win(q, 0, 0.06));
    seek(vid.current, 0.9 + (f.reduced ? 0 : 0.6 * Math.sin(f.t / 1900) * rest) + 8.2 * win(q, 0, 0.62));
  });
  return (
    <div ref={ref} className="vh-canvas tn-canvas">
      <div className="tn-grid" />
      <ScrubVideo vref={vid} src="/uploads/1/hooks/scenes/neon-obj-vid.mp4" poster="/uploads/1/hooks/scenes/neon-obj-poster.jpg" className="tn-film" />
      <div className="tn-portal-rim" />
      <div className="tn-portal">
        <div className="tn-floor" />
        <div className="tn-inside">
          <span>NEON·LOGIC / FLOWS</span>
          <h2>Wire it.<br /><em>Watch it run.</em></h2>
          <p>Rules become live, visual flows — every branch lights up as data moves through it.</p>
          <a href="#" onClick={stop} className="tn-cta">Start building →</a>
        </div>
      </div>
      <header className="tn-head">
        <Link href="/visual-hooks" className="tn-brand">◇ NEON·LOGIC</Link>
        <nav className="tn-nav"><a href="#" onClick={stop}>Product</a><a href="#" onClick={stop}>Docs</a><a href="#" onClick={stop}>Login</a></nav>
      </header>
      <h1 className="tn-h1">LOGIC<br /><em>in motion.</em></h1>
      <div className="tn-data"><span>ROTATION</span><b>SCROLL-LINKED</b></div>
    </div>
  );
}

/* rev-*: WebGL-линза с мягким «живым» краем и ободом света. Курсор — первый акт; скролл забирает линзу
   на траекторию (на таче — с первого кадра) и раскрывает мир под кожей до конца → обещание продукта. */
const REV_NEURA_BEATS: readonly Beat[] = [["--h", 0.46, 0.6], ["--end", 0.8, 0.94]];
const NEURA_SCAN = [[0.3, 0.27], [0.44, 0.27], [0.37, 0.55], [0.37, 0.4]] as const; // глаз → глаз → рот → центр лица
function RevNeura() {
  const ref = useRef<HTMLDivElement>(null);
  const lens = useRef(lensDrive({ x: 0.3, y: 0.3, r: 0.17, soft: 0.05, rim: 0.9 }));
  useHookClock(ref, REV_NEURA_BEATS, ({ q, f, touch, ptr, text }) => {
    const d = lens.current;
    const take = touch ? 1 : smooth(win(q, 0.04, 0.18));
    const open = smooth(win(q, 0.5, 0.8));
    const [ix, iy] = path(NEURA_SCAN, win(q, touch ? 0 : 0.18, 0.5));
    const s = coverPt(ix, iy, f.vw, f.vh);
    const rest = coverPt(0.3, 0.27, f.vw, f.vh);
    const hx = ptr.on && !touch ? ptr.x : rest.x + 0.02 * Math.sin(f.t / 1300);
    const hy = ptr.on && !touch ? ptr.y : rest.y + 0.012 * Math.cos(f.t / 1700);
    d.x = hx + (s.x - hx) * take;
    d.y = hy + (s.y - hy) * take;
    d.r = 0.17 + 0.03 * smooth(win(q, 0.18, 0.5)) + open * 1.25;
    d.soft = 0.05 + open * 0.07;
    d.rim = 0.9 * (1 - open);
    d.fill = smooth(win(q, 0.74, 0.84));
    d.push = 1 + open * 0.08;
    const c = coverPt(0.37, 0.4, f.vw, f.vh);
    d.zx = c.x;
    d.zy = c.y;
    d.zoom = 1 + 0.12 * smooth(win(q, 0.62, 1));
    text(".rv-pct", `${String(Math.round(100 * clamp01((q - 0.04) / 0.76))).padStart(3, "0")}%`);
  });
  return (
    <div ref={ref} className="vh-canvas rv-canvas vh-rev-neura">
      <LensReveal base="/uploads/1/hooks/scenes/rev-face-a.png" top="/uploads/1/hooks/scenes/rev-face-b.png" drive={lens} rim="#4defff" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">◈ NEURA</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Scan</a><a href="#" onClick={stop}>Research</a><a href="#" onClick={stop}>Access</a></nav>
      </header>
      <h1 className="rv-h1">SEE<br /><em>BENEATH.</em></h1>
      <div className="rv-hud"><span>SCAN</span><b className="rv-pct">000%</b></div>
      <div className="rv-hint"><span className="hk-desk">Move across the face — then scroll to open the machine.</span><span className="hk-touch">Scroll — the scan moves across the face.</span></div>
      <div className="rv-end">
        <span className="rv-end-k">NEURA ONE — neural imaging</span>
        <p>Every pathway, mapped at 0.2 mm. A full scan takes twelve minutes.</p>
        <a href="#" onClick={stop} className="rv-end-cta">Book a scan →</a>
      </div>
    </div>
  );
}

const REV_MYTHIC_BEATS: readonly Beat[] = [["--night", 0.5, 0.82], ["--end", 0.82, 0.95]];
const MYTHIC_SUN = [[0.8, 0.14], [0.64, 0.3], [0.44, 0.6]] as const; // солнце-линза садится в туман долины
function RevMythic() {
  const ref = useRef<HTMLDivElement>(null);
  const lens = useRef(lensDrive({ x: 0.45, y: 0.55, r: 0.16, soft: 0.06, rim: 0.8 }));
  useHookClock(ref, REV_MYTHIC_BEATS, ({ q, f, touch, ptr }) => {
    const d = lens.current;
    const take = touch ? 1 : smooth(win(q, 0.04, 0.14));
    const dusk = smooth(win(q, 0.1, 0.5));
    const night = smooth(win(q, 0.5, 0.82));
    const [ix, iy] = path(MYTHIC_SUN, win(q, touch ? 0 : 0.1, 0.5));
    const s = coverPt(ix, iy, f.vw, f.vh, 2752 / 1536);
    const hx = ptr.on && !touch ? ptr.x : 0.46 + 0.02 * Math.sin(f.t / 1500);
    const hy = ptr.on && !touch ? ptr.y : 0.56 + 0.01 * Math.cos(f.t / 1900);
    d.x = hx + (s.x - hx) * take;
    d.y = hy + (s.y - hy) * take;
    d.r = 0.16 - 0.06 * dusk + night * 1.5;
    d.soft = 0.06 + 0.07 * night;
    d.dusk = dusk * (1 - night);
    d.rim = 0.95 * (1 - night);
    d.rc = mix3([0.26, 0.88, 0.75], [1, 0.62, 0.3], dusk); // бирюзовый обод → закатное солнце
    d.fill = smooth(win(q, 0.78, 0.86));
  });
  return (
    <div ref={ref} className="vh-canvas rv-canvas vh-rev-mythic">
      <LensReveal base="/uploads/1/hooks/scenes/rev-land-a.png" top="/uploads/1/hooks/scenes/rev-land-b.png" drive={lens} rim="#43e0c0" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">❋ MYTHIC</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Worlds</a><a href="#" onClick={stop}>Field</a><a href="#" onClick={stop}>Enter</a></nav>
      </header>
      <h1 className="rv-h1">IT COMES<br /><em>alive at night.</em></h1>
      <div className="rv-hint"><span className="hk-desk">Wander the cursor — or scroll the sun down.</span><span className="hk-touch">Scroll — the sun sets and the valley wakes.</span></div>
      <div className="rv-end">
        <span className="rv-end-k">Night walks · from 21:00</span>
        <p>Lantern-free trails through a valley that lights itself.</p>
        <a href="#" onClick={stop} className="rv-end-cta">Enter the valley →</a>
      </div>
    </div>
  );
}

const REV_IMP_BEATS: readonly Beat[] = [["--h", 0.5, 0.62], ["--flash", 0.74, 0.86], ["--end", 0.82, 0.95]];
const IMP_ROUTE = [[0.37, 0.28], [0.56, 0.25], [0.62, 0.64], [0.41, 0.64], [0.56, 0.25]] as const;
const IMP_NODES = ["LIS-01", "FRA-02", "SIN-03", "SYD-04", "FRA-02"];
function RevImperial() {
  const ref = useRef<HTMLDivElement>(null);
  const lens = useRef(lensDrive({ x: 0.4, y: 0.3, r: 0.15, soft: 0.045, rim: 0.9 }));
  useHookClock(ref, REV_IMP_BEATS, ({ q, f, touch, ptr, text }) => {
    const d = lens.current;
    const ia = 2752 / 1536;
    const take = touch ? 1 : smooth(win(q, 0.04, 0.14));
    const u = win(q, touch ? 0 : 0.14, 0.52);
    const [ix, iy] = path(IMP_ROUTE, u);
    const s = coverPt(ix, iy, f.vw, f.vh, ia);
    const rest = coverPt(0.37, 0.28, f.vw, f.vh, ia);
    const hx = ptr.on && !touch ? ptr.x : rest.x + 0.015 * Math.sin(f.t / 1400);
    const hy = ptr.on && !touch ? ptr.y : rest.y + 0.012 * Math.cos(f.t / 1800);
    const dive = smooth(win(q, 0.52, 0.86));
    const node = coverPt(0.56, 0.25, f.vw, f.vh, ia);
    d.x = hx + (s.x - hx) * take;
    d.y = hy + (s.y - hy) * take;
    d.r = 0.15 + dive * 1.2;
    d.soft = 0.045 + dive * 0.06;
    d.rim = 0.9 * (1 - dive);
    d.zx = node.x;
    d.zy = node.y;
    d.zoom = 1 + dive * 2.2;
    d.fill = smooth(win(q, 0.8, 0.88));
    text(".rv-node", IMP_NODES[Math.min(4, Math.round(u * 4))]);
    text(".rv-count", String(Math.round(12 + 130 * clamp01((q - 0.1) / 0.74))).padStart(3, "0"));
  });
  return (
    <div ref={ref} className="vh-canvas rv-canvas vh-rev-imperial">
      <LensReveal base="/uploads/1/hooks/scenes/rev-map-a.png" top="/uploads/1/hooks/scenes/rev-map-b.png" drive={lens} rim="#3df0ff" />
      <div className="rv-flash" />
      <header className="rv-head">
        <Link href="/visual-hooks" className="rv-brand">▦ IMPERIAL</Link>
        <nav className="rv-nav"><a href="#" onClick={stop}>Network</a><a href="#" onClick={stop}>Servers</a><a href="#" onClick={stop}>Pricing</a></nav>
      </header>
      <h1 className="rv-h1">MAP THE<br /><em>INVISIBLE.</em></h1>
      <div className="rv-hud"><span>NODE</span><b className="rv-node">LIS-01</b><span>LIVE</span><b className="rv-count">012</b></div>
      <div className="rv-hint"><span className="hk-desk">Trace the globe — then scroll along the private routes.</span><span className="hk-touch">Scroll — the lens follows the private routes.</span></div>
      <div className="rv-end">
        <span className="rv-end-k">FRA-02 · private node</span>
        <p>142 nodes, one network — 0.8 ms from the people you serve.</p>
        <a href="#" onClick={stop} className="rv-end-cta">Deploy your node →</a>
      </div>
    </div>
  );
}

/* ==== INTERACTIVE STORIES · bloom · held-world · monolith · planet-vigil · ascension ============================
   У каждой истории свой таймлайн (StoryTL): окна актов, склейка, передача лендингу. Склейка — zoom-through:
   камера въезжает в объект кадра 1 (зрачок, сфера, плита, точка на планете, свет сверху), кадр 2 открывается
   формой этого объекта и доезжает в ту же сторону — без кроссфейда и встречного зума. Скраб сглажен (lerp к цели
   по кадрам часов scene-kit), второй клип держит preload="metadata", пока камера не подошла к склейке.
   Финал hero совпадает с первой плитой Backdrop лендинга → вместо шва — перевод фокуса. */
const SL = "/uploads/1/hooks/land";
const SC = "/uploads/1/hooks/scenes";
type Scrub = React.RefObject<HTMLVideoElement | null>;
type StoryProps = { scrub: Scrub; scrub2: Scrub };
type SWin = [number, number];
type StoryTL = {
  v1: [number, number, number, number]; // окно p → доли длительности клипа 1
  v2: [number, number, number, number]; // то же для клипа 2
  cut: SWin; // склейка → --cut / --ce
  acts: SWin[]; // акты → --a1.. (линейно) и --e1.. (smoothstep)
  kind: "circle" | "rect" | "rise";
  a: [number, number, number]; // объект в кадре 1: u, v, радиус (доли ширины кадра)
  b: [number, number]; // тот же мотив в кадре 2
  box?: [number, number, number, number]; // силуэт плиты (rect): u0, v0, u1, v1
  z1: number; // наезд в кадр 1 за склейку
  s0: number; // стартовый масштаб кадра 2 внутри формы
  z2: number; // доезд кадра 2 после склейки (1+z2 ≈ масштаб плиты Backdrop → финал = первая плита лендинга)
  kb?: number; // лёгкий наезд кадра 1 до склейки
  pull?: boolean; // held-world: выход обратно сквозь стекло — мир сжимается в сферу
};
const STORY_TL: Record<string, StoryTL> = {
  bloom: { v1: [0, .44, 0, .985], v2: [.44, .80, 0, .985], cut: [.44, .58], acts: [[.10, .17], [.14, .44], [.64, .72], [.76, .82]], kind: "circle", a: [.535, .40, .022], b: [.55, .5], z1: 3.4, s0: .3, z2: .137, kb: .06 },
  "held-world": { v1: [0, .40, 0, .985], v2: [.40, .70, 0, .985], cut: [.40, .54], acts: [[.12, .20], [.18, .40], [.54, .68], [.66, .78]], kind: "circle", a: [.45, .56, .19], b: [.46, .5], z1: 1.5, s0: .6, z2: .1, kb: .05, pull: true },
  monolith: { v1: [0, .46, 0, .985], v2: [.46, .74, 0, .985], cut: [.46, .60], acts: [[.14, .22], [.22, .47], [.60, .70], [.69, .80]], kind: "rect", a: [.5025, .39, 0], b: [.5, .47], box: [.295, 0, .71, .78], z1: 1.25, s0: .85, z2: .06, kb: .04 },
  "planet-vigil": { v1: [0, .42, 0, .985], v2: [.42, .80, 0, .985], cut: [.42, .56], acts: [[.10, .17], [.15, .42], [.58, .78], [.76, .82]], kind: "circle", a: [.52, .30, .03], b: [.6, .44], z1: 2.6, s0: .4, z2: .137, kb: .05 },
  ascension: { v1: [0, .40, 0, .58], v2: [.38, .80, 0, .62], cut: [.38, .54], acts: [[.07, .13], [.12, .38], [.56, .78], [.76, .82]], kind: "rise", a: [.46, -.1, 0], b: [.46, -.1], z1: 1.25, s0: 1, z2: .137, kb: .04 },
};

// Часы истории: один подписчик общего rAF scene-kit. Пишет --p (сглаженный), акты, геометрию склейки; ведёт оба клипа.
function useStoryClock(root: React.RefObject<HTMLElement | null>, slug: string, scrub: Scrub, scrub2: Scrub) {
  useEffect(() => {
    const tl = STORY_TL[slug];
    const node = root.current;
    if (!tl || !node) return;
    const stage = node.querySelector<HTMLElement>(".vh-stage");
    const g = { W: 1, H: 1, ax: 0, ay: 0, ar: 0, bx: 0, by: 0, x0: 0, y0: 0, x1: 0, y1: 0, diag: 1, D: 0 };
    let sp = -1;
    let last = -1;
    let phase = "";
    const measure = () => {
      const W = stage?.clientWidth || innerWidth;
      const H = stage?.clientHeight || innerHeight;
      // object-fit: cover → точка кадра (u,v) в пикселях сцены
      const cover = (v: HTMLVideoElement | null, dw: number, dh: number) => {
        const vw = v?.videoWidth || dw;
        const vh = v?.videoHeight || dh;
        const sc = Math.max(W / vw, H / vh);
        return (u: number, t: number) => [(W - vw * sc) / 2 + u * vw * sc, (H - vh * sc) / 2 + t * vh * sc, vw * sc] as const;
      };
      const m1 = cover(scrub.current, 1920, 1080);
      const m2 = cover(scrub2.current, 1928, 1076);
      const [ax, ay, w1] = m1(tl.a[0], tl.a[1]);
      const [bx, by] = m2(tl.b[0], tl.b[1]);
      Object.assign(g, { W, H, ax, ay, ar: tl.a[2] * w1, bx, by, diag: Math.hypot(W, H), D: (W <= 800 ? Math.min(W * 0.84, H * 0.6) : Math.min(W * 0.44, H * 0.72)) * 0.636 }); // = --orbD лендинга
      if (tl.box) {
        const [x0, y0] = m1(tl.box[0], tl.box[1]);
        const [x1, y1] = m1(tl.box[2], tl.box[3]);
        Object.assign(g, { x0, y0, x1, y1 });
      }
      last = -1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage) ro.observe(stage);
    const vids = [scrub.current, scrub2.current];
    vids.forEach((v) => v?.addEventListener("loadedmetadata", measure));
    const px = (v: number) => `${v.toFixed(1)}px`;
    const set = (k: string, v: number | string) => node.style.setProperty(k, typeof v === "number" ? v.toFixed(4) : v);
    const map = (p: number, m: number[]) => m[2] + (m[3] - m[2]) * clamp01((p - m[0]) / (m[1] - m[0]));
    const seek = (v: HTMLVideoElement | null, f: number) => {
      if (!v || !v.duration || v.readyState < 1) return;
      const t = Math.min(v.duration - 0.04, f * v.duration);
      if (Math.abs(v.currentTime - t) > 0.02 && !v.seeking) v.currentTime = t;
    };
    const unsub = subscribe(({ dt, reduced }) => {
      const r = node.getBoundingClientRect();
      const travel = Math.max(1, node.offsetHeight - innerHeight);
      const target = clamp01(-r.top / travel);
      // сглаживание: колесо даёт ступеньки — камера доезжает к цели (lerp 0.12 на кадр 60fps)
      if (sp < 0 || reduced) sp = target;
      else {
        sp += (target - sp) * (1 - Math.pow(0.88, dt / 16.67));
        if (Math.abs(target - sp) < 3e-4) sp = target;
      }
      seek(scrub.current, map(sp, tl.v1));
      seek(scrub2.current, map(sp, tl.v2));
      const v2 = scrub2.current;
      if (v2 && v2.preload !== "auto" && sp > tl.cut[0] - 0.22) v2.preload = "auto";
      if (sp === last) return;
      last = sp;
      const p = sp;
      set("--p", p);
      tl.acts.forEach((w, i) => {
        const a = clamp01((p - w[0]) / (w[1] - w[0]));
        set(`--a${i + 1}`, a);
        set(`--e${i + 1}`, smooth(a));
      });
      const cut = clamp01((p - tl.cut[0]) / (tl.cut[1] - tl.cut[0]));
      const ci = Math.pow(cut, 1.7);
      const co = 1 - (1 - cut) * (1 - cut);
      const post = clamp01((p - tl.cut[1]) / Math.max(0.01, tl.v2[1] - tl.cut[1]));
      const s1 = (1 + (tl.kb ?? 0) * clamp01(p / tl.cut[0])) * (1 + tl.z1 * ci);
      let s2 = 1;
      let tx2 = 0;
      let ty2 = 0;
      const ty1 = 0;
      let o2x = g.W / 2;
      let o2y = g.H / 2;
      if (tl.kind === "rise") {
        // подъём к свету: кадр 1 растёт от верхней кромки (источник света) — туман и фигура уходят вниз за кадр,
        // кадр 2 спускается сверху на место; обе части движутся вниз — камера идёт вверх
        ty2 = -(1 - co) * g.H * 0.3;
        s2 = 1 + tl.z2 * smooth(post);
      } else if (cut < 1) {
        // кадр 2 доезжает до полного кадра к 0.8 склейки — дальше форма может закрыть экран без видимых краёв клипа
        const k = 1 - Math.pow(1 - clamp01(cut / 0.8), 2);
        s2 = tl.s0 + (1 - tl.s0) * k;
        tx2 = (1 - k) * (g.ax - g.bx);
        ty2 = (1 - k) * (g.ay - g.by);
        o2x = g.bx;
        o2y = g.by;
      } else s2 = 1 + tl.z2 * smooth(post);
      // «след» кадра 2 на сцене: форма не выходит за его края, пока он не заполнил кадр
      const fl = o2x * (1 - s2) + tx2;
      const fr = o2x + (g.W - o2x) * s2 + tx2;
      const ft = o2y * (1 - s2) + ty2;
      const fb = o2y + (g.H - o2y) * s2 + ty2;
      const full = tl.kind === "rise" || s2 >= 0.999;
      set("--cut", cut);
      set("--ce", smooth(cut));
      set("--s1", s1);
      set("--ty1", px(ty1));
      set("--f1", ci > 0.002 ? `blur(${(ci * 7).toFixed(2)}px) brightness(${(1 + ci * 0.3).toFixed(3)})` : "none");
      set("--s2", s2);
      set("--tx2", px(tx2));
      set("--ty2", px(ty2));
      set("--o2x", px(o2x));
      set("--o2y", px(o2y));
      set("--ax", px(g.ax));
      set("--ay", px(g.ay));
      let R = g.ar * s1 * clamp01(cut / 0.3) + Math.pow(cut, 2.2) * g.diag * 1.1;
      if (!full) R = Math.min(R, Math.max(0, Math.min(g.ax - fl, fr - g.ax, g.ay - ft, fb - g.ay)));
      set("--R", px(R));
      set("--rim", Math.sin(Math.PI * clamp01(cut / 0.9)));
      if (tl.box) {
        const ext = Math.pow(cut, 2.2) * g.diag * 0.6;
        // проём = силуэт плиты (растёт с наездом) ∩ след кадра 2
        set("--il", px(Math.max(0, g.ax - (g.ax - g.x0) * s1 - ext, full ? 0 : fl)));
        set("--ir", px(Math.max(0, g.W - (g.ax + (g.x1 - g.ax) * s1) - ext, full ? 0 : g.W - fr)));
        set("--it", px(Math.max(0, g.ay - (g.ay - g.y0) * s1 - ext, full ? 0 : ft)));
        set("--ib", px(Math.max(0, g.H - (g.ay + (g.y1 - g.ay) * s1) - ext, full ? 0 : g.H - fb)));
        set("--o2", clamp01(cut / 0.28));
      }
      if (tl.pull) {
        const w = tl.acts[3];
        const e = smooth(clamp01((p - w[0]) / (w[1] - w[0])));
        // фаза A: диафрагма закрывается до вписанного круга (углы гаснут); фаза B: круг вместе с миром уезжает в сферу Ø D
        const eA = clamp01(e / 0.3);
        const eB = clamp01((e - 0.3) / 0.7);
        const m = Math.min(g.W, g.H); // коробка .hs-cut (масштаб pS) обрезает кадр по меньшей стороне
        const inner = m / 2;
        const pS = 1 - eB * (1 - (g.D * 1.12) / m);
        const vis = eB > 0 ? inner + (g.D / 2 - inner) * eB : g.diag * 0.55 + (inner - g.diag * 0.55) * eA;
        set("--pS", pS);
        set("--pR", px(vis / pS));
        set("--D", px(g.D));
      }
      const ph = cut <= 0 ? "pre" : cut >= 1 ? "post" : "on";
      if (ph !== phase) node.dataset.cut = phase = ph;
    });
    return () => {
      unsub();
      ro.disconnect();
      vids.forEach((v) => v?.removeEventListener("loadedmetadata", measure));
    };
  }, [root, slug, scrub, scrub2]);
}

function HeldWorld({ scrub, scrub2 }: StoryProps) {
  return (
    <div className="vh-canvas hw-canvas">
      <Media src={`${SC}/held-world-vid.mp4`} poster={`${SC}/held-world-poster.jpg`} className="hw-film hs-film" scrubRef={scrub} />
      {/* нырок в сферу: мир открывается кругом стекла и растёт в ту же сторону; в финале — обратно наружу, мир сжимается в сферу */}
      <div className="hw-pull">
        <div className="hs-cut"><Media src={`${SC}/held-reveal-vid.mp4`} poster={`${SC}/held-reveal.png`} className="hw-splice" scrubRef={scrub2} preload="metadata" /></div>
      </div>
      <i className="hs-rim hw-rim" aria-hidden />
      <i className="hw-glass or-glass" aria-hidden />
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
      {/* одна фраза, разрезанная склейкой: до — снаружи стекла, после — внутри мира */}
      <p className="hw-half hw-h1 hw-act">Small enough<br />to <em>hold.</em><span>Ø 9 cm · sealed glass</span></p>
      <p className="hw-half hw-h2 hw-act">Vast enough<br />to <em>fall into.</em><span>40 km of coast · three summits · one sea</span></p>
    </div>
  );
}

function Monolith({ scrub, scrub2 }: StoryProps) {
  return (
    <div className="vh-canvas mn-canvas">
      <Media src={`${SC}/monolith-vid.mp4`} poster={`${SC}/monolith-poster.jpg`} className="mn-film hs-film" scrubRef={scrub} />
      {/* склейка формой плиты: её тёмная грань загорается рунами и растёт до кадра */}
      <div className="hs-cut mn-cut"><Media src={`${SC}/monolith-reveal-vid.mp4`} poster={`${SC}/monolith-reveal.png`} className="mn-splice" scrubRef={scrub2} preload="metadata" /></div>
      <i className="mn-rim" aria-hidden />
      {/* трещина рун — портал в ночь: та же плита под Млечным путём (первая плита лендинга) */}
      <div className="mn-glow" aria-hidden><i /></div>
      <div className="mn-night" aria-hidden><img src={`${SL}/obe-night.jpg`} alt="" /></div>
      <div className="mn-wash" />
      <div className="mn-embers" aria-hidden>{Array.from({ length: 10 }).map((_, i) => <span key={i} className={`mn-ember e${i + 1}`} />)}</div>
      <header className="mn-head">
        <span className="mn-side">Est. MMXXVI</span>
        <Link href="/visual-hooks" className="mn-brand">OBELISK</Link>
        <span className="mn-side mn-r">Nevada, USA</span>
      </header>
      <h1 className="mn-h1 mn-act">IN SILENCE<br /><em>IT REMEMBERS</em></h1>
      <div className="mn-foot mn-act">A monument to everything that refuses to be explained.</div>
      <ol className="mn-verse mn-act"><li>Older than the road.</li><li>Older than the town.</li><li>Older than <em>the word for it.</em></li></ol>
      <p className="mn-read mn-act"><span>Carved · undated · undeciphered</span>Nine marks. <em>No one has read them.</em></p>
    </div>
  );
}

function PlanetVigil({ scrub, scrub2 }: StoryProps) {
  return (
    <div className="vh-canvas pv-canvas">
      <Media src={`${SC}/planet-vig-vid.mp4`} poster={`${SC}/planet-vig-poster.jpg`} className="pv-film hs-film" scrubRef={scrub} />
      {/* её взгляд → точка на планете → подъём на орбиту: круг атмосферы раскрывает орбиту */}
      <div className="hs-cut"><Media src={`${SC}/planet-reveal-vid.mp4`} poster={`${SC}/planet-reveal.png`} className="pv-splice" scrubRef={scrub2} preload="metadata" /></div>
      <i className="hs-rim pv-rim" aria-hidden />
      <div className="pv-wash" />
      <div className="pv-dust" aria-hidden>{Array.from({ length: 9 }).map((_, i) => <span key={i} className={`pv-speck s${i + 1}`} />)}</div>
      <header className="pv-head">
        <Link href="/visual-hooks" className="pv-brand">◐ VIGIL</Link>
        <nav className="pv-nav"><a href="#" onClick={stop}>Observe</a><a href="#" onClick={stop}>Missions</a><a href="#" onClick={stop}>Log</a></nav>
      </header>
      <h1 className="pv-h1 pv-act">We are small.<br /><em>Keep watching.</em></h1>
      <div className="pv-coord pv-act">Vigil 001 · Meridian</div>
      {/* обратный отсчёт до восхода планеты: скролл = время вахты */}
      <div className="pv-count pv-act">
        <span>Planetrise in</span>
        <b className="pv-clock"><i className="m" />:<i className="s" /></b>
        <p>She has kept this watch for 212 nights.</p>
      </div>
      <div className="pv-hud pv-act"><span>Orbit · 412 km</span><span>Night side · 7 relays online</span><span>Meridian · dust storm rising</span></div>
    </div>
  );
}

function Ascension({ scrub, scrub2 }: StoryProps) {
  return (
    <div className="vh-canvas as-canvas">
      <Media src={`${SC}/ascension-vid.mp4`} poster={`${SC}/ascension-poster.jpg`} className="as-film hs-film" scrubRef={scrub} />
      {/* подъём сквозь туман: свет открывается сверху мягким овалом, оба кадра движутся вниз — камера идёт вверх */}
      <div className="hs-cut as-cut"><Media src={`${SC}/ascension-reveal-vid.mp4`} poster={`${SC}/ascension-reveal.png`} className="as-splice" scrubRef={scrub2} preload="metadata" /></div>
      <i className="as-rim" aria-hidden />
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
      {/* манифест — дыхание: вдох, задержка, выдох идут скроллом */}
      <div className="as-breath as-act" aria-hidden><i className="as-orb" /><span className="w1">breathe in</span><span className="w2">hold</span><span className="w3">let it go</span></div>
      <p className="as-quiet as-act">Above the noise,<br /><em>it is quiet.</em></p>
    </div>
  );
}

function Bloom({ scrub, scrub2 }: StoryProps) {
  const log = [
    { d: "001", t: "Seeded into living skin." },
    { d: "040", t: "First veins carry light." },
    { d: "120", t: "The garden answers back." },
  ];
  return (
    <div className="vh-canvas bl-canvas">
      {/* кадр 1: лицо, цветы раскрываются скроллом (скраб = таймлапс роста) */}
      <Media src={`${SC}/bloom-vid.mp4`} poster={`${SC}/bloom-poster.jpg`} className="bl-film hs-film" scrubRef={scrub} />
      {/* склейка сквозь её глаз: макро-глаз открывается кругом зрачка и доезжает вперёд */}
      <div className="hs-cut"><Media src={`${SC}/bloom-eye-vid.mp4`} poster={`${SC}/bloom-eye.png`} className="bl-eye" scrubRef={scrub2} preload="metadata" /></div>
      <i className="hs-rim bl-rim" aria-hidden />
      <div className="bl-vignette" />
      <div className="bl-petals" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className={`bl-petal p${i + 1}`} />)}
      </div>
      {/* передний план: ветка пролетает мимо камеры на наезде (глубина), а не висит поверх глаза */}
      <img className="bl-fg" src={`${SC}/bloom-fg.png`} alt="" aria-hidden />
      <header className="bl-head">
        <Link href="/visual-hooks" className="bl-brand">❀ Bloom</Link>
        <nav className="bl-nav"><a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop}>Collections</a><a href="#" onClick={stop}>Rituals</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <div className="bl-card bl-act">
        <span className="bl-eyebrow">Cyber-botanical systems</span>
        <h1>Silicon, grown<br />like a <em>garden.</em></h1>
        <p>We engineer living circuitry that heals an ecosystem while it grows inside it.</p>
      </div>
      {/* манифест — журнал роста: счётчик дней идёт скроллом */}
      <div className="bl-log bl-act">
        <span className="bl-day">Day <i /></span>
        <ol>{log.map((l, i) => <li key={l.d} className={`l${i + 1}`}><b>Day {l.d}</b>{l.t}</li>)}</ol>
      </div>
      <p className="bl-woke bl-act"><b>Day 212.</b> It opened <em>its eyes.</em></p>
    </div>
  );
}

/* living-object: скраб «запечатано → свет в шве» → камера входит в свет шва → выход на проснувшийся объект,
   характеристики-остановки → бронь тиража. */
const LO_BEATS: readonly Beat[] = [["--wake", 0, 0.36], ["--dive", 0.36, 0.58], ["--flash", 0.44, 0.58], ["--out", 0.6, 0.74], ["--s1", 0.68, 0.74], ["--s2", 0.75, 0.81], ["--s3", 0.82, 0.88], ["--end", 0.88, 0.97]];
function LivingObject(_: { scrub: React.RefObject<HTMLVideoElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  useHookClock(ref, LO_BEATS, ({ q }) => seek(vid.current, 4.95 * smooth(win(q, 0, 0.36))));
  return (
    <div ref={ref} className="vh-canvas lo-canvas">
      <ScrubVideo vref={vid} src="/uploads/1/hooks/ovoid-hero.mp4" poster="/uploads/1/hooks/ovoid-hero-poster.jpg" className="lo-film" />
      <div className="lo-seam" />
      <div className="lo-glow" />
      <div className="lo-wash" />
      <img className="lo-awake" src="/uploads/1/hooks/bot-ovoid-reveal-open.png" alt="" />
      <div className="lo-flash" />
      <header className="lo-head">
        <Link href="/visual-hooks" className="lo-brand">AURA</Link>
        <div className="lo-meta"><span>Objects</span><i /><span>New York — 20:41</span></div>
        <a href="#" onClick={stop} className="lo-reserve">Reserve ↗</a>
      </header>
      <div className="lo-copy">
        <span className="lo-eyebrow">N°01 — Sealed object</span>
        <h1>It wakes<br /><em>when you do.</em></h1>
      </div>
      <div className="lo-copy lo-copy2">
        <span className="lo-eyebrow">N°01 — Awake</span>
        <p className="lo-h2">Light, from<br /><em>the inside.</em></p>
      </div>
      <ol className="lo-specs">
        <li className="s1"><b>01</b><span>Hand-blown glass</span><i>3 mm wall, frosted by hand</i></li>
        <li className="s2"><b>02</b><span>Travertine base</span><i>cut from a single Tivoli block</i></li>
        <li className="s3"><b>03</b><span>Seam light</span><i>2700 K — wakes as you approach</i></li>
      </ol>
      <div className="lo-end"><span>Edition of 40 · ships in spring</span><a href="#" onClick={stop} className="lo-end-cta">Reserve N°01 ↗</a></div>
    </div>
  );
}

const stop = (e: React.MouseEvent) => e.preventDefault();

/* cloud-step: Carry — кроссовок падает сквозь облака вместе со зрителем (буквы улетают вверх, белая вспышка
   облака), приземляется на пол студии и становится дропом из трёх расцветок. */
const CS_BEATS: readonly Beat[] = [["--fall", 0.14, 0.64], ["--land", 0.6, 0.78], ["--drop", 0.8, 0.94]];
function CloudStep() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, CS_BEATS, ({ q, f, set }) => {
    set("--spd", Math.sin(Math.PI * smooth(win(q, 0.14, 0.64))));
    set("--wo", Math.pow(Math.sin(Math.PI * win(q, 0.3, 0.52)), 2));
    set("--float", f.reduced ? 0 : Math.sin(f.t / 950) * 14 * (1 - smooth(win(q, 0.6, 0.72))));
  });
  return (
    <div ref={ref} className="vh-canvas cs-canvas">
      <Media src="/uploads/1/hooks/scenes/cloud-sky-vid.mp4" poster="/uploads/1/hooks/scenes/s1-sky.png" className="cs-sky" />
      <div className="cs-bank cs-bank-far" />
      <header className="cs-head">
        <Link href="/visual-hooks" className="cs-brand">AFTERSHOCK</Link>
        <nav><a href="#" onClick={stop}>New</a><a href="#" onClick={stop}>Men</a><a href="#" onClick={stop}>Women</a><a href="#" onClick={stop}>Lab</a></nav>
        <div className="cs-actions"><a href="#" onClick={stop}>Search</a><a href="#" onClick={stop} className="cs-bag">Bag · 2</a></div>
      </header>
      <h1 className="cs-h1">IN THE<br />CLOUDS</h1>
      <div className="cs-ground" />
      <div className="cs-contact" />
      <img className="cs-shoe" src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" />
      <div className="cs-bank cs-bank-near" />
      <div className="cs-white" />
      <div className="cs-card"><img src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" /><div className="cs-card-info"><b>Nimbus Hi</b><span>$240</span></div><a href="#" onClick={stop} className="cs-add">Add to bag</a></div>
      <div className="cs-tag">Statement men’s kick — cushioned for altitude.</div>
      <div className="cs-drop">
        <span className="cs-drop-k">Nimbus Hi — landed. Three colourways.</span>
        <div className="cs-ways">
          <figure><img src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" /><figcaption>Blush</figcaption></figure>
          <figure className="w2"><img src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" /><figcaption>Glacier</figcaption></figure>
          <figure className="w3"><img src="/uploads/1/hooks/scenes/s1-sneaker-cut.png" alt="" /><figcaption>Dune</figcaption></figure>
        </div>
        <div className="cs-drop-row"><b>$240</b><a href="#" onClick={stop} className="cs-add">Add to bag</a><a href="#" onClick={stop} className="cs-drop-all">Shop the drop →</a></div>
      </div>
    </div>
  );
}

/* strata: скан-линия режет каменную ленту на пласты (каждый разрез — возможность продукта), пласты
   складываются обратно — и из них собирается история инцидента. */
const STR_BEATS: readonly Beat[] = [["--take", 0.1, 0.18], ["--swap", 0.1, 0.16], ["--c1", 0.18, 0.3], ["--c2", 0.32, 0.44], ["--c3", 0.46, 0.58], ["--close", 0.64, 0.78], ["--end", 0.78, 0.93]];
const STR_SCAN = [[0.16, 20], [0.3, 35], [0.44, 52], [0.58, 69], [0.66, 86]] as const; // [q, top %] — скан ложится на границы пластов
function Strata() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, STR_BEATS, ({ q, set, text }) => {
    let y: number = STR_SCAN[0][1];
    for (let i = 1; i < STR_SCAN.length; i++) {
      const [a, ya] = STR_SCAN[i - 1];
      const [b, yb] = STR_SCAN[i];
      if (q >= a) y = ya + (yb - ya) * clamp01((q - a) / (b - a));
    }
    set("--sy", `${y.toFixed(2)}%`);
    text(".str-index span", `0${q < 0.3 ? 1 : q < 0.44 ? 2 : q < 0.66 ? 3 : 4}`);
  });
  return (
    <div ref={ref} className="vh-canvas str-canvas">
      <Media src="/uploads/1/hooks/scenes/strata-vid.mp4" poster="/uploads/1/hooks/scenes/s2-strata.png" className="str-bg" />
      <div className="str-layers">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`str-band b${i}`}><img src="/uploads/1/hooks/scenes/s2-strata.png" alt="" /></div>
        ))}
      </div>
      <div className="str-scan" />
      <ol className="str-cuts">
        <li className="k1"><b>01 Collect</b><span>every log, every source — 2.1 M lines a minute</span></li>
        <li className="k2"><b>02 Parse</b><span>structure pulled out of noise</span></li>
        <li className="k3"><b>03 Correlate</b><span>events line up across systems</span></li>
      </ol>
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
      <div className="str-story">
        <span className="str-story-k">04 Tell — incident #2231</span>
        <ol>
          <li><b>09:41:07</b>deploy v2.18 to eu-west</li>
          <li><b>09:41:52</b>checkout latency ×3</li>
          <li><b>09:42:10</b>auto-rollback to v2.17</li>
          <li><b>09:42:31</b>resolved — 84 seconds, end to end</li>
        </ol>
        <a href="#" onClick={stop} className="str-story-cta">Read your first story →</a>
      </div>
    </div>
  );
}

/* reverie: кольцо света на фото — WebGL-портал (мягкий край + обод, центр по кольцу); лес «проталкивается»,
   камера летит к замку, и его окно становится следующим порталом. */
const REV_BEATS: readonly Beat[] = [["--h", 0.06, 0.24], ["--cap", 0.5, 0.62], ["--next", 0.76, 0.94], ["--end", 0.84, 0.96]];
function Reverie() {
  const ref = useRef<HTMLDivElement>(null);
  const lens = useRef(lensDrive({ x: 0.525, y: 0.39, r: 0.085, soft: 0.022, rim: 1.15 }));
  useHookClock(ref, REV_BEATS, ({ q, f, set }) => {
    const d = lens.current;
    const ring = coverPt(0.523, 0.39, f.vw, f.vh);
    const castle = coverPt(0.565, 0.3, f.vw, f.vh);
    const open = smooth(win(q, 0.04, 0.46));
    const fly = smooth(win(q, 0.46, 0.84));
    d.x = ring.x;
    d.y = ring.y;
    d.r = 0.085 + open * 1.25;
    d.soft = 0.022 + open * 0.09;
    d.rim = 1.15 * (1 - open * 0.9);
    d.push = 1 + open * 0.45;
    d.fill = smooth(win(q, 0.4, 0.48));
    d.zx = castle.x;
    d.zy = castle.y;
    d.zoom = 1 + fly * 1.35;
    set("--ringx", pct(ring.x));
    set("--ringy", pct(ring.y));
    set("--cx", pct(castle.x));
    set("--cy", pct(castle.y));
  });
  return (
    <div ref={ref} className="vh-canvas rev-canvas">
      <LensReveal base="/uploads/1/hooks/scenes/s3-forest.png" top="/uploads/1/hooks/scenes/reverie-world-vid.mp4" video drive={lens} rim="#ffb347" />
      <div className="rev-vignette" />
      <div className="rev-next"><i /></div>
      <header className="rev-head">
        <span className="rev-side">Worlds</span>
        <Link href="/visual-hooks" className="rev-brand">REVERIE</Link>
        <a href="#" onClick={stop} className="rev-side rev-enter">Enter ↵</a>
      </header>
      <h1 className="rev-h1">FALL <em>INTO</em><br />REVERIE</h1>
      <p className="rev-cap">Chapter I — The golden realm</p>
      <div className="rev-hint"><span>Scroll to cross over ↓</span></div>
      <div className="rev-end"><span>Every window here is a door.</span><a href="#" onClick={stop} className="rev-end-cta">Enter the next world ↵</a></div>
    </div>
  );
}

/* vanguard: три команды — по одной на бит скролла, команда стоит ЗА словами (контурный шрифт); в «O» последнего
   слова камера ныряет — тёмный штрих буквы становится финальным кадром. */
const VAN_BEATS: readonly Beat[] = [["--h", 0.06, 0.14], ["--w1", 0.1, 0.34, true], ["--w2", 0.32, 0.54, true], ["--w3", 0.52, 0.68], ["--crew", 0.1, 0.7], ["--dive", 0.7, 0.86], ["--end", 0.84, 0.95]];
function Vanguard() {
  const ref = useRef<HTMLDivElement>(null);
  const geo = useRef({ vw: 0, fonts: "" });
  useHookClock(ref, VAN_BEATS, ({ q, f, el, set, text }) => {
    const fs = document.fonts?.status ?? "loaded";
    if (geo.current.vw !== f.vw || geo.current.fonts !== fs) {
      const o = el.querySelector<HTMLElement>(".van-o");
      if (o) {
        geo.current = { vw: f.vw, fonts: fs };
        set("--ox", `${(o.offsetLeft + o.offsetWidth * 0.15).toFixed(1)}px`);
        set("--oy", `${(o.offsetTop + o.offsetHeight * 0.5).toFixed(1)}px`);
      }
    }
    const c = smooth(win(q, 0.86, 0.95));
    text(".van-n1", `${Math.round(250 * c)}+`);
    text(".van-n2", `${Math.round(95 * c)}%`);
    text(".van-n3", `${Math.round(10 * c)}+`);
  });
  return (
    <div ref={ref} className="vh-canvas van-canvas">
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
      <div className="van-kin" aria-hidden="true">
        <span className="van-w van-w1">DESIGN.</span>
        <span className="van-w van-w2"><i>DISRUPT.</i><i>DISRUPT.</i></span>
        <span className="van-w van-w3">C<span className="van-o">O</span>NQUER.</span>
      </div>
      <div className="van-end">
        <p className="van-end-h">Your brand<br />is next.</p>
        <div className="van-end-stats"><div><b className="van-n1">250+</b><span>Brands transformed</span></div><div><b className="van-n2">95%</b><span>Client retention</span></div><div><b className="van-n3">10+</b><span>Years in the arena</span></div></div>
        <a href="#" onClick={stop} className="van-end-cta">Get in touch →</a>
      </div>
    </div>
  );
}

/* aether: камера поднимается сквозь лавандовый туман — из него выходит монолит-резиденция и дышит
   (медленный пульс света), характеристики-остановки → частный показ. */
const AET_BEATS: readonly Beat[] = [["--rise", 0.1, 0.55], ["--h", 0.2, 0.36], ["--m1", 0.56, 0.62], ["--m2", 0.63, 0.69], ["--m3", 0.7, 0.76], ["--end", 0.8, 0.94]];
function Aether() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, AET_BEATS, ({ q, f, set }) => {
    const breath = f.reduced ? 0.5 : 0.5 - 0.5 * Math.cos((f.t / 1000) * ((Math.PI * 2) / 7)); // вдох раз в 7 с
    set("--breath", breath * smooth(win(q, 0.3, 0.55)));
  });
  return (
    <div ref={ref} className="vh-canvas aet-canvas">
      <div className="aet-monowrap"><img className="aet-mono" src="/uploads/1/hooks/scenes/s5-monolith.png" alt="" /><i className="aet-window" /></div>
      <div className="aet-glow" />
      <Media src="/uploads/1/hooks/scenes/aether-world-vid.mp4" poster="/uploads/1/hooks/scenes/s5b-world.png" className="aet-bg" />
      <header className="aet-head">
        <Link href="/visual-hooks" className="aet-brand">Aether Lane</Link>
        <nav><a href="#" onClick={stop}>Estates</a><a href="#" onClick={stop}>Journal</a><a href="#" onClick={stop}>Enquire</a></nav>
      </header>
      <div className="aet-copy">
        <h1>Space, refined<br />beyond the footprint.</h1>
        <a href="#" onClick={stop} className="aet-glass">Explore estates ↗</a>
      </div>
      <div className="aet-house">
        <span className="aet-house-k">N°1 — The Monolith House</span>
        <ul>
          <li className="m1"><b>420 m²</b>of quiet, on three levels</li>
          <li className="m2"><b>1 of 1</b>cast in dark basalt concrete</li>
          <li className="m3"><b>Lake Como</b>above the fog line</li>
        </ul>
        <a href="#" onClick={stop} className="aet-glass">Book a private viewing ↗</a>
      </div>
      <span className="aet-corner aet-bl">Est. 2019</span>
      <span className="aet-corner aet-br">Selected residences — worldwide</span>
    </div>
  );
}

/* botanica: вернули слои объект + тень (вырезка). Скролл ведёт солнце через день — тень вращается и удлиняется,
   свет теплеет; на десктопе тень ещё и тянется за рукой. В сумерках тень накрывает кадр → комната с растением. */
const BOT_BEATS: readonly Beat[] = [["--day", 0.06, 0.66, true], ["--warm", 0.34, 0.66], ["--dusk", 0.64, 0.78], ["--room", 0.79, 0.9], ["--end", 0.86, 0.96]];
function Botanica() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, BOT_BEATS, ({ q, touch, ptr, set, text }) => {
    const day = win(q, 0.06, 0.66);
    const hand = !touch && ptr.on ? (ptr.x - 0.5) * 44 : 0; // тень тянется за рукой: ±22°
    set("--az", `${(-72 + 144 * day + hand).toFixed(2)}deg`);
    set("--len", 1.5 - 1.05 * Math.sin(Math.PI * day) + 0.45 * day + 2.6 * smooth(win(q, 0.62, 0.8)));
    const m = Math.round(400 + day * 830);
    text(".bot-clock b", `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  });
  return (
    <div ref={ref} className="vh-canvas bot-canvas">
      <div className="bot-sunpatch" />
      <div className="bot-floor" />
      <div className="bot-shadow-w"><img className="bot-shadow" src="/uploads/1/hooks/scenes/s6-object-cut.png" alt="" /></div>
      <img className="bot-object" src="/uploads/1/hooks/scenes/s6-object-cut.png" alt="" />
      <div className="bot-light" />
      <div className="bot-duskfall" />
      <img className="bot-room" src="/uploads/1/hooks/scenes/s6b-scene.png" alt="" />
      <header className="bot-head">
        <Link href="/visual-hooks" className="bot-brand">botanica</Link>
        <nav><a href="#" onClick={stop}>Systems</a><a href="#" onClick={stop}>Science</a><a href="#" onClick={stop}>Journal</a></nav>
        <a href="#" onClick={stop} className="bot-cta">Field kit</a>
      </header>
      <h1 className="bot-h1">GROW<br />WHAT <em>LISTENS</em></h1>
      <ol className="bot-list"><li><b>01</b><span>Quiet systems that read the room</span></li><li><b>02</b><span>Light that follows your attention</span></li></ol>
      <div className="bot-clock"><span>Sun · <i className="hk-desk">scroll or move your hand</i><i className="hk-touch">scroll</i></span><b>06:40</b></div>
      <div className="bot-end">
        <span className="bot-end-k">After dark — the field kit</span>
        <p>A living system that reads the room: light, water and quiet, tuned to one plant.</p>
        <a href="#" onClick={stop} className="bot-end-cta">Get the field kit →</a>
      </div>
    </div>
  );
}

/* neon-forge: ковка по скроллу — осколок раскаляется (TEMP до 1480°), закаляется паром и выходит хромом с неоновой
   кромкой; затем переезжает (Carry) в карточку сплава. Видео в screen-бленде — чёрный фон прозрачен, сетка видна. */
const NF_BEATS: readonly Beat[] = [["--edge", 0.46, 0.62], ["--carry", 0.62, 0.82], ["--end", 0.8, 0.94]];
function NeonForge() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, NF_BEATS, ({ q, set, text }) => {
    const heat = smooth(win(q, 0.1, 0.34)) * (1 - smooth(win(q, 0.38, 0.5)));
    set("--heat", heat);
    set("--steam", Math.sin(Math.PI * win(q, 0.36, 0.54)));
    text(".nf-temp", `${Math.round(24 + 1456 * heat)}°`);
    text(".nf-flow", (0.94 * heat).toFixed(2));
    text(".nf-state", q < 0.1 ? "IDLE" : q < 0.37 ? "MOLTEN" : q < 0.5 ? "QUENCH" : "FORGED");
  });
  return (
    <div ref={ref} className="vh-canvas nf-canvas">
      <div className="nf-grid" />
      <Media src="/uploads/1/hooks/scenes/neon-vid.mp4" poster="/uploads/1/hooks/scenes/s7-chrome.png" className="nf-bg" />
      <div className="nf-heatglow" />
      <div className="nf-steam" />
      <div className="nf-scan" />
      <div className="nf-bracket nf-tl" /><div className="nf-bracket nf-tr" /><div className="nf-bracket nf-bl" /><div className="nf-bracket nf-br" />
      <header className="nf-head">
        <Link href="/visual-hooks" className="nf-brand">NEON·FORGE</Link>
        <div className="nf-status"><i />System online — node 0x7F</div>
        <a href="#" onClick={stop} className="nf-cta">Initialize</a>
      </header>
      <div className="nf-metrics"><div><span>TEMP</span><b className="nf-temp">24°</b></div><div><span>FLOW</span><b className="nf-flow">0.00</b></div><div><span>SEED</span><b>07</b></div></div>
      <h1 className="nf-h1">FORGE<br />THE UNREAL</h1>
      <div className="nf-data"><span>ALLOY</span><b>CR-07</b><span>STATE</span><b className="nf-state">IDLE</b></div>
      <div className="nf-end">
        <span className="nf-end-k">CR-07 · forged in 0.94 s</span>
        <p>Real-time materials for the unreal — chrome, glass and plasma, rendered in the browser.</p>
        <a href="#" onClick={stop} className="nf-end-cta">Initialize the forge →</a>
      </div>
    </div>
  );
}

/* macro-optics: блик идёт за курсором (на таче — по скроллу); скролл входит в оранжевую линзу → мир в её тоне →
   очки коллекции (вернули слой .mo-glasses) и карточка → вся коллекция. */
const MO_BEATS: readonly Beat[] = [["--h", 0.1, 0.2], ["--dive", 0.12, 0.46], ["--amber", 0.34, 0.48], ["--prod", 0.46, 0.64], ["--card", 0.6, 0.74], ["--end", 0.8, 0.94]];
function MacroOptics() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, MO_BEATS, ({ q, f, touch, ptr, set }) => {
    const l = coverPt(0.42, 0.31, f.vw, f.vh, 16 / 9, 0.74);
    set("--lx", pct(l.x));
    set("--ly", pct(l.y));
    const take = touch ? 1 : smooth(win(q, 0.02, 0.12));
    const byPtr = ptr.on ? (ptr.x - 0.5) * 110 : -24 + 18 * Math.sin(f.t / 2400);
    const byScroll = -60 + 150 * win(q, 0, 0.3);
    set("--sx", `${(q > 0.46 ? -70 + 150 * win(q, 0.5, 0.8) : byPtr + (byScroll - byPtr) * take).toFixed(2)}vw`);
  });
  return (
    <div ref={ref} className="vh-canvas mo-canvas">
      <header className="mo-head">
        <Link href="/visual-hooks" className="mo-brand">OPTIK°</Link>
        <div className="mo-actions"><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Stores</a><a href="#" onClick={stop} className="mo-bag">Bag · 1</a></div>
      </header>
      <Media src="/uploads/1/hooks/scenes/macro-face-vid.mp4" poster="/uploads/1/hooks/scenes/s8b-face.png" className="mo-face" />
      <div className="mo-amber" />
      <img className="mo-glasses" src="/uploads/1/hooks/scenes/s8-glasses-cut.png" alt="" />
      <div className="mo-sweep" />
      <h1 className="mo-h1">SEE<br /><em>SHARPER</em></h1>
      <div className="mo-card"><div className="mo-card-info"><b>Aura Wrap</b><span>UV400 · Titanium · Ed. 07</span></div><div className="mo-price">$320</div><a href="#" onClick={stop} className="mo-add">Add to bag</a></div>
      <div className="mo-end"><span>Collection 07 — six frames, one tint</span><a href="#" onClick={stop} className="mo-end-cta">See the collection →</a></div>
    </div>
  );
}

/* liquid-word: FLUX вращается скрабом по скроллу — только по чистым кадрам (0–3.3 с; «RLUX» и ребро вырезаны),
   затем плавится в жидкий фон, в котором всплывают работы студии. */
const LW_BEATS: readonly Beat[] = [["--turn", 0.04, 0.48], ["--melt", 0.46, 0.7], ["--work", 0.6, 0.78], ["--end", 0.8, 0.94]];
function LiquidWord() {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  useHookClock(ref, LW_BEATS, ({ q, f }) => {
    const turn = smooth(win(q, 0.04, 0.5));
    const idle = f.reduced ? 0 : 0.3 * (1 + Math.sin(f.t / 1700)) * (1 - turn);
    seek(vid.current, idle + turn * 2.85); // после 2.9 с в фоне ролика появляются панели, дальше — ребро и «RLUX»
  });
  return (
    <div ref={ref} className="vh-canvas lw-canvas">
      <ScrubVideo vref={vid} src="/uploads/1/hooks/scenes/liquid-vid-clean.mp4" poster="/uploads/1/hooks/scenes/liquid-clean-poster.jpg" className="lw-bg" />
      <div className="lw-pool" />
      <header className="lw-head">
        <Link href="/visual-hooks" className="lw-brand">Flux®</Link>
        <nav><a href="#" onClick={stop}>Index</a><a href="#" onClick={stop}>Contact</a></nav>
      </header>
      <p className="lw-tag">A design practice for brands that refuse to stay still.</p>
      <span className="lw-corner lw-cl">©2026 — Design studio</span>
      <span className="lw-corner lw-cr">Selected work ↓</span>
      <div className="lw-work">
        <span className="lw-work-k">Selected work</span>
        <ol>
          <li><b>Aurora Bank</b><span>Identity in motion</span><i>2026</i></li>
          <li><b>Mercury Records</b><span>Liquid type system</span><i>2025</i></li>
          <li><b>Halden Studio</b><span>Brand &amp; product</span><i>2025</i></li>
        </ol>
        <a href="#" onClick={stop} className="lw-work-cta">Start a project →</a>
      </div>
    </div>
  );
}

/* orbit-data: цифры — остановки камеры: планета → страны → облака → твой город. */
const OD_BEATS: readonly Beat[] = [["--s1", 0.18, 0.26], ["--s2", 0.38, 0.46], ["--cloud", 0.52, 0.76], ["--s3", 0.66, 0.74], ["--city", 0.64, 0.76], ["--end", 0.84, 0.95]];
function OrbitData() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, OD_BEATS, ({ q, f, set }) => {
    const g = coverPt(0.73, 0.52, f.vw, f.vh, 1928 / 1076);
    set("--gx", pct(g.x));
    set("--gy", pct(g.y));
    set("--zoom", 1 + 0.35 * smooth(win(q, 0.1, 0.3)) + 0.9 * smooth(win(q, 0.3, 0.5)) + 3 * smooth(win(q, 0.5, 0.72)));
    set("--wo", Math.pow(Math.sin(Math.PI * win(q, 0.54, 0.78)), 1.5));
  });
  return (
    <div ref={ref} className="vh-canvas od-canvas">
      <header className="od-head">
        <Link href="/visual-hooks" className="od-brand">◐ Steadyflow</Link>
        <nav><a href="#" onClick={stop}>Product</a><a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Pricing</a><a href="#" onClick={stop}>Results</a></nav>
        <div className="od-actions"><a href="#" onClick={stop} className="od-login">Log in</a><a href="#" onClick={stop} className="od-cta">Get started</a></div>
      </header>
      <Media src="/uploads/1/hooks/scenes/orbit-vid.mp4" poster="/uploads/1/hooks/scenes/orbit-globe.png" className="od-bg" />
      <div className="od-city"><i className="od-pin" /><span>You are here — Brooklyn, NY</span></div>
      <div className="od-cloud c1" /><div className="od-cloud c2" />
      <div className="od-white" />
      <div className="od-hero od-stop0"><b>84,000+</b><span>Habits completed this quarter</span><div className="od-badges"><a href="#" onClick={stop}>▲ App Store</a><a href="#" onClick={stop}>▶ Google Play</a></div></div>
      <div className="od-hero od-stop od-stop1"><b>112</b><span>countries keeping a streak right now</span></div>
      <div className="od-hero od-stop od-stop2"><b>93%</b><span>feel more consistent after three weeks</span></div>
      <div className="od-hero od-stop od-stop3"><b>1,284</b><span>people building habits near you</span></div>
      <div className="od-stats"><div><b>93%</b><span>Feel more consistent</span></div><div><b>38</b><span>Habits built / user</span></div><div><b>41+</b><span>Growing communities</span></div></div>
      <div className="od-end"><a href="#" onClick={stop} className="od-end-cta">Join your city’s streak →</a><span>Free on iOS &amp; Android</span></div>
    </div>
  );
}

/* atelier-hand: скролл подводит камеру к флакону → склейка в макро руки (флакон без этикетки) → внутрь стекла
   и жидкости → янтарь → ателье по записи. */
const AH_BEATS: readonly Beat[] = [["--h", 0.08, 0.18], ["--push", 0.06, 0.32], ["--cut", 0.24, 0.36], ["--macro", 0.3, 0.74], ["--amb", 0.6, 0.78], ["--t1", 0.4, 0.5], ["--end", 0.8, 0.94]];
function AtelierHand() {
  const ref = useRef<HTMLDivElement>(null);
  useHookClock(ref, AH_BEATS, ({ f, set }) => {
    const fl = coverPt(0.43, 0.62, f.vw, f.vh, 16 / 9, 0.72); // низ флакона с жидкостью — не этикетка
    set("--fx", pct(fl.x));
    set("--fy", pct(fl.y));
    const lq = coverPt(0.48, 0.42, f.vw, f.vh);
    set("--lqx", pct(lq.x));
    set("--lqy", pct(lq.y));
  });
  return (
    <div ref={ref} className="vh-canvas ah-canvas">
      <Media src="/uploads/1/hooks/scenes/atelier-face-vid.mp4" poster="/uploads/1/hooks/scenes/s11b-face.png" className="ah-bg" />
      <img className="ah-macro" src="/uploads/1/hooks/scenes/s11-hand.png" alt="" />
      <div className="ah-amber" />
      <header className="ah-head">
        <nav className="ah-navl"><a href="#" onClick={stop}>Maison</a><a href="#" onClick={stop}>Objects</a></nav>
        <Link href="/visual-hooks" className="ah-brand">OYLA</Link>
        <nav className="ah-navr"><a href="#" onClick={stop}>Journal</a><a href="#" onClick={stop}>Enquire</a></nav>
      </header>
      <h1 className="ah-h1"><em>Made</em><br />by hand.</h1>
      <div className="ah-tag"><b>100% handmade</b><span>Each object carries the mark of the hand that shaped it.</span></div>
      <span className="ah-num">N°01</span>
      <span className="ah-date">Spring — MMXXVI</span>
      <p className="ah-line">Distilled for forty-eight hours.<br /><em>Poured by one hand.</em></p>
      <div className="ah-end">
        <span className="ah-end-k">N°01 · Eau de Main · 50 ml</span>
        <p>The atelier in Grasse, by appointment.</p>
        <a href="#" onClick={stop} className="ah-end-cta">Enquire ↗</a>
      </div>
    </div>
  );
}

/* fold-horizon: кадр замирает, и горизонт складывается страницей полевого журнала (split-flap по линии
   горизонта): на обороте — следующая глава, дальний план с путником. */
const FH_BEATS: readonly Beat[] = [["--h", 0.12, 0.24], ["--fold", 0.24, 0.66], ["--ch", 0.6, 0.72], ["--end", 0.72, 0.92]];
function FoldHorizon() {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const snap = useRef<HTMLCanvasElement>(null);
  const frozen = useRef(false);
  useHookClock(ref, FH_BEATS, ({ q, f, set }) => {
    set("--shade", Math.sin(Math.PI * smooth(win(q, 0.24, 0.66))));
    const v = vid.current;
    const c = snap.current;
    if (!v || !c) return;
    // застывание: на время сгиба кадр замирает — стоп-кадр уходит во флап
    if (q > 0.23 && !frozen.current) {
      frozen.current = true;
      v.pause();
      drawCover(c, v, f.vw, f.vh, 0, 0.5);
      set("--split", 1);
    } else if (q < 0.2 && frozen.current) {
      frozen.current = false;
      set("--split", 0);
      v.play().catch(() => {});
    }
  });
  return (
    <div ref={ref} className="vh-canvas fh-canvas">
      <div className="fh-next" />
      <video ref={vid} className="fh-bg" src="/uploads/1/hooks/scenes/fold-vid2.mp4" poster="/uploads/1/hooks/scenes/s12b-fold.png" autoPlay muted loop playsInline preload="metadata" />
      <div className="fh-cast" />
      <div className="fh-flap">
        <div className="fh-face fh-front"><canvas ref={snap} /></div>
        <div className="fh-face fh-back" />
      </div>
      <div className="fh-wash" />
      <header className="fh-head">
        <div className="fh-ctx"><b>Expedition °10</b><span>68° 21′ N — Field log, day 14</span></div>
        <nav><a href="#" onClick={stop}>Index</a><a href="#" onClick={stop}>Menu</a></nav>
      </header>
      <span className="fh-chapter"><i>Chapter III — The Fold</i><i>Chapter IV — Beyond the fold</i></span>
      <h1 className="fh-h1">THE HORIZON<br />DOESN’T END.<br /><em>IT FOLDS.</em></h1>
      <div className="fh-coord"><i>67° 21′ 04″ N<br />18° 37′ 12″ W</i><i>68° 02′ 55″ N<br />19° 11′ 40″ W</i></div>
      <div className="fh-end"><p>Day 15. The map ran out —<br /><em>the land kept going.</em></p><a href="#" onClick={stop} className="fh-end-cta">Continue the field log →</a></div>
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

/* ---- Закреплённая глава лендингов историй: высокая секция + sticky-сцена. Пишет на сцену --q (0..1) и --st
   (номер остановки 0..n-1 с удержанием у каждой), на элементы [data-at=k] — --rel (st-k) и --on (1 у своей остановки).
   Маркеры .hs-pin-a/.hs-pin-b (вне sticky) — якоря начала/конца пина для Actor/Atmosphere. ---- */
function StoryPin({ className, h, n, children }: { className: string; h: number; n: number; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const sec = ref.current;
    const stage = sec?.querySelector<HTMLElement>(".hs-pin-stage");
    if (!sec || !stage) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement | SVGElement>("[data-at]"));
    const ks = items.map((el) => Number(el.getAttribute("data-at")));
    let last = -1;
    return subscribe(({ vh }) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
      const q = clamp01(-r.top / Math.max(1, r.height - vh));
      const x = q * (n - 1);
      const i = Math.min(n - 2, Math.floor(x));
      const st = n < 2 ? 0 : i + smooth((x - i - 0.2) / 0.6);
      if (Math.abs(st - last) < 5e-4) return;
      last = st;
      stage.style.setProperty("--q", q.toFixed(4));
      stage.style.setProperty("--st", st.toFixed(4));
      items.forEach((el, j) => {
        const rel = st - ks[j];
        el.style.setProperty("--rel", rel.toFixed(4));
        el.style.setProperty("--on", clamp01(1 - Math.abs(rel) * 2.4).toFixed(4)); // соседние подписи не пересекаются
      });
    });
  }, [n]);
  return (
    <section ref={ref} className={`hs-pin ${className}`} style={{ height: `${h}vh` }}>
      <i className="hs-pin-a" aria-hidden />
      <i className="hs-pin-b" aria-hidden />
      <div className="hs-pin-stage">{children}</div>
    </section>
  );
}
const cssVars = (v: Record<string, string | number>) => v as React.CSSProperties;

/* ---- Bloom: мир глаза продолжается под лендингом; закреплённая глава — спуск сквозь радужку в макромир ---- */
function BloomLand() {
  const dive = [
    { at: 1, img: `${SL}/bloom-macro1.jpg`, c: ["58%", "44%"], k: "01 · Veins", h: <>It carries <em>light.</em></>, p: "Bioluminescent veins move signal and nutrient through the colony, the way a leaf moves water." },
    { at: 2, img: `${SL}/bloom-macro2.jpg`, c: ["42%", "54%"], k: "02 · Spores", h: <>It <em>travels.</em></>, p: "Spores ride the air and seed the next patch of ground, a few metres every week." },
    { at: 3, img: `${SL}/bloom-macro3.jpg`, c: ["55%", "44%"], k: "03 · Roots", h: <>It eats <em>the damage.</em></>, p: "Roots trace what poisoned the soil and break it down into something the soil can use." },
    { at: 4, img: `${SL}/bloom-dead.jpg`, c: ["50%", "56%"], k: "04 · Dead ground", h: <>Cracked, <em>salted,</em> silent.</>, p: "Where every project starts: ground that has stopped holding water." },
    { at: 5, img: `${SL}/bloom-alive.jpg`, c: ["50%", "50%"], k: "05 · Living ground", h: <>Ten months <em>later.</em></>, p: "The same square metre. It holds water again, and it glows at night." },
  ];
  return (
    <div className="vh-l2 l2-bloom hs-land">
      <i className="hs-from" aria-hidden />
      <Backdrop from=".l2-bloom > .hs-from" dim={0.5} blur={6} plates={[
        { at: ".bl2-intro", src: `${SL}/bloom-eye-open.jpg` },
        { at: ".bl2-app", src: `${SL}/bloom-app.jpg` },
        { at: ".bl2-proof", src: `${SL}/bloom-alive.jpg` },
      ]} />
      <Atmosphere stops={[{ at: ".bl2-intro", color: "#0a0710" }, { at: ".bl2-dive", color: "#03100e" }, { at: ".bl2-app", color: "#0b0814" }, { at: ".bl2-cta", color: "#0a0710" }]} />
      <Weather kind="spores" count={16} color="#8ff0ff" color2="#f4a9d8" zIndex={3} world={0.5} between={[".bl2-intro", ".bl2-cta"]} />

      <section className="bl2-intro">
        <div className="bl2-intro-in">
          <span className="bl2-kick">Living material</span>
          <h2>We do not build the repair.<br /><em>We grow it.</em></h2>
          <p>Bloom is a colony, not a coating. Introduced as a thin living film, it takes root in dead ground and spends the next year bringing it back.</p>
        </div>
      </section>

      <StoryPin className="bl2-dive" h={560} n={6}>
        {dive.map((d, i) => {
          const nx = dive[i + 1]?.c ?? d.c; // следующий портал: кадр наезжает в ту же точку, откуда откроется следующий
          return <div key={d.at} className="bl2-frame" data-at={d.at} style={cssVars({ "--cx": d.c[0], "--cy": d.c[1], "--nx": nx[0], "--ny": nx[1] })}><img src={d.img} alt="" loading="lazy" /></div>;
        })}
        <i className="bl2-iris" data-at={0} aria-hidden />
        <p className="bl2-look" data-at={0}>Look closer. <em>Through the iris.</em></p>
        {dive.map((d) => (
          <div key={d.at} className="bl2-cap" data-at={d.at}><span>{d.k}</span><h3>{d.h}</h3><p>{d.p}</p></div>
        ))}
        <ol className="bl2-depth" aria-hidden>{["Iris", "Veins", "Spores", "Roots", "Ground", "Alive"].map((t, i) => <li key={t} data-at={i}>{t}</li>)}</ol>
      </StoryPin>

      <section className="bl2-app">
        <div className="bl2-app-copy"><span className="bl2-kick">Out, and up</span><h3>It does not hide<br />the architecture.<br /><em>It becomes it.</em></h3><p>Grown across a facade or an interior, Bloom filters the air and gives the light back at night.</p></div>
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

/* ---- ORBE: сфера из руки — Carry-актёр: выходит из hero, садится на пьедестал товара, держит цикл, возвращается к CTA ---- */
const ORB_D = "var(--orbD)"; // диаметр сферы = сфера на фото пьедестала (0.636 стороны квадрата .or2-stage), см. hooks-stories.css
function OrbeLand() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // высота кадра (cover 1928×1076) / меньшая сторона экрана — как в финале hero (useStoryClock, pull)
    const fit = () => el.style.setProperty("--orbK", (Math.max(innerWidth * 0.558, innerHeight) / Math.min(innerWidth, innerHeight)).toFixed(4));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);
  const eds = [
    { img: `${SL}/orbe-object.jpg`, n: "The Origin", d: "Moss, fern, still water", p: "480 EUR" },
    { img: `${SL}/orbe-ed-dune.jpg`, n: "The Dune", d: "Red desert, one succulent", p: "520 EUR" },
    { img: `${SL}/orbe-ed-coral.jpg`, n: "The Reef", d: "Coral, shrimp, blue water", p: "560 EUR" },
    { img: `${SL}/orbe-ed-forest.jpg`, n: "The Canopy", d: "Ferns, mist, a small fall", p: "590 EUR" },
  ];
  const loop = [
    { h: "Light", p: "feeds the algae", c: "#ffd27a" },
    { h: "Algae", p: "feed the shrimp", c: "#86e3a4" },
    { h: "Shrimp", p: "feed the microbes", c: "#ff9f8a" },
    { h: "Microbes", p: "clear the water", c: "#8fdcff" },
  ];
  return (
    <div ref={root} className="vh-l2 l2-orbe hs-land">
      <i className="hs-from" aria-hidden />
      <i className="hs-mk or-c0" aria-hidden />
      <i className="hs-mk or-c1" aria-hidden />
      <i className="hs-mk or-c2" aria-hidden />
      <Backdrop from=".l2-orbe > .hs-from" dim={0.74} blur={16} plates={[
        { at: ".or2-object", src: `${SL}/orbe-world-end.jpg` },
        { at: ".or2-loop", src: `${SL}/orbe-interior.jpg` },
        { at: ".or2-cta", src: `${SL}/orbe-world-end.jpg` },
      ]} />
      <Atmosphere stops={[{ at: ".or2-object", color: "#04070b" }, { at: ".or2-loop", color: "#051410" }, { at: ".or2-eds", color: "#05080c" }, { at: ".or2-cta", color: "#06111a" }]} />
      <Weather kind="spores" count={12} color="#bdeeff" zIndex={3} world={0.4} between={[".or2-object", ".or2-cta"]} />
      <Actor width={ORB_D} zIndex={5} bob={3} tilt={0.03} stops={[
        { at: ".l2-orbe > .or-c0", pose: { x: 50, y: 50, s: 1, o: 0 } },
        { at: ".l2-orbe > .or-c1", pose: { x: 50, y: 50, s: 1, o: 1 } },
        { at: ".l2-orbe > .or-c2", pose: { x: 50, y: 50, s: 1, o: 1 } }, // держит место, пока Backdrop не закрыл hero
        { at: ".or2-stage", pose: { x: 50, y: 48.2, s: 1, o: 1, dock: true } },
        { at: ".or2-loop > .hs-pin-a", pose: { x: 50, y: 52, s: 0.78, o: 1 } },
        { at: ".or2-loop > .hs-pin-b", pose: { x: 50, y: 52, s: 0.78, o: 1 } },
        { at: ".or2-eds", pose: { x: 90, y: 10, s: 0.2, o: 0, blur: 3 } },
        { at: ".or2-cta", pose: { x: 50, y: 29, s: 0.44, o: 1 } },
        { at: ".l2-orbe .l2-foot", pose: { x: 50, y: -14, s: 0.3, o: 0 } },
      ]}>
        <div className="or-orb"><i className="or-glass" /></div>
      </Actor>

      <section className="or2-object">
        <div className="or2-stage" aria-hidden>
          <span className="or2-tag t1">Hand-blown glass</span>
          <span className="or2-tag t2">Sealed once</span>
          <span className="or2-tag t3">Alive for years</span>
        </div>
        <div className="or2-object-copy"><span className="or2-kick">The object</span><h2>A planet you can<br />hold in one <em>hand.</em></h2><p>The world you just fell into, sealed in hand-blown glass. It makes its own weather and quietly gets on with being a world.</p></div>
      </section>

      <StoryPin className="or2-loop" h={460} n={5}>
        {loop.map((n, i) => <i key={n.h} className="or2-halo" data-at={i + 1} style={cssVars({ "--c": n.c })} aria-hidden />)}
        <div className="or2-ring" aria-hidden>
          <svg viewBox="-100 -100 200 200"><circle r="88" className="or2-ring-bg" /><circle r="88" pathLength={1} className="or2-ring-on" /></svg>
          {loop.map((n, i) => (
            <div key={n.h} className={`or2-node n${i + 1}`} data-at={i + 1} style={cssVars({ "--c": n.c })}><b>{n.h}</b><span>{n.p}</span></div>
          ))}
        </div>
        <div className="or2-loop-head" data-at={0}><span className="or2-kick">Nothing in. Nothing out.</span><h3>A loop that<br /><em>holds itself.</em></h3></div>
        <p className="or2-loop-foot">Sealed once. The cycle turns for years without you.</p>
      </StoryPin>

      <section className="or2-eds">
        <Reveal className="or2-eds-head vh-rv--up"><h3>Four worlds, grown <em>each season.</em></h3><p>Each ORBE is assembled and matured by hand. No two ever settle the same way.</p></Reveal>
        <div className="or2-eds-row">
          {eds.map((e) => (<Reveal key={e.n} className="or2-ed vh-rv--up"><div className="or2-ed-media"><ShaderImage src={e.img} /></div><div className="or2-ed-info"><b>{e.n}</b><span>{e.d}</span><i>{e.p}</i></div></Reveal>))}
        </div>
      </section>

      <section className="or2-cta">
        <h2>Keep a world of <em>your own.</em></h2><p>A small run opens each season. Reserve before it closes.</p><a href="#" onClick={stop} className="or2-btn">Reserve your world <i>↗</i></a>
      </section>

      <LandFoot brand="ORBE°" tagline="Sealed living worlds, grown by hand." cols={[{ h: "The object", links: ["Editions", "The science", "Care"] }, { h: "Buy", links: ["Reserve", "Gifting", "Shipping"] }, { h: "Studio", links: ["About", "Journal", "Contact"] }]} legal="ORBE Terraria, Reykjavik." />
    </div>
  );
}

/* ---- OBELISK: сквозь трещину рун — в ночь; паломничество — горизонтальный пролёт с остановками; одна и та же плита ---- */
function ObeliskLand() {
  const path = [
    { img: `${SC}/monolith-reveal.png`, h: "Reserve", m: "Coordinates by letter", p: "Book a dusk window. The coordinates arrive on paper, a week before you go." },
    { img: `${SL}/obe-aerial.jpg`, h: "Drive", m: "182 km · no signal", p: "Three hours from the nearest town. The road runs out before the stone does." },
    { img: `${SL}/monolith-mist.jpg`, h: "Walk", m: "The last mile", p: "On foot, through the mist that settles on the flats at dusk." },
    { img: `${SL}/obe-night.jpg`, h: "Stay", m: "Until dawn", p: "No tour, no gift shop. You are welcome until the stars come out." },
  ];
  return (
    <div className="vh-l2 l2-obelisk hs-land">
      <i className="hs-from" aria-hidden />
      <Backdrop from=".l2-obelisk > .hs-from" dim={0.55} blur={3} plates={[
        { at: ".ob2-approach", src: `${SL}/obe-night.jpg` },
        { at: ".ob2-manifesto", src: `${SL}/obe-night.jpg` },
        { at: ".ob2-cta", src: `${SL}/monolith-dusk.jpg` },
      ]} />
      <Atmosphere stops={[{ at: ".ob2-approach", color: "#05060c" }, { at: ".ob2-path", color: "#0d0906" }, { at: ".ob2-manifesto", color: "#06070d" }, { at: ".ob2-cta", color: "#130a05" }]} />
      <Weather kind="embers" count={12} color="#ffb877" color2="#ff7a3c" zIndex={3} world={0.5} between={[".ob2-approach", ".ob2-cta"]} />

      <section className="ob2-approach">
        <div className="ob2-approach-copy"><span>92 acres of protected Nevada desert</span><h2>You will drive a long way<br />for something with <em>no plaque.</em></h2></div>
        <div className="ob2-night-coord"><span>38.7621 N</span><span>116.9330 W</span><span>Elev. 1,684 m</span></div>
      </section>

      <StoryPin className="ob2-path" h={480} n={4}>
        <div className="ob2-strip">
          {path.map((s, i) => <figure key={s.h} className="ob2-shot" data-at={i}><img src={s.img} alt="" loading="lazy" /></figure>)}
        </div>
        <h2 className="ob2-path-head">How a visit <em>unfolds</em></h2>
        <div className="ob2-route" aria-hidden><i /><b /></div>
        {path.map((s, i) => (
          <div key={s.h} className="ob2-stop" data-at={i}><span>{String(i + 1).padStart(2, "0")} · {s.m}</span><h3>{s.h}</h3><p>{s.p}</p></div>
        ))}
      </StoryPin>

      <section className="ob2-manifesto">
        <h2>It was raised in silence<br />and left <em>uncredited</em> on purpose.</h2>
      </section>

      <section className="ob2-cta">
        <div className="ob2-cta-in"><h2>Come stand <em>before it.</em></h2><p>Reserve a dusk window for the coming season.</p><a href="#" onClick={stop} className="ob2-btn">Reserve a visit <i>↗</i></a></div>
      </section>

      <LandFoot brand="OBELISK" tagline="A monument, a desert, and a long quiet walk." cols={[{ h: "Visit", links: ["Reserve", "Getting there", "Seasons"] }, { h: "Foundation", links: ["The land", "Patrons", "Stewardship"] }, { h: "More", links: ["Story", "Press", "Contact"] }]} legal="The Obelisk Foundation, Nevada." />
    </div>
  );
}

/* ---- VIGIL: та же планета с орбиты; глава «семь реле» — кадр резкеет с каждым постом; финал — снова она ---- */
const VIG_NODES = Array.from({ length: 7 }, (_, i) => {
  const a = ((-160 + i * 46) * Math.PI) / 180;
  return { x: +(560 + 380 * Math.cos(a)).toFixed(1), y: +(300 + 120 * Math.sin(a)).toFixed(1) };
});
function VigilLand() {
  const relays = [
    { n: "Meridian", t: "dust storm rising", z: "UTC−7" },
    { n: "Halo", t: "limb haze stable", z: "UTC+1" },
    { n: "Brack", t: "ice fracture, sector 04", z: "UTC+9" },
    { n: "Ferro", t: "storm band widening", z: "UTC−3" },
    { n: "Tethys", t: "cloud system drifting", z: "UTC+5:30" },
    { n: "Ember", t: "vent glow rising", z: "UTC+12" },
    { n: "Vane", t: "night-side lights counted", z: "UTC−10" },
  ];
  return (
    <div className="vh-l2 l2-vigil hs-land">
      <i className="hs-from" aria-hidden />
      <Backdrop from=".l2-vigil > .hs-from" dim={0.5} blur={4} plates={[
        { at: ".vg2-intro", src: `${SL}/vigil-orbit-end.jpg` },
        { at: ".vg2-relay", src: `${SL}/vigil-orbit-mid.jpg` },
        { at: ".vg2-cta", src: `${SL}/vigil-watch.jpg` },
      ]} />
      <Atmosphere stops={[{ at: ".vg2-intro", color: "#070a14" }, { at: ".vg2-watch", color: "#05060d" }, { at: ".vg2-relay", color: "#0b0911" }, { at: ".vg2-cta", color: "#1a1020" }]} />
      <Weather kind="stars" count={36} color="#ffe6f1" color2="#bcd6ff" zIndex={3} world={0.3} between={[".vg2-intro", ".vg2-cta"]} />

      <section className="vg2-intro">
        <div className="vg2-intro-in"><span className="vg2-kick">Under watch, right now</span><h2>One world.<br /><em>Seven watchers.</em></h2><p>Meridian turns once every thirty hours. Seven backyard telescopes, seven timezones, one shared feed — so it is never out of sight.</p></div>
      </section>

      <StoryPin className="vg2-watch" h={560} n={8}>
        <div className="vg2-planet"><img src={`${SL}/vigil-orbit-mid.jpg`} alt="" loading="lazy" /></div>
        <svg className="vg2-orbit" viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <ellipse cx="560" cy="300" rx="380" ry="120" />
          {VIG_NODES.map((p, i) => <circle key={i} className="vg2-node" data-at={i + 1} cx={p.x} cy={p.y} r="7" />)}
        </svg>
        <h2 className="vg2-watch-head" data-at={0}>One eye <em>guesses.</em></h2>
        <h2 className="vg2-watch-end" data-at={7}>Seven eyes <em>are sure.</em></h2>
        <div className="vg2-count"><b><i /></b><span>of 7 relays online</span></div>
        <ol className="vg2-logs">{relays.map((r, i) => <li key={r.n} data-at={i + 1}><b>{r.n}</b><span>{r.t}</span><i>{r.z}</i></li>)}</ol>
      </StoryPin>

      <section className="vg2-relay">
        <div className="vg2-relay-in"><div className="vg2-clock" aria-hidden><i /></div><div className="vg2-relay-copy"><h3>The watch <em>never breaks.</em></h3><p>Members hand the feed around the clock, across every timezone. There is always someone awake and looking.</p></div></div>
      </section>

      <section className="vg2-cta">
        <div className="vg2-cta-in"><span className="vg2-kick">Night 213</span><h2>Take a <em>shift.</em></h2><p>Membership opens in small waves. Join the next one.</p><a href="#" onClick={stop} className="vg2-btn">Join the watch <i>↗</i></a></div>
      </section>

      <LandFoot brand="VIGIL" tagline="A shared, unbroken watch on distant worlds." cols={[{ h: "Watch", links: ["Live feed", "Worlds", "Shifts"] }, { h: "Join", links: ["Membership", "Instruments", "Guide"] }, { h: "Coop", links: ["About", "Research", "Contact"] }]} legal="The Vigil Cooperative." />
    </div>
  );
}

/* ---- ASCENSION: над облаками → один вдох-выдох как закреплённая глава (галерея стала полётом); крем без шва ---- */
function AscensionLand() {
  const steps = [
    { img: `${SL}/ascension-retreat.jpg`, k: "Arrive", h: <>Put it <em>down.</em></>, p: "The pavilion sits above the lake. Phones stay in a basket by the door." },
    { img: `${SL}/asc-g1.jpg`, k: "In · four counts", h: <>Breathe <em>in.</em></>, p: "Slowly, through the nose, until the ribs open sideways." },
    { img: `${SL}/asc-g2.jpg`, k: "Hold · four counts", h: <>And <em>hold.</em></>, p: "Nothing to fix. Only the pause at the top of the breath." },
    { img: `${SL}/asc-g3.jpg`, k: "Out · six counts", h: <>Let it <em>go.</em></>, p: "Longer out than in. The body reads it as safety." },
    { img: `${SL}/ascension-light.jpg`, k: "Rest", h: <>Then, <em>again.</em></>, p: "Four rounds to begin. A weekly session to hold it. A retreat when you are ready." },
  ];
  return (
    <div className="vh-l2 l2-ascension hs-land">
      <i className="hs-from" aria-hidden />
      <Backdrop from=".l2-ascension > .hs-from" dim={0.26} blur={4} plates={[
        { at: ".as2-intro", src: `${SL}/ascension-light.jpg` },
        { at: ".as2-quotes", src: `${SL}/asc-g2.jpg` },
        { at: ".as2-cta", src: `${SL}/ascension-light.jpg` },
      ]} />
      <Atmosphere stops={[{ at: ".as2-intro", color: "#f4ecdc" }, { at: ".as2-breath", color: "#eee8ee" }, { at: ".as2-quotes", color: "#ebe7ee" }, { at: ".as2-cta", color: "#f4ebdb" }]} />
      <Weather kind="dust" count={22} color="#fff8ea" zIndex={3} world={0.4} between={[".as2-intro", ".as2-cta"]} />

      <section className="as2-intro">
        <div className="as2-intro-in"><span className="as2-kick">A breathing practice</span><h2>The noise was never<br /><em>yours to carry.</em></h2><p>Four rituals to begin. A weekly session to hold. A retreat when you are ready to put it all down.</p></div>
      </section>

      <StoryPin className="as2-breath" h={520} n={5}>
        {steps.map((s, i) => <div key={s.k} className="as2-plate" data-at={i}><img src={s.img} alt="" loading="lazy" /></div>)}
        <div className="as2-orb" aria-hidden><i /></div>
        {steps.map((s, i) => <div key={s.k} className="as2-step" data-at={i}><span>{s.k}</span><h3>{s.h}</h3><p>{s.p}</p></div>)}
      </StoryPin>

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
        {/* рамка-скобы убрана: она резала фильм на слайды — сцены forge идут одним планом */}
        {annos.map((a, i) => <div key={i} className={`pos-an an-${a.at}`}>{a.k && <b>{a.k}</b>}{a.v && <span>{a.v}</span>}</div>)}
        {meta && <div className="pos-meta">{meta}</div>}
        {(cap || body) && <div className="pos-cap">{cap && <b>{cap}</b>}{body && <p>{body}</p>}</div>}
      </div>
    </section>
  );
}

/* FORGE process — pinned-сцена Heat→Hammer→Quench→Hone→Damascus по scroll-progress (--sp). Огонь→холодная сталь→одна кромка,
   и та же кромка непрерывным отъездом камеры (scale ≈3.7→1) становится целым клинком-реликвией (бывший отдельный постер DAMASCUS). */
function ForgeProcess() {
  const ref = useSectionProgress<HTMLDivElement>();
  const win = (a: number, b: number) => ({ ["--a"]: a, ["--b"]: b } as React.CSSProperties);
  useEffect(() => {
    // стартовый масштаб отъезда: макро кромки должно накрывать экран при любом соотношении сторон
    const el = ref.current; if (!el) return;
    const fit = () => { const h = Math.min(innerHeight * 0.78, 720), w = (h * 9) / 16; el.style.setProperty("--z0", (Math.max(innerWidth / w, innerHeight / h) * 1.02).toFixed(3)); };
    fit(); addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, [ref]);
  return (
    <section ref={ref} className="frg-proc">
      <div className="frg-proc-sticky">
        <div className="fp-media fp-fire" style={win(-0.1, 0.35)}>
          <img src="/uploads/1/hooks/sites/forge-p/atmos.jpg" alt="" />
        </div>
        <div className="fp-media fp-quench" style={win(0.3, 0.51)}>
          <img src="/uploads/1/hooks/sites/forge-p/quench.jpg" alt="" />
        </div>
        <div className="fp-fold" style={win(0.15, 0.32)} aria-hidden />
        <div className="fp-wash" />
        <div className="fp-cold" aria-hidden />
        <div className="fp-relic" aria-hidden><div className="pos-title pos-back">DAMASCUS</div></div>
        <div className="fp-hone" style={win(0.46, 1.2)}>
          <img src="/uploads/1/hooks/sites/forge-p/blade.jpg" alt="" />
        </div>
        <div className="fp-line" aria-hidden />
        <div className="fp-relic">
          <div className="pos-title pos-front"><em>steel.</em></div>
          <div className="pos-an an-tl"><b>STEEL</b><span>FOLDED CARBON</span></div>
          <div className="pos-an an-tr"><b>HANDLE</b><span>STABILISED WALNUT</span></div>
          <div className="pos-an an-bl"><b>LENGTH</b><span>210 MM</span></div>
          <div className="pos-an an-br"><b>COMMISSION</b><span>№ 047</span></div>
          <div className="pos-meta">No 04 — THE BLADE</div>
          <div className="pos-cap"><b>THE PATTERN RUNS LIKE WATER</b><p>Folded until the layers run like water — a single one-of-one blade, numbered and signed by the hand that made it.</p></div>
        </div>
        <div className="fp-rail" aria-hidden><span>THE FORGE</span><span>№ 01–04</span></div>
        <div className="fp-chap c-heat" style={win(-0.04, 0.165)}>
          <span className="fp-stage">01 — HEAT</span>
          <b className="fp-big">1500°</b>
          <p>The billet glows to fifteen hundred degrees, then folds — again and again.</p>
        </div>
        <div className="fp-chap c-hammer" style={win(0.17, 0.32)}>
          <span className="fp-stage">02 — HAMMER</span>
          <b className="fp-big">FOLD<br />&amp; DRAW</b>
          <p>Every layer drawn out by hand until the pattern runs like water.</p>
        </div>
        <div className="fp-chap c-quench" style={win(0.33, 0.46)}>
          <span className="fp-stage">03 — QUENCH</span>
          <b className="fp-big">SET</b>
          <p>Locked hard in an instant — orange to cold graphite.</p>
        </div>
        <div className="fp-chap c-hone" style={win(0.48, 0.63)}>
          <span className="fp-stage">04 — HONE</span>
          <b className="fp-big fp-serif">one quiet<br /><em>line.</em></b>
          <p>Weeks of grinding and stoning bring the edge down to a single line — then the camera pulls back.</p>
        </div>
      </div>
    </section>
  );
}

/* ===== BESPOKE — общий второй акт (16 bespoke-сайтов) =====
   Act: CinematicBand (главы с разными кадрами сменяются кроссфейдом в одном закреплённом плане, фон зумит) +
   сцена-оверлей с тем же прогрессом --sp (обёртка той же высоты, что лента) — события акта: счётчики, линии, диски, свет.
   Окна оверлея: className "bs-w" + style={aw(a, b)} → видимость внутри [a,b] прогресса акта (--wa/--wb: --a занят акцентом сайта). */
type Band = Extract<ProBlock, { t: "cinematicBand" }>;
const BS = "/uploads/1/hooks/sites/";
const aw =(a: number, b: number, more?: Record<string, string | number>) => ({ ["--wa"]: a, ["--wb"]: b, ...more } as React.CSSProperties);
function Act({ cls, band, children }: { cls: string; band: Band; children?: React.ReactNode }) {
  const ref = useSectionProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={`bs-act ${cls}`}>
      <CinematicBand b={band} />
      {children && <div className="bs-act-over" aria-hidden><div className="bs-act-stage">{children}</div></div>}
    </div>
  );
}
/* Число акта: считает по прогрессу ближайшего .bs-act в окне [a,b] (одни часы scene-kit на страницу). */
function ActCount({ to, from = 0, a = 0, b = 1, dec = 0, pre = "", suf = "", time = false, comma = false }: { to: number; from?: number; a?: number; b?: number; dec?: number; pre?: string; suf?: string; time?: boolean; comma?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => {
    if (time) { const s = Math.round(v); return `${pre}${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}${suf}`; }
    const n = v.toFixed(dec);
    return pre + (comma ? Number(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : n) + suf;
  };
  useEffect(() => {
    const el = ref.current, host = el?.closest<HTMLElement>(".bs-act");
    if (!el || !host) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = fmt(to); return; }
    let last = "";
    return subscribe(({ vh }) => {
      const r = host.getBoundingClientRect();
      const sp = clamp01(-r.top / Math.max(1, host.offsetHeight - vh));
      const s = fmt(from + (to - from) * smooth((sp - a) / Math.max(1e-6, b - a)));
      if (s !== last) { el.textContent = s; last = s; }
    });
  }, [to, from, a, b, dec, pre, suf, time, comma]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{fmt(from)}</span>;
}

/* ===== Бизнес-сайт: FORGE — bespoke ножи (editorial-постер, без видео) ===== */
const FP = "/uploads/1/hooks/sites/forge-p";
function ForgeSite() {
  return (
    <div className="vh-site frg">
      {/* остывание мира: огонь горна → холодный графит к CTA (фон всех сцен = var(--bg) ← --atm) */}
      <Atmosphere stops={[{ at: ".frg-bleed", color: "#170d08" }, { at: ".frg .pos-hands", color: "#140c09" }, { at: ".frg .frg-proc", color: "#0d0e11", anchor: 0.45 }, { at: ".frg .pos-quote", color: "#0a0d12" }, { at: ".frg-cta-pos", color: "#070a0e" }]} />
      {/* искры и окалина пролетают через стыки сцен — из кадра в кадр */}
      <Weather kind="sparks" count={16} color="#ff7a32" color2="#ffc27a" between={[".frg .pos-hands", ".frg-cta-pos"]} world={0.8} zIndex={26} seed={11} />
      <header className="frg-head">
        <Link href="/visual-hooks" className="frg-brand">FORGE</Link>
        <nav className="frg-nav"><a href="#" onClick={stop}>Blades</a><a href="#" onClick={stop}>The forge</a><a href="#" onClick={stop}>Commission</a></nav>
      </header>

      <section className="frg-bleed" {...heroPtr}>
        <div className="frg-bleed-img"><img src={`${FP}/smith.jpg`} alt="" /></div>
        <div className="frg-bleed-wash" aria-hidden />
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

      {/* Heat → Hammer → Quench → Hone → отъезд до целого клинка DAMASCUS — одна сцена */}
      <ForgeProcess />

      {/* горн остывает: те же угли, но уже серые — клинок переживёт огонь (кадр закалки больше не повторяется) */}
      <PosterScene cls="pos-quote pos-cool" img={`${FP}/atmos.jpg`} ar="16 / 9" tall={168}
        back={<>OUTLIVE</>} front={<em>you.</em>}
        annos={[{ at: "tl", v: "THE SMITH" }, { at: "br", v: "ON THE WHOLE JOB" }]}
        meta="No 05 — THE VOICE"
        cap="THE SMITH"
        body="“A knife should outlive the person who buys it. That is the whole job.”" />

      <section className="frg-cta-pos">
        <div className="frg-grain" aria-hidden />
        {/* финал актёра: тот же клинок лежит холодной сталью, одна оранжевая точка — клеймо № 047 */}
        <figure className="frg-cta-obj" aria-hidden>
          <span className="frg-cta-blade"><img src={`${FP}/blade.jpg`} alt="" /></span>
          <i className="frg-stamp" />
          <figcaption>№ 047 · folded carbon · 210 mm</figcaption>
        </figure>
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
      {/* один день у озера: туман → полдень → сумерки (акт) → рассвет на CTA — петля */}
      <Atmosphere stops={[{ at: ".mono-hero", color: "#eceae5" }, { at: ".mono-act", color: "#e2e5e7", anchor: 0.2 }, { at: ".mono-act", color: "#252935", anchor: 0.8 }, { at: ".mono-cta", color: "#f1e5da", anchor: 0.1 }]} />
      <section className="mono-hero">
        <video className="mono-hero-vid" src="/uploads/1/hooks/sites/mono-hero.mp4" poster="/uploads/1/hooks/sites/mono.jpg" autoPlay muted loop playsInline />
        <header className="mono-head">
          <Link href="/visual-hooks" className="mono-brand">MONO</Link>
          <nav className="mono-nav"><a href="#" onClick={stop}>The house</a><a href="#" onClick={stop}>Setting</a><a href="#" onClick={stop}>Enquire</a></nav>
        </header>
        <div className="mono-hero-copy"><span className="mono-eyebrow">Architecture, distilled</span><h1>A house that disappears<br /><em>into its lake.</em></h1></div>
      </section>
      {/* второй акт «один день у озера»: дом стоит, меняется только свет — скролл = время. Цифры всплывают отражением
          в воде. Чужой дом (dusk-павильон) и повтор постера hero убраны. */}
      <Act cls="mono-act" band={{ t: "cinematicBand", media: `${BS}g/mono-interior.jpg`, chapters: [
        { index: "06:40 — fog", title: <>We built very little,<br /><em>very well.</em></>, body: "One structure, three rooms, and a lake that doubles the sky. Nothing here asks for your attention. That is the point.", align: "left" },
        { index: "12:00 — still water", title: <>Sited on still water,<br /><em>fifty minutes from the city.</em></>, body: "Cast concrete, floor-to-ceiling glass, and a roof that reads as a single line against the sky.", align: "left" },
        { index: "19:30 — dusk", title: <>The glass turns<br /><em>to mirror.</em></>, body: "At dusk the lights come on inside and the house all but disappears into its lake.", align: "left" },
      ] }}>
        <div className="mono-specs-act bs-w" style={aw(0.34, 0.68)}>
          {specs.map(([v, l], i) => <div key={l} className="mono-spec-r bs-k" style={aw(0.34 + i * 0.05, 0.5 + i * 0.05)}><b>{v}</b><span>{l}</span></div>)}
        </div>
        <div className="mono-lamp bs-w" style={aw(0.74, 1.3, { "--wr": 0.12 })} />
      </Act>
      <section className="mono-cta"><Reveal className="vh-rv--up"><h2>Come see it <em>at dawn.</em></h2><p>Private viewings, by appointment, when the water is at its stillest.</p><a href="#" onClick={stop} className="mono-btn">Request a viewing <i>↗</i></a></Reveal></section>
      <footer className="mono-foot"><div className="mono-foot-top"><b>MONO</b><p>One house, held quietly on the water.</p></div><div className="mono-foot-legal"><span>Mono Residences</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== PHANTOM — авто (dark, kinetic, dramatic) ===== */
// плиты мира для акта: солончак в синий час и тот же горизонт ночью (вектор — без повтора кадра hero)
const svgUri = (s: string) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
const PHAN_DAY = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070d1c"/><stop offset=".6" stop-color="#1d3564"/><stop offset="1" stop-color="#7d9cd0"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f9eb0"/><stop offset=".3" stop-color="#434d5a"/><stop offset="1" stop-color="#0c0e12"/></linearGradient><radialGradient id="h" cx=".62" cy=".62" r=".5"><stop offset="0" stop-color="#cfe9ff" stop-opacity=".35"/><stop offset="1" stop-color="#cfe9ff" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="560" fill="url(#s)"/><rect y="560" width="1600" height="340" fill="url(#g)"/><rect width="1600" height="900" fill="url(#h)"/><rect y="558.5" width="1600" height="2" fill="#dff3ff" opacity=".8"/></svg>`);
const PHAN_NIGHT = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#010208"/><stop offset=".7" stop-color="#070d1d"/><stop offset="1" stop-color="#15223c"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2733"/><stop offset=".35" stop-color="#0b0e13"/><stop offset="1" stop-color="#030405"/></linearGradient></defs><rect width="1600" height="560" fill="url(#s)"/><rect y="560" width="1600" height="340" fill="url(#g)"/><g fill="#dbe8ff">${Array.from({ length: 46 }, (_, i) => `<circle cx="${(i * 353) % 1600}" cy="${(i * 197) % 470}" r="${0.6 + ((i * 7) % 5) * 0.28}" opacity="${0.25 + ((i * 11) % 7) * 0.1}"/>`).join("")}</g><rect y="559" width="1600" height="1.5" fill="#8fd8ff" opacity=".55"/></svg>`);
function PhantomSite() {
  return (
    <div className="vh-site phan">
      {/* день → ночь: 680 км тишины уводят горизонт в темноту, CTA — фары в темноте */}
      <Atmosphere stops={[{ at: ".phan-hero", color: "#070809" }, { at: ".phan-act", color: "#070b14", anchor: 0.16 }, { at: ".phan-act", color: "#030406", anchor: 0.86 }, { at: ".phan-cta", color: "#020304" }]} />
      <section className="phan-hero">
        <video className="phan-hero-vid" src="/uploads/1/hooks/sites/phantom-hero.mp4" poster="/uploads/1/hooks/sites/phantom.jpg" autoPlay muted loop playsInline />
        <div className="phan-hero-wash" />
        <header className="phan-head"><Link href="/visual-hooks" className="phan-brand">PHANTOM</Link><nav className="phan-nav"><a href="#" onClick={stop}>The car</a><a href="#" onClick={stop}>Range</a><a href="#" onClick={stop}>Reserve</a></nav></header>
        <h1 className="phan-h1">NOTHING<br /><em>for miles.</em></h1>
        <div className="phan-sub">An electric grand tourer built for the empty places.</div>
      </section>
      {/* второй акт «Silence is the new speed»: машина стоит на пине, мир летит мимо (штрихи солончака в параллаксе),
          0→100, потом 680 км уводят горизонт в ночь, и камера садится внутрь. Чужое синее купе (rear) убрано. */}
      <Act cls="phan-act" band={{ t: "cinematicBand", media: PHAN_DAY, chapters: [
        { index: "The empty places", title: <>Silence is<br />the <em>new speed.</em></>, align: "center", media: PHAN_DAY },
        { index: "0–100 km/h", title: <><ActCount to={100} a={0.25} b={0.44} /><small> km/h</small></>, body: "From standstill in 2.6 seconds, and nothing louder than the wind to tell you so.", align: "left", media: PHAN_DAY },
        { index: "Range", title: <><ActCount to={680} a={0.5} b={0.68} /> km <em>of silence.</em></>, body: "One charge from the salt flats to the coast. The horizon goes from day to night before you stop.", align: "right", media: PHAN_NIGHT },
        { index: "Inside", title: <>Drawn as <em>one line.</em></>, body: "One gear, one screen, no seams. A shape that moves air and nothing else.", align: "left", media: `${BS}g/phantom-cabin.jpg` },
      ] }}>
        <div className="phan-world bs-w" style={aw(-0.2, 0.74, { "--wr": 0.08 })}>
          {[[0.8, 90], [2.6, 150], [6, 240], [12, 380], [24, 560]].map(([d, v]) => <i key={d} style={{ ["--d" as string]: `${d}%`, ["--v" as string]: v }} />)}
        </div>
        <div className="phan-sweep bs-k" style={aw(0.7, 0.84)} />
      </Act>
      <section className="phan-cta">
        <div className="phan-lights" aria-hidden><i /><i /></div>
        <Reveal className="vh-rv--up"><h2>Reserve the <em>first run.</em></h2><p>Two hundred cars. A refundable hold secures your place in line.</p><a href="#" onClick={stop} className="phan-btn">Reserve yours <i>↗</i></a></Reveal></section>
      <footer className="phan-foot"><div className="phan-foot-top"><b>PHANTOM</b><p>Electric grand touring for the empty places.</p></div><div className="phan-foot-legal"><span>Phantom Motors</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HOROLOGE — часы (dark, premium, cosmic, gold) ===== */
// авантюриновое небо циферблата (плита акта, вектор; детерминированные искры) — кадр g/horo-dial был другой моделью часов
const HORO_SKY = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="a" cx=".58" cy=".46" r=".78"><stop offset="0" stop-color="#1a2f7a"/><stop offset=".5" stop-color="#0c1746"/><stop offset="1" stop-color="#03061a"/></radialGradient><radialGradient id="m" cx=".7" cy=".32" r=".42"><stop offset="0" stop-color="#6a78c8" stop-opacity=".28"/><stop offset="1" stop-color="#6a78c8" stop-opacity="0"/></radialGradient><filter id="b"><feGaussianBlur stdDeviation="1.4"/></filter></defs><rect width="1600" height="900" fill="url(#a)"/><rect width="1600" height="900" fill="url(#m)"/><g filter="url(#b)">${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 911) % 1600}" cy="${(i * 577) % 900}" r="${2 + ((i * 13) % 7) * 0.7}" fill="${i % 3 ? "#d9b46a" : "#9fb4ff"}" opacity="${0.25 + ((i * 7) % 5) * 0.1}"/>`).join("")}</g>${Array.from({ length: 420 }, (_, i) => `<circle cx="${(i * 733 + ((i * i) % 97)) % 1600}" cy="${(i * 389 + ((i * 7) % 53)) % 900}" r="${0.5 + ((i * 17) % 9) * 0.17}" fill="${i % 4 === 0 ? "#f2cf86" : i % 4 === 1 ? "#e6c07a" : "#dbe6ff"}" opacity="${0.35 + ((i * 11) % 7) * 0.1}"/>`).join("")}</svg>`);
function HorologeSite() {
  return (
    <div className="vh-site horo">
      {/* небо циферблата становится фоном страницы: ночь густеет к CTA */}
      <Atmosphere stops={[{ at: ".horo-hero", color: "#0a0906" }, { at: ".horo-act", color: "#070814", anchor: 0.2 }, { at: ".horo-act", color: "#04050c", anchor: 0.8 }, { at: ".horo-cta", color: "#04050b" }]} />
      <section className="horo-hero">
        <video className="horo-hero-vid" src="/uploads/1/hooks/sites/horologe-hero.mp4" poster="/uploads/1/hooks/sites/horologe.jpg" autoPlay muted loop playsInline />
        <div className="horo-hero-wash" />
        <header className="horo-head"><Link href="/visual-hooks" className="horo-brand">HOROLOGE</Link><nav className="horo-nav"><a href="#" onClick={stop}>Movement</a><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Acquire</a></nav></header>
        <div className="horo-hero-copy"><span className="horo-eyebrow">Complication N°VII</span><h1>A little <em>galaxy</em><br />on your wrist.</h1></div>
      </section>
      {/* второй акт: камера проваливается в авантюриновое небо циферблата (вектор — кадр другой модели убран), потом механизм
          «разносится» кольцами (0→400 деталей), и луна проходит фазы. Сплит-повтор постера hero и галерея убраны. */}
      <Act cls="horo-act" band={{ t: "cinematicBand", media: HORO_SKY, chapters: [
        { index: "The dial", title: <>An aventurine<br /><em>night sky.</em></>, body: "Copper flecks suspended in blue glass, cut and polished by hand — a sky small enough to wear.", align: "center", media: HORO_SKY },
        { index: "The movement", title: <><ActCount to={400} a={0.36} b={0.56} /> parts,<br /><em>one quiet universe.</em></>, body: "Wound by hand and finished under a loupe over three months.", align: "left", media: `${BS}g/horo-caseback.jpg` },
        { index: "Moonphase", title: <>Right for<br /><em>a century.</em></>, body: "A seventy-two hour reserve, a moon that will not need correcting until 2126, and a rotor you will never hear.", align: "left", media: `${BS}g/horo-caseback.jpg` },
      ] }}>
        <div className="horo-rings bs-w bs-k" style={aw(0.34, 0.68, { "--wr": 0.05 })}>
          {["sapphire", "dial", "bridges", "rotor"].map((l, i) => <i key={l} style={{ ["--i" as string]: i }} />)}
          {["sapphire", "dial", "bridges", "rotor"].map((l, i) => <span key={l} style={{ ["--i" as string]: i }}>{l}</span>)}
        </div>
        <div className="horo-moon bs-w bs-k" style={aw(0.7, 1.12, { "--wr": 0.05 })}><b /><span>moonphase · 29.53 days</span></div>
      </Act>
      <section className="horo-cta">
        {/* двадцать восемь звёзд — двадцать восемь часов; одна уже горит золотом */}
        <div className="horo-28" aria-hidden>{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ transform: `translateY(${(-Math.sin((i / 27) * Math.PI) * 30).toFixed(1)}px)` }} />)}</div>
        <Reveal className="vh-rv--up"><h2>Twenty-eight will <em>ever exist.</em></h2><p>Each numbered, each spoken for by application only.</p><a href="#" onClick={stop} className="horo-btn">Request an audience <i>↗</i></a></Reveal></section>
      <footer className="horo-foot"><div className="horo-foot-top"><b>HOROLOGE</b><p>Hand-finished complications, in tiny numbers.</p></div><div className="horo-foot-legal"><span>Maison Horologe</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== TIDE — cold-water swim club (teal, cinematic) ===== */
// пузыри нырка: детерминированные позиции/размеры/задержки (без Math.random)
const TIDE_BUBBLES = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37) % 100, s: 4 + ((i * 7) % 5) * 3, d: ((i * 13) % 10) / 4, t: 3.2 + ((i * 5) % 4) * 0.7 }));
function TideSite() {
  return (
    <div className="vh-site tide">
      {/* фон — это температура: бирюза 4° → подводная тьма → тёплый янтарь огня и кофе */}
      <Atmosphere stops={[{ at: ".tide-hero", color: "#04141a" }, { at: ".tide-act", color: "#03121a", anchor: 0.2 }, { at: ".tide-act", color: "#2a1709", anchor: 0.84 }, { at: ".tide-cta", color: "#26150a" }]} />
      <section className="tide-hero">
        <video className="tide-hero-vid" src="/uploads/1/hooks/sites/tide-hero.mp4" poster="/uploads/1/hooks/sites/tide-hero.jpg" autoPlay muted loop playsInline />
        <div className="tide-hero-wash" />
        <header className="tide-head"><Link href="/visual-hooks" className="tide-brand">TIDE</Link><nav className="tide-nav"><a href="#" onClick={stop}>The swim</a><a href="#" onClick={stop}>Membership</a><a href="#" onClick={stop}>Join</a></nav></header>
        <div className="tide-hero-copy"><span className="tide-eyebrow">A cold-water club</span><h1>The cold does<br /><em>the work.</em></h1><p>We meet at dawn, all year, and get in. That is the whole idea.</p></div>
      </section>
      {/* второй акт «The ritual» в 3 фазы: берег 6:00/4° → камера уходит под ватерлинию (вода заливает экран, пузыри,
          таймер 90 секунд) → выход, свет резко теплеет. Текстовые колонки шагов и повтор «Dawn, all year» убраны. */}
      <Act cls="tide-act" band={{ t: "cinematicBand", media: `${BS}g/tide-shore.jpg`, chapters: [
        { index: "06:00 · 4°C — arrive", title: <>Get in. Everything else<br /><em>gets quieter.</em></>, body: "Six a.m., the water is four degrees and nobody is talking.", align: "left", media: `${BS}g/tide-shore.jpg` },
        { index: "Plunge", title: <>Ninety seconds.<br /><em>The gasp.</em></>, body: "Then the strange, total quiet of your own heartbeat under the water.", align: "left", media: `${BS}g/tide-swim.jpg` },
        { index: "Warm", title: <>Wool, a fire,<br /><em>coffee too hot to hold.</em></>, body: "This is the part nobody tells you about.", align: "right", media: `${BS}g/tide-swim.jpg` },
      ] }}>
        <div className="tide-water" aria-hidden>
          <div className="tide-bubbles">{TIDE_BUBBLES.map((b, i) => <i key={i} style={{ left: `${b.x}%`, width: b.s, height: b.s, animationDelay: `${b.d}s`, animationDuration: `${b.t}s` }} />)}</div>
        </div>
        <div className="tide-timer bs-w" style={aw(0.34, 0.66)}><ActCount to={90} a={0.38} b={0.62} time /><span>the gasp</span></div>
      </Act>
      <section className="tide-cta"><Reveal className="vh-rv--up"><h2>Your first swim is <em>on us.</em></h2><p>Come once. Most people are back on Thursday.</p><a href="#" onClick={stop} className="tide-btn">Book a dawn swim <i>↗</i></a></Reveal></section>
      <footer className="tide-foot"><div className="tide-foot-top"><b>TIDE</b><p>A cold-water swim club. All year, at dawn.</p></div><div className="tide-foot-legal"><span>Tide Club</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== CANTO — hi-fi / винил (warm analog, brass) ===== */
// тёмный орех под пластинку (плита акта, вектор)
const CANTO_PLATE = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="w" cx=".64" cy=".5" r=".8"><stop offset="0" stop-color="#3a2212"/><stop offset=".55" stop-color="#1c0f07"/><stop offset="1" stop-color="#090503"/></radialGradient><radialGradient id="l" cx=".82" cy=".08" r=".55"><stop offset="0" stop-color="#ffb25e" stop-opacity=".22"/><stop offset="1" stop-color="#ffb25e" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#w)"/>${Array.from({ length: 22 }, (_, i) => `<path d="M0 ${40 + i * 40} C 400 ${20 + i * 41 + ((i * 17) % 23)}, 1000 ${60 + i * 39 - ((i * 11) % 19)}, 1600 ${36 + i * 40}" stroke="#000" stroke-opacity=".16" fill="none" stroke-width="${1 + (i % 3)}"/>`).join("")}<rect width="1600" height="900" fill="url(#l)"/></svg>`);
function CantoSite() {
  return (
    <div className="vh-site canto">
      {/* «with the lights low»: страница темнеет, лампы усилителя к CTA разгораются */}
      <Atmosphere stops={[{ at: ".canto-hero", color: "#100b06" }, { at: ".canto-act", color: "#0d0805", anchor: 0.2 }, { at: ".canto-act", color: "#070403", anchor: 0.82 }, { at: ".canto-cta", color: "#060302" }]} />
      <section className="canto-hero">
        {/* hero-видео несло этикетку «…NOTE» — вместо него перегенерированный кадр без чужого лейбла, с медленным наездом */}
        <img className="canto-hero-vid canto-hero-still" src="/uploads/1/hooks/sites/canto-hero.jpg" alt="" />
        <div className="canto-hero-wash" />
        <header className="canto-head"><Link href="/visual-hooks" className="canto-brand">CANTO</Link><nav className="canto-nav"><a href="#" onClick={stop}>The system</a><a href="#" onClick={stop}>Rooms</a><a href="#" onClick={stop}>Listen</a></nav></header>
        <div className="canto-hero-copy"><span className="canto-eyebrow">Analog hi-fi, by hand</span><h1>Music, with the<br /><em>weight put back in.</em></h1></div>
      </section>
      {/* второй акт — «сторона A»: диск сверху крутится скроллом, тонарм идёт от края к центру, главы = треки;
          потом диск уходит в угол «now playing», в конце выбег и тонарм поднимается. Сплит-повтор hero и галерея убраны. */}
      <Act cls="canto-act" band={{ t: "cinematicBand", media: CANTO_PLATE, chapters: [
        { index: "Side A · 01", title: <>We do not stream.<br /><em>We sit down.</em></>, body: "A turntable, a valve amp, and two speakers voiced over a year. Then one record, start to finish.", align: "left", media: CANTO_PLATE },
        { index: "Side A · 02", title: <>Brass, walnut,<br /><em>forty years of tubes.</em></>, body: "Every system is built to the room it will live in. We come, we measure, we tune it by ear.", align: "left", media: `${BS}g/canto-deck.jpg` },
        { index: "Side A · 03", title: <>With the<br /><em>lights low.</em></>, body: "The run-out groove is the only notification you will get tonight.", align: "left", media: `${BS}g/canto-room.jpg` },
      ] }}>
        <div className="canto-rec">
          <div className="canto-disc"><b>CANTO</b><small>SIDE A · 33⅓</small></div>
          <i className="canto-sheen" />
          <i className="canto-arm" />
        </div>
      </Act>
      <section className="canto-cta"><i className="canto-tubes" aria-hidden /><Reveal className="vh-rv--up"><h2>Hear it <em>in the room.</em></h2><p>Book an hour in the listening lounge. Bring the record that matters most.</p><a href="#" onClick={stop} className="canto-btn">Book a session <i>↗</i></a></Reveal></section>
      <footer className="canto-foot"><div className="canto-foot-top"><b>CANTO</b><p>Analog hi-fi systems, built by ear.</p></div><div className="canto-foot-legal"><span>Canto Audio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ATLAS — экспедиционное снаряжение (cold, epic) ===== */
// изолинии карты (детерминированные «волнистые эллипсы»): по ходу акта рвутся и редеют — «где кончается карта»
const ATLAS_ISO = Array.from({ length: 9 }, (_, k) => {
  const pts = Array.from({ length: 73 }, (_, j) => {
    const t = (j / 72) * Math.PI * 2, r = 70 + k * 46;
    const rr = r * (1 + 0.09 * Math.sin(3 * t + k * 0.9) + 0.05 * Math.sin(5 * t - k * 1.7));
    return `${(800 + rr * 1.5 * Math.cos(t)).toFixed(1)} ${(470 + rr * Math.sin(t)).toFixed(1)}`;
  });
  return `M${pts.join(" L")}`;
});
function AtlasSite() {
  return (
    <div className="vh-site atlas">
      {/* фон холодеет и светлеет с высотой; к CTA карта кончается — чистый белый */}
      <Atmosphere stops={[{ at: ".atlas-hero", color: "#0c1014" }, { at: ".atlas-act", color: "#0c1117", anchor: 0.2 }, { at: ".atlas-act", color: "#dde5ea", anchor: 0.84 }, { at: ".atlas-cta", color: "#eef3f6" }]} />
      <Weather kind="snow" count={26} color="#f4f8fb" between={[".atlas-act", ".atlas-foot"]} world={0.45} wind={1.6} zIndex={5} seed={5} />
      <section className="atlas-hero">
        <video className="atlas-hero-vid" src="/uploads/1/hooks/sites/atlas-hero.mp4" poster="/uploads/1/hooks/sites/atlas-hero.jpg" autoPlay muted loop playsInline />
        <div className="atlas-hero-wash" />
        <header className="atlas-head"><Link href="/visual-hooks" className="atlas-brand">ATLAS</Link><nav className="atlas-nav"><a href="#" onClick={stop}>The kit</a><a href="#" onClick={stop}>Field notes</a><a href="#" onClick={stop}>Shop</a></nav></header>
        <div className="atlas-hero-copy"><span className="atlas-eyebrow">Expedition gear</span><h1>Made for where<br /><em>the map ends.</em></h1></div>
      </section>
      {/* второй акт: раскладка на пине — цифры встают на свои предметы (статы = событие), потом кит уходит в поле;
          изолинии рвутся к белому. Строка мелких статов и галерея-повтор «Where the map ends» убраны. */}
      <Act cls="atlas-act" band={{ t: "cinematicBand", media: `${BS}g/atlas-pack.jpg`, chapters: [
        { index: "The kit", title: <>Gear that earns<br /><em>the weight it costs you.</em></>, body: "We make very few things. Each one goes to the ice on a real expedition before it is allowed anywhere near a shop.", align: "left", media: `${BS}g/atlas-pack.jpg` },
        { index: "Tested, not rated", title: <>Every piece<br /><em>earns its place.</em></>, body: "Carried, soaked, frozen and mended in the field before it makes this list.", align: "left", media: `${BS}g/atlas-pack.jpg` },
        { index: "Taken to the ice", title: <>Built to be repaired,<br /><em>not replaced.</em></>, body: "One repair, free, forever — wherever the map ends for you.", align: "right", media: `${BS}g/atlas-field.jpg` },
      ] }}>
        <svg className="atlas-iso" viewBox="0 0 1600 940" preserveAspectRatio="xMidYMid slice" fill="none">{ATLAS_ISO.map((d, i) => <path key={i} d={d} pathLength={1} style={{ ["--i" as string]: i }} />)}</svg>
        <div className="atlas-tags">
          <div className="atlas-tag bs-w" style={aw(0.33, 0.62, { "--x": "63%", "--y": "70%" })}><i /><b>−40°</b><span>tested, not rated</span></div>
          <div className="atlas-tag bs-w" style={aw(0.39, 0.62, { "--x": "47%", "--y": "38%" })}><i /><b>7</b><span>expeditions before it ships</span></div>
          <div className="atlas-tag bs-w" style={aw(0.45, 0.62, { "--x": "76%", "--y": "80%" })}><i /><b>1</b><span>repair, free, forever</span></div>
        </div>
      </Act>
      <section className="atlas-cta"><Reveal className="vh-rv--up"><h2>Pack for <em>the ends of it.</em></h2><p>A short list of things that will not let you down. Built to be repaired, not replaced.</p><a href="#" onClick={stop} className="atlas-btn">See the kit <i>↗</i></a></Reveal></section>
      <footer className="atlas-foot"><div className="atlas-foot-top"><b>ATLAS</b><p>A short list of expedition-grade gear.</p></div><div className="atlas-foot-legal"><span>Atlas Supply</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== NOCT — natural wine (dark, candlelit, intimate) ===== */
function NoctSite() {
  return (
    <div className="vh-site noct">
      {/* ночь углубляется, круг свечи сужается */}
      <Atmosphere stops={[{ at: ".noct-hero", color: "#120806" }, { at: ".noct-act", color: "#0f0605", anchor: 0.2 }, { at: ".noct-act", color: "#080302", anchor: 0.84 }, { at: ".noct-cta", color: "#070302" }]} />
      <section className="noct-hero">
        <video className="noct-hero-vid" src="/uploads/1/hooks/sites/noct-hero.mp4" poster="/uploads/1/hooks/sites/noct-hero.jpg" autoPlay muted loop playsInline />
        <div className="noct-hero-wash" />
        <header className="noct-head"><Link href="/visual-hooks" className="noct-brand">NOCT</Link><nav className="noct-nav"><a href="#" onClick={stop}>The list</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Visit</a></nav></header>
        <div className="noct-hero-copy"><span className="noct-eyebrow">A natural wine room</span><h1>Wine that tastes<br /><em>of somewhere.</em></h1></div>
      </section>
      {/* второй акт — налив: свеча работает фонарём, её круг освещает только текущую главу и переезжает от бокала к бутылке;
          ночь густеет, круг сужается. Сплит-повтор hero и галерея («Poured after dark» ≈ CTA) убраны. */}
      <Act cls="noct-act" band={{ t: "cinematicBand", media: `${BS}g/noct-pour.jpg`, chapters: [
        { index: "By the glass", title: <>Nothing added,<br /><em>nothing taken away.</em></>, body: "Low light, forty bottles, and no list you have heard of.", align: "left", media: `${BS}g/noct-pour.jpg` },
        { index: "The pour", title: <>We pour slowly,<br /><em>and tell the story.</em></>, body: "If you want it. Otherwise the glass does the talking, and the candle keeps the time.", align: "left", media: `${BS}g/noct-pour.jpg` },
        { index: "Forty bottles", title: <>Small growers,<br /><em>honest hands.</em></>, body: "Farmed without chemicals, made without shortcuts. Some of it is a little wild. That is the good part.", align: "left", media: `${BS}g/noct-cellar.jpg` },
      ] }}>
        <div className="noct-flame bs-w" style={aw(-0.2, 0.62, { "--wr": 0.1 })} />
      </Act>
      <section className="noct-cta"><Reveal className="vh-rv--up"><h2>Come in <em>after dark.</em></h2><p>No bookings before eight. Sit at the bar and let us pour you something strange.</p><a href="#" onClick={stop} className="noct-btn">Find us <i>↗</i></a></Reveal></section>
      <footer className="noct-foot"><div className="noct-foot-top"><b>NOCT</b><p>A natural wine room. Open after dark.</p></div><div className="noct-foot-legal"><span>Noct Wine</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== SOL — солнечная энергия (light, optimistic) ===== */
function SolSite() {
  return (
    <div className="vh-site sol">
      {/* один день над крышей: рассвет → белый полдень → золотой закат к CTA */}
      <Atmosphere stops={[{ at: ".sol-hero", color: "#f4efe4" }, { at: ".sol-act", color: "#f7f3ea", anchor: 0.2 }, { at: ".sol-act", color: "#f3d8b4", anchor: 0.84 }, { at: ".sol-cta", color: "#f0cda2" }]} />
      {/* актёр — солнце: его положение = прогресс страницы; дуга с востока на запад, к CTA садится */}
      <Actor width="clamp(64px,6.4vw,110px)" zIndex={5} bob={0} tilt={0} stops={[
        { at: ".sol-hero", anchor: 0.35, pose: { x: 84, y: 12, o: 0, s: 0.7 } },
        { at: ".sol-hero", anchor: 0.9, pose: { x: 80, y: 14, o: 1, s: 0.8 } },
        { at: ".sol-act", anchor: 0.3, pose: { x: 62, y: 9, o: 1, s: 1 } },
        { at: ".sol-act", anchor: 0.6, pose: { x: 40, y: 8, o: 1, s: 1 } },
        { at: ".sol-act", anchor: 0.9, pose: { x: 30, y: 9, o: 1, s: 1.1 } },
        { at: ".sol-cta", anchor: 0.5, pose: { x: 50, y: 20, o: 1, s: 1.25, dock: true } },
        { at: ".sol-foot", anchor: 0.9, pose: { x: 50, y: 60, o: 0, s: 1.3, dock: true } },
      ]}><div className="sol-sun" /></Actor>
      <section className="sol-hero">
        <video className="sol-hero-vid" src="/uploads/1/hooks/sites/sol-hero.mp4" poster="/uploads/1/hooks/sites/sol-hero.jpg" autoPlay muted loop playsInline />
        <div className="sol-hero-wash" />
        <header className="sol-head"><Link href="/visual-hooks" className="sol-brand">SOL</Link><nav className="sol-nav"><a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Impact</a><a href="#" onClick={stop}>Quote</a></nav></header>
        <div className="sol-hero-copy"><span className="sol-eyebrow">Home solar, done right</span><h1>Your roof already<br /><em>catches the sun.</em></h1></div>
      </section>
      {/* второй акт — одна крыша вместо поля: Survey (контур крыши обмеряется линиями) → Install (панели) →
          Own it (батарея наполняется, счётчик крутится назад). Текстовые шаги и галерея-повтор убраны. */}
      <Act cls="sol-act" band={{ t: "cinematicBand", media: `${BS}g/sol-roof.jpg`, chapters: [
        { index: "Not a power station. Yours.", title: <>Stop renting your power.<br /><em>Start owning it.</em></>, body: "Sunlight is free and your roof is already in it.", align: "center", media: `${BS}g/sol-roof.jpg` },
        { index: "01 — Survey", title: <>We read your roof<br /><em>in a single visit.</em></>, body: "Your roof, your bills and your sky — measured once, priced honestly.", align: "left", media: `${BS}g/sol-roof.jpg` },
        { index: "02 — Install", title: <>One clean day.<br /><em>Panels, battery, done.</em></>, body: "And an app that shows the sun at work from the first afternoon.", align: "right", media: `${BS}g/sol-panel.jpg` },
        { index: "03 — Own it", title: <>Your meter<br /><em>runs backwards.</em></>, body: "You make your own power by year one, and sell the rest back after.", align: "left", media: `${BS}g/sol-panel.jpg` },
      ] }}>
        <svg className="sol-survey bs-w" style={aw(0.24, 0.5, { "--wr": 0.04 })} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g className="bs-k" style={aw(0.27, 0.42)}>
            <path pathLength={1} d="M170 396 L1500 92 M162 380 L178 412 M1492 76 L1508 108" />
            <path pathLength={1} d="M300 552 L1420 400 M292 536 L308 568 M1412 384 L1428 416" />
            <path pathLength={1} d="M160 828 L320 828 M160 828 L290 740 M250 828 A 90 90 0 0 0 236 776" />
          </g>
          <text x="830" y="226" transform="rotate(-12.9 830 226)">11.4 m · south-west</text>
          <text x="850" y="462" transform="rotate(-7.7 850 462)">8 panels · 3.2 kWp</text>
          <text x="332" y="812">38°</text>
        </svg>
        <div className="sol-own bs-w" style={aw(0.78, 1.2, { "--wr": 0.05 })}>
          <div className="sol-batt bs-k" style={aw(0.8, 0.98)}><i /></div>
          <b><ActCount from={4812} to={4356} a={0.8} b={0.98} comma /> <small>kWh</small></b>
          <span>your meter, running backwards</span>
        </div>
      </Act>
      <section className="sol-cta"><Reveal className="vh-rv--up"><h2>See your roof <em>in sunlight.</em></h2><p>A free survey and an honest number, with no one calling you twice.</p><a href="#" onClick={stop} className="sol-btn">Get a quote <i>↗</i></a></Reveal></section>
      <footer className="sol-foot"><div className="sol-foot-top"><b>SOL</b><p>Home solar and storage, done right.</p></div><div className="sol-foot-legal"><span>Sol Energy</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== VESSEL — мода (deep-red void, cream, editorial) ===== */
function VesselSite() {
  return (
    <div className="vh-site vess">
      {/* красная пустота → кремовое ателье «in daylight»: смена света прячется, пока акт закрывает экран */}
      <Atmosphere stops={[{ at: ".vess-hero", color: "#180608" }, { at: ".vess-act", color: "#2c070c", anchor: 0.16 }, { at: ".vess-act", color: "#efe4d6", anchor: 0.86 }, { at: ".vess-cta", color: "#f4ece1" }]} />
      <section className="vess-hero">
        <video className="vess-hero-vid" src="/uploads/1/hooks/sites/vessel-hero.mp4" poster="/uploads/1/hooks/sites/vessel.jpg" autoPlay muted loop playsInline />
        <div className="vess-hero-wash" />
        <header className="vess-head"><Link href="/visual-hooks" className="vess-brand">VESSEL</Link><nav className="vess-nav"><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop}>Book</a></nav></header>
        <div className="vess-hero-copy"><span className="vess-eyebrow">Autumn / Winter</span><h1>Cloth that <em>moves</em><br />like it means it.</h1></div>
      </section>
      {/* второй акт «Draped, not fitted»: ткань падает → складывается → складка-занавес проходит через экран и открывает живое тело */}
      <Act cls="vess-act" band={{ t: "cinematicBand", media: `${BS}g/vessel-fabric.jpg`, chapters: [
        { index: "Draped, not fitted", title: <>We cut for the body<br /><em>in motion.</em></>, body: "No darts, no padding, no mannequin. Every piece is made to fall, fold and follow.", align: "center", media: `${BS}g/vessel-fabric.jpg` },
        { index: "01 — Fall", title: <>It <em>falls.</em></>, body: "Cut on the bias, so the cloth drops from the shoulder the way water does.", align: "left", media: `${BS}g/vessel-fabric.jpg` },
        { index: "02 — Fold", title: <>It <em>folds.</em></>, body: "Pleats pressed by hand, then left free to open as you walk.", align: "right", media: `${BS}g/vessel-fabric.jpg` },
        { index: "03 — Follow", title: <>It <em>follows.</em></>, body: "Drawn on a living body, never a mannequin — so it moves when you do.", align: "left", media: `${BS}g/vessel-look.jpg` },
      ] }}>
        <div className="vess-fold bs-k" style={aw(0.62, 0.88)} />
      </Act>
      <section className="vess-cta"><Reveal className="vh-rv--up"><h2>Seen only <em>by appointment.</em></h2><p>The collection shows in the atelier, on a body, in daylight. Book a fitting.</p><a href="#" onClick={stop} className="vess-btn">Request an appointment <i>↗</i></a></Reveal></section>
      <footer className="vess-foot"><div className="vess-foot-top"><b>VESSEL</b><p>Draped ready-to-wear, shown by appointment.</p></div><div className="vess-foot-legal"><span>Vessel Atelier</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HAVEN — курорт/отель (warm golden, serene) ===== */
function HavenSite() {
  const pin = useSectionProgress<HTMLElement>();
  return (
    <div className="vh-site hav">
      {/* один день: золото утра → белый полдень → синие сумерки к «Stay until you lose the day» */}
      <Atmosphere stops={[{ at: ".hav-hero", color: "#eadcc4", anchor: 0.3 }, { at: ".hav-act", color: "#eeece6", anchor: 0.2 }, { at: ".hav-act", color: "#1c2740", anchor: 0.82 }, { at: ".hav-cta", color: "#19233a" }]} />
      {/* актёр — линия горизонта: кромка бассейна → горизонт в окне → море с холма → линия заката под солнцем CTA */}
      <Actor width="100vw" zIndex={6} bob={0} tilt={0} stops={[
        { at: ".hav-hero", anchor: 0.28, pose: { x: 50, y: 49, o: 0 } },
        { at: ".hav-hero", anchor: 0.6, pose: { x: 50, y: 49, o: 0.9 } },
        { at: ".hav-act", anchor: 0.25, pose: { x: 50, y: 56, o: 0.55 } },
        { at: ".hav-act", anchor: 0.75, pose: { x: 50, y: 45, o: 0.55 } },
        { at: ".hav-cta", anchor: 0.5, pose: { x: 50, y: 20, o: 0.95, dock: true } },
        { at: ".hav-foot", anchor: 0.9, pose: { x: 50, y: 20, o: 0 } },
      ]}><div className="hav-line" /></Actor>
      {/* hero на пине: камера наезжает на женщину, кромка бассейна растворяется в море, statement всплывает из воды */}
      <section ref={pin} className="hav-hero">
        <div className="hav-hero-pin">
          <video className="hav-hero-vid" src="/uploads/1/hooks/sites/haven-hero.mp4" poster="/uploads/1/hooks/sites/haven.jpg" autoPlay muted loop playsInline />
          <div className="hav-hero-wash" />
          <div className="hav-haze" aria-hidden />
          <header className="hav-head"><Link href="/visual-hooks" className="hav-brand">HAVEN</Link><nav className="hav-nav"><a href="#" onClick={stop}>The place</a><a href="#" onClick={stop}>Suites</a><a href="#" onClick={stop}>Reserve</a></nav></header>
          <div className="hav-hero-copy"><span className="hav-eyebrow">A shoreline retreat</span><h1>Where the pool<br /><em>forgets the sea.</em></h1></div>
          <div className="hav-hero-state"><h2>Nine rooms, one horizon,<br /><em>and nowhere to be.</em></h2><p>No lobby, no schedule, no screens by the water. Just a long edge where the pool and the ocean agree to be the same thing.</p></div>
        </div>
      </section>
      {/* второй акт: белый полдень в номере → поздний день над бухтой уходит в синий час (холодные кадры = время суток, не чужая гамма) */}
      <Act cls="hav-act" band={{ t: "cinematicBand", media: `${BS}g/haven-room.jpg`, chapters: [
        { index: "Noon", title: <>Every room keeps<br /><em>the same line of sea.</em></>, body: "Nine suites, each with the horizon at the window and nothing on the wall to compete with it.", align: "left", media: `${BS}g/haven-room.jpg` },
        { index: "Five o'clock", title: <>Walk down to the cove,<br /><em>or don't.</em></>, body: "The light goes gold, then blue, whether you watch it or not.", align: "right", media: `${BS}g/haven-view.jpg` },
      ] }} />
      <section className="hav-cta"><div className="hav-sun" aria-hidden /><Reveal className="vh-rv--up"><h2>Stay until you <em>lose the day.</em></h2><p>Two-night minimum. Breakfast when you wake, dinner when the light goes.</p><a href="#" onClick={stop} className="hav-btn">Check dates <i>↗</i></a></Reveal></section>
      <footer className="hav-foot"><div className="hav-foot-top"><b>HAVEN</b><p>A nine-room shoreline retreat.</p></div><div className="hav-foot-legal"><span>Haven Retreat</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== FORM — мебель (concrete minimal, one light) ===== */
function FormSite() {
  return (
    <div className="vh-site form">
      {/* вся страница — одна тёмная комната; фон — это свет */}
      <Atmosphere stops={[{ at: ".form-hero", color: "#17171a" }, { at: ".form-act", color: "#131316", anchor: 0.2 }, { at: ".form-act", color: "#0e0e10", anchor: 0.84 }, { at: ".form-cta", color: "#101012" }]} />
      <section className="form-hero">
        <video className="form-hero-vid" src="/uploads/1/hooks/sites/form-hero.mp4" poster="/uploads/1/hooks/sites/form.jpg" autoPlay muted loop playsInline />
        <div className="form-hero-wash" />
        <header className="form-head"><Link href="/visual-hooks" className="form-brand">FORM</Link><nav className="form-nav"><a href="#" onClick={stop}>Pieces</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Enquire</a></nav></header>
        <div className="form-hero-copy"><span className="form-eyebrow">Furniture, essential</span><h1>One chair.<br /><em>Nothing spare.</em></h1></div>
      </section>
      {/* второй акт «вычитание»: брусок и соединение → счётчик деталей идёт вниз → остаётся стул в единственном луче.
          Луч-прожектор переезжает от соединения к стулу. Галерея («Made slowly…» ≈ CTA) убрана. */}
      <Act cls="form-act" band={{ t: "cinematicBand", media: `${BS}g/form-detail.jpg`, chapters: [
        { index: "Start with a block", title: <>We remove until<br /><em>only the use is left.</em></>, body: "Each piece begins as one block of oak and is worked down to the fewest parts that still hold a person.", align: "left", media: `${BS}g/form-detail.jpg` },
        { index: "In the joinery", title: <>No screws.<br /><em>No glue you can see.</em></>, body: "Dovetails cut by hand, so the joint is the only ornament.", align: "left", media: `${BS}g/form-detail.jpg` },
        { index: "One chair", title: <>Quiet, heavy,<br /><em>made to be kept.</em></>, body: "What remains holds a person for a lifetime — and nothing spare.", align: "left", media: `${BS}g/form-chair.jpg` },
      ] }}>
        <div className="form-beam" />
        <div className="form-parts bs-w" style={aw(0.3, 1.2, { "--wr": 0.05 })}><span>parts</span><b><ActCount from={64} to={7} a={0.32} b={0.78} /></b></div>
      </Act>
      <section className="form-cta"><Reveal className="vh-rv--up"><h2>Made slowly, <em>to order.</em></h2><p>A small workshop, a short catalogue, and a wait worth the object at the end of it.</p><a href="#" onClick={stop} className="form-btn">See the pieces <i>↗</i></a></Reveal></section>
      <footer className="form-foot"><div className="form-foot-top"><b>FORM</b><p>Essential furniture, made to order.</p></div><div className="form-foot-legal"><span>Form Studio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== DEW — скинкер (soft, clean, iridescent) ===== */
// облако из 40 ингредиентов вокруг капли: 31 гаснет по одному, 9 оставшихся втягиваются в каплю (детерминированная раскладка)
const DEW_OUT = ["fragrance", "parfum", "alcohol denat.", "silicones", "dimethicone", "parabens", "phenoxyethanol", "SLS", "PEG-40", "mineral oil", "petrolatum", "dyes", "CI 19140", "fillers", "water", "thickeners", "carbomer", "shimmer", "BHT", "EDTA", "polysorbate 20", "limonene", "linalool", "talc", "microbeads", "menthol", "essential oils", "retinyl palmitate", "citric acid", "sodium benzoate", "glitter"];
const DEW_KEEP = ["squalane", "niacinamide", "hyaluronic acid", "ceramide NP", "panthenol", "bisabolol", "tocopherol", "allantoin", "jojoba oil"];
const DEW_CLOUD = [...DEW_OUT.map((w) => ({ w, keep: false })), ...DEW_KEEP.map((w) => ({ w, keep: true }))].map((o, i) => {
  const a = i * 2.39996, r = 13 + ((i * 7) % 11) * 1.9;
  let x = 60 + Math.cos(a) * r * 1.35, y = 47 + Math.sin(a) * r * 1.05;
  if (x < 46 && y > 58) x = 100 - x; // низ-лево занят текстом главы
  return { ...o, x: Math.min(92, Math.max(8, x)), y: Math.min(86, Math.max(12, y)), t: o.keep ? 0 : 0.03 + (i / DEW_OUT.length) * 0.24 };
});
function DewSite() {
  return (
    <div className="vh-site dew">
      {/* масштаб как сюжет: макро кожи → лицо → флакон на льне */}
      <Atmosphere stops={[{ at: ".dew-hero", color: "#f1ebea" }, { at: ".dew-act", color: "#f3ecea", anchor: 0.2 }, { at: ".dew-act", color: "#ece5dc", anchor: 0.84 }, { at: ".dew-cta", color: "#efe8df" }]} />
      <section className="dew-hero">
        <video className="dew-hero-vid" src="/uploads/1/hooks/sites/dew-hero.mp4" poster="/uploads/1/hooks/sites/dew.jpg" autoPlay muted loop playsInline />
        <div className="dew-hero-wash" />
        <header className="dew-head"><Link href="/visual-hooks" className="dew-brand">DEW</Link><nav className="dew-nav"><a href="#" onClick={stop}>The drop</a><a href="#" onClick={stop}>Ritual</a><a href="#" onClick={stop}>Shop</a></nav></header>
        <div className="dew-hero-copy"><span className="dew-eyebrow">One serum, nothing else</span><h1>Everything<br />your skin<br /><em>actually needs.</em></h1></div>
      </section>
      {/* второй акт «We took it all out»: вокруг капли облако из 40 ингредиентов, скролл убирает их по одному до 9,
          оставшиеся втягиваются внутрь капли; потом лицо и флакон. Сплит-повтор hero и галерея убраны. */}
      <Act cls="dew-act" band={{ t: "cinematicBand", media: `${BS}g/dew-drop.jpg`, chapters: [
        { index: "Forty in, nine left", title: <>We took it all out<br /><em>until only this was left.</em></>, body: "No water bulking it out, no fragrance, no story on the box.", align: "left", media: `${BS}g/dew-drop.jpg` },
        { index: "Sinks in", title: <>Feels like<br /><em>almost nothing.</em></>, body: "It sinks in before you finish rubbing it in. No film, no shine, no scent.", align: "left", media: `${BS}g/dew-skin.jpg` },
        { index: "Eight weeks a bottle", title: <>One drop,<br /><em>morning and night.</em></>, body: "Nine ingredients and time to let them work — skin that behaves a little better every week.", align: "left", media: `${BS}g/dew-bottle.jpg` },
      ] }}>
        <div className="dew-cloud bs-w" style={aw(-0.2, 0.5, { "--wr": 0.05 })}>
          {DEW_CLOUD.map((o) => <span key={o.w} className={o.keep ? "keep" : undefined} style={{ ["--x" as string]: o.x.toFixed(1), ["--y" as string]: o.y.toFixed(1), ["--t" as string]: o.t.toFixed(3) }}>{o.w}</span>)}
        </div>
      </Act>
      <section className="dew-cta"><i className="dew-bead" aria-hidden /><Reveal className="vh-rv--up"><h2>Start the <em>one-drop ritual.</em></h2><p>One bottle lasts eight weeks. If your skin disagrees, we refund it.</p><a href="#" onClick={stop} className="dew-btn">Try one bottle <i>↗</i></a></Reveal></section>
      <footer className="dew-foot"><div className="dew-foot-top"><b>DEW</b><p>One serum, honestly made.</p></div><div className="dew-foot-legal"><span>Dew Skin</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ROAST — кофе-ростер (warm dark, burnt orange) ===== */
// кривая свежести (дни 0→30): обжарка → пик 4–14 день → спад «полки»; зерно едет по линии (offset-path той же кривой)
const ROAST_CURVE = "M0 232 C 40 226, 70 120, 118 64 C 150 30, 250 24, 330 44 C 420 70, 500 170, 620 214";
function RoastSite() {
  return (
    <div className="vh-site roast">
      {/* профиль обжарки: сырое серо-зелёное зерно → first crack → тёмная обжарка к CTA */}
      <Atmosphere stops={[{ at: ".roast-hero", color: "#140d08" }, { at: ".roast-act", color: "#1a1c14", anchor: 0.2 }, { at: ".roast-act", color: "#140c07", anchor: 0.84 }, { at: ".roast-cta", color: "#120b06" }]} />
      <section className="roast-hero">
        <video className="roast-hero-vid" src="/uploads/1/hooks/sites/roast-hero.mp4" poster="/uploads/1/hooks/sites/roast.jpg" autoPlay muted loop playsInline />
        <div className="roast-hero-wash" />
        <header className="roast-head"><Link href="/visual-hooks" className="roast-brand">ROAST</Link><nav className="roast-nav"><a href="#" onClick={stop}>Coffees</a><a href="#" onClick={stop}>Subscribe</a><a href="#" onClick={stop}>Brew</a></nav></header>
        <div className="roast-hero-copy"><span className="roast-eyebrow">Roasted to order</span><h1>Coffee has a peak.<br /><em>We ship you<br />the peak.</em></h1></div>
      </section>
      {/* второй акт «Coffee has a peak»: через главу рисуется кривая свежести, зерно едет по линии,
          Roast / At your door / Peak встают на кривую отметками — шаги стали графиком. Текстовые шаги и галерея убраны. */}
      <Act cls="roast-act" band={{ t: "cinematicBand", media: `${BS}g/roast-beans.jpg`, chapters: [
        { index: "Fresh is not a word on the bag", title: <>Most coffee is weeks old<br /><em>before you open it.</em></>, body: "Ours is roasted the day it leaves us, so the best ten days are yours, not the warehouse's.", align: "left", media: `${BS}g/roast-beans.jpg` },
        { index: "Source · roast · ship", title: <>Farm to your kitchen,<br /><em>in days.</em></>, body: "One farm at a time. Small drums, the morning it ships. Sealed within the hour.", align: "left", media: `${BS}g/roast-beans.jpg` },
        { index: "Day 4 — the peak", title: <>Brewed the way<br /><em>you do.</em></>, body: "At its peak for ten days — and we time the delivery so day four lands on your Sunday.", align: "left", media: `${BS}g/roast-pour.jpg` },
      ] }}>
        <div className="roast-chart bs-w bs-k" style={aw(0.3, 0.74, { "--wr": 0.05 })}>
          <svg viewBox="0 0 620 270" fill="none"><path className="roast-base" d="M0 250 H620" /><path className="roast-peakband" d="M118 250 V20 M330 250 V20" /><path className="roast-line" pathLength={1} d={ROAST_CURVE} /></svg>
          <i className="roast-bean" style={{ offsetPath: `path("${ROAST_CURVE}")` }} />
          <span className="roast-mk" style={{ left: 0, top: 258 }}><b>Day 0</b>roasted</span>
          <span className="roast-mk" style={{ left: 60, top: 150 }}><b>Day 2</b>at your door</span>
          <span className="roast-mk pk" style={{ left: 170, top: -30 }}><b>Days 4–14</b>the peak</span>
          <span className="roast-mk" style={{ left: 520, top: 170 }}><b>Day 30+</b>the shelf</span>
        </div>
      </Act>
      <section className="roast-cta"><Reveal className="vh-rv--up"><h2>Wake up to the <em>right bag.</em></h2><p>Tell us how you brew. We match the coffee and time the delivery to your Sunday.</p><a href="#" onClick={stop} className="roast-btn">Build a subscription <i>↗</i></a></Reveal></section>
      <footer className="roast-foot"><div className="roast-foot-top"><b>ROAST</b><p>Single-origin coffee, roasted to order.</p></div><div className="roast-foot-legal"><span>Roast Co.</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== LUME — ювелирка (dark, platinum, refraction) ===== */
// чёрный бархат под камень (плита акта, вектор): лёгкий сине-фиолетовый отлив ворса
const LUME_VELVET = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="v" cx=".66" cy=".42" r=".75"><stop offset="0" stop-color="#1c1f2e"/><stop offset=".45" stop-color="#0d0e16"/><stop offset="1" stop-color="#040406"/></radialGradient><radialGradient id="l" cx=".2" cy=".05" r=".6"><stop offset="0" stop-color="#3a3350" stop-opacity=".45"/><stop offset="1" stop-color="#3a3350" stop-opacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#v)"/><rect width="1600" height="900" fill="url(#l)"/></svg>`);
function LumeSite() {
  return (
    <div className="vh-site lume">
      {/* от чёрного к бархату мастерской под лампой */}
      <Atmosphere stops={[{ at: ".lume-hero", color: "#08090c" }, { at: ".lume-act", color: "#07080c", anchor: 0.2 }, { at: ".lume-act", color: "#1b1210", anchor: 0.82 }, { at: ".lume-cta", color: "#1d1311" }]} />
      <section className="lume-hero">
        <video className="lume-hero-vid" src="/uploads/1/hooks/sites/lume-hero.mp4" poster="/uploads/1/hooks/sites/lume.jpg" autoPlay muted loop playsInline />
        <div className="lume-hero-wash" />
        <header className="lume-head"><Link href="/visual-hooks" className="lume-brand">LUME</Link><nav className="lume-nav"><a href="#" onClick={stop}>Stones</a><a href="#" onClick={stop}>Bespoke</a><a href="#" onClick={stop}>Enquire</a></nav></header>
        <div className="lume-hero-copy"><span className="lume-eyebrow">Fine jewellery, made to order</span><h1>Light, <em>set</em><br />to be kept.</h1></div>
      </section>
      {/* второй акт: луч входит в камень и выходит спектром; вокруг камня линией дорисовывается оправа; потом — руки у верстака.
          Чужое кольцо (сапфир в золоте) и повтор постера hero убраны; заголовок CTA больше не дублируется. */}
      <Act cls="lume-act" band={{ t: "cinematicBand", media: LUME_VELVET, chapters: [
        { index: "Stone first", title: <>One stone, chosen<br /><em>to move with the light.</em></>, body: "We start with the gem, not the setting. White light goes in; the stone decides what colour comes out.", align: "left", media: LUME_VELVET },
        { index: "Then the setting", title: <>The ring is drawn<br /><em>around its fire.</em></>, body: "Only when a stone earns it do we draw the claws, the gallery and the band — around the way it throws colour.", align: "left", media: LUME_VELVET },
        { index: "At the bench", title: <>Traced, cut, and set<br /><em>by one pair of hands.</em></>, body: "Every commission is drawn with you, then made by a single bench jeweller from stone to polish. It takes months. It should.", align: "left", media: `${BS}g/lume-bench.jpg` },
      ] }}>
        <svg className="lume-draw bs-w" style={aw(-0.2, 0.6, { "--wr": 0.07 })} viewBox="0 0 400 400" fill="none">
          <path className="lume-beam bs-k" style={aw(-0.1, 0.1)} pathLength={1} d="M-40 20 L196 160" />
          <g className="lume-stone bs-k" style={aw(-0.04, 0.16)}>
            <path pathLength={1} d="M140 160 L162 134 H238 L260 160 Z" /><path pathLength={1} d="M140 160 L200 238 L260 160" />
            <path pathLength={1} d="M162 134 L180 160 L200 134 L220 160 L238 134 M180 160 L200 238 L220 160" />
          </g>
          <g className="lume-rays bs-k" style={aw(0.08, 0.26)}>
            {["#9b7bff", "#5aa8ff", "#57e0b0", "#ffe066", "#ff7a59"].map((c, i) => <path key={c} pathLength={1} stroke={c} d={`M214 168 L${420} ${88 + i * 34}`} />)}
          </g>
          <g className="lume-set bs-k" style={aw(0.3, 0.48)}>
            <path pathLength={1} d="M146 162 L166 246 M254 162 L234 246 M172 160 L180 246 M228 160 L220 246" />
            <path pathLength={1} d="M160 246 H240 M166 246 L176 272 M234 246 L224 272" />
            <ellipse pathLength={1} cx="200" cy="304" rx="112" ry="34" />
            <ellipse pathLength={1} cx="200" cy="304" rx="96" ry="26" />
          </g>
        </svg>
      </Act>
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

/* ===== LEDGER — fintech (production: quiet-pin · features · stats · quote) ===== */
// шум, который банк НЕ делает: чипы геймификации разлетаются слоями, пока фон гаснет в матовый чёрный
const LG_NOISE = ["+250 points", "Cashback unlocked!", "3 new offers", "Level up", "12-day streak", "Refer a friend", "Limited time", "Badge earned", "Spin to win", "9 notifications", "Upgrade to Premium", "Round-ups ×2", "Tap to claim", "Boost your score", "Rewards", "You're on fire", "Flash deal", "Confetti"];
const LG_CHIPS = LG_NOISE.map((w, i) => {
  const a = i * 2.4 + 0.6, r = 16 + ((i * 5) % 7) * 4.4;
  const x = Math.min(93, Math.max(8, 64 + Math.cos(a) * r * 1.25)), y = Math.min(88, Math.max(12, 46 + Math.sin(a) * r));
  return { w, x, y, t: 0.16 + (i % 6) * 0.05, dx: Math.cos(a), dy: Math.sin(a), hue: (i * 47) % 360 };
});
/* второй акт «A bank that does less»: сцена на пине вычитает шум — туманность и шлейфы гаснут, «points / confetti /
   notifications» слетают слоями, фон уходит в матовый чёрный, остаётся металл карты и одно честное число. */
function LedgerQuiet() {
  const ref = useSectionProgress<HTMLElement>();
  return (
    <section ref={ref} className="lg-quiet bs-act">
      <div className="lg-quiet-pin">
        <ShaderBg mode="nebula" palette={["#05060a", "#1a2f5e", "#86dcb8"]} speed={0.6} className="lg-quiet-noise" />
        <div className="lg-quiet-chips" aria-hidden>{LG_CHIPS.map((c) => <span key={c.w} style={{ ["--x" as string]: c.x.toFixed(1), ["--y" as string]: c.y.toFixed(1), ["--t" as string]: c.t.toFixed(2), ["--dx" as string]: c.dx.toFixed(3), ["--dy" as string]: c.dy.toFixed(3), ["--h" as string]: c.hue }}>{c.w}</span>)}</div>
        <figure className="lg-quiet-card" aria-hidden><img src="/uploads/1/hooks/sites/g/ledger-edge.jpg" alt="" /></figure>
        <div className="lg-quiet-scrim" aria-hidden />
        <div className="lg-quiet-chap bs-w" style={aw(-0.2, 0.33)}><span className="lg-kick">The idea</span><h2>A bank that does<br /><em>less, on purpose.</em></h2><p>No points, no confetti, no notifications begging for your thumb.</p></div>
        <div className="lg-quiet-chap bs-w" style={aw(0.4, 0.66)}><span className="lg-kick">Taken away</span><h2>No points. No noise.<br /><em>No fees you did not agree to.</em></h2><p>One clean account and one honest card, in the metal.</p></div>
        <div className="lg-quiet-chap bs-w" style={aw(0.72, 1.3)}><span className="lg-kick">Left behind</span><h2>One number you can<br /><em>trust at a glance.</em></h2>
          <div className="lg-bal"><span>Available · pending and upcoming included</span><b><ActCount from={0} to={2418.6} dec={2} pre="£" comma a={0.74} b={0.93} /></b></div></div>
      </div>
    </section>
  );
}
function LedgerSite() {
  const g = "/uploads/1/hooks/sites/g/";
  return (
    <div className="vh-site l-ledger">
      {/* фон = уровень шума: космос → матовый чёрный, дальше только тишина */}
      <Atmosphere stops={[{ at: ".lg-hero", color: "#08090e" }, { at: ".lg-quiet", color: "#0a0c16", anchor: 0.2 }, { at: ".lg-quiet", color: "#050506", anchor: 0.8 }, { at: ".lg-cta", color: "#040405" }]} />
      <section className="lg-hero">
        {/* hero-видео несло карту «ASTRA FINTECH» — вместо него перегенерированный кадр без бренда, с медленным дрейфом */}
        <img className="lg-hero-vid lg-hero-still" src="/uploads/1/hooks/sites/ledger.jpg" alt="" />
        <div className="lg-hero-wash" />
        <header className="lg-head"><Link href="/visual-hooks/sites" className="lg-brand">LEDGER</Link><nav className="lg-nav"><a href="#" onClick={stop}>Account</a><a href="#" onClick={stop}>Card</a><a href="#" onClick={stop}>Invite</a></nav></header>
        <div className="lg-hero-copy"><span className="lg-eyebrow">Banking, quietly</span><h1>Money,<br />made <em>quiet.</em></h1><p>An account that tells you the truth and gets out of your way.</p></div>
      </section>

      <LedgerQuiet />

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

      <section className="lg-stats">
        <div className="lg-stats-row">
          {[["£0", "in monthly fees"], ["60 sec", "to open, from your phone"], ["24/7", "human support, no bots"]].map(([v, l]) => (<Reveal key={l} className="lg-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}
        </div>
        <Reveal className="lg-stats-note vh-rv--up"><span>Illustrative figures from the current beta.</span></Reveal>
      </section>

      <section className="lg-quote"><Reveal className="vh-rv--up"><blockquote>I opened it, moved my salary over, and then just forgot about it. That is the whole compliment.</blockquote><cite>Elin R., beta member</cite></Reveal></section>

      {/* «check it, then put it away»: телефон уходит в тёмный край экрана */}
      <section className="lg-cta"><i className="lg-cta-away" aria-hidden /><Reveal className="vh-rv--up"><h2>Ask for <em>an invite.</em></h2><p>We onboard in small waves, so support stays human.</p><a href="#" onClick={stop} className="lg-btn">Request an invite <i>↗</i></a></Reveal></section>

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
  | { t: "cinematicBand"; media: string; motif?: "none" | "halftone" | "grain"; chapters: { index?: string; title: React.ReactNode; body?: string; align?: "left" | "right" | "center"; media?: string }[] }
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
    case "bigNumber": return <section className="pb-bignum">{b.media && <div className="pb-bignum-media"><Reveal className="vh-rv--mask"><img loading="lazy" src={b.media} alt="" /></Reveal></div>}<Reveal className="pb-bignum-copy vh-rv--up"><CountUp value={b.value} /><span className="pb-bignum-l">{b.label}</span>{b.note && <em>{b.note}</em>}</Reveal></section>;
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
  // процесс в одном закреплённом плане: у главы может быть свой кадр — кадры сменяются кроссфейдом по главам
  const frames = b.chapters.map((c) => c.media ?? b.media);
  const multi = new Set(frames).size > 1;
  const motif = b.motif && b.motif !== "none" ? ` m-${b.motif}` : "";
  return (
    <div ref={ref} className="pb-cband" style={{ height: `${130 + n * 45}vh` } as React.CSSProperties}>
      <div className="pb-cband-sticky">
        {multi ? (
          frames.map((src, i) => (
            <div key={i} className={`pb-cband-media pb-cband-frame${i === 0 ? " is-first" : ""}${i === n - 1 ? " is-last" : ""}${motif}`} style={{ ["--c" as string]: ((i + 0.5) / n).toFixed(3), ["--n" as string]: n } as React.CSSProperties}><img src={src} alt="" /></div>
          ))
        ) : (
          <div className={`pb-cband-media${motif}`}><img src={b.media} alt="" /></div>
        )}
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
// цифра как функция скролла: считает от нуля до значения, пока блок проходит экран (одометр)
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const m = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
  useEffect(() => {
    const el = ref.current; if (!el || !m) return;
    const target = parseFloat(m[2].replace(/,/g, ""));
    const dec = (m[2].split(".")[1] || "").length;
    const comma = m[2].includes(",");
    const fmt = (v: number) => { const s = v.toFixed(dec); return comma ? Number(s).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : s; };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = m[1] + m[2] + m[3]; return; }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const k = Math.max(0, Math.min(1, (vh * 0.95 - r.top) / (vh * 0.55)));
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = m[1] + fmt(target * e) + m[3];
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <b className="pb-bignum-v" ref={ref}>{value}</b>;
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
    { t: "idea", kick: "The rule", title: <>A gym for the training,<br /><em>not the photo.</em></>, body: "Real weight, honest coaching, and a room we cap on purpose so the bar is always free and nobody is performing for a phone." },
    { t: "cinematicBand", media: `${g}iron-rack.jpg`, motif: "none", chapters: [
      { index: "05:00", title: <>The room,<br />before anyone.</>, body: "The lights come up on one rack. Nobody here is filming.", align: "left", media: `${g}iron-rack.jpg` },
      { index: "05:20", title: <>Chalk,<br />then grip.</>, body: "A coach at your shoulder, watching the bar path, not the clock.", align: "right", media: `${g}iron-chalk.jpg` },
      { index: "05:40", title: <>Just the bar<br />and your breath.</>, body: "No mirror to check, no playlist to hide under.", align: "left", media: `${g}iron-lift.jpg` },
    ] },
    { t: "bigNumber", value: "40", label: <>members, capped — the bar is always free</>, media: "/uploads/1/hooks/sites/iron.jpg", note: "When the room is full, the list opens. Nobody queues for a rack." },
    { t: "split", img: `${g}iron-chalk.jpg`, rev: true, title: <>Coached,<br /><em>every session.</em></>, list: [{ b: "Two coaches, always in", s: "Someone who knows your numbers is on the floor." }, { b: "Open five till ten", s: "Every day, including the ones you'd rather skip." }, { b: "Real weight only", s: "Bars, plates and chalk. No machines to hide behind." }] },
    { t: "quote", text: "I came to get strong, not to be seen. First gym that let me.", cite: "Marcus D., two years in" },
    { t: "cta", title: <>Come <em>lift.</em></>, body: "A trial week, then a place we hold as long as you use it.", label: "Start a trial" },
  ] },
  botanic: { slug: "botanic", theme: "botanic", brand: "BOTANIC", nav: ["The gin", "Distillery", "Buy"], tagline: "Small-batch botanical gin.", legal: "Botanic Distillery", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "Small-batch gin", title: <>Gin with<br /><em>a garden in it.</em></>, sub: "Distilled in small copper runs, from botanicals we can name.", strip: ["/uploads/1/hooks/sites/botanic.jpg", "/uploads/1/hooks/sites/g/botanic-bots.jpg", "/uploads/1/hooks/sites/g/botanic-serve.jpg", "/uploads/1/hooks/sites/g/botanic-still.jpg", "/uploads/1/hooks/sites/botanic.jpg"] }, blocks: [
    { t: "stats", items: [["12", "botanicals, named"], ["300", "bottles a batch"], ["43%", "the way it should be"]], note: "Figures from the current release." },
    { t: "cinematicBand", media: `${g}botanic-bots.jpg`, motif: "none", chapters: [
      { index: "Gathered", title: <>What’s in it,<br />by name.</>, body: "Juniper from two valleys over, citrus peeled that morning, something wild.", align: "left", media: `${g}botanic-bots.jpg` },
      { index: "Distilled", title: <>One small<br />copper still.</>, body: "A few hundred bottles a run, cut by taste.", align: "right", media: `${g}botanic-still.jpg` },
      { index: "Poured", title: <>Long,<br />over ice.</>, body: "Bright and green while it is young.", align: "left", media: `${g}botanic-serve.jpg` },
    ] },
    { t: "idea", kick: "Of one place", title: <>Gin that tastes<br /><em>of somewhere.</em></>, body: "Twelve botanicals, redistilled in batches small enough to taste every one. Bright, green, and unmistakably from one place." },
    { t: "cta", title: <>Pour <em>a measure.</em></>, body: "A tasting set of three expressions, with the botanicals to nose alongside.", label: "Order a tasting" },
  ] },
  nib: { slug: "nib", theme: "nib", brand: "NIB", nav: ["Pens", "Ink", "Visit"], tagline: "Fountain pens, ink and paper.", legal: "Nib & Co.", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", eyebrow: "Analogue writing", title: <>Words deserve<br />a good tool.</>, sub: "Fountain pens, real ink, and paper worth the fuss — the slow instruments a screen can't replace.", object: "/uploads/1/hooks/sites/nib.jpg", labels: ["Nib", "Ink", "Paper", "Hand"] }, blocks: [
    { t: "cine", mode: "silk", palette: ["#0a0c12", "#22345e", "#6f9fd8"], title: <>Slow down.<br /><em>Write it by hand.</em></> },
    { t: "cinematicBand", media: `${g}nib-inks.jpg`, motif: "none", chapters: [
      { index: "Ink", title: <>Choose<br />the colour.</>, body: "Inks with depth, shading and a little sheen.", align: "left", media: `${g}nib-inks.jpg` },
      { index: "Paper", title: <>Meet<br />the page.</>, body: "No feathering, no bleed — a surface worth dragging a nib across.", align: "right", media: `${g}nib-paper.jpg` },
      { index: "Hand", title: <>Then let<br />the line go.</>, body: "Laid down slowly, it dries and stays.", align: "left", media: `${g}nib-write.jpg` },
    ] },
    { t: "bigNumber", value: "3", label: <>pens on the counter — narrowed from a wall to your hand</>, media: "/uploads/1/hooks/sites/nib.jpg", note: "Fine or broad, wet or dry, matched to how you actually write." },
    { t: "idea", kick: "Nothing disposable", title: <>A short shelf<br /><em>of things that last.</em></>, body: "Pens that will outlive you, inks in colours worth naming, and the notebooks to spend them on. Serviced, refilled, handed on — never thrown away." },
    { t: "quote", text: "I came in for a birthday gift and left writing letters again. That is on them.", cite: "Priya S., regular" },
    { t: "cta", title: <>Find <em>your pen.</em></>, body: "Bring your handwriting and an hour. We do the narrowing.", label: "Find a pen" },
  ] },
  swell: { slug: "swell", theme: "swell", brand: "SWELL", nav: ["Boards", "The bay", "Order"], tagline: "Hand-shaped surfboards.", legal: "Swell Surf", typography: "fashion", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "Hand-shaped boards", title: <>The ocean keeps<br /><em>no schedule.</em></>, sub: "Boards shaped by hand for the waves you actually ride." }, blocks: [
    { t: "cinematicBand", media: `${g}swell-wave.jpg`, motif: "none", chapters: [
      { index: "The break", title: <>Read the water<br />first.</>, body: "We watch the break you surf before a blank is touched.", align: "left", media: `${g}swell-wave.jpg` },
      { index: "The blank", title: <>Planed down,<br />a curl at a time.</>, body: "Foam where you need float, thin where you need bite.", align: "right", media: `${g}swell-shape.jpg` },
      { index: "The rack", title: <>Glassed, dried,<br />and waiting.</>, body: "One board, ready for the bay.", align: "left", media: `${g}swell-rack.jpg` },
    ] },
    { t: "cine", mode: "caustics", palette: ["#03141a", "#0a5c6e", "#7fe0e0"], title: <>Made for<br /><em>the wave you get.</em></> },
    { t: "idea", kick: "No pop-outs", title: <>A board shaped<br /><em>to how you surf.</em></>, body: "No hype models. We watch how you ride, then shape to your break, your weight and your bad habits — built to be surfed for years, not hung on a wall." },
    { t: "split", img: `${g}swell-shape.jpg`, title: <>Shaped to<br /><em>your break.</em></>, list: [{ b: "Beach, point or reef", s: "The outline follows the wave, not a catalogue." }, { b: "Foiled to your weight", s: "Volume measured to you, not to a size chart." }, { b: "Glassed to last", s: "Built for years in the water, not a season." }] },
    { t: "quote", text: "First board that felt like it read the wave for me. I stopped fighting it by week two.", cite: "Kai M., ordered twice" },
    { t: "cta", title: <>Get <em>shaped.</em></>, body: "A conversation, a few weeks in the bay, and a board with your name in the stringer.", label: "Order a board" },
  ] },
  wick: { slug: "wick", theme: "wick", brand: "WICK", typography: "grotesk", hero: { archetype: "type-collision", object: "/uploads/1/hooks/sites/wick.jpg", eyebrow: "Poured by hand", title: <>SLOWBURN</>, sub: "Poured by hand, scented lightly, made to burn slow." }, nav: ["The range", "Refills", "Shop"], tagline: "Hand-poured candles.", legal: "Wick Studio", blocks: [
    { t: "diptych", primary: `${g}wick-lit.jpg`, secondary: `${g}wick-shelf.jpg`, index: "01", title: <>Light that smells<br /><em>like a memory.</em></>, body: "A little scent, or none — never a fragrance wall. Hand-poured, plainly kept.", overlap: "object" },
    { t: "cinematicBand", media: `${g}wick-pour.jpg`, motif: "none", chapters: [
      { index: "Day 1", title: <>Poured in<br />small batches.</>, body: "Clean wax, and a light hand with the scent.", align: "left", media: `${g}wick-pour.jpg` },
      { index: "Day 14", title: <>Left to cure<br />two weeks.</>, body: "So the scent settles and the burn stays even.", align: "right", media: `${g}wick-shelf.jpg` },
      { index: "Lit", title: <>Then it burns<br />to the base.</>, body: "An even pool to the last of the wax — no soot, no tunnel.", align: "left", media: `${g}wick-lit.jpg` },
    ] },
    { t: "idea", kick: "The point", title: <>No headache<br /><em>in a jar.</em></>, body: "Clean wax, restrained scent, and a wick trimmed by hand. A candle you notice, not one that takes over the room." },
    { t: "split", img: `${g}wick-pour.jpg`, rev: true, title: <>Keep the jar,<br /><em>we refill it.</em></>, list: [{ b: "Send the vessel back", s: "We clean it, wick it and pour it again." }, { b: "Scent you can live with", s: "Present in the room, gone from your headache." }, { b: "No black halo", s: "Clean wax leaves the glass clear to the last." }] },
    { t: "cta", title: <>Light <em>one.</em></>, body: "A trio to find your scent, then a refill service so the vessel stays.", label: "Shop the range" },
  ] },
  cask: { slug: "cask", theme: "cask", brand: "CASK", nav: ["Releases", "The warehouse", "List"], tagline: "Single-cask, cask-strength whisky.", legal: "Cask & Co.", typography: "fashion", hero: { archetype: "product-theatre", eyebrow: "Single-cask whisky", title: <>Whisky with<br /><em>a birthday.</em></>, sub: "One cask, bottled as it is, at the strength it earned.", object: "/uploads/1/hooks/sites/cask.jpg", depth: "/uploads/1/hooks/sites/g/cask-depth.jpg", proof: [["1", "cask, never blended"], ["cask", "strength, undiluted"], ["1 / 250", "bottles, numbered"]] }, blocks: [
    { t: "idea", kick: "One barrel", title: <>One barrel,<br /><em>bottled honestly.</em></>, body: "No blending to a house style, no colour added, no water unless you add it. Each release is one cask, and when it is gone it is gone." },
    { t: "cinematicBand", media: `${g}cask-barrels.jpg`, motif: "none", chapters: [
      { index: "Year 0", title: <>Laid down<br />in the dark.</>, body: "Rolled into the warehouse and forgotten on purpose.", align: "left", media: `${g}cask-barrels.jpg` },
      { index: "Year 12", title: <>Drawn from<br />one cask.</>, body: "Colour and weight from the oak, not from a lab.", align: "right", media: `${g}cask-pour.jpg` },
      { index: "Bottled", title: <>One cask.<br />Never again.</>, body: "When the last bottle goes, so does this whisky.", align: "center", media: `${g}cask-glass.jpg` },
    ] },
    { t: "bigNumber", value: "58.2%", label: <>ABV as it left the wood — cask strength, undiluted</>, media: "/uploads/1/hooks/sites/cask.jpg", note: "Every release carries its own figure on the label. This one asked for no water at all." },
    { t: "diptych", primary: `${g}cask-pour.jpg`, secondary: `${g}cask-glass.jpg`, index: "1/250", title: <>Numbered<br /><em>by hand.</em></>, body: "Two hundred and fifty bottles from a single cask, each one signed and counted. What you pour is exactly what slept in the wood.", overlap: "object" },
    { t: "quote", text: "Bought a bottle on a whim. There will never be another exactly like it, and that is the point.", cite: "Hamish G., on the list" },
    { t: "cta", title: <>Claim <em>a bottle.</em></>, body: "New single-cask releases a few times a year, to a short list first.", label: "Join the list" },
  ] },
  clay: { slug: "clay", theme: "clay", brand: "CLAY", nav: ["The batch", "Studio", "Shop"], tagline: "Wheel-thrown tableware.", legal: "Clay Studio", typography: "editorial", hero: { archetype: "hard-split", index: "STUDIO", mediaSide: "left", eyebrow: "Wheel-thrown, one at a time", title: <>Made to be<br /><em>used up.</em></>, sub: "Thrown by hand, fired once, and sold exactly as it came out." }, blocks: [
    { t: "cinematicBand", media: `${g}clay-wheel.jpg`, motif: "none", chapters: [
      { index: "Centre", title: <>A lump<br />on the wheel.</>, body: "Centred by feel before anything can rise.", align: "left", media: `${g}clay-wheel.jpg` },
      { index: "Pull", title: <>One pair<br />of hands.</>, body: "Walls pulled up slowly — never quite the same twice.", align: "right", media: `${g}clay-hands.jpg` },
      { index: "Fire", title: <>Out of<br />the kiln.</>, body: "Fired once, with the small marks left in, because a hand made it.", align: "left", media: `${g}clay-shelf.jpg` },
    ] },
    { t: "steps", head: <>How to <em>live with it.</em></>, items: [{ h: "Eat off it", p: "Every day, not just when guests come." }, { h: "Wash it", p: "Food-safe glazes, happy in a dishwasher." }, { h: "Chip it, keep it", p: "A mark on a bowl is a meal it was there for." }] },
    { t: "gallery", head: <>The current <em>batch.</em></>, items: [{ img: `${g}clay-shelf.jpg`, cap: "Fresh from the kiln." }, { img: `${g}clay-hands.jpg`, cap: "Every piece, by hand." }] },
    { t: "cta", title: <>The next batch is <em>out of the kiln.</em></>, body: "A few dozen pieces, photographed as they are, first come first served.", label: "See the batch" },
  ] },
  stride: { slug: "stride", theme: "stride", brand: "STRIDE", nav: ["The shoe", "Fitting", "Buy"], tagline: "One carefully tuned running shoe.", legal: "Stride Running", typography: "signal", hero: { archetype: "index-stage", eyebrow: "One shoe, done well", title: <>Built for<br />the long run.</>, items: [{ label: "The shoe", meta: "one, refined", img: "/uploads/1/hooks/sites/g/stride-detail.jpg" }, { label: "The road", meta: "1,000 km", img: "/uploads/1/hooks/sites/g/stride-road.jpg" }, { label: "The run", meta: "tuned at dawn", img: "/uploads/1/hooks/sites/g/stride-run.jpg" }, { label: "The fit", meta: "one free resole", img: "/uploads/1/hooks/sites/stride.jpg" }] }, blocks: [
    { t: "bigNumber", value: "1,000km", label: <>before you feel it go</>, media: "/uploads/1/hooks/sites/stride.jpg", note: "One shoe, refined each year instead of replaced." },
    { t: "cinematicBand", media: `${g}stride-run.jpg`, motif: "none", chapters: [
      { index: "Km 0", title: <>Tuned on<br />real roads.</>, body: "Tested at dawn by people who run further than they market.", align: "left", media: `${g}stride-run.jpg` },
      { index: "Km 500", title: <>The same ride<br />on day three hundred.</>, body: "No colourway churn, no gimmick foam.", align: "right", media: `${g}stride-road.jpg` },
      { index: "Km 1,000", title: <>Then a new sole,<br />on us.</>, body: "The upper has another life in it.", align: "left", media: `${g}stride-detail.jpg` },
    ] },
    { t: "split", img: `${g}stride-run.jpg`, rev: true, title: <>Every part<br /><em>earns its place.</em></>, list: [{ b: "Foam that holds its shape", s: "Not the softest for a week — the steadiest for a year." }, { b: "A knit that dries and holds", s: "Locks the foot without cooking it." }, { b: "Resoleable, on purpose", s: "The upper outlives the sole, so we replace the sole." }] },
    { t: "cta", title: <>Find <em>your fit.</em></>, body: "A gait check, a size, and a shoe that will still be here next year.", label: "Get fitted" },
  ] },
  plat: { slug: "plat", theme: "plat", brand: "PLAT", nav: ["The room", "An evening", "Book"], tagline: "A twelve-seat tasting kitchen.", legal: "Plat Kitchen", typography: "fashion", hero: { archetype: "edge-arrival", edge: "right", eyebrow: "A twelve-seat kitchen", title: <>A dinner worth<br /><em>the drive.</em></>, sub: "Twelve seats, one sitting, and no menu to choose from.", proof: ["12", "seats · one sitting"] }, blocks: [
    { t: "cinematicBand", media: `${g}plat-room.jpg`, motif: "none", chapters: [
      { index: "19:00", title: <>Twelve chairs,<br />one long table.</>, body: "A glass already poured before you sit.", align: "left", media: `${g}plat-room.jpg` },
      { index: "21:00", title: <>Finished<br />at the pass.</>, body: "A dozen small courses, paced by the kitchen.", align: "right", media: `${g}plat-chef.jpg` },
      { index: "23:30", title: <>The last plate<br />lands.</>, body: "Explained as it arrives. Nobody turns the table.", align: "left", media: `${g}plat-dish.jpg` },
    ] },
    { t: "quote", text: "No menu, no choices, no idea what was coming. Best meal of the year by a mile.", cite: "Sofia L., booked again" },
    { t: "idea", kick: "No menu", title: <>One long meal,<br /><em>cooked for the room.</em></>, body: "We cook what the morning market gave us, one sitting at a time. There is nothing to choose and nothing to miss." },
    { t: "gallery", head: <>Plated <em>to the second.</em></>, items: [{ img: `${g}plat-dish.jpg`, cap: "One of the dozen." }, { img: `${g}plat-chef.jpg`, cap: "At the pass." }] },
    { t: "cta", title: <>Take one of the <em>twelve seats.</em></>, body: "Bookings open on the first of the month and go within the hour.", label: "Join the list" },
  ] },
  fetch: { slug: "fetch", theme: "fetch", brand: "FETCH", nav: ["The box", "What's inside", "Start"], tagline: "A considered box for one specific dog.", legal: "Fetch Pet", typography: "grotesk", hero: { archetype: "product-theatre", eyebrow: "For one specific dog", title: <>Everything your dog<br /><em>would order.</em></>, sub: "A monthly box packed to your dog, not the average of all dogs.", object: "/uploads/1/hooks/sites/fetch.jpg", depth: "/uploads/1/hooks/sites/g/fetch-depth.jpg", proof: [["4", "questions, one box"], ["monthly", "before the bag runs out"], ["1 dog", "not the average"]] }, blocks: [
    { t: "cinematicBand", media: `${g}fetch-portrait.jpg`, motif: "none", chapters: [
      { index: "Q 1–4", title: <>Tell us about<br />one dog.</>, body: "Breed, age, belly and habits — ninety seconds.", align: "left", media: `${g}fetch-portrait.jpg` },
      { index: "Packed", title: <>Built to<br />that answer.</>, body: "Vet-checked food and chews, honestly sourced, no plastic filler.", align: "right", media: `${g}fetch-bowl.jpg` },
      { index: "Monthly", title: <>On the mat,<br />right on time.</>, body: "Timed to their appetite, so the bowl is never empty.", align: "left", media: `${g}fetch-play.jpg` },
    ] },
    { t: "idea", kick: "One dog", title: <>A box packed<br /><em>to one dog.</em></>, body: "Tell us the breed, the age, the belly and the habits. We pack food, chews and gear for that dog and post it before the bag runs out. No guesswork." },
    { t: "split", img: `${g}fetch-bowl.jpg`, rev: true, title: <>What lands<br /><em>on the mat.</em></>, list: [{ b: "Food, honestly sourced", s: "Real ingredients, matched to their belly." }, { b: "Chews sized to the jaw", s: "Not to the average dog." }, { b: "Gear that survives them", s: "Tested by the ones who destroy everything." }] },
    { t: "cta", title: <>Build <em>their box.</em></>, body: "Answer four questions. We do the rest, every month.", label: "Build a box" },
  ] },
  stem: { slug: "stem", theme: "stem", brand: "STEM", nav: ["The idea", "Our work", "Send"], tagline: "Considered floristry, made to say something.", legal: "Stem Floral", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "Flowers, with intent", title: <>Flowers that say<br /><em>the hard things.</em></>, sub: "Considered arrangements for the moments words keep falling short of.", strip: ["/uploads/1/hooks/sites/stem.jpg", "/uploads/1/hooks/sites/g/stem-arrange.jpg", "/uploads/1/hooks/sites/g/stem-bouquet.jpg", "/uploads/1/hooks/sites/g/stem-shop.jpg", "/uploads/1/hooks/sites/stem.jpg"] }, blocks: [
    { t: "idea", kick: "Never by the dozen", title: <>Not a catalogue,<br /><em>a translation.</em></>, body: "Tell us the person and the occasion, and we arrange something that means exactly that — never pulled from a shelf, never the same twice." },
    { t: "cinematicBand", media: `${g}stem-arrange.jpg`, motif: "none", chapters: [
      { index: "01 · The person", title: <>You tell us<br />who it’s for.</>, body: "Not the budget — who they are and what just happened.", align: "left", media: `${g}stem-arrange.jpg` },
      { index: "02 · The stems", title: <>We say it<br />in flowers.</>, body: "One florist, one table, whatever the season is giving.", align: "right", media: `${g}stem-bouquet.jpg` },
      { index: "03 · The doorstep", title: <>Wrapped<br />and sent today.</>, body: "Ordered by noon, on the table by evening.", align: "left", media: `${g}stem-shop.jpg` },
    ] },
    { t: "quote", text: "I said 'she's leaving a job she loved and is terrified.' What arrived said exactly that. I don't know how.", cite: "Marcus T., sent again" },
    { t: "cta", title: <>Say it with <em>stems.</em></>, body: "Same-day in the city, considered and never from a catalogue.", label: "Send flowers" },
  ] },
  thread: { slug: "thread", theme: "thread", brand: "THREAD", nav: ["The cloth", "The fitting", "Book"], tagline: "Made-to-measure tailoring.", legal: "Thread Tailors", typography: "grotesk", hero: { archetype: "hard-split", index: "01 / MTM", eyebrow: "Made to measure", title: <>A SUIT<br />THAT<br /><em>remembers<br />you.</em></>, sub: "One cloth, one fitting, and a pattern we keep on file for life.", mediaSide: "right" }, blocks: [
    { t: "cinematicBand", media: `${g}thread-cloth.jpg`, motif: "grain", chapters: [
      { index: "The cloth", title: <>It starts with<br />one length.</>, body: "English and Italian wools, chosen by weight and season.", align: "left", media: `${g}thread-cloth.jpg` },
      { index: "The fitting", title: <>Measured,<br />not guessed.</>, body: "Chalk, pins and a tape read your posture, not just your chest.", align: "right", media: `${g}thread-fitting.jpg` },
      { index: "The finish", title: <>Stitched where<br />it counts.</>, body: "By hand, and the pattern kept on file.", align: "left", media: `${g}thread-detail.jpg` },
    ] },
    { t: "bigNumber", value: "∞", label: <>repairs, for as long as you own the suit</>, media: "/uploads/1/hooks/sites/thread.jpg", note: "Wear it hard, bring it back. A made-to-measure suit is a relationship, not a purchase." },
    { t: "gallery", head: <>In the <em>details.</em></>, items: [{ img: `${g}thread-detail.jpg`, cap: "Finished by hand." }, { img: `${g}thread-cloth.jpg`, cap: "The cloth you chose." }] },
    { t: "idea", kick: "On file", title: <>A second suit<br /><em>is a phone call.</em></>, body: "You choose one cloth. We cut it to your exact measure and keep the pattern, so the next one starts where this one finished." },
    { t: "cta", title: <>Start with <em>a fitting.</em></>, body: "An hour, a tape measure, and a cloth you will still love in ten years.", label: "Book a fitting" },
  ] },
  barb: { slug: "barb", theme: "barb", brand: "BARB", nav: ["The chair", "An hour", "Book"], tagline: "A one-chair barbershop.", legal: "Barb & Co.", typography: "signal", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "One chair, no rush", title: <>A proper cut<br /><em>takes its time.</em></>, sub: "One chair, one barber, and a hot towel at the end." }, blocks: [
    { t: "cinematicBand", media: `${g}barb-chair.jpg`, motif: "none", chapters: [
      { index: "10:00", title: <>The chair<br />by the window.</>, body: "Morning light, one seat, and nobody waiting behind you.", align: "left", media: `${g}barb-chair.jpg` },
      { index: "10:30", title: <>Scissor<br />over comb.</>, body: "Slower, sharper, and kinder to how it grows.", align: "right", media: `${g}barb-cut.jpg` },
      { index: "11:00", title: <>A hot towel<br />to finish.</>, body: "Because the end of it should feel like something.", align: "left", media: `${g}barb-towel.jpg` },
    ] },
    { t: "split", img: `${g}barb-cut.jpg`, rev: true, title: <>Cut to grow<br /><em>out well.</em></>, list: [{ b: "The hour is yours", s: "We book one head at a time, never two." }, { b: "Conversation optional", s: "Talk, or don't. The cut's the same." }, { b: "Still right in four weeks", s: "Shaped for how it grows, not just for today." }] },
    { t: "idea", kick: "No next-please", title: <>One chair,<br /><em>and all of the hour.</em></>, body: "No queue, no clippers on a conveyor belt. You get the chair, the hour, and a cut that grows out as well as it goes on." },
    { t: "bigNumber", value: "60", label: <>minutes in the chair, start to towel</>, media: "/uploads/1/hooks/sites/barb.jpg", note: "Nothing booked after you, so nothing gets rushed." },
    { t: "cta", title: <>Sit in <em>the chair.</em></>, body: "Standing appointments for regulars, a short waitlist for everyone else.", label: "Book the chair" },
  ] },
  steep: { slug: "steep", theme: "steep", brand: "STEEP", nav: ["The leaf", "The garden", "Taste"], tagline: "Whole-leaf tea from named gardens.", legal: "Steep Tea", typography: "fashion", hero: { archetype: "regime-shift", index: "N° 01 / 04", eyebrow: "Whole-leaf tea", title: <>Tea, given<br /><em>its time.</em></>, sub: "Whole leaf from named gardens, timed to the second and poured slowly.", object: "/uploads/1/hooks/sites/steep.jpg", labels: ["Leaf", "Water", "Minutes", "Garden"] }, blocks: [
    { t: "cinematicBand", media: `${g}steep-garden.jpg`, motif: "none", chapters: [
      { index: "Garden", title: <>It begins on<br />a hillside.</>, body: "Terraced gardens, picked by hand at altitude.", align: "left", media: `${g}steep-garden.jpg` },
      { index: "1:30", title: <>The leaf<br />unfurls.</>, body: "Whole leaf opens in the pot — that is what whole means.", align: "right", media: `${g}steep-leaf.jpg` },
      { index: "3:00", title: <>Poured<br />when it’s ready.</>, body: "The heat and the minutes, printed on the tin.", align: "left", media: `${g}steep-pour.jpg` },
    ] },
    { t: "bigNumber", value: "4", label: <>named gardens — single-origin, dated by harvest</>, media: "/uploads/1/hooks/sites/steep.jpg", note: "Each tin names its garden and its year." },
    { t: "idea", kick: "Whole leaf", title: <>Not dust<br /><em>in a hurry.</em></>, body: "Bagged tea is broken leaf brewed in ninety seconds of impatience. Ours is whole leaf from gardens we can name, with the water temperature and the minutes it actually asks for printed on every tin." },
    { t: "cta", title: <>Find <em>your leaf.</em></>, body: "A short flight of samples, chosen to how you take your morning.", label: "Start tasting" },
  ] },
  loaf: { slug: "loaf", theme: "loaf", brand: "LOAF", nav: ["The bake", "The crumb", "Reserve"], tagline: "Wood-fired sourdough, baked daily.", legal: "Loaf Bakery", typography: "grotesk", hero: { archetype: "type-collision", eyebrow: "Wild yeast, wood fire", title: <>SOURDOUGH</>, sub: "Wild yeast, a long slow proof, and a wood fire at dawn.", object: "/uploads/1/hooks/sites/loaf.jpg" }, blocks: [
    { t: "idea", kick: "Before the plastic", title: <>The way bread was,<br /><em>and still should be.</em></>, body: "We bake a few hundred loaves a day and stop when they're gone. Wild yeast, a proof that takes the night, and a wood fire at dawn." },
    { t: "cinematicBand", media: `${g}loaf-oven.jpg`, motif: "none", chapters: [
      { index: "04:30", title: <>The fire<br />is lit.</>, body: "Wood, not gas — hot enough to blister a crust.", align: "left", media: `${g}loaf-oven.jpg` },
      { index: "06:00", title: <>Out,<br />and cooling.</>, body: "Racked by the window while the street wakes up.", align: "right", media: `${g}loaf-shelf.jpg` },
      { index: "07:00", title: <>Read it<br />by the crumb.</>, body: "Open and airy — the mark of a long, patient proof.", align: "left", media: `${g}loaf-crumb.jpg` },
    ] },
    { t: "bigNumber", value: "3", label: <>ingredients — flour, water, salt. And time.</>, media: "/uploads/1/hooks/sites/loaf.jpg", note: "Nothing you can buy wrapped, and gone by the afternoon." },
    { t: "quote", text: "I set an alarm for a loaf of bread now. Worth every minute of lost sleep.", cite: "Elena K., every Saturday" },
    { t: "cta", title: <>Reserve <em>tomorrow's loaf.</em></>, body: "Order the night before, collect it while it is still warm.", label: "Reserve a loaf" },
  ] },
  velo: { slug: "velo", theme: "velo", brand: "VÉLO", nav: ["The frame", "The build", "Start"], tagline: "Made-to-measure steel bicycles.", legal: "Vélo Cycles", typography: "signal", hero: { archetype: "index-stage", eyebrow: "Made-to-measure steel", title: <>One bike,<br />built around you.</>, items: [{ label: "The frame", meta: "steel, brazed", img: "/uploads/1/hooks/sites/g/velo-frame.jpg" }, { label: "The build", meta: "≈ 4 months", img: "/uploads/1/hooks/sites/g/velo-braze.jpg" }, { label: "The ride", meta: "30 years", img: "/uploads/1/hooks/sites/g/velo-ride.jpg" }, { label: "The fit", meta: "your geometry", img: "/uploads/1/hooks/sites/velo.jpg" }] }, blocks: [
    { t: "idea", kick: "Your geometry", title: <>Measured to your body,<br /><em>not a size chart.</em></>, body: "We take your fit, your roads and your ambitions, then cut and braze a steel frame around them. No stock sizes, no carbon that cracks in five years." },
    { t: "cinematicBand", media: `${g}velo-braze.jpg`, motif: "none", chapters: [
      { index: "Week 3", title: <>Brass drawn<br />into the joint.</>, body: "Lug by lug, by heat and patience, by one pair of hands.", align: "left", media: `${g}velo-braze.jpg` },
      { index: "Month 4", title: <>A frame<br />in your numbers.</>, body: "Raw steel on the bench, every tube cut to your fit.", align: "right", media: `${g}velo-frame.jpg` },
      { index: "Year 1 → 30", title: <>Then the road,<br />for decades.</>, body: "Steel bends before it breaks, and can always be brought back.", align: "left", media: `${g}velo-ride.jpg` },
    ] },
    { t: "bigNumber", value: "30yr", label: <>and still yours — steel outlives the trend</>, media: "/uploads/1/hooks/sites/velo.jpg", note: "The person who measures you is the person who builds it." },
    { t: "split", img: `${g}velo-ride.jpg`, rev: true, title: <>A ride that<br /><em>softens the road.</em></>, list: [{ b: "Brazed, not glued", s: "Joints you can reheat and repair." }, { b: "Repairable forever", s: "Dents, crashes, new standards — steel takes the fix." }, { b: "Built to be kept", s: "The reason people never sell them." }] },
    { t: "cta", title: <>Start a <em>build.</em></>, body: "A fitting, a conversation, and a wait of about four months for a bike that lasts a lifetime.", label: "Book a fitting" },
  ] },
  balm: { slug: "balm", theme: "balm", brand: "BALM", nav: ["The room", "The hour", "Book"], tagline: "A single-room day spa.", legal: "Balm Spa", typography: "fashion", hero: { archetype: "edge-arrival", edge: "left", eyebrow: "An hour, for you", title: <>An hour that<br /><em>undoes the week.</em></>, sub: "Steam, stone and silence, in hands that know the way.", proof: ["1", "room · one guest"] }, blocks: [
    { t: "cine", mode: "silk", palette: ["#0a0810", "#3a2a4a", "#d0a8c0"], title: <>Nothing to do<br /><em>but breathe.</em></> },
    { t: "cinematicBand", media: `${g}balm-room.jpg`, motif: "none", chapters: [
      { index: "Minute 0", title: <>The door<br />closes.</>, body: "One room, warm and low-lit, and nobody else in it.", align: "left", media: `${g}balm-room.jpg` },
      { index: "Minute 20", title: <>Heat that<br />reaches deep.</>, body: "Hot stone and steam loosen what the week tightened.", align: "right", media: `${g}balm-stones.jpg` },
      { index: "Minute 45", title: <>Unhurried<br />hands.</>, body: "One therapist, trained. No small talk unless you start it.", align: "left", media: `${g}balm-hands.jpg` },
    ] },
    { t: "idea", kick: "Nothing extra", title: <>No upsells,<br /><em>no playlist you didn't choose.</em></>, body: "One guest at a time, no package to buy up into, no clock you can feel ticking. Just an hour built, quietly, to put you back together." },
    { t: "bigNumber", value: "60", label: <>minutes — and not one of them shared</>, media: "/uploads/1/hooks/sites/balm.jpg", note: "The clock stays out of the room. We tell you when it's over." },
    { t: "cta", title: <>Book <em>the hour.</em></>, body: "Mornings are quietest. We keep a few late slots for the truly wrung out.", label: "Book an hour" },
  ] },
  fern: { slug: "fern", theme: "fern", brand: "FERN", nav: ["The idea", "The plants", "Match"], tagline: "The right plant for your light.", legal: "Fern & Light", typography: "editorial", hero: { archetype: "product-theatre", eyebrow: "Plants, placed well", title: <>Plants that make<br /><em>a room breathe.</em></>, sub: "Chosen for your actual light, delivered already thriving.", object: "/uploads/1/hooks/sites/fern.jpg", depth: "/uploads/1/hooks/sites/g/fern-depth.jpg", proof: [["1", "photo of your room"], ["3", "plants that will live"], ["optional", "we keep them alive"]] }, blocks: [
    { t: "cinematicBand", media: `${g}fern-shelf.jpg`, motif: "none", chapters: [
      { index: "Morning", title: <>Send us<br />your window.</>, body: "A photo of the room, and the light it really gets.", align: "left", media: `${g}fern-shelf.jpg` },
      { index: "Noon", title: <>We match<br />three plants.</>, body: "Only ones that will genuinely live where you'll put them.", align: "right", media: `${g}fern-leaf.jpg` },
      { index: "Evening", title: <>They arrive<br />thriving.</>, body: "Potted, settled, and visited if you'd rather not guess.", align: "left", media: `${g}fern-room.jpg` },
    ] },
    { t: "split", img: `${g}fern-leaf.jpg`, rev: true, title: <>Chosen for the light,<br /><em>not the look.</em></>, list: [{ b: "North, south, or a lightwell", s: "We read the window before the catalogue." }, { b: "Grown on, not shipped raw", s: "Settled in its pot before it leaves us." }, { b: "Visits, if you like", s: "Watering, turning, repotting — so you never guess." }] },
    { t: "idea", kick: "Why they die", title: <>Bought for a photo,<br /><em>not a window.</em></>, body: "Most plants die because they were chosen for how they look, not for the light they would get. We start from your window and work backwards." },
    { t: "editorial", img: `${g}fern-room.jpg`, title: <>Quieter, softer,<br /><em>alive.</em></>, body: "The right green in the right corner changes a whole space, in a way furniture never does." },
    { t: "cta", title: <>Green <em>the room.</em></>, body: "Send us a photo of your space. We reply with three plants that will live.", label: "Get matched" },
  ] },
  cacao: { slug: "cacao", theme: "cacao", brand: "CACAO", nav: ["The bean", "The bar", "Taste"], tagline: "Single-origin bean-to-bar chocolate.", legal: "Cacao Bar", typography: "grotesk", hero: { archetype: "gallery-horizon", eyebrow: "Single-origin chocolate", title: <>Chocolate, read<br /><em>like wine.</em></>, sub: "One origin, one roast, and nothing hidden in the bar.", strip: ["/uploads/1/hooks/sites/cacao.jpg", "/uploads/1/hooks/sites/g/cacao-bar.jpg", "/uploads/1/hooks/sites/g/cacao-bean.jpg", "/uploads/1/hooks/sites/g/cacao-pour.jpg", "/uploads/1/hooks/sites/cacao.jpg"] }, blocks: [
    { t: "bigNumber", value: "2", label: <>ingredients — cacao and a little sugar</>, note: "No emulsifiers, no vanilla to paper over the origin." },
    { t: "cinematicBand", media: `${g}cacao-bean.jpg`, motif: "none", chapters: [
      { index: "Farm", title: <>Beans from<br />one farm.</>, body: "Fermented, dried, and roasted to this harvest alone.", align: "left", media: `${g}cacao-bean.jpg` },
      { index: "Temper", title: <>Ground,<br />then tempered.</>, body: "Worked by hand until it runs glossy and even.", align: "right", media: `${g}cacao-pour.jpg` },
      { index: "Bar", title: <>Poured thin,<br />dated on the wrapper.</>, body: "Because a 2024 does not taste like a 2023.", align: "left", media: `${g}cacao-bar.jpg` },
    ] },
    { t: "idea", kick: "Single origin", title: <>Not a blend engineered<br /><em>to taste the same forever.</em></>, body: "A single farm, a single roast, and a flavour that shifts with the harvest — so we print the farm, the batch and the year, because they are the whole point." },
    { t: "steps", head: <>How to <em>read a bar.</em></>, items: [{ h: "Look", p: "A deep, even gloss means the temper was handled right." }, { h: "Snap", p: "A clean crack, not a bend — it is ready." }, { h: "Melt", p: "Let it sit. The farm arrives in waves, the way a good wine does." }] },
    { t: "cta", title: <>Taste <em>the origin.</em></>, body: "A flight of four bars from four farms, with the notes to read them by.", label: "Order a flight" },
  ] },
  hide: { slug: "hide", theme: "hide", brand: "HIDE", nav: ["The idea", "The line", "Carry"], tagline: "Vegetable-tanned leather goods.", legal: "Hide & Grain", typography: "fashion", hero: { archetype: "hard-split", index: "01 / VG-TAN", mediaSide: "right", eyebrow: "Full-grain leather", title: <>Leather that<br /><em>earns its scars.</em></>, sub: "Cut from one hide, stitched to outlast the trend." }, blocks: [
    { t: "cinematicBand", media: `${g}hide-bench.jpg`, motif: "none", chapters: [
      { index: "The cut", title: <>Marked and cut<br />from one hide.</>, body: "Vegetable-tanned leather, laid out at one bench.", align: "left", media: `${g}hide-bench.jpg` },
      { index: "The seam", title: <>Two needles,<br />one seam.</>, body: "A saddle stitch holds even if the thread is cut.", align: "right", media: `${g}hide-stitch.jpg` },
      { index: "The years", title: <>Scuffed into<br />a patina.</>, body: "It darkens where your hand goes, and comes back to us for repair.", align: "left", media: `${g}hide-bag.jpg` },
    ] },
    { t: "bigNumber", value: "20yr", label: <>and better for the years — repaired, never replaced</>, media: "/uploads/1/hooks/sites/hide.jpg", note: "Send it back when it needs it; the person who made it signs the repair ticket." },
    { t: "idea", kick: "Not a season", title: <>One bag,<br /><em>carried for decades.</em></>, body: "Not a season's accessory — a single object built to look better the harder you use it, that ends up back on our bench instead of in the bin." },
    { t: "split", img: `${g}hide-bench.jpg`, title: <>Made at<br /><em>one bench.</em></>, list: [{ b: "Full-grain, veg-tanned", s: "Ages into a patina instead of cracking." }, { b: "Edged and burnished by hand", s: "No painted edges to peel in a year." }, { b: "A repair promise", s: "Send it back; we make it right, for life." }] },
    { t: "cta", title: <>Carry <em>one thing.</em></>, body: "A short line of bags, made to order, each with a repair promise.", label: "See the line" },
  ] },
  spice: { slug: "spice", theme: "spice", brand: "SPICE", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", object: "/uploads/1/hooks/sites/spice.jpg", labels: ["Whole", "Dated", "Ground fresh", "In season"], eyebrow: "Whole spice, dated", title: <>Spice bought<br /><em>like it matters.</em></>, sub: "Whole, recent, and ground the day you cook." }, nav: ["The idea", "The shelf", "Stock"], tagline: "Whole spices, freshly harvested.", legal: "Spice Merchant", blocks: [
    { t: "cinematicBand", media: `${g}spice-jars.jpg`, motif: "none", chapters: [
      { index: "In season", title: <>Bought<br />at harvest.</>, body: "A date on every tin, so you know exactly how fresh it is.", align: "left", media: `${g}spice-jars.jpg` },
      { index: "Whole", title: <>Kept whole<br />until you cook.</>, body: "The oils stay locked in the seed, the bark and the pod.", align: "right", media: `${g}spice-scoop.jpg` },
      { index: "Ground fresh", title: <>Cracked<br />the day you use it.</>, body: "And the kitchen smells of the thing itself.", align: "left", media: `${g}spice-grind.jpg` },
    ] },
    { t: "editorial", img: "/uploads/1/hooks/sites/spice.jpg", title: <>The colour<br /><em>of the real thing.</em></>, body: "Ground the day you cook, a spice still has its oils — and its colour. Pre-ground is a ghost of itself." },
    { t: "bigNumber", value: "10", label: <>tins on a starter shelf — the everyday ones</>, media: `${g}spice-jars.jpg`, note: "Refilled when the harvest turns, not when a warehouse clears out." },
    { t: "gallery", head: <>From tin <em>to mortar.</em></>, items: [{ img: `${g}spice-scoop.jpg`, cap: "Scooped, not sachet." }, { img: `${g}spice-grind.jpg`, cap: "Ground when you cook." }] },
    { t: "cta", title: <>Stock <em>the shelf.</em></>, body: "A starter set of the ten you actually reach for, whole and dated.", label: "Build a shelf" },
  ] },
  comb: { slug: "comb", theme: "comb", brand: "COMB", typography: "editorial", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "Raw single-hive honey", title: <>Honey with<br /><em>a postcode.</em></>, sub: "Raw, unblended, and different from every hive." }, nav: ["The idea", "The hive", "Taste"], tagline: "Raw honey, one hive at a time.", legal: "Comb Apiary", blocks: [
    { t: "cinematicBand", media: `${g}comb-drip.jpg`, motif: "none", chapters: [
      { index: "Raw", title: <>Never warmed,<br />never filtered.</>, body: "It runs the way it left the comb, aroma and all.", align: "right", media: `${g}comb-drip.jpg` },
      { index: "One hive", title: <>From one colony,<br />one site.</>, body: "Never pooled with anyone else's bees.", align: "left", media: `${g}comb-frame.jpg` },
      { index: "The jar", title: <>Jarred with<br />its address.</>, body: "One colony's summer, sealed as it came.", align: "left", media: `${g}comb-jar.jpg` },
    ] },
    { t: "idea", kick: "Nothing averaged", title: <>We don't blend<br /><em>the character out.</em></>, body: "Supermarket honey is warmed, filtered flat and blended to taste the same all year. We do none of that. Each jar is raw, from one colony, and tastes of the exact fields those bees actually flew." },
    { t: "split", img: `${g}comb-frame.jpg`, rev: true, title: <>One colony,<br /><em>one season.</em></>, list: [{ b: "One site, one jar", s: "The label names the field, not a country." }, { b: "Nothing warmed or filtered", s: "The pollen and the aroma survive the jar." }, { b: "A taste that moves", s: "Spring and late summer are different honeys." }] },
    { t: "gallery", head: <>Straight from <em>the comb.</em></>, items: [{ img: `${g}comb-jar.jpg`, cap: "Raw, with the comb." }, { img: `${g}comb-drip.jpg`, cap: "Slow and golden." }] },
    { t: "cta", title: <>Find <em>your hive.</em></>, body: "A trio from three sites, so you can taste what a mile does.", label: "Taste the trio" },
  ] },
  grove: { slug: "grove", theme: "grove", brand: "GROVE", typography: "editorial", hero: { archetype: "gallery-horizon", eyebrow: "New-harvest olive oil", title: <>Oil pressed<br /><em>the week it's picked.</em></>, sub: "One grove, one pressing, dated like it should be.", strip: ["/uploads/1/hooks/sites/grove.jpg", "/uploads/1/hooks/sites/g/grove-tree.jpg", "/uploads/1/hooks/sites/g/grove-bottle.jpg", "/uploads/1/hooks/sites/g/grove-pour.jpg", "/uploads/1/hooks/sites/grove.jpg"] }, nav: ["The idea", "The grove", "Order"], tagline: "Single-grove, new-harvest olive oil.", legal: "Grove Oil", blocks: [
    { t: "cinematicBand", media: `${g}grove-tree.jpg`, motif: "none", chapters: [
      { index: "Picked", title: <>Old trees,<br />one hillside.</>, body: "Harvested by hand in a single week.", align: "left", media: `${g}grove-tree.jpg` },
      { index: "Pressed", title: <>Milled within<br />hours.</>, body: "Green, peppery and sharp — it still tastes of the fruit.", align: "right", media: `${g}grove-pour.jpg` },
      { index: "Dated", title: <>A harvest date,<br />not a best-before.</>, body: "Sent young, the way it is meant to be tasted.", align: "left", media: `${g}grove-bottle.jpg` },
    ] },
    { t: "steps", head: <>How to keep it <em>green.</em></>, items: [{ h: "Open it", p: "The week it arrives — this is when it is at its best." }, { h: "Pour it raw", p: "On bread, beans, tomatoes, anything warm." }, { h: "Finish it", p: "Within a few months, then taste the next harvest." }] },
    { t: "idea", kick: "Fresh juice", title: <>Not a<br /><em>pantry fixture.</em></>, body: "Olive oil is at its best the week it is milled, then fades quietly for a year on a shelf. Ours is sent while it is still green, with the date to prove it." },
    { t: "cta", title: <>Taste <em>this year's.</em></>, body: "The new-harvest tin, shipped the week the mill runs.", label: "Order the harvest" },
  ] },
  pour: { slug: "pour", theme: "pour", brand: "POUR", typography: "signal", hero: { archetype: "product-theatre", object: "/uploads/1/hooks/sites/pour.jpg", depth: "/uploads/1/hooks/sites/g/pour-depth.jpg", proof: [["12", "drinks, not forty"], ["stirred", "not rushed"], ["off-menu", "if you trust the bar"]], eyebrow: "A drinks list", title: <>A short list,<br /><em>poured properly.</em></>, sub: "Twelve drinks, no menu of forty, and every one made right." }, nav: ["The idea", "The bar", "Visit"], tagline: "A short-list cocktail bar.", legal: "Pour Bar", blocks: [
    { t: "cinematicBand", media: `${g}pour-make.jpg`, motif: "none", chapters: [
      { index: "Stir", title: <>Forty turns<br />of the spoon.</>, body: "Dilution judged by feel, and by the clock.", align: "left", media: `${g}pour-make.jpg` },
      { index: "Strain", title: <>Into<br />the right glass.</>, body: "Chilled, garnished, set down without a speech.", align: "right", media: `${g}pour-glass.jpg` },
      { index: "Stay", title: <>Then the room<br />goes quiet.</>, body: "Low light, twelve drinks, and nobody rushing the next.", align: "left", media: `${g}pour-bar.jpg` },
    ] },
    { t: "idea", kick: "Twelve, not forty", title: <>A dozen things<br /><em>done perfectly.</em></>, body: "A menu of forty cocktails is forty compromises. We pour twelve, we pour them right, and we change them when the season turns." },
    { t: "diptych", primary: `${g}pour-glass.jpg`, secondary: "/uploads/1/hooks/sites/pour.jpg", index: "12", title: <>Made by<br /><em>the person who wrote it.</em></>, body: "Tell the bartender a spirit and a mood. Off-menu, if you trust the bar.", overlap: "object" },
    { t: "cta", title: <>Pull up <em>a stool.</em></>, body: "Walk-ins at the bar, a small book for the back room.", label: "Find the bar" },
  ] },
  curd: { slug: "curd", theme: "curd", brand: "CURD", typography: "grotesk", hero: { archetype: "hard-split", index: "01 / RAW-MILK", mediaSide: "right", eyebrow: "A cheesemonger", title: <>CHEESE<br />WITH<br /><em>a season.</em></>, sub: "Cut to order, ripe today, and never from a factory." }, nav: ["The idea", "The cave", "Order"], tagline: "A small-maker cheesemonger.", legal: "Curd & Cave", blocks: [
    { t: "diptych", primary: `${g}curd-board.jpg`, secondary: `${g}curd-wheel.jpg`, index: "01", title: <>Ripe on the day<br /><em>you eat it.</em></>, body: "Not the day it was packed. Small-maker cheese, finished in our cave and cut when you want it.", overlap: "object" },
    { t: "cinematicBand", media: `${g}curd-cave.jpg`, motif: "none", chapters: [
      { index: "Spring", title: <>Into<br />the cave.</>, body: "Cool, damp and patient; every wheel turned by hand.", align: "left", media: `${g}curd-cave.jpg` },
      { index: "Autumn", title: <>Cut when<br />it’s ready.</>, body: "Not when a date on a label says so.", align: "right", media: `${g}curd-wheel.jpg` },
      { index: "Today", title: <>Onto<br />your board.</>, body: "Built for whoever’s eating, cut that morning.", align: "left", media: `${g}curd-board.jpg` },
    ] },
    { t: "split", img: `${g}curd-cave.jpg`, rev: true, title: <>Small makers,<br /><em>named.</em></>, list: [{ b: "Farmhouse and artisan", s: "Never factory, never picked to survive a lorry." }, { b: "Finished by us", s: "In our cave, to the day you need it." }, { b: "Built to your table", s: "Tell us the crowd; we build the board." }] },
    { t: "cta", title: <>Build <em>a board.</em></>, body: "A conversation about who is eating, then a box that is perfectly ripe on the day.", label: "Order a board" },
  ] },
  lens: { slug: "lens", theme: "lens", brand: "LENS", typography: "editorial", hero: { archetype: "index-stage", eyebrow: "Portraits, on film", title: <>Portraits that<br />hold still.</>, items: [{ label: "The sitting", meta: "one hour, one roll", img: "/uploads/1/hooks/sites/g/lens-portrait.jpg" }, { label: "The film", meta: "a few frames", img: "/uploads/1/hooks/sites/g/lens-camera.jpg" }, { label: "The darkroom", meta: "developed by hand", img: "/uploads/1/hooks/sites/g/lens-contact.jpg" }, { label: "The print", meta: "not a download", img: "/uploads/1/hooks/sites/lens.jpg" }] }, nav: ["The idea", "The work", "Sit"], tagline: "Film portraiture, printed by hand.", legal: "Lens Studio", blocks: [
    { t: "cinematicBand", media: `${g}lens-camera.jpg`, motif: "grain", chapters: [
      { index: "02 · The film", title: <>One roll,<br />a few frames.</>, body: "No burst to pick from — a handful of careful exposures.", align: "left", media: `${g}lens-camera.jpg` },
      { index: "03 · The darkroom", title: <>Developed<br />by hand.</>, body: "Under the red light, not in a lab machine.", align: "right", media: `${g}lens-contact.jpg` },
      { index: "04 · The print", title: <>Something<br />to frame.</>, body: "Printed on fibre paper and dried on the line.", align: "left", media: `${g}lens-portrait.jpg` },
    ] },
    { t: "idea", kick: "Why film", title: <>A thousand frames<br /><em>is homework, not a portrait.</em></>, body: "Digital hands you a thousand near-identical frames and the job of choosing. We shoot a few careful exposures, develop them by hand, and give you a print you will still have long after the hard drive has died." },
    { t: "bigNumber", value: "3", label: <>hand prints from one sitting — not a folder of files</>, media: "/uploads/1/hooks/sites/lens.jpg", note: "One hour in the studio, one roll of film, one conversation across the lens." },
    { t: "diptych", primary: `${g}lens-contact.jpg`, secondary: `${g}lens-camera.jpg`, index: "N°01", title: <>Negative<br /><em>to print.</em></>, body: "Every frame on the contact sheet goes under the loupe before one is chosen.", overlap: "object" },
    { t: "cta", title: <>Sit for <em>a portrait.</em></>, body: "Book an hour in the studio. We call when the prints are dry.", label: "Book a sitting" },
  ] },
  wax: { slug: "wax", theme: "wax", brand: "WAX", nav: ["The idea", "The shop", "Visit"], tagline: "An independent record shop.", legal: "Wax Records", typography: "grotesk", hero: { archetype: "type-collision", eyebrow: "A record shop", title: <>ANALOG</>, sub: "We sell the sitting down, not just the record.", object: "/uploads/1/hooks/sites/wax.jpg" }, blocks: [
    { t: "bigNumber", value: "12″", label: <>the format we still sell — whole albums, in order</>, media: "/uploads/1/hooks/sites/wax.jpg", note: "Not a playlist of singles. The record, as it was meant to be heard." },
    { t: "cinematicBand", media: `${g}wax-shop.jpg`, motif: "grain", chapters: [
      { index: "Side A · 1", title: <>Walk in<br />off the street.</>, body: "Racks worth the browse, and a counter with a turntable.", align: "left", media: `${g}wax-shop.jpg` },
      { index: "Side A · 2", title: <>Flick<br />through.</>, body: "Curated by people who've heard it, not an algorithm.", align: "right", media: `${g}wax-crate.jpg` },
      { index: "Side B", title: <>Drop<br />the needle.</>, body: "Hear the whole side before you decide.", align: "left", media: `${g}wax-spin.jpg` },
    ] },
    { t: "idea", kick: "The ritual", title: <>Side one<br /><em>to side two.</em></>, body: "A stream gives you everything and the patience for none of it. We sell the ritual back: the flick through, the needle, and someone behind the counter who has actually heard the thing you're holding." },
    { t: "gallery", head: <>In the <em>crates.</em></>, items: [{ img: `${g}wax-crate.jpg`, cap: "Flick through." }, { img: `${g}wax-shop.jpg`, cap: "Stay a while." }] },
    { t: "cta", title: <>Come <em>flick through.</em></>, body: "New arrivals every Friday, and a crate we keep aside for regulars.", label: "See what's in" },
  ] },
  spine: { slug: "spine", theme: "spine", brand: "SPINE", typography: "fashion", hero: { archetype: "edge-arrival", edge: "left", proof: ["0", "algorithms on the shelves"], eyebrow: "A bookshop", title: <>Books chosen by<br /><em>someone who read them.</em></>, sub: "A small shop, no algorithm on the shelves." }, nav: ["The idea", "The shop", "Ask"], tagline: "An independent bookshop.", legal: "Spine Books", blocks: [
    { t: "quote", text: "I asked for ‘the last one, but sadder.’ She had it in my hands before I finished the sentence.", cite: "Tom H., regular" },
    { t: "cinematicBand", media: `${g}spine-shelf.jpg`, motif: "none", chapters: [
      { index: "The browse", title: <>Floor to ceiling,<br />by a human logic.</>, body: "Arranged for the slow flick a search bar can't replace.", align: "left", media: `${g}spine-shelf.jpg` },
      { index: "The card", title: <>Every pick<br />says why.</>, body: "A handwritten card from the person who read it.", align: "right", media: `${g}spine-stack.jpg` },
      { index: "The corner", title: <>Then sit down<br />with it.</>, body: "A chair by the window, and nobody hurrying you to the till.", align: "left", media: `${g}spine-read.jpg` },
    ] },
    { t: "idea", kick: "No algorithm", title: <>No spreadsheet<br /><em>on the shelves.</em></>, body: "Every book on our table is there because a person read it and loved it — not because a chart said it would sell." },
    { t: "split", img: `${g}spine-stack.jpg`, rev: true, title: <>Ask, and leave<br /><em>with the one.</em></>, list: [{ b: "Read before it's shelved", s: "If nobody here loved it, it isn't here." }, { b: "No bestseller wall", s: "Curation is a person's taste, not a trend." }, { b: "Staff picks, signed", s: "A name on every card, so you know whose taste it is." }] },
    { t: "cta", title: <>Ask for <em>a recommendation.</em></>, body: "Tell us the last book you could not put down. We will hand you the next.", label: "Get a pick" },
  ] },
  ink: { slug: "ink", theme: "ink", brand: "INK", typography: "fashion", hero: { archetype: "portal-frame", frame: "portrait", eyebrow: "A private studio", title: <>Ink you will<br /><em>wear for good.</em></>, sub: "One artist, one client, and a design drawn only for you." }, nav: ["The idea", "The work", "Book"], tagline: "A private, custom tattoo studio.", legal: "Ink Studio", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/ink.jpg", motif: "none", chapters: [
      { index: "The chair", title: <>One machine,<br />set for one.</>, body: "One artist, one client — the room is yours all day.", align: "left", media: "/uploads/1/hooks/sites/ink.jpg" },
      { index: "Weeks 1–3", title: <>Drawn with you,<br />version by version.</>, body: "Sketched, redrawn and argued over until it is only yours.", align: "right", media: `${g}ink-flash.jpg` },
      { index: "The day", title: <>Tattooed<br />slowly.</>, body: "Line by line, for as long as it takes to be right.", align: "left", media: `${g}ink-work.jpg` },
    ] },
    { t: "idea", kick: "Custom only", title: <>Nothing here<br /><em>is for anyone else.</em></>, body: "No walk-in rush and no needle shared with three other chairs. We draw with you over weeks until the design is right, then tattoo it slowly in a room that is yours for the whole day." },
    { t: "bigNumber", value: "1", label: <>client a day — the room and the artist are yours</>, media: `${g}ink-work.jpg`, note: "No walk-ins, no second chair, no rush at the end of the day." },
    { t: "cta", title: <>Start <em>a piece.</em></>, body: "Send us the idea and where it lives on you. We take on a few each month.", label: "Request a booking" },
  ] },
  mane: { slug: "mane", theme: "mane", brand: "MANE", typography: "editorial", hero: { archetype: "index-stage", eyebrow: "A hair studio", title: <>Hair, cut like<br />it will be seen.</>, items: [{ label: "The consult", meta: "on us, first", img: "/uploads/1/hooks/sites/g/mane-chair.jpg" }, { label: "The cut", meta: "one at a time", img: "/uploads/1/hooks/sites/mane.jpg" }, { label: "The finish", meta: "as it'll be seen", img: "/uploads/1/hooks/sites/g/mane-style.jpg" }] }, nav: ["The idea", "The studio", "Book"], tagline: "A one-chair hair studio.", legal: "Mane Studio", blocks: [
    { t: "cinematicBand", media: `${g}mane-chair.jpg`, motif: "none", chapters: [
      { index: "The consult", title: <>Talk first,<br />cut second.</>, body: "A long consultation, on us, before a single snip.", align: "left", media: `${g}mane-chair.jpg` },
      { index: "The cut", title: <>One head,<br />one hour.</>, body: "No juggling three chairs, no waiting under foil.", align: "right", media: "/uploads/1/hooks/sites/mane.jpg" },
      { index: "Six weeks on", title: <>Still right<br />as it grows.</>, body: "A shape built to grow out as well as it goes in.", align: "left", media: `${g}mane-style.jpg` },
    ] },
    { t: "idea", kick: "One chair", title: <>A salon with three chairs<br /><em>runs on your patience.</em></>, body: "We run one. A stylist thinking about your hair and no one else's, for the whole appointment." },
    { t: "bigNumber", value: "6wk", label: <>later — and it still looks like the day you left</>, media: "/uploads/1/hooks/sites/mane.jpg", note: "Cut for how it grows, not just for the mirror at the end." },
    { t: "editorial", img: `${g}mane-style.jpg`, title: <>Out in<br /><em>the daylight.</em></>, body: "Cut to be seen where it actually will be — outside, on the street, weeks from now." },
    { t: "cta", title: <>Book <em>the chair.</em></>, body: "New clients start with a consultation, on us, before anything is cut.", label: "Book a consultation" },
  ] },
  selvedge: { slug: "selvedge", theme: "selvedge", brand: "SELVEDGE", typography: "signal", hero: { archetype: "regime-shift", index: "N° 01 / 04", object: "/uploads/1/hooks/sites/selvedge.jpg", labels: ["Raw", "Shuttle loom", "Your fade", "Repaired"], eyebrow: "Raw denim", title: <>Denim that<br /><em>fades to you.</em></>, sub: "Woven on old looms, sold raw, broken in by your life." }, nav: ["The idea", "The loom", "Find"], tagline: "Raw selvedge denim, built to age.", legal: "Selvedge Co.", blocks: [
    { t: "idea", kick: "Sold raw", title: <>Sold stiff,<br /><em>broken in by you.</em></>, body: "Pre-distressed jeans wear someone else's life. Ours arrive raw, heavy and dark, and a year of your walking, sitting and folding turns them into a pair that could belong to no one else." },
    { t: "cinematicBand", media: `${g}selvedge-loom.jpg`, motif: "none", chapters: [
      { index: "Month 0", title: <>Off a<br />shuttle loom.</>, body: "Narrow, slow and clattering — the self-edge you see in the cuff.", align: "left", media: `${g}selvedge-loom.jpg` },
      { index: "Month 1", title: <>Stiff, dark,<br />and raw.</>, body: "Nothing printed on, nothing pre-worn.", align: "right", media: `${g}selvedge-jean.jpg` },
      { index: "Month 12", title: <>Worn into<br />a map of you.</>, body: "Whiskers, honeycombs and knees, from twelve months of wear.", align: "left", media: `${g}selvedge-fade.jpg` },
    ] },
    { t: "bigNumber", value: "12", label: <>months of wear, and the fade is only yours</>, media: "/uploads/1/hooks/sites/selvedge.jpg", note: "Free repairs for life — we patch the knees, you keep wearing them." },
    { t: "gallery", head: <>Earned, <em>not printed.</em></>, items: [{ img: `${g}selvedge-jean.jpg`, cap: "Raw, to begin." }, { img: `${g}selvedge-fade.jpg`, cap: "A year later." }] },
    { t: "cta", title: <>Find <em>your pair.</em></>, body: "A handful of cuts, a proper fitting, and a lifetime of free repairs.", label: "See the cuts" },
  ] },
  deck: { slug: "deck", theme: "deck", brand: "DECK", typography: "grotesk", hero: { archetype: "type-collision", object: "/uploads/1/hooks/sites/g/deck-skate.jpg", eyebrow: "A skate shop", title: <>KICKFLIP</>, sub: "Pressed by skaters, for the way you actually ride." }, nav: ["The idea", "The shop", "Build"], tagline: "A skater-run board shop.", legal: "Deck Shop", blocks: [
    { t: "cinematicBand", media: "/uploads/1/hooks/sites/deck.jpg", motif: "grain", chapters: [
      { index: "Pressed", title: <>Our own<br />wood.</>, body: "Pressed by skaters, shaped to the concave we ride.", align: "left", media: "/uploads/1/hooks/sites/deck.jpg" },
      { index: "Set up", title: <>Built on<br />the counter.</>, body: "Trucks, grip and wheels to your stance while you wait.", align: "right", media: `${g}deck-shop.jpg` },
      { index: "Pushed", title: <>Then broken in<br />by you.</>, body: "Skated at the spots we skate, not hung on a wall.", align: "left", media: `${g}deck-skate.jpg` },
    ] },
    { t: "split", img: `${g}deck-shop.jpg`, rev: true, title: <>Skated,<br /><em>not sold.</em></>, list: [{ b: "Advice that's real", s: "The staff ride the spots you ride." }, { b: "Our boards, our wood", s: "Not a warehouse brand with a markup." }, { b: "Walk out rolling", s: "Pick a deck in, push off out." }] },
    { t: "idea", kick: "Skater-run", title: <>No mall brands,<br /><em>no dead stock.</em></>, body: "A skate shop run by people who don't skate is a clothing rack with grip tape. We press our own boards and skate the same spots you do — so the advice is real, not a sticker price." },
    { t: "cta", title: <>Set up <em>a board.</em></>, body: "Pick a deck, we build it to your stance and hand it over ready to push.", label: "Build a setup" },
  ] },
  lather: { slug: "lather", theme: "lather", brand: "LATHER", typography: "fashion", hero: { archetype: "edge-arrival", edge: "right", proof: ["4", "things + six weeks"], eyebrow: "An apothecary", title: <>Soap that<br /><em>is just soap.</em></>, sub: "Cold-pressed, plainly scented, nothing you can't pronounce." }, nav: ["The idea", "The bench", "Shop"], tagline: "Cold-pressed soap and simple skincare.", legal: "Lather Apothecary", blocks: [
    { t: "idea", kick: "The whole recipe", title: <>An apothecary<br /><em>that keeps it short.</em></>, body: "Oils, lye, water and a little botanical scent. That is it — cured slowly, cut by hand, and kind to skin that has had quite enough of the fragrance aisle." },
    { t: "cinematicBand", media: `${g}lather-make.jpg`, motif: "none", chapters: [
      { index: "Day 1", title: <>Poured<br />into the mould.</>, body: "Everything in one pot, stirred by hand.", align: "left", media: `${g}lather-make.jpg` },
      { index: "Week 6", title: <>Cured slow,<br />then cut.</>, body: "Six weeks on the rack makes a harder, milder bar.", align: "right", media: `${g}lather-soap.jpg` },
      { index: "On the shelf", title: <>Amber glass,<br />paper labels.</>, body: "Simple skincare beside it, plainly kept.", align: "left", media: `${g}lather-shelf.jpg` },
    ] },
    { t: "split", img: `${g}lather-soap.jpg`, rev: true, title: <>Refill,<br /><em>don’t rebuy.</em></>, list: [{ b: "Cold-pressed", s: "No heat to cook off the good oils." }, { b: "Botanical scent only", s: "A little, or none — never a fragrance wall." }, { b: "Bring the jar back", s: "A refill habit, so nothing is wasted." }] },
    { t: "cta", title: <>Wash <em>simply.</em></>, body: "A trio to find your scent, then a refill habit so nothing is wasted.", label: "Shop the bars" },
  ] },
  malt: { slug: "malt", theme: "malt", brand: "MALT", typography: "signal", hero: { archetype: "product-theatre", object: "/uploads/1/hooks/sites/malt.jpg", depth: "/uploads/1/hooks/sites/g/malt-depth.jpg", proof: [["4", "beers, rotating"], ["taproom", "poured fresh"], ["Thu-Sun", "whatever tanked"]], eyebrow: "A small brewery", title: <>Beer worth<br /><em>slowing down for.</em></>, sub: "Brewed in small batches, and best where it's made." }, nav: ["The idea", "The tanks", "Visit"], tagline: "A small-batch taproom brewery.", legal: "Malt Brewing", blocks: [
    { t: "cinematicBand", media: `${g}malt-grain.jpg`, motif: "none", chapters: [
      { index: "Mash", title: <>Malt by<br />the sack.</>, body: "Milled and mashed a few steps from the bar.", align: "left", media: `${g}malt-grain.jpg` },
      { index: "Tank", title: <>A few tanks,<br />one brewer.</>, body: "Whatever the brewer felt like making this month.", align: "right", media: `${g}malt-tank.jpg` },
      { index: "Tap", title: <>Poured fresh,<br />where it’s made.</>, body: "We don’t ship far; it is best exactly here.", align: "left", media: `${g}malt-glass.jpg` },
    ] },
    { t: "editorial", img: `${g}malt-tank.jpg`, title: <>Brewed<br /><em>out the back.</em></>, body: "Copper and steel, and small enough that every batch is somebody's decision, not a spreadsheet's." },
    { t: "idea", kick: "Not shipped", title: <>No core range<br /><em>stretched across a country.</em></>, body: "Beer shipped nationwide is built to survive the journey. We keep a rotating handful of batches, poured in the taproom the week they are ready." },
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
