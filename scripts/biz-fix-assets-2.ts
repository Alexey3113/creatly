/* БИЗНЕС-САЙТЫ — ВОЛНА 2 АССЕТОВ (аудит 2026-09-28, docs/audit/sites/biz-a.md, biz-b.md):
   смысловые противоречия «обещание ≠ кадр», которые не лечатся кодом.
   Бот сейчас умеет только текст → картинка и remove-bg (фото-референс и видео недоступны), поэтому:
   - hero-видео с чужим объектом (clay: сосуд-лама при «wheel-thrown tableware», lather: фэнтези-мыло со мхом
     при «soap that is just soap», sol: промышленная ферма при «your roof», form: абстракция при «one chair»)
     → новый кадр по описанию + «дышащий» наезд камеры (ffmpeg, бесшовная петля 12 с) на месте видео;
   - fetch: одна и та же собака из hero (абрикосовый кудрявый кавапу с золотой цепочкой) в трёх кадрах тела, и коробка;
   - comb: банка без генерик-этикетки «WILD RAW HONEY»; deck: настоящий кикфлип для hero «KICKFLIP».
   Старые файлы → .bak-v2-*. Скип-если-готово (.fixed2-*). Запуск: npx tsx scripts/biz-fix-assets-2.ts [name ...] */
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import { higsAvailable, higsGenerateImageAsync, higsDownload, higsRemoveBackground } from "@/lib/ai/higs";

const S = path.resolve("public/uploads/1/hooks/sites");
const G = path.join(S, "g");
const F = "visual-hooks-fix";
const NEG = "absolutely no text, no letters, no numbers, no brand names, no logos, no watermark";
const DOG = "a small apricot-colored curly-coated cavapoo dog with a fluffy teddy-bear face, dark round eyes and a black nose, wearing a thin gold chain collar";

type Aspect = "16:9" | "3:4" | "4:3";
type Job = {
  name: string;
  /** файл кадра (относительно S) */
  file: string;
  aspect: Aspect;
  prompt: string;
  /** hero-видео, которое заменяет «дышащий» наезд по этому кадру (относительно S) */
  video?: string;
  /** фокус наезда, доли кадра */
  focus?: [number, number];
  /** карта глубины для DepthParallax (относительно S): силуэт из remove-bg (близко = белое) + пол-градиент */
  depth?: string;
};

