/**
 * Foreground-вырезы для остальных Interactive Story сцен (паралакс-глубина).
 * Изолированный объект на белом → remove-bg. Только картинки, параллельно — быстро.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-story-fg.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

async function cutout(name: string, prompt: string) {
  log(`raw → ${name}`);
  const raw = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-${name}-${Date.now().toString(36)}`, prompt });
  await higsDownload(raw, join(DIR, `${name}-raw.png`));
  const cut = await higsRemoveBackground(join(DIR, `${name}-raw.png`), `hooks-${name}-cut-${Date.now().toString(36)}`, FOLDER);
  await higsDownload(cut, join(DIR, `${name}.png`));
  log(`  ✓ ${name}`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  await Promise.all([
    cutout("monolith-fg", "A cluster of tall wild meadow flowers and grasses, poppies, cow-parsley and seed heads, backlit at dusk, photographed isolated on a plain flat pure-white background, sharp focus, product cutout style, bottom-weighted, no other objects. 16:9."),
    cutout("planet-fg", "A row of tall dry pampas grass and reeds with soft feathery plumes, gently curving, photographed isolated on a plain flat pure-white background, sharp, product cutout style, no other objects. 16:9."),
    cutout("held-fg", "A few floating jagged translucent crystal shards and one small rocky floating island with faint inner glow, photographed isolated on a plain flat pure-white background, sharp, product cutout style, no other objects. 16:9."),
  ]);
  log("story-fg готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
