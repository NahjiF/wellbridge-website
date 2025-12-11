/* ============================================================
   MOBILE NAVIGATION TOGGLE
============================================================ */

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
});


/* ============================================================
   FAQ ACCORDION FUNCTIONALITY
============================================================ */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        item.classList.toggle('open');

        const answer = item.querySelector('.faq-answer');
        if (item.classList.contains('open')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});


/* ============================================================
   SCROLL REVEAL ANIMATIONS
============================================================ */

const observerOptions = {
    threshold: 0.2
};

const revealElements = document.querySelectorAll(
    '.section, .hero-inner, .pricing-card, .faq-item'
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

/* ============================================================
   OPTIONAL: SMOOTH NAVIGATION SCROLL (ENHANCED)
============================================================ */

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', e => {
        const sectionID = link.getAttribute('href');
        if (sectionID.startsWith('#')) {
            e.preventDefault();
            document.querySelector(sectionID).scrollIntoView({
                behavior: 'smooth'
            });

            // close mobile menu after clicking
            navList.classList.remove('open');
        }
    });
});
