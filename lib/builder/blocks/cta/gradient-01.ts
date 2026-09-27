import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-gradient-01",
  name: "CTA — меш-градиент с глассморфизм-кнопкой",
  description: "CTA с mesh-градиентным фоном и кнопкой в стиле глассморфизм",
  category: "cta",
  subcategory: "gradient",
  icon: "🌈",
  tags: ["cta", "gradient", "mesh", "glassmorphism", "modern"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct08" data-block="cta">
  <div class="b-ct08__bg"></div>
  <div class="b-ct08__inner">
    <h2 class="b-ct08__heading" data-field="cta-heading" data-reveal="up">Откройте новые возможности</h2>
    <p class="b-ct08__desc" data-field="cta-description" data-reveal="up" style="--stagger:1">Платформа нового поколения для тех, кто ценит качество, скорость и результат.</p>
    <a class="b-ct08__btn" href="#" data-field="cta-button" data-reveal="scale" style="--stagger:2">Попробовать сейчас</a>
  </div>
</section>`,
  css: `.b-ct08{position:relative;padding:var(--space-section) var(--space-block);text-align:center;overflow:hidden}
.b-ct08__bg{position:absolute;inset:0;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-accent) 50%,var(--color-primary) 100%);background-size:400% 400%;animation:b-ct08-mesh 12s ease infinite}
@keyframes b-ct08-mesh{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.b-ct08__inner{position:relative;z-index:1;max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5rem}
.b-ct08__heading{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,3rem);font-weight:800;color:var(--color-text-on-primary);line-height:1.15;margin:0}
.b-ct08__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-on-primary);opacity:.9;max-width:600px;margin:0;line-height:1.6}
.b-ct08__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2.25rem;border-radius:var(--radius-full);background:rgba(255,255,255,.2);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,background .3s;border:1px solid rgba(255,255,255,.3)}
.b-ct08__btn:hover{transform:translateY(-2px);background:rgba(255,255,255,.3)}
@media(max-width:768px){.b-ct08{padding:3rem 1.25rem}.b-ct08__desc{font-size:1rem}}`,
  variants: [
    { id: "default", label: "По умолчанию", css: "" },
    { id: "warm", label: "Тёплый", css: `.b-ct08__bg{background:linear-gradient(135deg,var(--color-accent) 0%,var(--color-primary) 50%,var(--color-accent) 100%);background-size:400% 400%}` },
    { id: "solid-glass", label: "Стеклянная карточка", css: `.b-ct08__inner{background:rgba(255,255,255,.1);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:var(--radius-lg);padding:3.5rem 3rem;border:1px solid rgba(255,255,255,.15);max-width:720px}` },
  ],
};
