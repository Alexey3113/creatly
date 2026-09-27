"use client";
/* ANIMATED · Nº04 — «ASCEND» (класс scroll-reveal → ОДНО ВОСХОЖДЕНИЕ НАД ОБЛАКАМИ).
   Альпийский кадр — fixed-мир под всей страницей (первый экран = начало подъёма, без второй копии фото на
   стыке). scene-kit <Follow> по якорям глав: --asc (камера поднимается — хребты уходят вниз, над ними
   открывается небо высоты), --sea (море облаков заливает долины), --wipe (облачный слой закрывает кадр на
   склейке «подход → над погодой»), --route (линия маршрута прорисовывается к вершине). Высотомер 2400 → 4810 m.
   Палитра — из кадра: peach dawn + cool alpine blue. Instrument Serif + Archivo. */
import { Follow } from "@/components/scene-kit";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "../engine/scrollstage.css";
import "./ascend04.css";

const HERO = "/uploads/1/animated/ascend-hero.jpg";

export function Ascend04() {
  return (
    <ScrollStage className="as">
      <Follow stops={[
        { at: ".as-cover", vars: { "--asc": 0, "--sea": 0.08, "--wipe": 0, "--route": 0 } },
        { at: ".as-ch1", vars: { "--asc": 0.3, "--sea": 0.3, "--wipe": 0, "--route": 0.5 } },
        { at: ".as-ch1", anchor: 0.95, vars: { "--asc": 0.46, "--sea": 0.6, "--wipe": 1, "--route": 0.66 } },
        { at: ".as-ch2", anchor: 0.45, vars: { "--asc": 0.72, "--sea": 0.78, "--wipe": 0, "--route": 1 } },
        { at: ".as-end", vars: { "--asc": 1, "--sea": 0.92, "--wipe": 0, "--route": 1 } },
      ]} />
      <Follow round stops={[
        { at: ".as-cover", vars: { "--alt": 2400 } },
        { at: ".as-ch2", anchor: 0.45, vars: { "--alt": 4810 } },
      ]} />

      {/* МИР — кадр, небо высоты над ним, маршрут, море облаков */}
      <div className="as-world" aria-hidden>
        <div className="as-sky" />
        <div className="as-cam">
          <div className="as-plate" style={{ backgroundImage: `url(${HERO})` }} />
          <svg className="as-route" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="as-route-bg" d="M9 97 L15 82 L12 66 L19 52 L23 40 L27 26 L30.5 15" />
            <path className="as-route-fg" pathLength="1" d="M9 97 L15 82 L12 66 L19 52 L23 40 L27 26 L30.5 15" />
          </svg>
          <span className="as-flag" />
        </div>
        <div className="as-sea as-sea-back" />
        <div className="as-sea as-sea-front" />
        <div className="as-wipe" />
        <div className="as-shade" />
      </div>
      <div className="as-alt" aria-hidden><span>ALT</span><b /></div>

      {/* 0 · COVER — начало подъёма */}
      <Scene className="as-cover">
        <div className="as-kick"><span>MERIDIAN</span><span>Nº04 · HIGH ROUTES</span></div>
        <div className="as-cover-copy">
          <p className="as-eyebrow">alpine expeditions, above the weather</p>
          <h1 className="as-hero">
            <span className="as-line" style={{ ["--d" as string]: 0 }}><i>Where the</i></span>
            <span className="as-line" style={{ ["--d" as string]: 1 }}><i>map runs</i></span>
            <span className="as-line as-warm" style={{ ["--d" as string]: 2 }}><i>out of air.</i></span>
          </h1>
        </div>
        <div className="as-cue" aria-hidden>scroll — climb the line ↓</div>
      </Scene>

      {/* 1 · ПОДХОД */}
      <Scene className="as-ch as-ch1">
        <div className="as-ch-in">
          <span className="as-tag">01 — the approach</span>
          <h2>Glaciers first,<br /><em>then the ridge.</em></h2>
          <p>We leave the hut at four. By first light the valley is a rumour below the ice.</p>
        </div>
      </Scene>

      {/* 2 · НАД ПОГОДОЙ */}
      <Scene className="as-ch as-ch2">
        <div className="as-ch-in">
          <span className="as-tag">02 — above the weather</span>
          <h2>Six ranges.<br />Forty summits.<br /><em>One horizon.</em></h2>
        </div>
      </Scene>

      {/* 3 · OUTRO — над морем облаков, CTA */}
      <Scene className="as-end">
        <div className="as-end-block">
          <h2>
            <span className="as-line" style={{ ["--d" as string]: 0 }}><i>Book the line</i></span>
            <span className="as-line as-warm" style={{ ["--d" as string]: 1 }}><i>above the clouds.</i></span>
          </h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="as-btn">Plan an ascent ↗</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
