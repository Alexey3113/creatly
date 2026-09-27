/* ЗАГОЛОВКИ СТРАНИЦ ВИТРИН (аудит 2026-09-28, §4: у ~150 страниц общий title «Visual Hooks Lab» /
   «Animated — …» / «Story v2 — …», у части — двойной суффикс «· Creatly | Creatly»).
   Бренд и обещание берутся из самого сайта (реестры + первый <h1> компонента) → статический словарь
   components/shared/page-titles.ts (без "use client": его читают generateMetadata каталожных роутов).
   Шаблон корня «%s | Creatly» добавляет суффикс сам. Запуск: npx tsx scripts/gen-page-titles.ts */
import fs from "node:fs";
import path from "node:path";

const R = (p: string) => fs.readFileSync(path.resolve(p), "utf8");
type Meta = { title: string; description: string };
const out: Record<string, Record<string, Meta>> = { hooks: {}, animated: {}, story: {}, story2: {} };

/** «FORGE» → «Forge», «NOTRE‑DAME» → «Notre‑Dame», «緋 SCARLET» → «緋 Scarlet»; M·WERK и CJK не трогаем */
function nice(s: string): string {
  if (s.includes("·")) return s;
  return s.split(" ").map((w) => (w === w.toUpperCase() && w !== w.toLowerCase()
    ? w.toLowerCase().replace(/(^|[‑\-+&])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())
    : w)).join(" ");
}

/** текст первого <h1> после позиции from (JSX: <br/> → пробел, теги и {выражения} прочь) */
function h1After(src: string, from: number): string {
  const m = src.slice(from).match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) return "";
  return m[1].replace(/<br\s*\/?>/g, " ").replace(/\{"\s*"\}/g, " ").replace(/\{[^{}]*\}/g, "").replace(/<[^>]+>/g, "")
    .replace(/&nbsp;| /g, " ").replace(/\s+/g, " ").trim()
    // стилизованный КАПС отдельных слов («NOTHING for miles») — в обычный регистр
    .replace(/(?<![\p{L}])(\p{Lu}{2,})(?![\p{L}])/gu, (w: string, _x: string, i: number) => (i === 0 ? w[0] + w.slice(1).toLowerCase() : w.toLowerCase()));
}

const clip = (s: string, n = 64) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");

