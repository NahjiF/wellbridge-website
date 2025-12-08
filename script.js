// script.js

// 1) Set current year in the footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2) Smooth scroll for nav links (Home, Rentals, Contact Us, etc.)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 3) Reveal-on-scroll animations for sections
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// 4) Nice UX on form submit – disable button & show "Sending..."
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    // Netlify will handle the actual submit + redirect to thank_you.html
  });
}
