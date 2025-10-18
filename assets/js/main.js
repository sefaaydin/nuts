/**
 * Doğa Kuruyemiş - Main JavaScript
 * Bootstrap 5.3.7 ile uyumlu interaktif davranışlar
 */

(function() {
  'use strict';

  // ==================== DOM Elements ====================
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');
  
  // ==================== Navbar Scroll Shadow ====================
  /**
   * Sayfa scroll'unda navbar'a shadow efekti ekler
   */
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  // ==================== Back to Top Button ====================
  /**
   * Back to top butonunun görünürlüğünü kontrol eder
   */
  function handleBackToTop() {
    if (window.scrollY > 200) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  }

  /**
   * Sayfanın en üstüne smooth scroll yapar
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ==================== Carousel Auto-Interval ====================
  /**
   * Bootstrap carousel için otomatik geçiş süresini ayarlar (5 saniye)
   */
  function initializeCarousel() {
    const carouselElement = document.querySelector('#heroCarousel');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true,
        keyboard: true,
        pause: 'hover'
      });
    }
  }

  // ==================== Product Modal Dynamic Content ====================
  /**
   * Ürün detay modalına data-* attribute'larından dinamik içerik aktarır
   */
  function initializeProductModals() {
    const productModal = document.getElementById('productModal');
    
    if (productModal) {
      productModal.addEventListener('show.bs.modal', function(event) {
        // Modal'ı tetikleyen button
        const button = event.relatedTarget;
        
        // Data attribute'larından bilgileri al
        const productName = button.getAttribute('data-product-name');
        const productDesc = button.getAttribute('data-product-desc');
        const productPrice = button.getAttribute('data-product-price');
        const productImage = button.getAttribute('data-product-image');
        const productWeight = button.getAttribute('data-product-weight');
        const productOrigin = button.getAttribute('data-product-origin');
        const productRoast = button.getAttribute('data-product-roast');
        const productAllergen = button.getAttribute('data-product-allergen');
        
        // Modal içeriğini güncelle
        const modalTitle = productModal.querySelector('.modal-title');
        const modalImage = productModal.querySelector('#modalProductImage');
        const modalDesc = productModal.querySelector('#modalProductDesc');
        const modalPrice = productModal.querySelector('#modalProductPrice');
        const modalWeight = productModal.querySelector('#modalProductWeight');
        const modalOrigin = productModal.querySelector('#modalProductOrigin');
        const modalRoast = productModal.querySelector('#modalProductRoast');
        const modalAllergen = productModal.querySelector('#modalProductAllergen');
        
        if (modalTitle) modalTitle.textContent = productName;
        if (modalImage) modalImage.src = productImage;
        if (modalDesc) modalDesc.textContent = productDesc;
        if (modalPrice) modalPrice.textContent = productPrice;
        if (modalWeight) modalWeight.textContent = productWeight;
        if (modalOrigin) modalOrigin.textContent = productOrigin;
        if (modalRoast) modalRoast.textContent = productRoast;
        if (modalAllergen) modalAllergen.textContent = productAllergen;
      });
    }
  }

  // ==================== Form Validation Enhancement ====================
  /**
   * Bootstrap form validation'ı geliştirir
   */
  function initializeFormValidation() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (newsletterForm.checkValidity()) {
          const email = newsletterForm.querySelector('input[type="email"]').value;
          alert(`Thank you for subscribing! We'll send updates to ${email}`);
          newsletterForm.reset();
          newsletterForm.classList.remove('was-validated');
        } else {
          newsletterForm.classList.add('was-validated');
        }
      });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (contactForm.checkValidity()) {
          const name = contactForm.querySelector('#name').value;
          const email = contactForm.querySelector('#email').value;
          const subject = contactForm.querySelector('#subject').value;
          
          // Gerçek backend olmadığı için şimdilik alert göster
          alert(`Thank you ${name}! Your message about "${subject}" has been received. We'll contact you at ${email} soon.`);
          contactForm.reset();
          contactForm.classList.remove('was-validated');
        } else {
          contactForm.classList.add('was-validated');
        }
      });
    }
  }

  // ==================== Smooth Scroll for Anchor Links ====================
  /**
   * Sayfa içi anchor linkler için smooth scroll
   */
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // # veya boş href'leri atla
        if (href === '#' || href === '#!') {
          return;
        }
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==================== Lazy Loading Enhancement ====================
  /**
   * Lazy loading için fallback (eski tarayıcılar)
   */
  function initializeLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Tarayıcı native lazy loading destekliyor
      return;
    }
    
    // Fallback: Intersection Observer ile lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ==================== Testimonials Carousel Auto-Play ====================
  /**
   * Müşteri yorumları carousel'i için otomatik oynatma
   */
  function initializeTestimonialsCarousel() {
    const testimonialsCarousel = document.querySelector('#testimonialsCarousel');
    if (testimonialsCarousel) {
      new bootstrap.Carousel(testimonialsCarousel, {
        interval: 6000,
        wrap: true,
        keyboard: true,
        pause: 'hover'
      });
    }
  }

  // ==================== Active Nav Link Highlighter ====================
  /**
   * Mevcut sayfaya göre navbar linkini aktif yapar
   */
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Anasayfa için özel kontrol
      if (currentPath === '/' || currentPath.endsWith('/index.html')) {
        if (linkPath.endsWith('/index.html') || linkPath === '/') {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      } else if (linkPath === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ==================== Navbar Collapse on Link Click (Mobile) ====================
  /**
   * Mobilde menü linkine tıklandığında menüyü kapat
   */
  function initializeMobileMenuClose() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // ==================== Initialize Tooltips ====================
  /**
   * Bootstrap tooltip'lerini başlat
   */
  function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // ==================== Scroll Event Listener ====================
  /**
   * Scroll eventlerini optimize edilmiş şekilde dinle
   */
  let scrollTimeout;
  function handleScroll() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      handleNavbarScroll();
      handleBackToTop();
    });
  }

  // ==================== Event Listeners ====================
  /**
   * Tüm event listener'ları ekle
   */
  function attachEventListeners() {
    // Scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Back to top button click
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Load event
    window.addEventListener('load', () => {
      handleNavbarScroll();
      handleBackToTop();
    });
  }

  // ==================== Initialization ====================
  /**
   * Sayfa yüklendiğinde tüm fonksiyonları başlat
   */
  function init() {
    console.log('🌰 Doğa Kuruyemiş - Initializing...');
    
    // Temel fonksiyonları başlat
    highlightActiveNavLink();
    initializeCarousel();
    initializeTestimonialsCarousel();
    initializeProductModals();
    initializeFormValidation();
    initializeSmoothScroll();
    initializeLazyLoading();
    initializeMobileMenuClose();
    initializeTooltips();
    attachEventListeners();
    
    console.log('✅ Doğa Kuruyemiş - Ready!');
  }

  // ==================== DOM Ready ====================
  /**
   * DOM hazır olduğunda init fonksiyonunu çalıştır
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
