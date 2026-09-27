"use client";
/* Концепт 15 — FOLKMUSIC «ЗОРЯ». Русь-фолк ансамбль. Кларет + золото + лён, kokoshnik-огивальная арка (портал-приём), хохлома-завитки в углах, певица в сарафане + кокошнике поверх золотого титула. Типо-персона: Playfair Display + DM Mono. Hero-приём: gold ogee arch-frame portal.
   Сквозная архитектура (аудит 2026-09): ЗОРЯ и фигура видны при загрузке, в покое дрожит венок, пульсирует диск.
   Актёр — красный диск зари: один объект с траекторией по глобальному скроллу (Follow → --zx/--zy/--zs), в каждой сцене
   на своём месте z-порядка: за титулом → садится в пламя свечей (S2) → в его свете проявляются снимки (S3) → печать
   на афише (S4) → светит сквозь свиток (S5) → восходит (S6). Фон — Atmosphere: вечёрка → ночь → заря.
   Стыки: сумерки опускаются сверху (S1→S2), пламя свечи вырастает до кадра (S2→S3, S5→S6), S3→S4→S5 — перекрытие в ночи. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import { Atmosphere, Follow, Weather } from "@/components/scene-kit";
import "@/components/parallax-scene/parallax-scene.css";
import "./folkmusic.css";

const A = "/uploads/1/hooks/sites/anim/folkmusic";
const stop = (e: React.MouseEvent) => e.preventDefault();
// якорь: доля высоты секции (H vh), которая проходит середину экрана, когда сцена в прогрессе raw (0..1)
const mk = (H: number) => (raw: number) => +((raw * (H - 100) + 50) / H).toFixed(4);
const H1 = 280, H2 = 280, H3 = 280, H4 = 280, H5 = 280, H6 = 280, OV = 60;
const a1 = mk(H1), a2 = mk(H2), a3 = mk(H3), a4 = mk(H4), a5 = mk(H5), a6 = mk(H6);
// траектория диска зари: x (%), y и диаметр (vh)
const DISC: [string, number, number, number, number][] = [
  [".fk-hero", a1(0.2), 50, 31, 46],
  [".fk-hero", a1(0.62), 50, 34, 46],
  [".k2-scene", a2(0.34), 50, 88, 26],
  [".k2-scene", a2(0.64), 50, 93, 22],
  [".k3-scene", a3(0.36), 50, 46, 72],
  [".k3-scene", a3(0.66), 50, 46, 72],
  [".k4-scene", a4(0.34), 71, 27, 13],
  [".k4-scene", a4(0.64), 71, 27, 13],
  [".k5-scene", a5(0.36), 50, 50, 46],
  [".k5-scene", a5(0.66), 50, 58, 46],
  [".k6-scene", a6(0.4), 50, 50, 52],
  [".k6-scene", a6(0.8), 50, 45, 54],
];

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
      <Follow unit="%" stops={DISC.map(([at, anchor, x]) => ({ at, anchor, vars: { "--zx": x } }))} />
      <Follow unit="vh" stops={DISC.map(([at, anchor, , y, d]) => ({ at, anchor, vars: { "--zy": y, "--zs": d } }))} />
      <Atmosphere stops={[
        { at: ".fk-hero", color: "#d8d6cf" },
        { at: ".k2-scene", color: "#12130f" },
        { at: ".k3-scene", color: "#231811" },
        { at: ".k4-scene", color: "#161210" },
        { at: ".k5-scene", color: "#0d0b09" },
        { at: ".k6-scene", color: "#2a0f0b" },
      ]} />
      <Weather kind="embers" count={14} color="#ffb35a" color2="#ff6a3d" zIndex={29} world={0.4} seed={15} between={[".k2-scene", ".k4-scene"]} />
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

      <ParallaxScene heightVh={H1} rest={0.35} intro={1200} parallax={10} className="fk-hero fp-hero">
        <Layer z={1} depth={0.08} from={{ scale: 1.04 }} to={{ y: "1.5vh", scale: 1.08 }} cursor={{ x: -4, y: -3 }} className="fp-bg">
          <SceneMedia src={`${A}/paper.jpg`} />
        </Layer>
        <div className="fp-wash" aria-hidden />

        <div className="fp-disc2" aria-hidden />

        <Layer z={3} depth={0.28} phase={[0, 0.28]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: -14, y: -8 }} className="fp-title">
          <span>ЗОРЯ</span>
        </Layer>

        <Layer z={5} depth={0.5} phase={[0, 0.3]} from={{ y: "3vh", scale: 1.02, opacity: 0 }} to={{ y: "-2vh", scale: 1.06, opacity: 1 }} cursor={{ x: 14, y: 9 }} className="fp-figure">
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
      <ParallaxScene heightVh={H2} overlapVh={OV} className="fk-scene k2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="k2-bg">
          <SceneMedia src={`${A}/obryadbg.jpg`} />
        </Layer>
        <div className="k2-veil" aria-hidden />
        <div className="k2-disc" aria-hidden />
        <Layer z={9} depth={0.74} from={{ y: "3vh", scale: 1.05 }} to={{ y: "-1vh", scale: 1.1 }} cursor={{ x: 24, y: 14 }} className="k2-fg">
          <SceneMedia src={`${A}/candlefg.jpg`} />
        </Layer>
        <div className="k2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.2, 0.4]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="k2-copy">
          <span className="fk-eyebrow">01 — обряд</span>
          <h2>Не концерт —<br /><em>обряд.</em></h2>
          <p>Свечи, дым, многоголосье. Песни, которые пели у околицы, звучат так, будто их не прерывали — на расстоянии дыхания.</p>
        </Layer>
        <div className="k2-lyric">«Ой, да по-над реченькой…»</div>
      </ParallaxScene>

      {/* S3 — ЖИВЬЁМ (grayscale-вырезки концертов · cards) */}
      <ParallaxScene heightVh={H3} overlapVh={OV} className="fk-scene k3-scene">
        <div className="k3-bg" aria-hidden />
        <div className="k3-disc" aria-hidden />
        <div className="k3-grain" aria-hidden />
        <Layer z={2} depth={0.16} phase={[0, 0.3]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="k3-word"><span>ЖИВЬЁМ</span></Layer>
        {/* фото-альбом: снимки «раскладываются» на уголках · mount-settle */}
        <Layer z={5} depth={0.4} phase={[0.14, 0.32]} from={{ x: "-30vw", y: "-2vh", scale: 0.92, rotate: "-7deg", opacity: 0 }} to={{ x: "-30vw", y: "0vh", scale: 1, rotate: "-3deg", opacity: 1 }} cursor={{ x: 14, y: 8 }}>
          <div className="k3-photo k3-h1"><SceneMedia src={`${A}/g1.jpg`} /><b>вечёрка</b></div>
        </Layer>
        <Layer z={6} depth={0.5} phase={[0.18, 0.36]} from={{ x: "-10vw", y: "-2vh", scale: 0.92, rotate: "4deg", opacity: 0 }} to={{ x: "-10vw", y: "0vh", scale: 1, rotate: "2deg", opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="k3-photo k3-h2"><SceneMedia src={`${A}/g3.jpg`} /><b>запевала</b></div>
        </Layer>
        <Layer z={7} depth={0.6} phase={[0.22, 0.4]} from={{ x: "10vw", y: "-2vh", scale: 0.92, rotate: "-4deg", opacity: 0 }} to={{ x: "10vw", y: "0vh", scale: 1, rotate: "-2deg", opacity: 1 }} cursor={{ x: 14, y: 8 }}>
          <div className="k3-photo k3-h3"><SceneMedia src={`${A}/g2.jpg`} /><b>гусли</b></div>
        </Layer>
        <Layer z={8} depth={0.68} phase={[0.26, 0.44]} from={{ x: "30vw", y: "-2vh", scale: 0.92, rotate: "5deg", opacity: 0 }} to={{ x: "30vw", y: "0vh", scale: 1, rotate: "3deg", opacity: 1 }} cursor={{ x: -12, y: -7 }}>
          <div className="k3-photo k3-h4"><SceneMedia src={`${A}/g5.jpg`} /><b>жалейка</b></div>
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.2, 0.38]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k3-copy">
          <span className="fk-eyebrow">02 — живьём</span>
          <h2>Как это звучит <em>вживую.</em></h2>
          <p>Многоголосье, гусли и жалейка — при свечах, ни одной фонограммы.</p>
        </Layer>
        <div className="fk-flame" aria-hidden />
      </ParallaxScene>

      {/* S4 — АФИША (плотная типографская афиша · data) */}
      <ParallaxScene heightVh={H4} overlapVh={OV} className="fk-scene k4-scene">
        <div className="k4-bg" aria-hidden />
        <div className="k4-grain" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k4-head">
          <span className="fk-eyebrow">03 — афиша</span><h2>Ближайшие <em>вечёрки.</em></h2>
        </Layer>
        {/* афиша: концерты «впечатываются» на плакат по очереди (ink-press по --lp) */}
        <Layer z={12} depth={0.3} phase={[0.08, 0.5]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k4-billL">
          <div className="k4-bill">
            <div className="k4-billhd">◆ осенняя афиша · 2025 ◆</div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.03 }}><time>12 СЕН</time><b>Вечёрка при свечах</b><em className="on">есть места</em><s>Старая изба · Суздаль</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.18 }}><time>27 СЕН</time><b>Осенние свадебные</b><em className="on">есть места</em><s>Дом культуры · Вологда</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.33 }}><time>11 ОКТ</time><b>Плачи и колыбельные</b><em>распродано</em><s>Камерный зал · Москва</s></div>
            <div className="k4-line" style={{ ["--thr" as string]: 0.48 }}><time>25 ОКТ</time><b>Целый год за вечер</b><em className="on">есть места</em><s>Этнопарк · Кострома</s></div>
          </div>
        </Layer>
        <div className="k4-seal" aria-hidden><b>ЗОРЯ</b><i>№25</i></div>
      </ParallaxScene>

      {/* S5 — ГОЛОСА ЗАЛА (отзывы как рукопись · bg+text) */}
      <ParallaxScene heightVh={H5} overlapVh={OV} className="fk-scene k5-scene">
        <div className="k5-bg" aria-hidden />
        <div className="k5-scroll" aria-hidden />
        <div className="k5-disc" aria-hidden />
        <div className="k5-glow" aria-hidden />
        <div className="k5-eyebrow">голоса зала</div>
        {/* пергамент-свиток: строфы раскрываются сверху вниз при свечах */}
        <Layer z={6} depth={0.24} phase={[0.12, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s1">
          <div><p>Пели без микрофонов — а мурашки до сих пор. Будто бабушкин голос из детства.</p><cite>Анна М. · Москва</cite></div>
        </Layer>
        <Layer z={6} depth={0.34} phase={[0.18, 0.36]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s2">
          <div><span className="k5-orn">✦</span><p>Не концерт, а обряд. Свечи, многоголосье — час пролетел как один вздох.</p><cite>Пётр и Лада · Суздаль</cite></div>
        </Layer>
        <Layer z={6} depth={0.44} phase={[0.24, 0.42]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="k5-stz k5-s3">
          <div><span className="k5-orn">✦</span><p>Ушёл с комом в горле и списком песен для дочки.</p><cite>Игорь В. · Вологда</cite></div>
        </Layer>
      </ParallaxScene>

      {/* S6 — ПРИХОДИТЕ НА ЗАРЮ (красный диск-восход · object + CTA) */}
      <ParallaxScene heightVh={H6} overlapVh={OV} className="fk-scene k6-scene">
        <div className="k6-bg" aria-hidden />
        <div className="k6-disc2" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.26, 0.46]} from={{ y: "6vh", scale: 0.95, opacity: 0 }} to={{ y: "0vh", scale: 1, opacity: 1 }} className="k6-copy">
          <span className="fk-eyebrow">афиша</span>
          <h2>Приходите<br /><em>на зарю.</em></h2>
        </Layer>
        <div className="k6-cta">
          <p>Ближайший концерт — в старой избе при свечах. Мест немного, звук — на расстоянии дыхания.</p>
          <a href="#" onClick={stop} className="fk-btn">Купить билет <i>↗</i></a>
        </div>
        <div className="fk-flame" aria-hidden />
      </ParallaxScene>

      <footer className="fk-foot">
        <div className="fk-foot-top"><b>ЗОРЯ</b><p>Народные песни живьём. Многоголосье · гусли · жалейка.</p></div>
        <div className="fk-foot-legal"><span>Фольк-ансамбль «Зоря»</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
