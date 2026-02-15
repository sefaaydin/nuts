/**
 * Jeglide Couture - Ana JavaScript Dosyası
 * Sepet, slider, form işlemleri ve diğer etkileşimler
 */

document.addEventListener('DOMContentLoaded', function () {
  initColorOptions();
  initSizeButtons();
  initWishlistButtons();
  initSmoothAnimations();
});

/* ==========================================
   RENK CAROUSEL KAYDIRMA
   ========================================== */
function scrollColors(direction) {
  const carousel = document.getElementById('colorCarousel');
  if (!carousel) return;
  const scrollAmount = 110;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

/* ==========================================
   RENK SEÇENEKLERİ
   ========================================== */
function initColorOptions() {
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      colorOptions.forEach(function (o) { o.classList.remove('active'); });
      option.classList.add('active');
      // Seçilen renk bilgisi
      const colorName = option.querySelector('span');
      if (colorName) {
        showToast('Renk seçildi: ' + colorName.textContent);
      }
    });
  });
}

/* ==========================================
   BEDEN BUTONLARI
   ========================================== */
function initSizeButtons() {
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
}

/* ==========================================
   FAVORİ BUTONU
   ========================================== */
function initWishlistButtons() {
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        showToast('Favorilere eklendi');
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        showToast('Favorilerden çıkarıldı');
      }
    });
  });
}

/* ==========================================
   SEPETE EKLE
   ========================================== */
function addToCart() {
  // Sepet badge güncelle
  const badges = document.querySelectorAll('.cart-badge, .badge-dot');
  badges.forEach(function (badge) {
    let count = parseInt(badge.textContent) || 0;
    badge.textContent = count + 1;
  });

  // Animasyonlu bildirim
  showToast('Ürün sepete eklendi!');

  // Buton animasyonu
  const btn = document.querySelector('.btn-add-cart');
  if (btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(function () {
      btn.style.transform = 'scale(1)';
    }, 150);
  }
}

/* ==========================================
   SEPET MİKTAR GÜNCELLEME
   ========================================== */
function updateQty(button, change) {
  const control = button.closest('.qty-control');
  const qtySpan = control.querySelector('span');
  let qty = parseInt(qtySpan.textContent) || 1;
  qty = Math.max(1, qty + change);
  qtySpan.textContent = qty;
  updateCartTotal();
}

/* ==========================================
   SEPET ÜRÜNLERİNİ SİL
   ========================================== */
function removeCartItem(button) {
  const item = button.closest('.cart-item');
  if (item) {
    item.style.opacity = '0';
    item.style.transform = 'translateX(50px)';
    item.style.transition = 'all 0.3s ease';
    setTimeout(function () {
      item.remove();
      updateCartTotal();
      // Badge güncelle
      const badges = document.querySelectorAll('.cart-badge, .badge-dot');
      badges.forEach(function (badge) {
        let count = parseInt(badge.textContent) || 0;
        if (count > 0) badge.textContent = count - 1;
      });
    }, 300);
  }
}

/* ==========================================
   SEPET TOPLAMI GÜNCELLE
   ========================================== */
function updateCartTotal() {
  // Basit toplam hesaplama simülasyonu
  const items = document.querySelectorAll('.cart-item');
  let total = 0;
  items.forEach(function (item) {
    const priceText = item.querySelector('.cart-item-price');
    const qtyText = item.querySelector('.qty-control span');
    if (priceText && qtyText) {
      const price = parseFloat(
        priceText.textContent
          .replace(/[^\d,]/g, '')
          .replace(',', '.')
      ) || 0;
      const qty = parseInt(qtyText.textContent) || 1;
      total += price * qty;
    }
  });

  // Toplam güncelle
  const totalEl = document.querySelector('.cart-total-price');
  if (totalEl) {
    totalEl.innerHTML = formatPrice(total) + ' <small>TL</small>';
  }
}

/* ==========================================
   FİYAT FORMATLAMA
   ========================================== */
function formatPrice(price) {
  return price.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* ==========================================
   İLETİŞİM FORMU
   ========================================== */
function handleContactForm(event) {
  event.preventDefault();
  showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
  event.target.reset();
}

/* ==========================================
   ÜYELİK BAŞVURU FORMU
   ========================================== */
function handleMembershipForm(event) {
  event.preventDefault();
  showToast('Üyelik başvurunuz alındı! Başvurunuz incelendikten sonra size bilgi verilecektir.');
  event.target.reset();
}

/* ==========================================
   TOAST BİLDİRİM
   ========================================== */
function showToast(message) {
  // Önceki toast varsa kaldır
  const existingToast = document.querySelector('.jeglide-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'jeglide-toast';
  toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + message;

  // Stil
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-20px)',
    background: 'linear-gradient(135deg, #b8965e, #96794b)',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '25px',
    fontSize: '13px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 20px rgba(184, 150, 94, 0.4)',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.4s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    maxWidth: '90%',
    textAlign: 'center'
  });

  document.body.appendChild(toast);

  // Göster
  requestAnimationFrame(function () {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Gizle
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
    }, 400);
  }, 3000);
}

/* ==========================================
   SCROLL ANİMASYONLARI
   ========================================== */
function initSmoothAnimations() {
  // Sayfa yüklendiğinde elementleri yumuşak göster
  const animElements = document.querySelectorAll(
    '.product-card, .contact-form-card, .contact-info-card, .membership-form-card, .order-frame'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
}

/* ==========================================
   NAVBAR SCROLL ETKİSİ
   ========================================== */
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar-jeglide');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(74, 55, 40, 0.1)';
    navbar.style.background = 'rgba(253, 251, 248, 0.95)';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.background = '';
  }
});
