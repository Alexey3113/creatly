import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Укажите email получателя" }, { status: 400 });
  }

  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Проект не найден" }, { status: 404 });

  const recipient = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (!recipient) {
    return NextResponse.json({ error: "Пользователь с таким email не найден" }, { status: 404 });
  }

  if (recipient.id === session.userId) {
    return NextResponse.json({ error: "Нельзя передать проект самому себе" }, { status: 400 });
  }

  const existing = await prisma.transferRequest.findFirst({
    where: { projectId: project.id, status: "pending" },
  });
  if (existing) {
    return NextResponse.json({ error: "Запрос на передачу уже отправлен" }, { status: 409 });
  }

  const transfer = await prisma.transferRequest.create({
    data: {
      projectId: project.id,
      fromId: session.userId,
      toId: recipient.id,
    },
  });

  return NextResponse.json({ transfer: { id: transfer.id } }, { status: 201 });
}
