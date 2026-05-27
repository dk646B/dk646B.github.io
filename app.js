/* ============================================
   APP.JS — Danny Kim Portfolio
   ============================================ */

// ── Navbar: scroll shadow ──────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
}

// ── Navbar: mobile toggle ──────────────────
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.getElementById('navbar-menu');

if (mobileMenu && navbarMenu) {
    mobileMenu.addEventListener('click', () => {
        const isOpen = navbarMenu.classList.toggle('open');
        mobileMenu.classList.toggle('is-active', isOpen);
        mobileMenu.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navbarMenu.querySelectorAll('.navbar__links').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('open');
            mobileMenu.classList.remove('is-active');
        });
    });
}

// ── Modals ─────────────────────────────────
function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    const closeBtn = overlay.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();
}

function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Open modal when project card is clicked
document.querySelectorAll('.project-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
        openModal(card.dataset.modal);
    });
    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.dataset.modal);
        }
    });
});

// Close modal on close button click
document.querySelectorAll('.modal__close').forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(btn.closest('.modal-overlay'));
    });
});

// Close modal on overlay background click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay);
    });
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
});
