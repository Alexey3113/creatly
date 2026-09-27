/**
 * Медиа-план генерации: какие кадры и видео нужны сайту.
 *
 * Многофазовый конвейер (первая итерация, локальный Higs Bot):
 *  1. сайт уже собран (выбор блоков + контент) — считаем image-слоты;
 *  2. AI пишет единую «визуальную вселенную» + промпт на каждый слот
 *     (стилизованное кино, НЕ реализм — как у motionsites);
 *  3. фото генерятся последовательно (nano-banana-pro 2K 16:9);
 *  4. видео: hero-цепочка кадров A→B→C→D (kling start+end frame, склейка
 *     в один скраб) + ambient-лупы для глав;
 *  5. палитра сайта определяется ПОСЛЕ медиа — vision-разбором hero-кадра.
 */

import type { ArtDirectionBrief } from "./art-direction";
import { blockIndex } from "@/lib/builder/blocks/_registry";
import { extractJson } from "@/lib/site/catalog";
import { presetSchema, isImageField } from "@/lib/site/schema";
import type { ContentManifestBlock } from "@/lib/site/generate";

export interface MediaSlot {
  /** Индекс блока в манифесте. */
  block: number;
  presetId: string;
  field: string;
  /** Имя коллекции и индекс item'а, если слот внутри коллекции. */
  collection?: string;
  item?: number;
  kind: "hero" | "chapter" | "fg" | "gallery" | "card" | "portrait";
}

const PORTRAIT_RE = /avatar|photo|portrait|face|author/i;
const VIDEO_FIELD_RE = /video/i;
const KIND_PRIORITY: Record<MediaSlot["kind"], number> = { hero: 0, chapter: 0, fg: 1, gallery: 2, card: 3, portrait: 4 };

function slotKind(presetId: string, field: string): MediaSlot["kind"] {
  const category = blockIndex.get(presetId)?.category || "";
  if (PORTRAIT_RE.test(field) || category === "team" || category === "testimonials") return "portrait";
  if (presetId.startsWith("story-chapters")) return /fg/.test(field) ? "fg" : "chapter";
  if (category === "hero" || category === "story") return "hero";
  if (category === "gallery") return "gallery";
  return "card";
}

/**
 * Все image-слоты выбранных блоков (по СХЕМЕ пресета + item'ам манифеста),
 * отсортированные по драматургической важности. Потолка по умолчанию НЕТ:
 * генерим столько кадров, сколько требует сайт — время конвейера вторично.
 * Поля-видео (sp01-video и т.п.) не считаем — их закрывает hero-цепочка.
 */
export function buildMediaSlots(manifest: ContentManifestBlock[], cap = Infinity): MediaSlot[] {
  const slots: MediaSlot[] = [];
  manifest.forEach((block, bi) => {
    const schema = presetSchema(block.presetId);
    if (!schema) return;
    for (const field of schema.blockFields) {
      if (!isImageField(block.presetId, field) || VIDEO_FIELD_RE.test(field)) continue;
      slots.push({ block: bi, presetId: block.presetId, field, kind: slotKind(block.presetId, field) });
    }
    for (const [collName, itemFields] of schema.collections) {
      const items = block.collections?.[collName];
      if (!items?.length) continue;
      const maxItems = Math.min(items.length, 6);
      for (let i = 0; i < maxItems; i++) {
        for (const field of itemFields) {
          if (!isImageField(block.presetId, field) || VIDEO_FIELD_RE.test(field)) continue;
          slots.push({ block: bi, presetId: block.presetId, field, collection: collName, item: i, kind: slotKind(block.presetId, field) });
        }
      }
    }
  });
  slots.sort((a, b) => KIND_PRIORITY[a.kind] - KIND_PRIORITY[b.kind]);
  return Number.isFinite(cap) ? slots.slice(0, cap) : slots;
}

/**
 * Принудительная связность мира story-глав (не полагаемся на дисциплину модели):
 * фон главы N получает референсом фон главы N-1 (одно непрерывное путешествие),
 * foreground-объекты — фон СВОЕЙ главы (предметы из того же пространства).
 * Рефы ставятся только «назад» по индексу — контракт пула сохраняется.
 */
