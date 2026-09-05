/**
 * UI module - Optimized
 */
export function initUI() {
  const progressBar = document.querySelector('.progress-bar');
  const toTopBtn = document.querySelector('.back-to-top');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const navList = document.querySelector('.header__nav-list');
  const header = document.querySelector('.header');
  const heroSection = document.getElementById('hero');

  // 1. Optimized Parallax (تصحيح الاسم + استخدام RAF)
  let scrollY = 0;
  const heroText = document.querySelector('.hero__text'); // تم تصحيح الاسم
  
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    // طلب تحديث البروجريس بار هنا مرة واحدة
    if (progressBar) updateProgressBar();
    // إظهار زر الصعود
    if (toTopBtn) {
       toTopBtn.classList.toggle('back-to-top--visible', scrollY > 450);
    }
  }, { passive: true }); // passive يحسن الأداء جداً

  function animateParallax() {
    if (scrollY < 800 && heroText) {
      // تحريك النص بنسبة بسيطة باستخدام GPU
      heroText.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
    }
    requestAnimationFrame(animateParallax);
  }
  animateParallax();

  // Progress bar logic
  function updateProgressBar() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // Back to top click
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Header Observer (تغيير لون الهيدر)
  if (header && heroSection) {
    new IntersectionObserver((entries) => {
      header.classList.toggle('header--scrolled', !entries[0].isIntersecting);
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(heroSection);
  }

  // Active Nav Link Observer
  const sectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('header__nav-link--active'));
        const activeLink = document.querySelector(`.header__nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('header__nav-link--active');
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('section[id]').forEach(sec => sectionsObserver.observe(sec));

  // Fade In Observer
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // Mobile Nav Toggle
  const navToggle = document.querySelector('.header__nav-toggle');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => navList.classList.toggle('header__nav-list--open'));
  }

  // البحث عن الفورم
const form = document.querySelector('.contact__form');
if (form) {
  form.addEventListener('submit', (e) => {
    // إذا كنت تريد الإرسال التقليدي، لا تضع e.preventDefault();
    // أو إذا أردت استخدام AJAX (بدون إعادة تحميل الصفحة) اتركها وأضف كود الإرسال.
    
    console.log("Form is being sent..."); 
  });
}
}