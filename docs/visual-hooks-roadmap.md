## FORGE — редизайн в editorial-постер (без видео), точечная обработка

- Полный редизайн forge под стилистику тёмных editorial-постеров (референсы MEA CULPA / MONARCH): компонент `PosterScene` — центр-субъект, гигантский Playfair-титул с type-occlusion (слово ЗА субъектом + слово ПЕРЕД), угловые ✦-аннотации, тонкая рамка со скобами, editorial-подпись, сборка по скроллу (--sp→--as) + курсор-параллакс. Сигнатура: Damascus-мотив, blade-cut на CTA-кнопке, edge-line.
- ВСЁ ВИДЕО УБРАНО (по запросу владельца): hero/process/gallery — стиллы. Process остался pinned Heat→Hammer→Quench→Hone, переведён на новые стиллы.
- 5 постер-картинок сгенерены через Higs (nano-banana-pro, 2K): smith(молот)/blade/hands/quench/atmos — steel-graphite duotone + ember-акцент.
- Higs Bot: sync-путь (wait:true) ловит 60-сек таймаут бота на nano-banana-pro → добавлен экспорт `higsGenerateImageAsync` (wait:false + опрос /api/jobs), им и генерим. Бот пару раз залипал ("retrying click action") — после перезапуска владельцем ожил.
- Шов прямоугольных картинок → маска на .pos-subj img (radial-gradient края в прозрачность): субъект «выходит из темноты», бесшовно при любом фоне кадра. Титулы читаются: DAMASCUS (клинок между DAMA|SCUS), ONE OF ONE, FORGED/NOT MADE.
- Осталось: hands.jpg с серым студийным фоном (мягкий прямоугольник ещё чуть виден) — при желании перегенерить с pure-black фоном; опция поднять FORGED в верхний воздух для полной читаемости. Скролл-скриншоты снимать ТОЛЬКО mouse.wheel (headless scrollTo не шлёт scroll-событие → --sp не растёт).
## Цикл — НАСТОЯЩИЙ color-wipe на act-границах + фикс motif-багов (Codex #1)

- Codex-ревью (read-only): №1 = настоящий color-wipe; поймал 2 бага — мой data-seam="wipe" отличался лишь высотой скрима (цвета не было), и motif:"grain" создавал класс m-grain, которого нет в CSS (не работал).
- Реализован color-wipe: `.pb-seam[data-seam="color"]::after` — двухфазная акцентная панель var(--wipe): clip-path inset (въезд слева 0-32% прогресса) + translateX (уход вправо 60-100%), при ev=1 за кадром = safe. Убрал i%3; seam назначается по роли: color на bigNumber-после-cinematicBand (вход в акт-доказательство) и на cta (финал) = ровно 2 wipe/лендинг на осмысленных границах.
- Фикс мотивов: halftone получил реальный точечный растр (multiply-dot-grid) — теперь читается как печать, а не просто ч/б; grain получил настоящее SVG-зерно (feTurbulence overlay).
- Проверено визуально: iron (halftone-точки видны + оранжевый wipe въезжает в bigNumber), wax (grain на виниле + розовый wipe уходит, открывая «12″»), velo. Все 50 роутов 200.
- Бэклог Codex сохранён в docs/visual-hooks-design-upgrade.md (occluder-техника, типо-токены, 3 режима камеры CinematicBand, diptych overlap-схемы, shape-language, BlockChrome).
- ДАЛЬШЕ: foreground occluder (1/сайт, вход в CinematicBand) → longformManifest.
## Цикл — БЕСШОВНЫЕ ШВЫ между блоками (cinematic transition, Codex #1)

- Добавлен системный `BlockSeam`-враппер (VisualHooksLab.tsx): пишет --ev (0 внизу → 1 в кадре) через IO-гейт + RAF, дефолт --ev:1 = шва нет (safe при сбое/reduced-motion). Обёрнуты ВСЕ блоки всех 34 ProSite разом (исключены cinematicBand/cine — self-bleed).
- CSS `.pb-seam::before`: скрим-градиент из `var(--bg)` сайта (60-84vh, opacity=1-ev). Секция «проявляется из тени/бумаги» — motionsites-приём «rise from dark». Скрим совпадает с фоном → шов не читается.
- Проверено визуально: iron/velo (тёмные) — следующий блок всплывает из чёрного; stem (cream) — из светлого; текст текущего блока читается, ничего не сломано. Все 50 роутов 200.
- Реализует Codex-приоритет B (crossfade/overlap seam). Дальше по плану: color-wipe цветной панелью на act-границах, foreground occluder; +новые типы блоков (horizontalShowcase/longformManifest/processTimelineScene) где ритм требует.
## Цикл — РАСКАТКА кино-блоков на ВСЕ 34 ProSite (объём + дизайн + кино)

- Вставлен кластер cinematicBand + bigNumber + diptych в КАЖДЫЙ из 34 ProSite (перед idea-блоком = hero→payoff→proof→манифест). 7 вручную (флагманы по архетипам) + 24 через scripts/.rolloutcine.mjs (надёжная строковая вставка с per-site контентом) + 3 добивка (comb/swell/wick).
- Каждый ProSite теперь 9-11 блоков (было 5-7): объёмнее, кинематографичнее, с art-motif (halftone/grain-трактовка), giant-index в diptych, big-number пересекает медиа, pinned zoom-сцена с главами.
- Все 50 роутов 200 (компиляция ок). Визуально проверено: cask, thread, loaf — halftone-кино-band + big-number + editorial-диптих. Качество подтверждено.
- 16 bespoke (forge/mono/phantom/… + ledger) уже с богатым ручным контентом — не трогаем (у них своя система, не ProBlock).
- ИТОГ по трём частям задачи: часть A (дизайн-язык — halftone-мотив, giant-index, editorial-асимметрия, overlap-seam внесены), часть B (cinematic zoom-band/pinned + курсор/скролл-интерактив прошлых итераций), часть C (объём — все 34 стали длиннее и драматургичнее).
- ДАЛЬШЕ (полиш): crossfade/color-wipe переходы между блоками; +horizontalShowcase/longformManifest/processTimelineScene где нужно; тонкая настройка art-motif per site.
## Цикл — ДИЗАЙН+ОБЪЁМ+КИНО (loop, разбор с Codex): итерация 2

- Codex дал A/B/C (docs/visual-hooks-design-upgrade.md). Диагноз A: ProSite шаблонны ПОСЛЕ hero — единый .pb-* ритм, изолированные секции, безопасная геометрия, нет сквозного мотива.
- ВНЕДРЕНО: useSectionProgress (общий scroll-controller, --sp, RAF+IO+reduced-motion) + 3 новых блока: cinematicBand (pinned zoom + halftone-мотив + сменяющиеся главы), bigNumber (гигантское число пересекает медиа), diptych (editorial, giant-index-мотив, secondary за границу секции = overlap-seam).
- Проверено скринами на cask (теперь 8 блоков): cinematicBand с god-ray бочками и halftone — реальное «кино»; bigNumber 58.2%; diptych N°47.
- Закрывает часть A (halftone-мотив, giant-index, асимметрия), B (zoom-in/pinned), C (объём +3 типа).
- ДАЛЬШЕ: +horizontalShowcase/longformManifest/processTimelineScene; art-motif+signature-object на сайт; crossfade/color-wipe между блоками; раскатка на 6-10 флагманов → все 50.
## Цикл — ИНТЕРАКТИВ hero: итерация 3 (depth-gaze)

