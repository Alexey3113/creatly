import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-split-left-03",
  name: "Hero — акцентный номер + clip-path",
  description: "Текст слева с крупным декоративным номером за заголовком + изображение справа с clip-path анимацией",
  category: "hero",
  subcategory: "split-left",
  icon: "◩",
  tags: ["split", "accent-number", "clip-path", "decorative", "bold"],
  motionLevel: "css",
  fields: [
    { name: "hero-number", type: "text", hint: "декоративный номер, напр. 01", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 4-7 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения", required: true },
    { name: "hero-cta", type: "link", hint: "текст CTA-кнопки", required: true },
    { name: "hero-image", type: "image", hint: "изображение справа", required: true },
  ],
  html: `<section class="b-hsl03" data-block="hero">
  <div class="b-hsl03__inner">
    <div class="b-hsl03__text">
      <div class="b-hsl03__heading-wrap">
        <span class="b-hsl03__big-num" data-field="hero-number" data-reveal="fade">01</span>
        <h1 class="b-hsl03__title" data-field="hero-title" data-reveal="up">Стратегия, определяющая успех</h1>
      </div>
      <p class="b-hsl03__desc" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Мы строим цифровые стратегии с измеримым результатом. Каждый проект — это рост конверсии на 40%+.</p>
      <a class="b-hsl03__btn" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Обсудить стратегию</a>
    </div>
    <div class="b-hsl03__media" data-reveal="clip">
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="" data-field="hero-image"/>
    </div>
  </div>
</section>`,
  css: `.b-hsl03{background:var(--color-bg);min-height:90vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block)}
.b-hsl03__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(2rem,5vw,4rem);align-items:center;padding:0 clamp(1rem,3vw,3rem)}
.b-hsl03__text{position:relative;max-width:580px}
.b-hsl03__heading-wrap{position:relative}
.b-hsl03__big-num{position:absolute;top:-.45em;left:-.15em;font-family:var(--font-heading);font-size:clamp(6rem,14vw,11rem);font-weight:900;color:var(--color-primary);opacity:.08;line-height:1;letter-spacing:-0.04em;pointer-events:none;z-index:0}
.b-hsl03__title{position:relative;z-index:1;font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em}
.b-hsl03__desc{color:var(--color-text-muted);font-family:var(--font-body);font-size:1.0625rem;margin:1.5rem 0 2rem;line-height:1.7;max-width:460px}
.b-hsl03__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s}
.b-hsl03__btn:hover{transform:translateY(-2px);opacity:.9}
.b-hsl03__media{overflow:hidden;border-radius:var(--radius-lg);clip-path:inset(0 0 0 0);animation:b-hsl03-reveal 1.2s cubic-bezier(.25,.46,.45,.94) both}
@keyframes b-hsl03-reveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.b-hsl03__media img{display:block;width:100%;height:100%;object-fit:cover;aspect-ratio:7/9}
@media(max-width:768px){.b-hsl03{min-height:auto;padding:3rem 1.25rem}.b-hsl03__inner{grid-template-columns:1fr;gap:2rem}.b-hsl03__media{order:-1}.b-hsl03__big-num{font-size:5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hsl03{background:var(--color-primary)}.b-hsl03__title{color:var(--color-text-on-primary)}.b-hsl03__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-hsl03__big-num{color:var(--color-text-on-primary);opacity:.06}.b-hsl03__btn{background:var(--color-accent);color:var(--color-text-on-accent)}` },
    { id: "accent-num", label: "Яркий номер", css: `.b-hsl03__big-num{color:var(--color-accent);opacity:.15}` },
  ],
};
