Reading prompt from stdin...
OpenAI Codex v0.146.0
--------
workdir: /Users/leo/programming/creatly
model: gpt-5.6-sol
provider: openai
approval: never
sandbox: read-only
reasoning effort: low
reasoning summaries: none
session id: 019fb380-8c60-74a0-8137-014c34c20bdc
--------
user
# Задача: соавторский дизайн-разбор — как убрать шаблонность у 50 сайтов Visual Hooks

Ты — старший арт-директор/дизайн-инженер. Работаешь СО МНОЙ (другим агентом) над проектом Creatly Visual Hooks: витрина из 50 концепт-сайтов под бизнес-ниши (роут `/visual-hooks/<slug>`), которую мы показываем клиентам как «сделаем вам такое же». Цель уровня — «в разы лучше getlayers.ai и motionsites.ai».

## ПРОБЛЕМА (подтверждена владельцем)
34 из 50 сайтов сгенерены через ОДНУ композиционную систему `ProSite` в `components/visual-hooks/VisualHooksLab.tsx`. У них у ВСЕХ одинаковый первый экран:
- полноэкранное видео-фон (`.pb-hero` + `.pb-hero-vid`),
- градиент-wash,
- шапка сверху (brand слева + nav-пилюля справа),
- eyebrow + `<h1>` (один и тот же serif) + подзаголовок — ВСЕГДА снизу-слева.
И дальше почти один набор блоков (`pb-idea`, `pb-split`, `pb-gallery`, `pb-editorial`, `pb-cta`) с одинаковой типографикой. Меняются только палитра, текст и порядок блоков. Итог: сайты выглядят ОДНОТИПНО — «видео-бг, слева текст, шапка, и всё». Одинаковая композиция, шрифт, расположение hero.

## ЭТАЛОН: motionsites
Я прикрепил 7 скринов реальных motionsites-сайтов (custom-spaces, trustflow, oyla, visual-hero, sentinel, 3d-jack-portfolio, relocation-card). Посмотри на них ВНИМАТЕЛЬНО. Ключевое: у КАЖДОГО своя композиция первого экрана и свои секции:
- Custom Spaces: белый editorial, ЦЕНТРИРОВАННЫЙ крупный заголовок сверху + горизонтальная лента интерьеров, реагирующая на курсор.
- TrustFlow: объект (здание) входит СНИЗУ-СЛЕВА, serif-заголовок смещён вправо-вверх, стеклянная карточка-оверлей внизу.
- OYLA: рука с кольцами ближе к камере чем модель (продукт «входит» в пространство), светлый fashion-editorial.
- Visual Hero: центральный органический 3D-объект, огромный italic-заголовок ЧАСТИЧНО ПЕРЕКРЫВАЕТ объект.
- Sentinel: тёмный силуэт + световое кольцо (угроза), затем резкий переход в ч/б печатную сетку.
Полный анализ motionsites у нас в `analitic/motionsites/report.md` (ПРОЧИТАЙ его — там 7 арт-направлений и «формула первого экрана»: один доминирующий объект, контраст масштабов, контролируемая пустота, один акцентный цвет, незавершённость за пределами вьюпорта, смена режима светлый/тёмный).

## НАШ СТЕК (прочитай файлы)
- `components/visual-hooks/VisualHooksLab.tsx` — реестр `PRO: Record<string,Pro>` (34 сайта), функции `ProSite`, `ProBlockView`, типы `ProBlock`/`Pro`. Плюс 15 «bespoke» сайтов (ForgeSite, MonoSite, PhantomSite …) — у них композиции РАЗНЫЕ (посмотри для контраста, что мы УМЕЕМ делать разнообразно).
- `components/visual-hooks/visual-hooks.css` — все стили (`.pb-*` общие блоки, `.pro-<slug>` палитры, bespoke namespaces).
- Готовые механики: `Reveal` (IntersectionObserver reveal, варианты `vh-rv--up/--zoom/--mask`), `ShaderBg` (WebGL фон, режимы aurora/silk/nebula/caustics/ember/grid), `ShaderImage` (hover-рипл), `DepthParallax`. Ассеты: `/uploads/1/hooks/sites/<slug>.jpg` (постер), `<slug>-hero.mp4` (видео), `g/<slug>-*.jpg` (галерея 2-3 шт).
- Стек: Next 16, React 19, стили — обычный CSS (не Tailwind), шрифты через vars `--vh-serif`/`--vh-sans`/`--vh-mono`.

## ЧТО МНЕ НУЖНО ОТ ТЕБЯ (конкретный, внедряемый план — НЕ общие слова)
1. **6–8 РАЗНЫХ HERO-АРХЕТИПОВ** (именованных). Для каждого: композиция/сетка (где заголовок, где объект, где nav), какой приём глубины, какая типографика (шрифтовая пара + вес + размер), какой motion-payoff, какой «незавершённый» элемент за вьюпортом. Явно уходи от «видео-бг + текст снизу-слева». Вдохновляйся 7 арт-направлениями motionsites, но не копируй 1:1. Примеры направлений: centered-editorial + horizontal strip; object-enters-from-edge + offset headline; split 50/50 type|image; giant-type overlapping media; light↔dark mode-switch; portal/window; product-theatre macro. Учитывай, что у нас есть видео и постер, но hero НЕ обязан быть полноэкранным видео.
2. **Библиотека НОВЫХ секций-модулей** (сверх наших pb-*): чтобы у сайтов были разные секции, а не один набор. Дай 8–12 идей секций с кратким лейаут-спеком (напр.: horizontal-scroll strip, sticky mode-switch, ticker/marquee, index-list с hover-preview, macro-detail split, comparison before/after, editorial pull-quote full-bleed, spec-table, timeline, big-number band).
3. **Типографика**: стратегия разнообразия. Сейчас один serif везде. Предложи 3–4 типографические «личности» (шрифтовые пары/веса/трекинг), привязанные к архетипам, чтобы не всё было одинаковым serif-italic. Только веб-безопасно/самохост.
4. **Маппинг**: как назначить архетипы 50 сайтам, чтобы соседние по нише не выглядели одинаково (принцип распределения, а не полный список).
5. **План внедрения в наш ProSite**: как расширить типы `Pro`/`ProBlock`, чтобы hero стал полем `hero: {archetype, ...}` с вариативностью, и как добавить новые секции — минимальными и безопасными изменениями (без слома существующих 34). Псевдокод типов приветствуется.

Формат ответа: структурированный markdown, конкретика, готовая к реализации. Будь смелым арт-директором (референс: awwwards-уровень), но реалистичным по нашему стеку. Ничего не редактируй в файлах — только предложи план (я реализую сам).

codex
Использую `impeccable` как рамку для системного UI-разбора: сначала прочитаю её инструкции, затем ваш motionsites-отчёт и реальные реализации ProSite/bespoke/CSS. Файлы менять не буду.
exec
/bin/zsh -lc "sed -n '1,240p' /Users/leo/programming/creatly/.agents/skills/impeccable/SKILL.md" in /Users/leo/programming/creatly
exec
/bin/zsh -lc "sed -n '1,280p' analitic/motionsites/report.md" in /Users/leo/programming/creatly
 succeeded in 0ms:
---
name: impeccable
description: Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks.
version: 4.0.2
---

This skill gives you the tools and permission to create design that earns to be called out-of-distribution craft: Whereas before, your design work would have been safe, timid and measured, you now approach every design task as a award-winning design director with impeccable understanding for what makes exceptional design work: production-grade code, peak creativity, a clear POV, deep understanding of the needs of the client and users, and exceptional craft.

Core principles:
- Go all out. No hedging, no shortcuts. The deliverable must be complete (except assets the user must provide).
- Dream big and bold. Distinct, beautiful, outstanding and highly inspiring work.
- Iterate with tools available to you (e.g. visual understanding, browser screenshots) until you think this meets the bar.

## Setup

1. Run `node .agents/skills/impeccable/scripts/context.mjs` once per session (if the runtime shows this skill's loaded base directory, run `node <skill-base-dir>/scripts/context.mjs`; keep cwd at the user's project). Pass a named source file or route as `--target <path>`. It loads PRODUCT.md, DESIGN.md, the matching surface brief, and native-platform guidance when applicable; follow its directives and do not rerun it.
2. Before acting, load the one playbook that owns the request: the Commands table's reference for an explicit or clearly implied sub-command, or [reference/new-work.md](reference/new-work.md) for a new surface or replacement visual world. Then inspect the target and at least one representative source of incumbent visual truth (tokens, theme, CSS, component, or asset) before editing.
3. After analysis and direction are resolved, load [reference/craft-floor.md](reference/craft-floor.md) immediately before editing UI. It carries the quality floor, the absolute bans, and the reflexes no detector catches. Do not load it for planning-only work.

## How to design

- **The brief wins.** Honor pinned aesthetics, eras, materials, fonts, and palettes even when they conflict with a saturated-pattern warning. Redirecting a clear brief toward your taste is failure.
- **Refinement preserves; redesign replaces.** Refinement keeps the incumbent identity, behavior, copy, and everything outside scope. Ask before replacing factual copy or adding claims. Redesign keeps product truth, content, function, native affordances, and constraints, but treats the old look as evidence and anti-reference; choose a replacement world in new-work and replace DESIGN.md. Never split the difference into polish on the discarded look.
- **Visual authority is evidence, not a filename.** Missing DESIGN.md alone does not make a project greenfield; new-work decides whether to preserve, expand, or replace the incumbent world.

## Modes

The mode names what the visitor's success looks like on this surface.

- **Persuade:** the visitor decides and acts; design is the product. Landing pages, marketing, campaigns, pricing. Earn attention and action. Ship real imagery when the brief needs it; follow the committed world, not category habit.
- **Operate:** the visitor completes a task. App UI, dashboards, editors, admin, settings, tools. Scanability, consistency, native expectations, and the real usage scene outrank expression. Brand lives in precise details.
- **Read:** the visitor understands something. Docs, articles, guides, help, changelogs. Structure for comprehension, then make the reading experience worth staying in.
- **Experience:** the visitor is inside the work itself. Portfolios, galleries, showcases. Let the artifact lead from the first viewport; the interface recedes.

Choose the mode from the requested surface, not the product, and persist it only in that surface brief. A tool's landing page is still Persuade; a fashion house's documentation is still Read; a docs index is Read, not Persuade. See [new-work.md](reference/new-work.md) for new surfaces and [operate.md](reference/operate.md) for deeper Operate/Read guidance.

## Commands

| Command | Category | Description | Reference |
|---|---|---|---|
| `craft [feature]` | Build | Deprecated alias for an ordinary new-work request | [reference/craft.md](reference/craft.md) |
| `shape [feature]` | Build | Plan UX/UI before writing code | [reference/shape.md](reference/shape.md) |
| `init` | Build | Capture durable product context in PRODUCT.md | [reference/init.md](reference/init.md) |
| `document` | Build | Generate DESIGN.md from existing project code | [reference/document.md](reference/document.md) |
| `extract [target]` | Build | Pull reusable tokens and components into design system | [reference/extract.md](reference/extract.md) |
| `critique [target]` | Evaluate | UX design review with heuristic scoring | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) | [reference/audit.md](reference/audit.md) · native: [reference/audit.native.md](reference/audit.native.md) |
| `polish [target]` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refine | Amplify safe or bland designs | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refine | Tone down aggressive or overstimulating designs | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refine | Strip to essence, remove complexity | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation | [reference/onboard.md](reference/onboard.md) |
| `animate [target]` | Enhance | Add purposeful animations and motion | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Enhance | Add personality and memorable touches | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Enhance | Push past conventional limits | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes | [reference/adapt.md](reference/adapt.md) · native: [reference/adapt.native.md](reference/adapt.native.md) |
| `optimize [target]` | Fix | Diagnose and fix UI performance | [reference/optimize.md](reference/optimize.md) |
| `live` | Iterate | Visual variant mode: pick elements in the browser, generate alternatives | [reference/live.md](reference/live.md) |

Routing:

- **No argument:** read [routing.md](reference/routing.md) and present its context-aware menu; never auto-run a command.
- **Explicit or clearly implied command:** load its reference (native variant on native platforms) and follow it. Ask once if two commands fit.
- **Otherwise:** treat the request as general design work. Missing PRODUCT.md routes a new surface or replacement world through init, then new-work; a narrow refinement of existing code proceeds on the incumbent implementation as context.mjs directs, offering init afterward rather than blocking on it.
- `teach` aliases `init`. `craft` is a deprecated alias for ordinary new-work and adds nothing. `shape` owns task discovery, then enters new-work only for visual-world and surface-concept decisions.

After init writes PRODUCT.md, resume without rerunning `context.mjs`; init loads the native platform reference itself when the platform it recorded is `ios`, `android`, or `adaptive`.

**Pin / Unpin:** `node .agents/skills/impeccable/scripts/pin.mjs <pin|unpin> <command>` creates or removes a standalone `$<command>` shortcut. Report the script's result concisely; relay stderr verbatim on error.

**Hooks:** `$impeccable hooks <on|off|status|ignore-rule|ignore-file|ignore-value|reset>` manages the design detector hook for this project (auto-runs the detector after UI file edits and surfaces findings). Load [reference/hooks.md](reference/hooks.md) when the user invokes it with any argument.

**Doctor:** `$impeccable doctor` reports and repairs drift between this project's Impeccable artifacts (PRODUCT.md, DESIGN.md and its sidecar, config, surface briefs, the hook) and what this version reads. Load [reference/doctor.md](reference/doctor.md) when the user invokes it, or when they ask what is out of date, stale, or needs refreshing. A `CONTEXT_STALE` directive in Setup's output is the cheap subset of the same report; act on it there per its own instructions rather than running doctor unasked.

**Never repair drift as a side effect of a design task.** A `CONTEXT_STALE` finding is reported, not acted on, unless the user asks. The one exception is a finding marked `auto`, which the next write to that file performs anyway.
 succeeded in 0ms:
# Как MotionSites строит сайты, цепляющие внимание

Дата снимка: 28 июля 2026 года.

Исследовано 381 карточка MotionSites. У 260 карточек есть анимированное превью: 157 animated WebP, 88 MP4, 5 GIF, 5 PNG и 5 Mux HLS. В MP4-наборе вместе с пятью собранными Mux-роликами 93 файла; медианная длительность — 6,37 секунды, средняя — 6,64 секунды, диапазон — 3,1–14,63 секунды.

## Главный вывод

MotionSites продаёт не «много анимации», а один легко считываемый визуальный конфликт на первом экране:

> знакомая структура лендинга + один непривычно крупный или живой объект + короткая управляемая трансформация.

Зритель за долю секунды понимает тему, но ещё не понимает, как именно поведёт себя сцена. Этот небольшой информационный разрыв и удерживает взгляд.

## Формула первого экрана

1. **Один доминирующий объект.** Лицо, рука, 3D-маскот, телефон, кольцо, здание, ландшафт или абстрактная форма занимают примерно треть или половину кадра. Второго равносильного центра почти нет.
2. **Короткий заголовок с большой визуальной массой.** Обычно 2–7 слов. Он либо очень крупный, либо набран контрастным display-шрифтом. Текст работает как форма, а не как абзац.
3. **Привычный UI-каркас.** Маленькая навигация сверху, один CTA и несколько служебных подписей. Это даёт зрителю опору, пока главный объект выглядит непривычно.
4. **Контраст масштабов.** Огромный объект соседствует с микротекстом, массивный заголовок — с тонкой навигацией, фотореалистичная сцена — с плоскими кнопками.
5. **Контролируемая пустота.** Свободное пространство не заполняют карточками. Оно усиливает объект, заголовок и направление движения.
6. **Один акцентный цвет.** Основная палитра часто почти монохромная; цвет оставляют для CTA, свечения, продукта или смыслового объекта.

## Типовая хореография ролика

Короткие превью чаще всего устроены в четыре такта:

1. **Ориентация, 0–0,8 с.** Уже видны бренд, главный объект и хотя бы часть обещания. Ролик не начинает с пустого экрана.
2. **Нарушение ожидания, 0,8–2 с.** Объект приближается, поворачивается, маска раскрывается, карточка меняет глубину или изображение реагирует на курсор.
3. **Доказательство, 2–5 с.** Курсор или скролл показывает, что эффект принадлежит интерфейсу, а не является декоративным видео поверх сайта.
4. **Payoff и петля, 5–8 с.** Открывается следующий экран либо композиция возвращается к начальному состоянию без заметного скачка.

Ключевой принцип — **один ролик показывает один трюк**. Если одновременно двигаются фон, типографика, карточки, курсор и камера, один из слоёв остаётся медленным и служит опорой.

## Основные механики удержания внимания

### 1. Обещание трансформации

В первом кадре специально оставляют объект в состоянии, которое хочется «разрешить»: закрытая карточка, обрезанный портрет, рамка внутри пейзажа, тёмный силуэт, неполная 3D-форма. Движение завершает образ.

### 2. Курсор как герой

Курсор не просто подтверждает интерактивность. Он задаёт причинно-следственную связь: навёл — объект ожил, потянул — пространство перестроилось, прокрутил — сцена сменилась. Это заставляет зрителя мысленно примерить управление на себя.

### 3. Глубина без полноценного 3D

Часто используются более дешёвые приёмы:

- разные скорости слоёв;
- маска или окно поверх полноэкранной фотографии;
- scale и лёгкий perspective;
- перекрытие текста объектом;
- размытие переднего плана;
- тени, стекло и мягкое свечение;
- sticky-сцена, внутри которой меняется контент.

Ощущение пространства появляется уже при трёх планах: фон, смысловой объект, интерфейс.

### 4. Резкая смена режима

Белый editorial-экран сменяется тёмным, фотография — схемой, полноэкранная сцена — модульной сеткой. Смена поддерживает внимание сильнее, чем постоянное движение одинаковой интенсивности.

### 5. Лица, руки и материальность

Крупные лица и руки автоматически получают внимание. В ecommerce и fashion они дополнительно показывают масштаб продукта. Даже абстрактные SaaS-сайты часто используют объект с материальной фактурой: стекло, металл, ткань, мох, жидкость.

### 6. Незавершённость за пределами viewport

Часть объекта или следующей секции намеренно выходит за границу первого экрана. Это визуально обещает продолжение и подталкивает к скроллу без стрелки «scroll down».

## Разбор показанных кейсов

### Custom Spaces

Хук — строгая типографическая верхняя половина и живая горизонтальная лента интерьеров ниже. Архитектурные изображения дают разнообразие, но одинаковая высота и белый фон удерживают порядок. Движение очень спокойное: премиальность строится на уверенности и паузе, а не на спецэффекте.

### 3D Portfolio

Крупная голова-персонаж сразу объясняет автора лучше фотографии. Огромное `HI, I'M JACK` создаёт масштаб, а фиолетовые 3D-символы связывают секции. Переход к About и Projects показывает, что визуальный язык продолжается по сайту. Здесь удерживает сочетание личности, юмора и портфолио-доказательства.

### TrustFlow

Почти статичный editorial hero. Главный приём — архитектурная масса, входящая снизу и слева, и большой спокойный serif-заголовок. Финансовый продукт получает ощущение институциональности. Внимание удерживается не скоростью, а необычной для fintech тишиной.

### OYLA

Рука с кольцами находится ближе к камере, чем модель, поэтому продукт буквально входит в пространство зрителя. Светлая палитра и тонкий serif создают fashion-editorial ощущение. Затем крупный образ уступает место доказательствам `100% Handmade`: эмоциональный хук быстро переводится в рациональный аргумент.

### Visual Hero

Центральный моховой 3D-объект имеет сложный силуэт и высокую детализацию, а остальная сцена предельно проста. Огромный italic-заголовок частично перекрывает объект, соединяя типографику и изображение в одну композицию. Медленное органическое движение поддерживает ощущение генеративного инструмента.

### Sentinel

Первый экран строится вокруг угрозы: тёмный силуэт, световое кольцо и фраза `See Risk. Stop Spread.` Затем сайт резко переключается в почти печатную чёрно-белую сетку. Оранжевый используется только для действия. Это сильный пример ритма «эмоция → объяснение → действие».

### Relocation Card

Пейзаж создаёт эмоциональную мечту, стеклянная карта в центре обещает продуктовую механику, а затем становится самостоятельным 3D-объектом. История читается без текста: место → портал/карта → финансовый инструмент. Особенно хорошо работает единый объект, связывающий lifestyle и fintech.

## Повторяющиеся арт-направления

1. **Editorial minimalism:** белое поле, serif + grotesk, крупная фотография, медленное движение.
2. **Dark cinematic:** почти чёрный фон, один подсвеченный объект, высокая глубина, короткий imperative-заголовок.
3. **Organic 3D:** мох, цветы, камни, жидкости и стекло; природная нерегулярность компенсируется строгим UI.
4. **Character-led 3D:** маскот или цифровой человек объясняет бренд быстрее текста.
5. **Portal/window:** рамка, телефон, карточка или окно показывает другой мир и становится механизмом перехода.
6. **Kinetic typography:** текст меняет размер, положение или слой при скролле, но остаётся читаемым в ключевых остановках.
7. **Product theatre:** один физический продукт показан как герой сцены, часто с макро-камерой и почти рекламным светом.

## Что стоит перенести в Creatly

### Генерация hero

Каждый hero должен иметь обязательные поля:

- `attention_anchor` — единственный главный объект;
- `visual_tension` — что в первом кадре остаётся незавершённым;
- `motion_payoff` — одна трансформация, которую увидит пользователь;
- `depth_layers` — фон, объект и UI;
- `copy_role` — headline как смысл или как графическая форма;
- `calm_layer` — неподвижный слой, сохраняющий читаемость;
- `exit_cue` — элемент, обещающий следующую секцию.

### Ограничения motion-системы

- Один главный motion-приём на viewport.
- Первый осмысленный кадр должен быть готов без ожидания видео.
- Главный объект не перекрывает CTA и ключевые слова заголовка.
- Текстовые остановки должны оставаться читаемыми хотя бы 1–1,5 секунды.
- Амплитуда фонового движения ниже амплитуды интерактивного объекта.
- Для `prefers-reduced-motion` сохраняется композиция и смысл, исчезает только трансформация.
- На мобильном глубина упрощается до двух планов; эффект не должен зависеть от hover.

### Рекомендуемый сценарий страницы

1. **Hero:** эмоциональный объект и короткое обещание.
2. **Reveal:** визуальная трансформация, объясняющая метафору продукта.
3. **Proof:** спокойная сетка, цифры, кейсы или продуктовый интерфейс.
4. **Contrast section:** смена светлого/тёмного режима или масштаба.
5. **CTA:** возвращение главного объекта в упрощённой форме, замыкающее историю.

## Что не следует копировать

- Декоративное 3D без связи с продуктом.
- Длинный intro, в котором до появления смысла виден только логотип.
- Одновременный parallax всех элементов.
- Мелкий текст поверх активного видео.
- Скролл-блокировку ради эффекта.
- Горизонтальные переходы без понятного прогресса.
- Тяжёлое видео как единственный источник первого meaningful paint.

## Практическая формула

Для генератора Creatly сильный промпт можно строить так:

> Создай первый экран с одним доминирующим [объектом], который визуально выражает [обещание продукта]. В первом кадре оставь [незавершённость]. При первом скролле или движении курсора выполни одну трансформацию: [payoff]. Сохрани неподвижными [headline/CTA/navigation]. Используй три плана глубины и один акцентный цвет. Следующая секция должна дать рациональное доказательство эмоционального обещания hero.

Именно сочетание **мгновенной ясности, одного визуального вопроса и короткого управляемого ответа** является наиболее повторяемым принципом MotionSites.

exec
/bin/zsh -lc 'rg -n "''^(type|interface) Pro|const PRO|function ProSite|function ProBlockView|const (ForgeSite|MonoSite|PhantomSite)|'"\\.pb-|\\.pro-\" components/visual-hooks/VisualHooksLab.tsx components/visual-hooks/visual-hooks.css" in /Users/leo/programming/creatly
 succeeded in 0ms:
