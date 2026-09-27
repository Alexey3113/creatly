import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateVideoAsync } from "@/lib/ai/higs";
const SCRATCH = "/private/tmp/claude-501/-Users-leo-programming-creatly/bdd54b0f-9e8c-49ef-b597-ab49ed07efbb/scratchpad";
const DEST = join(process.cwd(), "public", "uploads", "1", "hooks", "sites", "wax-hero.mp4");
(async () => {
  if (!(await higsAvailable())) throw new Error("bot off");
  const url = await higsGenerateVideoAsync({
    jobId: `waxvid-${Date.now().toString(36)}`,
    startFrame: join(SCRATCH, "wax-start.jpg"),
    prompt: "Slow cinematic push-in over a fanned-out stack of vinyl records in paper sleeves on a dark surface, warm rim light slowly shifting across the grooves, subtle dust motes, gentle parallax. Moody record-shop atmosphere. No text.",
    quality: "1080p",
    duration: 5,
    folder: "visual-hooks",
  });
  await higsDownload(url, DEST);
  console.log("wax-hero.mp4 regenerated (vinyl)");
})().catch((e) => { console.error("FAIL", String(e).slice(-120)); process.exit(1); });
