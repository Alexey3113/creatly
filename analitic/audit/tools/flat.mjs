// «Плоский кадр» — брошюра на однотонном фоне: ≥65% пикселей в пределах ±4 уровней от модального цвета.
// Дополняет metrics.mjs (coverage по текстуре занижает тёмные миры: ночная плита под лендингом — не «пусто»).
// node flat.mjs <FR-каталог> [out.json]  → по семьям: доля плоских кадров и где начинается «брошюра»
import sharp from "/Users/leo/programming/creatly/node_modules/sharp/lib/index.js";
import fs from "node:fs";
import path from "node:path";

const FR = process.argv[2];
const W = 144, H = 90;

async function flatFrac(file) {
  const { data } = await sharp(file).removeAlpha().resize(W, H, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  const bins = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const k = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
    bins.set(k, (bins.get(k) || 0) + 1);
  }
  let mk = 0, mc = -1;
  for (const [k, c] of bins) if (c > mc) { mc = c; mk = k; }
  const mr = ((mk >> 10) & 31) * 8 + 4, mg = ((mk >> 5) & 31) * 8 + 4, mb = (mk & 31) * 8 + 4;
  let n = 0;
  for (let i = 0; i < data.length; i += 3) if (Math.abs(data[i] - mr) <= 6 && Math.abs(data[i + 1] - mg) <= 6 && Math.abs(data[i + 2] - mb) <= 6) n++;
  return n / (W * H);
}

const out = {};
for (const fam of fs.readdirSync(FR)) {
  const fdir = path.join(FR, fam); if (!fs.statSync(fdir).isDirectory()) continue;
  for (const id of fs.readdirSync(fdir)) {
    const mf = path.join(fdir, id, "meta.json"); if (!fs.existsSync(mf)) continue;
    const m = JSON.parse(fs.readFileSync(mf, "utf8"));
    const ff = [];
    for (const f of m.frames) ff.push(+(await flatFrac(path.join(fdir, id, f.f))).toFixed(3));
    const flat = ff.map((v) => v >= 0.65);
    let end = ff.length;
    for (let i = 0; i + 2 < ff.length; i++) if (flat[i] && flat[i + 1] && flat[i + 2]) { end = i; break; }
    out[`${fam}/${id}`] = { fam, id, ff, flatPct: +(flat.filter(Boolean).length / ff.length).toFixed(3), worldUntil: +(end / Math.max(1, ff.length - 1)).toFixed(2) };
  }
}
if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
const fams = {};
for (const r of Object.values(out)) (fams[r.fam] ||= []).push(r);
for (const [fam, rs] of Object.entries(fams)) {
  const avg = (k) => (rs.reduce((s, r) => s + Math.min(1, r[k]), 0) / rs.length).toFixed(2);
  console.log(`${fam.padEnd(8)} n=${String(rs.length).padEnd(3)} flat=${avg("flatPct")} worldUntil=${avg("worldUntil")} sitesWithFlatRun=${rs.filter((r) => r.worldUntil < 1).length}`);
}
