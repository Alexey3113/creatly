/**
 * Visual Hooks — оживление batch 3 (strata / botanica / neon / orbit).
 * ПАРАЛЛЕЛЬНО + ДЕДУП: при "задача не принята"/таймауте НЕ пересабмичиваем,
 * а забираем уже запущенную генерацию из /api/history (без двойных кредитов).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-anim3.ts
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
    const items = (j.items || []).filter((it: any) =>
      it.model === "kling-3.0" && it.folder === FOLDER &&
      (it.prompt || "").slice(0, 42) === promptPrefix.slice(0, 42) &&
      (it.timestamp || 0) >= sinceTs);
    for (const it of items) { const p = it.images && it.images[0]; if (p) return p.startsWith("http") ? p : `${BASE}/${String(p).replace(/^\/+/, "")}`; }
  } catch {}
  return null;
}

/** Видео с дедупом: одна отправка; при ошибке — восстановление из истории, без пересабмита. */
async function genVideo(name: string, startFile: string, prompt: string) {
  const since = Date.now() - 20000;
  log(`vid → ${name}`);
  try {
    const url = await higsGenerateVideoAsync({ prompt, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, startFile), duration: 10, quality: "1080p" });
    await higsDownload(url, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4`); return;
  } catch (err) {
    log(`  … ${name}: сабмит вернул "${String(err).slice(-40)}" → ищу в истории (без пересабмита)`);
    const deadline = Date.now() + 14 * 60000;
    while (Date.now() < deadline) {
      const url = await historyResult(prompt, since);
      if (url) { await higsDownload(url, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4 (из истории)`); return; }
      await sleep(12000);
    }
    log(`  ✗ ${name}: не нашёл в истории`);
  }
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  // Phase 1: композитные фоны под видео (параллельно)
  log("phase 1: композиты");
  await Promise.all([
    higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-orbit-globe-${Date.now().toString(36)}`,
      prompt: "A stylized glossy 3D planet Earth globe positioned on the RIGHT, soft blue oceans and clean white continents, gentle studio light, on a light blue-to-white gradient background, vast empty space on the left. Sharp. 16:9." }).then((u) => higsDownload(u, join(DIR, "orbit-globe.png"))).then(() => log("  ✓ orbit-globe")),
    higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-bot-paper-${Date.now().toString(36)}`,
      prompt: "A single sculptural matte sage-ceramic and clear-glass object on the RIGHT, resting on a warm sand paper surface, one hard directional light casting a long crisp shadow to the left, editorial, minimal, vast warm space on the left. Sharp. 16:9." }).then((u) => higsDownload(u, join(DIR, "bot-paper.png"))).then(() => log("  ✓ bot-paper")),
  ]);

  // Phase 2: видео (параллельно + дедуп)
  log("phase 2: видео (параллель+дедуп)");
  const vids = [
    { name: "strata-vid", start: "s2-strata.png", prompt: "The moss-covered rock ribbon hangs quietly against the pale sky, a very slow cinematic camera push, gentle drift, faint moss sway. Seamless, no cuts, no scene change, calm, cinematic." },
    { name: "neon-vid", start: "s7-chrome.png", prompt: "The faceted liquid chrome shard slowly rotates and morphs, mirror reflections and cyan highlights sweeping across the metal, floating on black, subtle. Seamless, no cuts, no scene change, cinematic." },
    { name: "orbit-vid", start: "orbit-globe.png", prompt: "The stylized planet globe slowly rotates on its axis, soft clouds drift over the oceans, gentle calm motion, camera steady. Seamless, no cuts, no scene change, cinematic." },
    { name: "bot-vid", start: "bot-paper.png", prompt: "The sculptural object rests still while its hard shadow slowly shifts and lengthens as the light moves, a few dust motes drift in the beam, very calm. Seamless, no cuts, no scene change, cinematic." },
  ];
  await Promise.all(vids.map((v, i) => sleep(i * 4000).then(() => genVideo(v.name, v.start, v.prompt))));
  log("anim3 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
