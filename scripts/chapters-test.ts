/**
 * Тест системы «бесшовные главы + foreground»: блок story-chapters-01 +
 * chapters-runtime. Запуск: npx tsx --tsconfig tsconfig.json scripts/chapters-test.ts
 */
import { blockIndex } from "@/lib/builder/blocks/_registry";
import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage } from "@/lib/site/render";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

function main() {
  console.log("── блок ──");
  const preset = blockIndex.get("story-chapters-01");
  check("story-chapters-01 зарегистрирован", !!preset);
  check("4 варианта маски (включая срезанные углы)", preset?.variants?.length === 4 && preset?.variants?.some((v) => v.id === "bevel"));
  check("флэт-дефолт: min-height 100svh", !!preset?.css.includes("min-height:100svh"));
  check("live-хореография от --tp/--cp/--nt", !!preset?.css.includes("var(--tp") && !!preset?.css.includes("var(--cp") && !!preset?.css.includes("var(--nt"));
  check("вариант roll ставит --mask", preset?.variants?.some((v) => v.css.includes("--mask:roll")) === true);

  console.log("── foreground-слой (cutout, референс) ──");
  check("3 fg-слота в шаблоне", (preset?.html.match(/chp-fg-c/g) || []).length === 3);
  check("первый объект — поверх слова (--over)", (preset?.html.match(/b-chp__fg--over/g) || []).length === 3 && !!preset?.css.includes(".b-chp__fg--over{z-index:4}"));
  check("разброс масштабов xl/sm", !!preset?.css.includes("b-chp__fg--xl") && !!preset?.html.includes("b-chp__fg--sm"));
  check("cutout-стиль для png-силуэтов", !!preset?.css.includes(`img[src$=".png"]`) && !!preset?.css.includes("drop-shadow"));
  check("лишние fg скрыты на мобильных", !!preset?.css.includes("--lt,.b-chp__fg--lm{display:none}"));

  console.log("── рендер и коллекции ──");
  const doc = createEmptyDocument("Главы");
  const { doc: d2 } = applyOps(doc, [{
    op: "add-block",
    presetId: "story-chapters-01",
    collections: {
      "chp-chapters": [
        { fields: { "chp-word": "Один", "chp-bg": "/assets/demo/luxury.webp" } },
        { fields: { "chp-word": "Два", "chp-bg": "/assets/demo/tech.mp4" } },
        { fields: { "chp-word": "Три" } },
        { fields: { "chp-word": "Четыре" } },
      ],
    },
  }]);
  const page = d2.pages[0];
  const r = renderPage(d2, page.id, { mode: "publish" });
  check("4 главы отрендерились", (r.html.match(/data-chapter[\s>]/g) || []).length === 4);
  check("chapters-runtime подключён", r.js.includes("data-chapters"));
  check("видео-фон главы 2: img -> video", r.html.includes(`src="/assets/demo/tech.mp4"`) && /<video[^>]*data-field="chp-bg"[^>]*src="\/assets\/demo\/tech\.mp4"/.test(r.html));
  check("4-я глава взяла треки 1-го шаблона (пер-индекс)", (r.html.match(/--drift:56vh/g) || []).length === 2);
  check("гигантские слова на месте", r.html.includes(">Один<") && r.html.includes(">Четыре<"));
  check("счётчик в разметке", r.html.includes("data-chapters-counter"));

  const noBlock = renderPage(doc, doc.pages[0].id, { mode: "publish" });
  check("без блока runtime не подключается", !noBlock.js.includes("tornClip"));

  console.log("── runtime-контракт ──");
  check("маски torn/bevel/curtain в движке", ["tornClip", "bevelClip", `eng.mask==="curtain"`].every((s) => r.js.includes(s)));
  check("мобилки/reduced -> is-flat", r.js.includes("is-flat") && r.js.includes("max-width:819px"));
  check("высота N×160vh", r.js.includes("*160)"));
  check("видео глав play/pause по engaged", r.js.includes("it.video.play") && r.js.includes("it.video.pause"));

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
main();
