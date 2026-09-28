# ROLLOUT-BRIEF — раскатка сквозной визуальной архитектуры по сайтам (ветка `visual-architecture`)

Цель владельца: каждый сайт — ОДИН общий сюжет. Зритель переходит из сцены в сцену за счёт движения
объектов вместе с ним, застывания, параллакса и игры с фоном. Сцена больше не коробка «из ничего в ничто».
Диагноз и посайтовые рекомендации: `docs/audit/AUDIT-2026-09.md` и `docs/audit/sites/<семья>.md`
(найди СВОИ сайты — там уже расписаны актёр, переход, дефекты). ТЗ: `docs/audit/VISUAL-ARCHITECTURE.md`.

## Правила (жёстко)
- Правишь ТОЛЬКО файлы своих сайтов (компонент + его css) и, если сказано в задаче, их роут `page.tsx`.
  НЕ трогай движки и общие файлы: `components/scene-kit/*`, `components/animated-sites/model/reel.*`,
  `components/parallax-scene/*`, `components/story-sites/stage/StageDeck.tsx`, `stagedeck.css`, реестры/index.
  Нужна правка движка — опиши её в отчёте, не делай.
- Не менять палитру, шрифтовую пару, бренд и кадры мира без причины из аудита. Шрифты уже грузятся через
  `components/shared/FontLinks` — CSS `@import` шрифтов НЕ добавлять.
- Никакого `Math.random()`/`Date.now()` в рендере (hydration). reduced-motion не ломать.
- Git не трогать (коммитит оркестратор). Higs-бот: генерации только если явно сказано в задаче.
- Английский копирайт сайтов остаётся английским; русские сайты — русскими.

## Движки и API

### scene-kit (`@/components/scene-kit`)
```tsx
import { Actor, Weather, Atmosphere, Backdrop } from "@/components/scene-kit";
// Актёр: fixed-слой, путь по ЯКОРЯМ (селекторы элементов в порядке документа). Поза активна, когда
// якорь проходит середину экрана; между якорями — плавная интерполяция.
<Actor src="/uploads/.../actor-x.webp" width="12vw" zIndex={32} stops={[
  { at: reelMark("s0"), pose: { x: 70, y: 40, s: 1, r: 0, o: 1 } },       // x,y — % экрана (центр актёра)
  { at: reelMark("t0"), pose: { x: 85, y: 30, s: 0.8, o: 1, blur: 2 } },  // blur — глубина резкости
  { at: ".my-price-card", pose: { x: 90, y: 10, s: 0.4, o: 1, dock: true } }, // dock: x,y в % ПРЯМОУГОЛЬНИКА якоря — актёр «садится» в блок
]} />
// Актёр без картинки — любые дети (свечение фонаря, луч, SVG-нить): <Actor stops={...}><div className="xx-glow"/></Actor>
// pose.fx: 1|-1 — зеркало (интерполяция даёт «разворот»); bob — покачивание, tilt — крен от скорости скролла.
<Weather kind="leaves|petals|snow|embers|sparks|fireflies|bubbles|spores|dust|rain|ash|stars" count={18}
  color="#hex" color2="#hex" between={[reelMark("t0"), ".xx-section"]} world={0.6} zIndex={31} />
<Atmosphere stops={[{ at: ".xx-manifest", color: "#hex" }, { at: ".xx-cta", color: "#hex" }]} />  // пишет --atm/--atm2/--atm-rgb на родителя
<Backdrop from=".xx-first-landing-section" dim={0.45} plates={[{ at: ".xx-sec", src: `${A}/s3-bg.webp` }]} />
// Backdrop — плита мира ПОД лендингом: корень сайта `isolation:isolate`, секции, где мир должен
// просвечивать, делают фон прозрачным/полупрозрачным; фон корня — var(--atm, <цвет>).
```

