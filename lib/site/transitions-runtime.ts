/**
 * Transitions-runtime — переходы между секциями (визитная фишка).
 *
 * ПУТЬ B (всегда, безопасно): каждый блок с data-enter="…" появляется со
 * своей хореографией при входе в экран — слева/справа/снизу/сверху/пролётом/
 * поворотом/затуханием. Scroll-driven, one-shot, работает со всем (в т.ч. рядом
 * со story-блоками). На мобильных все переходы вырождаются в лёгкий fade.
 *
 * ПУТЬ A (опционально, doc.cinema): режим-фильм. Секции — полноэкранные слайды,
 * колесо/стрелки/свайп перехватываются, переход к следующей идёт её enter-типом.
 * Десктоп-онли; авто-выключается на узких экранах, при reduced-motion и когда на
 * странице есть многоэкранный блок (story: высота > 1.6 экрана) — тогда остаётся
 * обычный скролл + путь B.
 */

export const TRANSITIONS_CSS = `
/* — Путь B: появления по скроллу (за html.tx, чтобы без JS всё видно) — */
html.tx [data-enter]{opacity:0;will-change:transform,opacity;transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .95s cubic-bezier(.16,1,.3,1),filter .9s}
html.tx [data-enter="fade"]{transform:none}
html.tx [data-enter="slide-left"]{transform:translateX(-9%)}
html.tx [data-enter="slide-right"]{transform:translateX(9%)}
html.tx [data-enter="rise"]{transform:translateY(9%)}
html.tx [data-enter="fall"]{transform:translateY(-9%)}
html.tx [data-enter="zoom-in"]{transform:scale(.9)}
html.tx [data-enter="zoom-through"]{transform:scale(1.14);filter:blur(6px)}
html.tx [data-enter="rotate"]{transform:perspective(1200px) rotateX(7deg) translateY(6%);transform-origin:center top}
html.tx [data-enter].tx-in{opacity:1;transform:none;filter:none}
@media(max-width:768px){
  /* мобилки: без перегруза — только мягкий fade */
  html.tx [data-enter]{transform:none!important;filter:none!important;transition:opacity .7s ease}
}
@media(prefers-reduced-motion:reduce){
  html.tx [data-enter]{opacity:1!important;transform:none!important;filter:none!important;transition:none}
}

/* — Путь A: режим-фильм — */
html.cinema-on,html.cinema-on body{overflow:hidden;height:100%}
.cinema-deck{position:fixed;inset:0;z-index:1}
.cinema-deck>[data-bid]{position:absolute;inset:0;overflow:hidden;opacity:0;pointer-events:none;transition:transform .8s cubic-bezier(.16,1,.3,1),opacity .8s cubic-bezier(.16,1,.3,1),filter .8s;transform:translateX(100%)}
.cinema-deck>[data-bid].cin-active{opacity:1;pointer-events:auto;transform:none;z-index:2}
.cinema-deck>[data-bid].cin-before{opacity:0;transform:translateX(-40%)}
.cinema-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:60;background:transparent;pointer-events:none}
.cinema-progress__fill{height:100%;width:0;background:var(--color-accent);transition:width .6s cubic-bezier(.16,1,.3,1)}
.cinema-dots{position:fixed;right:clamp(14px,2vw,28px);top:50%;transform:translateY(-50%);z-index:60;display:flex;flex-direction:column;gap:10px}
.cinema-dots button{all:unset;width:9px;height:9px;border-radius:50%;background:color-mix(in srgb,var(--color-text) 30%,transparent);cursor:pointer;transition:background .3s,transform .3s}
.cinema-dots button.is-on{background:var(--color-accent);transform:scale(1.35)}
`;

