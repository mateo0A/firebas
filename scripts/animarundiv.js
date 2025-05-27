import anime from 'animejs/lib/anime.es.js';

// Espera a que el DOM esté listo
window.onload = function() {
  const div = document.getElementById('prueba1');
  if (div) {
    div.addEventListener('mouseenter', () => {
      anime({
        targets: div,
        translateX: 150,
        direction: 'alternate',
        duration: 800,
        easing: 'easeInOutSine',
      });
    });
  }
};
