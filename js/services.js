function split(el){
  const mode=el.dataset.anim, text=el.textContent.trim(); el.textContent='';
  text.split(/\s+/).forEach((word,wi,arr)=>{
    const w=document.createElement('span'); w.className='w';
    if(mode.startsWith('chars')){ [...word].forEach(ch=>{const c=document.createElement('span');c.className='u';c.textContent=ch;w.appendChild(c);}); }
    else{ w.className='u'; w.textContent=word; }
    el.appendChild(w); if(wi<arr.length-1) el.appendChild(document.createTextNode(' '));
  });
}
document.querySelectorAll('[data-anim]').forEach(split);
const titleIo=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){
  e.target.querySelectorAll('.u').forEach((s,i)=>s.style.animationDelay=(i*(e.target.dataset.anim.startsWith('chars')? 0.035 : 0.09))+'s');
  e.target.classList.add('run'); titleIo.unobserve(e.target);} }),{threshold:.4});
document.querySelectorAll('[data-anim]').forEach(t=>titleIo.observe(t));

const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){
  e.target.classList.add('in'); io.unobserve(e.target);
  if(e.target.classList.contains('black')) e.target.querySelectorAll('.num-item').forEach((n,i)=>setTimeout(()=>n.classList.add('in'),400+i*120));
} }),{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
const liIo=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){
  e.target.querySelectorAll('li').forEach((li,i)=>setTimeout(()=>li.classList.add('in'),i*130)); liIo.unobserve(e.target);} }),{threshold:.3});
liIo.observe(document.querySelector('.checks'));
