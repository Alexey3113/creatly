/**
 * Схема пресета, выведенная из его HTML: какие поля блочные, какие живут
 * в коллекциях. Используется для валидации всего, что приходит от AI и UI —
 * незнакомые поля отбрасываются, а не копятся мусором в документе.
 */

import { blockIndex } from "@/lib/builder/blocks/_registry";
import { extractDefaultCollections, extractDefaultFields } from "./fill";
import type { RepeatItem } from "./types";

export interface PresetSchema {
  /** Имена блочных полей (вне коллекций). */
  blockFields: Set<string>;
  /** Имя коллекции -> имена полей item'а. */
  collections: Map<string, Set<string>>;
}

const cache = new Map<string, PresetSchema>();

export function presetSchema(presetId: string): PresetSchema | null {
  const cached = cache.get(presetId);
  if (cached) return cached;
  const preset = blockIndex.get(presetId);
  if (!preset) return null;
  const blockFields = new Set(Object.keys(extractDefaultFields(preset.html)));
  const collections = new Map<string, Set<string>>();
  const defaults = extractDefaultCollections(preset.html, () => "x");
  for (const [name, items] of Object.entries(defaults)) {
    const fields = new Set<string>();
    for (const item of items) for (const key of Object.keys(item.fields)) fields.add(key);
    collections.set(name, fields);
  }
  const schema = { blockFields, collections };
  cache.set(presetId, schema);
  return schema;
}

/** Оставляет только известные схеме блочные поля (плюс :href/:alt-подполя). */
export function sanitizeBlockFields(
  presetId: string,
  fields: Record<string, string> | undefined,
): { fields: Record<string, string>; dropped: string[] } {
  const schema = presetSchema(presetId);
  const out: Record<string, string> = {};
  const dropped: string[] = [];
  for (const [key, value] of Object.entries(fields || {})) {
    if (typeof value !== "string") continue;
    const base = key.split(":")[0];
    if (schema?.blockFields.has(base)) out[key] = value;
    else dropped.push(key);
  }
  return { fields: out, dropped };
}

/** Фильтрует данные коллекций по схеме: незнакомые коллекции/поля отбрасываются. */
export function sanitizeCollections(
  presetId: string,
  collections: Record<string, { id?: string; fields: Record<string, string> }[]> | undefined,
  uid: () => string,
): { collections: Record<string, RepeatItem[]>; dropped: string[] } {
  const schema = presetSchema(presetId);
  const out: Record<string, RepeatItem[]> = {};
  const dropped: string[] = [];
  for (const [name, items] of Object.entries(collections || {})) {
    const fieldSet = schema?.collections.get(name);
    if (!fieldSet) { dropped.push(name); continue; }
    if (!Array.isArray(items)) continue;
    out[name] = items
      .filter((it) => it && typeof it.fields === "object")
      .slice(0, 24)
      .map((it) => {
        const fields: Record<string, string> = {};
        for (const [key, value] of Object.entries(it.fields)) {
          if (typeof value !== "string") continue;
          const base = key.split(":")[0];
          if (fieldSet.has(base)) fields[key] = value;
          else dropped.push(`${name}.${key}`);
        }
        return { id: it.id || uid(), fields };
      });
  }
  return { collections: out, dropped };
}

/** Является ли поле картинкой (по спецификации пресета). */
export function isImageField(presetId: string, fieldName: string): boolean {
  const preset = blockIndex.get(presetId);
  return preset?.fields.find((f) => f.name === fieldName)?.type === "image";
}
