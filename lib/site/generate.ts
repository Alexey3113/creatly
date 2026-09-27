/**
 * AI-генерация сайта: бриф -> SiteDocument.
 *
 * Двухшаговый выбор для экономии токенов:
 *  B1 — модель видит только обзор каталога (1 строка на блок) и выбирает id;
 *  B2 — модель видит схемы полей ТОЛЬКО выбранных блоков и пишет контент.
 * HTML блоков модель не видит никогда.
 */

import type { ArtDirectionBrief } from "@/lib/ai/art-direction";
import { tokensFromArtDirection } from "@/lib/builder/blocks/_tokens";
import { blockIndex } from "@/lib/builder/blocks/_registry";
import { blocksDetail, catalogOverview, extractJson } from "./catalog";
import { createEmptyDocument } from "./create";
import { applyOps, type SiteOp } from "./ops";
import { isImageField, presetSchema } from "./schema";
import { blueprintById, blueprints, blueprintSpinePrompt } from "@/lib/ai/blueprints";
import { stockThemeById, type StockTheme } from "./stock";
import type { BlockNode, EnterTransition, SiteDocument } from "./types";

/**
 * Режим генерации, который пользователь выбирает перед стартом:
 *  classic — обычный конверсионный лендинг со спокойной хореографией;
 *  story — сайт-история: постерный hero, storytelling-блоки, живая сцена,
 *          смелые переходы секций (наша «визитная карточка»).
 */
export type GenerationMode = "classic" | "story";

// ── B1: выбор блоков ──

/** Подсказки по фирменным wow-блокам — когда какой уместен (для обоих режимов). */
const WOW_HINTS = `- фирменные wow-блоки (используй 2-3 там, где уместно по смыслу):
  story-chapters-01 — бесшовные кино-главы: полноэкранные сцены с гигантским словом, следующая накрывает предыдущую рваным краем; идеален как центральный нарратив (3-4 главы = этапы/ценности/путь клиента)
  gallery-coverflow-01 — 3D-карусель фото под углом: портфолио, товары, интерьеры, автомобили
  gallery-reveal-01 — фото проявляется под курсором: премиум/креатив
  story-highlight-01 — манифест, строки подсвечиваются по мере скролла: философия/ценности бренда
  features-tilt-01 — карточки с 3D-наклоном за курсором: диджитал-продукты
  features-glow-01 / testimonials-cinematic-01 — тёмные киношные секции: премиум на тёмной базе
  hero-poster-01 / hero-statement-01 — полноэкранный постер с гигантской типографикой: смелые бренды`;

export function buildSelectionPrompt(brief: string, ad: ArtDirectionBrief, scrapedContext?: string, mode: GenerationMode = "classic"): string {
  // Story-режим = сайт-фильм, но КАКОЙ формат — решает blueprint из арт-дирекшна
  // (пролёт / объект-в-фокусе / кинетический текст / сетка). Так сайты
  // перестают быть однотипными: разный hero, набор, порядок и движение.
  const bp = mode === "story" ? blueprintById(ad.blueprintId) || blueprints[0] : null;
  const storyRules = bp
    ? `\n## Формат сайта: ${bp.name}
${bp.rhythm}
Собери секции ПО ЭТОМУ ПЛАНУ (роль → кандидаты, бери по одному блоку на роль в этом порядке):
${blueprintSpinePrompt(bp)}
- header первым (header-transparent-01 для полноэкранного hero), footer последним
- НЕ подмешивай механики другого формата (напр. не бери сквозной видео-пролёт, если формат — кинетический журнал)`
    : "";
  return `Ты — арт-директор, собирающий лендинг из готовых блоков.

## Бриф клиента
${brief}
${scrapedContext ? `\n${scrapedContext}` : ""}

## Утверждённая концепция
Стиль: ${ad.stylePackId}. ${ad.concept}
Настроение: ${ad.mood}
Порядок секций: ${ad.sections.join(" → ")}

## Каталог блоков
${catalogOverview()}

## Задача
Выбери ${mode === "story" ? "8-11" : "8-11"} блоков${bp ? " по плану формата" : " под порядок секций концепции"}. Правила:
- первым — ровно один header (для полноэкранных фото/видео-hero бери header-transparent-01, для конверсионных сайтов — header-cta-01, иначе header-minimal-01)
- затем ровно один hero, последним — один footer
- [collection] — блоки со списками (товары, отзывы, FAQ): выбирай их для перечислимого контента
- [gsap]/[webgl] — киношные анимированные блоки: используй для премиальных концепций
${WOW_HINTS}
- не бери два блока одной субкатегории${storyRules}

Ответ — СТРОГО JSON: {"blocks": ["block-id-1", "block-id-2", ...]}`;
}