- Higs сгенерил 5 depth-map (cask/fetch/fern/pour/malt) через ref=постер (near=white, far=black, gladкий градиент). Качество отличное (стакан белый, фон чёрный).
- Поле depth? в product-theatre variant + условный рендер <DepthParallax src depth amp=0.038> вместо <img>. Класс .has-depth отключает CSS-cursor-translate объекта (камера в WebGL, чтобы не двоить).
- Проверено скринами с курсором: cask и fetch — WebGL-камера двигает ближний объект сильнее дальнего фона, БЕЗ разрывов на крае (dsample-blur + малый amp). Объект живёт в 2.5D.
- ИТОГ механик hero: cursor-parallax (3 плана, 4 архетипа) + type-occlusion (слово сквозь объект) + scroll-payoff (portal→full-bleed) + depth-gaze (2.5D камера, 5 product-theatre). Реальный уход от «постеров».
- ДАЛЬШЕ: regime-shift реальный light→dark скан по scroll (переиспользовать PortalHero-паттерн scroll-controller); break-the-rectangle (cutout remove-bg → слово вплетается в реальный силуэт объекта); опц. ShaderReveal state-pair (материал проявляется на курсор).

## Цикл — ИНТЕРАКТИВ hero: итерация 2 (фиксы Codex + scroll-payoff)

- Codex-консультация: механики верные (не мишура), но нашёл КРИТИЧЕСКИЙ баг — мой transform затёр translateX(-50%) у .ph-th-object (театр потерял центр). ИСПРАВЛЕНО (transform:translate(calc(-50% + ...))). Проверено: cask снова центрирован.
- Рефактор pointer-параллакса: обёрнут в @media(pointer:fine)+no-preference (тач/reduced-motion без движения), will-change только на :hover, переднее+заднее слово type-collision двигаются цельно.
- НОВОЕ: scroll-payoff для portal-frame. Компонент PortalHero (sticky 220vh, scroll progress --sp 0..1) → рамка-окно раскрывается в full-bleed (scale + border-radius→0), фон/копия/шапка гаснут. Pointer-параллакс вынесен на .ph-pt-frame-wrap (не смешивать transform — совет Codex). Проверено на swell: на ~55% скролла портал заполняет экран = «вход в мир». Все 4 portal-сайта получили автоматически.
- Depth-maps генерятся (Higs) для depth-gaze (следующая итерация). Codex: depth-gaze — усиление после cursor-parallax; cutout — сильное визуальное; scroll-payoff был приоритетом #1 (сделан).
- ДАЛЬШЕ: depth-gaze (DepthParallax+курсор-камера в product-theatre), regime-shift реальный light→dark скан (scroll), break-the-rectangle (cutout remove-bg).

## Цикл — ИНТЕРАКТИВ hero (по eval vs motionsites): итерация 1

- Цель: закрыть провалы из docs/visual-hooks-vs-motionsites-eval.md — hero должны стать живыми сценами, не постерами.
- СДЕЛАНО (проверено скринами с движением курсора):
  - Pointer-хендлер heroMove/heroLeave → CSS-vars --px/--py (-1..1) в секцию, без ре-рендера. Подключено к product-theatre / type-collision / edge-arrival / portal-frame.
  - Курсор-параллакс: объект двигается сильнее копии (3 плана глубины), фон портала в противоход. reduced-motion отключает.
  - type-collision ОККЛЮЗИЯ: передний слой .ph-tc-front (копия заголовка, clip к рамке объекта) — слово теперь проходит ПЕРЕД объектом в центре и ЗА ним по краям. WAX: «ANALOG» читается и вплетён в винил (большой скачок).
- В ФОНЕ: (1) генерю depth-maps для 5 product-theatre (cask/fetch/fern/pour/malt) через Higs (ref=постер) → для depth-gaze. (2) Codex-консультация по дизайну механик.
- ДАЛЬШЕ: depth-gaze (DepthParallax в hero + курсор-камера), break-the-rectangle (cutout remove-bg), scroll-payoff (sticky-контроллер: portal→full-bleed, regime-shift реальный light→dark скан). Флагманов ~10, не все 50.

## ✅✅✅ РЕДИЗАЙН ЗАВЕРШЁН — ВСЕ 50 САЙТОВ УНИКАЛЬНЫ (0 legacy)

- Применены финальные батчи B2 (stride,barb,steep,loaf,balm,cacao), B3 (comb,spice,lens,spine,pour,grove), B4 (curd,ink,selvedge,mane,deck,lather,malt,wick).
- Фиксы type-collision (короткие слова): deck SKATE→KICKFLIP + object на action-кадр deck-skate; wick SLOW→SLOWBURN. Оба проверены.
- ИТОГ: 34/34 ProSite на архетипах, 0 legacy. Распределение: product-theatre×5, edge-arrival×5, остальные ×4 (совпадает с картой codex).
- Прогон всех 50 слагов: 200/200.
- ВСЕ 50 = уникальный силуэт: 15 bespoke + ledger + 34 ProSite (8 архетипов × разная типографика/палитра/сторона/light-dark). Silhouette-test пройден.
- Шрифт grotesk = Bricolage Grotesque (отличительный).
## Цикл — редизайн батч B1 (+6 сайтов по карте): 14/34

- Применены: botanic(gallery-horizon/editorial), clay(hard-split/editorial, media-left), plat(edge-arrival/fashion, edge-right), fetch(product-theatre/grotesk), fern(product-theatre/editorial), hide(hard-split/fashion, media-right). Все 200, скрин-проверка ок.
- Подтверждено: один архетип + разная типографика/сторона/палитра = разные силуэты (clay vs thread hard-split; fetch vs cask product-theatre; botanic vs stem gallery-horizon).
- ProSite с архетипом: 14/34. Осталось 20: stride,barb,steep,loaf,balm,cacao,comb,spice,lens,spine,pour,grove,curd,ink,selvedge,mane,deck,lather,malt,wick.

## Цикл — редизайн: 8 архетипов ГОТОВЫ + карта codex на все 34 + шрифт Bricolage

- Codex дал полную карту распределения (docs/visual-hooks-archetype-map.json) на 34 ProSite: каждый архетип 4-5 раз, ZERO legacy (макс. разнообразие).
- Построены +3 архетипа (проверены скринами): regime-shift(NIB, светлая печатная тема+ч/б объект+sans), portal-frame(SWELL, рамка-портал с видео), index-stage(VELO, каталог-список+preview hover через :has).
- Шрифт grotesk-персоны: Space Grotesk → Bricolage Grotesque (отличительный; закрыл hook overused-font). @import обновлён.
- Применено 8/34: iron, thread, cask, stem, wax, nib, swell, velo. Осталось 26 — по карте, батчами.
- ВСЕ 8 архетипов теперь доступны и проверены: hard-split, product-theatre, gallery-horizon, type-collision, edge-arrival, regime-shift, portal-frame, index-stage.

