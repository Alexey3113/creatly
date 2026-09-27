import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import dns from "dns/promises";

const DOMAIN = process.env.VDS_DOMAIN || "creatly.ru";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id: Number(id), userId: session.userId } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain")?.trim();
  if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 });

  try {
    const records = await dns.resolveCname(domain);
    const points = records.some((r) => r.includes(DOMAIN) || r.endsWith("creatly.ru"));
    if (points) {
      return NextResponse.json({ ok: true, records });
    }
    return NextResponse.json({
      ok: false,
      records,
      hint: `CNAME ведёт на ${records.join(", ")}, а должен вести на ${DOMAIN}`,
    });
  } catch (err: unknown) {
    const isNotFound = err && typeof err === "object" && "code" in err && (err as { code: string }).code === "ENOTFOUND";
    return NextResponse.json({
      ok: false,
      hint: isNotFound
        ? `Домен ${domain} не найден. Добавьте CNAME запись @ → ${DOMAIN} в настройках DNS.`
        : `Нет CNAME записи. Добавьте: @ → ${DOMAIN}`,
    });
  }
}
