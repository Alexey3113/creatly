"use client";
/* STORY v2 · САЙТ 19 — «JUSTICE» (pin18: black/red+bone, вуаль+корона+факел, script-вордмарк + HUD).
   Сквозная архитектура (аудит 2026-09): ПЛАМЯ — единственный источник света и единственный актёр
   (data-share="flame"): огонь в чаше на обложке → лампа у лица → свеча в круглой чаше (iris раскрывается
   из неё) → свет заливает кадр ILLUMINATE → возвращается в чашу на фото досье → финал: она держит огонь.
   Световая дуга от чёрного к тёплому. Героиня возвращается в финале (кольцовка, data-share="hero"). */
import Link from "next/link";
import { Layer } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import { KineticText } from "./KineticText";
import "@/components/parallax-scene/parallax-scene.css";
import "./justice18.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

/** Пламя-актёр: ореол + язычок, всё в % коробки → при перелёте огонь растёт/сжимается без скачка. */
function Flame({ c }: { c: string }) {
  return <span className={`js-flame ${c}`} data-share="flame" aria-hidden><i /></span>;
}

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
        {/* 0 · ОБЛОЖКА — она справа, лицом к слову; огонь в чаше подсвечивает вордмарк снизу */}
        <div transition="push" className="scene-body js-cover">
          <div className="js-cover-bg" aria-hidden />
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ x: "-2vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="js-wordmark"><h1 className="js-wm">Justice</h1></Layer>
          <Layer z={3} depth={0.16} phase={[0, 0.9]} from={{ y: "5vh", scale: 1.04 }} to={{ y: "0vh", scale: 1 }} className="js-cover-fig">
            <div className="js-cut">
              <img className="js-cut-img" src={`${A}/justice-hero-cut.png`} alt="Justice — вуаль, корона, чаша с огнём" draggable={false} />
              <Flame c="js-flame-hero" />
            </div>
          </Layer>
          <div className="js-hud" aria-hidden>
            <div className="js-hud-panel"><b>MORAL COMPASS</b><span>1. 2. 3. 4. 5. 6.</span><em>◉ DDEXP · sample · date</em></div>
            <span className="js-hud-r">ILLUMINATE<br /><i>by design</i></span>
            <span className="js-hud-bar">▪▪▪ TRX-DURMaC · alternative art · 43 R-04092 0.4</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.08, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="js-cover-hi">
            <span className="js-eyebrow">moral compass · illuminate by design</span>
            <p>Те, кто не могут держать факел, лишь освещают мой путь своими тенями. Свобода — не дар, а огонь, что передаётся из рук в руки.</p>
          </Layer>
          <div className="js-grain" aria-hidden />
          <div className="js-scrollcue" aria-hidden>illuminate ↓</div>
        </div>

        {/* 1 · THE TORCH — ближе: огонь у самого лица, свет растёт */}
        <div transition="push" className="scene-body js-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="js-cq">
            <div className="js-plate js-plate-pb js-kb">
              <img className="js-img" src={`${A}/justice-portrait-b.jpg`} alt="Justice — огонь у лица" draggable={false} />
              <Flame c="js-flame-pb" />
            </div>
          </Layer>
          <div className="js-tunnel-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.1, 0.65]} from={{ opacity: 0, x: "-24px" }} to={{ opacity: 1, x: "0px" }} className="js-tunnel-cap">
            <span className="js-folio">the torch</span>
            <p>Факел передаётся из поколения в поколение. Правосудие — не памятник, а напоминание: свобода требует вечной бдительности.</p>
            <span className="js-meta">eternal vigilance</span>
          </Layer>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 2 · THE FLAME — iris раскрывается из круглой чаши; в ней загорается тот же огонь */}
        <div transition="iris" className="scene-body js-frag">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="js-cq">
            <div className="js-plate js-plate-cup js-kb">
              <img className="js-img" src={`${A}/justice-still-1.jpg`} alt="Золотая чаша со свечой в ладонях" draggable={false} />
              <Flame c="js-flame-cup" />
            </div>
          </Layer>
          <div className="js-frag-veil" aria-hidden />
          <Layer z={6} depth={0.2} phase={[0.2, 0.8]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="js-frag-cap">
            <span className="js-folio">relic · the torch</span>
            <h3>The flame</h3>
            <p>Золотой огонь в ладонях. Не для того, чтобы сжечь — чтобы осветить. Мораль — это доктрина того, как сделать себя достойным.</p>
          </Layer>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 3 · ILLUMINATE — огонь вырастает и заливает кадр тёплым светом */}
        <div transition="fade" className="scene-body js-guillo">
          <div className="js-guillo-bg" aria-hidden />
          <Flame c="js-flame-flood" />
          <div className="js-guillo-type">
            <KineticText text="ILLUMI" mode="slam" start={0.35} />
            <span className="js-guillo-red"><KineticText text="NATE" mode="slam" start={0.45} /></span>
          </div>
          <div className="js-guillo-row" aria-hidden><span>by design</span><span>·</span><span>moral compass</span></div>
        </div>

        {/* 4 · DOCTRINE — свет сжимается обратно в чашу на фото досье */}
        <div transition="push" className="scene-body js-dossier">
          <div className="js-dossier-bg" aria-hidden />
          <div className="js-dossier-head" aria-hidden><b>Doctrine</b><span>case file · moral compass</span></div>
          <div className="js-dossier-stack">
            <figure className="js-doc js-doc-1"><img src={`${A}/justice-extra-3.jpg`} alt="Улика — свеча в пути" loading="lazy" /><figcaption>exhibit i · path</figcaption></figure>
            <figure className="js-doc js-doc-2"><img src={`${A}/justice-extra-1.jpg`} alt="Улика — факел" loading="lazy" /><figcaption>exhibit ii · torch</figcaption></figure>
            <figure className="js-doc js-doc-3"><img src={`${A}/justice-extra-2.jpg`} alt="Улика — корона и чаша" loading="lazy" /><figcaption>exhibit iii · crown</figcaption></figure>
            <figure className="js-doc js-doc-4">
              <div className="js-hero-box" data-share="hero"><img src={`${A}/justice-hero.jpg`} alt="Улика — она с огнём" loading="lazy" /></div>
              <Flame c="js-flame-doc" />
              <figcaption>exhibit iv · bearer</figcaption>
            </figure>
          </div>
          <div className="js-dossier-code" aria-hidden>those who cannot hold a torch will only illuminate my path with their shadows</div>
          <div className="js-grain" aria-hidden />
        </div>

        {/* 5 · VERDICT — она возвращается с огнём в руках; самый тёплый кадр */}
        <div transition="fade" className="scene-body js-verdict">
          <div className="js-verdict-bg" aria-hidden />
          <div className="js-verdict-hero">
            <div className="js-hero-box" data-share="hero"><img src={`${A}/justice-hero.jpg`} alt="Justice — она держит огонь" loading="lazy" /></div>
            <Flame c="js-flame-doc" />
          </div>
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
