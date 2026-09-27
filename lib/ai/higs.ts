/**
 * Клиент локального Higs Bot (автоматизация Higgsfield).
 *
 * Первая итерация медиа-конвейера: сервис живёт на машине владельца
 * (127.0.0.1:3210), генерит изображения (nano-banana-pro) и видео (kling-3.0)
 * через управляемый браузер. Позже уедет на нормальный API — поэтому весь
 * доступ к нему изолирован в этом модуле.
 *
 * Особенности сервиса:
 *  - максимум 8 активных генераций; лишние запросы бот принимает в свою
 *    устойчивую FIFO-очередь, а старый 429-контракт всё ещё поддержан;
 *  - задачи одной формы отправляются последовательно, а уже принятые задачи
 *    обрабатываются Higgsfield параллельно;
 *  - картинка ~1 мин, видео — несколько минут: таймауты щедрые.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname, basename } from "path";

const BASE = process.env.HIGS_BOT_URL || "http://127.0.0.1:3210";
const TOKEN = process.env.HIGS_TOKEN || "";

// Таймаут включает ОЖИДАНИЕ В ОЧЕРЕДИ: задачи одного типа сервис выполняет
// последовательно (~1 мин/фото), поэтому 8-я задача пула ждёт ~8 минут до старта.
// Короткие таймауты здесь = потерянная половина кадров (проверено болью).
const IMAGE_TIMEOUT = 60 * 60_000;
const VIDEO_TIMEOUT = 45 * 60_000;
const UPSCALE_TIMEOUT = 45 * 60_000;

function headers(json = true): Record<string, string> {
  const h: Record<string, string> = {};
  if (json) h["Content-Type"] = "application/json";
  if (TOKEN) h["Authorization"] = `Bearer ${TOKEN}`;
  return h;
}

export async function higsAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/health`, { headers: headers(false), signal: AbortSignal.timeout(2500) });
    if (!res.ok) return false;
    const data = await res.json();
    return data?.ok === true;
  } catch {
    return false;
  }
}

/** Загружает локальный файл в Higs Bot (стартовый/конечный кадр видео). Возвращает путь на стороне сервиса. */
export async function higsUpload(localPath: string): Promise<string> {
  const buf = await readFile(localPath);
  const form = new FormData();
  form.append("images", new Blob([new Uint8Array(buf)]), basename(localPath));
  const res = await fetch(`${BASE}/api/files/upload`, { method: "POST", headers: headers(false), body: form });
  if (!res.ok) throw new Error(`higs upload ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const path = extractFirstPath(data);
  if (!path) throw new Error(`higs upload: путь не найден в ответе ${JSON.stringify(data).slice(0, 300)}`);
  return path;
}

/** Ищет первый файловый путь в ответе upload (форма ответа может меняться). */
function extractFirstPath(data: unknown): string | null {
  if (typeof data === "string") return /[/\\]/.test(data) ? data : null;
  if (Array.isArray(data)) {
    for (const item of data) {
      const p = extractFirstPath(item);
      if (p) return p;
    }
    return null;
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["path", "filePath", "file", "absolutePath"]) {
      if (typeof obj[key] === "string") return obj[key] as string;
    }
    for (const key of ["files", "uploads", "images", "results", "data"]) {
      if (obj[key] !== undefined) {
        const p = extractFirstPath(obj[key]);
        if (p) return p;
      }
    }
  }
  return null;
}

interface HigsJobResponse {
  ok?: boolean;
  job?: { jobId?: string; status?: string; phase?: string; results?: { path?: string; url?: string }[]; error?: string };
  error?: string;
  code?: string;
}

/**
 * Одна синхронная генерация. Ретраит 429 (лимит 8 активных) с паузой —
 * долгие очереди здесь норма: мы сознательно ждём весь конвейер.
 */
async function higsGenerate(body: Record<string, unknown>, timeoutMs: number): Promise<string> {
  const maxAttempts = 40;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(`${BASE}/api/generate`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ ...body, wait: true }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 20_000));
      continue;
    }
    const data = (await res.json().catch(() => ({}))) as HigsJobResponse;
    if (!res.ok) throw new Error(`higs generate ${res.status}: ${data.error || data.code || "ошибка"}`);
    const job = data.job;
    if (!job || job.status === "error" || job.status === "failed") {
      throw new Error(`higs job failed: ${job?.error || job?.status || "нет ответа"}`);
    }
    const url = job.results?.[0]?.url || job.results?.[0]?.path;
    if (!url) throw new Error("higs: генерация завершилась без результата");
    return url.startsWith("http") ? url : `${BASE}/${url.replace(/^\/+/, "")}`;
  }
  throw new Error("higs: лимит генераций не освободился");
}

/**
 * Универсальная асинхронная генерация: wait:false → сразу jobId → опрос
 * /api/jobs/:jobId до done. timeoutMs расходуется только после выхода задачи
 * из queued: хвост пачки из 50 запросов не должен умереть, пока честно ждёт слот.
 */
async function higsGenerateAsync(body: Record<string, unknown>, timeoutMs: number): Promise<string> {
  // старт задачи
  let jobId = body.jobId as string | undefined;
  for (let attempt = 0; attempt < 20; attempt++) {
    const res = await fetch(`${BASE}/api/generate`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ ...body, wait: false }),
      signal: AbortSignal.timeout(60_000),
    });
    if (res.status === 429) { await new Promise((r) => setTimeout(r, 20_000)); continue; }
    const data = (await res.json().catch(() => ({}))) as HigsJobResponse;
    if (!res.ok) throw new Error(`higs generation start ${res.status}: ${data.error || data.code || "ошибка"}`);
    jobId = data.job?.jobId || jobId;
    break;
  }
  if (!jobId) throw new Error("higs generation: не получен jobId");

  // опрос до завершения
  const absoluteDeadline = Date.now() + 12 * 60 * 60_000;
  let activeStartedAt: number | null = null;
  let lastStatus = "queued";
  let lastPhase = "queued";
  while (Date.now() < absoluteDeadline && (!activeStartedAt || Date.now() - activeStartedAt < timeoutMs)) {
    await new Promise((r) => setTimeout(r, 8_000));
    const res = await fetch(`${BASE}/api/jobs/${encodeURIComponent(jobId)}`, { headers: headers(false), signal: AbortSignal.timeout(30_000) }).catch(() => null);
    if (!res || !res.ok) continue;
    const data = (await res.json().catch(() => ({}))) as HigsJobResponse;
    const job = data.job || (data as unknown as HigsJobResponse["job"]);
    const status = job?.status;
    if (status) lastStatus = status;
    if (job?.phase) lastPhase = job.phase;
    // Сервер может вернуть задачу в очередь после неподтверждённого клика.
    // Новый provider-attempt получает полный рабочий таймаут заново.
    if (status === "queued") activeStartedAt = null;
    else if (status && !activeStartedAt) activeStartedAt = Date.now();
    if (status === "done") {
      const url = job?.results?.[0]?.url || job?.results?.[0]?.path;
      if (!url) throw new Error("higs generation: done без результата");
      return url.startsWith("http") ? url : `${BASE}/${url.replace(/^\/+/, "")}`;
    }
    if (status === "error" || status === "failed") throw new Error(`higs generation job failed: ${job?.error || status}`);
  }
  throw new Error(`higs generation: превышен защитный таймаут (job=${jobId}, status=${lastStatus}, phase=${lastPhase})`);
}

export interface HigsImageOptions {
  prompt: string;
  jobId: string;
  folder: string;
  model?: string;
  aspectRatio?: string;
  quality?: string;
  /** Локальные пути кадров-референсов (зависимые генерации одной истории). */
  refFrames?: string[];
}

/** Генерация изображения (по умолчанию nano-banana-pro, 2K, 16:9). Возвращает URL результата. */
export async function higsGenerateImage(o: HigsImageOptions): Promise<string> {
  const refs: string[] = [];
  for (const local of o.refFrames || []) refs.push(await higsUpload(local));
  const aspect = o.aspectRatio || "16:9";
  return higsGenerate({
    jobId: o.jobId,
    model: o.model || process.env.HIGS_IMAGE_MODEL || "nano-banana-pro",
    prompt: o.prompt,
    ...(refs.length ? { images: refs } : {}),
    // API ждёт "aspect" (форматы "16:9" | "9:16" | "1:1"); aspectRatio дублируем
    aspect,
    aspectRatio: aspect,
    quality: o.quality || "2k",
    folder: o.folder,
  }, IMAGE_TIMEOUT);
}

/** Асинхронная генерация изображения (wait:false + опрос) — для медленных моделей (nano-banana-pro), обходит внутренний 60-сек таймаут бота. */
export async function higsGenerateImageAsync(o: HigsImageOptions): Promise<string> {
  const refs: string[] = [];
  for (const local of o.refFrames || []) refs.push(await higsUpload(local));
  const aspect = o.aspectRatio || "16:9";
  return higsGenerateAsync({
    jobId: o.jobId,
    model: o.model || process.env.HIGS_IMAGE_MODEL || "nano-banana-pro",
    prompt: o.prompt,
    ...(refs.length ? { images: refs } : {}),
    aspect,
    aspectRatio: aspect,
    quality: o.quality || "2k",
    folder: o.folder,
  }, IMAGE_TIMEOUT);
}

/**
 * Вырезание фона (remove-background): предмет остаётся на прозрачном PNG —
 * foreground-объекты глав летают силуэтами, как в референсе.
 */
export async function higsRemoveBackground(localPath: string, jobId: string, folder: string): Promise<string> {
  const path = await higsUpload(localPath);
  return higsGenerate({
    jobId,
    model: "remove-background",
    images: [path],
    folder,
    aspect: "1:1",
  }, IMAGE_TIMEOUT);
}

export interface HigsVideoOptions {
  prompt: string;
  jobId: string;
  folder: string;
  /** Локальный путь стартового кадра (будет загружен в сервис). */
  startFrame: string;
  /** Опц. локальный путь конечного кадра — «прийти в этот кадр». */
  endFrame?: string;
  duration?: number;
  quality?: string;
}

/** Генерация видео kling-3.0 из стартового (и опц. конечного) кадра. Возвращает URL mp4. */
export async function higsGenerateVideo(o: HigsVideoOptions): Promise<string> {
  const start = await higsUpload(o.startFrame);
  const end = o.endFrame ? await higsUpload(o.endFrame) : undefined;
  return higsGenerate({
    jobId: o.jobId,
    model: "kling-3.0",
    prompt: o.prompt,
    // контракт Higs Bot: images[0] — start frame, endFrame — конечный кадр
    images: [start],
    ...(end ? { endFrame: end } : {}),
    quality: o.quality || "1080p",
    duration: Math.min(15, Math.max(3, o.duration ?? 5)),
    folder: o.folder,
  }, VIDEO_TIMEOUT);
}

/**
 * Async-вариант видео (wait:false → jobId → опрос /api/jobs/:id). Для длинных
 * kling-задач: обходит дефолтный headers-timeout Node fetch (~5 мин), из-за
 * которого синхронный higsGenerateVideo падает с UND_ERR_HEADERS_TIMEOUT.
 */
export async function higsGenerateVideoAsync(o: HigsVideoOptions): Promise<string> {
  const start = await higsUpload(o.startFrame);
  const end = o.endFrame ? await higsUpload(o.endFrame) : undefined;
  return higsGenerateAsync({
    jobId: o.jobId,
    model: "kling-3.0",
    prompt: o.prompt,
    images: [start],
    ...(end ? { endFrame: end } : {}),
    quality: o.quality || "1080p",
    duration: Math.min(15, Math.max(3, o.duration ?? 5)),
    folder: o.folder,
  }, VIDEO_TIMEOUT);
}

export interface HigsUpscaleOptions {
  resolution?: "1080p" | "2K" | "4K" | "8K";
  fps?: 30 | 60;
  preset?: "Common" | "AIGC" | "Short Series" | "UGC" | "Old Film";
  version?: "Standard" | "Pro";
  jobId?: string;
  folder?: string;
  maxCredits?: number;
}

/**
 * AI-апскейл видео (bytedance-upscale): генерим 1080p → апскейлим до 4K/8K
 * (модель дорисовывает детали и снимает compression-шум), затем можно
 * даунскейлить обратно для суперсэмплинга. Приём качества для витринных hero.
 */
export async function higsUpscaleVideo(localPath: string, o: HigsUpscaleOptions = {}): Promise<string> {
  const path = await higsUpload(localPath);
  // upscale долгий — только async (wait:false + опрос), иначе 60-сек таймаут сервиса
  return higsGenerateAsync({
    jobId: o.jobId || `upscale-${Date.now().toString(36)}`,
    model: "bytedance-upscale",
    images: [path],
    version: o.version || "Standard",
    resolution: o.resolution || "4K",
    fps: o.fps || 30,
    preset: o.preset || "Common",
    maxCredits: o.maxCredits ?? 30,
    folder: o.folder || FOLDER_UPSCALE,
  }, UPSCALE_TIMEOUT);
}

const FOLDER_UPSCALE = "upscale-results";

/** Скачивает результат генерации в локальный файл. */
export async function higsDownload(url: string, destPath: string): Promise<void> {
  const res = await fetch(url, { headers: headers(false), signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`higs download ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
}
