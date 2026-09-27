/* CANOPY — ассеты сцен 2/3 + переходы-силуэты + доборы hero. Гибрид: plate(jpg) / subject(remove-bg) /
   chroma(magenta → ffmpeg colorkey → feather). Committed стиль+палитра в каждом промпте (MODEL.md). */
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { higsAvailable, higsGenerateImageAsync, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";

const DIR = "public/uploads/1/animated/model/canopy";
const RAW = path.join(DIR, "_raw");
const FOLDER = "animated";
fs.mkdirSync(RAW, { recursive: true });

const STYLE = "painterly gouache illustration, soft brush edges, no hard outline, atmospheric haze, cinematic depth, cohesive palette (deep pine #0f2a24, teal #1f4a3d, moss #4a7a52, warm peach dawn #f0b57a, cool moon #9fb8d6, cream mist #dfe9e0), subtle grain";
const onMag = "the subject fully separated on a SOLID FLAT MAGENTA #ff00ff background (pure #ff00ff, no gradient, no other magenta anywhere in the subject), " + STYLE;

type Kind = "plate" | "subject" | "chroma";
type Job = { name: string; kind: Kind; prompt: string };
const JOBS: Job[] = [
  // Scene 2 — The Falls
  { name: "falls-bg", kind: "plate", prompt: `Wide edge-to-edge painterly background: a misty waterfall gorge, dark wet mossy cliffs, a tall thin waterfall, cool teal-green light, drifting spray, receding rock walls into haze, calm negative space upper area, no characters, no text. ${STYLE}` },
  { name: "falls-rocks", kind: "chroma", prompt: `A foreground ledge of wet dark mossy boulders spanning left to right as a bottom frame, in shadow, ${onMag}` },
  { name: "falls-mist", kind: "chroma", prompt: `A soft horizontal band of white waterfall mist and spray, wispy, semi-transparent, ${onMag}` },
  // Scene 3 — The Meadow (night)
  { name: "meadow-bg", kind: "plate", prompt: `Wide edge-to-edge painterly background: a moonlit night meadow clearing ringed by dark forest, soft blue moonlight, faint stars, distant blue peaks, gentle mist on the grass, calm negative space in the sky, no characters, no text. ${STYLE}` },
  { name: "meadow-grass", kind: "chroma", prompt: `A foreground band of tall meadow grasses and a few wildflowers spanning the bottom, moon-lit rim light, ${onMag}` },
  { name: "deer", kind: "subject", prompt: `A single calm deer standing in profile, soft moonlight rim, painterly, plain flat dark charcoal background. ${STYLE}` },
  // Transitions — occlusion silhouettes (чёрные, для silhouette-wipe между сценами)
  { name: "sil-pines", kind: "chroma", prompt: `A large solid near-black pine forest silhouette cluster, tall trees filling most of the frame from the bottom, flat dark shapes, ${onMag}` },
  // Hero доборы (упали на remove-bg → делаем chroma)
  { name: "trees", kind: "chroma", prompt: `Tall dark pine and fir tree silhouettes clustered at the left and right edges as a natural frame, in shadow, ${onMag}` },
  { name: "birds", kind: "chroma", prompt: `A few small dark birds in flight, a loose scattered flock, tiny, ${onMag}` },
];

function chromaKey(raw: string, out: string) {
  // colorkey → альфа + мягкий край (blend) ; feather лёгким gblur по альфе
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw,
    "-vf", "colorkey=0xff00ff:0.32:0.14,format=rgba,gblur=sigma=1.2:steps=1", out], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("ffmpeg colorkey: " + (r.stderr || "").slice(0, 120));
}

async function one(j: Job) {
  const stamp = Date.now().toString(36);
  const url = await higsGenerateImageAsync({ jobId: `cp-${j.name}-${stamp}`, prompt: j.prompt, folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
  if (j.kind === "plate") { await higsDownload(url, path.join(DIR, `${j.name}.jpg`)); return `plate ${j.name}`; }
  const raw = path.join(RAW, `${j.name}.jpg`); await higsDownload(url, raw);
  if (j.kind === "subject") {
    const cut = await higsRemoveBackground(raw, `cp-rmbg-${j.name}-${stamp}`, FOLDER);
    await higsDownload(cut, path.join(DIR, `${j.name}.png`)); return `subject ${j.name}`;
  }
  chromaKey(raw, path.join(DIR, `${j.name}.png`)); return `chroma ${j.name}`;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs down");
  const res = await Promise.all(JOBS.map((j, i) =>
    new Promise((r) => setTimeout(r, i * 3000)).then(() => one(j).then((x) => `OK ${x}`).catch((e) => `FAIL ${j.name}: ${(e as Error).message}`))));
  res.forEach((r) => console.log(r));
  console.log("canopy-scenes: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
