# Animated 3D-parallax concept sites — план и анализ

Задача владельца: ~23 уникальных концепт-сайта, каждый на основе Pinterest-пина (арт-дирекшен hero), с полноценным animated-3D-parallax: ВСЕ элементы отдельными DOM-слоями (текст не впечён в фото), foreground-параллакс, reveal текста, вылетающие карточки, crop-mask бесшовность, декор-блобы, вырезанные объекты (remove-bg), смена/наложение фото, перетекание сцен. Пока фото (закладываем оживление видео позже).

Пины выгружены: `analitic/pins/<name>.jpg` (og:image, 736x — только как арт-референс; свои картинки генерим через Higs/nanobanana). Анимационные референсы: `analitic/pins/ref-*.jpg`.

Архитектура движка — `scratchpad/codex-arch-out.md` (codex). Порядок на 1 сайт: пин → анализ (структура/стиль/арт-дирекшен/слои) → генерация раздельных слоёв → сборка → проверка скриншотами (mouse.wheel!).

## Список концептов (23)
| # | slug | концепт | статус |
|---|------|---------|--------|
| 01 | clothing | одежда «your style» | ГОТОВ ✓ полный сайт (эталон) |
| 02 | skydive «SKYFALL» | прыжки с парашютом | HERO+ядро ✓ (портал+падение, teal-grey) |
| 03 | escort | сопровождение | |
| 04 | skisnow | лыжи/сноуборд + аренда/прокат | |
| 05 | vinyl | клуб винила (общение + прослушивание) | |
| 06 | ecology | экология / выращивание деревьев | |
| 07 | anime | просмотр аниме + мерч | |
| 08 | notredame | приглашение в Нотр-Дам, искусство | |
| 09 | porsche911 | продажа/тест-драйв 911 | анализ ✓ |
| 10 | cardealer | автосалон, тест-драйв | |
| 11 | djconcert | диджей-концерт, 3д-божество (огонь/свет/тьма) | анализ ✓ |
| 12 | bmw | продажа BMW | |
| 13 | photographer | выездной фотограф | |
| 14 | womensuit | женские костюмы/блузки | |
| 15 | hoodie | уникальные толстовки + украшения | |
| 16 | jptattoo | японские татуировки | |
| 17 | dance | студия танцев/хореографии | |
| 18 | jprestaurant | ресторан в японском стиле | |
| 19 | jpclub | ночной клуб японский, жёсткий движ | |
| 20 | folkmusic | концерт русско-народной музыки | |
| 21 | redsuit | красные премиум мужские костюмы | |
| 22 | rockband | концерт рок-группы | |
| 23 | freestyle | «прикольный стиль» — на своё усмотрение | |

## Анимационные референсы (как строить движение)
- ref-scenes (492649952502712): элементы работают по отдельности, перетекают сцена→сцена; фон из 3 составных частей + альфа-вырезка (напр. зелёного) + объект — всё анимируется одновременно.
- ref-clothswap: смена одежды при скролле + фон.
- ref-bgorbit: фон на весь сайт, вокруг анимируются объекты + перетекания.
- ref-startend: start-to-end, из сцены в сцену, текст подлетает в логических точках.
- ref-sideobj: живые объекты по бокам уезжают, сцены приезжают сбоку, новые объекты появляются.
- ref-blurbg: живой фон → блюр на него → переход в другой концепт.
- ref-diagonal: перетекание между сценами по вертикали под углом (все объекты анимируются).
- ref-parallax: параллакс-эффект.