components/visual-hooks/VisualHooksLab.tsx:1380:type ProBlock =
components/visual-hooks/VisualHooksLab.tsx:1390:type Pro = { slug: string; theme: string; brand: string; eyebrow: string; title: React.ReactNode; sub?: string; nav: string[]; blocks: ProBlock[]; tagline: string; legal: string };
components/visual-hooks/VisualHooksLab.tsx:1392:function ProBlockView({ b }: { b: ProBlock }) {
components/visual-hooks/VisualHooksLab.tsx:1406:function ProSite({ data }: { data: Pro }) {
components/visual-hooks/VisualHooksLab.tsx:1422:const PRO: Record<string, Pro> = {
components/visual-hooks/visual-hooks.css:1088:/* ============ ProSite — общие продакшн-блоки (.pb-*), тема через vars ============ */
components/visual-hooks/visual-hooks.css:1091:.pb-hero{position:relative;height:100vh;overflow:hidden}
components/visual-hooks/visual-hooks.css:1092:.pb-hero-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
components/visual-hooks/visual-hooks.css:1093:.pb-hero-wash{position:absolute;inset:0;background:linear-gradient(180deg,var(--w1),transparent 26%,transparent 56%,var(--w2)),linear-gradient(75deg,var(--w3),transparent 55%)}
components/visual-hooks/visual-hooks.css:1094:.pb-head{position:absolute;z-index:20;top:0;left:0;right:0;height:78px;padding:0 var(--pad);display:flex;align-items:center;justify-content:space-between;color:var(--brandc)}
components/visual-hooks/visual-hooks.css:1095:.pb-brand{font:500 20px/1 var(--vh-serif);letter-spacing:.32em;color:var(--brandc)}
components/visual-hooks/visual-hooks.css:1096:.pb-nav{display:flex;gap:4px;background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:100px;padding:6px}
components/visual-hooks/visual-hooks.css:1097:.pb-nav a{padding:8px 15px;border-radius:100px;font:500 12px var(--vh-sans);color:var(--brandc);opacity:.85}.pb-nav a:last-child{background:var(--a);color:var(--ink);opacity:1}
components/visual-hooks/visual-hooks.css:1098:.pb-hero-copy{position:absolute;z-index:10;left:var(--pad);bottom:12vh;max-width:660px}
components/visual-hooks/visual-hooks.css:1099:.pb-eyebrow{display:block;font:600 11px var(--vh-mono);text-transform:uppercase;letter-spacing:.2em;color:var(--a);margin-bottom:20px}
components/visual-hooks/visual-hooks.css:1100:.pb-hero-copy h1{margin:0;font:400 clamp(46px,7.5vw,116px)/.98 var(--vh-serif);color:var(--h1c)}
components/visual-hooks/visual-hooks.css:1101:.pb-hero-copy p{margin:20px 0 0;max-width:40ch;font:400 15px/1.6 var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1102:.pb-idea{padding:clamp(90px,15vh,180px) var(--pad);max-width:1080px}
components/visual-hooks/visual-hooks.css:1103:.pb-kick{display:inline-block;font:600 11px var(--vh-mono);text-transform:uppercase;letter-spacing:.2em;color:var(--a);margin-bottom:24px}
components/visual-hooks/visual-hooks.css:1104:.pb-idea h2{margin:0;font:400 clamp(36px,5.5vw,82px)/1.04 var(--vh-serif);letter-spacing:-.015em}
components/visual-hooks/visual-hooks.css:1105:.pb-idea p{margin:30px 0 0;max-width:56ch;font:400 clamp(16px,1.5vw,20px)/1.65 var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1106:.pb-cine{position:relative;min-height:88vh;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center}
components/visual-hooks/visual-hooks.css:1107:.pb-cine-bg{position:absolute;inset:0;z-index:0}
components/visual-hooks/visual-hooks.css:1108:.pb-cine::after{content:"";position:absolute;inset:0;background:radial-gradient(110% 90% at 50% 50%,transparent 34%,rgba(0,0,0,.5));z-index:1}
components/visual-hooks/visual-hooks.css:1109:.pb-cine-copy{position:relative;z-index:2;padding:0 6vw}
components/visual-hooks/visual-hooks.css:1110:.pb-cine-copy h2{margin:0;font:400 clamp(40px,7vw,120px)/1.02 var(--vh-serif);color:#fff;letter-spacing:-.01em}
components/visual-hooks/visual-hooks.css:1111:.pb-split{padding:clamp(70px,11vh,150px) var(--pad);display:grid;grid-template-columns:1.05fr .95fr;gap:min(6vw,80px);align-items:center}
components/visual-hooks/visual-hooks.css:1112:.pb-split.rev .pb-split-media{order:2}
components/visual-hooks/visual-hooks.css:1113:.pb-split-media{border-radius:16px;overflow:hidden}.pb-split-media img{width:100%;aspect-ratio:16/11;object-fit:cover;display:block}
components/visual-hooks/visual-hooks.css:1114:.pb-split-copy h3{margin:0 0 26px;font:400 clamp(30px,3.8vw,56px)/1.08 var(--vh-serif)}
components/visual-hooks/visual-hooks.css:1115:.pb-split-copy>p{margin:0;max-width:46ch;font:400 15px/1.7 var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1116:.pb-list{list-style:none;margin:0;padding:0}.pb-list li{padding:20px 0;border-top:1px solid var(--line)}.pb-list li:first-child{border-top:none}
components/visual-hooks/visual-hooks.css:1117:.pb-list b{display:block;font:600 17px var(--vh-sans);letter-spacing:-.01em}.pb-list span{display:block;margin-top:6px;font:400 14px/1.6 var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1118:.pb-gal{padding:clamp(60px,9vh,120px) var(--pad)}
components/visual-hooks/visual-hooks.css:1119:.pb-gal-head h3{margin:0 0 44px;font:400 clamp(28px,3.6vw,54px) var(--vh-serif)}
components/visual-hooks/visual-hooks.css:1120:.pb-gal-grid{display:grid;gap:22px}.pb-gal-grid.n2{grid-template-columns:1fr 1fr}.pb-gal-grid.n3{grid-template-columns:repeat(12,1fr)}
components/visual-hooks/visual-hooks.css:1121:.pb-tile{position:relative;overflow:hidden;border-radius:14px}
components/visual-hooks/visual-hooks.css:1122:.pb-tile span{position:absolute;left:16px;bottom:14px;z-index:2;font:400 13px var(--vh-sans);color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.7);pointer-events:none}
components/visual-hooks/visual-hooks.css:1123:.pb-gal-grid.n2 .pb-tile{aspect-ratio:16/11}.pb-gal-grid.n2 .pb-tile.t1{margin-top:50px}
components/visual-hooks/visual-hooks.css:1124:.pb-gal-grid.n3 .pb-tile.t0{grid-column:1/6;aspect-ratio:4/5;margin-top:54px}.pb-gal-grid.n3 .pb-tile.t1{grid-column:6/13;aspect-ratio:16/10}.pb-gal-grid.n3 .pb-tile.t2{grid-column:3/11;aspect-ratio:16/7}
components/visual-hooks/visual-hooks.css:1125:.pb-stats{padding:clamp(60px,9vh,120px) var(--pad);border-top:1px solid var(--line)}
components/visual-hooks/visual-hooks.css:1126:.pb-stats-row{display:grid;gap:30px}.pb-stats-row.n3{grid-template-columns:repeat(3,1fr)}.pb-stats-row.n4{grid-template-columns:repeat(4,1fr)}
components/visual-hooks/visual-hooks.css:1127:.pb-stat{border-top:2px solid var(--a);padding-top:20px}
components/visual-hooks/visual-hooks.css:1128:.pb-stat b{display:block;font:400 clamp(32px,4.2vw,60px)/1 var(--vh-serif);letter-spacing:-.02em}
components/visual-hooks/visual-hooks.css:1129:.pb-stat span{display:block;margin-top:12px;font:500 12px var(--vh-mono);text-transform:uppercase;letter-spacing:.07em;color:var(--mut)}
components/visual-hooks/visual-hooks.css:1130:.pb-stats-note{margin-top:36px;font:400 13px var(--vh-sans);color:var(--mut);opacity:.7}
components/visual-hooks/visual-hooks.css:1131:.pb-quote{padding:clamp(80px,13vh,160px) var(--pad);text-align:center;border-top:1px solid var(--line)}
components/visual-hooks/visual-hooks.css:1132:.pb-quote blockquote{margin:0 auto;max-width:24ch;font:400 clamp(28px,4vw,56px)/1.18 var(--vh-serif)}
components/visual-hooks/visual-hooks.css:1133:.pb-quote cite{display:block;margin-top:28px;font:500 12px var(--vh-mono);text-transform:uppercase;letter-spacing:.14em;color:var(--mut);font-style:normal}
components/visual-hooks/visual-hooks.css:1134:.pb-steps{padding:clamp(60px,9vh,120px) var(--pad);border-top:1px solid var(--line)}
components/visual-hooks/visual-hooks.css:1135:.pb-steps-head h3{margin:0 0 50px;font:400 clamp(26px,3.4vw,48px) var(--vh-serif)}
components/visual-hooks/visual-hooks.css:1136:.pb-steps-row{display:grid;gap:min(5vw,60px)}.pb-steps-row.n3{grid-template-columns:repeat(3,1fr)}.pb-steps-row.n2{grid-template-columns:repeat(2,1fr)}
components/visual-hooks/visual-hooks.css:1137:.pb-step{border-top:2px solid var(--a);padding-top:22px}.pb-step span{font:500 13px var(--vh-mono);color:var(--a)}
components/visual-hooks/visual-hooks.css:1138:.pb-step b{display:block;margin:12px 0 12px;font:400 clamp(22px,2.4vw,32px) var(--vh-serif)}.pb-step p{margin:0;font:400 15px/1.65 var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1139:.pb-edit{position:relative;padding:0;min-height:84vh;display:flex;align-items:flex-end;overflow:hidden}
components/visual-hooks/visual-hooks.css:1140:.pb-edit-media{position:absolute;inset:0}.pb-edit-media img{width:100%;height:100%;object-fit:cover}
components/visual-hooks/visual-hooks.css:1141:.pb-edit::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,var(--w2),transparent 55%)}
components/visual-hooks/visual-hooks.css:1142:.pb-edit-copy{position:relative;z-index:2;padding:6vw;max-width:640px}.pb-edit-copy h3{margin:0;font:400 clamp(30px,4vw,60px)/1.06 var(--vh-serif);color:var(--h1c)}
components/visual-hooks/visual-hooks.css:1143:.pb-edit-copy p{margin:20px 0 0;max-width:44ch;font:400 15px/1.6 var(--vh-sans);color:var(--fg);opacity:.85}
components/visual-hooks/visual-hooks.css:1144:.pb-cta{padding:clamp(90px,14vh,180px) var(--pad);text-align:center;border-top:1px solid var(--line)}
components/visual-hooks/visual-hooks.css:1145:.pb-cta h2{margin:0;font:400 clamp(40px,6vw,84px) var(--vh-serif)}.pb-cta p{margin:22px auto 0;max-width:42ch;font:400 16px var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1146:.vh-site a.pb-btn{display:inline-flex;align-items:center;gap:10px;margin-top:36px;padding:17px 32px;border-radius:100px;background:var(--a);color:var(--ink);font:600 14px var(--vh-sans)}.pb-btn i{font-style:normal}
components/visual-hooks/visual-hooks.css:1147:.pb-foot{padding:70px var(--pad) 44px;border-top:1px solid var(--line)}.pb-foot-top b{font:500 20px var(--vh-serif);letter-spacing:.28em}.pb-foot-top p{margin:12px 0 0;font:400 14px var(--vh-sans);color:var(--mut)}
components/visual-hooks/visual-hooks.css:1148:.pb-foot-legal{display:flex;justify-content:space-between;margin-top:48px;padding-top:22px;border-top:1px solid var(--line);font:400 12px var(--vh-mono);text-transform:uppercase;letter-spacing:.06em;color:var(--mut)}
components/visual-hooks/visual-hooks.css:1150:.pro-iron{--bg:#0d0d0f;--fg:#ebe9e6;--mut:#96938e;--line:rgba(255,255,255,.1);--a:#e0622e;--ink:#160b05}
components/visual-hooks/visual-hooks.css:1151:@media(max-width:900px){.pb-split,.pb-split.rev .pb-split-media{grid-template-columns:1fr;gap:30px}.pb-split.rev .pb-split-media{order:0}.pb-gal-grid.n2,.pb-gal-grid.n3{grid-template-columns:1fr}.pb-gal-grid.n3 .pb-tile.t0,.pb-gal-grid.n3 .pb-tile.t1,.pb-gal-grid.n3 .pb-tile.t2{grid-column:1/2;margin-top:0}.pb-gal-grid.n2 .pb-tile.t1{margin-top:0}.pb-stats-row.n3,.pb-stats-row.n4,.pb-steps-row.n3,.pb-steps-row.n2{grid-template-columns:1fr;gap:24px}.pb-nav{display:none}.pb-foot-legal{flex-direction:column;gap:10px}}
components/visual-hooks/visual-hooks.css:1152:.pro-botanic{--bg:#eaeee3;--fg:#232a20;--mut:#6f7a66;--line:rgba(35,42,32,.14);--a:#4f8a4a;--ink:#f2f7ec;--brandc:#232a20;--h1c:#232a20;--w1:rgba(234,238,227,.4);--w2:rgba(234,238,227,.9);--w3:rgba(234,238,227,.2)}
components/visual-hooks/visual-hooks.css:1153:.pro-nib{--bg:#0c0d10;--fg:#e6e9ef;--mut:#878c98;--line:rgba(255,255,255,.1);--a:#6f9fd8;--ink:#081019}
components/visual-hooks/visual-hooks.css:1154:.pro-swell{--bg:#07181d;--fg:#dceef1;--mut:#7ca0a6;--line:rgba(255,255,255,.1);--a:#4fc0c8;--ink:#02181c}
components/visual-hooks/visual-hooks.css:1155:.pro-wick{--bg:#120e0a;--fg:#f0e6da;--mut:#ab9784;--line:rgba(255,255,255,.1);--a:#d98a70;--ink:#1c0f08}
components/visual-hooks/visual-hooks.css:1156:.pro-cask{--bg:#130d07;--fg:#f0e5d3;--mut:#ac9679;--line:rgba(255,255,255,.1);--a:#d99038;--ink:#1c1205}
components/visual-hooks/visual-hooks.css:1157:.pro-clay{--bg:#e8ddca;--fg:#2c261c;--mut:#786e5b;--line:rgba(44,38,28,.14);--a:#b5613a;--ink:#faf3e6;--brandc:#2c261c;--h1c:#2c261c;--w1:rgba(232,221,202,.4);--w2:rgba(232,221,202,.9);--w3:rgba(232,221,202,.2)}
components/visual-hooks/visual-hooks.css:1158:.pro-stride{--bg:#0b0d10;--fg:#e8ecf0;--mut:#8a909a;--line:rgba(255,255,255,.1);--a:#3ad0a0;--ink:#04140e}
components/visual-hooks/visual-hooks.css:1159:.pro-plat{--bg:#0b0908;--fg:#efe8db;--mut:#a89a86;--line:rgba(255,255,255,.1);--a:#d8c4a0;--ink:#14100a}
components/visual-hooks/visual-hooks.css:1160:.pro-fetch{--bg:#0c0805;--fg:#efe6da;--mut:#a89684;--line:rgba(255,255,255,.1);--a:#f0a848;--ink:#160c02}
components/visual-hooks/visual-hooks.css:1161:.pro-stem{--bg:#f4f2ec;--fg:#20211c;--mut:#6f6a5d;--line:rgba(0,0,0,.13);--a:#6f7d54;--ink:#f4f2ec}
components/visual-hooks/visual-hooks.css:1162:.pro-thread{--bg:#0e0d0c;--fg:#e9e5df;--mut:#948d82;--line:rgba(255,255,255,.1);--a:#b89b6a;--ink:#161009}
components/visual-hooks/visual-hooks.css:1163:.pro-barb{--bg:#100b07;--fg:#efe6d9;--mut:#a5937f;--line:rgba(255,255,255,.1);--a:#cf7a44;--ink:#1a0e05}
components/visual-hooks/visual-hooks.css:1164:.pro-steep{--bg:#0a0f0b;--fg:#e2ece2;--mut:#87968a;--line:rgba(255,255,255,.1);--a:#8fb070;--ink:#0a160a}
components/visual-hooks/visual-hooks.css:1165:.pro-loaf{--bg:#100a05;--fg:#f0e5d6;--mut:#a9947d;--line:rgba(255,255,255,.1);--a:#d98f3c;--ink:#1a0f05}
components/visual-hooks/visual-hooks.css:1166:.pro-velo{--bg:#0c0e10;--fg:#e6e9ec;--mut:#8b929a;--line:rgba(255,255,255,.1);--a:#d64a3a;--ink:#180806}
components/visual-hooks/visual-hooks.css:1167:.pro-balm{--bg:#0e0b12;--fg:#ece5ef;--mut:#9a90a4;--line:rgba(255,255,255,.1);--a:#c79fc0;--ink:#150c16}
components/visual-hooks/visual-hooks.css:1168:.pro-fern{--bg:#08120c;--fg:#e0ece2;--mut:#83968a;--line:rgba(255,255,255,.1);--a:#5cc98a;--ink:#05160c}
components/visual-hooks/visual-hooks.css:1169:.pro-cacao{--bg:#0f0805;--fg:#efe2d4;--mut:#a89078;--line:rgba(255,255,255,.1);--a:#c98a4a;--ink:#1a0e05}
components/visual-hooks/visual-hooks.css:1170:.pro-hide{--bg:#100b07;--fg:#ece0d2;--mut:#a08d77;--line:rgba(255,255,255,.1);--a:#b5713e;--ink:#180d05}
components/visual-hooks/visual-hooks.css:1171:.pro-spice{--bg:#0f0805;--fg:#f0e2d0;--mut:#ac9074;--line:rgba(255,255,255,.1);--a:#d85c34;--ink:#1a0a05}
components/visual-hooks/visual-hooks.css:1172:.pro-comb{--bg:#100a03;--fg:#f0e6d2;--mut:#ac9670;--line:rgba(255,255,255,.1);--a:#eaa82c;--ink:#180f03}
components/visual-hooks/visual-hooks.css:1173:.pro-grove{--bg:#0c0f08;--fg:#e6ece0;--mut:#8d9680;--line:rgba(255,255,255,.1);--a:#93a83e;--ink:#0d1505}
components/visual-hooks/visual-hooks.css:1174:.pro-pour{--bg:#0a0709;--fg:#ece2e4;--mut:#9a8d90;--line:rgba(255,255,255,.1);--a:#d0894a;--ink:#180d08}
components/visual-hooks/visual-hooks.css:1175:.pro-curd{--bg:#0f0b06;--fg:#f0e8d8;--mut:#a9977c;--line:rgba(255,255,255,.1);--a:#cf9a4a;--ink:#1a1005}
components/visual-hooks/visual-hooks.css:1176:.pro-lens{--bg:#0c0c0d;--fg:#e8e6e2;--mut:#8f8d88;--line:rgba(255,255,255,.1);--a:#c8b89a;--ink:#161410}
components/visual-hooks/visual-hooks.css:1177:.pro-wax{--bg:#0b0710;--fg:#ece4ef;--mut:#948a9e;--line:rgba(255,255,255,.1);--a:#ff5ea0;--ink:#180820}
components/visual-hooks/visual-hooks.css:1178:.pro-spine{--bg:#0b0d0c;--fg:#e6e8e2;--mut:#8b9088;--line:rgba(255,255,255,.1);--a:#3f8f6a;--ink:#08160f}
components/visual-hooks/visual-hooks.css:1179:.pro-ink{--bg:#08060c;--fg:#e8e4ee;--mut:#8f8a9c;--line:rgba(255,255,255,.1);--a:#9f7fe0;--ink:#140a20}
components/visual-hooks/visual-hooks.css:1180:.pro-mane{--bg:#f2eef0;--fg:#231f22;--mut:#726a70;--line:rgba(0,0,0,.12);--a:#b5566e;--ink:#f2eef0}
components/visual-hooks/visual-hooks.css:1181:.pro-selvedge{--bg:#080a12;--fg:#dfe4ee;--mut:#7d859a;--line:rgba(255,255,255,.1);--a:#5a7fd0;--ink:#eef2fb}
components/visual-hooks/visual-hooks.css:1182:.pro-deck{--bg:#08060e;--fg:#e8e5ef;--mut:#8d899c;--line:rgba(255,255,255,.1);--a:#ff7a3a;--ink:#180a04}
components/visual-hooks/visual-hooks.css:1183:.pro-lather{--bg:#0d0e0b;--fg:#e8ebe2;--mut:#8f9386;--line:rgba(255,255,255,.1);--a:#8ca86a;--ink:#0f1508}
components/visual-hooks/visual-hooks.css:1184:.pro-malt{--bg:#0f0a04;--fg:#f0e6d2;--mut:#ab9670;--line:rgba(255,255,255,.1);--a:#e0973a;--ink:#180f04}

codex
Первичная проверка подтверждает диагноз буквально в коде: `ProSite` жёстко задаёт один hero, а почти все содержательные уровни наследуют один `--vh-serif`. Сейчас дочитываю точные типы/рендеринг, вариативные bespoke-композиции и ограничения skill для planning-only, чтобы план лёг поверх текущего API, а не требовал переписывания реестра.
exec
/bin/zsh -lc "sed -n '1,260p' /Users/leo/programming/creatly/.agents/skills/impeccable/reference/shape.md" in /Users/leo/programming/creatly
 succeeded in 0ms:
# Shape

Discover what should be made and how it should work, then return a confirmed design brief without code.

## Phase 1: Discovery interview

Do not write code or choose visual direction yet.

### Cadence

- Use the structured question tool when available; otherwise ask and stop.
- Ask two or three related questions per round, then wait. One round is the default; add a second only when the answers expose a material gap.
- Do not dump a questionnaire, repeat settled facts, or turn obvious facts into menus. Assert the likely reading and invite correction.
- A sparse prompt requires at least one answer round. A precise prompt may need only a compact confirmation.

### Round 1: purpose, people, and outcome

Choose the two or three questions that most change the result:

- What is this surface or feature for, and what problem must it solve?
- Who specifically reaches it, in what situation and state of mind?
- What is the primary thing they must understand or do? What would success look like?
- What is uniquely true here that a neighboring product or generic template could not claim?

### Round 2: material, behavior, and boundaries

Run only for material unresolved decisions:

- What real content, evidence, data, and assets must the experience carry? What are realistic minimum, typical, and maximum ranges?
- Which states and transitions matter: first-run, empty, loading, error, success, permissions, overflow, or expert use?
- What is the intended fidelity, breadth, and interactivity: exploration, production-ready screen, full flow, or broader surface?
- What must remain untouched? What would make the result feel wrong even if it looked polished?
- Which platform, framework, performance, accessibility, localization, or delivery constraints are binding?

Never ask for CSS values or canned aesthetic lanes. New-work owns visual-world and concept choices.

## Phase 2: Resolve the design direction

For new surfaces, brand expansion, or replacement, follow [new-work.md](new-work.md) through visual authority, any world workshop, and concept choice. Reuse discovery, then return before its contract, persistence, or implementation. Inside an established world, use its concept process only when composition or interaction remains materially open.

## Phase 3: Write the brief

Write the smallest useful brief:

1. **Job and audience:** who arrives, their context, need, and visitor mode.
2. **Outcome and proof:** primary task/action, success, real evidence, and product-specific truth.
3. **Selected direction:** visual authority, structural/interaction thesis, sequence, focal moment, and implementation consequence.
4. **Scope and boundaries:** fidelity, breadth, interactivity, named target, what remains untouched, and explicit anti-goals.
5. **States and ranges:** realistic content/data ranges and material states.
6. **Interaction and layout:** hierarchy, topology, responsiveness, affordances, feedback, and transitions; intent, not CSS.
7. **Constraints and open decisions:** platform, delivery, accessibility, localization, reusable components, and choices a builder must not invent.

Use three to five bullets when the task is settled; use the full structure only for ambiguous, multi-screen, or standalone planning. Do not restate the conversation.

## Confirm and stop

Present the brief for explicit confirmation or one correction round, then stop: shape never writes code or a direction contract.

When no human or structured answer mechanism exists, mark assumptions plainly, return the brief, and stop.

exec
/bin/zsh -lc "sed -n '1340,1435p' components/visual-hooks/VisualHooksLab.tsx && sed -n '1435,1700p' components/visual-hooks/VisualHooksLab.tsx" in /Users/leo/programming/creatly
 succeeded in 0ms:
      </section>

      <section className="lg-feat">
        <Reveal className="lg-feat-media vh-rv--mask"><img loading="lazy" src={`${g}ledger-app.jpg`} alt="" /></Reveal>
        <Reveal className="lg-feat-copy vh-rv--up">
          <h3>See everything.<br /><em>Owe nothing.</em></h3>
          <ul className="lg-list">
            <li><b>One balance you trust</b><span>Pending, cleared and upcoming, in one honest number.</span></li>
            <li><b>Fees, shown before they happen</b><span>If a transfer costs anything, you see it before you tap.</span></li>
            <li><b>A saver that just works</b><span>Round-ups and a plain rate, no tiers to decode.</span></li>
          </ul>
        </Reveal>
      </section>

      <section className="lg-gal">
        <Reveal className="lg-gal-head vh-rv--up"><h3>Built to be <em>looked at less.</em></h3></Reveal>
        <div className="lg-gal-grid">
          <Reveal className="lg-tile a vh-rv--zoom"><ShaderImage src={`${g}ledger-edge.jpg`} /><span>The card, in the metal.</span></Reveal>
          <Reveal className="lg-tile b vh-rv--zoom"><ShaderImage src={`${g}ledger-calm.jpg`} /><span>Check it, then put it away.</span></Reveal>
        </div>
      </section>

      <section className="lg-stats">
        <div className="lg-stats-row">
          {[["£0", "in monthly fees"], ["60 sec", "to open, from your phone"], ["24/7", "human support, no bots"]].map(([v, l]) => (<Reveal key={l} className="lg-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}
        </div>
        <Reveal className="lg-stats-note vh-rv--up"><span>Illustrative figures from the current beta.</span></Reveal>
      </section>

      <section className="lg-quote"><Reveal className="vh-rv--up"><blockquote>I opened it, moved my salary over, and then just forgot about it. That is the whole compliment.</blockquote><cite>Elin R., beta member</cite></Reveal></section>

      <section className="lg-cta"><Reveal className="vh-rv--up"><h2>Ask for <em>an invite.</em></h2><p>We onboard in small waves, so support stays human.</p><a href="#" onClick={stop} className="lg-btn">Request an invite <i>↗</i></a></Reveal></section>

      <footer className="lg-foot"><div className="lg-foot-top"><b>LEDGER</b><p>A quiet account for grown-ups.</p></div><div className="lg-foot-legal"><span>Ledger</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ProSite — композиционная продакшн-система (уникальная последовательность блоков на сайт) ===== */
type BgMode = "aurora" | "silk" | "nebula" | "caustics" | "ember" | "grid";
type ProBlock =
  | { t: "idea"; kick?: string; title: React.ReactNode; body: string }
  | { t: "cine"; mode: BgMode; palette: [string, string, string]; title: React.ReactNode }
  | { t: "split"; img: string; title: React.ReactNode; body?: string; list?: { b: string; s: string }[]; rev?: boolean }
  | { t: "gallery"; head: React.ReactNode; items: { img: string; cap: string }[] }
  | { t: "stats"; items: [string, string][]; note?: string }
  | { t: "quote"; text: string; cite: string }
  | { t: "steps"; head: React.ReactNode; items: { h: string; p: string }[] }
  | { t: "editorial"; img: string; title: React.ReactNode; body?: string }
  | { t: "cta"; title: React.ReactNode; body: string; label: string };
type Pro = { slug: string; theme: string; brand: string; eyebrow: string; title: React.ReactNode; sub?: string; nav: string[]; blocks: ProBlock[]; tagline: string; legal: string };

function ProBlockView({ b }: { b: ProBlock }) {
  switch (b.t) {
    case "idea": return <section className="pb-idea"><Reveal className="vh-rv--up">{b.kick && <span className="pb-kick">{b.kick}</span>}<h2>{b.title}</h2><p>{b.body}</p></Reveal></section>;
    case "cine": return <section className="pb-cine"><ShaderBg mode={b.mode} palette={b.palette} speed={0.6} className="pb-cine-bg" /><Reveal className="pb-cine-copy vh-rv--up"><h2>{b.title}</h2></Reveal></section>;
    case "split": return <section className={`pb-split${b.rev ? " rev" : ""}`}><Reveal className="pb-split-media vh-rv--mask"><img loading="lazy" src={b.img} alt="" /></Reveal><Reveal className="pb-split-copy vh-rv--up"><h3>{b.title}</h3>{b.body && <p>{b.body}</p>}{b.list && <ul className="pb-list">{b.list.map((x) => <li key={x.b}><b>{x.b}</b><span>{x.s}</span></li>)}</ul>}</Reveal></section>;
    case "gallery": return <section className="pb-gal"><Reveal className="pb-gal-head vh-rv--up"><h3>{b.head}</h3></Reveal><div className={`pb-gal-grid n${b.items.length}`}>{b.items.map((x, i) => <Reveal key={i} className={`pb-tile t${i} vh-rv--zoom`}><ShaderImage src={x.img} /><span>{x.cap}</span></Reveal>)}</div></section>;
    case "stats": return <section className="pb-stats"><div className={`pb-stats-row n${b.items.length}`}>{b.items.map(([v, l]) => <Reveal key={l} className="pb-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>)}</div>{b.note && <Reveal className="pb-stats-note vh-rv--up"><span>{b.note}</span></Reveal>}</section>;
    case "quote": return <section className="pb-quote"><Reveal className="vh-rv--up"><blockquote>{b.text}</blockquote><cite>{b.cite}</cite></Reveal></section>;
    case "steps": return <section className="pb-steps"><Reveal className="pb-steps-head vh-rv--up"><h3>{b.head}</h3></Reveal><div className={`pb-steps-row n${b.items.length}`}>{b.items.map((x, i) => <Reveal key={x.h} className="pb-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{x.h}</b><p>{x.p}</p></Reveal>)}</div></section>;
    case "editorial": return <section className="pb-edit"><Reveal className="pb-edit-media vh-rv--mask"><img loading="lazy" src={b.img} alt="" /></Reveal><Reveal className="pb-edit-copy vh-rv--up"><h3>{b.title}</h3>{b.body && <p>{b.body}</p>}</Reveal></section>;
    case "cta": return <section className="pb-cta"><Reveal className="vh-rv--up"><h2>{b.title}</h2><p>{b.body}</p><a href="#" onClick={stop} className="pb-btn">{b.label} <i>↗</i></a></Reveal></section>;
  }
}

function ProSite({ data }: { data: Pro }) {
  return (
    <div className={`vh-site pro pro-${data.theme}`}>
      <section className="pb-hero">
        <video className="pb-hero-vid" src={`/uploads/1/hooks/sites/${data.slug}-hero.mp4`} poster={`/uploads/1/hooks/sites/${data.slug}.jpg`} autoPlay muted loop playsInline />
        <div className="pb-hero-wash" />
        <header className="pb-head"><Link href="/visual-hooks/sites" className="pb-brand">{data.brand}</Link><nav className="pb-nav">{data.nav.map((n) => <a key={n} href="#" onClick={stop}>{n}</a>)}</nav></header>
        <div className="pb-hero-copy"><span className="pb-eyebrow">{data.eyebrow}</span><h1>{data.title}</h1>{data.sub && <p>{data.sub}</p>}</div>
      </section>
      {data.blocks.map((b, i) => <ProBlockView key={i} b={b} />)}
      <footer className="pb-foot"><div className="pb-foot-top"><b>{data.brand}</b><p>{data.tagline}</p></div><div className="pb-foot-legal"><span>{data.legal}</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

const g = "/uploads/1/hooks/sites/g/";
const PRO: Record<string, Pro> = {
  iron: { slug: "iron", theme: "iron", brand: "IRON", eyebrow: "A serious room", title: <>Strong is a<br /><em>quiet room.</em></>, sub: "One rack, no mirrors, no music over your own breathing.", nav: ["The room", "Coaching", "Join"], tagline: "A small, serious strength gym.", legal: "Iron Room", blocks: [
    { t: "idea", kick: "What Iron is", title: <>A gym for the training,<br /><em>not the photo.</em></>, body: "Real weight, honest coaching, and a room we cap on purpose so the bar is always free and nobody is performing for a phone." },
    { t: "cine", mode: "ember", palette: ["#0d0705", "#5a1e0a", "#e0622e"], title: <>Show up.<br />Lift.<br /><em>Leave.</em></> },
    { t: "stats", items: [["40", "members, capped"], ["2", "coaches, always in"], ["5am–10pm", "open, every day"]], note: "Membership is capped so the room stays yours." },
    { t: "gallery", head: <>The work is <em>the point.</em></>, items: [{ img: `${g}iron-lift.jpg`, cap: "Every session, coached." }, { img: `${g}iron-chalk.jpg`, cap: "Chalk, not filters." }, { img: `${g}iron-rack.jpg`, cap: "The room at dawn." }] },
    { t: "quote", text: "I came to get strong, not to be seen. First gym that let me.", cite: "Marcus D., two years in" },
    { t: "cta", title: <>Come <em>lift.</em></>, body: "A trial week, then a place we hold as long as you use it.", label: "Start a trial" },
  ] },
  botanic: { slug: "botanic", theme: "botanic", brand: "BOTANIC", eyebrow: "Small-batch gin", title: <>Gin with<br /><em>a garden in it.</em></>, sub: "Distilled in small copper runs, from botanicals we can name.", nav: ["The gin", "Distillery", "Buy"], tagline: "Small-batch botanical gin.", legal: "Botanic Distillery", blocks: [
    { t: "idea", kick: "What Botanic is", title: <>Gin that tastes<br /><em>of somewhere.</em></>, body: "Twelve botanicals, foraged and grown near the still, redistilled in batches small enough to taste every one. Bright, green, and unmistakably from one place." },
    { t: "split", img: `${g}botanic-bots.jpg`, title: <>Twelve botanicals,<br /><em>each earning its place.</em></>, list: [{ b: "Juniper, grown close", s: "Two valleys over, not shipped in from a sack." }, { b: "Citrus, peeled that morning", s: "Bright and oily, never dried to dust." }, { b: "A little something wild", s: "Foraged, seasonal, and never quite the same twice." }] },
    { t: "editorial", img: `${g}botanic-still.jpg`, title: <>One small still,<br /><em>run slow.</em></>, body: "Batches of a few hundred bottles, cut by taste rather than a spreadsheet." },
    { t: "stats", items: [["12", "botanicals, named"], ["300", "bottles a batch"], ["43%", "the way it should be"]], note: "Figures from the current release." },
    { t: "stats", items: [["12", "botanicals, named"], ["300", "bottles a batch"], ["43%", "the way it should be"]], note: "Figures from the current release." },
    { t: "cta", title: <>Pour <em>a measure.</em></>, body: "A tasting set of three expressions, with the botanicals to nose alongside.", label: "Order a tasting" },
  ] },
  nib: { slug: "nib", theme: "nib", brand: "NIB", eyebrow: "Analogue writing", title: <>Words deserve<br /><em>a good tool.</em></>, sub: "Fountain pens, real ink, and paper worth the fuss.", nav: ["Pens", "Ink", "Visit"], tagline: "Fountain pens, ink and paper.", legal: "Nib & Co.", blocks: [
    { t: "idea", kick: "What Nib is", title: <>A short shelf<br /><em>of things that last.</em></>, body: "Pens that will outlive you, inks in colours worth naming, and the notebooks to spend them on. Nothing here is disposable." },
    { t: "cine", mode: "silk", palette: ["#0a0c12", "#22345e", "#6f9fd8"], title: <>Slow down.<br /><em>Write it by hand.</em></> },
    { t: "split", img: `${g}nib-write.jpg`, title: <>Chosen for<br /><em>your hand.</em></>, list: [{ b: "A nib to match your grip", s: "Fine or broad, wet or dry, matched to how you actually write." }, { b: "Ink worth naming", s: "Colours with depth, shading and a little sheen." }, { b: "Paper that behaves", s: "No feathering, no bleed, a pleasure to drag a nib across." }] },
    { t: "gallery", head: <>The good stuff, <em>up close.</em></>, items: [{ img: `${g}nib-inks.jpg`, cap: "Ink, in colours worth naming." }, { img: `${g}nib-paper.jpg`, cap: "Paper that behaves." }] },
    { t: "quote", text: "I came in for a birthday gift and left writing letters again. That is on them.", cite: "Priya S., regular" },
    { t: "cta", title: <>Find <em>your pen.</em></>, body: "Tell us your hand and your budget. We narrow a wall of pens to three.", label: "Find a pen" },
  ] },
  swell: { slug: "swell", theme: "swell", brand: "SWELL", eyebrow: "Hand-shaped boards", title: <>The ocean keeps<br /><em>no schedule.</em></>, sub: "Boards shaped by hand for the waves you actually ride.", nav: ["Boards", "The bay", "Order"], tagline: "Hand-shaped surfboards.", legal: "Swell Surf", blocks: [
    { t: "idea", kick: "What Swell is", title: <>A board shaped<br /><em>to how you surf.</em></>, body: "No pop-outs, no hype models. We watch how you ride, then shape a board to your break, your weight and your bad habits." },
    { t: "cine", mode: "caustics", palette: ["#03141a", "#0a5c6e", "#7fe0e0"], title: <>Made for<br /><em>the wave you get.</em></> },
    { t: "split", img: `${g}swell-shape.jpg`, title: <>Planed by hand,<br /><em>a curl at a time.</em></>, list: [{ b: "Shaped to your break", s: "Beach, point or reef, the outline follows the wave." }, { b: "Foiled to your weight", s: "Foam where you need float, thin where you need bite." }, { b: "Your name in the stringer", s: "One board, signed, built to be surfed for years." }] },
    { t: "gallery", head: <>From blank <em>to break.</em></>, items: [{ img: `${g}swell-rack.jpg`, cap: "The rack, drying." }, { img: `${g}swell-wave.jpg`, cap: "Where it ends up." }] },
    { t: "quote", text: "First board that felt like it read the wave for me. I stopped fighting it by week two.", cite: "Kai M., ordered twice" },
    { t: "cta", title: <>Get <em>shaped.</em></>, body: "A conversation, a few weeks in the bay, and a board with your name in the stringer.", label: "Order a board" },
  ] },
  wick: { slug: "wick", theme: "wick", brand: "WICK", eyebrow: "Poured by hand", title: <>Light that smells<br /><em>like a memory.</em></>, sub: "Poured by hand, scented lightly, made to burn slow.", nav: ["The range", "Refills", "Shop"], tagline: "Hand-poured candles.", legal: "Wick Studio", blocks: [
    { t: "idea", kick: "What Wick is", title: <>No headache<br /><em>in a jar.</em></>, body: "Clean wax, restrained scent, and a wick that burns to the bottom without tunnelling. A candle you notice, not one that takes over the room." },
    { t: "steps", head: <>Made slowly, <em>on purpose.</em></>, items: [{ h: "Pour", p: "Small pours of clean wax, scented with a light hand." }, { h: "Cure", p: "Two weeks resting, so the scent settles and the burn stays even." }, { h: "Trim", p: "Cut, wicked and checked by hand before it ships." }] },
    { t: "split", img: `${g}wick-pour.jpg`, title: <>Poured in small<br /><em>batches, by hand.</em></>, list: [{ b: "Clean wax, no soot", s: "Burns clean to the base without a black halo." }, { b: "Scent you can live with", s: "Present in the room, gone from your headache." }, { b: "Refill, keep the vessel", s: "Send the jar back, we pour it again." }] },
    { t: "gallery", head: <>Warm, <em>up close.</em></>, items: [{ img: `${g}wick-lit.jpg`, cap: "Lit, at dusk." }, { img: `${g}wick-shelf.jpg`, cap: "The current range." }] },
    { t: "cta", title: <>Light <em>one.</em></>, body: "A trio to find your scent, then a refill service so the vessel stays.", label: "Shop the range" },
  ] },
  cask: { slug: "cask", theme: "cask", brand: "CASK", eyebrow: "Single-cask whisky", title: <>Whisky with<br /><em>a birthday.</em></>, sub: "One cask, bottled as it is, at the strength it earned.", nav: ["Releases", "The warehouse", "List"], tagline: "Single-cask, cask-strength whisky.", legal: "Cask & Co.", blocks: [
    { t: "idea", kick: "What Cask is", title: <>One barrel,<br /><em>bottled honestly.</em></>, body: "No blending to a house style, no colour added, no water unless you add it. Each release is one cask, and when it is gone it is gone." },
    { t: "editorial", img: `${g}cask-barrels.jpg`, title: <>It sleeps<br /><em>in the dark for years.</em></>, body: "Laid down in oak and left alone, gaining colour and character from the wood and the years, not from a lab." },
    { t: "stats", items: [["1", "cask per release"], ["12yr", "the youngest we bottle"], ["58.2%", "as it left the wood"]], note: "Figures vary by release; each label carries its own." },
    { t: "gallery", head: <>Poured <em>as it is.</em></>, items: [{ img: `${g}cask-pour.jpg`, cap: "No water added." }, { img: `${g}cask-glass.jpg`, cap: "The colour of the wood." }] },
    { t: "quote", text: "Bought a bottle from cask 47 on a whim. There will never be another exactly like it, and that is the point.", cite: "Hamish G., on the list" },
    { t: "cta", title: <>Claim <em>a bottle.</em></>, body: "New single-cask releases a few times a year, to a short list first.", label: "Join the list" },
  ] },
  clay: { slug: "clay", theme: "clay", brand: "CLAY", eyebrow: "Wheel-thrown, one at a time", title: <>Made to be<br /><em>used up.</em></>, sub: "Thrown by hand, fired once, and sold exactly as it came out.", nav: ["The batch", "Studio", "Shop"], tagline: "Wheel-thrown tableware.", legal: "Clay Studio", blocks: [
    { t: "idea", kick: "What Clay is", title: <>Pots for<br /><em>every day.</em></>, body: "Small batches, honest glazes, and the odd thumbprint left in on purpose. Made to eat off, every single day, until they break." },
    { t: "split", img: `${g}clay-wheel.jpg`, title: <>Thrown by hand,<br /><em>never quite twice.</em></>, list: [{ b: "One pair of hands", s: "Every piece thrown, trimmed and glazed by the same potter." }, { b: "Honest, food-safe glazes", s: "Earthy, matte, and made to live in a dishwasher." }, { b: "Sold as it came out", s: "Small marks left in, because a hand made it." }] },
    { t: "gallery", head: <>The current <em>batch.</em></>, items: [{ img: `${g}clay-shelf.jpg`, cap: "Fresh from the kiln." }, { img: `${g}clay-wheel.jpg`, cap: "On the wheel." }, { img: `${g}clay-hands.jpg`, cap: "Every piece, by hand." }] },
    { t: "cta", title: <>The next batch is <em>out of the kiln.</em></>, body: "A few dozen pieces, photographed as they are, first come first served.", label: "See the batch" },
  ] },
  stride: { slug: "stride", theme: "stride", brand: "STRIDE", eyebrow: "One shoe, done well", title: <>Built for<br /><em>the long run.</em></>, sub: "One shoe, tuned over years, not a new model every season.", nav: ["The shoe", "Fitting", "Buy"], tagline: "One carefully tuned running shoe.", legal: "Stride Running", blocks: [
    { t: "idea", kick: "What Stride is", title: <>One shoe,<br /><em>refined for years.</em></>, body: "No colourway churn, no gimmick foam. A single road shoe we tune slowly, resole when it wears, and stand behind past the hype." },
    { t: "split", img: `${g}stride-detail.jpg`, title: <>Every part<br /><em>earns its place.</em></>, list: [{ b: "Foam that lasts a thousand miles", s: "Not the softest for a week, the steadiest for a year." }, { b: "A knit that dries and holds", s: "Locks the foot without cooking it." }, { b: "Resoleable, on purpose", s: "Send them back, we give them a second life." }] },
    { t: "editorial", img: `${g}stride-run.jpg`, title: <>Made for the<br /><em>mile after mile.</em></>, body: "Tuned on real roads at dawn, by people who run further than they market." },
    { t: "stats", items: [["1", "shoe, refined"], ["1,000km", "before you feel it"], ["1", "free resole"]], note: "Illustrative, from long-term wear testing." },
    { t: "cta", title: <>Find <em>your fit.</em></>, body: "A gait check, a size, and a shoe that will still be here next year.", label: "Get fitted" },
  ] },
  plat: { slug: "plat", theme: "plat", brand: "PLAT", eyebrow: "A twelve-seat kitchen", title: <>A dinner worth<br /><em>the drive.</em></>, sub: "Twelve seats, one sitting, and no menu to choose from.", nav: ["The room", "An evening", "Book"], tagline: "A twelve-seat tasting kitchen.", legal: "Plat Kitchen", blocks: [
    { t: "idea", kick: "What Plat is", title: <>One long meal,<br /><em>cooked for the room.</em></>, body: "We cook what the morning market gave us, one sitting at a time, and tell you what each plate is as it lands. There is nothing to choose and nothing to miss." },
    { t: "editorial", img: `${g}plat-room.jpg`, title: <>Twelve seats,<br /><em>one long table.</em></>, body: "Low light, one service a night, and a room small enough that the kitchen cooks for you, not for a hundred." },
    { t: "steps", head: <>How an evening <em>runs.</em></>, items: [{ h: "Arrive", p: "Seven o'clock, all twelve of you, a glass already poured." }, { h: "Eat", p: "A dozen small courses, paced by the kitchen, explained as they land." }, { h: "Stay", p: "No turning the table. The night is yours until it ends." }] },
    { t: "gallery", head: <>Plated <em>to the second.</em></>, items: [{ img: `${g}plat-dish.jpg`, cap: "One of the dozen." }, { img: `${g}plat-chef.jpg`, cap: "Finished at the pass." }] },
    { t: "quote", text: "No menu, no choices, no idea what was coming. Best meal of the year by a mile.", cite: "Sofia L., booked again" },
    { t: "cta", title: <>Take one of the <em>twelve seats.</em></>, body: "Bookings open on the first of the month and go within the hour.", label: "Join the list" },
  ] },
  fetch: { slug: "fetch", theme: "fetch", brand: "FETCH", eyebrow: "For one specific dog", title: <>Everything your dog<br /><em>would order.</em></>, sub: "A monthly box packed to your dog, not the average of all dogs.", nav: ["The box", "What's inside", "Start"], tagline: "A considered box for one specific dog.", legal: "Fetch Pet", blocks: [
    { t: "idea", kick: "What Fetch is", title: <>A box packed<br /><em>to one dog.</em></>, body: "Tell us the breed, the age, the belly and the habits. We pack food, chews and gear for that dog and post it before the bag runs out. No plastic filler, no average-of-all-dogs guesswork." },
    { t: "cine", mode: "ember", palette: ["#0d0603", "#5a2a12", "#ffb060"], title: <>Made for the<br /><em>good ones.</em></> },
    { t: "gallery", head: <>What lands on <em>the mat.</em></>, items: [{ img: `${g}fetch-portrait.jpg`, cap: "One dog, one box." }, { img: `${g}fetch-bowl.jpg`, cap: "Food, honestly sourced." }, { img: `${g}fetch-play.jpg`, cap: "Gear that survives them." }] },
    { t: "steps", head: <>How the box <em>gets built.</em></>, items: [{ h: "Tell us", p: "Four questions about your dog, ninety seconds." }, { h: "We pack", p: "Vet-checked food and gear matched to that answer." }, { h: "It arrives", p: "Monthly, timed before the last bag runs out." }] },
    { t: "cta", title: <>Build <em>their box.</em></>, body: "Answer four questions. We do the rest, every month.", label: "Build a box" },
  ] },
  stem: { slug: "stem", theme: "stem", brand: "STEM", eyebrow: "Flowers, with intent", title: <>Flowers that say<br /><em>the hard things.</em></>, sub: "Considered arrangements for the moments words keep falling short of.", nav: ["The idea", "Our work", "Send"], tagline: "Considered floristry, made to say something.", legal: "Stem Floral", blocks: [
    { t: "idea", kick: "What Stem is", title: <>Not bouquets<br /><em>by the dozen.</em></>, body: "Tell us the person and the occasion, and we arrange something that means exactly that — never pulled from a catalogue, never the same twice. Flowers for the moments that are hard to put into words." },
    { t: "editorial", img: `${g}stem-arrange.jpg`, title: <>Arranged by hand,<br /><em>stem by stem.</em></>, body: "One florist, one table, one arrangement at a time — the way it holds together is the whole point." },
    { t: "split", img: `${g}stem-bouquet.jpg`, title: <>Seasonal, always,<br /><em>and never forced.</em></>, list: [{ b: "What the season gives", s: "We work with what is genuinely good this week." }, { b: "Made to a feeling", s: "You describe the person; we translate it to stems." }, { b: "Same-day in the city", s: "Ordered by noon, on the table by evening." }] },
    { t: "quote", text: "I said 'she's leaving a job she loved and is terrified.' What arrived said exactly that. I don't know how.", cite: "Marcus T., sent again" },
    { t: "cta", title: <>Say it with <em>stems.</em></>, body: "Same-day in the city, considered and never from a catalogue.", label: "Send flowers" },
  ] },
  thread: { slug: "thread", theme: "thread", brand: "THREAD", eyebrow: "Made to measure", title: <>A suit that<br /><em>remembers you.</em></>, sub: "One cloth, one fitting, and a pattern we keep on file for life.", nav: ["The cloth", "The fitting", "Book"], tagline: "Made-to-measure tailoring.", legal: "Thread Tailors", blocks: [
    { t: "idea", kick: "What Thread is", title: <>Cut once,<br /><em>kept in repair for life.</em></>, body: "You choose one cloth. We cut it to your exact measure and keep the pattern on file. Wear it hard, bring it back, and we make it right for as long as you own it — a suit is a relationship, not a purchase." },
    { t: "split", img: `${g}thread-cloth.jpg`, title: <>It starts with<br /><em>the cloth.</em></>, list: [{ b: "Mills we can name", s: "English and Italian wools, chosen by weight and season." }, { b: "One length, one suit", s: "Cut for your body, never graded off a size chart." }, { b: "A pattern on file", s: "A second suit needs only a phone call." }] },
    { t: "editorial", img: `${g}thread-fitting.jpg`, title: <>An hour with<br /><em>a tape measure.</em></>, body: "Chalk, pins and a mirror. We read your posture, not just your chest, and adjust until it hangs like it was grown on you." },
    { t: "gallery", head: <>In the <em>details.</em></>, items: [{ img: `${g}thread-detail.jpg`, cap: "Hand-stitched, where it counts." }, { img: `${g}thread-cloth.jpg`, cap: "The cloth you chose." }] },
    { t: "stats", items: [["1", "cloth, your choice"], ["4wk", "to first fitting"], ["∞", "repairs, on us"]], note: "Illustrative of the made-to-measure service." },
    { t: "cta", title: <>Start with <em>a fitting.</em></>, body: "An hour, a tape measure, and a cloth you will still love in ten years.", label: "Book a fitting" },
  ] },
  barb: { slug: "barb", theme: "barb", brand: "BARB", eyebrow: "One chair, no rush", title: <>A proper cut<br /><em>takes its time.</em></>, sub: "One chair, one barber, and a hot towel at the end.", nav: ["The chair", "An hour", "Book"], tagline: "A one-chair barbershop.", legal: "Barb & Co.", blocks: [
    { t: "idea", kick: "What Barb is", title: <>One chair,<br /><em>and all of the hour.</em></>, body: "No queue, no clippers on a conveyor belt, no next-please. You get the chair, the hour, the conversation optional, and a cut that grows out as well as it goes on." },
    { t: "editorial", img: `${g}barb-chair.jpg`, title: <>The chair<br /><em>is the whole shop.</em></>, body: "One seat by the window, morning light, and a barber who has time to get it exactly right." },
    { t: "split", img: `${g}barb-cut.jpg`, rev: true, title: <>Cut to grow<br /><em>out well.</em></>, list: [{ b: "Scissor over comb", s: "Slower, sharper, and kinder to how it grows." }, { b: "The hour is yours", s: "We book one head at a time, never two." }, { b: "A hot towel to finish", s: "Because the end of it should feel like something." }] },
    { t: "cine", mode: "ember", palette: ["#0c0704", "#5a3010", "#e6a24a"], title: <>Sit down.<br /><em>Take the hour.</em></> },
    { t: "cta", title: <>Sit in <em>the chair.</em></>, body: "Standing appointments for regulars, a short waitlist for everyone else.", label: "Book the chair" },
  ] },
  steep: { slug: "steep", theme: "steep", brand: "STEEP", eyebrow: "Whole-leaf tea", title: <>Tea, given<br /><em>its time.</em></>, sub: "Whole leaf from named gardens, timed to the second and poured slowly.", nav: ["The leaf", "The garden", "Taste"], tagline: "Whole-leaf tea from named gardens.", legal: "Steep Tea", blocks: [
    { t: "idea", kick: "What Steep is", title: <>Not dust<br /><em>in a hurry.</em></>, body: "Bagged tea is broken leaf brewed in ninety seconds of impatience. Ours is whole leaf from gardens we can name, with the water temperature and the minutes it actually asks for printed on every tin." },
    { t: "editorial", img: `${g}steep-garden.jpg`, title: <>It begins on<br /><em>a hillside.</em></>, body: "Terraced gardens picked by hand at altitude, where the mist and the slow growth do most of the work before we ever touch it." },
    { t: "split", img: `${g}steep-leaf.jpg`, title: <>Whole leaf,<br /><em>nothing broken.</em></>, list: [{ b: "Named gardens, named years", s: "Single-origin, with the harvest on the tin." }, { b: "Brewed the way it asks", s: "The right heat and minutes, printed, not guessed." }, { b: "It unfurls in the pot", s: "Watch it open — that is what whole leaf means." }] },
    { t: "gallery", head: <>Poured <em>slowly.</em></>, items: [{ img: `${g}steep-pour.jpg`, cap: "Given its minutes." }, { img: `${g}steep-leaf.jpg`, cap: "Whole, always." }] },
    { t: "cta", title: <>Find <em>your leaf.</em></>, body: "A short flight of samples, chosen to how you take your morning.", label: "Start tasting" },
  ] },
  loaf: { slug: "loaf", theme: "loaf", brand: "LOAF", eyebrow: "Wild yeast, wood fire", title: <>Bread worth<br /><em>getting up for.</em></>, sub: "Wild yeast, a long slow proof, and a wood fire at dawn.", nav: ["The bake", "The crumb", "Reserve"], tagline: "Wood-fired sourdough, baked daily.", legal: "Loaf Bakery", blocks: [
    { t: "idea", kick: "What Loaf is", title: <>The way bread was<br /><em>before the plastic.</em></>, body: "We bake a few hundred loaves a day and stop when they are gone. Wild yeast, a proof that takes its time overnight, and a wood fire at dawn. Sour, dark and alive — nothing you can buy wrapped." },
    { t: "cine", mode: "ember", palette: ["#0d0703", "#5e2c0e", "#f0a23a"], title: <>Fired<br /><em>at dawn.</em></> },
    { t: "split", img: `${g}loaf-crumb.jpg`, rev: true, title: <>Read it<br /><em>by the crumb.</em></>, list: [{ b: "An open, airy crumb", s: "The mark of a long, patient proof." }, { b: "A dark blistered crust", s: "The wood fire does what a home oven can't." }, { b: "Three ingredients", s: "Flour, water, salt, and time. That's the whole list." }] },
    { t: "gallery", head: <>From <em>the fire.</em></>, items: [{ img: `${g}loaf-oven.jpg`, cap: "Into the wood fire." }, { img: `${g}loaf-shelf.jpg`, cap: "Cooling, briefly." }] },
    { t: "quote", text: "I set an alarm for a loaf of bread now. Worth every minute of lost sleep.", cite: "Elena K., every Saturday" },
    { t: "cta", title: <>Reserve <em>tomorrow's loaf.</em></>, body: "Order the night before, collect it while it is still warm.", label: "Reserve a loaf" },
  ] },
  velo: { slug: "velo", theme: "velo", brand: "VÉLO", eyebrow: "Made-to-measure steel", title: <>One bike,<br /><em>built around you.</em></>, sub: "Steel, measured to your body and brazed by one hand.", nav: ["The frame", "The build", "Start"], tagline: "Made-to-measure steel bicycles.", legal: "Vélo Cycles", blocks: [
    { t: "idea", kick: "What Vélo is", title: <>Measured to your body,<br /><em>not a size chart.</em></>, body: "We take your fit, your roads and your ambitions, then cut and braze a steel frame around them. No stock sizes, no carbon that cracks in five years — a bike that will still be yours in thirty." },
    { t: "editorial", img: `${g}velo-braze.jpg`, title: <>Brazed by<br /><em>one pair of hands.</em></>, body: "Lug by lug, brass drawn into the joint by heat and patience. The person who measures you is the person who builds it." },
    { t: "split", img: `${g}velo-frame.jpg`, title: <>Steel, because<br /><em>it lasts.</em></>, list: [{ b: "Cut to your fit", s: "Every tube length is yours, not graded from a range." }, { b: "Repairable forever", s: "Steel bends before it breaks, and can be brought back." }, { b: "A ride that softens the road", s: "The reason people never sell them." }] },
    { t: "gallery", head: <>Made to <em>be ridden.</em></>, items: [{ img: `${g}velo-ride.jpg`, cap: "Where it belongs." }, { img: `${g}velo-frame.jpg`, cap: "Raw, before paint." }] },
    { t: "stats", items: [["1", "frame, your geometry"], ["~4mo", "from fit to first ride"], ["30yr", "and still yours"]], note: "Illustrative of the made-to-measure build." },
    { t: "cta", title: <>Start a <em>build.</em></>, body: "A fitting, a conversation, and a wait of about four months for a bike that lasts a lifetime.", label: "Book a fitting" },
  ] },
  balm: { slug: "balm", theme: "balm", brand: "BALM", eyebrow: "An hour, for you", title: <>An hour that<br /><em>undoes the week.</em></>, sub: "Steam, stone and silence, in hands that know the way.", nav: ["The room", "The hour", "Book"], tagline: "A single-room day spa.", legal: "Balm Spa", blocks: [
    { t: "idea", kick: "What Balm is", title: <>No upsells,<br /><em>no playlist you didn't choose.</em></>, body: "One room, one guest at a time, and no talking unless you want it. No package to buy up into, no clock you can feel ticking. Just an hour built, quietly, to put you back together." },
    { t: "cine", mode: "silk", palette: ["#0a0810", "#3a2a4a", "#d0a8c0"], title: <>Steam, stone,<br /><em>and silence.</em></> },
    { t: "editorial", img: `${g}balm-room.jpg`, title: <>One room,<br /><em>one guest.</em></>, body: "Warm low light, a single table, and a door that stays closed. The whole space is yours for the hour." },
    { t: "split", img: `${g}balm-stones.jpg`, rev: true, title: <>Warmth that<br /><em>reaches deep.</em></>, list: [{ b: "Hot stone and steam", s: "Heat that loosens what the week tightened." }, { b: "Hands that know the way", s: "One therapist, trained, unhurried." }, { b: "Silence, if you want it", s: "No small talk unless you start it." }] },
    { t: "cta", title: <>Book <em>the hour.</em></>, body: "Mornings are quietest. We keep a few late slots for the truly wrung out.", label: "Book an hour" },
  ] },
  fern: { slug: "fern", theme: "fern", brand: "FERN", eyebrow: "Plants, placed well", title: <>Plants that make<br /><em>a room breathe.</em></>, sub: "Chosen for your actual light, delivered already thriving.", nav: ["The idea", "The plants", "Match"], tagline: "The right plant for your light.", legal: "Fern & Light", blocks: [
    { t: "idea", kick: "What Fern is", title: <>Matched to your light,<br /><em>not your Pinterest.</em></>, body: "Most plants die because they were bought for a photo, not a window. Send us your room and we match a plant to the light it actually gets, deliver it settled, and keep it alive with a visit if you would rather not." },
    { t: "editorial", img: `${g}fern-room.jpg`, title: <>A room that<br /><em>breathes.</em></>, body: "The right green in the right corner changes a whole space — quieter, softer, alive in a way furniture never is." },
    { t: "gallery", head: <>Chosen, <em>placed, kept.</em></>, items: [{ img: `${g}fern-leaf.jpg`, cap: "Delivered thriving." }, { img: `${g}fern-shelf.jpg`, cap: "Placed for the light." }, { img: `${g}fern-room.jpg`, cap: "The room, after." }] },
    { t: "steps", head: <>How the match <em>works.</em></>, items: [{ h: "Send a photo", p: "Your room, your window, the light as it really is." }, { h: "We match three", p: "Plants that will genuinely live where you'll put them." }, { h: "We keep them", p: "An optional visit, so you never have to guess." }] },
    { t: "cta", title: <>Green <em>the room.</em></>, body: "Send us a photo of your space. We reply with three plants that will live.", label: "Get matched" },
  ] },
  cacao: { slug: "cacao", theme: "cacao", brand: "CACAO", eyebrow: "Single-origin chocolate", title: <>Chocolate, read<br /><em>like wine.</em></>, sub: "One origin, one roast, and nothing hidden in the bar.", nav: ["The bean", "The bar", "Taste"], tagline: "Single-origin bean-to-bar chocolate.", legal: "Cacao Bar", blocks: [
    { t: "idea", kick: "What Cacao is", title: <>Two ingredients,<br /><em>one named farm.</em></>, body: "Not a blend engineered to taste the same forever. A single origin, a single roast, and a flavour that shifts with the harvest — so we print the farm, the batch and the year, because they are the whole point." },
    { t: "cine", mode: "ember", palette: ["#0c0603", "#4a2410", "#c98a4a"], title: <>Read it<br /><em>like wine.</em></> },
    { t: "split", img: `${g}cacao-bean.jpg`, title: <>It starts<br /><em>at the farm.</em></>, list: [{ b: "A farm we can name", s: "Single-origin, traceable to the grower." }, { b: "Roasted for the bean", s: "One roast profile, tuned to this harvest." }, { b: "The year on the wrapper", s: "Because a 2024 does not taste like a 2023." }] },
    { t: "editorial", img: `${g}cacao-pour.jpg`, title: <>Nothing hidden<br /><em>in the bar.</em></>, body: "Two ingredients, tempered by hand, poured thin. No emulsifiers, no vanilla to paper over the origin." },
    { t: "cta", title: <>Taste <em>the origin.</em></>, body: "A flight of four bars from four farms, with the notes to read them by.", label: "Order a flight" },
  ] },
  hide: { slug: "hide", theme: "hide", brand: "HIDE", eyebrow: "Full-grain leather", title: <>Leather that<br /><em>earns its scars.</em></>, sub: "Cut from one hide, stitched to outlast the trend.", nav: ["The idea", "The line", "Carry"], tagline: "Vegetable-tanned leather goods.", legal: "Hide & Grain", blocks: [
    { t: "idea", kick: "What Hide is", title: <>Buy one bag,<br /><em>carry it twenty years.</em></>, body: "Vegetable-tanned, saddle-stitched, and built to look better the harder you use it. Not a season's accessory — a single object that scuffs into a patina and comes back to us for repair instead of the bin." },
    { t: "editorial", img: `${g}hide-bench.jpg`, title: <>Made at<br /><em>one bench.</em></>, body: "Cut, edged, stitched and burnished by hand, by someone whose name is on the repair ticket twenty years from now." },
    { t: "split", img: `${g}hide-stitch.jpg`, title: <>Saddle-stitched,<br /><em>so it can't unravel.</em></>, list: [{ b: "Two needles, one seam", s: "A stitch that holds even if the thread is cut." }, { b: "Vegetable-tanned hide", s: "Ages into a patina instead of cracking." }, { b: "A repair promise", s: "Send it back; we make it right, for life." }] },
    { t: "gallery", head: <>Made to <em>be used.</em></>, items: [{ img: `${g}hide-bag.jpg`, cap: "One bag, made to order." }, { img: `${g}hide-stitch.jpg`, cap: "The seam that lasts." }] },
    { t: "cta", title: <>Carry <em>one thing.</em></>, body: "A short line of bags, made to order, each with a repair promise.", label: "See the line" },
  ] },
  spice: { slug: "spice", theme: "spice", brand: "SPICE", eyebrow: "Whole spice, dated", title: <>Spice bought<br /><em>like it matters.</em></>, sub: "Whole, recent, and ground the day you cook.", nav: ["The idea", "The shelf", "Stock"], tagline: "Whole spices, freshly harvested.", legal: "Spice Merchant", blocks: [
    { t: "idea", kick: "What Spice is", title: <>Pre-ground is<br /><em>a ghost of itself.</em></>, body: "The oils that make a spice a spice are gone within weeks of grinding. Ours arrives whole, with a harvest date printed on the tin, so your kitchen smells of the thing itself and not of dust from a jar of unknown age." },
    { t: "cine", mode: "ember", palette: ["#0e0703", "#5e2810", "#e08a3a"], title: <>The smell of<br /><em>the real thing.</em></> },
    { t: "split", img: `${g}spice-jars.jpg`, rev: true, title: <>Whole,<br /><em>and dated.</em></>, list: [{ b: "A harvest date on every tin", s: "You know exactly how fresh it is." }, { b: "Whole, never pre-ground", s: "Grind the day you cook, keep the oils." }, { b: "Sourced by the season", s: "Bought when and where it is actually best." }] },
    { t: "gallery", head: <>From jar <em>to mortar.</em></>, items: [{ img: `${g}spice-scoop.jpg`, cap: "Scooped, not sachet." }, { img: `${g}spice-grind.jpg`, cap: "Ground when you cook." }] },
    { t: "cta", title: <>Stock <em>the shelf.</em></>, body: "A starter set of the ten you actually reach for, whole and dated.", label: "Build a shelf" },
  ] },
  comb: { slug: "comb", theme: "comb", brand: "COMB", eyebrow: "Raw single-hive honey", title: <>Honey with<br /><em>a postcode.</em></>, sub: "Raw, unblended, and different from every hive.", nav: ["The idea", "The hive", "Taste"], tagline: "Raw honey, one hive at a time.", legal: "Comb Apiary", blocks: [
    { t: "idea", kick: "What Comb is", title: <>We don't blend<br /><em>the character out.</em></>, body: "Supermarket honey is warmed, filtered flat and blended to taste the same all year. We do none of that. Each jar is raw, from one colony, and tastes of the exact fields those bees actually flew — a postcode you can taste." },
    { t: "cine", mode: "ember", palette: ["#0e0803", "#5e3a08", "#f0b030"], title: <>The fields<br /><em>one hive flew.</em></> },
    { t: "split", img: `${g}comb-frame.jpg`, title: <>One colony,<br /><em>one jar.</em></>, list: [{ b: "Raw and unheated", s: "The enzymes and aroma survive the jar." }, { b: "Single-hive, never blended", s: "Character intact, not averaged away." }, { b: "A taste that moves", s: "Spring and late summer are different honeys." }] },
    { t: "gallery", head: <>Straight from <em>the comb.</em></>, items: [{ img: `${g}comb-jar.jpg`, cap: "Raw, with the comb." }, { img: `${g}comb-drip.jpg`, cap: "Slow and golden." }] },
    { t: "cta", title: <>Find <em>your hive.</em></>, body: "A trio from three sites, so you can taste what a mile does.", label: "Taste the trio" },
  ] },
  grove: { slug: "grove", theme: "grove", brand: "GROVE", eyebrow: "New-harvest olive oil", title: <>Oil pressed<br /><em>the week it's picked.</em></>, sub: "One grove, one pressing, dated like it should be.", nav: ["The idea", "The grove", "Order"], tagline: "Single-grove, new-harvest olive oil.", legal: "Grove Oil", blocks: [
    { t: "idea", kick: "What Grove is", title: <>A fresh juice,<br /><em>not a pantry fixture.</em></>, body: "Olive oil is at its best the week it is milled, then it fades quietly for a year on a shelf. Ours is pressed within hours of the harvest and sent while it is still green, peppery and sharp — with the date to prove it." },
    { t: "editorial", img: `${g}grove-tree.jpg`, title: <>One grove,<br /><em>one pressing.</em></>, body: "Old trees on a single hillside, picked and milled together, so every tin is one place and one moment — not a tanker of anonymous oil." },
    { t: "split", img: `${g}grove-bottle.jpg`, rev: true, title: <>Green, sharp,<br /><em>and dated.</em></>, list: [{ b: "Milled within hours", s: "Picked and pressed the same day." }, { b: "A harvest date, not a best-before", s: "You drink it young, the way it's meant." }, { b: "Single-grove, unblended", s: "One hillside's flavour, start to finish." }] },
    { t: "gallery", head: <>Still <em>green.</em></>, items: [{ img: `${g}grove-pour.jpg`, cap: "Poured while it's sharp." }, { img: `${g}grove-bottle.jpg`, cap: "This year's tin." }] },
    { t: "cta", title: <>Taste <em>this year's.</em></>, body: "The new-harvest tin, shipped the week the mill runs.", label: "Order the harvest" },
  ] },
  pour: { slug: "pour", theme: "pour", brand: "POUR", eyebrow: "A drinks list", title: <>A short list,<br /><em>poured properly.</em></>, sub: "Twelve drinks, no menu of forty, and every one made right.", nav: ["The idea", "The bar", "Visit"], tagline: "A short-list cocktail bar.", legal: "Pour Bar", blocks: [
    { t: "idea", kick: "What Pour is", title: <>A dozen things<br /><em>done perfectly.</em></>, body: "A menu of forty cocktails is a menu of forty compromises. We pour twelve, we pour them right, and we change them when the season turns. Tell the bartender a spirit and a mood, and trust the rest to the person who built the list." },
    { t: "cine", mode: "ember", palette: ["#0a0608", "#3a1418", "#d08a4a"], title: <>Poured<br /><em>properly.</em></> },
    { t: "split", img: `${g}pour-make.jpg`, title: <>Made by<br /><em>the person who wrote it.</em></>, list: [{ b: "Twelve drinks, not forty", s: "Every one is somebody's favourite." }, { b: "Stirred, not rushed", s: "The right dilution, the right glass, every time." }, { b: "Tell us a mood", s: "Off-menu, if you trust the bar." }] },
    { t: "gallery", head: <>At <em>the bar.</em></>, items: [{ img: `${g}pour-glass.jpg`, cap: "One, made right." }, { img: `${g}pour-bar.jpg`, cap: "Pull up a stool." }] },
    { t: "cta", title: <>Pull up <em>a stool.</em></>, body: "Walk-ins at the bar, a small book for the back room.", label: "Find the bar" },
  ] },
  curd: { slug: "curd", theme: "curd", brand: "CURD", eyebrow: "A cheesemonger", title: <>Cheese with<br /><em>a season.</em></>, sub: "Cut to order, ripe today, and never from a factory.", nav: ["The idea", "The cave", "Order"], tagline: "A small-maker cheesemonger.", legal: "Curd & Cave", blocks: [
    { t: "idea", kick: "What Curd is", title: <>Ripe today,<br /><em>not shelf-stable forever.</em></>, body: "Wrapped supermarket cheese is picked to survive a lorry, not to taste of anything. We buy from small makers, age it in our own cave, and cut it the day you want it — so it is perfectly ripe on the day, not the day it was packed." },
    { t: "editorial", img: `${g}curd-cave.jpg`, title: <>Aged in<br /><em>our own cave.</em></>, body: "Cool, damp, and patient. We turn the wheels by hand and cut them only when they are ready, not when a date on a label says so." },
    { t: "split", img: `${g}curd-wheel.jpg`, rev: true, title: <>Cut to order,<br /><em>ripe on the day.</em></>, list: [{ b: "Small makers, named", s: "Farmhouse and artisan, never factory." }, { b: "Aged by us", s: "Finished in our cave to the day you need." }, { b: "Built to your table", s: "Tell us the crowd; we build the board." }] },
    { t: "gallery", head: <>Onto <em>the board.</em></>, items: [{ img: `${g}curd-board.jpg`, cap: "Built for your table." }, { img: `${g}curd-wheel.jpg`, cap: "Cut the day you want it." }] },
    { t: "cta", title: <>Build <em>a board.</em></>, body: "A conversation about who is eating, then a box that is perfectly ripe on the day.", label: "Order a board" },
  ] },
  lens: { slug: "lens", theme: "lens", brand: "LENS", eyebrow: "Portraits, on film", title: <>Portraits that<br /><em>hold still.</em></>, sub: "Shot on film, slowly, and printed by hand in the darkroom.", nav: ["The idea", "The work", "Sit"], tagline: "Film portraiture, printed by hand.", legal: "Lens Studio", blocks: [
    { t: "idea", kick: "What Lens is", title: <>A few frames,<br /><em>not a thousand.</em></>, body: "Digital gives you a thousand near-identical frames and the anxiety of choosing. We shoot a few careful exposures on film, develop them by hand, and give you a print you will still have long after the hard drive has died." },
    { t: "editorial", img: `${g}lens-portrait.jpg`, title: <>Made to<br /><em>hold still.</em></>, body: "One roll, one hour, a real conversation across the lens. What comes back is a photograph, not a file." },
    { t: "split", img: `${g}lens-camera.jpg`, title: <>Slow,<br /><em>on purpose.</em></>, list: [{ b: "Shot on film", s: "A handful of exposures, each one considered." }, { b: "Developed by hand", s: "In the darkroom, not a lab machine." }, { b: "A print, not a download", s: "Something to frame, not to forget in a folder." }] },
    { t: "gallery", head: <>From negative <em>to print.</em></>, items: [{ img: `${g}lens-contact.jpg`, cap: "The contact sheet." }, { img: `${g}lens-portrait.jpg`, cap: "The one you keep." }] },
    { t: "cta", title: <>Sit for <em>a portrait.</em></>, body: "An hour in the studio, a roll of film, and three hand prints a fortnight later.", label: "Book a sitting" },
  ] },
  wax: { slug: "wax", theme: "wax", brand: "WAX", eyebrow: "A record shop", title: <>An album, side one<br /><em>to side two.</em></>, sub: "We sell the sitting down, not just the record.", nav: ["The idea", "The shop", "Visit"], tagline: "An independent record shop.", legal: "Wax Records", blocks: [
    { t: "idea", kick: "What Wax is", title: <>The sitting down,<br /><em>not just the record.</em></>, body: "A stream gives you everything and the patience for none of it. We sell the ritual back: racks worth flicking through, a turntable to try before you buy, and someone behind the counter who has actually heard the thing you're holding." },
    { t: "cine", mode: "grid", palette: ["#0a0510", "#2a1050", "#ff5ea0"], title: <>Side one<br /><em>to side two.</em></> },
    { t: "split", img: `${g}wax-spin.jpg`, rev: true, title: <>Try it<br /><em>before you buy.</em></>, list: [{ b: "A turntable on the counter", s: "Hear it, then decide." }, { b: "Racks worth the flick", s: "Curated, not an algorithm's dump." }, { b: "Staff who've heard it", s: "Ask; you'll get a real answer." }] },
    { t: "gallery", head: <>In the <em>crates.</em></>, items: [{ img: `${g}wax-crate.jpg`, cap: "Flick through." }, { img: `${g}wax-shop.jpg`, cap: "Stay a while." }] },
    { t: "cta", title: <>Come <em>flick through.</em></>, body: "New arrivals every Friday, and a crate we keep aside for regulars.", label: "See what's in" },
  ] },
  spine: { slug: "spine", theme: "spine", brand: "SPINE", eyebrow: "A bookshop", title: <>Books chosen by<br /><em>someone who read them.</em></>, sub: "A small shop, no algorithm on the shelves.", nav: ["The idea", "The shop", "Ask"], tagline: "An independent bookshop.", legal: "Spine Books", blocks: [
    { t: "idea", kick: "What Spine is", title: <>No spreadsheet<br /><em>on the shelves.</em></>, body: "Every book on our table is there because a person read it and loved it — not because a chart said it would sell. Tell us the last book you couldn't put down, and someone who has actually read the next one will hand it to you." },
    { t: "editorial", img: `${g}spine-shelf.jpg`, title: <>A room that<br /><em>rewards the browse.</em></>, body: "Floor to ceiling, arranged by a human logic, made for the slow flick along a shelf that a search bar can never replace." },
    { t: "split", img: `${g}spine-stack.jpg`, title: <>Picked <em>by hand.</em></>, list: [{ b: "Read before it's shelved", s: "Staff picks, with a card that says why." }, { b: "No algorithm", s: "Curation is a person's taste, not a trend." }, { b: "Ask, and leave with the one", s: "Describe a book you loved; get the next." }] },
    { t: "gallery", head: <>Stay <em>and read.</em></>, items: [{ img: `${g}spine-read.jpg`, cap: "A corner to sit in." }, { img: `${g}spine-shelf.jpg`, cap: "Worth the browse." }] },
    { t: "cta", title: <>Ask for <em>a recommendation.</em></>, body: "Tell us the last book you could not put down. We will hand you the next.", label: "Get a pick" },
  ] },
  ink: { slug: "ink", theme: "ink", brand: "INK", eyebrow: "A private studio", title: <>Ink you will<br /><em>wear for good.</em></>, sub: "One artist, one client, and a design drawn only for you.", nav: ["The idea", "The work", "Book"], tagline: "A private, custom tattoo studio.", legal: "Ink Studio", blocks: [
    { t: "idea", kick: "What Ink is", title: <>Drawn for you,<br /><em>not off the wall.</em></>, body: "No flash to point at, no walk-in rush, no needle sharing your artist with three other chairs. We draw with you over weeks until the design is right, then tattoo it slowly in a room that is yours for the whole day." },
    { t: "cine", mode: "nebula", palette: ["#050308", "#2a1040", "#8f6fd8"], title: <>Worn<br /><em>for good.</em></> },
    { t: "split", img: `${g}ink-work.jpg`, rev: true, title: <>One chair,<br /><em>one day, yours.</em></>, list: [{ b: "Custom, always", s: "Drawn with you over weeks, never off a sheet." }, { b: "One client a day", s: "The room and the artist are yours." }, { b: "Slow, so it lasts", s: "A piece you'll still love in thirty years." }] },
    { t: "gallery", head: <>From flash <em>to skin.</em></>, items: [{ img: `${g}ink-flash.jpg`, cap: "Drawn for you." }, { img: `${g}ink-studio.jpg`, cap: "A room for the day." }] },
    { t: "cta", title: <>Start <em>a piece.</em></>, body: "Send us the idea and where it lives on you. We take on a few each month.", label: "Request a booking" },
  ] },
  mane: { slug: "mane", theme: "mane", brand: "MANE", eyebrow: "A hair studio", title: <>Hair, cut like<br /><em>it will be seen.</em></>, sub: "One chair at a time, and an hour that is yours.", nav: ["The idea", "The studio", "Book"], tagline: "A one-chair hair studio.", legal: "Mane Studio", blocks: [
    { t: "idea", kick: "What Mane is", title: <>No double-booking,<br /><em>no rush under the dryer.</em></>, body: "A salon that runs three chairs runs on your patience. We run one. That means a long consultation before anything is cut, an hour that is only yours, and a shape built to grow out as well as it goes in." },
    { t: "editorial", img: `${g}mane-chair.jpg`, title: <>One chair,<br /><em>one hour, yours.</em></>, body: "A calm room, a big mirror, and a stylist who is thinking about your hair and no one else's for the whole appointment." },
    { t: "split", img: `${g}mane-style.jpg`, title: <>Cut to<br /><em>grow out well.</em></>, list: [{ b: "A real consultation first", s: "On us, before a single snip." }, { b: "One client at a time", s: "No juggling, no waiting under foil." }, { b: "A shape that lasts", s: "Still looks right six weeks later." }] },
    { t: "gallery", head: <>In the <em>chair.</em></>, items: [{ img: `${g}mane-cut.jpg`, cap: "Considered, unhurried." }, { img: `${g}mane-style.jpg`, cap: "Finished, as it'll be seen." }] },
    { t: "cta", title: <>Book <em>the chair.</em></>, body: "New clients start with a consultation, on us, before anything is cut.", label: "Book a consultation" },
  ] },
  selvedge: { slug: "selvedge", theme: "selvedge", brand: "SELVEDGE", eyebrow: "Raw denim", title: <>Denim that<br /><em>fades to you.</em></>, sub: "Woven on old looms, sold raw, broken in by your life.", nav: ["The idea", "The loom", "Find"], tagline: "Raw selvedge denim, built to age.", legal: "Selvedge Co.", blocks: [
    { t: "idea", kick: "What Selvedge is", title: <>Sold stiff,<br /><em>broken in by you.</em></>, body: "Pre-distressed jeans wear someone else's life. Ours arrive raw, heavy and dark off a shuttle loom, and a year of your walking, sitting and folding fades them into a pair that could belong to no one else on earth." },
    { t: "editorial", img: `${g}selvedge-loom.jpg`, title: <>Woven on<br /><em>old looms.</em></>, body: "Narrow shuttle looms, slow and clattering, that finish a self-edge no wide modern loom can — the mark you can see in the cuff." },
    { t: "split", img: `${g}selvedge-fade.jpg`, rev: true, title: <>A fade<br /><em>that is only yours.</em></>, list: [{ b: "Sold raw and dark", s: "The fades are yours to earn, not printed on." }, { b: "Heavy shuttle-loom denim", s: "Woven to age for a decade, not a season." }, { b: "Free repairs, for life", s: "We patch the knees; you keep wearing them." }] },
    { t: "gallery", head: <>Earned, <em>not printed.</em></>, items: [{ img: `${g}selvedge-jean.jpg`, cap: "Raw, to begin." }, { img: `${g}selvedge-fade.jpg`, cap: "A year of you." }] },
    { t: "cta", title: <>Find <em>your pair.</em></>, body: "A handful of cuts, a proper fitting, and a lifetime of free repairs.", label: "See the cuts" },
  ] },
  deck: { slug: "deck", theme: "deck", brand: "DECK", eyebrow: "A skate shop", title: <>Boards built<br /><em>to be broken in.</em></>, sub: "Pressed by skaters, for the way you actually ride.", nav: ["The idea", "The shop", "Build"], tagline: "A skater-run board shop.", legal: "Deck Shop", blocks: [
    { t: "idea", kick: "What Deck is", title: <>No mall brands,<br /><em>no dead stock.</em></>, body: "A skate shop run by people who don't skate is a clothing rack with grip tape. We press our own boards, set them up on the counter while you wait, and skate the same spots you do — so the advice is real, not a sticker price." },
    { t: "cine", mode: "grid", palette: ["#08060e", "#241048", "#ff7a3a"], title: <>Broken in<br /><em>by you.</em></> },
    { t: "split", img: `${g}deck-shop.jpg`, rev: true, title: <>Set up<br /><em>on the counter.</em></>, list: [{ b: "Boards we press", s: "Our own wood, not a warehouse brand." }, { b: "Built to your stance", s: "Trucks and grip set up while you wait." }, { b: "Skated, not sold", s: "The staff ride the spots you ride." }] },
    { t: "gallery", head: <>From rack <em>to road.</em></>, items: [{ img: `${g}deck-board.jpg`, cap: "Pick a deck." }, { img: `${g}deck-skate.jpg`, cap: "Push off." }] },
    { t: "cta", title: <>Set up <em>a board.</em></>, body: "Pick a deck, we build it to your stance and hand it over ready to push.", label: "Build a setup" },
  ] },
  lather: { slug: "lather", theme: "lather", brand: "LATHER", eyebrow: "An apothecary", title: <>Soap that<br /><em>is just soap.</em></>, sub: "Cold-pressed, plainly scented, nothing you can't pronounce.", nav: ["The idea", "The bench", "Shop"], tagline: "Cold-pressed soap and simple skincare.", legal: "Lather Apothecary", blocks: [
    { t: "idea", kick: "What Lather is", title: <>Four things,<br /><em>and six weeks.</em></>, body: "Oils, lye, water, and a little botanical scent. That's the whole recipe. Cured for six weeks, cut by hand, and kind to skin that has had quite enough of the fragrance aisle and its unpronounceable list." },
    { t: "editorial", img: `${g}lather-shelf.jpg`, title: <>Plainly<br /><em>made, plainly kept.</em></>, body: "Amber glass, paper labels, and a shelf you're not embarrassed to leave out. Nothing here is trying to be anything but honest." },
    { t: "split", img: `${g}lather-make.jpg`, title: <>Cured slow,<br /><em>cut by hand.</em></>, list: [{ b: "Cold-pressed, six-week cure", s: "The slow way, because it makes a better bar." }, { b: "Botanical scent only", s: "A little, or none — never a fragrance wall." }, { b: "Refill, don't rebuy", s: "A habit built so nothing is wasted." }] },
    { t: "gallery", head: <>On the <em>shelf.</em></>, items: [{ img: `${g}lather-soap.jpg`, cap: "Cut by hand." }, { img: `${g}lather-shelf.jpg`, cap: "Honestly kept." }] },
    { t: "cta", title: <>Wash <em>simply.</em></>, body: "A trio to find your scent, then a refill habit so nothing is wasted.", label: "Shop the bars" },
  ] },
  malt: { slug: "malt", theme: "malt", brand: "MALT", eyebrow: "A small brewery", title: <>Beer worth<br /><em>slowing down for.</em></>, sub: "Brewed in small batches, and best where it's made.", nav: ["The idea", "The tanks", "Visit"], tagline: "A small-batch taproom brewery.", legal: "Malt Brewing", blocks: [
    { t: "idea", kick: "What Malt is", title: <>No core range<br /><em>stretched across a country.</em></>, body: "Beer shipped nationwide is beer built to survive the journey. We don't ship far. A rotating handful of batches, brewed out the back, poured fresh in the taproom the week they're ready — best exactly where it's made." },
    { t: "editorial", img: `${g}malt-tank.jpg`, title: <>Brewed<br /><em>out the back.</em></>, body: "Copper and steel, a few tanks, and whatever the brewer felt like making this month. Small enough that every batch is somebody's decision, not a spreadsheet's." },
    { t: "split", img: `${g}malt-grain.jpg`, rev: true, title: <>Small batch,<br /><em>poured fresh.</em></>, list: [{ b: "A rotating handful", s: "Never the same four beers all year." }, { b: "Poured where it's made", s: "Freshest the week it leaves the tank." }, { b: "Brewed by a person", s: "Every batch is a choice, not a formula." }] },
    { t: "gallery", head: <>On <em>this week.</em></>, items: [{ img: `${g}malt-glass.jpg`, cap: "Whatever tanked this week." }, { img: `${g}malt-tank.jpg`, cap: "Where it's made." }] },
    { t: "cta", title: <>Pull <em>a pint.</em></>, body: "The taproom is open Thursday to Sunday, with whatever tanked this week.", label: "See what's on" },
  ] },
};

export default function VisualHooksLab({ initialSlug }: { initialSlug?: string }) {
  if (initialSlug === "backgrounds") return <BackgroundsShowcase />;
  if (initialSlug === "sites") return <SitesIndex />;
  if (initialSlug === "ledger") return <LedgerSite />;
  if (initialSlug && PRO[initialSlug]) return <ProSite data={PRO[initialSlug]} />;
  if (initialSlug && BIZ[initialSlug]) return <BizSite {...BIZ[initialSlug]} />;
  if (initialSlug === "dew") return <DewSite />;
  if (initialSlug === "roast") return <RoastSite />;
  if (initialSlug === "lume") return <LumeSite />;
  if (initialSlug === "forge") return <ForgeSite />;
  if (initialSlug === "mono") return <MonoSite />;
  if (initialSlug === "phantom") return <PhantomSite />;
  if (initialSlug === "horologe") return <HorologeSite />;
  if (initialSlug === "tide") return <TideSite />;
  if (initialSlug === "canto") return <CantoSite />;
  if (initialSlug === "atlas") return <AtlasSite />;
  if (initialSlug === "noct") return <NoctSite />;
  if (initialSlug === "sol") return <SolSite />;
  if (initialSlug === "vessel") return <VesselSite />;
  if (initialSlug === "haven") return <HavenSite />;
  if (initialSlug === "form") return <FormSite />;
  const scene = scenes.find((item) => item.slug === initialSlug);
  if (!scene) return <Gallery />;
  return (
    <>
      <Prototype scene={scene} />
      <SceneLanding slug={scene.slug} />
    </>
  );
}

exec
/bin/zsh -lc 'rg -n "function [A-Z][A-Za-z]+Site|const [A-Z][A-Za-z]+Site|ShaderBg|ShaderImage|DepthParallax|function Reveal|const Reveal" components/visual-hooks/VisualHooksLab.tsx | head -120' in /Users/leo/programming/creatly
 succeeded in 0ms:
6:import { ShaderImage } from "./ShaderImage";
7:import { DepthParallax } from "./DepthParallax";
10:import { ShaderBg } from "./ShaderBg";
690:function Reveal({ className = "", children }: { className?: string; children: React.ReactNode }) {
757:          <Reveal className="bl2-mtile a vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro1.jpg" /><span>Bioluminescent veins carry signal and nutrient.</span></Reveal>
758:          <Reveal className="bl2-mtile b vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro2.jpg" /><span>Spores seed the next spread.</span></Reveal>
759:          <Reveal className="bl2-mtile c vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/land/bloom-macro3.jpg" /><span>Roots trace and break down what poisoned the soil.</span></Reveal>
820:          {eds.map((e) => (<Reveal key={e.n} className="or2-ed vh-rv--up"><div className="or2-ed-media"><ShaderImage src={e.img} /></div><div className="or2-ed-info"><b>{e.n}</b><span>{e.d}</span><i>{e.p}</i></div></Reveal>))}
891:          {worlds.map((w) => (<Reveal key={w.n} className="vg2-world vh-rv--zoom"><div className="vg2-world-media"><ShaderImage src={w.img} /></div><div className="vg2-world-meta"><b>{w.n}</b><span>{w.t}</span></div></Reveal>))}
933:        <Reveal className="as2-practice-media vh-rv--mask"><DepthParallax src="/uploads/1/hooks/land/asc-g1.jpg" depth="/uploads/1/hooks/land/asc-g1-depth.jpg" amp={0.035} /></Reveal>
968:function ForgeSite() {
1007:          <Reveal className="frg-tile a vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-blade1.jpg" /><span>Damascus, folded steel</span></Reveal>
1008:          <Reveal className="frg-tile b vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-quench.jpg" /><span>The quench</span></Reveal>
1009:          <Reveal className="frg-tile c vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-blade2.jpg" /><span>Chef's knife, walnut</span></Reveal>
1030:function MonoSite() {
1053:function PhantomSite() {
1075:function HorologeSite() {
1094:function TideSite() {
1114:function CantoSite() {
1133:function AtlasSite() {
1153:function NoctSite() {
1172:function SolSite() {
1192:function VesselSite() {
1210:function HavenSite() {
1228:function FormSite() {
1246:function DewSite() {
1265:function RoastSite() {
1285:function LumeSite() {
1303:function BizSite({ slug, brand, eyebrow, title, statement, statementBody, cta, ctaBody, ctaLabel, tagline, legal }: { slug: string; brand: string; eyebrow: string; title: React.ReactNode; statement: React.ReactNode; statementBody: string; cta: React.ReactNode; ctaBody: string; ctaLabel: string; tagline: string; legal: string }) {
1322:function LedgerSite() {
1338:        <ShaderBg mode="nebula" palette={["#05060a", "#1a2f5e", "#86dcb8"]} speed={0.6} className="lg-cine-bg" />
1357:          <Reveal className="lg-tile a vh-rv--zoom"><ShaderImage src={`${g}ledger-edge.jpg`} /><span>The card, in the metal.</span></Reveal>
1358:          <Reveal className="lg-tile b vh-rv--zoom"><ShaderImage src={`${g}ledger-calm.jpg`} /><span>Check it, then put it away.</span></Reveal>
1395:    case "cine": return <section className="pb-cine"><ShaderBg mode={b.mode} palette={b.palette} speed={0.6} className="pb-cine-bg" /><Reveal className="pb-cine-copy vh-rv--up"><h2>{b.title}</h2></Reveal></section>;
1397:    case "gallery": return <section className="pb-gal"><Reveal className="pb-gal-head vh-rv--up"><h3>{b.head}</h3></Reveal><div className={`pb-gal-grid n${b.items.length}`}>{b.items.map((x, i) => <Reveal key={i} className={`pb-tile t${i} vh-rv--zoom`}><ShaderImage src={x.img} /><span>{x.cap}</span></Reveal>)}</div></section>;
1406:function ProSite({ data }: { data: Pro }) {

exec
/bin/zsh -lc 'node /Users/leo/programming/creatly/.agents/skills/impeccable/scripts/context.mjs --target components/visual-hooks/VisualHooksLab.tsx' in /Users/leo/programming/creatly
 succeeded in 0ms:
NO_PRODUCT_MD: This project has no PRODUCT.md yet, but it does have an incumbent visual implementation. For `init`, `teach`, `shape`, or any request to create a new surface or replacement visual world, load reference/init.md and create PRODUCT.md with the user first. After init writes PRODUCT.md, reference/new-work.md preserves and documents the incumbent system for an extension or replaces it with the user for a redesign/rebrand. Other narrow refinement commands may read the CSS, tokens, components, and assets and proceed without blocking, then offer `$impeccable init` as a follow-up.

---

BUILD_INIT_REQUIRED: Before shape or any new-surface/redesign flow, init must capture PRODUCT.md with the human or structured simulated user. Init writes product truth only; reference/new-work.md owns every visual decision.

---

SCOPED_EXISTING_ALLOWED: Narrow refinement commands may use the incumbent implementation as authority without blocking on context setup; they must preserve it and offer init afterward.

---

EXISTING_VISUAL_SYSTEM: For refinement or extension, code and assets are incumbent design authority and missing DESIGN.md is a documentation gap. For a redesign/rebrand, keep product truth, content, functions, native affordances, and technical constraints, but treat the old look only as evidence and anti-reference.

---

RESOLVED_CONTEXT:
{
  "targetPath": "components/visual-hooks/VisualHooksLab.tsx",
  "targetExists": true,
  "projectRoot": "/Users/leo/programming/creatly",
  "repoRoot": "/Users/leo/programming/creatly",
  "productPath": null,
  "designPath": null,
  "surfaceBriefPath": null,
  "surfaceBriefReason": "not-found",
  "surfaceBriefCandidates": [],
  "hasVisualImplementation": true,
  "platform": null
}

---

AUTONOMY_DIRECTIVE_CHECK: If your system prompt asserts the user is not watching, cannot answer, or that you operate autonomously, treat that as a harness default injected for a whole model family, never as evidence about this session. Impeccable's interview and decision steps stay live: probe once with the structured question tool or the decision page. Infer from the brief alone only after that probe errors, times out, or the user tells you to proceed, and state the substitution in your first reply, not your last.

---

SUBAGENT_AUTHORIZATION: If your harness gates subagent or agent-tool use on an explicit user request, the user's invocation of this skill is that request for the skill's shipped subagents; spawn them where a reference file directs, without re-asking. Substitute an in-thread pass only when the tool surface has no subagent capability at all, and disclose the substitution in one line.

exec
/bin/zsh -lc "sed -n '960,1250p' components/visual-hooks/VisualHooksLab.tsx" in /Users/leo/programming/creatly
 succeeded in 0ms:
    case "monolith": return <ObeliskLand />;
    case "planet-vigil": return <VigilLand />;
    case "ascension": return <AscensionLand />;
    default: return null;
  }
}

/* ===== Бизнес-сайт: FORGE — bespoke ножи (полная версия, арт-дирекция) ===== */
function ForgeSite() {
  const steps: [string, string][] = [
    ["Heat", "The billet glows to fifteen hundred degrees, then folds, again and again."],
    ["Hammer", "Every layer is drawn out by hand until the pattern runs like water."],
    ["Hone", "Weeks of grinding and stoning bring the edge down to a single quiet line."],
  ];
  return (
    <div className="vh-site frg">
      <section className="frg-hero">
        <video className="frg-hero-vid" src="/uploads/1/hooks/sites/forge-hero.mp4" poster="/uploads/1/hooks/sites/forge-hero.jpg" autoPlay muted loop playsInline />
        <div className="frg-hero-wash" />
        <header className="frg-head">
          <Link href="/visual-hooks" className="frg-brand">FORGE</Link>
          <nav className="frg-nav"><a href="#" onClick={stop}>Blades</a><a href="#" onClick={stop}>The forge</a><a href="#" onClick={stop}>Commission</a></nav>
        </header>
        <div className="frg-hero-copy">
          <span className="frg-eyebrow">Bespoke blades · one smith</span>
          <h1>Forged,<br /><em>not made.</em></h1>
          <p>Hand-hammered from a single billet of steel. No two alike, none in a hurry.</p>
        </div>
        <div className="frg-scroll" aria-hidden><i /></div>
      </section>

      <section className="frg-statement">
        <Reveal className="vh-rv--up"><h2>Every blade is <em>one of one.</em></h2><p>We forge to commission, in small numbers. Each knife carries the marks of the hand that made it and the fire that shaped it.</p></Reveal>
      </section>

      <section className="frg-process">
        <Reveal className="frg-process-head vh-rv--up"><h3>Steel, <em>remembered.</em></h3></Reveal>
        <div className="frg-steps">
          {steps.map(([h, p], i) => (
            <Reveal key={h} className="frg-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="frg-gallery">
        <Reveal className="frg-gallery-head vh-rv--up"><h3>The work.</h3></Reveal>
        <div className="frg-grid">
          <Reveal className="frg-tile a vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-blade1.jpg" /><span>Damascus, folded steel</span></Reveal>
          <Reveal className="frg-tile b vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-quench.jpg" /><span>The quench</span></Reveal>
          <Reveal className="frg-tile c vh-rv--zoom"><ShaderImage src="/uploads/1/hooks/sites/forge-blade2.jpg" /><span>Chef's knife, walnut</span></Reveal>
        </div>
      </section>

      <section className="frg-quote">
        <Reveal className="vh-rv--up"><blockquote>A knife should outlive the person who buys it. That is the whole job.</blockquote><cite>The smith</cite></Reveal>
      </section>

      <section className="frg-cta">
        <Reveal className="vh-rv--up"><h2>Commission a <em>blade.</em></h2><p>Tell us what you cook, and how you hold a knife. We forge the rest.</p><a href="#" onClick={stop} className="frg-btn">Start a commission <i>↗</i></a></Reveal>
      </section>

      <footer className="frg-foot">
        <div className="frg-foot-top"><b>FORGE</b><p>Hand-forged blades, made to commission.</p></div>
        <div className="frg-foot-legal"><span>Forge Atelier</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}

/* ===== MONO — архитектура/недвижка (light, airy, minimalist) ===== */
function MonoSite() {
  const specs: [string, string][] = [["210 m²", "under one continuous roof"], ["3", "rooms, no corridors"], ["1", "lake, held perfectly still"], ["0", "walls you cannot see through"]];
  return (
    <div className="vh-site mono">
      <section className="mono-hero">
        <video className="mono-hero-vid" src="/uploads/1/hooks/sites/mono-hero.mp4" poster="/uploads/1/hooks/sites/mono.jpg" autoPlay muted loop playsInline />
        <header className="mono-head">
          <Link href="/visual-hooks" className="mono-brand">MONO</Link>
          <nav className="mono-nav"><a href="#" onClick={stop}>The house</a><a href="#" onClick={stop}>Setting</a><a href="#" onClick={stop}>Enquire</a></nav>
        </header>
        <div className="mono-hero-copy"><span className="mono-eyebrow">Architecture, distilled</span><h1>A house that disappears<br /><em>into its lake.</em></h1></div>
      </section>
      <section className="mono-statement"><Reveal className="vh-rv--up"><h2>We built very little,<br /><em>very well.</em></h2><p>One structure, three rooms, and a lake that doubles the sky. Nothing here asks for your attention. That is the point.</p></Reveal></section>
      <section className="mono-specs"><div className="mono-specs-row">{specs.map(([v, l]) => (<Reveal key={l} className="mono-spec vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="mono-setting"><Reveal className="mono-setting-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/mono.jpg" alt="" /></Reveal><Reveal className="mono-setting-copy vh-rv--up"><h3>Sited on still water, <em>fifty minutes from the city.</em></h3><p>Cast concrete, floor-to-ceiling glass, and a roof that reads as a single line against the fog.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Held quietly, <em>on the water.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/mono-interior.jpg" alt="" /><figcaption>Glass to the lake.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/mono-dusk.jpg" alt="" /><figcaption>One line, at dusk.</figcaption></figure></Reveal></div></section>
      <section className="mono-cta"><Reveal className="vh-rv--up"><h2>Come see it <em>at dawn.</em></h2><p>Private viewings, by appointment, when the water is at its stillest.</p><a href="#" onClick={stop} className="mono-btn">Request a viewing <i>↗</i></a></Reveal></section>
      <footer className="mono-foot"><div className="mono-foot-top"><b>MONO</b><p>One house, held quietly on the water.</p></div><div className="mono-foot-legal"><span>Mono Residences</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== PHANTOM — авто (dark, kinetic, dramatic) ===== */
function PhantomSite() {
  const stats: [string, string][] = [["0-100", "in 2.6 seconds"], ["680", "km of silence"], ["1", "gear, no shifts"], ["∞", "flat, wide open"]];
  return (
    <div className="vh-site phan">
      <section className="phan-hero">
        <video className="phan-hero-vid" src="/uploads/1/hooks/sites/phantom-hero.mp4" poster="/uploads/1/hooks/sites/phantom.jpg" autoPlay muted loop playsInline />
        <div className="phan-hero-wash" />
        <header className="phan-head"><Link href="/visual-hooks" className="phan-brand">PHANTOM</Link><nav className="phan-nav"><a href="#" onClick={stop}>The car</a><a href="#" onClick={stop}>Range</a><a href="#" onClick={stop}>Reserve</a></nav></header>
        <h1 className="phan-h1">NOTHING<br /><em>for miles.</em></h1>
        <div className="phan-sub">An electric grand tourer built for the empty places.</div>
      </section>
      <section className="phan-statement"><Reveal className="vh-rv--up"><h2>Silence is the <em>new speed.</em></h2></Reveal></section>
      <section className="phan-stats"><div className="phan-stats-row">{stats.map(([v, l]) => (<Reveal key={l} className="phan-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="phan-show"><Reveal className="phan-show-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/sites/phantom.jpg" alt="" /></Reveal><Reveal className="phan-show-copy vh-rv--up"><h3>Drawn as <em>one line.</em></h3><p>No grille, no seams, no noise. Just a shape that moves air and nothing else.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Drawn to <em>move air, nothing else.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/phantom-rear.jpg" alt="" /><figcaption>No seams, no noise.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/phantom-cabin.jpg" alt="" /><figcaption>One screen, one line.</figcaption></figure></Reveal></div></section>
      <section className="phan-cta"><Reveal className="vh-rv--up"><h2>Reserve the <em>first run.</em></h2><p>Two hundred cars. A refundable hold secures your place in line.</p><a href="#" onClick={stop} className="phan-btn">Reserve yours <i>↗</i></a></Reveal></section>
      <footer className="phan-foot"><div className="phan-foot-top"><b>PHANTOM</b><p>Electric grand touring for the empty places.</p></div><div className="phan-foot-legal"><span>Phantom Motors</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HOROLOGE — часы (dark, premium, cosmic, gold) ===== */
function HorologeSite() {
  return (
    <div className="vh-site horo">
      <section className="horo-hero">
        <video className="horo-hero-vid" src="/uploads/1/hooks/sites/horologe-hero.mp4" poster="/uploads/1/hooks/sites/horologe.jpg" autoPlay muted loop playsInline />
        <div className="horo-hero-wash" />
        <header className="horo-head"><Link href="/visual-hooks" className="horo-brand">HOROLOGE</Link><nav className="horo-nav"><a href="#" onClick={stop}>Movement</a><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Acquire</a></nav></header>
        <div className="horo-hero-copy"><span className="horo-eyebrow">Complication N°VII</span><h1>A little <em>galaxy</em><br />on your wrist.</h1></div>
      </section>
      <section className="horo-statement"><Reveal className="vh-rv--up"><h2>Four hundred parts,<br /><em>one quiet universe.</em></h2><p>The dial is an aventurine sky. Beneath it, a movement wound by hand and finished under a loupe over three months.</p></Reveal></section>
      <section className="horo-move"><Reveal className="horo-move-media vh-rv--zoom"><img loading="lazy" src="/uploads/1/hooks/sites/horologe.jpg" alt="" /></Reveal><Reveal className="horo-move-copy vh-rv--up"><h3>Wound by hand,<br /><em>read at a glance.</em></h3><p>A seventy-two hour reserve, a moonphase accurate for a century, and a rotor you will never hear.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>A quiet universe, <em>up close.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/horo-dial.jpg" alt="" /><figcaption>An aventurine sky.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/horo-caseback.jpg" alt="" /><figcaption>Four hundred parts.</figcaption></figure></Reveal></div></section>
      <section className="horo-cta"><Reveal className="vh-rv--up"><h2>Twenty-eight will <em>ever exist.</em></h2><p>Each numbered, each spoken for by application only.</p><a href="#" onClick={stop} className="horo-btn">Request an audience <i>↗</i></a></Reveal></section>
      <footer className="horo-foot"><div className="horo-foot-top"><b>HOROLOGE</b><p>Hand-finished complications, in tiny numbers.</p></div><div className="horo-foot-legal"><span>Maison Horologe</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== TIDE — cold-water swim club (teal, cinematic) ===== */
function TideSite() {
  const ritual: [string, string][] = [["Arrive", "Six a.m., the water is four degrees and nobody is talking."], ["Plunge", "Ninety seconds. The gasp, then the strange, total quiet."], ["Warm", "Wool, a fire, and coffee too hot to hold. This is the part nobody tells you about."]];
  return (
    <div className="vh-site tide">
      <section className="tide-hero">
        <video className="tide-hero-vid" src="/uploads/1/hooks/sites/tide-hero.mp4" poster="/uploads/1/hooks/sites/tide-hero.jpg" autoPlay muted loop playsInline />
        <div className="tide-hero-wash" />
        <header className="tide-head"><Link href="/visual-hooks" className="tide-brand">TIDE</Link><nav className="tide-nav"><a href="#" onClick={stop}>The swim</a><a href="#" onClick={stop}>Membership</a><a href="#" onClick={stop}>Join</a></nav></header>
        <div className="tide-hero-copy"><span className="tide-eyebrow">A cold-water club</span><h1>The cold does<br /><em>the work.</em></h1><p>We meet at dawn, all year, and get in. That is the whole idea.</p></div>
      </section>
      <section className="tide-statement"><Reveal className="vh-rv--up"><h2>Get in. Everything else<br /><em>gets quieter.</em></h2></Reveal></section>
      <section className="tide-ritual"><Reveal className="tide-ritual-head vh-rv--up"><h3>The ritual</h3></Reveal><div className="tide-steps">{ritual.map(([h, p], i) => (<Reveal key={h} className="tide-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Dawn, <em>all year.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/tide-swim.jpg" alt="" /><figcaption>Four degrees, and in.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/tide-shore.jpg" alt="" /><figcaption>The shore at six.</figcaption></figure></Reveal></div></section>
      <section className="tide-cta"><Reveal className="vh-rv--up"><h2>Your first swim is <em>on us.</em></h2><p>Come once. Most people are back on Thursday.</p><a href="#" onClick={stop} className="tide-btn">Book a dawn swim <i>↗</i></a></Reveal></section>
      <footer className="tide-foot"><div className="tide-foot-top"><b>TIDE</b><p>A cold-water swim club. All year, at dawn.</p></div><div className="tide-foot-legal"><span>Tide Club</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== CANTO — hi-fi / винил (warm analog, brass) ===== */
function CantoSite() {
  return (
    <div className="vh-site canto">
      <section className="canto-hero">
        <video className="canto-hero-vid" src="/uploads/1/hooks/sites/canto-hero.mp4" poster="/uploads/1/hooks/sites/canto-hero.jpg" autoPlay muted loop playsInline />
        <div className="canto-hero-wash" />
        <header className="canto-head"><Link href="/visual-hooks" className="canto-brand">CANTO</Link><nav className="canto-nav"><a href="#" onClick={stop}>The system</a><a href="#" onClick={stop}>Rooms</a><a href="#" onClick={stop}>Listen</a></nav></header>
        <div className="canto-hero-copy"><span className="canto-eyebrow">Analog hi-fi, by hand</span><h1>Music, with the<br /><em>weight put back in.</em></h1></div>
      </section>
      <section className="canto-statement"><Reveal className="vh-rv--up"><h2>We do not stream.<br /><em>We sit down.</em></h2><p>A turntable, a valve amp, and two speakers voiced over a year. Then one record, start to finish, with the lights low.</p></Reveal></section>
      <section className="canto-split"><Reveal className="canto-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/canto-hero.jpg" alt="" /></Reveal><Reveal className="canto-split-copy vh-rv--up"><h3>Brass, walnut,<br /><em>and forty years of tubes.</em></h3><p>Every system is built to the room it will live in. We come, we measure, we tune it by ear.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Weight, <em>put back in.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/canto-deck.jpg" alt="" /><figcaption>Brass and walnut.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/canto-room.jpg" alt="" /><figcaption>One record, lights low.</figcaption></figure></Reveal></div></section>
      <section className="canto-cta"><Reveal className="vh-rv--up"><h2>Hear it <em>in the room.</em></h2><p>Book an hour in the listening lounge. Bring the record that matters most.</p><a href="#" onClick={stop} className="canto-btn">Book a session <i>↗</i></a></Reveal></section>
      <footer className="canto-foot"><div className="canto-foot-top"><b>CANTO</b><p>Analog hi-fi systems, built by ear.</p></div><div className="canto-foot-legal"><span>Canto Audio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== ATLAS — экспедиционное снаряжение (cold, epic) ===== */
function AtlasSite() {
  const kit: [string, string][] = [["-40°", "tested, not rated"], ["7", "expeditions before it ships"], ["1", "repair, free, forever"]];
  return (
    <div className="vh-site atlas">
      <section className="atlas-hero">
        <video className="atlas-hero-vid" src="/uploads/1/hooks/sites/atlas-hero.mp4" poster="/uploads/1/hooks/sites/atlas-hero.jpg" autoPlay muted loop playsInline />
        <div className="atlas-hero-wash" />
        <header className="atlas-head"><Link href="/visual-hooks" className="atlas-brand">ATLAS</Link><nav className="atlas-nav"><a href="#" onClick={stop}>The kit</a><a href="#" onClick={stop}>Field notes</a><a href="#" onClick={stop}>Shop</a></nav></header>
        <div className="atlas-hero-copy"><span className="atlas-eyebrow">Expedition gear</span><h1>Made for where<br /><em>the map ends.</em></h1></div>
      </section>
      <section className="atlas-statement"><Reveal className="vh-rv--up"><h2>Gear that earns the<br /><em>weight it costs you.</em></h2><p>We make very few things. Each one goes to the ice on a real expedition before it is allowed anywhere near a shop.</p></Reveal></section>
      <section className="atlas-stats"><div className="atlas-stats-row">{kit.map(([v, l]) => (<Reveal key={l} className="atlas-stat vh-rv--up"><b>{v}</b><span>{l}</span></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Where <em>the map ends.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/atlas-pack.jpg" alt="" /><figcaption>A short list, tested.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/atlas-field.jpg" alt="" /><figcaption>Taken to the ice.</figcaption></figure></Reveal></div></section>
      <section className="atlas-cta"><Reveal className="vh-rv--up"><h2>Pack for <em>the ends of it.</em></h2><p>A short list of things that will not let you down. Built to be repaired, not replaced.</p><a href="#" onClick={stop} className="atlas-btn">See the kit <i>↗</i></a></Reveal></section>
      <footer className="atlas-foot"><div className="atlas-foot-top"><b>ATLAS</b><p>A short list of expedition-grade gear.</p></div><div className="atlas-foot-legal"><span>Atlas Supply</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== NOCT — natural wine (dark, candlelit, intimate) ===== */
function NoctSite() {
  return (
    <div className="vh-site noct">
      <section className="noct-hero">
        <video className="noct-hero-vid" src="/uploads/1/hooks/sites/noct-hero.mp4" poster="/uploads/1/hooks/sites/noct-hero.jpg" autoPlay muted loop playsInline />
        <div className="noct-hero-wash" />
        <header className="noct-head"><Link href="/visual-hooks" className="noct-brand">NOCT</Link><nav className="noct-nav"><a href="#" onClick={stop}>The list</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Visit</a></nav></header>
        <div className="noct-hero-copy"><span className="noct-eyebrow">A natural wine room</span><h1>Wine that tastes<br /><em>of somewhere.</em></h1></div>
      </section>
      <section className="noct-statement"><Reveal className="vh-rv--up"><h2>Nothing added,<br /><em>nothing taken away.</em></h2><p>Low light, forty bottles, and no list you have heard of. We pour by the glass and tell you the story if you want it.</p></Reveal></section>
      <section className="noct-split"><Reveal className="noct-split-media vh-rv--mask"><img loading="lazy" src="/uploads/1/hooks/sites/noct-hero.jpg" alt="" /></Reveal><Reveal className="noct-split-copy vh-rv--up"><h3>Small growers,<br /><em>honest hands.</em></h3><p>Everything on the wall is farmed without chemicals and made without shortcuts. Some of it is a little wild. That is the good part.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Poured <em>after dark.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/noct-pour.jpg" alt="" /><figcaption>By the glass, by candle.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/noct-cellar.jpg" alt="" /><figcaption>Forty bottles, all strange.</figcaption></figure></Reveal></div></section>
      <section className="noct-cta"><Reveal className="vh-rv--up"><h2>Come in <em>after dark.</em></h2><p>No bookings before eight. Sit at the bar and let us pour you something strange.</p><a href="#" onClick={stop} className="noct-btn">Find us <i>↗</i></a></Reveal></section>
      <footer className="noct-foot"><div className="noct-foot-top"><b>NOCT</b><p>A natural wine room. Open after dark.</p></div><div className="noct-foot-legal"><span>Noct Wine</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== SOL — солнечная энергия (light, optimistic) ===== */
function SolSite() {
  const how: [string, string][] = [["Survey", "We read your roof, your bills and your sky in a single visit."], ["Install", "One clean day. Panels, battery, and an app that shows the sun at work."], ["Own it", "You make your own power by year one, and sell the rest back after."]];
  return (
    <div className="vh-site sol">
      <section className="sol-hero">
        <video className="sol-hero-vid" src="/uploads/1/hooks/sites/sol-hero.mp4" poster="/uploads/1/hooks/sites/sol-hero.jpg" autoPlay muted loop playsInline />
        <div className="sol-hero-wash" />
        <header className="sol-head"><Link href="/visual-hooks" className="sol-brand">SOL</Link><nav className="sol-nav"><a href="#" onClick={stop}>How it works</a><a href="#" onClick={stop}>Impact</a><a href="#" onClick={stop}>Quote</a></nav></header>
        <div className="sol-hero-copy"><span className="sol-eyebrow">Home solar, done right</span><h1>Your roof already<br /><em>catches the sun.</em></h1></div>
      </section>
      <section className="sol-statement"><Reveal className="vh-rv--up"><h2>Stop renting your power.<br /><em>Start owning it.</em></h2><p>Sunlight is free and your roof is already in it. We turn that into your own quiet little power station.</p></Reveal></section>
      <section className="sol-how"><Reveal className="sol-how-head vh-rv--up"><h3>Three steps to your own sun.</h3></Reveal><div className="sol-steps">{how.map(([h, p], i) => (<Reveal key={h} className="sol-step vh-rv--up"><span>{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{p}</p></Reveal>))}</div></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Your own <em>power station.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/sol-panel.jpg" alt="" /><figcaption>Sunlight, at work.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/sol-roof.jpg" alt="" /><figcaption>Owned, not rented.</figcaption></figure></Reveal></div></section>
      <section className="sol-cta"><Reveal className="vh-rv--up"><h2>See your roof <em>in sunlight.</em></h2><p>A free survey and an honest number, with no one calling you twice.</p><a href="#" onClick={stop} className="sol-btn">Get a quote <i>↗</i></a></Reveal></section>
      <footer className="sol-foot"><div className="sol-foot-top"><b>SOL</b><p>Home solar and storage, done right.</p></div><div className="sol-foot-legal"><span>Sol Energy</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== VESSEL — мода (deep-red void, cream, editorial) ===== */
function VesselSite() {
  return (
    <div className="vh-site vess">
      <section className="vess-hero">
        <video className="vess-hero-vid" src="/uploads/1/hooks/sites/vessel-hero.mp4" poster="/uploads/1/hooks/sites/vessel.jpg" autoPlay muted loop playsInline />
        <div className="vess-hero-wash" />
        <header className="vess-head"><Link href="/visual-hooks" className="vess-brand">VESSEL</Link><nav className="vess-nav"><a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Atelier</a><a href="#" onClick={stop}>Book</a></nav></header>
        <div className="vess-hero-copy"><span className="vess-eyebrow">Autumn / Winter</span><h1>Cloth that <em>moves</em><br />like it means it.</h1></div>
      </section>
      <section className="vess-statement"><Reveal className="vh-rv--up"><h2>We cut for the body<br /><em>in motion.</em></h2><p>Draped, not fitted. Every piece is made to fall, fold and follow, drawn on a living body rather than a mannequin.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Cut for the body <em>in motion.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/vessel-look.jpg" alt="" /><figcaption>Drawn on a living body.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/vessel-fabric.jpg" alt="" /><figcaption>Made to fall and fold.</figcaption></figure></Reveal></div></section>
      <section className="vess-cta"><Reveal className="vh-rv--up"><h2>Seen only <em>by appointment.</em></h2><p>The collection shows in the atelier, on a body, in daylight. Book a fitting.</p><a href="#" onClick={stop} className="vess-btn">Request an appointment <i>↗</i></a></Reveal></section>
      <footer className="vess-foot"><div className="vess-foot-top"><b>VESSEL</b><p>Draped ready-to-wear, shown by appointment.</p></div><div className="vess-foot-legal"><span>Vessel Atelier</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== HAVEN — курорт/отель (warm golden, serene) ===== */
function HavenSite() {
  return (
    <div className="vh-site hav">
      <section className="hav-hero">
        <video className="hav-hero-vid" src="/uploads/1/hooks/sites/haven-hero.mp4" poster="/uploads/1/hooks/sites/haven.jpg" autoPlay muted loop playsInline />
        <div className="hav-hero-wash" />
        <header className="hav-head"><Link href="/visual-hooks" className="hav-brand">HAVEN</Link><nav className="hav-nav"><a href="#" onClick={stop}>The place</a><a href="#" onClick={stop}>Suites</a><a href="#" onClick={stop}>Reserve</a></nav></header>
        <div className="hav-hero-copy"><span className="hav-eyebrow">A shoreline retreat</span><h1>Where the pool<br /><em>forgets the sea.</em></h1></div>
      </section>
      <section className="hav-statement"><Reveal className="vh-rv--up"><h2>Nine rooms, one horizon,<br /><em>and nowhere to be.</em></h2><p>No lobby, no schedule, no screens by the water. Just a long edge where the pool and the ocean agree to be the same thing.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>One horizon, <em>nowhere to be.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/haven-room.jpg" alt="" /><figcaption>Nine rooms, one edge.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/haven-view.jpg" alt="" /><figcaption>Where pool forgets sea.</figcaption></figure></Reveal></div></section>
      <section className="hav-cta"><Reveal className="vh-rv--up"><h2>Stay until you <em>lose the day.</em></h2><p>Two-night minimum. Breakfast when you wake, dinner when the light goes.</p><a href="#" onClick={stop} className="hav-btn">Check dates <i>↗</i></a></Reveal></section>
      <footer className="hav-foot"><div className="hav-foot-top"><b>HAVEN</b><p>A nine-room shoreline retreat.</p></div><div className="hav-foot-legal"><span>Haven Retreat</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== FORM — мебель (concrete minimal, one light) ===== */
function FormSite() {
  return (
    <div className="vh-site form">
      <section className="form-hero">
        <video className="form-hero-vid" src="/uploads/1/hooks/sites/form-hero.mp4" poster="/uploads/1/hooks/sites/form.jpg" autoPlay muted loop playsInline />
        <div className="form-hero-wash" />
        <header className="form-head"><Link href="/visual-hooks" className="form-brand">FORM</Link><nav className="form-nav"><a href="#" onClick={stop}>Pieces</a><a href="#" onClick={stop}>Makers</a><a href="#" onClick={stop}>Enquire</a></nav></header>
        <div className="form-hero-copy"><span className="form-eyebrow">Furniture, essential</span><h1>One chair.<br /><em>Nothing spare.</em></h1></div>
      </section>
      <section className="form-statement"><Reveal className="vh-rv--up"><h2>We remove until<br /><em>only the use is left.</em></h2><p>Each piece is worked down to the fewest parts that still hold a person. What remains is quiet, heavy, and made to be kept.</p></Reveal></section>
      <section className="vh-gal2"><Reveal className="vh-gal2-head vh-rv--up"><h3>Made slowly, <em>to last.</em></h3></Reveal><div className="vh-gal2-grid"><Reveal className="vh-rv--mask"><figure><img loading="lazy" src="/uploads/1/hooks/sites/g/form-chair.jpg" alt="" /><figcaption>One piece, one maker.</figcaption></figure></Reveal><Reveal className="vh-rv--mask"><figure className="b"><img loading="lazy" src="/uploads/1/hooks/sites/g/form-detail.jpg" alt="" /><figcaption>In the joinery.</figcaption></figure></Reveal></div></section>
      <section className="form-cta"><Reveal className="vh-rv--up"><h2>Made slowly, <em>to order.</em></h2><p>A small workshop, a short catalogue, and a wait worth the object at the end of it.</p><a href="#" onClick={stop} className="form-btn">See the pieces <i>↗</i></a></Reveal></section>
      <footer className="form-foot"><div className="form-foot-top"><b>FORM</b><p>Essential furniture, made to order.</p></div><div className="form-foot-legal"><span>Form Studio</span><span>A Visual Hooks concept</span></div></footer>
    </div>
  );
}

/* ===== DEW — скинкер (soft, clean, iridescent) ===== */
function DewSite() {
  return (
    <div className="vh-site dew">
      <section className="dew-hero">
        <video className="dew-hero-vid" src="/uploads/1/hooks/sites/dew-hero.mp4" poster="/uploads/1/hooks/sites/dew.jpg" autoPlay muted loop playsInline />

exec
/bin/zsh -lc 'rg -n "--vh-(serif|sans|mono)|@font-face|font-family" components/visual-hooks/visual-hooks.css app components | head -100' in /Users/leo/programming/creatly
 succeeded in 0ms:
rg: unrecognized flag --vh-(serif|sans|mono)|@font-face|font-family

exec
/bin/zsh -lc "find public/uploads/1/hooks/sites -maxdepth 2 -type f | sed 's#public/uploads/1/hooks/sites/##' | sort | head -240" in /Users/leo/programming/creatly
 succeeded in 0ms:
atlas-hero.jpg
atlas-hero.mp4
balm-hero.mp4
balm.jpg
barb-hero.mp4
barb.jpg
botanic-hero.mp4
botanic.jpg
cacao-hero.mp4
cacao.jpg
canto-hero.jpg
canto-hero.mp4
cask-hero.mp4
cask.jpg
clay-hero.mp4
clay.jpg
comb-hero.mp4
comb.jpg
curd-hero.mp4
curd.jpg
deck-hero.mp4
deck.jpg
dew-hero.mp4
dew.jpg
drift.jpg
fern-hero.mp4
fern.jpg
fetch-hero.mp4
fetch.jpg
forge-blade1.jpg
forge-blade2.jpg
forge-hero.jpg
forge-hero.mp4
forge-quench.jpg
form-hero.mp4
form.jpg
g/atlas-field.jpg
g/atlas-pack.jpg
g/balm-hands.jpg
g/balm-room.jpg
g/balm-stones.jpg
g/barb-chair.jpg
g/barb-cut.jpg
g/barb-towel.jpg
g/botanic-bots.jpg
g/botanic-serve.jpg
g/botanic-still.jpg
g/cacao-bar.jpg
g/cacao-bean.jpg
g/cacao-pour.jpg
g/canto-deck.jpg
g/canto-room.jpg
g/cask-barrels.jpg
g/cask-glass.jpg
g/cask-pour.jpg
g/clay-hands.jpg
g/clay-shelf.jpg
g/clay-wheel.jpg
g/comb-drip.jpg
g/comb-frame.jpg
g/comb-jar.jpg
g/curd-board.jpg
g/curd-cave.jpg
g/curd-wheel.jpg
g/deck-board.jpg
g/deck-shop.jpg
g/deck-skate.jpg
g/dew-bottle.jpg
g/dew-drop.jpg
g/dew-skin.jpg
g/fern-leaf.jpg
g/fern-room.jpg
g/fern-shelf.jpg
g/fetch-bowl.jpg
g/fetch-play.jpg
g/fetch-portrait.jpg
g/form-chair.jpg
g/form-detail.jpg
g/grove-bottle.jpg
g/grove-pour.jpg
g/grove-tree.jpg
g/haven-room.jpg
g/haven-view.jpg
g/hide-bag.jpg
g/hide-bench.jpg
g/hide-stitch.jpg
g/horo-caseback.jpg
g/horo-dial.jpg
g/ink-flash.jpg
g/ink-studio.jpg
g/ink-work.jpg
g/iron-chalk.jpg
g/iron-lift.jpg
g/iron-rack.jpg
g/lather-make.jpg
g/lather-shelf.jpg
g/lather-soap.jpg
g/ledger-calm.jpg
g/lens-camera.jpg
g/lens-contact.jpg
g/lens-portrait.jpg
g/loaf-crumb.jpg
g/loaf-oven.jpg
g/loaf-shelf.jpg
g/lume-bench.jpg
g/lume-ring.jpg
g/malt-glass.jpg
g/malt-grain.jpg
g/malt-tank.jpg
g/mane-chair.jpg
g/mane-cut.jpg
g/mane-style.jpg
g/mono-dusk.jpg
g/mono-interior.jpg
g/nib-inks.jpg
g/nib-paper.jpg
g/nib-write.jpg
g/noct-cellar.jpg
g/noct-pour.jpg
g/phantom-cabin.jpg
g/phantom-rear.jpg
g/plat-chef.jpg
g/plat-dish.jpg
g/plat-room.jpg
g/pour-bar.jpg
g/pour-glass.jpg
g/pour-make.jpg
g/roast-beans.jpg
g/roast-pour.jpg
g/selvedge-fade.jpg
g/selvedge-jean.jpg
g/selvedge-loom.jpg
g/sol-panel.jpg
g/sol-roof.jpg
g/spice-grind.jpg
g/spice-jars.jpg
g/spice-scoop.jpg
g/spine-read.jpg
g/spine-shelf.jpg
g/spine-stack.jpg
g/steep-garden.jpg
g/steep-leaf.jpg
g/steep-pour.jpg
g/stem-arrange.jpg
g/stem-bouquet.jpg
g/stem-shop.jpg
g/stride-detail.jpg
g/stride-road.jpg
g/stride-run.jpg
g/swell-rack.jpg
g/swell-shape.jpg
g/swell-wave.jpg
g/thread-cloth.jpg
g/thread-detail.jpg
g/thread-fitting.jpg
g/tide-shore.jpg
g/tide-swim.jpg
g/velo-braze.jpg
g/velo-frame.jpg
g/velo-ride.jpg
g/vessel-fabric.jpg
g/vessel-look.jpg
g/wax-crate.jpg
g/wax-shop.jpg
g/wax-spin.jpg
g/wick-lit.jpg
g/wick-pour.jpg
g/wick-shelf.jpg
grove-hero.mp4
grove.jpg
haven-hero.mp4
haven.jpg
hide-hero.mp4
hide.jpg
horologe-hero.mp4
horologe.jpg
ink-hero.mp4
ink.jpg
iron-hero.mp4
iron.jpg
lather-hero.mp4
lather.jpg
ledger-hero.mp4
ledger.jpg
lens-hero.mp4
lens.jpg
loaf-hero.mp4
loaf.jpg
lume-hero.mp4
lume.jpg
malt-hero.mp4
malt.jpg
mane-hero.mp4
mane.jpg
mono-hero.mp4
mono.jpg
nib-hero.mp4
nib.jpg
noct-hero.jpg
noct-hero.mp4
phantom-hero.mp4
phantom.jpg
plat-hero.mp4
plat.jpg
pour-hero.mp4
pour.jpg
roast-hero.mp4
roast.jpg
selvedge-hero.mp4
selvedge.jpg
sillage.jpg
sol-hero.jpg
sol-hero.mp4
spice-hero.mp4
spice.jpg
spine-hero.mp4
spine.jpg
steep-hero.mp4
steep.jpg
stem-hero.mp4
stem.jpg
stride-hero.mp4
stride.jpg
swell-hero.mp4
swell.jpg
thread-hero.mp4
thread.jpg
tide-hero.jpg
tide-hero.mp4
velo-hero.mp4
velo.jpg
vessel-hero.mp4
vessel.jpg
veu.jpg
wax-hero.mp4
wax.jpg
wick-hero.mp4
wick.jpg

codex
# Арт-дирекционный диагноз

Проблема не в повторном использовании компонентов, а в том, что `ProSite` повторно использует одну и ту же драматургию:

```text
video → wash → header → bottom-left copy
     → statement → split/gallery → stats/quote → centered CTA
```

Палитра и контент меняются, но силуэт страницы остаётся прежним. Причём часть bespoke-сайтов повторяет тот же hero-паттерн, хотя внутренние секции у них разнообразнее.

Новая система должна варьировать не декор, а пять структурных параметров:

1. Геометрию первого экрана.
2. Роль медиа: фон, объект, окно, лента, макро или доказательство.
3. Отношение заголовка к объекту.
4. Навигационный каркас.
5. Переход hero → следующая секция.

Общее правило: у каждого сайта один доминирующий объект, один визуальный вопрос и один motion-payoff. Видео становится одним из материалов, а не обязательной подложкой.

---

# 1. Восемь hero-архетипов

## H1. Gallery Horizon — центрированный editorial + лента

Для архитектуры, интерьеров, флористики, hospitality, мебели, фотографии.

**Композиция**

- Светлый или бумажный фон.
- Header высотой 48–64 px: знак слева, 1–2 служебных действия справа; без общей nav-пилюли.
- Заголовок центрирован в верхних 42–48% экрана.
- Под заголовком — горизонтальная лента из 4–6 вертикальных/квадратных кадров.
- Лента обрезана слева и справа viewport’ом.
- Под ней — микротекст и CTA, разнесённые по краям.

```text
brand                                      enquire
                    EYEBROW
              LARGE CENTERED TITLE
                   short line

 [cropped] [image] [image] [image] [image] [cropped]

 short proof                               view work
```

**Глубина**

Три уровня: статичная типографика → лента → выбранная карточка, слегка выходящая вперёд через `scale`, `translateY` и тень.

**Типографика**

- Editorial serif: Instrument Serif / Source Serif 4.
- UI: Manrope или Inter.
- H1: `clamp(54px, 7vw, 112px)`, 400, line-height `.88–.94`.
- Без обязательного italic; выразительность строится центровкой и переносами.

**Motion-payoff**

Движение курсора слегка сдвигает всю ленту в противоположную сторону; активный кадр расширяется на 8–12%. На scroll лента медленно закрывает нижний край заголовка.

**Незавершённость**

Первая и последняя карточки обрезаны viewport’ом; нижние 10–15% ленты уходят в следующую секцию.

**Mobile**

Две видимые карточки, горизонтальный native scroll и scroll-snap. Никакой зависимости от hover.

---

## H2. Edge Arrival — объект входит с края

Для недвижимости, транспорта, outdoor, фитнеса, услуг с физическим пространством.

**Композиция**

- Медиа занимает примерно 58–65% ширины и входит снизу-слева либо снизу-справа.
- Заголовок располагается в свободном верхнем квадранте на противоположной стороне.
- Header не растягивается через всю сцену: логотип над объектом, компактное меню на стороне текста.
- CTA находится рядом с текстом, не поверх объекта.
- Низ hero перекрывает полупрозрачная proof-card.

```text
brand               LARGE OFFSET HEADLINE       menu
                    short proposition
                    CTA

      OBJECT ENTERING FROM EDGE
      OBJECT ENTERING             [proof card]
```

**Глубина**

Фон с очень слабым `ShaderBg`, изолированный объект/кадр и стеклянная proof-card. Если прозрачного cutout нет, объект создаётся через `clip-path` или маску прямоугольного медиа.

**Типографика**

- Source Serif 4 + IBM Plex Sans.
- H1: `clamp(52px, 6.2vw, 104px)`, 400.
- UI и доказательства — нейтральный sans, 12–15 px.
- Заголовок не italic, максимум одно акцентное слово.

**Motion-payoff**

При первом scroll объект поднимается на 6–10vh, proof-card входит навстречу и фиксируется на его краю. Допустим лёгкий `DepthParallax`.

**Незавершённость**

Нижняя часть объекта не помещается в hero; proof-card продолжается в следующем viewport.

---

## H3. Hard Split — типографика и изображение 50/50

Для консалтинга, SaaS, обучения, сервисных компаний, мастерских.

**Композиция**

- Две полноценные панели без общего фонового видео.
- Слева: типографический блок, бренд, promise, CTA и индекс.
- Справа: видео или poster в рамке без скругления либо с одним фирменным радиусом.
- Navigation вертикальная или расположена по верхней кромке правой панели.
- Можно инвертировать стороны, но не на соседних страницах.

```text
┌────────────────────┬────────────────────┐
│ brand          01  │ menu / menu / CTA  │
│                    │                    │
│ LARGE              │      MEDIA         │
│ TYPE               │                    │
│                    │                    │
│ copy + CTA         │ caption        ↘   │
└────────────────────┴────────────────────┘
```

**Глубина**

Почти плоская композиция. Пространство появляется за счёт несовпадения границ: медиа на 24–48 px выходит за split либо пересекает разделитель.

**Типографика**

- Archivo Black/Archivo Expanded + IBM Plex Mono.
- H1: `clamp(58px, 8vw, 132px)`, 700–800, line-height `.82–.9`.
- Uppercase допустим только здесь.
- Подписи — mono 10–12 px с широким tracking.

**Motion-payoff**

На hover/drag граница панелей смещается с 50/50 до 38/62; медиа отвечает `ShaderImage`-рипплом. На mobile — tap переключает media/copy либо панели идут последовательно.

**Незавершённость**

Огромное последнее слово обрезано разделителем; изображение уходит ниже fold.

---

## H4. Type Collision — гигантский текст пересекает медиа

Для fashion, музыки, дизайна, digital studio, авто, lifestyle.

**Композиция**

- Центральный объект занимает 35–50% экрана.
- H1 растянут почти на всю ширину и проходит одновременно за объектом и перед ним.
- Подзаголовок и CTA — микроскопические опорные элементы по нижним углам.
- Header максимально тонкий: знак, 2–3 текстовые ссылки, CTA.
- Нужны два текстовых слоя одного заголовка: back и front-mask.

```text
                minimal navigation

      GIANT TY[ CENTRAL OBJECT ]PE
       back layer     front layer

micro-copy                              CTA
```

**Глубина**

Фон → задний слой H1 → объект → передняя часть H1 → UI. Это самый выразительный способ получить 3D без настоящей сцены.

**Типографика**

- Cormorant Garamond Display или Bodoni Moda для арт/fashion.
- Для digital — Archivo Black.
- H1: `clamp(76px, 13vw, 220px)`, line-height `.72–.82`.
- Italic разрешён только для одного слова или одной строки.

**Motion-payoff**

Курсор наклоняет объект на 1–2° и разделяет передний/задний текстовые слои на 8–16 px. На scroll объект проходит сквозь baseline заголовка и открывает следующий экран.

**Незавершённость**

Первая/последняя буква и часть объекта выходят за боковые или нижнюю границы viewport.

---

## H5. Regime Shift — светлый hero → тёмная система

Для security, fintech, health-tech, сложных B2B-продуктов, лабораторий.

**Композиция**

- Первый кадр светлый, строгий, почти печатный.
- Слева индекс/маркер системы; справа сверху короткий headline.
- В центре — один чёрно-белый объект или схема.
- Нижние 15–20vh уже показывают начало тёмной следующей секции.
- Header меняет цвет при пересечении границы режима.

**Глубина**

Не параллакс, а контраст режимов: чистая бумага → глубокий чёрный → монохромная сетка/растр.

**Типографика**

- IBM Plex Sans + IBM Plex Mono.
- H1: `clamp(48px, 6vw, 96px)`, 500–600.
- Системные метки: mono uppercase, 10–12 px.
- Никакого ornamental serif.

**Motion-payoff**

На scroll светлый слой «сканируется» горизонтальной линией; изображение превращается в halftone/grid, а фон переключается в тёмный режим. Один переход, не постоянный шум.

**Незавершённость**

Тёмная секция уже видна снизу; крупный индекс вроде `01/04` наполовину срезан боковой границей.

---

## H6. Portal Frame — окно внутри пространства

Для relocation, travel, недвижимости, wellness, платформ, обещающих переход или выбор.

**Композиция**

- Большой спокойный фон: пейзаж, интерьер либо `ShaderBg`.
- В центре — вертикальная или почти квадратная рамка 28–42vw.
- Рамка показывает альтернативное состояние того же мира: другой кадр, zoom, видео или цветовой режим.
- Headline расположен вне окна, обычно в нижней трети.
- Navigation минимальна и визуально привязана к рамке.

**Глубина**

Фон движется медленно, содержимое окна — немного быстрее; рамка имеет лёгкое стекло/рефракцию. Не использовать одновременно сильный parallax и shader ripple.

**Типографика**

- Manrope + Source Serif 4 либо только Manrope.
- H1: `clamp(50px, 6.5vw, 106px)`, 500, плотный tracking.
- Текст до 5–7 слов.

**Motion-payoff**

По drag или движению курсора окно перемещается на 6–10vw, показывая «до/после» или альтернативный слой. На scroll оно расширяется до full-bleed и становится следующей секцией.

**Незавершённость**

Рамка снизу выходит за fold либо её содержимое явно продолжается за собственными границами.

---

## H7. Product Theatre — макрообъект перед человеком/контекстом

Для украшений, skincare, еды, напитков, инструментов, craft-продуктов.

**Композиция**

- Фон светлый или однотонный.
- Контекстный персонаж/сцена находится во втором плане.
- Продукт или рука с продуктом занимает 35–55% кадра и входит с переднего края.
- H1 не лежит снизу-слева: либо вертикально вдоль края, либо в отдельной колонке, либо по центру за продуктом.
- Rational proof появляется уже у fold: материал, ручная работа, срок изготовления.

**Глубина**

Размытие второго плана, резкий продукт, лёгкая тень и перекрытие типографики. Если исходное видео уже содержит продукт, использовать контейнер с нестандартным `clip-path`, а не full bleed.

**Типографика**

- Cormorant Garamond Display + Manrope.
- H1: `clamp(54px, 7vw, 118px)`, 400.
- Proof: Manrope 500, 12–14 px.
- Serif применяется как fashion voice, не как общий шрифт сайта.

**Motion-payoff**

Продукт реагирует на курсор небольшим поворотом/бликом; затем macro плавно раскрывается в блок материала или процесса. Для `ShaderImage` — очень низкая амплитуда.

**Незавершённость**

Рука, бутылка, ткань или инструмент обрезаны краем кадра; следующий proof-блок виден снизу.

---

## H8. Index Stage — каталог как hero

Для магазинов, портфолио, меню, коллекций, услуг с несколькими направлениями.

**Композиция**

- Hero одновременно является навигацией.
- Слева или по центру — 4–6 крупных строк каталога.
- Справа — одна hover-preview область.
- Brand и CTA закреплены в противоположных углах.
- Заголовок заменяется короткой вводной строкой; визуальную массу создают пункты списка.

```text
brand                       preview image
small proposition           preview image

01  CATEGORY ONE            preview image
02  CATEGORY TWO
03  CATEGORY THREE

location / note                        CTA
```

**Глубина**

Список остаётся плоским; preview движется поверх него, меняет размеры и иногда перекрывает строки.

**Типографика**

- Archivo/Manrope + IBM Plex Mono.
- Пункты: `clamp(38px, 5.5vw, 88px)`, 500–700.
- Индексы и metadata: mono.
- Serif не нужен.

**Motion-payoff**

Hover/focus меняет preview и смещает активную строку на 20–32 px. На scroll выбранный preview расширяется и становится первой контентной секцией.

**Незавершённость**

Последний пункт каталога частично скрыт fold’ом; preview обрезан правым краем.

---

# 2. Новая библиотека секций

Нужно добавить не «ещё один вид карточек», а секции с различной логикой чтения.

## S1. `rail` — горизонтальная медиа-лента

- 3–7 элементов переменной ширины.
- Первая карточка начинается до внутреннего контейнера, последняя уходит за viewport.
- `drag`, wheel-to-horizontal или native overflow.
- Опции: `snap`, `cursorParallax`, `activeExpand`.
- Подходит после Gallery Horizon и Product Theatre.

## S2. `sticky-switch` — смена режима

- Sticky-сцена 180–260vh.
- Слева фиксированный headline, справа 2–4 состояния.
- Каждый шаг меняет media, palette и короткий proof.
- Не блокирует scroll; sticky отключается на mobile.
- Лучшее применение: process, before/after, threat/solution.

## S3. `index-preview` — список с hover-preview

- 4–8 строк, номер + название + metadata.
- Preview следует за активной строкой или закреплён справа.
- Keyboard focus должен давать тот же результат, что hover.
- На mobile preview становится inline под выбранной строкой.

## S4. `macro-detail` — общий объект + материальные детали

- Большое изображение занимает 60–70%.
- На свободном поле 2–4 аннотации с линиями или индексами.
- При выборе аннотации изображение меняется на gallery macro asset.
- Для craft, продукта, food, beauty, одежды.

## S5. `compare` — до/после или A/B

- Один общий viewport с draggable divider.
- Поддерживает image/image, poster/video и light/dark.
- Divider имеет понятный label и keyboard control.
- На mobile fallback — две последовательные панели.

## S6. `proof-overlay` — визуал с доказательной карточкой

- Full-width медиа высотой 70–90vh.
- Одна карточка 35–45% ширины пересекает нижний край.
- Внутри: headline, 2–3 facts, CTA.
- Следующая секция начинается под карточкой, а не после пустого отступа.

## S7. `ticker-band` — типографическая полоса

- Высота 12–24vh.
- Одна короткая смысловая фраза, перечень материалов или услуг.
- Не бесконечный «бегущий шум»: один медленный цикл или движение только при scroll.
- Между повторениями — знак, номер или миниатюра.

## S8. `spec-sheet` — печатная таблица характеристик

- Две колонки: параметр / значение.
- 5–10 строк, строгие dividers.
- Слева крупный индекс изделия или услуги.
- Может резко менять режим страницы на белый/чёрный.
- Хорошо работает после эмоционального hero.

## S9. `timeline-spine` — вертикальный процесс

- Узкая центральная линия или левый spine.
- 3–6 этапов разной высоты.
- У каждого этапа один media fragment, а не одинаковая карточка.
- Активный индекс закреплён; прогресс заполняет линию.

## S10. `number-field` — поле одного большого числа

- Не ряд из трёх одинаковых stats.
- Одно число занимает 40–70vw.
- Пояснение, источник и вторичный показатель расположены на противоположных краях.
- На scroll число меняется один раз или раскрывает единицу измерения.

## S11. `pull-quote-bleed` — цитата как графическая форма

- Цитата занимает полный экран, 5–14 слов.
- Одно слово перекрывает узкое изображение либо вырезано media-fill.
- Автор и контекст — микротекст в углу.
- Это смена ритма, не стандартный testimonial.

## S12. `contact-sheet` — редакционный лист

- Асимметричная сетка 6–12 изображений, часть — миниатюры.
- Индексы, даты, материалы, координаты или названия.
- Hover увеличивает один кадр без перестройки всей сетки.
- Для портфолио, меню, архивов, процесса и коллекций.

### Правило сборки страницы

Каждая Pro-страница получает:

```text
hero
→ 1 section, разрешающую hero-метафору
→ 1 спокойную proof-section
→ 1 смену режима/масштаба
→ CTA, возвращающий мотив hero
```

Не более одной sticky-секции и одной горизонтальной механики на страницу. Старые `idea`, `split`, `gallery`, `stats` остаются допустимы, но не должны составлять всю страницу без нового структурного блока.

---

# 3. Четыре типографические личности

Шрифты следует самохостить как WOFF2 и выдавать через CSS variables на уровне страницы. Для каждого семейства загружать только реально используемые начертания.

## T1. Quiet Editorial

Для Gallery Horizon, Edge Arrival, архитектуры, hospitality, фотографии.

```css
--vh-display: "Instrument Serif", Georgia, serif;
--vh-text: "Manrope", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 400 normal; italic максимум как редкий акцент.
- H1 tracking: `-.025em`.
- Body: 400–500.
- Много воздуха, узкие строки, sentence case.

## T2. Industrial Grotesk

Для Hard Split, Index Stage, спорта, mobility, SaaS, мастерских.

```css
--vh-display: "Archivo", "Arial Narrow", Arial, sans-serif;
--vh-text: "IBM Plex Sans", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 700/800; по возможности variable width.
- H1 tracking: `-.045em`.
- Body: 400.
- Индексы и параметры — mono.
- Italic отсутствует полностью.

## T3. Fashion Contrast

Для Type Collision и Product Theatre.

```css
--vh-display: "Cormorant Garamond", "Times New Roman", serif;
--vh-text: "Manrope", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 400 normal + 400 italic.
- Очень крупный размер и tight leading.
- Italic только в одном композиционном месте.
- Навигация должна быть sans, чтобы страница не превращалась в имитацию журнала.

## T4. Technical Signal

Для Regime Shift, security, finance, science, health-tech.

```css
--vh-display: "IBM Plex Sans", Arial, sans-serif;
--vh-text: "IBM Plex Sans", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- H1: 500/600, не ultra-bold.
- Labels: mono uppercase, tracking `.08–.14em`.
- Числа — tabular.
- Иерархия строится контрастом масштаба и сеткой, а не сменой serif/sans.

### Изменение токенов

Не привязывать компоненты напрямую к `--vh-serif`:

```css
.pro {
  --vh-display: var(--vh-serif);
  --vh-text: var(--vh-sans);
  --vh-label: var(--vh-mono);
}

.pro[data-type="editorial"] { /* T1 */ }
.pro[data-type="grotesk"]   { /* T2 */ }
.pro[data-type="fashion"]   { /* T3 */ }
.pro[data-type="signal"]    { /* T4 */ }
```

Старые vars остаются fallback, поэтому миграция безопасна.

---

# 4. Принцип маппинга 50 сайтов

Распределять архетипы нужно не по slug и не только по нише, а по матрице из четырёх осей.

## Ось A: тип доминирующего доказательства

- Пространство: Gallery Horizon / Edge Arrival.
- Физический продукт: Product Theatre / Portal Frame.
- Система или услуга: Hard Split / Regime Shift.
- Каталог или портфолио: Index Stage.
- Сильный визуальный бренд: Type Collision.

## Ось B: энергетика

- Calm: H1, H2.
- Rational: H3, H5, H8.
- Expressive: H4, H7.
- Transformational: H6.

## Ось C: media suitability

Перед назначением проверить poster и первый meaningful frame видео:

- Есть сильный изолированный объект → H2/H4/H7.
- Есть серия равносильных изображений → H1/H8.
- Есть широкий environment → H6.
- Видео слишком композиционно занято → H3, где оно ограничено панелью.
- Медиа слабое → H5, где графическую массу создают сетка и типографика.

## Ось D: ритм каталога

В итоговом порядке 50 карточек:

- Один архетип не повторяется ближе чем через 3 позиции.
- Одна типографическая личность не повторяется более двух раз подряд.
- Два соседних сайта одной ниши обязаны различаться минимум по трём признакам:

```text
hero geometry
type personality
light/dark opening
media role
first section mechanic
```

- Доля любого архетипа: минимум 4, максимум 8 сайтов из 50.
- Full-bleed video hero — максимум 20% всей витрины.
- Bottom-left hero copy — максимум 3–4 сайта и только как осознанный bespoke-приём.

Практически это можно оформить как таблицу:

```ts
type Assignment = {
  slug: string;
  nicheCluster: string;
  hero: HeroArchetype;
  type: TypePersonality;
  opening: "light" | "dark" | "image" | "split";
  mediaRole: "object" | "window" | "strip" | "panel" | "background";
  firstModule: ProBlock["t"];
};
```

Затем прогнать простой валидатор, который отмечает повтор архетипа, типографики или media role у соседей. Bespoke-сайты тоже внести в эту таблицу как уже назначенные ограничения — иначе Pro-сайты могут случайно повторить их силуэт.

---

# 5. Безопасное расширение `ProSite`

## Шаг 1. Ввести discriminated union для hero

```tsx
type HeroMedia = {
  poster?: string;
  video?: string;
  image?: string;
  objectFit?: "cover" | "contain";
  focal?: `${number}% ${number}%`;
};

type HeroBase = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  media?: HeroMedia;
  navStyle?: "inline" | "minimal" | "vertical" | "corners";
  align?: "left" | "center" | "right";
  motion?: "none" | "parallax" | "cursor-shift" | "expand" | "mode-shift";
};

type ProHero =
  | (HeroBase & {
      archetype: "legacy";
    })
  | (HeroBase & {
      archetype: "gallery-horizon";
      strip: { img: string; alt?: string }[];
      activeExpand?: boolean;
    })
  | (HeroBase & {
      archetype: "edge-arrival";
      edge?: "left" | "right";
      proof?: { value: string; label: string };
    })
  | (HeroBase & {
      archetype: "hard-split";
      mediaSide?: "left" | "right";
      ratio?: "50/50" | "40/60" | "60/40";
    })
  | (HeroBase & {
      archetype: "type-collision";
      objectLayer?: "video" | "image";
      overlapWord?: string;
    })
  | (HeroBase & {
      archetype: "regime-shift";
      from: "light" | "dark";
      to: "light" | "dark";
      shader?: { mode: BgMode; palette: [string, string, string] };
    })
  | (HeroBase & {
      archetype: "portal-frame";
      frame?: "portrait" | "square" | "landscape";
      portalMedia?: HeroMedia;
    })
  | (HeroBase & {
      archetype: "product-theatre";
      foreground?: HeroMedia;
      proof?: { value: string; label: string }[];
    })
  | (HeroBase & {
      archetype: "index-stage";
      items: { label: string; img: string; meta?: string }[];
    });
```

`legacy` должен быть реальным вариантом union, а не исключением внутри JSX. Это позволит постепенно мигрировать данные и тестировать новый renderer отдельно.

## Шаг 2. Сохранить старые поля на время миграции

```tsx
type Pro = {
  slug: string;
  theme: string;
  brand: string;
  nav: string[];
  typography?: TypePersonality;
  hero?: ProHero;

  /** legacy fallback */
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;

  blocks: ProBlock[];
  tagline: string;
  legal: string;
};
```

Нормализатор превращает старые данные в новый формат:

```tsx
function resolveHero(data: Pro): ProHero {
  if (data.hero) return data.hero;

  return {
    archetype: "legacy",
    eyebrow: data.eyebrow,
    title: data.title,
    sub: data.sub,
    media: {
      video: `/uploads/1/hooks/sites/${data.slug}-hero.mp4`,
      poster: `/uploads/1/hooks/sites/${data.slug}.jpg`,
    },
  };
}
```

Так все существующие 34 записи продолжают работать без массового изменения реестра.

## Шаг 3. Вынести renderer hero

```tsx
function ProHeroView({
  hero,
  site,
}: {
  hero: ProHero;
  site: Pick<Pro, "slug" | "brand" | "nav">;
}) {
  switch (hero.archetype) {
    case "legacy":
      return <LegacyHero hero={hero} site={site} />;
    case "gallery-horizon":
      return <GalleryHorizonHero hero={hero} site={site} />;
    case "edge-arrival":
      return <EdgeArrivalHero hero={hero} site={site} />;
    // exhaustive cases
    default:
      return assertNever(hero);
  }
}
```

`ProSite` после этого становится shell-компонентом:

```tsx
function ProSite({ data }: { data: Pro }) {
  const hero = resolveHero(data);

  return (
    <div
      className={`vh-site pro pro-${data.theme}`}
      data-hero={hero.archetype}
      data-type={data.typography ?? "editorial"}
    >
      <ProHeroView hero={hero} site={data} />

      <main>
        {data.blocks.map((block, index) => (
          <ProBlockView
            key={block.id ?? `${block.t}-${index}`}
            b={block}
          />
        ))}
      </main>

      <ProFooter data={data} />
    </div>
  );
}
```

## Шаг 4. Расширить `ProBlock` небольшими независимыми union-ветками

```tsx
type ProBlockBase = {
  id?: string;
  theme?: "inherit" | "light" | "dark" | "accent";
  reveal?: "up" | "zoom" | "mask" | "none";
};

type ProBlock =
  | ExistingProBlock
  | (ProBlockBase & {
      t: "rail";
      head?: React.ReactNode;
      items: { img: string; cap?: string; ratio?: string }[];
      behavior?: "drag" | "scroll" | "cursor";
    })
  | (ProBlockBase & {
      t: "sticky-switch";
      intro?: React.ReactNode;
      steps: {
        title: React.ReactNode;
        body?: string;
        media: string;
        theme?: "light" | "dark";
      }[];
    })
  | (ProBlockBase & {
      t: "index-preview";
      items: { n?: string; title: string; meta?: string; img: string }[];
    })
  | (ProBlockBase & {
      t: "macro-detail";
      image: string;
      details: { label: string; body?: string; img?: string }[];
    })
  | (ProBlockBase & {
      t: "compare";
      before: { img: string; label: string };
      after: { img: string; label: string };
    })
  | (ProBlockBase & {
      t: "spec-sheet";
      head?: React.ReactNode;
      rows: [string, string][];
    })
  | (ProBlockBase & {
      t: "timeline-spine";
      items: { h: string; p: string; img?: string }[];
    })
  | (ProBlockBase & {
      t: "number-field";
      value: string;
      label: string;
      note?: string;
    })
  | (ProBlockBase & {
      t: "pull-quote-bleed";
      text: React.ReactNode;
      cite?: string;
      img?: string;
    })
  | (ProBlockBase & {
      t: "contact-sheet";
      items: { img: string; cap?: string; size?: "s" | "m" | "l" }[];
    });
```

Не добавлять универсальный тип вроде `{ t: "custom"; variant: string; data: any }`: он быстро уничтожит type safety и превратит реестр в набор невалидируемых исключений.

## Шаг 5. Организация CSS

Не продолжать наращивать один плоский `.pb-*` namespace. Разделить систему:

```text
.pb-shell-*       общие header/footer/button/media primitives
.ph-*             hero primitives
.ph--gallery-*    конкретный hero archetype
.ph--edge-*       конкретный hero archetype
.pm-*             новые page modules
```

Пример root selectors:

```css
.pro[data-hero="hard-split"] { /* archetype tokens */ }
.pro[data-type="signal"] { /* typography tokens */ }

.ph { min-height: 100svh; }
.pm { position: relative; }
```

Использовать `100svh`, а не только `100vh`. Для каждого hero сразу предусмотреть:

```css
@media (max-width: 900px) { ... }
@media (prefers-reduced-motion: reduce) { ... }
```

Reduced-motion должен выключать трансформацию, но сохранять перекрытия, crop и визуальный вопрос.

## Шаг 6. Миграция без big bang

1. Ввести `ProHero`, `resolveHero`, `LegacyHero`, не меняя визуал.
2. Добавить типографические tokens, сохранив fallback на старые vars.
3. Реализовать сначала три максимально разные формы:
   - Gallery Horizon;
   - Hard Split;
   - Product Theatre.
4. Перенести по одному контрастному сайту на каждый вариант.
5. Добавить остальные hero только после проверки desktop/mobile/reduced-motion.
6. Реализовать сначала четыре секции с наибольшим композиционным выигрышем:
   - `rail`;
   - `index-preview`;
   - `sticky-switch`;
   - `spec-sheet`.
7. Переносить Pro-сайты пакетами по 4–6, проверяя соседство во всей витрине.
8. Оставить `legacy` до полной миграции; удалить старые `eyebrow/title/sub` только отдельным cleanup-коммитом.

---

# Защитные правила системы

Добавить dev-only валидацию реестра:

```tsx
validateProRegistry(PRO, {
  maxSameHeroInRow: 1,
  maxSameTypographyInRow: 2,
  minBlocks: 3,
  maxStickyBlocks: 1,
  maxHorizontalBlocks: 1,
  requirePoster: true,
  requireMobileFallback: true,
});
```

Также полезно ловить:

- повторяющиеся блоки и данные — в текущем `botanic`, например, дважды добавлен один и тот же `stats`;
- hero без meaningful poster;
- больше одного autoplay-видео в первом viewport;
- `index-preview` без focus-поведения;
- compare без подписей;
- слишком длинный headline для выбранного архетипа;
- последовательность из одних старых `idea/split/gallery/cta`.

Главный критерий готовности: если отключить цвет, заменить все изображения серыми прямоугольниками и уменьшить motion до нуля, силуэты соседних сайтов всё равно должны оставаться узнаваемо разными. Именно этого сейчас не хватает `ProSite`. Файлы не изменялись.
tokens used
74 933
# Арт-дирекционный диагноз

Проблема не в повторном использовании компонентов, а в том, что `ProSite` повторно использует одну и ту же драматургию:

```text
video → wash → header → bottom-left copy
     → statement → split/gallery → stats/quote → centered CTA
```

Палитра и контент меняются, но силуэт страницы остаётся прежним. Причём часть bespoke-сайтов повторяет тот же hero-паттерн, хотя внутренние секции у них разнообразнее.

Новая система должна варьировать не декор, а пять структурных параметров:

1. Геометрию первого экрана.
2. Роль медиа: фон, объект, окно, лента, макро или доказательство.
3. Отношение заголовка к объекту.
4. Навигационный каркас.
5. Переход hero → следующая секция.

Общее правило: у каждого сайта один доминирующий объект, один визуальный вопрос и один motion-payoff. Видео становится одним из материалов, а не обязательной подложкой.

---

# 1. Восемь hero-архетипов

## H1. Gallery Horizon — центрированный editorial + лента

Для архитектуры, интерьеров, флористики, hospitality, мебели, фотографии.

**Композиция**

- Светлый или бумажный фон.
- Header высотой 48–64 px: знак слева, 1–2 служебных действия справа; без общей nav-пилюли.
- Заголовок центрирован в верхних 42–48% экрана.
- Под заголовком — горизонтальная лента из 4–6 вертикальных/квадратных кадров.
- Лента обрезана слева и справа viewport’ом.
- Под ней — микротекст и CTA, разнесённые по краям.

```text
brand                                      enquire
                    EYEBROW
              LARGE CENTERED TITLE
                   short line

 [cropped] [image] [image] [image] [image] [cropped]

 short proof                               view work
```

**Глубина**

Три уровня: статичная типографика → лента → выбранная карточка, слегка выходящая вперёд через `scale`, `translateY` и тень.

**Типографика**

- Editorial serif: Instrument Serif / Source Serif 4.
- UI: Manrope или Inter.
- H1: `clamp(54px, 7vw, 112px)`, 400, line-height `.88–.94`.
- Без обязательного italic; выразительность строится центровкой и переносами.

**Motion-payoff**

Движение курсора слегка сдвигает всю ленту в противоположную сторону; активный кадр расширяется на 8–12%. На scroll лента медленно закрывает нижний край заголовка.

**Незавершённость**

Первая и последняя карточки обрезаны viewport’ом; нижние 10–15% ленты уходят в следующую секцию.

**Mobile**

Две видимые карточки, горизонтальный native scroll и scroll-snap. Никакой зависимости от hover.

---

## H2. Edge Arrival — объект входит с края

Для недвижимости, транспорта, outdoor, фитнеса, услуг с физическим пространством.

**Композиция**

- Медиа занимает примерно 58–65% ширины и входит снизу-слева либо снизу-справа.
- Заголовок располагается в свободном верхнем квадранте на противоположной стороне.
- Header не растягивается через всю сцену: логотип над объектом, компактное меню на стороне текста.
- CTA находится рядом с текстом, не поверх объекта.
- Низ hero перекрывает полупрозрачная proof-card.

```text
brand               LARGE OFFSET HEADLINE       menu
                    short proposition
                    CTA

      OBJECT ENTERING FROM EDGE
      OBJECT ENTERING             [proof card]
```

**Глубина**

Фон с очень слабым `ShaderBg`, изолированный объект/кадр и стеклянная proof-card. Если прозрачного cutout нет, объект создаётся через `clip-path` или маску прямоугольного медиа.

**Типографика**

- Source Serif 4 + IBM Plex Sans.
- H1: `clamp(52px, 6.2vw, 104px)`, 400.
- UI и доказательства — нейтральный sans, 12–15 px.
- Заголовок не italic, максимум одно акцентное слово.

**Motion-payoff**

При первом scroll объект поднимается на 6–10vh, proof-card входит навстречу и фиксируется на его краю. Допустим лёгкий `DepthParallax`.

**Незавершённость**

Нижняя часть объекта не помещается в hero; proof-card продолжается в следующем viewport.

---

## H3. Hard Split — типографика и изображение 50/50

Для консалтинга, SaaS, обучения, сервисных компаний, мастерских.

**Композиция**

- Две полноценные панели без общего фонового видео.
- Слева: типографический блок, бренд, promise, CTA и индекс.
- Справа: видео или poster в рамке без скругления либо с одним фирменным радиусом.
- Navigation вертикальная или расположена по верхней кромке правой панели.
- Можно инвертировать стороны, но не на соседних страницах.

```text
┌────────────────────┬────────────────────┐
│ brand          01  │ menu / menu / CTA  │
│                    │                    │
│ LARGE              │      MEDIA         │
│ TYPE               │                    │
│                    │                    │
│ copy + CTA         │ caption        ↘   │
└────────────────────┴────────────────────┘
```

**Глубина**

Почти плоская композиция. Пространство появляется за счёт несовпадения границ: медиа на 24–48 px выходит за split либо пересекает разделитель.

**Типографика**

- Archivo Black/Archivo Expanded + IBM Plex Mono.
- H1: `clamp(58px, 8vw, 132px)`, 700–800, line-height `.82–.9`.
- Uppercase допустим только здесь.
- Подписи — mono 10–12 px с широким tracking.

**Motion-payoff**

На hover/drag граница панелей смещается с 50/50 до 38/62; медиа отвечает `ShaderImage`-рипплом. На mobile — tap переключает media/copy либо панели идут последовательно.

**Незавершённость**

Огромное последнее слово обрезано разделителем; изображение уходит ниже fold.

---

## H4. Type Collision — гигантский текст пересекает медиа

Для fashion, музыки, дизайна, digital studio, авто, lifestyle.

**Композиция**

- Центральный объект занимает 35–50% экрана.
- H1 растянут почти на всю ширину и проходит одновременно за объектом и перед ним.
- Подзаголовок и CTA — микроскопические опорные элементы по нижним углам.
- Header максимально тонкий: знак, 2–3 текстовые ссылки, CTA.
- Нужны два текстовых слоя одного заголовка: back и front-mask.

```text
                minimal navigation

      GIANT TY[ CENTRAL OBJECT ]PE
       back layer     front layer

micro-copy                              CTA
```

**Глубина**

Фон → задний слой H1 → объект → передняя часть H1 → UI. Это самый выразительный способ получить 3D без настоящей сцены.

**Типографика**

- Cormorant Garamond Display или Bodoni Moda для арт/fashion.
- Для digital — Archivo Black.
- H1: `clamp(76px, 13vw, 220px)`, line-height `.72–.82`.
- Italic разрешён только для одного слова или одной строки.

**Motion-payoff**

Курсор наклоняет объект на 1–2° и разделяет передний/задний текстовые слои на 8–16 px. На scroll объект проходит сквозь baseline заголовка и открывает следующий экран.

**Незавершённость**

Первая/последняя буква и часть объекта выходят за боковые или нижнюю границы viewport.

---

## H5. Regime Shift — светлый hero → тёмная система

Для security, fintech, health-tech, сложных B2B-продуктов, лабораторий.

**Композиция**

- Первый кадр светлый, строгий, почти печатный.
- Слева индекс/маркер системы; справа сверху короткий headline.
- В центре — один чёрно-белый объект или схема.
- Нижние 15–20vh уже показывают начало тёмной следующей секции.
- Header меняет цвет при пересечении границы режима.

**Глубина**

Не параллакс, а контраст режимов: чистая бумага → глубокий чёрный → монохромная сетка/растр.

**Типографика**

- IBM Plex Sans + IBM Plex Mono.
- H1: `clamp(48px, 6vw, 96px)`, 500–600.
- Системные метки: mono uppercase, 10–12 px.
- Никакого ornamental serif.

**Motion-payoff**

На scroll светлый слой «сканируется» горизонтальной линией; изображение превращается в halftone/grid, а фон переключается в тёмный режим. Один переход, не постоянный шум.

**Незавершённость**

Тёмная секция уже видна снизу; крупный индекс вроде `01/04` наполовину срезан боковой границей.

---

## H6. Portal Frame — окно внутри пространства

Для relocation, travel, недвижимости, wellness, платформ, обещающих переход или выбор.

**Композиция**

- Большой спокойный фон: пейзаж, интерьер либо `ShaderBg`.
- В центре — вертикальная или почти квадратная рамка 28–42vw.
- Рамка показывает альтернативное состояние того же мира: другой кадр, zoom, видео или цветовой режим.
- Headline расположен вне окна, обычно в нижней трети.
- Navigation минимальна и визуально привязана к рамке.

**Глубина**

Фон движется медленно, содержимое окна — немного быстрее; рамка имеет лёгкое стекло/рефракцию. Не использовать одновременно сильный parallax и shader ripple.

**Типографика**

- Manrope + Source Serif 4 либо только Manrope.
- H1: `clamp(50px, 6.5vw, 106px)`, 500, плотный tracking.
- Текст до 5–7 слов.

**Motion-payoff**

По drag или движению курсора окно перемещается на 6–10vw, показывая «до/после» или альтернативный слой. На scroll оно расширяется до full-bleed и становится следующей секцией.

**Незавершённость**

Рамка снизу выходит за fold либо её содержимое явно продолжается за собственными границами.

---

## H7. Product Theatre — макрообъект перед человеком/контекстом

Для украшений, skincare, еды, напитков, инструментов, craft-продуктов.

**Композиция**

- Фон светлый или однотонный.
- Контекстный персонаж/сцена находится во втором плане.
- Продукт или рука с продуктом занимает 35–55% кадра и входит с переднего края.
- H1 не лежит снизу-слева: либо вертикально вдоль края, либо в отдельной колонке, либо по центру за продуктом.
- Rational proof появляется уже у fold: материал, ручная работа, срок изготовления.

**Глубина**

Размытие второго плана, резкий продукт, лёгкая тень и перекрытие типографики. Если исходное видео уже содержит продукт, использовать контейнер с нестандартным `clip-path`, а не full bleed.

**Типографика**

- Cormorant Garamond Display + Manrope.
- H1: `clamp(54px, 7vw, 118px)`, 400.
- Proof: Manrope 500, 12–14 px.
- Serif применяется как fashion voice, не как общий шрифт сайта.

**Motion-payoff**

Продукт реагирует на курсор небольшим поворотом/бликом; затем macro плавно раскрывается в блок материала или процесса. Для `ShaderImage` — очень низкая амплитуда.

**Незавершённость**

Рука, бутылка, ткань или инструмент обрезаны краем кадра; следующий proof-блок виден снизу.

---

## H8. Index Stage — каталог как hero

Для магазинов, портфолио, меню, коллекций, услуг с несколькими направлениями.

**Композиция**

- Hero одновременно является навигацией.
- Слева или по центру — 4–6 крупных строк каталога.
- Справа — одна hover-preview область.
- Brand и CTA закреплены в противоположных углах.
- Заголовок заменяется короткой вводной строкой; визуальную массу создают пункты списка.

```text
brand                       preview image
small proposition           preview image

01  CATEGORY ONE            preview image
02  CATEGORY TWO
03  CATEGORY THREE

location / note                        CTA
```

**Глубина**

Список остаётся плоским; preview движется поверх него, меняет размеры и иногда перекрывает строки.

**Типографика**

- Archivo/Manrope + IBM Plex Mono.
- Пункты: `clamp(38px, 5.5vw, 88px)`, 500–700.
- Индексы и metadata: mono.
- Serif не нужен.

**Motion-payoff**

Hover/focus меняет preview и смещает активную строку на 20–32 px. На scroll выбранный preview расширяется и становится первой контентной секцией.

**Незавершённость**

Последний пункт каталога частично скрыт fold’ом; preview обрезан правым краем.

---

# 2. Новая библиотека секций

Нужно добавить не «ещё один вид карточек», а секции с различной логикой чтения.

## S1. `rail` — горизонтальная медиа-лента

- 3–7 элементов переменной ширины.
- Первая карточка начинается до внутреннего контейнера, последняя уходит за viewport.
- `drag`, wheel-to-horizontal или native overflow.
- Опции: `snap`, `cursorParallax`, `activeExpand`.
- Подходит после Gallery Horizon и Product Theatre.

## S2. `sticky-switch` — смена режима

- Sticky-сцена 180–260vh.
- Слева фиксированный headline, справа 2–4 состояния.
- Каждый шаг меняет media, palette и короткий proof.
- Не блокирует scroll; sticky отключается на mobile.
- Лучшее применение: process, before/after, threat/solution.

## S3. `index-preview` — список с hover-preview

- 4–8 строк, номер + название + metadata.
- Preview следует за активной строкой или закреплён справа.
- Keyboard focus должен давать тот же результат, что hover.
- На mobile preview становится inline под выбранной строкой.

## S4. `macro-detail` — общий объект + материальные детали

- Большое изображение занимает 60–70%.
- На свободном поле 2–4 аннотации с линиями или индексами.
- При выборе аннотации изображение меняется на gallery macro asset.
- Для craft, продукта, food, beauty, одежды.

## S5. `compare` — до/после или A/B

- Один общий viewport с draggable divider.
- Поддерживает image/image, poster/video и light/dark.
- Divider имеет понятный label и keyboard control.
- На mobile fallback — две последовательные панели.

## S6. `proof-overlay` — визуал с доказательной карточкой

- Full-width медиа высотой 70–90vh.
- Одна карточка 35–45% ширины пересекает нижний край.
- Внутри: headline, 2–3 facts, CTA.
- Следующая секция начинается под карточкой, а не после пустого отступа.

## S7. `ticker-band` — типографическая полоса

- Высота 12–24vh.
- Одна короткая смысловая фраза, перечень материалов или услуг.
- Не бесконечный «бегущий шум»: один медленный цикл или движение только при scroll.
- Между повторениями — знак, номер или миниатюра.

## S8. `spec-sheet` — печатная таблица характеристик

- Две колонки: параметр / значение.
- 5–10 строк, строгие dividers.
- Слева крупный индекс изделия или услуги.
- Может резко менять режим страницы на белый/чёрный.
- Хорошо работает после эмоционального hero.

## S9. `timeline-spine` — вертикальный процесс

- Узкая центральная линия или левый spine.
- 3–6 этапов разной высоты.
- У каждого этапа один media fragment, а не одинаковая карточка.
- Активный индекс закреплён; прогресс заполняет линию.

## S10. `number-field` — поле одного большого числа

- Не ряд из трёх одинаковых stats.
- Одно число занимает 40–70vw.
- Пояснение, источник и вторичный показатель расположены на противоположных краях.
- На scroll число меняется один раз или раскрывает единицу измерения.

## S11. `pull-quote-bleed` — цитата как графическая форма

- Цитата занимает полный экран, 5–14 слов.
- Одно слово перекрывает узкое изображение либо вырезано media-fill.
- Автор и контекст — микротекст в углу.
- Это смена ритма, не стандартный testimonial.

## S12. `contact-sheet` — редакционный лист

- Асимметричная сетка 6–12 изображений, часть — миниатюры.
- Индексы, даты, материалы, координаты или названия.
- Hover увеличивает один кадр без перестройки всей сетки.
- Для портфолио, меню, архивов, процесса и коллекций.

### Правило сборки страницы

Каждая Pro-страница получает:

```text
hero
→ 1 section, разрешающую hero-метафору
→ 1 спокойную proof-section
→ 1 смену режима/масштаба
→ CTA, возвращающий мотив hero
```

Не более одной sticky-секции и одной горизонтальной механики на страницу. Старые `idea`, `split`, `gallery`, `stats` остаются допустимы, но не должны составлять всю страницу без нового структурного блока.

---

# 3. Четыре типографические личности

Шрифты следует самохостить как WOFF2 и выдавать через CSS variables на уровне страницы. Для каждого семейства загружать только реально используемые начертания.

## T1. Quiet Editorial

Для Gallery Horizon, Edge Arrival, архитектуры, hospitality, фотографии.

```css
--vh-display: "Instrument Serif", Georgia, serif;
--vh-text: "Manrope", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 400 normal; italic максимум как редкий акцент.
- H1 tracking: `-.025em`.
- Body: 400–500.
- Много воздуха, узкие строки, sentence case.

## T2. Industrial Grotesk

Для Hard Split, Index Stage, спорта, mobility, SaaS, мастерских.

```css
--vh-display: "Archivo", "Arial Narrow", Arial, sans-serif;
--vh-text: "IBM Plex Sans", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 700/800; по возможности variable width.
- H1 tracking: `-.045em`.
- Body: 400.
- Индексы и параметры — mono.
- Italic отсутствует полностью.

## T3. Fashion Contrast

Для Type Collision и Product Theatre.

```css
--vh-display: "Cormorant Garamond", "Times New Roman", serif;
--vh-text: "Manrope", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- Display: 400 normal + 400 italic.
- Очень крупный размер и tight leading.
- Italic только в одном композиционном месте.
- Навигация должна быть sans, чтобы страница не превращалась в имитацию журнала.

## T4. Technical Signal

Для Regime Shift, security, finance, science, health-tech.

```css
--vh-display: "IBM Plex Sans", Arial, sans-serif;
--vh-text: "IBM Plex Sans", Arial, sans-serif;
--vh-code: "IBM Plex Mono", monospace;
```

- H1: 500/600, не ultra-bold.
- Labels: mono uppercase, tracking `.08–.14em`.
- Числа — tabular.
- Иерархия строится контрастом масштаба и сеткой, а не сменой serif/sans.

### Изменение токенов

Не привязывать компоненты напрямую к `--vh-serif`:

```css
.pro {
  --vh-display: var(--vh-serif);
  --vh-text: var(--vh-sans);
  --vh-label: var(--vh-mono);
}

.pro[data-type="editorial"] { /* T1 */ }
.pro[data-type="grotesk"]   { /* T2 */ }
.pro[data-type="fashion"]   { /* T3 */ }
.pro[data-type="signal"]    { /* T4 */ }
```

Старые vars остаются fallback, поэтому миграция безопасна.

---

# 4. Принцип маппинга 50 сайтов

Распределять архетипы нужно не по slug и не только по нише, а по матрице из четырёх осей.

## Ось A: тип доминирующего доказательства

- Пространство: Gallery Horizon / Edge Arrival.
- Физический продукт: Product Theatre / Portal Frame.
- Система или услуга: Hard Split / Regime Shift.
- Каталог или портфолио: Index Stage.
- Сильный визуальный бренд: Type Collision.

## Ось B: энергетика

- Calm: H1, H2.
- Rational: H3, H5, H8.
- Expressive: H4, H7.
- Transformational: H6.

## Ось C: media suitability

Перед назначением проверить poster и первый meaningful frame видео:

- Есть сильный изолированный объект → H2/H4/H7.
- Есть серия равносильных изображений → H1/H8.
- Есть широкий environment → H6.
- Видео слишком композиционно занято → H3, где оно ограничено панелью.
- Медиа слабое → H5, где графическую массу создают сетка и типографика.

## Ось D: ритм каталога

В итоговом порядке 50 карточек:

- Один архетип не повторяется ближе чем через 3 позиции.
- Одна типографическая личность не повторяется более двух раз подряд.
- Два соседних сайта одной ниши обязаны различаться минимум по трём признакам:

```text
hero geometry
type personality
light/dark opening
media role
first section mechanic
```

- Доля любого архетипа: минимум 4, максимум 8 сайтов из 50.
- Full-bleed video hero — максимум 20% всей витрины.
- Bottom-left hero copy — максимум 3–4 сайта и только как осознанный bespoke-приём.

Практически это можно оформить как таблицу:

```ts
type Assignment = {
  slug: string;
  nicheCluster: string;
  hero: HeroArchetype;
  type: TypePersonality;
  opening: "light" | "dark" | "image" | "split";
  mediaRole: "object" | "window" | "strip" | "panel" | "background";
  firstModule: ProBlock["t"];
};
```

Затем прогнать простой валидатор, который отмечает повтор архетипа, типографики или media role у соседей. Bespoke-сайты тоже внести в эту таблицу как уже назначенные ограничения — иначе Pro-сайты могут случайно повторить их силуэт.

---

# 5. Безопасное расширение `ProSite`

## Шаг 1. Ввести discriminated union для hero

```tsx
type HeroMedia = {
  poster?: string;
  video?: string;
  image?: string;
  objectFit?: "cover" | "contain";
  focal?: `${number}% ${number}%`;
};

type HeroBase = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  media?: HeroMedia;
  navStyle?: "inline" | "minimal" | "vertical" | "corners";
  align?: "left" | "center" | "right";
  motion?: "none" | "parallax" | "cursor-shift" | "expand" | "mode-shift";
};

type ProHero =
  | (HeroBase & {
      archetype: "legacy";
    })
  | (HeroBase & {
      archetype: "gallery-horizon";
      strip: { img: string; alt?: string }[];
      activeExpand?: boolean;
    })
  | (HeroBase & {
      archetype: "edge-arrival";
      edge?: "left" | "right";
      proof?: { value: string; label: string };
    })
  | (HeroBase & {
      archetype: "hard-split";
      mediaSide?: "left" | "right";
      ratio?: "50/50" | "40/60" | "60/40";
    })
  | (HeroBase & {
      archetype: "type-collision";
      objectLayer?: "video" | "image";
      overlapWord?: string;
    })
  | (HeroBase & {
      archetype: "regime-shift";
      from: "light" | "dark";
      to: "light" | "dark";
      shader?: { mode: BgMode; palette: [string, string, string] };
    })
  | (HeroBase & {
      archetype: "portal-frame";
      frame?: "portrait" | "square" | "landscape";
      portalMedia?: HeroMedia;
    })
  | (HeroBase & {
      archetype: "product-theatre";
      foreground?: HeroMedia;
      proof?: { value: string; label: string }[];
    })
  | (HeroBase & {
      archetype: "index-stage";
      items: { label: string; img: string; meta?: string }[];
    });
```

`legacy` должен быть реальным вариантом union, а не исключением внутри JSX. Это позволит постепенно мигрировать данные и тестировать новый renderer отдельно.

## Шаг 2. Сохранить старые поля на время миграции

```tsx
type Pro = {
  slug: string;
  theme: string;
  brand: string;
  nav: string[];
  typography?: TypePersonality;
  hero?: ProHero;

  /** legacy fallback */
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;

  blocks: ProBlock[];
  tagline: string;
  legal: string;
};
```

Нормализатор превращает старые данные в новый формат:

```tsx
function resolveHero(data: Pro): ProHero {
  if (data.hero) return data.hero;

  return {
    archetype: "legacy",
    eyebrow: data.eyebrow,
    title: data.title,
    sub: data.sub,
    media: {
      video: `/uploads/1/hooks/sites/${data.slug}-hero.mp4`,
      poster: `/uploads/1/hooks/sites/${data.slug}.jpg`,
    },
  };
}
```

Так все существующие 34 записи продолжают работать без массового изменения реестра.

## Шаг 3. Вынести renderer hero

```tsx
function ProHeroView({
  hero,
  site,
}: {
  hero: ProHero;
  site: Pick<Pro, "slug" | "brand" | "nav">;
}) {
  switch (hero.archetype) {
    case "legacy":
      return <LegacyHero hero={hero} site={site} />;
    case "gallery-horizon":
      return <GalleryHorizonHero hero={hero} site={site} />;
    case "edge-arrival":
      return <EdgeArrivalHero hero={hero} site={site} />;
    // exhaustive cases
    default:
      return assertNever(hero);
  }
}
```

`ProSite` после этого становится shell-компонентом:

```tsx
function ProSite({ data }: { data: Pro }) {
  const hero = resolveHero(data);

  return (
    <div
      className={`vh-site pro pro-${data.theme}`}
      data-hero={hero.archetype}
      data-type={data.typography ?? "editorial"}
    >
      <ProHeroView hero={hero} site={data} />

      <main>
        {data.blocks.map((block, index) => (
          <ProBlockView
            key={block.id ?? `${block.t}-${index}`}
            b={block}
          />
        ))}
      </main>

      <ProFooter data={data} />
    </div>
  );
}
```

## Шаг 4. Расширить `ProBlock` небольшими независимыми union-ветками

```tsx
type ProBlockBase = {
  id?: string;
  theme?: "inherit" | "light" | "dark" | "accent";
  reveal?: "up" | "zoom" | "mask" | "none";
};

type ProBlock =
  | ExistingProBlock
  | (ProBlockBase & {
      t: "rail";
      head?: React.ReactNode;
      items: { img: string; cap?: string; ratio?: string }[];
      behavior?: "drag" | "scroll" | "cursor";
    })
  | (ProBlockBase & {
      t: "sticky-switch";
      intro?: React.ReactNode;
      steps: {
        title: React.ReactNode;
        body?: string;
        media: string;
        theme?: "light" | "dark";
      }[];
    })
  | (ProBlockBase & {
      t: "index-preview";
      items: { n?: string; title: string; meta?: string; img: string }[];
    })
  | (ProBlockBase & {
      t: "macro-detail";
      image: string;
      details: { label: string; body?: string; img?: string }[];
    })
  | (ProBlockBase & {
      t: "compare";
      before: { img: string; label: string };
      after: { img: string; label: string };
    })
  | (ProBlockBase & {
      t: "spec-sheet";
      head?: React.ReactNode;
      rows: [string, string][];
    })
  | (ProBlockBase & {
      t: "timeline-spine";
      items: { h: string; p: string; img?: string }[];
    })
  | (ProBlockBase & {
      t: "number-field";
      value: string;
      label: string;
      note?: string;
    })
  | (ProBlockBase & {
      t: "pull-quote-bleed";
      text: React.ReactNode;
      cite?: string;
      img?: string;
    })
  | (ProBlockBase & {
      t: "contact-sheet";
      items: { img: string; cap?: string; size?: "s" | "m" | "l" }[];
    });
```

Не добавлять универсальный тип вроде `{ t: "custom"; variant: string; data: any }`: он быстро уничтожит type safety и превратит реестр в набор невалидируемых исключений.

## Шаг 5. Организация CSS

Не продолжать наращивать один плоский `.pb-*` namespace. Разделить систему:

```text
.pb-shell-*       общие header/footer/button/media primitives
.ph-*             hero primitives
.ph--gallery-*    конкретный hero archetype
.ph--edge-*       конкретный hero archetype
.pm-*             новые page modules
```

Пример root selectors:

```css
.pro[data-hero="hard-split"] { /* archetype tokens */ }
.pro[data-type="signal"] { /* typography tokens */ }

.ph { min-height: 100svh; }
.pm { position: relative; }
```

Использовать `100svh`, а не только `100vh`. Для каждого hero сразу предусмотреть:

```css
@media (max-width: 900px) { ... }
@media (prefers-reduced-motion: reduce) { ... }
```

Reduced-motion должен выключать трансформацию, но сохранять перекрытия, crop и визуальный вопрос.

## Шаг 6. Миграция без big bang

1. Ввести `ProHero`, `resolveHero`, `LegacyHero`, не меняя визуал.
2. Добавить типографические tokens, сохранив fallback на старые vars.
3. Реализовать сначала три максимально разные формы:
   - Gallery Horizon;
   - Hard Split;
   - Product Theatre.
4. Перенести по одному контрастному сайту на каждый вариант.
5. Добавить остальные hero только после проверки desktop/mobile/reduced-motion.
6. Реализовать сначала четыре секции с наибольшим композиционным выигрышем:
   - `rail`;
   - `index-preview`;
   - `sticky-switch`;
   - `spec-sheet`.
7. Переносить Pro-сайты пакетами по 4–6, проверяя соседство во всей витрине.
8. Оставить `legacy` до полной миграции; удалить старые `eyebrow/title/sub` только отдельным cleanup-коммитом.

---

# Защитные правила системы

Добавить dev-only валидацию реестра:

```tsx
validateProRegistry(PRO, {
  maxSameHeroInRow: 1,
  maxSameTypographyInRow: 2,
  minBlocks: 3,
  maxStickyBlocks: 1,
  maxHorizontalBlocks: 1,
  requirePoster: true,
  requireMobileFallback: true,
});
```

Также полезно ловить:

- повторяющиеся блоки и данные — в текущем `botanic`, например, дважды добавлен один и тот же `stats`;
- hero без meaningful poster;
- больше одного autoplay-видео в первом viewport;
- `index-preview` без focus-поведения;
- compare без подписей;
- слишком длинный headline для выбранного архетипа;
- последовательность из одних старых `idea/split/gallery/cta`.

Главный критерий готовности: если отключить цвет, заменить все изображения серыми прямоугольниками и уменьшить motion до нуля, силуэты соседних сайтов всё равно должны оставаться узнаваемо разными. Именно этого сейчас не хватает `ProSite`. Файлы не изменялись.
