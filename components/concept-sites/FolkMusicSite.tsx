"use client";
/* Концепт 15 — FOLKMUSIC «ЗОРЯ». Русь-фолк ансамбль. Кларет + золото + лён, kokoshnik-огивальная арка (портал-приём), хохлома-завитки в углах, певица в сарафане + кокошнике поверх золотого титула. Типо-персона: Playfair Display + DM Mono. Hero-приём: gold ogee arch-frame portal. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./folkmusic.css";

const A = "/uploads/1/hooks/sites/anim/folkmusic";
const stop = (e: React.MouseEvent) => e.preventDefault();

function Arch() {
  return (
    <svg viewBox="0 0 400 470" aria-hidden>
      <path className="fk-arch-fill" d="M20 460 L20 205 C20 88 132 118 200 18 C268 118 380 88 380 205 L380 460 Z" />
      <path d="M20 460 L20 205 C20 88 132 118 200 18 C268 118 380 88 380 205 L380 460" />
      <path d="M44 460 L44 210 C44 112 140 138 200 52 C260 138 356 112 356 210 L356 460" opacity="0.55" />
      <circle cx="200" cy="18" r="7" fill="var(--accent)" stroke="none" />
      <line x1="200" y1="25" x2="200" y2="58" opacity="0.5" />
    </svg>
  );
}

export function FolkMusicSite() {
  return (
    <div className="fk-site fk-poster">
      <svg className="fp-defs" aria-hidden>
        <filter id="fp-erode"><feTurbulence type="fractalNoise" baseFrequency="0.014 0.06" numOctaves="2" seed="7" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" /></filter>
      </svg>
      <header className="fk-head">
        <Link href="/visual-hooks" className="fk-brand">ЗОРЯ</Link>
        <nav className="fk-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Ансамбль</a><a href="#" onClick={stop}>Песни</a>
          <a href="#" onClick={stop}>Афиша</a><a href="#" onClick={stop} className="fk-tickets">Билеты</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="fk-hero fp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#d8d6cf" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.04 }} to={{ y: "1.5vh", scale: 1.08 }} cursor={{ x: -4, y: -3 }} className="fp-bg">
          <SceneMedia src={`${A}/paper.jpg`} />
        </Layer>
        <div className="fp-wash" aria-hidden />

        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 0.84, opacity: 0 }} to={{ scale: 1, opacity: 1 }} cursor={{ x: -10, y: -6 }} className="fp-disc">
          <i />
        </Layer>

        <Layer z={3} depth={0.28} phase={[0.02, 0.5]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -14, y: -8 }} className="fp-title">
          <span>ЗОРЯ</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0.04, 0.44]} from={{ y: "3vh", scale: 1.02, opacity: 0 }} to={{ y: "-2vh", scale: 1.06, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="fp-figure">
          <SceneMedia src={`${A}/figure2-cut.png`} alt="Folk singer in traditional dress" />
        </Layer>
        <div className="fp-grain" aria-hidden />

        <div className="fp-frame" aria-hidden />
        <div className="fp-top"><em>[</em><span>23.05</span><s /><b>ВЕЧЁРКА</b><s /><span>21:00</span><em>]</em></div>
        <div className="fp-glyph fp-g1">☩</div><div className="fp-glyph fp-g2">△</div>
        <div className="fp-col l"><i>Состав</i>ВОЛОДЯ БОРИСОВ<br />ЛАВАНДА СТАТИК<br />DJ ВЕТЕР<br />ВЕДЬМА-ХОР<br />КИЛЬ · ТIVР</div>
        <div className="fp-col r"><i>В программе</i>НОЖ ЛЮБИТ ТЕБЯ<br /><span className="d">СЛИШКОМ ГРОМКО</span><br />ПЛАКСА · ТЯЖЕСТЬ<br />ДЕКАДАНС</div>
        <div className="fp-seal"><b>ЗОРЯ</b><span>народный · обряд</span><i>№25</i></div>
        <div className="fp-barcode" aria-hidden />
        <div className="fp-cue">слушать ↓</div>
        <div className="fp-strip"><span>ЗОРЯ · АРТЕЛЬ · 25 · НАРОДНАЯ · ЛЕСНИЧЕСТВО · ВЕЧЁРКА · </span><span>ЗОРЯ · АРТЕЛЬ · 25 · НАРОДНАЯ · ЛЕСНИЧЕСТВО · ВЕЧЁРКА · </span><span>ЗОРЯ · АРТЕЛЬ · 25 · НАРОДНАЯ · ЛЕСНИЧЕСТВО · ВЕЧЁРКА · </span></div>
      </ParallaxScene>

      {/* S2 — ОБРЯД (свечи + хор в дыму · foreground-parallax) */}
      <ParallaxScene heightVh={280} className="fk-scene k2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#cfcdc5" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="k2-bg">
          <SceneMedia src={`${A}/obryadbg.jpg`} />
        </Layer>
        <div className="k2-veil" aria-hidden />
        <Layer z={9} depth={0.74} from={{ y: "3vh", scale: 1.05 }} to={{ y: "-1vh", scale: 1.1 }} cursor={{ x: 24, y: 14 }} className="k2-fg">
          <SceneMedia src={`${A}/candlefg.jpg`} />
        </Layer>
        <div className="k2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="k2-copy">
          <span className="fk-eyebrow">01 — обряд</span>
          <h2>Не концерт —<br /><em>обряд.</em></h2>
          <p>Свечи, дым, многоголосье. Песни, которые пели у околицы, звучат так, будто их не прерывали — на расстоянии дыхания.</p>
        </Layer>
        <div className="k2-lyric">«Ой, да по-над реченькой…»</div>
      </ParallaxScene>

      {/* S3 — ЖИВЬЁМ (grayscale-вырезки концертов · cards) */}
      <ParallaxScene heightVh={280} className="fk-scene k3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: 12, color: "#151410" }}>
        <div className="k3-bg" aria-hidden />
        <div className="k3-grain" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="k3-word"><span>ЖИВЬЁМ</span></Layer>
        {/* фото-альбом: снимки «раскладываются» на уголках · mount-settle */}
        <Layer z={5} depth={0.4} phase={[0.05, 0.34]} from={{ x: "-30vw", y: "-2vh", scale: 0.92, rotate: "-7deg", opacity: 0 }} to={{ x: "-30vw", y: "0vh", scale: 1, rotate: "-3deg", opacity: 1 }} cursor={{ x: 14, y: 8 }}>
          <div className="k3-photo k3-h1"><SceneMedia src={`${A}/g1.jpg`} /><b>вечёрка</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.12, 0.41]} from={{ x: "-10vw", y: "-2vh", scale: 0.92, rotate: "4deg", opacity: 0 }} to={{ x: "-10vw", y: "0vh", scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="k3-photo k3-h2"><SceneMedia src={`${A}/g3.jpg`} /><b>запевала</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.19, 0.48]} from={{ x: "10vw", y: "-2vh", scale: 0.92, rotate: "-4deg", opacity: 0 }} to={{ x: "10vw", y: "0vh", scale: 1, rotate: "-2deg", opacity: 1 }} cursor={{ x: 14, y: 8 }}>
          <div className="k3-photo k3-h3"><SceneMedia src={`${A}/g2.jpg`} /><b>гусли</b></div>
        </Layer>
        <Layer z={8} depth={0.68} phase={[0.26, 0.55]} from={{ x: "30vw", y: "-2vh", scale: 0.92, rotate: "5deg", opacity: 0 }} to={{ x: "30vw", y: "0vh", scale: 1, rotate: "3deg", opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="k3-photo k3-h4"><SceneMedia src={`${A}/g5.jpg`} /><b>жалейка</b></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k3-copy">
          <span className="fk-eyebrow">02 — живьём</span>
          <h2>Как это звучит <em>вживую.</em></h2>
          <p>Многоголосье, гусли и жалейка — при свечах, ни одной фонограммы.</p>
        </Layer>
      </ParallaxScene>

      {/* S4 — АФИША (плотная типографская афиша · data) */}
      <ParallaxScene heightVh={260} className="fk-scene k4-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#151410" }}>
        <div className="k4-bg" aria-hidden />
        <div className="k4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k4-head">
          <span className="fk-eyebrow">03 — афиша</span><h2>Ближайшие <em>вечёрки.</em></h2>
        </Layer>
        {/* афиша: концерты «впечатываются» на плакат по очереди (ink-press по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.05, 0.72]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k4-billL">
          <div className="k4-bill">
            <div className="k4-billhd">◆ осенняя афиша · 2025 ◆</div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.03 }}><time>12 СЕН</time><b>Вечёрка при свечах</b><em className="on">есть места</em><s>Старая изба · Суздаль</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.18 }}><time>27 СЕН</time><b>Осенние свадебные</b><em className="on">есть места</em><s>Дом культуры · Вологда</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.33 }}><time>11 ОКТ</time><b>Плачи и колыбельные</b><em>распродано</em><s>Камерный зал · Москва</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.48 }}><time>25 ОКТ</time><b>Целый год за вечер</b><em className="on">есть места</em><s>Этнопарк · Кострома</s></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S5 — ГОЛОСА ЗАЛА (отзывы как рукопись · bg+text) */}
      <ParallaxScene heightVh={260} className="fk-scene k5-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#0e0d0a" }}>
        <div className="k5-bg" aria-hidden />
        <div className="k5-scroll" aria-hidden />
        <div className="k5-glow" aria-hidden />
        <div className="k5-eyebrow">голоса зала</div>
        {/* пергамент-свиток: строфы раскрываются сверху вниз при свечах */}
        <Layer z={6} depth={0.24} phase={[0.05, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s1">
          <div><p>Пели без микрофонов — а мурашки до сих пор. Будто бабушкин голос из детства.</p><cite>Анна М. · Москва</cite></div>
        </Layer>
        <Layer z={6} depth={0.34} phase={[0.16, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s2">
          <div><span className="k5-orn">✦</span><p>Не концерт, а обряд. Свечи, многоголосье — час пролетел как один вздох.</p><cite>Пётр и Лада · Суздаль</cite></div>
        </Layer>
        <Layer z={6} depth={0.44} phase={[0.27, 0.6]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s3">
          <div><span className="k5-orn">✦</span><p>Ушёл с комом в горле и списком песен для дочки.</p><cite>Игорь В. · Вологда</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — ПРИХОДИТЕ НА ЗАРЮ (красный диск-восход · object + CTA) */}
      <ParallaxScene heightVh={260} className="fk-scene k6-scene">
        <div className="k6-bg" aria-hidden />
        <Layer z={3} depth={0.4} phase={[0.02, 0.55]} from={{ y: "10vh", scale: 0.9, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} cursor={{ x: 10, y: 8 }} className="k6-disc"><i /></Layer>
        <Layer z={12} depth={0.24} phase={[0.06, 0.52]} from={{ y: "6vh", scale: 0.95, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="k6-copy">
          <span className="fk-eyebrow">афиша</span>
          <h2>Приходите<br /><em>на зарю.</em></h2>
        </Layer>
        <div className="k6-cta">
          <p>Ближайший концерт — в старой избе при свечах. Мест немного, звук — на расстоянии дыхания.</p>
          <a href="#" onClick={stop} className="fk-btn">Купить билет <i>↗</i></a>
        </div>
      </ParallaxScene>

      <footer className="fk-foot">
        <div className="fk-foot-top"><b>ЗОРЯ</b><p>Народные песни живьём. Многоголосье · гусли · жалейка.</p></div>
        <div className="fk-foot-legal"><span>Фольк-ансамбль «Зоря»</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
