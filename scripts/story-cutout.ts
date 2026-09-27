/* STORY — вырезка фона у hero (remove-background) → прозрачный PNG для вордмарк-окклюзии. */
import path from "node:path";
import { higsAvailable, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story/tatoo");
const FOLDER = "story-tatoo";
const SRC = ["vision-hero-a", "shadows-hero-a", "solitude-hero-a"];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const stamp = Date.now();
  const jobs = SRC.map((name, i) => (async () => {
    try {
      await new Promise((r) => setTimeout(r, i * 3500));
      const url = await higsRemoveBackground(path.join(OUT, `${name}.jpg`), `cut-${name}-${stamp}`, FOLDER);
      await higsDownload(url, path.join(OUT, `${name}-cut.png`));
      console.log(`OK ${name}-cut`);
    } catch (e) { console.error(`FAIL ${name}:`, (e as Error).message); }
  })());
  await Promise.all(jobs);
  console.log("story-cutout: готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
