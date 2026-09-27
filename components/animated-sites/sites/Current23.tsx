"use client";
/* ANIMATED · Nº23 — «CANOPY» (класс scroll-reveal, приём parallax data-карточки поверх кино-фото).
   Туманное лесное ущелье — фон с parallax по --px/--py (курсор) и наездом scale по --t. Поверх
   ВСПЛЫВАЮТ полупрозрачные data-карточки со стаггером (translateY по окну --t + --i) — «аналитика
   в дикой природе»: датчики влажности, температуры, расхода ручья считаются rAF-каунтерами.
   Палитра снята с кадра: moss-green + cool cream mist, акцент — лишайниково-зелёный.
   Бренд CANOPY — сенсорная сеть дикой природы. Шрифт: Bricolage Grotesque + JetBrains Mono (числа). */
import { useEffect, useRef, useState } from "react";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./current23.css";

const HERO = "/uploads/1/animated/current-hero.jpg";

/* count-up: анимируем число один раз при входе в вьюпорт (rAF, easeOutCubic). JS пишет только число. */
function CountUp({ to, decimals = 0, prefix = "", suffix = "" }:
  { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0, start = 0;
    const dur = 1700;
    const io = new IntersectionObserver((ents) => {
      if (!ents[0].isIntersecting) return;
      io.disconnect();
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / dur);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className="cu-num">{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

/* data-карточка: всплывает по окну --t сцены со стаггером --i (translateY + fade + blur→0). */
function Card({ i, node, metric, value, unit, note, warm = false }:
  { i: number; node: string; metric: string; value: React.ReactNode; unit?: string; note: string; warm?: boolean }) {
  return (
    <article className={`cu-card${warm ? " cu-card-warm" : ""}`} style={{ ["--i" as string]: i }}>
      <header><span className="cu-dot" aria-hidden />{node}</header>
      <p className="cu-metric">{metric}</p>
      <p className="cu-value">{value}{unit && <span className="cu-unit">{unit}</span>}</p>
      <p className="cu-note">{note}</p>
    </article>
  );
}

export function Current23() {
  return (
    <ScrollStage className="cu scroll-reveal">
      {/* 0 · COVER — кадр ущелья с parallax по курсору, заголовок проявляется маской */}
      <Scene className="cu-cover">
        <div className="cu-bg cu-bg--cover" aria-hidden>
          <img src={HERO} alt="" className="cine-media" />
          <div className="cu-fog" />
        </div>
        <div className="cu-kick"><span>CANOPY — WILDERNESS SIGNAL NETWORK</span><span>Nº23 · SCROLL-REVEAL</span></div>
        <div className="cu-cover-in">
          <p className="cu-eyebrow">telemetry from the deep forest</p>
          <h1 className="cu-hero">
            <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>The forest</i></span>
            <span className="cu-line" style={{ ["--d" as string]: 1 }}><i>is already</i></span>
            <span className="cu-line cu-moss" style={{ ["--d" as string]: 2 }}><i>reporting.</i></span>
          </h1>
        </div>
        <div className="cu-cue" aria-hidden>scroll — read the wild ↓</div>
      </Scene>

      {/* 1 · TELEMETRY — кадр наезжает по --t, полупрозрачные data-карточки всплывают стаггером */}
      <Scene className="cu-reveal">
        <div className="cu-bg cu-bg--reveal" aria-hidden>
          <img src={HERO} alt="" className="cine-media" />
          <div className="cu-fog cu-fog--deep" />
        </div>
        <div className="cu-reveal-in">
          <p className="cu-lead">
            <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>Two hundred sensors,</i></span>
            <span className="cu-line cu-moss" style={{ ["--d" as string]: 1 }}><i>listening to the gorge.</i></span>
          </p>
          <div className="cu-cards">
            <Card i={0} node="NODE · CANOPY-04" metric="air humidity" value={<CountUp to={94.2} decimals={1} />} unit="%" note="fog holding at the ridge line" />
            <Card i={1} node="NODE · CREEK-11" metric="stream flow" value={<CountUp to={3.8} decimals={1} />} unit="m³/s" note="snowmelt, rising since dawn" warm />
            <Card i={2} node="NODE · MOSS-27" metric="ground temp" value={<CountUp to={6.4} decimals={1} />} unit="°C" note="stable under the north face" />
            <Card i={3} node="NODE · CANOPY-19" metric="light under canopy" value={<CountUp to={1180} />} unit="lux" note="soft, diffused through mist" />
          </div>
        </div>
      </Scene>

      {/* 2 · NETWORK — тихая полоса итоговой статистики на mossy-тёмном */}
      <Scene className="cu-net">
        <p className="cu-net-lead">
          <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>No cameras. No cages.</i></span>
          <span className="cu-line cu-moss" style={{ ["--d" as string]: 1 }}><i>Only the forest, quantified.</i></span>
        </p>
        <div className="cu-figs">
          <div className="cu-fig"><CountUp to={214} /><span>autonomous nodes deployed</span></div>
          <div className="cu-fig"><CountUp to={5} suffix=" yr" /><span>battery on a single leaf-cell</span></div>
          <div className="cu-fig cu-fig-moss"><CountUp to={99.6} decimals={1} suffix="%" /><span>packets home through the trees</span></div>
        </div>
      </Scene>

      {/* 3 · CTA — закрытие на глубоком mossy-тумане */}
      <Scene className="cu-end">
        <div className="cu-bg cu-bg--end" aria-hidden>
          <img src={HERO} alt="" className="cine-media" />
          <div className="cu-fog cu-fog--end" />
        </div>
        <div className="cu-end-block">
          <p className="cu-eyebrow cu-moss">deploy a canopy</p>
          <h2>
            <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>Give the wild</i></span>
            <span className="cu-line cu-moss" style={{ ["--d" as string]: 1 }}><i>a voice.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="cu-btn">Map your terrain ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
