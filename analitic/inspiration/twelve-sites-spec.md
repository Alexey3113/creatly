# 12 индивидуальных сайтов — анализ motionsites + спецификация

Дата: 29 июля 2026. Основано на архиве `analitic/motionsites/` (260 превью), `report.md` и разборе кадров.

## Анализ: из чего сделан «вау» motionsites

### A. Типографика — всегда разная, но по 5 приёмам
1. **Editorial serif italic display** — крупный курсивный serif как эмоция («*Every layer* tells a story», «FALL INTO REVERIE»). Часто первое слово курсивом, остальное grotesk.
2. **Ultra-bold condensed grotesk** — 2-4 слова колонкой, как бетон («DESIGN. DISRUPT. CONQUER.», «IN THE CLOUDS»). Текст = графическая масса.
3. **Split-treatment** — одно слово другим цветом/начертанием/слоем (акцент курсивом или неоном).
4. **Micro-mono UI** — вокруг гиганта мелкий моно-текст (nav, подписи, координаты) — контраст масштабов.
5. **Text ↔ object взаимодействие** — заголовок частично перекрыт объектом ИЛИ обрезан краем изображения ИЛИ залит текстурой (clip text).

### B. 3D-объект + фон — принцип «конфликт двух миров»
- **Вырезанный объект (cutout, прозрачный PNG) на контрастном фоне**: розовый кросовок на небе с розовыми облаками, продукт на градиенте. Объект и фон из разных вселенных — это и есть хук.
- **Объект сливается с ландшафтом**: каменная лента-строение, дом из облаков — объект = среда.
- **Объект выходит за кадр** (breaks frame): продукт обрезан верхом/краем, лента уходит в оба обреза.
- **Объект перекрывает типографику** (глубина: текст → объект → передний план).
- **Материальность**: мох, стекло, хром, ткань, камень, облако — тактильная фактура крупным планом.

### C. Кропы и маски — главный инструмент
1. **Object cutout mask** — предмет вырезан (`remove-background`), лежит слоем поверх отдельного фона; можно двигать параллаксом.
2. **Portal / circular mask** — `clip-path: circle()` в другой мир, растёт по скроллу в новый viewport.
3. **Cursor reveal mask** — `clip-path` следует за курсором, под ним второе состояние.
4. **Edge crop / bleed** — объект намеренно обрезан краем экрана (лента, продукт-макро).
5. **Foreground occlusion** — передний слой (облако, туман, размытие) прячет низ/границы объекта → глубина.
6. **Text clip** — `background-clip:text` заливает буквы изображением/видео.
7. **Split divider** — вертикальная маска день/ночь, до/после.

### D. Хореография
Один приём на экран: parallax слои (фон медленно, объект средне, курсор мгновенно) / scroll-scrub / portal-expand / cursor-reveal. Один слой всегда неподвижен ради читаемости.

---

## 12 сайтов — каждый индивидуален (свой объект, фон, типографика, кроп/маска, механика)

| # | slug | Бренд/тема | Типографика | Фон | Объект + кроп/маска | Механика | Палитра |
|---|---|---|---|---|---|---|---|
| 1 | `cloud-step` | AFTERSHOCK / кроссовки | Ultra-bold grotesk «IN THE CLOUDS», буквы за облаками | небо + розовые облака (градиент) | розовый кросовок **cutout**, парит; передний облачный слой прячет низ | parallax + курсор-тилт | небесно-голубой/розовый |
| 2 | `strata` | EASYLOG / data | serif-italic «*Every layer*» + grotesk | чистое голубое небо | каменно-моховая лента через весь экран, **bleed в оба края** | cursor-reveal внутренних слоёв | небо/камень/лайм-CTA |
| 3 | `reverie` | миф/портал | serif «FALL INTO REVERIE» разрядка | тёмный лес-фэнтези | **circular portal mask** в другой мир, растёт на скролле | portal-expand scrub | аметист/изумруд |
| 4 | `vanguard` | студия | ultra-bold «DESIGN. DISRUPT. CONQUER.» колонкой | плоский красный | 3D-персонажи **cutout** стоят ЗА типографикой | hover parallax фигур | красный/чёрный/кремовый |
| 5 | `aether` | недвижимость | тонкий serif, много воздуха | фиолетовый туман/облака | архитектурный монолит **выплывает из тумана**, foreground-fog | fog-parallax + glass-CTA | лаванда/сирень |
| 6 | `botanica` | organic tech | grotesk + подпись | тёплая бумага | органический объект (мох/стекло) + огромная **жёсткая тень** как графика | курсор двигает свет/тень | песок/зелень |
| 7 | `neon-forge` | dark techno | kinetic mono, разрядка | тёмный неон-грид, сканлайны | стеклянно-хромовый объект **собирается** | scroll-scrub сборки | графит/циан |
| 8 | `macro-optics` | eyewear | grotesk, обрезан краем | тёмный градиент | продукт **макро, breaks top edge**, свет-свип | light-sweep + tilt | уголь/тёплый блик |
| 9 | `liquid-word` | бренд-word | сам бренд = 3D жидкий металл | мягкий градиент | 3D-рендер СЛОВА как объект **cutout** | морф/вращение по скроллу | хром/пастель |
| 10 | `orbit-data` | habits/SaaS | grotesk + гигантские цифры | светлый | стилизованная **планета-cutout**, крупные stat-числа | rotation scrub + counter | белый/син/земля |
| 11 | `atelier-hand` | fashion | serif editorial | тёплый студийный | **рука/модель cutout** подаёт предмет ближе камеры (OYLA) | reveal-доказательство скролл | тёплый нюд |
| 12 | `fold-horizon` | expedition | serif + координаты моно | огромный ландшафт | **фигура-cutout для масштаба**, пейзаж складывается | parallax-fold | сталь/небо |