## Цикл — редизайн: +2 архетипа (type-collision, edge-arrival), решение владельца

- Владелец выбрал: раскатка АВТОНОМНО (как 50) + СМЕЛО (awwwards). Записано в память visual-hooks-hero-redesign.md.
- +type-collision (WAX): одно широкое слово ANALOG за центральным объектом (винил). Урок: НЕ две строки — объект закрывает середину, края слова должны читаться; объект сузил до 38vw.
- +edge-arrival (IRON): видео-объект входит снизу-слева (58vw), заголовок offset справа (grotesk + orange акцент), glass proof-card. edge:left|right.
- ИТОГО 6 архетипов проверены: legacy, hard-split(thread), product-theatre(cask), gallery-horizon(stem), type-collision(wax), edge-arrival(iron).
- Осталось: 3 архетипа (regime-shift, portal-frame, index-stage), секции-модули, переназначить ~26 legacy-сайтов батчами по матрице.

## Цикл — РЕДИЗАЙН ПРОТИВ ШАБЛОННОСТИ (codex-соавторство): hero-архетипы, пилоты

- Владелец: 34 ProSite однотипны (видео-бг + шапка + текст слева-снизу, один шрифт). Провели разбор С CODEX (codex-cli 0.146.0, read-only, +7 evidence-скринов motionsites). План сохранён в docs/visual-hooks-hero-redesign-plan.md.
- Диагноз: ProSite повторяет одну драматургию. Лечение (codex+я): hero = discriminated union архетипов + вариант legacy (обратная совместимость, без big-bang) + 4 типографические личности через data-type.
- ВНЕДРЕНО (фундамент): типы ProHero/TypePersona/HeroBase, resolveHero (legacy fallback на eyebrow/title/sub), ProHeroView (switch), ProSite стал shell с data-hero/data-type. 31 legacy-сайт рендерится без изменений (iron проверен 200).
- 3 АРХЕТИПА + 3 пилота (скрин-проверка):
  - hard-split (THREAD): 50/50, слева Space Grotesk uppercase + gold-акцент + индекс, справа full-height видео. typography=grotesk.
  - product-theatre (CASK): serif-italic заголовок перекрывает продукт-кадр (bleed снизу) + proof-чипы. typography=fashion. Фикс: .ph-th-copy max-width 22ch→min(640px,54vw) (ch мерялся мелким шрифтом).
  - gallery-horizon (STEM): светлый editorial, центр-заголовок + горизонтальная лента 5 кадров, обрезка по краям. typography=editorial.
- CSS: .ph/.ph--split/.ph--theatre/.ph--gallery + .pro[data-type=*] (Instrument Serif / Space Grotesk / serif-fashion). Mobile + reduced-motion предусмотрены.
- Осталось: 5 архетипов (edge-arrival, type-collision, regime-shift, portal-frame, index-stage), новые секции-модули (rail/sticky-switch/index-preview/spec-sheet/…), переназначить ~31 сайт по матрице (архетип не повторяется у соседей; full-bleed video ≤20%; bottom-left copy ≤3-4).

## ✅✅ PHASE-2 ЗАВЕРШЕНА И ПРОВЕРЕНА — 50/50 продакшн + панель + QA

- wax-hero.mp4 перегенерирован (винил) — проверен кадром и живым скрином (роут 200, контент корректен). md5 ≠ spine.
- КОНТАКТ-ЛИСТ всех 50 hero-видео (первые кадры, ffmpeg tile 5x10, herosheet.jpg) просмотрен: КАЖДОЕ видео соответствует нише. Мисматчей больше нет (wax был единственным).
- ИТОГ Phase-2 (полностью):
  1. Все 50 сайтов = продакшн: объяснение-идея + галерея + cta. 34 ProSite (уникальные блоки/палитры/cine) + 1 ledger + 15 bespoke (+галереи vh-gal2).
  2. Панель: главная /visual-hooks (nav + band «See all 50») + индекс /visual-hooks/sites.
  3. Визуальное QA: светлые/тёмные темы, pb-gal, vh-gal2, все hero — подтверждены.
  4. Баг wax/spine найден и исправлен; spine получил своё books-hero-видео.
- Прогон 50 слагов: 200/200.

### Возможные следующие фазы (для будущих итераций):
- Перф: галерейные картинки 2K по ~2-3МБ (×~140) — сжать/оптимизировать для быстрой загрузки.
- Расширение: новая партия продуманных сайтов (приоритет пользователя из брифа).
- SPINE: при желании — свой уникальный bookshop-видеоряд (сейчас использует books-видео от старого wax — тематически верно).

## Цикл — ВИЗУАЛЬНОЕ QA + вывод 50 на главную + фикс wax/spine

- Вывод на главную: в Gallery добавлены nav-ссылка "Business sites" + промо-band .vh-sites-band (заголовок + CTA "See all 50 sites" + 6 превью phantom/horologe/vessel/forge/botanic/ink → /visual-hooks/sites). Главная рендерится 200.
- Playwright-скрин-QA (analitic/inspiration/shot-prod.mjs) 5 сайтов: STEM (light hero — идеально), FETCH (pb-gal n3 асимметрия — отлично), PHANTOM (.vh-gal2 strip — отлично), IRON (dark — отлично). Светлые темы и gallery-strip визуально подтверждены.
- НАЙДЕН БАГ: wax-hero.mp4 содержал видео с КНИГАМИ (ассет SPINE попал в wax при исходной видео-генерации; spine-hero.mp4 не существовал). Постер wax.jpg корректен (винил).
- ФИКС: books-видео скопировано в spine-hero.mp4 (там оно к месту — spine получил hero-видео), wax-hero.mp4 перегенерируется из wax.jpg (винил) через kling (scripts/.vidfix.ts, в фоне).
- md5-аудит всех hero-видео и постеров: других дублей/мисматчей НЕТ (баг был единичным).

## ✅ ВЕХА — все 50 сайтов = ПРОДАКШН (bespoke 15/15, ROAST+LUME)

- Вставлен .vh-gal2: ROAST (beans/pour), LUME (ring/bench). Все 15 bespoke имеют галерею (14 vh-gal2 + forge frg-gallery).
- ПРОВЕРКА: прогон всех 50 слагов из панели — ok=50/50, роут /visual-hooks/sites 200.
- ИТОГ Phase-2: 34 ProSite (уникальные блоки+палитры+cine) + 1 ledger + 15 bespoke. Каждый сайт = idea/объяснение + галерея + cta, ни один не шаблон.
- Память проекта обновлена (visual-hooks-library.md).
- Дальше по roadmap: возможные направления — вывести 50 в главную панель VisualHooksLab (не только /sites), перф-оптимизация картинок, ещё cinematic-секции, либо новая партия сайтов.

