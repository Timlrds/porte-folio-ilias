// Menu hamburger responsive
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Gestion des modales de projets
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Fermer la modale si on clique en dehors du contenu
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Navigation active lors du scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Soumission du formulaire de contact (affichage d'une alerte)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        contactForm.reset();
    });
}

// Carrousel de projets animé
const carouselImages = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const descriptionBox = document.querySelector('.carousel-description');

let currentIndex = 0;

function showImage(index) {
    carouselImages.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
            descriptionBox.textContent = img.getAttribute('data-description');
        }
    });
}

function showNext() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showImage(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentIndex);
}

if (prevBtn && nextBtn && carouselImages.length > 0) {
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    carouselImages.forEach((img, i) => {
        img.addEventListener('click', () => {
            currentIndex = i;
            showImage(currentIndex);
        });
    });
    showImage(currentIndex);
}

// Overlay plein écran pour le carrousel
const overlay = document.getElementById('carouselOverlay');
const overlayImg = document.getElementById('overlayImage');
const overlayCaption = document.getElementById('overlayCaption');
const closeOverlayBtn = document.getElementById('closeOverlay');

function openCarouselOverlay(img) {
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlayCaption.textContent = img.getAttribute('data-description');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCarouselOverlay() {
    overlay.classList.remove('active');
    overlayImg.src = '';
    overlayCaption.textContent = '';
    document.body.style.overflow = '';
}

if (carouselImages.length > 0) {
    carouselImages.forEach(img => {
        img.addEventListener('dblclick', () => openCarouselOverlay(img));
        img.addEventListener('touchend', (e) => {
            if (e.detail === 2) openCarouselOverlay(img); // double tap mobile
        });
    });
}
if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', closeCarouselOverlay);
}
overlay && overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCarouselOverlay();
});
document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
        closeCarouselOverlay();
    }
}); 