/**
 * AI-интерфейс к библиотеке блоков и документу.
 *
 * Принцип экономии токенов: AI никогда не видит HTML блоков.
 * Он работает с двумя уровнями:
 *  1. обзор каталога — одна строка на блок (id, имя, теги);
 *  2. детали конкретных блоков — схема полей с подсказками.
 * Документ описывается компактным outline'ом (значения полей обрезаются).
 */

import { blockIndex, blockPresets } from "@/lib/builder/blocks/_registry";
import type { BlockPreset } from "@/lib/builder/blocks/_types";
import { hasCollection } from "./fill";
import { presetSchema } from "./schema";
import type { SiteDocument } from "./types";

/** Обзор каталога: сгруппированный по категориям однострочный список. */
export function catalogOverview(categories?: string[]): string {
  const byCategory = new Map<string, BlockPreset[]>();
  for (const preset of blockPresets) {
    if (categories?.length && !categories.includes(preset.category)) continue;
    const list = byCategory.get(preset.category) || [];
    list.push(preset);
    byCategory.set(preset.category, list);
  }
  const sections: string[] = [];
  for (const [category, presets] of byCategory) {
    const lines = presets.map((p) => {
      const coll = hasCollection(p.html) ? " [collection]" : "";
      const motion = p.motionLevel !== "css" ? ` [${p.motionLevel}]` : "";
      return `- ${p.id} — ${p.name} (${p.subcategory}; ${p.tags.slice(0, 5).join(", ")})${coll}${motion}`;
    });
    sections.push(`### ${category}\n${lines.join("\n")}`);
  }
  return sections.join("\n\n");
}

/** Детальная схема полей выбранных блоков: блочные поля и коллекции раздельно. */
export function blocksDetail(presetIds: string[]): string {
  const parts: string[] = [];
  for (const id of presetIds) {
    const preset = blockIndex.get(id);
    if (!preset) continue;
    const schema = presetSchema(id);
    const hintOf = (name: string) => preset.fields.find((f) => f.name === name);
    const line = (name: string) => {
      const spec = hintOf(name);
      return `  - ${name}${spec ? ` (${spec.type}${spec.required ? ", required" : ""}): ${spec.hint}` : ""}`;
    };

    const blockFieldLines = [...(schema?.blockFields || [])].map(line).join("\n");
    const collectionParts: string[] = [];
    for (const [name, fieldSet] of schema?.collections || []) {
      collectionParts.push(`  коллекция "${name}" (items с полями):\n${[...fieldSet].map((f) => `  ${line(f)}`).join("\n")}`);
    }
    const variants = preset.variants?.length
      ? `\n  варианты: ${preset.variants.map((v) => v.id).join(" | ")}`
      : "";
    parts.push(
      `## ${preset.id} — ${preset.name}\n${blockFieldLines}${collectionParts.length ? "\n" + collectionParts.join("\n") : ""}${variants}`,
    );
  }
  return parts.join("\n\n");
}

/** Компактный outline документа для промпта копайлота. */
export function describeDocument(doc: SiteDocument, opts: { maxValueLen?: number } = {}): string {
  const maxLen = opts.maxValueLen ?? 80;
  const trunc = (s: string) => (s.length > maxLen ? s.slice(0, maxLen) + "…" : s);
  const lines: string[] = [`Сайт: "${doc.name}". Страницы:`];
  for (const page of doc.pages) {
    const active = page.id === doc.activePageId ? " (активная)" : "";
    lines.push(`\n# Страница "${page.title}" pageId=${page.id} slug=${page.slug}${active}`);
    page.blocks.forEach((block, i) => {
      const preset = blockIndex.get(block.presetId);
      lines.push(`${i + 1}. blockId=${block.id} preset=${block.presetId} (${preset?.name || "?"})${block.variantId ? ` variant=${block.variantId}` : ""}`);
      for (const [k, v] of Object.entries(block.fields)) {
        lines.push(`   ${k}: "${trunc(v)}"`);
      }
      for (const [name, items] of Object.entries(block.collections || {})) {
        lines.push(`   коллекция "${name}":`);
        items.forEach((item, j) => {
          const summary = Object.entries(item.fields)
            .map(([k, v]) => `${k}="${trunc(v)}"`)
            .join(", ");
          lines.push(`     item ${j + 1} itemId=${item.id}: ${summary}`);
        });
      }
    });
  }
  return lines.join("\n");
}

/** Достаёт JSON-объект из ответа модели (с fenced-блоком или без). */
export function extractJson<T>(response: string): T | null {
  const fenced = response.match(/```(?:json)?\s*\n([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : response;
  const start = raw.search(/[{[]/);
  if (start === -1) return null;
  const lastBrace = Math.max(raw.lastIndexOf("}"), raw.lastIndexOf("]"));
  if (lastBrace <= start) return null;
  try {
    return JSON.parse(raw.slice(start, lastBrace + 1)) as T;
  } catch {
    return null;
  }
}
