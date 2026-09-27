/**
 * Demo-runtime — автопрокрутка страницы для записи экрана.
 *
 * Идея: пользователь публикует сайт, открывает живую ссылку с ?demo=60
 * (или жмёт «Демо» в живом превью редактора), включает запись экрана —
 * и страница сама плавно проезжает сверху вниз с кинематографичным easing,
 * попутно естественно проигрывая все scroll-driven механики (story-runtime,
 * reveal, скраб видео) — они реагируют на обычное событие scroll и не знают,
 * что его вызвал скрипт, а не палец пользователя.
 *
 * Два способа запустить:
 *  - URL-параметр ?demo=<секунды> — для реального опубликованного сайта;
 *  - postMessage {source:"creatly-demo-host", action:"start"|"stop", durationMs}
 *    — для управления из живого превью редактора (там нет адресной строки).
 */

export const DEMO_MSG_SOURCE = "creatly-demo";

export const demoRuntime = /* js */ `
(function(){
  var running=false,raf=null,bar=null;

  function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}

  function makeBar(){
    bar=document.createElement("div");
    bar.style.cssText="position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,rgba(255,255,255,.95),rgba(255,255,255,.35));z-index:2147483647;pointer-events:none";
    document.body.appendChild(bar);
  }
  function removeBar(){if(bar){bar.remove();bar=null;}}

  /* Во время демо Lenis (если есть) останавливаем и ведём скролл нативно —
     иначе его инерционный raf воюет с нашим и картинку дёргает. */
  function goTo(y){window.scrollTo(0,y);}
  function pauseLenis(){try{if(window.__creatlyLenis)window.__creatlyLenis.stop();}catch(e){}}
  function resumeLenis(){try{if(window.__creatlyLenis)window.__creatlyLenis.start();}catch(e){}}

  function onKey(e){if(e.key==="Escape")stop();}

  function stop(){
    if(!running)return;
    running=false;
    if(raf)cancelAnimationFrame(raf);
    removeBar();
    resumeLenis();
    window.removeEventListener("wheel",stop);
    window.removeEventListener("touchstart",stop);
    window.removeEventListener("keydown",onKey);
  }

  function start(durationMs){
    if(running)return;
    running=true;
    pauseLenis();
    makeBar();
    var total=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    var t0=null;
    window.addEventListener("wheel",stop,{passive:true});
    window.addEventListener("touchstart",stop,{passive:true});
    window.addEventListener("keydown",onKey);
    function frame(ts){
      if(!running)return;
      if(t0===null)t0=ts;
      var p=Math.min(1,(ts-t0)/durationMs);
      goTo(ease(p)*total);
      if(bar)bar.style.width=(p*100)+"%";
      if(p>=1){stop();return;}
      raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
  }

  window.addEventListener("message",function(e){
    var m=e.data;
    if(!m||m.source!=="${DEMO_MSG_SOURCE}-host")return;
    if(m.action==="start")start(m.durationMs||45000);
    if(m.action==="stop")stop();
  });

  var qDemo=new URLSearchParams(location.search).get("demo");
  if(qDemo){
    var secs=parseFloat(qDemo);
    var ms=(!isNaN(secs)&&secs>0)?secs*1000:45000;
    setTimeout(function(){start(ms);},900);
  }
})();
`;
