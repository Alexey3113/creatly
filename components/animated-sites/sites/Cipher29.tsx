"use client";
/* ANIMATED · Nº29 — «CIPHER» (класс kinetic-typography, приём typewriter + РЕДКИЙ glitch-акцент).
   Терминальная эстетика secrets-scanner'а. Заголовок печатается по буквам (setInterval в useEffect),
   мигающий блок-курсор. Ровно ОДИН короткий glitch (3 ghost-слоя clip-path+offset, chromatic split),
   разово по завершении печати — НЕ постоянная дрожь. Моно-шрифт JetBrains Mono. Палитра: terminal-black
   + phosphor-green, красный ровно для одной alert-строки. Остальное — CSS от --t/--scroll. Ассетов нет. */
import { useEffect, useRef, useState } from "react";
import { ScrollStage } from "../engine/ScrollStage";
import { Scene } from "../engine/Track";
import "./cipher29.css";

const CMD = "cipher scan --secrets ./prod";
const TITLE = "SECRETS STAY SECRET.";

function useFont() {
  useEffect(() => {
    const id = "gf-jetbrains-mono";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

export function Cipher29() {
  useFont();
  const [cmd, setCmd] = useState("");        // печать команды
  const [title, setTitle] = useState("");    // печать заголовка
  const [phase, setPhase] = useState<"cmd" | "run" | "title" | "done">("cmd");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setCmd(CMD); setTitle(TITLE); setPhase("done"); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let iv = 0;
    // 1) печатаем команду
    let i = 0;
    iv = window.setInterval(() => {
      i++; setCmd(CMD.slice(0, i));
      if (i >= CMD.length) {
        clearInterval(iv);
        setPhase("run");
        // 2) короткая «обработка», затем печать заголовка
        timers.push(setTimeout(() => {
          setPhase("title");
          let j = 0;
          const iv2 = window.setInterval(() => {
            j++; setTitle(TITLE.slice(0, j));
            if (j >= TITLE.length) {
              clearInterval(iv2);
              // 3) РЕДКИЙ glitch — разово по завершении печати
              timers.push(setTimeout(() => {
                setGlitch(true);
                timers.push(setTimeout(() => { setGlitch(false); setPhase("done"); }, 560));
              }, 260));
            }
          }, 62);
          timers.push(setTimeout(() => clearInterval(iv2), 60 * TITLE.length + 4000));
        }, 720));
      }
    }, 52);
    return () => { clearInterval(iv); timers.forEach(clearTimeout); };
  }, []);

  return (
    <ScrollStage className="cp">
      <div className="cp-scanlines" aria-hidden />

      {/* 0 · HERO — терминал: печать команды → лог → печать заголовка → 1 glitch */}
      <Scene className="cp-hero">
        <div className="cp-kick"><span>CIPHER//SEC</span><span>Nº29 · CREATLY / ANIMATED</span></div>

        <div className="cp-term" aria-label="terminal">
          <div className="cp-term-bar" aria-hidden><i /><i /><i /><span>cipher@vault — zsh — 80×24</span></div>
          <div className="cp-term-body">
            <div className="cp-ln"><span className="cp-prompt">cipher@vault:~$</span> <span className="cp-cmd">{cmd}</span>{phase === "cmd" && <span className="cp-caret" />}</div>
            {phase !== "cmd" && <>
              <div className="cp-ln cp-dim">▸ walking tree · 1,204 files · 38 packages</div>
              <div className="cp-ln cp-ok">✓ 0 hardcoded keys &nbsp; ✓ 0 leaked tokens &nbsp; ✓ 0 exposed .env</div>
              <div className="cp-ln cp-ok">✓ vault sealed — sha256 verified</div>
            </>}
          </div>
        </div>

        <h1 className={`cp-h1 ${glitch ? "is-glitch" : ""}`} data-text={title} aria-label={TITLE}>
          {title}{(phase === "title" || phase === "done") && <span className="cp-caret cp-caret-lg" />}
        </h1>
        <p className="cp-tag">A secrets scanner that runs on every commit. Nothing ships until the vault is sealed.</p>
        <div className="cp-cue" aria-hidden>scroll ↓</div>
      </Scene>

      {/* 1 · SCAN LOG — строки лога проявляются по --t, одна alert-строка (единственный красный) */}
      <Scene className="cp-log">
        <div className="cp-log-inner">
          <div className="cp-log-head">$ cipher watch --repo monolith</div>
          {[
            { t: "ok", s: "12,904 commits scanned in the last 30 days" },
            { t: "ok", s: "AWS · Stripe · GitHub · Twilio patterns armed" },
            { t: "ok", s: "pre-push hook installed · 41 developers" },
            { t: "alert", s: "1 exposed token caught → quarantined before push" },
            { t: "ok", s: "mean time-to-block: 40ms" },
          ].map((l, i) => (
            <div key={i} className={`cp-log-ln cp-log-${l.t}`} style={{ ["--d" as string]: i }}>
              <span className="cp-mark">{l.t === "alert" ? "✗" : "✓"}</span>
              <span className="cp-log-txt">{l.s}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 · MANIFEST — крупные моно-утверждения, mask-reveal по --t */}
      <Scene className="cp-manifest">
        <h2 className="cp-mf">
          <span className="cp-line" style={{ ["--d" as string]: 0 }}><i>Every commit.</i></span>
          <span className="cp-line cp-green" style={{ ["--d" as string]: 1 }}><i>Every branch.</i></span>
          <span className="cp-line" style={{ ["--d" as string]: 2 }}><i>Scanned before</i></span>
          <span className="cp-line cp-green" style={{ ["--d" as string]: 3 }}><i>it ever ships.</i></span>
        </h2>
      </Scene>

      {/* 3 · CLOSER — install command + phosphor CTA */}
      <Scene className="cp-end">
        <div className="cp-end-block">
          <div className="cp-install" aria-hidden><span className="cp-prompt">$</span> npm i -g @cipher/cli<span className="cp-caret" /></div>
          <h2 className="cp-end-h">Seal the vault.</h2>
          <a href="#" onClick={(e) => e.preventDefault()} className="cp-btn">Get Cipher →</a>
        </div>
      </Scene>
    </ScrollStage>
  );
}
