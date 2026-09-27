import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "hero-minimal-01",
  name: "Hero — редакционный минимал",
  description: "Крупный серифный заголовок по центру с мелким подзаголовком. Журнальная эстетика, максимум воздуха",
  category: "hero",
  subcategory: "minimal",
  icon: "◇",
  tags: ["minimal", "editorial", "serif", "typography", "clean"],
  motionLevel: "css",
  fields: [
    { name: "hero-title", type: "heading", hint: "главный заголовок 3-6 слов, ёмкий и выразительный", required: true },
    { name: "hero-subtitle", type: "text", hint: "короткий подзаголовок 3-5 слов, приглушённый", required: false },
  ],
  html: `<section class="b-hmn01" data-block="hero">
  <div class="b-hmn01__inner">
    <h1 class="b-hmn01__title" data-field="hero-title" data-reveal="up">Искусство создавать пространство</h1>
    <p class="b-hmn01__sub" data-field="hero-subtitle" data-reveal="fade" style="--stagger:1">архитектура · интерьер · свет</p>
  </div>
</section>`,
  css: `.b-hmn01{min-height:90vh;display:flex;align-items:center;justify-content:center;padding:var(--space-section) var(--space-block);background:var(--color-bg);text-align:center}
.b-hmn01__inner{max-width:960px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:2rem}
.b-hmn01__title{font-family:var(--font-heading);font-size:clamp(3rem,8vw,7rem);color:var(--color-text);margin:0;line-height:1.02;letter-spacing:-0.03em;font-weight:400}
.b-hmn01__sub{font-family:var(--font-body);font-size:clamp(0.8125rem,1.2vw,1rem);color:var(--color-text-muted);margin:0;letter-spacing:0.25em;text-transform:uppercase;font-weight:400}
@media(max-width:768px){.b-hmn01{min-height:80vh;padding:6rem 1.25rem}.b-hmn01__inner{gap:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hmn01{background:var(--color-primary)}.b-hmn01__title{color:var(--color-text-on-primary)}.b-hmn01__sub{color:color-mix(in srgb,var(--color-text-on-primary) 50%,transparent)}` },
    { id: "surface", label: "На подложке", css: `.b-hmn01{background:var(--color-surface)}.b-hmn01__sub{color:var(--color-accent);letter-spacing:0.35em}` },
  ],
};
