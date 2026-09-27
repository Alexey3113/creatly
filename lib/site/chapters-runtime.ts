/**
 * Chapters-runtime — движок «бесшовных глав» (референс: ролик Anthropic
 * «Can you believe Claude did this?»): полноэкранные сцены-главы, следующая
 * «съедает» предыдущую через маску (рваный край / шторка / перекатка),
 * поверх фона летает foreground-слой объектов с параллаксом.
 *
 * Принцип тот же, что у story-runtime: sticky-pin, скролл → прогресс, вся
 * хореография в CSS через переменные. Runtime считает и раздаёт:
 *   --p  (root)     — глобальный прогресс 0..1
 *   --tp (глава)    — прогресс ВХОДА главы: 0 = ещё не видна, 1 = накрыла
 *                     предыдущую (маска рисуется из --tp)
 *   --cp (глава)    — жизнь главы в своей зоне 0..1 (треки foreground-объектов,
 *                     дрейф слова, параллакс фона)
 *   --nt (глава)    — прогресс входа СЛЕДУЮЩЕЙ главы (уход: scale/затемнение)
 *
 * Маски перехода (--mask в CSS блока, переключается вариантами):
 *   torn    — рваный край бумаги: зубчатый polygon-клип, детерминированные
 *             зубцы на главу (seed = индекс);
 *   curtain — ровная шторка снизу со скруглённым верхом (inset+round);
 *   roll    — перекатка: клипа нет, CSS сам везёт слой transform-ом от --tp.
 *
 * Деградация: без JS (и в edit-канвасе) главы — обычные стек-панели 100svh
 * (CSS-дефолт). Движок включается классом .is-live только на десктопе без
 * prefers-reduced-motion; мобилки получают простой скролл — по нашему правилу.
 *
 * Разметка:
 *   [data-chapters]                — обёртка; высоту ставит runtime (N×160vh)
 *     [data-chapters-stage]        — sticky-сцена 100vh
 *       [data-chapter] × N         — слои глав (в .is-live — absolute inset:0)
 *         img|video (фон), [data-chapter-fg] — объекты, слово, подтекст
 *       [data-chapters-counter]    — опц. счётчик "02 / 04"
 */

