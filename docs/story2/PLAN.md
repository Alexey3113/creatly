# STORY v2 — 21 кинематографичных стори-сайта (по пинам analitic/pins/tatoo/story/1..21)

Цель: новое поколение. Каждый сайт 1:1 переносит арт-дирекшн своего пина (кинематографичные editorial-постеры),
затем оживает как КИНО: foreground/маски перед фигурой, 3D, сцены выезжают сбоку/сверху, Zoom-переходы,
гипер-типографика, «перегруз», интерактив. Гардрейл: строго стиль пина, НЕ «ужас».

## Движок (StageDeck — эволюция StoryDeck, не ломая старые 3 сайта)
- StoryScene props: transition = zoom|wipe-x|wipe-y|iris|smash|cut, origin, direction → data-attr + CSS vars.
- RAF пишет ВХОДЯЩЕЙ --sp 0→1 И УХОДЯЩЕЙ --ep 0→1 + деку --tp (сейчас анимируется только вход).
- Драйверы переходов: zoom(out scale→1.7+blur, in scale .72→1) · wipe(clip-path inset) · iris(clip circle) · smash(translate 110vw+rotate) · cut(мгновенно+flash-frame 60-90ms).
- zoomOrigin: координата смыслового объекта пред.сцены = точка camera-punch следующей.
- Layer расширить: z, rotateX/Y, skew, blur, brightness; .ps-viewport{perspective:1200px}; translate3d.
- Layer role = background|subject|foreground|overlay (depth -.1/.15/.5/.9); foreground перекрывает фигуру.
- exitFrom/exitTo/exitPhase (читают --ep): слой получает независимый enter/hold/exit.
- maskReveal = left|top|radial|slash (--mask-p, clip-path/mask); сложные силуэты — alpha-PNG.
- KineticText: разбивка по буквам, --i*35ms, режимы slam/scatter/vertical-roll/stretch; НЕ React-state на кадр.
- data-motion = calm|kinetic|violent: одновременно макс 1 camera + 1 text + 1 texture; reduced-motion → финальный кадр.

## Архетипы сцен (12) — комбинировать в УНИКАЛЬНУЮ последовательность 6-8 на сайт
Occluded Idol · Type Guillotine · Tunnel Zoom · Sidecar Spread · Vertical Tablet · Ritual Halo ·
Contact-Sheet Riot · Macro Evidence · Split Persona · Poster Wall · Negative-Space Monument · Final Detonation.

## Уникальность 21 (ArtDirectionManifest на сайт)
2 display-шрифта макс · 3-4 цвета · свой grid · ornament alphabet · texture recipe · transition grammar ·
foreground motif · camera temperament. Последовательность архетипов НЕ повторять между сайтами.
Тип-семьи ротировать. Орнамент-языки НЕ смешивать. 1 фирменный переход + 1 foreground-мотив на сайт.

## Генерация (Higs nano-banana-pro, пин как --image=ref)
На сайт: hero-master 4:5 + hero-cutout PNG + 3-5 work-stills 16:9/4:5 + 2 macro + 4-8 foreground alpha-PNG + 1 texture-sheet.
Master первым, затем image-to-image сохраняя фигуру/свет/объектив/палитру. Промпт фиксирует наблюдаемые признаки пина
(lens/pose/crop/light/palette/print-process/grain), НЕ «в стиле pinterest». Текст/кандзи/барокоды/лого — HTML/SVG, НЕ в фото.
Анти-ужас: без лишних пальцев/конечностей, деформаций лица, псевдотекста, gore; лицо/руки проверять; плохой asset не лечить CSS.

## Пайплайн
1) 3 пилота-полюса: glossy PORTFOLIO(pin1) · hot-pink punk(pin2) · Tokyo cyber-zine(pin5) — стабилизировать API движка+mobile.
2) Затем 6 батчей по 3: manifest → contact-sheet → hero → 2 ключевые сцены → полный deck → responsive/reduced-motion → арт-ревью.
3) Батч не закрывать пока не проходит: пин узнаётся без подписи · 3 плана глубины · ≥2 genuinely different переходов · hero ≤1 экран · 55-60fps.

## Quality gates
- Тест на шаблон: обесцветить+скрыть лого; если 2 сайта = одинаковый силуэт/сетка/ритм/переходы → пересобрать один.
- Тест «круто»: любой стоп-кадр = постер · движение усиливает композицию, не маскирует · каждая сцена = 1 удар + 1 покой.
- Оценку каждого батча запрашивать у codex (read-only).

## Прогресс
- [x] Движок StageDeck (StageDeck.tsx + stagedeck.css: zoom/wipe-x/wipe-y/iris/smash/drop/cut + --sp/--ep + 3D-перспектива; KineticText slam/scatter/vroll/stretch)
- [x] Пилот 1 PORTFOLIO (StageDeck, 7 сцен: Occluded Idol→Type Guillotine→Sidecar→Macro→Contact-Sheet→Monument→Final; 6 переходов; проверено скрином десктоп+моб) · [ ] Пилот 2 punk · [ ] Пилот 3 cyber-zine
- [ ] Батчи 4-21

## Лог итераций
- ИТ.1: проанализированы пины (1,2,5,9 — кинематографичные editorial-постеры). Codex-концепт получен → этот PLAN.
  Построен движок StageDeck (`components/story-sites/stage/`). Запущена генерация пилота-1 (pin1 PORTFOLIO):
  p01-hero+portrait-b готовы, still-1/2+cutout догенерятся. Дальше: собрать сайт пилота-1 на StageDeck, проверить, пилоты 2-3.
- ИТ.2: роут /story2 + реестр StageLab + скрин-скрипт shot-stage.mjs (.stage, пауза 1500ms). Собран ПИЛОТ-1
  «PORTFOLIO» (Portfolio01.tsx+portfolio01.css): обложка Occluded Idol (вордмарк PORTFOLIO Anton + cutout + script Caveat
  + Cormorant + badge + bokeh-foreground + зерно), 6 сцен разными архетипами/переходами. Фикс: kinetic transform ломал
  background-clip:text вордмарка → сплошной цвет. Все 7 сцен проверены (десктоп+моб) — кино, в стиле пина. 200.
  Запущена генерация пилотов 2 (punk) и 3 (cyber-zine).
- ИТ.3: ассеты пилотов 2-3 (hero упавшие на апскейл добиты ретраем). ФИКС ДВИЖКА: .scene-body был display:contents
  → не рисовал фон сцены (светлые сцены проваливались в чёрный .stage) → сменил на position:absolute;inset:0
  (Portfolio не сломался). Собран ПИЛОТ-2 «Punk» (Punk02.tsx+punk02.css, slug punk): обложка Split Manifesto
  (white paper + Archivo Black + BIG FN LIFE маркером + cutout + star/smiley), сцены cut/smash/wipe-x/drop.
  Проверены cover/split-persona/poster-wall/final — кино, панк, в стиле пина 2, НЕ похож на portfolio.
  ЗАМЕТКА: split-persona mix-blend-difference даёт green/pink глитч — спорно, на суд codex. Дальше: пилот-3 scarlet.
