import type { BlockPreset } from "../_types";

/**
 * Storytelling: бесшовные главы + foreground-слой (референс — ролик Anthropic).
 * Полноэкранные сцены: фон (фото/видео) + гигантское слово + летающие поверх
 * foreground-объекты с параллаксом. Следующая глава «съедает» предыдущую через
 * маску: рваный край / шторка / перекатка (варианты). Движок — chapters-runtime
 * (vanilla, CSS-переменные --tp/--cp/--nt). Без JS и на мобильных — простые
 * стек-панели, ничего не ломается.
 *
 * Foreground-треки задаются inline-переменными на [data-chapter-fg]:
 *   --drift (вертикальный пробег за главу), --dx (горизонтальный дрейф),
 *   --rot (наклон). У трёх шаблонов глав — разная хореография, при 4+ главах
 *   треки чередуются по кругу (пер-индексные шаблоны).
 */
export const block: BlockPreset = {
  id: "story-chapters-01",
  name: "Бесшовные главы",
  description: "Кино-главы на весь экран: фон (фото или видео), одно гигантское слово, поверх летают карточки-объекты с параллаксом. Следующая глава накрывает предыдущую рваным краем, шторкой или перекаткой. Флагманский storytelling.",
  category: "story",
  subcategory: "chapters",
  icon: "▣",
  tags: ["storytelling", "chapters", "seamless", "foreground", "parallax", "mask", "cinema", "wow", "premium", "fullscreen"],
  motionLevel: "css",
  fields: [
    { name: "chp-tag", type: "text", hint: "метка главы («Глава 01 · Идея»)", required: false },
    { name: "chp-word", type: "heading", hint: "ОДНО гигантское слово главы (1-2 слова максимум)", required: true },
    { name: "chp-sub", type: "text", hint: "подтекст главы, 1-2 предложения", required: false },
    { name: "chp-bg", type: "image", hint: "фон главы на весь экран — атмосферное фото или видео (mp4)", required: true },
    { name: "chp-fg-a", type: "image", hint: "летающий объект 1 — продукт/деталь/карточка", required: false },
    { name: "chp-fg-b", type: "image", hint: "летающий объект 2 (необязательно)", required: false },
    { name: "chp-fg-c", type: "image", hint: "летающий объект 3 (необязательно)", required: false },
    { name: "chp-comp", type: "text", hint: "композиция главы: word=pos,size; a/b/c=pos,scale,rot. pos: lb|lt|rb|rt|c|cb|ct; size: xl|xxl|mega; scale 0.6-1.6; rot -15..15. Пример: word=c,mega; a=lb,1.3,-8", required: false },
  ],
  html: `<section class="b-chp" data-block="story" data-chapters>
  <div class="b-chp__stage" data-chapters-stage>
    <div class="b-chp__chapters" data-collection="chp-chapters">
      <article class="b-chp__chapter b-chp__chapter--a" data-chapter data-collection-item>
        <div class="b-chp__scene">
          <div class="b-chp__bg"><img data-field="chp-bg" src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=1900&q=80" alt="" /></div>
          <div class="b-chp__scrim"></div>
          <figure class="b-chp__fg b-chp__fg--l b-chp__fg--xl b-chp__fg--over" data-chapter-fg style="--drift:56vh;--dx:-5vw;--rot:-8deg"><img data-field="chp-fg-a" src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--rt b-chp__fg--sm" data-chapter-fg style="--drift:32vh;--dx:6vw;--rot:6deg"><img data-field="chp-fg-b" src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--rb" data-chapter-fg style="--drift:24vh;--dx:3vw;--rot:5deg"><img data-field="chp-fg-c" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <div class="b-chp__content">
            <b data-field="chp-comp" hidden aria-hidden="true"></b>
            <span class="b-chp__tag" data-field="chp-tag">Глава 01 · Идея</span>
            <h2 class="b-chp__word" data-field="chp-word">Замысел</h2>
            <p class="b-chp__sub" data-field="chp-sub">Каждый проект начинается с одного точного вопроса: что должно остаться в памяти?</p>
          </div>
        </div>
      </article>
      <article class="b-chp__chapter b-chp__chapter--b" data-chapter data-collection-item>
        <div class="b-chp__scene">
          <div class="b-chp__bg"><img data-field="chp-bg" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1900&q=80" alt="" /></div>
          <div class="b-chp__scrim"></div>
          <figure class="b-chp__fg b-chp__fg--r b-chp__fg--xl b-chp__fg--over" data-chapter-fg style="--drift:48vh;--dx:7vw;--rot:7deg"><img data-field="chp-fg-a" src="https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--lb" data-chapter-fg style="--drift:26vh;--dx:-6vw;--rot:-5deg"><img data-field="chp-fg-b" src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--lt b-chp__fg--sm" data-chapter-fg style="--drift:38vh;--dx:-3vw;--rot:9deg"><img data-field="chp-fg-c" src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <div class="b-chp__content b-chp__content--center">
            <b data-field="chp-comp" hidden aria-hidden="true"></b>
            <span class="b-chp__tag" data-field="chp-tag">Глава 02 · Форма</span>
            <h2 class="b-chp__word" data-field="chp-word">Материя</h2>
            <p class="b-chp__sub" data-field="chp-sub">Идея обретает фактуру: свет, ритм, движение — всё работает на одну историю.</p>
          </div>
        </div>
      </article>
      <article class="b-chp__chapter b-chp__chapter--c" data-chapter data-collection-item>
        <div class="b-chp__scene">
          <div class="b-chp__bg"><img data-field="chp-bg" src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1900&q=80" alt="" /></div>
          <div class="b-chp__scrim"></div>
          <figure class="b-chp__fg b-chp__fg--c b-chp__fg--xl b-chp__fg--over" data-chapter-fg style="--drift:44vh;--dx:0vw;--rot:-4deg"><img data-field="chp-fg-a" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--rt b-chp__fg--sm" data-chapter-fg style="--drift:24vh;--dx:5vw;--rot:8deg"><img data-field="chp-fg-b" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure class="b-chp__fg b-chp__fg--lm" data-chapter-fg style="--drift:30vh;--dx:-4vw;--rot:-7deg"><img data-field="chp-fg-c" src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <div class="b-chp__content">
            <b data-field="chp-comp" hidden aria-hidden="true"></b>
            <span class="b-chp__tag" data-field="chp-tag">Глава 03 · Результат</span>
            <h2 class="b-chp__word" data-field="chp-word">История</h2>
            <p class="b-chp__sub" data-field="chp-sub">Сайт, который не листают — который проживают. И пересказывают другим.</p>
          </div>
        </div>
      </article>
    </div>
    <span class="b-chp__counter" data-chapters-counter>01 / 03</span>
  </div>
</section>`,
  css: `.b-chp{--mask:torn;position:relative;background:#0a0a0f}
/* ── Флэт-дефолт: без JS / edit-канвас / мобилки — обычные стек-панели ── */
.b-chp__chapter{position:relative;min-height:100svh;overflow:hidden}
.b-chp__scene{position:absolute;inset:0}
.b-chp__bg{position:absolute;inset:0}
.b-chp__bg img,.b-chp__bg video{width:100%;height:100%;object-fit:cover;display:block}
.b-chp__scrim{position:absolute;inset:0;opacity:var(--scrim,1);background:linear-gradient(180deg,rgba(5,5,10,.22) 0%,rgba(5,5,10,.06) 42%,rgba(5,5,10,.62) 100%)}
.b-chp__fg{position:absolute;margin:0;width:clamp(150px,21vw,320px);border-radius:16px;overflow:hidden;box-shadow:0 30px 70px -18px rgba(0,0,0,.6);transform:rotate(var(--rot,-6deg));z-index:2}
.b-chp__fg img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:4/5}
.b-chp__fg--l{left:clamp(1rem,7vw,8rem);top:16%}
.b-chp__fg--r{right:clamp(1rem,6vw,7rem);top:44%}
.b-chp__fg--rt{right:clamp(1rem,8vw,9rem);top:14%}
.b-chp__fg--lb{left:clamp(1rem,6vw,7rem);top:48%}
.b-chp__fg--c{left:50%;margin-left:clamp(-160px,-10.5vw,-75px);top:12%}
.b-chp__fg--rb{right:clamp(1rem,10vw,10rem);top:66%}
.b-chp__fg--lt{left:clamp(1rem,9vw,9rem);top:10%}
.b-chp__fg--lm{left:clamp(1rem,5vw,6rem);top:38%}
.b-chp__fg--sm{width:clamp(110px,13vw,200px)}
.b-chp__fg--xl{width:clamp(240px,34vw,540px)}
/* объект «--over» летит ПОВЕРХ гигантского слова — глубина, как в референсе */
.b-chp__fg--over{z-index:4}
/* cutout: PNG с прозрачностью — не карточка, а силуэт с мягкой тенью */
.b-chp__fg:has(>img[src$=".png"]){border-radius:0;overflow:visible;box-shadow:none;background:none}
.b-chp__fg:has(>img[src$=".png"]) img{aspect-ratio:auto;object-fit:contain;filter:drop-shadow(0 34px 44px rgba(0,0,0,.5))}
.b-chp__content{position:relative;z-index:3;display:flex;flex-direction:column;justify-content:flex-end;min-height:100svh;padding:clamp(2rem,6vh,4.5rem) var(--space-block)}
.b-chp__content--center{align-items:center;text-align:center}
.b-chp__tag{font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.72);margin-bottom:1rem}
.b-chp__word{font-family:var(--font-heading);font-size:calc(clamp(3.4rem,13vw,10.5rem)*var(--wscale,1));line-height:.94;letter-spacing:-.03em;text-transform:uppercase;color:#fff;margin:0 0 1.1rem;text-shadow:0 2px 18px rgba(0,0,0,.5),0 20px 60px rgba(0,0,0,.45)}
.b-chp__word em{font-style:italic;color:var(--color-accent)}
.b-chp__sub{font-family:var(--font-body);font-size:clamp(1rem,1.5vw,1.25rem);line-height:1.65;color:rgba(255,255,255,.85);max-width:540px;margin:0;text-shadow:0 1px 12px rgba(0,0,0,.55)}
.b-chp__counter{display:none}
/* композиция главы (chp-comp): позиция слова */
.b-chp__chapter.comp-w-c .b-chp__content{justify-content:center;align-items:center;text-align:center}
.b-chp__chapter.comp-w-c .b-chp__sub{margin:0 auto}
.b-chp__chapter.comp-w-ct .b-chp__content{justify-content:flex-start;align-items:center;text-align:center;padding-top:clamp(5rem,14vh,9rem)}
.b-chp__chapter.comp-w-cb .b-chp__content{align-items:center;text-align:center}
.b-chp__chapter.comp-w-lt .b-chp__content{justify-content:flex-start;padding-top:clamp(5rem,14vh,9rem)}
.b-chp__chapter.comp-w-rt .b-chp__content{justify-content:flex-start;align-items:flex-end;text-align:right;padding-top:clamp(5rem,14vh,9rem)}
.b-chp__chapter.comp-w-rb .b-chp__content{align-items:flex-end;text-align:right}
@media(max-width:819px){.b-chp__fg--r,.b-chp__fg--lb,.b-chp__fg--sm,.b-chp__fg--rb,.b-chp__fg--lt,.b-chp__fg--lm{display:none}.b-chp__fg{width:clamp(120px,34vw,200px)}.b-chp__fg--xl{width:clamp(150px,44vw,260px)}}
/* ── Live: движок глав (десктоп, без reduced-motion) ── */
.b-chp.is-live .b-chp__stage{position:sticky;top:0;height:100vh;overflow:hidden}
.b-chp.is-live .b-chp__chapters{position:absolute;inset:0}
.b-chp.is-live .b-chp__chapter{position:absolute;inset:0;min-height:0;visibility:hidden;will-change:transform,clip-path}
.b-chp.is-live .b-chp__chapter.is-on{visibility:visible}
.b-chp.is-live .b-chp__chapter.is-covered{visibility:hidden}
.b-chp.is-live .b-chp__content{min-height:100vh}
/* уход накрываемой главы: лёгкий подъём + затемнение = физика перекатки */
.b-chp.is-live .b-chp__scene{transform:translateY(calc(var(--nt,0)*-7vh)) scale(calc(1 - var(--nt,0)*0.05));filter:brightness(calc(1 - var(--nt,0)*0.4))}
/* параллакс фона внутри главы */
.b-chp.is-live .b-chp__bg{transform:translateY(calc((0.5 - var(--cp,0.5))*6vh)) scale(1.1)}
/* foreground-треки: объекты едут по --drift/--dx за время жизни главы */
.b-chp.is-live .b-chp__fg{transform:translate(calc((0.5 - var(--cp,0.5))*var(--dx,0vw)),calc((0.55 - var(--cp,0.55))*var(--drift,46vh))) rotate(var(--rot,-6deg));opacity:var(--tp,1)}
/* слово въезжает с маской, слегка дрейфует, подтекст догоняет */
.b-chp.is-live .b-chp__word{transform:translateY(calc((1 - var(--tp,1))*9vh + (0.5 - var(--cp,0.5))*5vh));opacity:min(1,calc(var(--tp,1)*1.7))}
.b-chp.is-live .b-chp__sub{opacity:clamp(0,calc((var(--cp,1) - 0.03)*6),1)}
.b-chp.is-live .b-chp__tag{opacity:clamp(0,calc(var(--tp,1)*1.4 - 0.3),1)}
/* перекатка: слой везёт CSS от --tp, скругление тает к финалу */
.b-chp.is-live-roll .b-chp__chapter{transform:translateY(calc((1 - var(--tp,1))*103%));border-radius:calc((1 - var(--tp,1))*44px) calc((1 - var(--tp,1))*44px) 0 0;box-shadow:0 -40px 90px -20px rgba(0,0,0,.55)}
.b-chp.is-live .b-chp__counter{display:block;position:absolute;right:clamp(1.2rem,3vw,2.5rem);bottom:clamp(1.2rem,4vh,2.5rem);z-index:99;font-family:var(--font-body);font-size:.8125rem;font-weight:700;letter-spacing:.18em;color:rgba(255,255,255,.65)}`,
  variants: [
    { id: "torn", label: "Рваный край", css: "" },
    { id: "bevel", label: "Срезанные углы", css: `.b-chp{--mask:bevel}` },
    { id: "curtain", label: "Шторка", css: `.b-chp{--mask:curtain}` },
    { id: "roll", label: "Перекатка", css: `.b-chp{--mask:roll}` },
  ],
};
