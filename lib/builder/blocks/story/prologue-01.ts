import type { BlockPreset } from "../_types";

/**
 * Storytelling: пролог-кадр. Полноэкранное фото/видео как первый кадр фильма:
 * медленный Ken-Burns наезд, вертикальная мета-строка, огромный заголовок
 * внизу и подсказка-стрелка «листайте». Идеален как вход в сайт-путешествие
 * (дверь, дорога, порог цеха). Чистый CSS.
 */
export const block: BlockPreset = {
  id: "story-prologue-01",
  name: "Пролог-кадр",
  description: "Полноэкранный кадр-вход в историю: медленный кино-наезд на фото (или видео), вертикальная мета, гигантский заголовок снизу и подсказка «листайте». Ставится первым после шапки.",
  category: "story",
  subcategory: "prologue",
  icon: "⌸",
  tags: ["storytelling", "prologue", "hero", "fullscreen", "cinema", "kenburns", "premium", "wow"],
  motionLevel: "css",
  fields: [
    { name: "prl-media", type: "image", hint: "кадр-пролог на весь экран — фото или видео (mp4)", required: true },
    { name: "prl-meta", type: "text", hint: "вертикальная мета-строка («Глава 0 · Порог»)", required: false },
    { name: "prl-title", type: "heading", hint: "заголовок-приглашение, 3-8 слов; *слово* — курсив", required: true },
    { name: "prl-sub", type: "text", hint: "подзаголовок, 1-2 предложения", required: false },
    { name: "prl-hint", type: "text", hint: "подсказка у стрелки («Листайте — мы входим»)", required: false },
  ],
  html: `<section class="b-prl" data-block="story">
  <div class="b-prl__media"><img data-field="prl-media" src="https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1900&q=80" alt="" /></div>
  <div class="b-prl__scrim"></div>
  <span class="b-prl__meta" data-field="prl-meta">Глава 0 · Порог</span>
  <div class="b-prl__content">
    <h1 class="b-prl__title" data-field="prl-title">Дом начинается *с двери*</h1>
    <p class="b-prl__sub" data-field="prl-sub">Войдите — дальше комнаты, в которых живёт наша работа.</p>
  </div>
  <div class="b-prl__hintwrap">
    <span class="b-prl__hint" data-field="prl-hint">Листайте — мы входим</span>
    <span class="b-prl__arrow" aria-hidden="true"></span>
  </div>
</section>`,
  css: `.b-prl{position:relative;min-height:100svh;overflow:hidden;display:flex;align-items:flex-end}
.b-prl__media{position:absolute;inset:0}
.b-prl__media img,.b-prl__media video{width:100%;height:100%;object-fit:cover;display:block;animation:prl-kb 26s ease-in-out infinite alternate}
@keyframes prl-kb{from{transform:scale(1)}to{transform:scale(1.12)}}
.b-prl__scrim{position:absolute;inset:0;opacity:var(--scrim,1);background:linear-gradient(180deg,rgba(4,3,2,.34) 0%,rgba(4,3,2,.05) 45%,rgba(4,3,2,.72) 100%)}
.b-prl__meta{position:absolute;left:clamp(1rem,3vw,2.4rem);top:50%;transform:translateY(-50%);writing-mode:vertical-rl;font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.62)}
.b-prl__content{position:relative;z-index:2;padding:0 var(--space-block) clamp(6rem,14vh,9rem);max-width:1100px}
.b-prl__title{font-family:var(--font-heading);font-size:clamp(2.8rem,7.6vw,6.6rem);line-height:1.02;letter-spacing:-.02em;color:#fff;margin:0 0 1.2rem;text-shadow:0 2px 16px rgba(0,0,0,.55),0 24px 70px rgba(0,0,0,.5)}
.b-prl__title em{font-style:italic;color:var(--color-accent)}
.b-prl__sub{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);line-height:1.65;color:rgba(255,255,255,.82);max-width:520px;margin:0;text-shadow:0 1px 12px rgba(0,0,0,.55)}
.b-prl__hintwrap{position:absolute;left:50%;bottom:clamp(1.2rem,4vh,2.4rem);transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:.55rem}
.b-prl__hint{font-family:var(--font-body);font-size:.78rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.66)}
.b-prl__arrow{width:1px;height:44px;background:linear-gradient(180deg,var(--color-accent),transparent);animation:prl-drop 2.2s ease-in-out infinite}
@keyframes prl-drop{0%{transform:translateY(-6px);opacity:0}30%{opacity:1}100%{transform:translateY(10px);opacity:0}}
@media(max-width:819px){.b-prl__meta{display:none}.b-prl__content{padding-bottom:7rem}}
@media(prefers-reduced-motion:reduce){.b-prl__media img,.b-prl__media video,.b-prl__arrow{animation:none}}`,
  variants: [
    { id: "dark-scrim", label: "Тёмный скрим", css: "" },
    { id: "light-text", label: "Свет по центру", css: `.b-prl{align-items:center}.b-prl__content{text-align:center;margin:0 auto;padding-bottom:0}.b-prl__sub{margin:0 auto}` },
  ],
};
