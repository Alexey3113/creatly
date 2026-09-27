"use client";
/* Концепт 21 — CARDEALER «CONCOURS». Heritage дилер отреставрированной классики. Navy+chrome+amber, chrome-nameplate титул за машиной, машина-вырезка + зеркальное отражение scaleY(-1) на глянцевом полу (mirror-floor приём), amber-спот, spec-каллауты. Типо-персона: Space Grotesk + DM Mono. Hero-приём: mirror-floor reflection. Отличие от bmw (spec-dashboard/cyan) и porsche (theatre/magenta).
   Сквозная архитектура (аудит 2026-09): единственная сюжетная дуга семейства — нашли → восстановили → показали → продали —
   теперь несёт ОДНА машина-актёр (E-type): hero → уходит под простыню в гараже → восстановлена рядом с досье → центр шоурума →
   уезжает по сакуровой дороге (стоп-сигналы горят) → паркуется у CTA (dock к блоку). Второй актёр — лепестки (Weather) на весь сайт.
   Стыки: S2→S3 «простыня» (наезд на ткань, ткань сползает с кадра — под ней досье), S4→S5 «цветок сакуры» (маска растёт из машины);
   остальные — перекрытие. */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import { Actor, Atmosphere, Follow, Weather } from "@/components/scene-kit";
import "./cardealer.css";

