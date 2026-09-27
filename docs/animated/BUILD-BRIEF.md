# BUILD-BRIEF — сборка ОДНОГО сайта-мира на движке Reel

Ты собираешь **один** иллюстрированный кино-скроллителлинг-лендинг из готовых ассетов. Цель всей серии:
30 сайтов, каждый — **свой мир, палитра, шрифты, копирайт и СВОЙ набор/порядок блоков**. Никакой шаблонности:
твой сайт не должен структурно повторять эталон (tidewell) или соседей. Уровень — designer-grade, анти-слоп.

## Что уже есть (НЕ трогай чужое)
- Движок рила: `components/animated-sites/model/reel.tsx` (`export function Reel`, `type ReelScene`) + `reel.css`. Общий для всех — НЕ редактируй.
- Твои ассеты (12 webp) в `public/uploads/1/animated/<slug>/`: `s{1..4}-{bg,mid,fg}.webp` + `kit.json` (id сцен, dark, палитра, thesis, motif).
- Данные мира — в `scripts/animated/worlds.ts` (найди свой `slug`): `thesis` (худож.тезис), `motif` (сквозной мотив), `palette` (hex+назв), `scenes[4]` (id, dark, bg/mid/fg — что изображено).
- ЭТАЛОН для образца (читай, НЕ копируй структуру): `components/animated-sites/model/sites/Tidewell.tsx` + `tidewell.css`.

## Что создаёшь (ровно 3 файла)
1. `components/animated-sites/model/sites/<Pascal>.tsx` — `"use client"`, `export function <Pascal>()`.
2. `components/animated-sites/model/sites/<slug>.css` — префикс классов СВОЙ (2-3 буквы мира, напр. `.em-` для emberroad). НЕ используй `cp-`/`tw-`/`rl-` для своих стилей.
3. `app/animated/w-<slug>/page.tsx` — `import { <Pascal> } ...; export default function Page(){ return <<Pascal>/>; }`.

## Контракт движка
```tsx
import { Reel, type ReelScene } from "../reel";
import "./<slug>.css";
const A = "/uploads/1/animated/<slug>";
const scenes: ReelScene[] = [
  { id:"...", bg:`${A}/s1-bg.webp`, mid:`${A}/s1-mid.webp`, fg:`${A}/s1-fg.webp`, /*dark:true,*/ /*spark:6,*/ copy:(<>...</>) },
  // 4 сцены по kit.json; dark:true для тёмных (ночь/глубина) — светлая типографика; spark:N — искры (светлячки/пыль/угли)
];
// в JSX:  <div className="<pfx>"> <header .../> <Reel scenes={scenes} cue="..." /> ...лендинг-блоки... </div>
```
- `.rl-copy` (контейнер копи сцены) движок только ПОЗИЦИОНИРУЕТ и синхронит прозрачность. Типографику копи (h1/h2/p/eyebrow/cta) стилизуй СВОИМИ классами внутри — в CSS таргеть `.rl-copy h1{...}` и т.п. под своим корнем.
- Палитра движка: на корне сайта задай `--rl-void:<тёмный фон рила>` и `--rl-spark:<цвет искр>`.
- Сцена 1 = hero (eyebrow + большой заголовок с `<em>` акцентом + подзаголовок + 2 CTA). Сцены 2-4 = главы (индекс + заголовок + строка).

## Правила арт-дирекшна (обязательно)
1. **Палитра мира** из `worlds.ts.palette` — доминанты + 1 CTA-акцент. Один акцент на весь сайт (не менять от блока к блоку).
2. **Свой шрифт-пейринг**: 1 display + 1 гротеск/сан. НЕ бери Fraunces+Archivo (canopy) и НЕ Cormorant+Manrope (tidewell) и НЕ повторяй пары уже занятые (Newsreader+Karla, DMSerif+SpaceGrotesk, Spectral+IBMPlex, LibreCaslon+IBMPlex, Bricolage+SpaceGrotesk). Serif — только если мир реально editorial/luxury/heritage; иначе sans-display.
   ЗАГРУЗКА ШРИФТОВ (важно, Turbopack может ронять CSS-@import не-первым правилом): (а) `@import url('https://fonts.googleapis.com/css2?...')` ПЕРВОЙ строкой css, И (б) продублируй `<link rel="stylesheet" href="...">` прямо в JSX компонента (Next поднимает в head — надёжнее), И (в) на КАЖДОМ `font:`/`font-family` укажи системный fallback (`"X", serif` или `"X", system-ui, sans-serif`), чтобы при сбое сети дизайн оставался осмысленным.
