"use client";
/* ANIMATED · Nº20 — «SIGNAL» (класс editorial-motion → ОДНА НОЧЬ ДО РАССВЕТА).
   Небо — fixed-слой под ВСЕЙ страницей (не только внутри пина): scene-kit <Follow> по якорям глав ведёт
   --sky (ночь → предрассвет → утро) и --sun (солнце встаёт из-за горизонта через все главы: обложка —
   только зарево, пин — восход с событиями по времени 05:52 → 06:14 → 06:31, цифры — под поднявшимся
   солнцем, финал — полный диск). Сквозные детали: солнце и часы-метка. Ноль ассетов.
   Палитра: near-black + molten-orange sunrise. Бренд HELIOS — signal-OS. */
import { useEffect, useRef, useState } from "react";
import { Follow } from "@/components/scene-kit";
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

/* якорь пин-сцены 240vh по её прогрессу t */
const pin = (t: number, V = 2.4) => (t * (V - 1) + 0.5) / V;

const BEATS = [
  { time: "05:52 — pre-dawn", h: "Noise, all night.", em: "Nobody watching." },
  { time: "06:14 — first light", h: "The sun comes up", em: "on your metrics." },
  { time: "06:31 — signal", h: "The anomaly surfaces", em: "before anyone wakes." },
];

export function Signal20() {
  return (
    <ScrollStage className="sg editorial-motion">
      {/* НЕБО И СОЛНЦЕ — одна ось на всю страницу */}
      <Follow stops={[
        { at: ".sg-cover", vars: { "--sky": 0, "--sun": 0, "--sunx": 70 } },
        { at: ".sg-rise", anchor: pin(0.12), vars: { "--sky": 0.12, "--sun": 0.14, "--sunx": 70 } },
        { at: ".sg-rise", anchor: pin(0.5), vars: { "--sky": 0.42, "--sun": 0.4, "--sunx": 69 } },
        { at: ".sg-rise", anchor: pin(0.88), vars: { "--sky": 0.66, "--sun": 0.62, "--sunx": 70 } },
        { at: ".sg-stats", vars: { "--sky": 0.84, "--sun": 0.8, "--sunx": 72 } },
        { at: ".sg-end", vars: { "--sky": 1, "--sun": 1, "--sunx": 50 } },
      ]} />

      <div className="sg-world" aria-hidden>
        <div className="sg-sky" />
        <div className="sg-stars" />
        <div className="sg-sunwin"><div className="sg-sun"><span className="sg-sun-core" /></div></div>
        <div className="sg-haze" />
        <div className="sg-ground"><div className="sg-grid" /></div>
      </div>

      {/* 0 · COVER — ночь, у горизонта только зарево */}
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
        <div className="sg-cue" aria-hidden>scroll — bring the sun up ↓</div>
      </Scene>

      {/* 1 · RISE — восход, три события по часам (по одному) */}
      <Scene className="sg-rise" pinned vh={240}>
        {BEATS.map((b, i) => (
          <div key={i} className="sg-beat" style={{ ["--i" as string]: i }}>
            <span className="sg-tag">{b.time}</span>
            <h2>{b.h}<br /><em>{b.em}</em></h2>
          </div>
        ))}
      </Scene>

      {/* 2 · SIGNAL — цифры на небе под поднявшимся солнцем */}
      <Scene className="sg-stats">
        <p className="sg-stats-lead">
          <span className="sg-line" style={{ ["--d" as string]: 0 }}><i>Noise in. Signal out —</i></span>
          <span className="sg-line sg-warm" style={{ ["--d" as string]: 1 }}><i>measured at dawn.</i></span>
        </p>
        <div className="sg-grid-stats">
          <div className="sg-cell"><CountUp to={4.2} decimals={1} suffix="B" /><span>signals ingested / day</span></div>
          <div className="sg-cell"><CountUp to={99.98} decimals={2} suffix="%" /><span>pipeline uptime</span></div>
          <div className="sg-cell sg-cell-warm"><CountUp to={11} suffix="ms" /><span>p50 query latency</span></div>
          <div className="sg-cell"><CountUp to={3.1} decimals={1} prefix="×" /><span>faster to root-cause</span></div>
        </div>
      </Scene>

      {/* 3 · MORNING — солнце взошло, CTA */}
      <Scene className="sg-end">
        <div className="sg-end-block">
          <p className="sg-eyebrow">06:58 — before the alarm</p>
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
