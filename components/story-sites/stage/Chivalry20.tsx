"use client";
/* STORY v2 · САЙТ 18 — «CHIVALRY» (pin20: crimson/black готик, вуаль+шипастая корона+красный лес).
   Сквозная архитектура (аудит 2026-09): КОРОНА — один непрерывный наезд.
   Обложка: шипы короны пронзают вордмарк (вырезка пиксель-в-пиксель с фото стоит перед буквами).
   S1→S2: фигура-призрак (data-share="figure") растёт в кадр короны и садится ровно на фото — без шторки.
   S2→S3: push в макро «Iron thorns». Дальше КОЛЬЦО (data-share="ring"): ореол вокруг короны → нимб за
   головой → тондо ордена → печать клятвы; герой из тондо возвращается медальоном финала (кольцовка).
   Свет: тёмный лес и светлая фигура → каждая сцена светлее → финал тёплый (золото клятвы). */
import Link from "next/link";
import { Layer } from "@/components/parallax-scene";
import { StageDeck } from "./StageDeck";
import "@/components/parallax-scene/parallax-scene.css";
import "./chivalry20.css";

const A = "/uploads/1/story2";
const stop = (e: React.MouseEvent) => e.preventDefault();

/** Кольцо-ореол: одна коробка (эллипс/круг) — при перелёте эллипс вокруг короны поднимается в круглый нимб. */
function Ring({ c }: { c: string }) {
  return <span className={`cv-ring ${c}`} data-share="ring" aria-hidden><i /></span>;
}

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
        {/* 0 · ОБЛОЖКА — лес темнее, фигура светлее; шипы короны пронзают вордмарк снизу */}
        <div transition="fade" className="scene-body cv-cover">
          <div className="cv-cover-bg" aria-hidden />
          <Layer z={1} depth={0.08} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="cv-cq">
            <div className="cv-plate cv-plate-hero cv-kb"><img className="cv-img cv-forest" src={`${A}/chivalry-hero.jpg`} alt="" draggable={false} /></div>
          </Layer>
          <div className="cv-cover-glow" aria-hidden />
          <Layer z={2} depth={0.05} phase={[0, 0.9]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="cv-wordmark"><span aria-hidden>CHIVALRY</span></Layer>
          <Layer z={3} depth={0.08} phase={[0, 1]} from={{ scale: 1.06 }} to={{ scale: 1 }} className="cv-cq">
            <div className="cv-plate cv-plate-hero cv-kb"><img className="cv-img cv-figure" src={`${A}/chivalry-hero-cut.png`} alt="Венценосная фигура в вуали — багряная корона из терния" draggable={false} data-share="figure" /></div>
          </Layer>
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

        {/* 1 · КОРОНА — тот же кадр ближе: фигура-призрак садится на фото, лес светлеет */}
        <div transition="fade" className="scene-body cv-tunnel">
          <div className="cv-tunnel-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0.5, 1]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="cv-cq">
            <div className="cv-plate cv-plate-crown cv-kb">
              <img className="cv-img cv-lit" src={`${A}/chivalry-hero.jpg`} alt="Крупно — корона из терния над вуалью" draggable={false} />
              <img className="cv-img cv-figure cv-twin" src={`${A}/chivalry-hero-cut.png`} alt="" aria-hidden draggable={false} data-share="figure" />
            </div>
          </Layer>
          <div className="cv-tunnel-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.4, 0.9]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="cv-tunnel-cap">
            <span className="cv-folio">canto I · the crown</span>
            <p>Красный лес шепчет имена павших. Доблесть не громка — она в том, чтобы стоять, когда всё вокруг обращается в багрянец.</p>
            <span className="cv-meta">honor · valor · MMXXVI</span>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 2 · IRON THORNS — наезд в макро короны; вокруг неё загорается кольцо */}
        <div transition="push" className="scene-body cv-dip">
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.05 }} to={{ scale: 1 }} className="cv-cq">
            <div className="cv-plate cv-plate-macro cv-kb">
              <img className="cv-img" src={`${A}/chivalry-still-1.jpg`} alt="Шипастая корона на красных листьях — деталь" draggable={false} />
              <Ring c="cv-ring-crown" />
            </div>
          </Layer>
          <div className="cv-dip-scrim" aria-hidden />
          <Layer z={6} depth={0.16} phase={[0.04, 0.7]} from={{ x: "30px", opacity: 0 }} to={{ x: "0px", opacity: 1 }} className="cv-dip-panel">
            <span className="cv-dip-mark" aria-hidden>♛ relic · crown</span>
            <h3>Iron thorns</h3>
            <p>Шипы из чёрного железа, венчанные красным светом. Корона, что ранит носящего — цена чести всегда в крови.</p>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 3 · CROWN OF THORNS — кольцо поднимается нимбом за головой носящей */}
        <div transition="fade" className="scene-body cv-halo">
          <div className="cv-halo-bg" aria-hidden />
          <Layer z={1} depth={0.1} phase={[0, 1]} from={{ scale: 1.05 }} to={{ scale: 1 }} className="cv-cq">
            <div className="cv-plate cv-plate-pb cv-kb">
              <img className="cv-img" src={`${A}/chivalry-portrait-b.jpg`} alt="Профиль венценосной фигуры" draggable={false} />
              <Ring c="cv-ring-halo" />
            </div>
          </Layer>
          <div className="cv-halo-veil" aria-hidden />
          <Layer z={6} depth={0.24} phase={[0.08, 0.7]} from={{ opacity: 0, y: "3vh" }} to={{ opacity: 1, y: "0vh" }} className="cv-halo-cap">
            <span className="cv-folio">canto II · the vow</span>
            <h2>Crown of <em>thorns</em></h2>
            <p>Корона из шипов — не власть, а обет. Кто носит её, клянётся честью до последнего вздоха и последней капли.</p>
          </Layer>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 4 · THE ORDER — нимб сжимается в тондо ордена; три арки — одна панорама леса */}
        <div transition="fade" className="scene-body cv-tript">
          <div className="cv-tript-bg" aria-hidden />
          <div className="cv-tript-head" aria-hidden><b>The Order</b><span>honor · valor · MMXXVI</span></div>
          <div className="cv-tondo-wrap">
            <div className="cv-seal-box" data-share="hero"><img className="cv-seal" src={`${A}/chivalry-hero.jpg`} alt="Тондо ордена — венценосная" loading="lazy" /></div>
            <Ring c="cv-ring-tondo" />
          </div>
          <div className="cv-tript-panels">
            <figure className="cv-panel cv-panel-1"><div className="cv-pano" style={{ ["--k" as string]: 0 }}><img src={`${A}/chivalry-extra-1.jpg`} alt="" loading="lazy" /></div><figcaption>i · honor</figcaption></figure>
            <figure className="cv-panel cv-panel-2"><div className="cv-pano" style={{ ["--k" as string]: 1 }}><img src={`${A}/chivalry-extra-1.jpg`} alt="Павшая в красном лесу — панорама-триптих" loading="lazy" /></div><figcaption>ii · valor</figcaption></figure>
            <figure className="cv-panel cv-panel-3"><div className="cv-pano" style={{ ["--k" as string]: 2 }}><img src={`${A}/chivalry-extra-1.jpg`} alt="" loading="lazy" /></div><figcaption>iii · crown</figcaption></figure>
          </div>
          <div className="cv-tript-code" aria-hidden>where honor reigns, valor thrives — until the last crimson leaf falls</div>
          <div className="cv-grain" aria-hidden />
        </div>

        {/* 5 · OATH — тондо вырастает в медальон-печать клятвы: она снова здесь, в тёплом свете */}
        <div transition="fade" className="scene-body cv-oath">
          <div className="cv-oath-bg" aria-hidden />
          <div className="cv-oath-crest">
            <div className="cv-seal-box" data-share="hero"><img className="cv-seal" src={`${A}/chivalry-hero.jpg`} alt="Венценосная — печать клятвы" loading="lazy" /></div>
            <Ring c="cv-ring-oath" />
          </div>
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
