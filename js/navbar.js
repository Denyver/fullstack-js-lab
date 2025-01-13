let lastScrollTop = 0;
const header = document.querySelector('header'); // Seleciona o cabeçalho

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Rolando para baixo
    header.classList.add('hidden');
  } else {
    // Rolando para cima
    header.classList.remove('hidden');
  }

  lastScrollTop = Math.max(scrollTop, 0); // Garante que o scrollTop não seja negativo
});

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const toggleButton = document.querySelector('.menu-toggle');
  
  // Alterna a visibilidade do menu
  menu.classList.toggle('active');
  
  // Alterna a rotação do ícone de triângulo
  toggleButton.classList.toggle('rotate');
}
