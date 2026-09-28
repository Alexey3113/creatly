/* ANIMATED · «запекание» SVG-фильтров в ассеты.
   CSS `filter:url(#…)` (снятие магенты, эрозия кромки, ночь фестиваля) в Safari/iOS считается на CPU и
   при первом показе слоя стопорит прокрутку на 100+ мс (главная: fg бухты Lumen, рывок ~125 мс).
   Здесь Chrome рисует картинку на canvas через ТОТ ЖЕ фильтр (ctx.filter) — пиксели совпадают с тем,
   что видно в браузере, — и результат заменяет файл; фильтр из CSS убирается.
   Радиусы фильтров заданы в CSS px элемента; на картинке в натуральном размере они умножаются на k
   (натуральных px на CSS px при 1440×900, object-fit:cover).
   Оригиналы → _raw/<file>.pre-bake.webp (повторный запуск берёт оригинал оттуда — идемпотентно).
   Запуск: npx tsx scripts/animated/bake-filters.ts */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { chromium } from "playwright";

const ROOT = path.resolve("public/uploads/1/animated");

const demag = (m: string) => `<filter id="f" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${m}"/></filter>`;
const trim = (r: number) => `<filter id="f"><feMorphology in="SourceAlpha" operator="erode" radius="${r}" result="a"/><feComposite in="SourceGraphic" in2="a" operator="in"/></filter>`;
const night = (sd: number) => `<filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feColorMatrix in="SourceGraphic" type="matrix" result="dark" values=".2 .04 .02 0 0  .02 .22 .06 0 .005  .05 .08 .36 0 .03  0 0 0 1 0"/>
  <feColorMatrix in="SourceGraphic" type="matrix" result="k0" values="1.18 0 0 0 0  0 1.04 0 0 0  0 0 .86 0 0  3.4 0 -3.4 0 -.4"/>
  <feComposite in="k0" in2="SourceAlpha" operator="in" result="key"/>
  <feGaussianBlur in="key" stdDeviation="${sd}" result="glow"/>
  <feMerge><feMergeNode in="dark"/><feMergeNode in="glow"/><feMergeNode in="key"/></feMerge></filter>`;

const LM = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.2 2.6 -1.4 1 .2";
const NM = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -.6 2.4 -1.8 1 .15";
const LN = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 2.6 -2.6 1 .12";

// файл → svg-фильтр + хвост CSS-цепочки (brightness/saturate тоже запекаются)
const JOBS: Array<{ file: string; svg: string; chain?: string }> = [
  { file: "lumen/s1-fg.webp", svg: demag(LM) },
  { file: "lumen/s2-fg.webp", svg: demag(LM) }, // и главная (бухта)
  { file: "lumen/s3-fg.webp", svg: demag(LM), chain: "brightness(.55) saturate(.85)" },
  { file: "lumen/s4-fg.webp", svg: demag(LM) },
  { file: "nomad/s1-fg.webp", svg: demag(NM) },
  { file: "nomad/s4-fg.webp", svg: demag(NM), chain: "brightness(.42) saturate(.85)" },
  { file: "lantern/s2-fg.webp", svg: demag(LN) },
  { file: "lantern/s4-fg.webp", svg: demag(LN) },
  // ночь фестиваля: s3-bg всюду показывается ночью (сцена + три плиты Backdrop)
  { file: "lantern/s3-bg.webp", svg: night(6 * 1.2) },
  { file: "lantern/s3-fg.webp", svg: night(6 * 1.05) },
  { file: "koi/s1-fg.webp", svg: trim(1.6 * 1.2) },
  { file: "highland/s1-fg.webp", svg: trim(2.2 * 1.05) },
  { file: "highland/s2-fg.webp", svg: trim(2.2 * 1.05) },
  { file: "highland/s4-fg.webp", svg: trim(2.2 * 1.05) },
];

async function main() {
  const only = process.argv.slice(2);
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage();
  await p.setContent("<!doctype html><body></body>");
  for (const j of JOBS.filter((j) => !only.length || only.some((o) => j.file.includes(o)))) {
    const file = path.join(ROOT, j.file);
    const bak = path.join(path.dirname(file), "_raw", path.basename(file).replace(/\.webp$/, ".pre-bake.webp"));
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
    const src = `data:image/webp;base64,${fs.readFileSync(bak).toString("base64")}`;
    const png: string = await p.evaluate(async ({ src, svg, chain }) => {
      document.body.innerHTML = `<svg width="0" height="0" style="position:absolute">${svg}</svg>`;
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.filter = `url(#f)${chain ? " " + chain : ""}`;
      ctx.drawImage(img, 0, 0);
      return c.toDataURL("image/png").split(",")[1];
    }, { src, svg: j.svg, chain: j.chain });
    const buf = Buffer.from(png, "base64");
    const alpha = (await sharp(bak).metadata()).hasAlpha;
    const out = sharp(buf);
    await (alpha ? out.webp({ quality: 84, alphaQuality: 90 }) : out.removeAlpha().webp({ quality: 86 })).toFile(file + ".tmp");
    fs.renameSync(file + ".tmp", file);
    console.log(`${j.file}: ${(fs.statSync(bak).size / 1024).toFixed(0)} → ${(fs.statSync(file).size / 1024).toFixed(0)} КБ`);
  }
  await b.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
