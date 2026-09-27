/**
 * Серверные ffmpeg-утилиты медиа-конвейера генерации.
 *
 * Правила пережатия (выведены на демо, см. docs/video-prompts.md):
 *  - скраб-видео: -g 2 (keyframe каждые 2 кадра) — плавный реверс-скраб;
 *  - фоновые лупы: -g 12 — достаточно, файл меньше;
 *  - всегда: без звука, yuv420p, faststart, даунскейл до 1920.
 */

import { execFile } from "child_process";
import { promisify } from "util";
import { unlink } from "fs/promises";

const exec = promisify(execFile);

let ffmpegChecked: boolean | null = null;
export async function hasFfmpeg(): Promise<boolean> {
  if (ffmpegChecked !== null) return ffmpegChecked;
  try {
    await exec("ffmpeg", ["-version"]);
    ffmpegChecked = true;
  } catch {
    ffmpegChecked = false;
  }
  return ffmpegChecked;
}

// crf: ниже = выше качество/больше файл. Витринный hero-скраб пережимаем
// с высоким качеством (20) на медленном пресете, фоновые лупы — умеренно (21).
function encodeArgs(g: number, crf = 22, preset = "veryfast"): string[] {
  return [
    "-an",
    // не даунскейлим ниже исходника (kling 1080p остаётся 1080p, апскейла нет)
    "-vf", "scale='min(1920,iw)':-2",
    "-c:v", "libx264",
    "-g", String(g), "-keyint_min", String(g), "-sc_threshold", "0",
    "-preset", preset, "-crf", String(crf),
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
  ];
}

/** Пережимает видео в скраб-готовое (-g 2, высокое качество — это витрина). */
export async function reencodeScrub(src: string, dest: string): Promise<void> {
  await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", src, ...encodeArgs(2, 20, "slow"), dest], { timeout: 600_000 });
}

/** Пережимает видео в луп-фон (-g 12, умеренное качество — фон). */
export async function reencodeLoop(src: string, dest: string): Promise<void> {
  await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", src, ...encodeArgs(12, 21, "medium"), dest], { timeout: 300_000 });
}

/**
 * Склеивает цепочку клипов (A→B, B→C, C→D…) в одно непрерывное скраб-видео.
 * concat через filter_complex: нормализует размер/таймбазу каждого клипа,
 * кодирует сразу с -g 2 — готово для истории-скраба hero-секции.
 */
export async function concatScrub(clips: string[], dest: string): Promise<void> {
  if (clips.length === 1) return reencodeScrub(clips[0], dest);
  const inputs = clips.flatMap((c) => ["-i", c]);
  // fps=30 — сохраняем плавность (было 24, роняло исходник); высота до 1080
  const norm = clips.map((_, i) => `[${i}:v]scale=1920:-2:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2,setsar=1,fps=30[v${i}]`).join(";");
  const refs = clips.map((_, i) => `[v${i}]`).join("");
  const filter = `${norm};${refs}concat=n=${clips.length}:v=1:a=0[out]`;
  await exec("ffmpeg", [
    "-y", "-loglevel", "error",
    ...inputs,
    "-filter_complex", filter,
    "-map", "[out]",
    "-an",
    "-c:v", "libx264",
    "-g", "2", "-keyint_min", "2", "-sc_threshold", "0",
    // витрина — высокое качество: CRF 20 на медленном пресете
    "-preset", "slow", "-crf", "20",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    dest,
  ], { timeout: 600_000 });
}

const ALPHA_FMT_RE = /yuva|rgba|bgra|argb|abgr|gbrap|ya8|ya16/i;

/** Есть ли у изображения альфа-канал (настоящая прозрачность, а не нарисованная шахматка). */
export async function probeHasAlpha(src: string): Promise<boolean> {
  try {
    const { stdout } = await exec("ffprobe", ["-v", "error", "-show_entries", "stream=pix_fmt", "-of", "csv=p=0", src], { timeout: 30_000 });
    return ALPHA_FMT_RE.test(stdout);
  } catch {
    return false;
  }
}

/** Конвертирует изображение в PNG с сохранением альфы. */
export async function toPng(src: string, dest: string): Promise<void> {
  await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-c:v", "png", dest], { timeout: 60_000 });
}

/** Уменьшенная jpg-копия кадра для vision-оценки (экономим токены). */
export async function makeThumb(src: string, dest: string, width = 640): Promise<void> {
  await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-vf", `scale=${width}:-2`, "-q:v", "5", dest], { timeout: 60_000 });
}

/** Достаёт постер-кадр (jpg) из видео. */
export async function extractPoster(src: string, dest: string): Promise<void> {
  await exec("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-frames:v", "1", "-q:v", "3", dest], { timeout: 60_000 });
}

/** Тихо удаляет временный файл. */
export async function rmQuiet(path: string): Promise<void> {
  await unlink(path).catch(() => {});
}
