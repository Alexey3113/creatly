/* STORY — генерация мастер-героинь (девушка с тату в стилистике пина, чувственно-эстетично).
   nano-banana-pro, пин как style-ref, aspect 9:16, 2K. По 2 варианта на сайт → выбрать canonical.
   Запуск: set -a; source .env; set +a; npx tsx --tsconfig tsconfig.json scripts/story-gen.ts */
import path from "node:path";
import { higsAvailable, higsGenerateImageAsync, higsDownload } from "@/lib/ai/higs";

const PINS = path.resolve("analitic/pins/tatoo");
const OUT = path.resolve("public/uploads/1/story/tatoo");
const FOLDER = "story-tatoo";

const NEG =
  "no explicit nudity, no lingerie look, no erotic or seductive pose, no exposed intimate areas, no fetish styling, no plastic skin, no malformed hands, no extra fingers, no watermark, no logo, no typography, no readable text";

const SITES = [
  {
    slug: "vision",
    ref: "exmp1.jpg",
    prompt:
      "Adult tattooed woman, close editorial portrait, black-and-blush futuristic fashion, glossy translucent floral forms framing face and shoulders, soft wet-look highlights, sculptural side light, eyes closed, elongated neck, calm sensual confidence; fine botanical chrome tattoos on neck and shoulder; asymmetric high-fashion bodysuit with tasteful strategic coverage; premium magazine cover, deep black negative space, pink glass reflections. Preserve the reference palette, gloss and monumental composition. " +
      NEG,
  },
  {
    slug: "shadows",
    ref: "exmp2.jpg",
    prompt:
      "Adult tattooed woman, dramatic low-angle portrait, chin lifted, powerful ecstatic stillness, red-black occult punk zine aesthetic; harsh red rim light, crushed blacks, photocopy grain, ink splatter, scratched halftone; blackwork thorn, sigil and medieval engraving tattoos on chest and arms; distressed high-neck corset with opaque coverage, layered antique jewelry; raw yet elegant, sensual through tension and expression. " +
      NEG,
  },
  {
    slug: "solitude",
    ref: "exmp3.jpg",
    prompt:
      "Adult tattooed woman seated in a restrained Renaissance portrait pose, lowered gaze, quiet intimate melancholy; warm candlelike Rembrandt light, muted black, ivory, oxblood and antique gold; off-shoulder velvet gown with tasteful décolletage; delicate ornamental engraving tattoos across shoulders and forearms; museum oil-painting texture with subtle techno-glyph framing, aristocratic and sensual. " +
      NEG,
  },
];

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен (127.0.0.1:3210)");
  const jobs: Promise<void>[] = [];
  const stamp = Date.now();
  for (const s of SITES) {
    for (const variant of ["a", "b"]) {
      const jobId = `story-${s.slug}-${variant}-${stamp}`;
      const dest = path.join(OUT, `${s.slug}-hero-${variant}.jpg`);
      const p = (async () => {
        try {
          const url = await higsGenerateImageAsync({
            jobId,
            prompt: s.prompt + (variant === "b" ? " Alternative pose and framing, three-quarter view." : ""),
            folder: FOLDER,
            refFrames: [path.join(PINS, s.ref)],
            aspectRatio: "9:16",
            quality: "2k",
          });
          await higsDownload(url, dest);
          console.log(`OK ${s.slug}-${variant} -> ${dest}`);
        } catch (e) {
          console.error(`FAIL ${s.slug}-${variant}:`, (e as Error).message);
        }
      })();
      jobs.push(p);
      await new Promise((r) => setTimeout(r, 4000)); // стаггер сабмита ~4с
    }
  }
  await Promise.all(jobs);
  console.log("story-gen: все задачи завершены");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
