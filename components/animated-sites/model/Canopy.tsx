"use client";
/* ПИЛОТ новой модели — «CANOPY»: иллюстрированный кино-скроллителлинг-лендинг.
   СЦЕНЫ в pinned slide-reel: закреплённый стек, следующая сцена ВЫЕЗЖАЕТ снизу и бесшовно
   накрывает предыдущую (translateY 100%→0 по прогрессу) — без пустых полей, «одно продолжает другое».
   Внутри сцены слои (bg-плита → midground → fg-вырезка feathered) параллаксят/dolly по локальному --sp.
   Ассеты: /uploads/1/animated/model/canopy/*. */
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "./canopy.css";

const A = "/uploads/1/animated/model/canopy";

type SceneDef = { id: string; bg: string; mid?: string; fg?: string; dark?: boolean; copy: React.ReactNode; fly?: boolean };
const SCENES: SceneDef[] = [
  { id: "ridge", bg: `${A}/bg.webp`, mid: `${A}/traveler.webp`, fg: `${A}/fern.webp`, copy: (
    <>
      <span className="cp-eyebrow">Guided illustrated expeditions</span>
      <h1>Walk into<br /><em>the quiet.</em></h1>
      <p>A slow route through fog-lit forests, waterfalls and moonlit meadows — one continuous painted world.</p>
      <div className="cp-cta"><a href="#" className="cp-btn">Start the journey</a><a href="#" className="cp-btn-ghost">See the route →</a></div>
    </>
  ) },
  { id: "falls", bg: `${A}/falls-bg.webp`, mid: `${A}/falls-mist.webp`, fg: `${A}/falls-rocks.webp`, copy: (
    <><span className="cp-ch-idx">Chapter 02</span><h2>The Falls</h2>
      <p>A gorge of moving water and wet stone — cool, loud, alive. Stand at the edge until the spray reaches you.</p>
      <a href="#" className="cp-ch-more">Learn more →</a></>
  ) },
  { id: "pass", bg: `${A}/dusk-forest.webp`, mid: `${A}/stag.webp`, fg: `${A}/trees.webp`, dark: true, copy: (
    <><span className="cp-ch-idx">Chapter 03</span><h2 className="cp-h-light">The Pass</h2>
      <p className="cp-p-light">Between water and meadow the trees close in — dusk, resin, and a stag that lets you through.</p>
      <a href="#" className="cp-ch-more">Learn more →</a></>
  ) },
  { id: "meadow", bg: `${A}/meadow-bg.webp`, mid: `${A}/deer.webp`, fg: `${A}/meadow-grass.webp`, dark: true, fly: true, copy: (
    <><span className="cp-ch-idx">Chapter 04</span><h2 className="cp-h-light">The Meadow</h2>
      <p className="cp-p-light">Moonlight, fireflies, and a deer that watches you pass. The route ends where the noise does.</p>
      <a href="#" className="cp-ch-more">Learn more →</a></>
  ) },
];

function useReel(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current; if (!el) return;
    const reel = el.querySelector<HTMLElement>(".cp-reel");
    const scenes = Array.from(el.querySelectorAll<HTMLElement>(".cp-scene"));
    const n = scenes.length;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer:fine)").matches;
    if (reduce) { scenes.forEach((s) => { s.style.setProperty("--enter", "1"); s.style.setProperty("--sp", "0.5"); }); return; }
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    // ОДИН кадровый цикл: Lenis + курсор + прогресс сцен считаются КАЖДЫЙ кадр → всегда синхронно с
    // рендером и текущим вьюпортом (нет рассинхрона CSS-vh ↔ JS на ресайзе/скролле). Накрытые и
    // припаркованные сцены гасим display:none — иначе стек полноэкранных слоёв мигал на ресайзе.
    const frame = (t: number) => {
      lenis.raf(t);
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3)); el.style.setProperty("--my", cy.toFixed(3));
      if (reel) {
        const r = reel.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, reel.offsetHeight - window.innerHeight));
        // enter всех сцен считаем заранее — нужен для видимости соседей
        const enters = scenes.map((_, i) => (i === 0 ? 1 : clamp((p - (i - 0.85) / n) / (0.85 / n))));
        for (let i = 0; i < n; i++) {
          const enter = enters[i];
          const sp = clamp((p - i / n) / (1 / n));
          const feather = i === 0 ? 0 : clamp((1 - enter) * 6);
          const s = scenes[i];
          // Держим в композиторе только сцены вокруг текущего перехода: полностью накрытые
          // следующей и ещё припаркованные под вьюпортом выключаем через display:none —
          // их GPU-слои реально освобождаются. Иначе к сценам 3–4 копятся все слои стека →
          // на переходе и особенно на ресайзе браузер мигает пустыми заглушками.
          const covered = i + 1 < n && enters[i + 1] >= 1;
          const parked = i > 0 && enter <= 0;
          const hidden = covered || parked;
          const want = hidden ? "none" : "";
          if (s.style.display !== want) s.style.display = want;
          s.style.setProperty("--enter", enter.toFixed(4));
          s.style.setProperty("--sp", sp.toFixed(4));
          s.style.setProperty("--feather", feather.toFixed(4));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; };
    if (fine) addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); removeEventListener("pointermove", onMove); };
  }, [root]);
}