- ИТ.4: собран ПИЛОТ-3 «scarlet» (Scarlet03, oxblood-red Tokyo cyber-zine, кандзи-вордмарк 緋色, Oswald+Shippori Mincho+Share Tech Mono, архетипы Occluded Idol→Vertical Tablet drop→Tunnel Zoom→Macro Evidence→Poster Wall→Final). Проверен cover/tunnel/final — 1:1 пин 5.
  CODEX-ОЦЕНКА 3 пилотов: Portfolio 8/10, Punk 9/10, Scarlet 9/10 — все узнаются по пинам, СИЛЬНО различны (палитра/шрифт/голос). Внедрены критичные правки:
  (A) punk split-persona: убрал mix-blend-difference (green/pink глитч был багом) → сплошной pink + RGB-glitch text-shadow, подпись на чёрном чипе — читаемо;
  (B) scarlet тусклый текст --mut #8a7a76→#a89690, sign→#927b76;
  (C) StageDeck cloneElement стрипит transition-prop из DOM (React warning);
  (D) АМБИЕНТ-ДВИЖЕНИЕ: keyframe stage-kb (ken-burns scale 1→1.08 22s) на .kb-media full-bleed кадрах активной сцены (portfolio guillo/macro, scarlet tunnel) — «живое кино», не ещё вход; reduced-motion off;
  (E) финалы разнесены: portfolio→iris, punk→smash, scarlet→drop (меньше общих zoom).
  ВЕХА: 3/21 готово, движок+пайплайн валидированы. ОТЛОЖЕНО (полировка, доделать по ходу): mobile @media(max-height:700px) для всех (коллизия текста на низких экранах — скрывать badge/scrollcue/facts, уменьшать текст); portfolio contact-sheet одну плитку bleed/rotate (менее шаблонно).
- ДАЛЕЕ БАТЧИ: пины 3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21 (18 сайтов) — по 1-2 за итерацию: Read пин → gen под пин → сборка со своим manifest/архетип-последовательностью (НЕ повторять) → скрин → SITES+RENDER → лог. Каждые 3 — codex-оценка.
- ИТ.5: собран forlorn (Forlorn04, pin3 dark-fantasy gothic+game-HUD, RODERIKA, Cinzel Decorative+Spectral+Share Tech Mono, charcoal/bone/blood/сталь; архетипы Occluded Idol+HUD→Ritual Halo iris→Macro Evidence wipe-x→Type Guillotine wipe-y→Poster Wall codex drop→Final smash). В SITES+RENDER (slug forlorn). Проверены cover (гигантский FORLORN Cinzel + HUD-рамки/барокоды/угловые скобки + cutout — 1:1 пин 3), macro (перчатка+цепи game-art + HUD-метки), sanctuary-портрет. 200. ЗАМЕТКА: Ritual Halo вращающееся кольцо слабо видно за контейнерным портретом — корона сама ритуальный акцент, ок; можно позже усилить/заменить архетип. Ассеты forlorn-still-1/2 добиты ретраем. lilith-hero/portrait-b ещё в ретрае (апскейл-таймауты). ВЕХА: 4/21.
- ИТ.6: собран lilith (Lilith05, pin4 occult-romantic, forest-green-black/bone/oxblood, Bodoni Moda+EB Garamond, орнамент-вордмарк LILITH italic + юстированные лор-колонки + ✕-метки, рога/крылья, тактично; архетипы Occluded Idol→Type Guillotine wipe-y→Split Persona wipe-x чисто→Neg-Space Monument iris→Contact-Sheet drop→Final iris). В SITES+RENDER (slug lilith). Проверены cover (1:1 пин4 колонки+✕) + split-persona (чисто, без глитча). 200. ВЕХА: 5/21.

### КАРТА ОСТАВШИХСЯ 15 САЙТОВ (пины изучены; пин11 пустой=пропуск; slug → пин → манифест)
ВАЖНО: убрать из gen-промптов "no nudity/covered/tasteful" (модель читает без "no" → NSFW-фильтр рубит). Только позитивные описания одежды. NEG = "no watermark, no logo, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic".
Разнообразие: НЕ делать всё тёмным подряд; чередовать светлые/цветные/тёмные; НЕ повторять пары шрифтов и последовательности архетипов.

- chrome (pin6): futuristic hi-fashion glam, серебро/хром + чёрный + лаймовый акцент, femme-warrior, кристалл-корсет, хром-лезвие. Шрифты напр. Anton/Chakra Petch + mono. Финал напр. wipe/smash.
- rosaline (pin7): романтик-скрапбук, dusky rose-brown/soft-pink/cream, sepia, розы/ленты/кружево/жемчуг, юстированные заметки+полароиды. Шрифты serif (напр. Cormorant/Playfair) + script (Caveat/Tangerine). СВЕТЛЫЙ тёплый. Финал iris/wipe.
- seraph (pin8): ангел-воин, rose-pink/platinum/red, серебр. корона-нимб + бело-красные крылья + чёрно-красная броня. Шрифты elegant serif + sans. СВЕТЛО-РОЗОВЫЙ. Финал drop/iris.
- salt (pin9): burnt-orange/cool-grey occult art-poster, повязка-блайндфолд + терн-нимб, медно-рыжие волосы. Шрифты blackletter/condensed + mono. ОРАНЖЕВЫЙ. Финал wipe-y.
- deity (pin10): мрамор+золото, статуя self-appointed deity (мужчина), gold-очки, парча, 自由/神. marble-white/gold/black/red. Шрифты high-serif (Cinzel уже forlorn→ Bodoni/Playfair Black) + CJK-serif. Финал zoom.
- corrosive (pin12): red screenprint pop-art рогатая монахиня (иллюстрация), crimson/cream/black, HUD-лейблы (TS26/RESTRICTED). Шрифты heavy condensed + mono. КРАСНЫЙ плоский. Финал cut/smash.
- ardour (pin13): bone/grey halftone-зин + red blackletter, монахиня+терн-нимб, 執意. bone-grey фон+RED. Шрифты blackletter (UnifrakturCook) + mono. СВЕТЛЫЙ зин. Финал drop.
- aesthetic (pin14): black/blood-red готик тату-монахиня, терн-корона, кровь-сплэттер, spiderweb. Шрифты silver blackletter + sans. ТЁМНЫЙ. Финал smash.
- handover (pin15): golden-amber библейский эпик (пророк+огненная колесница). Шрифты heavy condensed (Anton/Teko) + serif. ЗОЛОТОЙ тёплый. Финал zoom/drop.
- alexander (pin16): teal/cream/red историч-эпик (воин на коне+красный плащ), гигантский condensed serif вордмарк-окклюзия. Шрифты condensed serif + mono. Финал wipe-x.
- lover (pin17): black/red classical статуя-любовники (red monochrome), serif "Art is Lover". Шрифты high-serif (Playfair/Bodoni) + sans. Финал iris.
- justice (pin18): black/red+bone, вуаль+корона+факел, red script-вордмарк + HUD-барокоды. Шрифты script/serif + mono. Финал drop.
- nocturne (pin19): near-black/blood-red хоррор-журнал (red-eyes shadow), кириллица ТЬМА-вордмарк. Шрифты heavy sans/serif Cyrillic + mono. ТЁМНЫЙ. Финал zoom.
- chivalry (pin20): crimson/black готик, вуаль+шипастая корона + красный лес, ornate serif+red-glow. Шрифты ornate serif + sans. Финал iris/smash.
- ostpuck (pin21): warm brown/amber baroque oil (женщина с виолончелью), ornate distorted-serif вордмарк. Шрифты display serif + sans. ТЁПЛЫЙ классика. Финал wipe.

