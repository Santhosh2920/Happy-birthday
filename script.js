const hearts = document.getElementById("hearts");

function createParticle() {
  const particle = document.createElement("span");
  particle.className = "floating-particle";
  particle.textContent = Math.random() > 0.35 ? "♡" : "✦";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.fontSize = `${10 + Math.random() * 18}px`;
  particle.style.animationDuration = `${7 + Math.random() * 8}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  hearts.appendChild(particle);

  setTimeout(() => particle.remove(), 17000);
}

setInterval(createParticle, 900);
for (let i = 0; i < 8; i++) setTimeout(createParticle, i * 180);

// Reveal sections while scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Surprise modal
const modal = document.getElementById("surpriseModal");
const surpriseBtn = document.getElementById("surpriseBtn");
const closeModal = document.getElementById("closeModal");
const modalBackdrop = document.querySelector(".modal-backdrop");

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeTheModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

surpriseBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeTheModal);
modalBackdrop.addEventListener("click", closeTheModal);

// Wish button creates a little celebration
document.getElementById("wishBtn").addEventListener("click", () => {
  for (let i = 0; i < 25; i++) {
    setTimeout(createParticle, i * 55);
  }
  document.getElementById("wishBtn").textContent = "Wish sent with love ♡";
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeTheModal();
    closeLightbox();
  }
});

// Soft typing effect for the main greeting
const heroTitle = document.querySelector(".hero h1");
heroTitle.animate(
  [
    { opacity: 0, transform: "translateY(18px)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  { duration: 1100, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
);
