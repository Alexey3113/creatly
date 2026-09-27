# ANIMATED — ветка «how did they do this»

Цель: 30 ВАУ-сайтов с кино-анимациями, вдохновлёнными реальными анимированными сайтами.
Существующие модули (story, story2, visual-hooks, parallax) НЕ трогаем. Cinematic art direction, не слоп.

## Принцип (IP)
Извлекаем **техники анимации** и делаем **оригинальные** кино-сайты в их духе — как story2 строился по пинам.
НЕ клонируем чужой бренд/копирайт/контент 1:1. Цель — «как он это сделал?» через собственную режиссуру.

## Оркестр под-агентов (анти-эхо, экономия квоты)
- **Claude vision-агенты** (видят кадры): описывают ЧТО за анимации по контакт-листам → каталог техник.
- **codex-cli + qwen-cli** (текст, видео не видят): по распознанным техникам проектируют КАК строить на вебе
  (Three.js/WebGL, GSAP ScrollTrigger, CSS/clip-path, canvas, video-scrub, Lottie) + перекрёстно опрашивают
  синтез Claude, ловят слоп и переусложнение. kimi/gemini в системе нет — заменены Claude-агентами.
- Claude (я) — оркестратор + финальный синтез + сборка.

## Источник (корпус)
- 33 видео с Pinterest-поиска «animated web sites» + родственные запросы → `analitic/pins/animated/videos/` (yt-dlp), манифест `videos.json`.
- 163 pin-id пул → `analitic/pins/animated/pins.json`.
- Локальный архив `analitic/motionsites/media`: 93 mp4 + 157 animated-webp реальных анимированных сайтов + `report.md`.
- Контакт-листы (12 кадров, tile 4x3 = прогресс движения): `frames/` (33) + `frames-ms/` (93).

## Пайплайн-скрипты
- `analitic/inspiration/anim-harvest-multi.mjs` — сбор pin-id по нескольким запросам (Pinterest режет ~20/запрос).
- `analitic/inspiration/anim-download.mjs` — yt-dlp видео-пинов, отсев статик-картинок, стоп на N.
- ffmpeg contact-sheets (inline).

## Фазы
0. Recon ✅  1. Пайплайн+ассеты ✅  2. Корпус (33+93) ✅
3. Анализ: 3 vision-агента × 11 листов → каталог техник; затем codex+qwen кросс-разбор web-impl. ← ТЕКУЩАЯ
4. Синтез: каталог техник + дизайн движка + 30 оригинальных кино-концептов.
5. Скаффолд `/animated` (`app/animated/[[...slug]]` + `components/animated-sites/`) + движок + 30 сайтов
   итеративно (ассеты через Higs 127.0.0.1:3210, node 22; скриншот-верификация каждого).

## Целевой стек движка (гипотеза, уточнится после Phase 3-4)
Кандидаты по типам: video-scrub hero (готовый рендер как «живой портрет»), WebGL/Three для 3d-product-theatre,
GSAP ScrollTrigger + CSS для kinetic/scroll-reveal. Один доминирующий приём на экран. reduced-motion всегда.

## PROGRESS (2026-08-06)
- Phase 3 ✅: 3 vision-агента разобрали 33 референса → scratchpad/catalog.json (7 классов).
- Phase 4 ✅: codex+qwen сошлись (qwen: НЕ расширять StageDeck → отдельный ScrollStage) → docs/animated/SPEC.md.
- Phase 5a ✅: стек установлен (lenis/gsap/three/@react-three/fiber, r3f v9↔React19). Модуль:
  app/animated/[[...slug]] + components/animated-sites/{engine,sites,index}. Движок ScrollStage
  (L0 Lenis + L1 единый RAF пишет --scroll/--vel/--px/--py + L2 useTrack/Scene → --t). /animated 200, витрина рендерится.
- Phase 5b (1/6): ФЛАГМАН 1 «Manifesto» (editorial line-reveal) — обложка+строки+scale-ghost+day→night.
  Чистый DOM/CSS на --t, ноль ассетов, ноль JS-ошибок, проверен скриншотами. Pin-режим Scene временно
  обойдён (through-сцены) — pin-scrub допилить в движке перед video-scrub флагманом.
