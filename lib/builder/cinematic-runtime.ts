/**
 * Cinematic animation runtime injected into every published page and preview iframe.
 *
 * Layer 1 — Lenis (always): buttery smooth scroll
 * Layer 2 — GSAP + ScrollTrigger (when [data-scene] or [data-parallax] found):
 *   • Cinematic scene transitions — clip-path peel, each section morphs into the next
 *   • Parallax depth — [data-parallax="0.3"] ties vertical offset to scroll progress
 *   • Floating assets — [data-float="20"] for gentle infinite up/down motion
 * Layer 3 — Three.js (when [data-webgl] found):
 *   • Animated mesh gradient canvas behind hero sections
 *   • Organic noise-based color flow with customizable palette via data-color1/2/3
 */

export const cinematicRuntime = /* js */ `
(function(){
  /* ── 0. Bail-out: reduced motion or no cinematic elements on page ── */
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var hasCinematic=document.querySelector('[data-scene],[data-parallax],[data-float],[data-scrub],[data-split],[data-webgl]');
  if(!hasCinematic)return;

  /* ── 1. Lenis smooth scroll ──
     Пропускаем в превью редактора И на страницах со story-секциями:
     sticky-pin истории управляются нативным скроллом, а инерция Lenis
     поверх них даёт «отдёргивание» (две системы скролла воюют). */
  if(window.__creatlyPreviewMode||document.querySelector('[data-story]')){initCinematic(null);}
  else{
  var LENIS_CDN='https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
  loadScript(LENIS_CDN,function(){
    var L=window.Lenis;if(!L)return initCinematic(null);
    var lenis=new L({duration:1.4,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true,wheelMultiplier:0.9});
    function raf(time){lenis.raf(time);requestAnimationFrame(raf);}
    requestAnimationFrame(raf);
    window.__creatlyLenis=lenis;
    initCinematic(lenis);
  });
  }

  /* ── 2. Detect required layers ── */
  function initCinematic(lenis){
    var needGSAP=document.querySelector('[data-scene],[data-parallax],[data-float],[data-scrub]');
    var needWebGL=document.querySelector('[data-webgl]');
    if(needGSAP)loadGSAP(lenis);
    if(needWebGL)loadThreeJS();
  }

  /* ── 3. GSAP + ScrollTrigger ── */
  var GSAP_CDN='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var ST_CDN='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

  function loadGSAP(lenis){
    loadScript(GSAP_CDN,function(){
      loadScript(ST_CDN,function(){initGSAP(lenis);});
    });
  }

  function initGSAP(lenis){
    var gsap=window.gsap,ST=window.ScrollTrigger;
    if(!gsap||!ST)return;
    gsap.registerPlugin(ST);

    /* Wire Lenis ↔ GSAP ticker */
    if(lenis){
      lenis.on('scroll',ST.update);
      gsap.ticker.add(function(t){lenis.raf(t*1000);});
      gsap.ticker.lagSmoothing(0);
    }

    /* ── 3a. Cinematic scene transitions ── */
    var scenes=[].slice.call(document.querySelectorAll('[data-scene]'));
    scenes.forEach(function(scene,i){
      if(i===0)return;

      /* Clip-path reveal: scene peels up from bottom */
      gsap.set(scene,{clipPath:'inset(100% 0 0 0)',zIndex:i+1,position:'relative'});
      gsap.to(scene,{
        clipPath:'inset(0% 0 0 0)',
        ease:'none',
        scrollTrigger:{
          trigger:scene,
          start:'top 100%',
          end:'top 0%',
          scrub:1.2,
        }
      });

      /* Pin previous scene while this one peels in */
      ST.create({
        trigger:scenes[i-1],
        start:'top top',
        end:'+=100%',
        pin:true,
        pinSpacing:false,
      });
    });

    /* ── 3b. Parallax depth: [data-parallax="0.3"] ── */
    document.querySelectorAll('[data-parallax]').forEach(function(el){
      var speed=parseFloat(el.dataset.parallax)||0.3;
      gsap.to(el,{
        yPercent:-100*speed,
        ease:'none',
        scrollTrigger:{
          trigger:el.closest('section')||el.parentElement||el,
          start:'top bottom',
          end:'bottom top',
          scrub:true,
        }
      });
    });

    /* ── 3c. Floating foreground assets: [data-float="24"] ── */
    document.querySelectorAll('[data-float]').forEach(function(el){
      var amp=parseFloat(el.dataset.float)||20;
      var dur=2.8+Math.random()*2.4;
      gsap.to(el,{y:amp,duration:dur,ease:'sine.inOut',yoyo:true,repeat:-1,delay:Math.random()*dur});
    });

    /* ── 3d. Scrub-tied elements: [data-scrub="opacity:0,1"] ── */
    document.querySelectorAll('[data-scrub]').forEach(function(el){
      var def=el.dataset.scrub||'';
      var fromProps={},toProps={};
      def.split(';').forEach(function(pair){
        var m=pair.match(/^([a-zA-Z]+):([\d.,]+),([\d.,]+)$/);
        if(!m)return;
        var prop=m[1],from=parseFloat(m[2]),to=parseFloat(m[3]);
        fromProps[prop]=from;toProps[prop]=to;
      });
      if(Object.keys(toProps).length){
        gsap.fromTo(el,fromProps,Object.assign({ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'bottom 20%',scrub:1}},toProps));
      }
    });

    /* ── 3e. Text split stagger on scroll ── */
    document.querySelectorAll('[data-split]').forEach(function(el){
      var text=el.textContent||'';
      var words=text.split(' ').map(function(w){return'<span style="display:inline-block;overflow:hidden"><span class="__cw">'+w+'</span></span>';}).join(' ');
      el.innerHTML=words;
      var spans=el.querySelectorAll('.__cw');
      gsap.set(spans,{yPercent:110});
      ST.create({
        trigger:el,
        start:'top 85%',
        onEnter:function(){gsap.to(spans,{yPercent:0,duration:.9,stagger:.06,ease:'power3.out'});},
        once:true,
      });
    });
  }

  /* ── 4. Three.js WebGL mesh gradient ── */
  var THREE_CDN='https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';

  function loadThreeJS(){loadScript(THREE_CDN,initWebGL);}

  function initWebGL(){
    document.querySelectorAll('[data-webgl="mesh-gradient"]').forEach(function(canvas){
      try{initMeshGradient(canvas);}catch(e){}
    });
    document.querySelectorAll('[data-webgl="particles"]').forEach(function(canvas){
      try{initParticles(canvas);}catch(e){}
    });
  }

  /* ── 4a. Animated mesh gradient (organic noise shader) ── */
  function resolveColor(val,fallback){
    if(!val)return fallback;
    /* If it's a CSS var like var(--color-primary,#667eea), extract the fallback hex */
    var m=val.match(/var\([^,)]+,\s*([#\w]+)\)/);
    if(m)return m[1];
    return val;
  }

  function initMeshGradient(canvas){
    var THREE=window.THREE;
    if(!THREE||!canvas)return;
    if(!testWebGL())return;
    var parent=canvas.parentElement;
    var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:false,antialias:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
    var scene=new THREE.Scene();
    var cam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);

    var uniforms={
      uTime:{value:0},
      uC1:{value:new THREE.Color(resolveColor(canvas.dataset.color1,'#667eea'))},
      uC2:{value:new THREE.Color(resolveColor(canvas.dataset.color2,'#764ba2'))},
      uC3:{value:new THREE.Color(resolveColor(canvas.dataset.color3,'#f093fb'))},
      uC4:{value:new THREE.Color(resolveColor(canvas.dataset.color4,'#0f0c29'))},
    };

    var mat=new THREE.ShaderMaterial({
      uniforms:uniforms,
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}',
      fragmentShader:[
        'uniform float uTime;',
        'uniform vec3 uC1,uC2,uC3,uC4;',
        'varying vec2 vUv;',
        'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
        'float noise(vec2 p){',
        '  vec2 i=floor(p),f=fract(p);',
        '  f=f*f*(3.0-2.0*f);',
        '  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);',
        '}',
        'float fbm(vec2 p){float v=0.,a=0.5;vec2 s=vec2(1.);for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.0+s;a*=0.5;}return v;}',
        'void main(){',
        '  vec2 uv=vUv;float t=uTime*0.18;',
        '  float n=fbm(uv*2.4+vec2(t,t*0.7));',
        '  float m=fbm(uv*3.1+vec2(-t*0.9,t*1.1));',
        '  float k=fbm(uv*1.7+vec2(t*0.4,-t*0.5));',
        '  vec3 col=mix(uC4,uC1,smoothstep(0.2,0.8,n));',
        '  col=mix(col,uC2,smoothstep(0.3,0.85,m));',
        '  col=mix(col,uC3,smoothstep(0.45,0.9,k)*0.55);',
        '  gl_FragColor=vec4(col,1.0);',
        '}',
      ].join('\\n'),
    });

    var mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat);
    scene.add(mesh);

    function resize(){
      var w=parent.clientWidth,h=parent.clientHeight||window.innerHeight;
      renderer.setSize(w,h,false);
      canvas.style.width=w+'px';canvas.style.height=h+'px';
    }
    resize();
    window.addEventListener('resize',resize);

    var raf,alive=true;
    function tick(t){
      if(!alive)return;
      raf=requestAnimationFrame(tick);
      uniforms.uTime.value=t*0.001;
      renderer.render(scene,cam);
    }
    raf=requestAnimationFrame(tick);
    document.addEventListener('visibilitychange',function(){
      if(document.hidden){alive=false;cancelAnimationFrame(raf);}
      else{alive=true;raf=requestAnimationFrame(tick);}
    });
  }

  /* ── 4b. Floating particles field ── */
  function initParticles(canvas){
    var THREE=window.THREE;
    if(!THREE||!canvas)return;
    if(!testWebGL())return;
    var parent=canvas.parentElement;
    var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:false});
    renderer.setClearColor(0x000000,0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    var scene=new THREE.Scene();
    var cam=new THREE.PerspectiveCamera(60,1,0.1,1000);
    cam.position.z=5;

    var count=parseInt(canvas.dataset.count||'120');
    var positions=new Float32Array(count*3);
    var velocities=[];
    for(var i=0;i<count;i++){
      positions[i*3]=(Math.random()-0.5)*12;
      positions[i*3+1]=(Math.random()-0.5)*8;
      positions[i*3+2]=(Math.random()-0.5)*6;
      velocities.push({x:(Math.random()-0.5)*0.002,y:(Math.random()-0.5)*0.002+0.001,z:0});
    }
    var geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    var mat=new THREE.PointsMaterial({color:new THREE.Color(canvas.dataset.color||'#ffffff'),size:parseFloat(canvas.dataset.size||'0.04'),transparent:true,opacity:parseFloat(canvas.dataset.opacity||'0.6'),sizeAttenuation:true});
    var points=new THREE.Points(geo,mat);
    scene.add(points);

    function resize(){
      var w=parent.clientWidth,h=parent.clientHeight||window.innerHeight;
      cam.aspect=w/h;cam.updateProjectionMatrix();
      renderer.setSize(w,h,false);
    }
    resize();
    window.addEventListener('resize',resize);

    var alive=true,rafId;
    function tick(){
      if(!alive)return;
      rafId=requestAnimationFrame(tick);
      var pos=geo.attributes.position.array;
      for(var i=0;i<count;i++){
        pos[i*3]+=velocities[i].x;
        pos[i*3+1]+=velocities[i].y;
        if(pos[i*3+1]>5){pos[i*3+1]=-5;}
        if(Math.abs(pos[i*3])>7){velocities[i].x*=-1;}
      }
      geo.attributes.position.needsUpdate=true;
      renderer.render(scene,cam);
    }
    rafId=requestAnimationFrame(tick);
    document.addEventListener('visibilitychange',function(){
      if(document.hidden){alive=false;cancelAnimationFrame(rafId);}
      else{alive=true;rafId=requestAnimationFrame(tick);}
    });
  }

  /* ── Helpers ── */
  function loadScript(src,cb){
    var s=document.createElement('script');
    s.src=src;s.async=true;
    s.onload=cb;s.onerror=function(){cb&&cb();};
    document.head.appendChild(s);
  }

  function testWebGL(){
    try{var c=document.createElement('canvas');return!!(c.getContext('webgl')||c.getContext('experimental-webgl'));}
    catch(e){return false;}
  }
})();
`;