/** Категории, которых на странице может быть максимум одна (модель иногда берёт два hero). */
const SINGLETON_CATEGORIES = new Set(["header", "hero", "footer"]);

export function parseSelection(response: string): string[] | null {
  const parsed = extractJson<{ blocks?: unknown }>(response);
  if (!parsed) return null;
  const ids = Array.isArray(parsed.blocks) ? parsed.blocks.filter((b): b is string => typeof b === "string") : [];
  const seen = new Set<string>();
  const valid = ids.filter((id) => {
    if (!blockIndex.has(id)) return false;
    const category = blockIndex.get(id)!.category;
    if (!SINGLETON_CATEGORIES.has(category)) return true;
    if (seen.has(category)) return false;
    seen.add(category);
    return true;
  });
  return valid.length >= 3 ? valid : null;
}

// ── B2: контент ──

export interface ContentManifestBlock {
  presetId: string;
  variantId?: string;
  fields?: Record<string, string>;
  collections?: Record<string, { fields: Record<string, string> }[]>;
}

export function buildContentPrompt(brief: string, ad: ArtDirectionBrief, presetIds: string[], scrapedContext?: string): string {
  return `Ты — копирайтер и контент-дизайнер премиум веб-студии.

## Бриф клиента
${brief}
${scrapedContext ? `\n${scrapedContext}` : ""}

## Концепция
${ad.concept}
Тон текстов: ${ad.copyTone}

## Выбранные блоки и их поля
${blocksDetail(presetIds)}

## Задача
Для КАЖДОГО блока (в том же порядке) заполни поля реальным конкретным контентом из брифа: цифры, названия, факты. Никаких placeholder'ов и "Lorem". Язык = язык брифа.
- В heading-полях можно выделить 1-2 ключевых слова курсивом: *слово* (особенно в манифестах, цитатах и постерах — это фирменный editorial-приём).
- У блоков с коллекциями заполняй "collections" по именам коллекций из схемы (3-6 items, сколько уместно по контенту).
- У story-chapters-01 — СТРОГО 3-4 главы: каждая глава дорогая (свой фон-сцена и объекты), больше = хуже.
- У story-chapters-01 ОБЯЗАТЕЛЬНО заполняй item-поле "chp-comp" — режиссура композиции главы: "word=pos,size; a=pos,scale,rot; b=...; c=..." (pos слова/объектов: lb|lt|rb|rt|c|cb|ct; size: xl|xxl|mega; scale 0.6-1.6; rot -15..15). Композиции глав ДОЛЖНЫ отличаться: разные позиции слова, разные раскладки объектов — одинаковые главы = провал.
- Тексты CTA-кнопок в разных блоках НЕ повторяй дословно: варьируй действие («Попробовать бесплатно» / «Начать сейчас» / «Запросить демо»).
- Используй ТОЛЬКО имена полей из схемы — незнакомые поля будут отброшены.
- Поля-image НЕ заполняй никогда (картинки подставляются отдельно), кроме случая когда в брифе даны конкретные URL.
- variantId выбери из списка вариантов блока под настроение концепции (или пропусти).

Ответ — СТРОГО JSON:
{"blocks": [{"presetId": "...", "variantId": "...", "fields": {"имя-поля": "значение"}, "collections": {"имя-коллекции": [{"fields": {...}}, ...]}}]}`;
}

export function parseContentManifest(response: string, expectedIds: string[]): ContentManifestBlock[] | null {
  const parsed = extractJson<{ blocks?: ContentManifestBlock[] }>(response);
  if (!parsed || !Array.isArray(parsed.blocks)) return null;
  const blocks = parsed.blocks.filter((b) => b && typeof b.presetId === "string" && blockIndex.has(b.presetId));
  if (blocks.length < 3) return null;
  // Если модель потеряла блоки — добираем пустыми (дефолты пресета)
  const present = new Set(blocks.map((b) => b.presetId));
  for (const id of expectedIds) {
    if (!present.has(id)) blocks.push({ presetId: id });
  }
  return blocks;
}

// ── Сборка документа ──

