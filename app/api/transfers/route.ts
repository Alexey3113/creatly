import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transfers = await prisma.transferRequest.findMany({
    where: { toId: session.userId, status: "pending" },
    include: {
      project: { select: { id: true, name: true, slug: true, publishUrl: true } },
      from: { select: { id: true, username: true, firstName: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ transfers });
}
