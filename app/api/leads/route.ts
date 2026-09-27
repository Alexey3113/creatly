import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const projectId = Number(searchParams.get("projectId"));

  if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

  // Verify project belongs to user
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const leads = await prisma.lead.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ leads });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const leadId = Number(searchParams.get("id"));
  const projectId = Number(searchParams.get("projectId"));

  if (!leadId || !projectId) return NextResponse.json({ error: "id and projectId required" }, { status: 400 });

  const project = await prisma.project.findFirst({
    where: { id: projectId, userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.lead.delete({ where: { id: leadId } });
  return NextResponse.json({ ok: true });
}
