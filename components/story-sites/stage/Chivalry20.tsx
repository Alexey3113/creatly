"use client";
/* STORY v2 · САЙТ 18 — «CHIVALRY» (pin20: crimson/black готик, вуаль+шипастая корона+красный лес).
   Архетипы (де-шаблонизировано): Occluded Idol → Ritual Halo → Tunnel Zoom → Diptych(раскол,wipe-x) → Triptych(алтарь) → Oath(гербовый щит). */
import Link from "next/link";
import { Layer, SceneMedia } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./chivalry20.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function Chivalry20() {
  return (
    <div className="cv-site">
      <header className="cv-head">
        <Link href="/story2" className="cv-brand">✝ CHIVALRY</Link>
        <nav className="cv-nav" aria-label="Навигация">
          <a href="#" onClick={stop}>Honor</a>
          <a href="#" onClick={stop}>Valor</a>
          <a href="#" onClick={stop} className="cv-cta">Kneel</a>
        </nav>
      </header>

      <StageDeck>
        {/* 0 · OCCLUDED IDOL — вордмарк ЗА вырезанной венценосной фигурой */}
        <div transition="iris" className="scene-body cv-cover">
          <div className="cv-cover-bg" aria-hidden />
          <Layer z={0} depth={0.4} phase={[0, 1]} from={{ scale: 1.16, opacity: 0.5 }} to={{ scale: 1.04, opacity: 0.8 }} className="cv-cover-forest kb-media">
            <SceneMedia src={`${A}/chivalry-hero.jpg`} alt="" />
          </Layer>
          <Layer z={1} depth={0.05} phase={[0, 0.9]} from={{ scale: 1.06, opacity: 0 }} to={{ scale: 1, opacity: 1 }} className="cv-wordmark"><span aria-hidden>CHIVALRY</span></Layer>
          <Layer z={3} depth={0.18} phase={[0, 1]} from={{ y: "5vh", scale: 1.06 }} to={{ y: "0vh", scale: 1 }} className="cv-cover-fig">
            <SceneMedia src={`${A}/chivalry-hero-cut.png`} alt="Венценосная фигура в вуали — багряная корона из терния" />
          </Layer>
          <div className="cv-cover-glow" aria-hidden />
          <div className="cv-orn" aria-hidden>
            <span className="cv-orn-l">✝ where honor reigns</span>
            <span className="cv-orn-r">valor thrives ✝</span>
            <span className="cv-orn-yr">MMXXVI · director</span>
          </div>
          <Layer z={6} depth={0.3} phase={[0.1, 0.7]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cv-cover-hi">
            <span className="cv-eyebrow">age of chivalry · where honor reigns</span>
            <p>Багряная корона из терния, вуаль как дым осеннего леса. Эпоха, где честь — единственный закон, а доблесть — единственная молитва.</p>
          </Layer>
          <div className="cv-grain" aria-hidden />
          <div className="cv-scrollcue" aria-hidden>kneel ↓</div>
        </div>

        {/* 1 · RITUAL HALO */}
        <div transition="drop" className="scene-body cv-halo">
          <div className="cv-halo-bg" aria-hidden />
          <Layer z={2} depth={0.1} phase={[0, 1]} from={{ scale: 1.1 }} to={{ scale: 1.02 }} className="cv-halo-fig kb-media">
            <SceneMedia src={`${A}/chivalry-portrait-b.jpg`} alt="Профиль венценосной фигуры" />
          </Layer>
          <div className="cv-halo-ring" aria-hidden />
          <div className="cv-halo-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.08, 0.7]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="cv-halo-cap">
            <span className="cv-folio">canto I · the crown</span>
            <h2>Crown of <em>thorns</em></h2>
            <p>Корона из шипов — не власть, а обет. Кто носит её, клянётся честью до последнего вздоха и последней капли.</p>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 2 · TUNNEL ZOOM */}
        <div transition="zoom" className="scene-body cv-tunnel">
          <Layer z={1} depth={0.12} phase={[0, 1]} from={{ scale: 1.22 }} to={{ scale: 1.03 }} className="cv-tunnel-fig kb-media">
            <SceneMedia src={`${A}/chivalry-hero.jpg`} alt="Крупно — корона и вуаль" />
          </Layer>
          <div className="cv-tunnel-veil" aria-hidden />
          <div className="cv-tunnel-huge" aria-hidden>✝</div>
          <Layer z={6} depth={0.24} phase={[0.06, 0.6]} from={{ opacity: 0, scale: 1.1 }} to={{ opacity: 1, scale: 1 }} className="cv-tunnel-cap">
            <span className="cv-folio">valor thrives</span>
            <p>Красный лес шепчет имена павших. Доблесть не громка — она в том, чтобы стоять, когда всё вокруг обращается в багрянец.</p>
            <span className="cv-meta">honor · valor · MMXXVI</span>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 3 · DIPTYCH — жёсткий раскол 50/50: кадр слева, багряная панель-подпись справа (слом клон-макро) */}
        <div transition="wipe-x" className="scene-body cv-dip">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.12 }} to={{ scale: 1.03 }} className="cv-dip-fig kb-media">
            <SceneMedia src={`${A}/chivalry-still-1.jpg`} alt="Шипастая корона — деталь" />
          </Layer>
          <Layer z={6} depth={0.16} phase={[0.04, 0.7]} from={{ x: "40px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="cv-dip-panel">
            <span className="cv-dip-mark" aria-hidden>♛ relic · crown</span>
            <h3>Iron thorns</h3>
            <p>Шипы из чёрного железа, венчанные красным светом. Корона, что ранит носящего — цена чести всегда в крови.</p>
            <span className="cv-dip-meta" aria-hidden>honor · valor · MMXXVI</span>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 4 · TRIPTYCH — алтарь: тондо-крест + 3 арочные панели (не сетка) */}
        <div transition="drop" className="scene-body cv-tript">
          <div className="cv-tript-bg" aria-hidden />
          <div className="cv-tript-head" aria-hidden><b>The Order</b><span>honor · valor · MMXXVI</span></div>
          <figure className="cv-tondo"><img src={`${A}/chivalry-still-2.jpg`} alt="Красный лес" loading="lazy" /><figcaption>✝</figcaption></figure>
          <div className="cv-tript-panels">
            <figure className="cv-panel cv-panel-1"><img src={`${A}/chivalry-extra-3.jpg`} alt="Орден" loading="lazy" /><figcaption>i · honor</figcaption></figure>
            <figure className="cv-panel cv-panel-2"><img src={`${A}/chivalry-extra-1.jpg`} alt="Панорама" loading="lazy" /><figcaption>ii · valor</figcaption></figure>
            <figure className="cv-panel cv-panel-3"><img src={`${A}/chivalry-extra-2.jpg`} alt="Деталь" loading="lazy" /><figcaption>iii · crown</figcaption></figure>
          </div>
          <div className="cv-tript-code" aria-hidden>where honor reigns, valor thrives — until the last crimson leaf falls</div>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 5 · OATH — гербовый щит слева + клятва справа (не центр-слоган+кнопка) */}
        <div transition="smash" className="scene-body cv-oath">
          <div className="cv-oath-bg" aria-hidden />
          <div className="cv-oath-crest" aria-hidden><span className="cv-shield" /><span className="cv-shield-mark">✝</span></div>
          <div className="cv-oath-block">
            <span className="cv-oath-label">the order awaits</span>
            <h4>Swear your honor</h4>
            <p>Багряная корона ждёт того, кто клянётся честью до последнего вздоха. Преклони колено — и восстань рыцарем.</p>
            <a href="#" onClick={stop} className="cv-btn">Take the oath ✝</a>
            <div className="cv-links"><a href="#" onClick={stop}>The Order</a><a href="#" onClick={stop}>Codex</a><a href="#" onClick={stop}>MMXXVI</a></div>
          </div>
          <div className="cv-grain" aria-hidden />
        </div>
      </StageDeck>
    </div>
  );
}