export const chaptersRuntime = /* js */ `
(function(){
  var roots=[].slice.call(document.querySelectorAll("[data-chapters]"));
  if(!roots.length)return;
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var small=window.matchMedia("(max-width:819px)").matches;

  /* Композиция главы из поля chp-comp: "word=pos,size; a/b/c=pos,scale,rot".
     Применяется ВСЕГДА (и в флэт-режиме): раскладку решает AI/пользователь. */
  var FGPOS={lt:["8%","10%","auto"],lb:["6%","56%","auto"],rt:["auto","12%","7%"],rb:["auto","60%","8%"],c:["36%","26%","auto"],ct:["30%","8%","auto"],cb:["34%","58%","auto"]};
  function applyComp(ch){
    var f=ch.querySelector('[data-field="chp-comp"]');
    var txt=f?(f.textContent||"").trim():"";
    if(!txt)return;
    var fgs=[].slice.call(ch.querySelectorAll("[data-chapter-fg]"));
    txt.split(";").forEach(function(part){
      var kv=part.split("=");
      if(kv.length<2)return;
      var key=kv[0].trim().toLowerCase();
      var vals=kv[1].split(",").map(function(s){return s.trim().toLowerCase();});
      if(key==="word"){
        if(/^(lb|lt|rb|rt|c|cb|ct)$/.test(vals[0]))ch.classList.add("comp-w-"+vals[0]);
        var sc={xl:1,xxl:1.22,mega:1.45}[vals[1]];
        if(sc)ch.style.setProperty("--wscale",String(sc));
      } else if(key==="a"||key==="b"||key==="c"){
        var el=fgs["abc".indexOf(key)];
        if(!el)return;
        var p=FGPOS[vals[0]];
        if(p){el.style.left=p[0];el.style.top=p[1];el.style.right=p[2];el.style.marginLeft="0";}
        var s=parseFloat(vals[1]);
        if(s>=0.5&&s<=1.8)el.style.scale=String(s);
        var r=parseFloat(vals[2]);
        if(r>=-20&&r<=20)el.style.setProperty("--rot",r+"deg");
      }
    });
  }
  roots.forEach(function(root){
    [].slice.call(root.querySelectorAll("[data-chapter]")).forEach(applyComp);
  });

  /** Детерминированные зубцы рваного края (стабильны между кадрами). */
  function jagOffsets(seed,count){
    var out=[];
    for(var k=0;k<=count;k++){
      var v=Math.sin(seed*127.1+k*311.7)*43758.5453;
      out.push(v-Math.floor(v));
    }
    return out;
  }

  function tornClip(offs,tp){
    var amp=6;
    var base=(1-tp)*(112+amp)-amp;
    var n=offs.length-1;
    var pts=[];
    for(var k=0;k<=n;k++){
      pts.push((k*100/n).toFixed(2)+"% "+(base+offs[k]*amp).toFixed(2)+"%");
    }
    return "polygon("+pts.join(",")+",100% 130%,0% 130%)";
  }

  /* Срезанные углы: слой входит гранёной плитой — фаска на верхних углах. */
  function bevelClip(tp){
    var cut=8;
    var base=(1-tp)*(120+cut)-cut;
    return "polygon(0% "+(base+cut).toFixed(2)+"%,"+cut+"% "+base.toFixed(2)+"%,"+(100-cut)+"% "+base.toFixed(2)+"%,100% "+(base+cut).toFixed(2)+"%,100% 130%,0% 130%)";
  }

  var engines=roots.map(function(root){
    var chapters=[].slice.call(root.querySelectorAll("[data-chapter]"));
    if(chapters.length<2)return null;
    if(small||reduced){root.classList.add("is-flat");return null;}
    var mask=(getComputedStyle(root).getPropertyValue("--mask")||"").trim()||root.getAttribute("data-chapters-mask")||"torn";
    root.classList.add("is-live","is-live-"+mask);
    root.style.height=(chapters.length*160)+"vh";
    var items=chapters.map(function(ch,i){
      ch.style.zIndex=String(i+2);
      return {
        el:ch,
        video:ch.querySelector("video"),
        offs:jagOffsets(i+1,14),
        playing:false,tp:-1,
      };
    });
    return {root:root,items:items,counter:root.querySelector("[data-chapters-counter]"),mask:mask,active:-1};
  }).filter(Boolean);
  if(!engines.length)return;

  function clamp(v){return v<0?0:v>1?1:v;}

  function update(){
    var vh=window.innerHeight;
    for(var e=0;e<engines.length;e++){
      var eng=engines[e];
      var rect=eng.root.getBoundingClientRect();
      var total=rect.height-vh;
      if(total<=0)continue;
      var p=clamp(-rect.top/total);
      eng.root.style.setProperty("--p",p.toFixed(4));
      var n=eng.items.length;
      var z=p*n;
      var TW=0.42; /* доля зоны, за которую следующая глава накрывает текущую */

      for(var i=0;i<n;i++){
        var it=eng.items[i];
        var tp=i===0?1:clamp((z-(i-TW))/TW);
        var nt=i+1<n?clamp((z-(i+1-TW))/TW):0;
        var cp=clamp(z-i);
        var st=it.el.style;
        st.setProperty("--tp",tp.toFixed(4));
        st.setProperty("--cp",cp.toFixed(4));
        st.setProperty("--nt",nt.toFixed(4));

        if(eng.mask==="torn"){
          st.clipPath=i===0?"none":tornClip(it.offs,tp);
        } else if(eng.mask==="bevel"){
          st.clipPath=i===0?"none":bevelClip(tp);
        } else if(eng.mask==="curtain"){
          st.clipPath=i===0?"none":"inset("+((1-tp)*100).toFixed(2)+"% 0 -10% 0 round 28px 28px 0 0)";
        }
        /* roll: клипа нет — CSS везёт слой transform-ом от --tp */

        /* слой полностью скрыт до входа / полностью накрыт следующей */
        var engaged=tp>0.02&&nt<0.98;
        if(tp!==it.tp){it.el.classList.toggle("is-on",tp>0.02);it.tp=tp;}
        it.el.classList.toggle("is-covered",nt>=0.98);
        if(it.video){
          if(engaged&&!it.playing){it.video.muted=true;it.video.playsInline=true;it.video.play().catch(function(){});it.playing=true;}
          if(!engaged&&it.playing){it.video.pause();it.playing=false;}
        }
      }

      var idx=Math.min(n-1,Math.floor(z));
      if(idx!==eng.active){
        eng.active=idx;
        if(eng.counter)eng.counter.textContent=(idx+1<10?"0":"")+(idx+1)+" / "+(n<10?"0":"")+n;
      }
    }
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
})();
`;