/* ── /visual-hooks: 50 бизнес-сайтов, 23 concept, 24 хука ─────────────────────────────── */
const LAB = R("components/visual-hooks/VisualHooksLab.tsx");
const niche: Record<string, { brand: string; niche: string }> = {};
for (const f of ["components/visual-hooks/SitesIndex.tsx", "components/visual-hooks/AnimatedIndex.tsx"])
  for (const m of R(f).matchAll(/\{ slug: "([^"]+)", brand: "([^"]+)", niche: "([^"]+)"/g)) niche[m[1]] = { brand: m[2], niche: m[3] };

// ProSite: бренд + tagline реестра PRO
const proAt = LAB.indexOf("const PRO: Record<string, Pro> = {");
for (const m of LAB.slice(proAt).matchAll(/^ {2}([a-z]+): \{ slug: "([a-z]+)"[^\n]*?brand: "([^"]+)"[^\n]*?tagline: "([^"]+)"/gm)) {
  const [, , slug, brand, tagline] = m;
  out.hooks[slug] = { title: `${nice(brand)} — ${tagline.replace(/\.$/, "")}`, description: `${niche[slug]?.niche ?? nice(brand)}. ${tagline}` };
}
// bespoke и concept: роутинг `if (initialSlug === "x") return <XSite />` → первый <h1> компонента
for (const m of LAB.matchAll(/if \(initialSlug === "([a-z]+)"\) return <(\w+) \/>;/g)) {
  const [, slug, comp] = m;
  if (out.hooks[slug] || !niche[slug]) continue;
  let src = LAB, at = LAB.search(new RegExp(`function ${comp}\\(`));
  if (at < 0) {
    const file = ["components/concept-sites", "components/visual-hooks"].map((d) => path.join(d, `${comp}.tsx`)).find((f) => fs.existsSync(f));
    if (!file) continue;
    src = R(file); at = src.search(new RegExp(`function ${comp}\\(`));
  }
  const h1 = at >= 0 ? h1After(src, at) : "";
  const { brand, niche: n } = niche[slug];
  const good = h1 && h1.length >= 6 && h1.length <= 70 && !/^[A-ZА-Я\s]+$/.test(h1) ? h1 : "";
  out.hooks[slug] = { title: `${nice(brand)} — ${good ? good.replace(/\.$/, "") : n}`, description: good ? `${n}. ${good}` : `${nice(brand)} — ${n}.` };
}
// хук-сцены: название + семейство приёма, описание — заметка сцены
for (const m of LAB.matchAll(/\{ slug: "([a-z-]+)", number: "[^"]*", title: "([^"]+)", family: "([^"]+)", note: "([^"]+)"/g)) {
  const [, slug, title, family, note] = m;
  if (!out.hooks[slug]) out.hooks[slug] = { title: `${title} — ${family}`, description: note };
}
out.hooks[""] = { title: "Visual Hooks Lab", description: "Первые экраны, которые цепляют: интерактивные истории, reveal-линзы, живые объекты." };
out.hooks["sites"] = { title: "50 бизнес-сайтов — Visual Hooks", description: "Бизнес-сайты с продуктом-актёром и сквозной историей от первого экрана до заявки." };
out.hooks["animated"] = { title: "Concept-сайты — Visual Hooks", description: "23 концепт-сайта на параллакс-сценах: слои, перекрытия, актёр через весь сайт." };
out.hooks["backgrounds"] = { title: "Живые фоны — Visual Hooks", description: "Библиотека живых фонов для первых экранов." };

/* ── /animated: 30 legacy (ScrollStage) ───────────────────────────────────────────────── */
const AN = R("components/animated-sites/index.tsx");
for (const m of AN.matchAll(/\{ slug: "([a-z]+)", title: "([^"]+)", kicker: "([^"]+)", technique: "([^"]+)", Comp: (\w+) \}/g)) {
  const [, slug, title, , technique, comp] = m;
  const file = `components/animated-sites/sites/${comp}.tsx`;
  const h1 = fs.existsSync(file) ? h1After(R(file), 0) : "";
  const good = h1 && h1.length >= 6 && h1.length <= 70 && /[a-z]/.test(h1) ? h1 : "";
  out.animated[slug] = { title: good ? `${title} — ${good.replace(/\.$/, "")}` : title, description: `${title}: ${technique}.` };
}
out.animated[""] = { title: "Animated — кино-сайты", description: "Кино-анимированные сайты: мир, актёр и склейки по скроллу." };

/* ── /story и /story2: деки ───────────────────────────────────────────────────────────── */
for (const m of R("components/story-sites/index.tsx").matchAll(/\{ slug: "([a-z]+)", title: "([^"]+)", master: "([^"]+)", note: "([^"]+)"/g))
  out.story[m[1]] = { title: `${nice(m[2])} — ${m[3]}`, description: m[4] };
out.story[""] = { title: "Story Sites — журналы историй", description: "Сторителлинг-сайты: один скролл перелистывает журнал историй." };
for (const m of R("components/story-sites/stage/index.tsx").matchAll(/\{ slug: "([a-z]+)", title: "([^"]+)", who: "([^"]+)", note: "([^"]+)"/g))
  out.story2[m[1]] = { title: `${nice(m[2])} — ${m[3]}`, description: m[4] };
out.story2[""] = { title: "Story v2 — кино-истории", description: "Кинематографичные стори-сайты: зритель ведёт камеру, сцены перетекают друг в друга." };

for (const fam of Object.values(out)) for (const k of Object.keys(fam)) fam[k].title = clip(fam[k].title, 70);

const body = `/* СГЕНЕРИРОВАНО scripts/gen-page-titles.ts — не править руками. Заголовки и описания страниц витрин
   (шаблон корня добавляет «| Creatly»). Без "use client": читается в generateMetadata серверных роутов. */
import type { Metadata } from "next";

export type PageFamily = "hooks" | "animated" | "story" | "story2";

const TITLES: Record<PageFamily, Record<string, { title: string; description: string }>> = ${JSON.stringify(out, null, 1)};

export function pageMeta(family: PageFamily, slug?: string): Metadata {
  const m = TITLES[family][slug ?? ""] ?? TITLES[family][""];
  return { title: m.title, description: m.description };
}
`;
fs.writeFileSync(path.resolve("components/shared/page-titles.ts"), body);
for (const [fam, rec] of Object.entries(out)) console.log(fam, Object.keys(rec).length);
if (process.argv.includes("-v")) for (const [fam, rec] of Object.entries(out)) for (const [k, v] of Object.entries(rec)) console.log(fam.padEnd(9), k.padEnd(14), v.title);
