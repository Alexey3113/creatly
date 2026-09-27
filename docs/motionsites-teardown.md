# MotionSites teardown — покомпонентный разбор

Разбор спарсенных превью [motionsites.ai](https://motionsites.ai) (снимок 28.07.2026, `analitic/motionsites/`): по каждому сайту — **hero, структура, текст/типографика, анимация, реализация**. Источник визуала — превью-ролики (webp/mp4); выводы относятся к первому экрану и короткому фрагменту скролла (см. `analitic/motionsites/README.md`).

Метод: визуальный разбор кадров превью (я) + структурирование и гипотезы реализации (Codex). Формат и правила ниже заданы совместно.

## Формат записи

```md
### [Название] · `[id]`
- **Тип:** [page_type/category] · [арт-направление] · [light/dark] · [media_type].
- **Hero:** [доминирующий объект]; [раскладка, масштаб, пустота, 2–3 плана глубины].
- **Механика внимания:** [незавершённость первого кадра] → [один payoff]; спокойный слой — [...]; переход дальше — [exit cue].
- **Структура:** Hero → [Reveal] → [Proof] → [Contrast/CTA]; роль каждой видимой секции.
- **Текст:** «[headline]» — [смысл / графическая форма]; [serif/grotesk/display/italic], контраст с UI.
- **Motion:** [один главный приём], [триггер: load/cursor/hover/scroll], характер движения.
- **Реализация:** [CSS/GSAP/WebGL/canvas/video]; слои, маски, transform; fallback — mobile/reduced-motion.
```

Правила: 6–7 строк, ~90–140 слов; один доминирующий объект, одно напряжение и один payoff; минимум 3 плана глубины (или отметить намеренно плоскую); класс шрифта (не угадывать гарнитуру); light/dark + роль акцента; один motion-приём + триггер; техника достаточная для прототипа, для неоднозначной — «реализовать через…». Наблюдение и техническую гипотезу не смешивать.

## Организация — по 7 арт-направлениям

Верхний уровень — арт-направление (какой визуальный мир), подгруппа — приём hero, `category`/`page_type` — метки применимости. Сайт, сочетающий два направления, размещается по доминирующему приёму с меткой `secondary:`.

1. **Editorial minimalism** — image strip / editorial portrait / architectural mass
2. **Dark cinematic** — silhouette+halo / lit product / atmospheric depth
3. **Organic 3D** — living object / fluid+glass / natural material
4. **Character-led 3D** — digital human / mascot / character-as-nav
5. **Portal / window** — card portal / device frame / masked transition
6. **Kinetic typography** — scale / layer-crossing / scroll recomposition
7. **Product theatre** — macro product / product-in-hand / rotating object

---

## Эталонные записи (стиль/объём)

### Custom Spaces · `custom-spaces`
- **Тип:** landing · editorial minimalism · light.
- **Hero:** строгая типографическая верхняя половина над горизонтальной лентой интерьеров; белое поле и одинаковая высота кадров держат порядок.
- **Механика внимания:** статичный порядок → живая галерея; спокойный слой — заголовок и белый фон; лента, продолжающаяся за viewport, — exit cue.
- **Структура:** Hero-обещание → лента пространств → раскрытие проектов и услуг.
- **Текст:** короткий заголовок = позиционирование + крупная форма; сдержанный editorial-набор, мелкая служебная типографика.
- **Motion:** медленное горизонтальное смещение изображений, без конкурирующих эффектов; ритм на паузах и равномерной скорости.
- **Реализация:** CSS Grid на две зоны, flex-track с transform или scroll-linked translate; фикс. высота кадров, mobile — свайп-карусель, reduced-motion — статичная лента.

### 3D Portfolio · `3d-jack-portfolio`
- **Тип:** portfolio · character-led 3D · light + фиолетовый акцент.
- **Hero:** крупная 3D-голова — единственный якорь; массивное `HI, I'M JACK` и фиолетовые 3D-символы дают передний/средний план.
- **Механика внимания:** застывшая цифровая личность → оживает и ведёт к работам; текст — опора, нижний край следующей секции зовёт к скроллу.
- **Структура:** Hero-знакомство → About → Projects; повторяющиеся 3D-символы связывают секции.
- **Текст:** headline = смысл + масштаб; широкий bold display/grotesk против мелких подписей.
- **Motion:** голова слегка следит за курсором, затем scroll-переход био→проекты; герой движется сильнее фоновых символов.
- **Реализация:** WebGL (Three.js/R3F) или prerendered image-sequence; cursor-normalized rotation + GSAP ScrollTrigger; mobile — idle, reduced-motion — фикс. ракурс.

### TrustFlow · `trustflow`
- **Тип:** fintech landing · editorial minimalism · light.
- **Hero:** большая архитектурная масса входит снизу-слева; спокойный serif-заголовок и белое поле = институциональность.
- **Механика внимания:** здание обрезано viewport → композиция раскрывает масштаб; headline — calm layer, незавершённая архитектура — exit cue.
- **Структура:** Hero доверия → объяснение продукта → рациональные доказательства и действие.
- **Текст:** крупный serif несёт обещание и авторитетный тон; мелкая grotesk-навигация держит ясность.
- **Motion:** почти статичная сцена, медленный подъём/параллакс массы; эффект на массе и тишине, не скорости.
- **Реализация:** отдельный слой здания (PNG/WebP) над фоном, CSS transform или лёгкий scroll-translate; текст неподвижен, mobile/reduced-motion — статичная композиция.

### OYLA · `oyla`
- **Тип:** ecommerce/fashion · product theatre + editorial · light.
- **Hero:** рука с кольцами ближе модели — главный продуктовый план; портрет+украшения+UI дают глубину.
- **Механика внимания:** рука вторгается в пространство зрителя → продукт крупнее; спокойный слой — тонкий headline и nav; `100% Handmade` выводит в proof.
- **Структура:** fashion-hero → доказательство ручной работы → детали → покупка.
- **Текст:** тонкий serif как editorial-форма и премиальный голос; доказательство вынесено в прямой блок.
- **Motion:** медленное приближение руки / параллакс рука↔модель, затем scroll-reveal доказательства.
- **Реализация:** разделённые фото-слои или короткий прозрачный видеолуп, CSS scale/parallax + маски; CTA поверх сцены, mobile — один crop без hover.

### Visual Hero · `visual-hero`
- **Тип:** creative/generative · organic 3D + kinetic typography · light.
- **Hero:** детализированный моховой 3D-объект в центре пустой сцены; огромный italic-заголовок частично перед и за ним.
- **Механика внимания:** сложный силуэт не считывается целиком → медленное движение раскрывает форму; перекрытие слоёв обещает глубину.
- **Структура:** hero-мир → возможности инструмента → примеры/интерфейс → CTA.
- **Текст:** italic display прежде всего графическая форма, но с читаемым обещанием; мелкий UI компенсирует экспрессию.
- **Motion:** органическое вращение/деформация/дыхание объекта; типографика меняет слой относительно модели.
- **Реализация:** WebGL/Three.js со slow rotation + vertex/noise-деформацией; текст на задний/передний DOM-слои, reduced-motion — статичный рендер.

### Sentinel · `sentinel`
- **Тип:** security landing · dark cinematic · dark + оранжевый акцент.
- **Hero:** тёмный силуэт и световое кольцо = угроза; `See Risk. Stop Spread.` и CTA — интерфейсная опора.
- **Механика внимания:** угроза неразличима → свет/движение выявляет; headline — calm layer, светлая секция внизу — exit cue.
- **Структура:** dark hero → чёрно-белая печатная сетка объяснений → оранжевое действие.
- **Текст:** короткий imperative-headline несёт смысл; плотный display/grotesk = категоричный security-тон.
- **Motion:** световое кольцо сканирует/проявляет силуэт, затем scroll резко переключает cinematic→editorial-grid.
- **Реализация:** свечение + masked video/canvas или CSS radial-gradient с transform; смена режима через scroll-triggered theme tokens, reduced-motion — проявленный силуэт.

### Relocation Card · `relocation-card`
- **Тип:** fintech/lifestyle landing · portal/window + product theatre · light.
- **Hero:** полноэкранный пейзаж-мечта + центральная стеклянная карта как продукт-портал; UI — верхний план.
- **Механика внимания:** карта встроена в мир → отделяется в 3D-объект; nav спокоен, масштабирование карты ведёт в следующий экран.
- **Структура:** место+обещание → трансформация карты → объяснение инструмента → преимущества и CTA.
- **Текст:** копирайт смысловой, не конкурирует с историей; чистый grotesk = современный fintech.
- **Motion:** scroll-driven «пейзаж → портал → продукт»: карта приближается, получает глубину, меняет контекст — один непрерывный объект.
- **Реализация:** sticky-сцена с DOM-картой, backdrop-filter, perspective + GSAP ScrollTrigger; фон сменяется под объектом, mobile — статичные состояния без scroll-lock.

---

<!-- Ниже — разбор всех 260 сайтов по батчам (заполняется). Каждая запись помечена индексом кадра [NNN]. -->

## 1. Editorial minimalism

### Product Studio · `product-studio` [015]
- **Тип:** agency landing · editorial minimalism (+organic 3D) · light.
- **Hero:** матовая стеклянная сфера-ядро в центре светло-серого поля; крупный serif «Transforming the online interaction since 2001» сверху, «We craft award winning platforms» снизу — текст обрамляет объект.
- **Механика внимания:** сфера медленно дышит/переливается → взгляд держится на единственном центре; спокойный слой — серый фон и serif; низ кадра уходит в след. секцию.
- **Структура:** hero-манифест → (по превью) переход к платформам/кейсам.
- **Текст:** headline = смысл + editorial-форма; классический serif против мелкой служебной подписи, максимум воздуха.
- **Motion:** мягкое вращение/шейдерное свечение одной сферы; фон статичен — контраст «живой объект / тихое поле».
- **Реализация:** реализовать через WebGL-сферу (env-map/ноиз) или зацикленный прозрачный видеолуп; текст — статичный DOM поверх; reduced-motion — статичный кадр сферы.

### ADHD Planner · `adhd-planner` [017]
- **Тип:** app landing · editorial minimalism · warm/light.
- **Hero:** full-bleed кадр человека на природе с лёгким motion-blur; крупный микс sans+italic «Own your time without *the stress*» поверх; ниже — кремовая секция с абзацем-манифестом и CTA.
- **Механика внимания:** размытое движение фигуры создаёт «поток/спешку» → заголовок обещает контроль; спокойный слой — кремовый блок текста под hero.
- **Структура:** эмоциональный hero-фото → манифест «We make AI tools…» → продуктовые блоки.
- **Текст:** headline двойной роли (смысл+ритм) через italic-акцент в sans; тёплая гуманная типографика.
- **Motion:** лёгкий параллакс/зум фонового фото + fade-in текста на scroll; один спокойный приём.
- **Реализация:** CSS scroll-parallax фонового фото + reveal текста; reduced-motion — статичное фото.

## 2. Dark cinematic

### AI Driving Assistant · `ai-driving-assistant` [004]
- **Тип:** AI SaaS landing · dark cinematic · dark.
- **Hero:** POV из салона авто ночью через лобовое стекло (дорога, огни вдали); гигантское «EFFORTLESS.» по центру горизонта.
- **Механика внимания:** тёмная глубина дороги тянет взгляд вглубь → слово повисает в перспективе; спокойный слой — сам интерьер-рамка; свет вдалеке = exit cue.
- **Структура:** cinematic hero-обещание → (превью) демонстрация функций ассистента.
- **Текст:** одно императивное слово как графическая форма + смысл; широкий тонкий sans/grotesk, высокий контраст с тёмным.
- **Motion:** медленное движение дороги/огней (driving loop) + мягкое проявление слова; амплитуда фона ниже текста.
- **Реализация:** зацикленное видео салона/дороги как фон + текст поверх; reduced-motion — стоп-кадр с огнями.

### Deep Neural Interface · `deep-neural-interface` [019]
- **Тип:** AI landing · dark cinematic (atmospheric depth) · сине-градиентный.
- **Hero:** одинокая размытая фигура уходит в свет/туман по сине-голубому градиенту; почти нет UI — чистая атмосфера.
- **Механика внимания:** силуэт не в фокусе → движение/приближение проявляет; глубина строится дымкой, не параллаксом.
- **Структура:** атмосферный hero → (превью) вход в продукт/интерфейс.
- **Текст:** минимум текста, роль — тихая подпись; акцент на изображении.
- **Motion:** медленный дрейф тумана + лёгкий зум к фигуре; единый приём, без суеты.
- **Реализация:** видео/шейдерный туман (fbm) + blur-слои по глубине; reduced-motion — статичный градиент с силуэтом.

### Remote Dev Collective · `remote-dev-collective` [016]
- **Тип:** agency website · dark cinematic (+organic 3D) · тёмно-фиолетовый.
- **Hero:** светящаяся скрученная 3D-форма на фиолетовом фоне; ниже — карточка «About our team» и 3 колонки услуг.
- **Механика внимания:** неоновый объект = единственный источник света → взгляд к нему; спокойный слой — тёмное поле и сетка колонок.
- **Структура:** hero с объектом → about-карточка → 3 колонки (Project development / Super fast delivery / Global & synced).
- **Текст:** служебный чистый sans, роль — ясность; экспрессия отдана свету/объекту.
- **Motion:** медленное вращение/пульс свечения формы; сетка статична.
- **Реализация:** WebGL-объект с emissive + bloom или прозрачный видеолуп; reduced-motion — статичный рендер.

## 3. Organic 3D

### Immersive Studio · `immersive-studio` [013]
- **Тип:** agency · organic 3D + kinetic typography · тёмно-лиловый + тёплый диск-солнце.
- **Hero:** органическая жидкая 3D-форма (лиловая, с искрами-частицами) и светящийся диск-солнце; split-заголовок «Visions So UNDENIABLE / So RESIST» крупным serif по краям.
- **Механика внимания:** форма перетекает/искрит → взгляд следует, диск-свет держит центр; заголовок обрамляет объект, обещая масштаб.
- **Структура:** hero-мир → (превью) кейсы/услуги студии.
- **Текст:** display-serif как графическая форма (разнесён по краям) + читаемое обещание; контраст с мелким UI.
- **Motion:** органическое течение формы + дрейф частиц + свечение диска; медленно и непрерывно.
- **Реализация:** WebGL (fluid/particle) или зацикленный рендер-видео; текст — статичный DOM по краям; reduced-motion — стоп-кадр.

### Form Study · `form-study` [018]
- **Тип:** art/portfolio · organic 3D (fluid+glass) + kinetic · dark.
- **Hero:** хром-стеклянная сфера с орбитальными кольцами и хроматической аберрацией по центру; «Form & Function» слева, индекс «03/04» и мини-иконки внизу.
- **Механика внимания:** сложный преломляющий объект не считывается сразу → вращение колец раскрывает; индекс 03/04 обещает серию.
- **Структура:** hero-объект как слайд серии (03/04) → переключение работ.
- **Текст:** «Form & Function» — смысл+форма; технический sans + mono-индекс.
- **Motion:** вращение орбитальных колец + хром-дисперсия, реакция на курсор; один объект в фокусе.
- **Реализация:** WebGL со стеклянным материалом (refraction, chromatic aberration) + orbit-кольца; reduced-motion — статичный кадр.

## 4. Character-led 3D

### AI Assistant App · `ai-assistant-app` [003]
- **Тип:** AI app landing · character-led 3D (mascot) + device frame · light/cream.
- **Hero:** телефон-мокап по центру кремового поля; внутри экрана — милый 3D-робот-маскот и «Speak the World's Language!», кнопка «Get started».
- **Механика внимания:** маскот в рамке телефона = живой персонаж-якорь → притягивает как «личность продукта»; спокойный слой — кремовый фон и device-рамка.
- **Структура:** hero device+mascot → (превью) фичи приложения.
- **Текст:** дружелюбный жирный sans, роль — смысл; акцент на персонаже, не на типографике.
- **Motion:** idle-анимация робота (покачивание/моргание) внутри экрана; фон статичен.
- **Реализация:** rigged 3D-маскот (Three.js) или спрайт-луп в device-mockup; reduced-motion — статичная поза.

<!-- Полный разбор ниже — в порядке индекса кадра [NNN]; арт-направление указано в строке «Тип». Финальную группировку по 7 семействам сделаем в конце. -->

---

## Полный разбор (по индексу)

### 3D Collectible Hero · `3d-collectible-hero` [000]
- **Тип:** 3D website/landing · character-led 3D + kinetic typography · light-pink.
- **Hero:** группа стилизованных 3D-стритвир-персонажей (крупная фигура в синем «FOCUS»-худи + прыгающие мелкие) на розовом; за ними гигантское «SHAPE» белым.
- **Механика внимания:** персонажи-«коллекционные фигурки» = якорь-личность → взгляд к главной фигуре; текст-форма позади создаёт средний план; курсор-подсказка внизу зовёт к интеракции.
- **Структура:** hero-каст персонажей → (превью) коллекция/дроп.
- **Текст:** «SHAPE» как графическая форма за объектом; жирный grotesk-display, контраст с мелким UI.
- **Motion:** idle-анимация фигур (покачивание/жест) + лёгкая реакция на курсор; фон-надпись статична.
- **Реализация:** rigged 3D-персонажи (Three.js/R3F) или prerendered sequence; текст задним DOM-слоем; reduced-motion — статичная сцена.

### Pulse 3D · `pulse-3d` [001]
- **Тип:** 3D website/web3 · character-led 3D (mascot) · magenta/dark.
- **Hero:** 3D-маскот-кролик в чёрной футболке и тёмных очках указывает на стопку карточек-фич «Private Discord & Networking / Weekly Market Alpha Drops / Exclusive Web3 Tooling Access».
- **Механика внимания:** маскот = дружелюбная личность бренда → жест ведёт к списку выгод; спокойный слой — магента-фон с паттерном.
- **Структура:** hero mascot+benefits → (превью) программа/членство.
- **Текст:** карточки-бенефиты несут смысл; чистый sans, экспрессия отдана персонажу и цвету.
- **Motion:** idle-жест маскота + всплытие карточек; один герой движется сильнее фона.
- **Реализация:** 3D-маскот (спрайт-луп или Three.js) + CSS-reveal карточек; reduced-motion — статичная поза.

### 404 Planet · `404-planet` [002]
- **Тип:** 404-страница · dark cinematic (atmospheric depth) · dark.
- **Hero:** светящееся «404» глитч-стилем над планетой-Землёй из космоса; тонкая nav и служебные ссылки по краям.
- **Механика внимания:** тёмный космос + подсвеченный глоб = единственный источник света → взгляд к «404»; глубина строится масштабом планеты.
- **Структура:** cinematic 404-hero → ссылки возврата (Home/Sitemap).
- **Текст:** «404» как графическая форма + смысл; технический sans, оранжево/бирюзовое свечение как акцент.
- **Motion:** медленное вращение планеты + глитч-мерцание цифр; амплитуда фона низкая.
- **Реализация:** видео/WebGL-глоб + CSS glitch на тексте; reduced-motion — статичный кадр планеты.

### Botanical Shadow About · `botanical-shadow-about` [006]
- **Тип:** about · editorial minimalism (natural material) · light.
- **Hero:** светлое поле с движущейся тенью пальмового листа; крупный serif-манифест «What's … test of … that …» по центру-слева, мелкая подпись внизу.
- **Механика внимания:** живая тень листа = единственное движение на тихом поле → взгляд к тексту-обещанию; намеренно плоская, глубину даёт только тень.
- **Структура:** editorial about-манифест → (превью) философия/команда.
- **Текст:** headline = смысл + editorial-форма; крупный serif против мелкого mono-набора, много воздуха.
- **Motion:** медленный дрейф тени листа (как от солнца/ветра); текст статичен.
- **Реализация:** PNG-тень с CSS-анимацией transform/opacity поверх светлого фона; reduced-motion — статичная тень.

### Orbis Hello · `orbis-hello` [008]
- **Тип:** about · character-led 3D · dark.
- **Hero:** ряды одинаковых 3D-фигурок-астронавтов на тёмном, один выделен вперёд/крупнее — «личность» среди толпы.
- **Механика внимания:** повтор фигур создаёт ритм → выделенный герой ловит взгляд; глубина рядами уходит в перспективу.
- **Структура:** hero-каст → (превью) about/команда как «экипаж».
- **Текст:** роль — тихая подпись; акцент на 3D-касте.
- **Motion:** лёгкое покачивание ряда + выход одной фигуры вперёд; параллакс рядов.
- **Реализация:** инстансированные 3D-модели (Three.js instancing) или prerendered; reduced-motion — статичный ряд.

### Tech-Noir About · `tech-noir-about` [010]
- **Тип:** about · dark cinematic (editorial art) · насыщенно-красный.
- **Hero:** живописный коллаж в духе tech-noir/ренессанс — фигуры за столом с глобусом и приборами на красном; глитч-полосы поверх.
- **Механика внимания:** богатая сцена-картина = якорь → взгляд блуждает по деталям; красный монохром + глитч задают тревожно-«нуарный» тон.
- **Структура:** атмосферный hero-сцена → (превью) about-нарратив.
- **Текст:** роль — акцентная подпись поверх сцены; плотный display.
- **Motion:** глитч-развёртка/параллакс слоёв коллажа; один режимный приём.
- **Реализация:** многослойный коллаж (parallax) + CSS/canvas glitch; reduced-motion — статичная картина.

### Apex Program Accordion · `apex-program-accordion` [011]
- **Тип:** accordion-секция · kinetic typography (UI) · dark.
- **Hero:** тёмный вертикальный аккордеон-программа: строки-модули «Intro to The Future of Design… / AI Design Philosophy / Building with AI / Launch & Growth» раскрываются по клику.
- **Механика внимания:** свёрнутые строки = обещание содержания → раскрытие завершает образ; спокойный слой — тёмное поле и типографика.
- **Структура:** заголовок-программа → аккордеон-модули (curriculum).
- **Текст:** пункты = смысл (учебная программа); чистый sans, иерархия размером.
- **Motion:** плавное раскрытие/сдвиг строк по клику (height/opacity), стрелки-индикаторы.
- **Реализация:** реализовать через grid-template-rows-анимацию аккордеона (без layout-thrash width/height); reduced-motion — мгновенное раскрытие.

### Creative Studio · `creative-studio` [012]
- **Тип:** agency · organic 3D (fluid+glass/chrome) · light.
- **Hero:** хром-стеклянный скрученный тор-узел (torus knot) в центре светлого поля с хроматической аберрацией; минимум UI по краям.
- **Механика внимания:** преломляющий металл-объект не считывается сразу → вращение раскрывает форму; намеренно пустое поле усиливает объект.
- **Структура:** hero-объект → (превью) работы студии.
- **Текст:** роль — мелкая служебная подпись; вся масса у объекта.
- **Motion:** медленное вращение узла + хром-дисперсия, реакция на курсор.
- **Реализация:** WebGL с chrome/glass-материалом (env-map, refraction, chromatic aberration); reduced-motion — статичный рендер.

### Modern Agency · `modern-agency` [014]
- **Тип:** agency · editorial minimalism (+kinetic) · light.
- **Hero:** светлое поле с красно-оранжевыми motion-штрихами (скоростные мазки); заголовок «digital experiences … brands ready to dominate», ниже — вторая секция с жёлтым 3D-объектом.
- **Механика внимания:** скоростные штрихи = энергия/движение → ведут к заголовку-обещанию; спокойный слой — белое поле.
- **Структура:** hero-манифест → блок «data-secure solution…» с 3D-объектом.
- **Текст:** headline = смысл; крупный sans против мелкого набора, красный акцент.
- **Motion:** пролёт красных штрихов (speed-lines) + reveal текста на scroll.
- **Реализация:** SVG/canvas-штрихи с transform-анимацией + scroll-reveal; reduced-motion — статичные штрихи.

<!-- 005 Axion, 007 LaunchEx, 009 Portfolio About — кадры переходные (глитч); в индексе ниже. -->

### Guardnet Benefits · `guardnet-benefits` [020]
- **Тип:** benefits · organic 3D (fluid+glass) · dark.
- **Hero:** иридесцентная нефтяно-мыльная сфера на чёрном; текст-выгоды по краям, объект — единственный источник цвета.
- **Механика внимания:** переливающийся объект = гипнотический якорь → взгляд к нему, затем к выгодам; глубина через свет/отражения на чёрном.
- **Структура:** hero-объект+benefits → (превью) детали защиты/фич.
- **Текст:** роль — служебная; акцент на объекте. Чистый sans.
- **Motion:** медленное вращение сферы с play цвета (thin-film), реакция на курсор.
- **Реализация:** WebGL с iridescent/thin-film шейдером или зацикленный рендер; reduced-motion — статичный кадр.

### Lodge Booking App · `lodge-booking-app` [024]
- **Тип:** booking app · product theatre (device frames) · dark-warm.
- **Hero:** три телефона-мокапа веером «Featured Lodges / Nature's Perfect Hideaways / Reserve Your Retreat» с фото домиков и ценами.
- **Механика внимания:** три экрана = продукт как сцена → взгляд скользит по флоу бронирования; глубина наложением устройств.
- **Структура:** hero device-триптих → (превью) шаги брони/каталог.
- **Текст:** заголовки экранов = смысл (флоу); тёплый sans, фото-акценты.
- **Motion:** мягкий параллакс/сдвиг устройств, всплытие карточек лоджей.
- **Реализация:** статичные device-mockup + CSS parallax/stagger; mobile — вертикальный стек, reduced-motion — статичный триптих.

### FAQ CTA · `faq-cta` [026]
- **Тип:** CTA-секция · kinetic typography · тёплый градиент (peach/orange).
- **Hero:** огромное «Ready … Without Borders?» на тёплом градиенте; тёмная капсула-CTA снизу по центру.
- **Механика внимания:** гигантский вопрос-заголовок = графическая масса → ведёт к единственной CTA; спокойный слой — плавный градиент.
- **Структура:** CTA-вопрос → кнопка → (превью) FAQ/тарифы.
- **Текст:** headline = смысл+форма (очень крупно); grotesk, контраст с мелкой CTA.
- **Motion:** плавная анимация градиента (mesh) + лёгкое проявление/трекинг заголовка.
- **Реализация:** CSS/canvas mesh-gradient + reveal текста; reduced-motion — статичный градиент.

### Liquid Glass CTA · `liquid-glass-cta` [028]
- **Тип:** CTA · organic 3D (liquid glass) · dark + фиолет.
- **Hero:** фиолетово-стеклянная жидкая волна через тёмное поле; «your new website starts here» тонким шрифтом.
- **Механика внимания:** текучая стеклянная лента = живой объект на тихом тёмном → взгляд вдоль волны к CTA.
- **Структура:** CTA-hero → кнопка/след. секция.
- **Текст:** короткое обещание, тихий sans; акцент — свет на стекле.
- **Motion:** медленное течение/преломление волны; один приём.
- **Реализация:** WebGL liquid-glass (refraction/normal-flow) или видеолуп; reduced-motion — статичный кадр.

### Pixel Grid Hover (Case Studies) · `pixel-grid-hover` [039]
- **Тип:** case studies · editorial minimalism (image grid) · light.
- **Hero:** editorial-сетка кейсов «Insights from Our Case Studies» (HeartX, Swave…) с крупной serif-шапкой; при hover превью реагирует пиксель-сеткой/раскрытием.
- **Механика внимания:** ровная сетка кейсов = порядок → hover оживляет ячейку (pixel-reveal); спокойный слой — белое поле и serif.
- **Структура:** editorial-заголовок → грид кейсов → (превью) переход в кейс.
- **Текст:** serif-шапка = editorial-форма; мелкие подписи проектов mono/sans.
- **Motion:** hover-приём: пиксельная маска/зум ячейки, курсор-причинность.
- **Реализация:** CSS grid + hover-маска (clip-path/pixel-shader на canvas); reduced-motion — статичная сетка.

### Animated Cards (Wavebank) · `animated-cards` [042]
- **Тип:** component/fintech · product theatre (3D cards) · dark.
- **Hero:** парящие банковские карты «wavebank» в тёмном пространстве, реагируют на курсор (наклон/блик).
- **Механика внимания:** карты в воздухе = продукт-герой → курсор наклоняет их (причинность); глубина — слои карт с тенями.
- **Структура:** hero-карты → (превью) фичи/тарифы.
- **Текст:** роль — мелкая подпись; акцент на 3D-картах и свете.
- **Motion:** cursor-tilt карт + мягкий дрейф/блик; главный объект движется сильнее фона.
- **Реализация:** CSS 3D-transform по курсору (rotateX/Y, perspective) или Three.js; reduced-motion — статичная раскладка карт.

### Avant Studio · `avant-studio` [044]
- **Тип:** creative studio · product theatre + editorial · dark.
- **Hero:** фигура в белом стоит на мшистой скале в тёмном поле; «Avant-garde work that performs», лого «Glmr08» и мелкий UI по краям.
- **Механика внимания:** одинокая фигура на фактурном объекте = кинематографичный якорь → взгляд к ней и заголовку; глубина — фигура/мох/тёмный фон.
- **Структура:** cinematic hero → (превью) кейсы/подход студии.
- **Текст:** заголовок = смысл; смешение script-лого и sans-заголовка, тёмный премиум-тон.
- **Motion:** медленный параллакс/дыхание сцены + reveal текста.
- **Реализация:** фото/3D-слои с parallax + scroll-reveal; reduced-motion — статичный кадр.

---

## Индекс всех сайтов (255)

★ = полная карточка выше. Приём/триггер — кратко. (Глитч) = кадр превью переходный, приём уточняется.

| # | Название | Арт-направление | Главный приём | Триггер | Стр. |
|---|---|---|---|---|---|
| 000 | 3D Collectible Hero ★ | character-led 3D | 3D-персонажи + гигантский текст-форма | idle/cursor | 3D web |
| 001 | Pulse 3D ★ | character-led 3D | маскот-кролик + карточки-бенефиты | idle | web3 |
| 002 | 404 Planet ★ | dark cinematic | 404 над вращающейся планетой | loop | 404 |
| 003 | AI Assistant App ★ | character-led 3D | робот-маскот в device-рамке | idle | AI app |
| 004 | AI Driving Assistant ★ | dark cinematic | POV-салон авто + аудиоволна, «EFFORTLESS» | loop | AI SaaS |
| 005 | Axion About | editorial minimalism | (глитч) светлый about-манифест | scroll | about |
| 006 | Botanical Shadow About ★ | editorial (natural material) | дрейф тени листа + serif-манифест | loop | about |
| 007 | LaunchEx About | editorial minimalism | (глитч) светлый about | scroll | about |
| 008 | Orbis Hello ★ | character-led 3D | ряды 3D-астронавтов, один вперёд | parallax | about |
| 009 | Portfolio About | dark minimalism | (глитч) тёмный портфолио-about | scroll | about |
| 010 | Tech-Noir About ★ | dark cinematic (art) | красный tech-noir коллаж + глитч | glitch/scroll | about |
| 011 | Apex Program Accordion ★ | kinetic (UI) | раскрытие аккордеон-программы | click | accordion |
| 012 | Creative Studio ★ | organic 3D (chrome) | вращение хром-тор-узла | cursor | agency |
| 013 | Immersive Studio ★ | organic 3D + kinetic | лиловая жидкая форма + split-serif | loop | agency |
| 014 | Modern Agency ★ | editorial + kinetic | красные speed-lines + манифест | scroll | agency |
| 015 | Product Studio ★ | editorial + organic 3D | стеклянная сфера-ядро + serif | loop | agency |
| 016 | Remote Dev Collective ★ | dark cinematic | неоновая 3D-форма + stats-колонки | loop | agency |
| 017 | ADHD Planner ★ | editorial minimalism | motion-blur фото + italic-акцент | parallax | app |
| 018 | Form Study ★ | organic 3D (glass) | хром-сфера + орбитальные кольца, 03/04 | cursor | art |
| 019 | Deep Neural Interface ★ | dark cinematic (depth) | размытая фигура в тумане/свете | zoom | AI |
| 020 | Guardnet Benefits ★ | organic 3D (fluid) | иридесцентная нефть-сфера | cursor | benefits |
| 021 | Kova Features | SaaS features | карточки-дашборд (spend/insights) + 3D | scroll | features |
| 022 | Bento Grid Stats | bento | бенто-сетка статов/медиа | scroll | bento |
| 023 | Blog Showcase | dark cinematic | синяя жидкость + карточки блога | loop | blog |
| 024 | Lodge Booking App ★ | product theatre (device) | триптих телефонов брони | parallax | booking |
| 025 | Editorial Collection CTA | editorial | цветы + пиксель-dissolve край | scroll | CTA |
| 026 | FAQ CTA ★ | kinetic typography | гигантский вопрос на тёплом градиенте | loop | CTA |
| 027 | Global CTA Footer | editorial | «tools your team needs» над продуктом | scroll | CTA |
| 028 | Liquid Glass CTA ★ | organic 3D (liquid glass) | фиолетовая стеклянная волна | loop | CTA |
| 029 | Mouse Trail CTA | kinetic (cursor) | курсор-трейл по карточке | cursor | CTA |
| 030 | Nimbus Ops CTA | (глитч) | уточняется | — | CTA |
| 031 | Orbis CTA | character-led 3D | 3D-мех + коралловый риф, зелёный глаз | loop | CTA |
| 032 | Rocket CTA | (глитч) dark cinematic | уточняется | — | CTA |
| 033 | Cognitra Offer | (глитч) light cards | уточняется | — | cards |
| 034 | Nimbus Security | (глитч) | уточняется | — | cards |
| 035 | Nimbus Sticky Cards | dark (sticky) | sticky-стек карточек | scroll | cards |
| 036 | Orbis Cards | character-led 3D | 3D-астронавты бегут | idle | cards |
| 037 | Veloce Cards | (глитч) light | карточки/цифры | scroll | cards |
| 038 | FlowMate Carousal | editorial | живописный карусель-триптих | drag/auto | carousel |
| 039 | Pixel Grid Hover ★ | editorial (grid) | грид кейсов + pixel-hover | hover | case studies |
| 040 | Beauty Categories | editorial (strip) | 3-фото стрип face/tools/body | hover | categories |
| 041 | Church Community | product theatre (device) | триптих телефонов церкви-app | parallax | church |
| 042 | Animated Cards ★ | product theatre (3D cards) | парящие банк-карты + cursor-tilt | cursor | component |
| 043 | Build With Us | editorial + form | альпийский пейзаж + форма | scroll | contact |
| 044 | Avant Studio ★ | product theatre + editorial | фигура на мшистой скале | parallax | creative |

| 045 | Imperial VPN ★ | organic 3D (sculpture) + editorial | барочная золотая статуя-рыцарь | parallax | cybersecurity |
| 046 | Sentinel (эталон) | dark cinematic → editorial grid | смена режима, световое кольцо | scroll | cybersecurity |
| 047 | Dashboard UI | product over nature | UI-панели над зелёным полем | scroll | dashboard |
| 048 | Nimbus Demo | (глитч) dark dashboard | уточняется | — | dashboard |
| 049 | Spatial Mapping Platform ★ | organic 3D (foil) | мятый иридесцентный фойл-блоб + статы | cursor | data |
| 050 | Custom Spaces (эталон) | editorial minimalism | центр-заголовок + лента интерьеров | cursor/scroll | design |
| 051 | Shipping Infrastructure ★ | organic 3D (ribbon) | цветная лента-волна сегментов | loop | developer |
| 052 | Model Infrastructure ★ | dark cinematic | фигура у окна + планета | scroll | dev platform |
| 053 | Automotive AI (AUREN) | dark cinematic | POV-салон авто ночью | loop | driving |
| 054 | — (HLS, без кадра) | — | — | — | — |
| 055 | — (HLS, без кадра) | — | — | — | — |
| 056 | Fine Jewelry Shop | product theatre + editorial | модель + украшения, Blue Nile | scroll | ecommerce |
| 057 | Futuristic Eyewear (Orven) ★ | product theatre | лицо в очках, взгляд вверх | parallax | ecommerce |
| 058 | Jewelry Store (Blue Nile) | editorial + kinetic type | жирный «Blue Nile» + модель | scroll | ecommerce |
| 059 | OYLA (эталон) | product theatre + editorial | рука с кольцами ближе камеры | parallax | ecommerce |
| 060 | Performance Eyewear (Orven) | product theatre | спорт-очки крупным планом | parallax | ecommerce |
| 061 | Gear Shop | product theatre (device) | телефоны-мокапы аудио-товаров | parallax | ecommerce app |

| 062 | Pet Products | product theatre (device) | триптих телефонов зоо-магазина | parallax | ecommerce app |
| 063 | LearnHub | product theatre (device) | телефоны edu-app | parallax | education |
| 064 | Fun 404 Page ★ | character-led 3D | 3D-лис-маскот + гигантский 404 | idle | 404 |
| 065 | Movie Premiere | product theatre (device) | телефон-афиша «Titan Rising» | loop | entertainment |
| 066 | Rocket FAQ | (глитч) kinetic (cursor) | курсор по FAQ | cursor | FAQ |
| 067 | Editorial Eyewear | product theatre | лицо крупным планом, очки | zoom | fashion |
| 068 | Outdoor Apparel ★ | editorial (long-form) | длинный serif-манифест над снаряжением | scroll | fashion |
| 069 | Cognitra Feature ★ | organic 3D / dark (particles) | взрыв частиц-сети | loop | feature |
| 070 | Capabilities Overview | dark cinematic (collage) | ракета + панели-коллаж | scroll | features |
| 071 | Interior Features | product/UI (AR) | «design the room» интерьер в реалтайме | hover | features |
| 072 | LaunchEx Submissions | organic 3D (chrome) | хром-узел-сфера | cursor | features |
| 073 | Liquid Glass Features | organic 3D (liquid glass) | фиолетовая стеклянная волна «Grow» | loop | features |
| 074 | Max Reed Portfolio | dark cinematic | мальчик + светящийся цветок, глитч | glitch | features |
| 075 | NexaCore Control | organic 3D (wireframe) | пастельный wireframe-тор | cursor | features |
| 076 | NexaCore Results | (глитч) light | уточняется | scroll | features |
| 077 | Nike Hover ★ | product theatre (in hand) | кроссовок в руке + 78% | cursor | features |
| 078 | Relocation Card (эталон) | portal/window + product theatre | пейзаж + стеклянная карта-портал | scroll | finance |
| 079 | TrustFlow (эталон) | editorial minimalism | здание снизу-слева + serif | scroll | finance |
| 080 | Evergreen Finance | editorial + product | бонсай/камень + дашборд | scroll | fintech |
| 081 | FinFlow | organic 3D (wireframe) | wireframe-глобус | loop | fintech |
| 082 | Remit Race | product theatre (device) + kinetic | телефоны «ONE GLOBE ONE FUTURE» | parallax | fintech |
| 083 | Stark Minimal Footer | (глитч) dark minimal | — | scroll | footer |
| 084 | Arceage Contact Us | (глитч) form | — | scroll | form |
| 085 | AI Calorie Tracker | product theatre (device) | триптих телефонов калорий-app | parallax | health |
| 086 | Supplement Shop | product/ecommerce | страница добавок на зелёном | scroll | health |
| 087 | Wellness Devicex ★ | product theatre + editorial | «MEASURED» + террариум-купол | zoom | health |
| 088 | Dental Care App | product theatre (device) | телефоны dental-app | parallax | health app |
| 089 | Aesthetic Dental Clinic | product/editorial | улыбка крупно + услуги | scroll | healthcare |
| 090 | Dental Implant Clinic | product theatre (device+3D) | телефоны + 3D-зуб | parallax | healthcare |
| 091 | Modern Dental Clinic ★ | surreal composite (scale) | крошечные рабочие на гигантском зубе | parallax | healthcare |
| 092 | AI Workflow Hero | organic 3D (nature) | мшистая каменная арка над долиной | loop | hero |
| 093 | Audio Showcase ★ | organic 3D (natural material) | винил врос в мшистый камень | loop | hero |
| 094 | Bio-Age Dashboard ★ | dark cinematic + organic 3D | светящаяся ДНК-спираль + лицо | loop | hero |
| 095 | Bio-Digital | (глитч) light | мыльный пузырь | loop | hero |
| 096 | Bold Studio | character-led 3D | 3D-персонаж с мечами (red) | idle | hero |
| 097 | Book Hero | product theatre (floating) | парящие книги «Light Cast» | parallax | hero |
| 098 | Cargo Group ★ | editorial + kinetic type | «BEYOND BORDERS» + фура на закате | scroll | hero |
| 099 | Cinematic Brand ★ | dark cinematic (light ring) | красно-синее энергокольцо-портал | loop | hero |
| 100 | Contact Cybernetic | (глитч) chrome figure | — | cursor | hero |
| 101 | Conversion | (глитч) light flowers | — | scroll | hero |
| 102 | Cosmic | dark cinematic (depth) | одинокий астероид в космосе | loop | hero |
| 103 | CozyPaws | editorial + product | «Everything Your Pets Love» | scroll | hero |
| 104 | Creative Portfolio | editorial + kinetic | цветочная арка + самолёт «VIKTOR» | scroll | hero |
| 105 | Cursor Follow ★ | character-led 3D (mascot) | 3D-йети машет, следит за курсором | cursor | hero |
| 106 | Cyberpunk Reveal | dark cinematic (glitch) | киберпанк-фигура, глитч-раскрытие | scroll | hero |
| 107 | Cybersecurity Hero | (глитч) dark/purple | — | scroll | hero |
| 108 | Cybersecurity Hero v2 | (глитч) purple | — | scroll | hero |
| 109 | Eco Intelligence ★ | organic 3D (natural material) | камень с красным цветком, левитация | loop | hero |
| 110 | Equilibrium | dark cinematic (in hand) | рука тянется к светящейся планете | cursor | hero |
| 111 | FinancialFocus | product theatre (3D cards) | парящие «wavebank» карты | cursor | hero |
| 112 | Futuristic Cinematic ★ | organic 3D (glass) + kinetic | глянцевая сфера + «strategy meets spark» | loop | hero |
| 113 | Futuristic Tech | (глитч) фигура в поле | — | loop | hero |
| 114 | Growth Marketing SaaS | (глитч) одуванчик/растения | — | scroll | hero |
| 115 | Immersive Ocean ★ | surreal 3D (product theatre) | светящийся аквариум-куб с рыбами | loop | hero |
| 116 | Impact Ventures | character-led 3D | 3D-ровер на поле + лучи | loop | hero |
| 117 | Innovation Studio | organic 3D (particles) | процедурная wireframe-форма | cursor | hero |
| 118 | Integration SaaS ★ | portal/window | светящаяся дверь-портал в облаках | scroll | hero |
| 119 | IntelligentX | dark cinematic (3D head) | кибернетическая голова-мозг | loop | hero |
| 120 | Interactive Discovery | dark cinematic (terrain) | светящийся оранжевый каньон | cursor | hero |
| 121 | Interactive Portfolio | (глитч) grey | — | cursor | hero |

<!-- индекс продолжается по мере разбора листов 08–16 -->


### Imperial VPN · `imperial-vpn` [045]
- **Тип:** cybersecurity landing · organic 3D (sculpture) + editorial · light-gold.
- **Hero:** барочная золотая статуя (рыцарь/фигура) как единственный объект; serif-манифест «Conquer the web — Unseen. Untouchable. Imperial.» и мелкие служебные блоки.
- **Механика внимания:** героический скульптурный объект = якорь «неприступности» → взгляд к фигуре и заявлению; глубина — золото/тени на светлом.
- **Структура:** cinematic-editorial hero → (превью) фичи защиты.
- **Текст:** serif как имперская, авторитетная форма + смысл; мелкий mono-набор для контраста.
- **Motion:** медленный параллакс/поворот статуи + reveal текста; спокойно, «музейно».
- **Реализация:** 3D-скульптура (Three.js) или prerendered + parallax; reduced-motion — статичный рендер.

### Spatial Mapping Platform · `spatial-mapping-platform` [049]
- **Тип:** data platform · organic 3D (foil/holographic) · light.
- **Hero:** мятый иридесцентный фольгированный блоб в центре, «Advanced maps data / Superior navigation», по краям крупные статы (3.2M / 4.1M).
- **Механика внимания:** голографический объект-«материя данных» = якорь → взгляд к нему, затем к цифрам-доказательствам; глубина — свет на фольге.
- **Структура:** hero-объект+обещание → статы → (превью) продукт/карты.
- **Текст:** заголовок = смысл; чистый sans, крупные числа как proof.
- **Motion:** медленное вращение/переливы фольги, реакция на курсор.
- **Реализация:** WebGL с holographic/foil-шейдером (thin-film + normal-noise); reduced-motion — статичный кадр.

### Shipping Infrastructure · `shipping-infrastructure` [051]
- **Тип:** developer/infra landing · organic 3D (ribbon) + editorial · light.
- **Hero:** цветная сегментированная лента-волна («поток») пересекает поле; «Redefine the flow of *Shipping*» sans+italic внизу-слева.
- **Механика внимания:** лента как метафора потока/пайплайна → взгляд вдоль неё к заголовку; намеренно светлое поле усиливает объект.
- **Структура:** hero-метафора потока → (превью) продукт/доки.
- **Текст:** headline = смысл+форма (italic-акцент на «Shipping»); чистый sans/grotesk.
- **Motion:** волновое течение сегментов ленты (flow) + лёгкий параллакс; один приём.
- **Реализация:** WebGL/ shader-ribbon или анимированный SVG-mesh; reduced-motion — статичная лента.

### Model Infrastructure · `model-infrastructure` [052]
- **Тип:** developer platform (AI) · dark cinematic · dark.
- **Hero:** одинокая фигура у большого окна смотрит на планету/луну; «Own Your Intelligence», логотипы (NVIDIA, Jupiter) как proof.
- **Механика внимания:** фигура спиной + космический вид = кинематографичная глубина → взгляд к окну; тёмное поле, окно-свет = exit cue.
- **Структура:** cinematic hero → логотипы-доверие → (превью) продукт/инфраструктура.
- **Текст:** короткий imperative-заголовок = смысл; чистый sans, высокий контраст.
- **Motion:** медленный параллакс сцены/движение неба за окном + reveal; спокойно.
- **Реализация:** многослойная сцена (фигура/окно/космос) с parallax или видео; reduced-motion — статичный кадр.

### Futuristic Eyewear (Orven) · `futuristic-eyewear` [057]
- **Тип:** ecommerce/fashion · product theatre · cool/light.
- **Hero:** лицо модели в футуристичных очках, взгляд вверх, крупный план; лого «Orven®» снизу, мелкий UI.
- **Механика внимания:** лицо+продукт крупно = продукт входит в пространство зрителя → взгляд к очкам; глубина — резкий продукт / мягкий фон.
- **Структура:** product-hero → (превью) детали/материалы/покупка.
- **Текст:** роль — премиальная подпись/лого; чистый sans, акцент на продукте.
- **Motion:** медленный зум/параллакс лица + блик на линзах; низкая амплитуда.
- **Реализация:** фото-слои с parallax/scale или короткий видеолуп; reduced-motion — статичный кадр.





---

## Полный разбор — стендауты листов 04–07

### Fun 404 Page · `fun-404-page` [064]
- **Тип:** education/404 · character-led 3D · orange.
- **Hero:** дружелюбный 3D-лис-маскот в браузер-рамке + гигантский «404»; «Oops, something went wrong».
- **Механика внимания:** милый персонаж смягчает ошибку → взгляд к маскоту и «404»; глубина — фигура над плоским оранжевым.
- **Структура:** playful 404-hero → кнопка возврата.
- **Текст:** «404» = графическая форма; жирный sans, дружелюбный тон.
- **Motion:** idle-анимация лиса (покачивание/жест) + лёгкий параллакс.
- **Реализация:** rigged 3D-маскот или спрайт-луп в device-рамке; reduced-motion — статичная поза.

### Outdoor Apparel · `outdoor-apparel` [068]
- **Тип:** fashion/outdoor · editorial (long-form manifesto) · olive/dark.
- **Hero:** длинный serif-манифест «We believe true performance isn't measured by appearance…» поверх приглушённого фото снаряжения.
- **Механика внимания:** текст-исповедь = главный носитель (редкий ход) → читается как бренд-философия; спокойный слой — тёмное фото под текстом.
- **Структура:** манифест-hero → (превью) продукт/коллекция.
- **Текст:** большой serif-абзац = смысл И форма одновременно; акцентные символы-разделители (✧).
- **Motion:** медленный параллакс фото + плавный reveal строк на scroll.
- **Реализация:** CSS scroll-reveal текста + parallax фото; reduced-motion — статичный набор.

### Cognitra Feature · `cognitra-feature` [069]
- **Тип:** feature/AI · organic 3D + dark cinematic (particles) · dark.
- **Hero:** взрыв светящихся частиц-сети (нейросеть) в тёмном поле; «…END-TO-END AI …SYSTEMS».
- **Механика внимания:** дышащее облако частиц = якорь-энергия → взгляд к ядру свечения; глубина — частицы в объёме.
- **Структура:** particle-hero → (превью) фичи ИИ.
- **Текст:** короткий imperative = смысл; технический sans, свечение как акцент.
- **Motion:** формирование/пульс частиц, реакция на курсор; один приём.
- **Реализация:** GPU particle-system (Three.js/WebGL points) или видеолуп; reduced-motion — статичный кадр ядра.

### Nike Hover · `nike-hover` [077]
- **Тип:** feature/product · product theatre (product-in-hand) · dark.
- **Hero:** рука держит белый кроссовок, крупно; мелкий график «78% next-gen cushioning».
- **Механика внимания:** продукт в руке = входит в пространство зрителя → взгляд к обуви; резкий продукт / тёмный фон.
- **Структура:** product-hero → (превью) технология/покупка.
- **Текст:** роль — proof-подпись (78%); чистый sans, акцент на продукте.
- **Motion:** cursor-parallax/поворот кроссовка + блик; низкая амплитуда.
- **Реализация:** 3D-модель обуви (Three.js) с cursor-rotation или фото-слои; reduced-motion — статичный кадр.

### Wellness Devicex · `wellness-devicex` [087]
- **Тип:** health/wellness · product theatre + editorial · dark.
- **Hero:** стеклянный купол-террариум с миниатюрной живой природой внутри; крупный serif «MEASURED» поверх.
- **Механика внимания:** «мир под стеклом» = метафора точности/заботы → взгляд внутрь купола; serif-слово как форма поверх объекта.
- **Структура:** cinematic hero → (превью) продукт/подход.
- **Текст:** «MEASURED» = смысл+форма (крупный serif); контраст с мелким UI.
- **Motion:** медленное вращение/дыхание сцены внутри купола + reveal слова.
- **Реализация:** 3D-сцена в стекле (refraction) или видеолуп; reduced-motion — статичный кадр.

### Modern Dental Clinic · `modern-dental-clinic` [091]
- **Тип:** healthcare · surreal composite (игра масштаба) · teal.
- **Hero:** крошечные «рабочие» чистят/чинят гигантский белый зуб (лестницы, инструменты); «Restore Your True Smile», 98%.
- **Механика внимания:** сюрреалистичный контраст масштабов = мгновенный визуальный вопрос → взгляд ловит миниатюрных людей; глубина — большой объект + мелкие фигуры.
- **Структура:** surreal hero → proof (98%) → (превью) услуги.
- **Текст:** заголовок = смысл; sans, бирюзовый бренд-акцент.
- **Motion:** лёгкая анимация фигурок/параллакс + reveal текста.
- **Реализация:** композит 3D/фото со scale-контрастом + parallax; reduced-motion — статичная сцена.

### Audio Showcase · `audio-showcase` [093]
- **Тип:** hero/music · organic 3D (natural material) · light-nature.
- **Hero:** виниловая пластинка, вросшая в мшистый камень/природу — «конфликт миров» (техно-объект в органике).
- **Механика внимания:** неожиданное сочетание винила и мха = визуальный вопрос → взгляд к объекту; глубина — объект в природной сцене.
- **Структура:** object-hero → (превью) музыка/релизы.
- **Текст:** роль — тихая подпись; акцент на объекте-гибриде.
- **Motion:** медленное вращение пластинки/дрейф частиц природы, реакция на курсор.
- **Реализация:** 3D-композит (винил+мох) с slow rotation или видеолуп; reduced-motion — статичный кадр.

### Bio-Age Dashboard · `bio-age-dashboard` [094]
- **Тип:** hero/health · dark cinematic + organic 3D · dark.
- **Hero:** светящаяся золотая ДНК-спираль рядом с лицом «Benjamin Carter» на чёрном.
- **Механика внимания:** спираль-ДНК = биотех-якорь → взгляд по её витку к лицу; глубина — свечение на чёрном.
- **Структура:** cinematic hero → (превью) дашборд/метрики.
- **Текст:** имя+короткий заголовок = смысл; sans, золото как акцент.
- **Motion:** вращение/рост ДНК + частицы; спокойно, но заметно.
- **Реализация:** WebGL-спираль (particles/helix) или видеолуп; reduced-motion — статичный кадр.

### Cargo Group · `cargo-group` [098]
- **Тип:** hero/logistics · editorial + kinetic typography · закатный.
- **Hero:** гигантское «BEYOND BORDERS AND LIMITS» рядом с фурой на трассе на закате; «Logistics shaped by scale», 3M+.
- **Механика внимания:** крупный заголовок-масса + движущаяся фура = скорость/масштаб → взгляд к обещанию; глубина — дорога в перспективе.
- **Структура:** kinetic hero → proof (3M+) → (превью) услуги.
- **Текст:** headline = смысл+форма (очень крупно); жирный grotesk, фото-акцент.
- **Motion:** движение дороги/фуры (loop) + лёгкий трекинг заголовка.
- **Реализация:** видео дороги + текст поверх, CSS-трекинг; reduced-motion — стоп-кадр.

### Cinematic Brand · `cinematic-brand` [099]
- **Тип:** hero/brand · dark cinematic (light ring/portal) · dark.
- **Hero:** пылающее красно-синее энергокольцо-портал в чёрном космосе; «Innovate…» в центре.
- **Механика внимания:** кольцо-огонь = единственный свет → взгляд в центр портала; глубина — свечение и искры на чёрном.
- **Структура:** cinematic hero → (превью) бренд/продукт.
- **Текст:** короткий заголовок в центре кольца = смысл+форма; sans, огонь как акцент.
- **Motion:** вращение/горение кольца, дрейф искр; один мощный приём.
- **Реализация:** WebGL/shader огненного кольца или видеолуп; reduced-motion — статичный кадр.

### Cursor Follow (Yeti) · `cursor-follow` [105]
- **Тип:** hero · character-led 3D (mascot) · light-nature.
- **Hero:** милый 3D-йети машет рукой и следит за курсором; «1 Earth», природный фон.
- **Механика внимания:** маскот реагирует на курсор = прямая причинность → зритель «примеряет» управление; глубина — фигура над пейзажем.
- **Структура:** mascot-hero → (превью) миссия/продукт.
- **Текст:** роль — короткая подпись; акцент на персонаже.
- **Motion:** cursor-follow головы/взгляда + idle-жест; герой движется сильнее фона.
- **Реализация:** rigged 3D-маскот (Three.js) с cursor-normalized rotation; reduced-motion — idle без слежения.

### Immersive Ocean · `immersive-ocean` [115]
- **Тип:** hero · surreal 3D (product theatre) · dark.
- **Hero:** светящийся аквариум-куб с рыбами и лучами света, парящий в тёмном поле — сюрреалистичный объект.
- **Механика внимания:** «океан в кубе» = визуальный вопрос → взгляд внутрь объёма; глубина — куб, рыбы, лучи.
- **Структура:** surreal object-hero → (превью) продукт/история.
- **Текст:** роль — тихая подпись; акцент на объекте-сцене.
- **Motion:** движение рыб/лучей внутри куба + медленное вращение.
- **Реализация:** WebGL-сцена (аквариум, caustics) или видеолуп; reduced-motion — статичный кадр.

### Integration SaaS · `integration-saas` [118]
- **Тип:** hero/SaaS · portal/window · pink-mist.
- **Hero:** светящаяся дверь-портал в туманных облаках; «One Central Hub for Every Source».
- **Механика внимания:** портал = обещание перехода «в другой мир/хаб» → взгляд в светящийся проём; глубина — дверь на среднем плане в дымке.
- **Структура:** portal-hero → (превью) интеграции/продукт.
- **Текст:** заголовок = смысл; чистый sans, свет портала как акцент.
- **Motion:** свечение/дрейф тумана вокруг двери + reveal текста; на scroll портал может расширяться в след. секцию.
- **Реализация:** слой-портал (свет/маска) + parallax тумана; reduced-motion — статичный кадр.

<!-- индекс 122–168 -->
| 122 | Lead Funnel | product/UI | email-инпут + парящие иконки | idle | hero |
| 123 | Learnly | (глитч) light | — | scroll | hero |
| 124 | Luminara ★ | organic 3D (natural) | скрученная корневая спираль в лесу | loop | hero |
| 125 | Luxury Hero | editorial (architecture) | закатная вилла «timeless elegance» | scroll | hero |
| 126 | Naturecore SaaS | organic 3D (nature) | плавающий остров природы | loop | hero |
| 127 | Network Hero | data 3D (network) | сфера-сеть с аватар-узлами | cursor | hero |
| 128 | Obsidian Hero | dark cinematic | тело/рука из черноты | loop | hero |
| 129 | Organic Odyssey | (глитч) dark nature | — | scroll | hero |
| 130 | Portal | portal/window | монеты/орбы сквозь портал-дугу | scroll | hero |
| 131 | Prosthetics Hero | product theatre | чёрная протез-рука | cursor | hero |
| 132 | Retro-Futurist ★ | character-led (surreal) | человек с Mac-монитором вместо головы | idle | hero |
| 133 | Reveal Hero | dark cinematic (glitch) | кибер-маска + пиксель-раскрытие | scroll | hero |
| 134 | Solar Energy Hero | editorial/product | дом с панелями «$0 bills 7 years» | scroll | hero |
| 136 | Stillmind | portal/editorial | горное озеро в рамке «Clarity…» | cursor | hero |
| 137 | Subscription Agency | editorial + kinetic (italic) | «Premium creative alwayzzz» + логотипы | scroll | hero |
| 138 | Tech-Forward ★ | product theatre (hand) | чёрная робо-рука «One Card, Zero Limits» | cursor | hero |
| 139 | Unwind Hero | editorial (nature/travel) | туманный лес-домик «Hideaways» | parallax | hero |
| 140 | VaultShield | (глитч) light 3D | — | loop | hero |
| 141 | Velorix IIC | organic 3D (crystal) | светящийся кристалл-объект | cursor | hero |
| 142 | Vertex Sci | editorial (nature POV) | взгляд вверх сквозь крону + самолёт | scroll | hero |
| 143 | Vision Reveal ★ | character-led 3D (voxel) | синий воксель-персонаж «Visuals» | cursor | hero |
| 145 | Waitlist Hero | editorial (nature) | горный закат-озеро + объект | parallax | hero |
| 146 | Wellbeing OS | editorial + nature | жёлтые цветы «Bridge the gaps» | scroll | hero |
| 147 | Wellness Balance | product (supplement) | «Power of Nature in Every Capsule» | scroll | hero |
| 148 | Wellness Hero | editorial/product | наушники «Your calm is always within» | scroll | hero |
| 149 | Dot ★ | editorial + product (retro) | пляж + Nokia «Short notes. Daily calm» | scroll | hero |
| 150 | EMBER.dsgn | organic 3D / dark | контраст огонь/уголь-лёд | loop | hero |
| 151 | Guardnet Demo | organic 3D (fluid) | иридесцентная нефть-сфера | cursor | info |
| 152 | Scroll Landing Page | dark cinematic (scroll) | сцена «Pitch Of Legends» | scroll | interactive |
| 153 | 3D Story | organic 3D (flower) | светящийся полупрозрачный цветок | loop | landing |
| 154 | AI Automation | organic/dark (particles) | частицы-взрыв «Scaling with AI» | loop | landing |
| 155 | AI Interface | dark cinematic / portal | голубая радужка-портал (глаз) | loop | landing |
| 156 | Acreage Farming | editorial (architecture/agri) | вилла + «Precision Farming» + статы | scroll | landing |
| 157 | AeroCore | editorial + product | аэрокосмический двигатель | scroll | landing |
| 158 | Apex Pulse ★ | surreal composite | лицо из цветов «Precision in every line» | parallax | landing |
| 159 | Art Landing | editorial + surreal | облака + serif «Routine Automation» | scroll | landing |
| 160 | Bloom ★ | product theatre (in hand) + nature | рука с стеклянными картами в сакуре | cursor | landing |
| 161 | Cinematic Landing (Bakery) ★ | product theatre (food) | стол десертов «Smart Bakery Solution» | scroll | landing |
| 162 | Clarity Core | dark cinematic (macro) | голубой глаз-радужка «Skin Regeneration» | loop | landing |
| 163 | Cosmos Interface | dark cinematic (character) | лицо астронавта в шлеме | loop | landing |
| 164 | Creative Agency ★ | character/editorial (bold) | фигура в балаклаве «creative studio» | scroll | landing |
| 165 | Digital Experiences | editorial | serif «Crafted Digital Experiences» | scroll | landing |
| 166 | Dreamcore Landing ★ | portal/window (dreamcore) | мшистый портал-пещера «Gateway Reverie» | scroll | landing |
| 167 | Financial Suite | product theatre (device) + cinematic | ночь + телефон «One Card» | parallax | landing |
| 168 | Future-State | dark cinematic / portal | голубая радужка-портал | cursor | landing |

---

## Полный разбор — стендауты листов 08–10

### Apex Pulse (лицо из цветов) · `apex-pulse` [158]
- **Тип:** landing · surreal composite (face + botanicals) · light-vivid.
- **Hero:** портрет-лицо, собранное/обрамлённое цветами, крупным планом; «Precision built into every line».
- **Механика внимания:** гибрид «лицо + флора» = мгновенный визуальный вопрос → взгляд удерживают глаза среди лепестков; глубина — лицо/цветы/фон.
- **Структура:** surreal hero → (превью) продукт/бренд.
- **Текст:** короткий заголовок = смысл; чистый sans, вся экспрессия у образа.
- **Motion:** лёгкий дрейф цветов/параллакс лица, взгляд следит за курсором.
- **Реализация:** фото-композит со слоями + parallax/subtle morph, либо генеративный кадр-видео; reduced-motion — статичный портрет. (Приём созвучен нашей студийной сюрреал-дирекции.)

### Dreamcore Landing (портал-пещера) · `dreamcore-landing` [166]
- **Тип:** landing · portal/window (dreamcore) · surreal-dark.
- **Hero:** мшистый арочный портал-пещера, открывающий сновидческий пейзаж; «Gateway Reverie».
- **Механика внимания:** портал = обещание «другого мира» → взгляд втягивается в проём; глубина — арка/внутренний пейзаж/дымка.
- **Структура:** portal-hero → (на scroll портал раскрывается в след. секцию).
- **Текст:** заголовок = смысл+атмосфера; serif/sans, свет портала как акцент.
- **Motion:** дрейф частиц/света в проёме + scroll-раскрытие портала в full-bleed.
- **Реализация:** sticky-сцена, маска-портал + parallax внутреннего слоя; reduced-motion — статичный кадр.

### Vision Reveal (voxel-персонаж) · `vision-reveal` [143]
- **Тип:** hero/portfolio · character-led 3D (voxel) · light.
- **Hero:** синий воксельный (pixel-art 3D) персонаж-маскот; «I build compelling visual stories», крупное «Visuals» внизу.
- **Механика внимания:** необычная воксель-фактура = якорь-личность → взгляд к персонажу; текст-форма «Visuals» = средний план.
- **Структура:** character-hero → (превью) работы/портфолио.
- **Текст:** headline = смысл; «Visuals» как графическая форма; жирный sans.
- **Motion:** idle-анимация вокселя + реакция на курсор; фон-надпись статична.
- **Реализация:** воксельная 3D-модель (Three.js) или спрайт-луп; reduced-motion — статичная поза.

### Retro-Futurist (Mac-голова) · `retro-futurist` [132]
- **Тип:** hero · character-led (surreal) · light-grey.
- **Hero:** человек в костюме с винтажным Macintosh вместо головы, крупно; курсор-подсказка.
- **Механика внимания:** сюрреалистичная подмена головы = визуальный вопрос → взгляд к «экрану-лицу»; намеренно плоская серая сцена усиливает абсурд.
- **Структура:** surreal hero → (превью) о студии/подходе.
- **Текст:** роль — служебная подпись; мелкий mono, весь акцент на образе.
- **Motion:** мерцание/контент на «экране-голове» + лёгкий сдвиг; один приём.
- **Реализация:** фото-композит + анимированный экран (video-in-mask); reduced-motion — статичный кадр.

### Cinematic Bakery · `cinematic-landing-bakery` [161]
- **Тип:** landing/food · product theatre (food styling) · warm-dark.
- **Hero:** щедрый стол десертов (торты, печенье, эклеры) в тёплом кино-свете; «THE SMART BAKERY SOLUTION».
- **Механика внимания:** обильная food-сцена = аппетитный якорь → взгляд блуждает по деталям; глубина — передние сладости/стол/фон.
- **Структура:** food-hero → (превью) продукт/сервис.
- **Текст:** заголовок-слоган = смысл; засечный/жирный sans, тёплый акцент.
- **Motion:** медленный push-in/параллакс камеры по столу + reveal текста.
- **Реализация:** видео food-стилизации или фото-слои с parallax; reduced-motion — стоп-кадр.

### Luminara · `luminara` [124]
- **Тип:** hero · organic 3D (natural material) · dark-forest.
- **Hero:** скрученная корневая/лозовая спираль-объект в тёмном лесу с сакурой; «Make ordinary ideas into captivating *narratives*».
- **Механика внимания:** органический завиток = якорь-форма → взгляд по спирали внутрь; глубина — объект/лес/дымка.
- **Структура:** object-hero → (превью) сервис сторителлинга.
- **Текст:** headline с italic-акцентом = смысл+форма; serif/sans, приглушённая палитра.
- **Motion:** медленное вращение/рост спирали + дрейф лепестков; спокойно.
- **Реализация:** 3D-объект (Three.js) со slow rotation или видеолуп; reduced-motion — статичный кадр.

<!-- индекс 169–213 -->
| 169 | Glitch Pulse | character/editorial (bold) | балаклава + «zero mockups, real code» | scroll | landing |
| 170 | Golden Portal | editorial (atmospheric) | золотые облака + лента «Still Frame» | loop | landing |
| 171 | Health Portal | editorial/product (dental) | «Smile makeover», лицо | scroll | landing |
| 172 | Investment Gate | editorial (real estate) | скайлайн + nav-меню | scroll | landing |
| 173 | Layered Depth | organic 3D (natural) | мшистый валун «test of time» | scroll | landing |
| 174 | Luxury Botanical | product (perfume) editorial | флаконы «exclusive community 2K26» | scroll | landing |
| 175 | Luxury Ecommerce Design | product/ecommerce editorial | скинкейр-грид «Nussa» | scroll | landing |
| 176 | Luxury Real Estate | (глитч) dark | — | scroll | landing |
| 177 | Neon Logic | (глитч) neon bars | — | loop | landing |
| 178 | Neural Interface | dark cinematic / data | зелёные glow-панели статов | loop | landing |
| 179 | Nimbus Grid | (глитч) code panel | «data residency» | scroll | landing |
| 180 | PROMPT | editorial fashion (bold) | ч/б модель «Archive Collection» | scroll | landing |
| 181 | Scenic Travel | editorial (nature) | туманные горы «beauty all around» | parallax | landing |
| 182 | Stellar Launch | organic 3D (chrome) | жидкий металл «launchex prizes» | loop | landing |
| 183 | Synthesis | editorial (long-form) | текст-манифест «Healthspan Alliance» | scroll | landing |
| 184 | USD Halo | product theatre (floating) + fintech | парящие монеты «Your Wealth Works» | parallax | landing |
| 185 | Urban Jungle ★ | surreal composite | вагон метро, заросший джунглями | loop | landing |
| 186 | Yoga Coach | character-led 3D (voxel) | воксель-персонаж с йога-ковриком | idle | landing |
| 187 | Email Landing | organic 3D / kinetic | жидкий металл «Revitalized» | loop | landing |
| 188 | Gateway Portal | editorial (atmospheric) | яркое небо «Real wonders. Real worlds» | scroll | landing |
| 189 | Bite-Sized Courses | product theatre (device) + mascot | телефон + 3D-маскот | parallax | learning |
| 190 | Live Language Classes | product/UI (SaaS) | видеозвонок-интерфейс | scroll | learning SaaS |
| 191 | Coffee Rewards | product theatre (device) | телефон кофе-app «Dasha» | parallax | loyalty app |
| 192 | Scroll Marquee | kinetic (marquee) | горизонтальная лента карточек | scroll/auto | marquee |
| 193 | Mind-Body Healing | dark cinematic (medical 3D) | профиль-голова со светящимся мозгом | loop | medicine |
| 194 | Inner Quest | editorial + 3D line | линейные руки (Микеланджело) + wireframe | scroll | mindfulness |
| 195 | Innovation Summit | product theatre (device) | телефоны «Unfold / Speakers / FAQs» | parallax | mobile app |
| 196 | Album App | editorial + kinetic (music) | два винил-диска «Golden Hour» | loop | music |
| 197 | 3D Jack Portfolio (эталон) | character-led 3D | 3D-голова + «Launch your coding career» | cursor/scroll | portfolio |
| 198 | Arctic Lab | editorial (nature/kinetic) | ч/б скалы «With a View» + рамки | scroll | portfolio |
| 199 | Creative Designer Portfolio | editorial + kinetic (gradient) | цветной свуш «retro soul, modern vision» | loop | portfolio |
| 200 | Digital Director ★ | dark cinematic (glitch face) | распадающееся лицо «I bring the unexpected» | scroll | portfolio |
| 201 | 3D Studio Pricing | organic 3D (nature) + pricing | цветочный террариум-остров «$3,180» | loop | pricing |
| 202 | Nex Max Upgrade | (глитч) dark pricing | — | scroll | pricing |
| 203 | NimBus Pricing | UI/pricing | тёмная таблица тарифов | scroll | pricing |
| 204 | Rocket Pricing | (глитч) dark | — | scroll | pricing |
| 205 | SaaS Pricing Flow | UI/pricing (kinetic bg) | карточки тарифов «Forma AI» | scroll | pricing |
| 206 | NexaCore Process | (глитч) purple | — | scroll | process |
| 207 | Daisy Sweet | product/editorial (beauty) | лицо за ромашками | zoom | product |
| 208 | Daisy Wild | product/editorial (beauty) | лицо + цветные ромашки | zoom | product |
| 209 | Beauty Products | product/ecommerce | (светлый) товарная страница | scroll | products |
| 210 | Projects Catalog ★ | index-stage | список «01/02…» + превью-фото | hover | projects |
| 211 | 3D Property ★ | product theatre (3D arch) | 3D-план квартиры-разрез | cursor | real estate |
| 212 | Sky Estate | editorial/cinematic (dreamy) | замок на туманной горе | parallax | real estate |
| 213 | AI Meeting Notes | product/UI | «AI analysis», лицо+телефон | scroll | SaaS |

<!-- индекс 214–259 -->
| 214 | AI Workflow Agents | editorial (nature) SaaS | лавандовый пейзаж «Deploy digital workers» | scroll | SaaS |
| 215 | AuraMail | (глитч) kinetic | «Transformed» световой штрих | loop | SaaS |
| 216 | BookedUp | (глитч) light | список консультаций | scroll | SaaS |
| 217 | CoderCrest | editorial (dark minimal) | «engineering is human + AI» | scroll | SaaS |
| 218 | Cybersecurity SaaS ★ | dark cinematic + data-viz | цветная data-волна «Tracing the unseen» | loop | SaaS |
| 219 | Data Storytelling | organic 3D (natural) + editorial | коряга-корень «Every layer tells a story» | scroll | SaaS |
| 220 | Minimal Workflow SaaS | (глитч) light | — | scroll | SaaS |
| 221 | SAAS Software | editorial (bright) SaaS | небо «Shaping Agencies of tomorrow» + дашборд | scroll | SaaS |
| 222 | Lending AI Agents ★ | editorial + 3D hands (halftone) | тянущиеся руки «Forge trust, drive results» | scroll | SaaS website |
| 223 | Agency Services | index-stage / editorial bold | «SERVICES» + 01/02/03 список | scroll | services |
| 224 | Arceage Services | (глитч) green | — | scroll | services |
| 225 | Solace sign-in | editorial (nature) + form | лавандовое поле + форма входа | scroll | sign in |
| 226 | Aurora Onboard | UI/onboarding | «Join Aurora» форма на градиенте | scroll | sign up |
| 227 | NovaDesk Signup | (глитч) landscape + form | закат + форма | scroll | signup |
| 228 | Feedback Slider | (пусто) slider | — | drag | slider |
| 229 | Media Card Carousel | product/carousel | карточки запуска ракеты | drag/auto | slider |
| 230 | F1 Driver Profile ★ | editorial sports (bold) | Хэмилтон в форме Ferrari + числа | scroll | sports |
| 231 | Footballer Portfolio | product theatre (device) | телефоны «More than a footballer» | parallax | sports |
| 232 | F1 Racing Hub | product theatre (device) | телефоны F1 «SF-26» | parallax | statistics app |
| 233 | Arceage Stats | (глитч) dark | — | scroll | stats |
| 234 | CleanTech | organic 3D (natural) + long-form | мшистая земля + манифест «green solutions» | scroll | sustainability |
| 235 | Glassmorphic Feature Tabs | (глитч) glassmorphism | таб-переключение | click | tabs |
| 236 | Technical Specifications | (глитч) dark tabs | — | click | tabs |
| 237 | Innovation Lab | dark cinematic / organic | луна + лепестки «Forging Tomorrow» | loop | technology |
| 238 | Kova Testimonial | (пусто) light | — | scroll | testimonial |
| 239 | Arceage Testimonial | (глитч) | — | scroll | testimonials |
| 240 | Radial Diagram | (глитч) diagram | «websites» радиальная схема | hover | testimonials |
| 241 | CARGOX Mobile | product theatre (device) | телефоны «Beyond Borders» | parallax | transportation |
| 242 | Cross-Border | product theatre (device) | телефон + фура закат | parallax | transportation |
| 243 | AI Trip Planner | editorial (illustration) + form | иллюстрация «Where will you go next?» | scroll | travel |
| 244 | Place Saver | product theatre (device) | телефоны «your places» + светящаяся рука | parallax | travel |
| 245 | Places Organizer | product theatre (device) | телефоны «your places» | parallax | travel |
| 246 | Travel Explorer | product theatre (device) | телефон «Destinations» | parallax | travel |
| 247 | Travel Journal | product theatre (device) | телефон «Tokyo/Seoul/Bali» | parallax | travel |
| 248 | Wanderful Hero | editorial (atmospheric) | закат + силуэт на горизонте | parallax | travel |
| 249 | Luxury Escapes | product theatre (device) | телефоны «Unparalleled Luxury» | parallax | travel app |
| 250 | Halo Use Case | (глитч) voxel building | — | scroll | use case |
| 251 | Mythic VPN | organic 3D (sculpture) | золотая статуя-рыцарь (= Imperial VPN) | parallax | VPN |
| 252 | — (HLS, без кадра) | — | — | — | — |
| 253 | Neo Museum ★ | editorial (museum) + 3D fossil | скелет птерозавра «Unearth the stories» | scroll | website |
| 254 | Celestial Renewal | editorial (atmospheric) | радужное небо «Serene…» | scroll | wellness |
| 255 | Mood Tracker | product theatre (device) | телефоны wellness + растения | parallax | wellness |
| 256 | Routine Coach | product/editorial | «Daily routines that never break» + телефон | scroll | wellness |
| 257 | Wellness Companion | product theatre (device) | телефон «wellness boost» + волны | parallax | wellness |
| 258 | Halo Benefits | (глитч) light | — | scroll | why us |
| 259 | Mythic Naturecore ★ | organic 3D (natural/atmospheric) | мшистый лес-руины + лучи света | loop | landing |

---

## Полный разбор — стендауты листов 11–16

### Urban Jungle · `urban-jungle` [185]
- **Тип:** landing · surreal composite · light-nature.
- **Hero:** вагон метро, полностью заросший джунглями (сюрреальный контраст урбан/природа); мягкий дневной свет.
- **Механика внимания:** невозможная сцена = визуальный вопрос → взгляд исследует детали заросли; глубина — двери/зелень/перрон.
- **Структура:** surreal hero → (превью) продукт/история.
- **Текст:** роль — тихая подпись; акцент на образе.
- **Motion:** лёгкий параллакс/дрейф листвы, частицы; спокойно.
- **Реализация:** фото-композит со слоями + subtle parallax; reduced-motion — статичный кадр.

### Cybersecurity SaaS (data-wave) · `cybersecurity-saas` [218]
- **Тип:** SaaS/security · dark cinematic + data-viz · dark.
- **Hero:** переливающаяся волна из тысяч частиц/линий (визуализация данных) на чёрном; «Tracing the unseen», счётчик 187,941.
- **Механика внимания:** дышащая data-волна = якорь → взгляд по гребню; счётчик-число = proof; глубина — объём частиц.
- **Структура:** cinematic hero → числа-доказательства → (превью) продукт.
- **Текст:** «Tracing the unseen» = смысл+форма; sans + mono-счётчик, цвет как акцент.
- **Motion:** волновое движение частиц (flow-field) + тикающий счётчик.
- **Реализация:** GPU particles/flow-field (WebGL) + animated counter; reduced-motion — статичный кадр.

### Lending AI Agents (halftone hands) · `lending-ai-agents` [222]
- **Тип:** SaaS · editorial + 3D hands (halftone) · light.
- **Hero:** две тянущиеся друг к другу руки (мотив Микеланджело), собранные из halftone-точек; «Forge trust, drive results.»
- **Механика внимания:** классический жест «касания» = эмоциональный якорь → взгляд к точке контакта; намеренно светлое поле.
- **Структура:** editorial hero → «Dialogues that spark progress» → (превью) продукт.
- **Текст:** headline = смысл; serif/sans, halftone как фактурный акцент.
- **Motion:** сближение рук / дрейф точек halftone + reveal текста.
- **Реализация:** halftone-шейдер/particles на 3D-руках или анимированный SVG; reduced-motion — статичный кадр.

### Neo Museum (fossil) · `neo-museum` [253]
- **Тип:** website/museum · editorial + 3D fossil · light.
- **Hero:** скелет птерозавра (3D-фоссилия) парит на светлом поле; «Unearth the stories of our planet's past through fossils, minerals, and ancient wonders.»
- **Механика внимания:** детальная кость-объект = якорь → взгляд по силуэту скелета; намеренно чистое поле, глубина только объектом.
- **Структура:** editorial hero → (превью) экспонаты/коллекции.
- **Текст:** серьёзный serif = музейный тон + смысл; мелкие mono-подписи разделов.
- **Motion:** медленное вращение/парение скелета, реакция на курсор.
- **Реализация:** 3D-модель фоссилии (Three.js) со slow rotation; reduced-motion — статичный ракурс.

### F1 Driver Profile · `f1-driver-profile` [230]
- **Тип:** sports · editorial (bold poster) · dark-red.
- **Hero:** постер-портрет пилота (Hamilton) в форме Ferrari; гигантские «Lewis Hamilton» и числа «227 / 374 / 4982», трек-схема.
- **Механика внимания:** плакатная композиция «звезда + крупные цифры» = спортивная афиша → взгляд к лицу и статам; глубина — фигура/числа/фон.
- **Структура:** poster-hero → статы-сезон → (превью) профиль/карьера.
- **Текст:** имя+числа = смысл+форма (очень крупно); жирный grotesk, красный акцент.
- **Motion:** параллакс слоёв постера + счётчики чисел; энергично, но с опорой.
- **Реализация:** слои фото/типографики с parallax + animated counters; reduced-motion — статичный постер.

### Mythic Naturecore · `mythic-naturecore` [259]
- **Тип:** landing · organic 3D (natural/atmospheric) · green-forest.
- **Hero:** пышный мшистый лес/руины с лучами света сквозь кроны; атмосферная глубина без явного UI.
- **Механика внимания:** световые лучи и глубина леса = медитативный якорь → взгляд втягивается вглубь; глубина — передний мох/деревья/лучи.
- **Структура:** atmospheric hero → (превью) бренд/история.
- **Текст:** минимум текста, тихая подпись; акцент на сцене.
- **Motion:** медленный дрейф лучей/частиц пыльцы + лёгкий параллакс; спокойно.
- **Реализация:** видео/3D-сцена леса (god-rays, particles) + parallax; reduced-motion — статичный кадр.
