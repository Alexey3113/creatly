const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const loader = $(".loader");
const loaderCount = $(".loader__count");
const loaderBar = $(".loader__line span");
let loadProgress = 0;

const loaderTimer = setInterval(() => {
  loadProgress += Math.ceil(Math.random() * 9);
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loaderTimer);
    setTimeout(() => loader.classList.add("is-hidden"), 250);
  }
  loaderCount.textContent = String(loadProgress).padStart(2, "0");
  loaderBar.style.width = `${loadProgress}%`;
}, 55);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

$$(".reveal, .image-reveal:not(.hero__media)").forEach((element) => revealObserver.observe(element));

const counters = $$(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const startedAt = performance.now();
    const duration = 1500;

    const update = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      counter.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

const header = $(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 80);
}, { passive: true });

const menuButton = $(".menu-toggle");
menuButton.addEventListener("click", () => {
  const opened = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(opened));
  document.body.classList.toggle("is-locked", opened);
});

$$(".nav a").forEach((link) => link.addEventListener("click", () => {
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("is-locked");
}));

let currentSlide = 0;
const slides = $$(".residence-card");
const sliderCurrent = $(".slider-index b");
const sliderProgress = $(".progress span");

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === currentSlide));
  sliderCurrent.textContent = String(currentSlide + 1).padStart(2, "0");
  sliderProgress.style.transform = `translateX(${currentSlide * 100}%)`;
}

$("[data-prev]").addEventListener("click", () => showSlide(currentSlide - 1));
$("[data-next]").addEventListener("click", () => showSlide(currentSlide + 1));

const advantagePreview = $(".advantages__preview");
const advantagePreviewImage = $("img", advantagePreview);

$$(".advantage").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    advantagePreviewImage.src = item.dataset.image;
    advantagePreview.classList.add("is-visible");
  });
  item.addEventListener("mouseleave", () => advantagePreview.classList.remove("is-visible"));
  item.addEventListener("mousemove", (event) => {
    advantagePreview.style.left = `${event.clientX}px`;
    advantagePreview.style.top = `${event.clientY}px`;
  });
});

const cursor = $(".cursor");
document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

$$(".residence-card__image, .intro__image, .panorama__image").forEach((target) => {
  target.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
  target.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
});

$$(".magnetic").forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    element.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
  });
  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

let ticking = false;
function updateParallax() {
  $$(".parallax").forEach((container) => {
    const rect = container.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    $("img", container).style.transform = `translateY(${(-13 + progress * 12).toFixed(2)}%)`;
  });
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });
updateParallax();

const modal = $(".modal");
const openModal = () => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  setTimeout(() => $("input", modal).focus(), 300);
};
const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
};

$$("[data-modal-open]").forEach((button) => button.addEventListener("click", openModal));
$("[data-modal-close]").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

$("form", modal).addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = $("button[type='submit']", event.currentTarget);
  submitButton.textContent = "Заявка отправлена";
  submitButton.disabled = true;
  setTimeout(closeModal, 1200);
});