export function buildDocumentFromManifest(
  name: string,
  manifest: ContentManifestBlock[],
  ad: ArtDirectionBrief,
  mode: GenerationMode = "classic",
): SiteDocument {
  let doc = createEmptyDocument(name);
  doc.tokens = tokensFromArtDirection(ad);
  doc.fonts = { heading: ad.typography.heading, body: ad.typography.body };

  const ops: SiteOp[] = manifest.map((block) => ({
    op: "add-block",
    presetId: block.presetId,
    variantId: block.variantId,
    fields: stripImageFields(block.presetId, sanitizeFields(block.fields)),
    collections: sanitizeManifestCollections(block.presetId, block.collections),
  }));
  const result = applyOps(doc, ops);
  doc = result.doc;
  doc.pages[0].seo = { title: name, description: "" };
  assignStockImages(doc, stockThemeById(ad.imageTheme));

  // Сцена из арт-дирекшна: живой фон сайта + прозрачность лёгких секций.
  // В режиме истории сцена обязательна — если арт-директор её не выбрал,
  // берём тип по характеру направления.
  const sceneTypes = new Set(["aurora", "mesh", "field", "liquid"]);
  const sceneType = ad.scene && sceneTypes.has(ad.scene)
    ? ad.scene
    : mode === "story" ? STORY_SCENE_BY_PACK[ad.stylePackId] || "aurora" : undefined;
  if (sceneType) {
    doc.scene = { type: sceneType as NonNullable<SiteDocument["scene"]>["type"], intensity: 0.5, grain: true };
    applySceneSurfaces(doc);
  }
  applyChoreography(doc, ad, mode);
  // Режиссура тела: ритм свет/тьма — светлые секции-передышки и акцентный
  // удар посреди тёмного кино-сайта (уход от тёмно-однотипного хвоста).
  if (mode === "story") applyPaletteRhythm(doc, ad);
  return doc;
}

// ── Палитровый ритм тела: свет/тьма/акцент по секциям ──

function hexRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function toHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function scale(hex: string, f: number): string {
  const rgb = hexRgb(hex);
  if (!rgb) return hex;
  return f < 1 ? toHex(rgb[0] * f, rgb[1] * f, rgb[2] * f)
    : toHex(rgb[0] + (255 - rgb[0]) * (f - 1), rgb[1] + (255 - rgb[1]) * (f - 1), rgb[2] + (255 - rgb[2]) * (f - 1));
}
function luminance(hex: string): number {
  const rgb = hexRgb(hex);
  if (!rgb) return 0.5;
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}
/** Тёплый ли акцент (для выбора кремовой vs холодной светлой передышки). */
function isWarm(hex: string): boolean {
  const rgb = hexRgb(hex);
  if (!rgb) return true;
  return rgb[0] >= rgb[2]; // красного больше синего = тёплый
}

/** Светлая палитра-передышка, выведенная из акцента бренда. */
function deriveLightPalette(ad: ArtDirectionBrief): Record<string, string> {
  const warm = isWarm(ad.palette.accent);
  return {
    "--color-bg": warm ? "#f4efe6" : "#eef1f6",
    "--color-bg-alt": warm ? "#ebe1d1" : "#e3e8ef",
    "--color-surface": "#ffffff",
    "--color-text": "#1e1b16",
    "--color-text-muted": warm ? "#6f6656" : "#5f6672",
    "--color-primary": ad.palette.primary,
    "--color-accent": ad.palette.accent,
    "--color-border": warm ? "#ddd3c4" : "#dbe0e8",
    "--color-text-on-primary": "#ffffff",
    "--color-text-on-accent": "#ffffff",
  };
}
/** Акцентная палитра — брендовый акцент как фон секции (сильный удар). */
function deriveAccentPalette(ad: ArtDirectionBrief): Record<string, string> {
  const a = ad.palette.accent;
  const onAccent = luminance(a) > 0.55 ? "#1a1206" : "#fff8ef";
  return {
    "--color-bg": a,
    "--color-bg-alt": scale(a, 0.85),
    "--color-surface": scale(a, 1.1),
    "--color-text": onAccent,
    "--color-text-muted": luminance(a) > 0.55 ? "rgba(26,18,6,.7)" : "rgba(255,248,239,.75)",
    "--color-primary": a,
    "--color-accent": onAccent,
    "--color-border": luminance(a) > 0.55 ? "rgba(26,18,6,.2)" : "rgba(255,255,255,.22)",
    "--color-text-on-primary": onAccent,
    "--color-text-on-accent": a,
  };
}