## Концепт 01 — CLOTHING «your style» (флагман, строим первым)
**Арт-дирекшен (пин):** editorial fashion. Перивитово-лавандовый (#8b93d6-ish) glass/ribbed фон с рефракцией. Модель (девушка в белом, очки) раскрыта ВНУТРИ маски-МОЛНИИ (clip-path bolt) — окно в фигуру. Зеркальная типографика «your» (крупный serif, лавандовый) + «style» (italic serif) в верх-лево и низ-право (повёрнуто). Угловые mono-caps: «2024», «MADE BY ALEVTYNA», индекс «01». Стеклянная рефракция за молнией.

**Палитра:** перивинкл/лавандовый фон, белый (модель+текст), лавандово-фиолетовый акцент типографики. Светлая, холодная, premium-fashion.

**Hero-приём (сигнатура):** crop-mask «lightning bolt» — модель видна только внутри молнии; вокруг — glass-фон. Молния параллаксит, за ней рефракция, текст «your/style» подлетает зеркально.

**Слои для анимации (генерим раздельно):**
1. bg-far: перивинкл glass-фон с ribbed-рефракцией (без субъекта, без текста).
2. subject: модель в белом на нейтральном → remove-bg → кладём в clip-path молнии.
3. glass-refraction: полупрозрачный слой стекла/хроматики (декор, множится/сдвигается).
4. text-layers: «your», «style» ×2 (DOM, serif) — подлетают.
5. corner-labels: mono-метки «2024 / MADE BY ALEVTYNA / 01 / SS·2024».
6. decor: тонкие линии, ✦, угловые блобы лавандового свечения.

**Секции ниже (в той же стилистике):** hero(bolt) → манифест «your style» (крупная типо, glass) → коллекция (карточки-луки, вылетают сбоку, crop-mask) → about студии → lookbook (горизонтальный/перетекание) → отзывы → CTA запись/покупка → футер. Мотив-декор: молнии/стекло/лавандовое свечение по углам, зеркальная типографика, mono-индексы секций.

## Движок собран (эталон на clothing)
- `components/parallax-scene/` — ParallaxScene + Layer + SceneMedia + SceneTitle/LineReveal + переходы (crossfade/diagonal/curtain). Вся хореография на CSS-var (--sp скролл, --px/--py сглаженный курсор, --lp per-layer). Любой <img> позже → <video> без правки Layer.
- Слои: z 0-20 (site-bg/bg-far/bg-mid/cutout/text-back/subject/text-front/foreground/decor-blobs/ui/transition/nav). Формула: from→to по --lp + курсор×depth.
- Роут: /visual-hooks/<slug> (switch в VisualHooksLab). Первый: /visual-hooks/clothing.
- Генерация слоёв: scripts/.anim-<slug>.ts → public/uploads/1/hooks/sites/anim/<slug>/ (bg + model + decor + *-cut.png через higsRemoveBackground). Промпты: «environment only / no text / neutral bg для вырезки». Матрица уникальности 23 сайтов — в codex-arch-out.md разделе C.
- ПРОВЕРКА: только mouse.wheel (headless scrollTo не шлёт scroll-событие → --sp не растёт).
- ДАЛЬШЕ: достроить clothing (manifest→коллекция карточки-вылет→lookbook перетекание→about→отзывы→CTA→футер), затем концепты 02..23 по матрице.

## Прогресс сайтов
- ФАЗА 2 (полные секции): **bmw «M·WERK» — ПОЛНЫЙ САЙТ ✓** (hero + 01 engineered + 02 engineering галерея-грид g1..g5 (колесо-суппорт/трек/кокпит/карбон/диффузор, cyan-bordered карточки на blueprint) + 03 the numbers спек-строки (510PS/3.5s/290/3.0L/1725kg, cyan-юниты) + From the driver's seat 3 testimonials на cyan-rules + Feel the redline CTA + footer; carbon+electric-blue #2ea6ff, Bricolage+DM Mono, /visual-hooks/bmw). Девятый полный.
- ФАЗА 2 (полные секции): **dj «SERAPH» — ПОЛНЫЙ САЙТ ✓** (hero + 01 the show + 02 the nights галерея-грид g1..g5 (толпа/декки/pyro/лазеры/deity, orange-bordered карточки Bricolage) + 03 the descent tour даты-строки (город/venue/TICKETS/sold out) + Witnesses 3 testimonials Playfair-italic на orange-rules + CTA + footer; near-black+fire-orange #ff5a1e, Bricolage+Playfair+DM Mono, /visual-hooks/dj). Восьмой полный.
- ФАЗА 2 (полные секции): **skydive «SKYFALL» — ПОЛНЫЙ ✓** (02 the fall галерея teal-misty g1..g5 + 03 how you jump уровни Tandem/AFF/Fun + From the door testimonials; teal-grey, Space Grotesk, /visual-hooks/skydive). Десятый.
- ФАЗА 2 (полные секции): **vinyl «AFTER HOURS» — ПОЛНЫЙ ✓** (02 after hours галерея sepia g1..g5 + 03 the club listening/selectors/backroom + Regulars testimonials Playfair-italic; sepia-amber #b8452f, Pirata One+Playfair, /visual-hooks/vinyl). Одиннадцатый.
- ФАЗА 2 (полные секции): **redsuit «SANGUINE» — ПОЛНЫЙ ✓** (02 the looks галерея crimson g1..g5 + 03 the cut процесс + Worn in the room testimonials класс .rd-review НЕ .rd-quote; crimson #cf3341, Playfair/Pirata, /visual-hooks/redsuit). Двенадцатый.
- ⚠️ Higs 2K-upscale начал ПАДАТЬ server-side («Таймаут ожидания результата») → в gallery-скриптах использовать **quality:"1k"** (нативно, без upscale-шага; для карточек качества хватает). redsuit собрался на 1k.
- ФАЗА 2 (полные секции): **jptattoo «HORI» — ПОЛНЫЙ ✓** (02 the work галерея sumi+cream-карточки g1..g5 (背/龍/具 кандзи) + 03 the way процесс 一/二/三 на mustard + On skin testimonials класс .jt-review; mustard/red/sumi #d42a1e, Bricolage+Noto Sans JP, /visual-hooks/jptattoo). Тринадцатый.
- ФАЗА 2 (полные секции): **jpclub «YORU 夜» — ПОЛНЫЙ ✓** (02 the floor галерея pink-карточки g1..g5 (床/踊/酒/音/路) + 03 夜 the nights афиша (客/皿/朝, LIST-кнопки) + On the floor testimonials .jc-review Bricolage-caps; hot-pink-black #ff3d7f, Bricolage+Noto, /visual-hooks/jpclub). Четырнадцатый.
- ⚠️ Higs флакует и на 1k (async-job таймаут server-side); ЛЕЧИТСЯ повторным запуском — упавшие в batch до-генерируются меньшими партиями (файлы skip). jpclub собрался за 3 захода.
- ФАЗА 2 (полные секции): **porsche — ПОЛНЫЙ ✓** (03 the machine галерея magenta g1..g5 + 04 heritage 3 пункта + From the road testimonials .pr-review Playfair-italic; кино-магента #e85a9c, Bricolage+Playfair, /visual-hooks/porsche). Пятнадцатый.
- ФАЗА 2 (полные секции): **anime «BLOOM+» — ПОЛНЫЙ ✓** (02 this season галерея cel-shaded g1..g5 (桜/翔/咲/祭, white-карточки на cream) + 03 in this issue magazine-TOC на plum + Reader mail testimonials .am-review; cream-pink #e0326e СВЕТЛЫЙ фон, Bricolage+Noto+Playfair, /visual-hooks/anime). Шестнадцатый. NB: nano-banana отлично делает anime cel-shaded.
- ФАЗА 2 (полные секции): **notredame — ПОЛНЫЙ ✓** (02 the cathedral галерея indigo/gold g1..g5 + 03 plan your visit расписание + Voices testimonials .nd-review Playfair-italic; indigo/gold #cba24a/#6c86d8, Playfair+Bricolage, /visual-hooks/notredame). Семнадцатый.
- ФАЗА 2 (полные секции): **ecology «VERDA» — ПОЛНЫЙ ✓** (03 what we protect галерея sage lowercase g1..g5 + 04 the impact метрики 2.4m/30yr/94% + from the ground testimonials .ec-review; sage-green #7dae62, Manrope lowercase, /visual-hooks/ecology). Восемнадцатый.
- ФАЗА 2 (полные секции): **skisnow «TŌJI» — ПОЛНЫЙ ✓** (02 the slopes галерея cobalt/cream white-карточки g1..g5 + 03 rentals прайс-строки на cobalt + On the mountain testimonials .sk-review; cobalt+cream #1f3fd6, Bricolage+Noto, /visual-hooks/skisnow). Девятнадцатый.
- ФАЗА 2 (полные секции): **cardealer «CONCOURS» — ПОЛНЫЙ ✓** (02 the detail галерея navy/amber g1..g5 + 03 what we do sourcing/restoration/sales + From the owners testimonials .cd-review; navy+chrome+amber #e2ac54, Space Grotesk, /visual-hooks/cardealer). Двадцатый.
- ФАЗА 2 (полные секции): **hoodie «BLOKK» — ПОЛНЫЙ ✓** (02 the lookbook галерея concrete/yellow g1..g5 + 03 the spec (500gsm/boxy/300 numbered/never) + Cop confirmed testimonials .hd-review @handles; concrete+safety-yellow+black #e8e200, Bricolage, /visual-hooks/hoodie). Двадцать первый.
- ✅✅✅ **ВСЕ 23 КОНЦЕПТА — ПОЛНЫЕ САЙТЫ (clothing-уровень)**. Каждый: hero (свой уникальный animated-3D-parallax приём) + галерея-грид (5 фото g1..g5 в стиле концепта, стаггер-карточки) + процесс/афиша/расписание/спеки (3 пункта или строки) + 2-3 testimonials + CTA + footer. Своя палитра/типо-персона/приём у каждого. Роуты /visual-hooks/<slug>.
- ФАЗА 2 (полные секции): **freestyle «SESSION» — ПОЛНЫЙ ✓** (02 the clips галерея near-black+red/cyan chromatic g1..g5 + 03 where we roll споты/сессии + The word testimonials .fs-review cyan-handles; #ff2b4d/#12dede, Bricolage skew, /visual-hooks/freestyle). Двадцать третий — ФИНАЛ.
- ФАЗА 2 (полные секции): **dance «KINET» — ПОЛНЫЙ ✓** (02 the floor галерея charcoal/lime g1..g5 (лайм-ленты в кадрах!) + 03 the timetable расписание классов + From the back row testimonials .dn-review; charcoal+lime #c6f000, Bricolage, /visual-hooks/dance). Двадцать второй.
- 🏁 ФАЗА 2 ИТОГ: **22 ПОЛНЫХ САЙТА**. Осталось: freestyle (1, последний! — паттерн, quality:"1k", префикс fs-, near-black+red/cyan). (clothing, photographer, folkmusic, womensuit, jprestaurant, rockband, escort) — каждый hero + галерея-грид (5 фото g1..g5 в стиле концепта) + процесс/услуги/афиша (3-пункта или строки) + 3 testimonials + CTA + footer. Паттерн секций: CSS `columns`+`break-inside:avoid` стаггер-грид, карточки `img` в `div` с rotate; заголовки шрифтом концепта; отдельная секц-палитра. Остальные 16 — hero+ядро (можно добить так же). ВНИМАНИЕ автодополнение иногда вставляет мусор в hex/имена («martingale»/«Control») — писать чистые значения.
- ФАЗА 2 (полные секции): **escort «ÉCLAT» — ПОЛНЫЙ САЙТ ✓** (hero + 01 the service + 02 the occasions галерея-грид g1..g5 (гала/ужин/опера/тост/подъезд, gradient-overlay карточки, Marcellus-подписи) + 03 how it works 3 шага (apply/meet/attend) + In confidence 3 tasteful testimonials «A client» + CTA + footer; emerald+gold+noir, Marcellus+DM Mono, тактично/SFW, /visual-hooks/escort). Седьмой полный.
- ФАЗА 2 (полные секции): **rockband «FERAL» — ПОЛНЫЙ САЙТ ✓** (hero + 01 the band + 02 the live галерея-грид g1..g5 (толпа/соло/kit/craudsurf/encore, red-bordered карточки, Anton skew) + 03 aftermath tour даты-строки (город Anton/площадка/TICKETS-кнопки/sold out) + The noise back 3 testimonials Anton-caps на red-rules + Get in the pit CTA + footer; near-black+bone+electric-red, Anton+DM Mono, /visual-hooks/rockband). Шестой полный.
- ФАЗА 2 (полные секции): **jprestaurant «結 YUI» — ПОЛНЫЙ САЙТ ✓** (hero + 01 omakase + 02 the courses お品書き галерея-грид g1..g5 (нигири/сашими/炙り-торч/сакэ/席-сеттинг, washi-карточки, vermilion-кандзи подписи) + 03 一期一会 опыт 3 пункта (一/二/三) + Guests 3 testimonials на sumi + Reservations CTA + footer; sumi+washi+vermilion, Shippori Mincho+Noto Sans JP+DM Mono, /visual-hooks/jprestaurant). Пятый полный.
- ФАЗА 2 (полные секции): **womensuit «SÉVERINE» — ПОЛНЫЙ САЙТ ✓** (hero + 01 the house + 02 the lookbook грид g1..g5 (ivory-костюм/chalk&pins/плечо/рейл/ткани, cream-карточки) + 03 bespoke процесс 3 шага (measure/cloth/fittings) на plum + In their words 3 testimonials на тёмном + CTA + footer; plum+blush+ivory, Cormorant+DM Mono, /visual-hooks/womensuit). Четвёртый полный.
- ФАЗА 2 (полные секции): **folkmusic «ЗОРЯ» — ПОЛНЫЙ САЙТ ✓** (hero + 01 ансамбль + 02 живьём галерея-грид g1..g5 (ансамбль/гусли/певица/жалейка/хоровод, cream-карточки с золотой рамкой) + Голоса зала 3 testimonials на claret-фоне + 03 Афиша концерты-строки (даты/залы/статус) + CTA + footer; claret+gold+linen, Playfair+DM Mono, /visual-hooks/folkmusic). Третий полный.
- ФАЗА 2 (полные секции): **photographer «NORTHLIGHT» — ПОЛНЫЙ САЙТ ✓** (hero + 01 Selected work стаггер-грид полароидов g1..g6 golden-hour + 02 The approach + 03 What I shoot услуги 2-кол + Words from clients 3 testimonials + Sessions CTA + footer; bone+graphite+burnt-orange, Space Grotesk+DM Mono, /visual-hooks/photographer). Грид = CSS columns + break-inside:avoid, карточки rotate + hover-выпрямление. Второй «полный» после clothing.
- ✅ ВСЕ 23 БАЗОВЫХ КОНЦЕПТА ГОТОВЫ (hero + ядро manifest/CTA/footer, каждый — своя палитра/типо-персона/hero-приём/мотив, все слои раздельные, окклюзия/flying-cards/parallax). Роуты /visual-hooks/<slug>. Следующая фаза: добить лучшие полными секциями clothing-уровня (about/examples/testimonials/locations-галереи).
  Список приёмов (23): type-occlusion, portal, disc, held-world, cover, sliced-strips, manga-zine, swiss-grid, graphic-sun, spec-dashboard, motion-trail, kokoshnik-arch, brutalist-gig-poster, viewfinder-contactsheet, vertical-wordmark, kinetic-ticker, spotlight-cone, mirror-floor, enso-negativespace, RGB-split/chromatic (+ portal-круг skydive, held-disc vinyl).
- 23/freestyle «SESSION» — hero+ядро ✓ (фристайл-скейт, near-black+red/cyan, ПРИЁМ RGB-split/chromatic: красная+циан копии скейтера со смещением (mix-blend screen) + chromatic text-shadow на skew-титуле SESSION + скан-линии, ночная скейт-плаза, Bricolage 800 skew, /visual-hooks/freestyle). Отличие от dance (монохром motion-trail) — тут цветной глитч.
- 22/jprestaurant «結 YUI» — hero+ядро ✓ (ПРАВИЛЬНЫЙ омакасе, не аниме; sumi+washi+vermilion-hanko, ПРИЁМ negative-space минимализм + brush-enso (SVG-дуга) + вертикальный tategaki-титул 結 (Shippori Mincho) + hero-dish flying card нигири + красная ханко-печать, итамаэ за hinoki-стойкой, /visual-hooks/jprestaurant). ВАЖНЫЙ УРОК движка: subject с phase [0.05,0.95] НЕ достигает opacity 1 до crossfade-out (start 0.86) → над светлым фоном читается полупрозрачным; лечится коротким phase (конец ~0.44), тогда субъект плотный в resting-виде. Скрин делать при sp≈0.6-0.64 (до crossfade 0.86).
- 21/cardealer «CONCOURS» — hero+ядро ✓ (heritage classic-car дилер, navy+chrome+amber, ПРИЁМ mirror-floor reflection (машина-вырезка E-Type + faded scaleY(-1) отражение на глянце) + chrome-nameplate титул (silver-градиент = хром-бейдж, НЕ AI-tell, интенционально), amber-спот-шоурум, spec-каллауты, /visual-hooks/cardealer). Отличие от bmw (cyan spec-dashboard) и porsche (magenta theatre). Отражение субтильное — машина «парит» над титулом, рефлекс на полу ниже как атмосфера.
- 20/escort «ÉCLAT» — hero+ядро ✓ (ТАКТИЧНЫЙ SFW premium companionship/plus-one concierge для гала/ужинов, БЕЗ сексуализации, достойно; emerald+gold+noir, ПРИЁМ spotlight-cone (конус света clip-path + floor-pool) на фигуре в вечернем платье, gold city-bokeh орбы (flying blobs), титул ÉCLAT Marcellus за фигурой, велюр-лаунж, /visual-hooks/escort).
- 19/hoodie «BLOKK» — hero+ядро ✓ (стритвир-дроп, concrete-grey+safety-yellow+black, ПРИЁМ kinetic-ticker: 2 marquee-полосы (CSS-автоскролл, встречные, rotate -3deg как каутион-тейп) за моделью hood-up (окклюзия текста телом), летящий гармент, yellow hangtag DROP 04, Bricolage 800, /visual-hooks/hoodie). Тикер = plain absolute div (не Layer) чтобы marquee-анимация не конфликтовала с transform слоя.
- 18/womensuit «SÉVERINE» — hero+ядро ✓ (премиум женский тейлоринг, plum/aubergine+blush+ivory, ПРИЁМ вертикальный maison-wordmark (Cormorant Garamond writing-mode vertical-rl, БЕЗ rotate, размер ≤112px чтобы влезал в 100vh) + 2 fabric-swatch flying cards + модель на световом шафте архитектурного plum-зала, italic-лид справа, /visual-hooks/womensuit). NB: вертикальный текст не увеличивать — клипается sticky-вьюпортом.
- 17/photographer «NORTHLIGHT» — hero+ядро ✓ (выездной фотограф, bone+graphite+burnt-orange #d9611f, ПРИЁМ film contact-sheet + viewfinder: 3 летящих кадра-полароида с подписями (flying cards, rotate), viewfinder-скобки в углах, REC+EXIF mono-детали, фотограф-вырезка справа, заголовок Space Grotesk слева, golden-hour луг, /visual-hooks/photographer). Полароид-карточки = div-обёртка с img width:100% (обходит object-fit issue). Один из сильнейших.
- 16/rockband «FERAL» — hero+ядро ✓ (панк-постер: чёрное+кость+электрик-ред #e5231b, ПРИЁМ brutalist gig-poster/torn-stub, гигантский Anton-титул FERAL (R красная) за фронтменом-скримером, летящая гитара (rotate flying card), рваный стаб-билет, halftone-точки, /visual-hooks/rockband). Слои раздельно, окклюзия фронтмена поверх титула. NB: Layer.rotate = строка "22deg", не число.
- 15/folkmusic «ЗОРЯ» — hero+ядро ✓ (русь-фолк: кларет+золото+лён, ПРИЁМ gold ogee kokoshnik-арка = портал, хохлома-завитки в 2 углах = decor-blobs, певица в сарафане+кокошнике поверх золотого Playfair-титула ЗОРЯ, спот-изба при свечах, /visual-hooks/folkmusic). Слои: bg/арка-портал/2 орнамента/титул/певица — все раздельно. Своя арт-дирекция (пин не резолвил).
- 17 dance «KINET» — hero+ядро ✓ (монохром charcoal + лайм #c6f000, motion-trail: 2 эхо-силуэта + чёткий танцор поверх кинетик-титула MOVE, спот-студия, Bricolage/DM Mono, /visual-hooks/dance). NB: пин dance отдал аниме-пинап → построил свою арт-дирекцию (движение/эхо). ФИКС движка: у `.ps-media` `height:100%` не резолвится в grid-слое → `object-fit:contain` не работает для высоких портретов (вырезка рисуется 2671px и уходит под фолд); лечится размером по ширине `.dn-dancer/.dn-echo .ps-media{width:52vw;height:auto}`. Учесть для будущих портретных вырезок.
- 01 clothing — ГОТОВ полный сайт (перивинкл glass, /visual-hooks/clothing).
- 07 anime «BLOOM+» — hero+ядро ✓ (cream-pink collectible cover, гигантский титул за персонажем + editorial-колонки + вертикальный JP 桜の意志 + штрихкод, /visual-hooks/anime). NB: пин jprestaurant отдал аниме-обложку (Pinterest резолв) → построил ANIME; jprestaurant добить с правильным фото позже.
- 04 porsche 911 — hero+ядро ✓ (тёмный магента, «911» за машиной + сакура-fg, Bricolage, /visual-hooks/porsche). ФИКС ✓: дубль-машина перегенерирована одиночной («EXACTLY ONE, no duplicate»). Чисто.
- 03 vinyl «AFTER HOURS» — hero+ядро ✓ (sepia after-hours, вращающийся винил + блэклеттер Pirata One, /visual-hooks/vinyl). ПОЛИШ: вырез руки с прямоуг. ореолом (маска/регенерация).
- 02 skydive «SKYFALL» — hero + manifest/CTA/footer ✓, фигура увеличена+glow (teal-grey сюрреал, портал-круг с перевёрнутыми горами через scaleY(-1), пики-foreground band с mask, разрежённый Space Grotesk, /visual-hooks/skydive). ПОЛИШ: падающая фигура почти не видна (увеличить/добавить glow); достроить секции (locations «в разных местах» — нужны фото мест: alps/coast/desert; training; отзывы).
- Паттерн подтверждён: 1 концепт-сайт = отдельный компонент components/concept-sites/<Name>Site.tsx + <name>.css, слои в anim/<slug>/, роут в switch VisualHooksLab. Уникальность: своя палитра/типо-персона/hero-приём/мотив (clothing=перивинкл+Playfair+bolt; skydive=teal-grey+Space Grotesk+портал-круг).
- ДАЛЬШЕ по матрице: 03 escort, 04 skisnow, 05 vinyl (central disc/grooves), 06 ecology (held-world/листья), 09 porsche911 (low-angle theatre, floral fg), 11 djconcert (macro portrait/fallen angel), 18 jprestaurant (vertical editorial/ink) и т.д.

## Poster-уровень: 4 концепта доведены до пина (hero + секции)
Приём «poster recipe» применён к 4 концептам — каждый теперь цельный сверху донизу:
- **folkmusic «ЗОРЯ»** — холодный editorial-постер (paper #d8d6cf / ink #151410 / red #b32e1e). Секции: grayscale-галерея на прохладной бумаге, ink-блок отзывов, ink-CTA с красным акцентом. pin_match 8.5.
- **womensuit «SÉVERINE»** — торн-VOGUE (red #a3111e / paper #efece5 / ink #17110f). Секции: ivory-лукбук, ink-блок bespoke, красный back-cover CTA + чёрный футер. pin_match 7.8.
- **dance «KINET»** — «DO IT NOW» (white #f2f1ee / hot-pink #ff2d78 / ink). Секции: бумажные, pink-акценты, ярко-розовый back-cover CTA. pin_match 8, craft 7 «good».
- **escort «ÉCLAT»** — Everest-data-постер (emerald-noir + gold). Секции уже были emerald+gold (совпадали). Фикс интеграции фигуры: тёплый gold-грейд + передний туман снизу (фигура «восходит» из тумана, а не вклеена).

Ретон секций сделан override-блоками `.<slug>-poster .<section>{...}` в конце каждого CSS + `background` на корне `.<slug>-poster` (иначе тёмный root-bg просвечивал за manifest с max-width:1180). Скрипт проверки: `analitic/inspiration/shot-sections.mjs <slug>` (скроллит за 300vh hero, снимает 5 кадров секций).

## Poster-уровень, волна 2: freestyle · cardealer · photographer + escort-фигура
Ещё 4 концепта доведены до уровня пина (пин как реф в nano-banana там, где нужно):
- **freestyle «SESSION»** — grunge-зин по пину «HONOR/Silent King»: рваная бумага→бетон (paperbg, ген по пину), гигант-битый титул `SESSION` (SVG feTurbulence-эрозия), капюшон-скейтер в прыжке = «капюшонный рыцарь» (переиспользован skater-cut), красная восковая печать, плотные маргиналии. Секции: убран cyan, всё в mono+crimson (#cc2323).
- **cardealer «Concours»** — blossom-dusk по Porsche-пину: сумеречный сад в цвету (blossombg, ген по пину, аметист+розовый), гигант-вордмарк `CONCOURS` ЗА машиной (окклюзия, pink→silver градиент), щит-эмблема сверху, 2-колоночный редакционный низ, тень под машиной (cp-floor). Секции: navy→aubergine, amber→pink (#e0609a).
- **photographer «Northlight»** — fashion-cover по пину «SARA»: тёплый крафт (paper) + золотой-час портрет (coverportrait, ген по пину), гигант-аутлайн `LIGHT` тиснением по бумаге, каллиграфия «Golden Hour» (Pinyon Script), редакционная колонка, вертикальный бренд, полароиды. Секции НЕ трогал — уже bone+burnt-orange = семья пина.
- **escort «ÉCLAT»** — перегенерирована девушка (figv2→figure-cut): вместо плоского каталожного кадра — кинематографичный editorial в золотом луче (emerald-black платье, gold rim снизу). Теперь «восходит из тумана», а не вклеена.

Ассеты: `scripts/.anim-rework4.ts` (5 ген + 1 cut, nano-banana-pro 1k, пины как refFrames). Проверка: `analitic/inspiration/shot-hero.mjs <slug>` + `shot-sections.mjs <slug>`.
Итого poster-уровень: **8 концептов** (folkmusic, womensuit, dance, escort, freestyle, cardealer, photographer + escort-fix).

## Сцены-раскрытие (loop): сайт #1 cardealer — 6 сцен ГОТОВО
cardealer «Concours» перестроен из «hero + плоские секции» в **6 перетекающих сцен** (chained ParallaxScene + crossfade), каждая своим приёмом:
- S1 hero [OBJECT] — вордмарк за машиной ✅
- S2 «We hunt quietly» [FG-PARALLAX] — barn-find под чехлом в гараже-сумерках, ветка сакуры на переднем плане (screen-blend + radial-mask от box-шва).
- S3 «Correct to the last bolt» [CARDS] — гигант-watermark RESTORED + летящие детали-карточки.
- S4 «Three, correctly» [DATA] — 3 машины (car/car2/car3-cut) в розовом шоуруме + дата-каллауты.
- S5 «drive it» [MOTION] — E-type на мокрой дороге в цвету, размытый передний план, летят лепестки.
- S6 «from the owners» [BG+TEXT] — отзывы проявляются по скроллу, гигант-кавычка.
Ассеты: `scripts/.anim-cd-scenes.ts` (garagedusk, dustsheet+cut, blossomfg, showroom, car2/car3+cut, roaddusk). Скрипт съёмки сцен: `analitic/inspiration/shot-scenes.mjs <slug> <progress>` (скроллит каждый .ps-scene к ~progress).
**Скоуп расширен: делаем для всех 23 сайтов.** Порядок: cardealer✅ → escort(ген запущен) → freestyle → photographer → folkmusic → womensuit → dance → далее остальные 16.

## Сцены-раскрытие (loop): сайт #2 escort — 6 сцен ГОТОВО
escort «ÉCLAT» — 6 перетекающих сцен (emerald-noir + gold, Marcellus):
- S1 hero [CHAR] — фигура из золотого тумана ✅
- S2 «The room you enter» [FG-PARALLAX] — пара силуэтом в изумрудно-золотом бальном зале, люстры-боке передний план.
- S3 «For the evenings that matter» [DATA] — реестр поводов (Gala/Dinner/Opera/Wedding) + гигант-watermark «É».
- S4 «Held in complete confidence» [BG+TEXT] — золотая нить в пустоте + 3 шага процесса.
- S5 «In confidence» [CARDS] — 3 гравированных приглашения-карточки на тёмном изумруде (разнесены, не наслаиваются).
- S6 «Never arrive alone» [OBJECT+CTA] — золотая восковая печать-приглашение + рабочая кнопка enquiry.
Ассеты: `scripts/.anim-es-scenes.ts` (ballroombg, chandelierfg, couple+cut, velvetbg, sealobj+cut). velvetbg вышел туманным лесом → затемнил в абстрактный изумруд.
Прогресс: cardealer✅ escort✅ → freestyle(ген запущен) → photographer → folkmusic → womensuit → dance → +16.

## Сцены-раскрытие (loop): сайт #3 freestyle — 6 сцен ГОТОВО
freestyle «SESSION» — 6 grunge-zine сцен (mono + crimson, Bricolage skew):
- S1 hero [CHAR] — рваная бумага + битый SESSION + капюшон-скейтер ✅
- S2 «Wherever the ground's smooth» [FG-PARALLAX] — андеркрофт-бетон + граффити передний план + список спотов.
- S3 «Landed, not lucky» [CARDS] — гигант-watermark CLIPS + летящие VHS-кадры с таймкодами.
- S4 «Every week» [DATA] — расписание-флаер на грязной бумаге (светлый контраст среди тёмных сцен).
- S5 «The word» [CHAR] — отзывы маркером на граффити-стене, разнесены.
- S6 «Drop in» [BG+TEXT] — гигант-скошенный DROP IN + crimson CTA.
Ассеты: `scripts/.anim-fs-scenes.ts` (undercroftbg, graffitifg, wallbg).
Прогресс: cardealer✅ escort✅ freestyle✅ → photographer(ген запущен) → folkmusic → womensuit → dance → +16.

## Сцены-раскрытие (loop): сайт #4 photographer — 6 сцен ГОТОВО
photographer «Northlight» — 6 fashion-editorial сцен (warm cream + coral, Space Grotesk):
- S1 hero [CHAR] — портрет + тиснёный LIGHT + каллиграфия ✅
- S2 «A year in golden light» [CARDS] — разбросанные полароиды на мятой бумаге.
- S3 «I wait for it» [BG+TEXT] — настоящий золотой-час с бликом солнца (goldenbg) + манифест.
- S4 «An index of light» [DATA] — редакционный индекс форматов a–f как оглавление.
- S5 «Words» [CHAR] — отзывы клиентов на затемнённом золотом часе.
- S6 «Let's chase the light» [OBJECT] — плёночная камера (cameraobj-cut) + coral CTA.
Ассеты: `scripts/.anim-pg-scenes.ts` (goldenbg, cameraobj+cut).
Прогресс: cardealer✅ escort✅ freestyle✅ photographer✅ → folkmusic(ген запущен) → womensuit → dance → +15.

## Сцены-раскрытие (loop): сайт #5 folkmusic — 6 сцен ГОТОВО
folkmusic «ЗОРЯ» — 6 cold-editorial сцен (paper/ink/red, Playfair):
- S1 hero [CHAR] — красный диск + битый титул + безликая фигура ✅
- S2 «Не концерт — обряд» [FG-PARALLAX] — свечной обрядовый зал + хор в дыму + свечи-передний план + строка песни.
- S3 «Как это звучит вживую» [CARDS] — grayscale-вырезки концертов + watermark ЖИВЬЁМ.
- S4 «Ближайшие вечёрки» [DATA] — тёмная типографская афиша дат.
- S5 «Голоса зала» [BG+TEXT] — отзывы как рукопись.
- S6 «Приходите на зарю» [OBJECT] — красный диск-восход + CTA.
Ассеты: `scripts/.anim-fk-scenes.ts` (obryadbg, candlefg). candlefg вышел с фигурой+мусорным текстом (пин-реф протёк) → замаскировал до нижней полосы свечей.
Прогресс: cardealer✅ escort✅ freestyle✅ photographer✅ folkmusic✅ → womensuit(ген запущен) → dance → +15.

## Сцены-раскрытие (loop): сайт #6 womensuit — 6 сцен ГОТОВО
womensuit «SÉVERINE» — 6 VOGUE-editorial сцен (red/paper/black, Cormorant):
- S1 hero [CHAR] — торн-VOGUE обложка ✅
- S2 «Cut one measure at a time» [FG-PARALLAX] — ателье (atelierbg) + булавки/нить передний план (фигуру убрал — выглядела вклеенной).
- S3 «One house, many silhouettes» [CARDS] — swatch-карточки + watermark ATELIER.
- S4 «Two fittings, no compromise» [DATA] — 3 шага примерки с рулеткой-тиками.
- S5 «In their words» [BG+TEXT] — красный VOGUE-разворот с курсив-отзывами.
- S6 «Made to your measure» [OBJECT] — ножницы+рулетка (shearsobj-cut) + CTA.
Ассеты: `scripts/.anim-ws-scenes.ts` (atelierbg, pinsfg, shearsobj+cut).
Прогресс: cardealer✅ escort✅ freestyle✅ photographer✅ folkmusic✅ womensuit✅ → dance(ген запущен) → +15 (не-постерные сайты).

## Сцены-раскрытие (loop): сайт #7 dance — 6 сцен ГОТОВО  ← ПОСТЕР-ВОЛНА ЗАВЕРШЕНА (7/23)
dance «KINET» — 6 «DO IT NOW» сцен (white/hot-pink/black, Bricolage):
- S1 hero [CHAR] — гигант MOVE/NOW + танцор ✅
- S2 «A body that listens» [CHAR/MOTION] — танцор + эхо-трейл в светлом зале (studiobg).
- S3 «Where the work happens» [CARDS] — драм. dark-кадры + watermark WORK.
- S4 «This week on the floor» [DATA] — табло расписания с pink-статусами.
- S5 «From the back row» [BG+TEXT] — отзывы крупно на ink.
- S6 «Find your line» [OBJECT] — hot-pink back-cover + пуанты (pointeobj-cut) + CTA.
Ассеты: `scripts/.anim-dn-scenes.ts` (studiobg, pointeobj+cut).

### ✅ ПОСТЕР-ВОЛНА (7): cardealer, escort, freestyle, photographer, folkmusic, womensuit, dance — все 6-сценовые.
### Осталось 16 не-постерных сайтов (список ниже) — у них hero+плоские секции; апгрейд hero до пина (если нужно) + 5 сцен.

## Сцены-раскрытие (loop): сайт #8 rockband — hero-апгрейд + 6 сцен ГОТОВО (8/23)
rockband «FERAL» — hero поднят до уровня пина «DEMON/SYSTEM» (industrial-HUD) + 6 сцен (black/bone/red, Anton, halftone):
- S1 hero [CHAR] — обёрнутый рогатый фронтмен (wrapfig-cut) + гигант FERAL + HUD (STR/ADSR/SYSTEM/barcode/table/glyphs) + halftone на redgrid. Один-в-один с пином.
- S2 «Live or not at all» [FG-PARALLAX] — красная толпа (pitbg) + руки передний план (handsfg).
- S3 «What it looks like loud» [CARDS] — гиг-кадры + watermark LOUD.
- S4 «32 cities, small rooms» [DATA] — тур-даты HUD-списком.
- S5 «The noise back» [BG+TEXT] — отзывы Anton-крупно.
- S6 «Get in the pit» [OBJECT] — рваный билет-стаб (stubobj-cut) + CTA.
Ассеты: `scripts/.anim-rb-full.ts` (wrapfig+cut, redgrid, pitbg, handsfg, stubobj+cut). Первый апгрейд не-постерного сайта — паттерн «hero-rebuild+5 сцен» работает.
Прогресс 8/23. Дальше: vinyl → jpclub → dj → jptattoo → anime → jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #9 vinyl — hero-апгрейд + 6 сцен ГОТОВО (9/23)
vinyl «SIDE·B» — hero до уровня пина «Vampire» (sepia-amber album-cover) + 6 сцен (Pirata blackletter):
- S1 hero [CHAR] — глянцевый amber-макро лица (coverface) + блэклеттер «Side B» + parental-advisory badge + катакана + globe-глиф + крутящийся винил + grain. Один-в-один.
- S2 «One record, played whole» [FG-PARALLAX] — after-hours винил-бар (clubbg) + дым/боке (smokefg).
- S3 «Warm room, cold beer» [CARDS] — конверты пластинок + watermark SIDE B.
- S4 «Thursday to Sunday» [DATA] — расписание вечеров.
- S5 «The regulars» [BG+TEXT] — отзывы блэклеттером.
- S6 «Come for side B» [OBJECT] — крутящийся винил + CTA.
Ассеты: `scripts/.anim-vn-full.ts` (coverface, clubbg, smokefg).
Прогресс 9/23. Дальше: jpclub → dj → jptattoo → anime → jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #10 jpclub — hero уже уровня пина, +6 сцен ГОТОВО (10/23)
jpclub «YORU 夜» — hero УЖЕ был один-в-один с пином «SAKURA» (pink-black duotone манга, тату-фигура, гигант-кандзи, торий+солнце, плотные JP-margins, halftone) → hero НЕ трогал, добавил 6 сцен (Noto Sans JP, halftone):
- S2 «Loud, low, lit in pink» [FG-PARALLAX] — тату-фигура на toriibg + лепестки petals-cut + watermark 夜.
- S3 «Lit in pink till light» [CARDS] — манга-панели + гигант-кандзи 踊.
- S4 «Fridays & Saturdays» [DATA] — лайн-ап вечеров с кандзи.
- S5 «On the floor» [BG+TEXT] — отзывы на ночном городе (citybg).
- S6 «Get on the list» [OBJECT] — гигант-кандзи 入 + CTA.
Ассеты: `scripts/.anim-jc-scenes.ts` (toriibg, citybg) + реюз figure-cut, petals-cut, g1-g5.
ВАЖНО: если hero уже уровня пина — не трогаем, только сцены (экономия). Прогресс 10/23.
Дальше: dj → jptattoo → anime → jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #11 dj — hero уже уровня пина, +6 сцен ГОТОВО (11/23)
dj «FALLEN» — hero УЖЕ был уровня пина «FALLEN/ANGEL» (гигант «FALLEN» occlusion + крылатое божество + угли + аудио-волна + fire-orange grunge) → hero не трогал, +6 сцен (Bricolage 800, fire-orange+oil-slick):
- S2 «Not a set — a descent» [FG-PARALLAX] — божество angel-cut на огненной сцене stagebg + угли embers-cut.
- S3 «What the descent looks like» [CARDS] — шоу-кадры + watermark DESCENT.
- S4 «One night, five cities» [DATA] — тур-даты.
- S5 «Witnesses» [BG+TEXT] — отзывы на oil-slick (oilbg).
- S6 «Witness the fall» [OBJECT] — угли + аудио-волна EQ + CTA.
Ассеты: `scripts/.anim-dj-scenes.ts` (stagebg, oilbg).
Прогресс 11/23. Дальше: jptattoo → anime → jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #12 jptattoo — hero уже уровня пина, +6 сцен ГОТОВО (12/23)
jptattoo «彫 HORI» — hero УЖЕ был ukiyo-punk уровня пина (mustard/vermillion/sumi, тату-фигура, красное солнце, гигант brush-кандзи 彫, hanko, torn paper) → +6 сцен (Bricolage + Noto JP 900, свет/тьма ритм):
- S2 «Drawn for one body» [FG-PARALLAX] — фигура на ukiyo-волне (wavebg) + красное солнце + sumi-кисть (brush-cut).
- S3 «Ink that lives on skin» [CARDS] — тату-работы (cream-карточки на sumi) + кандзи 彫.
- S4 «Three steps, one hand» [DATA] — 一二三 процесс на mustard.
- S5 «On skin» [BG+TEXT] — отзывы на irezumi-макро (irezumibg).
- S6 «Wear the story» [OBJECT] — красное солнце + sumi-кисть + кандзи + CTA.
Ассеты: `scripts/.anim-jt-scenes.ts` (wavebg, irezumibg).
Прогресс 12/23 (за половину!). Дальше: anime → jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #13 anime — hero уже уровня пина, +6 сцен ГОТОВО (13/23)
anime «BLOOM+» — hero УЖЕ был collectible magazine cover уровня пина (cream-pink, гигант HARUKA occlusion, аниме-фигура, сакура-ветка, editorial-колонки, вертикальный JP, штрихкод) → +6 сцен (Bricolage 800 + Noto JP, halftone):
- S2 «Uncut — merch to prove it» [FG-PARALLAX] — фигура hero-cut на сакура-небе (skybg) + ветка petals-cut.
- S3 «In full bloom» [CARDS] — key-art карточки + watermark BLOOM.
- S4 «The spring issue» [DATA] — оглавление номера.
- S5 «Reader mail» [BG+TEXT] — отзывы на манга-speed-lines (actionbg).
- S6 «Start watching» [OBJECT] — hot-pink CTA + play-button + кандзи 咲.
Ассеты: `scripts/.anim-an-scenes.ts` (actionbg, skybg). Префикс сцен am2-am6 (hero=am-).
Прогресс 13/23. Дальше: jprestaurant → porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #14 jprestaurant — hero уже уровня пина, +6 сцен ГОТОВО (14/23)
jprestaurant «結 YUI» — hero УЖЕ был refined-omakase уровня (реальное фото итамаэ, tategaki 結, enso, hanko, negative-space, warm-lantern) → +6 сцен (Shippori Mincho serif, sumi-dark, enso/hanko, negative-space, БЕЗ новой генерации — реюз bg/chef-cut/dish/g1-g5):
- S2 «Whatever the sea gave us» [FG-PARALLAX] — итамаэ chef-cut за стойкой + нигири-карточка + enso + 結.
- S3 «お品書き» [CARDS] — блюда-карточки (washi-рамки на sumi) + кандзи 膳.
- S4 «This meal, this once» [DATA] — 一二三 negative-space.
- S5 «Guests» [BG+TEXT] — тихие отзывы Shippori Mincho + enso.
- S6 «Sit at the counter» [OBJECT] — vermilion ханко 結 + enso-кольцо + CTA.
ВАЖНО: refined/minimal сайты не требуют генерации — negative-space + существующие фото + CSS enso/hanko. Прогресс 14/23.
Дальше: porsche → bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #15 porsche — hero уже уровня пина, +6 сцен ГОТОВО (15/23)
porsche «911» — hero УЖЕ был один-в-один с пином (silver 911 в лавандовом поле, гигант «911» occlusion, magenta-dusk, сакура) → +6 сцен (Bricolage heavy, magenta/violet/silver, БЕЗ генерации — реюз car-cut/blossom-cut/bg/g1-g5):
- S2 «On your roads» [FG-PARALLAX] — 911 в поле + сакура-ветка + watermark 911.
- S3 «Nothing added» [CARDS] — детали + outline-911.
- S4 «The numbers» [DATA] — спеки 3.4s/9000/510ps флекс-рядом.
- S5 «From the road» [BG+TEXT] — отзывы.
- S6 «Take the 911» [OBJECT] — машина + CTA.
Прогресс 15/23 (2/3!). Дальше: bmw → clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #16 bmw — hero уже уровня пина, +6 сцен ГОТОВО (16/23)
bmw «M·WERK» — hero УЖЕ был техно spec-dashboard уровня (graphite M-coupe на carbon-weave, гигант «M4» occlusion, spec-callouts, aperture-скобы, electric-blue) → +6 сцен (Bricolage 800, carbon+electric-blue, blueprint-grid, БЕЗ генерации):
- S2 «The drive, not the badge» [FG/DATA] — машина + blueprint + 3 spec-callouts с aperture-маркерами + watermark M.
- S3 «Down to the last gram» [CARDS] — детали + outline M·WERK.
- S4 «Read the spec» [DATA] — spec-sheet (Power/0-100/top speed/engine/weight).
- S5 «From the driver's seat» [BG+TEXT] — отзывы.
- S6 «Feel the redline» [OBJECT] — машина + CTA.
Прогресс 16/23. Дальше: clothing → hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #17 clothing — hero уже уровня пина, +6 сцен ГОТОВО (17/23)
clothing «your style» — hero УЖЕ был perivinkle-glass editorial уровня пина (модель + стеклянный shard, «your style» type) → переструктурировал в чистые 6 сцен (Playfair Display, periwinkle-glass, all-light, БЕЗ генерации):
- S2 «Clothing that moves like you do» [FG-PARALLAX] — модель model-cut + стеклянный shard-cut (lightning-bolt glass).
- S3 «Twelve looks, none repeated» [CARDS] — look-карточки look1-4 + watermark STYLE.
- S4 «One room, one pair of hands» [FG/DATA] — atelier + процесс measure/cut/keep.
- S5 «Clients» [BG+TEXT] — курсив-отзывы Playfair.
- S6 «Make it your style» [OBJECT] — стекло-shard + зеркальный «your style» + CTA.
Прогресс 17/23. Дальше: hoodie → ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #18 hoodie — hero уже уровня пина, +6 сцен ГОТОВО (18/23)
hoodie «BLOKK» — hero УЖЕ был streetwear-drop уровня пина (модель hood-up, кинетик-тикер, гармент, concrete+safety-yellow) → +6 сцен (Bricolage 800, concrete/yellow, кинетик-тикер @keyframes, БЕЗ генерации):
- S2 «Built like armour» [FG-PARALLAX] — модель + 2 встречных тикер-полосы (CSS marquee) + гармент.
- S3 «Worn on the block» [CARDS] — кадры + watermark BLOKK.
- S4 «Read the tag» [DATA] — спеки 500gsm/loopback/boxy/300.
- S5 «Cop confirmed» [BG+TEXT] — отзывы.
- S6 «Cop it or miss it» [OBJECT] — гармент + тикер + CTA.
Прогресс 18/23. Дальше: ecology → notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #19 ecology — hero уже уровня пина, +6 сцен ГОТОВО (19/23)
ecology «VERDA» — hero УЖЕ был held-world уровня (стеклянная капсула с лесом, sage-green, humanist «forest.») → +6 сцен (Manrope-light lowercase, dark sage, negative-space, БЕЗ генерации):
- S2 «a forest with a location» [FG-PARALLAX] — капсула-террариум + листья leaves-cut.
- S3 «a forest you can walk into» [CARDS] — лес-кадры + watermark verda.
- S4 «the impact» [DATA] — 2.4m/30yr/94% флекс-рядом.
- S5 «from the ground» [BG+TEXT] — голоса Manrope-light.
- S6 «grow a forest» [OBJECT] — капсула + CTA.
Прогресс 19/23. Осталось 4: notredame → redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #20 notredame — hero уже уровня пина, +6 сцен ГОТОВО (20/23)
notredame — hero УЖЕ был sliced-strips собор уровня пина (indigo/gold, knockout NOTRE DAME) → +6 сцен (Playfair Display serif, indigo/gold, БЕЗ генерации):
- S2 «Stone and light, by candle» [FG-PARALLAX] — собор cathedral + роза-витраж rose-cut (вращается).
- S3 «Stone, glass & light» [CARDS] — детали + watermark 1163.
- S4 «Come after dark» [DATA] — расписание визитов.
- S5 «Voices» [BG+TEXT] — отзывы Playfair.
- S6 «Enter the light» [OBJECT] — роза-витраж + CTA.
Прогресс 20/23. Осталось 3: redsuit → skisnow → skydive.

## Сцены-раскрытие (loop): сайт #21 redsuit — hero уже уровня пина, +6 сцен ГОТОВО (21/23)
redsuit «SANGUINE» — hero УЖЕ был crimson-luxury уровня пина (мужчина в костюме, гигант PRIDE occlusion, топо-декор, блэклеттер-цитата) → +6 сцен (Playfair serif + Pirata blackletter, deep crimson, topo-декор, БЕЗ генерации):
- S2 «A red suit is a decision» [FG-PARALLAX] — мужчина man-cut на crimson-cloth + topo-контуры + блэклеттер-цитата.
- S3 «Every shade of red» [CARDS] — костюмы + watermark RED.
- S4 «Six weeks, one suit» [DATA] — 3 шага i/ii/iii.
- S5 «Worn in the room» [BG+TEXT] — отзывы Playfair.
- S6 «Wear the room» [OBJECT] — мужчина + CTA.
Прогресс 21/23. Осталось 2: skisnow → skydive.

## Сцены-раскрытие (loop): сайт #22 skisnow — hero уже уровня пина, +6 сцен ГОТОВО (22/23)
skisnow «TŌJI» — hero УЖЕ был Swiss-modernist уровня пина (cobalt+cream, фигура+пики, гигант WINTER, UI-сетка) → +6 сцен (Bricolage heavy + Noto JP, cream+cobalt, swiss-grid, БЕЗ генерации):
- S2 «Rent a board, keep the season» [FG-PARALLAX] — фигура + боксед-пики peaks-cut + координаты + 冬 + сетка.
- S3 «Cold, clean & steep» [CARDS] — слоупы + watermark RIDE.
- S4 «Fitted in ten minutes» [DATA] — прайс проката.
- S5 «On the mountain» [BG+TEXT] — отзывы на кобальт-блоке.
- S6 «Chase the white light» [OBJECT] — пики + CTA.
Прогресс 22/23. Последний: skydive.

## Сцены-раскрытие (loop): сайт #23 skydive «SKYFALL» ГОТОВО (23/23) ✅
Hero уже уровня пина (сюрреал teal-grey: портал-круг с перевёрнутым горным миром + крошечная падающая фигура + пики-fg + туман, разрежённый light-grotesk Manrope) — НЕ трогал.
6 экранов, палитра teal-grey #0d1513 / accent #bcd8cd, шрифт Manrope-light разрежённый + DM Mono eyebrow, префикс sd2–sd6:
- S2 [FG-PARALLAX] «sixty seconds» — sky-bg + портал-круг (mountains scaleY(-1), перевёрнутый мир в маске) + падающая фигура внутри тумана + fog-fg. Проверено скрином ✅
- S3 [CARDS] «the fall» — 4 стеклянных teal-карточки прыжков (g1/g2/g4/g5) с ротацией + ghost-слово FALL. Проверено ✅
- S4 [DATA] «how you jump» — три строки-уровня (Tandem/AFF/Fun jumps) на grid-фоне.
- S5 [BG+TEXT] «from the door» — три отзыва по диагонали + гигантская кавычка.
- S6 [OBJECT] «take the first fall» — большой перевёрнутый портал-круг + CTA-пилюля (callback к hero). Проверено скрином ✅

# ═══ ВСЕ 23 САЙТА ГОТОВЫ (23/23) ═══
Каждый: hero уровня пина + 5 перетекающих сцен, техники варьируются (FG-PARALLAX/CARDS/DATA/MOTION/BG+TEXT/OBJECT/CHAR), crossfade-переходы, неоднотипно, продающе, high-contrast art-direction без иишной идеальной среды.

## ═══ РЕВИЗИЯ ПО ИТОГАМ ОЦЕНКИ (я + codex) ═══
Цель: починить top-5 «по совокупности» + переход. План по итерациям, каждый экран проверяю скрином.

### Итерация 1 — ГОТОВО ✅
- **Переход S6→футер (глобально, 23 сайта):** убран `transitionOut` только у последней сцены `*6-scene`. Затухание между S2–S6 остаётся, но последний блок больше НЕ растворяется в цвет — остаётся целиком, дальше футер. Проверено: redsuit (тёмный) + skisnow (светлый) — блок на месте, вуали нет. Скрипт `analitic/inspiration/shot-bottom.mjs <slug> <frac>`.
- **Летающая машина Porsche (item 3):** добавлена контактная тень-эллипс `.pr-carshadow` (сажает 911 в лаванду) + смягчён силуэтный drop-shadow; лейблы `.pr-label` подняты по контрасту (светлее + text-shadow) до читаемости. Проверено скрином.
- CarDealer: у него уже есть `.cp-floor` (контактная тень) — оставлен как есть (codex его хвалил).

### Осталось (следующие итерации, по одному сайту/теме за раз):
- **item 1+2 — расшаблонить S2–S6 + motion-signature** для слабых по codex: Vinyl (вращение пластинки/needle-drop/A-B), BMW (ускорение+hard-cut+exploded parts), Notre-Dame (вертикальный свет/проход по оси), Ecology (рост/таймлайн участка), Redsuit, Hoodie (макро швы/фурнитура). Запретить `CARDS→DATA→QUOTES→OBJECT` больше чем на 2 сайтах; задействовать `diagonal`/`curtain`/match-cut, а не один crossfade.
- **item 4 — код:** удалить legacy-CSS плоских версий (`.xx-manifest/.work/.grid/.quotes/.steps/.reviews`), вынести примитивы (координаты остаются уникальными).
- **item 5 — a11y:** осмысленные `alt` для смысловых медиа, `aria-label` на навигации, финальное статичное состояние при reduced-motion, реальные ссылки; проверить z-стек перехода (z15 vs UI 16/17).

### Итерация 2 — Vinyl расшаблонен ✅
- S3 «the crate»: убран generic угловой разлёт 4 карточек (`v3-card/v3-a..d/v3-word`) → **веер конвертов из общей оси (rotation) + сквозной спиннинг-диск `record-cut.png` за ними** (мотив винила теперь в hero→S3→S6). Классы `v3-disc/v3-sleeve/v3-s1..s4`. Заголовок «Flip through the crate.». Проверено скрином.
- Переходы оставлены crossfade (по требованию «затухание везде»). A/B-switch как transition не делаю — конфликтует с этим требованием; сигнатура выражена движением слоёв (вращение), а не сменой перехода.
- Осталось по Vinyl (низкий приоритет): S5 всё ещё 3-диагональные цитаты (общий кросс-сайт клон — буду ротировать раскладку S5 по сайтам отдельным проходом).

### Очередь дальше: BMW (ускорение/exploded parts) → Notre-Dame (вертикальный свет) → Ecology (рост/таймлайн) → Redsuit → Hoodie (макро-фурнитура); затем проход «ротация раскладок S5», чистка legacy-CSS, a11y.

### Итерация 3 — BMW расшаблонен ✅
- S3 «engineering»: убран угловой card-scatter (`bm3-card/bm3-a..d/bm3-word`) → **exploded-схема**: `car-cut.png` в центре, 4 детали-callout (`bm3-call/bm3-c1..c4`) разлетаются ОТ машины в углы короткими резкими фазами (снап = ускорение), в HUD-рамках (corner-ticks + синие номер-табы `#2ea6ff`), blueprint speed-lines `bm3-lines`. В языке hero-дашборда. Проверено скрином.
- Очередь: Notre-Dame → Ecology → Redsuit → Hoodie; потом ротация S5, чистка legacy-CSS, a11y.

### Итерация 4 — Notre-Dame расшаблонен ✅
- S3 «the cathedral»: убран угловой scatter (`nd3-card/nd3-a..d/nd3-word 1163`) → **вертикальная элевация**: 4 плиты (`nd3-el/nd3-e1..e4`) ВОСХОДЯТ колонной снизу вверх вдоль луча света `nd3-shaft`, роза-окулус `nd3-rose` (rose-cut.png) вращается сверху как источник света, копирайт Playfair справа. Готическая вертикаль. Проверено скрином.
- Очередь: Ecology (рост/таймлайн) → Redsuit → Hoodie; потом ротация S5, чистка legacy-CSS, a11y.

### Итерация 5 — Ecology расшаблонен ✅
- S3 «what we protect»: убран угловой scatter (`ec3-card/ec3-a..d/ec3-word verda`) → **таймлайн роста участка**: 4 стадии `ec3-stage/ec3-g1..g4` (Y1→Y5→Y15→Y30) растут из базовой линии `ec3-ground` слева-направо, увеличиваясь по размеру (посажено вручную→первый полог→река→old-growth), green year-тэги. Копирайт «Watch a plot grow up.» слева. Проверено скрином.
- Расшаблонено S3: Vinyl(вращение) · BMW(exploded) · Notre-Dame(вертикаль) · Ecology(рост). Очередь: Redsuit → Hoodie; потом ротация S5, чистка legacy-CSS, a11y.

### Итерация 6 — Redsuit расшаблонен ✅
- S3 «the looks»: убран угловой scatter (`rd3-card/rd3-a..d/rd3-word RED`) → **гардеробная рейка**: 4 полноростовых образа `rd3-plate/rd3-p1..p4` висят на рейке `rd3-rail` через кольца-крючки (::before/::after), въезжают сбоку и качаются под разными углами (lateral-sway), Playfair-копирайт по центру. Лукбук вместо scatter. Проверено скрином.
- Расшаблонено S3 (5): Vinyl(вращение) · BMW(exploded) · Notre-Dame(вертикаль) · Ecology(рост) · Redsuit(рейка). Очередь: Hoodie; потом ротация S5, чистка legacy-CSS, a11y.

### Итерация 7 — Hoodie расшаблонен ✅
- S3 «the lookbook»: убран угловой scatter (`hd3-card/hd3-a..d/hd3-word BLOKK`) → **hazard-tape-конвейер**: 4 кадра `hd3-shot/hd3-k1..k4` едут справа по диагональной жёлто-чёрной ленте `hd3-tape` с жёлтыми номер-табами (ticker — язык hero-бренда). Проверено скрином.
- ✅ Item 1+2 закрыты для 6 худших клон-сайтов: Vinyl(вращение) · BMW(exploded) · Notre-Dame(вертикаль) · Ecology(рост) · Redsuit(рейка) · Hoodie(лента). Каждый со своим законом движения.
- Дальше: item 4 (чистка legacy-CSS плоских версий) → item 5 (a11y) → лёгкая ротация S5 для пары сайтов.

### Итерация 8 — a11y (item 5, движок+навигации) ✅
- **reduced-motion**: сцена замирала на `--sp:0.5` (слои полупроявлены) → теперь `0.84` — контент полностью раскрыт, до старта перехода (0.86). Правка в движке `parallax-scene.tsx`, действует на все 23 сайта.
- **aria-label="Основная навигация"** добавлен на все 23 `<nav>` (perl, идемпотентно).
- **z-стек перехода — ложное срабатывание codex**: `.ps-viewport{z-index:1}` создаёт свой stacking-контекст, поэтому `.ps-trans{z-index:15}` и так накрывает весь контент (z16/17 внутри viewport). Править нечего.
- Все 6 отредактированных маршрутов рендерят 200. Осталось по a11y (низкий приоритет): осмысленные alt на субъект-медиа, реальные href/кнопки.
- Дальше: item 4 (чистка legacy-CSS) аккуратно, verify-then-delete.

### Итерация 9 — legacy-CSS (item 4) ✅
- Скрипт `scratchpad/clean-css.mjs`: удаляет только top-level CSS-правила, чьи классы ПОЛНОСТЬЮ отсутствуют в парном *Site.tsx (подстрочная проверка → ложных удалений быть не может; @media/@keyframes не трогаются). Бэкап в `scratchpad/css-backup/`.
- Удалено **931 мёртвое правило из 3524** (~26%) — старые flat-секции (`*-manifest/work/grid/quotes/proc/serv/cta-in/steps/lead` и т.п.). Все 23 маршрута рендерят 200; womensuit hero (−~40 правил) и ecology S3 проверены скрином — без регрессий.

## ═══ РЕВИЗИЯ ЗАВЕРШЕНА: top-5 + переход ═══
1. **S3-расшаблонивание + motion-signature** (item 1+2): 6 худших клонов, каждый со своим законом движения — Vinyl(вращение-крейт) · BMW(exploded) · Notre-Dame(вертикальная элевация) · Ecology(рост-таймлайн) · Redsuit(гардеробная рейка) · Hoodie(hazard-tape-конвейер).
2. **Летающие вырезки + контраст** (item 3): Porsche — контактная тень + читаемые лейблы. CarDealer уже имел тень.
3. **legacy-CSS** (item 4): −931 мёртвое правило.
4. **a11y** (item 5): reduced-motion → раскрытое конечное состояние (0.84); aria-label на 23 навигациях; z-стек — ложное срабатывание codex.
5. **Переход**: `transitionOut` снят у последней сцены всех 23 сайтов — затухание между S2–S6 осталось, но последний блок не растворяется, остаётся перед футером.

### Осталось опциональным (не входит в top-5, под отдельный /loop):
- Ротация раскладок **S5** (3-диагональные цитаты одинаковы кросс-сайт) — по требованию «затухание везде» переходы не трогаю, но раскладку S5 можно варьировать.
- Осмысленные **alt** на субъект-медиа; реальные href/кнопки вместо демо-заглушек.

## ═══ ЗАХОД 2: S5-раскладки + разные форматы переходов ═══
Задача: S5 (3-диагональные цитаты) → свой формат/закон движения на сайт; переходы больше НЕ все crossfade — микс crossfade/curtain/diagonal (цвет вуали = фон следующей сцены, чтобы без вспышки); правило «последний блок остаётся» сохраняется.

### S5-1 — Vinyl ✅
- S5 → **трек-лист «SIDE B · THE REGULARS»**: 3 трека B1/B2/B3 (блэклеттер-цитата + groove-подчёркивание + mono-cite), grooved-пластина слева, амбер-**игла-стилус развёртывается сверху вниз** (`v5-needle`, y −26→26vh) = needle-down. Классы `v5-disc/v5-needle/v5-trk/v5-t1..t3`. Проверено скрином.
- Переходы Vinyl: hero crossfade · S2 **curtain** · S3 **diagonal** · S4 crossfade · S5 **diagonal** · S6 нет (блок остаётся). Diagonal-выход S3 проверен — мягкий направленный уход, без вспышки.
- Очередь S5: BMW → Notre-Dame → Ecology → Redsuit → Hoodie.

### S5-2 — BMW ✅
- S5 → **телеметрия/HUD**: 3 data-карточки `bm5-card` (CH.01/02/03, corner-ticks) на blueprint-подложке `bm5-scanbg`, синяя scan-линия `bm5-scan` сверху вниз, быстрый снап. Классы `bm5-scan/bm5-row/bm5-card`. Проверено скрином.
- Переходы BMW: hero cf · S2 **diagonal** · S3 cf · S4 **diagonal** · S5 **curtain** · S6 нет.
- Очередь S5: Notre-Dame → Ecology → Redsuit → Hoodie.

### S5-3 — Notre-Dame ✅
- S5 → **иллюминированные стихи**: 3 стиха `nd5-verse/nd5-v1..v3` с золотыми буквицами-дропкапами (T/O/H, float), Playfair-цитата обтекает, свечное свечение снизу `nd5-glow` с CSS-мерцанием `@keyframes nd-flicker` (off при reduced-motion). Фикс перекрытия: фикс. ширина стиха вместо min-content. Проверено скрином.
- Переходы Notre-Dame: hero cf · S2 **curtain** · S3 cf · S4 **diagonal** · S5 **curtain** · S6 нет.
- Очередь S5: Ecology → Redsuit → Hoodie.

### S5-4 — Ecology ✅
- S5 → **geotag field-notes**: 3 карточки `ec5-card` с крестом-пином ⌖ + координатами (46.21°N·8.14°E) на dotted-графикуле `ec5-mapbg`, приземляются сверху (pin-drop, x фикс + y −12→0). Усиливает бренд-тему geotag. Проверено скрином.
- Переходы Ecology: hero cf · S2 **curtain** · S3 **diagonal** · S4 cf · S5 **diagonal** · S6 нет.
- Очередь S5: Redsuit → Hoodie.

### S5-5 — Redsuit ✅
- S5 → **atelier «client book»**: 3 записи `rd5-entry/rd5-e1..e3` (No.014/021/006 + role, Playfair-italic цитата-чернила + подпись), золотая двойная маргинальная линия `rd5-margin`, вписываются слева (x −3vw). Фикс перекрытия: фикс. ширина. Проверено скрином.
- Переходы Redsuit: hero cf · S2 **diagonal** · S3 cf · S4 **curtain** · S5 **diagonal** · S6 нет.
- УРОК: для текст-стеков в grid использовать `width:min(Nch,Mvw)` (не max-width) — иначе колонка жмётся по min-content и стихи наложатся. Применить к Hoodie сразу.
- Очередь S5: Hoodie (последний).

### S5-6 — Hoodie ✅  ═══ ЗАХОД 2 ЗАВЕРШЁН (6/6) ═══
- S5 → **«verified cop» drop-квитанции**: 3 карточки `hd5-cop` (жёлтый штамп-хедер ✓ VERIFIED COP + 5★ + цитата + @handle), лёгкий наклон, штамп-въезд (scale 1.2→1 + rotate settle). Фикс. ширина сразу. Проверено скрином.
- Переходы Hoodie: hero cf · S2 **curtain** · S3 cf · S4 **diagonal** · S5 **diagonal** · S6 нет.

# S5-раскладки расшаблонены для 6 сайтов, у каждого свой формат + свой закон движения:
Vinyl(трек-лист/игла needle-down) · BMW(телеметрия/HUD scan) · Notre-Dame(иллюминированные стихи/буквицы+свеча) · Ecology(geotag field-notes/pin-drop) · Redsuit(client book/вписывание слева) · Hoodie(cop-квитанции/штамп-въезд).
# Переходы больше НЕ все crossfade: у каждого сайта микс crossfade/curtain/diagonal (цвет вуали = фон следующей сцены, без вспышки); правило «последний блок S6 остаётся» сохранено.

## ═══ ЗАХОД 3: полная де-шаблонизация (loop) ═══
### Фаза 0.1 — оживил --tr-angle ✅
- `.ps-trans-diagonal` больше не фикс. clip-path, а угловая mask-развёртка вуали: `mask:linear-gradient(var(--tr-angle),#000 0,#000 calc(trp*128%),transparent +13%)`, `opacity:1`. Теперь `angle` реально задаёт направление свипа. parallax-scene.css. Проверено: BMW S2(−10) vs S4(+12) сметаются в разные стороны, при trp=1 полное покрытие. crossfade/curtain не тронуты.
- Дальше: 0.2 честный reduced-motion (--lp:1 всем слоям + скрыть вуаль), 0.3 опц.

### Фаза 0.2 — честный reduced-motion ✅
- В `@media(prefers-reduced-motion:reduce)` форс `.ps-layer{--lp:1}` + `.ps-line>span{--lnp:1}` (все слои в полном «to») + `.ps-trans{display:none}` (без вуали). Проверено эмуляцией (shot-reduced.mjs, reducedMotion:'reduce'): porsche-hero без скролла сразу полностью собран, без полупроявленных слоёв и вуали.
### Фаза 0.3 — ЗАДОКУМЕНТИРОВАНО как ограничение (skip)
- Все переходы — цветная плоскость поверх сцены (не blend двух сцен). Blur/scale уходящей сцены требует filter на `.ps-viewport` от `--trp` через родителя `.ps-sticky` — переходы работают приемлемо, отложено. ФАЗА 0 ЗАКРЫТА (0.1✅ 0.2✅ 0.3 doc).
### Фаза 1 старт: кластер музыка/сцена (dj → rockband → jpclub → folkmusic → freestyle → dance).

### Ф1 сайт 1/15 — DJ ✅
- S3 → **beat-drop**: 4 show-кадра `df3-frame/df3-f1..f4` падают сверху (y −46vh→−6vh, scale 1.1→1) и «бьют» на fire-линию `df3-line` короткими фазами по биту; embers-cut foreground (screen). Уникальный закон — падение-удар сверху (ни у кого нет).
- S5 → **audio-waveform + таймкод-комменты + плейхед**: генерённая fire-волна (72 бара, sin-высоты) `df5-wave`, 3 коммента `df5-cmt` на таймкодах 0:42/1:58/3:24 всплывают по мере свипа плейхеда `df5-head` (x −46vw→46vw). Audio-native, не 3 диагональные цитаты.
- Переходы DJ: hero cf · df2 **diagonal(−14)** · df3 cf · df4 **curtain** · df5 **diagonal(+14)** · df6 нет. 200 OK. Проверено скринами S3+S5.
- Очередь музыка: rockband → jpclub → folkmusic → freestyle → dance.

### Ф1 сайт 2/15 — RockBand ✅
- S3 → **контакт-плёнка (hard-cut)**: 4 grayscale gig-кадра `b3-frame/b3-f1..f4` жёстко склеиваются на месте (scale 1.08→1, x фикс, короткие фазы) в плёнке `b3-strip` со сквозными перфорациями (::before/::after repeating dashes) + REC-HUD `b3-rec`. Закон — hard-cut на месте (не падение как dj).
- S5 → **пресс-вырезки-коллаж**: 3 клиппинга `b5-clip/b5-c1..c3` рваный newsprint (clip-path), Anton-мастхеды (KERRANG!/THE FAN PIT/LINE OF BEST FIT), красный скотч (::before), приклеены под углом, snap+rotate. Формат «press collage».
- Переходы rockband: hero cf · b2 **diagonal(16)** · b3 cf · b4 **curtain** · b5 **diagonal(−13)** · b6 нет. 200 OK. Проверено S3+S5.
- Использовано: S3 film-strip-hardcut(rb); S5 press-collage(rb). Очередь: jpclub → folkmusic → freestyle → dance.

### Ф1 сайт 3/15 — JpClub ✅
- S3 → **манга-страница**: 4 фото-панели `j3-panel/j3-p1..p4` в фикс. асимметричной комикс-сетке (белые рамки, чёрные гаттеры, kanji-лейблы), проявляются в порядке чтения (scale .95→1, стаггер) · panel-pop. Копия справа (ужал кегль/ширину, чтобы не наезжала на панели). Уникальный layout.
- S5 → **неоновые вывески**: 3 квоты `j5-neon/j5-n1..n3` как светящиеся неон-таблички (kanji-тег + white text + pink glow), CSS-фликер `@keyframes jc-buzz` (off при reduced-motion), разнесены треугольником. Притемнил veil для читаемости. Формат «neon signage».
- Переходы jpclub: hero cf · j2 **diagonal(15)** · j3 cf · j4 **curtain** · j5 **diagonal(−12)** · j6 нет. 200 OK. Оба экрана проверены (ловил наезд копии S3 и наложение неонов S5 — починил).
- Использовано: S3 manga-panel-grid(jc); S5 neon-signs(jc). Очередь: folkmusic → freestyle → dance.

### Ф1 сайт 4/15 — FolkMusic ✅
- S3 → **фото-альбом**: 4 ч/б снимка `k3-photo/k3-h1..h4` на белых паспарту с чёрными уголками-фотокорнерами (::before/::after border-trick), рукописные Playfair-italic подписи, «раскладываются» (scale .92→1 + rotate settle) · mount-settle. Архивный альбом.
- S5 → **пергамент-свиток**: `k5-scroll` (тёплый пергамент-градиент) + 3 строфы `k5-stz/k5-s1..s3` с ✦-разделителями `k5-orn`, раскрываются сверху вниз при свечном `k5-glow`, dark-ink Playfair-italic. Формат «manuscript scroll». Чинил наложение (расширил пергамент/уменьшил кегль) + eyebrow-контраст.
- Переходы folkmusic (+ починил цвета вуали под след. сцену light→dark): hero cf · k2 **curtain(#cfcdc5)** · k3 **diagonal(#151410)** · k4 cf(#151410) · k5 **curtain(#0e0d0a)** · k6 нет. 200 OK.
- Использовано: S3 photo-album(fk); S5 parchment-scroll(fk). Очередь музыка: freestyle → dance.

### Ф1 сайт 5/15 — Freestyle ✅
- S3 → **видео-плеер**: центральный экран `f3-screen` с клипом + RGB-split (2 доп. img `f3-r`/`f3-c` hue-rotate red/cyan + screen-blend + offset) + скан-линии `f3-scan` + REC-HUD + красный scrubber; 3 миниатюры-очередь `f3-thumbs` (grid-auto-flow:column). Chromatic-glitch, отличается от rockband film-strip.
- S5 → **граффити-теги крю**: 3 скью-тега `f5-tag/f5-t1..t3` red/cyan/white с glow, наляпаны под углом (spray-slap) треугольником на paste-up стене. Формат «graffiti crew tags». Чинил наложение (t1+t3 слева → t3 в низ-центр, уменьшил кегль/расширил).
- Переходы freestyle: hero cf · f2 **diagonal(−16)** · f3 cf · f4 **curtain** · f5 **diagonal(13)** · f6 нет. 200 OK.
- Использовано: S3 video-player-chromatic(fs); S5 graffiti-tags(fs). Музыкальный кластер закрыт кроме dance. Очередь: dance → (мода) clothing…

### Ф1 сайт 6/15 — Dance ✅ (музыкальный кластер закрыт)
- S3 → **motion-trail**: центральный `dancer-cut` `d3-dancer` + 2 розовых эхо-силуэта `d3-echo` расходятся влево (x 0→−8/−16vw, opacity растёт) = шлейф движения; 4 миниатюры-фазы `d3-thumbs` (grid-auto-flow:column). Монохром motion-study (не chromatic как freestyle). Копия справа.
- S5 → **kinetic-type с эхо-шлейфом**: 3 heavy-квоты `d5-line/d5-l1..l3`, розовый motion-trail на типографике через `text-shadow:7px/15px rgba(pink)`, кинетик-стек со слайд-въездом. Формат «type-echo».
- Переходы dance (+ починил цвета): hero cf · d2 **diagonal(14)** · d3 **curtain(#141416)** · d4 cf · d5 **diagonal(−14,#0e0f11)** · d6 нет. 200 OK.
- ✅ МУЗЫКА (6): dj rb jc fk fs dn — все S3/S5 уникальны. Использовано +: S3 motion-trail(dn); S5 kinetic-echo(dn). Дальше МОДА: clothing → womensuit → escort → photographer.

### Ф1 сайт 7/15 — Clothing ✅ (мода 1/4)
- S3 → **editorial lookbook-разворот**: hero-плита `cl3-hero` + 3 numbered-плиты `cl3-pa/pb/pc` в асимметричной журнальной вёрстке (абс. позиции, Playfair-подписи 01·Coat…04·Suit), refined staggered rise. Светлый editorial, отличается от dense manga-grid.
- S5 → **swing-tags**: 3 бирки `cl5-swing` на нитках (`::before` string 46vh вверх + `cl5-hole` кольцо + YOUR·STYLE + Playfair-italic), роняются+качаются (tag-drop), диагональ. Формат «hangtags».
- Переходы clothing: hero diagonal(−10) · cl2 **curtain** · cl3 cf · cl4 **diagonal(−12)** · cl5 **curtain** · cl6 нет. 200 OK.
- Использовано: S3 editorial-lookbook(cl); S5 swing-tags(cl). Мода 1/4. Очередь: womensuit → escort → photographer.

### Ф1 сайт 8/15 — WomenSuit ✅ (мода 2/4)
- S3 → **couture-обмер**: `figv-cut` `w3-fig` в центре + 4 мерки-callout `w3-cal/w3-m1..m4` (Shoulder/Bust/Waist/Sleeve с красными штрихами `w3-dash`) проявляются последовательно (measure-in) + 2 fabric-swatch `w3-swatch`. Тейлоринг-обмер, отличается от BMW tech-exploded (тёплый couture vs синий HUD).
- S5 → **maison care-labels**: 3 ивори-ярлыка `w5-label` со стежкой (dashed border, SÉVERINE + care-line + Cormorant-italic), диагональ на красном, settle. Формат «care-label».
- Переходы womensuit: hero cf · w2 **curtain** · w3 cf · w4 **diagonal(13)** · w5 **curtain** · w6 нет. 200 OK.
- Использовано: S3 couture-measure(ws); S5 care-labels(ws). Мода 2/4. Очередь: escort → photographer.

### Ф1 сайт 9/15 — Escort ✅ (мода 3/4)
- escort изначально не-клон (S3=occasions register, S4=process points, S5=engraved invitation-карточки). Апгрейд S3: register-список → **gilded occasion-gallery**: 4 золото-рамочных вечера `e3-frame/e3-f1..f4` (g1-g4, double gold border ::before, Marcellus-подписи) под спот-конусом `e3-spot`, refined-lift. Отличается от list-формата.
- S5 (invitation-cards на velvet `e5-card`) — уже был тематический, оставлен.
- Переходы escort (были все cf): hero cf · e2 **diagonal(−13)** · e3 **curtain** · e4 cf · e5 **diagonal(12)** · e6 нет. 200 OK.
- Использовано: S3 gilded-gallery(es); S5 invitation-cards(es, ранее). Мода 3/4. Очередь: photographer (последний в моде).

### Ф1 сайт 10/15 — Photographer ✅ (мода 4/4 · кластер закрыт)
- photographer: S2 = film contact-sheet (оправдан, оставлен), S3 был текст-на-golden. Реальный клон — S5 (3 цитаты).
- S3 → **viewfinder-оверлей**: сетка третей + углы-скобки `p3-vf` + AF-фокус-бокс `p3-focus` (снап scale 1.4→1) + EXIF-readout `p3-exif` поверх golden-hour + копия. Взгляд через видоискатель (hero-приём).
- S5 → **EXIF-подписи**: 3 клиент-кадра `p5-shot/p5-s1..s3` (shot1-3) с камера-настройками `<i>f/1.8·1/400·ISO 200</i>` + отзыв + клиент, в ряд, develop-in. Формат «EXIF photo captions».
- Переходы photographer (были все cf): hero cf · p2 **diagonal(−12,#2a1d0c)** · p3 **curtain(#22190f)** · p4 cf · p5 **diagonal(13)** · p6 нет. 200 OK.
- ✅ МОДА (4): cl ws es pg. Использовано +: S3 viewfinder(pg); S5 EXIF-captions(pg). Дальше ЯПОНИЯ: jptattoo → jprestaurant → anime.

### Ф1 сайт 11/15 — JpTattoo ✅ (Япония 1/3)
- jptattoo: S3 был угловой card-scatter (jt3-a/b/c/d), S5 — 3 цитаты (jt5-q1/q2/q3). Оба клоны.
- S3 → **kakejiku хангинг-скроллы**: 3 висячих свитка (g1/g4/g2) с деревянными валами +軸先-навершия `jt3-rod/top/btm`, разворачиваются сверху вниз. ЗАКОН: mask-reveal по `--lp` (`mask:linear-gradient top/100% calc(var(--lp)*100%)`) + нижний вал-груз спускается `top:calc(15px+var(--lp)*58vh)`. Стаггер phase [0.04/0.16/0.28] — на 0.72 скролл-3 ещё доразворачивается. Подписи-ханко 背/龍/鯉.
- S5 → **ханко-печати**: 3 отзыва `jt5-rec/r1..r3`, каждый запечатан красной инкан `jt5-hanko/k1..k3` с кандзи работы (背 фулбэк, 龍 рукав, 鯉 кои), press-in (scale 1.55→1 + rotate-settle, короткая фаза-штамп). Зигзаг: печать в противоположной от текста зоне. Формат «hanko seal stamps».
- Переходы (были все cf): hero **curtain(#e0be2e)** · jt2 **diagonal(−13,#141002)** · jt3 **curtain(#dcb928)** · jt4 **diagonal(12,#141002)** · jt5 **cf(#e6c534)** · jt6 нет. Свет/тьма ритм соблюдён. Моб @media обновлён (s2 скрыт, ханко ужаты). 200 OK.
- ⚠️ Инфра: dev-сервер (next dev :3011) завис watcher'ом (CPU 0, не рекомпилил) — перезапущен `node node_modules/.bin/next dev -p 3011`, лог /tmp/creatly-dev.log. Хот-релоад восстановлен.
- Использовано +: S3 kakejiku-unroll(jt); S5 hanko-stamps(jt). Дальше: jprestaurant → anime.

### Ф1 сайт 12/15 — JpRestaurant ✅ (Япония 2/3)
- jprestaurant (kaiseki/омакасе, sumi+washi минимализм): S3 был card-scatter (jr3-a/b/c/d), S5 — 3 цитаты (jr5-q1/q2/q3). Оба клоны.
- S3 → **омакасе по порядку**: 5 курсов-строк `jr3-course/cr1..cr5` (先付/刺身/炙り/握り/椀物, g1-g5), каждая с индексом 一〜五 + мини-тумбнейл + название + сезонная нота. ЗАКОН: строки ставятся «со стороны стойки» (from x:6vw→0) по каскаду фаз [0.03→0.64], линия-разделитель РИСУЕТСЯ `::after{transform:scaleX(var(--lp))}` слева-направо. Формат «sequential omakase service». Ghosted 膳.
- S5 → **kifuda-таблички**: деревянная рейка `jr5-rail` + 3 木札 `jr5-fuda/f1..f3` (`jr5-tag>jr5-cord+jr5-wood`) с гвоздём-точкой, красным 客, цитатой, гость·город. ЗАКОН: падают с рейки и качаются к покою (from y:−7vh rotate ±7° → 0vh ±2°, transform-origin:top). Дерево — repeating-linear-gradient. Формат «kifuda wood-plaques» (отлично от cl paper swing-tags).
- Переходы (были все cf #14120e): hero cf · jr2 **curtain** · jr3 **diagonal(−10)** · jr4 cf · jr5 **curtain** · jr6 нет. Весь мир тёмный sumi → вуаль #14120e без флэша везде. Моб @media: курсы ужаты, kifuda в вертикальный стек. 200 OK.
- Использовано +: S3 omakase-course-list(jr); S5 kifuda-plaques(jr). Дальше: anime (Япония 3/3).

### Ф1 сайт 13/15 — Anime ✅ (Япония 3/3 · кластер закрыт)
- anime (BLOOM+ манга-магазин, cream-pink): S3 был key-art card-scatter (am3-a/b/c/d), S5 — 3 цитаты (am5-q1/q2/q3). Оба клоны. jpclub уже держит manga-grid → anime получил ДРУГОЙ закон.
- S3 → **impact-cut montage**: 3 кадра-cel `am3-cut/u1..u3` (桜/翔/祭, g1/g3/g5) в восходящей диагонали, толстая cel-рамка. ЗАКОН: «влетают» на месте (scale 1.3-1.36→1 + rotate-settle, каскад фаз [0.04→0.56]) + 集中線 speed-lines `.am3-cel::before` (repeating-conic-gradient + radial-mask), opacity пульсирует `calc(.32+(1-var(--lp))*.5)` — сильнее на входе. Онамотопея ドン/バン/咲 (`-webkit-text-stroke`). Формат «impact-frame/speed-lines».
- S5 → **манга-баблы**: 3 речевых пузыря `am5-bub/b1..b3` (белые, чёрный контур, хвост `::after` rotate45), pop-in (scale .62→1). Над actionbg (сам по себе 集中線-взрыв с сакурой). Формат «dialogue bubbles». Eyebrow затемнён (был белый на светлом).
- Переходы (были cf + ошибочный hot-pink): hero cf(#f4e9ec) · am2 **curtain(#efe0e6)** · am3 **diagonal(−10,#efe0e6)** · am4 **cf(#e7e0d3)** ← фикс: actionbg СВЕТЛЫЙ крем, не hot-pink · am5 **curtain(#e0326e→S6 hot-pink)** · am6 нет. Моб @media обновлён. 200 OK.
- Использовано +: S3 impact-cut/speed-lines(am); S5 dialogue-bubbles(am). ЯПОНИЯ 3/3 ✅. Дальше: АВТО/ПРИРОДА — cardealer → porsche → skisnow → skydive.

### Ф1 сайт 14/15 — CarDealer ✅ (авто/природа 1/4)
- cardealer (Concours, heritage classic, blossom-dusk аубержин/pink `.cd-poster --accent:#e0609a`). Клоны: S3 (restoration card-scatter c3-a/b/c/d) и S6 (owner-quotes c6-q1/q2/q3). S4(mirror-floor 3 машины) и S5(motion drive) уже bespoke — не трогал.
- S3 → **provenance inspection-file + одометр**: одна карточка-досье `c3-file` (manila на аубержин) — header (INSPECTION FILE №/matching numbers), **механический одометр** `c3-digits` 5 окон-цифр `c3-dwin>c3-strip` (30 <i>, `Array.from`), катится по `--lp` (`translateY(calc(var(--lp)*var(--to)*-1em))`, --to=[10,10,10,18,14]→00084), + 4 exhibit-тумбнейла + PASSED-штамп. ЗАКОН «odometer roll-up». Фикс: label клипался под цифрами → `width:12ch;flex:none`; «№» глиф → «numbers match».
- S6 (последняя сцена, БЕЗ transitionOut) → **сервис-книжка штампы**: 3 записи `c6-entry/r1..r3` (дата·пробег + заметка + владелец) + 3 круглых резиновых штампа `c6-stamp/k1..k3` (CONCOURS·LONDON·✓SERVICED·год), press-in (scale1.5→1 + rotate-settle). Год штампа = год записи. Формат «service-stamps» (отлично от jt hanko: британский круглый rubber vs красный квадрат).
- Переходы (были все cf): hero cf · c2 **curtain** · c3 **diagonal(−10,#0f0713)** · c4 **curtain(#170d1b)** · c5 cf(#0c0710) · c6 нет. Весь мир тёмный аубержин → без флэша. Моб @media обновлён. 200 OK.
- Хук: 2 gradient-text (L58 hero chrome-nameplate, L111 ghost-word) — предсуществующие декор-вордмарки постер-hero, намеренные, не трогал.
- Использовано +: S3 odometer-dossier(cd); S5/S6-слот service-stamps(cd). Дальше: porsche → skisnow → skydive.

### Ф1 сайт 15/15* — Porsche ✅ (авто/природа 2/4)
- porsche 911 (тёмный кино-магента, accent #e85a9c/violet #8a5cd8). Клоны: S3 (detail card-scatter pr3-a/b/c/d) и S5 (owner-quotes pr5-q1/q2/q3). S4(stats) уже bespoke.
- S3 → **приборный кластер**: компонент `Gauge` (SVG тики через Math+Array.from, дуга `prg-fill` рисуется `stroke-dashoffset:calc(100-var(--lp)*var(--af))`, стрелка `prg-needle` разворачивается `rotate(calc(-120deg+var(--lp)*var(--sw)*1deg))`). 3 прибора: 290 km/h · 7.5k rpm (big) · 98°C oil, редлайн-тики красным, hub+readout. ЗАКОН «needle-sweep». Ghost 911.
- S5 → **timing board**: 3 сессии владельцев `pr5-lap/l1..l3` как круги (P1/P2/P3, время 7:42.1/7:48.6/7:55.3, гэпы +6.5/+13.2), P1 подсвечен фиолетовым + тег «purple» (быстрейший круг), цитата = note. Формат «lap-timing board» (отлично от bmw телеметрии). Slide-in каскад.
- Переходы (были все cf #120611): hero cf · pr2 **curtain** · pr3 **diagonal(−10)** · pr4 **curtain** · pr5 cf · pr6 нет. Весь мир тёмный магента → без флэша. Моб @media обновлён. 200 OK.
- Использовано +: S3 gauge-cluster/needle-sweep(pr); S5 lap-timing-board(pr). Дальше: skisnow → skydive (последние 2).

### Ф1 сайт 16/17 — SkiSnow ✅ (авто/природа 3/4)
- skisnow (TŌJI, Swiss-модернист cobalt+cream). Клоны: S3 (slopes card-scatter sk3-a/b/c/d) и S5 (quotes sk5-q1/q2/q3). S4(прайс) уже bespoke. S5 — единственная тёмная (кобальт), вуали уже свето-корректны.
- S3 → **высотный профиль**: SVG `sk3-svg` — хребет `sk3-ridge` + заливка + 3 трассы `sk3-easy/int/exp` (green/blue/black), рисуются по --lp `stroke-dashoffset:calc(100-clamp(0,(var(--lp)-off)*k,1)*100)` (стаггер off 0/0.4/0.48/0.56), гридлайны высот + summit-точка (opacity по --lp), stats (1234m/42km/18) + легенда. ЗАКОН «SVG draw-on profile». Ghost RIDE.
- S5 → **piste-таблички**: 3 знака трасс `sk5-sign/s1..s3` (доска+пост), бейдж сложности `sk5-easy`(зел.круг)/`sk5-int`(син.квадрат)/`sk5-exp`(чёрн.ромб), run-name + отзыв как trail-note. Сложность = уровню ревьюера (Chloé→easy, Markus→inter, Yuto→expert off-piste). «Вкапываются» (y:8vh→0 стаггер). Формат «piste signs».
- Переходы (были все cf): hero cf · sk2 **curtain** · sk3 **diagonal(−10,#e7e0d0)** · sk4 **curtain(#1f3fd6→S5 кобальт)** · sk5 cf(#e7e0d0→S6 крем) · sk6 нет. Свето/кобальт-корректно, без флэша. Моб @media: профиль/знаки → стек. 200 OK.
- Использовано +: S3 altitude-profile-drawon(sk); S5 piste-signs(sk). Дальше: skydive (ПОСЛЕДНИЙ, авто/природа 4/4).

### Ф1 сайт 17/17 — Skydive ✅ (авто/природа 4/4 · ФАЗА 1 ЗАКРЫТА 23/23)
- skydive (SKYFALL, teal-grey surreal, accent #bcd8cd). Клоны: S3 (jump card-scatter sd3-a/b/c/d) и S5 (quotes sd5-q1/q2/q3). S4(levels) уже bespoke.
- S3 → **альтиметр-спуск**: вертикальная лента высот `sd3-tape` (4000→ground) + маркер `sd3-marker` падает `top:calc(var(--lp)*100%)` + трейл `sd3-trail` height по --lp; 4 стадии `sd3-stage` (Exit/Freefall/Canopy/Landing, g1/g2/g5/g4) загораются по порогам `opacity:clamp(0,(var(--lp)-var(--thr))*7,1)` (thr 0.02/0.28/0.55/0.78, inline `--thr`). ЗАКОН «altimeter descent» (≠ pr needle, ≠ sk horizontal profile). Фикс: заголовок в 1 строку + dive padding-top 12vh (был налёт на Exit).
- S5 → **jump-logbook**: хедер + 3 записи `sd5-log/lg1..lg3` (`#001/#047/#613 · date·DZ · alt · freefall · remarks`), отзыв = remarks. Slide-in каскад. Фикс: разнёс padding-top 22/44/66vh (был вертикальный налёт строк). Формат «jump logbook».
- Переходы (были все cf #0d1513): hero cf · sd2 **curtain** · sd3 **diagonal(−10)** · sd4 **curtain** · sd5 cf · sd6 нет. Весь мир тёмный teal → без флэша. Моб @media добавлен (dive/log → стек). 200 OK.
- Использовано +: S3 altimeter-descent(sd); S5 jump-logbook(sd).

---

## 🏁 ФИНАЛЬНЫЙ ОТЧЁТ — де-шаблонизация 23 концепт-сайтов (Фаза 0–1 закрыты)

**Итог: каждый из 23 сайтов теперь — собственная концепция, а не скин одного движка.** У всех расшаблонены обе клон-сцены: S3 (был угловой card-scatter у всех) и сцена отзывов (S5 или S6 — 3 одинаковые цитаты). Каждый экран проверен скрином.

### ФАЗА 0 — движок (готово)
- `.ps-trans-diagonal` переписан на `--tr-angle` (angle работает); reduced-motion корректно (`--lp:1`, `.ps-trans{display:none}`, hero скомпонован при scroll 0); z-stack вуали над контентом.

### 23 УНИКАЛЬНЫХ ЗАКОНА S3 (≤2 сайта на тип)
вращение(vn) · exploded(bm) · вертикаль(nd) · рост(ec) · рейка(rd) · hazard-лента(hd) · beat-drop(dj) · film-strip(rb) · manga-grid(jc) · photo-album(fk) · video-player(fs) · motion-trail(dn) · editorial-lookbook(cl) · couture-measure(ws) · gilded-gallery(es) · viewfinder(pg) · kakejiku-unroll(jt) · omakase-course-list(jr) · impact-cut/speed-lines(am) · odometer-dossier(cd) · gauge-cluster/needle-sweep(pr) · altitude-profile-drawon(sk) · altimeter-descent(sd).

### 23 УНИКАЛЬНЫХ ФОРМАТА отзывов (S5/S6)
трек-лист(vn) · телеметрия(bm) · буквицы-свеча(nd) · geotag(ec) · ledger(rd) · cop-квитанции(hd) · waveform(dj) · press-collage(rb) · neon(jc) · parchment(fk) · graffiti(fs) · kinetic-echo(dn) · swing-tags(cl) · care-labels(ws) · invitation-cards(es) · EXIF-captions(pg) · hanko-stamps(jt) · kifuda-plaques(jr) · dialogue-bubbles(am) · service-stamps(cd) · lap-timing-board(pr) · piste-signs(sk) · jump-logbook(sd).

### Переходы
Развёл crossfade/curtain/diagonal по всем сайтам (было почти везде crossfade); цвет вуали = фону следующей сцены (проверял свет↔тьму скрином, флэшей нет); последний блок перед футером БЕЗ transitionOut (наш блок остаётся).

### Движковые приёмы (переиспользуемы)
`--lp` на .ps-layer: mask-reveal свитка · draw-line/arc `scaleX`/SVG `stroke-dashoffset` · odometer `translateY(...var(--to)...)` · gauge-needle `rotate(...var(--sw)...)` · descent-marker `top:calc(var(--lp)*100%)` · порог-fade `clamp(0,(var(--lp)-thr)*k,1)`. SVG-тики/дуги через Math+Array.from в client-компоненте; inline CSS-var `{["--x" as string]:N}`.

### Инфра-заметка
Dev = `next dev -p 3011`. Turbopack-watcher может зависнуть (CPU 0, не рекомпилит) — перезапуск: `lsof -tiTCP:3011 -sTCP:LISTEN|xargs kill; nohup node node_modules/.bin/next dev -p 3011 >/tmp/creatly-dev.log 2>&1 &`. Правило: curl-warm + grep нового маркера в HTML перед каждым скрином.

### ОСТАЛОСЬ (опционально, не начато) — на решение владельца
- **ФАЗА 2** — сломать скелет S4/S6 (у большинства S4=data-list/stats, S6=CTA-object; развести форматы ≤2/тип). Крупный объём (~20+ итераций).
- **ФАЗА 3** — мобильная хореография новых S3/S5 (базовое @media проставлено, но не выверено скрином на 390px), реальный a11y (alt на субъект-медиа, реальные href/aria), дочистка legacy CSS (`.xx-quotes/.xx-reviews/.xx-cta-in` — пустые правила остались).

---

## ФАЗА 2 — ломаем скелет S4/S6 (≤2 сайта на формат; последняя сцена без transitionOut)

### Ф2 сайт 1 — Dj ✅
- S4 был head+list (тур-даты, все строки разом). → **routed tour-ignite**: вертикальная ember-линия `df4-line` рисуется `height:calc(var(--lp)*88%)`, 5 городов-узлов `df4-stop` поджигаются по порогам `opacity/box-shadow:clamp(0,(var(--lp)-var(--thr))*8,1)` (thr 0.02/0.16/0.30/0.44/0.58), нода `df4-node` вспыхивает. Скелет «list разом» сломан.
- S6 был object+copy+CTA, вход `y:3vh→0` (как у всех). → вход **fall-in** `from y:-11vh scale1.06 op0 → 0` (падает, под концепт «the fall»). Композиция сохранена, закон входа разведён.
- Реестр Ф2 S4-форматов: tour-route-ignite(dj). S6-входов: fall-in(dj).

### Ф2 сайт 2 — RockBand ✅
- S4 был тур-даты head+list (как dj) → **flyer-wall**: 5 рваных афиш `b4-flyer` (staple + halftone + torn clip-path) «прихлопываются» на стену по очереди — `transform:rotate(var(--rot)) scale(calc(1.14 - clamp(0,(var(--lp)-var(--thr))*7,1)*0.14))` + opacity, thr 0.02..0.50. НЕ tour-route(dj) — свой закон scale-slap. Фикс: убрал negative-margin overlap (z-стек резал текст) → gap.
- S6 был object+copy(y:3vh→0)+CTA → вход copy **scale-punch** `from scale:1.4 op0 → scale1` (слэм, панк). torn-stub объект и CTA сохранены.
- Реестр Ф2 S4: tour-route-ignite(dj), poster-slap-wall(rb). S6-входы: fall-in(dj), scale-punch(rb). Моб @media: флаеры → wrap 2-кол. Дальше: jpclub.

### Ф2 сайт 3 — JpClub ✅
- S4 был line-up head+list → **BPM level-meter**: 4 вечера `j4-night`, у каждого неоновый сегментный уровень-бар `j4-meter>j4-fill` заполняется `transform:scaleX(clamp(0,(var(--lp)-var(--thr))*7,1))` + строка проявляется (thr 0.03/0.18/0.33/0.48), + BPM-readout (128/130/124/132). Закон «bpm-level-meter» (клубный EQ). Скелет list-разом сломан.
- S6 уже был центрированной композицией (гигантский кандзи 入 + copy по центру) — не object-right скелет. Вход разведён: кандзи `from scale.82 rotate-9° → 0`, copy `from scale.9 → 1` (было y:3vh). Композиция «centered + rotate-settle».
- Реестр Ф2 S4: tour-route-ignite(dj), poster-slap-wall(rb), bpm-level-meter(jc). S6-входы: fall-in(dj), scale-punch(rb), rotate-settle/centered(jc). Моб @media: meter → на всю ширину под текстом. Дальше: folkmusic.

### Ф2 сайт 4 — FolkMusic ✅
- S4 был афиша head+list → **letterpress-афиша**: плакат-панель `k4-bill` (золотая рамка + ❧-флероны + шапка) на которую концерты `k4-line` «впечатываются» по очереди — `opacity/transform:scale(calc(1.05 - clamp(0,(var(--lp)-var(--thr))*8,1)*0.05))` (ink-press, thr 0.03/0.18/0.33/0.48), золотые хайрлайны. Формат «letterpress-billboard». Скелет list-разом сломан.
- S6 уже центрирован (красный диск-восход поднимается + copy по центру + CTA). Композиция «sunrise-disc» разведена; вход copy `from y:6vh scale.95 → 0` (было y:3vh).
- Реестр Ф2 S4: tour-route-ignite(dj), poster-slap-wall(rb), bpm-level-meter(jc), letterpress-billboard(fk). S6-входы: fall-in(dj), scale-punch(rb), rotate-settle/centered(jc), sunrise-disc/rise(fk). Моб @media: k4-line 2-кол. Дальше: freestyle.

### Ф2 сайт 5 — Freestyle ✅
- S4 был sessions head+list (светлый bg) → **rgb-glitch-resolve**: 4 сессии `f4-sess` появляются и «сходятся в фокус» — opacity `clamp(...*11...)` (быстро), а хроматический RGB-split (red/cyan text-shadow) сходится медленнее `clamp(...*3...)*0.82` → строка влетает глитчем и резко фокусируется (thr 0.04/0.20/0.36/0.52). Скатерский glitch-приём сайта. Скелет list-разом сломан.
- S6 «DROP IN.» big-type-centered (не object-right) → вход разведён на **kinetic side-slide** `from x:-8vw rotate:-3° scale1.08 → 0` (было scale1.06). RGB-split shadow + скан сохранены.
- Реестр Ф2 S4: +rgb-glitch-resolve(fs). S6-входы: +side-slide/kinetic(fs). Моб @media: f4-sess 2-кол. Дальше: dance.

### Ф2 сайт 6 — Dance ✅
- S4 был timetable head+list → **beat-count snap**: 4 класса `d4-cls`, у каждого большая розовая доля-цифра `d4-count` (1/2/3/4) снапает `transform:scale(calc(0.5+clamp(0,(var(--lp)-var(--thr))*11,1)*0.5))` + строка въезжает translateX (thr 0.04/0.20/0.36/0.52). «Счёт на 1-2-3-4», танц-приём. Скелет list-разом сломан.
- S6 «FIND YOUR LINE» object(пуанты)+copy → вход copy **wipe-reveal** `clip-path:inset(0 calc((1-var(--lp))*100%) -20% 0)` (открывается слева-направо), Layer opacity 1→1. Пуанты-объект сохранён.
- Реестр Ф2 S4: +beat-count(dn). S6-входы: +wipe-reveal(dn). Моб @media: d4-cls 3-кол. Дальше: clothing (мода).

### Ф2 сайт 7 — Clothing ✅ (мода)
- S4 был атэлье-этапы head+steps (на fg-parallax фото) → **seam-stitch reveal**: пунктирная нить-шов `cl4-thread` прострачивается вниз `height:calc(var(--lp)*86%)` (`repeating-linear-gradient` = стежки), 3 этапа `cl4-stitch` (i Measure/ii Cut/iii Keep) проявляются на узлах-стежках `cl4-knot` по порогам (0.05/0.28/0.50). Под концепт «every seam finished by hand». Скелет steps-разом сломан.
- S6 «Make it your style» уже bespoke композиция (стеклянный shard + зеркальная типо «your style») → вход copy **rise** `from y:7vh scale.96 → 0` (было y:3vh). Shard+mirror сохранены.
- Реестр Ф2 S4: +seam-stitch(cl). S6-входы: +rise/mirror-shard(cl). Моб @media: cl4-stitch 30px-кол. Дальше: womensuit.

### Ф2 сайт 8 — WomenSuit ✅ (мода)
- S4 был bespoke-steps head+steps → **swatch-fan spread**: 3 карточки-образца ткани `w4-swatch` (fabric-блок с twill-текстурой + i/ii/iii + этап) раскрываются как веер-дек портного вокруг нижней оси — `transform:translateX(calc(var(--tx)*active)) rotate(calc(var(--rot)*active))` (--tx ±15vw, --rot ±9°, active=clamp по --lp-thr), thr 0.05/0.20/0.34. Фикс: чистый rotate-веер прятал текст боковых карт за центральной → добавил translateX (hand-of-cards splay). Свотчи: blush/plum-wool/ivory. Закон «swatch-fan». Скелет сломан.
- S6 «Made to your measure» object(ножницы+сантиметр)+copy → вход copy **fall-in** `from y:-8vh scale1.04 → 0` (было y:3vh).
- Реестр Ф2 S4: +swatch-fan(ws). S6-входы: fall-in теперь 2/2 (dj, ws). Моб @media: веер → вертикальный стек (transform:none). Дальше: escort.

### Ф2 сайт 9 — Escort ✅ (мода)
- S4 (discretion — 3 этикет-шага, появлялись разом; центр-композиция с золотой нитью e4-rule) → **spotlight-iris reveal**: каждый шаг `e4-pt` раскрывается спот-ирисом `clip-path:ellipse(calc(active*82%) 130% at 50% 50%)` + opacity, active=clamp по --lp-thr (0.05/0.26/0.47). Под hero-приём «spotlight-cone». Скелет appear-together сломан.
- S6 «Never arrive alone» seal(конверт с сургучом)+copy → seal **wax-press** `from scale1.4 rotate9° → scale1 rotate-4°` (печать впечатывается) + copy **rise** `from y:7vh scale.96 → 0`.
- Реестр Ф2 S4: +spotlight-iris(es). S6-входы: rise теперь 2/2 (cl, es) + seal-press. Дальше: photographer.

### Ф2 сайт 10 — Photographer ✅ (мода 4/4 · кластер закрыт)
- S4 был «what I shoot» index head+list (6 рядов) → **focus-rack**: каждый ряд `p4-line` наводится на резкость `filter:blur(calc((1-clamp(0,(var(--lp)-var(--thr))*4.5,1))*6px))` (blur медленно), opacity быстро (*12) — последовательно сверху вниз (thr 0.02..0.52), как фотограф крутит фокус. На 0.4 верх резкий, низ размыт. Формат «focus-rack». Скелет list-разом сломан.
- S6 «Let's chase the light» камера+copy → вход copy **aperture-iris** `clip-path:circle(calc(clamp(0,var(--lp)*1.5,1)*96%) at 24% 46%)` (диафрагма раскрывается). Камера-объект сохранён.
- Реестр Ф2 S4: +focus-rack(pg). S6-входы: +aperture-iris(pg). Моб @media обновлён. МОДА 4/4 ✅. Дальше: ЯПОНИЯ jptattoo → jprestaurant → anime.

### Ф2 сайт 11 — JpTattoo ✅ (Япония)
- S4 «the way» 3 этапа head+steps (一/二/三) на mustard → **sumi brush-wipe**: каждый этап `jt4-way` прописывается мягкой маской слева-направо `mask:linear-gradient(90deg,#000 0,#000 calc(active*100%),transparent calc(active*100% + 9%))` (мягкий brushy край), active=clamp по --lp-thr (0.05/0.25/0.45). Формат «brush-wipe». Скелет sequential.
- S6 «Wear the story» (гигант-кандзи 彫 + красное солнце + brush + copy) → вход copy **side-slide/brush** `from x:-7vw rotate:-2° → 0` (мазок). Кандзи/солнце/кисть сохранены.
- Реестр Ф2 S4: +brush-wipe(jt). S6-входы: side-slide теперь 2/2 (fs, jt). Дальше: jprestaurant.

### Ф2 сайт 12 — JpRestaurant ✅ (Япония)
- S4 一期一会 3 «пути» head+steps (был статичный enso-div) → **enso-draw**: вермилионовый круг 円相 `jr4-enso2 circle` (pathLength=100) прорисовывается кистью `stroke-dashoffset:calc(100-clamp(0,var(--lp)*1.18,1)*94)` (94% = аутентичный разрыв энсо внизу), три пути `jr4-step2` (一/二/三) проявляются ВНУТРИ по порогам (0.30/0.48/0.66). На 0.45 энсо полукруг, One counter виден, No menu появляется, One evening скрыт. Формат «enso-draw». Скелет сломан.
- S6 «Sit at the counter» (ханко 結 + enso) → вход copy **rotate-settle** `from scale.94 rotate-3° → 0` (было y:3vh).
- Реестр Ф2 S4: +enso-draw(jr). S6-входы: rotate-settle теперь 2/2 (jc, jr). Дальше: anime (Япония 3/3).

### Ф2 сайт 13 — Anime ✅ (Япония 3/3 · кластер закрыт)
- S4 «in this issue» contents head+list (4 ряда с p.NN) → **manga-swoosh**: пункты `am4-item` влетают с разных сторон `translateX(calc(var(--dir)*(1-active)*46px))` (--dir ±1 попеременно) + спид-стрик `am4-streak` (repeating-linear-gradient hot-pink, маска, гаснет), opacity быстро, thr 0.04/0.20/0.36/0.52. На 0.45 ряды 01-03 на месте, 04 влетает слева со стриком. Формат «manga-swoosh». Скелет сломан.
- S6 «Start watching» (кандзи 咲 + play-кнопка) → вход copy **scale-punch** `from scale1.4 → 1` (манга-импакт).
- Реестр Ф2 S4: +manga-swoosh(am). S6-входы: scale-punch теперь 2/2 (rb, am). ЯПОНИЯ 3/3 ✅. Дальше: cardealer (проверить/пропуск).

### Ф2 сайт 14 — CarDealer ⏭️ ПРОПУСК (уже bespoke)
- S4 (c4-scene) = mirror-floor showroom, 3 машины `c4-car` (side/side/hero, разные phase) + дата-каллауты `c4-spec` (phase [0.24,0.72]) — НЕ head+list-разом, уже bespoke композиция.
- S6 (c6-scene) = service-stamps (переделан в Фазе 1: 3 записи + круглые штампы press-in) — не object+copy-скелет.
- Оба разведены. cardealer не трогаем.

### Ф2 сайт 15 — Porsche ✅ (авто/природа)
- S4 «the numbers» 4 спека head+stats (появлялись разом) → **rev-sweep**: магента-полоса `pr4-sweep` (radial-glow, screen-blend) проходит по спекам `left:calc(var(--lp)*100% - 5.5vw)`, спеки `pr4-spec` загораются dim→bright `opacity:calc(0.22+clamp(...)*0.78)` по порогам L→R (0.10/0.28/0.46/0.64). На 0.45 глоу на «510ps», 3.4/9000 ярко, «1» ещё тускло. Формат «rev-sweep» (тахо-зажигание). Скелет сломан.
- S6 «Take the 911» (машина+ghost 911) → вход copy **zoom-blur** `scale1.28→1` (Layer) + `filter:blur(calc((1-clamp(0,var(--lp)*1.7,1))*9px))` (CSS) = скоростной зум-блюр.
- Реестр Ф2 S4: +rev-sweep(pr). S6-входы: +zoom-blur(pr). Дальше: skisnow.

### Ф2 сайт 16 — SkiSnow ✅ (авто/природа)
- S4 rentals прайс-лист head+list → **cobalt-marker sequential reveal**: 4 прайс-ряда `sk4-price` открываются по очереди (opacity+translateY по порогам 0.05/0.22/0.39/0.56), у каждого кобальт-маркер `::before` `scaleY(clamp(...))` вырастает слева (Swiss-modernist). На 0.4 три ряда с маркерами, Season Pass скрыт. Скелет сломан. (Первая попытка mask-block-sweep багнула — заменил на надёжный marker+reveal.)
- S6 «Chase the white light» (пики+copy) → вход copy **curtain-part** `clip-path:inset(0 calc((1-active)*50%) -15% calc((1-active)*50%))` (раскрытие из центра).
- Реестр Ф2 S4: +cobalt-marker-reveal(sk). S6-входы: +curtain-part(sk). Дальше: skydive.

### Ф2 сайт 17 — Skydive ✅ (авто/природа · кластер закрыт)
- S4 «how you jump» 3 уровня head+list → **exit-drop**: уровни `sd4-level` падают сверху `translateY(calc((1-clamp(...*7))*-42px))` + opacity(быстро *10) на место, последовательно (thr 0.05/0.26/0.47) — джамперы выходят. Скелет сломан.
- S6 «Take the first fall» (портал-перевёрнутые-горы центр, уже центр-композиция) → вход copy **center-punch** `from scale0.7 → 1` (вырастает из центра).
- Реестр Ф2 S4: +exit-drop(sd). S6-входы: +center-punch(sd). АВТО/ПРИРОДА закрыт. Дальше: ранние — vinyl → bmw → notredame → ecology → redsuit → hoodie.

### Ф2 сайт 18 — Vinyl ✅ (ранние)
- S4 «the nights» сессии head+list → **groove-reveal**: ряды `v4-night` въезжают `translateX(-24px→0)` + амбер-грув `::after` прочерчивается под каждым `scaleX(clamp(...))`, последовательно (thr 0.05/0.22/0.39/0.56). На 0.4 три ряда с грувами, SUN скрыт. Под концепт «дорожки пластинки». Скелет сломан.
- S6 «Come for side B» (пластинка вращается 0→180° flip) → вход copy **spiral** `from rotate:-10° scale0.88 → 0` (закручивается как винил). Record-flip сохранён.
- Реестр Ф2 S4: +groove-reveal(vn). S6-входы: +spiral(vn). Дальше: bmw.

### Ф2 сайт 19 — Bmw ✅ (ранние)
- S4 «the numbers» спек-лист head+list (5) → **aperture-lock**: каждый спек `bm4-spec` проявляется + синяя апертур-рамка `::before` `transform:scale(1.16→1)` фиксируется вокруг него (opacity гаснет к 0.55 = остаётся тонкая blueprint-рамка), последовательно (thr 0.04/0.18/0.32/0.46/0.60). На 0.4 три зафиксированы, Engine-рамка крупнее (лочится), Kerb скрыт. Под hero-приём aperture-скобы. Скелет сломан.
- S6 «Feel the redline» (машина+copy) → вход copy **unfold-down** `clip-path:inset(0 0 calc((1-active)*100%) 0)` (разворачивается сверху вниз).
- Реестр Ф2 S4: +aperture-lock(bm). S6-входы: +unfold-down(bm). Дальше: notredame.

### Ф2 сайт 20 — NotreDame ✅ (ранние)
- S4 «plan your visit» расписание head+list → **glass-illuminate**: визиты `nd4-visit` загораются из тьмы в свет `opacity:calc(0.1+clamp(...)*0.9)` + золотой radial-glow `::after` проявляется слева (свеча/витраж), последовательно (thr 0.05/0.22/0.39/0.56). На 0.4 три горят, Vespers ещё тёмный. Под готику/витраж. Скелет сломан.
- S6 «Enter the light» (роза-витраж крутится 0→60°) → вход copy **aperture-iris** `clip-path:circle(calc(clamp(0,var(--lp)*1.5,1)*96%) at 22% 44%)` (свет раскрывается ирисом). Роза сохранена.
- Реестр Ф2 S4: +glass-illuminate(nd). S6-входы: aperture-iris теперь 2/2 (pg, nd). Дальше: ecology.

### Ф2 сайт 21 — ecology ✅ (grow-up)
- **S4** «the impact» (3 метрики 2.4m/30yr/94% появлялись разом) → **grow-up**: метрики поднимаются снизу (translateY+opacity) последовательно (thr 0.06/0.24/0.42), у каждого числа зелёный бар-побег `b::before` scaleY-снизу + подчёркивание `::after` scaleX — прорастают как деревья. Скелет сломан. Проверено @0.4 (2.4m/30yr горят, 94% ещё тёмный) и @0.72 (все три).
- **S6** «grow a forest.» (капсула-лес) → вход copy **wipe-reveal** (`clip-path:inset(0 …*100% -14% 0)` слева-направо, opacity 1→1). Капсула-объект без изменений. Проверено @0.4/@0.72 (чисто, без клип-артефактов).
- Реестр: S4 +grow-up(ec) [20]. S6-входы: wipe-reveal 2/2 (dn,ec).
- Прогресс Ф2: **21/23**. Осталось: redsuit, hoodie.

### Ф2 сайт 22 — redsuit ✅ (cut-line)
- **S4** «the cut» (3 шага i/ii/iii The red/cut/finish появлялись разом) → **cut-line**: каждый шаг въезжает слева (translateX -32→0 + opacity fast*11), по левому краю сползает светящийся red-клинок `::before` scaleY-сверху (`#e8676f` glow) — как разрез вдоль шва, последовательно (thr 0.06/0.22/0.38). Скелет сломан. Проверено @0.4 (i въехал, ii клинок сползает, iii ещё тусклый) и @0.72 (все три, клинок вдоль шва).
- **S6** «Wear the room.» (мужчина в костюме) → вход copy **split-part** (`clip-path:inset(…*50% 0 …*50% 0)` — раскрытие из горизонтальной центральной щели вверх-вниз, театрально). Мужчина-объект без изменений. Проверено @0.4/@0.72 (чисто).
- Реестр: S4 +cut-line(rd) [21]. S6-входы: +split-part(rd=1).
- Прогресс Ф2: **22/23**. Осталось: hoodie (последний), затем Фаза 3.

### Ф2 сайт 23 — hoodie ✅ (ticker-slide) — ФАЗА 2 ЗАКРЫТА
- **S4** «the spec / read the tag» (5 строк спеки появлялись разом) → **ticker-slide**: строки въезжают поочерёдно слева/справа встречно (translateX ±44px по `--dir`, opacity fast*12) — эхо кинетик-тикера героя; у каждой строки safety-yellow index-таб `::before` scaleY-снизу. Скелет сломан. thr 0.04/0.14/0.24/0.34/0.44. Проверено @0.4 (Weight/Cotton/Fit въехали, Run таб растёт, Restock ждёт) и @0.72 (все 5).
- **S6** «Cop it or miss it.» (гармент + тикер) → вход copy **swing** (transform-origin top-left, rotate -8°→0 — как раскачивающийся hangtag; opacity fast). Гармент/тикер без изменений. Проверено @0.4 (наклон виден) / @0.72 (вертикально).
- Реестр: S4 +ticker-slide(hd) [22]. S6-входы: +swing(hd=1).

## ФАЗА 2 — ИТОГ
Все 22 неповторяющихся сайта разведены (cardealer bespoke-пропуск). S4-скелет (`xx4-list/stats/steps/points` fade-разом) сломан у всех — 22 уникальных закона движения. S6-вход разнесён — ни одного дубля >2. Каждый экран проверен скрином @0.4+@0.72. Дальше → Фаза 3 (мобилка / a11y / legacy CSS).

## ФАЗА 3.1 — МОБИЛКА (390px)
Создан `analitic/inspiration/shot-mobile.mjs` (390×844, DSF2, isMobile; вывод `m-<slug>-scene<i>.jpg`; опц. 4-й арг = один индекс сцены). Оригинал shot-scenes не тронут.

### Батч 1 — hoodie / redsuit / ecology / womensuit (S4 @390px)
- **hoodie hd4** ✅ чисто — 5 строк стекаются, yellow-табы, без наложений.
- **redsuit rd4** ✅ чисто — 3 шага стекаются, red-клинок слева, текст переносится.
- **ecology ec4** 🔧 было: 3 метрики разбросаны почти на свайп (flex-wrap в высоком контейнере) → `@media` `.ec4-stats{flex-direction:column;flex-wrap:nowrap;align-items:center;justify-content:center;gap:6vh}` — теперь связная центр-колонка. Проверено.
- **womensuit w4** 🔧 было: заголовок «Two fittings…» НАЛЕЗАЛ на первую swatch-карту (голова top + веер center, 3 высокие карты на мобиле) → `@media` `.w4-head{display:none}` (карты несут i/ii/iii+титул) + `.w4-fanL{align-content:center}` + cloth 12vh, swatch 74vw. Проверено — 3 карты чисто.
- Desktop не затронут (правки только в `@media(max-width:900px)`).

### Батч 2 — porsche / skisnow / bmw / notredame (S4 @390px)
- **porsche pr4** ✅ чисто — 2×2 сетка чисел (3.4s/9000/510ps/1) + подпись, без наложений.
- **skisnow sk4** ✅ чисто — голова + 4 строки проката с cobalt-маркерами, разделено.
- **bmw bm4** ✅ чисто — голова + 5 spec-строк в reticle-рамках (aperture-lock), читаемо.
- **notredame nd4** ✅ чисто — голова + 4 visit-строки с золотым glow, время/действие/титул без коллизий.
- Фиксов не потребовалось — существующие `@media(max-width:900px)` уже держат 390px.

### Батч 3 — dj / rockband / jpclub / folkmusic / freestyle (S4 @390px)
- **dj dj4** ✅ чисто — голова + 5 дат тура с ember-route линией и нодами, TICKETS/SOLD OUT.
- **rockband rb4** ✅ чисто — 5 рваных флаеров (2-2-1 сетка), степлеры + tickets.
- **jpclub jc4** ✅ чисто — 4 ночи с неоновыми BPM-метрами.
- **folkmusic fk4** ✅ чисто — обрамлённый афиша-биллборд, 4 события.
- **freestyle fs4** ✅ чисто — 4 сессии день/время + название.
- Фиксов не потребовалось. (Прим.: слаги концепт-сайтов — полные имена: rockband/jpclub/folkmusic/freestyle, НЕ rb/jc/fk/fs.) Dev-бейдж «1 Issue» — безобидный dev-индикатор, все роуты 200.

### Батч 4 — dance / clothing / escort / photographer / jptattoo (S4 @390px)
- **dance dn4** ✅ чисто — голова + 4 класса с крупными count-числами, день/время/места.
- **clothing cl4** ✅ чисто — 3 шага с пунктирным seam-stitch + узлы поверх фото-ателье, текст переносится.
- **escort es4** ✅ чисто — 3 центр-шага с золотой center-линией.
- **photographer pg4** ✅ чисто — 6 категорий с буквенным индексом.
- **jptattoo jt4** ✅ чисто — 3 шага с red stroke-count марками.
- Фиксов не потребовалось.

### Батч 5 — jprestaurant / anime / skydive / vinyl (S4 @390px)
- **jprestaurant jr4** ✅ чисто — enso-круг + 3 шага (一/二/三); 3-й «One evening» входит позже (thr 0.66), проверено @0.85 — все три помещаются, круг обрамляет, без наложений.
- **anime am4** ✅ чисто — 4 строки оглавления с номерами страниц.
- **skydive sd4** ✅ чисто — 3 типа прыжка, текст переносится.
- **vinyl vn4** ✅ чисто — 4 ночи с amber-грувами.
- Фиксов не потребовалось.

## ФАЗА 3.1 — ИТОГ (МОБИЛКА 390px ЗАКРЫТА)
Прогнаны S4 всех 22 разведённых сайтов на 390×844 DSF2 (создан `shot-mobile.mjs`). Реальных багов: **2** — ecology (метрики разбросаны → центр-колонка) и womensuit (заголовок налезал на swatch-карту → скрыт на мобиле + карты ужаты). Остальные 20 держат мобилку из существующих `@media(max-width:900px)` без правок. cardealer (bespoke, не менялся в Ф2) — пропуск. Desktop нигде не тронут. Дальше → 3.2 a11y.

## ФАЗА 3.2 — A11Y

### Шаг A — инвентаризация + находки
- **reduced-motion: УЖЕ РЕАЛИЗОВАН на уровне движка** (`components/parallax-scene/parallax-scene.tsx` useSceneProgress, стр.96-98): при `prefers-reduced-motion:reduce` замораживает `--sp=0.84` (контент раскрыт, до перехода 0.86) и не вешает scroll/cursor RAF. Проверено эмуляцией reducedMotion (ecology S4 — все метрики видимы, не пусто). Создан `analitic/inspiration/shot-reduce.mjs`. → Шаг B НЕ требуется.
- **SceneMedia уже принимает `alt`** (стр.61, default ""). 267 usages, 0 с alt. Декоративный фон/текстура → `alt=""` корректно (не трогать). Работа: осмысленный alt только СУБЪЕКТ-медиа (hero-фигура/model/man/garment/capsule/car) — ~2-4 на сайт. → Шаг C.
- **href="#"**: 69 шт по 23 файлам. Это плейсхолдер-навигация + CTA (`.xx-btn` с `onClick={stop}`=preventDefault). CTA уже имеют видимый текст (доступное имя) и focusable (a[href]); в showcase-контексте назначения нет. → Шаг D опционален (низкий приоритет): добавить `aria-label` где иконка без текста; массовую замену на <button> НЕ делать (риск сломать стили/сместить nav-семантику).

ПЛАН: Шаг C (alt субъект-медиа, пачками 5-6 сайтов) → Шаг D (точечно aria где нужно) → 3.3 cleanup.

### Шаг C — alt субъект-медиа, пачка 1 (ecology redsuit hoodie womensuit porsche skisnow)
Проставлен осмысленный alt субъект-cutout'ам (hero/S2/S6-объект), декор (bg/texture/blossom/leaves/pins) — alt="" (корректно).
- ecology(3): capsule «Glass capsule holding a miniature living forest».
- redsuit(3): man «Man wearing a crimson tailored suit».
- hoodie(5): garment «Heavyweight streetwear hoodie», model «Model wearing the hoodie, hood up».
- womensuit(4): figv «Woman in a tailored suit», shears «Tailor's shears».
- porsche(3): car «Porsche 911 sports car in profile».
- skisnow(4): figure «Skier in winter gear», peaks «Snow-capped mountain peaks».
Итого 22 alt. Все 6 сайтов 200, JSX цел. Прим.: S3-галерейные g*.jpg имеют смежные `<b>`-подписи (контекст для SR), alt по ним опущен.

### Шаг C — alt субъект-медиа, пачка 2 (bmw notredame dj rockband jpclub folkmusic)
- bmw(4): car «BMW M sports car in profile».
- notredame(6): rose «Notre-Dame stained-glass rose window», cathedral «Notre-Dame cathedral facade at dusk».
- dj(2): angel «Winged figure lit on the stage» (embers-fg — decor "").
- rockband(2): wrapfig «Performer wrapped in stage light», stub «Torn concert ticket stub».
- jpclub(2): figure «Figure in neon club light» (petals — decor "").
- folkmusic(1): figure2 «Folk singer in traditional dress».
Итого 17 alt. Все 6 сайтов 200, JSX цел. Накопительно Шаг C: 39 alt (12 сайтов).

### Шаг C — alt субъект-медиа, пачка 3 (freestyle dance clothing escort photographer jptattoo)
- freestyle: skater «Skateboarder mid-trick» (graffiti/bg — decor).
- dance(5): dfig «Dancer mid-movement» ×4, pointeobj «Ballet pointe shoes» (dancer-cut S3-эхо — оставлен "", есть подписи).
- clothing(2): model «Model in a tailored look» (shard/bg/atelier — decor).
- escort(3): figure «Woman in an evening gown», couple «Couple at a formal event», seal «Wax seal».
- photographer(7): coverportrait «Portrait photograph», camera «Camera», shot1 «Backlit portrait photograph», shot2 «Golden-hour couple photograph», shot3 «Cliffside engagement photograph at dawn».
- jptattoo(5): figure «Figure with traditional Japanese tattoos», brush «Calligraphy brush» ×3.
Все 6 сайтов 200, JSX цел.

### Шаг C — alt субъект-медиа, пачка 4 ФИНАЛ (jprestaurant anime skydive vinyl cardealer)
- jprestaurant(4): chef «Sushi chef at the counter», dish «Plate of fresh sushi».
- anime(2): hero «Anime heroine character» (petals — decor).
- skydive(3): figure «Skydiver in freefall» (sky/mountains — decor bg).
- vinyl(4): record «Vinyl record», cover «Album cover portrait».
- cardealer(6): car «Classic car in profile», car2 «…three-quarter view», car3 «…rear view», dustsheet «Car under a dust sheet».
Все 5 сайтов 200.

## ШАГ C — ИТОГ: 80 осмысленных alt на субъект-медиа по всем 23 сайтам (декор — alt="" корректно). Все роуты 200.

### Прим. cardealer.css gradient-text (стр.58 `.cp-word span`, стр.111 `.c3-word span`)
Design-hook флажок. Проверено: это гигантские бренд-вордмарки (clamp 74-244px / 90-270px, uppercase display, Space Grotesk) — намеренная декоративная типографика концепта (occlusion-титул; стр.111 — тёмный низкоконтрастный водяной знак-подложка). Не body/UI-текст, читаемо в таком кегле. Пре-существующее дизайн-решение (не вводилось в этой работе). РЕШЕНИЕ: оставить как есть — рестайл сломал бы намеренную айдентику, вне задачи motion/a11y.

### Шаг D — aria (ИНВЕНТАРИЗАЦИЯ) — 3.2 ЗАКРЫТА
Осмотрено: 0 `<button>`, 0 icon-only onClick, 0 безымянных интеракт-элементов. Все интерактивы — текстовые `<a href="#" onClick={stop}>` (nav+CTA имеют видимый текст = доступное имя). Nav-лендмарки уже с `aria-label="Основная навигация"` (23/23). aria-label добавлять НЕ требуется (0). → ФАЗА 3.2 A11Y ЗАКРЫТА (reduced-motion в движке + 80 alt + семантика nav/CTA чиста).

## ФАЗА 3.3 — CLEANUP мёртвого legacy CSS

### Пачка 1 (dj rockband jpclub folkmusic freestyle dance)
Удалены standalone-orphan правила от снятых Ф1-сцен (quotes/reviews/cta-in), сверено отсутствие класса в парном tsx (=0):
- dj: `.dj-cta-in .dj-eyebrow`, `.dj-quotes .dj-eyebrow` (+comment).
- rockband: `.rb-cta-in .rb-eyebrow`, `.rb-quotes .rb-eyebrow`.
- jpclub: `.jc-cta-in .jc-eyebrow`, `.jc-reviews .jc-eyebrow`.
- folkmusic: `.fk-quotes .fk-eyebrow` (+comment).
- freestyle: `.fs-reviews .fs-eyebrow` (+comment).
- dance: `.dn-reviews .dn-eyebrow` (+comment).
Все 6 сайтов 200.
Прим.: интерливленные `.xx-poster .xx-quote/-review/-cta-in` (theme-override под живым `.xx-poster`-скином, среди живых `.gcard/.bill/.brow` правил) — оставлены как безобидный мёртвый CSS; хирургическое удаление среди живых правил = риск без пользы.

### Cleanup пачка 2 (clothing womensuit escort photographer jptattoo jprestaurant)
Удалены standalone-orphan legacy правила (сверено tsx=0):
- clothing: `.cl-cta-in .cl-eyebrow`.
- womensuit: `.ws-cta-in .ws-eyebrow`, `.ws-quotes .ws-eyebrow`.
- escort: `.es-cta-in .es-eyebrow`, `.es-quotes .es-eyebrow`.
- photographer: `.pg-cta-in .pg-eyebrow`, `.pg-quotes .pg-eyebrow`.
- jptattoo: `.jt-cta-in .jt-eyebrow`, `.jt-reviews .jt-eyebrow`.
- jprestaurant: `.jr-cta-in .jr-eyebrow`, `.jr-quotes .jr-eyebrow`.
Итого 11 орфанов. Все 6 сайтов 200. Накопительно 3.3: 20 удалённых орфанов.

### Cleanup пачка 3 (anime porsche skisnow skydive vinyl bmw)
Удалены standalone-orphan legacy правила (по 2, сверено tsx=0):
- anime: `.am-cta-in`, `.am-reviews` .eyebrow.
- porsche: `.pr-cta-in`, `.pr-reviews` .eyebrow.
- skisnow: `.sk-cta-in`, `.sk-reviews` .eyebrow.
- skydive: `.sd-cta-in`, `.sd-quotes` .eyebrow.
- vinyl: `.vn-cta-in`, `.vn-quotes` .eyebrow.
- bmw: `.bm-cta-in`, `.bm-quotes` .eyebrow.
Итого 12 орфанов. Все 6 сайтов 200. Накопительно 3.3: 32 удалённых орфана.

### Cleanup пачка 4 ФИНАЛ (notredame ecology redsuit hoodie cardealer)
Удалены standalone-orphan legacy правила (сверено tsx=0):
- notredame: `.nd-cta-in`, `.nd-reviews` .eyebrow.
- ecology: `.ec-cta-in`, `.ec-reviews` .eyebrow.
- redsuit: `.rd-cta-in`, `.rd-reviews` .eyebrow. (⚠ `.rd-quote p` — ЖИВОЙ в tsx, оставлен.)
- hoodie: `.hd-cta-in`, `.hd-reviews` .eyebrow.
- cardealer: `.cd-reviews .cd-eyebrow`. (⚠ `.cd-cta-in`-блок — ЖИВОЙ в tsx, оставлен.)
Итого 9. Все 5 сайтов 200.

## ФАЗА 3.3 — ИТОГ: удалён 41 standalone-orphan legacy CSS-правило по всем 23 css. Живые классы (rd-quote, cd-cta-in) и интерливленные `.xx-poster`-оверрайды сохранены осознанно. Все роуты 200.

---

## ФИНАЛЬНЫЙ ОТЧЁТ — ДЕ-ШАБЛОНИЗАЦИЯ 23 АНИМ-САЙТОВ ЗАВЕРШЕНА

**ФАЗА 1** (ранее): S3 и сцена отзывов разведены у всех 23 — каждый со своим форматом.

**ФАЗА 2** — сломан общий S4-скелет (`xx4-list/stats/steps` fade-разом) и разнесены S6-входы у 22 неповторяющихся сайтов; cardealer — bespoke-пропуск. 22 уникальных закона S4:
tour-route-ignite(dj), poster-slap-wall(rockband), bpm-level-meter(jpclub), letterpress-billboard(folkmusic), rgb-glitch-resolve(freestyle), beat-count(dance), seam-stitch(clothing), swatch-fan(womensuit), spotlight-iris(escort), focus-rack(photographer), brush-wipe(jptattoo), enso-draw(jprestaurant), manga-swoosh(anime), rev-sweep(porsche), cobalt-marker-reveal(skisnow), exit-drop(skydive), groove-reveal(vinyl), aperture-lock(bmw), glass-illuminate(notredame), grow-up(ecology), cut-line(redsuit), ticker-slide(hoodie).
S6-входы разнесены ≤2/формат (fall-in/scale-punch/rotate-settle/rise/side-slide/wipe-reveal/aperture-iris/sunrise/zoom-blur/curtain-part/center-punch/spiral/unfold-down/split-part/swing). Каждый экран проверен скрином @0.4+@0.72.

**ФАЗА 3.1** — мобильная хореография 390px по всем сайтам (создан `analitic/inspiration/shot-mobile.mjs`). 2 реальных фикса: ecology (метрики → центр-колонка), womensuit (заголовок налезал на swatch → скрыт на мобиле). Остальные 20 держат из существующих `@media`. Desktop не тронут.

**ФАЗА 3.2 a11y** — reduced-motion уже корректно в движке `parallax-scene` (заморозка `--sp=0.84`, проверено `shot-reduce.mjs`); 80 осмысленных `alt` на субъект-медиа по 23 сайтам (декор — `alt=""`); nav-лендмарки с `aria-label`; 0 безымянных интеракт-элементов (все CTA/ссылки текстовые). cardealer gradient-вордмарки оставлены осознанно (намеренная айдентика).

**ФАЗА 3.3** — удалён 41 мёртвый legacy CSS-orphan (от снятых Ф1-сцен quotes/reviews/cta-in); живые классы и `.xx-poster`-оверрайды сохранены.

**ИТОГ:** 23 анимированных концепт-сайта — каждый самостоятельный концепт со своим законом движения, а не скин одного движка. Смотреть `/visual-hooks/<slug>`.

---
## ВЕТКА STORY — сторителлинг-журналы тату-мастера (новое)
Роут `/story` (галерея) + `/story/<slug>`. Один скролл перелистывает журнал работ; движок переиспользован из parallax-scene. Русский, без ИИ (пины + CSS/SVG). Закладки-объекты (`bookmarks.tsx`: носок/трусы/резинка/пластырь/скотч/жвачка) торчат из края как контакт-CTA, разные на каждой странице. Скрины `analitic/inspiration/shot-story.mjs`.

### story/vision ✅ (Ева Зорина) — pink/чёрный глянцевый editorial
Обложка-постер (пин exmp1) + приветствие «Привет. Я Ева», 3 разворота (Стекло/Шипы/Крыло) с **page-turn** (rotateY от корешка), fine-line флэш draw-on, финал-запись. Playfair Display + Manrope + DM Mono.

### story/shadows ✅ (Марк Тень) — красный грандж-оккульт-зин
Обложка-постер (пин exmp2) + «Я — Марк. Тень по коже» (blackletter Pirata One), 3 разворота (Нимб/Ворон/Крест) с входом **чернильный залив** (clip-circle expand — НЕ page-turn), жёсткий костяной флэш draw-on, барокод/×××-декор, зерно-оверлей. Свои объекты закладок (скотч/резинка/жвачка/пластырь). Проверено @0.55 обложка+разворот, 200.

Осталось: solitude (ренессанс+техно), затем мобилка всех 3.

### story/solitude ✅ (Лия Морн) — ренессанс-портрет + техно-декор
Обложка-постер (пин exmp3) + «Здравствуй. Я Лия» (Playfair + золотой италик), 3 разворота (Портрет/Роза/Жемчуг) с входом **техно-скан** (clip сверху-вниз + золотая линия-сканер — 3-й уникальный вход), тонкий золотой fine-line флэш draw-on, техно-бэйджи DOLBY/WAV/MP3/[+]/✦/barcode, палитра тёмный+золото. Свои объекты закладок. Проверено @0.55 обложка+разворот, 200.

## ВЕТКА STORY — 3/3 сайта готовы. Три разных входа разворотов: page-turn(vision) · ink-flood(shadows) · техно-скан(solitude). Осталось: мобилка + индекс-скрин.

### Полировка — мобилка + индекс
- Мобилка 390px всех 3: обложки — приветствие налезало на текст постера → добавлен нижний **скрим** в `@media` у `.{vs,sh,so}-cover-hi` (linear-gradient bg → transparent), теперь читаемо. Развороты: правая SVG-страница скрыта (`.page-r{display:none}`), левая читается, закладки-объекты торчат не перекрывая текст — чисто. Проверено vision/solitude @0.5, shadows.
- Индекс `/story`: 3 карточки (постеры-мастера, акцент-заголовки, имена, описания), заголовок «Сторителлинг-журналы». Desktop 3-кол, мобилка 1-кол (`shot-index.mjs`). Чисто.

## ВЕТКА STORY — ГОТОВА (3/3 + полировка)
Новая ветка сторителлинг-журналов тату-мастера: `/story` (галерея) + 3 сайта, каждый — самостоятельная стилистика с уникальным входом разворотов:
- **vision** (Ева Зорина) — pink глянцевый editorial, page-turn (rotateY от корешка), fine-line флэш.
- **shadows** (Марк Тень) — красный грандж-оккульт-зин, blackletter, чернильный залив (clip-circle), костяной флэш, барокод/×××.
- **solitude** (Лия Морн) — ренессанс+техно, золото, техно-скан (clip сверху-вниз + линия-сканер), золотой fine-line, DOLBY/WAV/barcode.
Общее: обложка-постер из пина + приветствие, 3 журнальных разворота работ, финал-запись, footer. Фишка — **закладки-объекты** (носок/трусы/резинка/скотч/жвачка/пластырь) торчат из края как контакт-CTA, разные на каждой странице. Русский. Движок переиспользован из parallax-scene (reduced-motion встроен). НИКАКОГО ИИ — только пины + CSS/SVG. Все роуты 200, desktop+мобилка проверены скрином.

### STORY переделка — итерация: снап-дек + свои кадры
- **StoryDeck** — снап-скролл с блокировкой (по ревью codex): один жест = следующая сцена, лок на время анимации входа, RAF пишет `--sp` → reveal `--lp` работает 1:1. Проверено (shot-snap).
- **VISION** переведён на StoryDeck.
- **Свои кадры сгенерированы** (Higs, nano-banana-pro, пин как style-ref, `scripts/story-gen.ts`): 3 мастера ×2 варианта — девушка С ТАТУ в стиле каждого пина, чувственно-эстетично (codex-промпты: чувственность через свет/взгляд/шею, не обнажение). Выбраны canonical `*-hero-a.jpg`, вживлены в обложки всех 3 + галерею. VISION-обложка проверена — читается как обложка журнала.
- Осталось: SHADOWS/SOLITUDE на StoryDeck; уникальные страницы (архетипы/сетки по codex) + кадры работ; мобилка; финал codex-ревью.

### STORY переделка — итерация 2: все 3 на снап-деке
- SHADOWS и SOLITUDE переведены на StoryDeck (как vision: сцены=`.deck-slide`, убраны ParallaxScene/transitionOut, шапка/grain вне дека, футер→финал `.sh-sign/.so-sign`). Снап проверен (shot-snap: жест листает, лок держит). Все 3 роута 200.
- Все 3 сайта: снап-скролл с блокировкой + свои сгенерённые кадры-мастера (девушка с тату в стиле пина).
- Осталось: уникальные страницы (архетипы/сетки по codex) + кадры работ; мобилка; финал codex-ревью.

### STORY переделка — итерация 3: уникальные страницы (VISION)
- Догенерены кадры работ (Higs, `scripts/story-work-vision.ts` → `vision-work-{1,2,3}.jpg`, стиль-ref=hero: макро/тату на коже).
- VISION 4 разворота переверстаны в 4 РАЗНЫХ архетипа (по codex): манифест=типо-страница, «Стекло»=МОНУМЕНТ (full-bleed кадр + индекс + подпись-угол), «Шипы»=МАКРО-ТАТУ (full-bleed макро + огромное контур-слово + подпись справа), «Крыло»=КОЛЛАЖ-АРХИВ (3 разнокалиберных кадра внахлёст + номера). Снап/`--lp`-reveal сохранены. Монумент проверен скрином — премиальная журнальная страница. Роут 200.
- Осталось: проверить макро+коллаж когда work-2/3 готовы; уникальные страницы shadows/solitude; мобилка; финал codex-ревью.

### STORY итерация 4: VISION уникальные страницы ГОТОВЫ + верифицированы
- VISION: 4 архетипа проверены скрином (shot-deck) — типо-манифест / МОНУМЕНТ (full-bleed кадр+индекс) / МАКРО (близкий кадр+контур-слово ШИПЫ) / КОЛЛАЖ (3 кадра работ внахлёст+номера). Все работают на снап-деке, кадры работ (vision-work-1/2/3) чувственные, в едином fine-line стиле. ОТЛИЧНО.
- Запущена генерация работ для shadows(blackwork/оккульт) + solitude(fine-line ренессанс): `scripts/story-work-rest.ts` → `{shadows,solitude}-work-{1,2,3}.jpg`.
- Осталось: архетипы страниц shadows+solitude; мобилка; финал codex-ревью.

### STORY итерация 5: SHADOWS уникальные страницы готовы
- Догенерены shadows-work-1/2/3 (blackwork терновый-венец/ворон/крест-реликварий на коже, красный свет — чувственно, в стиле).
- SHADOWS 4 архетипа: манифест=типо, Нимб=МОНУМЕНТ (sh-mono full-bleed+×××+idx), Ворон=МАКРО (sh-macro+контур-слово ВОРОН), Крест=КОЛЛАЖ-ЗИН (sh-collage 3 работы+барокод). Проверено shot-deck: монумент+коллаж отлично; кроп монумента поправлен (object-position 46%). Роут 200.
- Solitude works тоже готовы (solitude-work-1/2/3). Осталось: SOLITUDE архетипы; мобилка; финал codex-ревью.

### STORY итерация 6: SOLITUDE уникальные страницы — ВСЕ 3 САЙТА ГОТОВЫ
- solitude-work-1/2/3 (fine-line орнамент/профиль/роза на коже, тёплый ренессанс-свет — чувственно).
- SOLITUDE 4 архетипа: манифест=типо, Портрет=МУЗЕЙНАЯ-РАМКА-монумент (so-mono + золотая inset-рамка + [+] бэйдж + idx), Роза=МАКРО (so-macro + контур-слово РОЗА), Жемчуг=КАТАЛОЖНЫЙ-ЛИСТ (so-collage 3 кадра + техно-бэйджи/barcode). Проверено shot-deck — монумент+каталог отлично, роут 200.
- ИТОГ КОНЦЕПТА: 3 сайта (vision/shadows/solitude), каждый: снап-дек StoryDeck (жест=след.сцена+блок) + своя чувственная девушка-с-тату на обложке + 4 УНИКАЛЬНЫХ архетипа страниц (типо/монумент/макро/коллаж) со своими сгенерёнными кадрами работ + необычные закладки-объекты. Русский.
- Осталось: полировка (мобилка, чистка мёртвого CSS старых шаблонов, next build), финал codex-ревью.

### STORY итерация 7: полировка + финальный codex-ревью
- Мобилка 390px (vision монумент+коллаж проверены): full-bleed кадры и коллаж→1 кадр ложатся чисто; тот же `@media` у shadows/solitude.
- Тип-чек `tsc --noEmit` по story-компонентам — чисто.
- Финальный codex-ревью движка: RAF/listeners cleanup ок, SSR/типы ок. По замечаниям ВНЕДРЕНО в StoryDeck: клавиши Home/End (goTo instant), фокус на новую сцену после перехода, deck tabIndex+focus-visible, сцены tabIndex=-1, aria-live «Сцена X из N», реальные кнопки листания ↑↓ (клавиатура/SR/мышь), reduced-motion для scrollcue/wiggle. href="#" — showcase-плейсхолдеры (осознанно, как во всей ветке).
- Осталось: удалить мёртвый CSS старых шаблонов (по совету codex) + финал-отчёт.

### STORY итерация 8 — ЧИСТКА + ФИНАЛ
- Удалён весь мёртвый CSS старых двухстраничных шаблонов (vs/sh/so: `-turn-b/c`,`-flood-b/c`,`-scan-b/c`,`-page*`,`-flash/-draw`,`-foot*` + их @media) — 0 остатков, живые манифест `-turn-a/-flood-a/-scan-a`+`-facts` и архетипы `-mono/-macro/-col*` целы. Все 3 роута 200, снап+развороты не сломаны (проверено shot-deck).

## ★ ВЕТКА STORY — ПЕРЕДЕЛКА КОНЦЕПТА ЗАВЕРШЕНА (3/3)
Сторителлинг-журналы тату-мастера, `/story` + `/story/{vision,shadows,solitude}`. Концепт (по уточнению заказчика):
- **Снап-скролл с блокировкой** — движок `StoryDeck` (архитектура по ревью codex): один жест колеса/свайпа/стрелки = следующая «страница книги», скролл ЗАБЛОКИРОВАН на время анимации входа (RAF пишет `--sp` 0→1 → reveal `--lp` 1:1). a11y: Home/End, aria-live «Сцена X из N», фокусируемый дек+сцены, кнопки ↑↓, `prefers-reduced-motion`.
- **Свои чувственные кадры (не сток)** — через Higs Bot (nano-banana-pro, пин как style-ref): девушка С ТАТУ на обложке каждого сайта + кадры работ (тату на коже), эстетично/чувственно без пошлости (codex-промпты: свет/взгляд/поза, не обнажение). `scripts/story-gen.ts`, `story-work-*.ts`.
- **3 стилистики**: vision (pink глянец-editorial) · shadows (красный грандж-оккульт-зин) · solitude (ренессанс+техно, золото).
- **Каждая страница уникальна** — у каждого сайта 4 архетипа: типо-манифест / МОНУМЕНТ (кадр во весь экран+индекс) / МАКРО (сверхкрупный фрагмент+контур-слово) / КОЛЛАЖ-АРХИВ (3 кадра внахлёст+номера/барокод/бэйджи).
- **Необычные закладки-объекты** (`bookmarks.tsx`): носок/трусы/резинка/скотч/жвачка/пластырь как контакт-CTA, разные на каждой странице.
Русский. Тип-чек чист. git НЕ коммичен (гардрейлы). Смотреть: листать `/story/<slug>` колёсиком/свайпом/стрелками.

## ★ STORY — ПОДЪЁМ ЭСТЕТИКИ ДО ПИНОВ (по фидбеку заказчика)
Диагноз: story-сайты были плоскими фото+подпись — упустили постер-коллаж пинов (cutout-фигура + вордмарк-окклюзия + орнаменты + зерно + живая моторика + форматы). Ветка concept-sites это уже умеет; в story упростили — регресс.
### Итерация 1 — обложка VISION как постер-коллаж
- Сгенерены cutout-фигуры (`scripts/story-cutout.ts`, Higs remove-background) → `{slug}-hero-a-cut.png` (все 3).
- VISION-обложка пересобрана: вордмарк `VISION` (Layer z1) + cutout-фигура (z3, разрезает буквы = тип-оклюжн как в пине) + орнамент-слой (угловой текст/✦/номер, reveal через `--lp:var(--sp)`) + плёночное зерно (SVG-noise overlay). Проверено скрином — уровень пина достигнут.
- ДАЛЬШЕ: shadows/solitude обложки так же; орнаменты+зерно+вордмарк-акценты на внутренних; живая моторика (веер/двусторонний прилёт карточек); форматы (не только 9:16).

### Подъём эстетики ит.2 — 3 обложки-постера + фикс персоны
- SHADOWS + SOLITUDE обложки пересобраны в постер-коллаж (вордмарк-окклюзия + cutout-фигура + орнамент-слой в стиле + зерно), по образцу VISION. Проверено скрином — уровень пина у всех 3.
- Фикс прошлого промаха: SHADOWS-персона теперь ЖЕНСКАЯ («Мара Тень», «Я — Мара») — образ и так был женский, имя было мужское. Обновлено везде + индекс.
- Осталось: живая моторика (веер/двусторонний прилёт), орнамент+зерно на внутренних, форматы.

### Подъём эстетики ит.3 — живая моторика (веер/прилёт)
- Коллаж-карточки всех 3 сайтов теперь ВЛЕТАЮТ ВЕЕРОМ: per-card `--fly` (±46-62vw) + `--rot0` (стартовый угол -20/16/-14°) → к финальному `--rot`, множитель прилёта *2.4 чтобы читалось через всю анимацию. Проверено (mid-frame: карты в полёте за экраном; покой: сели в позиции). Закрыт фидбек «нет веера, карточки прилетают».
- Прошлый промах персоны Shadows (Марк→Мара) + 3 обложки-постера — в ит.2.
- Осталось: двусторонний вход разворотов монумент/макро (подпись слева, номер справа навстречу); орнамент+зерно на внутренних; форматы.

### Подъём эстетики ит.4 — двусторонний вход разворотов
- Монумент/макро всех 3 сайтов: подпись `.xx-mono-cap` въезжает СЛЕВА (translateX -50→0 по --lp), индекс `.xx-mono-idx` СПРАВА (+60→0), макро-контур-слово `.xx-macro-huge` слева (-70→0) — «с двух сторон навстречу». В покое translateX=0 (не сломано, проверено). 200 везде.
- Осталось: орнамент+зерно на внутренних (плотность); форматы; codex-ревью+мобилка.

### Подъём эстетики ит.5 — орнамент+зерно на внутренних
- ГЛОБАЛЬНОЕ плёночное зерно: `.vs-site::after`/`.so-site::after` (fixed SVG-noise, mix-blend overlay, z9) на всех сценах; shadows уже глобальный `.sh-grain`. Плёночная фактура на всём.
- Рассыпанные метки на КОЛЛАЖ-сценах (пустой фон вокруг карточек): `.xx-collage::before/::after` — ✦✦✦/×××/[+] + микротекст (works/reliquary/exp.404), reveal по --sp. Плотность выросла. Проверено (vision-коллаж). 200 везде.
- Осталось: форматы (контраст размеров карточек), codex-ревью, мобилка → финал.

### Подъём эстетики ит.6 — ФОРМАТЫ (разнокалиберность коллажа)
- Коллаж-карточки: усилен контраст размеров под постер-анатомию пинов — одна КРУПНАЯ доминанта (col-1 → 30-31vw × 62-64vh, z-index поднят над мелкими) + 2 заметно МЕЛЬЧЕ (col-2/3 → 16-18vw × 24-28vh). По всем 3 сайтам. Заголовок доминанты ломает рамку.
- Проверено скрином (vision-коллаж): читается «1 большая + 2 малые», ✦✦✦ + микротекст в пустотах, зерно. 200 везде.
- Осталось: мобилка + codex-ревью → финал.

### Подъём эстетики — ИТОГ (story-branch до уровня постер-пинов)
Три storytelling-сайта тату-мастеров (`/story/vision|shadows|solitude`) доведены до анатомии постер-пинов:
- **Обложки** = постер-коллаж: вырезанная cutout-фигура (Higs remove-bg PNG) поверх ГИГАНТСКОГО вордмарка-окклюзии (имя за фигурой) + рассыпанные орнаменты по углам (микро-манифест/✦/×××/барокод/индекс) + плёночное зерно (SVG-noise overlay).
- **Механика** = снап-дек StoryDeck: один жест (колесо/свайп/стрелки) = следующая сцена, скролл заблокирован на время анимации входа (как книга); reduced-motion → мгновенно; inert/aria/кнопки/dots.
- **Живая моторика**: коллаж-карточки прилетают ВЕЕРОМ (индивидуальные --fly/--flyY/--rot0 + transform-origin:bottom → дуга, не горизонтальный разъезд); развороты входят С ДВУХ СТОРОН (подпись слева, индекс/контур-слово справа).
- **Форматы**: коллаж = 1 крупная доминанта (30-31vw×62-64vh, заголовок ломает рамку) + 2 мелкие сателлита; архетипы монумент/макро/коллаж.
- **Плотность**: глобальное зерно на всех сценах + орнамент-метки в пустотах внутренних.
- **Персона**: три разные стилистики/палитры/персоны — Vision (роза-стекло, Ева), Shadows (красный оккульт, женская Мара), Solitude (ренессанс-золото, Лия Морн).
- **Мобилка 390**: обложки держат вордмарк-окклюзию+cutout+орнамент; коллаж = 3 карточки внахлёст (не одна); svh-fallback + safe-area.
codex-ревью учтён (мобильный коллаж, веер-дуга, svh/safe-area); ложные срабатывания (reduced-motion уже в движке, gradient-вордмарк — намеренный бренд) классифицированы. git НЕ коммичен.

### Форматы ит.7 — LANDSCAPE-разворот (закрыт пробел «не все 9:16»)
Ранее все кадры были 9:16 (+ по 1 квадрату), и даже квадраты кропались object-fit:cover обратно в портрет. Теперь:
- Догенерены 3 **landscape 16:9** работы через Higs (`{slug}-work-wide.jpg`, стиль-ref = hero, панорамные reclining-композиции спина/плечи). shadows со 2-й попытки (upscale-таймаут).
- Новая сцена-архетип **ПАНОРАМА** (`.xx-pano`) на всех 3 сайтах: кинематографичная landscape-полоса (58vh band + letterbox-хайрлайны, формат сам читается как разворот-центрфолд), гигантское слово выезжает слева (`--lp:var(--sp)`), центрированная подпись снизу. Vision «Хребет/panorama», Shadows «Пелена/shroud» (Pirata One), Solitude «Фреска/al fresco». Закладки — уникальные (gum/briefs/condom).
- Мобилка: band 44vh, слово меньше — полоса остаётся горизонтальной (контраст к портретным страницам).
- Проверено скрином все 3 (десктоп) + vision (моб). Реальная форматная разнокалиберность: портрет-обложка + портрет-страницы + landscape-разворот. 200 везде.

### Показ ит.8 — БЕНТО-СТЕНА «Архив» (портфолио-контактный лист, по референсу заказчика)
Новая сцена-архетип на всех 3 сайтах: плотная мозаика работ (как портфолио-стена из присланного пина).
- `.xx-wall` — CSS-grid 4×6, 8 плиток разного калибра (крупный портрет + широкий landscape + макро + квадраты), каскадное проявление плиток по `--d` (stagger от --sp). Hover → figcaption с подписью части тела.
- Догенерены по 3 детальных кадра/сайт (`{slug}-tile-1..3.jpg`, `scripts/story-tiles.ts`, 1:1): руки/шея/рёбра·костяшки·голень·пальцы·щиколотка — разные части тела как в референсе. vision-tile-3 не добился (апскейл-таймаут Higs ×3) → в плитку-h подставлен hero-a («студия»), догенерить позже.
- Плитки = hero-b + work-1/2/3 + work-wide + tile-1/2/3 (8 распределены). Угловой лейбл «архив/реликварий/каталог · выборка». Уникальная закладка (tape/sock/bandage).
- Мобилка: `grid-auto-flow:row dense` + 2 колонки, крупные плитки span 2 (портрет/landscape) — забэкфилл без дыр. Проверено скрином десктоп (все 3) + моб (shadows).
- Порядок сцен теперь 8: cover→spread→mono→macro→pano→collage→**wall**→final.
