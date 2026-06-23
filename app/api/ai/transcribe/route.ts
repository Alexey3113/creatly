import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { aiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const clientId = getClientId(request, session.userId);
  const rl = aiLimiter.check(clientId, LIMITS.AI_TRANSCRIBE.limit, LIMITS.AI_TRANSCRIBE.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const audio = formData.get("audio") as File | null;
  if (!audio) {
    return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
  }

  const whisperForm = new FormData();
  whisperForm.append("file", audio, "recording.webm");
  whisperForm.append("model", "whisper-1");
  whisperForm.append("language", "ru");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: whisperForm,
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: `Whisper error: ${err}` }, { status: 502 });
  }

  const data = await response.json();
  return NextResponse.json({ text: data.text });
}