/** Категории кинематографичного тёмного «первого акта» — их не трогаем. */
const CINEMATIC_CATS = new Set(["header", "footer", "hero", "story"]);

/**
 * Раздаёт палитры телу сайта по ритму: светлые секции-передышки чередуются
 * с тёмными, CTA получает акцентный удар. Прозрачные над-сценой секции не
 * трогаем (там разнообразие даёт сама сцена).
 */
export function applyPaletteRhythm(doc: SiteDocument, ad: ArtDirectionBrief): void {
  const light = deriveLightPalette(ad);
  const accent = deriveAccentPalette(ad);
  for (const page of doc.pages) {
    const eligible = page.blocks.filter((b) => {
      const cat = blockIndex.get(b.presetId)?.category || "";
      if (CINEMATIC_CATS.has(cat)) return false;
      if (b.surface === "transparent" || b.surface === "veil") return false;
      return true;
    });
    let lightNext = true; // первая body-секция — светлая передышка после тёмного hero
    for (const b of eligible) {
      const cat = blockIndex.get(b.presetId)?.category;
      if (cat === "cta") { b.palette = accent; continue; }
      if (lightNext) b.palette = light;
      lightNext = !lightNext;
    }
  }
}

// ── Хореография: переходы секций и морфинг сцены из арт-дирекшна ──

/** Сцена по умолчанию для режима истории, если арт-директор выбрал none. */
const STORY_SCENE_BY_PACK: Record<string, string> = {
  editorial: "aurora",
  brutalist: "mesh",
  "warm-organic": "liquid",
  "tech-minimal": "field",
  "luxury-serif": "aurora",
  "bold-expressive": "mesh",
};

/** Палитра enter-переходов по характеру направления (порядок = ритм страницы). */
const PACK_ENTERS: Record<string, EnterTransition[]> = {
  editorial: ["fade", "rise"],
  brutalist: ["slide-left", "slide-right", "rise"],
  "warm-organic": ["rise", "fade"],
  "tech-minimal": ["rise", "zoom-in", "fade"],
  "luxury-serif": ["fade", "rise"],
  "bold-expressive": ["zoom-through", "slide-left", "slide-right", "rise"],
};

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/;

/**
 * «Режиссура» сгенерированного сайта: раздаёт блокам enter-переходы в языке
 * движения выбранного направления и расставляет sceneTint по ключевым точкам
 * (середина — primary, CTA — accent), чтобы фон-сцена морфился по мере скролла.
 * Header/hero/story-блоки не трогаем: первый экран показывается мгновенно,
 * story-блоки ставят движение сами (pin/scrub).
 */
export function applyChoreography(doc: SiteDocument, ad: ArtDirectionBrief, mode: GenerationMode = "classic"): void {
  let enters = PACK_ENTERS[ad.stylePackId] || ["rise", "fade"];
  // Режим истории смелее: спокойным направлениям добавляем один «пролёт»
  if (mode === "story" && !enters.includes("zoom-through")) enters = [...enters, "zoom-through"];

  for (const page of doc.pages) {
    let i = 0;
    const tintable: BlockNode[] = [];
    for (const block of page.blocks) {
      const category = blockIndex.get(block.presetId)?.category || "";
      if (category === "header" || category === "hero" || category === "story") continue;
      if (!block.enter) {
        block.enter = category === "footer" ? "fade" : enters[i % enters.length];
      }
      if (category !== "footer") tintable.push(block);
      i++;
    }
    // Морфинг сцены: середина страницы уходит в primary, CTA возвращает accent
    if (doc.scene && doc.scene.type !== "none" && tintable.length >= 3) {
      const mid = tintable[Math.floor(tintable.length / 2)];
      if (!mid.sceneTint && HEX_RE.test(ad.palette.primary)) mid.sceneTint = ad.palette.primary;
      const cta = [...tintable].reverse().find((b) => blockIndex.get(b.presetId)?.category === "cta");
      if (cta && cta !== mid && !cta.sceneTint && HEX_RE.test(ad.palette.accent)) cta.sceneTint = ad.palette.accent;
    }
  }
}

/** Категории, которым безопасно просвечивать сцену (текст на var(--color-bg)). */
const SCENE_FRIENDLY = new Set(["features", "faq", "steps", "testimonials", "case-studies", "comparison", "pricing"]);

