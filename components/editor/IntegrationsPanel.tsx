"use client";

import { useState, useEffect } from "react";

interface TelegramSettings {
  botToken: string;
  chatId: string;
  connected: boolean;
}

export function IntegrationsPanel() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "testing" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStatus("loading");
    fetch("/api/integrations/telegram")
      .then((r) => r.json())
      .then((data: TelegramSettings) => {
        setBotToken(data.botToken);
        setChatId(data.chatId);
        setConnected(data.connected);
        setStatus("idle");
      })
      .catch(() => {
        setStatus("idle");
      });
  }, []);

  async function handleTest() {
    if (!botToken || !chatId) {
      setMessage("Введите токен бота и Chat ID");
      setStatus("error");
      return;
    }
    setStatus("testing");
    setMessage("");
    try {
      const res = await fetch("/api/integrations/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken, chatId, test: true }),
      });
      const data = await res.json();
      if (data.ok) {
        setMessage("Тестовое сообщение отправлено!");
        setStatus("success");
      } else {
        setMessage("Ошибка отправки. Проверьте токен и Chat ID.");
        setStatus("error");
      }
    } catch {
      setMessage("Ошибка сети");
      setStatus("error");
    }
  }

  async function handleSave() {
    if (!botToken || !chatId) {
      setMessage("Введите токен бота и Chat ID");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/integrations/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken, chatId }),
      });
      const data = await res.json();
      if (data.ok) {
        setConnected(true);
        setMessage("Настройки сохранены!");
        setStatus("success");
      } else {
        setMessage(data.error || "Ошибка сохранения");
        setStatus("error");
      }
    } catch {
      setMessage("Ошибка сети");
      setStatus("error");
    }
  }

  return (
    <div className="inspector-form">
      <div className="ins-field" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span
          className="status-dot"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            display: "inline-block",
            background: connected ? "#22c55e" : "#9ca3af",
          }}
        />
        <span style={{ fontSize: 13, color: connected ? "#22c55e" : "#9ca3af" }}>
          {connected ? "Подключено" : "Не подключено"}
        </span>
      </div>

      <label>
        <span>Bot Token</span>
        <input
          type="text"
          value={botToken}
          onChange={(e) => setBotToken(e.target.value)}
          placeholder="123456:ABC-DEF..."
        />
      </label>

      <label>
        <span>Chat ID</span>
        <input
          type="text"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          placeholder="-1001234567890"
        />
      </label>

      <small className="ins-hint" style={{ display: "block", marginBottom: 12 }}>
        Создайте бота через @BotFather, получите токен. Chat ID можно узнать через @userinfobot.
      </small>

      <div className="ins-row" style={{ gap: 8 }}>
        <button
          type="button"
          className="ins-toggle"
          onClick={handleTest}
          disabled={status === "testing" || status === "saving"}
        >
          {status === "testing" ? "..." : "Тест"}
        </button>
        <button
          type="button"
          className="ins-toggle is-active"
          onClick={handleSave}
          disabled={status === "testing" || status === "saving"}
          style={{ flex: 1 }}
        >
          {status === "saving" ? "..." : "Сохранить"}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: 8,
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            background: status === "error" ? "#fef2f2" : "#f0fdf4",
            color: status === "error" ? "#dc2626" : "#16a34a",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