## Пайплайн генерации (через Higs Bot)
Для каждой сцены: **фон** (soul-cinematic / nano / soul-location) + **объект** (nano/soul) → `remove-background` для cutout → композиция масками/слоями в CSS. Некоторые фоны — видео (kling) для параллакса. Сборка: каждая сцена = отдельный компонент + свой CSS-namespace + своя типографика (никакого переиспользования визуального языка).

Собираем батчами по 3-4: сначала ассеты, потом бесток-сцены.

---

## Анализ шапок и блоков текста motionsites (2-й проход) + переработка

**Шапки — 7 архетипов:** (1) full-nav [logo·nav·CTA], (2) minimal-mark [лого + один счётчик], (3) editorial-split [wordmark + список услуг справа, без CTA], (4) context-line [«Based in Berlin 12:50 PM» + Menu/Book], (5) back+single-action, (6) no-chrome [только контент], (7) centered-wordmark.

**Текст — 7 архетипов:** (1) centered-stack, (2) bottom-left anchor, (3) left-over-object, (4) corner-distributed + feature-cards, (5) editorial-split, (6) minimal-monogram, (7) overload/dense.

**Распределение на наши сцены (никаких повторов):**
| Сцена | Шапка | Текст | Настроение |
|---|---|---|---|
| living-object | context-line (город+время) | bottom-left | тихая роскошь |
| cloud-step | full-nav + bag + price-card | centered + product-card | стритвир e-com |
| strata | editorial-split (nav-список) | bottom-left paragraph + 01/04 | editorial-data |
| reverie | centered-wordmark (без nav) | centered-minimal | кинематограф |
| vanguard | overload full-nav + ticker | left + stats | максимал/дерзость |
| aether | minimal corner (nav top-right) | centered + угловые лейблы | минимал-люкс |
| botanica | editorial + vertical side-label | left + numbered-list | organic-editorial |
| neon-forge | HUD (status center, brackets) | centered + метрик-колонка | техно-overload |
| macro-optics | e-com minimal (cart+price) | bottom-left + product-card | продукт-страница |
| liquid-word | studio split (®-mark) | centered-object + ©-углы | минимал-studio |
| orbit-data | SaaS full-nav + 2 CTA + badges | left number + stats | data-dense |
| atelier-hand | fashion centered-wordmark | bottom-left serif + N°/дата | fashion-editorial |
| fold-horizon | journal context-line (координаты) | left + coord-угол + chapter | экспедиция |

---

## Фаза 3: вау-переходы, reveal, scroll-tracking (2026-07-29)

Механики: **scrub** (scroll→video.currentTime; многоактные истории = concat kling-сегментов start→end→end2) · **cursor-reveal** (clip-path по курсору, 2 состояния) · **scroll-gaze** (kling-видео взгляда/поворота, проигрывается скрабом).

Референсы (архив motionsites/media): bl.webp (Bloom★), deep-neural-interface.mp4, apex-pulse.webp, scroll-landing.webp, vision-reveal.mp4, mythic-vpn.mp4, imperial-vpn.mp4, neon-logic.webp, 3d-jack-portfolio.mp4. Фоны пользователя: additional/1-4.png.

**5 вау-историй (scrub):** bloom-flagship (кибер-ботаника, распускается+глаза) · held-world (add-4 ладонь+мир) · monolith-dawn (add-3) · planet-vigil (add-1) · ascension (add-2 туман).
**3 reveal (cursor):** vision-particin · mythic-day-night · imperial-xray.
**3 scroll-gaze:** xportfolio-gaze · neon-logic-turn · gaze-portrait.

Плюс: секции ниже hero (foreground/parallax/анимации), user-story где нужно.
