"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

interface ToastItem {
  id: number;
  message: string;
  type: "info" | "success" | "error" | "undo";
  action?: { label: string; onClick: () => void };
  duration: number;
}

interface ToastContextType {
  show: (message: string, opts?: { type?: ToastItem["type"]; action?: ToastItem["action"]; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, opts?: { type?: ToastItem["type"]; action?: ToastItem["action"]; duration?: number }) => {
    const id = ++nextId;
    const toast: ToastItem = {
      id,
      message,
      type: opts?.type || "info",
      action: opts?.action,
      duration: opts?.duration || 4000,
    };
    setToasts((prev) => [...prev.slice(-4), toast]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-container">
        <style>{TOAST_CSS}</style>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, onDismiss]);

  const typeClass = `toast--${toast.type}`;

  return (
    <div className={`toast ${typeClass}`}>
      <div className="toast__icon">
        {toast.type === "success" && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {toast.type === "error" && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        {toast.type === "undo" && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 7h7a3 3 0 110 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {toast.type === "info" && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      </div>
      <span className="toast__msg">{toast.message}</span>
      {toast.action && (
        <button className="toast__action" onClick={() => { toast.action!.onClick(); onDismiss(); }}>
          {toast.action.label}
        </button>
      )}
      <button className="toast__close" onClick={onDismiss}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

const TOAST_CSS = `
.toast-container{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:8px;pointer-events:none;min-width:320px;max-width:480px}
.toast{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;background:rgba(15,20,35,.92);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.08);box-shadow:0 8px 32px rgba(0,0,0,.4);pointer-events:auto;animation:toastIn .3s cubic-bezier(.16,1,.3,1);color:#e2e8f0;font-size:13px;font-weight:500}
.toast--success{border-color:rgba(52,211,153,.2)}.toast--success .toast__icon{color:#34d399}
.toast--error{border-color:rgba(248,113,113,.2)}.toast--error .toast__icon{color:#f87171}
.toast--undo{border-color:rgba(96,165,250,.2)}.toast--undo .toast__icon{color:#60a5fa}
.toast--info .toast__icon{color:#94a3b8}
.toast__msg{flex:1;line-height:1.4}
.toast__action{padding:4px 12px;border:1px solid rgba(96,165,250,.3);background:rgba(96,165,250,.1);color:#60a5fa;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap}
.toast__action:hover{background:rgba(96,165,250,.2)}
.toast__close{padding:4px;border:none;background:transparent;color:#475569;cursor:pointer;border-radius:4px;display:flex;transition:color .15s}
.toast__close:hover{color:#94a3b8}
@keyframes toastIn{from{opacity:0;transform:translateY(12px) scale(.95)}to{opacity:1;transform:none}}
`;
