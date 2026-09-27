"use client";
/* SCENE-KIT · АТМОСФЕРА и БЭКДРОП — фон как участник сюжета.
   <Atmosphere> интерполирует цвет(а) по якорям и пишет CSS-переменные на цель (по умолчанию корень сайта):
     --atm (основной), --atm2 (второй), --atm-rgb (для rgba()). Лендинг красит фон через var(--atm) —
     свет мира продолжается под блоками (рассвет → ночь), а не «плоский цвет брошюры».
   <Backdrop> — закреплённая плита мира ПОД блоками лендинга: кросс-фейд плит по якорям + медленный наезд.
     Рендерится в корне сайта (корень должен быть isolation:isolate), z-index:-1 — под секциями;
     секции, где мир должен просвечивать, делают фон прозрачным/полупрозрачным. */
import { useEffect, useRef } from "react";
import { subscribe, smooth } from "./clock";
import { segment, selectorCache, parseColor, mixColor } from "./anchors";
import "./scene-kit.css";

export type AtmStop = { at: string; color: string; color2?: string; anchor?: number };

export function Atmosphere({ stops, target, line = 0.5 }: { stops: AtmStop[]; target?: string; line?: number }) {
  const key = JSON.stringify(stops);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const list: AtmStop[] = JSON.parse(key);
    const els = selectorCache(list.map((s) => s.at));
    const anchors = list.map((s) => s.anchor ?? 0.5);
    const c1 = list.map((s) => parseColor(s.color));
    const c2 = list.map((s) => parseColor(s.color2 ?? s.color));
    const host = (target ? document.querySelector<HTMLElement>(target) : ref.current?.parentElement) ?? document.documentElement;
    let last = "";
    return subscribe(({ vh }) => {
      const seg = segment(els(), vh, anchors, line);
      if (!seg) return;
      const k = smooth(seg.t);
      const a = mixColor(c1[seg.a], c1[seg.b], k);
      if (a === last) return;
      last = a;
      host.style.setProperty("--atm", a);
      host.style.setProperty("--atm2", mixColor(c2[seg.a], c2[seg.b], k));
      host.style.setProperty("--atm-rgb", a.replace(/rgb\(|\)/g, "").replace(/ /g, ", "));
    });
  }, [key, target, line]);
  return <span ref={ref} hidden aria-hidden />;
}

export type Plate = { at: string; src: string; anchor?: number; pos?: string };

export function Backdrop({
  plates,
  dim = 0.5,
  blur = 0,
  tint,
  from,
  className = "",
}: {
  plates: Plate[];
  /** затемнение 0..1 (контраст для блоков поверх) */
  dim?: number;
  blur?: number;
  /** цвет вуали (по умолчанию var(--atm, #000)) */
  tint?: string;
  /** селектор, с которого бэкдроп проявляется (обычно первая секция лендинга) */
  from?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(plates);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const list: Plate[] = JSON.parse(key);
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".sk-bd-plate"));
    const els = selectorCache(list.map((p) => p.at));
    const anchors = list.map((p) => p.anchor ?? 0.5);
    const start = from ? selectorCache([from]) : null;
    return subscribe(({ vh, y, reduced }) => {
      // проявление бэкдропа: от момента, когда верх `from` у низа экрана, до его прихода на середину
      let vis = 1;
      if (start) {
        const s = start()[0];
        if (s) { const r = s.getBoundingClientRect(); vis = smooth((vh - r.top) / (vh * 0.6)); }
      }
      root.style.opacity = vis.toFixed(3);
      root.style.visibility = vis < 0.01 ? "hidden" : "";
      if (vis < 0.01) return;
      const seg = segment(els(), vh, anchors, 0.5);
      if (!seg) return;
      const k = smooth(seg.t);
      const drift = reduced ? 1.04 : 1.04 + ((y / vh) % 6) * 0.004;
      layers.forEach((l, i) => {
        const o = i === seg.a ? (seg.a === seg.b ? 1 : 1 - k) : i === seg.b ? k : 0;
        l.style.opacity = o.toFixed(3);
        l.style.transform = `scale(${drift.toFixed(4)})`;
      });
    });
  }, [key, from]);
  return (
    <div ref={ref} className={`sk-backdrop ${className}`} aria-hidden style={{ ["--sk-dim" as string]: dim, ["--sk-blur" as string]: `${blur}px`, ["--sk-tint" as string]: tint ?? "var(--atm, #000)" }}>
      {plates.map((p, i) => (
        <div key={i} className="sk-bd-plate" style={{ backgroundImage: `url(${p.src})`, backgroundPosition: p.pos ?? "50% 50%" }} />
      ))}
      <div className="sk-bd-veil" />
    </div>
  );
}
