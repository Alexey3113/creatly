"use client";
/* ANIMATED · Nº08 — «TERRA» (класс 3d-product-theatre / planet-dolly, приём IMAGE-SCRUB DOLLY-IN + day→night).
   ОДИН кинокадр (Земля из космоса с терминатором день/ночь) без realtime-3D. В pin-сцене диск планеты
   изолирован радиальной маской из кадра и МАСШТАБИРУЕТСЯ по --t — камера ныряет сквозь атмосферу к ночной
   стороне; атмосферный rim-glow (radial) разгорается; звёздное поле в 3 слоя параллаксит по --px/--py;
   night-веуль густеет по --t и amber city-lights проступают созвездиями; главы-подписи сменяются clip-path.
   Реальная польза: Earth-observation (наблюдение Земли). Палитра ИЗ КАДРА: space-void + cyan-atmosphere + amber-lights.
   Бренд TERRA ORBITAL — спутниковое наблюдение Земли. Оригинальный приём: masked-globe dolly + parallax starfield. */
import { useEffect, useRef, useState } from "react";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { EarthGlobe } from "./EarthGlobe";
import "../engine/scrollstage.css";
import "./terra08.css";

const HERO = "/uploads/1/animated/terra-hero.jpg";

/* Chapters — сменяются wipe'ом clip-path по --t (одновременно активна одна). */
const CHAPTERS: [string, string, string][] = [
  ["01", "DAYLIGHT SIDE", "oceans · weather · biomass"],
  ["02", "THE TERMINATOR", "the moving line of dawn"],
  ["03", "NIGHT SIDE", "cities read as constellations"],
];

/* count-up для орбитального дата-борта (rAF, один раз при входе). */
function CountUp({ to, decimals = 0, prefix = "", suffix = "" }:
  { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0, start = 0; const dur = 1700;
    const io = new IntersectionObserver((ents) => {
      if (!ents[0].isIntersecting) return; io.disconnect();
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / dur);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="tr-num">{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

export function Terra08() {
  return (
    <ScrollStage className="tr">
      {/* НАСТОЯЩАЯ realtime-3D планета (three/r3f), fixed позади сцен cover+dolly; гаснет к data/outro */}
      <EarthGlobe />

      {/* 0 · COVER — планета за копи, заголовок проявляется маской */}
      <Scene className="tr-cover">
        <div className="tr-cover-grade" aria-hidden />
        <div className="tr-kick"><span>TERRA ORBITAL</span><span>Nº08 · EARTH OBSERVATION</span></div>
        <div className="tr-cover-copy">
          <p className="tr-eyebrow">the planet, watched from apogee</p>
          <h1 className="tr-hero">
            <span className="tr-line" style={{ ["--d" as string]: 0 }}><i>One world,</i></span>
            <span className="tr-line" style={{ ["--d" as string]: 1 }}><i>two hemispheres</i></span>
            <span className="tr-line tr-amber" style={{ ["--d" as string]: 2 }}><i>of light.</i></span>
          </h1>
        </div>
        <div className="tr-cue" aria-hidden>scroll — fall through the atmosphere ↓</div>
      </Scene>

      {/* 1 · DOLLY — камера ныряет к 3D-планете (день→ночь), главы сменяются clip-path (pin-scrub) */}
      <Scene className="tr-dolly" pinned vh={320}>
        <span className="tr-tag">DOLLY 04 · descending 420 km → 90 km</span>
        <div className="tr-chapters">
          {CHAPTERS.map(([idx, t, s], i) => (
            <div key={i} className="tr-chapter" style={{ ["--i" as string]: i }}>
              <span className="tr-chapter-idx">{idx}</span>
              <h2>{t}</h2>
              <span className="tr-chapter-sub">{s}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 · DATA — орбитальный дата-борт, count-up (реальная польза) */}
      <Scene className="tr-data">
        <p className="tr-data-lead">
          <span className="tr-line" style={{ ["--d" as string]: 0 }}><i>Every pass rewrites</i></span>
          <span className="tr-line tr-amber" style={{ ["--d" as string]: 1 }}><i>the living map.</i></span>
        </p>
        <div className="tr-grid">
          <div className="tr-cell"><CountUp to={14} /><span>revisits / day</span></div>
          <div className="tr-cell"><CountUp to={0.5} decimals={1} suffix=" m" /><span>ground resolution</span></div>
          <div className="tr-cell tr-cell-amber"><CountUp to={92} suffix="%" /><span>cloud-free composites</span></div>
          <div className="tr-cell"><CountUp to={6.1} decimals={1} suffix=" PB" /><span>archive, and counting</span></div>
        </div>
      </Scene>

      {/* 3 · OUTRO — уход в ночь, CTA */}
      <Scene className="tr-end">
        <div className="tr-end-veil" aria-hidden />
        <div className="tr-end-block">
          <h2>
            <span className="tr-line" style={{ ["--d" as string]: 0 }}><i>Task a satellite</i></span>
            <span className="tr-line tr-amber" style={{ ["--d" as string]: 1 }}><i>over your ground.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="tr-btn">Open an orbit ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
