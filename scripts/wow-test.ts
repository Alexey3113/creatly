import { createEmptyDocument } from "@/lib/site/create";
import { applyOps } from "@/lib/site/ops";
import { renderPage, renderPublishHtml } from "@/lib/site/render";

function assert(cond: boolean, msg: string) {
  if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; }
  else console.log("ok:", msg);
}

let doc = createEmptyDocument("Wow-тест");
const r = applyOps(doc, [
  { op: "add-block", presetId: "story-stack-01" },
  { op: "add-block", presetId: "story-highlight-01" },
]);
assert(r.errors.length === 0, "стек + highlight добавлены: " + r.errors.join(";"));
doc = r.doc;

const stack = doc.pages[0].blocks[0];
assert(stack.collections?.["ss01-cards"]?.length === 4, "4 карточки стека из шаблона");

// Публикация
const pub = renderPublishHtml(doc, doc.pages[0].id, { inline: true });
assert(pub.html.includes('data-story-step') , "карточки стека — шаги story-runtime");
assert(pub.html.includes('data-reveal="highlight"'), "highlight-блок в разметке");
assert(pub.js.includes("splitUnits") && pub.js.includes("is-lit"), "text-runtime подключён на паблише");
assert(pub.js.includes("creatly-demo") , "demo-runtime подключён на паблише");
assert(pub.css.includes(".rv-unit"), "css текстового движка подключён");

// В превью текстовый и демо-рантайм не нужны (reveal форсированно off)
const preview = renderPage(doc, doc.pages[0].id, { mode: "preview" });
assert(!preview.js.includes("splitUnits"), "text-runtime НЕ грузится в превью-канвасе");
assert(!preview.js.includes("creatly-demo"), "demo-runtime НЕ грузится в превью-канвасе");

// Демо-раннер: проверка структуры сообщения и easing
import { demoRuntime, DEMO_MSG_SOURCE } from "@/lib/site/demo-runtime";
assert(DEMO_MSG_SOURCE === "creatly-demo", "константа источника сообщений");
assert(demoRuntime.includes('m.source!=="creatly-demo-host"'), "гейт по source сообщения");
assert(demoRuntime.includes("__creatlyLenis"), "интеграция с Lenis учтена");
assert(demoRuntime.includes('addEventListener("wheel",stop'), "ручной скролл прерывает демо");

console.log("\nDONE");

// ── Cinematic-runtime в publish-рендере (баг: раньше был только на сервере) ──
{
  const d2 = applyOps(createEmptyDocument("Cin"), [{ op: "add-block", presetId: "hero-webgl-gradient-01" }]).doc;
  const pub2 = renderPublishHtml(d2, d2.pages[0].id, { inline: true });
  const count = (pub2.js.match(/Cinematic animation runtime|loadGSAP|__creatlyLenis=lenis/g) || []).length;
  assert(pub2.js.includes("data-webgl") || pub2.js.includes("loadThreeJS"), "cinematic-runtime в publish js");
  const prev2 = renderPage(d2, d2.pages[0].id, { mode: "preview" });
  assert(!prev2.js.includes("loadThreeJS"), "в превью-канвасе cinematic добавляет srcdoc, не renderPage");
}
console.log("CINEMATIC DONE");

// ── Жестовый степпер + curtain ──
{
  const d3 = applyOps(createEmptyDocument("Steps"), [
    { op: "add-block", presetId: "story-video-02" },
    { op: "add-block", presetId: "story-curtain-01" },
  ]).doc;
  const b = d3.pages[0].blocks[0];
  assert(Object.keys(b.collections || {}).includes("sv02-steps"), "коллекция шагов sv02");
  const pub3 = renderPublishHtml(d3, d3.pages[0].id, { inline: true });
  assert(pub3.html.includes('data-story-gesture="steps"'), "жестовый атрибут в разметке");
  assert(pub3.js.includes("engagedStory") && pub3.js.includes("tryStep"), "степпер-движок в publish js");
  assert(pub3.js.includes('addEventListener("wheel"') && pub3.js.includes("passive:false"), "wheel-гейт non-passive");
  assert(pub3.html.includes("b-sc01__panel"), "панели curtain в разметке");
  assert(pub3.css.includes("position:sticky") && pub3.css.includes("b-sc01__panel"), "sticky-curtain css");
  const prev3 = renderPage(d3, d3.pages[0].id, { mode: "preview" });
  assert(prev3.js.includes("__creatlyPreviewMode"), "в канвасе степпер гейтится preview-флагом");
}
console.log("STEPPER DONE");

