"use client";
/* EarthGlobe — НАСТОЯЩАЯ realtime-3D планета для Terra08 (three + @react-three/fiber).
   Сфера с кастомным GLSL: процедурные континенты (fbm), день/ночь-терминатор, огни городов на ночной
   стороне, fresnel-атмосфера (отдельная back-side оболочка), звёздное поле. Вращение по времени + dolly
   камеры и сдвиг солнца по глобальному скроллу (день→ночь). Fallback → статик-кадр при no-WebGL2 / reduced-motion.
   Один WebGL-контекст на страницу (SPEC). */
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const NOISE = `
float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vnoise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),
                 mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                 mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float a=0.5,s=0.0; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.02; a*=0.5; } return s; }
`;

const PLANET_VERT = `
varying vec3 vLocal; varying vec3 vWorldN; varying vec3 vWorldPos;
void main(){
  vLocal = normalize(position);
  vWorldN = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position,1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const PLANET_FRAG = `
precision highp float;
uniform float uScroll; uniform vec3 uSun;
varying vec3 vLocal; varying vec3 vWorldN; varying vec3 vWorldPos;
${NOISE}
void main(){
  vec3 n = normalize(vWorldN);
  // континенты (fbm по локальной позиции — привязаны к планете, вращаются с ней)
  float c = fbm(vLocal*2.1) + 0.5*fbm(vLocal*5.3);
  float land = smoothstep(0.72, 0.80, c);
  vec3 ocean = mix(vec3(0.015,0.09,0.22), vec3(0.04,0.20,0.40), fbm(vLocal*7.0));
  vec3 landc = mix(vec3(0.09,0.17,0.07), vec3(0.34,0.29,0.15), fbm(vLocal*6.0+3.0));
  landc = mix(landc, vec3(0.82,0.86,0.92), smoothstep(1.05,1.25,c)); // снежные пики
  vec3 dayCol = mix(ocean, landc, land);
  // освещение / терминатор
  float lt = dot(n, normalize(uSun));
  float day = smoothstep(-0.08, 0.22, lt);
  // огни городов — на суше, на ночной стороне
  float cityN = smoothstep(0.60, 0.66, fbm(vLocal*46.0));
  float cities = cityN * land * (1.0 - day);
  vec3 nightCol = vec3(0.004,0.012,0.03) + cities*vec3(1.0,0.72,0.36)*1.6;
  vec3 col = mix(nightCol, dayCol*(0.35+0.65*day), day);
  // тёплый ободок терминатора
  float term = smoothstep(0.0,0.16,lt) * (1.0 - smoothstep(0.16,0.42,lt));
  col += vec3(1.0,0.45,0.18) * term * 0.35;
  // дневная fresnel-дымка (голубая)
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fres = pow(1.0 - max(dot(viewDir,n),0.0), 3.0);
  col += vec3(0.20,0.52,0.92) * fres * 0.7 * day;
  col = pow(col, vec3(0.86)); // лёгкая гамма
  gl_FragColor = vec4(col, 1.0);
}`;

const ATM_VERT = `
varying vec3 vWorldN; varying vec3 vWorldPos;
void main(){
  vWorldN = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position,1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const ATM_FRAG = `
precision highp float;
uniform vec3 uSun;
varying vec3 vWorldN; varying vec3 vWorldPos;
void main(){
  vec3 n = normalize(vWorldN);
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float rim = pow(1.0 - max(dot(viewDir, -n), 0.0), 2.4);   // ободок на back-side оболочке
  float lit = max(dot(n, normalize(uSun)), 0.0);
  vec3 glow = vec3(0.28,0.58,1.0);
  gl_FragColor = vec4(glow, rim * (0.28 + 0.72*lit));
}`;

function Planet({ progress }: { progress: React.MutableRefObject<number> }) {
  const planetMat = useRef<THREE.ShaderMaterial>(null);
  const atmMat = useRef<THREE.ShaderMaterial>(null);
  const planet = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ uScroll: { value: 0 }, uSun: { value: new THREE.Vector3(1, 0.25, 0.4) } }), []);
  const atmUniforms = useMemo(() => ({ uSun: uniforms.uSun }), [uniforms]);

  useFrame((state, delta) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    if (planet.current) planet.current.rotation.y = t * 0.045 + p * 1.6;
    // солнце сдвигается по скроллу: день → терминатор → ночь
    const a = 1.15 + p * 2.7;
    uniforms.uSun.value.set(Math.cos(a), 0.28, Math.sin(a)).normalize();
    uniforms.uScroll.value = p;
    // dolly-in камеры
    const ez = p < 0.55 ? (p / 0.55) : 1.0;
    state.camera.position.z = 3.55 - (ez * ez * (3 - 2 * ez)) * 1.55;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <mesh ref={planet}>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial ref={planetMat} uniforms={uniforms} vertexShader={PLANET_VERT} fragmentShader={PLANET_FRAG} />
      </mesh>
      <mesh scale={1.16}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial ref={atmMat} uniforms={atmUniforms} vertexShader={ATM_VERT} fragmentShader={ATM_FRAG}
          transparent side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Stars() {
  const geo = useMemo(() => {
    const N = 1600; const pos = new Float32Array(N * 3);
    // детерминированный разброс (без Math.random — стабильно и SSR-safe)
    let s = 1;
    const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    for (let i = 0; i < N; i++) {
      const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = 26 + rnd() * 22;
      const q = Math.sqrt(1 - u * u);
      pos[i * 3] = Math.cos(th) * q * r; pos[i * 3 + 1] = u * r; pos[i * 3 + 2] = Math.sin(th) * q * r;
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); return g;
  }, []);
  return <points geometry={geo}><pointsMaterial size={0.11} color={0xcfe0ff} sizeAttenuation transparent opacity={0.9} /></points>;
}

export function EarthGlobe() {
  const progress = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl2 = false;
    try { gl2 = !!document.createElement("canvas").getContext("webgl2"); } catch { gl2 = false; }
    setOk(gl2 && !reduce);
    if (!(gl2 && !reduce)) return;
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      progress.current = p;
      if (wrap.current) wrap.current.style.opacity = String(1 - Math.max(0, Math.min(1, (p - 0.52) / 0.12)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  if (ok === false) return <div className="tr-globe-fallback" aria-hidden />;
  if (ok === null) return <div className="tr-globe3d" aria-hidden />;
  return (
    <div className="tr-globe3d" ref={wrap} aria-hidden>
      <Canvas gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3.55], fov: 38 }} dpr={[1, 2]}>
        <Stars />
        <Planet progress={progress} />
      </Canvas>
    </div>
  );
}
