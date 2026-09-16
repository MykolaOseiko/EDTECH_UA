const isEnglish = document.documentElement.lang === 'en';
const openMenuLabel = isEnglish ? 'Open menu' : 'Відкрити меню';
const closeMenuLabel = isEnglish ? 'Close menu' : 'Закрити меню';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',openMenuLabel);}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?closeMenuLabel:openMenuLabel);});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const registrationDialog=document.querySelector('#registration-dialog');
document.querySelectorAll('[data-ticket]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#selected-ticket').textContent=button.dataset.ticket;registrationDialog.showModal();}));
registrationDialog.addEventListener('click',event=>{if(event.target===registrationDialog){const rect=registrationDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)registrationDialog.close();}});

document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => {
    const target = new URL(link.href);
    target.hash = location.hash;
    link.href = target.href;
  });
});

const track = document.querySelector('.archive-carousel');
if (track) {
  const previous = document.querySelector('.carousel-prev');
  const next = document.querySelector('.carousel-next');
  const counter = document.querySelector('.carousel-count');
  const slides = [...track.children];
  const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const update = () => {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const first = Math.round(track.scrollLeft / step()) + 1;
    const visible = Math.max(1, Math.floor((track.clientWidth + parseFloat(getComputedStyle(track).gap)) / step()));
    const last = Math.min(slides.length, first + visible - 1);
    counter.textContent = `${first}${last > first ? '–' + last : ''} / ${slides.length}`;
  };
  const move = direction => track.scrollBy({left: direction * step(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('scroll', update, {passive: true});
  new ResizeObserver(update).observe(track);
  update();
}
