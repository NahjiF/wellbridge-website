// script.js

document.addEventListener("DOMContentLoaded", () => {
  setYearInFooter();
  setupSmoothScroll();
  loadGalleryFromJSON();
});

/**
 * Put current year in footer.
 */
function setYearInFooter() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Smooth scroll for internal links.
 */
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/**
 * Load gallery items from content/gallery/index.json
 * This file is edited by Netlify/Decap CMS.
 */
async function loadGalleryFromJSON() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;

  const placeholder = container.querySelector(".gallery-empty-message");

  try {
    const response = await fetch("content/gallery/index.json", { cache: "no-store" });

    if (!response.ok) {
      console.warn("Gallery JSON not found yet, keeping placeholder.");
      return;
    }

    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      console.warn("Gallery JSON has no items yet.");
      return;
    }

    // Clear placeholder + any old content
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-item";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt || item.title || "Event photo";

      const body = document.createElement("div");
      body.className = "gallery-item-body";

      const title = document.createElement("h3");
      title.textContent = item.title || "Event";

      body.appendChild(title);

      if (item.description) {
        const desc = document.createElement("p");
        desc.textContent = item.description;
        body.appendChild(desc);
      }

      card.appendChild(img);
      card.appendChild(body);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading gallery:", err);
    // If there’s an error, we just leave the "coming soon" text.
    if (placeholder) placeholder.style.display = "block";
  }
}
