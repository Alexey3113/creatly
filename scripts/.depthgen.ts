import { join } from "path"; import { existsSync } from "fs";
import { higsAvailable, higsDownload, higsGenerateImage } from "@/lib/ai/higs";
const SITES = join(process.cwd(), "public", "uploads", "1", "hooks", "sites");
const F = "visual-hooks";
const slugs = ["cask", "fetch", "fern", "pour", "malt"]; // product-theatre
const prompt = "Convert this photo into a grayscale DEPTH MAP: nearest objects pure WHITE, farthest background pure BLACK, smooth continuous gradient for mid distances. Preserve the exact silhouette and layout. No text, no color, just a soft grayscale depth field.";
(async () => {
  if (!(await higsAvailable())) throw new Error("bot off");
  for (const s of slugs) {
    const out = join(SITES, "g", `${s}-depth.jpg`);
    if (existsSync(out)) { console.log("skip", s); continue; }
    const ref = join(SITES, `${s}.jpg`);
    if (!existsSync(ref)) { console.log("no-poster", s); continue; }
    try {
      const url = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "16:9", quality: "2K", folder: F, jobId: `depth-${s}-${Date.now().toString(36)}`, prompt, refFrames: [ref] });
      await higsDownload(url, out); console.log("ok", s);
    } catch (e) { console.log("fail", s, String(e).slice(-50)); }
  }
  console.log("depthgen done");
})().catch((e) => { console.error(e); process.exit(1); });
