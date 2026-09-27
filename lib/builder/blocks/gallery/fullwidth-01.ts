import type { BlockPreset } from "../_types";

export const block: BlockPreset = {
  id: "gallery-fullwidth-01",
  name: "Галерея — полноэкранное изображение",
  description: "Одно большое full-bleed изображение на всю ширину экрана с подписью-оверлеем внизу",
  category: "gallery",
  subcategory: "fullwidth",
  icon: "▬",
  tags: ["gallery", "fullwidth", "hero", "bleed", "overlay", "cinematic"],
  motionLevel: "css",
  fields: [
    { name: "gl05-img", type: "image", hint: "большое панорамное изображение высокого разрешения", required: true },
    { name: "gl05-title", type: "heading", hint: "заголовок-подпись 3-8 слов", required: true },
    { name: "gl05-caption", type: "text", hint: "описание изображения 1-2 предложения", required: false },
    { name: "gl05-credit", type: "text", hint: "авторство или источник фото", required: false },
  ],
  html: `<section class="b-gl05" data-block="gallery">
  <div class="b-gl05__frame" data-reveal="clip">
    <img class="b-gl05__img" data-field="gl05-img" src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80" alt="Панорама" />
    <div class="b-gl05__overlay">
      <div class="b-gl05__content" data-reveal="up" style="--stagger:1">
        <h2 data-field="gl05-title">Бескрайние горизонты природы</h2>
        <p class="b-gl05__desc" data-field="gl05-caption">Панорамный вид на горную долину в утренних лучах солнца</p>
        <span class="b-gl05__credit" data-field="gl05-credit">Фото: студия «Перспектива»</span>
      </div>
    </div>
  </div>
</section>`,
  css: `.b-gl05{background:var(--color-bg)}
.b-gl05__frame{position:relative;width:100vw;margin-left:calc(-50vw + 50%);overflow:hidden}
.b-gl05__img{width:100%;height:60vh;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.b-gl05__frame:hover .b-gl05__img{transform:scale(1.02)}
.b-gl05__overlay{position:absolute;bottom:0;left:0;right:0;padding:3rem var(--space-block) 2.5rem;background:linear-gradient(to top,color-mix(in srgb,var(--color-text) 70%,transparent) 0%,color-mix(in srgb,var(--color-text) 30%,transparent) 60%,transparent 100%)}
.b-gl05__content{max-width:var(--container-width,1400px);margin:0 auto}
.b-gl05__content h2{font-family:var(--font-heading);font-size:clamp(1.5rem,3.5vw,2.5rem);color:var(--color-bg);margin:0 0 .5rem;letter-spacing:-0.01em;line-height:1.2}
.b-gl05__desc{font-family:var(--font-body);color:color-mix(in srgb,var(--color-bg) 85%,transparent);font-size:1rem;line-height:1.6;margin:0 0 .5rem;max-width:560px}
.b-gl05__credit{font-family:var(--font-body);color:color-mix(in srgb,var(--color-bg) 55%,transparent);font-size:.75rem;letter-spacing:.04em;text-transform:uppercase}
@media(min-width:768px){.b-gl05__img{height:70vh}.b-gl05__overlay{padding:4rem var(--space-block) 3rem}}
@media(min-width:1024px){.b-gl05__img{height:80vh}}`,
  variants: [
    { id: "gradient-dark", label: "Тёмный градиент", css: "" },
    { id: "gradient-primary", label: "Фирменный градиент", css: `.b-gl05__overlay{background:linear-gradient(to top,color-mix(in srgb,var(--color-primary) 80%,transparent) 0%,color-mix(in srgb,var(--color-primary) 30%,transparent) 60%,transparent 100%)}.b-gl05__content h2{color:var(--color-text-on-primary)}.b-gl05__desc{color:color-mix(in srgb,var(--color-text-on-primary) 85%,transparent)}.b-gl05__credit{color:color-mix(in srgb,var(--color-text-on-primary) 55%,transparent)}` },
    { id: "minimal", label: "Минимальный", css: `.b-gl05__overlay{background:linear-gradient(to top,color-mix(in srgb,var(--color-text) 40%,transparent) 0%,transparent 40%)}.b-gl05__desc,.b-gl05__credit{display:none}` },
  ],
};
