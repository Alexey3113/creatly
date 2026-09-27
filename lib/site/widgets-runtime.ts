/**
 * Widgets-runtime — крошечные интерактивные механики блоков.
 *
 * [data-marquee]  — бегущая строка: дублирует содержимое дорожки для
 *                   бесшовной CSS-петли (сама анимация — в CSS блока).
 * [data-ba]       — before/after: range-инпут внутри пишет --x (0..100)
 *                   на контейнер; клип «после»-слоя — в CSS блока.
 * [data-header]   — шапка: после 24px скролла получает .is-scrolled
 *                   (подложка/граница — в CSS блока).
 * [data-tilt]     — 3D-наклон карточки к курсору: пишет --rx/--ry (deg)
 *                   и --gx/--gy (%) для блика; transform — в CSS блока.
 * [data-count]    — счётчик: число в тексте плавно набегает от 0 при входе
 *                   в вьюпорт (суффиксы/префиксы сохраняются).
 * [data-spotlight]— секция-фонарик: пишет --mx/--my (px) позиции курсора;
 *                   радиальный градиент — в CSS блока.
 * [data-magnet]   — магнитная кнопка: тянется к курсору в радиусе.
 * [data-orbit]    — раскладывает прямых детей по кругу: каждому пишет --a
 *                   (угол = index/count·360deg). Вращение — CSS через --p.
 * [data-hover-cycle] — на тач-устройствах по очереди подсвечивает детей
 *                   классом .is-active (эмуляция hover для «живой сетки»).
 * [data-coverflow] — 3D-карусель: карточки [data-cf-card] раскладываются
 *                   веером вокруг активной (translateZ+rotateY+scale), центр
 *                   фронтально; авто-прокрутка, клик и свайп меняют активную.
 * [data-smooth-loop] — <video>: бесшовный луп через кроссфейд вокруг стыка
 *                   (fade-out за 0.55с до конца, сброс, fade-in) — убирает
 *                   видимый «скачок» зацикленного видео.
 * [data-reveal-mask] — контейнер-«проявитель»: слой [data-rm-top] виден
 *                   только в мягком круге у курсора (CSS mask через --mx/--my);
 *                   на тач-устройствах круг сам плывёт по траектории.
 * Всё курсорное гейтится (hover:hover) и prefers-reduced-motion.
 */

