/**
 * Codemod: приводит блоки к модели именованных коллекций.
 *
 * 1. data-collection-item без именованного контейнера -> контейнеру даётся имя.
 * 2. Дублирующиеся блочные data-field:
 *    a) если у всех вхождений общий "повторяющийся юнит" (карточка/li) —
 *       юниты помечаются data-collection-item, родитель получает data-collection="имя";
 *       если вхождения в нескольких родителях (колонки футера) — каждая группа
 *       становится отдельной коллекцией с суффиксом -2, -3…
 *    b) если юнит содержал бы вложенную коллекцию — поля переименовываются
 *       с суффиксом -1/-2 (фиксированные пары типа "Без нас/С нами"),
 *       спека fields дополняется новыми именами.
 * 3. Отчёт по каждому файлу.
 */
import * as cheerio from "cheerio";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const files: string[] = execSync(
  `grep -rl "data-field" /Users/leo/programming/creatly/lib/builder/blocks --include="*.ts" | grep -v _`,
  { encoding: "utf8" },
).trim().split("\n");

const DRY = process.env.DRY === "1";
let changed = 0;

interface AnyNode { type?: string; name?: string; parent?: AnyNode | null; attribs?: Record<string, string>; children?: AnyNode[] }

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const htmlMatch = /html: `([\s\S]*?)`,\n/.exec(src);
  if (!htmlMatch) { console.log(`SKIP (no html): ${file}`); continue; }
  const originalHtml = htmlMatch[1];

  const $ = cheerio.load(originalHtml, { xml: false }, false);
  const notes: string[] = [];
  const renames: Array<{ from: string; to: string[] }> = [];

  // ── помощники ──
  const insideItem = (el: AnyNode): boolean => {
    let p: AnyNode | null | undefined = el;
    while (p) {
      if (p.attribs && "data-collection-item" in p.attribs) return true;
      p = p.parent;
    }
    return false;
  };
  const ancestors = (el: AnyNode): AnyNode[] => {
    const list: AnyNode[] = [];
    let p: AnyNode | null | undefined = el.parent;
    while (p && p.type !== "root") { list.push(p); p = p.parent; }
    return list;
  };

  // 1. Безымянные контейнеры существующих item'ов + голые data-collection
  $("[data-collection-item]").each((_, el) => {
    const anc = ancestors(el as AnyNode).find((a) => a.attribs && "data-collection" in a.attribs);
    if (anc && !anc.attribs!["data-collection"]) {
      const prefix = fieldPrefix($(el as never).find("[data-field]").first().attr("data-field") || "items");
      anc.attribs!["data-collection"] = `${prefix}-items`;
      notes.push(`контейнеру дано имя ${prefix}-items`);
    } else if (!anc) {
      const parent = (el as AnyNode).parent;
      if (parent?.attribs) {
        const prefix = fieldPrefix($(el as never).find("[data-field]").first().attr("data-field") || "items");
        if (!("data-collection" in parent.attribs)) {
          parent.attribs["data-collection"] = `${prefix}-items`;
          notes.push(`родителю item'ов дано имя ${prefix}-items`);
        } else if (!parent.attribs["data-collection"]) {
          parent.attribs["data-collection"] = `${prefix}-items`;
        }
      }
    }
  });

  // 2. Дубли блочных полей
  //    (пересчитываем после каждого изменения)
  for (let guard = 0; guard < 20; guard++) {
    const counts = new Map<string, AnyNode[]>();
    $("[data-field]").each((_, el) => {
      if (insideItem(el as AnyNode)) return;
      const name = (el as AnyNode).attribs!["data-field"];
      counts.set(name, [...(counts.get(name) || []), el as AnyNode]);
    });
    const dupEntry = [...counts.entries()].find(([, els]) => els.length > 1);
    if (!dupEntry) break;
    const [dupName, els] = dupEntry;

    // Табличные поля коллекционизировать нельзя (ячейки строк не среплицируются)
    const RENAME_FORCE = new Set(["pricing-tier-name", "cm01-plan-name", "cm02-plan-name"]);
    if (RENAME_FORCE.has(dupName)) {
      const newNames: string[] = [];
      els.forEach((el, i) => {
        const nn = `${dupName}-${i + 1}`;
        el.attribs!["data-field"] = nn;
        newNames.push(nn);
      });
      renames.push({ from: dupName, to: newNames });
      notes.push(`переименовано (таблица) ${dupName} -> ${newNames.join(", ")}`);
      continue;
    }

    // Юнит вхождения = ребёнок ближайшего предка, содержащего >=2 вхождения
    const groups = new Map<AnyNode, Set<AnyNode>>(); // parent -> units
    for (const el of els) {
      const chain = [el, ...ancestors(el)];
      let unit: AnyNode = el;
      let parent: AnyNode | null = null;
      for (let i = 0; i < chain.length - 1; i++) {
        const cand = chain[i + 1];
        const contained = els.filter((e) => [e, ...ancestors(e)].includes(cand));
        if (contained.length >= 2) { unit = chain[i]; parent = cand; break; }
      }
      if (!parent) continue;
      if (!groups.has(parent)) groups.set(parent, new Set());
      groups.get(parent)!.add(unit);
    }

    // Вложенность: юнит уже содержит коллекцию или item -> переименование
    let needsRename = false;
    for (const units of groups.values()) {
      for (const unit of units) {
        const $unit = $(unit as never);
        if ($unit.find("[data-collection], [data-collection-item]").length || (unit.attribs && "data-collection-item" in unit.attribs)) {
          needsRename = true;
        }
      }
    }

    if (needsRename || !groups.size) {
      // Переименовываем вхождения dupName -> dupName-1, dupName-2…
      const newNames: string[] = [];
      els.forEach((el, i) => {
        const nn = `${dupName}-${i + 1}`;
        el.attribs!["data-field"] = nn;
        newNames.push(nn);
      });
      renames.push({ from: dupName, to: newNames });
      notes.push(`переименовано поле ${dupName} -> ${newNames.join(", ")}`);
      continue;
    }

    // Коллекционизация
    let suffix = 0;
    const base = `${fieldPrefix(dupName)}-${humanTail(dupName)}`;
    for (const [parent, units] of groups) {
      suffix++;
      const name = suffix === 1 ? base : `${base}-${suffix}`;
      parent.attribs = parent.attribs || {};
      if (!parent.attribs["data-collection"]) parent.attribs["data-collection"] = name;
      for (const unit of units) {
        unit.attribs = unit.attribs || {};
        if (!("data-collection-item" in unit.attribs)) unit.attribs["data-collection-item"] = "";
      }
      // Пометить ВСЕ однотипные сиблинги юнитов (карточки без data-field тоже)
      const sample = [...units][0];
      if (sample?.name && sample.attribs?.class) {
        const cls = sample.attribs.class.split(/\s+/)[0];
        $(parent as never).children(`${sample.name}.${cls}`).each((_, sib) => {
          const attribs = (sib as AnyNode).attribs!;
          if (!("data-collection-item" in attribs)) attribs["data-collection-item"] = "";
        });
      }
      notes.push(`коллекция "${name}": ${units.size} item'ов (поле ${dupName})`);
    }
  }

  if (!notes.length) continue;

  let newHtml = $.html();
  // cheerio пишет data-collection-item="" — приводим к каноничному виду
  newHtml = newHtml.replace(/ data-collection-item=""/g, " data-collection-item");

  let out = src.replace(htmlMatch[0], `html: \`${newHtml}\`,\n`);

  // Обновляем спеку fields для переименованных полей
  for (const { from, to } of renames) {
    const specRe = new RegExp(`(\\{\\s*name:\\s*"${from}"[^}]*\\},?)`);
    const m = specRe.exec(out);
    if (m) {
      const line = m[1];
      const replacement = to.map((nn, i) => line.replace(`"${from}"`, `"${nn}"`).replace(/(hint:\s*")([^"]*)(")/, (_s, a, hint, c) => `${a}${hint} (${i + 1})${c}`)).join("\n    ");
      out = out.replace(specRe, replacement);
    }
  }

  if (!DRY) writeFileSync(file, out);
  changed++;
  console.log(`● ${file.split("/blocks/")[1]}`);
  for (const n of notes) console.log(`   - ${n}`);
}

console.log(`\nИзменено файлов: ${changed}${DRY ? " (DRY RUN)" : ""}`);

function fieldPrefix(name: string): string {
  const m = /^([a-z]{2}\d{2})-/.exec(name);
  return m ? m[1] : name.split("-")[0];
}
function humanTail(name: string): string {
  return name.replace(/^[a-z]{2}\d{2}-/, "").replace(/^(footer|hero|feature|pricing|faq)-/, "");
}