export function enforceStoryRefs(slots: MediaSlot[], images: ImagePromptSpec[]): void {
  // индекс фонового слота каждой главы: block:collection:item -> slot index
  const bgIndex = new Map<string, number>();
  slots.forEach((s, i) => {
    if (s.kind === "chapter" && !/fg/.test(s.field)) bgIndex.set(`${s.block}:${s.collection}:${s.item}`, i);
  });
  slots.forEach((s, i) => {
    if (!images[i]) return;
    if (s.kind === "chapter" && s.item != null && s.item > 0) {
      const prev = bgIndex.get(`${s.block}:${s.collection}:${s.item - 1}`);
      if (prev != null && prev < i) images[i].ref = prev;
    } else if (s.kind === "fg" && s.item != null) {
      const own = bgIndex.get(`${s.block}:${s.collection}:${s.item}`);
      if (own != null && own < i) images[i].ref = own;
    }
  });
}

/** Записывает сгенерированный URL в манифест по слоту. */
export function assignSlot(manifest: ContentManifestBlock[], slot: MediaSlot, url: string): void {
  const block = manifest[slot.block];
  if (!block) return;
  if (slot.collection != null && slot.item != null) {
    const item = block.collections?.[slot.collection]?.[slot.item];
    if (item) item.fields[slot.field] = url;
  } else {
    block.fields = block.fields || {};
    block.fields[slot.field] = url;
  }
}

export interface ImagePromptSpec {
  prompt: string;
  /**
   * Индекс слота, чей ГОТОВЫЙ кадр передаётся референсом в эту генерацию.
   * null — свободный кадр (сразу в очередь). Зависимые кадры ждут родителя —
   * так главы истории остаются одним миром, а не разрозненными картинками.
   */
  ref: number | null;
}

export interface MotionSpec {
  prompt: string;
  /** Длительность сегмента, сек (3-12). */
  duration: number;
}

export interface AmbientSpec extends MotionSpec {
  /** Индекс слота-кадра, который оживляем. */
  slot: number;
}

export interface MediaPromptsPlan {
  universe: string;
  images: ImagePromptSpec[];
  heroChain?: string[];
  /** Пер-сегментные motion-промпты hero-цепочки (A→B, B→C, C→D). */
  heroChainMotion?: MotionSpec[];
  /** Пер-сценные ambient-промпты для фонов глав. */
  ambient?: AmbientSpec[];
}

/**
 * Моушн-плейбук — экспертиза, выстраданная на демо (docs/video-prompts.md):
 * что kling делает хорошо и как писать промпты движения. Подмешивается в M1,
 * чтобы КАЖДОЕ видео получало свой промпт камеры, а не общий шаблон.
 */
export const MOTION_PLAYBOOK = `## МОУШН-ПЛЕЙБУК (правила видео — нарушение убивает вау-эффект)
- ОДНО непрерывное движение камеры, БЕЗ склеек и смены сцены: видео скрабится скроллом, любой стык выглядит как баг.
- Медленно: что кажется «слишком медленно» при просмотре — идеально при скролле.
- Словарь камеры: slow dolly push forward / pull back, orbit at fixed distance, vertical crane up/down, lateral tracking, push-through (сквозь проём/объект), rack focus. Одно движение на ролик.
- Живая атмосфера вместо движения объектов: свет плывёт по поверхности, пыль в луче, ткань дышит, отражения дрейфуют, дым/пар. ЛЮДЕЙ НЕ АНИМИРОВАТЬ (морфинг): человек держит позу, живёт только среда вокруг.
- Сегмент start→end frame: опиши движение, которое НАЧИНАЕТСЯ в композиции кадра A и ЕСТЕСТВЕННО ПРИХОДИТ в композицию кадра B (называй конкретные объекты обоих кадров).
- Ambient-луп: почти незаметный дрейф, концовка близка к началу (loopable), текст поверх должен читаться.
- Длительности: пролёт-сегмент цепочки 5-8 сек, ambient-фон 5-6 сек, эпичный проход 8-10 сек. Диапазон 3-12.
- Каждый motion-промпт заканчивай: "subtle continuous motion, no cuts, no scene change, seamless, cinematic"`;

