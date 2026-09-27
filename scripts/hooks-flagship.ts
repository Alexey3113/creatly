/**
 * Visual Hooks — флагманские START-кадры через Higs Bot, все движки на выбор.
 * Движки: soul-cinematic + soul-v2 (лучше для первого кадра) + nano-banana-pro.
 * Язык: filmic editorial / cinema warm. 2K, 16:9. Видео — после апрува кадра.
 * end/reveal-кадр делаем позже через nano-banana-pro + ref (usePhotos:true).
 * Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/hooks-flagship.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks");
const FOLDER = "visual-hooks";
const POOL = 8; // бот держит до 8 активных генераций

const WARM =
  "Filmic editorial product photograph, warm muted palette, soft directional window light from the left, gentle long shadow, faint 35mm film grain, shallow depth of field, art-directed, premium, high fidelity. Object placed centered-right with vast calm negative space on the left for a large headline. No text, no logo. 16:9.";

const OVOID =
  "A single smooth monolithic ovoid object resting on a warm travertine stone plinth. One half polished mirror chrome, the other half frosted translucent glass, split down the middle by a thin glowing warm amber light seam. Mysterious premium device. ";
const RIBBON =
  "A single tall twisting double-helix ribbon sculpture of polished liquid chrome fused with clear glass, standing vertically on a seamless warm sand-beige backdrop, elegant slow curl. ";

const engines = ["soul-cinematic", "soul-v2", "nano-banana-pro"] as const;
const objects = [
  { key: "ovoid", body: OVOID },
  { key: "ribbon", body: RIBBON },
];

const jobs = objects.flatMap((o) =>
  engines.map((model) => ({
    name: `${o.key}-${model}`,
    model,
    prompt: o.body + WARM,
  })),
);

async function runPool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const item = items[i++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн (127.0.0.1:3210)");
  const t0 = Date.now();
  const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

  log(`старт: ${jobs.length} кадров, пул ${POOL}`);
  await runPool(jobs, POOL, async (j) => {
    log(`→ ${j.name}`);
    try {
      const url = await higsGenerateImage({
        prompt: j.prompt,
        model: j.model,
        jobId: `hooks-${j.name}-${Date.now().toString(36)}`,
        folder: FOLDER,
        aspectRatio: "16:9",
        quality: "2K",
      });
      const local = join(DIR, `bot-${j.name}.png`);
      await higsDownload(url, local);
      log(`  ✓ ${j.name}`);
    } catch (err) {
      log(`  ✗ ${j.name}: ${String(err).slice(0, 180)}`);
    }
  });
  log("готово");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
