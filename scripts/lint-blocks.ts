import { blockPresets } from "@/lib/builder/blocks/_registry";
import { extractDefaultCollections, extractDefaultFields, findCollections } from "@/lib/site/fill";

let bad = 0;
const report: Record<string, string[]> = {};

for (const p of blockPresets) {
  const issues: string[] = [];
  const html = p.html;

  // 1. items вне именованных коллекций
  const itemCount = (html.match(/data-collection-item/g) || []).length;
  const collections = findCollections(html);
  const coveredItems = collections.reduce((n, c) => n + c.items.length, 0);
  if (itemCount > 0 && coveredItems < itemCount) {
    issues.push(`items вне именованной коллекции: ${itemCount - coveredItems} из ${itemCount}`);
  }

  // 2. дубли блочных полей (вне item'ов)
  const blockFieldNames: string[] = [];
  {
    // все data-field вне item-диапазонов
    const spans: Array<[number, number]> = [];
    for (const c of collections) for (const it of c.items) spans.push([it.start, it.end]);
    const re = /data-field="([^"]+)"/g;
    let m;
    while ((m = re.exec(html))) {
      const pos = m.index;
      const inItem = spans.some(([s, e]) => pos > s && pos < e);
      if (!inItem) blockFieldNames.push(m[1]);
    }
  }
  const dupes = blockFieldNames.filter((n, i) => blockFieldNames.indexOf(n) !== i);
  if (dupes.length) issues.push(`дубли блочных полей: ${[...new Set(dupes)].join(", ")}`);

  // 3. расхождение спеки fields и html
  const htmlFields = new Set([
    ...Object.keys(extractDefaultFields(html)),
    ...Object.values(extractDefaultCollections(html, () => "x")).flatMap((items) =>
      items.flatMap((it) => Object.keys(it.fields)),
    ),
  ]);
  const specFields = new Set(p.fields.map((f) => f.name));
  const missingInHtml = [...specFields].filter((f) => !htmlFields.has(f));
  const missingInSpec = [...htmlFields].filter((f) => !specFields.has(f));
  if (missingInHtml.length) issues.push(`в спеке, но нет в html: ${missingInHtml.join(", ")}`);
  if (missingInSpec.length) issues.push(`в html, но нет в спеке: ${missingInSpec.join(", ")}`);

  if (issues.length) {
    bad++;
    report[p.id] = issues;
  }
}

console.log(`Проблемных блоков: ${bad} из ${blockPresets.length}\n`);
for (const [id, issues] of Object.entries(report)) {
  console.log(`● ${id}`);
  for (const i of issues) console.log(`   - ${i}`);
}