### Reel v2 (`components/animated-sites/model/reel.tsx`) — миры `/animated/w-*`
```tsx
import { Reel, reelMark, type ReelScene } from "../reel";
{ id, bg, mid?, fg?, dark?, spark?, copy,
  into?: "rise"|"descend"|"ascend"|"pan"|"flythrough"|"portal"|"sweep"|"occlude"|"lightshift", // как камера ВХОДИТ в сцену
  portal?: { x, y },   // точка портала на ПРЕДЫДУЩЕЙ сцене (% экрана) для into:"portal"
  tint?: "#hex",       // цвет шва/вспышки/окклюзии
  len?: 1, hold?: .42, // длина главы и доля удержания
  freeze?: <div className="xx-freeze">…</div>, // стоп-кадр внутри удержания (титр/цифра/штамп)
  midPos?: "72% 86%", bgPos?: "50% 40%" }       // увести героя из-под копи
reelMark("s{i}") — середина удержания сцены i; reelMark("a{i}")/reelMark("h{i}") — начало/конец удержания (поставь актёру
одинаковую позу на a{i} и h{i} — он замрёт на весь стоп-кадр); reelMark("t{i}") — середина перехода i→i+1; reelMark("end").
Доп. поля сцены: midShift (vw, сдвиг героя по X — midPos по X не работает, когда вырезка упирается в ширину), midScale,
fgMask: [52, 72] (ниже — чтобы полупрозрачная кромка fg не ложилась «призраком» на героя), seam: { h: 46, o: 1.15 } (шов спуска/подъёма).
scene-kit `Follow`: числовые CSS-переменные по якорям (счётчики, высотомеры, stroke-dashoffset SVG-нити) —
`<Follow target=".xx-rope" stops={[{ at: reelMark("s0"), vars: { "--draw": 0 } }, { at: ".xx-cta", vars: { "--draw": 1 } }]} />`.
Backdrop: у плиты можно `size` (background-size). Сцена рила: `bgSize`. Актёр: `pose.dockTo` — причал к элементу внутри закреплённой главы (момент задаёт `at`). Дек: фон `--stage-bg` (не чёрный под светлыми сценами), центр iris `--iris-x/--iris-y`. Баг видимости Backdrop исправлен в движке — обходы `visibility:visible` не нужны.
```
Склейку выбирай ИЗ МИРА: подъём → `ascend`; спуск/нырок → `descend`; путь по горизонтали → `pan`;
заросли/облака/рынок → `flythrough`; окно/арка/грот/окуляр → `portal`; луч/рассвет/фонарь → `sweep`;
буря/скала/стадо/волна → `occlude`; смена времени суток в той же точке → `lightshift`.
2–3 РАЗНЫХ склейки на сайт; шторка «снизу» (`rise`) — только если она правда про мир.
Копи рила: без frosted-карточек поверх героя — контраст мягкой тенью текста/локальным скримом;
если герой (mid) под текстом — `midPos` в правую треть. Cue гаснет сам.

### parallax-scene v2 — concept-сайты `/visual-hooks/<concept>`
```tsx
<ParallaxScene heightVh={260} rest={0.35} intro={1200}>   // hero: собран при загрузке, без пустого экрана
<ParallaxScene heightVh={240} overlapVh={60} parallax={8}> // следующая сцена: проявляется ПОВЕРХ предыдущей,
                                                            // пока обе закреплены (--ovp 0→1) — вместо вуали в цвет
```
Убери `transitionOut`-вуали в цвет фона там, где ставишь `overlapVh`. Свои формы перехода (молния,
тории, мазок туши, разрыв бумаги) — CSS сайта через `clip-path`/`mask` от `var(--ovp)` на `.ps-sticky` своей сцены.
Первые фазы слоёв новой сцены (from.opacity:0 → проявление) держи короткими, чтобы при проявлении кадр был собран.
Уходящая сцена получает `--ovn` — прогресс перекрытия следующей (0→1): разрыв/уход текста/панорама считаются от него, без ручных порогов.

