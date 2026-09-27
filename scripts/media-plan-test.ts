/**
 * Тест медиа-плана Higgsfield-конвейера.
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/media-plan-test.ts
 */
import type { ArtDirectionBrief } from "@/lib/ai/art-direction";
import {
  assignSlot,
  buildMediaPromptsPrompt,
  buildMediaSlots,
  enforceStoryRefs,
  parseMediaPrompts,
  parsePaletteFromVision,
} from "@/lib/ai/media-plan";
import type { ContentManifestBlock } from "@/lib/site/generate";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

const ad = {
  stylePackId: "luxury-serif", concept: "Кино", mood: "тихий дорогой",
  imageryTreatment: "приглушённый тон",
} as ArtDirectionBrief;

function main() {
  const manifest: ContentManifestBlock[] = [
    { presetId: "header-transparent-01" },
    { presetId: "story-poster-01", fields: { "sp01-meta-left": "x" } },
    { presetId: "story-chapters-01", collections: { "chp-chapters": [
      { fields: { "chp-word": "Один" } },
      { fields: { "chp-word": "Два" } },
      { fields: { "chp-word": "Три" } },
    ] } },
    { presetId: "team-split-01", collections: {} },
    { presetId: "footer-columns-01" },
  ];

  console.log("── слоты ──");
  const slots = buildMediaSlots(manifest);
  check("слоты найдены", slots.length > 0, String(slots.length));
  check("поле-видео sp01-video исключено", !slots.some((s) => s.field === "sp01-video"));
  check("главы: 3 bg-слота", slots.filter((s) => s.kind === "chapter").length === 3);
  check("fg-слоты глав найдены (3 на главу)", slots.filter((s) => s.kind === "fg").length === 9);
  check("chapter раньше fg (приоритет)", slots.findIndex((s) => s.kind === "chapter") < slots.findIndex((s) => s.kind === "fg"));
  check("потолка по умолчанию нет (все слоты)", slots.length === 12, String(slots.length));
  const capped = buildMediaSlots(manifest, 4);
  check("cap работает, если задан", capped.length === 4);

  console.log("── принудительная связность глав ──");
  const specs = slots.map(() => ({ prompt: "p", ref: null as number | null }));
  enforceStoryRefs(slots, specs);
  const bg = (item: number) => slots.findIndex((s) => s.kind === "chapter" && s.item === item);
  check("фон главы 2 ← фон главы 1", specs[bg(1)].ref === bg(0));
  check("фон главы 3 ← фон главы 2", specs[bg(2)].ref === bg(1));
  check("фон главы 1 свободен", specs[bg(0)].ref === null);
  const fgOfCh1 = slots.findIndex((s) => s.kind === "fg" && s.item === 1);
  check("fg главы 2 ← фон своей главы", specs[fgOfCh1].ref === bg(1));

  console.log("── запись в манифест ──");
  const chSlot = slots.find((s) => s.kind === "chapter" && s.item === 1)!;
  assignSlot(manifest, chSlot, "/uploads/1/gen/x.png");
  check("URL записан в item коллекции", manifest[2].collections!["chp-chapters"][1].fields["chp-bg"] === "/uploads/1/gen/x.png");
  const blockSlot = slots.find((s) => s.collection == null);
  if (blockSlot) {
    assignSlot(manifest, blockSlot, "/uploads/1/gen/y.png");
    check("URL записан в поле блока", manifest[blockSlot.block].fields?.[blockSlot.field] === "/uploads/1/gen/y.png");
  }

  console.log("── промпты ──");
  const prompt = buildMediaPromptsPrompt("бриф", ad, slots, true);
  check("стиль-гайд адаптивный: мир клиента, не смена сюжета", prompt.includes("мир КЛИЕНТА") && prompt.includes("не смена сюжета") && prompt.includes("ДОСЛОВНО"));
  check("запрет текста в кадре", prompt.includes("ЗАПРЕЩЕНО"));
  check("hero-цепочка запрошена", prompt.includes("heroChain") && prompt.includes("A→B→C→D"));
  const parsed = parseMediaPrompts(`{"universe":"u","images":["a","b"],"heroChain":["1","2","3","4"]}`, 4);
  check("недостающие промпты добираются", parsed?.images.length === 4);
  check("старый формат-строка терпится (ref=null)", parsed?.images[0].ref === null);
  check("цепочка из 4 кадров", parsed?.heroChain?.length === 4);
  const noChain = parseMediaPrompts(`{"universe":"u","images":["a"],"heroChain":["1","2"]}`, 1);
  check("неполная цепочка отбрасывается", noChain?.heroChain === undefined);

  console.log("── зависимые генерации ──");
  const deps = parseMediaPrompts(
    `{"universe":"u","images":[{"prompt":"a","ref":null},{"prompt":"b","ref":0},{"prompt":"c","ref":1},{"prompt":"d","ref":5},{"prompt":"e","ref":4}]}`, 5);
  check("свободный кадр ref=null", deps?.images[0].ref === null);
  check("зависимость назад сохраняется", deps?.images[1].ref === 0 && deps?.images[2].ref === 1);
  check("вперёд-ссылка отброшена", deps?.images[3].ref === null);
  check("самоссылка отброшена", deps?.images[4].ref === null);

  console.log("── моушн-плейбук ──");
  check("плейбук в промпте", prompt.includes("МОУШН-ПЛЕЙБУК") && prompt.includes("БЕЗ склеек") && prompt.includes("ЛЮДЕЙ НЕ АНИМИРОВАТЬ"));
  check("ambient запрошен для глав", prompt.includes(`"ambient"`) && prompt.includes("[chapter]"));
  check("heroChainMotion запрошен", prompt.includes("heroChainMotion"));
  const motion = parseMediaPrompts(
    `{"universe":"u","images":["a"],"heroChain":["1","2","3","4"],"heroChainMotion":[{"prompt":"dolly A to B","duration":6},{"prompt":"orbit B to C, no cuts, seamless","duration":99},{"prompt":"crane C to D","duration":1}],"ambient":[{"slot":0,"prompt":"light drifts","duration":5},{"slot":42,"prompt":"x","duration":5}]}`, 1);
  check("3 сегмента motion распарсены", motion?.heroChainMotion?.length === 3);
  check("суффикс no cuts добавляется", motion?.heroChainMotion?.[0].prompt.includes("no cuts, no scene change") === true);
  check("суффикс не дублируется", (motion?.heroChainMotion?.[1].prompt.match(/no cuts/g) || []).length === 1);
  check("длительность зажата 3-12", motion?.heroChainMotion?.[1].duration === 12 && motion?.heroChainMotion?.[2].duration === 3);
  check("ambient слота 0 принят", motion?.ambient?.[0]?.slot === 0 && motion?.ambient?.[0]?.prompt.includes("no cuts") === true);
  check("ambient с чужим слотом отброшен", motion?.ambient?.length === 1);
  const badMotion = parseMediaPrompts(`{"universe":"u","images":["a"],"heroChain":["1","2","3","4"],"heroChainMotion":[{"prompt":"only one"}]}`, 1);
  check("неполный motion -> фолбэк (undefined)", badMotion?.heroChainMotion === undefined);

  console.log("── палитра из кадра ──");
  const pal = parsePaletteFromVision(`{"bg":"#101418","bgAlt":"#161b21","surface":"#1c232b","text":"#e8e4da","textMuted":"#9aa0a6","primary":"#2b4a5e","accent":"#d9a05b","border":"#2a323b"}`);
  check("валидная палитра парсится", pal?.accent === "#d9a05b");
  const lowContrast = parsePaletteFromVision(`{"bg":"#c8c8c8","bgAlt":"#cccccc","surface":"#d0d0d0","text":"#e0e0e0","textMuted":"#d8d8d8","primary":"#bbbbbb","accent":"#cfcfcf","border":"#c0c0c0"}`);
  check("нечитабельная палитра отклоняется (контраст-гейт)", lowContrast === null);
  check("битый hex отклоняется", parsePaletteFromVision(`{"bg":"blue","bgAlt":"#161b21","surface":"#1c232b","text":"#e8e4da","textMuted":"#9aa0a6","primary":"#2b4a5e","accent":"#d9a05b","border":"#2a323b"}`) === null);

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
main();
