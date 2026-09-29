/* =====================================================================
   Stackly — shared behaviour (loaded on every page, before the page's JS)
   1. Renders the SAME header + footer on every page (single source of truth)
   2. Header is fixed; gains a shadow / compact size once you scroll
   3. Highlights the current page in the nav
   4. Mobile menu toggle
   5. [data-href] buttons navigate to another page
   ===================================================================== */
(function () {
  'use strict';

  var LOGO = 'assets/images/logo-black.webp';

  var NAV = [
    { page: 'home',     href: 'index.html',    label: 'Home' },
    { page: 'about',    href: 'about.html',    label: 'About' },
    { page: 'services', href: 'services.html', label: 'Services' },
    { page: 'blog',     href: 'blog.html',     label: 'Blog' },
    { page: 'contact',  href: 'contact.html',  label: 'Contact' }
  ];

  var SERVICES = ['Brand Strategy', 'Social Media', 'Performance Marketing', 'SEO', 'Content', 'Creative', 'Web Design'];

  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97V21H9z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l7.5 9.5L3.4 21H6l5.8-6.6L16.3 21H21l-7.9-9.9L20.5 3H18l-5.3 6-4.2-6z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 3 5.8 3 10.1c0 2.6 1.4 4.6 3.6 5.4.3.1.5 0 .6-.3l.3-1.1c.1-.3 0-.5-.2-.7-.6-.7-1-1.6-1-2.9 0-3.1 2.3-5.9 6.1-5.9 3.3 0 5.2 2 5.2 4.7 0 3.5-1.6 6.5-3.9 6.5-1.3 0-2.2-1-1.9-2.3.4-1.5 1.1-3.1 1.1-4.2 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.5c-.4 1.9-.1 4.2 0 4.5 0 .2.3.2.4.1.2-.2 2.1-2.6 2.7-5l1-4c.5 1 2 1.8 3.6 1.8 4.7 0 7.9-4.3 7.9-10C21 5.3 17.3 2 12 2z"/></svg>'
  };

  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" data-page="' + n.page + '">' + n.label + '</a>';
    }).join('');
    return '' +
      '<header class="site-header" id="siteHeader">' +
        '<a class="brand-logo" href="index.html" aria-label="Stackly — home">' +
          '<img class="brand-logo-img" src="' + LOGO + '" alt="Stackly">' +
        '</a>' +
        '<nav class="site-nav" id="siteNav" aria-label="Main navigation">' + links + '</nav>' +
        '<div class="site-auth">' +
          '<a class="site-signin" href="signin.html" data-page="signin">Sign in</a>' +
          '<a class="btn-signup" href="signup.html" data-page="signup">Sign up</a>' +
        '</div>' +
        '<button class="site-toggle" id="siteToggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="siteNav">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</header>';
  }

  function footerHTML() {
    var navLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + '</a>';
    }).join('');
    var serviceLinks = SERVICES.map(function (s) {
      return '<a href="404.html">' + s + '</a>';
    }).join('');
    return '' +
      '<footer class="site-footer" id="siteFooter">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a class="brand-logo" href="index.html" aria-label="Stackly — home"><img class="brand-logo-img" src="' + LOGO + '" alt="Stackly"></a>' +
            '<p>We build brands people notice—and businesses people choose.</p>' +
            '<p>A small, senior team of strategists, creatives and marketers working as an extension of yours — no bloated retainers, no guesswork, just work that moves the needle.</p>' +
            '<div class="footer-social">' +
              '<a href="404.html" aria-label="Instagram">' + ICONS.instagram + '</a>' +
              '<a href="404.html" aria-label="LinkedIn">' + ICONS.linkedin + '</a>' +
              '<a href="404.html" aria-label="X">' + ICONS.x + '</a>' +
              // '<a href="404.html" aria-label="Pinterest">' + ICONS.pinterest + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-cols">' +
            '<div class="footer-col"><h4>Navigation</h4>' + navLinks + '</div>' +
            '<div class="footer-col"><h4>Services</h4>' + serviceLinks + '</div>' +
            '<div class="footer-col"><h4>Contact</h4>' +
              '<a href="404.html">hello@stackly.com</a>' +
              '<a href="404.html">+91 XXX XXX XXXX</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>© ' + new Date().getFullYear() + ' Stackly. All rights reserved.</p>' +
          '<div class="footer-legal"><a href="404.html">Privacy Policy</a><a href="404.html">Terms of Service</a></div>' +
        '</div>' +
      '</footer>';
  }

  /* ---- 1. render header + footer ---- */
  function render() {
    var parts = { header: headerHTML, footer: footerHTML };
    document.querySelectorAll('[data-include]').forEach(function (slot) {
      var build = parts[slot.getAttribute('data-include')];
      if (build) slot.outerHTML = build();
    });
  }

  /* ---- 2 + 3 + 4. behaviour ---- */
  function init() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    // current page
    var current = document.body.getAttribute('data-page');
    header.querySelectorAll('[data-page="' + current + '"]').forEach(function (a) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    });

    // fixed header: compact + shadow after scrolling
    // Belt-and-suspenders: some mobile browsers can mis-place a `position:fixed`
    // element after the on-screen URL bar shows/hides or the layout viewport
    // resizes mid-scroll. Re-assert the fixed position inline on every scroll/
    // resize/orientation tick so the header can never drift, even if a browser
    // quirk tries to recompute its containing block.
    function pinHeader() {
      header.style.position = 'fixed';
      header.style.top = '0px';
      header.style.left = '0px';
      header.style.right = '0px';
    }
    pinHeader();

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        pinHeader();
        header.classList.toggle('is-scrolled', (window.pageYOffset || document.documentElement.scrollTop) > 8);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', pinHeader);
    window.addEventListener('orientationchange', pinHeader);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', pinHeader);
      window.visualViewport.addEventListener('scroll', pinHeader);
    }
    onScroll();

    // mobile menu
    var toggle = document.getElementById('siteToggle');
    function setMenu(open) {
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('menu-open'));
    });
    header.addEventListener('click', function (e) {
      if (e.target.closest('.site-nav a, .site-auth a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* ---- 5. buttons that link to another page ---- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-href]');
    if (el) window.location.href = el.getAttribute('data-href');
  });

  render();
  init();
})();
