# ANIMATED — BUILD SPEC (синтез: vision-агенты × codex × qwen)

Источник: 33 Pinterest-видео + 93 motionsites → каталог `scratchpad/catalog.json` (33 референса, 7 классов).
Архитектура: codex + qwen (независимо сошлись; qwen дал решающую поправку по движку).

## РЕШЕНИЕ ПО ДВИЖКУ (qwen, принято)
StageDeck НЕ расширять — он дискретный snap-deck (wheel-hijack + лок), а нужен непрерывный scroll-scrub.
Новый движок **ScrollStage** («reel»-режим), наследует ДНК StageDeck: контракт CSS-переменных, единый RAF,
reduced-motion→мгновенный финал, те же `<Layer>`. Слои:
- **L0 Transport:** Lenis + нативный высокий скролл (a11y/mobile/SEO), источник правды `scroll`+`velocity`.
- **L1 Clock:** ОДИН RAF/страница — читает Lenis+pointer(`--px/--py`), пишет CSS-переменные батчем, раздаёт прогресс трекам, тикает WebGL. Никаких сторонних RAF.
- **L2 Track:** примитив `(target,start,end,ease)→--t[0..1]` + глобальный `--vel`. Простые скрабы — свой микро-трек; сложные пины — GSAP ScrollTrigger.
- **L3 Рецепты (7 обёрток):** `<PinnedStage>`(музей), `<DepthSlice>`(4 плоскости), `<LineReveal>`(mask-строки), `<VelocityMarquee>`, `<VideoScrub>`, `<ShaderLayer>`, `<ParticleMorph>`. 30 сайтов = композиция кубиков + per-site CSS-арт.
- **L4 Media adapter `<CineMedia>`:** device-tier → still(фото+KenBurns) | video-scrub(mp4/webm+rVFC) | realtime(r3f). Tier=`deviceMemory/cores/dpr/reduced-motion/webgl` → full|light|static.
Контракт сцены: `--t`,`--vel`,`--px/--py`; JS пишет только числа, всё визуальное — в CSS/шейдере.

## СТЕК (оба сошлись — ровно 4 пакета)
`lenis` · `gsap` (+ScrollTrigger +SplitText, всё free в 3.13) · `three` · `@react-three/fiber` (v9, React19 ok).
Опц.: `@react-three/postprocessing` только под bloom флагманов.
НЕ ставить: ogl/curtains (дублируют three), lottie (слоп-вектор), framer-motion/anime/react-spring (второй motion-runtime = зоопарк), locomotive (заменён Lenis).

## PRE-RENDER VIDEO-SCRUB vs REALTIME THREE (ключевое)
- **Video-scrub по умолчанию** для 3d-product-theatre и planet-dolly: fotoreal (стекло/металл/атмосфера/объёмный свет) дешевле запечь (Blender/Higgsfield); камера по фикс-траектории; предсказуемый грейд; 2–6 МБ webm, GPU-decode, на слабом телефоне дешевле realtime. Техника: `muted playsInline preload`, seek через `requestVideoFrameCallback` (1 seek/кадр), poster=фолбэк reduced-motion, малый GOP.
- **Realtime Three** только при интерактиве: hover-ноды (ДНК), drag/конфигуратор, морф частиц в CTA-текст (состояние зависит от контента), непрерывный прогресс.
- **Гибрид:** video-слой + realtime DOM/UI-оверлей на одном `--t` — выглядит как одна сцена, стоит как видео.
- WebGL законен ровно в 2 случаях: >10k движущихся примитивов ИЛИ попиксельный эффект (fluid/градиент/свечение). Текст/маски/раскладка — всегда DOM.

## PER-CLASS РЕЦЕПТЫ
- **editorial-motion(9):** line-mask reveal (строки overflow:hidden, translateY 110→0 по треку), inline-фото width 0→Nvw в строке, count-up (tabular-nums), day→night crossfade+смена палитры по `--t`. DOM/CSS, S.
- **scroll-reveal(6):** музейная формула (pinned + backlit-кольцо radial+blur + clip-path inset() смена заголовков); аккордеон через `flex-grow` (не width); depth-slice кадра на 3–4 слоя с разным translate; карта-хаб pinned SVG → полноэкранная глава. Нет WebGL, S–M.
- **3d-product-theatre(5):** pre-render video-scrub (см. выше); realtime только под конфигуратор. Код S, рендер M.
- **kinetic-typography(5):** marquee `skewX(clamp(--vel))`; расщепление слова + растущий `clip-path:ellipse()`-портал; продукт «вплетён» z-index-сэндвичем fg/bg; motion-blur карт = 2–3 ghost-копии (НЕ filter:blur). Нет WebGL, S–M.
- **webgl-hero(5):** domain-warp simplex градиент (~60 строк frag), particle-глобус с fresnel, silk-ленты по курсору. Один canvas/контекст. M–L.
- **particle/fluid(2):** GPU point-cloud, морф-таргеты как атрибуты, mix по `--t`, финал — сгущение в CTA (таргет из растеризованного текста). Mobile→pre-render. L.
- **ui-microinteraction(1):** rAF count-up калькулятора, tabular-nums. S.

