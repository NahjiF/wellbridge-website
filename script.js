// Smooth scroll for in-page links
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute("href");
  if (href === "#" || href === "#0") return;

  const target = document.querySelector(href);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    primaryNav.classList.toggle("nav-open");
  });

  primaryNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      primaryNav.classList.remove("nav-open");
    }
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // Fallback
  fadeEls.forEach((el) => el.classList.add("visible"));
}

// Utility to safely set text
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && typeof value === "string") {
    el.textContent = value;
  }
}

// Build FAQ accordion
function buildFaqs(faqData) {
  const container = document.getElementById("faq-list");
  if (!container || !Array.isArray(faqData)) return;

  container.innerHTML = "";

  faqData.forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = "faq-item fade-in";

    const q = document.createElement("button");
    q.type = "button";
    q.className = "faq-question";
    q.setAttribute("aria-expanded", "false");
    q.setAttribute("aria-controls", `faq-answer-${index}`);

    const qTitle = document.createElement("h3");
    qTitle.textContent = item.question || "Question";

    const toggle = document.createElement("span");
    toggle.className = "faq-toggle";
    toggle.textContent = "+";

    q.appendChild(qTitle);
    q.appendChild(toggle);

    const answer = document.createElement("div");
    answer.id = `faq-answer-${index}`;
    answer.className = "faq-answer";
    answer.innerHTML = item.answer || "";

    wrapper.appendChild(q);
    wrapper.appendChild(answer);
    container.appendChild(wrapper);
  });

  // Attach accordion behavior
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-question");
    if (!btn) return;

    const item = btn.parentElement;
    const answer = item.querySelector(".faq-answer");
    const open = item.classList.toggle("open");

    btn.setAttribute("aria-expanded", open ? "true" : "false");
    const toggleIcon = btn.querySelector(".faq-toggle");
    if (toggleIcon) toggleIcon.textContent = open ? "–" : "+";

    if (open) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = "0px";
    }
  });
}

// Build gallery
function buildGallery(images) {
  const grid = document.getElementById("gallery-grid");
  if (!grid || !Array.isArray(images)) return;

  grid.innerHTML = "";
  images.forEach((src) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Event photo";
    fig.appendChild(img);
    grid.appendChild(fig);
  });
}

// Build plan steps (optional dynamic)
function buildPlanSteps(steps) {
  const container = document.getElementById("plan-steps");
  if (!container || !Array.isArray(steps)) return;
  container.innerHTML = "";

  steps.forEach((step) => {
    const card = document.createElement("article");
    card.className = "step-card";
    const h3 = document.createElement("h3");
    h3.textContent = step.title || "";
    const p = document.createElement("p");
    p.textContent = step.body || "";
    card.appendChild(h3);
    card.appendChild(p);
    container.appendChild(card);
  });
}

// Load CMS content from JSON
fetch("content/site.json", { cache: "no-cache" })
  .then((res) => res.json())
  .then((data) => {
    const site = data || {};

    // HERO
    if (site.hero) {
      setText("hero-eyebrow", site.hero.eyebrow);
      setText("hero-line1", site.hero.headingLine1);
      setText("hero-line2", site.hero.headingLine2);
      setText("hero-line3", site.hero.headingLine3);
      setText("hero-body", site.hero.body);
      setText("hero-phone-cta", site.hero.phoneCta);

      const primaryBtn = document.getElementById("hero-primary-btn");
      if (primaryBtn) {
        primaryBtn.textContent = site.hero.primaryButtonLabel || primaryBtn.textContent;
        if (site.hero.primaryButtonTarget)
          primaryBtn.href = site.hero.primaryButtonTarget;
      }

      const secondaryBtn = document.getElementById("hero-secondary-btn");
      if (secondaryBtn) {
        secondaryBtn.textContent = site.hero.secondaryButtonLabel || secondaryBtn.textContent;
        if (site.hero.secondaryButtonTarget)
          secondaryBtn.href = site.hero.secondaryButtonTarget;
      }
    }

    // WELCOME
    if (site.welcome) {
      setText("welcome-title", site.welcome.title);
      setText("welcome-body", site.welcome.body);
    }

    // VENUE
    if (site.venue) {
      setText("venue-title", site.venue.title);
      if (Array.isArray(site.venue.bullets)) {
        const list = document.getElementById("venue-bullets");
        if (list) {
          list.innerHTML = "";
          site.venue.bullets.forEach((b) => {
            const li = document.createElement("li");
            li.textContent = b;
            list.appendChild(li);
          });
        }
      }
    }

    // GALLERY
    if (site.gallery) {
      setText("gallery-title", site.gallery.title);
      setText("gallery-subtitle", site.gallery.subtitle);
      buildGallery(site.gallery.images);
    }

    // RENTALS
    if (site.rentals) {
      setText("rentals-title", site.rentals.title);
      setText("rentals-intro", site.rentals.intro);
      setText("rentals-hours", site.rentals.hoursNote);
      setText("rentals-deposit", site.rentals.depositNote);
      setText("rentals-alcohol", site.rentals.alcoholNote);
    }

    // PLAN
    if (site.plan) {
      setText("plan-title", site.plan.title);
      setText("plan-subtitle", site.plan.subtitle);
      buildPlanSteps(site.plan.steps);
    }

    // FAQ
    if (site.faqs) {
      setText("faqs-title", site.faqs.title);
      setText("faqs-subtitle", site.faqs.subtitle);
      buildFaqs(site.faqs.items);
    }

    // HISTORY
    if (site.history) {
      setText("history-title", site.history.title);
      setText("history-body", site.history.body);
      setText("commitment-title", site.history.commitmentTitle);
      if (Array.isArray(site.history.commitmentItems)) {
        const list = document.getElementById("commitment-list");
        if (list) {
          list.innerHTML = "";
          site.history.commitmentItems.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
          });
        }
      }
    }

    // CONTACT
    if (site.contact) {
      setText("contact-title", site.contact.title);
      setText("contact-intro", site.contact.intro);
      setText("contact-venue-name", site.contact.venueName);
      setText("contact-address", site.contact.address);
      setText("contact-phone", site.contact.phoneText);
      setText("contact-note", site.contact.note);
      setText("contact-direct", site.contact.directText);
    }

    // Footer year
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  })
  .catch((err) => {
    console.warn("Could not load CMS content (content/site.json). Using defaults.", err);
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  });