const JOBS: Job[] = [
  { name: "clay", file: "clay.jpg", aspect: "3:4", video: "clay-hero.mp4", focus: [0.5, 0.58],
    prompt: "Soft natural-light still life photograph: a small stack of handmade wheel-thrown stoneware bowls and plates in a matte speckled cream glaze, raw terracotta clay showing at the foot rings, visible throwing lines, one bowl with a small honest chip at the rim, on a pale linen cloth on a light oak table, warm cream plaster wall behind, calm and minimal, the pottery centered in the frame" },
  { name: "lather", file: "lather.jpg", aspect: "4:3", video: "lather-hero.mp4", focus: [0.5, 0.56],
    prompt: "Moody low-key still life photograph: one plain bar of cold-pressed handmade soap, creamy off-white with a rough hand-cut edge and faint sage-green marbling, resting on a folded natural linen cloth on dark slate, a single sprig of dried rosemary beside it, soft directional window light from the left, deep near-black background, calm and honest, the soap bar centered, no bubbles, no moss, no plants growing on it, no fantasy elements" },
  { name: "sol", file: "sol-hero.jpg", aspect: "16:9", video: "sol-hero.mp4", focus: [0.64, 0.5],
    prompt: "Golden-hour photograph from a low drone angle: one family house with a pitched roof covered in neat black solar panels, a small garden and a tree beside it, the house placed in the right half of the frame, the low warm sun flaring softly at the top right, light haze, the rest of the quiet suburban street softly out of focus, calm quiet lower-left area of lawn and soft shadow, warm cream and apricot tones, realistic" },
  { name: "form", file: "form.jpg", aspect: "16:9", video: "form-hero.mp4", focus: [0.62, 0.52],
    prompt: "Dark quiet architectural photograph: a single minimalist solid-oak chair with slender legs stands alone in an empty dark graphite concrete room, placed right of center, one narrow beam of cool white light falls diagonally from a high window at the top right straight onto the chair, dust motes drifting in the beam, the chair's long shadow stretching across the floor to the left, deep dark negative space on the left, calm and severe" },
  { name: "fetch-hero", file: "fetch.jpg", aspect: "16:9", depth: "g/fetch-depth.jpg",
    prompt: `Warm low-key photograph of ${DOG}, lying down with its chin resting on its front paws on a warm caramel velvet surface, looking straight at the camera, centered, soft amber rim light, dark warm brown background with gentle falloff, low angle, shallow depth of field` },
  { name: "form-chair", file: "g/form-chair.jpg", aspect: "16:9",
    prompt: "Dark quiet studio photograph of one minimalist solid-oak side chair with slender square legs and a low gently curved backrest panel, three-quarter view, placed right of center, lit by a single warm raking light from the right that reveals the oak grain and the hand-cut joints, soft long shadow, deep near-black background, calm and severe, nothing else in the room" },
  { name: "sol-panel", file: "g/sol-panel.jpg", aspect: "16:9",
    prompt: "Close golden-hour photograph of fresh black solar panels just installed on the pitched tiled roof of a single family house, a compact white home battery unit mounted on the wall below the eaves, the warm low sun reflecting in the panel glass, garden trees softly out of focus, warm apricot and cream tones, quiet residential street, realistic" },
  { name: "fetch-portrait", file: "g/fetch-portrait.jpg", aspect: "16:9",
    prompt: `Warm low-key editorial portrait photograph of ${DOG}, sitting and looking up just past the camera, three-quarter view, placed right of center, soft amber window light from the left, dark warm brown background, shallow depth of field, 85mm lens` },
  { name: "fetch-bowl", file: "g/fetch-bowl.jpg", aspect: "16:9",
    prompt: `Warm editorial photograph on a dark oak floor: an opened plain recycled-kraft cardboard delivery box, neatly packed inside with a plain brown paper bag of dog food, a few natural chews and a rope toy; ${DOG} sits beside the box and sniffs it with curiosity; amber evening light, dark warm tones, shallow depth of field, plain unprinted packaging` },
  { name: "fetch-play", file: "g/fetch-play.jpg", aspect: "16:9",
    prompt: `Warm editorial photograph of a front-door hallway at golden hour: ${DOG} sits on a woven doormat next to a closed plain kraft cardboard box that has just been delivered, looking up happily, warm amber light through the door glass, dark warm tones, shallow depth of field, plain unprinted box` },
  { name: "comb-jar", file: "g/comb-jar.jpg", aspect: "16:9",
    prompt: "Warm backlit photograph of a glass jar of raw golden honey with a piece of honeycomb inside, the jar wrapped with a blank plain kraft-paper band with no printing at all, a wooden honey dipper resting beside it on an old wooden table, soft window light behind, glowing amber, shallow depth of field" },
  { name: "deck-kickflip", file: "g/deck-kickflip.jpg", aspect: "3:4",
    prompt: "Night street-skating photograph: a skateboarder mid-kickflip high above a concrete ledge in an empty parking lot, the skateboard flipping in mid-air under his feet, knees tucked, arms out for balance, warm orange sodium streetlight, deep violet-black night sky, gritty 35mm film grain, dynamic low angle, sharp action, the board has plain black grip tape and a blank natural wood underside with no graphics" },
];

const marker = (name: string) => path.join(S, `.fixed2-${name}`);

