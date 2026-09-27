/**
 * Операции над SiteDocument — единственный способ его изменить.
 *
 * Одним и тем же набором операций пользуется и UI редактора, и AI-копайлот
 * (AI отдаёт JSON-массив операций — это дёшево по токенам и валидируется
 * сервером перед применением).
 */

import { blockIndex } from "@/lib/builder/blocks/_registry";
import { genericFamily } from "@/lib/builder/blocks/_tokens";
import { createBlockNode, createPage, uid } from "./create";
import { sanitizeCustomHtml, validateCustomCss } from "./custom";
import { extractDefaultFields } from "./fill";
import { presetSchema, sanitizeBlockFields } from "./schema";
import type { BlockNode, PageNode, RepeatItem, SiteDocument, StyleScope } from "./types";

export type SiteOp =
  // — блоки —
  | { op: "add-block"; pageId?: string; presetId: string; index?: number; variantId?: string; fields?: Record<string, string>; collections?: Record<string, { id?: string; fields: Record<string, string> }[]>; items?: RepeatItem[] }
  | { op: "add-custom-block"; pageId?: string; index?: number; html: string; css: string }
  | { op: "remove-block"; pageId?: string; blockId: string }
  | { op: "move-block"; pageId?: string; blockId: string; toIndex: number }
  | { op: "duplicate-block"; pageId?: string; blockId: string }
  | { op: "replace-block"; pageId?: string; blockId: string; presetId: string; keepFields?: boolean }
  | { op: "set-variant"; pageId?: string; blockId: string; variantId: string }
  | { op: "update-fields"; pageId?: string; blockId: string; fields: Record<string, string> }
  | { op: "set-block-hidden"; pageId?: string; blockId: string; viewport: "desktop" | "tablet" | "mobile"; hidden: boolean }
  // — коллекции —
  | { op: "update-item"; pageId?: string; blockId: string; itemId: string; fields: Record<string, string> }
  | { op: "add-item"; pageId?: string; blockId: string; collection?: string; fields?: Record<string, string>; index?: number }
  | { op: "remove-item"; pageId?: string; blockId: string; itemId: string }
  | { op: "move-item"; pageId?: string; blockId: string; itemId: string; toIndex: number }
  // — стили —
  | { op: "set-style"; pageId?: string; blockId: string; scope?: StyleScope; field?: string; props: Record<string, string> }
  | { op: "reset-style"; pageId?: string; blockId: string; field?: string }
  // — дизайн-система —
  | { op: "set-tokens"; tokens: Record<string, string> }
  | { op: "set-fonts"; heading?: string; body?: string }
  | { op: "set-scene"; scene: SiteDocument["scene"] }
  | { op: "set-cinema"; enabled: boolean }
  | { op: "set-block-surface"; pageId?: string; blockId: string; surface?: "solid" | "transparent" | "veil"; sceneTint?: string | null }
  | { op: "set-block-enter"; pageId?: string; blockId: string; enter: import("./types").EnterTransition }
  | { op: "set-block-palette"; pageId?: string; blockId: string; palette?: Record<string, string> | null }
  // — страницы —
  | { op: "add-page"; title: string; slug?: string }
  | { op: "remove-page"; pageId: string }
  | { op: "rename-page"; pageId: string; title: string }
  | { op: "set-page-slug"; pageId: string; slug: string }
  | { op: "set-active-page"; pageId: string }
  | { op: "set-seo"; pageId?: string; seo: { title?: string; description?: string; ogImage?: string } }
  // — сайт —
  | { op: "rename-site"; name: string }
  | { op: "set-settings"; settings: Partial<SiteDocument["settings"]> }
  | { op: "set-navigation"; headerLinks?: SiteDocument["navigation"]["headerLinks"]; footerLinks?: SiteDocument["navigation"]["footerLinks"] };

export interface ApplyResult {
  doc: SiteDocument;
  applied: number;
  errors: string[];
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function clampNum(n: number, min: number, max: number): number {
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : (min + max) / 2;
}

export function slugify(title: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i",
    й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y",
    ь: "", э: "e", ю: "yu", я: "ya",
  };
  const slug = title
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return slug || "page";
}

