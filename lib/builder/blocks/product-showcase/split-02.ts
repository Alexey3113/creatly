import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "product-showcase-split-02",
  name: "Продукт — 3D перспектива",
  description: "Текст слева, 3D-перспективный скриншот продукта справа с эффектом плавающей тени",
  category: "product-showcase",
  subcategory: "split",
  icon: "🧊",
  tags: ["product", "3d", "perspective", "split", "shadow", "modern"],
  motionLevel: "css",
  fields: [
    { name: "ps02-title", type: "heading", hint: "название продукта 2-5 слов", required: true },
    { name: "ps02-subtitle", type: "text", hint: "подзаголовок 5-10 слов", required: false },
    { name: "ps02-desc", type: "text", hint: "описание продукта 2-3 предложения", required: true },
    { name: "ps02-image", type: "image", hint: "скриншот продукта 900×600+", required: true },
    { name: "ps02-cta", type: "link", hint: "текст кнопки CTA 2-3 слова", required: false },
  ],
  html: `<section class="b-ps02" data-block="product-showcase">
  <div class="b-ps02__inner">
    <div class="b-ps02__content" data-reveal="up">
      <p class="b-ps02__eyebrow" data-field="ps02-subtitle">Новое поколение интерфейсов</p>
      <h2 class="b-ps02__title" data-field="ps02-title">Платформа AeroDesk Pro</h2>
      <p class="b-ps02__desc" data-field="ps02-desc">Революционная рабочая среда, которая адаптируется под ваш стиль работы. Интеллектуальная организация задач, встроенная аналитика и бесшовная интеграция с вашими инструментами.</p>
      <a class="b-ps02__cta" data-field="ps02-cta" href="#">Попробовать бесплатно</a>
    </div>
    <div class="b-ps02__visual" data-reveal="scale">
      <div class="b-ps02__perspective">
        <img class="b-ps02__img" data-field="ps02-image" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" alt="Скриншот продукта" />
      </div>
      <div class="b-ps02__shadow"></div>
    </div>
  </div>
</section>`,
  css: `.b-ps02{padding:var(--space-section) var(--space-block);background:var(--color-bg);overflow:hidden}
.b-ps02__inner{max-width:var(--container-width,1400px);margin:0 auto;display:flex;flex-direction:column;gap:3rem;align-items:center}
.b-ps02__content{flex:1;display:flex;flex-direction:column;justify-content:center}
.b-ps02__eyebrow{font-family:var(--font-body);font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:var(--color-accent);margin:0 0 .75rem;font-weight:600}
.b-ps02__title{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 1.25rem;letter-spacing:-0.02em;line-height:1.15}
.b-ps02__desc{font-family:var(--font-body);font-size:1.05rem;color:var(--color-text-muted);margin:0 0 2rem;line-height:1.7;max-width:500px}
.b-ps02__cta{display:inline-flex;align-items:center;padding:.875rem 2rem;background:var(--color-primary);color:var(--color-text-on-primary);font-family:var(--font-body);font-size:.925rem;font-weight:600;border-radius:var(--radius-full);text-decoration:none;transition:transform .3s ease,box-shadow .3s ease}
.b-ps02__cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px color-mix(in srgb,var(--color-primary) 35%,transparent)}
.b-ps02__visual{flex:1;position:relative;width:100%}
.b-ps02__perspective{perspective:1200px;transform-style:preserve-3d}
.b-ps02__img{width:100%;display:block;border-radius:var(--radius-lg);transform:rotateY(-8deg) rotateX(4deg);transition:transform .6s cubic-bezier(.22,1,.36,1);box-shadow:0 20px 60px color-mix(in srgb,var(--color-text) 15%,transparent),0 8px 20px color-mix(in srgb,var(--color-text) 8%,transparent)}
.b-ps02__perspective:hover .b-ps02__img{transform:rotateY(-2deg) rotateX(1deg)}
.b-ps02__shadow{position:absolute;bottom:-24px;left:10%;right:10%;height:48px;background:radial-gradient(ellipse at center,color-mix(in srgb,var(--color-text) 12%,transparent) 0%,transparent 70%);border-radius:var(--radius-full);filter:blur(12px);transition:opacity .6s ease}
.b-ps02__perspective:hover~.b-ps02__shadow{opacity:.6}
@media(min-width:768px){.b-ps02__inner{flex-direction:row;gap:4rem}.b-ps02__content,.b-ps02__visual{flex:1 1 50%}}
@media(min-width:1024px){.b-ps02__inner{gap:5rem}.b-ps02__img{transform:rotateY(-12deg) rotateX(6deg)}.b-ps02__perspective:hover .b-ps02__img{transform:rotateY(-4deg) rotateX(2deg)}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-ps02{background:var(--color-primary)}.b-ps02__title{color:var(--color-text-on-primary)}.b-ps02__desc{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-ps02__eyebrow{color:var(--color-accent)}.b-ps02__cta{background:var(--color-accent);color:var(--color-text-on-accent)}` },
    { id: "flat", label: "Плоский", css: `.b-ps02__img{transform:rotateY(0) rotateX(0);box-shadow:0 4px 20px color-mix(in srgb,var(--color-text) 10%,transparent);border:1px solid var(--color-border)}.b-ps02__perspective:hover .b-ps02__img{transform:rotateY(0) rotateX(0);box-shadow:0 12px 40px color-mix(in srgb,var(--color-text) 15%,transparent)}.b-ps02__shadow{display:none}` },
  ],
};