## Цикл — bespoke галереи 13/15 (FORM, DEW)

- Вставлен .vh-gal2: FORM (chair/detail), DEW (bottle/skin). Роуты 200.
- Кинуты финальные галереи ROAST (beans/pour), LUME (ring/bench).
- Bespoke с галереей: 13/15. Остаток: roast, lume (последние).
- После них ВСЕ 50 сайтов = продакшн (idea + gallery + cta), каждый уникален.

## Цикл — bespoke галереи 11/15 (VESSEL, HAVEN)

- Вставлен .vh-gal2: VESSEL (look/fabric), HAVEN (room/view). Роуты 200.
- Кинуты галереи FORM (chair/detail), DEW (bottle/skin).
- Bespoke с галереей: 11/15. Остаток: form, dew, roast, lume.

## Цикл — bespoke галереи 9/15 (NOCT, SOL; FORGE уже полный)

- Вставлен .vh-gal2: NOCT (pour/cellar), SOL (panel/roof — light-тема, strip ложится). Роуты 200.
- FORGE проверен: уже имеет frg-gallery — полный, апгрейд не нужен.
- Кинуты галереи VESSEL (look/fabric), HAVEN (room/view).
- Bespoke с галереей: mono, phantom, horologe, tide, canto, atlas, forge, noct, sol (9/15). Остаток: vessel, haven, form, dew, roast, lume.

## Цикл — bespoke галереи 6/15 (CANTO, ATLAS)

- Вставлен .vh-gal2: CANTO (deck/room), ATLAS (pack/field). Роуты 200.
- Кинуты галереи NOCT (pour/cellar), SOL (panel/roof).
- Bespoke с галереей: mono, phantom, horologe, tide, canto, atlas (6/15). Остаток: forge(проверить — 62 строки, возможно уже полный), noct, sol, vessel, haven, form, dew, roast, lume.

## Цикл — bespoke галереи 4/15 (HOROLOGE, TIDE)

- Вставлен .vh-gal2: HOROLOGE (dial/caseback), TIDE (swim/shore). Роуты 200.
- Кинуты галереи CANTO (deck/room), ATLAS (pack/field).
- Bespoke с галереей: mono, phantom, horologe, tide (4/15). Остаток: forge(проверить), canto, atlas, noct, sol, vessel, haven, form, dew, roast, lume.

## Цикл — bespoke галереи 2/15 (MONO, PHANTOM)

- Вставлен .vh-gal2 (2 кадра, reveal vh-rv--mask) перед CTA: MONO (interior/dusk), PHANTOM (rear/cabin). Роуты 200.
- Проверено: gallery-strip нейтрален, ложится на тёмные bespoke-палитры.
- Кинуты галереи HOROLOGE (dial/caseback), TIDE (swim/shore).
- Остаток bespoke без галереи: forge(проверить), horologe, tide, canto, atlas, noct, sol, vessel, haven, form, dew, roast, lume.

## Цикл — апгрейд 35/50 (MALT в PRO) — BIZ ПУСТ; старт ревизии bespoke

- MALT (brewery): idea → editorial(tank) → split(rev, grain+list) → gallery×2 → cta. Палитра pro-malt (янтарный).
- BIZ-запись пуста: все 35 «шаблонных» сайтов теперь уникальные ProSite (34 PRO + ledger bespoke).
- Ревизия bespoke: 15 сайтов (forge/mono/phantom/horologe/tide/canto/atlas/noct/sol/vessel/haven/form/dew/roast/lume) имеют idea✓+cta✓, но НЕТ галереи. Добавляю общий нейтральный gallery-strip .vh-gal2 (2 кадра, вставка перед CTA) — по 2 сайта/итерацию.
- Кинуты галереи MONO/PHANTOM (mono-interior/dusk, phantom-rear/cabin).

## Цикл — апгрейд 34/50 (DECK, LATHER в PRO)

- DECK (skate shop): idea → cine(grid) → split(rev, shop+list) → gallery×2 → cta. Палитра pro-deck (оранж на пурпуре, retrowave).
- LATHER (apothecary): idea → editorial(shelf) → split(make+list) → gallery×2 → cta. Палитра pro-lather (сдержанный sage).
- Обе из BIZ, роуты 200.
- Итог: 33 PRO + ledger = 34/50. Осталось 1 BIZ: malt (галерея генерится).
- ВАЖНО: после malt BIZ будет пуст. Оставшиеся 15 — bespoke-сайты (forge, mono, phantom, horologe, lume, haven, tide, canto, atlas, noct, sol, dew, vessel, form, roast) — уже полноценные ручные композиции. Следующий шаг после malt: пройтись по bespoke и проверить, что у каждого есть idea/gallery/cta (дообогатить где нужно).

## Цикл — апгрейд 32/50 (MANE, SELVEDGE в PRO)

- MANE (hair studio): idea → editorial(chair) → split(style+list) → gallery×2 → cta. Палитра pro-mane — СВЕТЛАЯ (розовый акцент на светлом), 2-я светлая среди апгрейдов.
- SELVEDGE (raw denim): idea → editorial(loom) → split(rev, fade+list) → gallery×2 → cta. Палитра pro-selvedge (индиго-синий — под деним).
- Обе из BIZ, роуты 200.
- Итог: 31 PRO + ledger = 32/50. Осталось 3 BIZ (deck, lather, malt). Галереи DECK/LATHER в фон.

## Цикл — апгрейд 30/50 (SPINE, INK в PRO)

- SPINE (bookshop): idea → editorial(shelf) → split(stack+list) → gallery×2 → cta. Палитра pro-spine (лесной зелёный акцент — читальная лампа).
- INK (tattoo studio): idea → cine(nebula) → split(rev, work+list) → gallery×2 → cta. Палитра pro-ink (фиолетовый) — первый cine-nebula среди апгрейдов.
- Обе из BIZ, роуты 200.
- Итог: 29 PRO + ledger = 30/50. Осталось 5 BIZ (mane, selvedge, deck, lather, malt). Галереи MANE/SELVEDGE в фон.

## Цикл — апгрейд 28/50 (LENS, WAX в PRO)

- LENS (film portraits): idea → editorial(portrait) → split(camera+list) → gallery×2 → cta. Палитра pro-lens (почти монохром, тёплый акцент).
- WAX (record shop): idea → cine(grid/retrowave) → split(rev, spin+list) → gallery×2 → cta. Палитра pro-wax (розовый неон на пурпуре) — первый cine-grid среди апгрейдов.
- Обе из BIZ, роуты 200.
- Итог: 27 PRO + ledger = 28/50. Осталось 7 BIZ (spine, ink, mane, selvedge, deck, lather, malt). Галереи SPINE/INK в фон.

## Цикл — апгрейд 26/50 (POUR, CURD в PRO)

