import type { BlockPreset } from "../_types";

/**
 * Отзыв-кино (паттерн «Celestial»): одна цитата на весь экран поверх
 * атмосферного фото/видео, серифная типографика, автор внизу.
 * Максимум доверия на минимуме элементов.
 */
export const block: BlockPreset = {
  id: "testimonials-cinematic-01",
  name: "Цитата-кино",
  description: "Полноэкранная цитата клиента поверх атмосферного фото или видео. Серифная типографика, воздух, автор мелко внизу — как постер фильма.",
  category: "testimonials",
  subcategory: "cinematic",
  icon: "❝",
  tags: ["testimonial", "quote", "fullscreen", "cinematic", "serif", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "tc01-media", type: "image", hint: "атмосферное фото или видео (mp4)", required: true },
    { name: "tc01-quote", type: "heading", hint: "цитата 20-40 слов; *слово* — курсивный акцент", required: true },
    { name: "tc01-author", type: "text", hint: "автор и должность", required: true },
  ],
  html: `<section class="b-tc01" data-block="testimonials">
  <img class="b-tc01__media" data-field="tc01-media" src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1900&q=80" alt="" />
  <div class="b-tc01__shade" aria-hidden="true"></div>
  <figure class="b-tc01__inner">
    <blockquote class="b-tc01__quote" data-field="tc01-quote" data-reveal="word">«Они не просто сделали сайт — они поняли, *во что мы верим*, и рассказали это лучше, чем умели мы сами. Заявки пошли в первый же день.»</blockquote>
    <figcaption class="b-tc01__author" data-field="tc01-author" data-reveal="fade" style="--stagger:6">Марина Ковалёва — основатель «Своя студия»</figcaption>
  </figure>
</section>`,
  css: `.b-tc01{position:relative;min-height:92vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.b-tc01__media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-tc01__shade{position:absolute;inset:0;background:radial-gradient(85% 85% at 50% 50%,rgba(10,10,14,.55) 0%,rgba(10,10,14,.72) 100%)}
.b-tc01__inner{position:relative;max-width:960px;margin:0;padding:0 var(--space-block);text-align:center}
.b-tc01__quote{font-family:var(--font-heading);font-weight:500;font-size:clamp(1.5rem,3.6vw,2.9rem);line-height:1.4;letter-spacing:-.01em;color:#fff;margin:0 0 2rem;text-shadow:0 2px 26px rgba(0,0,0,.35)}
.b-tc01__quote em{font-style:italic;color:color-mix(in srgb,#fff 85%,var(--color-accent))}
.b-tc01__author{font-family:var(--font-body);font-size:.875rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65)}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "warm", label: "Тёплый шейд", css: `.b-tc01__shade{background:radial-gradient(85% 85% at 50% 50%,color-mix(in srgb,var(--color-primary) 55%,transparent) 0%,color-mix(in srgb,var(--color-primary) 80%,transparent) 100%)}` },
  ],
};
