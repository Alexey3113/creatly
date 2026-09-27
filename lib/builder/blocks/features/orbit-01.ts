import type { BlockPreset } from "../_types";

/**
 * Фичи: вращающаяся орбита (паттерн «Radial Diagram» / «Master the Elements»).
 * Секция прилипает, элементы разложены по кругу вокруг центра (углы раздаёт
 * widgets-runtime через --a); всё кольцо вращается по мере скролла (--p от
 * story-runtime), при этом каждый элемент контр-вращается и остаётся читаемым.
 */
export const block: BlockPreset = {
  id: "features-orbit-01",
  name: "Орбита возможностей",
  description: "Элементы кружат вокруг центрального тезиса, кольцо вращается по мере скролла. Гипнотично; для экосистем, услуг, «всё связано». Лучше 6 элементов.",
  category: "features",
  subcategory: "orbit",
  icon: "◎",
  tags: ["features", "orbit", "radial", "rotate", "pin", "scroll", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "fo01-center-eyebrow", type: "text", hint: "надпись над центром, 1-2 слова", required: false },
    { name: "fo01-center-title", type: "heading", hint: "центральный тезис, 1-3 слова", required: true },
    { name: "fo01-item-icon", type: "icon", hint: "эмодзи/символ элемента", required: false },
    { name: "fo01-item-label", type: "text", hint: "название элемента, 1-2 слова", required: true },
  ],
  html: `<section class="b-fo01" data-block="features" data-story>
  <div class="b-fo01__stage" data-story-stage>
    <div class="b-fo01__center">
      <span class="b-fo01__eyebrow" data-field="fo01-center-eyebrow">Экосистема</span>
      <h2 class="b-fo01__title" data-field="fo01-center-title">Всё связано</h2>
    </div>
    <div class="b-fo01__ring" data-orbit data-collection="fo01-items">
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">⚡</span>
          <span class="b-fo01__label" data-field="fo01-item-label">Скорость</span>
        </div>
      </div>
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">◈</span>
          <span class="b-fo01__label" data-field="fo01-item-label">Дизайн</span>
        </div>
      </div>
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">🤖</span>
          <span class="b-fo01__label" data-field="fo01-item-label">AI</span>
        </div>
      </div>
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">📈</span>
          <span class="b-fo01__label" data-field="fo01-item-label">Рост</span>
        </div>
      </div>
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">🔒</span>
          <span class="b-fo01__label" data-field="fo01-item-label">Надёжность</span>
        </div>
      </div>
      <div class="b-fo01__item" data-orbit-item data-collection-item>
        <div class="b-fo01__chip">
          <span class="b-fo01__icon" data-field="fo01-item-icon">∞</span>
          <span class="b-fo01__label" data-field="fo01-item-label">Масштаб</span>
        </div>
      </div>
    </div>
    <div class="b-fo01__orbit-line" aria-hidden="true"></div>
  </div>
</section>`,
  css: `.b-fo01{position:relative;height:260vh;background:var(--color-primary)}
.b-fo01__stage{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center}
.b-fo01__orbit-line{position:absolute;top:50%;left:50%;width:min(74vh,640px);aspect-ratio:1;transform:translate(-50%,-50%);border:1px dashed color-mix(in srgb,var(--color-text-on-primary) 16%,transparent);border-radius:50%}
.b-fo01__center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:2;max-width:44vw}
.b-fo01__eyebrow{display:block;font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--color-accent);margin-bottom:.75rem}
.b-fo01__title{font-family:var(--font-heading);font-size:clamp(2rem,5vw,3.75rem);letter-spacing:-.02em;color:var(--color-text-on-primary);margin:0}
.b-fo01__ring{position:absolute;top:50%;left:50%;width:min(74vh,640px);aspect-ratio:1;transform:translate(-50%,-50%) rotate(calc(var(--p,0)*140deg));z-index:1}
.b-fo01__item{position:absolute;top:50%;left:50%;transform:rotate(var(--a,0deg)) translate(0,calc(min(37vh,320px)*-1)) rotate(calc(-1*var(--a,0deg) - var(--p,0)*140deg))}
.b-fo01__chip{transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:1rem 1.25rem;border-radius:var(--radius-lg);background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);backdrop-filter:blur(8px);border:1px solid color-mix(in srgb,var(--color-text-on-primary) 12%,transparent);white-space:nowrap;transition:transform .3s,background .3s}
.b-fo01__chip:hover{background:color-mix(in srgb,var(--color-accent) 25%,transparent);transform:translate(-50%,-50%) scale(1.08)}
.b-fo01__icon{font-size:1.5rem;line-height:1}
.b-fo01__label{font-family:var(--font-body);font-size:.8125rem;font-weight:700;color:var(--color-text-on-primary)}
@media(max-width:768px){.b-fo01{height:220vh}.b-fo01__ring,.b-fo01__orbit-line{width:min(58vh,360px)}.b-fo01__item{transform:rotate(var(--a,0deg)) translate(0,calc(min(29vh,180px)*-1)) rotate(calc(-1*var(--a,0deg) - var(--p,0)*140deg))}.b-fo01__chip{padding:.7rem .8rem}.b-fo01__label{font-size:.7rem}}`,
  variants: [
    { id: "brand", label: "Брендовый", css: "" },
    { id: "dark", label: "Чёрный", css: `.b-fo01{background:#0a0a0f}` },
    { id: "light", label: "Светлый", css: `.b-fo01{background:var(--color-bg)}.b-fo01__title{color:var(--color-text)}.b-fo01__label{color:var(--color-text)}.b-fo01__orbit-line{border-color:color-mix(in srgb,var(--color-text) 14%,transparent)}.b-fo01__chip{background:var(--color-surface);border-color:var(--color-border)}` },
  ],
};
