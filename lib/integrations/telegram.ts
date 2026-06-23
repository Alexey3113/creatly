const TELEGRAM_API = "https://api.telegram.org";

export async function sendToTelegram(
  botToken: string,
  chatId: string,
  message: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[telegram] sendMessage failed:", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[telegram] sendMessage error:", err);
    return false;
  }
}

export function formatLeadMessage(
  data: Record<string, string>,
  siteName: string,
): string {
  const lines: string[] = [
    `<b>New lead from "${siteName}"</b>`,
    "",
  ];

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      lines.push(`<b>${escapeHtml(key)}:</b> ${escapeHtml(value)}`);
    }
  }

  lines.push("");
  lines.push(`<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>`);

  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