export const widgetsRuntime = /* js */ `
(function(){
  /* marquee: бесшовная петля */
  [].slice.call(document.querySelectorAll("[data-marquee]")).forEach(function(track){
    if(track.getAttribute("data-marquee-ready"))return;
    track.setAttribute("data-marquee-ready","1");
    var clone=track.cloneNode(true);
    clone.setAttribute("aria-hidden","true");
    clone.removeAttribute("data-marquee");
    /* редакторские атрибуты в клоне не нужны */
    [].slice.call(clone.querySelectorAll("[data-field],[data-item-id],[data-collection-item]")).forEach(function(el){
      el.removeAttribute("data-field");el.removeAttribute("data-item-id");el.removeAttribute("data-collection-item");
    });
    track.parentNode.appendChild(clone);
  });

  /* шапка: подложка после начала скролла */
  var headers=[].slice.call(document.querySelectorAll("[data-header]"));
  if(headers.length){
    var hTick=false;
    var applyHeader=function(){
      var scrolled=window.scrollY>24;
      headers.forEach(function(h){h.classList.toggle("is-scrolled",scrolled);});
    };
    window.addEventListener("scroll",function(){
      if(hTick)return;hTick=true;
      requestAnimationFrame(function(){applyHeader();hTick=false;});
    },{passive:true});
    applyHeader();
  }

  /* before/after слайдер */
  [].slice.call(document.querySelectorAll("[data-ba]")).forEach(function(root){
    var input=root.querySelector("input[type=range]");
    if(!input)return;
    var set=function(){root.style.setProperty("--x",input.value+"%");};
    input.addEventListener("input",set);
    set();
  });

  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var hasPointer=window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* орбита: равномерно раскладываем детей по кругу через --a */
  [].slice.call(document.querySelectorAll("[data-orbit]")).forEach(function(ring){
    var items=[].slice.call(ring.children).filter(function(c){return c.hasAttribute("data-orbit-item");});
    var n=items.length||1;
    items.forEach(function(it,i){it.style.setProperty("--a",(i/n*360).toFixed(2)+"deg");});
  });

  /* 3D-карусель (coverflow) */
  [].slice.call(document.querySelectorAll("[data-coverflow]")).forEach(function(track){
    var cards=[].slice.call(track.querySelectorAll("[data-cf-card]"));
    if(cards.length<2)return;
    var active=Math.floor(cards.length/2),timer=null,gap=46,depth=150,rot=32;
    function layout(){
      cards.forEach(function(c,i){
        var k=i-active,ak=Math.abs(k);
        c.style.transform="translate(-50%,-50%) translateX("+(k*gap)+"%) translateZ("+(-ak*depth)+"px) rotateY("+(-k*rot)+"deg) scale("+(1-ak*0.06)+")";
        c.style.opacity=ak>2.2?"0":(1-ak*0.22).toFixed(2);
        c.style.zIndex=String(100-ak);
        c.style.pointerEvents=ak>2.2?"none":"auto";
        c.classList.toggle("is-center",k===0);
      });
    }
    function go(i){active=Math.max(0,Math.min(cards.length-1,i));layout();}
    function auto(){if(reduced)return;clearInterval(timer);timer=setInterval(function(){active=(active+1)%cards.length;layout();},3200);}
    cards.forEach(function(c,i){c.addEventListener("click",function(){go(i);auto();});});
    /* свайп/драг */
    var sx=null;
    track.addEventListener("pointerdown",function(e){sx=e.clientX;});
    window.addEventListener("pointerup",function(e){
      if(sx===null)return;
      var dx=e.clientX-sx;
      if(Math.abs(dx)>40){go(active+(dx<0?1:-1));auto();}
      sx=null;
    });
    layout();auto();
  });

  /* живая сетка на тач: подсвечиваем плитки по очереди */
  if(!hasPointer&&!reduced){
    [].slice.call(document.querySelectorAll("[data-hover-cycle]")).forEach(function(grid){
      var tiles=[].slice.call(grid.querySelectorAll("[data-hc-tile]"));
      if(!tiles.length)return;
      var i=0;
      setInterval(function(){
        tiles.forEach(function(t){t.classList.remove("is-active");});
        tiles[i%tiles.length].classList.add("is-active");
        i++;
      },1400);
    });
  }

  /* бесшовный видео-луп: кроссфейд вокруг стыка */
  [].slice.call(document.querySelectorAll("video[data-smooth-loop]")).forEach(function(v){
    v.loop=false;
    var raf=null,fadingOut=false;
    function fadeTo(target,ms,done){
      if(raf)cancelAnimationFrame(raf);
      var from=parseFloat(v.style.opacity||"1"),t0=null;
      function step(ts){
        if(t0===null)t0=ts;
        var p=Math.min(1,(ts-t0)/ms);
        v.style.opacity=(from+(target-from)*p).toFixed(3);
        if(p<1)raf=requestAnimationFrame(step);
        else if(done)done();
      }
      raf=requestAnimationFrame(step);
    }
    v.addEventListener("timeupdate",function(){
      if(fadingOut||!v.duration)return;
      if(v.duration-v.currentTime<0.55){fadingOut=true;fadeTo(0,480);}
    });
    v.addEventListener("ended",function(){
      v.style.opacity="0";
      setTimeout(function(){
        try{v.currentTime=0;}catch(e){}
        v.play().catch(function(){});
        fadingOut=false;
        fadeTo(1,480);
      },100);
    });
    v.addEventListener("loadeddata",function(){fadeTo(1,480);});
  });

  /* «проявитель»: второй слой виден в мягком круге у курсора */
  [].slice.call(document.querySelectorAll("[data-reveal-mask]")).forEach(function(root){
    var top=root.querySelector("[data-rm-top]");
    if(!top)return;
    var r=parseFloat(root.getAttribute("data-reveal-mask"))||260;
    var mask="radial-gradient(circle "+r+"px at var(--mx,-999px) var(--my,-999px),rgba(0,0,0,1) 0%,rgba(0,0,0,1) 40%,rgba(0,0,0,.75) 60%,rgba(0,0,0,.4) 75%,rgba(0,0,0,.12) 88%,transparent 100%)";
    top.style.maskImage=mask;top.style.webkitMaskImage=mask;
    var mx=-999,my=-999,sx=-999,sy=-999,active=false;
    function loop(){
      sx+=(mx-sx)*0.12;sy+=(my-sy)*0.12;
      root.style.setProperty("--mx",sx.toFixed(1)+"px");
      root.style.setProperty("--my",sy.toFixed(1)+"px");
      requestAnimationFrame(loop);
    }
    if(hasPointer&&!reduced){
      root.addEventListener("mousemove",function(e){
        var rect=root.getBoundingClientRect();
        mx=e.clientX-rect.left;my=e.clientY-rect.top;
        if(!active){active=true;sx=mx;sy=my;loop();}
      });
      root.addEventListener("mouseleave",function(){mx=-999;my=-999;});
    } else if(!reduced){
      /* тач/демо: круг сам плывёт по лиссажу — эффект живёт и в рилсах */
      var t=0;
      (function auto(){
        t+=0.008;
        var rect=root.getBoundingClientRect();
        mx=rect.width*(0.5+0.34*Math.sin(t*1.3));
        my=rect.height*(0.5+0.3*Math.cos(t*0.9));
        sx+=(mx-sx)*0.06;sy+=(my-sy)*0.06;
        root.style.setProperty("--mx",sx.toFixed(1)+"px");
        root.style.setProperty("--my",sy.toFixed(1)+"px");
        requestAnimationFrame(auto);
      })();
    }
  });

  /* счётчики: число набегает от 0 при входе в вьюпорт */
  var counters=[].slice.call(document.querySelectorAll("[data-count]"));
  if(counters.length){
    function runCount(el){
      var raw=el.textContent;
      var m=raw.match(/-?[\\d\\s.,]*\\d/);
      if(!m)return;
      var numStr=m[0];
      var target=parseFloat(numStr.replace(/\\s/g,"").replace(",","."));
      if(isNaN(target))return;
      var decimals=(numStr.replace(",",".").split(".")[1]||"").length;
      var prefix=raw.slice(0,m.index),suffix=raw.slice(m.index+numStr.length);
      var sep=numStr.indexOf(" ")!==-1;
      if(reduced)return;
      var t0=null,dur=1600;
      function fmt(v){
        var s=v.toFixed(decimals);
        if(sep)s=s.replace(/\\B(?=(\\d{3})+(?!\\d))/g," ");
        return s.replace(".",numStr.indexOf(",")!==-1?",":".");
      }
      function frame(ts){
        if(t0===null)t0=ts;
        var p=Math.min(1,(ts-t0)/dur);
        var e=1-Math.pow(1-p,3);
        el.textContent=prefix+fmt(target*e)+suffix;
        if(p<1)requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if("IntersectionObserver" in window&&!reduced){
      var cio=new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(en.isIntersecting){runCount(en.target);cio.unobserve(en.target);}
        });
      },{threshold:.4});
      counters.forEach(function(el){cio.observe(el);});
    }
  }

  /* 3D-tilt + блик */
  if(hasPointer&&!reduced){
    [].slice.call(document.querySelectorAll("[data-tilt]")).forEach(function(el){
      var max=parseFloat(el.getAttribute("data-tilt"))||8;
      el.addEventListener("mousemove",function(e){
        var r=el.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
        el.style.setProperty("--rx",((py-0.5)*-2*max).toFixed(2)+"deg");
        el.style.setProperty("--ry",((px-0.5)*2*max).toFixed(2)+"deg");
        el.style.setProperty("--gx",(px*100).toFixed(1)+"%");
        el.style.setProperty("--gy",(py*100).toFixed(1)+"%");
        el.classList.add("is-tilting");
      });
      el.addEventListener("mouseleave",function(){
        el.style.setProperty("--rx","0deg");el.style.setProperty("--ry","0deg");
        el.classList.remove("is-tilting");
      });
    });

    /* секция-фонарик */
    [].slice.call(document.querySelectorAll("[data-spotlight]")).forEach(function(el){
      el.addEventListener("mousemove",function(e){
        var r=el.getBoundingClientRect();
        el.style.setProperty("--mx",(e.clientX-r.left)+"px");
        el.style.setProperty("--my",(e.clientY-r.top)+"px");
        el.classList.add("is-lit");
      });
      el.addEventListener("mouseleave",function(){el.classList.remove("is-lit");});
    });

    /* магнитные кнопки */
    [].slice.call(document.querySelectorAll("[data-magnet]")).forEach(function(el){
      var strength=parseFloat(el.getAttribute("data-magnet"))||0.3;
      el.style.transition="transform .25s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("mousemove",function(e){
        var r=el.getBoundingClientRect();
        var dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
        el.style.transform="translate("+(dx*strength).toFixed(1)+"px,"+(dy*strength).toFixed(1)+"px)";
      });
      el.addEventListener("mouseleave",function(){el.style.transform="";});
    });
  }
})();
`;
