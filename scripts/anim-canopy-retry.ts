/* CANOPY retry — 8 упавших ассетов ПОСЛЕДОВАТЕЛЬНО с ретраями (Higs захлёбывался от параллели). */
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { higsAvailable, higsGenerateImageAsync, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";

const DIR = "public/uploads/1/animated/model/canopy";
const RAW = path.join(DIR, "_raw"); const FOLDER = "animated";
fs.mkdirSync(RAW, { recursive: true });
const STYLE = "painterly gouache illustration, soft brush edges, no hard outline, atmospheric haze, cinematic depth, cohesive palette (deep pine #0f2a24, teal #1f4a3d, moss #4a7a52, warm peach dawn #f0b57a, cool moon #9fb8d6, cream mist #dfe9e0), subtle grain";
const onMag = "the subject fully separated on a SOLID FLAT MAGENTA #ff00ff background (pure #ff00ff, no gradient), " + STYLE;

type Kind = "plate" | "subject" | "chroma";
const JOBS: { name: string; kind: Kind; prompt: string }[] = [
  { name: "falls-bg", kind: "plate", prompt: `Wide edge-to-edge painterly background: a misty waterfall gorge, dark wet mossy cliffs, a tall thin waterfall, cool teal-green light, drifting spray, receding rock walls into haze, calm negative space upper area, no characters, no text. ${STYLE}` },
  { name: "meadow-grass", kind: "chroma", prompt: `A foreground band of tall meadow grasses and a few wildflowers spanning the bottom, moon-lit rim light, ${onMag}` },
  { name: "deer", kind: "subject", prompt: `A single calm deer standing in profile, soft moonlight rim, painterly, plain flat dark charcoal background. ${STYLE}` },
  { name: "sil-pines", kind: "chroma", prompt: `A large solid near-black pine forest silhouette cluster, tall trees filling most of the frame from the bottom, flat dark shapes, ${onMag}` },
  { name: "falls-rocks", kind: "chroma", prompt: `A foreground ledge of wet dark mossy boulders spanning left to right as a bottom frame, in shadow, ${onMag}` },
  { name: "falls-mist", kind: "chroma", prompt: `A soft horizontal band of white waterfall mist and spray, wispy, semi-transparent, ${onMag}` },
  { name: "trees", kind: "chroma", prompt: `Tall dark pine and fir tree silhouettes clustered at the left and right edges as a natural frame, in shadow, ${onMag}` },
  { name: "birds", kind: "chroma", prompt: `A few small dark birds in flight, a loose scattered flock, tiny, ${onMag}` },
];

function chromaKey(raw: string, out: string) {
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-vf", "colorkey=0xff00ff:0.32:0.14,format=rgba,gblur=sigma=1.2:steps=1", out], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("ffmpeg: " + (r.stderr || "").slice(0, 120));
}
async function gen(j: typeof JOBS[0]) {
  const url = await higsGenerateImageAsync({ jobId: `cpr-${j.name}-${Date.now().toString(36)}`, prompt: j.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
  if (j.kind === "plate") { await higsDownload(url, path.join(DIR, `${j.name}.jpg`)); return; }
  const raw = path.join(RAW, `${j.name}.jpg`); await higsDownload(url, raw);
  if (j.kind === "subject") { const cut = await higsRemoveBackground(raw, `cpr-rmbg-${j.name}-${Date.now().toString(36)}`, FOLDER); await higsDownload(cut, path.join(DIR, `${j.name}.png`)); return; }
  chromaKey(raw, path.join(DIR, `${j.name}.png`));
}
async function main() {
  if (!(await higsAvailable())) throw new Error("Higs down");
  for (const j of JOBS) {
    const out = path.join(DIR, j.kind === "plate" ? `${j.name}.jpg` : `${j.name}.png`);
    if (fs.existsSync(out)) { console.log(`skip ${j.name}`); continue; }
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try { await gen(j); ok = true; console.log(`OK ${j.name} (try ${attempt})`); }
      catch (e) { console.log(`retry ${j.name} #${attempt}: ${(e as Error).message.slice(0, 60)}`); await new Promise((r) => setTimeout(r, 4000)); }
    }
    if (!ok) console.log(`GIVEUP ${j.name}`);
    await new Promise((r) => setTimeout(r, 2500)); // пауза между задачами
  }
  console.log("canopy-retry: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