3. **Свой копирайт**: придумай бренд-нейм (из мира), обещание, главы, оффер, отзыв, цифры, CTA — всё в тоне мира. Английский. Не общими словами — конкретно и продающе.
4. **Nav со скримом** для контраста: `.<pfx>-nav::before{ content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(180deg, rgba(0,0,0,.4), transparent) }` + text-shadow на бренде (иначе на светлом герое лого пропадает — известный дефект).
   **КОНТРАСТ КОПИ НА СВЕТЛЫХ СЦЕНАХ (важно):** копи героя/светлых глав сидит поверх текстурной иллюстрации и почти всегда теряет читаемость даже с text-shadow. Реши это СРАЗУ: тёмный текст на светлой сцене → положи копи в полупрозрачную «frosted» подложку (`backdrop-filter:blur(...)` + мягкий rgba-фон мира + бордер/тень), она же часто усиливает мотив (стеклянная панель/рисовая бумага/дымка). Тёмные (dark:true) сцены — светлый текст, подложка не нужна. Стилизуй `.rl-copy` под своим корнем.
5. **Мир больше героя**: кино-кадр, без зумов вплотную; тень под mid уже даёт движок.
6. **Responsive** (`@media max-width:820px`: nav-ссылки скрыть кроме CTA, гриды в 1 колонку) + `@media (prefers-reduced-motion)` уже частично в reel.css.
7. Кнопки: текст в 1 строку, контраст AA, `:active` тактильный сдвиг. Радиусы — одна система.

## Меню блоков лендинга (собери 6-9 в продающую арку, ПОРЯДОК свой)
Обещание(hero в риле) → погружение → проблема/контекст → решение → возможности → как работает → showcase → доказательства(цифры/отзыв) → кульминация+CTA → сделка(цена) → footer.
Типы (комбинируй, не обязателен весь список): manifesto(одна крупная мысль) · steps/process(нумерованные, гориз. ИЛИ верт.) · feature-cards(2-4) · timeline/gauge(верт. шкала) · split(медиа+текст, лево ИЛИ право) · stats(лента цифр) · quote/testimonial · gallery(ряд/сетка из bg-плит как обложки) · marquee(бегущая строка) · big-type(гигант-заявление) · FAQ/accordion · pricing/deal · climax(CTA поверх bg-плиты с вуалью).

## ТВОЙ СИГНАТУРНЫЙ БЛОК (чтобы сайты не повторялись)
В промпте тебе укажут `SIGNATURE: <тип>` — обязательно включи этот блок как заметный, вокруг него строй остальное. Плюс добавь ещё ≥1 блок, которого нет у эталона (эталон использует: manifesto, depth-gauge, split, stats, quote, deal, climax).

## Галерея-плиты
Для gallery/showcase используй свои же `s{1..4}-bg.webp` как обложки (4 «сезона/главы» мира) — как в эталоне.

## Готово = 
Файлы созданы, `npx tsx`/дев компилит без ошибок, роут `/animated/w-<slug>` открывается. Если можешь — сними скриншот:
`PATH="/Users/leo/.nvm/versions/node/v22.22.3/bin:$PATH" node analitic/inspiration/shot-scroll.mjs animated/w-<slug> "0,0.2,0.4,0.7" ` (дев уже на :3011) и глянь герой+лендинг, поправь явные косяки. НЕ трогай reel.tsx/reel.css, чужие сайты, index/реестр (его подключу централизованно).

## Пул шрифтов (ротация, не повторять между мирами)
Display: Cabinet Grotesk, PP Neue Montreal (нет на GFonts → замена: Space Grotesk, Familjen Grotesk), Bricolage Grotesque, Clash Display(→Familjen), Unbounded, Syne, Fraunces(занят), Cormorant(занят), Spectral, Newsreader, Playfair Display, Libre Caslon Display, DM Serif Display, Big Shoulders Display, Anton, Archivo Black, Instrument Sans, Sora, Outfit, Epilogue, Marcellus, Italiana, Zilla Slab, Bodoni Moda, Fraunces alt.
Sans/body: Manrope(занят), Inter Tight, Mona/Hanken Grotesk, Space Grotesk, Work Sans, DM Sans, Public Sans, Figtree, Onest, Schibsted Grotesk, Geist(→Inter Tight), IBM Plex Sans, Karla, Sora.
Подбери пару под настроение мира; проверь, что оба есть на Google Fonts.
