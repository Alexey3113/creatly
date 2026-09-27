# Visual Hooks — апгрейд дизайн-языка + объём + cinematic-переходы

Задача (владелец): 50 ProSite «не читаются как дизайнерский подход», не цепляют; лендинги короткие (2-3 блока); нужны cinematic-переходы между блоками. Эталон арт-дирекции — красная страница-обложка `/visual-hooks` (Gallery).

Референсы: `docs/motionsites-teardown.md` (255), `analitic/inspiration/concept-board.md` (Pinterest 8 семейств + awwwards), красная Gallery-обложка.

## Часть 1 — Диагноз дизайн-языка (почему 50 «безлики»)

**Что делает красную Gallery-обложку «дизайнерской» (эталон):**
- Editorial-плакат / брутал-классика: **гигантский разорванный serif «VISUAL HOOKS» как СТРУКТУРА** (не просто заголовок), чёрный+красный+cream.
- Сильный повторяющийся **МОТИВ-объект**: halftone-статуи (дуотон red/olive), «forget to blink».
- **Неожиданная геометрия**: рваная красная зигзаг-панель (не скруглённый прямоугольник).
- **Микро-подписи по краям** (mono): «A MOTION STUDY», «CURATED BY CREATLY STUDIO @creatly», «SCROLL TO SEE», угловые ✦.
- **Оверлей типографики поверх объектов** (occlusion), намеренная асимметрия, bleed за края.

**Чего НЕТ в 50 ProSite (почему «конструктор»):**
- Заголовок = просто строка, а не типо-структура во весь экран.
- Нет повторяющегося мотива/трактовки изображения (halftone/дуотон/grain) — чистые фото.
- Формы = скруглённые прямоугольники; нет рваных/косых/editorial-форм.
- Мало микро-аннотаций (index-номера, вертикальные боковые подписи, mono-метки, ✦).
- Мало намеренной асимметрии и type↔object окклюзии в БЛОКАХ (не только hero).

**8 приёмов внести в ProSite hero + блоки (design-язык):**
1. Крупные **index-номера / метки секций** (`01 — THE IDEA`) и **вертикальные боковые подписи** (mono, rotate).
2. **Editorial-асимметрия**: намеренно смещённые заголовки, разная ширина колонок, bleed-медиа за край.
3. **Трактовка изображений**: опция halftone/дуотон/grain-оверлей на части кадров (мотив бренда), не только чистое фото.
4. **Неожиданные формы-акценты**: рваные/косые панели, тонкие линии-разделители, угловые скобки/крестики.
5. **Type-as-structure**: гигантское слово/цифра как фон-структура секции (behind контента), с occlusion.
6. **Foreground-объекты**: передний слой (частицы/лист/бленд/рамка) поверх кадра = глубина.
7. **Микро-typografika по краям**: legal/coord/индекс/✦ в углах каждой крупной секции.
8. **Единый «почерк» на сайт**: 1 мотив-трактовка + 1 форма-акцент + 1 типо-приём, повторяются во всех блоках (узнаваемость).

## Часть 2 — Объём лендинга (substantial)
(дополнится после разбора Codex) — цель: 10-14 блоков, кинематографичный ритм, +новые типы блоков.

## Часть 3 — Cinematic-переходы между блоками
(дополнится после разбора Codex) — zoom-въезд, push/slide, mask-seamless, foreground occluder, pinned scenes; общий reusable scroll-controller (progress per section).

## Часть 2 — Объём (от Codex): 10–14 секций, 4 акта
- Акт I hook/мир (hero → payoff → манифест) · Акт II доказательство (big-number → demo → showcase/before-after → spec) · Акт III погружение (cinematic band → process/pinned → editorial diptych) · Акт IV доверие (testimonial → proof/FAQ → cinematic CTA → footer).
- Ритм: не 3 грида подряд; чередовать масштабы (100svh→60-80vh→140-220vh sticky→compact→full-bleed); regime-change каждые 2-3 блока; ≥2 пика (hero + середина + короткий CTA).
- 6 новых блоков: cinematicBand ✅, bigNumber ✅(как bigNumber), editorialDiptych ✅(diptych), horizontalShowcase, longformManifest, processTimelineScene. 2-я очередь: testimonialScene, marqueeInterlude, technicalSpec.

## Часть 3 — Cinematic-переходы (от Codex): 7 приёмов
- zoom-in sticky ✅(cinematicBand/PortalHero) · push/slide · mask-seamless (clip-path/shader) · foreground occluder (cutout, схема Prototype --a1/a2/a3) · pinned scene ✅(cinematicBand) · crossfade/overlap · color wipe.
- Строить первыми: crossfade/overlap → color-wipe → zoom-in ✅ → foreground occluder. НЕ начинать с WebGL dissolve.
- Общий scroll-controller ✅ useSectionProgress (--sp; далее --a1/a2/a3, data-progress).

## Прогресс реализации
- ✅ Итерация 2: useSectionProgress + cinematicBand + bigNumber + diptych. Проверено на cask (8 блоков). Halftone-мотив, giant-index, editorial-асимметрия, overlap-seam.
- Дальше: horizontalShowcase + longformManifest + processTimelineScene; art-motif на сайт; crossfade/wipe между блоками; раскатка на 6-10 флагманов, затем на все 50.

## Codex — итерация 3 (приоритет + бэклог доработок)
Приоритет след. единиц: 1) color-wipe на act-границах (сделано ✅) · 2) foreground occluder — 1 раз на сайт, на вход в CinematicBand, пресеты по семействам (blade/paper/frame/organic/media-echo), НЕ по i%n · 3) longformManifest → processTimelineScene (horizontalShowcase последним — ломает mobile).
Color-wipe (сделано): двухфазная панель var(--wipe), clip-path inset по --a1 (въезд 0-32%) + translateX по --a3 (уход 60-100%); только на bigNumber-после-cinematicBand и cta; макс 1-2 на лендинг; под панелью реальная смена акта.
Occluder (техника): расширить BlockSeam до mode="occluder", `<i class="pb-seam-fg">`, фазы --a1/--a2/--a3, translate3d поперёк; overflow-x:clip на .pro (не overflow:hidden на seam); z-index:9; reduced-motion → display:none (не только --ev:1); mobile только blade/paper; raster 1200-1600px webp с альфой; НЕ круги/blob/чёрная диагональ на всех темах.
Бэклог точечных доработок (Codex «слабые места»):
- Reveal по роли (заголовок/media/label отдельно), не весь copy одним куском.
- Унифицировать типо-токены: старые блоки на --vh-serif, новые на --vh-display → всё крупное через persona-токены (--vh-display/body/label), чтобы data-type реально управлял.
- diptych.overlap: реализованы не все — object/type/panel как разные stacking-схемы; распределить по персонам (сейчас все "object").
- halftone → добавлен точечный растр ✅; grain → добавлен SVG-шум ✅. Дальше: варианты wash dark/light/duotone для CinematicBand (сейчас всегда тёмный+белый текст — ломает светлые бренды).
- CinematicBand: 3 режима камеры (push-in/drift/hold-reveal) по сайту; главы разной иерархии (одна доминирует 8-11vw); вход/hold/выход через --a1/a2/a3 + перекрытие соседних глав; mobile сохранить 1 дешёвый эффект; img loading=lazy.
- Композиционные варианты split/stats/steps (offset/edge/overscale/rail/stagger) в данных, не по индексу.
- Site-level --shape-language (square/soft/cut/capsule); для editorial/grotesk убрать радиусы.
- BlockChrome: section-index / ACT / вертикальная подпись / угловая метка (2-3 элемента, не в каждом блоке).
