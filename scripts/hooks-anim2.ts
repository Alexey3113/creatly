/**
 * Visual Hooks — оживление batch 2: лица (взгляд) + атмосферные сцены (дрейф).
 * kling async с ретраями (первый сабмит kling часто «задача не принята»).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-anim2.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const jobs = [
  { name: "macro-face-vid", start: "s8b-face.png", prompt: "The model holds a striking steady gaze into the lens, very subtle breathing, a slow micro head tilt, a few hair strands drift, warm light shifts gently across the glossy sculptural sunglasses. Camera almost still. Seamless, no cuts, no scene change, cinematic beauty film." },
  { name: "atelier-face-vid", start: "s11b-face.png", prompt: "The model holds a calm elegant gaze, blinks slowly once, subtle breathing, the hand holding the perfume bottle shifts almost imperceptibly, a few hair strands drift, soft beauty light. Camera almost still. Seamless, no cuts, no scene change, cinematic." },
  { name: "aether-world-vid", start: "s5b-world.png", prompt: "Soft lavender clouds drift slowly through the divine realm, godrays shift gently, the floating pale architecture and monoliths hover quietly, a tiny distant bird glides, very slow dreamy camera drift. Seamless, no cuts, no scene change, ethereal, cinematic." },
  { name: "fold-land-vid", start: "s12-landscape.png", prompt: "Low mist and clouds drift slowly across the layered mountain ridges, gentle atmospheric motion, the lone tiny figure stands still on the cliff, very slow subtle movement. Seamless, no cuts, no scene change, epic, cinematic." },
  { name: "cloud-sky-vid", start: "s1-sky.png", prompt: "Soft pink, peach and lavender clouds drift slowly across the dreamy sky, gentle billowing motion, warm golden light shifts. Seamless, no cuts, no scene change, calm, cinematic." },
];

async function one(j: (typeof jobs)[number], idx: number) {
  await new Promise((r) => setTimeout(r, idx * 4000)); // stagger сабмиты, чтобы не сталкивались
  log(`vid → ${j.name}`);
  for (let a = 0; a < 5; a++) {
    try {
      const url = await higsGenerateVideoAsync({ prompt: j.prompt, jobId: `hooks-${j.name}-t${a}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, j.start), duration: 10, quality: "1080p" });
      await higsDownload(url, join(DIR, `${j.name}.mp4`));
      log(`  ✓ ${j.name}.mp4`); return;
    } catch (err) { log(`  ✗ ${j.name} try${a}: ${String(err).slice(0, 110)}`); await new Promise((r) => setTimeout(r, 10000)); }
  }
  log(`  ✗✗ ${j.name} не удалось`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  await Promise.all(jobs.map((j, idx) => one(j, idx))); // все параллельно (пул 5, лимит бота 8)
  log("anim2 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
