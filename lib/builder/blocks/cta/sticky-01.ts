import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-sticky-01",
  name: "CTA — компактная липкая панель",
  description: "Компактная CTA-панель для использования как sticky footer",
  category: "cta",
  subcategory: "sticky",
  icon: "📌",
  tags: ["cta", "sticky", "footer", "bar", "compact"],
  motionLevel: "css",
  fields: [
    { name: "cta-text", type: "text", hint: "текст призыва к действию", required: true },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct09" data-block="cta">
  <div class="b-ct09__inner" data-reveal="fade">
    <p class="b-ct09__text" data-field="cta-text">Специальное предложение — скидка 30% на все тарифы до конца месяца</p>
    <a class="b-ct09__btn" href="#" data-field="cta-button">Получить скидку</a>
  </div>
</section>`,
  css: `.b-ct09{background:var(--color-surface);padding:.875rem var(--space-block);border-top:1px solid var(--color-border)}
.b-ct09__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem}
.b-ct09__text{font-family:var(--font-body);font-size:.9375rem;color:var(--color-text);margin:0;line-height:1.4;font-weight:500}
.b-ct09__btn{display:inline-flex;align-items:center;min-height:42px;padding:0 1.5rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.8125rem;transition:transform .3s,opacity .3s;white-space:nowrap;flex-shrink:0}
.b-ct09__btn:hover{transform:translateY(-1px);opacity:.92}
@media(max-width:768px){.b-ct09{padding:.75rem 1.25rem}.b-ct09__inner{flex-direction:column;text-align:center;gap:.75rem}.b-ct09__text{font-size:.8125rem}.b-ct09__btn{width:100%;justify-content:center}}`,
  variants: [
    { id: "default", label: "По умолчанию", css: "" },
    { id: "primary", label: "Основной", css: `.b-ct09{background:var(--color-primary);border-color:transparent}.b-ct09__text{color:var(--color-text-on-primary)}.b-ct09__btn{background:var(--color-bg);color:var(--color-text)}` },
    { id: "accent", label: "Акцентный", css: `.b-ct09{background:var(--color-accent);border-color:transparent}.b-ct09__text{color:var(--color-text-on-accent)}.b-ct09__btn{background:var(--color-bg);color:var(--color-text)}` },
  ],
};
