/**
 * Оркестратор медиа-конвейера генерации (первая итерация — локальный Higs Bot).
 *
 * Порядок фаз (мы сознательно ЖДЁМ каждую до конца — время пайплайна вторично):
 *  1. слоты из собранного манифеста → AI пишет вселенную + промпты;
 *  2. фото: последовательная генерация всех слотов (nano-banana-pro 2K 16:9);
 *  3. видео: hero-цепочка A→B→C→D (kling-3.0 1080p, start+end frame,
 *     3 сегмента × 5с → ffmpeg-склейка в один скраб -g 2) и ambient-лупы
 *     для первых глав story-chapters;
 *  4. палитра сайта — vision-разбором первого hero-кадра (цвета ПОСЛЕ медиа).
 *
 * Всё сгенерированное сохраняется в public/uploads/<userId>/gen/ — эти URL
 * проходят isTrustedImageUrl, а оставшиеся пустыми слоты добьёт сток.
 * Любая ошибка фазы деградирует мягко: сайт собирается с тем, что успели.
 */

import { mkdir, readFile } from "fs/promises";
import { join } from "path";
import type { ArtDirectionBrief } from "./art-direction";
import { higsDownload, higsGenerateImage, higsGenerateVideo, higsRemoveBackground, higsUpscaleVideo } from "./higs";
import {
  ambientMotionPrompt,
  assignSlot,
  buildFrameQAPrompt,
  buildMediaPromptsPrompt,
  buildMediaSlots,
  buildPaletteVisionPrompt,
  enforceStoryRefs,
  heroChainMotionPrompt,
  parseFrameQA,
  parseMediaPrompts,
  parsePaletteFromVision,
} from "./media-plan";
import { concatScrub, extractPoster, hasFfmpeg, makeThumb, probeHasAlpha, reencodeLoop, rmQuiet, toPng } from "@/lib/media/ffmpeg";
import type { ContentManifestBlock } from "@/lib/site/generate";

export interface MediaPipelineDeps {
  callModel: (system: string, user: string) => Promise<string>;
  callVision: (system: string, user: string, imageBase64: string, mime: string) => Promise<string>;
  progress: (info: { phase: string; done?: number; total?: number; note?: string }) => void;
}

export interface MediaPipelineResult {
  imagesDone: number;
  videosDone: number;
  palette: ArtDirectionBrief["palette"] | null;
  /** Hero-видео (цепочка) собралось и назначено story-poster. Если нет —
   *  вызывающий должен УДАЛИТЬ story-poster: дефолтное сток-видео хуже отсутствия. */
  heroVideoApplied: boolean;
}

const CHAIN_SEGMENT_SEC = 5;
const AMBIENT_SEC = 6;
const MAX_AMBIENT_VIDEOS = 4; // главам ограничение 3-4 в контент-промпте — живые все
/** Higgsfield держит до 8 активных генераций — забиваем очередь, а не ходим по одной. */
const IMAGE_CONCURRENCY = 8;
const VIDEO_CONCURRENCY = 5;

/**
 * Пул с зависимостями: до `limit` задач одновременно; задача с ref стартует
 * только когда родитель завершился (его кадр передаётся референсом). Рефы
 * санитизированы «строго назад», поэтому дедлок невозможен: очередь всегда
 * дотекает до конца, свободные кадры не ждут зависимых.
 */
async function runDependentPool(
  count: number,
  limit: number,
  refOf: (i: number) => number | null,
  worker: (i: number) => Promise<void>,
): Promise<void> {
  const status: ("pending" | "running" | "done" | "failed")[] = new Array(count).fill("pending");
  const running = new Map<number, Promise<void>>();
  const ready = (i: number) => {
    const ref = refOf(i);
    return ref == null || status[ref] === "done" || status[ref] === "failed";
  };
  while (status.includes("pending") || running.size) {
    for (let i = 0; i < count && running.size < limit; i++) {
      if (status[i] !== "pending" || !ready(i)) continue;
      status[i] = "running";
      const p = worker(i)
        .then(() => { status[i] = "done"; })
        .catch(() => { status[i] = "failed"; })
        .finally(() => { running.delete(i); });
      running.set(i, p);
    }
    if (!running.size) break; // ничего не запустилось — все pending недостижимы
    await Promise.race(running.values());
  }
}

