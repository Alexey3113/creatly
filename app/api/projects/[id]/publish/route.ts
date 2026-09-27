import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { Client } from "ssh2";
import { getFormHandlerScript } from "@/lib/builder/form-handler";
import { isSiteDocument } from "@/lib/site/create";
import { renderPublishHtml } from "@/lib/site/render";

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

function buildNginxConf(domain: string, siteDir: string): string {
  return `server {
    listen 80;
    server_name ${domain};
    root ${siteDir};
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ { expires 30d; add_header Cache-Control "public"; }
}`;
}

const DOMAIN = process.env.VDS_DOMAIN || "creatly.ru";
const SITES_ROOT = process.env.VDS_SITES_ROOT || "/var/www/creatly";

const CREATLY_BADGE = `<div style="position:fixed;bottom:16px;right:16px;z-index:9999;pointer-events:auto">
<a href="https://creatly.ru?ref=badge" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:rgba(10,10,20,.85);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#a0aec0;font:500 12px/1 -apple-system,BlinkMacSystemFont,sans-serif;text-decoration:none;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.2)" onmouseover="this.style.color='#e2e8f0';this.style.borderColor='rgba(99,102,241,.3)';this.style.boxShadow='0 4px 20px rgba(99,102,241,.15)'" onmouseout="this.style.color='#a0aec0';this.style.borderColor='rgba(255,255,255,.08)';this.style.boxShadow='0 4px 16px rgba(0,0,0,.2)'">
<svg width="14" height="14" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#6366f1"/><path d="M12 20l6-8h4l-6 8 6 8h-4l-6-8zm10 0l6-8h4l-6 8 6 8h-4l-6-8z" fill="#fff" fill-opacity=".9"/></svg>
Made on Creatly
</a>
</div>`;

const COOKIE_BANNER_SCRIPT = `<script>
(function(){
  var KEY="creatly_cookie_ok";
  if(localStorage.getItem(KEY))return;
  var b=document.createElement("div");
  b.id="cb-cookie";
  b.style.cssText="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9998;background:rgba(10,10,15,.92);backdrop-filter:blur(12px);color:#e2e8f0;font:500 13px/1.5 -apple-system,BlinkMacSystemFont,sans-serif;padding:14px 20px;border-radius:12px;display:flex;align-items:center;gap:16px;max-width:520px;width:calc(100vw - 40px);box-sizing:border-box;border:1px solid rgba(255,255,255,.08);box-shadow:0 8px 32px rgba(0,0,0,.3)";
  b.innerHTML='<span style="flex:1">Мы используем файлы cookie для улучшения работы сайта.</span><button onclick="document.getElementById(\'cb-cookie\').remove();localStorage.setItem(\'creatly_cookie_ok\',\'1\')" style="background:#fff;color:#111;border:0;border-radius:8px;padding:8px 16px;font:600 13px/1 inherit;cursor:pointer;white-space:nowrap;flex-shrink:0">Принять</button>';
  document.body.appendChild(b);
})();
</script>`;

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

  // Источник правды — document в БД; клиент ничего не присылает.
  await request.json().catch(() => ({}));
  const doc = project.document;
  if (!isSiteDocument(doc)) {
    return NextResponse.json({ error: "Проект пуст — нечего публиковать" }, { status: 400 });
  }

  const settings = doc.settings || {};
  const subdomain = project.slug;
  const siteDir = `${SITES_ROOT}/${subdomain}`;
  const primaryDomain = settings.customDomain && settings.customDomain.trim()
    ? settings.customDomain.trim()
    : `${subdomain}.${DOMAIN}`;
  const publishUrl = `https://${primaryDomain}/`;
  const apiBase = process.env.NEXT_PUBLIC_APP_URL || `https://${DOMAIN}`;

  const formScript = getFormHandlerScript(project.id, apiBase);
  const runtimeScript = formScript;

  let conn: InstanceType<typeof Client> | null = null;
  try {
    conn = await connectSSH(sshConfig);
    await sshExec(conn, `mkdir -p "${siteDir}"`);

    for (const page of doc.pages) {
      // cinematic-runtime теперь включается самим рендерером (renderPage, publish-режим)
      const rendered = renderPublishHtml(doc, page.id, {
        extraHead: settings.analyticsCode || "",
        extraBody: [
          settings.cookieBannerEnabled ? COOKIE_BANNER_SCRIPT : "",
          CREATLY_BADGE,
        ].filter(Boolean).join("\n"),
      });
      const dir = page.isHome ? "" : page.slug.replace(/^\/+|\/+$/g, "");
      const targetDir = dir ? `${siteDir}/${dir}` : siteDir;
      await sshExec(conn, `mkdir -p "${targetDir}"`);
      // Загруженные картинки живут на app-сервере — абсолютизируем URL
      // Медиа живут на app-сервере — абсолютизируем все локальные ссылки
      const html = rendered.html.replace(/(["'(])\/(uploads|assets)\//g, `$1${apiBase}/$2/`);
      await sftpWrite(conn, `${targetDir}/index.html`, html);
      await sftpWrite(conn, `${targetDir}/styles.css`, rendered.css);
      await sftpWrite(conn, `${targetDir}/script.js`, [rendered.js, runtimeScript].filter(Boolean).join("\n\n"));
    }

    // Custom domain: setup nginx vhost if domain provided and different from default
    if (settings.customDomain && settings.customDomain.trim() && sshConfig) {
      const domain = settings.customDomain.trim();
      const nginxConf = buildNginxConf(domain, siteDir);
      const confPath = `/etc/nginx/sites-available/${domain}`;
      const enabledPath = `/etc/nginx/sites-enabled/${domain}`;
      await sftpWrite(conn, confPath, nginxConf);
      await sshExec(conn, `ln -sf "${confPath}" "${enabledPath}" && nginx -t && systemctl reload nginx`).catch(() => {});
      // Issue Let's Encrypt cert (non-blocking, best-effort)
      sshExec(conn, `certbot --nginx -d ${domain} --non-interactive --agree-tos -m admin@creatly.ru --redirect 2>&1 || true`).catch(() => {});
    }
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
