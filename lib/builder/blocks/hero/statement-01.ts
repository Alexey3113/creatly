import type { BlockPreset } from "../_types";

/**
 * Hero-манифест из трёх слов (паттерн «DESIGN. DISRUPT. CONQUER.»):
 * три гигантские строки капсом, вторая — контурная; под ними строка-описание
 * и ряд count-up метрик. Дерзкий statement для студий/брендов/событий.
 */
export const block: BlockPreset = {
  id: "hero-statement-01",
  name: "Тройной манифест",
  description: "Три гигантских слова во весь экран (второе — контурное), строка сути и ряд набегающих метрик. Самый дерзкий hero каталога.",
  category: "hero",
  subcategory: "statement",
  icon: "≡",
  tags: ["statement", "bold", "typography", "stats", "count-up", "brutalist", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hs01-word-1", type: "heading", hint: "первое слово капсом с точкой («СОЗДАЁМ.»)", required: true },
    { name: "hs01-word-2", type: "heading", hint: "второе слово (будет контурным)", required: true },
    { name: "hs01-word-3", type: "heading", hint: "третье слово", required: true },
    { name: "hs01-sub", type: "text", hint: "одно предложение о сути, 8-16 слов", required: true },
    { name: "hs01-cta", type: "link", hint: "CTA-кнопка", required: true },
    { name: "hs01-stat-value", type: "stat", hint: "метрика («250+», «95%»)", required: true },
    { name: "hs01-stat-label", type: "text", hint: "подпись метрики, 2-4 слова", required: true },
  ],
  html: `<section class="b-hs01" data-block="hero">
  <div class="b-hs01__inner">
    <h1 class="b-hs01__words">
      <span class="b-hs01__w" data-field="hs01-word-1" data-reveal="up">Создаём.</span>
      <span class="b-hs01__w b-hs01__w--ghost" data-field="hs01-word-2" data-reveal="up" style="--stagger:1">Ломаем.</span>
      <span class="b-hs01__w" data-field="hs01-word-3" data-reveal="up" style="--stagger:2">Побеждаем.</span>
    </h1>
    <div class="b-hs01__row" data-reveal="fade" style="--stagger:3">
      <p class="b-hs01__sub" data-field="hs01-sub">Строим дерзкие бренды, которые не просто замечают — за которыми идут.</p>
      <a class="b-hs01__cta" href="#" data-field="hs01-cta" data-magnet="0.22">Смотреть работы</a>
    </div>
    <div class="b-hs01__stats" data-collection="hs01-stats" data-reveal="fade" style="--stagger:4">
      <div class="b-hs01__stat" data-collection-item>
        <span class="b-hs01__num" data-count data-field="hs01-stat-value">250+</span>
        <span class="b-hs01__lbl" data-field="hs01-stat-label">брендов запущено</span>
      </div>
      <div class="b-hs01__stat" data-collection-item>
        <span class="b-hs01__num" data-count data-field="hs01-stat-value">95%</span>
        <span class="b-hs01__lbl" data-field="hs01-stat-label">клиентов остаются</span>
      </div>
      <div class="b-hs01__stat" data-collection-item>
        <span class="b-hs01__num" data-count data-field="hs01-stat-value">10+</span>
        <span class="b-hs01__lbl" data-field="hs01-stat-label">лет в игре</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-hs01{min-height:100vh;display:flex;align-items:center;background:var(--color-primary);padding:clamp(6rem,14vh,8rem) var(--space-block) clamp(3rem,8vh,5rem);overflow:hidden}
.b-hs01__inner{max-width:var(--container-width,1400px);width:100%;margin:0 auto}
.b-hs01__words{display:flex;flex-direction:column;margin:0 0 2.5rem}
.b-hs01__w{font-family:var(--font-heading);font-weight:800;font-size:clamp(3rem,11vw,9rem);line-height:.98;letter-spacing:-.03em;text-transform:uppercase;color:var(--color-text-on-primary)}
.b-hs01__w--ghost{color:transparent;-webkit-text-stroke:2px color-mix(in srgb,var(--color-accent) 90%,transparent)}
.b-hs01__row{display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;padding-top:1.5rem;border-top:1px solid color-mix(in srgb,var(--color-text-on-primary) 15%,transparent)}
.b-hs01__sub{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.2rem);color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent);line-height:1.6;max-width:520px;margin:0}
.b-hs01__cta{display:inline-flex;align-items:center;min-height:54px;padding:0 2.2rem;border-radius:var(--radius-full);background:var(--color-accent);color:var(--color-text-on-accent);text-decoration:none;font-family:var(--font-body);font-weight:800;font-size:.9375rem;box-shadow:0 16px 40px -12px color-mix(in srgb,var(--color-accent) 60%,transparent);white-space:nowrap}
.b-hs01__stats{display:flex;gap:clamp(2rem,6vw,4.5rem);margin-top:2.5rem;flex-wrap:wrap}
.b-hs01__stat{display:flex;flex-direction:column;gap:.3rem}
.b-hs01__num{font-family:var(--font-heading);font-weight:800;font-size:clamp(1.75rem,3.4vw,2.75rem);letter-spacing:-.02em;line-height:1;color:var(--color-text-on-primary);font-variant-numeric:tabular-nums}
.b-hs01__lbl{font-family:var(--font-body);font-size:.8125rem;color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}
@media(max-width:768px){.b-hs01__w{font-size:clamp(2.4rem,14vw,4rem)}}`,
  variants: [
    { id: "brand", label: "Брендовый", css: "" },
    { id: "dark", label: "Чёрный", css: `.b-hs01{background:#08080b}` },
    { id: "light", label: "Светлый", css: `.b-hs01{background:var(--color-bg)}.b-hs01__w{color:var(--color-text)}.b-hs01__w--ghost{color:transparent}.b-hs01__sub{color:var(--color-text-muted)}.b-hs01__row{border-color:var(--color-border)}.b-hs01__num{color:var(--color-text)}.b-hs01__lbl{color:var(--color-text-muted)}` },
  ],
};
