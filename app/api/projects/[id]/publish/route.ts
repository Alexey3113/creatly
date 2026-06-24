import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { Client } from "ssh2";
import { getFormHandlerScript } from "@/lib/builder/form-handler";

function getSSHConfig() {
  const host = process.env.VDS_HOST;
  const username = process.env.VDS_USER;
  const password = process.env.VDS_PASSWORD;
  const privateKey = process.env.VDS_PRIVATE_KEY;
  if (!host || !username || (!password && !privateKey)) return null;
  return { host, port: Number(process.env.VDS_PORT) || 22, username, ...(privateKey ? { privateKey } : { password }) };
}

function connectSSH(config: ReturnType<typeof getSSHConfig>): Promise<InstanceType<typeof Client>> {
  const conn = new Client();
  return new Promise((resolve, reject) => {
    conn.on("ready", () => resolve(conn));
    conn.on("error", reject);
    conn.connect(config!);
  });
}

function sshExec(conn: InstanceType<typeof Client>, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);
      let out = "";
      let errOut = "";
      stream.on("data", (data: Buffer) => { out += data.toString(); });
      stream.stderr.on("data", (data: Buffer) => { errOut += data.toString(); });
      stream.on("close", (code: number) => {
        if (code !== 0) reject(new Error(`Exit ${code}: ${errOut || out}`));
        else resolve(out);
      });
    });
  });
}

function sftpWrite(conn: InstanceType<typeof Client>, remotePath: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      const stream = sftp.createWriteStream(remotePath);
      stream.on("close", () => resolve());
      stream.on("error", reject);
      stream.end(content);
    });
  });
}

const DOMAIN = process.env.VDS_DOMAIN || "creatly.ru";
const SITES_ROOT = process.env.VDS_SITES_ROOT || "/var/www/creatly";

const CREATLY_BADGE = `<div style="position:fixed;bottom:16px;right:16px;z-index:9999;pointer-events:auto">
<a href="https://creatly.ru?ref=badge" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:rgba(10,10,20,.85);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#a0aec0;font:500 12px/1 -apple-system,BlinkMacSystemFont,sans-serif;text-decoration:none;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.2)" onmouseover="this.style.color='#e2e8f0';this.style.borderColor='rgba(99,102,241,.3)';this.style.boxShadow='0 4px 20px rgba(99,102,241,.15)'" onmouseout="this.style.color='#a0aec0';this.style.borderColor='rgba(255,255,255,.08)';this.style.boxShadow='0 4px 16px rgba(0,0,0,.2)'">
<svg width="14" height="14" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#6366f1"/><path d="M12 20l6-8h4l-6 8 6 8h-4l-6-8zm10 0l6-8h4l-6 8 6 8h-4l-6-8z" fill="#fff" fill-opacity=".9"/></svg>
Made on Creatly
</a>
</div>`;

function buildFullHtml(html: string, css: string): string {
  if (html.includes("<!doctype") || html.includes("<!DOCTYPE")) {
    return html.replace(
      /<\/head>/i,
      `<link rel="stylesheet" href="styles.css"></head>`,
    ).replace(
      /<\/body>/i,
      `${CREATLY_BADGE}\n<script src="script.js" defer></script></body>`,
    );
  }
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="styles.css">
</head>
<body>
${html}
${CREATLY_BADGE}
<script src="script.js" defer></script>
</body>
</html>`;
}

// ═══ PUBLISH ═══
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
    include: { user: { select: { username: true } } },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sshConfig = getSSHConfig();
  if (!sshConfig) return NextResponse.json({ error: "VDS не настроен" }, { status: 500 });

  const body = await request.json();
  const { html, css, js } = body;

  const subdomain = project.slug;
  const siteDir = `${SITES_ROOT}/${subdomain}`;
  const publishUrl = `https://${subdomain}.${DOMAIN}/`;
  const apiBase = process.env.NEXT_PUBLIC_APP_URL || `https://${DOMAIN}`;

  const formScript = getFormHandlerScript(project.id, apiBase);
  const fullJs = [js, formScript].filter(Boolean).join("\n\n");
  const fullHtml = buildFullHtml(html, css);

  let conn: InstanceType<typeof Client> | null = null;
  try {
    conn = await connectSSH(sshConfig);
    await sshExec(conn, `mkdir -p "${siteDir}"`);
    await sftpWrite(conn, `${siteDir}/index.html`, fullHtml);
    await sftpWrite(conn, `${siteDir}/styles.css`, css || "");
    await sftpWrite(conn, `${siteDir}/script.js`, fullJs);
    conn.end();

    await prisma.project.update({
      where: { id: project.id },
      data: { published: true, publishedAt: new Date(), publishUrl },
    });

    return NextResponse.json({ url: publishUrl, slug: project.slug });
  } catch (err) {
    conn?.end();
    return NextResponse.json({ error: `Ошибка публикации: ${err}` }, { status: 500 });
  }
}

// ═══ UNPUBLISH ═══
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: Number(id), userId: session.userId },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!project.published) return NextResponse.json({ error: "Сайт не опубликован" }, { status: 400 });

  const sshConfig = getSSHConfig();
  if (!sshConfig) return NextResponse.json({ error: "VDS не настроен" }, { status: 500 });

  const siteDir = `${SITES_ROOT}/${project.slug}`;

  let conn: InstanceType<typeof Client> | null = null;
  try {
    conn = await connectSSH(sshConfig);
    await sshExec(conn, `rm -rf "${siteDir}"`);
    conn.end();

    await prisma.project.update({
      where: { id: project.id },
      data: { published: false, publishedAt: null, publishUrl: null },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    conn?.end();
    return NextResponse.json({ error: `Ошибка: ${err}` }, { status: 500 });
  }
}
