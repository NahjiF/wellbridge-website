/* ----------------------------------------------------
   MOBILE NAV MENU
---------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
});

/* Close nav when clicking a link (mobile only) */
document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 900) {
            mainNav.classList.remove("active");
        }
    });
});


/* ----------------------------------------------------
   FAQ ACCORDION
---------------------------------------------------- */
const questions = document.querySelectorAll(".faq-question");

questions.forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;

        // Close others
        document.querySelectorAll(".faq-answer").forEach(a => {
            if (a !== answer) a.style.display = "none";
        });

        // Toggle current answer
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});


/* ----------------------------------------------------
   SMOOTH SCROLLING FOR INTERNAL LINKS
---------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetID = this.getAttribute("href");
        if (targetID && targetID !== "#") {
            e.preventDefault();
            const target = document.querySelector(targetID);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        }
    });
});


/* ----------------------------------------------------
   HERO FADE-IN ANIMATION (optional but nice)
---------------------------------------------------- */
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-section");
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transition = "opacity 1.5s ease";
        setTimeout(() => {
            hero.style.opacity = 1;
        }, 200);
    }
});
