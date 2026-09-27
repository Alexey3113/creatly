import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendToTelegram, formatLeadMessage } from "@/lib/integrations/telegram";
import { sendLeadEmail } from "@/lib/integrations/email";
import { apiLimiter, getClientId, LIMITS, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const clientId = getClientId(request);
  const rl = apiLimiter.check(clientId, LIMITS.LEAD_SUBMIT.limit, LIMITS.LEAD_SUBMIT.window);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  try {
    const body = await request.json();
    const { projectId, fields, source } = body as {
      projectId: number;
      fields: Record<string, string>;
      source?: string;
    };

    if (!projectId || !fields || typeof fields !== "object") {
      return NextResponse.json(
        { error: "projectId and fields are required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { user: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Store the lead
    const lead = await prisma.lead.create({
      data: {
        projectId: project.id,
        data: fields,
        source: source || null,
      },
    });

    const { telegramBotToken, telegramChatId, email } = project.user;

    // Send to Telegram if configured
    let telegramSent = false;
    if (telegramBotToken && telegramChatId) {
      const message = formatLeadMessage(fields, project.name);
      telegramSent = await sendToTelegram(telegramBotToken, telegramChatId, message);
    }

    // Send email notification if user has email and Resend is configured
    let emailSent = false;
    if (email) {
      emailSent = await sendLeadEmail(email, fields, project.name, source);
    }

    return NextResponse.json(
      { ok: true, leadId: lead.id, telegramSent, emailSent },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/lead] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