const MOTION_SUFFIX = "subtle continuous motion, no cuts, no scene change, seamless, cinematic";

/** Гарантирует моушн-суффикс (модель может забыть — правило дешевле энфорсить). */
export function withMotionSuffix(prompt: string): string {
  return /no cuts/i.test(prompt) ? prompt : `${prompt.replace(/[,.\s]+$/, "")}, ${MOTION_SUFFIX}`;
}

function clampDuration(v: unknown, fallback: number): number {
  const n = typeof v === "number" && isFinite(v) ? v : fallback;
  return Math.min(12, Math.max(3, Math.round(n)));
}

/**
 * Промпт этапа M1: единая визуальная вселенная + фото-промпт на каждый слот
 * + опц. hero-цепочка из 4 кадров непрерывного путешествия камеры.
 */
export function buildMediaPromptsPrompt(
  brief: string,
  ad: ArtDirectionBrief,
  slots: MediaSlot[],
  wantHeroChain: boolean,
): string {
  const slotLines = slots
    .map((s, i) => {
      const hint = blockIndex.get(s.presetId)?.fields.find((f) => f.name === s.field)?.hint || "";
      return `${i}. [${s.kind}] блок ${s.presetId}, поле ${s.field}${s.item != null ? ` (элемент ${s.item + 1})` : ""} — ${hint}`;
    })
    .join("\n");

  return `Ты — режиссёр и арт-директор AI-фотосъёмки для сайта-кино. Пишешь промпты для генератора изображений.

## Бриф клиента
${brief}

## Утверждённая концепция
${ad.concept}
Настроение: ${ad.mood}
Обработка изображений: ${ad.imageryTreatment}

## СТИЛЬ (главное!)
Сюжет каждого кадра — мир КЛИЕНТА: его продукт, его пространства, его материалы. Продукт/тема
бизнеса обязан присутствовать в большинстве кадров — сайт мебельщика показывает мебель, сайт
ресторана — еду и зал, сайт финтеха — свои метафоры денег. Если в брифе описана концепция-сценарий
(«путешествие по квартире», «прогулка по цеху») — hero и главы следуют ей ДОСЛОВНО.
Стилизация — не смена сюжета, а КАК снято: драматичный кино-свет с направленным источником,
кинематографичная оптика и композиция, преувеличенный масштаб пространств, благородные фактуры,
лёгкая сюрреальность там, где она усиливает продукт. Никаких исторических костюмов и декораций,
если клиент прямо не просил. Ориентир качества — рекламные кампании премиум-брендов. ЗАПРЕЩЕНО: текст/логотипы/водяные знаки в кадре,
UI-скриншоты, «офисный сток», пластиковый 3D-рендер, случайные красивости без связи с бизнесом.

## Задача
1. Сформулируй "universe" — 2-3 предложения: единая визуальная вселенная всех кадров, выведенная
   ИЗ бизнеса клиента (что в кадрах, какие материалы и свет, какая атмосфера). Один мир на весь сайт.
2. Для каждого слота ниже напиши ОДИН промпт на английском (40-80 слов): конкретная сцена
   в этой вселенной, уместная роли слота ([hero] — эпичная установочная сцена с продуктом,
   [chapter] — главы ОДНОГО непрерывного путешествия по миру клиента, [gallery] — вариации
   продукта, [card] — лаконичные детали, [portrait] — стилизованный портрет мастера/героя).
   [fg] — ОДИН предмет из пространства своей главы КРУПНЫМ планом: предметная съёмка уровня
   рекламной кампании, атмосферный фон в тон вселенной (НЕ чёрный и НЕ студийно-пустой),
   мягкий направленный свет, предмет целиком в кадре, квадратная композиция. Кадр должен
   отлично выглядеть и как самостоятельная карточка, и после выреза фона. Остальные кадры 16:9.
   Каждый промпт заканчивай: "cinematic, painterly light, 16:9, no text".
   У каждого промпта поле "ref": если кадр должен быть ПРОДОЛЖЕНИЕМ другого (главы одного
   путешествия, серия одного пространства/героя) — укажи индекс кадра-родителя, он будет
   передан генератору как референс (пиши промпт как «same world/scene, now …»). Независимые
   кадры — "ref": null: они генерятся параллельно, зависимые ждут родителя. Цепочки допустимы
   (1←0, 2←1). Фоны глав [chapter] ОБЯЗАНЫ быть цепочкой (глава N ← глава N-1), а [fg] —
   ссылаться на фон своей главы: один мир, а не набор разрозненных красивых картинок.

${MOTION_PLAYBOOK}

## Слоты
${slotLines}

3. "ambient" — для КАЖДОГО слота [chapter] напиши свой motion-промпт (на английском, по
   плейбуку): что именно живёт в ЭТОЙ сцене (свет, ткань, пыль, отражения) и длительность.
${wantHeroChain ? `4. "heroChain" — 4 промпта-кадра НЕПРЕРЫВНОГО путешествия камеры для hero-видео
   (A→B→C→D: каждый следующий кадр — логичное продолжение движения из предыдущего,
   одно пространство/один свет, камера летит вперёд). Тоже на английском.
5. "heroChainMotion" — 3 motion-промпта сегментов (A→B, B→C, C→D): по плейбуку, каждый
   описывает движение из композиции своего стартового кадра в композицию конечного.` : ""}

Ответ — СТРОГО JSON:
{"universe": "...", "images": [{"prompt": "промпт слота 0", "ref": null}, {"prompt": "промпт слота 1", "ref": 0}, ...], "ambient": [{"slot": 2, "prompt": "...", "duration": 6}, ...]${wantHeroChain ? `, "heroChain": ["A", "B", "C", "D"], "heroChainMotion": [{"prompt": "A→B", "duration": 6}, {"prompt": "B→C", "duration": 6}, {"prompt": "C→D", "duration": 7}]` : ""}}`;
}

