/* ПИЛОТ Canopy — hero-сцена по MODEL.md. Committed палитра/стиль в КАЖДОМ промпте.
   bg-плита (edge-to-edge) + cut-outs (генерятся на тёмном фоне → remove-background → PNG-alpha).
   Оригинальный иллюстр. мир (не копия рефов). Соф-край: painterly, no hard outline. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";

const DIR = "public/uploads/1/animated/model/canopy";
const RAW = path.join(DIR, "_raw");
const FOLDER = "animated";
fs.mkdirSync(RAW, { recursive: true });

// committed арт-дирекшн (правило #3/#4): палитра + один стиль в каждом промпте
const STYLE = "painterly gouache illustration, soft brush edges, no hard outline, atmospheric haze, cinematic depth, cohesive muted naturalistic palette (deep pine #0f2a24, teal #1f4a3d, moss #4a7a52, warm peach dawn #f0b57a, cream mist #dfe9e0), single warm dawn light from upper-left, subtle grain";
const CUT = "isolated single element, matched dawn light from upper-left, painterly soft brush edges, no hard outline, plain flat dark charcoal background for clean cutout, " + STYLE;

type Job = { name: string; prompt: string; cut: boolean };
const JOBS: Job[] = [
  { name: "bg", cut: false, prompt: `Wide edge-to-edge painterly background plate: a misty forest valley at dawn seen from a high ridge, layered receding tree-lines and distant blue peaks fading into peach haze, soft god-rays, empty calm sky with generous negative space at top for a headline, no characters, no text. ${STYLE}` },
  { name: "trees", cut: true, prompt: `Tall dark foreground pine/fir tree silhouettes clustered to the left and right edges as a natural frame, in shadow, ${CUT}` },
  { name: "fern", cut: true, prompt: `A low band of foreground ferns, moss and grasses spanning left to right as a bottom frame, dewy, in soft shadow, ${CUT}` },
  { name: "traveler", cut: true, prompt: `A lone hooded traveler in a earth-toned cloak with a walking staff, seen from behind, standing and gazing outward, small human scale, ${CUT}` },
  { name: "birds", cut: true, prompt: `A few small birds in flight, tiny silhouettes, loose scattered flock, ${CUT}` },
];

async function one(j: Job) {
  const stamp = Date.now().toString(36);
  const genUrl = await higsGenerateImageAsync({
    jobId: `canopy-${j.name}-${stamp}`, prompt: j.prompt, folder: FOLDER,
    aspectRatio: "16:9", quality: "2k",
  });
  if (!j.cut) { await higsDownload(genUrl, path.join(DIR, `${j.name}.jpg`)); return `bg ${j.name}`; }
  // cut-out: скачать сырое → remove-background → скачать PNG-alpha
  const raw = path.join(RAW, `${j.name}.jpg`);
  await higsDownload(genUrl, raw);
  const cutUrl = await higsRemoveBackground(raw, `canopy-rmbg-${j.name}-${stamp}`, FOLDER);
  await higsDownload(cutUrl, path.join(DIR, `${j.name}.png`));
  return `cut ${j.name}`;
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs down");
  const res = await Promise.all(JOBS.map((j, i) =>
    new Promise((r) => setTimeout(r, i * 3000)).then(() => one(j).then((x) => `OK ${x}`).catch((e) => `FAIL ${j.name}: ${(e as Error).message}`))
  ));
  res.forEach((r) => console.log(r));
  console.log("canopy-hero: done");
}
main().catch((e) => { console.error(e); process.exit(1); });
