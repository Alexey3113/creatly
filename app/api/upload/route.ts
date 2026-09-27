import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { writeFile, mkdir, rename, unlink, stat } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";
import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

// Обработка видео ffmpeg-ом может занять до минуты
export const maxDuration = 180;

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 60 * 1024 * 1024; // 60MB — короткие фоновые видео для story-блоков
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

let ffmpegChecked: boolean | null = null;
async function hasFfmpeg(): Promise<boolean> {
  if (ffmpegChecked !== null) return ffmpegChecked;
  try {
    await exec("ffmpeg", ["-version"]);
    ffmpegChecked = true;
  } catch {
    ffmpegChecked = false;
    console.warn("[upload] ffmpeg не найден — видео сохраняются без обработки");
  }
  return ffmpegChecked;
}

/**
 * Приводит загруженное видео к скраб-готовому виду:
 *  - плотные keyframe (-g 4): плавный реверс-скраб в story/сцене;
 *  - без звука (фоновые ролики всегда muted);
 *  - h264 yuv420p + faststart: играет везде, стартует мгновенно;
 *  - даунскейл до 1920 по ширине (4K-фоны не нужны, вес x3);
 *  - постер-кадр jpg для мобильных/фолбэков.
 * Возвращает имя обработанного файла и постера.
 */
async function processVideo(dir: string, srcName: string, id: string): Promise<{ video: string; poster: string } | null> {
  const src = join(dir, srcName);
  const outName = `${id}.mp4`;
  const tmp = join(dir, `${id}.tmp.mp4`);
  const posterName = `${id}-poster.jpg`;
  try {
    await exec("ffmpeg", [
      "-y", "-loglevel", "error",
      "-i", src,
      "-an",
      "-vf", "scale='min(1920,iw)':-2",
      "-c:v", "libx264",
      "-g", "4", "-keyint_min", "4", "-sc_threshold", "0",
      "-preset", "veryfast", "-crf", "23",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-t", "30", // страховка: фоновому ролику больше 30 сек не нужно
      tmp,
    ], { timeout: 150_000 });
    await exec("ffmpeg", [
      "-y", "-loglevel", "error",
      "-i", tmp,
      "-frames:v", "1", "-q:v", "3",
      join(dir, posterName),
    ], { timeout: 30_000 });
    // Если обработка сделала файл больше исходника — оставляем что меньше
    const [a, b] = await Promise.all([stat(src), stat(tmp)]);
    if (b.size < a.size || srcName !== outName) {
      await rename(tmp, join(dir, outName));
      if (srcName !== outName) await unlink(src).catch(() => {});
    } else {
      await unlink(tmp).catch(() => {});
    }
    return { video: outName, poster: posterName };
  } catch (err) {
    console.error("[upload] обработка видео не удалась, сохраняю оригинал:", err);
    await unlink(tmp).catch(() => {});
    return null;
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video/");
  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json({ error: `File too large (max ${Math.round(maxSize / 1024 / 1024)}MB)` }, { status: 400 });
  }

  const id = randomBytes(8).toString("hex");
  const filename = `${id}.${ext}`;
  const userDir = join(UPLOAD_DIR, String(session.userId));

  await mkdir(userDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(userDir, filename), buffer);

  const base = `/uploads/${session.userId}`;

  // Видео: серверная обработка до скраб-готового состояния
  if (isVideo && (await hasFfmpeg())) {
    const processed = await processVideo(userDir, filename, id);
    if (processed) {
      return NextResponse.json({
        url: `${base}/${processed.video}`,
        poster: `${base}/${processed.poster}`,
        processed: true,
      });
    }
  }

  return NextResponse.json({ url: `${base}/${filename}`, processed: false });
}
