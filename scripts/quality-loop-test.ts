/**
 * Тест контура качества: bespoke-блоки (санитайзер/ops/рендер), композиции
 * глав (chp-comp), парсеры цикла самопроверки.
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/quality-loop-test.ts
 */
import { sanitizeCustomHtml, validateCustomCss } from "@/lib/site/custom";
import { createEmptyDocument, normalizeDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage } from "@/lib/site/render";
import { docOutline, parseReview, buildReviewPrompt } from "@/lib/ai/review-loop";
import { parseBespoke, buildBespokeHeroPrompt } from "@/lib/ai/bespoke";
import type { ArtDirectionBrief } from "@/lib/ai/art-direction";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

const GOOD_HTML = `<section class="cb-hero"><h1 class="cb-hero__title" data-field="cb-title">Заголовок</h1><a class="cb-hero__cta" data-field="cb-cta" href="#contact">Начать</a></section>`;
const GOOD_CSS = `.cb-hero{min-height:100svh;background:var(--color-bg)}.cb-hero__title{font-family:var(--font-heading);color:var(--color-text)}@media(max-width:819px){.cb-hero__title{font-size:2rem}}@keyframes cb-rise{from{opacity:0}to{opacity:1}}`;

function main() {
  console.log("── санитайзер bespoke ──");
  check("валидный html проходит", sanitizeCustomHtml(GOOD_HTML) === GOOD_HTML);
  check("script вырезается", !sanitizeCustomHtml(GOOD_HTML.replace("</section>", `<script>alert(1)</script></section>`))!.includes("<script"));
  check("onclick вырезается", !sanitizeCustomHtml(GOOD_HTML.replace("<a ", `<a onclick="hack()" `))!.includes("onclick"));
  check("javascript: url вырезается", !sanitizeCustomHtml(GOOD_HTML.replace('href="#contact"', `href="javascript:alert(1)"`))!.includes("javascript:"));
  check("без data-field отклоняется", sanitizeCustomHtml(`<section class="cb-x"><h1>Текст</h1></section>`) === null);
  check("валидный css проходит", validateCustomCss(GOOD_CSS));
  check("чужие селекторы отклоняются", !validateCustomCss(`.cb-hero{color:red}body{display:none}`));
  check("@import отклоняется", !validateCustomCss(`@import url(evil.css);.cb-x{color:red}`));
  check("внешний url отклоняется", !validateCustomCss(`.cb-x{background:url(https://evil.com/x.png)}`));
  check("непарные скобки отклоняются", !validateCustomCss(`.cb-x{color:red`));

  console.log("── ops + рендер custom-блока ──");
  let doc = createEmptyDocument("Тест");
  const r1 = applyOps(doc, [
    { op: "add-block", presetId: "header-minimal-01" },
    { op: "add-custom-block", html: GOOD_HTML, css: GOOD_CSS },
  ]);
  check("add-custom-block применился", r1.errors.length === 0, r1.errors.join(";"));
  doc = r1.doc;
  const custom = doc.pages[0].blocks.find((b) => b.presetId === "custom")!;
  check("поля извлечены из html", custom.fields["cb-title"] === "Заголовок");
  const r2 = applyOps(doc, [{ op: "update-fields", blockId: custom.id, fields: { "cb-title": "Новый", "hack-field": "x" } }]);
  doc = r2.doc;
  const c2 = doc.pages[0].blocks.find((b) => b.presetId === "custom")!;
  check("update-fields работает для custom", c2.fields["cb-title"] === "Новый");
  check("незнакомое поле отброшено", !("hack-field" in c2.fields));
  const rendered = renderPage(doc, doc.pages[0].id, { mode: "publish" });
  check("custom рендерится с новым текстом", rendered.html.includes(">Новый<"));
  check("custom css в выдаче", rendered.css.includes(".cb-hero{min-height:100svh"));
  check("data-bid проставлен", rendered.html.includes(`data-bid="${custom.id}"`));
  const bad = applyOps(doc, [{ op: "add-custom-block", html: GOOD_HTML, css: ".cb-x{}body{color:red}" }]);
  check("плохой css отклонён оп-ом", bad.errors.length === 1);
  const normalized = normalizeDocument(structuredClone(doc));
  const nc = normalized.pages[0].blocks.find((b) => b.presetId === "custom");
  check("custom переживает normalizeDocument", nc?.fields["cb-title"] === "Новый" && !!nc?.custom?.html);

  console.log("── композиции глав (chp-comp) ──");
  const chDoc = applyOps(createEmptyDocument("Т"), [{ op: "add-block", presetId: "story-chapters-01" }]).doc;
  const chRendered = renderPage(chDoc, chDoc.pages[0].id, { mode: "publish" });
  check("chp-comp поле в разметке", (chRendered.html.match(/data-field="chp-comp"/g) || []).length === 3);
  check("applyComp в рантайме", chRendered.js.includes("comp-w-") && chRendered.js.includes("--wscale"));
  check("CSS композиций на месте", chRendered.css.includes(".comp-w-rt") && chRendered.css.includes("var(--wscale,1)"));

  console.log("── ревью: контур и парсер ──");
  const outline = docOutline(doc);
  check("outline содержит id блоков", outline.includes(custom.id) && outline.includes("preset=custom"));
  const ad = { concept: "Кино", mood: "тихий", signatureElement: "золотая линия" } as ArtDirectionBrief;
  const rp = buildReviewPrompt(ad, outline, [{ label: "десктоп, скролл 0%", base64: "" }]);
  check("промпт ревью со словарём ops и chp-comp", rp.includes("update-item") && rp.includes("chp-comp"));
  const review = parseReview(`{"score": 6.5, "issues": ["слово тонет"], "ops": [{"op":"set-block-enter","blockId":"b1","enter":"fade"}, {"op":"add-page","title":"hack"}, {"op":"remove-block","blockId":"b2"}]}`);
  check("score/issues распарсены", review?.score === 6.5 && review?.issues.length === 1);
  check("запрещённые ops отфильтрованы", review?.ops.length === 2 && !review?.ops.some((o) => o.op === "add-page"));

  console.log("── bespoke: промпт и парсер ──");
  const bp = buildBespokeHeroPrompt(ad, "бриф", { "hero-title": "Т" }, "/uploads/1/gen/x.webp");
  check("правила песочницы в промпте", bp.includes("cb-") && bp.includes("data-field") && bp.includes("var(--color-"));
  check("parseBespoke валидный", parseBespoke(`{"html":"<section class=\\"cb-h\\"></section>","css":".cb-h{}"}`) !== null);
  check("parseBespoke пустой отклоняет", parseBespoke(`{"html":"","css":""}`) === null);

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
main();
