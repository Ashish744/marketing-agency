/* Preloader — index.html only. Visible for exactly 2s, then fades and removes itself. */
(function () {
  'use strict';
  document.documentElement.classList.add('is-preloading');

  var pre = document.getElementById('preloader');
  if (!pre) { document.documentElement.classList.remove('is-preloading'); return; }

  // animate the "STACKLY" letters in, one by one
  var word = pre.querySelector('.pl-word');
  if (word) {
    var text = word.textContent;
    word.textContent = '';
    text.split('').forEach(function (ch, i) {
      var s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.animationDelay = (0.15 + i * 0.045) + 's';
      word.appendChild(s);
    });
  }

  var MIN_VISIBLE = 2000; // ms — preloader always shows for exactly 2s
  var start = Date.now();

  function hide() {
    var elapsed = Date.now() - start;
    var wait = Math.max(0, MIN_VISIBLE - elapsed);
    setTimeout(function () {
      pre.classList.add('pl-hide');
      document.documentElement.classList.remove('is-preloading');
      pre.addEventListener('transitionend', function onEnd() {
        pre.removeEventListener('transitionend', onEnd);
        if (pre.parentNode) pre.parentNode.removeChild(pre);
      });
      // safety fallback in case transitionend never fires
      setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 700);
    }, wait);
  }

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
})();
