import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
  });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ project });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      name: body.name ?? project.name,
      html: body.html ?? project.html,
      css: body.css ?? project.css,
      js: body.js ?? project.js,
      edits: body.edits ?? project.edits,
      tokens: body.tokens ?? project.tokens,
    },
  });

  return NextResponse.json({ project: { id: updated.id, slug: updated.slug, name: updated.name, updatedAt: updated.updatedAt } });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.project.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
