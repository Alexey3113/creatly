import type { BlockPreset } from "../_types";

/**
 * Storytelling: наплывающие экраны (curtain overlap).
 * Каждая следующая полноэкранная панель выезжает ПОВЕРХ предыдущей —
 * чистый CSS: панели идут в потоке, каждая position:sticky top:0, поэтому
 * следующая просто накрывает предыдущую при скролле. Ноль JS, работает везде.
 * Скруглённый верх и тень у панелей дают физику «листа, наезжающего сверху».
 */
export const block: BlockPreset = {
  id: "story-curtain-01",
  name: "Наплывающие экраны",
  description: "Полноэкранные панели, где каждая следующая выезжает поверх предыдущей при скролле. Чередование цветов фона, крупная типографика, фото сбоку. Чистый CSS — идеально стабильно.",
  category: "story",
  subcategory: "curtain",
  icon: "▩",
  tags: ["storytelling", "curtain", "overlap", "panels", "fullscreen", "scroll", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "sc01-panel-tag", type: "text", hint: "метка панели («01 — Проблема»)", required: false },
    { name: "sc01-panel-title", type: "heading", hint: "заголовок панели, 3-7 слов", required: true },
    { name: "sc01-panel-text", type: "text", hint: "текст панели, 1-3 предложения", required: false },
    { name: "sc01-panel-image", type: "image", hint: "изображение панели", required: false },
  ],
  html: `<section class="b-sc01" data-block="story">
  <div class="b-sc01__panels" data-collection="sc01-panels">
    <article class="b-sc01__panel b-sc01__panel--a" data-collection-item>
      <div class="b-sc01__body">
        <span class="b-sc01__tag" data-field="sc01-panel-tag">01 — Проблема</span>
        <h2 class="b-sc01__title" data-field="sc01-panel-title">Сайты все на одно лицо</h2>
        <p class="b-sc01__text" data-field="sc01-panel-text">Шаблонные конструкторы дают шаблонный результат. Посетитель не запоминает ничего — и уходит к тому, кого запомнил.</p>
      </div>
      <div class="b-sc01__media"><img data-field="sc01-panel-image" src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80" alt="" /></div>
    </article>
    <article class="b-sc01__panel b-sc01__panel--b" data-collection-item>
      <div class="b-sc01__body">
        <span class="b-sc01__tag" data-field="sc01-panel-tag">02 — Решение</span>
        <h2 class="b-sc01__title" data-field="sc01-panel-title">История вместо страницы</h2>
        <p class="b-sc01__text" data-field="sc01-panel-text">Мы ведём посетителя по нарративу: каждый экран — глава, каждая глава — шаг к решению.</p>
      </div>
      <div class="b-sc01__media"><img data-field="sc01-panel-image" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="" /></div>
    </article>
    <article class="b-sc01__panel b-sc01__panel--c" data-collection-item>
      <div class="b-sc01__body">
        <span class="b-sc01__tag" data-field="sc01-panel-tag">03 — Результат</span>
        <h2 class="b-sc01__title" data-field="sc01-panel-title">Сайт, который пересказывают</h2>
        <p class="b-sc01__text" data-field="sc01-panel-text">Внимание дольше, доверие выше, заявок больше. И да — его снимают в сторис.</p>
      </div>
      <div class="b-sc01__media"><img data-field="sc01-panel-image" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="" /></div>
    </article>
  </div>
</section>`,
  css: `.b-sc01{position:relative}
.b-sc01__panel{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:clamp(2rem,5vw,4rem);padding:0 var(--space-block);border-radius:calc(var(--radius-lg)*1.4) calc(var(--radius-lg)*1.4) 0 0;box-shadow:0 -30px 60px -30px rgba(0,0,0,.35);overflow:hidden}
.b-sc01__panel--a{background:var(--color-bg)}
.b-sc01__panel--b{background:var(--color-primary)}
.b-sc01__panel--b .b-sc01__title{color:var(--color-text-on-primary)}
.b-sc01__panel--b .b-sc01__text{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}
.b-sc01__panel--c{background:var(--color-accent)}
.b-sc01__panel--c .b-sc01__tag{color:var(--color-text-on-accent);opacity:.75}
.b-sc01__panel--c .b-sc01__title{color:var(--color-text-on-accent)}
.b-sc01__panel--c .b-sc01__text{color:color-mix(in srgb,var(--color-text-on-accent) 82%,transparent)}
.b-sc01__body{max-width:560px;justify-self:end;text-align:left}
.b-sc01__tag{display:inline-block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent);margin-bottom:1.25rem}
.b-sc01__title{font-family:var(--font-heading);font-size:clamp(2rem,4.6vw,3.75rem);line-height:1.06;letter-spacing:-.025em;color:var(--color-text);margin:0 0 1.25rem}
.b-sc01__text{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.2rem);line-height:1.7;color:var(--color-text-muted);margin:0}
.b-sc01__media{align-self:stretch;display:flex;align-items:center;padding:clamp(2rem,6vh,4rem) 0}
.b-sc01__media img{width:100%;height:100%;max-height:70vh;object-fit:cover;border-radius:var(--radius-lg);box-shadow:0 35px 70px -30px rgba(0,0,0,.4)}
@media(max-width:768px){.b-sc01__panel{grid-template-columns:1fr;align-content:center;gap:1.5rem;padding-top:3rem}.b-sc01__media{padding:0}.b-sc01__media img{max-height:38vh}.b-sc01__body{justify-self:start}}`,
  variants: [
    { id: "flow", label: "Светлый → бренд → акцент", css: "" },
    { id: "dark", label: "Тёмная гамма", css: `.b-sc01__panel--a{background:#0a0a0f}.b-sc01__panel--a .b-sc01__title{color:#fff}.b-sc01__panel--a .b-sc01__text{color:rgba(255,255,255,.65)}.b-sc01__panel--b{background:#14141c}.b-sc01__panel--c{background:var(--color-primary)}.b-sc01__panel--c .b-sc01__tag{color:var(--color-accent);opacity:1}.b-sc01__panel--c .b-sc01__title{color:var(--color-text-on-primary)}.b-sc01__panel--c .b-sc01__text{color:color-mix(in srgb,var(--color-text-on-primary) 72%,transparent)}` },
  ],
};
