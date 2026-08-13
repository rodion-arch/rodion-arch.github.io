
(() => {
  const body = document.body;

  const menu = document.querySelector('[data-menu-toggle]');
  if (menu) {
    menu.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => {
      body.classList.remove('nav-open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-youtube]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.youtube;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = btn.dataset.title || 'Видео проекта';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      btn.replaceChildren(iframe);
    }, { once:true });
  });


  const gallery = document.querySelector('.gallery');
  let orderedItems = [];
  let columns = [];

  if (gallery) {
    orderedItems = [...gallery.querySelectorAll('[data-gallery-item]')];
    orderedItems.forEach((item, i) => item.dataset.galleryOrder = String(i));

    const buildMasonry = () => {
      const desktop = window.matchMedia('(min-width: 721px)').matches;

      orderedItems
        .sort((a,b) => Number(a.dataset.galleryOrder) - Number(b.dataset.galleryOrder))
        .forEach(item => gallery.appendChild(item));

      gallery.querySelectorAll('.gallery-column').forEach(col => col.remove());
      columns = [];

      if (!desktop) return;

      columns = [document.createElement('div'), document.createElement('div')];
      columns.forEach(col => {
        col.className = 'gallery-column';
        gallery.appendChild(col);
      });

      const heights = [0, 0];
      orderedItems.forEach(item => {
        const img = item.querySelector('img');
        const w = Number(img.getAttribute('width')) || 1;
        const h = Number(img.getAttribute('height')) || 1;
        const estimatedHeight = h / w;

        const target = heights[0] <= heights[1] ? 0 : 1;
        columns[target].appendChild(item);
        heights[target] += estimatedHeight + 0.03;
      });
    };

    buildMasonry();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildMasonry, 120);
    });
  }

  const items = orderedItems.length
    ? orderedItems.slice().sort((a,b) => Number(a.dataset.galleryOrder) - Number(b.dataset.galleryOrder))
    : [...document.querySelectorAll('[data-gallery-item]')];

  const lightbox = document.querySelector('[data-lightbox]');
  if (!items.length || !lightbox) return;

  const image = lightbox.querySelector('[data-lightbox-image]');
  const counter = lightbox.querySelector('[data-lightbox-counter]');
  const closeBtn = lightbox.querySelector('[data-lightbox-close]');
  const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
  const nextBtn = lightbox.querySelector('[data-lightbox-next]');
  let current = 0;
  let lastFocus = null;
  let touchStartX = null;

  function show(index) {
    current = (index + items.length) % items.length;
    const img = items[current].querySelector('img');
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || '';
    counter.textContent = `${String(current + 1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
  }

  function open(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    closeBtn.focus({ preventScroll:true });
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    image.removeAttribute('src');
    if (lastFocus) lastFocus.focus({ preventScroll:true });
  }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') {
      const controls = [closeBtn, prevBtn, nextBtn];
      const i = controls.indexOf(document.activeElement);
      if (e.shiftKey && i === 0) {
        e.preventDefault();
        controls[controls.length - 1].focus();
      }
      if (!e.shiftKey && i === controls.length - 1) {
        e.preventDefault();
        controls[0].focus();
      }
    }
  });

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive:true });

  lightbox.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive:true });
})();
