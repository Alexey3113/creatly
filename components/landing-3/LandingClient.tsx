"use client";

/**
 * Лендинг v3 — dogfood: страница собрана на тех же движках, что и
 * генерируемые сайты (lib/site/*): сцена-аврора с морфингом по секциям,
 * word-reveal, highlight-текст, tilt-карточки с бликом, marquee,
 * магнитные CTA, счётчики. Никакой отдельной анимационной кодбазы —
 * лендинг литерально демонстрирует продукт собой.
 */

import { useEffect, useRef } from "react";
import { SCENE_CSS, sceneMarkup, sceneRuntime } from "@/lib/site/scene-runtime";
import { textRuntime, textRuntimeCss } from "@/lib/site/text-runtime";
import { widgetsRuntime } from "@/lib/site/widgets-runtime";
import { REVEAL_CSS, REVEAL_JS } from "@/lib/site/render";

const SCENE_HTML = sceneMarkup({ type: "aurora", intensity: 0.6, grain: true });

export function LandingClient() {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    // Запускаем те же IIFE-рантаймы, что уходят на опубликованные сайты
    for (const src of [REVEAL_JS, textRuntime, widgetsRuntime, sceneRuntime]) {
      try { new Function(src)(); } catch (e) { console.error("[landing3 runtime]", e); }
    }
  }, []);

  return (
    <div className="l3">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <style>{`:root{--color-bg:#08080d;--color-bg-alt:#0e0e15;--color-surface:#12121a;--color-text:#f5f5f7;--color-text-muted:rgba(235,235,245,.55);--color-primary:#101018;--color-accent:#3b5bff;--color-border:rgba(255,255,255,.09);--color-text-on-primary:#fff;--color-text-on-accent:#fff;--font-heading:'Unbounded',sans-serif;--font-body:'Manrope',sans-serif;--radius-md:14px;--radius-lg:22px;--radius-full:999px;--space-block:clamp(20px,4vw,56px)}`}</style>
      <style>{SCENE_CSS}</style>
      <style>{REVEAL_CSS}</style>
      <style>{textRuntimeCss}</style>
      <style>{L3_CSS}</style>

      <div dangerouslySetInnerHTML={{ __html: SCENE_HTML }} />

      {/* ── Шапка ── */}
      <header className="l3-header" data-header>
        <div className="l3-header__in">
          <a className="l3-logo" href="/">Creatly</a>
          <nav className="l3-nav">
            <a href="#how">Как работает</a>
            <a href="#features">Возможности</a>
            <a href="#numbers">Цифры</a>
          </nav>
          <a className="l3-cta l3-cta--sm" href="/dashboard" data-magnet="0.2">Собрать сайт</a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="l3-hero" data-scene-tint="#3b5bff">
        <p className="l3-eyebrow" data-reveal="fade">AI-режиссёр сайтов</p>
        <h1 className="l3-hero__title" data-reveal="word">Сайты, которые листают как кино</h1>
        <p className="l3-hero__sub" data-reveal="fade" style={{ ["--stagger" as never]: 3 }}>
          Опишите бизнес — AI соберёт storytelling-сайт: живая сцена на фоне,
          видео по главам скролла, кинетический текст. Готово за минуту,
          выглядит как работа студии.
        </p>
        <div className="l3-hero__actions" data-reveal="fade" style={{ ["--stagger" as never]: 4 }}>
          <a className="l3-cta" href="/dashboard" data-magnet="0.22">Собрать сайт за минуту</a>
          <a className="l3-ghost" href="#how">Как это устроено ↓</a>
        </div>
        <p className="l3-hero__note" data-reveal="fade" style={{ ["--stagger" as never]: 5 }}>
          178 живых блоков · 6 анимационных движков · ни одного шаблонного вида
        </p>
      </section>

      {/* ── Marquee ── */}
      <section className="l3-mq" aria-hidden="true">
        <div className="l3-mq__row">
          <div className="l3-mq__track" data-marquee>
            {["Скраб-видео", "Живая сцена", "Шаги-жесты", "Кинетический текст", "Демо-прокрутка"].map((w) => (
              <span className="l3-mq__item" key={w}><em>{w}</em><i>✦</i></span>
            ))}
          </div>
        </div>
        <div className="l3-mq__row l3-mq__row--rev">
          <div className="l3-mq__track" data-marquee>
            {["Аврора", "Mesh", "Field", "Liquid", "Зерно", "Морфинг"].map((w) => (
              <span className="l3-mq__item l3-mq__item--ghost" key={w}><em>{w}</em><i>✦</i></span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как работает ── */}
      <section className="l3-how" id="how" data-scene-tint="#8b5cf6">
        <p className="l3-eyebrow" data-reveal="fade">Три шага</p>
        <h2 className="l3-h2" data-reveal="word">От брифа до кино</h2>
        <div className="l3-how__grid">
          {[
            ["01", "Расскажите о бизнесе", "Голосом или текстом — как удобно. Можно приложить старый сайт, AI заберёт из него факты."],
            ["02", "AI ставит режиссуру", "Выбирает блоки и сцену, пишет тексты, подбирает живые фото, раскладывает свет и ритм по секциям."],
            ["03", "Записывайте рилс", "Жмёте «Демо» — сайт сам эффектно проезжает под запись экрана. Публикация — в один клик."],
          ].map(([n, t, d], i) => (
            <article className="l3-step" key={n} data-reveal="up" style={{ ["--stagger" as never]: i }}>
              <span className="l3-step__num" aria-hidden="true">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Highlight-манифест ── */}
      <section className="l3-mani" data-scene-tint="#e8432d">
        <p className="l3-mani__text" data-reveal="highlight">
          Мы не продаём шаблоны. Мы ставим каждому сайту режиссуру — сцену,
          ритм, свет и историю, которую посетитель досматривает до конца
          и пересказывает друзьям.
        </p>
      </section>

      {/* ── Возможности (tilt) ── */}
      <section className="l3-feat" id="features" data-scene-tint="#3b5bff">
        <p className="l3-eyebrow" data-reveal="fade">Возможности</p>
        <h2 className="l3-h2" data-reveal="word">Механики, которых нет у конструкторов</h2>
        <div className="l3-feat__grid">
          {[
            ["◉", "Живая сцена", "Один непрерывный анимированный фон на весь сайт: аврора, mesh, точечное поле или liquid. Морфится по секциям."],
            ["🎬", "Storytelling-движок", "Экран прилипает, видео скрабится по главам, текст сменяется шагами. В обе стороны, без блокировки скролла."],
            ["⇢", "Жесты как в сторис", "Режим «один тик — один шаг»: страница сама доезжает до следующей главы истории."],
            ["▶", "Демо-режим", "Кнопка — и сайт сам кинематографично проезжает сверху вниз. Включайте запись экрана, рилс готов."],
            ["✦", "Кинетический текст", "Заголовки собираются по словам, манифесты «загораются» по мере чтения — как у Apple."],
            ["◇", "3D и магниты", "Карточки наклоняются к курсору с бликом, кнопки притягиваются. На тачах — аккуратная статика."],
          ].map(([icon, t, d], i) => (
            <article className="l3-card" key={t} data-tilt="8" data-reveal="up" style={{ ["--stagger" as never]: i % 3 }}>
              <span className="l3-card__icon" aria-hidden="true">{icon}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="l3-card__glare" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ── Цифры ── */}
      <section className="l3-num" id="numbers" data-scene-tint="#10b981">
        <div className="l3-num__grid">
          {[
            ["178+", "живых блоков в каталоге"],
            ["60 сек", "от брифа до сайта"],
            ["6", "анимационных движков"],
            ["0", "чужих библиотек на сайте"],
          ].map(([v, l], i) => (
            <div className="l3-num__stat" key={l} data-reveal="up" style={{ ["--stagger" as never]: i }}>
              <span className="l3-num__value" data-count>{v}</span>
              <span className="l3-num__label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Финальный CTA ── */}
      <section className="l3-final" data-scene-tint="#3b5bff">
        <h2 className="l3-final__title" data-reveal="word">Соберите свой первый сайт-кино</h2>
        <p className="l3-final__sub" data-reveal="fade" style={{ ["--stagger" as never]: 2 }}>
          Бесплатно. Без карточки. Через минуту у вас будет что показать.
        </p>
        <a className="l3-cta l3-cta--xl" href="/dashboard" data-magnet="0.25" data-reveal="scale">
          Начать бесплатно
        </a>
      </section>

      <footer className="l3-footer">
        <span>© {new Date().getFullYear()} Creatly</span>
        <nav>
          <a href="/auth">Вход</a>
          <a href="mailto:hello@creatly.ru">hello@creatly.ru</a>
        </nav>
      </footer>
    </div>
  );
}

const L3_CSS = `
.l3{background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);overflow-x:hidden;min-height:100vh}
.l3 a{-webkit-tap-highlight-color:transparent}
.l3-eyebrow{font-size:.8125rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--color-accent);margin:0 0 1.25rem}
.l3-h2{font-family:var(--font-heading);font-weight:600;font-size:clamp(1.7rem,3.6vw,2.9rem);letter-spacing:-.01em;line-height:1.12;margin:0 0 3rem;max-width:820px}
.l3-cta{display:inline-flex;align-items:center;min-height:54px;padding:0 2.2rem;border-radius:var(--radius-full);background:var(--color-accent);color:#fff;text-decoration:none;font-weight:800;font-size:.95rem;box-shadow:0 16px 44px -12px rgba(59,91,255,.65);transition:box-shadow .3s}
.l3-cta:hover{box-shadow:0 24px 56px -14px rgba(59,91,255,.85)}
.l3-cta--sm{min-height:42px;padding:0 1.4rem;font-size:.85rem}
.l3-cta--xl{min-height:62px;padding:0 3rem;font-size:1.05rem}
.l3-ghost{color:var(--color-text);text-decoration:none;font-weight:700;font-size:.95rem;border-bottom:1.5px solid rgba(255,255,255,.25);padding-bottom:.15rem;transition:border-color .2s}
.l3-ghost:hover{border-color:var(--color-accent)}

.l3-header{position:fixed;top:0;left:0;right:0;z-index:100;border-bottom:1px solid transparent;transition:background .35s,border-color .35s,backdrop-filter .35s}
.l3-header.is-scrolled{background:rgba(8,8,13,.72);backdrop-filter:blur(16px);border-bottom-color:rgba(255,255,255,.08)}
.l3-header__in{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:.9rem var(--space-block)}
.l3-logo{font-family:var(--font-heading);font-weight:800;font-size:1.15rem;color:#fff;text-decoration:none;letter-spacing:-.01em}
.l3-nav{display:flex;gap:clamp(1rem,2.5vw,2rem);margin:0 auto}
.l3-nav a{color:var(--color-text-muted);text-decoration:none;font-weight:600;font-size:.9rem;transition:color .2s}
.l3-nav a:hover{color:#fff}
@media(max-width:768px){.l3-nav{display:none}}

.l3-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:7rem var(--space-block) 4rem}
.l3-hero__title{font-family:var(--font-heading);font-weight:800;font-size:clamp(2.3rem,7vw,5.5rem);line-height:1.04;letter-spacing:-.02em;margin:0;max-width:1080px}
.l3-hero__sub{font-size:clamp(1rem,1.6vw,1.25rem);color:var(--color-text-muted);line-height:1.7;max-width:640px;margin:1.75rem 0 2.5rem}
.l3-hero__actions{display:flex;align-items:center;gap:1.75rem;flex-wrap:wrap;justify-content:center}
.l3-hero__note{margin-top:2.75rem;font-size:.8125rem;letter-spacing:.06em;color:rgba(235,235,245,.4)}

.l3-mq{padding:1.5rem 0;border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border);overflow:hidden}
.l3-mq__row{display:flex;width:max-content;animation:l3mq 30s linear infinite}
.l3-mq__row--rev{animation-direction:reverse;animation-duration:38s;margin-top:.4rem}
.l3-mq__row:hover{animation-play-state:paused}
.l3-mq__track{display:flex;align-items:center}
.l3-mq__item{display:inline-flex;align-items:center;white-space:nowrap}
.l3-mq__item em{font-family:var(--font-heading);font-style:normal;font-weight:600;font-size:clamp(1.4rem,3vw,2.4rem);letter-spacing:-.01em;color:#fff;padding:0 clamp(.9rem,2vw,1.6rem)}
.l3-mq__item i{font-style:normal;color:var(--color-accent);font-size:1rem}
.l3-mq__item--ghost em{color:transparent;-webkit-text-stroke:1.2px rgba(255,255,255,.35)}
@keyframes l3mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.l3-mq__row{animation:none}}

.l3-how{padding:clamp(5rem,14vh,9rem) var(--space-block);max-width:1280px;margin:0 auto}
.l3-how__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.l3-step{position:relative;padding:2.5rem 2rem;border-radius:var(--radius-lg);background:rgba(255,255,255,.035);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.07)}
.l3-step__num{font-family:var(--font-heading);font-weight:800;font-size:3.2rem;line-height:1;letter-spacing:-.03em;color:transparent;-webkit-text-stroke:1.5px rgba(59,91,255,.85);display:block;margin-bottom:1.4rem}
.l3-step h3{font-family:var(--font-heading);font-weight:600;font-size:1.15rem;margin:0 0 .6rem}
.l3-step p{color:var(--color-text-muted);line-height:1.65;font-size:.9375rem;margin:0}
@media(max-width:768px){.l3-how__grid{grid-template-columns:1fr}}

.l3-mani{padding:clamp(5rem,16vh,10rem) var(--space-block)}
.l3-mani__text{font-family:var(--font-heading);font-weight:600;font-size:clamp(1.5rem,3.4vw,2.75rem);line-height:1.4;letter-spacing:-.01em;max-width:960px;margin:0 auto}

.l3-feat{padding:clamp(4rem,12vh,8rem) var(--space-block);max-width:1280px;margin:0 auto}
.l3-feat__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;perspective:1100px}
.l3-card{position:relative;overflow:hidden;padding:2.4rem 2rem;border-radius:var(--radius-lg);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;transition:transform .2s ease-out;will-change:transform}
.l3-card.is-tilting{transition:transform .05s linear}
.l3-card__glare{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(420px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.13) 0%,transparent 55%)}
.l3-card.is-tilting .l3-card__glare{opacity:1}
.l3-card__icon{font-size:1.35rem;display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:var(--radius-md);background:rgba(59,91,255,.16);margin-bottom:1.4rem}
.l3-card h3{font-family:var(--font-heading);font-weight:600;font-size:1.1rem;margin:0 0 .55rem}
.l3-card p{color:var(--color-text-muted);line-height:1.6;font-size:.9rem;margin:0}
@media(max-width:900px){.l3-feat__grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.l3-feat__grid{grid-template-columns:1fr}}

.l3-num{padding:clamp(4rem,12vh,7rem) var(--space-block)}
.l3-num__grid{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center}
.l3-num__value{font-family:var(--font-heading);font-weight:800;font-size:clamp(2.4rem,5.5vw,4.25rem);letter-spacing:-.02em;line-height:1;color:var(--color-accent);font-variant-numeric:tabular-nums;display:block;margin-bottom:.6rem}
.l3-num__label{color:var(--color-text-muted);font-size:.9rem}
@media(max-width:768px){.l3-num__grid{grid-template-columns:1fr 1fr;gap:2.25rem 1rem}}

.l3-final{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem var(--space-block)}
.l3-final__title{font-family:var(--font-heading);font-weight:800;font-size:clamp(2rem,5.5vw,4.25rem);letter-spacing:-.02em;line-height:1.06;margin:0 0 1.25rem;max-width:900px}
.l3-final__sub{color:var(--color-text-muted);font-size:1.05rem;margin:0 0 2.5rem}

.l3-footer{display:flex;align-items:center;justify-content:space-between;gap:1rem;max-width:1280px;margin:0 auto;padding:2rem var(--space-block);border-top:1px solid var(--color-border);color:rgba(235,235,245,.4);font-size:.85rem}
.l3-footer nav{display:flex;gap:1.5rem}
.l3-footer a{color:rgba(235,235,245,.55);text-decoration:none}
.l3-footer a:hover{color:#fff}
`;
