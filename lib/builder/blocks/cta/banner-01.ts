import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-banner-01",
  name: "CTA — полноширинный баннер",
  description: "Полноширинный CTA-блок с заголовком, описанием и кнопкой на акцентном фоне",
  category: "cta",
  subcategory: "banner",
  icon: "📢",
  tags: ["cta", "banner", "fullwidth", "accent"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct01" data-block="cta">
  <div class="b-ct01__inner">
    <h2 class="b-ct01__heading" data-field="cta-heading" data-reveal="up">Готовы начать свой проект?</h2>
    <p class="b-ct01__desc" data-field="cta-description" data-reveal="up" style="--stagger:1">Присоединяйтесь к тысячам профессионалов, которые уже используют нашу платформу для достижения результатов.</p>
    <a class="b-ct01__btn" href="#" data-field="cta-button" data-reveal="scale" style="--stagger:2">Начать бесплатно</a>
  </div>
</section>`,
  css: `.b-ct01{background:var(--color-accent);padding:var(--space-section) var(--space-block);text-align:center}
.b-ct01__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5rem}
.b-ct01__heading{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,3rem);font-weight:800;color:var(--color-text-on-accent);line-height:1.15;margin:0}
.b-ct01__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-on-accent);opacity:.85;max-width:640px;margin:0;line-height:1.6}
.b-ct01__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-bg);color:var(--color-text);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s}
.b-ct01__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct01{padding:3rem 1.25rem}.b-ct01__desc{font-size:1rem}}`,
  variants: [
    { id: "accent", label: "Акцентный", css: "" },
    { id: "primary", label: "Основной", css: `.b-ct01{background:var(--color-primary)}.b-ct01__heading{color:var(--color-text-on-primary)}.b-ct01__desc{color:var(--color-text-on-primary)}` },
    { id: "surface", label: "Поверхность", css: `.b-ct01{background:var(--color-surface)}.b-ct01__heading{color:var(--color-text)}.b-ct01__desc{color:var(--color-text-muted)}.b-ct01__btn{background:var(--color-primary);color:var(--color-text-on-primary)}` },
  ],
};
