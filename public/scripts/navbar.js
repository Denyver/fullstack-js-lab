let lastScrollTop = 0;
const header = document.querySelector('header'); 
const menu = document.querySelector('.menu');
const toggleButton = document.querySelector('.menu-toggle');

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
  menu.classList.toggle('active');
  toggleButton.classList.toggle('rotate');

  header.classList.remove('hidden');
}

document.addEventListener('click', (event) => {
  const isClickInsideHeader = header.contains(event.target);
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnToggle = toggleButton.contains(event.target);

  if (!isClickInsideHeader && !isClickInsideMenu && !isClickOnToggle) {
    header.classList.remove('hidden');
    menu.classList.remove('active');
    toggleButton.classList.remove('rotate');
  }
});

toggleButton.addEventListener('click', toggleMenu);
