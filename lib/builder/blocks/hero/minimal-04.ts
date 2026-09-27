import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-minimal-04",
  name: "Hero — вертикальный редакционный",
  description: "Левая колонка 50% ширины: eyebrow + крупный заголовок + декоративная линия + подзаголовок. Правая половина — пустое пространство. Редакционный вертикальный ритм.",
  category: "hero",
  subcategory: "minimal",
  icon: "│",
  tags: ["minimal", "editorial", "vertical", "left-aligned", "whitespace"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "короткий лейбл 2-3 слова, uppercase, трекинг", required: false },
    { name: "hero-title", type: "heading", hint: "главный заголовок 3-6 слов, крупный", required: true },
    { name: "hero-subtitle", type: "text", hint: "описание 1-2 предложения, спокойный тон", required: true },
  ],
  html: `<section class="b-hmn04" data-block="hero">
  <div class="b-hmn04__inner">
    <div class="b-hmn04__content">
      <p class="b-hmn04__eyebrow" data-field="hero-eyebrow" data-reveal="fade">Архитектура пространств</p>
      <h1 class="b-hmn04__title" data-field="hero-title" data-reveal="up">Проектируем среду для жизни и работы</h1>
      <span class="b-hmn04__dash" data-reveal="fade" style="--stagger:1" aria-hidden="true"></span>
      <p class="b-hmn04__subtitle" data-field="hero-subtitle" data-reveal="fade" style="--stagger:2">Каждый проект начинается с диалога — мы слушаем, исследуем контекст и создаём пространства, которые работают на вас.</p>
    </div>
  </div>
</section>`,
  css: `.b-hmn04{min-height:88vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hmn04__inner{width:100%;max-width:var(--container-width,1400px);margin:0 auto}
.b-hmn04__content{max-width:50%;display:flex;flex-direction:column;align-items:flex-start}
.b-hmn04__eyebrow{font-family:var(--font-body);font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:var(--color-text-muted);margin:0 0 2rem}
.b-hmn04__title{font-family:var(--font-heading);font-size:clamp(2.25rem,5vw,4.25rem);line-height:1.08;letter-spacing:-0.025em;color:var(--color-text);margin:0 0 2.5rem;font-weight:700}
.b-hmn04__dash{display:block;width:60px;height:2px;background:var(--color-accent);margin:0 0 2.5rem;flex-shrink:0}
.b-hmn04__subtitle{font-family:var(--font-body);font-size:1.125rem;line-height:1.7;color:var(--color-text-muted);margin:0;max-width:480px}
@media(max-width:1024px){.b-hmn04__content{max-width:70%}}
@media(max-width:768px){.b-hmn04{min-height:auto;padding:5rem 1.25rem}.b-hmn04__content{max-width:100%}.b-hmn04__title{font-size:clamp(1.75rem,7vw,2.5rem);margin-bottom:1.75rem}.b-hmn04__eyebrow{margin-bottom:1.5rem}.b-hmn04__dash{margin-bottom:1.75rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hmn04{background:var(--color-surface)}.b-hmn04__title{color:var(--color-text)}.b-hmn04__eyebrow{color:var(--color-accent)}` },
    { id: "primary", label: "На основном цвете", css: `.b-hmn04{background:var(--color-primary)}.b-hmn04__title{color:var(--color-text-on-primary)}.b-hmn04__eyebrow{color:var(--color-accent)}.b-hmn04__subtitle{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}.b-hmn04__dash{background:var(--color-text-on-primary);opacity:.35}` },
  ],
};
