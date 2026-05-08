// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with localStorage + system preference
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function getPreferredTheme() {
  const stored = localStorage.getItem("gns-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("gns-theme", theme);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

// IntersectionObserver for fade/slide/zoom animations
const animated = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

animated.forEach(el => observer.observe(el));

// Simple parallax for hero background
const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");

if (hero && heroBg) {
  window.addEventListener("scroll", () => {
    const rect = hero.getBoundingClientRect();
    const offset = rect.top * -0.15;
    heroBg.style.transform = `translateY(${offset}px)`;
  });
}

// Screenshot lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".screenshot-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    if (!full) return;
    lightboxImage.src = full;
    lightbox.classList.add("active");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
}

lightboxBackdrop.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});
