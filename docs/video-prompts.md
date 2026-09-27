# Higgsfield — image-to-video промпты под 6 существующих стиллов

**Приём:** генерим НЕ с нуля, а `image-to-video` из уже готовых фото
(`public/assets/demo/*.webp` = `docs/assets/*`). Видео тогда точно совпадает
с картинкой — та же композиция, цвет, свет. Это секрет консистентности motionsites.

---

## Золотые правила (иначе вау не будет)

1. **ОДНО непрерывное движение, без склеек.** Скролл проезжает через ролик —
   любой монтажный стык выглядит как баг. Только медленный dolly / orbit / push / tilt.
2. **Медленно.** То, что при обычном плей кажется «слишком медленным», при скролле
   ощущается идеально — темп задаёт пользователь.
3. **Коротко.** Скраб-видео: **5–8 сек**. Фоновый луп: **3–6 сек**.
4. **Без звука.** Muted всегда.
5. **После генерации — пережать для плотных keyframe** (иначе скраб назад дёргается):
   `ffmpeg -i in.mp4 -an -g 8 -crf 22 -movflags +faststart out.mp4`
   (`-g 8` = опорный кадр каждые 8 фреймов, `-an` = убрать звук.)

Суффикс ко всем: `, subtle continuous motion, no cuts, no scene change, seamless, cinematic, muted`

---

## 1. tech.webp (летающий куб + слои, синий glow на графите)
**Роль:** скраб-видео → `story-zoom-01` / `story-showcase-01` · **5–7 сек**
**Motion prompt:**
`Slow cinematic orbit around a floating dark geometric cube, the blue glowing panels drift gently and the light layers beneath softly pulse, camera slowly circles at a fixed distance on a dark charcoal background, product-render aesthetic`
→ *Почему:* медленный облёт объекта — идеальная «камера отъезжает/облетает» под наш зум.

## 2. luxury.webp (тёмный интерьер, латунная люстра, мрамор)
**Роль:** скраб-видео → `story-poster-01` / `story-showcase-01` · **6–8 сек**
**Motion prompt:**
`Slow smooth dolly push forward through a dark luxury interior toward the brass chandelier, the golden light gently shimmers and reflections drift across the marble floor, cinematic slow camera move, opulent and calm`
→ *Почему:* медленный наезд вглубь комнаты — классический кино-вход, отлично скрабится по главам.

## 3. editorial.webp (разворот с вазой, много пустоты)
**Роль:** фон-луп ИЛИ скраб → `hero-poster-01` · **4–6 сек**
**Motion prompt:**
`Extremely subtle slow zoom into a minimalist editorial still life of a clay vase, soft daylight slowly shifts across the surface casting a moving shadow, barely-there camera drift, calm and refined`
→ *Почему:* тут движение должно быть почти незаметным — только свет и тень плывут, чтобы текст поверх читался.

## 4. bold.webp (танцор в прыжке, конфетти, коралл+синий)
**Роль:** фон-луп → `testimonials-cinematic-01` / `hero-poster` · **4–6 сек**
**Motion prompt:**
`The dancer holds a frozen mid-air pose while confetti slowly falls and colored smoke drifts across the frame, coral and blue stage lights gently flicker, slow atmospheric motion around a still subject, energetic but not chaotic`
→ *Почему:* НЕ анимируем сам прыжок (сломается), оживляем конфетти/дым/свет вокруг замершего героя.

## 5. brutalist.webp (бетонная архитектура, ЧБ)
**Роль:** скраб-видео → `gallery-reveal-01` (база) / statement-фон · **6–8 сек**
**Motion prompt:**
`Slow vertical crane shot tilting up through massive raw concrete brutalist architecture, hard shadows slowly move as the light shifts, dramatic black and white, single continuous upward camera motion`
→ *Почему:* медленный подъём камеры по бетонным конструкциям — очень кино, идеально для скраба.

## 6. aurora.webp (размытые сине-фиолетовые пятна)
**Роль:** бесшовный фоновый луп → слой «Сцена» / фон под текст · **5–6 сек, loop**
**Motion prompt:**
`Abstract blurred light blobs slowly drifting and morphing on a near-black background, deep cobalt and violet, gentle organic flow like a lava lamp, seamless loop, dreamy ambient motion`
→ *Почему:* амбиентный морфинг пятен — живая замена/дополнение нашей CSS-авроре, идеально лупится.

---

## Стратегия использования (важнее самих роликов)

- **Видео только на 1–2 «крючковых» секциях** — герой + одна story. Остальное на стиллах.
  Вау должен быть front-loaded: первые 3 секунды сайта = то, что попадёт в рилс.
- **Приоритет генерации:** сначала №2 (luxury наезд) и №5 (бетон подъём) — самые
  кинематографичные под скраб. Потом №1 (облёт куба) и №6 (аврора-луп).
- №3 и №4 — по остаточному принципу (там движение почти незаметное, стилл справится).

## Что проверить на результате

1. Нет ли склеек/резких смен плана (это ломает скраб).
2. Достаточно ли медленно (при скролле темп задаём мы — быстрое видео = мельтешение).
3. Держится ли композиция кадра (image-to-video иногда «уплывает» от исходника).
4. Лупится ли бесшовно (№6) — если нет, наш `data-smooth-loop` докроссфейдит.