function getPage(doc: SiteDocument, pageId?: string): PageNode | null {
  return doc.pages.find((p) => p.id === (pageId || doc.activePageId)) || null;
}

/** Ищет item по id по всем коллекциям блока. */
function findItem(block: BlockNode, itemId: string): { name: string; list: RepeatItem[]; index: number } | null {
  for (const [name, list] of Object.entries(block.collections || {})) {
    const index = list.findIndex((it) => it.id === itemId);
    if (index !== -1) return { name, list, index };
  }
  return null;
}

/** Применяет одну операцию. Мутирует doc (вызывающий клонирует). Кидает Error при невалидной операции. */
function applyOne(doc: SiteDocument, op: SiteOp): void {
  switch (op.op) {
    case "add-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error(`page not found`);
      // Легаси-форма: items без имени коллекции — кладём в первую коллекцию пресета
      let collections = op.collections;
      if (!collections && op.items?.length) {
        const schema = presetSchema(op.presetId);
        const first = schema ? [...schema.collections.keys()][0] : undefined;
        if (first) collections = { [first]: op.items };
      }
      const node = createBlockNode(op.presetId, { variantId: op.variantId, fields: op.fields, collections });
      if (!node) throw new Error(`unknown preset "${op.presetId}"`);
      const index = op.index === undefined ? page.blocks.length : clamp(op.index, 0, page.blocks.length);
      page.blocks.splice(index, 0, node);
      return;
    }
    case "add-custom-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      const html = sanitizeCustomHtml(op.html);
      if (!html) throw new Error("custom html отклонён санитайзером");
      if (!validateCustomCss(op.css)) throw new Error("custom css невалиден (только .cb-* селекторы, без внешних ресурсов)");
      const node: BlockNode = {
        id: uid("b"),
        presetId: "custom",
        fields: extractDefaultFields(html),
        collections: {},
        custom: { html, css: op.css },
      };
      const index = op.index === undefined ? page.blocks.length : clamp(op.index, 0, page.blocks.length);
      page.blocks.splice(index, 0, node);
      return;
    }
    case "remove-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      const i = page.blocks.findIndex((b) => b.id === op.blockId);
      if (i === -1) throw new Error(`block "${op.blockId}" not found`);
      page.blocks.splice(i, 1);
      return;
    }
    case "move-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      const i = page.blocks.findIndex((b) => b.id === op.blockId);
      if (i === -1) throw new Error(`block "${op.blockId}" not found`);
      const [node] = page.blocks.splice(i, 1);
      page.blocks.splice(clamp(op.toIndex, 0, page.blocks.length), 0, node);
      return;
    }
    case "duplicate-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      const i = page.blocks.findIndex((b) => b.id === op.blockId);
      if (i === -1) throw new Error(`block "${op.blockId}" not found`);
      const copy = structuredClone(page.blocks[i]);
      copy.id = uid("blk");
      if (copy.collections) {
        for (const list of Object.values(copy.collections)) {
          for (const item of list) item.id = uid("itm");
        }
      }
      page.blocks.splice(i + 1, 0, copy);
      return;
    }
    case "replace-block": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      const i = page.blocks.findIndex((b) => b.id === op.blockId);
      if (i === -1) throw new Error(`block "${op.blockId}" not found`);
      const old = page.blocks[i];
      const node = createBlockNode(op.presetId, op.keepFields ? { fields: old.fields, collections: old.collections } : undefined);
      if (!node) throw new Error(`unknown preset "${op.presetId}"`);
      page.blocks[i] = node;
      return;
    }
    case "set-variant": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const preset = blockIndex.get(block.presetId);
      if (op.variantId && preset?.variants && !preset.variants.some((v) => v.id === op.variantId)) {
        throw new Error(`unknown variant "${op.variantId}"`);
      }
      block.variantId = op.variantId || undefined;
      return;
    }
    case "update-fields": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      // Bespoke-блок: схема полей выводится из его собственного html
      if (block.custom) {
        const known = new Set(Object.keys(extractDefaultFields(block.custom.html)));
        for (const [k, v] of Object.entries(op.fields)) {
          if (known.has(k.split(":")[0]) && typeof v === "string") block.fields[k] = v;
        }
        return;
      }
      const { fields, dropped } = sanitizeBlockFields(block.presetId, op.fields);
      Object.assign(block.fields, fields);
      if (!Object.keys(fields).length && dropped.length) {
        throw new Error(`unknown fields: ${dropped.join(", ")}`);
      }
      return;
    }
    case "set-block-hidden": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      block.hidden = { ...block.hidden, [op.viewport]: op.hidden };
      return;
    }
    case "update-item": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const found = findItem(block, op.itemId);
      if (!found) throw new Error(`item "${op.itemId}" not found`);
      const allowed = presetSchema(block.presetId)?.collections.get(found.name);
      for (const [key, value] of Object.entries(op.fields)) {
        if (typeof value !== "string") continue;
        if (!allowed || allowed.has(key.split(":")[0])) found.list[found.index].fields[key] = value;
      }
      return;
    }
    case "add-item": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block?.collections) throw new Error(`block "${op.blockId}" has no collections`);
      const names = Object.keys(block.collections);
      const name = op.collection && block.collections[op.collection] ? op.collection : names[0];
      if (!name) throw new Error("block has no collections");
      const list = block.collections[name];
      const template = list[list.length - 1];
      const item = { id: uid("itm"), fields: { ...(template?.fields || {}), ...(op.fields || {}) } };
      const index = op.index === undefined ? list.length : clamp(op.index, 0, list.length);
      list.splice(index, 0, item);
      return;
    }
    case "remove-item": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const found = findItem(block, op.itemId);
      if (!found) throw new Error(`item "${op.itemId}" not found`);
      if (found.list.length <= 1) throw new Error("cannot remove last item");
      found.list.splice(found.index, 1);
      return;
    }
    case "move-item": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const found = findItem(block, op.itemId);
      if (!found) throw new Error(`item "${op.itemId}" not found`);
      const [item] = found.list.splice(found.index, 1);
      found.list.splice(clamp(op.toIndex, 0, found.list.length), 0, item);
      return;
    }
    case "set-style": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const scope = op.scope || "all";
      const field = op.field || "root";
      block.styles = block.styles || {};
      block.styles[scope] = block.styles[scope] || {};
      block.styles[scope]![field] = { ...block.styles[scope]![field], ...op.props };
      return;
    }
    case "reset-style": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      if (!op.field) {
        delete block.styles;
        return;
      }
      for (const scope of Object.keys(block.styles || {})) {
        delete block.styles?.[scope as StyleScope]?.[op.field];
      }
      return;
    }
    case "set-tokens": {
      Object.assign(doc.tokens, op.tokens);
      return;
    }
    case "set-scene": {
      const allowed = new Set(["none", "aurora", "mesh", "field", "liquid", "video"]);
      if (op.scene && !allowed.has(op.scene.type)) throw new Error(`unknown scene type "${op.scene.type}"`);
      if (op.scene && op.scene.type !== "none") {
        const s: NonNullable<SiteDocument["scene"]> = {
          type: op.scene.type,
          intensity: clampNum(op.scene.intensity ?? 0.5, 0, 1),
          grain: !!op.scene.grain,
        };
        if (op.scene.type === "video") {
          if (op.scene.video) s.video = op.scene.video;
          if (op.scene.poster) s.poster = op.scene.poster;
          s.scrub = op.scene.scrub !== false; // по умолчанию скрабим
        }
        doc.scene = s;
      } else {
        doc.scene = undefined;
      }
      return;
    }
    case "set-cinema": {
      doc.cinema = op.enabled ? true : undefined;
      return;
    }
    case "set-block-surface": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      if (op.surface !== undefined) {
        if (op.surface === "solid") delete block.surface;
        else block.surface = op.surface;
      }
      if (op.sceneTint !== undefined) {
        if (op.sceneTint) block.sceneTint = op.sceneTint;
        else delete block.sceneTint;
      }
      return;
    }
    case "set-block-enter": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      const allowed = new Set(["none", "fade", "slide-left", "slide-right", "rise", "fall", "zoom-in", "zoom-through", "rotate"]);
      if (!allowed.has(op.enter)) throw new Error(`unknown enter "${op.enter}"`);
      if (op.enter === "none") delete block.enter;
      else block.enter = op.enter;
      return;
    }
    case "set-block-palette": {
      const block = getPage(doc, op.pageId)?.blocks.find((b) => b.id === op.blockId);
      if (!block) throw new Error(`block "${op.blockId}" not found`);
      if (!op.palette) { delete block.palette; return; }
      // только валидные css-токены (--color-*, --font-*) с безопасными значениями
      const clean: Record<string, string> = {};
      for (const [k, v] of Object.entries(op.palette)) {
        if (/^--[a-z0-9-]+$/i.test(k) && typeof v === "string" && v.length < 60 && !/[;{}]/.test(v)) clean[k] = v;
      }
      if (Object.keys(clean).length) block.palette = clean;
      else delete block.palette;
      return;
    }
    case "set-fonts": {
      if (op.heading) doc.fonts.heading = op.heading;
      if (op.body) doc.fonts.body = op.body;
      if (op.heading) doc.tokens["--font-heading"] = `'${op.heading}', ${genericFamily(op.heading)}`;
      if (op.body) doc.tokens["--font-body"] = `'${op.body}', ${genericFamily(op.body)}`;
      return;
    }
    case "add-page": {
      const page = createPage(op.title, op.slug || `/${slugify(op.title)}`);
      doc.pages.push(page);
      doc.navigation.headerLinks.push({ id: uid("nav"), label: op.title, pageId: page.id });
      doc.activePageId = page.id;
      return;
    }
    case "remove-page": {
      if (doc.pages.length <= 1) throw new Error("cannot remove last page");
      const i = doc.pages.findIndex((p) => p.id === op.pageId);
      if (i === -1) throw new Error("page not found");
      doc.pages.splice(i, 1);
      doc.navigation.headerLinks = doc.navigation.headerLinks.filter((l) => l.pageId !== op.pageId);
      doc.navigation.footerLinks = doc.navigation.footerLinks.filter((l) => l.pageId !== op.pageId);
      if (doc.activePageId === op.pageId) doc.activePageId = doc.pages[0].id;
      return;
    }
    case "rename-page": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      page.title = op.title;
      page.seo.title = page.seo.title || op.title;
      for (const link of [...doc.navigation.headerLinks, ...doc.navigation.footerLinks]) {
        if (link.pageId === op.pageId) link.label = op.title;
      }
      return;
    }
    case "set-page-slug": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      if (!page.isHome) page.slug = op.slug.startsWith("/") ? op.slug : `/${op.slug}`;
      return;
    }
    case "set-active-page": {
      if (!doc.pages.some((p) => p.id === op.pageId)) throw new Error("page not found");
      doc.activePageId = op.pageId;
      return;
    }
    case "set-seo": {
      const page = getPage(doc, op.pageId);
      if (!page) throw new Error("page not found");
      Object.assign(page.seo, op.seo);
      return;
    }
    case "rename-site": {
      doc.name = op.name;
      return;
    }
    case "set-settings": {
      Object.assign(doc.settings, op.settings);
      return;
    }
    case "set-navigation": {
      if (op.headerLinks) doc.navigation.headerLinks = op.headerLinks;
      if (op.footerLinks) doc.navigation.footerLinks = op.footerLinks;
      return;
    }
  }
}

/**
 * Применяет операции к документу. Возвращает новый документ (исходный не
 * мутируется). Невалидные операции пропускаются и попадают в errors.
 */
export function applyOps(doc: SiteDocument, ops: SiteOp[]): ApplyResult {
  const next = structuredClone(doc);
  const errors: string[] = [];
  let applied = 0;
  for (const op of ops) {
    try {
      applyOne(next, op);
      applied++;
    } catch (err) {
      errors.push(`${op.op}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return { doc: next, applied, errors };
}
