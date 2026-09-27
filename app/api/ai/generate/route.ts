import { NextResponse } from "next/server";
import { renderScrapedContext, type ScrapedSiteData } from "@/lib/ai/prompts";
import { buildArtDirectionPrompt, parseArtDirection } from "@/lib/ai/art-direction";
import {
  buildContentPrompt,
  buildDocumentFromManifest,
  buildSelectionPrompt,
  parseContentManifest,
  parseSelection,
  type GenerationMode,
} from "@/lib/site/generate";
import { slugify } from "@/lib/site/ops";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { higsAvailable } from "@/lib/ai/higs";
import { runMediaPipeline } from "@/lib/ai/media-pipeline";
import { applyBespokeHero } from "@/lib/ai/bespoke";
import { runReviewLoop } from "@/lib/ai/review-loop";

const OPENAI_BASE = "https://api.openai.com/v1";
const ANTHROPIC_BASE = "https://api.anthropic.com/v1";
const ANTHROPIC_VERSION = "2023-06-01";

// Медиа-конвейер (фото + видео Higgsfield) сознательно ждёт все генерации —
// это десятки минут. Локальная первая итерация, лимит роута задран.
export const maxDuration = 3600;

/** Anthropic Messages API: одиночный текстовый вызов. */
async function callClaudeOnce(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch(`${ANTHROPIC_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": ANTHROPIC_VERSION },
    // temperature намеренно не передаём: у новых Claude-моделей параметр deprecated
    body: JSON.stringify({
      model,
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const parts = Array.isArray(data.content) ? data.content : [];
  return parts.filter((p: { type?: string }) => p?.type === "text").map((p: { text?: string }) => p.text || "").join("");
}

/** Anthropic Messages API: текст + изображение (палитра из hero-кадра). */
async function callClaudeVisionOnce(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  imageBase64: string,
  mime: string,
): Promise<string> {
  const res = await fetch(`${ANTHROPIC_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": ANTHROPIC_VERSION },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mime, data: imageBase64 } },
          { type: "text", text: userPrompt },
        ],
      }],
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const parts = Array.isArray(data.content) ? data.content : [];
  return parts.filter((p: { type?: string }) => p?.type === "text").map((p: { text?: string }) => p.text || "").join("");
}

/** Одиночный не-стриминговый вызов модели (responses API для gpt-5*, иначе chat). */
async function callModelOnce(
  apiKey: string,
  model: string,
  isResponsesAPI: boolean,
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  if (isResponsesAPI) {
    const res = await fetch(`${OPENAI_BASE}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: [{ type: "input_text", text: userPrompt }] },
        ],
        stream: false,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    if (typeof data.output_text === "string" && data.output_text) return data.output_text;
    const out = Array.isArray(data.output) ? data.output : [];
    for (const item of out) {
      const content = Array.isArray(item?.content) ? item.content : [];
      for (const c of content) {
        if (c?.type === "output_text" && typeof c.text === "string") return c.text;
      }
    }
    return "";
  }

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 8000,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** Vision-вызов: текст + изображение (палитра сайта из готового hero-кадра). */
async function callVisionOnce(
  apiKey: string,
  model: string,
  isResponsesAPI: boolean,
  systemPrompt: string,
  userPrompt: string,
  imageBase64: string,
  mime: string,
): Promise<string> {
  const dataUrl = `data:${mime};base64,${imageBase64}`;
  if (isResponsesAPI) {
    const res = await fetch(`${OPENAI_BASE}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: [{ type: "input_text", text: userPrompt }, { type: "input_image", image_url: dataUrl }] },
        ],
        stream: false,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return typeof data.output_text === "string" ? data.output_text : "";
  }
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: [{ type: "text", text: userPrompt }, { type: "image_url", image_url: { url: dataUrl } }] },
      ],
      temperature: 0.3,
      max_tokens: 800,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** Vision-вызов с несколькими изображениями (цикл самопроверки по скриншотам). */
