/* ══════════════════════════════════════════════════════════
   Carol & Ivan — script.js
   Todas as funcionalidades do site de casamento
══════════════════════════════════════════════════════════ */

'use strict';

// ── ROLAGEM SUAVE ──────────────────────────────────────────
function smoothScrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── HEADER: fundo ao rolar ─────────────────────────────────
(function () {
  var header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── MENU MOBILE ────────────────────────────────────────────
function openMobileMenu() {
  document.getElementById('mobile-menu').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── PARALLAX DO HERO ───────────────────────────────────────
(function () {
  var heroBg      = document.getElementById('hero-bg');
  var heroContent = document.getElementById('hero-content');
  var heroSection = document.querySelector('.hero-section');
  if (!heroBg || !heroSection) return;

  function onScroll() {
    var scrollY   = window.scrollY;
    var height    = heroSection.offsetHeight;
    var progress  = scrollY / height;  // 0 → 1 enquanto o hero está na tela

    if (progress < 0 || progress > 1) return;

    // Paralaxe da imagem: move 25% para baixo
    heroBg.style.transform = 'translateY(' + (progress * 25) + '%)';

    // Fade do conteúdo do hero
    var opacity = Math.max(0, 1 - progress / 0.8);
    heroContent.style.opacity = opacity;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── CONTAGEM REGRESSIVA ────────────────────────────────────
(function () {
  var target = new Date('2026-12-13T16:00:00-03:00').getTime();

  var dEl = document.getElementById('cd-days');
  var hEl = document.getElementById('cd-hours');
  var mEl = document.getElementById('cd-minutes');
  var sEl = document.getElementById('cd-seconds');

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function update() {
    var diff = target - Date.now();
    if (diff <= 0) { dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00'; return; }

    dEl.textContent = pad(Math.floor(diff / 86400000));
    hEl.textContent = pad(Math.floor((diff / 3600000) % 24));
    mEl.textContent = pad(Math.floor((diff / 60000) % 60));
    sEl.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  update();
  setInterval(update, 1000);
})();

// ── REVELAR ELEMENTOS AO SCROLLAR (Intersection Observer) ──
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-60px 0px' }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

// ── CARREGAMENTO AUTOMÁTICO DE FOTOS ───────────────────────
// Foto principal: assets/foto-principal/1.jpg (referenciada direto no index.html)
// Álbum de fotos: coloque as fotos em assets/fotos-album/ numeradas em sequência (1, 2, 3...)
(function () {
  var EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

  // Testa cada extensão até encontrar um arquivo existente; resolve com o src encontrado ou null
  function probeImage(basePath) {
    return new Promise(function (resolve) {
      var i = 0;
      function tryNext() {
        if (i >= EXTENSIONS.length) { resolve(null); return; }
        var src = basePath + '.' + EXTENSIONS[i++];
        var img = new Image();
        img.onload = function () { resolve(src); };
        img.onerror = tryNext;
        img.src = src;
      }
      tryNext();
    });
  }

  // Observer próprio, pois os itens da galeria são criados depois da carga inicial da página
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-60px 0px' }
  );

  // Álbum de fotos (galeria)
  var galleryGrid = document.getElementById('gallery-grid');
  var galleryCarousel = document.getElementById('gallery-carousel');
  if (!galleryGrid || !galleryCarousel) return;

  function loadGalleryPhoto(n) {
    probeImage('assets/fotos-album/' + n).then(function (src) {
      if (!src) return; // numeração termina no primeiro número não encontrado

      var item = document.createElement('div');
      item.className = 'gallery-item reveal' + (n % 3 === 0 ? ' row-span-2' : '');
      var gridImg = document.createElement('img');
      gridImg.src = src;
      gridImg.alt = 'Carol e Ivan ' + n;
      gridImg.loading = 'lazy';
      gridImg.decoding = 'async';
      gridImg.onclick = function () { openLightbox(src, gridImg.alt); };
      item.appendChild(gridImg);
      galleryGrid.appendChild(item);
      revealObserver.observe(item);

      var carouselImg = document.createElement('img');
      carouselImg.src = src;
      carouselImg.alt = 'Carol e Ivan ' + n;
      carouselImg.loading = 'lazy';
      carouselImg.decoding = 'async';
      carouselImg.onclick = function () { openLightbox(src, carouselImg.alt); };
      galleryCarousel.appendChild(carouselImg);

      loadGalleryPhoto(n + 1);
    });
  }

  loadGalleryPhoto(1);
})();

// ── LIGHTBOX (foto da galeria em tela cheia) ──────────────
function openLightbox(src, alt) {
  var img = document.getElementById('lightbox-img');
  img.src = src;
  img.alt = alt || '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function handleLightboxOverlayClick(event) {
  if (event.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

// ── TECLA ESC fecha sobreposições ─────────────────────────
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeLightbox();
  }
});
