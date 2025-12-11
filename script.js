// script.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Smooth scroll for nav links ========= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 72; // header height-ish
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ========= Mobile nav toggle ========= */
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link
    navList.addEventListener("click", (e) => {
      if (e.target.matches("a") && navList.classList.contains("open")) {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ========= Scroll reveal ========= */
  const fadeEls = document.querySelectorAll(".js-fade");
  if ("IntersectionObserver" in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ========= Load content from CMS JSON =========
     This lets your mom edit *text & some images* visually in Netlify CMS.
     All fields live in content/site.json and are mapped via data-field attributes.
  */
  fetch("content/site.json")
    .then((res) => res.json())
    .then((data) => {
      // text / HTML fields
      document.querySelectorAll("[data-field]").forEach((el) => {
        const key = el.dataset.field;
        if (!Object.prototype.hasOwnProperty.call(data, key)) return;

        // simple heuristic: paragraphs with line breaks can be HTML
        if (el.dataset.type === "html") {
          el.innerHTML = data[key];
        } else if (el.tagName === "IMG") {
          el.src = data[key];
        } else {
          el.textContent = data[key];
        }
      });

      // href fields (for buttons)
      document.querySelectorAll("[data-href-field]").forEach((el) => {
        const hrefKey = el.dataset.hrefField;
        if (!Object.prototype.hasOwnProperty.call(data, hrefKey)) return;
        el.setAttribute("href", data[hrefKey]);
      });
    })
    .catch((err) => {
      console.warn("Could not load CMS content (content/site.json).", err);
    });
});
