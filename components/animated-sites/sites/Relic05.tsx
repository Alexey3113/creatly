"use client";
/* ANIMATED · Nº05 — «RELIC» (класс scroll-reveal → ОДИН ОБЪЕКТ, ДВЕ ТЫСЯЧИ ЛЕТ ВОКРУГ НЕГО).
   Бюст — неподвижный центр истории: кадр висит fixed-слоем под всеми главами (без второй копии на стыке),
   а вокруг меняются свет и эпохи. scene-kit <Follow> по якорям глав ведёт грейд кадра (--sep/--bri/--sat),
   веса эпох (--w1 мастерская: солнце из проёма и мраморная пыль · --w2 раскопки: земля, слои грунта,
   фонарь сверху · --w3 архив: электрик-блю кольцо) и источник света (--lx/--ly). Главы — по одной, без
   сменяющихся плашек. Палитра — из кадра: near-black + electric-blue + ivory marble. Cormorant + Archivo. */
import { Follow, Weather } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./relic05.css";

const HERO = "/uploads/1/animated/relic-hero.jpg";

const SPECS = [
  ["MEDIUM", "Parian marble"],
  ["HEIGHT", "74 cm"],
  ["ORIGIN", "Attic workshop"],
  ["LOT", "Nº 004 / XII"],
  ["STATE", "museum-grade"],
];

const ERAS = [
  { cls: "rl-e1", n: "01 · CARVED", year: "circa 40 BC · Attic workshop", h: "A chisel, a window,", em: "a face that outlived its city." },
  { cls: "rl-e2", n: "02 · BURIED", year: "unearthed 1891 · Delos", h: "Nineteen centuries of soil.", em: "Then a lantern." },
  { cls: "rl-e3", n: "03 · ARCHIVED", year: "since 1964 · in permanent light", h: "Held still,", em: "so you can move around it." },
];

export function Relic05() {
  return (
    <ScrollStage className="rl">
      {/* ВРЕМЯ ВОКРУГ БЮСТА — эпохи, грейд и свет на всю страницу */}
      <Follow stops={[
        { at: ".rl-cover", vars: { "--bx": 15, "--cs": 1, "--sep": 0, "--bri": 1, "--sat": 1, "--w1": 0, "--w2": 0, "--w3": 1, "--lx": 52, "--ly": 8 } },
        { at: ".rl-e1", vars: { "--bx": -13, "--cs": 1.04, "--sep": 0.62, "--bri": 1.12, "--sat": 1.1, "--w1": 1, "--w2": 0, "--w3": 0, "--lx": 14, "--ly": 34 } },
        { at: ".rl-e2", vars: { "--bx": -13, "--cs": 1.06, "--sep": 0.9, "--bri": 0.7, "--sat": 0.8, "--w1": 0, "--w2": 1, "--w3": 0, "--lx": 40, "--ly": 4 } },
        { at: ".rl-e3", vars: { "--bx": -13, "--cs": 1.08, "--sep": 0, "--bri": 1, "--sat": 1, "--w1": 0, "--w2": 0, "--w3": 1, "--lx": 52, "--ly": 10 } },
        { at: ".rl-end", vars: { "--bx": -12, "--cs": 1.3, "--sep": 0, "--bri": 0.92, "--sat": 1, "--w1": 0, "--w2": 0, "--w3": 0.7, "--lx": 50, "--ly": 22 } },
      ]} />

      {/* МИР — бюст неподвижен, эпохи вокруг */}
      <div className="rl-world" aria-hidden>
        <div className="rl-env rl-env-blue" />
        <div className="rl-cam">
          <i className="rl-ring" />
          <div className="rl-plate" style={{ backgroundImage: `url(${HERO})` }} />
        </div>
        <div className="rl-env rl-env-sun" />
        <div className="rl-env rl-env-soil"><i className="rl-strata" /></div>
        <div className="rl-light" />
        <div className="rl-vignette" />
      </div>
      <Weather kind="dust" count={22} color="#f3e2c4" between={[".rl-cover", ".rl-e2"]} world={0.4} zIndex={1} />
      <Weather kind="ash" count={16} color="#8a6a48" seed={11} between={[".rl-e1", ".rl-e3"]} world={0.4} zIndex={1} />

      {/* 0 · COVER — бюст справа, заголовок в свободной половине (лицо не перечёркнуто) */}
      <Scene className="rl-cover">
        <div className="rl-kick"><span>SERAPHIN</span><span>Nº05 · PRIVATE ARCHIVE</span></div>
        <div className="rl-cover-copy">
          <p className="rl-eyebrow">antiquities, held in light</p>
          <h1 className="rl-hero">
            <span className="rl-line" style={{ ["--d" as string]: 0 }}><i>One object.</i></span>
            <span className="rl-line rl-blue" style={{ ["--d" as string]: 1 }}><i>Two thousand</i></span>
            <span className="rl-line" style={{ ["--d" as string]: 2 }}><i>years of gaze.</i></span>
          </h1>
        </div>
        <div className="rl-cue" aria-hidden>scroll — travel back to the workshop ↓</div>
      </Scene>

      {/* 1–3 · ЭПОХИ — бюст тот же, время вокруг другое */}
      {ERAS.map((e, i) => (
        <Scene key={e.cls} className={`rl-era ${e.cls}`}>
          <div className="rl-era-in">
            <span className="rl-era-n">{e.n}</span>
            <span className="rl-era-year">{e.year}</span>
            <h2>{e.h}<br /><em>{e.em}</em></h2>
            {i === 2 && (
              <ul className="rl-specs">
                {SPECS.map(([k, v], j) => (
                  <li key={j} className="rl-spec" style={{ ["--i" as string]: j }}>
                    <span className="rl-spec-k">{k}</span>
                    <span className="rl-spec-v">{v}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Scene>
      ))}

      {/* 4 · OUTRO — один луч на лице, CTA */}
      <Scene className="rl-end">
        <div className="rl-end-block">
          <h2>
            <span className="rl-line" style={{ ["--d" as string]: 0 }}><i>Request a</i></span>
            <span className="rl-line rl-blue" style={{ ["--d" as string]: 1 }}><i>private viewing.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="rl-btn">Enter the archive ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