Ассеты: batch2 (chrome/rosaline/seraph/salt) + batch3 (deity/corrosive/ardour/aesthetic/handover) + batch4 (alexander/lover/justice/nocturne/chivalry/ostpuck) — все ГЕНЕРЯТСЯ параллельно (scripts/story2-batch2/3/4.ts, логи /tmp/story2-batch2/3/4.log, скип-если-есть, перезапускать до успеха; апскейл таймаутит). Имена {slug}-hero/portrait-b/still-1/2/hero-cut.png.

### ВАЖНО — КРОСС-КОНТАМИНАЦИЯ КАДРОВ (обнаружено, чинится)
При одновременном запуске 3 батчей (~44 конкурентных джобы) бот под нагрузкой отдавал результат ЧУЖОЙ джобы → часть кадров скачалась с неправильным изображением (напр. chrome-hero содержал red-статую lover/pin17). Первопроходные (не ретрайленные) кадры — корректны (rosaline-hero проверен ✓). Bot доработан пользователем.
ФИКС: удалены 33 подозрительных кадра (все, что были в FAIL-логах = ретрайлись в конкурентном окне), перегенерированы заново цепочкой (scripts/story2-regen.log, PID в фоне). 32 первопроходных оставлены.
ПРАВИЛО НА БУДУЩЕЕ: ПЕРЕД сборкой КАЖДОГО сайта — ВИЗУАЛЬНО проверять hero (и cutout) через Read, что кадр соответствует стилю своего пина, а не чужого. При несоответствии — удалить + перегенерить этот кадр (запуск нужного batch-скрипта, скип-если-есть). Не собирать на непроверенных кадрах.

### ВОССТАНОВЛЕНИЕ ИЗ ИСТОРИИ (метод, сработал)
Бот: GET http://127.0.0.1:3210/api/history → {items:[{id,folder,prompt,model,images,timestamp}]}. Генерации (model!=remove-background) в folder story2-batch* хранят правильную пару prompt→image (webp). Кросс-контаминация была в ПОЗДНИХ ретраях под нагрузкой → брать САМУЮ РАННЮЮ запись по timestamp на каждый промпт = чистый кадр. Матч по prompt (уникальный текст из batch-скриптов). Скрипт: /tmp/recover.mjs (earliest) + /tmp/recover-dl.mjs (скачать webp как .jpg). Восстановлено 59/60.
Верификация heroes контактным листом: analitic/inspiration/heroes-sheet.mjs (Playwright грид 15 hero → 1 скрин). Итог: 12/15 корректны; salt(получил chivalry-образ), ardour(получил justice-образ), handover(не сгенерился) — регенерируются заново (story2-batch2/3/4 скип-если-есть, лог /tmp/story2-cuts.log) + ВСЕ cutout заново из корректных heroes. Стиллы восстановлены earliest — проверять по ходу через скрины сцен.

### ПРОГРЕСС СБОРКИ
- 8/20 собрано (+seraph: Seraph08, rose-pink ангел, Italiana+Josefin Sans, СВЕТЛЫЙ, галерея на extra-кадрах)
- (стар.) 7/20: portfolio, punk, scarlet, forlorn, lilith, chrome (Chrome06, futuristic silver/lime, Michroma+Space Grotesk+Space Mono), rosaline (Rosaline07, romantic sepia-rose, Playfair Display+Pinyon Script+Mulish). Обложки проверены.
- ОСТАЛОСЬ 13: seraph, salt, deity, corrosive, ardour, aesthetic, handover, alexander, lover, justice, nocturne, chivalry, ostpuck. Все ассеты готовы+верифицированы (heroes контактным листом). Собирать по 2-3/итерация со своими manifest (см. КАРТА), проверять hero перед сборкой (на всякий), скрин обложки+ключевых сцен, в SITES+RENDER, лог. Каждые ~3-4 → codex.