### StageDeck v2 — story2/story
Переход ведёт зритель (скраб колесом/пальцем + доводка), обложка собирается при загрузке, слои получают
глубину на входе/уходе. Shared element: одинаковый ключ в соседних сценах —
`<SceneMedia src=… share="key" />` или `data-share="key"` на `<img>`/элементе. Кадр перелетает из A в B.
Переходы: `zoom|wipe-x|wipe-y|iris|smash|drop|cut|fade|push`. `fade`/`push` — когда непрерывность несёт
общий объект или наезд на тот же мотив. `smash`/`cut` — только на кульминации, iris — только из круглой формы в кадре.

## Эталоны (смотри код)
- Reel: `components/animated-sites/model/sites/Tidewell.tsx` + `tidewell.css` — один нырок: descend/descend/ascend,
  стоп-кадр «−18 m», актёры-ныряльщики через рил и по шкале глубин лендинга, световой столб (DOM-актёр),
  пузыри в окне, Atmosphere+Backdrop под лендингом.
- Дек: `components/story-sites/stage/Portfolio01.tsx` — разворот `share="spread"` перелетает в кадр контакт-листа (`fade`).

## Проверка (обязательно для каждого своего сайта)
```bash
export PATH="/Users/leo/.nvm/versions/node/v22.22.3/bin:$PATH"   # node 22; dev уже на :3011
OUT=$PWD/analitic/audit/after CONC=1 FORCE=1 node analitic/audit/tools/cap.mjs analitic/audit/tools/jobs.json <id>
FR=$PWD/analitic/audit/after node analitic/audit/tools/sheet.mjs <id>
# → analitic/audit/after/<fam>/<id>/sheet.jpg — посмотри лист; meta.json рядом (ошибки/404)
npx tsc --noEmit -p tsconfig.json   # 0 ошибок
```
Приёмка: нет пустых кадров, нет двух заголовков сцен одновременно, hero собран в покое, актёр проходит
минимум 2 сцены и продолжается в лендинге, ≥2 разных мотивированных склейки, дефекты сайта из аудита закрыты.

## Отчёт (коротко, по сайтам)
`slug: склейки […]; актёр […]; погода/атмосфера […]; закрытые дефекты […]; что не вышло/нужна правка движка […]`

## Готчи, найденные агентами при раскатке
- Картинка `height:100%` внутри `<Layer>` (grid) не резолвится → бери `className="ps-fill"` на Layer или `position:absolute;inset:0` на медиа.
- `<Layer>` пишет инлайн `--cx/--cy` — не называй так свои переменные.
- Свой `data-transition` в деке: базовая `.stage-scene{opacity:0}`, уходящей сцене движок теперь ставит `opacity:1`, свой переход задаёт остальное.
- Призрак shared-элемента копирует типографику, фон, рамку, тень, маску, clip-path, скругление (в т.ч. %), поворот и масштаб предков; держи пары с одинаковыми filter/object-position.
- parallax-scene: у `<Layer>` есть `out={[a,b]}` — штатный уход слоя по --sp (reduced-motion не гасит); фон ставь на `.ps-sticky`, не на `.ps-scene` (при overlapVh движок снимает фон секции).
- `Actor`/`Follow` интерполируют smoothstep (e = t²(3−2t)); для синхронизации с CSS-маской — `curve="linear"`.
- Телефон (≤ 820px): текст идёт одной колонкой, десктопная поза актёра ложится на него — у точки пути есть
  `m: { x, y, s, o, … }` (поправка позы только на телефоне): `{ at: ".bm4-scene", pose: {…}, m: { x: 50, y: 84, s: 0.4 } }`.
- ScrollStage (legacy) работает на часах scene-kit (`subscribe` + `useLenisInClock`) — один rAF на страницу, как у Reel.
- Проверка телефона: `VP=mobile` у `cap.mjs` и `sheet.mjs` (390×844, тач, `hover:none`).
