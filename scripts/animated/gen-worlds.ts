/* ─────────────────────────────────────────────────────────────────────────
   ГЕНЕРАТОР БАНКА АССЕТОВ для 30 миров (scripts/animated/worlds.ts).
   На каждый мир 4 сцены × 3 ассета = 12 файлов: s{i}-bg.webp · s{i}-mid.webp · s{i}-fg.webp.
     bg  → плита: Higs 16:9 2k → cwebp (2000px, без альфы)
     mid → субъект на MAGENTA → ffmpeg colorkey (мягкий край) → cwebp alpha (1760px)
     fg  → нижняя полоса-рамка на MAGENTA → colorkey → cwebp alpha (1760px)
   Пул concurrency 5 (Higs max 8 active). Resumable: готовый .webp пропускается. Ретраи ×3.
   Прогресс → scripts/animated/.gen-progress.json. По миру → <slug>/kit.json.

   Запуск (node 22):  npx tsx scripts/animated/gen-worlds.ts [slug ...]
   Без аргументов — все 30. С аргументами — только указанные слаги.
   ───────────────────────────────────────────────────────────────────────── */
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { higsAvailable, higsGenerateImageAsync, higsRemoveBackground, higsDownload } from "@/lib/ai/higs";
import { WORLDS, A_ROOT, type World, type Scene } from "./worlds";

const FOLDER = "animated";
const POOL = Number(process.env.GEN_POOL || 5);
const PROGRESS = "scripts/animated/.gen-progress.json";

// fg-полоса на MAGENTA → ffmpeg chroma (полоса заполняет кадр — модель кладёт magenta вокруг; работает)
const MAG =
  "The entire background behind it MUST be solid pure flat magenta #ff00ff — no sky, no horizon, no scenery, no gradient. NO magenta or pink anywhere inside the subject itself.";

// «сценовые» слова стиля толкают к полной сцене вместо изоляции — для вырезок их убираем
function cutStyle(w: World): string {
  return w.style
    .replace("atmospheric perspective (distant elements paler and cooler, near elements warmer and contrastier), ", "")
    .replace("cinematic wide framing, ", "");
}
// обрезаем среду в описании субъекта (bg-плита её и так несёт) → чистая изоляция для remove-bg
const CUTAT = [" at the ", " gazing", " crossing", " onto the", " toward", " through the", " between the",
  " under the", " over the", " beneath", " into the", " along the", " above the", " among ", " before the",
  " dwarfed", ", small", ", tiny", " catching the wind", " reflected", " on the valley", " on the ridge",
  " on the black", " on the jungle", " on the grassland", " on the frozen", " on the cliff"];
function cutCore(s: string): string {
  let idx = s.length;
  for (const m of CUTAT) { const i = s.indexOf(m); if (i > 0 && i < idx) idx = i; }
  return s.slice(0, idx).trim().replace(/,$/, "");
}

type Kind = "bg" | "mid" | "fg";
type Task = { world: World; si: number; scene: Scene; kind: Kind; out: string; raw: string };

function prompt(w: World, sc: Scene, kind: Kind): string {
  if (kind === "bg")
    return `Wide edge-to-edge cinematic background plate: ${sc.bg}. Generous calm negative space in the upper third for a headline. No large foreground objects, no close-up subjects. ${w.style}`;
  if (kind === "mid") {
    // одиночный субъект: charcoal-фон → remove-bg (Apple Vision) вырежет субъект даже из сцены.
    // короткое ядро («the figure») теряет костюм/эпоху — тогда берём полное описание (фон уберёт remove-bg).
    const core = cutCore(sc.mid);
    const subj = core.length < 20 ? sc.mid : core;
    return `A single isolated subject, full and prominent, CENTERED on a plain flat dark charcoal studio background, nothing else in frame — no scenery, no horizon, no ground plane: ${subj}. ${cutStyle(w)}`;
  }
  // fg: нижняя полоса-рамка на magenta → chroma
  return `${sc.fg}, arranged as a LOW foreground frame band spanning the bottom of the frame, in soft shadow. ${MAG} ${cutStyle(w)}`;
}

function sh(cmd: string, args: string[]) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`${cmd}: ${(r.stderr || r.stdout || "").slice(0, 160)}`);
}

// magenta → альфа с мягким краем; лёгкая эрозия матовой кромки гасит фиолетовую бахрому
function chroma(raw: string, outPng: string) {
  sh("ffmpeg", ["-y", "-loglevel", "error", "-i", raw,
    "-vf", "colorkey=0xff00ff:0.33:0.19,format=rgba,gblur=sigma=1.1:steps=1", outPng]);
}
function webpFrom(src: string, out: string, resize: number, q = 84) {
  sh("cwebp", ["-quiet", "-q", String(q), "-resize", String(resize), "0", src, "-o", out]);
}

