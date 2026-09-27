/* STORY v2 — ПОЧИНКА УТЕЧЕК АССЕТОВ (аудит 2026-09-28, docs/audit/sites/story.md).
   Файлы, совпадавшие по md5 с кадрами других сайтов, получают СВОИ кадры:
     seraph-still-2 (был = aesthetic-hero) · corrosive-still-1 (= chivalry-still-1) · corrosive-still-2 (= deity-hero)
     deity-still-1 (= deity-portrait-b, из-за этого S2 и S3 были одним кадром).
   deity-hero: прежний кадр почти 1:1 повторял чужой арт из пина (вместе с водяным знаком 小红书) →
   ОРИГИНАЛ по текстовому описанию, без пина-референса; затем вырезка (remove-bg) → deity-hero-cut.png;
   deity-still-1 генерится уже от нового героя. Старые файлы сохраняются как .bak-leak-*. Скип-если-готово. */
import path from "node:path";
import fs from "node:fs";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const OUT = path.resolve("public/uploads/1/story2");
const NEG = "no watermark, no logo, no signature, no lettering, no typography, no text, no extra fingers, no malformed hands, no deformed face, editorial, cinematic";
const DONE = (n: string) => fs.existsSync(path.join(OUT, `.fixed-${n}`));

function backup(name: string) {
  const src = path.join(OUT, name);
  const bak = path.join(OUT, `.bak-leak-${name}`);
  if (fs.existsSync(src) && !fs.existsSync(bak)) fs.copyFileSync(src, bak);
}

async function gen(name: string, prompt: string, aspect: string, refs: string[] = []) {
  if (DONE(name)) { console.log(`SKIP ${name}`); return; }
  const dst = path.join(OUT, `${name}.jpg`);
  backup(`${name}.jpg`);
  const url = await higsGenerateImageAsync({ jobId: `${name}-fix-${Date.now()}`, prompt: `${prompt}. ${NEG}`, folder: "story2-fix", refFrames: refs, aspectRatio: aspect, quality: "2k" });
  await higsDownload(url, dst);
  fs.writeFileSync(path.join(OUT, `.fixed-${name}`), new Date().toISOString());
  console.log(`OK ${name}`);
}

async function deityChain() {
  // 1) оригинальный герой — только текст
  await gen(
    "deity-hero",
    "Original fine-art photograph: a classical white Carrara marble statue bust of a young self-crowned god, the marble cracked all over and repaired with molten gold kintsugi veins, heavy ornate gold brocade robe draped over one shoulder, a thin gold chain on the neck, calm arrogant half-lidded gaze straight at the viewer, chin slightly raised, one hand resting flat on the chest over the brocade, bust from mid-torso up, centered, head in the upper third, pure black background, single dramatic museum spotlight from the upper left, deep shadows, photorealistic sculpture, baroque vaporwave mood",
    "3:4",
  );
  // 2) вырезка героя для обложки «occluded idol»
  if (!DONE("deity-hero-cut")) {
    backup("deity-hero-cut.png");
    const url = await higsRemoveBackground(path.join(OUT, "deity-hero.jpg"), `deity-hero-cut-fix-${Date.now()}`, "story2-fix");
    await higsDownload(url, path.join(OUT, "deity-hero-cut.png"));
    fs.writeFileSync(path.join(OUT, ".fixed-deity-hero-cut"), new Date().toISOString());
    console.log("OK deity-hero-cut");
  }
  // 3) S3 — свой кадр от НОВОГО героя (профиль, золото в трещинах крупно)
  await gen(
    "deity-still-1",
    "A classical white Carrara marble statue of a young man with short curly hair, cracked all over and repaired with molten gold kintsugi veins, a thin gold chain on the neck, the edge of a gold brocade robe at the bottom of the frame, seen in strict side profile, close-up from the shoulders up, the gold glowing in the cracks along the cheek and neck, pure black background, cool rim light, photorealistic sculpture",
    "3:4",
  );
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const res = await Promise.allSettled([
    deityChain(),
    gen(
      "seraph-still-2",
      "Wings of dawn: a rose-pink angelic warrior with platinum-blonde hair and a silver crown-halo stands on a high balcony at sunrise, huge white and soft-red feathered wings opening wide and backlit by the rising sun, black-red armor, pale pink and gold dawn sky, ethereal high-fashion fantasy, full figure slightly from below",
      "3:4",
    ),
    gen(
      "corrosive-still-1",
      "Under the veil: vintage screenprint propaganda pop-art illustration, close portrait of a horned nun behind a sheer crimson veil, eyes lowered, bold flat crimson-red background, cream and black high-contrast halftone, retro graphic",
      "1:1",
    ),
    gen(
      "corrosive-still-2",
      "The label: vintage screenprint propaganda pop-art illustration, a horned nun holding a small glass bottle up to the light like a relic, three-quarter view, bold flat crimson-red background, cream and black high-contrast halftone, retro graphic, poster composition",
      "3:4",
    ),
  ]);
  res.forEach((r, i) => { if (r.status === "rejected") console.error(`FAIL #${i}:`, (r.reason as Error).message); });
  console.log("story2-fix-leaks: готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
