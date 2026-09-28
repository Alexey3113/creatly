// Проверка развёрнутого стенда: BASE=http://host:port node remote-check.mjs [all] — открывает страницы (по умолчанию
// по 2 из каждой семьи + галереи, с `all` — все 182), прокручивает, собирает ошибки консоли и ответы ≥400.
import { chromium } from "/Users/leo/programming/creatly/node_modules/playwright/index.mjs";
import fs from "node:fs";

const BASE = process.env.BASE || "http://150.241.115.178:8080";
const jobs = JSON.parse(fs.readFileSync(new URL("./jobs.json", import.meta.url), "utf8"));
const all = process.argv.includes("all");
const pick = all ? jobs : Object.values(jobs.reduce((m, j) => ((m[j.fam] ||= []).length < 2 && m[j.fam].push(j), m), {})).flat();
const urls = [...new Set(["", "animated", "animated/worlds", "story2", "story", "visual-hooks", "visual-hooks/sites", "visual-hooks/animated", ...pick.map((j) => j.url)])];

const b = await chromium.launch({ channel: "chrome" });
let bad = 0;
const CONC = 3;
let i = 0;
async function worker() {
  while (i < urls.length) {
    const u = urls[i++];
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const errs = [], fails = [];
    p.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
    p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
    p.on("response", (r) => { if (r.status() >= 400) fails.push(`${r.status()} ${r.url().replace(BASE, "")}`.slice(0, 160)); });
    const t0 = Date.now();
    let status = 0;
    try {
      const r = await p.goto(`${BASE}/${u}`, { waitUntil: "load", timeout: 90000 });
      status = r?.status() ?? 0;
      await p.waitForTimeout(1500);
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, 12000); y += 900) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(160); }
      await p.waitForTimeout(800);
    } catch (e) { errs.push("goto: " + String(e).slice(0, 120)); }
    const ok = status === 200 && !errs.length && !fails.length;
    if (!ok) bad++;
    console.log(`${ok ? "OK " : "BAD"} ${String(status).padEnd(3)} ${((Date.now() - t0) / 1000).toFixed(1).padStart(5)}s /${u}${fails.length ? "  4xx: " + [...new Set(fails)].slice(0, 4).join(" | ") : ""}${errs.length ? "  err: " + [...new Set(errs)].slice(0, 2).join(" | ") : ""}`);
    await ctx.close();
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
await b.close();
console.log(`pages ${urls.length}, bad ${bad}`);