СКРИПТЫ: analitic/inspiration/{anim-harvest-multi,anim-download,shot-animated,shot-scroll}.mjs.
ДАЛЕЕ 5b: 2 depth-slice (нужен 1 кино-кадр Higs) · 3 музей backlit-ring · 4 video-scrub (pin-scrub+рендер) · 5 planet realtime three · 6 particle-morph.

## PROGRESS 2 (2026-08-06) — 6/30 сайтов, оркестр-сборка работает
СБОРКА (движок ScrollStage, все оригинальные бренды/копи, cinematic, проверены скриншотами, ноль JS-ошибок):
- 01 Manifesto (editorial line-reveal, ink/gold) ✅
- 02 Kinetic (velocity-skew marquee + split-portal, paper/blue) ✅
- 10 Ledger «Grove» (РАБОЧИЙ калькулятор count-up, green/lime — реальная польза) ✅
- 29 Cipher «//Sec» (typewriter + один glitch, terminal/phosphor) ✅
- 17 Forge «Anvil» (карты сквозь фикс-гигант-шрифт z-сэндвич+ghost-blur, steel/red) ✅
- 20 Signal «Helios» (восход-солнце day→night + живой count-up, black/molten) ✅
🔨 В полёте: WebGL-агент строит 06 Flux (domain-warp градиент) + 27 Aurora (fluid flowmap) → 8/30.
ДВИЖКОВЫЙ ФИКС: .scene-pin{overflow:visible} — .scene overflow:hidden ломал position:sticky (пустые pin-сцены). Теперь pin-scrub работает.
ГОТЧА Next: подчёркнутые папки app/animated/_x — приватные, НЕ роутятся; для превью использовать дефисные try-x (и чистить после реестра).
ОРКЕСТР: build-агенты пишут ТОЛЬКО свои SiteNN.tsx+css (+свой превью-роут), реестр index.tsx подключаю централизованно (без коллизий).
HIGS API (для фото/рендер-сайтов): POST 127.0.0.1:3210/api/jobs/submit + /api/jobs/run + /api/models + /api/status; эталон вызова — scripts/story-gen.ts. Батч ассетов: ascend(alpine), relic(bust), orbit(product), terra(earth), archive(interior), column(chair×4)...
ДАЛЕЕ: дождаться flux+aurora → wire; затем particle-флагманы (genesis/ovation/pulse) + Higs-батч → фото-сайты; ротация до 30.

## ✅ ЗАВЕРШЕНО — 30/30 (2026-08-06)
Все 30 сайтов построены, подключены в реестр (components/animated-sites/index.tsx), проверены скриншотами, ноль JS-ошибок, палитры не повторяются, cinematic art direction (анти-слоп соблюдён), все бренды/копи/ассеты ОРИГИНАЛЬНЫЕ (техники извлечены из анализа 33 референсов — не клоны).
РЕЕСТР (30): manifesto kinetic ledger cipher forge signal flux aurora genesis ovation archive current vigil strata ascend relic column echo pulse drift bloom member prism splash terra orbit atlas helix vertex monolith.
7 КЛАССОВ ПОКРЫТЫ: editorial-motion, kinetic-typography, ui-microinteraction (рабочий калькулятор — реальная польза), webgl-hero (flux/aurora/drift/bloom/prism шейдеры), particle/fluid (genesis/ovation GPU-морф), scroll-reveal (музей/депт-слайс/аккордеон/фонарик/карта-хаб), 3d-product-theatre (terra/orbit/helix/vertex/monolith).
ДВИЖОК: components/animated-sites/engine/ — ScrollStage (Lenis+единый RAF+--scroll/--vel/--px/--py) · Track (Scene→--t) · useShaderHero · useParticleHero · useHelix. Роут app/animated/[[...slug]]. Витрина = AnimatedLab (30 карточек).
АССЕТЫ: 19 кино-кадров через Higs (scripts/anim-assets{,2,3}.ts) → public/uploads/1/animated/.
ОРКЕСТР: 3 vision-агента (анализ) → codex+qwen (архитектура, перекрёстно) → ~9 build-агентов (сборка по 2-3 сайта, изолированно) → Claude (реестр/верификация/движок/фиксы). Существующие модули (story/story2/visual-hooks/parallax) НЕ тронуты. git НЕ коммичен.
