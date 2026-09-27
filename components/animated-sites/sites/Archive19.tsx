"use client";
/* ANIMATED · Nº19 — «MERIDIAN ARCHIVE» (класс editorial-motion, приём pinned-photo + cross-fade копи-панелей).
   Читальный зал в лучах закреплён на весь скраб (лёгкий ken-burns scale по --t); поверх по прогрессу
   СМЕНЯЮТСЯ редакционные копи-панели — окна --t гасят предыдущую и вводят следующую (cross-fade + clip).
   Внутри панелей — inline count-up (год основания / число томов) настоящим rAF при входе в вьюпорт.
   Палитра снята с кадра: paper-cream + walnut brown + brass-gold, акцент — зелёная банкирская лампа.
   Бренд MERIDIAN — архив печатной материи. Шрифт: Spectral (serif-герой) + IBM Plex Mono (лейблы/числа). */
import { useEffect, useRef, useState } from "react";
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

export function Archive19() {
  return (
    <ScrollStage className="av editorial-motion">
      {/* 0 · COVER — бумажная обложка, засечный герой */}
      <Scene className="av-cover">
        <div className="av-kick"><span>MERIDIAN — ARCHIVE OF PRINTED MATTER</span><span>Nº19 · EDITORIAL</span></div>
        <div className="av-cover-in">
          <p className="av-eyebrow">catalogue vol. xix · reading room</p>
          <h1 className="av-hero">
            <span className="av-line" style={{ ["--d" as string]: 0 }}><i>The room</i></span>
            <span className="av-line" style={{ ["--d" as string]: 1 }}><i>where the light</i></span>
            <span className="av-line av-gold" style={{ ["--d" as string]: 2 }}><i>keeps reading.</i></span>
          </h1>
        </div>
        <div className="av-cue" aria-hidden>scroll — turn the pages ↓</div>
      </Scene>

      {/* 1 · PINNED READING ROOM — кадр закреплён, ken-burns по --t, копи-панели сменяются */}
      <Scene className="av-room" pinned vh={300}>
        <div className="av-photo" aria-hidden>
          <img src={HERO} alt="" className="cine-media" />
          <div className="av-grade" />
          <div className="av-vignette" />
        </div>

        {/* прогресс-корешок сбоку */}
        <div className="av-spine" aria-hidden><span className="av-spine-fill" /></div>
        <div className="av-chapter" aria-hidden>— from the standing collection</div>

        {/* панель 1 · окно --t 0.00–0.34 */}
        <article className="av-panel" style={{ ["--s" as string]: 0.0, ["--e" as string]: 0.34 }}>
          <span className="av-tag">i · the founding</span>
          <h2>Every lamp was lit<br /><em>by a promise.</em></h2>
          <p>Opened to the public in the winter of <CountUp to={1897} threshold={0.2} />, when a city
            decided its memory deserved a room with tall windows.</p>
        </article>

        {/* панель 2 · окно --t 0.33–0.67 */}
        <article className="av-panel" style={{ ["--s" as string]: 0.33, ["--e" as string]: 0.67 }}>
          <span className="av-tag">ii · the holdings</span>
          <h2>Catalogued<br /><em>by hand.</em></h2>
          <p><CountUp to={148000} sep suffix=" volumes" threshold={0.2} /> shelved along oak, each spine
            indexed, dusted and returned to the exact inch of its place.</p>
        </article>

        {/* панель 3 · окно --t 0.66–1.00 */}
        <article className="av-panel" style={{ ["--s" as string]: 0.66, ["--e" as string]: 1.01 }}>
          <span className="av-tag av-tag-green">iii · the opening</span>
          <h2>Now the doors<br /><em>stay open.</em></h2>
          <p>Across <CountUp to={72} suffix=" collections" threshold={0.2} />, digitised page by page —
            the archive that once closed at dusk no longer closes at all.</p>
        </article>
      </Scene>

      {/* 2 · LEDGER — редакционная строка + тихая статистика на бумаге */}
      <Scene className="av-ledger">
        <p className="av-ledger-lead">
          <span className="av-line" style={{ ["--d" as string]: 0 }}><i>An archive is not a warehouse.</i></span>
          <span className="av-line av-gold" style={{ ["--d" as string]: 1 }}><i>It is an argument for remembering.</i></span>
        </p>
        <div className="av-figs">
          <div className="av-fig"><CountUp to={12} suffix="km" /><span>of shelving, floor to arch</span></div>
          <div className="av-fig"><CountUp to={1897} /><span>the year the light came on</span></div>
          <div className="av-fig av-fig-green"><CountUp to={100} suffix="%" /><span>of pages now readable remotely</span></div>
        </div>
      </Scene>

      {/* 3 · COLOPHON — закрытие на тёплой бумаге, CTA */}
      <Scene className="av-end">
        <div className="av-end-block">
          <p className="av-eyebrow av-gold">colophon</p>
          <h2>
            <span className="av-line" style={{ ["--d" as string]: 0 }}><i>Read the</i></span>
            <span className="av-line av-gold" style={{ ["--d" as string]: 1 }}><i>whole room.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="av-btn">Request a reader's card ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
