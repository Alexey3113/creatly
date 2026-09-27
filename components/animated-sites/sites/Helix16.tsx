"use client";
/* ANIMATED · Nº16 — «HELIX» (класс 3d-product-theatre, приём scroll-scrub ДНК-спираль).
   Один WebGL2-контекст/страница (useHelix): realtime двойная спираль из светящихся точек вращается
   по глубине по u_time и ЕДЕТ вдоль оси по u_scroll (пролёт вдоль strand); базовые пары (ноды)
   загораются, проходя фокальную плоскость — лёгкий rack-focus; фоновые боке. Тонкая серифная
   типографика поверх, строки-маски, count-up. Палитра navy + amber/blue bokeh. Бренд HELIX —
   лаборатория синтетической геномики. Фолбэк: reduced/no-webgl → CSS-navy-градиент из helix16.css. */
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import { useHelix } from "../engine/useHelix";
import "../engine/scrollstage.css";
import "./helix16.css";

export function Helix16() {
  const canvas = useHelix();

  return (
    <ScrollStage className="hx product-theatre">
      {/* фуллскрин спираль (fixed) + CSS-navy-фолбэк под ней */}
      <div className="hx-bg" aria-hidden>
        <canvas ref={canvas} className="hx-canvas" />
      </div>

      {/* 0 · COVER */}
      <Scene className="hx-cover">
        <div className="hx-kick"><span>HELIX / SYNTHETIC GENOMICS</span><span>Nº16 · WEBGL</span></div>
        <div className="hx-cover-in">
          <p className="hx-eyebrow">read · edit · rebuild</p>
          <h1 className="hx-hero">
            <span className="hx-mask" style={{ ["--d" as string]: 0 }}><i>The code of life,</i></span>
            <span className="hx-mask hx-amber" style={{ ["--d" as string]: 1 }}><i>lit one rung at a time.</i></span>
          </h1>
          <p className="hx-sub">A sequencing lab where the strand is not a diagram but an instrument — scroll to travel its length and watch every base pair ignite as it passes the lens.</p>
        </div>
        <div className="hx-cue" aria-hidden>scroll — fly the strand ↓</div>
      </Scene>

      {/* 1 · READ — метрика base pairs */}
      <Scene className="hx-read">
        <div className="hx-side">
          <span className="hx-tag">01 — READ</span>
          <h2 className="hx-h2">
            <span className="hx-mask" style={{ ["--d" as string]: 0 }}><i>Three billion</i></span>
            <span className="hx-mask hx-amber" style={{ ["--d" as string]: 1 }}><i>letters, in an hour.</i></span>
          </h2>
          <div className="hx-metric">
            <span className="hx-num" aria-hidden />
            <span className="hx-unit">M base pairs / run</span>
          </div>
          <p className="hx-body">Long-read chemistry walks the double strand end to end — no assembly guesswork, no gaps left dark.</p>
        </div>
      </Scene>

      {/* 2 · NODES — центральная подпись поверх загорающихся нод */}
      <Scene className="hx-nodes">
        <div className="hx-mid">
          <span className="hx-mask" style={{ ["--d" as string]: 0 }}><i>Every mutation</i></span>
          <span className="hx-mask hx-blue" style={{ ["--d" as string]: 1 }}><i>arrives in focus.</i></span>
          <p className="hx-mid-sub">As each pair crosses the focal plane it flares — variants call themselves out before an analyst asks.</p>
        </div>
      </Scene>

      {/* 3 · CTA */}
      <Scene className="hx-end">
        <div className="hx-end-block">
          <p className="hx-end-eyebrow">from readout to rewrite</p>
          <h2 className="hx-end-h2">
            <span className="hx-mask" style={{ ["--d" as string]: 0 }}><i>Sequence</i></span>
            <span className="hx-mask hx-amber" style={{ ["--d" as string]: 1 }}><i>with us.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="hx-btn">Open a lab account ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
