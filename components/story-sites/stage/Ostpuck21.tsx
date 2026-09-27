"use client";
/* STORY v2 · САЙТ 17 — «OSTPUCK» (pin21: warm brown/amber baroque oil, женщина с виолончелью).
   Сквозная архитектура (аудит 2026-09): ОДНА струна через весь сайт (data-share="string").
   Струна лежит на грифе → ближе → вдоль грифа к завитку → распрямляется в нотный стан → рейку развески →
   полосу прогресса плеера. При скрабе зритель буквально ведёт смычком. Закон камеры — вперёд (push),
   fade там, где кадр несёт струна. Гриф виолончели проходит ПЕРЕД вордмарком (вырезка поверх букв).
   Свет растёт от свечи к золоту финала; героиня из салона возвращается обложкой альбома (кольцовка). */
import Link from "next/link";
import { Layer } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./ostpuck21.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

/** Струна-актёр: линия из нижнего-левого угла коробки в верхний-правый. Коробка меняет форму → линия
    поворачивается (диагональ грифа → горизонталь стана). non-scaling-stroke держит толщину. */
function Strand({ c }: { c: string }) {
  return (
    <span className={`op-string ${c}`} data-share="string" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <line className="op-str-glow" x1="0" y1="100" x2="100" y2="0" />
        <line className="op-str-core" x1="0" y1="100" x2="100" y2="0" />
        <line className="op-str-pulse" x1="0" y1="100" x2="100" y2="0" />
      </svg>
    </span>
  );
}