async function build(t: Task): Promise<void> {
  const stamp = Math.abs(hash(t.out)).toString(36); // детерминированный jobId (без Date.now в скрипте не нужен)
  const jobId = `w-${t.world.slug}-${t.scene.id}-${t.kind}-${stamp}`;
  const url = await higsGenerateImageAsync({ jobId, prompt: prompt(t.world, t.scene, t.kind), folder: FOLDER, aspectRatio: "16:9", quality: "2k" });
  const rawJpg = t.raw + ".jpg";
  await higsDownload(url, rawJpg);
  if (t.kind === "bg") {
    webpFrom(rawJpg, t.out, 2000);
  } else if (t.kind === "mid") {
    // одиночный субъект на charcoal → remove-background (Apple Vision) → PNG-alpha → webp
    const cut = await higsRemoveBackground(rawJpg, `${jobId}-rmbg`, FOLDER);
    const png = t.raw + ".png";
    await higsDownload(cut, png);
    webpFrom(png, t.out, 1760);
  } else {
    // fg-полоса на magenta → chroma → webp
    const png = t.raw + ".png";
    chroma(rawJpg, png);
    webpFrom(png, t.out, 1760);
  }
}

function hash(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; } return h; }

function loadProgress(): Record<string, string> { try { return JSON.parse(fs.readFileSync(PROGRESS, "utf8")); } catch { return {}; } }
function saveProgress(p: Record<string, string>) { fs.writeFileSync(PROGRESS, JSON.stringify(p, null, 0)); }

async function pool<T>(items: T[], n: number, worker: (it: T, i: number) => Promise<void>) {
  let idx = 0;
  const runners = Array.from({ length: Math.min(n, items.length) }, async () => {
    while (idx < items.length) { const i = idx++; await worker(items[i], i); }
  });
  await Promise.all(runners);
}

async function main() {
  if (!(await higsAvailable())) throw new Error("Higs bot недоступен (127.0.0.1:3210)");
  const filter = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const worlds = filter.length ? WORLDS.filter((w) => filter.includes(w.slug)) : WORLDS;
  if (!worlds.length) throw new Error(`нет миров под фильтр: ${filter.join(",")}`);

  // построить список задач + папки
  const tasks: Task[] = [];
  for (const w of worlds) {
    const dir = path.join(A_ROOT, w.slug);
    const rawDir = path.join(dir, "_raw");
    fs.mkdirSync(rawDir, { recursive: true });
    w.scenes.forEach((scene, i) => {
      const si = i + 1;
      (["bg", "mid", "fg"] as Kind[]).forEach((kind) => {
        tasks.push({ world: w, si, scene, kind,
          out: path.join(dir, `s${si}-${kind}.webp`),
          raw: path.join(rawDir, `s${si}-${kind}`) });
      });
    });
  }

  const prog = loadProgress();
  const todo = tasks.filter((t) => !fs.existsSync(t.out));
  console.log(`МИРЫ: ${worlds.length} | задач всего: ${tasks.length} | к генерации: ${todo.length} | готово: ${tasks.length - todo.length} | pool ${POOL}`);

  let done = 0, fail = 0;
  await pool(todo, POOL, async (t) => {
    const key = t.out;
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        await build(t);
        ok = true; done++;
        prog[key] = "ok"; saveProgress(prog);
        console.log(`✓ ${t.world.slug}/s${t.si}-${t.kind}  [${done}/${todo.length}]`);
      } catch (e) {
        const msg = (e as Error).message.slice(0, 90);
        console.log(`  retry ${t.world.slug}/s${t.si}-${t.kind} #${attempt}: ${msg}`);
        await new Promise((r) => setTimeout(r, 3500 * attempt));
      }
    }
    if (!ok) { fail++; prog[key] = "FAIL"; saveProgress(prog); console.log(`✗ GIVEUP ${t.world.slug}/s${t.si}-${t.kind}`); }
  });

  // kit.json на каждый мир (список наличных файлов) — для последующей сборки сайтов
  for (const w of worlds) {
    const dir = path.join(A_ROOT, w.slug);
    const kit = {
      slug: w.slug, name: w.name, thesis: w.thesis, motif: w.motif, palette: w.palette,
      scenes: w.scenes.map((sc, i) => ({
        id: sc.id, dark: !!sc.dark,
        bg: fs.existsSync(path.join(dir, `s${i + 1}-bg.webp`)) ? `s${i + 1}-bg.webp` : null,
        mid: fs.existsSync(path.join(dir, `s${i + 1}-mid.webp`)) ? `s${i + 1}-mid.webp` : null,
        fg: fs.existsSync(path.join(dir, `s${i + 1}-fg.webp`)) ? `s${i + 1}-fg.webp` : null,
      })),
    };
    fs.writeFileSync(path.join(dir, "kit.json"), JSON.stringify(kit, null, 2));
  }

  console.log(`\nИТОГ: done ${done}, fail ${fail}, всего готово ${tasks.filter((t) => fs.existsSync(t.out)).length}/${tasks.length}`);
  if (fail) console.log("есть FAIL — перезапусти этот же скрипт, он до-сгенерит недостающее (skip-existing).");
}
main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
