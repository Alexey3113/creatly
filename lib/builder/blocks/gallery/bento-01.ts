import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-bento-01",
  name: "Галерея — bento-раскладка",
  description: "Bento-layout: 1 большое изображение слева (2 ряда) + 4 маленьких справа в CSS grid",
  category: "gallery",
  subcategory: "bento",
  icon: "⊞",
  tags: ["gallery", "bento", "grid", "featured", "asymmetric"],
  motionLevel: "css",
  fields: [
    { name: "gl03-title", type: "heading", hint: "заголовок секции 3-6 слов", required: false },
    { name: "gl03-subtitle", type: "text", hint: "описание галереи 1-2 предложения", required: false },
    { name: "gl03-img-main", type: "image", hint: "главное крупное изображение", required: true },
    { name: "gl03-img-sm", type: "image", hint: "маленькое изображение", required: true },
    { name: "gl03-label", type: "text", hint: "подпись к изображению 2-4 слова", required: false },
  ],
  html: `<section class="b-gl03" data-block="gallery">
  <div class="b-gl03__inner">
    <div class="b-gl03__header" data-reveal="up">
      <h2 data-field="gl03-title">Избранные проекты</h2>
      <p data-field="gl03-subtitle">Подборка лучших работ нашей команды дизайнеров и разработчиков</p>
    </div>
    <div class="b-gl03__grid" data-collection="gl03-label">
      <div class="b-gl03__big" data-reveal="scale" style="--stagger:0" data-collection-item>
        <img data-field="gl03-img-main" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&amp;fit=crop&amp;w=900&amp;q=80" alt="Главный проект">
        <span class="b-gl03__label" data-field="gl03-label">Флагманский проект</span>
      </div>
      <div class="b-gl03__sm" data-reveal="fade" style="--stagger:1" data-collection-item>
        <img data-field="gl03-img-sm" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <span class="b-gl03__label" data-field="gl03-label">Офисный дизайн</span>
      </div>
      <div class="b-gl03__sm" data-reveal="fade" style="--stagger:2" data-collection-item>
        <img data-field="gl03-img-sm" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <span class="b-gl03__label" data-field="gl03-label">Командная работа</span>
      </div>
      <div class="b-gl03__sm" data-reveal="fade" style="--stagger:3" data-collection-item>
        <img data-field="gl03-img-sm" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <span class="b-gl03__label" data-field="gl03-label">Мозговой штурм</span>
      </div>
      <div class="b-gl03__sm" data-reveal="fade" style="--stagger:4" data-collection-item>
        <img data-field="gl03-img-sm" src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Проект">
        <span class="b-gl03__label" data-field="gl03-label">Презентация</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl03{padding:var(--space-section) var(--space-block);background:var(--color-bg)}
.b-gl03__inner{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl03__header{text-align:center;margin-bottom:3.5rem}
.b-gl03__header h2{font-family:var(--font-heading);font-size:clamp(1.75rem,3.5vw,2.75rem);color:var(--color-text);margin:0 0 .75rem;letter-spacing:-0.02em}
.b-gl03__header p{font-family:var(--font-body);color:var(--color-text-muted);font-size:1.0625rem;line-height:1.6;margin:0;max-width:520px;margin-inline:auto}
.b-gl03__grid{display:grid;grid-template-columns:1fr;gap:1.25rem}
.b-gl03__big,.b-gl03__sm{position:relative;border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);border:1px solid var(--color-border)}
.b-gl03__big img,.b-gl03__sm img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.b-gl03__big:hover img,.b-gl03__sm:hover img{transform:scale(1.04)}
.b-gl03__big{min-height:280px}
.b-gl03__sm{min-height:180px}
.b-gl03__label{position:absolute;bottom:0;left:0;right:0;padding:.875rem 1.125rem;font-family:var(--font-body);font-size:.8125rem;font-weight:600;color:var(--color-bg);background:linear-gradient(to top,color-mix(in srgb,var(--color-text) 60%,transparent),transparent);pointer-events:none}
@media(min-width:768px){.b-gl03__grid{grid-template-columns:repeat(2,1fr);grid-template-rows:auto auto}.b-gl03__big{grid-row:1/3;min-height:420px}}
@media(min-width:1024px){.b-gl03__grid{grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:1.5rem}.b-gl03__big{grid-column:1/2;grid-row:1/3;min-height:480px}.b-gl03__sm{min-height:220px}}`,
  variants: [
    { id: "light", label: "Светлый", css: "" },
    { id: "dark", label: "Тёмный", css: `.b-gl03{background:var(--color-primary)}.b-gl03__header h2{color:var(--color-text-on-primary)}.b-gl03__header p{color:color-mix(in srgb,var(--color-text-on-primary) 70%,transparent)}.b-gl03__big,.b-gl03__sm{background:color-mix(in srgb,var(--color-text-on-primary) 6%,transparent);border-color:color-mix(in srgb,var(--color-text-on-primary) 12%,transparent)}` },
    { id: "no-labels", label: "Без подписей", css: `.b-gl03__label{display:none}.b-gl03__big,.b-gl03__sm{border-radius:var(--radius-md)}` },
  ],
};
