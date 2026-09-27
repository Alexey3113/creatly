"use client";
/* ANIMATED · Nº07 — «ORBIT» (класс 3d-product-theatre → СВЕТ ОБХОДИТ ФОРМУ).
   Одна форма — fixed-слой под всеми главами (без второй копии на стыке). Облёта камерой нет (один ракурс),
   поэтому по орбите идёт СВЕТ: scene-kit <Follow> ведёт угол источника --ang через всю страницу — точка на
   орбите вокруг формы, светлая и теневая стороны, студийная тень под формой поворачиваются вместе с ним.
   Главы MASS → CURVE → VOID — по одной, каждая при своём положении света (без сменяющихся плашек).
   Палитра ИЗ КАДРА: high-key bone + ink + тёплый песок. Fraunces + Jost. */
import { Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./orbit07.css";

const HERO = "/uploads/1/animated/orbit-hero.jpg";

const SPECS: [string, string][] = [
  ["STUDY", "Orbit, Nº VII"],
  ["FORM", "hand-shaped, matte clay"],
  ["SCALE", "38 × 22 cm · unique"],
  ["FINISH", "raw bisque, unglazed"],
];

const CHAPTERS = [
  { cls: "or-c1", idx: "01 · 10 o'clock light", t: "Mass", s: "weight, held loosely", side: "r" },
  { cls: "or-c2", idx: "02 · 3 o'clock light", t: "Curve", s: "the line, doubled back", side: "l" },
  { cls: "or-c3", idx: "03 · backlight", t: "Void", s: "the space it keeps", side: "r" },
];

export function Orbit07() {
  return (
    <ScrollStage className="or">
      {/* ОРБИТА СВЕТА — угол источника и положение формы на всю страницу */}
      <Follow stops={[
        { at: ".or-cover", vars: { "--ang": 210, "--bx": 14, "--by": 2, "--cs": 0.92, "--key": 0.5 } },
        { at: ".or-c1", vars: { "--ang": 225, "--bx": -16, "--by": 0, "--cs": 1, "--key": 1 } },
        { at: ".or-c2", vars: { "--ang": 350, "--bx": 16, "--by": 0, "--cs": 1.04, "--key": 1 } },
        { at: ".or-c3", vars: { "--ang": 450, "--bx": -16, "--by": 0, "--cs": 1.08, "--key": 1 } },
        { at: ".or-end", vars: { "--ang": 570, "--bx": 0, "--by": -13, "--cs": 0.8, "--key": 0.4 } },
      ]} />

      <div className="or-world" aria-hidden>
        <div className="or-room" />
        <div className="or-cam">
          <i className="or-shadow" />
          <div className="or-object" style={{ backgroundImage: `url(${HERO})` }} />
          <i className="or-shade" />
          <svg className="or-ring" viewBox="-100 -40 200 80" preserveAspectRatio="none"><ellipse cx="0" cy="0" rx="96" ry="36" /></svg>
          <i className="or-lamp" />
        </div>
      </div>

      {/* 0 · COVER — форма справа, заголовок в свободной половине */}
      <Scene className="or-cover">
        <div className="or-kick"><span>ORBIT — OBJECT STUDY</span><span>Nº07 · FORM GALLERY</span></div>
        <div className="or-cover-copy">
          <p className="or-eyebrow">a single form, studied in the light</p>
          <h1 className="or-hero">
            <span className="or-line" style={{ ["--d" as string]: 0 }}><i>A shape</i></span>
            <span className="or-line or-gold" style={{ ["--d" as string]: 1 }}><i>turned</i></span>
            <span className="or-line" style={{ ["--d" as string]: 2 }}><i>in the light.</i></span>
          </h1>
        </div>
        <div className="or-cue" aria-hidden>scroll — walk the light around it ↓</div>
      </Scene>

      {CHAPTERS.map((c, i) => (
        <Scene key={c.cls} className={`or-ch ${c.cls} or-ch-${c.side}`}>
          <div className="or-ch-in">
            <span className="or-card-idx">{c.idx}</span>
            <h2>{c.t}</h2>
            <span className="or-card-sub">{c.s}</span>
            {i === 2 && (
              <ul className="or-specs">
                {SPECS.map(([k, v], j) => (
                  <li key={j} className="or-spec" style={{ ["--i" as string]: j }}>
                    <span className="or-spec-k">{k}</span><span className="or-spec-v">{v}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Scene>
      ))}

      {/* 4 · OUTRO — свет сделал круг, форма ждёт */}
      <Scene className="or-end">
        <div className="or-end-block">
          <h2>
            <span className="or-line" style={{ ["--d" as string]: 0 }}><i>Take home</i></span>
            <span className="or-line or-gold" style={{ ["--d" as string]: 1 }}><i>the piece.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="or-btn">Acquire the piece ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
