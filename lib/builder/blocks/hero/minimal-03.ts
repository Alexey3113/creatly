import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-minimal-03",
  name: "Hero — акцентное слово",
  description: "Заголовок с выделенным словом в акцентном цвете, лейбл сверху и подзаголовок снизу. Чистая типографика",
  category: "hero",
  subcategory: "minimal",
  icon: "◇",
  tags: ["minimal", "accent", "highlight", "typography", "eyebrow"],
  motionLevel: "css",
  fields: [
    { name: "hero-label", type: "text", hint: "лейбл над заголовком 2-3 слова, uppercase", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок 4-7 слов, одно ключевое слово обернуть в <em>", required: true },
    { name: "hero-subtitle", type: "text", hint: "подзаголовок 1-2 предложения, раскрывает суть", required: false },
  ],
  html: `<section class="b-hmn03" data-block="hero">
  <div class="b-hmn03__inner">
    <p class="b-hmn03__label" data-field="hero-label" data-reveal="fade">Цифровая студия</p>
    <h1 class="b-hmn03__title" data-field="hero-title" data-reveal="up" style="--stagger:1">Превращаем идеи в <em>выдающийся</em> дизайн</h1>
    <p class="b-hmn03__sub" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Команда из 20 дизайнеров и разработчиков создаёт продукты, которые двигают бизнес вперёд</p>
  </div>
</section>`,
  css: `.b-hmn03{min-height:85vh;display:flex;align-items:center;justify-content:center;padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-hmn03__inner{max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5rem}
.b-hmn03__label{font-family:var(--font-body);font-size:0.75rem;color:var(--color-text-muted);margin:0;text-transform:uppercase;letter-spacing:0.2em;font-weight:600}
.b-hmn03__title{font-family:var(--font-heading);font-size:clamp(2.25rem,5.5vw,4.5rem);color:var(--color-text);margin:0;line-height:1.1;letter-spacing:-0.02em;font-weight:400}
.b-hmn03__title em{color:var(--color-accent);font-style:normal}
.b-hmn03__sub{font-family:var(--font-body);font-size:clamp(0.9375rem,1.2vw,1.125rem);color:var(--color-text-muted);margin:0;line-height:1.65;max-width:600px}
@media(max-width:768px){.b-hmn03{min-height:80vh;padding:5rem 1.25rem}.b-hmn03__inner{gap:1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hmn03{background:var(--color-primary)}.b-hmn03__title{color:var(--color-text-on-primary)}.b-hmn03__label{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}.b-hmn03__sub{color:color-mix(in srgb,var(--color-text-on-primary) 60%,transparent)}` },
    { id: "surface", label: "На подложке", css: `.b-hmn03{background:var(--color-surface)}.b-hmn03__label{color:var(--color-accent)}` },
  ],
};
