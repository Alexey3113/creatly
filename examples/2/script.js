const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 90, 270)}ms`;
  revealObserver.observe(element);
});

const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const finalValue = Number(target.dataset.count);
      const hasDecimal = String(finalValue).includes(".");
      const duration = reducedMotion ? 0 : 1400;
      const start = performance.now();

      const update = (now) => {
        const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = finalValue * eased;
        target.textContent = hasDecimal ? value.toFixed(1) : Math.round(value);
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      metricObserver.unobserve(target);
    });
  },
  { threshold: 0.65 },
);

document.querySelectorAll("[data-count]").forEach((metric) => metricObserver.observe(metric));

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion || window.innerWidth < 900) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    if (reducedMotion || window.innerWidth < 900) return;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    element.style.transform = `translate(${x * 0.13}px, ${y * 0.18}px)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
});

const canvas = document.querySelector(".hero-canvas");
const context = canvas.getContext("2d");
let particles = [];
let pointer = { x: -1000, y: -1000 };
let animationFrame;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const bounds = canvas.getBoundingClientRect();
  canvas.width = bounds.width * ratio;
  canvas.height = bounds.height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(75, Math.floor(bounds.width / 16));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * bounds.width,
    y: Math.random() * bounds.height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    radius: Math.random() * 1.2 + 0.3,
  }));
}

function drawNetwork() {
  const bounds = canvas.getBoundingClientRect();
  context.clearRect(0, 0, bounds.width, bounds.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > bounds.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > bounds.height) particle.vy *= -1;

    const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
    if (pointerDistance < 150) {
      particle.x += (particle.x - pointer.x) * 0.002;
      particle.y += (particle.y - pointer.y) * 0.002;
    }

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(77, 255, 159, .38)";
    context.fill();

    particles.slice(index + 1).forEach((other) => {
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance > 110) return;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(other.x, other.y);
      context.strokeStyle = `rgba(62, 255, 149, ${(1 - distance / 110) * 0.08})`;
      context.stroke();
    });
  });

  if (!reducedMotion) animationFrame = requestAnimationFrame(drawNetwork);
}

canvas.addEventListener("pointermove", (event) => {
  const bounds = canvas.getBoundingClientRect();
  pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
});

canvas.addEventListener("pointerleave", () => {
  pointer = { x: -1000, y: -1000 };
});

resizeCanvas();
drawNetwork();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
    drawNetwork();
  }, 150);
});

const parallaxItems = document.querySelectorAll(".profile-scene, .workflow");
let ticking = false;

function updateParallax() {
  if (!reducedMotion && window.innerWidth > 760) {
    parallaxItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - bounds.top) * 0.025;
      item.style.setProperty("--parallax", `${Math.max(-14, Math.min(14, offset))}px`);
      item.querySelectorAll(".float-card, .task-card").forEach((card, index) => {
        card.style.marginTop = `${offset * (index % 2 ? -0.55 : 0.75)}px`;
      });
    });
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  },
  { passive: true },
);

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const navLinks = [...document.querySelectorAll(".nav a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (header.contains(event.target)) return;
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
);

observedSections.forEach((section) => sectionObserver.observe(section));
