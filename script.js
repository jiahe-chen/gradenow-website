// ===== Language Switching =====
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  applyLang();
}

function applyLang() {
  const label = document.getElementById('lang-label');
  label.textContent = currentLang === 'en' ? '中文' : 'EN';

  // Update HTML lang attribute
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

  // Toggle logos
  const logoEn = document.getElementById('logo-en');
  const logoCn = document.getElementById('logo-cn');
  const footerLogoEn = document.getElementById('footer-logo-en');
  const footerLogoCn = document.getElementById('footer-logo-cn');

  if (currentLang === 'zh') {
    logoEn.classList.add('hidden');
    logoCn.classList.remove('hidden');
    footerLogoEn.classList.add('hidden');
    footerLogoCn.classList.remove('hidden');
  } else {
    logoEn.classList.remove('hidden');
    logoCn.classList.add('hidden');
    footerLogoEn.classList.remove('hidden');
    footerLogoCn.classList.add('hidden');
  }

  // Update all text elements with data-zh and data-en attributes
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // Update placeholders
  document.querySelectorAll('[data-zh-placeholder][data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
  });

  // Update page title
  document.title = currentLang === 'zh'
    ? 'AI快批 · GradeNow — K-12 教师 AI 智能批改助手'
    : 'GradeNow · AI快批 — AI-Powered Grading for K-12 Teachers';
}

// ===== Mobile Menu =====
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
  document.getElementById('nav-links').classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Scroll Animations =====
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.feature-card, .pain-card, .workflow-step, .pricing-card, .value-item, .traffic-item'
  );
  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ===== Navbar scroll effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ===== Form Submit =====
function handleSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('.cta-input');
  const btn = e.target.querySelector('.btn');
  const originalText = btn.textContent;

  btn.textContent = currentLang === 'zh' ? '已提交!' : 'Submitted!';
  btn.style.opacity = '0.7';
  input.value = '';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.opacity = '1';
  }, 2000);
}

// ===== Auto-detect language =====
function detectLang() {
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('zh')) {
    currentLang = 'zh';
    applyLang();
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  detectLang();
  initScrollAnimations();
});
