import type { BlockPreset } from "../_types";

/**
 * Storytelling: видео в буквах (knockout-typography).
 * Гигантский заголовок, сквозь буквы которого просвечивает живое видео.
 * Механика — чистый CSS blend: белая плашка с чёрным текстом поверх видео
 * в режиме mix-blend-mode:screen — белое остаётся, чёрные буквы «пробивают»
 * окно к видео. Ни JS, ни SVG-масок.
 */
export const block: BlockPreset = {
  id: "story-video-text-01",
  name: "Видео в буквах",
  description: "Огромное слово, сквозь буквы которого играет видео. Один из самых залипательных типографических эффектов — и это чистый CSS.",
  category: "story",
  subcategory: "video-text",
  icon: "▧",
  tags: ["storytelling", "typography", "video", "knockout", "mask", "wow", "premium"],
  motionLevel: "css",
  fields: [
    { name: "svt01-video", type: "image", hint: "URL фонового видео (mp4/webm, зацикленное, контрастное)", required: true },
    { name: "svt01-word", type: "heading", hint: "ОДНО-ДВА коротких слова капсом — чем жирнее и короче, тем мощнее", required: true },
    { name: "svt01-sub", type: "text", hint: "строка под словом, 3-8 слов", required: false },
  ],
  html: `<section class="b-svt01" data-block="story">
  <div class="b-svt01__wrap">
    <video data-smooth-loop class="b-svt01__video" data-field="svt01-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" autoplay muted loop playsinline preload="metadata"></video>
    <div class="b-svt01__knockout" aria-hidden="true">
      <span class="b-svt01__word" data-field="svt01-word">ДВИЖЕНИЕ</span>
    </div>
  </div>
  <p class="b-svt01__sub" data-field="svt01-sub" data-reveal="word">Всё, что мы делаем — живёт и дышит</p>
</section>`,
  css: `.b-svt01{background:#fff;padding:0 0 clamp(2rem,6vh,4rem)}
.b-svt01__wrap{position:relative;height:min(72vh,720px);overflow:hidden}
.b-svt01__video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-svt01__knockout{position:absolute;inset:0;display:grid;place-items:center;background:#fff;mix-blend-mode:screen}
.b-svt01__word{font-family:var(--font-heading);font-weight:900;font-size:clamp(3.5rem,15vw,13rem);letter-spacing:-.03em;line-height:.95;color:#000;text-align:center;text-transform:uppercase;white-space:nowrap}
.b-svt01__sub{font-family:var(--font-body);text-align:center;font-size:clamp(.95rem,1.5vw,1.2rem);color:var(--color-text-muted);margin:1.75rem auto 0;max-width:640px;padding:0 var(--space-block)}
@media(max-width:768px){.b-svt01__wrap{height:46vh}.b-svt01__word{white-space:normal;font-size:clamp(2.6rem,18vw,5rem)}}`,
  variants: [
    { id: "light", label: "Светлый (буквы-окна)", css: "" },
    { id: "dark", label: "Тёмный (светящиеся буквы)", css: `.b-svt01{background:#050508}.b-svt01__knockout{background:#000;mix-blend-mode:multiply}.b-svt01__word{color:#fff}.b-svt01__sub{color:rgba(255,255,255,.55)}` },
  ],
};
