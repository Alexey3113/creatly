/* ANIMATED · чистка магентовой бахромы в fg-полосах миров (остаток хромакея magenta→alpha).
   Пиксель «магентовый», если И красный, И синий заметно выше зелёного: m = min(R,B) − G.
   Настоящие красные/оранжевые (синий низкий) и лаванда (зелёный высокий) не задеваются.
   m ≤ LO — без изменений; m ≥ HI — полностью прозрачно; между — плавное снижение альфы и увод цвета к нейтральному.
   Оригиналы → _raw/<file>.pre-demag.webp. Запуск: npx tsx scripts/animated/demagenta.ts [slug ...] */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/uploads/1/animated");
const LO = 58, HI = 118;

export async function clean(file: string): Promise<{ touched: number; total: number }> {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let touched = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a === 0) continue;
    const m = Math.min(r, b) - g;
    if (m <= LO) continue;
    const k = Math.min(1, (m - LO) / (HI - LO)); // 0..1 насколько магента
    data[i + 3] = Math.round(a * (1 - k));
    // оставшийся край — к нейтральному тону (без фиолетового ореола)
    const gray = Math.round((r + g + b) / 3 * 0.8);
    data[i] = Math.round(r + (gray - r) * k);
    data[i + 2] = Math.round(b + (gray - b) * k);
    touched++;
  }
  const bak = path.join(path.dirname(file), "_raw", path.basename(file).replace(/\.webp$/, ".pre-demag.webp"));
  fs.mkdirSync(path.dirname(bak), { recursive: true });
  if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ quality: 84, alphaQuality: 90 }).toFile(file + ".tmp");
  fs.renameSync(file + ".tmp", file);
  return { touched, total: data.length / 4 };
}

async function main() {
  const only = process.argv.slice(2);
  const slugs = fs.readdirSync(ROOT).filter((s) => fs.existsSync(path.join(ROOT, s, "s1-fg.webp")) && (!only.length || only.includes(s)));
  for (const s of slugs) {
    for (let i = 1; i <= 4; i++) {
      const f = path.join(ROOT, s, `s${i}-fg.webp`);
      if (!fs.existsSync(f)) continue;
      const bak = path.join(ROOT, s, "_raw", `s${i}-fg.pre-demag.webp`);
      if (fs.existsSync(bak)) { console.log(`SKIP ${s}/s${i}-fg (уже чистили)`); continue; }
      const r = await clean(f);
      console.log(`${s}/s${i}-fg: ${(100 * r.touched / r.total).toFixed(2)}% px`);
    }
  }
}
if (process.argv[1]?.endsWith("demagenta.ts")) main().catch((e) => { console.error(e); process.exit(1); });
