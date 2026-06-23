"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AICopilotProps {
  onApplyCode: (html: string, css: string) => void;
  projectContext: string;
}

export function AICopilot({ onApplyCode, projectContext }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "Я AI-помощник. Скажите что изменить на сайте — я сгенерирую код. Например:\n• «сделай hero выше»\n• «поменяй цвета на тёплые»\n• «добавь секцию отзывов»" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, context: projectContext }),
      });

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Ошибка подключения к AI. Проверьте OPENAI_API_KEY." }]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message || "Готово!" }]);

      if (data.html || data.css) {
        onApplyCode(data.html || "", data.css || "");
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Не удалось подключиться к серверу." }]);
    }

    setLoading(false);
  }

  return (
    <div className="copilot">
      <div className="copilot__messages" ref={listRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`copilot__msg copilot__msg--${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="copilot__msg copilot__msg--assistant copilot__typing">Думаю...</div>}
      </div>
      <div className="copilot__input-row">
        <input
          className="copilot__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Что изменить на сайте?"
          disabled={loading}
        />
        <button className="copilot__send" type="button" onClick={send} disabled={loading || !input.trim()}>
          ↑
        </button>
      </div>
    </div>
  );
}