/** Ретраи с новым jobId на попытку: сбои Higgsfield («не зашёл промпт», сеть) — норма. */
async function withRetry<T>(attempts: number, fn: (attempt: number) => Promise<T>): Promise<T> {
  let last: unknown;
  for (let a = 0; a < attempts; a++) {
    try { return await fn(a); } catch (err) { last = err; }
  }
  throw last;
}

export async function runMediaPipeline(
  brief: string,
  ad: ArtDirectionBrief,
  manifest: ContentManifestBlock[],
  userId: number,
  deps: MediaPipelineDeps,
): Promise<MediaPipelineResult> {
  const result: MediaPipelineResult = { imagesDone: 0, videosDone: 0, palette: null, heroVideoApplied: false };
  const genDir = join(process.cwd(), "public", "uploads", String(userId), "gen");
  await mkdir(genDir, { recursive: true });
  const stamp = Date.now().toString(36);
  const webBase = `/uploads/${userId}/gen`;
  const folder = `creatly-${stamp}`;

  // ── Фаза 1: план и промпты ──
  const slots = buildMediaSlots(manifest);
  const heroPosterIdx = manifest.findIndex((b) => b.presetId === "story-poster-01");
  const wantChain = heroPosterIdx !== -1;
  if (!slots.length && !wantChain) return result;

  deps.progress({ phase: "media-plan", total: slots.length, note: "Пишу промпты кадров" });
  // M1 критичен: без него весь конвейер уходит в сток — до 3 попыток с логом
  let plan: ReturnType<typeof parseMediaPrompts> = null;
  for (let attempt = 0; attempt < 3 && !plan; attempt++) {
    try {
      const promptsRaw = await deps.callModel(
        "Ты — режиссёр AI-съёмки. Отвечай только валидным JSON без пояснений вокруг.",
        buildMediaPromptsPrompt(brief, ad, slots, wantChain),
      );
      plan = parseMediaPrompts(promptsRaw, slots.length);
      if (!plan) console.error(`[media] M1 не распарсился (попытка ${attempt + 1}), ответ: ${promptsRaw.slice(0, 300)}…`);
    } catch (err) {
      console.error(`[media] M1 упал (попытка ${attempt + 1}):`, err);
    }
  }
  if (!plan) {
    console.error("[media] промпты кадров не получены после 3 попыток — конвейер пропущен");
    return result;
  }
  // Связность мира глав — принудительно, не полагаясь на дисциплину модели
  enforceStoryRefs(slots, plan.images);

  const ffmpeg = await hasFfmpeg();
  const QA_KINDS = new Set(["hero", "chapter", "fg"]);

  /** Vision-оценка кадра по превью: годен / что чинить в промпте. */
  const qaFrame = async (local: string, role: string, framePrompt: string): Promise<{ ok: boolean; fix: string } | null> => {
    if (!ffmpeg) return null;
    const thumb = join(genDir, `qa-${Date.now().toString(36)}.jpg`);
    try {
      await makeThumb(local, thumb);
      const buf = await readFile(thumb);
      const raw = await deps.callVision(
        "Ты — контроль качества съёмки. Отвечай только валидным JSON.",
        buildFrameQAPrompt(plan.universe, role, framePrompt),
        buf.toString("base64"),
        "image/jpeg",
      );
      return parseFrameQA(raw);
    } catch {
      return null; // QA не должен ронять конвейер
    } finally {
      await rmQuiet(thumb);
    }
  };

  // ── Фаза 2: фото — пул до 8 параллельных; зависимые кадры ждут родителя.
  //    До 3 попыток на слот: сбой генерации -> ретрай; кадр не прошёл
  //    vision-QA -> регенерация с критикой; 3-я попытка — упрощённый промпт. ──
  const localBySlot = new Map<number, string>();
  const webBySlot = new Map<number, string>();
  deps.progress({ phase: "media-images", done: 0, total: slots.length });
  let imagesFinished = 0;
  await runDependentPool(slots.length, IMAGE_CONCURRENCY, (i) => plan.images[i].ref, async (i) => {
    const slot = slots[i];
    const roleHint = `[${slot.kind}] ${slot.presetId} / ${slot.field}`;
    let prompt = plan.images[i].prompt;
    let lastErr: unknown = null;
    try {
      for (let attempt = 0; attempt < 3 && !localBySlot.has(i); attempt++) {
        // финальная попытка — максимально простой промпт, лишь бы остаться в мире
        if (attempt === 2) prompt = `${plan.universe} — ${plan.images[i].prompt.slice(0, 160)}, cinematic, painterly light, no text`;
        try {
          const ref = plan.images[i].ref;
          const refLocal = ref != null ? localBySlot.get(ref) : undefined;
          const url = await higsGenerateImage({
            prompt,
            jobId: `img-${stamp}-${i}-a${attempt}`,
            folder,
            refFrames: refLocal ? [refLocal] : undefined,
            aspectRatio: slot.kind === "fg" ? "1:1" : undefined,
          });
          const ext = url.split("?")[0].split(".").pop() || "png";
          const local = join(genDir, `${stamp}-img-${i}-a${attempt}.${ext}`);
          await higsDownload(url, local);
          // auto-accept: видные кадры проходят vision-контроль, брак уходит на регенерацию
          if (QA_KINDS.has(slot.kind) && attempt < 2) {
            const verdict = await qaFrame(local, roleHint, prompt);
            if (verdict && !verdict.ok) {
              console.warn(`[media] кадр ${i} не прошёл QA (${verdict.fix.slice(0, 120)}) — регенерирую`);
              prompt = `${plan.images[i].prompt}\nIMPORTANT FIX: ${verdict.fix}`;
              continue;
            }
          }
          const web = `${webBase}/${stamp}-img-${i}-a${attempt}.${ext}`;
          localBySlot.set(i, local);
          webBySlot.set(i, web);
          assignSlot(manifest, slot, web);
          result.imagesDone++;
        } catch (err) {
          lastErr = err;
        }
      }
      if (!localBySlot.has(i)) {
        console.error(`[media] кадр ${i} не удался после 3 попыток:`, lastErr);
        throw lastErr;
      }
    } finally {
      imagesFinished++;
      deps.progress({ phase: "media-images", done: imagesFinished, total: slots.length });
    }
  });

  // ── Фаза 2а: недостающие слоты добираем СВОИМИ удачными кадрами (тот же мир),
  //    а не стоком — смесь стока с генерацией и есть «слоп» ──
  {
    const missing = slots.map((s, i) => ({ s, i })).filter(({ i }) => !webBySlot.has(i));
    if (missing.length && webBySlot.size) {
      const byKind = new Map<string, string[]>();
      slots.forEach((s, i) => {
        const w = webBySlot.get(i);
        if (w) byKind.set(s.kind, [...(byKind.get(s.kind) || []), w]);
      });
      const all = [...webBySlot.values()];
      const counters = new Map<string, number>();
      for (const { s, i } of missing) {
        const pool = byKind.get(s.kind)?.length ? byKind.get(s.kind)! : all;
        const c = counters.get(s.kind) || 0;
        counters.set(s.kind, c + 1);
        assignSlot(manifest, s, pool[c % pool.length]);
        console.warn(`[media] слот ${i} (${s.kind}) добит удачным кадром рана, не стоком`);
      }
    }
  }

  // ── Фаза 2б: вырезание fg-объектов (remove-background). Валидация альфы
  //    обязательна: сервис может вернуть превью с НАРИСОВАННОЙ шахматкой
  //    (webp yuv420p без прозрачности) — такое объектом не становится. ──
  const fgSlots = slots.map((s, i) => ({ s, i })).filter(({ s, i }) => s.kind === "fg" && localBySlot.has(i));
  if (fgSlots.length && ffmpeg) {
    let cutDone = 0;
    deps.progress({ phase: "media-cutouts", done: 0, total: fgSlots.length });
    await runDependentPool(fgSlots.length, IMAGE_CONCURRENCY, () => null, async (k) => {
      const { s, i } = fgSlots[k];
      try {
        await withRetry(2, async (attempt) => {
          const url = await higsRemoveBackground(localBySlot.get(i)!, `cut-${stamp}-${i}-a${attempt}`, folder);
          const rawExt = url.split("?")[0].split(".").pop() || "png";
          const raw = join(genDir, `${stamp}-img-${i}-cutraw.${rawExt}`);
          await higsDownload(url, raw);
          if (!(await probeHasAlpha(raw))) {
            await rmQuiet(raw);
            throw new Error("remove-background вернул кадр без альфа-канала (шахматка нарисована)");
          }
          const cut = join(genDir, `${stamp}-img-${i}-cut.png`);
          await toPng(raw, cut);
          await rmQuiet(raw);
          localBySlot.set(i, cut);
          assignSlot(manifest, s, `${webBase}/${stamp}-img-${i}-cut.png`);
        });
      } catch (err) {
        // объект остаётся фото-карточкой — это лучше грязного псевдо-выреза
        console.error(`[media] вырез объекта ${i} не удался:`, err);
        throw err;
      } finally {
        cutDone++;
        deps.progress({ phase: "media-cutouts", done: cutDone, total: fgSlots.length });
      }
    });
  }

  // ── Фаза 3а: кадры hero-цепочки A→B→C→D — последовательно, каждый кадр
  //    получает предыдущий референсом: одно непрерывное путешествие ──
  const chainFrames: string[] = [];
  if (wantChain && plan.heroChain && ffmpeg) {
    for (let i = 0; i < plan.heroChain.length; i++) {
      deps.progress({ phase: "media-chain-frames", done: i, total: plan.heroChain.length });
      try {
        const url = await higsGenerateImage({
          prompt: plan.heroChain[i],
          jobId: `chain-${stamp}-${i}`,
          folder,
          refFrames: chainFrames.length ? [chainFrames[chainFrames.length - 1]] : undefined,
        });
        const local = join(genDir, `${stamp}-chain-${i}.png`);
        await higsDownload(url, local);
        chainFrames.push(local);
      } catch (err) {
        console.error(`[media] кадр цепочки ${i} не удался:`, err);
        break; // без непрерывности цепочка не имеет смысла
      }
    }
    // Кадр A — эпичная установочная сцена: пригодится для палитры, если hero-фото не вышло
    if (chainFrames[0]) localBySlot.set(-1, chainFrames[0]);
  }

  // ── Фаза 3б: все видео одним параллельным пулом (сегменты цепочки + ambient) ──
  if (ffmpeg) {
    const tasks: { kind: "chain" | "ambient"; run: () => Promise<void> }[] = [];
    const chainClips: (string | null)[] = [];

    if (chainFrames.length >= 2) {
      const fallbackMotion = heroChainMotionPrompt(plan.universe);
      for (let seg = 0; seg < chainFrames.length - 1; seg++) {
        chainClips.push(null);
        const s = seg;
        // Пер-сегментный motion-промпт от модели (по плейбуку), иначе шаблон
        const spec = plan.heroChainMotion?.[s];
        tasks.push({ kind: "chain", run: async () => {
          const url = await withRetry(2, (a) => higsGenerateVideo({
            prompt: spec?.prompt || fallbackMotion,
            jobId: `chainv-${stamp}-${s}-a${a}`,
            folder,
            startFrame: chainFrames[s],
            endFrame: chainFrames[s + 1],
            duration: spec?.duration ?? CHAIN_SEGMENT_SEC,
          }));
          const local = join(genDir, `${stamp}-clip-${s}.mp4`);
          await higsDownload(url, local);
          chainClips[s] = local;
        } });
      }
    }

    const chaptersIdx = manifest.findIndex((b) => b.presetId === "story-chapters-01");
    if (chaptersIdx !== -1) {
      const bgSlots = slots
        .map((s, i) => ({ s, i }))
        .filter(({ s, i }) => s.block === chaptersIdx && s.kind === "chapter" && localBySlot.has(i))
        .slice(0, MAX_AMBIENT_VIDEOS);
      const fallbackAmbient = ambientMotionPrompt(plan.universe);
      bgSlots.forEach(({ s, i }, k) => {
        // Свой ambient-промпт сцены (что именно живёт в ЭТОМ кадре), иначе шаблон
        const spec = plan.ambient?.find((a) => a.slot === i);
        tasks.push({ kind: "ambient", run: async () => {
          const url = await withRetry(2, (a) => higsGenerateVideo({
            prompt: spec?.prompt || fallbackAmbient,
            jobId: `amb-${stamp}-${k}-a${a}`,
            folder,
            startFrame: localBySlot.get(i)!,
            duration: spec?.duration ?? AMBIENT_SEC,
          }));
          const raw = join(genDir, `${stamp}-amb-${k}-raw.mp4`);
          await higsDownload(url, raw);
          const final = join(genDir, `${stamp}-amb-${k}.mp4`);
          await reencodeLoop(raw, final);
          await rmQuiet(raw);
          assignSlot(manifest, s, `${webBase}/${stamp}-amb-${k}.mp4`);
          result.videosDone++;
        } });
      });
    }

    if (tasks.length) {
      let videosFinished = 0;
      deps.progress({ phase: "media-videos", done: 0, total: tasks.length });
      // ВАЖНО (выявлено на живом прогоне): end-frame автоматизация Higs Bot
      // падает под параллелью («Плитка End frame не открыла выбор файла»).
      // chain-сегменты (двухкадровые) гоним СТРОГО по одному; ambient (один
      // кадр) можно параллелить. Ставим chain первыми, лимит 1, пока идут они.
      const ordered = [...tasks].sort((a, b) => (a.kind === "chain" ? -1 : 1) - (b.kind === "chain" ? -1 : 1));
      const chainCount = ordered.filter((t) => t.kind === "chain").length;
      const runTask = async (i: number) => {
        try {
          await ordered[i].run();
        } catch (err) {
          console.error(`[media] видео ${ordered[i].kind} не удалось:`, err);
          throw err;
        } finally {
          videosFinished++;
          deps.progress({ phase: "media-videos", done: videosFinished, total: tasks.length });
        }
      };
      // chain — последовательно (end-frame боится параллели)
      for (let i = 0; i < chainCount; i++) await runTask(i).catch(() => {});
      // ambient — пулом
      if (chainCount < ordered.length) {
        await runDependentPool(ordered.length - chainCount, VIDEO_CONCURRENCY, () => null, (k) => runTask(chainCount + k));
      }

      // Склейка цепочки — только если ВСЕ сегменты дошли (иначе история рвётся)
      if (chainClips.length && chainClips.every((c) => !!c)) {
        try {
          // Опциональный upscale (UPSCALE=on): апскейлим КАЖДЫЙ сегмент до 4K
          // ПЕРЕД склейкой (форма upscale не принимает длинный финал) —
          // concatScrub потом даунскейлит в 1080p (суперсэмплинг = чётче hero).
          let clips = chainClips as string[];
          if (process.env.UPSCALE === "on") {
            const upscaled: string[] = [];
            for (let ci = 0; ci < clips.length; ci++) {
              deps.progress({ phase: "media-upscale", done: ci, total: clips.length });
              try {
                const url = await higsUpscaleVideo(clips[ci], { resolution: "4K", fps: 30, jobId: `up-${stamp}-${ci}` });
                const up = join(genDir, `${stamp}-clip-${ci}-up.mp4`);
                await higsDownload(url, up);
                upscaled.push(up);
              } catch (err) {
                console.error(`[media] upscale сегмента ${ci} не удался, беру оригинал:`, err);
                upscaled.push(clips[ci]);
              }
            }
            clips = upscaled;
          }
          const heroVideo = join(genDir, `${stamp}-hero-scrub.mp4`);
          await concatScrub(clips, heroVideo);
          await extractPoster(heroVideo, join(genDir, `${stamp}-hero-poster.jpg`));
          for (const c of chainClips) await rmQuiet(c!);
          const block = manifest[heroPosterIdx];
          block.fields = block.fields || {};
          block.fields["sp01-video"] = `${webBase}/${stamp}-hero-scrub.mp4`;
          result.videosDone++;
          result.heroVideoApplied = true;
        } catch (err) {
          console.error("[media] склейка hero-цепочки не удалась:", err);
        }
      }
    }
  }

  // ── Фаза 4: палитра сайта из готового hero-кадра ──
  try {
    const heroLocal = (() => {
      for (let i = 0; i < slots.length; i++) {
        if ((slots[i].kind === "hero" || slots[i].kind === "chapter") && localBySlot.has(i)) return localBySlot.get(i)!;
      }
      return localBySlot.get(-1) || localBySlot.values().next().value || null;
    })();
    if (heroLocal) {
      deps.progress({ phase: "media-palette" });
      const buf = await readFile(heroLocal);
      // nano-banana отдаёт webp — неверный media_type Anthropic отклоняет
      const mime = /\.jpe?g$/i.test(heroLocal) ? "image/jpeg"
        : /\.webp$/i.test(heroLocal) ? "image/webp"
        : /\.gif$/i.test(heroLocal) ? "image/gif"
        : "image/png";
      const raw = await deps.callVision(
        "Ты — колорист интерфейсов. Отвечай только валидным JSON.",
        buildPaletteVisionPrompt(ad),
        buf.toString("base64"),
        mime,
      );
      result.palette = parsePaletteFromVision(raw);
      console.log(result.palette
        ? `[media] палитра из hero-кадра: ${JSON.stringify(result.palette)}`
        : "[media] палитра из кадра не прошла контраст-гейт — остаётся палитра арт-дирекшна");
    }
  } catch (err) {
    console.error("[media] палитра из кадра не удалась:", err);
  }

  return result;
}
