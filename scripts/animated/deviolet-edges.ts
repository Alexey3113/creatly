/* ANIMATED · чистка фиолетового ореола по КРОМКЕ вырезок (второй проход после demagenta.ts).
   demagenta снимает яркую магенту (min(R,B) − G > 58) по всей плите; здесь — тёмно-фиолетовый остаток
   хромакея, который живёт только у прозрачного края (в пределах R px от alpha≈0) и ниже прежнего порога.
   Пиксель у кромки «фиолетовый», если v = min(R,B) − G > LO и синий выше зелёного на 20+;
   v ≥ HI — прозрачно, между — плавное снижение альфы и увод цвета к нейтральному.
   Оригиналы → _raw/<file>.pre-deviolet.webp. Запуск: npx tsx scripts/animated/deviolet-edges.ts [--check] [slug/file ...] */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/uploads/1/animated");
const LO = 14, HI = 60, R = 10;

/** маска «рядом с прозрачным»: разделимое расширение прозрачных пикселей на R */
function nearEdge(alpha: Uint8Array, w: number, h: number): Uint8Array {
  const tr = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) tr[i] = alpha[i] < 40 ? 1 : 0;
  const hx = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    let run = -1e9;
    for (let x = 0; x < w; x++) { if (tr[y * w + x]) run = x; if (x - run <= R) hx[y * w + x] = 1; }
    run = 1e9;
    for (let x = w - 1; x >= 0; x--) { if (tr[y * w + x]) run = x; if (run - x <= R) hx[y * w + x] = 1; }
  }
  const out = new Uint8Array(w * h);
  for (let x = 0; x < w; x++) {
    let run = -1e9;
    for (let y = 0; y < h; y++) { if (hx[y * w + x]) run = y; if (y - run <= R) out[y * w + x] = 1; }
    run = 1e9;
    for (let y = h - 1; y >= 0; y--) { if (hx[y * w + x]) run = y; if (run - y <= R) out[y * w + x] = 1; }
  }
  return out;
}

async function measure(file: string, fix: boolean): Promise<number> {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3];
  const edge = nearEdge(alpha, w, h);
  let touched = 0;
  for (let p = 0; p < w * h; p++) {
    if (!edge[p]) continue;
    const i = p * 4, r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 40) continue;
    const v = Math.min(r, b) - g;
    if (v <= LO || b - g < 20) continue;
    touched++;
    if (!fix) continue;
    const k = Math.min(1, (v - LO) / (HI - LO));
    data[i + 3] = Math.round(a * (1 - k));
    const gray = Math.round(((r + g + b) / 3) * 0.8);
    data[i] = Math.round(r + (gray - r) * k);
    data[i + 2] = Math.round(b + (gray - b) * k);
  }
  if (fix && touched) {
    const bak = path.join(path.dirname(file), "_raw", path.basename(file).replace(/\.webp$/, ".pre-deviolet.webp"));
    fs.mkdirSync(path.dirname(bak), { recursive: true });
    if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
    await sharp(data, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 84, alphaQuality: 90 }).toFile(file + ".tmp");
    fs.renameSync(file + ".tmp", file);
  }
  return touched / (w * h);
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const only = args.filter((a) => !a.startsWith("--"));
  const files: string[] = [];
  for (const s of fs.readdirSync(ROOT)) {
    const d = path.join(ROOT, s);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => /^s\d-(fg|mid)\.webp$/.test(x))) {
      const key = `${s}/${f.replace(/\.webp$/, "")}`;
      if (only.length && !only.includes(key) && !only.includes(s)) continue;
      files.push(path.join(d, f));
    }
  }
  for (const f of files) {
    const share = await measure(f, !check);
    if (share > 0.0005) console.log(`${path.relative(ROOT, f).padEnd(26)} ${(share * 100).toFixed(2)}% px у кромки${check ? "" : " — почищено"}`);
  }
}
if (process.argv[1]?.endsWith("deviolet-edges.ts")) main().catch((e) => { console.error(e); process.exit(1); });
