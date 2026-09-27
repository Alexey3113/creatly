// Метрики кадров: node metrics.mjs  → metrics.json + сводка по семьям
// coverage = доля блоков 6×6 (на 144×90 grayscale) с локальной stdev > 6 → «сколько экрана занято изображением/текстурой».
// empty-кадр: coverage < 0.03 (почти однотонный экран); cine-кадр: coverage > 0.5 (картинка доминирует).
import sharp from "/Users/leo/programming/creatly/node_modules/sharp/lib/index.js";
import fs from "node:fs";
import path from "node:path";

const ROOT = "/private/tmp/claude-501/-Users-leo-programming-creatly/e9fdafa6-590e-4b44-b54f-f89568bf43ee/scratchpad/audit";
const FR = path.join(ROOT, "frames");
const W = 144, H = 90, B = 6;

async function coverage(file) {
  const { data } = await sharp(file).greyscale().resize(W, H, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let tex = 0, n = 0;
  for (let by = 0; by < H; by += B) for (let bx = 0; bx < W; bx += B) {
    let s = 0, s2 = 0;
    for (let y = by; y < by + B; y++) for (let x = bx; x < bx + B; x++) { const v = data[y * W + x]; s += v; s2 += v * v; }
    const m = s / (B * B); const sd = Math.sqrt(Math.max(0, s2 / (B * B) - m * m));
    if (sd > 6) tex++; n++;
  }
  return tex / n;
}

const out = {};
for (const fam of fs.readdirSync(FR)) {
  const fdir = path.join(FR, fam); if (!fs.statSync(fdir).isDirectory()) continue;
  for (const id of fs.readdirSync(fdir)) {
    const mf = path.join(fdir, id, "meta.json"); if (!fs.existsSync(mf)) continue;
    const m = JSON.parse(fs.readFileSync(mf, "utf8"));
    const cov = [];
    for (const f of m.frames) cov.push(+(await coverage(path.join(fdir, id, f.f))).toFixed(3));
    const n = cov.length;
    const empty = cov.filter((c) => c < 0.03).length;
    const cine = cov.filter((c) => c > 0.5).length;
    // где кончается кино: первый индекс, после которого 3 кадра подряд < 0.4
    let end = n;
    for (let i = 0; i + 2 < n; i++) if (cov[i] < 0.4 && cov[i + 1] < 0.4 && cov[i + 2] < 0.4) { end = i; break; }
    out[`${fam}/${id}`] = { fam, id, n, cov, emptyPct: +(empty / n).toFixed(2), cinePct: +(cine / n).toFixed(2), filmEndsAt: +(end / Math.max(1, n - 1)).toFixed(2), screens: m.stats?.screens, errs: m.errs.length, failed: m.failed.length, broken: m.stats?.brokenCount ?? 0, failedFonts: m.stats?.failedFonts ?? [] };
  }
}
fs.writeFileSync(path.join(ROOT, "metrics.json"), JSON.stringify(out, null, 1));
const fams = {};
for (const r of Object.values(out)) (fams[r.fam] ||= []).push(r);
const avg = (a, k) => (a.reduce((s, r) => s + r[k], 0) / a.length).toFixed(2);
for (const [fam, rs] of Object.entries(fams)) {
  console.log(`${fam.padEnd(8)} n=${String(rs.length).padEnd(3)} empty=${avg(rs, "emptyPct")} cine=${avg(rs, "cinePct")} filmEndsAt=${avg(rs, "filmEndsAt")} screens=${avg(rs, "screens")} errs=${rs.filter((r) => r.errs).length} 4xx=${rs.filter((r) => r.failed).length} broken=${rs.filter((r) => r.broken).length} fontFail=${rs.filter((r) => r.failedFonts.length).length}`);
}
if (process.argv[2] === "-v") for (const r of Object.values(out)) console.log(`${r.fam}/${r.id}`.padEnd(24), `empty=${r.emptyPct} cine=${r.cinePct} end=${r.filmEndsAt} scr=${r.screens}`, r.cov.map((c) => Math.round(c * 9)).join(""));
