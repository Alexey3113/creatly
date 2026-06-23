"use client";

import { useEffect, useRef, useState } from "react";

interface LoginScreenProps {
  botUsername: string;
  onLogin: (user: { id: number; username: string; firstName: string }) => void;
}

export function LoginScreen({ botUsername, onLogin }: LoginScreenProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [authTab, setAuthTab] = useState<"email" | "telegram">("email");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    if (authTab !== "telegram" || !widgetRef.current) return;

    (window as unknown as Record<string, unknown>).onTelegramAuth = async (tgUser: Record<string, unknown>) => {
      const res = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tgUser),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data.user);
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    widgetRef.current.innerHTML = "";
    widgetRef.current.appendChild(script);
  }, [botUsername, onLogin, authTab]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (isRegister && password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body: Record<string, string> = { email, password };
      if (isRegister && firstName) body.firstName = firstName;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "__ACCESS_RESTRICTED__") {
          setRestricted(true);
          return;
        }
        setError(data.error || "Произошла ошибка");
        return;
      }
      onLogin(data.user);
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <style>{`
        .login-tabs {
          display: flex; gap: 4px; margin-bottom: 24px;
          background: rgba(255,255,255,.05); border-radius: 10px; padding: 4px;
        }
        .login-tab {
          flex: 1; padding: 10px 16px; border: none; border-radius: 8px;
          background: transparent; color: #64748b; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .2s;
        }
        .login-tab--active {
          background: rgba(99,102,241,.2); color: #a5b4fc;
        }
        .login-tab:hover:not(.login-tab--active) {
          color: #94a3b8;
        }
        .login-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .login-input {
          width: 100%; padding: 12px 16px; border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; background: rgba(255,255,255,.05); color: #e2e8f0;
          font-size: 15px; outline: none; transition: border-color .2s;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: #475569; }
        .login-input:focus { border-color: #6366f1; }
        .login-submit {
          width: 100%; padding: 12px; border: none; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff;
          font-size: 15px; font-weight: 600; cursor: pointer; transition: all .2s;
          box-shadow: 0 4px 16px rgba(99,102,241,.3);
        }
        .login-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(99,102,241,.4); }
        .login-submit:disabled { opacity: .6; cursor: not-allowed; }
        .login-error {
          color: #f87171; font-size: 13px; text-align: center;
          padding: 8px 12px; background: rgba(248,113,113,.1);
          border-radius: 8px; border: 1px solid rgba(248,113,113,.2);
        }
        .login-switch {
          color: #64748b; font-size: 14px; text-align: center; margin-bottom: 24px;
        }
        .login-switch a {
          color: #818cf8; cursor: pointer; text-decoration: none;
        }
        .login-switch a:hover { text-decoration: underline; }
        .login-restricted-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:999;animation:fadeIn .2s}
        .login-restricted{background:#0f1225;border:1px solid rgba(96,165,250,.15);border-radius:20px;padding:36px;max-width:400px;width:90%;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.5);animation:modalIn .25s ease}
        .login-restricted__icon{margin-bottom:16px}
        .login-restricted h3{color:#eaf0f6;font-size:20px;font-weight:700;margin:0 0 10px}
        .login-restricted p{color:#6b7fa0;font-size:14px;line-height:1.6;margin:0 0 8px}
        .login-restricted__contact{color:#94a3b8;font-size:13px;margin-top:16px!important}
        .login-restricted__tg{display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);border-radius:10px;color:#60a5fa;font-size:15px;font-weight:600;text-decoration:none;margin:8px 0 16px;transition:all .2s}
        .login-restricted__tg:hover{background:rgba(59,130,246,.18);transform:translateY(-1px)}
        .login-restricted__close{width:100%;padding:10px;border:1px solid rgba(255,255,255,.08);background:transparent;color:#6b7fa0;border-radius:8px;font-size:13px;cursor:pointer;transition:all .15s}
        .login-restricted__close:hover{background:rgba(255,255,255,.04);color:#eaf0f6}
        @keyframes modalIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:none}}
        @keyframes fadeIn{from{opacity:0}}
      `}</style>
      <div className="login-bg">
        <div className="login-bg__gradient" />
        <div className="login-bg__grid" />
      </div>
      <div className="login-card">
        <a href="/" className="login-logo">
          <img src="/landing/logo.webp" alt="Creatly" width="44" height="44" />
        </a>
        <h1>Creatly</h1>
        <p className="login-subtitle">AI-платформа для запуска бизнеса онлайн.<br />Расскажите о бизнесе — получите сайт за 2 минуты.</p>

        <div className="login-tabs">
          <button
            className={`login-tab ${authTab === "email" ? "login-tab--active" : ""}`}
            onClick={() => setAuthTab("email")}
          >
            Email
          </button>
          <button
            className={`login-tab ${authTab === "telegram" ? "login-tab--active" : ""}`}
            onClick={() => setAuthTab("telegram")}
          >
            Telegram
          </button>
        </div>

        {authTab === "email" && (
          <>
            <form className="login-form" onSubmit={handleEmailSubmit}>
              {isRegister && (
                <input
                  className="login-input"
                  type="text"
                  placeholder="Имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegister && (
                <input
                  className="login-input"
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              {error && <div className="login-error">{error}</div>}
              <button className="login-submit" type="submit" disabled={loading}>
                {loading ? "..." : isRegister ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>
            <div className="login-switch">
              {isRegister ? (
                <>Уже есть аккаунт?{" "}<a onClick={() => { setIsRegister(false); setError(""); }}>Войти</a></>
              ) : (
                <>Нет аккаунта?{" "}<a onClick={() => { setIsRegister(true); setError(""); }}>Зарегистрироваться</a></>
              )}
            </div>
          </>
        )}

        {authTab === "telegram" && (
          <div className="login-widget" ref={widgetRef} />
        )}

        {process.env.NODE_ENV === "development" && (
          <button
            className="login-dev-btn"
            onClick={async () => {
              const res = await fetch("/api/auth/dev-login", { method: "POST" });
              if (res.ok) {
                const data = await res.json();
                onLogin(data.user);
              }
            }}
          >
            Dev Login (localhost)
          </button>
        )}

        <div className="login-features">
          <div className="login-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 2l-3 7h4l-5 9 2-7H7l4-9h2z" fill="#f59e0b" /></svg>
            <div><strong>2 минуты до результата</strong><span>AI создаёт сайт по описанию бизнеса</span></div>
          </div>
          <div className="login-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="#6366f1" strokeWidth="1.5" fill="none" /><path d="M6 10h8M10 6v8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <div><strong>Inline-редактирование</strong><span>Кликни и меняй прямо на странице</span></div>
          </div>
          <div className="login-feature">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="#10b981" strokeWidth="1.5" fill="none" /><path d="M10 6v4l3 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <div><strong>Заявки в Telegram</strong><span>Формы отправляют лиды прямо в бот</span></div>
          </div>
        </div>
      </div>

      {restricted && (
        <div className="login-restricted-overlay" onClick={() => setRestricted(false)}>
          <div className="login-restricted" onClick={(e) => e.stopPropagation()}>
            <div className="login-restricted__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h3>Доступ ограничен</h3>
            <p>Creatly сейчас находится в закрытой бета-версии. Регистрация временно доступна только по приглашению.</p>
            <p className="login-restricted__contact">Для получения доступа свяжитесь:</p>
            <a href="https://t.me/leostyle_fe" target="_blank" rel="noopener" className="login-restricted__tg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 4L3.8 11.2c-.8.3-.7 1.4.1 1.6l4.4 1.3 1.7 5.2c.2.7 1.1.8 1.5.2l2.5-3.5 4.7 3.4c.6.4 1.5.1 1.6-.7L21 4z" fill="#60a5fa" /><path d="M8.4 14.1L21 4" stroke="#60a5fa" strokeWidth="1" /></svg>
              @leostyle_fe
            </a>
            <button className="login-restricted__close" onClick={() => setRestricted(false)}>Понятно</button>
          </div>
        </div>
      )}
    </div>
  );
}
