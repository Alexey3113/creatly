"use client";

import { useState } from "react";

interface TransferModalProps {
  projectId: number;
  projectName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function TransferModal({ projectId, projectName, onClose, onSuccess }: TransferModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    const res = await fetch(`/api/projects/${projectId}/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Ошибка отправки");
      return;
    }

    setSent(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="tr-overlay" onClick={onClose}>
        <div className="tr-modal" onClick={(e) => e.stopPropagation()}>
          {sent ? (
            <div className="tr-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              <h3>Запрос отправлен</h3>
              <p>Пользователь получит уведомление в дашборде</p>
            </div>
          ) : (
            <>
              <div className="tr-header">
                <h3>Передать проект</h3>
                <button className="tr-close" type="button" onClick={onClose}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="tr-desc">
                Передать <strong>{projectName}</strong> другому пользователю. После подтверждения проект перейдёт к нему, а у вас будет удалён.
              </p>
              <form onSubmit={handleSubmit}>
                <label className="tr-label">Email получателя</label>
                <input
                  className="tr-input"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
                {error && <p className="tr-error">{error}</p>}
                <div className="tr-actions">
                  <button className="tr-btn tr-btn--ghost" type="button" onClick={onClose}>Отмена</button>
                  <button className="tr-btn tr-btn--primary" type="submit" disabled={loading || !email.trim()}>
                    {loading ? "Отправка..." : "Отправить запрос"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const CSS = `
.tr-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(4px)}
.tr-modal{background:#141418;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;width:420px;max-width:calc(100vw - 32px);box-shadow:0 24px 64px rgba(0,0,0,.5)}
.tr-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.tr-header h3{font-size:18px;font-weight:600;color:#f0f2f5;margin:0}
.tr-close{background:none;border:none;color:#64748b;cursor:pointer;padding:4px;border-radius:6px;display:flex;align-items:center}
.tr-close:hover{color:#e2e8f0;background:rgba(255,255,255,.06)}
.tr-desc{font-size:14px;color:#8090a8;line-height:1.5;margin:0 0 20px}
.tr-desc strong{color:#c8d0dc}
.tr-label{display:block;font-size:12px;font-weight:500;color:#8090a8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.tr-input{width:100%;padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s;box-sizing:border-box}
.tr-input:focus{border-color:rgba(99,102,241,.5)}
.tr-input::placeholder{color:#475569}
.tr-error{font-size:13px;color:#f87171;margin:8px 0 0}
.tr-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}
.tr-btn{padding:8px 18px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:all .15s}
.tr-btn--ghost{background:transparent;color:#8090a8}
.tr-btn--ghost:hover{color:#e2e8f0;background:rgba(255,255,255,.06)}
.tr-btn--primary{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;box-shadow:0 2px 12px rgba(59,130,246,.25)}
.tr-btn--primary:hover{box-shadow:0 4px 20px rgba(59,130,246,.35);transform:translateY(-1px)}
.tr-btn--primary:disabled{opacity:.5;cursor:default;transform:none}
.tr-success{text-align:center;padding:20px 0}
.tr-success h3{font-size:18px;font-weight:600;color:#f0f2f5;margin:12px 0 6px}
.tr-success p{font-size:14px;color:#8090a8;margin:0}
`;
