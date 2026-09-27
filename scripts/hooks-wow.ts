/**
 * Фаза 3 — 5 вау-историй (scrub). Bloom hero (soul-cinematic) → 5 kling-видео параллельно + дедуп.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-wow.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideoAsync } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function historyResult(promptPrefix: string, sinceTs: number): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}/api/history`, { signal: AbortSignal.timeout(20000) });
    const j: any = await res.json();
    const items = (j.items || []).filter((it: any) => it.model === "kling-3.0" && it.folder === FOLDER && (it.prompt || "").slice(0, 42) === promptPrefix.slice(0, 42) && (it.timestamp || 0) >= sinceTs);
    for (const it of items) { const p = it.images && it.images[0]; if (p) return p.startsWith("http") ? p : `${BASE}/${String(p).replace(/^\/+/, "")}`; }
  } catch {}
  return null;
}
async function genVideo(name: string, startFile: string, prompt: string, idx: number) {
  await sleep(idx * 4000);
  const since = Date.now() - 20000;
  log(`vid → ${name}`);
  try {
    const url = await higsGenerateVideoAsync({ prompt, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, startFile), duration: 10, quality: "1080p" });
    await higsDownload(url, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4`); return;
  } catch (err) {
    log(`  … ${name}: "${String(err).slice(-36)}" → история`);
    const deadline = Date.now() + 15 * 60000;
    while (Date.now() < deadline) { const u = await historyResult(prompt, since); if (u) { await higsDownload(u, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4 (история)`); return; } await sleep(12000); }
    log(`  ✗ ${name}`);
  }
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  log("bloom-hero (soul-cinematic)");
  const bh = await higsGenerateImage({ model: "soul-cinematic", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-bloom-hero-${Date.now().toString(36)}`,
    prompt: "Ethereal cyber-botanical goddess, a serene beautiful woman's face and shoulders centered-right, translucent porcelain skin with glowing bioluminescent circuitry veins in cyan and soft pink flowing beneath, delicate cherry blossoms and pink peonies growing through her hair and around her, dark moody background, dreamy, hyper-detailed, cinematic, luminous, vast negative space on the left. 16:9." });
  await higsDownload(bh, join(DIR, "bloom-hero.png"));
  log("  ✓ bloom-hero");

  const jobs = [
    { name: "bloom-vid", start: "bloom-hero.png", prompt: "The bioluminescent circuitry veins pulse and flow with cyan and pink light beneath the skin, cherry blossoms and peonies slowly bloom and drift, delicate glowing particles float upward, she very slowly opens her luminous glowing eyes, ethereal breathing, a living organism. Seamless, no cuts, no scene change, mesmerizing, cinematic." },
    { name: "held-world-vid", start: "add-hand.png", prompt: "The tiny glowing snow-capped miniature world held between the fingertips slowly rotates, soft clouds drift over its little mountains, gentle light pulses from within, wisps of mist curl around it, magical, the hand steady in the dark. Seamless, no cuts, no scene change, cinematic." },
    { name: "monolith-vid", start: "add-monolith.png", prompt: "Low mist drifts slowly across the flower field around the dark monolith, the warm sunset glow behind it gradually intensifies and blooms brighter, faint particles float upward, epic and mysterious, very slow. Seamless, no cuts, no scene change, cinematic." },
    { name: "planet-vig-vid", start: "add-planet.png", prompt: "The giant planet slowly rotates revealing its surface, the girl's long pink hair blows gently in the wind, drifting dust and particles catch the dusk light, dreamy and vast, camera almost still. Seamless, no cuts, no scene change, cinematic." },
    { name: "ascension-vid", start: "add-mist.png", prompt: "The serene figure slowly emerges from and dissolves back into drifting luminous mist and clouds, soft light blooms and fades, ethereal veils flow gently, spiritual, calm breathing. Seamless, no cuts, no scene change, cinematic." },
  ];
  log("5 видео параллельно + дедуп");
  await Promise.all(jobs.map((j, i) => genVideo(j.name, j.start, j.prompt, i)));
  log("wow готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
