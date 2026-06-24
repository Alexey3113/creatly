# Landing V2 — Design Brief

## Проблема: почему всё выглядит как шаблон

Любой AI/LLM при генерации лендинга выдаёт одну и ту же структуру:
```
nav → centered hero → 3 cards grid → 3 steps → testimonials carousel → 3 pricing cards → CTA
```
Это skeleton Tilda/Framer/любого конструктора с 2019 года. Смена шрифта и цвета не помогает — скелет тот же, и пользователь это считывает за 2 секунды.

**"Linear look"** (тёмный фон + синие градиенты + Inter + тонкие border + radial glow) — это новый Bootstrap. В 2024 это было свежо, в 2026 — флаг "сгенерировано".

---

## Что реально создаёт ощущение "студийного" сайта

### 1. Структура, которая не повторяется

Каждая секция должна выглядеть по-другому. Не "heading + grid of cards" × 5.

| Вместо | Делать |
|---|---|
| 3 карточки в grid | Чередующиеся full-width ряды (текст/визуал меняются сторонами) |
| Карусель отзывов | Один большой отзыв с навигацией точками |
| Grid галереи | Горизонтальный скролл (лента) |
| Отдельные шаги 01/02/03 | Единый блок с разделителями внутри |
| Hero текст + скриншот снизу | Hero = демо на весь экран, текст поверх |

**Правило**: если две секции подряд используют одинаковый layout (grid N×M) — одну из них нужно переделать.

### 2. Типографика как дизайн-элемент

- **Микс шрифтов**: sans-serif для UI + serif italic для акцентных слов в заголовках. Один шрифт на весь сайт = конструктор.
- **Контраст размеров**: hero h1 должен быть минимум в 3× крупнее body text. Не 48px/16px, а 72px/14px.
- **Акцентные слова**: выделить 1-2 слова в заголовке через serif italic + gradient/color. "Не конструктор. *Инструмент*".
- **Letter-spacing**: плотный на крупных заголовках (−0.04em), разреженный на мелких label'ах (+0.08em).

Хорошие пары шрифтов (Google Fonts):
- Space Grotesk + Instrument Serif
- Outfit + Playfair Display
- Sora + Lora
- Cabinet Grotesk (платный) + любой serif

**Никогда**: Inter как основной шрифт. Это system-ui с лишним импортом.

### 3. Цветовая палитра с характером

Монохромный синий = "ещё один SaaS". Нужен контраст тёплого и холодного.

```
Рабочая палитра:
- Primary accent:  #ff6b35 (тёплый оранжевый) — CTA, выделения
- Secondary:       #6c5ce7 (фиолетовый) — визуальные элементы, hover
- Tertiary:        #00d2a0 (бирюзовый) — success, скидки
- Text:            #8090a8 → #d0d8e4 → #f0f2f5 (3 уровня яркости)
- Surfaces:        #08090c → #101218 → #181b24 (3 уровня глубины)
```

**Правило**: если на странице только один hue — это скучно. Минимум 2 разных accent'а.

### 4. Текстура и "несовершенность"

Цифровая чистота = "сгенерировано". Добавить:

- **Film grain** — SVG feTurbulence overlay на `::after`, opacity 0.03, mix-blend-mode: overlay
- **Subtle noise** на surface'ах
- **Неидеальные** размеры элементов (не всё кратно 8px)

