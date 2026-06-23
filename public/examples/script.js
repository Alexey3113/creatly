const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const urlParams = new URLSearchParams(window.location.search);
const flightMode = urlParams.has("flight");
const recordMode = urlParams.has("record");
const forceLiteMode = urlParams.has("lite");
const forceFullMode = urlParams.has("full");
const lowPowerMode =
  !forceFullMode &&
  !flightMode &&
  !recordMode &&
  (forceLiteMode ||
    reducedMotion ||
    window.matchMedia("(max-width: 760px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4));

document.body.classList.remove("is-loading");
document.body.classList.add("effects-pending");
document.body.classList.toggle("flight-mode", flightMode);
document.body.classList.toggle("record-mode", recordMode);
document.body.classList.toggle("low-power", lowPowerMode);

function runWhenIdle(callback, timeout = 900) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }
  setTimeout(callback, Math.min(timeout, 300));
}

function scheduleFrame(callback, delay = 0) {
  if (delay > 0) {
    setTimeout(() => requestAnimationFrame(callback), delay);
    return;
  }
  requestAnimationFrame(callback);
}

window.addEventListener("load", () => {
  document.body.classList.remove("is-loading", "effects-pending");
});
runWhenIdle(() => document.body.classList.remove("is-loading", "effects-pending"), 400);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px 12% 0px" },
);

$$(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 45, 135)}ms`;
  revealObserver.observe(element);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.65 },
);

$$("[data-count]").forEach((element) => countObserver.observe(element));

function animateCount(element) {
  const target = Number(element.dataset.count);
  const duration = reducedMotion ? 0 : 1500;
  const startedAt = performance.now();

  function tick(now) {
    const progress = duration ? Math.min((now - startedAt) / duration, 1) : 1;
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const header = $("[data-header]");
const navLinks = $$(".nav a");
const sections = navLinks
  .map((link) => $(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

let navScrollLock = false;

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("is-active"));
    link.classList.add("is-active");
    navScrollLock = true;
    setTimeout(() => { navScrollLock = false; }, 1000);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    if (navScrollLock) return;
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-20% 0px -40% 0px", threshold: [0.1, 0.3, 0.6] },
);

sections.forEach((section) => sectionObserver.observe(section));

const cursor = $(".cursor");
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursorPosition = { x: mouse.x, y: mouse.y };

if (!lowPowerMode && cursor) {
  window.addEventListener("pointermove", (event) => {
    mouse = { x: event.clientX, y: event.clientY };
  });

  function renderCursor() {
    cursorPosition.x += (mouse.x - cursorPosition.x) * 0.16;
    cursorPosition.y += (mouse.y - cursorPosition.y) * 0.16;
    cursor.style.left = `${cursorPosition.x}px`;
    cursor.style.top = `${cursorPosition.y}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}

$$("a, button, .tilt-card").forEach((element) => {
  element.addEventListener("pointerenter", () => cursor?.classList.add("is-active"));
  element.addEventListener("pointerleave", () => cursor?.classList.remove("is-active"));
});

$$(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    if (reducedMotion || window.innerWidth < 900) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.translate = `${x * 0.12}px ${y * 0.16}px`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.translate = "";
  });
});

$$(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion || window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.rotate = `${-y * 5}deg ${x * 7}deg`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.rotate = "";
  });
});

const scene = $("[data-scene]");
const orbitStage = $(".orbit-stage");
const arcMap = $(".arc-map");
const heroVortex = $(".hero-vortex");
let sceneTarget = { x: 0, y: 0 };
let sceneCurrent = { x: 0, y: 0 };
let sceneVisible = true;
const sceneParallaxEnabled = false;

