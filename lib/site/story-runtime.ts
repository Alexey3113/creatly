/**
 * Story-runtime — движок storytelling-секций (scroll-driven сторителлинг).
 *
 * Паттерн: sticky-pin. Обёртка [data-story] высокая (N+1 экранов), внутри
 * [data-story-stage] прилипает на 100vh. Прогресс прохождения обёртки (0..1)
 * управляет всем: шаги текста, скраб видео, CSS-переменная --p для любых
 * эффектов в CSS блока. Скролл никогда не блокируется — назад/вперёд/свайп
 * работают нативно, деградация без JS: виден первый шаг.
 *
 * Видео-скраб — по главам с «докруткой»: у каждого шага есть таймкод-цель
 * (data-field="…-step-time", скрытый элемент) — момент видео, соответствующий
 * этому шагу. Как только шаг становится активным, видео САМО плавно доезжает
 * до его таймкода с ограниченной скоростью — вся середина проигрывается и
 * видна, независимо от того, как быстро пользователь скроллил. Назад — так же,
 * к таймкоду предыдущего шага. Если таймкоды не заданы — точки раскладываются
 * поровну по длительности видео после loadedmetadata.
 *
 * Режим «по шагам» — data-story-gesture="steps" на [data-story]:
 * пока сцена приклеена, каждый жест (тик колеса / свайп) — это ровно один
 * переход к следующему/предыдущему шагу: страница сама плавно доезжает до
 * зоны шага (~750ms), на время перехода скролл блокируется, видео докручивает
 * свою главу. На краях (первый шаг назад / последний вперёд) скролл
 * отпускается нативно — застрять внутри секции невозможно.
 *
 * Разметка:
 *   [data-story]                     — обёртка (высоту задаёт CSS блока)
 *     [data-story-stage]             — sticky-сцена 100vh
 *       video[data-story-video]      — опц.; data-story-mode="scrub" | "play"
 *       [data-story-step] × N        — шаги; runtime вешает .is-active
 *         [data-field$="-step-time"] — опц.; таймкод главы в секундах (скрытый элемент)
 *       [data-story-bar]             — опц. индикатор: ширина через --p
 *       [data-story-counter]         — опц. текстовый счётчик "02 / 05"
 */