function backup(rel: string) {
  const src = path.join(S, rel);
  const bak = path.join(path.dirname(src), `.bak-v2-${path.basename(src)}`);
  if (fs.existsSync(src) && !fs.existsSync(bak)) fs.copyFileSync(src, bak);
}

/** «Дышащий» наезд камеры: зум 1.01↔1.07 и лёгкий дрейф по синусу, период = длине ролика → бесшовная петля. */
function breathe(still: string, out: string, aspect: Aspect, focus: [number, number]) {
  const [W, H] = aspect === "3:4" ? [1080, 1440] : aspect === "4:3" ? [1440, 1080] : [1920, 1080];
  const N = 360; // 12 с × 30 к/с
  const [fx, fy] = focus;
  // апскейл ×2 перед zoompan — дробные сдвиги камеры не дрожат на целых пикселях
  const vf = [
    `scale=${W * 2}:${H * 2}:force_original_aspect_ratio=increase,crop=${W * 2}:${H * 2}`,
    `zoompan=z='1.04+0.03*sin(2*PI*on/${N})':x='(iw-iw/zoom)*${fx}+iw*0.006*sin(2*PI*on/${N}+1.2)':y='(ih-ih/zoom)*${fy}':d=1:s=${W}x${H}:fps=30`,
    "format=yuv420p",
  ].join(",");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-loop", "1", "-framerate", "30", "-i", still, "-frames:v", String(N), "-vf", vf,
    "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-movflags", "+faststart", "-an", out]);
}

async function one(j: Job) {
  if (fs.existsSync(marker(j.name))) { console.log(`SKIP ${j.name}`); return; }
  backup(j.file);
  const url = await higsGenerateImageAsync({ jobId: `${j.name}-v2-${Date.now()}`, prompt: `${j.prompt}. ${NEG}`, folder: F, aspectRatio: j.aspect, quality: "2k" });
  const raw = path.join(S, `.raw-v2-${path.basename(j.file)}`);
  await higsDownload(url, raw);
  // кадр для сайта: 2048 по длинной стороне, jpeg
  const dst = path.join(S, j.file);
  await sharp(raw).resize({ width: j.aspect === "3:4" ? 1536 : 2048, withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toFile(dst);
  if (j.depth) {
    backup(j.depth);
    const cut = await higsRemoveBackground(dst, `${j.name}-v2-rmbg-${Date.now()}`, F);
    const png = path.join(S, `.raw-v2-${j.name}-cut.png`);
    await higsDownload(cut, png);
    const { width: w = 2048, height: h = 1152 } = await sharp(dst).metadata();
    // альфа силуэта → светлое пятно (объект ближе), фон — вертикальный градиент «пол ближе, стена дальше»
    const alpha = await sharp(png).resize(w, h, { fit: "fill" }).ensureAlpha().extractChannel(3).blur(6).linear(0.92, 18).toBuffer();
    const grad = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".55" stop-color="#1a1a1a"/><stop offset="1" stop-color="#8a8a8a"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
    await sharp(grad).greyscale().composite([{ input: alpha, raw: undefined, blend: "lighten" }]).blur(3).jpeg({ quality: 88 }).toFile(path.join(S, j.depth));
  }
  if (j.video) {
    backup(j.video);
    breathe(dst, path.join(S, j.video), j.aspect, j.focus ?? [0.5, 0.5]);
  }
  fs.writeFileSync(marker(j.name), new Date().toISOString());
  console.log(`OK ${j.name}`);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs Bot недоступен");
  const only = process.argv.slice(2);
  const list = JOBS.filter((j) => !only.length || only.includes(j.name));
  const res = await Promise.allSettled(list.map((j, i) => new Promise((r) => setTimeout(r, i * 3000)).then(() => one(j))));
  res.forEach((r, i) => { if (r.status === "rejected") console.error(`FAIL ${list[i].name}:`, (r.reason as Error).message); });
  console.log("biz-fix-assets-2: готово");
}

main().catch((e) => { console.error(e); process.exit(1); });
