"use client";
/* ANIMATED · Nº23 — «CANOPY» (класс scroll-reveal, приём parallax data-карточки поверх кино-фото).
   Туманное лесное ущелье — фон с parallax по --px/--py (курсор) и наездом scale по --t. Поверх
   ВСПЛЫВАЮТ полупрозрачные data-карточки со стаггером (translateY по окну --t + --i) — «аналитика
   в дикой природе»: датчики влажности, температуры, расхода ручья считаются rAF-каунтерами.
   Палитра снята с кадра: moss-green + cool cream mist, акцент — лишайниково-зелёный.
   Бренд CANOPY — сенсорная сеть дикой природы. Шрифт: Bricolage Grotesque + JetBrains Mono (числа).
   ПЕРЕСБОРКА: ущелье — fixed-мир под всей страницей (одна камера, без повтора фото в CTA). scene-kit <Follow>
   ведёт камеру по ущелью от датчика к датчику; показания — метки НА объектах сцены (туман крон, водопад,
   мох, скала), а не SaaS-карточки поверх пейзажа; пройденные узлы остаются гореть — сеть собирается к финалу. */

const NODES = [
  { k: 1, x: 44, y: 22, node: "CANOPY-04", metric: "air humidity", value: "94.2", unit: "%", note: "fog holding at the ridge line" },
  { k: 2, x: 53, y: 70, node: "CREEK-11", metric: "stream flow", value: "3.8", unit: "m³/s", note: "snowmelt, rising since dawn", warm: true },
  { k: 3, x: 30, y: 63, node: "MOSS-27", metric: "ground temp", value: "6.4", unit: "°C", note: "stable under the north face" },
  { k: 4, x: 70, y: 36, node: "CANOPY-19", metric: "light under canopy", value: "1180", unit: "lux", note: "soft, diffused through mist" },
];
import { useEffect, useRef, useState } from "react";
import { Follow, Weather } from "@/components/scene-kit";
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

export function Current23() {
  return (
    <ScrollStage className="cu scroll-reveal">
      {/* КАМЕРА ПО УЩЕЛЬЮ — от датчика к датчику; --nk: узел k выхвачен (1) / пройден (.4) */}
      <Follow stops={[
        { at: ".cu-cover", vars: { "--s": 1.06, "--tx": 0, "--ty": 0, "--n1": 0, "--n2": 0, "--n3": 0, "--n4": 0 } },
        { at: ".cu-n1", vars: { "--s": 1.5, "--tx": 9, "--ty": 25, "--n1": 1, "--n2": 0, "--n3": 0, "--n4": 0 } },
        { at: ".cu-n2", vars: { "--s": 1.7, "--tx": -5, "--ty": -34, "--n1": 0.4, "--n2": 1, "--n3": 0, "--n4": 0 } },
        { at: ".cu-n3", vars: { "--s": 1.6, "--tx": 32, "--ty": -21, "--n1": 0.4, "--n2": 0.4, "--n3": 1, "--n4": 0 } },
        { at: ".cu-n4", vars: { "--s": 1.5, "--tx": -29, "--ty": 20, "--n1": 0.4, "--n2": 0.4, "--n3": 0.4, "--n4": 1 } },
        { at: ".cu-net", vars: { "--s": 1.12, "--tx": 0, "--ty": 0, "--n1": 0.7, "--n2": 0.7, "--n3": 0.7, "--n4": 0.7 } },
        { at: ".cu-end", vars: { "--s": 1.08, "--tx": 0, "--ty": 3, "--n1": 0.85, "--n2": 0.85, "--n3": 0.85, "--n4": 0.85 } },
      ]} />

      {/* УЩЕЛЬЕ — один кадр под всеми главами; метки датчиков живут на объектах кадра */}
      <div className="cu-world" aria-hidden>
        <div className="cu-cam">
          <img src={HERO} alt="" className="cu-plate" />
          <svg className="cu-net-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M44 22 L70 36 L53 70 L30 63 Z" />
          </svg>
          {NODES.map((n) => (
            <div key={n.k} className={`cu-node${n.warm ? " cu-node-warm" : ""}`} style={{ left: `${n.x}%`, top: `${n.y}%`, ["--on" as string]: `var(--n${n.k})` }}>
              <span className="cu-node-dot" />
              <div className="cu-node-card">
                <header>{n.node}</header>
                <p className="cu-metric">{n.metric}</p>
                <p className="cu-value">{n.value}<span className="cu-unit">{n.unit}</span></p>
                <p className="cu-note">{n.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cu-fog" />
      </div>
      <Weather kind="spores" count={24} color="#d8e6b0" color2="#b7d15f" world={0.4} zIndex={1} />

      {/* 0 · COVER — ущелье в тумане, заголовок */}
      <Scene className="cu-cover">
        <div className="cu-kick"><span>CANOPY — WILDERNESS SIGNAL NETWORK</span><span>Nº23 · SCROLL-REVEAL</span></div>
        <div className="cu-cover-in">
          <p className="cu-eyebrow">telemetry from the deep forest</p>
          <h1 className="cu-hero">
            <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>The forest</i></span>
            <span className="cu-line" style={{ ["--d" as string]: 1 }}><i>is already</i></span>
            <span className="cu-line cu-moss" style={{ ["--d" as string]: 2 }}><i>reporting.</i></span>
          </h1>
        </div>
        <div className="cu-cue" aria-hidden>scroll — walk the gorge, node by node ↓</div>
      </Scene>

      {/* 1–4 · ДАТЧИКИ — камера подходит к каждому */}
      <Scene className="cu-node-sec cu-n1">
        <p className="cu-lead">
          <span className="cu-line" style={{ ["--d" as string]: 0 }}><i>Two hundred sensors,</i></span>
          <span className="cu-line cu-moss" style={{ ["--d" as string]: 1 }}><i>listening to the gorge.</i></span>
        </p>
      </Scene>
      <Scene className="cu-node-sec cu-n2"><span className="cu-step" aria-hidden>02 / 04 · the creek</span></Scene>
      <Scene className="cu-node-sec cu-n3"><span className="cu-step" aria-hidden>03 / 04 · the moss floor</span></Scene>
      <Scene className="cu-node-sec cu-n4"><span className="cu-step" aria-hidden>04 / 04 · the light shaft</span></Scene>

      {/* 5 · NETWORK — камера отходит: все узлы в одной сети */}
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

      {/* 6 · CTA — сеть горит в ущелье */}
      <Scene className="cu-end">
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