if (scene) {
  scene.addEventListener("pointermove", (event) => {
    const rect = scene.getBoundingClientRect();
    sceneTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    sceneTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  scene.addEventListener("pointerleave", () => {
    sceneTarget = { x: 0, y: 0 };
  });
}

function resetSceneTransforms() {
  if (orbitStage) orbitStage.style.transform = "";
  if (arcMap) arcMap.style.transform = "";
  if (heroVortex) heroVortex.style.transform = "";
}

function renderScene() {
  if (!sceneParallaxEnabled) {
    resetSceneTransforms();
    return;
  }

  if (lowPowerMode) {
    resetSceneTransforms();
    return;
  }

  if (!sceneVisible && !flightMode) {
    scheduleFrame(renderScene, 180);
    return;
  }

  if (flightMode) {
    const time = performance.now() * 0.00035;
    sceneTarget.x = Math.sin(time) * 0.95;
    sceneTarget.y = Math.cos(time * 0.8) * 0.55;
  }

  sceneCurrent.x += (sceneTarget.x - sceneCurrent.x) * 0.055;
  sceneCurrent.y += (sceneTarget.y - sceneCurrent.y) * 0.055;

  if (orbitStage) orbitStage.style.transform = `rotateX(${sceneCurrent.y * -4}deg) rotateY(${sceneCurrent.x * 7}deg)`;
  if (arcMap) arcMap.style.transform = `translate3d(${sceneCurrent.x * 24}px, ${sceneCurrent.y * 18}px, 0)`;
  if (heroVortex) heroVortex.style.transform = `translate3d(${sceneCurrent.x * -18}px, ${sceneCurrent.y * 12}px, 0) rotateX(${62 + sceneCurrent.y * 4}deg) rotateZ(${-18 + sceneCurrent.x * 5}deg)`;

  scheduleFrame(renderScene);
}
const sceneVisibilityObserver = new IntersectionObserver(
  ([entry]) => {
    sceneVisible = entry.isIntersecting;
  },
  { rootMargin: "220px 0px" },
);
if (scene) sceneVisibilityObserver.observe(scene);
if (sceneParallaxEnabled) runWhenIdle(renderScene, 700);

const projectFlow = $("[data-project-flow]");
const flowCards = $$("[data-flow-card]");
const flowCurrent = $("[data-flow-current]");
const flowPrev = $("[data-flow-prev]");
const flowNext = $("[data-flow-next]");

if (projectFlow && flowCards.length) {
  const flowPositions = {
    "-2": { x: -330, y: 36, r: -18, s: 0.74, opacity: 0.28, blur: 1.8, z: 1 },
    "-1": { x: -176, y: -18, r: -9, s: 0.88, opacity: 0.74, blur: 0.4, z: 3 },
    0: { x: 0, y: -48, r: 0, s: 1.08, opacity: 1, blur: 0, z: 6 },
    1: { x: 176, y: -18, r: 9, s: 0.88, opacity: 0.74, blur: 0.4, z: 3 },
    2: { x: 330, y: 36, r: 18, s: 0.74, opacity: 0.28, blur: 1.8, z: 1 },
  };
  let flowIndex = 0;
  let flowDrag = null;
  let flowVisible = true;
  let flowAutoTimer = null;
  let flowSuppressClick = false;

  function getFlowOffset(index) {
    const half = Math.floor(flowCards.length / 2);
    return ((index - flowIndex + flowCards.length + half) % flowCards.length) - half;
  }

  function updateProjectFlow(nextIndex = flowIndex) {
    flowIndex = (nextIndex + flowCards.length) % flowCards.length;

    flowCards.forEach((card, index) => {
      const offset = getFlowOffset(index);
      const position = flowPositions[offset] || flowPositions[0];
      card.style.setProperty("--x", `${position.x}px`);
      card.style.setProperty("--y", `${position.y}px`);
      card.style.setProperty("--r", `${position.r}deg`);
      card.style.setProperty("--s", position.s);
      card.style.setProperty("--opacity", position.opacity);
      card.style.setProperty("--blur", `${position.blur}px`);
      card.style.setProperty("--z", position.z);
      card.classList.toggle("is-active", offset === 0);
      card.tabIndex = offset === 0 ? 0 : -1;
      card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });

    if (flowCurrent) flowCurrent.textContent = String(flowIndex + 1).padStart(2, "0");
  }

  function scheduleFlowAuto() {
    clearTimeout(flowAutoTimer);
    if (reducedMotion || lowPowerMode) return;
    flowAutoTimer = setTimeout(() => {
      if (flowVisible && !flowDrag) updateProjectFlow(flowIndex + 1);
      scheduleFlowAuto();
    }, flightMode ? 2400 : 3600);
  }

  flowPrev?.addEventListener("click", () => {
    updateProjectFlow(flowIndex - 1);
    scheduleFlowAuto();
  });

  flowNext?.addEventListener("click", () => {
    updateProjectFlow(flowIndex + 1);
    scheduleFlowAuto();
  });

  projectFlow.addEventListener("pointerdown", (event) => {
    if (window.innerWidth <= 640 || event.target.closest("button")) return;
    flowDrag = { x: event.clientX, moved: false };
    projectFlow.setPointerCapture(event.pointerId);
  });

  projectFlow.addEventListener("pointermove", (event) => {
    if (!flowDrag) return;
    if (Math.abs(event.clientX - flowDrag.x) > 8) flowDrag.moved = true;
  });

  projectFlow.addEventListener("pointerup", (event) => {
    if (!flowDrag) return;
    const delta = event.clientX - flowDrag.x;
    const moved = flowDrag.moved;
    flowDrag = null;

    if (Math.abs(delta) > 48) {
      updateProjectFlow(delta < 0 ? flowIndex + 1 : flowIndex - 1);
      scheduleFlowAuto();
    }

    if (moved) {
      flowSuppressClick = true;
      setTimeout(() => { flowSuppressClick = false; }, 0);
    }
  });

  projectFlow.addEventListener("pointercancel", () => {
    flowDrag = null;
  });

  projectFlow.addEventListener("click", (event) => {
    if (!flowSuppressClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  const flowObserver = new IntersectionObserver(
    ([entry]) => {
      flowVisible = entry.isIntersecting;
    },
    { rootMargin: "180px 0px" },
  );
  flowObserver.observe(projectFlow);

  updateProjectFlow(0);
  runWhenIdle(scheduleFlowAuto, 1200);
}

function initHeroWebGL() {
  const webglCanvas = $(".hero-webgl");
  if (!webglCanvas || reducedMotion || lowPowerMode) return null;

  const gl =
    webglCanvas.getContext("webgl", { antialias: false, alpha: true, powerPreference: "high-performance" }) ||
    webglCanvas.getContext("experimental-webgl", { antialias: false, alpha: true });

  if (!gl) {
    webglCanvas.classList.add("is-fallback");
    return null;
  }

  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    uniform float u_scroll;

    mat2 rotate2d(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float lineGlow(float value, float width) {
      return smoothstep(width, 0.0, abs(value));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      vec2 pointer = (u_pointer * 2.0 - 1.0);
      pointer.x *= u_resolution.x / u_resolution.y;

      vec2 p = uv;
      p -= vec2(0.42, 0.08);
      p += pointer * 0.12;
      p *= rotate2d(-0.32 + pointer.x * 0.08);

      float radius = length(p);
      float angle = atan(p.y, p.x);
      float tunnel = 0.0;

      for (float i = 0.0; i < 7.0; i += 1.0) {
        float wave = sin(radius * (10.0 + i * 1.65) - u_time * (0.78 + i * 0.08) + angle * (3.0 + i * 0.42));
        float ring = lineGlow(wave, 0.055 + i * 0.002);
        float gate = smoothstep(1.55, 0.05, radius) * smoothstep(0.03, 0.5, radius);
        tunnel += ring * gate * (0.18 + i * 0.035);
      }

      float spiral = sin(angle * 8.0 + radius * 19.0 - u_time * 1.6);
      float spiralGlow = lineGlow(spiral, 0.08) * smoothstep(1.35, 0.02, radius);

      vec2 grid = p * rotate2d(u_time * 0.035);
      float net = 0.0;
      net += lineGlow(fract(grid.x * 9.0 + sin(grid.y * 3.0 + u_time) * 0.08) - 0.5, 0.018);
      net += lineGlow(fract(grid.y * 7.0 + cos(grid.x * 2.0 - u_time) * 0.08) - 0.5, 0.018);
      net *= smoothstep(1.35, 0.08, radius) * 0.22;

      float grain = noise(uv * 180.0 + u_time);
      float nebula = noise(p * 2.2 + vec2(u_time * 0.04, -u_time * 0.03));
      float pulse = 0.72 + 0.28 * sin(u_time * 1.7);

      vec3 cyan = vec3(0.20, 0.92, 1.0);
      vec3 mint = vec3(0.20, 1.0, 0.66);
      vec3 violet = vec3(0.50, 0.32, 1.0);
      vec3 lime = vec3(0.85, 1.0, 0.28);
      vec3 pink = vec3(1.0, 0.22, 0.78);

      vec3 color = vec3(0.0);
      color += mix(violet, cyan, smoothstep(-1.4, 1.4, uv.x)) * nebula * 0.22;
      color += mix(cyan, mint, radius) * tunnel * pulse;
      color += mix(lime, pink, smoothstep(-0.6, 0.9, sin(angle * 2.0 + u_time))) * spiralGlow * 0.38;
      color += cyan * net;

      float core = smoothstep(0.22, 0.0, radius);
      color += vec3(0.75, 1.0, 0.82) * core * (1.2 + pulse * 0.4);

      float vignette = smoothstep(1.35, 0.15, length(uv + vec2(-0.1, 0.02)));
      color *= vignette;
      color += (grain - 0.5) * 0.045;

      float alpha = clamp((tunnel + spiralGlow * 0.65 + nebula * 0.18 + core) * 0.92, 0.0, 0.96);
      alpha *= smoothstep(1.55, 0.14, length(uv));
      alpha *= 1.0 - u_scroll * 0.44;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    return null;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const pointerLocation = gl.getUniformLocation(program, "u_pointer");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const scrollLocation = gl.getUniformLocation(program, "u_scroll");

  const state = {
    pointerX: 0.62,
    pointerY: 0.42,
    targetX: 0.62,
    targetY: 0.42,
    scroll: 0,
    visible: true,
  };

  const webglObserver = new IntersectionObserver(
    ([entry]) => {
      state.visible = entry.isIntersecting;
    },
    { rootMargin: "180px 0px" },
  );
  webglObserver.observe(webglCanvas);

  function resize() {
    const ratioCap = forceFullMode || recordMode ? 1.35 : 1.1;
    const ratio = Math.min(window.devicePixelRatio || 1, ratioCap);
    const rect = webglCanvas.getBoundingClientRect();
    webglCanvas.width = Math.max(1, Math.floor(rect.width * ratio));
    webglCanvas.height = Math.max(1, Math.floor(rect.height * ratio));
    gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
  }

  function render(time) {
    if (!state.visible && !flightMode) {
      scheduleFrame(render, 220);
      return;
    }

    state.pointerX += (state.targetX - state.pointerX) * 0.06;
    state.pointerY += (state.targetY - state.pointerY) * 0.06;
    state.scroll = Math.min(window.scrollY / window.innerHeight, 1);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, webglCanvas.width, webglCanvas.height);
    gl.uniform2f(pointerLocation, state.pointerX, 1 - state.pointerY);
    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform1f(scrollLocation, state.scroll);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    scheduleFrame(render);
  }

  if (scene) {
    scene.addEventListener("pointermove", (event) => {
      const rect = scene.getBoundingClientRect();
      state.targetX = (event.clientX - rect.left) / rect.width;
      state.targetY = (event.clientY - rect.top) / rect.height;
    });

    scene.addEventListener("pointerleave", () => {
      state.targetX = 0.62;
      state.targetY = 0.42;
    });
  }

  resize();
  window.addEventListener("resize", resize);
  scheduleFrame(render);
  return { resize };
}

// Temporarily disabled to compare scroll performance against a lightweight CSS blob background.
// runWhenIdle(initHeroWebGL, 1100);

function initFlightMode() {
  if (!flightMode) return;

  const stops = [
    { top: 0, duration: recordMode ? 2300 : 1800 },
    { top: () => Math.max(0, $("#works").offsetTop - 80), duration: recordMode ? 3400 : 2600 },
    { top: () => Math.max(0, $("#motion").offsetTop - 80), duration: recordMode ? 3100 : 2400 },
    { top: () => Math.max(0, $("#process").offsetTop - 90), duration: recordMode ? 2800 : 2200 },
    { top: () => Math.max(0, $("#contact").offsetTop - 100), duration: recordMode ? 2800 : 2200 },
  ];

  let index = 0;

  function easeInOutCubic(value) {
    return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  function moveTo(targetTop, duration, done) {
    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const startedAt = performance.now();

    function tick(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      window.scrollTo(0, startTop + distance * easeInOutCubic(progress));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(done, 650);
      }
    }

    requestAnimationFrame(tick);
  }

  function nextStop() {
    const stop = stops[index];
    if (!stop) {
      document.body.classList.add("flight-finished");
      window.dispatchEvent(new CustomEvent("portfolio-flight-finished"));
      return;
    }

    const top = typeof stop.top === "function" ? stop.top() : stop.top;
    moveTo(top, stop.duration, () => {
      index += 1;
      nextStop();
    });
  }

  setTimeout(nextStop, recordMode ? 1800 : 1200);
}

initFlightMode();

const canvas = $(".field-canvas");
const ctx = canvas && !lowPowerMode ? canvas.getContext("2d") : null;
let particles = [];
let lines = [];
let fieldVisible = true;

function resizeCanvas() {
  if (!ctx) return;
  const ratioCap = forceFullMode || recordMode ? 1.25 : 1;
  const ratio = Math.min(window.devicePixelRatio || 1, ratioCap);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const particleCount = Math.min(forceFullMode || recordMode ? 48 : 38, Math.floor(window.innerWidth / 34));
  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.6 + 0.35,
  }));

  lines = Array.from({ length: forceFullMode || recordMode ? 9 : 6 }, (_, index) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    length: 70 + Math.random() * 160,
    speed: 0.45 + Math.random() * 0.7,
    hue: index % 3,
  }));
}

function renderField() {
  if (!ctx) return;
  if (!fieldVisible && !flightMode) {
    scheduleFrame(renderField, 260);
    return;
  }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(216,255,78,.28)";
    ctx.fill();

    particles.slice(index + 1, index + 8).forEach((other) => {
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance > 120) return;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(other.x, other.y);
      ctx.strokeStyle = `rgba(75,231,255,${(1 - distance / 120) * 0.08})`;
      ctx.stroke();
    });
  });

  lines.forEach((line) => {
    line.y += line.speed;
    line.x += Math.sin(line.y * 0.01) * 0.45;
    if (line.y - line.length > window.innerHeight) {
      line.y = -line.length;
      line.x = Math.random() * window.innerWidth;
    }

    const gradient = ctx.createLinearGradient(line.x, line.y, line.x + 18, line.y + line.length);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.45, line.hue === 0 ? "rgba(70,255,177,.32)" : line.hue === 1 ? "rgba(141,107,255,.32)" : "rgba(75,231,255,.32)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.bezierCurveTo(line.x + 28, line.y + line.length * .35, line.x - 18, line.y + line.length * .65, line.x + 18, line.y + line.length);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  });

  if (!reducedMotion) scheduleFrame(renderField);
}

if (canvas) {
  const fieldObserver = new IntersectionObserver(
    ([entry]) => {
      fieldVisible = entry.isIntersecting;
    },
    { rootMargin: "180px 0px" },
  );
  fieldObserver.observe(scene || document.body);
}
runWhenIdle(() => {
  resizeCanvas();
  renderField();
}, 1400);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 150);
});

const reviewCards = $$("[data-review-card]");
const reviewCurrent = $("[data-review-current]");
const reviewPrev = $("[data-review-prev]");
const reviewNext = $("[data-review-next]");
let reviewIndex = 0;

function updateReviews(nextIndex) {
  if (!reviewCards.length) return;
  reviewIndex = (nextIndex + reviewCards.length) % reviewCards.length;
  const angles = [-58, 0, 58];

  reviewCards.forEach((card, index) => {
    const offset = ((index - reviewIndex + reviewCards.length) % reviewCards.length + 1) % reviewCards.length - 1;
    card.classList.toggle("is-active", index === reviewIndex);
    card.style.setProperty("--review-angle", `${angles[offset + 1]}deg`);
  });

  if (reviewCurrent) reviewCurrent.textContent = String(reviewIndex + 1).padStart(2, "0");
}

reviewPrev?.addEventListener("click", () => updateReviews(reviewIndex - 1));
reviewNext?.addEventListener("click", () => updateReviews(reviewIndex + 1));
updateReviews(0);