export function Canopy() {
  const ref = useRef<HTMLDivElement>(null);
  useReel(ref);
  return (
    <div className="cp" ref={ref}>
      <header className="cp-nav">
        <span className="cp-brand">CANOPY<i>°</i></span>
        <nav><a href="#">Field</a><a href="#">Routes</a><a href="#">Journal</a><a href="#" className="cp-nav-cta">Start the journey</a></nav>
      </header>

      {/* SLIDE-REEL: закреплённый стек сцен, бесшовно наезжающих друг на друга */}
      <div className="cp-reel" style={{ ["--n" as string]: SCENES.length, height: `calc(${SCENES.length} * 125vh)` }}>
        <div className="cp-reel-stage">
          {SCENES.map((sc, i) => (
            <section key={sc.id} className={`cp-scene ${sc.dark ? "cp-scene-dark" : ""}`} style={{ ["--i" as string]: i, zIndex: i + 1 }} data-scene={sc.id}>
              <div className="cp-layer cp-bg" style={{ backgroundImage: `url(${sc.bg})` }} aria-hidden />
              <div className="cp-haze" aria-hidden />
              {i > 0 && <div className="cp-mist" aria-hidden />}
              {sc.mid && <div className="cp-layer cp-mid" aria-hidden><span className="cp-shadow" /><img src={sc.mid} alt="" /></div>}
              {sc.fg && <div className="cp-layer cp-fg" aria-hidden><img src={sc.fg} alt="" /></div>}
              {sc.fly && <>{[1, 2, 3, 4, 5].map((k) => <span key={k} className={`cp-fly cp-fly-${k}`} aria-hidden />)}</>}
              <div className="cp-scene-copy">{sc.copy}</div>
            </section>
          ))}
          <div className="cp-scrollcue" aria-hidden>descend ↓</div>
        </div>
      </div>

      {/* 04 · STORY — тихая зона чтения */}
      <section className="cp-intro"><p><em>Four chapters, one walk.</em> Dawn ridge, the falls, the pass, the night meadow — hand-painted scenes you move through, not past.</p></section>

      {/* 05 · КАК ЭТО РАБОТАЕТ — 3 шага вдоль пути */}
      <section className="cp-steps">
        <span className="cp-kicker">How a route works</span>
        <div className="cp-steps-row">
          {[["Choose a season", "Spring thaw, high summer, first snow — the world repaints itself four times a year."],
            ["We draw the route", "A cartographer and an illustrator plot two quiet days, hut to hut, and paint the map by hand."],
            ["You walk into it", "Small groups, no signal, a guide who knows where the deer cross. You just follow the light."]].map(([t, s], i) => (
            <article className="cp-step" key={i}><span className="cp-step-n">0{i + 1}</span><h3>{t}</h3><p>{s}</p></article>
          ))}
        </div>
      </section>

      {/* 06 · ГЛАВЫ — 4 карточки */}
      <section className="cp-feat">
        {[["01", "The Ridge", "Dawn over the treeline — mist, god-rays, first light."],
          ["02", "The Falls", "A gorge of moving water and wet stone, cool and loud."],
          ["03", "The Pass", "Dusk in the pines — resin, shadow, a watching stag."],
          ["04", "The Meadow", "Moonlight, fireflies, a deer that watches you pass."]].map(([nn, t, s]) => (
          <article className="cp-feat-card" key={nn}><span className="cp-feat-n">{nn}</span><h3>{t}</h3><p>{s}</p><a href="#">Learn more →</a></article>
        ))}
      </section>

      {/* 07 · ГАЛЕРЕЯ — сезонные виды (плиты как обложки) */}
      <section className="cp-gallery">
        <div className="cp-gallery-head"><span className="cp-kicker">The same route, four moods</span><h2>Come back and it’s a different painting.</h2></div>
        <div className="cp-gallery-row">
          {[[`${A}/bg.webp`, "Dawn"], [`${A}/falls-bg.webp`, "High water"], [`${A}/dusk-forest.webp`, "Dusk"], [`${A}/meadow-bg.webp`, "Night"]].map(([src, cap], i) => (
            <figure className="cp-gal" key={i} style={{ backgroundImage: `url(${src})` }}><figcaption>{cap as string}</figcaption></figure>
          ))}
        </div>
      </section>

      {/* 08 · ДОВЕРИЕ — цифры */}
      <section className="cp-trust">
        {[["120", "hand-painted km"], ["4", "seasons, four worlds"], ["6", "walkers per route, max"], ["0", "bars of signal"]].map(([n, l], i) => (
          <div className="cp-trust-cell" key={i}><b>{n}</b><span>{l}</span></div>
        ))}
      </section>

      {/* 09 · СДЕЛКА — оффер + CTA */}
      <section className="cp-deal">
        <div className="cp-deal-card">
          <span className="cp-kicker">The two-day route</span>
          <div className="cp-price"><b>€480</b><span>/ person · guide, huts &amp; meals</span></div>
          <p>Everything but the walking is arranged. Reserve a date and we’ll send the painted map.</p>
          <a href="#" className="cp-btn">Reserve a route</a>
          <span className="cp-deal-note">Free to reschedule · Small groups only</span>
        </div>
      </section>

      {/* 10 · КУЛЬМИНАЦИЯ + CTA */}
      <section className="cp-climax" style={{ backgroundImage: `url(${A}/meadow-bg.webp)` }}>
        <div className="cp-climax-veil" aria-hidden />
        <div className="cp-climax-copy"><h2>The quiet is <em>a two-day walk</em> from here.</h2><a href="#" className="cp-btn">Start the journey</a></div>
      </section>

      {/* 11 · FOOTER */}
      <footer className="cp-foot"><span className="cp-brand">CANOPY<i>°</i></span><span>Guided illustrated expeditions · Est. nowhere in particular</span></footer>
    </div>
  );
}
