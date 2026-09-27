"use client";
/* ANIMATED · Nº10 — «GROVE LEDGER» (класс ui-microinteraction, приём live count-up калькулятор).
   Настоящая механика: три слайдера → rAF-ease к цели, tabular-nums, число пишется прямо в DOM-узел
   (без ре-рендера в кадре). Тема — сколько творческая студия теряет на ручной админке и сколько
   Grove возвращает. Плюс stat-band со счётчиками при въезде (IntersectionObserver + rAF) и
   scroll-driven bar «потери → возврат» на --t. Палитра: forest-green + lime на светлом. Ассетов нет. */
import { useEffect, useRef, useState } from "react";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "./ledger10.css";

const WEEKS = 48;        // рабочих недель в году
const RECOVER = 0.7;     // доля админ-часов, которую Grove автоматизирует

function useFont() {
  useEffect(() => {
    const id = "gf-space-grotesk";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }, []);
}

/* Счётчик, оживающий при въезде в вьюпорт: 0 → target, форматтер снаружи. */
function StatNum({ target, decimals = 0, format }: { target: number; decimals?: number; format: (v: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { el.textContent = format(target); return; }
    let raf = 0, started = false;
    const run = (t0: number) => {
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        const e = 1 - Math.pow(1 - k, 3);               // easeOutCubic
        el.textContent = format(+(target * e).toFixed(decimals));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((en) => { if (en.isIntersecting && !started) { started = true; requestAnimationFrame((t) => run(t)); } });
    }, { threshold: 0.6 });
    el.textContent = format(0);
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [target, decimals, format]);
  return <span ref={ref} className="lg-tnum" />;
}

export function Ledger10() {
  useFont();
  const [team, setTeam] = useState(8);
  const [rate, setRate] = useState(85);
  const [admin, setAdmin] = useState(11);

  const dollarRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const monthRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef({ dollars: 0, hours: 0 });
  const shownRef = useRef({ dollars: 0, hours: 0 });

  // цель считается синхронно из слайдеров
  const annual = team * rate * admin * RECOVER * WEEKS;
  const hoursBack = team * admin * RECOVER * WEEKS;
  targetRef.current = { dollars: annual, hours: hoursBack };

  // один rAF-loop еасит показанное к цели и пишет прямо в DOM (без ре-рендера в кадре)
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
    const write = () => {
      const s = shownRef.current;
      if (dollarRef.current) dollarRef.current.textContent = usd(s.dollars);
      if (monthRef.current) monthRef.current.textContent = usd(s.dollars / 12);
      if (hoursRef.current) hoursRef.current.textContent = Math.round(s.hours).toLocaleString("en-US");
    };
    if (reduced) { shownRef.current = { ...targetRef.current }; write(); return; }
    let raf = 0;
    const loop = () => {
      const s = shownRef.current, tg = targetRef.current;
      s.dollars += (tg.dollars - s.dollars) * 0.12;
      s.hours += (tg.hours - s.hours) * 0.12;
      if (Math.abs(tg.dollars - s.dollars) < 1) s.dollars = tg.dollars;
      if (Math.abs(tg.hours - s.hours) < 0.5) s.hours = tg.hours;
      write();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ScrollStage className="lg">
      {/* 0 · HERO — интерактивный калькулятор потерь/возврата */}
      <Scene className="lg-hero">
        <div className="lg-kick"><span>GROVE° LEDGER</span><span>Nº10 · CREATLY / ANIMATED</span></div>

        <div className="lg-hero-grid">
          <div className="lg-hero-copy">
            <p className="lg-eyebrow">The admin-leak calculator</p>
            <h1 className="lg-h1">How much does your studio<br /><em>quietly bleed</em> every year?</h1>
            <p className="lg-sub">Manual invoicing, status pings, timesheet archaeology. Grove automates the busywork — move the dials, watch it come back.</p>
          </div>

          <div className="lg-calc" role="group" aria-label="Savings calculator">
            <div className="lg-readout">
              <span className="lg-readout-lab">RECOVERED / YEAR</span>
              <div className="lg-readout-num" ref={dollarRef} aria-live="polite">$0</div>
              <div className="lg-readout-sub">
                <span className="lg-tnum" ref={hoursRef}>0</span>{" "}hours back to real work
                &nbsp;·&nbsp;<span className="lg-tnum" ref={monthRef}>$0</span>/mo
              </div>
            </div>

            <div className="lg-fields">
              <label className="lg-field">
                <span className="lg-field-top"><span>Team size</span><b>{team} people</b></span>
                <input type="range" min={2} max={40} value={team} onChange={(e) => setTeam(+e.target.value)} />
              </label>
              <label className="lg-field">
                <span className="lg-field-top"><span>Blended rate</span><b>${rate}/hr</b></span>
                <input type="range" min={40} max={220} step={5} value={rate} onChange={(e) => setRate(+e.target.value)} />
              </label>
              <label className="lg-field">
                <span className="lg-field-top"><span>Admin hours / person / week</span><b>{admin} hrs</b></span>
                <input type="range" min={2} max={20} value={admin} onChange={(e) => setAdmin(+e.target.value)} />
              </label>
            </div>
            <p className="lg-fine">Based on {WEEKS} working weeks · Grove reclaims ~{Math.round(RECOVER * 100)}% of manual admin.</p>
          </div>
        </div>
        <div className="lg-cue" aria-hidden>drag the dials · scroll ↓</div>
      </Scene>

      {/* 1 · STAT BAND — счётчики оживают при въезде */}
      <Scene className="lg-stats">
        <div className="lg-stats-head"><span className="lg-line" style={{ ["--d" as string]: 0 }}><i>Studios already stopped counting losses.</i></span></div>
        <div className="lg-stat-row">
          <div className="lg-stat"><StatNum target={128} format={(v) => Math.round(v).toString()} /><span className="lg-stat-cap">studios on Grove</span></div>
          <div className="lg-stat lg-stat-accent"><span className="lg-pre">$</span><StatNum target={4.2} decimals={1} format={(v) => v.toFixed(1)} /><span className="lg-post">M</span><span className="lg-stat-cap">hours recovered, in fees</span></div>
          <div className="lg-stat"><StatNum target={11} format={(v) => Math.round(v).toString()} /><span className="lg-post">h</span><span className="lg-stat-cap">reclaimed / person / week</span></div>
        </div>
      </Scene>

      {/* 2 · LEAK→RECOVER — scroll-driven bar на --t */}
      <Scene className="lg-flow">
        <div className="lg-flow-inner">
          <h2 className="lg-flow-h"><span className="lg-line" style={{ ["--d" as string]: 0 }}><i>Every hour has two homes.</i></span></h2>
          <div className="lg-bar" aria-hidden>
            <div className="lg-bar-lost"><span>lost to admin</span></div>
            <div className="lg-bar-kept"><span>back to the work</span></div>
          </div>
          <p className="lg-flow-cap"><span className="lg-line" style={{ ["--d" as string]: 1 }}><i>Grove tips the balance — automatically, in the background, forever.</i></span></p>
        </div>
      </Scene>

      {/* 3 · CLOSER */}
      <Scene className="lg-end">
        <div className="lg-end-block">
          <h2 className="lg-end-h">Stop counting losses.<br /><em>Start counting trees.</em></h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="lg-btn">Run your studio on Grove ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
