/**
 * Scene-runtime — живой фон сайта (слой 0 под всем контентом).
 *
 * Философия motionsites: фон — не свойство блока, а одна непрерывная сцена
 * на весь сайт. Блоки — поверхности над ней (solid/transparent/veil),
 * а сцена реагирует на прохождение секций: блок с data-scene-tint морфит
 * цвет сцены к своему тону, когда занимает центр вьюпорта.
 *
 * Типы:
 *  aurora — 3 дышащих световых пятна (CSS-анимация, дёшево)
 *  mesh   — переливающийся многослойный градиент (CSS)
 *  field  — точечное поле со связями (canvas 2D, ~sixty точек)
 *  liquid — плывущие мягкие радиальные пятна (canvas 2D, без blur-фильтров)
 *  + grain — зерно поверх (SVG-turbulence data-URI)
 *
 * Морфинг: у сцены два цветовых слоя; при смене активного тона новый слой
 * проявляется кроссфейдом (для canvas-типов цвет лерпится покадрово).
 * reduced-motion: статичный градиент, canvas не запускается.
 */

export const SCENE_CSS = `
.cscene{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.cscene~*{position:relative;z-index:1}
.cscene__video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cscene__poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
/* мобильный/фолбэк постер живёт лёгким Ken-Burns, десктоп скрабит видео */
.cscene--video .cscene__poster{animation:cscene-kb 18s ease-in-out infinite alternate}
@keyframes cscene-kb{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.12) translate(-1.5%,1.5%)}}
/* скрим для читаемости контента поверх видео */
.cscene--video .cscene__scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,6,10,.35) 0%,rgba(6,6,10,.5) 100%)}
.cscene__layer{position:absolute;inset:0;transition:opacity 1.1s ease}
.cscene__blob{position:absolute;width:65vmax;height:65vmax;border-radius:50%;filter:blur(70px);opacity:.5;will-change:transform}
.cscene--aurora .cscene__blob:nth-child(1){top:-22%;left:-12%;animation:cscene-a 26s ease-in-out infinite alternate}
.cscene--aurora .cscene__blob:nth-child(2){bottom:-28%;right:-14%;animation:cscene-b 32s ease-in-out infinite alternate}
.cscene--aurora .cscene__blob:nth-child(3){top:28%;left:38%;width:44vmax;height:44vmax;opacity:.35;animation:cscene-c 38s ease-in-out infinite alternate}
@keyframes cscene-a{from{transform:translate(0,0) scale(1)}to{transform:translate(9vw,7vh) scale(1.18)}}
@keyframes cscene-b{from{transform:translate(0,0) scale(1.1)}to{transform:translate(-8vw,-6vh) scale(.94)}}
@keyframes cscene-c{from{transform:translate(0,0) rotate(0deg)}to{transform:translate(-6vw,9vh) rotate(50deg)}}
.cscene--mesh .cscene__layer{background:
  radial-gradient(52% 60% at 18% 22%,var(--sc1) 0%,transparent 62%),
  radial-gradient(55% 62% at 82% 28%,var(--sc2) 0%,transparent 64%),
  radial-gradient(60% 66% at 50% 88%,var(--sc3) 0%,transparent 66%);
  background-size:130% 130%;animation:cscene-mesh 24s ease-in-out infinite alternate}
@keyframes cscene-mesh{from{background-position:0% 0%,100% 0%,50% 100%}to{background-position:24% 30%,72% 22%,38% 74%}}
.cscene__canvas{position:absolute;inset:0;width:100%;height:100%}
.cscene__grain{position:absolute;inset:-50%;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");animation:cscene-grain .9s steps(2) infinite}
@keyframes cscene-grain{from{transform:translate(0,0)}to{transform:translate(-4%,3%)}}
@media(prefers-reduced-motion:reduce){.cscene *{animation:none!important}}
`;

