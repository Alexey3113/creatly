"use client";
/* ANIMATED · Nº08 — «TERRA» (класс 3d-product-theatre / planet-dolly → ДЕНЬ И НОЧЬ КАК ОСЬ СТРАНИЦЫ).
   Одна realtime-3D планета (EarthGlobe) живёт fixed-слоем под ВСЕЙ страницей — не гаснет после пина.
   scene-kit <Follow> по якорям глав ведёт её камеру (--gx/--gy/--gz: планета уходит из-под копи) и солнце
   (--sun: день → терминатор → ночь с огнями городов → рассвет над лимбом в финале). Высотомер орбиты
   (420 km → 90 km) идёт через все главы. Главы сменяются по одной, с паузой — без наложений и обрезки.
   Палитра ИЗ КАДРА: space-void + cyan-atmosphere + amber-lights. Бренд TERRA ORBITAL. */
import { useEffect, useRef, useState } from "react";
import { Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { EarthGlobe } from "./EarthGlobe";
import "../engine/scrollstage.css";
import "./terra08.css";

const CHAPTERS: [string, string, string][] = [
  ["01", "Daylight side", "oceans · weather · biomass"],
  ["02", "The terminator", "the moving line of dawn"],
  ["03", "Night side", "cities read as constellations"],
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

/* якорь пин-сцены 320vh по её прогрессу t: доля высоты секции, которая проходит середину экрана */
const pin = (t: number, V = 3.2) => (t * (V - 1) + 0.5) / V;

export function Terra08() {
  return (
    <ScrollStage className="tr">
      {/* ОСЬ ДЕНЬ→НОЧЬ и камера планеты — на всю страницу */}
      <Follow stops={[
        { at: ".tr-cover", vars: { "--gx": 0.95, "--gy": -0.05, "--gz": 3.7, "--sun": 0.02 } },
        { at: ".tr-dolly", anchor: pin(0.2), vars: { "--gx": -0.55, "--gy": 0, "--gz": 3.0, "--sun": 0.08 } },
        { at: ".tr-dolly", anchor: pin(0.5), vars: { "--gx": -0.62, "--gy": 0, "--gz": 2.55, "--sun": 0.42 } },
        { at: ".tr-dolly", anchor: pin(0.8), vars: { "--gx": -0.66, "--gy": 0, "--gz": 2.25, "--sun": 0.86 } },
        { at: ".tr-data", vars: { "--gx": -0.85, "--gy": 0.05, "--gz": 2.4, "--sun": 0.96 } },
        { at: ".tr-end", vars: { "--gx": 0, "--gy": -1.25, "--gz": 2.05, "--sun": 0.62 } },
      ]} />
      <Follow round stops={[
        { at: ".tr-cover", vars: { "--alt": 420 } },
        { at: ".tr-dolly", anchor: pin(0.8), vars: { "--alt": 90 } },
        { at: ".tr-end", vars: { "--alt": 90 } },
      ]} />

      {/* НАСТОЯЩАЯ realtime-3D планета — fixed позади всех глав, сквозной объект */}
      <EarthGlobe />
      <div className="tr-hud" aria-hidden><span>ORBIT</span><b className="tr-hud-alt" /><span className="tr-hud-sun" /></div>

      {/* 0 · COVER — планета справа, дневная сторона; заголовок целиком */}
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

      {/* 1 · DOLLY — наезд, солнце уходит за планету; главы по одной */}
      <Scene className="tr-dolly" pinned vh={320}>
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

      {/* 2 · DATA — ночная сторона слева, телеметрия колонкой справа */}
      <Scene className="tr-data">
        <div className="tr-data-col">
          <p className="tr-data-lead">
            <span className="tr-line" style={{ ["--d" as string]: 0 }}><i>Every pass rewrites</i></span>
            <span className="tr-line tr-amber" style={{ ["--d" as string]: 1 }}><i>the living map.</i></span>
          </p>
          <ul className="tr-reads">
            <li><CountUp to={14} /><span>revisits / day</span></li>
            <li><CountUp to={0.5} decimals={1} suffix=" m" /><span>ground resolution</span></li>
            <li className="tr-read-amber"><CountUp to={92} suffix="%" /><span>cloud-free composites</span></li>
            <li><CountUp to={6.1} decimals={1} suffix=" PB" /><span>archive, and counting</span></li>
          </ul>
        </div>
      </Scene>

      {/* 3 · OUTRO — рассвет над лимбом планеты, CTA */}
      <Scene className="tr-end">
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
