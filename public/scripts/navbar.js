document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = 0;
  const header = document.querySelector('header'); 
  const menu = document.querySelector('.menu');
  const toggleButton = document.querySelector('.menu-toggle');

  if (!header || !menu || !toggleButton) {
    console.error('Erro: Elementos do menu não foram encontrados.');
    return;
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.classList.add('hidden'); // Esconde o header ao descer
    } else {
      header.classList.remove('hidden'); // Mostra ao subir
    }

    lastScrollTop = Math.max(scrollTop, 0);
  });

  function toggleMenu(event) {
    event.stopPropagation(); // Impede que o clique feche o menu imediatamente
    menu.classList.toggle('active');
    toggleButton.classList.toggle('rotate');
    header.classList.remove('hidden');
  }

  toggleButton.addEventListener('click', toggleMenu);

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggle = toggleButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      menu.classList.remove('active');
      toggleButton.classList.remove('rotate');
    }
  });
});
