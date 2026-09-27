/**
 * BROKEN hero — мраморная статуя с повязкой в halftone, 2 состояния (глаза закрыты/открыты) + вырезка.
 * Запуск: cd <root>; set -a; source .env; set +a; npx tsx --tsconfig <root>/tsconfig.json scripts/hooks-broken.ts
 */
import { join } from "path";
import { higsAvailable, higsDownload, higsGenerateImage, higsRemoveBackground } from "@/lib/ai/higs";

const DIR = join(process.cwd(), "public", "uploads", "1", "hooks", "scenes");
const FOLDER = "visual-hooks";
const t0 = Date.now();
const log = (m: string) => console.log(`[${((Date.now() - t0) / 60000).toFixed(1)}м] ${m}`);

const HALFTONE =
  "high-contrast grainy black-and-white halftone bitmap dot texture across the marble, dramatic editorial vintage print aesthetic, museum sculpture, on a plain flat warm cream off-white seamless background, centered, upper body and shoulders, sharp. 3:4.";

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot оффлайн");

  log("stat-closed");
  const cl = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "3:4", quality: "2K", folder: FOLDER, jobId: `hooks-stat-closed-${Date.now().toString(36)}`,
    prompt: "Editorial magazine cover artwork. A classical white marble statue of a serene young woman, a wrapped cloth blindfold fully covering her eyes, draped robe over one shoulder, " + HALFTONE });
  await higsDownload(cl, join(DIR, "stat-closed.png"));
  log("  ✓ stat-closed");

  log("stat-open (nano+ref)");
  const op = await higsGenerateImage({ model: "nano-banana-pro", aspectRatio: "3:4", quality: "2K", folder: FOLDER, jobId: `hooks-stat-open-${Date.now().toString(36)}`,
    refFrames: [join(DIR, "stat-closed.png")],
    prompt: "The exact same classical marble woman statue — same face, pose, robe, framing and halftone dot texture — but the cloth blindfold is now lifted up onto her forehead and her eyes are wide open with a serene intense gaze, faint soft divine glow around the eyes. Same cream background. 3:4." });
  await higsDownload(op, join(DIR, "stat-open.png"));
  log("  ✓ stat-open");

  log("remove-bg обоих");
  const clc = await higsRemoveBackground(join(DIR, "stat-closed.png"), `hooks-stat-closed-cut-${Date.now().toString(36)}`, FOLDER);
  await higsDownload(clc, join(DIR, "stat-closed-cut.png"));
  const opc = await higsRemoveBackground(join(DIR, "stat-open.png"), `hooks-stat-open-cut-${Date.now().toString(36)}`, FOLDER);
  await higsDownload(opc, join(DIR, "stat-open-cut.png"));
  log("  ✓ вырезки готовы");
  log("broken готово");
}
main().catch((e) => { console.error(e); process.exit(1); });
