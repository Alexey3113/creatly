/**
 * 3 Scroll-tracking сайта — kling gaze/turn, проигрывается scrub-скроллом (следит за тобой).
 * Базы (параллель) → 3 kling-видео (параллель + дедуп).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-scroll3.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideoAsync } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function historyResult(pfx: string, since: number) {
  try { const r = await fetch(`${BASE}/api/history`, { signal: AbortSignal.timeout(20000) }); const j: any = await r.json();
    const it = (j.items || []).filter((x: any) => x.model === "kling-3.0" && x.folder === FOLDER && (x.prompt || "").slice(0, 42) === pfx.slice(0, 42) && (x.timestamp || 0) >= since);
    for (const x of it) { const p = x.images && x.images[0]; if (p) return p.startsWith("http") ? p : `${BASE}/${String(p).replace(/^\/+/, "")}`; }
  } catch {} return null;
}
async function img(name: string, model: string, prompt: string) { log(`img → ${name}`); const u = await higsGenerateImage({ model, aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-${name}-${Date.now().toString(36)}`, prompt }); await higsDownload(u, join(DIR, `${name}.png`)); log(`  ✓ ${name}`); }
async function vid(name: string, start: string, prompt: string, idx: number) {
  await sleep(idx * 4000); const since = Date.now() - 20000; log(`vid → ${name}`);
  try { const u = await higsGenerateVideoAsync({ prompt, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, start), duration: 10, quality: "1080p" }); await higsDownload(u, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4`); return; }
  catch (e) { log(`  … ${name} → история`); const dl = Date.now() + 15 * 60000; while (Date.now() < dl) { const r = await historyResult(prompt, since); if (r) { await higsDownload(r, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4 (история)`); return; } await sleep(12000); } log(`  ✗ ${name}`); }
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  await Promise.all([
    img("gaze-face", "soul-v2", "Cinematic close-up portrait of a striking bald person looking far to the left, calm intense expression, dramatic studio light, dark background, photoreal, sharp, editorial, head centered. No text. 16:9."),
    img("gaze-char", "soul-cinematic", "A striking stylized 3D sculptural masked figure / android bust turned looking to the left, dramatic cyan rim light, dark moody background, cinematic, sharp, centered. 16:9."),
    img("neon-obj", "nano-banana-pro", "A glowing neon wireframe geometric emblem, an abstract faceted 3D logo shape in cyan and magenta light, floating on a pure black background, dark techno, sharp, centered. 16:9."),
  ]);
  const jobs = [
    { name: "gaze-face-vid", start: "gaze-face.png", prompt: "The person slowly turns their head and shifts their gaze from looking far to the left all the way to looking far to the right, calm intense eye contact tracking the viewer, subtle, camera perfectly still. Seamless, no cuts, no scene change, cinematic." },
    { name: "gaze-char-vid", start: "gaze-char.png", prompt: "The sculptural masked figure slowly turns its head and gaze from the left across to the right, watching, subtle unsettling tracking motion, glowing eyes, camera still. Seamless, no cuts, no scene change, cinematic." },
    { name: "neon-obj-vid", start: "neon-obj.png", prompt: "The glowing neon geometric emblem slowly rotates a full turn, light trails and reflections sweeping across its facets, on pure black. Seamless, no cuts, no scene change, cinematic." },
  ];
  log("3 gaze-видео параллельно + дедуп");
  await Promise.all(jobs.map((j, i) => vid(j.name, j.start, j.prompt, i)));
  log("scroll3 готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
