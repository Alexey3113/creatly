import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-centered-04",
  name: "Hero — градиент-меш",
  description: "Анимированный градиентный фон + центрированный текст + CTA, футуристичный стиль",
  category: "hero",
  subcategory: "centered",
  icon: "◉",
  tags: ["centered", "gradient", "animated", "futuristic", "mesh"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-hc04" data-block="hero">
  <div class="b-hc04__mesh"></div>
  <div class="b-hc04__inner">
    <p class="b-hc04__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Next Generation</p>
    <h1 class="b-hc04__title" data-field="hero-title" data-reveal="up">Технологии, формирующие завтра</h1>
    <p class="b-hc04__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Передовые инструменты и решения для цифровой трансформации вашего бизнеса.</p>
    <a class="b-hc04__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Попробовать бесплатно</a>
  </div>
</section>`,
  css: `.b-hc04{position:relative;text-align:center;min-height:90vh;display:flex;align-items:center;justify-content:center;padding:var(--space-section) var(--space-block);overflow:hidden;background:var(--color-bg)}
.b-hc04__mesh{position:absolute;inset:-50%;width:200%;height:200%;background:linear-gradient(45deg,var(--color-primary),var(--color-accent),color-mix(in srgb,var(--color-primary) 60%,var(--color-bg)),var(--color-accent),var(--color-primary));background-size:400% 400%;animation:b-hc04-shift 14s ease infinite;z-index:1;opacity:.35;filter:blur(80px)}
@keyframes b-hc04-shift{0%,100%{background-position:0% 50%}25%{background-position:100% 0%}50%{background-position:100% 100%}75%{background-position:0% 100%}}
.b-hc04__inner{position:relative;z-index:2;max-width:780px;margin:0 auto;padding:0 clamp(1rem,3vw,3rem)}
.b-hc04__eyebrow{color:var(--color-accent);font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;margin:0 0 1.5rem}
.b-hc04__title{font-family:var(--font-heading);font-size:clamp(2.5rem,5.5vw,4.5rem);color:var(--color-text);margin:0;line-height:1.08;letter-spacing:-0.03em}
.b-hc04__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;max-width:520px;margin:1.5rem auto 2.25rem;line-height:1.7}
.b-hc04__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2.25rem;border-radius:var(--radius-full);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s;box-shadow:0 0 0 0 color-mix(in srgb,var(--color-primary) 30%,transparent)}
.b-hc04__btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px color-mix(in srgb,var(--color-primary) 35%,transparent)}
@media(max-width:768px){.b-hc04{min-height:auto;padding:5rem 1.25rem}.b-hc04__mesh{filter:blur(60px)}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "light", label: "Светлый", css: `.b-hc04{background:var(--color-surface)}.b-hc04__mesh{opacity:.2}` },
    { id: "intense", label: "Интенсивный", css: `.b-hc04__mesh{opacity:.55;filter:blur(60px)}.b-hc04__title{color:var(--color-text)}` },
  ],
};
