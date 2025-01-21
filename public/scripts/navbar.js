let lastScrollTop = 0;
const header = document.querySelector('header'); 

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScrollTop = Math.max(scrollTop, 0); 
});

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const toggleButton = document.querySelector('.menu-toggle');
  
  menu.classList.toggle('active');
  
  toggleButton.classList.toggle('rotate');
}