```css
/* Film grain — 0 KB, чистый CSS */
.page::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: .03;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### 5. Демо-блок как центр страницы

Для AI-продукта главный аргумент — показать результат. Не скриншот, не описание, а **интерактивная демонстрация**:

- Пользователь выбирает нишу → видит прогресс генерации → получает готовый сайт
- Мини-сайт внутри должен выглядеть **реальным**: навигация, кикер, hero с градиентом, карточки, stats, footer
- Кнопка "другая ниша" — прилеплена к углу preview, не отдельным блоком

**Критично**: мини-сайт НЕ должен быть wireframe из цветных прямоугольников. Он должен вызывать реакцию "хочу такое".

---

## Анимации: что работает, а что нет

### Железное правило
**Анимировать ТОЛЬКО `transform` и `opacity`**. Они идут через compositor thread и не вызывают reflow. Никогда не анимировать `top`, `left`, `width`, `height`, `margin`, `padding`.

### Что реально добавляет "живости"

**1. Stagger на появлении элементов**
```css
.parent > .item:nth-child(1) { transition-delay: 0ms; }
.parent > .item:nth-child(2) { transition-delay: 60ms; }
.parent > .item:nth-child(3) { transition-delay: 120ms; }
/* ... */
```
Эффект "волны". 5 строк CSS, огромный визуальный импакт.

**2. CSS Scroll-Driven Animations (нативный параллакс)**
```css
@supports (animation-timeline: scroll()) {
  .hero {
    animation: fadeOut linear both;
    animation-timeline: scroll(root);
    animation-range: 0px 500px;
  }
  @keyframes fadeOut { to { opacity: 0; } }
}
```
Поддержка Chrome/Edge/Safari 2024+. 0 JS, compositor thread.

**3. 3D hover на карточках**
```css
.card:hover {
  transform: perspective(800px) rotateX(-3deg) translateY(-4px);
}
```
Вместо `translateY(-6px)` — карточка наклоняется как физический объект.

**4. Scale + border-color на hover**
```css
.item {
  transition: transform .4s cubic-bezier(.16,1,.3,1), border-color .3s;
}
.item:hover {
  transform: translateY(-4px) translateZ(0);
  border-color: rgba(255,255,255,.12);
}
```
Не `box-shadow` анимация (тяжёлая) — а `border-color` transition (лёгкая).

### Что НЕ делать

- `box-shadow` анимации — вызывают repaint, лагают на мобильных
- Параллакс через JS `scroll` listener + `style.transform` — layout thrashing
- `animate` на `background-position` — repaint каждый кадр
- Бесконечные `@keyframes` на видимых элементах — отжирают батарею
- `will-change` на всём — обратный эффект, пожирает GPU память

### Easing

- **Появление**: `cubic-bezier(.16, 1, .3, 1)` — быстрый старт, мягкая остановка
- **Исчезновение**: `cubic-bezier(.4, 0, .2, 1)`
- **Hover**: `0.2s ease` — быстро и не отвлекает
- **Никогда**: `linear` для UI-анимаций (выглядит механически)

---

## Антипаттерны — что сразу выдаёт шаблон

1. **Inter как шрифт** — system-ui с extra steps
2. **Один синий на весь сайт** — Linear look 2022
3. **Все секции центрированы** — конструкторный layout
4. **Heading → subheading → 3 cards → repeat** — skeleton любого template
5. **Инициалы в круге вместо фото** — "отзывы ненастоящие"
6. **"500+ сайтов"** как social proof без контекста — слабо для SaaS, конкуренты показывают миллионы
7. **Статичный скриншот** вместо интерактива — "нечего показать"
8. **Одинаковый spacing между всеми секциями** — механический ритм
9. **Divider line между каждой секцией** — артефакт конструктора
10. **Generic glow/gradient на каждом элементе** — "я поставил blur(20px) на radial-gradient"

---

## Чеклист перед деплоем

- [ ] Ни одна секция не повторяет layout предыдущей
- [ ] Минимум 2 разных accent-цвета
- [ ] Serif + sans-serif микс в типографике
- [ ] Демо-блок показывает реальный результат, не wireframe
- [ ] Film grain или noise текстура
- [ ] Stagger на группах элементов
- [ ] Все анимации — только transform + opacity
- [ ] На мобильном всё читаемо и кликабельно
- [ ] Hero загружается за < 2 секунды
- [ ] Нет `will-change` на элементах без анимации
