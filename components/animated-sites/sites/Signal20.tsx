"use client";
/* ANIMATED · Nº20 — «SIGNAL» (класс editorial-motion, приём day→night + count-up).
   Тёмная SaaS-сцена. По прогрессу pin-сцены восходит молтен-солнечная дуга (radial-gradient),
   небо сдвигается night→dawn→day по --t. Блок статистики считает числа настоящим rAF-count-up,
   запускаясь при входе в вьюпорт (IntersectionObserver). Финал — палитра садится обратно в night.
   Ноль ассетов. Палитра: near-black + molten-orange sunrise. Бренд HELIOS — оригинальный signal-OS. */
import { useEffect, useRef, useState } from "react";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./signal20.css";

/* count-up: анимируем число один раз при входе в вьюпорт (rAF, ease-out). JS пишет только число. */
function CountUp({ to, decimals = 0, prefix = "", suffix = "" }:
  { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setV(to); return; }
    let raf = 0, start = 0;
    const dur = 1600;
    const io = new IntersectionObserver((ents) => {
      if (!ents[0].isIntersecting) return;
      io.disconnect();
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / dur);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setV(to * e);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="sg-num">{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

export function Signal20() {
  return (
    <ScrollStage className="sg editorial-motion">
      {/* 0 · COVER — near-black night, у горизонта тлеет пред-рассвет */}
      <Scene className="sg-cover">
        <div className="sg-kick"><span>HELIOS — SIGNAL OS</span><span>Nº20 · EDITORIAL</span></div>
        <div className="sg-cover-in">
          <p className="sg-eyebrow">observability, before the noise</p>
          <h1 className="sg-hero">
            <span className="sg-line" style={{ ["--d" as string]: 0 }}><i>Every night</i></span>
            <span className="sg-line" style={{ ["--d" as string]: 1 }}><i>ends in</i></span>
            <span className="sg-line sg-warm" style={{ ["--d" as string]: 2 }}><i>daylight data.</i></span>
          </h1>
        </div>
        <div className="sg-horizon" aria-hidden />
        <div className="sg-cue" aria-hidden>scroll — bring the sun up ↓</div>
      </Scene>

      {/* 1 · RISE — солнечная дуга восходит по --t, небо night→dawn→day (pin-scrub) */}
      <Scene className="sg-rise" pinned vh={320}>
        <div className="sg-sky" aria-hidden />
        <div className="sg-sun" aria-hidden><span className="sg-sun-core" /></div>
        <div className="sg-rise-copy">
          <span className="sg-tag">06:14 — first light</span>
          <h2>The sun comes up<br /><em>on your metrics.</em></h2>
        </div>
      </Scene>

      {/* 2 · SIGNAL — блок статистики, count-up при входе */}
      <Scene className="sg-stats">
        <p className="sg-stats-lead">
          <span className="sg-line" style={{ ["--d" as string]: 0 }}><i>Noise in. Signal out —</i></span>
          <span className="sg-line" style={{ ["--d" as string]: 1 }}><i>measured at dawn.</i></span>
        </p>
        <div className="sg-grid">
          <div className="sg-cell"><CountUp to={4.2} decimals={1} suffix="B" /><span>signals ingested / day</span></div>
          <div className="sg-cell"><CountUp to={99.98} decimals={2} suffix="%" /><span>pipeline uptime</span></div>
          <div className="sg-cell sg-cell-warm"><CountUp to={11} suffix="ms" /><span>p50 query latency</span></div>
          <div className="sg-cell"><CountUp to={3.1} decimals={1} prefix="×" /><span>faster to root-cause</span></div>
        </div>
      </Scene>

      {/* 3 · SET — палитра садится обратно в night, CTA */}
      <Scene className="sg-end">
        <div className="sg-end-veil" aria-hidden />
        <div className="sg-end-block">
          <h2>
            <span className="sg-line" style={{ ["--d" as string]: 0 }}><i>Ship before</i></span>
            <span className="sg-line sg-warm" style={{ ["--d" as string]: 1 }}><i>the alarm.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="sg-btn">Start at first light ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
