/**
 * Splice-финалы для 4 Interactive Story сцен (как глаз у Bloom): второй клип,
 * который скраббится в 3-м акте. Start-кадр (nano ref постера) → kling → all-keyframes (потом ffmpeg).
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-story-reveal.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsGenerateVideoAsync } from "@/lib/ai/higs";

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

async function genVideo(name: string, startFile: string, prompt: string, idx: number) {
  await sleep(idx * 4000);
  const since = Date.now() - 20000;
  log(`vid → ${name}`);
  try {
    const url = await higsGenerateVideoAsync({ prompt, jobId: `hooks-${name}-${Date.now().toString(36)}`, folder: FOLDER, startFrame: join(DIR, startFile), duration: 10, quality: "1080p" });
    await higsDownload(url, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4`); return;
  } catch (err) {
    log(`  … ${name}: "${String(err).slice(-32)}" → история`);
    const deadline = Date.now() + 18 * 60000;
    while (Date.now() < deadline) { const u = await historyResult(prompt, since); if (u) { await higsDownload(u, join(DIR, `${name}.mp4`)); log(`  ✓ ${name}.mp4 (история)`); return; } await sleep(12000); }
    log(`  ✗ ${name}`);
  }
}

const frames = [
  { name: "held-reveal", ref: "held-world-poster.jpg", prompt: "Extreme macro close-up of a tiny glowing miniature planet, little snow-capped mountains and a shimmering blue ocean, soft clouds, warm dawn light breaking over the miniature world, dark background, cinematic, hyper-detailed. 16:9." },
  { name: "monolith-reveal", ref: "monolith-poster.jpg", prompt: "Close-up of a dark monolith's stone surface at dusk, faint ancient glowing amber runes and thin cracks of warm light beginning to ignite across the stone, drifting mist and embers, cinematic, hyper-detailed. 16:9." },
  { name: "planet-reveal", ref: "planet-vig-poster.jpg", prompt: "Cinematic close-up of a giant planet filling the frame, its surface rotating into dawn, the terminator line sweeping to reveal glowing city lights and dark oceans, dusty pink and blue atmosphere, hyper-detailed. 16:9." },
  { name: "ascension-reveal", ref: "ascension-poster.jpg", prompt: "A serene figure dissolving upward into a bloom of brilliant white and gold light, ethereal veils and mist streaming upward, weightless ascension, soft lens flare, luminous, cinematic. 16:9." },
];

const vids = [
  { name: "held-reveal-vid", start: "held-reveal.png", prompt: "The miniature world slowly rotates, dawn light sweeps across its tiny mountains, the little ocean shimmers, soft clouds drift and light blooms from within, a world awakening. Seamless, no cuts, no scene change, cinematic." },
  { name: "monolith-reveal-vid", start: "monolith-reveal.png", prompt: "The ancient runes and cracks of warm amber light slowly ignite and spread across the dark stone surface, embers rise, the glow intensifies and pulses. Seamless, no cuts, no scene change, cinematic." },
  { name: "planet-reveal-vid", start: "planet-reveal.png", prompt: "The giant planet slowly rotates, the dawn terminator sweeps across revealing glowing city lights and shimmering oceans, the atmosphere glowing softly. Seamless, no cuts, no scene change, cinematic." },
  { name: "ascension-reveal-vid", start: "ascension-reveal.png", prompt: "The figure slowly dissolves and rises upward into a growing bloom of brilliant white-gold light, veils and mist streaming up, the light expanding to fill the frame. Seamless, no cuts, no scene change, cinematic." },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");
  log("4 start-кадра (nano ref) параллельно");
  await Promise.all(frames.map(async (f) => {
    const u = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: FOLDER, jobId: `hooks-${f.name}-${Date.now().toString(36)}`, refFrames: [join(DIR, f.ref)], prompt: f.prompt });
    await higsDownload(u, join(DIR, `${f.name}.png`)); log(`  ✓ ${f.name}`);
  }));
  log("4 splice-видео параллельно + дедуп");
  await Promise.all(vids.map((v, i) => genVideo(v.name, v.start, v.prompt, i)));
  log("story-reveal готово (дальше ffmpeg all-keyframes)");
}
main().catch((e) => { console.error(e); process.exit(1); });
