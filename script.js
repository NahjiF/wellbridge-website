/* ===========================
   MOBILE MENU TOGGLE
=========================== */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});


/* ===========================
   SMOOTH SCROLLING (OPTIONAL)
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
        navLinks.classList.remove("show"); // close menu on mobile
    });
});