export function parseMediaPrompts(response: string, slotsCount: number): MediaPromptsPlan | null {
  const parsed = extractJson<{ universe?: string; images?: unknown; heroChain?: unknown; heroChainMotion?: unknown; ambient?: unknown }>(response);
  if (!parsed) return null;
  const universe = typeof parsed.universe === "string" ? parsed.universe : "";
  const raw = Array.isArray(parsed.images) ? parsed.images : [];
  const images: ImagePromptSpec[] = [];
  for (const entry of raw) {
    // терпим и старый формат-строку, и объект {prompt, ref}
    if (typeof entry === "string" && entry.trim()) images.push({ prompt: entry, ref: null });
    else if (entry && typeof entry === "object" && typeof (entry as { prompt?: unknown }).prompt === "string") {
      const e = entry as { prompt: string; ref?: unknown };
      images.push({ prompt: e.prompt, ref: typeof e.ref === "number" && Number.isInteger(e.ref) ? e.ref : null });
    }
  }
  if (!images.length) return null;
  // Если модель потеряла хвост — добираем промптом вселенной
  while (images.length < slotsCount) images.push({ prompt: `${universe} — cinematic detail scene, painterly light, 16:9, no text`, ref: null });
  const sliced = images.slice(0, slotsCount);
  // Санитизация зависимостей: реф только назад по индексу и без самоссылок —
  // это исключает циклы, вперёд-ссылки и выход за границы
  sliced.forEach((img, i) => {
    if (img.ref != null && (img.ref < 0 || img.ref >= i)) img.ref = null;
  });
  const heroChain = Array.isArray(parsed.heroChain)
    ? parsed.heroChain.filter((p): p is string => typeof p === "string" && !!p.trim()).slice(0, 4)
    : undefined;
  const validChain = heroChain?.length === 4 ? heroChain : undefined;

  // Пер-сегментные motion-промпты: ровно сегментов цепочки, иначе фолбэк-шаблон
  let heroChainMotion: MotionSpec[] | undefined;
  if (validChain && Array.isArray(parsed.heroChainMotion)) {
    const specs = parsed.heroChainMotion
      .filter((m): m is { prompt: string; duration?: unknown } => !!m && typeof (m as { prompt?: unknown }).prompt === "string")
      .map((m) => ({ prompt: withMotionSuffix(m.prompt), duration: clampDuration(m.duration, 6) }));
    if (specs.length === validChain.length - 1) heroChainMotion = specs;
  }

  // Пер-сценные ambient-промпты фонов глав
  const ambient: AmbientSpec[] = Array.isArray(parsed.ambient)
    ? parsed.ambient
        .filter((a): a is { slot: number; prompt: string; duration?: unknown } =>
          !!a && typeof (a as { slot?: unknown }).slot === "number" && typeof (a as { prompt?: unknown }).prompt === "string")
        .filter((a) => a.slot >= 0 && a.slot < slotsCount)
        .map((a) => ({ slot: a.slot, prompt: withMotionSuffix(a.prompt), duration: clampDuration(a.duration, 6) }))
    : [];

  return { universe, images: sliced, heroChain: validChain, heroChainMotion, ambient };
}