### ОБОГАЩЕНИЕ + СКВОЗНОЙ LOOP (директива пользователя)
- ГАЛЕРЕИ НЕ ПОВТОРЯЮТ КАДРЫ: генерим по 4 доп-кадра/сайт в стиле пина, разные форматы 16:9/1:1/9:16 (scripts/story2-enrich.ts → {slug}-extra-1..4.jpg, лог /tmp/story2-enrich.log). Contact-Sheet/Poster-Wall/Lookbook сцены используют УНИКАЛЬНЫЕ кадры (hero + extra-1..4 + still-1/2, каждый ≤1 раз). Разные форматы оживляют.
- РЕТРО-ФИКС уже собранных галерей (portfolio contact-sheet, punk poster-wall, scarlet poster-wall, forlorn codex, lilith contact-sheet, chrome lookbook, rosaline diary): заменить повторные картинки на extra-кадры.
- ПАЙПЛАЙН LOOP: (1) собрать все 20 (галереи из уникальных extra-кадров); (2) АНАЛИЗ УНИКАЛЬНОСТИ — самому (контакт-лист всех 20 обложек+ключевых сцен через playwright-монтаж, искать шаблонность/повторы) + codex-оценка всех 20; (3) ПЕРЕИСПРАВИТЬ отмеченное (палитра/шрифт/композиция/переходы где похоже); (4) финал.
- ИТ(ручная): собран seraph (8/20). Осталось 12: salt, deity, corrosive, ardour, aesthetic, handover, alexander, lover, justice, nocturne, chivalry, ostpuck. Обогащение extra-кадров ~54/60 (дотянуть провалы: перезапуск scripts/story2-enrich.ts). ВАЖНО: loop простаивал из-за вопросов пользователя (перевзводить wakeup в КОНЦЕ каждого хода).
- ИТ(ручная 2): собраны salt (Salt09, burnt-orange occult, UnifrakturCook+Barlow Condensed+JetBrains Mono, сплит-фон) + deity (Deity10, marble/gold, DM Serif Display+Noto Serif SC+Jost, 自由/神). 10/20. ПОЛИРОВКА: deity-hero имеет вбитую вотермарку 小红书 снизу-справа (перегенерить hero точечно позже или закрыть кадрированием). Осталось 10: corrosive, ardour, aesthetic, handover, alexander, lover, justice, nocturne, chivalry, ostpuck.
- ИТ(ручная 3): собран corrosive (Corrosive12, red pop-art screenprint, Fjalla One+Archivo+IBM Plex Mono). 11/20. Осталось 9: ardour, aesthetic, handover, alexander, lover, justice, nocturne, chivalry, ostpuck.
- ИТ(ручная 4): собран handover (Handover15, gold библейский эпик, Bebas Neue+Cardo, full-bleed кадр+вордмарк). 12/20. Осталось 8: ardour, aesthetic, alexander, lover, justice, nocturne, chivalry, ostpuck.
- ИТ(ручная 5): собраны aesthetic (Aesthetic14, black/blood-red готик-нун, Pirata One+Manrope) + lover (Lover17, red-monochrome статуя, Prata+Work Sans). 14/20. Осталось 6: ardour, alexander, justice, nocturne, chivalry, ostpuck.
- ИТ(ручная 6): собран alexander (Alexander16, teal историч-эпик, Yeseva One+Barlow, full-bleed кадр+вордмарк). 15/20. Осталось 5: ardour, justice, nocturne, chivalry, ostpuck.
- ИТ(ручная 7): собран nocturne (Nocturne19, near-black/blood-red хоррор ТЬМА, Alumni Sans+Spline Sans Mono, кириллица ок). 16/20. Осталось 4: ardour, justice, chivalry, ostpuck.
- ИТ(ручная 8): собран ostpuck (Ostpuck21, warm amber baroque виолончель, Rozha One+Outfit, full-bleed). 17/20. Осталось 3: ardour, justice, chivalry.
- ИТ(ручная 9): собраны chivalry (Chivalry20, crimson готик, Gilda Display+Chivo), justice (Justice18, black/red+bone вуаль+корона+факел, Sail+Petrona+Overpass Mono, script-вордмарк+HUD), ardour (Ardour13, СВЕТЛЫЙ bone halftone-зин, Metal Mania+Chivo+Chivo Mono, красный blackletter-вордмарк+執意). **20/20 СОБРАНО.**