/**
 * Раздаёт поверхности блокам: каждая вторая «лёгкая» секция становится
 * прозрачной над сценой — сайт дышит, но текст остаётся читаемым
 * (карточки блоков сохраняют свои surface-подложки).
 */
export function applySceneSurfaces(doc: SiteDocument): void {
  for (const page of doc.pages) {
    let toggle = 0;
    for (const block of page.blocks) {
      const preset = blockIndex.get(block.presetId);
      if (!preset || !SCENE_FRIENDLY.has(preset.category)) continue;
      if (block.variantId && /dark|primary|accent|brand/.test(block.variantId)) continue;
      if (toggle++ % 2 === 0) block.surface = "transparent";
    }
  }
}

const PORTRAIT_CATEGORIES = new Set(["team", "testimonials"]);
const HERO_CATEGORIES = new Set(["hero", "story", "gallery"]);
const PORTRAIT_FIELD_RE = /avatar|photo|portrait|face|author/i;
const VIDEO_VALUE_RE = /\.(mp4|webm|mov)(\?|#|$)/i;

/**
 * Раскладывает живые стоковые фото по всем image-полям документа:
 * портреты — в команды/отзывы, атмосферные — в hero/истории, остальное —
 * из карточного пула. Round-robin, чтобы фото не повторялись на странице.
 */
export function assignStockImages(doc: SiteDocument, theme: StockTheme): void {
  const counters = { hero: 0, card: 0, portrait: 0 };
  const pick = (pool: keyof typeof counters): string => {
    const list = theme[pool];
    return list[counters[pool]++ % list.length];
  };
  const poolFor = (block: BlockNode, fieldName: string): keyof typeof counters => {
    const preset = blockIndex.get(block.presetId);
    if (PORTRAIT_FIELD_RE.test(fieldName) || PORTRAIT_CATEGORIES.has(preset?.category || "")) return "portrait";
    if (HERO_CATEGORIES.has(preset?.category || "")) return "hero";
    return "card";
  };
  // Идём по СХЕМЕ пресета, а не по имеющимся ключам: AI-item'ы приходят
  // без image-полей, и их нужно не пропустить, а заполнить.
  const fill = (block: BlockNode, fields: Record<string, string>, names: Iterable<string>) => {
    for (const name of names) {
      if (!isImageField(block.presetId, name)) continue;
      const value = fields[name] || "";
      if (isTrustedImageUrl(value) || VIDEO_VALUE_RE.test(value)) continue;
      fields[name] = pick(poolFor(block, name));
    }
  };
  for (const page of doc.pages) {
    for (const block of page.blocks) {
      const schema = presetSchema(block.presetId);
      if (!schema) continue;
      fill(block, block.fields, schema.blockFields);
      for (const [collName, items] of Object.entries(block.collections || {})) {
        const itemFields = schema.collections.get(collName);
        if (!itemFields) continue;
        for (const item of items) fill(block, item.fields, itemFields);
      }
    }
  }
}

function sanitizeFields(fields?: Record<string, string>): Record<string, string> | undefined {
  if (!fields) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v === "string" && v.trim()) out[k] = v;
  }
  return out;
}

/**
 * AI не может подставлять свои URL картинок — они почти всегда мёртвые.
 * Разрешаем только загруженные пользователем файлы (/uploads/, /api/media).
 */
function stripImageFields(presetId: string, fields?: Record<string, string>): Record<string, string> | undefined {
  if (!fields) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (isImageField(presetId, k.split(":")[0]) && !isTrustedImageUrl(v)) continue;
    out[k] = v;
  }
  return out;
}

export function isTrustedImageUrl(url: string): boolean {
  return url.startsWith("/uploads/") || url.startsWith("/api/media") || url.startsWith("data:image/");
}

function sanitizeManifestCollections(
  presetId: string,
  collections?: Record<string, { fields: Record<string, string> }[]>,
): Record<string, { fields: Record<string, string> }[]> | undefined {
  if (!collections) return undefined;
  const out: Record<string, { fields: Record<string, string> }[]> = {};
  for (const [name, items] of Object.entries(collections)) {
    if (!Array.isArray(items)) continue;
    out[name] = items
      .filter((it) => it && typeof it.fields === "object")
      .slice(0, 12)
      .map((it) => ({ fields: stripImageFields(presetId, sanitizeFields(it.fields)) || {} }));
  }
  return out;
}
