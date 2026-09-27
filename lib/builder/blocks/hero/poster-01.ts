import type { BlockPreset } from "../_types";

/**
 * Hero-постер: editorial-манифест поверх полноэкранного медиа
 * (паттерн «Urban Jungle»): фото/видео во весь экран, поверх — крупный
 * серифный манифест, где ключевые слова выделены курсивом (*слово*),
 * мета-строки по углам. Курсив рендерится из markdown-звёздочек.
 */
export const block: BlockPreset = {
  id: "hero-poster-01",
  name: "Постер-манифест",
  description: "Полноэкранное фото/видео, поверх — крупный editorial-манифест с курсивными акцентами (*слово* станет курсивом) и мета-подписями по углам. Кино с первого кадра.",
  category: "hero",
  subcategory: "poster",
  icon: "▦",
  tags: ["poster", "editorial", "manifesto", "fullscreen", "serif", "cinematic", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "hp01-media", type: "image", hint: "атмосферное фото или видео (mp4) на весь экран", required: true },
    { name: "hp01-manifesto", type: "heading", hint: "манифест 15-30 слов; *слово* — курсивный акцент", required: true },
    { name: "hp01-meta-left", type: "text", hint: "мета слева сверху (бренд/год)", required: false },
    { name: "hp01-meta-right", type: "text", hint: "мета справа сверху (город/слоган)", required: false },
    { name: "hp01-cta", type: "link", hint: "CTA-кнопка, 2-4 слова", required: true },
  ],
  html: `<section class="b-hp01" data-block="hero">
  <img class="b-hp01__media" data-field="hp01-media" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1900&q=80" alt="" />
  <div class="b-hp01__shade" aria-hidden="true"></div>
  <div class="b-hp01__meta">
    <span data-field="hp01-meta-left">Atelier — 2026</span>
    <span data-field="hp01-meta-right">Москва · Дубай</span>
  </div>
  <div class="b-hp01__center">
    <h1 class="b-hp01__text" data-field="hp01-manifesto" data-reveal="word">Мы превращаем стерильный бетон в *живые городские джунгли*. Наши проекты возвращают *природу* в современные города.</h1>
    <a class="b-hp01__cta" href="#" data-field="hp01-cta" data-magnet="0.2" data-reveal="fade" style="--stagger:6">Смотреть проекты</a>
  </div>
</section>`,
  css: `.b-hp01{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.b-hp01__media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-hp01__shade{position:absolute;inset:0;opacity:var(--scrim,0);background:radial-gradient(90% 90% at 50% 55%,rgba(8,10,8,.62) 0%,rgba(8,10,8,.4) 55%,rgba(8,10,8,.55) 100%)}
.b-hp01__meta{position:absolute;top:clamp(5.5rem,12vh,7.5rem);left:var(--space-block);right:var(--space-block);display:flex;justify-content:space-between;font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.b-hp01__center{position:relative;text-align:center;max-width:1000px;padding:0 var(--space-block)}
.b-hp01__text{font-family:var(--font-heading);font-weight:500;font-size:clamp(1.6rem,4.2vw,3.4rem);line-height:1.35;letter-spacing:-.01em;color:#fff;margin:0 0 2.5rem;text-shadow:0 2px 16px rgba(0,0,0,.55),0 2px 30px rgba(0,0,0,.35)}
.b-hp01__text em,.b-hp01__text i{font-style:italic;color:color-mix(in srgb,#fff 88%,var(--color-accent))}
.b-hp01__cta{display:inline-flex;align-items:center;min-height:52px;padding:0 2.2rem;border-radius:var(--radius-full);background:rgba(255,255,255,.95);color:#111;text-decoration:none;font-family:var(--font-body);font-weight:800;font-size:.9rem;transition:transform .3s cubic-bezier(.16,1,.3,1)}
.b-hp01__cta:hover{transform:translateY(-2px)}
@media(max-width:768px){.b-hp01__text{font-size:clamp(1.35rem,6.4vw,1.9rem)}}`,
  variants: [
    { id: "center", label: "По центру", css: "" },
    { id: "bottom-left", label: "Слева снизу", css: `.b-hp01{align-items:flex-end;justify-content:flex-start}.b-hp01__center{text-align:left;padding-bottom:clamp(3rem,10vh,6rem);max-width:820px}.b-hp01__shade{background:linear-gradient(to top,rgba(8,10,8,.75) 0%,rgba(8,10,8,.25) 55%,rgba(8,10,8,.35) 100%)}` },
  ],
};
