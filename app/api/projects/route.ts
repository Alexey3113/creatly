import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

const RESERVED_SLUGS = new Set([
  "www", "app", "api", "admin", "dashboard", "editor", "auth", "login",
  "register", "mail", "email", "ftp", "ssh", "cdn", "static", "assets",
  "blog", "help", "support", "docs", "status", "billing", "account",
  "settings", "creatly", "test", "demo", "staging", "dev", "prod",
]);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",
        й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",
        у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",
        ь:"",э:"e",ю:"yu",я:"ya",
      };
      return map[c] || c;
    })
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "site";
}

export async function GET() {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { userId: session.userId },
    select: {
      id: true,
      slug: true,
      name: true,
      published: true,
      publishUrl: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, html, css, js, edits, tokens } = body;
  let slug = slugify(body.slug || name || "site");

  if (RESERVED_SLUGS.has(slug)) {
    return NextResponse.json({ error: `Адрес "${slug}" зарезервирован. Выберите другой.` }, { status: 409 });
  }

  const existing = await prisma.project.findFirst({ where: { slug } });

  if (existing && existing.userId === session.userId) {
    const updated = await prisma.project.update({
      where: { id: existing.id },
      data: {
        name: name || slug,
        html: html || "",
        css: css || "",
        js: js || "",
        edits: edits || [],
        tokens: tokens || {},
      },
    });
    return NextResponse.json({ project: { id: updated.id, slug: updated.slug, name: updated.name } }, { status: 200 });
  }

  if (existing) {
    let newSlug = slug;
    for (let i = 2; i <= 99; i++) {
      newSlug = `${slug}-${i}`;
      if (RESERVED_SLUGS.has(newSlug)) continue;
      const taken = await prisma.project.findFirst({ where: { slug: newSlug } });
      if (!taken) break;
    }
    slug = newSlug;
  }

  const project = await prisma.project.create({
    data: {
      name: name || slug,
      slug,
      html: html || "",
      css: css || "",
      js: js || "",
      edits: edits || [],
      tokens: tokens || {},
      userId: session.userId,
    },
  });

  return NextResponse.json({ project: { id: project.id, slug: project.slug, name: project.name } }, { status: 201 });
}
