import type { BlockPreset } from "../_types";

/**
 * Storytelling: видео-история с жестовыми шагами (data-story-gesture="steps").
 * Один тик колеса/свайп = один переход к следующей главе; страница сама
 * доезжает до зоны шага, скролл на время перехода блокируется рантаймом.
 */
export const block: BlockPreset = {
  id: "story-video-02",
  name: "Видео-история — по шагам",
  description: "Видео-история с жестовым управлением: один тик скролла = один шаг. Экран прилипает, переход к следующей главе проигрывается сам, скролл на время перехода блокируется. Как слайды в сторис.",
  category: "story",
  subcategory: "video",
  icon: "🎬",
  tags: ["storytelling", "video", "steps", "gesture", "snap", "fullscreen", "wow", "cinematic", "premium"],
  motionLevel: "css",
  fields: [
    { name: "sv02-video", type: "image", hint: "URL видео (mp4/webm, 5-8 сек, без звука, ОДНО непрерывное движение без склеек; для скраба нужны частые keyframe)", required: true },
    { name: "sv02-eyebrow", type: "text", hint: "маленькая подпись в углу сцены, 2-4 слова", required: false },
    { name: "sv02-step-tag", type: "text", hint: "метка шага («01 · Начало»)", required: false },
    { name: "sv02-step-title", type: "heading", hint: "заголовок шага, 3-7 слов", required: true },
    { name: "sv02-step-text", type: "text", hint: "текст шага, 1-2 предложения", required: false },
    { name: "sv02-step-time", type: "stat", hint: "момент видео для этого шага, сек (напр. 4.2) — видео само плавно доедет до него. Пусто = поровну", required: false },
  ],
  html: `<section class="b-sv02" data-block="story" data-story data-story-gesture="steps">
  <div class="b-sv02__stage" data-story-stage>
    <video class="b-sv02__video" data-story-video data-story-mode="scrub" data-field="sv02-video" src="https://assets.mixkit.co/videos/4832/4832-720.mp4" muted playsinline preload="auto"></video>
    <div class="b-sv02__shade" aria-hidden="true"></div>
    <span class="b-sv02__eyebrow" data-field="sv02-eyebrow">Наша история</span>
    <div class="b-sv02__steps" data-collection="sv02-steps">
      <div class="b-sv02__step" data-collection-item data-story-step>
        <span class="b-sv02__tag" data-field="sv02-step-tag">01 · Начало</span>
        <h2 class="b-sv02__title" data-field="sv02-step-title">Всё началось с одной идеи</h2>
        <p class="b-sv02__text" data-field="sv02-step-text">Мы хотели делать продукты, которыми гордятся. Без компромиссов, без «и так сойдёт».</p>
        <b class="b-sv02__t" data-field="sv02-step-time" hidden aria-hidden="true"></b>
      </div>
      <div class="b-sv02__step" data-collection-item data-story-step>
        <span class="b-sv02__tag" data-field="sv02-step-tag">02 · Рост</span>
        <h2 class="b-sv02__title" data-field="sv02-step-title">Первые клиенты поверили в нас</h2>
        <p class="b-sv02__text" data-field="sv02-step-text">За первый год — 40 проектов и команда, которая работает как единый организм.</p>
        <b class="b-sv02__t" data-field="sv02-step-time" hidden aria-hidden="true"></b>
      </div>
      <div class="b-sv02__step" data-collection-item data-story-step>
        <span class="b-sv02__tag" data-field="sv02-step-tag">03 · Сегодня</span>
        <h2 class="b-sv02__title" data-field="sv02-step-title">Мы задаём стандарт индустрии</h2>
        <p class="b-sv02__text" data-field="sv02-step-text">200+ запущенных продуктов, собственная школа и открытые инструменты для сообщества.</p>
        <b class="b-sv02__t" data-field="sv02-step-time" hidden aria-hidden="true"></b>
      </div>
    </div>
    <div class="b-sv02__hud">
      <span class="b-sv02__counter" data-story-counter>01 / 03</span>
      <div class="b-sv02__bar"><div class="b-sv02__bar-fill" data-story-bar></div></div>
    </div>
    <div class="b-sv02__hint" aria-hidden="true">Листайте — шаг за шагом ↓</div>
  </div>
</section>`,
  css: `.b-sv02{position:relative;height:400vh;background:#0a0a0f}
.b-sv02__stage{position:sticky;top:0;height:100vh;overflow:hidden}
.b-sv02__video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-sv02__shade{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,5,10,.78) 0%,rgba(5,5,10,.35) 45%,rgba(5,5,10,.25) 100%)}
.b-sv02__eyebrow{position:absolute;top:clamp(1.5rem,4vh,3rem);left:var(--space-block);font-family:var(--font-body);font-size:.75rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.b-sv02__steps{position:absolute;inset:0;display:grid;place-items:center;padding:0 var(--space-block)}
.b-sv02__step{grid-area:1/1;max-width:720px;text-align:center;opacity:0;transform:translateY(46px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);pointer-events:none}
.b-sv02__step.is-active{opacity:1;transform:translateY(0);pointer-events:auto}
.b-sv02__step.is-passed{opacity:0;transform:translateY(-46px)}
.b-sv02__step:first-child:not(.is-passed):not(.is-active){opacity:1;transform:none}
.b-sv02__tag{display:inline-block;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--color-accent);margin-bottom:1.25rem}
.b-sv02__title{font-family:var(--font-heading);font-size:clamp(2rem,5.5vw,4.25rem);line-height:1.05;letter-spacing:-.02em;color:#fff;margin:0 0 1.25rem}
.b-sv02__text{font-family:var(--font-body);font-size:clamp(1rem,1.6vw,1.25rem);line-height:1.65;color:rgba(255,255,255,.82);margin:0 auto;max-width:560px}
.b-sv02__hud{position:absolute;left:var(--space-block);right:var(--space-block);bottom:clamp(1.5rem,4vh,2.5rem);display:flex;align-items:center;gap:1.25rem}
.b-sv02__counter{font-family:var(--font-body);font-size:.75rem;font-weight:700;letter-spacing:.14em;color:rgba(255,255,255,.7);font-variant-numeric:tabular-nums;white-space:nowrap}
.b-sv02__bar{flex:1;height:2px;background:rgba(255,255,255,.18);border-radius:2px;overflow:hidden}
.b-sv02__bar-fill{height:100%;width:calc(var(--p,0)*100%);background:var(--color-accent);transition:width .15s linear}
.b-sv02__hint{position:absolute;bottom:clamp(4rem,9vh,6rem);left:50%;transform:translateX(-50%);font-family:var(--font-body);font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5);opacity:calc(1 - var(--p,0)*4)}
@media(max-width:768px){.b-sv02__title{font-size:clamp(1.75rem,8vw,2.5rem)}.b-sv02__step{text-align:left}.b-sv02__text{margin:0}}`,
  variants: [
    { id: "dark", label: "Тёмный", css: "" },
    { id: "left", label: "Текст слева", css: `.b-sv02__steps{place-items:center start}.b-sv02__step{text-align:left;max-width:560px}.b-sv02__text{margin:0}.b-sv02__shade{background:linear-gradient(to right,rgba(5,5,10,.82) 0%,rgba(5,5,10,.45) 50%,rgba(5,5,10,.15) 100%)}` },
  ],
};