/** Промпт движения для сегмента hero-цепочки (start→end frame). */
export function heroChainMotionPrompt(universe: string): string {
  return `Camera flies forward smoothly through the scene into the next one, continuous single take, no cuts, slow cinematic motion, seamless transition, consistent light and atmosphere. ${universe}`.slice(0, 480);
}

/** Промпт ambient-движения для фона главы (один стартовый кадр). */
export function ambientMotionPrompt(universe: string): string {
  return `Very slow cinematic ambient motion, atmosphere drifts, light breathes, subtle parallax, camera almost still, no cuts, loopable mood. ${universe}`.slice(0, 480);
}

/** Vision-промпт контроля качества кадра (auto-accept: оценка → регенерация с критикой). */
export function buildFrameQAPrompt(universe: string, role: string, framePrompt: string): string {
  return `Ты — придирчивый контроль качества AI-съёмки премиум-сайта.

Вселенная съёмки: ${universe}
Роль кадра: ${role}
Промпт кадра: ${framePrompt.slice(0, 300)}

Оцени приложенный кадр строго:
1) соответствует вселенной и роли (сюжет — мир клиента, не случайная красивость);
2) нет текста, логотипов, вотермарок, UI-скриншотов;
3) нет уродств анатомии, склеек, явных AI-артефактов;
4) свет и композиция уровня кино, не «сток».

Ответ — СТРОГО JSON: {"ok": true} если кадр годен, иначе {"ok": false, "fix": "что конкретно исправить в промпте, 1-2 предложения на английском"}`;
}

export function parseFrameQA(response: string): { ok: boolean; fix: string } | null {
  const parsed = extractJson<{ ok?: unknown; fix?: unknown }>(response);
  if (!parsed || typeof parsed.ok !== "boolean") return null;
  return { ok: parsed.ok, fix: typeof parsed.fix === "string" ? parsed.fix : "" };
}

/** Vision-промпт: палитра сайта из готового hero-кадра (цвета ПОСЛЕ медиа). */
export function buildPaletteVisionPrompt(ad: ArtDirectionBrief): string {
  return `Это hero-кадр сайта. Выведи из него палитру интерфейса: фоны чуть темнее/светлее тона кадра, акцент — самый выразительный цвет кадра. Стиль: ${ad.mood}. Требования: контраст текст/фон достаточный для чтения; НЕ чистые #fff/#000.

Ответ — СТРОГО JSON:
{"bg": "#hex", "bgAlt": "#hex", "surface": "#hex", "text": "#hex", "textMuted": "#hex", "primary": "#hex", "accent": "#hex", "border": "#hex"}`;
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function relLuminance(hex: string): number {
  const c = [1, 3, 5].map((o) => {
    const v = parseInt(hex.slice(o, o + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function parsePaletteFromVision(response: string): ArtDirectionBrief["palette"] | null {
  const parsed = extractJson<Record<string, unknown>>(response);
  if (!parsed) return null;
  const keys = ["bg", "bgAlt", "surface", "text", "textMuted", "primary", "accent", "border"] as const;
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = parsed[k];
    if (typeof v !== "string" || !HEX_RE.test(v.trim())) return null;
    out[k] = v.trim();
  }
  // Нечитабельная палитра хуже фолбэка на арт-дирекшн: контраст-гейт WCAG-ish
  if (contrast(out.text, out.bg) < 4.2) return null;
  if (contrast(out.textMuted, out.bg) < 2.2) return null;
  if (contrast(out.accent, out.bg) < 1.5) return null;
  return out as ArtDirectionBrief["palette"];
}
