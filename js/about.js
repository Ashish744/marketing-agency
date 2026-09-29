  const revealTargets = document.querySelectorAll('#aboutHero, #ourStory, #beliefsSection, #processSection, #journeyBand, #teamSection');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.25});
  revealTargets.forEach(t=>io.observe(t));

  /* Text FX: splits text into letters (headings) / words (everything else),
     reveals them when scrolled into view, and gives each a hover bounce. */
  (function textFX(){
    try{
      if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if(!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;

      const HEAD = 'h1,h2,h3,.team-name,.tl-year';
      const TEXT = 'p,.team-role,.about-hero-tag';
      const root = document.documentElement;

      const targets = Array.from(document.querySelectorAll(HEAD + ',' + TEXT)).filter(el=>{
        if(el.closest('svg') || el.closest('[data-fx="off"]')) return false;
        if(el.closest('.site-header, .site-footer')) return false;   // shared header/footer stay static
        if(!el.textContent.trim()) return false;
        return !/flex|grid/.test(getComputedStyle(el).display);
      });

      function split(el, letters){
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
          acceptNode(n){ return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
        });
        const nodes = [];
        while(walker.nextNode()) nodes.push(walker.currentNode);
        let idx = 0;
        nodes.forEach(node=>{
          if(node.parentNode.closest('svg')) return;
          const frag = document.createDocumentFragment();
          node.nodeValue.split(/(\s+)/).forEach(tok=>{
            if(!tok) return;
            if(/^\s+$/.test(tok)){ frag.appendChild(document.createTextNode(' ')); return; }
            if(letters){
              const w = document.createElement('span');
              w.className = 'fx-w';
              w.setAttribute('aria-hidden','true');
              for(const ch of tok){
                const c = document.createElement('span');
                c.className = 'fx-c fx-a';
                c.style.setProperty('--i', idx++);
                c.textContent = ch;
                w.appendChild(c);
              }
              frag.appendChild(w);
            }else{
              const w = document.createElement('span');
              w.className = 'fx-wd fx-a';
              w.style.setProperty('--i', idx++);
              w.textContent = tok;
              frag.appendChild(w);
            }
          });
          node.parentNode.replaceChild(frag, node);
        });
        return idx;
      }

      root.classList.add('fx');
      const headerIdx = new Map();
      let hi = 0;
      targets.forEach(el=>{
        const letters = el.matches(HEAD);
        if(letters && /^H[1-6]$/.test(el.tagName)){
          el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g,' '));
        }
        const n = split(el, letters);
        el.style.setProperty('--step', (letters
          ? Math.max(12, Math.min(34, 900/n))
          : Math.max(10, Math.min(48, 1100/n))).toFixed(1) + 'ms');
        el.classList.add('fx-pre');
      });

      function baseFor(el){
        if(headerIdx.has(el)) return 0.15 + headerIdx.get(el) * 0.08;
        let d = 0, a = el, hops = 0;
        while(a && a.tagName !== 'BODY' && a.tagName !== 'SECTION' && hops < 6){
          const v = parseFloat(getComputedStyle(a).transitionDelay) || 0;
          if(v > d) d = v;
          a = a.parentElement; hops++;
        }
        return Math.min(d, 0.8) + (el.matches(HEAD) ? 0.05 : 0.18);
      }
      function play(el){
        el.style.setProperty('--base', Math.round(baseFor(el) * 1000) + 'ms');
        el.classList.remove('fx-pre');
        el.classList.add('fx-in');
      }

      // Wait for the section's own reveal (.in-view) so text never animates unseen.
      const waiting = new Set();
      const sectionOf = el => el.closest('section[id]');
      const ready = el => { const s = sectionOf(el); return !s || s.classList.contains('in-view'); };

      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(!e.isIntersecting) return;
          io.unobserve(e.target);
          ready(e.target) ? play(e.target) : waiting.add(e.target);
        });
      }, {threshold:0.15, rootMargin:'0px 0px -5% 0px'});
      targets.forEach(el=>io.observe(el));

      const mo = new MutationObserver(()=>{
        waiting.forEach(el=>{ if(ready(el)){ waiting.delete(el); play(el); } });
      });
      document.querySelectorAll('section[id]').forEach(s=>mo.observe(s, {attributes:true, attributeFilter:['class']}));
    }catch(err){
      document.documentElement.classList.remove('fx');
      document.querySelectorAll('.fx-pre').forEach(e=>e.classList.remove('fx-pre'));
      console.warn('Text FX disabled:', err);
    }
  })();
