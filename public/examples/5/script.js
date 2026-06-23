const restaurants = [
  {
    name: "Север",
    type: "Итальянская",
    price: "₽₽₽",
    distance: "1,2 км",
    rating: "4.9",
    match: 96,
    tags: ["Панорамный вид", "Тихо", "Для свидания"],
    mood: ["view", "cozy"],
    image: "assets/images/restaurant-sever.webp"
  },
  {
    name: "Тепло",
    type: "Comfort food",
    price: "₽₽",
    distance: "850 м",
    rating: "4.8",
    match: 93,
    tags: ["Камин", "Винная карта", "Уютно"],
    mood: ["cozy"],
    image: "assets/images/restaurant-teplo.webp"
  },
  {
    name: "Точка",
    type: "Новая Азия",
    price: "₽₽₽",
    distance: "2,1 км",
    rating: "4.9",
    match: 89,
    tags: ["DJ-сеты", "Коктейли", "До позднего"],
    mood: ["loud"],
    image: "assets/images/restaurant-tochka.webp"
  },
  {
    name: "Линия",
    type: "Авторская",
    price: "₽₽₽₽",
    distance: "3,4 км",
    rating: "4.7",
    match: 87,
    tags: ["Chef's table", "Сеты", "Особый повод"],
    mood: ["all", "view"],
    image: "assets/images/restaurant-liniya.webp"
  }
];

const deck = document.querySelector("#cardDeck");
const bookingModal = document.querySelector("#bookingModal");
const bookingPlace = document.querySelector("#bookingPlace");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeRestaurants = [...restaurants];
let dragState = null;

function restaurantCard(item, index) {
  const article = document.createElement("article");
  article.className = "restaurant-card";
  article.dataset.name = item.name;
  article.style.zIndex = index + 1;
  article.innerHTML = `
    <img src="${item.image}" alt="Интерьер ресторана ${item.name}" draggable="false" decoding="async">
    <div class="card-topline">
      <span>${item.type} · ${item.price}</span>
      <span class="match-badge">${item.match}% мэтч</span>
    </div>
    <div class="card-content">
      <div class="badge-row"><span>★ ${item.rating}</span><span>${item.distance}</span></div>
      <h3>${item.name}</h3>
      <p>Сегодня есть свободные столики</p>
      <div class="card-tags">${item.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    </div>
    <span class="swipe-stamp stamp-like">БЕРУ</span>
    <span class="swipe-stamp stamp-nope">ДАЛЬШЕ</span>
  `;
  return article;
}

function renderDeck(items = activeRestaurants) {
  deck.innerHTML = "";
  const visible = items.slice(0, 3).reverse();
  visible.forEach((item, index) => deck.append(restaurantCard(item, index)));
  const topCard = deck.lastElementChild;
  if (topCard) {
    topCard.classList.add("top-card");
    topCard.classList.add("is-hinting");
    bindDrag(topCard);
  } else {
    deck.innerHTML = `
      <div class="deck-empty">
        <strong>Вы посмотрели всё рядом</strong>
        <button id="restartDeck">Начать заново</button>
      </div>`;
    document.querySelector("#restartDeck").addEventListener("click", () => {
      activeRestaurants = [...restaurants];
      renderDeck();
    });
  }
}

function bindDrag(card) {
  card.addEventListener("pointerdown", event => {
    card.setPointerCapture(event.pointerId);
    card.classList.remove("is-hinting");
    card.classList.add("is-dragging");
    dragState = {
      card,
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
      time: performance.now()
    };
  });

  card.addEventListener("pointermove", event => {
    if (!dragState || dragState.card !== card) return;
    dragState.x = event.clientX - dragState.startX;
    dragState.y = event.clientY - dragState.startY;
    const rotate = dragState.x / 18;
    card.style.transform = `translate(${dragState.x}px, ${dragState.y * 0.35}px) rotate(${rotate}deg)`;
    const progress = Math.min(Math.abs(dragState.x) / 120, 1);
    card.style.setProperty("--swipe-progress", progress.toFixed(3));
    card.style.setProperty("--swipe-color", dragState.x >= 0 ? "199, 255, 74" : "255, 92, 69");
    card.querySelector(dragState.x >= 0 ? ".stamp-like" : ".stamp-nope").style.opacity = progress;
    card.querySelector(dragState.x >= 0 ? ".stamp-nope" : ".stamp-like").style.opacity = 0;
  });

  card.addEventListener("pointerup", finishDrag);
  card.addEventListener("pointercancel", finishDrag);
}

