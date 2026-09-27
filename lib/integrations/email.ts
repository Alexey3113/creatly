import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export function formatLeadEmail(fields: Record<string, string>, projectName: string, source?: string): string {
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;white-space:nowrap">${k}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;color:#111;font-size:13px">${v}</td></tr>`)
    .join("");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9f9f9;margin:0;padding:24px">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08)">
  <div style="background:#111;padding:20px 24px">
    <div style="color:#fff;font-size:16px;font-weight:700">Новая заявка с сайта</div>
    <div style="color:#aaa;font-size:13px;margin-top:4px">${projectName}</div>
  </div>
  <table style="width:100%;border-collapse:collapse">
    ${rows}
  </table>
  ${source ? `<div style="padding:12px 16px;background:#f9f9f9;color:#999;font-size:11px">Источник: ${source}</div>` : ""}
  <div style="padding:12px 16px;background:#f9f9f9;border-top:1px solid #f0f0f0;color:#999;font-size:11px">
    Creatly · <a href="https://creatly.ru" style="color:#999">creatly.ru</a>
  </div>
</div>
</body>
</html>`;
}

export async function sendLeadEmail(
  to: string,
  fields: Record<string, string>,
  projectName: string,
  source?: string,
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  try {
    const from = process.env.RESEND_FROM || "Creatly <noreply@creatly.ru>";
    const subject = `Новая заявка с сайта «${projectName}»`;
    await resend.emails.send({ from, to, subject, html: formatLeadEmail(fields, projectName, source) });
    return true;
  } catch (err) {
    console.error("[email] send error:", err);
    return false;
  }
}