- POUR (cocktail bar): idea → cine(ember) → split(make+list) → gallery×2 → cta. Палитра pro-pour (тёмный плюм + амбер).
- CURD (cheesemonger): idea → editorial(cave) → split(rev, wheel+list) → gallery×2 → cta. Палитра pro-curd (тёплое золото).
- Обе из BIZ, роуты 200.
- Итог: 25 PRO + ledger = 26/50. Осталось 9 BIZ (lens, wax, spine, ink, mane, selvedge, deck, lather, malt). Галереи LENS/WAX в фон.

## Цикл — апгрейд 24/50 (COMB, GROVE в PRO)

- COMB (raw honey): idea → cine(ember) → split(frame+list) → gallery×2 → cta. Палитра pro-comb (золото/мёд на тёмном).
- GROVE (olive oil): idea → editorial(tree) → split(rev, bottle+list) → gallery×2 → cta. Палитра pro-grove (оливковый зелёный).
- Обе из BIZ, роуты 200.
- Итог: 23 PRO + ledger = 24/50. Осталось 11 BIZ. Галереи CURD/POUR в фон.

## Цикл — апгрейд 22/50 (HIDE, SPICE в PRO)

- HIDE (leather): idea → editorial(bench) → split(stitch+list) → gallery×2 → cta. Палитра pro-hide (коньячный на тёмном; НЕ банальный beige+brass — фон тёмный).
- SPICE (merchant): idea → cine(ember) → split(rev, jars+list) → gallery×2 → cta. Палитра pro-spice (красно-оранж).
- Обе из BIZ, роуты 200.
- Итог: 21 PRO + ledger = 22/50. Осталось 13 BIZ. Галереи COMB/GROVE в фон.

## Цикл — апгрейд 20/50 (FERN, CACAO в PRO) — ПОЛОВИНА

- FERN (plants): idea → editorial(room) → gallery×3 → steps → cta. Палитра pro-fern (emerald на тёмном; отличается от stem-light для контраста).
- CACAO (bean-to-bar): idea → cine(ember) → split(bean+list) → editorial(pour) → cta. Палитра pro-cacao (какао-браун — оправдан продуктом, не банальный beige-cream).
- Обе из BIZ, роуты 200.
- Итог: 19 PRO + ledger = 20/50 (50% продакшн-апгрейда). Осталось 15 BIZ. Галереи HIDE/SPICE в фон.

## Цикл — апгрейд 18/50 (VELO, BALM в PRO)

- VELO (steel bikes): idea → editorial(braze) → split(frame+list) → gallery×2 → stats → cta. Палитра pro-velo (красный акцент на графите).
- BALM (spa): idea → cine(silk) → editorial(room) → split(rev, stones+list) → cta. Палитра pro-balm (мягкая лиловая).
- Обе из BIZ, роуты 200. Первый cine-silk среди апгрейдов (иридесцентный шёлк под спа).
- Итог: 17 PRO + ledger = 18/50. Осталось 17 BIZ. Галереи FERN/CACAO в фон.

## Цикл — апгрейд 16/50 (STEEP, LOAF в PRO)

- STEEP (tea): idea → editorial(garden) → split(leaf+list) → gallery×2 → cta. Палитра pro-steep (зелёный на тёмном).
- LOAF (bakery): idea → cine(ember) → split(rev, crumb+list) → gallery×2 → quote → cta. Палитра pro-loaf (тёплый оранж).
- Обе из BIZ, роуты 200.
- Итог: 15 PRO + ledger (bespoke) = 16/50. Осталось 19 BIZ-сайтов; bespoke (forge/mono/phantom/…) уже полноценные.
- Галереи VELO/BALM запущены в фон.

## Цикл — апгрейд 14/50 (THREAD, BARB в PRO)

- THREAD (bespoke tailoring): idea → split(cloth+list) → editorial(fitting) → gallery×2 → stats → cta. Палитра pro-thread (тёплый золотистый на тёмном).
- BARB (barbershop): idea → editorial(chair) → split(rev, cut+list) → cine(ember) → cta. Палитра pro-barb (жжёный оранж).
- Обе из BIZ, роуты 200. Каждая — уникальная последовательность блоков.
- Продакшн-апгрейд: 14/50. Галереи STEEP/LOAF запущены в фон.

## Цикл — апгрейд 12/50 (FETCH, STEM в PRO)

- FETCH (pet box): idea → cine(ember) → gallery×3 → steps → cta. Палитра pro-fetch (амбер на тёмном).
- STEM (florist): idea → editorial → split(list) → quote → cta. Палитра pro-stem — СВЕТЛАЯ тема (sage на кремовом), первая светлая среди апгрейдов, для контраста. Hero — видео, поэтому белый текст поверх ок; контент dark-on-light.
- Обе выведены из BIZ, роуты 200.
- Продакшн-апгрейд: 12/50. Галереи THREAD/BARB запущены в фон.

## Цикл — апгрейд 10/50 (STRIDE, PLAT в PRO)

- STRIDE (бег): idea → split(деталь+list) → editorial(бег) → stats → cta. Палитра pro-stride (мятный акцент на тёмном).
- PLAT (tasting kitchen): idea → editorial(зал) → steps → gallery×2 → quote → cta. Палитра pro-plat (кремовый на тёмном).
- Обе выведены из BIZ в ProSite, роуты 200. Каждый сайт — уникальная последовательность блоков + палитра, не шаблон.
- Галереи для FETCH/STEM запущены в фон (6 стиллов): fetch-portrait/bowl/play, stem-bouquet/arrange/shop.
- Продакшн-апгрейд: ledger·iron·botanic·nib·swell·wick·cask·clay·stride·plat = 10/50.

# Visual Hooks — Autonomous Build Roadmap & Log

> Источник правды для автономного прогона. Цель: библиотека первых экранов / секций / фонов
> и полноценных сайтов **в разы лучше getlayers.ai + motionsites.ai**. Читать статус здесь.

## Режим
- **Автономно**, без остановок на сверку. Чекпойнты = записи в этом логе (секция «Прогресс»).
- **Генерация: активно** (Higs Bot 127.0.0.1:3210 через lib/ai/higs.ts; node22). Бот должен быть жив.
- **Гардрейлы:** НЕ коммитить в git, НЕ пушить, НЕ публиковать наружу, НЕ удалять ассеты юзера.
  Всё — только в рабочей копии. Спорные развороты эстетики — флажок в лог, не молча.
- Dev: `npx next dev -p 3011`; самопроверка — Playwright headless (`--use-angle=swiftshader` для WebGL).

## Рубрика самопроверки (каждая итерация)
1. Route 200, нет ошибок компиляции/консоли.
2. Скриншоты: 3 глубины скролла + мобилка (390px).
3. Анти-шаблон: структурно НЕ похоже на соседей (разные секции/механики/типографика).
4. Моушн реально играет; `prefers-reduced-motion` схлопывает.
5. Контраст CTA/текста (WCAG AA), фокус-состояния, 0 em-dash.
6. Perf: ленивое медиа, число WebGL-контекстов < 12/страницу, нет jank.
7. «Чем бьём аналоги»: вариативность · глубина (WebGL) · сюжет (splice-reveal) · продакшн-полировка.