const A = "/uploads/1/hooks/sites/anim/cardealer";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function CarDealerSite() {
  return (
    <div className="cd-site cd-poster">
      <Atmosphere stops={[
        { at: ".c3-scene", color: "#1e0f22", anchor: 0.5 },
        { at: ".c6-scene", color: "#1a0f1f", anchor: 0.5 },
        { at: ".cd-cta", color: "#2a1530", anchor: 0.5 },
      ]} />
      <Weather kind="petals" count={18} color="#f4b6cf" color2="#e0609a" world={0.5} zIndex={24} />
      {/* АКТЁР — та самая машина через всю дугу */}
      <Actor className="cd-car-actor" width="55vw" zIndex={23} bob={2} tilt={0.03} stops={[
        { at: ".cp-hero", anchor: 0.18, pose: { x: 50, y: 52, s: 1 } },
        { at: ".cp-hero", anchor: 0.55, pose: { x: 50, y: 53, s: 1.04 } },
        { at: ".c2-scene", anchor: 0.34, pose: { x: 51, y: 55, s: 0.86, o: 0 } },
        { at: ".c3-scene", anchor: 0.5, pose: { x: 72, y: 76, s: 0.5, o: 1 } },
        { at: ".c4-scene", anchor: 0.5, pose: { x: 50, y: 51, s: 0.76 } },
        { at: ".c5-scene", anchor: 0.46, pose: { x: 52, y: 52, s: 0.9 } },
        { at: ".c5-scene", anchor: 0.74, pose: { x: 24, y: 58, s: 0.52 } },
        { at: ".c6-scene", anchor: 0.34, pose: { x: 6, y: 60, s: 0.3, o: 0 } },
        { at: ".cd-cta-in", anchor: 0.5, pose: { x: 50, y: 132, s: 0.6, o: 1, dock: true } },
      ]}>
        <img src={`${A}/car-cut.png`} alt="" decoding="async" draggable={false} />
        <i className="cd-brake" />
      </Actor>
      <Follow target=".cd-car-actor" stops={[
        { at: ".c5-scene", anchor: 0.5, vars: { "--brake": 0 } },
        { at: ".c5-scene", anchor: 0.72, vars: { "--brake": 1 } },
        { at: ".c6-scene", anchor: 0.3, vars: { "--brake": 1 } },
        { at: ".cd-cta-in", anchor: 0.5, vars: { "--brake": 0 } },
      ]} />
      <header className="cd-head">
        <Link href="/visual-hooks" className="cd-brand">Concours</Link>
        <nav className="cd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Restoration</a>
          <a href="#" onClick={stop}>Sourcing</a><a href="#" onClick={stop} className="cd-enq">Enquire</a>
        </nav>
      </header>

      <ParallaxScene heightVh={260} rest={0.35} intro={1200} parallax={8} className="cd-hero cp-hero">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="cp-bg">
          <SceneMedia src={`${A}/blossombg.jpg`} />
        </Layer>
        <div className="cp-veil" aria-hidden />
        <div className="cp-floor" aria-hidden />
        <div className="cp-water" aria-hidden />

        {/* эмблема-щит */}
        <div className="cp-crest"><b>C</b><i>Concours · London</i></div>

        {/* гигант-вордмарк за машиной */}
        <Layer z={3} depth={0.24} phase={[0.02, 0.28]} from={{ y: "2vh", opacity: 0 }} to={{ y: "-3vh", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="cp-word">
          <span>CONCOURS<em>’63</em></span>
        </Layer>

        {/* машина — актёр (fixed, поверх вордмарка) */}
        <div className="cp-grain" aria-hidden />

        {/* редакционный низ */}
        <div className="cp-headline">A brief history of<br /><b>the Concours marque</b></div>
        <div className="cp-body">
          <p>Since 1994 we have sourced, restored and quietly placed the correct cars — matching numbers, honest files, and no stories.</p>
          <p>Every car is inspected, road-tested and photographed in full before it ever reaches you. Sourcing, restoration and discreet sales.</p>
        </div>

        <div className="cp-tag cp-tl">EST. 1994 · LONDON</div>
        <div className="cp-tag cp-tr">SALES · RESTORATION<br />DISCREET SOURCING</div>
        <div className="cp-cue">view the collection ↓</div>
      </ParallaxScene>

      {/* S2 — THE HUNT (sourcing · foreground-parallax) */}
      <ParallaxScene heightVh={300} overlapVh={70} parallax={8} className="cd-scene c2-scene">
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="c2-bg">
          <SceneMedia src={`${A}/garagedusk.jpg`} />
        </Layer>
        <div className="c2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.06, 0.3]} from={{ y: "7vh", scale: 0.97, opacity: 0 }} to={{ y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 15, y: 9 }} className="c2-sheetL">
          {/* в конце сцены — наезд на ткань: кадр заполняет простыня (стык с S3) */}
          <Layer depth={0} phase={[0.56, 1]} from={{}} to={{ scale: 7, y: "14vh" }} className="c2-sheet">
            <SceneMedia src={`${A}/dustsheet-cut.png`} alt="Car under a dust sheet" />
          </Layer>
        </Layer>
        <Layer z={9} depth={0.72} from={{ y: "-3vh", scale: 1.06 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: 30, y: 16 }} className="c2-fg">
          <SceneMedia src={`${A}/blossomfg.jpg`} />
        </Layer>
        <div className="c2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.28, 0.42]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c2-copy">
          <span className="cd-eyebrow">01 — sourcing</span>
          <h2>We hunt <em>quietly.</em></h2>
          <p>Tell us the marque, the year, the story you're after. We chase it discreetly — and bring you only the honest ones, files and all.</p>
        </Layer>
        <div className="c2-tag">A barn find, before the world sees it</div>
      </ParallaxScene>

      {/* S3 — TO THE LAST BOLT (provenance inspection-file · odometer rolls up on --lp) */}
      <ParallaxScene heightVh={320} overlapVh={90} parallax={8} className="cd-scene c3-scene">
        <div className="c3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.2, 0.42]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} cursor={{ x: -8, y: -5 }} className="c3-word">
          <span>RESTORED</span>
        </Layer>
        <Layer z={12} depth={0.26} phase={[0.34, 0.46]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c3-copy">
          <span className="cd-eyebrow">02 — restoration</span>
          <h2>Correct to the <em>last bolt.</em></h2>
        </Layer>
        <Layer z={8} depth={0.4} phase={[0.3, 0.72]} from={{ y: "5vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c3-fileL">
          <div className="c3-file">
            <div className="c3-fhead"><span className="c3-fno">INSPECTION FILE № HDU · 1963</span><span className="c3-fmn">matching numbers</span></div>
            <div className="c3-odo">
              <span className="c3-odlabel">miles since restoration</span>
              <div className="c3-digits">
                {[10, 10, 10, 18, 14].map((to, i) => (
                  <span className="c3-dwin" key={i} style={{ ["--to" as string]: to }}>
                    <span className="c3-strip">{Array.from({ length: 30 }).map((_, d) => <i key={d}>{d % 10}</i>)}</span>
                  </span>
                ))}
                <span className="c3-odunit">mi</span>
              </div>
            </div>
            <div className="c3-exhibits">
              <figure><SceneMedia src={`${A}/g1.jpg`} /><figcaption>01 · wire wheels</figcaption></figure>
              <figure><SceneMedia src={`${A}/g4.jpg`} /><figcaption>02 · under the lights</figcaption></figure>
              <figure><SceneMedia src={`${A}/g3.jpg`} /><figcaption>03 · wood &amp; hide</figcaption></figure>
              <figure><SceneMedia src={`${A}/g2.jpg`} /><figcaption>04 · numbers match</figcaption></figure>
            </div>
            <div className="c3-passed"><b>PASSED</b><span>concours standard · nut &amp; bolt</span></div>
          </div>
        </Layer>
      </ParallaxScene>

      {/* S4 — THE COLLECTION (provenance · showroom + data callouts) */}
      <ParallaxScene heightVh={300} overlapVh={60} parallax={8} className="cd-scene c4-scene">
        <Layer z={1} depth={0.08} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.11 }} cursor={{ x: -4, y: -3 }} className="c4-bg">
          <SceneMedia src={`${A}/showroom.jpg`} />
        </Layer>
        <div className="c4-veil" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.24, 0.36]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c4-head">
          <span className="cd-eyebrow">03 — the collection</span><h2>Three, <em>correctly.</em></h2>
        </Layer>
        <Layer z={4} depth={0.4} phase={[0.02, 0.3]} from={{ x: "-6vw", y: "3vh", scale: 0.98, opacity: 0 }} to={{ x: "-25vw", y: "1vh", scale: 1.02, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c4-car c4-side">
          <SceneMedia src={`${A}/car2-cut.png`} alt="Classic car, three-quarter view" />
        </Layer>
        <Layer z={4} depth={0.4} phase={[0.04, 0.32]} from={{ x: "6vw", y: "3vh", scale: 0.98, opacity: 0 }} to={{ x: "25vw", y: "1vh", scale: 1.02, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c4-car c4-side c4-r">
          <SceneMedia src={`${A}/car3-cut.png`} alt="Classic car, rear view" />
        </Layer>
        <div className="c4-floor" aria-hidden />
        <Layer z={14} depth={0.16} phase={[0.3, 0.52]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="c4-data">
          <div className="c4-spec c4-s1"><i />1961 · silver roadster<br /><b>matching numbers</b></div>
          <div className="c4-spec c4-s2"><i />1963 · the marque<br /><b>3.8 L · restored</b></div>
          <div className="c4-spec c4-s3"><i />1957 · grand tourer<br /><b>one owner · docs</b></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE DRIVE (emotion · motion-parallax) */}
      <ParallaxScene heightVh={300} overlapVh={80} parallax={10} className="cd-scene c5-scene">
        <Layer z={1} depth={0.16} from={{ scale: 1.1 }} to={{ x: "-4vw", y: "2vh", scale: 1.18 }} cursor={{ x: -9, y: -5 }} className="c5-bg">
          <SceneMedia src={`${A}/roaddusk.jpg`} />
        </Layer>
        <div className="c5-veil" aria-hidden />
        <Layer z={9} depth={0.78} from={{ x: "4vw", scale: 1.08 }} to={{ x: "-8vw", scale: 1.16 }} cursor={{ x: 34, y: 18 }} className="c5-fg">
          <SceneMedia src={`${A}/blossomfg.jpg`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.36, 0.48]} from={{ y: "3vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c5-copy">
          <span className="cd-eyebrow">04 — placed, not stored</span>
          <h2>Sold to someone<br />who'll <em>drive it.</em></h2>
        </Layer>
        <div className="cd-bloom" aria-hidden />
      </ParallaxScene>

      {/* S6 — THE OWNERS (service book · owner notes stamped by the dealer, stamps press in) */}
      <ParallaxScene heightVh={280} overlapVh={60} parallax={10} className="cd-scene c6-scene">
        <div className="c6-bg" aria-hidden />
        <Layer z={1} depth={0.1} from={{ scale: 1.1 }} to={{ y: "2vh", scale: 1.03 }} className="c6-bay"><SceneMedia src={`${A}/bg.jpg`} /></Layer>
        <div className="c6-veil" aria-hidden />
        <Layer z={16} depth={0} phase={[0.2, 0.3]} from={{ opacity: 0 }} to={{ opacity: 1 }}><div className="c6-eyebrow">from the owners · service book</div></Layer>
        <Layer z={5} depth={0.3} phase={[0.2, 0.36]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r1">
          <span className="c6-date">04 / 1998 · 12,400 mi</span><p>They found the exact car I'd chased for a decade — the file thicker than the manual.</p><cite>Charles W. · collector</cite>
        </Layer>
        <Layer z={9} depth={0.5} phase={[0.3, 0.37]} from={{ scale: 1.5, rotate: "9deg", opacity: 0 }} to={{ scale: 1, rotate: "-7deg", opacity: 1 }} className="c6-stampL c6-k1">
          <div className="c6-stamp"><b>CONCOURS</b><span>· LONDON ·</span><em>✓ serviced</em><i>1998</i></div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.3, 0.46]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r2">
          <span className="c6-date">09 / 2006 · 41,880 mi</span><p>The restoration is so honest it's almost invisible — it drives like it left the factory yesterday.</p><cite>Renaud L. · owner</cite>
        </Layer>
        <Layer z={9} depth={0.6} phase={[0.4, 0.47]} from={{ scale: 1.5, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "5deg", opacity: 1 }} className="c6-stampL c6-k2">
          <div className="c6-stamp"><b>CONCOURS</b><span>· LONDON ·</span><em>✓ serviced</em><i>2006</i></div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.4, 0.56]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r3">
          <span className="c6-date">05 / 2019 · 58,010 mi</span><p>Sold my father's car through them — handled with more care than I'd have managed myself.</p><cite>Beatrice M. · consignor</cite>
        </Layer>
        <Layer z={9} depth={0.7} phase={[0.5, 0.57]} from={{ scale: 1.5, rotate: "7deg", opacity: 0 }} to={{ scale: 1, rotate: "-5deg", opacity: 1 }} className="c6-stampL c6-k3">
          <div className="c6-stamp"><b>CONCOURS</b><span>· LONDON ·</span><em>✓ serviced</em><i>2019</i></div>
        </Layer>
      </ParallaxScene>

      <section className="cd-cta">
        <div className="cd-cta-in">
          <span className="cd-eyebrow">Enquiries</span>
          <h2>Find the<br /><span>right one.</span></h2>
          <p>Looking for a specific marque, or ready to sell? Tell us — every conversation is handled in confidence.</p>
          <a href="#" onClick={stop} className="cd-btn">Make an enquiry <i>↗</i></a>
        </div>
      </section>

      <footer className="cd-foot">
        <div className="cd-foot-top"><b>Concours</b><p>Documented classic cars — sourced, restored, and placed with care.</p></div>
        <div className="cd-foot-legal"><span>Concours Motors, London</span><span>A Visual Hooks concept</span></div>
      </footer>
    </div>
  );
}
