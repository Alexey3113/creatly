"use client";
/* STORY v2 · САЙТ 19 — «JUSTICE» (pin18: black/red+bone, вуаль+корона+факел, script-вордмарк + HUD).
   Архетипы (де-шаблонизировано): Occluded Idol → Tunnel Zoom → Fragment(letterbox,iris) → Type Guillotine → Dossier(улики) → Verdict(консоль). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./justice18.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Justice18() {
  return (
    <div className="js-site">
      <header className="js-head">
        <Link href="/story2" className="js-brand">JUSTICE</Link>
        <nav className="js-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Compass</a>
          <a href="#" onClick={stop}>Torch</a>
          <a href="#" onClick={stop} className="js-cta">Illuminate</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL */}
        <div transition="iris" className="scene-body js-cover">
          <div className="js-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="js-wordmark"><span aria-hidden>Justice</span></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="js-cover-fig">
            <SceneMedia src={`${A}/justice-hero-cut.png`} alt="Justice — вуаль, корона, факел" />
          </Layer>
          <div className="js-hud" aria-hidden>
            <div className="js-hud-panel"><b>MORAL COMPASS</b><span>1. 2. 3. 4. 5. 6.</span><em>◉ DDEXP · sample · date</em></div>
            <span className="js-hud-r">ILLUMINATE<br /><i>by design</i></span>
            <span className="js-hud-bar">▪▪▪ TRX-DURMaC · alternative art · 43 R-04092 0.4</span>
            <span className="js-hud-arr">▷▷</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="js-cover-hi">
            <span className="js-eyebrow">moral compass · illuminate by design</span>
            <h1>Justice</h1>
            <p>Те, кто не могут держать факел, лишь освещают мой путь своими тенями. Свобода — не дар, а огонь, что передаётся из рук в руки.</p>
          </Layer>
          <div className="js-grain" aria-hidden />
          <div className="js-scrollcue" aria-hidden>illuminate ↓</div>
        </div>

        {/* 1 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body js-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.2 }} to={{ scale: 1.03 }} className="js-tunnel-fig kb-media">
            <SceneMedia src={`${A}/justice-portrait-b.jpg`} alt="Justice — с фонарём" />
          </Layer>
          <div className="js-tunnel-veil" aria-hidden />
          <div className="js-tunnel-huge" aria-hidden>✦</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="js-tunnel-cap">
            <span className="js-folio">the torch</span>
            <p>Факел передаётся из поколения в поколение. Правосудие — не памятник, а напоминание: свобода требует вечной бдительности.</p>
            <span className="js-meta">eternal vigilance</span>
          </Layer>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 2 · FRAGMENT — горизонтальная letterbox-полоса по центру, подпись под ней (слом клон-макро) */}
        <div transition="iris" className="scene-body js-frag">
          <div className="js-frag-bg" aria-hidden />
          <div className="js-frag-huge" aria-hidden>◉</div>
          <Layer z={2} depth={0.14} phase={[0.02, 0.9]} from={{ scale: 1.12, opacity: 0 }} to={{ scale: 1.02, opacity: 1 }} className="js-frag-band">
            <SceneMedia src={`${A}/justice-still-1.jpg`} alt="Горящий факел — деталь" />
            <span className="js-frag-tick js-frag-tick-l" aria-hidden>exhibit 01</span>
            <span className="js-frag-tick js-frag-tick-r" aria-hidden>flame · gold</span>
          </Layer>
          <Layer z={6} depth={0.2} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="js-frag-cap">
            <span className="js-folio">relic · the torch</span>
            <h3>The flame</h3>
            <p>Золотой огонь в ладонях. Не для того, чтобы сжечь — чтобы осветить. Мораль — это доктрина того, как сделать себя достойным.</p>
          </Layer>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 3 · TYPE GUILLOTINE */}
        <div transition="wipe-y" className="scene-body js-guillo">
          <div className="js-guillo-bg" aria-hidden />
          <div className="js-guillo-type">
            <KineticText text="ILLUMI" mode="slam" />
            <span className="js-guillo-red"><KineticText text="NATE" mode="slam" start={0.1} /></span>
          </div>
          <div className="js-guillo-row" aria-hidden><span>by design</span><span>·</span><span>moral compass</span></div>
        </div>

        {/* 4 · DOSSIER — досье моральных улик: перекрытые наклонённые карточки (не сетка) */}
        <div transition="drop" className="scene-body js-dossier">
          <div className="js-dossier-bg" aria-hidden />
          <div className="js-dossier-head" aria-hidden><b>Doctrine</b><span>case file · moral compass</span></div>
          <div className="js-dossier-stack">
            <figure className="js-doc js-doc-1"><img src={`${A}/justice-extra-3.jpg`} alt="Улика — компас" loading="lazy" /><figcaption>exhibit i · compass</figcaption></figure>
            <figure className="js-doc js-doc-2"><img src={`${A}/justice-extra-1.jpg`} alt="Улика — свет" loading="lazy" /><figcaption>exhibit ii · light</figcaption></figure>
            <figure className="js-doc js-doc-3"><img src={`${A}/justice-extra-2.jpg`} alt="Улика — факел" loading="lazy" /><figcaption>exhibit iii · torch</figcaption></figure>
            <figure className="js-doc js-doc-4"><img src={`${A}/justice-still-2.jpg`} alt="Улика — корона" loading="lazy" /><figcaption>exhibit iv · crown</figcaption></figure>
          </div>
          <div className="js-dossier-code" aria-hidden>those who cannot hold a torch will only illuminate my path with their shadows</div>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 5 · VERDICT — судебная консоль/интерфейс (не центр-слоган+кнопка) */}
        <div transition="drop" className="scene-body js-verdict">
          <div className="js-verdict-bg" aria-hidden />
          <div className="js-verdict-panel">
            <div className="js-verdict-top" aria-hidden><span>MORAL COMPASS · v.MMXXVI</span><span className="js-verdict-live">◉ ILLUMINATE</span></div>
            <span className="js-verdict-label">— verdict —</span>
            <h4>Illuminate by design</h4>
            <p>Свобода — не дар, а огонь, что передаётся из рук в руки. Те, кто не могут держать факел, лишь освещают мой путь тенями.</p>
            <div className="js-verdict-bar" aria-hidden>▪▪▪ TRX-DURMaC · liberty requires eternal vigilance · R-04092 ▪▪▪</div>
            <div className="js-verdict-cta">
              <a href="#" onClick={stop} className="js-btn">Carry the torch ◉</a>
              <div className="js-links"><a href="#" onClick={stop}>Doctrine</a><a href="#" onClick={stop}>Compass</a><a href="#" onClick={stop}>Design</a></div>
            </div>
          </div>
          <div className="js-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
