document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header'); 
  const menu = document.querySelector('.menu');
  const toggleButton = document.querySelector('.menu-toggle');

  if (!header || !menu || !toggleButton) {
    console.error('Erro: Elementos do menu não foram encontrados.');
    return;
  }

  // Esconde o header inicialmente se a página não estiver no topo
  if (window.scrollY > 0) {
    header.classList.add('hidden');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      header.classList.remove('hidden'); // Mostra o header apenas no topo da página
    } else {
      header.classList.add('hidden'); // Esconde ao rolar para baixo
    }
  });

  function toggleMenu(event) {
    event.stopPropagation(); // Impede que o clique feche o menu imediatamente
    menu.classList.toggle('active');
    toggleButton.classList.toggle('rotate');
    header.classList.remove('hidden'); // Mantém o header visível ao abrir o menu
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
