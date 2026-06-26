import { NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt, parseGeneratedCode, type ScrapedSiteData } from "@/lib/ai/prompts";
import { buildArtDirectionPrompt, parseArtDirection, renderArtDirectionForCodegen } from "@/lib/ai/art-direction";
import { loadTemplateCode, loadTemplateFrames } from "@/lib/ai/template-context";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const OPENAI_BASE = "https://api.openai.com/v1";

/**
 * Одиночный не-стриминговый вызов модели. Поддерживает обе формы API
 * (responses для gpt-5* и chat completions). Используется для этапа
 * арт-дирекшна (stage A) — короткий, быстрый, без стрима.
 */
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
    // Раскладываем output[].content[].text
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
      temperature: 0.85,
      max_tokens: 2000,
    }),
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { brief, templateId, scrapedData } = body as { brief: string; templateId?: string; scrapedData?: ScrapedSiteData };

  if (!brief) {
    return NextResponse.json({ error: "Missing brief" }, { status: 400 });
  }

  // templateId опционален: без него генерируем «с нуля» (арт-дирекшн ведёт дизайн).
  const useTemplate = Boolean(templateId && templateId !== "none");
  const template = useTemplate ? await loadTemplateCode(templateId!) : { html: "", css: "", js: "" };
  const frames = useTemplate ? await loadTemplateFrames(templateId!) : [];
  const model = process.env.OPENAI_MODEL || "gpt-5.5";
  const isResponsesAPI = model.startsWith("gpt-5");
  // Премиум-сайт с переходами/адаптивом легко превышает старый потолок 16k.
  // Поднимаем и делаем настраиваемым через env.
  const maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 32000;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        // ===== STAGE A: Арт-дирекшн =====
        // Модель сначала принимает дизайн-решения (концепция, палитра, типопара,
        // секции, переходы), и только потом пишет код по утверждённому брифу.
        send({ stage: "art-direction" });
        let artDirectionText: string | undefined;
        let conceptLabel: string | undefined;
        try {
          const adRaw = await callModelOnce(
            apiKey,
            model,
            isResponsesAPI,
            "Ты — арт-директор премиум веб-студии. Отвечай только валидным JSON.",
            buildArtDirectionPrompt(brief, scrapedData),
          );
          const ad = parseArtDirection(adRaw);
          if (ad) {
            artDirectionText = renderArtDirectionForCodegen(ad);
            conceptLabel = ad.concept;
            send({ stage: "art-direction-done", concept: ad.concept, stylePack: ad.stylePackId });
          }
        } catch {
          // Если этап А упал — продолжаем без него (graceful fallback на одностадийную генерацию)
        }

        // ===== STAGE B: Генерация кода =====
        send({ stage: "generating", concept: conceptLabel });

        const systemPrompt = buildSystemPrompt(template.html, template.css, template.js, artDirectionText);
        const userPrompt = buildUserPrompt(brief, scrapedData, Boolean(artDirectionText));

        let fullResponse = "";

        if (isResponsesAPI) {
          const inputMessages: Array<Record<string, unknown>> = [
            { role: "system", content: systemPrompt },
          ];

          const userContent: Array<Record<string, unknown>> = [
            { type: "input_text", text: userPrompt },
          ];

          for (const frame of frames) {
            userContent.push({
              type: "input_image",
              image_url: frame,
              detail: "low",
            });
          }

          inputMessages.push({ role: "user", content: userContent });

          const response = await fetch(`${OPENAI_BASE}/responses`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
              model,
              input: inputMessages,
              max_output_tokens: maxTokens,
              stream: true,
            }),
          });

          if (!response.ok) {
            const err = await response.text();
            send({ stage: "error", error: `API error: ${err}` });
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) { controller.close(); return; }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.type === "response.output_text.delta" ? parsed.delta : null;
                if (delta) {
                  fullResponse += delta;
                  send({ stage: "generating", chunk: delta });
                }
              } catch {}
            }
          }
        } else {
          type ContentPart = { type: "text"; text: string } | { type: "image_url"; image_url: { url: string; detail: string } };
          const userContent: ContentPart[] = [{ type: "text", text: userPrompt }];
          for (const frame of frames) {
            userContent.push({ type: "image_url", image_url: { url: frame, detail: "low" } });
          }

          const response = await fetch(`${OPENAI_BASE}/chat/completions`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
              ],
              max_tokens: maxTokens,
              temperature: 0.7,
              stream: true,
            }),
          });

          if (!response.ok) {
            const err = await response.text();
            send({ stage: "error", error: err });
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) { controller.close(); return; }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullResponse += delta;
                  send({ stage: "generating", chunk: delta });
                }
              } catch {}
            }
          }
        }

        send({ stage: "finalizing" });

        const result = parseGeneratedCode(fullResponse);

        if (!result.html) {
          send({ stage: "error", error: "Не удалось распарсить ответ AI" });
        } else {
          send({ stage: "done", result });
        }
      } catch (err) {
        send({ stage: "error", error: String(err) });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