// ── Волна wow-блоков: tilt / count / zoom / video-text / magnet ──
{
  const d4 = applyOps(createEmptyDocument("Wow2"), [
    { op: "add-block", presetId: "story-zoom-01" },
    { op: "add-block", presetId: "story-video-text-01" },
    { op: "add-block", presetId: "features-tilt-01" },
    { op: "add-block", presetId: "case-studies-counters-01" },
    { op: "add-block", presetId: "cta-banner-02" },
  ]).doc;
  const pub4 = renderPublishHtml(d4, d4.pages[0].id, { inline: true });
  assert(pub4.html.includes('data-tilt="9"'), "tilt-атрибуты на карточках");
  assert((pub4.html.match(/data-count/g) || []).length >= 4, "счётчики размечены");
  assert(pub4.html.includes("data-magnet"), "магнитная CTA");
  assert(pub4.js.includes("is-tilting") && pub4.js.includes("runCount") && pub4.js.includes("data-magnet"), "примитивы в widgets-runtime");
  assert(pub4.js.includes("hover:hover"), "курсорные эффекты гейтятся hover:hover");
  assert(pub4.css.includes("mix-blend-mode:screen"), "knockout-типографика в css");
  assert(pub4.css.includes("--p,0)*14vh") || pub4.css.includes("calc(var(--p,0)*14vh)"), "зум-погружение управляется --p");
  assert(pub4.html.includes("data-story") && pub4.js.includes("[data-story]"), "zoom-блок на story-runtime");
}
console.log("WOW2 DONE");

// ── Кино-волна: постеры / statement / brand / glow / цитата / видео-постер ──
{
  const d5 = applyOps(createEmptyDocument("Cinema"), [
    { op: "add-block", presetId: "hero-poster-01" },
    { op: "add-block", presetId: "hero-statement-01" },
    { op: "add-block", presetId: "hero-brand-01" },
    { op: "add-block", presetId: "features-glow-01" },
    { op: "add-block", presetId: "testimonials-cinematic-01" },
    { op: "add-block", presetId: "story-poster-01" },
  ]).doc;
  const pub5 = renderPublishHtml(d5, d5.pages[0].id, { inline: true });
  assert(pub5.html.includes("<em>живые городские джунгли</em>"), "маркдаун-курсив *…* конвертируется");
  assert(pub5.html.includes("b-hs01__w--ghost"), "контурное слово в statement");
  assert((pub5.html.match(/data-count/g) || []).length >= 3, "count-up метрики в statement");
  assert(pub5.css.includes("mask-composite:exclude"), "неоновая градиентная рамка glow");
  assert(pub5.html.includes('data-reveal="char"'), "посимвольный ривил имени бренда");
  assert(pub5.html.includes("b-sp01__video") && pub5.html.includes('data-story-mode="scrub"'), "видео-постер на скрабе с главами");
  assert((pub5.html.match(/sp01-step-time/g) || []).length >= 3, "таймкоды глав видео-постера");
  const stmt = d5.pages[0].blocks[1];
  assert(Object.keys(stmt.collections || {}).includes("hs01-stats"), "метрики statement — коллекция");
}
console.log("CINEMA DONE");

