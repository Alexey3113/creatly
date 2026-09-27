/**
 * Тест «режиссуры» генерации: applyChoreography + режим story/classic.
 * Запуск: npx tsx --tsconfig tsconfig.json scripts/choreography-test.ts
 */
import type { ArtDirectionBrief } from "@/lib/ai/art-direction";
import { applyPaletteRhythm, buildDocumentFromManifest, buildSelectionPrompt, parseSelection, type ContentManifestBlock } from "@/lib/site/generate";
import { renderPage } from "@/lib/site/render";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) { passed++; console.log(`  ✓ ${name}`); }
  else { failed++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
}

function makeAd(overrides: Partial<ArtDirectionBrief> = {}): ArtDirectionBrief {
  return {
    stylePackId: "tech-minimal",
    concept: "Тест",
    mood: "спокойный",
    palette: {
      bg: "#f2f2f7", bgAlt: "#e8e8ee", surface: "#ffffff", text: "#1c1c1e",
      textMuted: "#6b7280", primary: "#0f4c5c", accent: "#e36414", border: "#d1d5db",
    },
    typography: { heading: "Manrope", body: "Onest", rationale: "" },
    sections: ["header", "hero", "features", "cta", "footer"],
    transitions: ["overlap"],
    motionLanguage: "точный",
    imageryTreatment: "нейтральная",
    signatureElement: "—",
    copyTone: "деловой",
    imageTheme: "tech",
    ...overrides,
  };
}

const manifest: ContentManifestBlock[] = [
  { presetId: "header-minimal-01" },
  { presetId: "hero-centered-01" },
  { presetId: "features-icon-grid-01" },
  { presetId: "story-highlight-01" },
  { presetId: "steps-numbered-01" },
  { presetId: "testimonials-cards-01" },
  { presetId: "cta-banner-01" },
  { presetId: "footer-columns-01" },
];

function main() {
  console.log("── classic: спокойная хореография ──");
  const classic = buildDocumentFromManifest("Тест", manifest, makeAd({ scene: "field" }), "classic");
  const cb = classic.pages[0].blocks;
  const byPreset = (doc: typeof classic, id: string) => doc.pages[0].blocks.find((b) => b.presetId.startsWith(id));
  check("header без enter", !byPreset(classic, "header")?.enter);
  check("hero без enter", !byPreset(classic, "hero")?.enter);
  check("story-блок без enter (движется сам)", !byPreset(classic, "story")?.enter);
  check("контентные блоки получили enter", ["features", "steps", "testimonials", "cta"].every((c) => !!byPreset(classic, c)?.enter));
  check("footer = fade", byPreset(classic, "footer")?.enter === "fade");
  const classicEnters = cb.map((b) => b.enter).filter(Boolean) as string[];
  check("classic tech-minimal без zoom-through", !classicEnters.includes("zoom-through"), classicEnters.join(","));
  check("сцена из ad.scene = field", classic.scene?.type === "field");
  const tinted = cb.filter((b) => b.sceneTint);
  check("sceneTint расставлен (2 точки)", tinted.length === 2, `tinted=${tinted.length}`);
  check("CTA получил accent-тинт", byPreset(classic, "cta")?.sceneTint === "#e36414");

  console.log("── story: смелая хореография + сцена обязательна ──");
  const story = buildDocumentFromManifest("Тест", manifest, makeAd({ scene: "none" }), "story");
  check("сцена принудительно включена (field для tech-minimal)", story.scene?.type === "field");
  const storyEnters = story.pages[0].blocks.map((b) => b.enter).filter(Boolean) as string[];
  check("story добавляет zoom-through в палитру", storyEnters.includes("zoom-through"), storyEnters.join(","));

  console.log("── selection prompt ──");
  const spStory = buildSelectionPrompt("бриф", makeAd(), undefined, "story");
  const spClassic = buildSelectionPrompt("бриф", makeAd());
  check("story-промпт содержит формат-blueprint", spStory.includes("Формат сайта") && spStory.includes("Кино-путешествие"));
  check("story-промпт содержит план спайна", spStory.includes("hero-film") && spStory.includes("chapters"));
  check("classic-промпт без формата", !spClassic.includes("Формат сайта"));
  check("wow-подсказки в обоих режимах", spClassic.includes("gallery-coverflow-01") && spStory.includes("gallery-coverflow-01"));
  // product-reveal blueprint даёт ДРУГОЙ план (объект-фокус, не пролёт)
  const adProduct = makeAd({ blueprintId: "product-reveal" });
  const spProduct = buildSelectionPrompt("бриф", adProduct, undefined, "story");
  check("blueprint меняет план: product-reveal", spProduct.includes("Продукт в фокусе") && spProduct.includes("showcase") && !spProduct.includes("hero-film"));
  const spEditorial = buildSelectionPrompt("бриф", makeAd({ blueprintId: "editorial-kinetic" }), undefined, "story");
  check("blueprint editorial: кинетический текст, без видео-пролёта", spEditorial.includes("Кинетический журнал") && spEditorial.includes("lateral"));

  console.log("── дедуп синглтон-категорий ──");
  const sel = parseSelection(`{"blocks":["header-minimal-01","hero-centered-01","features-icon-grid-01","hero-stats-01","footer-columns-01","footer-dark-01"]}`);
  check("второй hero отброшен", sel?.filter((id) => id.startsWith("hero")).length === 1);
  check("второй footer отброшен", sel?.filter((id) => id.startsWith("footer")).length === 1);
  check("остальное сохранено", sel?.length === 4);

  console.log("── палитровый ритм тела ──");
  const rDoc = buildDocumentFromManifest("Тест", manifest, makeAd({ scene: "none" }), "story");
  const bp = (id: string) => rDoc.pages[0].blocks.find((b) => b.presetId.startsWith(id));
  check("hero/header/footer/story БЕЗ палитры (тёмное кино)", !bp("header")?.palette && !bp("hero")?.palette && !bp("footer")?.palette && !bp("story")?.palette);
  check("CTA получил акцентную палитру", !!bp("cta")?.palette?.["--color-bg"]);
  const bodyLight = rDoc.pages[0].blocks.filter((b) => b.palette && b.palette["--color-text"] === "#1e1b16");
  check("есть светлые секции-передышки", bodyLight.length >= 1, `light=${bodyLight.length}`);
  check("светлая палитра тёплая для тёплого акцента", bp("features")?.palette?.["--color-bg"] === "#f4efe6" || bodyLight[0]?.palette?.["--color-bg"] === "#f4efe6");
  // transparent-секции над сценой не трогаются
  const rScene = buildDocumentFromManifest("Т", manifest, makeAd({ scene: "aurora" }), "story");
  const transparentWithPalette = rScene.pages[0].blocks.filter((b) => b.surface === "transparent" && b.palette);
  check("transparent над сценой без палитры", transparentWithPalette.length === 0);

  console.log("── рендер не ломается ──");
  const rendered = renderPage(story, story.pages[0].id, { mode: "publish" });
  check("html рендерится", rendered.html.length > 1000);
  check("data-enter присутствует в html", rendered.html.includes("data-enter="));
  check("scene-tint присутствует в html", rendered.html.includes("data-scene-tint"));

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}
main();
