
// Loading Screen
// Do not wait for every external font or icon request to finish. Some networks
// can leave those requests pending and otherwise keep the page covered forever.
function hidePageLoader() {
    const loader = document.getElementById('loader');
    if (!loader || loader.classList.contains('hidden')) return;

    loader.classList.add('hidden');
    window.setTimeout(function () {
        loader.remove();
    }, 600);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        window.setTimeout(hidePageLoader, 250);
    }, { once: true });
} else {
    window.setTimeout(hidePageLoader, 250);
}

// Final JavaScript failsafe, independent of the document load event.
window.setTimeout(hidePageLoader, 3000);

// Initialize AOS only when the optional library is available.
if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

if (slides) {

    function nextSlide() {
        if (!slides.length) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
}


// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active menu on scroll
    updateActiveMenu();
});

// Active Menu Management
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Close mobile menu if open
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}


// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});


// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// Initialize active menu on load
updateActiveMenu();

document.getElementById("subscribe").addEventListener("click", function () {
    const emailInput = document.getElementById("subscribe-email");
    const email = emailInput.value.trim();

    // Email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert("Please enter your email address.");
        emailInput.focus();
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    // Success
    alert("Thank you for subscribing!");
    emailInput.value = "";
});
