// Контакт-листы: node sheet.mjs [fam|id ...]  → frames/<fam>/<id>/sheet.jpg  + walls/<fam>-wall-<k>.jpg
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const FR = process.env.FR || path.join(ROOT, "frames");
const only = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const pg = await b.newPage({ viewport: { width: 1960, height: 400 }, deviceScaleFactor: 1 });

const css = `body{margin:0;background:#111;color:#ddd;font:13px/1.3 ui-monospace,Menlo,monospace}
.h{padding:10px 14px;background:#222;font-size:15px;color:#fff}.h small{color:#9a9;margin-left:12px;font-size:12px}
.g{display:grid;grid-template-columns:repeat(6,320px);gap:6px;padding:8px}
.c{position:relative}.c img{width:320px;height:200px;display:block;object-fit:cover}
.c span{position:absolute;left:4px;top:4px;background:rgba(0,0,0,.72);color:#ffe28a;padding:1px 5px;font-size:12px;border-radius:3px}
.w{display:grid;grid-template-columns:repeat(5,384px);gap:8px;padding:8px}.w .c img{width:384px;height:240px}`
  // VP=mobile: портретные кадры телефона 390×844 — 10 колонок без обрезки
  + (process.env.VP === "mobile" ? `.g{grid-template-columns:repeat(10,188px)}.c img{width:188px;height:407px}.w{grid-template-columns:repeat(8,236px)}.w .c img{width:236px;height:511px}` : "");

async function render(html, out, width) {
  await pg.setViewportSize({ width, height: 400 });
  const tmp = out.replace(/\.jpg$/, ".html");
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`);
  await pg.goto("file://" + tmp, { waitUntil: "load" });
  await pg.screenshot({ path: out, type: "jpeg", quality: 80, fullPage: true });
  fs.unlinkSync(tmp);
}

const fams = fs.readdirSync(FR).filter((f) => fs.statSync(path.join(FR, f)).isDirectory());
for (const fam of fams) {
  const ids = fs.readdirSync(path.join(FR, fam)).filter((id) => fs.existsSync(path.join(FR, fam, id, "meta.json")));
  for (const id of ids) {
    if (only.length && !only.includes(fam) && !only.includes(id)) continue;
    const dir = path.join(FR, fam, id);
    const m = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8"));
    const s = m.stats || {};
    const head = `<div class="h">${fam}/${id} <small>/${m.url} · ${s.screens ?? "?"} экранов · sticky ${s.sticky ?? "?"} · fixed ${s.fixed ?? "?"} · video ${s.videos ?? 0} · canvas ${s.canvases ?? 0} · broken ${s.brokenCount ?? 0} · err ${m.errs.length} · 4xx ${m.failed.length}</small></div>`;
    const grid = m.frames.map((f) => `<div class="c"><img src="file://${dir}/${f.f}"><span>${f.label}</span></div>`).join("");
    await render(head + `<div class="g">${grid}</div>`, path.join(dir, "sheet.jpg"), 1960);
  }
  // стена hero (первый кадр) и «середины» каждого сайта семьи — для сравнения между сайтами
  if (!only.length || only.includes(fam)) {
    const metas = ids.map((id) => ({ id, m: JSON.parse(fs.readFileSync(path.join(FR, fam, id, "meta.json"), "utf8")) }));
    const pick = (m, frac) => m.frames[Math.min(m.frames.length - 1, Math.round((m.frames.length - 1) * frac))].f;
    for (const [tag, frac] of [["hero", 0], ["q1", 0.25], ["mid", 0.5], ["q3", 0.75]]) {
      const chunks = [];
      for (let i = 0; i < metas.length; i += 25) chunks.push(metas.slice(i, i + 25));
      let k = 0;
      for (const ch of chunks) {
        const grid = ch.map(({ id, m }) => `<div class="c"><img src="file://${path.join(FR, fam, id, pick(m, frac))}"><span>${id}</span></div>`).join("");
        fs.mkdirSync(path.join(ROOT, "walls"), { recursive: true });
        await render(`<div class="h">${fam} — ${tag} (кадр ${frac * 100}% страницы)</div><div class="w">${grid}</div>`, path.join(ROOT, "walls", `${fam}-${tag}-${k++}.jpg`), 1980);
      }
    }
  }
}
await b.close();
console.log("sheets done");
