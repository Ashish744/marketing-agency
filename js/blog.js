  const text2 = "Worth Reading.";
  const h2 = document.getElementById('headline2');
  [...text2].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === " " ? "\u00A0" : ch;
    s.style.animationDelay = (0.55 + i * 0.035) + 's';
    h2.appendChild(s);
  });

  // Split section titles into animatable spans
  function splitChars(el){
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach(ch => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });
  }
  function splitWords(el){
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(w => {
      const s = document.createElement('span');
      s.className = 'wd';
      s.textContent = w;
      el.appendChild(s);
    });
  }
  const journalTitle = document.getElementById('journalTitle');
  const highlightsTitle = document.getElementById('highlightsTitle');
  const newsletterTitle = document.getElementById('newsletterTitle');
  if (journalTitle) splitChars(journalTitle);
  if (highlightsTitle) splitWords(highlightsTitle);
  if (newsletterTitle) splitWords(newsletterTitle);

  const titleIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const spans = e.target.querySelectorAll('.ch, .wd');
        spans.forEach((s, i) => { s.style.animationDelay = (i * 0.045) + 's'; });
        e.target.classList.add('run');
        titleIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  [journalTitle, highlightsTitle, newsletterTitle].forEach(t => t && titleIo.observe(t));

  const revealEls = document.querySelectorAll('.reveal, .reveal2');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(()=> e.target.classList.add('in'), idx * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
