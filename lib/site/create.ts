import { blockIndex } from "@/lib/builder/blocks/_registry";
import { TOKEN_DEFAULTS } from "@/lib/builder/blocks/_tokens";
import { extractDefaultCollections, extractDefaultFields, hasCollection } from "./fill";
import { sanitizeBlockFields, sanitizeCollections } from "./schema";
import type { BlockNode, PageNode, RepeatItem, SiteDocument } from "./types";

let counter = 0;
export function uid(prefix = "n"): string {
  counter = (counter + 1) % 1296;
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36).padStart(2, "0")}${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Создаёт BlockNode из пресета: заглушки шаблона становятся реальными данными
 * (fields + collections), дальше шаблон — только разметка.
 * Переданные overrides валидируются по схеме пресета — мусор отбрасывается.
 */
export function createBlockNode(
  presetId: string,
  overrides?: {
    variantId?: string;
    fields?: Record<string, string>;
    collections?: Record<string, { id?: string; fields: Record<string, string> }[]>;
  },
): BlockNode | null {
  const preset = blockIndex.get(presetId);
  if (!preset) return null;
  const { fields: safeFields } = sanitizeBlockFields(presetId, overrides?.fields);
  const node: BlockNode = {
    id: uid("blk"),
    presetId,
    variantId: overrides?.variantId,
    fields: { ...extractDefaultFields(preset.html), ...safeFields },
  };
  if (hasCollection(preset.html)) {
    const defaults = extractDefaultCollections(preset.html, () => uid("itm"));
    const { collections: safe } = sanitizeCollections(presetId, overrides?.collections, () => uid("itm"));
    // Переданные коллекции заменяют дефолтные; остальные остаются с заглушками
    node.collections = { ...defaults };
    for (const [name, items] of Object.entries(safe)) {
      if (items.length) node.collections[name] = items;
    }
  }
  return node;
}

/**
 * Миграция и нормализация документа: легаси-`items` переезжают в первую
 * коллекцию пресета. Безопасно вызывать на каждом входе документа в систему.
 */
export function normalizeDocument(doc: SiteDocument): SiteDocument {
  for (const page of doc.pages) {
    for (const block of page.blocks) {
      // Bespoke-блок: схема живёт в его собственном html, пресетной чистке не подлежит
      if (block.custom) {
        block.fields = { ...extractDefaultFields(block.custom.html), ...block.fields };
        delete block.items;
        continue;
      }
      if (block.items?.length && !block.collections) {
        const preset = blockIndex.get(block.presetId);
        if (preset) {
          const names = Object.keys(extractDefaultCollections(preset.html, () => "x"));
          if (names.length) {
            block.collections = { [names[0]]: block.items };
          }
        }
        delete block.items;
      }
      if (block.collections) {
        for (const items of Object.values(block.collections)) {
          for (const item of items) if (!item.id) item.id = uid("itm");
        }
      }
      // Чистим накопившийся мусор: поля, которых нет в схеме пресета
      const { fields } = sanitizeBlockFields(block.presetId, block.fields);
      block.fields = { ...extractDefaultsFor(block.presetId), ...fields };
      // Коллекции, которых нет в шаблоне, выбрасываем; известные — фильтруем по полям.
      // Если у пресета есть коллекции, а у блока их нет — заводим дефолтные.
      const preset = blockIndex.get(block.presetId);
      if (preset && hasCollection(preset.html)) {
        const { collections } = sanitizeCollections(block.presetId, block.collections, () => uid("itm"));
        const defaults = extractDefaultCollections(preset.html, () => uid("itm"));
        block.collections = { ...defaults, ...Object.fromEntries(Object.entries(collections).filter(([, v]) => v.length)) };
      } else {
        delete block.collections;
      }
    }
  }
  return doc;
}

export function createPage(title: string, slug: string, isHome = false): PageNode {
  return {
    id: uid("pg"),
    title,
    slug,
    seo: { title, description: "" },
    blocks: [],
    isHome,
    showInNavigation: !isHome,
  };
}

export function createEmptyDocument(name = "Новый сайт"): SiteDocument {
  const home = createPage("Главная", "/", true);
  return {
    version: 3,
    name,
    activePageId: home.id,
    pages: [home],
    navigation: {
      headerLinks: [{ id: uid("nav"), label: "Главная", pageId: home.id }],
      footerLinks: [],
    },
    tokens: { ...TOKEN_DEFAULTS },
    fonts: { heading: "Manrope", body: "Onest" },
    settings: {},
  };
}

function extractDefaultsFor(presetId: string): Record<string, string> {
  const preset = blockIndex.get(presetId);
  return preset ? extractDefaultFields(preset.html) : {};
}

export function isSiteDocument(value: unknown): value is SiteDocument {
  const doc = value as SiteDocument | null;
  return !!doc && doc.version === 3 && Array.isArray(doc.pages) && typeof doc.activePageId === "string";
}
