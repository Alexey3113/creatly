import type { BlockPreset } from "../_types";

/**
 * Бегущая строка — две встречные ленты слов/брендов.
 * Петлю замыкает widgets-runtime (дублирует дорожку), анимация чисто CSS,
 * на hover лента замирает. Дешёвый живой ритм между тяжёлыми секциями.
 */
export const block: BlockPreset = {
  id: "testimonials-marquee-01",
  name: "Бегущая строка",
  description: "Две встречные бегущие ленты слов или брендов с разделителями. Останавливается при наведении. Идеальная «прослойка» между крупными секциями.",
  category: "testimonials",
  subcategory: "marquee",
  icon: "∞",
  tags: ["marquee", "ticker", "brands", "logos", "motion", "wow", "divider"],
  motionLevel: "css",
  fields: [
    { name: "mq01-word", type: "text", hint: "слово/бренд первой ленты", required: true },
    { name: "mq01-word-b", type: "text", hint: "слово/бренд второй (встречной) ленты", required: true },
  ],
  html: `<section class="b-mq01" data-block="testimonials">
  <div class="b-mq01__row">
    <div class="b-mq01__track" data-marquee data-collection="mq01-words">
      <span class="b-mq01__item" data-collection-item><em data-field="mq01-word">Стратегия</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item" data-collection-item><em data-field="mq01-word">Айдентика</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item" data-collection-item><em data-field="mq01-word">Продукт</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item" data-collection-item><em data-field="mq01-word">Кампании</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item" data-collection-item><em data-field="mq01-word">Motion</em><i aria-hidden="true">✦</i></span>
    </div>
  </div>
  <div class="b-mq01__row b-mq01__row--reverse">
    <div class="b-mq01__track" data-marquee data-collection="mq01-words-b">
      <span class="b-mq01__item b-mq01__item--ghost" data-collection-item><em data-field="mq01-word-b">Исследования</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item b-mq01__item--ghost" data-collection-item><em data-field="mq01-word-b">Разработка</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item b-mq01__item--ghost" data-collection-item><em data-field="mq01-word-b">Аналитика</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item b-mq01__item--ghost" data-collection-item><em data-field="mq01-word-b">Контент</em><i aria-hidden="true">✦</i></span>
      <span class="b-mq01__item b-mq01__item--ghost" data-collection-item><em data-field="mq01-word-b">Поддержка</em><i aria-hidden="true">✦</i></span>
    </div>
  </div>
</section>`,
  css: `.b-mq01{padding:clamp(2rem,6vh,4rem) 0;background:var(--color-bg);overflow:hidden}
.b-mq01__row{display:flex;width:max-content;animation:b-mq01-scroll 28s linear infinite}
.b-mq01__row--reverse{animation-direction:reverse;animation-duration:34s;margin-top:.5rem}
.b-mq01__row:hover{animation-play-state:paused}
.b-mq01__track{display:flex;align-items:center}
.b-mq01__item{display:inline-flex;align-items:center;white-space:nowrap}
.b-mq01__item em{font-family:var(--font-heading);font-style:normal;font-size:clamp(2rem,5vw,4rem);letter-spacing:-.02em;color:var(--color-text);padding:0 clamp(1rem,2.5vw,2rem)}
.b-mq01__item i{font-style:normal;font-size:clamp(1rem,2vw,1.5rem);color:var(--color-accent)}
.b-mq01__item--ghost em{color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--color-text) 45%,transparent)}
@keyframes b-mq01-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.b-mq01__row{animation:none}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-mq01{background:#0a0a0f}.b-mq01__item em{color:#fff}.b-mq01__item--ghost em{color:transparent;-webkit-text-stroke-color:rgba(255,255,255,.4)}` },
    { id: "accent", label: "Акцентная плашка", css: `.b-mq01{background:var(--color-accent)}.b-mq01__item em{color:var(--color-text-on-accent)}.b-mq01__item i{color:color-mix(in srgb,var(--color-text-on-accent) 60%,transparent)}.b-mq01__item--ghost em{color:transparent;-webkit-text-stroke-color:color-mix(in srgb,var(--color-text-on-accent) 55%,transparent)}` },
  ],
};
