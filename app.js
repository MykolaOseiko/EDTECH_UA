const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Відкрити меню');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const registrationDialog=document.querySelector('#registration-dialog');
document.querySelectorAll('[data-ticket]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#selected-ticket').textContent=button.dataset.ticket;registrationDialog.showModal();}));
registrationDialog.addEventListener('click',event=>{if(event.target===registrationDialog){const rect=registrationDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)registrationDialog.close();}});
