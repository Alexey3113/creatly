"use client";

import { useRef, useState } from "react";
import type { SiteDocument } from "@/lib/site/types";

interface CopilotPanelProps {
  doc: SiteDocument;
  replaceDocument: (doc: SiteDocument) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  errors?: string[];
}

export function CopilotPanel({ doc, replaceDocument }: CopilotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setBusy(true);
    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, document: doc }),
      });
      const data = await res.json();
      if (data.document) replaceDocument(data.document);
      setMessages((m) => [...m, {
        role: "assistant",
        text: data.message || "Готово.",
        errors: Array.isArray(data.errors) && data.errors.length ? data.errors : undefined,
      }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Ошибка сети. Попробуйте ещё раз." }]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight }));
    }
  }

  return (
    <div className="ed2-copilot">
      <style>{COPILOT_CSS}</style>
      <div className="ed2-copilot-list" ref={listRef}>
        {!messages.length && (
          <div className="ed2-empty">
            Опишите, что изменить: «сделай тексты продающими», «добавь блок FAQ»,
            «поменяй акцентный цвет на изумрудный», «добавь ещё два отзыва»…
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`ed2-msg ed2-msg--${m.role}`}>
            {m.text}
            {m.errors && <div className="ed2-msg-errors">Часть операций не применилась: {m.errors.join("; ")}</div>}
          </div>
        ))}
        {busy && <div className="ed2-msg ed2-msg--assistant ed2-msg--busy">Думаю…</div>}
      </div>
      <div className="ed2-copilot-input">
        <textarea
          value={input}
          placeholder="Что изменить на сайте?"
          rows={2}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
        />
        <button className="ed2-btn ed2-btn--primary" onClick={send} disabled={busy || !input.trim()}>→</button>
      </div>
    </div>
  );
}

const COPILOT_CSS = `
.ed2-copilot{display:flex;flex-direction:column;height:100%;min-height:0}
.ed2-copilot-list{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding-bottom:10px}
.ed2-msg{padding:9px 12px;border-radius:11px;font-size:13px;line-height:1.5;max-width:92%}
.ed2-msg--user{align-self:flex-end;background:rgba(99,102,241,.25);color:#e0e7ff}
.ed2-msg--assistant{align-self:flex-start;background:rgba(255,255,255,.05);color:#cbd5e1}
.ed2-msg--busy{opacity:.6;font-style:italic}
.ed2-msg-errors{margin-top:6px;font-size:11px;color:#fca5a5}
.ed2-copilot-input{display:flex;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
.ed2-copilot-input textarea{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;font-size:13px;padding:9px 11px;resize:none;font-family:inherit}
.ed2-copilot-input textarea:focus{outline:none;border-color:rgba(99,102,241,.5)}
`;
