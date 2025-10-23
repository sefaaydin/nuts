// ===================================
// PROFESSIONAL INTERACTIONS & ANIMATIONS
// ===================================

'use strict';

// ===================================
// Navigation
// ===================================

class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.hamburger?.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        window.addEventListener('scroll', () => this.handleScroll());
        this.updateActiveLink();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.hamburger?.classList.remove('active');
        this.navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
        }
        this.updateActiveLink();
    }

    updateActiveLink() {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    }
}

// ===================================
// Smooth Scroll
// ===================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===================================
// Intersection Observer for Animations
// ===================================

class ScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation for performance
                    observer.unobserve(entry.target);
                }
            });
        }, this.options);

        const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
        animatedElements.forEach(element => observer.observe(element));
    }
}

// ===================================
// Product Cards Interactions
// ===================================

class ProductCards {
    constructor() {
        this.cards = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseEnter(card) {
        // Add subtle tilt effect
        card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    handleMouseLeave(card) {
        card.style.transform = '';
    }
}

// ===================================
// Gallery Modal
// ===================================

class GalleryModal {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.galleryItems.forEach(item => {
            const btn = item.querySelector('.gallery-btn');
            btn?.addEventListener('click', (e) => {
                e.stopPropagation();
                const imgSrc = item.querySelector('img').src;
                this.createModal(imgSrc);
            });
        });
    }

    createModal(imgSrc) {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-container">
                <button class="modal-close" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <img src="${imgSrc}" alt="Gallery Image">
                <button class="modal-nav modal-prev" aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button class="modal-nav modal-next" aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Add styles
        this.addModalStyles();
        
        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        backdrop.addEventListener('click', () => this.closeModal(modal));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal(modal);
        });
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    addModalStyles() {
        if (document.querySelector('#gallery-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'gallery-modal-styles';
        style.textContent = `
            .gallery-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .gallery-modal.active {
                opacity: 1;
            }
            
            .modal-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .modal-container {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                z-index: 1;
                animation: modalZoom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .modal-container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 12px;
            }
            
            .modal-close {
                position: absolute;
                top: -50px;
                right: 0;
                width: 40px;
                height: 40px;
                background: white;
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .modal-close:hover {
                transform: rotate(90deg);
                background: #E87722;
            }
            
            .modal-close:hover svg {
                stroke: white;
            }
            
            .modal-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .modal-prev {
                left: -70px;
            }
            
            .modal-next {
                right: -70px;
            }
            
            .modal-nav:hover {
                background: white;
                transform: translateY(-50%) scale(1.1);
            }
            
            @keyframes modalZoom {
                from {
                    transform: scale(0.8);
                }
                to {
                    transform: scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .modal-close {
                    top: 10px;
                    right: 10px;
                }
                
                .modal-nav {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Form Handler
// ===================================

class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.newsletterForm = document.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        this.contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));
        this.newsletterForm?.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    handleContactSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            e.target.reset();
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'success' ? '✓' : '✕'}
            </div>
            <p>${message}</p>
        `;
        
        document.body.appendChild(notification);
        this.addNotificationStyles();
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    addNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 24px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                max-width: 400px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                flex-shrink: 0;
            }
            
            .notification-success .notification-icon {
                background: #4CAF50;
                color: white;
            }
            
            .notification-error .notification-icon {
                background: #f44336;
                color: white;
            }
            
            .notification p {
                margin: 0;
                color: #2C2416;
                font-weight: 500;
            }
            
            @media (max-width: 640px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Parallax Effects
// ===================================

class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (heroImage) {
            const speed = 0.3;
            heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        }

        // Floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// ===================================
// Button Ripple Effect
// ===================================

class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===================================
// Cursor Effect (Optional Premium Feature)
// ===================================

class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card, .gallery-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });

        this.addCursorStyles();
    }

    addCursorStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                width: 20px;
                height: 20px;
                border: 2px solid #8B4513;
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 10001;
                transform: translate(-50%, -50%);
                transition: all 0.15s ease;
                mix-blend-mode: difference;
                display: none;
            }
            
            .custom-cursor.hover {
                width: 40px;
                height: 40px;
                background: rgba(232, 119, 34, 0.2);
            }
            
            @media (min-width: 1024px) {
                .custom-cursor {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Counter Animation
// ===================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-item h3');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = element.textContent;
        const number = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[\d\s]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < number) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = number + suffix;
            }
        };

        updateCounter();
    }
}

// ===================================
// Page Loading Animation
// ===================================

class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 0.5s ease-out';
                document.body.style.opacity = '1';
            });
        });
    }
}

// ===================================
// Initialize All Components
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SmoothScroll();
    new ScrollAnimations();
    new ProductCards();
    new GalleryModal();
    new FormHandler();
    new ParallaxEffects();
    new RippleEffect();
    new CounterAnimation();
    new PageLoader();
    
    // Optional: Enable custom cursor on desktop only
    if (window.innerWidth >= 1024) {
        new CursorEffect();
    }
    
    // Console branding
    console.log(
        '%c🌰 Mega Kuruyemiş',
        'font-size: 24px; font-weight: bold; color: #8B4513; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
    );
    console.log(
        '%cPremium Turkish Nuts & Dried Fruits',
        'font-size: 14px; color: #E87722; font-weight: 500;'
    );
    console.log(
        '%cWebsite crafted with ❤️ and modern technologies',
        'font-size: 12px; color: #6B6B6B;'
    );
});

// ===================================
// Performance Monitoring (Optional)
// ===================================

if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// ===================================
// Export for module usage (if needed)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        SmoothScroll,
        ScrollAnimations,
        ProductCards,
        GalleryModal,
        FormHandler
    };
}
