/* ============================================================
   CONTENT LOADER FOR JSON + CMS
   Loads Homepage, About, Venue, Rentals, FAQ, and Contact Info
============================================================ */

async function loadJSON(path) {
    const response = await fetch(path);
    return response.json();
}

async function loadContent() {

    /* ----------------------------
       LOAD HOMEPAGE CONTENT
    ---------------------------- */
    try {
        const homepage = await loadJSON("content/homepage.json");

        document.querySelector(".hero-title").innerHTML = homepage.hero_title;
        document.querySelector(".hero-subtext").innerHTML = homepage.hero_description;
        document.querySelector(".hero-location").innerHTML = homepage.hero_subtitle;

        if (homepage.hero_image) {
            document.querySelector("#hero").style.backgroundImage =
                `url('${homepage.hero_image}')`;
        }

    } catch (err) {
        console.log("Homepage content not found.");
    }


    /* ----------------------------
       LOAD ABOUT CONTENT
    ---------------------------- */
    try {
        const about = await loadJSON("content/about.json");

        document.querySelector("#about .section-title").innerHTML = about.title;
        document.querySelector("#about .section-text").innerHTML = about.body;

    } catch (err) {
        console.log("About content not found.");
    }


    /* ----------------------------
       LOAD VENUE DETAILS
    ---------------------------- */
    try {
        const venue = await loadJSON("content/venue.json");

        document.querySelector("#venue .details-list").innerHTML = `
            <li>✓ Large Room Capacity: ${venue.large_capacity}</li>
            <li>✓ Small Room Capacity: ${venue.small_capacity}</li>
            ${venue.included_items.map(i => `<li>✓ ${i}</li>`).join("")}
        `;

    } catch (err) {
        console.log("Venue content not found.");
    }


    /* ----------------------------
       LOAD RENTAL OPTIONS
    ---------------------------- */
    try {
        const rentals = await loadJSON("content/rentals.json");

        document.querySelector("#rentals .section-text") &&
        (document.querySelector("#rentals .section-text").innerHTML = rentals.desc);

        const pricingGrid = document.querySelector(".pricing-grid");

        pricingGrid.innerHTML = rentals.options.map(item => `
            <div class="pricing-card">
                <h3>${item.title}</h3>
                <p class="price">${item.price}</p>
            </div>
        `).join("");

    } catch (err) {
        console.log("Rentals content not found.");
    }


    /* ----------------------------
       LOAD FAQ CONTENT
    ---------------------------- */
    try {
        const faq = await loadJSON("content/faq.json");

        const faqList = document.querySelector(".faq-list");
        faqList.innerHTML = faq.questions.map(item => `
            <div class="faq-item">
                <h3 class="faq-question">${item.question}</h3>
                <p class="faq-answer">${item.answer}</p>
            </div>
        `).join("");

    } catch (err) {
        console.log("FAQ content not found.");
    }


    /* ----------------------------
       LOAD CONTACT INFO
    ---------------------------- */
    try {
        const contact = await loadJSON("content/contact.json");

        document.querySelector("#contact .contact-info").innerHTML = `
            ${contact.address}<br>
            Call or text <strong>${contact.phone}</strong><br>
            ${contact.email ? "Email: " + contact.email : ""}
        `;

    } catch (err) {
        console.log("Contact content not found.");
    }
}

loadContent();
