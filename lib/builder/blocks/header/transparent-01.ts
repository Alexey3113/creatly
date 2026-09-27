import type { BlockPreset } from "../_types";

/**
 * Прозрачная шапка поверх hero. Фиксирована, изначально сливается с тёмным
 * фото/видео-hero (белый текст, без подложки); после скролла получает
 * blur-подложку и границу через .is-scrolled от widgets-runtime.
 * Премиальный паттерн для сайтов с полноэкранным первым блоком.
 */
export const block: BlockPreset = {
  id: "header-transparent-01",
  name: "Прозрачная шапка",
  description: "Лежит поверх первого экрана без фона (белый текст), при скролле получает тёмную blur-подложку. Для полноэкранных фото/видео-hero и storytelling-сайтов.",
  category: "header",
  subcategory: "transparent",
  icon: "▚",
  tags: ["header", "nav", "fixed", "transparent", "overlay", "cinematic", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hd03-logo", type: "text", hint: "название/логотип, 1-2 слова", required: true },
    { name: "hd03-link", type: "link", hint: "пункт меню, 1-2 слова", required: true },
    { name: "hd03-cta", type: "link", hint: "текст CTA-кнопки, 1-3 слова", required: false },
  ],
  html: `<header class="b-hd03" data-block="header" data-header>
  <div class="b-hd03__inner">
    <a class="b-hd03__logo" href="#" data-field="hd03-logo">Atelier</a>
    <nav class="b-hd03__nav" data-collection="hd03-links">
      <a class="b-hd03__link" href="#" data-field="hd03-link" data-collection-item>История</a>
      <a class="b-hd03__link" href="#" data-field="hd03-link" data-collection-item>Коллекции</a>
      <a class="b-hd03__link" href="#" data-field="hd03-link" data-collection-item>Шоурум</a>
    </nav>
    <a class="b-hd03__cta" href="#" data-field="hd03-cta">Связаться</a>
  </div>
</header>`,
  css: `.b-hd03{position:fixed;top:0;left:0;right:0;z-index:200;background:transparent;border-bottom:1px solid transparent;transition:background .35s ease,border-color .35s ease,backdrop-filter .35s ease}
.b-hd03.is-scrolled{background:rgba(8,8,12,.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom-color:rgba(255,255,255,.08)}
.b-hd03__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;padding:1.1rem var(--space-block)}
.b-hd03__logo{font-family:var(--font-heading);font-size:1.25rem;font-weight:800;letter-spacing:-.02em;color:#fff;text-decoration:none;text-shadow:0 1px 12px rgba(0,0,0,.25)}
.b-hd03__nav{display:flex;align-items:center;gap:clamp(1rem,2.5vw,2rem);margin:0 auto}
.b-hd03__link{font-family:var(--font-body);font-size:.9rem;font-weight:600;color:rgba(255,255,255,.75);text-decoration:none;transition:color .2s;text-shadow:0 1px 8px rgba(0,0,0,.2)}
.b-hd03__link:hover{color:#fff}
.b-hd03__cta{font-family:var(--font-body);font-size:.85rem;font-weight:700;color:#fff;border:1.5px solid rgba(255,255,255,.55);text-decoration:none;padding:.55rem 1.2rem;border-radius:var(--radius-full);transition:background .25s,border-color .25s;white-space:nowrap}
.b-hd03__cta:hover{background:rgba(255,255,255,.14);border-color:#fff}
@media(max-width:768px){.b-hd03__nav{display:none}}`,
  variants: [
    { id: "over-dark", label: "Поверх тёмного", css: "" },
    { id: "over-light", label: "Поверх светлого", css: `.b-hd03__logo{color:var(--color-text);text-shadow:none}.b-hd03__link{color:color-mix(in srgb,var(--color-text) 65%,transparent);text-shadow:none}.b-hd03__link:hover{color:var(--color-text)}.b-hd03__cta{color:var(--color-text);border-color:color-mix(in srgb,var(--color-text) 45%,transparent)}.b-hd03__cta:hover{background:color-mix(in srgb,var(--color-text) 8%,transparent);border-color:var(--color-text)}.b-hd03.is-scrolled{background:color-mix(in srgb,var(--color-bg) 85%,transparent)}.b-hd03.is-scrolled .b-hd03__logo{color:var(--color-text)}` },
  ],
};
