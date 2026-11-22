// Filter chips for the publications and news pages (works without JS: everything is shown).
document.querySelectorAll('.filters').forEach(function (bar) {
  var box = bar.nextElementSibling;
  if (!box || !box.classList.contains('filterable')) return;
  var sel = box.getAttribute('data-items');
  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    var f = btn.getAttribute('data-filter');
    if (box.classList.contains('news-collapsed') && f !== 'all') expandOlder();
    bar.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('active', c === btn); });
    box.querySelectorAll(sel).forEach(function (it) {
      it.hidden = !(f === 'all' || it.getAttribute('data-type') === f);
    });
    box.querySelectorAll('.year-group').forEach(function (g) {
      g.hidden = !g.querySelector(sel + ':not([hidden])');
    });
  });
});

// Teaching: show the first 3 lines of each course description with a "Read more" toggle (without JS: full text).
document.querySelectorAll('.course .desc').forEach(function (p) {
  p.classList.add('clamped');
  if (p.scrollHeight <= p.clientHeight + 2) { p.classList.remove('clamped'); return; }
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'more-toggle'; b.textContent = 'Read more'; b.setAttribute('aria-expanded', 'false');
  b.addEventListener('click', function () {
    var open = p.classList.toggle('clamped') === false;
    b.textContent = open ? 'Show less' : 'Read more'; b.setAttribute('aria-expanded', String(open));
  });
  p.after(b);
});

// News galleries: never enlarge an image to fill its tile; show it whole instead.
function checkTile(img) {
  if (!img.naturalWidth) return;
  var s = Math.max(img.clientWidth / img.naturalWidth, img.clientHeight / img.naturalHeight);
  img.classList.toggle('no-enlarge', s > 1.01);
}
document.querySelectorAll('.gallery img').forEach(function (img) {
  if (img.complete) checkTile(img); else img.addEventListener('load', function () { checkTile(img); });
});
window.addEventListener('resize', function () { document.querySelectorAll('.gallery img').forEach(checkTile); });

// Lightbox for a post's cover and gallery images (shown at most at their own size).
(function () {
  var items = [];
  var hero = document.querySelector('.post-hero .hero-img');
  if (hero) items.push({ src: hero.getAttribute('src'), el: hero, alt: hero.alt });
  document.querySelectorAll('.gallery a').forEach(function (a) {
    var im = a.querySelector('img'); items.push({ src: a.getAttribute('href'), el: a, alt: im ? im.alt : '' });
  });
  if (!items.length) return;
  var box, img, count, i = 0;
  function show(n) {
    i = (n + items.length) % items.length; img.src = items[i].src; img.alt = items[i].alt || '';
    count.textContent = items.length > 1 ? (i + 1) + ' / ' + items.length : '';
  }
  function close() { box.remove(); box = null; document.removeEventListener('keydown', key); }
  function key(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(i + 1);
    else if (e.key === 'ArrowLeft') show(i - 1);
  }
  function open(n) {
    box = document.createElement('div'); box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Close">×</button>' +
      (items.length > 1 ? '<button class="lb-prev" aria-label="Previous">‹</button><button class="lb-next" aria-label="Next">›</button>' : '') +
      '<div class="lb-count"></div>';
    img = box.querySelector('img'); count = box.querySelector('.lb-count');
    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('lb-prev')) show(i - 1);
      else if (e.target.classList.contains('lb-next')) show(i + 1);
      else if (e.target !== img) close();
    });
    document.addEventListener('keydown', key);
    document.body.appendChild(box); show(n); box.querySelector('.lb-close').focus();
  }
  items.forEach(function (it, n) {
    it.el.addEventListener('click', function (e) { e.preventDefault(); open(n); });
  });
})();

// News: show the two latest years, older ones behind a button (without JS: everything is shown).
var olderBtn = document.querySelector('.older-toggle');
function expandOlder() {
  var box = document.querySelector('.news-collapsed'); if (box) box.classList.remove('news-collapsed');
  if (olderBtn) olderBtn.hidden = true;
}
if (olderBtn) {
  var nbox = document.querySelector('.filterable[data-items=".news-card"]');
  if (nbox && nbox.querySelector('[data-older]')) { nbox.classList.add('news-collapsed'); olderBtn.hidden = false; }
  olderBtn.addEventListener('click', expandOlder);
}

// Back-to-top button on long pages.
(function () {
  if (document.documentElement.scrollHeight < window.innerHeight * 3) return;
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'to-top'; b.setAttribute('aria-label', 'Back to top'); b.textContent = '↑';
  b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(b);
  var onScroll = function () { b.classList.toggle('show', window.scrollY > 900); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
