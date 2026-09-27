"use client";
/* ANIMATED · Nº17 — «FORGE» (класс kinetic-typography, приём «карты летят сквозь фиксированный
   гигантский шрифт»). Гигант-слово FORGE закреплено в sticky-вьюпорте pin-сцены; сквозь его
   негативное пространство по --t проезжают 4 карты-капабилити. Motion-blur — 2 ghost-копии card-силуэта,
   разъезжаются по --vel (скорость скролла): стоишь — чисто, гонишь — смаз. Ноль ассетов, ноль JS.
   Палитра: сталь + near-black + один красный tab-акцент. Бренд ANVIL — оригинальный build-студио.
   Сквозной объект — заготовка стали (scene-kit <Actor>): раскалённая под обложкой → проходит сквозь FORGE
   вместе с картами → остывает цветами отпуска (соломенный → бронза → синий) на полосе TEMPERED → готовая
   сталь над «BRING THE STEEL.». Нагрев --heat ведёт <Follow> на всю страницу, искры — <Weather>. */

/* якорь пин-сцены 340vh по её прогрессу t */
const pin = (t: number, V = 3.4) => (t * (V - 1) + 0.5) / V;
import { Actor, Follow, Weather } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./forge17.css";

const CARDS = [
  { n: "01", t: "SYSTEMS", d: "Design systems that hold under load." },
  { n: "02", t: "INTERFACES", d: "Product UI, tempered and shipped." },
  { n: "03", t: "MOTION", d: "The feel between the clicks." },
  { n: "04", t: "RELEASE", d: "From forge to production, cold-hammered." },
];

export function Forge17() {
  return (
    <ScrollStage className="fg kinetic-typography">
      <Follow stops={[
        { at: ".fg-cover", vars: { "--heat": 1 } },
        { at: ".fg-forge", anchor: pin(0.85), vars: { "--heat": 0.95 } },
        { at: ".fg-band", vars: { "--heat": 0.4 } },
        { at: ".fg-end", vars: { "--heat": 0.05 } },
      ]} />
      <Actor zIndex={5} width="20vw" bob={3} tilt={0.1} className="fg-ingot-actor" stops={[
        { at: ".fg-cover", pose: { x: 66, y: 80, s: 1, r: -6 } },
        { at: ".fg-forge", anchor: pin(0.05), pose: { x: 74, y: 86, s: 1.05, r: -2 } },
        { at: ".fg-forge", anchor: pin(0.5), pose: { x: 50, y: 86, s: 1.1, r: 0 } },
        { at: ".fg-forge", anchor: pin(0.95), pose: { x: 28, y: 86, s: 1.05, r: 2 } },
        { at: ".fg-band", pose: { x: 50, y: 22, s: 1.15, r: 0 } },
        { at: ".fg-end", pose: { x: 50, y: 24, s: 1.2, r: 0 } },
      ]}>
        <span className="fg-ingot"><i /></span>
      </Actor>
      <Weather kind="sparks" count={22} color="#ffb347" color2="#ff6a2a" between={[".fg-cover", ".fg-band"]} world={0.5} zIndex={4} />
      {/* 0 · COVER — грубый гротеск + красный tab */}
      <Scene className="fg-cover">
        <div className="fg-kick"><span>ANVIL — BUILD STUDIO</span><span>Nº17 · KINETIC</span></div>
        <h1 className="fg-hero" aria-label="Made to withstand">
          <span className="fg-hero-l" data-t="MADE">MADE</span>
          <span className="fg-hero-l" data-t="TO">TO</span>
          <span className="fg-hero-l fg-outline" data-t="WITHSTAND">WITHSTAND</span>
        </h1>
        <div className="fg-tab" aria-hidden><i /> forged, not printed</div>
        <div className="fg-cue" aria-hidden>scroll — watch the work pass through ↓</div>
      </Scene>

      {/* 1 · FORGE — гигант-слово фиксировано, карты летят сквозь него (pin-scrub) */}
      <Scene className="fg-forge" pinned vh={340}>
        <div className="fg-word fg-word--back" aria-hidden>FORGE</div>
        <div className="fg-cards">
          {CARDS.map((c, i) => (
            <article key={c.n} className="fg-card" style={{ ["--i" as string]: i }}>
              <span className="fg-card-n">{c.n}</span>
              <b>{c.t}</b>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
        <div className="fg-word fg-word--front" aria-hidden>FORGE</div>
        <div className="fg-forge-meta" aria-hidden><span>4 capabilities</span><span>one shop</span></div>
      </Scene>

      {/* 2 · SPEC BAND — стальная полоса-марка, наклон по velocity */}
      <Scene className="fg-band">
        <div className="fg-band-row" aria-hidden><span>{"TEMPERED · TESTED · TEMPERED · TESTED · ".repeat(4)}</span></div>
        <div className="fg-spec">
          <div><b>0.2mm</b><span>tolerance</span></div>
          <div><b>1450°</b><span>working heat</span></div>
          <div className="fg-spec-red"><b>∞</b><span>revisions killed</span></div>
          <div><b>Δ</b><span>ship weight</span></div>
        </div>
      </Scene>

      {/* 3 · CLOSER — красный акцент */}
      <Scene className="fg-end">
        <h2 className="fg-end-h" aria-hidden>BRING<br /><span className="fg-end-red">THE STEEL.</span></h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="fg-btn">Start a build ↗</a>
      </Scene>
    </ScrollStage>
  );
}
