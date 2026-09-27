"use client";
/* Концепт 21 — CARDEALER «CONCOURS». Heritage дилер отреставрированной классики. Navy+chrome+amber, chrome-nameplate титул за машиной, машина-вырезка + зеркальное отражение scaleY(-1) на глянцевом полу (mirror-floor приём), amber-спот, spec-каллауты. Типо-персона: Space Grotesk + DM Mono. Hero-приём: mirror-floor reflection. Отличие от bmw (spec-dashboard/cyan) и porsche (theatre/magenta). */
import Link from "next/link";
import { ParallaxScene, Layer, SceneMedia } from "@/components/parallax-scene";
import "@/components/parallax-scene/parallax-scene.css";
import "./cardealer.css";

const A = "/uploads/1/hooks/sites/anim/cardealer";
const stop = (e: React.MouseEvent) => e.preventDefault();

export function CarDealerSite() {
  return (
    <div className="cd-site cd-poster">
      <header className="cd-head">
        <Link href="/visual-hooks" className="cd-brand">Concours</Link>
        <nav className="cd-nav" aria-label="Основная навигация">
          <a href="#" onClick={stop}>Collection</a><a href="#" onClick={stop}>Restoration</a>
          <a href="#" onClick={stop}>Sourcing</a><a href="#" onClick={stop} className="cd-enq">Enquire</a>
        </nav>
      </header>

      <ParallaxScene heightVh={300} className="cd-hero cp-hero" transitionOut={{ type: "crossfade", start: 0.86, color: "#150b18" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="cp-bg">
          <SceneMedia src={`${A}/blossombg.jpg`} />
        </Layer>
        <div className="cp-veil" aria-hidden />
        <div className="cp-floor" aria-hidden />

        {/* эмблема-щит */}
        <div className="cp-crest"><b>C</b><i>Concours · London</i></div>

        {/* гигант-вордмарк за машиной */}
        <Layer z={3} depth={0.24} phase={[0.02, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "-3vh", opacity: 1 }} cursor={{ x: -12, y: -7 }} className="cp-word">
          <span>CONCOURS<em>’63</em></span>
        </Layer>

        {/* машина поверх вордмарка (окклюзия) */}
        <Layer z={5} depth={0.5} phase={[0.05, 0.9]} from={{ y: "3vh", scale: 0.99, opacity: 0 }} to={{ y: "1vh", scale: 1.04, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="cp-car">
          <SceneMedia src={`${A}/car-cut.png`} alt="Classic car in profile" />
        </Layer>
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
      <ParallaxScene heightVh={260} className="cd-scene c2-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#160c1a" }}>
        <Layer z={1} depth={0.1} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.12 }} cursor={{ x: -5, y: -4 }} className="c2-bg">
          <SceneMedia src={`${A}/garagedusk.jpg`} />
        </Layer>
        <div className="c2-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.05, 0.52]} from={{ y: "7vh", scale: 0.97, opacity: 0 }} to={{ y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 15, y: 9 }} className="c2-sheet">
          <SceneMedia src={`${A}/dustsheet-cut.png`} alt="Car under a dust sheet" />
        </Layer>
        <Layer z={9} depth={0.72} from={{ y: "-3vh", scale: 1.06 }} to={{ y: "2vh", scale: 1.14 }} cursor={{ x: 30, y: 16 }} className="c2-fg">
          <SceneMedia src={`${A}/blossomfg.jpg`} />
        </Layer>
        <div className="c2-grain" aria-hidden />
        <Layer z={12} depth={0.24} phase={[0.04, 0.5]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c2-copy">
          <span className="cd-eyebrow">01 — sourcing</span>
          <h2>We hunt <em>quietly.</em></h2>
          <p>Tell us the marque, the year, the story you're after. We chase it discreetly — and bring you only the honest ones, files and all.</p>
        </Layer>
        <div className="c2-tag">A barn find, before the world sees it</div>
      </ParallaxScene>

      {/* S3 — TO THE LAST BOLT (provenance inspection-file · odometer rolls up on --lp) */}
      <ParallaxScene heightVh={300} className="cd-scene c3-scene" transitionOut={{ type: "diagonal", start: 0.86, angle: -10, color: "#0f0713" }}>
        <div className="c3-bg" aria-hidden />
        <Layer z={2} depth={0.18} phase={[0.02, 0.5]} from={{ scale: 1.05, opacity: 0 }} to={{ scale: 1, opacity: 1 }} cursor={{ x: -8, y: -5 }} className="c3-word">
          <span>RESTORED</span>
        </Layer>
        <Layer z={12} depth={0.26} phase={[0.02, 0.3]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c3-copy">
          <span className="cd-eyebrow">02 — restoration</span>
          <h2>Correct to the <em>last bolt.</em></h2>
        </Layer>
        <Layer z={8} depth={0.4} phase={[0.06, 0.66]} from={{ y: "5vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c3-fileL">
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
      <ParallaxScene heightVh={300} className="cd-scene c4-scene" transitionOut={{ type: "curtain", start: 0.86, color: "#170d1b" }}>
        <Layer z={1} depth={0.08} from={{ scale: 1.06 }} to={{ y: "2vh", scale: 1.11 }} cursor={{ x: -4, y: -3 }} className="c4-bg">
          <SceneMedia src={`${A}/showroom.jpg`} />
        </Layer>
        <div className="c4-veil" aria-hidden />
        <Layer z={12} depth={0.22} phase={[0.02, 0.4]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c4-head">
          <span className="cd-eyebrow">03 — the collection</span><h2>Three, <em>correctly.</em></h2>
        </Layer>
        <Layer z={4} depth={0.4} phase={[0.06, 0.9]} from={{ x: "-6vw", y: "3vh", scale: 0.98, opacity: 0 }} to={{ x: "-25vw", y: "1vh", scale: 1.02, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c4-car c4-side">
          <SceneMedia src={`${A}/car2-cut.png`} alt="Classic car, three-quarter view" />
        </Layer>
        <Layer z={4} depth={0.4} phase={[0.06, 0.9]} from={{ x: "6vw", y: "3vh", scale: 0.98, opacity: 0 }} to={{ x: "25vw", y: "1vh", scale: 1.02, opacity: 1 }} cursor={{ x: 10, y: 6 }} className="c4-car c4-side c4-r">
          <SceneMedia src={`${A}/car3-cut.png`} alt="Classic car, rear view" />
        </Layer>
        <Layer z={6} depth={0.55} phase={[0.06, 0.9]} from={{ y: "4vh", scale: 0.99, opacity: 0 }} to={{ y: "0vh", scale: 1.05, opacity: 1 }} cursor={{ x: 16, y: 9 }} className="c4-car c4-hero">
          <SceneMedia src={`${A}/car-cut.png`} alt="Classic car in profile" />
        </Layer>
        <div className="c4-floor" aria-hidden />
        <Layer z={14} depth={0.16} phase={[0.24, 0.72]} from={{ opacity: 0 }} to={{ opacity: 1 }} className="c4-data">
          <div className="c4-spec c4-s1"><i />1961 · silver roadster<br /><b>matching numbers</b></div>
          <div className="c4-spec c4-s2"><i />1963 · the marque<br /><b>3.8 L · restored</b></div>
          <div className="c4-spec c4-s3"><i />1957 · grand tourer<br /><b>one owner · docs</b></div>
        </Layer>
      </ParallaxScene>

      {/* S5 — THE DRIVE (emotion · motion-parallax) */}
      <ParallaxScene heightVh={280} className="cd-scene c5-scene" transitionOut={{ type: "crossfade", start: 0.86, color: "#0c0710" }}>
        <Layer z={1} depth={0.16} from={{ scale: 1.1 }} to={{ x: "-4vw", y: "2vh", scale: 1.18 }} cursor={{ x: -9, y: -5 }} className="c5-bg">
          <SceneMedia src={`${A}/roaddusk.jpg`} />
        </Layer>
        <div className="c5-veil" aria-hidden />
        <Layer z={5} depth={0.5} phase={[0.04, 0.5]} from={{ x: "7vw", y: "3vh", scale: 1.0, opacity: 0 }} to={{ x: "0vw", y: "0vh", scale: 1.07, opacity: 1 }} cursor={{ x: 22, y: 11 }} className="c5-car">
          <SceneMedia src={`${A}/car-cut.png`} alt="Classic car in profile" />
        </Layer>
        <Layer z={9} depth={0.78} from={{ x: "4vw", scale: 1.08 }} to={{ x: "-8vw", scale: 1.16 }} cursor={{ x: 34, y: 18 }} className="c5-fg">
          <SceneMedia src={`${A}/blossomfg.jpg`} />
        </Layer>
        <Layer z={12} depth={0.24} phase={[0.05, 0.5]} from={{ y: "2vh", opacity: 0 }} to={{ y: "0vh", opacity: 1 }} className="c5-copy">
          <span className="cd-eyebrow">04 — placed, not stored</span>
          <h2>Sold to someone<br />who'll <em>drive it.</em></h2>
        </Layer>
      </ParallaxScene>

      {/* S6 — THE OWNERS (service book · owner notes stamped by the dealer, stamps press in) */}
      <ParallaxScene heightVh={280} className="cd-scene c6-scene">
        <div className="c6-bg" aria-hidden />
        <div className="c6-eyebrow">from the owners · service book</div>
        <Layer z={5} depth={0.3} phase={[0.04, 0.34]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r1">
          <span className="c6-date">04 / 1998 · 12,400 mi</span><p>They found the exact car I'd chased for a decade — the file thicker than the manual.</p><cite>Charles W. · collector</cite>
        </Layer>
        <Layer z={9} depth={0.5} phase={[0.14, 0.24]} from={{ scale: 1.5, rotate: "9deg", opacity: 0 }} to={{ scale: 1, rotate: "-7deg", opacity: 1 }} className="c6-stampL c6-k1">
          <div className="c6-stamp"><b>CONCOURS</b><span>· LONDON ·</span><em>✓ serviced</em><i>1998</i></div>
        </Layer>
        <Layer z={5} depth={0.42} phase={[0.22, 0.5]} from={{ x: "3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r2">
          <span className="c6-date">09 / 2006 · 41,880 mi</span><p>The restoration is so honest it's almost invisible — it drives like it left the factory yesterday.</p><cite>Renaud L. · owner</cite>
        </Layer>
        <Layer z={9} depth={0.6} phase={[0.32, 0.42]} from={{ scale: 1.5, rotate: "-8deg", opacity: 0 }} to={{ scale: 1, rotate: "5deg", opacity: 1 }} className="c6-stampL c6-k2">
          <div className="c6-stamp"><b>CONCOURS</b><span>· LONDON ·</span><em>✓ serviced</em><i>2006</i></div>
        </Layer>
        <Layer z={5} depth={0.54} phase={[0.4, 0.68]} from={{ x: "-3vw", opacity: 0 }} to={{ x: "0vw", opacity: 1 }} className="c6-entry c6-r3">
          <span className="c6-date">05 / 2019 · 58,010 mi</span><p>Sold my father's car through them — handled with more care than I'd have managed myself.</p><cite>Beatrice M. · consignor</cite>
        </Layer>
        <Layer z={9} depth={0.7} phase={[0.5, 0.6]} from={{ scale: 1.5, rotate: "7deg", opacity: 0 }} to={{ scale: 1, rotate: "-5deg", opacity: 1 }} className="c6-stampL c6-k3">
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
