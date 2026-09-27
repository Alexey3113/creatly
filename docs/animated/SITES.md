# ANIMATED — 30 оригинальных кино-концептов

Правила: оригинальные бренды/копирайт (не клоны рефов); своя палитра из кинокадра; один доминирующий приём/экран;
ротация 7 классов; НЕ повторять порядок сцен; у каждого ≥1 уникальный приём. Движок ScrollStage.
Ассеты: `none` (чистый DOM/CSS/shader/canvas) или `higs:<что генерить>`.

| # | slug | class | приём (доминанта) | палитра | ассет | статус |
|---|---|---|---|---|---|---|
| 01 | manifesto | editorial | line-mask reveal + day→night | ink/bone/gold | none | ✅ |
| 02 | kinetic | kinetic-type | velocity-skew marquee + split-portal | paper/ink/electric-blue | none | ✅ |
| 03 | member | editorial | inline-photo grows from text line | warm-grey/ember | higs:portrait cinematic | ✅ |
| 04 | ascend | scroll-reveal | depth-slice photo (4 плоскости) | alpine dawn peach/cool | higs:alpine peaks dawn | ✅ |
| 05 | relic | scroll-reveal | museum backlit-ring + clip-path заголовки | black/electric-blue | higs:marble bust studio | ✅ |
| 06 | flux | webgl-hero | shader domain-warp градиент | charcoal/cobalt→magenta | none (shader) | ✅ |
| 07 | orbit | 3d-theatre | video-scrub облёт объекта | espresso/amber | higs:product turntable render | ✅ |
| 08 | terra | webgl-hero | realtime planet day→night (three) | space navy/amber-rim | higs:earth textures | ✅ |
| 09 | genesis | particle | particle-morph объект→объект→CTA | black/gold+blue dust | none (webgl) | ✅ |
| 10 | ledger | ui-micro | live count-up калькулятор | forest-green/lime | none | ✅ |
| 11 | column | scroll-reveal | full-height accordion-columns | sage/bone | higs:chair natural-light ×4 | ✅ |
| 12 | pulse | webgl-hero | particle-globe fresnel-bloom | near-black/molten-orange | none (webgl) | ✅ |
| 13 | split | kinetic-type | product woven fg/bg вордмарка | candy-block per section | higs:can + fruit | ✅ |
| 14 | drift | webgl-hero | silk-ribbons реагируют на курсор | navy/cobalt-violet | none (shader) | ✅ |
| 15 | atlas | scroll-reveal | map-hub пины → полноэкранная глава | doc-green/red-blue blocks | higs:worker portraits ×3 | ✅ |
| 16 | helix | 3d-theatre | scroll-scrub ДНК со светящимися нодами | navy/amber-blue bokeh | higs:dna render OR realtime | ✅ |
| 17 | forge | kinetic-type | карты летят сквозь фикс. гигант-шрифт (ghost-blur) | steel-grey/red-tab | none | ✅ |
| 18 | bloom | webgl-hero | органик-тендрилы обрамляют вьюпорт | near-black/botanical | higs:floral OR shader | ✅ |
| 19 | archive | editorial | pinned-фото + cross-fade копи-панелей | beige/brown serif | higs:interior warm | ✅ |
| 20 | signal | editorial | day→night + count-up данные | black/molten sunrise-arc | none | ✅ |
| 21 | prism | webgl-hero | шейдер-градиент втекает в экран устройства | charcoal/neon-gradient | higs:device mockup | ✅ |
| 22 | vertex | 3d-theatre | 3D-полка объектов, экспонат в «разворот» | library amber/burgundy | higs:objects on table render | ✅ |
| 23 | current | scroll-reveal | parallax data-карточки поверх кино-фото | moss-green/cream | higs:nature cinematic | ✅ |
| 24 | echo | kinetic-type | split-title → галерея в разрыве | bone/serif ligature | higs:gallery frames ×5 | ✅ |
| 25 | vigil | scroll-reveal | spotlight/фонарик раскрывает объект | near-black/red | higs:object dark | ✅ |
| 26 | strata | scroll-reveal | depth-slice иллюстрации 2.5D по главам | indigo/amber dusk | higs:flat illustration layers | ✅ |
| 27 | aurora | webgl-hero | fluid flowmap реагирует на скролл | deep-teal/gold | none (shader) | ✅ |
| 28 | monolith | 3d-theatre | video-scrub dolly-in к поверхности | basalt-grey/ember | higs:monolith render | ✅ |
| 29 | cipher | kinetic-type | typewriter + glitch-акцент (редкий) | terminal-black/green | none | ✅ |
| 30 | ovation | particle | поток частиц самособирается в символ | ivory/gold emissive | none (webgl) | ✅ |

Порядок сборки: сначала `none`-ассет (03-тип не нужен): 06 flux, 10 ledger, 17 forge, 20 signal, 29 cipher, 12 pulse,
09 genesis, 27 aurora, 30 ovation, 14 drift (DOM/shader/canvas — без ожидания Higs). Параллельно — Higs-батч для фото/рендер-сайтов.
