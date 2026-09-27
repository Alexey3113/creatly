import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "cta-countdown-01",
  name: "CTA — с обратным отсчётом",
  description: "CTA-блок с визуальным таймером обратного отсчёта (дни/часы/минуты/секунды)",
  category: "cta",
  subcategory: "countdown",
  icon: "⏱",
  tags: ["cta", "countdown", "timer", "urgency"],
  motionLevel: "css",
  fields: [
    { name: "cta-heading", type: "heading", hint: "заголовок призыва к действию", required: true },
    { name: "cta-description", type: "text", hint: "описание / подзаголовок", required: false },
    { name: "cta-days", type: "stat", hint: "количество дней", required: true },
    { name: "cta-hours", type: "stat", hint: "количество часов", required: true },
    { name: "cta-minutes", type: "stat", hint: "количество минут", required: true },
    { name: "cta-seconds", type: "stat", hint: "количество секунд", required: true },
    { name: "cta-button", type: "link", hint: "текст кнопки", required: true },
  ],
  html: `<section class="b-ct07" data-block="cta">
  <div class="b-ct07__inner">
    <h2 class="b-ct07__heading" data-field="cta-heading" data-reveal="up">Специальное предложение заканчивается</h2>
    <p class="b-ct07__desc" data-field="cta-description" data-reveal="up" style="--stagger:1">Успейте воспользоваться скидкой 40% на все тарифы — время ограничено.</p>
    <div class="b-ct07__timer" data-reveal="scale" style="--stagger:2">
      <div class="b-ct07__unit">
        <span class="b-ct07__value" data-field="cta-days">12</span>
        <span class="b-ct07__label">Дней</span>
      </div>
      <span class="b-ct07__sep">:</span>
      <div class="b-ct07__unit">
        <span class="b-ct07__value" data-field="cta-hours">08</span>
        <span class="b-ct07__label">Часов</span>
      </div>
      <span class="b-ct07__sep">:</span>
      <div class="b-ct07__unit">
        <span class="b-ct07__value" data-field="cta-minutes">45</span>
        <span class="b-ct07__label">Минут</span>
      </div>
      <span class="b-ct07__sep">:</span>
      <div class="b-ct07__unit">
        <span class="b-ct07__value" data-field="cta-seconds">23</span>
        <span class="b-ct07__label">Секунд</span>
      </div>
    </div>
    <a class="b-ct07__btn" href="#" data-field="cta-button" data-reveal="fade" style="--stagger:3">Получить скидку</a>
  </div>
</section>`,
  css: `.b-ct07{background:var(--color-bg-alt);padding:var(--space-section) var(--space-block);text-align:center}
.b-ct07__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:2rem}
.b-ct07__heading{font-family:var(--font-heading);font-size:clamp(1.5rem,3.5vw,2.5rem);font-weight:800;color:var(--color-text);line-height:1.15;margin:0}
.b-ct07__desc{font-family:var(--font-body);font-size:1.0625rem;color:var(--color-text-muted);margin:0;line-height:1.6;max-width:560px}
.b-ct07__timer{display:flex;align-items:center;gap:1rem}
.b-ct07__unit{display:flex;flex-direction:column;align-items:center;background:var(--color-surface);border-radius:var(--radius-md);padding:1.25rem 1.5rem;min-width:80px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.b-ct07__value{font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;color:var(--color-primary);line-height:1}
.b-ct07__label{font-family:var(--font-body);font-size:.75rem;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.08em;margin-top:.375rem}
.b-ct07__sep{font-family:var(--font-heading);font-size:2rem;font-weight:700;color:var(--color-text-muted);line-height:1}
.b-ct07__btn{display:inline-flex;align-items:center;min-height:52px;padding:0 2rem;border-radius:var(--radius-md);background:var(--color-primary);color:var(--color-text-on-primary);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.9375rem;transition:transform .3s,opacity .3s}
.b-ct07__btn:hover{transform:translateY(-2px);opacity:.92}
@media(max-width:768px){.b-ct07{padding:3rem 1.25rem}.b-ct07__timer{gap:.5rem}.b-ct07__unit{padding:.875rem 1rem;min-width:60px}.b-ct07__sep{font-size:1.5rem}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "accent", label: "Акцентный", css: `.b-ct07{background:var(--color-accent)}.b-ct07__heading{color:var(--color-text-on-accent)}.b-ct07__desc{color:var(--color-text-on-accent);opacity:.85}.b-ct07__sep{color:var(--color-text-on-accent)}.b-ct07__btn{background:var(--color-bg);color:var(--color-text)}` },
    { id: "dark", label: "Тёмный", css: `.b-ct07{background:var(--color-primary)}.b-ct07__heading{color:var(--color-text-on-primary)}.b-ct07__desc{color:var(--color-text-on-primary);opacity:.85}.b-ct07__unit{background:rgba(255,255,255,.1)}.b-ct07__value{color:var(--color-text-on-primary)}.b-ct07__label{color:var(--color-text-on-primary);opacity:.7}.b-ct07__sep{color:var(--color-text-on-primary);opacity:.5}.b-ct07__btn{background:var(--color-bg);color:var(--color-text)}` },
  ],
};