## Фазы (roadmap)
- **A. Закалить 5 текущих:** мобильные bespoke-версии, a11y/reduced-motion, blur-up загрузка, perf, OG/favicon.
- **B. Библиотека анимированных фонов:** шейдерные градиенты/mesh, частицы, noise-flow, aurora, grain, dot-field, plasma — витрина `/visual-hooks/backgrounds`, copy-ready.
- **C. Библиотека анимированных секций:** kinetic-type, marquee, sticky-stack, horizontal-pan, bento, cursor-follow, reveal-grid, stat-counter — copy-ready.
- **D. Аудит остальных сцен витрины** (не-Interactive-Story, ~19 шт): что слабое → апгрейд или замена.
- **E. 50 новых продуманных сайтов** (hero + лендинг, каждый уникален; батчами по ~6-8).
- **F. WebGL Шаг 3 (орбитабельный 3D) + Tier-2 (smooth scroll, интро, звук) + мета-слой витрины.**

## Инвентарь механик (готово, переиспользуемо)
- `Prototype` — scroll-scrub + `--p`/`--a1..3`/`--mx`/`--my`, второй scrub2 (splice).
- `Reveal` (IntersectionObserver + scroll-fallback) — `vh-rv--up/--zoom/--mask`.
- `ShaderReveal` (WebGL) — жидкий reveal base→top, mode mix / raw-sharp.
- `ShaderImage` (WebGL) — hover-рипл + хром.аберрация + зум, render-on-demand.
- `DepthParallax` (WebGL) — depth-параллакс (только мягкая глубина). Depth-карты: nano ref-фото.
- Splice-видео (kling), particles (CSS), cursor-gaze, cursor-reveal.
- Уроки WebGL: `UNPACK_FLIP_Y_WEBGL` обязателен; overscan зумит внутрь; depth-blur против разрывов.

---

## КРЕАТИВНЫЙ ПРИНЦИП бизнес-сайтов (обязательно!)
Не документальные фото продукта, а **дизайнерская призма / сюрреал-концепт**. Продукт возвышается
через сильную визуальную идею: **игра масштабом** (гигантское лицо + продукт), **композитинг**
(вырез-объект на мечтательном фоне), **сторителлинг**, объединение слоёв. Референсы-вайб (motionsites):
летающие кроссовки в розовых облаках · огромное лицо девушки с духами · оверсайз-очки на лице ·
авто в сюрреал-ландшафте. Каждый hero = вау-идея, не «товар на полке». Мои 6 док-героев Батча 1
(кузня/винил/пловец…) — слишком буквальны; для ниш генерю КОНЦЕПТУАЛЬНЫХ героев заново.

## 50 сайтов — по БИЗНЕС-НИШАМ (закрываем ниши, полные версии hero+лендинг)
Цель: чтобы бизнес любой ниши нашёл готовый концепт под себя. Каждый — свой продукт, эстетика,
hero-механика, полный лендинг. Качество > скорость (не «приближение», а продуманная история).
Статус: ⬜ план · 🎨 ассеты · 🛠 строю · ✅ готово.

### Батч 1 (ассеты hero-видео генерятся)
1. 🎨 FORGE — bespoke ножи/клинки (крафт/инструмент) — тёмная кузня, искры — hero-видео ✓still.
2. 🎨 CANTO — hi-fi / винил (аудио-электроника) — тёплый аналог, латунь — hero-видео ✓still.
3. 🎨 TIDE — cold-water swim club (фитнес/лайфстайл) — teal-grey кино — hero-видео ✓still.
4. 🎨 ATLAS — экспедиционное снаряжение (одежда/gear) — ледник — hero-видео ✓still.
5. 🎨 SOL — солнечная энергия (энергетика/tech) — рассвет, панели — hero-видео ✓still.
6. 🎨 NOCT — natural wine (еда/напитки) — свеча, интим — hero-видео ✓still.

### Ниши для покрытия (батчи 2+, детализирую перед сборкой)
Недвижимость · Мода/одежда · Очки/eyewear · Авто · Часы · Ювелирка · Ресторан · Отель/резорт ·
Кроссовки/обувь · Парфюм · Скинкер/бьюти · Косметика · Мебель/интерьер · Архитектура ·
Фотостудия · Кофейня/ростер · Виски/спиртное · Fintech · Wellness/спа · Тревел · Tech/SaaS ·
Gaming · Агентство/брендинг · Велосипеды · Керамика · Флорист · Барбершоп · Йога/пилатес ·
Мед-спа/стоматология · Шоколад/кондитерка · Чай · Свечи · Канцелярия · Менсвир · Растения/сад ·
Музыкальный лейбл · Электрокар · Люкс-ритрит · Крафт-пивоварня.
_(Детализирую нишу непосредственно перед сборкой — чтобы не плодить шаблон, каждая уникальна.)_

---