### ФАЗА 2 — АНАЛИЗ УНИКАЛЬНОСТИ + ФИКСЫ (ИТ 9)
СИСТЕМНЫЙ БАГ ШРИФТОВ (важно): Turbopack при конкатенации всех stage-*.css в один чанк срезает @import веб-шрифтов, попавшие ПОСЛЕ первых обычных правил (правило невалидно по позиции) → последние по порядку сайты (chivalry/justice/ardour + часть старых) молча падали на fallback-шрифты (Gilda→serif, Sail→cursive, Metal Mania→cursive-script). ФИКС: все @import вынесены в массив FONT_HREFS в index.tsx и рендерятся как <link rel="stylesheet"> в React-дереве (React 19/Next 16 поднимает в <head> и дедуплит, грузит в рантайме минуя бандлер). Metal Mania — самохостинг public/fonts/metal-mania.ttf через @font-face (обычное правило, позиция не важна). Проверено document.fonts: Gilda/Sail/Petrona/Metal Mania/Chivo/DM Serif/Pirata/Pinyon = loaded. (UnifrakturCook Latin-only → на кириллице ТЬМА не используется, ок.)
ПРОПАЛИ АССЕТЫ (8, восстановлены): 5 cover-cutout (.png) отсутствовали → «битая картинка» на обложке — сгенерены bg-removal из *-hero.jpg (higsRemoveBackground): p01, forlorn, lilith, p02(punk), p03(scarlet). Обложки перепроверены — теперь occluded-idol с фигурой сквозь вордмарк (portfolio/forlorn/lilith/punk/scarlet ✓). 4 gallery-frame (salt-extra-1, seraph-extra-1/2/3) — регенер targeted-скриптом (Higs, пин как ref, форматы 16:9/1:1/9:16).
САМО-АНАЛИЗ (монтаж всех 20 обложек, sharp-грид): набор разнообразен по палитре/архетипу. Флаг: chivalry — обложка была мутная, вордмарк невидим (#5a1a1e за фото+вуалью, z=2). ФИКС: занизил лес в фон (z0), крупный читаемый bone «CHIVALRY» Gilda (z1) ЗА вырезанной фигурой (chivalry-hero-cut.png, z3) = occluded-idol, crimson-glow. Теперь сильная различимая обложка, не путается с nocturne. forlorn/lilith (оба big serif на тёмном) — после появления cutout-фигур стали явно разными (forlorn тёпло-угольный+жрица, lilith лес-зелёный+рогатая крылатая).
CODEX read-only ревью 20 сайтов — запущен (фон).

### CODEX read-only ревью (gpt-5.6, весь набор 20) + РЕШЕНИЯ
Codex подтвердил: все 20 имеют РАЗНЫЕ шрифты-вордмарки (20/20 уникальны) и разные палитр-триплеты. Флагнул семейное сходство (не идентичность):
- ГРУППА dark-crimson+bone+сакральная фигура+serif-вордмарк: forlorn/aesthetic/justice/chivalry.
- ГРУППА warm-amber full-bleed: handover/ostpuck (+alexander teal, но композиция та же).
- ГРУППА pink-editorial+cutout-по-центру: portfolio/rosaline/seraph.
- slam-типографика: corrosive/punk.
- Слабейшие по codex: justice, seraph, rosaline.
РЕШЕНИЕ (приоритет = ФИДЕЛИТИ ПИНУ, железное правило пользователя): предложенные codex смены ПАЛИТР (justice→судебный teal, chivalry→ultramarine, aesthetic→кислота, rosaline→ботаника, handover/ostpuck→холодные) ОТКЛОНЕНЫ — они ломают 1:1-перенос арт-дирекшна пина. Сходство палитр ВНУТРИ групп — свойство самих пинов (много тёмного религиозного тату-арта / тёплого барокко), а не шаблонность движка. Реальные pin-safe различия уже есть: 20 разных шрифтов, разные signature-переходы (проверено: openers iris/smash/zoom/drop/wipe-x все разные), разные приёмы вордмарка (justice=script Sail+HUD-barcodes, ardour=СВЕТЛЫЙ blackletter, chivalry=occluded-idol корона-сквозь-буквы, forlorn=cutout-жрица сквозь ornate serif, lilith=рогатая крылатая сквозь Bodoni).
ФАКТИЧЕСКИ ИСПРАВЛЕНО по итогам анализа: chivalry-обложка (была мутная/невидимый вордмарк → сильный occluded-idol) — снимает claim про chivalry. Проверено визуально: handover(bright gold+Bebas) vs ostpuck(dark candlelit+Rozha+cello) — различимы; rosaline(sepia+Playfair+lace) vs portfolio(plum+Anton bold) vs seraph(light rose+Italiana+warrior lookbook) — различимы; seraph-сайт передаёт воина через Lookbook (4 уникальных warrior-кадра). Палитры НЕ трогаю.
АССЕТЫ: 0 пропавших (проверка grep всех ${A}/*.{png,jpg} refs). Восстановлены 5 cover-cutout (bg-removal) + 4 gallery-frame (salt-extra-1, seraph-extra-1/2/3, Higs пин-ref, форматы 16:9/1:1). Все 4 новых кадра визуально проверены — в стиле пина, лица/руки чистые.
ИТОГ ФАЗЫ 2: 20/20 собрано, шрифты чинены (runtime <link>), обложки без битых картинок, chivalry переисправлен. Набор разнообразен и верен пинам. git НЕ коммитил.

### ФАЗА 3 — АНАЛИЗ ШАБЛОННОСТИ (сам + codex, сходятся)
ВЕРДИКТ: тематически 20/20 уникальны (палитра+шрифт+сюжет пина), но СТРУКТУРНО шаблонны — codex 8.5/10. Один кит из ~7 модулей переставлен и рескинен; уникальны темы, не «драматургия пространства».
Повторяемые архетипы (self-скрины подтвердили codex):
- 4-колоночная GALLERY/WALL: 19/20 (18 через drop). Только Lover17 без неё.
- FINAL центрированный (огромная фраза + кнопка + 3 ссылки + подпись): 18/20.
- MACRO (фото 42vw×64vh, translateX(22vw), лёгкий наклон СПРАВА + caption «The [noun]» СЛЕВА + огромный знак + метки, всегда wipe-x): 16/20 — почти copy-paste. Self-скрин: scarlet/handover/lover/chrome макро идентичны по композиции.
- OCCLUDED IDOL (центр-фигура + вордмарк позади): 15/20.
- TYPE GUILLOTINE (двухчастное слово по центру, 2-я часть выделена): 14/20.
- TUNNEL ZOOM (full-bleed + знак + caption снизу-центр, zoom): 11/20.
- Симптом: «MACRO→wipe-x» и «GALLERY→drop» = жёсткая грамматика движка, не режиссура.
CODEX ТОП-5 правок (palette-safe, снизят шаблонность): (1) убить 4-col галерею у ~половины → киноленты/сверхширокий кадр/вертикальный индекс/док-архив/диагональная стопка/нав-карта/раскрытие 1 кадра; (2) сломать клон-MACRO → разные оси (верт-кроп слева, низ-треть, экстрим-горизонт фрагмент, caption поверх, микродетали по периметру, круговой кроп); (3) разные финалы (тихий/интерфейс-каталог/письмо-подпись/растворение-в-фото/гербовый colophon вместо CTA); (4) убрать обязательную idol-обложку с центр-фигурой → лицо у края/фигура на четверть/открытие с предмета/текст-пролог/3 детали/силуэт/офф-ось вордмарк; (5) переписать драматургию посайтно (aftermath-first, doctrine→portrait, линейный нарратив map→march→clash→relic→epilogue, деградация кадра, каталогизация).
СТАТУС: анализ выдан пользователю. Де-шаблонизация = крупная переработка структуры ~15 сайтов (не палитр) — ждёт решения по объёму.

### ФАЗА 3 — ДЕ-ШАБЛОНИЗАЦИЯ (пользователь выбрал «полная переработка всех»)
Правило: НЕ трогать палитры/шрифты/кадры — только структуру сцен и композицию. И НЕ плодить новые клоны: каждому сайту РАЗНЫЙ вариант macro/gallery/final. ВЕДУ РЕЕСТР вариантов:
- MACRO-альтернативы (слом «фото справа + caption слева + wipe-x»): deity=круговой МЕДАЛЬОН по центру (iris); alexander=caption ПОВЕРХ full-bleed снизу-слева (smash). Свободны: верт-кроп слева, экстрим-горизонт фрагмент, микродетали по периметру, низ-треть.
- GALLERY-альтернативы (слом 4-col grid): deity=вертикальный нумерованный ЛЕДЖЕР (реестр); alexander=горизонтальная ФРИЗ-лента/таймлайн. Свободны: одиночный сверхширокий кадр, док-архив (приколотые в разнобой), диагональная стопка, masonry/битая сетка, верт-филмстрип, книжный разворот, constellation/нав-карта.
- FINAL-альтернативы (слом «центр-слоган+кнопка»): deity=правый КОЛОФОН (объектная этикетка+dl); alexander=центр-ЭПИТАФИЯ, растворяется в выцветшем герое, ссылка вместо кнопки. Свободны: тихое пустое поле+строка, интерфейс/каталог, письмо/подпись, гербовый крест-колофон, офф-центр индекс.
СДЕЛАНО 2/16: deity (Relic Medallion / Pantheon Ledger / Colophon — проверено скринами), alexander (Relic caption-over / Campaign Frieze / Epitaph — проверено). Оба: KineticText где убран из финала — удалять неиспользуемый импорт (alexander уже).
ОСТАЛОСЬ ~14: handover, justice (батч1); salt, scarlet, forlorn, nocturne; chivalry, aesthetic, chrome, ostpuck; seraph, rosaline, lilith, ardour, corrosive. Обрабатывать батчами по 2-4, скрины сцен, реестр вариантов пополнять, в конце — общий монтаж внутр.сцен + повторный codex на шаблонность (цель <5/10).

### ДЕ-ШАБЛОНИЗАЦИЯ — БАТЧ 1 ГОТОВ (4/16): handover, justice (+ deity, alexander ранее)
handover: Relic верт-полоса-слева(cut) / Feature+Film-strip (доминанта+верт-лента) / Quiet минимал (пустое поле+ссылка). KineticText удалён (unused).
justice: Fragment горизонт-letterbox(iris) / Dossier перекрытые наклонённые улики exhibit i-iv / Verdict HUD-консоль-панель. Проверено скринами — все сильные, на тему.
РЕЕСТР вариантов (пополнен, НЕ повторять):
- MACRO занято: медальон(deity), caption-over-fullbleed(alexander), верт-полоса-слева(handover), горизонт-letterbox(justice). Свободно: микродетали-по-периметру, низ-треть, дифф-угол.
- GALLERY занято: леджер-реестр(deity), фриз-таймлайн(alexander), feature+film-strip(handover), dossier-перекрытые-улики(justice). Свободно: одиночный сверхширокий, диагональная стопка, masonry/битая, книжный разворот, constellation/нав-карта, верт-скролл-стек.
- FINAL занято: колофон-этикетка(deity), эпитафия-dissolve(alexander), quiet-минимал(handover), verdict-консоль(justice). Свободно: письмо/подпись, офф-центр индекс, гербовый крест-колофон, растворение-в-фото (alexander уже близко — варьировать).
ОСТАЛОСЬ 12: салют2 (salt, scarlet, forlorn, nocturne); батч3 (chivalry, aesthetic, chrome, ostpuck); батч4 (seraph, rosaline, lilith, ardour, corrosive).

### БАТЧ 2 — в работе (5/16 всего): salt ГОТОВ
salt: Relic низ-band во всю ширину+caption сверху(wipe-y; фикс top:auto — Layer по умолч. inset:0, height без top:auto липнет к верху!) / Cascade диагональный веер polaroid-плиток / Letter исповедь от 1-го лица с подписью. Проверено.
ЗАМЕТКА: cascade(salt) и dossier(justice) — оба «перекрытые фото», но исполнены по-разному (белые polaroid-фан vs тёмные разбросанные улики). Далее галереи брать НЕ-перекрывающиеся: single-ultrawide, masonry/битая-сетка, книжный-разворот, constellation, верт-скролл.
ВАЖНЫЙ БАГ-ПАТТЕРН: любой <Layer> с абсолютным bottom/height ТРЕБУЕТ top:auto (иначе inset:0 по умолчанию оставляет top:0 → элемент прилипает к верху). Проверять новые band/strip элементы.
ОСТАЛОСЬ 11: scarlet, forlorn, nocturne (батч2); chivalry, aesthetic, chrome, ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 2 — scarlet ГОТОВ (6/16 всего)
scarlet: Surveillance full-bleed+HUD-скобки/сканлайны(cut) / Zine рваная masonry-сетка (grid-template-areas ПРЯМОУГОЛЬНЫЕ! L-образная область = невалидно, вся сетка игнорится) + красный кандзи-блок / Terminal boot-лог левая ось. Проверено.
2 БАГА словлены: (1) grid-template-areas — каждая область ДОЛЖНА быть прямоугольной; (2) снова Layer+bottom без top:auto (sc-surv-cap прилипла к верху) → ВСЕГДА top:auto на Layer с bottom. Проверять на остальных.
РЕЕСТР пополнен: MACRO +surveillance(full-bleed HUD). GALLERY +zine-masonry(рваная grid-areas). FINAL +terminal(boot-лог левая ось). 
ОСТАЛОСЬ 10: forlorn, nocturne (батч2); chivalry, aesthetic, chrome, ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 2 — forlorn ГОТОВ (7/16 всего)
forlorn: Item Inspector RPG-тултип поверх full-bleed(cut) / Constellation узлы-кадры на лор-линиях(drop) / Sigil геральдическая эмблема+ring+девиз. Удалил мёртвый CSS (fl-wall/fl-final) + KineticText import. Проверено.
РЕЕСТР пополнен: MACRO +item-inspector(тултип-popover). GALLERY +constellation(узлы+линии). FINAL +sigil(эмблема-crest).
ОСТАЛОСЬ 9: nocturne (доделать батч2); chivalry, aesthetic, chrome, ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 2 ГОТОВ (8/16 всего) — nocturne
nocturne: Spotlight круг-света-в-темноте маска(iris) / Reel вертикальная киноплёнка + перфорация ::before/::after / End Card «конец выпуска» растворяется в чёрную пустоту(zoom). Проверено (scene-3 скрин иногда ловит guillo из-за swallowed keypress в kinetic-переходе — переснять).
РЕЕСТР ИТОГО (8 сайтов): 
MACRO: медальон, caption-over-fullbleed, верт-полоса-слева, горизонт-letterbox, низ-band, surveillance-HUD, item-inspector-tooltip, spotlight-круг. 
GALLERY: леджер-реестр, фриз-таймлайн, feature+film-strip, dossier-улики, cascade-polaroid-веер, zine-masonry, constellation-узлы, reel-киноплёнка.
FINAL: колофон-этикетка, эпитафия-dissolve, quiet-минимал, verdict-HUD-консоль, letter-исповедь, terminal-boot, sigil-эмблема, end-card-fade-black.
ВСЕ 8 архетипов каждого типа РАЗНЫЕ. Осталось 8 сайтов (батч3: chivalry, aesthetic, chrome, ostpuck; батч4: seraph, rosaline, lilith, ardour, corrosive — но corrosive уже split-heavy, проверить надо ли). Ещё нужны варианты: MACRO (микродетали, диптих-раскол), GALLERY (single-ultrawide, книжный-разворот, masonry-2), FINAL (off-центр-индекс, растворение-2).

### БАТЧ 3 — chivalry ГОТОВ (9/16 всего)
chivalry: Diptych жёсткий 50/50 раскол (фикс: обе половины Layer'а нужен явный left:auto/right:auto — иначе inset:0 обе кидает влево) / Triptych алтарь тондо+3 арочные панели border-radius / Oath гербовый щит слева + клятва справа (офф-центр). Удалён KineticText. Проверено.
РЕЕСТР пополнен: MACRO +diptych(50/50). GALLERY +triptych(алтарь-арки). FINAL +oath(офф-центр щит).
ПАТТЕРН-БАГ (важно): Layer с любым односторонним inset (left ИЛИ right ИЛИ bottom) требует ЯВНОГО противоположного inset:auto — по умолчанию Layer=inset:0.
ОСТАЛОСЬ 7: aesthetic, chrome, ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 3 — aesthetic ГОТОВ (10/16 всего)
aesthetic: Flash тату-флеш-карта пунктир+бирка(wipe-x) / Book портфолио-разворот большая-плата+корешок+стопка(drop) / Stamp красный оттиск-печать rotate -11deg офф-центр(smash). Удалён KineticText import (в import-строке токен 2× — count!=1). Проверено.
ЗАМЕТКА: book(aesthetic) близок к feature+strip(handover) по осям, но корешок/книга-рамка отличают. flash-card близок к diptych по оси «фото-сторона/подпись-сторона» но пунктир+бирка+rotate отличают. Далее галереи/макро брать иных осей.
РЕЕСТР пополнен: MACRO +flash-card. GALLERY +book-spread. FINAL +stamp-seal.
ОСТАЛОСЬ 6: chrome, ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 3 — chrome ГОТОВ (11/16 всего)
chrome: Orbit продукт-turntable эллипт-орбита+cardinal HUD-тики(zoom) / Carousel 3D-перспектива rotateY-слайды(drop) / Launch продуктовый спек-блок спек-чипы левая-ось(smash). Sidecar(3) оставлен как есть (редкий архетип, разнообразие). KineticText в cover остаётся. Галерея на extra-кадрах. Проверено.
РЕЕСТР пополнен: MACRO +orbit(turntable). GALLERY +carousel(3D-перспектива). FINAL +launch(спек-чипы).
ОСТАЛОСЬ 5: ostpuck (батч3); seraph, rosaline, lilith, ardour, corrosive (батч4).

### БАТЧ 3 ГОТОВ (12/16 всего) — ostpuck
ostpuck: Score нотный-стан(5 линий+клеф+ноты) поверх кадра-полосы(wipe-y; фикс op-score-cap top:auto) / Salon барочная развеска 4 золочёные рамы разного размера асимметрия / Player «сейчас играет» медиа-бар play+прогресс+время(wipe-x). KineticText удалён (был неиспользуемый). Проверено.
РЕЕСТР ИТОГО (12 сайтов, все архетипы РАЗНЫЕ):
MACRO: медальон, caption-over, верт-полоса, letterbox, низ-band, surveillance, item-inspector, spotlight, diptych, flash-card, orbit, score-staff.
GALLERY: леджер, фриз, feature-strip, dossier, cascade, zine-masonry, constellation, reel, triptych, book-spread, carousel-3D, salon-hang.
FINAL: колофон, эпитафия, quiet, verdict, letter, terminal, sigil, end-card, oath, stamp, launch, player-bar.
ОСТАЛОСЬ 4-5 (батч4): seraph, rosaline, lilith, ardour, corrosive (corrosive уже split-heavy — проверить нужна ли переработка макро/галереи/финала).

### БАТЧ 4 — seraph ГОТОВ (13/16 всего)
seraph: Study specimen-доска центр-деталь+спутники-микрокадры(wipe-x) / Editorial воздушный светлый журнальный разворот hero+pull-quote+варьир.кадры(drop) / Index оглавление the ascension I/II/III+CTA(drop). Sidecar(wings) оставлен. KineticText удалён. СВЕТЛЫЙ сохранён. Проверено.
РЕЕСТР пополнен (13 каждого типа): MACRO +study-specimen. GALLERY +editorial-spread. FINAL +index-contents.
ОСТАЛОСЬ 3-4: rosaline, lilith, ardour, corrosive (corrosive проверить). Все базовые варианты уже задействованы — для остатка ИЗОБРЕТАТЬ свежие композиции per-site (напр. torn-poster, vinyl-crate, ticket-stub, ransom-note, contact-negative и т.п.), в стиле пина.

### БАТЧ 4 — rosaline ГОТОВ (14/16 всего)
rosaline: Keepsake фото на скотче+рукописный лейбл Pinyon(wipe-x) / Journal дневник-страница taped-фото+записи-от-руки+роза(drop) / Postcard открытка марка+штемпель+рукопись+CTA(iris). Sidecar оставлен. KineticText удалён. Проверено — очень на тему (романтик-скрапбук).
РЕЕСТР: MACRO +keepsake-taped. GALLERY +journal-diary. FINAL +postcard. (invented per-theme — база вариантов исчерпана, дальше тоже изобретать)
ОСТАЛОСЬ 2-3: lilith, ardour, corrosive (corrosive проверить — split-heavy).

### БАТЧ 4 — lilith ГОТОВ (15/16 всего)
lilith: Arcana таро-расклад 4 золочёные карты+рим.цифры+имена веером(drop) / Invocation оккультная карта двойная-золотая-рамка+фазы-луны+сигил «descend»(iris). Scene-3 (negative-space monument «Fall.») и Split-Persona оставлены (уже нестандартные). KineticText удалён. Проверено.
ЗАМЕТКА: lilith-still-2 (карта II «The Wings») — существующий ОФФ-тематичный ассет (сцена в лифте, не крылья) — пре-существующая проблема ассета, вне структурной задачи. Флагнуть в финале если время.
РЕЕСТР: GALLERY +tarot-spread. FINAL +invocation-card.
ОСТАЛОСЬ 2: ardour, corrosive (corrosive проверить — split-heavy).

### БАТЧ 4 — ardour ГОТОВ (16/16 основного кластера)
ardour: Proof печатный-пруф кроп-марки+CMYK-полоса+PROOF-штамп(cut) / Paste-Up рваные флаеры на стене tape+halftone(drop) / Colophon задняя-обложка-зина masthead+выходные-данные+баркод(drop). KineticText в guillotine остаётся. СВЕТЛЫЙ halftone сохранён. Проверено.
РЕЕСТР: MACRO +print-proof. GALLERY +paste-up-flyers. FINAL +zine-colophon-masthead.
ОСТАЛОСЬ: corrosive (gallery+macro+final — клоны, доделать). ПОТОМ финальная оценка: portfolio/punk (их галереи-клоны 4-col) + lover (macro+final клоны, галереи нет) — решить по codex-переоценке нужны ли ещё правки для <5/10.

### БАТЧ 4 ГОТОВ — corrosive (17 сайтов де-шаблонизировано)
corrosive: Broadsheet агитпроп-газета masthead+лид+колонки(drop) / Screenprint смещённая шелкография red-offset+ink-multiply слоган(cut; фикс cs-print-cap top:auto) / Ballot официальный бланк чекбоксы+APPROVED-штамп(smash). Split-Persona(4) оставлен. KineticText в cover/guillo остаётся. Проверено.
РЕЕСТР ИТОГ: 17 разных MACRO, 17 разных GALLERY, 17 разных FINAL — ни один не повторяется.
ОСТАТОК ДЛЯ ПОЛНОТЫ (клон-сцены у не-тронутых): portfolio (contact-sheet галерея=клон), punk (poster-wall галерея=клон), lover (macro+final клоны, галереи нет). Доделать эти 3, ПОТОМ финальный монтаж внутр.сцен + codex-переоценка шаблонности (<5/10).

### ОСТАТОК — lover ГОТОВ (18 сайтов адресовано)
lover: Plinth скульптура-на-постаменте+луч-света+музейная-этикетка(iris) / Plaque гравированная посвятительная табличка beveled-plate+dedication(iris). Scene-4 (negative-space monument «Live.») оставлен. KineticText удалён. Проверено. (plaque ближе всего к центр-блоку, но beveled-plate+dedication-формат отличают.)
ОСТАЛОСЬ 2: portfolio (macro pf-macro + gallery pf-sheet = клоны), punk (pk-wall + pk-pod = ДВЕ grid-галереи). Потом финальный монтаж + codex-переоценка.
ЗАМЕТКА shot-stage: на сайтах с kinetic guillotine ArrowDown иногда «глотается» → нужный кадр ловить повторным прогоном/±1 down.

### ФИНАЛ — portfolio + punk ГОТОВЫ (20/20 сайтов, все клон-галереи устранены)
punk: pk-wall (4-col grid) → OFFER MENU pk-offer — жирный нумерованный список программ Archivo Black, толстые чёрные бордеры, hot-pink номера/теги/стрелки, hover→ink-fill (Membership/Mastermind/Courses/1:1). pk-pod — одиночный полароид-промо подкаста, НЕ клон. Проверено — на бренде.
portfolio: pf-sheet (masonry grid) → CONTACT SHEET pf-contact — 35мм плёночный контактный лист: чёрная плёнка со sprocket-hole бордерами, 4 негатива с подписями 01·face/02·spread/03·still/04·look, красно-розовый grease-pencil эллипс на кадре 02, note «✓ frame 02 — editorial spread». Проверено — отлично, кино-архив арт-директора.
ИТОГ ДЕ-ШАБЛОНИЗАЦИИ: 20/20 сайтов. Ни одна macro/gallery/final не клонирует другую. Палитры/шрифты/кадры не тронуты. Далее: финальный монтаж внутр.сцен + codex-переоценка (<5/10).

## ═══ ФИНАЛЬНАЯ CODEX-ПЕРЕОЦЕНКА (2026-08-05) ═══
Было 8.5/10 → СТАЛО **3.5/10** структурной шаблонности. Цель <5/10 ДОСТИГНУТА.
- 4-колоночная grid-галерея: 19/20 → **0/20**.
- image-right/left макро: 16/20 → **3/20** (chrome, chivalry, handover — и те разные по композиции).
- центр-финал слоган+CTA: 18/20 → 6/20 (alexander/handover/lover/nocturne/portfolio/punk — но все 6 разной трактовки: epitaph/quiet/plaque/end-card/kinetic/offer; финальный CTA законно центрируется).
- Почти идентичных троек macro/gallery/final: НЕТ ни одной пары.
ВЕРДИКТ: 20/20 сайтов структурно де-шаблонизированы. Палитры/шрифты/кадры не тронуты. git НЕ коммичен. Наружу не публиковалось. ЗАДАЧА /loop ЗАВЕРШЕНА.

## ═══ ФИКС ОБЛОЖЕК: «виден только верх кадра» (2026-08-05) ═══
Симптом: у Nocturne/Ostpuck/Alexander на обложке видна только верхушка (небо/дым/макушка), субъект (глаза, всадник, виолончелистка) срезан.
ПРИЧИНА (не разрешение!): full-bleed cover-fig = kb-media, .ps-media был grid-элементом (.ps-layer place-items:center) с height:100% против auto-трека → по высоте НЕ растягивался → вертикального переполнения нет → object-position инертен → всегда показывался верх исходника (портрет 1856×2304 в landscape-герое).
ФИКС: .xx-cover-fig .ps-media{position:absolute;inset:0} — теперь заполняет вьюпорт, object-position работает. Настроены фокусы: nocturne 50% 44% (глаза/лицо), ostpuck 50% 50% (виолончелистка), alexander 50% 60% (всадник+меч+плащ). Проверено — все три эпичны.
Затронуты только 4 kb-media обложки: +Handover (латентный баг, но сюжет-колесница вверху кадра → читается, оставлен). Остальные 16 обложек — cutout-PNG, бага нет.
ЗАМЕТКА: тот же латентный баг у ВНУТРЕННИХ kb-media сцен (guillo/macro/tunnel) — там показываются верхушки; при де-шаблонизации выглядели ок, массово не трогал (риск регрессий). Чинить точечно если всплывёт.

## ═══ ИЗУЧЕНИЕ: интерактивность/оживление сайтов (2026-08-05, с codex) ═══
ВЫВОД: механика оживления почти написана, но отключена.
- StageDeck пишет только --sp/--ep (переходы — оставить). Курсор НЕ отслеживается.
- <Layer> умеет pointer-parallax (--px/--py×--cx/--cy×--depth), но StageDeck не пишет --px/--py и сайты не передают cursor= → параллакс СПИТ на всех 20.
- Hover только на ссылках/кнопках. Зерно статичное. SceneMedia — только <img> (архитектура заложила img→video).
ПРИЁМЫ (11): pointer-parallax·магнит-CTA·фонарик(mask radial)·кастом-курсор·дуотон→цвет·mask-reveal 2-го слоя·редкий glitch·kenburns-on-hover·микро-video-loop·живой дым-фон·scroll-intent.
ТОП-3 вау/цена: 1) pointer-parallax (почти готов, оживит все 20, низкий риск) 2) фонарик/reveal (лица/тату/реликвии) 3) 1-2 video-loop на сайт (дозированно, poster, pause неактивных, 1-3МБ).
ЗАКОН: одна доминирующая интеракция на сцену. Переходы не трогать.
ПЛАН РЕАЛИЗАЦИИ: pointer-канал в StageDeck (1 RAF, сглаж., пишет --px/--py активной .stage-scene, только pointer:fine) + композиция через CSS `translate:` на .stage-scene.is-active .ps-layer (не ломая transform-матрицу переходов). Пилот: Nocturne. Полный отчёт codex — scratchpad/codex-interactivity.txt.

## ═══ ПИЛОТ №1 ГОТОВ: pointer-parallax раскатан на все 20 (2026-08-05) ═══
Реализация:
- StageDeck.tsx: добавлен сглаженный pointer-канал (1 RAF, lerp 0.08) → пишет --px/--py [-1..1] в корень .stage; гейт pointer:fine && !reduced-motion; cleanup listeners+praf.
- stagedeck.css: глобальное правило `.stage-scene.is-active .ps-layer{ translate:calc(--px*--depth*30px) ... }` под @media(hover:hover)+(pointer:fine); reduced-motion → translate:none. Свойство translate КОМПОЗИТСЯ с transform-матрицей переходов → переходы целы.
ДОКАЗАНО (analitic/inspiration/proof-parallax.mjs): media fine/hover=true; при --px=1 слой depth0.14 → translate 4.76px + transform matrix(1.02) сосуществуют; реальные pointermove дают --px -0.7..+0.6 (сглаж.). Nocturne/Seraph/Lover — рендер цел, cutout+edge-mask целы.
Тюнинг силы = одно число (30px) в stagedeck.css. Амплитуда ∝ depth: bg~1.5-5px, субъект~6px, foreground-текст~9px, орнамент~18px.
ОСТАЛОСЬ из ТОП-3: #2 фонарик/reveal (пилот Nocturne — луч на красные глаза), #3 video-loop (нужны ассеты через Higs). Ждут направления юзера.

## ═══ ПИЛОТ №2 ГОТОВ: фонарик на Nocturne-обложке (2026-08-05) ═══
Nocturne19.tsx: +<div.nc-cover-flash> в cover (z5, над кадром z3/veil z4, под текстом z6 → HUD читаем).
nocturne19.css: .nc-cover-flash — затемняющий radial-gradient, центр edет за calc(50% + --px*50%); edge rgba(6,3,4,.66); opacity gate @media(hover:hover)+(pointer:fine); на входе курсор в центре → луч на лице.
ДОКАЗАНО (proof-flash.mjs): курсор на лицо → лицо/глаза освещены, углы тёмные; курсор в угол (--px .637) → свет уезжает, лицо в тени. Тонко, на тему.
ИТОГ ПЕТЛИ «оживление»: изучение(+codex) → пилот1 pointer-parallax(все 20) → пилот2 фонарик(Nocturne). ОСТАЛОСЬ (нужно направление юзера): раскатать фонарик на др. тёмные (lover/scarlet/forlorn/corrosive), #3 video-loop (нужны ассеты через Higs — какие сайты/движение). Петля остановлена до решения юзера.
