import type { BlockPreset } from "../_types";

/**
 * Галерея: слой-проявитель (паттерн «Lithos»).
 * Два изображения одно поверх другого; верхнее видно только в мягком круге,
 * следующем за курсором ([data-reveal-mask] в widgets-runtime, CSS-маска —
 * без canvas). На тач-устройствах и в демо-записи круг сам плывёт по сцене.
 * Классика: до/после, день/ночь, скелет/фасад, эскиз/результат.
 */
export const block: BlockPreset = {
  id: "gallery-reveal-01",
  name: "Слой-проявитель",
  description: "Полноэкранная картинка, под которой курсор «фонариком» проявляет вторую: день/ночь, эскиз/результат, до/после. На тачах круг плывёт сам.",
  category: "gallery",
  subcategory: "reveal",
  icon: "◐",
  tags: ["gallery", "reveal", "spotlight", "cursor", "mask", "interactive", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "gr01-base", type: "image", hint: "базовое изображение (видно всегда)", required: true },
    { name: "gr01-hidden", type: "image", hint: "скрытое изображение (проявляется в круге) — та же композиция", required: true },
    { name: "gr01-title", type: "heading", hint: "заголовок поверх, 3-7 слов; *слово* — курсив", required: true },
    { name: "gr01-hint", type: "text", hint: "подсказка внизу («Ведите курсором»)", required: false },
  ],
  html: `<section class="b-gr01" data-block="gallery" data-reveal-mask="280">
  <div class="b-gr01__base" aria-hidden="true">
    <img data-field="gr01-base" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1900&q=80" alt="" />
  </div>
  <div class="b-gr01__top" data-rm-top aria-hidden="true">
    <img data-field="gr01-hidden" src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1900&q=80" alt="" />
  </div>
  <div class="b-gr01__overlay">
    <h2 class="b-gr01__title" data-field="gr01-title" data-reveal="word">Слои хранят *истории времени*</h2>
    <span class="b-gr01__hint" data-field="gr01-hint">Ведите курсором, чтобы заглянуть глубже</span>
  </div>
</section>`,
  css: `.b-gr01{position:relative;height:100vh;overflow:hidden;background:#0a0a0f;cursor:crosshair}
.b-gr01__base,.b-gr01__top{position:absolute;inset:0}
.b-gr01__base img,.b-gr01__top img{width:100%;height:100%;object-fit:cover;display:block}
.b-gr01__top{will-change:mask-position}
.b-gr01__overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:14vh;text-align:center;pointer-events:none;background:linear-gradient(to bottom,rgba(8,8,12,.42) 0%,transparent 40%,transparent 75%,rgba(8,8,12,.45) 100%)}
.b-gr01__title{font-family:var(--font-heading);font-weight:500;font-size:clamp(2rem,5.5vw,4.5rem);line-height:1.05;letter-spacing:-.03em;color:#fff;margin:0;padding:0 var(--space-block);text-shadow:0 2px 30px rgba(0,0,0,.4)}
.b-gr01__title em{font-style:italic;color:color-mix(in srgb,#fff 86%,var(--color-accent))}
.b-gr01__hint{position:absolute;bottom:clamp(1.5rem,5vh,3rem);left:50%;transform:translateX(-50%);font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6)}
@media(hover:none){.b-gr01{cursor:default}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "compact", label: "Компактный (70vh)", css: `.b-gr01{height:70vh}` },
  ],
};