function finishDrag(event) {
  if (!dragState) return;
  const { card, x, time } = dragState;
  const velocity = x / Math.max(performance.now() - time, 1);
  const shouldDismiss = Math.abs(x) > 105 || Math.abs(velocity) > 0.7;
  if (shouldDismiss) {
    dismissCard(x >= 0 ? 1 : -1, card);
  } else {
    card.animate(
      [
        { transform: card.style.transform },
        { transform: "translate(0, 0) rotate(0)" }
      ],
      { duration: 430, easing: "cubic-bezier(.2,.9,.2,1)" }
    ).onfinish = () => {
      card.style.transform = "";
      card.style.setProperty("--swipe-progress", "0");
      card.classList.remove("is-dragging");
      card.classList.add("is-hinting");
      card.querySelectorAll(".swipe-stamp").forEach(stamp => {
        stamp.style.opacity = 0;
      });
    };
  }
  dragState = null;
  if (event && card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
}

function dismissCard(direction, explicitCard) {
  const card = explicitCard || deck.querySelector(".top-card");
  if (!card) return;
  card.classList.remove("is-hinting");
  card.classList.add("is-dragging");
  card.style.setProperty("--swipe-progress", "1");
  card.style.setProperty("--swipe-color", direction > 0 ? "199, 255, 74" : "255, 92, 69");
  const selected = activeRestaurants[0];
  const distance = window.innerWidth * 0.75 * direction;
  card.animate(
    [
      { transform: card.style.transform || "translate(0, 0) rotate(0)", opacity: 1 },
      { transform: `translate(${distance}px, -40px) rotate(${direction * 24}deg)`, opacity: 0 }
    ],
    { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
  ).onfinish = () => {
    activeRestaurants.shift();
    renderDeck();
    if (direction > 0) openBooking(selected.name);
  };
}

function openBooking(name) {
  bookingPlace.textContent = name;
  bookingModal.classList.add("open");
  bookingModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  bookingModal.classList.remove("open");
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector("#acceptButton").addEventListener("click", () => dismissCard(1));
document.querySelector("#rejectButton").addEventListener("click", () => dismissCard(-1));
document.querySelector("#detailsButton").addEventListener("click", () => {
  if (activeRestaurants[0]) openBooking(activeRestaurants[0].name);
});

document.querySelectorAll(".taste").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".taste").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    activeRestaurants = filter === "all"
      ? [...restaurants]
      : restaurants.filter(item => item.mood.includes(filter) || item.mood.includes("all"));
    const match = activeRestaurants[0]?.match || 93;
    document.querySelector("#matchStat").textContent = `${match}%`;
    document.querySelector(".match-stat i").style.width = `${match}%`;
    renderDeck();
  });
});

document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeBooking));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBooking();
  if (!bookingModal.classList.contains("open") && event.key === "ArrowRight") dismissCard(1);
  if (!bookingModal.classList.contains("open") && event.key === "ArrowLeft") dismissCard(-1);
});

document.querySelectorAll("[data-quick-book]").forEach(button => {
  button.addEventListener("click", () => openBooking(button.dataset.quickBook));
});

document.querySelectorAll(".date-row button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".date-row button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".time-grid button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".time-grid button").forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    document.querySelector("#confirmBooking").firstChild.textContent = `Забронировать на ${button.textContent} `;
  });
});

let guests = 2;
const guestCount = document.querySelector("#guestCount");
document.querySelector("#guestMinus").addEventListener("click", () => {
  guests = Math.max(1, guests - 1);
  guestCount.textContent = guests;
});
document.querySelector("#guestPlus").addEventListener("click", () => {
  guests = Math.min(12, guests + 1);
  guestCount.textContent = guests;
});

