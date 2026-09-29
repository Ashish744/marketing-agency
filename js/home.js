  // wrap each headline word's letters in spans for hover ripple
  document.querySelectorAll('.letters').forEach(el=>{
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach(ch=>{
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });
  });

  // split the brand-more heading into word spans for staggered reveal
  const bmHeading = document.getElementById('bmHeading');
  bmHeading.innerHTML = bmHeading.textContent.trim().split(' ')
    .map((w,i)=>`<span class="word" style="transition-delay:${0.15+i*0.06}s">${w}</span>`)
    .join(' ');

  const buildHeading = document.getElementById('buildHeading');
  buildHeading.innerHTML = buildHeading.textContent.trim().split(' ')
    .map((w,i)=>`<span class="word" style="transition-delay:${0.05+i*0.05}s">${w}</span>`)
    .join(' ');

  const strategyHeading = document.getElementById('strategyHeading');
  strategyHeading.innerHTML = strategyHeading.textContent.trim().split(' ')
    .map((w,i)=>`<span class="word" style="transition-delay:${0.05+i*0.045}s">${w}</span>`)
    .join(' ');

  // reveal sections on scroll
  const revealTargets = document.querySelectorAll('#brandMore, #buildSection, #strategySection, #journeySection, #ctaSection');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.25});
  revealTargets.forEach(t=>io.observe(t));

  // count-up animation for the stats banner
  const statEls = document.querySelectorAll('.stat strong');
  const statIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now-start)/duration, 1);
          const eased = 1 - Math.pow(1-p, 3);
          const val = target * eased;
          el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statIO.unobserve(el);
      }
    });
  }, {threshold:0.6});
  statEls.forEach(el=>statIO.observe(el));
