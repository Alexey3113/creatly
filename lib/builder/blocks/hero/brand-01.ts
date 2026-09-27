import type { BlockPreset } from "../_types";

/**
 * Hero «Имя бренда» (паттерн «Blue Nile»): гигантское имя на весь экран,
 * центральное фото ложится ПОВЕРХ букв — глубина за счёт перекрытия слоёв.
 * Мета-подписи по углам, яркая плашка-фон.
 */
export const block: BlockPreset = {
  id: "hero-brand-01",
  name: "Имя бренда + фото",
  description: "Огромное имя бренда во весь экран, центральное фото перекрывает буквы — эффект глубины как у fashion-журналов. Смелая плашка-фон.",
  category: "hero",
  subcategory: "brand",
  icon: "◙",
  tags: ["brand", "typography", "overlap", "fashion", "editorial", "bold", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hb01-name", type: "heading", hint: "имя бренда, 1-2 коротких слова", required: true },
    { name: "hb01-photo", type: "image", hint: "вертикальное фото (человек/продукт), ляжет поверх букв", required: true },
    { name: "hb01-meta-1", type: "text", hint: "мета слева («Коллекция 2026»)", required: false },
    { name: "hb01-meta-2", type: "text", hint: "мета справа («Санкт-Петербург»)", required: false },
    { name: "hb01-cta", type: "link", hint: "CTA-кнопка", required: true },
  ],
  html: `<section class="b-hb01" data-block="hero">
  <div class="b-hb01__meta">
    <span data-field="hb01-meta-1">Коллекция 2026</span>
    <span data-field="hb01-meta-2">Awards · Celebrate · Innovation</span>
  </div>
  <h1 class="b-hb01__name" data-field="hb01-name" data-reveal="char">Aurellia</h1>
  <img class="b-hb01__photo" data-field="hb01-photo" data-reveal="scale" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80" alt="" />
  <a class="b-hb01__cta" href="#" data-field="hb01-cta" data-magnet="0.2" data-reveal="fade" style="--stagger:5">Смотреть коллекцию</a>
</section>`,
  css: `.b-hb01{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-accent);overflow:hidden;padding:0 var(--space-block)}
.b-hb01__meta{position:absolute;top:clamp(1.25rem,4vh,2.5rem);left:var(--space-block);right:var(--space-block);display:flex;justify-content:space-between;font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:color-mix(in srgb,var(--color-text-on-accent) 80%,transparent);z-index:3}
.b-hb01__name{position:absolute;top:50%;left:50%;transform:translate(-50%,-58%);font-family:var(--font-heading);font-weight:800;font-size:clamp(4rem,17vw,15rem);line-height:1;letter-spacing:-.04em;color:var(--color-text-on-accent);white-space:nowrap;margin:0;z-index:1}
.b-hb01__photo{position:relative;z-index:2;width:min(34vw,380px);aspect-ratio:3/4;object-fit:cover;border-radius:calc(var(--radius-lg)*1.2);box-shadow:0 50px 100px -30px rgba(0,0,0,.5)}
.b-hb01__cta{position:absolute;bottom:clamp(2rem,7vh,4rem);left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;min-height:52px;padding:0 2.2rem;border-radius:var(--radius-full);background:rgba(10,10,14,.85);backdrop-filter:blur(10px);color:#fff;text-decoration:none;font-family:var(--font-body);font-weight:800;font-size:.9rem;z-index:3}
@media(max-width:768px){.b-hb01__photo{width:62vw}.b-hb01__name{font-size:clamp(3rem,22vw,6rem)}}`,
  variants: [
    { id: "accent", label: "Акцентная плашка", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-hb01{background:#0a0a0f}.b-hb01__name{color:#fff}.b-hb01__meta{color:rgba(255,255,255,.6)}` },
    { id: "paper", label: "Светлый", css: `.b-hb01{background:var(--color-bg)}.b-hb01__name{color:var(--color-text)}.b-hb01__meta{color:var(--color-text-muted)}.b-hb01__cta{background:var(--color-text);color:var(--color-bg)}` },
  ],
};
