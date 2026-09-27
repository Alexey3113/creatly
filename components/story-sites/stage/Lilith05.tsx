"use client";
/* STORY v2 · ПИЛОТ 5 — «LILITH» (pin 4: occult-romantic, forest-green-black/bone/oxblood, рога+крылья,
   орнамент-вордмарк, юстированные колонки+✕). Движок StageDeck. Архетипы (своя последовательность):
   Occluded Idol(вордмарк+колонки) → Type Guillotine(wipe-y) → Split Persona(wipe-x, чисто) →
   Negative-Space Monument(iris) → Contact-Sheet(drop) → Final(iris). Фото lilith-*. Текст = HTML. */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./lilith05.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Lilith05() {
  return (
    <div className="ll-site">
      <header className="ll-head">
        <Link href="/story2" className="ll-brand">LILITH</Link>
        <nav className="ll-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Myth</a>
          <a href="#" onClick={stop}>Wings</a>
          <a href="#" onClick={stop} className="ll-cta">Descend</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — вордмарк + юстированные колонки */}
        <div transition="iris" className="scene-body ll-cover">
          <div className="ll-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ll-wordmark">
            <span aria-hidden>LILITH</span>
          </Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.05 }} to={{ y: "0vh", scale: 1 }} className="ll-cover-fig">
            <SceneMedia src={`${A}/lilith-hero-cut.png`} alt="Lilith — рогатая крылатая фигура" />
          </Layer>
          <div className="ll-cols" aria-hidden>
            <p className="ll-col-l">Она стоит между светом и тенью — фигура, изгнанная из покоя. Она не рождена, чтобы склоняться. Её крылья помнят каждое небо, что отвергло её, и каждую тьму, что назвала её домом.</p>
            <p className="ll-col-r">Мягкость её черт обманчива — за ней вес полёта. Она не демон и не ангел, но между. Она — шёпот свободы для тех, кто устал просить разрешения дышать.</p>
          </div>
          <div className="ll-xmarks" aria-hidden><span>✕</span><span>✕</span><span>✕</span><span>✕</span></div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ll-cover-hi">
            <span className="ll-eyebrow">✕ between light & shadow ✕</span>
            <p>Она — шёпот свободы. Спускайся — и услышь.</p>
          </Layer>
          <div className="ll-grain" aria-hidden />
          <div className="ll-scrollcue" aria-hidden>fall ▾</div>
        </div>

        {/* 1 · TYPE GUILLOTINE (wipe-y) */}
        <div transition="wipe-y" className="scene-body ll-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="ll-guillo-fig kb-media">
            <SceneMedia src={`${A}/lilith-portrait-b.jpg`} alt="Lilith — портрет" />
          </Layer>
          <div className="ll-guillo-veil" aria-hidden />
          <div className="ll-guillo-type" aria-hidden><span>FALLEN</span><span className="ll-guillo-it">divine</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ x: "-40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="ll-guillo-cap">
            <span className="ll-folio">canto I — the fall</span>
            <p>Её ноги подчинились приказу. Душа — нет. Один взгляд назад: не чтобы предать, а чтобы оплакать то, что было.</p>
          </Layer>
          <div className="ll-grain" aria-hidden />
        </div>

        {/* 2 · SPLIT PERSONA (wipe-x, чисто — без glitch) */}
        <div transition="wipe-x" className="scene-body ll-split">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ x: "-6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ll-split-a">
            <SceneMedia src={`${A}/lilith-hero.jpg`} alt="Lilith — свет" />
          </Layer>
          <Layer z={2} depth={0.1} phase={[0.06, 1]} from={{ x: "6vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="ll-split-b">
            <SceneMedia src={`${A}/lilith-portrait-b.jpg`} alt="Lilith — тень" />
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ opacity: 0, scale: 1.08 }} to={{ opacity: 1, scale: 1 }} className="ll-split-type">
            <span>свет и тьма — в одном дыхании</span>
            <b>Light <em>&</em> Shadow</b>
          </Layer>
          <div className="ll-grain" aria-hidden />
        </div>

        {/* 3 · NEGATIVE-SPACE MONUMENT (iris) */}
        <div transition="iris" className="scene-body ll-mono">
          <div className="ll-mono-bg" aria-hidden />
          <Layer z={2} depth={0.5} phase={[0, 1]} from={{ scale: 0.92, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="ll-mono-word">
            <span>Fall<em>.</em></span>
          </Layer>
          <Layer z={4} depth={0.18} phase={[0.2, 0.8]} from={{ y: "4vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="ll-mono-cap">
            <span className="ll-folio">canto II — the silence</span>
            <p>В тишине между падением и полётом рождается свобода. Не проси разрешения. Просто раскрой крылья.</p>
          </Layer>
          <div className="ll-grain" aria-hidden />
        </div>

        {/* 4 · ARCANA — расклад таро: карты с римскими цифрами (не сетка) */}
        <div transition="drop" className="scene-body ll-arcana">
          <div className="ll-arcana-bg" aria-hidden />
          <div className="ll-arcana-head" aria-hidden><b>The Arcana</b><span>the myth of Lilith</span></div>
          <div className="ll-arcana-spread">
            <figure className="ll-card ll-card-1"><span className="ll-card-n" aria-hidden>I</span><img src={`${A}/lilith-hero.jpg`} alt="Lilith — икона" loading="lazy" /><figcaption>The Idol</figcaption></figure>
            <figure className="ll-card ll-card-2"><span className="ll-card-n" aria-hidden>II</span><img src={`${A}/lilith-still-2.jpg`} alt="Чёрные крылья" loading="lazy" /><figcaption>The Wings</figcaption></figure>
            <figure className="ll-card ll-card-3"><span className="ll-card-n" aria-hidden>III</span><img src={`${A}/lilith-still-1.jpg`} alt="Рога — деталь" loading="lazy" /><figcaption>The Horns</figcaption></figure>
            <figure className="ll-card ll-card-4"><span className="ll-card-n" aria-hidden>IV</span><img src={`${A}/lilith-portrait-b.jpg`} alt="Lilith — тень" loading="lazy" /><figcaption>The Shadow</figcaption></figure>
          </div>
          <div className="ll-arcana-code" aria-hidden>she was caught between mercy and memory · forever looking back</div>
          <div className="ll-grain" aria-hidden />
        </div>

        {/* 5 · INVOCATION — оккультная воззвание-карта: фазы луны + сигил (не центр-слоган+кнопка) */}
        <div transition="iris" className="scene-body ll-invoke">
          <div className="ll-invoke-bg" aria-hidden />
          <div className="ll-invoke-frame">
            <div className="ll-moons" aria-hidden><span>◐</span><span>◑</span><span>●</span><span>◒</span><span>◓</span></div>
            <span className="ll-invoke-small">between light &amp; shadow</span>
            <h4>Descend</h4>
            <span className="ll-invoke-sigil" aria-hidden>✕</span>
            <a href="#" onClick={stop} className="ll-btn">Spread your wings ✕</a>
            <div className="ll-links"><a href="#" onClick={stop}>Myth</a><a href="#" onClick={stop}>Grimoire</a><a href="#" onClick={stop}>Contact</a></div>
          </div>
          <div className="ll-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