async function callVisionMultiOnce(
  provider: string,
  anthropicKey: string | undefined,
  openaiKey: string | undefined,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  images: { data: string; mime: string; label: string }[],
): Promise<string> {
  if (provider === "anthropic") {
    const content = [
      ...images.map((img) => ({ type: "image", source: { type: "base64", media_type: img.mime, data: img.data } })),
      { type: "text", text: userPrompt },
    ];
    const res = await fetch(`${ANTHROPIC_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": anthropicKey!, "anthropic-version": ANTHROPIC_VERSION },
      body: JSON.stringify({ model, max_tokens: 4000, system: systemPrompt, messages: [{ role: "user", content }] }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return (data.content || []).filter((p: { type?: string }) => p?.type === "text").map((p: { text?: string }) => p.text || "").join("");
  }
  const content = [
    { type: "text", text: userPrompt },
    ...images.map((img) => ({ type: "image_url", image_url: { url: `data:${img.mime};base64,${img.data}` } })),
  ];
  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
    body: JSON.stringify({ model, max_tokens: 4000, messages: [{ role: "system", content: systemPrompt }, { role: "user", content }] }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const clientId = getClientId(request, session.userId);
  const rl = aiLimiter.check(clientId, LIMITS.AI_GENERATE.limit, LIMITS.AI_GENERATE.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  // Провайдер: при наличии ANTHROPIC_API_KEY генерация идёт на Claude
  // (переопределяется AI_PROVIDER=openai|anthropic).
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const provider = process.env.AI_PROVIDER === "openai" ? "openai"
    : process.env.AI_PROVIDER === "anthropic" || anthropicKey ? "anthropic"
    : "openai";
  if (provider === "anthropic" && !anthropicKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }
  if (provider === "openai" && !openaiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { brief, scrapedData } = body as { brief: string; scrapedData?: ScrapedSiteData };
  const mode: GenerationMode = body.mode === "story" ? "story" : "classic";
  const wantHiggs = body.media === "higgsfield";
  if (!brief) return NextResponse.json({ error: "Missing brief" }, { status: 400 });

  const model = provider === "anthropic"
    ? process.env.ANTHROPIC_MODEL || "claude-sonnet-5"
    : process.env.OPENAI_MODEL || "gpt-4o";
  const isResponsesAPI = model.startsWith("gpt-5");

  const callText = (sys: string, usr: string) =>
    provider === "anthropic"
      ? callClaudeOnce(anthropicKey!, model, sys, usr)
      : callModelOnce(openaiKey!, model, isResponsesAPI, sys, usr);
  const callVision = (sys: string, usr: string, img: string, mime: string) =>
    provider === "anthropic"
      ? callClaudeVisionOnce(anthropicKey!, model, sys, usr, img, mime)
      : callVisionOnce(openaiKey!, model, isResponsesAPI, sys, usr, img, mime);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      const keepAlive = setInterval(() => {
        try { controller.enqueue(encoder.encode(": keep-alive\n\n")); } catch {}
      }, 15000);

      try {
        // ── Stage A: арт-дирекшн ──
        send({ stage: "art-direction" });
        const adRaw = await callText(
          "Ты — арт-директор премиум веб-студии. Отвечай только валидным JSON.",
          buildArtDirectionPrompt(brief, scrapedData, mode),
        );
        const ad = parseArtDirection(adRaw);
        if (!ad) throw new Error("Арт-дирекшн не удался");
        send({ stage: "art-direction-done", concept: ad.concept, stylePack: ad.stylePackId });

        const scrapedCtx = scrapedData ? renderScrapedContext(scrapedData, true) : undefined;

        // ── Stage B1: выбор блоков (модель видит только обзор каталога) ──
        send({ stage: "selecting-blocks" });
        const selectionRaw = await callText(
          "Ты — арт-директор. Выбирай блоки из каталога. Отвечай только JSON.",
          buildSelectionPrompt(brief, ad, scrapedCtx, mode),
        );
        const presetIds = parseSelection(selectionRaw);
        if (!presetIds) throw new Error("Не удалось подобрать блоки");
        send({ stage: "blocks-selected", count: presetIds.length });

        // ── Stage B2: контент (модель видит схемы только выбранных блоков) ──
        send({ stage: "writing-content" });
        const contentRaw = await callText(
          "Ты — копирайтер. Заполняй поля блоков конкретикой из брифа. Отвечай только JSON.",
          buildContentPrompt(brief, ad, presetIds, scrapedCtx),
        );
        const manifest = parseContentManifest(contentRaw, presetIds);
        if (!manifest) throw new Error("Не удалось заполнить контент");

        // ── Медиа-конвейер: сайт собран → знаем слоты → генерим кадры и видео,
        //    палитру определяем ПОСЛЕ медиа из готового hero-кадра ──
        if (wantHiggs && (await higsAvailable())) {
          send({ stage: "generating-media", concept: "Генерация кадров Higgsfield…" });
          try {
            const media = await runMediaPipeline(brief, ad, manifest, session.userId!, {
              callModel: callText,
              callVision,
              progress: (info) => {
                const label =
                  info.phase === "media-plan" ? "Пишу промпты кадров"
                  : info.phase === "media-images" ? `Кадры: ${info.done ?? 0}/${info.total ?? 0}`
                  : info.phase === "media-cutouts" ? `Вырезаю объекты: ${info.done ?? 0}/${info.total ?? 0}`
                  : info.phase === "media-chain-frames" ? `Hero-цепочка, кадр ${(info.done ?? 0) + 1}/${info.total ?? 0}`
                  : info.phase === "media-videos" ? `Видео: ${info.done ?? 0}/${info.total ?? 0}`
                  : info.phase === "media-upscale" ? `Апскейл hero: ${(info.done ?? 0) + 1}/${info.total ?? 0}`
                  : "Палитра из hero-кадра";
                send({ stage: "generating-media", concept: label });
              },
            });
            if (media.palette) ad.palette = media.palette;
            // story-poster без своего видео = дефолтный сток-ролик, он хуже отсутствия блока
            if (!media.heroVideoApplied) {
              const idx = manifest.findIndex((b) => b.presetId === "story-poster-01");
              if (idx !== -1) {
                manifest.splice(idx, 1);
                console.warn("[generate] hero-видео не собралось — story-poster-01 убран из сайта");
              }
            }
            send({ stage: "media-done", images: media.imagesDone, videos: media.videosDone });
          } catch (err) {
            console.error("[generate] медиа-конвейер упал, продолжаю со стоком:", err);
          }
        }

        // ── Сборка документа ──
        send({ stage: "finalizing" });
        const name = brief.slice(0, 60).replace(/[^a-zA-Zа-яёА-ЯЁ0-9 ]/g, "").trim() || "AI-сайт";
        let doc = buildDocumentFromManifest(name, manifest, ad, mode);

        // ── Bespoke-hero: авторский код секции под бренд (story-режим) ──
        if (mode === "story" && process.env.BESPOKE !== "off") {
          send({ stage: "bespoke", concept: "Пишу авторский hero под бренд…" });
          try {
            const b = await applyBespokeHero(doc, ad, brief, callText);
            doc = b.doc;
            if (b.applied) send({ stage: "bespoke", concept: "Авторский hero готов" });
          } catch (err) {
            console.error("[generate] bespoke упал, остаётся пресетный hero:", err);
          }
        }

        // ── Цикл самопроверки: скриншоты → критика → правки ──
        if (process.env.REVIEW_LOOP !== "off") {
          try {
            const review = await runReviewLoop(doc, ad, {
              callVisionMulti: (sys, usr, imgs) => callVisionMultiOnce(provider, anthropicKey, openaiKey, model, sys, usr, imgs),
              progress: (round, note) => send({ stage: "reviewing", concept: `Самопроверка ${round}/2: ${note}` }),
            });
            doc = review.doc;
            if (review.reports.length) {
              const last = review.reports[review.reports.length - 1];
              send({ stage: "reviewing", concept: `Ревью: ${last.score}/10, правок ${review.reports.reduce((s, r) => s + r.applied, 0)}` });
            }
          } catch (err) {
            console.error("[generate] цикл самопроверки упал:", err);
          }
        }

        let projectId: number | null = null;
        try {
          const slug = slugify(name) || "ai-site";
          const project = await prisma.project.create({
            data: {
              userId: session.userId!,
              name,
              slug: `${slug}-${Date.now().toString(36)}`,
              document: doc as never,
            },
          });
          projectId = project.id;
        } catch {}

        send({ stage: "done", projectId, document: doc, mode: "document" });
      } catch (err) {
        send({ stage: "error", error: String(err) });
      }

      clearInterval(keepAlive);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
