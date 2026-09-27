/* ANIMATED · СПРАЙТЫ-АКТЁРЫ — «объект, который едет вместе со зрителем» (docs/audit/VISUAL-ARCHITECTURE.md).
   Один субъект мира на ровном угольном фоне (в стиле/палитре мира из worlds.ts) → remove-bg (Higs) →
   обрезка прозрачных полей → webp с альфой: public/uploads/1/animated/<slug>/actor-<name>.webp.
   Скип-если-есть. Запуск: npx tsx scripts/animated/gen-actors.ts [slug ...] */
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";
import { WORLDS } from "./worlds";

export type ActorSpec = { slug: string; name: string; subject: string; aspect?: "1:1" | "16:9" | "3:4" | "4:3" };

export const ACTORS: ActorSpec[] = [
  { slug: "tidewell", name: "diver-down", subject: "a lone freediver in a dark wetsuit with long fins, diving head-first straight down, arms stretched forward, seen from the side, a thin trail of small bubbles above the fins, small and elegant", aspect: "3:4" },
  { slug: "tidewell", name: "diver-up", subject: "a lone freediver in a dark wetsuit with long fins, rising upward toward the light, arms along the body, seen from the side, a few bubbles rising above the head", aspect: "3:4" },
  { slug: "cocoa", name: "macaw", subject: "a single scarlet macaw in flight seen from the side, wings spread wide, long red tail feathers, vivid red with yellow and blue wing tips", aspect: "4:3" },
  { slug: "emberfall", name: "leaf", subject: "a single bright red-orange maple leaf with its stem, flat and whole, seen from above, veins visible, slightly curled edges", aspect: "1:1" },
  { slug: "emberroad", name: "caravan", subject: "a small silhouette caravan of four camels with riders walking in a line to the right, one lantern swinging on the first camel, long shadows, seen from the side", aspect: "16:9" },
  { slug: "fjord", name: "boat", subject: "a small red wooden rowing boat with one oar resting, seen from the side at water level, simple and clean, a thin line of reflection under the hull", aspect: "16:9" },
  { slug: "koi", name: "carp", subject: "a single red-and-white koi carp swimming to the right, seen from above, long flowing fins and tail", aspect: "16:9" },
  { slug: "nomad", name: "herd", subject: "a running herd of six wild horses in silhouette galloping to the right in a loose line, manes flying, dust at the hooves, seen from the side", aspect: "16:9" },
  { slug: "willow", name: "boat", subject: "a long flat-bottomed wooden boat with a glowing paper lantern hanging from a pole at the bow and a standing figure with a pushing pole, seen from the side facing right", aspect: "16:9" },
  { slug: "canopy", name: "wanderer", subject: "a hooded wanderer in a long cloak walking to the right with a walking staff, seen from the side, small backpack", aspect: "3:4" },
  { slug: "bazaar", name: "merchant", subject: "a desert merchant in flowing robes leading a single camel loaded with rolled carpets and a hanging brass lantern, walking to the right, seen from the side", aspect: "16:9" },
  { slug: "voyage", name: "aurelia", subject: "a small brass steampunk airship named Aurelia, seen exactly from the side facing right: a cream patched balloon envelope with brass ribs, a wooden gondola with warm glowing lantern windows, one triangular canvas sail, little brass propeller at the stern", aspect: "16:9" },
];

const OUT = (slug: string) => path.resolve(`public/uploads/1/animated/${slug}`);
const RAW = (slug: string) => path.resolve(`public/uploads/1/animated/${slug}/_raw`);

function prompt(a: ActorSpec): string {
  const w = WORLDS.find((x) => x.slug === a.slug);
  const style = w ? w.style : "painterly illustration";
  return `A single isolated subject, whole and fully in frame with generous margin, CENTERED on a plain flat dark charcoal studio background, nothing else in frame — no scenery, no horizon, no ground, no water surface: ${a.subject}. ${style}. no text, no watermark`;
}

async function one(a: ActorSpec) {
  const out = path.join(OUT(a.slug), `actor-${a.name}.webp`);
  if (fs.existsSync(out)) { console.log(`SKIP ${a.slug}/${a.name}`); return; }
  fs.mkdirSync(RAW(a.slug), { recursive: true });
  const raw = path.join(RAW(a.slug), `actor-${a.name}`);
  const url = await higsGenerateImageAsync({ jobId: `actor-${a.slug}-${a.name}-${Date.now()}`, prompt: prompt(a), folder: "animated-actors", aspectRatio: a.aspect ?? "1:1", quality: "2k" });
  await higsDownload(url, `${raw}.jpg`);
  const cut = await higsRemoveBackground(`${raw}.jpg`, `actor-${a.slug}-${a.name}-rmbg-${Date.now()}`, "animated-actors");
  await higsDownload(cut, `${raw}.png`);
  // обрезать прозрачные поля (актёр позиционируется по центру своего силуэта) + webp с альфой
  await sharp(`${raw}.png`).trim({ threshold: 8 }).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 90 }).toFile(out);
  console.log(`OK ${a.slug}/${a.name}`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const only = process.argv.slice(2);
  const list = ACTORS.filter((a) => !only.length || only.includes(a.slug));
  const res = await Promise.allSettled(list.map((a, i) => new Promise((r) => setTimeout(r, i * 2500)).then(() => one(a))));
  res.forEach((r, i) => { if (r.status === "rejected") console.error(`FAIL ${list[i].slug}/${list[i].name}:`, (r.reason as Error).message); });
  console.log("gen-actors: готово");
}

if (process.argv[1]?.endsWith("gen-actors.ts")) main().catch((e) => { console.error(e); process.exit(1); });
