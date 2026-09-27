/**
 * Text-runtime — покадровый текстовый движок для storytelling-блоков.
 *
 * Три режима через data-reveal (в дополнение к базовым up/fade/scale/clip
 * из render.ts):
 *   "word"      — слова появляются по одному со сдвигом, once на вход в вьюпорт
 *   "char"      — то же, но по буквам (плотный кинетический эффект)
 *   "highlight" — текст «загорается» слово за словом ПРОПОРЦИОНАЛЬНО тому,
 *                 как элемент проходит через вьюпорт при скролле (не once,
 *                 а непрерывно, как у Apple: серый текст «зажигается» по
 *                 мере чтения)
 *
 * Работает только на элементах с чистым текстом (без вложенной разметки) —
 * если внутри есть теги, элемент тихо пропускается, чтобы не сломать HTML.
 */

export const textRuntime = /* js */ `
(function(){
  function splitUnits(el,mode){
    if(el.querySelector("*"))return null;
    var text=el.textContent;
    var tokens=mode==="char"?Array.from(text):(text.match(/(\\S+|\\s+)/g)||[]);
    el.textContent="";
    var i=0;
    tokens.forEach(function(tok){
      if(mode!=="char"&&/^\\s+$/.test(tok)){el.appendChild(document.createTextNode(tok));return;}
      if(tok==="")return;
      var span=document.createElement("span");
      span.className="rv-unit";
      span.style.setProperty("--i",i++);
      span.textContent=tok;
      el.appendChild(span);
    });
    return el.querySelectorAll(".rv-unit");
  }

  /* ── word/char: разовое появление при входе в вьюпорт ── */
  var splitEls=[].slice.call(document.querySelectorAll('[data-reveal="word"],[data-reveal="char"]'));
  splitEls.forEach(function(el){splitUnits(el,el.getAttribute("data-reveal"));});
  if(splitEls.length){
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){en.target.classList.add("is-visible");io.unobserve(en.target);}
        });
      },{threshold:.2,rootMargin:"0px 0px -10% 0px"});
      splitEls.forEach(function(el){io.observe(el);});
    } else {
      splitEls.forEach(function(el){el.classList.add("is-visible");});
    }
    /* failsafe: если наблюдатель не сработал (скрытая вкладка и т.п.) */
    setTimeout(function(){splitEls.forEach(function(el){el.classList.add("is-visible");});},2500);
  }

  /* ── highlight: подсветка слов пропорционально проходу через вьюпорт ── */
  var hlItems=[].slice.call(document.querySelectorAll('[data-reveal="highlight"]'))
    .map(function(el){return {el:el,units:splitUnits(el,"word")||[]};})
    .filter(function(it){return it.units.length;});

  function clamp(v){return v<0?0:v>1?1:v;}
  function updateHighlight(){
    var vh=window.innerHeight;
    hlItems.forEach(function(it){
      var rect=it.el.getBoundingClientRect();
      var startY=vh*0.85,endY=vh*0.3;
      var p=clamp((startY-rect.top)/(startY-endY));
      var lit=Math.round(p*it.units.length);
      for(var i=0;i<it.units.length;i++)it.units[i].classList.toggle("is-lit",i<lit);
    });
  }
  if(hlItems.length){
    var ticking=false;
    window.addEventListener("scroll",function(){
      if(ticking)return;ticking=true;
      requestAnimationFrame(function(){updateHighlight();ticking=false;});
    },{passive:true});
    window.addEventListener("resize",updateHighlight,{passive:true});
    updateHighlight();
  }
})();
`;

export const textRuntimeCss = `
[data-reveal="word"] .rv-unit,[data-reveal="char"] .rv-unit{display:inline-block;opacity:0;transform:translateY(.5em);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1);transition-delay:calc(var(--i,0)*45ms)}
[data-reveal="char"] .rv-unit{transition-delay:calc(var(--i,0)*18ms)}
[data-reveal="word"].is-visible .rv-unit,[data-reveal="char"].is-visible .rv-unit{opacity:1;transform:none}
[data-reveal="highlight"] .rv-unit{color:var(--color-text-muted);transition:color .35s ease}
[data-reveal="highlight"] .rv-unit.is-lit{color:var(--color-text)}
@media(prefers-reduced-motion:reduce){
  [data-reveal="word"] .rv-unit,[data-reveal="char"] .rv-unit{opacity:1;transform:none;transition:none}
  [data-reveal="highlight"] .rv-unit{color:var(--color-text);transition:none}
}`;
