import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-left-05",
  name: "Hero — текст + trust bar + фото",
  description: "Крупный заголовок и trust-bar слева; справа фото в мягкой рамке со смещённой акцентной подложкой и стеклянным бейджем-статистикой поверх.",
  category: "hero",
  subcategory: "split-left",
  icon: "◫",
  tags: ["split", "trust-bar", "logos", "social-proof", "enterprise", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 5-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-cta2", type: "link", hint: "второе действие (тихая ссылка), 2-3 слова", required: false },
    { name: "hero-trust-label", type: "text", hint: "подпись trust bar, напр. 'Нам доверяют'", required: false },
    { name: "hero-trust-1", type: "text", hint: "название компании 1", required: true },
    { name: "hero-trust-2", type: "text", hint: "название компании 2", required: true },
    { name: "hero-trust-3", type: "text", hint: "название компании 3", required: true },
    { name: "hero-trust-4", type: "text", hint: "название компании 4", required: false },
    { name: "hero-image", type: "image", hint: "изображение справа, вертикальное", required: true },
    { name: "hero-badge-value", type: "stat", hint: "цифра бейджа на фото, напр. «4.9★» или «12 лет»", required: false },
    { name: "hero-badge-label", type: "text", hint: "подпись бейджа, 2-4 слова", required: false },
  ],
  html: `<section class="b-hsl05" data-block="hero">
  <div class="b-hsl05__inner">
    <div class="b-hsl05__content">
      <div class="b-hsl05__text">
        <p class="b-hsl05__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Enterprise Solutions</p>
        <h1 class="b-hsl05__title" data-field="hero-title" data-reveal="word">Масштабируемые решения для растущего бизнеса</h1>
        <p class="b-hsl05__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Инфраструктура, которая растёт вместе с вами. Поддержка 24/7, SLA 99.99%, интеграция за 1 день.</p>
        <div class="b-hsl05__actions" data-reveal="fade" style="--stagger:3">
          <a class="b-hsl05__btn" href="#" data-field="hero-cta" data-magnet="0.2">Запросить демо</a>
          <a class="b-hsl05__btn2" href="#" data-field="hero-cta2">Как это работает →</a>
        </div>
      </div>
      <div class="b-hsl05__trust" data-reveal="fade" style="--stagger:4">
        <span class="b-hsl05__trust-label" data-field="hero-trust-label">Нам доверяют</span>
        <div class="b-hsl05__trust-row">
          <span class="b-hsl05__trust-item" data-field="hero-trust-1">Yandex</span>
          <span class="b-hsl05__trust-item" data-field="hero-trust-2">Sber</span>
          <span class="b-hsl05__trust-item" data-field="hero-trust-3">Tinkoff</span>
          <span class="b-hsl05__trust-item" data-field="hero-trust-4">VK</span>
        </div>
      </div>
    </div>
    <div class="b-hsl05__media" data-reveal="scale">
      <div class="b-hsl05__media-back" aria-hidden="true"></div>
      <img class="b-hsl05__img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image"/>
      <div class="b-hsl05__badge">
        <strong class="b-hsl05__badge-value" data-field="hero-badge-value">4.9★</strong>
        <span class="b-hsl05__badge-label" data-field="hero-badge-label">средняя оценка клиентов</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hsl05{background:var(--color-bg);min-height:92vh;display:flex;align-items:center;overflow:hidden}
.b-hsl05__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(2rem,5vw,4.5rem);align-items:center;padding:clamp(5rem,12vh,7rem) var(--space-block) clamp(3rem,8vh,5rem)}
.b-hsl05__text{max-width:560px}
.b-hsl05__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.16em;font-size:.8125rem;margin:0 0 1.5rem}
.b-hsl05__title{font-family:var(--font-heading);font-size:clamp(2.4rem,4.6vw,4rem);color:var(--color-text);margin:0;line-height:1.05;letter-spacing:-0.025em}
.b-hsl05__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.5rem 0 2.25rem;line-height:1.7;max-width:460px}
.b-hsl05__actions{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}
.b-hsl05__btn{display:inline-flex;align-items:center;min-height:54px;padding:0 2.1rem;border-radius:var(--radius-full);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;box-shadow:0 14px 30px -12px color-mix(in srgb,var(--color-primary) 55%,transparent);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.b-hsl05__btn:hover{transform:translateY(-2px);box-shadow:0 20px 40px -14px color-mix(in srgb,var(--color-primary) 65%,transparent)}
.b-hsl05__btn2{font-family:var(--font-body);font-weight:700;font-size:.9375rem;color:var(--color-text);text-decoration:none;border-bottom:1.5px solid color-mix(in srgb,var(--color-text) 25%,transparent);padding-bottom:.15rem;transition:border-color .2s}
.b-hsl05__btn2:hover{border-color:var(--color-accent)}
.b-hsl05__trust{margin-top:3.25rem;padding-top:2rem;border-top:1px solid var(--color-border)}
.b-hsl05__trust-label{display:block;font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:1rem}
.b-hsl05__trust-row{display:flex;gap:clamp(1.25rem,3vw,2.5rem);flex-wrap:wrap;align-items:center}
.b-hsl05__trust-item{font-family:var(--font-heading);font-size:.9375rem;font-weight:700;color:var(--color-text-muted);opacity:.55;letter-spacing:.02em;transition:opacity .3s}
.b-hsl05__trust-item:hover{opacity:1}
.b-hsl05__media{position:relative;align-self:stretch;display:flex;align-items:center}
.b-hsl05__media-back{position:absolute;inset:8% -4% -4% 10%;background:color-mix(in srgb,var(--color-accent) 14%,var(--color-bg-alt));border-radius:var(--radius-lg);z-index:0}
.b-hsl05__img{position:relative;z-index:1;display:block;width:100%;aspect-ratio:4/5;max-height:78vh;object-fit:cover;border-radius:var(--radius-lg);box-shadow:0 40px 80px -30px color-mix(in srgb,var(--color-text) 35%,transparent)}
.b-hsl05__badge{position:absolute;z-index:2;left:clamp(-1.5rem,-2vw,-2rem);bottom:clamp(1.5rem,4vh,3rem);display:flex;flex-direction:column;gap:.15rem;padding:1rem 1.4rem;border-radius:var(--radius-md);background:color-mix(in srgb,var(--color-surface) 78%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid color-mix(in srgb,var(--color-text) 8%,transparent);box-shadow:0 20px 45px -18px color-mix(in srgb,var(--color-text) 30%,transparent)}
.b-hsl05__badge-value{font-family:var(--font-heading);font-size:1.5rem;letter-spacing:-.01em;color:var(--color-text)}
.b-hsl05__badge-label{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);max-width:150px;line-height:1.4}
@media(max-width:768px){.b-hsl05{min-height:auto}.b-hsl05__inner{grid-template-columns:1fr;padding-top:5.5rem}.b-hsl05__img{aspect-ratio:4/3;max-height:none}.b-hsl05__badge{left:1rem;bottom:1rem}.b-hsl05__title{font-size:clamp(2rem,9vw,2.6rem)}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsl05{background:var(--color-primary)}.b-hsl05__title{color:var(--color-text-on-primary)}.b-hsl05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hsl05__btn{background:var(--color-accent);color:var(--color-text-on-accent);box-shadow:0 14px 30px -12px color-mix(in srgb,var(--color-accent) 55%,transparent)}.b-hsl05__btn2{color:var(--color-text-on-primary);border-color:color-mix(in srgb,var(--color-text-on-primary) 30%,transparent)}.b-hsl05__trust{border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}.b-hsl05__trust-label{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-hsl05__trust-item{color:var(--color-text-on-primary);opacity:.4}.b-hsl05__media-back{background:color-mix(in srgb,var(--color-accent) 22%,transparent)}.b-hsl05__badge{background:rgba(20,20,28,.6);border-color:rgba(255,255,255,.1)}.b-hsl05__badge-value{color:#fff}.b-hsl05__badge-label{color:rgba(255,255,255,.6)}` },
    { id: "accent", label: "Акцентный фон", css: `.b-hsl05{background:var(--color-bg-alt)}.b-hsl05__badge{background:color-mix(in srgb,var(--color-surface) 88%,transparent)}` },
  ],
};
