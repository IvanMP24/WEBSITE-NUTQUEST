/**
 * NutQuest - Modern Web Experience
 * Enhanced JavaScript with smooth animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Core features
  initHeader();
  initScrollAnimations();
  initSmoothScroll();
  updateYear();

  // Optional features
  initParallax();
  initCounters();
  initPremiumCounters();
}

/**
 * Header Behavior
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: dejar de observar después de revelar
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore empty anchors
      if (href === '#' || href === '#!') return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Parallax Effect for Hero Section
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });
}

/**
 * Animated Counters for Stats
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent = Math.floor(current);
  }, 16);
}

/**
 * Premium Section Counter Animation - Enhanced with easing
 */
function initPremiumCounters() {
  const premiumCounters = document.querySelectorAll('.counter-premium');
  const premiumSection = document.querySelector('.premium-section');

  if (!premiumSection || premiumCounters.length === 0) return;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const premiumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated-premium')) {
        entry.target.classList.add('animated-premium');

        // Animate counters
        premiumCounters.forEach((counter, index) => {
          setTimeout(() => {
            animatePremiumCounter(counter);
          }, index * 200);
        });

        // Animate SVG circles
        animatePremiumCircles();
      }
    });
  }, observerOptions);

  premiumObserver.observe(premiumSection);
}

function animatePremiumCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2500; // 2.5 seconds
  const startTime = performance.now();

  // Easing function for smooth animation
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);

    const current = Math.floor(easedProgress * target);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(animate);
}

function animatePremiumCircles() {
  // Circle 1: 75% = 179.07 total circumference, target offset: 44.77
  const circle1 = document.querySelector('.stat-circle-1');
  if (circle1) {
    setTimeout(() => {
      circle1.style.strokeDashoffset = '59.69'; // 75% filled
      circle1.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 50);
  }

  // Circle 2: 83.33% (5/6 of circle) = target offset: 39.79
  const circle2 = document.querySelector('.stat-circle-2');
  if (circle2) {
    setTimeout(() => {
      circle2.style.strokeDashoffset = '39.79'; // 83.33% filled
      circle2.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s';
    }, 50);
  }

  // Circle 3: 90% = target offset: 23.88
  const circle3 = document.querySelector('.stat-circle-3');
  if (circle3) {
    setTimeout(() => {
      circle3.style.strokeDashoffset = '23.88'; // 90% filled
      circle3.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s';
    }, 50);
  }
}

/**
 * Update Copyright Year
 */
function updateYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Mobile Menu Toggle (if needed)
 */
function initMobileMenu() {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

/**
 * Form Validation & Enhancement
 */
function enhanceForms() {
  const forms = document.querySelectorAll('form[data-enhanced]');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector('[type="submit"]');

      // Show loading state
      if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
      }

      try {
        // Your form submission logic here
        console.log('Form data:', Object.fromEntries(formData));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showNotification('¡Mensaje enviado correctamente!', 'success');
        form.reset();
      } catch (error) {
        showNotification('Hubo un error. Por favor, inténtalo de nuevo.', 'error');
      } finally {
        if (submitButton) {
          submitButton.classList.remove('loading');
          submitButton.disabled = false;
        }
      }
    });
  });
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 16px 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12);
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for potential external use
window.NutQuest = {
  initScrollAnimations,
  showNotification,
  debounce,
  throttle
};
