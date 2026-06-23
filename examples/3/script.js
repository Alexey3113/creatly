const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const preloader = $(".preloader");
const preloaderLine = $(".preloader__line span");
const preloaderCounter = $(".preloader__counter");
const previewMode = new URLSearchParams(window.location.search).has("preview");

if (previewMode) {
  preloader.style.display = "none";
  document.body.classList.add("loaded", "preview-mode");
} else {
  document.body.classList.add("loading");
  requestAnimationFrame(() => {
    preloaderLine.style.width = "100%";
  });

  let loaded = 0;
  const loadingTimer = setInterval(() => {
    loaded = Math.min(loaded + Math.ceil(Math.random() * 13), 100);
    preloaderCounter.textContent = String(loaded).padStart(2, "0");

    if (loaded === 100) {
      clearInterval(loadingTimer);
      setTimeout(() => {
        preloader.classList.add("done");
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
      }, 250);
    }
  }, 70);
}

const cursor = $(".cursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursor.classList.add("visible");
});

function renderCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(renderCursor);
}
renderCursor();

$$(".media-hover").forEach((item) => {
  item.addEventListener("mouseenter", () => cursor.classList.add("active"));
  item.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

$$(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

const hero = $(".hero");
const heroBackdropImage = $(".hero__backdrop img");
const heroHeading = $(".hero__heading");
const heroDeck = $(".hero-deck");
const heroGlow = $(".hero__glow");
const heroDepthItems = $$(".hero-card[data-depth], .hero-data[data-depth]", hero);
let sceneTargetX = 0;
let sceneTargetY = 0;
let sceneX = 0;
let sceneY = 0;

hero.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();
  sceneTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  sceneTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
});

hero.addEventListener("mouseleave", () => {
  sceneTargetX = 0;
  sceneTargetY = 0;
});

function renderHeroScene() {
  sceneX += (sceneTargetX - sceneX) * 0.055;
  sceneY += (sceneTargetY - sceneY) * 0.055;

  heroDepthItems.forEach((element) => {
    const depth = Number(element.dataset.depth || 0);
    element.style.setProperty("--mx", `${sceneX * depth * 22}px`);
    element.style.setProperty("--my", `${sceneY * depth * 15}px`);
  });

  heroGlow.style.setProperty("--glow-x", `${sceneX * 34}px`);
  heroGlow.style.setProperty("--glow-y", `${sceneY * 25}px`);
  requestAnimationFrame(renderHeroScene);
}

renderHeroScene();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");

      if (entry.target.classList.contains("counter")) {
        animateCounter(entry.target);
      }

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

$$(".reveal, .title-line, .counter").forEach((element) => observer.observe(element));

function animateCounter(element) {
  const target = Number(element.dataset.target);
  const decimal = target % 1 !== 0;
  const start = performance.now();
  const duration = 1600;

  function updateCounter(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = target * eased;
    element.textContent = decimal ? value.toFixed(1).replace(".", ",") : Math.round(value);

    if (progress < 1) requestAnimationFrame(updateCounter);
  }

  requestAnimationFrame(updateCounter);
}

let previousScroll = window.scrollY;
const header = $(".header");
const manifestoImage = $(".manifesto__image img");
const aboutImage = $(".about__media img");

window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY;
    const direction = scrollY > previousScroll ? 1 : -1;

    if (scrollY > 160 && direction > 0) {
      header.style.transform = "translateY(-110%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    header.style.transition = "transform .55s cubic-bezier(.16,1,.3,1)";
    previousScroll = scrollY;

    if (scrollY < window.innerHeight * 1.2) {
      const heroProgress = Math.min(scrollY / window.innerHeight, 1);
      heroBackdropImage.style.transform = `scale(${1.03 + heroProgress * 0.035}) translate3d(${sceneX * -5}px, ${scrollY * 0.018 + sceneY * -4}px, 0)`;
      heroHeading.style.transform = `translate3d(0, ${scrollY * -0.1}px, 0)`;
      heroHeading.style.opacity = String(1 - heroProgress * 0.85);
      heroDeck.style.opacity = String(1 - heroProgress * 0.48);
    }

    [manifestoImage, aboutImage].forEach((image) => {
      if (!image) return;
      const rect = image.parentElement.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        image.style.transform = `scale(1.04) translateY(${rect.top * -0.045}px)`;
      }
    });
  },
  { passive: true }
);

const slider = $(".property-slider");
const cards = $$(".property-card");
const slideCounter = $(".catalog-nav span b");

function updateSlideCounter() {
  const cardWidth = cards[0].getBoundingClientRect().width + 24;
  const current = Math.round(slider.scrollLeft / cardWidth) + 1;
  slideCounter.textContent = String(Math.min(current, cards.length)).padStart(2, "0");
}

$(".slider-next").addEventListener("click", () => {
  slider.scrollBy({ left: cards[0].getBoundingClientRect().width + 24, behavior: "smooth" });
});

$(".slider-prev").addEventListener("click", () => {
  slider.scrollBy({ left: -(cards[0].getBoundingClientRect().width + 24), behavior: "smooth" });
});

slider.addEventListener("scroll", updateSlideCounter, { passive: true });

$$(".filter-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".filter-tabs button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

const priceRange = $("#priceRange");
const propertyValue = $("#propertyValue");
const futureValue = $("#futureValue");
const growthValue = $("#growthValue");

function updateCalculator() {
  const value = Number(priceRange.value);
  const future = value * Math.pow(1.126, 5);
  const growth = future - value;
  const position = ((value - Number(priceRange.min)) / (Number(priceRange.max) - Number(priceRange.min))) * 100;

  propertyValue.textContent = value;
  futureValue.textContent = `${future.toFixed(1).replace(".", ",")} млн ₽`;
  growthValue.textContent = `+${growth.toFixed(1).replace(".", ",")} млн ₽`;
  priceRange.style.background = `linear-gradient(90deg, var(--acid) ${position}%, #d5d6d0 ${position}%)`;
}

priceRange.addEventListener("input", updateCalculator);
updateCalculator();

const mobileMenu = $(".mobile-menu");
const menuButton = $(".menu-button");
const menuClose = $(".mobile-menu__close");

function toggleMenu(open) {
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuButton.addEventListener("click", () => toggleMenu(true));
menuClose.addEventListener("click", () => toggleMenu(false));
$$(".mobile-menu a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (href === "#") return;

    const target = $(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