export const transitionsRuntime = /* js */ `
(function(){
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ── Путь B: появления по скроллу ── */
  var ents=[].slice.call(document.querySelectorAll("[data-enter]"));
  if(ents.length&&"IntersectionObserver" in window){
    document.documentElement.classList.add("tx");
    var eo=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add("tx-in");eo.unobserve(en.target);}
      });
    },{threshold:.14,rootMargin:"0px 0px -8% 0px"});
    ents.forEach(function(el){eo.observe(el);});
    setTimeout(function(){ents.forEach(function(el){el.classList.add("tx-in");});},2600);
  } else if(ents.length){
    document.documentElement.classList.add("tx");
    ents.forEach(function(el){el.classList.add("tx-in");});
  }

  /* ── Путь A: режим-фильм ── */
  var deck=document.querySelector(".cinema-deck");
  if(!deck)return;
  var slides=[].slice.call(deck.children).filter(function(c){return c.hasAttribute("data-bid");});
  var vh=window.innerHeight;
  var tall=slides.some(function(s){return s.scrollHeight>vh*1.6;});
  var okWidth=window.innerWidth>=900;
  /* если условия не выполнены — распускаем колоду в обычный поток (путь B работает) */
  if(reduced||!okWidth||tall||slides.length<2){
    document.documentElement.classList.remove("cinema-on");
    deck.classList.remove("cinema-deck");
    /* enter-появления оставляем — они и дают историю в обычном скролле */
    return;
  }

  document.documentElement.classList.add("cinema-on");
  var active=0,animating=false,cooldownUntil=0;

  /* прогресс + точки навигации */
  var prog=document.createElement("div");prog.className="cinema-progress";
  var progFill=document.createElement("div");progFill.className="cinema-progress__fill";
  prog.appendChild(progFill);document.body.appendChild(prog);
  var dots=document.createElement("div");dots.className="cinema-dots";
  slides.forEach(function(s,i){
    var b=document.createElement("button");b.setAttribute("aria-label","Слайд "+(i+1));
    b.addEventListener("click",function(){go(i);});
    dots.appendChild(b);
  });
  document.body.appendChild(dots);

  function transformFor(enter,dir){
    /* с какой стороны приходит НОВЫЙ слайд (dir:1 вперёд, -1 назад) */
    switch(enter){
      case "slide-left": return dir>0?"translateX(100%)":"translateX(-100%)";
      case "slide-right": return dir>0?"translateX(-100%)":"translateX(100%)";
      case "rise": return "translateY(100%)";
      case "fall": return "translateY(-100%)";
      case "zoom-in": return "scale(.8)";
      case "zoom-through": return "scale(1.35)";
      case "rotate": return "perspective(1400px) rotateY("+(dir>0?"14deg":"-14deg")+") translateX("+(dir>0?"60%":"-60%")+")";
      default: return dir>0?"translateX(100%)":"translateX(-100%)"; /* slide-left дефолт */
    }
  }
  function render(){
    slides.forEach(function(s,i){
      s.classList.toggle("cin-active",i===active);
      s.classList.toggle("cin-before",i<active);
      if(i===active){s.style.transform="";s.style.opacity="1";s.style.filter="";}
    });
    progFill.style.width=((active/(slides.length-1))*100)+"%";
    [].slice.call(dots.children).forEach(function(d,i){d.classList.toggle("is-on",i===active);});
  }
  function go(n){
    n=Math.max(0,Math.min(slides.length-1,n));
    if(n===active||animating)return;
    var dir=n>active?1:-1;
    var incoming=slides[n],outgoing=slides[active];
    var enter=incoming.getAttribute("data-enter")||"slide-left";
    animating=true;
    /* стартовое состояние входящего */
    incoming.style.transition="none";
    incoming.style.transform=transformFor(enter,dir);
    incoming.style.opacity=(enter==="fade"||enter==="zoom-through")?"0":"1";
    incoming.style.filter=enter==="zoom-through"?"blur(8px)":"";
    incoming.classList.add("cin-active");
    void incoming.offsetWidth; /* reflow */
    incoming.style.transition="";
    /* уводим старый */
    outgoing.style.transform=transformFor(enter,-dir);
    if(enter==="fade"||enter==="zoom-through"){outgoing.style.opacity="0";outgoing.style.transform=enter==="zoom-through"?"scale(.85)":"";}
    /* приводим новый */
    incoming.style.transform="";incoming.style.opacity="1";incoming.style.filter="";
    active=n;
    setTimeout(function(){
      render();
      animating=false;cooldownUntil=performance.now()+260;
    },820);
    progFill.style.width=((active/(slides.length-1))*100)+"%";
    [].slice.call(dots.children).forEach(function(d,i){d.classList.toggle("is-on",i===active);});
  }
  render();

  function gate(dir,e){
    if(animating||performance.now()<cooldownUntil){if(e)e.preventDefault();return;}
    var n=active+dir;
    if(n<0||n>slides.length-1)return; /* края — ничего (страница и так fixed) */
    if(e)e.preventDefault();
    go(n);
  }
  window.addEventListener("wheel",function(e){gate(e.deltaY>6?1:e.deltaY<-6?-1:0,e);},{passive:false});
  window.addEventListener("keydown",function(e){
    if(e.key==="ArrowDown"||e.key==="PageDown"||e.key===" ")gate(1,e);
    if(e.key==="ArrowUp"||e.key==="PageUp")gate(-1,e);
  });
  var ty=null;
  window.addEventListener("touchstart",function(e){ty=e.touches[0].clientY;},{passive:true});
  window.addEventListener("touchmove",function(e){
    if(ty===null)return;
    var dy=ty-e.touches[0].clientY;
    if(Math.abs(dy)>36){gate(dy>0?1:-1,e);ty=null;}
  },{passive:false});
  window.addEventListener("touchend",function(){ty=null;});
})();
`;
