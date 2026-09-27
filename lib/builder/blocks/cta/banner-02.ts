import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-banner-02",
  name: "CTA — баннер с двумя кнопками",
  description: "CTA на основном фоне с двумя кнопками: основная и призрачная с обводкой",
  category: "cta",
  subcategory: "banner",
  icon: "🔲",
  tags: ["cta", "banner", "dual-button", "primary"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-button-primary", type: "link", hint: "текст основной кнопки", required: true },
    { name: "cta-button-secondary", type: "link", hint: "текст второй кнопки", required: false },
  ],
  html: `<section class="b-ct02" data-block="cta">
  <div class="b-ct02__glow" aria-hidden="true"></div>
  <div class="b-ct02__inner">
    <h2 class="b-ct02__heading" data-field="cta-heading" data-reveal="word">Превратите идеи в реальность</h2>
    <p class="b-ct02__desc" data-field="cta-description" data-reveal="up" style="--stagger:1">Начните работу за считанные минуты — без сложных настроек и долгого обучения.</p>
    <div class="b-ct02__actions" data-reveal="fade" style="--stagger:2">
      <a class="b-ct02__btn b-ct02__btn--primary" href="#" data-field="cta-button-primary" data-magnet="0.25">Попробовать бесплатно</a>
      <a class="b-ct02__btn b-ct02__btn--ghost" href="#" data-field="cta-button-secondary">Узнать больше</a>
    </div>
  </div>
</section>`,
  css: `.b-ct02{position:relative;background:var(--color-primary);padding:clamp(5rem,14vh,8rem) var(--space-block);text-align:center;overflow:hidden}
.b-ct02__glow{position:absolute;bottom:-45%;left:50%;transform:translateX(-50%);width:70vw;height:70vw;max-width:820px;max-height:820px;background:radial-gradient(circle,color-mix(in srgb,var(--color-accent) 30%,transparent) 0%,transparent 60%);filter:blur(46px);pointer-events:none}
.b-ct02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5rem}
.b-ct02__heading{font-family:var(--font-heading);font-size:clamp(2.1rem,5vw,3.75rem);font-weight:800;color:var(--color-text-on-primary);line-height:1.08;letter-spacing:-.025em;margin:0;max-width:820px}
.b-ct02__desc{font-family:var(--font-body);font-size:1.125rem;color:var(--color-text-on-primary);opacity:.85;max-width:600px;margin:0;line-height:1.6}
.b-ct02__actions{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.b-ct02__btn{display:inline-flex;align-items:center;min-height:54px;padding:0 2.2rem;border-radius:var(--radius-full);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,opacity .3s}
.b-ct02__btn--primary{background:var(--color-accent);color:var(--color-text-on-accent);box-shadow:0 16px 40px -12px color-mix(in srgb,var(--color-accent) 60%,transparent)}
.b-ct02__btn--primary:hover{box-shadow:0 22px 50px -14px color-mix(in srgb,var(--color-accent) 75%,transparent)}
.b-ct02__btn--ghost{background:transparent;color:var(--color-text-on-primary);border:1.5px solid color-mix(in srgb,var(--color-text-on-primary) 45%,transparent)}
.b-ct02__btn--ghost:hover{border-color:var(--color-text-on-primary)}
.b-ct02__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct02{padding:3rem 1.25rem}.b-ct02__actions{flex-direction:column;width:100%;max-width:320px}.b-ct02__btn{justify-content:center}}`,
  variants: [
    { id: "primary", label: "Основной", css: "" },
    { id: "accent", label: "Акцентный", css: `.b-ct02{background:var(--color-accent)}.b-ct02__heading{color:var(--color-text-on-accent)}.b-ct02__desc{color:var(--color-text-on-accent)}.b-ct02__btn--ghost{color:var(--color-text-on-accent);border-color:var(--color-text-on-accent)}` },
    { id: "dark", label: "Тёмный", css: `.b-ct02{background:var(--color-bg-alt)}.b-ct02__heading{color:var(--color-text)}.b-ct02__desc{color:var(--color-text-muted)}.b-ct02__btn--primary{background:var(--color-primary);color:var(--color-text-on-primary)}.b-ct02__btn--ghost{color:var(--color-primary);border-color:var(--color-primary)}` },
  ],
};
