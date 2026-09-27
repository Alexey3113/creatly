import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "pricing-minimal-01",
  name: "Тариф — минимал, одна цена",
  description: "Минималистичный блок: одна крупная цена, короткое описание и CTA",
  category: "pricing",
  subcategory: "minimal",
  icon: "◆",
  tags: ["minimal", "single", "clean"],
  motionLevel: "css",
  fields: [
    { name: "pricing-eyebrow", type: "text", hint: "короткий лейбл", required: false },
    { name: "pricing-price", type: "stat", hint: "цена", required: true },
    { name: "pricing-period", type: "text", hint: "период оплаты", required: false },
    { name: "pricing-desc", type: "text", hint: "краткое описание", required: true },
    { name: "pricing-cta", type: "link", hint: "текст CTA-кнопки", required: true },
  ],
  html: `<section class="b-pr09" data-block="pricing">
  <div class="b-pr09__inner">
    <p class="b-pr09__eyebrow" data-field="pricing-eyebrow" data-reveal="fade">Стоимость</p>
    <div class="b-pr09__price" data-field="pricing-price" data-reveal="up">2 490 ₽</div>
    <p class="b-pr09__period" data-field="pricing-period" data-reveal="fade" style="--stagger:1">в месяц за пользователя</p>
    <p class="b-pr09__desc" data-field="pricing-desc" data-reveal="fade" style="--stagger:2">Все функции включены. Без скрытых платежей. Отмена в любой момент.</p>
    <a class="b-btn" href="#" data-field="pricing-cta" data-reveal="fade" style="--stagger:3">Начать бесплатно</a>
  </div>
</section>`,
  css: `.b-pr09{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-pr09__inner{max-width:var(--container-width,1400px);margin:0 auto;text-align:center}
.b-pr09__eyebrow{font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.8125rem;color:var(--color-accent);margin:0 0 1.5rem}
.b-pr09__price{font-family:var(--font-heading);font-size:clamp(3rem,7vw,6rem);font-weight:800;color:var(--color-text);margin:0;line-height:1.1}
.b-pr09__period{font-family:var(--font-body);font-size:1rem;color:var(--color-text-muted);margin:.5rem 0 1.5rem}
.b-pr09__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-muted);max-width:480px;margin:0 auto 2.5rem;line-height:1.65}
.b-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2.5rem;border-radius:var(--radius-md);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:1rem}
@media(max-width:768px){.b-pr09{padding:3rem 1.25rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-pr09{background:var(--color-primary)}.b-pr09__price{color:var(--color-text-on-primary)}.b-pr09__period,.b-pr09__desc{color:color-mix(in srgb,var(--color-text-on-primary) 65%,transparent)}` },
    { id: "accent", label: "Акцентный", css: `.b-pr09{background:var(--color-accent)}.b-pr09__eyebrow{color:var(--color-text-on-accent)}.b-pr09__price{color:var(--color-text-on-accent)}.b-pr09__period,.b-pr09__desc{color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent)}` },
  ],
};
