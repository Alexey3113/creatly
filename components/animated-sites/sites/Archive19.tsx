"use client";
/* ANIMATED · Nº19 — «MERIDIAN ARCHIVE» (класс editorial-motion → ОДИН ДЕНЬ В ЧИТАЛЬНОМ ЗАЛЕ).
   Зал — fixed-мир под всей страницей (первый экран — сразу зал, без кремовой «обложки»). scene-kit <Follow>
   по якорям глав ведёт камеру к столу с зелёной лампой (--cs/--cx/--cy) и ось света --eve: утро (лучи из окна,
   пыль в свете) → вечер (окно гаснет, лампа разгорается). Лампа — сквозной объект: к финалу камера у стола,
   CTA ложится под её свет. Каталожная карточка с цифрами лежит «на столе» поверх того же зала.
   Палитра снята с кадра: paper-cream + walnut + brass-gold, акцент — зелёная банкирская лампа.
   Шрифт: Spectral + IBM Plex Mono. */
import { useEffect, useRef, useState } from "react";
import { Follow, Weather } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./archive19.css";

const HERO = "/uploads/1/animated/archive-hero.jpg";

/* count-up: анимируем число один раз при входе в вьюпорт (rAF, easeOutCubic). JS пишет только число. */
function CountUp({ to, decimals = 0, prefix = "", suffix = "", sep = false, threshold = 0.3 }:
  { to: number; decimals?: number; prefix?: string; suffix?: string; sep?: boolean; threshold?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0, start = 0;
    const dur = 1800;
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
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, threshold]);
  const txt = sep ? Math.round(v).toLocaleString("en-US") : v.toFixed(decimals);
  return <span ref={ref} className="av-num">{prefix}{txt}{suffix}</span>;
}

const PANELS = [
  { cls: "av-p1", tag: "i · the founding · 09:00", h: ["Every lamp was lit", "by a promise."],
    body: (<>Opened to the public in the winter of <CountUp to={1897} threshold={0.2} />, when a city decided its memory deserved a room with tall windows.</>) },
  { cls: "av-p2", tag: "ii · the holdings · 14:00", h: ["Catalogued", "by hand."],
    body: (<><CountUp to={148000} sep suffix=" volumes" threshold={0.2} /> shelved along oak, each spine indexed, dusted and returned to the exact inch of its place.</>) },
  { cls: "av-p3", tag: "iii · the opening · 18:00", green: true, h: ["Now the doors", "stay open."],
    body: (<>Across <CountUp to={72} suffix=" collections" threshold={0.2} />, digitised page by page — the archive that once closed at dusk no longer closes at all.</>) },
];

export function Archive19() {
  return (
    <ScrollStage className="av editorial-motion">
      {/* КАМЕРА И СВЕТ ДНЯ — от окна к лампе, от утра к вечеру */}
      <Follow stops={[
        { at: ".av-cover", vars: { "--cs": 1, "--cx": 0, "--cy": 0, "--eve": 0 } },
        { at: ".av-p1", vars: { "--cs": 1.08, "--cx": -1, "--cy": -1, "--eve": 0.08 } },
        { at: ".av-p2", vars: { "--cs": 1.2, "--cx": -3, "--cy": -3, "--eve": 0.36 } },
        { at: ".av-p3", vars: { "--cs": 1.34, "--cx": -5, "--cy": -5, "--eve": 0.66 } },
        { at: ".av-ledger", vars: { "--cs": 1.5, "--cx": -8, "--cy": -8, "--eve": 0.84 } },
        { at: ".av-end", vars: { "--cs": 1.75, "--cx": -12, "--cy": -16, "--eve": 1 } },
      ]} />

      {/* ЗАЛ — один кадр под всеми главами */}
      <div className="av-world" aria-hidden>
        <div className="av-cam">
          <div className="av-plate" style={{ backgroundImage: `url(${HERO})` }} />
          <div className="av-lamp" />
        </div>
        <div className="av-morning" />
        <div className="av-evening" />
        <div className="av-cam"><div className="av-lamp-glow" /></div>
        <div className="av-vignette" />
      </div>
      <Weather kind="dust" count={26} color="#f6e6c4" between={[".av-cover", ".av-ledger"]} world={0.3} zIndex={1} />

      {/* 0 · COVER — сразу зал в утреннем свете */}
      <Scene className="av-cover">
        <div className="av-kick"><span>MERIDIAN — ARCHIVE OF PRINTED MATTER</span><span>Nº19 · EDITORIAL</span></div>
        <div className="av-cover-in">
          <p className="av-eyebrow">catalogue vol. xix · reading room · 08:40</p>
          <h1 className="av-hero">
            <span className="av-line" style={{ ["--d" as string]: 0 }}><i>The room</i></span>
            <span className="av-line" style={{ ["--d" as string]: 1 }}><i>where the light</i></span>
            <span className="av-line av-gold" style={{ ["--d" as string]: 2 }}><i>keeps reading.</i></span>
          </h1>
        </div>
        <div className="av-cue" aria-hidden>scroll — stay until the lamp is lit ↓</div>
      </Scene>

      {/* 1–3 · ГЛАВЫ ДНЯ — зал тот же, время идёт */}
      {PANELS.map((p) => (
        <Scene key={p.cls} className={`av-panel-sec ${p.cls}`}>
          <article className="av-panel">
            <span className={`av-tag${p.green ? " av-tag-green" : ""}`}>{p.tag}</span>
            <h2>{p.h[0]}<br /><em>{p.h[1]}</em></h2>
            <p>{p.body}</p>
          </article>
        </Scene>
      ))}

      {/* 4 · LEDGER — каталожная карточка на столе под лампой */}
      <Scene className="av-ledger">
        <div className="av-card">
          <p className="av-ledger-lead">
            <span className="av-line" style={{ ["--d" as string]: 0 }}><i>An archive is not a warehouse.</i></span>
            <span className="av-line av-gold" style={{ ["--d" as string]: 1 }}><i>It is an argument for remembering.</i></span>
          </p>
          <div className="av-figs">
            <div className="av-fig"><CountUp to={12} suffix="km" /><span>of shelving, floor to arch</span></div>
            <div className="av-fig"><CountUp to={1897} /><span>the year the light came on</span></div>
            <div className="av-fig av-fig-green"><CountUp to={100} suffix="%" /><span>of pages now readable remotely</span></div>
          </div>
        </div>
      </Scene>

      {/* 5 · COLOPHON — вечер, камера у стола, CTA под светом лампы */}
      <Scene className="av-end">
        <div className="av-end-block">
          <p className="av-eyebrow av-gold">colophon · 21:10</p>
          <h2>
            <span className="av-line" style={{ ["--d" as string]: 0 }}><i>Read the</i></span>
            <span className="av-line av-gold" style={{ ["--d" as string]: 1 }}><i>whole room.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="av-btn">Request a reader&apos;s card ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
