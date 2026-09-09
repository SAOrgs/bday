/* =====================================================================
   sadhuuu's Birthday Website — Shared JavaScript
   ---------------------------------------------------------------------
   One file used by every page. Handles:
     1. Mobile nav toggle
     2. Scroll reveal animations
     3. Floating hearts + confetti decorations
     4. Cursor trail (tiny hearts / sparkles)
     5. Lightbox (click any photo to enlarge)
     6. Pretty placeholder for missing photos (before you add real ones)
     7. Background music toggle (remembers on/off across pages)
   ===================================================================== */

/* ------------------------------------------------------------------ */
/* Small config you can tweak                                          */
/* ------------------------------------------------------------------ */
const CONFIG = {
  floatEmojis: ['💗', '💕', '🩷', '✨', '🎀', '💖'],
  trailEmojis: ['💗', '✨', '🩷', '💕'],
  confettiColors: ['#ff9ec4', '#ffd1e3', '#e6b980', '#ffffff', '#ffe3ee'],
  floatIntervalMs: 900,     // how often a new heart floats up
  trailEnabled: true,       // set false to disable cursor trail
};

/* ================================================================== */
/* 1. Run everything after the DOM is ready                            */
/* ================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-fade');
  setupNav();
  setupPhotoPlaceholders();
  setupScrollReveal();
  setupLightbox();
  setupDecorLayers();
  setupCursorTrail();
  setupMusic();
});

/* ================================================================== */
/* 2. Mobile navigation toggle                                         */
/* ================================================================== */
function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

/* ================================================================== */
/* 3. Photo placeholders + lazy loading                                */
/*    Real photos may not exist yet, so if an image fails to load we   */
/*    swap in a pretty pink SVG placeholder that shows its caption.    */
/* ================================================================== */
function setupPhotoPlaceholders() {
  document.querySelectorAll('.polaroid img').forEach((img) => {
    // native lazy loading keeps pages smooth with lots of photos
    img.loading = 'lazy';
    img.decoding = 'async';

    const applyPlaceholder = () => {
      const caption = img.getAttribute('alt') || 'our memory';
      img.src = makePlaceholder(caption);
    };

    img.addEventListener('error', applyPlaceholder, { once: true });

    // If the src is still the literal placeholder path, show placeholder now.
    // (Real photos go in the photos/ folder — see photos/README.txt)
    if (!img.getAttribute('src') || img.getAttribute('src').startsWith('photos/')) {
      // Try to load the real file; onerror above handles the fallback.
      // Nothing to do here — the browser will attempt then fall back.
    }
  });
}

/* Build a data-URI SVG placeholder with a heart + the caption text. */
function makePlaceholder(text) {
  const safe = String(text).replace(/[<&>]/g, '').slice(0, 40);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#ffe3ee'/>
          <stop offset='1' stop-color='#ffd1e3'/>
        </linearGradient>
      </defs>
      <rect width='400' height='400' fill='url(#g)'/>
      <text x='50%' y='45%' font-size='90' text-anchor='middle'>🎀</text>
      <text x='50%' y='68%' font-size='22' fill='#b3718f'
            font-family='Georgia, serif' font-style='italic'
            text-anchor='middle'>${safe}</text>
      <text x='50%' y='80%' font-size='15' fill='#c98fa8'
            font-family='Arial' text-anchor='middle'>add your photo here</text>
    </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

/* ================================================================== */
/* 4. Scroll reveal animations (IntersectionObserver)                  */
/* ================================================================== */
function setupScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => obs.observe(el));
}

