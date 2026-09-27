import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-centered-01",
  name: "Hero — центр, тёмный",
  description: "Гигантский заголовок по центру с посимвольным появлением, живое световое пятно на фоне, пара действий и мягкая стрелка вниз.",
  category: "hero",
  subcategory: "centered",
  icon: "◆",
  tags: ["centered", "dark", "cta", "eyebrow", "kinetic", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова, uppercase", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов, конкретный", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения с цифрами/фактами", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки 2-4 слова", required: true },
    { name: "hero-cta2", type: "link", hint: "второе действие (тихая ссылка), 2-3 слова", required: false },
  ],
  html: `<section class="b-hc01" data-block="hero">
  <div class="b-hc01__glow" aria-hidden="true"></div>
  <div class="b-hc01__inner">
    <p class="b-hc01__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Студия дизайна</p>
    <h1 class="b-hc01__title" data-field="hero-title" data-reveal="word">Создаём бренды, которые запоминаются с первого взгляда</h1>
    <p class="b-hc01__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:3">15 лет опыта, 200+ проектов для бизнеса от стартапов до корпораций. Работаем от стратегии до реализации.</p>
    <div class="b-hc01__actions" data-reveal="fade" style="--stagger:4">
      <a class="b-hc01__btn" href="#" data-field="hero-cta" data-magnet="0.2">Обсудить проект</a>
      <a class="b-hc01__btn2" href="#" data-field="hero-cta2">Смотреть работы →</a>
    </div>
  </div>
  <div class="b-hc01__down" aria-hidden="true">↓</div>
</section>`,
  css: `.b-hc01{position:relative;text-align:center;padding:var(--space-section) var(--space-block);background:var(--color-primary);min-height:96vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.b-hc01__glow{position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:80vw;height:80vw;max-width:900px;max-height:900px;background:radial-gradient(circle,color-mix(in srgb,var(--color-accent) 28%,transparent) 0%,transparent 62%);filter:blur(40px);animation:b-hc01-drift 14s ease-in-out infinite alternate;pointer-events:none}
@keyframes b-hc01-drift{from{transform:translateX(-58%) scale(1)}to{transform:translateX(-42%) scale(1.12)}}
.b-hc01__inner{position:relative;max-width:920px;margin:0 auto}
.b-hc01__title{font-family:var(--font-heading);font-size:clamp(2.6rem,6.2vw,5.25rem);color:var(--color-text-on-primary);margin:0;line-height:1.04;letter-spacing:-0.03em}
.b-hc01__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.18em;font-size:.8125rem;margin:0 0 1.5rem}
.b-hc01__desc{color:color-mix(in srgb,var(--color-text-on-primary) 68%,transparent);font-family:var(--font-body);font-size:1.125rem;max-width:560px;margin:1.75rem auto 2.5rem;line-height:1.65}
.b-hc01__actions{display:flex;align-items:center;justify-content:center;gap:1.75rem;flex-wrap:wrap}
.b-hc01__btn{display:inline-flex;align-items:center;min-height:54px;padding:0 2.2rem;border-radius:var(--radius-full);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;box-shadow:0 16px 40px -12px color-mix(in srgb,var(--color-accent) 60%,transparent);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.b-hc01__btn:hover{transform:translateY(-2px);box-shadow:0 22px 50px -14px color-mix(in srgb,var(--color-accent) 75%,transparent)}
.b-hc01__btn2{font-family:var(--font-body);font-weight:700;font-size:.9375rem;color:color-mix(in srgb,var(--color-text-on-primary) 85%,transparent);text-decoration:none;border-bottom:1.5px solid color-mix(in srgb,var(--color-text-on-primary) 25%,transparent);padding-bottom:.15rem;transition:border-color .2s,color .2s}
.b-hc01__btn2:hover{color:var(--color-text-on-primary);border-color:var(--color-accent)}
.b-hc01__down{position:absolute;bottom:clamp(1.25rem,4vh,2.5rem);left:50%;transform:translateX(-50%);color:color-mix(in srgb,var(--color-text-on-primary) 45%,transparent);font-size:1.1rem;animation:b-hc01-bob 2.2s ease-in-out infinite}
@keyframes b-hc01-bob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,8px)}}
@media(prefers-reduced-motion:reduce){.b-hc01__glow,.b-hc01__down{animation:none}}
@media(max-width:768px){.b-hc01{min-height:88vh;padding:5rem 1.25rem 4rem}.b-hc01__title{font-size:clamp(2.1rem,10vw,2.9rem)}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый", css: `.b-hc01{background:var(--color-bg)}.b-hc01__title{color:var(--color-text)}.b-hc01__desc{color:var(--color-text-muted)}.b-hc01__btn2{color:var(--color-text);border-color:color-mix(in srgb,var(--color-text) 25%,transparent)}.b-hc01__btn2:hover{color:var(--color-text)}.b-hc01__down{color:color-mix(in srgb,var(--color-text) 40%,transparent)}.b-hc01__glow{opacity:.5}` },
    { id: "accent", label: "Акцентный", css: `.b-hc01{background:var(--color-accent)}.b-hc01__eyebrow{color:var(--color-text-on-accent);opacity:.75}.b-hc01__glow{background:radial-gradient(circle,rgba(255,255,255,.22) 0%,transparent 62%)}.b-hc01__btn{background:var(--color-text-on-accent);color:var(--color-accent);box-shadow:0 16px 40px -12px rgba(0,0,0,.35)}.b-hc01__btn2{color:var(--color-text-on-accent);border-color:color-mix(in srgb,var(--color-text-on-accent) 40%,transparent)}` },
  ],
};