export const storyRuntime = /* js */ `
(function(){
  var stories=[].slice.call(document.querySelectorAll("[data-story]"));
  if(!stories.length)return;
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /** Таймкоды глав из шагов; null для тех, что нужно доразложить авто-фолбэком. */
  function readChapterFields(steps){
    return steps.map(function(stepEl){
      var el=stepEl.querySelector('[data-field$="-step-time"]');
      var raw=el?el.textContent.trim():"";
      var v=raw===""?NaN:parseFloat(raw);
      return isNaN(v)?null:v;
    });
  }

  /** Заполняет пропущенные главы равномерно по длительности (один раз, когда duration известна). */
  function ensureChapters(st){
    if(st.chapters||!st.chapterFields)return;
    var dur=st.video.duration;
    if(!dur||!isFinite(dur))return;
    var n=st.chapterFields.length;
    st.chapters=st.chapterFields.map(function(v,i){
      if(v!=null)return Math.min(v,dur-0.05);
      /* авто: шаг 1 в начале, последний — у конца ролика */
      return Math.min(dur*(n>1?i/(n-1):1),dur-0.05);
    });
  }

  var items=stories.map(function(root){
    var steps=[].slice.call(root.querySelectorAll("[data-story-step]"));
    var video=root.querySelector("[data-story-video]");
    var counter=root.querySelector("[data-story-counter]");
    var mode=video?(video.getAttribute("data-story-mode")||"play"):null;
    var st={
      root:root,steps:steps,video:video,mode:mode,counter:counter,
      active:-1,seekReady:false,playing:false,
      gesture:root.getAttribute("data-story-gesture")==="steps",
      chapterFields:steps.length?readChapterFields(steps):null,
      chapters:null,seekTarget:null,
    };
    /* высота истории адаптируется к числу шагов: (N+1) экранов */
    if(steps.length)root.style.height=((steps.length+1)*100)+"vh";
    if(video){
      video.muted=true;video.playsInline=true;
      if(mode==="scrub"){
        video.preload="auto";
        var mark=function(){if(video.duration&&isFinite(video.duration)){st.seekReady=true;ensureChapters(st);}};
        if(video.readyState>=1)mark();
        video.addEventListener("loadedmetadata",mark);
        /* если видео не сикается (стрим/кодек) — тихо падаем в play */
        video.addEventListener("error",function(){st.mode="play";});
      }
    }
    return st;
  });

  function clamp(v){return v<0?0:v>1?1:v;}

  function update(){
    var vh=window.innerHeight;
    for(var i=0;i<items.length;i++){
      var st=items[i];
      var rect=st.root.getBoundingClientRect();
      var total=rect.height-vh;
      if(total<=0)continue;
      var p=clamp(-rect.top/total);
      st.root.style.setProperty("--p",p.toFixed(4));

      /* активный шаг: равные доли прогресса */
      var n=st.steps.length;
      if(n){
        var idx=Math.min(n-1,Math.floor(p*n));
        if(rect.top>vh*0.5)idx=-1; /* ещё не дошли */
        if(idx!==st.active){
          st.active=idx;
          for(var s=0;s<n;s++){
            st.steps[s].classList.toggle("is-active",s===idx);
            st.steps[s].classList.toggle("is-passed",s<idx);
          }
          if(st.counter&&idx>=0)st.counter.textContent=(idx+1<10?"0":"")+(idx+1)+" / "+(n<10?"0":"")+n;
        }
      }

      /* видео: скраб по главам шагов, а не по всей длине линейно */
      if(st.video){
        var inView=rect.top<vh&&rect.bottom>0;
        if(st.mode==="play"){
          if(inView&&!st.playing){st.video.play().catch(function(){});st.playing=true;}
          if(!inView&&st.playing){st.video.pause();st.playing=false;}
        } else if(st.mode==="scrub"&&n){
          if(st.gesture){
            /* жестовый режим: докинг к таймкоду активного шага (плавный доезд) */
            ensureChapters(st);
            if(st.chapters){
              var chIdx=Math.max(0,Math.min(n-1,Math.floor(p*n)));
              st.seekTarget=st.chapters[chIdx];
            }
          } else {
            /* непрерывный скраб: видео идёт ЛИНЕЙНО по всей длине — равномерно и
               гладко от первого кадра до последнего. Таймкоды глав НЕ управляют
               скоростью (иначе первая зона 0→step-time даёт мёртвый медленный
               старт); смену текста ведёт отдельный idx по равным зонам (см. выше). */
            var dur=st.video.duration;
            if(dur&&isFinite(dur))st.seekTarget=p*(dur-0.05);
          }
        }
      }
    }
    requestAnimationFrame(scrubTick);
  }

  /*
   * «Докрутка» к главе. Два принципа:
   * 1) пишем currentTime только когда предыдущий seek завершился
   *    (video.seeking===false) — иначе браузер обрывает недосеканные кадры
   *    и картинка замирает;
   * 2) едем к цели НЕ мгновенно, а с ограниченной скоростью (cap на шаг) —
   *    вся середина между главами реально проигрывается на экране,
   *    вперёд и назад, независимо от скорости скролла.
   */
  var scrubbing=false;
  function scrubTick(){
    if(scrubbing)return;
    scrubbing=true;
    (function loop(){
      var again=false;
      for(var i=0;i<items.length;i++){
        var st=items[i];
        if(st.mode!=="scrub"||!st.seekReady||st.seekTarget==null)continue;
        if(st.video.seeking){again=true;continue;}
        var cur=st.video.currentTime;
        var delta=st.seekTarget-cur;
        if(Math.abs(delta)<=0.04)continue;
        if(reduced){try{st.video.currentTime=st.seekTarget;}catch(e){}continue;}
        if(!st.gesture){
          /* непрерывный скраб: видео зеркалит скролл напрямую (цель уже
             движется плавно вместе со скроллом, потолок скорости не нужен) */
          try{st.video.currentTime=st.seekTarget;}catch(e){}
          again=true;
          continue;
        }
        /* жест: экспоненциальный доезд с потолком скорости (~2.5x реального) */
        var step=delta*0.12;
        var cap=0.085;
        if(step>cap)step=cap;else if(step<-cap)step=-cap;
        if(Math.abs(step)<0.02)step=(delta>0?1:-1)*Math.min(0.02,Math.abs(delta));
        try{st.video.currentTime=cur+step;}catch(e){}
        again=true;
      }
      if(again)requestAnimationFrame(loop);else scrubbing=false;
    })();
  }

  var ticking=false;
  function onScroll(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(function(){update();ticking=false;});
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",onScroll,{passive:true});
  update();

  /* ── Жестовый режим: 1 тик = 1 шаг ── */
  var stepped=items.filter(function(st){return st.gesture&&st.steps.length>1;});
  if(stepped.length&&!reduced&&!window.__creatlyPreviewMode){
    var animating=false,cooldownUntil=0;

    function engagedStory(){
      var vh=window.innerHeight;
      for(var i=0;i<stepped.length;i++){
        var rect=stepped[i].root.getBoundingClientRect();
        if(rect.top<=1&&rect.bottom>=vh-1)return stepped[i];
      }
      return null;
    }
    /* позиция скролла для центра зоны шага idx */
    function zoneY(st,idx){
      var vh=window.innerHeight;
      var rect=st.root.getBoundingClientRect();
      var top=window.scrollY+rect.top;
      var total=rect.height-vh;
      return top+((idx+0.5)/st.steps.length)*total;
    }
    function easeInOut(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
    function animateTo(y,ms){
      animating=true;
      var from=window.scrollY,t0=null;
      function frame(ts){
        if(t0===null)t0=ts;
        var p=Math.min(1,(ts-t0)/ms);
        window.scrollTo(0,from+(y-from)*easeInOut(p));
        if(p<1)requestAnimationFrame(frame);
        else{animating=false;cooldownUntil=performance.now()+350;}
      }
      requestAnimationFrame(frame);
    }
    function tryStep(st,dir){
      var next=st.active+dir;
      if(next<0||next>st.steps.length-1)return false; /* край — отпускаем скролл */
      animateTo(zoneY(st,next),750);
      return true;
    }
    function gate(e,dir){
      var st=engagedStory();
      if(!st)return;
      /* хвост инерции жеста во время/сразу после перехода глотаем */
      if(animating||performance.now()<cooldownUntil){e.preventDefault();return;}
      if(dir!==0&&tryStep(st,dir))e.preventDefault();
    }
    window.addEventListener("wheel",function(e){
      gate(e,e.deltaY>4?1:e.deltaY<-4?-1:0);
    },{passive:false});

    var touchY=null;
    window.addEventListener("touchstart",function(e){
      touchY=e.touches[0].clientY;
    },{passive:true});
    window.addEventListener("touchmove",function(e){
      if(touchY===null)return;
      var st=engagedStory();
      if(!st)return;
      if(animating||performance.now()<cooldownUntil){e.preventDefault();return;}
      var dy=touchY-e.touches[0].clientY;
      if(Math.abs(dy)>28){
        if(tryStep(st,dy>0?1:-1))e.preventDefault();
        touchY=null;
      } else e.preventDefault();
    },{passive:false});
    window.addEventListener("touchend",function(){touchY=null;},{passive:true});
    window.addEventListener("keydown",function(e){
      if(e.key!=="ArrowDown"&&e.key!=="ArrowUp"&&e.key!=="PageDown"&&e.key!=="PageUp")return;
      gate(e,(e.key==="ArrowDown"||e.key==="PageDown")?1:-1);
    });
  }
})();
`;