/* ================================================================== */
/* 5. Lightbox — click any photo to enlarge                            */
/* ================================================================== */
function setupLightbox() {
  // Build the lightbox element once and reuse it.
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">&times;</button>
    <img alt="enlarged photo">
    <video hidden playsinline controls></video>
    <div class="lb-caption"></div>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbVideo = lb.querySelector('video');
  const lbCap = lb.querySelector('.lb-caption');

  const resetVideo = () => {
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
    lbVideo.hidden = true;
  };

  const close = () => {
    lb.classList.remove('open');
    resetVideo();
  };
  lb.addEventListener('click', close);
  lb.querySelector('.lb-close').addEventListener('click', close);
  lbImg.addEventListener('click', (e) => e.stopPropagation()); // clicking image itself won't close
  lbVideo.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  document.querySelectorAll('.polaroid img, .polaroid video').forEach((media) => {
    media.addEventListener('click', () => {
      const cap = media.closest('.polaroid')?.querySelector('.caption');
      lbCap.textContent = cap ? cap.textContent : (media.getAttribute('aria-label') || media.getAttribute('alt') || '');
      if (media.tagName === 'VIDEO') {
        lbImg.hidden = true;
        lbVideo.hidden = false;
        lbVideo.src = media.currentSrc || media.src;
        lbVideo.muted = true;
        lbVideo.autoplay = true;
        lbVideo.loop = false;
        lbVideo.load();
        lbVideo.play().catch(() => {});
      } else {
        resetVideo();
        lbVideo.hidden = true;
        lbImg.hidden = false;
        lbImg.src = media.currentSrc || media.src;
      }
      lb.classList.add('open');
    });
  });
}

/* ================================================================== */
/* 6. Decoration layers — floating hearts + confetti                   */
/* ================================================================== */
function setupDecorLayers() {
  let layer = document.getElementById('decor-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'decor-layer';
    document.body.appendChild(layer);
  }

  // continuously float hearts/sparkles upward
  setInterval(() => spawnFloater(layer), CONFIG.floatIntervalMs);

  // a gentle initial burst
  for (let i = 0; i < 6; i++) setTimeout(() => spawnFloater(layer), i * 250);
}

function spawnFloater(layer) {
  const el = document.createElement('span');
  el.className = 'floater';
  el.textContent = CONFIG.floatEmojis[Math.floor(Math.random() * CONFIG.floatEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (0.9 + Math.random() * 1.6) + 'rem';
  const dur = 6 + Math.random() * 6;
  el.style.animationDuration = dur + 's';
  layer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000 + 500);
}

/* Confetti burst — called on special pages (home, closing, gift). */
function confettiBurst(count = 80) {
  let layer = document.getElementById('decor-layer') || document.body;
  for (let i = 0; i < count; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
    const dur = 2.5 + Math.random() * 2.5;
    c.style.animationDuration = dur + 's';
    c.style.animationDelay = Math.random() * 0.6 + 's';
    layer.appendChild(c);
    setTimeout(() => c.remove(), (dur + 1) * 1000);
  }
}
window.confettiBurst = confettiBurst; // expose so pages can call it

/* ================================================================== */
/* 7. Cursor trail — tiny hearts / sparkles follow the pointer         */
/* ================================================================== */
function setupCursorTrail() {
  if (!CONFIG.trailEnabled) return;
  // Skip on touch devices (no hovering cursor).
  if (window.matchMedia('(hover: none)').matches) return;

  let layer = document.getElementById('trail-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'trail-layer';
    document.body.appendChild(layer);
  }

  let last = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 60) return; // throttle
    last = now;
    const bit = document.createElement('span');
    bit.className = 'trail-bit';
    bit.textContent = CONFIG.trailEmojis[Math.floor(Math.random() * CONFIG.trailEmojis.length)];
    bit.style.left = e.clientX + 'px';
    bit.style.top = e.clientY + 'px';
    bit.style.fontSize = (0.7 + Math.random() * 0.7) + 'rem';
    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 900);
  });
}

/* ================================================================== */
/* 8. Background music — plays automatically & continuously.           */
/*    The home page has a splash screen that unlocks audio. On all     */
/*    other pages, the song auto-resumes because the browser already   */
/*    trusts this origin after the first interaction.                   */
/* ================================================================== */
function setupMusic() {
  // Create audio element
  let audio = document.getElementById('bg-music');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.loop = true;
    audio.preload = 'auto';
    // Current song: "Raat Bhar" by Arijit Singh
    audio.src = 'audio/song.mp3';
    document.body.appendChild(audio);
  }

  // On non-home pages, just try to play immediately.
  // The browser allows it because the user already interacted on the home page.
  audio.play().catch(() => {
    // If still blocked, play on first interaction
    ['click', 'touchstart', 'scroll', 'mousemove'].forEach((evt) => {
      document.addEventListener(evt, function onFirst() {
        audio.play().catch(() => {});
        document.removeEventListener(evt, onFirst);
      }, { once: true });
    });
  });

  // Hide the music button — music is always on
  const btn = document.querySelector('.music-toggle');
  if (btn) btn.style.display = 'none';
}
