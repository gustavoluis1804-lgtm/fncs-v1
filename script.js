/** FNCS / Pitchfólio 2026 — sem framework, pronto para hospedagem estática. */
const CONFIG = {
  // Cole aqui o endereço completo do site da apresentação quando estiver pronto.
  officialPresentationUrl: ''
};
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initLoader() {
  const loader = $('#preloader');
  if (reduceMotion) { loader.remove(); document.body.classList.remove('is-loading'); return; }
  const counter = $('#loader-count'); const fill = $('#loader-fill');
  const start = performance.now(), duration = 1850;
  const step = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 2.3);
    const progress = Math.round(100 * eased);
    counter.textContent = String(progress).padStart(3, '0') + '%';
    fill.style.width = progress + '%';
    if (elapsed < 1) requestAnimationFrame(step);
    else setTimeout(() => { loader.classList.add('complete'); document.body.classList.remove('is-loading'); setTimeout(() => loader.remove(), 1300); animateHero(); }, 180);
  };
  requestAnimationFrame(step);
}
function animateHero() {
  $$('.hero-letter').forEach((letter, i) => {
    letter.animate([
      {opacity:0,transform:'translateY(100%) rotate(13deg) scale(.8)',filter:'blur(12px)'},
      {opacity:1,transform:'translateY(0) rotate(0) scale(1)',filter:'blur(0)'}
    ], {duration:1050,delay:i*125,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
  });
}
function initReveal() {
  const items = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {items.forEach(el => el.classList.add('visible'));return;}
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }), {threshold:.12,rootMargin:'0px 0px -25px 0px'});
  items.forEach(el => observer.observe(el));
}
function initCards() {
  $$('.portrait-card').forEach(card => {
    const photo = $('.real-photo',card), lego = $('.lego-image',card);
    function test(img, className) {
      if (img.complete && img.naturalWidth > 0) card.classList.add(className);
      else img.addEventListener('load',()=>card.classList.add(className),{once:true});
    }
    test(photo,'has-photo');test(lego,'has-lego');
    const reset = () => {card.style.transform='';card.style.setProperty('--px','50%');card.style.setProperty('--py','50%');};
    card.addEventListener('pointermove', e => {
      if (reduceMotion || e.pointerType === 'touch') return;
      const rect=card.getBoundingClientRect(); const x=(e.clientX-rect.left)/rect.width; const y=(e.clientY-rect.top)/rect.height;
      card.style.transform=`perspective(950px) rotateY(${(x-.5)*11}deg) rotateX(${(.5-y)*11}deg) translateY(-7px)`;
      card.style.setProperty('--px',(x*100)+'%');card.style.setProperty('--py',(y*100)+'%');
    });
    card.addEventListener('pointerleave',reset);
    card.addEventListener('click',()=>card.classList.toggle('active'));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('active');}});
  });
}
function initMenu(){const btn=$('#menu-button'),nav=$('#menu-overlay');function close(){btn.classList.remove('open');nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Abrir navegação');}btn.addEventListener('click',()=>{const next=!nav.classList.contains('open');nav.classList.toggle('open',next);btn.classList.toggle('open',next);btn.setAttribute('aria-expanded',String(next));btn.setAttribute('aria-label',next?'Fechar navegação':'Abrir navegação');});$$('a',nav).forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
function initOfficialLink(){const link=$('#official-link'),status=$('#link-status');if(CONFIG.officialPresentationUrl.trim()){try{const url=new URL(CONFIG.officialPresentationUrl);if(['https:','http:'].includes(url.protocol)){link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.removeAttribute('aria-label');status.textContent='ABRIR SITE ↗';return;}}catch(e){console.warn('Link inválido de apresentação:',e);}}link.addEventListener('click',e=>e.preventDefault());}
function initScroll(){const bar=$('#scroll-meter');let ticking=false;const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?scrollY/max*100:0)+'%';ticking=false;};addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});update();const glow=$('#cursor-glow');if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';glow.style.opacity='1';},{passive:true});}}
initReveal();initCards();initMenu();initOfficialLink();initScroll();initLoader();