## PERF-БЮДЖЕТ
≤1 WebGL-контекст/страница (IntersectionObserver-пауза вне вьюпорта); ≤1 активно декодируемый scrub-видео (остальные poster+preload=metadata, активация ~1.5 вьюпорта); per-scene `next/dynamic` по приближению; LCP-hero fetchpriority=high. dpr desktop ≤1.5–2 / mobile ≤1.25. JS в кадре <4мс, анимируем только transform/opacity/clip-path, will-change только на время. Reduced-motion — одна политика движка (snap `--t=1`, видео→poster, параллакс off), хук `useMotionPrefs`. **Один доминирующий приём на вьюпорт** (≤1 WebGL + ≤1 видео + ≤2 pinned-трека); соседние секции — «тихие».

## АНТИ-СЛОП (объединённый чеклист)
1. Палитра каждого сайта — из конкретного кинокадра-референса; один акцент; запрет aurora/mesh-градиентов и gradient-text.
2. Никаких fade-up на всё; движется только то, что зритель читает первым.
3. Ни одного стокового ассета (Lottie-персонажи, 3D-blobs, эмодзи в hero); все фото/видео генерятся под арт-дирекшн и грейдятся в палитру.
4. Запрет дефолтных easing; словарь кривых по классам; кино-тайминг 0.8–2.4с, не произвольные числа.
5. Типографика — главный герой: одна display-пара, масштабы 10–12vw; никаких Inter/system по умолчанию, никакого letter-spacing:.2em «для премиума».
6. Запрет «заголовок+подзаголовок+2 кнопки по центру» и glass-карточек rounded-2xl; hero открывается кадром/словом.
7. 30 сайтов ≠ 30 скинов: запрет повтора порядка архетипов; у каждого ≥1 уникальный приём. Совпали 3 из 5 (метафора/материал/камера/ритм/переход) — пересобрать.
8. Каждая анимация отвечает «что чувствует зритель сейчас»; не формулируется — выкинуть.

## ТОП-8 ВАУ/ЦЕНА (объединённо) + порядок запуска
1. Marquee-слова со skew от velocity — kinetic, S, вау8
2. Depth-slice кадра на 4 плоскости — scroll-reveal, S, вау8
3. Line-mask reveal + inline-фото из строки — editorial, S, вау7
4. Музейная формула (backlit-кольцо+объект+clip-path заголовки) — scroll-reveal, M, вау9
5. Video-scrub облёт продукта (pre-render) — 3d-theatre, код S/рендер M, вау9  ← главный инфра-вывод
6. Day→night + count-up — editorial, S, вау7
7. Шейдер-градиент, втекающий в экран устройства — webgl, M, вау8
8. Particle-morph объект→объект→CTA — particle, L, вау10  ← визитка /animated, ОДИН флагман

**Порядок:** №1 сайты собрать из приёмов 1–4 (быстро, без WebGL, задать планку) → сайт «product theatre» ставит video-scrub pipeline (приём 5, главная инфраструктура) → сайт «planet/webgl» (приём 7) → ОДИН head-флагман с приёмом 8. Проверяем весь runtime до тиража.

## 30 КОНЦЕПТОВ (оригинальные, seed — уточняются при сборке; НЕ клоны брендов)
Каждый = {метафора движения · материал · камера · ритм · фирменный переход}, палитра из своего кинокадра.
Флагманы-первые: (a) editorial «line-reveal manifesto», (b) depth-slice «alpine dive-in», (c) музей «single-object plinth», (d) video-scrub «object theatre», (e) realtime «planet day→night», (f) particle «morph-to-CTA».
Полный список 30 верстается в Phase 5 по ротации 7 классов × уникальный приём, без повтора порядка сцен.
