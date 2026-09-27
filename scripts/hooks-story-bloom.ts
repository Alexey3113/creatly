/**
 * Bloom — flagship multi-act story assets.
 *  1) bloom-fg      — foreground cherry-blossom branch cutout (nano → remove-bg) для parallax
 *  2) bloom-eye     — macro close-up глаза с био-схемой (nano ref bloom-hero) — start frame сплайса
 *  3) bloom-eye-vid — kling splice video (глаз распускается) для финального акта
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-story-bloom.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideoAsync, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function historyResult(pfx: string, since: number): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}/api/history`, { signal: AbortSignal.timeout(20000) });
    const j: any = await res.json();
    const items = (j.items || []).filter((it: any) => it.model === "kling-3.0" && it.folder === FOLDER && (it.prompt || "").slice(0, 42) === pfx.slice(0, 42) && (it.timestamp || 0) >= since);
    for (const it of items) { const p = it.images && it.images[0]; if (p) return p.startsWith("http") ? p : `${BASE}/${String(p).replace(/^\/+/, "")}`; }
  } catch {}
  return null;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // 1) Foreground blossom branch → cutout
  log("bloom-fg-raw (nano)");
  const fgRaw = await higsGenerateImage({
    model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER,
    jobId: `hooks-bloom-fg-${Date.now().toString(36)}`,
    prompt: "A single elegant arching branch of pink cherry blossoms and one soft peony, delicate petals and dark twigs, photographed isolated on a plain flat pure-white studio background, sharp focus, no other objects, product cutout style, even lighting. 16:9.",
  });
  await higsDownload(fgRaw, join(DIR, "bloom-fg-raw.png"));
  log("  remove-bg → bloom-fg.png");
  const fgCut = await higsRemoveBackground(join(DIR, "bloom-fg-raw.png"), `hooks-bloom-fgcut-${Date.now().toString(36)}`, FOLDER);
  await higsDownload(fgCut, join(DIR, "bloom-fg.png"));
  log("  ✓ bloom-fg");

  // 2) Macro eye start frame (ref = hero, чтобы совпал персонаж/палитра)
  log("bloom-eye (nano ref hero)");
  const eye = await higsGenerateImage({
    model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER,
    jobId: `hooks-bloom-eye-${Date.now().toString(36)}`,
    refFrames: [join(DIR, "bloom-hero.png")],
    prompt: "Extreme macro close-up of the same cyber-botanical woman's closed eye, translucent porcelain skin, glowing bioluminescent cyan and soft-pink circuitry veins tracing the eyelid and lashes, a tiny dew drop, cherry-blossom petals softly out of focus at the frame edges, dark moody cinematic, hyper-detailed. 16:9.",
  });
  await higsDownload(eye, join(DIR, "bloom-eye.png"));
  log("  ✓ bloom-eye");

  // 3) Splice video — глаз медленно распускается светом
  const prompt = "The closed eye very slowly opens, the luminous glowing iris blooms open like a flower, cyan and pink circuitry light pulses and flows across the skin, a single blossom petal drifts past, a tiny dew drop catches the light, mesmerizing, camera perfectly still. Seamless, no cuts, no scene change, cinematic.";
  const since = Date.now() - 20000;
  log("bloom-eye-vid (kling async + дедуп)");
  try {
    const u = await higsGenerateVideoAsync({ prompt, jobId: `hooks-bloom-eye-vid-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, "bloom-eye.png"), duration: 10, quality: "1080p" });
    await higsDownload(u, join(DIR, "bloom-eye-vid.mp4"));
    log("  ✓ bloom-eye-vid.mp4");
  } catch (err) {
    log(`  … "${String(err).slice(-36)}" → история`);
    const deadline = Date.now() + 18 * 60000;
    while (Date.now() < deadline) {
      const u = await historyResult(prompt, since);
      if (u) { await higsDownload(u, join(DIR, "bloom-eye-vid.mp4")); log("  ✓ bloom-eye-vid.mp4 (история)"); break; }
      await sleep(12000);
    }
  }
  log("story-bloom готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