## Прогресс (лог, новое сверху)
- **2026-07-30 · Фаза 2 · апгрейд 8/50** — **CASK** (idea→editorial-barrels→stats→gallery→quote→cta) и **CLAY** (light, idea→split→gallery-3→cta) через ProSite. Апгрейднуто: ledger·iron·botanic·nib·swell·wick·cask·clay. Генерятся галереи STRIDE/PLAT. Осталось ~42. Ритм устойчив: палитры+verify foreground, галереи next background отдельно.
- **2026-07-30 · Фаза 2 · апгрейд 6/50** — **SWELL** (caustics-cine водная тема: idea→cine→split→gallery→quote→cta) и **WICK** (steps-блок pour/cure/trim: idea→steps→split→gallery→cta) через ProSite, убраны из BIZ. Использованы новые блоки: caustics-cine, steps. Апгрейднуто: ledger·iron·botanic·nib·swell·wick. Генерятся галереи CASK/CLAY. Осталось ~44. NB: следующий раз route-verify SWELL/WICK (был в фоне).
- **2026-07-30 · Фаза 2 · апгрейд 4/50** — ProSite обкатан: **BOTANIC** (light, idea→split→editorial→stats→cta, БЕЗ cine) и **NIB** (idea→silk-cine→split→gallery→quote→cta) переписаны BIZ→ProSite. Разнообразие подтверждено: cine-палитры разные (nebula/ember/silk), наборы/порядок блоков разные у всех 4 (ledger/iron/botanic/nib) — не шаблон. Убраны из BIZ. Апгрейднуто: ledger, iron, botanic, nib. Дальше: SWELL/WICK (галереи генерятся) → ProSite-конфиги. Осталось ~46. Ритм: 2 сайта/итерация, галереи по 3 кадра, пейсинг ≤8.
- **2026-07-30 · Фаза 2 · ProSite-система** — Построена композиционная продакшн-система `ProSite` (в VisualHooksLab): блоки `.pb-*` (idea/cine-shader/split/gallery/stats/quote/steps/editorial/cta), тема через `.pro-<slug>` vars, конфиг `PRO[slug]`. Каждый сайт = УНИКАЛЬНАЯ последовательность блоков + палитра + ассеты (не шаблон: у IRON и LEDGER разный порядок/набор). **IRON** переписан BIZ→ProSite (idea → ember-cine → stats → offset-gallery(3) → quote → cta), проверено. **LEDGER** — bespoke-эталон. Апгрейднуто: 2/50 (ledger, iron). Дальше: генерю галереи по 2 сайта (пейсинг ≤8), собираю ProSite-конфиги с разными композициями. Галереи BOTANIC/NIB генерятся. Ассеты в `sites/g/`.
- **2026-07-30 · ФАЗА 2: продакшн-апгрейд (луп)** — Новая цель: все 50 → продакшн, КАЖДЫЙ уникален (35 BizSite-шаблонов переписать в bespoke), + идея/CTA/галерея/кинематографичные блоки. Бюджет фото ~500. Эталон готов: **LEDGER** переписан из шаблона в уникальный сайт: hero → idea → **cinematic shader-band** (`ShaderBg` nebula + кинетик-типографика «No points. No noise…») → feature-split (список, не карточки) → offset-галерея (ShaderImage hover) → stat-band → quote → CTA. Ассеты в `sites/g/`. Паттерн продакшн-блоков задан. Дальше: DEW/IRON (ассеты генерятся) → строю; потом остальные ~32. Пейсинг ≤8, генерю галереи по 3 кадра/сайт.
- **2026-07-30 · ЦЕЛЬ 50/50 ЗАКРЫТА** — batch8 → +7: INK(тату) · BOTANIC(джин,light) · MANE(салон) · SELVEDGE(деним) · DECK(скейт) · LATHER(мыло,light) · MALT(пивоварня). **50 бизнес-сайтов** живут, все в индексе `/visual-hooks/sites`, все роуты 200. malt перегенерён после саттурации. Видео 6 новых (ink/botanic/mane/selvedge/deck/lather) генерятся через vidgen; malt-видео — следующим (пейсинг). Навигация: `/visual-hooks` (гелерея сцен) · `/visual-hooks/sites` (50 бизнес-сайтов) · `/visual-hooks/backgrounds` (6 WebGL-фонов). Дальше по желанию юзера: озвучить остатки видео, полировка отдельных ниш, мобильный проход, Tier-2 (smooth-scroll/интро/звук), WebGL Шаг 3 (3D).
- **2026-07-30 · цикл 14** — Ретрай удался (бот освободился) → собрал 5: POUR(коктейль-бар) · STRIDE(бег) · CASK(виски) · GROVE(оливк.масло) · CURD(сыровар). **43 сайта**, все в индексе. Их видео через vidgen (даунскейл). Финальный batch8 (7 ниш → 50) НЕ запускаю пока видео идут (пейсинг, лимит 8). Как видео допекутся → batch8. 43/50.
- **2026-07-30 · цикл 13 — диагноз саттурации** — 5 стиллов batch7 (pour/stride/cask/grove/curd) реально НЕ сгенерились (в истории бота нет) — я перегрузил бота: параллельно шли kling-видео + стиллы, лимит 8 одновременных выбивал часть. Поллер зря искал (их не было). Урок: НЕ запускать стиллы+видео внахлёст, разводить по времени, держать <8 одновременных. Ретрай 5 стиллов запущен отдельно (бот расчистился). 38/50 + 5 в ретрае.
- **2026-07-30 · цикл 12 + ФИКС base64** — Юзер: ошибка «Image base64 6.6MB > 5MB» = лимит АПСТРИМ-API Higgsfield (не наш, не бота напрямую), всплывает когда 2K-стилл идёт startFrame'ом в kling. ФИКС: `scripts/.vidgen.ts` — универсальный video-gen, даунскейлит startFrame `sips -Z 1600` перед отправкой + промпты из `.vidgen.json`. Теперь ВСЕ видео через него. Урок: бот генерит АСИНХРОННО — если `higsGenerateImage` таймаутит, картинка всё равно допекается bot-side → НЕ регенерить, а тянуть из `/api/history` (поллер `.batch7-poll.ts`). batch7: wax/spine собраны (**38 сайтов**, в индексе), их видео через vidgen; pour/stride/cask/grove/curd допекаются → поллер дотянет → соберу. 38/50.
- **2026-07-30 · цикл 11** — batch6 → +5: CACAO(шоколад) · HIDE(кожа) · COMB(мёд) · SPICE(специи) · LENS(фотостудия). **36 сайтов**, в индексе. batch6-vid озвучивает. pour 2× не вышел → retry в batch7. Запустил batch7 (7: pour · stride/кроссовки · wax/винил-шоп · cask/виски · grove/оливк.масло · spine/книжный · curd/сыроварня). 36/50.
- **2026-07-30 · цикл 10** — batch5 разбудил → +6 сайтов: IRON(спортзал) · FETCH(питомцы,light) · NIB(канцелярия) · SWELL(сёрф) · WICK(свечи) · FERN(растения,light). ИТОГО **31 сайт**, все в индексе `/visual-hooks/sites`. batch5-vid генерит их видео. Запустил batch6 (cacao-retry/шоколад · pour/коктейль-бар · hide/кожа · comb/мёд · spice/специи · lens/фотостудия). 31/50.
- **2026-07-30 · цикл 9** — batch4 разбудил → +5 ниша-сайтов через BizSite: **BARB**(барбер) · **LOAF**(пекарня) · **THREAD**(менсвир) · **LEDGER**(fintech, card-in-space) · **BALM**(спа). ИТОГО **25 сайтов**. Построил **индекс-витрину** `/visual-hooks/sites` (`SitesIndex.tsx`) — сетка 4-в-ряд всех сайтов с hero-постером + ниша, hover-зум, ссылки на роуты. batch3-vid готов (plat/clay/velo/stem/steep на видео). batch4-vid генерит видео barb/loaf/thread/ledger/balm (правильно, разбудит). cacao 2× не вышел — отложен. Навигация: `/visual-hooks` (галерея сцен) · `/visual-hooks/sites` (25 бизнес-сайтов) · `/visual-hooks/backgrounds` (фоны). 25/50.
- **2026-07-30 · цикл 8** — batch3 разбудил → собрал 5 лёгких ниша-сайтов через общий каркас `BizSite` (data-driven, тема через `.bz-<slug>` палитру): **PLAT**(ресторан) · **CLAY**(керамика, light) · **VÉLO**(велосипед) · **STEM**(флорист, light) · **STEEP**(чай). ИТОГО **20 сайтов** (15 bespoke + 5 lean). Каркас `BizSite`: hero-video + statement + cta + footer, различие = палитра/hero/копирайт (для лёгких ниш ок; флагманы остаются bespoke). batch3-vid генерит видео для этих 5 (правильно). cacao-still не вышел → в batch4. Запустил batch4 (6: cacao + barb/барбер · loaf/пекарня · thread/менсвир · ledger/fintech · balm/спа) правильным трекингом. 20/50.
- **2026-07-30 · цикл 7 — ЛУП РАБОТАЕТ** — Завершение видео-генерации batch2 РАЗБУДИЛО меня (фикс подтверждён!). Собрал ещё 3 сайта: **DEW**(скинкер, soft-light) · **ROAST**(кофе, burnt-orange) · **LUME**(ювелирка, платина+радуга в космосе). ИТОГО **15 полных бизнес-сайтов**. vessel/haven/form апгрейднуты на живое видео. Запустил batch3 (6 свежих ниш: plat/ресторан · clay/керамика · velo/велосипед · cacao/шоколад · stem/флорист · steep/чай) ПРАВИЛЬНО (run_in_background без nohup) → завершение разбудит на сборку. Устойчивый луп: строю из банка → пускаю след. генерацию (трекинг) → просыпаюсь на завершении → строю. К 50: 15/50 + ~29 ниш в очереди.
- **2026-07-30 · цикл 6 + ФИКС МЕХАНИКИ** — Нашёл почему фон не будил: запускал генерацию через `nohup … &` → процесс отцеплялся, харнесс трекал лаунчер (мгновенно завершался), а реальная генерация шла untracked и НЕ слала уведомление. ФИКС: запускать скрипт напрямую `Bash(run_in_background:true)` БЕЗ `nohup`/`&` — тогда харнесс трекает сам процесс и будит по завершению. Проверяю на batch2-vid. Собрал ещё 3 сайта из стиллов (poster=still, src=будущее видео): **VESSEL**(мода, алый войд+драпировка) · **HAVEN**(курорт, тёплый light) · **FORM**(мебель, бетон-минимал). ИТОГО 12 полных бизнес-сайтов. 6 hero-видео batch2 генерятся правильно → разбудят на сборку dew/roast/lume + апгрейд vessel/haven/form на видео.
- **2026-07-30 · цикл 5** — Закрыл весь готовый видео-банк: **9 полных бизнес-сайтов** живут на роутах — forge · mono · phantom · horologe · tide · canto · atlas · noct · sol. Каждый: живое видео-hero + statement + своя фирменная секция (steps/split/stats) + CTA + футер, СВОЯ палитра/тип/сторителл (компоненты `*Site` + CSS namespace, ветки по slug). Все 200, проверено скриншотами. Никакого сна — строил подряд из банка. Запущен Батч-2 генерации: 6 свежих сюрреал-концепт-героев под новые ниши (vessel/мода · haven/курорт · dew/скинкер · roast/кофе · lume/ювелирка · form/мебель) → как догенерятся: видео + сборка. Осталось до 50: ~35 ниш. TODO позже: витрина-индекс всех сайтов, мобильная проверка новых, splice/scrub-механики для отдельных hero.
- **2026-07-30 · цикл 4** — Убрал idle-сон (юзер: ночью простаивал на таймерах вместо сборки; генерация-то отработала). Из банка готовых hero-видео собрал СРАЗУ 3 полных бизнес-сайта (+ FORGE ранее = 4): **MONO** (недвижка, light-airy, дом-на-зеркале) · **PHANTOM** (авто, dark-kinetic «NOTHING for miles», салончак) · **HOROLOGE** (часы, dark-gold, галактика-циферблат). Каждый — своя палитра/тип/структура/сторителл, ветки в default export по slug, CSS `.mono-*/.phan-*/.horo-*`. Проверено скриншотами — арт-дирекшн ок. Осталось в банке готовых видео: tide/canto/atlas/sol/noct → собираю их следующими. Механика: короткие 60с авто-продолжения (каждое = реальная сборка), НЕ idle-сон. Ограничение честно: работает пока сессия открыта.
- **2026-07-30 · цикл 3** — Доставлен ПЕРВЫЙ полный бизнес-сайт **FORGE** (bespoke ножи) на `/visual-hooks/forge`: живое видео-hero + statement + process (3 шага) + асимметричная галерея клинков (ShaderImage hover: дамаск / закалка в масле / шеф-нож) + цитата + CTA + футер. Проверено скриншотами. Роут = ветка в default export по slug (как backgrounds). Компонент ForgeSite + CSS `.frg-*` (молтен-акцент). Концепт-дубли `drift`(кроссовки-в-облаках)/`veu`(очки)/`sillage`(лицо+духи) ОТБРОШЕНЫ — дублируют существующие сцены (cloud-step/eyewear/macro-optics). Свежие концепты готовы: `mono`(недвижка/дом-на-зеркале), `phantom`(авто/солончак), `horologe`(часы/галактика) — их hero-видео генерятся (~15 мин). Next: собрать эти 3 как полные сайты (каждый со своей арт-дирекцией), затем Фаза C (секции) + новые свежие ниши. Self-check ~15 мин (реальное ожидание видео).
- **2026-07-30 · цикл 2b** — Планка фонов поднята (юзер: не «обосранные» градиенты, а крафт). `ShaderBg` переписан на 6 концептов: aurora (реальные шторы+звёзды), silk (иридесцент), nebula (ядра+звёзды), caustics (вода), ember (пламя), grid (ретровейв). Витрина обновлена, проверено — качество ок. Все 6 hero-видео Батча 1 готовы (бот тянет 6 параллельно). Бэклог 50 сайтов перестроен под БИЗНЕС-НИШИ (юзер: недвижка/одежда/очки/авто/часы… закрыть ниши, полные версии). Next: собрать FORGE (bespoke ножи) — первый полный бизнес-сайт из hero-видео, затем остальные Батча 1, параллельно Фаза C (секции).
- **2026-07-30 · цикл 2** — Фаза B стартовала: `ShaderBg.tsx` (WebGL-фон, 4 режима aurora/mesh/plasma/flow, палитра 3 цвета, рендер только когда виден, CSS-фолбэк) + `BackgroundsShowcase.tsx` + маршрут `/visual-hooks/backgrounds` (ветка в default export по slug). 8 живых фонов, проверено 8/8 канвасов, скриншот ок. Фаза E (ассеты): 6 hero-видео (forge/tide/canto/atlas/sol/noct) генерятся ПАРАЛЛЕЛЬНО (юзер: бот тянет 6 сразу). Следующий цикл: собрать первые новые сайты из готовых hero-видео (FORGE флагман) + расширить B (ещё стили) / начать C (секции). Self-check каждые ~15 мин.
- **2026-07-30 · цикл 1** — Роадмап создан, режим заведён. Фаза A: мобильный аудит 5 лендингов @390px — **overflow-x = 0 у всех**, сетки схлопываются в 1 колонку (Vigil worlds, ORBE eds), типографика/спейсинг ок. Лендинги мобильно-здоровы (breakpoints работают). Осталось по A: blur-up загрузка, OG/favicon, reduced-motion прогон WebGL. Запущен батч генерации `sites-heroes` (6 hero-стиллов: tide/forge/canto/atlas/sol/noct) в `public/uploads/1/hooks/sites/` — по завершении строю первые новые сайты (Фаза E interleaved). Следующий цикл: дождаться героев → собрать 2-3 сайта батча-1, параллельно Фаза B (первые процедурные фоны).