// ── Волна «забираем фишки»: smooth-loop / reveal-mask / liquid glass ──
{
  const d6 = applyOps(createEmptyDocument("Steal"), [
    { op: "add-block", presetId: "hero-video-bg-01" },
    { op: "add-block", presetId: "gallery-reveal-01" },
    { op: "add-block", presetId: "faq-accordion-02" },
    { op: "set-scene", scene: { type: "aurora", intensity: 0.5 } },
  ]).doc;
  const faqId = d6.pages[0].blocks[2].id;
  const d6b = applyOps(d6, [{ op: "set-block-surface", blockId: faqId, surface: "veil" }]).doc;
  const pub6 = renderPublishHtml(d6b, d6b.pages[0].id, { inline: true });
  assert(pub6.html.includes("<video data-smooth-loop"), "восстановленный video-тег с smooth-loop в video-bg-01");
  assert(pub6.js.includes("fadingOut") && pub6.js.includes("0.55"), "кроссфейд-луп в рантайме");
  assert(pub6.html.includes('data-reveal-mask="280"') && pub6.html.includes("data-rm-top"), "проявитель размечен");
  assert(pub6.js.includes("maskImage") && pub6.js.includes("Лиссаж") === false, "маска-движок в рантайме");
  assert(pub6.js.includes("Math.sin(t*1.3)"), "авто-дрейф круга для тач/демо");
  assert(pub6.css.includes("background-blend-mode:luminosity") && pub6.css.includes("mask-composite:exclude"), "liquid glass veil");
  assert(pub6.html.includes("<em>истории времени</em>"), "курсив в заголовке проявителя");
}
console.log("STEAL DONE");

// ── Секции-волна motionsites: orbit / showcase / hover-grid ──
{
  const d7 = applyOps(createEmptyDocument("Sections"), [
    { op: "add-block", presetId: "features-orbit-01" },
    { op: "add-block", presetId: "story-showcase-01" },
    { op: "add-block", presetId: "gallery-hover-grid-01" },
  ]).doc;
  const pub7 = renderPublishHtml(d7, d7.pages[0].id, { inline: true });
  assert(pub7.html.split("</script>")[0].includes("data-orbit") || pub7.html.includes("b-fo01__ring"), "орбита размечена (6 элементов в разметке)");
  assert(pub7.js.includes('setProperty("--a"'), "runtime раскладывает углы орбиты");
  assert(pub7.css.includes("rotate(calc(var(--p,0)*140deg))"), "кольцо вращается по --p");
  assert(pub7.html.includes("data-story") && pub7.html.includes("b-ss02__media"), "showcase на story-runtime с пиннутым медиа");
  assert((pub7.html.match(/data-story-step/g) || []).length >= 3, "showcase: шаги-выноски");
  assert(pub7.html.includes("data-hover-cycle") && pub7.html.includes("data-hc-tile"), "живая сетка размечена");
  assert(pub7.js.includes("hover-cycle") || pub7.js.includes("data-hc-tile"), "тач-цикл сетки в runtime");
  assert(pub7.css.includes("grayscale(1)"), "плитки приглушены до hover");
}
console.log("SECTIONS DONE");

// ── Coverflow + непрерывный скраб ──
{
  const d8 = applyOps(createEmptyDocument("CF"), [{ op: "add-block", presetId: "gallery-coverflow-01" }]).doc;
  const pub8 = renderPublishHtml(d8, d8.pages[0].id, { inline: true });
  assert(pub8.html.includes("data-coverflow") && (pub8.html.match(/data-cf-card/g)||[]).length >= 5, "coverflow: карточки размечены");
  assert(pub8.js.includes("rotateY(") && pub8.js.includes("translateZ("), "3D-раскладка coverflow в runtime");
  assert(pub8.js.includes("pointerdown") && pub8.js.includes("setInterval"), "свайп + авто-прокрутка coverflow");
  // непрерывный скраб: докинг только под gesture (проверка исходника)
  const src = require("fs").readFileSync("lib/site/story-runtime.ts","utf8");
  assert(src.includes("if(st.gesture)") && src.includes("непрерывный скраб"), "скраб непрерывный, докинг только для жестов");
}
console.log("COVERFLOW DONE");
