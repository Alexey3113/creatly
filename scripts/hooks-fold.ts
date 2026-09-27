/**
 * Пересборка fold-horizon: синий, мужчина на обрыве, сильный ветер + несущиеся облака.
 * Кадр (soul-cinematic) → kling (async, дедуп через историю).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-fold.ts
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

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  log("кадр s12b-fold (soul-cinematic)");
  const imgUrl = await higsGenerateImage({ model: "soul-cinematic", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-s12b-fold-${Date.now().toString(36)}`,
    prompt: "Epic cinematic cold blue mountain landscape at dusk, a lone rugged man in a weathered heavy coat stands on a rocky cliff edge facing out into the wind, coat and hair whipping, dramatic layered ridges fading into deep blue mist, fast storm clouds, moody steel-blue tones, huge wide sky, the man on the LEFT third, vast sky on the right. Cinematic, sharp. 16:9." });
  await higsDownload(imgUrl, join(DIR, "s12b-fold.png"));
  log("  ✓ s12b-fold");

  const prompt = "Strong wind rushes across the cliff, the man's heavy coat and hair whip powerfully in the gale, storm clouds race fast across the deep blue sky, streaks of mist blow past, the man holds a firm stance leaning into the wind. Powerful epic motion, cold blue, seamless, no cuts, no scene change, cinematic.";
  const since = Date.now() - 20000;
  log("видео fold-vid2 (kling)");
  try {
    const url = await higsGenerateVideoAsync({ prompt, jobId: `hooks-fold-vid2-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, "s12b-fold.png"), duration: 10, quality: "1080p" });
    await higsDownload(url, join(DIR, "fold-vid2.mp4")); log("  ✓ fold-vid2.mp4");
  } catch (err) {
    log(`  … сабмит "${String(err).slice(-40)}" → ищу в истории`);
    const deadline = Date.now() + 14 * 60000;
    while (Date.now() < deadline) { const u = await historyResult(prompt, since); if (u) { await higsDownload(u, join(DIR, "fold-vid2.mp4")); log("  ✓ fold-vid2.mp4 (история)"); break; } await sleep(12000); }
  }
  log("fold готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
