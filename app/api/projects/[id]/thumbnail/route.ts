import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
    select: { html: true, css: true },
  });

  if (!project) return new Response("Not found", { status: 404 });

  const bodyContent = extractBody(project.html || "");

  const html = `<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${project.css || ""}</style>
<style>body{pointer-events:none;overflow:hidden;transform-origin:top left;transform:scale(0.25);margin:0;padding:0}</style>
</head><body>${bodyContent}</body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "private, max-age=60",
    },
  });
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match?.[1] || html;
}
