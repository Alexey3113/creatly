import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const transfer = await prisma.transferRequest.findFirst({
    where: { id: Number(id), toId: session.userId, status: "pending" },
  });
  if (!transfer) return NextResponse.json({ error: "Запрос не найден" }, { status: 404 });

  await prisma.$transaction([
    prisma.project.update({
      where: { id: transfer.projectId },
      data: { userId: session.userId },
    }),
    prisma.transferRequest.update({
      where: { id: transfer.id },
      data: { status: "accepted" },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
