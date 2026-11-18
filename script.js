// ============================================
// INTERACTIVE FEATURES
// ============================================

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
    createScrollToTopButton();
    animateOnScroll();
    initializeRecipeCards();
    initializeHamburgerMenu();
});

// Hamburger menu toggle logic
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            // Toggle hamburger icon between bars and X
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Create and manage scroll-to-top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.type = 'button';
    button.setAttribute('aria-label', 'Zpět nahoru');
    button.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';

    document.body.appendChild(button);

    window.addEventListener('scroll', function () {
        button.classList.toggle('is-visible', window.pageYOffset > 300);
    }, { passive: true });

    button.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe recipe cards
    const cards = document.querySelectorAll('.recipe-preview-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize recipe cards with hover effects
function initializeRecipeCards() {
    const cards = document.querySelectorAll('.recipe-preview-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const image = this.querySelector('.recipe-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const image = this.querySelector('.recipe-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Page transition animation – řeší CSS (animace pageIn na <body>), aby stránka neblikala

// Add print recipe functionality
function printRecipe() {
    window.print();
}

// Recipe favorites (localStorage)
function toggleRecipeFavorite(recipeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(recipeName)) {
        favorites = favorites.filter(fav => fav !== recipeName);
    } else {
        favorites.push(recipeName);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites updated:', favorites);
}

// Check if recipe is favorited
function isRecipeFavorited(recipeName) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(recipeName);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function (e) {
    // Home key: Go to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // End key: Go to bottom
    if (e.key === 'End') {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

console.log('✓ Bezlepkové recepty - Web je připraven! 🌟');