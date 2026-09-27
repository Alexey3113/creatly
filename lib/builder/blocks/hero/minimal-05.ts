import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-minimal-05",
  name: "Hero — моноширинный, технический",
  description: "Моноширинный заголовок с форматированными числами в стиле обратного отсчёта. Под ним — текстовая ссылка со стрелкой вместо кнопки. Минималистичная техно-эстетика.",
  category: "hero",
  subcategory: "minimal",
  icon: "▪",
  tags: ["minimal", "monospace", "tech", "typewriter", "countdown", "link"],
  motionLevel: "css",
  fields: [
    { name: "hero-eyebrow", type: "text", hint: "метка или дата, моноширинный стиль", required: false },
    { name: "hero-title", type: "heading", hint: "заголовок с числами или кодовой стилистикой, 3-8 слов", required: true },
    { name: "hero-subtitle", type: "text", hint: "краткое пояснение 1 предложение", required: false },
    { name: "hero-cta", type: "link", hint: "текст текстовой ссылки 2-4 слова", required: true },
  ],
  html: `<section class="b-hmn05" data-block="hero">
  <div class="b-hmn05__inner">
    <p class="b-hmn05__eyebrow" data-field="hero-eyebrow" data-reveal="fade">запуск // 2024.06.15</p>
    <h1 class="b-hmn05__title" data-field="hero-title" data-reveal="up">Платформа нового поколения для цифровых команд</h1>
    <p class="b-hmn05__subtitle" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">Инструменты, которые ускоряют работу в 3 раза — без сложных настроек.</p>
    <a class="b-hmn05__link" href="#" data-field="hero-cta" data-reveal="fade" style="--stagger:2">Узнать подробности <span class="b-hmn05__arrow" aria-hidden="true">→</span></a>
  </div>
</section>`,
  css: `.b-hmn05{min-height:85vh;display:flex;align-items:center;padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-hmn05__inner{width:100%;max-width:900px;margin:0 auto}
.b-hmn05__eyebrow{font-family:monospace;font-size:.8125rem;letter-spacing:.08em;color:var(--color-text-muted);margin:0 0 2rem;opacity:.7}
.b-hmn05__title{font-family:monospace;font-size:clamp(2rem,4.5vw,3.75rem);line-height:1.15;letter-spacing:-0.01em;color:var(--color-text);margin:0 0 1.5rem;font-weight:700}
.b-hmn05__subtitle{font-family:var(--font-body);font-size:1.0625rem;line-height:1.7;color:var(--color-text-muted);margin:0 0 2.5rem;max-width:540px}
.b-hmn05__link{font-family:var(--font-body);font-size:1rem;color:var(--color-text);text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px;text-decoration-color:var(--color-border);display:inline-flex;align-items:center;gap:.5rem;transition:text-decoration-color .3s,color .3s}
.b-hmn05__link:hover{text-decoration-color:var(--color-accent);color:var(--color-accent)}
.b-hmn05__arrow{display:inline-block;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.b-hmn05__link:hover .b-hmn05__arrow{transform:translateX(4px)}
@media(max-width:768px){.b-hmn05{min-height:auto;padding:5rem 1.25rem}.b-hmn05__title{font-size:clamp(1.5rem,6vw,2.25rem);margin-bottom:1.25rem}.b-hmn05__subtitle{margin-bottom:2rem}}`,
  variants: [
    { id: "default", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hmn05{background:var(--color-surface)}.b-hmn05__link{color:var(--color-text)}.b-hmn05__link:hover{color:var(--color-accent)}` },
    { id: "accent-bg", label: "Акцентный фон", css: `.b-hmn05{background:var(--color-accent)}.b-hmn05__title{color:var(--color-text-on-accent)}.b-hmn05__eyebrow{color:var(--color-text-on-accent);opacity:.5}.b-hmn05__subtitle{color:color-mix(in srgb,var(--color-text-on-accent) 60%,transparent)}.b-hmn05__link{color:var(--color-text-on-accent);text-decoration-color:color-mix(in srgb,var(--color-text-on-accent) 30%,transparent)}.b-hmn05__link:hover{color:var(--color-text-on-accent);text-decoration-color:var(--color-text-on-accent)}` },
  ],
};