export const sceneRuntime = /* js */ `
(function(){
  var root=document.querySelector(".cscene");
  if(!root)return;
  var type=root.getAttribute("data-scene-type")||"aurora";
  var intensity=parseFloat(root.getAttribute("data-scene-intensity")||"0.5");
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var isPreview=!!window.__creatlyPreviewMode;
  var isMobile=window.matchMedia("(max-width:768px)").matches||!window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* ── Видео-сцена: глобальный скраб / мобильный постер ── */
  if(type==="video"){
    var vid=root.querySelector(".cscene__video");
    var poster=root.querySelector(".cscene__poster");
    var scrub=root.getAttribute("data-scene-scrub")==="1";
    /* мобилки / reduced / нет видео / превью — статичный постер с Ken-Burns,
       без fixed-video-джанка (особенно iOS) */
    if(isMobile||reduced||!vid||isPreview){
      if(vid)vid.style.display="none";
      if(poster)poster.style.display="block";
      /* превью на десктопе: покажем первый кадр видео статично, если постера нет */
      if(isPreview&&!isMobile&&!reduced&&vid&&!poster){
        vid.style.display="block";vid.muted=true;
        try{vid.pause();vid.currentTime=0.01;}catch(e){}
      }
      return;
    }
    if(poster)poster.style.display="none";
    vid.style.display="block";vid.muted=true;vid.playsInline=true;
    if(!scrub){
      /* режим-луп: автоплей + бесшовный кроссфейд у стыка */
      vid.loop=false;
      var fo=false,raf=null;
      function fade(t,ms){if(raf)cancelAnimationFrame(raf);var f=parseFloat(vid.style.opacity||"1"),t0=null;(function s(ts){if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/ms);vid.style.opacity=(f+(t-f)*p).toFixed(3);if(p<1)raf=requestAnimationFrame(s);})(performance.now());}
      vid.addEventListener("timeupdate",function(){if(!fo&&vid.duration&&vid.duration-vid.currentTime<0.55){fo=true;fade(0,480);}});
      vid.addEventListener("ended",function(){vid.style.opacity="0";setTimeout(function(){try{vid.currentTime=0;}catch(e){}vid.play().catch(function(){});fo=false;fade(1,480);},80);});
      vid.play().catch(function(){});
    } else {
      /* режим-скраб: currentTime = глобальный прогресс скролла всей страницы */
      var seekTarget=0;
      function onScrollV(){
        var max=document.documentElement.scrollHeight-window.innerHeight;
        var p=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
        seekTarget=p*Math.max(0,(vid.duration||0)-0.05);
      }
      function tick(){
        requestAnimationFrame(tick);
        if(!vid.duration||!isFinite(vid.duration))return;
        if(vid.seeking)return;
        if(Math.abs(seekTarget-vid.currentTime)>0.03){try{vid.currentTime=seekTarget;}catch(e){}}
      }
      var mark=function(){
        onScrollV();
        /* принудительный первый кадр: видео, которое ни разу не играло и не
           сикалось, браузер может вообще не отрисовать — толкаем на 0.02с */
        try{vid.currentTime=Math.max(seekTarget,0.02);}catch(e){}
      };
      if(vid.readyState>=1)mark();
      vid.addEventListener("loadedmetadata",mark);
      /* видео не загрузилось — показываем постер вместо чёрного экрана */
      vid.addEventListener("error",function(){
        vid.style.display="none";
        if(poster)poster.style.display="block";
      });
      window.addEventListener("scroll",onScrollV,{passive:true});
      window.addEventListener("resize",onScrollV,{passive:true});
      tick();
    }
    return; /* video-сцена самодостаточна */
  }

  function cssVar(name,fb){
    var v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v||fb;
  }
  function hexToRgb(h){
    h=h.replace("#","");
    if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n=parseInt(h,16);
    if(isNaN(n))return [110,110,240];
    return [(n>>16)&255,(n>>8)&255,n&255];
  }
  function rgba(c,a){return "rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";}
  function lerpC(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

  var baseAccent=hexToRgb(cssVar("--color-accent","#2f54eb"));
  var basePrimary=hexToRgb(cssVar("--color-primary","#15151a"));
  var tint=baseAccent.slice(); /* текущий (лерпится) */
  var tintTarget=baseAccent.slice();

  /* ── морфинг: блок с data-scene-tint в центре вьюпорта задаёт тон ── */
  var tinted=[].slice.call(document.querySelectorAll("[data-scene-tint]"));
  function pollTint(){
    var mid=window.innerHeight*0.5,found=null;
    for(var i=0;i<tinted.length;i++){
      var r=tinted[i].getBoundingClientRect();
      if(r.top<=mid&&r.bottom>=mid){found=tinted[i].getAttribute("data-scene-tint");break;}
    }
    tintTarget=found?hexToRgb(found):baseAccent.slice();
  }
  if(tinted.length){
    var tick=false;
    window.addEventListener("scroll",function(){
      if(tick)return;tick=true;
      requestAnimationFrame(function(){pollTint();tick=false;});
    },{passive:true});
    pollTint();
  }

  /* ── CSS-типы: aurora / mesh (2 слоя для кроссфейда) ── */
  function paintLayer(layer,c){
    if(type==="aurora"){
      var blobs=layer.children;
      if(blobs[0])blobs[0].style.background="radial-gradient(circle,"+rgba(c,0.55)+" 0%,transparent 70%)";
      if(blobs[1])blobs[1].style.background="radial-gradient(circle,"+rgba(basePrimary,0.5)+" 0%,transparent 70%)";
      if(blobs[2])blobs[2].style.background="radial-gradient(circle,"+rgba(c,0.4)+" 0%,transparent 70%)";
    } else {
      layer.style.setProperty("--sc1",rgba(c,0.34));
      layer.style.setProperty("--sc2",rgba(basePrimary,0.3));
      layer.style.setProperty("--sc3",rgba(c,0.24));
    }
  }
  if(type==="aurora"||type==="mesh"){
    var layers=[].slice.call(root.querySelectorAll(".cscene__layer"));
    layers.forEach(function(l){l.style.opacity=intensity;});
    if(layers[0])paintLayer(layers[0],tint);
    /* плавный морф: лерпим tint и перекрашиваем активный слой */
    if(!reduced)(function morf(){
      var d=Math.abs(tint[0]-tintTarget[0])+Math.abs(tint[1]-tintTarget[1])+Math.abs(tint[2]-tintTarget[2]);
      if(d>2){
        tint=lerpC(tint,tintTarget,0.06);
        if(layers[0])paintLayer(layers[0],tint);
      }
      requestAnimationFrame(morf);
    })();
  }

  /* ── Canvas-типы: field / liquid ── */
  if((type==="field"||type==="liquid")&&!reduced){
    var canvas=root.querySelector(".cscene__canvas");
    if(!canvas)return;
    var ctx=canvas.getContext("2d");
    var W,H,DPR=Math.min(2,window.devicePixelRatio||1);
    function resize(){
      W=root.clientWidth;H=root.clientHeight;
      canvas.width=W*DPR;canvas.height=H*DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();window.addEventListener("resize",resize,{passive:true});

    var N=type==="field"?Math.min(70,Math.floor(W/22)):7;
    var pts=[];
    for(var i=0;i<N;i++){
      pts.push({
        x:Math.random()*W,y:Math.random()*H,
        vx:(Math.random()-0.5)*(type==="field"?0.35:0.18),
        vy:(Math.random()-0.5)*(type==="field"?0.35:0.18),
        r:type==="field"?1.6+Math.random()*1.6:Math.min(W,H)*(0.24+Math.random()*0.22),
      });
    }
    var hidden=false;
    document.addEventListener("visibilitychange",function(){hidden=document.hidden;});
    (function draw(){
      requestAnimationFrame(draw);
      if(hidden)return;
      tint=lerpC(tint,tintTarget,0.05);
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){
        var p=pts[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<-p.r)p.x=W+p.r;if(p.x>W+p.r)p.x=-p.r;
        if(p.y<-p.r)p.y=H+p.r;if(p.y>H+p.r)p.y=-p.r;
        if(type==="field"){
          ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);
          ctx.fillStyle=rgba(tint,0.55*intensity);ctx.fill();
        } else {
          var g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
          g.addColorStop(0,rgba(i%2?tint:basePrimary,0.34*intensity));
          g.addColorStop(1,rgba(tint,0));
          ctx.fillStyle=g;
          ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
        }
      }
      if(type==="field"){
        var maxD=Math.min(160,W/8);
        for(var a=0;a<pts.length;a++)for(var b=a+1;b<pts.length;b++){
          var dx=pts[a].x-pts[b].x,dy=pts[a].y-pts[b].y;
          var dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<maxD){
            ctx.beginPath();ctx.moveTo(pts[a].x,pts[a].y);ctx.lineTo(pts[b].x,pts[b].y);
            ctx.strokeStyle=rgba(tint,(1-dist/maxD)*0.16*intensity);
            ctx.lineWidth=1;ctx.stroke();
          }
        }
      }
    })();
  }
})();
`;

function escAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Разметка бэкдропа (первый элемент body). */
export function sceneMarkup(scene: { type: string; intensity?: number; grain?: boolean; video?: string; poster?: string; scrub?: boolean }): string {
  let layers: string;
  if (scene.type === "video") {
    const poster = scene.poster ? `<img class="cscene__poster" src="${escAttr(scene.poster)}" alt="" style="display:none">` : "";
    const video = scene.video
      ? `<video class="cscene__video" src="${escAttr(scene.video)}"${scene.poster ? ` poster="${escAttr(scene.poster)}"` : ""} muted playsinline preload="auto" style="display:none"></video>`
      : "";
    layers = `${video}${poster}<div class="cscene__scrim" aria-hidden="true"></div>`;
  } else if (scene.type === "aurora") {
    layers = `<div class="cscene__layer"><div class="cscene__blob"></div><div class="cscene__blob"></div><div class="cscene__blob"></div></div>`;
  } else if (scene.type === "mesh") {
    layers = `<div class="cscene__layer"></div>`;
  } else {
    layers = `<canvas class="cscene__canvas" aria-hidden="true"></canvas>`;
  }
  const grain = scene.grain ? `<div class="cscene__grain" aria-hidden="true"></div>` : "";
  const scrub = scene.type === "video" && scene.scrub !== false ? ` data-scene-scrub="1"` : "";
  return `<div class="cscene cscene--${scene.type}" aria-hidden="true" data-scene-type="${scene.type}" data-scene-intensity="${scene.intensity ?? 0.5}"${scrub}>${layers}${grain}</div>`;
}