document.querySelector("#confirmBooking").addEventListener("click", () => {
  closeBooking();
  const toast = document.querySelector("#toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4200);
});

document.querySelectorAll("[data-scroll-to]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.scrollTo}`).scrollIntoView({ behavior: "smooth" });
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

let currentReview = 0;
const reviewCards = [...document.querySelectorAll(".review-card")];
const reviewClasses = ["active", "next", "far", "behind"];

function updateReviews(direction = 1) {
  reviewCards.forEach((card, index) => {
    card.classList.remove(...reviewClasses);
    const position = (index - currentReview + reviewCards.length) % reviewCards.length;
    card.classList.add(reviewClasses[position]);
  });
  document.querySelector("#reviewCurrent").textContent = String(currentReview + 1).padStart(2, "0");
  const magnet = document.querySelector(".review-magnet");
  magnet.animate(
    [
      { transform: "translateX(-50%) scale(1)" },
      { transform: `translateX(calc(-50% + ${direction * 22}px)) scale(1.15)` },
      { transform: "translateX(-50%) scale(1)" }
    ],
    { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" }
  );
}

document.querySelector("#reviewNext").addEventListener("click", () => {
  currentReview = (currentReview + 1) % reviewCards.length;
  updateReviews(1);
});

document.querySelector("#reviewPrev").addEventListener("click", () => {
  currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
  updateReviews(-1);
});

const heroSelections = [
  {
    name: "Север",
    type: "Итальянская",
    price: "₽₽₽",
    description: "Панорамный ресторан • 1,2 км",
    mood: "вечер вдвоём",
    image: "assets/images/restaurant-sever.webp"
  },
  {
    name: "Тепло",
    type: "Comfort food",
    price: "₽₽",
    description: "Камин и винил • 850 м",
    mood: "хочется уюта",
    image: "assets/images/restaurant-teplo.webp"
  },
  {
    name: "Точка",
    type: "Новая Азия",
    price: "₽₽₽",
    description: "Коктейли и DJ-сеты • 2,1 км",
    mood: "шумно и весело",
    image: "assets/images/restaurant-tochka.webp"
  }
];

let heroSelectionIndex = 0;
const heroPhoneCard = document.querySelector(".phone-card");
const heroPhoneImage = heroPhoneCard.querySelector("img");
const heroPhoneName = heroPhoneCard.querySelector("h3");
const heroPhoneDescription = heroPhoneCard.querySelector("p");
const heroPhoneBadges = heroPhoneCard.querySelectorAll(".badge-row span");
const heroPhoneMood = document.querySelector(".phone-brand strong");

function rotateHeroSelection() {
  heroSelectionIndex = (heroSelectionIndex + 1) % heroSelections.length;
  const selection = heroSelections[heroSelectionIndex];
  heroPhoneCard.classList.add("is-changing");
  setTimeout(() => {
    heroPhoneImage.src = selection.image;
    heroPhoneImage.alt = `Интерьер ресторана ${selection.name}`;
    heroPhoneName.textContent = selection.name;
    heroPhoneDescription.textContent = selection.description;
    heroPhoneBadges[0].textContent = selection.type;
    heroPhoneBadges[1].textContent = selection.price;
    heroPhoneMood.textContent = selection.mood;
    heroPhoneCard.classList.remove("is-changing");
  }, 430);
}

const featuredPlaces = [
  {
    name: "Культура",
    type: "Авторская кухня",
    price: "₽₽₽",
    address: "Большая Никитская, 24",
    rating: "4.9",
    image: "assets/images/restaurant-kultura.webp"
  },
  {
    name: "Тепло",
    type: "Comfort food",
    price: "₽₽",
    address: "Покровка, 16",
    rating: "4.8",
    image: "assets/images/restaurant-teplo.webp"
  },
  {
    name: "Точка",
    type: "Новая Азия",
    price: "₽₽₽",
    address: "Сретенка, 7",
    rating: "4.9",
    image: "assets/images/food-asia.webp"
  },
  {
    name: "Линия",
    type: "Chef's table",
    price: "₽₽₽₽",
    address: "Остоженка, 14",
    rating: "4.8",
    image: "assets/images/restaurant-liniya.webp"
  },
  {
    name: "Сад",
    type: "Средиземноморская",
    price: "₽₽₽",
    address: "Тверской бульвар, 9",
    rating: "4.7",
    image: "assets/images/food-asia.webp"
  }
];

let currentPlace = 0;
let placeTimer;
const placeArc = document.querySelector("#placeArc");
const placeCarousel = document.querySelector("#placeCarousel");
const placeClasses = ["is-active", "is-next", "is-far-next", "is-far-prev", "is-prev"];

function renderPlaces() {
  placeArc.innerHTML = featuredPlaces.map((place, index) => `
    <article class="arc-card" data-place-index="${index}">
      <img src="${place.image}" alt="Интерьер ресторана ${place.name}" loading="lazy" decoding="async">
      <span>${place.name}</span>
    </article>
  `).join("");

  placeArc.querySelectorAll(".arc-card").forEach(card => {
    card.addEventListener("click", () => {
      currentPlace = Number(card.dataset.placeIndex);
      updatePlaces();
      restartPlaceTimer();
    });
  });
  updatePlaces();
}

function updatePlaces() {
  const cards = [...placeArc.querySelectorAll(".arc-card")];
  cards.forEach((card, index) => {
    card.classList.remove(...placeClasses);
    const position = (index - currentPlace + featuredPlaces.length) % featuredPlaces.length;
    card.classList.add(placeClasses[position]);
  });

  const place = featuredPlaces[currentPlace];
  const caption = document.querySelector(".place-caption");
  const current = document.querySelector("#placeCurrent");
  const type = document.querySelector("#placeType");
  const name = document.querySelector("#placeName");
  const address = document.querySelector("#placeAddress");

  current.textContent = String(currentPlace + 1).padStart(2, "0");
  type.textContent = `${place.type} • ${place.price}`;
  name.textContent = place.name;
  address.textContent = `${place.address} • ${place.rating}`;

  if (!reduceMotion) {
    caption.animate(
      [
        { transform: "translateY(8px)", opacity: 0.72 },
        { transform: "translateY(0)", opacity: 1 }
      ],
      { duration: 520, easing: "cubic-bezier(.22,1,.36,1)" }
    );
  }
}

function movePlace(direction) {
  currentPlace = (currentPlace + direction + featuredPlaces.length) % featuredPlaces.length;
  updatePlaces();
}

function restartPlaceTimer() {
  clearInterval(placeTimer);
  if (!reduceMotion) placeTimer = setInterval(() => movePlace(1), 3800);
}

document.querySelector("#placePrev").addEventListener("click", () => {
  movePlace(-1);
  restartPlaceTimer();
});

document.querySelector("#placeNext").addEventListener("click", () => {
  movePlace(1);
  restartPlaceTimer();
});

document.querySelector("#placeBook").addEventListener("click", () => {
  openBooking(featuredPlaces[currentPlace].name);
});

placeCarousel.addEventListener("mouseenter", () => clearInterval(placeTimer));
placeCarousel.addEventListener("mouseleave", restartPlaceTimer);

let reviewTimer;
function restartReviewTimer() {
  clearInterval(reviewTimer);
  if (!reduceMotion) {
    reviewTimer = setInterval(() => {
      currentReview = (currentReview + 1) % reviewCards.length;
      updateReviews(1);
    }, 5600);
  }
}

document.querySelector("#reviewScene").addEventListener("mouseenter", () => clearInterval(reviewTimer));
document.querySelector("#reviewScene").addEventListener("mouseleave", restartReviewTimer);
document.querySelector("#reviewNext").addEventListener("click", restartReviewTimer);
document.querySelector("#reviewPrev").addEventListener("click", restartReviewTimer);

renderPlaces();
restartPlaceTimer();
restartReviewTimer();
if (!reduceMotion) setInterval(rotateHeroSelection, 4300);
renderDeck();
