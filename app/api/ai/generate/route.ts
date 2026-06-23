import { NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt, parseGeneratedCode } from "@/lib/ai/prompts";
import { loadTemplateCode, loadTemplateFrames } from "@/lib/ai/template-context";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

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
  const { brief, templateId } = body as { brief: string; templateId: string };

  if (!brief || !templateId) {
    return NextResponse.json({ error: "Missing brief or templateId" }, { status: 400 });
  }

  const template = await loadTemplateCode(templateId);
  const frames = await loadTemplateFrames(templateId);
  const model = process.env.OPENAI_MODEL || "gpt-5.5";
  const isResponsesAPI = model.startsWith("gpt-5");

  const systemPrompt = buildSystemPrompt(template.html, template.css, template.js);
  const userPrompt = buildUserPrompt(brief);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "generating" })}\n\n`));

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

          const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
              model,
              input: inputMessages,
              stream: true,
            }),
          });

          if (!response.ok) {
            const err = await response.text();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "error", error: `API error: ${err}` })}\n\n`));
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
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "generating", chunk: delta })}\n\n`));
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

          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
              ],
              max_tokens: 16000,
              temperature: 0.7,
              stream: true,
            }),
          });

          if (!response.ok) {
            const err = await response.text();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "error", error: err })}\n\n`));
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
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "generating", chunk: delta })}\n\n`));
                }
              } catch {}
            }
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "finalizing" })}\n\n`));

        const result = parseGeneratedCode(fullResponse);

        if (!result.html) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "error", error: "Не удалось распарсить ответ AI" })}\n\n`));
        } else {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "done", result })}\n\n`));
        }
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ stage: "error", error: String(err) })}\n\n`));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
