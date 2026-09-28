/* СПРАВОЧНИК САЙТОВ ДЛЯ ГЛАВНОГО МЕНЮ (components/shared/SiteMenu) — все витрины по семьям.
   Имя и обещание — из <title> самой страницы (их пишет generateMetadata/metadata: «Бренд — обещание | Creatly»),
   превью — первый экран из контрольной съёмки analitic/audit/final/<fam>/<id>/f00.jpg → public/menu/<fam>-<id>.webp.
   Dev-сервер должен работать на :3011. Запуск: npx tsx scripts/gen-site-directory.ts */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

type Job = { fam: string; id: string; url: string };
type Item = { id: string; href: string; name: string; note: string; thumb: string };
type Group = { label: string; items: Item[] };
type Family = { key: string; label: string; href: string; blurb: string; groups: Group[] };

const JOBS: Job[] = JSON.parse(fs.readFileSync("analitic/audit/tools/jobs.json", "utf8"));
const FR = "analitic/audit/final";
const THUMBS = path.resolve("public/menu");
const BASE = process.env.SITE_URL || "http://localhost:3011";
// 12 техно-демо лаборатории, ушедшие в «Архив» (components/animated-sites/index.tsx → ARCHIVE)
const ARCHIVE = new Set(["manifesto", "ledger", "cipher", "flux", "aurora", "pulse", "drift", "bloom", "prism", "helix", "column", "ovation"]);

async function title(url: string): Promise<string> {
  const html = await (await fetch(`${BASE}/${url}`, { signal: AbortSignal.timeout(180_000) })).text();
  return (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
}

async function item(j: Job): Promise<Item> {
  const t = (await title(j.url)).replace(/\s*\|\s*Creatly\s*$/, "");
  const [name, ...rest] = t.split(" — ");
  const src = path.join(FR, j.fam, j.id, "f00.jpg");
  const thumb = `/menu/${j.fam}-${j.id}.webp`;
  if (fs.existsSync(src)) await sharp(src).resize(360, 225, { fit: "cover", position: "centre" }).webp({ quality: 68 }).toFile(path.join(THUMBS, `${j.fam}-${j.id}.webp`));
  return { id: j.id, href: `/${j.url}`, name: name.trim(), note: rest.join(" — ").trim(), thumb };
}

async function main() {
  fs.mkdirSync(THUMBS, { recursive: true });
  const by = (fam: string, pick: (j: Job) => boolean = () => true) => JOBS.filter((j) => j.fam === fam && pick(j));
  const list = async (jobs: Job[]) => { const out: Item[] = []; for (const j of jobs) out.push(await item(j)); return out; };

  const families: Family[] = [
    { key: "worlds", label: "Миры", href: "/animated/worlds", blurb: "Иллюстрированные сайты-фильмы: актёр ведёт через сцены, свет и погода текут по всей странице.",
      groups: [{ label: "Миры", items: await list(by("reel")) }] },
    { key: "stories", label: "Кино-истории", href: "/story2", blurb: "Сторис-сайты для личного бренда, портфолио и артиста — зритель сам ведёт камеру из сцены в сцену.",
      groups: [{ label: "Кино-истории", items: await list(by("story2")) }] },
    { key: "business", label: "Бизнес-сайты", href: "/visual-hooks/sites", blurb: "Сайты малого бизнеса: продукт — главный герой от первого экрана до заявки.",
      groups: [{ label: "Бизнес-сайты", items: await list(by("biz")) }] },
    { key: "concepts", label: "Концепты", href: "/visual-hooks/animated", blurb: "Концепт-сайты на параллакс-сценах: слои, перекрытия, сквозной актёр.",
      groups: [{ label: "Концепты", items: await list(by("concept")) }] },
    { key: "hooks", label: "Первые экраны", href: "/visual-hooks", blurb: "Первые экраны, которые цепляют: интерактивные истории, линзы, живые объекты — и второй акт по скроллу.",
      groups: [{ label: "Первые экраны", items: await list(by("hooks")) }] },
    { key: "lab", label: "Лаборатория", href: "/animated", blurb: "Анимированные сайты на движке ScrollStage, журналы-истории и архив приёмов.",
      groups: [
        { label: "Анимированные сайты", items: await list(by("legacy", (j) => !ARCHIVE.has(j.id))) },
        { label: "Журналы-истории", items: await list(by("story")) },
        { label: "Архив приёмов", items: await list(by("legacy", (j) => ARCHIVE.has(j.id))) },
      ] },
  ];

  const body = `/* СГЕНЕРИРОВАНО scripts/gen-site-directory.ts — не править руками. Все витрины по семьям для главного меню.
   Имя/обещание — из <title> страницы, превью — первый экран (public/menu). */

export type SiteItem = { id: string; href: string; name: string; note: string; thumb: string };
export type SiteGroup = { label: string; items: SiteItem[] };
export type SiteFamily = { key: string; label: string; href: string; blurb: string; groups: SiteGroup[] };

export const SITE_FAMILIES: SiteFamily[] = ${JSON.stringify(families, null, 1)};

export const familyCount = (f: SiteFamily) => f.groups.reduce((n, g) => n + g.items.length, 0);
`;
  fs.writeFileSync(path.resolve("components/shared/site-directory.ts"), body);
  for (const f of families) console.log(f.label.padEnd(14), f.groups.map((g) => `${g.label}: ${g.items.length}`).join(" · "));
}

main().catch((e) => { console.error(e); process.exit(1); });
