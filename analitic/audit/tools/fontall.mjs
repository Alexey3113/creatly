import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
import fs from "node:fs";
const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const b = await chromium.launch({ channel: "chrome" });
const res = {}; let i = 0;
async function worker() {
  while (i < jobs.length) {
    const j = jobs[i++]; const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await pg.goto("http://localhost:3011/" + j.url, { waitUntil: "load", timeout: 120000 }); await pg.waitForTimeout(2500);
      res[`${j.fam}/${j.id}`] = await pg.evaluate(async () => {
        await document.fonts.ready;
        const fams = new Map();
        for (const el of Array.from(document.querySelectorAll("h1,h2,h3,p,a,span,b,em,blockquote")).slice(0, 400)) {
          const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none") continue;
          const first = cs.fontFamily.split(",")[0].trim().replace(/"/g, "");
          if (/^(serif|sans-serif|system-ui|monospace|ui-|-apple|Arial|Helvetica|Times|Georgia)/i.test(first)) continue;
          fams.set(first, (fams.get(first) || 0) + 1);
        }
        const out = {};
        for (const [f, n] of fams) { const faces = Array.from(document.fonts).filter((x) => x.family.replace(/"/g, "") === f); out[f] = faces.length === 0 ? "MISSING" : faces.some((x) => x.status === "loaded") ? "ok" : "unloaded"; }
        return out;
      });
    } catch (e) { res[`${j.fam}/${j.id}`] = { err: String(e).slice(0, 80) }; }
    await pg.close();
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
await b.close();
fs.writeFileSync(process.argv[3], JSON.stringify(res, null, 1));
const byFam = {};
for (const [k, v] of Object.entries(res)) { const fam = k.split("/")[0]; byFam[fam] ||= { pages: 0, broken: 0, list: [] }; byFam[fam].pages++; const miss = Object.entries(v).filter(([, s]) => s === "MISSING").map(([f]) => f); if (miss.length) { byFam[fam].broken++; byFam[fam].list.push(k.split("/")[1] + ":" + miss.join("+")); } }
for (const [f, o] of Object.entries(byFam)) console.log(f.padEnd(8), `страниц с незагруженными шрифтами: ${o.broken}/${o.pages}`, o.list.slice(0, 8).join(" | "));
