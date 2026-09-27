import type { BlockPreset } from "../_types";

/**
 * Storytelling: видео-постер с главами.
 * Полноэкранное видео, первый шаг — editorial-манифест с курсивами поверх;
 * дальше скролл ведёт видео по главам-таймкодам (скраб + докрутка от
 * story-runtime), манифест сменяется главами истории. Тот самый паттерн
 * «постер, который оживает и рассказывает».
 */
export const block: BlockPreset = {
  id: "story-poster-01",
  name: "Видео-постер с главами",
  description: "Кино-постер, который оживает: editorial-манифест поверх видео, а скролл ведёт ролик по главам истории (таймкоды + плавная докрутка). Флагманский первый экран.",
  category: "story",
  subcategory: "poster",
  icon: "🎞",
  tags: ["storytelling", "poster", "video", "manifesto", "chapters", "scrub", "editorial", "wow", "cinematic", "premium"],
  motionLevel: "css",
  fields: [
    { name: "sp01-video", type: "image", hint: "видео mp4/webm 5-8 сек, ОДНО непрерывное движение без склеек, частые keyframe", required: true },
    { name: "sp01-meta-left", type: "text", hint: "мета слева сверху (бренд/год)", required: false },
    { name: "sp01-meta-right", type: "text", hint: "мета справа сверху", required: false },
    { name: "sp01-step-text", type: "heading", hint: "текст главы 10-25 слов; *слово* — курсив", required: true },
    { name: "sp01-step-time", type: "stat", hint: "момент видео для главы, сек. Пусто = поровну", required: false },
  ],
  html: `<section class="b-sp01" data-block="story" data-story>
  <div class="b-sp01__stage" data-story-stage>
    <video class="b-sp01__video" data-story-video data-story-mode="scrub" data-field="sp01-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" muted playsinline preload="auto"></video>
    <div class="b-sp01__shade" aria-hidden="true"></div>
    <div class="b-sp01__meta">
      <span data-field="sp01-meta-left">Atelier — 2026</span>
      <span data-field="sp01-meta-right">Фильм о нас</span>
    </div>
    <div class="b-sp01__steps" data-collection="sp01-chapters">
      <div class="b-sp01__step" data-collection-item data-story-step>
        <p class="b-sp01__text" data-field="sp01-step-text">Мы превращаем стерильный бетон в *живые городские джунгли* — и каждый проект начинается с истории.</p>
        <b data-field="sp01-step-time" hidden aria-hidden="true"></b>
      </div>
      <div class="b-sp01__step" data-collection-item data-story-step>
        <p class="b-sp01__text" data-field="sp01-step-text">Сначала мы *слушаем место*: свет, шум, людей. Потом появляется эскиз.</p>
        <b data-field="sp01-step-time" hidden aria-hidden="true"></b>
      </div>
      <div class="b-sp01__step" data-collection-item data-story-step>
        <p class="b-sp01__text" data-field="sp01-step-text">Через год здесь цветут сады. Это и есть *наша работа* — доводить истории до финала.</p>
        <b data-field="sp01-step-time" hidden aria-hidden="true"></b>
      </div>
    </div>
    <div class="b-sp01__hud">
      <span class="b-sp01__counter" data-story-counter>01 / 03</span>
      <div class="b-sp01__bar"><div class="b-sp01__bar-fill"></div></div>
    </div>
  </div>
</section>`,
  css: `.b-sp01{position:relative;height:400vh;background:#0a0a0f}
.b-sp01__stage{position:sticky;top:0;height:100vh;overflow:hidden}
.b-sp01__video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-sp01__shade{position:absolute;inset:0;opacity:var(--scrim,0);background:radial-gradient(90% 90% at 50% 55%,rgba(8,8,12,.5) 0%,rgba(8,8,12,.34) 55%,rgba(8,8,12,.55) 100%)}
.b-sp01__meta{position:absolute;top:clamp(5.5rem,12vh,7.5rem);left:var(--space-block);right:var(--space-block);display:flex;justify-content:space-between;font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);z-index:2}
.b-sp01__steps{position:absolute;inset:0;display:grid;place-items:center;padding:0 var(--space-block)}
.b-sp01__step{grid-area:1/1;max-width:900px;text-align:center;opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);pointer-events:none}
.b-sp01__step.is-active{opacity:1;transform:none;pointer-events:auto}
.b-sp01__step.is-passed{opacity:0;transform:translateY(-40px)}
.b-sp01__step:first-child:not(.is-passed):not(.is-active){opacity:1;transform:none}
.b-sp01__text{font-family:var(--font-heading);font-weight:500;font-size:clamp(1.5rem,3.8vw,3.1rem);line-height:1.35;letter-spacing:-.01em;color:#fff;margin:0;text-shadow:0 2px 16px rgba(0,0,0,.6),0 2px 30px rgba(0,0,0,.4)}
.b-sp01__text em{font-style:italic;color:color-mix(in srgb,#fff 86%,var(--color-accent))}
.b-sp01__hud{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);display:flex;align-items:center;gap:1.25rem;z-index:2}
.b-sp01__counter{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.7);font-variant-numeric:tabular-nums;white-space:nowrap}
.b-sp01__bar{flex:1;height:2px;background:rgba(255,255,255,.18);border-radius:2px;overflow:hidden}
.b-sp01__bar-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent)}
@media(max-width:768px){.b-sp01__text{font-size:clamp(1.25rem,6.2vw,1.8rem);text-align:left}.b-sp01__step{text-align:left}}`,
  variants: [
    { id: "scrub", label: "Скраб по скроллу", css: "" },
    { id: "left", label: "Текст слева", css: `.b-sp01__steps{place-items:center start}.b-sp01__step{text-align:left;max-width:640px}.b-sp01__shade{background:linear-gradient(to right,rgba(8,8,12,.72) 0%,rgba(8,8,12,.4) 55%,rgba(8,8,12,.2) 100%)}` },
  ],
};
