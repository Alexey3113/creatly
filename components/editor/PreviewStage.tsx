import { useEffect, useRef, useState, useCallback } from "react";
import type { RefObject } from "react";
import type { ViewportMode } from "@/lib/builder/types";

interface PreviewStageProps {
  viewport: ViewportMode | "split";
  iframeRef: RefObject<HTMLIFrameElement | null>;
  frameRef: RefObject<HTMLDivElement | null>;
  srcdocHtml?: string;
  zoom?: number;
  containerRef?: RefObject<HTMLDivElement | null>;
}

const VIEWPORT_WIDTHS: Record<string, number> = {
  desktop: 1920,
  tablet: 820,
  mobile: 390,
};

const splitViewports: { mode: ViewportMode; width: number; label: string }[] = [
  { mode: "desktop", width: 1440, label: "Desktop 1440px" },
  { mode: "tablet", width: 820, label: "Tablet 820px" },
  { mode: "mobile", width: 390, label: "Mobile 390px" },
];

export function PreviewStage({ viewport, iframeRef, frameRef, srcdocHtml, zoom = 100, containerRef: externalContainerRef }: PreviewStageProps) {
  const splitRefs = useRef<HTMLIFrameElement[]>([]);
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalRef;
  const [autoScale, setAutoScale] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const calcScale = useCallback(() => {
    const container = containerRef.current;
    if (!container || viewport === "split") return;
    const pw = VIEWPORT_WIDTHS[viewport] || 1440;
    const availW = container.clientWidth - 48;
    const availH = container.clientHeight - 24;
    const scaleW = availW / pw;
    const scaleH = availH / 900;
    setAutoScale(Math.min(scaleW, scaleH, 1));
  }, [viewport]);

  useEffect(() => {
    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, [calcScale]);

  useEffect(() => {
    setLoaded(false);
  }, [srcdocHtml]);

  useEffect(() => {
    if (viewport !== "split" || !srcdocHtml) return;
    splitRefs.current.forEach((iframe) => {
      if (iframe) iframe.srcdoc = srcdocHtml;
    });
  }, [viewport, srcdocHtml]);

  const finalScale = (autoScale * zoom) / 100;

  if (viewport === "split") {
    return (
      <section className="preview-stage preview-stage--split">
        {splitViewports.map((vp, i) => (
          <div className="split-frame" key={vp.mode} data-split-viewport={vp.mode}>
            <div className="split-frame__label">{vp.label}</div>
            <div className="split-frame__container" style={{ width: vp.width }}>
              <iframe
                ref={(el) => { if (el) splitRefs.current[i] = el; }}
                title={`Preview ${vp.mode}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        ))}
      </section>
    );
  }

  const frameWidth = VIEWPORT_WIDTHS[viewport] || 1440;

  return (
    <section className="preview-stage" ref={containerRef}>
      <style>{PREVIEW_CSS}</style>
      <div className="preview-canvas">
        {!loaded && (
          <div className="preview-skeleton">
            <div className="preview-skeleton__bar" />
            <div className="preview-skeleton__hero" />
            <div className="preview-skeleton__row"><div /><div /><div /></div>
            <div className="preview-skeleton__text" />
          </div>
        )}
        <div
          className="preview-frame"
          ref={frameRef}
          data-viewport={viewport}
          style={{
            width: `${frameWidth}px`,
            height: `${Math.round(containerRef.current?.clientHeight ? containerRef.current.clientHeight / finalScale : 2000)}px`,
            transform: `scale(${finalScale})`,
            transformOrigin: "center center",
          }}
        >
          <iframe
            ref={iframeRef}
            title="Website preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
      <div className="preview-viewport-badge">
        {viewport === "desktop" ? "Desktop" : viewport === "tablet" ? "Tablet" : "Mobile"} · {frameWidth}px · {Math.round(finalScale * 100)}%
      </div>
    </section>
  );
}

const PREVIEW_CSS = `
.preview-canvas{flex:1;display:flex;justify-content:center;align-items:flex-start;overflow:auto;padding:12px;position:relative}
.preview-skeleton{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;display:flex;flex-direction:column;gap:12px;opacity:.5}
.preview-skeleton__bar{height:8px;width:60%;border-radius:4px;background:rgba(255,255,255,.04);animation:skel-pulse 1.5s ease-in-out infinite}
.preview-skeleton__hero{height:120px;border-radius:12px;background:rgba(255,255,255,.03);animation:skel-pulse 1.5s ease-in-out .2s infinite}
.preview-skeleton__row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.preview-skeleton__row div{height:60px;border-radius:8px;background:rgba(255,255,255,.025);animation:skel-pulse 1.5s ease-in-out .4s infinite}
.preview-skeleton__text{height:32px;width:80%;border-radius:6px;background:rgba(255,255,255,.02);animation:skel-pulse 1.5s ease-in-out .6s infinite}
@keyframes skel-pulse{0%,100%{opacity:.3}50%{opacity:.6}}
.preview-viewport-badge{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);padding:4px 12px;border-radius:6px;background:rgba(15,18,35,.8);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.06);color:#6b7fa0;font-size:11px;font-weight:500;font-family:ui-monospace,monospace;letter-spacing:.02em;pointer-events:none}
`;