export function Ostpuck21() {
  return (
    <div className="op-site">
      <header className="op-head">
        <Link href="/story2" className="op-brand">OSTPUCK</Link>
        <nav className="op-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>String</a>
          <a href="#" onClick={stop}>Chord</a>
          <a href="#" onClick={stop} className="op-cta">Listen</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · ОБЛОЖКА — вордмарк ЗА грифом: струна режет слово */}
        <div transition="push" className="scene-body op-cover">
          <div className="op-cover-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-hero op-kb"><img className="op-img" src={`${A}/ostpuck-hero.jpg`} alt="Женщина с виолончелью — барокко, свет свечи" draggable={false} /></div>
          </Layer>
          <div className="op-cover-veil" aria-hidden />
          <Layer z={3} depth={0.06} phase={[0, 0.9]} from={{ opacity: 0, scale: 1.04 }} to={{ opacity: 1, scale: 1 }} className="op-wordmark"><span aria-hidden>OSTPUCK</span></Layer>
          <Layer z={4} depth={0.1} phase={[0, 1]} from={{ scale: 1.08 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-hero op-kb">
              <img className="op-img op-neck" src={`${A}/ostpuck-hero-cut.png`} alt="" aria-hidden draggable={false} />
              <Strand c="op-string-hero" />
            </div>
          </Layer>
          <div className="op-orn" aria-hidden>
            <span className="op-orn-sup">the heart is like a string</span>
            <span className="op-orn-l">◐ ◑ ◒<br />⌇ ⌇ ⌇</span>
            <span className="op-orn-r">✦ + ⌇<br />→ ⇄ ↗</span>
          </div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-cover-hi">
            <span className="op-eyebrow">a simple gesture · a chord so profound</span>
            <p>Иногда простой жест или несколько слов задевают струну так глубоко, что она отзывается в душе, пробуждая давно забытые чувства.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
          <div className="op-scrollcue" aria-hidden>play ↓</div>
        </div>

        {/* 1 · THE CHORD — наезд на гриф: та же струна крупнее */}
        <div transition="push" className="scene-body op-guillo">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-pb op-kb"><img className="op-img" src={`${A}/ostpuck-portrait-b.jpg`} alt="Портрет — пальцы на грифе" draggable={false} /></div>
          </Layer>
          <div className="op-guillo-veil" aria-hidden />
          <Layer z={4} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-pb op-kb"><Strand c="op-string-pb" /></div>
          </Layer>
          <div className="op-guillo-type" aria-hidden><span>THE</span><span className="op-guillo-it">chord</span></div>
          <Layer z={6} depth={0.24} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-guillo-cap">
            <span className="op-folio">canto I · the string</span>
            <p>Сердце — как струна. Достаточно одного касания, и оно звучит, отзываясь на то, что казалось давно умолкшим.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 2 · THE STRINGS — вдоль грифа к завитку: натюрморт при свече, струна ложится на струны */}
        <div transition="push" className="scene-body op-side">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-s1 op-kb"><img className="op-img" src={`${A}/ostpuck-still-1.jpg`} alt="Завиток и струны виолончели при свече" draggable={false} /></div>
          </Layer>
          <div className="op-side-veil" aria-hidden />
          <Layer z={4} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="op-cq">
            <div className="op-plate op-plate-s1 op-kb"><Strand c="op-string-s1" /></div>
          </Layer>
          <Layer z={6} depth={0.3} phase={[0.06, 0.7]} from={{ x: "-46px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="op-side-cap">
            <span className="op-num">01</span>
            <h2>The <em>strings</em></h2>
            <span className="op-folio">wood · gut · resonance</span>
            <p>Дерево, что дышит теплом свечи. Струны, натянутые как нервы. Инструмент, который помнит каждое прикосновение.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 3 · SCORE — струна распрямляется и становится средней линейкой нотного стана */}
        <div transition="fade" className="scene-body op-score">
          <div className="op-score-bg" aria-hidden />
          <Layer z={2} depth={0.12} phase={[0, 1]} from={{ scale: 1.06, opacity: 0.4 }} to={{ scale: 1, opacity: 1 }} className="op-score-band">
            <img className="ps-media op-kb" src={`${A}/ostpuck-extra-4.jpg`} alt="Рука на струнах виолончели" loading="lazy" draggable={false} />
          </Layer>
          <div className="op-staff" aria-hidden>
            <i /><i /><Strand c="op-string-staff" /><i /><i />
            <span className="op-note op-note-1">♪</span><span className="op-note op-note-2">♩</span><span className="op-note op-note-3">♫</span><span className="op-note op-note-4">♪</span>
            <span className="op-clef">𝄞</span>
          </div>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="op-score-cap">
            <span className="op-folio">detail · the bow · note 01</span>
            <h3>A single chord</h3>
            <p>Смычок касается струны — и рождается звук, что реверберирует сквозь душу, пробуждая эмоции, давно забытые.</p>
          </Layer>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 4 · SALON — стан поднимается и становится рейкой развески: картины висят на той же струне */}
        <div transition="fade" className="scene-body op-salon">
          <div className="op-salon-bg" aria-hidden />
          <div className="op-salon-head" aria-hidden><b>Sonata</b><span>the heart is like a string</span></div>
          <Strand c="op-string-rail" />
          <div className="op-salon-wall">
            <figure className="op-art op-art-1"><div className="op-canvas"><img src={`${A}/ostpuck-extra-3.jpg`} alt="Виолончелистка у свечи" loading="lazy" /></div><figcaption>i · adagio</figcaption></figure>
            <figure className="op-art op-art-2"><div className="op-canvas"><img src={`${A}/ostpuck-extra-1.jpg`} alt="Скрипачка в полусне" loading="lazy" /></div><figcaption>ii · largo</figcaption></figure>
            <figure className="op-art op-art-3"><div className="op-canvas"><img src={`${A}/ostpuck-extra-2.jpg`} alt="Рука на деке" loading="lazy" /></div><figcaption>iii · chord</figcaption></figure>
            <figure className="op-art op-art-4"><div className="op-canvas" data-share="art"><img src={`${A}/ostpuck-hero.jpg`} alt="Она — та же, что на обложке" loading="lazy" /></div><figcaption>iv · echo</figcaption></figure>
          </div>
          <div className="op-salon-code" aria-hidden>reverberates through the soul · awakening emotions long forgotten</div>
          <div className="op-grain" aria-hidden />
        </div>

        {/* 5 · PLAYER — рейка становится полосой прогресса, её портрет — обложкой альбома */}
        <div transition="fade" className="scene-body op-player">
          <div className="op-player-bg" aria-hidden />
          <div className="op-player-word" aria-hidden>Heartstring</div>
          <div className="op-canvas op-album" data-share="art"><img src={`${A}/ostpuck-hero.jpg`} alt="Обложка: Ostpuck — The Heart Is a String" loading="lazy" /></div>
          <div className="op-player-bar">
            <a href="#" onClick={stop} className="op-play" aria-label="Play">▸</a>
            <div className="op-player-meta"><b>Ostpuck — The Heart Is a String</b><span>a chord so profound</span></div>
            <div className="op-player-progress" aria-hidden><Strand c="op-string-progress" /><i /></div>
            <span className="op-player-time" aria-hidden>03:12</span>
          </div>
          <div className="op-player-cta">
            <a href="#" onClick={stop} className="op-btn">Listen now ♪</a>
            <div className="op-links"><a href="#" onClick={stop}>Sonata</a><a href="#" onClick={stop}>Studio</a><a href="#" onClick={stop}>Recital</a></div>
          </div>
          <div className="op-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
